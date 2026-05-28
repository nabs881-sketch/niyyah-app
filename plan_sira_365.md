# PLAN SÎRA 365 RDV — Merge & Réorganisation

## ÉTAT ACTUEL (sira.min.json)

| Catégorie | Count | RDV |
|-----------|-------|-----|
| Solides (≥5 paras + méditation) | 320 | 1-315 (sauf rares), 330-335 |
| Quasi (≥5 paras, sans méditation) | 1 | 330 |
| Stubs (1-4 paras, quiz vides) | 14 | 316-329 |
| Vides (0 para, quiz placeholders) | 15 | 336-350 |
| **Total** | **350** | |

## CONTENU RÉCUPÉRABLE (fichiers batch "(1)")

28 récits COMPLETS (≥5 paras + méditation), tous uniques :

### Bloc A — Compagnons & anecdotes (9 récits)
Source : `sira_rdv_311_a_320 (1).json`

| # | Titre | Paras | Thème |
|---|-------|-------|-------|
| 1 | Aṭ-Ṭufayl ibn ʿAmr ad-Dawsī | 13 | poète, tribu |
| 2 | ʿAmr ibn al-ʿĀṣ | 11 | stratège, conversion |
| 3 | Mughīra ibn Shuʿba | 9 | intelligence, Ḥudaybiya |
| 4 | Abū al-ʿĀṣ et Zaynab | 12 | gendre, loyauté |
| 5 | Umm Ḥabība | 12 | exil, Abyssinie |
| 6 | Jaʿfar aux deux ailes | 12 | Mu'ta |
| 7 | Ḥalīma as-Saʿdiyya | 13 | nourrice, baraka |
| 8 | Thawbān | 11 | amour, compagnie |
| 9 | La conversion d'ʿUmar | 15 | conversion, sœur |

### Bloc B — Miracles & prophéties (9 récits)
Source : `sira_rdv_321_a_330 (1).json`

| # | Titre | Paras | Thème |
|---|-------|-------|-------|
| 10 | Le mariage par le Coran | 15 | mahr |
| 11 | Abū al-Bakhtarī | 12 | ennemi noble, Badr |
| 12 | Ḥabīb ibn Zayd | 13 | torture, membres |
| 13 | La pluie demandée | 14 | du'â |
| 14 | L'eau des doigts | 13 | miracle |
| 15 | La nourriture qui multiplie | 13 | Khandaq |
| 16 | La lune fendue | 15 | signe |
| 17 | L'arbre de Tabūk | 13 | miracle |
| 18 | Les prophéties réalisées | 13 | Constantinople |

### Bloc C — Sagesses & eschatologie (10 récits)
Source : `sira_rdv_331_a_340 (1).json`

| # | Titre | Paras | Thème |
|---|-------|-------|-------|
| 19 | Le Mahdi attendu | 11 | fin des temps |
| 20 | Dajjāl | 13 | épreuve |
| 21 | Le retour de Jésus | 11 | Damas |
| 22 | Le songe d'ʿUmar | 13 | vision |
| 23 | Ce que personne ne sait | 13 | ghayb, humilité |
| 24 | Le serpent dans la chambre | 13 | voisin, patience |
| 25 | Le voyageur dans ce monde | 15 | détachement |
| 26 | Ô Bilāl — repose-nous par elle | 15 | prière, amour |
| 27 | Zamzam | 14 | Hagar, source |
| 28 | La corde tendue d'Allah | 16 | Coran, guidage |

## CALCUL

| | Count |
|---|---|
| Solides actuels dans main | 321 |
| + 28 nouveaux batch | +28 |
| − 2 doublons internes (339/346 "Pardon Ṭā'if", 330/350 "Corde tendue") | −2 |
| = **Net disponible** | **347** |
| Cible | 365 |
| **MANQUE** | **18** |

## OPÉRATIONS PRÉVUES

### Phase 1 — Nettoyage (supprimer les coquilles)
1. Supprimer les 14 stubs quiz (RDV 316-329) : 1-2 paras, pas de récit
2. Supprimer les 15 vides quiz (RDV 336-350) : 0 para, placeholders
3. Supprimer 1 doublon exact : RDV 346 (= copie de 339 "Le pardon après Ṭā'if")
4. Supprimer 1 doublon exact : RDV 350 (= copie vide de 330 "La corde tendue")
   → Total supprimé : 29 stubs/vides + 2 doublons = **31 items retirés** (déjà comptés ci-dessus)

### Phase 2 — Ajout de la méditation manquante
1. RDV 330 ("La corde tendue", 15 paras) → ajouter une méditation (à rédiger)

### Phase 3 — Insertion des 28 nouveaux récits
Position d'insertion : **après RDV 310** (fin des compagnons existants).
Ordre logique :
- 311-319 : Bloc A (9 compagnons supplémentaires)
- 320-328 : Bloc B (9 miracles & prophéties)
- 329-338 : Bloc C (10 sagesses & eschatologie)

Les RDV 311-335 actuels (complets) sont renumérotés → 339-363.
Le RDV 330 actuel (quasi, mort du Prophète) rejoint la fin narrative.

### Phase 4 — Renumérotation
- Tout renuméroter 1 → 347
- IDs : rdv_001 → rdv_347
- Mettre à jour `meta.total_rdv_available`

### Phase 5 — Combler le manque de 18
**Options :**
- (a) Rédiger 18 nouveaux RDV (thèmes manquants : batailles mineures, femmes Compagnons, miracles supplémentaires)
- (b) Cibler 347 au lieu de 365 (année non-bissextile = 365, mais un cycle de ~347 jours est acceptable)
- (c) Recycler les 14 stubs quiz en vrais récits (les titres sont bons, juste développer le contenu)

**Recommandation : option (c)** — les stubs 316-329 ont des titres pertinents :
- La parole dans la grotte, Le premier converti, Le boycott de Shiʿb, Le voyage de Ṭāʾif
- La nuit de l'Hijra, Les forces à Badr, Le puits des morts, L'archer qui descend
- Le fossé, L'effacement du titre, La Mecque libérée, Le pèlerinage d'Adieu
- Le retour de Jésus (doublon avec bloc C), Les cinq inconnaissables

→ 12 titres uniques exploitables + 6 à créer = les 18 manquants.
Mais cela nécessite la RÉDACTION de contenu (pas dans les fichiers existants).

## DOUBLONS DÉTECTÉS (intra-main)

| Titre | RDV concernés | Action |
|-------|--------------|--------|
| Le pardon après Ṭā'if | 339, 346 | Garder 339, supprimer 346 |
| La corde tendue | 330, 350 | Garder 330 (15 paras), supprimer 350 (vide) |
| Le retour de Jésus | 328 (stub), bloc C #21 | Remplacer stub par version complète |

## RISQUES

1. **Ordre narratif** : les 28 nouveaux récits (compagnons, miracles, eschatologie) n'ont pas de chronologie Sîra stricte. Ils s'insèrent comme "hors-série thématiques" après le narratif principal (1-310).
2. **Partie/Dimensions** : les batch files ont `partie: "Anecdotes datées"` — à harmoniser avec les parties existantes (I à XI).
3. **18 manquants** : nécessitent rédaction humaine ou IA. Ne pas merger à 365 avec du contenu bâclé.

## DÉCISION À PRENDRE AVANT MERGE

- [ ] Valider l'insertion des 28 récits aux positions 311-338
- [ ] Confirmer la suppression des 29 stubs/vides
- [ ] Choisir option (a), (b) ou (c) pour les 18 manquants
- [ ] Valider l'ajout d'une méditation au RDV 330
