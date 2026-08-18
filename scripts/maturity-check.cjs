// maturity-check.cjs — Build-time consistency test for maturity labels
// Usage: node scripts/maturity-check.cjs
// Exits 1 if prohibited maturity language is found in public HTML files.

const fs = require('fs');
const path = require('path');

const PUBLIC = path.join(__dirname, '..', 'public');

const PROHIBITED = [
  'pilot_ready', 'Pilot-Ready', 'Pilot Ready',
  'design_partner', 'Design Partner Development',
  'technical_poc', 'Technical Proof of Concept',
  'in_active_use', 'In Active Use',
  'Research Validation',
  'concept_demonstration',
  'interactive_prototype_alt',
];

function scanDir(dir) {
  var violations = [];
  var entries = fs.readdirSync(dir, { withFileTypes: true });
  for (var i = 0; i < entries.length; i++) {
    var entry = entries[i];
    var fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      violations = violations.concat(scanDir(fullPath));
    } else if (entry.name.endsWith('.html') && !entry.name.includes('.backup')) {
      var content = fs.readFileSync(fullPath, 'utf8');
      var lines = content.split('\n');
      for (var j = 0; j < lines.length; j++) {
        for (var k = 0; k < PROHIBITED.length; k++) {
          if (lines[j].includes(PROHIBITED[k])) {
            violations.push({
              file: path.relative(PUBLIC, fullPath),
              line: j + 1,
              term: PROHIBITED[k],
              context: lines[j].trim().substring(0, 120),
            });
          }
        }
      }
    }
  }
  return violations;
}

console.log('Maturity consistency check: scanning public/ HTML files...');
var violations = scanDir(PUBLIC);

if (violations.length === 0) {
  console.log('PASS — no prohibited maturity labels found in ' + PUBLIC);
  process.exit(0);
} else {
  console.error('FAIL — ' + violations.length + ' prohibited maturity label(s) found:');
  for (var i = 0; i < violations.length; i++) {
    var v = violations[i];
    console.error('  ' + v.file + ':' + v.line + ' — "' + v.term + '"');
    console.error('    ' + v.context);
  }
  process.exit(1);
}
