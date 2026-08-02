import type { VercelRequest, VercelResponse } from '@vercel/node'
import crypto from 'crypto'

// GA4 property IDs
const PROPERTIES = [
  { id: '496433313', name: 'quantum5dconsulting.com' },
  { id: '546933895', name: 'quantum5d.ai' },
]

const TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GA4_BASE = 'https://analyticsdata.googleapis.com/v1beta/properties'
const SCOPE = 'https://www.googleapis.com/auth/analytics.readonly'

// In-memory token cache
let cachedToken: { token: string; expiresAt: number } | null = null

function base64url(input: Buffer | string): string {
  const buf = typeof input === 'string' ? Buffer.from(input) : input
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

function getServiceAccountKey(): { client_email: string; private_key: string } | null {
  const raw = process.env.GA4_SERVICE_ACCOUNT_KEY
  if (!raw) return null
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf8')
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

async function getAccessToken(sa: { client_email: string; private_key: string }): Promise<string> {
  const now = Math.floor(Date.now() / 1000)

  // Return cached token if still valid (with 10min buffer)
  if (cachedToken && cachedToken.expiresAt > now) {
    return cachedToken.token
  }

  const header = base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))
  const claims = base64url(JSON.stringify({
    iss: sa.client_email,
    scope: SCOPE,
    aud: TOKEN_URL,
    iat: now,
    exp: now + 3600,
  }))

  const signInput = header + '.' + claims
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(signInput)
  const signature = base64url(sign.sign(sa.private_key))

  const jwt = signInput + '.' + signature

  const resp = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=' + encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer') + '&assertion=' + encodeURIComponent(jwt),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error('Token exchange failed: ' + resp.status + ' ' + text)
  }

  const data = await resp.json()
  // Cache for 50 minutes (tokens last 60)
  cachedToken = { token: data.access_token, expiresAt: now + 3000 }
  return data.access_token
}

async function runReport(
  token: string,
  propertyId: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>> {
  const resp = await fetch(GA4_BASE + '/' + propertyId + ':runReport', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error('GA4 API error for property ' + propertyId + ': ' + resp.status + ' ' + text)
  }

  return resp.json()
}

interface GARow {
  dimensionValues?: Array<{ value: string }>
  metricValues?: Array<{ value: string }>
}

function sumMetric(report: Record<string, unknown>, metricIndex: number): number {
  const rows = (report as { rows?: GARow[] }).rows || []
  let total = 0
  for (const row of rows) {
    total += parseInt((row.metricValues || [])[metricIndex]?.value || '0', 10)
  }
  return total
}

function extractDimensionMetric(
  report: Record<string, unknown>,
  dimIndex: number,
  metricIndex: number
): Array<{ key: string; value: number }> {
  const rows = (report as { rows?: GARow[] }).rows || []
  return rows.map((row) => ({
    key: (row.dimensionValues || [])[dimIndex]?.value || '(unknown)',
    value: parseInt((row.metricValues || [])[metricIndex]?.value || '0', 10),
  }))
}

async function fetchAllProperties(
  token: string,
  body: Record<string, unknown>
): Promise<Record<string, unknown>[]> {
  const results = await Promise.all(
    PROPERTIES.map((p) => runReport(token, p.id, body))
  )
  return results
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600')
  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'GET') return res.status(405).end()

  const sa = getServiceAccountKey()
  if (!sa) {
    return res.status(200).json({ error: 'GA4 not configured', data: null })
  }

  try {
    const token = await getAccessToken(sa)

    // --- 1. Visitors & sessions: last 7d vs previous 7d ---
    const [current7dReports, prev7dReports] = await Promise.all([
      fetchAllProperties(token, {
        dateRanges: [{ startDate: '7daysAgo', endDate: 'yesterday' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'sessions' },
        ],
      }),
      fetchAllProperties(token, {
        dateRanges: [{ startDate: '14daysAgo', endDate: '8daysAgo' }],
        metrics: [
          { name: 'totalUsers' },
          { name: 'sessions' },
        ],
      }),
    ])

    let visitors_7d = 0
    let sessions_7d = 0
    let visitors_prev_7d = 0
    let sessions_prev_7d = 0

    for (const r of current7dReports) {
      visitors_7d += sumMetric(r, 0)
      sessions_7d += sumMetric(r, 1)
    }
    for (const r of prev7dReports) {
      visitors_prev_7d += sumMetric(r, 0)
      sessions_prev_7d += sumMetric(r, 1)
    }

    // --- 2. Top pages (last 30d, both properties) ---
    const topPagesReports = await fetchAllProperties(token, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
      dimensions: [{ name: 'pagePath' }],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 20,
    })

    const pageMap = new Map<string, number>()
    for (const report of topPagesReports) {
      for (const item of extractDimensionMetric(report, 0, 0)) {
        pageMap.set(item.key, (pageMap.get(item.key) || 0) + item.value)
      }
    }
    const top_pages = Array.from(pageMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pagePath, views]) => ({ pagePath, views }))

    // --- 3. Traffic sources (last 30d, both properties) ---
    const sourceReports = await fetchAllProperties(token, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'sessions' }],
      orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
      limit: 20,
    })

    const sourceMap = new Map<string, number>()
    for (const report of sourceReports) {
      for (const item of extractDimensionMetric(report, 0, 0)) {
        sourceMap.set(item.key, (sourceMap.get(item.key) || 0) + item.value)
      }
    }
    const traffic_sources = Array.from(sourceMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([source, sessions]) => ({ source, sessions }))

    // --- 4. Daily visitors (last 30d for trend chart) ---
    const dailyReports = await fetchAllProperties(token, {
      dateRanges: [{ startDate: '30daysAgo', endDate: 'yesterday' }],
      dimensions: [{ name: 'date' }],
      metrics: [{ name: 'totalUsers' }],
      orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
    })

    const dailyMap = new Map<string, number>()
    for (const report of dailyReports) {
      for (const item of extractDimensionMetric(report, 0, 0)) {
        dailyMap.set(item.key, (dailyMap.get(item.key) || 0) + item.value)
      }
    }
    const daily_visitors = Array.from(dailyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, users]) => ({ date, users }))

    return res.status(200).json({
      error: null,
      data: {
        visitors_7d,
        visitors_prev_7d,
        sessions_7d,
        sessions_prev_7d,
        top_pages,
        traffic_sources,
        daily_visitors,
      },
    })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('GA4 stats error:', message)
    return res.status(500).json({ error: message, data: null })
  }
}
