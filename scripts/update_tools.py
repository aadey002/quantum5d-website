"""Replace TOOLS[], CATS[] arrays and add MATURITY_CONFIG in the showcase HTML."""
import sys

filepath = "C:/Users/adeto/quantum5d-website/public/quantum5d-site-index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

# Locate boundaries
tools_start = content.index("var TOOLS=[")
guides_start = content.index("var GUIDES={")

before = content[:tools_start]
after = content[guides_start:]

new_data = r"""/* ── Maturity configuration (centralized — edit here to update all cards) ── */
var MATURITY_CONFIG = {
  'in_active_use':          {label:'In active use',           cls:'b-active',   order:1},
  'pilot_ready':            {label:'Pilot-ready',             cls:'b-pilot',    order:2},
  'interactive_prototype':  {label:'Interactive prototype',   cls:'b-proto',    order:3},
  'design_partner':         {label:'Design partner development', cls:'b-design', order:4},
  'concept_demonstration':  {label:'Concept demonstration',   cls:'b-concept',  order:5},
  'in_development':         {label:'In development',          cls:'b-dev',      order:6}
};

var TOOLS=[
 {id:"coverage",name:"CoverageGuard IQ",cat:"Coverage & Patient Access",live:true,demo:null,link:true,
  maturity:"pilot_ready",
  problem:"Six-month Medicaid redeterminations and H.R.1 rules push eligible patients off coverage.",
  desc:"An FQHC-native coverage-intelligence platform that closes the whole Medicaid recertification loop: it reconciles conflicting eligibility signals into one confidence-scored coverage state, then drives each at-risk patient through outreach, document collection and validation, submission as authorized representative, and determination tracking \u2014 with human-by-exception review and a full audit trail.",
  tags:["Medicaid","Recertification","Coverage intelligence"]},
 {id:"osv",name:"HRSA OSV Readiness Assistant",cat:"Compliance & Regulatory Readiness",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"Operational site visits surface compliance gaps far too late.",
  desc:"Scores overall HRSA Operational Site Visit readiness across a 19-area compliance heat map \u2014 so gaps surface and get remediated before HRSA arrives, not during the visit.",
  tags:["HRSA OSV","Compliance","Heat map"]},
 {id:"dtm",name:"DTM Review Intelligence",cat:"Compliance & Regulatory Readiness",live:true,demo:null,link:true,
  maturity:"pilot_ready",
  problem:"Drug Therapy Management applications and reviews are paper-bound and slow.",
  desc:"A Drug Therapy Management (DTM) application and review workflow built for boards \u2014 structured submission, a reviewer queue, and status tracking from intake to decision.",
  tags:["DTM","Regulatory","Workflow"]},
 {id:"certiq",name:"Technician Program Review",cat:"Compliance & Regulatory Readiness",live:true,demo:null,link:true,
  maturity:"pilot_ready",
  problem:"Board reviewers hand-check training-program packets against comar requirements, line by line.",
  desc:"AI-assisted regulatory review that crosswalks a pharmacy-technician training program against the board\u2019s application and comar requirements \u2014 scoring each requirement Meets, Clarification Needed, or Not Demonstrated with cited page references, and flagging exactly what a reviewer must resolve before a determination. The reviewer still makes the final call; the workflow generalizes to any board-related manual review.",
  tags:["Regulatory review","Requirements crosswalk","AI-assisted"]},
 {id:"sentinel",name:"Sentinel",cat:"Compliance & Regulatory Readiness",live:true,demo:null,link:true,
  maturity:"concept_demonstration",
  problem:"Compliance and oversight teams triage complaints and target inspections by hand.",
  desc:"An AI-assist reasoning layer for regulatory back-office work: it triages complaints by risk with cited rules, targets inspections with a tunable model, runs automated application checks, and tests proposed sanctions against precedent \u2014 it recommends and cites its reasoning, but a human always decides.",
  tags:["Regulatory","Risk triage","AI-assisted"]},
 {id:"compliance",name:"Compliance Command",cat:"Compliance & Regulatory Readiness",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"Compliance obligations are scattered across multiple regulatory bodies and accreditation standards \u2014 tracked in a dozen spreadsheets.",
  desc:"One command center for every compliance requirement across multiple sites and regulatory authorities: a site-by-authority status matrix, a filterable register with owners, due dates, evidence, and severity, and a per-authority compliance score \u2014 so nothing lapses and an audit is always one click away.",
  tags:["Compliance","Multi-entity","Audit-ready"]},
 {id:"loopproof",name:"LoopProof",cat:"Compliance & Regulatory Readiness",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"Referrals leave the building and never close \u2014 no report back, no patient notified, and no proof for a site visit.",
  desc:"LoopProof is a referral loop integrity engine for Federally Qualified Health Centers. It sits on top of whatever referral process a center already runs \u2014 in the EHR, through a referral-management vendor, or by fax \u2014 and audits it. For every specialty, imaging, and community referral in the center\u2019s rolling corpus, it determines whether the loop actually closed, whether it closed within the timeframes the center\u2019s own written policy defines, and whether the documentation would hold up to a HRSA Operational Site Visit or a delayed-diagnosis FTCA claim.",
  tags:["Closed-loop referrals","OSV readiness","Assurance"]},
 {id:"board",name:"Board Governance IQ",cat:"Governance & Executive Intelligence",live:true,demo:null,link:"board-intelligence-prototype.html",
  maturity:"pilot_ready",
  problem:"Board prep eats executive time; HRSA OSV gaps create risk.",
  desc:"Turns a board packet into a 10\u201311 slide executive summary, runs a built-in HRSA OSV compliance checker that flags missing agenda/minutes items, maintains a governance calendar, and tracks action items with a full audit log.",
  tags:["Governance","OSV checker","Summarization"]},
 {id:"meeting",name:"Meeting Intelligence",cat:"Governance & Executive Intelligence",live:true,demo:null,link:"meeting-intelligence-prototype.html",
  maturity:"interactive_prototype",
  problem:"Decisions made in 1:1s and ELT meetings slip through the cracks.",
  desc:"Pairs with Board Governance IQ for CEO one-on-ones: a decision queue, RACI accountability tracking, strategic-plan progress, and an automated agenda builder so nothing falls between meetings.",
  tags:["RACI","Decision queue","Agendas"]},
 {id:"benchmark",name:"Exec Compensation Benchmarking",cat:"Governance & Executive Intelligence",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"Comp decisions get made without defensible market data \u2014 a board and IRS risk.",
  desc:"Benchmarks executive roles against peer compensation from required public filing records: pick a role and organization size, enter a salary, and see its percentile, the defensible market range, and a rebuttable-presumption checklist \u2014 the comparability data a compensation committee needs to set and defend pay.",
  tags:["Governance","Comp benchmarking","Public filings"]},
 {id:"serviceline",name:"ServiceLine IQ",cat:"Strategy, Finance & Sustainability",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"Service-line decisions get made on gut feel, not peer benchmarks.",
  desc:"An FQHC service-line analyzer built on industry benchmarks \u2014 plots productivity against cost-per-visit and frames each line as Kill, Fix, Invest, Grow, or Keep, with ramp and staffing modeled on peer launches.",
  tags:["FQHC analytics","Industry benchmarks","Strategy"]},
 {id:"ira",name:"340B IRA Intelligence",cat:"Strategy, Finance & Sustainability",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"IRA drug-price negotiation quietly compresses 340B margin, drug by drug.",
  desc:"A 340B \u00d7 Inflation Reduction Act intelligence platform: it maps Maximum Fair Price timelines and the negotiation pipeline against claims, quantifies margin compression by drug and IRA phase, and surfaces therapeutic mitigation options \u2014 so covered entities see IRA exposure coming and plan around it.",
  tags:["340B","IRA / MFP","Margin analytics"]},
 {id:"budget",name:"PatientFirst Budget Engine",cat:"Strategy, Finance & Sustainability",live:true,demo:null,link:true,
  maturity:"concept_demonstration",
  problem:"FQHC budgets are built backward from last year instead of from the patients you plan to serve.",
  desc:"A patient-first budgeting model: set a patient-access target, service mix, staffing and payer assumptions, and it cascades live to required visits, provider and support FTEs, salaries, total operating budget, revenue by payer, and the resulting gap or surplus \u2014 grounded in industry benchmarks.",
  tags:["FQHC finance","Budgeting","Industry benchmarks"]},
 {id:"abandon",name:"Rx Abandonment Worklist",cat:"Pharmacy & Clinical Operations",live:true,demo:null,link:true,
  maturity:"interactive_prototype",
  problem:"Pharmacy staff chase the wrong will-call scripts and miss the ones that matter.",
  desc:"Scores every will-call prescription by abandonment likelihood \u00d7 clinical criticality, ranks the queue, routes the right action and contact channel (respecting opt-outs and language), and suppresses what shouldn\u2019t be chased \u2014 like at-home supply and unwanted auto-refills.",
  tags:["Pharmacy ops","Risk scoring","Worklist"]},
 {id:"trureach",name:"TruReach",cat:"Pharmacy & Clinical Operations",live:true,demo:"phone",
  maturity:"interactive_prototype",
  problem:"No-shows and failed recalls pile up when appointment reminders never reach the patient.",
  desc:"Validates patient phone numbers in batch or in real time \u2014 green for valid and textable, blue for valid landline, red for invalid \u2014 so appointment reminders, recalls, and refill nudges actually land, cutting no-shows and wasted outreach. Embeds into pharmacy management systems, EMRs, schedulers, and any system that stores phone numbers.",
  tags:["No-show reduction","Validation","Patient outreach"]},
];
var CATS=[
 {key:"Coverage & Patient Access",blurb:"Coverage retention, recertification workflow, eligibility reconciliation, and patient continuity."},
 {key:"Compliance & Regulatory Readiness",blurb:"Site-visit readiness, regulatory review, compliance management, and referral integrity."},
 {key:"Governance & Executive Intelligence",blurb:"Board preparation, executive decision support, accountability tracking, and compensation governance."},
 {key:"Strategy, Finance & Sustainability",blurb:"Service-line analysis, revenue intelligence, budgeting, and 340B margin strategy."},
 {key:"Pharmacy & Clinical Operations",blurb:"Pharmacy workflow optimization, patient reachability, and clinical operations."}
];
"""

content = before + new_data + after

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("TOOLS + CATS + MATURITY_CONFIG replaced successfully")
print(f"File size: {len(content)} chars")
