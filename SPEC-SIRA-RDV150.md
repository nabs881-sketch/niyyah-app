# SPEC-SIRA-RDV150
# RDV 150 — Vers Ḥudaybiya : L'arbre
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 150

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Quand les Quraysh apprirent que Mohammed approchait avec mille quatre cents hommes en ihrâm, ils ne virent pas des pèlerins. Ils virent une armée potentielle aux portes de leur ville. Ils dépêchèrent Khâlid ibn al-Walîd — leur meilleur général — à la tête de deux cents cavaliers pour barrer la route principale.

Le Messager d'Allah ﷺ fut informé. Il ne força pas le passage. Il chercha un guide qui connaissait les chemins détournés. On lui en trouva un. La colonne blanche s'enfonça dans des terres rocailleuses, des ravins difficiles, loin de la piste habituelle. Mille cinq cents hommes en tissu blanc, pieds nus ou en sandales, marchant sur des pierres sous le soleil d'Arabie — parce qu'ils ne voulaient pas verser de sang dans le mois sacré, parce qu'ils venaient pour la maison d'Allah, pas pour la guerre.

Ils arrivèrent à Ḥudaybiya. Un lieu à la limite de la zone sacrée — juste en dehors du ḥaram, juste avant la frontière invisible qui protège La Mecque. Et là, al-Qaṣwâ' s'arrêta.

La chamelle du Prophète ﷺ refusa d'avancer. Les Compagnons tirèrent sur la bride. Elle se coucha. Ils dirent : « Elle s'obstine. » Le Prophète ﷺ répondit : « Non. Ce qui a retenu l'éléphant la retient. »

L'éléphant — c'était Abraha, le chef abyssin qui avait marché sur La Mecque avec ses éléphants pour détruire la Kaʿba, l'année même de la naissance du Prophète ﷺ. L'éléphant de tête s'était couché aux portes de La Mecque et avait refusé d'avancer. La Mecque avait été épargnée. Le message d'al-Qaṣwâ' était clair : ce n'est pas à nous d'entrer de force. Il fit camper là.

Il envoya ʿUthmân ibn ʿAffān en émissaire vers La Mecque. ʿUthmân était Omeyyade — la famille la plus puissante des Quraysh. Il pouvait entrer en sécurité. Il devait porter un seul message : nous venons en pèlerins, nous voulons faire le tawâf et repartir, nous ne venons pas pour la guerre.

ʿUthmân entra dans La Mecque.

Une heure passa. Deux heures. Le camp attendait. Le soleil bougeait. ʿUthmân ne revenait pas.

Puis une rumeur courut d'homme en homme : ʿUthmân avait été tué.

Personne ne savait d'où venait l'information. Personne ne pouvait la confirmer. Mais elle circulait. Et dans un camp de pèlerins en ihrâm, loin de chez eux, entourés d'ennemis potentiels, la rumeur prit.

Le Messager d'Allah ﷺ entendit. Son visage changea. Il se leva. Il s'avança vers un arbre épineux qui poussait là — un samurah, l'arbre d'Arabie — et il s'assit à son pied. Il dit :

« Je ne quitterai pas cet endroit avant d'avoir combattu ceux-là. Venez prêter serment. »

Mille quatre cents hommes se levèrent. Ils s'avancèrent un par un vers le Prophète ﷺ, assis sous l'arbre. Ils mirent leur main dans la sienne. Et ils jurèrent.

Certains jurèrent de ne jamais fuir. D'autres jurèrent de mourir plutôt que de reculer. Salama ibn al-Akwaʿ s'avança trois fois — au début du serment, au milieu, et à la fin — et chaque fois il jura de mourir pour le Prophète ﷺ. Abū Sinân al-Asadî fut le premier à poser la main.

Et pour ʿUthmân — qu'on croyait mort, qui n'était pas là pour jurer — le Messager d'Allah ﷺ tendit sa main droite, la frappa sur sa main gauche, et dit : « Celle-ci est pour ʿUthmân. » Il prêta serment à sa place. La main du Prophète ﷺ valait la main de son envoyé.

Un seul homme ne vint pas. Jadd ibn Qays — dont le nom était connu comme celui des hypocrites. Il se glissa sous le ventre de son chameau et attendit que ça passe. Il n'y avait pas d'arbre pour les lâches.

Allah regarda cette scène depuis le ciel. Et Il fut content.

Il le dira lui-même, dans la sourate al-Fath, révélée peu après : « Allah a été content des croyants quand ils te prêtaient serment sous l'arbre. Il a su ce qu'il y avait dans leurs cœurs. Il a fait descendre sur eux la sérénité et les a récompensés par une victoire prochaine. » (48:18)

La bayʿa ar-Riḍwān. Le serment de l'agrément. Pas le serment de la victoire — le serment qui agrée Allah.

ʿUthmân revint vivant quelques heures plus tard. La rumeur était fausse. Mais le serment, lui, avait été réel. Et il resterait dans l'histoire de l'islam comme le moment où mille quatre cents hommes avaient mis leur main dans la main d'un seul homme, sous un arbre, prêts à mourir — et où Allah avait dit qu'Il était content.

Plus tard, ʿUmar ibn al-Khattâb ferait abattre l'arbre. Les gens commençaient à venir prier sous lui — il ne voulait pas qu'on en fasse un lieu de culte. C'était cela, l'esprit : honorer le geste sans sacraliser la chose.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sourate Al-Fatḥ (48:18) — Saḥīḥ al-Bukhārī
```
**PAR :**
```
Sourate al-Fath (48:18) — Sahîh al-Bukhârî
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV150.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv150 enrichissement L arbre bayaa ridwan Hudaybiya" && git push
```
