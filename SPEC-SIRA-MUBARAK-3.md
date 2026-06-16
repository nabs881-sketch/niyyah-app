# SPEC-SIRA-MUBARAK-3

## Objectif
Retirer les dernières références « Mubarakpuri / Nectar Cacheté » (4 RDV portrait : 228, 248, 249, 250). Ici c'est de la réécriture (ses passages sont reformulés dans la voix de l'app et re-sourcés à l'authentique), pas juste une coupe.

Cible : **data/sira.min.json**. Remplacer chaque chaîne EXACTE par la nouvelle.

---

### RDV 228 [9] — conclusion (sa citation de livre → voix de l'app)
REMPLACER :
```
Mubarakpuri, à la fin du Nectar Cacheté, écrit cette phrase : « De toute la richesse humaine, seul reste ce que l'homme a transmis. De toute la gloire des rois, il ne reste que la poussière. Mais des paroles d'un Prophète, il reste tout — et chaque génération en redécouvre la fraîcheur, comme si elles venaient d'être prononcées la veille ».
```
PAR :
```
Voilà l'héritage. Les rois laissent des tombeaux que le temps efface, des trésors que d'autres se partagent. Lui a laissé des mots. Quatorze siècles plus tard, on les récite encore — intacts, vivants, comme s'ils venaient d'être prononcés la veille.
```

### RDV 248 [0] — intro (retrait attribution)
REMPLACER :
```
Mubarakpuri résume ainsi le caractère du Prophète ﷺ face à la maladresse des autres :
```
PAR :
```
Face à la maladresse des autres, son caractère prenait le contre-pied de la réaction humaine ordinaire.
```

### RDV 248 [1] — sa citation → hadith authentique d'Anas (Bukhari/Muslim)
REMPLACER :
```
« Tout homme de qualité peut faire des faux pas. Mais lui — l'abondance de la perversité ne le rendait que plus patient. Le gaspillage des ignorants ne le rendait que plus indulgent. »
```
PAR :
```
Anas, qui le servit dix années, rapporte : « Jamais il ne me dit "uff" ; jamais il ne me reprocha ce que j'avais fait, ni ce que j'avais laissé. »
```

### RDV 249 [0] — intro (retrait attribution)
REMPLACER :
```
Mubarakpuri continue son portrait :
```
PAR :
```
Il aimait les pauvres — d'un amour réel, pas de façade.
```

### RDV 249 [1] — sa citation → faits attestés, voix de l'app
REMPLACER :
```
« Il aimait les pauvres. Il fréquentait leur milieu. Il assistait à leurs enterrements. Jamais il ne méprisait un pauvre pour sa pauvreté. »
```
PAR :
```
Il fréquentait leur compagnie. Il visitait leurs malades. Il suivait leurs funérailles. Jamais il ne méprisa un homme pour sa pauvreté.
```

### RDV 250 [10] — conclusion de son livre → voix de l'app
REMPLACER :
```
Mubarakpuri lui-même conclut son grand livre en disant qu'aucune description ne suffira jamais. Que les compagnons eux-mêmes, qui l'avaient vu chaque jour, ne pouvaient pas le décrire entièrement.
```
PAR :
```
Au fond, aucune description ne suffira jamais. Les compagnons eux-mêmes, qui le voyaient chaque jour, ne parvenaient pas à le peindre tout entier.
```

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); let n=0; d.rdv.forEach(r=>{if(/Mubarakpuri|Nectar Cacheté/i.test(JSON.stringify(r)))n++;}); console.log('Mubarakpuri total Sira:',n)"` → doit afficher `0`.
- JSON valide : `node -e "require('./data/sira.min.json'); console.log('OK')"`.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "sira: retire Mubarakpuri (lot 3: 4 RDV portrait) -> reecriture sourcee authentique"
```
