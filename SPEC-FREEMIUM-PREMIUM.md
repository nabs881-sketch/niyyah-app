# SPEC-FREEMIUM-PREMIUM (écran Niyyah+ — typographie plus grande & premium)

## Cible
`style.css` — **ajouter le bloc à la fin** (il écrase les tailles précédentes par ordre de cascade).
⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Ce que ça change
Descriptions 12px/60% → **14px** plus chaudes et lisibles · titres 16 → **17px** · sous-titre **16px** ·
prix 46 → **50px** · plus de respiration entre les features · liens du bas **14px** (meilleur tap-target).

## Bloc à ajouter
```css
/* ===== Niyyah+ — typographie premium (plus grand, plus lisible) ===== */
.freemium-sub{ font-size:16px; line-height:1.5; color:#DCC68E; margin:10px 14px 22px; }
.freemium-features{ gap:4px; }
.freemium-feature{ padding:16px 2px; gap:16px; }
.ff-ic{ width:40px; height:40px; }
.ff-tx{ gap:4px; }
.ff-tx b{ font-size:17px; line-height:1.25; }
.ff-tx i{ font-size:14px; line-height:1.5; color:rgba(220,198,142,0.82); }
.fp-amount{ font-size:50px; }
.fp-sub{ font-size:14px; margin-top:6px; }
.fp-trust{ font-size:12px; letter-spacing:2.5px; color:rgba(200,168,75,0.55); margin-top:8px; }
.freemium-codelink{ font-size:14px; color:rgba(214,194,138,0.75); margin-top:18px; }
.freemium-close{ font-size:14px; color:rgba(255,255,255,0.5); margin-top:12px; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "Niyyah+: typographie plus grande et premium (descriptions lisibles, plus d air)"
git push
```

> Le thème clair garde ses propres couleurs (non touché). Si tu veux encore plus grand, monte
> `.ff-tx i` à 15px et `.ff-tx b` à 18px. Si la feuille déborde en hauteur sur petit écran, on réduira
> légèrement les paddings.
