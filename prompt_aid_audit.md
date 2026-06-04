Lis `audit_aid_v1.md` puis modifie `data/events/aid_module_complet.json`.

Applique TOUTES les corrections section par section :

**Section A** (Hadiths — numéros + 2 da'îf à nuancer)
- Ajouter les 21 numéros canoniques du tableau F
- Reformuler A20 (Zakât al-Fitr "affranchissez de mendier") : marquer "rapporté par Dâraqutnî et Bayhaqî, chaîne contestée"
- Reformuler A25 (meilleur des du'âs = Arafat) : marquer "Tirmidhî 3585, chaîne contestée"

**Section B** (Aqîda — anthropomorphismes)
Reformuler chaque drapeau B1 à B9 selon les versions proposées dans le doc. Vérifier d'abord si v4 a déjà appliqué — si oui, ne pas re-modifier.

**Section C** (Réductionnisme)
- C1 : "Pour découvrir ta propre force" → "Pour Allâh (hadith qudsi Bukhari 1894)"
- C3 : vérifier que "Si rien n'a changé en toi..." a été corrigé en v4

**Section D** (Fiqh)
- D4, D5, D6, D7 : ajouter numéros hadiths précis
- Vérifier D1, D2, D3 déjà corrigés en v4

**Section G** (Israeliyyât — DRAPEAU MAJEUR)
- A1 (couteau qui ne coupe pas) : marquer comme glose exégétique d'Ibn Kathîr/Tabarî, pas comme fait scripturaire
- A2 (Iblîs 3 fois) : marquer "Selon Tabarî et al-Hâkim..."
- A3 (bélier du Paradis) : retirer "du Paradis", utiliser "dhibh 'azîm" du Coran

**Section H** (Vérif post-v4)
Vérifier que les 9 corrections listées sont bien dans le JSON actuel. Si manquantes, les appliquer.

**Règles strictes :**
- Ne touche QUE les passages listés
- Garde structure JSON intacte
- Pour chaque hadith : ajoute n° canonique précis dans champ source
- Pour les Israeliyyât : marquer explicitement "Selon Ibn Kathîr / Tabarî" ou "exégèse"
- Commit après chaque section (A, B, C, D, G, H) avec message clair
- Push final : `audit aid v6 — relecture 'ulamâ stricte (~25 corrections + Israeliyyât marqués)`

Vas-y.
