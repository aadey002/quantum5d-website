# -*- coding: utf-8 -*-
"""Replace the hero section with the two-column enterprise layout."""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find exact boundaries
start_marker = '<!-- HERO -->\n<header class="hero" id="top">'
end_marker = '</header>\n\n\n<!-- EXECUTIVE OUTCOMES -->'

start_idx = content.index(start_marker)
end_idx = content.index(end_marker) + len('</header>')

old_hero = content[start_idx:end_idx]

new_hero = '''<!-- HERO -->
<header class="hero" id="top">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-left">
        <p class="eyebrow ani">PURPOSE-BUILT FOR FEDERALLY QUALIFIED HEALTH CENTERS</p>
        <h1 class="ani ani-d1">The AI Operating System <em>for Federally Qualified Health Centers.</em></h1>
        <p class="lead ani ani-d2">Quantum5D.ai unifies AI-powered applications, healthcare intelligence, and operational workflows into one secure platform built exclusively for Federally Qualified Health Centers.</p>
        <div class="hero-cta ani ani-d3">
          <a class="btn btn-primary" href="#platform">Explore the Platform \u2192</a>
          <a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3)">Become a Founding Innovation Partner</a>
        </div>
        <div class="hero-pills ani ani-d4">
          <span class="hero-pill"><b>Purpose-built</b> for FQHCs</span>
          <span class="hero-pill"><b>15+</b> AI Applications</span>
          <span class="hero-pill"><b>Executive</b> Intelligence</span>
          <span class="hero-pill"><b>Human</b> Oversight</span>
        </div>
      </div>
      <div class="hero-right ani ani-d2">
        <div class="plat-viz">
          <div class="plat-viz-title">Quantum5D Platform</div>
          <div class="plat-viz-layer" style="background:rgba(139,92,246,.2);border:1px solid rgba(139,92,246,.3);color:#E9E5F5">Executive Intelligence Layer</div>
          <div class="plat-viz-conn">\u2502</div>
          <div class="plat-viz-apps">
            <div class="plat-viz-app">CoverageGuard</div>
            <div class="plat-viz-app">Governance IQ</div>
            <div class="plat-viz-app">Meeting IQ</div>
            <div class="plat-viz-app">Compliance</div>
            <div class="plat-viz-app">Revenue</div>
            <div class="plat-viz-app">Pharmacy</div>
          </div>
          <div class="plat-viz-conn">\u2502</div>
          <div class="plat-viz-layer" style="background:rgba(37,99,235,.15);border:1px solid rgba(37,99,235,.25);color:#BFDBFE">Knowledge Engine \xb7 AI Agents \xb7 Policy Engine</div>
          <div class="plat-viz-conn">\u2502</div>
          <div class="plat-viz-layer" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#94A3B8;font-size:11px">EHR \xb7 Pharmacy Systems \xb7 Finance \xb7 HR \xb7 Quality</div>
        </div>
      </div>
    </div>
    <div class="owned ani ani-d4" style="margin-top:28px">
      <span><b>Minority-owned</b></span><span><b>Pharmacist-owned</b></span><span><b>Woman-owned</b></span>
      <span>Nationwide</span><span>340B-focused</span>
    </div>
  </div>
</header>'''

content = content.replace(old_hero, new_hero)
print("OK: Hero replaced with two-column enterprise layout")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"File size: {len(content)} chars")
