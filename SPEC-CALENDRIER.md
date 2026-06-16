# SPEC-CALENDRIER

> Prérequis : Repères embelli (openRepere). Réutilise `_convHijri`, `_CONV_MONTHS`, `_sunanFor`.

## But
Calendrier **vue mois** : grille du mois (grégorien), chaque jour affiche sa **date Hijri**,
les **jours de jeûne recommandés** marqués d'un point doré, aujourd'hui surligné, navigation
‹ ›. Carte dans « Temps & repères », à côté du Convertisseur.

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
var _calOffset = 0;
var _CAL_GREG_MONTHS = ['janvier', 'f\u00e9vrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'ao\u00fbt', 'septembre', 'octobre', 'novembre', 'd\u00e9cembre'];
var _CAL_WEEKDAYS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
function _calNav(dir) { _calOffset += dir; renderCalGrid(); }
function renderCalGrid() {
  var base = new Date(); base.setHours(12, 0, 0, 0); base.setDate(1); base.setMonth(base.getMonth() + _calOffset);
  var year = base.getFullYear(), month = base.getMonth();
  var firstDow = (new Date(year, month, 1).getDay() + 6) % 7;
  var daysIn = new Date(year, month + 1, 0).getDate();
  var t = new Date(), tKey = t.getFullYear() + '-' + t.getMonth() + '-' + t.getDate();
  var h1 = _convHijri(new Date(year, month, 1)), hL = _convHijri(new Date(year, month, daysIn));
  var hijLabel = (_CONV_MONTHS[h1.m - 1] || '') + (h1.m !== hL.m ? ' \u2013 ' + (_CONV_MONTHS[hL.m - 1] || '') : '') + ' ' + hL.y;
  var header = '<div style="display:flex;align-items:center;justify-content:space-between;">'
    + '<button onclick="_calNav(-1)" aria-label="Mois pr\u00e9c\u00e9dent" style="width:38px;height:38px;border-radius:50%;border:1px solid rgba(200,168,74,0.25);background:transparent;color:#E8CE8A;font-size:18px;cursor:pointer;">\u2039</button>'
    + '<div style="text-align:center;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:21px;color:#E8CE8A;text-transform:capitalize;line-height:1.1;">' + _CAL_GREG_MONTHS[month] + ' ' + year + '</div><div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:rgba(200,168,74,0.6);margin-top:2px;">' + hijLabel + ' H</div></div>'
    + '<button onclick="_calNav(1)" aria-label="Mois suivant" style="width:38px;height:38px;border-radius:50%;border:1px solid rgba(200,168,74,0.25);background:transparent;color:#E8CE8A;font-size:18px;cursor:pointer;">\u203a</button></div>';
  var wd = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;margin:16px 0 6px;">';
  _CAL_WEEKDAYS.forEach(function(w) { wd += '<div style="text-align:center;font-size:11px;color:rgba(200,168,74,0.5);font-family:\'Cormorant Garamond\',serif;">' + w + '</div>'; });
  wd += '</div>';
  var cells = '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;">';
  for (var i = 0; i < firstDow; i++) cells += '<div></div>';
  for (var day = 1; day <= daysIn; day++) {
    var dt = new Date(year, month, day); dt.setHours(12, 0, 0, 0);
    var h = _convHijri(dt), info = _sunanFor(dt);
    var isToday = (year + '-' + month + '-' + day) === tKey;
    var reco = !info.forbidden && info.labels.length > 0;
    cells += '<div style="aspect-ratio:1;border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:center;'
      + (isToday ? 'border:1px solid rgba(232,206,138,0.6);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02));' : 'border:1px solid rgba(200,168,74,0.08);')
      + '"><div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;color:' + (isToday ? '#F4ECD6' : 'rgba(240,234,214,0.85)') + ';line-height:1;">' + day + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:10px;color:rgba(200,168,74,0.5);margin-top:1px;">' + h.d + '</div>'
      + (reco ? '<div style="width:4px;height:4px;border-radius:50%;background:#E8CE8A;margin-top:2px;"></div>' : '<div style="height:6px;"></div>')
      + '</div>';
  }
  cells += '</div>';
  var legend = '<div style="display:flex;align-items:center;justify-content:center;gap:7px;margin-top:16px;"><div style="width:5px;height:5px;border-radius:50%;background:#E8CE8A;"></div><span style="font-size:12px;color:rgba(200,168,74,0.6);font-style:italic;font-family:\'Cormorant Garamond\',serif;">Jour de je\u00fbne recommand\u00e9</span></div>';
  var b = document.getElementById('cal-body');
  if (b) b.innerHTML = header + wd + cells + legend;
}
function closeCalendrier() { var o = document.getElementById('calendrier-overlay'); if (o) o.remove(); }
function renderCalendrierCard() {
  return '<div onclick="openCalendrier()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="17" rx="2"/><path d="M3 9h18M8 2v4M16 2v4"/><circle cx="8" cy="14" r="0.6"/><circle cx="12" cy="14" r="0.6"/><circle cx="16" cy="14" r="0.6"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Calendrier</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Le mois Hijri en un coup d\u2019\u0153il</div></div>'
    + '<div style="color:rgba(200,168,74,0.3);font-size:18px;">\u203a</div></div>';
}
function openCalendrier() {
  closeCalendrier();
  _calOffset = 0;
  var ov = document.createElement('div');
  ov.id = 'calendrier-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  ov.innerHTML = '<div style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 22px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeCalendrier()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-weight:300;font-size:30px;letter-spacing:.05em;color:#E8CE8A;line-height:1;">Calendrier</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.6);margin-top:6px;margin-bottom:24px;">Le mois en un coup d\u2019\u0153il</div>'
    + '<div id="cal-body"></div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.42);line-height:1.7;margin-top:22px;font-style:italic;font-family:\'Cormorant Garamond\',serif;text-align:center;">Le petit chiffre indique la date Hijri. Les dates peuvent varier d\u2019un jour selon l\u2019observation de la lune.</div>'
    + '</div>';
  document.body.appendChild(ov);
  renderCalGrid();
}
window.openCalendrier = openCalendrier;
window.closeCalendrier = closeCalendrier;
window._calNav = _calNav;
window.renderCalGrid = renderCalGrid;
window.renderCalendrierCard = renderCalendrierCard;

```

═══════════════════════════════════════════
## Édit 2 — ajouter la carte (famille « Temps & repères »)
═══════════════════════════════════════════
Dans `openRepere`, repérer :
```js
    + renderConvertCard()
    + _repereJeuneCard()
```
REMPLACER par :
```js
    + renderConvertCard()
    + renderCalendrierCard()
    + _repereJeuneCard()
```

═══════════════════════════════════════════
## Vérif attendue
- Repères → « Temps & repères » : Convertisseur · **Calendrier** · Jeûne.
- Overlay Calendrier : grille du mois, en-tête « <mois> <année> · <mois Hijri> H », flèches ‹ › pour naviguer.
- Chaque case : jour grégorien (grand) + jour Hijri (petit) ; **point doré** sur les jours recommandés (lundi/jeudi, jours blancs, Achoura, Arafa) ; aujourd'hui surligné.
- Légende + note « ±1 jour selon l'observation ».

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: calendrier Hijri vue mois (jours recommandes marques)"
git push
```
