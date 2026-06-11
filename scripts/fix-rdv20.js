const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 20);
if (!r) { console.error('RDV 20 introuvable'); process.exit(1); }

const oldFr = "Le premier enfant croyant : un orphelin sous tutelle.";
const newFr = "Le premier enfant croyant : un enfant recueilli.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [17] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 20 [17] corrigé (ʿAlî recueilli, pas orphelin).');
