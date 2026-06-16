# SPEC-SIRA-RDV29-BOYCOTT

## Cible
`data/sira.min.json` — RDV `num` 29 (« Trois ans dans la vallée ») :
champ `source`, champ `fiabilite`, et paragraphe [35].

⚠️ Toutes les modifs ne concernent QUE l'objet dont `num` vaut **29**.

---

## Correction 1 — SOURCE (mauvaise attribution à Bukhârî)

Le miracle du document mangé par les termites n'est PAS dans Ṣaḥîḥ Bukhârî. Il est
rapporté par Ibn Ishâq « d'après certains savants » (chaîne faible/discutée). Bukhârî
n'atteste que le SERMENT du pacte à Khayf Banî Kinâna, pas le document dévoré.

CHERCHER :
```
Ibn Hishâm — Bukhari sur le document mangé
```

REMPLACER PAR :
```
Ibn Hishâm (Ibn Ishâq) ; Bukhârî atteste le serment à Khayf Banî Kinâna. Le miracle du document mangé : chaîne faible/discutée, à confirmer par l'imam
```

---

## Correction 2 — FIABILITÉ (downgrade authentique → sira)

Dans l'objet RDV `num: 29` UNIQUEMENT, changer le champ `fiabilite` :
- valeur actuelle : `"authentique"`
- nouvelle valeur : `"sira"`

Raison : l'événement central (termites/document) est de niveau sîra à chaîne discutée,
pas un hadith sahîh. Le label « authentique » le surévalue.
⚠️ NE PAS faire un remplacement global de "authentique" (présent dans 252 RDV) —
cibler le champ `fiabilite` du seul RDV num 29 (ex. via script Node sur l'objet num===29).

---

## Correction 3 — [35] cohérence (intérieur, pas toit)

[10] dit que le document fut suspendu « à l'intérieur de la Kaaba » ; [35] dit « du toit ».
Ibn Ishâq : suspendu à l'intérieur de la Kaaba. Harmoniser.

CHERCHER :
```
On descendit le document du toit de la Kaaba.
```

REMPLACER PAR :
```
On descendit le document de l'intérieur de la Kaaba.
```

---

## Ne PAS toucher
- Le reste du RDV 29 (7ᵉ année, termes du pacte [5-9], Shiʿb Abî Ṭâlib, faim,
  Saʿd ibn Abî Waqqâṣ, les 5 hommes [26], Bismika Allahumma [38-39] : conformes).
- `num` et ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: RDV29 source document mange (Ibn Ishaq, pas Bukhari) + fiabilite sira + Kaaba interieur"
git push
```
