# SPEC-DEFI-VUE-DU-JOUR

## Objectif
Afficher le défi actif dans la Vue du jour (openVueRituel), juste avant main.innerHTML = html,
pour que l'user puisse cocher son défi directement sans aller dans Chemin.

## Règles
- Pas de défi actif → rien n'est affiché
- Défi type:'auto' → bloc sobre sans bouton cocher, message "Se coche automatiquement"
- Défi type:'manual' → bloc avec bouton "Cocher aujourd'hui ✦"
- Style cohérent avec les autres blocs : fond rgba(200,168,74,0.06), bordure rgba(200,168,74,0.18), border-radius:14px

## script.js — dans openVueRituel(), AVANT la ligne `main.innerHTML = html;`

Ajoute ce bloc :

```js
  // Bloc défi de la semaine
  var _defiState = safeParseJSON('niyyah_defi_state', {});
  var _defiId = _defiState.defiId;
  if (_defiId) {
    var _defi = DEFIS_DB.find(function(d){ return d.id === _defiId; });
    if (_defi) {
      var _defiDays = _defiState.joursCochesSemaine || [];
      var _defiDone = _defiDays.length;
      var _defiTotal = _defi.cible || 5;
      var _defiPct = Math.min(Math.round(_defiDone / _defiTotal * 100), 100);
      var _defiDots = '';
      for (var _di = 0; _di < _defiTotal; _di++) {
        _defiDots += '<div style="width:' + Math.floor(100/_defiTotal - 2) + '%;height:5px;border-radius:3px;background:' + (_di < _defiDone ? '#C8A84A' : 'rgba(200,168,74,0.18)') + ';"></div>';
      }
      var _defiBtn = _defi.type === 'auto'
        ? '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.45);text-align:center;margin-top:10px;">Se coche automatiquement dans l\'app.</div>'
        : '<button onclick="cocherDefiAujourdhui();openVueRituel(\'' + prayer + '\');" style="width:100%;margin-top:10px;padding:10px;border-radius:10px;border:1px solid rgba(200,168,74,0.3);background:rgba(200,168,74,0.06);color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-size:14px;letter-spacing:1px;cursor:pointer;">' + (_defiState.cocheAujourdhui ? '✓ Coché aujourd\'hui' : 'Cocher aujourd\'hui ✦') + '</button>';
      html += '<div style="margin-top:14px;padding:14px 16px;background:rgba(200,168,74,0.06);border:1px solid rgba(200,168,74,0.18);border-radius:14px;">'
        + '<div style="font-size:10px;letter-spacing:2px;color:rgba(200,168,74,0.5);text-transform:uppercase;margin-bottom:8px;">✦ Défi de la semaine</div>'
        + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-weight:600;color:#C8A84A;margin-bottom:10px;">' + _defi.titre + '</div>'
        + '<div style="display:flex;gap:4px;margin-bottom:6px;">' + _defiDots + '</div>'
        + '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.5);">' + _defiDone + ' / ' + _defiTotal + ' jours accomplis</div>'
        + _defiBtn
        + '</div>';
    }
  }
```

## Trigger
```
Lis SPEC-DEFI-VUE-DU-JOUR.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: defi de la semaine dans Vue du jour" && git push
```
