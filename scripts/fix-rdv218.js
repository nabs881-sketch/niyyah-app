const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 218);
if (!r) { console.error('RDV 218 introuvable'); process.exit(1); }

const oldFr = "« Il est mort entre mon menton et mes seins. Et nos salives se sont mélangées. »";
const newFr = "« Il est mort entre ma gorge et mon menton. Et nos salives se sont mélangées. »";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [13] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 218 [13] corrigé (adab + fidélité hadith).');
