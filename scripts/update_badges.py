"""Update badge rendering to use MATURITY_CONFIG and add CSS for new badge types."""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace card badge rendering
old_badge = """el.innerHTML='<span class="badge '+(t.live?'b-live':'b-soon')+'">'+(t.live?'Interactive demo':'Preview')+'</span>'+"""
new_badge = """var mc=MATURITY_CONFIG[t.maturity]||MATURITY_CONFIG['interactive_prototype'];
    el.innerHTML='<span class="badge '+mc.cls+'">'+mc.label+'</span>'+"""

if old_badge in content:
    content = content.replace(old_badge, new_badge)
    print("OK: card badge rendering updated")
else:
    print("MISS: card badge rendering")

# 2. Replace modal badge rendering
old_modal = """'<p class="eyebrow">'+(t.live?'Interactive demo':'Case preview')+'</p>'+"""
new_modal = """'<p class="eyebrow">'+((MATURITY_CONFIG[t.maturity]||{}).label||'Interactive demonstration')+'</p>'+"""

if old_modal in content:
    content = content.replace(old_modal, new_modal)
    print("OK: modal badge updated")
else:
    print("MISS: modal badge")

# 3. Add CSS for new maturity badge types (after existing .b-soon style)
css_marker = ".b-soon{background:#8B5CF6;color:#fff}"
new_css = """.b-soon{background:#8B5CF6;color:#fff}
.b-active{background:#059669;color:#fff}
.b-pilot{background:#2563eb;color:#fff}
.b-proto{background:#8B5CF6;color:#fff}
.b-design{background:#d97706;color:#fff}
.b-concept{background:#64748b;color:#fff}
.b-dev{background:#94a3b8;color:#fff}"""

if css_marker in content:
    content = content.replace(css_marker, new_css)
    print("OK: CSS for maturity badges added")
else:
    print("MISS: CSS marker")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Done. File size: {len(content)} chars")
