# SPEC-SIRA-RDV17

## Objectif
Corriger la citation de Khadîja (Bukhârî 3) dans le RDV 17 « La femme qui tient debout » :
1. **[18]** « Tu composes avec tout le monde » ne correspond à **aucune** qualité du hadith. La qualité authentique manquante est *tahmilu l-kall* = « tu portes le faible » → on la rétablit.
2. **[14]** dit « Six arguments » alors que cinq qualités sont listées ([17]-[21]) ; « Allah ne t'humiliera jamais » [16] est la conclusion, pas une qualité observée → « Six » devient « Cinq ».

Cible : **data/sira.min.json**, RDV num 17. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv17.js`** puis lance `node scripts/fix-rdv17.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 17);
if (!r) { console.error('RDV 17 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 40)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [14] : Six -> Cinq
setPara(
  "Six arguments. Six arguments tirés non pas de doctrines, non pas de prophéties, mais de ce qu'elle avait vu de cet homme depuis vingt-cinq ans.",
  "Cinq arguments. Cinq arguments tirés non pas de doctrines, non pas de prophéties, mais de ce qu'elle avait vu de cet homme depuis vingt-cinq ans."
);

// [18] : qualité authentique (tahmilu l-kall)
setPara(
  "Tu composes avec tout le monde.",
  "Tu portes le faible."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 17 corrigé ([14] cinq, [18] tu portes le faible).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===17)); console.log('[14] cinq:', /Cinq arguments\. Cinq arguments/.test(t)&&!/Six arguments/.test(t), '| [18] faible:', /Tu portes le faible/.test(t)&&!/Tu composes avec tout le monde/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV17 citation Khadija (tahmilu l-kall = porte le faible, compte cinq)"
```
