# SPEC-KHATMA-JUZ

> ⚠️ Ce SPEC **remplace** le précédent `SPEC-KHATMA.md` (basé verset). N'applique PAS l'ancien.

## Cible
`script.js` — Khatma suivie **par juz'** (grille de 30), greffée sur l'écran de lecture
(`_renderVersetProgress`) + une carte sur l'écran Ramadan. Objectif daté adaptatif,
preset « Ce Ramadan », « constance douce ». On garde le verset du jour comme contemplation.

État : `niyyah_khatma_juz` (0–30) + `niyyah_khatma_end` (date cible, optionnelle).

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions Khatma
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
  var e = new Date(end + 'T00:00:00');
  return Math.max(1, Math.round((e - t) / 86400000) + 1);
}
function _khatmaFrDate(end) {
  try { return new Date(end + 'T00:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' }); }
  catch (e) { return end; }
}
function _khatmaJuzPanel() {
  var done = _getKhatmaJuz();
  var pct = Math.round(done / 30 * 100);
  var end = _getKhatmaEnd();
  var grid = '<div style="display:grid;grid-template-columns:repeat(10,1fr);gap:5px;max-width:300px;margin:14px auto 0;">';
  for (var i = 1; i <= 30; i++) {
    var on = i <= done, isNext = (i === done + 1);
    grid += '<div onclick="_khatmaTapJuz(' + i + ')" title="Juz\u2019 ' + i + '" style="aspect-ratio:1;border-radius:7px;display:flex;align-items:center;justify-content:center;font-size:10px;cursor:pointer;font-family:\'Cormorant Garamond\',serif;'
      + (on ? 'background:linear-gradient(180deg,#E8CE8A,#C8A84A);color:#1a130b;border:1px solid #E8CE8A;'
            : (isNext ? 'background:rgba(232,206,138,0.08);color:#E8CE8A;border:1px solid rgba(232,206,138,0.55);'
                      : 'background:rgba(200,168,74,0.05);color:rgba(200,168,74,0.4);border:1px solid rgba(200,168,74,0.15);'))
      + '">' + i + '</div>';
  }
  grid += '</div>';
  var objLine;
  if (!end) {
    objLine = '<div onclick="_openKhatmaSetup()" style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:#C8A84A;cursor:pointer;text-align:center;margin-top:14px;">Fixer un objectif de Khatma \u2192</div>';
  } else {
    var daysLeft = _khatmaDaysLeft(end), remaining = Math.max(0, 30 - done);
    var perDay = remaining === 0 ? 0 : Math.max(1, Math.ceil(remaining / daysLeft));
    var line = remaining === 0 ? 'Khatma achev\u00e9e, in sha Allah \u2728'
      : '~' + perDay + ' juz\u2019 par jour \u00b7 fin pr\u00e9vue le ' + _khatmaFrDate(end);
    objLine = '<div style="text-align:center;margin-top:14px;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;color:rgba(200,168,74,0.65);">' + line + '</div>'
      + '<div onclick="_openKhatmaSetup()" style="font-size:11px;color:rgba(200,168,74,0.4);margin-top:5px;cursor:pointer;">modifier l\u2019objectif</div></div>';
  }
  return '<div style="margin-bottom:24px;">'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:13px;letter-spacing:0.08em;color:#E8CE8A;text-align:center;">Khatma \u00b7 ' + pct + '%</div>'
    + grid + objLine
    + '<div style="height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.18),transparent);margin-top:22px;"></div></div>';
}
function _khatmaTapJuz(i) {
  var done = _getKhatmaJuz();
  _setKhatmaJuz(i === done ? i - 1 : i);
  _khatmaRefresh();
}
function _khatmaRefresh() {
  var main = document.querySelector('#vue-rituel .rituel-content');
  if (main) _renderVersetProgress(main);
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
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(15,12,8,0.94);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);display:flex;align-items:center;justify-content:center;padding:24px;';
  var opt = function(label, days) {
    return '<button onclick="_khatmaPickDays(' + days + ')" style="display:block;width:100%;padding:13px;margin-bottom:10px;border-radius:13px;border:1px solid rgba(200,168,74,0.3);background:linear-gradient(180deg,#16110a,#100c07);color:#E8CE8A;font-family:\'Cormorant Garamond\',serif;font-size:16px;cursor:pointer;">' + label + '</button>';
  };
  var ramadanBtn = (typeof ramadanState !== 'undefined' && ramadanState.active)
    ? '<button onclick="_khatmaPickRamadan()" style="display:block;width:100%;padding:13px;margin-bottom:10px;border-radius:13px;border:1px solid rgba(232,206,138,0.5);background:radial-gradient(120% 140% at 50% 0%,rgba(232,206,138,0.16),rgba(232,206,138,0.03));color:#E8CE8A;font-family:\'Cormorant Garamond\',serif;font-size:16px;cursor:pointer;">\uD83C\uDF19 Ce Ramadan (finir avant l\u2019A\u00efd)</button>'
    : '';
  ov.innerHTML = '<div style="max-width:330px;width:100%;text-align:center;">'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:24px;color:#E8CE8A;margin-bottom:6px;">Objectif de Khatma</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.55);margin-bottom:22px;">Finir le Coran \u00e0 ton rythme, sans pression</div>'
    + ramadanBtn + opt('En 30 jours', 30) + opt('En 60 jours', 60) + opt('En 90 jours', 90)
    + '<div style="margin:14px 0 8px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:rgba(200,168,74,0.45);">ou une date</div>'
    + '<input id="_khatma-date" type="date" onchange="_khatmaPickDate(this.value)" style="width:100%;padding:12px;border-radius:13px;border:1px solid rgba(200,168,74,0.3);background:#16110a;color:#E8CE8A;font-size:15px;font-family:serif;margin-bottom:18px;">'
    + (_getKhatmaEnd() ? '<button onclick="_clearKhatmaEnd();document.getElementById(\'_khatma-setup\').remove();_khatmaRefresh();" style="background:none;border:none;color:rgba(200,168,74,0.45);font-size:13px;cursor:pointer;display:block;margin:0 auto 10px;">Retirer l\u2019objectif</button>' : '')
    + '<button onclick="document.getElementById(\'_khatma-setup\').remove();" style="background:none;border:none;color:rgba(255,255,255,0.4);font-size:13px;cursor:pointer;">Fermer</button></div>';
  document.body.appendChild(ov);
}
function _khatmaCelebrate() {
  _clearKhatmaEnd();
  var ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(15,12,8,0.96);display:flex;align-items:center;justify-content:center;padding:24px;';
  ov.innerHTML = '<div style="text-align:center;max-width:340px;">'
    + '<div style="font-size:46px;margin-bottom:18px;">\uD83D\uDCD6</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:28px;font-weight:600;color:#E8CE8A;line-height:1.4;margin-bottom:14px;">Khatma compl\u00e9t\u00e9e</div>'
    + '<div style="font-size:15px;color:rgba(240,234,214,0.8);line-height:1.6;margin-bottom:20px;">Le Coran parcouru en entier. Alhamdulill\u0101h.</div>'
    + '<div style="font-family:\'Amiri\',serif;font-size:22px;color:rgba(232,206,138,0.9);direction:rtl;margin-bottom:6px;">\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u062A\u064E\u0642\u064E\u0628\u0651\u064E\u0644\u0652 \u0645\u0650\u0646\u0651\u064E\u0627</div>'
    + '<div style="font-size:13px;color:rgba(255,255,255,0.5);font-style:italic;margin-bottom:30px;">All\u0101humma taqabbal minn\u0101</div>'
    + '<button id="_khatmaJuzBtn" style="padding:14px 28px;border:none;border-radius:24px;background:#C8A84A;color:#1a130b;font-family:Cormorant Garamond,serif;font-size:15px;font-weight:600;cursor:pointer;">Recommencer une Khatma</button></div>';
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
## Édit 3 — l'item « Lecture du Coran » montre la progression Khatma
═══════════════════════════════════════════
Dans la ligne de l'item `quran_read`, repérer :
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
REMPLACER par (la carte Khatma + la ligne d'origine) :
```js
  html += '<div onclick="openVueVersetJour()" style="background:radial-gradient(120% 140% at 50% 0%,rgba(232,206,138,0.1),rgba(20,15,8,0.4));border:1px solid rgba(232,206,138,0.28);border-radius:14px;padding:14px 16px;margin-bottom:14px;cursor:pointer;display:flex;align-items:center;gap:12px;"><div style="font-size:22px;">\uD83D\uDCD6</div><div style="flex:1;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;color:#E8CE8A;">Ma Khatma du Ramadan</div><div style="font-size:12px;color:rgba(200,168,74,0.6);margin-top:2px;">Juz\u2019 ' + _getKhatmaJuz() + ' / 30' + (_getKhatmaEnd() ? '' : ' \u00b7 fixe ton objectif') + '</div></div><div style="color:rgba(232,206,138,0.5);font-size:18px;">\u2192</div></div>';
  html += '<div style="margin-bottom:4px;padding:0 2px;"><div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:8px;">Horaires Imsak / Iftar</div>';
```

═══════════════════════════════════════════
## Vérif attendue
- Écran « Lecture du Coran » → en haut : **grille de 30 juz'** (cases dorées qui se remplissent) + « Khatma · X% ». En dessous : le verset à méditer (Préc./Suiv. conservés).
- Taper une case → marque la lecture jusqu'à ce juz'. Re-taper la dernière → décoche.
- « Fixer un objectif » → 30/60/90 jours, une date, et **🌙 Ce Ramadan** (visible seulement pendant le Ramadan, cale la fin sur la fin du mois).
- Objectif posé → « ~N juz' par jour · fin prévue le … » (adaptatif, sans culpabilisation).
- 30/30 → célébration « Khatma complétée » + objectif retiré + remise à zéro.
- Écran Ramadan → carte « Ma Khatma du Ramadan · Juz' X/30 → » qui ouvre la lecture.
- L'item d'accueil « Lecture du Coran » affiche « Juz' X / 30 ».

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "khatma: suivi par juz (grille 30) + objectif adaptatif + integration Ramadan"
git push
```
