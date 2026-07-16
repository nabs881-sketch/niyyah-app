# SPEC — Diagnostic : lister tous les thèmes existants dans waqt_dhuhr.json

## Contexte
Le fichier data/waqt/waqt_dhuhr.json contient des items avec des
préfixes d'identifiant du type DHUHR-CONJOINT-XXX, DHUHR-VOISIN-XXX,
DHUHR-INCONNUS-XXX. Besoin d'un inventaire complet de tous les thèmes
(préfixes) existants, avec le nombre d'items par thème.

## Ce qu'il faut faire

Diagnostic seulement, ne rien modifier.

Dans data/waqt/waqt_dhuhr.json, extraire tous les identifiants d'items
(le champ "id" ou équivalent), isoler le préfixe de thème (la partie
avant le numéro, ex: "DHUHR-CONJOINT" depuis "DHUHR-CONJOINT-025").

Afficher la liste de tous les préfixes/thèmes distincts trouvés, avec :
- le nombre total d'items pour chaque thème
- le titre du premier et du dernier item de chaque thème (pour avoir un
  aperçu du sujet couvert)

Format de sortie attendu, un thème par ligne :
"NOM_THEME (N items) — ex: [premier titre] ... [dernier titre]"

Fais la même chose pour les autres fichiers waqt (waqt_fajr.json,
waqt_asr.json, waqt_maghrib.json, waqt_isha.json) si des préfixes
thématiques similaires y existent, pour avoir une vue d'ensemble complète.
