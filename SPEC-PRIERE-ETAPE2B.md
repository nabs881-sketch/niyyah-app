# SPEC-PRIERE-ETAPE2B — Déménager Horaires + Qibla : Pratique → onglet Prière

## ⚠️ AVANT DE COMMENCER
- Reste sur **Sonnet (option 2, PAS "1M context")** — sinon erreur 429.
- Ne touche QUE ce qui est décrit ci-dessous. Aucune autre modification.
- Principe : l'onglet Prière affichera Horaires + Qibla + Prier mieux. On retire Horaires + Qibla de la Pratique. Au lieu de modifier les 9 endroits qui rafraîchissent la prière, on branche le rafraîchissement en UN SEUL point dans `renderLevel` (aucun risque de boucle, vérifié).

---

## Modif 1 — `script.js` : étendre `renderPriere()`

TROUVER ce bloc :
```js
function renderPriere() {
  var c = document.getElementById('priere-content');
  if (!c) return;
  c.innerHTML = (typeof _prierMieuxHomeEntry === 'function' ? _prierMieuxHomeEntry() : '');
}
```

LE REMPLACER par :
```js
function renderPriere() {
  var c = document.getElementById('priere-content');
  if (!c) return;
  var html = '';
  if (typeof renderPrayerTimesCard === 'function') html += renderPrayerTimesCard();
  if (typeof renderQiblaCard === 'function') html += renderQiblaCard();
  if (typeof _prierMieuxHomeEntry === 'function') html += _prierMieuxHomeEntry();
  c.innerHTML = html;
}
```

---

## Modif 2 — `script.js` : brancher le rafraîchissement (le point unique)

TROUVER ce bloc (le tout début de `renderLevel`) :
```js
  const content = document.getElementById('content');
  const pct     = getLevelProgress(levelId);
```

LE REMPLACER par :
```js
  const content = document.getElementById('content');
  const pct     = getLevelProgress(levelId);
  if (typeof renderPriere === 'function') renderPriere();
```

> Effet : à chaque fois que la prière/qibla se met à jour (chargement horaires, changement de ville, boussole…), `renderLevel` est déjà appelé → la vue Prière se rafraîchit automatiquement.

---

## Modif 3 — `script.js` : retirer les cartes de la Pratique

### 3a) Supprimer les 2 déclarations
TROUVER ces 2 lignes (dans `renderLevel`) et les SUPPRIMER entièrement :
```js
  const prayerCard = level.id === 1 ? renderPrayerTimesCard() : '';
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
```

### 3b) Les retirer du HTML de la Pratique
TROUVER cette ligne :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard;
```
LA REMPLACER par :
```js
    + '</div>' + graceBanner + fridayBanner;
```

---

## Build + commit (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "feat: Horaires + Qibla deplaces de Pratique vers onglet Priere (etape 2b)"
git push
```

## Vérification finale (à me dire)
1. Dans l'onglet **Prière** : les Horaires (avec compte à rebours qui tourne), la Qibla (boussole), et Prier mieux s'affichent.
2. Les Horaires + la Qibla ne sont PLUS dans la Pratique.
3. Changer de ville / recharger les horaires met bien à jour la carte DANS l'onglet Prière.
4. La Pratique ne contient plus que : score du jour, bannières, et les sections (5 prières à cocher, wird, sunnah, défis).
5. Aucune erreur console.
