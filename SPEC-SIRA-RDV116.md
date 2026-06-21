# SPEC-SIRA-RDV116

## Objectif
Enrichir le RDV 116 (Khubayb) de 1575 à ~2600 caractères.
Ajouter la grappe de raisin et l'épisode de l'enfant — tous deux dans Bukhari.

## data/sira.min.json — RDV num:116

### Modification 1 — Après le paragraphe "La famille d'al-Ḥārith ibn ʿĀmir... avait acheté Khubayb pour le tuer."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Pendant sa captivité, Khubayb demanda un rasoir pour s'épiler. La femme de la maison le lui prêta. Un jour, distraite, elle se retourna et vit son jeune fils assis sur la cuisse de Khubayb — le rasoir dans la main du prisonnier. Elle fut saisie d'effroi. Khubayb remarqua la peur sur son visage. Il dit : « Tu crains que je ne le tue ? Je ne ferai jamais cela. » Elle dit plus tard : « Par Allah, je n'ai jamais vu un prisonnier meilleur que Khubayb. »",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le nouveau paragraphe ci-dessus
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Elle dit aussi : « Un jour, je le trouvai en train de manger une grappe de raisin — les mains enchaînées. » Il n'y avait pas de raisin à La Mecque à cette saison. Elle ne comprit pas d'où il venait. C'était une grâce pour un homme qui attendait la mort.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe "On le tua."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "La femme qui l'avait gardé prisonnier dit qu'elle l'entendit, sur la croix, dire sa prière à voix haute. Elle dit : « Par Allah, je n'ai jamais entendu quelqu'un lire le Coran d'une plus belle voix que Khubayb ce jour-là. » Il lisait. En attendant de mourir. Comme si c'était le moment le plus naturel du monde pour réciter.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV116.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv116 enrichissement Khubayb raisin enfant recitation croix" && git push
```
