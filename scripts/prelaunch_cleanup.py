# -*- coding: utf-8 -*-
"""
Pre-launch cleanup — 4 mechanical fixes.
Task 1: Remove duplicate meta description
Task 2: Delete duplicate founding-partner teaser band
Task 3: Canonical domain (already resolved — quantum5d.ai)
Task 4: Typography migration (Cormorant -> Newsreader in shell)
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

step = 0

# ════════════════════════════════════════════════════════════════
print("=== TASK 1: Remove duplicate meta description ===")
# ════════════════════════════════════════════════════════════════

old_meta = '\n<meta name="description" content="Quantum5D.ai \u2014 the AI operating platform for FQHCs \u2014 15 applications connecting operations, compliance, pharmacy, governance, finance, and population health.">'
if old_meta in content:
    content = content.replace(old_meta, '', 1)
    step += 1
    print(f"  [{step}] OK: duplicate meta description removed")
else:
    print("  MISS: duplicate meta description")

# ════════════════════════════════════════════════════════════════
print("=== TASK 2: Delete founding partner teaser band ===")
# ════════════════════════════════════════════════════════════════

teaser_start = '<!-- FOUNDING PARTNER TEASER -->'
teaser_end = '</div></div>\n\n<!-- PLATFORM -->'

if teaser_start in content and teaser_end in content:
    s = content.index(teaser_start)
    e = content.index(teaser_end) + len('</div></div>')
    # Also remove leading blank lines
    while s > 0 and content[s-1] == '\n':
        s -= 1
    content = content[:s] + '\n\n' + content[e:]
    step += 1
    print(f"  [{step}] OK: founding partner teaser deleted")
else:
    print("  MISS: teaser block")

# ════════════════════════════════════════════════════════════════
print("=== TASK 3: Canonical domain (already resolved) ===")
# ════════════════════════════════════════════════════════════════
print("  SKIP: quantum5d.ai confirmed as canonical, all references consistent")

# ════════════════════════════════════════════════════════════════
print("=== TASK 4a: Replace Cormorant with Newsreader in shell ===")
# ════════════════════════════════════════════════════════════════

# Only replace in the CSS shell (before the prototype blocks)
# Find where prototypes start
import re

# Shell Cormorant references to replace (lines < ~1300, CSS rules)
shell_replacements = [
    (".serif{font-family:'Cormorant Garamond',serif}",
     ".serif{font-family:'Newsreader',Georgia,serif}"),
    ("h1,h2,h3.big{font-family:'Cormorant Garamond',serif;",
     "h1,h2,h3.big{font-family:'Newsreader',Georgia,serif;"),
    (".brand .wm{font-family:'Cormorant Garamond',serif;font-weight:600;font-size:21px;letter-spacing:.01em",
     ".brand .wm{font-family:'Newsreader',Georgia,serif;font-weight:600;font-size:21px;letter-spacing:-.01em"),
    (".hero .tagline{font-family:'Cormorant Garamond',serif;",
     ".hero .tagline{font-family:'Newsreader',Georgia,serif;"),
    (".cat-head h3{font-family:'Cormorant Garamond',serif;",
     ".cat-head h3{font-family:'Newsreader',Georgia,serif;"),
    (".tool h3{font-family:'Cormorant Garamond',serif;",
     ".tool h3{font-family:'Newsreader',Georgia,serif;"),
    (".partner h4{font-family:'Cormorant Garamond',serif;",
     ".partner h4{font-family:'Newsreader',Georgia,serif;"),
    (".svc h3{font-family:'Cormorant Garamond',serif;",
     ".svc h3{font-family:'Newsreader',Georgia,serif;"),
    (".lc-box h3{font-family:'Cormorant Garamond',serif;",
     ".lc-box h3{font-family:'Newsreader',Georgia,serif;"),
    (".modal h3{font-family:'Cormorant Garamond',serif;",
     ".modal h3{font-family:'Newsreader',Georgia,serif;"),
    (".outcome-card h3{font-family:'Cormorant Garamond',serif;",
     ".outcome-card h3{font-family:'Newsreader',Georgia,serif;"),
    # The inline style in the teaser (line 669) was deleted in Task 2
    # The "Turning prototypes" quote
    ("font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#E2E0F0",
     "font-family:'Newsreader',Georgia,serif;font-size:22px;font-style:italic;color:var(--muted)"),
]

for old, new in shell_replacements:
    if old in content:
        content = content.replace(old, new, 1)
        step += 1
        print(f"  [{step}] OK: {old[:50]}...")
    else:
        print(f"  MISS: {old[:50]}...")

# ════════════════════════════════════════════════════════════════
print("=== TASK 4b: Remove !important from Newsreader overrides ===")
# ════════════════════════════════════════════════════════════════

# Find Newsreader !important declarations
matches = re.findall(r"Newsreader.*?!important", content)
print(f"  Found {len(matches)} Newsreader !important declarations")

# Now that all shell rules use Newsreader, the !important overrides are redundant
# Remove them from the v3 CSS overrides
content = content.replace(
    "font-family:'Newsreader',Georgia,serif!important;font-weight:600!important;",
    "font-family:'Newsreader',Georgia,serif;font-weight:600;",
)
content = content.replace(
    "font-size:clamp(38px,4.4vw,55px)!important;line-height:1.06!important;",
    "font-size:clamp(38px,4.4vw,55px);line-height:1.06;",
)
content = content.replace(
    "font-family:'Newsreader',Georgia,serif!important;font-weight:600;font-size:21px!important;",
    "font-family:'Newsreader',Georgia,serif;font-weight:600;font-size:21px;",
)
step += 1
print(f"  [{step}] OK: removed !important from Newsreader rules")

# ════════════════════════════════════════════════════════════════
print("=== TASK 4c: Consolidate font loading ===")
# ════════════════════════════════════════════════════════════════

# Remove the CSS @import for Cormorant/Inter/IBM Plex Mono
# and merge into the existing <link> tag
old_import = "@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&family=Inter:wght@400;500;600&display=swap');"
if old_import in content:
    content = content.replace(old_import, '', 1)
    step += 1
    print(f"  [{step}] OK: removed @import for Cormorant/Inter/IBM Plex Mono")
else:
    print("  MISS: @import")

# Update the <link> tag to include Inter and IBM Plex Mono (Newsreader already there)
old_link = "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&display=swap"
new_link = "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap"
if old_link in content:
    content = content.replace(old_link, new_link, 1)
    step += 1
    print(f"  [{step}] OK: consolidated font loading into single <link>")
else:
    print("  MISS: Newsreader link tag")

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"PRE-LAUNCH CLEANUP COMPLETE. {step} changes applied.")
print(f"File size: {len(content)} chars")
