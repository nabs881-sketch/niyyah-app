# SPEC-FONDATIONS-POLICE (agrandir les 2 lignes "fondations tenues")

## Ce que ça fait
Sur l'écran fondations (état 0 jour) : la phrase principale passe de **18→21px**, la ligne du dessous
de **14→16px**, et les deux s'éclaircissent légèrement.

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement
CHERCHER :
```
font-size:18px;font-style:italic;color:rgba(200,168,75,0.6);line-height:1.6;max-width:320px;margin:0 auto;">Ton d\u00e9compte commence d\u00e8s ta premi\u00e8re journ\u00e9e de fondations tenues.</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:rgba(200,168,75,0.35);margin-top:16px;line-height:1.5;">Entre toi et Lui. Rien ne se perd \u2014 chaque retour compte.</div>'
```
REMPLACER PAR :
```
font-size:21px;font-style:italic;color:rgba(200,168,75,0.68);line-height:1.55;max-width:320px;margin:0 auto;">Ton d\u00e9compte commence d\u00e8s ta premi\u00e8re journ\u00e9e de fondations tenues.</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:rgba(200,168,75,0.45);margin-top:16px;line-height:1.5;">Entre toi et Lui. Rien ne se perd \u2014 chaque retour compte.</div>'
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "fondations: agrandir les 2 lignes (18->21 / 14->16)"
git push
```

> Réglable : `21px` → `23px` pour plus grand. Note : la même 2e ligne existe dans l'état "X jours" ; si tu
> veux l'agrandir aussi là-bas, dis-moi et je te fais le complément.
