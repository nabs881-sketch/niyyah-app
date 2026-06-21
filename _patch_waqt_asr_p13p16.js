const fs = require('fs');
const FILE = 'C:/Users/YOUSS/Documents/niyyah-app/data/waqt/waqt_asr.json';
let raw = fs.readFileSync(FILE, 'utf-8');

function rep(from, to, n) {
  const idx = raw.indexOf(from);
  if (idx < 0) { console.log('NOT FOUND C' + n + ': ' + from.substring(0, 70)); process.exit(1); }
  raw = raw.substring(0, idx) + to + raw.substring(idx + from.length);
  console.log('C' + n + ' OK');
}

// C1 — U+2019 apostrophes (confirmed OK from prev test)
rep('Allah a tiss\u00e9 entre les \u00e2mes des ponts que la science ne voit pas.',
    'Entre les \u00e2mes, quelque chose circule que la science mesure sans nommer.', 1);

// C2
rep('Les animaux savent. Toi tu lis.',
    'Les cr\u00e9atures ob\u00e9issent \u00e0 quelque chose. Toi tu peux choisir de Le reconna\u00eetre.', 2);

// C3
rep('\u00c0 la racine, il faut Celui qui ne d\u00e9pend de rien.',
    '\u00c0 la racine, il faut soit Quelqu\u0027un qui ne d\u00e9pend de rien, soit une r\u00e9gression infinie sans fin. Choisis ce qui te semble plus raisonnable.', 3);

// C4 — U+2019
rep('L\u2019\u00e2me se souvient sans que la t\u00eate ne sache.',
    'Ce qui est grav\u00e9 sous la conscience agit sans qu\u2019on le sache. Le Coran parle d\u2019une r\u00e9alit\u00e9 similaire dans l\u2019\u00e2me.', 4);

// C5
rep('Le Regard divin est constitutif du r\u00e9el.',
    'Allah voit tout \u2014 et Sa vision ne change rien \u00e0 Sa transcendance.', 5);

// C6 — U+0027
rep('C\u0027est pr\u00e9cis\u00e9ment cette question que le Coran appelle la fitra.',
    'Cette question est ce que les savants appellent la trace de la fitra en toi \u2014 la disposition naturelle \u00e0 chercher ton Cr\u00e9ateur.', 6);

// C7
rep('Il part \u00e9tudier dans le d\u00e9sert mauritanien pendant dix ans.',
    'Il part \u00e9tudier en Mauritanie et dans plusieurs pays du monde musulman pendant des ann\u00e9es.', 7);

// C8 — U+2019
rep('Le combat de Dieu pour les \u00e2mes est plein de retournements.',
    'La guidance divine emprunte des chemins que personne ne pr\u00e9voit.', 8);

// C9 — substring match (rest of sentence follows in file)
rep('Son ma\u00eetre mourant lui r\u00e9v\u00e9la en confidence',
    'Son ma\u00eetre mourant lui r\u00e9v\u00e9la en confidence, selon son propre r\u00e9cit dans Tuhfat al-Arib,', 9);

// C10 — U+0027
rep('Aucune religion dans l\u0027histoire humaine n\u0027a couvert une telle g\u00e9ographie en si peu de temps, sans rouleau compresseur imp\u00e9rial.',
    'Peu de religions dans l\u0027histoire ont couvert une telle g\u00e9ographie en un si\u00e8cle.', 10);

// C11 — U+0027
rep('Quel autre conqu\u00e9rant a refus\u00e9 une \u00e9glise par consid\u00e9ration pour ses propres descendants ? Tu ne trouves pas.',
    'Les historiens chr\u00e9tiens eux-m\u00eames le notent comme un geste sans pr\u00e9c\u00e9dent.', 11);

// C12 — U+0027
rep('Il n\u0027a pas d\u00e9tourn\u00e9 les yeux. Toi non plus, ne les d\u00e9tourne pas.',
    'L\u0027un des esprits les plus complets de l\u0027Occident moderne a regard\u00e9 l\u0027islam. Il n\u0027a pas d\u00e9tourn\u00e9 les yeux.', 12);

// C13 — U+0027
rep('L\u0027un des plus grands romanciers du monde s\u0027est retourn\u00e9. Tu peux te poser les m\u00eames questions sans honte.',
    'L\u0027un des plus grands romanciers du monde s\u0027est retourn\u00e9 vers ces questions. Elles m\u00e9ritent qu\u0027on s\u0027y arr\u00eate.', 13);

// C14 — VIIe (no accent), no apostrophes in the target phrase
rep('Au VIIe si\u00e8cle, personne ne voyait sous la terre. Le verset, lui, savait.',
    'Au VIIe si\u00e8cle, personne ne mesurait les racines des montagnes. L\u0027image du verset, elle, les avait nomm\u00e9es.', 14);

// C15 — U+0027
rep('Aucune th\u00e9orie n\u0027explique vraiment pourquoi l\u0027atmosph\u00e8re est synchronis\u00e9e. Elle est. Et tu vis dedans.',
    'Allah a synchronis\u00e9 l\u0027air et le sol pour que ta vie soit possible. Cette coh\u00e9rence n\u0027est pas une \u00e9vidence \u2014 c\u0027est un r\u00e9glage.', 15);

// C16 — U+0027
rep('Allah ne t\u0027a jamais demand\u00e9 de juger l\u0027islam par les musulmans. Il t\u0027a demand\u00e9 de juger les musulmans par l\u0027islam. L\u0027ordre compte.',
    'Allah ne t\u0027a pas demand\u00e9 de juger l\u0027islam d\u0027apr\u00e8s ses pratiquants. Il t\u0027a demand\u00e9 de juger les pratiquants d\u0027apr\u00e8s l\u0027islam. L\u0027ordre compte.', 16);

// C17 — U+0027
rep('Un ath\u00e9e vrai ne doute pas \u2014 il s\u0027en fiche.',
    'Quelqu\u0027un qui ne cherche pas ne revient pas. Toi tu reviens.', 17);

// C18 — U+0027
rep('Le premier h\u00f4pital de l\u0027histoire \u00e0 fournir des soins gratuits',
    'L\u0027un des premiers h\u00f4pitaux de l\u0027histoire \u00e0 fournir des soins gratuits', 18);

// C19 — U+0027, XVIe and XIe (no accent)
rep('La science n\u0027est pas n\u00e9e en Europe au XVIe si\u00e8cle. Elle est n\u00e9e dans les laboratoires de croyants musulmans au XIe.',
    'La m\u00e9thode exp\u00e9rimentale moderne doit beaucoup aux savants musulmans du XIe si\u00e8cle \u2014 bien avant la Renaissance europ\u00e9enne.', 19);

// C20 — U+0027
rep('\u00e9tudes g\u00e9ologiques (NASA, Universit\u00e9 d\u0027Oxford)',
    '\u00e9tudes g\u00e9ologiques et pal\u00e9oclimatiques', 20);

// C21 — U+0027, VIIe (no accent)
rep('Le Proph\u00e8te \ufdfa a \u00e9voqu\u00e9, parmi les signes des derniers temps, que la terre se rapprocherait et qu\u0027un homme pourrait voir son fr\u00e8re \u00e0 grande distance.',
    'Le Proph\u00e8te \ufdfa a \u00e9voqu\u00e9, parmi les signes des derniers temps (sens g\u00e9n\u00e9ral des hadiths sur les signes, plusieurs voies), que la terre se rapprocherait et qu\u0027un homme pourrait voir son fr\u00e8re \u00e0 grande distance.', 21);

// C22
rep('(Ahmad 18596).',
    '(Ahmad 18596, authentifi\u00e9 par al-Alb\u00e2ni).', 22);

// C23 — U+0027, VIIe (no accent)
rep('Au VIIe si\u00e8cle, personne n\u0027avait les moyens de concevoir ce genre de structure.',
    'Remarqu\u00e9 des si\u00e8cles apr\u00e8s \u2014 sans que personne n\u0027en ait \u00e9t\u00e9 l\u0027architecte conscient.', 23);

fs.writeFileSync(FILE, raw, 'utf-8');
console.log('\nDone. File written.');
