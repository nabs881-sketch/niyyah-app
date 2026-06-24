# SPEC-SIRA-RDV305-314 — Corrections sources groupées

## Fichier cible
`data/sira.json`

## Instructions
Pour chaque RDV ci-dessous, remplace uniquement le champ `source` par la valeur indiquée.

---

**RDV 305** — remplace source par :
`Ṭabarī — Référence souple`

**RDV 306** — remplace source par :
`Ṣaḥīḥ al-Bukhārī ; Ṣaḥīḥ Muslim — Référence souple`

**RDV 307** — remplace source par :
`Ibn Hishâm ; Ṭabarī — Référence souple`

**RDV 308** — remplace source par :
`Ṣaḥīḥ al-Bukhārī (hadith du manteau) ; Ṣaḥīḥ Muslim — Référence souple`

**RDV 309** — remplace source par :
`Ṣaḥīḥ al-Bukhārī — Référence souple`

**RDV 310** — remplace source par :
`Ibn Hishâm ; Musnad Aḥmad — Référence souple`

**RDV 311** — aucun changement (source déjà correcte)

**RDV 312** — aucun changement (source déjà correcte)

**RDV 313** — aucun changement (source déjà correcte)

**RDV 314** — aucun changement (source déjà correcte)

---

## Commit

```
npm run build
git rm SPEC-SIRA-RDV305-314.md
git add data/sira.json data/sira.min.json
git commit -m "feat: sira rdv305-314 corrections sources groupees"
git push
```
