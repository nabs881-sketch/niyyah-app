# SPEC-WAQT-ISHA-1

## Cible
`data/waqt/waqt_isha.json` — audit complet : 3 versets (tous justes : Ayat al-Kursî 2:255, défi 2:23, 3:185)
+ ~38 hadiths (**quasi tous authentiques** : côté droit, du'â réveil/sommeil, éteindre le feu, couvrir les plats,
dépoussiérer le lit ×3, tasbîh 33/33/34, du'â contre les 8 maux, Firdaws, etc.).
**1 correction (hedge)** + 1 note. FR uniquement. ⚠️ `npm run build` avant commit.

> Pas d'`id` dans ce fichier — repère par l'**ancre** (texte unique).

---

## Correction — ancre « sauvé un Prophète grâce à une araignée »

L'histoire de l'araignée tissant sa toile à l'entrée de la grotte (Thawr, lors de l'Hégire) repose sur des
**narrations faibles (da'îf)**. La présenter comme un fait établi heurte la règle « zéro da'îf ». On garde l'image
(belle et connue) mais on l'attribue honnêtement à « une tradition rapportée ».

REMPLACER le `fr` PAR :
```
Sous ton lit, il y a peut-être une araignée. Elle file sa toile. Une tradition rapporte qu'au moment de l'Hégire, une araignée tissa sa toile à l'entrée de la grotte où se cachait le Prophète ﷺ. Aucune créature n'est petite aux yeux d'Allâh.
```

---

## Note (à confirmer par l'imam — pas un correctif imposé)
- Ancre « Heureux celui qui trouve dans son livre beaucoup de demandes de pardon » : hadith d'Ibn Mâja
  au **grading contesté** (da'îf pour certains, hasan par recoupement). Acceptable mais à valider.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "waqt isha: hedge narration faible araignee/grotte (tradition rapportee)"
git push
```
