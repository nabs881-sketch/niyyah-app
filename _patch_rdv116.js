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

// Mod 1 — after "...était une provision d'Allah »."
c = insertAfter(c,
  '\u00e9tait une provision d\'Allah \u00bb.","en":"","ar":""}}',
  'Pendant sa captivit\u00e9, Khubayb demanda un rasoir pour s\u2019\u00e9piler. La femme de la maison le lui pr\u00eata. Un jour, distraite, elle se retourna et vit son jeune fils assis sur la cuisse de Khubayb \u2014 le rasoir dans la main du prisonnier. Elle fut saisie d\u2019effroi. Khubayb remarqua la peur sur son visage. Il dit\u00a0: \u00ab\u00a0Tu crains que je ne le tue\u00a0? Je ne ferai jamais cela.\u00a0\u00bb Elle dit plus tard\u00a0: \u00ab\u00a0Par Allah, je n\u2019ai jamais vu un prisonnier meilleur que Khubayb.\u00a0\u00bb'
);
console.log('Mod 1 applied');

// Mod 2 — after Mod 1 new paragraph (ending "meilleur que Khubayb. »")
c = insertAfter(c,
  'meilleur que Khubayb.\u00a0\u00bb","en":"","ar":""}}',
  'Elle dit aussi\u00a0: \u00ab\u00a0Un jour, je le trouvai en train de manger une grappe de raisin \u2014 les mains cha\u00een\u00e9es.\u00a0\u00bb Il n\u2019y avait pas de raisin \u00e0 La Mecque \u00e0 cette saison. Elle ne comprit pas d\u2019o\u00f9 il venait. C\u2019\u00e9tait une gr\u00e2ce pour un homme qui attendait la mort.'
);
console.log('Mod 2 applied');

// Mod 3 — after "On le tua."
c = insertAfter(c,
  'On le tua.","en":"","ar":""}}',
  'La femme qui l\u2019avait gard\u00e9 prisonnier dit qu\u2019elle l\u2019entendit, sur la croix, dire sa pri\u00e8re \u00e0 voix haute. Elle dit\u00a0: \u00ab\u00a0Par Allah, je n\u2019ai jamais entendu quelqu\u2019un lire le Coran d\u2019une plus belle voix que Khubayb ce jour-l\u00e0.\u00a0\u00bb Il lisait. En attendant de mourir. Comme si c\u2019\u00e9tait le moment le plus naturel du monde pour r\u00e9citer.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'le rasoir dans la main du prisonnier',
  'je n\u2019ai jamais vu un prisonnier meilleur que Khubayb',
  'une grappe de raisin \u2014 les mains cha\u00een\u00e9es',
  'le moment le plus naturel du monde pour r\u00e9citer'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
