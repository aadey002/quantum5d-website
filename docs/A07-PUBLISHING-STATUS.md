# A07 — Publishing Controls Status

**Date:** 2026-08-20  
**Author:** Claude Code for Dr. Tee

---

## LinkedIn Auto-Poster

| Field | Value |
|-------|-------|
| Status | **ACTIVE — Approved** |
| Workflow | `.github/workflows/linkedin-auto-poster.yml` |
| Schedule | Mon/Wed/Fri at 9am ET (13:00 UTC) |
| Total posts loaded | 12 (Aug 11 – Sep 5) |
| Published | 6 (3 on Aug 18 + 3 on Aug 18-20 scheduled runs) |
| Remaining scheduled | 6 |
| Hashtag fix | Applied Aug 18 — string format now handled |
| First-comment automation | Active — blog URLs posted as first comments |
| Token status | Auto-refreshed weekly (Monday 8am ET) |

**Do not disable.** This pipeline is explicitly approved.

---

## Blog Auto-Publisher

| Field | Value |
|-------|-------|
| Status | **ACTIVE — Approved** |
| Workflow | `.github/workflows/blog-auto-publisher.yml` |
| Schedule | Daily at 9am ET (13:00 UTC) |
| Mechanism | Publishes `scheduled` → `published` when `published_date <= now`, then: checkout → `build-blog.cjs` → commit HTML → push → deploy hook |
| Null-date bug | Fixed Aug 18 — dangerous bulk publish removed |
| Posts in database | 25 published, 6 scheduled |

### Scheduled Posts

| Date | Title |
|------|-------|
| 2026-08-27 | The Pharmacist Shortage Is Not the Problem |
| 2026-08-29 | Capture Rate Is Not a Pharmacy Metric |
| 2026-09-08 | Coverage Monitoring Is Not a Patient Services Function |
| 2026-10-01 | PBM Reform Is Here: What FQHCs Need to Know |
| 2026-11-01 | Five 340B Compliance Mistakes That Will Cost You |
| 2026-12-01 | AI in Pharmacy Operations: What Actually Works and What Is Still Hype |

**Next auto-publish:** August 27. Confirmed: the cron job will flip status to `published`, rebuild static HTML, commit, push, and trigger Vercel deploy automatically.

---

## Newsletters

| Field | Value |
|-------|-------|
| Status | **Not Yet Written** |
| Total planned | 12 |
| Written | 0 |
| Sent | 0 |
| Auto-publish path | **None exists** — no automated newsletter sending infrastructure |
| Sending method | Manual via Resend API when content is written and approved |

**Confirmed:** There is no auto-publish path for newsletters. The `newsletter-send.ts` API route exists but requires manual invocation with content. No cron job or workflow triggers newsletter sends.

---

## Content Pipeline Summary

| Channel | Status | Auto-Publish | Approval |
|---------|--------|-------------|----------|
| LinkedIn posts | Active | Yes (Mon/Wed/Fri) | Pre-approved batch |
| Blog posts | Active | Yes (daily check) | Pre-approved schedule |
| Newsletters | Not started | No auto-publish | Manual only |
| Supadata research | Stopped | Disabled | Requires explicit approval (see A06) |

---

## Verification

- [x] LinkedIn auto-poster confirmed active — not disabled
- [x] 6 posts published, 6 remaining on Mon/Wed/Fri schedule
- [x] Blog auto-publisher cron confirmed active
- [x] Next scheduled post (Aug 27) confirmed in database as `scheduled`
- [x] Build-blog.cjs pipeline confirmed: publish → build → commit → push → deploy
- [x] Newsletters confirmed as "Not Yet Written" — not "Pending Approval"
- [x] No auto-publish path exists for newsletters — confirmed
- [x] Supadata extraction stopped at 9/100 credits — confirmed disabled
