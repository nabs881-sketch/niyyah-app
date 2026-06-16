# SPEC-SCANNER-NOCROSS (Scanner « Deux gestes » — retirer la croix)

## Cible
`script.js`, fonction `openScannerHub`. La croix ✕ (`scanner-hub-close`) fait doublon avec le
bouton « Retour » en bas → on la supprime.
⚠️ script.js caché par le SW → **`npm run build` AVANT le commit**.

## Correction
CHERCHER :
```
  ov.innerHTML =
    '<button class="scanner-hub-close" onclick="closeScannerHub()" aria-label="Fermer">\u2715</button>'
   +'<div class="scanner-hub-eyebrow">SCANNER</div>'
```
REMPLACER PAR :
```
  ov.innerHTML =
    '<div class="scanner-hub-eyebrow">SCANNER</div>'
```

> On retire juste la ligne du bouton croix. Le reste (cartes, bouton Retour) ne bouge pas.
> La règle CSS `.scanner-hub-close` devient inutilisée — tu peux la laisser, elle ne gêne pas.

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "scanner hub: retire la croix (doublon avec Retour)"
git push
```
