# SPEC-WIRD-DEDUP

## Objectif (option A)
Éviter que l'utilisateur refasse dans le Wird des actes déjà faits après la prière (Âyat al-Kursî, Muʿawwidhât, Istighfâr).
→ Dans `renderWird` : auto-cocher ces actes s'ils sont déjà validés dans le rituel du jour + afficher une note « déjà fait, une seule fois suffit ».

Base : `spiritual_v2` (actes post-prière) et `wirdState` se réinitialisent le même jour → synchro cohérente.

## Cible : script.js — fonction `renderWird` (~ligne 4090)

### Edit 1 — pré-passe d'auto-coche
Juste APRÈS la ligne :
```
  var _sessions = _currentWirdSession ? [_currentWirdSession] : ['matin', 'soir'];
```
INSÉRER :
```js
  var _wirdDup = { w_ayat_kursi:'ayat_kursi', w_ayat_kursi_s:'ayat_kursi', w_ikhlass_m:'muawwidhat', w_falaq_m:'muawwidhat', w_nas_m:'muawwidhat', w_ikhlass_s:'muawwidhat', w_falaq_s:'muawwidhat', w_nas_s:'muawwidhat', w_istighfar_m:'istighfar' };
  var _spState = (typeof safeParseJSON === 'function') ? safeParseJSON('spiritual_v2', {}) : {};
  var _wirdDupChanged = false;
  _sessions.forEach(function(_ses){ (WIRD_DATA[_ses].items||[]).forEach(function(_it){ var _k=_wirdDup[_it.id]; if(_k && _spState[_k] && !wirdState[_it.id]){ wirdState[_it.id]=true; _wirdDupChanged=true; } }); });
  if (_wirdDupChanged && typeof saveWirdState === 'function') saveWirdState();
```

### Edit 2 — calcul de la note (dans la boucle des items)
Remplacer la ligne :
```
      const checked = !!wirdState[item.id];
```
par :
```
      const checked = !!wirdState[item.id];
      const dupNote = (_wirdDup[item.id] && _spState[_wirdDup[item.id]]) ? '<div class="wird-dup-note">\u2713 D\u00e9j\u00e0 fait apr\u00e8s ta pri\u00e8re \u00b7 une seule fois suffit</div>' : '';
```

### Edit 3 — insérer la note dans le corps de l'item
Dans la grande ligne `html += ...wird-item...`, remplacer :
```
<div class="wird-arabic">${item.arabic}</div></div>
```
par :
```
<div class="wird-arabic">${item.arabic}</div>${dupNote}</div>
```

## Cible : style.css — ajouter la règle de la note
Ajouter (par ex. juste après la règle `.wird-arabic { ... }`) :
```css
.wird-dup-note {
  font-size:11px;
  font-style:italic;
  color:rgba(200,168,74,0.72);
  margin-top:4px;
  line-height:1.4;
}
```

## Effet
- Si l'utilisateur a validé Âyat al-Kursî / les Muʿawwidhât / l'Istighfâr après sa prière → dans le Wird ces items sont déjà cochés, avec la note « ✓ Déjà fait après ta prière · une seule fois suffit ».
- S'il n'a rien fait après la prière → items normaux, à cocher dans le Wird.
- Compteur du wird cohérent (la pré-passe coche avant le calcul `done/total`).

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "feat(wird): auto-coche + note pour actes deja faits apres la priere (dedup rituel/wird)"
```
