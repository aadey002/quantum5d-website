import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

const PWD_HASH = 'bdb8ef9d9f9b64b5b74f75931e144f589f7b0ab405d3c77c3c773684e40d6c1b'
const SB_URL   = 'https://kolxfjisvizwayyrlzyx.supabase.co'

function sha256(s: string) {
  return crypto.createHash('sha256').update(s).digest('hex')
}

async function sbQuery(path: string, serviceKey: string) {
  const r = await fetch(`${SB_URL}/rest/v1/${path}`, {
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
    },
  })
  if (!r.ok) throw new Error(`Supabase ${r.status}`)
  return r.json()
}

async function sbCount(table: string, serviceKey: string): Promise<number> {
  const r = await fetch(`${SB_URL}/rest/v1/${table}?select=*`, {
    method: 'HEAD',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      Prefer: 'count=exact',
      'Range-Unit': 'items',
      Range: '0-0',
    },
  })
  const range = r.headers.get('content-range')
  return range ? parseInt(range.split('/')[1]) || 0 : 0
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS — admin.html is same origin, but belt-and-suspenders
  res.setHeader('Cache-Control', 'no-store')

  // Verify admin password
  const token = (req.headers['x-admin-token'] as string) || ''
  if (!token || sha256(token) !== PWD_HASH) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceKey) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  const since = (req.query.since as string) || new Date(Date.now() - 30 * 86400000).toISOString()

  try {
    const [kpi, table, nlCount] = await Promise.all([
      sbQuery(`leads?select=id,source,message&created_at=gte.${since}`, serviceKey),
      sbQuery('leads?select=name,email,source,message,created_at&order=created_at.desc&limit=50', serviceKey),
      sbCount('newsletter_subscriptions', serviceKey),
    ])

    return res.status(200).json({ kpi, table, nlCount })
  } catch (err: any) {
    return res.status(500).json({ error: err.message })
  }
}
