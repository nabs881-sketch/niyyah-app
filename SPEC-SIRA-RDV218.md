# SPEC-SIRA-RDV218

## Objectif
Corriger le paragraphe [13] du RDV 218 « Le compagnon suprême » (parole d'Aïcha sur la mort du Prophète ﷺ). Deux raisons :
1. **Adab** envers les Mères des croyants — retirer « mes seins ».
2. **Fidélité au hadith** — la version authentique dit qu'il mourut *bayna ḥāqinatî wa dhâqinatî* (entre la gorge et le menton) / *bayna saḥrî wa naḥrî* (entre le haut de la poitrine et la gorge), **pas** « les seins ». « seins » est une sur-traduction.

Cible : **data/sira.min.json**, RDV num 218. `source` inchangé → badge inchangé. La mention authentique des salives mêlées (le siwâk assoupli par Aïcha) est conservée.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv218.js`** puis lance `node scripts/fix-rdv218.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 218);
if (!r) { console.error('RDV 218 introuvable'); process.exit(1); }

const oldFr = "« Il est mort entre mon menton et mes seins. Et nos salives se sont mélangées. »";
const newFr = "« Il est mort entre ma gorge et mon menton. Et nos salives se sont mélangées. »";

const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
if (!para) { console.error('Para [13] introuvable'); process.exit(1); }
if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 218 [13] corrigé (adab + fidélité hadith).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===218)); console.log('seins retiré:', !/mon menton et mes seins/.test(t), '| gorge/menton:', /entre ma gorge et mon menton/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV218 [13] adab + fidelite hadith (sahr/nahr, pas seins)"
```
