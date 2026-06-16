# SPEC-COMPTEUR — Compteur tactile universel

## Objectif
Ajouter une carte "COMPTEUR" dans l'onglet Ma Prière. Compteur tactile universel — tap pour incrémenter, bouton reset.

---

## Placement
Après la carte Rappels (dernière carte de l'onglet).

---

## Comportement

- Tap n'importe où sur la zone principale → +1
- Bouton reset → remet à 0
- Persistance : localStorage `niyyah_compteur_val` (conservé si on quitte l'onglet)
- Vibration courte à chaque tap : `navigator.vibrate(30)`
- Pas de limite haute

---

## Design

```css
/* Card */
background: rgba(255,255,255,0.04);
border: 0.5px solid rgba(200,168,74,0.25);
border-radius: 14px;
padding: 14px;

/* Label section */
"COMPTEUR" — 10px, letter-spacing 2.5px, color #C8A84A

/* Zone tactile principale */
width: 100%;
padding: 32px 0;
text-align: center;
cursor: pointer;
user-select: none;

/* Chiffre */
font-family: 'Cormorant Garamond', serif;
font-size: 72px;
font-weight: 300;
color: #C8A84A;
line-height: 1;

/* Sous-texte */
"Appuie pour compter"
font-size: 11px;
font-style: italic;
color: rgba(232,217,188,0.3);
margin-top: 8px;

/* Séparateur */
border-top: 0.5px solid rgba(200,168,74,0.1);
margin-top: 12px;
padding-top: 12px;

/* Bouton reset */
display: block;
margin: 0 auto;
font-family: 'Cormorant Garamond', serif;
font-size: 11px;
letter-spacing: 2px;
color: rgba(232,217,188,0.3);
background: none;
border: none;
cursor: pointer;
text-transform: uppercase;
/* Au tap : color rgba(200,168,74,0.6) pendant 300ms */
```

---

## Règles
- Aucune nouvelle dépendance
- npm run build après modifications

## Trigger Claude Code

```
Lis SPEC-COMPTEUR.md et applique-le
```
