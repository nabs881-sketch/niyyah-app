# SPEC-WAQT-DHUHR-4

## Cible
`data/waqt/waqt_dhuhr.json` → items **DHUHR-SECRETS-003**, **DHUHR-SECRETS-017**, **DHUHR-PARENTS-033**.
⚠️ JSON caché par le SW → `npm run build` avant commit. FR uniquement.

---

## A. DHUHR-SECRETS-003 — corriger les numéros (champ `source`)

**Raison** : le hadith « qui couvre un musulman, Allâh le couvre » est en réalité **al-Bukhârî n° 2442**
et **Muslim n° 2580** (vérifié sunnah.com). Les numéros cités (Bukhârî 6069 = hadith du *mujâhir* ;
Muslim 2581 = hadith du *muflis*) sont **deux autres hadiths**.

CHERCHER :
```
Hadith rapporté par al-Bukhârî (Sahih, n° 6069) et Muslim (Sahih, n° 2581) selon Ibn ʿUmar
```
REMPLACER PAR :
```
Hadith rapporté par al-Bukhârî (Sahih, n° 2442) et Muslim (Sahih, n° 2580) selon Ibn ʿUmar
```

---

## B. DHUHR-SECRETS-017 — corriger le numéro (champ `source`)

**Raison** : le texte est le **hadith de Mâ'iz ibn Mâlik** (l'homme qui confesse le zinâ, le Prophète ﷺ
détourne le visage). Le n° cité **Muslim 2734** est un autre hadith (« al-hamdulillâh après manger »).

CHERCHER :
```
Récit basé sur l'épisode du Bédouin qui vient se confesser au Prophète ﷺ d'un péché. Sahih Muslim (Sahih, n° 2734) et autres.
```
REMPLACER PAR :
```
Récit basé sur le hadith de Mâ'iz ibn Mâlik (al-Bukhârî et Muslim, Kitâb al-Hudûd ; Muslim n° 1695) : l'homme qui confesse le zinâ et à qui le Prophète ﷺ détourne le visage à plusieurs reprises. À confirmer par l'imam.
```

---

## C. DHUHR-PARENTS-033 — REMPLACEMENT COMPLET

**Raison** : tout l'item repose sur « un regard tendre = un hajj accepté », narration **fabriquée**
(chaîne avec Nahshal ibn Saʿîd, accusé de mensonge ; déclarée fabriquée par al-Albânî ; absente des Sahîh).
On remplace par un hadith **authentique** de même thème (l'immense portée du respect des parents).

Dans l'item d'`id` **DHUHR-PARENTS-033**, remplacer les 4 champs :

- `titre` →
```
Le parent, porte du Paradis
```
- `source` →
```
Hadith authentique rapporté par at-Tirmidhî (n° 1900) et Ibn Mâja (n° 3663) selon Abû ad-Dardâ', authentifié par al-Albânî. Remplace une narration répandue (« un regard tendre = un hajj accepté ») déclarée fabriquée par les muhaddithûn (chaîne avec un rapporteur accusé de mensonge). À confirmer par l'imam.
```
- `texte` →
```
Abû ad-Dardâ' (qu'Allâh l'agrée) rapporte que le Messager d'Allâh ﷺ a dit, en parlant des parents : « Le parent est la meilleure des portes du Paradis. À toi, donc, de préserver cette porte ou de la négliger. »

Arrête-toi sur l'image. Le Paradis a des portes. Et l'une d'elles — l'une des meilleures — n'est ni un acte d'adoration lointain, ni un exploit héroïque. C'est un être qui vit, souvent, à quelques mètres de toi : ton père, ta mère.

Servir tes parents, les honorer, adoucir ta voix devant eux, ne pas leur dire « uff » — c'est, littéralement, tenir ouverte une porte du Paradis.

Et la négliger — les blesser, les ignorer, attendre avec impatience qu'ils finissent de parler — c'est la refermer de tes propres mains.

Tu n'as pas besoin de partir loin. La porte est là. À portée de regard, à portée de voix, à portée de main.
```
- `morale` →
```
Cet après-midi, si tu vois ton père ou ta mère — au téléphone, à table, dans le salon — souviens-toi que tu es devant une porte du Paradis. Adoucis ta voix. Pose ton téléphone. Écoute sans couper. Demande-leur s'ils ont besoin de quelque chose. Tu n'auras pas voyagé à l'autre bout du monde — mais tu auras, par ce geste simple, tenu ouverte la meilleure des portes.
```

## Build
```
npm run build
git add -A && git commit -m "waqt dhuhr: corrige n° SECRETS-003/017, remplace PARENTS-033 (fabrique) par Tirmidhi 1900"
git push
```
