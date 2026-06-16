# SPEC-NOTIF-REGARD — Notification Regard avec ouverture directe du scan

Fichiers : script.js + sw.js.
But : une notif « Regard » avec un bouton qui ouvre l'app DIRECTEMENT sur le
Scanner Regard (prêt à capturer). Branche aussi le système d'actions de notif
(aujourd'hui mort).

## 1. script.js — pool de murmures Regard
Près de la définition de `const MURMURES = {` (juste après sa fermeture),
AJOUTER :
```js
const REGARD_MURMURES = [
  { body: "Un instant — où se posent tes yeux ?", icon: "\u2726" },
  { body: "Baisse le regard. Ton c\u0153ur s'all\u00e8ge.", icon: "\u2726" },
  { body: "Le premier regard passe. Ne le suis pas du second.", icon: "\u2726" },
  { body: "Ce que l'\u0153il ne suit pas, le c\u0153ur ne convoite pas.", icon: "\u2726" }
];
```

## 2. script.js — bouton d'action de la notif Regard
Dans `sendNotification`, REMPLACER EXACTEMENT :
```js
    } else {
      actions = [
        { action: 'wird',  title: "Wird du soir 🌙" },
        { action: 'done',  title: "Al-Hamdulillah ✓" }
      ];
    }
```
PAR :
```js
    } else if (moment === 'regard') {
      actions = [
        { action: 'scan_regard', title: "Scanner mon regard" },
        { action: 'open',        title: "Plus tard" }
      ];
    } else {
      actions = [
        { action: 'wird',  title: "Wird du soir 🌙" },
        { action: 'done',  title: "Al-Hamdulillah ✓" }
      ];
    }
```

## 3. script.js — planifier la notif Regard (21:00)
Dans `function scheduleAllNotifications()`, juste AVANT l'accolade `}` qui ferme
la fonction, AJOUTER :
```js
  // Regard — 21:00, rappel de baisser le regard
  var _regT = new Date(); _regT.setHours(21, 0, 0, 0);
  var _regMs = _regT.getTime() - nowMs;
  if (_regMs > 0 && _regMs < 86400000) {
    _notifTimers.push(setTimeout(function() {
      var m = REGARD_MURMURES[Math.floor(Math.random() * REGARD_MURMURES.length)];
      sendNotification('Niyyah ' + m.icon, m.body, m.icon, 'regard');
    }, _regMs));
  }
```

## 4. script.js — BRANCHER les actions de notif (manquant aujourd'hui)
Au niveau racine (ex. près de `window.regardeOpen = regardeOpen;`), AJOUTER :
```js
function handleNotifAction(action) {
  try {
    if (action === 'scan_regard') { if (typeof regardeOpen === 'function') regardeOpen(); return; }
    // autres actions (done / dua / wird / open) : \u00e0 compl\u00e9ter au besoin
  } catch(e) {}
}
window.handleNotifAction = handleNotifAction;
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', function(ev) {
    if (ev.data && ev.data.type === 'NOTIFICATION_ACTION') handleNotifAction(ev.data.action);
  });
}
try {
  var _na = new URLSearchParams(location.search).get('notif_action');
  if (_na) setTimeout(function(){ handleNotifAction(_na); }, 800);
} catch(e) {}
```
(NB : si ton bouton « Scanner Regard » ouvre `scannerOpen()` plut\u00f4t que
`regardeOpen()`, remplace `regardeOpen` par `scannerOpen` ci-dessus.)

## 5. sw.js — passer l'action quand l'app est fermée
REMPLACER :
```js
      if (clients.openWindow) return clients.openWindow('./index.html');
```
PAR :
```js
      if (clients.openWindow) return clients.openWindow('./index.html?notif_action=' + (e.action || 'open'));
```

## Limites assum\u00e9es (normales)
- La cam\u00e9ra ne s'ouvre pas toute seule : le clic m\u00e8ne sur l'\u00e9cran scan, prêt ;
  un appui lance la cam\u00e9ra (r\u00e8gle navigateur). `regardeOpen` g\u00e8re la permission.
- Ne sonne vraiment qu'en Android natif (les notifs ne partent pas en PWA).

## Contraintes
- `npm run build` AVANT git commit (minifie + monte la version SW).
