const fs = require('fs');
const https = require('https');

const WORKER_URL = 'https://niyyah-api.nabs881.workers.dev/api/verify';

// Load ALL files
const allData = {};
function loadJSON(key, file) { allData[key] = JSON.parse(fs.readFileSync(file, 'utf8')); }
loadJSON('hadiths', 'hadiths_jour.json');
loadJSON('duaas', 'duaas.json');
loadJSON('savais_tu', 'savais_tu.json');
loadJSON('compagnons', 'compagnons.json');
loadJSON('prophetes', 'prophetes.json');
loadJSON('fiqh', 'fiqh_jour.json');
var sira = JSON.parse(fs.readFileSync('data/sira.min.json', 'utf8'));
allData.sira = sira.rdv;
loadJSON('recits_coran', 'data/recits-coran.json');
loadJSON('tafakkur_recits', 'data/waqt/tafakkur_recits.json');

// Build flat list of entries with refs
const QURAN_RE = /(\d{1,3})\s*[:]\s*(\d{1,3})/g;
const HADITH_RE = /(?:bukh[aā]r[iī]|muslim|tirmidh[iī])\s*(?:n[°o.]?\s*)?\d+/gi;

function hasRefs(text) {
  if (!text) return false;
  QURAN_RE.lastIndex = 0; HADITH_RE.lastIndex = 0;
  return QURAN_RE.test(text) || HADITH_RE.test(text);
}

function deepText(obj) {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(deepText).join(' ');
  if (obj && typeof obj === 'object') return Object.values(obj).map(deepText).join(' ');
  return '';
}

function extractSources(entry) {
  var parts = [];
  function walk(obj, key) {
    if (typeof obj === 'string' && /source|ref|degre|auth/i.test(key || '')) { parts.push(obj); return; }
    if (Array.isArray(obj)) { obj.forEach(function(v) { walk(v, key); }); return; }
    if (obj && typeof obj === 'object') { Object.keys(obj).forEach(function(k) { walk(obj[k], k); }); }
  }
  walk(entry, '');
  return parts.join(' | ') || 'non specifie';
}

var entries = [];
Object.keys(allData).forEach(function(section) {
  allData[section].forEach(function(e, i) {
    var text = deepText(e);
    if (hasRefs(text)) {
      entries.push({ section: section, entry_id: e.question_id || e.num || e.jour || i, text: text.substring(0, 2000), sources: extractSources(e) });
    }
  });
});
console.log('Entries with refs:', entries.length);

const results = [];
let processed = 0;

function postJSON(url, data) {
  return new Promise(function(resolve) {
    var body = JSON.stringify(data);
    var parsed = new URL(url);
    var req = https.request({ hostname: parsed.hostname, path: parsed.pathname, method: 'POST', headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), 'Origin': 'https://nabs881-sketch.github.io' } }, function(res) {
      var buf = '';
      res.on('data', function(c) { buf += c; });
      res.on('end', function() { try { resolve(JSON.parse(buf)); } catch (e) { resolve({ error: 'parse_error' }); } });
    });
    req.on('error', function(e) { resolve({ error: e.message }); });
    req.setTimeout(30000, function() { req.destroy(); resolve({ error: 'timeout' }); });
    req.write(body); req.end();
  });
}

function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

async function run() {
  var start = Date.now();
  for (var i = 0; i < entries.length; i++) {
    var e = entries[i];
    processed++;
    if (processed % 10 === 0 || processed === entries.length) process.stdout.write('\r[' + processed + '/' + entries.length + '] ' + e.section);
    await sleep(1000);
    var resp = await postJSON(WORKER_URL, { texte: e.text, sources: e.sources, section: e.section, entry_id: String(e.entry_id) });
    if (resp.error) {
      results.push({ section: e.section, entry_id: e.entry_id, verdict: 'API_ERROR', notes: resp.error, details: [] });
    } else {
      results.push({ section: e.section, entry_id: e.entry_id, verdict: resp.verdict || 'UNKNOWN', notes: resp.notes || '', details: resp.details || [] });
    }
  }
  var elapsed = Math.round((Date.now() - start) / 1000);
  console.log('\n\nDone in ' + elapsed + 's (' + Math.round(elapsed / 60) + 'min)');

  var summary = { OK: 0, DOUTE: 0, ERREUR: 0, PARSE_ERROR: 0, API_ERROR: 0 };
  results.forEach(function(r) { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log('Summary:', JSON.stringify(summary));

  var bySection = {};
  results.forEach(function(r) {
    if (!bySection[r.section]) bySection[r.section] = { OK: 0, DOUTE: 0, ERREUR: 0, t: 0 };
    bySection[r.section][r.verdict] = (bySection[r.section][r.verdict] || 0) + 1;
    bySection[r.section].t++;
  });
  console.log('\nPar section:');
  Object.keys(bySection).forEach(function(s) {
    var x = bySection[s];
    console.log('  ' + s + ' (' + x.t + ') OK:' + (x.OK || 0) + ' DOUTE:' + (x.DOUTE || 0) + ' ERREUR:' + (x.ERREUR || 0));
  });

  var issues = results.filter(function(r) { return r.verdict === 'ERREUR' || r.verdict === 'DOUTE'; });
  if (issues.length > 0) {
    console.log('\nIssues (' + issues.length + '):');
    issues.slice(0, 30).forEach(function(r) { console.log('  [' + r.verdict + '] ' + r.section + '/' + r.entry_id + ' — ' + r.notes); });
    if (issues.length > 30) console.log('  ... +' + (issues.length - 30) + ' autres');
  }

  fs.writeFileSync('AUDIT_SONNET.json', JSON.stringify({ summary: summary, elapsed_seconds: elapsed, timestamp: new Date().toISOString(), total: results.length, results: results }, null, 2));
  console.log('\nAUDIT_SONNET.json written (' + results.length + ' entries)');
}

run().catch(function(e) { console.error('Fatal:', e); process.exit(1); });
