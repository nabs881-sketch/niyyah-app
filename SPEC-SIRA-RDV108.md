# SPEC-SIRA-RDV108

## Objectif
Enrichir le RDV 108 (Deux par tombe) de 1208 à ~2200 caractères.
Ajouter la prière sur Hamza seul, Hanzala lavé par les anges, et le contexte de Mus'ab ibn Umayr.

## data/sira.min.json — RDV num:108

### Modification 1 — Après le premier paragraphe "Soixante-dix morts musulmans."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Soixante-dix corps sur la plaine d'Uḥud. Les Compagnons creusèrent. Ils n'avaient ni le temps ni les moyens d'enterrer chacun séparément. Le Messager d'Allah ﷺ dit : « Mettez-en deux par tombe. Quel est celui qui connaît le plus le Coran ? » On lui indiquait l'un des deux — et il le plaçait en premier, face à la qibla. Le savoir avant tout. Même dans la terre.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe "Pas de toilette mortuaire. Pas de linceul somptueux."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "La prière funèbre ne fut dite que sur Ḥamza — pas sur les autres. Les martyrs n'en ont pas besoin : ils sont vivants auprès de leur Seigneur. Mais il y eut une exception remarquée : Ḥanzala ibn Abî ʿĀmir était parti au combat en état d'impureté rituelle — il venait de se marier et n'avait pas eu le temps de se purifier. Le Prophète ﷺ dit à ses compagnons : « Les anges sont en train de laver votre compagnon. » Il interrogea son épouse. Elle confirma.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe contenant "Mus'ab ibn Umayr" ou "Hamza fut enterré avec ʿAbdullāh"
Insère un nouveau paragraphe APRÈS le dernier paragraphe de texte :
```json
{
  "type": "text",
  "content": {
    "fr": "Parmi les soixante-dix, il y avait Muṣʿab ibn ʿUmayr — l'homme qui avait tout quitté à La Mecque, ses soieries, sa fortune, son rang, pour l'islam. Il mourut à Uḥud sans linceul suffisant pour le couvrir. Le Prophète ﷺ pleura en le voyant. On couvrit sa tête avec son vêtement — ses pieds restèrent découverts. Le Prophète ﷺ dit qu'on pose sur eux de l'idhkhir, une herbe parfumée. Il dit : « Ce monde avait tant à lui offrir, et il a tout laissé pour Allah.»",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV108.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv108 enrichissement enterrement martyrs Hanzala anges Musab" && git push
```
