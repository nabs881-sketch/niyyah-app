# SPEC — Sîra : correction titres doublons RDV 235 et 259

## Problème
Deux RDVs intitulés "Le parfum" — contenus distincts.
- RDV 235 : Anas décrit le parfum physique du Prophète ﷺ
- RDV 259 : hadith "trois choses aimées — femmes, parfum, prière"

## Action
Dans le JSON source de la Sîra, modifier uniquement `titre.fr` :

### RDV 235
- Ancien : "Le parfum"
- Nouveau : "Le parfum de sa peau"

### RDV 259
- Ancien : "Le parfum"
- Nouveau : "Trois amours"

Ne pas toucher au contenu des paragraphes.

## Commit
```
npm run build
git rm SPEC-SIRA-RDV235-259.md
git add -A
git commit -m "fix(sira): RDV 235/259 — correction titres doublons Le parfum"
```
