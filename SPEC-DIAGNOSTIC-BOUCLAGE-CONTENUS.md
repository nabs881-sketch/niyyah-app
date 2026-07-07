# SPEC-DIAGNOSTIC-BOUCLAGE-CONTENUS.md

## Objectif
Diagnostic seulement, ne rien modifier. Vérifier que chaque fonction de 
contenu quotidien boucle proprement (modulo) plutôt que de risquer un 
dépassement/undefined si le jour dépasse la taille du pool.

## Fonctions à vérifier
- SIRA.getCurrentRdvNum() (déjà connu : 365 jours, modulo propre — 
  référence de comparaison)
- getGhidaaJour()
- getTibbJour()
- getSavaisTuFact()
- getFiqhJour()
- getHadithJour()
- getDuaaJour() (ou équivalent trouvé dans le code)
- Le pool des 60 capsules Tawhid (_tawhidCapsules) — comment l'index 
  du jour est calculé
- getQuizDuJour() (déjà vérifié : 210 jours, modulo propre — référence 
  de comparaison)

## Pour chaque fonction, rapporter
1. Taille du pool de contenu (nombre d'entrées)
2. Formule exacte utilisée pour sélectionner l'entrée du jour
3. Verdict : bouclage modulo propre (safe à tout jour futur), ou 
   risque de dépassement/undefined si le jour dépasse la taille du pool
4. Test concret : un utilisateur au jour 400 recevrait-il un contenu 
   valide, ou undefined/erreur ?

## Format de sortie attendu
Tableau récapitulatif : fonction | taille pool | formule | safe ou risqué

git rm SPEC-DIAGNOSTIC-BOUCLAGE-CONTENUS.md
