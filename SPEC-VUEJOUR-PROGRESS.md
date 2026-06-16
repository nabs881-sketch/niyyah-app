# SPEC-VUEJOUR-PROGRESS (progression douce + état accompli serein)

## Ce que ça fait
1. Une **barre de progression douce** en haut de « Au Fil du Jour » (« Le jour s'habite · X gestes posés »).
2. L'état **accompli** devient serein dans les deux vues : check doré avec **✓**, léger fondu (0.3→0.6),
   et **plus aucun texte barré** (ni label, ni du'â, ni arabe).
(Couleur des cartes inchangée. Le compteur par catégorie existe déjà.)

## Cible
`script.js` (barre) + `style.css` (état accompli + styles barre). ⚠️ cachés par le SW → **`npm run build` AVANT le commit.**

## 1 — script.js : barre de progression
CHERCHER :
```
  };
  var _html = '';
  _catOrder.forEach(function(cat) {
```
REMPLACER PAR :
```
  };
  var _filDone = items.filter(function(it){ return !!state[it.id]; }).length;
  var _filTotal = items.length;
  var _filPct = _filTotal ? Math.round(_filDone/_filTotal*100) : 0;
  var _html = '<div class="fil-progress"><div class="fil-progress-row"><span class="fil-progress-label">Le jour s\'habite</span><span class="fil-progress-count">' + _filDone + ' geste' + (_filDone>1?'s':'') + ' pos\u00e9' + (_filDone>1?'s':'') + '</span></div><div class="fil-progress-track"><div class="fil-progress-fill" style="width:' + _filPct + '%;"></div></div></div>';
  _catOrder.forEach(function(cat) {
```

## 2 — style.css : état accompli (3 remplacements)
### 2a — fondu plus doux
CHERCHER :
```
.fil-acc .rituel-item.done,
#vue-rituel .rituel-item.done {
  opacity: 0.3;
}
```
REMPLACER PAR :
```
.fil-acc .rituel-item.done,
#vue-rituel .rituel-item.done {
  opacity: 0.6;
}
```
### 2b — ne plus barrer le label
CHERCHER :
```
.fil-acc .rituel-item.done .label,
#vue-rituel .rituel-item.done .label {
  text-decoration: line-through;
  text-decoration-color: rgba(200,168,75,0.35);
}
```
REMPLACER PAR :
```
.fil-acc .rituel-item.done .label,
#vue-rituel .rituel-item.done .label {
  text-decoration: none;
}
```
### 2c — ne plus barrer sous-titre/arabe
CHERCHER :
```
.fil-acc .rituel-item.done .sub,
.fil-acc .rituel-item.done .arabic,
#vue-rituel .rituel-item.done .sub,
#vue-rituel .rituel-item.done .arabic {
  text-decoration: line-through;
  text-decoration-color: rgba(200,168,75,0.2);
}
```
REMPLACER PAR :
```
.fil-acc .rituel-item.done .sub,
.fil-acc .rituel-item.done .arabic,
#vue-rituel .rituel-item.done .sub,
#vue-rituel .rituel-item.done .arabic {
  text-decoration: none;
}
```

## 3 — style.css : ajouter ce bloc À LA FIN (✓ doré + styles barre)
```css
/* ===== Vue du jour — check accompli + progression ===== */
.rituel-item .check{ position:relative; }
.rituel-item.done .check::after{
  content:''; position:absolute; left:8px; top:4px;
  width:5px; height:10px; border:solid #2A1E08; border-width:0 2px 2px 0;
  transform:rotate(45deg);
}
.fil-progress{ margin-bottom:24px; }
.fil-progress-row{ display:flex; justify-content:space-between; align-items:baseline; margin-bottom:8px; }
.fil-progress-label{ font-family:'Cormorant Garamond',serif; font-style:italic; font-size:14px; color:rgba(240,234,214,0.6); }
.fil-progress-count{ font-family:'Nunito',sans-serif; font-size:12px; letter-spacing:1px; color:rgba(200,168,74,0.75); }
.fil-progress-track{ height:4px; border-radius:4px; background:rgba(200,168,74,0.12); overflow:hidden; }
.fil-progress-fill{ height:100%; background:linear-gradient(90deg,#B8923E,#E8C66C); }
```

## Build + commit
```
npm run build
git add script.js script.min.js style.css style.min.css sw.js && git commit -m "vue du jour: progression douce + etat accompli serein (check doré, plus de barré)"
git push
```

> L'état accompli (check ✓ + fondu doux, sans barré) s'applique aux DEUX vues. La barre de progression
> est sur « Au Fil du Jour » ; si tu la veux aussi sur « Vue du Jour », dis-moi et je te fais le complément.
