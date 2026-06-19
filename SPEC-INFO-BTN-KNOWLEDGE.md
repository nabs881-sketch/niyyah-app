# SPEC-INFO-BTN-KNOWLEDGE

## Objectif
Ajouter hadith + source aux 7 items knowledge qui n'en ont pas,
pour que le bouton i apparaisse sur tous les items Connaissance.

## script.js — ajouter hadith et source à chaque item

### { id: 'sira' } — ligne ~1481
Avant la } finale, ajoute :
, hadith: '365 rendez-vous avec sa vie — de sa naissance à son retour vers Allah. Connaître le Prophète ﷺ n\'est pas une option : c\'est la condition de l\'amour vrai. "Aucun de vous ne croit vraiment tant qu\'il ne m\'aime pas plus que son père, son fils et tous les hommes."', source: 'Bukhari 15'

### { id: 'hadith1' } — ligne ~1479
Avant la } finale, ajoute :
, hadith: 'Un hadith authentique chaque jour — gradé selon al-Albânî. La Sunna est la deuxième révélation. "Je vous laisse deux choses — vous ne vous égarerez pas tant que vous vous y accrocherez : le Livre d\'Allah et ma Sunna."', source: 'Hakim 318, hassan'

### { id: 'duaa_jour' } — ligne ~1480
Avant la } finale, ajoute :
, hadith: '245 invocations tirées du Coran et de la Sunna authentique. Le du\'â est l\'acte d\'adoration le plus pur — parler à Allah directement, sans intermédiaire. "Le du\'â est l\'adoration elle-même."', source: 'Abu Dawud 1479, sahih'

### { id: 'quran_read' } — ligne ~1482
Avant la } finale, ajoute :
, hadith: '30 juz\', à ton rythme. Lire le Coran en arabe est une adoration en soi — chaque lettre vaut dix récompenses. "Lisez le Coran, car il intercédera pour ses compagnons au Jour de la Résurrection."', source: 'Muslim 804'

### { id: 'ghidaa_jour' } — ligne ~1488
Avant la } finale, ajoute :
, hadith: 'La nutrition prophétique — ce que le Prophète ﷺ mangeait, recommandait ou évitait. Prendre soin du corps est une obligation envers Allah. "Le croyant fort est meilleur et plus aimé d\'Allah que le croyant faible."', source: 'Muslim 2664'

### { id: 'tibb_jour' } — ligne ~1489
Avant la } finale, ajoute :
, hadith: 'La médecine prophétique — tibb nabawi. Le Prophète ﷺ a indiqué des remèdes dont la science moderne confirme progressivement les vertus. "Allah n\'a pas créé de maladie sans créer son remède."', source: 'Bukhari 5678'

### { id: 'savais_tu' } — ligne ~1490
Avant la } finale, ajoute :
, hadith: 'Des perles du savoir islamique — faits méconnus, anecdotes historiques, détails qui éclairent la foi. La connaissance est une lumière. "Chercher la connaissance est une obligation pour tout musulman."', source: 'Ibn Majah 224, hassan'

## Trigger
```
Lis SPEC-INFO-BTN-KNOWLEDGE.md et applique-le exactement pour les 7 items.
npm run build && git add -A && git commit -m "feat: bouton i sur tous les items Connaissance" && git push
```
