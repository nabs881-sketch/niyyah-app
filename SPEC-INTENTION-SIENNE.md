# SPEC-INTENTION-SIENNE (cartes intention — terre de Sienne laquée)

## Ce que ça fait
Remplace l'ivoire zellige par un fond **terre de Sienne** (dégradé chaud profond), filet doré, reflet en
haut, **encre claire lisible** (repos + sélection). Carte vendredi un cran plus lumineuse + label or clair.
L'overlay remonté est conservé tel quel.

## Cible
`style.css` uniquement. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement 1 — cartes normales
CHERCHER :
```
  background-color:#F1E7D0;
  background-image:var(--zellige);
  background-repeat:repeat;
  border-color:rgba(150,116,52,0.55);
  color:#2C2113;
}
.intention-opt-v2:hover,
.intention-opt-v2.sel-v2{
  background-color:#ECDFC0;
  background-image:var(--zellige);
  border-color:rgba(176,134,56,0.95);
  box-shadow:inset 0 0 0 1px rgba(176,134,56,0.45);
  color:#241A0E;
}
```
REMPLACER PAR :
```
  background:linear-gradient(160deg,#9c5a24,#5e3413);
  box-shadow:inset 0 1px 0 rgba(255,220,150,0.14);
  border-color:rgba(212,175,55,0.5);
  color:#F6ECD6;
}
.intention-opt-v2:hover,
.intention-opt-v2.sel-v2{
  background:linear-gradient(160deg,#b06a2b,#6a3c18);
  border-color:rgba(232,200,120,0.9);
  box-shadow:inset 0 1px 0 rgba(255,220,150,0.20),0 0 14px rgba(200,140,60,0.20);
  color:#FCF4E2;
}
```

## Remplacement 2 — carte vendredi / jour béni
CHERCHER :
```
.intention-opt-v2.intention-season{
  background-color:#F3E6C6;
  border-color:rgba(176,134,56,0.75);
  box-shadow:0 0 22px rgba(200,150,70,0.16);
}
.intention-opt-v2.intention-season:hover,
.intention-opt-v2.intention-season.sel-v2{
  background-color:#EFDBB0;
  border-color:rgba(176,134,56,1);
  box-shadow:0 0 22px rgba(200,150,70,0.22),inset 0 0 0 1px rgba(176,134,56,0.5);
  color:#241A0E;
}
.intention-opt-v2.intention-season > div{
  color:#7A4E12!important;
```
REMPLACER PAR :
```
.intention-opt-v2.intention-season{
  background:linear-gradient(160deg,#b5641d,#6f3210);
  border-color:rgba(232,200,120,0.7);
  box-shadow:0 0 22px rgba(200,150,70,0.22),inset 0 1px 0 rgba(255,220,150,0.18);
}
.intention-opt-v2.intention-season:hover,
.intention-opt-v2.intention-season.sel-v2{
  background:linear-gradient(160deg,#c6712a,#7d3a14);
  border-color:rgba(244,214,134,0.9);
  box-shadow:0 0 26px rgba(200,150,70,0.30),inset 0 1px 0 rgba(255,220,150,0.22);
  color:#FCF4E2;
}
.intention-opt-v2.intention-season > div{
  color:#F0C36A!important;
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "cartes intention: terre de Sienne laquee (lisible, vendredi accentue)"
git push
```

## Curseurs réglables
- plus rouge (moins brun) : `#9c5a24,#5e3413` → `#a85e22,#643412`.
- plus sombre/profond : → `#854c1e,#4f2c10`.
- filet doré plus présent : `rgba(212,175,55,0.5)` → 0.7.

> Note : la variable `--zellige` (du motif précédent) reste dans le fichier mais n'est plus utilisée — inerte,
> tu peux l'ignorer.
