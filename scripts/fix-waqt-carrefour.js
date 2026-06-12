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
