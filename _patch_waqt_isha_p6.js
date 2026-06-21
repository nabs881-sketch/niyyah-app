const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N821 — Photosynthèse (nuancer efficacité)
rep(
  'La photosynth\u00e8se convertit la lumi\u00e8re en \u00e9nergie chimique avec 95% d\u0027efficacit\u00e9 \u2014 par tunnel quantique. Les panneaux solaires humains plafonnent \u00e0 20%. Une feuille d\u0027arbre est 4 fois plus efficace que la meilleure technologie humaine. All\u00e2h enseigne par les feuilles.',
  'La photosynth\u00e8se transf\u00e8re l\u0027\u00e9nergie lumineuse avec une efficacit\u00e9 proche de 95% \u2014 via un m\u00e9canisme de tunnel quantique d\u00e9couvert en 2007. Les panneaux solaires humains plafonnent \u00e0 20% de conversion totale. Une feuille d\u0027arbre reste imbattable. All\u00e2h enseigne par les feuilles.',
  1
);

// N825 — Moteur flagellaire / rendement 100% (nuancer)
rep(
  'Avec un rendement de 100% (aucune perte d\u0027\u00e9nergie). Aucun moteur humain n\u0027atteint 100% de rendement. La perfection m\u00e9canique existe \u2014 mais pas chez nous.',
  'Avec un rendement exceptionnellement proche du maximum th\u00e9orique \u2014 un exploit qu\u0027aucun moteur humain n\u0027\u00e9gale. La perfection m\u00e9canique existe \u2014 mais pas chez nous.',
  2
);

// N826 — Oiseaux / champ magnétique (SUPPRIMER — doublon n°646)
// Note: jusqu'à uses U+2019
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Des oiseaux traversent des milliers de kilom\u00e8tres jusqu\u2019\u00e0 un point pr\u00e9cis, guid\u00e9s par le champ magn\u00e9tique de la terre \u2014 certains pour la premi\u00e8re fois, sans personne pour leur montrer. Qui a inscrit la route en eux ?",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  3
);

// N828 — Savant syndrome (corriger orthographe et formulation)
rep(
  'La \u0027savant syndrome\u0027 : des personnes autistes ou cerveau-l\u00e9s\u00e9es affichent des capacit\u00e9s surhumaines.',
  'Le syndrome du savant : des personnes autistes ou ayant subi des l\u00e9sions c\u00e9r\u00e9brales affichent des capacit\u00e9s surhumaines.',
  4
);

// N831 — Bâillement contagieux (SUPPRIMER — doublon n°656)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Le \u0027tipping point\u0027 du b\u00e2illement : une seule personne b\u00e2ille dans une pi\u00e8ce. En quelques secondes, plusieurs autres aussi. M\u00eame les chiens b\u00e2illent quand leur ma\u00eetre b\u00e2ille. Une force invisible relie les corps.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  5
);

// N832 — Mémoire olfactive (SUPPRIMER — doublon n°672)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "L\u0027\u00e9cho m\u00e9moriel olfactif est plus fort que les autres m\u00e9moires. Tu sens une odeur de ton enfance et tu remontes 30 ans. Aucun autre sens n\u0027a ce pouvoir. Pourquoi l\u0027odorat ? La science : \u0027Probablement la proximit\u00e9 du syst\u00e8me limbique.\u0027 Probablement.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  6
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
