# SPEC-ALLEGE-BOOT

## Objectif
Alléger le démarrage/les mises à jour : le précache du Service Worker passe de **~14,3 Mo** à **~1,5 Mo**.
Tout le reste (gros JSON, mp3, assets de cure, données de fonctionnalités) se met en cache **à l'usage** — le handler `fetch` same-origin du SW le fait déjà automatiquement, donc aucun risque de casser l'offline une fois consulté.

## 1. sw.js — réduire `CORE` à la coquille + le quotidien
Remplacer **tout le tableau** `const CORE = [ ... ];` par :

```js
const CORE = [
  './index.html',
  './script.min.js',
  './style.min.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo2.webp',
  './hadiths_jour.json',
  './fiqh_jour.json',
];
```

(On garde uniquement : la coquille de l'app + les 2 JSON quotidiens affichés à l'accueil. Les coffrets, cures, mp3, sira, duaas, compagnons, prophetes, waqt, lisan, niyyah_pool, savais_tu, assets de cure, etc. ne sont PLUS précachés — ils se chargent et se cachent au 1er usage.)

## 2. Supprimer le mp3 mort `jannat-al-qalb.mp3`
Ce fichier (1,7 Mo) n'est jamais joué (code après un `return` dans `showNiyyahScreen`). Le supprimer du repo :
```
git rm jannat-al-qalb.mp3
```
(Le code legacy qui le référence est après un `return`, il ne s'exécute jamais → pas d'erreur même fichier absent. On peut le laisser tel quel.)

## Effet
- Précache install/update : ~14,3 Mo → ~1,5 Mo → installations et mises à jour beaucoup plus rapides.
- Repo allégé de 1,7 Mo (mp3 mort).
- Accueil + contenu quotidien : fonctionnent offline immédiatement.
- Fonctionnalités (cures, sira, duaas, son Tafakkur, etc.) : se chargent au 1er usage puis restent en cache. Le son Tafakkur marche toujours, juste téléchargé au 1er lancement.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "perf(boot): slim precache SW 14Mo->1.5Mo + suppr mp3 mort jannat"
```
(`build.js` ne fait que minifier + bumper la version du SW — il ne régénère PAS `CORE`. L'edit manuel du précache est donc conservé.)
