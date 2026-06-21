const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N862 — Fractales / cellules nerveuses (ajouter référence, nuancer)
// File already has "L'univers répète ses motifs." as 3rd sentence — include it in from-string to avoid duplication
rep(
  'La structure des cellules nerveuses ressemble \u00e0 l\u0027arborescence des galaxies. La m\u00eame \u0027forme fractale\u0027 \u00e0 toutes les \u00e9chelles. L\u0027univers r\u00e9p\u00e8te ses motifs.',
  'Une \u00e9tude (Vazza & Feletti, 2020) a montr\u00e9 que la structure des cellules nerveuses ressemble \u00e0 l\u0027arborescence des galaxies \u2014 m\u00eame densit\u00e9, m\u00eame organisation. L\u0027univers r\u00e9p\u00e8te ses motifs \u00e0 toutes les \u00e9chelles.',
  1
);

// N865 — Citation Ibn al-Qayyim (supprimer guillemets de citation directe)
rep(
  'Ibn al-Qayyim disait : \u0027La foi est une exp\u00e9rience \u00e0 vivre, pas une th\u00e9orie \u00e0 comprendre.\u0027',
  'Ibn al-Qayyim enseignait que la foi se vit avant de se comprendre.',
  2
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
