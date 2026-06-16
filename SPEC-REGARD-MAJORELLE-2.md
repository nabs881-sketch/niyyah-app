# SPEC-REGARD-MAJORELLE-2 (écran scan : orbe + titre en bleu)

## Cible
`style.css` — **ajouter à la fin** (complément du bloc Regard Majorelle).
⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Bloc à ajouter
```css
/* ===== REGARD Majorelle — complément écran scan ===== */
/* titre « POINTE VERS CE QUE TU REGARDES » (rgba 212,175,55) */
#regarde-content [style*="212,175,55"]{ color:#AFC9EC!important; }
/* orbe de capture : bordure + fond + disque intérieur */
#regarde-capture-btn{ border-color:#7FB0E0!important; background:rgba(90,140,210,0.15)!important; }
#regarde-capture-btn > div{ background:linear-gradient(135deg,#9FC2E8,#3E6EA5)!important; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "Regard Majorelle: orbe de capture + titre scan en bleu"
git push
```

> L'orbe devient un disque bleu Majorelle cerclé de bleu clair — raccord avec le reste du Regard.
