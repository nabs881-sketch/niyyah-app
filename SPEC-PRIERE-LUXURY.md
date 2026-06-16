# SPEC-PRIERE-LUXURY — Redesign luxury onglet Ma Prière

## Objectif
Refondre visuellement l'onglet Ma Prière (horaires + Qibla) pour le rendre cohérent avec le design system luxury de l'app : Cormorant Garamond, Scheherazade New, gold #C8A84A, palette sombre chaude.

---

## 1. HEADER

```css
/* Titre arabe */
font-family: 'Scheherazade New', serif;
font-size: 32px;
color: #C8A84A;
text-align: center;

/* "PRIÈRE" */
font-family: 'Cormorant Garamond', serif;
font-size: 13px;
letter-spacing: 3px;
color: #C8A84A;
text-align: center;
margin-top: 6px;

/* Sous-titre */
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 12px;
color: rgba(232,217,188,0.45);
text-align: center;
margin-top: 4px;
```

---

## 2. CARDS — Style commun

```css
background: rgba(255,255,255,0.04);
border: 0.5px solid rgba(200,168,74,0.25);
border-radius: 14px;
padding: 16px;
margin-bottom: 12px;
```

Labels de section (ex: "HORAIRES — AUJOURD'HUI", "QIBLA — DIRECTION DE LA MECQUE") :
```css
font-family: 'Cormorant Garamond', serif;
font-size: 10px;
letter-spacing: 2.5px;
color: #C8A84A;
margin-bottom: 10px;
```

---

## 3. CARTE HORAIRES

### 3a. Bloc "Prochaine prière"
```css
/* Conteneur */
background: rgba(200,168,74,0.08);
border: 0.5px solid rgba(200,168,74,0.4);
border-radius: 10px;
padding: 12px 14px;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 14px;

/* Label "PROCHAINE" */
font-size: 10px;
letter-spacing: 2px;
color: rgba(200,168,74,0.6);
font-family: 'Cormorant Garamond', serif;

/* Nom de la prière */
font-size: 22px;
font-weight: 600;
color: #e8d9bc;
font-family: 'Cormorant Garamond', serif;

/* Countdown "dans 3h 14min" */
font-size: 11px;
color: rgba(232,217,188,0.5);
font-style: italic;
font-family: 'Cormorant Garamond', serif;

/* Heure à droite */
font-size: 28px;
font-weight: 300;
color: #C8A84A;
font-family: 'Cormorant Garamond', serif;
letter-spacing: 1px;
```

### 3b. Grille 5 prières
```css
/* Conteneur grille */
display: grid;
grid-template-columns: repeat(5, 1fr);
gap: 6px;

/* Item inactif */
text-align: center;
padding: 8px 4px;
border-radius: 8px;

/* Nom prière (inactif) */
font-size: 9px;
letter-spacing: 1.5px;
color: rgba(232,217,188,0.5);
font-family: 'Cormorant Garamond', serif;
margin-bottom: 5px;

/* Heure prière (inactif) */
font-size: 15px;
font-weight: 600;
color: #e8d9bc;
font-family: 'Cormorant Garamond', serif;

/* Item ACTIF */
background: #C8A84A;
border-radius: 8px;

/* Nom prière (actif) */
color: rgba(13,11,8,0.65);

/* Heure prière (actif) */
color: #0d0b08;
```

### 3c. Séparateur + Qiyâm al-layl
```css
/* Séparateur */
height: 0.5px;
background: rgba(200,168,74,0.15);
margin: 4px 0 8px;

/* Conteneur Qiyâm */
display: flex;
justify-content: space-between;
align-items: center;
padding-top: 4px;

/* Label */
font-size: 11px;
color: rgba(232,217,188,0.4);
font-style: italic;
font-family: 'Cormorant Garamond', serif;
/* Pas d'emoji — remplacer par texte pur "Qiyâm al-layl — Dernier tiers" */

/* Heure */
font-size: 15px;
color: rgba(200,168,74,0.7);
font-family: 'Cormorant Garamond', serif;
```

---

## 4. CARTE QIBLA

La section Qibla reste **pliable** (toggle existant conservé).

Seul le header de la carte est restyled :
```css
/* Header toggle */
display: flex;
justify-content: space-between;
align-items: center;
cursor: pointer;

/* Label (même style que les autres labels de section) */
font-family: 'Cormorant Garamond', serif;
font-size: 10px;
letter-spacing: 2.5px;
color: #C8A84A;

/* Icône chevron */
color: rgba(200,168,74,0.5);
font-size: 14px;
```

Le contenu intérieur (compass, disclaimer, calibration) conserve les styles appliqués dans la session précédente (Cormorant italic, or à 50%/40%).

---

## 5. CTA "Prier mieux"

```css
/* Conteneur */
background: rgba(200,168,74,0.06);
border: 0.5px solid rgba(200,168,74,0.2);
border-radius: 14px;
padding: 14px 16px;
display: flex;
align-items: center;
gap: 12px;
cursor: pointer;

/* Icône cercle */
width: 36px;
height: 36px;
border-radius: 50%;
border: 0.5px solid rgba(200,168,74,0.4);
display: flex;
align-items: center;
justify-content: center;
flex-shrink: 0;
/* Icône SVG stroke: #C8A84A */

/* Titre */
font-size: 15px;
font-weight: 400;
color: #e8d9bc;
font-family: 'Cormorant Garamond', serif;

/* Sous-titre */
font-size: 11px;
color: rgba(232,217,188,0.4);
font-style: italic;
font-family: 'Cormorant Garamond', serif;
margin-top: 2px;

/* Chevron › */
color: rgba(200,168,74,0.5);
font-size: 14px;
margin-left: auto;
```

---

## 6. RÈGLES GÉNÉRALES

- Supprimer tous les emojis restants dans cet onglet (🕌, 🌙, ✦, etc.) → remplacer par texte pur ou SVG gold
- Fond général de l'onglet : #0d0b08
- Couleur texte principal : #e8d9bc
- Espacements entre cards : 12px
- Padding body : 16px
- Aucune nouvelle dépendance
- **npm run build** obligatoire après toute modification de script.js, style.css

---

## Trigger Claude Code

```
Lis SPEC-PRIERE-LUXURY.md et applique-le
```
