# SPEC-TESTS-SCORING

## But
Tier 2 du filet de test : verrouiller les **3 fonctions de scoring** (`getWeight`,
`isItemDone`, `getWeightedScore`, `getCalcLvlPct`) qui pilotent le % du jour, les
déblocages de niveaux et les streaks. Si la formule change par accident, le build est bloqué.

**Important** : ce test ne MODIFIE PAS `script.js`. Il lit le code réel des fonctions
directement dans `script.js` et le vérifie en bac à sable → zéro risque de casse, zéro dérive.
Déjà testé : 6/6 vert sur ton code, et il attrape une régression de formule.

3 actions : créer le fichier de test, l'ajouter à `npm test`, le brancher dans `build.sh`.

---

## 1. Créer `scripts/scoring.test.mjs`

Créer `scripts/scoring.test.mjs` avec EXACTEMENT ce contenu :

```js
// Tier 2 — Tests du scoring (Niyyah).
// Ne MODIFIE PAS script.js : extrait le code réel des fonctions de scoring
// et le vérifie dans un bac à sable. Si la formule change un jour, le test le voit.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const SRC = fs.readFileSync(new URL('../script.js', import.meta.url), 'utf8');

function extractFunction(src, name) {
  const start = src.indexOf('function ' + name + '(');
  if (start === -1) throw new Error('Fonction introuvable: ' + name);
  const braceOpen = src.indexOf('{', start);
  let depth = 0, i = braceOpen;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { i++; break; } }
  }
  return src.slice(start, i);
}
function extractConstObject(src, name) {
  const start = src.indexOf('const ' + name + ' = {');
  if (start === -1) throw new Error('Const introuvable: ' + name);
  const braceOpen = src.indexOf('{', start);
  let depth = 0, i = braceOpen;
  for (; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') { depth--; if (depth === 0) { i++; break; } }
  }
  let end = src.indexOf(';', i);
  return src.slice(start, end + 1);
}

function makeSandbox(overrides = {}) {
  const sandbox = {
    WIRD_DATA: overrides.WIRD_DATA || {},
    wirdState: overrides.wirdState || {},
    LEVELS: overrides.LEVELS || [],
    _itemMatchesProfile: overrides._itemMatchesProfile || (() => true),
    Math, console,
  };
  const code =
    extractConstObject(SRC, 'ITEM_WEIGHTS') + '\n' +
    extractFunction(SRC, 'getWeight') + '\n' +
    extractFunction(SRC, 'isItemDone') + '\n' +
    extractFunction(SRC, 'getWeightedScore') + '\n' +
    extractFunction(SRC, 'getCalcLvlPct') + '\n' +
    'this.getWeight=getWeight;this.isItemDone=isItemDone;this.getWeightedScore=getWeightedScore;this.getCalcLvlPct=getCalcLvlPct;this.ITEM_WEIGHTS=ITEM_WEIGHTS;';
  vm.createContext(sandbox);
  vm.runInContext(code, sandbox);
  return sandbox;
}

test('getWeight: fard ×3, sunnah/wird ×2, inconnu ×1', () => {
  const S = makeSandbox();
  assert.equal(S.getWeight('fajr'), 3);
  assert.equal(S.getWeight('wird_matin'), 2);
  assert.equal(S.getWeight('ayat_kursi'), 2);
  assert.equal(S.getWeight('un_truc_inconnu'), 1);
});

test('isItemDone: booléen, compteur, wird', () => {
  const S = makeSandbox({
    WIRD_DATA: { matin: { items: [{ id: 'a' }, { id: 'b' }] } },
    wirdState: { a: true, b: true },
  });
  assert.equal(S.isItemDone({ id: 'x' }, { x: true }), true);
  assert.equal(S.isItemDone({ id: 'x' }, {}), false);
  assert.equal(S.isItemDone({ id: 'c', type: 'counter', target: 33 }, { c: 33 }), true);
  assert.equal(S.isItemDone({ id: 'c', type: 'counter', target: 33 }, { c: 10 }), false);
  assert.equal(S.isItemDone({ id: 'w', type: 'wird', session: 'matin' }, {}), true);
});

test('isItemDone: wird incomplet = non fait', () => {
  const S = makeSandbox({
    WIRD_DATA: { matin: { items: [{ id: 'a' }, { id: 'b' }] } },
    wirdState: { a: true },
  });
  assert.equal(S.isItemDone({ id: 'w', type: 'wird', session: 'matin' }, {}), false);
});

test('getWeightedScore: pondération correcte', () => {
  const S = makeSandbox();
  const items = [{ id: 'fajr' }, { id: 'wird_matin' }, { id: 'autre' }];
  assert.equal(S.getWeightedScore(items, {}), 0);
  assert.equal(S.getWeightedScore(items, { fajr: true }), 50);
  assert.equal(S.getWeightedScore(items, { fajr: true, wird_matin: true, autre: true }), 100);
});

test('getWeightedScore: liste vide = 0 (pas de division par zéro)', () => {
  const S = makeSandbox();
  assert.equal(S.getWeightedScore([], {}), 0);
});

test('getCalcLvlPct: base requis + bonus optionnels, plafond 120', () => {
  const LEVELS = [{
    id: 1,
    sections: [{
      items: [
        { id: 'fajr' },
        { id: 'dhuhr' },
        { id: 'wird_matin', optional: true },
      ],
    }],
  }];
  const S = makeSandbox({ LEVELS });
  assert.equal(S.getCalcLvlPct(1, { fajr: true, dhuhr: true }), 100);
  assert.equal(S.getCalcLvlPct(1, {}), 0);
  assert.equal(S.getCalcLvlPct(1, { fajr: true, dhuhr: true, wird_matin: true }), 120);
  assert.equal(S.getCalcLvlPct(1, { fajr: true }), 50);
});
```

---

## 2. Mettre à jour `package.json`

Remplacer la valeur du script `"test"` par (enchaîne validate + scoring) :

```json
"test": "node scripts/validate.mjs && node --test scripts/scoring.test.mjs"
```

---

## 3. Brancher dans `build.sh`

Dans `build.sh`, juste **après** la ligne existante `node scripts/validate.mjs`, ajouter :

```bash
echo "▸ Tests du scoring..."
node --test scripts/scoring.test.mjs
```

`set -e` bloque le build si un test échoue.

---

## Vérif attendue
```
npm test
```
Doit afficher la validation verte PUIS « # pass 6 / # fail 0 ».

Test négatif : change un chiffre dans `getWeightedScore` (ex. `* 100` → `* 90`),
relance `npm test` → doit afficher au moins 1 `fail`. Puis annule la modif.

> Note : si un jour le test affiche « Fonction introuvable: … », c'est qu'une des
> fonctions de scoring a été renommée dans script.js → ping-moi, j'ajuste le test (2 min).

## Commit (outillage, pas d'asset client → pas de minif nécessaire)
```
git add -A
git commit -m "test: Tier 2 verrou scoring (poids, isItemDone, score jour, pct niveau)"
git push
```
