import type { VercelRequest, VercelResponse } from '@vercel/node'

const BOT_EMAILS = [
  'xxs.a.w.y.e.r.2.59@gmail.com',
  'l.o.w.i.e.kok@gmail.com',
  'e.r.in.c.s.i.mo@gmail.com',
  'b.i.n.g.e..gam.i.n.g.00.7@gmail.com',
  'vg.u.p.ta.124.5@gmail.com',
  'h.o.m.i.n.gts.u.n.g@gmail.com',
]

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!process.env.CRON_SECRET || req.query.key !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: 'Unauthorized' })
  }
  const url = process.env.SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  const results: string[] = []
  for (const email of BOT_EMAILS) {
    const r = await fetch(url + '/rest/v1/leads?email=eq.' + encodeURIComponent(email) + '&source=eq.newsletter', {
      method: 'PATCH',
      headers: { apikey: key, Authorization: 'Bearer ' + key, 'Content-Type': 'application/json', Prefer: 'return=representation' },
      body: JSON.stringify({ status: 'bot' }),
    })
    const d = await r.json()
    results.push(email + ': ' + (Array.isArray(d) ? d.length : 0))
  }
  return res.status(200).json({ results })
}
