const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N845 — Argument cosmologique (SUPPRIMER — doublon n°652)
// Uses U+2019 for L' and n'
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "L\u2019univers a eu un commencement. Or tout ce qui commence \u00e0 exister a une cause. L\u2019univers a donc une cause \u2014 qui, elle, n\u2019a pas commenc\u00e9. Simple, et difficile \u00e0 esquiver.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  1
);

// N846 — Hawking / "esprit de Dieu" — SKIP: from-string absent, better version already present
console.log('C2 SKIP (N846 Hawking: from-string absent \u2014 already a nuanced version in file)');

// N847 — "Personne n'a réfuté" (reformuler)
rep(
  'Personne n\u0027a jamais r\u00e9fut\u00e9 l\u0027existence d\u0027All\u00e2h. Personne. Pas un seul philosophe, pas un seul scientifique. Le maximum qu\u0027on a pu faire, c\u0027est \u0027douter\u0027 \u2014 pas r\u00e9futer. Le doute n\u0027est pas une preuve d\u0027inexistence. C\u0027est l\u0027absence d\u0027une preuve de l\u0027inverse.',
  'Personne n\u0027a jamais prouv\u00e9 l\u0027inexistence d\u0027All\u00e2h. Le maximum qu\u0027on puisse faire, c\u0027est douter \u2014 pas r\u00e9futer. L\u0027absence de preuve n\u0027est pas une preuve d\u0027absence. C\u0027est Russell, pas l\u0027islam, qui l\u0027a dit.',
  3
);

// N848 — Kalam / attribution (corriger — substring suffix)
rep(
  'Kal\u00e2m, formul\u00e9 par al-Ghaz\u00e2l\u00ee au XIe si\u00e8cle, jamais r\u00e9fut\u00e9.',
  'Kal\u00e2m, formul\u00e9 d\u00e8s le IXe si\u00e8cle par les mutakallim\u00fbn, d\u00e9velopp\u00e9 par al-Ghaz\u00e2l\u00ee au XIe si\u00e8cle, jamais r\u00e9fut\u00e9.',
  4
);

// N851 — Argument ontologique — SKIP: from-string absent, already nuanced version in file
console.log('C5 SKIP (N851 Anselme: "Logiquement irr\u00e9futable" absent \u2014 already nuanced in file)');

// N858 — Attribution Imam Ali (tempérer)
rep(
  'Imam Ali a dit : \u0027Si All\u00e2h n\u0027existait pas et que je vivais selon Son commandement, je n\u0027aurais rien perdu. S\u0027Il existe et que je ne l\u0027ai pas suivi, j\u0027aurais tout perdu.\u0027 Pascal a redit cela 1000 ans plus tard et on l\u0027a baptis\u00e9 \u0027pari de Pascal\u0027. L\u0027id\u00e9e venait avant lui.',
  'Un raisonnement similaire est attribu\u00e9 \u00e0 Imam Ali : \u0027Si All\u00e2h n\u0027existait pas et que je vivais selon Son commandement, je n\u0027aurais rien perdu. S\u0027Il existe et que je ne l\u0027ai pas suivi, j\u0027aurais tout perdu.\u0027 Pascal l\u0027a reformul\u00e9 1000 ans plus tard. L\u0027id\u00e9e pr\u00e9c\u00e8de son nom occidental.',
  6
);

// N859 — Verset 18:23-24 mal appliqué (supprimer référence coranique)
rep(
  'Tu doutes. C\u0027est normal. Le Coran dit : \u0027Tu ne diras pas certes \u2014 sauf si All\u00e2h le veut.\u0027 M\u00eame la certitude est un don d\u0027All\u00e2h. Demande-Lui le yaq\u00een. Une du\u0027\u00e2 simple : \u0027All\u00e2humma anzil \u0027alayya yaq\u00eenan.\u0027 \u00d4 All\u00e2h, fais descendre sur moi la certitude.',
  'Tu doutes. C\u0027est normal. M\u00eame la certitude est un don d\u0027All\u00e2h. Demande-Lui le yaq\u00een. Une du\u0027\u00e2 simple : \u0027All\u00e2humma anzil \u0027alayya yaq\u00eenan.\u0027 \u00d4 All\u00e2h, fais descendre sur moi la certitude.',
  7
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
