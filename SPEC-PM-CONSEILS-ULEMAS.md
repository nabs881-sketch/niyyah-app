# SPEC-PM-CONSEILS-ULEMAS

## Objectif
Ajouter un bouton "Conseils des ulémas" sur l'écran intro de Prier mieux,
ouvrant un écran avec 1 conseil par jour (rotation sur 10 jours).

---

## script.js — Étape 1 : Ajouter les données _PM_CONSEILS

Après `var _pmStep = 'intro', _pmIdx = -1;` ajoute :

```js
var _PM_CONSEILS = [
  {
    titre: 'La préparation du cœur',
    texte: 'Avant de te lever pour prier, vide ton cœur de ce qui l\'encombre. Confie tes soucis à Allah avant le takbîr, puis dis Allahu Akbar comme une déclaration : "tout cela est moins grand que Toi." La prière commence dans le cœur, pas dans les pieds.',
    auteur: 'Al-Ghazâlî',
    source: 'Ihyâ\' \'Ulûm al-Dîn'
  },
  {
    titre: 'L\'état avant la prière',
    texte: 'Hâtim al-\'Assam fut interrogé sur son état avant la prière. Il répondit : "Quand je me lève, j\'imagine la Ka\'ba devant moi, le Sirât sous mes pieds, le Paradis à ma droite, l\'Enfer à ma gauche, et l\'Ange de la mort derrière moi. Puis je prie comme si c\'était ma dernière prière."',
    auteur: 'Hâtim al-\'Assam',
    source: 'IIIe siècle de l\'Hégire'
  },
  {
    titre: 'Les ablutions',
    texte: 'Les ablutions ne purifient pas seulement le corps — elles signalent au cœur qu\'un changement d\'état est en cours. Fais tes ablutions lentement, conscient que tes péchés s\'en vont avec chaque goutte d\'eau. Tu arrives à la prière déjà en chemin.',
    auteur: 'Ibn al-Qayyim',
    source: 'Asrâr al-Salât'
  },
  {
    titre: 'Réciter lentement',
    texte: 'Récite la Fatiha verset par verset, en attendant la réponse d\'Allah à chacun. Car Allah répond : "Mon serviteur M\'a loué" — "Mon serviteur s\'en remet à Moi" — "Mon serviteur M\'a demandé." Ce n\'est pas une récitation. C\'est un dialogue.',
    auteur: 'Al-Ghazâlî',
    source: 'Ihyâ\' \'Ulûm al-Dîn'
  },
  {
    titre: 'Fixer le lieu de sujûd',
    texte: 'Le Prophète ﷺ regardait le lieu de sa prosternation pendant la prière. Ce regard fixe ancre l\'esprit dans le présent. Quand les pensées viennent, reviens à ce point — sans te juger. L\'esprit s\'égare. Le regard, lui, reste.',
    auteur: 'Ibn al-Qayyim',
    source: 'Asrâr al-Salât'
  },
  {
    titre: 'Comprendre ce qu\'on dit',
    texte: 'Choisis une formule — Subhâna Rabbiyal \'Adhîm — et traduis-la dans ton cœur avant de continuer. Laisse le sens peser. Al-Ghazâlî et Ibn al-Qayyim s\'accordent : une seconde de sens réel vaut mille secondes de récitation absente.',
    auteur: 'Al-Ghazâlî & Ibn al-Qayyim',
    source: 'Ihyâ\' & Asrâr al-Salât'
  },
  {
    titre: 'Le rukû\' et le sujûd',
    texte: 'Le rukû\' est l\'inclination de tout l\'être devant la Majesté divine — pas seulement le dos. Et le sujûd est le moment où l\'esclave est le plus proche de son Seigneur. Dans le sujûd, prolonge. Dis ce que tu ne saurais pas dire autrement. C\'est là que les portes s\'ouvrent.',
    auteur: 'Ibn al-Qayyim',
    source: 'Asrâr al-Salât'
  },
  {
    titre: 'Le dhikr après la prière',
    texte: 'Le Prophète ﷺ ne se levait pas immédiatement après le salâm. Il restait. Ces moments prolongent l\'état de la prière dans le monde. Sans eux, la prière se referme comme une porte que tu viens juste d\'ouvrir.',
    auteur: 'Ibn al-Qayyim',
    source: 'Asrâr al-Salât'
  },
  {
    titre: 'Ne pas se précipiter vers l\'écran',
    texte: 'Ce qui suit la prière colore l\'état intérieur. Si tu passes immédiatement à une distraction, la prière s\'efface. Si tu restes quelques instants dans le silence ou le dhikr, elle reste. La transition est un acte spirituel à part entière.',
    auteur: 'Al-Ghazâlî',
    source: 'Ihyâ\' \'Ulûm al-Dîn'
  },
  {
    titre: 'La régularité',
    texte: 'La prière régulière — même imparfaite — vaut infiniment plus que la prière rare mais intense. Le cœur se forme par la répétition, pas par l\'éclat. Cinq prières imparfaites chaque jour creusent un sillon dans l\'âme que dix prières exceptionnelles ne feront jamais.',
    auteur: 'Ibn al-Qayyim',
    source: 'Asrâr al-Salât'
  }
];
```

---

## script.js — Étape 2 : Ajouter le bouton sur l'écran intro

Dans le bloc `if (_pmStep === 'intro')`, après le bouton "Commencer", ajoute :
```js
+ '<div onclick="_pmGo(\'conseil\')" style="margin-top:16px;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:15px;color:rgba(200,168,74,0.55);cursor:pointer;">Conseils des ulémas ✦</div>'
```

---

## script.js — Étape 3 : Ajouter le bloc 'conseil' dans renderPM()

Après le bloc `} else if (_pmStep === 'boost') {` et avant `b.innerHTML = html;`, ajoute :

```js
  } else if (_pmStep === 'conseil') {
    var _ci = new Date().getDate() % _PM_CONSEILS.length;
    var _c = _PM_CONSEILS[_ci];
    html = '<div style="padding-top:8vh;text-align:center;">'
      + '<div style="font-size:10px;letter-spacing:3px;color:rgba(200,168,74,0.5);text-transform:uppercase;margin-bottom:20px;">✦ Conseil du jour</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:22px;color:#E8CE8A;margin-bottom:24px;">' + _c.titre + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;line-height:1.75;color:#F4ECD6;max-width:360px;margin:0 auto 24px;padding:0 16px;">' + _c.texte + '</div>'
      + '<div style="font-size:13px;color:rgba(200,168,74,0.55);">— ' + _c.auteur + ' · <span style="font-style:italic;">' + _c.source + '</span></div>'
      + '<div onclick="_pmGo(\'intro\')" style="margin-top:32px;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:15px;color:rgba(200,168,74,0.5);cursor:pointer;">‹ Retour</div>'
      + '</div>';
  }
```

---

## Trigger
```
Lis SPEC-PM-CONSEILS-ULEMAS.md et applique-le exactement en 3 étapes.
npm run build && git add -A && git commit -m "feat: conseils des ulemas dans Prier mieux" && git push
```
