# SPEC-SIRA-RDV128
# RDV 128 — L'année qui sépare : Dhāt ar-Riqāʿ
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 128

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
L'an 4 de l'Hégire. Après Uḥud, après les Banū an-Naḍīr, après le rendez-vous manqué de Badr — les tribus de Najd avaient senti quelque chose. Une faiblesse possible. Une occasion. Des rapports parvenaient à Médine : des coalitions se formaient dans les hauteurs du plateau central, des incursions se préparaient contre les alliés des musulmans.

Le Messager d'Allah ﷺ sortit. Quatre cents hommes — peut-être plus selon les sources. Une expédition d'autorité. De rappel. Un message envoyé aux tribus : nous sommes encore là, nous bougeons encore, Uḥud n'a pas effacé Badr.

Mais ils étaient pauvres. Pauvres comme on ne l'imagine plus.

Six hommes pour un seul chameau, qu'ils se passaient à tour de rôle. Le reste marchait. Pieds nus sur les pierres du Najd — brûlantes l'été, coupantes toujours. Abū Mūsā al-Ashʿarī rapporte : « Nous marchions, et nos pieds saignaient. Mes ongles tombaient. Pour panser nos pieds, nous les enveloppions dans des chiffons. » C'est pour cela qu'on appela cette expédition Dhāt ar-Riqāʿ — la bataille des chiffons. Pas des épées. Des chiffons autour des pieds des hommes qui marchaient vers l'ennemi en saignant.

Ils campèrent là où il fallait camper, en territoire hostile. Et là, exposés à toute heure à une attaque, le Messager d'Allah ﷺ enseigna pour la première fois la ṣalāt al-khawf — la prière de la peur. Une moitié de la troupe se met en rang derrière l'imam et prie. L'autre moitié fait face à l'ennemi, armes en main, et veille. Puis on échange. La prière ne s'arrête pas parce que le danger est là. Elle s'adapte.

Les tribus s'étaient dispersées en apprenant l'arrivée des musulmans. Pas de combat.

Mais c'est dans cette expédition qu'arriva une scène que les Compagnons racontèrent longtemps.

Le Prophète ﷺ s'était arrêté pour se reposer à l'écart, seul sous un arbre. Son sabre était suspendu à une branche au-dessus de lui. Il s'endormit.

Un bédouin des environs le vit. Seul. Sans garde. Il s'approcha silencieusement. Il saisit le sabre. Il le dégaina. Il se plaça debout au-dessus du Messager d'Allah ﷺ endormi, la lame en main, et dit d'une voix forte pour le réveiller :

« Qui te protégera de moi maintenant ? »

Le Prophète ﷺ ouvrit les yeux. Il vit l'homme. Il vit le sabre. Il ne bougea pas. Pas de panique. Pas de cri. Une seule réponse, prononcée calmement, comme une évidence :

« Allah. »

Le sabre tomba des mains du bédouin.

Ce qui se passa exactement en lui à ce moment — personne ne le sait. La main qui se desserre. L'arme qui tombe. Peut-être la terreur. Peut-être autre chose. Ce qu'on sait, c'est que le sabre tomba.

Le Prophète ﷺ le ramassa. Et c'est lui qui dit alors, debout, l'arme à la main :

« Et toi, qui te protégera de moi ? »

L'homme dit : « Sois meilleur que cela. »

Le Messager d'Allah ﷺ regarda cet homme qui venait de tenter de le tuer pendant son sommeil. Il regarda le sabre dans sa main. Et il le laissa partir. Sans condition. Sans témoin. Sans punition.

Parce que c'est ça, être meilleur.
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
Lis SPEC-SIRA-RDV128.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv128 enrichissement Dhat ar-Riqa chiffons sabre" && git push
```
