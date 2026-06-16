# SPEC-PRIERE-ETAPE2A — Créer l'onglet Prière (avec Prier mieux)

## ⚠️ AVANT DE COMMENCER
- Reste sur **Sonnet (option 2, PAS "1M context")** — sinon erreur 429.
- Ne touche QUE ce qui est décrit. Aucune autre modification.
- On NE bouge PAS les Horaires ni la Qibla ici (ce sera l'étape 2b). On bouge seulement **Prier mieux**.

## But
Créer un 4e onglet « Prière » dans la nav du bas + une vue dédiée, et y mettre **Prier mieux**.
On retire Prier mieux de la Pratique. On réutilise les classes existantes (`nafs-screen`, `nafs-header`) → pas de nouveau style.

---

## Modif 1 — `index.html` : ajouter le bouton de nav « Prière »

TROUVER cette ligne :
```html
  <!-- SCANNER — Œil -->
```

L'INSÉRER ce bloc JUSTE AVANT (donc le nouveau bouton se place entre Sanctuaire et Scanner) :
```html
  <!-- PRIÈRE — Mihrab -->
  <button class="nav-v2-item" id="v2nav-priere" aria-label="Prière" onclick="v2GoPriere()">
    <span class="nav-v2-icon"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 19 V11 a5 5 0 0 1 10 0 V19"/>
      <path d="M4.5 19 H17.5"/>
    </svg></span>
    <span class="nav-v2-label" id="nav-label-priere">Prière</span>
  </button>

  <!-- SCANNER — Œil -->
```

---

## Modif 2 — `index.html` : créer la vue Prière

TROUVER cette ligne :
```html
 <div class="view" id="view-nafs" style="display:none;">
```

L'INSÉRER ce bloc JUSTE AVANT :
```html
 <div class="view" id="view-priere" style="display:none;">
   <div class="nafs-screen">
     <div class="nafs-header">
       <div class="nafs-arabic-title">الصَّلَاة</div>
       <div class="nafs-title">PRIÈRE</div>
       <div class="nafs-subtitle">Ton repère pour mieux prier</div>
     </div>
     <div id="priere-content"></div>
   </div>
 </div>

```

---

## Modif 3 — `script.js` : les fonctions de l'onglet Prière

TROUVER cette ligne :
```js
function v2GoNafs() {
```

L'INSÉRER ce bloc JUSTE AVANT :
```js
function v2GoPriere() {
  setupTopUI('priere');
  document.body.classList.remove('pratique-active', 'in-progression-view', 'in-nafs-view');
  document.querySelectorAll('.nav-v2-item').forEach(function(n) { n.classList.remove('active-nav'); });
  var btn = document.getElementById('v2nav-priere');
  if (btn) btn.classList.add('active-nav');
  _v2TransitionTo('view-priere', { onShow: function() { if (typeof renderPriere === 'function') renderPriere(); } });
}
window.v2GoPriere = v2GoPriere;

function renderPriere() {
  var c = document.getElementById('priere-content');
  if (!c) return;
  c.innerHTML = (typeof _prierMieuxHomeEntry === 'function' ? _prierMieuxHomeEntry() : '');
}
window.renderPriere = renderPriere;

```

---

## Modif 4 — `script.js` : retirer Prier mieux de la Pratique

### 4a) Supprimer la déclaration
TROUVER cette ligne (dans `renderLevel`) et la SUPPRIMER entièrement :
```js
  const prierMieuxEntry = level.id === 1 ? _prierMieuxHomeEntry() : '';
```

### 4b) Le retirer du HTML
TROUVER (dans `renderLevel`) le morceau :
```js
+ prierMieuxEntry + qiblaCard
```
LE REMPLACER par :
```js
+ qiblaCard
```

---

## Build + commit (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "feat: onglet Priere + Prier mieux deplace de Pratique (etape 2a)"
git push
```

## Vérification finale (à me dire)
1. Un 4e onglet « Prière » apparaît dans la barre du bas (entre Ma Niyyah et Scanner).
2. Au clic, la vue Prière s'ouvre avec l'entrée « Prier mieux » (et elle s'ouvre au clic).
3. « Prier mieux » n'est PLUS dans la Pratique.
4. Les Horaires + la Qibla sont TOUJOURS dans la Pratique (normal, on les déplace en 2b).
5. La barre de nav reste lisible avec 4 onglets (si un label déborde, dis-le-moi, on raccourcira « Ma Niyyah »).
6. Aucune erreur console.
