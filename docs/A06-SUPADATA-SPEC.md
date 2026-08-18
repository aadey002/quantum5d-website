# A06 — Supadata/Composio Research Workflow Specification

**Date:** 2026-08-20  
**Status:** DESIGN ONLY — Disabled by default. Do not activate without explicit approval.  
**Author:** Claude Code for Dr. Tee

---

## Purpose

Specify a governed research workflow for extracting and summarizing public content (YouTube transcripts, podcast episodes, conference presentations) using Supadata and Composio APIs. This specification defines the guardrails, approval gates, and audit requirements for any future activation.

---

## Current State

- **Supadata credits:** 9 of 100 remaining
- **Production extraction:** STOPPED — must not resume until explicitly approved
- **Publishing path:** DISABLED — no automated content publication from extracted sources

---

## Credit Guardrail

| Rule | Value |
|------|-------|
| Current balance | 9 / 100 credits |
| Hard stop threshold | 9 credits — no extraction below this balance |
| Resume condition | Explicit written approval from Dr. T with new credit allocation |
| Per-extraction cost | 1 credit per transcript/episode |
| Maximum batch size | 5 extractions per session |
| Cool-down period | 24 hours between batches |

**Enforcement:** Any extraction function must check credit balance before executing. If balance <= 9, return an error and log the attempt without consuming credits.

---

## Audit Log Requirements

Every extraction attempt (successful or not) must log:

| Field | Description |
|-------|-------------|
| `timestamp` | ISO 8601 timestamp |
| `source_url` | URL of the content source |
| `source_type` | youtube_transcript, podcast, conference, article |
| `credits_before` | Credit balance before extraction |
| `credits_after` | Credit balance after extraction |
| `status` | success, failed, blocked_by_guardrail, blocked_by_approval |
| `operator` | Who initiated the extraction |
| `approval_reference` | Reference to approval (if any) |

Storage: Supabase table `research_extraction_log` (not yet created — create only when workflow is activated).

---

## Retry Ceiling

| Parameter | Value |
|-----------|-------|
| Max retries per source | 2 |
| Retry delay | 30 seconds |
| Permanent failure after | 2 failed attempts — mark as `permanently_failed` |
| No retry on | 402 (payment required), 403 (forbidden), 404 (not found) |

---

## Source Attribution Requirements

Every piece of content derived from an extracted source must include:

1. **Source citation:** Full title, author/speaker, original URL, publication date
2. **Attribution line:** "Summarized from [Source Title] by [Author]. Original available at [URL]."
3. **No full transcript republication** — summaries only, limited to 10% of original word count
4. **Fair use boundary:** Educational commentary and analysis only, not reproduction

---

## Copyright-Safe Summary Rules

| Rule | Requirement |
|------|-------------|
| Maximum quotation | 50 words per direct quote, with citation |
| Summary length | Max 10% of original word count |
| Transformative use | Must add original analysis, not just condense |
| No reproduction | Never publish full or near-full transcripts |
| Derivative works | Clearly labeled as "Summary and analysis by Quantum 5D Consulting" |

---

## Data Safety Rules

- **No PHI:** Never extract content containing patient health information
- **No employer data:** Never extract content containing confidential employer information (Total Health Care, THC, or any client references)
- **No private conversations:** Only extract publicly available content (published YouTube, public podcast feeds, public conference recordings)
- **PII scrubbing:** Remove any personal identifiers from summaries before storage

---

## Human Approval Gate

**No content derived from extracted sources may be published without:**

1. Human review of the summary by Dr. T or designated reviewer
2. Explicit approval recorded in the audit log
3. Source attribution verified as present and accurate
4. Copyright compliance verified (summary length, quotation limits)

**The publishing path is disabled by default.** To activate:
1. Dr. T must explicitly approve in writing
2. Credit balance must be above the hard stop threshold
3. A test extraction must be reviewed and approved before batch processing

---

## Scaffolding Architecture (Not Yet Built)

```
research-extraction/
  config.ts          — credit thresholds, retry limits, approval requirements
  extractor.ts       — Supadata API wrapper with credit check
  summarizer.ts      — Claude API for copyright-safe summarization
  audit-logger.ts    — Logs all attempts to research_extraction_log
  approval-gate.ts   — Checks approval status before any publication
  index.ts           — Orchestrator (disabled by default)
```

**Critical:** `index.ts` must have a `ENABLED = false` constant at the top. The orchestrator refuses to run unless this is explicitly set to `true` AND the credit balance is above threshold AND an approval reference is provided.

---

## Verification

- [x] Credit guardrail defined (hard stop at 9)
- [x] Audit log schema specified
- [x] Retry ceiling defined (max 2)
- [x] Source attribution requirements documented
- [x] Copyright-safe summary rules defined
- [x] No PHI / employer data rules
- [x] Human approval gate required before publication
- [x] Publishing path confirmed disabled by default
- [x] Scaffolding cannot reactivate disabled publishing path without explicit `ENABLED = true` + credit check + approval reference
