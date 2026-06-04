# AUDIT SAVAIS_TU.DOCX — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** `savais_tu.docx` (+ JSON miroir)
**Source de l'audit :** Audit théologique Niyyah, session 2026-05-23
**Structure :** 459 faits sourcés, en deux régimes (1-343 développés, 344-459 compacts)
**Nombre de corrections :** 9 corrections de fond + nettoyage des faits 344-459
**Niveau global :** Excellent sur 1-343. Hétérogène sur 344-459.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE `savais_tu.docx` (et son JSON miroir).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. COMMIT à la fin : `audit théologique savais_tu : 9 corrections + nettoyage`

---

## CORRECTION 1 — Faits 369, 372, 397, 441 : SOURCES CASSÉES (reconstruction)

Plusieurs sources sont corrompues (texte mis dans la source, source tronquée).

### Fait 369

**SOURCE ACTUELLE (cassée) :**
> *quiconque les énumère (ahsaha) entrera au Paradis.*

**TEXTE ACTUEL (tronqué) :**
> Selon le hadith authentique (Boukhari/Muslim) : "Allah a 99 noms

**REMPLACER PAR :**

Source : *Sahih Bukhari 2736 / Sahih Muslim 2677*

Texte : Le Prophète ﷺ a dit : « Allah a quatre-vingt-dix-neuf noms. Quiconque les énumère entrera au Paradis. » Ar-Rahman, Ar-Rahim, Al-Malik, Al-Quddus… Quatre-vingt-dix-neuf clés pour comprendre qui est Allah.

*Note : ce fait fait doublon avec le Fait 291. Choisir lequel garder, supprimer l'autre.*

---

### Fait 372

**SOURCE ACTUELLE (cassée) :** *devenant l*

**REMPLACER PAR :** *Britannica 'Mosque architecture' / UNESCO*

**TEXTE :**
> Les premiers minarets architecturaux apparaissent en Syrie sous les Omeyyades, dont la Mosquée des Omeyyades de Damas, fondée au 8ᵉ siècle. Avant cela, l'appel à la prière se faisait depuis le toit. L'architecture du minaret est née là.

---

### Fait 397

**SOURCE ACTUELLE (tronquée) :** *Bayhaqi, Shu*

**REMPLACER PAR :** *Bayhaqi, Shu'ab al-Iman*

(Le reste du fait reste inchangé.)

---

### Fait 441

**SOURCE ACTUELLE (cassée) :**
> *il commanda de nombreuses batailles victorieuses avant et après son entrée en Islam.*

**TEXTE ACTUEL (tronqué) :**
> Khalid ibn al-Walid, surnommé "l'épée d'Allah" (Sayf Allah), est l'un des plus grands stratèges militaires de l'histoire islamique

**REMPLACER PAR :**

Source : *Sirat Ibn Hisham / Tabari*

Texte : Khalid ibn al-Walid, surnommé « l'Épée d'Allah » (Sayf Allah), est l'un des plus grands stratèges militaires de l'histoire. Il a commandé de nombreuses batailles avant et après son entrée en islam, et il est mort dans son lit en disant : « J'ai compté cinquante blessures sur mon corps, aucune dans le dos. »

*Note : ce fait fait doublon avec le Fait 70. Choisir lequel garder, supprimer l'autre.*

---

## CORRECTION 2 — DÉDUPLICATION (suppression de doublons)

Les faits compacts (344-459) reprennent souvent des contenus déjà développés dans 1-343. **Supprimer les versions compactes redondantes** OU les fusionner. Garder les versions développées (1-343) qui sont plus riches.

**À SUPPRIMER (doublons clairs) :**

- **Fait 355** (doublon de Fait 243 — Bukhari 13 "aimer pour son frère")
- **Fait 357** (doublon de Fait 160 — Bukhari 6114 "le fort se contrôle")
- **Fait 374** (doublon de Fait 171 — empan/coudée)
- **Fait 402** (doublon de Fait 139 — Tirmidhi 3895 "meilleur envers sa femme")
- **Fait 404** (doublon de Fait 94 — Coran 94:5-6 difficulté/facilité)
- **Fait 411** (doublon de Fait 325 — manger ensemble baraka)
- **Fait 414** (doublon de Fait 38 — course Aisha)
- **Fait 442** (doublon de Fait 311 — datte/eau pour iftar)

**Après suppression, renuméroter les faits restants pour garder une séquence continue.**

---

## CORRECTION 3 — Fait 332 : Hadith de la mouche, prudence scientifique

**Problème :** L'étude King Saud 2013 citée comme validation est contestée par la communauté scientifique mainstream. Risque de crédibilité si un utilisateur creuse.

**REMPLACER :**
> En 2013, une étude scientifique a confirmé : sur les ailes de la mouche existent des bactéries pathogènes, et leurs propres antibiotiques pour les contrer.

**PAR :**
> Une étude saoudienne de 2013 a tenté de documenter scientifiquement ce hadith. Les résultats sont discutés dans la communauté scientifique. Mais le texte du Prophète ﷺ, lui, traverse les siècles intact — comme une consigne dont on n'a pas encore percé tous les sens.

---

## CORRECTION 4 — Fait 90 : Bouddha/Confucius prophètes

**Problème :** Identifier explicitement Bouddha et Confucius comme prophètes potentiels est de la spéculation rejetée par la majorité des oulémas. Le hadith cité (Musnad Ahmad sur 124 000 prophètes) est da'if selon plusieurs muhaqqiqîn.

**REMPLACER :**
> Le Prophète ﷺ a dit qu'il y a eu cent vingt-quatre mille prophètes envoyés par Allah à toutes les nations de l'histoire. Bouddha, Confucius, les prophètes amérindiens, africains, océaniens – peut-être étaient-ils parmi eux. Aucun peuple n'a été oublié. C'est la doctrine islamique.

**PAR :**
> La tradition rapporte qu'un grand nombre de prophètes ont été envoyés à toutes les nations de l'histoire. Le Coran le dit clairement : « Il n'est pas de peuple qui n'ait reçu un avertisseur. » (35:24). Tous n'ont pas été nommés. Mais aucun peuple n'a été oublié. C'est l'universalité de la doctrine islamique.

---

## CORRECTION 5 — Fait 273 : Hadith faible, cohérence interne

**Problème :** Le hadith est signalé "faible" en source mais le texte conclut "mécanisme spirituel précis", ce qui contredit la signalisation.

**REMPLACER la fin du fait :**
> Pas une métaphore floue. Un mécanisme spirituel précis.

**PAR :**
> Hadith faible selon les muhaqqiqîn, mais largement transmis pour sa beauté. À prendre comme une image, pas comme une doctrine établie. La tendresse conjugale, elle, est bien attestée dans l'islam — par d'autres hadiths plus solides.

---

## CORRECTION 6 — Fait 433 : Hadith "côte", contexte nécessaire

**Problème :** Hors contexte, peut être lu comme misogyne dans un contexte occidental. Risque Play Store.

**REMPLACER :**
> Le Prophète ﷺ a dit : "Traitez bien les femmes, car elles sont créées d'une côte."

**PAR :**
> Le Prophète ﷺ a dit : « Traitez bien les femmes. Elles ont été créées d'une côte – et la partie la plus courbe de la côte est en haut. Si tu essaies de la redresser, tu la brises. Si tu la laisses, elle reste courbe. Traite donc les femmes avec douceur. » (Bukhari 3331). Une métaphore sur le respect de la différence. Pas une infériorité — une intelligence.

---

## CORRECTION 7 — Fait 396 : "Monde prison du croyant"

**Problème :** Isolé, peut être lu comme dépressogène. Risque pour utilisateurs vulnérables.

**REMPLACER :**
> Le Prophète ﷺ a dit : "Le monde est une prison pour le croyant et un paradis pour le mécréant."

**PAR :**
> Le Prophète ﷺ a dit : « Le monde est une prison pour le croyant et un paradis pour le mécréant. » Pas une condamnation de la vie ici. Une mise en perspective : tout ce qui te limite aujourd'hui — les épreuves, les contraintes, les efforts — est minuscule par rapport à ce qui t'attend. Le croyant ne souffre pas du monde. Il en attend mieux.

---

## CORRECTION 8 — Fait 440 : "Défendre ses biens = martyr"

**Problème :** Hors contexte d'auto-défense, peut être interprété comme incitation violente. Risque Play Store.

**REMPLACER :**
> Le Prophète ﷺ a dit : "Celui qui meurt en défendant ses biens est un martyr."

**PAR :**
> Le Prophète ﷺ a dit : « Celui qui meurt en défendant ses biens face à une agression est un martyr. » Bukhari 2480. Le hadith parle d'auto-défense légitime face à un agresseur — pas d'attaque ni de vengeance. La propriété privée est protégée. La vie de l'agressé est sacrée.

---

## CORRECTION 9 — Fait 233 : os du coccyx, précaution renforcée

**Problème :** "Ne se décompose pas" scientifiquement incorrect. Le texte amorce une auto-correction mais reste ambigu.

**REMPLACER :**
> Le Prophète ﷺ a dit : « Tous les fils d'Adam mourront. Sauf un. La queue du coccyx. Ce petit os ne se décompose pas. C'est de là que l'homme sera recréé au jour de la Résurrection. » C'est par cet os, dit le hadith, que l'homme renaîtra. Une promesse théologique, pas une démonstration scientifique. Mais une promesse qui désigne précisément la base de la colonne, là où la vie est inscrite. Le Prophète parlait au 7ᵉ siècle d'un point anatomique précis. Garde la pensée.

**PAR :**
> Le Prophète ﷺ a dit : « Tout le corps d'Adam se décomposera, sauf le 'ajb adh-dhanab — la base du coccyx. C'est de là qu'Allah le recréera au Jour de la Résurrection. » Bukhari 4935. Une promesse théologique sur la résurrection. Pas une affirmation scientifique sur la décomposition. Allah désigne un point — la base de la colonne, là où l'embryon humain commence — et dit : c'est ici que Je recommencerai. Le Prophète parlait au 7ᵉ siècle d'un point anatomique précis. Le mystère reste entier.

---

## VALIDATION POST-EXÉCUTION

Après les modifications :
1. Vérifier que les 4 sources cassées (369, 372, 397, 441) sont reconstruites.
2. Vérifier la suppression des 8 doublons identifiés.
3. Renuméroter la séquence finale pour qu'elle soit continue.
4. Vérifier qu'aucun autre fait n'a été touché.
5. COMMIT : `audit théologique savais_tu : 9 corrections + nettoyage doublons`

---

## NOTES MÉTHODOLOGIQUES

### Translittération
Ce fichier utilise **"Allah"** (sans accent) — cohérent avec prophetes.docx mais incohérent avec recits_coran.docx. Décision Nabs en attente.

### Régime éditorial
Les faits 1-343 sont au standard "Chroniques Insolites" version islamique. Les faits 344-459 semblent être un fonds plus brut intégré tardivement. Si tu veux uniformiser le standard, un travail d'étoffement de 100 faits sera nécessaire — à programmer en phase 2 séparée.

### Faits intouchables (validés)
Les faits suivants ont été identifiés comme sommets pédagogiques du fichier — ne pas modifier sauf demande explicite :
- Fait 1 (Al-Qarawiyyin)
- Fait 50 (Aïcha autorité juridique)
- Fait 75 (Malcolm X Hajj)
- Fait 91 (Coran 5:32 sauver une vie)
- Fait 154 (Conquête Mecque sans sang)
- Fait 247 (Mosquée de Paris + juifs sauvés)
- Fait 264 (nfar marocain)

---

## SYNTHÈSE

- **9 corrections vraies** sur 459 faits.
- **8 doublons** à supprimer.
- **4 sources cassées** à reconstruire.
- **Verdict global :** très bon fichier, nécessite ce nettoyage avant audit Gemini phase 2.
