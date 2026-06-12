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
