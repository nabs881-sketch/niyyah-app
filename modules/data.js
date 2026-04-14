// ═══════════════════════════════════════════════════
// NIYYAH DAILY — modules/data.js
// Données statiques : DEFIS_DB, BADGES, LEVELS, WIRD_DATA
// Aucune logique, aucun DOM — données pures
// ═══════════════════════════════════════════════════

// ── HELPER (utilisé par LEVELS) ──────────────────
function isFriday() { return new Date().getDay() === 5; }

const DEFIS_DB = [
  // ── NIVEAU 1 : FACILE ── ids 1-33
  {id:1,  niveau:1, diff:'facile', icon:'🌅', titre:'Prier Fajr à l\'heure — 5 jours',       cible:5, unite:'jours', type:'auto', itemId:'fajr', ref:'Celui qui prie Fajr est sous la protection d\'Allah.', hadith:'Muslim 657'},
  {id:2,  niveau:1, diff:'facile', icon:'🌅', titre:'Prier Fajr à l\'heure — 7 jours',       cible:7, unite:'jours', type:'auto', itemId:'fajr', ref:'Fajr : les anges de la nuit et du jour se réunissent.', hadith:'Bukhari 648'},
  {id:3,  niveau:1, diff:'facile', icon:'🕌', titre:'5 prières dans les temps — 3 jours',    cible:3, unite:'jours', type:'manual', ref:'La prière est le pilier de la religion.', hadith:'Bayhaqi'},
  {id:4,  niveau:1, diff:'facile', icon:'🕌', titre:'5 prières dans les temps — 5 jours',    cible:5, unite:'jours', type:'manual', ref:'"La prière est le pilier de la religion — qui la délaisse détruit sa religion."', hadith:'Bayhaqi'},
  {id:5,  niveau:1, diff:'facile', icon:'✨', titre:'Bismillah avant chaque acte — 5 jours', cible:5, unite:'jours', type:'manual', ref:'Commencer par Bismillah est une sunna dans chaque action.', hadith:'Abu Dawud 4840'},
  {id:6,  niveau:1, diff:'facile', icon:'🙏', titre:'Alhamdulillah après chaque repas — 5j', cible:5, unite:'jours', type:'manual', ref:'"Allah est satisfait de Son serviteur qui dit Alhamdulillah après avoir mangé."', hadith:'Muslim 2734'},
  {id:7,  niveau:1, diff:'facile', icon:'📿', titre:'Dhikr du matin — 5 jours de suite',     cible:5, unite:'jours', type:'auto', itemId:'wird_matin', ref:'Le dhikr du matin protège jusqu\'au soir.', hadith:'Abu Dawud 5088'},
  {id:8,  niveau:1, diff:'facile', icon:'🌙', titre:'Dhikr du soir — 5 jours de suite',      cible:5, unite:'jours', type:'auto', itemId:'wird_soir', ref:'Le dhikr du soir est une armure pour la nuit.', hadith:'Tirmidhi 3391'},
  {id:9,  niveau:1, diff:'facile', icon:'⭐', titre:'Dhikr matin ET soir — 3 jours',         cible:3, unite:'jours', type:'manual', ref:'Réunir les deux dhikrs est le signe d\'un cœur vigilant.', hadith:''},
  {id:10, niveau:1, diff:'facile', icon:'📖', titre:'Al-Fatiha méditée — 7 jours',            cible:7, unite:'jours', type:'manual', ref:'Al-Fatiha est la mère du Coran — méditez ses sens.', hadith:'Bukhari 5006'},
  {id:11, niveau:1, diff:'facile', icon:'📖', titre:'3 versets du Coran par jour — 5 jours', cible:5, unite:'jours', type:'manual', ref:'"Récitez le Coran — il sera un intercesseur le Jour du Jugement."', hadith:'Muslim 804'},
  {id:12, niveau:1, diff:'facile', icon:'🫀', titre:'Prier avec concentration — 3 jours',    cible:3, unite:'jours', type:'manual', ref:'Le khoushou\' est l\'âme de la prière.', hadith:''},
  {id:13, niveau:1, diff:'facile', icon:'📵', titre:'Pas de téléphone avant Fajr — 5 jours', cible:5, unite:'jours', type:'manual', ref:'Commencer la journée par Allah est la meilleure des habitudes.', hadith:''},
  {id:14, niveau:1, diff:'facile', icon:'💧', titre:'Ablutions lentes avec intention — 5j',  cible:5, unite:'jours', type:'manual', ref:'"Les péchés tombent avec chaque goutte d\'eau des ablutions."', hadith:'Muslim 244'},
  {id:15, niveau:1, diff:'facile', icon:'🌿', titre:'2 noms d\'Allah mémorisés par jour — 5j', cible:5, unite:'jours', type:'manual', ref:'Allah a 99 noms — celui qui les comprend entre au paradis.', hadith:'Bukhari 2736'},
  {id:16, niveau:1, diff:'facile', icon:'😊', titre:'Sourire à chaque personne — 3 jours',   cible:3, unite:'jours', type:'manual', ref:'"Ton sourire face à ton frère est une aumône."', hadith:'Tirmidhi 1956'},
  {id:17, niveau:1, diff:'facile', icon:'☮️', titre:'Dire le salam en premier — 5 jours',    cible:5, unite:'jours', type:'manual', ref:'"Vous n\'entrerez au paradis que lorsque vous vous aimerez — répandez le salam."', hadith:'Muslim 54'},
  {id:18, niveau:1, diff:'facile', icon:'🤲', titre:'1 douaa sincère par jour — 7 jours',    cible:7, unite:'jours', type:'manual', ref:'"La douaa est le culte lui-même."', hadith:'Tirmidhi 2969'},
  {id:19, niveau:1, diff:'facile', icon:'💝', titre:'1 acte de sadaqa — 5 jours',             cible:5, unite:'jours', type:'manual', ref:'"La sadaqa éteint le péché comme l\'eau éteint le feu."', hadith:'Tirmidhi 2616'},
  {id:20, niveau:1, diff:'facile', icon:'🔇', titre:'Éviter un mot inutile — 5 jours',        cible:5, unite:'jours', type:'manual', ref:'"Que celui qui croit en Allah garde le silence ou dise du bien."', hadith:'Bukhari 6136'},
  {id:21, niveau:1, diff:'facile', icon:'🌄', titre:'Se lever 10 min avant Fajr — 3 jours',  cible:3, unite:'jours', type:'manual', ref:'Les derniers instants de la nuit sont parmi les plus bénis.', hadith:''},
  {id:22, niveau:1, diff:'facile', icon:'📱', titre:'Pas de réseaux sociaux après Isha — 5j', cible:5, unite:'jours', type:'manual', ref:'La nuit est faite pour le repos et la préparation au lendemain.', hadith:''},
  {id:23, niveau:1, diff:'facile', icon:'🌸', titre:'1 invocation avant de dormir — 7 jours', cible:7, unite:'jours', type:'manual', ref:'La douaa avant le sommeil est sunna du Prophète ﷺ.', hadith:'Bukhari 6313'},
  {id:24, niveau:1, diff:'facile', icon:'🤝', titre:'Aider quelqu\'un sans qu\'il demande — 3j', cible:3, unite:'jours', type:'manual', ref:'Allah aide le serviteur tant que le serviteur aide son frère.', hadith:'Muslim 2699'},
  {id:25, niveau:1, diff:'facile', icon:'📿', titre:'SubhanAllah x33 après Fajr — 5 jours',  cible:5, unite:'jours', type:'manual', ref:'Le tasbih après la prière efface les péchés comme l\'écume de la mer.', hadith:'Muslim 597'},
  {id:26, niveau:1, diff:'facile', icon:'🌟', titre:'Lire 1 page de Coran par jour — 5 jours', cible:5, unite:'jours', type:'manual', ref:'Chaque lettre récitée vaut dix bonnes actions.', hadith:'Tirmidhi 2910'},
  {id:27, niveau:1, diff:'facile', icon:'🔤', titre:'Mémoriser 1 douaa de voyage',             cible:1, unite:'douaa', type:'manual', ref:'Le voyageur est exaucé dans sa douaa.', hadith:'Abu Dawud 2042'},
  {id:28, niveau:1, diff:'facile', icon:'🌺', titre:'Faire Astaghfirullah x100 — 3 jours',   cible:3, unite:'jours', type:'manual', ref:'"Je demande pardon à Allah plus de 70 fois par jour."', hadith:'Bukhari 6307'},
  {id:29, niveau:1, diff:'facile', icon:'💬', titre:'Pas de mensonge — 3 jours',              cible:3, unite:'jours', type:'manual', ref:'"La vérité guide vers la piété — la piété guide vers le paradis."', hadith:'Bukhari 6094'},
  {id:30, niveau:1, diff:'facile', icon:'🧘', titre:'1 minute de tafakkur après Fajr — 5j',  cible:5, unite:'jours', type:'manual', ref:'Un instant de réflexion vaut mieux qu\'une nuit d\'adoration.', hadith:''},
  {id:31, niveau:1, diff:'facile', icon:'📞', titre:'Appeler 1 proche cette semaine',         cible:1, unite:'appel', type:'manual', ref:'"Celui qui aime maintenir les liens — qu\'il maintienne les liens."', hadith:'Bukhari 5985'},
  {id:32, niveau:1, diff:'facile', icon:'🌿', titre:'Dire Al-Hamdulillah 100x en un jour',    cible:1, unite:'jour', type:'manual', ref:'Aucun acte ne remplit la balance comme Al-Hamdulillah.', hadith:'Muslim 223'},
  {id:33, niveau:1, diff:'facile', icon:'🕊️', titre:'Pas de médisance — 3 jours',            cible:3, unite:'jours', type:'manual', ref:'"La ghiba c\'est mentionner ton frère par ce qu\'il déteste."', hadith:'Muslim 2589'},

  // ── NIVEAU 2 : MOYEN ── ids 34-66
  {id:34, niveau:2, diff:'moyen', icon:'🌄', titre:'2 rakaat Doha — 5 jours',               cible:5, unite:'jours', type:'manual', ref:'"2 rakaat Doha — et une aumône est due pour chaque articulation."', hadith:'Muslim 720'},
  {id:35, niveau:2, diff:'moyen', icon:'🌄', titre:'2 rakaat Doha — 7 jours',               cible:7, unite:'jours', type:'manual', ref:'La prière Doha est la prière des repentants.', hadith:'Ibn Majah 1322'},
  {id:36, niveau:2, diff:'moyen', icon:'🌅', titre:'Sunna Fajr sans exception — 7 jours',   cible:7, unite:'jours', type:'manual', ref:'"Les 2 rakaat de Fajr valent mieux que le monde et ce qu\'il contient."', hadith:'Muslim 725'},
  {id:37, niveau:2, diff:'moyen', icon:'🔁', titre:'100 istighfar par jour — 5 jours',      cible:5, unite:'jours', type:'manual', ref:'L\'istighfar ouvre les portes de la miséricorde et du rizq.', hadith:'Abu Dawud 1518'},
  {id:38, niveau:2, diff:'moyen', icon:'📜', titre:'Al-Kahf le vendredi — 2 semaines',       cible:2, unite:'vendredis', type:'manual', ref:'"Celui qui lit Al-Kahf le vendredi sera illuminé d\'une lumière entre les 2 vendredis."', hadith:'Hakim'},
  {id:39, niveau:2, diff:'moyen', icon:'🌙', titre:'Jeûner le lundi ET le jeudi',            cible:2, unite:'jours', type:'manual', ref:'Deux jeûnes volontaires — la sunna du Prophète ﷺ.', hadith:'Muslim 1162'},
  {id:40, niveau:2, diff:'moyen', icon:'🕌', titre:'5 prières en groupe — 3 jours',         cible:3, unite:'jours', type:'manual', ref:'"La prière en groupe vaut 27 fois la prière seul."', hadith:'Bukhari 645'},
  {id:41, niveau:2, diff:'moyen', icon:'🌃', titre:'2 rakaat Tahajjud — 3 nuits',           cible:3, unite:'nuits', type:'auto', itemId:'tahajjud', ref:'"Notre Seigneur descend chaque nuit — qui M\'invoque Je lui réponds."', hadith:'Bukhari 1145'},
  {id:42, niveau:2, diff:'moyen', icon:'⚡', titre:'Ayat Al-Kursi après chaque prière — 5j', cible:5, unite:'jours', type:'manual', ref:'"Celui qui lit Ayat Al-Kursi après chaque prière entre au paradis."', hadith:'Nasai'},
  {id:43, niveau:2, diff:'moyen', icon:'📿', titre:'Rawatib complètes — 5 jours',           cible:5, unite:'jours', type:'manual', ref:'Les rawatib sont la haie protectrice de tes prières obligatoires.', hadith:'Muslim 728'},
  {id:44, niveau:2, diff:'moyen', icon:'📖', titre:'Mémoriser 1 verset par jour — 5 jours', cible:5, unite:'versets', type:'manual', ref:'"Le meilleur d\'entre vous est celui qui apprend le Coran et l\'enseigne."', hadith:'Bukhari 5027'},
  {id:45, niveau:2, diff:'moyen', icon:'📖', titre:'Mémoriser sourate Al-Mulk cette semaine', cible:1, unite:'sourate', type:'manual', ref:'"Al-Mulk intercède pour son récitant jusqu\'à ce qu\'il soit pardonné."', hadith:'Abu Dawud 1400'},
  {id:46, niveau:2, diff:'moyen', icon:'🔤', titre:'5 mots arabes par jour — 5 jours',      cible:5, unite:'jours', type:'manual', ref:'Comprendre le Coran dans sa langue est une porte vers la profondeur.', hadith:''},
  {id:47, niveau:2, diff:'moyen', icon:'📚', titre:'1 hadith médité par jour — 7 jours',    cible:7, unite:'hadiths', type:'manual', ref:'La science est une lumière — l\'ignorance une obscurité.', hadith:''},
  {id:48, niveau:2, diff:'moyen', icon:'🌺', titre:'Sira du Prophète ﷺ — 20 min/j — 5j',   cible:5, unite:'jours', type:'manual', ref:'"Vous avez dans le Messager d\'Allah un excellent modèle."', hadith:'Coran 33:21'},
  {id:49, niveau:2, diff:'moyen', icon:'🎵', titre:'1 règle de tajweed par jour — 5 jours', cible:5, unite:'règles', type:'manual', ref:'"Récitez le Coran en embellissant vos voix."', hadith:'Abu Dawud 1468'},
  {id:50, niveau:2, diff:'moyen', icon:'📖', titre:'1 page de tafsir par jour — 5 jours',   cible:5, unite:'jours', type:'manual', ref:'Le tafsir ouvre le sens du Livre d\'Allah.', hadith:''},
  {id:51, niveau:2, diff:'moyen', icon:'💝', titre:'Sadaqa chaque jour — 5 jours',           cible:5, unite:'jours', type:'manual', ref:'"La sadaqa éteint le péché comme l\'eau éteint le feu."', hadith:'Tirmidhi 2616'},
  {id:52, niveau:2, diff:'moyen', icon:'🤲', titre:'Douaa pour quelqu\'un d\'autre — 7j',   cible:7, unite:'jours', type:'manual', ref:'"La douaa d\'un musulman pour son frère en son absence est exaucée."', hadith:'Muslim 2733'},
  {id:53, niveau:2, diff:'moyen', icon:'🌟', titre:'3 actes de service anonymes cette semaine', cible:3, unite:'actes', type:'manual', ref:'"Que ta main gauche ignore ce que donne ta main droite."', hadith:'Coran 2:271'},
  {id:54, niveau:2, diff:'moyen', icon:'📞', titre:'Appeler 3 proches cette semaine',        cible:3, unite:'appels', type:'manual', ref:'"Celui qui aime maintenir les liens de parenté — qu\'il maintienne les liens."', hadith:'Bukhari 5985'},
  {id:55, niveau:2, diff:'moyen', icon:'🗣️', titre:'Aucun mensonge — 7 jours',              cible:7, unite:'jours', type:'manual', ref:'"La vérité guide vers la piété — la piété guide vers le paradis."', hadith:'Bukhari 6094'},
  {id:56, niveau:2, diff:'moyen', icon:'🔇', titre:'Éviter la médisance — 7 jours',          cible:7, unite:'jours', type:'manual', ref:'"La ghiba c\'est mentionner ton frère par ce qu\'il déteste."', hadith:'Muslim 2589'},
  {id:57, niveau:2, diff:'moyen', icon:'📢', titre:'Partager un verset chaque jour — 5j',   cible:5, unite:'jours', type:'manual', ref:'"Transmettez de moi ne serait-ce qu\'un seul verset."', hadith:'Bukhari 3461'},
  {id:58, niveau:2, diff:'moyen', icon:'👨‍👩‍👧', titre:'30 min famille sans téléphone — 5j', cible:5, unite:'jours', type:'manual', ref:'La famille est une amanah — lui consacrer du temps est une ibada.', hadith:''},
  {id:59, niveau:2, diff:'moyen', icon:'🌄', titre:'Prier Fajr en jamaah 3 fois cette semaine', cible:3, unite:'fois', type:'manual', ref:'Fajr en jamaah = récompense comme Qiyam toute la nuit.', hadith:'Muslim 656'},
  {id:60, niveau:2, diff:'moyen', icon:'🌙', titre:'Prier Isha en jamaah 5 jours',           cible:5, unite:'jours', type:'manual', ref:'Isha en jamaah = récompense de la moitié de la nuit.', hadith:'Muslim 656'},
  {id:61, niveau:2, diff:'moyen', icon:'📖', titre:'Mémoriser les 4 quls cette semaine',     cible:4, unite:'sourates', type:'manual', ref:'Les 4 quls sont une protection complète — matin et soir.', hadith:''},
  {id:62, niveau:2, diff:'moyen', icon:'🤲', titre:'Mémoriser les douaas du quotidien',      cible:1, unite:'semaine', type:'manual', ref:'Le dhikr des occasions est une sunna oubliée par beaucoup.', hadith:''},
  {id:63, niveau:2, diff:'moyen', icon:'🎓', titre:'Apprendre les conditions de validité de la prière', cible:1, unite:'leçon', type:'manual', ref:'Prier sans connaître les conditions c\'est prier dans l\'ignorance.', hadith:''},
  {id:64, niveau:2, diff:'moyen', icon:'💰', titre:'Apprendre les piliers de la zakat',      cible:1, unite:'leçon', type:'manual', ref:'"Acquittez la zakat — elle purifie vos biens."', hadith:'Coran 9:103'},
  {id:65, niveau:2, diff:'moyen', icon:'🧘', titre:'15 min de tafakkur par jour — 5 jours',  cible:5, unite:'jours', type:'manual', ref:'Un instant de réflexion vaut mieux qu\'une nuit d\'adoration.', hadith:''},
  {id:66, niveau:2, diff:'moyen', icon:'🌿', titre:'Jeûner 3 jours blancs ce mois',          cible:3, unite:'jours', type:'manual', ref:'"Jeûner 3 jours par mois équivaut à jeûner l\'éternité."', hadith:'Bukhari 1979'},

  // ── NIVEAU 3 : INTENSIF ── ids 67-100
  {id:67, niveau:3, diff:'intensif', icon:'🌃', titre:'Tahajjud 7 nuits de suite',             cible:7, unite:'nuits', type:'auto', itemId:'tahajjud', ref:'"Le meilleur des prières après l\'obligatoire est la prière de la nuit."', hadith:'Muslim 1163'},
  {id:68, niveau:3, diff:'intensif', icon:'⭐', titre:'Fajr en jamaah chaque jour — 7 jours',  cible:7, unite:'jours', type:'manual', ref:'Fajr + Isha en jamaah = qiyam toute la nuit et tout le jour.', hadith:'Muslim 656'},
  {id:69, niveau:3, diff:'intensif', icon:'📜', titre:'Al-Kahf le vendredi — 4 semaines',      cible:4, unite:'vendredis', type:'manual', ref:'Une lumière entre deux vendredis pour qui récite Al-Kahf.', hadith:'Hakim'},
  {id:70, niveau:3, diff:'intensif', icon:'📖', titre:'Compléter un juzz cette semaine',        cible:1, unite:'juzz', type:'manual', ref:'"Allah ne regarde pas vos corps — mais vos cœurs et vos actes."', hadith:'Muslim 2564'},
  {id:71, niveau:3, diff:'intensif', icon:'🔁', titre:'100 istighfar par jour — 7 jours',      cible:7, unite:'jours', type:'manual', ref:'L\'istighfar est la clé de la miséricorde, du rizq et des portes fermées.', hadith:'Abu Dawud 1518'},
  {id:72, niveau:3, diff:'intensif', icon:'🌙', titre:'Jeûner lundi + jeudi + jours blancs',    cible:5, unite:'jours', type:'manual', ref:'5 jeûnes volontaires dans la semaine — pour les forts en foi.', hadith:'Muslim 1162'},
  {id:73, niveau:3, diff:'intensif', icon:'📿', titre:'1000 salawat sur le Prophète ﷺ par jour — 5j', cible:5, unite:'jours', type:'manual', ref:'"Celui qui prie sur moi une fois — Allah le bénit dix fois."', hadith:'Muslim 408'},
  {id:74, niveau:3, diff:'intensif', icon:'⚡', titre:'Prières + sunnas rawatib complètes — 7j', cible:7, unite:'jours', type:'manual', ref:'Les rawatib comblent les manques dans les obligatoires.', hadith:'Muslim 728'},
  {id:75, niveau:3, diff:'intensif', icon:'🤲', titre:'1 heure de douaa cette semaine',         cible:1, unite:'heure', type:'manual', ref:'La douaa est l\'essence de l\'adoration.', hadith:'Tirmidhi 3371'},
  {id:76, niveau:3, diff:'intensif', icon:'📖', titre:'Mémoriser sourate Al-Baqara (les 40 premiers versets)', cible:40, unite:'versets', type:'manual', ref:'Al-Baqara est une lumière — le démon ne rentre pas dans la maison où elle est récitée.', hadith:'Muslim 780'},
  {id:77, niveau:3, diff:'intensif', icon:'🌺', titre:'Lecture de la Sira complète cette semaine', cible:1, unite:'semaine', type:'manual', ref:'Connaître le Prophète ﷺ est un devoir du cœur.', hadith:''},
  {id:78, niveau:3, diff:'intensif', icon:'🎓', titre:'Étudier 1 chapitre de fiqh',              cible:1, unite:'chapitre', type:'manual', ref:'"A qui Allah veut du bien — il lui donne la compréhension de la religion."', hadith:'Bukhari 71'},
  {id:79, niveau:3, diff:'intensif', icon:'💰', titre:'Sadaqa jariya — 1 acte durable',          cible:1, unite:'acte', type:'manual', ref:'"Quand le fils d\'Adam meurt, ses œuvres s\'arrêtent sauf 3 — dont la sadaqa jariya."', hadith:'Muslim 1631'},
  {id:80, niveau:3, diff:'intensif', icon:'👨‍🏫', titre:'Enseigner 1 chose à quelqu\'un cette semaine', cible:1, unite:'enseignement', type:'manual', ref:'"Transmettez de moi ne serait-ce qu\'un seul verset."', hadith:'Bukhari 3461'},
  {id:81, niveau:3, diff:'intensif', icon:'🤝', titre:'Réconcilier 2 personnes en conflit',      cible:1, unite:'réconciliation', type:'manual', ref:'"La réconciliation entre les gens vaut mieux que le jeûne et la prière."', hadith:'Abu Dawud 4919'},
  {id:82, niveau:3, diff:'intensif', icon:'🌿', titre:'I\'tikaf 3 jours',                        cible:3, unite:'jours', type:'manual', ref:'L\'I\'tikaf coupe les liens du monde pour se consacrer à Allah.', hadith:'Bukhari 2026'},
  {id:83, niveau:3, diff:'intensif', icon:'🧘', titre:'1 heure de tafakkur par jour — 5 jours', cible:5, unite:'jours', type:'manual', ref:'La réflexion profonde est l\'acte des awliya.', hadith:''},
  {id:84, niveau:3, diff:'intensif', icon:'📿', titre:'Compléter les 99 noms d\'Allah cette semaine', cible:99, unite:'noms', type:'manual', ref:'Allah a 99 noms — celui qui les comprend entre au paradis.', hadith:'Bukhari 2736'},
  {id:85, niveau:3, diff:'intensif', icon:'🌟', titre:'Pas de péché apparent — 7 jours',         cible:7, unite:'jours', type:'manual', ref:'Garde ta langue, ta vue et tes mains — et tu seras sauvé.', hadith:'Tirmidhi 2407'},
  {id:86, niveau:3, diff:'intensif', icon:'📢', titre:'Da\'wa — parler de l\'islam à 3 personnes', cible:3, unite:'personnes', type:'manual', ref:'"Qui appelle vers la guidance obtient la récompense de ceux qui le suivent."', hadith:'Muslim 2674'},
  {id:87, niveau:3, diff:'intensif', icon:'🗣️', titre:'Silence total d\'1h après Fajr — 5 jours', cible:5, unite:'jours', type:'manual', ref:'Le silence est un acte d\'adoration — il préserve le cœur.', hadith:''},
  {id:88, niveau:3, diff:'intensif', icon:'🌄', titre:'Se lever au dernier tiers de la nuit — 5j', cible:5, unite:'nuits', type:'manual', ref:'Allah descend au ciel de la nuit au dernier tiers.', hadith:'Bukhari 1145'},
  {id:89, niveau:3, diff:'intensif', icon:'💧', titre:'Jeûner 2 jours + Tahajjud cette semaine', cible:1, unite:'semaine', type:'manual', ref:'Le jeûne et la nuit sont les deux ailes de l\'oiseau de la foi.', hadith:''},
  {id:90, niveau:3, diff:'intensif', icon:'📖', titre:'Réciter Al-Kahf + Yasin cette semaine',   cible:1, unite:'semaine', type:'manual', ref:'Yasin est le cœur du Coran.', hadith:'Abu Dawud 3121'},
  {id:91, niveau:3, diff:'intensif', icon:'🏔️', titre:'Compléter le wird complet 7 jours de suite', cible:7, unite:'jours', type:'manual', ref:'La régularité dans le wird est le chemin des awliya.', hadith:''},
  {id:92, niveau:3, diff:'intensif', icon:'🌸', titre:'Mémoriser sourate Al-Waqi\'a cette semaine', cible:1, unite:'sourate', type:'manual', ref:'"Celui qui récite Al-Waqi\'a chaque nuit ne sera jamais touché par le besoin."', hadith:'Ibn Kathir'},
  {id:93, niveau:3, diff:'intensif', icon:'🎯', titre:'7 jours sans réseaux sociaux',              cible:7, unite:'jours', type:'manual', ref:'Le monde est une prison pour le croyant — libère-toi de ses distractions.', hadith:'Muslim 2956'},
  {id:94, niveau:3, diff:'intensif', icon:'💡', titre:'Consulter un savant cette semaine',         cible:1, unite:'consultation', type:'manual', ref:'"Demandez aux gens du rappel si vous ne savez pas."', hadith:'Coran 16:43'},
  {id:95, niveau:3, diff:'intensif', icon:'🤲', titre:'40 douaas mémorisées et pratiquées',        cible:40, unite:'douaas', type:'manual', ref:'La douaa est l\'arme du croyant.', hadith:'Hakim 1/492'},
  {id:96, niveau:3, diff:'intensif', icon:'🌙', titre:'Laylat Al-Qadr simulée — 5 nuits d\'Ibadat', cible:5, unite:'nuits', type:'manual', ref:'Laylat Al-Qadr vaut mieux que mille mois.', hadith:'Coran 97:3'},
  {id:97, niveau:3, diff:'intensif', icon:'🕌', titre:'Visiter la mosquée chaque jour — 7 jours',  cible:7, unite:'jours', type:'manual', ref:'"L\'homme le plus aimé d\'Allah est celui le plus assidu à la mosquée."', hadith:'Hakim'},
  {id:98, niveau:3, diff:'intensif', icon:'🌿', titre:'Compléter le Coran (lecture) ce mois',      cible:1, unite:'mois', type:'manual', ref:'Réciter le Coran est la plus noble des adorations du cœur.', hadith:''},
  {id:99, niveau:3, diff:'intensif', icon:'👑', titre:'Prier les 5 prières + tahajjud + doha — 7j', cible:7, unite:'jours', type:'manual', ref:'Celui qui accomplit 12 rakaat de sunna — Allah lui bâtit une maison au paradis.', hadith:'Muslim 728'},
  {id:100,niveau:3, diff:'intensif', icon:'✨', titre:'Semaine de dévotion totale — tous les actes', cible:7, unite:'jours', type:'manual', ref:'"Dieu-Unique, sans associé — à Lui la royauté, à Lui la louange, Il est Puissant sur toute chose."', hadith:'Bukhari 3293'},
];

const BADGES = [
  { id: 'first_day', emoji: '🌱', name: 'Premier Pas',       desc: 'Valider le Niveau 1 complet pour la 1ere fois', gold: false, check: (s,h) => h.totalDays >= 1 },
  { id: 'streak3',   emoji: '🔥', name: 'Flamme × 3',        desc: '3 jours consecutifs de Niveau 1 valide',        gold: false, check: (s,h) => h.streak >= 3 },
  { id: 'streak7',   emoji: '⚡', name: 'Semaine de Foi',    desc: '7 jours consecutifs — MashaAllah !',            gold: true,  check: (s,h) => h.streak >= 7 },
  { id: 'streak30',  emoji: '🌙', name: 'Mois Beni',         desc: '30 jours consecutifs — Allahu Akbar !',         gold: true,  check: (s,h) => h.streak >= 30 },
  { id: 'level2',    emoji: '📿', name: 'Approfondissement', desc: 'Debloquer et completer le Niveau 2',             gold: false, check: (s,h) => s._unlocked && s._unlocked.includes(2) },
  { id: 'level3',    emoji: '📚', name: 'Chercheur',         desc: 'Debloquer et completer le Niveau 3',             gold: false, check: (s,h) => s._unlocked && s._unlocked.includes(3) },
  { id: 'level4',    emoji: '💚', name: 'Rayonnant',         desc: 'Atteindre le Niveau 4',                         gold: true,  check: (s,h) => s._unlocked && s._unlocked.includes(4) },
  { id: 'istighfar', emoji: '🤲', name: '100 Istighfar',     desc: 'Completer 100 istighfar en une journee',        gold: false, check: (s,h) => (s.istighfar||0) >= 100 },
  { id: 'tasbih',    emoji: '✨', name: 'Tasbih Complet',    desc: 'Completer le tasbih des 99 en une journee',     gold: false, check: (s,h) => (s.tasbih||0) >= 99 },
  { id: 'week_full', emoji: '🏆', name: 'Semaine Parfaite',  desc: '7 jours dans la semaine avec Niveau 1 valide',  gold: true,  check: (s,h) => h.weekDays >= 7 },
  { id: 'jumua',     emoji: '🕌', name: 'Vendredi Beni',     desc: 'Accomplir la priere du vendredi (Jumuah)',      gold: true,  check: (s,h) => h.jumuahCount >= 1 },
  { id: 'jumua4',    emoji: '🌟', name: '4 Vendredis',       desc: '4 prieres du vendredi accomplies',              gold: true,  check: (s,h) => h.jumuahCount >= 4 },
  { id: 'ramadan_start',  emoji: '🌙', name: 'Ramadan Mubarak',   desc: 'Premier jour de Ramadan',          gold: false, check: function(s,h) { return ((h.ramadan && h.ramadan.totalFasts)||0) >= 1; } },
  { id: 'ramadan_10',     emoji: '⭐', name: '10 Jours de Jeune', desc: '10 jours de jeune accomplis',      gold: false, check: function(s,h) { return ((h.ramadan && h.ramadan.totalFasts)||0) >= 10; } },
  { id: 'ramadan_20',     emoji: '🌟', name: '20 Jours de Jeune', desc: '20 jours — Mashallah !',           gold: false, check: function(s,h) { return ((h.ramadan && h.ramadan.totalFasts)||0) >= 20; } },
  { id: 'ramadan_full',   emoji: '🥇', name: 'Ramadan Complet',   desc: '30 jours — Allahu Akbar !',        gold: true,  check: function(s,h) { return ((h.ramadan && h.ramadan.totalFasts)||0) >= 30; } },
  { id: 'laylatul_qadr',  emoji: '✨', name: 'Laylat al-Qadr',    desc: 'Les 5 nuits impaires accomplies',  gold: true,  check: function(s,h) { var n=(h.ramadan && h.ramadan.laylatul)||{}; return [21,23,25,27,29].filter(function(x){return !!n[x];}).length>=5; } },
];
let ramadanState = JSON.parse(localStorage.getItem('spiritual_ramadan') || '{"active":false,"startDate":null,"days":{},"laylatul":{}}');
const LEVELS = [
  {
    id: 1, title: 'Fondations',
    sections: [
      { icon: '🕌', title: 'Les 5 Prières', items: [
        { id: 'fajr',    label: 'Fajr',    sub: "Prière de l'aube",              arabic: 'صَلَاةُ الْفَجْرِ',  prayer: true, priority: 'fard', hadith: '\"Celui qui prie Fajr est sous la protection d\'Allah toute la journée\" — Muslim 657', source: 'Muslim 657' },
        { id: 'dhuhr',   label: 'Dhuhr',   sub: 'Prière du milieu du jour',      arabic: 'صَلَاةُ الظُّهْرِ',  prayer: true, priority: 'fard' },
        { id: 'asr',     label: 'Asr',     sub: "Prière de l'après-midi",        arabic: 'صَلَاةُ الْعَصْرِ',  prayer: true, priority: 'fard', hadith: '\"Celui qui manque Asr, c\'est comme s\'il avait perdu sa famille et ses biens\" — Bukhari 552', source: 'Bukhari 552' },
        { id: 'maghrib', label: 'Maghrib', sub: 'Prière du coucher du soleil',   arabic: 'صَلَاةُ الْمَغْرِبِ', prayer: true, priority: 'fard' },
        { id: 'isha',    label: 'Isha',    sub: 'Prière de la nuit',             arabic: 'صَلَاةُ الْعِشَاءِ',  prayer: true, priority: 'fard', hadith: '\"Celui qui prie Isha en jamaah a la récompense de prier la moitié de la nuit\" — Muslim 656', source: 'Muslim 656' },
        ...(isFriday() ? [{ id: 'jumua', label: 'Jumua ✦', sub: 'Prière du vendredi — obligation spéciale', arabic: 'صَلَاةُ الْجُمُعَةِ', isFriday: true, prayer: true, priority: 'fard' }] : []),
      ]},
      { icon: '📿', title: 'Wird quotidien', desc: 'Le wird est un ensemble d\'invocations quotidiennes tirées du Coran et de la Sunnah, récitées chaque matin après Fajr et chaque soir après Asr. Il protège, purifie le cœur et rapproche d\'Allah.', items: [
        { id: 'wird_matin', label: 'Wird du Matin', sub: 'Après Fajr · Al-Fatiha, Ayat al-Kursi, Muawwidhat…', arabic: 'وِرْدُ الصَّبَاحِ', priority: 'sunnah', optional: true, type: 'wird', session: 'matin' },
        { id: 'wird_soir',  label: 'Wird du Soir',  sub: 'Après Asr · Al-Baqara 285-286, Al-Mulk…',            arabic: 'وِرْدُ الْمَسَاءِ', priority: 'sunnah', optional: true, type: 'wird', session: 'soir'  },
      ]},
      { icon: '🌙', title: 'Sunnah de base', items: [
        { id: 'ayat_kursi', label: 'Ayat al-Kursi après prière', sub: 'Après chaque prière obligatoire — 1 fois', arabic: 'آيَةُ الْكُرْسِيّ', priority: 'sunnah', audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3', hadith: '\"Celui qui la récite après chaque prière, rien ne l\'empêche d\'entrer au Paradis sauf la mort\" — Nasa\'i (Sahih)', source: "Nasa'i (Sahih)" },
        { id: 'basmala', label: 'Bismillah avant chaque action', sub: 'Manger, sortir, commencer — Bismillah', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', hadith: '\"Tout acte important qui ne commence pas par Bismillah est coupé de sa bénédiction\" — Abu Dawud (Hassan)', source: 'Abu Dawud (Hassan)' },
        { id: 'witr', label: 'Prière Witr', sub: 'Minimum 1 rakaa — avant de dormir · Sunnah mu\'akkada pour tous', arabic: 'صَلَاةُ الْوِتْرِ', priority: 'sunnah', hadith: '\"Allah est impair et Il aime l\'impair — priez le Witr\" — Bukhari 998', source: 'Bukhari 998' },
        { id: 'shukr', label: 'Tafakkur : contempler 3 ni\'ma d\'Allah', sub: 'Méditer 3 bénédictions concrètes d\'Allah aujourd\'hui — un toit, la santé, être musulman…', arabic: 'الْحَمْدُ لِلَّهِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/055001.mp3','https://everyayah.com/data/Alafasy_128kbps/055002.mp3','https://everyayah.com/data/Alafasy_128kbps/055003.mp3','https://everyayah.com/data/Alafasy_128kbps/055004.mp3','https://everyayah.com/data/Alafasy_128kbps/055005.mp3','https://everyayah.com/data/Alafasy_128kbps/055006.mp3','https://everyayah.com/data/Alafasy_128kbps/055007.mp3','https://everyayah.com/data/Alafasy_128kbps/055008.mp3','https://everyayah.com/data/Alafasy_128kbps/055009.mp3','https://everyayah.com/data/Alafasy_128kbps/055010.mp3','https://everyayah.com/data/Alafasy_128kbps/055011.mp3','https://everyayah.com/data/Alafasy_128kbps/055012.mp3','https://everyayah.com/data/Alafasy_128kbps/055013.mp3','https://everyayah.com/data/Alafasy_128kbps/055014.mp3','https://everyayah.com/data/Alafasy_128kbps/055015.mp3','https://everyayah.com/data/Alafasy_128kbps/055016.mp3','https://everyayah.com/data/Alafasy_128kbps/055017.mp3','https://everyayah.com/data/Alafasy_128kbps/055018.mp3','https://everyayah.com/data/Alafasy_128kbps/055019.mp3','https://everyayah.com/data/Alafasy_128kbps/055020.mp3','https://everyayah.com/data/Alafasy_128kbps/055021.mp3','https://everyayah.com/data/Alafasy_128kbps/055022.mp3','https://everyayah.com/data/Alafasy_128kbps/055023.mp3','https://everyayah.com/data/Alafasy_128kbps/055024.mp3','https://everyayah.com/data/Alafasy_128kbps/055025.mp3','https://everyayah.com/data/Alafasy_128kbps/055026.mp3','https://everyayah.com/data/Alafasy_128kbps/055027.mp3','https://everyayah.com/data/Alafasy_128kbps/055028.mp3','https://everyayah.com/data/Alafasy_128kbps/055029.mp3','https://everyayah.com/data/Alafasy_128kbps/055030.mp3','https://everyayah.com/data/Alafasy_128kbps/055031.mp3','https://everyayah.com/data/Alafasy_128kbps/055032.mp3','https://everyayah.com/data/Alafasy_128kbps/055033.mp3','https://everyayah.com/data/Alafasy_128kbps/055034.mp3','https://everyayah.com/data/Alafasy_128kbps/055035.mp3','https://everyayah.com/data/Alafasy_128kbps/055036.mp3','https://everyayah.com/data/Alafasy_128kbps/055037.mp3','https://everyayah.com/data/Alafasy_128kbps/055038.mp3','https://everyayah.com/data/Alafasy_128kbps/055039.mp3','https://everyayah.com/data/Alafasy_128kbps/055040.mp3','https://everyayah.com/data/Alafasy_128kbps/055041.mp3','https://everyayah.com/data/Alafasy_128kbps/055042.mp3','https://everyayah.com/data/Alafasy_128kbps/055043.mp3','https://everyayah.com/data/Alafasy_128kbps/055044.mp3','https://everyayah.com/data/Alafasy_128kbps/055045.mp3','https://everyayah.com/data/Alafasy_128kbps/055046.mp3','https://everyayah.com/data/Alafasy_128kbps/055047.mp3','https://everyayah.com/data/Alafasy_128kbps/055048.mp3','https://everyayah.com/data/Alafasy_128kbps/055049.mp3','https://everyayah.com/data/Alafasy_128kbps/055050.mp3','https://everyayah.com/data/Alafasy_128kbps/055051.mp3','https://everyayah.com/data/Alafasy_128kbps/055052.mp3','https://everyayah.com/data/Alafasy_128kbps/055053.mp3','https://everyayah.com/data/Alafasy_128kbps/055054.mp3','https://everyayah.com/data/Alafasy_128kbps/055055.mp3','https://everyayah.com/data/Alafasy_128kbps/055056.mp3','https://everyayah.com/data/Alafasy_128kbps/055057.mp3','https://everyayah.com/data/Alafasy_128kbps/055058.mp3','https://everyayah.com/data/Alafasy_128kbps/055059.mp3','https://everyayah.com/data/Alafasy_128kbps/055060.mp3','https://everyayah.com/data/Alafasy_128kbps/055061.mp3','https://everyayah.com/data/Alafasy_128kbps/055062.mp3','https://everyayah.com/data/Alafasy_128kbps/055063.mp3','https://everyayah.com/data/Alafasy_128kbps/055064.mp3','https://everyayah.com/data/Alafasy_128kbps/055065.mp3','https://everyayah.com/data/Alafasy_128kbps/055066.mp3','https://everyayah.com/data/Alafasy_128kbps/055067.mp3','https://everyayah.com/data/Alafasy_128kbps/055068.mp3','https://everyayah.com/data/Alafasy_128kbps/055069.mp3','https://everyayah.com/data/Alafasy_128kbps/055070.mp3','https://everyayah.com/data/Alafasy_128kbps/055071.mp3','https://everyayah.com/data/Alafasy_128kbps/055072.mp3','https://everyayah.com/data/Alafasy_128kbps/055073.mp3','https://everyayah.com/data/Alafasy_128kbps/055074.mp3','https://everyayah.com/data/Alafasy_128kbps/055075.mp3','https://everyayah.com/data/Alafasy_128kbps/055076.mp3','https://everyayah.com/data/Alafasy_128kbps/055077.mp3','https://everyayah.com/data/Alafasy_128kbps/055078.mp3'], hadith: '\"Si vous êtes reconnaissants, J\'augmenterai Mes bienfaits pour vous\" — Coran 14:7 · Ni\'ma à faire tafakkur : un toit · un lit · ta femme · tes proches · la santé · les yeux · le souffle · la nourriture ce matin · l\'eau propre · être musulman · connaître le nom d\'Allah · la sécurité · ne pas vivre en zone de guerre · le Coran · chaque réveil', source: 'Ibrahim 14:7 + Sourate Ar-Rahman' },
      ]}
    ]
  },
  {
    id: 2, title: 'Approfondissement',
    sections: [
      { icon: '🕌', title: 'Approfondissement de la prière', items: [
        { id: 'sunnah_fajr', label: 'Sunnah Fajr', sub: '2 rakaat avant Fajr — le Prophète ﷺ ne les abandonnait jamais', arabic: 'سُنَّةُ الْفَجْرِ', priority: 'sunnah', hadith: '\"Les 2 rakaat de l\'aube valent mieux que le monde et ce qu\'il contient\" — Muslim 725', source: 'Muslim 725' },
        { id: 'mosquee', label: 'Prière à la mosquée', sub: 'Jamaah — wajib selon la majorité pour les hommes · au moins une prière', arabic: 'صَلَاةُ الْجَمَاعَةِ', optional: true, hadith: '\"La prière en jamaah vaut 27 fois plus que la prière seul\" — Bukhari 645', source: 'Bukhari 645' },
        { id: 'sunnah_prieres', label: 'Prières surérogatoires', sub: 'Rawatib : 12 rakaat supplémentaires', arabic: 'السُّنَنُ الرَّوَاتِبُ', optional: true, hadith: '\"Celui qui prie 12 rakaat par jour, Allah lui bâtit une maison au Paradis\" — Muslim 728', source: 'Muslim 728' },
      ]},
      { icon: '📿', title: 'Dhikr du cœur', items: [
        { id: 'istighfar', label: 'Istighfar', sub: 'Astaghfirullah · Je demande pardon à Allah — 100 fois', arabic: 'أَسْتَغْفِرُ اللَّهَ', priority: 'sunnah', type: 'counter', target: 100, audio: 'sc:172482888' },
        { id: 'tasbih', label: 'Tasbih complet', sub: 'SubhanAllah ×33 · Alhamdulillah ×33 · Allahu Akbar ×33 · puis La ilaha illallah wahdahu…', arabic: 'سُبْحَانَ اللَّهِ · الْحَمْدُ لِلَّهِ · اللَّهُ أَكْبَرُ', priority: 'sunnah', type: 'counter', target: 99, audio: 'sc:https://soundcloud.com/mohammadshariq/subhanallah-33-times', hadith: '\"Les péchés sont effacés même s\'ils sont comme l\'écume de la mer\" — Muslim 597', source: 'Muslim 597', phonetic: "La ilaha illallah wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shay'in qadir", translation: 'À 99 : \"Il n\'y a de dieu qu\'Allah Seul, sans associé, à Lui la souveraineté et la louange, Il est Puissant sur toute chose\"' },
      ]},
      { icon: '🤲', title: 'Douâas intimes', items: [
        { id: 'doua_soi', label: 'Douâa pour toi-même', sub: 'Rabbi inni lima anzalta ilayya min khayrin faqir · Seigneur, je suis dans le besoin de tout bien que Tu accordes', arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ', audio: 'https://everyayah.com/data/Alafasy_128kbps/028024.mp3', source: 'Coran 28:24 — Douâa de Moussa ﷺ dans sa détresse', phonetic: 'Rabbi inni lima anzalta ilayya min khayrin faqir' },
        { id: 'doua1', label: 'Douâa pour tes parents', sub: 'Rabbi irhamhuma kama rabbayani saghira · Seigneur, fais-leur miséricorde comme ils m\'ont élevé tout petit', arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', audio: 'https://everyayah.com/data/Alafasy_128kbps/017024.mp3', source: 'Coran 17:24', phonetic: 'Rabbi irhamhuma kama rabbayani saghira' },
        { id: 'doua2', label: 'Douâa pour ta famille', sub: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin · Seigneur, accorde-nous, de nos épouses et de notre descendance, la joie des yeux', arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', audio: 'https://everyayah.com/data/Alafasy_128kbps/025074.mp3', source: 'Coran 25:74', phonetic: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin' },
      ]}
    ]
  },
  {
    id: 3, title: 'Connaissance',
    sections: [
      { icon: '📚', title: 'Étude islamique', items: [
        { id: 'hadith1', label: '1er Hadith du jour', sub: 'Lire et méditer 1 hadith — Riyad as-Salihin ou autre recueil', arabic: 'حَدِيثٌ' },
        { id: 'sira', label: 'Vie du Prophète ﷺ', sub: '10 min · Série Seerah', arabic: 'السِّيرَةُ النَّبَوِيَّةُ' },
        { id: 'quran_read', label: 'Lecture du Coran', sub: 'Au moins 1 page avec le sens', arabic: 'قِرَاءَةُ الْقُرْآنِ' },
        { id: 'arabic', label: "Apprentissage de l'arabe", sub: '10 min · Vocabulaire ou grammaire', arabic: 'تَعَلُّمُ الْعَرَبِيَّةِ' },
      ]},
      { icon: '🎧', title: 'Immersion coranique', items: [
        { id: 'coran_ecoute', label: 'Écouter le Coran', sub: 'Choisis une sourate et écoute', arabic: 'تِلَاوَةُ الْقُرْآنِ', optional: true, coranPicker: true, hadith: '\"Récite le Coran car il intercèdera pour ses compagnons le Jour du Jugement\" — Muslim 804', source: 'Muslim 804' },
        { id: 'podcast', label: 'Podcast islamique', sub: 'Islam Simplement ou autre contenu' },
      ], links: [
        { label: 'Vie du Prophète ﷺ', sub: "L'Islam Simplement · YouTube", url: 'https://www.youtube.com/@lislamsimplement', icon: '▶' },
        { label: 'Islam Simplement', sub: 'Podcast · Écouter maintenant', url: 'https://open.spotify.com/search/islam%20simplement', icon: '🎙' },
        { label: "L'Arabe Simplement", sub: 'Chaîne YouTube · Arabe coranique', url: 'https://www.youtube.com/@larabesimplement', icon: '📖' },
        { label: 'Sunnah.com', sub: 'Hadiths authentiques · Riyad as-Salihin', url: 'https://sunnah.com/riyadussalihin', icon: '📚' },
      ]},
      { icon: '🌙', title: 'Pratiques avancées', items: [
        { id: 'sunnah_jejune', label: 'Jeûne sunnah', sub: 'Lundi ou jeudi — sunnah du Prophète', arabic: 'صَوْمُ الِاثْنَيْنِ وَالْخَمِيسِ', optional: true, hadith: '\"Les actes sont présentés à Allah le lundi et jeudi, j\'aime jeûner ces jours-là\" — Tirmidhi 747', source: 'Tirmidhi 747' },
        { id: 'doua_morts', label: 'Douâa pour les défunts', sub: 'Rabbana ighfir lana wa li ikhwanina alladhina sabaquna bil iman · Pardonne-nous ainsi qu\'à nos frères qui nous ont précédés', arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ', audio: 'https://everyayah.com/data/Alafasy_128kbps/059010.mp3', source: 'Coran 59:10', phonetic: 'Rabbana ighfir lana wa li ikhwanina alladhina sabaquna bil iman' },
      ]}
    ]
  },
  {
    id: 4, title: 'Rayonnement',
    sections: [
      { icon: '✨', title: "Sommet de l'adoration", items: [
        { id: 'tahajjud', label: 'Qiyam al-Layl', sub: 'Prière nocturne dans le dernier tiers de la nuit — la station des siddiqin', arabic: 'قِيَامُ اللَّيْلِ', optional: true, hadith: '\"Notre Seigneur descend chaque nuit au tiers final — qui M\'invoque ? Je lui réponds\" — Bukhari 1145', source: 'Bukhari 1145' },
      ]},
      { icon: '💚', title: 'Rayonnement vers les autres', items: [
        { id: 'sadaqa', label: 'Aumône (Sadaqa)', sub: "Même un sourire est une aumône", arabic: 'الصَّدَقَةُ' },
        { id: 'salam', label: 'Donner le Salam', sub: 'As-salamu alaykum à au moins 3 personnes', arabic: 'السَّلَامُ عَلَيْكُمْ' },
        { id: 'silaturahm', label: 'Maintenir les liens familiaux', sub: "Appeler ou voir un proche aujourd'hui", arabic: 'صِلَةُ الرَّحِمِ', hadith: '\"Celui qui veut que sa rizq soit élargie et sa vie prolongée, qu\'il maintienne les liens familiaux\" — Bukhari 5986', source: 'Bukhari 5986' },
        { id: 'maruf', label: "Inviter au bien (Amr bil ma'ruf)", sub: "Ibn Taymiyya : identité même de l'Oumma — Al-'Imran 110", arabic: 'الْأَمْرُ بِالْمَعْرُوفِ', hadith: '\"La meilleure aumône est de transmettre un savoir\" — Ibn Majah 239', source: 'Ibn Majah 239' },
        { id: 'kind_act', label: 'Acte de bonté', sub: "Aider quelqu'un concrètement" },
        { id: 'ziyara', label: 'Visiter un malade ou un frère', sub: 'Ziyarat al-marid — sunnah oubliée · Muslim 2162', arabic: 'زِيَارَةُ الْمَرِيضِ', hadith: '\"Le musulman a six droits sur son frère, parmi eux : lui rendre visite s\'il est malade\" — Muslim 2162', source: 'Muslim 2162' },
        { id: 'pardon', label: 'Pardonner quelqu\'un', sub: "Al-'afwa — pardonne et Allah te pardonnera · An-Nur 22", arabic: 'الْعَفْوُ', hadith: '\"Qu\'ils pardonnent et passent l\'éponge — n\'aimez-vous pas qu\'Allah vous pardonne ?\" — An-Nur 22', source: 'Coran An-Nur 24:22' },
      ]},
      { icon: '🌍', title: "Conscience de l'Oumma", items: [
        { id: 'doua_oumma', label: "Douâa pour l'Oumma", sub: "Allahumma aslih hali l-muslimin · Seigneur, améliore la situation des musulmans partout dans le monde", arabic: 'اللَّهُمَّ أَصْلِحْ أَحْوَالَ الْمُسْلِمِينَ', audio: null, source: 'Douaa général — Sunnah', phonetic: 'Allahumma aslih ahwal al-muslimin wa farrij kurbatahum' },
      ]}
    ]
  }
];
const TODAY = new Date().toISOString().split('T')[0];
const WIRD_DATA = {
  matin: {
    title: 'Wird du Matin',
    icon: '🌅',
    subtitle: 'Après Fajr — avant le lever du soleil',
    items: [
      { id: 'w_fatiha', label: 'Al-Fatiha', sub: 'Sourate 1 — L\'ouverture', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/001001.mp3','https://everyayah.com/data/Alafasy_128kbps/001002.mp3','https://everyayah.com/data/Alafasy_128kbps/001003.mp3','https://everyayah.com/data/Alafasy_128kbps/001004.mp3','https://everyayah.com/data/Alafasy_128kbps/001005.mp3','https://everyayah.com/data/Alafasy_128kbps/001006.mp3','https://everyayah.com/data/Alafasy_128kbps/001007.mp3'], source: 'Coran 1:1-7', phonetic: 'Bismillahi r-rahmani r-rahim...' },
      { id: 'w_ayat_kursi',  label: 'Ayat al-Kursi',      sub: 'Protection — 1 fois',                     arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3', source: 'Al-Baqara 2:255', phonetic: 'Allahu la ilaha illa huwal hayyul qayyum...' },
      { id: 'w_ikhlass_m',   label: 'Al-Ikhlass × 3',     sub: 'Équivaut au tiers du Coran',              arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', audio: ['https://everyayah.com/data/Alafasy_128kbps/112001.mp3','https://everyayah.com/data/Alafasy_128kbps/112002.mp3','https://everyayah.com/data/Alafasy_128kbps/112003.mp3','https://everyayah.com/data/Alafasy_128kbps/112004.mp3'], source: 'Al-Ikhlass 112', phonetic: 'Qul huwa Allahu ahad' },
      { id: 'w_falaq_m',     label: 'Al-Falaq × 3',       sub: 'Protection contre le mal',                arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/113001.mp3','https://everyayah.com/data/Alafasy_128kbps/113002.mp3','https://everyayah.com/data/Alafasy_128kbps/113003.mp3','https://everyayah.com/data/Alafasy_128kbps/113004.mp3','https://everyayah.com/data/Alafasy_128kbps/113005.mp3'], source: 'Al-Falaq 113', phonetic: 'Qul a\'udhu bi rabbi l-falaq' },
      { id: 'w_nas_m',       label: 'An-Nas × 3',          sub: 'Protection contre le mauvais œil',       arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/114001.mp3','https://everyayah.com/data/Alafasy_128kbps/114002.mp3','https://everyayah.com/data/Alafasy_128kbps/114003.mp3','https://everyayah.com/data/Alafasy_128kbps/114004.mp3','https://everyayah.com/data/Alafasy_128kbps/114005.mp3','https://everyayah.com/data/Alafasy_128kbps/114006.mp3'], source: 'An-Nas 114', phonetic: 'Qul a\'udhu bi rabbi n-nas' },
      { id: 'w_sabah1',      label: 'Douaa du matin',      sub: 'Nous voici au matin — 1 fois',           arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', audio: 'https://everyayah.com/data/Alafasy_128kbps/006014.mp3', source: 'Bukhari 6323 — Douaa du matin', phonetic: 'Asbahna wa asbahal mulku lillahi, wal hamdu lillahi, la ilaha illallahu wahdahu la sharika lah' },
      { id: 'w_istighfar_m', label: 'Istighfar du matin',  sub: 'Astaghfirullah × 3',                    arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', audio: 'https://everyayah.com/data/Alafasy_128kbps/071010.mp3', source: 'Bukhari 6307 — Nouh 71:10', phonetic: 'Astaghfirullah wa atubu ilayh' },
      { id: 'w_salawat_m',   label: 'Salawat',              sub: 'Allahumma salli ala Muhammad × 10',     arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', audio: 'https://everyayah.com/data/Alafasy_128kbps/033056.mp3', source: 'Muslim 408 — Al-Ahzab 33:56', phonetic: 'Allahumma salli ala Muhammadin wa ala ali Muhammad' },
    ]
  },
  soir: {
    title: 'Wird du Soir',
    icon: '🌙',
    subtitle: 'Après Asr ou Maghrib',
    items: [
      { id: 'w_baqara285',   label: 'Al-Baqara 285-286',  sub: 'Suffira contre tout mal',                arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/002285.mp3','https://everyayah.com/data/Alafasy_128kbps/002286.mp3'], source: 'Al-Baqara 2:285-286', phonetic: 'Amana r-rasulu bima unzila ilayh...' },
      { id: 'w_ikhlass_s',   label: 'Al-Ikhlass × 3',     sub: 'Équivaut au tiers du Coran',              arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', audio: ['https://everyayah.com/data/Alafasy_128kbps/112001.mp3','https://everyayah.com/data/Alafasy_128kbps/112002.mp3','https://everyayah.com/data/Alafasy_128kbps/112003.mp3','https://everyayah.com/data/Alafasy_128kbps/112004.mp3'], source: 'Al-Ikhlass 112', phonetic: 'Qul huwa Allahu ahad' },
      { id: 'w_falaq_s',     label: 'Al-Falaq × 3',       sub: 'Protection contre le mal',                arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/113001.mp3','https://everyayah.com/data/Alafasy_128kbps/113002.mp3','https://everyayah.com/data/Alafasy_128kbps/113003.mp3','https://everyayah.com/data/Alafasy_128kbps/113004.mp3','https://everyayah.com/data/Alafasy_128kbps/113005.mp3'], source: 'Al-Falaq 113', phonetic: 'Qul a\'udhu bi rabbi l-falaq' },
      { id: 'w_nas_s',       label: 'An-Nas × 3',          sub: 'Protection contre le mauvais œil',       arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/114001.mp3','https://everyayah.com/data/Alafasy_128kbps/114002.mp3','https://everyayah.com/data/Alafasy_128kbps/114003.mp3','https://everyayah.com/data/Alafasy_128kbps/114004.mp3','https://everyayah.com/data/Alafasy_128kbps/114005.mp3','https://everyayah.com/data/Alafasy_128kbps/114006.mp3'], source: 'An-Nas 114', phonetic: 'Qul a\'udhu bi rabbi n-nas' },
      { id: 'w_masa1',       label: 'Douaa du soir',       sub: 'Nous voici au soir — 1 fois',            arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', audio: 'https://everyayah.com/data/Alafasy_128kbps/006014.mp3', source: 'Abu Dawud 5068', phonetic: 'Amsayna wa amsal mulku lillahi, wal hamdu lillahi, la ilaha illallahu wahdahu la sharika lah' },
      { id: 'w_aouzu',       label: 'Douaa de protection', sub: 'Refuge contre le châtiment — 3 fois',   arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ', audio: 'https://everyayah.com/data/Alafasy_128kbps/002201.mp3', source: 'Abu Dawud 5074 — Al-Baqara 2:201', phonetic: 'Allahumma inni as\'aluka l-\'afwa wal-\'afiyata fid-dunya wal-akhira' },
      { id: 'w_mulk',        label: 'Sourate Al-Mulk',     sub: 'Protection dans la tombe',               arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ', audio: ['https://everyayah.com/data/Alafasy_128kbps/067001.mp3','https://everyayah.com/data/Alafasy_128kbps/067002.mp3','https://everyayah.com/data/Alafasy_128kbps/067003.mp3','https://everyayah.com/data/Alafasy_128kbps/067004.mp3','https://everyayah.com/data/Alafasy_128kbps/067005.mp3','https://everyayah.com/data/Alafasy_128kbps/067006.mp3','https://everyayah.com/data/Alafasy_128kbps/067007.mp3','https://everyayah.com/data/Alafasy_128kbps/067008.mp3','https://everyayah.com/data/Alafasy_128kbps/067009.mp3','https://everyayah.com/data/Alafasy_128kbps/067010.mp3','https://everyayah.com/data/Alafasy_128kbps/067011.mp3','https://everyayah.com/data/Alafasy_128kbps/067012.mp3','https://everyayah.com/data/Alafasy_128kbps/067013.mp3','https://everyayah.com/data/Alafasy_128kbps/067014.mp3','https://everyayah.com/data/Alafasy_128kbps/067015.mp3','https://everyayah.com/data/Alafasy_128kbps/067016.mp3','https://everyayah.com/data/Alafasy_128kbps/067017.mp3','https://everyayah.com/data/Alafasy_128kbps/067018.mp3','https://everyayah.com/data/Alafasy_128kbps/067019.mp3','https://everyayah.com/data/Alafasy_128kbps/067020.mp3','https://everyayah.com/data/Alafasy_128kbps/067021.mp3','https://everyayah.com/data/Alafasy_128kbps/067022.mp3','https://everyayah.com/data/Alafasy_128kbps/067023.mp3','https://everyayah.com/data/Alafasy_128kbps/067024.mp3','https://everyayah.com/data/Alafasy_128kbps/067025.mp3','https://everyayah.com/data/Alafasy_128kbps/067026.mp3','https://everyayah.com/data/Alafasy_128kbps/067027.mp3','https://everyayah.com/data/Alafasy_128kbps/067028.mp3','https://everyayah.com/data/Alafasy_128kbps/067029.mp3','https://everyayah.com/data/Alafasy_128kbps/067030.mp3'], source: 'Tirmidhi 2891', phonetic: 'Tabaraka lladhi biyadihi l-mulk' },
      { id: 'w_kafirun',     label: 'Al-Kafirun',          sub: 'Avant de dormir — 1 fois',               arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ', audio: ['https://everyayah.com/data/Alafasy_128kbps/109001.mp3','https://everyayah.com/data/Alafasy_128kbps/109002.mp3','https://everyayah.com/data/Alafasy_128kbps/109003.mp3','https://everyayah.com/data/Alafasy_128kbps/109004.mp3','https://everyayah.com/data/Alafasy_128kbps/109005.mp3','https://everyayah.com/data/Alafasy_128kbps/109006.mp3'], source: 'Abu Dawud 5055', phonetic: 'Qul ya ayyuha l-kafirun' },
    ]
  }
};
let wirdState = JSON.parse(localStorage.getItem('niyyah_wird_' + (new Date().toISOString().split('T')[0])) || '{}');
