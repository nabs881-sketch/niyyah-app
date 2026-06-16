# SPEC-RITUEL-SOUS-ITEM (agrandir le sous-titre des items)

## Cible
`style.css` — ajouter à la fin. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Bloc à ajouter
```css
/* sous-titre des items (vue du jour / fil du jour) — plus lisible */
.rituel-item .sub{ font-size:14px; color:rgba(240,234,214,0.62); line-height:1.45; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "items rituel: sous-titre 12->14 (lisibilite)"
git push
```

> Vaut pour les deux vues. Plus grand encore : `14px` → `15px`.
