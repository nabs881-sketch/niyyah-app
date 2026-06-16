# SPEC-ZAKAT

## Cible
`script.js` — ajout d'un calculateur Zakât al-mâl : une carte sur l'écran Pratique
niveau 1 (à côté de Horaires + Qibla) qui ouvre un overlay calculateur.

## Posture (importante)
Outil **indicatif**, pas une fatwa. On présente les **deux** nisab (or 85 g / argent
595 g), on retient le nisab-argent (le plus bas, le plus prudent) pour le « dû / non
dû », et on affiche les deux seuils pour que l'utilisateur informé décide. Disclaimer
en bas. Aucun chiffre d'or/argent n'est asséné : les prix sont **éditables**.

---

## Édit 1 — ajouter les fonctions

Repérer :
```js
function renderQiblaCard() {
```
INSÉRER **juste avant** cette ligne le bloc suivant (puis garder `function renderQiblaCard() {` tel quel) :

```js
function renderZakatCard() {
  return '<div onclick="openZakat()" style="background:linear-gradient(180deg,#15100a,#0e0a06);border:1px solid rgba(200,168,74,0.2);border-radius:16px;padding:14px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(200,168,74,0.08);">'
    + '<div style="font-size:22px;">\u2696\uFE0F</div>'
    + '<div style="flex:1;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:17px;color:#C8A84A;">Calculer ma Zak\u00e2t</div>'
    + '<div style="font-size:12px;color:var(--t3);margin-top:2px;">Zak\u00e2t al-m\u00e2l \u00b7 2,5 % du patrimoine</div></div>'
    + '<div style="color:rgba(200,168,74,0.5);font-size:18px;">\u2192</div></div>';
}

function closeZakat() {
  var ov = document.getElementById('zakat-overlay');
  if (ov) ov.remove();
}

function _zNum(id) {
  var el = document.getElementById(id);
  if (!el) return 0;
  var v = parseFloat((el.value || '').replace(',', '.').replace(/\s/g, ''));
  return isNaN(v) ? 0 : v;
}

function computeZakat() {
  var prixOr = _zNum('z-prix-or');
  var prixAr = _zNum('z-prix-ar');
  var actifs = _zNum('z-cash') + _zNum('z-metaux') + _zNum('z-stock') + _zNum('z-creances');
  var net = actifs - _zNum('z-dettes');
  var nisabOr = 85 * prixOr;
  var nisabAr = 595 * prixAr;
  var seuil = nisabAr; // nisab-argent = plus bas = plus prudent
  var res = document.getElementById('z-result');
  if (!res) return;
  var fmt = function(n){ return n.toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' \u20AC'; };
  var html = '<div style="border-top:1px solid rgba(200,168,74,0.18);margin-top:18px;padding-top:16px;">';
  html += '<div style="font-size:12px;color:var(--t3);line-height:1.7;margin-bottom:12px;">'
    + 'Patrimoine net zakatable : <b style="color:#E5E0DC;">' + fmt(net) + '</b><br>'
    + 'Nisab argent (seuil retenu) : ' + fmt(nisabAr) + '<br>'
    + 'Nisab or (pour information) : ' + fmt(nisabOr) + '</div>';
  if (net <= 0) {
    html += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:#C8A84A;">Patrimoine net nul ou n\u00e9gatif \u2014 pas de Zak\u00e2t due.</div>';
  } else if (net < seuil) {
    html += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:#C8A84A;">En dessous du nisab \u2014 pas de Zak\u00e2t due cette ann\u00e9e in cha Allah.</div>';
  } else {
    var zk = net * 0.025;
    html += '<div style="text-align:center;padding:14px;border-radius:12px;background:linear-gradient(135deg,rgba(232,206,138,0.14),rgba(201,162,74,0.05));border:1px solid rgba(232,206,138,0.3);">'
      + '<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:rgba(232,206,138,0.7);margin-bottom:6px;">Zak\u00e2t \u00e0 verser (2,5 %)</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:30px;color:#E8CE8A;">' + fmt(zk) + '</div></div>';
    if (net < nisabOr) {
      html += '<div style="font-size:11px;color:var(--t3);margin-top:10px;font-style:italic;">Note : tu es au-dessus du nisab-argent mais en dessous du nisab-or. Selon l\u2019avis qui retient le nisab-or, aucune Zak\u00e2t ne serait due. \u00c0 toi de choisir l\u2019avis que tu suis.</div>';
    }
  }
  html += '</div>';
  res.innerHTML = html;
}

function openZakat() {
  closeZakat();
  var ov = document.createElement('div');
  ov.id = 'zakat-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;background:#0e0a06;overflow-y:auto;-webkit-overflow-scrolling:touch;';
  var fld = function(id, label, ph, val){
    return '<div style="margin-bottom:14px;"><label style="display:block;font-size:12px;letter-spacing:1px;text-transform:uppercase;color:rgba(200,168,74,0.6);margin-bottom:6px;">' + label + '</label>'
      + '<input id="' + id + '" type="text" inputmode="decimal" placeholder="' + ph + '"' + (val!==undefined?' value="'+val+'"':'') + ' oninput="computeZakat()" style="width:100%;box-sizing:border-box;padding:12px 14px;border-radius:12px;border:1px solid rgba(200,168,74,0.25);background:#15100a;color:#E5E0DC;font-size:16px;font-family:serif;"></div>';
  };
  ov.innerHTML = '<div style="max-width:480px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 24px) 20px calc(40px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeZakat()" aria-label="Fermer" style="position:absolute;top:calc(env(safe-area-inset-top,0px) + 18px);right:18px;width:40px;height:40px;border-radius:50%;border:1px solid rgba(200,168,74,0.3);background:transparent;color:#C8A84A;font-size:18px;cursor:pointer;">\u2715</button>'
    + '<div style="text-align:center;margin-bottom:8px;font-size:30px;">\u2696\uFE0F</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:24px;color:#E8CE8A;margin-bottom:4px;">Zak\u00e2t al-m\u00e2l</div>'
    + '<div style="text-align:center;font-size:13px;color:var(--t3);font-style:italic;margin-bottom:24px;">2,5 % du patrimoine d\u00e9tenu une ann\u00e9e lunaire au-dessus du nisab</div>'
    + '<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(200,168,74,0.5);margin-bottom:10px;">Seuil (nisab)</div>'
    + fld('z-prix-or', 'Prix de l\u2019or (\u20AC / gramme) \u2014 actualise', '95', '95')
    + fld('z-prix-ar', 'Prix de l\u2019argent (\u20AC / gramme) \u2014 actualise', '1.10', '1.10')
    + '<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(200,168,74,0.5);margin:22px 0 10px;">Ce que tu poss\u00e8des</div>'
    + fld('z-cash', 'Liquidit\u00e9s & \u00e9pargne (\u20AC)', '0')
    + fld('z-metaux', 'Or & argent d\u00e9tenus \u2014 valeur (\u20AC)', '0')
    + fld('z-stock', 'Marchandises / stock pro (\u20AC)', '0')
    + fld('z-creances', 'Cr\u00e9ances r\u00e9cup\u00e9rables (\u20AC)', '0')
    + '<div style="font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:rgba(200,168,74,0.5);margin:22px 0 10px;">\u00c0 d\u00e9duire</div>'
    + fld('z-dettes', 'Dettes \u00e0 court terme (\u20AC)', '0')
    + '<div id="z-result"></div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.4);line-height:1.7;margin-top:24px;font-style:italic;">Calcul indicatif. Ne sont pas zakatables : r\u00e9sidence principale, v\u00e9hicule et biens d\u2019usage personnel. Pour les cas particuliers (parts d\u2019entreprise, immobilier locatif, dettes longues, retraite), r\u00e9f\u00e8re-toi \u00e0 un savant.</div>'
    + '</div>';
  document.body.appendChild(ov);
  computeZakat();
}

window.renderZakatCard = renderZakatCard;
window.openZakat = openZakat;
window.closeZakat = closeZakat;
window.computeZakat = computeZakat;

```

---

## Édit 2 — afficher la carte sur l'écran niveau 1

Repérer :
```js
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
```
REMPLACER par :
```js
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
  const zakatCard  = level.id === 1 ? renderZakatCard() : '';
```

Puis repérer :
```js
+ prayerCard + qiblaCard;
```
REMPLACER par :
```js
+ prayerCard + qiblaCard + zakatCard;
```

---

## Vérif attendue
- Écran Pratique niveau 1 (Fondations) → 3e carte « ⚖️ Calculer ma Zakât → » sous Qibla.
- Tap → overlay calculateur. Saisie en direct → résultat live (net, nisab, Zakât 2,5 %).
- Net < nisab-argent → « pas de Zakât due ». Net entre nisab-argent et nisab-or → Zakât affichée + note sur l'avis nisab-or.
- ✕ ferme l'overlay.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "zakat: calculateur al-mal (carte niveau 1 + overlay nisab or/argent 2,5%)"
git push
```
