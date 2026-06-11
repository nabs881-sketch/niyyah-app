const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

const setPara = (num, oldFr, newFr) => {
  const r = d.rdv.find(x => x.num === num);
  if (!r) { console.error('RDV ' + num + ' introuvable'); process.exit(1); }
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('RDV ' + num + ' — para introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// RDV 23 [1] : logique maître/esclave
setPara(23,
  "Trois ans depuis Hirâ. Trois ans pendant lesquels l'islam était resté caché. Le Prophète ﷺ ne parlait qu'à ceux qu'il connaissait. Les compagnons priaient en secret, dans les ravins. Quand on les surprenait, ils s'arrêtaient.",
  "Trois ans depuis Hirâ. Trois ans pendant lesquels l'appel n'avait pas encore été proclamé en public : le Prophète ﷺ ne parlait qu'à ceux qu'il connaissait, et les compagnons priaient en secret, dans les ravins. Mais un esclave ne peut rien cacher à son maître : ceux comme Bilâl, dont la conversion s'était sue dans leur propre maison, payaient déjà — avant même que Quraych tout entière ne se dresse contre le message."
);

// RDV 22 [30] : la persécution sanglante vient avec l'appel public
setPara(22,
  "Il y eut d'autres comme lui dans ces années-là. Khabbâb ibn al-Aratt, le forgeron, à qui on appliquait du fer chauffé sur le dos. Yâsir et son fils ʿAmmâr, et Sumayya — leur mère, la première martyre de l'islam, tuée d'un coup de lance par Abû Jahl. ʿÂmir ibn Fuhayra, An-Nahdiyya, Umm ʿUbays — tous esclaves ou pauvres, tous torturés. Abû Bakr, dans ces années, acheta et affranchit une à une la plupart de ces victimes. Son père Abû Quḥâfa lui dit un jour : « Pourquoi achètes-tu toujours les faibles ? Si tu en achetais des forts, ils te défendraient ! » Abû Bakr répondit : « Mon père, je ne cherche pas une défense. Je cherche ce qui est auprès d'Allah. »",
  "Il y eut d'autres comme lui dans ces années-là — et la persécution tournerait au sang surtout quand l'appel deviendrait public et que Quraych se dresserait tout entière. Khabbâb ibn al-Aratt, le forgeron, à qui on appliquait du fer chauffé sur le dos. Yâsir et son fils ʿAmmâr, et Sumayya — leur mère, la première martyre de l'islam, tuée d'un coup de lance par Abû Jahl. ʿÂmir ibn Fuhayra, An-Nahdiyya, Umm ʿUbays — tous esclaves ou pauvres, tous torturés. Abû Bakr, dans ces années, acheta et affranchit une à une la plupart de ces victimes. Son père Abû Quḥâfa lui dit un jour : « Pourquoi achètes-tu toujours les faibles ? Si tu en achetais des forts, ils te défendraient ! » Abû Bakr répondit : « Mon père, je ne cherche pas une défense. Je cherche ce qui est auprès d'Allah. »"
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('Chronologie persécution recadrée (RDV 23 [1] + RDV 22 [30]).');
