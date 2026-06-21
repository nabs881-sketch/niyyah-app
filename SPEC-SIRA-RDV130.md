# SPEC-SIRA-RDV130
# RDV 130 — Vers le Khandaq : Dix mille
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 130

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Deux ans.

Ḥuyayy ibn Akhṭab avait passé deux ans à Khaybar depuis l'expulsion des Banū an-Naḍīr. Deux ans à regarder ses palmiers brûlés depuis le souvenir. Deux ans à entendre les nouvelles de Médine — chaque expédition musulmane, chaque tribu ralliée, chaque pacte signé. Deux ans à voir l'islam s'étendre pendant que lui se retranchait dans une oasis du nord.

Il avait une idée. Une grande idée. Mais pour la mettre en œuvre, il avait besoin de La Mecque.

Vingt hommes partirent de Khaybar. Ḥuyayy ibn Akhṭab et Sallām ibn Abī al-Ḥuqayq en tête — les deux chefs qui avaient le plus à perdre et le plus à venger. Ils prirent la route du sud.

À La Mecque, les Quraysh les reçurent. Abū Sufyān écouta.

Ḥuyayy parla. Il dit ce que tout le monde savait déjà mais que personne n'avait formulé aussi clairement : Mohammed s'étend. Sa religion gagne des tribus, des cœurs, des territoires. Si vous ne le frappez pas maintenant — dans Médine, chez lui, là où il est encore possible de le faire — ce sera trop tard. Dans deux ans, dans cinq ans, c'est lui qui viendra à vous. Pas vous qui irez à lui.

Il dit : nous apportons de l'or. Nous mobilisons les Ghatafân. Nous rallions tout ce qui peut l'être. Vous prenez la tête. Et vous frappez une fois pour toutes.

Les Quraysh dirent oui.

Eux qui n'étaient pas venus au rendez-vous de Badr. Eux qui avaient perdu la face devant toute l'Arabie. C'était leur chance de tout reprendre d'un coup.

La coalition s'assembla comme une marée. Quatre mille Quraysh sous Abū Sufyān. Mille cinq cents Ghatafân sous ʿUyayna ibn Ḥiṣn. Quatre cents Banū Murra. Sept cents Banū Ashjaʿ. Des Banū Sulaym, des Banū Asad, et d'autres encore, et d'autres. Tribu après tribu, cavalier après cavalier, la masse grossissait.

Au total : environ dix mille hommes. La plus grande armée que l'Arabie eût jamais mobilisée contre un seul adversaire.

À Médine, les services de renseignements du Prophète ﷺ apportèrent la nouvelle. Elle circula dans la ville comme une vague froide. Dix mille. Médine ne comptait peut-être pas plus de quelques milliers d'hommes valides. Une coalition deux à trois fois supérieure en nombre, lourdement armée, financée, motivée par deux ans de vengeance accumulée — et qui avançait.

Mubarakpuri écrit : « Si jamais cette armée était parvenue aux murs de Médine, ç'aurait été la fin. Peut-être les musulmans auraient été exterminés. »

Le Messager d'Allah ﷺ convoqua le conseil. Les Compagnons s'assirent. Chacun savait ce que représentaient dix mille hommes. La question n'était pas de savoir si on allait se battre — elle était de savoir comment.

Sortir à leur rencontre ? Impossible. Se barricader dans les maisons ? La ville était ouverte, sans remparts dignes de ce nom. Tenir une position ? Où ? Comment ?

Le silence pesait dans l'assemblée.

C'est alors qu'un homme se leva. Un Persan. Un homme qui avait traversé l'empire sassanide, qui avait connu les armées d'Orient, qui avait voyagé plus loin que n'importe qui dans cette pièce. Il avait quelque chose à proposer — quelque chose qu'aucun Arabe n'avait jamais vu.

Il s'appelait Salmān al-Fārisī.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sîra classique (Ibn Hishâm / Ibn Isḥâq)
```
**PAR :**
```
Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV130.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv130 enrichissement Dix mille coalition khandaq" && git push
```
