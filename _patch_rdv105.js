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

function insertBefore(content, anchorStart, newParaFr) {
  const newPara = '{"type":"text","content":{"fr":"' + newParaFr + '","en":"","ar":""}},';
  const idx = content.indexOf(anchorStart);
  if (idx < 0) { console.log('ANCHOR NOT FOUND: ' + anchorStart.substring(0,80)); process.exit(1); }
  return content.substring(0, idx) + newPara + content.substring(idx);
}

// Mod 1 — insert BEFORE first paragraph "Quand les Quraysh furent sûrs d'avoir gagné"
c = insertBefore(c,
  '{"type":"text","content":{"fr":"Quand les Quraysh furent s\u00fbrs d\'avoir gagn\u00e9',
  'Hind bint \u02bfUtba avait fait une promesse avant la bataille. \u00c0 Badr, elle avait perdu son p\u00e8re, son fr\u00e8re et son oncle. Elle tenait \u1e24amza pour responsable. Elle avait promis une r\u00e9compense \u00e0 celui qui lui rapporterait son foie. Et elle avait affranchit Wahsh\u00ee \u2014 un esclave abyssin r\u00e9put\u00e9 pour son adresse \u00e0 la lance \u2014 \u00e0 condition qu\u2019il accomplisse cette chose.'
);
console.log('Mod 1 applied');

// Mod 2 — after "Hind bint ʿUtba alla droit vers Hamza."
c = insertAfter(c,
  'Hind bint \u02bfUtba alla droit vers Hamza.","en":"","ar":""}}',
  'Wahsh\u00ee l\u2019avait tu\u00e9 dans la m\u00eal\u00e9e \u2014 il l\u2019avait frapp\u00e9 d\u2019une lance dans le flanc, puis s\u2019\u00e9tait retir\u00e9. Sa t\u00e2che \u00e9tait accomplie. Ce qui suivit ne le concernait plus.'
);
console.log('Mod 2 applied');

// Mod 3 — after "Elle s'en para."
c = insertAfter(c,
  "Elle s'en para.\",\"en\":\"\",\"ar\":\"\"}}",
  'Quand le Messager d\u2019Allah \ufdfa vit l\u2019\u00e9tat du corps de son oncle, il ne dit rien pendant un moment. \u1e62afiyya, la s\u0153ur de \u1e24amza, voulait s\u2019approcher \u2014 les compagnons l\u2019en emp\u00each\u00e8rent d\u2019abord, puis le Proph\u00e8te \ufdfa la laissa voir. Il fit recouvrir le corps. Il dit qu\u2019il n\u2019avait jamais rien vu d\u2019aussi difficile. Les sources rapportent qu\u2019il pleura.'
);
console.log('Mod 3 applied');

// Mod 5 — after last text paragraph "Le mal aussi a une histoire..."
c = insertAfter(c,
  "jusqu'o\u00f9 le pardon, lui aussi, peut aller.\",\"en\":\"\",\"ar\":\"\"}}",
  'Hind embrassa l\u2019islam \u00e0 la conqu\u00eate de La Mecque, quelques ann\u00e9es plus tard. Elle mourut musulmane. L\u2019islam ne demande pas qu\u2019on efface ce qui s\u2019est pass\u00e9 \u2014 il demande qu\u2019on sache ce dont un c\u0153ur humain est capable, dans les deux sens.',
  'italic'
);
console.log('Mod 5 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'elle avait affranchit Wahsh\u00ee',
  'Wahsh\u00ee l\u2019avait tu\u00e9 dans la m\u00eal\u00e9e',
  'Les sources rapportent qu\u2019il pleura',
  'L\u2019islam ne demande pas qu\u2019on efface'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
