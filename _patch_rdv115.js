const fs = require('fs');
let c = fs.readFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', 'utf-8');

function insertAfter(content, anchorEnd, newParaFr, type) {
  type = type || 'text';
  const newPara = ',{"type":"' + type + '","content":{"fr":"' + newParaFr + '","en":"","ar":""}}';
  const idx = content.indexOf(anchorEnd);
  if (idx < 0) { console.log('ANCHOR NOT FOUND: ' + anchorEnd.substring(0,80)); process.exit(1); }
  const insertAt = idx + anchorEnd.length;
  return content.substring(0, insertAt) + newPara + content.substring(insertAt);
}

// Mod 1 — after "Sept compagnons moururent avec lui sous une grêle de flèches."
c = insertAfter(c,
  'Sept compagnons moururent avec lui sous une gr\u00eale de fl\u00e8ches.","en":"","ar":""}}',
  'Les Quraysh avaient appris qu\u2019\u02bfA\u0304\u1e63im ibn Th\u0101bit \u00e9tait parmi les morts. Sulayfah, une femme de Quraysh, avait jur\u00e9 de boire dans son cr\u00e2ne \u2014 il avait tu\u00e9 son fils \u00e0 Badr. Ils envoy\u00e8rent des hommes pour couper sa t\u00eate. Mais Allah envoya sur son corps un nuage de gu\u00eapes et de frelons qui les emp\u00eacha d\u2019approcher. Le corps fut emport\u00e9 la nuit par une crue. \u02bfUmar ibn al-Kha\u1e6d\u1e6d\u00e2b, quand il apprit la chose, dit\u00a0: \u00ab\u00a0Allah prot\u00e8ge toujours Ses fid\u00e8les serviteurs. \u02bfA\u0304\u1e63im avait jur\u00e9 de ne jamais toucher un idol\u00e2tre \u2014 Allah l\u2019a prot\u00e9g\u00e9 apr\u00e8s sa mort.\u00a0\u00bb'
);
console.log('Mod 1 applied');

// Mod 2 — after "Aux familles dont ils avaient tué les chefs à Badr."
c = insertAfter(c,
  'Aux familles dont ils avaient tu\u00e9 les chefs \u00e0 Badr.","en":"","ar":""}}',
  'Zayd ibn ad-Dathinna fut achet\u00e9 par \u1e62afw\u0101n ibn Umayya. Avant de le faire ex\u00e9cuter, Ab\u016b Sufy\u0101n lui posa une question\u00a0: \u00ab\u00a0N\u2019aurais-tu pas voulu que Mohammed soit \u00e0 ta place, et toi libre\u00a0?\u00a0\u00bb Zayd r\u00e9pondit\u00a0: \u00ab\u00a0Par Allah, je ne voudrais m\u00eame pas qu\u2019il soit piqu\u00e9 par une \u00e9pine, moi tranquillement assis chez moi.\u00a0\u00bb Ab\u016b Sufy\u0101n dit \u00e0 ceux qui l\u2019entouraient\u00a0: \u00ab\u00a0Je n\u2019ai jamais vu quelqu\u2019un aimer quelqu\u2019un comme les compagnons de Mohammed l\u2019aiment.\u00a0\u00bb'
);
console.log('Mod 2 applied');

// Mod 3 — after last paragraph "dira juste avant de mourir."
c = insertAfter(c,
  'dira juste avant de mourir.","en":"","ar":""}}',
  'Le Proph\u00e8te \ufdfa apprit l\u2019ensemble de l\u2019\u00e9v\u00e9nement par r\u00e9v\u00e9lation, le jour m\u00eame o\u00f9 cela se passait. Il informa ses compagnons de ce qui \u00e9tait arriv\u00e9 \u00e0 la d\u00e9l\u00e9gation. M\u00e9dine sut, dans la douleur, que ses meilleurs r\u00e9citateurs avaient \u00e9t\u00e9 trahis et captur\u00e9s.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'nuage de gu\u00eapes et de frelons',
  'Allah l\u2019a prot\u00e9g\u00e9 apr\u00e8s sa mort',
  'piqu\u00e9 par une \u00e9pine, moi tranquillement assis',
  'M\u00e9dine sut, dans la douleur'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
