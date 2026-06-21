# SPEC-SIRA-RDV132-CORRECTION
# RDV 132 — Le Khandaq : Le travail
# Correction — supprimer doublon épisode de la pierre (traité en RDV 134)

## Fichier cible
`data/sira/sira.json` — entrée RDV 132

---

## Supprimer le passage sur la pierre à la fin du texte

**REMPLACER :**
```
Puis il arriva cet épisode. Une roche — massive, ancrée dans le sol — refusait de céder aux pics des Compagnons. Ils ne pouvaient pas avancer. Ils appelèrent le Prophète ﷺ.

Il descendit. Il prit le pic. Il frappa une première fois. Une partie de la roche éclata — et il dit : « Allahu akbar ! Les clefs de la Syrie m'ont été données. Je vois ses palais rouges depuis ici. »

Il frappa une deuxième fois. Une autre partie éclata : « Allahu akbar ! Les clefs de la Perse m'ont été données. Je vois le palais blanc de Ctésiphon. »

Il frappa une troisième fois. La roche céda entièrement : « Allahu akbar ! Les clefs du Yémen m'ont été données. »

Autour de lui, des hommes qui avaient faim, qui creusaient dans la boue depuis des jours, qui regardaient dix mille guerriers approcher — entendaient leur Prophète ﷺ annoncer la conquête de trois empires depuis le fond d'un fossé.

Ils crièrent Allahu akbar.

Certains souriaient. D'autres pleuraient. Et les pelles continuaient de creuser.
```

**PAR :**
```
Les pelles continuaient de creuser. Les chants continuaient de monter. Et quelque part dans ce fossé, sous la poussière et la faim, quelque chose se construisait qui durerait bien plus longtemps que la tranchée.
```

---

## Build
```
Lis SPEC-SIRA-RDV132-CORRECTION.md et applique-le exactement.
npm run build && git add -A && git commit -m "fix: sira rdv132 suppression doublon episode pierre (traite en rdv134)" && git push
```
