# SPEC-KHATMA-LUXE

> ⚠️ **DÉFINITIF.** Remplace `SPEC-KHATMA.md` ET `SPEC-KHATMA-JUZ.md`. N'applique QUE celui-ci.

## Cible
`script.js` — Khatma par juz' (grille enluminée de 30), greffée sur l'écran de lecture
+ carte Ramadan. Esthétique premium : feuilles d'or, Cormorant + Scheherazade, micro-éclat
à chaque juz', objectif daté adaptatif, « constance douce ».

État : `niyyah_khatma_juz` (0–30) + `niyyah_khatma_end` (date cible, optionnelle).

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function _showKhatmaModal() {` et INSÉRER **juste avant** :

```js
function _getKhatmaJuz() { return Math.max(0, Math.min(30, parseInt(safeGetItem('niyyah_khatma_juz') || '0', 10))); }
function _setKhatmaJuz(n) {
  n = Math.max(0, Math.min(30, n));
  var was = _getKhatmaJuz();
  safeSetItem('niyyah_khatma_juz', String(n));
  if (n >= 30 && was < 30) _khatmaCelebrate();
}
function _isoDate(d) {
  var m = String(d.getMonth() + 1).padStart(2, '0'), day = String(d.getDate()).padStart(2, '0');
  return d.getFullYear() + '-' + m + '-' + day;
}
function _getKhatmaEnd() { return safeGetItem('niyyah_khatma_end') || null; }
function _setKhatmaEnd(e) { safeSetItem('niyyah_khatma_end', e); }
function _clearKhatmaEnd() { safeRemoveItem('niyyah_khatma_end'); }
function _khatmaDaysLeft(end) {
  var t = new Date(); t.setHours(0, 0, 0, 0);
  return Math.max(1, Math.round((new Date(end + 'T00:00:00') - t) / 86400000) + 1);
}
function _khatmaFrDate(end) {
  try { return new Date(end + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); }
  catch (e) { return end; }
}
function _khatmaInjectStyle() {
  if (document.getElementById('khatma-lux-style')) return;
  var s = document.createElement('style');
  s.id = 'khatma-lux-style';
  s.textContent = ''
    + '.khz-wrap{margin-bottom:24px;}'
    + '.khz-eyebrow{font-family:"Cormorant Garamond",serif;font-size:13px;letter-spacing:.1em;color:#E8CE8A;text-align:center;}'
    + '.khz-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:7px;max-width:300px;margin:16px auto 0;}'
    + '.khz-tile{aspect-ratio:1;border-radius:9px;display:flex;align-items:center;justify-content:center;font-family:"Cormorant Garamond",serif;font-size:14px;cursor:pointer;transition:transform .2s,box-shadow .25s;}'
    + '.khz-tile.done{background:linear-gradient(145deg,#F8EAC2,#D4AF37 58%,#C8A84A);color:#1a130b;border:1px solid #E8CE8A;box-shadow:inset 0 1px 0 rgba(255,255,255,0.45),0 0 12px rgba(232,206,138,0.22);}'
    + '.khz-tile.next{background:rgba(232,206,138,0.07);color:#E8CE8A;border:1px solid rgba(232,206,138,0.6);animation:khzPulse 2.4s ease-in-out infinite;}'
    + '.khz-tile.todo{background:rgba(200,168,74,0.04);color:rgba(200,168,74,0.38);border:1px solid rgba(200,168,74,0.13);}'
    + '.khz-tile:active{transform:scale(.92);}'
    + '.khz-tile.flash{animation:khzFlash .7s ease;}'
    + '.khz-obj{text-align:center;margin-top:16px;}'
    + '.khz-obj .line{font-family:"Cormorant Garamond",serif;font-size:14px;font-style:italic;color:rgba(200,168,74,0.7);}'
    + '.khz-obj .mod{font-size:11px;color:rgba(200,168,74,0.4);margin-top:5px;cursor:pointer;}'
    + '.khz-set{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:15px;color:#C8A84A;cursor:pointer;text-align:center;margin-top:16px;}'
    + '.khz-div{height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.2),transparent);margin-top:24px;}'
    + '@keyframes khzPulse{0%,100%{box-shadow:0 0 0 rgba(232,206,138,0);}50%{box-shadow:0 0 14px rgba(232,206,138,0.3);}}'
    + '@keyframes khzFlash{0%{box-shadow:0 0 0 rgba(232,206,138,0);transform:scale(1);}40%{box-shadow:0 0 22px rgba(232,206,138,0.65);transform:scale(1.1);}100%{box-shadow:inset 0 1px 0 rgba(255,255,255,0.45),0 0 12px rgba(232,206,138,0.22);transform:scale(1);}}'
    + '@media (prefers-reduced-motion:reduce){.khz-tile.next,.khz-tile.flash{animation:none;}}';
  document.head.appendChild(s);
}
function _khatmaJuzPanel() {
  _khatmaInjectStyle();
  var done = _getKhatmaJuz(), end = _getKhatmaEnd();
  var flash = window._khatmaFlash; window._khatmaFlash = null;
  var grid = '<div class="khz-grid">';
  for (var i = 1; i <= 30; i++) {
    var cls = i <= done ? 'done' : (i === done + 1 ? 'next' : 'todo');
    if (flash && i === flash && i <= done) cls += ' flash';
    grid += '<div class="khz-tile ' + cls + '" onclick="_khatmaTapJuz(' + i + ')" title="Juz\u2019 ' + i + '">' + i + '</div>';
  }
  grid += '</div>';
  var foot;
  if (!end) {
    foot = '<div class="khz-set" onclick="_openKhatmaSetup()">Fixer un objectif de Khatma \u2192</div>';
  } else {
    var remaining = Math.max(0, 30 - done);
    var perDay = remaining === 0 ? 0 : Math.max(1, Math.ceil(remaining / _khatmaDaysLeft(end)));
    var line = remaining === 0 ? 'Khatma achev\u00e9e, in sha Allah \u2728'
      : '~' + perDay + ' juz\u2019 par jour \u00b7 fin pr\u00e9vue le ' + _khatmaFrDate(end);
    foot = '<div class="khz-obj"><div class="line">' + line + '</div><div class="mod" onclick="_openKhatmaSetup()">modifier l\u2019objectif</div></div>';
  }
  return '<div class="khz-wrap" id="khz-panel">'
    + '<div class="khz-eyebrow">Khatma \u00b7 juz\u2019 ' + done + ' sur 30</div>'
    + grid + foot + '<div class="khz-div"></div></div>';
}
function _khatmaRefresh() {
  var p = document.getElementById('khz-panel');
  if (p) { p.outerHTML = _khatmaJuzPanel(); return; }
  var main = document.querySelector('#vue-rituel .rituel-content');
  if (main) _renderVersetProgress(main);
}
function _khatmaTapJuz(i) {
  var done = _getKhatmaJuz();
  var nv = (i === done ? i - 1 : i);
  if (nv > done) window._khatmaFlash = nv;
  _setKhatmaJuz(nv);
  _khatmaRefresh();
}
function _khatmaPickDays(days) {
  var e = new Date(); e.setHours(0, 0, 0, 0); e.setDate(e.getDate() + days - 1);
  _setKhatmaEnd(_isoDate(e));
  var m = document.getElementById('_khatma-setup'); if (m) m.remove();
  _khatmaRefresh();
}
function _khatmaPickDate(v) {
  if (!v) return;
  _setKhatmaEnd(v);
  var m = document.getElementById('_khatma-setup'); if (m) m.remove();
  _khatmaRefresh();
}
function _khatmaPickRamadan() {
  if (typeof getRamadanDay === 'function' && typeof ramadanState !== 'undefined' && ramadanState.active) {
    _khatmaPickDays(Math.max(1, 30 - getRamadanDay() + 1));
  }
}
function _openKhatmaSetup() {
  var ov = document.createElement('div');
  ov.id = '_khatma-setup';
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:radial-gradient(120% 80% at 50% 0%,#1c140b,#0b0805 60%);-webkit-backdrop-filter:blur(8px);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:24px;';
  var opt = function(label, days) {
    return '<button onclick="_khatmaPickDays(' + days + ')" style="display:block;width:100%;padding:14px;margin-bottom:10px;border-radius:14px;border:1px solid rgba(200,168,74,0.28);background:linear-gradient(180deg,#16110a,#100c07);color:#E8CE8A;font-family:\'Cormorant Garamond\',serif;font-size:17px;cursor:pointer;">' + label + '</button>';
  };
  var ramadanBtn = (typeof ramadanState !== 'undefined' && ramadanState.active)
    ? '<button onclick="_khatmaPickRamadan()" style="display:block;width:100%;padding:14px;margin-bottom:10px;border-radius:14px;border:1px solid rgba(232,206,138,0.5);background:radial-gradient(130% 160% at 50% 0%,rgba(232,206,138,0.2),rgba(232,206,138,0.03));color:#F6E7BC;font-family:\'Cormorant Garamond\',serif;font-size:17px;cursor:pointer;box-shadow:0 0 22px rgba(232,206,138,0.12);">\uD83C\uDF19 Ce Ramadan \u00b7 finir avant l\u2019A\u00efd</button>'
    : '';
  ov.innerHTML = '<div style="max-width:330px;width:100%;text-align:center;">'
    + '<div style="font-family:\'Scheherazade New\',serif;font-size:34px;color:#E8CE8A;text-shadow:0 0 26px rgba(232,206,138,0.3);line-height:1;">\u062E\u064E\u062A\u0652\u0645\u064E\u0629</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:23px;color:#EADCB6;margin-top:8px;">Objectif de Khatma</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.55);margin:8px 0 24px;">Finir le Coran \u00e0 ton rythme, sans pression</div>'
    + ramadanBtn + opt('En 30 jours', 30) + opt('En 60 jours', 60) + opt('En 90 jours', 90)
    + '<div style="margin:16px 0 10px;display:flex;align-items:center;gap:12px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.25),transparent);"></div><span style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(200,168,74,0.45);">ou une date</span><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.25),transparent);"></div></div>'
    + '<input id="_khatma-date" type="date" onchange="_khatmaPickDate(this.value)" style="width:100%;box-sizing:border-box;padding:13px;border-radius:14px;border:1px solid rgba(200,168,74,0.28);background:#16110a;color:#E8CE8A;font-size:15px;font-family:\'Cormorant Garamond\',serif;margin-bottom:18px;">'
    + (_getKhatmaEnd() ? '<button onclick="_clearKhatmaEnd();document.getElementById(\'_khatma-setup\').remove();_khatmaRefresh();" style="background:none;border:none;color:rgba(200,168,74,0.45);font-size:13px;cursor:pointer;display:block;margin:0 auto 10px;">Retirer l\u2019objectif</button>' : '')
    + '<button onclick="document.getElementById(\'_khatma-setup\').remove();" style="background:none;border:none;color:rgba(255,255,255,0.4);font-size:13px;cursor:pointer;">Fermer</button></div>';
  document.body.appendChild(ov);
}
function _khatmaCelebrate() {
  _clearKhatmaEnd();
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:radial-gradient(120% 80% at 50% 10%,#241a0e,#0b0805 60%);display:flex;align-items:center;justify-content:center;padding:24px;';
  ov.innerHTML = '<div style="position:relative;text-align:center;max-width:340px;">'
    + '<div style="position:absolute;top:-30px;left:50%;transform:translateX(-50%);width:240px;height:240px;background:radial-gradient(circle,rgba(232,206,138,0.2),transparent 65%);pointer-events:none;"></div>'
    + '<div style="position:relative;font-family:\'Scheherazade New\',serif;font-size:40px;color:#E8CE8A;text-shadow:0 0 30px rgba(232,206,138,0.4);line-height:1;margin-bottom:10px;">\u062E\u064E\u062A\u0652\u0645\u064E\u0629</div>'
    + '<div style="position:relative;font-family:\'Cormorant Garamond\',serif;font-size:27px;color:#F6E7BC;margin-bottom:14px;">Khatma compl\u00e9t\u00e9e</div>'
    + '<div style="position:relative;font-size:15px;color:rgba(240,234,214,0.8);line-height:1.6;margin-bottom:22px;">Le Coran parcouru en entier. Alhamdulill\u0101h.</div>'
    + '<div style="position:relative;font-family:\'Amiri\',serif;font-size:22px;color:rgba(232,206,138,0.92);direction:rtl;margin-bottom:6px;">\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u062A\u064E\u0642\u064E\u0628\u0651\u064E\u0644\u0652 \u0645\u0650\u0646\u0651\u064E\u0627</div>'
    + '<div style="position:relative;font-size:13px;color:rgba(255,255,255,0.5);font-style:italic;margin-bottom:30px;">All\u0101humma taqabbal minn\u0101</div>'
    + '<button id="_khatmaJuzBtn" style="position:relative;padding:14px 30px;border:1px solid rgba(232,206,138,0.5);border-radius:26px;background:radial-gradient(130% 160% at 50% 0%,rgba(232,206,138,0.18),rgba(232,206,138,0.02));color:#F6E7BC;font-family:Cormorant Garamond,serif;font-size:16px;cursor:pointer;">Recommencer une Khatma</button></div>';
  document.body.appendChild(ov);
  document.getElementById('_khatmaJuzBtn').onclick = function() { safeSetItem('niyyah_khatma_juz', '0'); ov.remove(); _khatmaRefresh(); };
}
window._openKhatmaSetup = _openKhatmaSetup;
window._khatmaTapJuz = _khatmaTapJuz;
window._khatmaPickDays = _khatmaPickDays;
window._khatmaPickDate = _khatmaPickDate;
window._khatmaPickRamadan = _khatmaPickRamadan;
window._clearKhatmaEnd = _clearKhatmaEnd;
window._khatmaRefresh = _khatmaRefresh;
window._getKhatmaJuz = _getKhatmaJuz;
window._getKhatmaEnd = _getKhatmaEnd;

```

═══════════════════════════════════════════
## Édit 2 — afficher la grille en haut de la lecture
═══════════════════════════════════════════
Repérer :
```js
    main.innerHTML = '<div style="padding:20px 16px;text-align:center;">'
      + '<div class="fiqh-categorie">' + (vj.ref || '').toUpperCase() + '</div>'
```
REMPLACER par :
```js
    main.innerHTML = '<div style="padding:20px 16px;text-align:center;">'
      + _khatmaJuzPanel()
      + '<div style="font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(200,168,74,0.45);margin-bottom:14px;">Verset \u00e0 m\u00e9diter</div>'
      + '<div class="fiqh-categorie">' + (vj.ref || '').toUpperCase() + '</div>'
```

═══════════════════════════════════════════
## Édit 3 — l'item « Lecture du Coran » montre les juz'
═══════════════════════════════════════════
Repérer :
```js
get sub() { return 'Verset ' + _getVersetProgress() + ' / 6236'; }
```
REMPLACER par :
```js
get sub() { return 'Juz\u2019 ' + _getKhatmaJuz() + ' / 30'; }
```

═══════════════════════════════════════════
## Édit 4 — carte Khatma sur l'écran Ramadan
═══════════════════════════════════════════
Repérer :
```js
  html += '<div style="margin-bottom:4px;padding:0 2px;"><div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:8px;">Horaires Imsak / Iftar</div>';
```
REMPLACER par :
```js
  html += '<div onclick="openVueVersetJour()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(232,206,138,0.28);border-radius:16px;padding:15px 16px;margin-bottom:14px;cursor:pointer;display:flex;align-items:center;gap:14px;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);"><div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2z"/><path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2z"/></svg></div><div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:17px;color:#E8CE8A;">Ma Khatma du Ramadan</div><div style="font-size:12px;color:rgba(200,168,74,0.6);margin-top:2px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Juz\u2019 ' + _getKhatmaJuz() + ' / 30' + (_getKhatmaEnd() ? '' : ' \u00b7 fixe ton objectif') + '</div></div><div style="flex-shrink:0;color:rgba(232,206,138,0.5);font-size:18px;">\u2192</div></div>';
  html += '<div style="margin-bottom:4px;padding:0 2px;"><div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:8px;">Horaires Imsak / Iftar</div>';
```

═══════════════════════════════════════════
## Vérif attendue
- Lecture du Coran → grille **6×5 de juz' en feuilles d'or** : remplies (or), prochaine (contour pulsant), à venir (discrètes). Tap = dore jusqu'à ce juz', avec **micro-éclat** ; re-tap la dernière = décoche. Pas de rechargement du verset (zéro scintillement).
- « Fixer un objectif » → modal avec calligraphie خَتْمَة, presets 30/60/90, date, et **🌙 Ce Ramadan** (si mode Ramadan actif).
- Objectif posé → « ~N juz' par jour · fin prévue le … » + « modifier ».
- 30/30 → célébration enluminée (خَتْمَة + bloom doré + du'â) + remise à zéro.
- Écran Ramadan → carte « Ma Khatma du Ramadan » avec médaillon livre, ouvre la lecture.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "khatma: grille enluminee par juz (premium) + objectif adaptatif + Ramadan"
git push
```
