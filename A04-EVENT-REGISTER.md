# A04 Educational Analytics Event Register

**Date:** 2026-08-19  
**Destination:** Google Analytics 4 (G-VVH09H9BLM)  
**Utility:** `window.trackEvent(eventName, params)` in quantum5d-site-index.html  
**Safety:** Dev guard (only fires on `quantum5d.ai` hostname). No email addresses, narratives, PHI, full IPs, quiz answers, or unrestricted search terms in any payload.

---

## Implemented Events

| # | Event Name | Trigger | Parameters | Destination | Validation |
|---|-----------|---------|------------|-------------|------------|
| 1 | `email_click` | Any mailto: link click | `{type: "email"}` | GA4 | SAFE — categorical only |
| 2 | `linkedin_outbound_click` | Any linkedin.com link click | `{type: "linkedin"}` | GA4 | SAFE — categorical only |
| 3 | `application_detail_view` | Open prototype detail modal | `{app: id, name: name}` | GA4 | SAFE — app identifiers only |
| 4 | `explore_applications_click` | Click "Explore Applications" CTA | `{}` | GA4 | SAFE |
| 5 | `outcome_card_click` | Click use-case card in hero | `{use_case: label}` | GA4 | SAFE — categorical label |
| 6 | `role_filter` | Select audience role filter | `{role: value}` | GA4 | SAFE — predefined role values |
| 7 | `priority_recommendation` | Priority recommendation generated | `{app: id}` | GA4 | SAFE — app identifier only |
| 8 | `executive_brief_download` | Click executive brief link | `{app: id}` | GA4 | SAFE |
| 9 | `executive_briefing_submit` | Submit contact/briefing form | `{source: type}` | GA4 | SAFE — categorical source only |
| 10 | `application_share_copy` | Copy application link | `{url: quantum5d_url}` | GA4 | SAFE — own URL only |
| 11 | `application_share_qr` | Generate QR code | `{app: id}` | GA4 | SAFE |
| 12 | `application_share_colleague` | Share via email to colleague | `{app: id, method: type}` or `{app: id, recipient_domain: domain}` | GA4 | SAFE — domain only, no full email |
| 13 | `prototype_launch` | Launch full prototype experience | `{app: id, name: name}` | GA4 | SAFE — app identifiers only |

**Total implemented: 13**

---

## Events Requiring UI Implementation

These events are specified in the A04 plan but require UI features that do not yet exist on the site. They are documented here for future implementation.

| # | Event Name | Trigger | Parameters | Requires |
|---|-----------|---------|------------|----------|
| 14 | `readiness_assessment_start` | User begins a readiness quiz/assessment | `{assessment_type: type}` | Assessment UI (not built) |
| 15 | `readiness_assessment_complete` | User completes assessment | `{assessment_type: type, score_band: "low/medium/high"}` | Assessment UI (not built) |
| 16 | `resource_download` | Download a resource PDF | `{resource_category: cat, resource_type: type}` | Already tracked via `/api/track-event` on consulting site; not on quantum5d.ai /resources |
| 17 | `article_complete` | Scroll to bottom of blog post | `{slug: post_slug}` | Blog pages are static HTML; scroll tracking needs JS injection in blog build |
| 18 | `internal_search` | Use site search (if added) | `{query_category: "prototype/blog/resource", result_count_band: "0/1-5/5+"}` | Search UI (not built) |
| 19 | `newsletter_subscribe` | Subscribe to newsletter | `{source: page}` | Newsletter form (exists on consulting site, not quantum5d.ai) |
| 20 | `use_case_suggestion_submit` | Submit a use-case suggestion | `{category: suggested_category}` | Suggestion form (not built) |
| 21 | `evidence_contribution_submit` | Submit evidence/feedback | `{type: "feedback/evidence"}` | Contribution form (not built) |
| 22 | `contact_form_submit` | Submit general contact form | `{source: page}` | Contact form fires `executive_briefing_submit` currently |

**Total requiring UI: 9**

---

## GA4 Custom Dimensions Required

The following events use parameters that need GA4 custom dimension configuration to appear in reports:

| Parameter | Events Using It | GA4 Configuration |
|-----------|----------------|-------------------|
| `app` | application_detail_view, prototype_launch, executive_brief_download, priority_recommendation, application_share_* | Custom dimension: "Application ID" (event-scoped) |
| `name` | application_detail_view, prototype_launch | Custom dimension: "Application Name" (event-scoped) |
| `use_case` | outcome_card_click | Custom dimension: "Use Case" (event-scoped) |
| `role` | role_filter | Custom dimension: "Role Filter" (event-scoped) |
| `source` | executive_briefing_submit | Custom dimension: "Form Source" (event-scoped) |
| `resource_category` | resource_download | Custom dimension: "Resource Category" (event-scoped) |
| `type` | email_click, linkedin_outbound_click | Custom dimension: "Click Type" (event-scoped) |

**Total custom dimensions needed: 7**

---

## Safety Validation Checklist

- [x] No email addresses in any event parameter
- [x] No full external URLs in any event parameter (linkedin/email clicks send categorical type only)
- [x] No narratives, quiz answers, or free-text content
- [x] No PHI (no patient identifiers, no clinical data)
- [x] No full IP addresses (GA4 anonymizes by default)
- [x] No unrestricted search terms (search not yet implemented; when added, must use category bands)
- [x] Dev guard prevents events firing on non-production hosts
- [x] `recipient_domain` sends domain only (not full email) in colleague share
