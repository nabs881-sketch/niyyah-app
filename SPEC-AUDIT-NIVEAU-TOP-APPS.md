# SPEC-AUDIT-NIVEAU-TOP-APPS.md

## Objectif
Diagnostic seulement, ne rien modifier. Identifier les écarts entre 
Niyyah et les standards techniques des meilleures apps (Spotify, 
Headspace, Calm, Duolingo) sur des axes qu'on n'a PAS encore couverts 
dans les audits précédents (UX visuelle déjà faite : micro-feedback, 
chargement, scroll memory, gestes déjà traités).

## Axes à auditer

### 1. Performance et taille
- Taille totale de script.js et style.min.js (minifiés)
- Y a-t-il du code mort en plus de renderAccueil() déjà supprimé ?
- Le JS est-il découpé en chunks (lazy loading) ou tout chargé d'un bloc ?
- Temps de premier rendu estimé (contenu critique vs différable)

### 2. Gestion d'erreurs et résilience
- Que se passe-t-il si un fetch JSON échoue (Sîra, Tawhid, Quiz) au-delà 
  du .catch silencieux déjà connu ? L'utilisateur voit-il un message, 
  ou l'app reste-t-elle silencieusement cassée ?
- Existe-t-il un système de fallback si localStorage est plein ou 
  indisponible (navigation privée stricte) ?
- Y a-t-il un mécanisme de retry automatique sur échec réseau ?

### 3. Accessibilité
- Les boutons ont-ils des aria-label cohérents partout, ou seulement 
  par endroits (a11yOnOverlayOpen déjà repéré dans le code) ?
- Contraste de couleurs testé quelque part (texte doré sur fond sombre 
  peut être limite pour malvoyants) ?
- Support clavier/lecteur d'écran minimal existant ?

### 4. Mode hors-ligne
- L'app fonctionne-t-elle sans connexion une fois installée (service 
  worker présent — vérifier sa stratégie de cache) ?
- Que se passe-t-il pour les horaires de prière (API Aladhan) si 
  hors-ligne ?

### 5. Sécurité et vie privée
- Des clés API ou secrets sont-ils exposés côté client dans script.js ?
- Les données utilisateur (progression, notes personnelles) sont-elles 
  chiffrées localement ou en clair dans localStorage ?

### 6. Observabilité
- Existe-t-il un système de tracking d'erreurs (Sentry ou équivalent) 
  pour savoir si des utilisateurs rencontrent des bugs en prod ?
- Un système d'analytics minimal (pages vues, rétention) existe-t-il, 
  ou l'app est-elle totalement aveugle sur son usage réel ?

### 7. Tests
- Existe-t-il des tests automatisés (unitaires, e2e), ou tout repose 
  sur le test manuel Redmi mentionné dans le workflow habituel ?

## Format de sortie
Pour chaque axe : état actuel constaté, écart avec le standard "top app", 
et niveau d'urgence estimé (bloquant / important / confort).

Ne propose aucune correction à ce stade, uniquement le diagnostic.
