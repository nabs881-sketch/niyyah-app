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

// N695 — SKIP: from-string absent, already a different (better) version in file
console.log('C1 SKIP (N695 Goethe: from-string absent — already corrected version present)');

// N696 — SKIP: from-string absent, already a different (better) version in file
console.log('C2 SKIP (N696 Tolstoï: from-string absent — already corrected version present)');

// N699 — SKIP: from-string absent, already a nuanced version in file
console.log('C3 SKIP (N699 Keith Moore: from-string absent — already nuanced version present)');

// N703 — Annemarie Schimmel (corriger affirmation non documentée)
rep(
  '\u00c0 sa mort en 2003, elle a demand\u00e9 \u00e0 \u00eatre enterr\u00e9e selon le rite musulman. Elle ne s\u0027est jamais \u0027convertie\u0027 officiellement. Mais son c\u0153ur l\u0027avait fait.',
  'Elle est rest\u00e9e officiellement chr\u00e9tienne toute sa vie. Mais elle disait : \u0027Celui qui n\u0027a pas senti la beaut\u00e9 de l\u0027islam ne peut pas comprendre l\u0027histoire du monde.\u0027',
  4
);

// N705 — Décomptes yawm/shahr/ayyâm (reformuler avec prudence)
rep(
  'Le mot \u0027jour\u0027 (yawm) appara\u00eet 365 fois dans le Coran. Le mot \u0027mois\u0027 (shahr) appara\u00eet 12 fois. Le mot \u0027jours\u0027 (ayy\u00e2m) appara\u00eet 30 fois. Personne n\u0027a pu \u00e9crire ce livre par hasard. Personne ne pouvait calculer \u00e7a au VIIe si\u00e8cle.',
  'Certains chercheurs ont relev\u00e9 que le mot \u0027jour\u0027 (yawm) appara\u00eetrait 365 fois dans le Coran, \u0027mois\u0027 (shahr) 12 fois, \u0027jours\u0027 (ayy\u00e2m) 30 fois. Ces d\u00e9comptes sont discut\u00e9s selon les m\u00e9thodes. Ce qui est certain : le Coran n\u0027est pas un texte n\u00e9gligent avec ses mots.',
  5
);

// N707 — "Vie" / "mort" (reformuler avec prudence)
rep(
  'Le mot \u0027vie\u0027 (al-hay\u00e2t) appara\u00eet 145 fois dans le Coran. Le mot \u0027mort\u0027 (al-mawt), 145 fois aussi. Exactement le m\u00eame nombre. All\u00e2h a \u00e9quilibr\u00e9 Son livre comme Il \u00e9quilibre Sa cr\u00e9ation.',
  'Certains ont relev\u00e9 que \u0027vie\u0027 et \u0027mort\u0027 appara\u00eetraient le m\u00eame nombre de fois dans le Coran. Une observation que les sp\u00e9cialistes discutent. Mais l\u0027\u00e9quilibre que le Coran \u00e9tablit entre les deux r\u00e9alit\u00e9s, lui, est indiscutable.',
  7
);

// N708 — Bismillah × 114 (SUPPRIMER — doublon n°644)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "\u0027Bismill\u00e2h ar-Rahm\u00e2n ar-Rah\u00eem\u0027 appara\u00eet 114 fois dans le Coran \u2014 comme le nombre de sourates. Sauf qu\u0027une sourate (la 9) n\u0027a pas de Bismill\u00e2h. Et la 27 en a deux. Math\u00e9matiquement : 114 = 114. Une co\u00efncidence ? Au VIIe si\u00e8cle, sans ordinateur ?",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  8
);

// N709 — Shaytân / ange 88 fois (reformuler avec prudence)
rep(
  'Le mot \u0027shayt\u00e2n\u0027 appara\u00eet 88 fois. Le mot \u0027ange\u0027 (malak), 88 fois aussi. Le Coran maintient l\u0027\u00e9quilibre cosmique dans son comptage. Le Proph\u00e8te \ufdfa n\u0027a jamais su lire ni \u00e9crire.',
  'Certains ont relev\u00e9 que \u0027shayt\u00e2n\u0027 et \u0027malak\u0027 (ange) appara\u00eetraient le m\u00eame nombre de fois dans le Coran. Une observation discut\u00e9e. Ce qui ne l\u0027est pas : le Coran traite Satan et l\u0027ange comme deux r\u00e9alit\u00e9s d\u0027\u00e9gal poids dans la vie du croyant. Et le Proph\u00e8te \ufdfa n\u0027a jamais su lire ni \u00e9crire.',
  9
);

// N710 — Défi du Coran (SUPPRIMER — doublon n°638)
rep(
  ',\n  {\n    "source": "waqt_apresmidi",\n    "plage_origine": "apresmidi",\n    "fr": "Le d\u00e9fi du Coran : \u0027Si vous doutez de ce que Nous avons r\u00e9v\u00e9l\u00e9 \u00e0 Notre serviteur, produisez une seule sourate semblable\u0027 (2:23). 14 si\u00e8cles plus tard, le d\u00e9fi tient. Aucune \u0153uvre n\u0027a pu \u00eatre confondue avec un verset coranique.",\n    "en": "",\n    "ar": "",\n    "categorie": "PREUVES"\n  }',
  '',
  10
);

// N715 — "Sept cieux" × 7 (reformuler avec prudence)
rep(
  'Le mot \u0027sept cieux\u0027 appara\u00eet 7 fois dans le Coran. Le mot \u0027cr\u00e9ation des cieux\u0027 appara\u00eet aussi 7 fois. Le Coran ne joue pas avec ses nombres. Il les choisit.',
  'Certains ont relev\u00e9 que \u0027sept cieux\u0027 et \u0027cr\u00e9ation des cieux\u0027 appara\u00eetraient chacun 7 fois dans le Coran. Une observation discut\u00e9e. Ce que le Coran affirme clairement, lui : les cieux sont sept, et leur cr\u00e9ation est un signe.',
  11
);

// N717 — "Dunyâ" / "âkhira" (reformuler avec prudence)
rep(
  'Le mot \u0027monde\u0027 (duny\u00e2) appara\u00eet 115 fois dans le Coran. Le mot \u0027au-del\u00e0\u0027 (\u00e2khira) appara\u00eet 115 fois aussi. All\u00e2h a mis exactement le m\u00eame poids sur ce qui passe et ce qui dure. Choisis ta proportion.',
  'Certains ont relev\u00e9 que \u0027monde ici-bas\u0027 (duny\u00e2) et \u0027au-del\u00e0\u0027 (\u00e2khira) appara\u00eetraient le m\u00eame nombre de fois dans le Coran. Une observation discut\u00e9e. Mais l\u0027\u00e9quilibre que le Coran \u00e9tablit entre les deux, lui, est au c\u0153ur de chaque page. Choisis ta proportion.',
  12
);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
