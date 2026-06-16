# SPEC-REPERE-LUXE

> Prérequis : v2337 (Repères = 5 cartes : Zakât · Zakât al-Fitr · Fidya · Convertisseur · Jeûne).

## But
1. **Repères n'est plus un onglet du bas** → barre à 3 onglets (Sanctuaire · Scanner · Nafs).
2. Repères devient un **écran embelli** ouvert **depuis l'accueil**, avec **bouton Retour** (plus
   d'onglets visibles dessus — c'est un overlay plein écran qui couvre la nav).
3. Look soigné : titre élégant, ornement losange, 2 familles (**Aumônes** / **Temps & repères**).

Technique : overlay `repere-overlay` en `z-index:3000` (les calculateurs s'ouvrent par-dessus en
3200). Réutilise les cartes existantes. **Pas d'étoile en tête** (retirée).

═══════════════════════════════════════════
## Édit 1 — `index.html` : retirer le bouton Repères de la nav
═══════════════════════════════════════════
SUPPRIMER entièrement ce bloc (commentaire + bouton) :
```html
  <!-- REPÈRES — Étoile -->
  <button class="nav-v2-item" id="v2nav-repere" aria-label="Repères" onclick="v2GoRepere()">
    <span class="nav-v2-icon"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M11 3 L13 9 L19 11 L13 13 L11 19 L9 13 L3 11 L9 9 Z"/></svg></span>
    <span class="nav-v2-label">Repères</span>
  </button>
```
Résultat : la barre du bas n'a plus que Sanctuaire · Scanner · Nafs.

═══════════════════════════════════════════
## Édit 2 — `script.js` : fonctions de l'écran Repères
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
function closeRepere() { var o = document.getElementById('repere-overlay'); if (o) o.remove(); }
function openRepere() {
  closeRepere();
  var eb = function(t) { return '<div style="display:flex;align-items:center;gap:10px;margin:24px 2px 13px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.22));"></div><span style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(200,168,74,0.5);">' + t + '</span><div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(200,168,74,0.22),transparent);"></div></div>'; };
  var ov = document.createElement('div');
  ov.id = 'repere-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3000;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(125% 60% at 50% -6%,#1d150b 0%,#0c0805 56%,#080605 100%);';
  ov.innerHTML = '<div style="max-width:480px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 20px) 19px calc(44px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeRepere()" aria-label="Retour" style="background:none;border:none;color:rgba(200,168,74,0.7);font-family:\'Cormorant Garamond\',serif;font-size:15px;display:inline-flex;align-items:center;gap:6px;cursor:pointer;padding:4px 0;"><span style="font-size:20px;line-height:1;">\u2039</span> Retour</button>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-weight:300;font-size:32px;letter-spacing:.07em;color:#E8CE8A;margin-top:14px;line-height:1;">Rep\u00e8res</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.6);margin-top:6px;">Les outils qui orientent ton adoration</div>'
    + '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin:18px 0 2px;"><div style="width:52px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.42));"></div><div style="width:6px;height:6px;border:1px solid rgba(200,168,74,0.55);transform:rotate(45deg);"></div><div style="width:52px;height:1px;background:linear-gradient(90deg,rgba(200,168,74,0.42),transparent);"></div></div>'
    + eb('Aum\u00f4nes')
    + renderZakatCard()
    + renderZakatFitrCard()
    + renderFidyaCard()
    + eb('Temps & rep\u00e8res')
    + renderConvertCard()
    + _repereJeuneCard()
    + '</div>';
  document.body.appendChild(ov);
}
function _repereHomeEntry() {
  return '<div onclick="openRepere()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-top:14px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="21" height="21" viewBox="0 0 22 22" fill="none" stroke="#E8CE8A" stroke-width="1.2" stroke-linejoin="round"><path d="M11 3 L13 9 L19 11 L13 13 L11 19 L9 13 L3 11 L9 9 Z"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Rep\u00e8res</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Zak\u00e2t, je\u00fbne, dates\u2026 tes outils</div></div>'
    + '<div style="color:rgba(200,168,74,0.3);font-size:18px;">\u203a</div></div>';
}
window.openRepere = openRepere;
window.closeRepere = closeRepere;

```

═══════════════════════════════════════════
## Édit 3 — `script.js` : fermer Repères avant d'ouvrir le suivi Ramadan
═══════════════════════════════════════════
Repérer :
```js
  if (typeof ramadanState !== 'undefined' && ramadanState && ramadanState.active) { switchView('ramadan'); return; }
```
REMPLACER par :
```js
  if (typeof ramadanState !== 'undefined' && ramadanState && ramadanState.active) { if (typeof closeRepere === 'function') closeRepere(); switchView('ramadan'); return; }
```

═══════════════════════════════════════════
## Édit 4 — `script.js` : entrée Repères sur l'accueil
═══════════════════════════════════════════
Repérer :
```js
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
```
REMPLACER par :
```js
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
  const repereEntry = level.id === 1 ? _repereHomeEntry() : '';
```

Puis repérer :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard;
```
REMPLACER par :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard + repereEntry;
```

═══════════════════════════════════════════
## Vérif attendue
- Barre du bas : **3 onglets** (Sanctuaire · Scanner · Nafs), plus de Repères.
- Accueil : une carte **« Repères »** (sous Qibla) → ouvre l'écran plein écran.
- Écran Repères : **bouton Retour** en haut, titre + ornement losange (pas d'étoile),
  familles **Aumônes** (Zakât · Zakât al-Fitr · Fidya) et **Temps & repères** (Convertisseur · Jeûne).
- Taper une carte ouvre son calculateur **par-dessus** ; le fermer revient sur Repères ; **Retour** revient à l'accueil.
- Jeûne en mode Ramadan : ouvre bien le suivi Ramadan (Repères se ferme).

Note : `v2GoRepere`, `view-repere`, `renderRepereHub` deviennent inutilisés (sans danger) — nettoyage possible plus tard.

## Build (OBLIGATOIRE — script.js + index.html modifiés)
```
npm run build
git add -A
git commit -m "repere: ecran embelli ouvert depuis accueil (Retour, familles), retire de la nav"
git push
```
