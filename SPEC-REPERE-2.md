# SPEC-REPERE-2 (Phase 2 — hub Jeûne)

> Prérequis : **SPEC-REPERE-1 appliqué** (cette SPEC modifie la carte Jeûne créée en Phase 1).

## But
La carte « Jeûne » de Repères ouvre `openJeune()` qui **route** :
- Ramadan actif → ton écran Ramadan existant (réutilisé tel quel).
- Hors Ramadan → un overlay **jeûnes surérogatoires** (aujourd'hui + à venir + suivi),
  basé sur la date Hijri. Mention douce vers les défis jeûne.

État : `niyyah_sunan_fasts` (dates ISO jeûnées). Pas de doublon : Ramadan et défis réutilisés.

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function v2GoRepere() {` et INSÉRER **juste avant** :

```js
function _sunanHijri(date) {
  var hm = 0, hd = 0;
  try {
    new Intl.DateTimeFormat('en-u-ca-islamic', { day: 'numeric', month: 'numeric' }).formatToParts(date).forEach(function(p) {
      if (p.type === 'month') hm = parseInt(p.value, 10);
      if (p.type === 'day') hd = parseInt(p.value, 10);
    });
  } catch (e) {}
  return { hm: hm, hd: hd };
}
function _sunanFor(date) {
  var wd = date.getDay(), h = _sunanHijri(date), labels = [], forbidden = false;
  if ((h.hm === 10 && h.hd === 1) || (h.hm === 12 && h.hd === 10) || (h.hm === 12 && h.hd >= 11 && h.hd <= 13)) forbidden = true;
  if (!forbidden) {
    if (h.hm === 12 && h.hd === 9) labels.push('Jour de Arafa');
    if (h.hm === 1 && h.hd === 10) labels.push('Achoura');
    if (h.hm === 1 && h.hd === 9) labels.push('Veille d\u2019Achoura');
    if (h.hd === 13 || h.hd === 14 || h.hd === 15) labels.push('Ayy\u00e2m al-B\u00eed (' + h.hd + ')');
    if (wd === 1) labels.push('Lundi');
    if (wd === 4) labels.push('Jeudi');
  }
  return { labels: labels, forbidden: forbidden, hm: h.hm, hd: h.hd };
}
function _sunanFrDay(date) {
  try { return date.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' }); }
  catch (e) { return ''; }
}
function _sunanUpcoming() {
  var out = [], d = new Date(); d.setHours(0, 0, 0, 0);
  for (var k = 0; k < 60 && out.length < 6; k++) {
    var day = new Date(d); day.setDate(d.getDate() + k);
    var info = _sunanFor(day);
    if (info.forbidden || info.labels.length === 0) continue;
    out.push({ date: new Date(day), labels: info.labels, today: k === 0 });
  }
  return out;
}
function _sunanLog() { try { return JSON.parse(safeGetItem('niyyah_sunan_fasts') || '[]'); } catch (e) { return []; } }
function _sunanFastedToday() { return _sunanLog().indexOf(todayKey()) !== -1; }
function _sunanToggleToday() {
  var a = _sunanLog(), t = todayKey(), i = a.indexOf(t);
  if (i === -1) a.push(t); else a.splice(i, 1);
  safeSetItem('niyyah_sunan_fasts', JSON.stringify(a));
  openSunanHub();
}
function _sunanCountThisMonth() {
  var pre = todayKey().slice(0, 7);
  return _sunanLog().filter(function(x) { return x.slice(0, 7) === pre; }).length;
}
function closeSunan() { var ov = document.getElementById('sunan-overlay'); if (ov) ov.remove(); }
function openJeune() {
  if (typeof ramadanState !== 'undefined' && ramadanState && ramadanState.active) { switchView('ramadan'); return; }
  openSunanHub();
}
function openSunanHub() {
  closeSunan();
  var info = _sunanFor(new Date()), fasted = _sunanFastedToday(), up = _sunanUpcoming(), count = _sunanCountThisMonth();
  var todayLine, todaySub;
  if (info.forbidden) { todayLine = 'Le je\u00fbne n\u2019est pas permis aujourd\u2019hui'; todaySub = 'Jour de f\u00eate ou jours de Tashr\u00eeq.'; }
  else if (info.labels.length) { todayLine = info.labels.join(' \u00b7 '); todaySub = 'Jour de je\u00fbne recommand\u00e9.'; }
  else { todayLine = 'Pas un jour particuli\u00e8rement recommand\u00e9'; todaySub = 'Tu peux je\u00fbner si tu le souhaites.'; }
  var toggle = info.forbidden ? '' :
    '<button onclick="_sunanToggleToday()" style="margin-top:16px;width:100%;box-sizing:border-box;padding:14px;border-radius:14px;cursor:pointer;font-family:\'Cormorant Garamond\',serif;font-size:16px;'
    + (fasted ? 'border:1px solid #E8CE8A;background:linear-gradient(180deg,#F8EAC2,#D4AF37);color:#1a130b;' : 'border:1px solid rgba(200,168,74,0.35);background:transparent;color:#E8CE8A;')
    + '">' + (fasted ? '\u2713 J\u2019ai je\u00fbn\u00e9 aujourd\u2019hui' : 'J\u2019ai je\u00fbn\u00e9 aujourd\u2019hui') + '</button>';
  var shawwal = info.hm === 10
    ? '<div style="margin-top:16px;padding:14px 16px;border-radius:14px;border:1px solid rgba(232,206,138,0.25);background:rgba(232,206,138,0.05);font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(232,206,138,0.8);text-align:center;line-height:1.5;">C\u2019est Shaww\u00e2l : je\u00fbner 6 jours apr\u00e8s l\u2019A\u00efd \u00e9quivaut, avec le Ramadan, au je\u00fbne de toute l\u2019ann\u00e9e.</div>'
    : '';
  var upHtml = '';
  up.forEach(function(u) {
    upHtml += '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:10px 0;border-bottom:1px solid rgba(200,168,74,0.1);">'
      + '<span style="font-family:\'Cormorant Garamond\',serif;font-size:15px;text-transform:capitalize;color:' + (u.today ? '#E8CE8A' : 'rgba(240,234,214,0.85)') + ';">' + _sunanFrDay(u.date) + '</span>'
      + '<span style="font-size:12px;color:rgba(200,168,74,0.6);text-align:right;">' + u.labels.join(', ') + '</span></div>';
  });
  var ov = document.createElement('div');
  ov.id = 'sunan-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  ov.innerHTML = '<div style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeSunan()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Scheherazade New\',serif;font-size:42px;color:#E8CE8A;text-shadow:0 0 28px rgba(232,206,138,0.28);line-height:1.1;">\u0635\u0650\u064A\u064E\u0627\u0645</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:25px;color:#EADCB6;margin-top:8px;">Je\u00fbnes sur\u00e9rogatoires</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:#9c8c64;margin-top:6px;">Suivre les je\u00fbnes recommand\u00e9s, \u00e0 ton rythme</div>'
    + '<div style="margin-top:28px;padding:20px;border-radius:16px;border:1px solid rgba(200,168,74,0.2);background:radial-gradient(120% 140% at 50% 0%,rgba(232,206,138,0.08),rgba(232,206,138,0.01) 70%);text-align:center;">'
    + '<div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(200,168,74,0.5);">Aujourd\u2019hui</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;color:#E8CE8A;margin-top:8px;">' + todayLine + '</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.6);margin-top:4px;">' + todaySub + '</div>'
    + toggle + '</div>'
    + shawwal
    + '<div style="margin-top:28px;"><div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(200,168,74,0.5);margin-bottom:6px;">\u00c0 venir</div>' + (upHtml || '<div style="font-size:13px;color:rgba(200,168,74,0.5);font-style:italic;">\u2014</div>') + '</div>'
    + '<div style="text-align:center;margin-top:24px;font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:rgba(200,168,74,0.6);">' + count + ' je\u00fbne' + (count > 1 ? 's' : '') + ' ce mois-ci</div>'
    + '<div style="text-align:center;margin-top:18px;font-size:12px;color:rgba(200,168,74,0.5);font-style:italic;font-family:\'Cormorant Garamond\',serif;">Des d\u00e9fis de je\u00fbne t\u2019attendent dans tes d\u00e9fis hebdomadaires.</div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.4);line-height:1.7;margin-top:24px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Recommand\u00e9s : lundi & jeudi \u00b7 Ayy\u00e2m al-B\u00eed (13-14-15) \u00b7 Achoura (10 Muharram, avec le 9) \u00b7 Arafa (9 Dhul-Hijja, sauf le p\u00e8lerin) \u00b7 6 jours de Shaww\u00e2l. Le je\u00fbne est interdit les jours de l\u2019A\u00efd. Les dates peuvent varier d\u2019un jour selon l\u2019observation.</div>'
    + '</div>';
  document.body.appendChild(ov);
}
window.openJeune = openJeune;
window.openSunanHub = openSunanHub;
window.closeSunan = closeSunan;
window._sunanToggleToday = _sunanToggleToday;

```

═══════════════════════════════════════════
## Édit 2 — la carte Jeûne appelle `openJeune()`
═══════════════════════════════════════════
Dans `_repereJeuneCard`, repérer :
```js
onclick="switchView(\'ramadan\')"
```
REMPLACER par :
```js
onclick="openJeune()"
```

═══════════════════════════════════════════
## Vérif attendue
- Repères → carte Jeûne :
  - **mode Ramadan actif** → ouvre ton écran Ramadan habituel.
  - **hors Ramadan** → overlay صِيَام : « Aujourd'hui » (détection lundi/jeudi/Ayyâm al-Bîd/Achoura/Arafa + bouton « j'ai jeûné »), « À venir » (6 prochains), « N jeûnes ce mois-ci », mention défis, et la note de référence.
- Jour d'Aïd/Tashrîq → « jeûne pas permis », pas de bouton.
- En Shawwâl → note des 6 jours.

Test hors Ramadan : tape la carte Jeûne → l'overlay surérogatoires s'ouvre.
Test Ramadan : active le mode Ramadan (Réglages) → la carte ouvre l'écran Ramadan.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: hub Jeune (routage Ramadan / surerogatoires Hijri)"
git push
```
