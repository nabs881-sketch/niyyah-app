# SPEC-SIRA-RDV134
# RDV 134 — Le Khandaq : Le rocher
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 134

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Au milieu du chantier, les pics s'arrêtèrent.

Une masse blanche, massive, ancrée dans la roche vive sous le sable. Les hommes avaient essayé à plusieurs reprises — des coups forts, des coups répétés, des angles différents. La pierre refusait. Les pics rebondissaient. Le travail s'immobilisa sur cette section.

On alla chercher le Messager d'Allah ﷺ.

Il descendit dans la fosse. Il prit le pic entre ses mains. Il dit : « Bismillah. » Et il frappa.

Une étincelle jaillit — vive, blanche, qui illumina la fosse une fraction de seconde et disparut. Le Prophète ﷺ leva la tête. Il dit :

« Allahu akbar ! On m'a remis les clés de la Syrie. Par Allah, j'en aperçois actuellement les palais rouges. »

Les Compagnons dans la fosse s'arrêtèrent. Damas. Il parlait de Damas — la grande cité de Syrie, au cœur de l'Empire byzantin, à des centaines de kilomètres de là.

Il frappa une deuxième fois. Une deuxième étincelle.

« Allahu akbar ! On m'a offert la Perse. Par Allah, j'aperçois à présent le palais blanc des Madāʾin. »

Ctésiphon. La capitale sassanide. L'empire qui avait battu Rome. L'empire dont les armées étaient les plus redoutées du monde connu. Il en voyait le palais blanc depuis le fond d'un fossé de Médine.

Il frappa une troisième fois. Le rocher se brisa. Une troisième étincelle.

« Allahu akbar ! On m'a offert les clés du Yémen. Par Allah, j'aperçois d'ici même les portes de Sanaa. »

Un silence tomba dans la fosse.

Autour d'eux, la réalité était simple et dure : ils étaient mille hommes affamés, avec des pierres sur le ventre pour calmer les crampes, en train de creuser un fossé pour ne pas être exterminés par dix mille guerriers qui approchaient. Ils n'étaient même pas certains de survivre à la semaine. Et leur Prophète ﷺ leur parlait des capitales des trois plus grandes puissances du monde.

Les hypocrites présents échangèrent des regards. L'un d'eux chuchota ce que plusieurs pensaient : « Il nous promet Damas et Ctésiphon pendant qu'on n'arrive même pas à aller et venir sans avoir peur. » Allah nota leur parole. Il la cita dans la sourate al-Aḥzāb (33:12) — pour que quatorze siècles plus tard, on sache encore ce qu'ils avaient dit dans cette fosse.

Les croyants, eux, se remirent à creuser. Pas parce qu'ils comprenaient. Pas parce que les palais rouges de Damas leur semblaient accessibles depuis une tranchée de boue. Mais parce que c'était lui qui avait dit. Et que tout ce qu'il avait dit jusqu'ici s'était accompli.

La foi n'est pas la certitude de comprendre. C'est la certitude de celui qui parle.

Quinze ans plus tard, ʿUmar ibn al-Khattāb entrait à Jérusalem — à pied, en manteau rapiécé, au milieu de la splendeur byzantine. Vingt ans plus tard, les armées musulmanes franchissaient les portes de Ctésiphon. Le palais blanc que le Prophète ﷺ avait vu depuis la fosse — ils y marchaient. Et le Yémen avait été pacifié bien avant.

Les trois étincelles avaient toutes brûlé jusqu'au bout.
```

---

## Correction champ `source`

**REMPLACER :**
```
Saḥīḥ al-Bukhārī (récit de Jābir)
```
**PAR :**
```
Sahîh al-Bukhârî (récit de Jâbir) — Ibn Hishâm
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV134.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv134 enrichissement Le rocher trois etincelles prophéties" && git push
```
