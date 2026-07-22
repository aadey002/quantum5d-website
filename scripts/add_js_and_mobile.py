"""Add partner form JS, mobile nav, and sticky header to the showcase."""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add submitPartnerApplication() function before closing </script> or after sendInquiry
send_inquiry_end = "function sendInquiry(){"
si_idx = content.index(send_inquiry_end)

# Find the end of the sendInquiry function block - look for the next top-level function
# Insert the partner form function just before sendInquiry
partner_js = r"""
function submitPartnerApplication(){
  var hp=document.getElementById('ip-hp');
  if(hp&&hp.value){return;}
  var consent=document.getElementById('ip-consent');
  if(!consent||!consent.checked){
    document.getElementById('ip-note').textContent='Please check the consent box to continue.';
    return;
  }
  var fields={
    name:document.getElementById('ip-name').value.trim(),
    title:document.getElementById('ip-title').value.trim(),
    organization:document.getElementById('ip-org').value.trim(),
    email:document.getElementById('ip-email').value.trim(),
    sites:document.getElementById('ip-sites').value.trim(),
    state:document.getElementById('ip-state').value.trim(),
    challenge:document.getElementById('ip-challenge').value.trim(),
    interest:document.getElementById('ip-interest').value,
    source:'innovation_partner_application'
  };
  if(!fields.name||!fields.email||!fields.organization){
    document.getElementById('ip-note').textContent='Please fill in your name, organization, and email.';
    return;
  }
  document.getElementById('ip-note').textContent='Submitting...';
  fetch('/api/contact',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      name:fields.name,
      email:fields.email,
      organization:fields.organization,
      message:'INNOVATION PARTNER APPLICATION\nTitle: '+fields.title+'\nSites: '+fields.sites+'\nState: '+fields.state+'\nArea of interest: '+fields.interest+'\nPriority challenge: '+fields.challenge
    })
  }).then(function(r){return r.json();}).then(function(d){
    document.getElementById('ip-note').textContent='Application received. We will be in touch within five business days.';
    if(typeof trackEvent==='function')trackEvent('innovation_partner_apply',fields);
  }).catch(function(){
    document.getElementById('ip-note').textContent='Something went wrong. Please email hello@quantum5d.ai directly.';
  });
}

"""

content = content[:si_idx] + partner_js + content[si_idx:]
print("OK: Partner form JS added")

# 2. Add mobile hamburger menu - inject toggle button into nav and CSS
# Add hamburger button after nav-links div
nav_links_close = '</div>\n</div></nav>'
nav_with_hamburger = '''</div>
  <button class="nav-toggle" onclick="document.querySelector('.nav-links').classList.toggle('nav-open')" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</div></nav>'''

if nav_links_close in content:
    content = content.replace(nav_links_close, nav_with_hamburger, 1)
    print("OK: Hamburger button added")
else:
    print("MISS: nav_links_close")

# 3. Add mobile nav CSS + sticky header CSS
# Find the media query section
mobile_css_marker = ".hero h1{font-size:38px}"
mobile_css_new = """.nav{position:sticky;top:0;z-index:100;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px)}
  .nav-toggle{display:flex;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px}
  .nav-toggle span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:all .2s}
  .nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:var(--navy);padding:16px 24px;flex-direction:column;gap:8px;border-top:1px solid rgba(255,255,255,.1)}
  .nav-links.nav-open{display:flex}
  .nav-links a{padding:10px 0;font-size:15px}
  .nav-links .btn{text-align:center;margin-top:8px}
  .hero h1{font-size:38px}"""

if mobile_css_marker in content:
    content = content.replace(mobile_css_marker, mobile_css_new, 1)
    print("OK: Mobile CSS added")
else:
    print("MISS: mobile CSS marker")

# 4. Add desktop nav-toggle hide and sticky nav for desktop
desktop_css_marker = ".nav-links a{margin-left:18px;"
desktop_hide_toggle = ".nav-toggle{display:none}\n.nav-links a{margin-left:18px;"

if desktop_css_marker in content:
    content = content.replace(desktop_css_marker, desktop_hide_toggle, 1)
    print("OK: Desktop nav-toggle hidden")
else:
    print("MISS: desktop nav-toggle marker - searching...")
    # Try alternate
    if ".nav-links a{" in content:
        idx = content.index(".nav-links a{")
        content = content[:idx] + ".nav-toggle{display:none}\n" + content[idx:]
        print("OK: Desktop nav-toggle hidden (alt)")

# 5. Make nav sticky on all viewports
nav_style = ".nav{background:var(--navy)"
nav_sticky = ".nav{position:sticky;top:0;z-index:100;background:var(--navy)"

if nav_style in content:
    content = content.replace(nav_style, nav_sticky, 1)
    print("OK: Sticky nav added")
else:
    print("INFO: Nav sticky may already be set or marker differs")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Done. File size: {len(content)} chars")
