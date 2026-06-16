# SPEC-INTENTION-LISIBLE (intentions plus lisibles — droit 18px)

## Ce que ça fait
Le texte des cartes d'intention passe en **droit** (plus d'italique penché) et de **16 → 18px**. Plus lisible,
toujours en serif Cormorant. (S'applique aussi aux cartes vendredi/saison.)

## Cible
`script.js` (taille) + `style.css` (droit). ⚠️ cachés par le SW → **`npm run build` AVANT le commit.** Réversible.

## 1 — script.js : taille 16 → 18px
CHERCHER :
```
btn.style.fontSize = V2_LANG === 'ar' ? '17px' : '16px';
```
REMPLACER PAR :
```
btn.style.fontSize = V2_LANG === 'ar' ? '17px' : '18px';
```

## 2 — style.css : enlever l'italique (ajouter à la fin)
```css
/* intentions : texte droit (plus lisible) */
.intention-opt-v2{ font-style:normal; }
```

## Build + commit
```
npm run build
git add script.js script.min.js style.css style.min.css sw.js && git commit -m "intentions: texte droit + 18px (lisibilite)"
git push
```

> Curseurs : si tu veux encore plus grand, `18px` → `19px`. Si tu veux le rendre un peu plus marqué,
> ajoute `font-weight:500;` dans la règle CSS.
