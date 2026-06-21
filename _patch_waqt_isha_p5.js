const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N782 — Remplacement cellulaire (nuancer mythe des 7 ans)
// from-string is a substring (actual fr starts with "Tu remplaces 50 millions...")
rep(
  'Toutes les 7 ans, plus aucune cellule de ton corps n\u0027est celle que tu avais avant. Tu es litt\u00e9ralement une nouvelle personne. Et pourtant tu te souviens. Qui retient le \u0027toi\u0027 dans ce remplacement ?',
  'La plupart de tes cellules sont remplac\u00e9es en quelques ann\u00e9es. Ton sang, ta peau, ton intestin \u2014 renouvel\u00e9s en continu. Et pourtant tu te souviens. Qui retient le \u0027toi\u0027 dans ce remplacement ?',
  1
);

// N791 — Tympan / comparaison atome (corriger)
rep(
  'Le tympan d\u00e9tecte des vibrations de 10^-9 m\u00e8tre \u2014 un milliardi\u00e8me de m\u00e8tre. C\u0027est 10 fois plus petit qu\u0027un atome d\u0027hydrog\u00e8ne. Tu entends ce qui d\u00e9fie la mesure. Et tu doutes qu\u0027All\u00e2h entende tes du\u0027\u00e2s ?',
  'Le tympan d\u00e9tecte des vibrations de 10^-9 m\u00e8tre \u2014 un milliardi\u00e8me de m\u00e8tre. Une pr\u00e9cision qui d\u00e9fie l\u0027ing\u00e9nierie humaine. Et tu doutes qu\u0027All\u00e2h entende tes du\u0027\u00e2s ?',
  2
);

// N795 — Bactéries intestinales (reformuler chiffre révisé)
rep(
  'Ton intestin contient plus de bact\u00e9ries qu\u0027il y a d\u0027humains sur Terre. Tu vis avec 100 000 milliards d\u0027\u00eatres vivants en symbiose. Tu n\u0027es jamais \u0027seul\u0027 biologiquement. Toute une civilisation dort en toi.',
  'Ton intestin contient des milliers de milliards de bact\u00e9ries \u2014 bien plus que d\u0027humains sur Terre. Tu vis en symbiose avec une civilisation invisible. Tu n\u0027es jamais \u0027seul\u0027 biologiquement. Toute une civilisation dort en toi.',
  3
);

// N801 — Poussière d'étoiles / turâb (nuancer rapprochement)
// from-string is a substring (actual fr has more text before)
rep(
  'Tu es litt\u00e9ralement de la poussi\u00e8re d\u0027\u00e9toiles. Et All\u00e2h a parl\u00e9 de cela : \u0027Nous l\u0027avons cr\u00e9\u00e9 de poussi\u00e8re.\u0027',
  'Tu es litt\u00e9ralement de la poussi\u00e8re d\u0027\u00e9toiles. Et le Coran dit qu\u0027All\u00e2h a cr\u00e9\u00e9 l\u0027homme de poussi\u00e8re (tur\u00e2b). L\u0027image est la m\u00eame. Que tu en fasses une co\u00efncidence ou un signe \u2014 arr\u00eate-toi sur ce que tu es.',
  4
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
