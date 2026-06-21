# SPEC-SIRA-RDV135
# RDV 135 — Le Khandaq : Les Aḥzāb
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 135

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Ils arrivèrent comme un nuage.

D'abord la poussière. Une colonne de terre et de sable qui montait à l'horizon, visible à dix milles à la ronde. Médine entendit avant de voir — un grondement sourd, régulier, le pas de milliers de chevaux et de chameaux qui résonnait dans le sol. Les enfants furent pris dans les bras. Les femmes coururent vers les forteresses. Les Compagnons, depuis leurs positions derrière le fossé, regardèrent le ciel se couvrir au nord.

Dix mille hommes. Sept cents chevaux. Trois mille chameaux. La plus grande armée que l'Arabie eût jamais mobilisée.

Le Prophète ﷺ avait trois mille hommes. Derrière eux, le mont Salaʿ — une colline volcanique noire qui fermait le dos. Devant eux, le fossé. Pas d'autre défense. Pas d'autre choix.

Les Aḥzāb approchèrent. Ils virent la tranchée.

Ils s'arrêtèrent.

Une ligne creusée dans la terre, profonde, longue, qui barrait l'approche de Médine sur tout son flanc nord. Les éclaireurs descendirent de cheval et regardèrent. Les chefs se concertèrent. Aucun d'eux n'avait jamais vu ça. La guerre arabe ne fonctionnait pas ainsi. On ne creusait pas la terre — on se battait dessus.

Abū Sufyān envoya des cavaliers longer le fossé dans les deux sens, cherchant un point faible, une section moins profonde, un endroit où les chevaux pourraient sauter. Ils revinrent avec le même rapport : rien. Le fossé tenait sur toute la longueur. Chaque section était gardée par des archers.

Des tentatives furent lancées. ʿAmr ibn ʿAbd Wudd — un guerrier légendaire, qu'on disait valoir mille cavaliers — trouva avec quelques hommes une section légèrement plus étroite et tenta de franchir avec son cheval. Il passa. Quelques autres passèrent avec lui. Ils se retrouvèrent coincés entre le fossé et les lignes musulmanes — ʿAlī ibn Abī Tālib les affronta. ʿAmr tomba. Les autres retraversèrent ou furent tués.

Les Aḥzāb n'avaient pas prévu ça. Ils étaient venus pour une bataille rapide — écraser Médine en un ou deux jours, rentrer chez eux victorieux. Ils n'avaient pas amené de matériel de siège. Ils n'avaient pas de provisions suffisantes pour tenir des semaines. Ils étaient venus pour la fin de l'islam — et ils se retrouvaient devant un fossé qu'ils ne pouvaient pas franchir.

Abū Sufyān posa ses tentes. Il décida d'attendre. Son calcul était double : la faim dans Médine finirait par avoir raison des Compagnons avant que ses propres réserves ne s'épuisent. Et surtout — il comptait sur une alliance qui pouvait tout changer.

À l'intérieur même de Médine, derrière les lignes musulmanes, se trouvaient les Banū Qurayẓa. Une tribu juive encore liée aux musulmans par un pacte. Si les Banū Qurayẓa rompaient leur alliance et attaquaient par derrière — les musulmans seraient pris en tenaille. Fossé devant. Ennemi derrière. Pas d'issue.

Pour s'en assurer, Abū Sufyān envoya l'homme qu'il fallait : Ḥuyayy ibn Akhṭab. Le chef des Banū an-Naḍīr expulsés. L'homme qui avait monté toute cette coalition depuis Khaybar. L'homme qui connaissait tout le monde, qui savait négocier, qui savait promettre. Il prit la route vers la forteresse des Banū Qurayẓa.

Il frappa à leur porte.
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
Lis SPEC-SIRA-RDV135.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv135 enrichissement Les Ahzab arrivee coalition fossé" && git push
```
