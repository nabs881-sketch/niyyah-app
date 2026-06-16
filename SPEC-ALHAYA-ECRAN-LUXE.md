# SPEC-ALHAYA-ECRAN-LUXE

## Cible
- `index.html` → le bloc `#alhaya-overlay` (écran « Niyyah est en repos »).
- `style.css` → ajout de 3 keyframes.

## But
Passer l'écran de repos en premium/luxe : noir chaud profond, halo d'or qui respire derrière نِيَّة,
typo plus présente, eyebrow avec filets, séparateur raffiné, hint « Touchez » qui pulse.
**Contraintes** : conserver les ids `i18n-alhaya-resting` et `i18n-alhaya-tap` (traductions),
conserver le bouton `.niyyah-mini-orb` et `onclick="closeAlHaya()"`.

---

## 1. index.html — remplacer tout le bloc `#alhaya-overlay`

Remplacer le `<div id="alhaya-overlay" …>…</div>` existant (jusqu'à sa balise fermante,
celle qui contient le bouton `.niyyah-mini-orb`) par :

```html
<div id="alhaya-overlay" style="display:none;position:fixed;top:0;left:0;right:0;bottom:0;width:100vw;height:100vh;z-index:9998;background:radial-gradient(circle at 50% 42%,#17130b 0%,#0c0a06 52%,#060403 100%);align-items:center;justify-content:center;flex-direction:column;text-align:center;cursor:pointer;transition:opacity 0.2s;" onclick="closeAlHaya()">
  <div style="position:absolute;top:42%;left:50%;width:300px;height:300px;border-radius:50%;background:radial-gradient(circle,rgba(212,175,55,0.18) 0%,rgba(184,134,11,0.06) 40%,transparent 70%);animation:ahBreath 8s ease-in-out infinite;pointer-events:none;z-index:0;"></div>
  <div style="position:relative;z-index:1;font-family:'Scheherazade New',serif;font-size:46px;color:#E8CF8A;line-height:1;margin-bottom:26px;animation:ahWord 8s ease-in-out infinite;">نِيَّة</div>
  <div id="i18n-alhaya-resting" style="position:relative;z-index:1;font-family:'Cormorant Garamond',serif;font-size:20px;font-style:italic;color:rgba(232,207,138,0.82);margin-bottom:22px;">Niyyah est en repos</div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;gap:14px;margin-bottom:26px;font-family:'Cormorant Garamond',serif;">
    <span style="height:1px;width:30px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.5));"></span>
    <span style="font-size:11px;letter-spacing:4px;color:rgba(212,175,55,0.5);text-transform:uppercase;">AL-HAYA</span>
    <span style="color:rgba(212,175,55,0.4);font-size:9px;">&#9670;</span>
    <span style="font-family:'Scheherazade New',serif;font-size:14px;color:rgba(212,175,55,0.5);">&#1575;&#1604;&#1581;&#1610;&#1575;&#1569;</span>
    <span style="height:1px;width:30px;background:linear-gradient(90deg,rgba(212,175,55,0.5),transparent);"></span>
  </div>
  <div style="position:relative;z-index:1;display:flex;align-items:center;gap:12px;margin-bottom:30px;">
    <span style="height:1px;width:42px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent);"></span>
    <span style="color:rgba(212,175,55,0.55);font-size:8px;transform:rotate(45deg);">&#10022;</span>
    <span style="height:1px;width:42px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.4),transparent);"></span>
  </div>
  <div id="i18n-alhaya-tap" style="position:relative;z-index:1;font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:1.5px;color:rgba(244,236,220,0.55);animation:ahPulse 3.4s ease-in-out infinite;">Touchez pour r&#233;veiller</div>
  <button class="niyyah-mini-orb" onclick="event.stopPropagation();_niyyahReview('alhaya')" aria-label="Revoir la présentation de Niyyah" style="position:absolute;top:calc(var(--safe-top,0px)+14px);left:18px;z-index:2;"><span>&#1606;&#1616;&#1610;&#1617;&#1614;&#1577;</span></button>
</div>
```

---

## 2. style.css — ajouter à la fin

```css
@keyframes ahBreath{0%,100%{opacity:.55;transform:translate(-50%,-50%) scale(1)}50%{opacity:1;transform:translate(-50%,-50%) scale(1.1)}}
@keyframes ahWord{0%,100%{text-shadow:0 0 18px rgba(212,175,55,.45),0 0 40px rgba(184,134,11,.25);transform:scale(1)}50%{text-shadow:0 0 26px rgba(212,175,55,.6),0 0 60px rgba(184,134,11,.35);transform:scale(1.04)}}
@keyframes ahPulse{0%,100%{opacity:.32}50%{opacity:.6}}
```

---

## Vérif attendue
```
grep -c "ahBreath\|ahWord\|ahPulse" style.css     # >= 3
grep -c "radial-gradient(circle at 50% 42%" index.html   # 1
grep -c "i18n-alhaya-resting" index.html          # 1 (id preserve)
grep -c "i18n-alhaya-tap" index.html              # 1 (id preserve)
grep -c "niyyah-mini-orb" index.html              # 1 (bouton preserve)
```
Visuel : ouvrir l'écran al-Haya → fond noir chaud, نِيَّة avec halo d'or qui respire,
eyebrow avec filets, hint « Touchez » qui pulse.

## Build (OBLIGATOIRE — index.html + style.css dans le cache SW)
```
npm run build
git add -A
git commit -m "ui: ecran al-Haya repos rendu luxe (noir chaud, halo respirant, filets)"
git push
```
