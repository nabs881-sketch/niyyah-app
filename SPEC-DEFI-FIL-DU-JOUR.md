# SPEC-DEFI-FIL-DU-JOUR

## Objectif
Déplacer le bloc défi de openVueRituel() vers openVueAuFilDuJour().

## Étape 1 — Supprimer dans openVueRituel()

Dans openVueRituel(), trouve et supprime entièrement ce bloc
(de `var _defiS = getDefiState();` jusqu'au `}` qui précède `main.innerHTML = html;`) :

```
  var _defiS = getDefiState();
  if (_defiS.current && _defiS.current.id) {
    ...
  }
```

## Étape 2 — Ajouter dans openVueAuFilDuJour()

Dans openVueAuFilDuJour(), AVANT la ligne `main.innerHTML = _html;`, insère :

```js
  var _defiS2 = getDefiState();
  if (_defiS2 && _defiS2.current && _defiS2.current.id) {
    var _d2 = DEFIS_DB.find(function(d){ return d.id === _defiS2.current.id; });
    if (_d2) {
      var _j2 = _defiS2.current.jours || [];
      var _done2 = _j2.length;
      var _total2 = _d2.cible || 5;
      var _coche2 = _j2.includes(todayKey());
      var _dots2 = '';
      for (var _di2 = 0; _di2 < _total2; _di2++) {
        _dots2 += '<div style="flex:1;height:5px;border-radius:3px;background:' + (_di2 < _done2 ? '#C8A84A' : 'rgba(200,168,74,0.18)') + ';"></div>';
      }
      var _btn2 = _d2.type === 'auto'
        ? '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.45);text-align:center;margin-top:10px;">Se coche automatiquement dans l\'app.</div>'
        : (_coche2
          ? '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.6);text-align:center;margin-top:10px;">✓ Coché aujourd\'hui</div>'
          : '<button onclick="cocherDefiAujourdhui();openVueAuFilDuJour();" style="width:100%;margin-top:10px;padding:10px;border-radius:10px;border:1px solid rgba(200,168,74,0.3);background:rgba(200,168,74,0.06);color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-size:14px;cursor:pointer;">Cocher aujourd\'hui ✦</button>');
      _html += '<div style="margin-top:14px;padding:14px 16px;background:rgba(200,168,74,0.06);border:1px solid rgba(200,168,74,0.18);border-radius:14px;">'
        + '<div style="font-size:10px;letter-spacing:2px;color:rgba(200,168,74,0.5);text-transform:uppercase;margin-bottom:8px;">✦ Défi de la semaine</div>'
        + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-weight:600;color:#C8A84A;margin-bottom:10px;">' + _d2.titre + '</div>'
        + '<div style="display:flex;gap:4px;margin-bottom:6px;">' + _dots2 + '</div>'
        + '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.5);">' + _done2 + ' / ' + _total2 + ' jours accomplis</div>'
        + _btn2
        + '</div>';
    }
  }
```

## Trigger
```
Lis SPEC-DEFI-FIL-DU-JOUR.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: defi dans Au fil du jour, retiré de Vue du jour" && git push
```
