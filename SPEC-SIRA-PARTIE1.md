# SPEC-SIRA-PARTIE1

## Objectif
Appliquer les corrections relevées à la lecture des 7 jours de la Partie I :
- **Jour 1** : « jardins suspendus » (erreur historique — c'est Babylone, pas Ctésiphon) → l'arche de Ctésiphon.
- **Jour 2** : adoucir « année arabe » (l'année lunaire ≈ 354 j, pas 360) + créditer Bukhârî pour les 360 idoles (fait *sahih*) → le badge passe *Authentique*.
- **Jour 5** : source honnête → Bukhârî pour Waraqa + Zayd, et signaler que Quss ibn Sâʿida est du sîra.
- **Jour 6** : créditer Ibn Ishâq (récit d'Abraha) à côté du Coran.

Cible : **data/sira.min.json**. On édite par numéro de RDV (script).

---

## Script (à créer et exécuter)

Crée **`scripts/fix-partie1.js`** puis lance `node scripts/fix-partie1.js` :

```js
const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const rdv = n => d.rdv.find(r => r.num === n);
const setSrc = (n, val) => { const r = rdv(n); if (r.source && typeof r.source === 'object') r.source.fr = val; else r.source = val; };
const setPara = (n, oldFr, newFr) => {
  const r = rdv(n);
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable RDV ' + n + ' : ' + oldFr); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

// Jour 1 — l'arche de Ctésiphon (au lieu des jardins suspendus, qui sont Babylone)
setPara(1,
  "À l'est, l'Empire perse. Ctésiphon, les jardins suspendus, les feux sacrés des mages qui ne devaient jamais s'éteindre.",
  "À l'est, l'Empire perse. Ctésiphon, sa grande arche de brique sur le Tigre, les feux sacrés des mages qui ne devaient jamais s'éteindre."
);

// Jour 2 — année (sans "arabe", avec "presque") + source Bukhârî + badge Authentique
setPara(2, "Une pour chaque jour de l'année arabe.", "Presque une pour chaque jour de l'année.");
setSrc(2, "Récit d'Ibn Ishâq · Saḥîḥ al-Bukhârî (les 360 idoles autour de la Kaaba à la Conquête)");
rdv(2).fiabilite = 'authentique';

// Jour 5 — source transparente (Bukhârî pour Waraqa+Zayd ; Quss = sîra)
setSrc(5, "Saḥîḥ al-Bukhârî (Waraqa ibn Nawfal et Zayd ibn ʿAmr) · Quss ibn Sâʿida : récit de sîra (transmission plus souple)");

// Jour 6 — créditer Ibn Ishâq à côté du Coran
setSrc(6, "Sourate Al-Fîl (105) · Ibn Ishâq (récit d'Abraha et de ʿAbd al-Muttalib)");

fs.writeFileSync(p, JSON.stringify(d));
console.log('Corrections Partie I appliquées (Jours 1, 2, 5, 6).');
```

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); console.log('J1 arche:', /grande arche de brique/.test(JSON.stringify(d.rdv.find(r=>r.num===1))))"` → `true`.
- `node -e "const d=require('./data/sira.min.json'); const r=d.rdv.find(x=>x.num===2); console.log('J2 badge:', r.fiabilite, '| annee:', /Presque une pour chaque jour/.test(JSON.stringify(r)))"` → `authentique | true`.
- `node -e "const d=require('./data/sira.min.json'); console.log('J1 jardins retirés:', !/jardins suspendus/.test(JSON.stringify(d.rdv.find(r=>r.num===1))))"` → `true`.
- JSON valide ; 365 RDV intacts.

## Build (OBLIGATOIRE — JSON touché)
```
npm run build
git add -A
git commit -m "sira: corrections Partie I (J1 arche Ctesiphon, J2 annee+Bukhari, J5 source Quss, J6 Ibn Ishaq)"
```
