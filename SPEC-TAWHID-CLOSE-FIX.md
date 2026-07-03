# SPEC-TAWHID-CLOSE-FIX — Retour correct après fermeture overlay Tawhid

## Problème
Quand on ferme l'overlay Tawhid depuis PRATIQUE, on se retrouve dans le Fil du Jour au lieu de rester dans PRATIQUE.

## Cause
`closeTawhid()` appelle toujours `_knowledgeReturn('tawhid_jour')` quand `_tawhidFromFil` est true, même quand on vient de PRATIQUE.

---

## 1. Ajouter window._tawhidFromPratique

Dans `_openTawhidJour` (appelée depuis Fil du Jour), ajouter :
```js
window._tawhidFromPratique = false;
```

Dans `renderLevel` (appelée depuis PRATIQUE), dans le customClick de tawhid_jour, remplacer `window._openTawhidJour()` par :
```js
window._tawhidFromPratique = true; window._openTawhidJour();
```

---

## 2. Modifier closeTawhid()

Remplacer la fonction `closeTawhid` existante par :

```js
function closeTawhid() {
  var el = document.getElementById('tawhid-overlay');
  if (el) el.remove();
  if (window._tawhidFromFil) {
    window._tawhidFromFil = false;
    if (window._tawhidFromPratique) {
      window._tawhidFromPratique = false;
      return; // reste dans PRATIQUE
    }
    _knowledgeReturn('tawhid_jour'); // retour Fil du Jour
  }
}
```

---

## 3. BUILD & COMMIT

```
npm run build
git add -A
git commit -m "fix: retour correct tawhid — Pratique vs Fil du Jour"
git rm SPEC-TAWHID-CLOSE-FIX.md
git commit -m "clean: suppression SPEC-TAWHID-CLOSE-FIX"
git push
```
