# ERREURS A CORRIGER — Audit Niveau 2

Total : 7 erreurs

---

## Erreur 1 — hadiths/106

**Fichier a modifier** : `hadiths_jour.json`

**Texte original** (extrait) :
> La pudeur n'apporte que du bien.

**Source citee** : Bukhari 6117, Muslim 37

**Notes IA** : Les références de hadith sont incorrectes. Le hadith sur la pudeur existe mais avec des numéros de collection différents.

**Details** :
- Bukhari 6117 n'est pas la référence correcte pour ce hadith célèbre
- Muslim 37 n'est pas la référence correcte pour ce hadith
- Le hadith authentique 'La pudeur n'apporte que du bien' (الحياء لا يأتي إلا بخير) se trouve dans Bukhari 3483 et Muslim 37 (mais avec une numérotation différente selon les éditions)
- Les numéros de collection varient selon les éditions, mais Bukhari 6117 traite d'autres sujets
- Attribution correcte : ce hadith est rapporté par Imran ibn Husayn (عمران بن حصين) et est authentique, mais les références données sont inexactes

---

## Erreur 2 — hadiths/109

**Fichier a modifier** : `hadiths_jour.json`

**Texte original** (extrait) :
> Vous n'entrerez pas au Paradis avant de croire, et vous ne croirez pas avant de vous aimer. Voulez-vous que je vous indique une chose qui vous fera vous aimer ? Répandez le salam entre vous.

**Source citee** : Muslim 54

**Notes IA** : Attribution incorrecte et confusion de sources. Le hadith sur 'Afshû al-salâm' est authentique mais pas numéroté 'Muslim 54'. La structure citée mélange plusieurs hadiths distincts.

**Details** :
- Le hadith 'Afshû al-salâm baynakum' (Répandez le salam entre vous) existe dans Muslim, mais pas sous la référence 'Muslim 54'
- La première partie 'Vous n'entrerez pas au Paradis avant de croire...' est un hadith distinct, souvent attribué à Muslim 93 ou ailleurs
- Ces deux énoncés sont présentés comme un seul hadith, ce qui est factuellement inexact
- La notation 'Muslim 54 sahih' est imprécise : Muslim utilise un système de numérotation différent selon les éditions

---

## Erreur 3 — hadiths/78

**Fichier a modifier** : `hadiths_jour.json`

**Texte original** (extrait) :
> Tenez-vous à la vérité, car la vérité mène à la piété et la piété mène au Paradis.

**Source citee** : Bukhari 6094, Muslim 2607

**Notes IA** : Les références Bukhari 6094 et Muslim 2607 ne correspondent pas à ce hadith. Le hadith cité est authentique mais mal attribué aux numéros de chapitre/hadith indiqués.

**Details** :
- Le hadith 'Tenez-vous à la vérité...' est authentique et rapporté par Bukhari et Muslim, mais les numéros de référence (6094 et 2607) sont inexacts ou correspondent à d'autres hadiths
- La traduction du texte arabe est acceptable mais incomplète : le hadith complet inclut 'et la vérité mène à la piété, et la piété mène au Paradis'
- Les numéros de hadith varient selon les éditions des Sahih ; une vérification dans l'édition utilisée est nécessaire
- L'attribution 'sahih' est correcte (hadith authentique), mais les références précises doivent être vérifiées

---

## Erreur 4 — hadiths/97

**Fichier a modifier** : `hadiths_jour.json`

**Texte original** (extrait) :
> Celui qui visite un malade ne cesse d'être dans le verger du Paradis jusqu'à ce qu'il revienne.

**Source citee** : Muslim 2568

**Notes IA** : Le hadith cité existe dans Muslim, mais le numérotation et l'attribution sont inexactes. Le texte arabe et la traduction ne correspondent pas exactement aux versions authentifiées.

**Details** :
- Muslim 2568 ne correspond pas à ce hadith dans les éditions standard de Sahih Muslim
- Le hadith sur la visite des malades (عيادة المريض) existe dans Muslim, mais sous une numérotation différente (généralement 2568 dans certaines éditions concerne d'autres sujets)
- Le texte arabe cité ('khurfat al-janna' = verger du Paradis) est authentique mais l'attribution au numéro 2568 est douteuse
- Vérification nécessaire: ce hadith apparaît dans Muslim mais probablement sous un numéro différent selon l'édition

---

## Erreur 5 — duaas/126

**Fichier a modifier** : `duaas.json`

**Texte original** (extrait) :
> Abu Bakr as-Siddîq vint au Prophète ﷺ et dit : ô Messager d'Allah, enseigne-moi une parole que je dirai matin et soir. Le Prophète ﷺ enseigna cette du'a complète. Et il ajouta : dis-la matin et soir, et quand tu vas dormir. Pourquoi cette du'a est-elle si vaste ? Parce qu'elle couvre trois territoires souvent oubliés. Premier — le mal de soi-même. A'ūdhu bika min sharri nafsī. Tu reconnais que toi

**Source citee** : Abu Dawud 5067, Tirmidhi 3392

**Notes IA** : Attribution et texte du hadith incorrects. La source citée (Abu Dawud 5067, Tirmidhi 3392) ne correspond pas à ce du'a. Le texte semble tronqué et contient des éléments non vérifiables.

**Details** :
- Abu Dawud 5067 traite d'un sujet différent (non ce du'a de protection)
- Tirmidhi 3392 ne correspond pas à cette invocation
- Le du'a cité ressemble partiellement au du'a d'Abu Bakr (hadith authentique) mais avec des variantes non documentées
- La phrase finale 'aw ajurrahu ilā muslim' (ou que je l'attire sur un musulman) n'apparaît pas dans les versions classiques du hadith
- Le texte est tronqué ('Il ne te pousse pas toujours...' s'arrête abruptement)
- Les sources marquées 'Sahih' sans précision (Sahih Muslim? Sahih Bukhari?) manquent de clarté

---

## Erreur 6 — recits_coran/8

**Fichier a modifier** : `data/recits-coran.json`

**Texte original** (extrait) :
> recit_008 Le premier sang Habil et Qabil   text C'était au commencement. Quand le monde était neuf, et que les hommes pouvaient encore se compter sur les doigts d'une seule main.   text Adam avait deux fils. Habil — qui élevait des troupeaux. Qabil — qui cultivait la terre.   text Un jour, ils présentèrent chacun une offrande. Habil donna sa meilleure bête. Qabil donna ce qu'il avait sous la main.

**Source citee** : {"fr":"Sourate Al-Ma'ida (5:27-31)","en":"","ar":""}

**Notes IA** : Attribution coranique fausse : le verset sur les enfants d'Israël (5:32) ne concerne PAS le récit de Habil-Qabil. C'est une interpolation anachronique.

**Details** :
- Le récit de Habil-Qabil est en Sourate 5:27-31, concernant les fils d'Adam
- Le verset 5:32 ('celui qui tue une âme...') est une LOI DONNÉE AUX ENFANTS D'ISRAËL, pas une conclusion du récit de Habil-Qabil
- Confusion entre deux passages coraniques distincts : le récit (5:27-31) et la loi mosaïque (5:32)
- Les paroles de Habil (5:28) sont correctes
- Le corbeau (5:31) est correctement mentionné
- Le regret de Qabil est correct (5:31)

---

## Erreur 7 — duaas/21

**Fichier a modifier** : `duaas.json`

**Texte original** (extrait) :
> Ibn Abbâs rapporte que le Prophète ﷺ a dit : celui qui visite un malade dont le terme n'est pas venu et prononce cette du'a sept fois, Allah le guérit. Sept fois. Pas une. Pas dix. Sept. Comme si la guérison demandait une persistance. Comme si la première fois disait l'intention, la deuxième l'insistance, la troisième la foi, et qu'à la septième seulement la porte cédait. Le Prophète ﷺ visitait le

**Source citee** : Abu Dawud 3106, Tirmidhi 2083

**Notes IA** : Attribution incorrecte du premier duaa à Ibn Abbâs. Les sources citées (Abu Dawud 3106, Tirmidhi 2083) correspondent au deuxième duaa (Allāhumma rabba an-nāsi...), pas au premier.

**Details** :
- Le duaa 'As'alu Allāha al-'azīma...' n'est pas attribué à Ibn Abbâs dans les sources classiques de manière vérifiée
- Abu Dawud 3106 et Tirmidhi 2083 rapportent le duaa 'Allāhumma rabba an-nāsi, adhhibi al-ba's...' (le second duaa mentionné)
- Confusion entre deux dua'as distincts avec attribution de sources au mauvais texte
- Le nombre 'sept fois' pour le premier duaa n'est pas confirmé dans les sources citées

---

