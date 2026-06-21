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

// Mod 1 — insert BEFORE first paragraph "Le vendredi qui suivit Uḥud"
c = insertBefore(c,
  '{"type":"text","content":{"fr":"Le vendredi qui suivit U\u1e25ud',
  '\u02bfAbdull\u0101h ibn Ubayy ibn Sal\u016bl n\u2019\u00e9tait pas n\u2019importe qui. Avant l\u2019arriv\u00e9e du Proph\u00e8te \ufdfa \u00e0 M\u00e9dine, il \u00e9tait sur le point d\u2019\u00eatre couronn\u00e9 roi de la ville \u2014 les deux tribus principales, Aws et Khazraj, s\u2019appr\u00eataient \u00e0 le proclamer. La venue du Proph\u00e8te \ufdfa avait rendu ce couronnement inutile. Il n\u2019avait jamais vraiment pardonn\u00e9.'
);
console.log('Mod 1 applied');

// Mod 2 — after last paragraph ending "pas à l'homme."
c = insertAfter(c,
  "pas \u00e0 l'homme.\",\"en\":\"\",\"ar\":\"\"}}",
  'Ibn Ubayy mourut quelques ann\u00e9es plus tard, toujours \u00e0 M\u00e9dine, toujours chef de clan, toujours dans les mosqu\u00e9es. Son fils \u2014 \u02bfAbdull\u0101h ibn \u02bfAbdull\u0101h ibn Ubayy \u2014 \u00e9tait l\u2019exact oppos\u00e9 de son p\u00e8re\u00a0: un croyant sinc\u00e8re, d\u00e9vou\u00e9, qui avait combattu \u00e0 U\u1e25ud quand son p\u00e8re faisait demi-tour. Il proposa un jour au Proph\u00e8te \ufdfa de tuer son propre p\u00e8re s\u2019il le fallait pour la communaut\u00e9. Le Proph\u00e8te \ufdfa refusa. Et quand ibn Ubayy mourut, c\u2019est le Proph\u00e8te \ufdfa lui-m\u00eame qui pria sur lui \u2014 malgr\u00e9 les objections d\u2019\u02bfUmar.'
);
console.log('Mod 2 applied');

// Mod 3 — after Mod 2 new paragraph (ending "malgré les objections d'ʿUmar.")
c = insertAfter(c,
  'malgr\u00e9 les objections d\u2019\u02bfUmar.","en":"","ar":""}}',
  'Le Coran avait d\u00e9j\u00e0 parl\u00e9 de lui \u2014 les versets sur les mun\u0101fiq\u016bn, les hypocrites, sont en partie r\u00e9v\u00e9l\u00e9s \u00e0 son sujet. Mais tant qu\u2019il se pr\u00e9sentait \u00e0 la mosqu\u00e9e, tant qu\u2019il n\u2019avait pas ouvertement reni\u00e9 l\u2019islam, le Proph\u00e8te \ufdfa le traita comme un musulman. Ce n\u2019\u00e9tait pas de la na\u00efvet\u00e9. C\u2019\u00e9tait une ligne qu\u2019il avait d\u00e9cid\u00e9 de ne pas franchir \u2014 la ligne entre le for int\u00e9rieur et l\u2019acte public.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  's\u2019appr\u00eataient \u00e0 le proclamer',
  'l\u2019exact oppos\u00e9 de son p\u00e8re',
  'malgr\u00e9 les objections d\u2019\u02bfUmar',
  'le for int\u00e9rieur et l\u2019acte public'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
