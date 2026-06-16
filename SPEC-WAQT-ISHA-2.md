# SPEC-WAQT-ISHA-2

## Cible
`data/waqt/waqt_isha.json` → la phrase **Isha n° 250** (champ `fr`).
⚠️ JSON caché par le SW → `npm run build` avant commit. FR uniquement (ne pas toucher `en`/`ar`).

## Problème
La phrase cite, comme parole directe du Prophète ﷺ :
« Heureux celui qui trouve dans son livre beaucoup de demandes de pardon. »
→ C'est un hadith d'**Ibn Mâja**, classé **da'îf** (faible). Présenté comme authentique, il doit être
remplacé (politique : da'îf remplacé par sahîh de même thème).

## Correction (champ `fr` uniquement)
CHERCHER exactement :
```
Astaghfirullâh al-'azîm 100 fois. Le Prophète ﷺ disait : 'Heureux celui qui trouve dans son livre beaucoup de demandes de pardon.'
```
REMPLACER PAR :
```
Astaghfirullâh al-'azîm 100 fois. Le Prophète ﷺ lui-même demandait pardon à Allâh cent fois par jour (rapporté par Muslim, n° 2702).
```
> Le hadith de remplacement est **sahîh** (Muslim 2702 : « Je demande pardon à Allâh cent fois par jour »)
> et colle parfaitement au compteur « 100 fois » de la phrase. Ne modifier que le champ `fr`.

## Build
```
npm run build
git add -A && git commit -m "waqt isha: remplace hadith daif (tuba istighfar) par sahih Muslim 2702 dans #250"
git push
```
