# SPEC — Audit technique global de l'app Niyyah

## Objectif
Diagnostic seulement, ne modifie rien. Produire un état des lieux honnête
de la santé technique de l'app, sans se limiter aux zones déjà connues
comme problématiques.

## 1. Suite de tests automatisés
- Lance la suite de tests existante (`npm test` ou équivalent trouvé dans
  package.json).
- Rapporte le nombre de tests passés/échoués, et liste les échecs avec
  leur message d'erreur.

## 2. Cohérence des données JSON
- Vérifie que tous les fichiers JSON de contenu (Quiz, Tawhid, Sîra,
  Récits du Coran, Coffrets, Bab an-Nafs) sont bien du JSON valide
  (pas de syntax error).
- Vérifie qu'il n'y a pas de doublons d'id à l'intérieur d'un même fichier.
- Vérifie que les références croisées entre fichiers (ex: quiz → jour,
  wird → session, tafakkur → recit) pointent bien vers des id existants
  (pas de référence cassée / orpheline).

## 3. Recherche de patterns à risque dans script.js
- Cherche les `console.log` / `console.error` de debug oubliés en
  production (hors ceux volontairement conservés).
- Cherche les fonctions dupliquées (même nom déclaré plusieurs fois).
- Cherche les appels à des fonctions qui n'existent pas / plus dans le
  fichier (fonctions supprimées mais encore référencées).
- Cherche les `TODO`, `FIXME`, `XXX` laissés dans le code.

## 4. Cohérence CSS
- Cherche les classes CSS déclarées dans style.css mais jamais utilisées
  dans script.js/index.html (classes mortes).
- Cherche les classes utilisées dans le JS/HTML mais jamais déclarées
  dans le CSS (classes fantômes → style cassé silencieux).

## 5. Taille et performance
- Donne la taille de script.min.js et style.min.css après build.
- Signale si le build affiche des erreurs/warnings (ex: le fallback
  "terser OOM → strip-comments" vu récemment — vérifie si c'est
  systématique ou ponctuel, et pourquoi terser plante).

## 6. Service Worker
- Vérifie que le SW en prod (version actuelle) matche bien le numéro de
  version attendu après le dernier build.
- Vérifie qu'il n'y a pas de fichiers listés dans le cache SW qui
  n'existent plus sur le disque (référence de cache cassée).

## Format de sortie attendu
Un résumé structuré par section (1 à 6), avec pour chaque point :
- ✅ si sain
- ⚠️ si point d'attention mineur
- 🔴 si problème réel à corriger

Ne pas corriger quoi que ce soit à ce stade — uniquement lister.
