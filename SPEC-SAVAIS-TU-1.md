# SPEC-SAVAIS-TU-1

## Cible
`savais_tu.json` (racine) → fiches **335**, **336**, **337** (index = numéro de fiche).
ℹ️ `savais_tu.json` n'est PAS dans le précache du service worker (chargé via `fetch` runtime) →
**pas de `npm run build`, pas de bump SW** (comme les audits Savais-Tu précédents). Commit direct.
Si un miroir `ECRITS_NIYYAH/savais_tu.docx` existe, l'aligner aussi (optionnel).

---

## Fiche 335 — hadith faible + mauvais numéro
Le hadith « le jeûne est une moitié de la patience » est **da'îf** (Tirmidhî 3519) et le n° 2517 cité
est un autre hadith (« attache ta chamelle »). On remplace par un hadith **sahîh** sur le jeûne.

- `source` : `Tirmidhi 2517 / Comité Nobel 2016 — autophagie Ohsumi`
  → `Bukhari 1894 / Muslim 1151 (« le jeûne est un bouclier ») / Comité Nobel 2016 — autophagie Ohsumi`
- `texte` : remplacer le début
  `Le Prophète ﷺ a dit : « Le jeûne est une moitié de la patience. Et la patience est une moitié de la foi. » La science moderne le confirme. Le jeûne intermittent`
  → `Le Prophète ﷺ a dit : « Le jeûne est un bouclier. » La science moderne en révèle une dimension insoupçonnée : le jeûne intermittent`
  (le reste de la fiche est inchangé.)

---

## Fiche 336 — fausse attribution au Prophète
« L'estomac est la maison des maladies » n'est **pas un hadith** : c'est une maxime du médecin arabe
**al-Hârith ibn Kalada** (vérifié). On retire l'attribution prophétique.

- `source` : `Mishkat al-Masabih / Médecine prophétique classique`
  → `Maxime du médecin al-Hârith ibn Kalada (m. ~13H) — PAS un hadith prophétique. Hadith authentique de même sens : Tirmidhî 2380 (hasan).`
- `texte` : remplacer le début
  `Le Prophète ﷺ a dit : « L'estomac est la maison de toutes les maladies. La modération est la mère de tous les remèdes. » Aucun médicament`
  → `Le médecin arabe al-Hârith ibn Kalada, contemporain du Prophète ﷺ, disait : « L'estomac est la maison de toutes les maladies, et la modération est la mère de tous les remèdes. » Ce n'est pas un hadith — mais le Prophète ﷺ a dit, lui, dans un hadith authentique : « Nul n'a jamais rempli de récipient pire que son estomac. » Aucun médicament`
  (le reste est inchangé.)

---

## Fiche 337 — mauvais numéro
Le hadith de la peste/quarantaine est authentique mais cité « Tirmidhî 2380 » (= le hadith de l'estomac).
Vrai numéro : **Bukhari 5728 / Muslim 2218**. Texte inchangé.

- `source` : `Tirmidhî 2380 (hasan)` → `Bukhari 5728 / Muslim 2218`

---

## Commit
```
git add savais_tu.json && git commit -m "savais-tu: corrige 335 (hadith faible), 336 (al-Harith ibn Kalada pas hadith), 337 (n peste)"
git push
```
