import type { VercelRequest, VercelResponse } from '@vercel/node'
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

// Simple auth — must match admin password hash
const PWD_HASH = 'bdb8ef9d9f9b64b5b74f75931e144f589f7b0ab405d3c77c3c773684e40d6c1b'

function normalize(s: string): string {
  return (s || '').replace(/[\s\n\r]+/g, ' ').trim().toLowerCase().slice(0, 120)
}

function similarity(a: string, b: string): number {
  const na = normalize(a)
  const nb = normalize(b)
  if (!na || !nb) return 0
  if (na === nb) return 1

  // Check if one contains the other
  if (na.includes(nb) || nb.includes(na)) return 0.9

  // Simple word overlap
  const wordsA = new Set(na.split(/\s+/).filter(w => w.length > 3))
  const wordsB = new Set(nb.split(/\s+/).filter(w => w.length > 3))
  if (wordsA.size === 0 || wordsB.size === 0) return 0

  let overlap = 0
  for (const w of wordsA) {
    if (wordsB.has(w)) overlap++
  }
  return overlap / Math.max(wordsA.size, wordsB.size)
}

interface CsvRow {
  content: string
  impressions: number
  clicks: number
  likes: number
  comments: number
  shares: number
  date?: string
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

  const { rows, auth_hash } = req.body || {}

  if (auth_hash !== PWD_HASH) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  if (!rows || !Array.isArray(rows) || rows.length === 0) {
    return res.status(400).json({ error: 'No rows provided' })
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

  // Fetch all linkedin posts
  const { data: posts, error: fetchErr } = await supabase
    .from('linkedin_posts')
    .select('id,content,posted_at,scheduled_date,engagement_data')

  if (fetchErr || !posts) {
    return res.status(500).json({ error: 'Failed to fetch posts: ' + (fetchErr?.message || 'unknown') })
  }

  const results: Array<{ csvContent: string; matched: boolean; postId?: string; similarity?: number }> = []
  let updated = 0

  for (const row of rows as CsvRow[]) {
    // Find best matching post
    let bestMatch: typeof posts[0] | null = null
    let bestScore = 0

    for (const post of posts) {
      const score = similarity(row.content, post.content || '')
      if (score > bestScore && score >= 0.4) {
        bestScore = score
        bestMatch = post
      }
    }

    if (bestMatch) {
      const engagement = {
        likes: row.likes || 0,
        comments: row.comments || 0,
        impressions: row.impressions || 0,
        clicks: row.clicks || 0,
        shares: row.shares || 0,
        tracked_at: new Date().toISOString(),
        source: 'csv_import',
      }

      const { error: updateErr } = await supabase
        .from('linkedin_posts')
        .update({ engagement_data: engagement })
        .eq('id', bestMatch.id)

      if (!updateErr) {
        updated++
        results.push({
          csvContent: row.content.slice(0, 60),
          matched: true,
          postId: bestMatch.id,
          similarity: Math.round(bestScore * 100),
        })
      } else {
        results.push({ csvContent: row.content.slice(0, 60), matched: false })
      }
    } else {
      results.push({ csvContent: row.content.slice(0, 60), matched: false })
    }
  }

  return res.status(200).json({
    success: true,
    total: rows.length,
    matched: updated,
    unmatched: rows.length - updated,
    results,
  })
}
