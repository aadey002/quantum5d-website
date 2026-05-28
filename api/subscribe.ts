// POST /api/subscribe
// Creates a Beehiiv subscriber and logs the event to Supabase.
// Works identically in current Vite stack and future Next.js — zero migration work.

import type { VercelRequest, VercelResponse } from '@vercel/node'

// Simple in-memory rate limiter: max 5 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return false
  }

  entry.count++
  if (entry.count > 5) return true
  return false
}

// Clean up stale entries every 5 minutes to prevent memory leaks
setInterval(() => {
  const now = Date.now()
  for (const [ip, entry] of rateLimitMap) {
    if (now > entry.resetAt) rateLimitMap.delete(ip)
  }
}, 300_000)

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — only allow requests from the Q5D domain
  const origin = req.headers.origin || ''
  const allowedOrigins = [
    'https://quantum5dconsulting.com',
    'https://www.quantum5dconsulting.com',
  ]
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  // Rate limit
  const ip = (req.headers['x-forwarded-for'] as string || req.socket?.remoteAddress || 'unknown').split(',')[0].trim()
  if (isRateLimited(ip)) {
    return res.status(429).json({ success: false, error: 'Too many requests. Please try again in a minute.' })
  }

  const { email, source, magnetId, tags, utm } = req.body || {}

  // Validate email
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' })
  }

  const beehiivApiKey = process.env.BEEHIIV_API_KEY
  const beehiivPubId = process.env.BEEHIIV_PUBLICATION_ID
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!beehiivApiKey || !beehiivPubId) {
    console.error('Missing BEEHIIV_API_KEY or BEEHIIV_PUBLICATION_ID')
    return res.status(500).json({ success: false, error: 'Server configuration error.' })
  }

  // 1. Create Beehiiv subscription
  try {
    const beehiivBody: Record<string, unknown> = {
      email: email.toLowerCase().trim(),
      reactivate_existing: true,
      send_welcome_email: true,
      referring_site: 'https://quantum5dconsulting.com',
    }

    // Add UTM params if provided
    if (utm && typeof utm === 'object') {
      if (utm.utm_source) beehiivBody.utm_source = String(utm.utm_source)
      if (utm.utm_medium) beehiivBody.utm_medium = String(utm.utm_medium)
      if (utm.utm_campaign) beehiivBody.utm_campaign = String(utm.utm_campaign)
    }

    // Add source as utm_source fallback if no UTM provided
    if (!beehiivBody.utm_source && source) {
      beehiivBody.utm_source = String(source)
    }

    // Add custom fields for source tracking
    if (source || magnetId) {
      beehiivBody.custom_fields = []
      if (source) {
        ;(beehiivBody.custom_fields as Array<{ name: string; value: string }>).push({
          name: 'signup_source',
          value: String(source),
        })
      }
      if (magnetId) {
        ;(beehiivBody.custom_fields as Array<{ name: string; value: string }>).push({
          name: 'magnet_id',
          value: String(magnetId),
        })
      }
    }

    const beehiivRes = await fetch(
      'https://api.beehiiv.com/v2/publications/' + beehiivPubId + '/subscriptions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + beehiivApiKey,
        },
        body: JSON.stringify(beehiivBody),
      }
    )

    if (!beehiivRes.ok) {
      const errText = await beehiivRes.text()
      console.error('Beehiiv API error:', beehiivRes.status, errText)
      return res.status(502).json({ success: false, error: 'Failed to create subscription. Please try again.' })
    }
  } catch (err) {
    console.error('Beehiiv fetch error:', err)
    return res.status(502).json({ success: false, error: 'Failed to reach email service. Please try again.' })
  }

  // 2. Log to Supabase (non-blocking — don't fail the request if this errors)
  if (supabaseUrl && supabaseServiceKey) {
    try {
      await fetch(supabaseUrl + '/rest/v1/subscriptions', {
        method: 'POST',
        headers: {
          apikey: supabaseServiceKey,
          Authorization: 'Bearer ' + supabaseServiceKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          source: source || 'unknown',
          magnet_id: magnetId || null,
          utm_json: utm || null,
        }),
      })
    } catch (err) {
      // Log but don't fail — Beehiiv subscription already succeeded
      console.error('Supabase log error:', err)
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Check your email for a welcome message from Quantum 5D Consulting.',
  })
}
