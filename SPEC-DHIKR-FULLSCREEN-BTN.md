# SPEC-DHIKR-FULLSCREEN-BTN

## Problème
Dans renderCounter(), les items _isDhikr (tasbih, istighfar) utilisent
fullscreenBtn qui vaut '' — donc pas de bouton visible.
Il faut un bouton dédié _fsBtnDhikr avec stopPropagation.

## Modification script.js — dans renderCounter(), bloc if (_isDhikr)

Trouve exactement :
```
  if (_isDhikr) {
    var _dhikrLabel = done ? (count + ' / ' + item.target + ' \u2713') : (count + ' / ' + item.target);
    return
```

Insère AVANT le return :
```
    var _fsBtnDhikr = '<button class="btn-tasbih-fs" aria-label="Plein écran" onclick="event.stopPropagation();openTasbih(\'' + item.id + '\',' + item.target + ',\'' + labelEsc + '\',\'' + arabicEsc + '\',\'' + _phoneticEscFs + '\',\'' + _transEscFs + '\',\'' + _srcEscFs + '\')" title="Ouvrir compteur"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C8A84A" stroke-width="1.8" stroke-linecap="round" style="pointer-events:none"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/></svg></button>';
```

Puis dans le return du bloc _isDhikr, remplace :
```
+ audioBtn + fullscreenBtn + '</div>';
```
Par :
```
+ audioBtn + _fsBtnDhikr + '</div>';
```

## Trigger
```
Lis SPEC-DHIKR-FULLSCREEN-BTN.md et applique-le.
npm run build && git add -A && git commit -m "fix: bouton fullscreen dhikr avec stopPropagation et escape correct"
```
