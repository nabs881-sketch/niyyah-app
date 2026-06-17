# SPEC — Agrandissement polices "Comprendre le Coran"

## 3 find/replace dans script.js

### 1. Translittération (18px → 22px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(240,234,214,0.6);font-style:italic;margin-top:4px;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:22px;color:rgba(240,234,214,0.6);font-style:italic;margin-top:4px;
```

### 2. Traductions FR du mot (17px → 20px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:17px;color:#C8A84A;font-style:italic;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:20px;color:#C8A84A;font-style:italic;
```

### 3. Traduction verset FR (15px → 18px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:15px;color:rgba(240,234,214,0.8);line-height:1.6;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:18px;color:rgba(240,234,214,0.8);line-height:1.6;
```

## Commit
```
npm run build && git add -A && git commit -m "fix(ui): Comprendre le Coran — polices agrandies (22/20/18px)"
```
