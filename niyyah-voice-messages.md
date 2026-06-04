# NIYYAH VOICE — Messages pour Bilan Hebdomadaire

**Objectif :** remplacer les 54 placeholders dans `_NIYYAH_VOICE` par les messages réels ci-dessous.

**Structure :** 6 dominantes × 3 profils × 3 messages = 54 messages.

---

## fajr

### fajr/reconnecter
1. "Six Fajr cette semaine — l'aube te connaît déjà."
2. "Tu reviens. Doucement. L'aube t'attend chaque jour."
3. "Plus de matins que prévus. C'est précieux quand on revient."

### fajr/routine
1. "Six Fajr cette semaine. Le matin t'appartient."
2. "L'aube est devenue ta complice. Continue."
3. "Tu tiens Fajr. Ce n'est pas rien."

### fajr/sacraliser
1. "Six Fajr. C'est exactement ce que tu cherches — la présence à l'aube."
2. "Le matin éclaire ton chemin. Le reste s'organise autour."
3. "Tu honores l'aube. Le jour s'ouvre avec toi."

---

## bienfaisance

### bienfaisance/reconnecter
1. "Tu es allé vers les autres cette semaine. Ça compte beaucoup."
2. "Quelques gestes vers l'extérieur — le cœur s'ouvre quand on revient."
3. "Le retour passe souvent par l'autre. Tu l'as senti."

### bienfaisance/routine
1. "Tu as semé du bien cette semaine. Ça revient toujours."
2. "Trois gestes vers les autres, c'est ta semaine. La gentillesse est ton fil."
3. "Tu donnes sans bruit. C'est la plus belle façon."

### bienfaisance/sacraliser
1. "Tu donnes beaucoup. N'oublie pas de recevoir aussi."
2. "Ta semaine a éclairé d'autres visages. C'est le sens même."
3. "Donner devient ta respiration. Continue, doucement."

---

## lecture

### lecture/reconnecter
1. "Tu as lu cette semaine. La parole d'Allah revient vers toi."
2. "Quelques pages, quelques récits — les portes s'entrouvrent."
3. "Le Livre t'a appelé. Tu as répondu."

### lecture/routine
1. "Tu as nourri ton cœur cette semaine. La lecture t'habite."
2. "Le Coran et ses récits — ils ont accompagné tes jours."
3. "Tu prends le temps. C'est la plus belle des disciplines."

### lecture/sacraliser
1. "Tu cherches. Le Livre te répond. Continue."
2. "Lire devient pour toi une forme de prière. C'est juste."
3. "Ta semaine a été traversée par la parole sacrée."

---

## bilans_soir

### bilans_soir/reconnecter
1. "Tu as posé tes bilans cette semaine. Tu t'écoutes — c'est rare."
2. "Cinq soirs où tu t'es regardé. Le retour passe par là."
3. "Tu prends le temps avant de dormir. Précieux."

### bilans_soir/routine
1. "Tu fais ta muhâsaba chaque soir. La tradition vit en toi."
2. "Cinq bilans posés. Ton soir est devenu un rituel."
3. "Tu te connais mieux que la semaine passée. C'est ça, le chemin."

### bilans_soir/sacraliser
1. "Tu interroges ton âme chaque soir. C'est le sommet de la pratique."
2. "Le bilan du soir t'habite — sincérité, effort, distraction. Tu nommes ce qui est."
3. "Ta semaine a été examinée. C'est rare et beau."

---

## quasi_vide

### quasi_vide/reconnecter
1. "Je t'ai attendu cette semaine. Tu es là, c'est ce qui compte."
2. "Peu de gestes posés. Le retour se fait pas à pas — pas en un coup."
3. "Tu ouvres Niyyah. C'est déjà un commencement."

### quasi_vide/routine
1. "Cette semaine a été plus tranquille. Ça arrive à tous."
2. "Tu as moins pratiqué — la vie traverse parfois. Reviens demain."
3. "Quelques gestes seulement. Le peu fidèle vaut plus que le beaucoup oublié."

### quasi_vide/sacraliser
1. "Tu as choisi le Complet, et cette semaine fut légère. C'est aussi une étape."
2. "L'exigence demande des respirations. Cette semaine en fut une."
3. "Pas de jugement. Le chemin reprend quand tu le veux."

---

## equilibre

### equilibre/reconnecter
1. "Tu as marché cette semaine. Sans excès, sans manque."
2. "Une semaine ordinaire. C'est dans l'ordinaire que la pratique s'installe."
3. "Tu trouves ton rythme. Doucement."

### equilibre/routine
1. "Une semaine à ton image. Régulière, fidèle, tenue."
2. "Tu as posé ce que tu pouvais. Ni plus, ni moins. C'est juste."
3. "Pas de pic, pas de creux. Juste la constance. C'est beaucoup."

### equilibre/sacraliser
1. "Une semaine pleine, sans excès. Tu sais doser maintenant."
2. "Ton chemin est devenu une marche fluide. C'est l'horizon que tu cherchais."
3. "Tu pratiques sans crispation. C'est rare."

---

## Notes pour Claude Code

- Remplacer les 54 placeholders dans `_NIYYAH_VOICE` par ces messages.
- Garder la structure d'objet existante : `_NIYYAH_VOICE[dominante][profil] = [msg1, msg2, msg3]`.
- Les chiffres dans les messages (ex: "Six Fajr", "Cinq bilans", "Trois gestes") sont des **placeholders fixes** pour l'instant. L'injection dynamique sera faite en v1405 via Prompt 5 avec les variables `{{gestes}}`, `{{journees}}`, `{{fajr}}`.
- Régénérer `.min` après modif.
- Bump SW v1404.
