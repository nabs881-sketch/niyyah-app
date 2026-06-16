# SPEC-FIX-SANCTUAIRE-HIDDEN

## Bug
Au démarrage, parfois pas d'orbe ni d'images : le sanctuaire reste `visibility:hidden`.
Cause : il n'est révélé que par `_aidRevealSanctuaire()`, appelé après `getCurrentHijri()` qui fait `await fetch(api.aladhan.com)` **sans timeout**. Si le réseau pend (ne répond ni n'échoue), la promesse reste pendante → reveal jamais appelé → écran d'accueil invisible.

## Fix : script.js (2 retouches)

### 1. Timeout sur le fetch Aladhan — fonction `getCurrentHijri`
Remplacer :
```
    var res = await fetch('https://api.aladhan.com/v1/gToH?date=' + dd + '-' + mm + '-' + yyyy);
    if (!res.ok) return null;
```
par :
```
    var _ctrl = new AbortController();
    var _to = setTimeout(function(){ _ctrl.abort(); }, 3500);
    var res = await fetch('https://api.aladhan.com/v1/gToH?date=' + dd + '-' + mm + '-' + yyyy, { signal: _ctrl.signal });
    clearTimeout(_to);
    if (!res.ok) return null;
```
(si le réseau pend, le fetch est abandonné au bout de 3,5s → le `catch` existant renvoie `null` → le boot continue et révèle le sanctuaire)

### 2. Failsafe de révélation — fonction `_aidBoot`
Juste APRÈS la ligne :
```
  console.log('[Aid] _aidBoot called, onboard:', _onboardDone, 'data:', !!window._AID_DATA);
```
INSÉRER :
```js
  setTimeout(function(){ try { _aidRevealSanctuaire(); } catch(e){} }, 3000);
```
(`_aidRevealSanctuaire` ne fait que `visibility:visible`, c'est idempotent : sûr à appeler plusieurs fois. Garantit que l'accueil s'affiche au bout de 3s quoi qu'il arrive.)

## Effet
- Réseau lent/absent → le sanctuaire s'affiche quand même (failsafe 3s + fetch abandonné à 3,5s).
- Réseau normal → comportement inchangé (reveal immédiat, le failsafe ne fait que rappeler une fonction idempotente).
- Pendant un Aïd actif, l'overlay couvre le sanctuaire → le failsafe ne gêne pas.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "fix(boot): sanctuaire jamais masque si l'API hijri pend (timeout fetch + failsafe reveal 3s)"
```
