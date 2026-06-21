# SPEC-WAQT-CORRECTIONS-P9-P10

## Objectif
Corriger les formulations faibles, inexactes ou app-centriques
dans data/waqt/waqt_fajr.json (page 9) et data/waqt/waqt_dhuhr.json (page 10).

---

## Fichier : data/waqt/waqt_fajr.json (page 9)

### Correction 1
Remplace :
"Le Prophète ﷺ a enseigné un du'â au réveil qui efface les péchés (sens des hadiths). Aujourd'hui, accepte ce pardon. Ne traîne pas hier. C'est une page nouvelle."
Par :
"Le Prophète ﷺ a enseigné le du'â du réveil — Alhamdulillâhi-lladhî ahyânâ (Bukhari). Dis-le. C'est ta première page blanche."

### Correction 2
Remplace :
"Tu Le verras toujours — sois là pour ce regard-là."
Par :
"Il te voit toujours. Aujourd'hui, vis à la hauteur de ce regard."

### Correction 3
Remplace :
"Si tu reviens à Niyyah après une longue absence — sois bienvenu."
Par :
"Si tu reviens après une longue absence — sois bienvenu."

### Correction 4
Remplace :
"partage une connaissance utile avec une personne qui t'écoute. Pas pour convertir — pour transmettre une connaissance utile. Le savoir partagé devient sadaqa jâriya."
Par :
"partage une connaissance utile avec une personne. Un verset. Un fait. Une sagesse. Le savoir transmis reste."

### Correction 5
Remplace :
"Le Prophète ﷺ a recommandé le respect des gens de science (sens des hadiths). La oumma se déchire par la médisance."
Par :
"Les savants sont les héritiers des Prophètes (Abu Dawud, hasan). Leur réputation mérite protection."

### Correction 6
Remplace :
"Comme Mûsâ et Ibrâhîm priaient pour leurs peuples (Coran)."
Par :
"Comme Ibrâhîm priait pour sa communauté (Coran 14:41) et Mûsâ pour son peuple (Coran 7:155)."

### Correction 7
Remplace :
"C'est un choix qu'Allâh a fait POUR toi avant ta naissance, et que tu confirmes chaque jour par ta présence."
Par :
"C'est une guidance qu'Allâh t'a accordée. Renouvelle-la chaque jour par tes actes."

### Correction 8
Remplace :
"La langue qui dhikrise sans le cœur est lettre morte."
Par :
"La langue qui prononce sans le cœur est lettre morte."

### Correction 9
Remplace :
"Le Prophète ﷺ ne humiliait jamais."
Par :
"Le Prophète ﷺ n'humiliait personne."

---

## Fichier : data/waqt/waqt_dhuhr.json (page 10)

### Correction 10
Remplace :
"La liberté du voile est aussi une cause silencieuse. Honore-la en pensée."
Par :
"La liberté de pratiquer est un cadeau. Honore-la en pensée — pour ceux qui ne l'ont pas."

### Correction 11
Remplace :
"La lumière met 8 minutes à arriver depuis le Soleil. Quand tu la sens, elle est partie il y a 8 minutes. Allah t'écrit en avance. Tu vis dans la trace de Sa décision passée."
Par :
"La lumière met 8 minutes à arriver depuis le Soleil. Quand tu la sens sur ta peau, elle a voyagé. Chaque don d'Allah voyage vers toi avant même que tu le demandes."

### Correction 12
Remplace :
"Tu as ouvert l'app aujourd'hui. Quelqu'un d'autre, pas. Allah t'a guidé à un geste qu'Il valorise. Tu ne t'es pas amené ici tout seul."
Par :
"Tu as choisi ce moment de rappel aujourd'hui. Tu ne t'es pas amené ici tout seul."

---

## Trigger
```
Lis SPEC-WAQT-CORRECTIONS-P9-P10.md et applique les 12 remplacements exactement :
- 9 dans data/waqt/waqt_fajr.json
- 3 dans data/waqt/waqt_dhuhr.json
npm run build && git add -A && git commit -m "fix: corrections waqt fajr page9 et dhuhr page10" && git push
```
