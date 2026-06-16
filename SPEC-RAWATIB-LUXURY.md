# SPEC-RAWATIB-LUXURY — Redesign luxury carte Sunna Rawatib

## Objectif
Refondre visuellement renderRawatibCard() pour l'aligner sur le design system luxury. Aucune modification de la logique.

---

## 1. HEADER COLONNES (PRIÈRE / AVANT / APRÈS)

```css
font-size: 13px;
letter-spacing: 2px;
color: rgba(200,168,74,0.5);
font-family: 'Cormorant Garamond', serif;
```

---

## 2. NOMS PRIÈRES (Fajr, Dhuhr, Asr, Maghrib, Isha)

```css
font-family: 'Cormorant Garamond', serif;
font-size: 20px;
font-weight: 600;
color: #e8dfc8;
```

---

## 3. BADGES RAK'A (valeur présente)

```css
background: rgba(200,168,74,0.1);
border: 0.5px solid rgba(200,168,74,0.35);
border-radius: 8px;
padding: 4px 12px;
color: #C8A84A;
font-size: 15px;
font-family: 'Cormorant Garamond', serif;
```

---

## 4. VALEUR ABSENTE "—"

```css
color: rgba(232,217,188,0.15);
font-size: 18px;
```

---

## 5. LIGNES — espacement

```css
border-bottom: 0.5px solid rgba(200,168,74,0.08);
padding: 14px 0;
```

---

## 6. NOTE SOURCE

```css
font-family: 'Cormorant Garamond', serif;
font-style: italic;
font-size: 13px;
color: rgba(232,217,188,0.25);
text-align: center;
margin-top: 16px;
padding-top: 12px;
border-top: 0.5px solid rgba(200,168,74,0.08);
```

---

## Règles
- Aucune modification de la logique
- Aucune nouvelle dépendance
- npm run build + git push après modifications

## Trigger Claude Code

```
Lis SPEC-RAWATIB-LUXURY.md et applique-le
```
