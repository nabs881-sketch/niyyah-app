const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_maghrib.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N995 — Al-Mâjid (SUPPRIMER — doublon n°983)
// source=tafakkur, id_origine=223
rep(
  ',\n  {\n    "source": "tafakkur",\n    "id_origine": 223,\n    "fr": "Toute renomm\u00e9e humaine s\u0027\u00e9teint en trois g\u00e9n\u00e9rations. Une seule traverse les si\u00e8cles.\\n\\nAl-M\u0101jid \u2014 L\u0027Illustre",\n    "categorie": "CONTEMPLATIF"\n  }',
  '',
  1
);

// N1006 — Al-Walî (SUPPRIMER — doublon n°989)
// source=tafakkur, id_origine=235
rep(
  ',\n  {\n    "source": "tafakkur",\n    "id_origine": 235,\n    "fr": "Toutes les choses ont un ma\u00eetr e. Tous les ma\u00eetres ont un Ma\u00etre.\\n\\nAl-W\u0101l\u012b \u2014 Le Ma\u00eetr e absolu",\n    "categorie": "CONTEMPLATIF"\n  }',
  '',
  2
);

// N1040 — Kâfûr / Zanjabîl (corriger inversion)
rep(
  'Les serviteurs du Paradis offrent une boisson \u0027\u00e0 la saveur du gingembre, m\u00eal\u00e9e de K\u00e2f\u00fbr\u0027. All\u00e2h n\u0027a pas oubli\u00e9 les go\u00fbts. Tes papilles te suivront l\u00e0-bas. \u2014 Coran 76:5 + 76:17',
  'Les serviteurs du Paradis offrent deux boissons : l\u0027une au K\u00e2f\u00fbr (76:5), l\u0027autre au gingembre (76:17). All\u00e2h n\u0027a pas oubli\u00e9 les go\u00fbts. Tes papilles te suivront l\u00e0-bas.',
  3
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
