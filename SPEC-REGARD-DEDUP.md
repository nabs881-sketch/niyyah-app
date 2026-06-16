# SPEC-REGARD-DEDUP — Un seul rappel Regard par jour

Fichier : script.js.

## Problème
Il existe déjà `checkRegardeAlert()` : alerte Regard aléatoire en journée
(9h-21h, 1×/jour max, modale in-app), qui pose le drapeau
`niyyah_regarde_last_alert = todayKey()`. La notif Regard de 21h peut donc faire
DOUBLON le même jour.

## Édit — la notif 21h partage le même drapeau quotidien
Dans `scheduleAllNotifications`, dans le bloc Regard, REMPLACER :
```js
    _notifTimers.push(setTimeout(function() {
      var m = REGARD_MURMURES[Math.floor(Math.random() * REGARD_MURMURES.length)];
      sendNotification('Niyyah ' + m.icon, m.body, m.icon, 'regard');
    }, _regMs));
```
PAR :
```js
    _notifTimers.push(setTimeout(function() {
      if (safeGetItem('niyyah_regarde_last_alert') === todayKey()) return; // déjà alerté aujourd'hui
      safeSetItem('niyyah_regarde_last_alert', todayKey());
      var m = REGARD_MURMURES[Math.floor(Math.random() * REGARD_MURMURES.length)];
      sendNotification('Niyyah ' + m.icon, m.body, m.icon, 'regard');
    }, _regMs));
```

## Résultat
Max UN rappel Regard / jour : l'aléatoire en journée, ou la notif 21h en
rattrapage — jamais les deux.

## Contraintes
- `npm run build` AVANT git commit.
