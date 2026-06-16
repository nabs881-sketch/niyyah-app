# SPEC-REGARD-MAJORELLE-3 (Regard du vendredi → bleu Majorelle)

## Cible
`style.css` — **ajouter le bloc à la fin.** CSS uniquement.
⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.
Couvre la carte « REGARD DU VENDREDI » + le modal الجُمُعَة (« Aucun Regard… » / favoris).

## Bloc à ajouter
```css
/* ===== REGARD Majorelle — Regard du vendredi (Au fil du jour) ===== */
/* carte : fond + halo qui respire (animation bleue dédiée, sans toucher cardHaloBreath) */
.vendredi-regard-card{
  background:linear-gradient(135deg,rgba(90,140,210,0.07),rgba(90,140,210,0.02))!important;
  animation:vendrediBlueBreath 3.4s ease-in-out infinite!important;
}
@keyframes vendrediBlueBreath{
  0%,100%{ box-shadow:inset 0 0 0 1px rgba(120,165,215,0.4),0 0 16px rgba(80,130,200,0.22); }
  50%{ box-shadow:inset 0 0 0 1px rgba(140,180,225,0.55),0 0 22px rgba(90,140,210,0.34); }
}
.vendredi-regard-card [style*="200,168,75"]{ color:rgba(160,190,230,0.7)!important; }

/* modal الجُمُعَة (calligraphie, labels, favoris, croix, chevron) */
.vendredi-regard-overlay{ border-color:rgba(110,160,215,0.3)!important; }
.vendredi-regard-overlay [style*="C8A84A"]{ color:#AFC9EC!important; }
.vendredi-regard-overlay [style*="D4AF37"]{ color:#BFD6F2!important; }
.vendredi-regard-overlay [style*="200,168,75"]{ color:rgba(160,190,230,0.6)!important; }
.vendredi-regard-overlay [style*="200,168,75,0.15"]{ border-color:rgba(110,160,215,0.2)!important; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "Regard Majorelle: carte + modal Regard du vendredi en bleu"
git push
```

> Le texte crème (« Vendredi de paix… », « Aucun Regard… ») reste crème (lisible). Seuls les accents
> dorés passent en bleu. Le halo de la carte continue de respirer, en Majorelle.
