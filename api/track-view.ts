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

  const { post_id, slug } = req.body || {}
  if (!post_id || !slug) return res.status(400).json({ error: 'Missing post_id or slug' })

  if (!SUPABASE_KEY) return res.status(200).end()

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
  const referrer = req.headers.referer || req.headers.referrer || null

  await supabase.from('blog_views').insert({
    post_id: parseInt(post_id),
    slug: String(slug).slice(0, 200),
    referrer: referrer ? String(referrer).slice(0, 500) : null,
    source: 'website',
  })

  return res.status(200).json({ ok: true })
}
