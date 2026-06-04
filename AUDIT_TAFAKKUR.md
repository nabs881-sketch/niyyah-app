# AUDIT TAFAKKUR_QUESTIONS.DOCX — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** `tafakkur_questions.docx` (+ JSON miroir `tafakkur.json` ou équivalent)
**Source de l'audit :** Audit théologique Niyyah, session 2026-05-23
**Structure :** 379 questions méditatives en 3 régimes (waqt_X / tafakkur / tafakkur_nouveau)
**Nombre de corrections :** 1 critique + 1 recommandée + 2 optionnelles
**Niveau global :** EXCELLENT. Style Niyyah au sommet. Aucun risque théologique ou Play Store majeur.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE `tafakkur_questions.docx` (et son JSON miroir).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin : `audit théologique tafakkur : 1 correction critique + corrections mineures`

---

## CORRECTION 1 — CRITIQUE : Bug `\n\n` littéraux sur 18 questions (Q162-179)

**Problème :** Les questions 162 à 179 (série liée aux 99 noms d'Allah) contiennent des caractères `\n\n` LITTÉRAUX au lieu de vrais retours à la ligne. C'est un bug d'encodage JSON.

**Liste complète des 18 questions affectées et corrections :**

### Q162
**ACTUEL :** `Qui a déjà fait pleuvoir sur des terres où personne ne priait ?\n\nAr-Rahmān — Le Tout-Miséricordieux`

**REMPLACER PAR :**
```
Qui a déjà fait pleuvoir sur des terres où personne ne priait ?

Ar-Rahmān — Le Tout-Miséricordieux
```

### Q163
**ACTUEL :** `Qui veille pendant que tu dors sans serrure ?\n\nAl-Mu'min — La Sauvegarde`

**REMPLACER PAR :** vrais sauts de ligne entre la question et `Al-Mu'min — La Sauvegarde`

### Q164
**ACTUEL :** `Tout glisse, tout passe — qui retient ce qui ne doit pas tomber ?\n\nAl-Muhaymin — Le Préservateur`

### Q165
**ACTUEL :** `Une fracture invisible en toi — qui l'a remise en place sans que tu saches ?\n\nAl-Jabbār — Celui qui répare`

### Q166
**ACTUEL :** `Avant ta naissance, qui t'a pensé ?\n\nAl-Khāliq — Le Créateur`

### Q167
**ACTUEL :** `Avant que tu sois — il n'y avait rien de toi. Maintenant tu es. Comment ?\n\nAl-Bāri' — Celui qui fait exister du néant`

### Q168
**ACTUEL :** `Ton visage est unique sur 8 milliards. Qui a tenu le pinceau ?\n\nAl-Musawwir — Celui qui façonne`

### Q169
**ACTUEL :** `Le souffle que tu prends à l'instant — qui te l'a tendu ?\n\nAl-Wahhāb — Le Donateur`

### Q170
**ACTUEL :** `Qui entend la phrase que tu n'as jamais prononcée à voix haute ?\n\nAs-Samī' — L'Audient`

### Q171
**ACTUEL :** `Tu caches ce que tu fais à minuit. Qui le voit comme à midi ?\n\nAl-Khabīr — Le Bien-Informé`

### Q172
**ACTUEL :** `Tu as connu un amour sans condition. D'où vient cette source en l'homme ?\n\nAl-Wadūd — Le Tout-Aimant`

### Q173
**ACTUEL :** `Une rencontre arrivée au bon moment — qui en a réglé l'horaire ?\n\nAl-Muqaddim — Celui qui avance`

### Q174
**ACTUEL :** `Une bienveillance t'a touché sans que tu la mérites. Tu te souviens de qui ?\n\nAl-Barr — Le Bienveillant`

### Q175
**ACTUEL :** `Tu as fauté. Tu te souviens. Lui efface. Pourquoi ?\n\nAl-'Afuww — L'Indulgent`

### Q176
**ACTUEL :** `Une suffisance t'est venue sans que tu aies tout calculé. Qui a déposé ?\n\nAl-Mughnī — Celui qui enrichit`

### Q177
**ACTUEL :** `Tu as trouvé un chemin que tu n'avais pas cherché. Qui marchait devant ?\n\nAl-Hādī — Le Guide`

### Q178
**ACTUEL :** `Aucune fleur ne ressemble à une autre. Qui invente sans se répéter ?\n\nAl-Badī' — L'Inventeur`

### Q179
**ACTUEL :** `À qui revient tout ce que tu laisses derrière toi ?\n\nAl-Wārith — L'Héritier`

**ACTION GLOBALE :**

Dans le JSON source, **remplacer chaque occurrence de `\\n\\n` (deux backslash-n consécutifs) par `\n\n` (vrais sauts de ligne dans la valeur JSON, soit `"text": "...?\n\nNom"`)**.

Si le JSON les contient déjà comme `\n\n` (échappement JSON correct), le bug vient de la **génération .docx** qui les a sortis en littéral. Vérifier le script de génération .docx.

---

## CORRECTION 2 — RECOMMANDÉE : Q1 ouverture du module

**Problème :** La toute première question commence par une rhétorique négative qui peut renforcer une croyance erronée chez un utilisateur en détresse au lieu de la dissoudre. La psychologie de l'ouverture compte.

**REMPLACER Q1 :**
> Tu crois qu'Allâh est en colère contre toi ? Sa miséricorde précède Sa colère. C'est un hadith authentique. C'est inscrit avant tout. Tu n'es pas l'exception.

**PAR :**
> Sa miséricorde précède Sa colère. C'est un hadith authentique. C'est inscrit avant tout. Quand tu doutes d'être aimé d'Allâh — souviens-toi : tu n'es pas l'exception.

---

## CORRECTIONS OPTIONNELLES

### OPTIONNEL 1 — Q197 "disait souvent"

**Problème mineur :** Le hadith authentique (Tirmidhi 2307, *hasan*) ne dit pas "souvent". Précision.

**REMPLACER :**
> Le Prophète ﷺ disait souvent : "souvenez-vous de la destructrice des plaisirs."

**PAR :**
> Le Prophète ﷺ a dit : "souvenez-vous de la destructrice des plaisirs."

**Par défaut :** ne pas modifier (nuance mineure).

### OPTIONNEL 2 — Q318 attribution

**Problème mineur :** La phrase est citée sans attribution, mais c'est un hadith du Prophète ﷺ (Muslim 2564). Ambiguïté.

**REMPLACER :**
> Allah ne regarde pas vos corps ni vos visages — Il regarde vos cœurs.

**PAR :**
> Le Prophète ﷺ a dit : Allah ne regarde pas vos corps ni vos visages — Il regarde vos cœurs.

**Par défaut :** ne pas modifier (style épuré du module).

---

## VALIDATION POST-EXÉCUTION

Après les modifications :
1. Vérifier que les 18 questions 162-179 affichent maintenant le nom d'Allah sur une nouvelle ligne après la question.
2. Vérifier qu'aucune autre question n'a été touchée.
3. Vérifier que les 379 questions restent dans l'ordre 1→379.
4. COMMIT : `audit théologique tafakkur : 1 correction critique + corrections mineures`

---

## NOTE TRANSLITTÉRATION

Ce fichier utilise **"Allâh"** (avec accent) cohérent avec recits_coran.docx mais incohérent avec prophetes/regard_versets/savais_tu. Décision Nabs en attente sur uniformisation globale Niyyah.

Pas urgent — à trancher avant Play Store.

---

## POINTS FORTS DÉTECTÉS (aucune action requise)

- Q360-378 : galerie magnifique des Compagnons et Prophètes en miroir introspectif
- Q197 : "destructrice des plaisirs" — utilisation pédagogique forte
- Q318 : "Allah regarde vos cœurs" — centre théologique du module
- Q300-310 : série sur l'ihsân et la pudeur devant Allah — sommet pastoral
- Distribution thématique : Allah / mort / parents / conjoint / technologie / argent / péchés secrets / modèles prophétiques

---

## SYNTHÈSE

- **1 correction critique** (bug d'affichage `\n\n` × 18 questions)
- **1 correction recommandée** (Q1 ouverture)
- **2 corrections optionnelles** (Q197 "souvent", Q318 attribution)
- **Verdict global :** module prêt à 95% pour validation imam phase 2 après ces corrections.

---

## DÉCISIONS REQUISES AVANT EXÉCUTION

**Corrections OPTIONNELLES** (1 et 2) : OUI / NON / DEFAUT
**Correction RECOMMANDÉE** (Q1) : OUI / NON (par défaut : OUI appliquer)

Si Nabs ne précise pas : par défaut, **correction critique + Q1 recommandée uniquement**.
