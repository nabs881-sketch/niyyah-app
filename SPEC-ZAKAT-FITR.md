# SPEC-ZAKAT-FITR

> Prérequis : Repères en place (SPEC-REPERE-1). Réutilise `_zNum` (déjà présent via Zakât al-mâl).

## But
Ajouter un calculateur **Zakât al-Fitr** dans Repères (entre Zakât al-mâl et Jeûne) :
nombre de personnes → montant en argent + équivalent en nourriture (sâ').

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
function renderZakatFitrCard() {
  return '<div onclick="openZakatFitr()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22V9"/><path d="M12 9c-3 0-4-2-4-4 2 0 4 1 4 4z"/><path d="M12 9c3 0 4-2 4-4-2 0-4 1-4 4z"/><path d="M12 14c-3 0-4-2-4-4 2 0 4 1 4 4z"/><path d="M12 14c3 0 4-2 4-4-2 0-4 1-4 4z"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Zak\u00e2t al-Fitr</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">L\u2019aum\u00f4ne de la rupture du je\u00fbne</div></div></div>';
}
function closeZakatFitr() { var ov = document.getElementById('zakatfitr-overlay'); if (ov) ov.remove(); }
function computeZakatFitr() {
  var n = Math.max(0, Math.round(_zNum('zf-pers')));
  var m = _zNum('zf-montant');
  var res = document.getElementById('zf-result'); if (!res) return;
  var fmt = function(x){ return x.toLocaleString('fr-FR', {maximumFractionDigits:2}); };
  if (n <= 0) {
    res.innerHTML = '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:16px;color:#C8A84A;border-top:1px solid rgba(200,168,74,0.15);margin-top:8px;padding-top:18px;">Indique le nombre de personnes du foyer.</div>';
    return;
  }
  var argent = n * m, sa = n, kg = sa * 2.5;
  res.innerHTML = '<div style="border-top:1px solid rgba(200,168,74,0.15);margin-top:8px;padding-top:20px;">'
    + '<div style="text-align:center;padding:24px 18px;border-radius:18px;border:1px solid rgba(232,206,138,0.32);background:radial-gradient(120% 150% at 50% 0%,rgba(232,206,138,0.14),rgba(232,206,138,0.02) 72%);">'
    + '<div style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(232,206,138,0.7);margin-bottom:8px;">\u00c0 verser pour ' + n + ' personne' + (n > 1 ? 's' : '') + '</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-weight:600;font-size:40px;line-height:1;background:linear-gradient(180deg,#F8EAC2,#D4AF37);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">' + fmt(argent) + ' \u20AC</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.7);margin-top:12px;line-height:1.5;">ou ' + fmt(sa) + ' s\u00e2\u2019 de nourriture<br>(\u2248 ' + fmt(kg) + ' kg de bl\u00e9, riz, dattes ou orge)</div>'
    + '</div></div>';
}
function openZakatFitr() {
  closeZakatFitr();
  var ov = document.createElement('div');
  ov.id = 'zakatfitr-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  var fld = function(id, label, ph, unit, val) {
    return '<div style="margin-bottom:16px;"><label style="display:block;font-size:11px;letter-spacing:.16em;text-transform:uppercase;color:rgba(200,168,74,0.55);margin-bottom:7px;">' + label + '</label>'
      + '<div style="position:relative;"><input id="' + id + '" type="text" inputmode="decimal" placeholder="' + ph + '"' + (val !== undefined ? ' value="' + val + '"' : '') + ' oninput="computeZakatFitr()" style="width:100%;box-sizing:border-box;padding:14px 16px;border-radius:13px;border:1px solid rgba(200,168,74,0.18);background:linear-gradient(180deg,#16110a,#100c07);color:#F0EADB;font-size:16px;font-family:\'Cormorant Garamond\',serif;outline:none;">'
      + (unit ? '<span style="position:absolute;right:16px;top:50%;transform:translateY(-50%);font-family:\'Cormorant Garamond\',serif;font-size:15px;color:rgba(200,168,74,0.45);pointer-events:none;">' + unit + '</span>' : '')
      + '</div></div>';
  };
  ov.innerHTML = '<div style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeZakatFitr()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Scheherazade New\',serif;font-size:38px;color:#E8CE8A;text-shadow:0 0 28px rgba(232,206,138,0.28);line-height:1.3;">\u0632\u064E\u0643\u064E\u0627\u0629 \u0627\u0644\u0641\u0650\u0637\u0631</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:25px;color:#EADCB6;margin-top:8px;">Zak\u00e2t al-Fitr</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:#9c8c64;margin-top:6px;line-height:1.5;">L\u2019aum\u00f4ne de la rupture \u2014 un s\u00e2\u2019 par personne,<br>avant la pri\u00e8re de l\u2019A\u00efd</div>'
    + '<div style="margin-top:28px;">'
    + fld('zf-pers', 'Personnes du foyer', '1', '', '1')
    + fld('zf-montant', 'Montant par personne', '9', '\u20AC', '9')
    + '</div>'
    + '<div id="zf-result"></div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.42);line-height:1.7;margin-top:26px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">'
    + 'Un s\u00e2\u2019 (\u2248 2,5 kg de l\u2019aliment de base) par personne du foyer \u2014 soi-m\u00eame et les personnes \u00e0 charge. \u00c0 verser avant la pri\u00e8re de l\u2019A\u00efd al-Fitr (on peut anticiper d\u2019un jour ou deux). '
    + 'Sur la forme : la majorit\u00e9 (M\u00e2lik, Sh\u00e2fi\u2019\u00ee, Hanbal) la donne en nourriture ; les Hanafites et de nombreux contemporains permettent la valeur en argent, par commodit\u00e9 \u2014 \u00e0 toi selon l\u2019avis que tu suis. '
    + 'Le montant par personne = la valeur d\u2019un s\u00e2\u2019 de l\u2019aliment de base : v\u00e9rifie celui fix\u00e9 par une institution de ta r\u00e9gion.'
    + '</div></div>';
  document.body.appendChild(ov);
  computeZakatFitr();
}
window.renderZakatFitrCard = renderZakatFitrCard;
window.openZakatFitr = openZakatFitr;
window.closeZakatFitr = closeZakatFitr;
window.computeZakatFitr = computeZakatFitr;

```

═══════════════════════════════════════════
## Édit 2 — ajouter la carte au hub Repères
═══════════════════════════════════════════
Repérer :
```js
    + renderZakatCard()
    + _repereJeuneCard()
```
REMPLACER par :
```js
    + renderZakatCard()
    + renderZakatFitrCard()
    + _repereJeuneCard()
```

═══════════════════════════════════════════
## Vérif attendue
- Repères → 3 cartes : Zakât · **Zakât al-Fitr** · Jeûne.
- Tap Zakât al-Fitr → overlay زَكَاة الفِطْر : champs « Personnes du foyer » + « Montant par personne (€) », résultat live (montant total en or champagne + équivalent en sâ'/kg).
- Notes : 1 sâ'/personne, avant la prière de l'Aïd, différence nourriture/argent.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: calculateur Zakat al-Fitr (sa par personne, argent ou nourriture)"
git push
```
