# SPEC-PRIER-MIEUX

> Module plein écran (overlay) : diagnostic doux en 2 taps → Boost d'Amour.
> Entrée **temporaire** sur l'accueil (près des Horaires) — à relocaliser plus tard.

## But
Quand la prière pèse, l'utilisateur ouvre « Prier mieux » : il choisit ce qu'il ressent (1 tap),
l'app reflète la cause racine et confirme (1 tap), puis délivre un texte court qui ranime
l'amour d'Allah. Anti-gamification : aucun score, sortie vers l'action (prier).

═══════════════════════════════════════════
## Édit 1 — ajouter les fonctions
═══════════════════════════════════════════
Repérer `function renderRepereHub() {` et INSÉRER **juste avant** :

```js
var _pmStep = 'intro', _pmIdx = -1;
var _PM_PROFILES = [
  {
    sym: 'Je suis vid\u00e9, j\u2019ai juste envie de m\u2019\u00e9crouler.',
    reflect: 'Quand tu es vid\u00e9, ton corps r\u00e9clame un repos o\u00f9 il ne bouge plus \u2014 un \u00e9cran, un canap\u00e9. Et la pri\u00e8re, qui demande un effort, passe pour une corv\u00e9e de plus \u00e0 exp\u00e9dier.',
    boost: 'Tu es vid\u00e9, et Lui le sait mieux que toi. Tu cherches un canap\u00e9 ; Il t\u2019ouvre un refuge. Le repos de l\u2019\u00e9cran ne touche que tes yeux \u2014 celui de la pri\u00e8re descend jusqu\u2019au c\u0153ur. Ne te tra\u00eene pas vers Lui comme vers une corv\u00e9e de plus : Il ne t\u2019a pas appel\u00e9 pour t\u2019\u00e9puiser, mais pour te d\u00e9charger. Pose ton front. L\u00e0, quelques minutes, plus rien n\u2019est exig\u00e9 de toi \u2014 juste d\u2019\u00eatre l\u00e0, aim\u00e9. Le Roi t\u2019attend non pour te juger, mais pour t\u2019all\u00e9ger.'
  },
  {
    sym: 'Je suis d\u00e9bord\u00e9, je veux que \u00e7a aille vite.',
    reflect: 'La pri\u00e8re a gliss\u00e9 dans ta t\u00eate de la case \u00ab rendez-vous \u00bb \u00e0 la case \u00ab t\u00e2che \u00bb. Tu la vis comme du temps perdu, pas comme la source qui b\u00e9nit tout le reste.',
    boost: 'Tu cours. Mais cours-tu vers ta vie, ou loin d\u2019elle ? Ces minutes ne te sont pas vol\u00e9es : ce sont les seules de ta journ\u00e9e qui ne te demandent rien \u00e0 produire. Allah ne t\u2019a pas convoqu\u00e9 pour freiner ta course \u2014 Il t\u2019a invit\u00e9 pour b\u00e9nir tout ce qui vient apr\u00e8s. Ce que tu crois \u00ab perdre \u00bb ici, Il te le rend dans tout le reste. Se pr\u00e9senter press\u00e9 devant son Seigneur, c\u2019est saluer un roi sans le regarder. Reste. Une respiration de plus. Ce rendez-vous porte tous les autres.'
  },
  {
    sym: 'Ma t\u00eate part partout, je n\u2019arrive pas \u00e0 \u00eatre l\u00e0.',
    reflect: 'Ton attention a \u00e9t\u00e9 dress\u00e9e par l\u2019\u00e9cran \u00e0 fuir le pr\u00e9sent. Le silence de la pri\u00e8re te met mal \u00e0 l\u2019aise \u2014 alors ton esprit s\u2019\u00e9chappe.',
    boost: 'Ton esprit s\u2019\u00e9parpille parce qu\u2019on l\u2019a entra\u00een\u00e9 \u00e0 \u00eatre partout, sauf ici. Mais regarde o\u00f9 tu te tiens : devant Celui qui est plus proche de toi que ta propre veine. Tu n\u2019as pas \u00e0 Le chercher \u2014 Il est d\u00e9j\u00e0 l\u00e0, \u00e0 t\u2019\u00e9couter, m\u00eame quand ton c\u0153ur vagabonde. Alors quand une pens\u00e9e t\u2019emporte, ne te juge pas : reviens, doucement, comme on revient vers quelqu\u2019un qu\u2019on aime. Chaque retour est un acte d\u2019amour. Il ne compte pas tes distractions \u2014 Il compte tes retours.'
  },
  {
    sym: 'Je fais les gestes, mais je ne ressens plus rien.',
    reflect: 'L\u2019habitude a anesth\u00e9si\u00e9 le sens. Le geste a surv\u00e9cu, mais le c\u0153ur a oubli\u00e9 qu\u2019il parle \u00e0 Quelqu\u2019un.',
    boost: 'Tes l\u00e8vres connaissent les mots ; ton c\u0153ur, lui, les a peut-\u00eatre oubli\u00e9s. Mais souviens-toi : tu ne parles pas dans le vide. \u00c0 chaque \u00ab All\u00e2hu akbar \u00bb, Quelqu\u2019un \u00e9coute, Quelqu\u2019un r\u00e9pond, Quelqu\u2019un se r\u00e9jouit que tu sois venu. Et si aujourd\u2019hui tu ne ressens rien ? Viens quand m\u00eame. Aimer, parfois, c\u2019est rester fid\u00e8le au rendez-vous m\u00eame les jours sans \u00e9tincelle. Choisis un seul mot \u2014 un seul \u2014 et dis-le comme la premi\u00e8re fois. Il pr\u00e9f\u00e8re ton \u00ab Subh\u00e2na Rabb\u00ee \u00bb maladroit et pr\u00e9sent \u00e0 mille pri\u00e8res parfaites et absentes.'
  },
  {
    sym: 'Je me sens trop loin, trop indigne pour prier.',
    reflect: 'Tu crois devoir \u00eatre \u00ab propre \u00bb pour m\u00e9riter de venir. Et ta honte te tient loin de la seule porte qui pourrait te laver.',
    boost: 'Tu crois devoir \u00eatre pur pour venir. C\u2019est l\u2019inverse : on ne se lave pas avant d\u2019entrer dans l\u2019eau. Il ne t\u2019a jamais demand\u00e9 d\u2019\u00eatre parfait pour te pr\u00e9senter \u2014 Il t\u2019a demand\u00e9 de te pr\u00e9senter pour \u00eatre lav\u00e9. Ta honte te souffle \u00ab pas toi, pas ce soir \u00bb ; sa mis\u00e9ricorde, elle, a laiss\u00e9 la porte ouverte expr\u00e8s pour les soirs comme celui-ci. Celui qui revient en boitant Lui est plus cher que celui qui se croit en r\u00e8gle et s\u2019\u00e9loigne. Ne fuis pas Celui qui t\u2019attend pour te pardonner. Pose-toi. Tu n\u2019es pas de trop \u2014 tu es exactement celui qu\u2019Il appelle.'
  }
];
function closePrierMieux() { var o = document.getElementById('prier-mieux-overlay'); if (o) o.remove(); }
function _pmGo(s) { _pmStep = s; renderPM(); }
function _pmPick(i) { _pmIdx = i; _pmStep = 'reflect'; renderPM(); }
function _pmConfirm() { _pmStep = 'boost'; renderPM(); }
function renderPM() {
  var b = document.getElementById('pm-body'); if (!b) return;
  var html = '';
  if (_pmStep === 'intro') {
    html = '<div style="padding-top:8vh;text-align:center;">'
      + '<div style="font-family:\'Scheherazade New\',serif;font-size:46px;color:#E8CE8A;text-shadow:0 0 30px rgba(232,206,138,0.3);line-height:1.1;">\u062E\u064F\u0634\u064F\u0648\u0639</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-weight:300;font-size:30px;letter-spacing:.05em;color:#EADCB6;margin-top:10px;">Prier mieux</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:16px;line-height:1.6;color:rgba(200,168,74,0.7);margin:22px auto 0;max-width:330px;">Ta pri\u00e8re te p\u00e8se, file trop vite, ou sonne creux ? Ce n\u2019est pas un manque de foi \u2014 c\u2019est un c\u0153ur fatigu\u00e9. Pose-toi une minute, on va trouver ensemble ce qui bloque.</div>'
      + '<button onclick="_pmGo(\'symptom\')" style="margin-top:34px;padding:14px 40px;border-radius:30px;border:1px solid rgba(232,206,138,0.5);background:linear-gradient(180deg,rgba(232,206,138,0.16),rgba(232,206,138,0.04));color:#E8CE8A;font-family:\'Cormorant Garamond\',serif;font-size:17px;letter-spacing:.04em;cursor:pointer;">Commencer</button>'
      + '</div>';
  } else if (_pmStep === 'symptom') {
    html = '<div style="padding-top:5vh;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:21px;line-height:1.5;color:#EADCB6;text-align:center;margin-bottom:26px;">L\u00e0, maintenant, quand tu te l\u00e8ves pour prier\u2026 qu\u2019est-ce qui p\u00e8se le plus ?</div>';
    _PM_PROFILES.forEach(function(p, i) {
      html += '<button onclick="_pmPick(' + i + ')" style="display:block;width:100%;box-sizing:border-box;text-align:left;margin-bottom:11px;padding:16px 18px;border-radius:15px;border:1px solid rgba(200,168,74,0.22);background:linear-gradient(165deg,#1a130b,#0d0a06);color:#F0EADB;font-family:\'Cormorant Garamond\',serif;font-size:16px;line-height:1.4;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.06);">' + p.sym + '</button>';
    });
    html += '</div>';
  } else if (_pmStep === 'reflect') {
    var p = _PM_PROFILES[_pmIdx];
    html = '<div style="padding-top:8vh;text-align:center;">'
      + '<div style="font-size:11px;letter-spacing:.24em;text-transform:uppercase;color:rgba(200,168,74,0.5);margin-bottom:18px;">Creusons une seconde</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:19px;line-height:1.6;color:#EADCB6;max-width:360px;margin:0 auto;">' + p.reflect + '</div>'
      + '<button onclick="_pmConfirm()" style="margin-top:32px;padding:14px 38px;border-radius:30px;border:1px solid rgba(232,206,138,0.5);background:linear-gradient(180deg,rgba(232,206,138,0.16),rgba(232,206,138,0.04));color:#E8CE8A;font-family:\'Cormorant Garamond\',serif;font-size:17px;cursor:pointer;">Oui\u2026 c\u2019est \u00e7a</button>'
      + '<div onclick="_pmGo(\'symptom\')" style="margin-top:18px;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.5);cursor:pointer;">Pas vraiment, c\u2019est autre chose</div>'
      + '</div>';
  } else if (_pmStep === 'boost') {
    var pb = _PM_PROFILES[_pmIdx];
    html = '<div style="padding-top:6vh;text-align:center;">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:24px;"><div style="width:46px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.45));"></div><div style="width:6px;height:6px;border:1px solid rgba(200,168,74,0.55);transform:rotate(45deg);"></div><div style="width:46px;height:1px;background:linear-gradient(90deg,rgba(200,168,74,0.45),transparent);"></div></div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;line-height:1.72;color:#F4ECD6;max-width:380px;margin:0 auto;">' + pb.boost + '</div>'
      + '<button onclick="closePrierMieux()" style="margin-top:36px;padding:15px 44px;border-radius:30px;border:1px solid #E8CE8A;background:linear-gradient(180deg,#F8EAC2,#D4AF37);color:#1a130b;font-family:\'Cormorant Garamond\',serif;font-size:17px;letter-spacing:.03em;cursor:pointer;">Je vais prier</button>'
      + '<div onclick="_pmGo(\'symptom\')" style="margin-top:18px;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.5);cursor:pointer;">\u2039 Recommencer</div>'
      + '</div>';
  }
  b.innerHTML = html;
}
function openPrierMieux() {
  closePrierMieux();
  _pmStep = 'intro'; _pmIdx = -1;
  var ov = document.createElement('div');
  ov.id = 'prier-mieux-overlay';
  ov.style.cssText = 'position:fixed;inset:0;z-index:3300;overflow-y:auto;-webkit-overflow-scrolling:touch;background:radial-gradient(125% 70% at 50% -8%,#1f1609 0%,#0c0805 56%,#070504 100%);';
  ov.innerHTML = '<button onclick="closePrierMieux()" aria-label="Fermer" style="position:fixed;top:calc(env(safe-area-inset-top,0px) + 20px);right:20px;width:42px;height:42px;border-radius:50%;border:1px solid rgba(200,168,74,0.28);background:rgba(20,15,8,0.6);color:#C8A84A;font-size:17px;cursor:pointer;z-index:5;">\u2715</button>'
    + '<div id="pm-body" style="max-width:440px;margin:0 auto;padding:calc(env(safe-area-inset-top,0px) + 40px) 26px calc(48px + env(safe-area-inset-bottom));"></div>';
  document.body.appendChild(ov);
  renderPM();
}
function _prierMieuxHomeEntry() {
  return '<div onclick="openPrierMieux()" style="position:relative;background:linear-gradient(165deg,#1f1609,#0d0a06);border:1px solid rgba(232,206,138,0.28);border-radius:16px;padding:15px 16px;margin-bottom:14px;display:flex;align-items:center;gap:14px;cursor:pointer;box-shadow:inset 0 1px 0 rgba(232,206,138,0.1),0 4px 16px rgba(0,0,0,0.35);">'
    + '<div style="flex-shrink:0;width:42px;height:42px;border-radius:50%;border:1px solid rgba(232,206,138,0.35);background:radial-gradient(circle at 50% 35%,rgba(232,206,138,0.2),rgba(232,206,138,0.02) 70%);display:flex;align-items:center;justify-content:center;"><svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#E8CE8A" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c1.8 3.6 5 4.8 5 8.5a5 5 0 0 1-10 0c0-1.8.9-3 2-4 .2 1.2 1 2 2 2.2-.5-2.8-1-4.5 1-8.7z"/></svg></div>'
    + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;letter-spacing:0.02em;color:#E8CE8A;line-height:1.2;">Prier mieux</div>'
    + '<div style="font-size:12px;color:rgba(200,168,74,0.6);margin-top:3px;font-style:italic;font-family:\'Cormorant Garamond\',serif;">Quand la pri\u00e8re p\u00e8se, ranime la flamme</div></div>'
    + '<div style="color:rgba(200,168,74,0.3);font-size:18px;">\u203a</div></div>';
}
window.openPrierMieux = openPrierMieux;
window.closePrierMieux = closePrierMieux;
window._pmGo = _pmGo;
window._pmPick = _pmPick;
window._pmConfirm = _pmConfirm;

```

═══════════════════════════════════════════
## Édit 2 — entrée temporaire sur l'accueil (près des Horaires)
═══════════════════════════════════════════
Repérer :
```js
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
```
REMPLACER par :
```js
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
  const prierMieuxEntry = level.id === 1 ? _prierMieuxHomeEntry() : '';
```

Puis repérer (ligne d'assemblage du home) :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard + repereEntry;
```
REMPLACER par :
```js
    + '</div>' + graceBanner + fridayBanner + prayerCard + prierMieuxEntry + qiblaCard + repereEntry;
```

═══════════════════════════════════════════
## Vérif attendue
- Accueil : carte **« Prier mieux »** juste sous les Horaires (entrée temporaire).
- Tap → écran plein écran خُشُوع → **Commencer** → 5 choix de ressenti → l'app reflète la cause → **Oui c'est ça** → le **Boost** correspondant → **Je vais prier** (ferme).
- « Pas vraiment » et « ‹ Recommencer » reviennent au choix. Aucun score, aucune trace.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "feat: module Prier mieux (diagnostic 2 taps + 5 boosts) + entree temp accueil"
git push
```
