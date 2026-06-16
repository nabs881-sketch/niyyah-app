# SPEC-CARTE-NIYYAH-LUXE

## Cible
`script.js` — fonction qui crée le modal `#niyyahReadModal-v2` (la carte « VOTRE NIYYAH DU JOUR »).
Tout est en style inline (`cssText`), pas de classe CSS.

## But
Rendu premium/luxe : or champagne en dégradé, surface profonde + filet or, bouton brossé,
poussière d'or aux angles, filets latéraux autour du titre.

---

## 1. Remplacer les 4 `cssText`

**card** (ajout de `position:relative;overflow:hidden` indispensable pour les angles) :
```
card.style.cssText = 'position:relative;overflow:hidden;background:radial-gradient(130% 90% at 50% -10%,#20180e,#16110a 55%,#0d0a06);border:1px solid rgba(212,175,55,0.18);border-radius:18px;padding:34px 30px 28px;max-width:340px;width:100%;text-align:center;box-shadow:0 24px 60px -20px rgba(0,0,0,0.8),inset 0 1px 0 rgba(232,207,138,0.14);';
```

**text** :
```
text.style.cssText = 'font-family:"Cormorant Garamond",serif;font-size:19px;font-style:italic;color:#F4ECDC;line-height:1.62;margin-bottom:30px;';
```

**closeBtn** :
```
closeBtn.style.cssText = 'display:block;width:100%;padding:15px 0;border:1px solid rgba(120,86,20,0.35);border-radius:13px;background:linear-gradient(180deg,#F3DFA2,#DCBD63 46%,#C29A3E);color:#3a2c0c;font-family:"Cormorant Garamond",serif;font-size:15px;font-weight:600;letter-spacing:1px;cursor:pointer;margin-bottom:16px;box-shadow:0 8px 22px -8px rgba(194,154,62,0.55),inset 0 1px 0 rgba(255,248,224,0.7);';
```

**changeLink** (inchangé pour l'opacité, on garde 0.5 → on baisse un peu à 0.55 visuellement, optionnel) : ne pas toucher.

---

## 2. Titre avec filets latéraux + or dégradé

Remplacer le bloc actuel du `title` (les lignes `title.style.cssText = ...` et `title.textContent = 'VOTRE NIYYAH DU JOUR';`) par :

```js
title.style.cssText = 'display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:22px;';
title.innerHTML =
  '<span style="height:1px;width:34px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.55));"></span>' +
  '<span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;letter-spacing:3.4px;font-weight:500;white-space:nowrap;background:linear-gradient(180deg,#F1DDA0,#C9A24A);-webkit-background-clip:text;background-clip:text;color:transparent;">VOTRE NIYYAH DU JOUR</span>' +
  '<span style="height:1px;width:34px;background:linear-gradient(90deg,rgba(212,175,55,0.55),transparent);"></span>';
```

---

## 3. Poussière d'or aux angles

Juste **avant** la ligne `card.appendChild(title);`, insérer :

```js
var dustTR = document.createElement('div');
dustTR.style.cssText = 'position:absolute;top:-40px;right:-40px;width:140px;height:140px;pointer-events:none;background:radial-gradient(circle,rgba(212,175,55,0.10),transparent 70%);';
var dustBL = document.createElement('div');
dustBL.style.cssText = 'position:absolute;bottom:-30px;left:-30px;width:110px;height:110px;pointer-events:none;background:radial-gradient(circle,rgba(212,175,55,0.06),transparent 70%);';
card.appendChild(dustTR);
card.appendChild(dustBL);
```

(Les angles sont en `position:absolute` → ils se placent dans la carte grâce au `position:relative` ajouté en §1. `overflow:hidden` les rogne proprement aux coins arrondis.)

---

## Vérif attendue
Ouvrir la carte Niyyah du jour en local :
- titre or dégradé avec un filet fin de chaque côté
- texte d'intention plus grand et aéré
- bouton or brossé (clair en haut → profond en bas) avec léger reflet
- halos or discrets en haut-droite et bas-gauche, rognés aux coins

## Build (OBLIGATOIRE — script.js touché)
```
npm run build
git add -A
git commit -m "ui: carte Niyyah du jour rendu luxe (or degrade, filet, poussiere d'or)"
git push
```
