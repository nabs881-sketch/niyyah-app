# SPEC-NAFS-POLICES (agrandir les textes NAFS — lisibilité)

## Cible
`style.css` — ajouter le bloc À LA FIN. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## Bloc à ajouter
```css
/* ===== NAFS — lisibilité (polices agrandies) ===== */
.nafs-season-label{ font-size:13.5px; }
.nafs-name-translit{ font-size:16px; }
.nafs-section-label{ font-size:13px; }
.nafs-section-text{ font-size:18px; line-height:1.55; }
.nafs-reference-text{ font-size:17px; line-height:1.7; }
.nafs-reference-source{ font-size:13px; }
.nafs-action-text{ font-size:17.5px; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "NAFS: polices agrandies (lisibilite)"
git push
```

> Définition, citation, signal et action montent à 17-18px. Si tu veux encore plus, dis-moi quel élément.
