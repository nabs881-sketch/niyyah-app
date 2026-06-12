const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 23);
if (!r) { console.error('RDV 23 introuvable'); process.exit(1); }

const oldFr = "Trois ans plus tard, Abû Lahab serait mort.";
const newFr = "Des années plus tard, Abû Lahab mourrait seul et rejeté de tous.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [23] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 23 [23] corrigé (timing mort Abû Lahab).');
