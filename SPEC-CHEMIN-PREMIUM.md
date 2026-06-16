# SPEC-CHEMIN-PREMIUM — Écrin premium des 4 cartes « Mon chemin »
Fichier : script.js (variable `lvlGridP`, dans le rendu de la progression). 2 éditions. `npm run build` AVANT commit.
On garde images, anneaux %, titres. On ajoute : coins arrondis, lueur dorée, soulèvement au toucher, fondu d'entrée.

---

## ÉDIT 1 — Injecter le CSS premium
REMPLACE :
```js
  let lvlGridP='';
```
par :
```js
  let lvlGridP = '<style>'
    + '.chemin-card{position:relative;height:128px;border-radius:16px;overflow:hidden;cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;box-shadow:inset 0 0 0 1px rgba(200,168,75,.30),0 0 22px rgba(200,168,75,.18),0 8px 22px rgba(0,0,0,.5);transition:transform .3s cubic-bezier(.2,.7,.2,1),box-shadow .3s;opacity:0;animation:cheminCardIn .8s cubic-bezier(.2,.7,.2,1) both;animation-delay:var(--d);}'
    + '.chemin-card:hover,.chemin-card:active{transform:translateY(-5px) scale(1.012);box-shadow:inset 0 0 0 1px rgba(200,168,75,.5),0 0 40px rgba(200,168,75,.4),0 14px 30px rgba(0,0,0,.6);}'
    + '@keyframes cheminCardIn{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}'
    + '@media (prefers-reduced-motion:reduce){.chemin-card{animation:none;opacity:1;}}'
    + '</style>';
```

---

## ÉDIT 2 — Carte premium (image, anneau, titre conservés)
REMPLACE le bloc `lvlGridP+='<div onclick="selectLevel('+lvl.id+')" style="border-radius:12px;height:120px;...` (toute l'instruction `lvlGridP+=` de la carte) par :
```js
    lvlGridP += '<div onclick="selectLevel(' + lvl.id + ')" class="chemin-card" style="--d:' + (lvl.id * 0.08) + 's;' + (_bgImg ? 'background-image:linear-gradient(180deg,rgba(8,5,3,.25),rgba(8,5,3,.88)),url(' + _bgImg + ');background-size:cover,cover;background-position:center,center;' : 'background:linear-gradient(180deg,rgba(8,5,3,.25),rgba(8,5,3,.88));') + '">'
      + '<div style="width:74px;height:74px;position:relative;z-index:1;">' + ring + '<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:\'Cormorant Garamond\',serif;font-size:19px;font-weight:600;color:#C8A84A;text-shadow:0 1px 4px rgba(0,0,0,.8);">' + pct + '%</div></div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;font-weight:600;color:#C8A84A;position:relative;z-index:1;text-shadow:0 1px 4px rgba(0,0,0,.8);">' + t('level_' + lvl.id) + '</div>'
      + '</div>';
```

---

## Après
`npm run build` → commit `"feat(chemin): 4 cartes premium (arrondi, lueur, soulevement, fondu)"` → push →
fermer/rouvrir le PWA, ouvrir « Mon chemin » : cartes arrondies, lueur dorée, soulèvement au toucher, fondu d'entrée.
Option possible plus tard : lueur croissante par niveau (Fondations discret → Rayonnement éclatant).
