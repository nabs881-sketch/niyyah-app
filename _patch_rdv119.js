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

// Mod 1 — insertAfter italic "Soixante-dix de l'élite musulmane. Tués en un matin. Par trahison. Sans combat équitable."
c = insertAfter(c,
  'Sans combat \u00e9quitable.","en":"","ar":""}}',
  'Allah r\u00e9v\u00e9la pour eux un verset que les Compagnons r\u00e9cit\u00e8rent pendant un temps \u2014 jusqu\'\u00e0 son abrogation : *\u00ab Transmettez \u00e0 notre peuple de notre part : nous avons rencontr\u00e9 notre Seigneur, Il fut satisfait de nous et nous f\u00fbmes satisfaits de Lui. \u00bb* C\'\u00e9tait leur message d\'outre-tombe. Un verset qui n\'est pas rest\u00e9 dans le Coran \u2014 mais qui a exist\u00e9, et que les Compagnons ont port\u00e9 dans leur c\u0153ur.'
);
console.log('Mod 1 applied');

// Mod 2 — insertAfter "Le Messager d'Allah ﷺ pleura. Il pleura comme il n'avait pas pleuré pour les morts d'Uḥud."
c = insertAfter(c,
  'Il pleura comme il n\'avait pas pleur\u00e9 pour les morts d\'U\u1e25ud.","en":"","ar":""}}',
  'Anas ibn M\u0101lik rapporterait plus tard : \u00ab Nous ne connaissons aucune tribu arabe qui ait perdu plus de martyrs que les An\u1e63\u00e2r \u2014 et ils auront la sup\u00e9riorit\u00e9 au Jour de la R\u00e9surrection. Soixante-dix \u00e0 U\u1e24ud. Soixante-dix \u00e0 Bi\'r Ma\u02bf\u016bna. Soixante-dix \u00e0 al-Yamama. \u00bb Bi\'r Ma\u02bf\u016bna \u00e9tait au milieu. Entre deux batailles. Mais c\'\u00e9tait peut-\u00eatre la plus douloureuse des trois.'
);
console.log('Mod 2 applied');

// Mod 3 — insertAfter "...il invoqua Allah contre les tribus qui avaient trahi — Riʿl, Dhakwān, ʿUṣayya."
c = insertAfter(c,
  'invoqua Allah contre les tribus qui avaient trahi \u2014 Ri\u02bfl, Dhakw\u0101n, \u02bfU\u1e63ayya.","en":"","ar":""}}',
  'Il les nommait : Ri\u02bfl, Dhakw\u00e2n, Li\u1e25y\u00e2n, \u02bfUsayya. \u00c0 chaque pri\u00e8re, les Compagnons l\'entendaient les maudire. C\'\u00e9tait inhabituel \u2014 le Proph\u00e8te \ufdfa ne maudissait pas. Mais Bi\'r Ma\u02bf\u016bna n\'\u00e9tait pas une d\u00e9faite. C\'\u00e9tait un assassinat. Contre des envoy\u00e9s de paix. Contre des porteurs du Coran. Cela m\u00e9ritait autre chose.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'jusqu\'\u00e0 son abrogation',
  'Transmettez \u00e0 notre peuple de notre part',
  'Un verset qui n\'est pas rest\u00e9 dans le Coran',
  'aucune tribu arabe qui ait perdu plus de martyrs',
  'ils auront la sup\u00e9riorit\u00e9 au Jour de la R\u00e9surrection',
  'Bi\'r Ma\u02bf\u016bna \u00e9tait au milieu',
  'Il les nommait : Ri\u02bfl, Dhakw\u00e2n',
  'C\'\u00e9tait un assassinat. Contre des envoy\u00e9s de paix'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
