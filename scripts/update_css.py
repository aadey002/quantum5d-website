"""Add maturity badge CSS after existing .b-soon style."""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

old_css = ".b-soon{background:#F1F1F3;color:var(--charcoal)}"
new_css = """.b-soon{background:#F1F1F3;color:var(--charcoal)}
.b-active{background:#D1FAE5;color:#065F46}
.b-pilot{background:#DBEAFE;color:#1E40AF}
.b-proto{background:#ECE8FA;color:var(--purple-deep)}
.b-design{background:#FEF3C7;color:#92400E}
.b-concept{background:#F1F5F9;color:#475569}
.b-dev{background:#F1F5F9;color:#64748B}"""

if old_css in content:
    content = content.replace(old_css, new_css)
    print("OK: maturity CSS added")
else:
    print("MISS")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)
print("Done")
