# SPEC-SCANNER-RETOUR (Scanner « Deux gestes » — bouton Retour amélioré)

## Cible
`style.css`, règle `.scanner-hub-back`. CSS uniquement.
⚠️ style.css caché par le SW → **`npm run build` AVANT le commit**.

## Correction
CHERCHER (la règle actuelle, une seule ligne) :
```
.scanner-hub-back{margin-top:8px;background:none;border:none;color:rgba(200,168,75,0.55);font-family:'Cormorant Garamond',var(--serif);font-style:italic;font-size:15px;letter-spacing:0.3px;cursor:pointer;padding:10px 24px;}
```
REMPLACER PAR :
```
.scanner-hub-back{margin-top:22px;display:inline-flex;align-items:center;gap:8px;background:rgba(200,168,75,0.04);border:1px solid rgba(200,168,75,0.28);color:rgba(230,200,130,0.78);font-family:'Cormorant Garamond',var(--serif);font-style:italic;font-size:15px;letter-spacing:1px;cursor:pointer;padding:11px 26px;border-radius:24px;min-height:44px;transition:border-color .25s ease,color .25s ease,background .25s ease;}
.scanner-hub-back::before{content:'\2039';font-style:normal;font-size:18px;line-height:1;opacity:0.8;}
.scanner-hub-back:hover{border-color:rgba(212,175,55,0.55);color:#E6C77A;background:rgba(200,168,75,0.09);}
.scanner-hub-back:active{transform:scale(0.97);}
```

> Ghost-pill : fin liseré or, chevron « ‹ » de retour, contraste relevé, tap-target 44px, hover.
> Reste secondaire (pas de remplissage plein) pour ne pas concurrencer les deux cartes.

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "scanner hub: bouton Retour en pastille ghost + chevron"
git push
```
