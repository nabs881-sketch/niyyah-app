# SPEC-JOURNAL-OCRE-SOMBRE (page Journal — sombre + accents ocre Marrakech)

## Cible
`style.css`. ⚠️ caché par le SW → `npm run build` AVANT le commit. Ne touche QUE `#view-journal`.

## Étape 1 — RETIRER l'ancien bloc « fond plein »
Supprime de `style.css` tout le bloc précédent qui commence par :
```
/* ===== OCRE MARRAKECH PLEIN — page Journal ===== */
```
(jusqu'à la fin de ce bloc). C'est lui qui mettait le fond orange moche.

## Étape 2 — AJOUTER ce bloc à la fin de `style.css`
```css
/* ===== OCRE MARRAKECH — page Journal (accents sur fond sombre) ===== */
.journal-screen{
  background:radial-gradient(ellipse at center top,#160b06 0%,#050302 100%)!important;
}
.journal-arabic-title{
  color:rgba(199,107,58,0.92)!important;
  text-shadow:0 0 22px rgba(199,107,58,0.32)!important;
}
#view-journal [style*="C8A84A"]{ color:#C76B3A!important; }
#view-journal svg[stroke="#C8A84A"]{ stroke:#C76B3A!important; }
#view-journal [style*="D4AF37"]{ color:#D98B57!important; }
#journal-back-btn{ border-color:rgba(199,107,58,0.38)!important; }
#journal-back-btn svg{ stroke:#C76B3A!important; }
/* onglets : inactif (bord/texte) + actif (gradient or → ocre) */
#view-journal #journal-tabs [role="tab"]{
  border-color:rgba(199,107,58,0.22)!important;
  color:rgba(216,139,87,0.6)!important;
}
#view-journal #journal-tabs [style*="212,181,98"]{
  background:linear-gradient(180deg,rgba(199,107,58,0.22) 0%,rgba(150,74,42,0.14) 100%)!important;
  border-color:rgba(224,151,94,0.5)!important;
  color:#F0C49A!important;
  box-shadow:0 2px 8px rgba(0,0,0,0.35),inset 0 1px 0 rgba(255,210,170,0.12)!important;
}
/* recherche (overlays) */
#niyyah-journal-search,#regarde-journal-search{
  color:#E0975E!important;
  border-color:rgba(199,107,58,0.22)!important;
  background:rgba(199,107,58,0.05)!important;
}
/* cartes générées : fond/bordure or → ocre, texte → ocre clair */
#journal-content > div[style*="200,168,75"]{
  background:rgba(199,107,58,0.07)!important;
  border-color:rgba(199,107,58,0.22)!important;
}
#journal-content [style*="200,168,75,0.08"]{ background:rgba(199,107,58,0.09)!important; }
#journal-content svg[stroke*="200,168,75"]{ stroke:rgba(199,107,58,0.35)!important; }
/* étoile favori */
#journal-content [style*="top:8px;right:8px"]{ color:#D98B57!important; }
/* état vide : glyphe + titre + sous-texte en ocre */
#journal-content .empty-state-glyph{ color:rgba(199,107,58,0.4)!important; }
#journal-content .empty-state-title{ color:#D98B57!important; }
#journal-content .empty-state-text,
#journal-content [style*="200,168,75,0.45"]{ color:rgba(216,139,87,0.72)!important; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "page Journal: sombre + accents ocre Marrakech (remplace le fond plein)"
git push
```

> Réversible : supprime ce bloc = retour à l'or d'origine.
