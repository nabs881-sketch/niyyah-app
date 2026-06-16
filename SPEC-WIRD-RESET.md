# SPEC-WIRD-RESET

## Objectif
Bouton « Réinitialiser » du wird : (1) corriger le double ↺, (2) le rendre luxe (gold raffiné).

## 1. Fix double ↺ — script.js
Ligne ~4105, dans le rendu du bouton reset. Le libellé `settings_reset` contient déjà `↺`, donc on retire le `\u21ba` codé en dur.

Remplacer :
```
">\u21ba ${t('settings_reset')}</button>
```
par :
```
">${t('settings_reset')}</button>
```
(ne garder QUE `${t('settings_reset')}` comme contenu du bouton — le ↺ vient du libellé)

## 2. Style luxe — style.css
Remplacer entièrement la règle `.wird-reset-btn { ... }` (vers ligne 3045) par :

```css
.wird-reset-btn {
  margin:14px 16px 0;
  padding:11px;
  width:calc(100% - 32px);
  border-radius:12px;
  border:1px solid rgba(200,168,74,0.28);
  background:linear-gradient(180deg, rgba(200,168,74,0.06), rgba(200,168,74,0.02));
  color:#C8A84A;
  font-size:11px;
  letter-spacing:2.5px;
  text-transform:uppercase;
  cursor:pointer;
  font-family:var(--sans);
  transition:border-color .25s ease, background .25s ease, box-shadow .25s ease;
}
.wird-reset-btn:hover,
.wird-reset-btn:active {
  border-color:rgba(200,168,74,0.55);
  background:linear-gradient(180deg, rgba(200,168,74,0.13), rgba(200,168,74,0.04));
  box-shadow:0 0 18px rgba(200,168,74,0.18);
}
```

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "style(wird): bouton reset luxe gold + fix double fleche"
```
