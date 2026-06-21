const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_maghrib.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N921 — Chiffre invérifiable "5 millions" (supprimer)
rep(
  'environ 5 millions de musulmans dans le monde finissent la lecture compl\u00e8te du Coran ce mois-ci.',
  'des millions de musulmans dans le monde finissent la lecture compl\u00e8te du Coran ce mois-ci.',
  1
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
