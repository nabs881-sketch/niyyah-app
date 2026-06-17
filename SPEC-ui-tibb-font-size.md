# SPEC — Agrandissement polices "Remède du Jour"

## 2 find/replace dans script.js (dans openVueTibbJour)

### 1. Texte méthode/description (16px → 20px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;text-align:left;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;text-align:left;
```

### 2. Pour quoi (label sous le titre) (12px → 15px)
ANCIEN :
```
font-size:12px;color:rgba(200,168,74,0.5);margin-bottom:20px;letter-spacing:0.5px;
```
NOUVEAU :
```
font-size:15px;color:rgba(200,168,74,0.5);margin-bottom:20px;letter-spacing:0.5px;
```

## Commit
```
npm run build && git add -A && git commit -m "fix(ui): Remède du jour — polices agrandies (20/15px)"
```
