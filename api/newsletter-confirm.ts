// GET /api/newsletter-confirm?token=...&email=...
// Confirms a newsletter subscription (double opt-in).

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const email = ((req.query.email as string) || '').trim().toLowerCase()
  const token = ((req.query.token as string) || '').trim()

  if (!email || !token) {
    return res.status(400).send(page('Invalid confirmation link.', false))
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const resendKey = process.env.RESEND_API_KEY
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send(page('Server error. Please try again later.', false))
  }

  // Find the pending subscriber with matching token
  const checkResp = await fetch(
    supabaseUrl + '/rest/v1/leads?email=eq.' + encodeURIComponent(email) + '&source=eq.newsletter&status=eq.pending&message=eq.confirm:' + token + '&select=id,name&limit=1',
    { headers: { apikey: supabaseKey, Authorization: 'Bearer ' + supabaseKey } }
  )
  const rows = await checkResp.json()

  if (!Array.isArray(rows) || rows.length === 0) {
    // Check if already confirmed
    const confirmedCheck = await fetch(
      supabaseUrl + '/rest/v1/leads?email=eq.' + encodeURIComponent(email) + '&source=eq.newsletter&status=eq.confirmed&select=id&limit=1',
      { headers: { apikey: supabaseKey, Authorization: 'Bearer ' + supabaseKey } }
    )
    const confirmedRows = await confirmedCheck.json()
    if (Array.isArray(confirmedRows) && confirmedRows.length > 0) {
      return res.status(200).send(page('You are already confirmed! You will receive the next newsletter.', true))
    }
    return res.status(400).send(page('This confirmation link is invalid or has expired.', false))
  }

  // Update status to confirmed
  await fetch(
    supabaseUrl + '/rest/v1/leads?email=eq.' + encodeURIComponent(email) + '&source=eq.newsletter&status=eq.pending',
    {
      method: 'PATCH',
      headers: {
        apikey: supabaseKey, Authorization: 'Bearer ' + supabaseKey,
        'Content-Type': 'application/json', Prefer: 'return=minimal',
      },
      body: JSON.stringify({ status: 'confirmed', message: 'Newsletter signup (confirmed)' }),
    }
  )

  // Send welcome email now that they're confirmed
  if (resendKey) {
    const name = rows[0].name || 'there'
    const firstName = name.split(' ')[0]
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'Dr. Tee | Quantum 5D <alerts@quantum5dconsulting.com>',
        to: [email],
        subject: 'Welcome to FQHC Operations Intelligence',
        html: buildWelcomeHtml(firstName),
        reply_to: 'info@quantum5dconsulting.com',
      }),
    })

    // NOW send admin notification
    const adminEmail = process.env.ADMIN_EMAIL
    if (adminEmail) {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Quantum 5D <alerts@quantum5dconsulting.com>',
          to: [adminEmail],
          subject: 'Newsletter confirmed: ' + email,
          text: 'Confirmed subscriber!\n\nEmail: ' + email + '\nName: ' + name
            + '\nTime: ' + new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
        }),
      })
    }
  }

  return res.status(200).send(page('You are confirmed! Welcome to FQHC Operations Intelligence. Check your inbox for a welcome email with free resources.', true))
}

function buildWelcomeHtml(firstName: string): string {
  return '<!DOCTYPE html><html><body style="font-family:Georgia,serif;max-width:580px;margin:0 auto;color:#2D2D2D;line-height:1.7;font-size:15.5px;padding:20px">'
    + '<div style="margin-bottom:28px"><table cellpadding="0" cellspacing="0" border="0"><tr>'
    + '<td style="padding-right:12px"><img src="https://quantum5d.ai/logo.png" alt="" width="32" height="32" style="width:32px;height:32px;border-radius:6px" /></td>'
    + '<td><span style="font-family:Georgia,serif;font-size:18px;font-weight:600;color:#5347A4;letter-spacing:0.01em">FQHC Operations Intelligence</span></td>'
    + '</tr></table></div>'
    + '<p>Hi ' + firstName + ',</p>'
    + '<p>Welcome to <strong>FQHC Operations Intelligence</strong> from Quantum 5D Consulting.</p>'
    + '<p>Once a month, we send you one sharp insight on FQHC operations, compliance, or 340B strategy.</p>'
    + '<p><strong>What to expect:</strong></p>'
    + '<ul style="padding-left:20px">'
    + '<li>One email per month — no spam, no filler</li>'
    + '<li>Real operational problems with real solutions</li>'
    + '<li>Live demos of AI tools built for FQHCs</li>'
    + '</ul>'
    + '<p>Here are a few resources to explore:</p>'
    + '<div style="margin:20px 0">'
    + '<div style="background:#f3e8ff;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5d.ai/briefs/platform-executive-brief.html" style="color:#7c3aed;font-weight:bold;font-size:16px;text-decoration:none">Platform Executive Brief</a>'
    + '<p style="color:#6b21a8;margin:4px 0 0;font-size:14px">Full overview of all 15 FQHC applications</p></div>'
    + '<div style="background:#f3e8ff;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/340B-Program-Compliance-Checklist.pdf" style="color:#7c3aed;font-weight:bold;font-size:16px;text-decoration:none">340B Compliance Checklist (PDF)</a>'
    + '<p style="color:#6b21a8;margin:4px 0 0;font-size:14px">HRSA audit preparation and compliance gap analysis</p></div>'
    + '<div style="background:#f3e8ff;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/340b-savings-calculator.pdf" style="color:#7c3aed;font-weight:bold;font-size:16px;text-decoration:none">340B Savings Calculator &amp; ROI Tool</a>'
    + '<p style="color:#6b21a8;margin:4px 0 0;font-size:14px">Quantify your program savings and identify opportunities</p></div></div>'
    + '<p>Questions? Just reply to this email.</p>'
    + '<p style="margin-top:24px">&mdash; Dr. Tee<br><span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
    + '<p style="color:#999;font-size:13px;margin-top:36px;border-top:1px solid #E6E3F2;padding-top:16px">'
    + '<span style="color:#5347A4;font-family:Georgia,serif;font-weight:600">FQHC Operations Intelligence</span><br>'
    + 'Quantum 5D Consulting, LLC<br>'
    + '<a href="https://quantum5dconsulting.com" style="color:#7c3aed">quantum5dconsulting.com</a> | '
    + '<a href="https://quantum5d.ai" style="color:#7c3aed">quantum5d.ai</a></p>'
    + '</body></html>'
}

function page(message: string, success: boolean): string {
  const color = success ? '#5347A4' : '#D9534F'
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>' + (success ? 'Confirmed' : 'Error') + ' — FQHC Operations Intelligence</title>'
    + '<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,600&family=Inter:wght@400;500&display=swap" rel="stylesheet">'
    + '<style>body{font-family:"Inter",sans-serif;background:#F6F5FB;margin:0;padding:60px 20px;text-align:center;color:#14112E}'
    + '.card{max-width:480px;margin:0 auto;background:#fff;border:1px solid #E4E1EF;border-radius:12px;padding:40px}'
    + 'h1{font-family:"Newsreader",Georgia,serif;font-size:22px;color:' + color + ';margin:0 0 16px}'
    + 'p{font-size:15px;line-height:1.6;color:#5E5A78;margin:0 0 20px}'
    + 'a{color:#5347A4;font-weight:500;text-decoration:none}a:hover{text-decoration:underline}</style></head>'
    + '<body><div class="card">'
    + '<h1>' + (success ? 'Subscription Confirmed!' : 'Error') + '</h1>'
    + '<p>' + message + '</p>'
    + '<a href="https://quantum5d.ai">Back to quantum5d.ai</a>'
    + '</div></body></html>'
}
