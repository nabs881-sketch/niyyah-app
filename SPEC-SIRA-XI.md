# SPEC-SIRA-XI

## Objectif
Supprimer l'étiquette de partie orpheline « XI » (11 RDV, chiffre romain sans titre, intercalée au milieu de parties nommées → affiche « Partie XI » tout nu dans la navigation). On les rattache à « Anecdotes datées » (leur bloc voisin). **Aucun RDV n'est déplacé, aucun numéro de jour ne change** — on ne touche que le champ `partie`.

Cible : **data/sira.min.json**.

---

## Script (à créer et exécuter)

Crée **`scripts/relabel-xi.js`** puis lance `node scripts/relabel-xi.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
let n = 0;
d.rdv.forEach(r => { if (r.partie === 'XI') { r.partie = 'Anecdotes datées'; n++; } });
if (d.meta && d.meta.parties && d.meta.parties['XI']) delete d.meta.parties['XI'];
fs.writeFileSync(p, JSON.stringify(d));
console.log('Relabel XI -> Anecdotes datées :', n, '(attendu : 11)');
```

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); console.log('XI restants:', d.rdv.filter(r=>r.partie==='XI').length)"` → `0`.
- `node -e "const d=require('./data/sira.min.json'); console.log(d.rdv.length)"` → `365` (rien perdu).
- JSON valide.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: supprime l'etiquette orpheline 'XI' (11 RDV -> Anecdotes datees)"
```
