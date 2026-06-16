# SPEC-SIRA-RDV21

## Objectif
Corriger deux erreurs du RDV 21 « Abû Bakr appelle » :
1. **[8]** : généalogie d'Az-Zubayr inversée. Il est neveu de Khadîja **par son père al-ʿAwwâm** (frère de Khadîja), et cousin du Prophète ﷺ **par sa mère Ṣafiyya** (tante du Prophète) — pas « neveu de Khadîja par sa mère Ṣafiyya ».
2. **[16]** : « Tous parmi les dix du Paradis » est faux. **Six sur sept** seulement : ʿUbayda ibn al-Ḥârith n'en fait pas partie (confusion avec Abû ʿUbayda ibn al-Jarrâḥ, qui lui est l'un des dix).

Cible : **data/sira.min.json**, RDV num 21. `source` inchangé → badge inchangé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv21.js`** puis lance `node scripts/fix-rdv21.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 21);
if (!r) { console.error('RDV 21 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 50)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// [8] généalogie Az-Zubayr
setPara(
  "Az-Zubayr ibn al-ʿAwwâm. Le neveu de Khadîja par sa mère Ṣafiyya. À peine plus de quinze ans. Brave, fougueux. Un jour, plus tard, on dirait à tort que le Prophète ﷺ avait été tué — Az-Zubayr saisirait son épée et courrait dans les rues de la Mecque pour aller venger son maître. Le Prophète ﷺ, voyant cela, dirait : « À chaque prophète, Allah a donné un disciple. Mon disciple, c'est Az-Zubayr. »",
  "Az-Zubayr ibn al-ʿAwwâm. Le neveu de Khadîja par son père al-ʿAwwâm, le frère de Khadîja — et le cousin du Prophète ﷺ par sa mère Ṣafiyya. À peine plus de quinze ans. Brave, fougueux. Un jour, plus tard, on dirait à tort que le Prophète ﷺ avait été tué — Az-Zubayr saisirait son épée et courrait dans les rues de la Mecque pour aller venger son maître. Le Prophète ﷺ, voyant cela, dirait : « À chaque prophète, Allah a donné un disciple. Mon disciple, c'est Az-Zubayr. »"
);

// [16] six d'entre eux (pas tous)
setPara(
  "Sept compagnons majeurs. Tous convertis grâce au seul Abû Bakr. Tous parmi ceux qu'on appellera plus tard les ʿAshara al-Mubashsharûn — les dix annoncés du Paradis, les dix compagnons à qui le Prophète ﷺ promettrait personnellement le Jardin de leur vivant.",
  "Sept compagnons majeurs. Tous convertis grâce au seul Abû Bakr. Six d'entre eux compteront parmi les ʿAshara al-Mubashsharûn — les dix annoncés du Paradis, les dix compagnons à qui le Prophète ﷺ promettrait personnellement le Jardin de leur vivant."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 21 corrigé ([8] généalogie Az-Zubayr, [16] six d\\'entre eux).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const t=JSON.stringify(d.rdv.find(x=>x.num===21)); console.log('[8] père al-Awwâm:', /neveu de Khadîja par son père al-ʿAwwâm/.test(t)&&!/neveu de Khadîja par sa mère/.test(t), '| [16] six:', /Six d.entre eux compteront/.test(t)&&!/Tous parmi ceux/.test(t), '| total:', d.rdv.length)"
```
Attendu : `true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV21 [8] genealogie Az-Zubayr + [16] six (pas tous) parmi les dix du Paradis"
```
