# Niyyah — Porte Colère : Audit complet

> Généré le 2026-05-04 — script.js v586 (SW v672)

---

## 1. TECHNIQUE

### 1.1 Fonctions onclick non exportées sur window

| Fonction | Définie | Appelée onclick | Sévérité |
|----------|---------|----------------|-----------|
| _refugeRun | L4300 | L4293 | **CRITIQUE** |
| _cureJ7FinaleSucces | L5176 | L5169 | **CRITIQUE** |

### 1.2 localStorage orphelines

| Clé | Écrite | Lue | Statut |
|-----|--------|-----|--------|
| cure_orientation_medicale | L5187 | jamais | Mineur |
| muhasaba_classique_reparation | L4451 | jamais | Mineur |
| muhasaba_action_haqq_allah | L4466 | jamais | Mineur |
| muhasaba_amorce_repar | L4501 | jamais | Mineur |
| muhasaba_message_ecrit | L4501 | jamais | Mineur |
| muhasaba_soin_nafs | L4535 | jamais | Mineur |

### 1.3 Null access potentiel

| Ligne | Pattern | Risque |
|-------|---------|--------|
| L4097 | getElementById sans null check dans rAF | **HAUT** |
| L4098-4099 | idem translit/source | **HAUT** |

### 1.4 Autres
- Code mort : aucun
- Listeners : visibilitychange permanent (salat), timeouts guardés
- Non-ASCII identifiants : aucun

### Résumé : 2 critiques, 2 hauts, 6 mineurs

---

## 2. UX

### 2.1 Textes < 12px : 49 occurrences (47x 11px, 2x 10px)
Tous sur sources hadith, grades, labels. Texte principal >= 13px.

### 2.2 Boutons largeur
| max-width | Nb | Note |
|-----------|-----|------|
| 320px | 29 | Pre-v578, a migrer vers 340px |
| 340px | 12 | Standard actuel |

### 2.3 Ecrans sans sortie : aucun
### 2.4 Etats ambigus : 1 (disabled+opacity L4620, bas)
### 2.5 Overflow : aucun détecté

### Résumé : 0 critique, 29 mineurs (320px), 49 bas (11px)

---

## 3. THEOLOGIQUE

### 3.1 Hadiths (19 références)

| # | Réf | Grade | Narrateur | Statut |
|---|-----|-------|-----------|--------|
| 1 | Bukhari 6114 | Sahih | Abu Hurayra | OK |
| 2 | Abu Dawud 4782 | Sahih | Abu Dharr | OK |
| 3 | Ahmad 2136 | Sahih | Ibn Abbas | OK |
| 4 | Abu Dawud 4784 | Daif retire | - | OK |
| 5 | Bukhari 3282 | Sahih | Sulayman ibn Surad | OK |
| 6 | Muslim 2588 | Sahih | Abu Hurayra | OK |
| 7 | an-Nasai 1305 | Sahih | Ammar ibn Yasir | OK |
| 8 | Bukhari 1 | Sahih | Umar | OK |
| 9 | Bukhari 6116 | Sahih | Abu Hurayra | OK |
| 10 | Muslim 2867 | Sahih | **manquant** | Mineur |
| 11 | Bukhari 6306 | Sahih | Shaddad ibn Aws | OK |
| 12 | Bukhari 6035 | Sahih | Abd Allah ibn Amr | OK |
| 13 | Bukhari 1968 | Sahih | Salman | OK |
| 14 | Bukhari 1469 | Sahih | Abu Said al-Khudri | OK |
| 15 | Muslim 2748 | **manquant** | **manquant** | Mineur |
| 16 | Tirmidhi 3505 | **manquant** | **manquant** | Mineur |
| 17 | Bukhari 6363 | **manquant** | **manquant** | Mineur |
| 18 | Bukhari 10 | **manquant** | **manquant** | Mineur |
| 19 | Bukhari 6018 | **manquant** | **manquant** | Mineur |

### 3.2 Versets coraniques (13) : tous OK
7:151, 12:111, 13:11, 21:87, 2:222, 2:286, 12:86, 12:92, 22:76, 39:53, 11:114, 42:40, 28:77

### 3.3 Non-hadith
| Texte | Attribution | Statut |
|-------|------------|--------|
| Sagesse al-Muhasibi | Inspire | OK |
| Dua libre J4 | Non attribue | Info |
| Athar Umar | Umar ibn al-Khattab | OK |

### Résumé : 0 critique, 5 mineurs (grades/narrateurs), 1 info

---

## Résumé général

| Catégorie | Critiques | Hauts | Mineurs | Bas |
|-----------|----------|-------|---------|-----|
| Technique | 2 | 2 | 6 | 2 |
| UX | 0 | 0 | 29 | 49 |
| Théologie | 0 | 0 | 5 | 2 |
| **Total** | **2** | **2** | **40** | **53** |