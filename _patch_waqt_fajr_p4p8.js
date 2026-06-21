const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_fajr.json';
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

// --- Page 4 ---

rep('rapport\u00e9 dans plusieurs voies). D\u00e9tail oubli\u00e9 de notre rapidit\u00e9 moderne.',
    'certaines voies le rapportent. Qu\u0027il soit \u00e9tabli ou non \u2014 prends soin de toi apr\u00e8s le wudu. C\u0027est d\u00e9j\u00e0 de l\u0027adab.', 1);

rep('le Proph\u00e8te \ufdfa aimait pratiquer les actes de purification le vendredi (Hadith \u2014 plusieurs voies). Un d\u00e9tail oubli\u00e9 \u2014 la sunnah jusque dans tes ongles.',
    'les actes de fitrah \u2014 dont couper les ongles \u2014 font partie de la sunnah du Proph\u00e8te \ufdfa (Muslim 261). Le vendredi est un bon jour pour les accomplir.', 2);

rep('L\u0027eau b\u00e9nie est plus d\u00e9salt\u00e9rante que l\u0027eau press\u00e9e.',
    'L\u0027eau prise avec conscience entre diff\u00e9remment.', 3);

rep('Tu remplis ta responsabilit\u00e9 civile \u2014 devient acte d\u0027adoration.',
    'Tu remplis ce qui t\u0027est d\u00fb \u2014 et l\u0027intention le transforme.', 4);

// --- Page 5 ---

rep('C\u0027est cette cat\u00e9gorie de hasan\u00e2t qui p\u00e8se le plus dans la balance.',
    'Ce que personne ne sait \u2014 Allah seul le p\u00e8se.', 5);

rep('Dans 30 jours, elle est en toi.',
    'Dans 30 jours, tu l\u0027auras rencontr\u00e9e. Le reste vient avec le temps.', 6);

rep('Le Proph\u00e8te \ufdfa a dit que le paradis est sous les pieds des m\u00e8res (Hadith). Marche dessus aujourd\u0027hui.',
    'Le Proph\u00e8te \ufdfa a mis la m\u00e8re au-dessus du p\u00e8re trois fois avant de nommer ce dernier (Bukhari 5971). Marche dans ce sens aujourd\u0027hui.', 7);

rep('Vise UN parent \u00e0 appeler aujourd\u0027hui. Pas un message. Un appel. Le Proph\u00e8te \ufdfa a s\u00e9v\u00e8rement rappel\u00e9 l\u0027importance du lien familial (Bukhari). R\u00e9tablis si tu as rompu. Renforce si tu n\u0027as pas rompu.',
    'Pas uniquement tes parents \u2014 un oncle, une tante, un cousin perdu de vue. Le lien du sang a des droits (Bukhari). R\u00e9tablis si tu as rompu. Renforce si tu n\u0027as pas rompu.', 8);

rep('L\u0027islam n\u0027est pas la gravit\u00e9 \u2014 c\u0027est la lumi\u00e8re qui se transmet.',
    'L\u0027islam n\u0027est pas le front pliss\u00e9 \u2014 c\u0027est la lumi\u00e8re qui se transmet.', 9);

// --- Page 6 ---

rep('Niyyah te donne cette heure \u00e9parpill\u00e9e dans la journ\u00e9e.',
    'Un peu de savoir chaque jour change un homme en quelques ann\u00e9es.', 10);

rep('une bonne action faite ce matin avec une intention pure p\u00e8se aussi dans la balance. La qualit\u00e9 d\u00e9passe parfois la quantit\u00e9.',
    'une bonne action sinc\u00e8re faite ce matin n\u0027est pas perdue. Allah ne laisse rien se perdre.', 11);

rep('Tu \u00e9teins quelque chose dans l\u0027invisible.',
    'La sadaqa cach\u00e9e a une puissance que la sadaqa publique n\u0027a pas toujours.', 12);

rep('al-Bukh\u00e2r\u00ee dans al-Adab al-Mufrad ; cha\u00eene class\u00e9e hasan)',
    'al-Adab al-Mufrad, hasan)', 13);

rep('Les actes les plus cach\u00e9s et les plus sinc\u00e8res sont les plus aim\u00e9s d\u0027All\u00e2h. \u00bb (Sens g\u00e9n\u00e9ral de plusieurs hadiths)',
    'Les actes les plus cach\u00e9s et les plus sinc\u00e8res sont les plus aim\u00e9s d\u0027All\u00e2h.', 14);

rep('Le Proph\u00e8te \ufdfa a dit : \u00ab Acquittez ce qui est d\u00fb \u00e0 All\u00e2h. \u00bb (Bukhari)',
    'Les ul\u00e9mas recommandent de rattraper progressivement. Commence. Allah voit l\u0027effort.', 15);

rep('Niyyah te le facilite.',
    'Le chemin du savoir te facilite le Paradis.', 16);

rep('(al-Bayhaq\u00ee dans Shu\u0027ab al-\u00cemân)',
    '(al-Bayhaq\u00ee \u2014 sens corrobor\u00e9 par d\u0027autres voies)', 17);

rep('ne profanes pas tes outils d\u0027adoration en lieu impur.',
    'L\u0027adab islamique commence par respecter les lieux et les moments.', 18);

// C19: actual file text is longer than SPEC expected
rep('Niyyah Du\u0027\u00e2s te le fournit. Dans un an, tu auras 365 du\u0027\u00e2s en toi. Tu prieras autrement.',
    'Niyyah te le propose. Dans un an, tu prieras autrement.', 19);

rep('Une journ\u00e9e muette = une journ\u00e9e propre.',
    'Une journ\u00e9e sans se plaindre = une journ\u00e9e de foi active.', 20);

rep('(multiples hadiths).',
    '(Abu Dawud, Tirmidhi).', 21);

rep('Le Proph\u00e8te \ufdfa marquait un temps avant le takb\u00eer. Un silence pr\u00e9paratoire change la qualit\u00e9 de ta salat.',
    'Un silence pr\u00e9paratoire change la qualit\u00e9 de ta salah. Les savants le recommandent.', 22);

rep('Niyyah Fiqh te r\u00e9pond. Un trou combl\u00e9 par jour.',
    'La r\u00e9ponse est accessible \u2014 cherche-la aujourd\u0027hui.', 23);

rep('Le Proph\u00e8te \ufdfa disait : \u00ab All\u00e2h est avec ses faibles serviteurs. \u00bb (Tirmidhi, hasan)',
    'Le Proph\u00e8te \ufdfa disait : \u00ab Cherchez-moi parmi vos faibles. \u00bb (Tirmidhi, hasan)', 24);

rep('Pas par ostentation \u2014 par identit\u00e9. Une tasbih dans la poche. Un parfum not\u00e9 comme sunnah. Tu existes en tant que musulman, pas par accident.',
    'Porter le souvenir d\u0027Allah sur soi \u2014 une tasbih dans la poche, un parfum port\u00e9 en conscience. Tu existes en tant que musulman.', 25);

// C26: file has (hadith). instead of rapporté par plusieurs voies).
rep('(hadith). Une fl\u00e8che \u00e9vit\u00e9e = une bataille gagn\u00e9e.',
    'al-Hakim, sahih). Une fl\u00e8che \u00e9vit\u00e9e = une bataille gagn\u00e9e.', 26);

// C27: already applied in previous patch (P1P2P3 C15) — skip
rep('dis dans ton c\u0153ur \u00ab M\u00e2 sh\u00e2\u0027 All\u00e2h. \u00bb Tu adores en regardant.',
    'dis dans ton c\u0153ur \u00ab Subh\u00e2nAll\u00e2h. \u00bb Tu adores en regardant.', 27, true);

rep('mets un fond d\u0027\u00e9cran avec \u00ab All\u00e2h \u00bb.',
    'mets un rappel visible \u2014 un mot, une phrase.', 28);

// --- Page 7 ---

rep('Une oreille tendue est sadaqa.',
    'Donner son attention est parmi les plus belles formes de g\u00e9n\u00e9rosit\u00e9.', 29);

rep('Niyyah Du\u0027\u00e2s te le fournit. Le ma\u00eetre des istighf\u00e2r.',
    'Le ma\u00eetre des istighf\u00e2r.', 30);

rep('All\u00e2h accepte la compensation. Tu transformes un oubli en effort.',
    'Ce rappel tardif est d\u00e9j\u00e0 une forme de pr\u00e9sence.', 31);

rep('(Bukhari, Muslim).',
    '(Bukhari).', 32);

rep('Le Proph\u00e8te \ufdfa a dit : \u00ab Que celui qui \u00e9tait pr\u00e9sent transmette \u00e0 l\u0027absent. \u00bb (Bukhari)',
    'Le Proph\u00e8te \ufdfa aimait que la connaissance se propage. Transmets.', 33);

rep('on te demandera ce que tu en as fait. Pas globalement. Minute par minute.',
    '\u00c0 ta mort, cette journ\u00e9e sera dans la balance. Tout ce que tu y mets compte.', 34);

rep('La page de ce matin commence vierge.',
    'La page de ce matin est nouvelle \u2014 commence-la bien.', 35);

rep('La diff\u00e9rence est ta liste de devoirs.',
    'La diff\u00e9rence est une invitation. Commence l\u00e0 o\u00f9 tu es.', 36);

rep('(Sens du hadith de Tirmidhi)',
    '', 37);

rep('Mais EUX se rappellent de toi. Ils sont inscrits.',
    'Mais ils sont inscrits.', 38);

rep('Le pas que tu fais maintenant vers Niyyah, qui te ram\u00e8ne \u00e0 Lui \u2014 il est d\u00e9j\u00e0 compt\u00e9.',
    'Chaque pas vers Sa direction \u2014 il est d\u00e9j\u00e0 compt\u00e9.', 39);

rep('L\u0027incapable est celui qui suit ses d\u00e9sirs et compte sur All\u00e2h pour les pardons.',
    'L\u0027incapable est celui qui laisse son \u00e2me suivre ses d\u00e9sirs tout en esp\u00e9rant d\u0027Allah.', 40);

rep('Tu as ouvert Niyyah. Tu as lu ces mots.',
    'Tu as lu ces mots.', 41);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
