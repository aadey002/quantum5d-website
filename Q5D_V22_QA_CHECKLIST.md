# Q5D v2.2 QA Checklist

**Date:** 2026-07-22

---

## Automated Checks (33/33 pass)

### Phase 1 — Form Fixes
- [x] Honeypot field `f-hp` exists in DOM
- [x] `isValidEmail()` shared validator function exists
- [x] `val()` is null-safe
- [x] Briefing form has timeout recovery
- [x] Partner form has timeout recovery

### Phase 2 — Content Consistency
- [x] `PLATFORM_CONFIG.applicationCount` = 15
- [x] Canonical link present
- [x] DTM renamed to "Collaborative Practice Review"
- [x] No "Twenty-plus" claims
- [x] "AI operating platform" in metadata

### Phase 3 — Maturity Standardization
- [x] MATURITY_CONFIG includes `desc` field for each status
- [x] Modal displays maturity description (`_mc.desc`)

### Phase 4+6 — Conversion Hierarchy
- [x] Nav CTA: "Schedule a Briefing"
- [x] Hero primary CTA: "Schedule an Executive Briefing"
- [x] Founding partner teaser band appears after outcomes
- [x] Partner application link below briefing form
- [x] Hero trust line: "Built by an FQHC executive..."

### Phase 7 — Trust Signals
- [x] Trust strip with SVG icons present

### Phase 11 — Clean-Room
- [x] No "e.g. Maryland" placeholder
- [x] "State or territory" placeholder used

### Phase 12 — Analytics
- [x] `hero_schedule_briefing` event
- [x] `briefing_form_submit` event
- [x] `partner_application_submit` event

### Phase 13 — Accessibility
- [x] `aria-live="polite"` on form status messages
- [x] `prefers-reduced-motion` support for new animations
- [x] Form labels have `for=` attributes

### Core Functionality Preserved
- [x] All 15 applications present in TOOLS array
- [x] Share system (copy, email, LinkedIn, X, QR, colleague)
- [x] Colleague share form
- [x] Role-based filter
- [x] Priority recommendations
- [x] Platform visualization
- [x] GA4 tracking

---

## Manual Browser Testing Required

| Check | Breakpoints | Status |
|-------|------------|--------|
| Navigation links work | All | Pending user review |
| Mobile hamburger | 760px and below | Pending user review |
| Sticky header | All | Pending user review |
| Hero layout (two-column) | Desktop / stacks mobile | Pending user review |
| Platform viz animations | Desktop | Pending user review |
| Outcome cards hover | Desktop | Pending user review |
| Founding partner band | All | Pending user review |
| Comparison section | 3-col desktop / 1-col mobile | Pending user review |
| Priority selector | All | Pending user review |
| CoverageGuard spotlight | All | Pending user review |
| Application cards + maturity badges | All | Pending user review |
| Role filter buttons | All | Pending user review |
| Category expand/collapse | All | Pending user review |
| Demo launch (click any app) | All | Pending user review |
| Share bar in modals | All | Pending user review |
| Email share opens mail client | All | Pending user review |
| Colleague share form | All | Pending user review |
| QR code generation | All | Pending user review |
| Copy link + confirmation | All | Pending user review |
| Innovation Partner form fields | All | Pending user review |
| Briefing form fields | All | Pending user review |
| Form validation errors display | All | Pending user review |
| Keyboard navigation (Tab) | Desktop | Pending user review |
| Footer layout | All | Pending user review |
| No horizontal scroll | Mobile | Pending user review |
| No overlapping elements | Mobile | Pending user review |
