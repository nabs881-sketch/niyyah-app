# SPEC-SIRA-RDV105

## Objectif
Enrichir le RDV 105 (Le foie) de 1075 à ~2400 caractères.
Ajouter contexte Wahshi, réaction du Prophète, et destin de Hind.

## data/sira.min.json — RDV num:105

### Modification 1 — Avant le premier paragraphe "Quand les Quraysh furent sûrs d'avoir gagné"
Insère un nouveau paragraphe AVANT (en premier) :
```json
{
  "type": "text",
  "content": {
    "fr": "Hind bint ʿUtba avait fait une promesse avant la bataille. À Badr, elle avait perdu son père, son frère et son oncle. Elle tenait Ḥamza pour responsable. Elle avait promis une récompense à celui qui lui rapporterait son foie. Et elle avait affranchit Wahshî — un esclave abyssin réputé pour son adresse à la lance — à condition qu'il accomplisse cette chose.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe "Hind bint ʿUtba alla droit vers Hamza."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Wahshî l'avait tué dans la mêlée — il l'avait frappé d'une lance dans le flanc, puis s'était retiré. Sa tâche était accomplie. Ce qui suivit ne le concernait plus.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe contenant "Elle s'en para."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Quand le Messager d'Allah ﷺ vit l'état du corps de son oncle, il ne dit rien pendant un moment. Ṣafiyya, la sœur de Ḥamza, voulait s'approcher — les compagnons l'en empêchèrent d'abord, puis le Prophète ﷺ la laissa voir. Il fit recouvrir le corps. Il dit qu'il n'avait jamais rien vu d'aussi difficile. Les sources rapportent qu'il pleura.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 4 — Après la dernière phrase "le reste de sa vie, sans pouvoir le digérer." dans la méditation
Ne pas modifier la méditation — elle est parfaite.

### Modification 5 — Après le paragraphe contenant "On ne raconte pas cela pour la complaisance"
Insère un nouveau paragraphe APRÈS le dernier paragraphe de texte :
```json
{
  "type": "italic",
  "content": {
    "fr": "Hind embrassa l'islam à la conquête de La Mecque, quelques années plus tard. Elle mourut musulmane. L'islam ne demande pas qu'on efface ce qui s'est passé — il demande qu'on sache ce dont un cœur humain est capable, dans les deux sens.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV105.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv105 enrichissement Hind foie contexte Wahshi reaction Prophete" && git push
```
