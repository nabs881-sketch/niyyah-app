# SPEC-SIRA-RDV19

## Objectif
Corriger le RDV 19 « Lève-toi et avertis » (deuxième révélation, al-Muddaththir) :
1. **[11]** « Wa andhir » → « Fa-andhir » (74:2 = *qum fa-andhir*, particule *fa* et non *wa*).
2. **[20]** présente 5:3 comme « le verset final » : imprécis. 5:3 est le verset de l'**achèvement** (révélé à ʿArafât) ; l'avis le plus sûr (Ibn Ḥajar, *Fatḥ al-Bârî*, d'après Ibn ʿAbbâs) est que l'**ultime verset descendu fut 2:281**. On reformule.

Cible : **data/sira.min.json**, RDV num 19. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv19.js`** puis lance `node scripts/fix-rdv19.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 19);
if (!r) { console.error('RDV 19 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [11] Fa-andhir
setPara(
  "Et avertis. — Wa andhir. Avertis qui ? Avertis l'humanité. Le silence d'Allah était fini. Le temps de la solitude méditative à Hirâ était fini. Le temps de l'appel public allait commencer.",
  "Et avertis. — Fa-andhir. Avertis qui ? Avertis l'humanité. Le silence d'Allah était fini. Le temps de la solitude méditative à Hirâ était fini. Le temps de l'appel public allait commencer."
);

// [20] 5:3 achèvement + 2:281 ultime verset
setPara(
  "Plus jamais de silence. À partir de cette nuit, et pendant vingt-trois ans, le ciel parlerait. Sans pause. Verset après verset. Sourate après sourate. Jusqu'au verset final, révélé peu avant la mort du Prophète ﷺ : « Aujourd'hui, J'ai parachevé pour vous votre religion... » (5:3)",
  "Plus jamais de silence. À partir de cette nuit, et pendant vingt-trois ans, le ciel parlerait. Sans pause. Verset après verset. Sourate après sourate. Jusqu'à l'achèvement, scellé à ʿArafât peu avant sa mort : « Aujourd'hui, J'ai parachevé pour vous votre religion... » (5:3). Et l'avis le plus sûr veut que l'ultime verset descendu fut : « Craignez le Jour où vous serez ramenés vers Allah » (2:281)."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 19 corrigé ([11] Fa-andhir, [20] achèvement + 2:281).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===19)); console.log('[11] fa-andhir:', /Fa-andhir/.test(t)&&!/Wa andhir/.test(t), '| [20] 2:281:', /2:281/.test(t)&&/achèvement/.test(t)&&!/Jusqu.au verset final/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV19 [11] Fa-andhir + [20] 5:3 achevement et 2:281 ultime verset"
```
