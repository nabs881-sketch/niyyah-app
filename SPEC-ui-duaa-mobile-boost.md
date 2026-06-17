# SPEC — Du'â du Jour : boost polices mobile

## find/replace dans script.js

### 1. Traduction principale (22px → 26px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.7;color:rgba(240,234,214,0.95);font-style:italic;margin-bottom:20px;">' + (duaa.traduction || '') + '</div>'
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:26px;line-height:1.7;color:rgba(240,234,214,0.95);font-style:italic;margin-bottom:20px;">' + (duaa.traduction || '') + '</div>'
```

### 2. Récit contextuel (20px → 22px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:20px;line-height:1.8;color:rgba(240,234,214,0.8);text-align:justify;margin-bottom:20px;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.8;color:rgba(240,234,214,0.8);text-align:justify;margin-bottom:20px;
```

### 3. Phonétique (16px → 18px)
ANCIEN :
```
font-size:16px;color:rgba(255,255,255,0.5);font-style:italic;margin-bottom:16px;
```
NOUVEAU :
```
font-size:18px;color:rgba(255,255,255,0.5);font-style:italic;margin-bottom:16px;
```

### 4. Occasion (16px → 18px)
ANCIEN :
```
font-size:16px;color:rgba(255,255,255,0.5);margin-bottom:16px;
```
NOUVEAU :
```
font-size:18px;color:rgba(255,255,255,0.5);margin-bottom:16px;
```

## Commit
```
npm run build && git add -A && git commit -m "fix(ui): Du'a du jour — boost polices mobile (26/22/18px)"
```
