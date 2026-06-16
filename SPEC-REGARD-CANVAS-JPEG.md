# SPEC-REGARD-CANVAS-JPEG (partage Regard — encodage JPEG, vraie accélération)

## Problème
Le partage génère un **PNG 1080×1080** (`toBlob` ligne ~14533), réencodé à chaque rendu / changement de
type. Le PNG est lent à encoder sur mobile → c'est LA latence restante. On passe en JPEG (qualité 0,92).

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.**

## Étape 1 — encodage JPEG
CHERCHER :
```
    window._regardCanvasBlob = blob;
    window._regardCanvasUrl = url;
  }, 'image/png');
```
REMPLACER PAR :
```
    window._regardCanvasBlob = blob;
    window._regardCanvasUrl = url;
  }, 'image/jpeg', 0.92);
```

## Étape 2 — fichier de partage (.jpg)
CHERCHER :
```
  var file = new File([window._regardCanvasBlob], 'regard-niyyah.png', { type: 'image/png' });
```
REMPLACER PAR :
```
  var file = new File([window._regardCanvasBlob], 'regard-niyyah.jpg', { type: 'image/jpeg' });
```

## Étape 3 — fichier de téléchargement (.jpg)
CHERCHER :
```
  a.download = 'regard-niyyah.png';
```
REMPLACER PAR :
```
  a.download = 'regard-niyyah.jpg';
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "partage Regard: encodage JPEG (au lieu de PNG) -> generation bien plus rapide"
git push
```

> JPEG 0,92 = qualité quasi indiscernable pour une carte photo+texte, mais encodage très rapide.
> Avec le cache photo déjà en place, le changement de type sera maintenant quasi instantané.
