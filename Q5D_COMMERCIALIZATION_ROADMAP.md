# Q5D Commercialization Roadmap

**Date:** 2026-07-21
**Owner:** Dr. Adetoro Oriaifo
**Status:** Active

---

## Phase 0: Platform Positioning

**Objective:** Reposition quantum5d.ai from consulting portfolio to enterprise FQHC AI platform.

| Task | Status | Notes |
|------|--------|-------|
| Update website positioning (hero, nav, footer, meta) | Pending | Brief defines exact copy |
| Clarify platform versus services throughout site | Pending | Services support platform adoption |
| Implement new navigation structure | Pending | Platform, Applications, Innovation Partners, Services, About, Contact |
| Build Innovation Partner program page and intake form | Pending | Full intake form per brief |
| Establish product maturity labels on all applications | Pending | Dr. T to review/confirm labels |
| Refine application descriptions and categories | Pending | 5 FQHC mission-aligned categories |
| Create CoverageGuard IQ flagship page/section | Pending | Problem → Solution → Users → Outcomes → Pilot Metrics → CTA |
| Add analytics for CTA and demo engagement | Pending | Hero CTAs, platform views, partner form, demo launches |
| Remove fabricated testimonials from consulting site | Pending | Content integrity — critical |
| Update OG/SEO metadata | Pending | Platform-first descriptions |

**Exit criteria:** First-time visitor understands Q5D is a platform for FQHCs within 10 seconds.

---

## Phase 1: Partner Recruitment

**Objective:** Identify and recruit 5 prospective innovation partners; select 1-3 high-fit partners.

| Task | Status | Notes |
|------|--------|-------|
| Build target profile for design-partner FQHCs | Not started | Multi-site, exec sponsorship, measurable challenges |
| Create partner outreach materials | Not started | One-pager, email templates, slide deck |
| Create application and intake workflow | Not started | Form → Supabase → notification → review |
| Create discovery-call structure | Not started | Standardized 30-min call agenda |
| Create evaluation scorecard | Not started | Fit criteria: size, challenge, sponsorship, readiness |
| Recruit 5 prospective innovation partners | Not started | Outreach via existing network, NACHC, LinkedIn |
| Select 1-3 high-fit partners | Not started | Scorecard-based selection |

**Exit criteria:** 1-3 signed innovation partners with executive sponsors identified.

---

## Phase 2: Pilot Definition

**Objective:** Define a rigorous pilot scope for the flagship use case with the first partner.

| Task | Status | Notes |
|------|--------|-------|
| Confirm one flagship use case | Not started | CoverageGuard IQ recommended unless strategy changes |
| Define baseline metrics | Not started | Current coverage loss rate, outreach completion, staff time |
| Define pilot scope | Not started | Patient population, time period, sites, workflows |
| Define workflow ownership | Not started | Who owns each step in the FQHC |
| Define data requirements | Not started | EHR, payer 271, pharmacy claims, patient contact |
| Define security and privacy requirements | Not started | BAA, PHI handling, access controls, audit |
| Define implementation responsibilities | Not started | Q5D vs. partner responsibilities |
| Establish pilot agreement | Not started | Formal agreement with scope, timeline, IP, confidentiality |
| Establish success criteria | Not started | Quantitative thresholds for each pilot metric |

**Exit criteria:** Signed pilot agreement with defined scope, metrics, and success criteria.

---

## Phase 3: Pilot Execution

**Objective:** Run the pilot, monitor adoption, and refine the product.

| Task | Status | Notes |
|------|--------|-------|
| Conduct workflow discovery | Not started | On-site or remote workflow observation |
| Configure application for partner environment | Not started | Data connections, rules, thresholds |
| Validate data quality and completeness | Not started | Reconcile sources, fill gaps |
| Train users | Not started | Role-specific training for each user type |
| Run pilot (target: 8-12 weeks) | Not started | Active monitoring throughout |
| Monitor adoption metrics weekly | Not started | Logins, actions taken, workflow completion |
| Review performance weekly with partner | Not started | Standup or async review |
| Document issues and refinements | Not started | Issue log with resolution tracking |
| Refine workflow and product based on feedback | Not started | Iterative improvement during pilot |

**Exit criteria:** Pilot completed with measurable outcome data collected.

---

## Phase 4: Evidence

**Objective:** Quantify outcomes and create credible evidence for expansion.

| Task | Status | Notes |
|------|--------|-------|
| Measure outcomes against baseline | Not started | Pre/post comparison on all pilot metrics |
| Quantify operational impact | Not started | Staff time saved, workflow steps reduced |
| Quantify financial impact | Not started | Revenue protected, coverage retained, cost avoided |
| Develop case study | Not started | Partner-approved, factual, with specific metrics |
| Secure approved testimonial | Not started | Partner executive quote with permission |
| Develop executive summary | Not started | One-page outcome summary for prospect conversations |
| Develop conference and publication strategy | Not started | NACHC, ACHE, ASHP, journal submissions |

**Exit criteria:** Published case study with quantified outcomes and partner approval.

---

## Phase 5: Productization

**Objective:** Standardize the product for repeatable deployment to additional FQHCs.

| Task | Status | Notes |
|------|--------|-------|
| Standardize onboarding process | Not started | Documented steps, timeline, checklist |
| Standardize pricing model | Not started | Per-site, per-patient, or subscription |
| Standardize configuration | Not started | Configurable rules, thresholds, workflows |
| Strengthen security posture | Not started | SOC 2 readiness, penetration testing, access controls |
| Strengthen auditability | Not started | Complete audit trail, compliance reporting |
| Improve support workflow | Not started | Ticketing, SLAs, documentation |
| Create repeatable deployment package | Not started | Infrastructure-as-code, deployment scripts, monitoring |
| Prepare expansion to additional FQHCs | Not started | Sales materials, demo environment, proposal templates |

**Exit criteria:** Second FQHC onboarded using standardized process.

---

## Genesis Build Framework (Internal Principles)

These principles guide all product decisions:

| Principle | Meaning | Platform Implication |
|-----------|---------|---------------------|
| **1. Illuminate** | Make risks, gaps, and performance visible | Dashboards, analytics, risk signals, alerts |
| **2. Separate** | Create clear domains and boundaries | Application boundaries, role-based access, domain-specific logic |
| **3. Establish the Foundation** | Build common environment first | Shared auth, audit trails, design system, data model, APIs |
| **4. Govern** | Intelligence controlled by rules and human oversight | Policy engines, knowledge bases, citations, human review, override |
| **5. Populate** | Add applications only after foundation supports them | Modular architecture, reusable services, consistent patterns |
| **6. Empower** | Increase capability, not dependence | Actionable insights, workflow integration, user control |
| **7. Multiply Sustainably** | Scale through repeatable deployment and measured outcomes | Multi-tenant readiness, configurable workflows, outcome measurement |

### Standing Product Rule

> Every new capability must strengthen the shared platform. Every application must use common infrastructure where practical. Nothing should become an isolated prototype without a clear strategic reason.

---

## Key Metrics to Track

### Phase 0 (Platform Positioning)
- Website visitor-to-demo-launch conversion rate
- Innovation partner applications received
- CoverageGuard IQ interest (CTA clicks)
- Time-on-platform-page

### Phase 1-2 (Partner Recruitment & Pilot Definition)
- Prospective partners contacted
- Discovery calls completed
- Partners selected
- Time from first contact to pilot agreement

### Phase 3-4 (Pilot Execution & Evidence)
- Patients evaluated
- Patients identified as at risk
- Contact records corrected
- Outreach completion rate
- Recertification completion rate
- Coverage retained / restored
- Revenue protected
- Staff time saved
- User adoption rate
- Net promoter score

### Phase 5 (Productization)
- Onboarding time (days)
- Configuration effort (hours)
- Support tickets per site
- Customer retention rate
- Revenue per FQHC
- Deployment success rate

---

## Timeline Guidance

This roadmap is milestone-driven, not calendar-driven. Phases advance when exit criteria are met.

**Realistic estimates:**
- Phase 0: 1-2 weeks (website changes)
- Phase 1: 4-8 weeks (partner recruitment)
- Phase 2: 2-4 weeks (pilot definition)
- Phase 3: 8-12 weeks (pilot execution)
- Phase 4: 2-4 weeks (evidence development)
- Phase 5: Ongoing (productization is iterative)

**Total estimated time to first case study:** 4-7 months from Phase 0 completion.
