# W01 Baseline Validation Report

**Date:** 2026-08-18  
**Auditor:** Claude Code (automated scan)  
**Scope:** Read-only verification of quantum5d.ai live site and repository  
**Method:** Full-text search of all files in quantum5d-website repo (public/, api/, scripts/, src/, briefs/, prototypes/)

---

## Summary

| Category | Status |
|----------|--------|
| Deleted infrastructure (old edge functions, MiniMax hub) | CLEAN — removed |
| Employer data removal (Total Health Care, MedStar, Johns Hopkins) | CLEAN — no instances in public files |
| Identifier cleanup (real org names in prototypes) | CLEAN — synthetic data confirmed |
| Maturity labels (all 15 = Interactive Prototype) | CLEAN — all 15 assigned `interactive_prototype` |
| `in_active_use` removed from public MATURITY_CONFIG | CLEAN — not present |
| Blog migration to quantum5d.ai | COMPLETE — 25 posts live, consulting redirects in place |
| CLAUDE.md as governing ruleset | IN PLACE — checked into repo root |
| /about page (Aug 8 verified work) | VERIFIED — live and untouched |
| Blog auto-publisher pipeline | ACTIVE — daily 9am ET, 6 new posts loaded, 3 published today |
| LinkedIn auto-poster | ACTIVE — 3 of 12 posts published, 9 queued Mon/Wed/Fri |
| Dynamic sitemap | COMPLETE — 54 URLs, submitted to Google Search Console |

---

## Unresolved Items

### HIGH — Analytics Payload Safety (A02)

| File | Line | Issue |
|------|------|-------|
| `public/quantum5d-site-index.html` | 716 | `email_click` event sends `href.split("?")[0]` to GA4 — includes `mailto:address@email.com`, leaking email addresses |

**Fix required:** Replace with safe categorical parameter (e.g., `{type: "email"}` only).

### MEDIUM — Latent Maturity Config Definitions

| File | Lines | Issue |
|------|-------|-------|
| `public/application.html` | 119, 122 | `pilot_ready` and `design_partner` defined in MATURITY_CONFIG (unused but latent) |
| `public/applications.html` | 156, 159 | Same — `pilot_ready` and `design_partner` defined but unused |
| `public/quantum5d-site-index.html` | 1188 | `technical_poc` defined in MATURITY_CONFIG (unused) |

**Risk:** If a future tool assignment uses these keys, the badge renders without code changes. Remove unused config entries.

### MEDIUM — Commercial/Outcome Language Requiring Translation

| File | Line(s) | Current Text | Required Translation |
|------|---------|-------------|---------------------|
| `public/about.html` | 126 | "Schedule a Briefing" | "Request an Educational Briefing" |
| `public/application.html` | 101, 270-271 | "Schedule a Briefing" / "Schedule a briefing" | "Request an Educational Briefing" |
| `public/applications.html` | 119, 128 | "Schedule a Briefing" / "15 Purpose-Built Applications" | "Request an Educational Briefing" / "15 Applied AI Prototypes" |
| `public/roadmap.html` | 106, 173 | "Schedule a Briefing" | "Request an Educational Briefing" |
| `public/security-and-trust.html` | 125 | "Schedule a Briefing" | "Request an Educational Briefing" |
| `public/services.html` | 91, 144 | "Schedule a Briefing" | "Request an Educational Briefing" |
| `public/partners.html` | 113, 144, 182 | "Schedule a Briefing" / "Founding Innovation Partner Program" / "founding innovation partner" | "Request an Educational Briefing" / "Educational Contributor Program" / "educational contributor" |

**Total "Schedule a Briefing" instances across public HTML: 11** (9 files).

### MEDIUM — Outcome Claims in Prototype/Blog Context

| File | Line | Text | Issue |
|------|------|------|-------|
| `public/quantum5d-site-index.html` | 1035 | "Coverage retained · Revenue protected · Staff time saved" | Labeled "Intended pilot measures" — needs reframing as "Potential value measure in a proposed evaluation" |
| `public/prototypes/coverageguard-iq.html` | 252 | "$1.24M Revenue protected · QTD" | Dashboard metric in prototype — needs "illustrative data" qualifier |
| `public/blog/reactive-to-predictive-coverage-monitoring-fqhc.html` | 139 | "Revenue protected: 100% of encounters and 340B savings" | Blog article hypothetical — no explicit disclosure |

### LOW — Knowledge Engine / Executive Brief Mismatch

| File | Line | Issue |
|------|------|-------|
| `public/briefs/platform-executive-brief.html` | 118 | "Knowledge Engine" label — homepage uses "Governance Knowledge Model (Concept)" |

### LOW — Supabase Anon Key Exposure

| File | Line | Issue |
|------|------|-------|
| `public/admin.html` | 367 | Supabase anon key hardcoded in publicly served HTML |
| `quantum5d-consulting-deploy/dist/assets/index-*.js` | compiled | Same anon key in consulting site bundle |

**Note:** Supabase anon keys are designed for client-side use and governed by RLS. However, `admin.html` accesses leads/contact data — RLS policies should be verified.

### LOW — Internal Documentation Inconsistency

| File | Lines | Issue |
|------|-------|-------|
| `Q5D_SITE_ARCHITECTURE.md` | 78-82 | Lists DTM, Board Intelligence, Meeting Intelligence as "In active use / production" — contradicts live HTML maturity labels |

---

## Positive Findings (Verified Clean)

1. All 15 applications assigned `maturity:"interactive_prototype"` across all 3 serving HTML files
2. `in_active_use` key removed from all public MATURITY_CONFIG objects
3. "Live pilot running" — not found anywhere in repo
4. No real client/employer organization names in any public HTML or JS
5. DTM correctly labeled "Interactive Prototype" in all public HTML; inline prototype has "illustrative DTM application data" disclosure
6. Blog migration complete — 25 posts on quantum5d.ai, consulting 301 redirects in place
7. /about page live and unchanged from Aug 8 verified version
8. LinkedIn auto-poster active — 3 posts published, 9 queued
9. Blog auto-publisher active — daily rebuild pipeline operational
10. Dynamic sitemap live — 54 URLs, submitted to Google Search Console

---

## Task Disposition for Today

| Task | Depends On | Status |
|------|-----------|--------|
| W01 (this report) | — | COMPLETE |
| W02 (educational posture spec) | W01 findings | NEXT |
| W03 (remove maturity ambiguity) | W02 spec | PENDING |
| W04 (truth-in-labeling) | W02 spec, translation table | PENDING |
| W05 (extend disclosures) | W03, W04 | PENDING |
| A02 (analytics safety) | — | PENDING (P0) |
| Sitemap | — | COMPLETE |
