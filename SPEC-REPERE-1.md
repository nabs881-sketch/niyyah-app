# SPEC-REPERE-1 (Phase 1 — charpente)

## But
Créer l'onglet **Repères** (Sanctuaire · Scanner · Nafs · Repères), y mettre Zakât + Jeûne,
alléger le home (sortir Zakât), et reloger le Journal en entrée du hub Scanner.
Qibla et horaires **restent sur le home** (Qibla déplacée plus tard).

═══════════════════════════════════════════
## Édit 1 — `index.html` : barre de nav (réordonner + Journal→Repères)
═══════════════════════════════════════════
Dans la barre de nav V2, il y a 4 boutons dans cet ordre : Sanctuaire, Scanner, **Journal**, **Nafs**.

**(a)** Intervertir l'ordre des deux derniers : le bloc `<button id="v2nav-nafs">…</button>`
(avec son commentaire `<!-- NAFS — Feuille -->`) doit passer **AVANT** le bloc
`<button id="v2nav-journal">…</button>` (avec `<!-- JOURNAL — Livre -->`).
Ordre final : Sanctuaire · Scanner · **Nafs** · **Journal(→Repères)**.

**(b)** Transformer le bloc `v2nav-journal` en bouton **Repères** :
- `id="v2nav-journal"` → `id="v2nav-repere"`
- `aria-label="Journal"` → `aria-label="Repères"`
- `onclick="v2GoJournal()"` → `onclick="v2GoRepere()"`
- remplacer le `<svg>…</svg>` du livre par l'icône étoile :
  `<svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"><path d="M11 3 L13 9 L19 11 L13 13 L11 19 L9 13 L3 11 L9 9 Z"/></svg>`
- le label `Journal` → `Repères`

═══════════════════════════════════════════
## Édit 2 — `index.html` : conteneur de la vue
═══════════════════════════════════════════
Repérer :
```html
<div class="view" id="view-accueil" style="display:none;"></div>
```
INSÉRER **juste avant** :
```html
<div class="view" id="view-repere" style="display:none;"></div>
```

═══════════════════════════════════════════
## Édit 3 — `script.js` : fonctions Repères
═══════════════════════════════════════════
Repérer `function v2GoSanctuaire() {` et INSÉRER **juste avant** :

```js
function v2GoRepere() {
  setupTopUI('repere');
  if (typeof _nAn === 'function') _nAn('repere_visited');
  var tbEl = document.getElementById('topbar-v2');
  if (tbEl) tbEl.classList.remove('active');
  document.querySelectorAll('.nav-v2-item').forEach(function(n) { n.classList.remove('active-nav'); });
  var btn = document.getElementById('v2nav-repere');
  if (btn) btn.classList.add('active-nav');
  _v2TransitionTo('view-repere', { onShow: function() {
    var v = document.getElementById('view-repere');
    if (v) v.innerHTML = renderRepereHub();
  }});
}
function renderRepereHub() {
  return '<div style="padding:calc(env(safe-area-inset-top,0px) + 30px) 18px 40px;max-width:480px;margin:0 auto;">'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#C8A84A;margin-bottom:6px;">Rep\u00e8res</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.55);margin-bottom:26px;">Les outils qui orientent ton adoration</div>'
    + renderZakatCard()
    + _repereJeuneCard()
    + '</div>';
}
function _repereJeuneCard() {
  return '<div onclick="switchView(\'ramadan\')" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M17 4a8 8 0 1 0 3 13.5A6.5 6.5 0 0 1 17 4z"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Je\u00fbne</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Ramadan & je\u00fbnes sur\u00e9rogatoires</div></div></div>';
}
window.v2GoRepere = v2GoRepere;
window.renderRepereHub = renderRepereHub;

```

═══════════════════════════════════════════
## Édit 4 — `script.js` : sortir Zakât du home
═══════════════════════════════════════════
Repérer :
```js
  const zakatCard  = level.id === 1 ? renderZakatCard() : '';
```
SUPPRIMER cette ligne entièrement.

Puis repérer :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard + zakatCard;
```
REMPLACER par :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard;
```

═══════════════════════════════════════════
## Édit 5 — `script.js` : entrée « Ton journal » dans le hub Scanner
═══════════════════════════════════════════
Repérer :
```js
   +'<button class="scanner-hub-back" onclick="closeScannerHub()">Retour</button>';
```
REMPLACER par :
```js
   +'<button onclick="closeScannerHub();v2GoJournal();" style="display:block;margin:18px auto 0;background:none;border:none;color:rgba(200,168,74,0.6);font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:15px;cursor:pointer;">Ton journal \u2192</button>'
   +'<button class="scanner-hub-back" onclick="closeScannerHub()">Retour</button>';
```

═══════════════════════════════════════════
## Vérif attendue
- Barre du bas : **Sanctuaire · Scanner · Nafs · Repères** (icône étoile dorée).
- Onglet Repères → grille avec carte **Zakât** (ouvre le calculateur) + carte **Jeûne** (ouvre l'écran Ramadan, placeholder Phase 2).
- Home : la carte Zakât a disparu ; horaires + Qibla **restent**.
- Hub Scanner : sous les deux gestes, un lien discret **« Ton journal → »** qui ouvre le journal. Plus de bouton Journal dans la nav.
- Aucune erreur console (v2GoJournal existe toujours).

## Build (OBLIGATOIRE — script.js + index.html modifiés)
```
npm run build
git add -A
git commit -m "repere: onglet Repere (Zakat+Jeune), nav reordonnee, Journal relogue dans Scanner"
git push
```
