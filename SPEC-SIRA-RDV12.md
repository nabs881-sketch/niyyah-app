# SPEC-SIRA-RDV12

## Objectif
Corriger le paragraphe [13] du RDV 12 « Khadîja, la femme qui regardait » (rapport de Maysara), après vérification du texte d'Ibn Ishâq. Deux inexactitudes :
1. « un nuage qui semblait suivre » → en réalité **deux anges qui l'ombrageaient** (Ibn Ishâq).
2. Le moine n'a pas dit « le dernier des prophètes » → il a dit que **nul sinon un prophète ne s'assoit sous cet arbre** (Nastûra). La conclusion « prophète de son peuple » était celle de **Waraqa**, pas du moine.

Cible : **data/sira.min.json**, RDV num 12. `source` (Récit d'Ibn Hishâm) inchangé → badge « Sîra » conservé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv12.js`** puis lance `node scripts/fix-rdv12.js` :

```js
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
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===12)); console.log('nuage retiré:', !/nuage qui semblait suivre/.test(t), '| deux anges:', /deux anges qui semblaient ombrager/.test(t), '| moine corrigé:', /sinon un prophète/.test(t)&&!/dernier des prophètes/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV12 [13] corrige (deux anges au lieu du nuage, parole du moine fidele a Ibn Ishaq)"
```
