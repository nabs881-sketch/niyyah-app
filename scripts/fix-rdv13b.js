const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 13);
if (!r) { console.error('RDV 13 introuvable'); process.exit(1); }

const oldFr = "Khadîja lui donna six enfants. Presque tous moururent.";
const newFr = "Khadîja lui donna six enfants — deux fils, quatre filles. Les deux fils moururent en bas âge.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [6] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 13 [6] corrigé (seuls les fils moururent en bas âge).');
