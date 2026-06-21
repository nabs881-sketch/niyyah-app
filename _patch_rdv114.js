const fs = require('fs');
let c = fs.readFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', 'utf-8');

function insertAfter(content, anchorEnd, newParaFr, type) {
  type = type || 'text';
  const newPara = ',{"type":"' + type + '","content":{"fr":"' + newParaFr + '","en":"","ar":""}}';
  const idx = content.indexOf(anchorEnd);
  if (idx < 0) { console.log('ANCHOR NOT FOUND: ' + anchorEnd.substring(0,80)); process.exit(1); }
  const insertAt = idx + anchorEnd.length;
  return content.substring(0, insertAt) + newPara + content.substring(insertAt);
}

// Mod 1 — after italic "Va. Et règle l'affaire. »"
c = insertAfter(c,
  "Va. Et r\u00e8gle l'affaire. \u00bb\",\"en\":\"\",\"ar\":\"\"}}",
  '\u02bfAbdull\u0101h demanda\u00a0: \u00ab\u00a0D\u00e9cris-le-moi, \u00f4 Messager d\u2019Allah, afin que je le reconnaisse.\u00a0\u00bb Le Proph\u00e8te \ufdfa r\u00e9pondit\u00a0: \u00ab\u00a0Quand tu le verras, il te rappellera Satan. Et le signe entre toi et lui\u00a0: quand tu le verras, tu ressentiras un frisson.\u00a0\u00bb \u02bfAbdull\u0101h dit plus tard\u00a0: \u00ab\u00a0Quand je le vis, c\u2019est exactement ce que je ressentis.\u00a0\u00bb'
);
console.log('Mod 1 applied');

// Mod 2 — after "Puis ʿAbdullāh vit son moment. Il agit."
c = insertAfter(c,
  'vit son moment. Il agit.","en":"","ar":""}}',
  'Mais avant d\u2019agir, l\u2019heure de la pri\u00e8re de l\u2019Asr \u00e9tait venue. Il ne pouvait pas s\u2019arr\u00eater \u2014 se prosterner l\u00e0-bas l\u2019aurait trahi. Il pria en faisant des signes de t\u00eate, marchant, sans s\u2019arr\u00eater. Puis, quand il fut seul avec Kh\u0101lid, il l\u2019abattit.'
);
console.log('Mod 2 applied');

// Mod 3 — after "Il lui tendit un bâton."
c = insertAfter(c,
  'Il lui tendit un b\u00e2ton.","en":"","ar":""}}',
  'Ce n\u2019\u00e9tait pas le geste habituel du commandant qui regarde la preuve et valide. C\u2019\u00e9tait quelque chose de plus personnel. Le Proph\u00e8te \ufdfa avait envoy\u00e9 un homme seul, sans escorte, dans des territoires hostiles, avec pour seule arme sa ruse et sa foi. Et cet homme \u00e9tait revenu. Il m\u00e9ritait mieux qu\u2019un regard sur la t\u00eate.'
);
console.log('Mod 3 applied');

fs.writeFileSync('C:/Users/YOUSS/Documents/niyyah-app/data/sira.min.json', c, 'utf-8');

// Verify
const checks = [
  'il te rappellera Satan',
  'tu ressentiras un frisson',
  'signes de t\u00eate, marchant, sans s\u2019arr\u00eater',
  'Il m\u00e9ritait mieux qu\u2019un regard sur la t\u00eate'
];
checks.forEach(t => {
  console.log((c.indexOf(t) >= 0 ? 'OK' : 'MISSING') + ' "' + t + '"');
});
