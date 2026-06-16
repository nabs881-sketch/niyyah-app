# SPEC-QIBLA-FIX

## Cible
`script.js` — fonctions `renderQiblaCard` et `_attachCompass`.
Corrige 3 choses : (1) boussole figée sur iPhone, (2) aiguille qui hésite sur
Android, (3) absence de conseil de calibration.

---

## Fix 1 — iPhone : demander la permission DANS le tap (boussole figée)

Repérer l'onclick du header de la carte Qibla :
```
onclick="_qiblaOpen=!_qiblaOpen;if(!_qiblaOpen)stopCompass();renderLevel(currentLevel)"
```
REMPLACER par :
```
onclick="_qiblaOpen=!_qiblaOpen;if(_qiblaOpen){startCompass();}else{stopCompass();}renderLevel(currentLevel)"
```
(iOS exige que `requestPermission()` parte d'un geste utilisateur ; le `setTimeout`
existant ne suffit pas. `startCompass` est protégé par `if (_compassActive) return`.)

---

## Fix 2 — Android : ne plus écraser le cap absolu par le cap relatif

Dans `_attachCompass`, repérer :
```
    if (e.alpha !== null) {
      _updateNeedle((360 - e.alpha) % 360);
    }
```
REMPLACER par :
```
    if (!_hasAbsolute && e.alpha !== null) {
      _updateNeedle((360 - e.alpha) % 360);
    }
```
(Une fois qu'une lecture absolue est arrivée, on ignore les lectures relatives —
elles ne pointent pas le Nord et faisaient « hésiter » l'aiguille.)

---

## Fix 3 — Conseil de calibration visible (le « long avant le bon »)

Dans `renderQiblaCard`, repérer la ligne du disclaimer suivie de la fermeture :
```
    + '<div style="font-size:12px;font-style:italic;color:var(--t3);opacity:0.7;text-align:center;margin-top:10px;">' + t('qibla_disclaimer') + '</div>'
    + '</div>';
```
REMPLACER par :
```
    + '<div style="font-size:12px;font-style:italic;color:var(--t3);opacity:0.7;text-align:center;margin-top:10px;">' + t('qibla_disclaimer') + '</div>'
    + '<div style="font-size:11px;color:var(--t3);opacity:0.6;text-align:center;margin-top:6px;">Boussole imprécise ou lente ? Bouge ton téléphone en forme de 8 (∞) quelques secondes pour la calibrer.</div>'
    + '</div>';
```

---

## Vérif attendue
- iPhone : ouvrir la carte Qibla déclenche la demande de permission ; l'aiguille bouge.
- Android : l'aiguille se stabilise plus vite sur la bonne direction.
- Le conseil « bouge en forme de 8 » s'affiche sous la boussole.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "qibla: permission iOS dans le tap + ignore cap relatif Android + hint calibration"
git push
```
