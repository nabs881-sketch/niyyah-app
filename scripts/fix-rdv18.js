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

// [1] durée exacte + grammaire
setPara(
  "Combien de temps ? Les sources varient. Certains récits parlent de plusieurs années — trois ans, deux ans et demi. Les historiens rigoureux modernes réfutent ces durées longues. Il s'appuie sur Ibn ʿAbbâs — l'un des plus rigoureux transmetteurs de la Sîra — qui rapporte que la pause fut de quelques jours seulement.",
  "Combien de temps ? Les sources varient énormément — de douze jours à trois ans. Les trois ans viennent d'Ibn Isḥâq ; mais beaucoup de savants retiennent bien plus court. Ibn ʿAbbâs rapporte vingt-cinq jours ; d'autres parlent de douze, quinze ou quarante jours. L'avis le plus retenu : quelques semaines, pas plusieurs années."
);

// [2]
setPara(
  "Quelques jours. Pas trois ans. Quelques jours.",
  "Quelques semaines. Pas trois ans. Quelques semaines."
);

// [15] reformulation théologique + cohérence "semaines"
setPara(
  "Et Muhammad ﷺ apprenait, dans ces quelques jours, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne se donne qu'à ceux qui Le réclament.",
  "Et Muhammad ﷺ apprenait, dans ces quelques semaines, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne comble que les cœurs qui Le cherchent."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 18 corrigé ([1]-[2] durée fatra, [15] reformulation théologique).');
