# SPEC-EXTRACTION-2-ENTREES-DHUHR.md

## Objectif
Extraire et afficher le contenu complet de deux entrées précises dans 
data/waqt/waqt_dhuhr.json, sans rien modifier.

## Entrées à extraire
1. DHUHR-PARENTS-017 (hadith Abû Dâwûd n°2528, classé hasan par 
   certains, da'îf par d'autres selon le diagnostic précédent)
2. DHUHR-COLLÈGUES-025 (marqueur "à confirmer par l'imam" présent 
   directement dans le champ texte narratif, pas dans source)

## Méthode
Écrire un script node ponctuel (peut être supprimé après usage) qui 
parcourt récursivement le JSON, trouve les objets dont le champ id ou 
num correspond à ces deux identifiants, et affiche pour chacun :
- Le champ source complet
- Le champ texte complet
- Tout autre champ présent (verif_imam, etc.)

## Sortie attendue
Le JSON complet des deux entrées, rien d'autre. Pas d'analyse, pas de 
proposition de correction à ce stade — juste l'extraction brute.
