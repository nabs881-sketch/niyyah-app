const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_maghrib.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N956 — Al-'Azīz (corriger traduction)
// U+27 apostrophe, U+012B ī, U+2014 —
rep(
  'Al-\u0027Az\u012bz \u2014 Le Tout-Puissant',
  'Al-\u0027Az\u012bz \u2014 Le Puissant',
  1
);

// N957 — Al-Mutakabbir (corriger traduction)
// U+27 apostrophe in L'Inaccessible, U+2014 —
rep(
  'Al-Mutakabbir \u2014 L\u0027Inaccessible',
  'Al-Mutakabbir \u2014 Le Tr\u00e8s-Grand',
  2
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
