# SPEC-SIRA-RDV23-NOMBRE-CROYANTS

## Cible
`data/sira.min.json` — RDV `num` 23 (« La voix sur Ṣafâ »), paragraphe [3].

## Problème
Le texte dit « une communauté qui a **une centaine de croyants** ».
Faux : à la fin des 3 ans de prédication secrète, les sources (Ibn Saʿd, sîra standard)
donnent **~30 musulmans**, pas une centaine. Surévaluation d'environ 3×.
La correction renforce même la rhétorique (une poignée face à toute la Mecque).

## Action — un seul remplacement exact

CHERCHER :
```
Une communauté qui a une centaine de croyants ne peut pas affronter la Mecque entière.
```

REMPLACER PAR :
```
Une communauté d'à peine une trentaine de croyants ne peut pas affronter la Mecque entière.
```

## Ne PAS toucher
- Le reste du paragraphe [3] (plante fragile, Allah pédagogue…).
- Tous les autres paragraphes du RDV 23 : audités, conformes (hadith Ṣafâ + al-Masad + 2e appel = authentiques).
- Le `num` et l'ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: RDV23 [3] nombre croyants fin phase secrete (~30, pas une centaine)"
git push
```
