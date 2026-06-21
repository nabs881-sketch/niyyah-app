// gen_audit_dhuhr.cjs — Génère AUDIT-DHUHR-RECITS.docx
// Toutes les catégories de waqt_dhuhr.json (pas les phrases courtes)
// Format : titre gras | source italique | texte | morale italique | séparateur HR
'use strict';
const fs   = require('fs');
const path = require('path');
const { Document, Packer, Paragraph, TextRun, BorderStyle } = require('docx');

const SRC = path.join(__dirname, 'data/waqt/waqt_dhuhr.json');
const OUT = path.join(__dirname, 'AUDIT-DHUHR-RECITS.docx');

const data = JSON.parse(fs.readFileSync(SRC, 'utf8'));

// ── helpers ─────────────────────────────────────────────────────────────────
const bold = t => new Paragraph({
  spacing: { before: 240, after: 60 },
  children: [new TextRun({ text: String(t || ''), bold: true, size: 24 })]
});

const italic = t => new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text: String(t || ''), italics: true, size: 22 })]
});

const normal = t => new Paragraph({
  spacing: { after: 100 },
  children: [new TextRun({ text: String(t || ''), size: 22 })]
});

const hr = () => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'AAAAAA' } },
  spacing: { after: 240 }
});

const catTitle = (name, count) => new Paragraph({
  spacing: { before: 480, after: 200 },
  children: [new TextRun({ text: `── ${name.toUpperCase()}  (${count} récits) ──`, bold: true, size: 28, color: '444444' })]
});

// ── build sections ───────────────────────────────────────────────────────────
const children = [];

// Document title
children.push(new Paragraph({
  spacing: { after: 80 },
  children: [new TextRun({ text: 'AUDIT — Récits Dhuhr', bold: true, size: 36 })]
}));
children.push(new Paragraph({
  spacing: { after: 400 },
  children: [new TextRun({ text: `Généré le ${new Date().toLocaleDateString('fr-FR')} — waqt_dhuhr.json`, size: 20, italics: true, color: '666666' })]
}));

const cats = data.categories || {};
const catNames = Object.keys(cats);

for (const catKey of catNames) {
  const items = cats[catKey];
  if (!Array.isArray(items) || items.length === 0) continue;

  children.push(catTitle(catKey, items.length));

  for (const item of items) {
    // Titre gras avec ID
    children.push(bold(`${item.id || ''} — ${item.titre || ''}`));
    // Source en italique
    if (item.source) children.push(italic(`Source : ${item.source}`));
    // Texte normal (peut être long, on le divise par \n si besoin)
    if (item.texte) {
      const lines = String(item.texte).split(/\n+/);
      for (const line of lines) {
        if (line.trim()) children.push(normal(line.trim()));
      }
    }
    // Morale en italique
    if (item.morale) children.push(italic(`Morale : ${item.morale}`));
    // Séparateur
    children.push(hr());
  }
}

// ── write ────────────────────────────────────────────────────────────────────
(async () => {
  const doc = new Document({ sections: [{ children }] });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT, buf);
  const kb = Math.round(buf.length / 1024);
  const total = catNames.reduce((s, k) => s + (cats[k] ? cats[k].length : 0), 0);
  console.log(`✓ AUDIT-DHUHR-RECITS.docx  (${total} récits, ${kb} Ko)`);
  console.log(`  → ${OUT}`);
})().catch(e => { console.error(e); process.exit(1); });
