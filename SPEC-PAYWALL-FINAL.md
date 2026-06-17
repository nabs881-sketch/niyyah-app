# SPEC-paywall-v4 — Textes paywall finaux

## Objectif
Mettre à jour tous les textes du paywall freemiumOverlay dans index.html
et les clés i18n FR/EN dans script.js. Ajouter mention "Offrir Niyyah+".

---

## 1. index.html — freemiumOverlay

### Accroche (freemium-sub)
```
AVANT : Va plus loin. Et ne perds jamais ton cheminement.
APRÈS : Tu as commencé quelque chose. Ne t'arrête pas là.
```

### F1
```
AVANT : <b id="i18n-freemium-f1">Une intention sacrée, chaque jour</b>
        <i>2 scans à l'essai — puis 2×/jour avec Niyyah+</i>
APRÈS : <b id="i18n-freemium-f1">L'intention juste, chaque jour</b>
        <i>Scanner Niyyah 2×/jour — sacralise chaque geste.</i>
```

### F2
```
AVANT : <b id="i18n-freemium-f2">Le verset juste, plus souvent</b>
        <i>2 scans à l'essai — puis 2×/jour avec Niyyah+</i>
APRÈS : <b id="i18n-freemium-f2">Le Regard, sans limite</b>
        <i>Pointe ta caméra. Reçois le verset qui répond à ce que tu vois. 2×/jour.</i>
```

### F3
```
AVANT : <b id="i18n-freemium-f3">Une lettre, rien que pour toi</b>
        <i>Chaque semaine, Niyyah t'écrit le bilan de ta semaine.</i>
APRÈS : <b id="i18n-freemium-f3">Une lettre, rien que pour toi</b>
        <i>Chaque semaine, tu reçois une lettre écrite à partir de ta semaine réelle — tes gestes, tes intentions, tes états.</i>
```

### F4
```
AVANT : <b id="i18n-freemium-f4">Ne perds jamais ton cheminement</b>
        <i>Ton Journal sauvegardé et synchronisé sur tous tes appareils. (à venir)</i>
APRÈS : <b id="i18n-freemium-f4">Les 6 portes de l'âme</b>
        <i>Colère, Anxiété, Arrogance, Paresse, Médisance, Regard — 6 programmes de 7 jours.</i>
```

### F5
```
AVANT : <b id="i18n-freemium-f5">Fais vivre Niyyah</b>
        <i>Un projet indépendant, sans pub. Ton soutien est une sadaqa jâriya.</i>
APRÈS : <b id="i18n-freemium-f5">Le savoir, sans interruption</b>
        <i>La vie du Prophète ﷺ, ses Compagnons, les récits du Coran, la jurisprudence, la sagesse prophétique — accès permanent.</i>
```

### Prix — ajouter ligne 1,25€/mois
```
AVANT : <span class="fp-sub">Renouvellement annuel.</span>
APRÈS : <span class="fp-sub">soit 1,25€/mois · Renouvellement annuel.</span>
```

### Bouton CTA
```
AVANT : Débloquer Niyyah+ — 14,99€/an
APRÈS : Continuer avec Niyyah+
```

### Mention cadeau — ajouter APRÈS le bouton freemium-btn-buy, AVANT freemium-code
```html
<div style="text-align:center;margin-top:10px;font-family:'Cormorant Garamond',serif;font-size:13px;color:rgba(200,168,75,0.5);letter-spacing:0.05em;">
  🎁 Bientôt : offrir Niyyah+ à un proche
</div>
```

### Lien sadaqa — ajouter après mention cadeau
```
Ajouter une ligne sous la mention cadeau :
<div style="text-align:center;margin-top:14px;font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:rgba(200,168,75,0.35);">
  Un projet indépendant, sans pub. Ton soutien est une sadaqa jâriya.
</div>
```

---

## 2. script.js — clés i18n FR

Trouver le bloc `freemium_title: 'Niyyah+'` (version FR, vers L10528) et mettre à jour :

```
freemium_sub: 'Tu as commencé quelque chose. Ne t\'arrête pas là.'
freemium_buy: 'Continuer avec Niyyah+'
freemium_f1: 'L\'intention juste, chaque jour'
freemium_f2: 'Le Regard, sans limite'
freemium_f3: 'Une lettre, rien que pour toi'
freemium_f4: 'Les 6 portes de l\'âme'
freemium_f5: 'Le savoir, sans interruption'
freemium_f6: ''
```

---

## 3. script.js — clés i18n EN

Trouver le bloc `freemium_title: 'Niyyah+'` (version EN, vers L10784) et mettre à jour :

```
freemium_sub: 'You\'ve started something. Don\'t stop here.'
freemium_buy: 'Continue with Niyyah+'
freemium_f1: 'The right intention, every day'
freemium_f2: 'Regard, without limits'
freemium_f3: 'A letter, just for you'
freemium_f4: 'The 6 doors of the soul'
freemium_f5: 'Knowledge, without interruption'
freemium_f6: ''
```

---

## Trigger Claude Code

```
Lis SPEC-paywall-v4.md et applique-le intégralement.
Modifie index.html : accroche, F1 à F5, prix, bouton CTA, mention cadeau, ligne sadaqa.
Modifie script.js : clés i18n FR et EN selon la SPEC.
npm run build && git add -A && git commit -m "paywall v4 - textes finaux panel + cadeau"
```

---

## 4. ACCROCHES CONTEXTUELLES

### Modifier `openFreemium()` L9192

Remplacer :
```js
function openFreemium() {
  document.getElementById('freemiumOverlay').classList.add('show');
}
```

Par :
```js
function openFreemium(context) {
  var accroches = {
    'regard':      'Tu viens de voir ce que Niyyah sait faire.',
    'scan':        'Chaque objet peut porter une niyyah.',
    'bilan':       'Ta semaine mérite une vraie lecture.',
    'connaissance':'Trente jours. Tu es là. Continue.',
    'default':     'Tu as commencé quelque chose. Ne t\'arrête pas là.'
  };
  var el = document.getElementById('i18n-freemium-sub');
  if (el) el.textContent = accroches[context] || accroches['default'];
  document.getElementById('freemiumOverlay').classList.add('show');
}
```

### Modifier les appels à openFreemium() et showQuotaLimit()

**Regard** (L17322) — `showQuotaLimit('regard')` → déjà passe 'regard', puis dans showQuotaLimit appeler `openFreemium('regard')`

**Scanner** (L18102) — `showQuotaLimit('scan')` → dans showQuotaLimit appeler `openFreemium('scan')`

**Bilan** (L7481) — ajouter `openFreemium('bilan')` au lieu de `openFreemium()`

**Connaissance** — modifier `_showPaywallConnaissance()` :
```js
function _showPaywallConnaissance() {
  openFreemium('connaissance');
}
```

**Settings / onboarding** (L10335, L13246) → `openFreemium('default')`

### Modifier `showQuotaLimit()` L9192+

Trouver la fonction `showQuotaLimit` et ajouter l'appel contextualisé :
```js
// Dans showQuotaLimit(type), avant ou après classList.add('show') du quota overlay :
openFreemium(type); // 'regard' ou 'scan'
```

---

## Trigger Claude Code (MIS À JOUR)

```
Lis SPEC-paywall-v4.md et applique-le intégralement.
Modifie index.html : accroche, F1 à F5, prix, bouton CTA, mention cadeau, ligne sadaqa.
Modifie script.js : clés i18n FR et EN, openFreemium() avec contexte, appels contextualisés depuis regard/scan/bilan/connaissance/settings.
npm run build && git add -A && git commit -m "paywall v4 - textes finaux + accroches contextuelles"
```
