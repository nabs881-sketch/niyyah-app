const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 23);
if (!r) { console.error('RDV 23 introuvable'); process.exit(1); }

const oldFr = "Trois ans depuis Hirâ. Trois ans pendant lesquels l'appel n'avait pas encore été proclamé en public : le Prophète ﷺ ne parlait qu'à ceux qu'il connaissait, et les compagnons priaient en secret, dans les ravins. Mais un esclave ne peut rien cacher à son maître : ceux comme Bilâl, dont la conversion s'était sue dans leur propre maison, payaient déjà — avant même que Quraych tout entière ne se dresse contre le message.";
const newFr = "Trois ans depuis Hirâ. Trois ans pendant lesquels l'islam était resté caché. Le Prophète ﷺ ne parlait qu'à ceux qu'il connaissait. Les compagnons priaient en secret, dans les ravins. Quand on les surprenait, ils s'arrêtaient.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [1] introuvable (déjà à l\'origine ?)'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 23 [1] remis à sa version d\'origine.');
