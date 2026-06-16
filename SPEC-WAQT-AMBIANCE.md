# SPEC-WAQT-AMBIANCE (agrandir la ligne sous l'arabe des waqts)

## Ce que ça fait
La phrase d'ambiance sous le nom arabe (ex. « La lumière commence à s'incliner… ») passe de **16px** à
**19px** et devient un peu plus lumineuse. Vaut pour les 5 waqts (une seule définition).

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement
CHERCHER :
```
'<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:rgba(200,168,74,0.7);line-height:1.6;max-width:300px;margin:0 auto 18px;">' + _lum + '</div>'
```
REMPLACER PAR :
```
'<div style="font-family:\'Cormorant Garamond\',serif;font-size:19px;font-style:italic;color:rgba(208,178,90,0.9);line-height:1.55;max-width:340px;margin:0 auto 18px;">' + _lum + '</div>'
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "waqt: agrandir la ligne d ambiance sous l arabe (16->19px)"
git push
```

> Réglable : `19px` → `21px` si tu veux encore plus grand ; opacité `0.9` → `1` pour plus lumineux.
