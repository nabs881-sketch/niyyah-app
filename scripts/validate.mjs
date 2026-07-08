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

// ── Quiz lots ──────────────────────────────────────────────────────────────
try {
  const QUIZ_FIELDS = ['id','question','choix','reponse','theme','source','difficulte','jour'];
  const LETTERS = ['A','B','C','D'];
  let quizTotal = 0, quizErrors = 0;
  for (let i = 1; i <= 30; i++) {
    const lotFile = `data/waqt/quiz/quiz_lot_${String(i).padStart(2,'0')}.json`;
    try {
      const lot = readJSON(lotFile);
      if (!Array.isArray(lot)) { fail(`Quiz ${lotFile}: pas un tableau`); quizErrors++; continue; }
      lot.forEach((q, idx) => {
        const missing = QUIZ_FIELDS.filter(f => !(f in q));
        if (missing.length) { fail(`Quiz ${lotFile}[${idx}] (${q.id||'?'}): champs manquants → ${missing.join(',')}`); quizErrors++; }
        if (!Array.isArray(q.choix) || q.choix.length !== 4) { fail(`Quiz ${lotFile}[${idx}] (${q.id||'?'}): "choix" doit avoir 4 éléments`); quizErrors++; }
        if (q.reponse && !LETTERS.includes(q.reponse)) { fail(`Quiz ${lotFile}[${idx}] (${q.id||'?'}): "reponse" invalide → "${q.reponse}"`); quizErrors++; }
      });
      quizTotal += lot.length;
    } catch(e) { fail(`Quiz ${lotFile}: ${e.message}`); quizErrors++; }
  }
  info(`Quiz: 30 lots, ${quizTotal} questions, ${quizErrors} erreur(s) de schéma`);
} catch(e) { fail(`Quiz (global): ${e.message}`); }

// ── Tawhid capsules ─────────────────────────────────────────────────────────
try {
  const TAWHID_FIELDS = ['id','num','pilier','titre','corps','phrase','ref','note'];
  const tc = readJSON('tawhid_capsules.json');
  if (!Array.isArray(tc)) { fail('Tawhid: pas un tableau'); }
  else {
    const missing = tc.filter(c => TAWHID_FIELDS.some(f => !(f in c)));
    if (missing.length) fail(`Tawhid: ${missing.length} objet(s) avec champs manquants (ex: num ${missing[0].num||'?'})`);
    const nums = tc.map(c => c.num).filter(n => typeof n === 'number');
    const dupNums = nums.filter((n, i) => nums.indexOf(n) !== i);
    if (dupNums.length) fail(`Tawhid: num en doublon → ${[...new Set(dupNums)].join(',')}`);
    const sorted = [...nums].sort((a,b) => a-b);
    const gaps = [];
    for (let i = 1; i < sorted.length; i++) { if (sorted[i] - sorted[i-1] > 1) gaps.push(`${sorted[i-1]+1}…${sorted[i]-1}`); }
    if (gaps.length) fail(`Tawhid: trou(s) dans la numérotation → ${gaps.join(', ')}`);
    info(`Tawhid: ${tc.length} capsules, ${dupNums.length} doublon(s), ${gaps.length} trou(s) de numérotation`);
  }
} catch(e) { fail(`Tawhid illisible: ${e.message}`); }

// ── Coffrets & Cures — JSON valide uniquement ───────────────────────────────
try {
  const COFFRETS = ['coffret-anxiete','coffret-colere','coffret-regard','coffret-arrogance','coffret-paresse','coffret-medisance'];
  const CURES    = ['cure-anxiete-cycle1','cure-colere-cycle1','cure-regard-cycle1','cure-arrogance-cycle1','cure-paresse-cycle1','cure-medisance-cycle1'];
  let coffretOk = 0, cureOk = 0;
  for (const name of COFFRETS) { try { readJSON(`${name}.json`); coffretOk++; } catch(e) { fail(`Coffret ${name}.json: ${e.message}`); } }
  for (const name of CURES)    { try { readJSON(`${name}.json`);    cureOk++; } catch(e) { fail(`Cure ${name}.json: ${e.message}`); } }
  info(`Coffrets: ${coffretOk}/6 valides | Cures: ${cureOk}/6 valides`);
} catch(e) { fail(`Coffrets/Cures (global): ${e.message}`); }

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
