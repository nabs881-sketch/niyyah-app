const fs = require('fs');
const https = require('https');

const WORKER_URL = 'https://niyyah-api.nabs881.workers.dev/api/verify';
const prevAudit = JSON.parse(fs.readFileSync('AUDIT_NIVEAU2.json', 'utf8'));
const samplingData = JSON.parse(fs.readFileSync('SAMPLING_AUDIT_FULL.json', 'utf8'));

const douteEntries = prevAudit.results.filter(r => r.verdict === 'DOUTE');
console.log('DOUTE entries to retry:', douteEntries.length);

const results = [];
let processed = 0;

function postJSON(url, data) {
  return new Promise((resolve) => {
    const body = JSON.stringify(data);
    const parsed = new URL(url);
    const req = https.request({
      hostname: parsed.hostname, path: parsed.pathname, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'Origin': 'https://nabs881-sketch.github.io' }
    }, res => {
      let buf = '';
      res.on('data', chunk => buf += chunk);
      res.on('end', () => { try { resolve(JSON.parse(buf)); } catch (e) { resolve({ error: 'parse_error', raw: buf.substring(0, 300) }); } });
    });
    req.on('error', e => resolve({ error: e.message }));
    req.setTimeout(30000, () => { req.destroy(); resolve({ error: 'timeout' }); });
    req.write(body); req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function findOriginalEntry(section, entryId) {
  const pool = samplingData[section];
  if (!pool) return null;
  return pool.find(e => (e.question_id || e.num || e.jour) == entryId) || null;
}

function deepText(obj) {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(deepText).join(' ');
  if (obj && typeof obj === 'object') return Object.values(obj).map(deepText).join(' ');
  return '';
}

function extractSources(entry) {
  if (!entry) return '';
  const parts = [];
  function walk(obj, key) {
    if (typeof obj === 'string' && /source|ref|degre|auth/i.test(key || '')) { parts.push(obj); return; }
    if (Array.isArray(obj)) { obj.forEach(v => walk(v, key)); return; }
    if (obj && typeof obj === 'object') { Object.keys(obj).forEach(k => walk(obj[k], k)); }
  }
  walk(entry, '');
  return parts.join(' | ') || 'non specifie';
}

async function run() {
  const startTime = Date.now();
  for (let i = 0; i < douteEntries.length; i++) {
    const entry = douteEntries[i];
    processed++;
    process.stdout.write('\r[' + processed + '/' + douteEntries.length + '] ' + entry.section + ' #' + entry.entry_id);

    const original = findOriginalEntry(entry.section, entry.entry_id);
    const texte = deepText(original).substring(0, 2000);
    const sources = extractSources(original);

    if (!texte || texte.length < 20) {
      results.push({ section: entry.section, entry_id: entry.entry_id, verdict: 'SKIP', notes: 'texte trop court', details: [] });
      continue;
    }

    await sleep(1000);
    const resp = await postJSON(WORKER_URL, { texte, sources, section: entry.section, entry_id: String(entry.entry_id) });

    if (resp.error) {
      results.push({ section: entry.section, entry_id: entry.entry_id, verdict: 'API_ERROR', notes: resp.error, details: [] });
    } else {
      results.push({ section: entry.section, entry_id: entry.entry_id, verdict: resp.verdict || 'UNKNOWN', notes: resp.notes || '', details: resp.details || [] });
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log('\n\nDone in ' + elapsed + 's');

  const summary = { OK: 0, DOUTE: 0, ERREUR: 0, PARSE_ERROR: 0, SKIP: 0, API_ERROR: 0 };
  results.forEach(r => { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log('Summary:', JSON.stringify(summary));

  const bySection = {};
  results.forEach(r => {
    if (!bySection[r.section]) bySection[r.section] = { OK: 0, DOUTE: 0, ERREUR: 0, PARSE_ERROR: 0, t: 0 };
    bySection[r.section][r.verdict] = (bySection[r.section][r.verdict] || 0) + 1;
    bySection[r.section].t++;
  });
  console.log('\nPar section:');
  Object.keys(bySection).forEach(s => {
    const x = bySection[s];
    console.log('  ' + s + ' (' + x.t + ') OK:' + (x.OK||0) + ' DOUTE:' + (x.DOUTE||0) + ' ERREUR:' + (x.ERREUR||0) + ' PARSE:' + (x.PARSE_ERROR||0));
  });

  const issues = results.filter(r => r.verdict === 'ERREUR' || r.verdict === 'DOUTE');
  if (issues.length > 0) {
    console.log('\nIssues (' + issues.length + '):');
    issues.forEach(r => console.log('  [' + r.verdict + '] ' + r.section + '/' + r.entry_id + ' — ' + r.notes));
  }

  fs.writeFileSync('AUDIT_NIVEAU2_RETRY.json', JSON.stringify({ summary, elapsed_seconds: elapsed, timestamp: new Date().toISOString(), total: results.length, results }, null, 2));
  console.log('\nAUDIT_NIVEAU2_RETRY.json written (' + results.length + ' entries)');
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
