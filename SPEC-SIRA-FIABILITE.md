# SPEC-SIRA-FIABILITE

## Objectif
Donner à chaque RDV de la Sîra un niveau de fiabilité visible et sobre, sans rien relire à la main. Un script range les 365 d'après leur champ `source` (déterministe, re-jouable), puis l'UI affiche un badge discret sous la source.

4 niveaux : `authentique` (Coran/Bukhârî/Muslim) · `sira` (sources classiques) · `tradition` (chaîne faible déjà signalée) · `contexte` (voix de l'auteur / regard extérieur).

---

## ÉTAPE 1 — Tagger automatique (écrit le champ `fiabilite`)

Crée le fichier **`scripts/tag-fiabilite.js`** avec ce contenu, puis exécute-le (`node scripts/tag-fiabilite.js`). Il lit les `source` actuels, donc on peut le relancer à tout moment après une édition de source.

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const fr = o => (o && o.fr !== undefined) ? o.fr : (typeof o === 'string' ? o : '');
const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // enlève macrons/points/accents

const WEAK = /a signaler|signalee comme|signaler comme tel|chaine (faible|discutee)|recue? comme|a recevoir comme|a valider|non etablie?|Israiliyy|tradition (anterieure|posterieure)|daif|da'if|debattu/i;
const SOUPLE = /reference souple/i;
const SAHIH = /Coran|Sourate|Bukhari|Muslim|Sahih/i;
const SIRA = /Ibn Hisham|Ibn Ishaq|Ibn Sa'd|Ibn Sad|Tabar|Sira|Sirat|Waqid|Maghazi|Asakir|Ahmad|Tirmidh|Abu Dawud|Nasa'?i|Ibn Maja|Darim|Bayhaq|Hakim|Muwatta|Shama|Mubarak|Recit|expedition/i;
const EDITORIAL = /Lamartine|Conclusion|Synthese/i;

const c = { authentique:0, sira:0, tradition:0, contexte:0 };
d.rdv.forEach(r => {
  const src = norm(fr(r.source));
  let lvl;
  if (WEAK.test(src)) lvl = 'tradition';
  else if (SAHIH.test(src)) lvl = 'authentique';
  else if (SIRA.test(src) || SOUPLE.test(src)) lvl = 'sira';
  else if (EDITORIAL.test(src)) lvl = 'contexte';
  else lvl = 'contexte';
  r.fiabilite = lvl; c[lvl]++;
});
fs.writeFileSync(p, JSON.stringify(d));
console.log('Fiabilité écrite :', c);
```

**Résultat attendu** (à ~1 près selon les SPEC déjà appliqués) :
`{ authentique: ~251, sira: ~110, tradition: 1, contexte: 3 }`

---

## ÉTAPE 2 — Badge dans l'UI (`script.js`, méthode `renderRdv`)

Repère, dans `renderRdv`, la ligne :
```
    var maxNum = this.getCurrentRdvNum();
    var _bs = 'padding:10px 22px;border:1px solid rgba(200,168,74,0.4);
```

INSÈRE le bloc suivant **juste AVANT** `var maxNum = this.getCurrentRdvNum();` :
```
    if (rdv.fiabilite) {
      var _fb = {
        authentique: ['\u2726', 'Authentique', '#C8A84A'],
        sira:        ['\u2756', 'S\u00eera', 'rgba(200,168,74,0.75)'],
        tradition:   ['\u25CC', 'Tradition signal\u00e9e', 'rgba(200,168,74,0.55)'],
        contexte:    ['\u00B7', 'Contexte', '#888']
      }[rdv.fiabilite];
      if (_fb) h += '<div style="text-align:center;font-size:11px;letter-spacing:2px;color:' + _fb[2] + ';margin:-18px 0 30px;opacity:0.85;">' + _fb[0] + ' ' + _fb[1] + '</div>';
    }
```

Cela affiche le badge juste sous la source (le `margin:-18px` le remonte contre la ligne de source), avant les boutons Précédent/Suivant. Marche pour les RDV classiques ET quiz (le bloc est commun aux deux).

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); const n={}; d.rdv.forEach(r=>n[r.fiabilite]=(n[r.fiabilite]||0)+1); console.log(n)"` → affiche la distribution (authentique/sira/tradition/contexte), total 365.
- `node -e "const d=require('./data/sira.min.json'); console.log(d.rdv.every(r=>r.fiabilite))"` → `true` (tous taggés).
- À l'écran : badge or sobre sous la source de chaque RDV.

## Build (OBLIGATOIRE — script.js + JSON touchés)
```
npm run build
git add -A
git commit -m "sira: niveau de fiabilite par RDV (tagger auto + badge sobre sous la source)"
```
