# RAPPORT AUDIT AUTOMATIQUE NIYYAH

Date : 2026-05-23
Fichiers analysés : 17 (13 modules + 5 fichiers waqt détaillés)
Total entrées : 2 678
Total caractères : 3 859 391

## Synthèse exécutive

- Vérifications OK : 10/12
- Anomalies détectées : 2 (typographie mixte, translittération Allah non uniformée)
- Critiques : 0 (aucun bug d’intégrité restant)
---

## Inventaire des fichiers

| Fichier | Chemin | Entrées | Lignes | Dernière modif |
|---------|--------|---------|--------|----------------|
| bab_an_nafs | data/bab-an-nafs.json | 3 | 127 | 2026-05-23 15:34 |
| compagnons | compagnons.json | 82 | 986 | 2026-05-23 18:39 |
| duaas | duaas.json | 253 | 4 303 | 2026-05-23 19:45 |
| fiqh | fiqh_jour.json | 180 | 1 622 | 2026-05-23 20:24 |
| hadiths_jour | hadiths_jour.json | 180 | 1 445 | 2026-05-23 20:44 |
| prophetes | prophetes.json | 77 | 927 | 2026-05-23 21:28 |
| recits_coran | data/recits-coran.json | 20 | 3 866 | 2026-05-23 21:41 |
| regard_versets | data/regard-library.json | 17 | 1 724 | 2026-05-23 21:48 |
| savais_tu | savais_tu.json | 450 | 2 270 | 2026-05-23 23:11 |
| sira | data/sira.min.json | 335 | 1 (minifié) | 2026-05-23 22:18 |
| tafakkur_final | data/waqt/tafakkur_final.json | 379 | 2 346 | 2026-05-23 22:33 |
| tafakkur_recits | data/waqt/tafakkur_recits.json | 379 | 1 (minifié) | 2026-05-23 23:11 |
| waqt_fajr | data/waqt/waqt_fajr.json | 48 | 360 | 2026-05-23 22:53 |
| waqt_dhuhr | data/waqt/waqt_dhuhr.json | 40 | 322 | 2026-05-23 22:53 |
| waqt_asr | data/waqt/waqt_asr.json | 30 | 242 | 2026-05-23 22:53 |
| waqt_maghrib | data/waqt/waqt_maghrib.json | 165 | 1 130 | 2026-05-23 22:53 |
| waqt_isha | data/waqt/waqt_isha.json | 40 | 322 | 2026-05-22 09:25 |

---

## V1 — Intégrité JSON

| Fichier | Parse OK | 

 bugs | Caract. suspects | BOM | Doublons ID |
|---------|----------|-------------|------------------|-----|-------------|
| bab_an_nafs | ✅ | 0 | 0 | non | 0 |
| compagnons | ✅ | 0 | 0 | non | 0 |
| duaas | ✅ | 0 | 0 | non | 0 |
| fiqh | ✅ | 0 | 0 | non | 0 |
| hadiths_jour | ✅ | 0 | 0 | non | 0 |
| prophetes | ✅ | 0 | 0 | non | 0 |
| recits_coran | ✅ | 0 | 0 | non | 0 |
| regard_versets | ✅ | 0 | 0 | non | 0 |
| savais_tu | ✅ | 0 | 0 | non | 0 |
| sira | ✅ | 0 | 0 | non | 0 |
| tafakkur_final | ✅ | 0 | 0 | non | 0 |
| tafakkur_recits | ✅ | 0 | 0 | non | 0 |
| waqt_fajr | ✅ | 0 | 0 | non | 0 |
| waqt_dhuhr | ✅ | 0 | 0 | non | 0 |
| waqt_asr | ✅ | 0 | 0 | non | 0 |
| waqt_maghrib | ✅ | 0 | 0 | non | 0 |
| waqt_isha | ✅ | 0 | 0 | non | 0 |

Aucun problème d’intégrité. Tous les bugs 

 corrigés lors des audits précédents.

---

## V2 — Translittération Allah

| Fichier | Allah | Allâh | Allāh | ALLAH | Régime dominant |
|---------|-------|-------|-------|-------|-----------------|
| bab_an_nafs | 15 | 2 | 0 | 0 | Allah |
| compagnons | 409 | 0 | 0 | 0 | Allah |
| duaas | 826 | 0 | 323 | 0 | Allah |
| fiqh | 15 | 0 | 0 | 0 | Allah |
| hadiths_jour | 81 | 0 | 0 | 0 | Allah |
| prophetes | 581 | 0 | 0 | 0 | Allah |
| recits_coran | 0 | 90 | 0 | 0 | Allâh |
| regard_versets | 73 | 45 | 0 | 0 | Allah |
| savais_tu | 109 | 2 | 0 | 0 | Allah |
| sira | 1 179 | 295 | 48 | 0 | Allah (mixte) |
| tafakkur_final | 57 | 9 | 0 | 0 | Allah |
| tafakkur_recits | 58 | 612 | 0 | 0 | Allâh |
| waqt_fajr | 5 | 8 | 0 | 0 | Allâh |
| waqt_dhuhr | 8 | 5 | 0 | 0 | Allah |
| waqt_asr | 0 | 8 | 0 | 0 | Allâh |
| waqt_maghrib | 9 | 13 | 1 | 0 | Allâh |
| waqt_isha | 10 | 7 | 0 | 0 | Allah |

**Constat :** Régime mixte. Fichiers historiques = « Allah ». Fichiers méditatifs récents = « Allâh ». Duaas = 323 occurrences Allāh (macron). Décision d’uniformisation en attente.

---

## V3 — Doublons textuels

### Doublons légitimes (tafakkur_final / tafakkur_recits)

350 doublons détectés entre tafakkur_final et tafakkur_recits. **Normal** : tafakkur_final = questions, tafakkur_recits = mêmes questions + récits enrichis. Doublons structurels attendus.

### Doublons à examiner

- bab_an_nafs / hadiths_jour : « N’entrera pas au Paradis celui qui a dans le cœur... » — même hadith (légitime)

Aucun doublon problématique détecté.

---

## V4 — Cohérence numéros de hadiths

- **865 références uniques** détectées
- **128 hadiths** apparaissent dans 2+ fichiers
- Collections : Bukhari (~300), Muslim (~280), Tirmidhi (~120), Abu Dawud (~60), Ibn Majah (~40), Ahmad (~30)

| Référence | Fichiers | Occurrences |
|-----------|----------|-------------|
| Bukhari 1 | fiqh, hadiths_jour, savais_tu | 4 |
| Bukhari 3 | compagnons, savais_tu | 6 |
| Bukhari 6018 | duaas, fiqh, hadiths_jour, savais_tu | 5 |
| Muslim 91 | bab_an_nafs, hadiths_jour, savais_tu | 5 |
| Bukhari 3364 | prophetes, savais_tu | 7 |

Aucune incohérence : mêmes numéros = même hadith partout.

---

## V5 — Cohérence numéros de versets

- **573 références coraniques uniques**
- **112 versets** dans 2+ fichiers

| Référence | Fichiers | Occurrences |
|-----------|----------|-------------|
| 21:87 | duaas, prophetes, recits_coran, tafakkur_recits | 10 |
| 21:83 | duaas, prophetes, recits_coran, savais_tu, tafakkur_recits | 7 |
| 9:40 | compagnons, sira, tafakkur_recits | 8 |
| 2:207 | compagnons, savais_tu, sira, tafakkur_recits | 5 |
| 96:1 | compagnons, regard_versets, savais_tu, sira | 5 |

Aucune incohérence détectée.

---

## V6 — Cohérence noms propres

### Sahaba

| Personne | Variantes | Fichiers |
|----------|-----------|----------|
| Abu Bakr | Abu Bakr (207), Abû Bakr (85), Abou Bakr (1) | compagnons, duaas, regard_versets, savais_tu, sira, tafakkur_recits |
| Umar | Umar (259), Omar (182), ’Omar (50) | compagnons, duaas, hadiths_jour, regard_versets, savais_tu, sira, tafakkur_final, tafakkur_recits |
| Uthman | Uthman (124), Uthmân (13), Othman (5) | compagnons, duaas, savais_tu, sira, tafakkur_recits |
| Ali | Ali (175), alî (17), Alî (2) | compagnons, duaas, fiqh, regard_versets, savais_tu, sira, tafakkur_recits |
| Khadija | Khadija (115), Khadîja (54) | compagnons, prophetes, savais_tu, sira, tafakkur_recits |
| Aïcha | Aïcha (227), Aïsha (17), Aisha (2) | compagnons, duaas, fiqh, prophetes, savais_tu, sira, tafakkur_recits, waqt_isha |
| Fatima | Fatima (105), Fâtima (5) | compagnons, duaas, prophetes, savais_tu, sira, tafakkur_final, tafakkur_recits |
| Bilal | Bilal (61), Bilâl (45) | compagnons, duaas, regard_versets, savais_tu, sira, tafakkur_recits, waqt_fajr |
| Sumayya | Sumayya (51) — Khayyat uniformisé | compagnons, savais_tu, sira, tafakkur_final, tafakkur_recits |
| Salman | Salman (81), Salmân (4) | compagnons, savais_tu, sira, tafakkur_recits |
| Khalid | Khalid (88), Khâlid (12) | compagnons, duaas, savais_tu, sira, tafakkur_recits |
| Hamza | Hamza (166) | compagnons, sira, tafakkur_recits |

Variantes de translittération cohérentes par fichier. Aucune incohérence factuelle.

---

## V7 — Cohérence dates historiques

| Événement | Date attendue | Fichiers | Cohérent ? |
|-----------|---------------|----------|------------|
| Hijra | 622 | compagnons, hadiths_jour, prophetes, regard_versets, sira, tafakkur_final, tafakkur_recits | ✅ |
| Badr | 624 | compagnons, hadiths_jour, savais_tu, sira | ✅ |
| Uhud | 625 | compagnons, duaas, savais_tu, sira, tafakkur_recits | ✅ |
| Khandaq | 627 | compagnons, prophetes, recits_coran, sira | ✅ |
| Hudaybiyya | 628 | compagnons, sira, tafakkur_recits | ✅ |
| Conquête Mecque | 630 | compagnons, duaas, prophetes, regard_versets, savais_tu, sira, tafakkur_recits | ✅ |
| Mort Prophète | 632 | compagnons, duaas, prophetes, regard_versets, savais_tu, sira, tafakkur_final, tafakkur_recits, waqt_isha | ✅ |
| Tâ’if | 619 | duaas, tafakkur_recits | ✅ |

Aucune incohérence de dates.

---

## V8 — Références modernes

| Personne | Fichiers | Occurrences | Cohérent ? |
|----------|----------|-------------|------------|
| Cat Stevens / Yusuf Islam | savais_tu, tafakkur_recits | 11 | ✅ (corrigé) |
| Jeffrey Lang | tafakkur_recits | 6 | ✅ |
| Karen Armstrong | tafakkur_recits | 2 | ✅ |
| Randy Pausch | tafakkur_recits | 2 | ✅ |
| Maurice Bucaille | tafakkur_recits | 2 | ✅ |
| Oliver Sacks | tafakkur_recits | 2 | ✅ |
| Kurt Gödel | waqt_asr | 1 | ✅ (reformulé) |
| Stephen Hawking | tafakkur_recits | 7 | ✅ |
| Muhammad Ali | savais_tu, tafakkur_recits | 4 | ✅ |
| Malcolm X | savais_tu, tafakkur_recits | 7 | ✅ |
| Saladin | savais_tu, tafakkur_recits | 6 | ✅ |
| Leibniz | tafakkur_recits | 3 | ✅ |
| Darwin | savais_tu | 3 | ✅ |

Aucune incohérence factuelle entre fichiers.

---

## V9 — Typographie française

| Fichier | Guillemets typo | Guillemets droits | Tirets em | Apo courbes | Apo droites |
|---------|-----------------|-------------------|-----------|-------------|-------------|
| bab_an_nafs | 6 | 43 | 12 | 0 | 50 |
| compagnons | 99 | 5 536 | 1 527 | 99 | 5 557 |
| duaas | 18 | 4 732 | 1 679 | 18 | 5 332 |
| fiqh | 7 | 447 | 13 | 2 | 647 |
| hadiths_jour | 18 | 315 | 29 | 15 | 335 |
| prophetes | 97 | 4 074 | 579 | 85 | 4 143 |
| recits_coran | 154 | 449 | 176 | 0 | 452 |
| regard_versets | 92 | 528 | 127 | 0 | 529 |
| savais_tu | 658 | 1 079 | 84 | 83 | 1 228 |
| sira | 3 552 | 8 711 | 3 410 | 28 | 8 808 |
| tafakkur_final | 139 | 312 | 80 | 111 | 317 |
| tafakkur_recits | 1 555 | 4 470 | 1 058 | 57 | 4 585 |
| waqt_fajr | 84 | 7 | 40 | 68 | 8 |
| waqt_dhuhr | 95 | 0 | 29 | 77 | 0 |
| waqt_asr | 77 | 0 | 18 | 67 | 0 |
| waqt_maghrib | 141 | 83 | 128 | 132 | 98 |
| waqt_isha | 78 | 0 | 38 | 71 | 0 |

**Constat :** Waqt récents (dhuhr, asr, isha) : typographie française propre. Anciens fichiers : apostrophes droites majoritaires. Aucun double tiret -- détecté. Uniformisation possible mais non urgente.

---

## V10 — Synchronisation JSON ↔ DOCX

| JSON | DOCX miroir | Existe ? | À jour ? |
|------|-------------|----------|----------|
| data/bab-an-nafs.json | bab_an_nafs.docx | ✅ | ✅ |
| compagnons.json | compagnons.docx | ✅ | ✅ |
| duaas.json | duaas.docx | ✅ | ✅ |
| fiqh_jour.json | fiqh.docx | ✅ | ✅ |
| hadiths_jour.json | hadiths_jour.docx | ✅ | ✅ |
| prophetes.json | prophetes.docx | ✅ | ✅ |
| data/recits-coran.json | recits_coran.docx | ✅ | ✅ |
| data/regard-library.json | regard_versets.docx | ✅ | ✅ |
| savais_tu.json | savais_tu.docx | ✅ | ✅ |
| data/sira.min.json | sira.docx | ✅ | ✅ |
| data/waqt/tafakkur_final.json | tafakkur_questions.docx | ✅ | ✅ |
| data/waqt/tafakkur_recits.json | tafakkur_recits.docx | ✅ | ✅ |
| data/waqt/waqt_*.json | waqt_phrases.docx | ✅ | ✅ |

Tous les DOCX synchronisés.

---

## V11 — Inventaire des sources

### Versets coraniques : 573 références uniques

Sourates les plus citées : Al-Baqara (2), Âl ’Imrân (3), An-Nisâ’ (4), Al-Mâ’ida (5), Al-An’âm (6), Al-A’râf (7), At-Tawba (9), Yûnus (10), Hûd (11), Yûsuf (12), An-Nahl (16), Al-Isrâ’ (17), Al-Kahf (18), Tâ-Hâ (20), Al-Anbiyâ’ (21), Al-Hajj (22), Al-Mu’minûn (23), An-Nûr (24), Al-Furqân (25), Al-Ahzâb (33), Luqmân (31), Az-Zumar (39), Al-Hujurât (49).

### Hadiths : 865 références uniques

| Collection | Références |
|------------|------------|
| Bukhari | ~300 |
| Muslim | ~280 |
| Tirmidhi | ~120 |
| Abu Dawud | ~60 |
| Ibn Majah | ~40 |
| Ahmad/Musnad | ~30 |
| Autres | ~35 |

### Ouvrages classiques cités

Ibn Hishâm, Tabarî, Ibn Kathîr, Ibn Sa’d, Ibn Hajar, Sahih Bukhari/Muslim, Sunan, Siyar (Dhahabî), Nawawî, Qurtubî, Riyâd as-Sâlihin, Al-Muwatta’

### Noms divins (Asma’ al-Husna) cités dans les modules méditatifs

Ar-Rahmân, Ar-Rahîm, Al-Malik, Al-Quddus, As-Salâm, Al-Mu’min, Al-Muhaymin, Al-’Azîz, Al-Jabbâr, Al-Mutakabbir, Al-Khâliq, Al-Bâri’, Al-Musawwir, Al-Ghaffar, Al-Wahhâb, Ar-Razzâq, Al-’Alîm, As-Samî’, Al-Khabîr, Al-Wadûd, Al-Haqq, Al-Wakîl, Al-Hayy, Al-Qayyûm, Al-Ahad, As-Samad, Al-Muqaddim, Al-Wârith, Al-Hâdî, Al-Badî’, As-Sabûr, Al-Mughnî, Al-’Afuww, Al-Barr

---

## V12 — Chiffres et statistiques

| Chiffre | Contexte | Fichiers | Source | À vérifier ? |
|---------|----------|---------|--------|------------|
| 117 milliards | humains depuis Adam | tafakkur_recits | Paléodémographes | oui |
| 37 000 milliards | cellules du corps | tafakkur_final, tafakkur_recits, waqt_asr | Biologie | non (consensus) |
| 8 milliards | humains actuels | tafakkur_final, tafakkur_recits, waqt_asr, waqt_maghrib | Démographie | non |
| 2 200 hadiths | transmis par Aïcha | compagnons | Tradition sunnite | oui (1 200-2 210) |
| 70% | corps = eau | tafakkur_recits, waqt_dhuhr | Biologie | non |
| 1 400 ans | ancienneté Coran | tafakkur_recits, waqt_fajr, waqt_dhuhr | Chronologie | non |

Les chiffres problématiques (10^164, 365 fois, 10^85 000) ont été retirés/reformulés lors de l’audit waqt_phrases.

---

## Recommandations

1. **Translittération Allah / Allâh** : décision d’uniformisation à prendre avant Play Store. 10 fichiers « Allah », 5 fichiers « Allâh », 1 fichier « Allāh ».
2. **Typographie française** : waqt récents propres, anciens fichiers en apostrophes droites. Uniformisation possible mais non urgente.
3. **Variantes noms propres** : Abu Bakr / Abû Bakr, Umar / Omar, Khadija / Khadîja, Bilal / Bilâl — choix éditorial à trancher si souhaité.
4. **Doublons tafakkur_final / tafakkur_recits** : structurels et attendus.
5. **Tous les DOCX synchronisés** avec leurs JSON sources.
6. **Zéro bug d’intégrité restant** : 0 

, 0 caractères de contrôle, 0 BOM, 0 doublons ID.
