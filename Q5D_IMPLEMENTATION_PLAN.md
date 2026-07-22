# Q5D Implementation Plan

**Date:** 2026-07-21
**Status:** Ready for execution

---

## Phase 1: Critical Fixes and Hero Repositioning

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 1.1 | P0 | Remove fabricated testimonials from consulting site | `quantum5d-consulting-deploy/src/pages/HomePage.tsx` | None | Low | Testimonials section removed or replaced with factual content only | Pending |
| 1.2 | P0 | Replace hero headline, eyebrow, lead, and CTAs with platform positioning | `public/quantum5d-site-index.html` (lines 263-280) | None | Low | Hero reads as platform company, not consulting firm | Pending |
| 1.3 | P0 | Update navigation: brand subtitle, link labels, CTA button | `public/quantum5d-site-index.html` (lines 251-259) | None | Low | Nav shows: Platform, Applications, Innovation Partners, Services, About, Contact, [Partner with us] | Pending |
| 1.4 | P0 | Update OG/meta description tags | `public/quantum5d-site-index.html` (lines 15-22) | 1.2 | Low | Meta tags reflect platform positioning | Pending |
| 1.5 | P1 | Update footer from "Consulting, LLC" to platform branding | `public/quantum5d-site-index.html` (line 358) | None | Low | Footer reads "Quantum5D.ai" | Pending |

## Phase 2: Application Terminology and Maturity Labels

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 2.1 | P1 | Rename "Tools we've designed and shipped" → "Applications built for the FQHC operating environment" | `public/quantum5d-site-index.html` (lines 283-290) | None | Low | Section heading and subtext updated | Pending |
| 2.2 | P1 | Add `maturity` field to each item in `TOOLS[]` array | `public/quantum5d-site-index.html` (lines 368-429) | None | Low | Every application has a maturity label | Pending |
| 2.3 | P1 | Update card rendering to show maturity badge instead of generic "Interactive demo" | `public/quantum5d-site-index.html` (lines 476-487) | 2.2 | Low | Cards show "In active use" / "Pilot-ready" / "Interactive prototype" / etc. | Pending |
| 2.4 | P1 | Change category counts from "X tools" to "X applications" | `public/quantum5d-site-index.html` (line 473) | None | Low | Count labels updated | Pending |
| 2.5 | P1 | Restructure `CATS[]` to 5 new categories and reassign applications | `public/quantum5d-site-index.html` (lines 430-435, tool `cat` fields) | None | Medium | Applications grouped by FQHC mission area | Pending |
| 2.6 | P1 | Update application card rendering to show: name, problem, target user, outcome, maturity, demo CTA | `public/quantum5d-site-index.html` (lines 476-487) | 2.2, 2.5 | Medium | Card layout matches brief spec | Pending |

## Phase 3: New Sections — Platform, Innovation Partners, CoverageGuard IQ

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 3.1 | P1 | Add Platform section with 5-layer architecture diagram | `public/quantum5d-site-index.html` | 1.3 | Medium | Platform section visible between hero and applications with clear layer descriptions and transparency labels | Pending |
| 3.2 | P1 | Add Innovation Partner section with program description and intake form | `public/quantum5d-site-index.html` | 1.3 | Medium | Full partner program section with all fields from brief, form submits to API | Pending |
| 3.3 | P1 | Create `/api/partner-apply` endpoint | `api/partner-apply.ts` (NEW) | 3.2 | Medium | Form submissions stored in Supabase `partner_applications` table + email + SMS notification | Pending |
| 3.4 | P1 | Add CoverageGuard IQ spotlight/flagship section | `public/quantum5d-site-index.html` | 2.5 | Medium | Featured section with problem, solution, users, outcomes, pilot metrics, and CTA | Pending |
| 3.5 | P2 | Create `partner_applications` table in Supabase | Supabase migration | 3.3 | Low | Table created with all intake form fields | Pending |

## Phase 4: Services and Ecosystem Repositioning

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 4.1 | P1 | Update services section heading and framing | `public/quantum5d-site-index.html` (lines 292-301) | None | Low | Services positioned as platform adoption support | Pending |
| 4.2 | P1 | Update `SERVICES[]` array — rename "Custom AI tooling" and reframe entries | `public/quantum5d-site-index.html` (lines 456-463) | None | Low | Services list matches brief recommendations | Pending |
| 4.3 | P2 | Refine partner ecosystem section — add academic/research category, tighten ICONMA language | `public/quantum5d-site-index.html` (lines 304-319) | None | Low | Partner section updated with factual language | Pending |
| 4.4 | P2 | Update founder section — founder-market fit narrative, role title change | `public/quantum5d-site-index.html` (lines 322-336) | None | Low | Founder bio connects to platform mission | Pending |

## Phase 5: Mobile UX and Accessibility

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 5.1 | P1 | Add mobile hamburger menu to showcase site | `public/quantum5d-site-index.html` (CSS + nav HTML) | 1.3 | Medium | Full navigation accessible on mobile with hamburger toggle | Pending |
| 5.2 | P2 | Add sticky header on scroll | `public/quantum5d-site-index.html` (CSS) | 5.1 | Low | Nav sticks to top on scroll | Pending |
| 5.3 | P2 | Improve form accessibility — labels, focus states, validation indicators | `public/quantum5d-site-index.html` | None | Low | Forms meet WCAG 2.1 AA | Pending |
| 5.4 | P2 | Ensure WCAG-compliant contrast on all text/background combinations | `public/quantum5d-site-index.html` (CSS) | None | Low | All text passes 4.5:1 contrast ratio | Pending |
| 5.5 | P2 | Remove floating `quantum5d.ai` pill if present, or ensure it doesn't overlap content | `public/quantum5d-site-index.html` | None | Low | No overlapping decorative elements | Pending |

## Phase 6: Analytics and Contact Enhancements

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 6.1 | P2 | Add analytics events for new CTAs and sections | `public/quantum5d-site-index.html` | 3.1, 3.2, 3.4 | Low | Events fire for hero CTAs, platform view, partner form, CoverageGuard interest | Pending |
| 6.2 | P2 | Update contact form framing | `public/quantum5d-site-index.html` (lines 338-355) | None | Low | Contact section uses platform language | Pending |
| 6.3 | P3 | Update sitemap.xml with new sections | `public/sitemap.xml` | All above | Low | Sitemap reflects current page structure | Pending |
| 6.4 | P3 | Update consulting site nav label "Tools ↗" → "Platform ↗" | `quantum5d-consulting-deploy/src/components/Navigation.tsx` | None | Low | Label updated | Pending |

## Phase 7: Quality Review

| # | Priority | Task | Files Affected | Dependencies | Risk | Acceptance Criteria | Status |
|---|----------|------|----------------|--------------|------|---------------------|--------|
| 7.1 | P1 | Syntax check before deploy | N/A | All code changes | Low | `node -e` syntax check passes | Pending |
| 7.2 | P1 | Verify all 16 prototypes still launch correctly | `public/quantum5d-site-index.html` | All changes | Medium | Every demo opens and renders | Pending |
| 7.3 | P1 | Test mobile views (iPhone, Android viewport) | N/A | 5.1-5.5 | Medium | Mobile nav works, no overflow, readable | Pending |
| 7.4 | P1 | Test forms — contact and innovation partner | N/A | 3.2, 3.3, 6.2 | Medium | Both forms submit successfully | Pending |
| 7.5 | P1 | Verify feature markers per CLAUDE.md | N/A | All changes | Low | Grep markers count ≥ 5 | Pending |
| 7.6 | P2 | Check OG tags and page titles | N/A | 1.4 | Low | Correct platform-positioned metadata | Pending |
| 7.7 | P2 | Performance check — page load under 3s | N/A | All changes | Low | No regression from current load time | Pending |
| 7.8 | P1 | Verify no unsupported claims added | N/A | All changes | Medium | Content integrity rules followed | Pending |

---

## Execution Order

**Batch 1 (Critical — do first):**
1.1, 1.2, 1.3, 1.4, 1.5

**Batch 2 (Application restructuring):**
2.1, 2.2, 2.3, 2.4, 2.5, 2.6

**Batch 3 (New sections):**
3.1, 3.2, 3.3, 3.4, 3.5

**Batch 4 (Repositioning):**
4.1, 4.2, 4.3, 4.4

**Batch 5 (Mobile/Accessibility):**
5.1, 5.2, 5.3, 5.4, 5.5

**Batch 6 (Analytics/Polish):**
6.1, 6.2, 6.3, 6.4

**Batch 7 (Quality gate):**
7.1-7.8

---

## Risk Summary

| Risk | Mitigation |
|------|------------|
| Breaking existing prototypes during restructuring | Test each demo after category reassignment |
| Single HTML file complexity (~750KB) | Make targeted edits, syntax check after each batch |
| Mobile hamburger menu CSS conflicts | Test in isolation before integrating |
| Innovation Partner form API failure | Model on existing `/api/contact` pattern |
| Maturity labels inaccurate | Dr. T reviews before deploy |
| Content integrity violation | Follow transparency rules — no fabricated claims |

---

## Estimated Scope

- **Batches 1-2:** Primarily text/data changes in existing HTML — low risk
- **Batch 3:** New HTML sections + 1 new API endpoint — medium risk
- **Batches 4-6:** Text changes + CSS additions — low risk
- **Batch 7:** Testing — no code changes
