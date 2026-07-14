# SPEC — Diagnostic : référence hadith + redirection aide professionnelle

## Contexte
Audit de fiabilité du module Bab an-Nafs (cures psycho-spirituelles).
Deux points à vérifier avant toute correction.

## Point 1 — Référence manquante (Paresse J4)

Dans le fichier `cure-paresse-cycle1.json`, trouver le bloc_2 (sage) du
Jour 4 : la parole "Recherche avec ardeur ce qui t'est utile, demande
l'aide d'Allah, et ne faiblis pas...".

Vérifier s'il existe un champ pour la source/référence de ce bloc, et
montrer sa valeur actuelle (probablement vide ou juste "Le Prophète ﷺ").

## Point 2 — Signaux de détresse et redirection

Dans `cure-anxiete-cycle1.json` et `cure-paresse-cycle1.json`, chercher
les outils contenant ces options cochables :
- "J'ai des crises de panique"
- "Mon anxiété dure depuis plus de 6 mois"
- "Je me sens vide, ou sans espoir"
- "Même les petits gestes semblent au-dessus de mes forces réelles"

Dans script.js, vérifier ce qui se passe quand l'utilisateur coche ces
cases : y a-t-il une redirection, un message d'orientation vers une aide
professionnelle, ou un numéro/ressource affiché ? Ou le parcours continue
simplement vers l'outil suivant sans rien de spécial ?

## Sortie attendue

Diagnostic seulement, ne rien modifier. Montrer :
1. La valeur actuelle du champ source pour le bloc Paresse J4
2. Le code exact (avec numéros de ligne) qui gère le clic sur ces
   options de détresse, et s'il existe une logique de redirection ou non
