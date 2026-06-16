# SPEC-LOCALSTORAGE-WRAP — Fiabiliser le stockage (prérequis iOS)

Fichier : script.js. Objectif : faire passer les accès `localStorage` bruts par
les wrappers `safe*` (anti-crash Safari privé + prérequis Capacitor Preferences).

## 1. Créer `safeRemoveItem` (il n'existe pas)
Juste APRÈS la fonction `safeSetItem` (≈ L74-81), ajouter :
```js
function safeRemoveItem(key) { try { localStorage.removeItem(key); return true; } catch(e) { return false; } }
```

## 2. Remplacement global
Dans TOUT script.js, remplacer :
- `localStorage.getItem(`    → `safeGetItem(`
- `localStorage.setItem(`    → `safeSetItem(`
- `localStorage.removeItem(` → `safeRemoveItem(`

## 3. ⚠️ EXCLUSIONS OBLIGATOIRES (sinon récursion infinie / casse)
Après le remplacement global, ces fonctions DOIVENT encore appeler le
`localStorage` NATIF en interne. Si le remplacement les a modifiées, RESTAURER :
- `safeSetItem` : son corps doit garder `localStorage.setItem(key, value)`
- `safeGetItem` : doit garder `localStorage.getItem(key)`
- `safeParseJSON` : doit garder `localStorage.getItem(key)`
- `safeRemoveItem` (créé en 1) : doit garder `localStorage.removeItem(key)`

## 4. NE PAS TOUCHER (réservé migration iOS)
Laisser tels quels les 12 usages : `localStorage.length`, `localStorage.key(...)`,
`localStorage.clear()`. Ajouter au-dessus du premier de ces blocs un commentaire :
`// TODO iOS: itération/clear localStorage -> à migrer vers Capacitor Preferences (async)`

## 5. Vérif avant commit
- Plus aucun `localStorage.getItem/setItem/removeItem` SAUF dans
  safeGetItem / safeSetItem / safeParseJSON / safeRemoveItem.
- `localStorage.length/.key/.clear` toujours présents (intacts).
- L'app démarre, la progression se sauvegarde (tester ouvrir/fermer une porte).

## Contraintes
- `npm run build` AVANT git commit.
