# SPEC-RAPPELS-PRIERE — Toggles rappels par prière

## Objectif
Ajouter une carte "RAPPELS" pliable dans l'onglet Ma Prière, permettant d'activer/désactiver le rappel in-app (toast + vibration + son) pour chaque prière individuellement.

---

## Placement
Sous la carte Sunna Rawatib. Pliée par défaut.

---

## Logique

### localStorage
Créer une clé `niyyah_prayer_reminders` (JSON) :
```json
{ "Fajr": true, "Dhuhr": true, "Asr": true, "Maghrib": true, "Isha": true }
```
Valeur par défaut : toutes à `true`.

### Modifier schedulePrayerReminders()
Avant le `setTimeout` de chaque prière, vérifier :
```js
const prefs = JSON.parse(localStorage.getItem('niyyah_prayer_reminders') || '{}');
if (prefs[name] === false) return; // skip cette prière
```

---

## UI

### Structure
Une ligne par prière :
```
[ Fajr          ]  [ toggle ON/OFF ]
[ Dhuhr         ]  [ toggle ON/OFF ]
[ Asr           ]  [ toggle ON/OFF ]
[ Maghrib       ]  [ toggle ON/OFF ]
[ Isha          ]  [ toggle ON/OFF ]
```

### Toggle
- ON : fond #C8A84A, curseur #0d0b08
- OFF : fond rgba(232,217,188,0.1), curseur rgba(232,217,188,0.3)
- Largeur 40px, hauteur 22px, border-radius 11px
- Transition 0.2s

---

## Design (cohérent avec les autres cards)

```css
/* Card */
background: rgba(255,255,255,0.04);
border: 0.5px solid rgba(200,168,74,0.25);
border-radius: 14px;
padding: 14px;

/* Header toggle */
label: "RAPPELS" — 10px, letter-spacing 2.5px, #C8A84A
chevron: rgba(200,168,74,0.5)

/* Ligne prière */
display: flex; justify-content: space-between; align-items: center;
padding: 9px 0;
border-bottom: 0.5px solid rgba(200,168,74,0.08);
/* dernière ligne : pas de border-bottom */

/* Nom prière */
font-family: 'Cormorant Garamond', serif;
font-size: 14px; font-weight: 600; color: #e8d9bc;

/* Note bas */
font-size: 10px; font-style: italic;
color: rgba(232,217,188,0.3); text-align: center; margin-top: 10px;
text: "Rappel in-app — son, vibration et toast à l'heure de la prière"
```

---

## Règles
- Aucune nouvelle dépendance
- Appeler `schedulePrayerReminders()` après chaque toggle pour recalculer
- npm run build après modifications

## Trigger Claude Code

```
Lis SPEC-RAPPELS-PRIERE.md et applique-le
```
