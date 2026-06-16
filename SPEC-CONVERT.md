# SPEC-CONVERT

> Prérequis : Repères en place.

## But
Convertisseur de dates **Hijri ↔ Grégorien** dans Repères. Deux sens, conversion via
`Intl` (calendrier islamique) ancrée sur aujourd'hui pour la précision. Note « ±1 jour
selon l'observation ».

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
var _CONV_MONTHS = ['Muharram', 'Safar', 'Rab\u00ee\u2019 al-Awwal', 'Rab\u00ee\u2019 ath-Th\u00e2n\u00ee', 'Jum\u00e2da al-\u00dbl\u00e2', 'Jum\u00e2da ath-Th\u00e2niya', 'Rajab', 'Sha\u2019b\u00e2n', 'Ramadan', 'Shaww\u00e2l', 'Dh\u00fb al-Qa\u2019da', 'Dh\u00fb al-Hijja'];
function _convHijri(date) {
  var y = 0, m = 0, d = 0;
  try {
    new Intl.DateTimeFormat('en-u-ca-islamic', { year: 'numeric', month: 'numeric', day: 'numeric' }).formatToParts(date).forEach(function(p) {
      if (p.type === 'year') y = parseInt(p.value, 10);
      if (p.type === 'month') m = parseInt(p.value, 10);
      if (p.type === 'day') d = parseInt(p.value, 10);
    });
  } catch (e) {}
  return { y: y, m: m, d: d };
}
function _hijriToGreg(hy, hm, hd) {
  var today = new Date(); today.setHours(12, 0, 0, 0);
  var th = _convHijri(today);
  var target = hy * 354.367 + (hm - 1) * 29.53 + hd;
  var now = th.y * 354.367 + (th.m - 1) * 29.53 + th.d;
  var d = new Date(today.getTime() + Math.round(target - now) * 86400000);
  for (var i = -25; i <= 25; i++) {
    var cand = new Date(d.getTime() + i * 86400000);
    var h = _convHijri(cand);
    if (h.y === hy && h.m === hm && h.d === hd) return cand;
  }
  return null;
}
function _convBox(text, muted) {
  return '<div style="text-align:center;padding:18px;border-radius:14px;border:1px solid rgba(232,206,138,' + (muted ? '0.2' : '0.32') + ');background:radial-gradient(120% 150% at 50% 0%,rgba(232,206,138,' + (muted ? '0.04' : '0.13') + '),rgba(232,206,138,0.02) 72%);margin-top:12px;font-family:\'Cormorant Garamond\',serif;font-size:' + (muted ? '15px' : '21px') + ';color:' + (muted ? 'rgba(200,168,74,0.65)' : '#E8CE8A') + ';' + (muted ? 'font-style:italic;' : '') + 'text-transform:capitalize;line-height:1.3;">' + text + '</div>';
}
function computeConvertG2H() {
  var inp = document.getElementById('conv-greg'), res = document.getElementById('conv-g2h-result');
  if (!inp || !res) return;
  if (!inp.value) { res.innerHTML = ''; return; }
  var h = _convHijri(new Date(inp.value + 'T12:00:00'));
  res.innerHTML = _convBox(h.d + ' ' + (_CONV_MONTHS[h.m - 1] || '') + ' ' + h.y + ' H');
}
function computeConvertH2G() {
  var dEl = document.getElementById('conv-h-day'), mEl = document.getElementById('conv-h-month'), yEl = document.getElementById('conv-h-year');
  var res = document.getElementById('conv-h2g-result');
  if (!res) return;
  var hd = parseInt(dEl && dEl.value, 10), hm = parseInt(mEl && mEl.value, 10), hy = parseInt(yEl && yEl.value, 10);
  if (!hd || !hm || !hy) { res.innerHTML = ''; return; }
  var g = _hijriToGreg(hy, hm, hd);
  if (!g) { res.innerHTML = _convBox('Cette date Hijri n\u2019existe pas', true); return; }
  res.innerHTML = _convBox(g.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));
}
function renderConvertCard() {
  return '<div onclick="openConvert()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="5" width="16" height="16" rx="2"/><path d="M4 10h16M8 3v4M16 3v4"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Convertisseur</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Dates Hijri \u2194 Gr\u00e9gorien</div></div></div>';
}
function closeConvert() { var ov = document.getElementById('convert-overlay'); if (ov) ov.remove(); }
function openConvert() {
  closeConvert();
  var today = new Date(); var th = _convHijri(today);
  var iso = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  var monthOpts = '';
  for (var i = 0; i < 12; i++) monthOpts += '<option value="' + (i + 1) + '"' + (i + 1 === th.m ? ' selected' : '') + '>' + _CONV_MONTHS[i] + '</option>';
  var inStyle = 'width:100%;box-sizing:border-box;padding:13px 14px;border-radius:13px;border:1px solid rgba(200,168,74,0.18);background:linear-gradient(180deg,#16110a,#100c07);color:#F0EADB;font-size:16px;font-family:\'Cormorant Garamond\',serif;outline:none;';
  var lab = function(t) { return '<label style="display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,168,74,0.55);margin-bottom:7px;">' + t + '</label>'; };
  var eyebrow = function(t) { return '<div style="display:flex;align-items:center;gap:12px;margin:26px 0 14px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.28),transparent);"></div><span style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,168,74,0.6);white-space:nowrap;">' + t + '</span><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.28),transparent);"></div></div>'; };
  var ov = document.createElement('div');
  ov.id = 'convert-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  ov.innerHTML = '<div style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeConvert()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Scheherazade New\',serif;font-size:40px;color:#E8CE8A;text-shadow:0 0 26px rgba(232,206,138,0.28);line-height:1.2;">\u062A\u064E\u0642\u0652\u0648\u0650\u064A\u0645</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:24px;color:#EADCB6;margin-top:8px;">Convertisseur de dates</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:#9c8c64;margin-top:6px;">Hijri \u2194 Gr\u00e9gorien</div>'
    + eyebrow('Gr\u00e9gorien \u2192 Hijri')
    + '<div>' + lab('Date') + '<input id="conv-greg" type="date" value="' + iso + '" onchange="computeConvertG2H()" oninput="computeConvertG2H()" style="' + inStyle + '"></div>'
    + '<div id="conv-g2h-result"></div>'
    + eyebrow('Hijri \u2192 Gr\u00e9gorien')
    + '<div style="display:flex;gap:10px;">'
    + '<div style="width:74px;">' + lab('Jour') + '<input id="conv-h-day" type="number" min="1" max="30" value="' + th.d + '" oninput="computeConvertH2G()" style="' + inStyle + '"></div>'
    + '<div style="flex:1;">' + lab('Mois') + '<select id="conv-h-month" onchange="computeConvertH2G()" style="' + inStyle + '">' + monthOpts + '</select></div>'
    + '<div style="width:84px;">' + lab('Ann\u00e9e') + '<input id="conv-h-year" type="number" value="' + th.y + '" oninput="computeConvertH2G()" style="' + inStyle + '"></div>'
    + '</div>'
    + '<div id="conv-h2g-result"></div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.42);line-height:1.7;margin-top:26px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Conversion calendaire : la date r\u00e9elle peut varier d\u2019un jour selon l\u2019observation de la lune.</div>'
    + '</div>';
  document.body.appendChild(ov);
  computeConvertG2H();
  computeConvertH2G();
}
window.renderConvertCard = renderConvertCard;
window.openConvert = openConvert;
window.closeConvert = closeConvert;
window.computeConvertG2H = computeConvertG2H;
window.computeConvertH2G = computeConvertH2G;

```

═══════════════════════════════════════════
## Édit 2 — ajouter la carte au hub Repères
═══════════════════════════════════════════
Repérer :
```js
    + _repereJeuneCard()
```
REMPLACER par :
```js
    + renderConvertCard()
    + _repereJeuneCard()
```

═══════════════════════════════════════════
## Vérif attendue
- Repères → carte « Convertisseur » (icône calendrier).
- Overlay تَقْوِيم : section **Grégorien → Hijri** (sélecteur de date → « 14 Dhû al-Hijja 1447 H »), section **Hijri → Grégorien** (jour + mois déroulant + année → date FR complète).
- Date Hijri inexistante (ex. 30 d'un mois de 29 j) → « Cette date Hijri n'existe pas ».
- Note « ±1 jour selon l'observation ».

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: convertisseur Hijri <-> Gregorien"
git push
```
