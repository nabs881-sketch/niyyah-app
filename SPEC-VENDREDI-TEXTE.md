# SPEC-VENDREDI-TEXTE (Regard du vendredi — texte premium)

## Cible
`script.js`, fonction `getVendrediRegardCardHTML`.
⚠️ script.js caché par le SW → **`npm run build` AVANT le commit.**

## Correction
CHERCHER :
```
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:#FAF7EE;line-height:1.5;">\u00ab Vendredi de paix. Choisis un Regard pour quelqu\u2019un que tu aimes. \u00bb</div>'
```
REMPLACER PAR :
```
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:#FAF7EE;line-height:1.6;">Le vendredi a une lumi\u00e8re \u00e0 part.<br>Choisis un Regard, et offre-le \u00e0 un c\u0153ur qui t\u2019est cher.</div>'
```

(Guillemets supprimés, coupure en deux lignes pour le souffle, line-height passé à 1.6.)

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "Regard du vendredi: texte premium, sans guillemets"
git push
```
