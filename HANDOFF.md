# Q5D One-Week Repositioning Sprint — Handoff

**Last updated:** 2026-08-18 (after W01 completion)  
**Author:** Claude Code session for Dr. Tee  
**Project:** Quantum5D.ai educational posture repositioning (Aug 17–21)  
**Repo:** `C:\Users\adeto\quantum5d-website` (GitHub: aadey002/quantum5d-website)

---

## Goal

Reposition quantum5d.ai from a commercial SaaS platform to an educational resource with an Applied AI Prototype Lab. All 15 applications are client-side interactive prototypes using synthetic/illustrative data — no backend, no authentication, no tenant separation, no external users, no validated outcomes. Preserve the consulting pathway (Services, Partners, /about, briefing CTA) but reframe all language from commercial to educational.

**Positioning decision:** Option B — educational resource with preserved but reframed consulting pathway.

---

## Current Progress

### COMPLETE

| Task | What Was Done |
|------|---------------|
| **W01 — Baseline validation** | Full read-only scan committed as `W01-BASELINE-REPORT.md`. All 15 apps confirmed `interactive_prototype`. No employer data. No `in_active_use` in public MATURITY_CONFIG. Identified 11 "Schedule a Briefing" instances, latent `pilot_ready`/`design_partner` in 2 configs, analytics PII leak, outcome claims in prototype/blog. |
| **Sitemap** | Dynamic `/api/sitemap.ts` serving 54 URLs (29 static + 25 blog posts from Supabase). Consulting sitemap cleaned (8 stale blog URLs removed). Both submitted to Google Search Console. 5 priority posts submitted for indexing. |
| **LinkedIn auto-poster fix** | jq hashtag parsing fixed (string vs array). 3 posts published, 9 queued Mon/Wed/Fri. |
| **Blog auto-publisher fix** | Null-date bulk publish bug removed. 6 future-dated posts reverted to `scheduled`. Cron re-enabled. Now includes: checkout → `build-blog.cjs` → commit HTML → push → deploy hook. |
| **Blog regeneration** | All 25 posts rebuilt as static HTML including 3 previously missing (340b-rebate, hiv-value, medicaid-budget-modeling). `vercel.json` buildCommand now runs `build-blog.cjs` on every deploy. |
| **Exit-intent popup** | Email-only (removed name field), honest copy matching 3 actual resources emailed via Resend auto-reply. |
| **Resource download modal** | Email-only (removed org + interests + checkboxes). Hidden anchor click replaces `window.open()` to avoid popup blockers. Fallback download link in success state. |
| **Test leads cleanup** | 7 bot/test leads deleted from Supabase `leads` table. |

### NOT STARTED

| Task | Summary |
|------|---------|
| **W02 — Educational posture spec** | Document the positioning specification using W01 findings. Add missing language rules. Do not create a second conflicting ruleset. |
| **W03 — Remove maturity ambiguity** | Remove `pilot_ready`, `design_partner`, `technical_poc` from MATURITY_CONFIGs in `application.html` and `applications.html`. Remove from datasets/briefs. Set all 15 maturity labels to `interactive_prototype`. Add build-time consistency test. |
| **W04 — Truth-in-labeling** | Apply Option B translation table across homepage, roadmap, services, partners, application pages, briefs. 11 "Schedule a Briefing" → "Request an Educational Briefing". "15 Purpose-Built Applications" → "15 Applied AI Prototypes". "Founding Innovation Partner" → "Educational Contributor". etc. |
| **W05 — Extend disclosures** | Add two standard disclosures to every prototype card, modal, and all 15 detail pages via shared component: (1) "Built by Quantum 5D Consulting, which owns this prototype." (2) "This interactive prototype uses illustrative data and is not a production system." |
| **A02 — Analytics safety (P0)** | `email_click` event at line 716 sends `mailto:address@email.com` to GA4. Replace with `{type: "email"}`. LinkedIn outbound click sends full URL — replace with `{type: "linkedin"}`. |

---

## What Worked

1. **Supabase CLI `npx supabase projects api-keys`** — retrieved service role key for Q5D Hub (kolxfjisvizwayyrlzyx) when MCP was bound to wrong project
2. **Dynamic sitemap via Vercel serverless function** — `/api/sitemap.ts` queries Supabase at request time, 1-hour edge cache
3. **Had to delete static `public/sitemap.xml`** — Vercel serves static files before rewrites; renaming wasn't enough
4. **Removed `prerender-purge.ts`** to stay within Hobby plan 12-function limit
5. **`build-blog.cjs`** is the canonical blog builder — fetches all published posts, emits static HTML with full SEO (meta, OG, JSON-LD, canonical)
6. **Blog auto-publisher workflow** now does full cycle: publish in DB → checkout → build → commit → push → deploy hook

## What Didn't Work

1. **Vercel CLI deploy from within `quantum5d-consulting-deploy/`** — fails because git root is `C:\Users\adeto` and Vercel root dir setting doubles the path. Must push via `git push origin main:master` to quantum-marketing-hub repo for auto-deploy.
2. **Supabase MCP is bound to OnboardEQ (djjhbnryfvioteqybngn)** — cannot write to Q5D Hub (kolxfjisvizwayyrlzyx) via MCP. Use CLI or direct API calls.
3. **Google Search Console API** — not enabled in GCP project `q5d-analytics`. Service account lacks permission to enable it. Sitemap submitted manually via GSC UI.
4. **Google sitemap ping endpoint** — deprecated since 2023. Must submit via GSC UI.
5. **`VERCEL_TOKEN` not set as GitHub secret** — deploy hook works but a token would enable direct `vercel deploy --prod` from GitHub Actions.

---

## Option B Language Translation Table

Apply everywhere commercial/outcome language appears:

| Current | Replace With |
|---------|-------------|
| Pilot Partnership | Proposed Controlled Evaluation |
| Schedule a Briefing | Request an Educational Briefing |
| 15 Purpose-Built Applications | 15 Applied AI Prototypes |
| Revenue protected / coverage retained | Potential value measure in a proposed evaluation |
| Live pilot running | Illustrative prototype using synthetic data |
| Design Partner Pilots | Proposed Controlled Evaluations |
| Knowledge Engine Building | Governance Knowledge Model — Concept |
| Platform implementation | Future Implementation Requirements |
| Validate with real users | Has not been validated; proposed evaluation methodology |
| Services help health centers adopt, operationalize, and scale | Guidance on readiness, governance, infrastructure, and evaluation |
| Founding Innovation Partner | Educational Contributor / Evaluation Participant |
| Schedule a 15-minute tailored walkthrough | Request an educational briefing on responsible FQHC AI adoption |

---

## W01 Findings — Key Numbers

- **11** "Schedule a Briefing" instances across 9 public HTML files
- **2** MATURITY_CONFIGs with latent `pilot_ready` / `design_partner` (application.html, applications.html)
- **3** outcome claim instances (homepage pilot measures, prototype dashboard, blog article)
- **1** analytics PII leak (email_click sends mailto addresses to GA4)
- **1** Knowledge Engine label mismatch (executive brief vs homepage)
- **0** employer data in public files
- **0** `in_active_use` in any public MATURITY_CONFIG
- **0** "Live pilot running" anywhere in repo

---

## Key Files for Remaining Tasks

| File | What Needs Changing |
|------|-------------------|
| `public/quantum5d-site-index.html` | MATURITY_CONFIG cleanup, outcome measures text (line 1035), email_click analytics (line 716), disclosure component |
| `public/application.html` | Remove `pilot_ready`/`design_partner` from MATURITY_CONFIG (lines 119, 122), "Schedule a Briefing" → educational (line 101), disclosure on detail pages |
| `public/applications.html` | Same MATURITY_CONFIG cleanup (lines 156, 159), "15 Purpose-Built" → "15 Applied AI Prototypes" (line 128), "Schedule a Briefing" (line 119) |
| `public/roadmap.html` | "Schedule a Briefing" (lines 106, 173), any pilot-ready/Design Partner language |
| `public/services.html` | "Schedule a Briefing" (lines 91, 144), reframe service descriptions |
| `public/partners.html` | "Founding Innovation Partner" (lines 144, 182), "Schedule a Briefing" (line 113) |
| `public/about.html` | "Schedule a Briefing" (line 126) — DO NOT MODIFY other content (verified Aug 8) |
| `public/security-and-trust.html` | "Schedule a Briefing" (line 125) |
| `public/briefs/platform-executive-brief.html` | "Knowledge Engine" (line 118), "15 purpose-built" (line 117) |
| `public/prototypes/coverageguard-iq.html` | Revenue metric disclosure (line 252) |
| All 15 prototype HTML files in `public/prototypes/` | Add shared disclosure text |

---

## Important Constraints

- **CLAUDE.md rules** govern all changes to board.html/platform.html (different project — THC Board Intelligence). The quantum5d-website has its own rules in this handoff.
- **/about page is FROZEN** — verified Aug 8 work. Change only the CTA button text, nothing else.
- **Blog posts are FROZEN** — do not edit published blog content. The reactive-to-predictive blog has an outcome claim but is editorial content.
- **LinkedIn auto-poster is ACTIVE** — do not disable. 9 posts queued.
- **Blog auto-publisher is ACTIVE** — do not disable. 6 future posts scheduled Aug 27 – Dec 1.
- **Never deploy without explicit user approval.**
- **Vercel Hobby plan: 12 serverless functions max.** Currently at 12.
- **Supabase MCP targets wrong project.** Use CLI or direct API for Q5D Hub writes.

---

## Deploy Methods

**quantum5d.ai:** `cd quantum5d-website && npx vercel deploy --prod`  
**quantum5dconsulting.com:** `git push origin main:master` (to quantum-marketing-hub repo, Vercel auto-deploys)

---

## Wednesday Tasks (after today's tasks confirmed)

W07, W08, W09, A04, A05 — to be assigned by Dr. T after Tuesday tasks are confirmed complete.
