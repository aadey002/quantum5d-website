# -*- coding: utf-8 -*-
"""
Redesign the hero platform diagram to look like an enterprise architecture
visualization (Palantir/Snowflake/Azure style). Clean lines, gradient layers,
subtle glow, proper hierarchy.
"""

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Find the plat-viz div
old_start = '<div class="plat-viz">'
old_end = '</div>\n      </div>\n    </div>\n    <div class="owned'

start_idx = content.index(old_start)
end_idx = content.index(old_end, start_idx)

old_viz = content[start_idx:end_idx + len('</div>\n      </div>')]

# Replace CSS first
old_css = """.plat-viz{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:36px 32px;position:relative;overflow:hidden;box-shadow:0 24px 60px -12px rgba(0,0,0,.4)}
.plat-viz::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(139,92,246,.15),transparent 70%);pointer-events:none}
.plat-viz-title{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#A78BFA;margin-bottom:20px;font-weight:600}
.plat-viz-layer{padding:14px 18px;border-radius:12px;margin-bottom:10px;text-align:center;font-size:13px;font-weight:600;transition:all .3s;cursor:default;letter-spacing:.02em}
.plat-viz-layer:hover{transform:scale(1.02);box-shadow:0 0 20px rgba(139,92,246,.2)}
.plat-viz-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-bottom:8px}
.plat-viz-app{padding:10px 8px;border-radius:10px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.22);font-size:11px;font-weight:600;color:#E9E5F5;text-align:center;transition:all .3s;cursor:default;animation:float 4s ease-in-out infinite}
.plat-viz-app:nth-child(2){animation-delay:.5s}.plat-viz-app:nth-child(3){animation-delay:1s}
.plat-viz-app:nth-child(4){animation-delay:1.5s}.plat-viz-app:nth-child(5){animation-delay:2s}
.plat-viz-app:hover{background:rgba(139,92,246,.3);transform:translateY(-2px)}
.plat-viz-conn{text-align:center;color:rgba(139,92,246,.3);font-size:8px;margin:6px 0;letter-spacing:2px}"""

new_css = """.plat-viz{background:linear-gradient(180deg,rgba(15,23,42,.95) 0%,rgba(30,27,75,.95) 100%);border:1px solid rgba(139,92,246,.2);border-radius:24px;padding:40px 32px;position:relative;overflow:hidden;box-shadow:0 32px 80px -16px rgba(0,0,0,.5),0 0 60px -20px rgba(139,92,246,.15),inset 0 1px 0 rgba(255,255,255,.05)}
.plat-viz::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 50% at 50% 0%,rgba(139,92,246,.12),transparent),radial-gradient(ellipse 60% 40% at 50% 100%,rgba(37,99,235,.08),transparent);pointer-events:none}
.plat-viz::after{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:60%;height:1px;background:linear-gradient(90deg,transparent,rgba(139,92,246,.4),transparent);pointer-events:none}
.plat-viz-title{text-align:center;font-family:'IBM Plex Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.2em;color:#7C3AED;margin-bottom:24px;font-weight:700}
.plat-layer{position:relative;margin-bottom:6px}
.plat-layer-bar{padding:14px 20px;border-radius:10px;text-align:center;font-size:12px;font-weight:600;transition:all .35s;cursor:default;letter-spacing:.03em;position:relative;z-index:1}
.plat-layer-bar:hover{transform:scale(1.03);filter:brightness(1.15)}
.plat-layer-label{position:absolute;right:12px;top:50%;transform:translateY(-50%);font-family:'IBM Plex Mono',monospace;font-size:8px;letter-spacing:.08em;text-transform:uppercase;opacity:.5}
.plat-apps{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:4px 0}
.plat-app{padding:12px 8px;border-radius:10px;background:rgba(139,92,246,.08);border:1px solid rgba(139,92,246,.18);font-size:11px;font-weight:600;color:#C4B5FD;text-align:center;transition:all .35s;cursor:default;position:relative}
.plat-app::before{content:'';position:absolute;inset:0;border-radius:10px;background:radial-gradient(circle at 50% 0%,rgba(139,92,246,.1),transparent 70%);pointer-events:none;opacity:0;transition:opacity .3s}
.plat-app:hover{background:rgba(139,92,246,.18);border-color:rgba(139,92,246,.35);color:#E9E5F5;transform:translateY(-2px);box-shadow:0 8px 24px -8px rgba(139,92,246,.2)}
.plat-app:hover::before{opacity:1}
.plat-app:nth-child(1){animation:float 5s ease-in-out infinite}
.plat-app:nth-child(2){animation:float 5s ease-in-out .7s infinite}
.plat-app:nth-child(3){animation:float 5s ease-in-out 1.4s infinite}
.plat-app:nth-child(4){animation:float 5s ease-in-out 2.1s infinite}
.plat-app:nth-child(5){animation:float 5s ease-in-out 2.8s infinite}
.plat-app:nth-child(6){animation:float 5s ease-in-out 3.5s infinite}
.plat-conn{text-align:center;padding:4px 0;position:relative}
.plat-conn svg{opacity:.4}
.plat-conn::before{content:'';position:absolute;left:50%;top:0;bottom:0;width:1px;background:linear-gradient(180deg,rgba(139,92,246,.2),rgba(139,92,246,.05));transform:translateX(-50%);z-index:0}"""

if old_css in content:
    content = content.replace(old_css, new_css)
    print("OK: platform viz CSS upgraded")
else:
    print("MISS: CSS")

# Now replace the HTML
new_viz = '''<div class="plat-viz">
          <div class="plat-viz-title">Quantum5D Platform</div>

          <div class="plat-layer">
            <div class="plat-layer-bar" style="background:linear-gradient(135deg,rgba(139,92,246,.25),rgba(139,92,246,.15));border:1px solid rgba(139,92,246,.3);color:#E9E5F5">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;margin-right:6px;opacity:.7"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>Executive Intelligence Layer
            </div>
          </div>

          <div class="plat-conn"><svg width="14" height="20" viewBox="0 0 14 20" fill="none"><line x1="7" y1="0" x2="7" y2="16" stroke="rgba(139,92,246,.3)" stroke-width="1.5"/><path d="M3 12 L7 17 L11 12" stroke="rgba(139,92,246,.3)" stroke-width="1.5" fill="none"/></svg></div>

          <div class="plat-apps">
            <div class="plat-app">CoverageGuard IQ</div>
            <div class="plat-app">Governance IQ</div>
            <div class="plat-app">Meeting IQ</div>
            <div class="plat-app">Compliance</div>
            <div class="plat-app">Pharmacy Ops</div>
            <div class="plat-app">Revenue Intel</div>
          </div>

          <div class="plat-conn"><svg width="14" height="20" viewBox="0 0 14 20" fill="none"><line x1="7" y1="0" x2="7" y2="16" stroke="rgba(139,92,246,.3)" stroke-width="1.5"/><path d="M3 12 L7 17 L11 12" stroke="rgba(139,92,246,.3)" stroke-width="1.5" fill="none"/></svg></div>

          <div class="plat-layer">
            <div class="plat-layer-bar" style="background:linear-gradient(135deg,rgba(37,99,235,.18),rgba(37,99,235,.08));border:1px solid rgba(37,99,235,.25);color:#93C5FD">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-2px;margin-right:6px;opacity:.7"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>Knowledge Engine
              <span style="margin:0 8px;opacity:.3">\xb7</span>AI Agents
              <span style="margin:0 8px;opacity:.3">\xb7</span>Policy Engine
            </div>
          </div>

          <div class="plat-conn"><svg width="14" height="20" viewBox="0 0 14 20" fill="none"><line x1="7" y1="0" x2="7" y2="16" stroke="rgba(139,92,246,.3)" stroke-width="1.5"/><path d="M3 12 L7 17 L11 12" stroke="rgba(139,92,246,.3)" stroke-width="1.5" fill="none"/></svg></div>

          <div class="plat-layer">
            <div class="plat-layer-bar" style="background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);color:#64748B;font-size:11px">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:-1px;margin-right:5px;opacity:.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>EHR
              <span style="margin:0 6px;opacity:.25">\xb7</span>Pharmacy
              <span style="margin:0 6px;opacity:.25">\xb7</span>Finance
              <span style="margin:0 6px;opacity:.25">\xb7</span>HR
              <span style="margin:0 6px;opacity:.25">\xb7</span>Quality
            </div>
          </div>
        </div>
      </div>'''

content = content.replace(old_viz, new_viz)
print("OK: platform viz HTML upgraded")

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"Done. File size: {len(content)} chars")
