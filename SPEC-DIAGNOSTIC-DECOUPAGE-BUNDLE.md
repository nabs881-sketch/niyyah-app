# SPEC-DIAGNOSTIC-DECOUPAGE-BUNDLE.md

## Contexte
script.js fait ~21 000 lignes / 1,28 Mo minifié, chargé en un seul bloc 
au démarrage. Objectif final (sur plusieurs sessions) : ne charger que 
ce qui est nécessaire pour afficher le Sanctuaire immédiatement, et 
différer le reste (Sîra, Tawhid, Quiz, Bab an-Nafs, Regard, Scanner...).

## Objectif de CETTE étape uniquement
Diagnostic seulement, ne rien modifier, ne rien découper. Comprendre 
la faisabilité réelle avant tout changement de code.

## Questions à répondre

### 1. Dépendances croisées
Le code est-il écrit en fonctions globales indépendantes (facile à 
découper), ou y a-t-il des variables partagées massivement entre les 
modules (Sanctuaire qui appelle des fonctions Tawhid directement, 
etc.) ? Donne 3-5 exemples concrets de couplage fort si trouvés.

### 2. Taille par grande zone fonctionnelle
Estime la taille approximative (en lignes ou Ko) de chaque grand bloc :
- Code du Sanctuaire + navigation de base (nécessaire immédiatement)
- Code Sîra
- Code Tawhid
- Code Quiz
- Code Bab an-Nafs / coffrets / cures
- Code Regard / Scanner IA
- Code partagé/utilitaire (safeSetItem, fetchWithRetry, etc. - probablement à garder dans le bloc initial)

### 3. Risque de la méthode "defer script execution"
Alternative plus simple et moins risquée qu'un vrai code-splitting : 
le fichier reste UN seul fichier, mais son exécution (pas le 
téléchargement) est repoussée après le premier rendu visuel, via 
un déclenchement sur requestIdleCallback ou après l'événement de 
chargement du Sanctuaire. Est-ce que la structure actuelle du code 
(IIFE, définitions de fonctions au top-level, écoute d'événements 
DOMContentLoaded) permettrait cette approche sans code-splitting réel ?

## Format de sortie
Réponse synthétique aux 3 questions, avec une recommandation claire : 
est-ce que le vrai découpage en fichiers séparés est réaliste et sûr, 
ou est-ce que l'alternative plus simple (defer d'exécution) donnerait 
80% du bénéfice pour 20% du risque ?

Ne propose aucun code à ce stade.
