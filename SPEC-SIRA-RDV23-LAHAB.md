# SPEC-SIRA-RDV23-LAHAB

## Objectif
Corriger une erreur chronologique dans RDV 23 « La voix sur Ṣafâ » [23] : « Trois ans plus tard, Abû Lahab serait mort. » **Faux** : Abû Lahab est mort **sept jours après la bataille de Badr** (an 2 de l'Hégire, 624), de la maladie de la *ʿadasa*, soit **~11 ans après l'appel sur Ṣafâ** (an 3 de la prophétie). On retire la fausse durée tout en gardant la force dramatique (il mourut effectivement abandonné de tous).

Cible : **data/sira.min.json**, RDV num 23. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv23-lahab.js`** puis lance `node scripts/fix-rdv23-lahab.js` :

```js
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
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===23)); console.log('corrigé:', /Abû Lahab mourrait seul et rejeté/.test(t)&&!/Trois ans plus tard, Abû Lahab/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV23 [23] corrige timing mort Abu Lahab (apres Badr, pas 3 ans apres Safa)"
```
