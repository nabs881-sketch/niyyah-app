# SPEC-SIRA-RDV20

## Objectif
Corriger le paragraphe [17] du RDV 20 « Les trois du premier jour ». Le texte qualifie ʿAlî d'« orphelin », ce qui est **faux** : son père Abû Tâlib était vivant (il apparaît vivant dans ce même RDV en [25], et meurt ~10 ans plus tard). Le Prophète ﷺ avait recueilli ʿAlî pour soulager Abû Tâlib appauvri (ce que dit [5]), non parce qu'il était orphelin. On lève l'erreur et la contradiction interne.

Cible : **data/sira.min.json**, RDV num 20. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv20.js`** puis lance `node scripts/fix-rdv20.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 20);
if (!r) { console.error('RDV 20 introuvable'); process.exit(1); }

const oldFr = "Le premier enfant croyant : un orphelin sous tutelle.";
const newFr = "Le premier enfant croyant : un enfant recueilli.";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [17] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 20 [17] corrigé (ʿAlî recueilli, pas orphelin).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===20)); console.log('orphelin retiré:', !/un orphelin sous tutelle/.test(t), '| recueilli:', /Le premier enfant croyant : un enfant recueilli/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV20 [17] Ali recueilli, pas orphelin (pere Abu Talib vivant)"
```
