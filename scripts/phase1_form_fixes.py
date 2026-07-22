# -*- coding: utf-8 -*-
"""
Phase 1 — Fix all form and submission defects.
1. Add f-hp honeypot field to briefing form
2. Fix val() to be null-safe
3. Fix email regex (missing backslashes)
4. Add email validation to partner form
5. Add duplicate-submit prevention to partner form
6. Add timeout recovery to both forms
7. Fix ip-state placeholder (Maryland -> State or territory)
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
        return True
    else:
        print(f"  MISS: {label}")
        return False

def ra(old, new, label):
    global content, step
    if old in content:
        content = content.replace(old, new)
        step += 1
        print(f"  [{step}] OK (all): {label}")
    else:
        print(f"  MISS: {label}")

# ─── 1. ADD HONEYPOT FIELD TO BRIEFING FORM ───
print("=== 1. HONEYPOT FIELD ===")

# Add hidden honeypot before the submit button in the contact/briefing form
r('<button class="btn btn-primary" style="justify-content:center" onclick="sendInquiry()">',
  '<div style="position:absolute;left:-9999px;height:0;overflow:hidden" aria-hidden="true"><label for="f-hp">Leave this field blank</label><input id="f-hp" name="website" type="text" tabindex="-1" autocomplete="off"></div>\n      <button class="btn btn-primary" style="justify-content:center" onclick="sendInquiry()">',
  'add f-hp honeypot field')

# ─── 2. FIX val() FUNCTION — NULL-SAFE ───
print("=== 2. NULL-SAFE val() ===")

r("function val(id){return (document.getElementById(id).value||'').trim();}",
  "function val(id){var el=document.getElementById(id);return el?el.value.trim():'';}",
  'null-safe val()')

# ─── 3. FIX EMAIL REGEX ───
print("=== 3. EMAIL REGEX ===")

# Current broken: /^[^s@]+@[^s@]+.[^s@]+$/  (missing \ before s and .)
r("/^[^s@]+@[^s@]+.[^s@]+$/",
  "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/",
  'email regex backslashes')

# ─── 4. ADD isValidEmail HELPER + USE EVERYWHERE ───
print("=== 4. SHARED EMAIL VALIDATOR ===")

# Add isValidEmail before sendInquiry
r('function sendInquiry(){',
  "function isValidEmail(email){return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);}\n\nfunction sendInquiry(){",
  'isValidEmail helper')

# Use it in sendInquiry (replace the inline regex test)
r("if(!isValidEmail(e)){note.textContent='Please enter a valid email.';return;}",
  "if(!isValidEmail(e)){note.textContent='Please enter a valid email.';return;}",
  'sendInquiry uses isValidEmail')
# The regex was already replaced, now replace the test call
# Actually let me check what the line looks like after regex fix
# It should be: if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e))
# Replace with isValidEmail call
r("if(!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(e)){note.textContent='Please enter a valid email.';return;}",
  "if(!isValidEmail(e)){note.textContent='Please enter a valid email.';return;}",
  'sendInquiry uses isValidEmail call')

# ─── 5. ADD EMAIL VALIDATION + DOUBLE-SUBMIT PREVENTION TO PARTNER FORM ───
print("=== 5. PARTNER FORM FIXES ===")

old_partner = """  if(!fields.name||!fields.email||!fields.organization){
    document.getElementById('ip-note').textContent='Please fill in your name, organization, and email.';
    return;
  }
  document.getElementById('ip-note').textContent='Submitting...';
  fetch('/api/contact',{"""

new_partner = """  if(!fields.name||!fields.email||!fields.organization){
    document.getElementById('ip-note').textContent='Please fill in your name, organization, and email.';
    return;
  }
  if(!isValidEmail(fields.email)){
    document.getElementById('ip-note').textContent='Please enter a valid email address.';
    return;
  }
  var ipBtn=document.querySelector('#innovation-partners .btn');
  if(ipBtn&&ipBtn.disabled)return;
  if(ipBtn)ipBtn.disabled=true;
  document.getElementById('ip-note').textContent='Submitting...';
  var ipTimeout=setTimeout(function(){
    document.getElementById('ip-note').textContent='Taking longer than expected. Please try again or email hello@quantum5d.ai.';
    if(ipBtn)ipBtn.disabled=false;
  },15000);
  fetch('/api/contact',{"""

r(old_partner, new_partner, 'partner form: email validation + double-submit + timeout')

# Fix partner form .then/.catch to clear timeout and re-enable button
old_partner_then = """}).then(function(r){return r.json();}).then(function(d){
    document.getElementById('ip-note').textContent='Application received. We will be in touch within five business days.';
  }).catch(function(){
    document.getElementById('ip-note').textContent='Something went wrong. Please email hello@quantum5d.ai directly.';
  });
}"""

new_partner_then = """}).then(function(r){return r.json();}).then(function(d){
    clearTimeout(ipTimeout);
    document.getElementById('ip-note').textContent='Application received. We will be in touch within five business days.';
    document.getElementById('ip-note').style.color='#4ade80';
  }).catch(function(){
    clearTimeout(ipTimeout);
    document.getElementById('ip-note').textContent='Something went wrong. Please email hello@quantum5d.ai directly.';
  }).finally(function(){if(ipBtn)ipBtn.disabled=false;});
}"""

r(old_partner_then, new_partner_then, 'partner form: timeout clear + button re-enable')

# ─── 6. ADD TIMEOUT TO BRIEFING FORM ───
print("=== 6. BRIEFING FORM TIMEOUT ===")

old_briefing_fetch = """note.textContent='Sending\u2026';
  var btn=document.querySelector('.contact .btn');if(btn)btn.disabled=true;
  fetch('/api/contact',{"""

new_briefing_fetch = """note.textContent='Sending\u2026';
  var btn=document.querySelector('.contact .btn');if(btn)btn.disabled=true;
  var briefTimeout=setTimeout(function(){
    note.textContent='Taking longer than expected. Please try again or email hello@quantum5d.ai.';
    if(btn)btn.disabled=false;
  },15000);
  fetch('/api/contact',{"""

r(old_briefing_fetch, new_briefing_fetch, 'briefing form timeout')

# Add clearTimeout to briefing form handlers
r("if(d.success){",
  "clearTimeout(briefTimeout);\n    if(d.success){",
  'briefing clear timeout on success')

r("}else{\n      note.textContent=d.error||'Something went wrong. Please try again.';\n    }\n  }).catch(function(){\n    note.textContent='Network error \u2014 please try again.';",
  "}else{\n      clearTimeout(briefTimeout);\n      note.textContent=d.error||'Something went wrong. Please try again.';\n    }\n  }).catch(function(){\n    clearTimeout(briefTimeout);\n    note.textContent='Network error \u2014 please try again.';",
  'briefing clear timeout on error/catch')

# ─── 7. FIX STATE PLACEHOLDER ───
print("=== 7. STATE PLACEHOLDER ===")

ra('placeholder="e.g. Maryland"', 'placeholder="e.g. State or territory"', 'state placeholder')

# ─── 8. ADD HONEYPOT CHECK IN sendInquiry ───
print("=== 8. HONEYPOT CHECK ===")

# The sendInquiry already sends _hp:val('f-hp') to the API.
# Add a client-side check too:
r("var n=val('f-name'),o=val('f-org'),e=val('f-email'),m=val('f-msg');",
  "if(val('f-hp')){return;}\n  var n=val('f-name'),o=val('f-org'),e=val('f-email'),m=val('f-msg');",
  'client-side honeypot check in sendInquiry')

# ─── 9. FIX COLLEAGUE SHARE EMAIL VALIDATION ───
print("=== 9. COLLEAGUE SHARE VALIDATION ===")

r("if(!recipientEmail||!senderName||!senderEmail){",
  "if(!recipientEmail||!senderName||!senderEmail){\n    if(note)note.textContent='Please fill in your name, your email, and your colleague\\u2019s email.';\n    return;\n  }\n  if(!isValidEmail(recipientEmail)||!isValidEmail(senderEmail)){",
  'colleague share email validation')

# Fix the duplicate error message that's now there
r("if(note)note.textContent='Please fill in your name, your email, and your colleague\\u2019s email.';\n    return;\n  }\n  if(!isValidEmail(recipientEmail)||!isValidEmail(senderEmail)){\n    if(note)note.textContent='Please fill in your name, your email, and your colleague\\u2019s email.';",
  "if(note)note.textContent='Please fill in your name, your email, and your colleague\\u2019s email.';\n    return;\n  }\n  if(!isValidEmail(recipientEmail)||!isValidEmail(senderEmail)){\n    if(note)note.textContent='Please enter valid email addresses.';",
  'colleague share distinct error messages')

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"PHASE 1 COMPLETE. {step} fixes applied.")
print(f"File size: {len(content)} chars")
