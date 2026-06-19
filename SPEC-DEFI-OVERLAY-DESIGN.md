# SPEC-DEFI-OVERLAY-DESIGN

## Objectif
Redesign de l'overlay défi pour correspondre à l'esthétique Niyyah.

## index.html — 3 modifications

### 1. defiSheet — fond dark standard Niyyah
Trouve :
```
background:linear-gradient(145deg,#0a1a0a 0%,#060e06 100%);
```
Remplace par :
```
background:linear-gradient(180deg,#15100a,#0e0a06);
```

### 2. defiOvRef — style card dark avec guillemet doré
Trouve :
```
<div id="defiOvRef" style="background:rgba(200,168,75,0.06);border:0.5px solid rgba(200,168,75,0.15);border-radius:10px;padding:10px 12px;margin-bottom:14px;font-size:12px;font-style:italic;color:rgba(255,255,255,0.6);line-height:1.6;display:none;"></div>
```
Remplace par :
```
<div id="defiOvRef" style="position:relative;overflow:hidden;background:linear-gradient(180deg,#15100a,#0e0a06);border:1px solid rgba(200,168,75,0.22);border-radius:14px;padding:16px;margin-bottom:16px;font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;color:rgba(240,234,214,0.85);line-height:1.7;display:none;"><div style="position:absolute;top:-8px;right:12px;font-size:64px;opacity:0.07;font-family:serif;color:#C8A84A;">"</div></div>
```

### 3. defiOvJours — cases plus grandes
Trouve :
```
<div id="defiOvJours" style="display:flex;gap:6px;margin-bottom:16px;"></div>
```
Remplace par :
```
<div id="defiOvJours" style="display:flex;gap:8px;margin-bottom:20px;"></div>
```

### 4. defiOvEncouragement — police plus grande
Trouve :
```
<div id="defiOvEncouragement" style="font-size:12px;color:rgba(200,168,75,0.6);text-align:center;margin-bottom:14px;font-style:italic;"></div>
```
Remplace par :
```
<div id="defiOvEncouragement" style="font-family:'Cormorant Garamond',serif;font-size:17px;color:rgba(200,168,75,0.8);text-align:center;margin-bottom:16px;font-style:italic;"></div>
```

## script.js — cases jours plus grandes

Dans renderDefiOverlay(), trouve :
```
'width:100%;aspect-ratio:1;border-radius:8px;
```
Remplace par :
```
'width:100%;aspect-ratio:1;border-radius:10px;
```

Et la lettre du jour, trouve :
```
font-size:12px;font-weight:700;
```
Remplace par :
```
font-size:15px;font-weight:700;
```

Et le "Se coche automatiquement", dans renderDefiOverlay() :
```
autoMsg.style.cssText = 'font-family:\'Cormorant Garamond\',serif;font-size:14px;
```
Remplace par :
```
autoMsg.style.cssText = 'font-family:\'Cormorant Garamond\',serif;font-size:16px;
```

## Trigger
```
Lis SPEC-DEFI-OVERLAY-DESIGN.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: redesign overlay defi style Niyyah" && git push
```
