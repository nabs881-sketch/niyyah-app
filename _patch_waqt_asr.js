const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n, optional) {
  const idx = raw.indexOf(from);
  if (idx < 0) {
    if (optional) { console.log('C' + n + ' SKIP (already applied or not found)'); return; }
    console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70));
    process.exit(1);
  }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// C1 — apostrophes U+2019, future tense: disparaîtra / apparaîtra
rep('Le Proph\u00e8te \ufdfa a dit : \u00ab L\u2019Heure ne viendra pas tant que la science ne dispara\u00eetra et que l\u2019ignorance n\u2019appara\u00eetra. \u00bb',
    'Le Proph\u00e8te \ufdfa a dit : \u00ab L\u2019Heure ne viendra pas tant que le \u2018ilm ne dispara\u00eetra et que l\u2019ignorance n\u2019appara\u00eetra. \u00bb (Bukhari) Le mot arabe est \u2018ilm \u2014 le savoir religieux, pas la technologie.',
    1);

// C2
rep('Quatorze si\u00e8cles avant G\u00f6del, la limite \u00e9tait d\u00e9j\u00e0 nomm\u00e9e.',
    'Quatorze si\u00e8cles avant G\u00f6del, le Coran nommait d\u00e9j\u00e0 la limite du savoir humain.',
    2);

// C3
rep('La foi n\u2019est pas un sentiment d\u00e9coratif. C\u2019est un m\u00e9canisme qui agit.',
    'La foi n\u2019est pas une illusion confortable. Elle agit. Et ce qu\u2019elle produit d\u00e9passe ce que la m\u00e9decine peut mesurer.',
    3);

// C4
rep('Allah ouvre les c\u0153urs pr\u00e9cis\u00e9ment \u00e0 ceux qui cherchent vraiment.',
    'Allah guide qui Il veut \u2014 et parfois Il guide par le chemin du doute sinc\u00e8re.',
    4);

// C5
rep('Il finit sa vie musulman.',
    'Il finit sa vie profond\u00e9ment influenc\u00e9 par l\u2019islam \u2014 sa conversion reste d\u00e9battue par les historiens.',
    5);

// C6
rep('le savoir, quand il est honn\u00eate, finit toujours par croiser la foi.',
    'le savoir honn\u00eate finit souvent par poser des questions que seule la foi peut habiter.',
    6);

// C7
rep('ce qui est plus difficile \u00e0 croire que d\u2019avoir un Cr\u00e9ateur.',
    'Choisis ce que tu trouves plus raisonnable.',
    7);

// C8
rep('Ce que la science explique aujourd\u2019hui, le Coran l\u2019\u00e9voquait il y a 14 si\u00e8cles.',
    'Une image du Coran \u2014 les eaux qui descendent \u2014 qui traverse les \u00e9poques sans se contredire.',
    8);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
