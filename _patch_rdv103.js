const fs = require('fs');
let c = fs.readFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', 'utf-8');

// Helper: insert newPara after anchor (anchor = unique end-of-paragraph string)
function insertAfter(content, anchorEnd, newParaFr) {
  const newPara = ',{"type":"text","content":{"fr":"' + newParaFr + '","en":"","ar":""}}';
  const idx = content.indexOf(anchorEnd);
  if (idx < 0) { console.log('ANCHOR NOT FOUND: ' + anchorEnd.substring(0,60)); process.exit(1); }
  const insertAt = idx + anchorEnd.length;
  return content.substring(0, insertAt) + newPara + content.substring(insertAt);
}

// Mod 1 — after 'Sais-tu que Mohammed est mort ? »'
c = insertAfter(c,
  'Sais-tu que Mohammed est mort ? \u00bb","en":"","ar":""}}',
  'La rumeur avait travers\u00e9 le champ de bataille comme une flamme dans l\'herbe s\u00e8che. Elle avait commenc\u00e9 dans la confusion de la d\u00e9route \u2014 une voix, peut-\u00eatre deux, qui avait cri\u00e9 le nom du Proph\u00e8te \ufdfa pour atteindre les musulmans l\u00e0 o\u00f9 les \u00e9p\u00e9es n\'atteignaient pas. Et la rumeur avait fait ce que les assaillants n\'avaient pas r\u00e9ussi \u00e0 faire\u00a0: elle avait paralys\u00e9 des hommes, fait l\u00e2cher des armes, pouss\u00e9 des pieds vers M\u00e9dine.'
);
console.log('Mod 1 applied');

// Mod 2 — after 'S il est mort, il a livré son message. Combats pour ta religion'
c = insertAfter(c,
  'S\'il est mort, il a livr\u00e9 son message. Combats pour ta religion \u00bb.","en":"","ar":""}}',
  'C\u2019est Th\u0101bit ibn ad-Da\u1e25d\u0101\u1e25 qui brisa le premier cette paralysie. Il se leva au milieu des An\u1e63\u00e2r qui h\u00e9sitaient, le regard perdu entre le champ de bataille et la route de M\u00e9dine. Il n\u2019avait pas besoin de beaucoup de mots. Il en choisit les plus simples\u00a0:'
);
console.log('Mod 2 applied');

// Mod 3 — after 'Ses compagnons tombèrent.'
c = insertAfter(c,
  'Ses compagnons tomb\u00e8rent.","en":"","ar":""}}',
  'Le Proph\u00e8te \ufdfa apprendrait sa mort plus tard. Il dirait de lui que bien des palmiers charg\u00e9s de fruits l\u2019attendaient au Paradis. Ce n\u2019\u00e9tait pas une consolation \u2014 c\u2019\u00e9tait un t\u00e9moignage. Th\u0101bit avait choisi de mourir debout plut\u00f4t que de fuir vivant. Et les hommes qui l\u2019avaient vu charger se souvinent de ce choix.'
);
console.log('Mod 3 applied');

// Mod 4 — after 'Les compagnons accouraient.' (ends the paragraphes array: }}])
c = insertAfter(c,
  'Les compagnons accouraient.","en":"","ar":""}}',
  'Le Messager d\u2019Allah \ufdfa leur fit signe de se taire \u2014 il ne voulait pas que les Quraysh rep\u00e8rent sa position. Mais c\u2019\u00e9tait trop tard. La nouvelle vraie courait d\u00e9sormais plus vite que la fausse. Et pour chaque homme qui avait l\u00e2ch\u00e9 son \u00e9p\u00e9e en entendant la rumeur de la mort, il y en avait maintenant un autre qui la reprenait en apprenant la v\u00e9rit\u00e9.'
);
console.log('Mod 4 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'elle avait paralys\u00e9 des hommes',
  'Th\u0101bit ibn ad-Da\u1e25d\u0101\u1e25 qui brisa',
  'palmiers charg\u00e9s de fruits',
  'La nouvelle vraie courait d\u00e9sormais'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
