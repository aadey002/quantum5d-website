// One-shot: downgrade all 'subscribed' newsletter leads to 'pending' and send confirmation emails.
// GET /api/admin-migrate-subscribers?key=CRON_SECRET
// Delete this file after running.

import type { VercelRequest, VercelResponse } from '@vercel/node'

function generateToken(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < 32; i++) token += chars.charAt(Math.floor(Math.random() * chars.length))
  return token
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.CRON_SECRET || req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const resendKey = process.env.RESEND_API_KEY!

  // Get all 'subscribed' newsletter leads
  const resp = await fetch(
    url + '/rest/v1/leads?source=eq.newsletter&status=eq.subscribed&select=id,email,name',
    { headers: { apikey: key, Authorization: 'Bearer ' + key } }
  )
  const subs = await resp.json()
  if (!Array.isArray(subs) || subs.length === 0) {
    return res.status(200).json({ message: 'No subscribed leads to migrate' })
  }

  const results: string[] = []

  for (const sub of subs) {
    const token = generateToken()

    // Update to pending with token
    await fetch(
      url + '/rest/v1/leads?id=eq.' + sub.id,
      {
        method: 'PATCH',
        headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
        body: JSON.stringify({ status: 'pending', message: 'confirm:' + token }),
      }
    )

    // Send confirmation email
    const confirmUrl = 'https://quantum5d.ai/api/newsletter-confirm?token=' + token + '&email=' + encodeURIComponent(sub.email)
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Dr. Tee | Quantum 5D <alerts@quantum5dconsulting.com>',
        to: [sub.email],
        subject: 'Please confirm your subscription to FQHC Operations Intelligence',
        html: '<!DOCTYPE html><html><body style="font-family:Georgia,serif;max-width:580px;margin:0 auto;color:#2D2D2D;line-height:1.7;font-size:15.5px;padding:20px">'
          + '<div style="margin-bottom:28px"><table cellpadding="0" cellspacing="0" border="0"><tr>'
          + '<td style="padding-right:12px"><img src="https://quantum5d.ai/logo.png" alt="" width="32" height="32" style="width:32px;height:32px;border-radius:6px" /></td>'
          + '<td><span style="font-family:Georgia,serif;font-size:18px;font-weight:600;color:#5347A4">FQHC Operations Intelligence</span></td>'
          + '</tr></table></div>'
          + '<p>We recently added double opt-in to our newsletter. Please confirm your subscription to keep receiving monthly insights:</p>'
          + '<div style="text-align:center;margin:28px 0"><a href="' + confirmUrl + '" style="display:inline-block;background:#5347A4;color:#fff;padding:14px 36px;border-radius:8px;font-size:16px;font-weight:700;text-decoration:none">Confirm my subscription</a></div>'
          + '<p style="color:#666;font-size:13px">If you no longer wish to receive this newsletter, simply ignore this email and you will be removed.</p>'
          + '<p style="color:#999;font-size:13px;margin-top:36px;border-top:1px solid #E6E3F2;padding-top:16px">'
          + '<span style="color:#5347A4;font-family:Georgia,serif;font-weight:600">FQHC Operations Intelligence</span><br>'
          + 'Quantum 5D Consulting, LLC</p>'
          + '</body></html>',
        reply_to: 'info@quantum5dconsulting.com',
      }),
    })

    results.push(sub.email + ': pending + confirmation sent')

    // Rate limit: 150ms between sends
    await new Promise(r => setTimeout(r, 150))
  }

  return res.status(200).json({ migrated: results.length, results })
}
