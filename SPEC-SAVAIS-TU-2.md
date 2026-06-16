# SPEC-SAVAIS-TU-2

## Cible
`savais_tu.json` (racine) → fiche **225** (catégorie Sciences).
ℹ️ Pas dans le précache SW → **pas de build, pas de bump SW**. Commit direct.

## Problème
La fiche dit : « Al-Razi a écrit un livre de cosmétique… *Kitab al-Asrar* – le Livre des Secrets…
le premier manuel de cosmétique de l'histoire. » **Faux** : le *Kitab al-Asrar* d'al-Râzî est son
**traité d'alchimie / chimie de laboratoire** (vérifié), pas un livre de cosmétique. De plus, « premier
manuel de l'histoire » est exagéré (l'Égypte et la Grèce antiques avaient déjà des textes cosmétiques).
Le véritable pionnier d'un chapitre cosmétique systématique est **al-Zahrâwî** (Abulcasis), dans son
*Kitab al-Tasrîf*.

## Correction
- `source` : `Britannica 'Al-Razi' / history of cosmetics`
  → `Al-Zahrâwî, Kitab al-Tasrîf (livre 19, « al-zîna ») — histoire de la cosmétique médiévale`
- `texte` : remplacer **tout** le texte de la fiche par :
```
Au 10ᵉ siècle à Cordoue, le médecin al-Zahrâwî (Abulcasis) consacre tout un chapitre de son encyclopédie médicale, le Kitab al-Tasrîf, aux soins du corps : parfums, teintures pour cheveux, soins de la peau, pâtes dentifrices. Il range la cosmétique dans la médecine — la « médecine de la beauté ». L'un des plus anciens traités systématiques de cosmétique, repris pendant des siècles en Europe.
```

## Commit
```
git add savais_tu.json && git commit -m "savais-tu: corrige fiche 225 (Kitab al-Asrar = alchimie, cosmetique = al-Zahrawi/al-Tasrif)"
git push
```
