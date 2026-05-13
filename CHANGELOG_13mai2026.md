# CHANGELOG — 13 mai 2026

## v1195-stable (HEAD)

### feat(dispatcher)
- Hiérarchie globale des 8 déclencheurs UI spontanés (un seul par session)
- Ordre : Tawba → Muhasaba → Level → Ramadan → Eid → Bilan → Regarde → Hijri
- 8 fonctions modifiées pour retourner true/false
- `triggerSpontaneousUI()` remplace les 4 appels individuels au boot

### feat(greeting_day_4)
- Ajout références coraniques précises sur les 14 versets du jeudi
- Format : « verset » — Sourate N:V (validation scholar possible)

### fix(export)
- `niyyahExportData()` scanne désormais TOUT localStorage
- Liste noire technique : sw_*, cache_*, tmp_*, _dev_*, splash_shown, last_visit, tawba_force
- Couvre désormais : sira_start_date, cure_colere, muhasaba_*, hijri_*, colere_*, filjour_*

### fix(tafakkur)
- Rendu \n\n via innerHTML pour les 99 Noms d'Allâh (question + translittération sur 2 lignes)

## Audits réalisés (pas de commit)

### 12 mécanismes UI spontanés identifiés
1. checkTawba — absence ≥2j → overlay Tawba
2. checkRegardeAlert — 30% chance, 1x/jour, 9h-21h → modale Regard
3. checkHijriBanner — date hijri → bandeau Sanctuaire (14 événements)
4. checkWeeklyBilan — lundi matin → overlay bilan hebdomadaire
5. checkLevelCompletion → showLevelPopup confetti
6. showWirdCompleteOverlay — 8/8 wird → modale taqabbal
7. showRamadanBoostModal — activation Ramadan → modale intensifier
8. showEidModal — fin Ramadan → modale Eid
9. updateFinJourneeCard — Maghrib+1h à Fajr → carte "Quand vient la nuit"
10. _checkMuhasabaInvite — épisode colère ≥15min → bandeau Muhasaba
11. scheduleAllNotifications — boot → 4-5 notifs push planifiées
12. checkMidnightReset — changement de jour → reset state

### 5 notifications push
1. Fajr +15min — pool MURMURES (matin)
2. 12h30 ±12min — pool MURMURES (midi) via getMurmureAdaptatif
3. 17h00 ±12min — pool MURMURES (midi)
4. Maghrib +10min — pool MURMURES (soir)
5. Mode silencieux (absence ≥5j) — 1 seule à 20h

### Onboarding notifications
- 3 toggles : Murmures / Rituels / Encouragements
- Système sous-jacent unique : pool MURMURES (45 phrases)
- Les 3 catégories sont des labels UX, pas 3 systèmes séparés

### Pools de contenu (état final v1195)
- WAQT_CATALOG : 263 phrases (5 plages)
- MEDIT_PHRASES (Tafakkur FR) : 256 phrases (dont 99 Noms)
- TAWBA_MESSAGES : 20 messages
- MURMURES : 45 phrases (5 intentions × 3 moments × 3)
- greeting_day : 100 phrases (7 jours × 14-16)
- SAVAIS_TU : 198 faits
- HADITHS_DB : 61 hadiths (6 pools par streak)
- NIYYAH_V2_LIBRARY : 84 intentions (7 catégories × 12)
- WIRD_DATA : 16 adhkar (8 matin + 8 soir)
- Sîra : 30 rendez-vous
- regard-library.json : 128 versets (16 catégories)

### 39 features auditées
- Liste complète des features en prod documentée
- Inventaire éditorial exhaustif (15 pools, exports_validation/)

### À traiter (backlog)
- Confetti : animation existante mais non auditée en détail
- MEDIT_PHRASES_EN (97) et _AR (97) désynchronisées de FR (256)
- Traduction greeting_day EN/AR (actuellement strings simples, pas tableaux)
- Scanner Regard : Worker v2.7.0 à déployer sur Cloudflare
