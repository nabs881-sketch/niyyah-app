# SPEC-WAQT-DHUHR-2

## Cible
`data/waqt/waqt_dhuhr.json` → champ **`titre`** de 5 items.
⚠️ JSON caché par le SW → `npm run build` avant commit. FR uniquement. **On ne touche QUE le titre.**

## Raison
Ces 5 items sont titrés « Le hadith de… » mais ne sont **pas un hadith prophétique unique** :
2 sont des **versets coraniques** (4:36), 3 sont des **synthèses pédagogiques** de plusieurs hadiths.
Le contenu est correct ; seul le mot « hadith » dans le titre est trompeur. On reformule.

## Remplacements (champ `titre` uniquement)

1. DHUHR-VOISINS-004
   `Le hadith du voisin proche et lointain` → `Le verset du voisin proche et lointain`

2. DHUHR-INCONNUS-008
   `Le hadith du voyageur` → `Le verset du voyageur`

3. DHUHR-INTENTION-006
   `Le hadith de la goutte d'eau` → `Le principe de la goutte d'eau`

4. DHUHR-INTENTION-010
   `Le hadith des sept signaux` → `Les sept signaux du bon musulman`

5. DHUHR-SECRETS-015
   `Le hadith du serment retenu` → `Le principe du serment retenu`

> Chaque remplacement porte sur la valeur exacte du champ `titre` de l'item portant l'`id`
> correspondant. Ne rien modifier d'autre (texte, source, morale inchangés).

## Build
```
npm run build
git add -A && git commit -m "waqt dhuhr: reformule 5 titres (verset/principe au lieu de hadith)"
git push
```
