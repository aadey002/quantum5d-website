# Q5D Website Audit — Current-State Report

**Date:** 2026-07-21
**Scope:** quantum5d.ai (showcase) + quantum5dconsulting.com (consulting SPA)

---

## 1. Current Pages and Routes

### quantum5d.ai (showcase — single-page HTML)
| Route | File | Description |
|-------|------|-------------|
| `/` | `quantum5d-site-index.html` | Main showcase — hero, tools grid, services, partners, about, contact |
| `/admin` | `admin.html` | Admin dashboard (leads, blog, LinkedIn, pipeline, website analytics) |
| `/api/contact` | `api/contact.ts` | Contact form handler → Supabase + Resend + SMS |
| `/api/track-event` | `api/track-event.ts` | Event tracking → `site_events` table |
| `/api/track-view` | `api/track-view.ts` | Page view tracking → `blog_views` table |
| `/api/subscribe` | `api/subscribe.ts` | Newsletter subscription |
| `/api/prerender-purge` | `api/prerender-purge.ts` | Cache purge utility |

### quantum5dconsulting.com (React SPA — Vite + React Router)
| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage.tsx` | Consulting homepage with hero, testimonials, case studies |
| `/about` | `AboutPage.tsx` | Founder bio and credentials |
| `/services` | `ServicesPage.tsx` | Consulting service descriptions |
| `/apprenticeship` | `ApprenticeshipPage.tsx` | Pharmacy apprenticeship program |
| `/case-studies` | `CaseStudiesPage.tsx` | Client case studies |
| `/blog` | `BlogListPage.tsx` | Blog listing from Supabase |
| `/blog/:slug` | `BlogPostPage.tsx` | Individual blog post |
| `/resources` | `ResourcesPage.tsx` | Downloadable resources |
| `/340b-ira-impact` | `IRAImpact340BPage.tsx` | 340B IRA impact content |
| `/contact` | `ContactPage.tsx` | Contact form |

---

## 2. Current Navigation

### quantum5d.ai
```
Work | Services | Partners | About | [Start a conversation] (CTA button)
```
- No mobile hamburger menu visible
- Navigation is a simple `<nav>` with anchor links to page sections
- Brand reads: "Quantum 5D" with subtitle "Consulting"

### quantum5dconsulting.com
```
Home | About | Services | Apprenticeship | Cases | Blog | Resources | Tools ↗ | Contact
```
- Has mobile hamburger (Lucide Menu/X icons, `lg:` breakpoint)
- "Tools ↗" links externally to quantum5d.ai
- Brand reads: "Quantum 5D Consulting" with tagline "Delivering quantum leap ROI"

---

## 3. Existing Applications (16 total)

### Compliance & Coverage (7 applications)
| ID | Name | Status | Demo Type |
|----|------|--------|-----------|
| `coverage` | CoverageGuard IQ | Interactive demo | Inline prototype |
| `osv` | HRSA OSV Readiness Assistant | Interactive demo | Inline prototype |
| `dtm` | DTM Platform | Interactive demo | Inline prototype |
| `certiq` | PharmTech CertIQ | Interactive demo | Inline prototype |
| `sentinel` | Sentinel | Interactive demo | Inline prototype |
| `compliance` | Compliance Command | Interactive demo | Inline prototype |
| `loopproof` | LoopProof | Interactive demo | Inline prototype |

### Governance & Leadership (3 applications)
| ID | Name | Status | Demo Type |
|----|------|--------|-----------|
| `board` | Board Intelligence | Interactive demo | External HTML |
| `meeting` | Meeting Intelligence | Interactive demo | External HTML |
| `benchmark` | Exec Compensation Benchmarking | Interactive demo | Inline prototype |

### Strategy & Analytics (3 applications)
| ID | Name | Status | Demo Type |
|----|------|--------|-----------|
| `serviceline` | ServiceLine IQ | Interactive demo | Inline prototype |
| `ira` | 340B IRA Intelligence | Interactive demo | Inline prototype |
| `budget` | PatientFirst Budget Engine | Interactive demo | Inline prototype |

### Pharmacy & Clinic Operations (2 applications)
| ID | Name | Status | Demo Type |
|----|------|--------|-----------|
| `abandon` | Rx Abandonment Worklist | Interactive demo | Inline prototype |
| `trureach` | TruReach | Interactive demo | Inline phone validator |

**Note:** All 16 are marked `live:true` with badge "Interactive demo." None have product maturity labels distinguishing prototype from production.

---

## 4. Current CTAs

### quantum5d.ai
| Location | Text | Target |
|----------|------|--------|
| Nav | "Start a conversation" | `#contact` |
| Hero primary | "See the work →" | `#work` |
| Hero secondary | "Book a consult" | `#contact` |
| Tool cards | "▸ Launch demo" | Opens modal |
| Tool modal | "Launch full prototype ↗" | Inline prototype |
| Partners footer | "Let's talk →" | `#contact` |
| Contact form | "Send inquiry →" | `sendInquiry()` |

### quantum5dconsulting.com
| Location | Text | Target |
|----------|------|--------|
| Nav | "Tools ↗" | quantum5d.ai (external) |
| Hero | Various consulting CTAs | Internal pages |

---

## 5. Current Hero Content

### quantum5d.ai
- **Eyebrow:** "FQHC · 340B · compliance & governance · AI systems"
- **Headline:** "Clinical, compliance & governance expertise, *engineered into systems that deliver.*"
- **Tagline:** "Delivering quantum leap ROI."
- **Lead:** "Quantum 5D Consulting is a minority-, pharmacist-, and woman-owned advisory firm. We optimize 340B, master the regulatory landscape, and build the tools that turn FQHC operations into measurable return."
- **Primary CTA:** "See the work →"
- **Secondary CTA:** "Book a consult"
- **Owned badges:** Minority-owned · Pharmacist-owned · Woman-owned · Nationwide · 340B-focused

### Assessment
The hero positions Q5D as a **consulting firm that also builds tools**, not as a technology platform. "Book a consult" is the secondary CTA. The word "Consulting" appears in the lead text. The emphasis is on advisory identity rather than platform capability.

---

## 6. Consulting-Heavy Language (items to change)

| Location | Current Language | Issue |
|----------|-----------------|-------|
| Nav brand | "Quantum 5D" + "Consulting" | Positions as consulting firm |
| Hero lead | "Quantum 5D Consulting is a minority-, pharmacist-, and woman-owned advisory firm" | Consulting-first identity |
| Hero CTA | "Book a consult" | Consulting action |
| Hero tagline | "Delivering quantum leap ROI" | Vague consulting tagline |
| Work section | "Tools we've designed and shipped" | "Tools" language |
| Work subtext | "Most consultants hand you a slide deck. We hand you systems" | Consulting comparison |
| Services header | "Where Quantum 5D plugs in" | Consulting framing |
| Services subtext | "From a focused strategy sprint to a full build-and-handoff" | Consulting engagement model |
| Service #4 | "Custom AI tooling" | "Tooling" not "applications" |
| About eyebrow | "The operator behind the build" | Individual-focused |
| About role | "Founder & Principal · Quantum 5D Consulting, LLC" | Consulting entity |
| Contact header | "Have a problem worth building for?" | Consulting intake |
| Contact subtext | "Tell us what's slowing your pharmacy or covered entity down" | Consulting diagnostic |
| Footer | "Quantum 5D Consulting, LLC" | Consulting entity |
| Tool cards | "X tools" count labels | "Tools" language |
| Category headers | Category blurbs reference tools | "Tools" language |
| OG description | "Quantum 5D Consulting — clinical, compliance, and governance expertise..." | Consulting description |

---

## 7. Platform-Ready Assets (strengths to preserve)

- **16 working interactive prototypes** — substantial demo portfolio
- **Deep FQHC domain specificity** — every application targets real FQHC workflows
- **Premium visual design** — navy/violet palette, Cormorant Garamond serif + Inter sans-serif, editorial tone
- **Guided demo walkthroughs** — each application has step-by-step "How to try it" instructions
- **Structured tool data model** — `TOOLS[]` and `CATS[]` arrays make restructuring straightforward
- **Partner ecosystem section** — 7 partner categories already defined
- **Working contact form** — Supabase + Resend + SMS pipeline
- **GA4 analytics** — `G-1KGZ0633K4` tracking active
- **Event tracking** — `trackEvent()` already logs prototype launches to `site_events`
- **Admin dashboard** — 6-tab operational dashboard at `/admin`
- **Blog infrastructure** — Supabase-backed blog with auto-publishing
- **LinkedIn automation** — Content scheduling and posting pipeline
- **SEO foundations** — `robots.txt`, `sitemap.xml`, OG tags present
- **CoverageGuard IQ** — already the most detailed application description (full recertification loop)

---

## 8. Mobile UX Issues

| Issue | Severity | Location |
|-------|----------|----------|
| No visible mobile hamburger menu on showcase site | High | quantum5d.ai nav |
| `nav-links` div has no mobile toggle mechanism | High | Line 256 |
| Tool cards may overflow on small screens | Medium | `#toolGrid` |
| Category sections default collapsed (only first open) — acceptable but needs clear affordance | Low | Category headers |
| Long tool descriptions in modals may require excessive scrolling | Medium | Modal content |
| Hero text at 38px mobile may still be large for narrow viewports | Low | `.hero h1` media query |
| Contact form has no field validation indicators visible | Medium | `#contact` form |
| Partner grid may not collapse properly on mobile | Medium | `.partner-grid` |
| No sticky header on scroll | Low | `<nav>` |
| floating `quantum5d.ai` pill (referenced in brief) — need to verify if present | Medium | Unknown |

---

## 9. Technical Risks

| Risk | Severity | Detail |
|------|----------|--------|
| **Fabricated testimonials on consulting site** | **CRITICAL** | `HomePage.tsx` lines 31-55 contain testimonials from "Sarah Johnson", "Michael Chen", "Lisa Rodriguez" with specific dollar figures ($2M savings, 30% cost reduction). These appear fabricated and violate content integrity rules. Must remove immediately. |
| **All prototypes labeled "Interactive demo"** | Medium | No distinction between prototype, pilot-ready, and in-active-use. Misrepresents maturity. |
| **Single 750KB HTML file** | Low | Works but makes incremental updates harder. Acceptable for now. |
| **Two separate sites create identity confusion** | Medium | quantum5d.ai = tools, quantum5dconsulting.com = consulting. Visitor must navigate between two brands. |
| **No HTTPS enforcement verification** | Low | Vercel handles this, but verify. |
| **Contact form sends to `hello@quantum5d.ai`** | Low | Verify this email exists and is monitored. |
| **Case studies on consulting site** | Medium | "Large FQHC Network" — $6M savings, "$1.3M annual revenue increase" — verify these are factually supportable before retaining. |
| **No privacy policy or terms of service** | Medium | Required for enterprise credibility and GDPR/CCPA compliance. |

### 9a. Unsupported Claims Audit (Full Codebase Scan — Completed 2026-07-22)

**Findings across consulting site (`quantum5d-consulting-deploy/src/pages/`):**

| File | Line(s) | Claim | Status |
|------|---------|-------|--------|
| `HomePage.tsx` | 31-54 | Fabricated testimonials: "Sarah Johnson", "Michael Chen", "Lisa Rodriguez" with $2M, 30%, $6M figures | **REMOVED** |
| `HomePage.tsx` | 57-75 | Case studies with specific dollar figures ($6M, $1.3M, 100%) — unverified | **REMOVED** |
| `HomePage.tsx` | 162-201 | "Proven Results" metrics: $6M+, $1.3M+, 50+ orgs, 98% satisfaction | **REMOVED** — replaced with evidence-based block |
| `HomePage.tsx` | 261 | "Proven Case Studies: Real Results for Real Clients" | **REMOVED** |
| `HomePage.tsx` | 352-353 | "Proven Track Record" — "50+ organizations, 98% satisfaction, millions in savings" | **FIXED** — replaced with factual language |
| `HomePage.tsx` | 454-455 | "Trusted by Healthcare Providers Nationwide" — "50+ organizations, 98% satisfaction" | **FIXED** — replaced with platform positioning |
| `AboutPage.tsx` | 61 | "proven results" | **FIXED** |
| `AboutPage.tsx` | 128 | "Proven 340B Consulting Track Record" | **FIXED** — replaced with "Areas of Expertise" |
| `AboutPage.tsx` | 140, 148 | "$6M+", "$1.3M+" | **REMOVED** |
| `AboutPage.tsx` | 157 | "98% Client Satisfaction Rate" | **REMOVED** |
| `CaseStudiesPage.tsx` | 84-85 | SEO meta: "$6M+ savings, 98% compliance success rate" | **FIXED** |
| `CaseStudiesPage.tsx` | 116-119 | "Proven Results Across Healthcare Organizations" | **FIXED** |
| `CaseStudiesPage.tsx` | 128-137 | "$6M+" and "98%" stat blocks | **FIXED** |
| `CaseStudiesPage.tsx` | 215 | "proven strategies" | **FIXED** |
| `ServicesPage.tsx` | 90 | "98% compliance success rate" | **FIXED** |
| `ServicesPage.tsx` | 105 | "75% reduction in staff turnover" | **FIXED** |
| `ServicesPage.tsx` | 209 | "proven expertise" in meta description | **FIXED** |
| `ServicesPage.tsx` | 442 | "proven methodology" | **FIXED** |
| `ServicesPage.tsx` | 451, 467 | "$6M+" and "98%" stat blocks | **FIXED** |
| `ServicesPage.tsx` | 479 | "Our Proven 340B Consulting Process" | **FIXED** |
| `ResourcesPage.tsx` | 179 | "Proven methodologies" | **FIXED** |

**Showcase site (`quantum5d-site-index.html`):** No unsupported claims found. Percentages in prototype demo data (e.g. "hypertension control 64%") are clearly labeled as sample/demo data within interactive prototypes, not marketing claims.

---

## 10. Duplicate Messaging Between Sites

| Element | quantum5d.ai | quantum5dconsulting.com |
|---------|-------------|----------------------|
| Brand name | "Quantum 5D" + "Consulting" | "Quantum 5D Consulting" |
| Tagline | "Delivering quantum leap ROI" | "Delivering quantum leap ROI" |
| Services | 6 services listed | Overlapping services on ServicesPage |
| Contact form | Supabase-backed | Supabase-backed (same backend) |
| GA4 | G-1KGZ0633K4 | G-1KGZ0633K4 (same) |
| About/Founder | Brief founder section | Full AboutPage |
| 340B content | 340B IRA Intelligence prototype | Dedicated IRAImpact340BPage |

**Recommendation:** Consolidate to quantum5d.ai as the primary platform site. The consulting React SPA can remain for blog, resources, and content marketing, but should not compete for the primary brand narrative.

---

## 11. Quick Wins (can implement immediately)

| # | Quick Win | Impact | Effort |
|---|-----------|--------|--------|
| 1 | Replace hero headline with platform positioning | High | Low |
| 2 | Change nav brand from "Consulting" subtitle to platform tagline | High | Low |
| 3 | Replace "Tools we've designed and shipped" → "Applications built for the FQHC operating environment" | High | Low |
| 4 | Replace "Book a consult" CTA → "Become a founding innovation partner" | High | Low |
| 5 | Add product maturity badges to TOOLS array (new `maturity` field) | High | Low |
| 6 | Change `tool` CSS class names and "X tools" counts to "applications" | Medium | Low |
| 7 | Update OG/meta descriptions to platform positioning | Medium | Low |
| 8 | Remove fabricated testimonials from consulting site | **Critical** | Low |
| 9 | Update footer from "Consulting, LLC" to platform branding | Medium | Low |
| 10 | Add "Innovation Partner" nav link and section | High | Medium |

---

## 12. Design System Summary

### Colors (CSS custom properties)
- `--navy`: Deep navy (primary background)
- `--purple-soft`: Soft purple (accents, eyebrows)
- `--line`: Border/divider color
- `--muted`: Muted text
- Gradient: `radial-gradient(120% 130% at 78% 8%, #2a2168 0%, var(--navy) 55%)`

### Typography
- Headlines: `Cormorant Garamond`, serif (58px hero, italic tagline)
- Body: `Inter`, sans-serif
- Mono: `IBM Plex Mono` (badges, technical labels)

### Components
- `.btn .btn-primary`: Primary action buttons
- `.btn .btn-ghost`: Secondary/ghost buttons
- `.tool`: Application cards with hover states
- `.cat-sec`: Collapsible category sections
- `.svc`: Service cards (numbered)
- `.partner`: Partner ecosystem cards
- `.modal`: Full-screen modal for demo launch
- `.badge .b-live / .b-soon`: Status badges
- `.tag`: Tag chips
- `.pill`: Status pills (red/amber/green/gray)

### Framework
- Pure CSS (no Tailwind on showcase)
- Tailwind CSS v3.4.16 on consulting site
- Responsive: single media query at ~768px breakpoint

---

## Summary

**Current state:** Quantum5d.ai is a well-built showcase with 16 working prototypes and a premium visual identity, but it is framed entirely as a consulting firm's portfolio. The strategic repositioning requires changing messaging, navigation, and CTAs — not rebuilding the technical foundation.

**Critical action items:**
1. Remove fabricated testimonials from consulting site (content integrity violation)
2. Reposition hero from consulting to platform
3. Replace "tools" language with "applications"
4. Add platform page, innovation partner program, and CoverageGuard IQ flagship page
5. Add product maturity labels
6. Fix mobile navigation on showcase site
7. Restructure application categories to align with FQHC mission areas

**Assets to preserve:**
- All 16 interactive prototypes
- Visual design system (navy/violet, Cormorant Garamond/Inter)
- Contact form pipeline
- Admin dashboard
- Blog and LinkedIn automation
- Event tracking infrastructure
