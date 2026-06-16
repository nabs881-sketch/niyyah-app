# SPEC-SIRA-RDV27-ABYSSINIE

## Cible
`data/sira.min.json` — RDV `num` 27 (« La traversée vers l'Abyssinie ») :
champ `source` + paragraphes [2] et [12].

---

## Correction 1 — SOURCE (mauvaise attribution)

La parole du Prophète ﷺ sur ʿUthmân n'est PAS dans Bukhârî. Elle est rapportée
dans le **Mustadrak d'al-Hâkim** (vol. 4, ḥadîth ~6999), via Asmâ bint Abî Bakr.
Al-Hâkim est réputé indulgent dans ses authentifications → chaîne discutée.

CHERCHER :
```
Ibn Hishâm — Bukhari sur la parole du Prophète ﷺ à propos de ʿUthmân
```

REMPLACER PAR :
```
Ibn Hishâm — Al-Mustadrak d'al-Hâkim sur la parole à propos de ʿUthmân (chaîne discutée, à confirmer par l'imam)
```

---

## Correction 2 — [2] anachronisme Hamza / ʿUmar

La 1ʳᵉ émigration eut lieu en 5ᵉ année (cf. [9]) ; Hamza et ʿUmar ne se convertirent
qu'en 6ᵉ année. Les nommer comme protecteurs au moment de l'émigration est anachronique.

CHERCHER :
```
Il avait quelques dizaines de croyants dans une cité qui les détestait. Hamza et ʿUmar pouvaient défendre eux-mêmes. Mais ils ne pouvaient pas défendre tous les croyants — et la persécution sur les esclaves, les pauvres, les femmes seules, augmentait chaque mois.
```

REMPLACER PAR :
```
Il avait quelques dizaines de croyants dans une cité qui les détestait. Les rares qui avaient un clan puissant pouvaient se protéger eux-mêmes. Mais personne ne pouvait protéger tous les croyants — et la persécution sur les esclaves, les pauvres, les femmes seules, augmentait chaque mois.
```

---

## Correction 3 — [12] wording fidèle au Mustadrak (Ibrâhîm + Loṭ)

La version attestée dit « après Ibrâhîm ET Loṭ », et vise le couple (ʿUthmân + Ruqayya).
Le RDV ne cite que Loṭ.

CHERCHER :
```
Il dit, en la voyant partir : « ʿUthmân est le premier homme à partir vers Allah avec sa famille depuis Lot, paix sur lui. »
```

REMPLACER PAR :
```
Il dit, en les voyant partir : « Ils sont les premiers, après Ibrâhîm et Loṭ — paix sur eux —, à émigrer vers Allah avec leur famille. »
```

---

## Ne PAS toucher
- Le reste du RDV 27 (1ʳᵉ vague 5ᵉ année / 11 hommes 4 femmes [9], terre de ṣidq [6],
  Négus, 2ᵉ vague 80+ et Jaʿfar [18], délégation ʿAmr ibn al-ʿÂṣ [22] : conformes).
- `num` et ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: RDV27 source Uthman (Mustadrak, pas Bukhari) + anachronisme Hamza/Umar + Ibrahim&Lot"
git push
```
