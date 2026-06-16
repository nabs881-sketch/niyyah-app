# SPEC-WIRD-BACK

## Problème
Sur l'écran Wird, deux boutons retour se superposent en haut-gauche :
- `#v2-back-btn` (topbar globale) → va au Sanctuaire.
- `.wird-back-btn` (propre au wird) → revient au Rituel (`wirdGoBack`).

On garde celui du wird (retour contextuel correct) et on **masque le bouton global sur le wird uniquement**.

## Cible : script.js (2 retouches)

### 1. Fonction `v2GoTo` (~ligne 11981)
Dans le bloc `if (viewName !== 'bab-an-nafs') { ... }`, remplacer :
```
    var backBtn = document.getElementById('v2-back-btn');
    if (backBtn) backBtn.classList.add('visible');
```
par :
```
    var backBtn = document.getElementById('v2-back-btn');
    if (backBtn && viewName !== 'wird') backBtn.classList.add('visible');
```

### 2. Fonction `setupTopUI` (~ligne 11885)
Remplacer la ligne :
```
    case 'wird': case 'checklist': case 'progression': if (tbEl) { tbEl.classList.add('active'); tbEl.classList.add('secondary'); } if (backBtn) backBtn.classList.add('visible'); break;
```
par :
```
    case 'wird': if (tbEl) { tbEl.classList.add('active'); tbEl.classList.add('secondary'); } break;
    case 'checklist': case 'progression': if (tbEl) { tbEl.classList.add('active'); tbEl.classList.add('secondary'); } if (backBtn) backBtn.classList.add('visible'); break;
```

## Effet
Sur le wird : seul `.wird-back-btn` reste (retour au Rituel). `checklist` et `progression` gardent le bouton global. Plus de superposition.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "fix(wird): supprime double bouton retour (masque v2-back-btn sur le wird)"
```
