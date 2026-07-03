# SPEC-TAWHID-FIL-JOUR — Capsule Tawhid quotidienne dans le Fil du Jour

## Objectif
Ajouter un item `tawhid_jour` dans le Fil du Jour, cochable, comptabilisé dans tous les compteurs et le score hebdomadaire. Ouvre la capsule du jour (index rotatif sur 60) depuis `tawhid_capsules.json`.

---

## 1. LEVELS — Ajouter l'item tawhid_jour

Dans la liste LEVELS (près de sira, ghidaa_jour), ajouter :

```js
{
  id: 'tawhid_jour',
  minVague: 1,
  label: 'Fondement du jour',
  get sub() { return 'Lâ ilâha illâ Allâh'; },
  arabic: 'التَّوْحِيد',
  paths: ['reconnecter','routine','sacraliser'],
  block: 'jour',
  category: 'science',
  filDuJour: true
}
```

---

## 2. lectIds — Ajouter tawhid_jour au score hebdomadaire

Dans `_saveDailySnapshot` (ligne ~1840), dans le tableau `lectIds`, ajouter `'tawhid_jour'` :

```js
var lectIds = ['hadith1','duaa_jour','sira','quran_read','recits_coran',
               'fiqh_jour','savais_tu','ghidaa_jour','tibb_jour','tawhid_jour'];
```

---

## 3. Handler clic — Ouvrir la capsule du jour

Dans la fonction qui gère le clic sur les items de lecture du Fil du Jour (même pattern que sira), ajouter le cas `tawhid_jour` :

```js
if (id === 'tawhid_jour') {
  window._tawhidFromFil = true;
  var _dayIndex = Math.floor(Date.now() / 86400000) % 60;
  if (_tawhidCapsules.length === 0) {
    fetch('tawhid_capsules.json?v=' + (window.APP_VERSION || '1'))
      .then(function(r){ return r.json(); })
      .then(function(data){
        _tawhidCapsules = data;
        _tawhidIndex = _dayIndex;
        _renderTawhidOverlay();
      });
  } else {
    _tawhidIndex = _dayIndex;
    _renderTawhidOverlay();
  }
  return;
}
```

---

## 4. closeTawhid — Retour vers le Fil du Jour

Remplacer la fonction `closeTawhid` existante par :

```js
function closeTawhid() {
  if (window._tawhidFromFil) {
    window._tawhidFromFil = false;
    var el = document.getElementById('tawhid-overlay');
    if (el) el.remove();
    _knowledgeReturn('tawhid_jour');
    return;
  }
  var el = document.getElementById('tawhid-overlay');
  if (el) el.remove();
}
```

---

## 5. BUILD & COMMIT

```
npm run build
git add -A
git commit -m "feat: capsule Tawhid quotidienne Fil du Jour — cochable + score hebdo"
git rm SPEC-TAWHID-FIL-JOUR.md
git commit -m "clean: suppression SPEC-TAWHID-FIL-JOUR"
git push
```
