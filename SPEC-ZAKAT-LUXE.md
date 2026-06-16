# SPEC-ZAKAT-LUXE

## Cible
`script.js` — redesign visuel du calculateur Zakât. On **remplace entièrement** les
fonctions `openZakat` et `computeZakat` par des versions « page enluminée » premium.
Tous les IDs (`z-prix-or`, `z-prix-ar`, `z-cash`, `z-metaux`, `z-stock`, `z-creances`,
`z-dettes`, `z-result`) sont conservés → `_zNum`, `_zakatFetchPrices`, le pré-remplissage
auto et le calcul continuent de fonctionner sans changement.

NE PAS toucher à : `_zNum`, `_zakatFetchPrices`, `renderZakatCard`, `closeZakat`.

---

## Édit 1 — remplacer `openZakat`

Repérer `function openZakat() {` et remplacer **toute la fonction** (jusqu'à son `}` de
fermeture) par :

```js
function openZakat() {
  closeZakat();
  var ov = document.createElement('div');
  ov.id = 'zakat-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%, #1c140b 0%, #0b0805 55%, #070504 100%);';
  var STYLE = '<style id="zakat-lux-style">'
    + '#zakat-overlay *{box-sizing:border-box;}'
    + '#zakat-overlay .zk-wrap{position:relative;max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(56px + env(safe-area-inset-bottom));animation:zkUp .55s cubic-bezier(.23,1,.32,1) both;}'
    + '#zakat-overlay .zk-dust{position:fixed;top:0;left:50%;transform:translateX(-50%);width:520px;height:340px;pointer-events:none;background:radial-gradient(circle at 50% 0%, rgba(232,206,138,0.16), rgba(232,206,138,0) 62%);}'
    + '#zakat-overlay .zk-close{position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;transition:all .25s;}'
    + '#zakat-overlay .zk-close:hover{border-color:rgba(232,206,138,0.6);color:#E8CE8A;}'
    + '#zakat-overlay .zk-arabic{font-family:"Scheherazade New",serif;font-size:46px;line-height:1.1;color:#E8CE8A;text-align:center;text-shadow:0 0 30px rgba(232,206,138,0.28);}'
    + '#zakat-overlay .zk-title{font-family:"Cormorant Garamond",serif;font-weight:500;font-size:27px;letter-spacing:.06em;color:#EADCB6;text-align:center;margin-top:8px;}'
    + '#zakat-overlay .zk-sub{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:14px;color:#9c8c64;text-align:center;margin-top:8px;line-height:1.55;}'
    + '#zakat-overlay .zk-rule{display:flex;align-items:center;gap:14px;margin:30px 0 14px;}'
    + '#zakat-overlay .zk-rule:before,#zakat-overlay .zk-rule:after{content:"";flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.3),transparent);}'
    + '#zakat-overlay .zk-rule span{font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:rgba(200,168,74,0.62);white-space:nowrap;}'
    + '#zakat-overlay .zk-field{margin-bottom:14px;}'
    + '#zakat-overlay .zk-field label{display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,168,74,0.55);margin-bottom:7px;}'
    + '#zakat-overlay .zk-inwrap{position:relative;}'
    + '#zakat-overlay .zk-unit{position:absolute;right:16px;top:50%;transform:translateY(-50%);font-family:"Cormorant Garamond",serif;font-size:15px;color:rgba(200,168,74,0.45);pointer-events:none;}'
    + '#zakat-overlay input{width:100%;padding:14px 16px;border-radius:13px;border:1px solid rgba(200,168,74,0.18);background:linear-gradient(180deg,#16110a,#100c07);color:#F0EADB;font-size:16px;font-family:"Cormorant Garamond",serif;outline:none;transition:border-color .25s, box-shadow .25s;}'
    + '#zakat-overlay input:focus{border-color:rgba(232,206,138,0.55);box-shadow:0 0 0 3px rgba(232,206,138,0.08), inset 0 0 18px rgba(232,206,138,0.05);}'
    + '#zakat-overlay input::placeholder{color:rgba(200,168,74,0.25);}'
    + '#zakat-overlay .zk-note{font-size:11px;color:rgba(200,168,74,0.4);line-height:1.7;margin-top:26px;font-style:italic;font-family:"Cormorant Garamond",serif;}'
    + '#zakat-overlay .zk-result-wrap{border-top:1px solid rgba(200,168,74,0.15);margin-top:28px;padding-top:24px;}'
    + '#zakat-overlay .zk-result-line{font-family:"Cormorant Garamond",serif;font-size:14px;color:#9c8c64;line-height:1.95;margin-bottom:18px;}'
    + '#zakat-overlay .zk-result-line b{color:#E5E0DC;font-weight:600;}'
    + '#zakat-overlay .zk-bloom{position:relative;text-align:center;padding:28px 20px;border-radius:18px;border:1px solid rgba(232,206,138,0.32);background:radial-gradient(120% 150% at 50% 0%, rgba(232,206,138,0.15), rgba(232,206,138,0.02) 72%);overflow:hidden;animation:zkBloom .7s ease both;}'
    + '#zakat-overlay .zk-bloom:before{content:"";position:absolute;top:-46%;left:50%;transform:translateX(-50%);width:220px;height:220px;background:radial-gradient(circle,rgba(232,206,138,0.22),transparent 65%);pointer-events:none;}'
    + '#zakat-overlay .zk-ey{position:relative;font-size:11px;letter-spacing:.26em;text-transform:uppercase;color:rgba(232,206,138,0.72);margin-bottom:12px;}'
    + '#zakat-overlay .zk-amt{position:relative;font-family:"Cormorant Garamond",serif;font-weight:600;font-size:44px;line-height:1;background:linear-gradient(180deg,#F8EAC2,#D4AF37);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;}'
    + '#zakat-overlay .zk-serene{font-family:"Cormorant Garamond",serif;font-style:italic;font-size:19px;color:#C8A84A;text-align:center;padding:10px 0;}'
    + '@keyframes zkUp{from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:none;}}'
    + '@keyframes zkBloom{from{opacity:0;transform:scale(.96);}to{opacity:1;transform:none;}}'
    + '@media (prefers-reduced-motion: reduce){#zakat-overlay .zk-wrap,#zakat-overlay .zk-bloom{animation:none;}}'
    + '</style>';
  var fld = function(id, label, ph, unit, val){
    return '<div class="zk-field"><label>' + label + '</label><div class="zk-inwrap">'
      + '<input id="' + id + '" type="text" inputmode="decimal" placeholder="' + ph + '"' + (val!==undefined?' value="'+val+'"':'') + ' oninput="computeZakat()">'
      + (unit ? '<span class="zk-unit">' + unit + '</span>' : '')
      + '</div></div>';
  };
  ov.innerHTML = STYLE
    + '<div class="zk-dust"></div>'
    + '<button class="zk-close" aria-label="Fermer" onclick="closeZakat()">\u2715</button>'
    + '<div class="zk-wrap">'
    + '<div class="zk-arabic">\u0627\u0644\u0632\u0651\u064E\u0643\u064E\u0627\u0629</div>'
    + '<div class="zk-title">Zak\u00e2t al-m\u00e2l</div>'
    + '<div class="zk-sub">Purifier ce que l\u2019on poss\u00e8de \u2014 2,5 % du patrimoine<br>d\u00e9tenu une ann\u00e9e lunaire au-dessus du nisab</div>'
    + '<div class="zk-rule"><span>Seuil \u00b7 Nisab</span></div>'
    + fld('z-prix-or', 'Prix de l\u2019or', '95', '\u20AC / g', '95')
    + fld('z-prix-ar', 'Prix de l\u2019argent', '1.10', '\u20AC / g', '1.10')
    + '<div class="zk-rule"><span>Ce que tu poss\u00e8des</span></div>'
    + fld('z-cash', 'Liquidit\u00e9s & \u00e9pargne', '0', '\u20AC')
    + fld('z-metaux', 'Or & argent d\u00e9tenus', '0', '\u20AC')
    + fld('z-stock', 'Marchandises / stock pro', '0', '\u20AC')
    + fld('z-creances', 'Cr\u00e9ances r\u00e9cup\u00e9rables', '0', '\u20AC')
    + '<div class="zk-rule"><span>\u00c0 d\u00e9duire</span></div>'
    + fld('z-dettes', 'Dettes \u00e0 court terme', '0', '\u20AC')
    + '<div id="z-result"></div>'
    + '<div class="zk-note">Calcul indicatif. Ne sont pas zakatables : r\u00e9sidence principale, v\u00e9hicule et biens d\u2019usage personnel. Pour les cas particuliers (parts d\u2019entreprise, immobilier locatif, dettes longues, retraite), r\u00e9f\u00e8re-toi \u00e0 un savant.</div>'
    + '</div>';
  document.body.appendChild(ov);
  computeZakat();
  _zakatFetchPrices();
}
```

---

## Édit 2 — remplacer `computeZakat`

Repérer `function computeZakat() {` et remplacer **toute la fonction** par :

```js
function computeZakat() {
  var prixOr = _zNum('z-prix-or'), prixAr = _zNum('z-prix-ar');
  var actifs = _zNum('z-cash') + _zNum('z-metaux') + _zNum('z-stock') + _zNum('z-creances');
  var net = actifs - _zNum('z-dettes');
  var nisabOr = 85 * prixOr, nisabAr = 595 * prixAr, seuil = nisabAr;
  var res = document.getElementById('z-result');
  if (!res) return;
  var fmt = function(n){ return n.toLocaleString('fr-FR', {maximumFractionDigits:2}) + ' \u20AC'; };
  var h = '<div class="zk-result-wrap">';
  h += '<div class="zk-result-line">Patrimoine net zakatable : <b>' + fmt(net) + '</b><br>'
     + 'Nisab argent (seuil retenu) : ' + fmt(nisabAr) + '<br>'
     + 'Nisab or (information) : ' + fmt(nisabOr) + '</div>';
  if (net <= 0) {
    h += '<div class="zk-serene">Patrimoine net nul \u2014 pas de Zak\u00e2t due.</div>';
  } else if (net < seuil) {
    h += '<div class="zk-serene">En dessous du nisab \u2014 pas de Zak\u00e2t due cette ann\u00e9e, in cha Allah.</div>';
  } else {
    var zk = net * 0.025;
    h += '<div class="zk-bloom"><div class="zk-ey">Zak\u00e2t \u00e0 verser \u00b7 2,5 %</div><div class="zk-amt">' + fmt(zk) + '</div></div>';
    if (net < nisabOr) {
      h += '<div class="zk-note" style="margin-top:14px;">Tu es au-dessus du nisab-argent mais en dessous du nisab-or. Selon l\u2019avis qui retient le nisab-or, aucune Zak\u00e2t ne serait due \u2014 \u00e0 toi de choisir l\u2019avis que tu suis.</div>';
    }
  }
  h += '</div>';
  res.innerHTML = h;
}
```

---

## Vérif attendue
- En-tête : calligraphie الزَّكَاة dorée + « Zakât al-mâl » + sous-titre murmure.
- Sections séparées par des filets dorés à eyebrow centré (Seuil · Ce que tu possèdes · À déduire).
- Champs profonds, halo doré au focus, unité « € / g » / « € » en suffixe.
- Résultat dû → montant en **or champagne dégradé** qui éclôt dans un panneau auréolé.
- Sous le nisab → ligne sereine en italique doré.
- Prix toujours pré-remplis par les cours du jour (auto-fetch intact).

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "zakat: redesign luxe (en-tete calligraphie + eclosion or du resultat)"
git push
```
