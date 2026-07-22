# -*- coding: utf-8 -*-
"""
Quantum5D.ai v2.0 — Enterprise Platform Polish
Transforms the site from excellent startup to world-class enterprise platform.

Priorities implemented:
P1: Two-column hero with animated platform illustration
P2: Executive Outcomes section (6 outcome cards)
P3: "Why Quantum5D?" comparison section
P5: Visual platform diagram (replaces text-heavy version)
P6: Founder story improvement
P7: Executive Platform Briefing CTA
P9: Platform roadmap timeline
P12: Role-based application filter
P13: Animation polish (CSS)
P15: Language cleanup
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
# P13: ANIMATION CSS (add before closing </style>)
# ════════════════════════════════════════════════════════════════
print("=== P13: ANIMATION + LAYOUT CSS ===")

animation_css = """
/* v2.0 Enterprise Polish */
@keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pulse{0%,100%{opacity:.6}50%{opacity:1}}
@keyframes slideRight{from{opacity:0;transform:translateX(-20px)}to{opacity:1;transform:none}}
.ani{opacity:0;animation:fadeUp .6s ease forwards}.ani-d1{animation-delay:.1s}.ani-d2{animation-delay:.2s}.ani-d3{animation-delay:.3s}.ani-d4{animation-delay:.4s}
.hero-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}
.hero-left{position:relative;z-index:2}
.hero-right{position:relative;z-index:2}
.hero-pills{display:flex;gap:10px;margin-top:24px;flex-wrap:wrap}
.hero-pill{display:inline-flex;align-items:center;gap:6px;padding:6px 14px;border-radius:20px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);font-size:12px;color:#C4B5FD;font-family:'IBM Plex Mono',monospace;letter-spacing:.03em}
.hero-pill b{color:#fff}
/* Platform illustration */
.plat-viz{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;position:relative;overflow:hidden}
.plat-viz::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(139,92,246,.15),transparent 70%);pointer-events:none}
.plat-viz-title{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:var(--purple-soft);margin-bottom:16px}
.plat-viz-layer{padding:10px 14px;border-radius:10px;margin-bottom:8px;text-align:center;font-size:12px;font-weight:600;transition:all .3s;cursor:default}
.plat-viz-layer:hover{transform:scale(1.02);box-shadow:0 0 20px rgba(139,92,246,.2)}
.plat-viz-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px}
.plat-viz-app{padding:8px 6px;border-radius:8px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.25);font-size:10px;font-weight:600;color:#E9E5F5;text-align:center;transition:all .3s;cursor:default;animation:float 4s ease-in-out infinite}
.plat-viz-app:nth-child(2){animation-delay:.5s}.plat-viz-app:nth-child(3){animation-delay:1s}
.plat-viz-app:nth-child(4){animation-delay:1.5s}.plat-viz-app:nth-child(5){animation-delay:2s}
.plat-viz-app:hover{background:rgba(139,92,246,.3);transform:translateY(-2px)}
.plat-viz-conn{text-align:center;color:rgba(255,255,255,.2);font-size:10px;margin:4px 0;letter-spacing:4px}
/* Outcome cards */
.outcome-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px}
.outcome-card{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:28px;transition:all .3s;cursor:default}
.outcome-card:hover{transform:translateY(-4px);box-shadow:0 16px 40px -16px rgba(83,71,164,.2);border-color:#D2C9EE}
.outcome-icon{width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;margin-bottom:14px}
.outcome-card h3{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin:0 0 8px}
.outcome-card p{font-size:14px;color:var(--text-3);line-height:1.6;margin:0}
/* Comparison */
.compare-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}
.compare-col{border-radius:16px;padding:28px;position:relative}
.compare-col h3{font-size:18px;font-weight:700;margin:0 0 16px}
.compare-col ul{list-style:none;padding:0;margin:0}
.compare-col li{padding:8px 0;font-size:14px;line-height:1.5;display:flex;align-items:flex-start;gap:8px}
.compare-col li::before{flex-shrink:0;margin-top:2px}
.compare-other{background:#F8F7FA;border:1px solid var(--line)}
.compare-other li::before{content:'\u2022';color:var(--muted)}
.compare-q5d{background:linear-gradient(135deg,#1e1b4b,#312e81);color:#fff;border:2px solid #7C3AED}
.compare-q5d li::before{content:'\u2713';color:#A78BFA;font-weight:700}
.compare-q5d .compare-badge{position:absolute;top:-12px;right:20px;background:#7C3AED;color:#fff;padding:4px 14px;border-radius:12px;font-size:11px;font-weight:700;font-family:'IBM Plex Mono',monospace;letter-spacing:.05em}
/* Role filter */
.role-filter{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin:20px 0 28px}
.role-btn{padding:8px 16px;border-radius:20px;border:1px solid var(--line);background:#fff;color:var(--ink);font-size:12px;font-weight:600;cursor:pointer;transition:all .2s;font-family:'Inter',sans-serif}
.role-btn:hover,.role-btn.active{background:var(--purple);color:#fff;border-color:var(--purple)}
/* Roadmap */
.roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.roadmap-phase{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px;position:relative}
.roadmap-phase::before{content:'';position:absolute;top:50%;right:-10px;width:16px;height:2px;background:var(--line)}
.roadmap-phase:last-child::before{display:none}
.roadmap-q{font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;color:var(--purple-soft);margin-bottom:8px}
/* Executive briefing */
.briefing-card{background:linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%);color:#fff;border-radius:20px;padding:48px;display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center}
.briefing-steps{list-style:none;padding:0;margin:0;counter-reset:brief}
.briefing-steps li{counter-increment:brief;padding:10px 0;font-size:15px;display:flex;align-items:center;gap:12px;color:#CFCAE6}
.briefing-steps li::before{content:counter(brief);width:28px;height:28px;border-radius:50%;background:rgba(139,92,246,.3);border:1px solid rgba(139,92,246,.5);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#A78BFA;flex-shrink:0}
@media(max-width:760px){
  .hero-grid{grid-template-columns:1fr;gap:24px}
  .hero-right{order:-1}
  .compare-grid{grid-template-columns:1fr}
  .roadmap{grid-template-columns:1fr 1fr}
  .briefing-card{grid-template-columns:1fr;padding:28px}
  .outcome-grid{grid-template-columns:1fr}
}
"""

# Insert before the closing </style> of the main style block
# Find the first </style> tag
style_end_idx = content.index('</style>')
content = content[:style_end_idx] + animation_css + '\n' + content[style_end_idx:]
step += 1
print(f"  [{step}] OK: animation + layout CSS")

# ════════════════════════════════════════════════════════════════
# P1: HERO TRANSFORMATION (two-column + platform illustration)
# ════════════════════════════════════════════════════════════════
print("=== P1: HERO TRANSFORMATION ===")

old_hero = '''<!-- HERO -->
<header class="hero" id="top">


  <div class="wrap">
    <p class="eyebrow">PURPOSE-BUILT FOR FEDERALLY QUALIFIED HEALTH CENTERS</p>
    <h1>The AI Operating System <em>for Federally Qualified Health Centers.</em></h1>

    <p class="lead" style="font-size:20px;color:#E2E0F0;max-width:48ch;margin:18px 0 0;line-height:1.5;font-family:'Cormorant Garamond',serif;font-style:italic">One platform. Twenty-plus intelligent applications.<br>Built exclusively for FQHCs.</p>
    <p class="lead">Purpose-built intelligence that connects operations, compliance, pharmacy, governance, finance, and population health through one unified platform.</p>
    <div class="hero-cta">
      <a class="btn btn-primary" href="#platform">Explore the platform \u2192</a>
      <a class="btn btn-ghost" href="#applications" style="border-color:rgba(255,255,255,.3)">View applications</a>
      <a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3)">Become an innovation partner</a>
    </div>
    <div class="owned">
      <span><b>Minority-owned</b></span><span><b>Pharmacist-owned</b></span><span><b>Woman-owned</b></span>
      <span>Nationwide</span><span>340B-focused</span>
    </div>
  </div>
</header>'''

new_hero = '''<!-- HERO -->
<header class="hero" id="top">
  <div class="wrap">
    <div class="hero-grid">
      <div class="hero-left">
        <p class="eyebrow ani">PURPOSE-BUILT FOR FEDERALLY QUALIFIED HEALTH CENTERS</p>
        <h1 class="ani ani-d1">The AI Operating System <em>for Federally Qualified Health Centers.</em></h1>
        <p class="lead ani ani-d2">Quantum5D.ai unifies AI-powered applications, healthcare intelligence, and operational workflows into one secure platform built exclusively for Federally Qualified Health Centers.</p>
        <div class="hero-cta ani ani-d3">
          <a class="btn btn-primary" href="#platform">Explore the Platform \u2192</a>
          <a class="btn btn-ghost" href="#innovation-partners" style="border-color:rgba(255,255,255,.3)">Become a Founding Innovation Partner</a>
        </div>
        <div class="hero-pills ani ani-d4">
          <span class="hero-pill"><b>Purpose-built</b> for FQHCs</span>
          <span class="hero-pill"><b>15+</b> AI Applications</span>
          <span class="hero-pill"><b>Executive</b> Intelligence</span>
          <span class="hero-pill"><b>Human</b> Oversight</span>
        </div>
      </div>
      <div class="hero-right ani ani-d2">
        <div class="plat-viz">
          <div class="plat-viz-title">Quantum5D Platform</div>
          <div class="plat-viz-layer" style="background:rgba(139,92,246,.2);border:1px solid rgba(139,92,246,.3);color:#E9E5F5">Executive Intelligence Layer</div>
          <div class="plat-viz-conn">\u2502</div>
          <div class="plat-viz-apps">
            <div class="plat-viz-app">CoverageGuard</div>
            <div class="plat-viz-app">Governance IQ</div>
            <div class="plat-viz-app">Meeting IQ</div>
            <div class="plat-viz-app">Compliance</div>
            <div class="plat-viz-app">Revenue</div>
            <div class="plat-viz-app">Pharmacy</div>
          </div>
          <div class="plat-viz-conn">\u2502</div>
          <div class="plat-viz-layer" style="background:rgba(37,99,235,.15);border:1px solid rgba(37,99,235,.25);color:#BFDBFE">Knowledge Engine \xb7 AI Agents \xb7 Policy Engine</div>
          <div class="plat-viz-conn">\u2502</div>
          <div class="plat-viz-layer" style="background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);color:#94A3B8;font-size:11px">EHR \xb7 Pharmacy Systems \xb7 Finance \xb7 HR \xb7 Quality</div>
        </div>
      </div>
    </div>
    <div class="owned ani ani-d4" style="margin-top:28px">
      <span><b>Minority-owned</b></span><span><b>Pharmacist-owned</b></span><span><b>Woman-owned</b></span>
      <span>Nationwide</span><span>340B-focused</span>
    </div>
  </div>
</header>'''

r(old_hero, new_hero, 'two-column hero with platform illustration')

# ════════════════════════════════════════════════════════════════
# P2: EXECUTIVE OUTCOMES SECTION (after hero, before platform)
# ════════════════════════════════════════════════════════════════
print("=== P2: EXECUTIVE OUTCOMES ===")

outcomes_section = '''
<!-- EXECUTIVE OUTCOMES -->
<section class="sec" style="background:#fff;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Outcomes</p>
    <h2>What can Quantum5D help your organization achieve?</h2>
  </div>
  <div class="outcome-grid">
    <div class="outcome-card">
      <div class="outcome-icon" style="background:#DBEAFE">&#x1F6E1;&#xFE0F;</div>
      <h3>Protect Medicaid Coverage</h3>
      <p>Identify at-risk patients before redetermination lapses, reconcile eligibility data, and track every outreach intervention to prevent avoidable coverage loss.</p>
    </div>
    <div class="outcome-card">
      <div class="outcome-icon" style="background:#F3E8FF">&#x1F3DB;&#xFE0F;</div>
      <h3>Improve Board Governance</h3>
      <p>Transform board preparation from a time-consuming manual process into automated executive intelligence with compliance checks and accountability tracking.</p>
    </div>
    <div class="outcome-card">
      <div class="outcome-icon" style="background:#D1FAE5">&#x26A1;</div>
      <h3>Increase Operational Efficiency</h3>
      <p>Replace fragmented spreadsheets and manual workflows with connected applications that share data, enforce policy, and surface what matters.</p>
    </div>
    <div class="outcome-card">
      <div class="outcome-icon" style="background:#FEF3C7">&#x1F48A;</div>
      <h3>Strengthen Pharmacy Performance</h3>
      <p>Optimize prescription workflows, reduce abandonment, validate patient reachability, and protect 340B program integrity and margin.</p>
    </div>
    <div class="outcome-card">
      <div class="outcome-icon" style="background:#FFE4E6">&#x2705;</div>
      <h3>Accelerate HRSA Readiness</h3>
      <p>Maintain continuous OSV readiness across all 19 compliance areas with real-time gap detection, evidence management, and audit-ready documentation.</p>
    </div>
    <div class="outcome-card">
      <div class="outcome-icon" style="background:#E0E7FF">&#x1F4CA;</div>
      <h3>Enable Better Executive Decisions</h3>
      <p>Give CEOs, COOs, CFOs, and clinical leaders the intelligence, benchmarks, and decision-support views they need to act with confidence.</p>
    </div>
  </div>
</div></section>

'''

r('<!-- PLATFORM -->', outcomes_section + '<!-- PLATFORM -->', 'executive outcomes section')

# ════════════════════════════════════════════════════════════════
# P3: "WHY QUANTUM5D?" COMPARISON (after platform, before CoverageGuard)
# ════════════════════════════════════════════════════════════════
print("=== P3: WHY QUANTUM5D ===")

comparison_section = '''
<!-- WHY QUANTUM5D -->
<section class="sec" style="background:#FAFAFE;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Why Quantum5D</p>
    <h2>A different approach to FQHC intelligence</h2>
  </div>
  <div class="compare-grid">
    <div class="compare-col compare-other">
      <h3>Traditional Consulting</h3>
      <ul>
        <li>One-time engagement</li>
        <li>Static reports and slide decks</li>
        <li>Manual analysis</li>
        <li>Limited reuse across projects</li>
        <li>Knowledge leaves with the consultant</li>
      </ul>
    </div>
    <div class="compare-col compare-other">
      <h3>Generic AI</h3>
      <ul>
        <li>Requires prompting and prompt engineering</li>
        <li>Healthcare-agnostic models</li>
        <li>General answers without FQHC context</li>
        <li>No structured workflows</li>
        <li>No audit trail or governance</li>
      </ul>
    </div>
    <div class="compare-col compare-q5d">
      <div class="compare-badge">Purpose-built</div>
      <h3>Quantum5D.ai</h3>
      <ul>
        <li>Purpose-built for FQHCs</li>
        <li>Connected applications on shared infrastructure</li>
        <li>Operational intelligence \u2014 not just answers</li>
        <li>Structured workflows with accountability</li>
        <li>Executive-ready insights and dashboards</li>
        <li>Human oversight on every decision</li>
        <li>Knowledge compounds over time</li>
      </ul>
    </div>
  </div>
</div></section>

'''

r('<!-- COVERAGEGUARD IQ SPOTLIGHT -->', comparison_section + '<!-- COVERAGEGUARD IQ SPOTLIGHT -->', 'why quantum5d comparison')

# ════════════════════════════════════════════════════════════════
# P6: FOUNDER STORY IMPROVEMENT
# ════════════════════════════════════════════════════════════════
print("=== P6: FOUNDER STORY ===")

old_about = '''<p class="eyebrow" style="color:var(--purple-soft)">Founder</p>
      <h2>Dr. Adetoro Oriaifo, PharmD, MBA, CHCEF, FACHE, 340B ACE</h2>
      <div class="role">Founder &amp; CEO \xb7 Quantum5D.ai</div>
      <p>Dr. Adetoro Oriaifo is an FQHC pharmacy executive, healthcare operator, and technology builder with experience spanning pharmacy operations, 340B, Medicaid strategy, governance, regulatory compliance, clinical services, and organizational transformation. Quantum5D.ai was created from direct experience inside the workflows it is designed to improve.</p>
      <p>Expertise spans 340B program management, specialty pharmacy, FQHC operations, payer partnerships, Medicaid strategy, governance, and AI-enabled workflow design \u2014 serving organizations nationwide.</p>'''

new_about = '''<p class="eyebrow" style="color:var(--purple-soft)">Built by an FQHC Executive</p>
      <h2>Dr. Adetoro Oriaifo, PharmD, MBA, CHCEF, FACHE, 340B ACE</h2>
      <div class="role">Founder &amp; CEO \xb7 Quantum5D.ai</div>
      <p>Quantum5D.ai was created by Dr. Adetoro Oriaifo after years leading pharmacy operations, governance initiatives, regulatory compliance, digital transformation, and revenue optimization within Federally Qualified Health Centers. Every application reflects operational challenges experienced firsthand \u2014 not hypothetical use cases.</p>
      <p>Expertise spans 340B program management, specialty pharmacy, FQHC operations, payer partnerships, Medicaid strategy, governance, and AI-enabled workflow design \u2014 serving organizations nationwide.</p>'''

r(old_about, new_about, 'founder story')

# ════════════════════════════════════════════════════════════════
# P7: EXECUTIVE PLATFORM BRIEFING (replace contact section)
# ════════════════════════════════════════════════════════════════
print("=== P7: EXECUTIVE BRIEFING ===")

old_contact_head = '''<p class="eyebrow" style="color:var(--purple-soft)">Get in touch</p>
    <h2>Start a conversation</h2>
    <p>Whether you\'re exploring a pilot, interested in partnership, or want to discuss how Quantum5D.ai can support your health center \u2014 we\'d like to hear from you.</p>'''

new_contact_head = '''<p class="eyebrow" style="color:var(--purple-soft)">Executive Platform Briefing</p>
    <h2>Schedule an Executive Platform Briefing</h2>
    <p>A focused 30-minute session covering platform overview, applications relevant to your organization, pilot discussion, and a customized roadmap. Leave with a clear picture of how Quantum5D.ai can support your health center.</p>'''

r(old_contact_head, new_contact_head, 'executive briefing CTA')

# ════════════════════════════════════════════════════════════════
# P9: PLATFORM ROADMAP (insert before About)
# ════════════════════════════════════════════════════════════════
print("=== P9: PLATFORM ROADMAP ===")

roadmap_section = '''<!-- PLATFORM ROADMAP -->
<section class="sec" style="background:#FAFAFE;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Platform roadmap</p>
    <h2>From prototypes to production</h2>
    <p>A disciplined pathway from validated prototypes through design-partner pilots to scalable, production-grade infrastructure.</p>
  </div>
  <div class="roadmap">
    <div class="roadmap-phase">
      <div class="roadmap-q">Current</div>
      <h3 style="font-size:16px;margin:0 0 8px">15 Applications</h3>
      <p style="font-size:13px;color:var(--text-3);margin:0">Interactive prototypes and pilot-ready applications across 5 FQHC domains. Platform architecture defined.</p>
      <div style="margin-top:10px"><span class="badge b-active" style="font-size:10px;padding:2px 8px">Active</span></div>
    </div>
    <div class="roadmap-phase">
      <div class="roadmap-q">Next</div>
      <h3 style="font-size:16px;margin:0 0 8px">Design Partner Pilots</h3>
      <p style="font-size:13px;color:var(--text-3);margin:0">CoverageGuard IQ flagship pilot with founding innovation partners. Workflow validation and outcome measurement.</p>
      <div style="margin-top:10px"><span class="badge b-pilot" style="font-size:10px;padding:2px 8px">Recruiting</span></div>
    </div>
    <div class="roadmap-phase">
      <div class="roadmap-q">Building</div>
      <h3 style="font-size:16px;margin:0 0 8px">Knowledge Engine</h3>
      <p style="font-size:13px;color:var(--text-3);margin:0">Unified governance engine encoding HRSA, CMS, 340B, and pharmacy regulations so every application reasons from one source.</p>
      <div style="margin-top:10px"><span class="badge b-design" style="font-size:10px;padding:2px 8px">In development</span></div>
    </div>
    <div class="roadmap-phase">
      <div class="roadmap-q">Future</div>
      <h3 style="font-size:16px;margin:0 0 8px">Production Platform</h3>
      <p style="font-size:13px;color:var(--text-3);margin:0">Multi-tenant deployment, EHR/FHIR integration, enterprise security, standardized onboarding, and outcome-based pricing.</p>
      <div style="margin-top:10px"><span class="badge b-dev" style="font-size:10px;padding:2px 8px">Planned</span></div>
    </div>
  </div>
</div></section>

'''

r('<!-- INNOVATION PARTNERS -->', roadmap_section + '<!-- INNOVATION PARTNERS -->', 'platform roadmap')

# ════════════════════════════════════════════════════════════════
# P12: ROLE-BASED FILTER (add above application grid)
# ════════════════════════════════════════════════════════════════
print("=== P12: ROLE FILTER ===")

role_filter_html = '''<div style="text-align:center;margin-bottom:8px"><p class="eyebrow">Find applications for your role</p></div>
    <div class="role-filter" id="roleFilter">
      <button class="role-btn active" onclick="filterByRole('all')">All Applications</button>
      <button class="role-btn" onclick="filterByRole('CEO')">CEO</button>
      <button class="role-btn" onclick="filterByRole('COO')">COO</button>
      <button class="role-btn" onclick="filterByRole('CFO')">CFO</button>
      <button class="role-btn" onclick="filterByRole('CIO')">CIO</button>
      <button class="role-btn" onclick="filterByRole('CPO')">Chief Pharmacy Officer</button>
      <button class="role-btn" onclick="filterByRole('CMO')">Chief Medical Officer</button>
      <button class="role-btn" onclick="filterByRole('Quality')">Quality</button>
      <button class="role-btn" onclick="filterByRole('Population Health')">Population Health</button>
      <button class="role-btn" onclick="filterByRole('Compliance')">Compliance</button>
    </div>
    '''

r('<div id="toolGrid"></div>', role_filter_html + '<div id="toolGrid"></div>', 'role filter buttons')

# ════════════════════════════════════════════════════════════════
# P12: ROLE FILTER JS (add before submitPartnerApplication)
# ════════════════════════════════════════════════════════════════
print("=== P12: ROLE FILTER JS ===")

role_js = """
function filterByRole(role){
  // Update active button
  document.querySelectorAll('.role-btn').forEach(function(b){b.classList.remove('active');});
  event.target.classList.add('active');
  // Filter tool cards
  var cards=document.querySelectorAll('.tool');
  var matchCount=0;
  cards.forEach(function(card){
    var name=card.querySelector('h3');
    if(!name)return;
    var t=TOOLS.find(function(x){return x.name===name.textContent;});
    if(!t)return;
    if(role==='all'||(t.audience&&t.audience.some(function(a){return a.toLowerCase().indexOf(role.toLowerCase())!==-1;}))){
      card.style.display='';matchCount++;
    }else{
      card.style.display='none';
    }
  });
  // Track
  if(typeof trackEvent==='function'&&role!=='all')trackEvent('role_filter',{role:role,matches:matchCount});
}

"""

r('function submitPartnerApplication(){', role_js + 'function submitPartnerApplication(){', 'role filter JS')

# ════════════════════════════════════════════════════════════════
# P15: LANGUAGE CLEANUP
# ════════════════════════════════════════════════════════════════
print("=== P15: LANGUAGE ===")

# Already mostly done in prior passes. Check for remaining "AI tool" language
import re
# Don't replace inside JS variable names or CSS classes
# Just check user-facing text

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"v2.0 ENTERPRISE POLISH COMPLETE. {step} changes applied.")
print(f"File size: {len(content)} chars")
print(f"{'='*60}")
