# -*- coding: utf-8 -*-
"""
Master script: Apply ALL quantum5d.ai repositioning changes in one pass.
Converts the site from consulting portfolio to AI Operating System for FQHCs.

Changes applied:
1. Meta/title/OG tags
2. Navigation (links, brand, CTA, mobile hamburger)
3. Hero (AI Operating System positioning)
4. Platform section (Genesis: world before fish)
5. CoverageGuard IQ spotlight
6. Application categories (5 FQHC mission areas)
7. Maturity labels (centralized MATURITY_CONFIG)
8. Card rendering (maturity badges)
9. Badge CSS
10. Innovation Partners section + form
11. Services repositioning
12. About/Founder
13. Contact
14. Footer
15. Partner form JS
16. Mobile nav fix
"""

import sys

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

step = 0

def r(old, new, label=""):
    global content, step
    if old in content:
        content = content.replace(old, new, 1)
        step += 1
        print(f"  [{step}] OK: {label}")
    else:
        print(f"  MISS: {label} -- {repr(old[:60])}")
        sys.exit(1)

def r_all(old, new, label=""):
    global content, step
    if old in content:
        content = content.replace(old, new)
        step += 1
        print(f"  [{step}] OK (all): {label}")
    else:
        print(f"  MISS: {label}")

# ====================================================================
print("=== 1. META / TITLE / OG TAGS ===")
# ====================================================================

r('<title>Quantum 5D Consulting \u2014 Clinical, compliance & governance, engineered into ROI</title>',
  '<title>Quantum5D.ai \u2014 The AI Operating System for Federally Qualified Health Centers</title>',
  'page title')

r('Quantum 5D Consulting \u2014 clinical, compliance, and governance expertise engineered into working AI systems for FQHCs, 340B covered entities, and pharmacies. Explore live prototypes.',
  'Quantum5D.ai is the AI operating system for FQHCs \u2014 one platform, twenty-plus intelligent applications, built exclusively for Federally Qualified Health Centers.',
  'meta description 1')

r('Quantum 5D Consulting \u2014 AI systems that deliver',
  'Quantum5D.ai \u2014 The AI Operating System for FQHCs',
  'og:title')

r('Clinical, compliance & governance expertise, engineered into systems that deliver. Explore live healthcare-AI prototypes.',
  'One platform. Twenty-plus intelligent applications. Built exclusively for FQHCs.',
  'og:description')

r('Minority-, pharmacist-, and woman-owned consulting firm specializing in 340B optimization, regulatory compliance, pharmacy management, and custom AI tooling \u2014 nationwide.',
  'Quantum5D.ai \u2014 the AI operating system for FQHCs. One platform connecting operations, compliance, pharmacy, governance, finance, and population health.',
  'meta description 2')

# ====================================================================
print("=== 2. NAVIGATION ===")
# ====================================================================

r('<div class="wm">Quantum 5D<small>Consulting</small></div>',
  '<div class="wm">Quantum5D<small>.ai</small></div>',
  'brand subtitle')

r('<a href="#work">Work</a><a href="#services">Services</a><a href="#partners">Partners</a><a href="#about">About</a>',
  '<a href="#platform">Platform</a><a href="#applications">Applications</a><a href="#innovation-partners">Innovation Partners</a><a href="#services">Services</a><a href="#about">About</a>',
  'nav links')

r('<a class="btn btn-primary" href="#contact">Start a conversation</a>',
  '<a class="btn btn-primary" href="#innovation-partners">Partner with us</a>',
  'nav CTA')

# Add hamburger button
r('</div>\n</div></nav>',
  '</div>\n  <button class="nav-toggle" onclick="document.querySelector(\'.nav-links\').classList.toggle(\'nav-open\')" aria-label="Menu">\n    <span></span><span></span><span></span>\n  </button>\n</div></nav>',
  'hamburger button')

# ====================================================================
print("=== 3. HERO ===")
# ====================================================================

r('<p class="eyebrow">FQHC \xb7 340B \xb7 compliance &amp; governance \xb7 AI systems</p>',
  '<p class="eyebrow">PURPOSE-BUILT FOR FEDERALLY QUALIFIED HEALTH CENTERS</p>',
  'hero eyebrow')

r('<h1>Clinical, compliance &amp; governance expertise, <em>engineered into systems that deliver.</em></h1>',
  '<h1>The AI Operating System <em>for Federally Qualified Health Centers.</em></h1>',
  'hero headline')

r('<div class="tagline">Delivering quantum leap ROI.</div>',
  '',
  'remove tagline')

r('<p class="lead">Quantum 5D Consulting is a minority-, pharmacist-, and woman-owned advisory firm. We optimize 340B, master the regulatory landscape, and build the tools that turn FQHC operations into measurable return.</p>',
  '<p class="lead" style="font-size:20px;color:#E2E0F0;max-width:48ch;margin:18px 0 0;line-height:1.5;font-family:\'Cormorant Garamond\',serif;font-style:italic">One platform. Twenty-plus intelligent applications.<br>Built exclusively for FQHCs.</p>\n    <p class="lead">Purpose-built intelligence that connects operations, compliance, pharmacy, governance, finance, and population health through one unified platform.</p>',
  'hero lead')

r('<a class="btn btn-primary" href="#work">See the work \u2192</a>',
  '<a class="btn btn-primary" href="#platform">Explore the platform \u2192</a>\n      <a class="btn btn-ghost" href="#applications" style="border-color:rgba(255,255,255,.3)">View applications</a>',
  'hero primary CTA')

r('<a class="btn btn-ghost" href="#contact">Book a consult</a>',
  '<a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3)">Become an innovation partner</a>',
  'hero secondary CTA')

# ====================================================================
print("=== 4. PLATFORM SECTION (insert after hero) ===")
# ====================================================================

platform_html = '''</header>

<!-- PLATFORM -->
<section class="sec" id="platform" style="background:#fff;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Platform architecture</p>
    <h2>The world before the applications</h2>
    <p>Great infrastructure comes before great products. Quantum5D.ai is built on a shared foundation that every application inherits \u2014 so intelligence compounds, governance is consistent, and no application becomes an island.</p>
  </div>

  <div style="background:linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%);color:#fff;border-radius:18px;padding:32px 36px;margin-bottom:36px;text-align:center">
    <p style="font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#E2E0F0;margin:0 0 8px;line-height:1.5">\u201cTurning prototypes into infrastructure.\u201d</p>
    <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin:0">The Quantum5D.ai philosophy</p>
  </div>

  <div style="margin-bottom:28px">
    <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;font-weight:600">Platform Services \u2014 The Foundation</div>
    <div style="display:grid;gap:12px;grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
      <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:12px;padding:18px 20px;text-align:center">
        <div style="font-size:20px;margin-bottom:6px">&#x1F510;</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">Identity</div>
        <div style="font-size:11px;color:#C4B5FD;line-height:1.4">Authentication, role-based access, audit trails</div>
      </div>
      <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:12px;padding:18px 20px;text-align:center">
        <div style="font-size:20px;margin-bottom:6px">&#x1F9E0;</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">Knowledge Engine</div>
        <div style="font-size:11px;color:#C4B5FD;line-height:1.4">HRSA, CMS, 340B, pharmacy regs, org policies</div>
      </div>
      <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:12px;padding:18px 20px;text-align:center">
        <div style="font-size:20px;margin-bottom:6px">&#x2699;&#xFE0F;</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">AI Agents</div>
        <div style="font-size:11px;color:#C4B5FD;line-height:1.4">Analysis, scoring, recommendations, human override</div>
      </div>
      <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:12px;padding:18px 20px;text-align:center">
        <div style="font-size:20px;margin-bottom:6px">&#x1F504;</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">Workflow</div>
        <div style="font-size:11px;color:#C4B5FD;line-height:1.4">Orchestration, alerts, task routing, status tracking</div>
      </div>
      <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:12px;padding:18px 20px;text-align:center">
        <div style="font-size:20px;margin-bottom:6px">&#x1F3E5;</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">FHIR Integration</div>
        <div style="font-size:11px;color:#C4B5FD;line-height:1.4">EHR, pharmacy systems, secure data exchange</div>
        <div style="margin-top:4px"><span class="badge b-dev" style="font-size:9px;padding:1px 6px">Planned</span></div>
      </div>
      <div style="background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border-radius:12px;padding:18px 20px;text-align:center">
        <div style="font-size:20px;margin-bottom:6px">&#x1F4DC;</div>
        <div style="font-weight:700;font-size:14px;margin-bottom:4px">Policy Engine</div>
        <div style="font-size:11px;color:#C4B5FD;line-height:1.4">Rules, citations, governance, explainability</div>
      </div>
    </div>
  </div>

  <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;font-weight:600">Architecture Layers</div>
  <div style="display:grid;gap:12px;grid-template-columns:1fr">
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Experience Layer</div><span class="badge b-proto" style="font-size:9px;padding:1px 6px">Available</span></div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">Executive dashboards \xb7 Operational workspaces \xb7 Reviewer interfaces \xb7 Role-based views</div>
      <div style="font-size:12.5px;color:var(--text-3)">How leaders and staff interact with the platform \u2014 designed for FQHC decision-making.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Application Layer</div><span class="badge b-proto" style="font-size:9px;padding:1px 6px">15 applications</span></div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">Coverage \xb7 Compliance \xb7 Governance \xb7 Pharmacy \xb7 Strategy \xb7 Finance \xb7 Population Health</div>
      <div style="font-size:12.5px;color:var(--text-3)">Purpose-built applications addressing high-value FQHC problems \u2014 each built on shared platform services.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Intelligence Layer</div><span class="badge b-proto" style="font-size:9px;padding:1px 6px">Active</span></div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">AI-assisted analysis \xb7 Risk scoring \xb7 Document intelligence \xb7 Recommendation logic</div>
      <div style="font-size:12.5px;color:var(--text-3)">Every recommendation governed by rules, evidence, and human oversight \u2014 the AI reasons, a human decides.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Knowledge Layer</div><span class="badge b-design" style="font-size:9px;padding:1px 6px">Building</span></div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">HRSA requirements \xb7 CMS rules \xb7 340B \xb7 Pharmacy regulations \xb7 Quality standards</div>
      <div style="font-size:12.5px;color:var(--text-3)">One governance engine that every application reasons from \u2014 the compound advantage that gets harder to replicate over time.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px"><div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Integration & Security</div><span class="badge b-dev" style="font-size:9px;padding:1px 6px">Planned</span></div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">EHR/EMR \xb7 Pharmacy systems \xb7 FHIR APIs \xb7 Identity & access \xb7 Audit trails</div>
      <div style="font-size:12.5px;color:var(--text-3)">Secure data exchange and governance controls designed for healthcare data requirements.</div>
    </div>
  </div>

  <div style="margin-top:32px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:24px;text-align:center">
    <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin-bottom:12px">Build Progress</div>
    <div style="display:flex;justify-content:center;gap:6px;flex-wrap:wrap;max-width:600px;margin:0 auto">
      <div style="background:#059669;color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600">\u2713 Vision</div>
      <div style="background:#059669;color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600">\u2713 Domains</div>
      <div style="background:#059669;color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600">\u2713 Platform</div>
      <div style="background:#2563eb;color:#fff;padding:6px 14px;border-radius:20px;font-size:12px;font-weight:600;border:2px solid #93C5FD">\u25B6 Governance</div>
      <div style="background:var(--line);color:var(--text-3);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:500">Populate</div>
      <div style="background:var(--line);color:var(--text-3);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:500">Empower</div>
      <div style="background:var(--line);color:var(--text-3);padding:6px 14px;border-radius:20px;font-size:12px;font-weight:500">Scale</div>
    </div>
    <p style="font-size:12px;color:var(--text-3);margin:12px 0 0;font-style:italic">Currently encoding governance \u2014 building the knowledge engine that every application will reason from.</p>
  </div>
</div></section>'''

r('</header>', platform_html, 'platform section after hero')

# ====================================================================
print("=== 5. COVERAGEGUARD IQ SPOTLIGHT (before applications) ===")
# ====================================================================

coverageguard_html = '''<!-- COVERAGEGUARD IQ SPOTLIGHT -->
<section class="sec" id="coverageguard" style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);color:#fff"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow" style="color:var(--purple-soft)">Flagship application</p>
    <h2 style="color:#fff">CoverageGuard IQ</h2>
    <p style="color:#CFCAE6">FQHC-native coverage intelligence designed to reduce preventable Medicaid coverage loss during redetermination.</p>
  </div>
  <div style="display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));margin-top:24px">
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:22px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Problem</div>
      <p style="font-size:14px;color:#E2E0F0;line-height:1.6;margin:0">Eligible patients lose Medicaid coverage during redetermination because of fragmented eligibility data, stale contact information, incomplete outreach, inconsistent follow-up, and unclear ownership.</p>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:22px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Solution</div>
      <p style="font-size:14px;color:#E2E0F0;line-height:1.6;margin:0">An FQHC-native coverage-intelligence workflow designed to identify at-risk patients, reconcile available data, prioritize outreach, track interventions, and measure coverage outcomes.</p>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:22px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Intended users</div>
      <p style="font-size:14px;color:#E2E0F0;line-height:1.6;margin:0">FQHC executives \xb7 Revenue-cycle leaders \xb7 Population-health teams \xb7 Eligibility teams \xb7 Pharmacy leaders \xb7 Health plan partners</p>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:22px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px">Intended pilot measures</div>
      <p style="font-size:14px;color:#E2E0F0;line-height:1.6;margin:0">Patients evaluated \xb7 At-risk identified \xb7 Contact records corrected \xb7 Outreach completion \xb7 Recertification rate \xb7 Coverage retained \xb7 Revenue protected \xb7 Staff time saved</p>
    </div>
  </div>
  <div style="text-align:center;margin-top:32px">
    <span class="badge b-pilot" style="font-size:12px;padding:4px 14px">Pilot-ready</span>
    <div style="margin-top:16px">
      <a class="btn btn-primary" href="#innovation-partners" style="margin-right:12px">Discuss a CoverageGuard IQ pilot</a>
      <a class="btn btn-ghost" onclick="var t=TOOLS.find(function(x){return x.id===\'coverage\'});if(t)openModal(t);" style="cursor:pointer;border-color:rgba(255,255,255,.3);color:#fff">Launch interactive demo</a>
    </div>
  </div>
</div></section>

<!-- APPLICATIONS -->
'''

r('<section class="sec" id="work"><div class="wrap">',
  coverageguard_html + '<section class="sec" id="applications"><div class="wrap">',
  'coverageguard + applications section')

# ====================================================================
print("=== 6. APPLICATIONS SECTION TEXT ===")
# ====================================================================

r('<p class="eyebrow">Selected work</p>',
  '<p class="eyebrow">Platform applications</p>',
  'apps eyebrow')

r("<h2>Tools we've designed and shipped</h2>",
  '<h2>Applications built for the FQHC operating environment</h2>',
  'apps heading')

r('Most consultants hand you a slide deck. We hand you systems \u2014 several already running in live healthcare operations. Tools are grouped by focus below; open a category and tap any card to launch its live, interactive demo right here.',
  'Explore purpose-built applications addressing coverage retention, regulatory readiness, governance, pharmacy operations, executive decision support, and organizational sustainability. Applications are grouped by focus below; open a category and select any card to launch its interactive demonstration.',
  'apps subtext')

# ====================================================================
print("=== 7. SERVICES ===")
# ====================================================================

r('<p class="eyebrow">How we help</p>',
  '<p class="eyebrow">Expert services</p>',
  'services eyebrow')

r('<h2>Where Quantum 5D plugs in</h2>',
  '<h2>Services that help health centers adopt, operationalize, and scale the platform</h2>',
  'services heading')

r('From a focused strategy sprint to a full build-and-handoff \u2014 anchored in deep pharmacy and 340B fluency, and the rare ability to actually ship software.',
  'Expert advisory and implementation services anchored in deep FQHC pharmacy, 340B, and regulatory fluency \u2014 designed to support platform adoption and operational transformation.',
  'services subtext')

r('{n:"04",h:"Custom AI tooling",p:"From napkin idea to a working tool your team adopts \u2014 prototyped fast, built to last, handed off clean."}',
  '{n:"04",h:"Platform implementation & AI workflow design",p:"From workflow problem to working application \u2014 prototyped fast, validated with real users, designed to scale."}',
  'service 4')

r("'+items.length+' tool'+(items.length>1?'s':'')+'" ,
  "'+items.length+' application'+(items.length>1?'s':'')+'" ,
  'tools -> applications count')

r('Who we serve: <b>covered entities and FQHCs</b>, <b>contract pharmacies</b>, and <b>independent pharmacy owners</b> \u2014 nationwide.',
  'Serving: <b>FQHCs and covered entities</b>, <b>contract pharmacies</b>, and <b>independent pharmacy organizations</b> \u2014 nationwide.',
  'clients line')

# ====================================================================
print("=== 8. PARTNERS SECTION ===")
# ====================================================================

r('EMR, PMS, agency, FQHC, TPA, plan \u2014 or something we haven\'t named yet? <a href="#contact">Let\'s talk \u2192</a>',
  'EMR, PMS, agency, FQHC, TPA, plan \u2014 or something we haven\'t named yet? <a href="#innovation-partners">Explore partnership \u2192</a>',
  'partners CTA')

# ====================================================================
print("=== 9. INNOVATION PARTNERS SECTION (before About) ===")
# ====================================================================

innovation_html = '''<!-- INNOVATION PARTNERS -->
<section class="sec" id="innovation-partners" style="background:linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%);color:#fff"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow" style="color:var(--purple-soft)">Founding Innovation Partner Program</p>
    <h2 style="color:#fff">Help shape the future operating platform for FQHCs</h2>
    <p style="color:#CFCAE6">Quantum5D.ai is selecting a small group of forward-thinking health centers to co-design, validate, and pilot applications created specifically for the FQHC environment.</p>
  </div>
  <div style="display:grid;gap:20px;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));margin-top:28px">
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:24px">
      <h3 style="color:#fff;font-size:17px;margin:0 0 10px">Ideal partners</h3>
      <ul style="color:#CFCAE6;font-size:14px;line-height:1.8;padding-left:18px;margin:0">
        <li>Multi-site FQHCs</li>
        <li>Health centers with executive sponsorship</li>
        <li>Organizations experiencing measurable operational or coverage challenges</li>
        <li>FQHCs interested in AI-assisted workflows</li>
        <li>Organizations willing to participate in structured evaluation</li>
      </ul>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:24px">
      <h3 style="color:#fff;font-size:17px;margin:0 0 10px">Partner participation</h3>
      <ul style="color:#CFCAE6;font-size:14px;line-height:1.8;padding-left:18px;margin:0">
        <li>Define and validate priority use cases</li>
        <li>Participate in workflow-discovery sessions</li>
        <li>Review prototypes and pilot selected applications</li>
        <li>Provide implementation feedback</li>
        <li>Participate in outcome measurement</li>
      </ul>
    </div>
    <div style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:24px">
      <h3 style="color:#fff;font-size:17px;margin:0 0 10px">Partner benefits</h3>
      <ul style="color:#CFCAE6;font-size:14px;line-height:1.8;padding-left:18px;margin:0">
        <li>Early access to selected applications</li>
        <li>Direct influence over product development</li>
        <li>Preferred founding-partner terms</li>
        <li>Dedicated implementation support</li>
        <li>Priority access to future modules</li>
      </ul>
    </div>
  </div>
  <div style="max-width:580px;margin:40px auto 0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:32px">
    <h3 style="color:#fff;text-align:center;margin:0 0 6px">Apply to become a founding innovation partner</h3>
    <p style="color:#CFCAE6;text-align:center;font-size:13px;margin:0 0 24px">We review every application and respond within five business days.</p>
    <div class="form">
      <div class="form-row"><div class="field"><label>Name</label><input id="ip-name" placeholder="Your full name"></div><div class="field"><label>Title</label><input id="ip-title" placeholder="Your role"></div></div>
      <div class="form-row"><div class="field"><label>Organization</label><input id="ip-org" placeholder="Health center name"></div><div class="field"><label>Email</label><input id="ip-email" placeholder="you@org.com"></div></div>
      <div class="form-row"><div class="field"><label>Number of sites</label><input id="ip-sites" placeholder="e.g. 5" type="number"></div><div class="field"><label>State</label><input id="ip-state" placeholder="e.g. Maryland"></div></div>
      <div class="field"><label>Priority operational challenge</label><textarea id="ip-challenge" rows="2" placeholder="What operational, coverage, compliance, or financial challenge is most pressing?"></textarea></div>
      <div class="field"><label>Area of interest</label><select id="ip-interest" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);border-radius:8px;padding:10px 12px;color:#fff;font-size:14px;font-family:Inter,sans-serif"><option value="">Select an area</option><option value="coverage">Coverage & Patient Access</option><option value="compliance">Compliance & Regulatory Readiness</option><option value="governance">Governance & Executive Intelligence</option><option value="pharmacy">Pharmacy & Clinical Operations</option><option value="strategy">Strategy, Finance & Sustainability</option><option value="multiple">Multiple areas</option></select></div>
      <div class="field" style="display:none"><input id="ip-hp" placeholder="Leave blank" tabindex="-1" autocomplete="off"></div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px"><input type="checkbox" id="ip-consent" style="width:auto;margin:0"><label for="ip-consent" style="font-size:12px;color:#CFCAE6;cursor:pointer">I consent to follow-up communication regarding the Innovation Partner Program.</label></div>
      <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="submitPartnerApplication()">Submit application \u2192</button>
      <div id="ip-note" style="font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--purple-soft);text-align:center;margin-top:10px"></div>
    </div>
  </div>
</div></section>

<!-- ABOUT -->'''

r('<!-- ABOUT -->', innovation_html, 'innovation partners section')

# ====================================================================
print("=== 10. ABOUT / FOUNDER ===")
# ====================================================================

r('<p class="eyebrow" style="color:var(--purple-soft)">The operator behind the build</p>',
  '<p class="eyebrow" style="color:var(--purple-soft)">Founder</p>',
  'about eyebrow')

r('<div class="role">Founder &amp; Principal \xb7 Quantum 5D Consulting, LLC</div>',
  '<div class="role">Founder &amp; CEO \xb7 Quantum5D.ai</div>',
  'founder role')

r("A pharmacy executive who doesn't just advise on 340B and operations \u2014 but designs and builds the systems that run them. That operator-builder combination is the difference: strategy drawn from inside the work, delivered as tools your team can actually adopt.",
  'Dr. Adetoro Oriaifo is an FQHC pharmacy executive, healthcare operator, and technology builder with experience spanning pharmacy operations, 340B, Medicaid strategy, governance, regulatory compliance, clinical services, and organizational transformation. Quantum5D.ai was created from direct experience inside the workflows it is designed to improve.',
  'founder bio 1')

r('Expertise spans 340B program management, specialty pharmacy, FQHC operations, payer partnerships, Medicaid strategy, governance, and AI-enabled workflow \u2014 for organizations nationwide.',
  'Expertise spans 340B program management, specialty pharmacy, FQHC operations, payer partnerships, Medicaid strategy, governance, and AI-enabled workflow design \u2014 serving organizations nationwide.',
  'founder bio 2')

# ====================================================================
print("=== 11. CONTACT ===")
# ====================================================================

r('<p class="eyebrow" style="color:var(--purple-soft)">Start a conversation</p>',
  '<p class="eyebrow" style="color:var(--purple-soft)">Get in touch</p>',
  'contact eyebrow')

r('<h2>Have a problem worth building for?</h2>',
  '<h2>Start a conversation</h2>',
  'contact heading')

r("Tell us what's slowing your pharmacy or covered entity down. We'll tell you honestly whether it's a strategy fix, a build, or neither.",
  "Whether you're exploring a pilot, interested in partnership, or want to discuss how Quantum5D.ai can support your health center \u2014 we'd like to hear from you.",
  'contact subtext')

# ====================================================================
print("=== 12. FOOTER ===")
# ====================================================================

r('\xa9 <span id="yr"></span> Quantum 5D Consulting, LLC \xb7 Minority-, Pharmacist- &amp; Woman-Owned \xb7 Nationwide',
  '\xa9 <span id="yr"></span> Quantum5D.ai \xb7 Minority-, Pharmacist- &amp; Woman-Owned \xb7 Nationwide',
  'footer')

# ====================================================================
print("=== 13. TOOLS -> APPLICATIONS DATA + MATURITY ===")
# ====================================================================

# This is handled by the separate update_tools.py script
# Run it after this script

# ====================================================================
print("=== 14. BADGE CSS ===")
# ====================================================================

r('.b-soon{background:#F1F1F3;color:var(--charcoal)}',
  '.b-soon{background:#F1F1F3;color:var(--charcoal)}\n.b-active{background:#D1FAE5;color:#065F46}\n.b-pilot{background:#DBEAFE;color:#1E40AF}\n.b-proto{background:#ECE8FA;color:var(--purple-deep)}\n.b-design{background:#FEF3C7;color:#92400E}\n.b-concept{background:#F1F5F9;color:#475569}\n.b-dev{background:#F1F5F9;color:#64748B}',
  'maturity badge CSS')

# ====================================================================
print("=== 15. CARD RENDERING (maturity badges) ===")
# ====================================================================

r("""el.innerHTML='<span class="badge '+(t.live?'b-live':'b-soon')+'">'+(t.live?'Interactive demo':'Preview')+'</span>'+""",
  """var mc=MATURITY_CONFIG[t.maturity]||MATURITY_CONFIG['interactive_prototype'];
    el.innerHTML='<span class="badge '+mc.cls+'">'+mc.label+'</span>'+""",
  'card badge rendering')

r("""'<p class="eyebrow">'+(t.live?'Interactive demo':'Case preview')+'</p>'+""",
  """'<p class="eyebrow">'+((MATURITY_CONFIG[t.maturity]||{}).label||'Interactive demonstration')+'</p>'+""",
  'modal badge')

# ====================================================================
print("=== 16. MOBILE NAV CSS FIX ===")
# ====================================================================

# Replace the simple display:none with full mobile nav styles
r('  .nav-links a{display:none}',
  '  .nav-toggle{display:flex;flex-direction:column;gap:5px;background:none;border:none;cursor:pointer;padding:8px}\n  .nav-toggle span{display:block;width:22px;height:2px;background:#fff;border-radius:2px;transition:all .2s}\n  .nav-links{display:none;position:absolute;top:100%;left:0;right:0;background:var(--navy);padding:16px 24px;flex-direction:column;gap:8px;border-top:1px solid rgba(255,255,255,.1)}\n  .nav-links.nav-open{display:flex}\n  .nav-links a{display:block;padding:10px 0;font-size:15px}\n  .nav-links .btn{text-align:center;margin-top:8px}',
  'mobile nav styles')

# Desktop: hide hamburger
r_all('.nav-links a{margin-left:18px;',
  '.nav-toggle{display:none}\n.nav-links a{margin-left:18px;',
  'desktop hide hamburger')

# ====================================================================
print("=== 17. PARTNER FORM JS ===")
# ====================================================================

partner_js = '''
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
    interest:document.getElementById('ip-interest').value
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
      message:'INNOVATION PARTNER APPLICATION\\nTitle: '+fields.title+'\\nSites: '+fields.sites+'\\nState: '+fields.state+'\\nArea of interest: '+fields.interest+'\\nPriority challenge: '+fields.challenge
    })
  }).then(function(r){return r.json();}).then(function(d){
    document.getElementById('ip-note').textContent='Application received. We will be in touch within five business days.';
  }).catch(function(){
    document.getElementById('ip-note').textContent='Something went wrong. Please email hello@quantum5d.ai directly.';
  });
}

'''

r('function sendInquiry(){', partner_js + 'function sendInquiry(){', 'partner form JS')

# ====================================================================
# WRITE
# ====================================================================

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"ALL DONE. {step} replacements applied.")
print(f"File size: {len(content)} chars")
print(f"{'='*60}")
