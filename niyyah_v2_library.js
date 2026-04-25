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
  },

  // EN — Regarde
  regarde_en: {
    SOI: ["What did this face go through today that you would tell Allah?","If your reflection could speak, what would it gently reproach you for?","This hand \u2014 what did it give today, what did it take?","What has your body been doing for you in silence since this morning?","This face you see \u2014 who shaped it, and who does it resemble?","What did your eyes see today that changed your heart?","Your tongue spoke today \u2014 which of its words would you take back?","Where have these feet led you since dawn?","What is this face hiding today that no one sees?","Your heart beats without you asking \u2014 when did you last thank it?","Your breath does not belong to you \u2014 to whom did you dedicate it today?","This body you inhabit \u2014 do you care for it as a trust?"],
    AUTRE: ["This person \u2014 have you prayed for them recently, even for a second?","What would you see if Allah showed you the heart beating in that body?","What did this person do today that no one noticed?","If Allah asked you \u2018what did you do for them?\u2019, what would you answer?","Does this person truly know you, or only your mask?","Who does this person resemble when they are alone at night?","What is this person expecting from you without daring to ask?","How many worries does this face carry that you ignore?","If this were the last time you saw them, what would you say?","Has this person ever seen you pray for them, near or far?","What makes them precious to Allah that you have never seen?","One day, you and they will be dust \u2014 what will remain?"],
    OBJET: ["How much did this object cost you \u2014 how much has it given back?","Without it, would you be a little less yourself?","Who made it, and for what wage?","This thing will be dust one day \u2014 and you, before it or after?","How many times have you used it without thinking?","Is this object a means or an end for you?","If you had to give it away tomorrow, would you let go easily?","Does this thing serve who you are, or distract who you are becoming?","Allah allowed you this object \u2014 have you thanked Him even once for it?","This thing was a dream before it was your possession \u2014 do you remember?","How many people contributed so you could hold it in your hands?","Does this object bring you closer or further from the One who gave it?"],
    MONDE: ["How many times have you looked at this without seeing it?","What existed here before you, and will remain after?","What you see \u2014 did Allah make it for you alone, or for all?","If this landscape could testify, what would it say about you?","What is hidden in what you see that only Allah knows?","This is a sign \u2014 which one, in your opinion?","What does this thing do for creation, without pay or complaint?","If you never came back here, what would you have missed seeing?","What does the silence of this place speak to you about?","Allah also sees what you are looking at \u2014 what do you think He thinks?","How long was what you see created in, in your opinion?","What does this sight teach you that no one could?"],
    ENFANT: ["What does this child know that we forgot while growing up?","This child is an amana \u2014 what must you answer for?","What would they see in you if they could read every face?","What makes them laugh, and when did you last laugh like that?","Does this child still pray with the simplicity you have lost?","What do you teach them without realizing it, every day?","Who will they be in twenty years thanks to what you do today?","What is the next prayer you will make for them?","What do you fear for them \u2014 is it up to you or to Allah?","If they watched you pray, would they learn something beautiful?","Has this child taught you something adults never could?","Who would keep telling them about Allah if you were gone?"],
    SACRE: ["When did you last open, touch, or visit this \u2014 truly?","Does this sacred thing also look at you, in its own way?","What separates you and this, and for how long?","If this sacred could speak, would it start with a reproach or an invitation?","What do you lack to be worthy of approaching it now?","Have you ever cried before what you see here?","Is this sacred waiting for something from you, or are you waiting for it?","What was the last thing you said in its presence?","If you stood before Allah with this in your hands, what would you say?","What will it make of you the next time you sit here?","Who did this sacred object belong to before you, and who after?","If this sacred invited you to spend an hour with it now, would you go?"],
    INDETERMINE: ["What does Allah see here that you haven\u2019t noticed yet?","If this moment were weighed, what would it weigh?","What are you truly doing, not what you think you are doing?","Allah is with you right now \u2014 what does that change?","What brought you to this exact moment?","What prayer could you make in three seconds, without moving?","What haven\u2019t you said to Allah today?","If you had to describe this minute to someone who loves you, what would you say?","What sleeps in you that could awaken in this instant?","How far are you from Allah, in your opinion, right now?","What would a good Muslim you know do in your place right now?","When did you last truly feel Allah?"]
  },
  // EN — Niyyah
  niyyah_en: {
    SOI: ["I entrust this face to the One who drew it without my say.","I give back to my hands what they forgot to be: an amana.","I look at this reflection remembering He sees me better than I do.","I hold my tongue today as one holds a fire.","I let my breath join the dhikr, even without saying it.","I walk with these feet as if they knew where He awaits me.","I choose not to lie to the man I see here.","I care for this body like a guest who will soon depart.","I offer myself to my day rather than defend myself against it.","I return to You through this gaze, before the world scatters me.","I stop competing with who I could have been.","I carry my name today as You first pronounced it."],
    AUTRE: ["I see this person with the gaze Allah places on them.","I set down my judgments before addressing a word to them.","I silently wish for them what I would want for myself.","I pray for them, even briefly, before speaking to them.","I recognize in them what I never knew how to see.","I listen to them as if it were the last time.","I forgive them in advance for what may hurt me.","I seek their good before defending my own.","I step back for a moment so they can exist fully.","I entrust them to You before entrusting them to my expectations.","I refuse to let my ego speak in their place today.","I carry their adab in me as they carry mine."],
    OBJET: ["I touch this thanking the One who allowed it for me.","I refuse to let this object become greater than my heart.","I use this for what He opened for me, not to lose myself.","I bless the unknown hand that made it before me.","I let go in advance of what I would be ready to lose tomorrow.","I use it as a tool, never as a master.","I give thanks for this blessing I was about to take for granted.","I remember that this was dust, and will become dust again.","I use it thinking of those who have none.","I dedicate this thing to what serves, not what distracts.","I free my heart from possessing what possesses me.","I receive this from Your hand before any other source."],
    MONDE: ["I look at this as a sign addressed to me alone.","I pause before this ayah for as long as it takes.","I give thanks for this free spectacle I did not deserve.","I humbly take my place in this creation that holds me.","I let this silence speak to me of the One who is silent.","I remember I will exist less long than this stone.","I welcome this place as a guest, not as an owner.","I bow inwardly before what my eyes cannot understand.","I see here the hand of the Master behind the appearance of things.","I entrust my day to the One who holds this sky.","I pass through this space leaving less than it gives me.","I receive this light as it comes, without asking for anything else."],
    ENFANT: ["I entrust this child to You more than to myself.","I carry their purity in memory to find my own again.","I teach them today by what I am, not by what I say.","I keep this amana knowing I will answer for it.","I pray for them to know Allah before knowing the world.","I protect their gaze from what I let enter mine.","I slow my step so they can follow.","I offer them a tenderness that resembles Allah\u2019s.","I love them without making them an extension of myself.","I accept not knowing what they will become, and I let go.","I bow before what they still know and I have forgotten.","I leave them an invisible heritage before any visible one."],
    SACRE: ["I approach this as one approaches a king.","I set down my worries before placing my hand.","I return to You through what I neglected too long.","I honor this bond I let grow cold without saying.","I sit here as if it were the last time.","I let this word pass through me before understanding it.","I fall silent inwardly before what belongs only to You.","I dedicate this moment to what He entrusted me with first.","I renew my intention before crossing this threshold.","I present myself before this with nothing I claim to be.","I open this knowing it opens me more than I open it.","I resume this appointment I have missed too often."],
    INDETERMINE: ["I place my trust in You for this precise moment.","I align myself with what You want from me, here, now.","I give thanks for this moment I did nothing to deserve.","I return to You through this quiet gesture no one sees.","I dedicate this minute to what will remain after it.","I let go of what distracts me and return to You.","I place myself in Your hands before the day carries me away.","I remember that You are watching me, and that is enough.","I do what I do with the awareness that He sees.","I place my heart here before placing anything else.","I choose Your peace, even when it doesn\u2019t look like calm.","I return to the dhikr I let slip away earlier."]
  },
  // AR — Regarde
  regarde_ar: {
    SOI: ["\u0645\u0627\u0630\u0627 \u0639\u0627\u0634\u064E \u0647\u0630\u0627 \u0627\u0644\u0648\u064E\u062C\u0652\u0647\u064F \u0645\u0650\u0645\u0651\u0627 \u062A\u064F\u062E\u0652\u0628\u0650\u0631\u064F \u0628\u0650\u0647\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u064E\u061F","\u0644\u064E\u0648\u0652 \u062A\u064E\u0643\u064E\u0644\u0651\u064E\u0645\u064E \u0627\u0646\u0652\u0639\u0650\u0643\u0627\u0633\u064F\u0643\u060C \u0628\u0650\u0645\u0627\u0630\u0627 \u064A\u064F\u0639\u0627\u062A\u0650\u0628\u064F\u0643\u064E\u061F","\u0647\u064E\u0630\u0650\u0647\u0650 \u0627\u0644\u064A\u064E\u062F \u2014 \u0645\u0627\u0630\u0627 \u0623\u064E\u0639\u0652\u0637\u064E\u062A\u0652\u060C \u0648\u0645\u0627\u0630\u0627 \u0623\u064E\u062E\u064E\u0630\u064E\u062A\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u062C\u064E\u0633\u064E\u062F\u064F\u0643\u064E \u0628\u0650\u0635\u064E\u0645\u0652\u062A\u064D \u0645\u064F\u0646\u0652\u0630\u064F \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D\u061F","\u0645\u064E\u0646\u0652 \u0635\u064E\u0648\u0651\u064E\u0631\u064E\u0647\u060C \u0648\u0644\u0650\u0645\u064E\u0646\u0652 \u064A\u064F\u0634\u0652\u0628\u0650\u0647\u061F","\u0645\u0627\u0630\u0627 \u0631\u064E\u0623\u064E\u062A\u0652 \u0639\u064E\u064A\u0652\u0646\u0627\u0643\u064E \u0645\u0650\u0645\u0651\u0627 \u063A\u064E\u064A\u0651\u064E\u0631\u064E \u0642\u064E\u0644\u0652\u0628\u064E\u0643\u061F","\u0623\u064E\u064A\u0651\u064F \u0643\u064E\u0644\u0650\u0645\u064E\u0629\u064D \u062A\u064E\u0648\u064E\u062F\u0651\u064F \u0627\u0633\u0652\u062A\u0650\u0631\u0652\u062C\u0627\u0639\u064E\u0647\u0627\u061F","\u0623\u064E\u064A\u0652\u0646\u064E \u0642\u0627\u062F\u064E\u062A\u0652\u0643\u064E \u0642\u064E\u062F\u064E\u0645\u0627\u0643\u064E \u0645\u064F\u0646\u0652\u0630\u064F \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u061F","\u0645\u0627\u0630\u0627 \u064A\u064F\u062E\u0652\u0641\u0650\u064A \u0647\u0630\u0627 \u0627\u0644\u0648\u064E\u062C\u0652\u0647\u064F \u0639\u064E\u0646\u0650 \u0627\u0644\u0646\u0651\u0627\u0633\u061F","\u0642\u064E\u0644\u0652\u0628\u064F\u0643\u064E \u064A\u064E\u0646\u0652\u0628\u0650\u0636\u064F \u062F\u064F\u0648\u0646\u064E \u0625\u0650\u0630\u0652\u0646\u0650\u0643 \u2014 \u0645\u064E\u062A\u064E\u0649 \u0634\u064E\u0643\u064E\u0631\u0652\u062A\u064E\u0647\u061F","\u0646\u064E\u0641\u064E\u0633\u064F\u0643\u064E \u0644\u064E\u064A\u0652\u0633\u064E \u0645\u0650\u0644\u0652\u0643\u064E\u0643 \u2014 \u0644\u0650\u0645\u064E\u0646\u0652 \u0643\u064E\u0631\u0651\u064E\u0633\u0652\u062A\u064E\u0647\u061F","\u0647\u0630\u0627 \u0627\u0644\u062C\u064E\u0633\u064E\u062F \u2014 \u0647\u064E\u0644\u0652 \u062A\u064E\u0631\u0652\u0639\u0627\u0647\u064F \u0643\u064E\u0623\u064E\u0645\u0627\u0646\u064E\u0629\u061F"],
    AUTRE: ["\u0647\u0644 \u062F\u064E\u0639\u064E\u0648\u0652\u062A\u064E \u0644\u0647 \u0648\u0644\u064E\u0648\u0652 \u0644\u0650\u062B\u0627\u0646\u0650\u064A\u064E\u0629\u061F","\u0645\u0627\u0630\u0627 \u062A\u064E\u0631\u064E\u0649 \u0644\u064E\u0648\u0652 \u0623\u064E\u0631\u0627\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0642\u064E\u0644\u0652\u0628\u064E\u0647\u061F","\u0645\u0627\u0630\u0627 \u0641\u064E\u0639\u064E\u0644\u064E \u0648\u0644\u064E\u0645\u0652 \u064A\u064E\u0646\u0652\u062A\u064E\u0628\u0650\u0647\u0652 \u0623\u064E\u062D\u064E\u062F\u061F","\u0644\u064E\u0648\u0652 \u0633\u064E\u0623\u064E\u0644\u064E\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647: \u0645\u0627\u0630\u0627 \u0641\u064E\u0639\u064E\u0644\u0652\u062A\u064E \u0644\u064E\u0647\u064F\u061F","\u0647\u064E\u0644\u0652 \u064A\u064E\u0639\u0652\u0631\u0650\u0641\u064F\u0643\u064E \u062D\u064E\u0642\u0651\u064B\u0627 \u0623\u064E\u0645\u0652 \u0642\u0650\u0646\u0627\u0639\u064E\u0643\u061F","\u0645\u064E\u0646\u0652 \u064A\u064F\u0634\u0652\u0628\u0650\u0647\u064F \u0648\u064E\u062D\u0652\u062F\u064E\u0647 \u0644\u064E\u064A\u0652\u0644\u064B\u0627\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0646\u0652\u062A\u064E\u0638\u0650\u0631\u064F \u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u0652 \u064A\u064E\u062C\u0652\u0631\u064F\u0624\u064E\u061F","\u0643\u064E\u0645\u0652 \u0647\u064E\u0645\u0651\u064B\u0627 \u064A\u064E\u062D\u0652\u0645\u0650\u0644\u064F \u0648\u0623\u064E\u0646\u0652\u062A\u064E \u0644\u0627 \u062A\u064E\u062F\u0652\u0631\u0650\u064A\u061F","\u0644\u064E\u0648\u0652 \u0643\u0627\u0646\u064E\u062A\u0650 \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631\u064E\u0629\u060C \u0645\u0627\u0630\u0627 \u062A\u064E\u0642\u064F\u0648\u0644\u061F","\u0647\u064E\u0644\u0652 \u0631\u064E\u0622\u0643\u064E \u062A\u064E\u062F\u0652\u0639\u064F\u0648 \u0644\u064E\u0647\u064F\u061F","\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064E\u062C\u0652\u0639\u064E\u0644\u064F\u0647\u064F \u0639\u064E\u0632\u0650\u064A\u0632\u064B\u0627 \u0639\u0650\u0646\u0652\u062F\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u061F","\u064A\u064E\u0648\u0652\u0645\u064B\u0627 \u0633\u064E\u062A\u064E\u0643\u064F\u0648\u0646\u0627\u0646\u0650 \u062A\u064F\u0631\u0627\u0628\u064B\u0627 \u2014 \u0645\u0627\u0630\u0627 \u064A\u064E\u0628\u0652\u0642\u064E\u0649\u061F"],
    OBJET: ["\u0643\u064E\u0645\u0652 \u0643\u064E\u0644\u0651\u064E\u0641\u064E\u0643 \u2014 \u0648\u0643\u064E\u0645\u0652 \u0623\u064E\u0639\u0652\u0637\u0627\u0643\u061F","\u0628\u0650\u062F\u064F\u0648\u0646\u0650\u0647\u060C \u0647\u064E\u0644\u0652 \u062A\u064E\u0643\u064F\u0648\u0646\u064F \u0623\u064E\u0642\u064E\u0644\u0651\u064E\u061F","\u0645\u064E\u0646\u0652 \u0635\u064E\u0646\u064E\u0639\u064E\u0647\u060C \u0648\u0628\u0650\u0623\u064E\u064A\u0651\u0650 \u0623\u064E\u062C\u0652\u0631\u061F","\u0633\u064E\u064A\u064E\u0635\u0650\u064A\u0631\u064F \u062A\u064F\u0631\u0627\u0628\u064B\u0627 \u2014 \u0648\u0623\u064E\u0646\u0652\u062A\u064E\u061F","\u0643\u064E\u0645\u0652 \u0627\u0633\u0652\u062A\u064E\u062E\u0652\u062F\u064E\u0645\u0652\u062A\u064E\u0647\u064F \u062F\u064F\u0648\u0646\u064E \u062A\u064E\u0641\u064E\u0643\u0651\u064F\u0631\u061F","\u0648\u064E\u0633\u0650\u064A\u0644\u064E\u0629\u064C \u0623\u064E\u0645\u0652 \u063A\u0627\u064A\u064E\u0629\u061F","\u0644\u064E\u0648\u0652 \u0623\u064E\u0639\u0652\u0637\u064E\u064A\u0652\u062A\u064E\u0647\u064F \u063A\u064E\u062F\u064B\u0627\u060C \u0647\u064E\u0644\u0652 \u062A\u064E\u062A\u0652\u0631\u064F\u0643\u064F\u0647\u064F \u0628\u0650\u0633\u064F\u0647\u064F\u0648\u0644\u064E\u0629\u061F","\u064A\u064E\u062E\u0652\u062F\u0650\u0645\u064F \u0645\u064E\u0627 \u0623\u064E\u0646\u0652\u062A\u064E\u060C \u0623\u064E\u0645\u0652 \u064A\u064F\u0644\u0652\u0647\u0650\u064A\u0643\u064E\u061F","\u0623\u064E\u0628\u0627\u062D\u064E\u0647\u064F \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0643 \u2014 \u0647\u064E\u0644\u0652 \u0634\u064E\u0643\u064E\u0631\u0652\u062A\u064E\u0647\u061F","\u0643\u0627\u0646\u064E \u062D\u064F\u0644\u0652\u0645\u064B\u0627 \u2014 \u0647\u064E\u0644\u0652 \u062A\u064E\u0630\u0652\u0643\u064F\u0631\u061F","\u0643\u064E\u0645\u0652 \u0634\u064E\u062E\u0652\u0635\u064B\u0627 \u0633\u0627\u0647\u064E\u0645\u064E \u0644\u0650\u064A\u064E\u0635\u0650\u0644\u064E \u0625\u0650\u0644\u064E\u064A\u0652\u0643\u061F","\u064A\u064F\u0642\u064E\u0631\u0651\u0650\u0628\u064F\u0643\u064E \u0623\u064E\u0645\u0652 \u064A\u064F\u0628\u0652\u0639\u0650\u062F\u064F\u0643\u061F"],
    MONDE: ["\u0643\u064E\u0645\u0652 \u0646\u064E\u0638\u064E\u0631\u0652\u062A\u064E \u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u0631\u064E\u0649\u061F","\u0645\u0627\u0630\u0627 \u0643\u0627\u0646\u064E \u0642\u064E\u0628\u0652\u0644\u064E\u0643\u060C \u0648\u0645\u0627\u0630\u0627 \u064A\u064E\u0628\u0652\u0642\u064E\u0649\u061F","\u0647\u064E\u0644\u0652 \u062E\u064E\u0644\u064E\u0642\u064E\u0647\u064F \u0644\u064E\u0643\u064E \u0623\u064E\u0645\u0652 \u0644\u0650\u0644\u0652\u062C\u064E\u0645\u0650\u064A\u0639\u061F","\u0644\u064E\u0648\u0652 \u0634\u064E\u0647\u0650\u062F\u064E \u0639\u064E\u0644\u064E\u064A\u0652\u0643\u060C \u0645\u0627\u0630\u0627 \u064A\u064E\u0642\u064F\u0648\u0644\u061F","\u0645\u0627 \u0627\u0644\u0652\u0645\u064E\u062E\u0652\u0641\u0650\u064A\u0651\u064F \u0641\u0650\u064A\u0645\u0627 \u062A\u064E\u0631\u064E\u0649\u061F","\u0647\u0630\u0650\u0647\u0650 \u0622\u064A\u064E\u0629\u064C \u2014 \u0645\u0627 \u0647\u0650\u064A\u064E\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0644\u0650\u0644\u0652\u062E\u064E\u0644\u0652\u0642\u0650 \u0628\u0650\u0644\u0627 \u0623\u064E\u062C\u0652\u0631\u061F","\u0644\u064E\u0648\u0652 \u0644\u064E\u0645\u0652 \u062A\u064E\u0639\u064F\u062F\u0652\u060C \u0645\u0627\u0630\u0627 \u0641\u0627\u062A\u064E\u0643\u061F","\u0639\u064E\u0645\u0651\u064E \u064A\u064F\u062D\u064E\u062F\u0651\u0650\u062B\u064F\u0643\u064E \u0635\u064E\u0645\u0652\u062A\u064F \u0647\u0630\u0627 \u0627\u0644\u0645\u064E\u0643\u0627\u0646\u061F","\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u064A\u064E\u0631\u064E\u0649 \u0645\u0627 \u062A\u064E\u0631\u064E\u0649 \u2014 \u0628\u0650\u0645\u064E \u064A\u064F\u0641\u064E\u0643\u0651\u0650\u0631\u061F","\u0641\u0650\u064A \u0643\u064E\u0645\u0652 \u062E\u064F\u0644\u0650\u0642\u064E \u0645\u0627 \u062A\u064E\u0631\u0627\u0647\u061F","\u0645\u0627\u0630\u0627 \u064A\u064F\u0639\u064E\u0644\u0651\u0650\u0645\u064F\u0643\u064E \u0647\u0630\u0627\u061F"],
    ENFANT: ["\u0645\u0627\u0630\u0627 \u064A\u064E\u0639\u0652\u0631\u0650\u0641\u064F \u0648\u0646\u064E\u0633\u0650\u064A\u0646\u0627\u0647\u064F\u061F","\u0647\u064F\u0648\u064E \u0623\u064E\u0645\u0627\u0646\u064E\u0629 \u2014 \u0639\u064E\u0645\u0651\u064E \u062A\u064F\u062C\u0650\u064A\u0628\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0631\u064E\u0649 \u0641\u0650\u064A\u0643\u064E\u061F","\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064F\u0636\u0652\u062D\u0650\u0643\u064F\u0647\u061F","\u0647\u064E\u0644\u0652 \u064A\u064E\u062F\u0652\u0639\u064F\u0648 \u0628\u0650\u0628\u064E\u0633\u0627\u0637\u064E\u0629\u061F","\u0645\u0627\u0630\u0627 \u062A\u064F\u0639\u064E\u0644\u0651\u0650\u0645\u064F\u0647\u064F \u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u062F\u0652\u0631\u0650\u064A\u061F","\u0645\u064E\u0646\u0652 \u0633\u064E\u064A\u064E\u0643\u064F\u0648\u0646\u064F \u0628\u064E\u0639\u0652\u062F\u064E \u0639\u0650\u0634\u0652\u0631\u0650\u064A\u0646\u064E \u0639\u0627\u0645\u064B\u0627\u061F","\u0645\u0627 \u0627\u0644\u062F\u0651\u064F\u0639\u0627\u0621\u064F \u0627\u0644\u0642\u0627\u062F\u0650\u0645\u064F\u061F","\u0645\u0650\u0645\u0651\u064E \u062A\u064E\u062E\u0627\u0641\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u061F","\u0644\u064E\u0648\u0652 \u0631\u064E\u0622\u0643\u064E \u062A\u064F\u0635\u064E\u0644\u0651\u0650\u064A\u061F","\u0647\u064E\u0644\u0652 \u0639\u064E\u0644\u0651\u064E\u0645\u064E\u0643\u064E \u0645\u0627 \u0644\u064E\u0645\u0652 \u064A\u064F\u0639\u064E\u0644\u0651\u0650\u0645\u0652\u0643\u064E \u0627\u0644\u0643\u0650\u0628\u0627\u0631\u061F","\u0645\u064E\u0646\u0652 \u064A\u064F\u062D\u064E\u062F\u0651\u0650\u062B\u064F\u0647\u064F \u0639\u064E\u0646\u0650 \u0627\u0644\u0644\u0651\u064E\u0647 \u0625\u0650\u0646\u0652 \u063A\u0650\u0628\u0652\u062A\u064E\u061F"],
    SACRE: ["\u0645\u064E\u062A\u064E\u0649 \u0641\u064E\u062A\u064E\u062D\u0652\u062A\u064E\u0647 \u062D\u064E\u0642\u0651\u064B\u0627\u061F","\u0647\u064E\u0644\u0652 \u064A\u064E\u0646\u0652\u0638\u064F\u0631\u064F \u0625\u0650\u0644\u064E\u064A\u0652\u0643\u064E\u061F","\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064E\u0641\u0652\u0635\u0650\u0644\u064F\u0643\u064E \u0639\u064E\u0646\u0652\u0647\u061F","\u0644\u064E\u0648\u0652 \u062A\u064E\u0643\u064E\u0644\u0651\u064E\u0645\u060C \u0639\u0650\u062A\u0627\u0628\u064C \u0623\u064E\u0645\u0652 \u062F\u064E\u0639\u0652\u0648\u064E\u0629\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0646\u0652\u0642\u064F\u0635\u064F\u0643\u064E\u061F","\u0647\u064E\u0644\u0652 \u0628\u064E\u0643\u064E\u064A\u0652\u062A\u064E \u0623\u064E\u0645\u0627\u0645\u064E\u0647\u061F","\u064A\u064E\u0646\u0652\u062A\u064E\u0638\u0650\u0631\u064F \u0645\u0650\u0646\u0652\u0643\u064E\u060C \u0623\u064E\u0645\u0652 \u0623\u064E\u0646\u0652\u062A\u064E\u061F","\u0645\u0627 \u0622\u062E\u0650\u0631\u064F \u0645\u0627 \u0642\u064F\u0644\u0652\u062A\u064E \u0641\u0650\u064A \u062D\u064E\u0636\u0652\u0631\u064E\u062A\u0650\u0647\u061F","\u0644\u064E\u0648\u0652 \u0648\u064E\u0642\u064E\u0641\u0652\u062A\u064E \u0623\u064E\u0645\u0627\u0645\u064E \u0627\u0644\u0644\u0651\u064E\u0647 \u0628\u0650\u0647\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0635\u0652\u0646\u064E\u0639\u064F \u0628\u0650\u0643\u064E \u0641\u0650\u064A \u0627\u0644\u0645\u064E\u0631\u0651\u064E\u0629\u0650 \u0627\u0644\u0642\u0627\u062F\u0650\u0645\u064E\u0629\u061F","\u0644\u0650\u0645\u064E\u0646\u0652 \u0643\u0627\u0646\u064E \u0648\u0644\u0650\u0645\u064E\u0646\u0652 \u0628\u064E\u0639\u0652\u062F\u064E\u0643\u061F","\u0644\u064E\u0648\u0652 \u062F\u064E\u0639\u0627\u0643\u064E \u0644\u0650\u0633\u0627\u0639\u064E\u0629\u060C \u0647\u064E\u0644\u0652 \u062A\u064E\u0630\u0652\u0647\u064E\u0628\u061F"],
    INDETERMINE: ["\u0645\u0627\u0630\u0627 \u064A\u064E\u0631\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0648\u0644\u064E\u0645\u0652 \u062A\u064E\u0646\u0652\u062A\u064E\u0628\u0650\u0647\u061F","\u0644\u064E\u0648\u0652 \u0648\u064F\u0632\u0650\u0646\u064E\u062A\u0652\u060C \u0643\u064E\u0645\u0652 \u062A\u064E\u0632\u0650\u0646\u061F","\u0645\u0627\u0630\u0627 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u062D\u064E\u0642\u0651\u064B\u0627\u061F","\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0645\u064E\u0639\u064E\u0643\u064E \u0627\u0644\u0622\u0646 \u2014 \u0645\u0627\u0630\u0627 \u064A\u064F\u063A\u064E\u064A\u0651\u0650\u0631\u061F","\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u0648\u0652\u0635\u064E\u0644\u064E\u0643\u064E \u0647\u064F\u0646\u0627\u061F","\u0623\u064E\u064A\u0651\u064F \u062F\u064F\u0639\u0627\u0621\u064D \u0641\u0650\u064A \u062B\u064E\u0644\u0627\u062B\u0650 \u062B\u064E\u0648\u0627\u0646\u061F","\u0645\u0627\u0630\u0627 \u0644\u064E\u0645\u0652 \u062A\u064E\u0642\u064F\u0644\u0652\u0647\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u061F","\u0644\u064E\u0648\u0652 \u0648\u064E\u0635\u064E\u0641\u0652\u062A\u064E \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u062F\u0651\u064E\u0642\u0650\u064A\u0642\u064E\u0629\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0646\u0627\u0645\u064F \u0641\u0650\u064A\u0643\u064E\u061F","\u0643\u064E\u0645\u0652 \u062A\u064E\u0628\u0652\u0639\u064F\u062F\u064F \u0639\u064E\u0646\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u061F","\u0645\u0627\u0630\u0627 \u064A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0645\u064F\u0633\u0652\u0644\u0650\u0645\u064C \u0635\u0627\u0644\u0650\u062D\u064C \u0645\u064E\u0643\u0627\u0646\u064E\u0643\u061F","\u0645\u064E\u062A\u064E\u0649 \u0634\u064E\u0639\u064E\u0631\u0652\u062A\u064E \u0628\u0650\u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u062D\u064E\u0642\u0651\u064B\u0627\u061F"]
  },
  // AR — Niyyah
  niyyah_ar: {
    SOI: ["\u0623\u064F\u0633\u064E\u0644\u0651\u0650\u0645\u064F \u0647\u0630\u0627 \u0627\u0644\u0648\u064E\u062C\u0652\u0647\u064E \u0644\u0650\u0645\u064E\u0646\u0652 \u0631\u064E\u0633\u064E\u0645\u064E\u0647.","\u0623\u064F\u0639\u0650\u064A\u062F\u064F \u0644\u0650\u064A\u064E\u062F\u064E\u064A\u0651\u064E \u0645\u0627 \u0646\u064E\u0633\u0650\u064A\u0627\u0647: \u0623\u064E\u0645\u0627\u0646\u064E\u0629.","\u0623\u064E\u0646\u0652\u0638\u064F\u0631\u064F \u0645\u064F\u062A\u064E\u0630\u064E\u0643\u0651\u0650\u0631\u064B\u0627 \u0623\u064E\u0646\u0651\u064E\u0647\u064F \u064A\u064E\u0631\u0627\u0646\u0650\u064A \u0623\u064E\u0641\u0652\u0636\u064E\u0644.","\u0623\u064F\u0645\u0652\u0633\u0650\u0643\u064F \u0644\u0650\u0633\u0627\u0646\u0650\u064A \u0643\u064E\u0645\u064E\u0646\u0652 \u064A\u064F\u0645\u0652\u0633\u0650\u0643\u064F \u0646\u0627\u0631\u064B\u0627.","\u0623\u064E\u062F\u064E\u0639\u064F \u0646\u064E\u0641\u064E\u0633\u0650\u064A \u064A\u064E\u0644\u0652\u062A\u064E\u062D\u0650\u0642\u064F \u0628\u0650\u0627\u0644\u0630\u0651\u0650\u0643\u0652\u0631.","\u0623\u064E\u0645\u0652\u0634\u0650\u064A \u0643\u064E\u0623\u064E\u0646\u0651\u064E \u0642\u064E\u062F\u064E\u0645\u064E\u064A\u0651\u064E \u062A\u064E\u0639\u0652\u0631\u0650\u0641\u0627\u0646\u0650 \u0623\u064E\u064A\u0652\u0646\u064E \u064A\u064E\u0646\u0652\u062A\u064E\u0638\u0650\u0631\u064F\u0646\u0650\u064A.","\u0623\u064E\u062E\u0652\u062A\u0627\u0631\u064F \u0623\u064E\u0644\u0651\u0627 \u0623\u064E\u0643\u0652\u0630\u0650\u0628.","\u0623\u064E\u0639\u0652\u062A\u064E\u0646\u0650\u064A \u0628\u0650\u062C\u064E\u0633\u064E\u062F\u0650\u064A \u0643\u064E\u0636\u064E\u064A\u0652\u0641\u064D \u0633\u064E\u064A\u064E\u0631\u0652\u062D\u064E\u0644.","\u0623\u064F\u0642\u064E\u062F\u0651\u0650\u0645\u064F \u0646\u064E\u0641\u0652\u0633\u0650\u064A \u0644\u0650\u064A\u064E\u0648\u0652\u0645\u0650\u064A.","\u0623\u064E\u0639\u064F\u0648\u062F\u064F \u0625\u0650\u0644\u064E\u064A\u0652\u0643\u064E \u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652 \u064A\u064F\u0634\u064E\u062A\u0651\u0650\u062A\u064E\u0646\u0650\u064A \u0627\u0644\u0639\u0627\u0644\u064E\u0645.","\u0623\u064E\u0643\u064F\u0641\u0651\u064F \u0639\u064E\u0646\u0652 \u0645\u064F\u0646\u0627\u0641\u064E\u0633\u064E\u0629\u0650 \u0645\u064E\u0646\u0652 \u0643\u064F\u0646\u0652\u062A\u064F.","\u0623\u064E\u062D\u0652\u0645\u0650\u0644\u064F \u0627\u0633\u0652\u0645\u0650\u064A \u0643\u064E\u0645\u0627 \u0646\u064E\u0637\u064E\u0642\u0652\u062A\u064E\u0647\u064F \u0623\u064E\u0648\u0651\u064E\u0644\u064E \u0645\u064E\u0631\u0651\u064E\u0629."],
    AUTRE: ["\u0623\u064E\u0631\u064E\u0649 \u0647\u0630\u0627 \u0627\u0644\u0634\u0651\u064E\u062E\u0652\u0635\u064E \u0628\u0650\u0646\u064E\u0638\u064E\u0631\u0650 \u0627\u0644\u0644\u0651\u064E\u0647.","\u0623\u064E\u0636\u064E\u0639\u064F \u0623\u064E\u062D\u0652\u0643\u0627\u0645\u0650\u064A \u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652 \u0623\u064F\u0643\u064E\u0644\u0651\u0650\u0645\u064E\u0647.","\u0623\u064E\u062A\u064E\u0645\u064E\u0646\u0651\u064E\u0649 \u0644\u064E\u0647\u064F \u0645\u0627 \u0623\u064E\u062A\u064E\u0645\u064E\u0646\u0651\u064E\u0627\u0647\u064F \u0644\u0650\u0646\u064E\u0641\u0652\u0633\u0650\u064A.","\u0623\u064E\u062F\u0652\u0639\u064F\u0648 \u0644\u064E\u0647\u064F \u0642\u064E\u0628\u0652\u0644\u064E \u0623\u064E\u0646\u0652 \u0623\u064F\u0643\u064E\u0644\u0651\u0650\u0645\u064E\u0647.","\u0623\u064E\u0639\u0652\u062A\u064E\u0631\u0650\u0641\u064F \u0641\u0650\u064A\u0647\u0650 \u0628\u0650\u0645\u0627 \u0644\u064E\u0645\u0652 \u0623\u064E\u0631\u064E\u0647.","\u0623\u064F\u0635\u0652\u063A\u0650\u064A \u0643\u064E\u0623\u064E\u0646\u0651\u064E\u0647\u0627 \u0627\u0644\u0645\u064E\u0631\u0651\u064E\u0629\u064F \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631\u064E\u0629.","\u0623\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0644\u064E\u0647\u064F \u0645\u064F\u0633\u0652\u0628\u064E\u0642\u064B\u0627.","\u0623\u064E\u0628\u0652\u062D\u064E\u062B\u064F \u0639\u064E\u0646\u0652 \u062E\u064E\u064A\u0652\u0631\u0650\u0647\u0650 \u0642\u064E\u0628\u0652\u0644\u064E \u062E\u064E\u064A\u0652\u0631\u0650\u064A.","\u0623\u064E\u062A\u064E\u0646\u064E\u062D\u0651\u064E\u0649 \u0644\u0650\u064A\u064E\u0643\u064F\u0648\u0646\u064E \u062D\u0627\u0636\u0650\u0631\u064B\u0627.","\u0623\u064F\u0633\u064E\u0644\u0651\u0650\u0645\u064F\u0647\u064F \u0644\u064E\u0643\u064E \u0642\u064E\u0628\u0652\u0644\u064E \u062A\u064E\u0648\u064E\u0642\u0651\u064F\u0639\u0627\u062A\u0650\u064A.","\u0623\u064E\u0631\u0652\u0641\u064F\u0636\u064F \u0623\u064E\u0646\u0652 \u064A\u064E\u062A\u064E\u0643\u064E\u0644\u0651\u064E\u0645\u064E \u0623\u064E\u0646\u0627\u0646\u0650\u064A\u0651\u064E\u062A\u0650\u064A \u0628\u0650\u0627\u0633\u0652\u0645\u0650\u0647.","\u0623\u064E\u062D\u0652\u0645\u0650\u0644\u064F \u0623\u064E\u062F\u064E\u0628\u064E\u0647\u064F \u0643\u064E\u0645\u0627 \u064A\u064E\u062D\u0652\u0645\u0650\u0644\u064F \u0623\u064E\u062F\u064E\u0628\u0650\u064A."],
    OBJET: ["\u0623\u064E\u0644\u0652\u0645\u064E\u0633\u064F\u0647\u064F \u0634\u0627\u0643\u0650\u0631\u064B\u0627 \u0644\u0650\u0645\u064E\u0646\u0652 \u0623\u064E\u0628\u0627\u062D\u064E\u0647.","\u0623\u064E\u0631\u0652\u0641\u064F\u0636\u064F \u0623\u064E\u0646\u0652 \u064A\u064E\u0643\u064F\u0648\u0646\u064E \u0623\u064E\u0643\u0652\u0628\u064E\u0631\u064E \u0645\u0650\u0646\u0652 \u0642\u064E\u0644\u0652\u0628\u0650\u064A.","\u0623\u064E\u0633\u0652\u062A\u064E\u062E\u0652\u062F\u0650\u0645\u064F\u0647\u064F \u0641\u0650\u064A\u0645\u0627 \u0641\u064E\u062A\u064E\u062D\u064E\u0647\u064F \u0644\u0650\u064A.","\u0623\u064F\u0628\u0627\u0631\u0650\u0643\u064F \u0627\u0644\u064A\u064E\u062F\u064E \u0627\u0644\u0651\u064E\u062A\u0650\u064A \u0635\u064E\u0646\u064E\u0639\u064E\u062A\u0652\u0647.","\u0623\u064E\u062A\u0652\u0631\u064F\u0643\u064F\u0647\u064F \u0645\u064F\u0633\u0652\u0628\u064E\u0642\u064B\u0627.","\u0623\u064E\u0633\u0652\u062A\u064E\u062E\u0652\u062F\u0650\u0645\u064F\u0647\u064F \u0623\u064E\u062F\u0627\u0629\u064B \u0644\u0627 \u0633\u064E\u064A\u0651\u0650\u062F\u064B\u0627.","\u0623\u064E\u0634\u0652\u0643\u064F\u0631\u064F \u0639\u064E\u0644\u064E\u0649 \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u0646\u0651\u0650\u0639\u0652\u0645\u064E\u0629.","\u0623\u064E\u062A\u064E\u0630\u064E\u0643\u0651\u064E\u0631\u064F \u0623\u064E\u0646\u0651\u064E\u0647\u064F \u0643\u0627\u0646\u064E \u062A\u064F\u0631\u0627\u0628\u064B\u0627 \u0648\u0633\u064E\u064A\u064E\u0639\u064F\u0648\u062F.","\u0623\u064E\u0633\u0652\u062A\u064E\u062E\u0652\u062F\u0650\u0645\u064F\u0647\u064F \u0645\u064F\u062A\u064E\u0641\u064E\u0643\u0651\u0650\u0631\u064B\u0627 \u0641\u0650\u064A\u0645\u064E\u0646\u0652 \u0644\u0627 \u064A\u064E\u0645\u0652\u0644\u0650\u0643\u064F\u0647.","\u0623\u064F\u0643\u064E\u0631\u0651\u0650\u0633\u064F\u0647\u064F \u0644\u0650\u0645\u0627 \u064A\u064E\u0646\u0652\u0641\u064E\u0639.","\u0623\u064F\u062D\u064E\u0631\u0651\u0650\u0631\u064F \u0642\u064E\u0644\u0652\u0628\u0650\u064A \u0645\u0650\u0646\u0652 \u0627\u0645\u0652\u062A\u0650\u0644\u0627\u0643\u0650 \u0645\u0627 \u064A\u064E\u0645\u0652\u0644\u0650\u0643\u064F\u0646\u0650\u064A.","\u0623\u064E\u062A\u064E\u0644\u064E\u0642\u0651\u064E\u0627\u0647\u064F \u0645\u0650\u0646\u0652 \u064A\u064E\u062F\u0650\u0643\u064E."],
    MONDE: ["\u0623\u064E\u0646\u0652\u0638\u064F\u0631\u064F \u0643\u064E\u0622\u064A\u064E\u0629\u064D \u0644\u0650\u064A \u0648\u064E\u062D\u0652\u062F\u0650\u064A.","\u0623\u064E\u0642\u0650\u0641\u064F \u0623\u064E\u0645\u0627\u0645\u064E \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u0622\u064A\u064E\u0629.","\u0623\u064E\u0634\u0652\u0643\u064F\u0631\u064F \u0639\u064E\u0644\u064E\u0649 \u0645\u064E\u0634\u0652\u0647\u064E\u062F\u064D \u0644\u064E\u0645\u0652 \u0623\u064E\u0633\u0652\u062A\u064E\u062D\u0650\u0642\u0651\u064E\u0647.","\u0622\u062E\u064F\u0630\u064F \u0645\u064E\u0643\u0627\u0646\u0650\u064A \u0628\u0650\u062A\u064E\u0648\u0627\u0636\u064F\u0639.","\u0623\u064E\u062F\u064E\u0639\u064F \u0627\u0644\u0635\u0651\u064E\u0645\u0652\u062A\u064E \u064A\u064F\u062D\u064E\u062F\u0651\u0650\u062B\u064F\u0646\u0650\u064A \u0639\u064E\u0646\u0652\u0647.","\u0623\u064E\u062A\u064E\u0630\u064E\u0643\u0651\u064E\u0631\u064F \u0623\u064E\u0646\u0651\u0650\u064A \u0633\u064E\u0623\u064E\u0628\u0652\u0642\u064E\u0649 \u0623\u064E\u0642\u064E\u0644\u0651\u064E \u0645\u0650\u0646\u0652 \u0647\u0630\u0627 \u0627\u0644\u062D\u064E\u062C\u064E\u0631.","\u0623\u064E\u0633\u0652\u062A\u064E\u0642\u0652\u0628\u0650\u0644\u064F \u0643\u064E\u0636\u064E\u064A\u0652\u0641.","\u0623\u064E\u0646\u0652\u062D\u064E\u0646\u0650\u064A \u0628\u0627\u0637\u0650\u0646\u064B\u0627 \u0623\u064E\u0645\u0627\u0645\u064E \u0645\u0627 \u0644\u0627 \u062A\u064E\u0641\u0652\u0647\u064E\u0645\u064F\u0647\u064F \u0639\u064E\u064A\u0652\u0646\u0627\u064A.","\u0623\u064E\u0631\u064E\u0649 \u064A\u064E\u062F\u064E \u0627\u0644\u062E\u0627\u0644\u0650\u0642\u0650 \u062E\u064E\u0644\u0652\u0641\u064E \u0627\u0644\u0638\u0651\u0627\u0647\u0650\u0631.","\u0623\u064F\u0633\u064E\u0644\u0651\u0650\u0645\u064F \u064A\u064E\u0648\u0652\u0645\u0650\u064A \u0644\u0650\u0645\u064E\u0646\u0652 \u064A\u064E\u062D\u0652\u0645\u0650\u0644\u064F \u0627\u0644\u0633\u0651\u064E\u0645\u0627\u0621.","\u0623\u064E\u0639\u0652\u0628\u064F\u0631\u064F \u062A\u0627\u0631\u0650\u0643\u064B\u0627 \u0623\u064E\u0642\u064E\u0644\u0651\u064E \u0645\u0650\u0645\u0651\u0627 \u064A\u064F\u0639\u0652\u0637\u0650\u064A\u0646\u0650\u064A.","\u0623\u064E\u062A\u064E\u0644\u064E\u0642\u0651\u064E\u0649 \u0647\u0630\u0627 \u0627\u0644\u0646\u0651\u064F\u0648\u0631\u064E \u0643\u064E\u0645\u0627 \u062C\u0627\u0621."],
    ENFANT: ["\u0623\u064F\u0633\u064E\u0644\u0651\u0650\u0645\u064F \u0647\u0630\u0627 \u0627\u0644\u0637\u0651\u0650\u0641\u0652\u0644\u064E \u0644\u064E\u0643\u064E.","\u0623\u064E\u062D\u0652\u0645\u0650\u0644\u064F \u0637\u064E\u0647\u0627\u0631\u064E\u062A\u064E\u0647\u064F \u0644\u0650\u0623\u064E\u0633\u0652\u062A\u064E\u0639\u0650\u064A\u062F\u064E \u0637\u064E\u0647\u0627\u0631\u064E\u062A\u0650\u064A.","\u0623\u064F\u0639\u064E\u0644\u0651\u0650\u0645\u064F\u0647\u064F \u0628\u0650\u0645\u0627 \u0623\u064E\u0643\u064F\u0648\u0646.","\u0623\u064E\u062D\u0652\u0641\u064E\u0638\u064F \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u0623\u064E\u0645\u0627\u0646\u064E\u0629.","\u0623\u064E\u062F\u0652\u0639\u064F\u0648 \u0623\u064E\u0646\u0652 \u064A\u064E\u0639\u0652\u0631\u0650\u0641\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u062F\u0651\u064F\u0646\u0652\u064A\u0627.","\u0623\u064E\u062D\u0652\u0645\u0650\u064A \u0628\u064E\u0635\u064E\u0631\u064E\u0647.","\u0623\u064F\u0628\u0652\u0637\u0650\u0626\u064F \u062E\u064F\u0637\u0627\u064A\u064E \u0644\u0650\u064A\u064E\u0644\u0652\u062D\u064E\u0642\u064E\u0646\u0650\u064A.","\u0623\u064F\u0642\u064E\u062F\u0651\u0650\u0645\u064F \u062D\u064E\u0646\u0627\u0646\u064B\u0627 \u064A\u064F\u0634\u0652\u0628\u0650\u0647\u064F \u062D\u064E\u0646\u0627\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647.","\u0623\u064F\u062D\u0650\u0628\u0651\u064F\u0647\u064F \u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u0652 \u0623\u064E\u062C\u0652\u0639\u064E\u0644\u064E\u0647\u064F \u0627\u0645\u0652\u062A\u0650\u062F\u0627\u062F\u064B\u0627 \u0644\u0650\u064A.","\u0623\u064E\u0642\u0652\u0628\u064E\u0644\u064F \u0623\u064E\u0644\u0651\u0627 \u0623\u064E\u0639\u0652\u0631\u0650\u0641\u064E \u0645\u0627 \u0633\u064E\u064A\u064E\u0643\u064F\u0648\u0646\u060C \u0648\u0623\u064E\u062A\u0652\u0631\u064F\u0643.","\u0623\u064E\u0646\u0652\u062D\u064E\u0646\u0650\u064A \u0623\u064E\u0645\u0627\u0645\u064E \u0645\u0627 \u064A\u064E\u0639\u0652\u0631\u0650\u0641\u064F\u0647\u064F \u0648\u0646\u064E\u0633\u0650\u064A\u062A\u064F\u0647.","\u0623\u064E\u062A\u0652\u0631\u064F\u0643\u064F \u0625\u0650\u0631\u0652\u062B\u064B\u0627 \u062E\u064E\u0641\u0650\u064A\u0651\u064B\u0627."],
    SACRE: ["\u0623\u064E\u0642\u0652\u062A\u064E\u0631\u0650\u0628\u064F \u0643\u064E\u0645\u064E\u0646\u0652 \u064A\u064E\u0642\u0652\u062A\u064E\u0631\u0650\u0628\u064F \u0645\u0650\u0646\u0652 \u0645\u064E\u0644\u0650\u0643.","\u0623\u064E\u0636\u064E\u0639\u064F \u0647\u064F\u0645\u064F\u0648\u0645\u0650\u064A \u0642\u064E\u0628\u0652\u0644\u064E \u064A\u064E\u062F\u0650\u064A.","\u0623\u064E\u0639\u064F\u0648\u062F\u064F \u0628\u0650\u0645\u0627 \u0647\u064E\u062C\u064E\u0631\u0652\u062A\u064F \u0637\u064E\u0648\u0650\u064A\u0644\u064B\u0627.","\u0623\u064F\u0643\u064E\u0631\u0651\u0650\u0645\u064F \u0647\u0630\u0627 \u0627\u0644\u0631\u0651\u0627\u0628\u0650\u0637\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0628\u064E\u0631\u064E\u062F.","\u0623\u064E\u062C\u0652\u0644\u0650\u0633\u064F \u0643\u064E\u0623\u064E\u0646\u0651\u064E\u0647\u0627 \u0627\u0644\u0645\u064E\u0631\u0651\u064E\u0629\u064F \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631\u064E\u0629.","\u0623\u064E\u062F\u064E\u0639\u064F \u0627\u0644\u0643\u064E\u0644\u0650\u0645\u064E\u0629\u064E \u062A\u064E\u062E\u0652\u062A\u064E\u0631\u0650\u0642\u064F\u0646\u0650\u064A.","\u0623\u064E\u0635\u0652\u0645\u064F\u062A\u064F \u0623\u064E\u0645\u0627\u0645\u064E \u0645\u0627 \u0644\u064E\u0643\u064E \u0648\u064E\u062D\u0652\u062F\u064E\u0643.","\u0623\u064F\u0643\u064E\u0631\u0651\u0650\u0633\u064F \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u0644\u0651\u064E\u062D\u0652\u0638\u064E\u0629.","\u0623\u064F\u062C\u064E\u062F\u0651\u0650\u062F\u064F \u0646\u0650\u064A\u0651\u064E\u062A\u0650\u064A.","\u0623\u064E\u0642\u0650\u0641\u064F \u0628\u0650\u0644\u0627 \u0642\u0650\u0646\u0627\u0639.","\u0623\u064E\u0641\u0652\u062A\u064E\u062D\u064F\u0647\u064F \u0639\u0627\u0644\u0650\u0645\u064B\u0627 \u0623\u064E\u0646\u0651\u064E\u0647\u064F \u064A\u064E\u0641\u0652\u062A\u064E\u062D\u064F\u0646\u0650\u064A \u0623\u064E\u0643\u0652\u062B\u064E\u0631.","\u0623\u064E\u0633\u0652\u062A\u064E\u0623\u0652\u0646\u0650\u0641\u064F \u0647\u0630\u0627 \u0627\u0644\u0645\u064E\u0648\u0652\u0639\u0650\u062F."],
    INDETERMINE: ["\u0623\u064E\u0636\u064E\u0639\u064F \u062B\u0650\u0642\u064E\u062A\u0650\u064A \u0641\u0650\u064A\u0643\u064E.","\u0623\u064E\u062A\u064E\u0648\u0627\u0641\u064E\u0642\u064F \u0645\u064E\u0639\u064E \u0645\u0627 \u062A\u064F\u0631\u0650\u064A\u062F\u064F\u0647\u064F \u0645\u0650\u0646\u0651\u0650\u064A.","\u0623\u064E\u0634\u0652\u0643\u064F\u0631\u064F \u0639\u064E\u0644\u064E\u0649 \u0644\u064E\u062D\u0652\u0638\u064E\u0629\u064D \u0644\u064E\u0645\u0652 \u0623\u064E\u0633\u0652\u062A\u064E\u062D\u0650\u0642\u0651\u064E\u0647\u0627.","\u0623\u064E\u0639\u064F\u0648\u062F\u064F \u0628\u0650\u0647\u0630\u0627 \u0627\u0644\u0641\u0650\u0639\u0652\u0644\u0650 \u0627\u0644\u062E\u064E\u0641\u0650\u064A\u0651.","\u0623\u064F\u0643\u064E\u0631\u0651\u0650\u0633\u064F \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u062F\u0651\u064E\u0642\u0650\u064A\u0642\u064E\u0629\u064E \u0644\u0650\u0645\u0627 \u0633\u064E\u064A\u064E\u0628\u0652\u0642\u064E\u0649.","\u0623\u064E\u062F\u064E\u0639\u064F \u0645\u0627 \u064A\u064F\u0644\u0652\u0647\u0650\u064A\u0646\u0650\u064A \u0648\u0623\u064E\u0639\u064F\u0648\u062F.","\u0623\u064F\u0633\u064E\u0644\u0651\u0650\u0645\u064F \u0646\u064E\u0641\u0652\u0633\u0650\u064A \u0628\u064E\u064A\u0652\u0646\u064E \u064A\u064E\u062F\u064E\u064A\u0652\u0643.","\u0623\u064E\u062A\u064E\u0630\u064E\u0643\u0651\u064E\u0631\u064F \u0623\u064E\u0646\u0651\u064E\u0643\u064E \u062A\u064E\u0631\u0627\u0646\u0650\u064A.","\u0623\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0628\u0650\u0648\u064E\u0639\u0652\u064A\u0650 \u0623\u064E\u0646\u0651\u064E\u0647\u064F \u064A\u064E\u0631\u064E\u0649.","\u0623\u064E\u0636\u064E\u0639\u064F \u0642\u064E\u0644\u0652\u0628\u0650\u064A \u0647\u064F\u0646\u0627.","\u0623\u064E\u062E\u0652\u062A\u0627\u0631\u064F \u0633\u064E\u0644\u0627\u0645\u064E\u0643.","\u0623\u064E\u0639\u064F\u0648\u062F\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0630\u0651\u0650\u0643\u0652\u0631\u0650 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u0641\u0652\u0644\u064E\u062A\u0651\u064F\u0647."]
  }
};


// ============================================================================
// HELPERS — tirage aléatoire avec anti-répétition + i18n
// ============================================================================
// ============================================================================

function _getLibPool(mode, category) {
  var lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  var key = (lang !== 'fr') ? (mode + '_' + lang) : mode;
  var lib = NIYYAH_V2_LIBRARY[key] || NIYYAH_V2_LIBRARY[mode];
  var cat = (category && lib[category]) ? category : 'INDETERMINE';
  return lib[cat];
}

function pickRegardeQuestion(category) {
  var pool = _getLibPool('regarde', category);
  var recentKey = 'niyyah_regarde_recent';
  var recent = [];
  try { recent = JSON.parse(localStorage.getItem(recentKey) || '[]'); } catch (e) {}
  var available = pool.filter(function(q) { return !recent.includes(q); });
  var candidates = available.length > 0 ? available : pool;
  var picked = candidates[Math.floor(Math.random() * candidates.length)];
  recent.push(picked);
  if (recent.length > 5) recent = recent.slice(-5);
  try { localStorage.setItem(recentKey, JSON.stringify(recent)); } catch (e) {}
  return picked;
}

function pickNiyyahIntention(category) {
  var pool = _getLibPool('niyyah', category);
  var recentKey = 'niyyah_niyyah_recent';
  var recent = [];
  try { recent = JSON.parse(localStorage.getItem(recentKey) || '[]'); } catch (e) {}
  var available = pool.filter(function(i) { return !recent.includes(i); });
  var candidates = available.length > 0 ? available : pool;
  var picked = candidates[Math.floor(Math.random() * candidates.length)];
  recent.push(picked);
  if (recent.length > 5) recent = recent.slice(-5);
  try { localStorage.setItem(recentKey, JSON.stringify(recent)); } catch (e) {}
  return picked;
}


// ============================================================================
// FIN — Base locale Niyyah V2
// ============================================================================
