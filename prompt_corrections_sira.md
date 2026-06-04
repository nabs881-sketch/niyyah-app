# CORRECTIONS SÎRA — 4 ajustements

## 1. RDV 45 (nuit du complot — ʿAlî dans le lit)

Modifier le champ source actuel pour ajouter une démarcation.

REMPLACER source par :
`"Mubarakpuri, La nuit de l'Hégire — Sîra d'Ibn Hishâm. L'épisode 'Allâh aveugla leurs yeux' vient de la Sîra classique (Ibn Hishâm/Ibn Isḥâq), pas des Sahîhs."`

## 2. RDV 280 (conversion Abû Sufyân)

Trouver dans le contenu la phrase : *« Le Messager d'Allah ﷺ comprit que la conversion d'Abû Sufyân était pragmatique plus que sincère »*

REMPLACER PAR : *« Selon certains exégètes, la conversion d'Abû Sufyân fut d'abord motivée par les circonstances ; d'autres en défendent la sincérité. Allâh sait mieux. »*

## 3. Vérifier RDV 311-350

Inspecte le JSON. Plusieurs de ces RDV semblent incomplets (316-329 avec ~2 paragraphes, 336-350 réduits au seul champ source).

**Soit** :
- (a) Ce sont des **stubs intentionnels** (à compléter plus tard) → ajouter un champ `status: "draft"` à chacun
- (b) C'est un **bug d'extraction** (champs perdus) → identifier et corriger
- (c) C'est **volontaire** (RDV synthétiques de fin) → laisser tel quel

Diagnostique et applique la solution adéquate.

## 4. Note d'introduction module

Ajouter un champ `introduction` (3 langues si structure multilangue) en tête du module :

**FR :** *« Cette Sîra retrace la vie du Prophète ﷺ en s'appuyant sur le Coran, les Sahîhs (Bukhari, Muslim) et la Sîra classique (Ibn Hishâm, Ibn Isḥâq, Mubarakpuri). Certains épisodes connus relèvent de la tradition Sîra et non des hadiths authentifiés ; ils sont signalés dans les sources. »*

## 5. Régénérer docx + commit + push

Commit : `audit sîra v2 — 4 corrections (démarcation Sîra/hadith + intro module)`

Vas-y.
