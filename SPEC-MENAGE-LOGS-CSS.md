# SPEC — Ménage : logs de debug + classes CSS mortes

## Contexte
Suite à l'audit technique global (2026-07-13), deux points de nettoyage
mineurs mais à traiter :
1. Des `console.log` de debug oubliés en production dans script.js
2. ~210 classes CSS potentiellement mortes dans style.css (restes de
   features supprimées/renommées)

## 1. Supprimer les console.log de debug dans script.js

Supprimer (ou commenter proprement si tu préfères garder une trace) les
lignes suivantes, identifiées comme debug oublié, PAS défensif :

- L15780-15782 : les `console.log('[murmure debug]'...)` (2 lignes)
- L17305 à L17371 : les 9 occurrences `console.log`/`console.warn('[Aid]'...)`
- L1424 : `console.log('[Niyyah] Parcours starts'...)`
- L13273 : `console.log('[RESET] tawhid_jour supprimé'...)`
- L17605 : `console.log('Bab an-Nafs content loaded'...)`
- L19986 : `console.log('[Mashhurat] merged'...)`

NE PAS toucher aux `console.warn`/`console.error` marqués défensifs dans
l'audit (L87, L933, L4423, L13041, L13114, L20964) — ils servent à capter
de vraies erreurs runtime en prod, ils doivent rester.

## 2. Nettoyer les classes CSS mortes dans style.css

Avant de supprimer quoi que ce soit : ATTENTION, l'audit précédent a
signalé ~10-20% de faux positifs possibles (classes injectées via
template literals JS). Donc pour chaque classe de la liste ci-dessous,
refaire une recherche ciblée (grep) dans script.js ET index.html avant
suppression, pour confirmer qu'elle n'est vraiment plus référencée nulle
part (y compris dans des chaînes construites dynamiquement, ex:
'btn-' + type).

Liste des classes à vérifier puis supprimer si confirmées mortes :
next-prayer-text, next-prayer-name, btn-ramadan-icon, btn-theme,
hero-label, locked-screen, lock-ring, lock-title, lock-sub,
btn-bismillah, popup-icon, popup-title, popup-sub, popup-btn,
streak-card, medal-trio, medal-cell, e-bronze, e-silver, e-gold,
stats-row, stat-box
(+ le reste de la liste des ~210, à obtenir via une nouvelle recherche
classes déclarées dans style.css vs utilisées dans script.js/index.html)

Supprime uniquement les classes confirmées mortes après double-vérification.
En cas de doute sur une classe, la laisser en place plutôt que risquer de
casser un affichage.

## Build & commit

```bash
npm run build
git add -A && git commit -m "chore: nettoyage logs debug oublies + classes CSS mortes confirmees"
git rm SPEC-MENAGE-LOGS-CSS.md
git commit -m "chore: remove applied spec"
git push
```
