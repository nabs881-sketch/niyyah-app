# SPEC-INFOSHEET-OVERLAY

## Objectif
Remplacer la modal infoSheet par un overlay plein écran centré.
Clic sur le fond = fermeture. Plus de problème de scroll ou de troncature.

---

## 1. index.html — remplacer le bloc id="infoSheet"

Trouver le bloc complet `<div class="info-sheet" id="infoSheet">...</div>`
et le remplacer par :

```html
<div id="infoSheet" onclick="closeInfoSheet()" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.85);align-items:center;justify-content:center;padding:24px;box-sizing:border-box;">
  <div onclick="event.stopPropagation()" style="background:#0a0a0f;border:1px solid rgba(200,168,75,0.3);border-radius:20px;padding:28px 24px;max-width:380px;width:100%;position:relative;">
    <button onclick="closeInfoSheet()" style="position:absolute;top:14px;right:14px;background:none;border:none;color:#C8A84A;font-size:22px;cursor:pointer;line-height:1;">×</button>
    <div id="infoLabel" style="font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:rgba(200,168,75,0.6);margin-bottom:12px;padding-right:24px;"></div>
    <div id="infoArabic" style="font-family:'Scheherazade New',serif;font-size:26px;color:#C8A84A;text-align:right;direction:rtl;margin-bottom:16px;line-height:1.6;"></div>
    <div id="infoPhonetic" style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:rgba(231,211,151,0.7);margin-bottom:12px;"></div>
    <div id="infoTranslation" style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:17px;color:rgba(231,211,151,0.9);line-height:1.7;"></div>
  </div>
</div>
```

Supprimer aussi le bloc `<div id="infoOverlay"...>` s'il existe séparément.

---

## 2. script.js — openInfoSheet()

Remplacer :
```js
document.getElementById('infoSheet').classList.add('show');
document.getElementById('infoOverlay').classList.add('show');
document.body.style.overflow = 'hidden';
```

Par :
```js
document.getElementById('infoSheet').style.display = 'flex';
document.body.style.overflow = 'hidden';
```

---

## 3. script.js — closeInfoSheet()

Remplacer :
```js
document.getElementById('infoSheet').classList.remove('show');
document.getElementById('infoOverlay').classList.remove('show');
document.body.style.overflow = '';
```

Par :
```js
document.getElementById('infoSheet').style.display = 'none';
document.body.style.overflow = '';
```

---

## 4. style.css — supprimer les anciens styles infoSheet

Supprimer les blocs :
- `.info-sheet { ... }`
- `.info-sheet.show { ... }`
- `.info-sheet-handle { ... }`
- `.info-sheet-label { ... }`
- `.info-sheet-arabic { ... }`
- `.info-sheet-phonetic { ... }`
- `.info-sheet-translation { ... }`
- `.info-sheet-close { ... }`
- `.info-sheet-close:active { ... }`
- `.info-sheet-overlay { ... }`
- `.info-sheet-overlay.show { ... }`
- Tous les overrides `[data-theme="light"] .info-sheet*`

---

## Trigger

```
Lis SPEC-INFOSHEET-OVERLAY.md et applique-le intégralement.
npm run build && git add -A && git commit -m "fix: infoSheet overlay plein ecran centre"
```
