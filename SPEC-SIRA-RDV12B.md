# SPEC-SIRA-RDV12B

## Objectif
Retouche d'adab (respect des Mères des croyants) dans le RDV 12 « Khadîja, la femme qui regardait », paragraphe [22] : retirer l'image trop intime du sein de Khadîja (رضي الله عنها), en conservant le sens (refuge, repos).

Cible : **data/sira.min.json**, RDV num 12. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv12b.js`** puis lance `node scripts/fix-rdv12b.js` :

```js
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
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===12)); console.log('sein retiré:', !/Le sein contre lequel/.test(t), '| refuge:', /Le refuge où il déposait le poids de ses peines/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV12 [22] adab (retire l'image du sein de Khadija, refuge conserve)"
```
