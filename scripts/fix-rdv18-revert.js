const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 18);
if (!r) { console.error('RDV 18 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [1] -> quelques jours (Mubarakpuri / Ibn Saad d'Ibn Abbas)
setPara(
  "Combien de temps ? Les sources varient énormément — de douze jours à trois ans. Les trois ans viennent d'Ibn Isḥâq ; mais beaucoup de savants retiennent bien plus court. Ibn ʿAbbâs rapporte vingt-cinq jours ; d'autres parlent de douze, quinze ou quarante jours. L'avis le plus retenu : quelques semaines, pas plusieurs années.",
  "Combien de temps ? Certains récits parlent de trois ans, ou de deux ans et demi. Mais ces durées longues ne tiennent pas. Ibn Saʿd rapporte d'Ibn ʿAbbâs que la pause ne fut que de quelques jours — et c'est l'avis le plus probable."
);

// [2] -> quelques jours
setPara(
  "Quelques semaines. Pas trois ans. Quelques semaines.",
  "Quelques jours. Pas trois ans. Quelques jours."
);

// [15] -> "quelques jours" (on garde la reformulation théologique)
setPara(
  "Et Muhammad ﷺ apprenait, dans ces quelques semaines, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne comble que les cœurs qui Le cherchent.",
  "Et Muhammad ﷺ apprenait, dans ces quelques jours, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne comble que les cœurs qui Le cherchent."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 18 : fatra revenue à « quelques jours » (Mubarakpuri).');
