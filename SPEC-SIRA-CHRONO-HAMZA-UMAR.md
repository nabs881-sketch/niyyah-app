# SPEC-SIRA-CHRONO-HAMZA-UMAR

## Cible
`data/sira.min.json` — RDV `num` 25 (paragraphe [5]) ET RDV `num` 26 (paragraphe [6]).
Deux corrections de chronologie cohérentes entre elles.

---

## Correction 1 — RDV 25 [5] : datation de la conversion de Hamza

RDV 26 [1] dit « Trois jours après Hamza » et RDV 26 [7] date ʿUmar « vers la
**sixième** année ». Or RDV 25 [5] dit « fin de la **quatrième** année » → incohérent.
La chronologie dominante (Muir, sîra standard) place Hamza ET ʿUmar en 6ᵉ année.

CHERCHER :
```
Un jour — vers la fin de la quatrième année de la mission prophétique — Hamza revint d'une longue chasse.
```

REMPLACER PAR :
```
Un jour — vers la sixième année de la mission prophétique — Hamza revint d'une longue chasse.
```

---

## Correction 2 — RDV 26 [6] : âge de ʿUmar

Faux : « à peu près l'âge du Prophète ﷺ ». ʿUmar avait ~30-35 ans à sa conversion,
soit environ **treize ans de moins** que le Prophète ﷺ (qui avait alors ~46 ans).
Le « trente-cinq ans environ » est juste — on garde, on corrige seulement la comparaison.

CHERCHER :
```
ʿUmar avait à peu près l'âge du Prophète ﷺ. Trente-cinq ans environ.
```

REMPLACER PAR :
```
ʿUmar avait alors environ trente-cinq ans — quelque treize ans de moins que le Prophète ﷺ.
```

---

## Ne PAS toucher
- Le reste des RDV 25 et 26 (déjà audités / conformes).
- `num` et ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: chrono Hamza/Umar (6e annee) + age Umar (~13 ans de moins que le Prophete)"
git push
```
