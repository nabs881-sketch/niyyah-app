# SPEC-WAQT-SERVING-FIX

## Problème
Le service du contenu quotidien calcule l'index avec `dayOfYear` (1→365, **remis à zéro chaque 1er janvier**) :
```
var dayOfYear = ... ;            // 1..365, RAZ annuelle
... [dayOfYear % pool.length]    // ou (dayOfYear + hash) % length
```
Comme `dayOfYear` plafonne à 365 et repart identique chaque année, **tout pool > 365 a une fenêtre figée
de 366 items ; le surplus n'est JAMAIS affiché**. Mesuré :

| Pool | Taille | Jamais vues |
|---|---|---|
| Fajr (waqt) | 461 | **95** |
| Isha (waqt) | 380 | **14** |
| **Savais-Tu** | 480 | **114** |
| Ghidaa 80 / Tibb 41 / Fiqh 180 / Hadiths 180 | ≤365 | 0 (ok) |

→ **223 items écrits mais invisibles.**

## Fix (1 remplacement global)
Remplacer `dayOfYear` par un **compteur de jours continu** (jours depuis 1970, jamais remis à zéro).
La ligne de calcul est **identique aux 6 endroits** (waqt + Ghidaa + Tibb + Fiqh + Hadiths + Savais-Tu),
donc un seul find/replace global suffit. On **garde le nom `dayOfYear`** pour ne toucher à rien d'autre
(les `dayOfYear % length` en aval profitent automatiquement du fix).

CHERCHER (toutes les occurrences — il y en a 6) :
```
var dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0).getTime()) / 86400000);
```

REMPLACER PAR :
```
var dayOfYear = Math.floor(Date.now() / 86400000);
```

> Le nom `dayOfYear` devient un léger abus (c'est désormais « jours depuis epoch »), mais c'est cosmétique
> et ça évite de toucher les lignes d'usage. Remplacement vérifié : 6/6, syntaxe JS valide.

## Effet
- **Tout le contenu défile** : chaque pool cycle sur SA longueur (Fajr ~461 j ≈ 1,26 an, Isha ~380 j,
  Savais-Tu ~480 j, etc.). Rien n'est gaspillé ; le contenu reste neuf plus longtemps.
- Les pools ≤365 (Ghidaa, Tibb, Fiqh, Hadiths) continuent de tourner normalement.
- Effet de bord bénin : l'item affiché « aujourd'hui » change une fois (re-décalage unique). Sans impact.

## Ordre
⚠️ **Appliquer CE SPEC AVANT SPEC-WAQT-MAGHRIB-STRUCT.** Une fois le service corrigé, déplacer les
34 phrases vers ʿAsr (399) est sûr — elles s'afficheront toutes (cycle ~399 j).

## Build obligatoire (script.js !)
```
npm run build        # minifie + bump version SW (obligatoire car script.js modifié)
git add -A && git commit -m "fix service quotidien: compteur de jours continu (sauve 223 items jamais affiches)"
git push
```
