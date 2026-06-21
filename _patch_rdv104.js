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

function replacePara(content, oldFr, newFr, type) {
  type = type || 'italic';
  const oldStr = '{"type":"' + type + '","content":{"fr":"' + oldFr + '","en":"","ar":""}}';
  const newStr = '{"type":"' + type + '","content":{"fr":"' + newFr + '","en":"","ar":""}}';
  const idx = content.indexOf(oldStr);
  if (idx < 0) { console.log('OLD PARA NOT FOUND: ' + oldFr.substring(0,80)); process.exit(1); }
  return content.substring(0, idx) + newStr + content.substring(idx + oldStr.length);
}

// Mod 1 — after 'Abū Sufyān monta sur une éminence.'
c = insertAfter(c,
  'Ab\u016b Sufy\u0101n monta sur une \u00e9minence.","en":"","ar":""}}',
  'La bataille \u00e9tait finie. Les Quraysh avaient le champ. Soixante-dix musulmans \u00e9taient morts. Abu Sufyan ibn Harb \u2014 chef de la coalition mecquoise, l\u2019homme qui avait organis\u00e9 cette campagne pour venger Badr \u2014 voulait une confirmation. Il voulait entendre le silence des trois hommes qu\u2019il croyait avoir tu\u00e9s.'
);
console.log('Mod 1 applied');

// Mod 2 — after 'Vive Hubal ! Hubal est sublime ! »'
c = insertAfter(c,
  'Vive Hubal ! Hubal est sublime ! \u00bb","en":"","ar":""}}',
  'Puis il dit encore, \u00e0 voix haute, pour que les deux camps entendent\u00a0: \u00ab\u00a0Ce jour vaut pour le jour de Badr. La victoire est tant\u00f4t aux uns, tant\u00f4t aux autres. Vous trouverez sur vos morts des mutilations que je n\u2019ai pas ordonn\u00e9es \u2014 mais cela ne me chagrine pas.\u00a0\u00bb'
);
console.log('Mod 2 applied');

// Mod 3 — replace italic paragraph about 'armée meurtrière'
c = replacePara(c,
  'Ab\u016b Sufy\u0101n regarda son arm\u00e9e meurtri\u00e8re, victorieuse, et il sentit, sans pouvoir le dire, que quelque chose lui \u00e9chappait encore.',
  'Il avait gagn\u00e9 la bataille. Il avait les morts, il avait le champ, il avait Hubal au-dessus de la plaine. Mais il n\u2019avait pas les trois noms. Et les mots qu\u2019on lui avait renvoy\u00e9s \u2014 Allahu Akbar wa Ajall, Allahu Mawlan\u00e2 \u2014 n\u2019\u00e9taient pas les mots d\u2019un peuple vaincu. Quelque chose lui r\u00e9sistait qu\u2019il ne savait pas nommer.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'voulait entendre le silence des trois hommes',
  'Ce jour vaut pour le jour de Badr',
  'Quelque chose lui r\u00e9sistait qu\u2019il ne savait pas nommer'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
