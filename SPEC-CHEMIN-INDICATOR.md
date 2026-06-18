# SPEC-CHEMIN-INDICATOR — Redesign carte option C

## Objectif
Remplacer le bloc "Ton chemin · Le Complet" par une carte discrète dark/gold.

## 1. script.js — trouver le bloc chemin-indicator

Chercher dans renderLevel() ou la fonction qui génère id="chemin-indicator"
le HTML actuel du bloc chemin (contient "chemin-prefix", "chemin-name", "chemin-change").

Remplacer le innerHTML du chemin-indicator par :

```js
'<div style="margin:8px 16px 0;padding:12px 16px;border-radius:12px;border:0.5px solid rgba(200,168,75,0.15);background:rgba(200,168,75,0.04);display:flex;align-items:center;justify-content:space-between;">'
+ '<div>'
+ '<div style="font-family:\'Cormorant Garamond\',serif;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(200,168,75,0.35);margin-bottom:3px;">Ton chemin</div>'
+ '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:#C8A84A;" id="chemin-name">' + cheminLabel + '</div>'
+ '</div>'
+ '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;">'
+ '<span style="font-family:\'Cormorant Garamond\',serif;font-size:11px;font-style:italic;color:rgba(200,168,75,0.35);">✦ Dans ton chemin</span>'
+ '<button onclick="openOrientationPicker()" style="font-family:\'Cormorant Garamond\',serif;font-size:12px;color:rgba(200,168,75,0.5);background:none;border:0.5px solid rgba(200,168,75,0.2);border-radius:6px;padding:3px 10px;cursor:pointer;letter-spacing:0.5px;">Changer</button>'
+ '</div>'
+ '</div>'
```

Note : `cheminLabel` = la variable qui contient le nom du chemin actuel (ex: "Le Complet").

## 2. style.css — supprimer les anciens styles chemin

Supprimer ou vider les blocs :
- `.chemin-indicator { ... }`
- `.chemin-prefix { ... }`
- `.chemin-name { ... }`
- `.chemin-change { ... }`

## Trigger

```
Lis SPEC-CHEMIN-INDICATOR.md et applique-le intégralement.
npm run build && git add -A && git commit -m "ui - chemin indicator redesign carte option C"
```
