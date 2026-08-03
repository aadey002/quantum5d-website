import type { VercelRequest, VercelResponse } from '@vercel/node'

// LinkedIn OAuth callback handler
// After authorizing, LinkedIn redirects here with ?code=xxx&state=xxx
// We exchange the code for access + refresh tokens and save to Supabase

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const code = req.query.code as string
  const state = req.query.state as string
  const error = req.query.error as string

  if (error) {
    return res.status(400).send(
      '<html><body style="font-family:Inter,sans-serif;max-width:600px;margin:80px auto;text-align:center">'
      + '<h1 style="color:#c0392b">Authorization Failed</h1>'
      + '<p>' + error + ': ' + (req.query.error_description || '') + '</p>'
      + '</body></html>'
    )
  }

  if (!code) {
    return res.status(400).send(
      '<html><body style="font-family:Inter,sans-serif;max-width:600px;margin:80px auto;text-align:center">'
      + '<h1>Missing authorization code</h1>'
      + '<p>No code parameter received from LinkedIn.</p>'
      + '</body></html>'
    )
  }

  const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '78upya5a33tax8'
  const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || ''
  const REDIRECT_URI = 'https://quantum5d.ai/api/linkedin-callback'
  const SUPABASE_URL = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
  const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

  if (!CLIENT_SECRET) {
    return res.status(500).send('<html><body><h1>Missing LINKEDIN_CLIENT_SECRET env var</h1></body></html>')
  }

  try {
    // Exchange code for tokens
    const tokenResp = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
      }).toString(),
    })

    const tokenData = await tokenResp.json()

    if (!tokenData.access_token) {
      return res.status(400).send(
        '<html><body style="font-family:Inter,sans-serif;max-width:600px;margin:80px auto;text-align:center">'
        + '<h1 style="color:#c0392b">Token Exchange Failed</h1>'
        + '<pre style="text-align:left;background:#f5f5f5;padding:16px;border-radius:8px;overflow-x:auto">' + JSON.stringify(tokenData, null, 2) + '</pre>'
        + '</body></html>'
      )
    }

    // Calculate expiry
    const expiresAt = new Date(Date.now() + (tokenData.expires_in || 5184000) * 1000).toISOString()

    // Save to Supabase
    const update: Record<string, string> = {
      access_token: tokenData.access_token,
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    }
    if (tokenData.refresh_token) {
      update.refresh_token = tokenData.refresh_token
    }

    if (SUPABASE_KEY) {
      await fetch(SUPABASE_URL + '/rest/v1/linkedin_accounts?linkedin_user_id=eq.FXAy8qKKKv', {
        method: 'PATCH',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': 'Bearer ' + SUPABASE_KEY,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(update),
      })
    }

    // Success page
    return res.status(200).send(
      '<html><body style="font-family:Inter,sans-serif;max-width:600px;margin:80px auto;text-align:center">'
      + '<h1 style="color:#2d9a5c">LinkedIn Re-Authorized!</h1>'
      + '<p style="font-size:18px">New token saved to Supabase.</p>'
      + '<div style="background:#e6f9ee;padding:16px;border-radius:8px;margin:20px 0">'
      + '<p><strong>Expires:</strong> ' + expiresAt + '</p>'
      + '<p><strong>Refresh token:</strong> ' + (tokenData.refresh_token ? 'Saved' : 'Not returned') + '</p>'
      + '<p><strong>Scopes:</strong> ' + (tokenData.scope || 'unknown') + '</p>'
      + '</div>'
      + '<p>The engagement tracker will pull LinkedIn stats on its next run (daily at 6pm ET).</p>'
      + '<p><a href="/admin" style="color:#5347A4;font-weight:600">Back to Admin Dashboard</a></p>'
      + '</body></html>'
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    return res.status(500).send(
      '<html><body style="font-family:Inter,sans-serif;max-width:600px;margin:80px auto;text-align:center">'
      + '<h1 style="color:#c0392b">Error</h1>'
      + '<p>' + message + '</p>'
      + '</body></html>'
    )
  }
}
