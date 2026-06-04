const fs = require("fs");
const https = require("https");

var audited = JSON.parse(fs.readFileSync("AUDIT_SONNET.json", "utf8"));
var auditedSet = new Set();
audited.results.forEach(function(r) { auditedSet.add(r.section + "/" + r.entry_id); });

var allEntries = [];
function loadArr(section, file, idFn) {
  var d = JSON.parse(fs.readFileSync(file, "utf8"));
  d.forEach(function(e, i) {
    var id = idFn(e, i);
    if (!auditedSet.has(section + "/" + id)) allEntries.push({ section: section, entry_id: id, entry: e });
  });
}
loadArr("hadiths", "hadiths_jour.json", function(e) { return e.jour; });
loadArr("duaas", "duaas.json", function(e) { return e.jour; });
loadArr("savais_tu", "savais_tu.json", function(e, i) { return i; });
loadArr("compagnons", "compagnons.json", function(e) { return e.jour; });
loadArr("prophetes", "prophetes.json", function(e) { return e.jour; });
loadArr("fiqh", "fiqh_jour.json", function(e) { return e.jour; });
loadArr("recits_coran", "data/recits-coran.json", function(e) { return e.num; });
var sira = JSON.parse(fs.readFileSync("data/sira.min.json", "utf8"));
sira.rdv.forEach(function(e) { if (!auditedSet.has("sira/" + e.num)) allEntries.push({ section: "sira", entry_id: e.num, entry: e }); });
var taf = JSON.parse(fs.readFileSync("data/waqt/tafakkur_recits.json", "utf8"));
taf.forEach(function(e) { if (!auditedSet.has("tafakkur_recits/" + e.question_id)) allEntries.push({ section: "tafakkur_recits", entry_id: e.question_id, entry: e }); });

console.log("Entries to audit:", allEntries.length);
console.log("Estimated time:", Math.round(allEntries.length * 2 / 60) + "min");

function deepText(o) { if (typeof o === "string") return o; if (Array.isArray(o)) return o.map(deepText).join(" "); if (o && typeof o === "object") return Object.values(o).map(deepText).join(" "); return ""; }
function extractSources(e) { var p = []; function w(o, k) { if (typeof o === "string" && /source|ref|degre|auth/i.test(k || "")) { p.push(o); return; } if (Array.isArray(o)) { o.forEach(function(v) { w(v, k); }); return; } if (o && typeof o === "object") Object.keys(o).forEach(function(k2) { w(o[k2], k2); }); } w(e, ""); return p.join(" | ") || "non specifie"; }

var WORKER_URL = "https://niyyah-api.nabs881.workers.dev/api/verify";
function postJSON(url, data) { return new Promise(function(resolve) { var body = JSON.stringify(data); var parsed = new URL(url); var req = https.request({ hostname: parsed.hostname, path: parsed.pathname, method: "POST", headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body), "Origin": "https://nabs881-sketch.github.io" } }, function(res) { var buf = ""; res.on("data", function(c) { buf += c; }); res.on("end", function() { try { resolve(JSON.parse(buf)); } catch (e) { resolve({ error: "parse" }); } }); }); req.on("error", function(e) { resolve({ error: e.message }); }); req.setTimeout(30000, function() { req.destroy(); resolve({ error: "timeout" }); }); req.write(body); req.end(); }); }
function sleep(ms) { return new Promise(function(r) { setTimeout(r, ms); }); }

var results = [];
var processed = 0;

async function run() {
  var start = Date.now();
  for (var i = 0; i < allEntries.length; i++) {
    var e = allEntries[i];
    processed++;
    if (processed % 10 === 0 || processed === allEntries.length) process.stdout.write(String.fromCharCode(13)+"[" + processed + "/" + allEntries.length + "] " + e.section);
    var text = deepText(e.entry).substring(0, 2000);
    var sources = extractSources(e.entry);
    if (text.length < 20) { results.push({ section: e.section, entry_id: e.entry_id, verdict: "SKIP", notes: "texte trop court", details: [] }); continue; }
    await sleep(1000);
    var resp = await postJSON(WORKER_URL, { texte: text, sources: sources, section: e.section, entry_id: String(e.entry_id) });
    if (resp.error) { results.push({ section: e.section, entry_id: e.entry_id, verdict: "API_ERROR", notes: resp.error, details: [] }); }
    else { results.push({ section: e.section, entry_id: e.entry_id, verdict: resp.verdict || "UNKNOWN", notes: resp.notes || "", details: resp.details || [] }); }
  }
  var elapsed = Math.round((Date.now() - start) / 1000);
  console.log("Done in " + elapsed + "s (" + Math.round(elapsed / 60) + "min)");
  var summary = { OK: 0, DOUTE: 0, ERREUR: 0, PARSE_ERROR: 0, SKIP: 0, API_ERROR: 0 };
  results.forEach(function(r) { summary[r.verdict] = (summary[r.verdict] || 0) + 1; });
  console.log("Summary:", JSON.stringify(summary));
  var bySection = {};
  results.forEach(function(r) { if (!bySection[r.section]) bySection[r.section] = { OK: 0, DOUTE: 0, ERREUR: 0, t: 0 }; bySection[r.section][r.verdict] = (bySection[r.section][r.verdict] || 0) + 1; bySection[r.section].t++; });
  console.log("Par section:");
  Object.keys(bySection).forEach(function(s) { var x = bySection[s]; console.log("  " + s + " (" + x.t + ") OK:" + (x.OK || 0) + " DOUTE:" + (x.DOUTE || 0) + " ERREUR:" + (x.ERREUR || 0)); });
  var issues = results.filter(function(r) { return r.verdict === "ERREUR"; });
  if (issues.length > 0) { console.log("ERREURS (" + issues.length + "):"); issues.slice(0, 20).forEach(function(r) { console.log("  " + r.section + "/" + r.entry_id + " — " + r.notes); }); if (issues.length > 20) console.log("  ... +" + (issues.length - 20) + " autres"); }
  fs.writeFileSync("AUDIT_SONNET_COMPLET.json", JSON.stringify({ summary: summary, elapsed_seconds: elapsed, timestamp: new Date().toISOString(), total: results.length, results: results }, null, 2));
  console.log("AUDIT_SONNET_COMPLET.json written (" + results.length + " entries)");
}
run().catch(function(e) { console.error("Fatal:", e); process.exit(1); });