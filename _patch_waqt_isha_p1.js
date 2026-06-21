const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n, optional) {
  const idx = raw.indexOf(from);
  if (idx < 0) {
    if (optional) { console.log('C' + n + ' SKIP (not found)'); return; }
    console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70));
    process.exit(1);
  }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N628 — Café soufis (tempérer l'affirmation)
rep(
  'Le caf\u00e9 fut d\u00e9couvert au Y\u00e9men au XVe si\u00e8cle par des soufis qui le buvaient pour rester \u00e9veill\u00e9s pendant les nuits de dhikr \u2014 le souvenir d\u0027Allah.',
  'Une tradition rapporte que le caf\u00e9 fut popularis\u00e9 au Y\u00e9men au XVe si\u00e8cle par des soufis qui le buvaient pour rester \u00e9veill\u00e9s pendant les nuits de dhikr \u2014 le souvenir d\u0027Allah.',
  1
);

// N632 — Mehmet II (reformuler + changer verset)
rep(
  'La majorit\u00e9 chr\u00e9tienne y vivant fut non expuls\u00e9e. Il fit construire des mosqu\u00e9es \u00e0 c\u00f4t\u00e9 des \u00e9glises plut\u00f4t qu\u0027\u00e0 leur place. Il proclama : \u00ab Que les Grecs vivent selon leurs lois et leur foi. \u00bb Compare avec l\u0027Espagne chr\u00e9tienne qui, 39 ans plus tard, en 1492, expulsa tous les juifs et tous les musulmans. L\u0027histoire est t\u00eatue. Allah dit : \u00ab Et avec eux, parle avec ce qu\u0027il y a de meilleur. \u00bb (Coran 16:125).',
  'Les chr\u00e9tiens y demeur\u00e8rent \u2014 non expuls\u00e9s, non contraints dans leur foi. Il fit construire des mosqu\u00e9es \u00e0 c\u00f4t\u00e9 des \u00e9glises plut\u00f4t qu\u0027\u00e0 leur place. Il proclama : \u00ab Que les Grecs vivent selon leurs lois et leur foi. \u00bb Compare avec l\u0027Espagne chr\u00e9tienne qui, 39 ans plus tard, en 1492, expulsa tous les juifs et tous les musulmans. L\u0027histoire est t\u00eatue. Allah dit : \u00ab \u00d4 vous qui croyez ! Soyez fermement \u00e9quitables et soyez des t\u00e9moins objectifs pour Allah. \u00bb (Coran 4:135).',
  2
);

// N634 — already applied by P13-P16
rep('', '', 3, true); // placeholder skip
console.log('C3 SKIP (N634 already applied by P13-P16)');

// N636 — already applied by P13-P16
console.log('C4 SKIP (N636 already applied by P13-P16)');

// N637 — already applied by P13-P16
console.log('C5 SKIP (N637 already applied by P13-P16)');

// N639 — Al-Hadid / structure concentrique (séparer les deux arguments)
rep(
  'Les premiers chercheurs occidentaux ont pens\u00e9 que cet ordre \u00e9tait chaotique. Aujourd\u0027hui, des \u00e9tudes (notamment celle de Raymond Farrin, Structure and Quranic Interpretation, 2014) montrent que la structure du Coran suit un sch\u00e9ma concentrique sophistiqu\u00e9. Le centre du livre est la sourate 57, Al-Hadid (Le Fer). La science confirme aujourd\u0027hui que tout le fer de la Terre vient de l\u0027espace, form\u00e9 dans les supernovas \u2014 exactement comme dit le verset 25 de cette sourate.',
  'Les premiers chercheurs occidentaux ont pens\u00e9 que cet ordre \u00e9tait chaotique. Aujourd\u0027hui, des \u00e9tudes (notamment celle de Raymond Farrin, Structure and Quranic Interpretation, 2014) montrent que la structure du Coran suit un sch\u00e9ma concentrique sophistiqu\u00e9. Le centre du livre est la sourate 57, Al-Hadid (Le Fer) \u2014 dont le verset 25 dit que le fer a \u00e9t\u00e9 \u00ab fait descendre \u00bb. Deux observations ind\u00e9pendantes. Deux raisons de s\u0027arr\u00eater.',
  6
);

// N644 — already applied by P13-P16 (C23)
console.log('C7 SKIP (N644 already applied by P13-P16)');

// N646 — DELETE (doublon n°563) — uses U+2019 in jusqu'à
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES",\n    "fr": "Des oiseaux traversent des milliers de kilom\u00e8tres jusqu\u2019\u00e0 un point pr\u00e9cis, guid\u00e9s par le champ magn\u00e9tique de la terre \u2014 certains pour la premi\u00e8re fois, sans personne pour leur montrer. Qui a inscrit la route en eux ?"\n  }',
  '',
  8
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
