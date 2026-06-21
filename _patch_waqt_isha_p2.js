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

// N651 — NDE → Synesthésie (remplacer entièrement)
rep(
  'Les exp\u00e9riences de mort imminente : 15% des patients en arr\u00eat cardiaque rapportent une exp\u00e9rience consciente alors que leur cerveau est \u00e9teint. Le Dr Sam Parnia, AWARE Study, 2014. Ils d\u00e9crivent des choses qu\u0027ils ne pouvaient pas voir.',
  'La synth\u00e9sie : certaines personnes entendent une note de musique et voient une couleur. D\u0027autres lisent un chiffre et ressentent une texture. Le cerveau cr\u00e9e des ponts que personne n\u0027a programm\u00e9s, entre des sens qui ne se parlent pas. All\u00e2h a tiss\u00e9 en certains d\u0027entre nous des fen\u00eatres suppl\u00e9mentaires sur le r\u00e9el.',
  1
);

// N655 — Effet nocebo (tempérer la conclusion)
rep(
  'La science valide la spiritualit\u00e9.',
  'Un \u00e9cho inattendu entre la psychologie moderne et la parole proph\u00e9tique.',
  2
);

// N670 — Micro-expressions / Paul Ekman (corriger)
rep(
  'Paul Ekman, psychologue, a prouv\u00e9 qu\u0027on les capte tous, sans entra\u00eenement. Tu lis des choses que personne ne t\u0027a appris\u00e9 \u00e0 lire.',
  'Paul Ekman a prouv\u00e9 qu\u0027elles existent et qu\u0027avec entra\u00eenement, on peut les lire. Mais quelque chose en toi les capte d\u00e9j\u00e0, sans qu\u0027on te l\u0027ait appris.',
  3,
  true
);

// N670 — try alternate (apostrophes may differ)
rep(
  "Paul Ekman, psychologue, a prouv\u00e9 qu\u2019on les capte tous, sans entra\u00eenement. Tu lis des choses que personne ne t\u2019a appris\u00e9 \u00e0 lire.",
  'Paul Ekman a prouv\u00e9 qu\u2019elles existent et qu\u2019avec entra\u00eenement, on peut les lire. Mais quelque chose en toi les capte d\u00e9j\u00e0, sans qu\u2019on te l\u2019ait appris.',
  '3b',
  true
);

// N677 — Fred Hoyle (adapt: replace reader-address ending with factual info)
// Actual text ends with: "Et toi, que diras-tu ?" — SPEC from-string not present
// We adapt: replace ending with the nuanced info about "intelligence cosmique"
rep(
  'Et toi, que diras-tu ?',
  'Vers la fin de sa vie, il \u00e9voquait une \u2018intelligence cosmique\u2019. Il n\u2019a jamais dit \u2018Dieu\u2019. Mais il avait cess\u00e9 de dire \u2018hasard\u2019.',
  4
);

// N680 — Penrose loto (SKIP: from-string not in any file — different version already present)
console.log('C5 SKIP (N680 Penrose loto: from-string absent — different version in file)');

// N682 — Penrose "dit que non" (SKIP: same reason)
console.log('C6 SKIP (N682 Penrose "dit que non": from-string absent — different version in file)');

// N684 — Chiffre invérifiable (reformuler)
rep(
  'La cosmologie moderne a calcul\u00e9 : il faudrait 10^183800 univers pour \u00e7a. Plus d\u0027univers que d\u0027atomes dans tout le r\u00e9el. \u00c0 ce stade, on n\u0027appelle plus \u00e7a \u0027hasard\u0027. On appelle \u00e7a impossible.',
  'Les calculs de probabilit\u00e9 montrent que les chiffres d\u00e9passent tout ce que l\u0027univers connu peut contenir. \u00c0 ce stade, on n\u0027appelle plus \u00e7a \u2018hasard\u2019.',
  7
);

// N691 — Maurice Bucaille (nuancer la conversion)
rep(
  'Il \u00e9tudie le Coran pour le critiquer scientifiquement. Sept ans plus tard, il publie \u0027La Bible, le Coran et la Science\u0027. Il est devenu musulman. Aucune r\u00e9futation s\u00e9rieuse de son livre n\u0027a \u00e9t\u00e9 publi\u00e9e \u00e0 ce jour.',
  'Il \u00e9tudie le Coran pour le critiquer scientifiquement. Sept ans plus tard, il publie \u0027La Bible, le Coran et la Science\u0027. Sa conversion personnelle reste d\u00e9battue entre biographes. Son livre, lui, n\u0027a pas \u00e9t\u00e9 r\u00e9fut\u00e9 s\u00e9rieusement.',
  8
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
