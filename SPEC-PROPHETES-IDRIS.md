# SPEC-PROPHETES-IDRIS

## Objectif
Mettre l'épisode **Idris J5** au même niveau de rigueur que tout le reste du corpus Prophètes : retirer le nom non authentique « Azraël », signaler honnêtement les Isrâ'îliyyât (le voyage goûter-la-mort), ne plus présenter l'élévation corporelle comme un fait, et adoucir la station. On garde le récit (style de l'app : on conserve mais on signale), on ajoute juste les drapeaux que l'auteur met partout ailleurs.

Cible : **prophetes.json**. Remplacer chaque chaîne EXACTE.

---

### 1) Retrait du nom « Azraël »
REMPLACER :
```
Un ange du nom d'Azraël, dit la tradition, descendit sur terre pour le visiter.
```
PAR :
```
L'ange de la mort, dit la tradition, descendit sur terre pour le visiter. (Le nom « Azraël » qu'on lui donne parfois ne figure pas dans les sources authentiques, qui ne parlent que de « l'ange de la mort ».)
```

### 2) Remplacer l'affirmation « monté vivant » par le cadrage savant honnête
REMPLACER :
```
Il n'y eut pas de corps à enterrer. Pas de tombe à visiter. Pas de récit de mort à raconter. Idris fut soulevé un matin entre deux respirations, et personne ne le revit jamais. C'est peut-être pour cela que la tradition rapporte que le Prophète Muhammad ﷺ, lors de son Ascension nocturne, rencontra Idris dans le quatrième ciel. Encore là. Toujours là. Pas redescendu.
```
PAR :
```
Que retenir ? Les savants divergent sur le sens de « élevé à une position très haute ». Pour beaucoup, c'est une élévation de rang et d'honneur ; pour d'autres, une élévation du corps — Idris aurait été enlevé vivant. Le récit du voyage avec l'ange de la mort, lui, provient de traditions anciennes que tous les savants ne retiennent pas : il faut le recevoir comme tel. Ce qui est sûr et authentique, en revanche, c'est ceci : lors de son Ascension nocturne, le Prophète Muhammad ﷺ rencontra Idris dans le quatrième ciel.
```

### 3) Adoucir la station (ne plus bâtir de doctrine sur le corps)
REMPLACER :
```
Certaines vies pures ne se terminent pas — elles montent. Idris enseigne que l'élévation spirituelle peut transformer non seulement l'âme, mais le destin même du corps.
```
PAR :
```
Le Coran dit peu d'Idris, et garde son mystère entier. Ce qu'on en retient sans risque, c'est l'élévation : une vie d'adoration si dense qu'Allah lui-même la qualifie de « position très haute ». L'élévation que vise le croyant n'est pas d'abord celle du corps — c'est celle de l'âme qui, à force de présence, monte.
```

### 4) Champ source : ajouter le drapeau (comme les autres épisodes)
REMPLACER :
```
Coran 19:56-57, 21:85-86 · Bukhari 3342 (rencontre lors de l'Ascension) · Tafsir Ibn Kathir et Tabari · Tradition rapportée par Ibn Abbas
```
PAR :
```
Coran 19:56-57, 21:85-86 · Bukhari 3342 (rencontre lors de l'Ascension nocturne — authentique) · Tafsir Ibn Kathir et Tabari · Note : le nom « Azraël » pour l'ange de la mort, et le récit du voyage (goûter la mort, voir l'Enfer et le Paradis, refus de redescendre), proviennent de traditions anciennes / Isrâ'îliyyât non établies, à signaler comme tel ; les savants divergent sur le sens de « élevé à une position très haute » (rang d'honneur ou élévation du corps).
```

---

## Vérif attendue
- `node -e "const a=require('./prophetes.json'); const e=a.find(x=>x.jour===5); console.log('Azraël présent:', /Azraël/.test(JSON.stringify(e)))"` → doit afficher la mention seulement dans la parenthèse explicative et la note (plus comme nom asséné). Pour contrôle strict du « monté vivant » : `console.log(/personne ne le revit jamais/.test(JSON.stringify(e)))` → `false`.
- JSON valide : `node -e "require('./prophetes.json'); console.log('OK')"`.

## Build (OBLIGATOIRE — JSON en cache runtime)
```
npm run build
git add -A
git commit -m "prophetes: Idris J5 aligne sur le standard du corpus (retrait Azraël, flag Israiliyyat, station adoucie)"
```
