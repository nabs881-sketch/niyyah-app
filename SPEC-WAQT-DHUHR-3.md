# SPEC-WAQT-DHUHR-3

## Cible
`data/waqt/waqt_dhuhr.json` → catégorie `offense` → items **DHUHR-OFFENSE-002** et **DHUHR-OFFENSE-012**.
⚠️ JSON caché par le SW → `npm run build` avant commit. FR uniquement.

---

## A. DHUHR-OFFENSE-002 — REMPLACEMENT COMPLET

**Raison** : le texte raconte « la vieille femme juive qui jetait des ordures » — histoire **fabriquée**,
sans chaîne, **absente de Bukhari/Muslim** (vérifié : déclarée sans fondement par les muhaddithûn).
Or la `source` prétend faussement « Bukhari, Muslim ». On remplace par un épisode **authentique**
de même thème (la mansuétude du Prophète ﷺ face à l'offense personnelle).

Dans l'item d'`id` **DHUHR-OFFENSE-002**, remplacer les 4 champs :

- `titre` →
```
Le jour de Tâ'if
```
- `source` →
```
Hadith authentique rapporté par al-Bukhârî (n° 3231) et Muslim (n° 1795) selon ʿÂ'isha (qu'Allâh l'agrée) : l'épisode de Tâ'if et l'ange des montagnes. Remplace une histoire répandue (la femme qui jetait des ordures) dont la chaîne n'est pas établie et qui ne figure dans aucun recueil authentique. À confirmer par l'imam.
```
- `texte` →
```
ʿÂ'isha (qu'Allâh l'agrée) demanda un jour au Messager d'Allâh ﷺ s'il avait connu un jour plus dur que celui d'Uhud. Il répondit que le plus dur fut le jour de Tâ'if.

Parti chercher du soutien auprès de la tribu de Thaqîf, il n'avait reçu que rejet et moqueries. On avait lancé contre lui les vauriens et les enfants, qui le poursuivirent à coups de pierres jusqu'à ce que ses talons saignent.

Accablé, il s'éloigna. C'est alors que l'ange Jibrîl l'appela, accompagné de l'ange des montagnes. Celui-ci lui proposa : si tu le veux, je referme sur eux les deux montagnes qui bordent la ville.

Le Prophète ﷺ — qui aurait pu, d'un mot, les anéantir — refusa. Et il dit : « Plutôt, j'espère qu'Allâh fera sortir de leurs descendants ceux qui L'adoreront, Lui seul, sans rien Lui associer. »
```
- `morale` →
```
L'homme le plus grand qui ait marché sur terre pouvait, d'un seul mot, écraser ceux qui l'avaient fait saigner. Il a choisi l'espoir plutôt que la vengeance. Quand l'offense te brûle, souviens-toi : la vraie force, c'est de retenir la main qui pourrait frapper.
```

---

## B. DHUHR-OFFENSE-012 — REFORMULATION DE LA SOURCE

**Raison** : l'anecdote « ʿAlî et l'homme qui cracha » n'a **aucune chaîne établie** dans les sources
sunnites ; sa forme célèbre vient du **Mathnawî de Rûmî** et de sources non sunnites (vérifié). Le texte
l'attribue à « Khaybar » comme un fait. On garde le récit comme **sagesse** mais on corrige la source.

Dans l'item d'`id` **DHUHR-OFFENSE-012**, remplacer le champ `source` par :
```
Récit de sagesse à très large diffusion, dont la forme célèbre figure dans le Mathnawî de Rûmî et des sources non sunnites ; sa chaîne n'est pas établie dans les recueils sunnites. Le principe — ne pas riposter sous l'effet de la colère personnelle — est, lui, confirmé par des hadiths sahih (ex. al-Bukhârî n° 6114 : « le fort est celui qui se maîtrise dans la colère »). À présenter comme sagesse, non comme fait historique certifié. À confirmer par l'imam.
```
Et dans le `texte`, remplacer :
```
Lors d'une bataille — selon plusieurs sources, Khaybar — il combattait un guerrier ennemi.
```
par :
```
Une tradition rapporte que, lors d'un combat, il affrontait un guerrier ennemi.
```

## Build
```
npm run build
git add -A && git commit -m "waqt dhuhr: remplace OFFENSE-002 (fabrique) par Taif/Bukhari 3231, reforme source OFFENSE-012 (Rumi)"
git push
```
