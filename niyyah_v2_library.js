// ============================================================================
// NIYYAH V2 — Base locale (fallback offline + users gratuits)
// ============================================================================
// 84 questions Regarde + 84 intentions Niyyah
// 7 catégories × 12 items chacune
// Audit conforme à la spec verrouillée du 18 avril 2026
//
// USAGE :
//   - Inclure ce fichier dans index.html AVANT script.js :
//     <script src="niyyah_v2_library.js"></script>
//   - Les objets et helpers deviennent disponibles globalement dans script.js
//
// CATÉGORIES :
//   SOI         — selfie, reflet, main, partie du corps
//   AUTRE       — personne adulte autre que l'utilisateur
//   OBJET       — objet, possession, consommable
//   MONDE       — espace, nature, paysage, ciel, mur
//   ENFANT      — bébé, enfant, adolescent
//   SACRE       — Coran papier, tapis, mosquée, calligraphie
//   INDETERMINE — fallback si confiance IA < 80%
// ============================================================================


const NIYYAH_V2_LIBRARY = {

  // ==========================================================================
  // MODE REGARDE — questions de muhasaba
  // Règles : 8-15 mots, finit par "?", tutoiement, liste blanche arabe
  // ==========================================================================
  regarde: {

    SOI: [
      "Ce visage a vécu quoi aujourd'hui que tu dirais à Allah ?",
      "Si ton reflet pouvait te parler, qu'est-ce qu'il te reprocherait gentiment ?",
      "Cette main — qu'a-t-elle donné aujourd'hui, qu'a-t-elle pris ?",
      "Qu'est-ce que ton corps fait pour toi en silence depuis ce matin ?",
      "Ce visage que tu vois — qui l'a façonné, et à qui ressemble-t-il ?",
      "Tes yeux ont vu quoi aujourd'hui qui a changé ton cœur ?",
      "Ta langue a parlé aujourd'hui — lequel de ses mots voudrais-tu reprendre ?",
      "Ces pieds t'ont mené où, depuis l'aube ?",
      "Ce visage cache quoi aujourd'hui que personne ne voit ?",
      "Ton cœur bat sans que tu le lui demandes — quand l'as-tu remercié ?",
      "Ton souffle ne t'appartient pas — à qui l'as-tu consacré aujourd'hui ?",
      "Ce corps que tu habites — est-ce que tu en prends soin comme d'un dépôt ?"
    ],

    AUTRE: [
      "Cette personne — as-tu prié pour elle récemment, même une seconde ?",
      "Que verrais-tu si Allah te montrait le cœur qui bat dans ce corps ?",
      "Qu'a fait cette personne aujourd'hui que personne n'a remarqué ?",
      "Si Allah te demandait « qu'as-tu fait pour elle ? », que répondrais-tu ?",
      "Cette personne te connaît-elle vraiment, ou seulement ton masque ?",
      "À qui ressemble cette personne quand elle est seule, le soir ?",
      "Qu'est-ce que cette personne attend de toi sans oser le demander ?",
      "Ce visage a combien de soucis que tu ignores ?",
      "Si c'était la dernière fois que tu la voyais, que lui dirais-tu ?",
      "Cette personne t'a-t-elle déjà vu prier pour elle, de près ou de loin ?",
      "Qu'est-ce qui la rend précieuse à Allah, que tu n'as jamais vu ?",
      "Un jour, toi et elle serez poussière — qu'est-ce qui restera ?"
    ],

    OBJET: [
      "Cet objet t'a coûté combien — combien t'a-t-il rendu ?",
      "Sans lui, serais-tu un peu moins toi ?",
      "Qui l'a fabriqué, et pour quel salaire ?",
      "Cette chose sera poussière un jour — et toi, avant elle ou après ?",
      "Combien de fois l'as-tu utilisé sans y penser ?",
      "Cet objet est-il un moyen ou une fin pour toi ?",
      "Si tu devais le donner demain, lâcherais-tu facilement ?",
      "Est-ce que cette chose sert ce que tu es, ou distrait ce que tu deviens ?",
      "Allah t'a permis cet objet — l'as-tu remercié au moins une fois pour lui ?",
      "Cette chose était un rêve avant d'être ta possession — t'en souviens-tu ?",
      "Combien de personnes ont participé pour que tu l'aies entre les mains ?",
      "Cet objet te rapproche-t-il ou t'éloigne-t-il de Celui qui te l'a permis ?"
    ],

    MONDE: [
      "Combien de fois as-tu regardé ceci sans le voir ?",
      "Qu'est-ce qui existait ici avant toi, et restera après ?",
      "Ce que tu vois — est-ce qu'Allah l'a fait pour toi seul, ou pour tous ?",
      "Si ce paysage pouvait te témoigner, que dirait-il de toi ?",
      "Qu'est-ce qui est caché dans ce que tu vois, que seul Allah sait ?",
      "Ceci est un signe — lequel, selon toi ?",
      "Que fait cette chose pour la création, sans salaire et sans plainte ?",
      "Si tu ne revenais plus jamais ici, qu'aurais-tu manqué de voir ?",
      "Le silence de ce lieu te parle de quoi ?",
      "Allah regarde aussi ce que tu regardes — à quoi pense-t-Il ?",
      "Ce que tu vois a été créé en combien de temps, selon toi ?",
      "Qu'est-ce que ce spectacle t'apprend que personne ne pourrait t'enseigner ?"
    ],

    ENFANT: [
      "Qu'est-ce que cet enfant sait qu'on a oublié en grandissant ?",
      "Cet enfant est une amana — de quoi dois-tu répondre pour lui ?",
      "Que verrait-il en toi s'il savait tout lire dans les visages ?",
      "Qu'est-ce qui le fait rire, et quand as-tu ri comme ça récemment ?",
      "Cet enfant prie-t-il encore avec la simplicité que tu as perdue ?",
      "Que lui enseignes-tu sans t'en rendre compte, chaque jour ?",
      "Qui sera-t-il dans vingt ans grâce à ce que tu fais aujourd'hui ?",
      "Quelle est la prochaine prière que tu feras pour lui ?",
      "De quoi as-tu peur pour lui — est-ce que ça relève de toi ou d'Allah ?",
      "S'il te regardait prier, apprendrait-il quelque chose de beau ?",
      "Cet enfant t'a-t-il appris quelque chose que les adultes n'ont pas su t'apprendre ?",
      "Qui continuerait à lui parler d'Allah si tu n'étais plus là ?"
    ],

    SACRE: [
      "Quand l'as-tu ouvert, touché, ou fréquenté pour la dernière fois — vraiment ?",
      "Est-ce que ce sacré te regarde aussi, à sa manière ?",
      "Qu'est-ce qui te sépare, toi et ceci, depuis combien de temps ?",
      "Si ce sacré pouvait te parler, commencerait-il par un reproche ou par une invitation ?",
      "Qu'est-ce qui te manque pour être digne de t'en approcher maintenant ?",
      "As-tu déjà pleuré devant ce que tu vois là ?",
      "Ce sacré attend-il quelque chose de toi, ou tu l'attends, toi ?",
      "Quelle dernière phrase as-tu dite en sa présence ?",
      "Si tu te tenais devant Allah avec ceci dans les mains, que dirais-tu ?",
      "Que fera de toi la prochaine fois que tu t'assieras ici ?",
      "Cet objet sacré a appartenu à qui avant toi, et à qui après ?",
      "Si ce sacré t'invitait à passer une heure avec lui maintenant, irais-tu ?"
    ],

    INDETERMINE: [
      "Qu'est-ce qu'Allah voit ici que tu n'as pas encore remarqué ?",
      "Si ce moment était pesé, que pèserait-il ?",
      "Qu'es-tu en train de faire vraiment, pas ce que tu crois faire ?",
      "Allah est avec toi là, maintenant — qu'est-ce que ça change ?",
      "Qu'est-ce qui t'a amené à cet instant précis ?",
      "Quelle prière pourrais-tu faire en trois secondes, sans bouger ?",
      "Qu'est-ce que tu n'as pas dit à Allah aujourd'hui ?",
      "Si tu devais raconter cette minute à quelqu'un qui t'aime, que dirais-tu ?",
      "Qu'est-ce qui dort en toi et qui pourrait se réveiller en cet instant ?",
      "À quelle distance es-tu d'Allah, selon toi, là, tout de suite ?",
      "Que ferait un bon musulman que tu connais, à ta place, maintenant ?",
      "Quand as-tu ressenti Allah pour la dernière fois — vraiment ?"
    ]
  },


  // ==========================================================================
  // MODE NIYYAH — intentions posées
  // Règles : commence par "Je", max 15 mots, pas de "?"
  // ==========================================================================
  niyyah: {

    SOI: [
      "Je confie ce visage à Celui qui l'a dessiné sans mon avis.",
      "Je redonne à mes mains ce qu'elles ont oublié d'être : une amana.",
      "Je regarde ce reflet en me rappelant qu'Il me voit mieux que moi.",
      "Je tiens ma langue aujourd'hui comme on tient un feu.",
      "Je laisse mon souffle rejoindre le dhikr, même sans que je le dise.",
      "Je marche avec ces pieds comme s'ils savaient où Il m'attend.",
      "Je choisis de ne pas mentir à l'homme que je vois là.",
      "Je prends soin de ce corps comme d'un invité qui partira bientôt.",
      "Je m'offre à ma journée plutôt que de m'y défendre.",
      "Je reviens à Toi par ce regard, avant que le monde ne me disperse.",
      "Je cesse de rivaliser avec celui que j'aurais pu être.",
      "Je porte mon nom aujourd'hui comme Tu l'as prononcé le premier."
    ],

    AUTRE: [
      "Je vois cette personne avec le regard qu'Allah pose sur elle.",
      "Je dépose mes jugements avant de lui adresser un mot.",
      "Je lui souhaite en silence ce que je voudrais pour moi.",
      "Je prie pour elle, même brièvement, avant de lui parler.",
      "Je reconnais en elle ce que je n'ai jamais su voir.",
      "Je l'écoute comme si c'était la dernière fois.",
      "Je lui pardonne d'avance ce qui me blessera peut-être.",
      "Je cherche son bien avant de défendre le mien.",
      "Je m'efface un instant pour qu'elle existe entièrement.",
      "Je la confie à Toi avant de la confier à mes attentes.",
      "Je refuse que mon ego parle à sa place aujourd'hui.",
      "Je porte en moi son adab comme elle porte le mien."
    ],

    OBJET: [
      "Je touche ceci en remerciant Celui qui me l'a permis.",
      "Je refuse que cet objet devienne plus grand que mon cœur.",
      "J'utilise ceci pour ce qu'Il m'a ouvert, pas pour me perdre.",
      "Je bénis la main inconnue qui l'a fabriqué avant moi.",
      "Je lâche d'avance ce que je serais prêt à perdre demain.",
      "Je m'en sers comme d'un outil, jamais comme d'un maître.",
      "Je remercie pour ce bienfait que j'allais tenir pour acquis.",
      "Je me rappelle que ceci fut poussière, et le redeviendra.",
      "Je l'utilise en pensant à ceux qui n'en ont aucun.",
      "Je consacre cette chose à ce qui sert, pas à ce qui distrait.",
      "Je libère mon cœur de la possession de ce qui me possède.",
      "Je reçois ceci de Ta main avant toute autre provenance."
    ],

    MONDE: [
      "Je regarde ceci comme un signe adressé à moi seul.",
      "Je m'arrête devant cette ayât le temps qu'il le faut.",
      "Je remercie pour ce spectacle gratuit que je n'ai pas mérité.",
      "Je prends humblement ma place dans cette création qui me contient.",
      "Je laisse ce silence me parler de Celui qui se tait.",
      "Je me rappelle que j'existerai moins longtemps que cette pierre.",
      "J'accueille ce lieu comme un hôte, pas comme un propriétaire.",
      "Je m'incline intérieurement devant ce que mes yeux ne comprennent pas.",
      "Je vois ici la main du Maître derrière l'apparence des choses.",
      "Je confie ma journée à Celui qui tient ce ciel.",
      "Je traverse cet espace en y laissant moins qu'il ne me donne.",
      "Je reçois cette lumière comme elle vient, sans rien demander d'autre."
    ],

    ENFANT: [
      "Je confie cet enfant à Toi plus qu'à moi-même.",
      "Je porte sa pureté en mémoire pour retrouver la mienne.",
      "Je lui enseigne aujourd'hui par ce que je suis, pas par ce que je dis.",
      "Je garde cette amana en sachant que j'en répondrai.",
      "Je prie pour qu'il connaisse Allah avant de connaître le monde.",
      "Je protège son regard de ce que j'ai laissé entrer dans le mien.",
      "Je ralentis mon pas pour qu'il puisse le suivre.",
      "Je lui offre une tendresse qui ressemble à celle d'Allah.",
      "Je l'aime sans faire de lui le prolongement de moi.",
      "J'accepte de ne pas savoir ce qu'il deviendra, et je lâche.",
      "Je m'incline devant ce qu'il sait encore et que j'ai oublié.",
      "Je lui laisse un héritage invisible avant tout bien visible."
    ],

    SACRE: [
      "Je m'approche de ceci comme on approche d'un roi.",
      "Je dépose mes préoccupations avant de poser ma main.",
      "Je reviens à Toi par ce que j'ai trop longtemps délaissé.",
      "J'honore ce lien que j'ai laissé se refroidir sans le dire.",
      "Je m'assieds ici comme si c'était la dernière fois.",
      "Je laisse cette parole me traverser avant de la comprendre.",
      "Je me tais intérieurement devant ce qui n'appartient qu'à Toi.",
      "Je consacre cet instant à ce qu'Il m'a confié en premier.",
      "Je renouvelle mon intention avant de franchir ce seuil.",
      "Je me présente devant ceci sans rien de ce que je prétends être.",
      "J'ouvre ceci en sachant que ceci m'ouvre davantage que je ne l'ouvre.",
      "Je reprends ce rendez-vous que j'ai trop souvent manqué."
    ],

    INDETERMINE: [
      "Je dépose ma confiance en Toi pour cet instant précis.",
      "Je m'aligne sur ce que Tu veux de moi, là, maintenant.",
      "Je remercie pour ce moment que je n'avais rien fait pour mériter.",
      "Je reviens à Toi par ce geste discret que personne ne voit.",
      "Je consacre cette minute à ce qui restera après elle.",
      "Je laisse partir ce qui me distrait et je Te reviens.",
      "Je me remets entre Tes mains avant que la journée m'emporte.",
      "Je me rappelle que Tu me regardes, et cela me suffit.",
      "Je fais ce que je fais avec la conscience qu'Il voit.",
      "Je pose mon cœur ici avant de poser autre chose.",
      "Je choisis Ta paix, même quand elle n'a pas l'apparence du calme.",
      "Je reviens au dhikr que j'ai laissé filer tout à l'heure."
    ]
  }
};


// ============================================================================
// HELPERS — tirage aléatoire avec anti-répétition
// ============================================================================
// Évite de ressortir une des 5 dernières questions/intentions vues.
// Si la catégorie n'existe pas, fallback automatique sur INDETERMINE.
// ============================================================================


/**
 * Tire une question aléatoire du mode Regarde dans la catégorie donnée.
 * Anti-répétition : mémorise les 5 dernières vues en localStorage.
 *
 * @param {string} category - SOI, AUTRE, OBJET, MONDE, ENFANT, SACRE, INDETERMINE
 * @returns {string} Une question (8-15 mots, finit par "?")
 */
function pickRegardeQuestion(category) {
  const cat = (category && NIYYAH_V2_LIBRARY.regarde[category])
    ? category
    : 'INDETERMINE';

  const pool = NIYYAH_V2_LIBRARY.regarde[cat];
  const recentKey = 'niyyah_regarde_recent';
  let recent = [];

  try {
    recent = JSON.parse(localStorage.getItem(recentKey) || '[]');
  } catch (e) {
    recent = [];
  }

  // Filtre les questions non vues récemment
  const available = pool.filter(q => !recent.includes(q));

  // Si tout a été vu récemment, on réinitialise et on repart du pool complet
  const candidates = available.length > 0 ? available : pool;

  // Tirage aléatoire
  const picked = candidates[Math.floor(Math.random() * candidates.length)];

  // Mémorise (max 5 dernières)
  recent.push(picked);
  if (recent.length > 5) recent = recent.slice(-5);

  try {
    localStorage.setItem(recentKey, JSON.stringify(recent));
  } catch (e) {
    // Silencieux : si localStorage est plein, on continue
  }

  return picked;
}


/**
 * Tire une intention aléatoire du mode Niyyah dans la catégorie donnée.
 * Anti-répétition : mémorise les 5 dernières vues en localStorage.
 *
 * @param {string} category - SOI, AUTRE, OBJET, MONDE, ENFANT, SACRE, INDETERMINE
 * @returns {string} Une intention (commence par "Je", max 15 mots)
 */
function pickNiyyahIntention(category) {
  const cat = (category && NIYYAH_V2_LIBRARY.niyyah[category])
    ? category
    : 'INDETERMINE';

  const pool = NIYYAH_V2_LIBRARY.niyyah[cat];
  const recentKey = 'niyyah_niyyah_recent';
  let recent = [];

  try {
    recent = JSON.parse(localStorage.getItem(recentKey) || '[]');
  } catch (e) {
    recent = [];
  }

  const available = pool.filter(i => !recent.includes(i));
  const candidates = available.length > 0 ? available : pool;

  const picked = candidates[Math.floor(Math.random() * candidates.length)];

  recent.push(picked);
  if (recent.length > 5) recent = recent.slice(-5);

  try {
    localStorage.setItem(recentKey, JSON.stringify(recent));
  } catch (e) {
    // Silencieux
  }

  return picked;
}


// ============================================================================
// FIN — Base locale Niyyah V2
// ============================================================================
