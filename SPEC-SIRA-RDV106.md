# SPEC-SIRA-RDV106

## Objectif
Enrichir le RDV 106 (Fâṭima) de 1343 à ~2300 caractères.
Ajouter l'émotion du Prophète en voyant sa fille, et le contexte de son arrivée.

## data/sira.min.json — RDV num:106

### Modification 1 — Après le paragraphe "Fāṭima était venue avec d'autres femmes, à pied, depuis Médine."
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "Fāṭima était venue avec d'autres femmes, à pied, depuis Médine. Elle avait dix-huit ans. La nouvelle de la déroute avait traversé la ville avant même que les rescapés n'arrivent — des femmes couraient vers Uḥud pour chercher leurs hommes. Fāṭima cherchait son père.",
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
    "fr": "Quand elle le vit — la dent cassée, le sang sur le visage, le casque enfoncé — elle ne dit rien. Les sources rapportent qu'elle pleurait. Le Prophète ﷺ, en la voyant pleurer, pleura aussi. Ce moment n'est pas dans un discours. Il est dans deux visages qui se regardent.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe "Mais l'eau ne faisait qu'accroître le saignement."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "ʿAlî versait. Fāṭima lavait. L'eau descendait sur le visage du Prophète ﷺ et le sang ne s'arrêtait pas. Il y avait dans ce geste quelque chose de désespéré et de patient à la fois — laver une blessure qu'on ne peut pas refermer, continuer quand même.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 4 — Après le paragraphe "Le sang s'arrêta."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Sahl ibn Saʿd, qui était là et rapporterait cette scène des années plus tard, dirait : « Par Allah, je connais celle qui lavait la blessure du Messager d'Allah ﷺ, et celui qui versait l'eau, et ce avec quoi la blessure fut cautérisée. » Il n'avait pas oublié. Certaines scènes ne s'oublient pas.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV106.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv106 enrichissement Fatima soigne le Prophete" && git push
```
