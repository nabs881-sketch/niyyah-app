# SPEC-QADA-SALAT

> Prérequis : Repères embelli en place (openRepere, v2338).

## But
Outil **Prières à rattraper (qadâ' as-salât)** : compteur persistant par prière
(Fajr/Dhuhr/Asr/Maghrib/Isha). On saisit le nombre manqué, on appuie « − 1 » à chaque
rattrapage. Nouvelle famille **Réparer** dans Repères (regroupe Fidya + ce compteur).

État : `niyyah_qada_salat` = { fajr, dhuhr, asr, maghrib, isha }.

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
var _QADA_PRAYERS = [['fajr', 'Fajr'], ['dhuhr', 'Dhuhr'], ['asr', 'Asr'], ['maghrib', 'Maghrib'], ['isha', 'Isha']];
function _qadaState() { try { return JSON.parse(safeGetItem('niyyah_qada_salat') || '{}'); } catch (e) { return {}; } }
function _qadaSave(s) { safeSetItem('niyyah_qada_salat', JSON.stringify(s)); }
function _qadaSet(p, v) { var s = _qadaState(); s[p] = Math.max(0, Math.round(parseFloat(v)) || 0); _qadaSave(s); renderQadaBody(); }
function _qadaDec(p) { var s = _qadaState(); s[p] = Math.max(0, (s[p] || 0) - 1); _qadaSave(s); renderQadaBody(); }
function renderQadaBody() {
  var s = _qadaState(), total = 0;
  _QADA_PRAYERS.forEach(function(p) { total += (s[p[0]] || 0); });
  var rows = '';
  _QADA_PRAYERS.forEach(function(p) {
    var n = s[p[0]] || 0;
    rows += '<div style="display:flex;align-items:center;gap:12px;padding:13px 0;border-bottom:1px solid rgba(200,168,74,0.1);">'
      + '<div style="flex:1;font-family:\'Cormorant Garamond\',serif;font-size:19px;color:#E8CE8A;">' + p[1] + '</div>'
      + '<input type="text" inputmode="numeric" value="' + n + '" onchange="_qadaSet(\'' + p[0] + '\',this.value)" style="width:62px;text-align:center;padding:9px 6px;border-radius:11px;border:1px solid rgba(200,168,74,0.18);background:linear-gradient(180deg,#16110a,#100c07);color:#F0EADB;font-size:16px;font-family:\'Cormorant Garamond\',serif;outline:none;">'
      + '<button onclick="_qadaDec(\'' + p[0] + '\')" aria-label="Rattrap\u00e9e" style="padding:9px 13px;border-radius:11px;border:1px solid rgba(200,168,74,0.3);background:transparent;color:#E8CE8A;font-family:\'Cormorant Garamond\',serif;font-size:14px;cursor:pointer;white-space:nowrap;">\u2212\u00a01</button>'
      + '</div>';
  });
  var body = document.getElementById('qada-body');
  if (body) body.innerHTML = '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:15px;color:rgba(200,168,74,0.7);margin-bottom:14px;">' + (total > 0 ? ('Reste ' + total + ' pri\u00e8re' + (total > 1 ? 's' : '') + ' \u00e0 rattraper') : 'Aucune pri\u00e8re en attente.') + '</div>' + rows;
}
function closeQada() { var o = document.getElementById('qada-overlay'); if (o) o.remove(); }
function renderQadaCard() {
  return '<div onclick="openQada()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 2.5-6.2"/><path d="M3 3v4h4"/><path d="M12 8v4l3 2"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Pri\u00e8res \u00e0 rattraper</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Suivre tes qad\u00e2\u2019 de salât</div></div>'
    + '<div style="color:rgba(200,168,74,0.3);font-size:18px;">\u203a</div></div>';
}
function openQada() {
  closeQada();
  var ov = document.createElement('div');
  ov.id = 'qada-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  ov.innerHTML = '<div style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeQada()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Scheherazade New\',serif;font-size:42px;color:#E8CE8A;text-shadow:0 0 28px rgba(232,206,138,0.28);line-height:1.1;">\u0642\u064E\u0636\u064E\u0627\u0621</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:25px;color:#EADCB6;margin-top:8px;">Pri\u00e8res \u00e0 rattraper</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:#9c8c64;margin-top:6px;">Compte tes pri\u00e8res manqu\u00e9es, coche au fur et \u00e0 mesure</div>'
    + '<div id="qada-body" style="margin-top:26px;"></div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.42);line-height:1.7;margin-top:24px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Saisis le nombre de pri\u00e8res manqu\u00e9es par type, puis appuie sur \u00ab \u2212 1 \u00bb chaque fois que tu en rattrapes une. Selon l\u2019avis majoritaire, les pri\u00e8res manqu\u00e9es se rattrapent (qad\u00e2\u2019) ; en cas de doute sur ta situation, r\u00e9f\u00e8re-toi \u00e0 un savant.</div>'
    + '</div>';
  document.body.appendChild(ov);
  renderQadaBody();
}
window.openQada = openQada;
window.closeQada = closeQada;
window._qadaSet = _qadaSet;
window._qadaDec = _qadaDec;
window.renderQadaBody = renderQadaBody;
window.renderQadaCard = renderQadaCard;

```

═══════════════════════════════════════════
## Édit 2 — ajouter la carte dans Repères (famille « Réparer »)
═══════════════════════════════════════════
Dans `openRepere`, repérer :
```js
    + eb('Aum\u00f4nes')
    + renderZakatCard()
    + renderZakatFitrCard()
    + renderFidyaCard()
    + eb('Temps & rep\u00e8res')
    + renderConvertCard()
    + _repereJeuneCard()
```
REMPLACER par :
```js
    + eb('Aum\u00f4nes')
    + renderZakatCard()
    + renderZakatFitrCard()
    + eb('R\u00e9parer')
    + renderFidyaCard()
    + renderQadaCard()
    + eb('Temps & rep\u00e8res')
    + renderConvertCard()
    + _repereJeuneCard()
```

═══════════════════════════════════════════
## Vérif attendue
- Repères → 3 familles : **Aumônes** (Zakât · Zakât al-Fitr) · **Réparer** (Fidya · Prières à rattraper) · **Temps & repères** (Convertisseur · Jeûne).
- Carte « Prières à rattraper » → overlay قَضَاء : 5 lignes (Fajr…Isha), chaque ligne = un nombre éditable + bouton « − 1 ».
- Le total « Reste N prières à rattraper » se met à jour ; valeurs **persistées** (on rouvre → c'est gardé).
- Note théologique en bas.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: suivi des prieres a rattraper (qada as-salat) + famille Reparer"
git push
```
