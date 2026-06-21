# SPEC-SIRA-RDV104

## Objectif
Enrichir le RDV 104 (Notre Hubal est plus grand) de 1239 à ~2200 caractères.
Ajouter contexte, réplique manquante de Bukhari, et développer la conclusion.

## data/sira.min.json — RDV num:104

### Modification 1 — Après le premier paragraphe "Abū Sufyān monta sur une éminence."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "La bataille était finie. Les Quraysh avaient le champ. Soixante-dix musulmans étaient morts. Abu Sufyan ibn Harb — chef de la coalition mecquoise, l'homme qui avait organisé cette campagne pour venger Badr — voulait une confirmation. Il voulait entendre le silence des trois hommes qu'il croyait avoir tués.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "Abū Sufyān recula. Puis il dit : « Vive Hubal ! »"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Puis il dit encore, à voix haute, pour que les deux camps entendent : « Ce jour vaut pour le jour de Badr. La victoire est tantôt aux uns, tantôt aux autres. Vous trouverez sur vos morts des mutilations que je n'ai pas ordonnées — mais cela ne me chagrine pas. »",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Remplace le paragraphe 15 (italic) contenant "Abū Sufyān regarda son armée meurtrière"
Remplace par :
```json
{
  "type": "italic",
  "content": {
    "fr": "Il avait gagné la bataille. Il avait les morts, il avait le champ, il avait Hubal au-dessus de la plaine. Mais il n'avait pas les trois noms. Et les mots qu'on lui avait renvoyés — Allahu Akbar wa Ajall, Allahu Mawlanâ — n'étaient pas les mots d'un peuple vaincu. Quelque chose lui résistait qu'il ne savait pas nommer.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV104.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv104 enrichissement Hubal dialogue contexte et replique Badr" && git push
```
