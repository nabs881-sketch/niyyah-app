# SPEC-SIRA-RDV151
# RDV 151 — Ḥudaybiya : ʿUthmān à La Mecque
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 151

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Le Messager d'Allah ﷺ avait besoin d'un émissaire. Quelqu'un qui pouvait entrer à La Mecque sans être tué sur le seuil. Quelqu'un dont le clan avait assez de poids pour garantir sa sécurité le temps d'une conversation.

Il se tourna d'abord vers ʿUmar ibn al-Khattâb.

ʿUmar répondit sans détour : « Ô Messager d'Allah, tu sais que je suis le plus dur ennemi des Quraysh parmi les Muhâjirûn. Et je n'ai plus personne à La Mecque — ni famille, ni allié qui pourrait me protéger. Envoie ʿUthmân. Son clan est puissant là-bas. Il peut y entrer et en ressortir. »

Le Prophète ﷺ envoya chercher ʿUthmân ibn ʿAffān. Il lui dit : « Va. Dis-leur que nous ne sommes pas venus combattre. Nous venons faire la ʿumra, vénérer Allah dans Sa maison, et repartir. Et annonce-leur la grande victoire qui approche pour l'islam. »

ʿUthmân prit la route vers La Mecque. À l'entrée de la ville, Abân ibn Saʿîd al-ʿĀsî vint à sa rencontre — un Quraysh influent, qui prit ʿUthmân en croupe sur sa monture et lui offrit sa protection personnelle pendant tout son séjour. Dans la culture arabe, un homme sous la protection d'un autre était intouchable. ʿUthmân était en sécurité.

Il fut reçu par les chefs Quraysh. Il transmit le message du Prophète ﷺ : les musulmans venaient en pèlerins, pas en guerriers. Ils voulaient faire le tawâf, accomplir leurs rites, sacrifier leurs chameaux, et repartir à Médine. Rien d'autre.

Les Quraysh l'écoutèrent. Ils délibérèrent. Et puis l'un d'eux lui fit une proposition inattendue : « Si tu veux, ʿUthmân, fais toi-même le tour de la Kaʿba. On t'y autorise. »

C'était une offre généreuse — et une manière de le retenir, de gagner du temps, de montrer à leurs alliés qu'ils n'avaient pas peur. Mais ʿUthmân répondit sans hésiter :

« Je ne ferai pas le tour de la Kaʿba avant que le Messager d'Allah ﷺ ne l'ait fait. »

La phrase tomba dans le silence. Les Quraysh la retinrent. Ils retinrent aussi ʿUthmân — poliment, mais fermement. Ils avaient des décisions à prendre entre eux. Des consultations à tenir. Des tribus à convoquer.

ʿUthmân resta. Un jour. Deux jours. Trois jours.

À Ḥudaybiya, le camp attendait. Les Compagnons regardaient la route de La Mecque. Aucun signe. Le quatrième jour, une rumeur commença à circuler — née d'un mot mal compris, d'un voyageur qui avait mal entendu, de l'anxiété naturelle de mille cinq cents hommes arrêtés dans le désert à deux jours de leurs ennemis.

ʿUthmân avait été tué.

La nouvelle passa de groupe en groupe. Personne ne savait d'où elle venait. Personne ne pouvait la démentir. Et dans le camp de pèlerins en ihrâm, sans armures, avec leurs seuls sabres de voyage, la rumeur fit ce que les rumeurs font : elle prit.

Le Messager d'Allah ﷺ entendit. Son visage devint grave. Il se leva. Il s'avança vers l'arbre. Et ce qui suivit — le serment, les mille quatre cents mains tendues, la main gauche du Prophète ﷺ pour ʿUthmân — c'est ce qu'on appelle depuis la bayʿa ar-Riḍwān.

ʿUthmân revenait vivant quelques heures plus tard. Mais le serment avait été réel. Et Allah l'avait vu.
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
Lis SPEC-SIRA-RDV151.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv151 enrichissement Uthman La Mecque bayaa ridwan" && git push
```
