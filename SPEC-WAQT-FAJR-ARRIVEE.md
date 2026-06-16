# SPEC-WAQT-FAJR-ARRIVEE

## Cible
`data/waqt/waqt_fajr.json` — phrases `FAJR_200` et `FAJR_410` (catégorie FAJR-ARRIVÉE).
⚠️ `waqt_fajr.json` est mis en cache par le service worker → `npm run build` AVANT commit.

---

## Correction 1 — FAJR_200 (hadith « fî dhimmatillâh »)

Le hadith de Muslim (Jundub) dit : « celui qui prie le Subh est sous la protection
d'Allah » — SANS « jusqu'au soir ». Le « jusqu'au soir » appartient à un autre hadith
(dhikr des 10× lâ ilâha illâ Allah, An-Nasâ'î). À retirer.

CHERCHER :
```
Tu viens de prier Fajr. Le Prophète ﷺ a dit que celui qui prie Fajr est sous la protection d'Allah jusqu'au soir (Muslim). Sors confiant.
```
REMPLACER PAR :
```
Tu viens de prier Fajr. Le Prophète ﷺ a dit que celui qui prie le Subh est sous la protection d'Allah (Muslim). Sors confiant.
```

---

## Correction 2 — FAJR_410 (récompense non sourcée)

« un duʿâ au réveil qui efface les péchés (sens des hadiths) » : aucune base claire
pour un duʿâ du réveil « qui efface les péchés ». Le hedge « (sens des hadiths) » ne
suffit pas. Reformuler en vrai et sans récompense attribuée à tort.

CHERCHER :
```
Le Prophète ﷺ a enseigné un du'â au réveil qui efface les péchés (sens des hadiths). Aujourd'hui, accepte ce pardon. Ne traîne pas hier. C'est une page nouvelle.
```
REMPLACER PAR :
```
Le réveil est une page neuve : le Prophète ﷺ enseignait à ouvrir le jour par le rappel d'Allah et l'istighfâr. Aujourd'hui, ne traîne pas hier. Tourne-toi vers Lui, et avance.
```

---

## Ne PAS toucher
- Les autres phrases FAJR-ARRIVÉE (auditées, conformes) : duʿâ du matin
  « bénis ma communauté dans ses matins » (FAJR_366, Tirmidhî/Abû Dâwûd, hasan),
  duʿâ du réveil al-ḥamdu lillâh alladhî aḥyânâ (FAJR_403, Bukhârî), serment par
  l'aube 89:1 (FAJR_407/413).

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "waqt fajr: FAJR-ARRIVEE corrige hadith protection (sans jusqu'au soir) + retire recompense non sourcee"
git push
```
