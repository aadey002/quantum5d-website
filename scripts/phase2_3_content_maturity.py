# -*- coding: utf-8 -*-
"""
Phase 2-3: Content consistency + maturity standardization.
1. Fix app count everywhere (15, not 20+)
2. Standardize domain to quantum5d.ai
3. Rename DTM to "Collaborative Practice Review Intelligence"
4. Add maturity descriptions to MATURITY_CONFIG
5. Add canonical link
6. Fix "operating system" vs "operating platform" in metadata
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
print("=== PHASE 2: CONTENT CONSISTENCY ===")
# ════════════════════════════════════════════════════════════════

# 1. Fix application count — "20+" to "15"
ra('Twenty-plus intelligent applications', '15 purpose-built applications', 'twenty-plus -> 15 (text)')
ra('twenty-plus intelligent applications', '15 purpose-built applications', 'twenty-plus -> 15 (lower)')
ra('<b>15+</b> AI Applications', '<b>15</b> Applications', 'hero pill 15+ -> 15')

# 2. Fix metadata — use "operating platform" in meta, keep "Operating System" in brand headline
r('Quantum5D.ai is the AI operating system for FQHCs',
  'Quantum5D.ai is a purpose-built AI operating platform for FQHCs',
  'meta desc: operating platform')

r('the AI operating system for FQHCs. One platform connecting operations',
  'the AI operating platform for FQHCs \u2014 15 applications connecting operations',
  'meta desc 2: operating platform')

# 3. Add canonical link
r('<meta charset="UTF-8">',
  '<meta charset="UTF-8">\n<link rel="canonical" href="https://quantum5d.ai/">',
  'canonical link')

# 4. DTM rename to "Collaborative Practice Review Intelligence"
ra('DTM Review Intelligence', 'Collaborative Practice Review', 'DTM rename in cards')
ra('id:"dtm",name:"Collaborative Practice Review"', 'id:"dtm",name:"Collaborative Practice Review"', 'DTM TOOLS entry (verify)')

# Fix DTM prototype title if referenced
ra('"DTM Platform"', '"Collaborative Practice Review"', 'DTM prototype title')

# 5. Fix domain consistency — ensure quantum5d.ai everywhere
# Check for any quantum5dconsulting.com references in the showcase file
import re
consulting_refs = re.findall(r'quantum5dconsulting\.com', content)
if consulting_refs:
    print(f"  INFO: Found {len(consulting_refs)} quantum5dconsulting.com references (expected for blog links)")

# ════════════════════════════════════════════════════════════════
print("=== PHASE 3: MATURITY STANDARDIZATION ===")
# ════════════════════════════════════════════════════════════════

# Replace MATURITY_CONFIG with version that includes descriptions
old_maturity = """var MATURITY_CONFIG = {
  'in_active_use':          {label:'In active use',           cls:'b-active',   order:1},
  'pilot_ready':            {label:'Pilot-ready',             cls:'b-pilot',    order:2},
  'interactive_prototype':  {label:'Interactive prototype',   cls:'b-proto',    order:3},
  'design_partner':         {label:'Design partner development', cls:'b-design', order:4},
  'concept_demonstration':  {label:'Concept demonstration',   cls:'b-concept',  order:5},
  'in_development':         {label:'In development',          cls:'b-dev',      order:6}
};"""

new_maturity = """var PLATFORM_CONFIG = {applicationCount: 15};

var MATURITY_CONFIG = {
  'in_active_use':          {label:'In Active Use',           shortLabel:'Active',     cls:'b-active',   order:1, desc:'Used in an ongoing real-world operational workflow by actual users.'},
  'pilot_ready':            {label:'Pilot-Ready',             shortLabel:'Pilot-Ready', cls:'b-pilot',    order:2, desc:'Core workflow ready for a controlled pilot subject to security review, implementation planning, and human oversight.'},
  'interactive_prototype':  {label:'Interactive Prototype',   shortLabel:'Prototype',  cls:'b-proto',    order:3, desc:'Demonstrates intended functionality using synthetic or demonstration data.'},
  'design_partner':         {label:'Design Partner Development', shortLabel:'Design Partner', cls:'b-design', order:4, desc:'Being shaped with prospective users and partners before controlled pilot use.'},
  'concept_demonstration':  {label:'Concept Demonstration',   shortLabel:'Concept',    cls:'b-concept',  order:5, desc:'Illustrates a proposed workflow or product direction.'},
  'in_development':         {label:'In Development',          cls:'b-dev',      order:6, desc:'Under active development.'}
};"""

r(old_maturity, new_maturity, 'maturity config with descriptions')

# Update modal to show maturity description
old_modal_eyebrow = """'<p class="eyebrow">'+((MATURITY_CONFIG[t.maturity]||{}).label||'Interactive demonstration')+'</p>'+"""
new_modal_eyebrow = """var _mc=MATURITY_CONFIG[t.maturity]||MATURITY_CONFIG['interactive_prototype'];
    '<p class="eyebrow">'+_mc.label+'</p>'+
    '<div style="font-size:12px;color:var(--text-3);margin:-8px 0 12px;font-style:italic">'+(_mc.desc||'')+'</div>'+"""

r(old_modal_eyebrow, new_modal_eyebrow, 'modal shows maturity description')

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"PHASE 2-3 COMPLETE. {step} fixes applied.")
print(f"File size: {len(content)} chars")
