# SPEC-VENDREDI-TEXTE-BLEU (texte de la carte vendredi en blanc-bleuté)

## Cible
`style.css` — **ajouter à la fin.** CSS uniquement, scopé à la carte.
⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Pourquoi
La carte « Regard du vendredi » est bleue (liseré + label Majorelle) mais son texte est resté blanc
cassé (#FAF7EE) → il flotte. On le teinte en blanc-bleuté pour unifier la carte.

## Bloc à ajouter
```css
/* carte Regard du vendredi : texte en blanc-bleuté Majorelle */
.vendredi-regard-card [style*="FAF7EE"]{ color:#D6E2F2!important; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "Regard du vendredi: texte en blanc-bleute (coherence carte)"
git push
```

> Capture l'inline `#FAF7EE` du corps de texte uniquement (le label bleu et le reste ne bougent pas).
> Si tu le veux plus marqué, on peut descendre vers #C2DBF5 ; plus discret, #E2EAF4.
