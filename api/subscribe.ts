// POST /api/subscribe
// Saves subscriber to Supabase leads table and sends welcome email via Resend.

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

// Bot detection: dotted-gmail gibberish, double dots, single-char segment patterns
function isSuspiciousEmail(email: string): boolean {
  const local = email.split('@')[0]
  const domain = email.split('@')[1] || ''
  // Gmail ignores dots — bots exploit this with excessive dots
  if (domain === 'gmail.com') {
    const dotCount = (local.match(/\./g) || []).length
    if (dotCount >= 3) return true
    if (/\.\./.test(local)) return true
  }
  // Double dots in any address
  if (/\.\./.test(local)) return true
  // Single-char segments between dots: a.b.c.d pattern (bot fingerprint)
  const parts = local.split('.')
  const singleCharParts = parts.filter(p => p.length === 1).length
  if (singleCharParts >= 3) return true
  return false
}

function buildWelcomeHtml(name: string): string {
  var firstName = name ? name.split(' ')[0] : 'there'
  return '<!DOCTYPE html><html><body style="font-family:Georgia,serif;max-width:580px;margin:0 auto;color:#2D2D2D;line-height:1.7;font-size:15.5px;padding:20px">'
    + '<div style="margin-bottom:28px">'
    + '<table cellpadding="0" cellspacing="0" border="0"><tr>'
    + '<td style="padding-right:12px"><img src="https://quantum5d.ai/logo.png" alt="" width="32" height="32" style="width:32px;height:32px;border-radius:6px" /></td>'
    + '<td><span style="font-family:Georgia,serif;font-size:18px;font-weight:600;color:#5347A4;letter-spacing:0.01em">FQHC Operations Intelligence</span></td>'
    + '</tr></table>'
    + '</div>'
    + '<p>Hi ' + firstName + ',</p>'
    + '<p>Welcome to <strong>FQHC Operations Intelligence</strong> from Quantum 5D Consulting.</p>'
    + '<p>Once a month, we send you one sharp insight on FQHC operations, compliance, or 340B strategy '
    + '— the kind of thing that usually surfaces too late, during an OSV or a board meeting.</p>'
    + '<p><strong>What to expect:</strong></p>'
    + '<ul style="padding-left:20px">'
    + '<li>One email per month — no spam, no filler</li>'
    + '<li>Real operational problems with real solutions</li>'
    + '<li>Live demos of AI tools built for FQHCs</li>'
    + '</ul>'
    + '<p>While you wait for the first issue, here are a few resources to explore:</p>'
    + '<div style="margin:20px 0">'
    + '<div style="background:#f3e8ff;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5d.ai/briefs/platform-executive-brief.html" style="color:#7c3aed;font-weight:bold;font-size:16px;text-decoration:none">Platform Executive Brief</a>'
    + '<p style="color:#6b21a8;margin:4px 0 0;font-size:14px">Full overview of all 15 FQHC applications</p>'
    + '</div>'
    + '<div style="background:#f3e8ff;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/340B-Program-Compliance-Checklist.pdf" style="color:#7c3aed;font-weight:bold;font-size:16px;text-decoration:none">340B Compliance Checklist (PDF)</a>'
    + '<p style="color:#6b21a8;margin:4px 0 0;font-size:14px">HRSA audit preparation and compliance gap analysis</p>'
    + '</div>'
    + '<div style="background:#f3e8ff;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/340b-savings-calculator.pdf" style="color:#7c3aed;font-weight:bold;font-size:16px;text-decoration:none">340B Savings Calculator &amp; ROI Tool</a>'
    + '<p style="color:#6b21a8;margin:4px 0 0;font-size:14px">Quantify your program savings and identify opportunities</p>'
    + '</div>'
    + '</div>'
    + '<p>Questions? Just reply to this email — it comes straight to me.</p>'
    + '<p style="margin-top:24px">— Dr. Tee<br>'
    + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
    + '<p style="color:#999;font-size:13px;margin-top:36px;border-top:1px solid #E6E3F2;padding-top:16px">'
    + '<span style="color:#5347A4;font-family:Georgia,serif;font-weight:600">FQHC Operations Intelligence</span><br>'
    + 'Quantum 5D Consulting, LLC<br>'
    + '<a href="https://quantum5dconsulting.com" style="color:#7c3aed">quantum5dconsulting.com</a> | '
    + '<a href="https://quantum5d.ai" style="color:#7c3aed">quantum5d.ai</a><br>'
    + 'Reply "unsubscribe" to stop receiving emails.</p>'
    + '</body></html>'
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin || ''
  const allowedOrigins = [
    'https://quantum5d.ai',
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

  const { email, name, organization, source, magnetId } = req.body || {}

  // Validate email
  if (!email || typeof email !== 'string' || !isValidEmail(email)) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' })
  }

  // Reject suspicious bot emails (silently accept to not tip off bots)
  if (isSuspiciousEmail(email.toLowerCase().trim())) {
    return res.status(200).json({ success: true, message: 'Thank you for subscribing!' })
  }

  const cleanEmail = email.toLowerCase().trim()
  const cleanName = (name || 'Newsletter Subscriber').toString().trim().slice(0, 200)
  const cleanOrg = (organization || '').toString().trim().slice(0, 200) || null
  const cleanSource = (source || 'newsletter').toString().slice(0, 100)

  const supabaseUrl = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
  const resendKey = process.env.RESEND_API_KEY || ''

  // 1. Check for duplicate in leads table
  if (supabaseKey) {
    try {
      const checkRes = await fetch(
        supabaseUrl + '/rest/v1/leads?email=eq.' + encodeURIComponent(cleanEmail) + '&source=eq.newsletter&select=id&limit=1',
        {
          headers: {
            apikey: supabaseKey,
            Authorization: 'Bearer ' + supabaseKey,
          },
        }
      )
      const existing = await checkRes.json()
      if (Array.isArray(existing) && existing.length > 0) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter. Thank you!',
        })
      }
    } catch (e) {
      console.error('Duplicate check error:', e)
    }
  }

  // 2. Save to leads table
  if (supabaseKey) {
    try {
      await fetch(supabaseUrl + '/rest/v1/leads', {
        method: 'POST',
        headers: {
          apikey: supabaseKey,
          Authorization: 'Bearer ' + supabaseKey,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: cleanName,
          organization: cleanOrg,
          email: cleanEmail,
          message: magnetId ? 'Lead magnet: ' + magnetId : 'Newsletter signup',
          source: 'newsletter',
          status: 'subscribed',
        }),
      })
    } catch (e) {
      console.error('Supabase insert error:', e)
    }
  }

  // 3. Send welcome email via Resend
  if (resendKey) {
    try {
      const welcomeRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + resendKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Dr. Tee | Quantum 5D <alerts@quantum5dconsulting.com>',
          to: [cleanEmail],
          subject: 'Welcome to FQHC Operations Intelligence',
          html: buildWelcomeHtml(cleanName),
          reply_to: 'info@quantum5dconsulting.com',
        }),
      })
      if (!welcomeRes.ok) {
        const errText = await welcomeRes.text()
        console.error('Resend welcome email error:', welcomeRes.status, errText)
      }
    } catch (e) {
      console.error('Welcome email error:', e)
    }

    // 4. Notify admin
    var adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + resendKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Quantum 5D <alerts@quantum5dconsulting.com>',
            to: [adminEmail],
            subject: 'New newsletter subscriber: ' + cleanEmail,
            text: 'New subscriber!\n\nEmail: ' + cleanEmail + '\nName: ' + cleanName
              + '\nOrganization: ' + (cleanOrg || 'N/A')
              + '\nSource: ' + cleanSource
              + '\nTime: ' + new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
          }),
        })
      } catch (e) {
        console.error('Admin notification error:', e)
      }
    }
  }

  return res.status(200).json({
    success: true,
    message: 'Welcome! Check your email for a welcome message from Quantum 5D Consulting.',
  })
}
