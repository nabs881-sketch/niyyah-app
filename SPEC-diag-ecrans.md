# DIAGNOSTIC (LECTURE SEULE — ne modifie rien)

Je veux comprendre **deux écrans de fin de cure** pour les améliorer ensuite. Colle le code et explique. **Ne modifie rien.**

## Écran A — confirmation après « Jour N accompli »
Texte : « Jour N enregistré. / Dès demain, Jour N+1 : {titre} / Retour ».
1. Où est-il rendu (dans `_cureAnxieteSave` ?) ? Colle son **markup complet**.
2. A-t-il le fond chaud (`bgWrap` / dégradé) ou un **fond noir plat** ? Pourquoi est-il noir alors que les pages de cure ont le fond chaud ?

## Écran B — porte fermée le même jour
Texte : « Hier : {rappel} / Aujourd'hui, attends. / La porte rouvre demain. / Retour ».
3. Où est-il rendu, et par quelle **condition** s'affiche-t-il (comment le code sait que la session du jour est déjà faite) ?
4. **IMPORTANT** — logique de date : si l'utilisateur revient **après plusieurs jours** (pas le lendemain exact), le jour suivant **s'ouvre-t-il** ou reste-t-il **bloqué** ? Montre la logique de déblocage exacte.
5. D'où vient le texte « Hier : {rappel} » (quel champ ?) ?
6. Colle le **markup** de cet écran (fond, couleurs, layout).

Réponds en collant le code + l'explication de la logique de date. Ne modifie rien, ne commit rien.
