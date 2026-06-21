# SPEC-SIRA-RDV142
# RDV 142 — Banū Qurayẓa : Abū Lubāba
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 142

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Le siège dura vingt-cinq jours.

Vingt-cinq jours devant des murs de pierre. Les Banū Qurayẓa avaient des puits à l'intérieur, des provisions, des forteresses solides. Ils pouvaient tenir. Mais ils savaient — chaque jour qui passait, ils savaient davantage — ce qu'ils avaient fait. Ils avaient rompu le pacte. Ils avaient ouvert la porte arrière pendant que dix mille hommes chargeaient par devant. Et maintenant leurs alliés étaient repartis, le vent les avait dispersés, et les musulmans campaient devant leurs murs.

Ḥuyayy ibn Akhṭab était là avec eux — fidèle à sa promesse, celle qu'il avait faite à Kaʿb avant d'entrer. Mon sort sera ton sort. Il était entré dans la forteresse. Il n'en ressortirait pas vivant.

Au bout de vingt-cinq jours, les Banū Qurayẓa envoyèrent une demande.

Ils voulaient parler à Abū Lubāba.

Abū Lubāba ibn ʿAbd al-Mundhir était un Ansârî de Médine. Pas un ennemi des juifs — au contraire. Ses biens étaient près de leur forteresse. Sa famille les connaissait. Il avait des liens avec eux depuis avant l'islam, depuis les années où les tribus vivaient côte à côte. S'ils voulaient parler à quelqu'un qui les connaissait et qui pouvait être honnête avec eux, c'était lui.

Le Messager d'Allah ﷺ lui donna la permission d'aller.

Abū Lubāba entra dans la forteresse. Et aussitôt, les femmes et les enfants se précipitèrent autour de lui. Ils pleuraient. Des femmes qui tenaient leurs enfants contre elles. Des vieillards qui n'avaient nulle part où aller. Des hommes qui regardaient par les meurtrières et voyaient les tentes musulmanes tout autour.

Kaʿb ibn Asad s'approcha. Il dit : « Abū Lubāba, conseille-nous. Devons-nous nous remettre au jugement de Mohammed ? »

Abū Lubāba ouvrit la bouche. Il dit « Oui. »

Et en même temps — sans le décider, sans le vouloir — sa main se leva. Son index passa sur sa gorge.

Le geste qui dit : il vous égorgera.

Il s'en rendit compte une fraction de seconde après l'avoir fait. Pas après. Pendant. « À peine eus-je fait ce geste, je sus que j'avais trahi Allah et Son Messager ﷺ. » Il venait de sortir deux informations contradictoires en même temps — la parole d'un côté, le geste de l'autre. Il avait dit oui à voix haute et non avec la main.

Il sortit de la forteresse. Il ne retourna pas vers le Prophète ﷺ. Il ne pouvait pas — il venait de trahir. Il traversa Médine en courant. Il entra dans la mosquée. Et là, devant un pilier de palmier, il s'attacha lui-même avec une corde.

Il jura :

« Je ne mangerai plus. Je ne boirai plus. Jusqu'à ce qu'Allah accepte mon repentir. Ou jusqu'à ce que je meure. Et seul le Messager d'Allah ﷺ me détachera de ses propres mains. »

Quand le Prophète ﷺ apprit ce qui se passait, il dit : « S'il était venu directement à moi, j'aurais demandé pardon pour lui. Mais puisqu'il a fait ainsi, je ne le détacherai pas avant qu'Allah n'accepte. »

Les jours passèrent. Abū Lubāba était lié à son pilier. Les Compagnons le voyaient en passant — maigre, les lèvres sèches, les yeux enfoncés. Sa femme venait aux heures de prière, le détachait, le laissait prier, puis le rattachait. Il ne mangeait presque rien — juste ce qu'il fallait pour ne pas mourir avant que le pardon vienne.

Six nuits. Il faillit mourir.

Au matin du sixième jour, le Messager d'Allah ﷺ était chez Umm Salama quand la révélation descendit. Son visage changea — les Compagnons reconnaissaient cet état. Il sourit. Il dit : « Abū Lubāba a été pardonné. »

Umm Salama courut à la porte de sa chambre. Elle cria vers la mosquée :

« Abū Lubāba ! Réjouis-toi ! Allah a accepté ton repentir ! »

Les Compagnons coururent pour le détacher. Il refusa leurs mains.

« Seul le Messager d'Allah ﷺ. »

Le Prophète ﷺ vint lui-même. Il défit la corde de ses propres mains.

Abū Lubāba dit ensuite qu'il voulait donner en aumône tous ses biens, en remerciement. Le Prophète ﷺ lui dit : « Il suffit d'un tiers. »
```

---

## Correction champ `source`

**REMPLACER :**
```
Ibn Hishām
```
**PAR :**
```
Ibn Hishâm — Ibn Saʿd
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV142.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv142 enrichissement Abu Lubaba pilier repentir Qurayza" && git push
```
