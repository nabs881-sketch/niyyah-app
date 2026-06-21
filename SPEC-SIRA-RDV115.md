# SPEC-SIRA-RDV115

## Objectif
Enrichir le RDV 115 (Ar-Rajîʿ) de 1373 à ~2400 caractères.
Ajouter les guêpes protégeant Asim et la réponse de Zayd sur le Prophète.

## data/sira.min.json — RDV num:115

### Modification 1 — Après "Sept compagnons moururent avec lui."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Les Quraysh avaient appris qu'ʿĀṣim ibn Thābit était parmi les morts. Sulayfah, une femme de Quraysh, avait juré de boire dans son crâne — il avait tué son fils à Badr. Ils envoyèrent des hommes pour couper sa tête. Mais Allah envoya sur son corps un nuage de guêpes et de frelons qui les empêcha d'approcher. Le corps fut emporté la nuit par une crue. ʿUmar ibn al-Khaṭṭâb, quand il apprit la chose, dit : « Allah protège toujours Ses fidèles serviteurs. ʿĀṣim avait juré de ne jamais toucher un idolâtre — Allah l'a protégé après sa mort. »",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après "Khubayb et Zayd furent vendus à La Mecque."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Zayd ibn ad-Dathinna fut acheté par Ṣafwân ibn Umayya. Avant de le faire exécuter, Abū Sufyān lui posa une question : « N'aurais-tu pas voulu que Mohammed soit à ta place, et toi libre ? » Zayd répondit : « Par Allah, je ne voudrais même pas qu'il soit piqué par une épine, moi tranquillement assis chez moi. » Abū Sufyān dit à ceux qui l'entouraient : « Je n'ai jamais vu quelqu'un aimer quelqu'un comme les compagnons de Mohammed l'aiment. »",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après "c'est-à-dire dans quelques semaines, ces deux hommes seront crucifiés à at-Tanʿīm."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Prophète ﷺ apprit l'ensemble de l'événement par révélation, le jour même où cela se passait. Il informa ses compagnons de ce qui était arrivé à la délégation. Médine sut, dans la douleur, que ses meilleurs récitateurs avaient été trahis et capturés.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV115.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv115 enrichissement guepes Asim reponse Zayd amour Prophete" && git push
```
