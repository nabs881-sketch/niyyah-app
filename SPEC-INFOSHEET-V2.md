# SPEC-INFOSHEET-V2 — Modal hadith sobre (option A)

## 1. index.html — remplacer tout le bloc id="infoSheet" et id="infoOverlay"

Supprimer `<div class="info-sheet-overlay" id="infoOverlay" ...></div>`
Supprimer `<div class="info-sheet" id="infoSheet">...</div>`

Remplacer par :

```html
<div id="infoSheet" onclick="closeInfoSheet()" style="display:none;position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.88);align-items:center;justify-content:center;padding:24px;box-sizing:border-box;">
  <div onclick="event.stopPropagation()" style="background:#111118;border:1px solid rgba(200,168,75,0.25);border-radius:18px;padding:24px;max-width:380px;width:100%;position:relative;">
    <button onclick="closeInfoSheet()" style="position:absolute;top:14px;right:14px;background:none;border:none;color:rgba(200,168,75,0.5);font-size:22px;cursor:pointer;line-height:1;">×</button>
    <div id="infoLabel" style="font-family:'Cormorant Garamond',serif;font-size:11px;letter-spacing:2.5px;text-transform:uppercase;color:rgba(200,168,75,0.45);margin-bottom:14px;padding-right:24px;"></div>
    <div id="infoArabic" style="font-family:'Scheherazade New',serif;font-size:28px;color:#C8A84A;text-align:right;direction:rtl;margin-bottom:18px;line-height:1.6;"></div>
    <div style="width:40px;height:1px;background:rgba(200,168,75,0.2);margin-bottom:16px;"></div>
    <div id="infoPhonetic" style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;color:rgba(231,211,151,0.7);margin-bottom:10px;"></div>
    <div id="infoTranslation" style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:rgba(231,211,151,0.88);line-height:1.8;margin-bottom:12px;"></div>
    <div id="infoSource" style="font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(200,168,75,0.45);letter-spacing:0.5px;"></div>
  </div>
</div>
```

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
var _src = (event && event.currentTarget && event.currentTarget.dataset && event.currentTarget.dataset.source) || '';
if (document.getElementById('infoSource')) document.getElementById('infoSource').textContent = _src ? '— ' + _src : '';
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

## 4. script.js — boutons btn-info

Dans renderLevel() et renderPrayerItem(), sur les boutons btn-info,
ajouter data-source="' + sourceEsc + '" s'il n'est pas déjà présent.

---

## 5. style.css — supprimer anciens styles infoSheet

Supprimer tous les blocs :
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
- Tous les `[data-theme="light"] .info-sheet*`

---

## Trigger

```
Lis SPEC-INFOSHEET-V2.md et applique-le intégralement.
npm run build && git add -A && git commit -m "infoSheet v2 - modal sobre overlay plein ecran"
```
