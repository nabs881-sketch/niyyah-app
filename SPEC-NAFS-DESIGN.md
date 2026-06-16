# SPEC-NAFS-DESIGN (sceau recentré + barre de progression + héros + citation allégée)

## Cible
`script.js` (sceau + barre) ET `style.css` (héros + citation). ⚠️ cachés par le SW → **`npm run build` AVANT le commit.** Réversible.

## 1 — script.js : recentrer le sceau (orbe)
CHERCHER :
```
style="position:absolute;top:8px;left:8px;"><span>\u0646\u0650\u064A\u0651\u0629</span></button>
```
REMPLACER PAR :
```
style="position:absolute;top:-20px;left:50%;margin-left:-17px;"><span>\u0646\u0650\u064A\u0651\u0629</span></button>
```

## 2 — script.js : barre de progression sous la semaine
CHERCHER :
```
    '<div style="text-align:center;">' +
      '<div class="nafs-week-badge">Semaine ' + w + ' — Trait ' + trait.id + '/52</div>' +
    '</div>' +
```
REMPLACER PAR :
```
    '<div style="text-align:center;margin-top:16px;">' +
      '<div class="nafs-week-badge">Semaine ' + w + ' — Trait ' + trait.id + '/52</div>' +
      '<div style="width:180px;height:3px;border-radius:3px;background:rgba(200,168,75,0.15);margin:9px auto 0;overflow:hidden;"><div style="width:' + Math.round(trait.id/52*100) + '%;height:100%;background:linear-gradient(90deg,#B8923E,#F0D27E);"></div></div>' +
    '</div>' +
```

## 3 — style.css : ajouter ce bloc À LA FIN
```css
/* ===== NAFS — citation allégée + nom plus présent ===== */
.nafs-reference-box{ background:none; border-radius:0; padding:2px 0 2px 14px; border-left-color:rgba(200,168,75,0.5); }
.nafs-name-fr{ font-size:22px; color:#F4ECD8; }
```

## Build + commit
```
npm run build
git add script.js script.min.js style.css style.min.css sw.js && git commit -m "NAFS: sceau recentre + barre progression 24/52 + heros + citation allegee"
git push
```

## Curseurs
- barre plus épaisse : `height:3px` → `4px`.
- nom français encore plus grand : `font-size:22px` → `24px`.
- si le sceau touche la semaine, augmente `margin-top:16px` → `22px`.
