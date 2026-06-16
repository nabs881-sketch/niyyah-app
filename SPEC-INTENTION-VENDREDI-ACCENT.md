# SPEC-INTENTION-VENDREDI-ACCENT (carte intention jour béni — accentuée)

## Cible
`script.js` (poser une classe) + `style.css` (l'accent). À appliquer APRÈS SPEC-INTENTION-AMBRE.
⚠️ cachés par le SW → **`npm run build` AVANT le commit.** Réversible.
Vaut pour vendredi (Jumu'a) ET les autres jours bénis (Ramadan, Laylat al-Qadr…) — tous accentués pareil.

## Étape 1 — JS : poser la classe (fichier `script.js`)
CHERCHER :
```
    if (opt._seasonLabel) {
      var badge = document.createElement('div');
```
REMPLACER PAR :
```
    if (opt._seasonLabel) {
      btn.classList.add('intention-season');
      var badge = document.createElement('div');
```

## Étape 2 — CSS : ajouter ce bloc à la fin de `style.css`
```css
/* ===== Carte d'intention jour béni (vendredi / saison) — accentuée ===== */
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
.intention-opt-v2.intention-season > div{
  color:#D8A24E!important;
  font-style:normal!important;
  text-transform:uppercase!important;
  letter-spacing:1.5px!important;
  font-size:11px!important;
  opacity:1!important;
}
```

## Build + commit
```
npm run build
git add script.js script.min.js style.css style.min.css sw.js && git commit -m "carte intention jour beni: accent ambre + label en capitales dorees"
git push
```

> La carte vendredi (et les autres jours bénis) ressort : liseré et lueur dorés plus marqués, label
> « AUJOURD'HUI C'EST VENDREDI » en petites capitales dorées au lieu de l'italique pâle.
