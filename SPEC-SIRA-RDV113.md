# SPEC-SIRA-RDV113

## Objectif
Enrichir le RDV 113 (Abū Salama) de 1486 à ~2400 caractères.
Ajouter le du'â d'Abu Salama sur son lit de mort et les 9 takbirat du Prophète.

## data/sira.min.json — RDV num:113

### Modification 1 — Après le paragraphe contenant "Il s'alita. Il s'aggrava. Il mourut quelques jours plus tard."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Sur son lit de mort, Abū Salama avait fait une prière que personne n'entendait vraiment à ce moment-là : *« Ô Allah ! Accorde à Umm Salama après moi quelqu'un de meilleur que moi, qui ne l'affligera pas et ne lui fera pas de mal. »* Umm Salama entendit ces mots. Elle se demanda qui pourrait être meilleur qu'Abū Salama. Elle ne comprenait pas encore.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "Il laissait derrière lui Umm Salama et leurs enfants."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Prophète ﷺ fit la prière funèbre sur Abū Salama. Il fit neuf takbîrât — plus que d'habitude. Les Compagnons s'étonnèrent. Il leur dit : *« Quand bien même aurais-je fait mille takbîrât, il les méritait. »* Abū Salama était le fils de la tante paternelle du Prophète ﷺ. Il était aussi son frère de lait. Il avait été l'un des dix premiers émigrants en Abyssinie. Il avait vécu pour l'islam et était mort pour lui.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le dernier paragraphe "Quelques mois plus tard, elle comprit."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Abū Bakr lui avait proposé le mariage. ʿUmar aussi. Elle avait refusé. Puis le Prophète ﷺ avait proposé. Elle hésita — elle lui parla de son âge, de ses enfants, de sa jalousie. Il répondit à chaque objection avec douceur. Elle accepta. Elle devint Umm al-Muʾminîn — la mère des croyants. La du'â d'Abū Salama avait été exaucée.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV113.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv113 enrichissement Abu Salama dua lit de mort 9 takbirat mariage" && git push
```
