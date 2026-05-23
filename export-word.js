const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, BorderStyle, HeadingLevel } = require('docx');

function deepText(obj) {
  if (typeof obj === 'string') return obj;
  if (Array.isArray(obj)) return obj.map(deepText).join('\n');
  if (obj && typeof obj === 'object') {
    if (obj.fr) return obj.fr;
    if (obj.content && obj.content.fr) return obj.content.fr;
    if (obj.texte) return obj.texte;
    return Object.values(obj).map(deepText).join('\n');
  }
  return '';
}

function sep() {
  return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' } }, spacing: { after: 200, before: 200 } });
}

function makeEntry(title, source, content) {
  var paras = [];
  paras.push(new Paragraph({ children: [new TextRun({ text: title || '—', bold: true, size: 28, font: 'Cormorant Garamond' })], spacing: { after: 80 } }));
  if (source) paras.push(new Paragraph({ children: [new TextRun({ text: source, italics: true, size: 20, color: '888888', font: 'Cormorant Garamond' })], spacing: { after: 80 } }));
  var lines = String(content || '').split('\n');
  lines.forEach(function(line) {
    if (line.trim()) paras.push(new Paragraph({ children: [new TextRun({ text: line, size: 22, font: 'Cormorant Garamond' })], spacing: { after: 60 } }));
  });
  paras.push(sep());
  return paras;
}

async function writeDocx(filename, entries) {
  var allParas = [];
  entries.forEach(function(e) { allParas.push(...makeEntry(e.title, e.source, e.content)); });
  var doc = new Document({ sections: [{ children: allParas }] });
  var buf = await Packer.toBuffer(doc);
  fs.writeFileSync('ECRITS_NIYYAH/' + filename, buf);
  console.log('  ' + filename + ' — ' + entries.length + ' entrees');
}

async function run() {
  console.log('Export Word...\n');

  // 1. Tafakkur recits
  var taf = JSON.parse(fs.readFileSync('data/waqt/tafakkur_recits.json', 'utf8'));
  await writeDocx('tafakkur_recits.docx', taf.map(function(r) {
    return { title: r.question_id + ' — ' + r.theme, source: r.recit.source_nom || '', content: r.question_fr + '\n\n' + r.recit.texte };
  }));

  // 2. Savais-tu
  var sav = JSON.parse(fs.readFileSync('savais_tu.json', 'utf8'));
  await writeDocx('savais_tu.docx', sav.map(function(s, i) {
    return { title: 'Fait ' + (i + 1), source: s.source || '', content: s.fr || s.texte || '' };
  }));

  // 3. Hadiths
  var had = JSON.parse(fs.readFileSync('hadiths_jour.json', 'utf8'));
  await writeDocx('hadiths_jour.docx', had.map(function(h) {
    return { title: 'Hadith ' + (h.jour || ''), source: (h.source || '') + ' — ' + (h.degre || ''), content: (h.texte_ar || '') + '\n' + (h.texte_fr || '') + (h.contexte ? '\n\n[Contexte] ' + h.contexte : '') };
  }));

  // 4. Duaas
  var dua = JSON.parse(fs.readFileSync('duaas.json', 'utf8'));
  await writeDocx('duaas.docx', dua.map(function(d) {
    return { title: 'Jour ' + d.jour + ' — ' + (d.titre || ''), source: (d.source || '') + ' ' + (d.authenticite || ''), content: (d.arabe || '') + '\n' + (d.phonetique || '') + '\n' + (d.traduction || '') + '\n\n' + (d.recit || '') };
  }));

  // 5. Compagnons
  var comp = JSON.parse(fs.readFileSync('compagnons.json', 'utf8'));
  await writeDocx('compagnons.docx', comp.map(function(c) {
    return { title: 'Jour ' + c.jour + ' — ' + (c.compagnon || ''), source: c.source || '', content: (c.recit || '') + '\n\n' + (c.parole || '') + '\n\n' + (c.station || '') };
  }));

  // 6. Prophetes
  var proph = JSON.parse(fs.readFileSync('prophetes.json', 'utf8'));
  await writeDocx('prophetes.docx', proph.map(function(p) {
    return { title: 'Jour ' + p.jour + ' — ' + (p.prophete || ''), source: p.sources || '', content: (p.recit || '') + '\n\n' + (p.parole || '') };
  }));

  // 7. Recits du Coran
  var rec = JSON.parse(fs.readFileSync('data/recits-coran.json', 'utf8'));
  await writeDocx('recits_coran.docx', rec.map(function(r) {
    var txt = (r.paragraphes || []).map(function(p) { return deepText(p.content); }).join('\n\n');
    return { title: 'Recit ' + r.num + ' — ' + deepText(r.titre), source: deepText(r.source), content: txt + '\n\n' + deepText(r.meditation) };
  }));

  // 8. Sira
  var sira = JSON.parse(fs.readFileSync('data/sira.min.json', 'utf8'));
  await writeDocx('sira.docx', sira.rdv.map(function(r) {
    var txt = (r.paragraphes || []).map(function(p) { return deepText(p.content); }).join('\n\n');
    return { title: 'RDV ' + r.num + ' — ' + deepText(r.titre), source: deepText(r.source), content: txt + '\n\n' + deepText(r.meditation) + '\n\n' + deepText(r.fil_rouge) };
  }));

  // 9. Regard versets
  var reg = JSON.parse(fs.readFileSync('data/regard-library.json', 'utf8'));
  var regEntries = [];
  Object.keys(reg).filter(function(k) { return k !== '_meta'; }).forEach(function(cat) {
    (reg[cat].versets || []).forEach(function(v, i) {
      regEntries.push({ title: cat.toUpperCase() + ' — Verset ' + (i + 1), source: v.reference || '', content: (v.texte || '') + '\n\n' + (v.murmure || '') });
    });
  });
  await writeDocx('regard_versets.docx', regEntries);

  // 10. Fiqh
  var fiqh = JSON.parse(fs.readFileSync('fiqh_jour.json', 'utf8'));
  await writeDocx('fiqh.docx', fiqh.map(function(f) {
    return { title: 'Jour ' + (f.jour || '') + ' — ' + (f.categorie || ''), source: f.source || '', content: (f.regle || f.texte_fr || '') + '\n\n' + (f.explication || '') };
  }));

  // 11. Tafakkur questions
  var tafQ = JSON.parse(fs.readFileSync('data/waqt/tafakkur_final.json', 'utf8'));
  await writeDocx('tafakkur_questions.docx', tafQ.map(function(q, i) {
    return { title: 'Question ' + (i + 1), source: q.source || q.plage_origine || '', content: q.fr || '' };
  }));

  // 12. Waqt phrases
  var waqtFiles = ['waqt_fajr', 'waqt_dhuhr', 'waqt_asr', 'waqt_maghrib', 'waqt_isha'];
  var waqtAll = [];
  waqtFiles.forEach(function(f) {
    var d = JSON.parse(fs.readFileSync('data/waqt/' + f + '.json', 'utf8'));
    d.forEach(function(p, i) { waqtAll.push({ title: f.replace('waqt_', '').toUpperCase() + ' — ' + (i + 1), source: p.source || p.plage_origine || '', content: p.fr || '' }); });
  });
  await writeDocx('waqt_phrases.docx', waqtAll);

  // 13. Bab an-Nafs
  var bab = JSON.parse(fs.readFileSync('data/bab-an-nafs.json', 'utf8'));
  await writeDocx('bab_an_nafs.docx', (bab.portes || []).map(function(p) {
    return { title: (p.nom && p.nom.fr) || p.id, source: '', content: deepText(p) };
  }));

  console.log('\nDone! ls ECRITS_NIYYAH/');
}

run().catch(function(e) { console.error('Fatal:', e); process.exit(1); });
