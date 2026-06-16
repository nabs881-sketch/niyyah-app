# SPEC-MENU-PREMIUM (bouton menu : « Niyyah+ ✦ » → « Niyyah Premium »)

## Ce que ça fait
Dans le menu (au-dessus de RÉGLAGES), le bouton « Niyyah+ ✦ » devient **« Niyyah Premium »** (sans étoile).

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement
CHERCHER :
```
Niyyah+ \u2726</span>
```
REMPLACER PAR :
```
Niyyah Premium</span>
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "menu: Niyyah+ etoile -> Niyyah Premium"
git push
```

> Pour rester cohérent, on peut aussi renommer « Niyyah+ » → « Niyyah Premium » ailleurs (titre de l'écran
> premium, bouton « Débloquer Niyyah+ à vie », toast d'activation). Dis-moi si tu veux que je te fasse ce SPEC.
