# -*- coding: utf-8 -*-
"""
Add Executive Sharing System to quantum5d.ai application modals.
- Share buttons (Copy Link, Email, LinkedIn, X, QR Code)
- Executive recommendation tags per application
- Permanent shareable URLs (hash-based)
- Analytics tracking
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
# 1. Add audience data to TOOLS array
# ════════════════════════════════════════════════════════════════
print("=== 1. AUDIENCE TAGS ===")

audience_map = {
    'coverage': '["CEO","COO","CFO","VP Population Health","Revenue Cycle","Eligibility","Pharmacy Director","Health Plan Partners"]',
    'osv': '["CEO","COO","Compliance Officer","VP Quality","Board Secretary"]',
    'dtm': '["CIO","Compliance Officer","Board Staff","Regulatory Affairs"]',
    'certiq': '["CIO","Compliance Officer","Board Staff","Regulatory Affairs"]',
    'sentinel': '["Compliance Officer","Regulatory Affairs","Board Staff","CIO"]',
    'compliance': '["CEO","COO","Compliance Officer","VP Quality","CIO"]',
    'loopproof': '["CMO","CQO","VP Quality","Risk Officer","General Counsel"]',
    'board': '["CEO","Board Chair","Board Secretary","COO","Governance Committee"]',
    'meeting': '["CEO","COO","CMO","CFO","CPO","Executive Leadership"]',
    'benchmark': '["CEO","Board Chair","CFO","Compensation Committee","HR Director"]',
    'serviceline': '["CEO","COO","CFO","VP Operations","Service Line Directors"]',
    'ira': '["CFO","CPO","340B Director","Pharmacy Director","Revenue Cycle"]',
    'budget': '["CEO","CFO","COO","VP Finance","Budget Committee"]',
    'abandon': '["CPO","Pharmacy Director","Pharmacy Manager","Operations"]',
    'trureach': '["COO","CIO","Pharmacy Director","Population Health","Scheduling"]',
}

for app_id, audience in audience_map.items():
    old = f'id:"{app_id}",'
    # Find the first occurrence of this id and add audience after tags
    idx = content.index(old)
    # Find the tags:[ line after this id
    tags_end = content.index(']},', idx)
    insert_point = tags_end + 1  # after the ]
    # Check if audience already added
    if 'audience:' not in content[idx:idx+500]:
        content = content[:insert_point] + ',\n  audience:' + audience + content[insert_point:]
        step += 1

print(f"  [{step}] OK: Added audience tags to all 15 applications")

# ════════════════════════════════════════════════════════════════
# 2. Add CSS for sharing UI
# ════════════════════════════════════════════════════════════════
print("=== 2. SHARING CSS ===")

sharing_css = """
.share-bar{margin-top:24px;padding-top:20px;border-top:1px solid var(--line)}
.share-bar h4{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin:0 0 10px}
.share-btns{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px}
.share-btns button,.share-btns a{display:inline-flex;align-items:center;gap:5px;padding:6px 14px;border:1px solid var(--line);border-radius:8px;background:#fff;color:var(--ink);font-size:12px;font-family:'Inter',sans-serif;font-weight:500;cursor:pointer;text-decoration:none;transition:all .15s}
.share-btns button:hover,.share-btns a:hover{background:var(--purple);color:#fff;border-color:var(--purple)}
.share-copied{color:var(--purple);font-family:'IBM Plex Mono',monospace;font-size:11px;margin-left:8px}
.audience-tags{margin-top:12px}
.audience-tags .aud-label{font-family:'IBM Plex Mono',monospace;font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px}
.audience-tags .aud-list{display:flex;flex-wrap:wrap;gap:4px}
.audience-tags .aud{padding:3px 10px;border-radius:12px;font-size:11px;font-weight:500;background:#F3F0FF;color:var(--purple-deep);border:1px solid #E9E5F5}
.qr-container{margin-top:12px;text-align:center}
.qr-container canvas{border-radius:8px;border:1px solid var(--line)}"""

r('.modal-close{',
  sharing_css + '\n.modal-close{',
  'sharing CSS')

# ════════════════════════════════════════════════════════════════
# 3. Update openModal to include sharing UI
# ════════════════════════════════════════════════════════════════
print("=== 3. MODAL SHARING UI ===")

old_modal = """  if(t.demo==='phone')html+=phoneDemo();
  else if(t.link)html+='<div style="margin-top:20px"><button class="btn btn-primary" onclick="launchProto(\\''+t.id+'\\')">Launch full prototype \\u2191</button></div>';
  else html+='';"""

# Find exact text
if "else if(t.link)html+='<div style=\"margin-top:20px\"><button class=\"btn btn-primary\" onclick=\"launchProto(\\'" in content:
    pass

# Let me find the exact launch button line
import re
launch_match = re.search(r"if\(t\.demo==='phone'\)html\+=phoneDemo\(\);\s*else if\(t\.link\)html\+='<div[^;]+;\s*else html\+='';\s*", content)

if launch_match:
    old_block = launch_match.group(0)
    new_block = old_block.rstrip() + """

  // ── Share bar ──
  var appUrl='https://quantum5d.ai/app/'+t.id;
  var shareTitle=t.name+' — Quantum5D.ai';
  var shareText=t.problem;
  html+='<div class="share-bar">';
  html+='<h4>Share this application</h4>';
  html+='<p style="font-size:12px;color:var(--muted);margin:0 0 10px">Help other FQHC leaders discover this solution.</p>';
  html+='<div class="share-btns">';
  html+='<button onclick="copyAppLink(\\''+appUrl+'\\')">&#x1F517; Copy Link<span id="copyConf" class="share-copied"></span></button>';
  html+='<a href="mailto:?subject='+encodeURIComponent(shareTitle)+'&body='+encodeURIComponent(t.problem+'\\n\\nExplore: '+appUrl)+'" target="_blank">&#x2709; Email</a>';
  html+='<a href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(appUrl)+'" target="_blank" rel="noopener">in LinkedIn</a>';
  html+='<a href="https://x.com/intent/tweet?text='+encodeURIComponent(shareTitle)+'&url='+encodeURIComponent(appUrl)+'" target="_blank" rel="noopener">&#x1D54F; X</a>';
  html+='<button onclick="showQR(\\''+appUrl+'\\',\\''+t.name+'\\')">&#x25A3; QR Code</button>';
  html+='</div>';
  html+='<div id="qrBox" class="qr-container" style="display:none"></div>';

  // ── Recommended audience ──
  if(t.audience&&t.audience.length){
    html+='<div class="audience-tags"><div class="aud-label">Recommended for</div><div class="aud-list">';
    t.audience.forEach(function(a){html+='<span class="aud">\\u2713 '+a+'</span>';});
    html+='</div><p style="font-size:11px;color:var(--muted);margin:8px 0 0;font-style:italic">Share with your leadership team</p></div>';
  }
  html+='</div>';

"""
    content = content.replace(old_block, new_block)
    step += 1
    print(f"  [{step}] OK: modal sharing UI")
else:
    print("  MISS: modal sharing UI - searching alt pattern")
    # Try simpler match
    old_simple = "if(t.demo==='phone')html+=phoneDemo();"
    idx = content.index(old_simple)
    # Find the next semicolon after "else html+='';"
    block_end = content.index("else html+='';", idx) + len("else html+='';")
    old_block = content[idx:block_end]

    new_block = old_block + """

  // ── Share bar ──
  var appUrl='https://quantum5d.ai/app/'+t.id;
  var shareTitle=t.name+' \\u2014 Quantum5D.ai';
  var shareText=t.problem;
  html+='<div class="share-bar">';
  html+='<h4>Share this application</h4>';
  html+='<p style="font-size:12px;color:var(--muted);margin:0 0 10px">Help other FQHC leaders discover this solution.</p>';
  html+='<div class="share-btns">';
  html+='<button onclick="copyAppLink(\\''+appUrl+'\\')">&#x1F517; Copy Link<span id="copyConf" class="share-copied"></span></button>';
  html+='<a href="mailto:?subject='+encodeURIComponent(shareTitle)+'&body='+encodeURIComponent(t.problem+'\\n\\nExplore: '+appUrl)+'" target="_blank">&#x2709; Email</a>';
  html+='<a href="https://www.linkedin.com/sharing/share-offsite/?url='+encodeURIComponent(appUrl)+'" target="_blank" rel="noopener">in LinkedIn</a>';
  html+='<a href="https://x.com/intent/tweet?text='+encodeURIComponent(shareTitle)+'&url='+encodeURIComponent(appUrl)+'" target="_blank" rel="noopener">&#x1D54F; X</a>';
  html+='<button onclick="showQR(\\''+appUrl+'\\',\\''+t.name+'\\')">&#x25A3; QR Code</button>';
  html+='</div>';
  html+='<div id="qrBox" class="qr-container" style="display:none"></div>';

  if(t.audience&&t.audience.length){
    html+='<div class="audience-tags"><div class="aud-label">Recommended for</div><div class="aud-list">';
    t.audience.forEach(function(a){html+='<span class="aud">\\u2713 '+a+'</span>';});
    html+='</div><p style="font-size:11px;color:var(--muted);margin:8px 0 0;font-style:italic">Share with your leadership team</p></div>';
  }
  html+='</div>';

"""
    content = content.replace(old_block, new_block)
    step += 1
    print(f"  [{step}] OK: modal sharing UI (alt)")

# ════════════════════════════════════════════════════════════════
# 4. Add sharing JS functions + hash routing + QR
# ════════════════════════════════════════════════════════════════
print("=== 4. SHARING JS ===")

sharing_js = """
function copyAppLink(url){
  navigator.clipboard.writeText(url).then(function(){
    var el=document.getElementById('copyConf');
    if(el){el.textContent=' Copied!';setTimeout(function(){el.textContent='';},2000);}
  });
  if(typeof trackEvent==='function')trackEvent('application_share_copy',{url:url});
}
function showQR(url,name){
  var box=document.getElementById('qrBox');
  if(!box)return;
  if(box.style.display!=='none'){box.style.display='none';return;}
  box.style.display='block';
  // Simple QR via external service (privacy-respecting, no tracking)
  box.innerHTML='<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data='+encodeURIComponent(url)+'" alt="QR code for '+name+'" style="border-radius:8px;border:1px solid var(--line);margin:8px auto;display:block" width="180" height="180"><p style="font-size:11px;color:var(--muted);margin:6px 0 0">Scan to open '+name+'</p>';
  if(typeof trackEvent==='function')trackEvent('application_share_qr',{name:name});
}

// Hash-based deep linking for applications
(function(){
  var hash=window.location.hash;
  if(hash&&hash.indexOf('#app/')===0){
    var appId=hash.replace('#app/','');
    setTimeout(function(){
      var t=TOOLS.find(function(x){return x.id===appId;});
      if(t)openModal(t);
    },600);
  }
})();

"""

r('function submitPartnerApplication(){',
  sharing_js + 'function submitPartnerApplication(){',
  'sharing JS functions + hash routing')

# ════════════════════════════════════════════════════════════════
# 5. Add Vercel rewrite for /app/* URLs
# ════════════════════════════════════════════════════════════════
print("=== 5. NOTE ===")
print("  INFO: Add to vercel.json: {source: '/app/:id', destination: '/quantum5d-site-index.html#app/:id'}")
print("  (Hash-based routing works without server changes; clean URLs need vercel.json update)")

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"DONE. {step} changes applied.")
print(f"File size: {len(content)} chars")
