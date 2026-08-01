// GET /api/blog-fallback
// Redirects unknown /blog/:slug paths to /blog listing.
// Used as rewrite destination when a static blog post file doesn't exist.

import type { VercelRequest, VercelResponse } from '@vercel/node'

export default function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Location', '/blog')
  res.status(301).end()
}
