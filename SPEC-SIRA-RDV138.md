# SPEC-SIRA-RDV138
# RDV 138 — Le Khandaq : Nuʿaym
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 138

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Le siège durait depuis presque un mois.

Des deux côtés du fossé, la fatigue s'installait différemment. Du côté musulman : la faim, le froid des nuits du désert, les gardes épuisants, l'anxiété permanente de la trahison des Banū Qurayẓa dans le dos. Du côté de la coalition : autre chose. Dix mille hommes loin de chez eux, sans victoire, sans butin, sans horizon. Les provisions baissaient. Les chevaux maigrissaient. Et au cœur des Aḥzāb, des fissures commençaient à apparaître — les Ghatafân reprochaient aux Quraysh de ne pas assez payer. Les Quraysh reprochaient aux juifs de ne pas encore avoir attaqué par derrière. Tout le monde attendait que quelqu'un d'autre fasse le premier pas.

C'est dans cet état que Nuʿaym ibn Masʿūd vint trouver le Messager d'Allah ﷺ.

Il était des Ghatafân. Il était venu avec les Aḥzāb, dans le camp ennemi, quelques semaines plus tôt. Et puis, en secret, quelque chose s'était passé. Il ne donnera jamais les détails exacts de sa conversion — mais il la fit. Il embrassa l'islam discrètement, sans que personne dans son camp ne le sache. Et il vint trouver le Prophète ﷺ de nuit.

« Ô Messager d'Allah, je suis devenu musulman et mon peuple ne le sait pas. Donne-moi un ordre. »

Le Prophète ﷺ dit : « Tu n'es qu'un seul homme. Mais si tu peux nous épargner un coup — fais-le. La guerre est ruse. »

Nuʿaym avait quelque chose de précieux : il était connu et aimé des trois camps. Des Banū Qurayẓa — il les fréquentait depuis des années. Des Quraysh — il était des tribus alliées. Des Ghatafân — c'était les siens. Il pouvait aller partout. Il pouvait parler à tout le monde. Et personne ne soupçonnerait le même homme d'avoir semé trois histoires différentes.

Il alla d'abord chez les Banū Qurayẓa.

Il s'assit avec eux, l'air préoccupé, comme un ami qui vient avertir. Il leur dit : « Vous savez que je vous aime. Je ne viens pas vous trahir — je viens vous prévenir. Réfléchissez à votre situation. Les Quraysh et les Ghatafân ont leurs familles, leurs biens, leurs maisons à La Mecque et au Najd. Si la guerre tourne mal — et les guerres peuvent toujours tourner — ils plient bagage et rentrent chez eux. Vous, vous restez ici. Médine est votre maison. Et Mohammed se souviendra de vous. Demandez-leur des otages avant de lever le petit doigt — pour vous assurer qu'ils ne vous abandonneront pas à mi-chemin. »

Les Banū Qurayẓa écoutèrent. Ils dirent : « Bon conseil. »

Nuʿaym alla ensuite chez Abū Sufyān et les chefs Quraysh.

Il prit un air grave. « Je viens vous avertir en ami. Ce que j'ai entendu, je ne pouvais pas le garder pour moi. Les Banū Qurayẓa regrettent d'avoir rompu avec Mohammed. Ils cherchent à se réconcilier avec lui. Leur plan : vous demander des otages — et les livrer à Mohammed comme gage de réconciliation. Ne leur donnez aucun otage. »

Les Quraysh regardèrent autour d'eux. L'idée les glaça.

Nuʿaym alla chez les Ghatafân. Il dit la même chose, en adaptant le ton.

Trois conversations. Trois versions du même poison, dosées différemment selon l'interlocuteur.

Le samedi suivant, Abū Sufyān décida que le moment était venu. Il envoya un messager aux Banū Qurayẓa : « C'est le moment. Attaquons ensemble maintenant — eux par derrière, nous par devant. »

Les Banū Qurayẓa répondirent : « C'est le jour du Sabbat — nous ne combattons pas le Sabbat. Et de toute façon, avant de combattre, nous voulons des otages de votre part, pour être sûrs que vous ne nous abandonnerez pas. »

Le messager revint chez Abū Sufyān. Abū Sufyān pâlit. Il se souvint de ce que lui avait dit Nuʿaym. Les otages — pour les livrer à Mohammed.

Il envoya dire aux Banū Qurayẓa : « Pas d'otages. »

Les Banū Qurayẓa répondirent : « Nous avions raison de nous méfier. Nuʿaym nous avait prévenus. »

La coalition se regarda. Chaque camp croyait que l'autre le trahissait. Personne ne faisait plus confiance à personne. Et le fossé, qui n'avait pas bougé d'un pouce, tenait toujours.

C'est exactement à ce moment-là qu'Allah envoya le vent.
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
Lis SPEC-SIRA-RDV138.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv138 enrichissement Nuaym ruse coalition doute mutuel" && git push
```
