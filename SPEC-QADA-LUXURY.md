# SPEC-QADA-LUXURY — Redesign luxury overlay Prières à rattraper

## Objectif
Refondre visuellement openQada() et renderQadaBody() pour les aligner sur le design system luxury de l'app.

---

## 1. OVERLAY — openQada()

```css
background: #0a0a0f;

/* Titre arabe */
font-family: 'Scheherazade New', serif;
font-size: 48px;
color: #C8A84A;
text-align: center;

/* Titre français */
font-family: 'Cormorant Garamond', serif;
font-size: 28px;
color: #e8dfc8;
text-align: center;

/* Sous-titre */
font-style: italic;
font-size: 15px;
color: rgba(232,217,188,0.4);
text-align: center;
```

---

## 2. RÉSUMÉ — "Reste N prière(s) à rattraper"

```css
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 16px;
color: #C8A84A;
text-align: center;
margin-bottom: 20px;
```

---

## 3. LIGNES PRIÈRES (Fajr → Isha)

```css
/* Conteneur ligne */
display: flex;
justify-content: space-between;
align-items: center;
padding: 16px 0;
border-bottom: 0.5px solid rgba(200,168,74,0.1);

/* Nom prière */
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
font-weight: 600;
color: #e8dfc8;
```

---

## 4. CHAMP NUMÉRIQUE

```css
background: rgba(200,168,74,0.08);
border: 0.5px solid rgba(200,168,74,0.3);
border-radius: 10px;
color: #C8A84A;
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
text-align: center;
width: 60px;
height: 44px;
```

---

## 5. BOUTON − 1

```css
background: rgba(200,168,74,0.06);
border: 0.5px solid rgba(200,168,74,0.2);
border-radius: 10px;
color: rgba(200,168,74,0.7);
font-size: 18px;
width: 52px;
height: 44px;
cursor: pointer;
```

---

## 6. NOTE LÉGALE

```css
font-style: italic;
font-size: 12px;
color: rgba(232,217,188,0.25);
text-align: center;
margin-top: 24px;
```

---

## Règles
- Aucune modification de la logique (_qadaSet, _qadaDec, _qadaState, _qadaSave)
- Aucune nouvelle dépendance
- npm run build + git push après modifications

## Trigger Claude Code

```
Lis SPEC-QADA-LUXURY.md et applique-le
```
