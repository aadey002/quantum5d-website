import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
const PWD_HASH = 'bdb8ef9d9f9b64b5b74f75931e144f589f7b0ab405d3c77c3c773684e40d6c1b'

interface PostRow {
  url: string
  share_id: string
  date: string
  engagements: number
  impressions: number
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).end()

  if (!SUPABASE_KEY) {
    return res.status(500).json({ error: 'Missing SUPABASE_SERVICE_ROLE_KEY' })
  }

  const { posts: postRows, auth_hash } = req.body || {}

  if (auth_hash !== PWD_HASH) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  if (!postRows || !Array.isArray(postRows) || postRows.length === 0) {
    return res.status(400).json({ error: 'No posts provided' })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  // Fetch all linkedin posts with their linkedin_post_id
  const { data: dbPosts, error: fetchErr } = await supabase
    .from('linkedin_posts')
    .select('id,linkedin_post_id,content,engagement_data')

  if (fetchErr || !dbPosts) {
    return res.status(500).json({ error: 'Failed to fetch posts: ' + (fetchErr?.message || 'unknown') })
  }

  // Build lookup by share ID
  const shareIdMap = new Map<string, typeof dbPosts[0]>()
  for (const post of dbPosts) {
    if (post.linkedin_post_id) {
      // Extract numeric ID from urn:li:share:XXXXXXX
      const match = String(post.linkedin_post_id).match(/(\d{10,})/)
      if (match) shareIdMap.set(match[1], post)
    }
  }

  const results: Array<{ shareId: string; url: string; matched: boolean; postId?: string }> = []
  let updated = 0

  for (const row of postRows as PostRow[]) {
    const shareId = row.share_id

    const dbPost = shareIdMap.get(shareId)
    if (dbPost) {
      // Merge: keep existing data, overlay new values
      const existing = dbPost.engagement_data || {}
      const engagement = {
        ...existing,
        impressions: row.impressions || existing.impressions || 0,
        engagements: row.engagements || existing.engagements || 0,
        tracked_at: new Date().toISOString(),
        source: 'xlsx_import',
      }

      const { error: updateErr } = await supabase
        .from('linkedin_posts')
        .update({ engagement_data: engagement })
        .eq('id', dbPost.id)

      if (!updateErr) {
        updated++
        results.push({ shareId, url: row.url, matched: true, postId: dbPost.id })
      } else {
        results.push({ shareId, url: row.url, matched: false })
      }
    } else {
      results.push({ shareId, url: row.url, matched: false })
    }
  }

  return res.status(200).json({
    success: true,
    total: postRows.length,
    matched: updated,
    unmatched: postRows.length - updated,
    results,
  })
}
