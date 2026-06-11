const fs = require('fs');
const p = 'data/sira.min.json';
const d = JSON.parse(fs.readFileSync(p, 'utf8'));
const r = d.rdv.find(x => x.num === 10);
if (!r) { console.error('RDV 10 introuvable'); process.exit(1); }

const setPara = (oldFr, newFr) => {
  const para = (r.paragraphes || []).find(x => (x.content && x.content.fr === oldFr) || x.content === oldFr);
  if (!para) { console.error('Para introuvable : ' + oldFr.slice(0, 50)); process.exit(1); }
  if (para.content && typeof para.content === 'object') para.content.fr = newFr; else para.content = newFr;
};

setPara(
  "Il avait huit ans, deux mois, dix jours.",
  "Il avait huit ans."
);
setPara(
  "Une année, la Mecque manqua d'eau. La sécheresse écrasait la vallée. Les Quraychites vinrent voir ʿAbd al-Muttalib :",
  "Une année de grande sécheresse, raconte la tradition, les Quraychites vinrent voir ʿAbd al-Muttalib :"
);
setPara(
  "Le vieil homme sortit. Mais il n'alla pas seul. Il prit avec lui un garçon — pareil à un soleil couvert de nuages, dira un témoin. Il colla le dos de l'enfant contre la Kaaba. Il leva un doigt vers le ciel. Le ciel était clair, sans le moindre nuage.",
  "On rapporte qu'il sortit avec l'enfant, colla son dos contre la Kaaba, et leva les mains vers un ciel sans le moindre nuage."
);
setPara(
  "Et alors, dit le récit, « les nuages vinrent de tous côtés. La pluie tomba drue, remplit la vallée, et fertilisa tout. »",
  "Et la pluie, dit le récit, tomba drue et fertilisa la vallée. Cette scène relève d'une tradition tardive (Ibn ʿAsâkir) : on la reçoit comme une image, non comme un fait établi."
);
setPara(
  "Abû Tâlib, qui était présent, écrivit plus tard sur son neveu :",
  "Le beau vers que l'on récite ici est authentique — mais il décrit le Prophète ﷺ devenu homme, par qui l'on implorera la pluie. Abû Tâlib l'a chanté pour son neveu :"
);
setPara(
  "« Un jeune qui, de son visage, fait appel à la pluie — par clémence pour les orphelins et les veuves. »",
  "« Un homme au visage clair, par qui l'on demande la pluie — refuge des orphelins, protection des veuves. »"
);
setPara(
  "Il rentra dans la maison d'Abû Tâlib. Et l'oncle lui ouvrit la place qu'occupait son fils ʿAlî — la même couverture, la même nourriture, la même tendresse. Il l'aima plus que ses propres enfants, diront ses contemporains.",
  "Il rentra dans la maison d'Abû Tâlib. L'oncle l'éleva avec une tendresse rare — la même couverture, la même nourriture que ses propres enfants. Il l'aima plus qu'eux, diront ses contemporains."
);

fs.writeFileSync(p, JSON.stringify(d));
console.log('RDV 10 corrigé (âge, istisqâ flaggée, poème recontextualisé, anachronisme ʿAlî retiré).');
