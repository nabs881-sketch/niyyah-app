# SPEC-ALHAYA-ICONE-B

## Cible
`index.html` — l'icône du bouton al-Haya (masquage écran).
Le **même SVG** apparaît à **2 endroits** :
- `#topbar-alhaya-btn` (barre du haut)
- `#alhaya-btn` (bouton fixe hors vues)

## But
Remplacer le glyphe « œil barré » (eye-off générique) par le glyphe **« regard baissé »**
(œil clos + cils baissés = *ghadd al-basar* / pudeur). Or champagne `#E8CF8A` + glow or discret,
baké inline → aucun CSS à modifier.

---

## Action
Dans `index.html`, remplacer **les 2 occurrences** de ce SVG :

```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
```

par :

```html
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8CF8A" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" style="filter:drop-shadow(0 0 4px rgba(212,175,55,0.55));"><path d="M3.5 10.5 C8 16.5 16 16.5 20.5 10.5"/><path d="M6.5 14.4 5.4 17.4"/><path d="M12 15.6 12 18.8"/><path d="M17.5 14.4 18.6 17.4"/></svg>
```

(Les deux sont strictement identiques → un remplacement global sur cette chaîne suffit.
Ne pas toucher aux wrappers `<button>`, ni aux `opacity`, ni aux `onclick`.)

---

## Vérif attendue
```
grep -c "M3.5 10.5 C8 16.5" index.html
```
Attendu : **2**. Et plus aucune occurrence de l'ancien `M1 12s4-8 11-8` :
```
grep -c "M1 12s4-8 11-8" index.html
```
Attendu : **0**.

Visuel : l'icône en haut à gauche montre un œil clos aux cils baissés, or champagne, léger halo.

## Build (OBLIGATOIRE — index.html est dans le cache SW)
```
npm run build
git add -A
git commit -m "ui: icone al-Haya regard baisse (ghadd al-basar) or champagne + glow"
git push
```
