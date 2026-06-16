# SPEC-SCANNER-CARTES-COULEURS (Scanner — carte Regard en bleu Majorelle)

## Cible
`script.js` (1 classe dans `openScannerHub`) + `style.css` (1 bloc).
⚠️ cachés par le SW → **`npm run build` AVANT le commit**.
Carte « Pose une intention » : reste ambre/or. Carte « Pose un regard » : passe en bleu Majorelle.

## Étape 1 — JS : marquer la 2ᵉ carte (fichier `script.js`)
Dans `openScannerHub`, CHERCHER :
```
   +'<button class="scanner-hub-card" onclick="regardeOpen();">'
```
REMPLACER PAR :
```
   +'<button class="scanner-hub-card shc-card-regard" onclick="regardeOpen();">'
```

## Étape 2 — CSS : ajouter ce bloc à la fin de `style.css`
```css
/* ===== Scanner — carte Regard en bleu Majorelle ===== */
.scanner-hub-card.shc-card-regard{
  border-color:rgba(110,160,215,0.48)!important;
  background:linear-gradient(180deg,rgba(80,130,200,0.13),rgba(40,80,140,0.04))!important;
  box-shadow:0 6px 22px rgba(0,0,0,0.45),inset 0 1px 0 rgba(190,215,245,0.16)!important;
}
.scanner-hub-card.shc-card-regard::before{
  background:linear-gradient(105deg,transparent,rgba(200,225,255,0.20),transparent)!important;
}
.scanner-hub-card.shc-card-regard:hover{
  border-color:rgba(130,175,225,0.72)!important;
  box-shadow:0 8px 28px rgba(0,0,0,0.55),inset 0 1px 0 rgba(190,215,245,0.26)!important;
}
.scanner-hub-card.shc-card-regard .shc-orb{
  color:#AFC9EC!important;
  border:1px solid rgba(120,165,215,0.45)!important;
  background:radial-gradient(circle,rgba(90,140,210,0.24),transparent 70%)!important;
}
.scanner-hub-card.shc-card-regard .shc-title{ color:#C2DBF5!important; }
.scanner-hub-card.shc-card-regard .shc-desc{ color:rgba(175,201,236,0.72)!important; }
.scanner-hub-card.shc-card-regard .shc-chev{ color:rgba(140,180,225,0.6)!important; }
```

## Build + commit
```
npm run build
git add script.js script.min.js style.css style.min.css sw.js && git commit -m "scanner: carte Regard en bleu Majorelle (systeme bicolore Niyyah/Regard)"
git push
```

> Réversible : retirer le bloc CSS + la classe `shc-card-regard` = retour au tout-or.
