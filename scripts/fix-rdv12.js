const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 12);
if (!r) { console.error('RDV 12 introuvable'); process.exit(1); }

const oldFr = "Et Maysara raconta à sa maîtresse ce qu'il avait vu. Un nuage qui semblait suivre Muhammad ﷺ pendant les arrêts. Un moine chrétien rencontré sur le chemin, qui avait dit en le regardant : « Cet homme est un prophète, le dernier des prophètes. » Une honnêteté dans les transactions qu'il n'avait jamais vue chez aucun marchand.";
const newFr = "Et Maysara raconta à sa maîtresse ce qu'il avait vu. Aux heures où le soleil brûlait, deux anges qui semblaient ombrager Muhammad ﷺ. Un moine chrétien, près de Buṣrâ, qui dit en le voyant sous un arbre : « Nul ne s'est assis sous cet arbre, sinon un prophète. » Et une honnêteté dans les transactions qu'il n'avait jamais vue chez aucun marchand.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [13] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 12 [13] corrigé (deux anges + parole du moine fidèle à Ibn Ishâq).');
