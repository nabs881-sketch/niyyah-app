# SPEC-SIRA-DATE-HIRA

## Objectif
Harmoniser la date de la nuit de la première révélation, qui se contredisait entre deux RDV :
- **RDV 16 [0]** disait « 21 Ramadân » (calcul de Mubarakpuri : lundi 21 Ramadân, 10 août 610).
- **RDV 291 [1]** disait « 27 Ramadân » (Laylat al-Qadr populaire).

La date exacte est inconnue (sources : 17, 21, 23, 24, 25, 27 ou 29). On aligne tout sur le package cohérent de RDV 16 (lundi + 10 août + âge) → **21 Ramadân partout**. Et on corrige le détail solaire de RDV 16 (Mubarakpuri donne « 3 mois et 22 jours », pas 20).

Cible : **data/sira.min.json**, RDV num 291 et 16. `source` inchangé → badges inchangés.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-date-hira.js`** puis lance `node scripts/fix-date-hira.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));

const setPara = (num, oldFr, newFr) => {
  const r = d.rdv.find(x => x.num === num);
  if (!r) { console.error('RDV ' + num + ' introuvable'); process.exit(1); }
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('RDV ' + num + ' — para introuvable : ' + oldFr.slice(0, 40)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// RDV 291 : 27 -> 21
setPara(291,
  "Le Messager d'Allah ﷺ — quarante ans, pas encore prophète publiquement, mais ayant l'habitude des retraites — descendait depuis quelques mois dans la grotte de Ḥirāʾ pour méditer. Cette nuit-là, c'était le 27 du mois de Ramaḍān. Une nuit qui changerait l'histoire.",
  "Le Messager d'Allah ﷺ — quarante ans, pas encore prophète publiquement, mais ayant l'habitude des retraites — descendait depuis quelques mois dans la grotte de Ḥirāʾ pour méditer. Cette nuit-là, c'était le 21 du mois de Ramaḍān. Une nuit qui changerait l'histoire."
);

// RDV 16 : 20 jours -> 22 jours (calcul solaire Mubarakpuri)
setPara(16,
  "Il avait quarante années lunaires, six mois et douze jours. Selon les calculs solaires : trente-neuf ans, trois mois et vingt jours.",
  "Il avait quarante années lunaires, six mois et douze jours. Selon les calculs solaires : trente-neuf ans, trois mois et vingt-deux jours."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('Date de Hirâ harmonisée (21 Ramadân partout ; solaire 22 jours).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const g=n=>JSON.stringify(d.rdv.find(x=>x.num===n)); console.log('RDV291=21:', /le 21 du mois de Ramaḍān/.test(g(291))&&!/le 27 du mois de Ramaḍān/.test(g(291)), '| RDV16=22j:', /trois mois et vingt-deux jours/.test(g(16)), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: harmonise date premiere revelation (21 Ramadan partout, solaire 22 jours)"
```
