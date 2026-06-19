# SPEC-LISAN-INFO-BTN

## Objectif
Déplacer le bouton i de "Comprendre le Coran" (lisan) hors du item-body
et le placer à droite comme tous les autres items (après shareBtn).

## script.js — dans le bloc if (item.id === 'lisan')

### Étape 1 — Retirer le bouton inline du label
Trouve exactement :
```
+ '<div style="display:flex;align-items:center;gap:8px;"><div class="item-label" style="font-size:15.5px;color:rgba(240,234,214,0.95);font-weight:600;">' + _tl + '</div><button style="background:none;border:none;cursor:pointer;padding:2px 4px;margin:0;flex-shrink:0;" ontouchstart="event.stopPropagation()" onclick="event.stopPropagation();openLisanMethode()" title="Méthode"><span style="font-size:14px;color:#C8A84A;opacity:0.6;">ⓘ</span></button></div>'
```
Remplace par :
```
+ '<div class="item-label" style="font-size:15.5px;color:rgba(240,234,214,0.95);font-weight:600;">' + _tl + '</div>'
```

### Étape 2 — Ajouter infoBtn après shareBtn
Trouve exactement :
```
            + shareBtn
            + '</div>';
```
Remplace par :
```
            + shareBtn + infoBtn
            + '</div>';
```

## Trigger
```
Lis SPEC-LISAN-INFO-BTN.md et applique-le exactement.
npm run build && git add -A && git commit -m "fix: bouton i lisan repositionné à droite" && git push
```
