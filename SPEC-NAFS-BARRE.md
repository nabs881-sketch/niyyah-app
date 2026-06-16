# SPEC-NAFS-BARRE (recoller la barre sous le badge SEMAINE)

## Problème
Le badge « SEMAINE 24 — TRAIT 24/52 » a un `margin-bottom:20px` : la barre tombe 20px plus bas, détachée,
et flotte entre le badge et « MALADIES ». On la colle juste sous le badge, puis on espace avant la suite.

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement
CHERCHER :
```
      '<div class="nafs-week-badge">Semaine ' + w + ' — Trait ' + trait.id + '/52</div>' +
      '<div style="width:180px;height:3px;border-radius:3px;background:rgba(200,168,75,0.15);margin:9px auto 0;overflow:hidden;"><div style="width:' + Math.round(trait.id/52*100) + '%;height:100%;background:linear-gradient(90deg,#B8923E,#F0D27E);"></div></div>' +
```
REMPLACER PAR :
```
      '<div class="nafs-week-badge" style="margin-bottom:0;">Semaine ' + w + ' — Trait ' + trait.id + '/52</div>' +
      '<div style="width:160px;height:3px;border-radius:3px;background:rgba(200,168,75,0.15);margin:10px auto 20px;overflow:hidden;"><div style="width:' + Math.round(trait.id/52*100) + '%;height:100%;background:linear-gradient(90deg,#B8923E,#F0D27E);"></div></div>' +
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "NAFS: barre de progression collee sous le badge semaine"
git push
```

> Maintenant : badge → barre (10px) → espace (20px) → « MALADIES… ». Si tu veux la barre plus large,
> `width:160px` → `200px`.
