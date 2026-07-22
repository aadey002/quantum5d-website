"""Add Platform, Innovation Partners, and CoverageGuard IQ sections to the showcase site."""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# ─── 1. PLATFORM SECTION (insert between hero closing and applications section) ───
hero_end = '</header>'
platform_section = '''</header>

<!-- PLATFORM -->
<section class="sec" id="platform" style="background:#fff;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Platform architecture</p>
    <h2>One intelligence platform built for the FQHC operating environment</h2>
    <p>Quantum5D.ai provides the common infrastructure supporting all applications \u2014 purpose-built for the clinical, financial, regulatory, pharmacy, and governance complexity that defines health center operations.</p>
  </div>
  <div style="display:grid;gap:16px;grid-template-columns:1fr">
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 24px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Experience Layer</div>
      <div style="font-weight:600;margin-bottom:6px">Executive dashboards \xb7 Operational workspaces \xb7 Reviewer interfaces</div>
      <div style="font-size:13px;color:var(--text-3)">Role-based views, workflow alerts, interactive reports, and decision-support interfaces designed for FQHC leaders and staff.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 24px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Application Layer</div>
      <div style="font-weight:600;margin-bottom:6px">15 purpose-built applications across 5 FQHC domains</div>
      <div style="font-size:13px;color:var(--text-3)">Coverage retention, regulatory readiness, governance, pharmacy operations, and organizational strategy \u2014 each addressing a defined operational problem.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 24px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Intelligence Layer</div>
      <div style="font-weight:600;margin-bottom:6px">AI-assisted analysis \xb7 Policy engines \xb7 Document intelligence</div>
      <div style="font-size:13px;color:var(--text-3)">Risk scoring, recommendation logic, workflow orchestration, and human review controls \u2014 intelligence always governed by rules, evidence, and human oversight.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 24px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Knowledge Layer</div>
      <div style="font-weight:600;margin-bottom:6px">HRSA requirements \xb7 CMS & Medicaid rules \xb7 340B \xb7 Pharmacy regulations</div>
      <div style="font-size:13px;color:var(--text-3)">Organizational policies, quality standards, and evidence libraries \u2014 the regulatory and clinical knowledge that informs every recommendation.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:22px 24px">
      <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em;margin-bottom:6px">Integration & Security Layer <span class="badge b-dev" style="font-size:10px;padding:2px 8px;margin-left:8px">Planned capability</span></div>
      <div style="font-weight:600;margin-bottom:6px">EHR/EMR integration \xb7 Pharmacy systems \xb7 APIs \xb7 Secure data exchange</div>
      <div style="font-size:13px;color:var(--text-3)">Identity and access controls, audit trails, and governance controls \u2014 designed for healthcare data requirements.</div>
    </div>
  </div>
</div></section>'''

if hero_end in content:
    content = content.replace(hero_end, platform_section, 1)
    print("OK: Platform section inserted")
else:
    print("MISS: hero_end marker")

# ─── 2. COVERAGEGUARD IQ SPOTLIGHT (insert before applications grid) ───
apps_marker = '<section class="sec" id="applications"><div class="wrap">'
coverageguard_plus_apps = '''<!-- COVERAGEGUARD IQ SPOTLIGHT -->
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
      <a class="btn btn-ghost" onclick="var t=TOOLS.find(function(x){return x.id==='coverage'});if(t)openModal(t);" style="cursor:pointer;border-color:rgba(255,255,255,.3);color:#fff">Launch interactive demo</a>
    </div>
  </div>
</div></section>

<!-- APPLICATIONS -->
<section class="sec" id="applications"><div class="wrap">'''

if apps_marker in content:
    content = content.replace(apps_marker, coverageguard_plus_apps)
    print("OK: CoverageGuard IQ spotlight inserted")
else:
    print("MISS: applications marker")

# ─── 3. INNOVATION PARTNERS SECTION (insert before ABOUT section) ───
about_marker = '<!-- ABOUT -->'
innovation_plus_about = '''<!-- INNOVATION PARTNERS -->
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

  <!-- Innovation Partner Intake Form -->
  <div style="max-width:580px;margin:40px auto 0;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:32px">
    <h3 style="color:#fff;text-align:center;margin:0 0 6px">Apply to become a founding innovation partner</h3>
    <p style="color:#CFCAE6;text-align:center;font-size:13px;margin:0 0 24px">We review every application and respond within five business days.</p>
    <div class="form">
      <div class="form-row">
        <div class="field"><label>Name</label><input id="ip-name" placeholder="Your full name"></div>
        <div class="field"><label>Title</label><input id="ip-title" placeholder="Your role"></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Organization</label><input id="ip-org" placeholder="Health center name"></div>
        <div class="field"><label>Email</label><input id="ip-email" placeholder="you@org.com"></div>
      </div>
      <div class="form-row">
        <div class="field"><label>Number of sites</label><input id="ip-sites" placeholder="e.g. 5" type="number"></div>
        <div class="field"><label>State</label><input id="ip-state" placeholder="e.g. Maryland"></div>
      </div>
      <div class="field"><label>Priority operational challenge</label><textarea id="ip-challenge" rows="2" placeholder="What operational, coverage, compliance, or financial challenge is most pressing?"></textarea></div>
      <div class="field"><label>Area of interest</label><select id="ip-interest" style="width:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.16);border-radius:8px;padding:10px 12px;color:#fff;font-size:14px;font-family:Inter,sans-serif">
        <option value="">Select an area</option>
        <option value="coverage">Coverage & Patient Access</option>
        <option value="compliance">Compliance & Regulatory Readiness</option>
        <option value="governance">Governance & Executive Intelligence</option>
        <option value="pharmacy">Pharmacy & Clinical Operations</option>
        <option value="strategy">Strategy, Finance & Sustainability</option>
        <option value="multiple">Multiple areas</option>
      </select></div>
      <div class="field" style="display:none"><input id="ip-hp" placeholder="Leave blank" tabindex="-1" autocomplete="off"></div>
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:16px">
        <input type="checkbox" id="ip-consent" style="width:auto;margin:0">
        <label for="ip-consent" style="font-size:12px;color:#CFCAE6;cursor:pointer">I consent to follow-up communication regarding the Innovation Partner Program.</label>
      </div>
      <button class="btn btn-primary" style="width:100%;justify-content:center" onclick="submitPartnerApplication()">Submit application \u2192</button>
      <div id="ip-note" style="font-family:'IBM Plex Mono',monospace;font-size:11.5px;color:var(--purple-soft);text-align:center;margin-top:10px"></div>
    </div>
  </div>
</div></section>

<!-- ABOUT -->'''

if about_marker in content:
    content = content.replace(about_marker, innovation_plus_about)
    print("OK: Innovation Partners section inserted")
else:
    print("MISS: about marker")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Done. File size: {len(content)} chars")
