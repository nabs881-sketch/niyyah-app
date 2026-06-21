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

// Mod 1 — after "Soixante-dix morts musulmans."
c = insertAfter(c,
  'Soixante-dix morts musulmans.","en":"","ar":""}}',
  'Soixante-dix corps sur la plaine d\u2019U\u1e25ud. Les Compagnons creu\u00e8rent. Ils n\u2019avaient ni le temps ni les moyens d\u2019enterrer chacun s\u00e9par\u00e9ment. Le Messager d\u2019Allah \ufdfa dit\u00a0: \u00ab\u00a0Mettez-en deux par tombe. Quel est celui qui conna\u00eet le plus le Coran\u00a0?\u00a0\u00bb On lui indiquait l\u2019un des deux \u2014 et il le pla\u00e7ait en premier, face \u00e0 la qibla. Le savoir avant tout. M\u00eame dans la terre.'
);
console.log('Mod 1 applied');

// Mod 2 — after "Pas de toilette mortuaire... là où ils étaient tombés."
c = insertAfter(c,
  'l\u00e0 o\u00f9 ils \u00e9taient tomb\u00e9s.","en":"","ar":""}}',
  'La pri\u00e8re fun\u00e8bre ne fut dite que sur \u1e24amza \u2014 pas sur les autres. Les martyrs n\u2019en ont pas besoin\u00a0: ils sont vivants aupr\u00e8s de leur Seigneur. Mais il y eut une exception remarqu\u00e9e\u00a0: \u1e24anzala ibn Ab\u00ee \u02bfA\u0304mir \u00e9tait parti au combat en \u00e9tat d\u2019impuret\u00e9 rituelle \u2014 il venait de se marier et n\u2019avait pas eu le temps de se purifier. Le Proph\u00e8te \ufdfa dit \u00e0 ses compagnons\u00a0: \u00ab\u00a0Les anges sont en train de laver votre compagnon.\u00a0\u00bb Il interrogea son \u00e9pouse. Elle confirma.'
);
console.log('Mod 2 applied');

// Mod 3 — after last paragraph "...rejoigniez à la source »."
c = insertAfter(c,
  'rejoigniez \u00e0 la source \u00bb.","en":"","ar":""}}',
  'Parmi les soixante-dix, il y avait Mu\u1e63\u02bfab ibn \u02bfUmayr \u2014 l\u2019homme qui avait tout quitt\u00e9 \u00e0 La Mecque, ses soieries, sa fortune, son rang, pour l\u2019islam. Il mourut \u00e0 U\u1e25ud sans linceul suffisant pour le couvrir. Le Proph\u00e8te \ufdfa pleura en le voyant. On couvrit sa t\u00eate avec son v\u00eatement \u2014 ses pieds rest\u00e8rent d\u00e9couverts. Le Proph\u00e8te \ufdfa dit qu\u2019on pose sur eux de l\u2019idhkhir, une herbe parfum\u00e9e. Il dit\u00a0: \u00ab\u00a0Ce monde avait tant \u00e0 lui offrir, et il a tout laiss\u00e9 pour Allah.\u00bb'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'face \u00e0 la qibla. Le savoir avant tout',
  'anges sont en train de laver votre compagnon',
  'Mu\u1e63\u02bfab ibn \u02bfUmayr',
  'il a tout laiss\u00e9 pour Allah'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
