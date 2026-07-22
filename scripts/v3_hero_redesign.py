# -*- coding: utf-8 -*-
"""
v3 Hero Redesign — Integrate the light-theme editorial hero
from the design study into the production site.

Changes:
1. Add Newsreader font import
2. Add new CSS variables and hero/nav styles
3. Replace hero HTML with two-column editorial layout
4. Replace platform viz with clean card-based architecture diagram
5. Update nav styling to light theme
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

# ════════════════════════════════════════════════════════════════
print("=== 1. ADD NEWSREADER FONT ===")
# ════════════════════════════════════════════════════════════════

# Add Newsreader to the existing font imports
r('<meta charset="UTF-8">',
  '<meta charset="UTF-8">\n<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap" rel="stylesheet">',
  'Newsreader font import')

# ════════════════════════════════════════════════════════════════
print("=== 2. ADD NEW CSS ===")
# ════════════════════════════════════════════════════════════════

new_css = """
/* v3 Hero Redesign — Light editorial theme */
:root{
  --paper:#FCFBFE;
  --line-soft:#F0EEF7;
  --purple-pale:#EEEDFB;
}

/* Nav — light glassmorphic */
.nav{background:rgba(252,251,254,.88)!important;backdrop-filter:blur(12px);border-bottom:1px solid var(--line)!important}
.nav-in{height:72px}
.brand .wm{font-family:'Newsreader',Georgia,serif!important;font-weight:600;font-size:21px!important;letter-spacing:-.01em}
.brand .wm small{font-family:'IBM Plex Mono',monospace!important;font-size:8.5px!important;letter-spacing:.22em;color:var(--muted)!important;margin-top:4px;font-weight:400}
.nav-links a{color:var(--muted)!important;font-size:14px!important;font-weight:500;border-bottom:1.5px solid transparent;transition:.15s}
.nav-links a:hover{color:var(--ink)!important;border-bottom-color:var(--purple)!important}
.nav-links .btn{background:var(--purple)!important;color:#fff!important;font-size:13.5px!important;font-weight:600;padding:10px 18px!important;border-radius:8px!important;border:none!important}
.nav-links .btn:hover{background:var(--purple-deep)!important}
.nav-toggle span{background:var(--ink)!important}

/* Hero — light editorial */
.hero{background:var(--paper)!important;padding:88px 0 96px!important}
.hero-grid{gap:72px!important}
.hero-left .eyebrow{
  font-family:'IBM Plex Mono',monospace;font-size:11px;font-weight:500;
  letter-spacing:.17em;text-transform:uppercase;color:var(--purple)!important;
  display:flex;align-items:center;gap:11px;margin-bottom:26px;
}
.hero-left .eyebrow::before{content:"";width:26px;height:1.5px;background:var(--purple);flex-shrink:0}
.hero h1{
  font-family:'Newsreader',Georgia,serif!important;font-weight:600!important;
  font-size:clamp(38px,4.4vw,55px)!important;line-height:1.06!important;letter-spacing:-.018em;
  color:var(--ink)!important;margin-bottom:24px;max-width:15ch;
}
.hero h1 em{font-style:normal!important;color:var(--ink)!important}
.hero .lead{font-size:17.5px!important;line-height:1.62!important;color:var(--muted)!important;max-width:46ch;margin-bottom:36px!important}
.hero .lead strong{color:var(--ink);font-weight:500}
.hero-cta .btn-primary{background:var(--purple)!important;color:#fff!important;border-radius:9px!important;padding:14px 24px!important;border:1.5px solid transparent!important}
.hero-cta .btn-primary:hover{background:var(--purple-deep)!important;transform:translateY(-1px)}
.hero-cta .btn-ghost{background:transparent!important;color:var(--ink)!important;border-color:var(--line)!important;border-radius:9px!important;padding:14px 24px!important}
.hero-cta .btn-ghost:hover{border-color:var(--purple)!important;color:var(--purple)!important}
.hero .owned{border-top:none!important;margin-top:0!important}
.hero-pills{display:none!important}

/* v3 Platform viz — clean card */
.plat-viz{
  background:var(--card)!important;
  border:1px solid var(--line)!important;
  border-radius:14px!important;
  padding:30px 28px 26px!important;
  box-shadow:none!important;
}
.plat-viz::before{display:none!important}
.plat-viz::after{display:none!important}
.plat-viz-title{
  color:var(--muted)!important;
  display:flex;align-items:center;justify-content:space-between;
  padding-bottom:14px!important;margin-bottom:22px!important;
  border-bottom:1px solid var(--line-soft);
}
.plat-viz-title::after{content:'v1';font-size:10px;letter-spacing:.16em;color:var(--muted)}

/* v3 layers */
.plat-layer{margin-bottom:0!important}
.plat-layer-bar{
  background:var(--purple-pale)!important;
  border:1px solid #DAD6F2!important;
  border-radius:9px!important;
  padding:15px 18px!important;
  font-size:15px!important;
  font-weight:600!important;
  color:var(--purple-deep)!important;
  text-align:left!important;
}
.plat-layer-bar:hover{transform:none!important;filter:none!important;box-shadow:none!important}
.plat-layer-bar svg{stroke:var(--purple-deep)}

/* v3 app cards */
.plat-apps{gap:8px!important;margin:0!important}
.plat-app{
  background:var(--card)!important;
  border:1px solid var(--line)!important;
  border-radius:8px!important;
  padding:13px 11px!important;
  font-size:12.5px!important;
  font-weight:500!important;
  color:var(--ink)!important;
  animation:none!important;
}
.plat-app:hover{
  border-color:var(--purple)!important;
  color:var(--purple)!important;
  background:var(--card)!important;
  transform:none!important;
  box-shadow:none!important;
}
.plat-app::before{display:none!important}

/* v3 engine bar */
.plat-conn{padding:0!important}
.plat-conn::before{display:none!important}
.plat-conn svg{display:none!important}

/* v3 vertical rules between layers */
.v3-rule{height:18px;display:flex;justify-content:center;align-items:center}
.v3-rule::after{content:"";width:1px;height:100%;background:var(--line)}

/* v3 layer labels */
.v3-layer-tag{
  font-family:'IBM Plex Mono',monospace;font-size:9.5px;letter-spacing:.16em;
  text-transform:uppercase;color:var(--muted);margin-bottom:9px;margin-top:0;
}

/* v3 engine row */
.v3-engine{
  border:1px solid var(--line);border-radius:9px;padding:14px 18px;background:var(--card);
  display:flex;align-items:center;justify-content:center;gap:14px;flex-wrap:wrap;
  font-size:13px;font-weight:500;color:var(--ink);
}
.v3-engine span{display:flex;align-items:center;gap:7px}
.v3-engine i{width:4px;height:4px;border-radius:50%;background:var(--purple);flex-shrink:0}

/* v3 substrate */
.v3-substrate{
  display:flex;align-items:center;justify-content:center;gap:0;flex-wrap:wrap;
  font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--muted);
  padding:13px 14px;border:1px dashed var(--line);border-radius:9px;
}
.v3-substrate em{font-style:normal;padding:0 11px}
.v3-substrate .dot{color:var(--line)}

/* v3 substantiate line */
.v3-substantiate{
  font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--muted);
  letter-spacing:.02em;padding-top:22px;border-top:1px solid var(--line);margin-top:26px;
}
.v3-substantiate b{color:var(--ink);font-weight:500}

/* Trust strip — light version */
div[style*="Built by an FQHC executive"]{background:var(--paper)!important;border-bottom:1px solid var(--line)!important}

@media(max-width:760px){
  .hero{padding:60px 0 70px!important}
}
"""

# Insert before the closing </style> of the main stylesheet
# Find first </style>
style_end = content.index('</style>')
content = content[:style_end] + new_css + '\n' + content[style_end:]
step += 1
print(f"  [{step}] OK: v3 CSS added")

# ════════════════════════════════════════════════════════════════
print("=== 3. REPLACE HERO HTML ===")
# ════════════════════════════════════════════════════════════════

# Find current hero boundaries
hero_start = content.index('<!-- HERO -->')
hero_end = content.index('</header>') + len('</header>')
old_hero = content[hero_start:hero_end]

new_hero = '''<!-- HERO -->
<header class="hero" id="top">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-left">
        <p class="eyebrow ani">Purpose-built for FQHCs</p>
        <h1 class="ani ani-d1">The AI operating system for federally qualified health centers.</h1>
        <p class="lead ani ani-d2">One platform connecting coverage, compliance, pharmacy, governance, and finance \u2014 <strong>built by an FQHC executive</strong>, not adapted from a hospital product.</p>
        <div class="hero-cta ani ani-d3">
          <a class="btn btn-primary" href="#contact" onclick="if(typeof trackEvent==='function')trackEvent('hero_schedule_briefing')">Schedule an Executive Briefing \u2192</a>
          <a class="btn btn-ghost" href="#platform">Explore the Platform</a>
        </div>
        <p class="v3-substantiate ani ani-d4"><b>15 applications</b> across 5 operating domains \xb7 340B, Medicaid &amp; HRSA readiness \xb7 nationwide</p>
      </div>
      <div class="hero-right ani ani-d2">
        <div class="plat-viz">
          <div class="plat-viz-title">Platform architecture</div>

          <p class="v3-layer-tag">Decision layer</p>
          <div class="plat-layer">
            <div class="plat-layer-bar">
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden="true" style="vertical-align:-2px;margin-right:6px">
                <path d="M2 13V7M6 13V3M10 13V9M14 13V5" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
              </svg>Executive intelligence
            </div>
          </div>

          <div class="v3-rule"></div>

          <p class="v3-layer-tag">Applications</p>
          <div class="plat-apps">
            <div class="plat-app">CoverageGuard IQ</div>
            <div class="plat-app">Governance IQ</div>
            <div class="plat-app">Meeting IQ</div>
            <div class="plat-app">Compliance</div>
            <div class="plat-app">Pharmacy Ops</div>
            <div class="plat-app">Revenue Intel</div>
          </div>

          <div class="v3-rule"></div>

          <p class="v3-layer-tag">Reasoning</p>
          <div class="v3-engine">
            <span><i></i>Knowledge engine</span>
            <span><i></i>AI agents</span>
            <span><i></i>Policy engine</span>
          </div>

          <div class="v3-rule"></div>

          <p class="v3-layer-tag">Systems of record</p>
          <div class="v3-substrate">
            <em>EHR</em><span class="dot">/</span><em>Pharmacy</em><span class="dot">/</span><em>Finance</em><span class="dot">/</span><em>HR</em><span class="dot">/</span><em>Quality</em>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>'''

content = content.replace(old_hero, new_hero)
step += 1
print(f"  [{step}] OK: hero HTML replaced")

# ════════════════════════════════════════════════════════════════
print("=== 4. UPDATE TRUST STRIP FOR LIGHT THEME ===")
# ════════════════════════════════════════════════════════════════

# Update trust strip colors for light background
old_trust_bg = 'style="background:var(--navy);border-bottom:1px solid rgba(255,255,255,.08);padding:16px 0"'
new_trust_bg = 'style="background:var(--paper);border-bottom:1px solid var(--line);padding:16px 0"'
r(old_trust_bg, new_trust_bg, 'trust strip bg -> light')

old_trust_text = 'font-size:11px;letter-spacing:.04em;color:#94A3B8'
new_trust_text = 'font-size:11px;letter-spacing:.04em;color:var(--muted)'
r(old_trust_text, new_trust_text, 'trust strip text color')

# Update trust strip SVG colors
import re
# Change stroke="#A78BFA" to stroke="var(--purple)" in trust strip SVGs
# These are the 4 SVGs in the trust strip
trust_section_start = content.index('Built by an FQHC executive</span>')
trust_section_end = content.index('<!-- EXECUTIVE OUTCOMES -->')
trust_section = content[trust_section_start:trust_section_end]
trust_section_new = trust_section.replace('stroke="#A78BFA"', 'stroke="var(--purple)"')
content = content[:trust_section_start] + trust_section_new + content[trust_section_end:]
step += 1
print(f"  [{step}] OK: trust strip SVG colors")

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"v3 HERO REDESIGN COMPLETE. {step} changes applied.")
print(f"File size: {len(content)} chars")
