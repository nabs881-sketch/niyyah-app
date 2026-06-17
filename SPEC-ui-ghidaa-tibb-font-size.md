# SPEC — Agrandissement polices "Aliment du Jour" + "Remède du Jour"

## find/replace dans script.js

### ALIMENT DU JOUR (openVueGhidaaJour)

#### 1. Bienfaits (16px → 20px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;
```

#### 2. Comment le consommer (13px → 16px)
ANCIEN :
```
font-size:13px;line-height:1.6;color:rgba(255,255,255,0.6);background:rgba(200,168,74,0.05);border-radius:12px;padding:14px;text-align:left;
```
NOUVEAU :
```
font-size:16px;line-height:1.6;color:rgba(255,255,255,0.6);background:rgba(200,168,74,0.05);border-radius:12px;padding:14px;text-align:left;
```

---

### REMÈDE DU JOUR (openVueTibbJour)

#### 3. Méthode/description (16px → 20px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;text-align:left;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;text-align:left;
```

#### 4. Pour quoi (12px → 15px)
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
npm run build && git add -A && git commit -m "fix(ui): Aliment + Remède du jour — polices agrandies"
```
