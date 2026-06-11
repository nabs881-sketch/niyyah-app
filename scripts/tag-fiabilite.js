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
