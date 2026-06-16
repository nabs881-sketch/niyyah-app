# SPEC-REGARD-100

## Objectif
Rendre « Scanner Regard » 100 % défendable sans validation savante : n'afficher que **verset + référence + murmure** (vérifiables / mots de l'auteur). Masquer le panneau « Contexte » (epoque + contexte + sabab), qui contient des affirmations savantes non encore validées. Données conservées dans le JSON — réactivation en une ligne après validation.

Cible : **script.js**, fonction `_regardeShowVerset`.

## Retouche : supprimer le bouton « Contexte » et son panneau
SUPPRIMER exactement ce bloc (les deux morceaux ajoutés à `content.innerHTML`, entre le murmure et les boutons d'action) :

```js
    + '<div style="margin-top:24px;opacity:0;animation:regardeFadeIn 1s ease '+d[4]+'s forwards;"><button onclick="var b=document.getElementById(\'regarde-ctx\');if(b){b.style.display=b.style.display===\'none\'?\'block\':\'none\';}" style="background:none;border:none;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;cursor:pointer;text-decoration:underline;text-underline-offset:3px;">Contexte</button></div>'
    + '<div id="regarde-ctx" style="display:none;margin-top:16px;max-width:85%;text-align:center;opacity:0.8;">'
    + '<div style="font-size:13px;color:rgba(250,247,238,0.6);line-height:1.5;"><span style="color:#C8A84A;font-weight:600;">Epoque :</span> ' + _esc(v.epoque) + '</div>'
    + '<div style="margin-top:8px;font-size:13px;color:rgba(250,247,238,0.5);line-height:1.5;">' + _esc(v.contexte) + '</div>'
    + _sabab
    + '</div>'
```

Après suppression, le rendu enchaîne directement du murmure vers les boutons (étoile / refresh / note). La variable `_sabab` devient inutilisée — sans effet, la laisser ou la retirer, peu importe.

## Vérif attendue
- Le résultat d'un scan affiche : verset (FR) + référence + murmure. Plus de bouton « Contexte », plus d'Epoque/Contexte/Sabab à l'écran.
- `regard-library.json` est INCHANGÉ (les données contexte/sabab restent stockées).
- `node --check script.js` OK.

## Réactivation future (note pour plus tard)
Quand la validation savante (imam / IESH) est obtenue, il suffit de remettre ce bloc pour réafficher le panneau « Contexte ».

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "regard: masque contexte/sabab non valides -> affiche verset+ref+murmure (100% defendable)"
```
