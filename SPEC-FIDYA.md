# SPEC-FIDYA

> Prérequis : Repères + Zakât al-Fitr en place. Réutilise `_zNum`.

## But
Calculateur **Fidya / Kaffâra** dans Repères (après Zakât al-Fitr). Sépare clairement
qadâ' (rattrapage), fidya (non rattrapable → nourrir 1 pauvre/jour) et kaffâra (rupture
volontaire → 60 jeûnes ou nourrir 60). Posture sourcée, montant du repas éditable.

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
function renderFidyaCard() {
  return '<div onclick="openFidya()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M4 13a8 8 0 0 0 16 0"/><circle cx="12" cy="6.5" r="2.2"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Fidya / Kaff\u00e2ra</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Je\u00fbnes manqu\u00e9s ou rompus</div></div></div>';
}
function closeFidya() { var ov = document.getElementById('fidya-overlay'); if (ov) ov.remove(); }
function computeFidya() {
  var cost = _zNum('fk-cost');
  var fmt = function(x){ return x.toLocaleString('fr-FR', {maximumFractionDigits:2}); };
  var fd = Math.max(0, Math.round(_zNum('fk-fidya-days')));
  var fr = document.getElementById('fk-fidya-result');
  if (fr) {
    fr.innerHTML = fd <= 0 ? '' :
      '<div style="text-align:center;padding:18px;border-radius:14px;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(120% 150% at 50% 0%,rgba(232,206,138,0.12),rgba(232,206,138,0.02) 72%);margin-top:12px;">'
      + '<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(232,206,138,0.7);margin-bottom:6px;">\u00c0 donner</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:32px;line-height:1;background:linear-gradient(180deg,#F8EAC2,#D4AF37);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">' + fmt(fd * cost) + ' \u20AC</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:rgba(200,168,74,0.7);margin-top:8px;">Nourrir 1 pauvre par jour \u00b7 ' + fd + ' jour' + (fd > 1 ? 's' : '') + '</div></div>';
  }
  var kd = Math.max(0, Math.round(_zNum('fk-kaffara-days')));
  var kr = document.getElementById('fk-kaffara-result');
  if (kr) {
    kr.innerHTML = kd <= 0 ? '' :
      '<div style="padding:18px;border-radius:14px;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(120% 150% at 50% 0%,rgba(232,206,138,0.1),rgba(232,206,138,0.02) 72%);margin-top:12px;text-align:center;">'
      + '<div style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:rgba(232,206,138,0.7);margin-bottom:8px;">Par jour rompu</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:17px;color:#E8CE8A;">60 je\u00fbnes cons\u00e9cutifs</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:rgba(200,168,74,0.55);margin:4px 0;">ou</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:17px;color:#E8CE8A;">nourrir 60 pauvres \u00b7 ' + fmt(60 * cost) + ' \u20AC</div>'
      + (kd > 1 ? '<div style="font-size:12px;color:rgba(200,168,74,0.6);font-style:italic;margin-top:10px;">Pour ' + kd + ' jours : jusqu\u2019\u00e0 ' + (kd * 60) + ' je\u00fbnes, ou ' + fmt(kd * 60 * cost) + ' \u20AC.</div>' : '')
      + '<div style="font-size:11px;color:rgba(200,168,74,0.45);font-style:italic;margin-top:10px;line-height:1.6;">Ordre : affranchir un esclave (caduc) \u2192 je\u00fbner \u2192 sinon nourrir. Selon certains savants, une seule kaff\u00e2ra suffit pour plusieurs jours d\u2019un m\u00eame Ramadan \u2014 r\u00e9f\u00e8re-toi \u00e0 un savant.</div></div>';
  }
}
function openFidya() {
  closeFidya();
  var ov = document.createElement('div');
  ov.id = 'fidya-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  var fld = function(id, label, ph, unit, val) {
    return '<div style="margin-bottom:14px;"><label style="display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,168,74,0.55);margin-bottom:7px;">' + label + '</label>'
      + '<div style="position:relative;"><input id="' + id + '" type="text" inputmode="decimal" placeholder="' + ph + '"' + (val !== undefined ? ' value="' + val + '"' : '') + ' oninput="computeFidya()" style="width:100%;box-sizing:border-box;padding:14px 16px;border-radius:13px;border:1px solid rgba(200,168,74,0.18);background:linear-gradient(180deg,#16110a,#100c07);color:#F0EADB;font-size:16px;font-family:\'Cormorant Garamond\',serif;outline:none;">'
      + (unit ? '<span style="position:absolute;right:16px;top:50%;transform:translateY(-50%);font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(200,168,74,0.45);pointer-events:none;">' + unit + '</span>' : '')
      + '</div></div>';
  };
  var eyebrow = function(t) { return '<div style="display:flex;align-items:center;gap:12px;margin:26px 0 14px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.28),transparent);"></div><span style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,168,74,0.6);white-space:nowrap;">' + t + '</span><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.28),transparent);"></div></div>'; };
  ov.innerHTML = '<div style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeFidya()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Scheherazade New\',serif;font-size:34px;color:#E8CE8A;text-shadow:0 0 26px rgba(232,206,138,0.28);line-height:1.3;">\u0641\u0650\u062F\u0652\u064A\u064E\u0629 \u00b7 \u0643\u064E\u0641\u0651\u064E\u0627\u0631\u064E\u0629</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:24px;color:#EADCB6;margin-top:8px;">Fidya & Kaff\u00e2ra</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:#9c8c64;margin-top:6px;line-height:1.5;">R\u00e9parer les je\u00fbnes manqu\u00e9s ou rompus</div>'
    + '<div style="margin-top:24px;padding:14px 16px;border-radius:14px;border:1px solid rgba(200,168,74,0.18);background:rgba(200,168,74,0.04);font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:rgba(200,168,74,0.7);line-height:1.6;text-align:center;">Si tu <b>peux</b> rattraper (maladie pass\u00e9e, voyage, menstrues) : tu <b>je\u00fbnes</b> les jours, sans argent (qad\u00e2\u2019).</div>'
    + fld('fk-cost', 'Co\u00fbt d\u2019un repas / pauvre nourri', '5', '\u20AC', '5')
    + eyebrow('Fidya \u00b7 non rattrapable')
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);font-style:italic;font-family:\'Cormorant Garamond\',serif;margin-bottom:12px;text-align:center;">Maladie chronique, grand \u00e2ge \u2014 nourrir 1 pauvre par jour manqu\u00e9.</div>'
    + fld('fk-fidya-days', 'Jours non rattrapables', '0', '', '')
    + '<div id="fk-fidya-result"></div>'
    + eyebrow('Kaff\u00e2ra \u00b7 rupture volontaire')
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);font-style:italic;font-family:\'Cormorant Garamond\',serif;margin-bottom:12px;text-align:center;">Je\u00fbne rompu d\u00e9lib\u00e9r\u00e9ment (rapport conjugal ; selon certains, manger volontairement).</div>'
    + fld('fk-kaffara-days', 'Jours rompus volontairement', '0', '', '')
    + '<div id="fk-kaffara-result"></div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.42);line-height:1.7;margin-top:26px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Calcul indicatif. Cas particuliers (femme enceinte ou allaitante : rattrapage et/ou fidya selon les avis ; d\u00e9lai d\u00e9pass\u00e9 jusqu\u2019au Ramadan suivant) \u2192 r\u00e9f\u00e8re-toi \u00e0 un savant. Le co\u00fbt d\u2019un repas (valeur d\u2019un mudd de l\u2019aliment de base) varie : v\u00e9rifie le montant de ta r\u00e9gion.</div>'
    + '</div>';
  document.body.appendChild(ov);
  computeFidya();
}
window.renderFidyaCard = renderFidyaCard;
window.openFidya = openFidya;
window.closeFidya = closeFidya;
window.computeFidya = computeFidya;

```

═══════════════════════════════════════════
## Édit 2 — ajouter la carte au hub Repères
═══════════════════════════════════════════
Repérer :
```js
    + renderZakatFitrCard()
    + _repereJeuneCard()
```
REMPLACER par :
```js
    + renderZakatFitrCard()
    + renderFidyaCard()
    + _repereJeuneCard()
```

═══════════════════════════════════════════
## Vérif attendue
- Repères → 4 cartes : Zakât · Zakât al-Fitr · **Fidya/Kaffâra** · Jeûne.
- Overlay : note qadâ' (rattrapage = jeûner), champ coût d'un repas partagé, bloc **Fidya** (jours → montant à donner), bloc **Kaffâra** (jours → 60 jeûnes ou nourrir 60 + ordre + divergence).
- Notes sourcées (cas enceinte/allaitante → savant).

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: calculateur Fidya / Kaffara (qada, fidya, kaffara)"
git push
```
