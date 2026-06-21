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

// Mod 1 — insertAfter italic "Parce qu'Allah avait révélé que la vengeance n'appartient qu'à Lui."
c = insertAfter(c,
  'la vengeance n\'appartient qu\'\u00e0 Lui.","en":"","ar":""}}',
  'Allah avait fait descendre : *\u00ab Ce n\'est pas ton affaire \u2014 qu\'Il les pardonne ou qu\'Il les punisse : ils sont injustes. \u00bb* \u2014 \u0100l \u02bfImr\u0101n 3:128. Ce verset mit fin au qun\u00fbt. Le Proph\u00e8te \ufdfa n\'\u00e9tait pas fait pour maudire. Il \u00e9tait fait pour transmettre. M\u00eame sa col\u00e8re avait une limite que Dieu lui rappelait.'
);
console.log('Mod 1 applied');

// Mod 2 — insertAfter "...ʿAmr avait tué des innocents."
c = insertAfter(c,
  '\u02bfAmr avait tu\u00e9 des innocents.","en":"","ar":""}}',
  '\u02bf\u0100mir ibn a\u1e6d-\u1e6cufayl \u2014 le neveu tra\u00eetre d\'Ab\u016b Bar\u0101\u02be \u2014 l\'avait lib\u00e9r\u00e9 pour s\'acquitter d\'un v\u0153u de sa m\u00e8re : elle avait promis d\'affranchir un esclave. \u02bfAmr b\u00e9n\u00e9ficiait de ce v\u0153u. Il rentra donc libre \u2014 et il tua deux hommes des Ban\u016b \u02bf\u0100mir en chemin, croyant qu\'ils \u00e9taient ennemis. Ils \u00e9taient sous la protection du Proph\u00e8te \ufdfa.'
);
console.log('Mod 2 applied');

// Mod 3 — insertAfter "Il alla demander cette somme à ses alliés juifs des Banū an-Naḍīr, comme c'était l'usage du pacte."
c = insertAfter(c,
  'comme c\'\u00e9tait l\'usage du pacte.","en":"","ar":""}}',
  'Le Proph\u00e8te \ufdfa avait conclu avec les Ban\u016b an-Na\u1e0d\u00eer un trait\u00e9 de M\u00e9dine qui les obligeait \u00e0 contribuer aux prix du sang en cas de besoin. Sa d\u00e9marche \u00e9tait donc l\u00e9gitime et conforme aux accords. Il arriva chez eux avec quelques Compagnons. Il s\'assit contre un mur de leur quartier. Ils l\'accueillirent en apparence. En apart\u00e9, ils complotaient.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'Ce verset mit fin au qun\u00fbt',
  '\u0100l \u02bfImr\u0101n 3:128',
  'M\u00eame sa col\u00e8re avait une limite',
  'l\'avait lib\u00e9r\u00e9 pour s\'acquitter d\'un v\u0153u',
  'Il rentra donc libre \u2014 et il tua deux hommes des Ban\u016b',
  'Ils \u00e9taient sous la protection du Proph\u00e8te',
  'qui les obligeait \u00e0 contribuer aux prix du sang',
  'En apart\u00e9, ils complotaient'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
