const fs = require("fs");
const https = require("https");
const audit = JSON.parse(fs.readFileSync("AUDIT_SONNET.json", "utf8"));
const errs = audit.results.filter(r => r.verdict === "ERREUR");
console.log("ERREUR entries:", errs.length);
const sources = {};
sources.hadiths = JSON.parse(fs.readFileSync("hadiths_jour.json", "utf8"));
sources.duaas = JSON.parse(fs.readFileSync("duaas.json", "utf8"));
sources.savais_tu = JSON.parse(fs.readFileSync("savais_tu.json", "utf8"));
sources.fiqh = JSON.parse(fs.readFileSync("fiqh_jour.json", "utf8"));
sources.tafakkur_recits = JSON.parse(fs.readFileSync("data/waqt/tafakkur_recits.json", "utf8"));
function findEntry(sec, id) { var p = sources[sec]; if (!p) return null; return p.find(function(e) { return (e.question_id || e.num || e.jour) == id; }) || null; }
function deepText(o) { if (typeof o === "string") return o; if (Array.isArray(o)) return o.map(deepText).join(" "); if (o && typeof o === "object") return Object.values(o).map(deepText).join(" "); return ""; }
function extractAllRefs(text) {
  if (!text) return { quran: [], hadith: [] };
  var quran = [], hadith = [], m;
  var qr = /(\d{1,3})\s*[:]\s*(\d{1,3})/g;
  while ((m = qr.exec(text)) !== null) { var s = parseInt(m[1]), v = parseInt(m[2]); if (s >= 1 && s <= 114 && v >= 1 && v <= 300) quran.push(s + ":" + v); }
  var br = /bukhari\s*(\d+)/gi; while ((m = br.exec(text)) !== null) hadith.push({ collection: "eng-bukhari", label: "Bukhari " + m[1], num: m[1] });
  var mr = /muslim\s*(\d+)/gi; while ((m = mr.exec(text)) !== null) hadith.push({ collection: "eng-muslim", label: "Muslim " + m[1], num: m[1] });
  var tr = /tirmidhi\s*(\d+)/gi; while ((m = tr.exec(text)) !== null) hadith.push({ collection: "eng-tirmidhi", label: "Tirmidhi " + m[1], num: m[1] });
  var dr = /abu\s*dawud\s*(\d+)/gi; while ((m = dr.exec(text)) !== null) hadith.push({ collection: "eng-abudawud", label: "Abu Dawud " + m[1], num: m[1] });
  var ir = /ibn\s*majah\s*(\d+)/gi; while ((m = ir.exec(text)) !== null) hadith.push({ collection: "eng-ibnmajah", label: "Ibn Majah " + m[1], num: m[1] });
  return { quran: [...new Set(quran)], hadith: hadith.filter(function(v, i, a) { return a.findIndex(function(x) { return x.label === v.label; }) === i; }) };
}
function fetchJSON(url) { return new Promise(function(resolve) { https.get(url, { headers: { "User-Agent": "NiyyahAudit/1.0" } }, function(res) { var body = ""; res.on("data", function(c) { body += c; }); res.on("end", function() { try { resolve(JSON.parse(body)); } catch (e) { resolve({ error: "parse" }); } }); }).on("error", function(e) { resolve({ error: e.message }); }); }); }
function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }
async function checkQuran(ref) { var res = await fetchJSON("https://api.alquran.cloud/v1/ayah/" + ref + "/editions/fr.hamidullah"); if (res.code === 200 && res.data && res.data[0]) return { exists: true, text: res.data[0].text.substring(0, 150), surah: res.data[0].surah ? res.data[0].surah.englishName : "" }; return { exists: false }; }
async function checkHadith(h) { var res = await fetchJSON("https://cdn.jsdelivr.net/gh/fawazahmed0/hadith-api@1/editions/" + h.collection + "/" + h.num + ".json"); if (res && res.hadiths && res.hadiths.length > 0) return { exists: true, text: (res.hadiths[0].text || "").substring(0, 150), number: res.hadiths[0].hadithnumber }; return { exists: false }; }
var results = [];
var processed = 0;
async function run() {
  var start = Date.now();
  for (var i = 0; i < errs.length; i++) {
    var err = errs[i]; processed++;
    process.stdout.write("\r[" + processed + "/" + errs.length + "] " + err.section + "/" + err.entry_id);
    var orig = findEntry(err.section, err.entry_id);
    var text = deepText(orig);
    var refs = extractAllRefs(text);
    var checks = [];
    for (var q = 0; q < refs.quran.length; q++) { await sleep(300); var qr = await checkQuran(refs.quran[q]); checks.push({ type: "quran", ref: refs.quran[q], exists: qr.exists, api_text: qr.exists ? qr.text : "" }); }
    for (var h = 0; h < refs.hadith.length; h++) { await sleep(300); var hr = await checkHadith(refs.hadith[h]); checks.push({ type: "hadith", ref: refs.hadith[h].label, exists: hr.exists, api_text: hr.exists ? hr.text : "" }); }
    var allExist = checks.length > 0 && checks.every(function(c) { return c.exists; });
    var noneExist = checks.length > 0 && checks.every(function(c) { return !c.exists; });
    var noRefs = checks.length === 0;
    var verdict = noRefs ? "NO_REF_FOUND" : noneExist ? "VRAI_POSITIF" : allExist ? "FAUX_POSITIF" : "AMBIGU";
    results.push({ section: err.section, entry_id: err.entry_id, sonnet_notes: err.notes, refs_found: { quran: refs.quran, hadith: refs.hadith.map(function(x) { return x.label; }) }, checks: checks, verdict: verdict });
  }
  var elapsed = Math.round((Date.now() - start) / 1000);
  console.log("\n\nDone in " + elapsed + "s");
  var summary = { VRAI_POSITIF: 0, FAUX_POSITIF: 0, AMBIGU: 0, NO_REF_FOUND: 0 };
  results.forEach(function(r) { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log("Summary:", JSON.stringify(summary));
  console.log("\nVRAI_POSITIF (refs inexistantes):");
  results.filter(function(r) { return r.verdict === "VRAI_POSITIF"; }).forEach(function(r) { var missing = r.checks.filter(function(c) { return !c.exists; }).map(function(c) { return c.ref; }).join(", "); console.log("  " + r.section + "/" + r.entry_id + " — " + missing); });
  console.log("\nFAUX_POSITIF (refs existent):");
  results.filter(function(r) { return r.verdict === "FAUX_POSITIF"; }).forEach(function(r) { console.log("  " + r.section + "/" + r.entry_id); });
  console.log("\nAMBIGU:");
  results.filter(function(r) { return r.verdict === "AMBIGU"; }).forEach(function(r) { var ok = r.checks.filter(function(c) { return c.exists; }).map(function(c) { return c.ref; }).join(", "); var ko = r.checks.filter(function(c) { return !c.exists; }).map(function(c) { return c.ref; }).join(", "); console.log("  " + r.section + "/" + r.entry_id + " — OK: " + ok + " | MANQUANT: " + ko); });
  fs.writeFileSync("AUDIT_NIVEAU3.json", JSON.stringify({ summary: summary, elapsed_seconds: elapsed, timestamp: new Date().toISOString(), total: results.length, results: results }, null, 2));
  console.log("\nAUDIT_NIVEAU3.json written (" + results.length + " entries)");
}
run().catch(function(e) { console.error("Fatal:", e); process.exit(1); });