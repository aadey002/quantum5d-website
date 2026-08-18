# W02 Positioning Specification

**Date:** 2026-08-18  
**Authority:** This document is the single positioning reference for all Q5D site content. It supplements CLAUDE.md — it does not replace or conflict with it.  
**Decision:** Option B — Educational resource with preserved but reframed consulting pathway.

---

## Identity Statement

Quantum5D.ai is an **educational resource and Applied AI Prototype Lab** operated by Quantum 5D Consulting. It demonstrates how artificial intelligence can be applied to operational challenges in Federally Qualified Health Centers (FQHCs).

---

## What the Platform IS

- An educational showcase of **15 Applied AI Prototypes** (client-side, browser-only)
- A **blog** publishing original analysis on 340B, pharmacy operations, Medicaid, and FQHC governance
- A **resource library** offering free compliance tools, checklists, and guides
- A **consulting presence** for Quantum 5D Consulting's advisory services
- A **professional profile** for Dr. Adetoro Oriaifo (CPO, THC / Founder, Q5D)

## What the Platform IS NOT

- Not a production system (no backend processing, no databases, no API integrations)
- Not authenticated (no user accounts, no tenant separation, no access control)
- Not validated (no clinical validation, no external user testing, no outcome measurement)
- Not a pilot (no live data, no real patients, no production workflows)
- Not a SaaS product (no subscriptions, no pricing, no service level agreements)

---

## Maturity Framework

**Only one maturity label is authorized for public-facing content:**

| Label | CSS Class | Description |
|-------|-----------|-------------|
| Interactive Prototype | `b-proto` | Client-side demonstration using illustrative data. Not a production system. |

**The following labels are PROHIBITED in public-facing HTML, including MATURITY_CONFIG definitions:**

- Pilot-Ready / pilot_ready
- In Active Use / in_active_use
- Design Partner Development / design_partner
- Technical Proof of Concept / technical_poc
- Research Validation

**Permitted supporting labels (concept-stage only):**

| Label | Use |
|-------|-----|
| Concept | For components described but not yet built (e.g., "Governance Knowledge Model — Concept") |
| In Development | For components under active construction but not yet interactive |

---

## Language Rules

### Mandatory Translations (apply everywhere in public-facing content)

| Prohibited | Required |
|-----------|----------|
| Pilot Partnership | Proposed Controlled Evaluation |
| Schedule a Briefing | Request an Educational Briefing |
| Schedule a 15-minute tailored walkthrough | Request an educational briefing on responsible FQHC AI adoption |
| 15 Purpose-Built Applications | 15 Applied AI Prototypes |
| Revenue protected / coverage retained (as realized outcomes) | Potential value measure in a proposed evaluation |
| Live pilot running | Illustrative prototype using synthetic data |
| Design Partner Pilots | Proposed Controlled Evaluations |
| Knowledge Engine Building (active tense) | Governance Knowledge Model — Concept |
| Platform implementation | Future Implementation Requirements |
| Validate with real users | Has not been validated; proposed evaluation methodology |
| Founding Innovation Partner | Educational Contributor / Evaluation Participant |
| Services help health centers adopt, operationalize, and scale | Guidance on readiness, governance, infrastructure, and evaluation |

### Words/Phrases Never Permitted in Public Content

- "validated" (past tense, implying completed validation)
- "proven" / "proven results"
- "production-ready" / "enterprise-ready"
- "deployed at" / "running at" (implying live production use)
- "customers" / "users" (implying active external users)
- "saves $X" / "protects $X" (implying realized financial outcomes)
- "ROI" as a realized metric (permitted only as "potential ROI in a proposed evaluation")

### Words/Phrases Permitted

- "demonstrates" / "illustrates" / "shows how"
- "designed to" / "intended to" / "could"
- "prototype" / "interactive prototype" / "demonstration"
- "synthetic data" / "illustrative data" / "sample data"
- "educational" / "informational"
- "consulting" / "advisory" / "guidance"

---

## Required Disclosures

Every prototype context (card, modal, detail page) must include BOTH of these disclosures:

1. **Ownership:** "Built by Quantum 5D Consulting, which owns this prototype."
2. **Status:** "This interactive prototype uses illustrative data and is not a production system."

Implementation: shared constant or function — never manually duplicated across 15 files.

---

## Preserved Content (DO NOT MODIFY)

| Content | Reason |
|---------|--------|
| `/about` page | Verified Aug 8 — change CTA button text only |
| All 25 published blog posts | Editorial content — do not retroactively edit |
| Client success story (Post 20) | Confirmed real data by Dr. T |
| LinkedIn auto-poster pipeline | Active, approved — 9 posts queued |
| Blog auto-publisher pipeline | Active, approved — 6 posts scheduled through Dec 2026 |
| Contact forms and lead capture | Business function — do not remove |
| Services page | Preserve page, reframe language only |
| Partners page | Preserve page, reframe language only |

---

## Analytics Rules

- **No email addresses** in any analytics payload (GA4, trackEvent, site_events)
- **No full URLs** containing user identifiers in analytics payloads
- **Permitted:** categorical event names, app IDs, page paths, anonymous session data
- **email_click event:** must send `{type: "email"}` only — not the mailto href
- **outbound click events:** must send `{type: "linkedin"}` or `{type: "external"}` — not the full URL

---

## Scope Boundaries

This specification governs `quantum5d.ai` content only. It does not apply to:
- `quantum5dconsulting.com` (separate React SPA with its own content)
- THC Board Intelligence (`thcboardintel.z13.web.core.windows.net`)
- Rx Compass (`rx-accountability-platform.vercel.app`)
- Any Supabase backend configuration

---

## Enforcement

W03 (maturity cleanup), W04 (truth-in-labeling), W05 (disclosures), and A02 (analytics) implement this specification. After implementation, a build-time consistency test should verify:

1. No prohibited maturity labels in any MATURITY_CONFIG
2. No prohibited language strings in any public HTML
3. Both disclosures present on all 15 prototype pages
4. No email addresses or full URLs in analytics event parameters
