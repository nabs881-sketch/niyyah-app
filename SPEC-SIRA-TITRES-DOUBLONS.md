# SPEC — Sîra : correction titres doublons

## 4 titres à renommer dans le JSON de la Sîra

### RDV 068
- Ancien titre : "Le puits"
- Nouveau titre : "La plaine de Badr"

### RDV 075
- Ancien titre : "Le puits"
- Nouveau titre : "Le puits des vaincus"

### RDV 060
- Ancien titre : "Fâṭima et ʿAlî"
- Nouveau titre : "La demande des grands"

### RDV 083
- Ancien titre : "Fāṭima et ʿAlī"
- Nouveau titre : "ʿAlî demande"

## Action
Dans le fichier JSON source de la Sîra, mettre à jour le champ `titre.fr`
pour ces 4 RDVs uniquement. Ne pas toucher au contenu.

## Commit
```
npm run build
git rm SPEC-SIRA-TITRES-DOUBLONS.md
git add -A
git commit -m "fix(sira): RDV 060/068/075/083 — correction titres doublons"
```
