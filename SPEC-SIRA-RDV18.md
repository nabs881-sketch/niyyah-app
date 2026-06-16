# SPEC-SIRA-RDV18

## Objectif
Corriger le RDV 18 « Le silence d'Allah » :
1. **[1]-[2]** : la durée de la *fatra* est mal attribuée. Ibn ʿAbbâs rapporte **vingt-cinq jours** (pas « quelques jours ») ; les « trois ans » viennent d'**Ibn Isḥâq** ; la fourchette courte va de 12 à 40 jours = quelques **semaines**. On corrige aussi une faute de grammaire (« Il s'appuie » après un pluriel).
2. **[15]** : « Allah ne se donne » est une formulation théologiquement bancale en islam (registre chrétien/mystique). On reformule selon le sens coranique (Coran 40:60), et on met « semaines » pour la cohérence.

Cible : **data/sira.min.json**, RDV num 18. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv18.js`** puis lance `node scripts/fix-rdv18.js` :

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

// [1] durée exacte + grammaire
setPara(
  "Combien de temps ? Les sources varient. Certains récits parlent de plusieurs années — trois ans, deux ans et demi. Les historiens rigoureux modernes réfutent ces durées longues. Il s'appuie sur Ibn ʿAbbâs — l'un des plus rigoureux transmetteurs de la Sîra — qui rapporte que la pause fut de quelques jours seulement.",
  "Combien de temps ? Les sources varient énormément — de douze jours à trois ans. Les trois ans viennent d'Ibn Isḥâq ; mais beaucoup de savants retiennent bien plus court. Ibn ʿAbbâs rapporte vingt-cinq jours ; d'autres parlent de douze, quinze ou quarante jours. L'avis le plus retenu : quelques semaines, pas plusieurs années."
);

// [2]
setPara(
  "Quelques jours. Pas trois ans. Quelques jours.",
  "Quelques semaines. Pas trois ans. Quelques semaines."
);

// [15] reformulation théologique + cohérence "semaines"
setPara(
  "Et Muhammad ﷺ apprenait, dans ces quelques jours, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne se donne qu'à ceux qui Le réclament.",
  "Et Muhammad ﷺ apprenait, dans ces quelques semaines, ce que l'humanité allait apprendre à travers lui pour les siècles à venir : Allah ne comble que les cœurs qui Le cherchent."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 18 corrigé ([1]-[2] durée fatra, [15] reformulation théologique).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===18)); console.log('[1] 25j:', /vingt-cinq jours/.test(t)&&/Ibn Isḥâq/.test(t), '| [2] semaines:', /Quelques semaines\. Pas trois ans/.test(t), '| [15] reformulé:', !/Allah ne se donne/.test(t)&&/ne comble que les cœurs qui Le cherchent/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV18 duree fatra (Ibn Abbas 25j, Ibn Ishaq 3 ans) + reformulation theologique [15]"
```
