# SPEC-FONT-FLOOR — Plancher de lisibilité à 12px

Fichiers : style.css, script.js, index.html.
But : plus aucun texte sous 12px (les 9/10/11px sont trop petits à lire).

## Édits (remplacements littéraux, sur les 3 fichiers)
Remplacer partout :
- `font-size:9px`  → `font-size:12px`
- `font-size:10px` → `font-size:12px`
- `font-size:11px` → `font-size:12px`
- `font-size: 9px`  → `font-size: 12px`   (variante avec espace)
- `font-size: 10px` → `font-size: 12px`
- `font-size: 11px` → `font-size: 12px`

(Ne toucher QUE les valeurs de `font-size`. Ne pas modifier d'autres `9px/10px/11px`
qui seraient des paddings, margins, hauteurs, etc.)

## Ne pas toucher
- Les `font-size` déjà ≥ 12px.
- Les `0.6em / 0.8em` (cas isolés, probablement des exposants).

## Après
Glisse un œil sur l'app : rien ne devrait déborder (on n'agrandit que de 1-3px).
Si un label tout en majuscules se met à passer à la ligne quelque part, dis-le moi.

## Contraintes
- `npm run build` AVANT git commit (régénère les min + monte la version SW).
