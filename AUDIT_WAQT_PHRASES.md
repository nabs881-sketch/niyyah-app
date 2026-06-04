# AUDIT WAQT_PHRASES.DOCX — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** `waqt_phrases.docx` (+ JSON miroir, probablement `data/waqt/waqt_phrases.json` ou équivalent)
**Source de l'audit :** Audit théologique Niyyah, session 2026-05-23
**Structure :** 323 phrases organisées par prière (FAJR/DHUHR/ASR/MAGHRIB/ISHA)
**Position éditoriale Niyyah validée :** émerveillement devant la création, PAS démonstration scientifique du Coran. Aligné avec tafakkur_recits, regard_versets, savais_tu.
**Nombre de corrections :** 1 critique technique + 8 reformulations i'jaz + 2 vérifications

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE `waqt_phrases.docx` (et son JSON miroir).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin : `audit théologique waqt_phrases : 1 critique technique + reformulations i'jaz`

---

## CORRECTION 1 — CRITIQUE TECHNIQUE : 79 phrases avec `\n\n` LITTÉRAUX

**Problème :** Même bug que tafakkur_questions. 79 phrases (FAJR 41-48 + MAGHRIB 95-165) contiennent des caractères `\n\n` LITTÉRAUX au lieu de vrais sauts de ligne. Ce sont les entrées de la série des 99 noms d'Allah (catégorie `tafakkur`).

**Format actuel buggé :**
```
Tu reviens pour la centième fois. Il accueille comme la première.\n\nAl-Ghaffār — Qui pardonne abondamment
```

**Format attendu :**
```
Tu reviens pour la centième fois. Il accueille comme la première.

Al-Ghaffār — Qui pardonne abondamment
```

**ACTION :** Dans le JSON source, remplacer chaque occurrence de `\\n\\n` (deux backslash-n consécutifs dans la chaîne JSON) par de vrais sauts de ligne `\n\n` (échappement JSON correct).

**Liste des 79 phrases affectées :**
- FAJR — 41 à FAJR — 48 (8 phrases)
- MAGHRIB — 95 à MAGHRIB — 165 (71 phrases)

Vérifier le script de génération .docx pour s'assurer qu'il ne transforme pas les `\n` en littéraux.

---

## CORRECTION 2 — DOCTRINALE : Embryologie 23:14 (FAJR 19 et FAJR 20)

**Problème :** Claims i'jaz scientifique fragiles. L'argument "Coran décrit l'embryologie avant l'échographie" est contesté (étapes déjà chez Hippocrate/Galien). L'argument "os puis chair" est scientifiquement inexact (os et muscles se développent en parallèle).

### FAJR 19

**REMPLACER :**
> Le Coran décrit l'embryon en 7 étapes précises : goutte, accroché, mâché, ossifié, revêtu de chair… 14 siècles avant l'échographie. Aucune médecine antique n'avait ces étapes. (Coran 23:14)

**PAR :**
> « Puis Nous avons fait de cette goutte une adhérence, et de cette adhérence une masse, et de cette masse des os, et Nous avons revêtu les os de chair. Puis Nous avons fait de cela une autre création. Béni soit Allâh, le Meilleur des créateurs ! » (Coran 23:14). Tu lis ces mots dans une langue qui ne parlait pas encore d'embryologie. Et tu vois maintenant, à l'échographie, ces étapes l'une après l'autre. Pas une preuve. Une coïncidence qui interroge.

### FAJR 20

**REMPLACER :**
> Le Coran décrit le développement des os PUIS leur revêtement par la chair — confirmé par l'embryologie moderne dans cet ordre exact. Inversion possible non détectée au 7ème siècle. (Coran 23:14)

**PAR :**
> Le verset parle des os, puis de leur revêtement de chair. L'embryologie moderne montre que ce passage de la structure osseuse à la masse musculaire est l'un des moments clés du développement fœtal. Le Coran n'est pas un manuel de biologie — mais il invite à regarder, et ceux qui regardent voient ce qui leur est donné de voir.

---

## CORRECTION 3 — DOCTRINALE : Deux mers 25:53

**Phrase concernée (chercher dans le JSON) :**
> Le Coran parle de deux mers qui se rencontrent sans se mélanger — séparées par une barrière. Phénomène océanographique confirmé au 20ème siècle (halocline). Le texte décrit ce que personne ne pouvait voir au 7ème siècle. (Coran 25:53)

**REMPLACER PAR :**
> « C'est Lui qui a fait deux mers couler côte à côte ; l'une douce et savoureuse, l'autre salée et amère. Il a établi entre les deux une barrière. » (Coran 25:53). Aux embouchures des grands fleuves dans la mer, ce phénomène existe — les eaux se touchent sans se mélanger pendant des kilomètres. Pas une preuve. Une image qui désigne la mesure de Celui qui sépare.

---

## CORRECTION 4 — DOCTRINALE : Expansion univers 51:47

**Phrase concernée :**
> Le Coran dit que l'univers a été « déployé » — terme exact pour ce que les physiciens appellent expansion de l'univers, découverte par Hubble en 1929. Le mot est dans le texte depuis 1400 ans. (Coran 51:47)

**REMPLACER PAR :**
> « Le ciel, Nous l'avons construit par Notre puissance, et Nous l'élargissons sans cesse. » (Coran 51:47). Le verbe arabe *mûsi'ûn* signifie élargir, étendre. Aujourd'hui les astronomes mesurent l'expansion continue de l'univers. Le verset ne prédit rien — il médite la création comme une œuvre en cours.

---

## CORRECTION 5 — DOCTRINALE : Lune lumière réfléchie 71:16

**Phrase concernée :**
> Le Coran décrit la lune comme « lumière réfléchie » (nûr) et le soleil comme « lampe » (sirâj). Distinction confirmée 1000 ans plus tard : la lune ne produit pas de lumière, le soleil oui. (Coran 71:16)

**REMPLACER PAR :**
> « Il a fait de la lune une lumière (*nûr*) et du soleil une lampe (*sirâj*). » (Coran 71:16). Deux mots différents pour deux astres différents. Le soleil donne. La lune reflète. C'est ce que tu vois chaque nuit sans y penser. Le Coran te demande juste de regarder vraiment.

---

## CORRECTION 6 — DOCTRINALE : Probabilités cellulaires (2 phrases MAGHRIB)

**Problème :** Arguments d'Intelligent Design (Hoyle/Dembski) non acceptés par la communauté scientifique. À retirer ou reformuler complètement.

### Phrase "10^164 essais"

**REMPLACER :**
> Pour qu'une seule protéine fonctionnelle apparaisse par hasard, il faudrait 10^164 essais. L'univers entier n'a connu que 10^80 réactions depuis le Big Bang. Le calcul est clos. Le hasard est insuffisant.

**PAR :**
> Dans chaque cellule de ton corps, des milliers de protéines s'assemblent chaque seconde avec une précision que la science elle-même peine à reproduire en laboratoire. Tu n'as rien à fabriquer. Tu n'as qu'à habiter. Quelqu'un a déjà tout réglé.

### Phrase "250 protéines / 10^85 000"

**REMPLACER :**
> Pour qu'une cellule fonctionne, il faut 250 protéines minimum, chacune correctement pliée. Probabilité par hasard : 1 sur 10^85 000. Plus que d'atomes dans l'univers visible. Le hasard a renoncé. Pas Lui.

**PAR :**
> Une seule de tes cellules contient des centaines de protéines repliées avec une précision atomique. Tu en as 37 000 milliards. Aucune n'a été conçue par toi. Allâh dit : « Je n'ai créé les djinns et les hommes que pour qu'ils M'adorent. » (Coran 51:56). Le mot "adorer" — *ya'budûn* — vient de la même racine que serviteur. Tes cellules sont déjà serviteurs. Toi, tu choisis.

### Phrase "fourmi fonctionnelle"

**REMPLACER :**
> Si on tirait au hasard parmi tous les arrangements possibles d'atomes, la probabilité d'obtenir ne serait-ce qu'une fourmi fonctionnelle est statistiquement nulle. Et tu vois des fourmis tous les jours. La nullité statistique est un miracle quotidien.

**PAR :**
> Une fourmi pèse cinq milligrammes. Elle reconnaît son nid parmi des millions, communique par chimie, soulève cinquante fois son poids. Tu en écrases peut-être tous les jours sans regarder. Allâh lui a consacré une sourate du Coran (an-Naml). Si elle a mérité Sa parole — qui es-tu pour t'en détourner ?

---

## CORRECTION 7 — VÉRIFICATION : Comptage 365/12/7 (MAGHRIB 50)

**Problème CRITIQUE :** Comptage popularisé sur réseaux sociaux, **souvent faux**. Le mot *yawm* et ses dérivés apparaissent environ 475 fois dans le Coran selon les concordances classiques, **pas 365**. Le mot *shahr* (mois) apparaît bien 12 fois. Le mot *samâ'* (ciel) au singulier apparaît plus de 7 fois — distinction entre singulier et pluriel non précisée. Risque d'effet boomerang catastrophique si vérification par utilisateur.

**REMPLACER :**
> Le mot « jour » apparaît 365 fois dans le Coran. Le mot « mois » exactement 12 fois. Le mot « ciel » exactement 7 fois. Statistiquement, ce n'est pas du hasard.

**PAR :**
> Le Coran évoque sept cieux superposés, douze mois lunaires, des jours qui se suivent comme des signes. La structure du temps est inscrite dans le texte comme elle l'est dans la création. Tu vis dans le calendrier d'Allâh sans toujours t'en apercevoir.

---

## CORRECTION 8 — Gödel (phrase 671)

**Problème :** Mauvaise extrapolation philosophique du théorème d'incomplétude. Gödel concerne les systèmes formels axiomatiques cohérents capables d'exprimer l'arithmétique, pas "la science elle-même".

**REMPLACER :**
> En 1931, Kurt Gödel a prouvé mathématiquement qu'il existe des vérités vraies qu'on ne peut PAS prouver de l'intérieur du système. La science elle-même reconnaît un dehors qu'elle ne peut pas atteindre. Ce dehors a un Nom.

**PAR :**
> En 1931, Kurt Gödel a démontré qu'aucun système mathématique cohérent ne peut tout démontrer depuis l'intérieur de lui-même. Toujours quelque chose le dépasse. Allâh dit : « Vous ne saurez de la science qu'un peu. » (Coran 17:85). Quatorze siècles avant Gödel, la limite était déjà nommée.

---

## CORRECTION 9 — Prédiction Romains (FAJR 18)

**Problème mineur :** "12 ans plus tard" est exact (615 → 627) mais le verset dit *fî bidh' sinîn* — "entre 3 et 9 ans" selon la lexicologie classique. Tension exégétique. À simplifier.

**REMPLACER :**
> En 615, le Coran annonce que les Romains, vaincus, vaincront « dans quelques années ». En 627, ils gagnent — 12 ans plus tard. Le texte existait avant l'événement. Aucune diseuse n'aurait osé une prédiction politique aussi datée. (Coran 30:2-4)

**PAR :**
> En 615, le Coran annonce que les Romains, vaincus par les Perses, vaincront à leur tour « dans quelques années » (Coran 30:2-4). La bataille de Ninive en 627 confirme ce retournement. Le texte existait avant l'événement — une prédiction politique précise, dans une terre qui se moquait du Messager ﷺ.

---

## CORRECTION 10 — Toute chose vivante faite d'eau (21:30)

**Phrase concernée :**
> Le Coran dit que toute chose vivante est faite à partir de l'eau. La biologie moderne confirme : aucune vie sans eau, 70% de toi est eau, jusqu'à la dernière bactérie. (Coran 21:30)

**Statut :** Ce verset est plus défendable car *"Nous avons fait de l'eau toute chose vivante"* est une lecture coranique directe. Reformulation légère pour rester dans l'émerveillement plutôt que la preuve.

**REMPLACER :**
> Le Coran dit que toute chose vivante est faite à partir de l'eau. La biologie moderne confirme : aucune vie sans eau, 70% de toi est eau, jusqu'à la dernière bactérie. (Coran 21:30)

**PAR :**
> « Et Nous avons fait de l'eau toute chose vivante. Ne croiront-ils donc pas ? » (Coran 21:30). Soixante-dix pour cent de toi est eau. Aucune bactérie ne s'en passe. Aucune feuille. Aucun œil. Le verset dit une chose simple — et qui se voit partout.

---

## CORRECTIONS OPTIONNELLES (à arbitrer par Nabs)

### OPTIONNEL 1 — MAGHRIB surchargé

165 phrases pour MAGHRIB vs 30-48 pour les autres. Si l'algorithme pioche aléatoirement parmi toutes les phrases d'une prière, l'utilisateur qui ouvre Niyyah à MAGHRIB tombe trop souvent sur des phrases sans lien avec le coucher du soleil.

**Suggestion (NON obligatoire) :** Redistribuer 50-70 phrases MAGHRIB vers DHUHR/ASR/ISHA pour équilibrer.

Par défaut : ne pas modifier (peut-être que la logique app fait déjà ce tri).

### OPTIONNEL 2 — Phrases d'eau (phrase ligne 569)

> Deux atomes d'hydrogène + un d'oxygène = de l'eau. Pourquoi pas un poison ?

Phrase un peu courte. Si on garde, OK. Sinon étoffer.

Par défaut : garder.

---

## VALIDATION POST-EXÉCUTION

Après les modifications :
1. Vérifier que les 79 phrases FAJR 41-48 + MAGHRIB 95-165 affichent maintenant le nom d'Allah sur une nouvelle ligne après la question.
2. Vérifier que les 10 reformulations doctrinales ont été appliquées (FAJR 18, 19, 20 + MAGHRIB 50 + 5 autres + Gödel).
3. Vérifier qu'aucune autre phrase n'a été touchée.
4. Vérifier que le total final reste de 323 phrases.
5. COMMIT : `audit théologique waqt_phrases : 1 critique technique + reformulations i'jaz`

---

## NOTE TRANSLITTÉRATION

Ce fichier utilise **"Allah/Allâh"** mixte. Cohérent avec la majorité des fichiers Niyyah. Décision globale Nabs en attente avant Play Store.

---

## POSITION ÉDITORIALE NIYYAH (VALIDÉE 2026-05-23)

**Niyyah n'utilise PAS le Coran comme manuel scientifique.**

Niyyah invite à l'**émerveillement** devant la création, et la science contemporaine, en l'étudiant, **prolonge ce regard**. Mais le Coran n'est PAS présenté comme une démonstration scientifique anticipée. Ses versets sont cités pour leur valeur méditative, pas démonstrative.

**Cette ligne est cohérente avec :**
- `tafakkur_recits` (science rigoureuse + foi en émerveillement)
- `regard_versets` phase 2 (corrections Gemini intégrées)
- `savais_tu` phase 2 (hadith de la mouche nuancé, Bouddha/Confucius retirés)

**Tout futur contenu Niyyah doit respecter cette ligne.**

---

## SYNTHÈSE

- **1 correction CRITIQUE TECHNIQUE** : 79 phrases avec `\n\n` à corriger
- **9 corrections DOCTRINALES** : reformulations i'jaz scientifique en émerveillement
- **2 corrections OPTIONNELLES** : déséquilibre MAGHRIB, phrase eau courte
- **Verdict global :** fichier prêt à 95% pour validation imam phase 2 après ces corrections.

**Le risque principal du fichier original n'est pas Play Store mais CRÉDIBILITÉ.** Les claims i'jaz scientifique contestés exposaient Niyyah à des critiques faciles (vidéos YouTube, articles, etc.). La reformulation en émerveillement règle ce risque définitivement.
