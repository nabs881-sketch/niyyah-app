# SPEC-SIRA-PARTIE2

## Objectif
Corriger 4 RDV de la Partie II après vérification (web + sources classiques). Cible : **data/sira.min.json**.

| RDV | Correction | Raison |
|---|---|---|
| **9** [10] | retirer « Trois mois auparavant, » | Incohérence interne : [0] dit 6 ans, [10] « après quatre ans dans le désert » → le « trois mois » ne tombe pas. |
| **11** [0] | « douze ans, deux mois, dix jours » → « douze ans » | Précision non sourcée. |
| **13** [0]-[1] | « vingt vaches » → « vingt jeunes chamelles » | **Erreur confirmée web** : la dot = vingt *bakra* (jeunes chamelles), pas des vaches. Confusion bakra/baqara. |
| **14** [0]-[1] | retirer « torrent de ʿArim » + chiffres incohérents | *Sayl al-ʿArim* = barrage de Maʾrib au Yémen (Coran 34:16), pas La Mecque. Et « 50 ans avant / 35 ans après / à 35 ans » ne tombent pas. |

Aucun changement de `source` → les badges restent inchangés.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-partie2.js`** puis lance `node scripts/fix-partie2.js` :

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

// --- RDV 9 : retirer "Trois mois auparavant, "
setPara(9,
  "Trois mois auparavant, on l'avait ramené chez Aminah après quatre ans dans le désert. Quatre années à téter le sein d'Halima, à courir avec les chevreaux, à apprendre la langue pure des Banî Saʿd. Il avait à peine eu le temps de revoir sa mère.",
  "On l'avait ramené chez Aminah après quatre ans dans le désert. Quatre années à téter le sein d'Halima, à courir avec les chevreaux, à apprendre la langue pure des Banî Saʿd. Il avait à peine eu le temps de revoir sa mère."
);

// --- RDV 11 : âge
setPara(11,
  "Il avait douze ans, deux mois, dix jours.",
  "Il avait douze ans."
);

// --- RDV 13 : vaches -> chamelles
setPara(13,
  "La dot fut vingt vaches.",
  "La dot fut de vingt jeunes chamelles."
);
setPara(13,
  "C'est ce que rapportent les sources. Pas vingt chameaux. Pas vingt mille dirhams. Vingt vaches. Une somme considérable, mais marquée d'une simplicité que les fastes Quraychites n'avaient pas l'habitude de voir pour un mariage de cette importance.",
  "C'est ce que rapportent les sources — vingt bakra, de jeunes chamelles. D'autres récits parlent de douze onces et demie d'argent. Une dot considérable, mais sans le faste tapageur que les Quraychites étalaient d'ordinaire pour un mariage de cette importance."
);

// --- RDV 14 : ʿArim + chronologie
setPara(14,
  "Cinquante ans avant la mission prophétique, un torrent — le torrent de ʿArim — s'était abattu sur la Mecque. Il avait descendu vers la Kaaba avec une violence qui avait failli faire basculer le temple. Les fondations étaient lézardées. Les murs avaient bougé.",
  "Des années avant la mission, une crue avait dévalé sur la Mecque et endommagé la Kaaba. Les fondations étaient lézardées, les murs avaient bougé."
);
setPara(14,
  "Trente-cinq ans après — alors que Muhammad ﷺ avait trente-cinq ans — les Quraychites décidèrent que la Kaaba n'attendrait plus. Il fallait la reconstruire.",
  "Quand Muhammad ﷺ eut trente-cinq ans, les Quraychites décidèrent que la Kaaba n'attendrait plus. Il fallait la reconstruire."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('Partie II corrigée : J9, J11, J13, J14.');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const g=n=>JSON.stringify(d.rdv.find(x=>x.num===n)); console.log('J9:', !/Trois mois auparavant/.test(g(9)), '| J11:', !/deux mois, dix jours/.test(g(11)), '| J13:', /jeunes chamelles/.test(g(13))&&!/vingt vaches/.test(g(13)), '| J14:', !/torrent de ʿArim/.test(g(14)), '| total:', d.rdv.length)"
```
Attendu : `true | true | true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: corrections Partie II (J9 chrono, J11 age, J13 chamelles, J14 Arim)"
```
