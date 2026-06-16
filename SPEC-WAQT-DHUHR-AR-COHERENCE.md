# SPEC-WAQT-DHUHR-AR-COHERENCE (findings — corrections AR à valider arabophone)

## Cible
`data/waqt/waqt_dhuhr.json` — 30 premières phrases. ⚠️ JSON caché par le SW → `npm run build` avant commit.

## Constat global
- **Le FR des 30 premières Dhuhr est propre** : hadiths et versets justes
  (tiers de l'estomac [17] = hadith Miqdâm hasan ; manger ensemble [16] = gist correct ;
  Coran 25:53 [20] et 21:30 [21] = exacts et présentés avec prudence i'jâz ; pudeur du
  bâillement [10] = Bukhârî 6226 / Muslim 2994).
- **La couche ARABE a dérivé** : 17/30 ont un `ar`, et plusieurs ne correspondent PAS au
  FR (cadrage temporel « ce matin »/« le soir » alors qu'on est à midi). L'AR semble être
  un brouillon antérieur non resynchronisé.

⚠️ **Toute modification de l'arabe ci-dessous doit être validée par un arabophone /
l'imam avant commit** (contrainte « zéro arabe fabriqué »). Les propositions sont des
points de départ, pas du définitif.

---

## PRIORITÉ — [10] AR contredit un hadith sahih

FR : « …le Prophète ﷺ a dit : "Couvre-toi quand tu bâilles." Une pudeur jusque dans la fatigue. »
AR actuel : `تَثاءَبْ دُونَ خَجَل. جَسَدُكَ يَطْلُبُ التَّباطُؤ — أَطِعْه، هذا شُكْر.`
= « Bâille SANS gêne. Ton corps demande à ralentir — obéis-lui, c'est de la gratitude. »

→ L'AR **inverse l'adab** : le bâillement est de Shayṭân, à réprimer / couvrir la bouche
(Bukhârî 6226, Muslim 2994 ; « إذا تثاءب أحدكم فليمسك بيده على فيه »).
L'AR doit suivre le FR + le hadith.

Proposition (À VALIDER ARABOPHONE) :
`إِذا تَثاءَبْتَ فَأَمْسِكْ بِيَدِكَ عَلى فيك، كما عَلَّمَ النَّبِيُّ ﷺ. حَياءٌ حَتّى في التَّعَب.`

---

## Dérives FR↔AR à resynchroniser (À VALIDER ARABOPHONE)

- **[6]** FR « …Ta patience pour cet **après-midi** » / AR dit `لِهذا المَساء` = « pour ce **soir** ».
  → corriger « المَساء » (soir) en « بَعدَ الظُّهر » / « ظَهيرَتي » (après-midi/midi).

- **[14]** FR se termine par « Dis : **Allâhu Nûr as-samâwâti wal-arḍ** » (Coran 24:35) ;
  l'AR **omet** ce dhikr. → ajouter `اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ` (texte coranique 24:35, vérifiable).

- **[4]** FR conditionnel « s'il reste un agacement… » / AR affirmatif « أَغْضَبَكَ أَحَدٌ هذا الصَّباح »
  (« quelqu'un t'a mis en colère ce matin »). → aligner le cadrage (midi, pas « ce matin »).

- **[15]** même schéma : FR général / AR « حاسَبْتَ نَفْسَكَ… هذا الصَّباح » (« ce matin »). → aligner.

---

## Recommandation (plus important que les spot-fixes)
La dérive n'est probablement pas limitée à ces 30 phrases. **Avant lancement, faire une
passe complète de cohérence FR↔AR par un arabophone** sur tout le corpus à champ `ar`
(Dhuhr, ʿAsr, Maghrib, Isha). Tant que ce n'est pas fait, envisager de **vider les `ar`
incohérents** plutôt que de publier un arabe qui contredit le français (cf. [10]).

## Ne PAS toucher
- Le FR des 30 phrases (audité, conforme).
- Les `ar` vides ([18]–[30]) — pas de fabrication à ajouter sans validation.

## Build (si corrections AR validées appliquées)
```
npm run build
git add -A && git commit -m "waqt dhuhr: corrige AR bâillement (contredisait hadith) + resync FR/AR (valide arabophone)"
git push
```
