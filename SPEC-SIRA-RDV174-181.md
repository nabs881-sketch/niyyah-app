# SPEC — Sîra : correction titres doublons RDV 174 et 181

## Problème
Deux RDVs intitulés "Le départ" — contenus distincts.

## Action
Dans le JSON source de la Sîra, modifier uniquement `titre.fr` :

### RDV 174
- Ancien : "Le départ"
- Nouveau : "Le départ vers Mūta"

### RDV 181
- Ancien : "Le départ"
- Nouveau : "Le départ secret"

Ne pas toucher au contenu des paragraphes.

## Commit
```
npm run build
git rm SPEC-SIRA-RDV174-181.md
git add -A
git commit -m "fix(sira): RDV 174/181 — correction titres doublons Le départ"
```
