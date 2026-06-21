const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n, optional) {
  const idx = raw.indexOf(from);
  if (idx < 0) {
    if (optional) { console.log('C' + n + ' SKIP (not found)'); return; }
    console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70));
    process.exit(1);
  }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// N719 — Amour 83 fois (reformuler avec prudence)
rep(
  'Le mot \u0027amour\u0027 (mahabba) et ses d\u00e9riv\u00e9s appara\u00eet 83 fois dans le Coran. Plus que le mot \u0027enfer\u0027. All\u00e2h parle d\u0027amour plus qu\u0027il ne parle de ch\u00e2timent. Mais on lui pr\u00eate le contraire. Lis avant de croire ce qu\u0027on t\u0027a dit.',
  'Certains ont relev\u00e9 que le mot \u0027amour\u0027 (mahabba) et ses d\u00e9riv\u00e9s appara\u00eetraient plus souvent que le mot \u0027enfer\u0027 dans le Coran. Une observation discut\u00e9e. Ce qui ne l\u0027est pas : All\u00e2h se nomme Lui-m\u00eame ar-Rahm\u00e2n, ar-Rah\u00eem \u2014 avant tout autre attribut. Lis avant de croire ce qu\u0027on t\u0027a dit.',
  1
);

// N720 — Tours bédouines (SUPPRIMER — doublon n°633)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Le Proph\u00e8te \ufdfa a dit : \u0027L\u0027Heure ne viendra pas tant que les B\u00e9douins pieds nus rivaliseront dans la construction de hautes tours.\u0027 Bukhari. Aujourd\u0027hui : Burj Khalifa \u00e0 Duba\u00ef. 828 m\u00e8tres. Au VIIe si\u00e8cle, le Proph\u00e8te \ufdfa vivait dans une maison en torchis.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  2
);

// N721 — Prairies d'Arabie (SUPPRIMER — doublon n°634)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES",\n    "fr": "Le Proph\u00e8te \ufdfa a dit : \u00ab L\u0027Heure ne viendra pas avant que la terre des Arabes ne redevienne prairies et rivi\u00e8res. \u00bb (Muslim 2912). Aujourd\u0027hui, des \u00e9tudes g\u00e9ologiques et pal\u00e9oclimatiques montrent que la p\u00e9ninsule Arabique fut effectivement couverte de prairies et de fleuves il y a 5000 ans \u2014 et que par cycles climatiques, elle pourrait le redevenir. Au VIIe si\u00e8cle, le Proph\u00e8te parlait d\u0027un d\u00e9sert qu\u0027aucun t\u00e9moin n\u0027avait jamais vu autrement. Comment savait-il ?"\n  }',
  '',
  3
);

// N723 — Hadith "parler à distance" (supprimer référence Mishkât)
rep(
  'Le Proph\u00e8te \ufdfa a dit : \u0027On parlera \u00e0 quelqu\u0027un de tr\u00e8s loin, comme s\u0027il \u00e9tait \u00e0 c\u00f4t\u00e9.\u0027 Mishk\u00e2t al-Mas\u00e2b\u00eeh. Aujourd\u0027hui : appel vid\u00e9o. Au VIIe si\u00e8cle, \u00e0 dos de chameau, il fallait 3 mois pour traverser l\u0027Arabie.',
  'Parmi les signes \u00e9voqu\u00e9s dans les textes islamiques sur les derniers temps : qu\u0027on pourrait parler \u00e0 quelqu\u0027un de tr\u00e8s loin comme s\u0027il \u00e9tait \u00e0 c\u00f4t\u00e9. Aujourd\u0027hui : appel vid\u00e9o. Au VIIe si\u00e8cle, \u00e0 dos de chameau, il fallait 3 mois pour traverser l\u0027Arabie.',
  4
);

// N724 — Hadith "distances raccourcies" (supprimer référence Tirmidhî)
rep(
  'Le Proph\u00e8te \ufdfa a dit : \u0027Les distances seront raccourcies, la terre para\u00eetra plus petite.\u0027 Tirmidh\u00ee. Aujourd\u0027hui : Paris-Tokyo en 12 heures. Au VIIe si\u00e8cle : impossible.',
  'Parmi les signes rapport\u00e9s dans les textes islamiques sur les derniers temps : que les distances sembleraient se raccourcir et la terre para\u00eetre plus petite. Aujourd\u0027hui : Paris-Tokyo en 12 heures. Au VIIe si\u00e8cle : impossible.',
  5
);

// N726 — "Ignorants deviendront chefs" (préciser référence Bukhari)
rep(
  '\u0027Les ignorants deviendront des chefs.\u0027 Bukhari.',
  '\u0027Les ignorants deviendront des chefs.\u0027 (Bukhari 100 \u2014 sur la disparition des savants).',
  6
);

// N727 — Femmes vêtues mais nues (SUPPRIMER — doublon n°635)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Le Proph\u00e8te \ufdfa a dit : \u0027Les femmes seront v\u00eatues mais nues.\u0027 Muslim. Cette parole a 14 si\u00e8cles. Tu n\u0027as pas besoin que je t\u0027explique. Le d\u00e9fil\u00e9 de mode du jour suffit.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  7
);

// N735 — Deux mers / Gibraltar (corriger)
rep(
  '\u00c0 Gibraltar, deux courants oc\u00e9aniques se rencontrent : Atlantique sal\u00e9 et M\u00e9diterran\u00e9e plus chaude. Ils ne se m\u00e9langent pas. Confirm\u00e9 par oc\u00e9anographie au XXe si\u00e8cle.',
  '\u00c0 certains d\u00e9troits, deux masses d\u0027eau aux propri\u00e9t\u00e9s diff\u00e9rentes se rencontrent et mettent du temps \u00e0 se m\u00e9langer \u2014 un ph\u00e9nom\u00e8ne d\u0027halocline confirm\u00e9 par l\u0027oc\u00e9anographie moderne.',
  8
);

// N743 — Toupet / cortex préfrontal (nuancer)
rep(
  'Neurosciences modernes : le cortex pr\u00e9frontal (juste derri\u00e8re le \u0027toupet\u0027) est le si\u00e8ge du mensonge, du jugement moral, de la d\u00e9cision. C\u0027est de l\u00e0 qu\u0027All\u00e2h dit qu\u0027Il saisirait. Le Coran nommait la zone du mensonge au VIIe si\u00e8cle.',
  'Neurosciences modernes : le cortex pr\u00e9frontal, situ\u00e9 \u00e0 l\u0027avant du cerveau, est associ\u00e9 au jugement moral et \u00e0 la d\u00e9cision. Le Coran d\u00e9signait la zone frontale comme si\u00e8ge du mensonge au VIIe si\u00e8cle.',
  9
);

// N746 — Étymologie "médecine" (corriger)
rep(
  'Le mot fran\u00e7ais \u0027m\u00e9decine\u0027 garde son sens d\u0027origine arabe.',
  'Les mots \u0027alcool\u0027, \u0027alg\u00e8bre\u0027, \u0027chimie\u0027 \u2014 autant de traces de cette m\u00e9decine dans notre langue.',
  10
);

// N748 — Az-Zahrawi (SUPPRIMER — doublon n°627)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Az-Zahr\u00e2w\u00ee (Albucasis), au Xe si\u00e8cle \u00e0 Cordoue, \u00e9crit le premier trait\u00e9 illustr\u00e9 de chirurgie au monde. 200 instruments dessin\u00e9s. Il invente le fil chirurgical r\u00e9sorbable (catgut). Toujours utilis\u00e9 aujourd\u0027hui. Personne n\u0027apprend son nom en France.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  11
);

// N751 — Café / soufis (SUPPRIMER — doublon n°628)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Le caf\u00e9 a \u00e9t\u00e9 d\u00e9couvert par les soufis du Y\u00e9men vers le XVe si\u00e8cle, pour rester \u00e9veill\u00e9s pendant le dhikr nocturne. La \u0027maison du caf\u00e9\u0027 (qahwa kh\u00e2na) s\u0027est r\u00e9pandue dans tout le monde musulman avant d\u0027arriver en Europe via Venise en 1645. Ton caf\u00e9 latte vient d\u0027une zaou\u00efa.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  12
);

// N753 — Mehmet II (SUPPRIMER — doublon n°632)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Mehmet II conquiert Constantinople en 1453. La majorit\u00e9 chr\u00e9tienne ne fut pas expuls\u00e9e. Il fit construire des mosqu\u00e9es \u00e0 c\u00f4t\u00e9 des \u00e9glises. Le patriarche grec garda son titre. Tol\u00e9rance imp\u00e9riale en plein XVe si\u00e8cle, quand l\u0027Espagne chr\u00e9tienne expulsait juifs et musulmans en 1492.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  13
);

// N755 — Référence Vaucanson (corriger)
rep(
  'Avant le moulin de Vaucanson (1741) de plus de 800 ans. La \u0027r\u00e9volution industrielle\u0027 a commenc\u00e9 bien avant l\u0027Angleterre du XIXe si\u00e8cle.',
  'Avant la r\u00e9volution industrielle anglaise du XIXe si\u00e8cle de plus de 800 ans. La technique industrielle a commenc\u00e9 bien avant ce qu\u0027on enseigne \u00e0 l\u0027\u00e9cole.',
  14
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
