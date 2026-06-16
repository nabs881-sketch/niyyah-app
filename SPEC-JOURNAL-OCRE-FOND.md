# SPEC-JOURNAL-OCRE-FOND (page Journal — fond ocre Marrakech plein)

## Cible
`style.css` — **ajouter le bloc ci-dessous à la toute fin du fichier.**
(Remplace l'essai « accents » précédent : si tu avais collé SPEC-JOURNAL-OCRE, supprime son bloc d'abord.)
⚠️ style.css est caché par le SW → `npm run build` AVANT le commit.
Ne touche QUE `#view-journal`. Réversible : supprimer le bloc = retour à l'or.

## Palette
Mur terracotta `#CA7C4F → #9C4C2A` · texte crème `#F8ECDC` · cartes crème `#F9F0E3` · texte brun `#6E3B1E`.

## Bloc à ajouter à la fin de `style.css`
```css
/* ===== OCRE MARRAKECH PLEIN — page Journal ===== */
.journal-screen{
  background:linear-gradient(180deg,#CA7C4F 0%,#B5613A 52%,#9C4C2A 100%)!important;
}
.journal-arabic-title{
  color:#F8ECDC!important;
  text-shadow:0 1px 10px rgba(60,25,8,0.4)!important;
}
/* titre JOURNAL + icônes dorées → crème */
#view-journal [style*="C8A84A"]{ color:rgba(248,236,220,0.92)!important; }
#view-journal svg[stroke="#C8A84A"]{ stroke:#F7E9D8!important; }
/* bouton retour */
#journal-back-btn{
  border-color:rgba(247,233,216,0.45)!important;
  background:rgba(74,30,12,0.25)!important;
}
#journal-back-btn svg{ stroke:#F7E9D8!important; }
/* onglets : inactif translucide ; actif (gradient or) → tomette crème */
#view-journal #journal-tabs [role="tab"]{
  background:rgba(74,30,12,0.18)!important;
  border-color:rgba(248,236,220,0.25)!important;
  color:rgba(248,236,220,0.72)!important;
}
#view-journal #journal-tabs [style*="212,181,98"]{
  background:#F3E4CF!important;
  border-color:rgba(248,236,220,0.7)!important;
  color:#7A3E1C!important;
  box-shadow:inset 0 1px 0 rgba(255,255,255,0.4)!important;
}
/* cartes générées : fond/bordure or → crème, ombre douce */
#journal-content > div[style*="200,168,75"]{
  background:rgba(249,240,227,0.95)!important;
  border-color:rgba(110,55,25,0.16)!important;
  box-shadow:0 2px 10px rgba(70,30,10,0.18)!important;
}
/* texte intention (or) → brun ; date (blanc) → brun clair */
#journal-content [style*="D4AF37"]{ color:#6E3B1E!important; }
#journal-content [style*="255,255,255,0.55"]{ color:rgba(90,45,20,0.6)!important; }
/* vignette + icône placeholder */
#journal-content [style*="200,168,75,0.08"]{ background:rgba(180,97,58,0.16)!important; }
#journal-content svg[stroke*="200,168,75"]{ stroke:rgba(150,74,42,0.55)!important; }
/* étoile favori : reste ocre (et non brun) */
#journal-content [style*="top:8px;right:8px"]{ color:#B5613A!important; }
/* état vide */
#journal-content .empty-state-glyph{ color:rgba(248,236,220,0.35)!important; }
#journal-content .empty-state-title{ color:#F8ECDC!important; }
#journal-content .empty-state-text,
#journal-content [style*="200,168,75,0.45"]{ color:rgba(248,236,220,0.82)!important; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "page Journal: fond ocre Marrakech plein (CSS isole, reversible)"
git push
```

> Note : les overlays plein écran « Mes Niyyah / Mes Regards » (fond noir) ne sont pas inclus —
> dis-moi si tu veux que je les passe aussi en ocre. Et si tu valides ce thème durablement,
> je peux le rendre propre (couleurs en dur dans le JS des cartes au lieu de l'override).
