import type { VercelRequest, VercelResponse } from '@vercel/node'

const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''

// Static pages with their priorities
const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/applications', priority: '0.9', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.9', changefreq: 'daily' },
  { loc: '/services', priority: '0.8', changefreq: 'monthly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/resources', priority: '0.8', changefreq: 'monthly' },
  { loc: '/case-studies', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.6', changefreq: 'monthly' },
  { loc: '/apprenticeship', priority: '0.7', changefreq: 'monthly' },
  { loc: '/free-assessment', priority: '0.7', changefreq: 'monthly' },
  { loc: '/careers', priority: '0.6', changefreq: 'monthly' },
  { loc: '/partners', priority: '0.7', changefreq: 'monthly' },
  { loc: '/roadmap', priority: '0.6', changefreq: 'monthly' },
  { loc: '/security-and-trust', priority: '0.6', changefreq: 'monthly' },
  // Application subpages
  { loc: '/applications/coverage', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/osv', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/dtm', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/certiq', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/sentinel', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/compliance', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/loopproof', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/board', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/meeting', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/benchmark', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/serviceline', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/ira', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/budget', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/abandon', priority: '0.7', changefreq: 'monthly' },
  { loc: '/applications/trureach', priority: '0.7', changefreq: 'monthly' },
]

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatDate(d: string): string {
  // Return YYYY-MM-DD from ISO or date string
  return d.slice(0, 10)
}

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  const today = new Date().toISOString().slice(0, 10)
  const BASE = 'https://quantum5d.ai'

  // Fetch published blog posts from Supabase
  let blogPosts: Array<{ slug: string; published_date: string; updated_at: string }> = []

  if (SUPABASE_KEY) {
    try {
      const response = await fetch(
        SUPABASE_URL + '/rest/v1/blog_posts?status=eq.published&select=slug,published_date,updated_at&order=published_date.desc',
        {
          headers: {
            'apikey': SUPABASE_KEY,
            'Authorization': 'Bearer ' + SUPABASE_KEY,
          },
        }
      )
      if (response.ok) {
        blogPosts = await response.json()
      }
    } catch (e) {
      // Fall through with empty blog posts — static pages still served
    }
  }

  // Build XML
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

  // Static pages
  for (const page of STATIC_PAGES) {
    xml += '  <url>\n'
    xml += '    <loc>' + escapeXml(BASE + page.loc) + '</loc>\n'
    xml += '    <lastmod>' + today + '</lastmod>\n'
    xml += '    <changefreq>' + page.changefreq + '</changefreq>\n'
    xml += '    <priority>' + page.priority + '</priority>\n'
    xml += '  </url>\n'
  }

  // Blog posts
  for (const post of blogPosts) {
    if (!post.slug) continue
    const lastmod = post.updated_at
      ? formatDate(post.updated_at)
      : post.published_date
        ? formatDate(post.published_date)
        : today

    xml += '  <url>\n'
    xml += '    <loc>' + escapeXml(BASE + '/blog/' + post.slug) + '</loc>\n'
    xml += '    <lastmod>' + lastmod + '</lastmod>\n'
    xml += '    <changefreq>monthly</changefreq>\n'
    xml += '    <priority>0.8</priority>\n'
    xml += '  </url>\n'
  }

  xml += '</urlset>'

  res.setHeader('Content-Type', 'application/xml; charset=utf-8')
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400')
  res.status(200).send(xml)
}
