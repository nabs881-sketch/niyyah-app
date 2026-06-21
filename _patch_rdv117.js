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

// Mod 1 — insertAfter second paragraph ending "...des plus grandes tribus de Najd."
c = insertAfter(c,
  'des plus grandes tribus de Najd.","en":"","ar":""}}',
  'Il apporta un cadeau au Proph\u00e8te \ufdfa. Le Proph\u00e8te \ufdfa refusa de l\'accepter \u2014 il ne prenait pas les cadeaux des polythéistes. Il lui dit : \u00ab Ab\u016b Bar\u0101\u02be, je n\'accepte pas de cadeau d\'un polythéiste. Embrasse l\'islam, alors je l\'accepterai. \u00bb Ab\u016b Bar\u0101\u02be n\'embrassa pas l\'islam ce jour-l\u00e0. Mais il dit : \u00ab Cette affaire \u00e0 laquelle tu m\'invites est belle. \u00bb'
);
console.log('Mod 1 applied');

// Mod 2 — replace last paragraph (old neveu text → new expanded version with Amir as rival)
c = replacePara(c,
  'Ils ne savaient pas qu\'Ab\u016b Bar\u0101\u02be avait un neveu. Un homme nomm\u00e9 \u02bf\u0100mir ibn a\u1e6d-\u1e6cufayl. Et que ce neveu ne respecterait pas la parole de son oncle.',
  'Ils ne savaient pas qu\'Ab\u016b Bar\u0101\u02be avait un neveu \u2014 \u02bf\u0100mir ibn a\u1e6d-\u1e6cufayl. Un homme ambitieux, son rival pour la direction de la tribu. Il ne voulait pas que les musulmans s\'installent dans la r\u00e9gion \u2014 car cela aurait renforc\u00e9 l\'influence de son oncle. Il ne respecterait pas la garantie. Et il avait des alli\u00e9s.'
);
console.log('Mod 2 applied');

// Mod 3 — insertAfter new Mod 2 paragraph (before meditation)
c = insertAfter(c,
  'Il ne respecterait pas la garantie. Et il avait des alli\u00e9s.","en":"","ar":""}}',
  'Quand Ab\u016b Bar\u0101\u02be apprit ce qui s\'\u00e9tait pass\u00e9 \u2014 que son neveu avait massacr\u00e9 la d\u00e9l\u00e9gation malgr\u00e9 sa parole donn\u00e9e \u2014 il en fut tellement honteux qu\'il tomba malade. Il mourut peu apr\u00e8s. Sa garantie avait \u00e9t\u00e9 trahie par le sien. C\'est son neveu qui l\'avait tu\u00e9, \u00e0 sa fa\u00e7on.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'il ne prenait pas les cadeaux des polythéistes',
  'Cette affaire \u00e0 laquelle tu m\'invites est belle',
  'son rival pour la direction de la tribu',
  'Et il avait des alli\u00e9s',
  'il en fut tellement honteux qu\'il tomba malade',
  'C\'est son neveu qui l\'avait tu\u00e9, \u00e0 sa fa\u00e7on'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
