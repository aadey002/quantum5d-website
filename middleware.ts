// Vercel Edge Middleware — bot detection + Prerender.io proxy
// For Vite SPA: uses Web Standards API (not Next.js)
// Docs: https://vercel.com/docs/functions/edge-middleware

import type { RequestContext } from '@vercel/edge'

const BOT_USER_AGENTS = [
  'googlebot',
  'bingbot',
  'linkedinbot',
  'twitterbot',
  'slackbot',
  'facebot',
  'facebookexternalhit',
  'whatsapp',
  'telegrambot',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'ia_archiver',
  'rogerbot',
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'pinterest',
  'applebot',
  'semrushbot',
  'ahrefsbot',
]

const SKIP_EXTENSIONS = /\.(svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|map|json|xml|txt)$/i

const SKIP_PATHS = [
  '/api/',
  '/assets/',
  '/images/',
  '/resources/',
  '/favicon.ico',
  '/robots.txt',
  '/sitemap.xml',
  '/logo.png',
]

function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase()
  return BOT_USER_AGENTS.some((bot) => ua.includes(bot))
}

function shouldSkip(pathname: string): boolean {
  if (SKIP_EXTENSIONS.test(pathname)) return true
  return SKIP_PATHS.some((p) => pathname.startsWith(p))
}

export default async function middleware(request: Request, context: RequestContext) {
  const url = new URL(request.url)
  const pathname = url.pathname
  const userAgent = request.headers.get('user-agent') || ''

  // Skip static assets and API routes
  if (shouldSkip(pathname)) {
    return
  }

  // Only proxy bot requests — humans get the SPA unchanged
  if (!isBot(userAgent)) {
    return
  }

  const prerenderToken = process.env.PRERENDER_TOKEN
  if (!prerenderToken) {
    // No prerender token configured — fall through to SPA
    return
  }

  // Cache TTL: 1 hour for /insights/*, 24 hours for everything else
  const isInsightsPath = pathname.startsWith('/insights')
  const cacheTTL = isInsightsPath ? 3600 : 86400

  // Build the Prerender.io service URL
  const targetUrl = url.protocol + '//' + url.host + pathname + url.search
  const prerenderUrl = 'https://service.prerender.io/' + targetUrl

  try {
    const prerenderRes = await fetch(prerenderUrl, {
      headers: {
        'X-Prerender-Token': prerenderToken,
        'User-Agent': userAgent,
      },
      signal: AbortSignal.timeout(10000),
    })

    if (!prerenderRes.ok) {
      console.error('Prerender returned ' + prerenderRes.status + ' for ' + pathname)
      return // Fall through to SPA
    }

    const html = await prerenderRes.text()

    return new Response(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=' + cacheTTL + ', stale-while-revalidate=60',
        'X-Prerender': 'true',
      },
    })
  } catch (err) {
    console.error('Prerender fetch failed for ' + pathname + ':', err)
    return // Fall through to SPA
  }
}

export const config = {
  matcher: [
    '/((?!api|assets|images|_next|favicon\\.ico|robots\\.txt|sitemap\\.xml|logo\\.png|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot|map|json)).*)',
  ],
}
