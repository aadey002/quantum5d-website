"""
Restructure the Platform section to follow Genesis principle:
Show the world (infrastructure) before the fish (applications).

Add Platform Services layer (Identity, Knowledge Engine, AI Agents,
Workflow, FHIR Integration, Policy Engine) and restructure the
architecture to tell the story of infrastructure that supports life.
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find and replace the entire Platform section
old_platform_start = '<!-- PLATFORM -->'
old_platform_end = '<!-- WORK -->\n<!-- COVERAGEGUARD IQ SPOTLIGHT -->'

start_idx = content.index(old_platform_start)
end_idx = content.index(old_platform_end)

before = content[:start_idx]
after = content[end_idx:]

new_platform = '''<!-- PLATFORM -->
<section class="sec" id="platform" style="background:#fff;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Platform architecture</p>
    <h2>The world before the applications</h2>
    <p>Great infrastructure comes before great products. Quantum5D.ai is built on a shared foundation that every application inherits \u2014 so intelligence compounds, governance is consistent, and no application becomes an island.</p>
  </div>

  <!-- Philosophy callout -->
  <div style="background:linear-gradient(135deg,#1e1b4b 0%,#0f172a 100%);color:#fff;border-radius:18px;padding:32px 36px;margin-bottom:36px;text-align:center">
    <p style="font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#E2E0F0;margin:0 0 8px;line-height:1.5">\u201cTurning prototypes into infrastructure.\u201d</p>
    <p style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin:0">The Quantum5D.ai philosophy</p>
  </div>

  <!-- Platform Services — THE WORLD -->
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
        <div style="font-size:20px;margin-bottom:6px">\u2699\ufe0f</div>
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

  <!-- Architecture layers — THE ECOSYSTEM -->
  <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.1em;margin-bottom:14px;font-weight:600">Architecture Layers</div>
  <div style="display:grid;gap:12px;grid-template-columns:1fr">
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Experience Layer</div>
        <span class="badge b-proto" style="font-size:9px;padding:1px 6px">Available</span>
      </div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">Executive dashboards \xb7 Operational workspaces \xb7 Reviewer interfaces \xb7 Role-based views</div>
      <div style="font-size:12.5px;color:var(--text-3)">How leaders and staff interact with the platform \u2014 designed for the FQHC decision-making environment.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Application Layer</div>
        <span class="badge b-proto" style="font-size:9px;padding:1px 6px">15 applications</span>
      </div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">Coverage \xb7 Compliance \xb7 Governance \xb7 Pharmacy \xb7 Strategy \xb7 Finance \xb7 Population Health</div>
      <div style="font-size:12.5px;color:var(--text-3)">Purpose-built applications that address high-value FQHC operational problems \u2014 each built on shared platform services.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Intelligence Layer</div>
        <span class="badge b-proto" style="font-size:9px;padding:1px 6px">Active</span>
      </div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">AI-assisted analysis \xb7 Risk scoring \xb7 Document intelligence \xb7 Recommendation logic</div>
      <div style="font-size:12.5px;color:var(--text-3)">Every recommendation is governed by rules, evidence, and human oversight \u2014 the AI reasons, a human decides.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Knowledge Layer</div>
        <span class="badge b-design" style="font-size:9px;padding:1px 6px">Building</span>
      </div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">HRSA requirements \xb7 CMS rules \xb7 340B \xb7 Pharmacy regulations \xb7 Quality standards</div>
      <div style="font-size:12.5px;color:var(--text-3)">One governance engine that every application reasons from \u2014 the compound advantage that gets harder for competitors to replicate over time.</div>
    </div>
    <div style="background:var(--card);border:1px solid var(--line);border-radius:14px;padding:20px 24px">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px">
        <div style="font-family:'IBM Plex Mono',monospace;font-size:11px;color:var(--purple-soft);text-transform:uppercase;letter-spacing:.08em">Integration & Security Layer</div>
        <span class="badge b-dev" style="font-size:9px;padding:1px 6px">Planned</span>
      </div>
      <div style="font-weight:600;font-size:14px;margin-bottom:4px">EHR/EMR \xb7 Pharmacy systems \xb7 FHIR APIs \xb7 Identity & access \xb7 Audit trails</div>
      <div style="font-size:12.5px;color:var(--text-3)">Secure data exchange and governance controls designed for healthcare data requirements.</div>
    </div>
  </div>

  <!-- Genesis build stage indicator -->
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

content = before + new_platform + after

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Platform section restructured. File size: {len(content)} chars")
