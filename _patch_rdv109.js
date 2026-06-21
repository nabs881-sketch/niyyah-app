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

// Mod 1 — replace first paragraph "À Médine, on attendait."
c = replacePara(c,
  '\u00c0 M\u00e9dine, on attendait.',
  '\u00c0 M\u00e9dine, on attendait. Les nouvelles \u00e9taient arriv\u00e9es avant les hommes \u2014 des fuyards, des rumeurs, la liste des morts qui circulait de bouche en bouche. Chaque famille an\u1e63\u00e2r\u00ee avait quelqu\u2019un \u00e0 U\u1e25ud. Certaines avaient perdu leur p\u00e8re, leur fr\u00e8re, leur fils. Quand l\u2019arm\u00e9e rentra enfin \u2014 les bless\u00e9s, les \u00e9puis\u00e9s, le Messager \ufdfa couvert de sang \u2014, les femmes coururent vers eux.'
);
console.log('Mod 1 applied');

// Mod 2 — after "La ville pleura." (end of second paragraph)
c = insertAfter(c,
  'La ville pleura.","en":"","ar":""}}',
  'C\u2019est Ibn \u02bfUmar qui rapporte ce qui suivit. Le Messager d\u2019Allah \ufdfa passa pr\u00e8s du quartier des Ban\u016b \u02bfAbd al-Ashhal. Il entendit les femmes an\u1e63\u0101r\u012b pleurer leurs morts. Aucune femme ne pleurait pour \u1e24amza \u2014 il n\u2019avait pas de famille \u00e0 M\u00e9dine pour le pleurer.'
);
console.log('Mod 2 applied');

// Mod 3 — after "Pour leurs enfants."
c = insertAfter(c,
  'Pour leurs enfants.","en":"","ar":""}}',
  'Ce soir-l\u00e0, le Proph\u00e8te \ufdfa ajouta quelque chose que les sources rapportent comme une d\u00e9cision d\u00e9finitive\u00a0: \u00ab\u00a0Ordonnez-leur de ne plus pleurer aucun mort apr\u00e8s ce jour.\u00a0\u00bb \u1e24amza avait \u00e9t\u00e9 pleur\u00e9. C\u2019\u00e9tait suffisant. Les pleurs du deuil avaient eu leur heure. Il fallait maintenant continuer.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'circulait de bouche en bouche',
  'Ibn \u02bfUmar qui rapporte ce qui suivit',
  'Ordonnez-leur de ne plus pleurer',
  'Les pleurs du deuil avaient eu leur heure'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
