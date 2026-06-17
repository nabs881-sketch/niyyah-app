# SPEC-freemium-v2 — Nouveau modèle économique Niyyah

## Objectif
Implémenter le modèle freemium définitif : abonnement 14,99€/an (beta = code BISMILLAH),
quotas IA maîtrisés, contenu Connaissance gratuit 30 jours puis premium.

---

## 1. FONCTIONS UTILITAIRES — ajouter après `isPremium()`

```js
// Jours depuis l'installation
function _daysSinceInstall() {
  var inst = parseInt(safeGetItem('niyyah_install_date') || '0', 10);
  if (!inst) return 0;
  return (Date.now() - inst) / 86400000;
}

// Contenu Connaissance accessible : premium OU < 30 jours
function isKnowledgeUnlocked() {
  return isPremium() || _daysSinceInstall() < 30;
}

// Trial IA : compteurs à vie (pas réinitialisés)
function _getTrialCount(key) {
  return parseInt(safeGetItem(key) || '0', 10);
}
function _incTrialCount(key) {
  safeSetItem(key, String(_getTrialCount(key) + 1));
}

// Accès feature IA : premium OU trial non épuisé
function canUseRegarde() {
  return isPremium() || _getTrialCount('niyyah_trial_regard') < 3;
}
function canUseScanner() {
  return isPremium() || _getTrialCount('niyyah_trial_scanner') < 3;
}
function canUseBilan() {
  return isPremium() || _getTrialCount('niyyah_trial_bilan') < 1;
}
```

---

## 2. QUOTA REGARD — modifier `regardeCapture()` L17263

**Remplacer :**
```js
var _rLimit = (typeof isPremium === 'function' && isPremium()) ? 3 : 1;
if (_rq.length >= _rLimit) { showQuotaLimit('regard'); return; }
```

**Par :**
```js
// Trial : 3 scans à vie. Premium : 2/jour.
if (!isPremium()) {
  if (!canUseRegarde()) { showQuotaLimit('regard'); return; }
  _incTrialCount('niyyah_trial_regard');
} else {
  var _rLimit = 2;
  if (_rq.length >= _rLimit) { showQuotaLimit('regard'); return; }
}
```

---

## 3. QUOTA SCANNER NIYYAH — modifier `scannerCapture()` L18041

**Remplacer le bloc quota (lignes 18042-18050) :**
```js
var _prem = (typeof isPremium === 'function' && isPremium());
var _sq = []; try { _sq = JSON.parse(safeGetItem('niyyah_scanner_quota') || '[]'); } catch(e) { _sq = []; }
var _windowMs = _prem ? 86400000 : 7 * 86400000;
var _cutoff = new Date(Date.now() - _windowMs).toISOString();
_sq = _sq.filter(function(ts){ return ts > _cutoff; });
if (!NIYYAH_DEBUG && _sq.length >= 3) { showQuotaLimit('scan'); return; }
_sq.push(new Date().toISOString());
safeSetItem('niyyah_scanner_quota', JSON.stringify(_sq));
```

**Par :**
```js
var _prem = (typeof isPremium === 'function' && isPremium());
if (!_prem) {
  if (!canUseScanner()) { showQuotaLimit('scan'); return; }
  _incTrialCount('niyyah_trial_scanner');
} else {
  // Premium : 2/jour
  var _sq = []; try { _sq = JSON.parse(safeGetItem('niyyah_scanner_quota') || '[]'); } catch(e) { _sq = []; }
  var _cutoff = new Date(Date.now() - 86400000).toISOString();
  _sq = _sq.filter(function(ts){ return ts > _cutoff; });
  if (!NIYYAH_DEBUG && _sq.length >= 2) { showQuotaLimit('scan'); return; }
  _sq.push(new Date().toISOString());
  safeSetItem('niyyah_scanner_quota', JSON.stringify(_sq));
}
```

---

## 4. QUOTA BILAN IA — modifier `showWeeklyBilan()` L7470

**Remplacer :**
```js
var _isPrem = typeof isPremium === 'function' && isPremium();
```

**Par :**
```js
var _isPrem = typeof isPremium === 'function' && isPremium();
// Trial bilan : 1 à vie
if (!_isPrem) {
  if (!canUseBilan()) {
    // Afficher paywall au lieu du bilan IA → pool statique uniquement
    _isPrem = false;
  } else {
    _incTrialCount('niyyah_trial_bilan');
  }
}
```

---

## 5. CONTENU CONNAISSANCE — bloquer après 30 jours

Dans chaque fonction d'ouverture des modules Connaissance, ajouter en tête :

```js
if (!isKnowledgeUnlocked()) { _showPaywallConnaissance(); return; }
```

**Fonctions à modifier :**
- `openVueSira()` ou équivalent Sîra
- `openVueLisan()`
- `openVueCompagnon()`
- `openVuePropheteJour()`
- `openVueGhidaaJour()`
- `openVueTibbJour()`
- `openVueFiqhJour()`
- `openVueSavaisTu()` ou équivalent
- `openVueRecitsCoran()` ou équivalent

**Ajouter la fonction paywall Connaissance :**
```js
function _showPaywallConnaissance() {
  var daysLeft = Math.max(0, 30 - Math.floor(_daysSinceInstall()));
  // Si encore dans les 30 jours → ne devrait pas arriver
  // Sinon → afficher freemiumOverlay avec message spécifique
  document.getElementById('freemiumOverlay').classList.add('show');
}
```

---

## 6. AVERTISSEMENT JOUR 20

Dans `init()` ou `renderAccueil()`, ajouter :

```js
// Avertissement J20 : il reste 10 jours de contenu Connaissance
var _dsi = _daysSinceInstall();
if (!isPremium() && _dsi >= 20 && _dsi < 30 && !safeGetItem('niyyah_j20_shown')) {
  safeSetItem('niyyah_j20_shown', '1');
  setTimeout(function() {
    showToast('✦ Il te reste ' + Math.ceil(30 - _dsi) + ' jours d\'accès complet — découvre Niyyah+');
  }, 3000);
}
```

---

## 7. BISMILLAH — inchangé (beta)

`unlockPremium('BISMILLAH')` reste le seul moyen d'activer premium pendant la beta.
Aucune modification nécessaire.

---

## Trigger Claude Code

```
Lis SPEC-freemium-v2.md et applique-le intégralement.
Ajoute les fonctions utilitaires après isPremium().
Modifie regardeCapture, scannerCapture, showWeeklyBilan selon la SPEC.
Ajoute isKnowledgeUnlocked() sur les fonctions Connaissance listées.
Ajoute l'avertissement J20 dans renderAccueil().
npm run build && git add -A && git commit -m "freemium v2 - quotas IA + connaissance 30j"
```
