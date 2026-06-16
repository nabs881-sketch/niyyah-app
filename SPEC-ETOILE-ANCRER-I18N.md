# SPEC-ETOILE-ANCRER-I18N (retirer l'étoile du bouton Ancrer — à la source)

## Pourquoi
Le HTML était déjà nettoyé, mais le texte du bouton est réécrit par une chaîne i18n `modal_confirm`
(et un fallback) qui contient encore « ✦ ». On la retire dans les 3 langues + le fallback.

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement 1 — FR
CHERCHER :
```
'✦ Ancrer cette Intention'
```
REMPLACER PAR :
```
'Ancrer cette Intention'
```

## Remplacement 2 — EN
CHERCHER :
```
'✦ Anchor this Intention'
```
REMPLACER PAR :
```
'Anchor this Intention'
```

## Remplacement 3 — AR
CHERCHER :
```
'✦ تَثْبِيتُ هَذِهِ النِّيَّةِ'
```
REMPLACER PAR :
```
'تَثْبِيتُ هَذِهِ النِّيَّةِ'
```

## Remplacement 4 — fallback
CHERCHER :
```
'\u2726 Ancrer cette Intention'
```
REMPLACER PAR :
```
'Ancrer cette Intention'
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "bouton Ancrer: retirer l etoile aussi dans les chaines i18n"
git push
```

> Après build, force le rechargement (l'étoile venait du cache + de l'i18n). Là elle ne reviendra plus.
