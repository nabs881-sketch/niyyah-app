# SPEC-ZAKAT-CARD

## Cible
`script.js` — redesign de la carte « Calculer ma Zakât » du home (fonction
`renderZakatCard`). On remplace l'emoji ⚖️ par un médaillon doré + balance en trait
fin, et on passe la typo en Cormorant champagne, cohérent avec l'overlay luxe.

Indépendant des autres SPEC (peut s'appliquer dans n'importe quel ordre).

---

## Édit unique — remplacer `renderZakatCard`

Repérer `function renderZakatCard() {` et remplacer **toute la fonction** par :

```js
function renderZakatCard() {
  return '<div onclick="openZakat()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);overflow:hidden;">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;">'
    + '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="4.6" x2="12" y2="18"/><line x1="8.5" y1="18" x2="15.5" y2="18"/><line x1="5" y1="7" x2="19" y2="7"/><circle cx="12" cy="3.9" r="1.1"/><path d="M5 7 3 11M5 7 7 11M3 11a2 2 0 0 0 4 0"/><path d="M19 7 17 11M19 7 21 11M17 11a2 2 0 0 0 4 0"/></svg>'
    + '</div>'
    + '<div style="flex:1;min-width:0;">'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Calculer ma Zak\u00e2t</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Zak\u00e2t al-m\u00e2l \u00b7 2,5 % du patrimoine</div>'
    + '</div>'
    + '<div style="flex-shrink:0;color:rgba(232,206,138,0.5);font-size:18px;">\u2192</div>'
    + '</div>';
}
```

---

## Vérif attendue
- La carte du home affiche un **médaillon doré** (cercle à halo) avec une **balance
  de la justice en trait fin** au lieu de l'emoji.
- Titre « Calculer ma Zakât » en Cormorant or champagne, sous-titre en italique doré.
- Flèche → dorée. Bordure + ombre douce, fond dégradé chaud.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "zakat: carte home luxe (medaillon + balance trait fin)"
git push
```
