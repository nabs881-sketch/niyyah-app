# INTÉGRATION DISCLAIMER MODULE TIBB

Lis `disclaimer_tibb.md` (joint ou dans le dossier audit).

## ÉTAPE 1 — Overlay 1ère ouverture (version COURTE)

Au premier accès au module Tibb par un utilisateur :
- Afficher un overlay plein écran avec la **VERSION COURTE** du disclaimer (3 lignes : avertissement médical + hadiths vérifiés + shifâ' d'Allâh)
- Bouton « J'ai compris » obligatoire pour fermer
- Stocker dans localStorage : `niyyah_tibb_disclaimer_seen = true` (date)
- Ne plus jamais réafficher l'overlay automatiquement après ça

## ÉTAPE 2 — Accès permanent (icône ⓘ)

Dans l'en-tête du module Tibb (à côté du titre), ajouter une **petite icône `ⓘ`** :
- Au clic → ouvre la page "À propos du module" avec la **VERSION LONGUE**
- Icône SVG `niyyahIcon('info')` cohérent avec le design system

## ÉTAPE 3 — Page "À propos du module"

Créer la page complète avec la **VERSION LONGUE** :
- Section 🩺 Avertissement médical
- Section 📖 Avertissement théologique
- Section ⚖️ Limites
- Section 🤲 Esprit du module
- Footer : `Wa Allâhu a'lam`

Style : Cormorant Garamond pour titres, palette gold #C8A84A, dark theme, cohérent avec le style guide Niyyah V1.0.

## ÉTAPE 4 — Lien de signalement

En bas de la page "À propos", ajouter un lien :
> « Signaler une erreur théologique → » (mailto: ton-email-niyyah)

## ÉTAPE 5 — Tests

- Premier lancement → overlay s'affiche ✓
- Bouton « J'ai compris » → overlay disparaît ✓
- Réouverture module → overlay NE s'affiche PAS ✓
- Clic icône ⓘ → page longue s'ouvre ✓
- Bouton retour → revient au module ✓

## ÉTAPE 6 — Commit + push

`feat(tibb) disclaimer médical+théologique (overlay court + page À propos longue)`

Vas-y.
