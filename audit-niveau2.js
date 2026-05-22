const fs = require('fs');
const https = require('https');

const WORKER_URL = 'https://niyyah-api.nabs881.workers.dev/api/verify';
const auditData = JSON.parse(fs.readFileSync('AUDIT_RESULTS_HADITH.json', 'utf8'));
const samplingData = JSON.parse(fs.readFileSync('SAMPLING_AUDIT_FULL.json', 'utf8'));

// Only process OK entries (those with verified refs)
const okEntries = auditData.results.filter(r => r.verdict === 'OK');
console.log('Entries OK to verify:', okEntries.length);

const results = [];
let processed = 0;

function postJSON(url, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Origin': 'https://nabs881-sketch.github.io'
      }
    };
    const req = https.request(options, res => {
      let buf = '';
      res.on('data', chunk => buf += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(buf)); }
        catch (e) { resolve({ error: 'parse_error', raw: buf.substring(0, 300) }); }
      });
    });
    req.on('error', e => resolve({ error: e.message }));
    req.setTimeout(30000, () => { req.destroy(); resolve({ error: 'timeout' }); });
    req.write(body);
    req.end();
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

function findOriginalEntry(section, entryId) {
  const pool = samplingData[section];
  if (!pool) return null;
  return pool.find(e =>
    (e.question_id || e.num || e.jour) == entryId
  ) || null;
}

function extractFullText(entry) {
  if (!entry) return '';
  let text = '';
  function walk(obj) {
    if (typeof obj === 'string') { text += obj + ' '; return; }
    if (Array.isArray(obj)) { obj.forEach(walk); return; }
    if (obj && typeof obj === 'object') { Object.values(obj).forEach(walk); }
  }
  walk(entry);
  return text.substring(0, 2000);
}

function extractSources(entry) {
  if (!entry) return '';
  const parts = [];
  function walk(obj, key) {
    if (!obj) return;
    if (typeof obj === 'string' && /source|ref|degre|auth/i.test(key || '')) { parts.push(obj); return; }
    if (Array.isArray(obj)) { obj.forEach((v, i) => walk(v, key)); return; }
    if (typeof obj === 'object') { Object.keys(obj).forEach(k => walk(obj[k], k)); }
  }
  walk(entry, '');
  return parts.join(' | ') || 'non specifie';
}

async function run() {
  const startTime = Date.now();

  for (let i = 0; i < okEntries.length; i++) {
    const entry = okEntries[i];
    processed++;
    process.stdout.write('\r[' + processed + '/' + okEntries.length + '] ' + entry.section + ' #' + entry.entry_id);

    const original = findOriginalEntry(entry.section, entry.entry_id);
    const texte = extractFullText(original);
    const sources = extractSources(original);

    if (!texte || texte.length < 20) {
      results.push({ section: entry.section, entry_id: entry.entry_id, verdict: 'SKIP', notes: 'texte trop court', details: [] });
      continue;
    }

    await sleep(1000);
    const resp = await postJSON(WORKER_URL, {
      texte: texte,
      sources: sources,
      section: entry.section,
      entry_id: String(entry.entry_id)
    });

    if (resp.error) {
      results.push({ section: entry.section, entry_id: entry.entry_id, verdict: 'API_ERROR', notes: resp.error, details: [] });
    } else {
      results.push({
        section: entry.section,
        entry_id: entry.entry_id,
        verdict: resp.verdict || 'UNKNOWN',
        notes: resp.notes || '',
        details: resp.details || []
      });
    }
  }

  const elapsed = Math.round((Date.now() - startTime) / 1000);
  console.log('\n\nDone in ' + elapsed + 's');

  // Summary
  const summary = { OK: 0, DOUTE: 0, ERREUR: 0, SKIP: 0, API_ERROR: 0, UNKNOWN: 0 };
  results.forEach(r => { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log('Summary:', JSON.stringify(summary));

  // Par section
  const bySection = {};
  results.forEach(r => {
    if (!bySection[r.section]) bySection[r.section] = { OK: 0, DOUTE: 0, ERREUR: 0, total: 0 };
    bySection[r.section][r.verdict] = (bySection[r.section][r.verdict] || 0) + 1;
    bySection[r.section].total++;
  });
  console.log('\nPar section:');
  Object.keys(bySection).forEach(s => {
    const x = bySection[s];
    console.log('  ' + s + ' (' + x.total + ') OK:' + (x.OK||0) + ' DOUTE:' + (x.DOUTE||0) + ' ERREUR:' + (x.ERREUR||0));
  });

  // Erreurs et doutes
  const issues = results.filter(r => r.verdict === 'ERREUR' || r.verdict === 'DOUTE');
  if (issues.length > 0) {
    console.log('\nIssues (' + issues.length + '):');
    issues.forEach(r => console.log('  [' + r.verdict + '] ' + r.section + '/' + r.entry_id + ' — ' + r.notes));
  }

  const output = { summary, elapsed_seconds: elapsed, timestamp: new Date().toISOString(), total: results.length, results };
  fs.writeFileSync('AUDIT_NIVEAU2.json', JSON.stringify(output, null, 2));
  console.log('\nAUDIT_NIVEAU2.json written (' + results.length + ' entries)');
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
