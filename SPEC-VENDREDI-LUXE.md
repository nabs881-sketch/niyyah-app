# SPEC-VENDREDI-LUXE (section vendredi — émeraude profond + filet or)

## Ce que ça fait
On garde le vert, mais : cartes en **émeraude profond** avec **filet or** à gauche + lueur, et séparateur
الجُمُعة plus grand et lumineux. Effet écrin/joaillerie.

## Cible
`style.css` — ajouter le bloc À LA FIN (il écrase les règles vendredi par ordre de cascade).
⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Bloc à ajouter
```css
/* ===== Vendredi luxe — émeraude + filet or ===== */
.rituel-vendredi-sep .ar{
  font-family:'Scheherazade New','Amiri',serif;
  font-size:22px;
  text-shadow:0 0 14px rgba(70,180,130,0.45);
  margin-bottom:3px;
}
.rituel-item.vendredi{
  background:linear-gradient(160deg,#123d2c,#0a2016);
  border:1px solid rgba(90,200,150,0.3);
  border-left:2px solid #C9A24A;
  box-shadow:0 0 18px rgba(70,180,130,0.12),inset 0 1px 0 rgba(212,175,55,0.14);
}
.rituel-item.vendredi .check{ border-color:rgba(201,162,74,0.7); }
.rituel-item.vendredi .arabic{ color:#6FD3A6; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "vendredi: emeraude profond + filet or (luxe), separateur anobli"
git push
```

## Curseurs
- filet or plus présent : `border-left:2px` → `3px`.
- émeraude plus clair : `#123d2c,#0a2016` → `#16482f,#0c2a1c`.
- si tu préfères finalement le filet vert : `border-left:2px solid #C9A24A` → `2px solid rgba(90,200,150,0.7)`.
