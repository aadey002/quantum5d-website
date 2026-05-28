// POST /api/prerender-purge
// Purges Prerender.io cache for specific URLs when new content is published.
// Called by content publish flow (e.g., after a new blog post goes live).
//
// Body: { urls: string[] }  — array of full URLs to purge
// Auth: requires PRERENDER_TOKEN in Authorization header

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', 'https://quantum5dconsulting.com')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify auth — caller must send the prerender token
  const authHeader = req.headers.authorization || ''
  const prerenderToken = process.env.PRERENDER_TOKEN
  if (!prerenderToken || authHeader !== 'Bearer ' + prerenderToken) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  const { urls } = req.body || {}
  if (!Array.isArray(urls) || urls.length === 0) {
    return res.status(400).json({ error: 'urls array is required' })
  }

  if (urls.length > 50) {
    return res.status(400).json({ error: 'Maximum 50 URLs per request' })
  }

  const results: { url: string; status: string }[] = []

  for (const url of urls) {
    try {
      const purgeRes = await fetch('https://api.prerender.io/recache', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Prerender-Token': prerenderToken,
        },
        body: JSON.stringify({ url }),
      })

      results.push({
        url,
        status: purgeRes.ok ? 'purged' : 'failed (' + purgeRes.status + ')',
      })
    } catch (err) {
      results.push({
        url,
        status: 'error: ' + (err instanceof Error ? err.message : String(err)),
      })
    }
  }

  return res.status(200).json({ success: true, results })
}
