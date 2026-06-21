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

// Mod 1 — insertAfter "Ḥarām partit seul. Il portait la lettre. Il s'approcha de ʿĀmir."
c = insertAfter(c,
  'Il s\'approcha de \u02bf\u0100mir.","en":"","ar":""}}',
  '\u1e24ar\u0101m ibn Mil\u1e25\u0101n \u00e9tait le fr\u00e8re d\'Umm Sulaym \u2014 la m\u00e8re d\'Anas ibn M\u0101lik, le serviteur du Proph\u00e8te \ufdfa. C\'est Anas lui-m\u00eame qui rapporterait cette sc\u00e8ne des ann\u00e9es plus tard. Il avait connu son oncle. Il savait ce genre d\'homme qu\'il \u00e9tait.'
);
console.log('Mod 1 applied');

// Mod 2 — replace "ʿĀmir ibn aṭ-Ṭufayl ne s'arrêta pas là. Il mobilisa les Banū Sulaym..."
c = replacePara(c,
  '\u02bf\u0100mir ibn a\u1e6d-\u1e6cufayl ne s\'arr\u00eata pas l\u00e0. Il mobilisa les Ban\u016b Sulaym \u2014 son propre clan refusait, par respect pour Ab\u016b Bar\u0101\u02be, mais des sous-tribus, Ri\u02bfl, Dhakw\u0101n, \u02bfU\u1e63ayya, accept\u00e8rent.',
  '\u02bf\u0100mir ibn a\u1e6d-\u1e6cufayl ne s\'arr\u00eata pas l\u00e0. Il mobilisa son propre clan des Ban\u016b \u02bf\u0100mir \u2014 mais ils refus\u00e8rent. Ils dirent : \u00ab Nous ne les attaquerons pas. Ab\u016b Bar\u0101\u02be a donn\u00e9 sa garantie. \u00bb \u02bf\u0100mir se tourna alors vers les Ban\u016b Sulaym \u2014 des tribus alli\u00e9es : Ri\u02bfl, Dhakw\u00e2n, \u02bfUsayya. Eux n\'avaient pas de garantie \u00e0 respecter. Ils r\u00e9pondirent \u00e0 l\'appel.'
);
console.log('Mod 2 applied');

// Mod 3 — insertAfter "Ces mots-là entrèrent dans la mémoire de l'islam. Pas comme un slogan. Comme une énigme."
c = insertAfter(c,
  'Pas comme un slogan. Comme une \u00e9nigme.","en":"","ar":""}}',
  '\u02bf\u0100mir n\'avait pas lu la lettre du Proph\u00e8te \ufdfa. Il avait tu\u00e9 le messager avant m\u00eame de l\'ouvrir. Ce geste-l\u00e0 \u2014 tuer un messager porteur d\'une lettre \u2014 \u00e9tait une violation de toutes les lois de l\'honneur b\u00e9douin. M\u00eame dans un monde sans islam, c\'\u00e9tait inacceptable. Il savait ce qu\'il faisait.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'le fr\u00e8re d\'Umm Sulaym \u2014 la m\u00e8re d\'Anas ibn M\u0101lik',
  'Il avait connu son oncle. Il savait ce genre d\'homme qu\'il \u00e9tait',
  'Nous ne les attaquerons pas. Ab\u016b Bar\u0101\u02be a donn\u00e9 sa garantie',
  'Eux n\'avaient pas de garantie \u00e0 respecter',
  'tuer un messager porteur d\'une lettre',
  'M\u00eame dans un monde sans islam, c\'\u00e9tait inacceptable'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
