# SPEC-PROGRESS-LABEL (agrandir le label de la barre « Le moment/jour s'habite »)

## Cible
`style.css`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement 1 — label
CHERCHER :
```
.fil-progress-label{ font-family:'Cormorant Garamond',serif; font-style:italic; font-size:14px; color:rgba(240,234,214,0.6); }
```
REMPLACER PAR :
```
.fil-progress-label{ font-family:'Cormorant Garamond',serif; font-style:italic; font-size:18px; color:rgba(240,234,214,0.75); }
```

## Remplacement 2 — compteur (proportionnel)
CHERCHER :
```
.fil-progress-count{ font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:1px; color:rgba(200,168,74,0.75); }
```
REMPLACER PAR :
```
.fil-progress-count{ font-family:'Nunito',sans-serif; font-size:14px; letter-spacing:1px; color:rgba(200,168,74,0.85); }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "barre progression: label agrandi (14->18)"
git push
```

> Vaut pour les deux vues (« Le jour s'habite » et « Le moment s'habite »). Plus grand encore : `18px` → `20px`.
