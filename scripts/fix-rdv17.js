const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 17);
if (!r) { console.error('RDV 17 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 40)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [14] : Six -> Cinq
setPara(
  "Six arguments. Six arguments tirés non pas de doctrines, non pas de prophéties, mais de ce qu'elle avait vu de cet homme depuis vingt-cinq ans.",
  "Cinq arguments. Cinq arguments tirés non pas de doctrines, non pas de prophéties, mais de ce qu'elle avait vu de cet homme depuis vingt-cinq ans."
);

// [18] : qualité authentique (tahmilu l-kall)
setPara(
  "Tu composes avec tout le monde.",
  "Tu portes le faible."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 17 corrigé ([14] cinq, [18] tu portes le faible).');
