# SPEC-MODAL-SEPARATION (encart "ta propre intention" + titre/sous-titre agrandis)

## Cible
`index.html` (encart) + `style.css` (style + tailles). ⚠️ cachés par le SW → **`npm run build` AVANT le commit.** Réversible.

## 1 — index.html : envelopper le séparateur + la zone de texte dans un encart
### 1a — ouvrir l'encart (avant le séparateur)
CHERCHER :
```
<div class="modal-divider-v2">ou votre propre intention</div>
```
REMPLACER PAR :
```
<div class="intention-custom-zone">
    <div class="modal-divider-v2">ou votre propre intention</div>
```
### 1b — fermer l'encart (après la zone de texte)
CHERCHER :
```
personnelle..."></textarea>
```
REMPLACER PAR :
```
personnelle..."></textarea>
    </div>
```

## 2 — style.css : ajouter ce bloc À LA FIN
```css
/* ===== Modal intention — titre/sous-titre + zone "ta propre intention" ===== */
.modal-title-v2{ font-size:16px; letter-spacing:0.2em; }
.modal-sub-v2{ font-size:16px; color:rgba(240,234,214,0.62); }

.intention-custom-zone{
  background:rgba(0,0,0,0.28);
  border:1px solid rgba(255,255,255,0.05);
  border-radius:16px;
  padding:16px 14px 18px;
  margin:8px 0 22px;
}
.intention-custom-zone .modal-divider-v2{ margin-bottom:13px; }
.intention-custom-zone .intention-input-v2{ margin-bottom:0; }
```

## Build + commit
```
npm run build
git add index.html style.css style.min.css sw.js && git commit -m "modal intention: encart propre intention + titre/sous-titre agrandis"
git push
```

## Curseurs réglables
- titre encore plus grand : `16px` → `18px` (et baisser `letter-spacing` à `0.16em`).
- encart plus/moins marqué : fond `rgba(0,0,0,0.28)` → 0.40 (plus creusé) ou 0.18 (plus léger).
- plus d'air avant l'encart : `margin:8px 0 22px` → `margin:16px 0 22px`.
