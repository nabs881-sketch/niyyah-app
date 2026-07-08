# SPEC-RESILIENCE-FETCH-CONTENU.md

## Contexte
Diagnostic précédent : les fetch JSON pour Sîra, Quiz, Tawhid et les 
coffrets Bab an-Nafs échouent silencieusement (.catch → console.error 
uniquement, ou .catch(() => {}) vide). L'utilisateur qui tape sur un 
item voit l'overlay ne pas s'ouvrir, sans aucun message — donne 
l'impression d'une app cassée plutôt que d'un problème réseau.

## Objectif
Ajouter un message d'erreur visible et cohérent avec l'identité 
visuelle (pas une alert() générique) quand un fetch de contenu échoue, 
avec un bouton "Réessayer" — même esprit que ce qui existe déjà pour 
l'API Aladhan (horaires de prière).

## Fonctions concernées
- SIRA.load() / SIRA.openDetail() — fetch data/sira.min.json
- getQuizDuJour() / _loadQuizDB() — fetch data/waqt/quiz/*.json
- _openTawhidJour() / openTawhid() — fetch tawhid_capsules.json
- Fetch des coffrets Bab an-Nafs (anxiété, colère, etc. — chercher les 
  fonctions correspondantes, probablement dans le module cure/coffret)

## Comportement attendu
Sur échec de fetch (catch déclenché) :
1. Si l'overlay est déjà en cours d'ouverture (loader affiché), 
   remplacer le loader par un message simple : icône discrète + texte 
   "Contenu indisponible pour le moment" + bouton "Réessayer"
2. Le bouton "Réessayer" relance le même fetch
3. Garder le catch existant (console.error) en plus, ne pas le retirer 
   — utile pour Sentry qui capture déjà les erreurs critiques

## Style
Réutiliser les classes CSS existantes (police Cormorant, doré, ton 
sobre) — pas de nouveau design system, juste un état d'erreur cohérent 
avec le reste de l'app.

## Contrainte
Ne PAS toucher au comportement des coffrets/cures qui échouent pour une 
raison différente de connectivité (fichier manquant vs réseau coupé) — 
si le diagnostic montre une distinction nécessaire, la signaler avant 
de coder.

## Build
npm run build. Ne PAS commit avant validation visuelle. Montrer le diff 
résumé fonction par fonction.

git rm SPEC-RESILIENCE-FETCH-CONTENU.md
