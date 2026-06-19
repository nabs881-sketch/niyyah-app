# SPEC-DEFI-HADITH-MSG

## Objectif
Dans l'accordéon "DÉFI DE LA SEMAINE" dans openVueAuFilDuJour(),
ajouter le hadith et un message contextuel selon la progression.

## script.js — dans le bloc accordéon data-cat="defi"

Trouve la ligne qui affiche le compte :
```
+ '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.5);">' + _done2 + ' / ' + _total2 + ' jours accomplis</div>'
```

Remplace par :
```
+ '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.5);">' + _done2 + ' / ' + _total2 + ' jours accomplis</div>'
+ '<div style="font-size:13px;font-style:italic;color:rgba(200,168,74,0.55);margin-top:8px;line-height:1.5;">' + _d2.ref + (_d2.hadith ? ' — ' + _d2.hadith : '') + '</div>'
+ (function(){ var _msg2 = _done2 === 0 ? 'Commence aujourd\'hui — chaque jour compte ✦' : _done2 < Math.ceil(_total2/2) ? 'Bien lancé — continue sur cette lancée' : _done2 < _total2 ? 'Tu y es presque — encore un effort' : 'Accompli — barakAllahu fik ✦'; return '<div style="font-size:12px;font-style:italic;color:rgba(200,168,74,0.7);margin-top:6px;">' + _msg2 + '</div>'; })()
```

## Trigger
```
Lis SPEC-DEFI-HADITH-MSG.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: hadith et message contextuel dans accordeon defi" && git push
```
