# SPEC-FAJR-MOINS — Réduire le cluster du matin (retirer la notif Fajr−15)

Fichier : script.js.

## Problème
Au matin, 3 choses : notif Fajr−15 (« L'aube approche »), toast Fajr (in-app),
murmure du matin Fajr+15. Trop. Et la Fajr−15 utilise `new Notification()`
(méthode qui marche mal sur mobile).

## Édit — neutraliser la notif Fajr−15
Dans `function scheduleFajrNotification() {`, ajouter `return;` en TOUTE PREMIÈRE
ligne du corps :
REMPLACER :
```js
function scheduleFajrNotification() {
  if (isSilenceDay()) return;
```
PAR :
```js
function scheduleFajrNotification() {
  return; // notif Fajr-15 retiree (reduction du cluster du matin)
  if (isSilenceDay()) return;
```

## Résultat
Le matin : on garde le murmure du matin (Fajr+15, l'ancrage de l'intention) et le
toast in-app. Un seul rappel poussé le matin.

## Contraintes
- `npm run build` AVANT git commit.
