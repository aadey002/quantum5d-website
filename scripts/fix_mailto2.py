# -*- coding: utf-8 -*-
"""
Fix email button: change from <a href=mailto> to a JS-driven approach
that reliably opens the native mail client even from file:// URLs.
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    c = f.read()

# Replace the mailto link generation with a button that uses window.location.href
old = """var mailHref='mailto:?subject='+encodeURIComponent(shareTitle)+'&body='+encodeURIComponent(shareText+'\\n\\nExplore: '+appUrl);
  html+='<a href="'+mailHref+'">&#x2709; Email</a>';"""

# Store mailHref in a global so the onclick can use it
new = """window._mailHref='mailto:?subject='+encodeURIComponent(shareTitle)+'&body='+encodeURIComponent(shareText+'\\n\\nExplore: '+appUrl);
  html+='<button onclick="window.location.href=window._mailHref">&#x2709; Email</button>';"""

if old in c:
    c = c.replace(old, new, 1)
    print("OK: email button now uses window.location.href")
else:
    print("MISS")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(c)
