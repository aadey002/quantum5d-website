# -*- coding: utf-8 -*-
"""
Phase 4+6: Homepage simplification + conversion hierarchy.
1. Change primary CTA to "Schedule an Executive Platform Briefing"
2. Move founding partner band up (already near top after outcomes)
3. Change nav CTA to "Schedule a Briefing"
4. Simplify hero supporting text
5. Add founder trust line in hero
6. Change briefing form button text
7. Add "Already discussed? Apply for partner program" link at bottom
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
print("=== NAV CTA ===")
# ════════════════════════════════════════════════════════════════

r('<a class="btn btn-primary" href="#innovation-partners">Partner with us</a>',
  '<a class="btn btn-primary" href="#contact">Schedule a Briefing</a>',
  'nav CTA -> Schedule a Briefing')

# ════════════════════════════════════════════════════════════════
print("=== HERO CTAs ===")
# ════════════════════════════════════════════════════════════════

r('<a class="btn btn-primary" href="#platform">Explore the Platform \u2192</a>',
  '<a class="btn btn-primary" href="#contact">Schedule an Executive Briefing \u2192</a>',
  'hero primary CTA -> Schedule Briefing')

r('<a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3)">Become a Founding Innovation Partner</a>',
  '<a class="btn btn-ghost" href="#platform" style="border-color:rgba(255,255,255,.3)">Explore the Platform</a>',
  'hero secondary CTA -> Explore Platform')

# Add trust line after hero pills
r('</div>\n      </div>\n      <div class="hero-right',
  '</div>\n        <p style="margin-top:18px;font-size:13px;color:#94A3B8;max-width:48ch">Built by an FQHC executive from direct experience inside the workflows the platform is designed to improve.</p>\n      </div>\n      <div class="hero-right',
  'hero trust line')

# ════════════════════════════════════════════════════════════════
print("=== FOUNDING PARTNER EARLY BAND ===")
# ════════════════════════════════════════════════════════════════

# The current flow is: Hero -> Trust Strip -> Outcomes -> Platform -> Why Q5D -> Priority Recs -> CoverageGuard -> Apps -> Services -> Roadmap -> Innovation Partners -> About -> Contact
# Move a founding partner teaser right after outcomes (second screen)

partner_band = '''
<!-- FOUNDING PARTNER TEASER -->
<div style="background:linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%);padding:40px 0;border-bottom:1px solid rgba(139,92,246,.15)"><div class="wrap" style="text-align:center">
  <h2 style="color:#fff;font-size:24px;font-weight:600;margin:0 0 10px;font-family:'Cormorant Garamond',serif">Help shape the first AI operating platform built specifically for FQHCs.</h2>
  <p style="color:#CFCAE6;font-size:15px;max-width:60ch;margin:0 auto 20px;line-height:1.6">Quantum5D.ai is inviting a limited group of founding innovation partners to evaluate priority workflows, influence product development, and explore controlled pilot opportunities.</p>
  <div style="display:flex;gap:10px;justify-content:center;flex-wrap:wrap;margin-bottom:16px">
    <span class="hero-pill">Seeking 3\u20135 founding partners</span>
    <span class="hero-pill">Transparent product maturity</span>
    <span class="hero-pill">Human-reviewed workflows</span>
    <span class="hero-pill">Real FQHC operating challenges</span>
  </div>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <a class="btn btn-primary" href="#contact">Schedule a Briefing</a>
    <a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3);color:#fff">Learn About the Partner Program</a>
  </div>
</div></div>

'''

# Insert after outcomes section, before platform
r('<!-- PLATFORM -->\n<section class="sec" id="platform"',
  partner_band + '<!-- PLATFORM -->\n<section class="sec" id="platform"',
  'founding partner teaser band')

# ════════════════════════════════════════════════════════════════
print("=== BRIEFING FORM ===")
# ════════════════════════════════════════════════════════════════

# Update the submit button text
r('>Send inquiry \u2192</button>',
  '>Schedule a Briefing \u2192</button>',
  'briefing form button text')

# Add secondary partner link after the briefing form
r('<div id="f-note" style="font-family:\'IBM Plex Mono\',monospace;font-size:11.5px;color:var(--purple-soft);text-align:center;margin-top:10px"></div>',
  '<div id="f-note" style="font-family:\'IBM Plex Mono\',monospace;font-size:11.5px;color:var(--purple-soft);text-align:center;margin-top:10px"></div>\n      <p style="text-align:center;margin-top:16px;font-size:13px;color:#CFCAE6"><a href="#innovation-partners" style="color:var(--purple-soft)">Already discussed a partnership? Complete the Innovation Partner application \u2192</a></p>',
  'partner link below briefing form')

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"PHASE 4+6 COMPLETE. {step} changes applied.")
print(f"File size: {len(content)} chars")
