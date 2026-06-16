# SPEC-PRIERE-IMMERSIF — Prière immersif comme Nafs

## ⚠️ AVANT DE COMMENCER
- Reste sur **Sonnet (option 2, PAS "1M context")** — sinon erreur 429.
- Ne touche QUE ce qui est décrit. Aucune autre modification.

## But
Quand on ouvre l'onglet Prière, il doit se comporter EXACTEMENT comme Nafs : la barre du bas disparaît, le haut (œil + menu) disparaît, et un bouton retour apparaît en haut à gauche. On garde le bouton « Prière » en bas comme déclencheur. On reproduit le mécanisme `in-nafs-view` sous le nom `in-priere-view`.

---

## Modif 1 — `index.html` : ajouter le bouton retour dans la vue Prière

TROUVER :
```html
 <div class="view" id="view-priere" style="display:none;">
   <div class="nafs-screen">
     <div class="nafs-header">
```

LE REMPLACER par :
```html
 <div class="view" id="view-priere" style="display:none;">
   <div class="nafs-screen">
    <button id="priere-back-btn" onclick="v2GoSanctuaire()" aria-label="Retour" style="display:none;position:fixed;top:calc(var(--safe-top,0px) + 12px);left:16px;z-index:9990;background:rgba(10,10,10,0.7);border:1px solid rgba(200,168,74,0.3);border-radius:50%;color:#C8A84A;cursor:pointer;padding:0;width:40px;height:40px;align-items:center;justify-content:center;backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);"><svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="#C8A84A" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg></button>
     <div class="nafs-header">
```

---

## Modif 2 — `style.css` : règles d'immersion (copie de celles de Nafs)

TROUVER :
```css
body.in-nafs-view #nafs-back-btn { display: flex !important; }
```

LE REMPLACER par :
```css
body.in-nafs-view #nafs-back-btn { display: flex !important; }
body.in-priere-view .nav-bar-v2,
body.in-priere-view .topbar-v2,
body.in-priere-view #alhaya-btn { display: none !important; }
body.in-priere-view #priere-back-btn { display: flex !important; }
```

---

## Modif 3 — `script.js` : nettoyer la classe en quittant (dans `setupTopUI`)

TROUVER :
```js
  document.body.classList.remove('in-journal-view');
```

LE REMPLACER par :
```js
  document.body.classList.remove('in-journal-view');
  document.body.classList.remove('in-priere-view');
```

---

## Modif 4 — `script.js` : activer l'immersion en ouvrant Prière (dans `v2GoPriere`)

TROUVER :
```js
function v2GoPriere() {
  setupTopUI('priere');
```

LE REMPLACER par :
```js
function v2GoPriere() {
  setupTopUI('priere');
  document.body.classList.add('in-priere-view');
```

---

## Build + commit (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "feat: onglet Priere immersif comme Nafs (nav + haut masques)"
git push
```

## Vérification finale (à me dire)
1. Le bouton « Prière » est toujours dans la barre du bas.
2. Au clic, exactement comme Nafs : RIEN en bas (nav cachée), RIEN en haut (œil + menu cachés), un bouton retour ‹ en haut à gauche.
3. Le bouton retour ramène au Sanctuaire, et la barre du bas réapparaît partout normalement.
4. Dans Prière : Horaires (compte à rebours), Qibla, Prier mieux — tous présents et fonctionnels.
5. Aucune erreur console.
