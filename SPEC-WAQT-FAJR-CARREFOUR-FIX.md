# SPEC-WAQT-FAJR-CARREFOUR-FIX

## Objectif
Corriger deux phrases du Wird Fajr (`data/waqt/waqt_fajr.json`) :
1. **n°5** : le hadith « Que celui qui oublie une prière l'accomplisse quand il s'en souvient » (Bukhârî 597 / Muslim 684, Anas) porte sur la **prière (salat)**, pas sur le dhikr. La phrase l'appliquait au Wird via une paraphrase généralisée présentée comme le hadith → on cite le hadith **correctement** (sur la prière) et on applique au wird **par analogie** (« l'esprit de la sunnah »).
2. **n°9** : « n'est pas une option » frôle l'obligation. Les adhkâr sont **sunnah (mustaḥabb)**, pas farḍ → on garde la force, sans impliquer une obligation.

Cible : **data/waqt/waqt_fajr.json**. Matching par le champ `fr`.

---

## Script (à créer et exécuter)

Crée **`scripts/fix-waqt-carrefour.js`** puis lance `node scripts/fix-waqt-carrefour.js` :

```js
const fs = require('fs');
const p = 'data/waqt/waqt_fajr.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const list = Array.isArray(d.phrases) ? d.phrases : (Array.isArray(d) ? d : null);
if (!list) { console.error('Structure inattendue'); process.exit(1); }

const setFr = (oldFr, newFr) => {
  const ph = list.find(x => x && x.fr === oldFr);
  if (!ph) { console.error('Phrase introuvable : ' + oldFr.slice(0, 45)); process.exit(1); }
  ph.fr = newFr;
};

// n°5 : hadith correctement attribué à la prière, wird par analogie
setFr(
  "Si tu rates le Wird du matin, fais-le quand tu te souviens. Le Prophète ﷺ a dit : « Quand vous oubliez, faites-le quand vous vous rappelez. » (Bukhari) La sunnah te rattrape.",
  "Si tu rates le Wird du matin, fais-le quand tu te souviens. Le Prophète ﷺ l'a enseigné pour la prière oubliée : « Que celui qui oublie une prière l'accomplisse quand il s'en souvient » (Bukhârî). L'esprit de la sunnah te rattrape."
);

// n°9 : sunnah forte, pas obligation
setFr(
  "Le Wird du soir n'est pas une option. C'est une armure. Aujourd'hui, mets-la avant que la nuit ne tombe.",
  "Le Wird du soir, ne le néglige pas : c'est une armure. Aujourd'hui, mets-la avant que la nuit ne tombe."
);

fs.writeFileSync(p, JSON.stringify(d, null, 2));
console.log('Waqt FAJR-CARREFOUR n°5 et n°9 corrigés.');
```

> Note : le `JSON.stringify(d, null, 2)` réécrit le fichier indenté (lisible). Si ton fichier d'origine est minifié sur une ligne, remplace par `JSON.stringify(d)`.

---

## Vérif attendue
```
node -e "const d=require('./data/waqt/waqt_fajr.json'); const l=d.phrases||d; const t=JSON.stringify(l); console.log('n5 corrigé:', /pour la prière oubliée/.test(t)&&!/Quand vous oubliez, faites-le quand vous vous rappelez/.test(t), '| n9 adouci:', /ne le néglige pas/.test(t)&&!/n.est pas une option/.test(t));"
```
Attendu : `true | true`.

## Build (OBLIGATOIRE — invalide le cache du service worker)
```
npm run build
git add -A
git commit -m "waqt fajr: n5 hadith priere (pas wird) + n9 sunnah (pas obligation)"
```
