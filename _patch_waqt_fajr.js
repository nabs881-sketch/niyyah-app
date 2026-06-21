const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_fajr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 60)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

rep('Niyyah l\u0027a. 10 secondes.',
    'Niyyah la retient pour toi. 10 secondes.', 1);

rep('Tu es un t\u00e9moin musulman, m\u00eame par ton apparence.',
    'Tu es repr\u00e9sentant de quelque chose \u2014 m\u00eame dans ce que les gens voient.', 2);

rep('C\u0027est une sunnah qui te rend plus efficace tout l\u0027apr\u00e8s-midi.',
    'Ferme les yeux. Le Proph\u00e8te \ufdfa l\u0027a fait avant toi.', 3);

rep('Tu sors marqu\u00e9 \u2014 sans personne savoir pourquoi.',
    'Ce geste-l\u00e0 ne se voit pas. Il se sent.', 4);

rep('(ou brosse \u00e0 dents) avec l\u0027intention de la sunnah. Le Proph\u00e8te \ufdfa disait : \u00ab Le siwak purifie la bouche et pla\u00eet au Seigneur. \u00bb (Ahmad, Nas\u00e2\u0027\u00ee)',
    'Si tu n\u0027en as pas, la brosse \u00e0 dents dans l\u0027intention de la sunnah. Le Proph\u00e8te \ufdfa disait : \u00ab Le siwak purifie la bouche et pla\u00eet au Seigneur. \u00bb (Ahmad, Nas\u00e2\u0027\u00ee) Le siwak se trouve facilement dans les \u00e9piceries arabes.', 5);

rep('Une marche devient un acte d\u0027adoration.',
    'Le corps aussi peut \u00eatre en dhikr.', 6);

rep('Sans rien montrer.',
    'La main droite ne dit pas \u00e0 la gauche ce qu\u0027elle donne.', 7);

rep('Pas de la magie \u2014 un d\u00e9tail qui rappelle qu\u0027Allah est dans tout, m\u00eame la posture des appels.',
    'Un d\u00e9tail qui rappelle que rien n\u0027est trop petit pour \u00eatre orient\u00e9.', 8);

rep('All\u00e2h derri\u00e8re chaque maillon.',
    'Allah derri\u00e8re chaque main qui t\u0027a nourri.', 9);

rep('La simplicit\u00e9 retrouv\u00e9e.',
    'Il mangeait ce qui \u00e9tait l\u00e0. Pas ce qu\u0027il voulait.', 10);

rep('Un acte de pr\u00e9sentation devient acte d\u0027adoration.',
    'M\u00eame le miroir peut \u00eatre un lieu de dhikr.', 11);

rep('Tu prot\u00e8ges l\u0027objet du nazar et tu remercies.',
    'Tu reconna\u00efs que l\u0027objet est un d\u00e9p\u00f4t, pas une propri\u00e9t\u00e9.', 12);

rep('La douceur est aussi don d\u0027All\u00e2h.',
    'M\u00eame le sucr\u00e9 m\u00e9rite une louange.', 13);

rep('La barakah de la nourriture commence par le respect du don.',
    'Un principe simple : ce qui vient d\u0027Allah m\u00e9rite d\u0027\u00eatre trait\u00e9 avec soin.', 14);

rep('dis dans ton c\u0153ur \u00ab M\u00e2 sh\u00e2\u0027 All\u00e2h. \u00bb Tu adores en regardant.',
    'dis dans ton c\u0153ur \u00ab Subh\u00e2nAll\u00e2h. \u00bb Tu adores en regardant.', 15);

rep('Une sieste qui devient nuit gagn\u00e9e.',
    'Le corps a des droits \u2014 m\u00eame sur le fid\u00e8le.', 16);

rep('La voiture peut \u00eatre ta derni\u00e8re demeure. B\u00e9nis ton voyage avant qu\u0027il commence.',
    'Tu reconna\u00efs que chaque voyage est un d\u00e9p\u00f4t entre Ses mains.', 17);

rep('L\u0027adab \u00e0 table fait partie de la sunnah.',
    'La dignit\u00e9 \u00e0 table est aussi une forme d\u0027adoration.', 18);

rep('Le Proph\u00e8te \ufdfa avait un adab m\u00eame avec les noyaux (Tirmidhi).',
    'L\u0027adab islamique s\u0027\u00e9tend jusqu\u0027aux d\u00e9tails invisibles.', 19);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('Done. File written.');
