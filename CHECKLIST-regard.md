# CHECKLIST — Cure Regard, corrections à pousser (audit complet J1→J7)

Coche au fur et à mesure de tes push. ✅ = déjà appliqué.

## J2 — At-Tawba (7, en attente)
- [ ] SPEC-J2-VERSET — condition de la tawba sur 39:53
- [ ] SPEC-J2-SAGESSE — hadith joie/repentir (afrah) + œuvre
- [ ] SPEC-J2-INTRO — définition de la tawba (« retour »)
- [ ] SPEC-J2-OUTIL-TAWBA — 3 conditions classiques (pas 4)
- [ ] ⚠️ SPEC-J2-DHIKR — retrait du contresens Coran 9:80
- [ ] SPEC-J2-SALAT — sourates en recommandation, pas impératif
- [ ] ⚠️ SPEC-J2-MURMURE — « Allah se réjouit de ton retour »

## J3 — Al-Hijâb al-Bâtin
- [x] SPEC-J3-OUTIL1-DESIGN — ✅ APPLIQUÉ (commit f6e982a)
- [ ] SPEC-J3-OUTIL1-POLICE — tailles de police (à appliquer APRÈS DESIGN)
- [ ] SPEC-J3-VERSET — « même commandement » (pas « symétrie totale »)
- [ ] SPEC-J3-OUTIL1 — « dans l'esprit d'Ibn 'Atâ'illâh »
- [ ] SPEC-J3-OUTIL1-CONSIGNE — consigne type-puis-tap
- [ ] SPEC-J3-OUTIL2 — al-Ghazâlî non verbatim + Tirmidhî 2165
- [ ] ⚠️ SPEC-J3-OUTIL3 — correction du contresens Ibn al-Qayyim
- [ ] ⚠️⚠️ SPEC-J3-WUDU — suppression du'â arabe composé + reformulation

## J4 — Ghadd al-Basar (3, en attente)
- [ ] SPEC-J4-SAGESSE — « rendu libre » (Ibn al-Qayyim)
- [ ] SPEC-J4-OUTIL1 — terme *ghadd* (au lieu de *kazm*)
- [ ] SPEC-J4-CORPOREL — formulations honnêtes (stimulus control)

## J5 — At-Tahsîn (3, en attente)
- [ ] SPEC-J5-SAGESSE — « rendu libre » (al-Fawâ'id)
- [ ] SPEC-J5-OUTIL1 — al-Ghazâlî non verbatim + Riyâdat an-Nafs
- [ ] SPEC-J5-CORPOREL — formulation prudente du sport

## J6 — Al-Murâqaba (4, en attente)
- [ ] J6 sagesse — prompt direct : « rendu libre » (al-Muhâsibî)
- [ ] SPEC-J6-OUTIL1 — arabe composé → français (renderer + JSON)
- [ ] J6 outil2 — prompt direct : titre « Murâqaba et Muhâsaba (Ihyâ' 38) »
- [ ] SPEC-J6-BLOC4 — dhikr arabe composé → français

## J7 — Al-Istiqâma
- [x] AUCUNE correction — entièrement propre ✅

---
**Rappel build** : chaque push touchant script.js / JSON → `npm run build` avant commit (régénère min + bump SW).
**Prioritaires (⚠️)** : J2-DHIKR, J2-MURMURE, J3-OUTIL3, J3-WUDU — ce sont les corrections de fond les plus importantes.
