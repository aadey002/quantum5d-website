filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"
with open(filepath, "r", encoding="utf-8") as f:
    c = f.read()

# Remove target="_blank" from the mailto link so it opens native mail client
old = """html+='<a href="'+mailHref+'" target="_blank">&#x2709; Email</a>';"""
new = """html+='<a href="'+mailHref+'">&#x2709; Email</a>';"""

if old in c:
    c = c.replace(old, new, 1)
    print("OK: email opens native client now")
else:
    print("MISS")

# Also fix the colleague fallback - use window.location not window.open
old2 = "window.open('mailto:'+recipientEmail"
new2 = "window.location.href='mailto:'+recipientEmail"

if old2 in c:
    c = c.replace(old2, new2, 1)
    print("OK: colleague fallback uses location.href")
else:
    print("MISS: fallback")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(c)
