// gen_ecrits.cjs — Régénère TOUS les Word du dossier ECRITS_NIYYAH depuis les JSON
// FRANÇAIS UNIQUEMENT (aucun arabe ni translittération)
const fs = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, BorderStyle } = require('docx');

const OUT = path.join(__dirname, 'ECRITS_NIYYAH');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT);

function load(f) { return JSON.parse(fs.readFileSync(path.join(__dirname, f), 'utf8')); }
function tryLoad(f) { try { return load(f); } catch(e) { console.warn('  SKIP (not found):', f); return null; } }

function title(t) { return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun({ text: t, bold: true, size: 32 })] }); }
function h2(t) { return new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 300 }, children: [new TextRun({ text: t, bold: true, size: 26 })] }); }
function h3(t) { return new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { before: 200 }, children: [new TextRun({ text: t, bold: true, size: 22 })] }); }
function p(t) { return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: String(t || ''), size: 22 })] }); }
function pItalic(t) { return new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: String(t || ''), size: 22, italics: true })] }); }
function pBold(t) { return new Paragraph({ spacing: { after: 80 }, children: [new TextRun({ text: String(t || ''), size: 22, bold: true })] }); }
function hr() { return new Paragraph({ border: { bottom: { style: BorderStyle.SINGLE, size: 1 } }, spacing: { after: 200 } }); }

async function saveDoc(name, sections) {
  const doc = new Document({ sections: [{ children: sections }] });
  const buf = await Packer.toBuffer(doc);
  const fp = path.join(OUT, name);
  fs.writeFileSync(fp, buf);
  console.log('  ✓', name, `(${Math.round(buf.length/1024)}Ko)`);
}

// ─── CURE helper ───
function cureSections(data, cureName) {
  const s = [title(`Cure ${cureName} — Cycle 1`)];
  if (data.titre_fr) s.push(p(data.titre_fr));
  if (data.introduction_globale) s.push(pItalic(data.introduction_globale));
  s.push(hr());
  const jours = data.jours || {};
  Object.keys(jours).sort().forEach(jk => {
    const j = jours[jk];
    s.push(h2(`${jk.toUpperCase()} — ${j.titre_jour || j.titre || ''}`));
    if (j.introduction) s.push(pItalic(j.introduction));
    // Bloc 1 verset
    const bv = j.bloc_1_ouverture_spirituelle;
    if (bv) {
      s.push(h3('Verset'));
      if (bv.verset) {
        if (bv.verset.fr) s.push(p(bv.verset.fr));
        if (bv.verset.reference) s.push(pItalic(`— ${bv.verset.reference}`));
      }
      if (bv.contexte_revelation) s.push(p(bv.contexte_revelation));
      if (bv.sens_pour_aujourdhui) s.push(p(bv.sens_pour_aujourdhui));
    }
    // Bloc 2 sagesse
    const bs = j.bloc_2_sagesse;
    if (bs) {
      s.push(h3(bs.titre_bloc || 'Sagesse'));
      if (bs.parole) {
        if (bs.parole.texte) s.push(p(bs.parole.texte));
        if (bs.parole.auteur) s.push(pItalic(`— ${bs.parole.auteur}${bs.parole.dates_auteur ? ' (' + bs.parole.dates_auteur + ')' : ''}`));
        if (bs.parole.oeuvre) s.push(pItalic(bs.parole.oeuvre));
        if (bs.parole.note) s.push(p(bs.parole.note));
        if (bs.parole.note_editoriale) s.push(pItalic(`Note éditoriale : ${bs.parole.note_editoriale}`));
      }
    }
    // Introduction avant outils
    if (j.introduction_avant_outils) s.push(pItalic(j.introduction_avant_outils));
    // Bloc 3 outils
    const outils = j.bloc_3_outils_psy || j.outils || [];
    outils.forEach((o, i) => {
      s.push(h3(`Outil ${i+1} : ${o.titre || o.id}`));
      if (o.introduction) s.push(p(o.introduction));
      if (o.consigne) s.push(pItalic(o.consigne));
      if (o.aide_pratique) s.push(pItalic(`Aide : ${o.aide_pratique}`));
      if (o.note_spi) s.push(pItalic(o.note_spi));
      if (o.note_psy) s.push(pItalic(`[Psy] ${o.note_psy}`));
    });
    // Bloc 4 dhikr
    const bd = j.bloc_4_dhikr_quantifie;
    if (bd) {
      s.push(h3(bd.titre_bloc || 'Dhikr du jour'));
      if (bd.introduction) s.push(p(bd.introduction));
      if (bd.dhikr && bd.dhikr.fr) s.push(pBold(bd.dhikr.fr));
      if (bd.dhikr && bd.dhikr.sens) s.push(p(bd.dhikr.sens));
      if (bd.quantite) s.push(p(`Quantité : ${bd.quantite}`));
      if (bd.moment_recommande) s.push(p(`Moment : ${bd.moment_recommande}`));
      if (bd.justification) {
        if (bd.justification.texte) s.push(p(bd.justification.texte));
        if (bd.justification.source) s.push(pItalic(`Source : ${bd.justification.source}`));
        if (bd.justification.hadith) s.push(pItalic(`Hadith : ${bd.justification.hadith}`));
      }
      if (bd.comment_pratiquer) s.push(p(bd.comment_pratiquer));
    }
    // Bloc 5 corporel
    const bc = j.bloc_5_pratique_corporelle;
    if (bc) {
      s.push(h3(bc.titre_bloc || 'Pratique corporelle'));
      if (bc.introduction) s.push(p(bc.introduction));
      if (bc.instructions) bc.instructions.forEach(inst => s.push(p(`• ${inst}`)));
      if (bc.justification) {
        if (bc.justification.texte) s.push(p(bc.justification.texte));
        if (bc.justification.source) s.push(pItalic(`Source : ${bc.justification.source}`));
      }
      if (bc.note) s.push(p(bc.note));
    }
    // Clôture
    if (j.cloture) {
      if (j.cloture.texte) s.push(pItalic(j.cloture.texte));
      if (j.cloture.teaser) s.push(pItalic(`Demain : ${j.cloture.teaser}`));
    }
    if (j.murmure_sortie_sanctuaire) s.push(pItalic(`Murmure : ${j.murmure_sortie_sanctuaire}`));
    s.push(hr());
  });
  return s;
}

// ─── COFFRET helper ───
function coffretSections(data, name) {
  const s = [title(`Coffret ${name}`)];
  if (data.titre_fr) s.push(p(data.titre_fr));
  if (data.introduction) s.push(pItalic(data.introduction));
  (data.sections || []).forEach(sec => {
    s.push(h2(sec.titre_fr || sec.id));
    if (sec.description) s.push(pItalic(sec.description));
    (sec.entrees || []).forEach((e, i) => {
      if (e.image) { s.push(p(`[Image: ${e.image}]`)); return; }
      s.push(h3(`${i+1}. ${e.fr || e.texte_fr || e.titre_fr || e.id || ''}`));
      if (e.fr) s.push(p(e.fr));
      if (e.sens) s.push(p(e.sens));
      if (e.source) s.push(pItalic(`Source : ${e.source}`));
      if (e.quand) s.push(pItalic(`Quand : ${e.quand}`));
      if (e.apport) s.push(p(e.apport));
    });
  });
  return s;
}

// ─── Simple array/list helper ───
function listSections(title_text, items, fieldMap) {
  const s = [title(title_text)];
  items.forEach((item, i) => {
    const t = fieldMap.title ? item[fieldMap.title] : `#${i+1}`;
    s.push(h3(t));
    (fieldMap.fields || []).forEach(f => {
      if (item[f] && typeof item[f] === 'string') s.push(p(item[f]));
      else if (item[f] && Array.isArray(item[f])) item[f].forEach(x => s.push(p(`• ${typeof x === 'string' ? x : JSON.stringify(x)}`)));
    });
    if (fieldMap.extra) fieldMap.extra(item, s);
  });
  return s;
}

async function main() {
  console.log('=== Génération ECRITS_NIYYAH (français uniquement) ===\n');

  // 1. Cures
  for (const [file, name] of [
    ['cure-colere-cycle1.json', 'Colère'],
    ['cure-anxiete-cycle1.json', 'Anxiété'],
    ['cure-regard-cycle1.json', 'Regard'],
    ['cure-arrogance-cycle1.json', 'Arrogance'],
    ['cure-paresse-cycle1.json', 'Paresse'],
    ['cure-medisance-cycle1.json', 'Médisance'],
  ]) {
    const d = tryLoad(file);
    if (d) await saveDoc(`cure_${name.toLowerCase().replace(/[éè]/g,'e')}.docx`, cureSections(d, name));
  }

  // 2. Coffrets
  for (const [file, name] of [
    ['coffret-colere.json', 'Colère'],
    ['coffret-anxiete.json', 'Anxiété'],
    ['coffret-regard.json', 'Regard'],
    ['coffret-arrogance.json', 'Arrogance'],
    ['coffret-paresse.json', 'Paresse'],
    ['coffret-medisance.json', 'Médisance'],
  ]) {
    const d = tryLoad(file);
    if (d) await saveDoc(`coffret_${name.toLowerCase().replace(/[éè]/g,'e')}.docx`, coffretSections(d, name));
  }

  // 3. Bab an-Nafs
  const bab = tryLoad('bab-nafs-content.json');
  if (bab) {
    const s = [title('Bab an-Nafs — Contenu')];
    const portes = bab.portes || bab;
    (Array.isArray(portes) ? portes : [portes]).forEach(porte => {
      s.push(h2(porte.nom_fr || porte.id || ''));
      if (porte.description_fr) s.push(p(porte.description_fr));
      (porte.rappels || []).forEach((r, i) => {
        s.push(h3(`Rappel ${i+1}`));
        if (r.titre_fr) s.push(pBold(r.titre_fr));
        if (r.texte_fr) s.push(p(r.texte_fr));
        if (r.source) s.push(pItalic(`Source : ${r.source}`));
      });
    });
    await saveDoc('bab_an_nafs.docx', s);
  }

  // 4. Waqt (all 5 prayers)
  const waqtS = [title('Waqt — Toutes les phrases')];
  for (const prayer of ['fajr','dhuhr','asr','maghrib','isha']) {
    const d = tryLoad(`data/waqt/waqt_${prayer}.json`);
    if (!d) continue;
    const phrases = d.phrases || (Array.isArray(d) ? d : []);
    waqtS.push(h2(`${prayer.toUpperCase()} (${phrases.length} phrases)`));
    phrases.forEach((ph, i) => {
      const cat = ph.sous_type || ph.categorie || '';
      waqtS.push(p(`${i+1}. [${cat}] ${ph.fr || ''}`));
    });
  }
  await saveDoc('waqt_phrases.docx', waqtS);

  // 5. Tafakkur questions
  const tq = tryLoad('data/waqt/tafakkur_final.json');
  if (tq) {
    const items = tq.questions || tq.phrases || (Array.isArray(tq) ? tq : []);
    const s = [title(`Tafakkur — Questions (${items.length})`)];
    items.forEach((q, i) => { s.push(p(`${i+1}. ${q.fr || q.texte || q.question || JSON.stringify(q)}`)); });
    await saveDoc('tafakkur_questions.docx', s);
  }

  // 6. Tafakkur récits
  const tr = tryLoad('data/waqt/tafakkur_recits.json');
  if (tr) {
    const items = Array.isArray(tr) ? tr : (tr.recits || []);
    const s = [title(`Tafakkur — Récits (${items.length})`)];
    items.forEach((r, i) => {
      s.push(h3(`Récit ${i+1}${r.titre ? ' — ' + r.titre : ''}`));
      if (r.texte) s.push(p(r.texte));
      if (r.source) s.push(pItalic(`Source : ${r.source}`));
      if (r.morale) s.push(pItalic(`Morale : ${r.morale}`));
    });
    await saveDoc('tafakkur_recits.docx', s);
  }

  // 7-15. Simple JSON files
  const simpleFiles = [
    { json: 'compagnons.json', docx: 'compagnons.docx', title: 'Compagnons', key: null, titleF: 'nom_fr', fields: ['texte_fr','source','morale_fr','lecon'] },
    { json: 'prophetes.json', docx: 'prophetes.docx', title: 'Prophètes', key: null, titleF: 'nom_fr', fields: ['texte_fr','recit','lecon','source'] },
    { json: 'duaas.json', docx: 'duaas.docx', title: "Du'âs", key: null, titleF: 'titre_fr', fields: ['fr','sens','contexte','source','quand'] },
    { json: 'hadiths_jour.json', docx: 'hadiths_jour.docx', title: 'Hadiths du jour', key: null, titleF: 'titre_fr', fields: ['fr','texte_fr','explication','source','grade'] },
    { json: 'fiqh_jour.json', docx: 'fiqh.docx', title: 'Fiqh du jour', key: null, titleF: 'titre', fields: ['question','reponse','texte','source','detail'] },
    { json: 'savais_tu.json', docx: 'savais_tu.docx', title: 'Savais-tu ?', key: null, titleF: 'titre', fields: ['texte','texte_fr','source','categorie'] },
    { json: 'data/modules/ghidaa_module_complet.json', docx: 'ghidaa.docx', title: 'Ghidâ\' (Nutrition)', key: 'aliments', titleF: 'nom_fr', fields: ['description_fr','bienfaits_fr','source_islamique','hadith_fr','usage'] },
    { json: 'data/modules/tibb_module_complet.json', docx: 'tibb.docx', title: 'Tibb an-Nabawî', key: 'pratiques', titleF: 'nom_fr', fields: ['description_fr','bienfaits_fr','source','hadith_fr','conseil'] },
    { json: 'data/modules/mashhurat_module_complet.json', docx: 'mashhurat.docx', title: 'Mashhurât (Femmes illustres)', key: 'personnalites', titleF: 'nom_fr', fields: ['biographie_fr','lecon','epoque','source'] },
  ];

  for (const sf of simpleFiles) {
    const d = tryLoad(sf.json);
    if (!d) continue;
    let items = sf.key ? (d[sf.key] || []) : (Array.isArray(d) ? d : (d.items || d.entries || d.data || []));
    if (!Array.isArray(items)) { // try first array-like key
      const k = Object.keys(d).find(k => Array.isArray(d[k]));
      items = k ? d[k] : [];
    }
    await saveDoc(sf.docx, listSections(`${sf.title} (${items.length})`, items, { title: sf.titleF, fields: sf.fields }));
  }

  // 16. Lisân
  const lis = tryLoad('data/lisan/lisan_palier1_tranche1.json');
  if (lis) {
    const items = Array.isArray(lis) ? lis : (lis.mots || lis.items || []);
    const s = [title(`Lisân — Vocabulaire (${items.length})`)];
    items.forEach((m, i) => {
      s.push(h3(`${i+1}. ${m.mot_fr || m.fr || m.mot || ''}`));
      if (m.definition_fr) s.push(p(m.definition_fr));
      if (m.exemple_fr) s.push(pItalic(`Exemple : ${m.exemple_fr}`));
      if (m.categorie) s.push(pItalic(`Catégorie : ${m.categorie}`));
    });
    await saveDoc('lisan.docx', s);
  }

  // 17. Récits du Coran
  const rc = tryLoad('data/recits-coran.json');
  if (rc) {
    const items = Array.isArray(rc) ? rc : (rc.recits || rc.items || []);
    const s = [title(`Récits du Coran (${items.length})`)];
    items.forEach((r, i) => {
      s.push(h3(`${i+1}. ${r.titre_fr || r.titre || ''}`));
      if (r.texte_fr || r.texte) s.push(p(r.texte_fr || r.texte));
      if (r.source) s.push(pItalic(`Source : ${r.source}`));
      if (r.morale) s.push(pItalic(`Morale : ${r.morale}`));
    });
    await saveDoc('recits_coran.docx', s);
  }

  // 18. Regard versets
  const rv = tryLoad('data/regard-library.json');
  if (rv) {
    const items = Array.isArray(rv) ? rv : (rv.versets || rv.items || []);
    const s = [title(`Regard — Bibliothèque de versets (${items.length})`)];
    items.forEach((v, i) => {
      s.push(h3(`${i+1}. ${v.reference || v.titre || ''}`));
      if (v.fr) s.push(p(v.fr));
      if (v.contexte) s.push(p(v.contexte));
      if (v.application) s.push(pItalic(v.application));
    });
    await saveDoc('regard_versets.docx', s);
  }

  // 19. Sîra
  const sira = tryLoad('data/sira.min.json');
  if (sira) {
    const items = Array.isArray(sira) ? sira : (sira.rdv || sira.episodes || []);
    const s = [title(`Sîra — Rendez-vous (${items.length})`)];
    items.forEach((ep, i) => {
      s.push(h3(`${ep.numero || i+1}. ${ep.titre || ''}`));
      if (ep.texte) s.push(p(ep.texte));
      if (ep.contexte) s.push(p(ep.contexte));
      if (ep.lecon) s.push(pItalic(`Leçon : ${ep.lecon}`));
      if (ep.source) s.push(pItalic(`Source : ${ep.source}`));
    });
    await saveDoc('sira.docx', s);
  }

  // 20. Aïd module
  const aid = tryLoad('data/events/aid_module_complet.json');
  if (aid && aid.events) {
    const s = [title('Module Aïd')];
    const FIELDS = ['texte_ar','transliteration','traduction','translation','texte_fr','texte','fr','en','sens','contexte','description','message','reponse','detail'];
    const label = (o, i) => o.titre_fr || o.titre || o.nom_fr || o.reference || o.occasion || o.question || o.id || ('#' + (i + 1));
    const fields = (o) => {
      FIELDS.forEach(f => { if (typeof o[f] === 'string' && o[f].trim()) s.push(p(o[f])); });
      if (typeof o.source === 'string') s.push(pItalic('Source : ' + o.source));
      if (typeof o.grade === 'string') s.push(pItalic('Grade : ' + o.grade));
    };
    const walk = (node, depth) => {
      if (Array.isArray(node)) {
        node.forEach((it, i) => {
          if (it == null) return;
          if (typeof it !== 'object') { s.push(p('• ' + it)); return; }
          s.push(h3(label(it, i)));
          fields(it);
          Object.keys(it).forEach(k => { if (it[k] && typeof it[k] === 'object') walk(it[k], depth + 1); });
        });
      } else if (node && typeof node === 'object') {
        fields(node);
        Object.keys(node).forEach(k => {
          if (node[k] && typeof node[k] === 'object') { s.push(pBold(k)); walk(node[k], depth + 1); }
        });
      }
    };
    Object.keys(aid.events).forEach(ek => {
      s.push(h2(aid.events[ek].name_fr || ek));
      walk(aid.events[ek], 1);
    });
    await saveDoc('aid_module.docx', s);
  }

  console.log('\n=== Terminé ===');
}

main().catch(e => { console.error(e); process.exit(1); });
