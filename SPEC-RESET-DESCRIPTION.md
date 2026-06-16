# SPEC-RESET-DESCRIPTION (ligne d'explication sous « Reset de l'Âme »)

## Ce que ça fait
Ajoute, sous « Reset de l'Âme », une petite ligne discrète qui explique l'action :
« Efface toutes tes données (progression, journal, intentions) et repart de zéro. Un backup est téléchargé avant. »

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement
CHERCHER :
```
Reset de l\u2019\u00c2me</div>'
    + '</div>';
```
REMPLACER PAR :
```
Reset de l\u2019\u00c2me</div>'
    + '<div style="color:rgba(255,80,80,0.4);font-size:12px;line-height:1.45;padding:2px 16px 4px 40px;">Efface toutes tes donn\u00e9es (progression, journal, intentions) et repart de z\u00e9ro. Un backup est t\u00e9l\u00e9charg\u00e9 avant.</div>'
    + '</div>';
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "menu: ligne d explication sous Reset de l Ame"
git push
```

> La ligne est alignée sous le texte (retrait gauche 40px pour passer après l'icône), en rouge atténué.
