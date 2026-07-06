import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).end()

  const { event_type, event_name, site, metadata } = req.body || {}
  if (!event_type || !event_name) return res.status(400).json({ error: 'Missing event_type or event_name' })

  if (!SUPABASE_KEY) return res.status(200).end()

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  await supabase.from('site_events').insert({
    event_type: String(event_type).slice(0, 50),
    event_name: String(event_name).slice(0, 200),
    site: String(site || 'quantum5d.ai').slice(0, 50),
    metadata: metadata || {},
  })

  return res.status(200).json({ ok: true })
}
