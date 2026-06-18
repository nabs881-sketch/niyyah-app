# SPEC-TASBIH-PHONETIC — Phonétique dans le compteur fullscreen

## 1. index.html — ajouter dans tasbihOverlay après tasbihArabic

```html
<div class="tasbih-phonetic" id="tasbihPhonetic" style="font-family:'Cormorant Garamond',serif;font-style:italic;font-size:16px;color:rgba(231,211,151,0.65);margin-top:8px;text-align:center;padding:0 24px;line-height:1.6;"></div>
```

---

## 2. script.js — openTasbih() — ajouter paramètre phonetic

Remplacer :
```js
function openTasbih(id, target, label, arabic) {
```
Par :
```js
function openTasbih(id, target, label, arabic, phonetic) {
```

Ajouter après `document.getElementById('tasbihArabic').textContent = arabic || '';` :
```js
var _phEl = document.getElementById('tasbihPhonetic');
if (_phEl) _phEl.textContent = phonetic || '';
```

---

## 3. script.js — bouton btn-tasbih-fs dans renderLevel() et renderWirdSmartCard()

Trouver la ligne qui génère le bouton btn-tasbih-fs avec openTasbih(...).
Ajouter phoneticEsc comme 5ème argument :

```js
var phoneticEsc = (item.phonetic || '').replace(/'/g, "\\'");
// Dans le onclick : openTasbih(\''+item.id+'\','+item.target+',\''+labelEsc+'\',\''+arabicEsc+'\',\''+phoneticEsc+'\')
```

---

## Trigger

```
Lis SPEC-TASBIH-PHONETIC.md et applique-le intégralement.
npm run build && git add -A && git commit -m "tasbih fullscreen - phonetique ajoutee"
```
