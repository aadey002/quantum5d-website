"""
Reposition quantum5d.ai hero to AI Operating System positioning.
Update meta tags, hero copy, and overall narrative.
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

count = 0

def replace(old, new):
    global content, count
    if old in content:
        content = content.replace(old, new)
        count += 1
        print(f"OK [{count}]")
    else:
        print(f"MISS: {repr(old[:70])}")

# ─── 1. PAGE TITLE ───
replace(
    '<title>Quantum5D.ai \u2014 The AI Platform for Federally Qualified Health Centers</title>',
    '<title>Quantum5D.ai \u2014 The AI Operating System for Federally Qualified Health Centers</title>'
)

# ─── 2. META DESCRIPTION ───
replace(
    'Quantum5D.ai is a purpose-built AI platform for FQHCs \u2014 bringing operational, regulatory, financial, pharmacy, governance, and patient-access intelligence into one platform to help health centers work more efficiently, improve quality, and strengthen sustainability.',
    'Quantum5D.ai is the AI operating system for FQHCs \u2014 one platform, twenty-plus intelligent applications, built exclusively for Federally Qualified Health Centers. Operations, compliance, pharmacy, governance, finance, and population health through one unified system.'
)

# ─── 3. OG TITLE ───
replace(
    'Quantum5D.ai \u2014 The AI Platform for FQHCs',
    'Quantum5D.ai \u2014 The AI Operating System for FQHCs'
)

# ─── 4. OG DESCRIPTION ───
replace(
    'Purpose-built AI applications for operational, regulatory, financial, pharmacy, governance, and patient-access intelligence \u2014 designed specifically for Federally Qualified Health Centers.',
    'One platform. Twenty-plus intelligent applications. Built exclusively for FQHCs. Operations, compliance, pharmacy, governance, finance, and population health \u2014 unified.'
)

# ─── 5. SECOND META DESCRIPTION ───
replace(
    'Quantum5D.ai \u2014 purpose-built AI platform for FQHCs. Applications for coverage retention, regulatory readiness, governance, pharmacy operations, and organizational sustainability.',
    'Quantum5D.ai \u2014 the AI operating system for FQHCs. One platform connecting operations, compliance, pharmacy, governance, finance, and population health through twenty-plus intelligent applications.'
)

# ─── 6. HERO HEADLINE ───
replace(
    '<h1>The AI platform for stronger, <em>more sustainable FQHCs.</em></h1>',
    '<h1>The AI Operating System <em>for Federally Qualified Health Centers.</em></h1>'
)

# ─── 7. HERO LEAD PARAGRAPH ───
replace(
    '<p class="lead">Quantum5D.ai brings operational, regulatory, financial, pharmacy, governance, and patient-access intelligence into one purpose-built platform\u2014helping health centers work more efficiently, improve quality, protect revenue, and strengthen long-term sustainability.</p>',
    '<p class="lead" style="font-size:20px;color:#E2E0F0;max-width:48ch;margin:18px 0 0;line-height:1.5;font-family:\'Cormorant Garamond\',serif;font-style:italic">One platform. Twenty-plus intelligent applications.<br>Built exclusively for FQHCs.</p>\n    <p class="lead">Purpose-built intelligence that connects operations, compliance, pharmacy, governance, finance, and population health through one unified platform.</p>'
)

# ─── 8. HERO PRIMARY CTA ───
replace(
    '<a class="btn btn-primary" href="#platform">Explore the platform \u2192</a>',
    '<a class="btn btn-primary" href="#platform">Explore the platform \u2192</a>\n      <a class="btn btn-ghost" href="#applications" style="border-color:rgba(255,255,255,.3)">View applications</a>'
)

# ─── 9. Remove duplicate secondary CTA (we now have 3: Explore, View apps, Innovation partner) ───
# Actually keep the innovation partner CTA but restructure
replace(
    '<a class="btn btn-ghost" href="#innovation-partners">Become a founding innovation partner</a>',
    '<a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3)">Become an innovation partner</a>'
)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. {count} replacements made. File size: {len(content)} chars")
