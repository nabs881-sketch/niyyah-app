const fs = require('fs');
const https = require('https');

const data = JSON.parse(fs.readFileSync('SAMPLING_AUDIT_FULL.json', 'utf8'));
const results = [];
let total = 0;
Object.keys(data).forEach(k => { total += data[k].length; });
let processed = 0;

// Regex pour extraire les references coraniques
const QURAN_RE = /(\d{1,3})\s*[:]\s*(\d{1,3})/g;
const QURAN_NAME_RE = /(?:sourate|coran|surah)\s+[^\d]*?(\d{1,3})\s*[:]\s*(\d{1,3})/gi;
const BUKHARI_RE = /bukh[aā]r[iī]\s*(?:n[°o.]?\s*)?(\d+)/gi;
const MUSLIM_RE = /muslim\s*(?:n[°o.]?\s*)?(\d+)/gi;
const TIRMIDHI_RE = /tirmidh[iī]\s*(?:n[°o.]?\s*)?(\d+)/gi;

function extractRefs(text) {
  if (!text) return { quran: [], hadith: [] };
  var quran = [];
  var hadith = [];
  var m;
  // Coran refs
  var combined = text;
  while ((m = QURAN_RE.exec(combined)) !== null) {
    var s = parseInt(m[1]), v = parseInt(m[2]);
    if (s >= 1 && s <= 114 && v >= 1 && v <= 300) {
      quran.push(s + ':' + v);
    }
  }
  // Hadith refs
  while ((m = BUKHARI_RE.exec(text)) !== null) hadith.push('Bukhari ' + m[1]);
  while ((m = MUSLIM_RE.exec(text)) !== null) hadith.push('Muslim ' + m[1]);
  while ((m = TIRMIDHI_RE.exec(text)) !== null) hadith.push('Tirmidhi ' + m[1]);
  return { quran: [...new Set(quran)], hadith: [...new Set(hadith)] };
}

function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'NiyyahAudit/1.0' } }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try { resolve(JSON.parse(body)); }
        catch (e) { resolve({ error: 'parse_error', raw: body.substring(0, 200) }); }
      });
    }).on('error', e => resolve({ error: e.message }));
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkQuranRef(ref) {
  var url = 'https://api.alquran.cloud/v1/ayah/' + ref + '/editions/fr.hamidullah';
  var res = await fetchJSON(url);
  if (res.code === 200 && res.data && res.data[0]) {
    return { ok: true, text: res.data[0].text.substring(0, 120), surah: res.data[0].surah ? res.data[0].surah.englishName : '' };
  }
  return { ok: false, error: res.error || 'not_found' };
}

const HADITH_COLLECTIONS = {
  'Bukhari': 'eng-bukhari',
  'Muslim': 'eng-muslim',
  'Tirmidhi': 'eng-tirmidhi'
};

async function checkHadithRef(ref) {
  // Parse "Bukhari 123" → collection + number
  var parts = ref.match(/^(Bukhari|Muslim|Tirmidhi)\s+(\d+)$/i);
  if (!parts) return { ok: false, error: 'unparseable: ' + ref };
  var collection = HADITH_COLLECTIONS[parts[1]] || HADITH_COLLECTIONS[parts[1].charAt(0).toUpperCase() + parts[1].slice(1).toLowerCase()];
  var num = parts[2];
  if (!collection) return { ok: false, error: 'unknown_collection: ' + parts[1] };
  var url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/' + collection + '/' + num + '.json';
  var res = await fetchJSON(url);
  if (res && res.hadiths && res.hadiths.length > 0) {
    var h = res.hadiths[0];
    return { ok: true, text: (h.text || '').substring(0, 120), number: h.hadithnumber, grades: h.grades || [] };
  }
  if (res && res.error) return { ok: false, error: res.error };
  return { ok: false, error: 'not_found' };
}

function deepExtractText(obj) {
  var text = '';
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) { obj.forEach(item => { text += ' ' + deepExtractText(item); }); return text; }
  if (obj && typeof obj === 'object') { Object.keys(obj).forEach(k => { text += ' ' + deepExtractText(obj[k]); }); return text; }
  return '';
}

async function processEntry(section, entry, idx) {
  var text = deepExtractText(entry);

  var refs = extractRefs(text);
  var result = {
    section: section,
    entry_id: entry.question_id || entry.num || entry.jour || idx,
    refs_found: { quran: refs.quran, hadith: refs.hadith },
    checks: [],
    verdict: 'NO_REF'
  };

  // Check quran refs
  for (var i = 0; i < refs.quran.length; i++) {
    await sleep(500);
    var check = await checkQuranRef(refs.quran[i]);
    result.checks.push({
      type: 'quran',
      ref: refs.quran[i],
      api_ok: check.ok,
      api_text: check.ok ? check.text : '',
      api_surah: check.ok ? check.surah : '',
      error: check.ok ? '' : check.error
    });
  }

  // Check hadith refs
  for (var j = 0; j < refs.hadith.length; j++) {
    await sleep(500);
    var hcheck = await checkHadithRef(refs.hadith[j]);
    result.checks.push({
      type: 'hadith',
      ref: refs.hadith[j],
      api_ok: hcheck.ok,
      api_text: hcheck.ok ? hcheck.text : '',
      api_number: hcheck.ok ? hcheck.number : '',
      api_grades: hcheck.ok ? hcheck.grades : [],
      error: hcheck.ok ? '' : hcheck.error
    });
  }

  // Verdict
  if (refs.quran.length === 0 && refs.hadith.length === 0) {
    result.verdict = 'NO_REF';
  } else if (result.checks.length > 0) {
    var allOk = result.checks.every(c => c.api_ok);
    var anyFail = result.checks.some(c => !c.api_ok);
    result.verdict = anyFail ? 'ERREUR' : 'OK';
  } else if (refs.hadith.length > 0) {
    result.verdict = 'HADITH_ONLY';
  }

  return result;
}

async function run() {
  var sections = Object.keys(data);
  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
    var entries = data[section];
    for (var ei = 0; ei < entries.length; ei++) {
      processed++;
      process.stdout.write('\r[' + processed + '/' + total + '] ' + section + ' #' + ei);
      var result = await processEntry(section, entries[ei], ei);
      results.push(result);
    }
  }
  console.log('\n\nDone. Writing AUDIT_RESULTS_HADITH.json...');

  // Summary
  var summary = { OK: 0, ERREUR: 0, NO_REF: 0, HADITH_ONLY: 0 };
  results.forEach(r => { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log('Summary:', JSON.stringify(summary));

  var output = { summary: summary, timestamp: new Date().toISOString(), total: results.length, results: results };
  fs.writeFileSync('AUDIT_RESULTS_HADITH.json', JSON.stringify(output, null, 2));
  console.log('AUDIT_RESULTS_HADITH.json written (' + results.length + ' entries)');
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
