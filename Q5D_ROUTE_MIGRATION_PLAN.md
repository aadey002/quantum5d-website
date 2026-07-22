# Q5D Route Migration Plan

**Date:** 2026-07-22
**Status:** Deferred — planning document for future Platform Architecture Sprint

---

## Current State

Single-file HTML architecture (`quantum5d-site-index.html`, ~830KB). All 15 prototypes, forms, analytics, and sharing functionality embedded inline.

## Proposed Routes

| Route | Content | Priority |
|-------|---------|----------|
| `/` | Homepage (simplified) | Exists |
| `/applications` | Full 15-app catalog with filters | High |
| `/applications/[slug]` | Individual application pages | High |
| `/partners` | Innovation Partner program + form | High |
| `/services` | Implementation services | Medium |
| `/roadmap` | Platform roadmap | Medium |
| `/trust` | Security, privacy, AI governance | Medium |
| `/resources` | Executive briefs, guides, downloads | Low |
| `/about` | Founder + company story | Low |

### Application Slugs (canonical)

| ID | Slug |
|----|------|
| coverage | coverageguard-iq |
| osv | hrsa-readiness |
| dtm | collaborative-practice-review |
| certiq | technician-program-review |
| sentinel | sentinel |
| compliance | compliance-command |
| loopproof | loopproof |
| board | board-governance-iq |
| meeting | meeting-intelligence |
| benchmark | exec-compensation |
| serviceline | serviceline-iq |
| ira | 340b-ira-intelligence |
| budget | patientfirst-budget |
| abandon | rx-abandonment |
| trureach | trureach |

---

## Option A — React/Next.js Migration

### Benefits
- Component reuse, shared layouts, proper routing
- SEO via server-side rendering (Next.js)
- Code splitting reduces initial load
- Vercel-native deployment
- Type safety with TypeScript

### Risks
- Full rewrite required — 2-3 week effort
- Prototype embedding needs rearchitecting (iframes or dynamic imports)
- Regression risk on 15 working prototypes
- SEO interruption during migration

### Estimated Effort
- 2-3 weeks for core migration
- 1 week for prototype migration and testing

### Recommendation
Best long-term option but high short-term risk. Recommend only after v2.2 is stable and producing leads.

---

## Option B — Multi-Page Static HTML

### Benefits
- Low complexity — each page is a standalone HTML file
- Shared nav via HTML includes or build-time templating
- No framework dependency
- Prototypes can remain as-is
- Fast to implement

### Risks
- No component reuse — nav/footer duplicated across pages
- Harder to maintain consistency
- No client-side routing (full page reloads)
- Limited dynamic functionality per page

### Estimated Effort
- 1 week for core pages
- Shared nav via simple JS include or build script

### Recommendation
Fastest path to multi-page. Good interim solution before a framework migration.

---

## Recommendation

**Option B first, then Option A.**

1. Extract key sections into separate HTML files (1 week)
2. Use a simple JS nav include for consistency
3. Validate SEO and traffic patterns
4. Plan Next.js migration for Q4 2026 when the product has paying customers

### Migration Preparation (done in v2.2)
- Application data centralized in `TOOLS[]` and `MATURITY_CONFIG`
- Application slugs standardized
- Section markup clearly separated with HTML comments
- Deep links use hash-based routing (`#app/[id]`)
- Analytics events use consistent naming
