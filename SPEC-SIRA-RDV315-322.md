# SPEC-SIRA-RDV315-322 — Corrections sources groupées

## Fichier cible
`data/sira.json`

## Instructions
Pour chaque RDV ci-dessous, remplace uniquement le champ `source` par la valeur indiquée.

---

**RDV 315** — aucun changement (source déjà correcte)

**RDV 316** — remplace source par :
`Ibn Hishâm — Référence souple`

**RDV 317** — remplace source par :
`Ibn Hishâm ; Ṣaḥīḥ Muslim ; Ṭabarī — Référence souple`

**RDV 318** — remplace source par :
`Ṣaḥīḥ al-Bukhārī ; Ibn Hishâm — Référence souple`

**RDV 319** — remplace source par :
`Ibn Hishâm — Référence souple`

**RDV 320** — remplace source par :
`Ibn Hishâm ; Ṣaḥīḥ al-Bukhārī — Référence souple`

**RDV 321** — remplace source par :
`Ibn Hishâm ; Ṣaḥīḥ al-Bukhārī — Référence souple`

**RDV 322** — remplace source par :
`Ibn Hishâm — Référence souple`

---

## Commit

```
git rm SPEC-SIRA-RDV315-322.md
git add data/sira.json data/sira.min.json
git commit -m "feat: sira rdv315-322 corrections sources groupees"
git push
```
