# SPEC-SIRA-RDV136
# RDV 136 — Le Khandaq : Kaʿb ouvre la porte
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 136

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Ḥuyayy ibn Akhṭab prit la route vers la forteresse des Banū Qurayẓa.

Kaʿb ibn Asad était leur chef. Un homme respecté, connu pour tenir sa parole — c'est ce qui faisait sa valeur dans les tribus. Il avait signé, quelques années plus tôt, un pacte avec le Messager d'Allah ﷺ. Un engagement clair : en cas d'attaque contre Médine, les Banū Qurayẓa défendraient la ville avec les musulmans. Pas d'agression. Pas de trahison. Un pacte scellé.

Quand Ḥuyayy frappa à sa porte, Kaʿb n'ouvrit pas.

Il dit depuis l'intérieur : « Tu m'apportes le malheur. Va-t'en. »

Ḥuyayy resta. Il parla à travers la porte.

« Je t'apporte les Quraysh et les Ghatafân. Dix mille hommes campés devant Médine. Jamais l'Arabie n'a vu une telle coalition. C'est l'occasion de finir Mohammed une fois pour toutes. Romps le pacte. Rejoins-nous. »

Kaʿb répondit : « Tu m'apportes un nuage qui ne donne pas de pluie, même si le tonnerre gronde fort. Je connais Mohammed depuis des années — je ne lui connais que sincérité et fidélité. Je ne romps pas ma parole. »

Ḥuyayy ne partit pas. Il revint le lendemain. Il revint le surlendemain. Il frappait, parlait, argumentait, suppliait, menaçait, promettait. Il dit que si les Quraysh et les Ghatafân partaient sans avoir défait Mohammed, lui, Ḥuyayy, entrerait dans la forteresse des Banū Qurayẓa et partagerait leur sort jusqu'au bout. « Mon sort sera ton sort. »

Kaʿb finit par ouvrir la porte.

Ce qui se passa exactement dans son cœur — personne ne le sait. La peur de se retrouver du mauvais côté si la coalition gagnait. L'appât d'une victoire totale. La fatigue de résister à un homme qui ne partait pas. Ou simplement le calcul froid d'un chef qui pensait protéger les siens en rejoignant le camp le plus fort.

Il rompit le pacte.

Sept cents hommes en armes, à l'intérieur même de Médine, derrière les femmes et les enfants des musulmans — les Banū Qurayẓa venaient de basculer dans le camp de la coalition. La porte arrière s'ouvrait.

Quand la nouvelle parvint au Messager d'Allah ﷺ, son visage changea. Les Compagnons qui le regardaient virent quelque chose passer sur ses traits qu'ils ne lui avaient pas souvent vu.

Il envoya deux Saʿd vérifier discrètement : Saʿd ibn Muʿādh — chef des Aws, ancien allié des Banū Qurayẓa — et Saʿd ibn ʿUbāda — chef des Khazraj. Des hommes que les Banū Qurayẓa connaissaient et à qui ils parleraient franchement.

Ils revinrent. Devant le Prophète ﷺ et les Compagnons, pour ne pas semer la panique, ils dirent en code : « ʿAḍal et al-Qāra. »

Ceux qui étaient là comprirent. ʿAḍal et al-Qāra — c'était une référence à l'épisode d'ar-Rajîʿ, quelques années plus tôt, où des tribus avaient attiré des musulmans sous prétexte d'alliance, puis les avaient trahis et livrés à leurs ennemis. Le code voulait dire : c'est la même chose. La trahison est confirmée.

Médine était encerclée des deux côtés.

Le Coran allait décrire ce moment dans la sourate al-Aḥzāb avec une précision que seul celui qui était là pouvait comprendre : « Quand ils vous arrivèrent de devant et de derrière, et que les regards devinrent confus, et que les cœurs remontèrent à la gorge. » (33:10)

Les regards confus. Les cœurs à la gorge. C'était exactement ça.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sourate Al-Aḥzāb (33:10)
```
**PAR :**
```
Sourate al-Aḥzāb (33:10) — Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV136.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv136 enrichissement Kab ouvre la porte trahison Qurayza" && git push
```
