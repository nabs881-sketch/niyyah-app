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

// Mod 1 — after "Lui qui avait toutes les raisons."
c = insertAfter(c,
  'Lui qui avait toutes les raisons.","en":"","ar":""}}',
  'Les Compagnons qui \u00e9taient autour de lui avaient fait leurs propres serments. Certains avaient jur\u00e9 qu\u2019ils mutileraient trente Qurayshites de la m\u00eame fa\u00e7on \u2014 trente pour un. C\u2019est dans cette chaleur-l\u00e0, dans cette douleur-l\u00e0, que le verset descendit. Il leur donnait le droit de rendre coup pour coup. Et il leur disait que la patience \u00e9tait meilleure.'
);
console.log('Mod 1 applied');

// Mod 2 — replace Safiyya paragraph
const oldSafiyya = 'Safiyya, la s\u0153ur de Hamza, voulut venir voir. Le Proph\u00e8te \ufdfa envoya az-Zubayr la retenir : \u00ab Emp\u00eache-la, qu\'elle ne le voie pas \u00bb. Mais elle dit \u00e0 son fils : \u00ab Pourquoi ? Je suis sa s\u0153ur, j\'ai entendu qu\'on l\'a mutil\u00e9. C\'est rien, dans la voie d\'Allah. Tout est petit \u00bb. Et elle vint. Elle vit. Elle ne cria pas. Elle dit : \u00ab De Lui nous venons et \u00e0 Lui nous retournons \u00bb. Elle se tint debout devant son fr\u00e8re, et elle pria pour lui.';
const newSafiyya = '\u1e62afiyya, la s\u0153ur de \u1e24amza, voulut venir voir. Le Proph\u00e8te \ufdfa envoya az-Zubayr la retenir d\u2019abord \u2014 il ne voulait pas qu\u2019elle voie l\u2019\u00e9tat du corps. Puis il la laissa passer. Elle pria sur lui. Elle ne dit rien. Elle avait apport\u00e9 deux pi\u00e8ces de tissu pour l\u2019ensevelir \u2014 les ennemis avaient vol\u00e9 ses v\u00eatements. On les utilisa pour le couvrir.';
c = replacePara(c, oldSafiyya, newSafiyya);
console.log('Mod 2 applied');

// Mod 3 — after new Safiyya paragraph (ending "On les utilisa pour le couvrir.")
c = insertAfter(c,
  'On les utilisa pour le couvrir.","en":"","ar":""}}',
  'Le Proph\u00e8te \ufdfa fit la pri\u00e8re fun\u00e8bre sur \u1e24amza. Puis on amena d\u2019autres martyrs aupr\u00e8s de lui \u2014 l\u2019un apr\u00e8s l\u2019autre \u2014 et il pria sur eux aussi, \u1e24amza toujours pr\u00e9sent. Il pria ainsi, \u1e24amza et les autres, encore et encore, jusqu\u2019\u00e0 ce que la pri\u00e8re fun\u00e8bre ait \u00e9t\u00e9 dite soixante-dix fois. C\u2019est ce que les sources rapportent. Soixante-dix fois.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'trente Qurayshites de la m\u00eame fa\u00e7on',
  '\u1e62afiyya, la s\u0153ur de \u1e24amza, voulut venir voir',
  'On les utilisa pour le couvrir',
  'Soixante-dix fois.'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
