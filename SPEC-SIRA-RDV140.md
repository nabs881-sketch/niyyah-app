# SPEC-SIRA-RDV140
# RDV 140 — Le Khandaq : Maintenant
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 140

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Le matin se leva sur un champ vide.

Les Compagnons qui montaient la garde cette nuit-là virent d'abord le silence. Plus de lumières dans le camp ennemi. Plus de bruits de chevaux, plus de voix, plus de feux. Ils appelèrent les autres. Des hommes sortirent de leurs abris, de leurs sections de tranchée, et regardèrent au-delà du fossé.

Plus de tentes. Plus de drapeaux. Plus de chameaux en ligne. Juste la plaine, et le vent qui retombait doucement, son travail fait. Quelques bêtes égarées erraient parmi les débris du camp abandonné — des cordes traînantes, des piquets arrachés, des cendres froides.

Quelqu'un dit : « Ils sont partis. »

Le mot se répandit de section en section, de bouche en bouche, le long de la tranchée. Les hommes se regardèrent. Après un mois de siège, de froid, de faim et de gardes épuisantes — après avoir vu les Banū Qurayẓa trahir dans leur dos — après s'être couchés chaque nuit sans savoir s'ils se réveilleraient — ils étaient debout, et les dix mille étaient partis.

Certains pleurèrent. Certains criaient Allahu akbar. Certains restèrent silencieux, trop épuisés pour réagir autrement qu'en respirant.

Le Messager d'Allah ﷺ se tint debout sur le bord du fossé. Il regarda l'horizon — le même horizon qui, hier encore, était couvert de dix mille ennemis. Aujourd'hui, vide. Il se tourna vers ses Compagnons. Il dit, d'une voix posée, cette phrase qui marquait une rupture dans l'histoire :

« À partir de maintenant, c'est nous qui les attaquerons. Ils ne nous attaqueront plus. »

Six ans de défensive. Six ans à être la cible. Badr — on avait failli être massacrés. Uḥud — on avait perdu soixante-dix des meilleurs. Les Aḥzāb — dix mille hommes devant les murs. Six ans à creuser des fossés, à se barricader, à absorber les coups.

Maintenant, le levier basculait.

Plus jamais La Mecque ne viendrait à Médine en armée. Plus jamais une coalition de cette taille ne se reformerait. Les Quraysh étaient ruinés moralement — partir sans avoir combattu, c'était une défaite que toute l'Arabie allait commenter. Les Ghatafân étaient humiliés. Et les commanditaires de cette coalition — les chefs des Banū an-Naḍīr réfugiés à Khaybar — allaient bientôt voir les armées musulmanes à leur porte.

À Médine, les portes des forteresses s'ouvrirent. Les femmes sortirent avec leurs enfants. Les retrouvailles furent silencieuses — des gens trop fatigués pour les grands gestes, qui se touchaient les mains, qui vérifiaient que l'autre était vivant, qui pleuraient doucement dans les ruelles.

Le Prophète ﷺ rentra chez lui. Il déposa son armure. Il se lava. Il s'allongea. Un mois de siège — son corps réclamait le repos.

Jibrîl apparut.

Il était encore armé. Et il dit : « As-tu déposé les armes ? Mais nous, les anges, nous ne les avons pas déposées. Allah te commande d'aller maintenant vers les Banū Qurayẓa. Et nous t'accompagnons. »

Le Messager d'Allah ﷺ resta un instant immobile. Puis il se releva. Il reprit son armure — le même métal qu'il venait de poser. Il fit appeler les Compagnons. Il dit : « Que personne ne prie ʿAṣr avant d'avoir atteint les Banū Qurayẓa. »

Les hommes épuisés se remirent debout. Ils reprirent leurs armes. Ils sortirent.

Une journée n'était pas finie.
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
Lis SPEC-SIRA-RDV140.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv140 enrichissement Maintenant victoire khandaq Jibril" && git push
```
