# SPEC-INTENTION-AMBRE (Ancrer votre Niyyah — cartes en ambre)

## Cible
`style.css` — **ajouter le bloc à la fin** (écrase l'état neutre par ordre de cascade).
⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Ce que ça fait
Les cartes d'intention passent de neutres (gris #1a1a1a, liseré blanc) à des **tablettes ambre** :
identité « intention = chaud », en miroir du Regard « = bleu ». La sélection reste un cran plus dorée.

## Bloc à ajouter
```css
/* ===== Cartes d'intention (Ancrer votre Niyyah) — identité ambre ===== */
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

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "Ancrer Niyyah: cartes d intention en ambre (identite chaude vs Regard bleu)"
git push
```

> Suite possible : accentuer la **carte vendredi** (liseré + lueur dorés un cran plus forts) — ça demande
> de lui poser une classe `intention-vendredi` dans le rendu JS. Dis-moi si tu la veux et je te fais ce SPEC.
> Et si l'ambre au repos te paraît trop présent, on baisse `0.18` → `0.12`.
