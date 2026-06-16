# SPEC-VUEJOUR-PROGRESS-2 (barre de progression aussi sur « Vue du Jour »)

## Pré-requis
Applique d'abord **SPEC-VUEJOUR-PROGRESS** (il fournit les styles `.fil-progress`). Celui-ci ajoute juste
la barre dans la « Vue du Jour » (`openVueRituel`, l'écran « APRÈS [prière] »).

## Ce que ça fait
Une barre douce en haut de la Vue du Jour : « Le moment s'habite · X / Y » + trait doré qui se remplit.

## Cible
`script.js`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Remplacement
CHERCHER :
```
  let html = '';
  // Bandeau prière avec toggles
```
REMPLACER PAR :
```
  var _vrTotal = normalItems.length;
  var _vrDone = normalItems.filter(function(it){ return !!state[it.id]; }).length;
  var _vrPct = _vrTotal ? Math.round(_vrDone/_vrTotal*100) : 0;
  let html = '<div class="fil-progress"><div class="fil-progress-row"><span class="fil-progress-label">Le moment s\'habite</span><span class="fil-progress-count">' + _vrDone + ' / ' + _vrTotal + '</span></div><div class="fil-progress-track"><div class="fil-progress-fill" style="width:' + _vrPct + '%;"></div></div></div>';
  // Bandeau prière avec toggles
```

## Build + commit
```
npm run build
git add script.js script.min.js sw.js && git commit -m "vue du jour: barre de progression du moment"
git push
```

> La barre compte les gestes du rituel de ce moment (hors items du vendredi). L'état accompli serein
> (check ✓, sans barré) s'applique déjà ici grâce au SPEC précédent.
