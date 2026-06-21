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

// Mod 1 — after "Il mourut quelques jours plus tard."
c = insertAfter(c,
  'Il mourut quelques jours plus tard.","en":"","ar":""}}',
  'Sur son lit de mort, Ab\u016b Salama avait fait une pri\u00e8re que personne n\u2019entendait vraiment \u00e0 ce moment-l\u00e0\u00a0: *\u00ab\u00a0\u00d4 Allah\u00a0! Accorde \u00e0 Umm Salama apr\u00e8s moi quelqu\u2019un de meilleur que moi, qui ne l\u2019affligera pas et ne lui fera pas de mal.\u00a0\u00bb* Umm Salama entendit ces mots. Elle se demanda qui pourrait \u00eatre meilleur qu\u2019Ab\u016b Salama. Elle ne comprenait pas encore.'
);
console.log('Mod 1 applied');

// Mod 2 — after "Il laissait derrière lui Umm Salama... les épreuves :"
c = insertAfter(c,
  'les \u00e9preuves :","en":"","ar":""}}',
  'Le Proph\u00e8te \ufdfa fit la pri\u00e8re fun\u00e8bre sur Ab\u016b Salama. Il fit neuf takb\u012br\u00e2t \u2014 plus que d\u2019habitude. Les Compagnons s\u2019\u00e9tonn\u00e8rent. Il leur dit\u00a0: *\u00ab\u00a0Quand bien m\u00eame aurais-je fait mille takb\u012br\u00e2t, il les m\u00e9ritait.\u00a0\u00bb* Ab\u016b Salama \u00e9tait le fils de la tante paternelle du Proph\u00e8te \ufdfa. Il \u00e9tait aussi son fr\u00e8re de lait. Il avait \u00e9t\u00e9 l\u2019un des dix premiers \u00e9migrants en Abyssinie. Il avait v\u00e9cu pour l\u2019islam et \u00e9tait mort pour lui.'
);
console.log('Mod 2 applied');

// Mod 3 — after last paragraph "...plus largement qu'elle n'avait osé demander."
c = insertAfter(c,
  'os\u00e9 demander.","en":"","ar":""}}',
  'Ab\u016b Bakr lui avait propos\u00e9 le mariage. \u02bfUmar aussi. Elle avait refus\u00e9. Puis le Proph\u00e8te \ufdfa avait propos\u00e9. Elle h\u00e9sita \u2014 elle lui parla de son \u00e2ge, de ses enfants, de sa jalousie. Il r\u00e9pondit \u00e0 chaque objection avec douceur. Elle accepta. Elle devint Umm al-Mu\u02bemin\u00een \u2014 la m\u00e8re des croyants. La du\u2019\u00e2 d\u2019Ab\u016b Salama avait \u00e9t\u00e9 exauc\u00e9e.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'qui ne l\u2019affligera pas et ne lui fera pas de mal',
  'neuf takb\u012br\u00e2t',
  'il les m\u00e9ritait',
  'La du\u2019\u00e2 d\u2019Ab\u016b Salama avait \u00e9t\u00e9 exauc\u00e9e'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
