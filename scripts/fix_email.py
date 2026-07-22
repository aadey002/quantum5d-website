# -*- coding: utf-8 -*-
"""Fix the email share button — encodeURIComponent must execute as JS, not sit inside a string."""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    c = f.read()

# Also fix LinkedIn and X links which have the same problem
import re

# Find the share buttons block
# Email
old_email = re.search(r"html\+='<a href=\"mailto:\?subject=.*?Email</a>';", c)
if old_email:
    print("Found email link at:", old_email.start())
    new_email = """var mailHref='mailto:?subject='+encodeURIComponent(shareTitle)+'&body='+encodeURIComponent(shareText+'\\n\\nExplore: '+appUrl);
  html+='<a href="'+mailHref+'" target="_blank">&#x2709; Email</a>';"""
    c = c.replace(old_email.group(0), new_email, 1)
    print("OK: email fixed")
else:
    print("MISS: email")

# LinkedIn
old_li = re.search(r"html\+='<a href=\"https://www\.linkedin\.com/sharing.*?LinkedIn</a>';", c)
if old_li:
    new_li = """var liHref='https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(appUrl);
  html+='<a href="'+liHref+'" target="_blank" rel="noopener">in LinkedIn</a>';"""
    c = c.replace(old_li.group(0), new_li, 1)
    print("OK: LinkedIn fixed")
else:
    print("MISS: LinkedIn")

# X/Twitter
old_x = re.search(r"html\+='<a href=\"https://x\.com/intent.*?X</a>';", c)
if old_x:
    new_x = """var xHref='https://x.com/intent/tweet?text='+encodeURIComponent(shareTitle)+'&url='+encodeURIComponent(appUrl);
  html+='<a href="'+xHref+'" target="_blank" rel="noopener">&#x1D54F; X</a>';"""
    c = c.replace(old_x.group(0), new_x, 1)
    print("OK: X fixed")
else:
    print("MISS: X")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(c)

print("Done")
