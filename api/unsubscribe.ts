// GET /api/unsubscribe?email=...
// One-click unsubscribe from newsletter.

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const email = ((req.query.email as string) || '').trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.setHeader('Content-Type', 'text/html')
    return res.status(400).send(page('Invalid email address.', false))
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    res.setHeader('Content-Type', 'text/html')
    return res.status(500).send(page('Server configuration error. Please email info@quantum5dconsulting.com to unsubscribe.', false))
  }

  try {
    const resp = await fetch(
      supabaseUrl + '/rest/v1/leads?email=eq.' + encodeURIComponent(email) + '&source=eq.newsletter',
      {
        method: 'PATCH',
        headers: {
          apikey: supabaseKey,
          Authorization: 'Bearer ' + supabaseKey,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({ status: 'unsubscribed' }),
      }
    )
    const data = await resp.json()
    const count = Array.isArray(data) ? data.length : 0

    if (count > 0) {
      res.setHeader('Content-Type', 'text/html')
      return res.status(200).send(page('You have been unsubscribed. You will no longer receive the FQHC Operations Intelligence newsletter.', true))
    } else {
      res.setHeader('Content-Type', 'text/html')
      return res.status(200).send(page('That email was not found in our subscriber list. You may already be unsubscribed.', true))
    }
  } catch (e) {
    console.error('Unsubscribe error:', e)
    res.setHeader('Content-Type', 'text/html')
    return res.status(500).send(page('Something went wrong. Please email info@quantum5dconsulting.com to unsubscribe.', false))
  }
}

function page(message: string, success: boolean): string {
  const color = success ? '#5347A4' : '#D9534F'
  return '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">'
    + '<title>Unsubscribe — Quantum5D</title>'
    + '<link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,600&family=Inter:wght@400;500&display=swap" rel="stylesheet">'
    + '<style>body{font-family:"Inter",sans-serif;background:#F6F5FB;margin:0;padding:60px 20px;text-align:center;color:#14112E}'
    + '.card{max-width:480px;margin:0 auto;background:#fff;border:1px solid #E4E1EF;border-radius:12px;padding:40px}'
    + 'h1{font-family:"Newsreader",Georgia,serif;font-size:22px;color:' + color + ';margin:0 0 16px}'
    + 'p{font-size:15px;line-height:1.6;color:#5E5A78;margin:0 0 20px}'
    + 'a{color:#5347A4;font-weight:500;text-decoration:none}a:hover{text-decoration:underline}</style></head>'
    + '<body><div class="card">'
    + '<h1>' + (success ? 'Unsubscribed' : 'Error') + '</h1>'
    + '<p>' + message + '</p>'
    + '<a href="https://quantum5d.ai">Back to quantum5d.ai</a>'
    + '</div></body></html>'
}
