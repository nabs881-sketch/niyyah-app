# SPEC-WAQT-CORRECTIONS-DHUHR-SOURCES
# 29 items — Ajout mention standard "récit de tradition, à confirmer imam"

## Fichier cible
`data/waqt/waqt_dhuhr.json` — catégories langue, transaction, parents, conjoint, voisins, collègues, offense, inconnus

## Principe
Pour chacun des 29 items listés ci-dessous, ajouter à la fin du champ `source` la phrase suivante :
**" À présenter comme récit de tradition, non comme fait historique certifié. À confirmer par l'imam."**

Ne pas modifier les autres champs (titre, texte, morale, verif_imam).

---

## Liste des 29 items à modifier (champ `source` uniquement)

- DHUHR-LANGUE-007
- DHUHR-LANGUE-021
- DHUHR-LANGUE-037
- DHUHR-LANGUE-041
- DHUHR-LANGUE-047
- DHUHR-TRANSACTION-006
- DHUHR-TRANSACTION-018
- DHUHR-TRANSACTION-029
- DHUHR-TRANSACTION-033
- DHUHR-TRANSACTION-042
- DHUHR-PARENTS-010
- DHUHR-PARENTS-011
- DHUHR-PARENTS-015
- DHUHR-PARENTS-023
- DHUHR-PARENTS-025
- DHUHR-PARENTS-031
- DHUHR-CONJOINT-012
- DHUHR-CONJOINT-025
- DHUHR-CONJOINT-031
- DHUHR-VOISINS-005
- DHUHR-VOISINS-011
- DHUHR-VOISINS-013
- DHUHR-VOISINS-020
- DHUHR-VOISINS-023
- DHUHR-VOISINS-028
- DHUHR-VOISINS-030
- DHUHR-COLLÈGUES-024
- DHUHR-OFFENSE-029
- DHUHR-INCONNUS-025

## Implémentation suggérée (Claude Code)

```javascript
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('data/waqt/waqt_dhuhr.json', 'utf8'));

const ids = [
  'DHUHR-LANGUE-007','DHUHR-LANGUE-021','DHUHR-LANGUE-037','DHUHR-LANGUE-041','DHUHR-LANGUE-047',
  'DHUHR-TRANSACTION-006','DHUHR-TRANSACTION-018','DHUHR-TRANSACTION-029','DHUHR-TRANSACTION-033','DHUHR-TRANSACTION-042',
  'DHUHR-PARENTS-010','DHUHR-PARENTS-011','DHUHR-PARENTS-015','DHUHR-PARENTS-023','DHUHR-PARENTS-025','DHUHR-PARENTS-031',
  'DHUHR-CONJOINT-012','DHUHR-CONJOINT-025','DHUHR-CONJOINT-031',
  'DHUHR-VOISINS-005','DHUHR-VOISINS-011','DHUHR-VOISINS-013','DHUHR-VOISINS-020','DHUHR-VOISINS-023','DHUHR-VOISINS-028','DHUHR-VOISINS-030',
  'DHUHR-COLLÈGUES-024','DHUHR-OFFENSE-029','DHUHR-INCONNUS-025'
];

const suffix = ' À présenter comme récit de tradition, non comme fait historique certifié. À confirmer par l\'imam.';

for (const [cat, items] of Object.entries(data.categories)) {
  for (const item of items) {
    if (ids.includes(item.id)) {
      item.source = item.source + suffix;
    }
  }
}

fs.writeFileSync('data/waqt/waqt_dhuhr.json', JSON.stringify(data, null, 2));
console.log('Done');
```

## Build
```
npm run build && git add -A && git commit -m "fix: waqt dhuhr 29 sources tradition non certifiée à confirmer imam" && git push
```
