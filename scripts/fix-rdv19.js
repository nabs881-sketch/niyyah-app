const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 19);
if (!r) { console.error('RDV 19 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [11] Fa-andhir
setPara(
  "Et avertis. — Wa andhir. Avertis qui ? Avertis l'humanité. Le silence d'Allah était fini. Le temps de la solitude méditative à Hirâ était fini. Le temps de l'appel public allait commencer.",
  "Et avertis. — Fa-andhir. Avertis qui ? Avertis l'humanité. Le silence d'Allah était fini. Le temps de la solitude méditative à Hirâ était fini. Le temps de l'appel public allait commencer."
);

// [20] 5:3 achèvement + 2:281 ultime verset
setPara(
  "Plus jamais de silence. À partir de cette nuit, et pendant vingt-trois ans, le ciel parlerait. Sans pause. Verset après verset. Sourate après sourate. Jusqu'au verset final, révélé peu avant la mort du Prophète ﷺ : « Aujourd'hui, J'ai parachevé pour vous votre religion... » (5:3)",
  "Plus jamais de silence. À partir de cette nuit, et pendant vingt-trois ans, le ciel parlerait. Sans pause. Verset après verset. Sourate après sourate. Jusqu'à l'achèvement, scellé à ʿArafât peu avant sa mort : « Aujourd'hui, J'ai parachevé pour vous votre religion... » (5:3). Et l'avis le plus sûr veut que l'ultime verset descendu fut : « Craignez le Jour où vous serez ramenés vers Allah » (2:281)."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 19 corrigé ([11] Fa-andhir, [20] achèvement + 2:281).');
