# SPEC-WAQT-DHUHR-1

## Cible
`data/waqt/waqt_dhuhr.json` → `categories.conjoint` → item **DHUHR-CONJOINT-016**.
⚠️ JSON caché par le SW → `npm run build` avant commit. FR uniquement.

## Problème
Le hadith cité (« celui qui me garantit ce qu'il y a entre ses mâchoires et ce qu'il y a entre ses jambes,
je lui garantis le Paradis ») est de **Sahl ibn Saʿd, rapporté par al-Bukhârî n° 6474** (l'app le cite
d'ailleurs correctement ainsi dans DHUHR-LANGUE-019). Mais ici il est attribué à
**« Mu'âdh ibn Jabal… Tirmidhî n° 2616 »** — or Tirmidhî 2616 est un AUTRE hadith (Mu'âdh sur la langue).
→ Mauvais narrateur + mauvais numéro. Le contenu est authentique ; seule l'attribution est fausse.

## Correction 1 — champ `source`
CHERCHER :
```
Récit basé sur le hadith de Mu'âdh sur la garde de la langue et du sexe (Tirmidhi n° 2616, cité dans DHUHR-LANGUE) appliqué dans son contexte conjugal. Hadith authentique fondamental.
```
REMPLACER PAR :
```
Hadith de Sahl ibn Saʿd rapporté par al-Bukhârî (Sahih, n° 6474), appliqué ici au contexte conjugal. Hadith authentique fondamental. (Ne pas confondre avec le hadith de Mu'âdh sur la langue, Tirmidhî 2616.)
```

## Correction 2 — champ `texte` (le narrateur)
CHERCHER :
```
dans le hadith célèbre rapporté par Mu'âdh ibn Jabal et plusieurs autres Compagnons : « Celui qui me garantit ce qu'il y a entre se
```
REMPLACER le début par (seul le narrateur change) :
```
dans le hadith célèbre rapporté par Sahl ibn Saʿd : « Celui qui me garantit ce qu'il y a entre se
```
> Concrètement : remplacer « rapporté par Mu'âdh ibn Jabal et plusieurs autres Compagnons » par
> « rapporté par Sahl ibn Saʿd » dans le `texte` de DHUHR-CONJOINT-016. Ne pas toucher au reste.

## Build
```
npm run build
git add -A && git commit -m "waqt dhuhr: corrige attribution CONJOINT-016 (Mu'adh/Tirmidhi 2616 -> Sahl ibn Sad/Bukhari 6474)"
git push
```
