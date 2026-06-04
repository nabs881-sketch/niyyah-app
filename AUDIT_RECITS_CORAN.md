# AUDIT RECITS_CORAN.DOCX — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** `recits_coran.docx` (et son miroir JSON le cas échéant)
**Source de l'audit :** Audit théologique Niyyah, session 2026-05-23
**Nombre de corrections :** 5
**Niveau global du fichier :** Très bon, corrections ciblées uniquement.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE `recits_coran.docx` (et son JSON miroir si présent).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin avec le message : `audit théologique recits_coran.docx : 5 corrections`

---

## CORRECTION 1 — Récit 9 (Le peuple de Loth)

**Risque :** Sensibilité Play Store sur formulation non-coranique.

**REMPLACER :**
> Ils délaissaient leurs épouses pour aller vers les hommes — non par amour, mais par envie de transgresser.

**PAR :**
> Ils approchaient leurs semblables contrairement à la fitra qu'Allâh a créée.

---

## CORRECTION 2 — Récit 4 (Moussa et Al-Khidr)

**Problème :** Manque la note sur le débat du statut prophétique de Khidr (présent dans prophetes.docx Jour 49, incohérence inter-fichiers).

**REMPLACER la source actuelle :**
> *Sourate Al-Kahf (18:60-82) — identification d'Al-Khidr par les hadiths (Bukhari, Muslim)*

**PAR :**
> *Sourate Al-Kahf (18:60-82) — identification d'Al-Khidr par les hadiths (Bukhari, Muslim) · Note : statut prophétique débattu — position majoritaire chez les sunnites : prophète*

---

## CORRECTION 3 — Récit 16 (Talut, Dawud et le géant)

**Problème :** Le détail "cinq pierres" provient de 1 Samuel 17:40 (Bible), pas du Coran. À signaler comme tradition antérieure à l'Islam.

**REMPLACER :**
> Avec une fronde et cinq pierres ramassées dans le lit du fleuve.

**PAR :**
> Avec une fronde et — selon la tradition antérieure à l'Islam — cinq pierres ramassées dans le lit du fleuve.

---

## CORRECTION 4 — Récit 18 (Les gens du fossé)

**Problème :** Référence floue "c'est rapporté dans les hadiths" sans isnâd précis.

**REMPLACER :**
> et c'est rapporté dans les hadiths :

**PAR :**
> et c'est rapporté par Muslim n°3005 (hadith de Suhayb) :

---

## CORRECTION 5 — Récit 19 (Issa et la table descendue du ciel)

**Problème :** La chute suggère que le Coran "laisse en suspens" alors qu'il a tranché doctrinalement (5:115 — avertissement de châtiment unique).

**REMPLACER :**
> Le Coran ne dit pas ce qui se passa ensuite. Il laisse la table planer là — entre ciel et terre — comme une question.

**PAR :**
> Le Coran ne décrit pas le festin lui-même. Mais il a déjà dit l'essentiel : un signe reçu est un poids porté.

---

## VALIDATION POST-EXÉCUTION

Après les 5 modifications :
1. Vérifier qu'aucun autre paragraphe n'a été touché.
2. Vérifier que le sourcing en tête de chaque récit reste intact (sauf R4).
3. COMMIT unique : `audit théologique recits_coran.docx : 5 corrections`

---

## NOTE TRANSLITTÉRATION (NON-URGENT)

Décision Nabs en attente : uniformiser tous les fichiers Niyyah sur **"Allah/Ibrahim"** (sans accent) OU **"Allâh/Ibrâhîm"** (avec accent).

Actuellement :
- `prophetes.docx` → Allah / Ibrahim
- `recits_coran.docx` → Allâh / Ibrâhîm

À trancher AVANT soumission Play Store. Ne pas modifier maintenant.
