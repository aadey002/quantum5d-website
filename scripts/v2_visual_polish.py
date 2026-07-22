# -*- coding: utf-8 -*-
"""
v2 Visual Polish — Remove emojis, add SVG icons, improve spacing,
add trust strip, strengthen hero graphic, reduce visual density.
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

def ra(old, new, label):
    global content, step
    if old in content:
        content = content.replace(old, new)
        step += 1
        print(f"  [{step}] OK (all): {label}")
    else:
        print(f"  MISS: {label}")

# ════════════════════════════════════════════════════════════════
# 1. REPLACE EMOJI ICONS WITH SVG ICONS
# ════════════════════════════════════════════════════════════════
print("=== 1. REMOVE EMOJIS — PLATFORM SERVICES ===")

# Platform service cards — replace emoji with clean SVG icons
svg_identity = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>'
svg_knowledge = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>'
svg_agents = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>'
svg_workflow = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>'
svg_fhir = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10"/><path d="M12 20V4"/><path d="M6 20v-6"/></svg>'
svg_policy = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'

r('<div style="font-size:20px;margin-bottom:6px">&#x1F510;</div>', '<div style="margin-bottom:6px;color:#A78BFA">' + svg_identity + '</div>', 'identity icon')
r('<div style="font-size:20px;margin-bottom:6px">&#x1F9E0;</div>', '<div style="margin-bottom:6px;color:#A78BFA">' + svg_knowledge + '</div>', 'knowledge icon')
r('<div style="font-size:20px;margin-bottom:6px">&#x2699;&#xFE0F;</div>', '<div style="margin-bottom:6px;color:#A78BFA">' + svg_agents + '</div>', 'agents icon')
r('<div style="font-size:20px;margin-bottom:6px">&#x1F504;</div>', '<div style="margin-bottom:6px;color:#A78BFA">' + svg_workflow + '</div>', 'workflow icon')
r('<div style="font-size:20px;margin-bottom:6px">&#x1F3E5;</div>', '<div style="margin-bottom:6px;color:#A78BFA">' + svg_fhir + '</div>', 'fhir icon')
r('<div style="font-size:20px;margin-bottom:6px">&#x1F4DC;</div>', '<div style="margin-bottom:6px;color:#A78BFA">' + svg_policy + '</div>', 'policy icon')

# ════════════════════════════════════════════════════════════════
print("=== 2. REMOVE EMOJIS — OUTCOME CARDS ===")
# ════════════════════════════════════════════════════════════════

svg_shield = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
svg_building = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="10" y2="6"/><line x1="14" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>'
svg_zap = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
svg_pill = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.5 1.5H8A6.5 6.5 0 0 0 1.5 8v8A6.5 6.5 0 0 0 8 22.5h8a6.5 6.5 0 0 0 6.5-6.5v-2.5"/><line x1="1.5" y1="22.5" x2="22.5" y2="1.5"/></svg>'
svg_check = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E11D48" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>'
svg_chart = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>'

r('<div class="outcome-icon" style="background:#DBEAFE">&#x1F6E1;&#xFE0F;</div>', '<div class="outcome-icon" style="background:#DBEAFE">' + svg_shield + '</div>', 'outcome shield')
r('<div class="outcome-icon" style="background:#F3E8FF">&#x1F3DB;&#xFE0F;</div>', '<div class="outcome-icon" style="background:#F3E8FF">' + svg_building + '</div>', 'outcome building')
r('<div class="outcome-icon" style="background:#D1FAE5">&#x26A1;</div>', '<div class="outcome-icon" style="background:#D1FAE5">' + svg_zap + '</div>', 'outcome zap')
r('<div class="outcome-icon" style="background:#FEF3C7">&#x1F48A;</div>', '<div class="outcome-icon" style="background:#FEF3C7">' + svg_pill + '</div>', 'outcome pill')
r('<div class="outcome-icon" style="background:#FFE4E6">&#x2705;</div>', '<div class="outcome-icon" style="background:#FFE4E6">' + svg_check + '</div>', 'outcome check')
r('<div class="outcome-icon" style="background:#E0E7FF">&#x1F4CA;</div>', '<div class="outcome-icon" style="background:#E0E7FF">' + svg_chart + '</div>', 'outcome chart')

# ════════════════════════════════════════════════════════════════
print("=== 3. REMOVE EMOJIS — SHARE BUTTONS ===")
# ════════════════════════════════════════════════════════════════

# Share bar emojis to clean text/SVG
ra('&#x1F517; Copy Link', 'Copy Link', 'share copy link emoji')
ra('&#x2709; Email', 'Email', 'share email emoji')
ra('&#x25A3; QR Code', 'QR Code', 'share qr emoji')
ra('&#x1D54F; X', 'X', 'share x emoji')
ra('&#x1F4E8; Share with colleague', 'Share with colleague', 'share colleague emoji')

# ════════════════════════════════════════════════════════════════
print("=== 4. HERO GRAPHIC — LARGER + MORE PRESENCE ===")
# ════════════════════════════════════════════════════════════════

# Make platform viz larger with more padding and visual weight
r('.plat-viz{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:20px;padding:28px;position:relative;overflow:hidden}',
  '.plat-viz{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.12);border-radius:24px;padding:36px 32px;position:relative;overflow:hidden;box-shadow:0 24px 60px -12px rgba(0,0,0,.4)}',
  'hero viz larger')

r('.plat-viz-title{text-align:center;font-family:\'IBM Plex Mono\',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.15em;color:var(--purple-soft);margin-bottom:16px}',
  '.plat-viz-title{text-align:center;font-family:\'IBM Plex Mono\',monospace;font-size:11px;text-transform:uppercase;letter-spacing:.15em;color:#A78BFA;margin-bottom:20px;font-weight:600}',
  'viz title larger')

r('.plat-viz-layer{padding:10px 14px;border-radius:10px;margin-bottom:8px;text-align:center;font-size:12px;font-weight:600;transition:all .3s;cursor:default}',
  '.plat-viz-layer{padding:14px 18px;border-radius:12px;margin-bottom:10px;text-align:center;font-size:13px;font-weight:600;transition:all .3s;cursor:default;letter-spacing:.02em}',
  'viz layers larger')

r('.plat-viz-app{padding:8px 6px;border-radius:8px;background:rgba(139,92,246,.15);border:1px solid rgba(139,92,246,.25);font-size:10px;font-weight:600;color:#E9E5F5;text-align:center;transition:all .3s;cursor:default;animation:float 4s ease-in-out infinite}',
  '.plat-viz-app{padding:10px 8px;border-radius:10px;background:rgba(139,92,246,.12);border:1px solid rgba(139,92,246,.22);font-size:11px;font-weight:600;color:#E9E5F5;text-align:center;transition:all .3s;cursor:default;animation:float 4s ease-in-out infinite}',
  'viz apps larger')

r('.plat-viz-conn{text-align:center;color:rgba(255,255,255,.2);font-size:10px;margin:4px 0;letter-spacing:4px}',
  '.plat-viz-conn{text-align:center;color:rgba(139,92,246,.3);font-size:8px;margin:6px 0;letter-spacing:2px}',
  'viz connectors')

# Replace text connectors with SVG arrows
ra('\u2502</div>\n          <div class="plat-viz-apps">',
   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,.4)" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>\n          <div class="plat-viz-apps">',
   'viz arrow 1')

ra('\u2502</div>\n          <div class="plat-viz-layer" style="background:rgba(37,',
   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,.4)" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>\n          <div class="plat-viz-layer" style="background:rgba(37,',
   'viz arrow 2')

ra('\u2502</div>\n          <div class="plat-viz-layer" style="background:rgba(255,255,255,.06)',
   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(139,92,246,.4)" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg></div>\n          <div class="plat-viz-layer" style="background:rgba(255,255,255,.06)',
   'viz arrow 3')

# ════════════════════════════════════════════════════════════════
print("=== 5. TRUST STRIP ===")
# ════════════════════════════════════════════════════════════════

trust_strip = '''
<!-- TRUST STRIP -->
<div style="background:var(--navy);border-bottom:1px solid rgba(255,255,255,.08);padding:16px 0">
  <div class="wrap" style="display:flex;justify-content:center;gap:32px;flex-wrap:wrap;font-family:'IBM Plex Mono',monospace;font-size:11px;letter-spacing:.04em;color:#94A3B8">
    <span style="display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> Built by an FQHC executive</span>
    <span style="display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Purpose-built for FQHCs</span>
    <span style="display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/></svg> Real operational workflows</span>
    <span style="display:flex;align-items:center;gap:6px"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Human-reviewed AI</span>
  </div>
</div>

'''

# Insert after hero, before outcomes
r('<!-- EXECUTIVE OUTCOMES -->', trust_strip + '<!-- EXECUTIVE OUTCOMES -->', 'trust strip')

# ════════════════════════════════════════════════════════════════
print("=== 6. SPACING + VISUAL DENSITY ===")
# ════════════════════════════════════════════════════════════════

# Add more padding to sections and alternate backgrounds more clearly
# Increase section padding
r('.sec{padding:60px 0}', '.sec{padding:72px 0}', 'section padding')

# Make services section visually distinct
r('id="services" style="background:#fff;border-top:1px solid var(--line);border-bottom:1px solid var(--line)"',
  'id="services" style="background:#FAFAFE;border-top:1px solid var(--line);border-bottom:1px solid var(--line)"',
  'services bg')

# ════════════════════════════════════════════════════════════════
print("=== 7. PRIORITY RECOMMENDATION SECTION ===")
# ════════════════════════════════════════════════════════════════

priority_section = '''<!-- PRIORITY RECOMMENDATIONS -->
<section class="sec" style="background:#fff;border-bottom:1px solid var(--line)"><div class="wrap">
  <div class="sec-head">
    <p class="eyebrow">Find your starting point</p>
    <h2>Which applications are right for your organization?</h2>
    <p>Select your most pressing operational priority. We will recommend the most relevant applications.</p>
  </div>
  <div id="priorityGrid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:14px;margin-bottom:28px">
    <button class="priority-btn" onclick="showPriority(this,'coverage')" style="background:var(--card);border:2px solid var(--line);border-radius:14px;padding:20px;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit">
      <div style="font-weight:700;font-size:15px;margin-bottom:4px;color:var(--ink)">Protect Medicaid coverage</div>
      <div style="font-size:13px;color:var(--text-3)">Reduce preventable coverage loss and improve recertification outcomes</div>
    </button>
    <button class="priority-btn" onclick="showPriority(this,'pharmacy')" style="background:var(--card);border:2px solid var(--line);border-radius:14px;padding:20px;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit">
      <div style="font-weight:700;font-size:15px;margin-bottom:4px;color:var(--ink)">Improve pharmacy performance</div>
      <div style="font-size:13px;color:var(--text-3)">Optimize workflows, reduce abandonment, protect 340B margin</div>
    </button>
    <button class="priority-btn" onclick="showPriority(this,'governance')" style="background:var(--card);border:2px solid var(--line);border-radius:14px;padding:20px;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit">
      <div style="font-weight:700;font-size:15px;margin-bottom:4px;color:var(--ink)">Strengthen governance</div>
      <div style="font-size:13px;color:var(--text-3)">Improve board preparation, decision tracking, and executive accountability</div>
    </button>
    <button class="priority-btn" onclick="showPriority(this,'hrsa')" style="background:var(--card);border:2px solid var(--line);border-radius:14px;padding:20px;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit">
      <div style="font-weight:700;font-size:15px;margin-bottom:4px;color:var(--ink)">Prepare for HRSA reviews</div>
      <div style="font-size:13px;color:var(--text-3)">Maintain continuous OSV readiness and evidence management</div>
    </button>
    <button class="priority-btn" onclick="showPriority(this,'executive')" style="background:var(--card);border:2px solid var(--line);border-radius:14px;padding:20px;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit">
      <div style="font-weight:700;font-size:15px;margin-bottom:4px;color:var(--ink)">Improve executive reporting</div>
      <div style="font-size:13px;color:var(--text-3)">Give leadership the intelligence, benchmarks, and views to act with confidence</div>
    </button>
    <button class="priority-btn" onclick="showPriority(this,'compliance')" style="background:var(--card);border:2px solid var(--line);border-radius:14px;padding:20px;text-align:left;cursor:pointer;transition:all .2s;font-family:inherit">
      <div style="font-weight:700;font-size:15px;margin-bottom:4px;color:var(--ink)">Streamline compliance</div>
      <div style="font-size:13px;color:var(--text-3)">Centralize requirements, track evidence, and stay audit-ready</div>
    </button>
  </div>
  <div id="priorityResult" style="display:none;background:linear-gradient(135deg,#1e1b4b,#312e81);border-radius:16px;padding:28px;color:#fff">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
      <h3 id="priorityTitle" style="margin:0;font-size:18px"></h3>
      <button onclick="document.getElementById('priorityResult').style.display='none';document.querySelectorAll('.priority-btn').forEach(function(b){b.style.borderColor='var(--line)'})" style="background:none;border:none;color:#A78BFA;cursor:pointer;font-size:13px;font-family:Inter,sans-serif">Clear</button>
    </div>
    <div id="priorityApps" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px"></div>
  </div>
</div></section>

'''

# Insert before the applications section
r('<!-- COVERAGEGUARD IQ SPOTLIGHT -->', priority_section + '<!-- COVERAGEGUARD IQ SPOTLIGHT -->', 'priority recommendations')

# ════════════════════════════════════════════════════════════════
print("=== 8. PRIORITY RECOMMENDATION JS ===")
# ════════════════════════════════════════════════════════════════

priority_js = """
var PRIORITY_MAP={
  coverage:['coverage','trureach'],
  pharmacy:['abandon','trureach','ira','coverage'],
  governance:['board','meeting','benchmark'],
  hrsa:['osv','compliance','loopproof','certiq'],
  executive:['board','meeting','benchmark','serviceline','budget'],
  compliance:['osv','compliance','loopproof','certiq','dtm','sentinel']
};
var PRIORITY_LABELS={
  coverage:'Protect Medicaid Coverage',pharmacy:'Improve Pharmacy Performance',
  governance:'Strengthen Governance',hrsa:'Prepare for HRSA Reviews',
  executive:'Improve Executive Reporting',compliance:'Streamline Compliance'
};
function showPriority(btn,key){
  document.querySelectorAll('.priority-btn').forEach(function(b){b.style.borderColor='var(--line)';});
  btn.style.borderColor='#7C3AED';
  var ids=PRIORITY_MAP[key]||[];
  var result=document.getElementById('priorityResult');
  var title=document.getElementById('priorityTitle');
  var grid=document.getElementById('priorityApps');
  title.textContent='Recommended for: '+PRIORITY_LABELS[key];
  grid.innerHTML='';
  ids.forEach(function(id){
    var t=TOOLS.find(function(x){return x.id===id;});
    if(!t)return;
    var mc=MATURITY_CONFIG[t.maturity]||MATURITY_CONFIG['interactive_prototype'];
    var card=document.createElement('div');
    card.style.cssText='background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);border-radius:12px;padding:16px;cursor:pointer';
    card.innerHTML='<div style="font-weight:700;font-size:14px;margin-bottom:4px">'+t.name+'</div><div style="font-size:12px;color:#CFCAE6;margin-bottom:8px">'+t.problem.slice(0,80)+'...</div><span class="badge '+mc.cls+'" style="font-size:10px;padding:2px 8px">'+mc.label+'</span>';
    card.onclick=function(){openModal(t);};
    grid.appendChild(card);
  });
  result.style.display='block';
  result.scrollIntoView({behavior:'smooth',block:'nearest'});
  if(typeof trackEvent==='function')trackEvent('priority_recommendation',{priority:key,apps:ids.length});
}

"""

r('function filterByRole(', priority_js + 'function filterByRole(', 'priority JS')

# ════════════════════════════════════════════════════════════════
# WRITE
# ════════════════════════════════════════════════════════════════

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print(f"\n{'='*60}")
print(f"VISUAL POLISH COMPLETE. {step} changes applied.")
print(f"File size: {len(content)} chars")
