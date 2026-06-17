# SPEC — Agrandissement polices modules Connaissance (Fiqh + Récits Coran + Lecture Coran)

## find/replace dans script.js

### FIQH DU JOUR

#### 1. Règle principale (18px → 22px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;">' + (rule.regle || '') + '</div>'
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.7;color:rgba(240,234,214,0.95);margin-bottom:20px;">' + (rule.regle || '') + '</div>'
```

#### 2. Explication (14px → 17px)
ANCIEN :
```
font-size:14px;line-height:1.6;color:rgba(255,255,255,0.6);margin-bottom:20px;font-style:italic;
```
NOUVEAU :
```
font-size:17px;line-height:1.6;color:rgba(255,255,255,0.6);margin-bottom:20px;font-style:italic;
```

---

### RÉCITS DU CORAN

#### 3. Verset italique (20px → 22px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:20px;font-style:italic;color:rgba(200,168,75,0.85);line-height:1.85;margin-bottom:22px;text-align:center;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:rgba(200,168,75,0.85);line-height:1.85;margin-bottom:22px;text-align:center;
```

#### 4. Corps narratif (19px → 22px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:19px;color:rgba(229,224,220,0.85);line-height:1.9;margin-bottom:22px;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:22px;color:rgba(229,224,220,0.85);line-height:1.9;margin-bottom:22px;
```

#### 5. Méditation (17px → 20px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;color:#C8A84A;line-height:1.8;
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:20px;font-style:italic;color:#C8A84A;line-height:1.8;
```

---

### LECTURE DU CORAN (Verset du jour)

#### 6. Traduction du verset (18px → 22px)
ANCIEN :
```
font-family:'Cormorant Garamond',serif;font-size:18px;line-height:1.7;color:rgba(240,234,214,0.95);font-style:italic;margin-bottom:20px;">' + vj.traduction + '</div>'
```
NOUVEAU :
```
font-family:'Cormorant Garamond',serif;font-size:22px;line-height:1.7;color:rgba(240,234,214,0.95);font-style:italic;margin-bottom:20px;">' + vj.traduction + '</div>'
```

## Commit
```
npm run build && git add -A && git commit -m "fix(ui): Connaissance — polices agrandies Fiqh + Récits Coran + Verset"
```
