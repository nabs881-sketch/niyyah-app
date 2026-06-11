const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 21);
if (!r) { console.error('RDV 21 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 50)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [8] généalogie Az-Zubayr
setPara(
  "2. Az-Zubayr ibn al-ʿAwwâm. Le neveu de Khadîja par sa mère Ṣafiyya. À peine plus de quinze ans. Brave, fougueux. Un jour, plus tard, on dirait à tort que le Prophète ﷺ avait été tué — Az-Zubayr saisirait son épée et courrait dans les rues de la Mecque pour aller venger son maître. Le Prophète ﷺ, voyant cela, dirait : « À chaque prophète, Allah a donné un disciple. Mon disciple, c'est Az-Zubayr. »",
  "2. Az-Zubayr ibn al-ʿAwwâm. Le neveu de Khadîja par son père al-ʿAwwâm, le frère de Khadîja — et le cousin du Prophète ﷺ par sa mère Ṣafiyya. À peine plus de quinze ans. Brave, fougueux. Un jour, plus tard, on dirait à tort que le Prophète ﷺ avait été tué — Az-Zubayr saisirait son épée et courrait dans les rues de la Mecque pour aller venger son maître. Le Prophète ﷺ, voyant cela, dirait : « À chaque prophète, Allah a donné un disciple. Mon disciple, c'est Az-Zubayr. »"
);

// [16] six d'entre eux (pas tous)
setPara(
  "Sept compagnons majeurs. Tous convertis grâce au seul Abû Bakr. Tous parmi ceux qu'on appellera plus tard les ʿAshara al-Mubashsharûn — les dix annoncés du Paradis, les dix compagnons à qui le Prophète ﷺ promettrait personnellement le Jardin de leur vivant.",
  "Sept compagnons majeurs. Tous convertis grâce au seul Abû Bakr. Six d'entre eux compteront parmi les ʿAshara al-Mubashsharûn — les dix annoncés du Paradis, les dix compagnons à qui le Prophète ﷺ promettrait personnellement le Jardin de leur vivant."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 21 corrigé ([8] généalogie Az-Zubayr, [16] six d\'entre eux).');
