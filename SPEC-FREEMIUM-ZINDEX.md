# SPEC-FREEMIUM-ZINDEX (Niyyah+ apparaît instantanément)

## Problème
`.freemium-overlay` est en `z-index:600`, mais le menu hamburger est en `z-index:3000/3001`.
Ouvert depuis le menu, l'écran premium s'affiche DERRIÈRE le menu → on ne le voit qu'après la
fermeture du menu (~300 ms) → effet « apparaît longtemps après ».

## Cible
`style.css`, règle `.freemium-overlay`. CSS uniquement.
⚠️ caché par le SW → **`npm run build` AVANT le commit.**

## Correction
CHERCHER :
```
.freemium-overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.7);
  z-index:600;
```
REMPLACER PAR :
```
.freemium-overlay {
  position:fixed;
  inset:0;
  background:rgba(0,0,0,0.7);
  z-index:10000;
```

(10000 le place au-dessus du menu ET des autres overlays — il s'affiche instantanément au tap.)

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "freemium: z-index 10000 (apparait instantanement, etait sous le menu)"
git push
```

## Bonus perf (optionnel, à faire plus tard)
Les animations `freemiumDust` (24 s) et `freemiumGleam` (4,5 s) tournent **en permanence**, même
quand l'écran est invisible → conso CPU/batterie inutile. On pourra les mettre en pause hors `.show`
(`animation-play-state:paused`, réactivé par `.freemium-overlay.show`). Dis-moi si tu veux ce SPEC.
