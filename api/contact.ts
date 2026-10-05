import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

// Rate limiter: simple in-memory (resets per cold start)
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

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

async function sendEmail(resendKey: string, opts: { from: string; to: string[]; replyTo?: string; subject: string; html?: string; text?: string }): Promise<boolean> {
  try {
    const resp = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
      body: JSON.stringify(opts),
    })
    if (!resp.ok) {
      const body = await resp.text()
      console.error('Resend error:', resp.status, body)
      return false
    }
    return true
  } catch (e) {
    console.error('Resend exception:', e)
    return false
  }
}

// ── ROI visitor report email ──────────────────────────────────────
function buildRoiVisitorEmail(inputs: Record<string, string>, results: Record<string, string>, org: string): string {
  const totalVal = results.total || '$0'
  const rows = [
    ['Total Medicaid patients', inputs.panel || '—'],
    ['% renewal due ≤30 days', (inputs.renewal || '—') + '%'],
    ['% procedural loss (without CG)', (inputs.loss || '—') + '%'],
    ['PPS revenue per visit', '$' + (inputs.pps || '—')],
    ['Average visits per patient/year', inputs.visits || '—'],
    ['% dual eligible patients', (inputs.dual || '—') + '%'],
    ['340B margin per patient/year', '$' + (inputs.margin340b || '—')],
    ['% H.R.1 work-req subjects', (inputs.hr1 || '—') + '%'],
    ['Navigator avg annual salary', '$' + (inputs.navSalary || '—')],
    ['% time saved with CoverageGuard IQ', (inputs.timeSaved || '—') + '%'],
  ]

  const breakdown = [
    ['Patients at renewal risk', results.atRisk || '—'],
    ['Revenue at risk annually', results.revRisk || '—', '#F87171'],
    ['Revenue protected by CoverageGuard', results.revSaved || '—', '#34D399'],
    ['340B margin protected', results.margin340bSaved || '—', '#34D399'],
    ['H.R.1 subjects (patients)', results.hr1Subjects || '—', ''],
    ['Navigator time savings (annual)', results.navSaved || '—', '#34D399'],
  ]

  let inputRows = ''
  for (const r of rows) {
    inputRows += '<tr><td style="padding:8px 12px;border-bottom:1px solid #E4E1EF;color:#5E5A78;font-size:13px">' + esc(r[0]) + '</td>'
      + '<td style="padding:8px 12px;border-bottom:1px solid #E4E1EF;color:#14112E;font-weight:600;font-size:14px;text-align:right">' + esc(r[1]) + '</td></tr>'
  }

  let breakdownRows = ''
  for (const r of breakdown) {
    const color = r[2] || '#14112E'
    breakdownRows += '<tr><td style="padding:8px 12px;border-bottom:1px solid #E4E1EF;color:#5E5A78;font-size:13px">' + esc(r[0]) + '</td>'
      + '<td style="padding:8px 12px;border-bottom:1px solid #E4E1EF;font-weight:700;font-size:15px;text-align:right;color:' + color + '">' + esc(r[1]) + '</td></tr>'
  }

  return '<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;background:#F6F5FB">'
    + '<div style="max-width:600px;margin:0 auto;padding:20px">'
    // Header
    + '<div style="background:linear-gradient(135deg,#403592,#5347A4);padding:30px;border-radius:12px 12px 0 0;text-align:center">'
    + '<div style="font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:#C8B8F0;margin-bottom:8px">Your Personalized ROI Report</div>'
    + '<div style="font-size:38px;font-weight:800;color:#fff;line-height:1">' + esc(totalVal) + '</div>'
    + '<div style="font-size:13px;color:#E0D8F4;margin-top:6px">Illustrative Annual Opportunity</div>'
    + '</div>'
    // Body
    + '<div style="background:#fff;border:1px solid #E4E1EF;border-top:none;padding:28px;border-radius:0 0 12px 12px">'
    + (org ? '<p style="color:#5E5A78;font-size:14px;margin:0 0 20px">Prepared for <strong>' + esc(org) + '</strong></p>' : '')
    // Breakdown
    + '<h2 style="font-size:16px;color:#14112E;margin:0 0 12px;font-weight:700">Opportunity Breakdown</h2>'
    + '<table style="width:100%;border-collapse:collapse;margin-bottom:24px">' + breakdownRows + '</table>'
    // Inputs
    + '<h2 style="font-size:16px;color:#14112E;margin:0 0 12px;font-weight:700">Your Inputs</h2>'
    + '<table style="width:100%;border-collapse:collapse;margin-bottom:24px">' + inputRows + '</table>'
    // Sources
    + '<div style="background:#F6F5FB;padding:14px;border-radius:8px;margin-bottom:24px">'
    + '<div style="font-size:11px;font-weight:700;color:#5E5A78;text-transform:uppercase;letter-spacing:.05em;margin-bottom:6px">Sources &amp; Assumptions</div>'
    + '<p style="font-size:11px;color:#5E5A78;line-height:1.6;margin:0">Procedural loss rate 10-15% (KFF/MACPAC Unwinding 2023-24). PPS rate $310 (HRSA UDS 2023 FQHC avg). 340B margin $1,200/pt (340B Health/NACHC 2024). Navigator salary $58K (BLS SOC 21-1091 median 2024). Dual eligible 18% (CMS Medicare-Medicaid 2024). H.R.1 subjects 35% (CMS/OHCA projections). This is an illustrative model, not a financial forecast.</p>'
    + '</div>'
    // CTA
    + '<div style="text-align:center;margin:24px 0 16px">'
    + '<a href="https://quantum5d.ai/#contact" style="display:inline-block;background:#5347A4;color:#fff;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none">Book a 15-minute briefing</a>'
    + '</div>'
    // Signature
    + '<hr style="border:none;border-top:1px solid #E4E1EF;margin:24px 0">'
    + '<p style="color:#5E5A78;font-size:13px;margin:0">Dr. Adetoro Oriaifo, PharmD, MBA, CHCEF, FACHE</p>'
    + '<p style="color:#938ABD;font-size:12px;margin:4px 0 0">Quantum 5D Consulting</p>'
    + '</div></div></body></html>'
}

// ── Exit-intent resource email ────────────────────────────────────
function buildExitIntentEmail(firstName: string): string {
  return '<!DOCTYPE html><html><body style="font-family:Arial,Helvetica,sans-serif;margin:0;padding:0;background:#F6F5FB">'
    + '<div style="max-width:600px;margin:0 auto;padding:20px">'
    + '<div style="background:linear-gradient(135deg,#403592,#5347A4);padding:30px;border-radius:12px 12px 0 0;text-align:center">'
    + '<h1 style="color:#fff;margin:0;font-size:24px">Your Free 340B Tools</h1>'
    + '<p style="color:#E0D8F4;margin:8px 0 0;font-size:14px">3 resources to strengthen your 340B program</p>'
    + '</div>'
    + '<div style="background:#fff;border:1px solid #E4E1EF;border-top:none;padding:28px;border-radius:0 0 12px 12px">'
    + '<p style="color:#14112E;font-size:15px;margin:0 0 20px">Hi ' + esc(firstName) + ',</p>'
    + '<p style="color:#5E5A78;font-size:14px;margin:0 0 24px">Here are the 3 tools we promised. Click to download:</p>'
    // Resource 1
    + '<div style="background:#F6F5FB;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/340B-Program-Compliance-Checklist.pdf" style="color:#5347A4;font-weight:700;font-size:15px;text-decoration:none">340B Compliance Checklist (PDF)</a>'
    + '<p style="color:#5E5A78;margin:4px 0 0;font-size:13px">HRSA audit preparation and compliance gap analysis</p>'
    + '</div>'
    // Resource 2
    + '<div style="background:#F6F5FB;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/340b-savings-calculator.pdf" style="color:#5347A4;font-weight:700;font-size:15px;text-decoration:none">340B Savings Calculator (PDF)</a>'
    + '<p style="color:#5E5A78;margin:4px 0 0;font-size:13px">Quantify your 340B program ROI and identify missed savings</p>'
    + '</div>'
    // Resource 3
    + '<div style="background:#F6F5FB;padding:16px;border-radius:8px;margin-bottom:12px">'
    + '<a href="https://quantum5dconsulting.com/resources/Pharmacy-Regulatory-Compliance-Training-Manual.pdf" style="color:#5347A4;font-weight:700;font-size:15px;text-decoration:none">Compliance Training Manual (PDF)</a>'
    + '<p style="color:#5E5A78;margin:4px 0 0;font-size:13px">70-page guide covering regulatory compliance essentials</p>'
    + '</div>'
    // CTA
    + '<div style="text-align:center;margin:24px 0 16px">'
    + '<a href="https://quantum5d.ai/#contact" style="display:inline-block;background:#5347A4;color:#fff;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none">Book a 15-minute briefing</a>'
    + '</div>'
    + '<hr style="border:none;border-top:1px solid #E4E1EF;margin:24px 0">'
    + '<p style="color:#5E5A78;font-size:13px;margin:0">Dr. Adetoro Oriaifo, PharmD, MBA, CHCEF, FACHE</p>'
    + '<p style="color:#938ABD;font-size:12px;margin:4px 0 0">Quantum 5D Consulting</p>'
    + '</div></div></body></html>'
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

  const body = req.body || {}
  const { email, source: reqSource, _hp } = body

  // Honeypot
  if (_hp) return res.status(200).json({ success: true })

  // Validate email (always required)
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    return res.status(400).json({ error: 'A valid email is required.' })
  }

  const source = (reqSource || 'quantum5d.ai').toString().slice(0, 100)
  const isRoiEmail = source === 'roi-email'
  const isExitIntent = source === 'exit-intent' || source === 'lcExit'
  const isProtoCta = (source || '').startsWith('proto-cta-')

  // For non-ROI sources, name is required
  if (!isRoiEmail && !body.name) {
    return res.status(400).json({ error: 'Name is required.' })
  }

  const timestamp = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })

  // Build lead record
  const lead: Record<string, unknown> = {
    name: isRoiEmail ? (body.organization || 'ROI report request') : (body.name || '').trim().slice(0, 200),
    organization: (body.organization || '').trim().slice(0, 200) || null,
    email: email.trim().toLowerCase().slice(0, 200),
    message: isRoiEmail
      ? 'ROI Calculator: ' + (body.roi_results?.total || '—') + ' opportunity'
      : (body.message || '').trim().slice(0, 2000) || null,
    source: source,
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

  // --- 2. Emails ---
  const resendKey = process.env.RESEND_API_KEY
  const adminEmail = process.env.ADMIN_EMAIL
  const smsGateway = process.env.SMS_GATEWAY
  const fromAddr = 'Quantum 5D <alerts@quantum5dconsulting.com>'
  let visitorEmailSent = false

  if (!resendKey || !adminEmail) {
    return res.status(200).json({ success: true, visitor_email_sent: false })
  }

  // ── ROI Email ──────────────────────────────────────────────────
  if (isRoiEmail) {
    const inputs = body.roi_inputs || {}
    const results = body.roi_results || {}
    const org = (body.organization || '').trim()
    const orgLabel = org || email.split('@')[1] || 'Unknown'
    const totalVal = results.total || '$0'

    // Visitor report
    visitorEmailSent = await sendEmail(resendKey, {
      from: fromAddr,
      to: [email.trim().toLowerCase()],
      replyTo: 'hello@quantum5d.ai',
      subject: 'Your FQHC Coverage & Revenue Opportunity: ' + totalVal,
      html: buildRoiVisitorEmail(inputs, results, org),
    })

    // Internal alert
    const internalLines = [
      'Source: ROI Calculator email gate',
      'Email: ' + email,
      'Organization: ' + (org || '—'),
      'Timestamp: ' + timestamp,
      'Referrer: ' + (body.referrer || '—'),
      'UTM: ' + [body.utm_source, body.utm_medium, body.utm_campaign].filter(Boolean).join(' / ') || '—',
      '',
      '── Inputs ──',
      'Total Medicaid patients: ' + (inputs.panel || '—'),
      '% renewal due ≤30 days: ' + (inputs.renewal || '—') + '%',
      '% procedural loss: ' + (inputs.loss || '—') + '%',
      'PPS revenue/visit: $' + (inputs.pps || '—'),
      'Avg visits/pt/year: ' + (inputs.visits || '—'),
      '% dual eligible: ' + (inputs.dual || '—') + '%',
      '340B margin/pt/year: $' + (inputs.margin340b || '—'),
      '% H.R.1 subjects: ' + (inputs.hr1 || '—') + '%',
      'Navigator salary: $' + (inputs.navSalary || '—'),
      '% time saved w/ CG: ' + (inputs.timeSaved || '—') + '%',
      '',
      '── Results ──',
      'Patients at risk: ' + (results.atRisk || '—'),
      'Revenue at risk: ' + (results.revRisk || '—'),
      'Revenue protected: ' + (results.revSaved || '—'),
      '340B margin protected: ' + (results.margin340bSaved || '—'),
      'H.R.1 subjects: ' + (results.hr1Subjects || '—'),
      'Navigator savings: ' + (results.navSaved || '—'),
      'TOTAL: ' + totalVal,
    ]

    await sendEmail(resendKey, {
      from: fromAddr,
      to: [adminEmail],
      subject: 'ROI lead: ' + orgLabel + ' — ' + totalVal + ' opportunity',
      text: internalLines.join('\n'),
    })

    // SMS
    if (smsGateway) {
      await sendEmail(resendKey, {
        from: fromAddr,
        to: [smsGateway],
        subject: '',
        text: 'ROI lead: ' + orgLabel + ' (' + email + ') — ' + totalVal,
      })
    }

  // ── Exit-intent / Proto CTA ────────────────────────────────────
  } else if (isExitIntent || isProtoCta) {
    const personName = (body.name || 'there').trim()
    const firstName = personName.split(' ')[0]

    // Internal alert
    await sendEmail(resendKey, {
      from: fromAddr,
      to: [adminEmail],
      subject: 'Q5D Lead: ' + personName + ' (' + source + ')',
      text: 'Name: ' + personName + '\nEmail: ' + email + '\nSource: ' + source + '\nMessage: ' + (body.message || '—') + '\nTime: ' + timestamp,
    })

    if (smsGateway) {
      await sendEmail(resendKey, {
        from: fromAddr,
        to: [smsGateway],
        subject: '',
        text: 'Q5D ' + source + ': ' + personName + ' — ' + email,
      })
    }

    // Visitor auto-reply
    if (isExitIntent) {
      visitorEmailSent = await sendEmail(resendKey, {
        from: fromAddr,
        to: [email.trim().toLowerCase()],
        replyTo: 'hello@quantum5d.ai',
        subject: 'Your Free 340B Tools from Quantum5D',
        html: buildExitIntentEmail(firstName),
      })
    } else {
      // Proto CTA — send platform overview (existing behavior)
      visitorEmailSent = await sendEmail(resendKey, {
        from: fromAddr,
        to: [email.trim().toLowerCase()],
        replyTo: 'hello@quantum5d.ai',
        subject: 'Your Quantum5D Platform Overview',
        html: '<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px">'
          + '<div style="background:linear-gradient(135deg,#403592,#5347A4);padding:30px;border-radius:12px 12px 0 0;text-align:center">'
          + '<h1 style="color:#fff;margin:0;font-size:24px">Your Quantum5D Platform Overview</h1>'
          + '</div>'
          + '<div style="background:#fff;border:1px solid #E4E1EF;border-top:none;padding:28px;border-radius:0 0 12px 12px">'
          + '<p style="color:#14112E;font-size:15px">Hi ' + esc(firstName) + ',</p>'
          + '<p style="color:#5E5A78;font-size:14px">Thanks for exploring the prototype. Here are some resources:</p>'
          + '<div style="background:#F6F5FB;padding:16px;border-radius:8px;margin:16px 0"><a href="https://quantum5d.ai/briefs/platform-executive-brief.html" style="color:#5347A4;font-weight:700;font-size:15px;text-decoration:none">Platform Executive Brief</a><p style="color:#5E5A78;margin:4px 0 0;font-size:13px">Full overview of all 15 FQHC applications</p></div>'
          + '<div style="background:#F6F5FB;padding:16px;border-radius:8px;margin:16px 0"><a href="https://quantum5d.ai/briefs/coverageguard-iq-executive-brief.html" style="color:#5347A4;font-weight:700;font-size:15px;text-decoration:none">CoverageGuard IQ Brief</a><p style="color:#5E5A78;margin:4px 0 0;font-size:13px">Flagship coverage compliance application</p></div>'
          + '<div style="text-align:center;margin:24px 0 16px"><a href="https://quantum5d.ai/#contact" style="display:inline-block;background:#5347A4;color:#fff;padding:14px 32px;border-radius:8px;font-size:15px;font-weight:700;text-decoration:none">Book a 15-minute briefing</a></div>'
          + '<hr style="border:none;border-top:1px solid #E4E1EF;margin:24px 0">'
          + '<p style="color:#5E5A78;font-size:13px;margin:0">Dr. Adetoro Oriaifo, PharmD, MBA, CHCEF, FACHE</p>'
          + '<p style="color:#938ABD;font-size:12px;margin:4px 0 0">Quantum 5D Consulting</p>'
          + '</div></body></html>',
      })
    }

  // ── General contact form ───────────────────────────────────────
  } else {
    const leadName = (body.name || '').trim().slice(0, 200)
    const org = (body.organization || '').trim()
    const subject = 'Q5D Lead: ' + leadName + (org ? ' (' + org + ')' : '')
    const text = 'New Quantum 5D inquiry!\n\n'
      + 'Name: ' + leadName + '\n'
      + 'Organization: ' + (org || '—') + '\n'
      + 'Email: ' + email + '\n'
      + 'Message:\n' + (body.message || '—') + '\n\n'
      + 'Submitted: ' + timestamp + '\n'
      + 'Source: ' + source

    await sendEmail(resendKey, { from: fromAddr, to: [adminEmail], subject, text })

    if (smsGateway) {
      await sendEmail(resendKey, {
        from: fromAddr,
        to: [smsGateway],
        subject: '',
        text: 'Q5D Lead: ' + leadName + (org ? ' (' + org + ')' : '') + ' — ' + email,
      })
    }
  }

  return res.status(200).json({ success: true, visitor_email_sent: visitorEmailSent })
}
