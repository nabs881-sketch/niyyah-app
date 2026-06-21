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
  type = type || 'text';
  const oldStr = '{"type":"' + type + '","content":{"fr":"' + oldFr + '","en":"","ar":""}}';
  const newStr = '{"type":"' + type + '","content":{"fr":"' + newFr + '","en":"","ar":""}}';
  const idx = content.indexOf(oldStr);
  if (idx < 0) { console.log('OLD PARA NOT FOUND: ' + oldFr.substring(0,80)); process.exit(1); }
  return content.substring(0, idx) + newStr + content.substring(idx + oldStr.length);
}

// Mod 1 — replace paragraph "Fāṭima était venue avec d'autres femmes..."
const oldMod1 = 'F\u0101\u1e6dima \u00e9tait venue avec d\'autres femmes, \u00e0 pied, depuis M\u00e9dine. Quand elle vit son p\u00e8re dans cet \u00e9tat \u2014 la dent cass\u00e9e, le visage ouvert, le casque plant\u00e9 dans la joue \u2014 elle se mit \u00e0 pleurer. Pas longtemps. Elle prit l\'eau et commen\u00e7a \u00e0 laver.';
const newMod1 = 'F\u0101\u1e6dima \u00e9tait venue avec d\u2019autres femmes, \u00e0 pied, depuis M\u00e9dine. Elle avait dix-huit ans. La nouvelle de la d\u00e9route avait travers\u00e9 la ville avant m\u00eame que les rescap\u00e9s n\u2019arrivent \u2014 des femmes couraient vers U\u1e25ud pour chercher leurs hommes. F\u0101\u1e6dima cherchait son p\u00e8re.';
c = replacePara(c, oldMod1, newMod1);
console.log('Mod 1 applied');

// Mod 2 — insert after new Mod 1 paragraph (ending "Fāṭima cherchait son père.")
c = insertAfter(c,
  'F\u0101\u1e6dima cherchait son p\u00e8re.","en":"","ar":""}}',
  'Quand elle le vit \u2014 la dent cass\u00e9e, le sang sur le visage, le casque enfonc\u00e9 \u2014 elle ne dit rien. Les sources rapportent qu\u2019elle pleurait. Le Proph\u00e8te \ufdfa, en la voyant pleurer, pleura aussi. Ce moment n\u2019est pas dans un discours. Il est dans deux visages qui se regardent.'
);
console.log('Mod 2 applied');

// Mod 3 — after "Mais l'eau ne faisait qu'accroître le saignement."
c = insertAfter(c,
  "Mais l'eau ne faisait qu'accro\u00eetre le saignement.\",\"en\":\"\",\"ar\":\"\"}}",
  '\u02bfAl\u00ee versait. F\u0101\u1e6dima lavait. L\u2019eau descendait sur le visage du Proph\u00e8te \ufdfa et le sang ne s\u2019arr\u00eatait pas. Il y avait dans ce geste quelque chose de d\u00e9sesp\u00e9r\u00e9 et de patient \u00e0 la fois \u2014 laver une blessure qu\u2019on ne peut pas refermer, continuer quand m\u00eame.'
);
console.log('Mod 3 applied');

// Mod 4 — after "Le sang s'arrêta."
c = insertAfter(c,
  "Le sang s'arr\u00eata.\",\"en\":\"\",\"ar\":\"\"}}",
  'Sahl ibn Sa\u02bfd, qui \u00e9tait l\u00e0 et rapporterait cette sc\u00e8ne des ann\u00e9es plus tard, dirait : \u00ab\u00a0Par Allah, je connais celle qui lavait la blessure du Messager d\u2019Allah \ufdfa, et celui qui versait l\u2019eau, et ce avec quoi la blessure fut caut\u00e9ris\u00e9e.\u00a0\u00bb Il n\u2019avait pas oubli\u00e9. Certaines sc\u00e8nes ne s\u2019oublient pas.'
);
console.log('Mod 4 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'F\u0101\u1e6dima cherchait son p\u00e8re',
  'deux visages qui se regardent',
  'laver une blessure qu\u2019on ne peut pas refermer',
  'Certaines sc\u00e8nes ne s\u2019oublient pas'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
