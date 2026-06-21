# SPEC-SIRA-RDV119

## Objectif
Enrichir le RDV 119 (Les Réciteurs) de 1665 à ~2500 caractères.
Ajouter le verset révélé et abrogé, et le témoignage d'Anas sur les Ansâr.

## data/sira.min.json — RDV num:119

### Modification 1 — Après le paragraphe italic "Soixante-dix de l'élite musulmane. Tués en un matin."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Allah révéla pour eux un verset que les Compagnons récitèrent pendant un temps — jusqu'à son abrogation : *« Transmettez à notre peuple de notre part : nous avons rencontré notre Seigneur, Il fut satisfait de nous et nous fûmes satisfaits de Lui. »* C'était leur message d'outre-tombe. Un verset qui n'est pas resté dans le Coran — mais qui a existé, et que les Compagnons ont porté dans leur cœur.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe "Le Messager d'Allah ﷺ pleura."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Anas ibn Mālik rapporterait plus tard : « Nous ne connaissons aucune tribu arabe qui ait perdu plus de martyrs que les Anṣâr — et ils auront la supériorité au Jour de la Résurrection. Soixante-dix à Uḥud. Soixante-dix à Bi'r Maʿūna. Soixante-dix à al-Yamama. » Bi'r Maʿūna était au milieu. Entre deux batailles. Mais c'était peut-être la plus douloureuse des trois.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe "Un mois durant, à chaque prière, il invoqua Allah contre les tribus."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Il les nommait : Riʿl, Dhakwân, Liḥyân, ʿUsayya. À chaque prière, les Compagnons l'entendaient les maudire. C'était inhabituel — le Prophète ﷺ ne maudissait pas. Mais Bi'r Maʿūna n'était pas une défaite. C'était un assassinat. Contre des envoyés de paix. Contre des porteurs du Coran. Cela méritait autre chose.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV119.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv119 enrichissement verset abroge temoignage Anas Ansar qunut" && git push
```
