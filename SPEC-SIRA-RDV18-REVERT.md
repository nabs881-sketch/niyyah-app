# SPEC-SIRA-RDV18-REVERT

## Objectif
Revenir sur la durée de la *fatra* dans RDV 18 « Le silence d'Allah ». Ma correction précédente avait introduit « Ibn ʿAbbâs = 25 jours / quelques semaines » (d'après Fatḥ al-Bârî), ce qui **contredit Le Nectar Cacheté** (source d'origine de l'app) : Mubarakpuri rapporte d'Ibn Saʿd, d'après **Ibn ʿAbbâs, que la pause ne fut que de quelques jours**, que c'est « le plus probable », et que les durées de trois ans / deux ans et demi « ne sauraient être vraies ».

On revient donc à **« quelques jours »** (fidèle à la source), tout en **gardant** la correction de grammaire et la reformulation théologique de [15] (« ne comble que les cœurs qui Le cherchent »).

Cible : **data/sira.min.json**, RDV num 18. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv18-revert.js`** puis lance `node scripts/fix-rdv18-revert.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 18);
if (!r) { console.error('RDV 18 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [1] -> quelques jours (Mubarakpuri / Ibn Saad d'Ibn Abbas)
setPara(
  "Combien de temps ? Les sources varient énormément — de douze jours à trois ans. Les trois ans viennent d'Ibn Isḥâq ; mais beaucoup de savants retiennent bien plus court. Ibn ʿAbbâs rapporte vingt-cinq jours ; d'autres parlent de douze, quinze ou quarante jours. L'avis le plus retenu : quelques semaines, pas plusieurs années.",
  "Combien de temps ? Certains récits parlent de trois ans, ou de deux ans et demi. Mais ces durées longues ne tiennent pas. Ibn Saʿd rapporte d'Ibn ʿAbbâs que la pause ne fut que de quelques jours — et c'est l'avis le plus probable."
);

// [2] -> quelques jours
setPara(
  "Quelques semaines. Pas trois ans. Quelques semaines.",
  "Quelques jours. Pas trois ans. Quelques jours."
);

// [15] -> "quelques jours" (on garde la reformulation théologique)
setPara(
  "Et Muhammad ﷺ apprenait, dans ces quelques semaines, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne comble que les cœurs qui Le cherchent.",
  "Et Muhammad ﷺ apprenait, dans ces quelques jours, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne comble que les cœurs qui Le cherchent."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 18 : fatra revenue à « quelques jours » (Mubarakpuri).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===18)); console.log('quelques jours:', /ne fut que de quelques jours/.test(t)&&/Quelques jours\. Pas trois ans/.test(t), '| plus de 25 jours:', !/vingt-cinq jours/.test(t), '| theo gardée:', /ne comble que les cœurs qui Le cherchent/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV18 fatra revient a quelques jours (Mubarakpuri/Ibn Saad d'Ibn Abbas)"
```
