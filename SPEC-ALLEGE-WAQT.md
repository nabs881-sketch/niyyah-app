# SPEC-ALLEGE-WAQT

## Objectif
Au boot, `_loadWaqtByPriere()` télécharge les **5 fichiers waqt d'un coup** (~1,7 Mo, dont `waqt_dhuhr.json` = 1,2 Mo). Or ces données ne servent QUE dans la modale Waqt (`openWaqtModal`). On diffère le chargement à la 1re ouverture de la modale.

Vérifié : `isWaqtAvailable()` ne dépend que de `_prayerTimes` (pas du JSON), et `WAQT_BY_PRIERE` n'est lu que dans `openWaqtModal`. → différer ne casse rien.

## Cible : script.js (2 retouches)

### 1. Transformer l'IIFE de boot en fonction à la demande
Remplacer le début de l'IIFE :
```
(function _loadWaqtByPriere() {
  var files = {fajr:'data/waqt/waqt_fajr.json',dhuhr:'data/waqt/waqt_dhuhr.json',asr:'data/waqt/waqt_asr.json',maghrib:'data/waqt/waqt_maghrib.json',isha:'data/waqt/waqt_isha.json'};
```
par :
```
function loadWaqtData(cb) {
  if (window.WAQT_BY_PRIERE) { if (cb) cb(); return; }
  var files = {fajr:'data/waqt/waqt_fajr.json',dhuhr:'data/waqt/waqt_dhuhr.json',asr:'data/waqt/waqt_asr.json',maghrib:'data/waqt/waqt_maghrib.json',isha:'data/waqt/waqt_isha.json'};
```

Et remplacer la fin de cette même IIFE :
```
      window.WAQT_BY_PRIERE = obj;
    });
})();
```
par :
```
      window.WAQT_BY_PRIERE = obj;
      if (cb) cb();
    });
}
```
(on enlève l'auto-exécution `()` → la fonction ne tourne plus au boot, elle attend d'être appelée)

### 2. Charger à la demande dans `openWaqtModal`
Remplacer :
```
  if (safeGetItem('niyyah_intro_' + _wk) !== '1') return _niyyahIntro(_wk, openWaqtModal);
  _waqtModalPriere = priere;
```
par :
```
  if (safeGetItem('niyyah_intro_' + _wk) !== '1') return _niyyahIntro(_wk, openWaqtModal);
  if (!window.WAQT_BY_PRIERE) { loadWaqtData(function(){ openWaqtModal(); }); return; }
  _waqtModalPriere = priere;
```
(si les données ne sont pas encore chargées : on les charge puis on rouvre la modale → toujours fonctionnel dès la 1re fois)

## Effet
- Boot allégé de **~1,7 Mo** (les 5 waqt ne se chargent plus au démarrage).
- La modale Waqt marche pareil : au 1er clic, chargement (puis cache), réouverture auto. Ensuite instantané.
- `isWaqtAvailable` / le médaillon d'accueil : inchangés (basés sur l'heure, pas sur le JSON).

## ⚠️ À signaler (data, séparé)
`waqt_dhuhr.json` pèse **1,2 Mo** vs ~120 Ko pour les autres prières → anomalie (contenu probablement dupliqué/gonflé). À auditer à part : si on le dégonfle, le chargement à la demande sera lui aussi bien plus léger.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "perf(boot): waqt charge a la demande (-1.7Mo au boot)"
```
