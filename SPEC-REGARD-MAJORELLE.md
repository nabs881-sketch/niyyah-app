# SPEC-REGARD-MAJORELLE (Regard = bleu Majorelle dans toute l'app)

## Cible
`style.css` — **ajouter le bloc à la fin.** CSS uniquement, aucune touche JS.
⚠️ style.css caché par le SW → **`npm run build` AVANT le commit.**
Réversible : retirer le bloc = retour à l'or. (Niyyah/intention reste en or partout, c'est voulu.)

## Palette Majorelle
texte fort `#AFC9EC` · texte clair `#BFD6F2` · label `#C2DBF5` · liseré `rgba(110,160,215,x)` ·
lueur `rgba(90,140,210,x)` · profond `rgba(40,80,140,x)`.

## Bloc à ajouter à la fin de `style.css`
```css
/* ===== REGARD = bleu Majorelle (toutes les surfaces) ===== */

/* 1 · Alerte / push نَظَر */
.regarde-alert-card{ border-color:rgba(110,160,215,0.35)!important; }
.regarde-alert-calligraphy{ color:#AFC9EC!important; }
.regarde-alert-title{ color:#AFC9EC!important; }
.regarde-alert-btn{ background:linear-gradient(180deg,#5E8FC4,#3E6EA5,#2A5080)!important; color:#EAF1FB!important; }

/* 2 · Bouton « OUVRIR LE REGARD » */
.regarde-open-btn{ border-color:rgba(110,160,215,0.45)!important; background:linear-gradient(180deg,rgba(80,130,200,0.16) 0%,rgba(40,80,140,0.07) 100%)!important; }
.regarde-open-btn:hover{ border-color:rgba(130,175,225,0.7)!important; }
.regarde-open-label{ color:#C2DBF5!important; text-shadow:0 1px 6px rgba(80,130,200,0.3)!important; }
.regarde-open-eye{ filter:drop-shadow(0 0 4px rgba(110,160,215,0.5))!important; }
.regarde-open-btn::before{ background:linear-gradient(100deg,transparent,rgba(200,225,255,0.16),transparent)!important; }

/* 3 · Bouton « MES REGARDS ✦ » */
#regarde-journal-btn{ border-color:rgba(110,160,215,0.4)!important; color:#9FC2E8!important; }

/* 4 · Écran scan du verset */
#regarde-screen [style*="C8A84A"], #regarde-content [style*="C8A84A"]{ color:#AFC9EC!important; }
#regarde-screen [style*="D4AF37"], #regarde-content [style*="D4AF37"]{ color:#BFD6F2!important; }
#regarde-content svg[stroke*="200,168,75"]{ stroke:rgba(140,180,225,0.5)!important; }

/* 5 · « Mes Regards » (overlay + liste) */
#regarde-journal-overlay [style*="D4AF37"]{ color:#BFD6F2!important; }
#regarde-journal-overlay [style*="C8A84A"]{ color:#AFC9EC!important; }
#regarde-journal-list > div[style*="200,168,75,0.03"]{ background:rgba(90,140,210,0.05)!important; border-color:rgba(110,160,215,0.18)!important; }
#regarde-journal-list [style*="200,168,75,0.08"]{ background:rgba(90,140,210,0.10)!important; }
#regarde-journal-list svg[stroke*="200,168,75"]{ stroke:rgba(140,180,225,0.4)!important; }
#regarde-journal-overlay .empty-state-glyph{ color:rgba(140,180,225,0.4)!important; }
#regarde-journal-overlay .empty-state-title{ color:#AFC9EC!important; }
#regarde-journal-overlay [style*="200,168,75,0.45"], #regarde-journal-overlay [style*="200,168,75,0.35"]{ color:rgba(160,190,230,0.6)!important; }

/* 6 · Détail d'un Regard */
#regarde-detail-overlay [style*="D4AF37"]{ color:#BFD6F2!important; }
#regarde-detail-overlay [style*="C8A84A"]{ color:#AFC9EC!important; }
#regarde-detail-overlay [style*="212,175,55"]{ border-color:rgba(110,160,215,0.3)!important; }
#regarde-detail-content [style*="200,168,75,0.05"]{ background:rgba(90,140,210,0.06)!important; border-color:rgba(110,160,215,0.2)!important; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "Regard = bleu Majorelle partout (alerte, scan, Mes Regards, detail, boutons)"
git push
```

> Petite exception connue : le flash plein écran de 1,8 s à l'ouverture du Regard (نَظَر créé en JS
> inline) reste doré — c'est transitoire. Si ça te gêne, je te le passe en bleu en 2 lignes (touche JS).
> Et si le bleu te paraît trop clair/froid, on le tire vers un Majorelle plus profond en ajustant les hex.
