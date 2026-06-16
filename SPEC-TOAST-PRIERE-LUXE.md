# SPEC-TOAST-PRIERE-LUXE — Toast prière (et génériques) en premium-luxe

Fichier : style.css.

## Édit — remplacer la règle `.toast` de surcharge (vers L5380)
REMPLACER EXACTEMENT :
```css
.toast {
  background: rgba(44,46,52,0.98);
  border-color: rgba(200,168,74,0.28);
  color: #E8DCC0;
}
```
PAR :
```css
.toast {
  background: linear-gradient(180deg, rgba(36,32,28,0.98) 0%, rgba(26,23,21,0.98) 100%);
  border-color: rgba(200,168,75,0.34);
  color: #EBDBB0;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 15px;
  letter-spacing: 0.3px;
  box-shadow: 0 10px 34px rgba(0,0,0,0.5), 0 0 22px rgba(200,168,75,0.12), inset 0 1px 0 rgba(255,228,175,0.10);
}
```
(Il y a deux `.toast {` dans le fichier : celle à remplacer est celle avec
`background: rgba(44,46,52,0.98)`, PAS celle qui contient `position:fixed`.)

## Effet
Le toast d'appel à la prière (et tous les toasts) : fond chaud, Cormorant
italique, halo doré — cohérent avec les autres toasts luxe.

## Contraintes
- `npm run build` AVANT git commit.
