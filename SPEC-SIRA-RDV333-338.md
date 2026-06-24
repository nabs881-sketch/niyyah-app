# SPEC-SIRA-RDV333-338 — Corrections sources groupées

## Fichier cible
`data/sira.json`

## Instructions
Pour chaque RDV ci-dessous, remplace uniquement le champ `source` par la valeur indiquée.

---

**RDV 333** — remplace source par :
`Sourate Ar-Rūm (30:2-4) ; Ṣaḥīḥ al-Bukhārī ; Ṣaḥīḥ Muslim ; Sunan`

**RDV 334** — remplace source par :
`Ṣaḥīḥ al-Bukhārī n°4438, 6509 ; Ṣaḥīḥ Muslim n°2450`

**RDV 335** — remplace source par :
`Sourate An-Naṣr (110:1-3) ; Ṣaḥīḥ al-Bukhārī (descente d'an-Naṣr, dernière maladie)`

**RDV 336** — remplace source par :
`Sourate Al-Aḥzāb (33:56) ; Ṣaḥīḥ al-Bukhārī (sept outres, dernière prière, choix du serviteur)`

**RDV 337** — remplace source par :
`Sourate Az-Zumar (39:30) ; Ṣaḥīḥ al-Bukhārī ; Ṣaḥīḥ Muslim (dernière agonie, ʿĀʾisha)`

**RDV 338** — remplace source par :
`Sourate Āl ʿImrān (3:144) ; Ṣaḥīḥ al-Bukhārī (mort du Prophète, discours d'Abū Bakr)`

---

## Commit

```
git rm SPEC-SIRA-RDV333-338.md
git add data/sira.json data/sira.min.json
git commit -m "feat: sira rdv333-338 corrections sources groupees"
git push
```
