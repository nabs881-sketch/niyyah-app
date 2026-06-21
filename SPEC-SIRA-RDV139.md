# SPEC-SIRA-RDV139
# RDV 139 — Le Khandaq : Le vent
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 139

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Presque un mois de siège. Les Compagnons tenaient le fossé de jour comme de nuit, par rotation, dans le froid du désert. Le Prophète ﷺ lui-même dormait peu — les sources rapportent qu'il y eut une nuit entière sans qu'il puisse accomplir ses prières, tellement les gardes et les alertes s'enchaînaient.

Ce soir-là, il leva les mains.

« Seigneur, Toi qui as révélé le Livre, Toi dont les comptes sont rapides, mets les coalisés en déroute. Seigneur, mets-les en fuite et ébranle-les. »

Et Allah envoya le vent.

Pas une brise. Un vent violent, glacial, soudain — qui tomba sur le camp des Aḥzāb sans avertissement dans la nuit la plus froide de cet hiver. Il déchira les tentes. Il renversa les marmites. Il dispersa les chameaux dans l'obscurité. Il arracha les piquets des cordes de campement. Il s'infiltrait partout — dans les manteaux, dans les os, dans les yeux. Il éteignait les feux au moment où on les rallumait.

De l'autre côté du fossé, les Compagnons entendaient le chaos. Tentes qui s'effondrent. Bêtes qui braient et fuient. Voix qui crient dans le désordre. Personne ne comprenait encore ce qui se passait.

Le Messager d'Allah ﷺ appela Ḥuḏayfa ibn al-Yamān. Un homme discret, courageux, connu pour sa capacité à aller là où les autres n'allaient pas. Il lui dit : « Va voir ce qu'ils font. Et reviens me rapporter. »

Ḥuḏayfa traversa le fossé seul. Dans la nuit. Dans le froid. Il raconta plus tard : « Je n'avais pas peur d'eux. J'avais peur du froid. »

Il s'avança dans le camp des Aḥzāb. C'était le désordre total. Des silhouettes qui couraient chercher leurs chevaux. Des hommes qui essayaient de maintenir des tentes qui s'effondraient. Des feux qui ne tenaient pas. Personne ne parlait à personne — chacun était absorbé par sa propre survie contre le vent.

Ḥuḏayfa trouva Abū Sufyān assis près d'un feu, essayant de se réchauffer les mains. Il s'approcha. Il s'assit presque à côté de lui. Personne ne le regarda. Personne ne le reconnut.

Puis Abū Sufyān se leva soudain et cria dans la nuit : « Que chacun s'assure de l'identité de son voisin avant de parler — les espions sont peut-être parmi nous ! »

Ḥuḏayfa eut une fraction de seconde pour réagir. Avant que quelqu'un ne lui pose la question, il saisit la main de l'homme à sa droite et lui dit : « Qui es-tu ? » Puis celle de l'homme à sa gauche : « Qui es-tu ? » — pour donner l'illusion qu'il faisait partie de ceux qui vérifiaient. Personne ne lui posa la question à lui.

Abū Sufyān se rassit. Il regarda le feu. Et il dit, à voix haute, à personne en particulier :

« Les Quraysh, le vent nous tue. Les chevaux meurent. Les chameaux se sont éparpillés. Les Banū Qurayẓa nous ont lâchés. Les provisions sont épuisées. Il n'y a plus rien à faire ici. Je repars. Partez. »

Il se leva. Il enfourcha son chameau. Il disparut dans la nuit.

Et après lui — silencieusement, un par un, groupe par groupe — dix mille hommes levèrent le camp. Pas de retraite ordonnée. Pas d'annonce. Juste des gens qui pliaient leurs affaires dans l'obscurité et partaient, dispersés par le vent comme les tentes qu'il avait arrachées.

À l'aube, le Messager d'Allah ﷺ regarda de l'autre côté du fossé. Le camp des Aḥzāb était vide. La plaine était déserte. Il ne restait que les traces dans la terre — des cercles de cendres froides là où les feux avaient brûlé, des trous là où les piquets avaient été plantés, des empreintes de milliers de pieds et de sabots qui menaient vers le nord.

Dix mille hommes. Partis dans une nuit. Par le vent.

Allah dira dans la sourate al-Aḥzāb : « Ô vous qui avez cru, rappelez-vous le bienfait d'Allah sur vous, quand des troupes vous arrivèrent et que Nous envoyâmes sur elles un vent et des armées invisibles. » (33:9)

Le vent. Et les anges.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sourate Al-Aḥzāb (33:9)
```
**PAR :**
```
Sourate al-Aḥzāb (33:9) — Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV139.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv139 enrichissement Le vent dispersa les Ahzab khandaq" && git push
```
