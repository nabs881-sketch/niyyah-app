const fs = require('fs');
const https = require('https');

const data = JSON.parse(fs.readFileSync('SAMPLING_REMAINING.json', 'utf8'));
const results = [];
let total = 0;
Object.keys(data).forEach(k => { total += data[k].length; });
let processed = 0;

const QURAN_RE = /(\d{1,3})\s*[:]\s*(\d{1,3})/g;
const BUKHARI_RE = /bukh[aā]r[iī]\s*(?:n[°o.]?\s*)?(\d+)/gi;
const MUSLIM_RE = /muslim\s*(?:n[°o.]?\s*)?(\d+)/gi;
const TIRMIDHI_RE = /tirmidh[iī]\s*(?:n[°o.]?\s*)?(\d+)/gi;

function extractRefs(text) {
  if (!text) return { quran: [], hadith: [] };
  var quran = [], hadith = [], m;
  while ((m = QURAN_RE.exec(text)) !== null) {
    var s = parseInt(m[1]), v = parseInt(m[2]);
    if (s >= 1 && s <= 114 && v >= 1 && v <= 300) quran.push(s + ':' + v);
  }
  while ((m = BUKHARI_RE.exec(text)) !== null) hadith.push('Bukhari ' + m[1]);
  while ((m = MUSLIM_RE.exec(text)) !== null) hadith.push('Muslim ' + m[1]);
  while ((m = TIRMIDHI_RE.exec(text)) !== null) hadith.push('Tirmidhi ' + m[1]);
  return { quran: [...new Set(quran)], hadith: [...new Set(hadith)] };
}

function fetchJSON(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'NiyyahAudit/1.0' } }, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => { try { resolve(JSON.parse(body)); } catch (e) { resolve({ error: 'parse' }); } });
    }).on('error', e => resolve({ error: e.message }));
  });
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function checkQuranRef(ref) {
  var res = await fetchJSON('https://api.alquran.cloud/v1/ayah/' + ref + '/editions/fr.hamidullah');
  if (res.code === 200 && res.data && res.data[0]) return { ok: true, text: res.data[0].text.substring(0, 120), surah: res.data[0].surah ? res.data[0].surah.englishName : '' };
  return { ok: false, error: res.error || 'not_found' };
}

async function checkHadithRef(ref) {
  var parts = ref.match(/^(Bukhari|Muslim|Tirmidhi)\s+(\d+)$/i);
  if (!parts) return { ok: false, error: 'unparseable' };
  var map = { bukhari: 'eng-bukhari', muslim: 'eng-muslim', tirmidhi: 'eng-tirmidhi' };
  var col = map[parts[1].toLowerCase()];
  if (!col) return { ok: false, error: 'unknown_collection' };
  var res = await fetchJSON('https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/' + col + '/' + parts[2] + '.json');
  if (res && res.hadiths && res.hadiths.length > 0) return { ok: true, text: (res.hadiths[0].text || '').substring(0, 120), number: res.hadiths[0].hadithnumber };
  return { ok: false, error: res.error || 'not_found' };
}

function deepText(obj) {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(deepText).join(' ');
  if (obj && typeof obj === 'object') return Object.values(obj).map(deepText).join(' ');
  return '';
}

async function processEntry(section, entry, idx) {
  var text = deepText(entry);
  var refs = extractRefs(text);
  var result = { section, entry_id: entry.question_id || entry.num || entry.jour || idx, refs_found: { quran: refs.quran, hadith: refs.hadith }, checks: [], verdict: 'NO_REF' };

  for (var i = 0; i < refs.quran.length; i++) { await sleep(300); var c = await checkQuranRef(refs.quran[i]); result.checks.push({ type: 'quran', ref: refs.quran[i], api_ok: c.ok, api_text: c.ok ? c.text : '', error: c.ok ? '' : c.error }); }
  for (var j = 0; j < refs.hadith.length; j++) { await sleep(300); var h = await checkHadithRef(refs.hadith[j]); result.checks.push({ type: 'hadith', ref: refs.hadith[j], api_ok: h.ok, api_text: h.ok ? h.text : '', error: h.ok ? '' : h.error }); }

  if (refs.quran.length === 0 && refs.hadith.length === 0) result.verdict = 'NO_REF';
  else if (result.checks.some(c => !c.api_ok)) result.verdict = 'ERREUR';
  else result.verdict = 'OK';
  return result;
}

async function run() {
  var start = Date.now();
  var sections = Object.keys(data);
  for (var si = 0; si < sections.length; si++) {
    var section = sections[si];
    for (var ei = 0; ei < data[section].length; ei++) {
      processed++;
      if (processed % 10 === 0 || processed === total) process.stdout.write('\r[' + processed + '/' + total + '] ' + section);
      results.push(await processEntry(section, data[section][ei], ei));
    }
  }
  var elapsed = Math.round((Date.now() - start) / 1000);
  console.log('\n\nDone in ' + elapsed + 's');
  var summary = { OK: 0, ERREUR: 0, NO_REF: 0 };
  results.forEach(r => { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log('Summary:', JSON.stringify(summary));

  var bySection = {};
  results.forEach(r => { if (!bySection[r.section]) bySection[r.section] = { OK: 0, ERREUR: 0, NO_REF: 0, t: 0, refs: 0 }; bySection[r.section][r.verdict]++; bySection[r.section].t++; bySection[r.section].refs += r.refs_found.quran.length + r.refs_found.hadith.length; });
  Object.keys(bySection).forEach(s => { var x = bySection[s]; console.log(s + ' (' + x.t + ') OK:' + x.OK + ' ERR:' + x.ERREUR + ' NO_REF:' + x.NO_REF + ' | refs:' + x.refs); });

  var errs = results.filter(r => r.verdict === 'ERREUR');
  if (errs.length > 0) { console.log('\nERREURS:'); errs.slice(0, 20).forEach(r => { r.checks.filter(c => !c.api_ok).forEach(c => console.log('  ' + r.section + '/' + r.entry_id + ' | ' + c.ref + ' | ' + c.error)); }); }

  fs.writeFileSync('AUDIT_FULL_2501.json', JSON.stringify({ summary, elapsed_seconds: elapsed, timestamp: new Date().toISOString(), total: results.length, results }, null, 2));
  console.log('\nAUDIT_FULL_2501.json written');
}

run().catch(e => { console.error('Fatal:', e); process.exit(1); });
