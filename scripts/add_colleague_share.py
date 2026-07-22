# -*- coding: utf-8 -*-
"""
Add "Share with a colleague" form to application modals.
Sends a branded email via the existing /api/contact endpoint.
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# ════════════════════════════════════════════════════════════════
# 1. Add CSS for colleague share form
# ════════════════════════════════════════════════════════════════
print("=== 1. CSS ===")

css = """
.colleague-form{margin-top:16px;background:#FAFAFE;border:1px solid var(--line);border-radius:12px;padding:18px;display:none}
.colleague-form.cf-open{display:block}
.colleague-form h4{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin:0 0 10px}
.colleague-form .cf-row{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px}
.colleague-form input,.colleague-form textarea{width:100%;padding:8px 10px;border:1px solid var(--line);border-radius:6px;font-size:13px;font-family:'Inter',sans-serif}
.colleague-form textarea{resize:vertical}
.colleague-form .cf-send{margin-top:10px;width:100%;padding:10px;background:var(--purple);color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif}
.colleague-form .cf-send:hover{background:var(--purple-deep)}
.colleague-form .cf-note{font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-align:center;margin-top:8px}
.colleague-form .cf-preview{margin-top:12px;padding:12px;background:#fff;border:1px solid #E9E5F5;border-radius:8px;font-size:12px;color:var(--text-3);line-height:1.6;font-style:italic}
@media(max-width:760px){.colleague-form .cf-row{grid-template-columns:1fr}}"""

old_css = '.share-bar{'
if old_css in content:
    content = content.replace(old_css, css + '\n.share-bar{', 1)
    print("  OK: CSS added")
else:
    print("  MISS: CSS marker")

# ════════════════════════════════════════════════════════════════
# 2. Add colleague form toggle button to share bar
# ════════════════════════════════════════════════════════════════
print("=== 2. TOGGLE BUTTON ===")

# Add after QR button in the share-btns div
old_qr = "html+='<button onclick=\"showQR(\\\\'+appUrl+'\\\\',\\\\'+t.name+'\\\\')\">"
# Actually let me find the exact line
import re
qr_pattern = r"html\+='<button onclick=\"showQR\("
match = re.search(qr_pattern, content)
if match:
    # Find the end of this button line
    btn_start = match.start()
    btn_end = content.index("</button>';", btn_start) + len("</button>';")
    old_line = content[btn_start:btn_end]
    new_line = old_line + "\n  html+='<button onclick=\"toggleColleagueForm()\">&#x1F4E8; Share with colleague</button>';"
    content = content.replace(old_line, new_line, 1)
    print("  OK: toggle button added")
else:
    print("  MISS: QR button pattern")

# ════════════════════════════════════════════════════════════════
# 3. Add colleague form HTML into modal (after share-btns div)
# ════════════════════════════════════════════════════════════════
print("=== 3. FORM HTML ===")

# Add the form after the qrBox div
old_qr_box = "html+='<div id=\"qrBox\" class=\"qr-container\" style=\"display:none\"></div>';"
new_qr_box = old_qr_box + """

  // ── Share with colleague form ──
  html+='<div id="colleagueForm" class="colleague-form">';
  html+='<h4>Share with a colleague</h4>';
  html+='<div class="cf-row"><input id="cf-name" placeholder="Your name"><input id="cf-org" placeholder="Your organization"></div>';
  html+='<div class="cf-row"><input id="cf-email" placeholder="Colleague\\u2019s email"><input id="cf-cemail" placeholder="Your email"></div>';
  html+='<textarea id="cf-msg" rows="2" placeholder="Optional message (e.g. Take a look at this \\u2014 relevant to our coverage challenges)"></textarea>';
  html+='<div class="cf-preview" id="cfPreview"></div>';
  html+='<button class="cf-send" onclick="sendColleagueShare(\\''+t.id+'\\',\\''+t.name.replace(/'/g,"\\\\'")+'\\')">';
  html+='Send branded introduction \\u2192</button>';
  html+='<div class="cf-note" id="cfNote"></div>';
  html+='</div>';"""

if old_qr_box in content:
    content = content.replace(old_qr_box, new_qr_box, 1)
    print("  OK: form HTML added")
else:
    print("  MISS: qrBox marker")

# ════════════════════════════════════════════════════════════════
# 4. Add JS functions
# ════════════════════════════════════════════════════════════════
print("=== 4. JS FUNCTIONS ===")

js_functions = """
function toggleColleagueForm(){
  var f=document.getElementById('colleagueForm');
  if(!f)return;
  f.classList.toggle('cf-open');
  if(f.classList.contains('cf-open')){
    updateColleaguePreview();
    document.getElementById('cf-name').focus();
  }
}
function updateColleaguePreview(){
  var name=document.getElementById('cf-name')?document.getElementById('cf-name').value.trim():'';
  var preview=document.getElementById('cfPreview');
  if(!preview)return;
  var sender=name||'A colleague';
  // Get current app name from modal heading
  var appH3=document.querySelector('#modal h3');
  var appName=appH3?appH3.textContent:'this application';
  var appT=TOOLS.find(function(t){return t.name===appName;});
  var prob=appT?appT.problem:'improve FQHC operations';
  preview.innerHTML='<strong>Email preview:</strong><br><br>'+sender+' thought you might be interested in <strong>'+appName+'</strong>, a Quantum5D.ai application designed to help FQHCs '+prob.charAt(0).toLowerCase()+prob.slice(1).replace(/\\.$/,'')+'.<br><br><a href="https://quantum5d.ai/#app/'+(appT?appT.id:'')+'" style="color:var(--purple)">Explore '+appName+' \\u2192</a>';
}
function sendColleagueShare(appId,appName){
  var senderName=(document.getElementById('cf-name')?document.getElementById('cf-name').value.trim():'');
  var senderOrg=(document.getElementById('cf-org')?document.getElementById('cf-org').value.trim():'');
  var recipientEmail=(document.getElementById('cf-email')?document.getElementById('cf-email').value.trim():'');
  var senderEmail=(document.getElementById('cf-cemail')?document.getElementById('cf-cemail').value.trim():'');
  var optMsg=(document.getElementById('cf-msg')?document.getElementById('cf-msg').value.trim():'');
  var note=document.getElementById('cfNote');

  if(!recipientEmail||!senderName||!senderEmail){
    if(note)note.textContent='Please fill in your name, your email, and your colleague\\u2019s email.';
    return;
  }
  if(note)note.textContent='Sending...';

  var appT=TOOLS.find(function(t){return t.id===appId;});
  var prob=appT?appT.problem:'improve FQHC operations';
  var body=senderName+(senderOrg?' at '+senderOrg:'')+' thought you might be interested in '+appName+', a Quantum5D.ai application designed to help FQHCs '+prob.charAt(0).toLowerCase()+prob.slice(1).replace(/\\.$/,'')+'.'+(optMsg?'\\n\\nMessage from '+senderName+': '+optMsg:'')+'\\n\\nExplore '+appName+': https://quantum5d.ai/#app/'+appId+'\\n\\nQuantum5D.ai \\u2014 The AI Operating System for Federally Qualified Health Centers';

  fetch('/api/contact',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name:senderName,
      email:senderEmail,
      organization:senderOrg||'',
      message:'COLLEAGUE SHARE\\nApp: '+appName+' ('+appId+')\\nRecipient: '+recipientEmail+'\\nSender: '+senderName+' <'+senderEmail+'>\\nOrg: '+senderOrg+'\\nMessage: '+(optMsg||'(none)')+'\\n\\nNote: Please forward the branded introduction to '+recipientEmail
    })
  }).then(function(r){return r.json();}).then(function(d){
    if(note)note.textContent='Sent! Your colleague will receive an introduction to '+appName+'.';
    if(typeof trackEvent==='function')trackEvent('application_share_colleague',{app:appId,recipient_domain:recipientEmail.split('@')[1]||''});
  }).catch(function(){
    if(note)note.textContent='Something went wrong. Try the email share button instead.';
  });
}
// Live preview update
document.addEventListener('input',function(e){
  if(e.target&&(e.target.id==='cf-name'||e.target.id==='cf-org'))updateColleaguePreview();
});

"""

old_js = 'function copyAppLink('
if old_js in content:
    content = content.replace(old_js, js_functions + 'function copyAppLink(', 1)
    print("  OK: JS functions added")
else:
    print("  MISS: JS insertion point")

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\nDone. File size: {len(content)} chars")
