# SPEC-SIRA-ATONTOUR

## Objectif
Le RDV 339 « À ton tour » clôt la **vie** du Prophète ﷺ (la biographie), mais ce n'est pas le dernier jour : du contenu complémentaire suit (fin des temps, vertus, quizz) jusqu'à 365. On retire la fausse mention « 365 jours / la fin », et on annonce ce qui suit.

Cible : **data/sira.min.json**, RDV num 339. Deux remplacements de texte exacts.

---

### Remplacement 1 — retirer le décompte « 365 jours »
REMPLACER :
```
Trois cent soixante-cinq jours. Tu as marché de la première Révélation dans la grotte de Ḥirāʾ jusqu'à la tombe à Médine.
```
PAR :
```
Tu as parcouru toute sa vie. De la première Révélation dans la grotte de Ḥirāʾ jusqu'à la tombe à Médine.
```

### Remplacement 2 — annoncer ce qui suit (au lieu de « la Sîra se termine »)
REMPLACER :
```
La Sīra ne se termine pas avec sa mort. Elle se termine quand tu refermes le livre et que tu te lèves.
```
PAR :
```
Sa vie est scellée — mais le chemin ne s'arrête pas à la tombe. Il t'a parlé de l'après : les signes de la fin, le retour. Et il t'a laissé des manières d'être — une prière la nuit, un sourire, un pardon — qui sont à toi désormais. Les jours qui suivent te les ouvrent.
```

> Le reste du RDV (la parole d'Ibn ʿUmar, le Coran et la Sunna, « mes frères ceux qui viendront après », « C'est de toi qu'il parlait. À ton tour de marcher. ») reste **inchangé** : la fin émotionnelle est conservée, on enlève juste le « 365 » et le « ça s'arrête ici ».

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); const r=d.rdv.find(x=>x.num===339); const t=JSON.stringify(r); console.log('365 retiré:', !/Trois cent soixante-cinq/.test(t), '| annonce suite:', /Les jours qui suivent/.test(t))"` → `true | true`.
- JSON valide.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: RDV339 A ton tour - retire le decompte 365, annonce le contenu qui suit"
```
