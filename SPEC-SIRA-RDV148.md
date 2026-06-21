# SPEC-SIRA-RDV148
# RDV 148 — Après Qurayẓa : Le palmier
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 148

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Thumāma aurait pu partir. Rentrer chez lui. Retrouver son rang, ses chameaux, sa vengeance. Trois jours prisonnier — il avait de quoi alimenter une rancune.

Il sortit de la mosquée. Mais il n'alla pas vers la sortie de Médine.

Il chercha un puits aux abords. Il trouva un palmier. Il s'arrêta là. Il se déshabilla. Il se baigna avec l'eau du puits, lentement, soigneusement. Ce n'était pas une toilette ordinaire — c'était le ghusl, le grand bain rituel qui marque une entrée. Une purification. Un commencement.

Il revint à la mosquée, propre, et s'avança vers le Messager d'Allah ﷺ. Il déclara à voix haute, devant tous ceux qui étaient là :

« J'atteste qu'il n'y a de dieu qu'Allah, et que Mohammed est le Messager d'Allah. »

Puis, sans qu'on le lui demande, il ajouta :

« Par Allah, aucun visage au monde ne m'était plus haïssable que le tien — et je le considère aujourd'hui comme le plus aimable de tous. Aucune religion au monde ne m'était plus haïssable que la tienne — et je la considère aujourd'hui comme la plus aimée. Aucune ville au monde ne m'était plus haïssable que Médine — et elle est devenue la plus chère. »

C'est ce que fait parfois la vérité quand elle entre dans quelqu'un sans forcer : elle retourne tout. Pas à moitié. Tout.

Il demanda ensuite au Prophète ﷺ : « Tes cavaliers m'ont capturé alors que je me dirigeais vers La Mecque pour la ʿumra. Que dois-je faire maintenant ? »

Le Prophète ﷺ lui dit : « Va. Fais ta ʿumra. »

Thumāma partit vers La Mecque. En entrant dans la ville, les Quraysh le reconnurent. Certains s'écrièrent : « Tu es devenu sabéen, Thumāma ? » — c'était le mot qu'ils employaient pour désigner ceux qui abandonnaient les dieux de leurs ancêtres.

Il répondit, devant les habitants de La Mecque :

« Non. Par Allah, je suis devenu musulman. Et par Allah, à partir d'aujourd'hui, aucun grain de blé du Yamâma ne parviendra à La Mecque sans la permission du Messager d'Allah ﷺ. »

Il fit sa ʿumra. Et en rentrant, il tint sa parole.

Le Yamâma — région fertile, grenier de l'Arabie centrale — approvisionnait La Mecque en blé, en dattes, en huile. Thumāma était le chef de cette région. Il ferma le robinet.

Les semaines passèrent. À La Mecque, les marchés se vidaient. Le prix du grain montait. Les familles s'inquiétaient. Et les Quraysh — les mêmes qui avaient juré de tuer Mohammed, les mêmes qui avaient levé dix mille hommes contre Médine — envoyèrent une lettre.

Au Messager d'Allah ﷺ.

Ils le suppliaient de demander à Thumāma de lever l'embargo. Ils invoquaient les liens du sang, la pitié pour les femmes et les enfants de La Mecque qui souffraient de la faim.

Le Prophète ﷺ accepta. Il écrivit à Thumāma. L'embargo fut levé.

Mais quelque chose venait de changer pour toujours dans l'équilibre de l'Arabie. La Mecque avait écrit à Mohammed pour lui demander à manger. Celui qu'on avait chassé, qu'on avait combattu, qu'on avait tenté d'assassiner — on lui demandait maintenant sa grâce pour nourrir ses enfants.

Un seul homme sous un palmier, qui se baigne et revient. Et La Mecque, quelques semaines plus tard, tend la main.
```

---

## Correction champ `source`

**REMPLACER :**
```
Saḥīḥ al-Bukhārī
```
**PAR :**
```
Sahîh al-Bukhârî — Ibn Hishâm
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV148.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv148 enrichissement Le palmier Thumama embargo La Mecque" && git push
```
