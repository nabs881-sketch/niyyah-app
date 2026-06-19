# SPEC-DHIKR-DATA-ATTRS

## Problème
Les items _isDhikr (tasbih, istighfar) passent phonetic/translation dans onclick HTML
inline → SyntaxError sur les apostrophes. Fix : stocker dans data-* et lire via JS.

## Modifications script.js

### 1. Ajouter une fonction globale (avant renderCounter ou en bas du fichier)

Ajoute cette fonction :
```js
function openTasbihFromEl(el) {
  var id = el.dataset.tid;
  var target = parseInt(el.dataset.ttarget, 10);
  var label = el.dataset.tlabel || '';
  var arabic = el.dataset.tarabic || '';
  var phonetic = el.dataset.tphonetic || '';
  var translation = el.dataset.ttranslation || '';
  var source = el.dataset.tsource || '';
  openTasbih(id, target, label, arabic, phonetic, translation, source);
}
window.openTasbihFromEl = openTasbihFromEl;
```

### 2. Dans renderCounter(), remplacer le bloc if (_isDhikr)

Remplace tout le bloc `if (_isDhikr) { ... return '...'; }` par :

```js
  if (_isDhikr) {
    var _dhikrLabel = done ? (count + ' / ' + item.target + ' \u2713') : (count + ' / ' + item.target);
    var _dataAttrs = ' data-tid="' + item.id + '" data-ttarget="' + item.target + '"'
      + ' data-tlabel="' + (tI(item,'label')||'').replace(/"/g,'&quot;') + '"'
      + ' data-tarabic="' + (item.arabic||'').replace(/"/g,'&quot;') + '"'
      + ' data-tphonetic="' + (item.phonetic||'').replace(/"/g,'&quot;') + '"'
      + ' data-ttranslation="' + (item.translation||'').replace(/"/g,'&quot;') + '"'
      + ' data-tsource="' + (item.source||'').replace(/"/g,'&quot;') + '"';
    var _fsBtnDhikr = '<button class="btn-tasbih-fs" aria-label="Plein écran" onclick="event.stopPropagation();openTasbihFromEl(this.closest(\'[data-tid]\'))" title="Ouvrir compteur"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84A" stroke-width="1.8" stroke-linecap="round" style="pointer-events:none"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></button>';
    return '<div class="item' + (done ? ' checked' : '') + '" style="animation-delay:' + delay + 'ms;cursor:pointer" id="item-' + item.id + '"' + _dataAttrs + ' onclick="openTasbihFromEl(this)"><div class="check-circle" id="cb-' + item.id + '" style="' + (done ? 'background:var(--green-grad);border-color:var(--green);box-shadow:0 0 0 4px var(--green-soft),0 0 16px rgba(200,168,74,0.25)' : '') + '"><svg class="check-svg" style="' + (done ? 'opacity:1;transform:scale(1)' : '') + '" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="item-body"><div class="item-label">' + tI(item,'label') + '</div><div class="item-sub">' + tI(item,'sub') + '</div><div style="font-size:14px;color:rgba(200,168,74,0.6);margin-top:2px;" id="cnt-num-' + item.id + '">' + _dhikrLabel + '</div>' + arabicHtml + '</div>' + audioBtn + _fsBtnDhikr + '</div>';
  }
```

## Trigger
```
Lis SPEC-DHIKR-DATA-ATTRS.md et applique-le exactement.
npm run build && git add -A && git commit -m "fix: data-attrs pour openTasbih - plus de SyntaxError apostrophes"
```
