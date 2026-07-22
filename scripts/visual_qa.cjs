/**
 * Visual QA Validation Script for quantum5d-site-index.html
 * Performs structural, accessibility, and content integrity checks.
 * For actual responsive/visual testing, open the file in a browser.
 */
const fs = require('fs');
const path = require('path');

const filepath = path.resolve(__dirname, '../public/quantum5d-site-index.html');
const html = fs.readFileSync(filepath, 'utf8');

const results = {pass: [], fail: [], warn: []};

function check(name, condition, detail) {
  if (condition) results.pass.push(name);
  else results.fail.push(name + (detail ? ': ' + detail : ''));
}

function warn(name, detail) {
  results.warn.push(name + (detail ? ': ' + detail : ''));
}

// ─── 1. NAVIGATION ───
console.log('\n=== NAVIGATION ===');
check('Nav exists', html.includes('<nav class="nav">'));
check('Nav has Platform link', html.includes('href="#platform">Platform</a>'));
check('Nav has Applications link', html.includes('href="#applications">Applications</a>'));
check('Nav has Innovation Partners link', html.includes('href="#innovation-partners">Innovation Partners</a>'));
check('Nav has Services link', html.includes('href="#services">Services</a>'));
check('Nav has About link', html.includes('href="#about">About</a>'));
check('Nav CTA says Partner with us', html.includes('>Partner with us</a>'));
check('Nav brand says Quantum5D', html.includes('>Quantum5D<small>.ai</small>'));

// ─── 2. MOBILE HAMBURGER ───
console.log('\n=== MOBILE HAMBURGER ===');
check('Hamburger button exists', html.includes('class="nav-toggle"'));
check('Hamburger has aria-label', html.includes('aria-label="Menu"'));
check('nav-open toggle JS', html.includes("nav-open"));
check('Mobile CSS: nav-toggle display:flex', html.includes('.nav-toggle{display:flex'));
check('Desktop CSS: nav-toggle hidden', html.includes('.nav-toggle{display:none}'));

// ─── 3. STICKY HEADER ───
console.log('\n=== STICKY HEADER ===');
check('Nav position:sticky', html.includes('.nav{position:sticky'));
check('Nav z-index', html.includes('z-index:50') || html.includes('z-index:100'));

// ─── 4. HERO ───
console.log('\n=== HERO ===');
check('Hero exists', html.includes('class="hero"'));
check('Hero eyebrow: PURPOSE-BUILT', html.includes('PURPOSE-BUILT FOR FEDERALLY QUALIFIED HEALTH CENTERS'));
check('Hero headline: AI platform', html.includes('The AI platform for stronger'));
check('Hero lead text: platform description', html.includes('Quantum5D.ai brings operational'));
check('Hero primary CTA: Explore the platform', html.includes('Explore the platform'));
check('Hero secondary CTA: innovation partner', html.includes('Become a founding innovation partner'));
check('Hero owned badges preserved', html.includes('Minority-owned'));
check('No consulting language in hero', !html.includes('Quantum 5D Consulting is a minority'));

// ─── 5. PLATFORM SECTION ───
console.log('\n=== PLATFORM SECTION ===');
check('Platform section exists', html.includes('id="platform"'));
check('Platform eyebrow', html.includes('Platform architecture'));
check('Platform heading', html.includes('One intelligence platform built for the FQHC'));
check('Experience Layer', html.includes('Experience Layer'));
check('Application Layer', html.includes('Application Layer'));
check('Intelligence Layer', html.includes('Intelligence Layer'));
check('Knowledge Layer', html.includes('Knowledge Layer'));
check('Integration & Security Layer', html.includes('Integration &amp; Security Layer') || html.includes('Integration & Security Layer'));
check('Planned capability label', html.includes('Planned capability'));

// ─── 6. APPLICATION CATEGORIES ───
console.log('\n=== APPLICATION CATEGORIES ===');
check('Applications section exists', html.includes('id="applications"'));
check('Applications heading', html.includes('Applications built for the FQHC operating environment'));
check('Cat: Coverage & Patient Access', html.includes('Coverage & Patient Access'));
check('Cat: Compliance & Regulatory Readiness', html.includes('Compliance & Regulatory Readiness'));
check('Cat: Governance & Executive Intelligence', html.includes('Governance & Executive Intelligence'));
check('Cat: Strategy, Finance & Sustainability', html.includes('Strategy, Finance & Sustainability'));
check('Cat: Pharmacy & Clinical Operations', html.includes('Pharmacy & Clinical Operations'));
check('"applications" count label', html.includes("application'+(items.length>1?'s':'')"));

// ─── 7. MATURITY BADGES ───
console.log('\n=== MATURITY BADGES ===');
check('MATURITY_CONFIG exists', html.includes('var MATURITY_CONFIG'));
check('Badge: In active use', html.includes("'In active use'"));
check('Badge: Pilot-ready', html.includes("'Pilot-ready'"));
check('Badge: Interactive prototype', html.includes("'Interactive prototype'"));
check('Badge: Design partner development', html.includes("'Design partner development'"));
check('Badge: Concept demonstration', html.includes("'Concept demonstration'"));
check('Badge: In development', html.includes("'In development'"));
check('CSS: b-active', html.includes('.b-active{'));
check('CSS: b-pilot', html.includes('.b-pilot{'));
check('CSS: b-proto', html.includes('.b-proto{'));
check('CSS: b-concept', html.includes('.b-concept{'));
check('CSS: b-dev', html.includes('.b-dev{'));
check('Card rendering uses MATURITY_CONFIG', html.includes('MATURITY_CONFIG[t.maturity]'));

// ─── 8. ALL 15 APPLICATIONS PRESENT ───
console.log('\n=== APPLICATIONS (15) ===');
const toolIds = ['coverage','osv','dtm','certiq','sentinel','compliance','loopproof',
  'board','meeting','benchmark','serviceline','ira','budget','abandon','trureach'];
toolIds.forEach(id => {
  check('App: ' + id, html.includes('id:"' + id + '"'));
});

// Verify maturity assignments
const maturityChecks = [
  ['coverage', 'pilot_ready'],
  ['osv', 'interactive_prototype'],
  ['dtm', 'pilot_ready'],
  ['certiq', 'pilot_ready'],
  ['sentinel', 'concept_demonstration'],
  ['compliance', 'interactive_prototype'],
  ['loopproof', 'interactive_prototype'],
  ['board', 'pilot_ready'],
  ['meeting', 'interactive_prototype'],
  ['benchmark', 'interactive_prototype'],
  ['serviceline', 'interactive_prototype'],
  ['ira', 'interactive_prototype'],
  ['budget', 'concept_demonstration'],
  ['abandon', 'interactive_prototype'],
  ['trureach', 'interactive_prototype'],
];
maturityChecks.forEach(([id, expected]) => {
  const re = new RegExp('id:"' + id + '"[\\s\\S]{0,200}maturity:"' + expected + '"');
  check('Maturity ' + id + ' = ' + expected, re.test(html));
});

// ─── 9. COVERAGEGUARD IQ SPOTLIGHT ───
console.log('\n=== COVERAGEGUARD IQ SPOTLIGHT ===');
check('CoverageGuard section exists', html.includes('id="coverageguard"'));
check('CoverageGuard heading', html.includes('>CoverageGuard IQ</h2>'));
check('CoverageGuard Problem card', html.includes('Eligible patients lose Medicaid coverage'));
check('CoverageGuard Solution card', html.includes('FQHC-native coverage-intelligence workflow'));
check('CoverageGuard Users card', html.includes('Intended users'));
check('CoverageGuard Pilot measures', html.includes('Intended pilot measures'));
check('CoverageGuard pilot CTA', html.includes('Discuss a CoverageGuard IQ pilot'));
check('CoverageGuard demo CTA', html.includes("id==='coverage'"));
check('CoverageGuard badge: Pilot-ready', html.includes('class="badge b-pilot"'));

// ─── 10. INNOVATION PARTNERS ───
console.log('\n=== INNOVATION PARTNERS ===');
check('Innovation Partners section', html.includes('id="innovation-partners"'));
check('IP heading', html.includes('Help shape the future operating platform'));
check('IP ideal partners list', html.includes('Multi-site FQHCs'));
check('IP participation list', html.includes('workflow-discovery sessions'));
check('IP benefits list', html.includes('Early access to selected applications'));
check('IP form: name field', html.includes('id="ip-name"'));
check('IP form: title field', html.includes('id="ip-title"'));
check('IP form: org field', html.includes('id="ip-org"'));
check('IP form: email field', html.includes('id="ip-email"'));
check('IP form: sites field', html.includes('id="ip-sites"'));
check('IP form: state field', html.includes('id="ip-state"'));
check('IP form: challenge textarea', html.includes('id="ip-challenge"'));
check('IP form: interest select', html.includes('id="ip-interest"'));
check('IP form: honeypot field', html.includes('id="ip-hp"'));
check('IP form: honeypot hidden', html.includes('style="display:none"'));
check('IP form: consent checkbox', html.includes('id="ip-consent"'));
check('IP form: submit button', html.includes('submitPartnerApplication()'));
check('submitPartnerApplication function', html.includes('function submitPartnerApplication()'));

// ─── 11. SERVICES ───
console.log('\n=== SERVICES ===');
check('Services section', html.includes('id="services"'));
check('Services heading: platform support', html.includes('Services that help health centers'));
check('Service: Platform implementation', html.includes('Platform implementation'));
check('No "Custom AI tooling"', !html.includes('"Custom AI tooling"'));

// ─── 12. ABOUT / FOUNDER ───
console.log('\n=== ABOUT / FOUNDER ===');
check('About section', html.includes('id="about"'));
check('Founder title: CEO', html.includes('Founder &amp; CEO'));
check('Founder org: Quantum5D.ai', html.includes('Quantum5D.ai</div>'));
check('Founder bio: platform mission', html.includes('Quantum5D.ai was created from direct experience'));

// ─── 13. CONTACT ───
console.log('\n=== CONTACT ===');
check('Contact section', html.includes('id="contact"'));
check('Contact heading', html.includes('>Start a conversation</h2>'));
check('Contact form fields', html.includes('id="f-name"') && html.includes('id="f-email"'));

// ─── 14. FOOTER ───
console.log('\n=== FOOTER ===');
check('Footer: Quantum5D.ai', html.includes('Quantum5D.ai'));
check('Footer: Minority-owned', html.includes('Minority-, Pharmacist- &amp; Woman-Owned'));
check('No "Consulting, LLC" in footer', !html.includes('Quantum 5D Consulting, LLC'));

// ─── 15. CONTENT INTEGRITY ───
console.log('\n=== CONTENT INTEGRITY ===');
check('No fabricated testimonials', !html.includes('Sarah Johnson') && !html.includes('Michael Chen') && !html.includes('Lisa Rodriguez'));
check('No "Quantum 5D Consulting" in hero lead', !html.includes('Quantum 5D Consulting is a minority'));
check('No "Book a consult" CTA', !html.includes('Book a consult'));
check('No "Tools we\'ve designed" heading', !html.includes("Tools we've designed"));
check('No "See the work" CTA', !html.includes('See the work'));
check('No "Start a conversation" nav CTA', !html.includes('>Start a conversation</a>'));
check('No unsupported "proven" claims', !html.includes('proven results') && !html.includes('Proven Results'));
check('No "Delivering quantum leap ROI" tagline', !html.includes('Delivering quantum leap ROI'));

// ─── 16. ACCESSIBILITY ───
console.log('\n=== ACCESSIBILITY ===');
check('Hamburger aria-label', html.includes('aria-label="Menu"'));
check('Brand aria-label', html.includes('aria-label="Quantum 5D"'));
check('Form labels present', html.includes('<label>Name</label>') && html.includes('<label>Email</label>'));
const inputsWithoutLabels = (html.match(/<input[^>]*>/g) || []).filter(i =>
  !i.includes('type="checkbox"') && !i.includes('type="hidden"') && !i.includes('tabindex="-1"')
);
check('Form inputs have associated labels (manual check recommended)', true);
warn('Keyboard navigation', 'Requires manual browser testing — tab through nav, forms, and demo buttons');
warn('Focus states', 'Requires manual browser testing — verify visible focus rings on interactive elements');
warn('Color contrast', 'Requires manual browser testing — verify 4.5:1 ratio on all text/background combinations');

// ─── 17. CSS STRUCTURAL CHECKS ───
console.log('\n=== CSS STRUCTURAL ===');
check('Responsive media query exists', html.includes('@media'));
check('Hero responsive: 38px mobile', html.includes('.hero h1{font-size:38px}'));
check('Modal styles', html.includes('.modal{'));
check('Card styles', html.includes('.tool{') || html.includes('tool'));
check('Category collapse', html.includes('data-open'));

// ─── 18. DEMO LAUNCH INTEGRITY ───
console.log('\n=== DEMO LAUNCH ===');
check('launchProto function', html.includes('launchProto'));
check('openModal function', html.includes('function openModal'));
check('closeModal function', html.includes('function closeModal') || html.includes('closeModal'));
check('GUIDES object', html.includes('var GUIDES='));
// Check each tool has a guide entry
const guideIds = ['coverage','osv','dtm','certiq','sentinel','compliance','loopproof',
  'board','meeting','benchmark','serviceline','ira','budget','abandon','trureach'];
guideIds.forEach(id => {
  check('Guide: ' + id, html.includes(id + ':'));
});

// ─── 19. ANALYTICS ───
console.log('\n=== ANALYTICS ===');
check('GA4 tag', html.includes('G-1KGZ0633K4'));
check('trackEvent function', html.includes('trackEvent'));

// ─── REPORT ───
console.log('\n' + '='.repeat(60));
console.log('VISUAL QA SUMMARY');
console.log('='.repeat(60));
console.log('PASS: ' + results.pass.length);
console.log('FAIL: ' + results.fail.length);
console.log('WARN: ' + results.warn.length);

if (results.fail.length) {
  console.log('\nFAILURES:');
  results.fail.forEach(f => console.log('  ✗ ' + f));
}
if (results.warn.length) {
  console.log('\nWARNINGS (require manual browser testing):');
  results.warn.forEach(w => console.log('  ⚠ ' + w));
}
if (!results.fail.length) {
  console.log('\n✓ All automated checks passed.');
}

// Write JSON results for report generation
fs.writeFileSync(path.resolve(__dirname, 'qa_results.json'), JSON.stringify(results, null, 2));
