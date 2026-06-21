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

// Mod 1 — after "Allah parla."
c = insertAfter(c,
  'Allah parla.","en":"","ar":""}}',
  'Soixante versets de la sourate \u0100l \u02bfIm\u0101n, peut-\u00eatre plus, sont venus apr\u00e8s U\u1e25ud. Ce n\'est pas une explication froide \u2014 c\'est une pr\u00e9sence. Allah r\u00e9pondait \u00e0 une communaut\u00e9 bless\u00e9e, confuse, qui avait vu mourir ses meilleurs hommes et qui cherchait du sens dans la d\u00e9faite.'
);
console.log('Mod 1 applied');

// Mod 2 — replace Abu Bakr paragraph
const oldAbu = 'C\'est ce verset qu\'Ab\u016b Bakr r\u00e9citera le jour de la mort du Proph\u00e8te \ufdfa, neuf ans plus tard, pour calmer une communaut\u00e9 hyst\u00e9rique de douleur. Il le citera de m\u00e9moire \u2014 et ce sera la premi\u00e8re fois que beaucoup l\'entendront. Comme si le verset avait \u00e9t\u00e9 r\u00e9v\u00e9l\u00e9 aujourd\'hui pour ce jour-l\u00e0.';
const newAbu = 'C\'est ce verset qu\'Ab\u016b Bakr r\u00e9citera le jour de la mort du Proph\u00e8te \ufdfa, neuf ans plus tard, pour calmer une communaut\u00e9 hyst\u00e9rique. Il sortit et r\u00e9cita\u00a0: *\u00ab\u00a0Muhammad n\'est qu\'un Messager. Avant lui, d\'autres messagers sont pass\u00e9s.\u00a0\u00bb* \u02bfUmar ibn al-Kha\u1e6d\u1e6d\u00e2b dirait\u00a0: *\u00ab\u00a0Par Allah, \u00e0 peine avais-je entendu Ab\u016b Bakr r\u00e9citer ce verset que je fus comme si on m\'avait coup\u00e9 les jarrets \u2014 mes jambes ne me portaient plus. Je compris que le Proph\u00e8te \u00e9tait mort.\u00a0\u00bb* \u02bfAbdull\u0101h ibn \u02bfAbdull\u0101h dit\u00a0: *\u00ab\u00a0Par Allah, il semblait qu\'aucun d\'entre nous ne connaissait ce verset avant de l\'entendre r\u00e9citer par Ab\u016b Bakr.\u00bb*';
c = replacePara(c, oldAbu, newAbu);
console.log('Mod 2 applied');

// Mod 3 — after last paragraph "ne voit."
c = insertAfter(c,
  'que personne, encore, ne voit.","en":"","ar":""}}',
  'U\u1e25ud avait pos\u00e9 une question\u00a0: peut-on faire confiance \u00e0 un Dieu dont le Proph\u00e8te saigne, dont les meilleurs serviteurs meurent, dont la communaut\u00e9 perd\u00a0? Ces versets \u00e9taient la r\u00e9ponse. Pas une promesse de victoire \u2014 une explication de la nature du chemin. Le chemin est difficile. C\'est pr\u00e9cis\u00e9ment pour \u00e7a qu\'il vaut quelque chose.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'qui cherchait du sens dans la d\u00e9faite',
  'mes jambes ne me portaient plus',
  '\u02bfAbdull\u0101h ibn \u02bfAbdull\u0101h dit',
  'C\'est pr\u00e9cis\u00e9ment pour \u00e7a qu\'il vaut quelque chose'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
