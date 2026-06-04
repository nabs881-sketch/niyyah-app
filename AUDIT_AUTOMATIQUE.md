# AUDIT AUTOMATIQUE NIYYAH — INSTRUCTIONS CLAUDE CODE

**Objectif :** Audit mécanique exhaustif de cohérence inter-fichiers sur les 13 fichiers de contenu Niyyah.
**Mission :** Vérification programmatique, PAS éditoriale. Tu produis un RAPPORT, tu ne corriges rien.
**Sortie attendue :** Fichier `RAPPORT_AUDIT_AUTOMATIQUE.md` à la racine du projet.
**Durée estimée :** 30-60 minutes selon scripts.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE AUCUN fichier JSON ou .docx. Lecture seule.
2. PAS DE BUMP SW. PAS DE `cp script.js script.min.js`.
3. Produis un seul fichier `RAPPORT_AUDIT_AUTOMATIQUE.md` à la racine.
4. UN SEUL COMMIT à la fin : `audit automatique : rapport cohérence inter-fichiers`

---

## PÉRIMÈTRE — 13 FICHIERS JSON SOURCE

Identifie d'abord les chemins exacts. Probablement dans `data/waqt/` :
- bab_an_nafs.json (ou .js)
- compagnons.json
- duaas.json
- fiqh.json
- hadiths_jour.json
- prophetes.json
- recits_coran.json
- regard_versets.json
- savais_tu.json
- sira.json
- tafakkur_final.json (= 379 questions tafakkur)
- tafakkur_recits.json (= 379 récits enrichis)
- waqt_phrases.json (= 323 phrases par prière)

Pour CHAQUE fichier, en début de rapport, note :
- Chemin exact
- Nombre d'entrées
- Taille en lignes
- Date de dernière modification (git log -1 --format="%ai" -- <fichier>)

---

## VÉRIFICATION 1 — INTÉGRITÉ JSON

Pour CHAQUE fichier JSON :

1. **Parsing** : le fichier parse-t-il sans erreur ? (`JSON.parse` ou `node -e`)
2. **Champs requis** : chaque entrée contient-elle au minimum `id` + texte principal + source ?
3. **`\n\n` littéraux** : compter les occurrences de `\\n\\n` (deux backslash-n) — ce sont des bugs d'encodage
4. **Caractères suspects** : chercher \u0000, caractères de contrôle, BOM
5. **Doublons d'ID** : deux entrées ne doivent pas partager le même ID

**FORMAT DE SORTIE :**

```markdown
## V1 — Intégrité JSON

| Fichier | Parse OK | Champs OK | \n\n bugs | Caractères suspects | Doublons ID |
|---------|----------|-----------|-----------|---------------------|-------------|
| bab_an_nafs | ✅ | ✅ | 0 | 0 | 0 |
| compagnons | ... | ... | ... | ... | ... |
```

Si problèmes détectés, liste-les en détail après le tableau.

---

## VÉRIFICATION 2 — TRANSLITTÉRATION ALLAH

Compter dans CHAQUE fichier :
- Occurrences du mot `Allah` (sans accent)
- Occurrences du mot `Allâh` (avec accent circonflexe)
- Occurrences de `Allāh` (avec macron)
- Occurrences de `ALLAH` (capitales)

**Attention :** ne pas compter dans le texte arabe (الله) ou dans les translittérations spéciales (Allahu, Allahumma) — ces dernières sont des cas légitimes.

**FORMAT DE SORTIE :**

```markdown
## V2 — Translittération Allah

| Fichier | Allah | Allâh | Allāh | ALLAH | Régime dominant |
|---------|-------|-------|-------|-------|-----------------|
| ... |
```

---

## VÉRIFICATION 3 — DOUBLONS TEXTUELS INTER-FICHIERS

Pour chaque entrée de chaque fichier, prendre les **30 premiers caractères** du texte principal. Détecter les doublons entre fichiers.

**Cas légitimes à ignorer :**
- Citations coraniques identiques (versets cités dans plusieurs modules)
- Hadiths identiques (le même hadith peut être cité dans hadiths_jour ET sira)

**Cas problématiques à signaler :**
- Mêmes anecdotes racontées plusieurs fois avec wording quasi-identique
- Mêmes accroches narratives (« Imagine », « Tu vas mourir », etc.) trop répétées

**FORMAT DE SORTIE :**

```markdown
## V3 — Doublons textuels

### Doublons légitimes (versets/hadiths)
- [liste]

### Doublons à examiner
- Fichier A entrée X / Fichier B entrée Y : « texte commun... »
```

---

## VÉRIFICATION 4 — COHÉRENCE NUMÉROS DE HADITHS

Pour chaque référence de hadith (format `Bukhari XXXX` ou `Muslim XXXX` ou `Tirmidhi XXXX`, etc.), vérifier que **le même numéro renvoie au même contenu** dans tous les fichiers.

**Méthode :**

1. Extraire toutes les références : regex `(Bukhari|Muslim|Tirmidhi|Abu Dawud|Nasa'i|Ibn Majah|Ahmad|Bayhaqi|Tabarani|Hakim)\s*\d+`
2. Pour chaque référence trouvée, capturer aussi les 100 caractères avant + 100 caractères après
3. Grouper par référence : si Bukhari 6114 apparaît dans 4 fichiers, les 4 contextes doivent décrire le même hadith

**FORMAT DE SORTIE :**

```markdown
## V4 — Cohérence numéros de hadiths

| Référence | Nb occurrences | Fichiers | Cohérent ? |
|-----------|----------------|----------|------------|
| Bukhari 6114 | 3 | sira, tafakkur_recits, bab_an_nafs | ✅ |
| Muslim 91 | 4 | ... | ⚠️ — voir détail |

### Détails des incohérences
- Bukhari XXXX : dans fichier A décrit X, dans fichier B décrit Y → vérifier
```

---

## VÉRIFICATION 5 — COHÉRENCE NUMÉROS DE VERSETS

Pour chaque référence coranique (format `Coran X:Y` ou `(X:Y)` ou `sourate XXX (X:Y)`), vérifier que **le verset cité correspond toujours au même contenu**.

**Méthode :**

1. Extraire toutes les références : regex `Coran\s*\d+\s*:\s*\d+` et `\(\d+\s*:\s*\d+\)` et `sourate\s+[A-Za-zÀ-ÿ-]+\s*\(\d+\)\s*,?\s*versets?\s*\d+`
2. Pour chaque référence, capturer le contexte (50 caractères avant + 200 caractères après)
3. Grouper par référence et signaler les incohérences évidentes

**FORMAT DE SORTIE :**

```markdown
## V5 — Cohérence numéros de versets

| Référence | Nb occurrences | Fichiers | Cohérent ? |
|-----------|----------------|----------|------------|
| Coran 21:83 | 3 | ... | ✅ |

### Détails des incohérences
- Coran XX:YY : dans fichier A décrit X, dans fichier B décrit Y → vérifier
```

---

## VÉRIFICATION 6 — COHÉRENCE NOMS PROPRES

**Sahaba ciblés** (extraire toutes les mentions + 50 caractères de contexte) :
- Abu Bakr (as-Siddîq, ibn Abi Quhafa)
- Umar (ibn al-Khattab)
- Uthman (ibn Affan)
- Ali (ibn Abi Talib)
- Khadija (bint Khuwaylid)
- Aïcha (Aisha)
- Fatima (al-Zahra)
- Bilal (ibn Rabah)
- Khabbab (ibn al-Aratt)
- Sumayya (bint Khayyat OU Khabbat — DÉJÀ IDENTIFIÉ COMME COQUILLE)
- Salman (al-Farisi)
- Mus'ab (ibn Umayr)
- Hamza (ibn Abd al-Muttalib)
- Khalid (ibn al-Walid)

**Prophètes ciblés** :
- Adam, Nuh, Ibrahim, Ismâ'îl, Yusuf, Mûsâ, Hârûn, Ayyub, Yunus, Dawud, Sulayman, Maryam, Isa, Muhammad ﷺ

Pour chacun, signaler :
- Variantes de translittération (Aicha / Aïcha / Aïsha / 'Â'isha)
- Faits clés mentionnés (lieu, événement, dates)
- Incohérences factuelles entre fichiers

**FORMAT DE SORTIE :**

```markdown
## V6 — Cohérence noms propres

### Sahaba

#### Aïcha
- Translittérations trouvées : « Aïcha » (45), « Aïsha » (2), « 'Â'isha » (1)
- Mentions âge mariage : sira « 9 ans » + compagnons « 6 puis 9 ans (débat 15-19 ans) » → écart à signaler
- Mentions hadiths transmis : sira « 2200 » + compagnons « 2210 » → écart minime

#### Sumayya
- Translittérations : « Khayyat » (2) + « Khabbat » (1 tafakkur_recits) ⚠️ COQUILLE
- ...

### Prophètes

#### Yûnus
- Translittérations : « Yûnus » (X), « Yunus » (Y), « Younes » (Z)
- Faits : Ninive 100 000 habitants, poisson, fuite → cohérent partout

[etc. pour tous les noms]
```

---

## VÉRIFICATION 7 — COHÉRENCE DATES HISTORIQUES

Extraire toutes les dates explicites et vérifier cohérence :

- Hijra : 622
- Bataille de Badr : 624 (an 2 H)
- Bataille d'Uhud : 625 (an 3 H)
- Bataille du Khandaq (Fossé) : 627 (an 5 H)
- Traité d'Hudaybiyya : 628 (an 6 H)
- Conquête de La Mecque : 630 (an 8 H)
- Mort du Prophète ﷺ : 632 (12 Rabi' al-Awwal 11 H)
- Âge mort Prophète : 63 ans
- Khadija morte : an 10 de la prophétie / 619-620
- Persécutions Mecque : 613-622
- Tâ'if : 619

**Pour chaque date trouvée dans les 13 fichiers, vérifier qu'elle est cohérente avec les autres mentions.**

**FORMAT DE SORTIE :**

```markdown
## V7 — Cohérence dates historiques

| Événement | Date attendue | Mentions trouvées | Cohérent ? |
|-----------|---------------|-------------------|------------|
| Hijra | 622 | 622 (sira), 622 (compagnons) | ✅ |
| Mort Prophète | 632, 63 ans | 632 (sira), 632 (compagnons) | ✅ |
| Conquête Mecque | 630 | ... | ... |
```

---

## VÉRIFICATION 8 — RÉFÉRENCES MODERNES (Personnages contemporains)

Liste tous les noms de personnes nées après 1800 mentionnés dans le contenu. Pour chacun, signaler :
- Le fichier où il est mentionné
- Les faits historiques associés (dates, lieux, événements)
- Vérifier la cohérence si mentionné plusieurs fois

**Personnages déjà identifiés :**
- Yusuf Islam / Cat Stevens (1948, conversion 1977) — INCOHÉRENCE DÉJÀ DÉTECTÉE
- Jeffrey Lang (mathématicien, *Even Angels Ask*)
- Karen Armstrong (*Muhammad: A Biography of the Prophet*)
- Randy Pausch (mort 2008)
- Maurice Bucaille
- Oliver Sacks (*Musicophilia* 2007)
- Edward Tufte
- Kurt Gödel (1931)
- Pierre Janet (1877)
- Mansa Moussa (XIVe siècle)
- Saladin (1138-1193)
- Hârûn ar-Rashîd (786-809)
- Ibn an-Nafîs (1213)

**FORMAT DE SORTIE :**

```markdown
## V8 — Références modernes

| Personne | Fichiers | Faits | Cohérent ? |
|----------|----------|-------|------------|
| Cat Stevens / Yusuf Islam | savais_tu, tafakkur_recits | savais_tu: "23 ans, Californie" + tafakkur_recits: "1976 Malibu" | ⚠️ ÉCART |
```

---

## VÉRIFICATION 9 — TYPOGRAPHIE FRANÇAISE

Pour chaque fichier, compter :

1. **Smartquotes** : `«` `»` `'` `'` `"` `"` vs guillemets droits `"` `'`
2. **Espaces avant ponctuation française** : présence d'espaces (insécables idéalement) avant `? ! : ;`
3. **Tirets em** : `—` vs `--`
4. **Apostrophes courbes** : `'` vs droites `'`

**FORMAT DE SORTIE :**

```markdown
## V9 — Typographie française

| Fichier | Smartquotes | Espaces ponctuation | Tirets em | Apostrophes courbes |
|---------|-------------|--------------------|-----------| --------------------|
| ... |
```

---

## VÉRIFICATION 10 — SYNCHRONISATION JSON ↔ DOCX

Pour chaque paire (JSON, .docx miroir), vérifier :

1. Le .docx existe-t-il ?
2. Le `git log` montre-t-il que .docx a été régénéré APRÈS dernière modification du JSON ?
3. Échantillonnage : prendre 5 entrées aléatoires du JSON, vérifier qu'elles apparaissent dans le .docx

**FORMAT DE SORTIE :**

```markdown
## V10 — Synchronisation JSON ↔ DOCX

| JSON | DOCX miroir | DOCX à jour ? | Échantillon cohérent ? |
|------|-------------|---------------|-------------------------|
| ... |
```

---

## VÉRIFICATION 11 — INVENTAIRE COMPLET DES SOURCES SCRIPTURAIRES

Produire la liste complète, déduplliquée :

1. **Tous les versets coraniques cités** (sourate, numéro de verset, fichiers où apparaît)
2. **Tous les hadiths cités** (collection, numéro, fichiers où apparaît, grade quand mentionné)
3. **Tous les ouvrages classiques cités** (Sîra Ibn Hisham, Tabari, Ibn Kathir, Ibn Sa'd, etc.)
4. **Tous les noms divins (Asma' al-Husna) cités** avec traduction française

**FORMAT DE SORTIE :**

```markdown
## V11 — Inventaire des sources

### Versets coraniques (X uniques)
[tableau]

### Hadiths (Y uniques)
[tableau]

### Ouvrages classiques (Z uniques)
[liste]

### Noms divins (W uniques)
[liste avec traduction]
```

---

## VÉRIFICATION 12 — CHIFFRES ET STATISTIQUES

Pour chaque chiffre/statistique mentionné dans le contenu, signaler :
- Le chiffre exact
- Le contexte
- Le fichier
- Sa source revendiquée

**Exemples de chiffres à vérifier :**
- "117 milliards d'humains depuis Adam" (tafakkur_recits)
- "37 000 milliards de cellules"
- "10^164 essais"
- "2200 hadiths transmis par Aïcha"
- "365 fois 'jour' dans le Coran"
- etc.

**FORMAT DE SORTIE :**

```markdown
## V12 — Chiffres et statistiques

| Chiffre | Contexte | Fichier | Source revendiquée | À vérifier ? |
|---------|----------|---------|--------------------|--------------|
| 117 milliards | humains depuis Adam | tafakkur_recits | Paléodémographes | ✅ |
| ... |
```

Ne juge PAS la véracité du chiffre. Juste : liste-les pour vérification humaine ultérieure.

---

## STRUCTURE FINALE DU RAPPORT

`RAPPORT_AUDIT_AUTOMATIQUE.md` doit avoir cette structure :

```
# RAPPORT AUDIT AUTOMATIQUE NIYYAH
Date : [auto]
Fichiers analysés : 13
Total entrées : [auto]
Total caractères : [auto]

## Synthèse exécutive
- ✅ Vérifications OK : X/12
- ⚠️ Anomalies détectées : Y
- 🔴 Critiques : Z

## V1 — Intégrité JSON
[contenu]

## V2 — Translittération Allah
[contenu]

## V3 — Doublons textuels
[contenu]

## V4 — Cohérence numéros de hadiths
[contenu]

## V5 — Cohérence numéros de versets
[contenu]

## V6 — Cohérence noms propres
[contenu]

## V7 — Cohérence dates historiques
[contenu]

## V8 — Références modernes
[contenu]

## V9 — Typographie française
[contenu]

## V10 — Synchronisation JSON ↔ DOCX
[contenu]

## V11 — Inventaire sources
[contenu]

## V12 — Chiffres et statistiques
[contenu]

## Recommandations
[Synthèse en bullet points]
```

---

## RÈGLES DE TON

- Sois FACTUEL. Ne juge pas l'éditorial.
- N'écris pas "il faut corriger". Écris "écart détecté à vérifier".
- Si tu n'arrives pas à faire une vérification, écris "non réalisé : [raison]" et passe à la suivante.
- Ne génère pas de patches. Juste un RAPPORT.

---

## ESTIMATION

- V1-V2 : 5 minutes
- V3 : 10 minutes
- V4-V5 : 15 minutes (le plus long, beaucoup de refs)
- V6-V7 : 15 minutes
- V8 : 5 minutes
- V9-V10 : 10 minutes
- V11 : 10 minutes
- V12 : 5 minutes

**TOTAL : 60-75 minutes**

Si trop long, fais V1-V8 d'abord et stoppe. V9-V12 sont optionnels.

---

## SORTIE FINALE

1. Crée `RAPPORT_AUDIT_AUTOMATIQUE.md` à la racine du projet
2. `git add RAPPORT_AUDIT_AUTOMATIQUE.md`
3. COMMIT : `audit automatique : rapport cohérence inter-fichiers`
4. Préviens Nabs que le rapport est prêt
