// POST /api/newsletter-send
// Cron-triggered monthly newsletter sender.
// Vercel cron hits this on the 1st of each month.
// Can also be called manually with ?key=CRON_SECRET for testing.

import type { VercelRequest, VercelResponse } from '@vercel/node'

// ─── NEWSLETTER CONTENT ─────────────────────────────────────
// Each month gets a unique issue. Add new entries at the bottom.
// The sender picks the latest unsent issue based on month/year.

interface NewsletterIssue {
  id: string           // e.g. '2026-08'
  subject: string
  buildHtml: () => string
}

function header(): string {
  return '<div style="margin-bottom:28px">'
    + '<table cellpadding="0" cellspacing="0" border="0"><tr>'
    + '<td style="padding-right:12px"><img src="https://quantum5d.ai/logo.png" alt="" width="32" height="32" style="width:32px;height:32px;border-radius:6px" /></td>'
    + '<td><span style="font-family:Georgia,serif;font-size:18px;font-weight:600;color:#5347A4;letter-spacing:0.01em">FQHC Operations Intelligence</span></td>'
    + '</tr></table>'
    + '</div>'
}

function footer(): string {
  return '<p style="color:#999;font-size:13px;margin-top:36px;border-top:1px solid #E6E3F2;padding-top:16px">'
    + '<span style="color:#5347A4;font-family:Georgia,serif;font-weight:600">FQHC Operations Intelligence</span><br>'
    + 'Quantum 5D Consulting, LLC<br>'
    + '<a href="https://quantum5dconsulting.com" style="color:#7c3aed">quantum5dconsulting.com</a> | '
    + '<a href="https://quantum5d.ai" style="color:#7c3aed">quantum5d.ai</a><br>'
    + 'Reply "unsubscribe" to stop receiving emails.</p>'
}

function cta(url: string, label: string): string {
  return '<p style="margin-top:24px"><a href="' + url + '" style="color:#5347A4;font-weight:600">' + label + ' &rarr;</a></p>'
}

function wrap(body: string): string {
  return '<!DOCTYPE html><html><body style="font-family:Georgia,serif;max-width:580px;margin:0 auto;color:#2D2D2D;line-height:1.7;font-size:15.5px;padding:20px">'
    + header() + body + footer() + '</body></html>'
}

var ISSUES: NewsletterIssue[] = [
  {
    id: '2026-08',
    subject: 'The countdown is on for H.R.1 Medicaid redeterminations — is your FQHC ready?',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">H.R.1 Redeterminations Are Here</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #1 &mdash; August 2026</p>'
        + '<p>Six-month Medicaid redeterminations under H.R.1 are here. The clock is running.</p>'
        + '<p>For every patient whose coverage lapses, your FQHC loses the 340B pricing, the Medicaid reimbursement, and &mdash; in many cases &mdash; the patient themselves. They don\'t come back once they think they\'re uninsured.</p>'
        + '<p>The problem isn\'t eligibility. It\'s that patients are not well informed, current systems don\'t talk to each other, and no one reconciles it until patients are dropped and revenue is lost.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">What You Can Do This Month</h3>'
        + '<ol style="padding-left:20px">'
        + '<li><strong>Audit your coverage verification process.</strong> How many days between a coverage lapse and your team finding out?</li>'
        + '<li><strong>Identify your top 50 at-risk patients</strong> &mdash; Medicaid patients with upcoming redetermination dates and no recent eligibility check.</li>'
        + '<li><strong>Assign outreach responsibility.</strong> If nobody owns it, nobody does it.</li>'
        + '</ol>'
        + '<p style="margin-top:16px"><a href="https://quantum5d.ai/blog/hidden-cost-coverage-churn-fqhc-revenue" style="color:#5347A4;font-weight:600">Related reading: The Hidden Cost of Coverage Churn &rarr;</a></p>'
        + '<hr style="border:none;border-top:1px solid #E6E3F2;margin:24px 0">'
        + '<p><strong>Quick hit:</strong> If your last 340B policy review was before July, it\'s time for a refresh. '
        + '<a href="https://quantum5dconsulting.com/resources/340B-Program-Compliance-Checklist.pdf" style="color:#7c3aed">Download our compliance checklist</a>.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2026-09',
    subject: '"HRSA is coming in 6 weeks" — the most expensive sentence in FQHC operations',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">OSV Readiness: Stop Scrambling</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #2 &mdash; September 2026</p>'
        + '<p>That\'s when the scramble starts. Binder tabs. Missing policies. Frantic emails asking who signed off on what.</p>'
        + '<p>The gaps were there for months. They just surfaced too late.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">The 3 Areas That Trip Up Most FQHCs</h3>'
        + '<ol style="padding-left:20px">'
        + '<li><strong>Board governance documentation.</strong> Meeting minutes, conflict-of-interest disclosures, and sliding fee schedule approvals are the most common findings. Not because they\'re hard &mdash; because they\'re forgotten.</li>'
        + '<li><strong>QI/QA program evidence.</strong> HRSA wants to see that your quality improvement program is active, not just documented. Peer review logs, clinical measure trending, and corrective action follow-through.</li>'
        + '<li><strong>Credentialing and privileging files.</strong> Every provider needs a complete file. One missing DEA verification or lapsed license creates a condition.</li>'
        + '</ol>'
        + '<p style="margin-top:16px"><a href="https://quantum5d.ai/blog/five-340b-compliance-mistakes" style="color:#5347A4;font-weight:600">Related reading: Five 340B Compliance Mistakes That Will Cost You &rarr;</a></p>'
        + '<hr style="border:none;border-top:1px solid #E6E3F2;margin:24px 0">'
        + '<p><strong>Also worth watching:</strong> The Inflation Reduction Act is compressing 340B margins drug by drug. Maximum Fair Prices are narrowing the spread between 340B acquisition cost and payer reimbursement. '
        + '<a href="https://quantum5d.ai/blog/ira-impact-340b-entities" style="color:#7c3aed">Read: How the IRA Impacts 340B Covered Entities &rarr;</a></p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2026-10',
    subject: 'How many compliance spreadsheets does your team maintain?',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">One Command Center, Not Twelve Spreadsheets</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #3 &mdash; October 2026</p>'
        + '<p>One for HRSA. One for Joint Commission. One for state licensure. One for OSHA. One for CLIA. One for DEA.</p>'
        + '<p>Different renewal dates. Different evidence requirements. Different owners. All tracked in a dozen tabs nobody trusts.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">The Real Cost of Spreadsheet Compliance</h3>'
        + '<p>It\'s not the time spent updating them. It\'s the time spent <em>not trusting them</em> &mdash; double-checking, re-pulling documents, and asking "is this current?" before every board meeting or site visit.</p>'
        + '<p>The fix is consolidation: one register, organized by authority, with a named owner, a due date, and the evidence attached. When someone asks &ldquo;are we current on CLIA?&rdquo; the answer should take ten seconds, not ten minutes.</p>'
        + '<p style="margin-top:16px"><a href="https://quantum5d.ai/blog/five-340b-compliance-mistakes" style="color:#5347A4;font-weight:600">Related reading: Five 340B Compliance Mistakes That Will Cost You &rarr;</a></p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2026-11',
    subject: 'Your referrals are leaving the building — can you prove any of them closed?',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">The Referral Loop Nobody Is Tracking</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #4 &mdash; November 2026</p>'
        + '<p>A patient gets referred to cardiology. The referral leaves the building. Six weeks later &mdash; no report back, no patient notification, no documentation.</p>'
        + '<p>When HRSA asks about referral tracking during the OSV, the answer is usually <em>"we\'re working on it."</em></p>'
        + '<p>When the abnormal result that was never communicated becomes a delayed-diagnosis FTCA claim, the answer is worse.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">Two Numbers That Matter</h3>'
        + '<ol style="padding-left:20px">'
        + '<li><strong>Loop Closure Rate</strong> &mdash; what percentage of your referrals actually closed with documentation back in the chart?</li>'
        + '<li><strong>Referral Documentation Readiness</strong> &mdash; would your referral files hold up to a site visit or a tort claim?</li>'
        + '</ol>'
        + '<p>If you don\'t know your loop closure rate, start measuring it this month. Pull a sample of 20 referrals from the last 90 days and check: did the report come back? Is it in the chart? Was the patient notified? The number will tell you whether your process works or just exists.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2026-12',
    subject: 'The 340B margin compression nobody is modeling yet',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">IRA Is Compressing Your 340B Margin &mdash; Drug by Drug</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #5 &mdash; December 2026</p>'
        + '<p>The Inflation Reduction Act is compressing your 340B margin. Drug by drug. Quarter by quarter.</p>'
        + '<p>Maximum Fair Prices kick in on a rolling timeline. The negotiation pipeline keeps growing. Every drug that gets an MFP narrows the spread between 340B acquisition cost and what payers reimburse.</p>'
        + '<p>Most covered entities won\'t see the impact until it hits the P&amp;L.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">What to Do Before Year-End</h3>'
        + '<ol style="padding-left:20px">'
        + '<li><strong>Pull your top 20 drugs by 340B savings.</strong> Cross-reference against the MFP negotiation pipeline.</li>'
        + '<li><strong>Model the margin compression.</strong> What happens to your spread when MFPs take effect?</li>'
        + '<li><strong>Identify therapeutic alternatives</strong> &mdash; drugs with similar clinical profiles that aren\'t on the MFP timeline.</li>'
        + '</ol>'
        + '<p style="margin-top:16px"><a href="https://quantum5d.ai/blog/ira-impact-340b-entities" style="color:#5347A4;font-weight:600">Related reading: How the IRA Impacts 340B Covered Entities &rarr;</a></p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-01',
    subject: 'Your pharmacy is chasing the wrong prescriptions',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">Stop Chasing Prescriptions Nobody Wants</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #6 &mdash; January 2027</p>'
        + '<p>Your pharmacy staff is calling patients about prescriptions they never wanted.</p>'
        + '<p>Auto-refills sitting on will-call. At-home supply duplicates. OTC switches the patient already made.</p>'
        + '<p>Meanwhile, the patient who actually needs their maintenance medication &mdash; the one whose A1C is climbing &mdash; sits at the bottom of the pile.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">Fix the Priority Order</h3>'
        + '<p>The question isn\'t whether to chase abandoned prescriptions. It\'s which ones to chase first. Rank by clinical criticality: the patient whose A1C is climbing matters more than the auto-refill sitting on will-call. And the scripts that shouldn\'t be chased at all &mdash; OTC switches, duplicates, patient opt-outs &mdash; stop wasting time on those.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-02',
    subject: 'Board meeting is Thursday — how much executive time did the prep just eat?',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">Board Prep Should Not Be a Full-Time Job</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #7 &mdash; February 2027</p>'
        + '<p>The CEO is still manually pulling slides from three different systems. The compliance officer is cross-referencing HRSA requirements against last quarter\'s minutes by hand. And the action items from two meetings ago? Nobody can find them.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">What Good Board Prep Looks Like</h3>'
        + '<p>If your board prep takes more than a day, the process has a design problem. Two fixes that don\'t require new technology:</p>'
        + '<ul style="padding-left:20px">'
        + '<li>Put every governance deadline &mdash; bylaws review, conflict-of-interest renewals, sliding fee schedule approval &mdash; on a shared calendar with 30-day advance reminders. Assign a named owner to each.</li>'
        + '<li>Track every board action item in one place with the date assigned, the owner, the status, and the date closed. Review it at the start of every meeting, not the end. The audit trail builds itself.</li>'
        + '</ul>'
        + '<p>The boards that run clean aren\'t doing more work. They\'re doing the same work in a structure that doesn\'t let things fall through.</p>'
        + '<p style="margin-top:16px"><a href="https://quantum5d.ai/blog/board-does-not-understand-pharmacy-program" style="color:#5347A4;font-weight:600">Related reading: Why Your Board Does Not Understand Your Pharmacy Program &rarr;</a></p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-03',
    subject: 'Your board just approved a CEO salary — where did the number come from?',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">Executive Compensation: The Governance Gap</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #8 &mdash; March 2027</p>'
        + '<p>If the answer is "we looked at a few job postings" or "that\'s what we\'ve always paid," you have a governance problem &mdash; and an IRS problem.</p>'
        + '<p>The rebuttable presumption of reasonableness requires three things: comparable data, independent review, and contemporaneous documentation.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">What the Compensation Committee Actually Needs</h3>'
        + '<p>What the compensation committee actually needs: comparable data from organizations your size, an independent review process, and contemporaneous documentation of the decision. If any of those three are missing, the presumption doesn\'t hold.</p>'
        + '<p>Start with HRSA\'s <a href="https://data.hrsa.gov/tools/data-reporting" style="color:#7c3aed">UDS data</a> and public 990 filings for peer organizations. The data is free. The discipline of using it is what most boards lack.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-04',
    subject: '"Should we add behavioral health?" — here\'s how to stop guessing',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">Service Line Decisions Deserve Data, Not Gut Feel</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #9 &mdash; April 2027</p>'
        + '<p>"Should we add behavioral health?" "Is dental losing money?" "What would it take to break even on podiatry?"</p>'
        + '<p>Every FQHC has these conversations. Most make the call on gut feel.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">Kill. Fix. Invest. Grow. Keep.</h3>'
        + '<p>Plot every service line on two axes: productivity (visits per provider FTE) and cost per visit. The ones in the bottom-right quadrant &mdash; low productivity, high cost &mdash; are the ones that need a decision. Use HRSA UDS peer data for benchmarks. The verdict is usually obvious once the data is visible.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-05',
    subject: 'Your no-show rate isn\'t a patient problem — it\'s a phone number problem',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">Bad Phone Numbers Are Costing You Patients</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #10 &mdash; May 2027</p>'
        + '<p>That appointment reminder you sent? It went to a disconnected line. That refill nudge? Bounced off a number the patient hasn\'t used in two years. That recall for an overdue A1C? Never landed.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">Three Colors. One Answer.</h3>'
        + '<ul style="padding-left:20px;list-style:none">'
        + '<li>&#x1f7e2; Green = valid, textable mobile</li>'
        + '<li>&#x1f535; Blue = valid landline</li>'
        + '<li>&#x1f534; Red = invalid &mdash; stop wasting outreach</li>'
        + '</ul>'
        + '<p>Before your next outreach campaign, run a validation pass on your patient phone file. Most PMS systems can export the list. A disconnected number is worse than no number &mdash; it consumes staff time and produces nothing. Clean the file first, then measure your contact rate.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-06',
    subject: '400 complaints a year, triaged by hand — which ones are hiding real danger?',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">AI-Assisted Complaint Triage for Regulatory Boards</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #11 &mdash; June 2027</p>'
        + '<p>A regulatory board gets hundreds of complaints a year. Each one needs to be read, risk-triaged, matched against the right statute, and routed to the right inspector. By hand.</p>'
        + '<p>The high-risk complaints don\'t look different from the low-risk ones until someone spends 30 minutes reading the file. Meanwhile, a compounder cutting corners sits in the backlog.</p>'
        + '<p>The structural problem is triage speed, not triage effort. Every day a high-risk complaint sits unread is a day the board is carrying liability it doesn\'t know about.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
  {
    id: '2027-07',
    subject: '"Take last year\'s budget and add 3%" isn\'t a strategy',
    buildHtml: function () {
      return wrap(
        '<h2 style="color:#5347A4;font-size:22px;margin-bottom:8px">Budget Forward From Mission, Not Backward From Last Year</h2>'
        + '<p style="color:#666;font-size:14px;margin-top:0">Issue #12 &mdash; July 2027</p>'
        + '<p>Last year\'s budget assumed last year\'s patient volume, last year\'s payer mix, and last year\'s staffing model. None of those are true anymore.</p>'
        + '<h3 style="color:#5347A4;font-size:18px">Start With the Right Question</h3>'
        + '<p>Start with: <em>How many patients do you plan to serve next year?</em></p>'
        + '<p>From that number, cascade forward:</p>'
        + '<ul style="padding-left:20px">'
        + '<li>Required visits by service line, based on your service mix</li>'
        + '<li>Provider and support FTEs needed to deliver that volume</li>'
        + '<li>Salary and benefits budget derived from those FTEs</li>'
        + '<li>Revenue by payer, based on your actual payer mix and rates</li>'
        + '<li>Gap or surplus &mdash; compared against industry benchmarks for organizations your size</li>'
        + '</ul>'
        + '<p>Every assumption is visible. Every number ties back to the patient-access target. When someone asks &ldquo;why did you budget for two new providers?&rdquo; the answer is arithmetic, not advocacy.</p>'
        + '<hr style="border:none;border-top:1px solid #E6E3F2;margin:24px 0">'
        + '<p><strong>That\'s a wrap on Year 1.</strong> Thank you for reading FQHC Operations Intelligence. We\'ll be back in August with a new season. If there\'s a topic you want us to cover, just reply to this email.</p>'
        + '<p style="margin-top:24px">&mdash; Dr. Tee<br>'
        + '<span style="color:#666;font-size:14px">Founder, Quantum 5D Consulting</span></p>'
      )
    }
  },
]

// ─── HANDLER ─────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Auth: Vercel cron sends Authorization header, or pass ?key= for manual trigger
  var cronSecret = process.env.CRON_SECRET
  if (cronSecret) {
    var authHeader = req.headers.authorization || ''
    var queryKey = (req.query.key as string) || ''
    if (authHeader !== 'Bearer ' + cronSecret && queryKey !== cronSecret) {
      return res.status(401).json({ error: 'Unauthorized' })
    }
  }

  var supabaseUrl = process.env.SUPABASE_URL || 'https://kolxfjisvizwayyrlzyx.supabase.co'
  var supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || ''
  var resendKey = process.env.RESEND_API_KEY || ''

  if (!resendKey) {
    return res.status(500).json({ error: 'RESEND_API_KEY not configured' })
  }

  // Determine which issue to send (by current month, or ?issue=2026-08 override)
  var now = new Date()
  var issueId = (req.query.issue as string) || (now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0'))
  var issue = ISSUES.find(function (i) { return i.id === issueId })

  if (!issue) {
    return res.status(404).json({
      error: 'No newsletter issue found for ' + issueId,
      available: ISSUES.map(function (i) { return i.id }),
    })
  }

  // Get all newsletter subscribers
  var subscribers: Array<{ email: string; name: string }> = []
  if (supabaseKey) {
    try {
      var subRes = await fetch(
        supabaseUrl + '/rest/v1/leads?source=eq.newsletter&status=eq.subscribed&select=email,name',
        {
          headers: {
            apikey: supabaseKey,
            Authorization: 'Bearer ' + supabaseKey,
          },
        }
      )
      var rows = await subRes.json()
      if (Array.isArray(rows)) {
        // Deduplicate by email
        var seen = new Set<string>()
        rows.forEach(function (r: { email: string; name: string }) {
          if (!seen.has(r.email)) {
            seen.add(r.email)
            subscribers.push(r)
          }
        })
      }
    } catch (e) {
      console.error('Failed to fetch subscribers:', e)
      return res.status(500).json({ error: 'Failed to fetch subscribers' })
    }
  }

  if (subscribers.length === 0) {
    return res.status(200).json({ message: 'No subscribers to send to', issueId: issueId })
  }

  // Send to each subscriber
  var html = issue.buildHtml()
  var sent = 0
  var failed = 0
  var errors: string[] = []

  for (var i = 0; i < subscribers.length; i++) {
    var sub = subscribers[i]
    try {
      var sendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + resendKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Dr. Tee | Quantum 5D <alerts@quantum5dconsulting.com>',
          to: [sub.email],
          subject: issue.subject,
          html: html,
          reply_to: 'info@quantum5dconsulting.com',
        }),
      })
      if (sendRes.ok) {
        sent++
      } else {
        failed++
        var errText = await sendRes.text()
        errors.push(sub.email + ': ' + sendRes.status + ' ' + errText)
      }
    } catch (e) {
      failed++
      errors.push(sub.email + ': ' + String(e))
    }

    // Resend rate limit: 10 emails/second on free plan — pace at 100ms
    if (i < subscribers.length - 1) {
      await new Promise(function (resolve) { setTimeout(resolve, 150) })
    }
  }

  // Notify admin of send results
  var adminEmail = process.env.ADMIN_EMAIL
  if (adminEmail && resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + resendKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Quantum 5D <alerts@quantum5dconsulting.com>',
          to: [adminEmail],
          subject: 'Newsletter sent: ' + issue.id + ' (' + sent + ' delivered)',
          text: 'Newsletter Issue: ' + issue.id + '\n'
            + 'Subject: ' + issue.subject + '\n'
            + 'Sent: ' + sent + '\n'
            + 'Failed: ' + failed + '\n'
            + (errors.length > 0 ? '\nErrors:\n' + errors.join('\n') : ''),
        }),
      })
    } catch (e) {
      console.error('Admin notification error:', e)
    }
  }

  return res.status(200).json({
    success: true,
    issueId: issue.id,
    subject: issue.subject,
    sent: sent,
    failed: failed,
    errors: errors.length > 0 ? errors : undefined,
  })
}
