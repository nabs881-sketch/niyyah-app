# SPEC — Fix _isDone() pour type 'wird' + exclusion items optional

## Contexte
Dans `updateSanctuaireMoment()`, la fonction `_isDone()` ne reconnaît pas
correctement les items de type `'wird'` (ex: wird_matin, wird_soir).
Elle lit `state[item.id]` qui n'est jamais écrit, alors que l'état réel
est stocké dans `wirdState` (via `saveWirdState()`).

Résultat : même si l'utilisateur a coché tous les items du Wird, le bouton
"Continuer / Bismillah" reste affiché car `blockRemaining` ne descend
jamais à 0.

## Fix 1 — Remplacer `_isDone()`

Dans `script.js`, trouver la fonction `_isDone(item)` à l'intérieur de
`updateSanctuaireMoment()` (autour de la ligne 16294). Elle ressemble à :

```js
function _isDone(item) {
  if (item.id === 'wird_soir') {
    return state['w_tasbih_100_s'] >= 100 || ...
        || !!state['wird_soir'];
  }
  return item.type === 'counter'
    ? ((state[item.id] || 0) >= item.target || state[item.id] === true)
    : !!state[item.id];
}
```

La remplacer intégralement par :

```js
function _isDone(item) {
  if (item.type === 'wird') {
    try {
      var _wSess = WIRD_DATA[item.session];
      if (_wSess && _wSess.items.every(function(wi) { return !!wirdState[wi.id]; })) return true;
    } catch(e) {}
    return !!state[item.id];
  }
  if (item.id === 'wird_soir') {
    return state['w_tasbih_100_s'] >= 100 || state['w_tasbih_100_s'] === true
      || state['w_tahlil_100_s'] >= 100 || state['w_tahlil_100_s'] === true
      || state['w_salawat_s'] >= 10  || state['w_salawat_s'] === true
      || !!state['wird_soir'];
  }
  return item.type === 'counter'
    ? ((state[item.id] || 0) >= item.target || state[item.id] === true)
    : !!state[item.id];
}
```

## Fix 2 — Exclure les items `optional: true` de `blockItems`

Toujours dans `updateSanctuaireMoment()`, trouver la ligne qui calcule
`blockItems` (déjà modifiée précédemment pour exclure `quiz_jour`) :

```js
var blockItems = _allUnlocked.filter(function(item) { if (item.id === 'quiz_jour') return false; return Array.isArray(item.block) ? item.block.includes(blockId) : item.block === blockId; });
```

La remplacer par (ajout de l'exclusion `item.optional`) :

```js
var blockItems = _allUnlocked.filter(function(item) {
  if (item.id === 'quiz_jour') return false;
  if (item.optional) return false;
  return Array.isArray(item.block) ? item.block.includes(blockId) : item.block === blockId;
});
```

## Build & commit

```bash
npm run build
git add -A && git commit -m "fix: isDone reconnait type wird via wirdState, exclut items optional"
git rm SPEC-FIX-ISDONE-WIRD.md
git commit -m "chore: remove applied spec"
git push
```
