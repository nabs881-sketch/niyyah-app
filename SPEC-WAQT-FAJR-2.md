# SPEC-WAQT-FAJR-2

## Cible
`data/waqt/waqt_fajr.json` — audit complet : 17 versets (tous justes) + ~80 hadiths cités.
Le corpus est **rigoureux** (gradings précis, hedges honnêtes). **2 corrections** + notes.
FR uniquement. ⚠️ `npm run build` avant commit (JSON caché par SW).

> Repère par `id`. Apostrophes typographiques du fichier à respecter.

---

## Correction 1 — `FAJR_098` : hadith FAIBLE/FABRIQUÉ à remplacer

« Mes compagnons sont comme les étoiles » (*ashâbî kan-nujûm*) est jugé **da'îf par la majorité
et mawdûʿ (fabriqué) par beaucoup** (Ahmad : « pas authentique » ; Ibn ʿAbd al-Barr : isnâd sans
valeur ; al-Albânî : très faible). Attribuer ce wording au Prophète viole la règle « zéro da'îf ».
→ Remplacé par un hadith **sahîh** sur les Compagnons (Bukhari & Muslim), même fonction (mentor).

REMPLACER le `fr` PAR :
```
Le Prophète ﷺ a dit : « Les meilleurs des hommes sont ceux de ma génération [les Compagnons], puis ceux qui les suivent. » (Bukhari & Muslim) Aujourd'hui, choisis un Compagnon comme MENTOR de ta journée. (à confirmer par l'imam)
```

---

## Correction 2 — `FAJR_224` : erreur sur le tiers du Coran

Le hadith (Bukhari) dit qu'Al-Ikhlâs **une fois** équivaut à un tiers du Coran — donc **3 fois = le
Coran entier**. L'app écrit « 3 fois = un tiers », ce qui est faux.

REMPLACER le `fr` PAR :
```
Vise une lecture aujourd'hui : sourate Al-Ikhlâs une fois équivaut à un tiers du Coran (Bukhari). Récite-la 3 fois et c'est, en récompense, comme tout le Coran. En une minute, un cadeau divin — sans remplacer la lecture complète.
```

---

## Notes (à confirmer par l'imam — pas des corrections imposées)
- **`FAJR_306` et `FAJR_363`** (« l'intelligent / le sage est celui qui se prépare pour l'après-mort »,
  *al-kayyis man dâna nafsah*) : Tirmidhî l'a jugé **hasan**, mais al-Albânî l'a jugé **da'îf**.
  #363 est déjà hedgé (« sens du hadith ») ; #306 l'affirme directement → ajouter un hedge ou valider.
- **`FAJR_382`** (« se couper les ongles / purification le vendredi ») : pratique tirée de narrations
  **faibles** ; déjà hedgé « plusieurs voies ». OK si tu gardes le hedge.
- Les ~75 autres hadiths vérifiés sont **authentiques et bien sourcés** (intentions, 27×, jeûne=70 ans,
  100× tahlîl, Adab al-Mufrad hasan, du'â du matin, etc.). La **validation imam reste le filtre final**.

## Versets Fajr : tous corrects
Du'â du voyage 43:13, anges Raqîb/ʿAtîd 50:18, âme rendue au réveil 39:42, médisance=chair du frère 49:12,
2:286, 6:68, aube 89:1. Aucune correction.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "waqt fajr: remplace hadith faible ashabi kan-nujum (098) + corrige tiers du Coran Ikhlas (224)"
git push
```
