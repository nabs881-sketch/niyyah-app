# SPEC-SIRA-RDV127
# RDV 127 — L'année qui sépare : Le rendez-vous
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 127

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
À la fin de la bataille d'Uḥud, alors que les musulmans pansaient leurs blessures et comptaient leurs morts, Abū Sufyān avait crié depuis la colline, avant de partir :

« Rendez-vous à Badr l'année prochaine ! »

Ce n'était pas une invitation. C'était un défi lancé devant toute l'Arabie. Un rendez-vous de guerre, public, prononcé à voix haute pour que les tribus l'entendent et s'en souviennent. Refuser de venir, c'était avouer sa faiblesse. Venir et perdre, c'était confirmer Uḥud.

Le Messager d'Allah ﷺ avait fait répondre, simplement : « Oui, rendez-vous est pris. »

L'année passa. Ce fut une année difficile — pour tout le monde. Pour Médine, l'affaire des Banū an-Naḍīr, les expéditions, les tensions. Pour La Mecque, autre chose : la sécheresse. La famine. Les puits bas, les réserves vides, les hommes affaiblis. Abū Sufyān, en regardant ses guerriers au mois de Shaʿbān de l'an 4, n'avait pas envie d'aller à Badr.

Mais il ne pouvait pas simplement ne pas venir. Il avait lancé le défi lui-même. Il chercha une autre solution.

Il envoya un homme à Médine. Nuʿaym ibn Masʿūd — quelqu'un qui avait des contacts dans les deux camps, un homme de passage, crédible. Sa mission était simple : faire peur. Répandre la rumeur que La Mecque avait levé une armée immense, que les chiffres étaient écrasants, que les musulmans qui oseraient se présenter seraient exterminés jusqu'au dernier.

« Abū Sufyān mobilise plus de monde que jamais. Ne sortez pas. Vous serez massacrés. »

La rumeur circula. Les Compagnons l'entendirent. Certains hésitèrent. Ce n'était pas de la lâcheté — c'était du calcul. Uḥud était récent. Les blessures n'étaient pas toutes cicatrisées. Et si c'était vrai ?

Le Messager d'Allah ﷺ les regarda. Il dit :

« Je jure que j'irai — même seul. »

Ce mot tomba dans le silence. Seul. Pas comme une menace, pas comme un reproche. Comme une déclaration de principe : il y a des paroles qu'on tient, quoi qu'il arrive, parce que ce sont des paroles qu'on a données. Ceux qui voulaient venir vinrent. Mille cinq cents hommes. Dix chevaux. Des chameaux pour les provisions et les marchandises.

Ils arrivèrent à Badr. Ils dressèrent le camp. Ils attendirent.

Un jour passa. Deux. Trois. Les éclaireurs revenaient avec le même rapport : personne à l'horizon. La route de La Mecque était vide.

Huit jours. Personne ne vint.

Abū Sufyān était resté chez lui.

Alors quelque chose d'inattendu se produisit. Badr était un lieu de marché — une des grandes foires saisonnières de la péninsule. Des caravanes de Bédouins passaient. Des marchands s'arrêtaient. Les Compagnons ouvrirent leurs ballots, installèrent un petit marché, vendirent les marchandises qu'ils avaient apportées, achetèrent ce dont ils avaient besoin. Ils repartirent avec un bénéfice double.

Et la nouvelle se répandit dans toute l'Arabie, de tribu en tribu, de caravane en caravane : les musulmans étaient venus au rendez-vous. Les Quraysh n'étaient pas venus. Celui qui avait lancé le défi avait cédé. Celui qui avait accepté le défi était resté huit jours à attendre, sans reculer d'un pas.

La balance de l'honneur, lentement, basculait.
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
Lis SPEC-SIRA-RDV127.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv127 enrichissement Le rendez-vous Badr an 4" && git push
```
