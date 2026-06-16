# SPEC-SIRA-MUBARAK-1

## Objectif
Retirer les références explicites à « Mubarakpuri » / ses citations directes dans 4 RDV de la Sîra, et reformuler dans la voix de l'app — le contenu reste, re-sourcé aux sources primaires. Lot d'essai (4 sur 30).

Cible : **data/sira.min.json**. Pour chaque cas, remplacer la chaîne EXACTE (texte `fr` d'un paragraphe) par la nouvelle. Ces chaînes sont uniques dans le fichier → remplacement littéral sûr.

---

### RDV 119 — re-sourcé au qunût (Bukhari/Muslim)
REMPLACER :
```
Mubarakpuri rapporte : « Le Prophète ﷺ fut profondément affecté. Plus affecté, peut-être, que par aucune autre nouvelle ».
```
PAR :
```
Jamais, peut-être, une nouvelle ne l'avait autant affecté. Un mois durant, à chaque prière, il invoqua Allah contre les tribus qui avaient trahi — Riʿl, Dhakwān, ʿUṣayya.
```

### RDV 130 — dramatisation → voix de l'app
REMPLACER :
```
Mubarakpuri écrit : « Si jamais cette armée était parvenue aux murs de Médine, ç'aurait été la fin. Peut-être les musulmans auraient été exterminés. »
```
PAR :
```
Si cette armée atteignait les murs de Médine, c'en était fini. La communauté tout entière pouvait être exterminée. Tout le monde, à Médine, le savait.
```

### RDV 170 — motif coranique (59:2), attribution retirée
REMPLACER :
```
Allah, dit Mubarakpuri, « jeta la terreur dans le cœur » des autres oasis juives du nord. Avant même que le Messager d'Allah ﷺ ne reparte vers Médine, des émissaires arrivèrent.
```
PAR :
```
Allah jeta la terreur dans le cœur des autres oasis juives du nord. Avant même que le Messager d'Allah ﷺ ne reparte vers Médine, des émissaires arrivèrent.
```

### RDV 171 — fait dans Ibn Hishâm (déjà la source)
REMPLACER :
```
Le Prophète ﷺ ordonna à tous les compagnons qui avaient été à Ḥudaybiya de l'accompagner. Mubarakpuri rapporte : « Aucun de ceux qui avaient été à Ḥudaybiya ne resta en arrière, sauf ceux qui étaient morts dans l'intervalle ».
```
PAR :
```
Le Prophète ﷺ ordonna à tous les compagnons qui avaient été à Ḥudaybiya de l'accompagner. Aucun ne resta en arrière — sauf ceux qui étaient morts dans l'intervalle.
```

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); console.log([119,130,170,171].filter(n=>/Mubarakpuri/.test(JSON.stringify(d.rdv.find(r=>r.num===n)))).length)"` → doit afficher `0`.
- JSON toujours valide : `node -e "require('./data/sira.min.json'); console.log('OK')"`.

## Build (OBLIGATOIRE — bump SW pour invalider le cache runtime)
```
npm run build
git add -A
git commit -m "sira: retire Mubarakpuri (lot 1: RDV 119,130,170,171) -> sources primaires"
```
