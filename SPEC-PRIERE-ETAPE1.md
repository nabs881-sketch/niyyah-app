# SPEC-PRIERE-ETAPE1 — Déplacer l'entrée Repères : Pratique → Sanctuaire

## ⚠️ AVANT DE COMMENCER
- Reste sur le modèle **Sonnet (option 2, PAS "1M context")** — sinon erreur 429.
- Ne touche QUE ce qui est décrit ci-dessous. Aucune autre modification.

## But
L'entrée « Repères » (la carte dorée Zakât…) est aujourd'hui dans la **Pratique** (la checklist).
On la sort de là et on la place sur le **Sanctuaire** (l'écran d'accueil), sous les cartes d'accès.
On réutilise l'entrée existante telle quelle (`_repereHomeEntry()`) — aucun nouvel asset, aucun nouveau style.

---

## Modif 1 — `index.html` : ajouter l'emplacement sur le Sanctuaire

TROUVER cette ligne (dans `view-sanctuaire`, juste avant le disclaimer) :
```html
  <p class="app-disclaimer" id="app-disclaimer"></p>
```

LA REMPLACER par :
```html
  <div id="repere-sanctuaire-slot" style="margin:14px 16px 0;"></div>

  <p class="app-disclaimer" id="app-disclaimer"></p>
```

---

## Modif 2 — `script.js` : injecter l'entrée Repères quand on ouvre le Sanctuaire

TROUVER ce bloc de 2 lignes (dans la fonction `v2GoSanctuaire`) :
```js
    if (typeof updateMedaillonState === 'function') updateMedaillonState();
    setTimeout(_showDefiToastDaily, 2500);
```

LE REMPLACER par :
```js
    if (typeof updateMedaillonState === 'function') updateMedaillonState();
    var _rslot = document.getElementById('repere-sanctuaire-slot');
    if (_rslot && typeof _repereHomeEntry === 'function') _rslot.innerHTML = _repereHomeEntry();
    setTimeout(_showDefiToastDaily, 2500);
```

---

## Modif 3 — `script.js` : retirer l'entrée Repères de la Pratique

### 3a) Supprimer la déclaration
TROUVER cette ligne (dans `renderLevel`) :
```js
  const repereEntry = level.id === 1 ? _repereHomeEntry() : '';
```
LA SUPPRIMER entièrement.

### 3b) Retirer son ajout au HTML
TROUVER (toujours dans `renderLevel`) :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + prierMieuxEntry + qiblaCard + repereEntry;
```
LA REMPLACER par :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + prierMieuxEntry + qiblaCard;
```

---

## Build + commit (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "refactor: entree Repere deplacee de Pratique vers Sanctuaire (etape 1/2)"
git push
```

## Vérification finale (à me dire)
1. La carte dorée « Repères / Zakât… » n'apparaît PLUS dans la Pratique.
2. Elle apparaît bien sur le Sanctuaire (accueil), sous les cartes, et `openRepere()` s'ouvre au clic.
3. Aucune erreur dans la console.
