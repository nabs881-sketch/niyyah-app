# SPEC-REGARD-CANVAS-CACHE (partage Regard — photo en cache, plus rapide)

## Problème
Dans `genRegardCanvas`, chaque changement de type (Verset/Du'â/Murmure) recharge et redécode la photo
base64 + redessine tout le canvas 1080×1080 → latence à chaque clic.
Fix : mettre la photo décodée en cache (`window._regardImgCache`). 1er affichage = 1 décodage ;
ensuite, instantané.

## Cible
`script.js`, fonction `genRegardCanvas`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.**

## Étape 1
CHERCHER :
```
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
      var s = Math.max(1080 / img.width, 1080 / img.height);
```
REMPLACER PAR :
```
    var _ic = window._regardImgCache;
    var img = (_ic && _ic.src === e.photo && _ic.img && _ic.img.complete) ? _ic.img : new Image();
    img.crossOrigin = 'anonymous';
    var _paintPhoto = function() {
      var s = Math.max(1080 / img.width, 1080 / img.height);
```

## Étape 2
CHERCHER :
```
    };
    img.onerror = function() {
      ctx.fillStyle = '#0A0908'; ctx.fillRect(0, 0, 1080, 1080);
      _drawCard();
    };
    img.src = e.photo;
  } else {
```
REMPLACER PAR :
```
    };
    if (img.complete && img.naturalWidth) { _paintPhoto(); }
    else {
      img.onload = function() { window._regardImgCache = { src: e.photo, img: img }; _paintPhoto(); };
      img.onerror = function() { ctx.fillStyle = '#0A0908'; ctx.fillRect(0, 0, 1080, 1080); _drawCard(); };
      img.src = e.photo;
    }
  } else {
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "partage Regard: cache de la photo decodee (changement de type instantane)"
git push
```

> Le dessin de la photo n'est pas modifié, seulement mis en fonction réutilisable + cache.
> Si après ça le 1er affichage reste lent, c'est le décodage initial de la photo base64 — on pourra
> alors réduire la résolution stockée des photos (autre SPEC).
