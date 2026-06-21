const fs = require('fs');
const FAJR = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_fajr.json';
const DHUHR = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_dhuhr.json';

let fajr = fs.readFileSync(FAJR, 'utf-8');
let dhuhr = fs.readFileSync(DHUHR, 'utf-8');

function rep(raw, from, to, n, optional) {
  const idx = raw.indexOf(from);
  if (idx < 0) {
    if (optional) { console.log('C' + n + ' SKIP (already applied or not found)'); return raw; }
    console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70));
    process.exit(1);
  }
  console.log('C' + n + ' OK');
  return raw.substring(0, idx) + to + raw.substring(idx + from.length);
}

// --- waqt_fajr.json (page 9) ---

// F1: already patched (Alhamdulillâhi already present) — skip
fajr = rep(fajr,
  'Le Proph\u00e8te \ufdfa a enseign\u00e9 un du\u0027\u00e2 au r\u00e9veil qui efface les p\u00e9ch\u00e9s (sens des hadiths). Aujourd\u0027hui, accepte ce pardon. Ne tra\u00eene pas hier. C\u0027est une page nouvelle.',
  'Le Proph\u00e8te \ufdfa a enseign\u00e9 le du\u0027\u00e2 du r\u00e9veil \u2014 Alhamdulill\u00e2hi-lladh\u00ee ahy\u00e2n\u00e2 (Bukhari). Dis-le. C\u0027est ta premi\u00e8re page blanche.',
  1, true);

// F2
fajr = rep(fajr,
  'Tu Le verras toujours \u2014 sois l\u00e0 pour ce regard-l\u00e0.',
  'Il te voit toujours. Aujourd\u0027hui, vis \u00e0 la hauteur de ce regard.',
  2);

// F3
fajr = rep(fajr,
  'Si tu reviens \u00e0 Niyyah apr\u00e8s une longue absence \u2014 sois bienvenu.',
  'Si tu reviens apr\u00e8s une longue absence \u2014 sois bienvenu.',
  3);

// F4: actual file text differs from SPEC find — adapt
fajr = rep(fajr,
  'parle d\u0027islam \u00e0 UNE personne qui t\u0027\u00e9coute. Pas pour convertir \u2014 pour transmettre une connaissance utile. Le savoir partag\u00e9 devient sadaqa j\u00e2riya.',
  'partage une connaissance utile avec une personne. Un verset. Un fait. Une sagesse. Le savoir transmis reste.',
  4);

// F5
fajr = rep(fajr,
  'Le Proph\u00e8te \ufdfa a recommand\u00e9 le respect des gens de science (sens des hadiths). La oumma se d\u00e9chire par la m\u00e9disance.',
  'Les savants sont les h\u00e9ritiers des Proph\u00e8tes (Abu Dawud, hasan). Leur r\u00e9putation m\u00e9rite protection.',
  5);

// F6: Mûsâ=M\u00fbsâ, Ibrâhîm=Ibr\u00e2h\u00eem — all with proper accented chars
fajr = rep(fajr,
  'Comme M\u00fbs\u00e2 et Ibr\u00e2h\u00eem priaient pour leurs peuples (Coran).',
  'Comme Ibr\u00e2h\u00eem priait pour sa communaut\u00e9 (Coran 14:41) et M\u00fbs\u00e2 pour son peuple (Coran 7:155).',
  6);

// F7
fajr = rep(fajr,
  'C\u0027est un choix qu\u0027All\u00e2h a fait POUR toi avant ta naissance, et que tu confirmes chaque jour par ta pr\u00e9sence.',
  'C\u0027est une guidance qu\u0027All\u00e2h t\u0027a accord\u00e9e. Renouvelle-la chaque jour par tes actes.',
  7);

// F8
fajr = rep(fajr,
  'La langue qui dhikrise sans le c\u0153ur est lettre morte.',
  'La langue qui prononce sans le c\u0153ur est lettre morte.',
  8);

// F9
fajr = rep(fajr,
  'Le Proph\u00e8te \ufdfa ne humiliait jamais.',
  'Le Proph\u00e8te \ufdfa n\u0027humiliait personne.',
  9);

fs.writeFileSync(FAJR, fajr, 'utf-8');
console.log('waqt_fajr.json written.');

// --- waqt_dhuhr.json (page 10) ---

// D1
dhuhr = rep(dhuhr,
  'La libert\u00e9 du voile est aussi une cause silencieuse. Honore-la en pens\u00e9e.',
  'La libert\u00e9 de pratiquer est un cadeau. Honore-la en pens\u00e9e \u2014 pour ceux qui ne l\u0027ont pas.',
  10);

// D2: apostrophes U+2019 in dhuhr file
dhuhr = rep(dhuhr,
  'La lumi\u00e8re met 8 minutes \u00e0 arriver depuis le Soleil. Quand tu la sens, elle est partie il y a 8 minutes. Allah t\u2019\u00e9crit en avance. Tu vis dans la trace de Sa d\u00e9cision pass\u00e9e.',
  'La lumi\u00e8re met 8 minutes \u00e0 arriver depuis le Soleil. Quand tu la sens sur ta peau, elle a voyag\u00e9. Chaque don d\u2019Allah voyage vers toi avant m\u00eame que tu le demandes.',
  11);

// D3: apostrophes U+2019 in dhuhr file
dhuhr = rep(dhuhr,
  'Tu as ouvert l\u2019app aujourd\u2019hui. Quelqu\u2019un d\u2019autre, pas. Allah t\u2019a guid\u00e9 \u00e0 un geste qu\u2019Il valorise. Tu ne t\u2019es pas amen\u00e9 ici tout seul.',
  'Tu as choisi ce moment de rappel aujourd\u2019hui. Tu ne t\u2019es pas amen\u00e9 ici tout seul.',
  12);

fs.writeFileSync(DHUHR, dhuhr, 'utf-8');
console.log('waqt_dhuhr.json written.');
