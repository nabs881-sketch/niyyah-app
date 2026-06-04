# AUDIT REGARD_VERSETS.DOCX — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** `regard_versets.docx` (+ JSON miroir si présent : `regard-versets.json` ou équivalent)
**Source de l'audit :** Audit théologique Niyyah, session 2026-05-23
**Structure du module :** 128 versets × 16 thèmes × 8 versets = module "Regarde" / "Scan Niyyah"
**Nombre de corrections :** 4 obligatoires + 2 optionnelles
**Niveau global :** Excellent, corrections cosmétiques ciblées.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE le module Versets / Regarde (.docx + JSON miroir).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin : `audit théologique regard_versets : 4 corrections`

---

## CORRECTION 1 — VISAGE Verset 1 : pudeur

**Problème :** La méditation glisse de la dignité de création vers l'esthétique corporelle, ce qui contredit la doctrine Al-Haya / anti-gamification.

**Verset (reste inchangé) :**
> Nous avons certes créé l'homme dans la forme la plus parfaite. *(Coran, At-Tîn 95:4)*

**REMPLACER la méditation actuelle :**
> La forme la plus belle. Pour toi.

**PAR :**
> Parfaitement créé. Reconnais.

---

## CORRECTION 2 — TISSU Verset 7 : traduction sensible

**Problème :** La traduction du verset 24:58 contient "esclaves que vous possédez". Conformément à l'adoucissement Play Store validé dans la doctrine éditoriale Niyyah ("esclavage → pratique historique d'affranchissement"), remplacer par une traduction moderne équivalente du *mâ malakat aymânukum* qui reste fidèle au sens fiqhi sans utiliser le mot "esclaves".

**REMPLACER dans la traduction française du verset :**
> Que les esclaves que vous possédez vous demandent permission avant d'entrer

**PAR :**
> Que ceux qui sont sous votre autorité vous demandent permission avant d'entrer

**Le reste du verset (à propos des trois moments) reste inchangé.**

---

## CORRECTION 3 — VEHICULE Verset 8 : méditation manquante

**Problème :** Le récit s'arrête sur le verset sans méditation finale (toutes les autres entrées en ont une).

**Verset (reste inchangé) :**
> Quand ils montent en bateau, ils invoquent Allah en Lui vouant exclusivement leur culte. [Mais] Une fois qu'Il les a sauvés [des dangers de la mer en les ramenant] sur la terre ferme, voilà qu'ils [Lui] donnent des associés *(Coran, Al-ʿAnkabût 29:65)*

**AJOUTER après le verset, la méditation :**
> En danger, on se souvient. Sauvé, on oublie.

---

## CORRECTION 4 — INDETERMINE Verset 8 : précision du nom As-Samad

**Problème :** La traduction Hamidullah de "Allâh as-Samad" par "Le Seul à être imploré pour ce que nous désirons" est une glose qui affaiblit le sens du nom divin. Remplacer par une formulation plus dense et plus orthodoxe.

**REMPLACER dans le verset Al-Ikhlâṣ :**
> Dis : « Il est Allah, Unique. Allah, Le Seul à être imploré pour ce que nous désirons. Il n'a jamais engendré, n'a pas été engendré non plus. Et nul n'est égal à Lui. »

**PAR :**
> Dis : « Il est Allah, Unique. Allah, l'Absolu (As-Samad). Il n'a jamais engendré, n'a pas été engendré non plus. Et nul n'est égal à Lui. »

---

## CORRECTIONS OPTIONNELLES (à valider par Nabs avant exécution)

### OPTIONNEL 1 — TISSU Verset 2 : contexte conjugal

**Verset Al-Baqara 2:187 cité hors contexte conjugal direct.**

Si tu veux être strict, modifier la source :
- AVANT : *Coran, Al-Baqara (2:187)*
- APRÈS : *Coran, Al-Baqara (2:187) — extrait*

Par défaut : ne pas modifier (le verset est sublime hors contexte aussi).

### OPTIONNEL 2 — NOURRITURE Verset 6 : viande

**Méditation actuelle :** "Chaleur, profit, viande : pour toi."

Si uniformisation souhaitée (sensibilité végétarien musulman + Play Store) :
- AVANT : "Chaleur, profit, viande : pour toi."
- APRÈS : "Chaleur, profit, nourriture : pour toi."

Par défaut : ne pas modifier (le Coran mentionne explicitement la viande).

---

## VALIDATION POST-EXÉCUTION

Après les 4 modifications :
1. Vérifier qu'aucun autre verset n'a été touché.
2. Vérifier que la structure 16 thèmes × 8 versets reste intacte (128 entrées total).
3. Vérifier que les sources (Coran, sourate, versets) restent toutes correctes.
4. COMMIT : `audit théologique regard_versets : 4 corrections`

---

## NOTE TRANSLITTÉRATION

Ce fichier utilise **"Allah"** (sans accent circonflexe). Cohérent avec `prophetes.docx` mais incohérent avec `recits_coran.docx` (qui utilise "Allâh"). 

**Décision Nabs en attente :** uniformiser tous les fichiers Niyyah.
**Recommandation :** Garder "Allah" sans accent (style édition francophone musulmane mainstream). À trancher avant Play Store, ne pas modifier maintenant.

---

## DÉCISION REQUISE AVANT EXÉCUTION

**Corrections OPTIONNELLES (1 et 2)** :
- OUI appliquer → confirmer
- NON garder → par défaut

Si Nabs ne précise pas : par défaut, les 4 obligatoires uniquement.
