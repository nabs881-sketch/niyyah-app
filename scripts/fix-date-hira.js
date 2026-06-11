const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

const setPara = (num, oldFr, newFr) => {
  const r = d.rdv.find(x => x.num === num);
  if (!r) { console.error('RDV ' + num + ' introuvable'); process.exit(1); }
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('RDV ' + num + ' — para introuvable : ' + oldFr.slice(0, 40)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// RDV 291 : 27 -> 21
setPara(291,
  "Le Messager d'Allah ﷺ — quarante ans, pas encore prophète publiquement, mais ayant l'habitude des retraites — descendait depuis quelques mois dans la grotte de Ḥirāʾ pour méditer. Cette nuit-là, c'était le 27 du mois de Ramaḍān. Une nuit qui changerait l'histoire.",
  "Le Messager d'Allah ﷺ — quarante ans, pas encore prophète publiquement, mais ayant l'habitude des retraites — descendait depuis quelques mois dans la grotte de Ḥirāʾ pour méditer. Cette nuit-là, c'était le 21 du mois de Ramaḍān. Une nuit qui changerait l'histoire."
);

// RDV 16 : 20 jours -> 22 jours (calcul solaire Mubarakpuri)
setPara(16,
  "Il avait quarante années lunaires, six mois et douze jours. Selon les calculs solaires : trente-neuf ans, trois mois et vingt jours.",
  "Il avait quarante années lunaires, six mois et douze jours. Selon les calculs solaires : trente-neuf ans, trois mois et vingt-deux jours."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('Date de Hirâ harmonisée (21 Ramadân partout ; solaire 22 jours).');
