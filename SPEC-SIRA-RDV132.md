# SPEC-SIRA-RDV132
# RDV 132 — Le Khandaq : Le travail
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 132

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Mille hommes. Six jours. Et une pierre qui refuserait d'abord de céder.

Le Messager d'Allah ﷺ divisa les Compagnons en groupes de dix. Chaque groupe devait creuser quarante coudées — environ vingt mètres. Profondeur : assez pour qu'un cheval ne puisse pas sauter. Largeur : assez pour qu'aucune monture ne puisse franchir. La longueur totale de la tranchée atteindrait plusieurs kilomètres — un ouvrage colossal pour des hommes qui n'avaient que des pelles, des pics, et leurs mains.

Et le Prophète ﷺ descendit dans la fosse avec eux.

Sahl ibn Saʿd raconte : « Nous étions avec le Messager d'Allah ﷺ dans la tranchée, évacuant le sable que nous transportions sur le dos. » Al-Barāʾ ibn ʿĀzib raconte : « J'ai vu le Messager d'Allah ﷺ évacuer du sable, jusqu'à disparaître dans un nuage de poussière. » Pas un prophète sur une chaise, donnant des ordres depuis le haut. Un homme dans la fosse, qui charge sa part, qui monte et descend, qui réapparaît les vêtements couverts de terre, le visage strié de poussière, des plaques de boue dans la barbe.

Ils chantaient en creusant. Ibn Rawāḥa avait composé des vers. Les Compagnons les répétaient en rythme avec leurs pelles : « Seigneur, sans Toi nous n'aurions pas trouvé le chemin. Sans Toi, nous n'aurions ni prié ni donné. Accorde-nous la paix intérieure, et affermis nos pas à la rencontre. » Et le Prophète ﷺ reprenait avec eux, depuis sa section de tranchée.

La faim était là, permanente. On leur servait deux poignées d'orge moulu, avec une bouillie que les sources décrivent comme ayant une odeur à peine supportable. Anas ibn Mâlik raconte que les pierres du chantier étaient plus agréables à regarder que la nourriture qu'on leur apportait. Certains attachaient des pierres sur leur ventre pour tromper la faim.

Puis il arriva cet épisode. Une roche — massive, ancrée dans le sol — refusait de céder aux pics des Compagnons. Ils ne pouvaient pas avancer. Ils appelèrent le Prophète ﷺ.

Il descendit. Il prit le pic. Il frappa une première fois. Une partie de la roche éclata — et il dit : « Allahu akbar ! Les clefs de la Syrie m'ont été données. Je vois ses palais rouges depuis ici. »

Il frappa une deuxième fois. Une autre partie éclata : « Allahu akbar ! Les clefs de la Perse m'ont été données. Je vois le palais blanc de Ctésiphon. »

Il frappa une troisième fois. La roche céda entièrement : « Allahu akbar ! Les clefs du Yémen m'ont été données. »

Autour de lui, des hommes qui avaient faim, qui creusaient dans la boue depuis des jours, qui regardaient dix mille guerriers approcher — entendaient leur Prophète ﷺ annoncer la conquête de trois empires depuis le fond d'un fossé.

Ils crièrent Allahu akbar.

Certains souriaient. D'autres pleuraient. Et les pelles continuaient de creuser.
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
Lis SPEC-SIRA-RDV132.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv132 enrichissement Le travail tranchee pierre prophéties" && git push
```
