# SPEC-INTENTION-FIX (cartes intention — lisibilité + vrai ambre visible)

## Problème
Le fond ambre posé avant (`#191309→#120d07`) est plus SOMBRE que le panneau (`#111`) : les cartes se
fondent dans le fond → effet « vide », texte qui flotte, et changement quasi invisible. On les éclaircit
en brun ambré franc (plus clair que le panneau) → tablettes nettes, texte crème lisible.

## Cible
`style.css`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement 1 — cartes normales
CHERCHER :
```
.intention-opt-v2{
  background:linear-gradient(180deg,#191309,#120d07);
  border-color:rgba(200,168,75,0.18);
}
.intention-opt-v2:hover,
.intention-opt-v2.sel-v2{
  border-color:rgba(212,175,55,0.5);
  background:rgba(212,175,55,0.12);
}
```
REMPLACER PAR :
```
.intention-opt-v2{
  background:linear-gradient(180deg,#2b1f12,#221810);
  border-color:rgba(200,168,75,0.30);
  color:#F3ECD8;
}
.intention-opt-v2:hover,
.intention-opt-v2.sel-v2{
  border-color:rgba(228,196,118,0.65);
  background:linear-gradient(180deg,#3a2c18,#2c2113);
  color:#FBF3DC;
}
```

## Remplacement 2 — carte jour béni (vendredi/saison)
CHERCHER :
```
.intention-opt-v2.intention-season{
  border-color:rgba(212,175,55,0.45);
  background:linear-gradient(180deg,rgba(200,150,70,0.10),rgba(120,80,30,0.035));
  box-shadow:0 0 18px rgba(200,150,70,0.12);
}
.intention-opt-v2.intention-season:hover,
.intention-opt-v2.intention-season.sel-v2{
  border-color:rgba(224,200,120,0.7);
  background:linear-gradient(180deg,rgba(200,150,70,0.16),rgba(120,80,30,0.05));
}
```
REMPLACER PAR :
```
.intention-opt-v2.intention-season{
  border-color:rgba(228,196,118,0.55);
  background:linear-gradient(180deg,#3c2b14,#2c1f10);
  box-shadow:0 0 20px rgba(200,150,70,0.18);
}
.intention-opt-v2.intention-season:hover,
.intention-opt-v2.intention-season.sel-v2{
  border-color:rgba(244,214,134,0.8);
  background:linear-gradient(180deg,#4a3518,#382711);
}
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "cartes intention: brun ambre lisible (plus clair que le panneau), vendredi accentue"
git push
```

> Hiérarchie : panneau #111 (sombre) < cartes ~#26 (ambre) < vendredi ~#34 (le plus chaud). Texte crème net.
> Si après ça il reste une vraie bande vide AU-DESSUS de tout le panneau : c'est normal, le panneau monte
> du bas (bottom-sheet) et le flou occupe le haut. On peut le centrer si tu veux — dis-moi.
