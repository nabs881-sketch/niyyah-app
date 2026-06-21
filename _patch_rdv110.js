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

// Mod 1 — after "...dont la moitié sortaient avec des plaies ouvertes."
c = insertAfter(c,
  'dont la moiti\u00e9 sortaient avec des plaies ouvertes.","en":"","ar":""}}',
  'Les feux \u00e9taient nombreux \u2014 d\u00e9lib\u00e9r\u00e9ment. Le Messager d\u2019Allah \ufdfa avait ordonn\u00e9 qu\u2019on en allume cinq cents. De loin, dans la nuit, cela ressemblait \u00e0 une arm\u00e9e immense. Un signal visible \u00e0 des miles \u00e0 la ronde.'
);
console.log('Mod 1 applied');

// Mod 2 — replace Maabad paragraph
const oldMaabad = 'Ab\u016b Sufy\u0101n re\u00e7ut les nouvelles. Ma\u02bfbad al-Khuz\u0101\u02bf\u012b \u2014 un homme sympathisant des musulmans \u2014 lui dit avec frayeur : \u00ab Mohammed sort vers vous avec une arm\u00e9e comme jamais je n\'en ai vu. Ils br\u00fblent du d\u00e9sir de revanche \u00bb.';
const newMaabad = 'Ab\u016b Sufy\u0101n re\u00e7ut les nouvelles. Avant de quitter M\u00e9dine, Ma\u02bfbad al-Khuz\u0101\u02bf\u00ee \u2014 un homme des Ban\u016b Khuz\u0101\u02bfa, non encore musulman mais sympathisant \u2014 avait rendu visite au Proph\u00e8te \ufdfa pour lui pr\u00e9senter ses condol\u00e9ances. En repartant, il croisa l\u2019arm\u00e9e de Quraysh. Abu Sufyan l\u2019interrogea. Ma\u02bfbad lui dit\u00a0: \u00ab\u00a0Je les ai laiss\u00e9s derri\u00e8re moi \u2014 Muhammad et ses hommes \u2014 dans un \u00e9tat que je n\u2019ai jamais vu. Ils br\u00fblent de vous retrouver.\u00a0\u00bb Il mentait pour prot\u00e9ger les musulmans. Les Quraysh, qui h\u00e9sitaient \u00e0 revenir attaquer M\u00e9dine, abandonn\u00e8rent le projet.';
c = replacePara(c, oldMaabad, newMaabad);
console.log('Mod 2 applied');

// Mod 3 — after last italic "immense récompense. »"
c = insertAfter(c,
  'immense r\u00e9compense. \u00bb","en":"","ar":""}}',
  'Des ann\u00e9es plus tard, \u02bfA\u0304\u2019isha r\u00e9cita ce verset \u00e0 son neveu \u02bfUrwa ibn al-Zubayr. Elle dit\u00a0: \u00ab\u00a0\u00d4 mon neveu, tes deux p\u00e8res ont r\u00e9pondu\u00a0\u00bb \u2014 elle parlait de Zubayr ibn al-\u02bfAww\u00e2m, p\u00e8re de \u02bfUrwa, et d\u2019Ab\u016b Bakr, son grand-p\u00e8re. Tous deux avaient march\u00e9 \u00e0 \u1e24amr\u0101\u02be al-Asad, bless\u00e9s. Ce verset les concernait.',
  'text'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'signal visible \u00e0 des miles \u00e0 la ronde',
  'Il mentait pour prot\u00e9ger les musulmans',
  'tes deux p\u00e8res ont r\u00e9pondu',
  'Ce verset les concernait'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
