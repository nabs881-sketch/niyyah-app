# SPEC-FRIDOUA-BOUTON-I

## Cible
`script.js` — le tableau `FRIDAY_ITEMS` (bannière vendredi), item `id: 'fri_doua'`
(label « Douaa de l'heure bénie »).

## But
Cet item doit afficher un bouton « **i** » **identique à celui des autres items**
(comme `fri_salawat`), placé sur la ligne du label, qui ouvre la fiche info
(`openInfoSheet`) avec la **phonétique** de la du'a.

> Référence du pattern « i » : le bouton `class="btn-info"` … `<i>i</i></button>` déjà utilisé
> pour `fri_salawat` et les autres items. `openInfoSheet` lit le contenu via les attributs
> `data-label / data-arabic / data-phonetic / data-translation` du bouton cliqué.

---

## Étape 1 — Vérifier les données de `fri_doua`

Dans l'objet `fri_doua` de `FRIDAY_ITEMS`, s'assurer que ces 2 champs existent
(les ajouter s'ils manquent, **ne rien fabriquer** — c'est le Coran 2:201) :

```js
phonetic: "Rabbanā ātinā fid-dunyā hasanatan wa fil-ākhirati hasanatan wa qinā 'adhāban-nār",
translation: "Notre Seigneur, accorde-nous en ce monde le bien et dans l'au-delà le bien, et préserve-nous du châtiment du Feu.",
```
(Source : Coran 2:201 — verset, donc authentique.)

## Étape 2 — Garantir le rendu du bouton « i »

Dans la boucle `FRIDAY_ITEMS.forEach(...)`, sur la **ligne du label**
(le `<div style="display:flex;align-items:center;justify-content:space-between;">`
qui contient `friday-item-label`), s'assurer que **lorsque `fi.phonetic` existe**, ce bouton
est bien ajouté juste après le label — **strictement le même** que pour les autres items :

```js
if (fi.phonetic) {
  var _lEsc = (fi.label||'').replace(/"/g,'&quot;');
  var _aEsc = (fi.arabic||'').replace(/"/g,'&quot;');
  var _pEsc = (fi.phonetic||'').replace(/"/g,'&quot;');
  var _tEsc = (fi.translation||'').replace(/"/g,'&quot;');
  fitems += '<button class="btn-info" ontouchstart="event.stopPropagation()" onclick="event.stopPropagation();openInfoSheet(\'\',\'\',\'\',\'\',event)" data-label="' + _lEsc + '" data-arabic="' + _aEsc + '" data-phonetic="' + _pEsc + '" data-translation="' + _tEsc + '" title="' + t('btn_see_phonetic') + '" style="flex-shrink:0;"><i>i</i></button>';
}
```

Si ce bloc existe déjà mais que l'`onclick` passe des chaînes vides **sans** que
`openInfoSheet` lise les `data-*`, ne rien changer d'autre : `openInfoSheet` lit déjà
`event.currentTarget.dataset`. Le seul impératif : que le bouton soit **présent et visible**
sur `fri_doua`, comme sur `fri_salawat`.

---

## Vérif attendue
- Ouvrir l'app un vendredi (ou forcer `isFriday`) → l'item « Douaa de l'heure bénie »
  montre un bouton « i » à droite du titre, comme les autres.
- Taper « i » → la fiche affiche l'arabe, la **phonétique** `Rabbanā ātinā…` et la traduction.

```
grep -c "Rabbanā ātinā fid-dunyā" script.js     # >= 1
```

## Build (OBLIGATOIRE — script.js)
```
npm run build
git add -A
git commit -m "vendredi: bouton i (phonetique) sur Douaa de l'heure benie (Coran 2:201)"
git push
```
