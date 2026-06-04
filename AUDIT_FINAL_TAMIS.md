# AUDIT FINAL TAMIS NIVEAU 3+ — INSTRUCTIONS CLAUDE CODE

**Source de l'audit :** Tamis cohérence inter-fichiers sur 13 fichiers contenu Niyyah, session 2026-05-23
**Fichiers cibles :** `regard_versets.docx`, `savais_tu.docx`, `tafakkur_recits.docx` (+ JSON miroirs)
**Nombre de corrections :** 3 (1 vérification + 2 corrections factuelles)
**Niveau :** Coquilles factuelles, pas erreurs éditoriales.

---

## RÈGLE D'EXÉCUTION

1. Ces 3 corrections touchent 3 fichiers différents.
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin : `audit final tamis : 3 corrections factuelles (Sumayya + Yusuf Islam + vérif regard_versets)`

---

## CORRECTION 1 — VÉRIFICATION : regard_versets 24:58 "esclaves"

**Contexte :** L'audit phase 1 (AUDIT_REGARD_VERSETS.md) avait demandé de remplacer "esclaves que vous possédez" par une formulation plus contextuelle dans le verset An-Nûr 24:58. Le `.docx` analysé contient toujours le texte original.

**ACTION 1 — VÉRIFICATION :**

Dans le JSON source `data/waqt/regard_versets.json` (ou équivalent), chercher le verset An-Nûr (24:58).

```bash
grep -i "esclaves que vous possédez" data/waqt/regard_versets.json
```

**Si la phrase est trouvée :** la correction phase 1 n'a pas été appliquée. Appliquer maintenant :

**REMPLACER :**
> Ô vous qui avez cru ! Que les esclaves que vous possédez vous demandent permission avant d'entrer, ainsi que ceux des vôtres qui n'ont pas encore atteint la puberté, à trois moments : avant la prière de l'aube (Salât Al Fajr), à midi quand vous enlevez vos vêtements, ainsi qu'après la prière de la nuit (Salât Al ʿIchâʼ) ; trois occasions de vous dévêtir.

**PAR :**
> Ô vous qui avez cru ! Que ceux qui sont sous votre autorité (*mâ malakat aymânukum*) ainsi que ceux des vôtres qui n'ont pas encore atteint la puberté vous demandent permission avant d'entrer, à trois moments : avant la prière de l'aube (Salât Al Fajr), à midi quand vous enlevez vos vêtements, ainsi qu'après la prière de la nuit (Salât Al ʿIchâʼ) ; trois occasions où l'on se dévêt.

**Si la phrase n'est PAS trouvée :** la correction a déjà été appliquée. Passer à la correction 2.

---

## CORRECTION 2 — savais_tu : Yusuf Islam (Cat Stevens)

**Fichier :** `data/waqt/savais_tu.json` (ou équivalent)

**Localisation :** Fait 74 — Cat Stevens / Yusuf Islam

**Problème :** Erreurs factuelles historiques.
- Cat Stevens est né le **21 juillet 1948**
- Il a manqué de se noyer à **Malibu en 1976** → il avait **28 ans**, pas 23
- Conversion officielle en **1977** → il avait **29 ans**

**REMPLACER :**
> Cat Stevens, l'auteur de « Father and Son » et « Wild World », au sommet de sa gloire. Vingt-trois ans, des millions d'albums. Un jour il manque de se noyer en Californie. Il prie pour la première fois : « Si tu existes, sauve-moi. » Il survit. Il devient Yusuf Islam. Sa carrière s'arrête. Sa vie commence.

**PAR :**
> Cat Stevens, l'auteur de « Father and Son » et « Wild World », au sommet de sa gloire. Vingt-huit ans, des millions d'albums. Un jour de 1976, il manque de se noyer à Malibu. Il prie pour la première fois : « Si tu existes, sauve-moi. » Une vague le repousse vers la plage. Il survit. Quelques mois plus tard, son frère David lui offre un Coran. Il l'ouvre sur al-Fâtiha. Il devient Yusuf Islam. Sa carrière s'arrête. Sa vie commence.

**Note de cohérence :** cette version est désormais cohérente avec `tafakkur_recits` qui mentionne déjà 1976 et Malibu.

---

## CORRECTION 3 — tafakkur_recits : Sumayya bint "Khabbat" → "Khayyat"

**Fichier :** `data/waqt/tafakkur_recits.json` (ou équivalent)

**Localisation :** Entrée `tafakkur_old_175` (ou équivalent) — la question sur Sumayya martyre

**Problème :** Coquille sur le nom de famille. Deux autres fichiers (`compagnons.docx` Jour 81 + `savais_tu.docx` Fait 193) disent correctement "Khayyat". Tafakkur_recits a "Khabbat" → coquille.

**REMPLACER :**
> *Sumayya bint Khabbat (Tabarî, Ibn Sa'd)*

**PAR :**
> *Sumayya bint Khayyat (Tabarî, Ibn Sa'd)*

**Et dans le corps de texte de la même entrée :**

**REMPLACER :**
> Sumayya bint Khabbat, mère de 'Ammâr ibn Yâsir, fut la première martyre de l'islam.

**PAR :**
> Sumayya bint Khayyat, mère de 'Ammâr ibn Yâsir, fut la première martyre de l'islam.

**Note :** chercher TOUTES les occurrences de "Khabbat" dans le fichier (il pourrait y en avoir d'autres). Remplacer toutes par "Khayyat".

```bash
grep -n "Khabbat" data/waqt/tafakkur_recits.json
```

---

## VALIDATION POST-EXÉCUTION

Après les modifications :

1. **regard_versets** : si correction appliquée, vérifier qu'il n'y a plus aucune occurrence de "esclaves que vous possédez" dans le verset 24:58. Régénérer le .docx miroir.

2. **savais_tu** : vérifier que Fait 74 contient maintenant "Vingt-huit ans", "1976", "Malibu". Régénérer le .docx miroir.

3. **tafakkur_recits** : vérifier qu'aucune occurrence de "Khabbat" ne subsiste. Régénérer le .docx miroir.

4. COMMIT : `audit final tamis : 3 corrections factuelles (Sumayya + Yusuf Islam + vérif regard_versets)`

---

## SYNTHÈSE

| Correction | Fichier | Type | Action |
|------------|---------|------|--------|
| 1 | regard_versets | Vérification | Confirmer ou appliquer correction phase 1 |
| 2 | savais_tu | Factuelle | Cat Stevens 23 → 28 ans + 1976 Malibu |
| 3 | tafakkur_recits | Coquille | Sumayya Khabbat → Khayyat |

**Verdict global après ces 3 corrections :** Les 13 fichiers contenu Niyyah seront cohérents factuellement et théologiquement à 100%.

---

## DÉCISIONS DIFFÉRÉES (non incluses dans ce doc)

- **Translittération globale Allah / Allâh** : à trancher avant Play Store, doc séparé à venir si décision
- **Cohérence Aïcha sira/compagnons** : choix éditorial, à arbitrer par Nabs
- **tafakkur_recits Q1 "Tu vas mourir"** : choix éditorial assumé

Ces décisions n'empêchent pas le commit de ce doc.
