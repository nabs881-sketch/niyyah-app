# SUPPRIMER ITEMS DA'ÎF — Module Tibb

Modifie `data/modules/tibb_module_complet.json` et `tibb.docx`.

## ÉTAPE 1 — Supprimer ces 19 items du JSON

Items à retirer (par ID ou numéro) :
- **4** — Huile d'olive (Tirmidhî gharîb)
- **8** — Sanâ / Séné (chaîne contestée + paraphrase)
- **9** — Gomme arabique (da'îf reconnu)
- **12** — Jeûne thérapeutique ("Sumû tasihhû" da'îf)
- **13** — Qaylûla (hadith démons da'îf)
- **15** — Henné usage médicinal (da'îf)
- **23** — Grenade (hadith mawdû' / forgé sur "goutte du Paradis") ⚠️
- **24** — Eau au matin (non sourcé)
- **25** — Marcher après repas (pas de hadith sahîh)
- **27** — Yâsîn sur malade (Abû Dâwûd 3121 da'îf)
- **32** — Huile moutarde (aucun hadith)
- **38** — Câprier (sans isnâd)
- **47** — Repos après Maghrib (formulation à vérifier)
- **49** — Rire modéré (Tirmidhî contesté)
- **52** — Earthing pieds nus (attribution non sourcée)
- **53** — Fenouil (aucun hadith)
- **55** — Bain eau salée (aucun hadith)
- **56** — Lever à Fajr (hasan limite — par prudence)
- **59** — Khalwa (extrapolation tahannuth)

Nouveau total : **41 remèdes**.

## ÉTAPE 2 — Renumérotation

Renuméroter les items restants de 1 à 41 dans l'ordre (sans laisser de trous).

## ÉTAPE 3 — Mettre à jour les compteurs

- Titre principal : `# Tibb - 41 remèdes` (au lieu de 60)
- Mettre à jour tout champ `total`, `count`, `nbItems` dans le JSON.

## ÉTAPE 4 — Régénérer le .docx

Supprime l'ancien `tibb.docx` et régénère depuis le JSON v5. Même nom, même emplacement.

## ÉTAPE 5 — Vérifications

- JSON valide ✓
- Renumérotation 1→41 sans saut ✓
- .docx ouvrable ✓
- Aucun des 19 items supprimés ne réapparaît ✓

## ÉTAPE 6 — Commit

`audit tibb v5 — suppression 19 items da'îf, passage 60 → 41 remèdes solides`

Vas-y.
