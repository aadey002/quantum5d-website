# Q5D Website — SEO & Subscriber Growth Implementation Brief
**For Claude Code**
**Repo:** quantum5dconsulting.com (Vercel + React SPA + Supabase)
**Goal:** Enable the site to support 100 new email subscribers/month
**Date:** May 22, 2026

---

## Context

The site was just audited and all hygiene issues resolved (robots.txt, sitemap, MiniMax cleanup, Supabase keys, GA4, 404 route, etc.). However, a follow-up SEO review found three structural blockers that must be addressed before content marketing can work:

1. **Site is a client-side React SPA.** Crawlers (Google, LinkedIn, X, Slack) fetching any URL get back only meta tags and an empty `<div id="root">`. Content is injected by JS post-load. This is the single biggest ranking blocker.
2. **No blog / insights section exists.** There's nothing to rank, share, or convert against.
3. **No lead magnets or email capture beyond the contact form.** Subscriber funnel doesn't exist.

This brief covers the technical work needed. Content production (blog posts, lead magnets) happens separately.

---

## Priority 1 — SPA Rendering Fix (CRITICAL, ship first)

**Decision: Option B — Vercel prerendering / Prerender.io**

Rationale: ship in days not weeks, validate content engine before committing to a full Next.js migration. Re-evaluate at 60 days post-launch.

### Implementation

- Install Prerender.io middleware (or enable Vercel's built-in prerendering if equivalent)
- Configure to detect bot user-agents (Googlebot, Bingbot, LinkedInBot, Twitterbot, Slackbot, Facebot, etc.) and serve static HTML snapshots
- Set snapshot cache TTL to 24 hours for marketing pages, 1 hour for `/insights/*` so new posts are picked up quickly
- Add cache-purge webhook from the content publish flow so newly published blog posts get re-snapshotted immediately, not after TTL expires
- Verify with `curl -A "Googlebot" https://quantum5dconsulting.com/` that bots receive fully rendered HTML

### Build everything else as if Next.js (Option A) is coming

This is the important part. Option B is interim. To avoid throwaway work, build all other priorities in a Next.js-portable way:

- **Metadata:** use `react-helmet-async` with a `<PageMeta>` component that takes the same props shape as Next.js `generateMetadata()` would return. When we migrate, it's a mechanical swap.
- **Blog content:** store as MDX files in `/content/insights/*.mdx` with frontmatter. Works in current React stack via `@mdx-js/react`; ports directly to Next.js App Router with no content changes.
- **Schema:** single `<Schema type="..." data={...} />` component that renders a `<script type="application/ld+json">` tag. Portable as-is.
- **API routes:** build `/api/subscribe` and `/api/magnet-download` as Vercel serverless functions in `/api/`. These work identically in current stack and Next.js — zero migration work.
- **Routing:** keep route structure exactly as specified in Priority 4. The URL paths port 1:1 to Next.js App Router (each path becomes a `page.tsx`).
- **Images:** wrap any `<img>` in a lightweight `<Image>` component now. When we migrate, swap the implementation to `next/image` — props stay the same.

### 60-day re-evaluation trigger

Schedule a checkpoint at Day 60 post-launch. Migrate to Option A (full Next.js) if **any** of these are true:
- 8+ blog posts have been published on schedule (content engine is real)
- Lighthouse mobile performance score is below 85 on `/insights/*` routes (React bundle is hurting humans)
- Per-post dynamic OG image generation is needed for LinkedIn sharing
- Prerender cache-staleness or bot-detection edge cases are causing measurable indexing issues

If none of these are true at Day 60, stay on Option B for another 60 days.

### Acceptance criteria for Priority 1

- `curl -A "Googlebot/2.1 (+http://www.google.com/bot.html)" https://quantum5dconsulting.com/` returns fully rendered HTML with all body content
- `curl -A "LinkedInBot" https://quantum5dconsulting.com/services/340b-consulting/` returns the page's specific OG tags (not the homepage defaults)
- Normal user-agent requests continue to receive the React SPA (no change for humans)
- New blog posts appear in bot-rendered HTML within 5 minutes of publish (via cache-purge webhook)

---

## Priority 2 — Per-Page Metadata

After Priority 1, every page needs:

```html
<title>{Primary keyword} | Quantum 5D Consulting</title>
<meta name="description" content="{Under 155 chars, includes benefit + soft CTA}">
<meta property="og:title" content="{Page-specific}">
<meta property="og:description" content="{Page-specific, ~150 chars}">
<meta property="og:image" content="{Page-specific 1200×630 image}">
<meta property="og:url" content="{Canonical URL}">
<meta property="og:type" content="{website | article}">
<link rel="canonical" href="{Canonical URL}">
```

Set canonical to apex domain (`https://quantum5dconsulting.com/...`) and ensure `www` 301-redirects to apex (or vice versa — pick one).

**Implementation:** use `react-helmet-async` with a `<PageMeta>` component that takes the same props shape as Next.js `generateMetadata()` would return.

**Per-page OG image generation:** Static OG images per page for now (manually created in /public/og/). When migrating to Next.js, switch to `next/og` (`ImageResponse`) for dynamic OG images per blog post. Template: dark navy background, white headline (post title), Q5D logo bottom-right, Dr. T headshot left.

---

## Priority 3 — JSON-LD Schema

Inject structured data on every page. Use a `<Schema>` component that takes a `type` prop.

### Homepage — Organization schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Quantum 5D Consulting",
  "alternateName": "Q5D",
  "url": "https://quantum5dconsulting.com",
  "logo": "https://quantum5dconsulting.com/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Adetoro Oriaifo",
    "honorificPrefix": "Dr."
  },
  "description": "Minority, Pharmacist & Woman-Owned Business specializing in 340B program optimization, regulatory compliance, and pharmacy management nationwide.",
  "sameAs": [
    "https://www.linkedin.com/company/quantum-5d-consulting"
  ]
}
```

### Service pages — ProfessionalService schema

```json
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "340B Consulting Services",
  "provider": { "@type": "Organization", "name": "Quantum 5D Consulting" },
  "serviceType": "340B program optimization and compliance consulting",
  "areaServed": [
    { "@type": "Country", "name": "United States" },
    { "@type": "Country", "name": "United Arab Emirates" }
  ],
  "priceRange": "$$$"
}
```

### About page — Person schema

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Adetoro Oriaifo",
  "honorificPrefix": "Dr.",
  "jobTitle": "Founder & CEO",
  "worksFor": { "@type": "Organization", "name": "Quantum 5D Consulting" },
  "knowsAbout": [
    "340B Drug Pricing Program",
    "FQHC Pharmacy Operations",
    "Pharmacy Compliance",
    "Healthcare AI",
    "Pharmacy Executive Leadership"
  ],
  "sameAs": ["https://www.linkedin.com/in/{handle}"]
}
```

### Blog posts — Article schema

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{Post title}",
  "image": "{OG image URL}",
  "datePublished": "{ISO 8601}",
  "dateModified": "{ISO 8601}",
  "author": { "@type": "Person", "name": "Dr. Adetoro Oriaifo" },
  "publisher": {
    "@type": "Organization",
    "name": "Quantum 5D Consulting",
    "logo": { "@type": "ImageObject", "url": "https://quantum5dconsulting.com/logo.png" }
  }
}
```

### Posts with FAQ sections — FAQPage schema

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{Question}",
      "acceptedAnswer": { "@type": "Answer", "text": "{Answer}" }
    }
  ]
}
```

---

## Priority 4 — Site Architecture

Build the following routes (URLs are exact):

```
/                                          (existing homepage)
/about/                                    (existing)
/contact/                                  (existing)
/services/                                 NEW — services overview
/services/340b-consulting/                 NEW — pillar page
/services/fqhc-pharmacy-consulting/        NEW — pillar page
/services/pharmacy-operations/             NEW — pillar page
/services/healthcare-ai-advisory/          NEW — pillar page
/services/interim-fractional-leadership/   NEW — pillar page
/insights/                                 NEW — blog index
/insights/[slug]/                          NEW — blog post template
/resources/                                NEW — gated lead magnets index
/resources/[slug]/                         NEW — lead magnet landing pages
/case-studies/                             NEW (optional, gated)
```

**Blog/content storage:** MDX files in `/content/insights/*.mdx` with frontmatter (title, slug, date, author, description, ogImage, keywords[], category). Works in current React stack via `@mdx-js/react`; ports directly to Next.js App Router when we migrate.

**URL conventions:**
- All trailing slashes
- Slugs lowercase, hyphen-separated, no stop words
- Categories accessible via `/insights/category/[slug]/`

---

## Priority 5 — Email Capture Infrastructure

### Email service
**Recommendation:** Beehiiv (free up to 2,500 subscribers, native newsletter publishing, API for embeds). Alternative: ConvertKit.

### Integration approach
Beehiiv API → custom forms posting to `/api/subscribe` (Vercel serverless function) → forwards to Beehiiv with source attribution.

```
POST /api/subscribe
Body: { email, source, magnetId?, tags? }
→ Beehiiv API: add subscriber with source tag and UTM data
→ Supabase: log signup event for analytics
→ Trigger welcome email sequence
→ If magnetId present: deliver PDF link via email
```

### Conversion surfaces to build

1. **Footer newsletter signup** — on every page, single-field email, CTA: *"Monthly 340B + FQHC intelligence brief from Dr. T. ~5 min. No fluff."*
2. **Inline content upgrades** — embedded mid-post, contextual to topic. Build a `<ContentUpgrade>` MDX component that takes `magnetId` and `headline` props.
3. **Exit-intent modal** — service pages only. Use a lightweight library (e.g. `react-exit-intent`) or implement with `mouseleave` on viewport top. Suppress on mobile.
4. **Sticky footer bar** — `/insights/*` only. Dismissible. Stores dismissal in localStorage for 30 days.
5. **Resource library page** — `/resources/` index. One email gate per asset, not site-wide.

### Welcome sequence (5 emails)
Built in Beehiiv automations, not in code. Code's job: ensure each signup is tagged with `source` and `magnetId` so the right automation triggers.

---

## Priority 6 — Lead Magnet Delivery

Each lead magnet is a PDF stored in Supabase Storage. Flow:

```
User submits email on /resources/340b-checklist/
→ POST /api/subscribe with { email, source: 'resource', magnetId: '340b-checklist' }
→ API returns: { success: true, downloadUrl: '<signed_supabase_url>' }
→ Frontend: show "Check your email + here's your direct link" with downloadUrl
→ Beehiiv welcome automation #1 emails the PDF link
```

Signed URLs expire after 7 days. Re-request flow: user can re-enter email to get a new link (idempotent, no duplicate subscription).

**Initial 4 magnets to support:**
1. `340b-2026-compliance-checklist` (PDF)
2. `fqhc-financial-sustainability-diagnostic` (PDF, interactive version v2)
3. `remote-pharmacist-career-compass` (PDF)
4. `pharmacy-ai-adoption-scorecard` (PDF + XLSX)

PDFs will be supplied separately; build the routing/delivery infrastructure first.

---

## Priority 7 — Analytics & Tracking

GA4 (`G-1KGZ0633K4`) is already installed. Add:

1. **Event tracking** on every conversion surface:
   - `newsletter_signup_footer`
   - `newsletter_signup_inline`
   - `newsletter_signup_exit_intent`
   - `newsletter_signup_sticky`
   - `magnet_download_<magnetId>`

2. **Search Console verification** — add the verification meta tag to `<head>` once provided.

3. **Bing Webmaster Tools** — add verification meta tag once provided.

4. **Source attribution** — preserve `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` from URL params, store in session, pass through to `/api/subscribe`.

---

## Priority 8 — Performance

Run Lighthouse on all routes after Priority 1. Targets:
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Lighthouse SEO score 100

Likely fixes needed:
- Convert hero image to WebP, preload it
- Defer third-party scripts (anything not GA4)
- Wrap `<img>` tags in a lightweight `<Image>` component now (swap to `next/image` on migration)
- Font loaded with `display: swap`
- No layout shift on header/nav load

---

## Priority 9 — Domain & Redirects

- **Decide canonical:** apex (`quantum5dconsulting.com`) vs `www` — pick apex
- **Vercel config:** set 301 redirect `www.quantum5dconsulting.com/*` → `quantum5dconsulting.com/*`
- **Old Weebly URLs:** if any historical URLs from the old `weebly.com` subdomain or `/blog` paths still appear in Search Console, set up 301 redirects to nearest equivalent new page
- **`/privacy` and `/terms`:** currently redirect to `/contact` per the audit. Build actual privacy and terms pages — they're required for many B2B procurement processes and for GDPR-style compliance. Stub pages with real content are better than redirects.

---

## Build Order (suggested sprints)

### Sprint 1 (Week 1) — Foundation
- [ ] Install Prerender.io / Vercel prerendering (Priority 1, Option B)
- [ ] Ship per-page metadata via `<PageMeta>` component (Priority 2)
- [ ] Add Organization + Person schema (Priority 3)
- [ ] Set up Beehiiv account, get API key, store in Vercel env
- [ ] Build `/api/subscribe` route handler

### Sprint 2 (Week 2) — Content Infrastructure
- [ ] Build `/insights/` index and `/insights/[slug]/` template (MDX)
- [ ] Build `/services/` overview and first pillar page (`/services/340b-consulting/`)
- [ ] Add Article + FAQPage schema components
- [ ] Build footer newsletter signup
- [ ] Build `<ContentUpgrade>` MDX component

### Sprint 3 (Week 3) — Conversion Infrastructure
- [ ] Build `/resources/` index and magnet delivery flow
- [ ] Upload first lead magnet PDF to Supabase Storage
- [ ] Build exit-intent modal (service pages only)
- [ ] Build sticky footer bar (insights pages only)
- [ ] Wire GA4 events on all conversion surfaces

### Sprint 4 (Week 4) — Polish
- [ ] Build remaining service pillar pages
- [ ] Build `/about/` rewrite with Person schema
- [ ] Lighthouse pass on all routes
- [ ] Submit sitemap to Search Console + Bing
- [ ] Real `/privacy` and `/terms` pages

### Day 60 Checkpoint
- [ ] Review the Option A migration triggers from Priority 1
- [ ] If any trigger is hit, plan Next.js migration sprint
- [ ] If none hit, continue on Option B for another 60 days

---

## Env vars to add

```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
PRERENDER_TOKEN=                       (if using Prerender.io)
NEXT_PUBLIC_GA4_ID=G-1KGZ0633K4
SUPABASE_URL=https://kolxfjisvizwayyrlzyx.supabase.co
SUPABASE_ANON_KEY=...                  (existing)
SUPABASE_SERVICE_ROLE_KEY=...          (for signed URL generation)
```

---

## Acceptance criteria

After all priorities complete:

1. `curl -A "Googlebot" https://quantum5dconsulting.com/services/340b-consulting/` returns full HTML body with content (not empty `<div id="root">`)
2. Each route returns unique `<title>`, `<meta description>`, and OG tags when fetched by bots
3. JSON-LD validates at https://validator.schema.org/
4. Sitemap.xml includes all new routes
5. Lighthouse mobile SEO score = 100 on all routes
6. Subscribing via any of the 5 conversion surfaces:
   - Creates a Beehiiv subscriber with correct `source` tag
   - Triggers welcome email within 2 minutes
   - Logs event in GA4 with source attribution
7. Downloading a lead magnet via `/resources/[slug]/`:
   - Returns a working signed Supabase URL within 5 seconds
   - Tags subscriber with `magnetId`
   - Logs `magnet_download_<magnetId>` event in GA4

---

## Out of scope for this brief

- Blog post content production (handled separately by Dr. T / content team)
- Lead magnet PDF content (handled separately)
- Email automation copy in Beehiiv (handled in Beehiiv UI)
- LinkedIn / podcast / paid ads strategy (handled separately)

---

## Questions for Dr. T before starting

1. Confirm Beehiiv as email platform (vs. ConvertKit, MailerLite)
2. LinkedIn profile URL for Person schema
3. Logo file in PNG format at 512×512 minimum (for schema and OG images)
4. Headshot for Dr. T (for OG image template, ~800×800 minimum)
