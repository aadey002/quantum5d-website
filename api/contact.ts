import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Rate limiter: simple in-memory (resets per cold start — good enough for low traffic)
const recentIPs: Record<string, number[]> = {}
const RATE_LIMIT = 5
const RATE_WINDOW = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  if (!recentIPs[ip]) recentIPs[ip] = []
  recentIPs[ip] = recentIPs[ip].filter((t) => now - t < RATE_WINDOW)
  if (recentIPs[ip].length >= RATE_LIMIT) return true
  recentIPs[ip].push(now)
  return false
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  // Rate limit
  const ip = (req.headers['x-forwarded-for'] as string || '127.0.0.1').split(',')[0].trim()
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute.' })
  }

  // Parse body
  const { name, organization, email, message, source: reqSource, _hp } = req.body || {}

  // Honeypot — if filled, silently accept (bot trap)
  if (_hp) return res.status(200).json({ success: true })

  // Validate required fields
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ error: 'Name is required.' })
  }
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  const lead = {
    name: name.trim().slice(0, 200),
    organization: (organization || '').trim().slice(0, 200) || null,
    email: email.trim().toLowerCase().slice(0, 200),
    message: (message || '').trim().slice(0, 2000) || null,
    source: (reqSource || 'quantum5d.ai').toString().slice(0, 100),
    status: 'new',
  }

  // --- 1. Insert into Supabase ---
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    return res.status(500).json({ error: 'Server configuration error.' })
  }

  const supabase = createClient(supabaseUrl, supabaseKey)
  const { error: dbError } = await supabase.from('leads').insert(lead)
  if (dbError) {
    console.error('Supabase insert error:', dbError)
    return res.status(500).json({ error: 'Failed to save your inquiry. Please try again.' })
  }

  // --- 2. Send email + SMS via Resend (same pattern as ACHE Study Smart) ---
  const resendKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL
  const smsGateway = process.env.SMS_GATEWAY // e.g. 4107107406@vtext.com

  if (resendKey && adminEmail) {
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })
    const subject = 'Q5D Lead: ' + lead.name + (lead.organization ? ' (' + lead.organization + ')' : '')
    const body = 'New Quantum 5D inquiry!\n\n'
      + 'Name: ' + lead.name + '\n'
      + 'Organization: ' + (lead.organization || '—') + '\n'
      + 'Email: ' + lead.email + '\n'
      + 'Message:\n' + (lead.message || '—') + '\n\n'
      + 'Submitted: ' + timestamp + '\n'
      + 'Source: ' + lead.source

    // Email to admin
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer ' + resendKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Quantum 5D <alerts@achestudysmart.com>',
          to: [adminEmail],
          subject: subject,
          text: body,
        }),
      })
    } catch (e) {
      console.error('Resend email error:', e)
    }

    // SMS via email-to-SMS gateway (Resend → vtext.com)
    if (smsGateway) {
      try {
        const smsText = 'Q5D Lead: ' + lead.name
          + (lead.organization ? ' (' + lead.organization + ')' : '')
          + ' — ' + lead.email
          + (lead.message ? '\n' + lead.message.slice(0, 100) : '')

        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': 'Bearer ' + resendKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Quantum 5D <alerts@achestudysmart.com>',
            to: [smsGateway],
            subject: '',
            text: smsText,
          }),
        })
      } catch (e) {
        console.error('SMS gateway error:', e)
      }
    }
  }

  return res.status(200).json({ success: true })
}
