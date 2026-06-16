# SPEC-ISTIKHARA

> Prérequis : Repères embelli (openRepere, v2338). Du'â vérifiée : Sahih al-Bukhari 1166 (Jâbir).
> Nouvelle famille **« S'orienter »** en tête de Repères, avec la carte Istikhâra.

## But
Guide pratique de la **Salât al-Istikhâra** : explication + étapes + la du'â authentique
(arabe + translittération + sens FR), source citée. Contenu, pas de calcul.

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
function renderIstikharaCard() {
  return '<div onclick="openIstikhara()" style="position:relative;background:linear-gradient(165deg,#1a130b,#0d0a06);border:1px solid rgba(200,168,74,0.22);border-radius:16px;padding:15px 16px;margin-bottom:8px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.08),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.16),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M14.8 9.2l-2 4.6-4.6 2 2-4.6z"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Istikh\u00e2ra</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.55);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">La pri\u00e8re de consultation</div></div>'
    + '<div style="color:rgba(200,168,74,0.3);font-size:18px;">\u203a</div></div>';
}
function closeIstikhara() { var o = document.getElementById('istikhara-overlay'); if (o) o.remove(); }
function openIstikhara() {
  closeIstikhara();
  var step = function(n, t) { return '<div style="display:flex;gap:13px;margin-bottom:13px;align-items:flex-start;"><div style="flex-shrink:0;width:26px;height:26px;border-radius:50%;border:1px solid rgba(232,206,138,0.4);display:flex;align-items:center;justify-content:center;font-family:\'Cormorant Garamond\',serif;font-size:14px;color:#E8CE8A;">' + n + '</div><div style="flex:1;font-family:\'Cormorant Garamond\',serif;font-size:15px;line-height:1.5;color:rgba(240,234,214,0.85);">' + t + '</div></div>'; };
  var head = function(t) { return '<div style="display:flex;align-items:center;gap:10px;margin:26px 2px 14px;"><div style="flex:1;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.22));"></div><span style="font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:rgba(200,168,74,0.55);">' + t + '</span><div style="flex:1;height:1px;background:linear-gradient(90deg,rgba(200,168,74,0.22),transparent);"></div></div>'; };
  var ov = document.createElement('div');
  ov.id = 'istikhara-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3200;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(120% 80% at 50% -10%,#1c140b 0%,#0b0805 55%,#070504 100%);';
  ov.innerHTML = '<div style="max-width:460px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 24px calc(48px + env(safe-area-inset-bottom));">'
    + '<button onclick="closeIstikhara()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div style="text-align:center;font-family:\'Scheherazade New\',serif;font-size:40px;color:#E8CE8A;text-shadow:0 0 28px rgba(232,206,138,0.28);line-height:1.2;">اسْتِخَارَة</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-size:25px;color:#EADCB6;margin-top:8px;">Sal\u00e2t al-Istikh\u00e2ra</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:#9c8c64;margin-top:6px;">Demander \u00e0 Allah de t\u2019orienter dans une d\u00e9cision</div>'
    + '<div style="margin-top:22px;font-family:\'Cormorant Garamond\',serif;font-size:15px;line-height:1.6;color:rgba(240,234,214,0.8);text-align:center;">Deux unit\u00e9s de pri\u00e8re sur\u00e9rogatoire suivies d\u2019une invocation, pour demander \u00e0 Allah de t\u2019orienter vers ce qui est bon \u2014 dans toute affaire, petite ou grande. Le Proph\u00e8te \uFDFA l\u2019enseignait comme il enseignait une sourate.</div>'
    + head('Comment faire')
    + step('1', 'Forme une intention claire sur ton affaire.')
    + step('2', 'Accomplis 2 rak\u02bba sur\u00e9rogatoires (en dehors des pri\u00e8res obligatoires).')
    + step('3', 'Apr\u00e8s le sal\u00e2m, r\u00e9cite l\u2019invocation ci-dessous, en nommant ton besoin \u00e0 l\u2019endroit de \u00ab cette affaire \u00bb.')
    + step('4', 'Place ta confiance en Allah, puis agis : ce qui est bon te sera facilit\u00e9.')
    + head('L\u2019invocation')
    + '<div style="padding:22px 18px;border-radius:16px;border:1px solid rgba(232,206,138,0.3);background:radial-gradient(120% 150% at 50% 0%,rgba(232,206,138,0.1),rgba(232,206,138,0.02) 72%);">'
      + '<div dir="rtl" style="font-family:\'Scheherazade New\',serif;font-size:23px;line-height:2.05;text-align:center;color:#F4ECD6;">اللَّهُمَّ إِنِّي أَسْتَخِيرُكَ بِعِلْمِكَ، وَأَسْتَقْدِرُكَ بِقُدْرَتِكَ، وَأَسْأَلُكَ مِنْ فَضْلِكَ الْعَظِيمِ، فَإِنَّكَ تَقْدِرُ وَلَا أَقْدِرُ، وَتَعْلَمُ وَلَا أَعْلَمُ، وَأَنْتَ عَلَّامُ الْغُيُوبِ. اللَّهُمَّ إِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ خَيْرٌ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاقْدُرْهُ لِي وَيَسِّرْهُ لِي ثُمَّ بَارِكْ لِي فِيهِ، وَإِنْ كُنْتَ تَعْلَمُ أَنَّ هَذَا الْأَمْرَ شَرٌّ لِي فِي دِينِي وَمَعَاشِي وَعَاقِبَةِ أَمْرِي فَاصْرِفْهُ عَنِّي وَاصْرِفْنِي عَنْهُ، وَاقْدُرْ لِيَ الْخَيْرَ حَيْثُ كَانَ ثُمَّ أَرْضِنِي بِهِ.</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13.5px;line-height:1.65;color:rgba(200,168,74,0.75);margin-top:16px;text-align:center;">All\u00e2humma inn\u00ee astakh\u00eeruka bi-\u2019ilmika, wa astaqdiruka bi-qudratika, wa as\u2019aluka min fadlika-l-\u2019az\u00eem, fa-innaka taqdiru wa l\u00e2 aqdiru, wa ta\u2019lamu wa l\u00e2 a\u2019lamu, wa anta \u2019all\u00e2mu-l-ghuy\u00fbb. All\u00e2humma in kunta ta\u2019lamu anna h\u00e2dha-l-amra khayrun l\u00ee f\u00ee d\u00een\u00ee wa ma\u2019\u00e2sh\u00ee wa \u2019\u00e2qibati amr\u00ee fa-qdurhu l\u00ee wa yassirhu l\u00ee thumma b\u00e2rik l\u00ee f\u00eehi, wa in kunta ta\u2019lamu anna h\u00e2dha-l-amra sharrun l\u00ee f\u00ee d\u00een\u00ee wa ma\u2019\u00e2sh\u00ee wa \u2019\u00e2qibati amr\u00ee fa-srifhu \u2019ann\u00ee wa-srifn\u00ee \u2019anhu, wa-qdur liya-l-khayra haythu k\u00e2na thumma ardin\u00ee bihi.</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;line-height:1.6;color:rgba(240,234,214,0.78);margin-top:14px;text-align:center;">\u00d4 Allah, je Te demande de choisir pour moi par Ta science et de me rendre capable par Ta puissance, et je T\u2019implore de Ton immense gr\u00e2ce ; car Tu peux et je ne peux pas, Tu sais et je ne sais pas, et Tu es le Connaisseur des choses cach\u00e9es. \u00d4 Allah, si Tu sais que cette affaire est un bien pour moi dans ma religion, ma vie et l\u2019issue de mes affaires, d\u00e9cr\u00e8te-la-moi, facilite-la-moi et b\u00e9nis-la pour moi. Et si Tu sais qu\u2019elle est un mal pour moi dans tout cela, d\u00e9tourne-la de moi et d\u00e9tourne-moi d\u2019elle, et d\u00e9cr\u00e8te-moi le bien o\u00f9 qu\u2019il soit, puis fais que j\u2019en sois satisfait.</div>'
    + '</div>'
    + '<div style="text-align:center;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:13px;color:rgba(200,168,74,0.6);margin-top:12px;">\u00c0 \u00ab cette affaire \u00bb, nomme ton besoin pr\u00e9cis.</div>'
    + '<div style="font-size:11px;color:rgba(200,168,74,0.42);line-height:1.7;margin-top:22px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">La r\u00e9ponse n\u2019est pas forc\u00e9ment un r\u00eave : elle se manifeste souvent par la facilitation des choses et l\u2019inclination du c\u0153ur \u2014 un r\u00eave n\u2019est pas une condition. Certains savants recommandent de r\u00e9citer al-K\u00e2fir\u00fbn puis al-Ikhl\u00e2s dans les deux rak\u02bba. Source : hadith de J\u00e2bir ibn \u02bbAbdill\u00e2h, Sahih al-Bukhari 1166.</div>'
    + '</div>';
  document.body.appendChild(ov);
}
window.renderIstikharaCard = renderIstikharaCard;
window.openIstikhara = openIstikhara;
window.closeIstikhara = closeIstikhara;

```

═══════════════════════════════════════════
## Édit 2 — ajouter la famille « S'orienter » en tête de Repères
═══════════════════════════════════════════
Dans `openRepere`, repérer :
```js
    + eb('Aum\u00f4nes')
```
REMPLACER par :
```js
    + eb('S\u2019orienter')
    + renderIstikharaCard()
    + eb('Aum\u00f4nes')
```

═══════════════════════════════════════════
## Vérif attendue
- Repères : famille **« S'orienter »** en tête → carte **Istikhâra** (icône boussole).
- Overlay اسْتِخَارَة : intro + 4 étapes + l'invocation (arabe + translittération + sens FR) dans un encadré doré + note sur la réponse + source Bukhari 1166.
- L'arabe s'affiche bien en RTL, calligraphié.

⚠️ **Vérifie d'un coup d'œil que l'arabe de la du'â s'affiche complet et correct** (copié de sunnah.com Bukhari 1166). Si un caractère a sauté à l'application, redis-le-moi.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "repere: guide Istikhara (etapes + dua authentique Bukhari 1166)"
git push
```
