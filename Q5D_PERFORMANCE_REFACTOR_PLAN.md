# Q5D Performance Refactor Plan

**Date:** 2026-07-22
**Status:** Deferred — planning document for future Performance Sprint

---

## Current Baseline

| Metric | Value |
|--------|-------|
| HTML file size | ~833 KB |
| Estimated base64 assets | ~80 KB (logo mark) |
| Inline prototype HTML | ~550 KB (estimated) |
| Core site (hero, nav, sections, JS) | ~200 KB |
| Number of `<script>` blocks | 5 |
| Number of embedded prototypes | 15 |

## Largest Contributors

| Component | Est. Size | Extractable |
|-----------|-----------|-------------|
| CoverageGuard IQ prototype | ~80 KB | Yes |
| HRSA OSV prototype | ~60 KB | Yes |
| Board Intelligence prototype | ~50 KB | Yes (already external HTML) |
| Meeting Intelligence prototype | ~50 KB | Yes (already external HTML) |
| Compliance Command prototype | ~45 KB | Yes |
| LoopProof prototype | ~45 KB | Yes |
| Collaborative Practice Review prototype | ~40 KB | Yes |
| Other prototypes (8) | ~180 KB total | Yes |
| Base64 logo | ~80 KB | Yes → SVG/PNG file |

## Recommended Extraction Order

1. **Board Intelligence** and **Meeting Intelligence** — already have external HTML files, just need iframe loading
2. **CoverageGuard IQ** — largest inline prototype
3. **HRSA OSV** — second largest
4. **Compliance Command** and **LoopProof** — medium size
5. Remaining prototypes in size order

## Proposed File Structure

```
/public/
  quantum5d-site-index.html    (~200 KB after extraction)
  /assets/
    logo-mark.svg
    logo-full.svg
    og-image.jpg
  /prototypes/
    coverageguard-iq.html
    hrsa-readiness.html
    collaborative-practice-review.html
    technician-program-review.html
    sentinel.html
    compliance-command.html
    loopproof.html
    board-governance.html       (existing)
    meeting-intelligence.html   (existing)
    exec-compensation.html
    serviceline-iq.html
    340b-ira.html
    patientfirst-budget.html
    rx-abandonment.html
    trureach.html
```

## Lazy-Loading Approach

Replace inline prototype HTML with on-demand loading:
```javascript
function launchProto(id) {
  var overlay = document.getElementById('protoOverlay');
  var iframe = overlay.querySelector('iframe');
  iframe.src = '/prototypes/' + PROTO_MAP[id];
  overlay.classList.add('open');
}
```

Prototypes load only when launched — zero impact on initial page load.

## Backward Compatibility

- Hash deep links (`#app/coverage`) continue to work
- `openModal()` still shows application details inline
- "Launch full prototype" button loads the external file
- Guided walkthroughs remain in the main file (small text data)

## Testing Requirements

For each extracted prototype:
1. Launch from application card → prototype loads
2. All interactive elements work
3. Close prototype → returns to main page
4. Deep link to prototype works
5. Share URL still functions
6. No console errors

## Target Performance

| Metric | Current | Target |
|--------|---------|--------|
| HTML file size | ~833 KB | <150 KB |
| Initial load (3G) | ~3-4s | <2s |
| Lighthouse Desktop | ~75 | >90 |
| Lighthouse Mobile | ~60 | >80 |
| Largest Contentful Paint | ~2.5s | <1.5s |

## Estimated Effort

- Prototype extraction: 3-4 hours
- Base64 asset extraction: 1 hour
- Testing all 15 prototypes: 2 hours
- Total: ~1 day
