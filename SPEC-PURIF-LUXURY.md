# SPEC-PURIF-LUXURY — Redesign luxury overlays Wudu, Tayammum, Qasr

## Objectif
Refondre visuellement les 3 overlays de purification pour les aligner sur le design system luxury. Aucune modification de la logique.

---

## Règles communes aux 3 overlays

```css
/* Fond */
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

/* Sous-titre italic */
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 16px;
color: rgba(232,217,188,0.4);
text-align: center;
margin-bottom: 24px;

/* Labels blocs (CONDITIONS, ÉTAPES, etc.) */
font-family: 'Cormorant Garamond', serif;
font-size: 12px;
letter-spacing: 2.5px;
color: rgba(200,168,74,0.6);
margin: 20px 0 10px;

/* Items liste */
font-family: 'Cormorant Garamond', serif;
font-size: 17px;
color: #e8dfc8;
padding: 13px 0;
border-bottom: 0.5px solid rgba(200,168,74,0.08);
line-height: 1.5;

/* Numéros étapes */
font-size: 13px;
color: rgba(200,168,74,0.5);
margin-right: 12px;
font-style: italic;

/* Note discrète */
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 14px;
color: rgba(200,168,74,0.4);
text-align: center;
margin-top: 20px;
padding: 14px 16px;
border: 0.5px solid rgba(200,168,74,0.15);
border-radius: 10px;
background: rgba(200,168,74,0.04);

/* Source */
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 13px;
color: rgba(232,217,188,0.2);
text-align: center;
margin-top: 20px;
```

---

## Spécifique Qasr — tableau NORMALE / EN VOYAGE

```css
/* Header colonnes */
font-size: 13px;
letter-spacing: 2px;
color: rgba(200,168,74,0.5);

/* Nom prière */
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
font-weight: 600;
color: #e8dfc8;

/* Valeur normale */
font-size: 16px;
color: rgba(232,217,188,0.4);

/* Valeur voyage (réduite) */
font-size: 16px;
color: #C8A84A;
font-weight: 600;

/* Valeur inchangée */
font-size: 16px;
color: rgba(232,217,188,0.25);
font-style: italic;
```

---

## Règles
- Aucune modification de la logique
- Aucune nouvelle dépendance
- npm run build + git push après modifications

## Trigger Claude Code

```
Lis SPEC-PURIF-LUXURY.md et applique-le
```
