# SPEC-RAWATIB — Carte Sunna Rawatib

## Objectif
Ajouter une carte "SUNNA RAWATIB" pliable sous la carte Qibla dans l'onglet Ma Prière.

---

## Placement
Sous la carte Qibla. Pliée par défaut (même comportement toggle que Qibla).

---

## Contenu

| Prière | Avant | Après |
|--------|-------|-------|
| Fajr | 2 rak'a | — |
| Dhuhr | 4 rak'a | 2 rak'a |
| Asr | — | — |
| Maghrib | — | 2 rak'a |
| Isha | — | 2 rak'a |

Note bas de carte : `Source : Bukhari & Muslim — 12 rak'a/jour au total`

---

## Design

```css
/* Card */
background: rgba(255,255,255,0.04);
border: 0.5px solid rgba(200,168,74,0.25);
border-radius: 14px;
padding: 14px;

/* Header toggle */
label: "SUNNA RAWATIB" — 10px, letter-spacing 2.5px, #C8A84A
chevron: rgba(200,168,74,0.5)

/* Header colonnes */
"PRIÈRE" / "AVANT" / "APRÈS"
font-size: 9px; letter-spacing: 1.5px; color: rgba(200,168,74,0.5)

/* Grille */
grid-template-columns: 1fr 80px 80px; gap: 6px

/* Nom prière */
font-size: 14px; font-weight: 600; color: #e8d9bc

/* Badge valeur présente */
background: rgba(200,168,74,0.1); color: #C8A84A;
border-radius: 6px; padding: 2px 6px; font-size: 12px

/* Valeur absente */
"—" color: rgba(232,217,188,0.2)

/* Séparateur lignes */
border-bottom: 0.5px solid rgba(200,168,74,0.08)

/* Note source */
font-size: 10px; font-style: italic;
color: rgba(232,217,188,0.3); text-align: center
```

---

## Règles
- Aucune nouvelle dépendance
- npm run build après modifications

## Trigger Claude Code

```
Lis SPEC-RAWATIB.md et applique-le
```
