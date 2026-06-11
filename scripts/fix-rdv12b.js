const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 12);
if (!r) { console.error('RDV 12 introuvable'); process.exit(1); }

const oldFr = "Pendant vingt-cinq ans, Khadîja allait être sa seule épouse. Sa première confidente. Le sein contre lequel il poserait sa tête. La voix qui — bien des années plus tard, dans une nuit où il rentrerait tremblant d'une grotte — lui dirait :";
const newFr = "Pendant vingt-cinq ans, Khadîja allait être sa seule épouse. Sa première confidente. Le refuge où il déposait le poids de ses peines. La voix qui — bien des années plus tard, dans une nuit où il rentrerait tremblant d'une grotte — lui dirait :";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [22] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 12 [22] retouché (adab).');
