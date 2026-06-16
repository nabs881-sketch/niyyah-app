# SPEC-FIDYA-LUXURY — Redesign luxury overlay Fidya & Kaffâra

## Objectif
Refondre visuellement openFidya() et renderFidyaBody() pour les aligner sur le design system luxury. Aucune modification de la logique de calcul.

---

## 1. OVERLAY

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
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 16px;
color: rgba(232,217,188,0.4);
text-align: center;
```

---

## 2. BLOC INTRO (Si tu peux rattraper...)

```css
background: rgba(200,168,74,0.06);
border: 0.5px solid rgba(200,168,74,0.2);
border-radius: 12px;
padding: 16px 18px;
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 15px;
color: rgba(232,217,188,0.5);
text-align: center;
margin-bottom: 20px;
```

---

## 3. LABELS SECTIONS (COÛT D'UN REPAS, FIDYA, KAFFÂRA...)

```css
font-family: 'Cormorant Garamond', serif;
font-size: 13px;
letter-spacing: 2.5px;
color: rgba(200,168,74,0.6);
margin: 20px 0 10px;
```

---

## 4. SOUS-TITRES SECTIONS (FIDYA · NON RATTRAPABLE, KAFFÂRA · RUPTURE VOLONTAIRE)

```css
font-family: 'Cormorant Garamond', serif;
font-size: 16px;
letter-spacing: 1.5px;
color: #C8A84A;
text-align: center;
padding: 10px 0;
border-top: 0.5px solid rgba(200,168,74,0.15);
border-bottom: 0.5px solid rgba(200,168,74,0.15);
margin: 16px 0 12px;
```

---

## 5. DESCRIPTIONS (Maladie chronique..., Jeûne rompu délibérément...)

```css
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 15px;
color: rgba(232,217,188,0.4);
text-align: center;
margin-bottom: 12px;
```

---

## 6. CHAMPS NUMÉRIQUES (coût repas, jours)

```css
background: rgba(200,168,74,0.08);
border: 0.5px solid rgba(200,168,74,0.3);
border-radius: 10px;
color: #C8A84A;
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
padding: 12px 16px;
width: 100%;
```

---

## 7. RÉSULTATS CALCULÉS (montant fidya, kaffâra)

```css
font-family: 'Cormorant Garamond', serif;
font-size: 26px;
font-weight: 300;
color: #C8A84A;
text-align: center;
margin-top: 12px;
```

---

## Règles
- Aucune modification de la logique de calcul
- Aucune nouvelle dépendance
- npm run build + git push après modifications

## Trigger Claude Code

```
Lis SPEC-FIDYA-LUXURY.md et applique-le
```
