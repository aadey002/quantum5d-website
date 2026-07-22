# Q5D Site Architecture — Proposed

**Date:** 2026-07-21
**Scope:** quantum5d.ai repositioning as FQHC AI platform

---

## 1. Sitemap and Page Hierarchy

```
quantum5d.ai/
├── / ............................ Homepage (repositioned hero + platform overview)
├── /platform ................... Platform architecture page (NEW)
├── /applications ............... Application portfolio (restructured from #work)
│   └── /applications/coverageguard ... CoverageGuard IQ flagship page (NEW)
├── /solutions .................. Solutions by FQHC challenge area (NEW — optional Phase 2)
├── /innovation-partners ........ Founding Innovation Partner Program (NEW)
├── /services ................... Services (repositioned from consulting-first)
├── /about ...................... About + Founder (refined)
├── /contact .................... Contact form (enhanced)
├── /admin ...................... Admin dashboard (existing, unchanged)
├── /blog ....................... Blog (redirect to quantum5dconsulting.com/blog or future migration)
├── /api/contact ................ Contact form API (existing)
├── /api/track-event ............ Event tracking API (existing)
├── /api/track-view ............. View tracking API (existing)
├── /api/subscribe .............. Newsletter API (existing)
├── /api/partner-apply .......... Innovation Partner intake API (NEW)
├── /robots.txt ................. Existing
└── /sitemap.xml ................ Updated
```

**Implementation note:** Since quantum5d.ai is a single-page HTML application, new "pages" will be implemented as scrollable sections within the same file, with anchor-based navigation (`#platform`, `#applications`, etc.) — consistent with the current architecture. The `/innovation-partners` and `/applications/coverageguard` routes can be handled via Vercel rewrites to anchors or as lightweight additional HTML pages if standalone routing is preferred.

---

## 2. Primary Navigation

### Desktop
```
Platform | Applications | Innovation Partners | Services | About | Contact | [Partner with us] (CTA)
```

### Mobile
- Hamburger menu with full nav items
- Large tap targets (min 44px)
- Sticky header on scroll
- Clear hierarchy with CTA button visible

### Changes from Current
| Current | Proposed | Rationale |
|---------|----------|-----------|
| Work | Applications | Platform language |
| Services | Services | Retained, repositioned |
| Partners | (Moved to ecosystem within Platform) | De-emphasized as nav item |
| About | About | Retained |
| — | Platform | New — core positioning page |
| — | Innovation Partners | New — primary conversion path |
| "Start a conversation" | "Partner with us" | Platform CTA vs. consulting CTA |

---

## 3. Application Taxonomy

### Current categories → Proposed categories

| Current Category | Proposed Category | Applications |
|-----------------|-------------------|--------------|
| Compliance & Coverage | **Compliance & Regulatory Readiness** | HRSA OSV Readiness Assistant, PharmTech CertIQ, Sentinel, Compliance Command, DTM Platform, LoopProof |
| Compliance & Coverage (partial) | **Coverage & Patient Access** | CoverageGuard IQ (flagship) |
| Governance & Leadership | **Governance & Executive Intelligence** | Board Intelligence, Meeting Intelligence, Exec Compensation Benchmarking |
| Strategy & Analytics | **Strategy, Finance & Sustainability** | ServiceLine IQ, 340B IRA Intelligence, PatientFirst Budget Engine |
| Pharmacy & Clinic Operations | **Pharmacy & Clinical Operations** | Rx Abandonment Worklist, TruReach |

### Product Maturity Labels (new field per application)

| Application | Proposed Maturity | Rationale |
|-------------|-------------------|-----------|
| Board Intelligence | In active use | Adopted by executive leadership team |
| Meeting Intelligence | In active use | Paired with Board Intelligence in production |
| CoverageGuard IQ | Pilot-ready | Most detailed prototype, full workflow |
| HRSA OSV Readiness Assistant | Pilot-ready | Comprehensive 19-area heat map |
| DTM Platform | In active use | Production DTM application/review system |
| Compliance Command | Interactive prototype | Rich demo, not in production |
| LoopProof | Interactive prototype | Detailed referral loop engine |
| PharmTech CertIQ | In active use | Used for board regulatory review |
| Sentinel | Concept demonstration | Regulatory AI-assist reasoning layer |
| ServiceLine IQ | Interactive prototype | Benchmark-driven analyzer |
| 340B IRA Intelligence | Interactive prototype | Margin compression analytics |
| PatientFirst Budget Engine | Interactive prototype | Patient-first budgeting model |
| Exec Compensation Benchmarking | Interactive prototype | Public filing benchmarking |
| Rx Abandonment Worklist | Interactive prototype | Risk-scored pharmacy worklist |
| TruReach | Interactive prototype | Phone validation — live inline demo |

**Note:** Dr. T should review and adjust these maturity labels based on actual deployment status. The labels above are inferred from application descriptions and prior conversation context.

---

## 4. Platform Architecture (for Platform page)

```
┌─────────────────────────────────────────────────────────────┐
│                    EXPERIENCE LAYER                         │
│  Executive dashboards · Operational workspaces · Reviewer   │
│  interfaces · Workflow alerts · Reports · Role-based views  │
├─────────────────────────────────────────────────────────────┤
│                   APPLICATION LAYER                         │
│  CoverageGuard IQ · HRSA OSV · Board Intelligence ·        │
│  Meeting Intelligence · Compliance Command · DTM Platform · │
│  PharmTech CertIQ · Sentinel · LoopProof · ServiceLine IQ · │
│  340B IRA Intelligence · PatientFirst Budget Engine ·       │
│  Exec Compensation · Rx Abandonment · TruReach              │
├─────────────────────────────────────────────────────────────┤
│                  INTELLIGENCE LAYER                         │
│  AI-assisted analysis · Policy & rules engines · Document   │
│  intelligence · Risk scoring · Workflow orchestration ·     │
│  Recommendation logic · Human review & override             │
├─────────────────────────────────────────────────────────────┤
│                   KNOWLEDGE LAYER                           │
│  HRSA requirements · CMS & Medicaid rules · 340B reqs ·    │
│  Pharmacy regulations · Org policies · Quality standards ·  │
│  Evidence & reference libraries                             │
├─────────────────────────────────────────────────────────────┤
│              INTEGRATION & SECURITY LAYER                   │
│  EHR/EMR integration · Pharmacy mgmt systems · APIs ·      │
│  Secure data exchange · Identity & access · Audit trails ·  │
│  Governance controls                                        │
└─────────────────────────────────────────────────────────────┘
```

**Transparency rule:** Clearly label which layers are "Available now," "In development," or "Planned capability."

---

## 5. CTA Hierarchy

| Priority | CTA | Location | Conversion Goal |
|----------|-----|----------|-----------------|
| 1 | "Explore the platform" | Hero primary | Platform page visit |
| 2 | "Become a founding innovation partner" | Hero secondary, Innovation Partners page | Partner application |
| 3 | "Launch demo" | Application cards | Demo engagement |
| 4 | "Discuss a CoverageGuard IQ pilot" | CoverageGuard IQ page | Flagship pilot |
| 5 | "Partner with us" | Nav CTA, footer | Contact/partnership |
| 6 | "Schedule a strategic conversation" | Services section, Contact | Consulting intake |

---

## 6. Content Migration Plan

### Hero Section
| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "FQHC · 340B · compliance & governance · AI systems" | "PURPOSE-BUILT FOR FEDERALLY QUALIFIED HEALTH CENTERS" |
| Headline | "Clinical, compliance & governance expertise, *engineered into systems that deliver.*" | "The AI platform for stronger, more sustainable FQHCs." |
| Tagline | "Delivering quantum leap ROI." | (Remove — replaced by supporting statement) |
| Lead | Consulting-first description | "Quantum5D.ai brings operational, regulatory, financial, pharmacy, governance, and patient-access intelligence into one purpose-built platform—helping health centers work more efficiently, improve quality, protect revenue, and strengthen long-term sustainability." |
| Primary CTA | "See the work →" | "Explore the platform" |
| Secondary CTA | "Book a consult" | "Become a founding innovation partner" |
| Owned badges | Minority/Pharmacist/Woman-owned | Retain — valuable differentiator |

### Navigation
| Current | Action |
|---------|--------|
| Brand "Consulting" subtitle | Replace with platform tagline or remove |
| "Work" link | Rename to "Applications" |
| "Partners" link | Replace with "Innovation Partners" |
| Add "Platform" link | New anchor section |
| "Start a conversation" button | Change to "Partner with us" |

### Work/Applications Section
| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "Selected work" | "Platform applications" |
| Heading | "Tools we've designed and shipped" | "Applications built for the FQHC operating environment" |
| Subtext | Consulting comparison | "Explore purpose-built applications addressing coverage retention, regulatory readiness, governance, pharmacy operations, executive decision support, and organizational sustainability." |
| Categories | 4 current | 5 proposed (see taxonomy above) |
| Category counts | "X tools" | "X applications" |
| Card badges | "Interactive demo" / "Preview" | Maturity labels per application |
| Card footer | "▸ Launch demo" | Retain — good UX |

### Services Section
| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "How we help" | "Expert services" |
| Heading | "Where Quantum 5D plugs in" | "Services that help health centers adopt, operationalize, and scale the platform" |
| Subtext | Consulting engagement model | Platform-support framing |
| Service #4 | "Custom AI tooling" | "Platform implementation & AI workflow design" |

### Partners Section
| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Let's build this together" | Retain or evolve to "Partner ecosystem" |
| ICONMA card | "Featured partner" — data/analytics/AI | Retain with factual language |
| Partner types | 7 types | Retain, add academic/research collaborators |

### About/Founder Section
| Element | Current | Proposed |
|---------|---------|----------|
| Eyebrow | "The operator behind the build" | "Founder" |
| Role | "Founder & Principal · Quantum 5D Consulting, LLC" | "Founder & CEO · Quantum5D.ai" |
| Bio text | Operator-builder consulting narrative | Founder-market fit narrative per brief |

### Contact Section
| Element | Current | Proposed |
|---------|---------|----------|
| Heading | "Have a problem worth building for?" | "Start a conversation" (simpler) |
| Subtext | Consulting diagnostic framing | Platform/partnership framing |
| Fields | Name, Organization, Email, Message | Retain for general contact |

### Footer
| Current | Proposed |
|---------|----------|
| "Quantum 5D Consulting, LLC" | "Quantum5D.ai" (with legal entity retained if needed in small text) |

---

## 7. New Sections to Add

### A. Platform Section (`#platform`)
- Platform architecture diagram (5-layer visual)
- Brief explanation of each layer
- Transparency labels (Available now / In development / Planned)
- Position between hero and applications

### B. Innovation Partners Section (`#innovation-partners`)
- Program headline and description
- Ideal partner profile
- Partner participation model
- Benefits
- Required commitment
- Intake form (name, title, org, email, org size, sites, state, priority challenge, area of interest, exec sponsor, pilot timeline, data readiness, consent)
- New API endpoint: `/api/partner-apply`

### C. CoverageGuard IQ Spotlight
- Can be implemented as a featured card/section before the main applications grid
- Problem → Solution → Users → Outcomes → Pilot Metrics → CTA
- "Discuss a CoverageGuard IQ pilot" CTA

---

## 8. URL Changes and Redirects

Since the showcase site uses anchor-based navigation within a single HTML file, URL changes are minimal:

| Current Anchor | New Anchor | Notes |
|---------------|------------|-------|
| `#work` | `#applications` | Rename |
| `#services` | `#services` | No change |
| `#partners` | `#ecosystem` | Rename (partner section becomes ecosystem) |
| `#about` | `#about` | No change |
| `#contact` | `#contact` | No change |
| — | `#platform` | New section |
| — | `#innovation-partners` | New section |
| — | `#coverageguard` | New spotlight section |

### Vercel Rewrites (additions)
```json
{ "source": "/platform", "destination": "/quantum5d-site-index.html#platform" },
{ "source": "/applications", "destination": "/quantum5d-site-index.html#applications" },
{ "source": "/innovation-partners", "destination": "/quantum5d-site-index.html#innovation-partners" },
{ "source": "/applications/coverageguard", "destination": "/quantum5d-site-index.html#coverageguard" }
```

**Note:** Anchor-based rewrites may not work as expected with Vercel (browsers don't send fragments to servers). Alternative: handle via JavaScript `window.location.hash` on page load to scroll to the correct section when accessed via clean URLs.

---

## 9. Consulting Site Relationship

### Recommended approach
- **quantum5d.ai** = Primary platform site (all product, platform, and partnership content)
- **quantum5dconsulting.com** = Content marketing site (blog, resources, thought leadership)
- Eventually consider migrating blog to quantum5d.ai/blog

### Immediate consulting site changes
1. **Remove fabricated testimonials** — Critical integrity issue
2. Update nav "Tools ↗" label to "Platform ↗"
3. Update hero messaging to reference platform rather than competing with it
4. Verify case study claims are factually supportable

---

## 10. Analytics Event Structure

### New events to track
| Event | Trigger | Data |
|-------|---------|------|
| `hero_cta_click` | Hero CTA buttons | `{cta: 'explore_platform' \| 'innovation_partner'}` |
| `platform_section_view` | Platform section enters viewport | `{section: 'platform'}` |
| `application_demo_launch` | Demo launched | `{app_id, app_name, category, maturity}` |
| `innovation_partner_form_start` | First field interaction | `{}` |
| `innovation_partner_form_submit` | Form submitted | `{org_size, state, challenge_area}` |
| `coverageguard_interest` | CoverageGuard CTA click | `{cta: 'discuss_pilot'}` |
| `category_expand` | Category accordion opened | `{category}` |
| `service_view` | Service card viewed | `{service_name}` |
| `contact_form_submit` | Contact form submitted | `{source_section}` |

### Existing events to retain
- `trackEvent()` → `site_events` table (page views, prototype launches)
- GA4 `G-1KGZ0633K4` pageview and event tracking

---

## Summary

The architecture preserves the single-page HTML approach and all 16 interactive prototypes while restructuring the narrative from consulting-first to platform-first. New sections (Platform, Innovation Partners, CoverageGuard IQ spotlight) are additive — nothing is removed. The consulting site receives targeted fixes (testimonial removal, label updates) but remains separate for content marketing.
