const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'data', 'sira.min.json');
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

function t(fr) { return {type:'text',content:{fr:fr,en:'',ar:''}}; }
function i(fr) { return {type:'italic',content:{fr:fr,en:'',ar:''}}; }

// ===== RDV 61 (index 60) — La permission =====
data.rdv[60].paragraphes = [
  t("Médine n'est pas un refuge tranquille. C'est une ville qui respire sous tension, armée nuit et jour, les yeux ouverts sur les routes du nord."),
  t("Les Anṣâr — les habitants de Médine qui ont accueilli les émigrés — dorment l'épée posée contre le mur. Pas par habitude. Par nécessité. Ils savent que La Mecque ne les a pas laissés partir."),
  t("Depuis deux ans, les musulmans de La Mecque ont tout abandonné. Leurs maisons ont été saisies. Leurs biens partagés entre ceux qui les haïssaient. Leurs familles restées là-bas vivent sous menace."),
  t("Bilâl ibn Rabah porte sur ses épaules la mémoire du sol brûlant. ʿUmayya ibn Khalaf le faisait étendre sous le soleil de midi sur le sable de La Mecque, une dalle de pierre posée sur sa poitrine. Il criait : Ahad. Ahad. Un seul Dieu. Un seul Dieu. Et les coups continuaient."),
  t("Sumayyâ bint Khayyât est morte sous ces mains-là. La première martyrée de l'islam. Abû Jahl lui a planté une lance dans le ventre parce qu'elle n'a pas voulu renier. Son mari ʿAmmâr l'a vue mourir et n'a rien pu faire."),
  t("ʿAmmâr ibn Yâsir vit avec cette image. Il vit avec les mots qu'on lui a forcé à prononcer contre sa volonté — des mots de reniement que sa bouche a dits mais que son cœur n'a jamais acceptés. Le Prophète ﷺ lui avait dit : si on recommence, redis-les. La foi n'est pas dans la bouche contrainte."),
  t("À Médine, les plaintes montent. Des hommes viennent trouver le Prophète ﷺ. Pas pour se plaindre par faiblesse — pour demander justice."),
  i("Jusqu'à quand, ya Rasûlallah ? Jusqu'à quand nous taisir pendant qu'ils prennent nos biens et tuent nos frères ?"),
  t("Il les écoute. Il ne dit pas : attendez encore. Il dit : je n'ai pas reçu la permission. Et c'est tout. La permission. Un mot qui implique qu'il y a une autorité au-dessus de lui — une volonté qu'on consulte avant d'agir."),
  t("Les treize années à La Mecque ont été vécues sans armes. Par ordre. Pas par lâcheté — les hommes qui ont résisté à la torture sans renier ne sont pas des lâches. Mais parce que le moment n'était pas venu."),
  t("Le verset descend. Il tombe dans le silence de Médine comme une pierre dans l'eau calme."),
  i("Udhina li-lladhîna yuqâtalûna bi-annahum ẓulimû. — La permission est donnée à ceux qu'on combat, parce qu'ils ont été opprimés. Et Allah est bien capable de les soutenir. (Coran 22:39)"),
  t("Ce mot — udhina, la permission fut donnée — est le premier mot d'un verset militaire en islam. Les exégètes l'ont compté, pesé, retourné dans tous les sens. C'est une permission, pas un ordre. Une ouverture, pas une obligation."),
  t("La distinction est théologiquement décisive. Un ordre impose. Une permission libère. Celui qui reçoit une permission peut l'exercer ou non. Mais lui, il attend depuis treize ans. Et ses compagnons saignent depuis treize ans."),
  t("Le verset continue. Il dit : ceux qui ont été chassés de leurs demeures sans droit, sinon qu'ils disent : notre Seigneur est Allah. C'est la définition exacte de ce qu'ils ont vécu. Le Coran ne généralise pas — il nomme."),
  t("Quand le Prophète ﷺ récite ce verset à ses compagnons, Abû Bakr ibn Abî Quḥâfa — qui est à ses côtés depuis le premier jour — dit une phrase qu'Ibn Hishâm a conservée : Je sais maintenant que nous nous battrons. Il avait compris avant même qu'on lui explique."),
  t("Les visages changent dans la pièce. Pas de joie facile. Quelque chose de plus grave — la conscience que ce qui va venir ne ressemble à rien de ce qu'ils ont connu. Ils ont résisté à la torture. Ils n'ont pas encore résisté à la guerre."),
  t("Le verset 22:41 continue la promesse : ceux que, si Nous les établissons sur la terre, ils accomplissent la prière, s'acquittent de la zakât, commandent le bien et interdisent le mal. La permission n'est pas donnée pour se venger. Elle est donnée pour bâtir."),
  t("Treize ans de patience ne sont pas effacés par ce verset. Ils sont justifiés. Le Prophète ﷺ n'a pas attendu par faiblesse. Il a attendu parce qu'il attendait cela — une autorisation qui vient d'en haut et qui pose des conditions."),
  t("Le lendemain, les préparatifs commencent. Hamza ibn ʿAbd al-Muṭṭalib reçoit le premier drapeau. L'oncle du Prophète ﷺ — l'homme que La Mecque craignait déjà avant l'islam. Il va sortir. Et tout commence.")
];
data.rdv[60].meditation = {fr:"Il y a un temps pour subir. Un temps pour répondre. Confondre les deux est une erreur — attendre trop longtemps use les hommes, agir trop tôt les détruit. La permission de Médine a été donnée au bon moment, ni avant ni après.",en:'',ar:''};
console.log('RDV 61 done:', data.rdv[60].paragraphes.length, 'para');

// ===== RDV 62 (index 61) — Les drapeaux blancs =====
data.rdv[61].paragraphes = [
  t("Hamza ibn ʿAbd al-Muṭṭalib n'est pas un homme ordinaire. C'est l'oncle du Prophète ﷺ, le lion de Médine, celui dont le nom faisait déjà reculer les hommes à La Mecque avant même qu'il embrasse l'islam."),
  t("Il a embrassé l'islam par colère, d'abord. Un jour, Abû Jahl avait insulté son neveu en son absence. Hamza a appris la nouvelle au retour de la chasse, son arc encore à l'épaule. Il a traversé La Mecque, trouvé Abû Jahl dans l'assemblée des Quraychites et lui a frappé la tête avec l'arc."),
  i("Je suis sur sa religion. Réponds-moi, si tu peux."),
  t("Nul n'a répondu. Et Hamza, en rentrant chez lui ce soir-là, a compris que ce qu'il venait de dire n'était plus seulement une réplique de colère. C'était vrai. Il était devenu musulman."),
  t("C'est lui que le Prophète ﷺ choisit pour conduire la première expédition armée. Trente hommes des Muhâjirîn — les émigrés de La Mecque. Pas d'Anṣâr. Pas encore. Le drapeau est blanc. On le noue autour d'une lance."),
  t("Ils marchent vers la côte, en direction du territoire de Juhayna. L'objectif : surveiller une caravane quraychite qui remonte de Syrie. La caravane est là. Les deux groupes se font face sur le sable."),
  t("Majdî ibn ʿAmr al-Juhanî s'interpose. C'est un allié des deux camps — il connaît les Quraychites et il connaît les musulmans. Il marche entre les deux lignes, les mains ouvertes, sans arme. Et les deux groupes reculent."),
  t("Il n'y a pas de combat. Les deux armées se regardent, puis chacun repart. Hamza rentre à Médine avec ses trente hommes. La caravane repart vers La Mecque."),
  t("Dans les semaines qui suivent, d'autres expéditions partent. Toutes sans combat. ʿUbayda ibn al-Ḥârith mène soixante hommes vers les puits de Râbiġ. Saʿd ibn Abî Waqqâṣ — le futur vainqueur de l'Iran — mène vingt hommes vers le Hijâz."),
  t("Aucun de ces hommes ne revient avec du butin. Aucun ne revient avec du sang sur les mains. Mais ils reviennent différents."),
  t("La marche apprend des choses que le discours n'enseigne pas. Le corps d'un homme qui marche pendant trois jours dans le sable apprend à faire confiance à celui qui marche à côté. Il apprend à partager la gourde, à dormir sur le sol pierreux, à ne pas se plaindre quand les pieds saignent."),
  t("Ces expéditions sont une école. L'école de la formation militaire sans bataille. Le Prophète ﷺ construit une armée, pas une milice — une armée qui obéit, qui tient la formation, qui sait quand ne pas combattre."),
  t("Les éclaireurs apprennent à lire les traces sur le sable, la direction du vent, la signification d'un nuage de poussière à l'horizon. Les lieutenants apprennent à prendre des décisions quand le chef n'est pas là."),
  t("Les hommes qui reviennent de ces marches ont un regard différent. Pas plus fiers — plus calmes. Quelque chose s'est stabilisé en eux. Ils ont vu qu'ils pouvaient tenir. Qu'ils ne s'effondrent pas sous la pression."),
  t("Médine les regarde rentrer. Les femmes. Les enfants. Les anciens. Ces hommes qui partent et reviennent sans victoire visible mais qui portent quelque chose de nouveau dans les épaules."),
  t("Le Prophète ﷺ interroge chacun. Il écoute ce que les éclaireurs ont observé. Il note les positions, les routes, les points d'eau. Il construit une carte dans sa tête — une carte que personne d'autre ne possède encore entièrement."),
  t("Les Quraychites reçoivent les nouvelles de ces marches. Des caravanes qui ont vu des hommes en armes sur les routes. Des marchands qui ont changé de chemin par précaution. Le signal est clair : Médine n'est plus une ville ouverte."),
  t("Mais le premier sang n'a pas encore été versé. Les drapeaux blancs ont flotté sans tuer. Et c'est précisément ce qui rend ce qui vient après si difficile."),
  t("ʿAbdullâh ibn Jaḥsh reçoit bientôt une lettre cachetée. Il a l'ordre de ne l'ouvrir qu'après deux jours de marche. À l'intérieur, une mission. À l'intérieur, une question qui n'a pas encore de réponse.")
];
data.rdv[61].meditation = {fr:"Ce qui se construit dans le silence porte ensuite les heures de gloire. Les fondations ne se voient pas, mais elles décident de tout. Ces hommes qui marchent sans combattre apprennent quelque chose que les victoires faciles n'enseignent jamais.",en:'',ar:''};
console.log('RDV 62 done:', data.rdv[61].paragraphes.length, 'para');

// ===== RDV 63 (index 62) — Nakhla =====
data.rdv[62].paragraphes = [
  t("ʿAbdullâh ibn Jaḥsh ibn Riʾâb al-Asadî est un homme du premier cercle. Il a émigré en Éthiopie, puis à Médine. Il a tout quitté pour suivre. C'est pourquoi le Prophète ﷺ le choisit pour cette mission — la première mission avec un ordre écrit, une lettre cachetée."),
  t("L'ordre : marcher deux jours en direction de Nakhla — la vallée entre La Mecque et Ṭâif — puis ouvrir la lettre. Huit hommes des Muhâjirîn l'accompagnent. Aucun Anṣârî. Le secret doit rester dans le cercle restreint."),
  t("Deux jours de marche sous le soleil. Les hommes ne savent pas où ils vont ni pourquoi. Ils font confiance. Ce mot — confiance — est le tissu invisible qui tient cette armée ensemble."),
  t("Au matin du deuxième jour, ʿAbdullâh brise le sceau. Il lit à voix haute."),
  i("Marche jusqu'à Nakhla. Surveille la caravane des Quraychites. Renseigne-nous sur eux."),
  t("Puis il lève les yeux vers ses hommes. Il ajoute ce que la lettre précisait : personne n'est obligé de continuer. Ceux qui veulent rentrer peuvent rentrer. C'est une mission volontaire."),
  t("Nul ne tourne les talons."),
  t("À Nakhla, ils voient la caravane. Quatre hommes. Du cuir. Des raisins secs. Des marchandises quraychites. Et un détail qui change tout : c'est le dernier jour du mois de Rajab — l'un des quatre mois sacrés durant lesquels le combat est interdit par la coutume arabe."),
  t("Le groupe délibère à voix basse. Si la caravane passe cette nuit, demain c'est Chaʿbân — un mois ordinaire. Mais alors la caravane sera peut-être en sécurité derrière les murs de La Mecque. Et si aujourd'hui est encore Rajab..."),
  t("Les visages hésitent. Ce sont des hommes pieux. Le mois sacré n'est pas une invention — c'est une loi ancienne, respectée avant l'islam, que le Coran lui-même a maintenue dans sa forme initiale."),
  t("Un homme lève son arc. ʿAmr ibn al-Ḥaḍramî — gardien de la caravane — est touché le premier. Il s'effondre dans la poussière de Nakhla. C'est le premier ennemi mort dans une expédition islamique."),
  t("Les autres sont faits prisonniers. Les marchandises sont saisies. Le groupe rentre à Médine."),
  t("Le Prophète ﷺ voit la caravane, les prisonniers. Il voit aussi la date. Il se tait."),
  i("Je ne vous ai pas ordonné de combattre pendant le mois sacré."),
  t("Les hommes baissent la tête. Ils ont cru bien faire. Ils n'avaient pas reçu l'ordre de tirer — ils ont jugé seuls. Et ce jugement, même dicté par une logique militaire compréhensible, a été pris sans autorisation."),
  t("La Mecque s'empare de l'affaire immédiatement. Les messagers partent dans toutes les directions. Les Quraychites crient au sacrilège — eux qui ont torturé des innocents, eux qui ont chassé des familles de leurs maisons, crient au sacrilège parce qu'un homme a été tué un mauvais jour."),
  t("Les Arabes les croient. L'opinion se retourne contre les musulmans. À Médine, certains compagnons sont accablés. Ont-ils tout gâché ? L'expédition qui devait renseigner est devenue un scandale."),
  t("Puis le verset descend. Coran 2:217 : Ils t'interrogent sur le combat durant le mois sacré. Dis : combattre pendant ce mois est une chose grave. Mais détourner les gens de la voie d'Allah, Le renier, s'opposer à la Mosquée sacrée et en chasser ses habitants — cela est plus grave aux yeux d'Allah."),
  t("Le verset ne dit pas : ce qu'ils ont fait est juste. Il dit : ce qu'on vous reproche est moins grave que ce que vous faites depuis treize ans. Une mise en perspective, pas une absolution."),
  t("Les prisonniers sont libérés contre rançon. Les marchandises sont partiellement restituées. ʿAmr ibn al-Ḥaḍramî reste mort dans la vallée de Nakhla. L'histoire avance avec cette trace."),
  t("Une leçon reste, gravée dans la mémoire des compagnons : la permission de combattre ne signifie pas la permission de décider seul. Il y a une chaîne de commandement. Il y a un Prophète ﷺ. On ne tire pas sans ordre.")
];
data.rdv[62].meditation = {fr:"Certaines décisions justes laissent une trace amère. Cela ne veut pas dire qu'elles étaient fausses — cela veut dire que le monde dans lequel on vit est complexe, et que la justice a toujours un coût. L'honnêteté consiste à regarder ce coût en face.",en:'',ar:''};
console.log('RDV 63 done:', data.rdv[62].paragraphes.length, 'para');

// ===== RDV 64 (index 63) — Mille chameaux =====
data.rdv[63].paragraphes = [
  t("Abû Sufyân ibn Ḥarb est un homme prudent. Pas courageux par tempérament — prudent. Il flaire l'air comme un marchand qui a traversé mille fois les routes du désert : avant de s'engager, il vérifie."),
  t("Depuis des semaines, des nouvelles lui arrivent de Médine. Des expéditions armées sur les routes du Hijâz. Des caravanes quraychites qui changent d'itinéraire. La mort de ʿAmr ibn al-Ḥaḍramî à Nakhla. Il additionne."),
  t("Sa caravane est colossale. Mille chameaux chargés de marchandises syriennes. De l'argent, de l'huile, des tissus. Les bénéfices appartiennent à presque toutes les familles importantes de La Mecque — c'est l'argent de l'été, la grande caravane qui finance le clan toute l'année."),
  t("Cinquante mille dinars. C'est la valeur estimée de ce que portent ces bêtes. Abû Sufyân le sait. Il sait aussi que Muhammad — c'est ainsi qu'il l'appelle — le sait."),
  t("Il envoie des messagers en avant, des éclaireurs sur les chemins de traverse, des hommes qui connaissent les visages des espions. Il veut savoir si la route est libre avant de s'y engager."),
  t("À Médine, le Prophète ﷺ convoque une assemblée. Pas un conseil secret — une annonce publique. Il dit : la caravane d'Abû Sufyân revient de Syrie. Allez la chercher. Peut-être qu'Allah vous donnera un butin."),
  t("Puis il ajoute la phrase qui change tout : ceux qui le souhaitent."),
  t("Il ne mobilise pas. Il n'ordonne pas. Il annonce et il laisse. Les hommes choisissent librement de partir ou de rester. Ce détail — cette liberté laissée — explique la composition étrange de l'armée qui part."),
  t("Trois cent treize hommes. Soixante-dix-sept d'entre eux sont à cheval ou à chameau. Les autres marchent. Ils emportent peu de provisions — ils pensent à une expédition courte, pas à une bataille."),
  t("Parmi ceux qui partent, des vieillards et des jeunes. Des hommes qui n'ont pas d'épée et qui empruntent celle d'un voisin. Des hommes qui ont dû tirer au sort pour décider qui irait, faute de monture pour tous."),
  t("Ceux qui restent à Médine ne sont pas des lâches. Certains restent sur ordre — le Prophète ﷺ les a désignés pour garder la ville. D'autres ont des familles malades. D'autres pensent honnêtement que ce n'est pas leur tour."),
  t("Mais certains restent parce qu'ils doutent. Ils ne le diront pas ouvertement. Ils trouveront une raison. Mais dans leur cœur, il y a une hésitation que les événements à venir rendront douloureuse."),
  t("Les 313 qui partent ne savent pas qu'ils vont à Badr. Ils croient aller chercher une caravane. Ils emportent des armes légères — des épées, quelques lances, peu d'arcs. Pas de quoi affronter une armée."),
  t("Le Prophète ﷺ, lui, a-t-il un pressentiment ? Les sources ne le disent pas explicitement. Mais il prie. Il prie beaucoup dans ces jours-là."),
  t("La colonne quitte Médine par la porte sud. Les femmes et les enfants regardent depuis les toits. Certaines agitent la main. D'autres prient en silence."),
  t("La route vers la mer longe des collines grises et des oueds secs. En cette saison, le soleil tape sur les pierres blanches dès le matin. Les hommes boivent peu — les gourdes sont comptées."),
  t("Ils ne savent pas qu'à La Mecque, au même moment, mille hommes sont en train d'armer leurs épées. Ils ne savent pas qu'Abû Jahl ibn Hishâm est en train de convoquer les guerriers. Ils ne savent pas que la caravane n'est plus le problème."),
  t("Abû Sufyân, lui, a déjà changé de route. Son instinct lui a dit de longer la côte, loin des chemins habituels. La caravane file vers La Mecque par le nord, hors de portée."),
  t("Mais à La Mecque, quelqu'un a décidé que fuir ne suffisait pas. Que cette fois, il fallait en finir. Et cet homme — Abû Jahl — est en train d'envoyer un messager. Un homme qui va entrer dans La Mecque en hurlant.")
];
data.rdv[63].meditation = {fr:"On croit partir pour une chose, et c'est une autre qui nous attend. Les grandes journées de l'histoire ne ressemblent jamais à ce qu'on avait imaginé la veille. C'est pourquoi la préparation intérieure — la clarté sur ses valeurs, pas sur ses plans — est la seule chose qui tient.",en:'',ar:''};
console.log('RDV 64 done:', data.rdv[63].paragraphes.length, 'para');

// ===== RDV 65 (index 64) — Damdam =====
data.rdv[64].paragraphes = [
  t("Abû Sufyân flaire l'air depuis trois jours. Il interroge les voyageurs qu'il croise sur la route de Syrie : ont-ils vu des hommes armés ? Des traces de campement ? La poussière d'une colonne en marche ?"),
  t("Un homme lui répond que oui — il a vu quelque chose du côté de Badr. Des éclaireurs, peut-être. Des feux de camp."),
  t("Abû Sufyân ne réfléchit pas longtemps. Il ordonne de dévier. La caravane quitte la route habituelle et longe la côte vers l'ouest, collée à la mer Rouge, là où les chemins sont moins fréquentés. Il fait vite. Il fait silencieusement."),
  t("Puis il envoie un message à La Mecque. Pas une lettre — un homme. Ḍamḍam ibn ʿAmr al-Ġhifârî. Et l'ordre qu'il lui donne est précis : fais vite, fais fort, ne laisse personne dormir."),
  t("Ḍamḍam entre dans La Mecque à dos de chameau. Il a coupé les oreilles de sa bête. Il a tranché son nez. Il a retourné sa selle. Il s'est mis debout sur le dos de l'animal, les vêtements déchirés."),
  t("Il hurle."),
  i("Ô Quraychites ! La caravane ! Muḥammad et ses compagnons ont intercepté votre caravane ! Vos biens ! Votre argent ! Venez au secours ! Venez !"),
  t("La Mecque se lève d'un seul coup. Pas besoin de répéter. Les familles qui ont des parts dans la caravane — c'est-à-dire presque tout le monde — entendent et sortent dans la rue. Les marchés se vident. Les discussions s'arrêtent."),
  t("Abû Jahl ibn Hishâm al-Makhzûmî prend les devants. C'est lui qui organise. C'est lui qui compte les hommes, vérifie les armes, nomme les chefs de section. Mille hommes, dit-on. Sept cents chameaux. Cent chevaux. Des cuirasses."),
  t("Les chanteuses de La Mecque sont là aussi. Elles ont été convoquées pour chanter la gloire des guerriers, pour rappeler aux hommes les morts à venger, pour enflammer ce qui brûle déjà. C'est une tradition ancienne — la guerre se prépare avec de la musique."),
  t("Mais certains refusent. ʿAbd ar-Raḥmân ibn ʿAwf — qui a des liens familiaux complexes à La Mecque — ne part pas avec l'armée. Umayya ibn Khalaf, l'homme qui avait torturé Bilâl, tergiverse."),
  t("Un ami vient chez Umayya avec une cordelette tressée et lui dit : j'ai fait vœu de t'attacher si tu ne viens pas. Et Umayya — l'homme qui faisait écraser les autres sous des pierres — a peur de cette cordelette. Il part."),
  t("Puis un message arrive de Médine. Abû Sufyân envoie une deuxième nouvelle : la caravane est sauve. Elle a contourné. Elle n'a pas été interceptée. Rentrez."),
  t("Abû Jahl entend le message. Il le connaît. Il ne fait pas demi-tour."),
  i("Non. Par Allah, nous n'irons pas chez nous avant d'avoir atteint Badr. Nous y passerons trois jours, nous abattrons des chameaux, nous mangerons, nous boirons du vin, et les Arabes parleront de nous pendant des années."),
  t("C'est une phrase qui dit tout. Il ne part pas pour sauver la caravane. Il part pour l'honneur. Pour la réputation. Pour montrer à toute la péninsule qu'on ne défie pas La Mecque impunément."),
  t("Mais il y a une chose qu'Abû Jahl ne sait pas. Quelques semaines plus tôt, une femme de sa propre famille a eu un rêve."),
  t("ʿÂtika bint ʿAbd al-Muṭṭalib — la tante du Prophète ﷺ — a vu dans son sommeil un homme sur un chameau arriver à La Mecque et crier : sortez à votre mort dans trois jours. Elle a vu la montagne d'Abû Qubays éclater. Elle a vu des pierres tomber sur chaque maison."),
  t("Elle a raconté ce rêve. On se l'est passé de bouche en bouche. Certains ont ri. Abû Jahl a dit que c'était une femme des Banû Hâchim qui rêvait, pas une prophétesse."),
  t("La caravane d'Abû Sufyân est maintenant en sécurité quelque part sur la côte. Mille hommes de La Mecque marchent vers Badr. Trois cent treize hommes de Médine marchent eux aussi vers Badr. Et aucun des deux groupes ne sait encore exactement ce qu'il va trouver là-bas.")
];
data.rdv[64].meditation = {fr:"L'orgueil ne marche jamais en arrière. Il préfère se briser que se rétracter. Abû Jahl avait le choix de rentrer — il ne l'a pas pris. C'est dans cette phrase — les Arabes parleront de nous — que se joue souvent la perte des hommes : vouloir être vu plus que vouloir vivre.",en:'',ar:''};
console.log('RDV 65 done:', data.rdv[64].paragraphes.length, 'para');

// ===== RDV 66 (index 65) — La marche =====
data.rdv[65].paragraphes = [
  t("Le départ de Médine a lieu un samedi. Certains disent le 12 Ramaḍân, d'autres le 8. Ibn Hishâm a conservé les deux versions sans trancher. Ce qui est sûr : il fait chaud. Et c'est le Ramaḍân — les hommes jeûnent."),
  t("Le Prophète ﷺ nomme ʿAbdullâh ibn Umm Maktûm pour diriger la prière à Médine pendant son absence. C'est un aveugle — un homme que la Révélation a un jour rappelé au Prophète ﷺ de ne pas négliger. Il reste. Il prie."),
  t("La colonne sort par la porte. Trois cent treize hommes. Soixante-dix-sept montures. Le reste marche."),
  t("Parmi les montures, un chameau que partagent trois hommes. Le Prophète ﷺ, ʿAlî ibn Abî Ṭâlib, et Marthad ibn Abî Marthad al-Ġhanawî. Ils s'alternent : l'un monte, les deux autres marchent. L'un des compagnons propose au Prophète ﷺ de monter plus longtemps — il peut marcher davantage."),
  i("Vous n'êtes pas plus forts que moi pour marcher. Et je n'ai pas moins besoin de récompense que vous."),
  t("Il marche. L'homme qui reçoit la Révélation marche dans la poussière du Hijâz, les pieds sur le sable chaud, aux côtés de ses compagnons. Pas symboliquement. Vraiment."),
  t("La route passe par la vallée de Raḥkân. Les collines sont grises et les pierres retiennent la chaleur du jour. La nuit, la température chute. Les hommes dorment serrés, en rangs, les armes à portée de main."),
  t("Des éclaireurs sont envoyés en avant. Bishr ibn Sufyân al-Kʿabî — un homme qui connaît ces routes comme le dos de sa main — part devant. Il doit voir sans être vu."),
  t("À l'étape de Baṭn Raḥkân, un puits. Les hommes boivent. On note les heures, les distances, les points d'eau. C'est une armée qui apprend à survivre dans ce désert."),
  t("Puis la nouvelle tombe. Un messager revient en courant depuis l'avant. Il apporte ce qu'on avait craint : la caravane d'Abû Sufyân a contourné. Elle n'est plus sur la route habituelle. Elle est déjà en sécurité."),
  t("Et une deuxième nouvelle, dans le souffle du même messager : l'armée de La Mecque avance. Mille hommes. Des chevaux. Des cuirasses. Ils ne cherchent plus à protéger la caravane — ils cherchent le combat."),
  t("Un silence tombe sur la colonne."),
  t("C'est le moment de la vérité. Ils sont sortis pour une caravane. Une caravane sans armée, sans cuirasses, sans cavalerie. Et ce qu'ils trouvent à la place, c'est la fleur de La Mecque."),
  t("Certains visages se décomposent. Pas tous — certains. Les hommes qui avaient calculé que c'était une mission facile, une razzia rapide, un butin honnête. Ceux-là regardent leurs pieds."),
  t("D'autres — les vieux, les rescapés de la torture, les Muhâjirîn qui ont tout perdu à La Mecque — lèvent les yeux. Quelque chose dans leur regard dit : c'est pour ça qu'on est là."),
  t("Le Prophète ﷺ consulte. Il n'impose pas. Il demande."),
  i("Conseillez-moi, ô gens."),
  t("Abû Bakr ibn Abî Quḥâfa parle le premier. Il rappelle la promesse divine, la légitimité de la cause. ʿUmar ibn al-Khaṭṭâb parle ensuite. Sa voix est plus tranchante : nous combattons."),
  t("Al-Miqdâd ibn ʿAmr al-Bahrânî se lève. C'est un homme des Muhâjirîn, un homme de La Mecque, un homme qui sait ce que c'est de tout perdre. Il dit :"),
  i("Ya Rasûlallah, marche là où Allah te commande. Nous ne te dirons pas ce que les compagnons de Mûsâ lui ont dit : va combattre, toi et ton Seigneur, nous restons ici. Nous dirons : va combattre, toi et ton Seigneur — nous combattons avec toi, à ta droite, à ta gauche, devant toi, derrière toi."),
  t("Le Prophète ﷺ sourit. Il dit : Bien. Et par Allah, je vois déjà les positions des morts parmi les Quraychites."),
  t("La colonne reprend sa marche. Vers Badr. Vers ce puits que tout le monde connaît mais que personne n'a encore occupé ce matin-là.")
];
data.rdv[65].meditation = {fr:"Marcher ensemble n'est pas la même chose qu'arriver ensemble. La marche est l'endroit où on découvre qui est vraiment là — pas pour les mots, mais pour les pas. Ceux qui tiennent dans la poussière sont ceux qui tiendront dans la bataille.",en:'',ar:''};
console.log('RDV 66 done:', data.rdv[65].paragraphes.length, 'para');

// ===== RDV 67 (index 66) — Saʿd se lève =====
data.rdv[66].paragraphes = [
  t("La vallée de Ḏhafrân s'ouvre entre deux versants de collines grises. C'est là que la colonne fait halte. Le soir descend vite dans ce creux de terrain. Les feux sont petits — le bois est rare, et la fumée doit rester discrète."),
  t("Le conseil commence autour du feu du Prophète ﷺ. Ce n'est pas une réunion formelle — c'est une conversation entre hommes qui savent ce qu'ils risquent. Les visages sont fatigués mais les yeux sont vifs."),
  t("Abû Bakr ibn Abî Quḥâfa parle en premier. Il n'est pas un guerrier — il est un marchand, un homme de parole et de foi. Mais c'est précisément pourquoi ses mots comptent. Quand Abû Bakr dit quelque chose, c'est qu'il le pense vraiment."),
  i("Ya Rasûlallah, ces gens viennent et ils ne sont pas peu nombreux. Ils ont des armes et des montures. Mais ils ont des cœurs qui s'attachent à ce monde. Et nous, nous avons des cœurs qui s'attachent à ce qu'Allah a promis. Continue, ya Rasûlallah — la victoire est avec toi."),
  t("ʿUmar ibn al-Khaṭṭâb parle ensuite. Sa voix est directe, presque dure. Il n'embellit pas. Il dit ce qu'il pense sans détour — c'est sa manière d'aimer."),
  i("Ya Rasûlallah, c'est Quraych. Et Quraych n'a pas humilié sa fierté depuis qu'elle a embrassé le polythéisme. Par Allah, si tu combats, ils combattront avec leur fierté. Avance."),
  t("Le Prophète ﷺ écoute. Il écoute vraiment — pas en attendant poliment que l'autre finisse. Il tourne la tête vers les hommes autour du feu. Puis il dit :"),
  i("Conseillez-moi, ô gens."),
  t("Les Anṣâr comprennent que c'est à eux qu'il parle. Car lors de l'allégeance d'al-ʿAqaba, à Médine, ils avaient promis de protéger le Prophète ﷺ comme ils protégeaient leurs propres femmes et enfants — mais sur le territoire de Médine. Pas au-delà."),
  t("Certains Anṣâr se demandent : est-ce qu'il s'interroge sur notre engagement ? Veut-il savoir si nous le suivrons même en dehors de Médine ?"),
  t("Al-Miqdâd ibn ʿAmr al-Bahrânî s'est déjà exprimé. Mais Saʿd ibn Muʿâdh ibn al-Nuʿmân al-Ashhalî, chef des Aws de Médine, se lève."),
  t("Il se lève lentement. C'est un homme grand. Large d'épaules. Quand Saʿd ibn Muʿâdh se lève, les gens autour de lui ont l'impression que la nuit recule un peu."),
  i("Ya Rasûlallah — peut-être est-ce nous que tu vises par cette question. Par Celui qui t'a envoyé avec la vérité : si tu nous demandes de traverser cette mer avec toi, nous la traverserons. Pas un seul d'entre nous ne restera en arrière. Nous ne détestons pas rencontrer l'ennemi demain. Nous sommes patients au combat et véridiques dans la rencontre. Peut-être qu'Allah te montrera de nous ce qui te réjouira. Marche avec la bénédiction d'Allah."),
  t("Le Prophète ﷺ sourit. Ibn Hishâm dit que son visage s'est éclairé — ashraqat wajhuhu — comme si une lumière venait de l'intérieur."),
  t("Ce sourire-là n'est pas de satisfaction personnelle. C'est le sourire de quelqu'un qui vient de recevoir une réponse à une question qu'il portait secrètement. Ces hommes sont là. Vraiment là."),
  t("La citation implicite de Mûsâ — allez combattre, toi et ton Seigneur, nous restons ici (Coran 5:24) — n'a pas été évoquée par hasard lors du conseil. C'est la phrase exacte que les Hébreux avaient dite à Mûsâ devant la Terre sainte. Une phrase de lâcheté immortalisée dans le Coran comme un avertissement."),
  t("Al-Miqdâd avait dit : nous ne sommes pas eux. Et Saʿd ibn Muʿâdh venait de confirmer : nous sommes prêts à aller encore plus loin."),
  t("Le Prophète ﷺ reprend la parole. Il dit une phrase que les sources rapportent avec précision :"),
  i("Avancez et réjouissez-vous. Car par Allah, je vois déjà les positions des morts."),
  t("Ses doigts indiquent des endroits sur le sol. Là. Et là. Et là-bas. Les compagnons regardent le sol poussiéreux. Ils ne voient rien d'autre que de la terre."),
  t("Mais lui voit autre chose. Il voit ce qui va venir. Et dans ce conseil nocturne de la vallée de Ḏhafrân, quelque chose s'est scellé — un engagement collectif qui va traverser la nuit et entrer dans la bataille de demain."),
  t("La prochaine halte : Badr. Les puits. La géographie de cette plaine va tout décider. Et un homme — al-Ḥubâb ibn al-Mundhir — va poser la question que personne d'autre n'osera poser.")
];
data.rdv[66].meditation = {fr:"Un chef qui consulte ne perd pas son autorité — il la fonde. La loyauté donnée librement est la seule qui tient dans la tempête. Saʿd ibn Muʿâdh n'a pas obéi ce soir-là — il a choisi. C'est une différence décisive.",en:'',ar:''};
console.log('RDV 67 done:', data.rdv[66].paragraphes.length, 'para');

// ===== RDV 68 (index 67) — Le puits =====
data.rdv[67].paragraphes = [
  t("Badr est une plaine. Un large creux entre deux rangées de collines basses, à mi-chemin entre Médine et La Mecque. L'endroit doit son nom aux sources et aux puits qui s'y trouvent — une dizaine de bouches d'eau dans un rayon de quelques centaines de mètres."),
  t("C'est un carrefour connu de toutes les tribus. Les marchands s'y arrêtent. Les caravanes y font une halte. En temps normal, c'est un lieu de commerce et de rencontre — une foire qui se tient deux fois l'an."),
  t("Les musulmans arrivent les premiers. Le Prophète ﷺ descend de sa monture et inspecte le terrain. Il marche. Il regarde l'eau, les collines, les accès. Il calcule."),
  t("Il choisit un emplacement — le plus proche du puits principal, sur le côté nord de la plaine. Les hommes commencent à installer le camp."),
  t("Al-Ḥubâb ibn al-Mundhir ibn al-Jamûḥ s'approche. C'est un Anṣârî de Médine, un homme qui connaît les terres du Hijâz comme un paysan connaît son champ. Il a une question. Une vraie question."),
  i("Ya Rasûlallah — cet emplacement que tu as choisi, est-ce une révélation d'Allah qu'on ne peut pas modifier, ou bien c'est un avis de guerre et une ruse ?"),
  t("La question suspend le temps. Personne d'autre n'aurait osé la poser. Pas parce qu'elle est irrespectueuse — mais parce qu'elle touche quelque chose de sensible : la frontière entre le divin et l'humain dans les décisions du Prophète ﷺ."),
  t("Le Prophète ﷺ répond sans hésiter."),
  i("Non. C'est un avis de guerre et une ruse."),
  t("Cette réponse est un enseignement. Il dit : je suis faillible dans mes jugements humains. Je peux me tromper. Conseillez-moi. C'est précisément pour ça que je consulte."),
  t("Al-Ḥubâb continue. Il dit : cet emplacement n'est pas le bon. Il explique : l'endroit idéal, c'est le puits le plus proche de l'ennemi — on s'y installe, on bouche les autres, on construit un bassin pour nous, et les Quraychites arrivent sans eau."),
  i("Nous aurons de l'eau. Eux n'en auront pas. Et un homme assoiffé ne combat pas."),
  t("Le Prophète ﷺ l'écoute. Il dit : tu as raison. Et il lève le camp."),
  t("Ils marchent jusqu'au puits choisi par al-Ḥubâb. Ils s'y installent. Puis le travail commence — silencieux, nocturne, méthodique."),
  t("Les hommes bouchent les autres puits un par un. Ils portent des pierres, de la terre, des branches. Ils travaillent dans la nuit, à la lumière des étoiles, sans feux — ne pas être vus."),
  t("Puis ils construisent un bassin. Un grand bassin creusé dans le sable, imperméabilisé avec des peaux, rempli d'eau depuis le puits qu'ils contrôlent. Une réserve pour toute la nuit et pour la bataille du lendemain."),
  t("Saʿd ibn Muʿâdh propose d'ériger un abri de bois et de feuilles de palmier sur la hauteur — une plateforme visible depuis toute la plaine. Pour le Prophète ﷺ et Abû Bakr. Un poste de commandement."),
  t("Le Prophète ﷺ accepte. Il s'y installe. Il peut voir depuis là-haut les deux versants de la plaine, les approches, les positions. Et il prie."),
  t("Au matin, les musulmans ont de l'eau. Les Quraychites arrivent et voient les puits bouchés. Ils voient leurs adversaires frais, hydratés, installés sur la position haute. Ils comprennent — trop tard — qu'ils ont perdu l'initiative."),
  t("La leçon d'al-Ḥubâb est entrée dans les manuels militaires de l'islam comme une démonstration que la révélation et la stratégie ne s'opposent pas. Le Prophète ﷺ n'est pas infaillible dans ses décisions humaines. Et reconnaître cela n'est pas une faiblesse — c'est la forme la plus haute d'honnêteté."),
  t("La nuit tombe sur la plaine de Badr. Les deux armées se regardent de loin, séparées par quelques centaines de mètres de sable. Personne ne dort. Puis, vers minuit, il commence à pleuvoir.")
];
data.rdv[67].meditation = {fr:"La vérité ne dépend pas de la bouche qui la porte. Un grand homme est celui qui change d'avis quand un plus humble que lui a raison. Al-Ḥubâb ibn al-Mundhir a posé la question que personne n'osait poser — et c'est elle qui a peut-être décidé de la bataille.",en:'',ar:''};
console.log('RDV 68 done:', data.rdv[67].paragraphes.length, 'para');

// ===== RDV 69 (index 68) — La pluie =====
data.rdv[68].paragraphes = [
  t("La veille de la bataille, les âmes portent un poids qu'on ne voit pas. Il n'y a pas de panique — les hommes du Prophète ﷺ ne paniquent pas à voix haute. Mais les regards sont longs. Les prières sont longues. Les silences le sont aussi."),
  t("Certains soldats prient en marchant, les lèvres muettes, les doigts qui comptent les perles d'un chapelet invisible. D'autres affûtent leurs lames pour la troisième fois de la journée — non pas parce que la lame en a besoin, mais parce que les mains cherchent quelque chose à faire."),
  t("Le sol de Badr est du sable meuble côté musulman. Un sable qui s'enfonce sous les pieds, qui alourdit le pas, qui ferait trébucher un homme qui court. C'est un désavantage physique que tout le monde a remarqué mais que personne ne dit."),
  t("Du côté des Quraychites, le sol est ferme. Une croûte de terre dure et compacte, idéale pour la charge de cavalerie. L'armée de La Mecque a la meilleure position. Elle le sait."),
  t("Puis, vers le milieu de la nuit, le ciel change. Les étoiles disparaissent. Un vent léger vient du nord. Et la pluie commence."),
  t("Pas une averse brutale. Une pluie régulière, douce, insistante. Le genre de pluie qui s'installe et qui dure."),
  t("Coran 8:11 : Quand, de Sa part, Il fit descendre sur vous une eau du ciel pour vous purifier par elle, pour éloigner de vous la souillure de Satan, pour fortifier vos cœurs et affermir vos pieds."),
  t("Trois effets. Les exégètes les commentent un par un. L'eau lave le corps des soldats — et leur état de pureté rituelle leur permet de prier, de demander, d'appeler. Elle repousse les pensées de panique que Satan souffle dans les oreilles des hommes fatigués. Et elle affermit les pieds — littéralement."),
  t("Littéralement : sur le sable meuble des musulmans, la pluie compacte le sol. Le sable se tasse sous les gouttes et devient ferme. La surface qui était dangereuse devient stable."),
  t("Du côté des Quraychites, la même pluie fait l'effet inverse. La croûte de terre dure se délaie et devient boueuse. Ce qui était ferme glisse. Ce qui portait s'enfonce."),
  t("Les soldats musulmans s'endorment sous la pluie. Ibn Hishâm rapporte que le sommeil est tombé sur eux — une torpeur soudaine et collective, comme si quelque chose avait posé une main sur leurs paupières. Ils dorment dans la boue tiède, les armes serrées contre eux."),
  t("Le Prophète ﷺ ne dort pas."),
  t("Il est seul dans l'abri que Saʿd ibn Muʿâdh a fait construire. Abû Bakr est là aussi, assis à l'entrée. Le Prophète ﷺ est debout, face à la pluie, les mains levées."),
  t("Il prie depuis des heures. Les témoins — Abû Bakr, ʿAlî qui monte la garde — entendent sa voix mais ne discernent pas tous les mots. Des bribes parviennent. Des demandes. Des noms d'Allah qu'il invoque l'un après l'autre."),
  i("Allâhumma — ô Allah — ce sont Tes serviteurs qui sont là. Peu d'armes. Peu de provisions. Tes ennemis viennent nombreux."),
  t("Il y a quelque chose dans la prière de cette nuit-là qui n'est pas de la routine. C'est une prière d'homme seul, sans calcul, sans performance — une conversation avec Dieu à une heure où personne d'autre n'écoute. Ou presque."),
  t("La pluie continue. L'abri laisse passer quelques gouttes. Le Prophète ﷺ ne les essuie pas."),
  t("À l'aube, le ciel se dégage. Le soleil commence à pointer à l'est. Les deux terrains sont différents. Un côté ferme, un côté glissant. Les soldats musulmans se réveillent, se lèvent, s'étirent. Ils ne savent pas encore ce que la pluie a fait — mais leurs pieds le savent."),
  t("Dans quelques heures, deux armées vont se regarder en face sur cette plaine mouillée. Un homme va monter dans l'abri de bois et lever les mains une dernière fois. Et cette prière-là, le Prophète ﷺ la dira en pleurant."),
  t("Abû Bakr sera là. Et il devra ramasser le manteau qui glisse des épaules de son ami.")
];
data.rdv[68].meditation = {fr:"Pouvoir dormir avant un péril, c'est un signe. Cela veut dire qu'on a confié la nuit à quelqu'un d'autre. Les soldats de Badr ont dormi dans la boue parce que quelqu'un veillait pour eux — et ce quelqu'un priait seul dans un abri de bois sous la pluie.",en:'',ar:''};
console.log('RDV 69 done:', data.rdv[68].paragraphes.length, 'para');

// ===== RDV 70 (index 69) — La supplication de Badr =====
data.rdv[69].paragraphes = [
  t("L'abri est simple. Quelques troncs de palmier liés ensemble, un toit de feuilles. Saʿd ibn Muʿâdh et ses hommes l'ont construit pendant la nuit, sur la hauteur la plus dégagée du côté musulman — assez haut pour voir toute la plaine."),
  t("Saʿd a posté des gardes au pied de la colline. Il a dit : si quelqu'un touche au Prophète ﷺ, je suis là. C'est une promesse d'Anṣârî — le genre de promesse qu'on tient avec son corps."),
  t("Au matin, le Prophète ﷺ monte dans cet abri. La plaine de Badr s'ouvre devant lui. Et ce qu'il voit le frappe."),
  t("L'armée des Quraychites sort de derrière les collines du côté nord. Elle sort lentement, en ordre — les fanions, les éclaireurs, les fantassins, puis les chevaux. Elle sort et elle s'étale sur la plaine comme une chose qui prend toute la place."),
  t("Mille hommes. Sept cents chameaux. Cent chevaux selon certaines sources. Des cuirasses de métal. Des lances qui brillent sous le soleil du matin. La Mecque au complet — ses guerriers, ses notables, ses chefs de clan."),
  t("Le Prophète ﷺ regarde. Ses lèvres bougent."),
  t("Il lève les mains. Paumes vers le ciel. Voix basse d'abord, puis qui monte."),
  i("Allâhumma — ô Allah — voici Quraych. Elle vient avec sa fierté et son arrogance pour Te défier et démentir Ton Messager. Allâhumma — Ta victoire que Tu m'as promise. Allâhumma — si ce groupe est anéanti aujourd'hui, on ne T'adorera plus sur cette terre."),
  t("Muslim a transmis ce hadith. Les mots sont authentiques. In ahlakta hâdhihi l-ʿiṣâba — si ce groupe périt. Il s'agit de son groupe. Des 313 hommes qui sont en dessous de lui, qui attendent l'ordre."),
  t("Il parle d'eux à Allah comme on parle de quelque chose qu'on aime trop pour le perdre. Il ne dit pas : donne-moi la victoire. Il dit : si Tu les laisses mourir, personne ne T'adorera. C'est une supplique qui engage le sens même de l'histoire."),
  t("Il pleure."),
  t("Abû Bakr ibn Abî Quḥâfa est là, debout à l'entrée de l'abri. Il regarde son ami — l'homme qu'il suit depuis vingt ans, depuis les premières sourates, depuis la grotte de Ḥirâ. Il voit les larmes."),
  t("Le manteau du Prophète ﷺ glisse de ses épaules. Abû Bakr s'avance. Il le ramasse. Il le replace."),
  t("Puis il dit."),
  i("Assez, ya Rasûlallah. Assez. Allah accomplira ce qu'Il t'a promis."),
  t("Ce assez d'Abû Bakr n'est pas de l'impatience — c'est de l'amour. C'est l'amour d'un homme qui ne peut pas supporter de voir l'autre se consumer. Il dit : la promesse est sûre. Tu n'as pas à t'épuiser à la réclamer."),
  t("Le verset descend. Coran 8:9 : Quand vous demandiez le secours de votre Seigneur, Il vous a répondu : Je vais vous aider de mille anges qui se succèdent."),
  t("Mille anges. Non pas pour combattre à la place des hommes — les sources l'indiquent clairement — mais pour les soutenir, les affermir, les remplir de quelque chose qui ressemble à du courage mais qui vient de plus loin."),
  t("Le Prophète ﷺ descend de l'abri. Il marche parmi ses hommes. Il les range en ligne avec un bâton — il s'assure que les rangs sont droits. À un homme qui dépasse légèrement, il touche doucement le ventre avec le bâton pour le faire reculer dans le rang."),
  t("Cet homme — Sawwâd ibn Ġhaziyya — dit : tu m'as fait mal. Et le Prophète ﷺ, au bord de la bataille la plus importante de l'histoire de l'islam, lui tend le bâton et dit : prends ta revanche."),
  t("Sawwâd s'approche et l'embrasse sur le ventre. Il dit : je savais que c'était peut-être la dernière occasion. C'est Ibn Hishâm qui rapporte cette scène. Elle dit quelque chose d'essentiel sur ce que les compagnons vivaient à cet instant."),
  t("Puis le Prophète ﷺ lève la tête vers la plaine. Les Quraychites sont en position. Les tambours battent. Les fanions claquent dans le vent du matin."),
  t("Il dit une phrase courte. Une dernière phrase avant que tout commence.")
];
data.rdv[69].meditation = {fr:"Les plus grands ne sont pas ceux qui n'ont pas peur. Ce sont ceux qui pleurent devant Dieu et qui descendent quand même vers la bataille. La force n'est pas l'absence de larmes — elle est dans ce qu'on fait après avoir pleuré.",en:'',ar:''};
console.log('RDV 70 done:', data.rdv[69].paragraphes.length, 'para');

// ===== SAVE =====
fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
console.log('FILE SAVED OK');

// Verify
const verify = JSON.parse(fs.readFileSync(filePath, 'utf8'));
for(let i=60;i<=69;i++){
  console.log('idx',i,'para:',verify.rdv[i].paragraphes.length,'meditation:',verify.rdv[i].meditation.fr.substring(0,40));
}
