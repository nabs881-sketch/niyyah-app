# SPEC-SIRA-RDV14B

## Objectif
Corriger l'épisode de l'izâr dans le RDV 14 « La pierre et le manteau » ([7]-[11]) :
1. **Attribution** : l'épisode (ʿAbbâs / la ʿawra préservée) est un hadith **authentique de Bukhârî ET Muslim** (Jâbir ibn ʿAbdillâh), pas « le rapport d'Ibn Hishâm ». On corrige [11] et on complète le champ `source` (ajout de Muslim).
2. **Vêtement** : dans cet épisode, le vêtement est l'**izâr** (le pagne du bas) — c'est son retrait qui expose la ʿawra. « manteau » brouille la logique → « izâr » dans [7]-[10].

⚠️ **Ne pas toucher** : le « manteau » du [24] (tissu étendu pour porter la Pierre Noire) est correct, ni le **titre** « La pierre et le manteau » (qui parle de ce manteau-là).

Cible : **data/sira.min.json**, RDV num 14. Badge « authentique » conservé.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-rdv14b.js`** puis lance `node scripts/fix-rdv14b.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 14);
if (!r) { console.error('RDV 14 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

setPara(
  "Muhammad ﷺ et son oncle Al-ʿAbbâs transportaient des pierres comme tout le monde. La pierre était lourde, le tissu de l'izâr — le pagne arabe — frottait l'épaule. Al-ʿAbbâs dit à son neveu : « Mets ton manteau sur ta nuque, pour te protéger des pierres. »",
  "Muhammad ﷺ et son oncle Al-ʿAbbâs transportaient des pierres comme tout le monde. La pierre était lourde, le tissu de l'izâr — le pagne arabe — frottait l'épaule. Al-ʿAbbâs dit à son neveu : « Mets ton izâr sur ta nuque, pour te protéger des pierres. »"
);
setPara(
  "Muhammad ﷺ enleva son manteau. Il le posa sur sa nuque. Et il tomba à terre, les yeux levés vers le ciel.",
  "Muhammad ﷺ enleva son izâr. Il le posa sur sa nuque. Et il tomba à terre, les yeux levés vers le ciel."
);
setPara(
  "Quand il revint à lui, il dit, en serrant son manteau contre lui :",
  "Quand il revint à lui, il dit, en serrant son izâr contre lui :"
);
setPara(
  "« Mon manteau ! Mon manteau ! »",
  "« Mon izâr ! Mon izâr ! »"
);
setPara(
  "Et depuis cet instant, dit le rapport d'Ibn Hishâm, « on a cessé de voir ses parties chastes ».",
  "Et depuis cet instant, rapportent Bukhârî et Muslim, « on a cessé de voir ses parties chastes »."
);

// champ source : ajouter Muslim
if (r.source && typeof r.source === 'object') {
  r.source.fr = "Récit d'Ibn Hishâm ; Bukhârî et Muslim (Jâbir ibn ʿAbdillâh)";
} else {
  r.source = "Récit d'Ibn Hishâm ; Bukhârî et Muslim (Jâbir ibn ʿAbdillâh)";
}

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 14 corrigé (izâr + attribution Bukhârî/Muslim).');
```

---

## Vérif attendue
```
node -e "const d=require('./data/sira.min.json'); const r=d.rdv.find(x=>x.num===14); const t=JSON.stringify(r.paragraphes); console.log('Mon izâr:', /Mon izâr ! Mon izâr/.test(t), '| plus de Mon manteau:', !/Mon manteau/.test(t), '| attrib:', /rapportent Bukhârî et Muslim/.test(t), '| manteau Pierre Noire intact:', /apporte un manteau/.test(t), '| source Muslim:', /Bukhârî et Muslim/.test(JSON.stringify(r.source)), '| total:', d.rdv.length)"
```
Attendu : `true | true | true | true | true | total: 365`.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV14 izar (pas manteau) dans episode awra + attribution Bukhari/Muslim"
```
