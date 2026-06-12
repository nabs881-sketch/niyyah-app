#!/usr/bin/env node
// Filet de sécurité Niyyah — contrôles d'intégrité du contenu.
// Lancé par `npm test` et au début de build.sh. Bloque si un invariant casse.
import fs from 'fs';
import path from 'path';

let errors = [];
let infos = [];
const fail = m => errors.push(m);
const info = m => infos.push(m);

function readJSON(p) {
  const raw = fs.readFileSync(p, 'utf8');
  return JSON.parse(raw);
}

const SKIP = new Set(['package.json','package-lock.json','backend-package.json','manifest.json','capacitor.config.json']);
function walk(dir) {
  let out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) out = out.concat(walk(full));
    else if (e.name.endsWith('.json') && !SKIP.has(e.name)) out.push(full);
  }
  return out;
}
const jsonFiles = walk('.');
let parsed = 0;
for (const f of jsonFiles) {
  try { readJSON(f); parsed++; }
  catch (e) { fail(`JSON cassé: ${f} → ${e.message}`); }
}
info(`${parsed}/${jsonFiles.length} fichiers JSON valides`);

try {
  const sira = readJSON('data/sira.min.json');
  const rdv = sira.rdv || [];
  if (rdv.length !== 365) fail(`Sîra: ${rdv.length} RDV au lieu de 365`);
  const nums = rdv.map(r => r.num);
  const gaps = [];
  for (let i = 1; i <= 365; i++) if (!nums.includes(i)) gaps.push(i);
  if (gaps.length) fail(`Sîra: RDV manquants → ${gaps.slice(0,10).join(',')}${gaps.length>10?'…':''}`);
  const dup = nums.filter((n, i) => nums.indexOf(n) !== i);
  if (dup.length) fail(`Sîra: num en doublon → ${[...new Set(dup)].join(',')}`);
  info(`Sîra: ${rdv.length} RDV, ${gaps.length} trou(s), ${dup.length} doublon(s)`);
} catch (e) { fail(`Sîra illisible: ${e.message}`); }

try {
  const du = readJSON('duaas.json');
  const items = du.items || [];
  const noSrc = items.filter(x => !x.source || !String(x.source).trim());
  if (noSrc.length) fail(`Du'âs sans source: ${noSrc.length} (ex: ${noSrc[0].id})`);
  const ids = items.map(x => x.id);
  const dupId = ids.filter((v, i) => ids.indexOf(v) !== i);
  if (dupId.length) fail(`Du'âs: id en doublon → ${[...new Set(dupId)].join(',')}`);
  info(`Du'âs: ${items.length} items, ${noSrc.length} sans source, ${dupId.length} id dupliqué(s)`);
} catch (e) { fail(`Du'âs illisibles: ${e.message}`); }

try {
  const h = readJSON('hadiths_jour.json');
  const noSrc = h.filter(x => !x.source || !String(x.source).trim());
  if (noSrc.length) fail(`Hadiths sans source: ${noSrc.length}`);
  info(`Hadiths: ${h.length} items, ${noSrc.length} sans source`);
} catch (e) { fail(`Hadiths illisibles: ${e.message}`); }

try {
  const sw = fs.readFileSync('sw.js', 'utf8');
  const m = sw.match(/niyyah-v(\d+)/);
  if (!m) fail(`sw.js: version "niyyah-vN" introuvable`);
  else info(`SW version: niyyah-v${m[1]}`);
} catch (e) { fail(`sw.js illisible: ${e.message}`); }

try {
  let imamCount = 0;
  for (const f of jsonFiles) {
    const raw = fs.readFileSync(f, 'utf8');
    imamCount += (raw.match(/à confirmer par l'imam/gi) || []).length;
  }
  info(`Marqueurs "à confirmer par l'imam": ${imamCount}`);
} catch (e) {}

console.log('\n──────── VALIDATION NIYYAH ────────');
for (const i of infos) console.log('  ✓ ' + i);
if (errors.length) {
  console.log('\n  ✗ ' + errors.length + ' ERREUR(S):');
  for (const e of errors) console.log('    • ' + e);
  console.log('\n❌ BUILD BLOQUÉ — corrige avant de commit.\n');
  process.exit(1);
}
console.log('\n✅ Intégrité OK.\n');
