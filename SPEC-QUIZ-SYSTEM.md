# SPEC-QUIZ-SYSTEM.md

## Objectif
Ajouter un item "Quiz du jour" dans Fil du Jour (PRATIQUE→CONNAISSANCE), 
3 questions/jour tirées de data/waqt/quiz/quiz_lot_XX.json, UX tap-réponse 
avec correction immédiate, fin sobre sans score visible.

## 1. Chargement des données
- Charger tous les fichiers data/waqt/quiz/quiz_lot_*.json au démarrage 
  (même pattern que le chargement des JSON waqt/sira existants — réutiliser 
  la fonction de fetch déjà utilisée pour ces fichiers).
- Fusionner en un seul tableau `QUIZ_DB` trié par `id`.

## 2. Sélection du jour
- Réutiliser la fonction de calcul du jour actuel déjà utilisée pour la Sîra 
  (jour 1 à 365 depuis la date d'installation/activation). NE PAS créer un 
  second système de calcul de date.
- Filtrer QUIZ_DB où `jour === jourActuel` → donne les 3 questions du jour 
  (ou moins si dernier jour d'un lot).
- Si aucune question pour jourActuel (lot pas encore livré) : item "Quiz du 
  jour" masqué dans Fil du Jour ce jour-là.

## 3. Item Fil du Jour
- Ajouter `quiz_jour` dans PRATIQUE→CONNAISSANCE, juste après `tawhid_jour`.
- Reconnu dans `_knowledgeIds` et `_isKnowledge` (même pattern que tawhid_jour).
- Label : "Quiz du jour".
- Au tap : appelle `window._openQuizJour()`.

## 4. Overlay Quiz
- Nouvel overlay `#quiz-overlay`, z-index 9200 (même niveau que tawhid-overlay).
- Style luxe cohérent : Cormorant Garamond (titres) + fond sombre + accents 
  dorés #c8a84b, mêmes cards/boutons que le reste de l'app.
- Affiche 1 question à la fois sur les 3 du jour :
  - Titre question
  - 4 cards choix (A/B/C/D), tappables
  - Tap → la card tapée devient verte (bonne) ou rouge (mauvaise), la bonne 
    réponse s'affiche en vert si l'utilisateur s'est trompé
  - Explication apparaît en dessous (Cormorant italic) juste après le tap
  - Bouton "Question suivante →" (ou "Terminer" sur la 3e)
- Après la 3e question : message sobre, PAS de score chiffré affiché.
  Exemple : "Tu as répondu aux 3 questions d'aujourd'hui. Barak Allahu fik."
  Puis bouton "← Retour au Fil du jour".

## 5. Cochage automatique
- `_markQuizDone()` : vérifie si quiz_jour déjà coché avant d'appeler 
  `toggleItem('quiz_jour')` (éviter double-toggle, même pattern que 
  `_markTawhidDone`).
- Appelé automatiquement à l'affichage du message de fin (étape 4), 
  PAS avant (l'utilisateur doit avoir répondu aux 3 questions).

## 6. Retour Fil du Jour
- Bouton "← Retour au Fil du jour" en fin de quiz ET bouton ‹ en haut de 
  l'overlay (comme tawhid) → ferme quiz-overlay → `openVueAuFilDuJour()`.
- Utiliser le même flag `_quizFromFil` / `_quizFromPratique` que pour 
  distinguer le contexte de retour (pattern SPEC-TAWHID-CLOSE-FIX).

## 7. Build
npm run build obligatoire avant commit (script.js + style.css modifiés).

git rm SPEC-QUIZ-SYSTEM.md
