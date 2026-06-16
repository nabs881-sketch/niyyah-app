# SPEC-SIRA-RDV13B

## Objectif
Corriger le paragraphe [6] du RDV 13 « La maison de Khadîja ». Le texte actuel dit « Presque tous moururent », ce qui est **inexact** : les quatre filles vécurent jusqu'à l'âge adulte et embrassèrent l'islam — seuls les deux fils moururent en bas âge. Le [8] du même RDV le confirme (Fâṭima survit). On lève la contradiction.

Cible : **data/sira.min.json**, RDV num 13. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv13b.js`** puis lance `node scripts/fix-rdv13b.js` :

```js
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
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===13)); console.log('ancien retiré:', !/Presque tous moururent/.test(t), '| nouveau:', /Les deux fils moururent en bas âge/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV13 [6] precision (seuls les fils moururent en bas age, pas les filles)"
```
