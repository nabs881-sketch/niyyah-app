# CORRECTIONS MODULE DU'ÂS v2 — Audit complet

Fichier source : trouve le JSON des du'âs (probablement `duaas.json` ou similaire dans `data/`).

## ÉTAPE 1 — Ajouter champ `type` à TOUS les items

Si pas déjà présent, ajoute un champ `type` à chaque item du JSON. Valeurs possibles :
- `prophetic_authentic` (du'â textuelle du Prophète ﷺ — défaut pour la grande majorité)
- `quranic` (verset coranique récité comme du'â)
- `athar` (parole d'un Compagnon ou Tâbi'î — ex: Hasan al-Basrî)
- `inspired` (du'â composée inspirée du Coran/sunna, pas textuelle)

**Par défaut, tous les items sont `prophetic_authentic`** sauf ceux explicitement marqués ci-dessous.

## ÉTAPE 2 — Ajouter introduction module

Ajouter un champ `introduction` (3 langues si structure multilangue) en tête du module :

**Texte FR :**
*« Ce recueil de du'âs distingue plusieurs catégories : les invocations textuelles transmises du Prophète ﷺ (la majorité), les versets coraniques utilisés comme du'âs, les paroles authentifiées des Compagnons et savants pieux (athar), et certaines du'âs composées librement à partir de l'esprit du Coran et de la sunna — celles-ci sont clairement signalées comme telles (type: inspired). Toutes sont licites à réciter ; seules les premières (prophetic_authentic) sont sunna au sens strict. »*

## ÉTAPE 3 — REMPLACEMENTS (3 items)

### **ITEM 222 — Aide à se souvenir d'Allâh** (ancien titre : "Pour celui qui a peur d'être oublié")

REMPLACER intégralement :

```
Titre FR : "Aide à se souvenir d'Allâh"
Texte FR : "Ô Allah, aide-moi à T'évoquer, à Te remercier, et à T'adorer de la meilleure manière."
Arabe : "Allāhumma a'innī 'alā dhikrika wa shukrika wa husni 'ibādatik"
Source : "Abu Dawud 1522 — Sahîh selon Albâni. Le Prophète ﷺ tenait la main de Mu'âdh ibn Jabal et lui disait : 'Par Allâh, je t'aime, Mu'âdh. Ne manque jamais de dire après chaque prière cette du'â.'"
Type : prophetic_authentic
```

### **ITEM 225 — Quand on s'éloigne du dhikr** (ancien titre : "Quand on traverse l'oubli de Dieu")

REMPLACER intégralement avec **le MÊME texte que 222** mais contexte légèrement différent :

```
Titre FR : "Quand on sent son cœur s'éloigner du dhikr"
Texte FR : "Ô Allah, aide-moi à T'évoquer, à Te remercier, et à T'adorer de la meilleure manière."
Arabe : "Allāhumma a'innī 'alā dhikrika wa shukrika wa husni 'ibādatik"
Source : "Abu Dawud 1522 — Sahîh selon Albâni. La même du'â que celle enseignée à Mu'âdh — à réciter quand on sent que le cœur s'endort."
Type : prophetic_authentic
```

**NOTE :** Si tu juges les items 222 et 225 trop redondants, fusionne-les en un seul item. Sinon garde-les distincts (même du'â, contextes d'application différents — c'est légitime pour un module pédagogique).

### **ITEM 250 — Pour celui qui veut transformer son cœur**

REMPLACER le texte :

```
Texte FR : "Ô Toi qui retournes les cœurs, affermis mon cœur sur Ta religion."
Arabe : "Yā Muqalliba al-qulūb, thabbit qalbī 'alā dīnik"
Source : "Tirmidhi 2140 — hasan, classé sahîh par Albâni. C'était la du'â la plus fréquente du Prophète ﷺ selon 'Â'isha et Umm Salama."
Type : prophetic_authentic
```

Retirer la mention "Variante de Tirmidhi 2140 + Ahmad 12128".

## ÉTAPE 4 — MARQUER `type: "inspired"` + REFORMULER SOURCE (10 items)

Pour chacun de ces items, garder le texte tel quel mais :
1. Ajouter `type: "inspired"`
2. Reformuler le champ Source selon le modèle ci-dessous

### **ITEM 224 — Sincérité dans les actes**
Source : `"Du'â personnelle inspirée du Coran 98:5 ('ils ne devaient adorer qu'Allâh, Lui vouant un culte exclusif') et des hadiths sur l'ikhlâs — pas un hadith textuel."`

### **ITEM 226 — Geste discret de la sadaqa**
Source : `"Du'â personnelle inspirée du Coran 2:271 (sur l'aumône cachée) et du hadith Bukhari 660 (les sept ombres du Trône) — pas un hadith textuel."`

### **ITEM 228 — Chasteté du regard**
Source : `"Du'â personnelle inspirée du Coran 24:30-31 (sur la pudeur du regard) et du hadith Bukhari 6243 — pas un hadith textuel."`

### **ITEM 231 — Sincérité quand on enseigne**
Source : `"Du'â personnelle inspirée du Coran 38:86 ('Je ne vous demande aucun salaire') et des hadiths sur la transmission de la science — pas un hadith textuel."`

### **ITEM 232 — Sourire quotidien**
Source : `"Du'â personnelle inspirée du hadith Tirmidhi 1956 ('Sourire à ton frère est une aumône') et du caractère du Prophète ﷺ — pas un hadith textuel."`

### **ITEM 239 — Silence quand il faut**
Source : `"Du'â personnelle inspirée du hadith Bukhari 6018 ('Qui croit en Allâh et au Jour Dernier, qu'il dise du bien ou qu'il se taise') — pas un hadith textuel."`

### **ITEM 240 — Vérité qui dérange**
Source : `"Du'â personnelle inspirée du Coran 2:42 (ne pas mélanger vérité et fausseté) et du hadith Abu Dawud 4344 — pas un hadith textuel."`

### **ITEM 241 — Aider sans rappeler le bienfait**
Source : `"Du'â personnelle inspirée du Coran 2:264 (sur le mann — annuler l'aumône en la rappelant) — pas un hadith textuel."`

### **ITEM 242 — Pardonner sans recevoir d'excuses**
Source : `"Du'â personnelle inspirée du Coran 42:40 ('Qui pardonne et se réconcilie, sa rétribution incombe à Allâh') et du hadith Bukhari 6013 — pas un hadith textuel."`

### **ITEM 245 — Bon voisin**
Source : `"Du'â personnelle inspirée des hadiths Bukhari 6014 et 6015 sur le voisin — pas un hadith textuel."`

## ÉTAPE 5 — Corrections audit Option 2

### **ITEM 140 — Pour la beauté du caractère**

REMPLACER intégralement :

```
Texte FR : "Ô Allah, Tu as embelli ma création, embellis aussi mon caractère."
Arabe : "Allāhumma ahsanta khalqī fa-ahsin khuluqī"
Source : "Ahmad 24392 — sahîh selon Albâni (Sahîh al-Jâmi' 1307). Rapporté de 'Â'isha ﺭﺿﻲ ﺍﻟﻠﻪ ﻋﻨﻬﺎ."
Type : prophetic_authentic
```

**IMPORTANT :** retirer l'addition `"wa harrim wajhī 'alā an-nār"` qui n'a pas de source authentique pour cette du'â.

Aussi : retirer la source actuelle "Ahmad 3823 + Sahih de l'addition" (Ahmad 3823 n'est pas le bon numéro).

### **ITEM 136 — Toilettes (étendu)**

Modifier le champ Source actuel :
`"Bukhari 142, Muslim 375 + Abu Dawud"`

REMPLACER PAR :
`"Bukhari 142, Muslim 375 (formule de base : Allāhumma innī a'ūdhu bika...). L'ajout du 'Bismillâh' avant la formule vient d'Abu Dawud (chaîne contestée, classée da'îf par certains muhaddithûn) — la pratique reste largement répandue par habitude pieuse."`

Type : `prophetic_authentic` (la formule centrale est authentique, l'extension est nuancée).

### **ITEM 5 et ITEM 12 — Vérifier sources**

Les deux items citent : `"Abu Dawud 4023, Tirmidhi 3458, Ibn Majah 3285"`

**Vérifier dans le JSON :**
- Item 5 : "La louange qui clôt le repas" → source correcte (du'â après repas = Abu Dawud 4023 ✓)
- Item 12 : "Habiller le corps, habiller le cœur" → la source devrait être différente (du'â en s'habillant). Vérifier que ce n'est pas une erreur de copier-coller et corriger si nécessaire (la du'â de l'habillage = Abu Dawud 4023 différent OU Tirmidhi 3560 selon le texte).

Si même source réellement, c'est OK. Si erreur, corriger.

## ÉTAPE 6 — Vérifications finales

- JSON valide
- 253 items préservés (sauf si fusion 222/225)
- Champ `type` ajouté à tous les items
- 3 remplacements appliqués (222, 225, 250)
- 10 items marqués `inspired` avec sources reformulées
- 4 corrections audit Option 2 appliquées (140, 136, 5, 12)
- Introduction module ajoutée

## ÉTAPE 7 — Régénérer le docx

Supprime l'ancien duaas.docx, régénère depuis le JSON corrigé. Même emplacement.

## ÉTAPE 8 — Commit + push

Commit : `audit du'âs v2 — catégorisation type (3 remplacements + 10 inspired + 4 corrections + intro)`

Push.

Vas-y.
