// One-shot admin endpoint to mark bot newsletter signups.
// Call once: GET /api/admin-cleanup-bots?key=CRON_SECRET
// Safe to delete this file after running.

import type { VercelRequest, VercelResponse } from '@vercel/node'

const BOT_EMAILS = [
  'n.ico.lek.ug4p.oz.yz.r.woo.d@gmail.com',
  'lynel.l.e..fow.ler@gmail.com',
  'ab.a.dar.a.ed.3@gmail.com',
  'lo.ma.c109.8@gmail.com',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const secret = process.env.CRON_SECRET
  if (!secret || req.query.key !== secret) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).json({ error: 'Missing Supabase config' })
  }

  const results: string[] = []

  for (const email of BOT_EMAILS) {
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
        body: JSON.stringify({ status: 'bot' }),
      }
    )
    const data = await resp.json()
    const count = Array.isArray(data) ? data.length : 0
    results.push(email + ': ' + count + ' updated')
  }

  return res.status(200).json({ results })
}
