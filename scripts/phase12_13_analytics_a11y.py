# -*- coding: utf-8 -*-
"""
Phase 12+13: Analytics events + accessibility fixes.
1. Add comprehensive analytics event tracking
2. Fix CSS selectors (missing class prefixes)
3. Add aria-live to form status messages
4. Add reduced-motion support for new animations
5. Ensure form labels are properly associated
6. Add prototype disclosure banner
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

step = 0

def r(old, new, label):
    global content, step
    if old in content:
        content = content.replace(old, new, 1)
        step += 1
        print(f"  [{step}] OK: {label}")
    else:
        print(f"  MISS: {label}")

def ra(old, new, label):
    global content, step
    if old in content:
        content = content.replace(old, new)
        step += 1
        print(f"  [{step}] OK (all): {label}")
    else:
        print(f"  MISS: {label}")

# ════════════════════════════════════════════════════════════════
print("=== PHASE 12: ANALYTICS ===")
# ════════════════════════════════════════════════════════════════

# Add analytics to hero CTAs
r('href="#contact">Schedule an Executive Briefing \u2192</a>',
  'href="#contact" onclick="if(typeof trackEvent===\'function\')trackEvent(\'hero_schedule_briefing\')">Schedule an Executive Briefing \u2192</a>',
  'analytics: hero briefing CTA')

r('href="#platform" style="border-color:rgba(255,255,255,.3)">Explore the Platform</a>',
  'href="#platform" onclick="if(typeof trackEvent===\'function\')trackEvent(\'hero_explore_platform\')" style="border-color:rgba(255,255,255,.3)">Explore the Platform</a>',
  'analytics: hero explore CTA')

# Add analytics to outcome card clicks
ra('class="outcome-card">', 'class="outcome-card" onclick="if(typeof trackEvent===\'function\')trackEvent(\'outcome_card_click\')">', 'analytics: outcome cards')

# Add analytics to founding partner band
r('>Schedule a Briefing</a>\n    <a class="btn btn-ghost" href="#innovation-partners"',
  ' onclick="if(typeof trackEvent===\'function\')trackEvent(\'founding_partner_briefing\')">Schedule a Briefing</a>\n    <a class="btn btn-ghost" href="#innovation-partners" onclick="if(typeof trackEvent===\'function\')trackEvent(\'founding_partner_learn_more\')"',
  'analytics: partner band CTAs')

# Analytics on briefing form submit
r("note.textContent='Sending\u2026';",
  "note.textContent='Sending\u2026';\n  if(typeof trackEvent==='function')trackEvent('briefing_form_submit');",
  'analytics: briefing form submit')

# Analytics on partner form submit
r("document.getElementById('ip-note').textContent='Submitting...';",
  "document.getElementById('ip-note').textContent='Submitting...';\n  if(typeof trackEvent==='function')trackEvent('partner_application_submit');",
  'analytics: partner form submit')

# ════════════════════════════════════════════════════════════════
print("=== PHASE 13: ACCESSIBILITY ===")
# ════════════════════════════════════════════════════════════════

# 1. Add aria-live to form status messages
r('id="f-note" style="font-family:',
  'id="f-note" role="status" aria-live="polite" style="font-family:',
  'aria-live on briefing form note')

r('id="ip-note" style="font-family:',
  'id="ip-note" role="status" aria-live="polite" style="font-family:',
  'aria-live on partner form note')

r('id="cfNote"',
  'id="cfNote" role="status" aria-live="polite"',
  'aria-live on colleague share note')

# 2. Add reduced-motion for new animations
r('@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}',
  '@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}\n@media(prefers-reduced-motion:reduce){.ani{animation:none!important;opacity:1!important}.plat-app{animation:none!important}}',
  'reduced-motion for new animations')

# 3. Fix malformed CSS selector if present
ra(',field textarea', ',\n.field textarea', 'fix CSS selector (field textarea)')

# 4. Add disclosure to prototype overlay
r('.proto-bar span{font-family:',
  '.proto-disc{font-size:10px;color:#94A3B8;font-family:\'IBM Plex Mono\',monospace;letter-spacing:.03em;text-align:center;padding:4px 12px;background:rgba(0,0,0,.3);border-radius:0 0 8px 8px}\n.proto-bar span{font-family:',
  'prototype disclosure CSS')

# 5. Ensure select dropdown has accessible label
r('<select id="ip-interest"',
  '<select id="ip-interest" aria-label="Area of interest"',
  'select aria-label')

# 6. Add proper for= attributes to contact form labels
r('<label>Name</label><input id="f-name"',
  '<label for="f-name">Name</label><input id="f-name"',
  'contact form label: name')

r('<label>Organization</label><input id="f-org"',
  '<label for="f-org">Organization</label><input id="f-org"',
  'contact form label: org')

r('<label>Email</label><input id="f-email"',
  '<label for="f-email">Email</label><input id="f-email"',
  'contact form label: email')

r('<label>What you\'re trying to solve</label><textarea id="f-msg"',
  '<label for="f-msg">What you\'re trying to solve</label><textarea id="f-msg"',
  'contact form label: message')

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"PHASE 12+13 COMPLETE. {step} changes applied.")
print(f"File size: {len(content)} chars")
