# SPEC-FIQH-ORIENTATION

## Cible
`script.js` uniquement (fonction `openVueFiqhJour`, ~ligne 18191-18204).
Réutilise les classes CSS de l'overlay Remèdes (`tibb-disclaimer-*`) → **aucun CSS à ajouter**.

## But
1. Overlay « première ouverture » sur le module fiqh : rappeler que c'est une
   orientation sourcée, pas une fatwa.
2. Note de divergence affichée **automatiquement** sur toute règle dont l'école
   n'est PAS consensus/majorité (couvre les 3 règles hanafite/hanbalite + futures).

---

## Édit 1 — déclencher l'overlay à la 1ère ouverture

Dans `openVueFiqhJour`, repérer :
```js
  loadFiqh(function() {
    var rule = getFiqhJourRule();
```
REMPLACER par :
```js
  loadFiqh(function() {
    if (safeGetItem('niyyah_fiqh_disclaimer_seen') !== 'true') { _showFiqhDisclaimer(); }
    var rule = getFiqhJourRule();
```

---

## Édit 2 — note de divergence auto sur les règles madhhab-spécifiques

Repérer (la ligne qui affiche l'école, suivie de la fermeture) :
```js
      + (rule.ecole ? '<div style="font-size:12px;color:rgba(200,168,74,0.4);margin-top:8px;letter-spacing:1px;">' + rule.ecole.toUpperCase() + '</div>' : '')
      + '</div>';
```
REMPLACER par :
```js
      + (rule.ecole ? '<div style="font-size:12px;color:rgba(200,168,74,0.4);margin-top:8px;letter-spacing:1px;">' + rule.ecole.toUpperCase() + '</div>' : '')
      + ((rule.ecole && !/consensus|majorit/i.test(rule.ecole)) ? '<div style="font-size:11px;line-height:1.5;color:rgba(255,255,255,0.45);font-style:italic;margin-top:10px;">Position propre \u00e0 cette \u00e9cole ; d\'autres \u00e9coles peuvent diverger.</div>' : '')
      + '</div>';
```

---

## Édit 3 — ajouter la fonction de l'overlay

Juste APRÈS la ligne :
```js
window.openVueFiqhJour = openVueFiqhJour;
```
AJOUTER :
```js
function _showFiqhDisclaimer() {
  var ov = document.createElement('div');
  ov.className = 'tibb-disclaimer-overlay';
  ov.innerHTML = '<div class="tibb-disclaimer-card">'
    + '<div class="tibb-disclaimer-icon">\u2696\uFE0F</div>'
    + '<div class="tibb-disclaimer-titre">Orientation, pas fatwa</div>'
    + '<div class="tibb-disclaimer-texte">Ces r\u00e8gles sont une orientation compil\u00e9e des sources classiques et des quatre \u00e9coles sunnites. Ce n\'est pas un avis religieux (fatwa). Pour ton cas pr\u00e9cis et les divergences entre \u00e9coles, r\u00e9f\u00e8re-toi \u00e0 ton imam ou \u00e0 un savant de ton \u00e9cole.</div>'
    + '<button class="tibb-disclaimer-btn" id="fiqh-disclaimer-accept">J\u2019ai compris</button>'
    + '</div>';
  document.body.appendChild(ov);
  document.getElementById('fiqh-disclaimer-accept').onclick = function() {
    safeSetItem('niyyah_fiqh_disclaimer_seen', 'true');
    ov.classList.add('tibb-disclaimer-closing');
    setTimeout(function() { ov.remove(); }, 300);
  };
}
window._showFiqhDisclaimer = _showFiqhDisclaimer;
```

---

## Vérif attendue
- Ouvrir le module Jurisprudence → l'overlay « Orientation, pas fatwa » s'affiche
  la 1ère fois, puis plus (flag `niyyah_fiqh_disclaimer_seen`).
- Tomber sur une règle hanafite/hanbalite → la note « Position propre à cette
  école… » apparaît sous l'étiquette de l'école. Sur une règle consensus/majorité → pas de note.

Test rapide en console (forcer le ré-affichage) :
```
localStorage.removeItem('niyyah_fiqh_disclaimer_seen')
```

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "fiqh: overlay orientation (pas fatwa) + note divergence auto sur regles madhhab-specifiques"
git push
```
