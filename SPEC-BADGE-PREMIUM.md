# SPEC-BADGE-PREMIUM

## Cible
`script.js` — fonction `v2OpenSettings` (le sheet Réglages).

## But
Afficher un badge « Niyyah+ ✦ actif » en haut des Réglages, **uniquement si
`isPremium()`** — pour que l'utilisateur (et toi) voie son statut d'un coup d'œil.

## Édit unique

Repérer la ligne du titre des Réglages :
```
      <div style="font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;text-align:center;margin-bottom:22px;">${T.settings_title}</div>
```
REMPLACER par (la même ligne + le badge juste en dessous) :
```
      <div style="font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;text-align:center;margin-bottom:22px;">${T.settings_title}</div>
      ${isPremium() ? '<div style="background:linear-gradient(135deg,rgba(232,206,138,0.15),rgba(201,162,74,0.05));border:1px solid rgba(232,206,138,0.35);border-radius:14px;padding:13px 16px;margin-bottom:18px;display:flex;align-items:center;justify-content:center;gap:9px;box-shadow:0 0 24px rgba(232,206,138,0.08);"><span style="color:#E8CE8A;font-size:15px;">\u2726</span><span style="font-family:\'Cormorant Garamond\',serif;font-size:15px;letter-spacing:1.5px;color:#E8CE8A;">Niyyah+ actif</span><span style="color:#E8CE8A;font-size:15px;">\u2726</span></div>' : ''}
```

## Vérif attendue
- Réglages quand premium (`isPremium()` true) → le badge or « ✦ Niyyah+ actif ✦ » s'affiche sous le titre.
- Réglages quand non-premium → rien (pas de badge).

Test rapide en console : `setPremium(true)` puis rouvrir Réglages → badge visible.
`setPremium(false)` → badge disparu.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "premium: badge Niyyah+ actif en haut des reglages (si isPremium)"
git push
```
