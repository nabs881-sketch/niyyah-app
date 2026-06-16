# SPEC-CLEAN-FILJOUR

## Objectif (interne, invisible pour l'utilisateur)
La règle qui choisit les items « Au fil du jour » est écrite **2 fois** (dans la liste `openVueAuFilDuJour` et dans le compteur `getFilJourCardHTML`). On l'écrit **une seule fois** (`getFilJourItems`), pour qu'elles ne puissent plus diverger. Aucune modif visible : même liste, même affichage.

Cible : **script.js** (3 retouches).

---

### 1. Ajouter la fonction unique (juste AVANT `function getFilJourCardHTML() {`)
Insérer :
```js
function getFilJourItems() {
  if (!Array.isArray(LEVELS)) return [];
  var _motiv = getEffectiveMotiv();
  var _day = new Date().getDay();
  var _ok = function(it) {
    if (_motiv && it.paths && !it.paths.includes(_motiv)) return false;
    if (it.id === 'sunnah_jejune' && _day !== 1 && _day !== 4) return false;
    return true;
  };
  var items = [];
  [2,3].forEach(function(i) {
    var lvl = LEVELS[i]; if (!lvl || !lvl.sections) return;
    lvl.sections.forEach(function(s) { (s.items || []).forEach(function(it) { if (_ok(it)) items.push(it); }); });
  });
  [0,1].forEach(function(i) {
    var lvl = LEVELS[i]; if (!lvl || !lvl.sections) return;
    lvl.sections.forEach(function(s) { (s.items || []).forEach(function(it) { if (it.filDuJour && _ok(it)) items.push(it); }); });
  });
  return items;
}
window.getFilJourItems = getFilJourItems;
```

---

### 2. Dans `openVueAuFilDuJour` — remplacer le bloc de sélection
REMPLACER exactement :
```js
  var _motiv = getEffectiveMotiv();
  const items = [];
  if (Array.isArray(LEVELS)) {
    var _dayOfWeek = new Date().getDay();
    [2,3].forEach(i => {
      const lvl = LEVELS[i];
      if (!lvl || !lvl.sections) return;
      lvl.sections.forEach(s => {
        (s.items || []).forEach(it => {
          if (_motiv && it.paths && !it.paths.includes(_motiv)) return;
          if (it.id === 'sunnah_jejune' && _dayOfWeek !== 1 && _dayOfWeek !== 4) return;
          items.push(it);
        });
      });
    });
  }
  [0,1].forEach(i => {
    var lvl = LEVELS[i];
    if (!lvl || !lvl.sections) return;
    lvl.sections.forEach(s => {
      (s.items || []).forEach(it => {
        if (!it.filDuJour) return;
        if (_motiv && it.paths && !it.paths.includes(_motiv)) return;
        if (it.id === 'sunnah_jejune' && _dayOfWeek !== 1 && _dayOfWeek !== 4) return;
        items.push(it);
      });
    });
  });
```
PAR :
```js
  const items = getFilJourItems();
```

---

### 3. Dans `getFilJourCardHTML` — remplacer le bloc de comptage
REMPLACER exactement :
```js
  const state = safeParseJSON('spiritual_v2', {});
  var _motivF = getEffectiveMotiv();
  var _passPath = function(it) { return !_motivF || !it.paths || it.paths.includes(_motivF); };
  let done = 0, total = 0;
  if (Array.isArray(LEVELS)) {
    [2,3].forEach(i => {
      const lvl = LEVELS[i];
      if (!lvl || !lvl.sections) return;
      lvl.sections.forEach(s => {
        (s.items || []).forEach(it => {
          if (!_passPath(it)) return;
          total++; if (state[it.id]) done++;
        });
      });
    });
    [0,1].forEach(i => {
      var lvl = LEVELS[i];
      if (!lvl || !lvl.sections) return;
      lvl.sections.forEach(s => {
        (s.items || []).forEach(it => {
          if (!it.filDuJour || !_passPath(it)) return;
          total++; if (state[it.id]) done++;
        });
      });
    });
  }
```
PAR :
```js
  const state = safeParseJSON('spiritual_v2', {});
  let done = 0;
  getFilJourItems().forEach(function(it) { if (state[it.id]) done++; });
```

---

## Vérif attendue
- L'écran « Au fil du jour » affiche exactement les mêmes items, mêmes catégories, même ordre.
- La carte d'accueil affiche le même message (basé sur `done`).
- `node --check script.js` OK.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "refactor(filjour): regle Au fil du jour centralisee (getFilJourItems), aucun changement visible"
```
