# SPEC-PRIERE-PALETTE — Refonte palette onglet Ma Prière

## Objectif
Remplacer la palette marron-chaude par un noir bleuté profond. Corrections visuelles complémentaires.

---

## 1. COULEURS GLOBALES

```css
/* Fond général de l'onglet (body ou wrapper #priere-view) */
/* Ancien : #0d0b08 (marron sombre) */
/* Nouveau : */
background: #0a0a0f;

/* Fond des cards */
/* Ancien : rgba(255,255,255,0.04) */
/* Nouveau : */
background: #111118;

/* Texte principal */
/* Ancien : #e8d9bc */
/* Nouveau : */
color: #e8dfc8;
```

---

## 2. TITRE ARABE

```css
/* Ancien : 32px */
/* Nouveau : */
font-size: 46px;
```

---

## 3. ICÔNE "CHOISIR LA VILLE"

Remplacer le crayon ✏️ + texte "Choisir la ville" par une icône SVG pin gold discrète :

```html
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round" style="opacity:0.4">
  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
  <circle cx="12" cy="9" r="2.5"/>
</svg>
```

Le tap sur cette icône conserve le comportement existant (champ ville).

---

## 4. BORDER-RADIUS CARDS

```css
/* Ancien : 14px */
/* Nouveau : */
border-radius: 18px;
```

---

## 5. ESPACEMENT CARDS PLIABLES

```css
/* Gap entre toutes les cards */
/* Ancien : 12px */
/* Nouveau : */
gap: 10px;
```

---

## Règles
- Appliquer ces changements uniquement à l'onglet Ma Prière (ne pas toucher aux autres onglets)
- Aucune nouvelle dépendance
- npm run build après modifications

## Trigger Claude Code

```
Lis SPEC-PRIERE-PALETTE.md et applique-le
```
