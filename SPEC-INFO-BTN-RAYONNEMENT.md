# SPEC-INFO-BTN-RAYONNEMENT

## Objectif
Ajouter hadith + source aux 3 items Rayonnement sans bouton i.

## script.js

### { id: 'sadaqa' } — ligne ~1506
Avant la } finale, ajoute :
, hadith: 'Même un sourire est une aumône. La sadaqa purifie le cœur, éteint la colère d\'Allah et protège du malheur. Elle ne diminue pas le bien — elle le multiplie. "La sadaqa n\'a jamais diminué une fortune."', source: 'Muslim 2588'

### { id: 'salam' } — ligne ~1507
Avant la } finale, ajoute :
, hadith: 'As-salamu alaykum — la paix soit sur toi. Le salam est un du\'â offert gratuitement. Il crée l\'amour et est un droit du musulman sur son frère. "Vous n\'entrerez au Paradis que si vous croyez, et vous ne croirez vraiment que si vous vous aimez. Répandez le salam entre vous."', source: 'Muslim 54'

### { id: 'kind_act' } — ligne ~1510
Avant la } finale, ajoute :
, hadith: 'Aider concrètement — porter, écouter, soulager. Chaque acte de bonté est une sadaqa. Allah regarde nos actes, pas leur taille. "Chaque acte de bonté est une aumône."', source: 'Bukhari 6021'

## Trigger
```
Lis SPEC-INFO-BTN-RAYONNEMENT.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: bouton i sadaqa salam kind_act Rayonnement" && git push
```
