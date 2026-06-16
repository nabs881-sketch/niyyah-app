# SPEC-SIRA-RDV23-REVERT

## Objectif
Annuler une affirmation non étayée introduite dans RDV 23 [1] (« La voix sur Ṣafâ ») : « Bilâl… payait déjà — avant même que Quraych tout entière ne se dresse ». Les sources **ne permettent pas** d'affirmer que Bilâl était torturé avant l'appel public ; elles situent sa persécution (comme celle de Sumayya) **après** la prédication publique.

Option retenue (a) : **remettre RDV 23 [1] dans sa version d'origine**, et **conserver** le cadrage déjà appliqué de RDV 22 [30] (la persécution tourne au sang avec l'appel public). Ainsi rien de faux n'est affirmé, et l'ordre des RDV reste un choix thématique assumé.

Cible : **data/sira.min.json**, RDV num 23. RDV 22 **non touché**. `source` inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv23-revert.js`** puis lance `node scripts/fix-rdv23-revert.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 23);
if (!r) { console.error('RDV 23 introuvable'); process.exit(1); }

const oldFr = "Trois ans depuis Hirâ. Trois ans pendant lesquels l'appel n'avait pas encore été proclamé en public : le Prophète ﷺ ne parlait qu'à ceux qu'il connaissait, et les compagnons priaient en secret, dans les ravins. Mais un esclave ne peut rien cacher à son maître : ceux comme Bilâl, dont la conversion s'était sue dans leur propre maison, payaient déjà — avant même que Quraych tout entière ne se dresse contre le message.";
const newFr = "Trois ans depuis Hirâ. Trois ans pendant lesquels l'islam était resté caché. Le Prophète ﷺ ne parlait qu'à ceux qu'il connaissait. Les compagnons priaient en secret, dans les ravins. Quand on les surprenait, ils s'arrêtaient.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [1] introuvable (déjà à l\\'origine ?)'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 23 [1] remis à sa version d\\'origine.');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const g=n=>JSON.stringify(d.rdv.find(x=>x.num===n)); console.log('RDV23 origine:', /l.islam était resté caché/.test(g(23))&&!/un esclave ne peut rien cacher/.test(g(23)), '| RDV22 cadrage conservé:', /tournerait au sang surtout quand l.appel deviendrait public/.test(g(22)), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV23 [1] revert version origine (retire datation Bilal non etayee)"
```
