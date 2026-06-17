# SPEC — Agrandissement polices "Histoire des Prophètes"

## 3 find/replace dans script.js (dans _prophetesRenderDetail)

### 1. Texte du récit principal (16px → 20px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:16px;line-height:1.8;color:rgba(240,234,214,0.9);margin-bottom:20px;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.8;color:rgba(240,234,214,0.9);margin-bottom:20px;
```

### 2. Parole / citation (15px → 18px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:15px;font-style:italic;line-height:1.6;color:rgba(200,168,74,0.85);
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:18px;font-style:italic;line-height:1.6;color:rgba(200,168,74,0.85);
```

### 3. Station spirituelle (14px → 17px)
ANCIEN :
```
font-style:italic;font-size:14px;line-height:1.6;color:rgba(200,168,74,0.8);
```
NOUVEAU :
```
font-style:italic;font-size:17px;line-height:1.6;color:rgba(200,168,74,0.8);
```

## Commit
```
npm run build && git add -A && git commit -m "fix(ui): Histoire des Prophètes — polices agrandies (20/18/17px)"
```
