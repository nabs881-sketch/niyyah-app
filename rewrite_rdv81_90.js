const fs=require('fs');
const data=JSON.parse(fs.readFileSync('data/sira.min.json','utf8'));
function t(fr){return{type:'text',content:{fr:fr,en:'',ar:''}};}
function i(fr){return{type:'italic',content:{fr:fr,en:'',ar:''}};}

// RDV 81 — idx 80
data.rdv[80].paragraphes=[
t('Trois cents hommes.'),
t("Le Messager d'Allah ﷺ les emmena lui-même. C'était au mois de Rabîʿ al-Âkhir de l'an trois de l'Hégire — quelques mois après Badr, après les Banû Qaynuqâʿ, après Kaʿb ibn al-Ashraf. La plus grande expédition depuis la bataille. Direction : Bahrân, une région du Ḥijâz, quelque part dans les terres rocailleuses entre Médine et la côte."),
t('Trois cents hommes. Deux mois de marche et de campement.'),
t("Et il ne se passa rien."),
i("Pas d'ennemi rencontré. Pas de combat. Pas de butin. Pas de négociation."),
t("Le Messager d'Allah ﷺ savait ce qu'il faisait en partant avec trois cents hommes pour deux mois dans une région qu'on ne contrôlait pas encore. Bahrân n'était pas au hasard — c'était un lieu que des tribus surveillaient, que des routes traversaient, que des caravanes empruntaient. Une région où la présence de trois cents hommes armés, bien organisés, sous le commandement du Prophète ﷺ, envoyait un message que les mots n'auraient pas pu envoyer aussi clairement."),
i("*Nous sommes là. Nous bougeons librement. Nous campons où nous voulons.*"),
t("Dans l'Arabie de cette époque, la réputation voyageait vite et loin. Un chef capable de déplacer trois cents hommes pour deux mois — de les nourrir, de les faire marcher, de les tenir ensemble sans combat, sans pillage, sans désordre — était un chef que les tribus prenaient en compte."),
t("Les trois cents marchèrent. Ils campèrent. Ils montèrent la garde. Ils firent leurs prières dans la poussière de Bahrân comme ils les faisaient dans la mosquée de Médine. Ils mangèrent leurs provisions. Ils dormirent sous les étoiles du Ḥijâz."),
t("Et ils rentrèrent."),
t("Sans trophée. Sans prisonnier. Sans récit glorieux à raconter aux enfants."),
t("Mais quelque chose avait changé dans les tribus autour de Médine pendant ces deux mois. Les nouvelles circulaient. *\"Les musulmans sont sortis en force. Ils ont campé à Bahrân. Ils sont restés deux mois. Ils ne cherchaient pas le combat — ils se montraient juste.\"* Et dans l'esprit de ceux qui réfléchissaient à ce que cela voulait dire, quelque chose se déplaçait imperceptiblement."),
t("La peur n'est pas toujours bruyante. La plus durable est silencieuse."),
t("Le Messager d'Allah ﷺ rentra à Médine avec ses trois cents hommes. Personne ne chanta de victoire dans les rues. Il n'y avait rien à célébrer dans le sens ordinaire du terme. Mais il y avait quelque chose à comprendre, pour qui regardait : que les deux mois de Bahrân n'étaient pas du temps perdu. Ils étaient de l'espace gagné — dans les esprits, dans les routes, dans ce territoire invisible où les décisions se prennent avant les batailles."),
t("Être là. Vraiment là. Ça suffit parfois.")
];
data.rdv[80].meditation={fr:"La présence dure plus longtemps que les coups. Sois là — vraiment là, vraiment stable — et beaucoup de choses se règlent sans qu'on ait eu à lever la main.",en:'',ar:''};

// RDV 82 — idx 81
data.rdv[81].paragraphes=[
t('Nuʿaym ibn Masʿûd avait trop bu.'),
t("C'était avant l'interdiction du vin — le verset n'était pas encore descendu, et les Arabes buvaient comme ils avaient toujours bu. Nuʿaym était un homme de Ghaṭafân — pas encore musulman, le genre d'homme qu'on retrouve dans toutes les villes à toutes les époques : il connaissait du monde, il écoutait beaucoup, et ce soir-là il parlait trop."),
t("Sulayt ibn an-Nuʿmân était là aussi. Lui était musulman. Il était dans ce lieu de beuverie non pas pour boire mais parce que c'est là qu'on entendait les choses qu'on n'entendait nulle part ailleurs. Les marchands qui passaient. Les nouvelles qui arrivaient avant les nouvelles officielles. Les confidences que le vin extrait des hommes avec une efficacité que ni la prière ni la torture n'égalent."),
t("Il écoutait. Et Nuʿaym parla."),
t("Il dit que Quraych avait trouvé une nouvelle route. La côte était perdue pour eux — depuis que les musulmans contrôlaient les abords de Médine. Alors Quraych avait cherché un autre chemin : vers l'est d'abord, par le Najd, puis par l'Irak — contournant Médine par le sud et l'est, traversant des terres que personne ne surveillait."),
t("Ils avaient un guide. Un bédouin qui connaissait chaque puits, chaque passe de cette région. Il s'appelait Furât ibn Ḥayyân. Et la caravane était en route. Safwân ibn Umayyâ la conduisait. Cent mille dirhams de marchandises. Assez pour financer une nouvelle armée."),
t("Sulayt ibn an-Nuʿmân posa son verre."),
t("Il se leva tranquillement et sortit. Il marcha rapidement vers la maison du Messager d'Allah ﷺ. Il frappa. Il entra. Il raconta tout ce qu'il venait d'entendre."),
t("Le Prophète ﷺ agit sans délai. Cent cavaliers. Sous le commandement de Zayd ibn Ḥâritha. Une route oblique, coupant à travers le désert, calculée pour intercepter la caravane de Safwân à un puits appelé al-Qirada."),
t("Ils arrivèrent les premiers. Ils attendirent."),
t("Quand la caravane de Safwân apparut au creux des dunes, il était trop tard pour fuir. Safwân vit les cent cavaliers et comprit. Il fit demi-tour immédiatement — lui et ses gardes prirent leurs chevaux et disparurent dans le désert, abandonnant les chameaux, les marchandises, les cent mille dirhams, et Furât ibn Ḥayyân le guide, qui fut capturé."),
t("Zayd ibn Ḥâritha rentra à Médine avec tout."),
t("Furât ibn Ḥayyân, le bédouin qui connaissait chaque puits du Najd, embrassa l'islam plus tard. L'homme qui avait guidé la dernière grande caravane de Quraych finit dans les rangs de ceux qu'il avait aidé à contourner."),
t("Tout ça avait commencé avec un homme qui parlait trop dans un lieu de beuverie. Allah utilise ce qu'Il trouve à portée.")
];
data.rdv[81].meditation={fr:"Ce qui semble petit n'est jamais petit. Une parole lâchée au mauvais moment ouvre ou ferme des chemins entiers. Écoute ce que tu n'es pas censé entendre — et dis ce que tu es censé dire.",en:'',ar:''};

// RDV 83 — idx 82
data.rdv[82].paragraphes=[
t('ʿAlî ibn Abî Tâlib avait quelque chose à demander.'),
t("Il l'avait dans la tête depuis un moment — depuis qu'il avait commencé à regarder Fâtima d'une façon différente de celle dont on regarde la fille du Prophète ﷺ quand on est son cousin et qu'on a grandi avec elle."),
t("Il alla trouver le Messager d'Allah ﷺ."),
t("Ce n'était pas la première demande. Abû Bakr était venu avant lui — le premier croyant, l'ami du Prophète ﷺ depuis La Mecque. Il avait demandé Fâtima. Le Prophète ﷺ l'avait remercié avec douceur et lui avait dit non. ʿUmar était venu aussi. Même réponse."),
t("ʿAlî se présenta donc avec cette histoire derrière lui — deux hommes plus établis que lui avaient essuyé un refus. Il était le plus jeune des trois. Le moins riche certainement."),
i('Le Messager d\'Allah ﷺ le regarda arriver et dit simplement : *"As-tu quelque chose ?"*'),
i('ʿAlî dit : *"Rien."*'),
i('*"Et ta cuirasse ?"*'),
i('*"J\'ai ma cuirasse."*'),
i('*"Vends-la."*'),
t("ʿAlî alla trouver ʿUthmân ibn ʿAffân — le veuf récent de Roqayya. ʿUthmân acheta la cuirasse. Quatre cent quatre-vingts dirhams. Une somme qu'il posa dans les mains d'ʿAlî sans marchander."),
t("ʿAlî revint avec l'argent. Le Messager d'Allah ﷺ appela Anas ibn Mâlik et lui dit d'aller acheter ce qu'il fallait pour une maison nouvelle."),
t("Ce qu'on acheta avec quatre cent quatre-vingts dirhams pour la fille du Messager d'Allah ﷺ : une peau de bélier pour s'asseoir. Un coussin rempli de fibres de palmier. Un moulin à main. Deux jarres d'eau en argile. Une écuelle de bois."),
i("Voilà."),
t("Pas de tentures. Pas de bijoux. Pas de servante. Pas de lit en bois sculpté. La fille du Prophète ﷺ allait commencer sa vie conjugale sur une peau de bélier avec un coussin de fibres de palmier."),
t("Le Prophète ﷺ maria ʿAlî et Fâtima sans cérémonie excessive. Quelques dattes. Du lait. Une prière. Une bénédiction. Il les laissa ensemble."),
t("Fâtima était jeune — quinze ans peut-être. ʿAlî avait une vingtaine d'années. Ils se retrouvèrent seuls dans une pièce qui contenait une peau de bélier, un coussin, un moulin et deux jarres."),
t("Plus tard, Fâtima vint trouver son père. Elle avait les paumes abîmées. Le moulin à grain y avait laissé ses marques — des callosités, de la peau durcie. Elle vint demander une servante qui l'aiderait dans les travaux de la maison."),
t('Le Messager d\'Allah ﷺ l\'écouta. Puis il dit : *"Veux-tu que je t\'enseigne quelque chose de meilleur qu\'une servante ? Quand tu vas te coucher — dis trente-trois fois subḥân Allah, trente-trois fois al-ḥamdu lillâh, trente-quatre fois Allahu akbar."*'),
t("Fâtima dit plus tard qu'elle n'avait plus jamais manqué ce dhikr du soir depuis que son père le lui avait enseigné."),
t("C'est la dot que cette famille a donnée au monde. Pas l'or. Pas les terres. Une formule à réciter avant de dormir, qui a traversé quatorze siècles et qui est dans la bouche de millions de personnes chaque soir.")
];
data.rdv[82].meditation={fr:"Les plus grandes maisons commencent souvent dans le presque rien. Ce qu'on y porte décide de tout — pas ce qu'on y achète. Une peau de bélier et un dhikr valent plus que tous les meubles du monde si on y met ce qu'il faut.",en:'',ar:''};

// RDV 84 — idx 83
data.rdv[83].paragraphes=[
t("L'enfant naquit l'an trois de l'Hégire."),
t("Dans la maison de ʿAlî et Fâtima — la pièce avec la peau de bélier et le coussin de fibres de palmier, le moulin et les deux jarres d'argile. Une naissance comme toutes les naissances : douloureuse, longue, attendue. Fâtima avait peut-être seize ans. Elle venait de donner à son mari et à son père quelque chose que ni l'or ni les prières n'auraient pu acheter."),
t("Un fils."),
t("On alla chercher le Messager d'Allah ﷺ."),
t("Il arriva. Il prit l'enfant dans ses bras — ce petit corps rouge et froissé, les yeux encore fermés sur le monde qu'il venait de rejoindre. Il le tint contre lui un moment. Puis il se pencha vers l'oreille droite du nouveau-né."),
t("Et il dit l'adhân."),
i("*Allahu akbar. Allahu akbar. Ashhadu an lâ ilâha illâ Allah.*"),
t("La voix du grand-père dans la première oreille. Pas un prénom. Pas une bienvenue dans le langage des hommes. Le nom d'Allah — le premier son que ce garçon entendrait dans ce monde, avant les voix de sa mère, avant le bruit du vent, avant tout le reste."),
t("Il choisit le nom. Ḥasan. Le Beau."),
t("L'année suivante naquit Ḥusayn."),
t("Deux fils que le Messager d'Allah ﷺ aimait d'une façon qui surprenait parfois les compagnons — pas parce qu'elle était excessive, mais parce qu'elle était si visible, si peu cachée. Il les portait sur son dos pendant la prière. Quand il était en prosternation et qu'ils grimpaient sur lui, il prolongeait la prosternation jusqu'à ce qu'ils descendent d'eux-mêmes. Les compagnons pensaient qu'une révélation était descendue — il relevait la tête et disait simplement : *\"Mon fils était sur moi. Je ne voulais pas le bousculer.\"*"),
t("Il interrompait ses khuṭba quand il les voyait trébucher en courant vers lui entre les rangs."),
t('Il dit d\'eux une phrase que Tirmidhî rapporte : *"Ḥasan et Ḥusayn sont les chefs des jeunes du Paradis."*'),
t("Il disait aussi qu'ils étaient ses deux fleurs de ce monde. Rayḥânatây. Ses deux basils. Les deux parfums qu'Allah lui avait donnés dans cette vie."),
t("On a beaucoup parlé du Prophète ﷺ comme chef militaire, comme législateur, comme homme d'État. Mais il y a une image qu'on montre moins. Celle de l'homme qui rampait à quatre pattes sur le sol de sa maison pendant que deux petits garçons montaient sur son dos en criant. Les compagnons l'auraient trouvé ainsi — accroupi, les genoux sur le tapis, deux enfants accrochés à ses épaules."),
t("Cet homme-là aussi était le Messager d'Allah ﷺ. Peut-être même que c'est lui — le grand-père qui rampe, qui prolonge sa prosternation, qui souffle l'adhân dans une petite oreille avant le premier bruit du monde — qui dit quelque chose d'essentiel sur ce que signifie porter la religion. Pas comme un fardeau. Comme quelque chose qu'on murmure doucement à celui qui vient d'arriver, avant même qu'il puisse comprendre.")
];
data.rdv[83].meditation={fr:"Ce qu'on murmure à un enfant à sa naissance, il l'entend toute sa vie — même sans s'en souvenir. Choisis le premier mot. Choisis ce que tu poses dans sa première oreille. C'est une fondation.",en:'',ar:''};

// RDV 85 — idx 84
data.rdv[84].paragraphes=[
t('À La Mecque, on ne dormait plus.'),
t("Pas depuis Badr. Pas depuis le jour où les nouvelles étaient arrivées une par une — ʿUtba mort, Shayba mort, Abû Jahl mort, al-Walîd mort — et où les femmes avaient compris que les hommes qu'elles attendaient ne reviendraient pas. Les maisons de La Mecque avaient une autre texture depuis ce jour-là. Quelque chose de plus silencieux. Quelque chose de creux à l'endroit où les voix avaient été."),
t("Hind bint ʿUtba ne pleurait pas."),
t("Elle avait perdu à Badr ce qu'une femme peut perdre — son père ʿUtba ibn Rabîʿa, son frère al-Walîd, son oncle Shayba, son fils Ḥanẓala ibn Abî Sufyân. Quatre hommes de son sang dans un seul jour. Elle n'avait pas pleuré dans les rues comme les autres. Elle avait attendu. Elle avait rentré sa douleur dans un endroit où la douleur devient quelque chose d'autre — quelque chose de froid, de concentré, de durable."),
t("Elle attendait."),
t("Abû Sufyân commença à travailler — discrètement d'abord, en convoquant les alliés, en envoyant des messagers, en faisant circuler l'argent qui restait des profits de la grande caravane sauvée l'année précédente. Car voilà ce qu'Abû Sufyân avait fait avec cet argent — il ne l'avait pas touché. Personne à La Mecque n'y avait touché. Depuis un an, cet argent dormait dans des coffres, intact, comme la promesse d'une revanche qu'on garde au frais pour qu'elle ne tourne pas."),
t("On utilisa cet argent pour acheter des armes. Pour payer des mercenaires. Pour convaincre des tribus — les Aḥâbîsh, les Kinâna, d'autres — d'envoyer des hommes. Les émissaires revinrent avec des engagements."),
i("Trois mille hommes. Sept cents en armures complètes. Deux cents chevaux. Trois mille chameaux."),
t("Et quinze femmes."),
t("Hind bint ʿUtba les avait recrutées elle-même — des épouses de chefs, des femmes de noble extraction qui acceptèrent de partir non pas pour combattre mais pour chanter. Pour frapper les tambours. Pour empêcher les hommes de reculer en les menaçant de leur honte publique."),
i("Hind aurait dit, ce soir-là, avant le départ : *\"Si vous avancez, nous vous embrasserons. Si vous reculez, nous nous séparerons de vous — et jamais plus vous ne retrouverez nos bras.\"*"),
t("C'était calculé. Un homme peut mourir pour de nombreuses raisons. Mais il recule rarement quand les femmes qui l'aiment le regardent avec ça dans les yeux — cette promesse d'abandon définitif."),
t("L'armée se forma aux abords de La Mecque. Les chameaux. Les chevaux. Les cuirasses qui brillaient dans le soleil du matin. Les tambours que les femmes portaient en bandoulière. L'odeur du cuir et du métal et de la sueur d'une armée qui se prépare depuis trop longtemps."),
t("Ce n'était pas une armée portée par la foi. Pas une armée portée par la conviction d'avoir raison. C'était une armée portée par la honte — et c'est le combustible le plus violent qui soit. La foi s'épuise parfois. La conviction se discute. La honte, elle, ne supporte pas la discussion. Elle brûle jusqu'à ce qu'elle ait trouvé ce qu'elle cherchait."),
t("Elle cherchait Médine.")
];
data.rdv[84].meditation={fr:"Méfie-toi des ennemis humiliés. Ils ne se battent pas pour gagner. Ils se battent pour ne plus avoir honte. Et ça — ça ne s'arrête pas à mi-chemin.",en:'',ar:''};

// RDV 86 — idx 85
data.rdv[85].paragraphes=[
t('Le Prophète ﷺ avait rêvé.'),
t('Il l\'annonça lui-même à ses compagnons, le matin, avant même que la nouvelle de l\'armée quraychite n\'ait fini de se répandre dans Médine. Il dit : *"J\'ai vu en rêve des vaches qu\'on égorgeait. J\'ai vu mon épée se briser à la garde. Et j\'ai vu ma main glisser dans une cotte de mailles solide."*'),
t('Trois images. Trois choses à interpréter.'),
t("Il interpréta lui-même. Les vaches égorgées : des compagnons qui mourront. L'épée brisée à la garde : un homme proche qui sera blessé ou tué. La cotte de mailles : Médine — l'enceinte protectrice. Mieux vaut rester à l'intérieur."),
t('Il convoqua ses compagnons. Il s\'assit parmi eux et leur dit ce qu\'il avait vu. Puis il dit son avis, clairement : *"Je pense que nous devrions rester à Médine. Si l\'ennemi entre, nous combattons dans les rues. Les femmes nous aideront du haut des toits. Si l\'ennemi campe dehors et attend — il devra repartir bredouille."*'),
t("ʿAbdullâh ibn Ubayy ibn Salûl approuva immédiatement. Les anciens approuvèrent. Des hommes qui avaient l'expérience des guerres et qui savaient ce que signifiait combattre dans sa propre ville."),
t("Mais les jeunes ne voulaient pas entendre ça. Surtout ceux qui n'avaient pas été à Badr — ceux qui étaient restés à Médine et qui vivaient depuis un an avec cette absence dans leur histoire personnelle. Ils voulaient leur bataille."),
i('Ils dirent : *"Ô Messager d\'Allah — sortons ! Affrontons-les en plein champ ! Nous ne voulons pas qu\'on dise que les Quraychites sont venus jusque chez nous et que nous nous sommes cachés derrière nos murs !"*'),
i("Ils voulaient leur Badr à eux."),
t("Le Messager d'Allah ﷺ écouta. Il écouta longtemps — avec cette patience qu'il avait quand il voulait que tout le monde soit entendu. Puis il décida de sortir, tenant compte de l'élan de ses compagnons."),
t("Il rentra chez lui. Il prit son armure — pièce par pièce, avec le soin de quelqu'un qui sait ce qu'il fait. Les jambières, la cotte de mailles, le casque. Il sortit."),
t('Et les jeunes qui avaient réclamé le combat — dès qu\'ils virent le Prophète ﷺ en armure — regrettèrent. Ils vinrent vers lui et dirent : *"Ô Messager d\'Allah — nous t\'avons forcé. Si tu veux, reste à Médine. C\'est toi qui décides."*'),
t('Le Prophète ﷺ les regarda. Il dit :'),
i('*"Il ne sied pas à un Prophète, une fois qu\'il a mis son armure, de la retirer avant d\'avoir combattu."*'),
t("Ce n'était pas de la rigidité. C'était une leçon sur ce que signifie décider — que la décision prise sous le regard d'Allah ne se reprend pas à la légère."),
t("Les vaches du rêve l'attendaient. L'épée allait se briser. La cotte de mailles de Médine était derrière eux maintenant."),
t("Ils marchèrent vers Uḥud.")
];
data.rdv[85].meditation={fr:"Une fois ta décision prise sous le regard d'Allah, tiens-la. Même si tu l'as prise contre ton premier instinct. La parole donnée — même à soi-même, même dans le silence — vaut plus que le confort de revenir en arrière.",en:'',ar:''};

// RDV 87 — idx 86
data.rdv[86].paragraphes=[
t('Mille hommes sortirent de Médine.'),
t("Ils marchèrent ensemble jusqu'à la tombée de la nuit, campèrent, repartirent à l'aube. La route vers Uḥud n'était pas longue — la montagne était au nord de la ville, à moins d'une heure de marche pour des hommes pressés. Mais le Prophète ﷺ ne pressait pas. Il laissait les hommes avancer à leur rythme, garder leurs forces, garder leurs esprits."),
t("Ils arrivèrent à un endroit appelé ash-Shawṭ."),
t("Là, ʿAbdullâh ibn Ubayy ibn Salûl s'arrêta. Il n'avait pas l'air d'un homme qui hésite — il avait l'air d'un homme qui a déjà décidé et qui attendait simplement le bon moment pour le dire. Il s'arrêta, se retourna vers les siens, et dit d'une voix haute — pas en aparté, pas en confidence, mais pour être entendu :"),
i('*"Il n\'a pas écouté mon conseil. Il a écouté ces gamins qui ne savent rien de la guerre. Pourquoi me ferais-je tuer ici pour une décision que je n\'aurais pas prise ?"*'),
t("Puis il fit demi-tour."),
t("Trois cents hommes le suivirent. Pas en silence, pas en honte — ils partirent presque ouvertement, comme des gens qui exercent un droit. Un tiers de l'armée. Disparu en quelques minutes sur la route du retour vers Médine."),
t("Parmi ceux qui restaient, le choc fut immédiat. Des compagnons se retournèrent pour regarder partir leurs voisins, leurs cousins, des hommes avec qui ils avaient mangé et prié depuis des années. Deux clans anṣârî chancelèrent — les Banû Salima et les Banû Ḥâritha. Des voix dans leurs rangs dirent : *\"Revenons aussi.\"*"),
t("Et puis ils restèrent."),
t("Ce n'est pas anodin. Le Coran lui-même en parlerait — *\"Deux de vos groupes faillirent défaillir, et Allah fut leur protecteur. C'est en Allah que les croyants doivent se fier.\"* (3:122) — comme si la tentation de partir avait été réelle, documentée, pesée, et que le fait d'être restés méritait d'être dit."),
t("Ils restèrent. Sept cents. Contre trois mille."),
t("Le Messager d'Allah ﷺ ne courut pas après ʿAbdullâh ibn Ubayy. Il ne le supplia pas. Il ne lui envoya personne pour le convaincre. Il le regarda partir avec ce regard qu'il avait parfois — celui de l'homme qui comprend quelque chose sur un autre et qui sait qu'il n'y a rien à faire avec cette compréhension sauf en prendre acte."),
t("Il y a des cœurs qu'on ne convainc pas. Des présences qu'on ne peut pas forcer. Le Messager d'Allah ﷺ savait mieux que quiconque la différence entre quelqu'un qui résiste et qu'on peut encore toucher, et quelqu'un qui a déjà choisi et qu'aucun mot n'atteindra plus."),
t("ʿAbdullâh ibn Ubayy avait choisi."),
t("Ce jour-là, quelque chose reçut son vrai nom à Médine. Le mot existait déjà — munâfiqûn, les hypocrites, ceux dont le dehors ne correspond pas au dedans. Avec le départ de ces trois cents hommes à mi-chemin d'Uḥud, il désignait maintenant quelque chose d'identifiable, de visible, de nommable."),
t("Des hommes qui priaient avec toi le matin. Qui mangeaient à ta table. Qui disaient les mêmes mots que toi dans la même langue. Et qui faisaient demi-tour quand venait l'heure de vérité — pas en courant, pas en se cachant, mais calmement, comme si la fidélité était négociable selon les circonstances."),
t("Le Prophète ﷺ continua vers Uḥud avec sept cents hommes.")
];
data.rdv[86].meditation={fr:"Il y a des départs qui font plus de mal que des coups. Mais ils éclaircissent les rangs. Mieux vaut savoir tôt qui ne marchera pas avec toi jusqu'au bout — que de l'apprendre au mauvais moment, au mauvais endroit.",en:'',ar:''};

// RDV 88 — idx 87
data.rdv[87].paragraphes=[
t('Uḥud.'),
t("Une montagne de granit rouge au nord de Médine — longue, massive, qui barre l'horizon comme un mur posé par la terre elle-même. Pas un pic isolé. Un flanc immense, presque rectiligne, qui court du nord-ouest au sud-est sur plusieurs kilomètres. Au pied de ce flanc, une plaine ouverte. De l'espace pour une armée. De l'espace pour une bataille."),
t("Le Messager d'Allah ﷺ regarda le terrain."),
t("Il vit ce qu'un homme qui pense en termes de vie et de mort voit quand il regarde un terrain de bataille — pas le paysage, pas les couleurs du granit dans le matin, mais les angles, les hauteurs, les passages, les failles. Il vit que la montagne dans le dos était une protection que rien d'autre ne pouvait offrir. Il vit la plaine devant — ouverte, dure, sans obstacle. Et il vit, sur le flanc gauche, une dépression dans le terrain, un passage étroit entre deux éminences rocheuses."),
i("Al-ʿaynay. Le défilé des deux yeux."),
t("C'était par là que viendrait le danger. Si des cavaliers contournaient la plaine et débouchaient par ce passage dans le dos des musulmans — l'armée serait prise en sandwich. Entre les fantassins de face et les chevaux de derrière, il ne resterait plus rien à faire que mourir."),
t("Le Prophète ﷺ appela ʿAbdullâh ibn Jubayr."),
t("Un homme de confiance. Un Anṣârî de Médine — pas le plus célèbre des compagnons, pas le plus puissant, mais le bon choix pour une mission qui demandait non pas de l'héroïsme mais de la constance. ʿAbdullâh ibn Jubayr était le genre d'homme qui tient ce qu'on lui confie."),
t("Cinquante archers. Le Prophète ﷺ les positionna lui-même au sommet du défilé — là où leurs flèches pouvaient couvrir le passage en entier et où leur position serait difficile à prendre d'assaut."),
t("Puis il se tourna vers eux. Et il dit :"),
i('*"Protégez nos arrières. Si vous nous voyez gagner et l\'ennemi fuir — ne descendez pas. Si vous nous voyez perdre et les corbeaux manger nos cadavres — ne descendez pas non plus. Restez ici. Ne quittez pas ce poste jusqu\'à ce que je vous envoie chercher."*'),
t("Il le répéta avec insistance — plusieurs fois, avec un soin particulier dans les mots — comme quelqu'un qui comprend que ce qu'il dit là est le point central de tout ce qui va suivre."),
t("Les archers acquiescèrent. Ils prirent leurs arcs. Ils montèrent."),
t("De là-haut, ils voyaient tout. La plaine en contrebas. Les rangs des sept cents qui se formaient en arc de cercle devant la montagne. Et au loin, de l'autre côté de la plaine, quelque chose qui bougeait — la masse sombre de l'armée quraychite qui se déployait, lentement, avec l'assurance de ceux qui ont le nombre pour eux."),
t("Trois mille contre sept cents."),
t("ʿAbdullâh ibn Jubayr regarda ses cinquante hommes. Ils étaient jeunes pour la plupart. Ils avaient leurs arcs, leurs carquois, leurs positions. Ils avaient l'ordre."),
t("L'ordre était simple. Il n'y avait rien à interpréter, rien à discuter, rien à comprendre au-delà de ce que les mots disaient : ne descendez pas, quoi qu'il arrive."),
t("Ce qui allait décider de tout — la victoire ou la défaite, la vie ou la mort du Prophète ﷺ lui-même — tiendrait à leur capacité à rester là où ils étaient. Pas à leur bravoure. Pas à leur force. À leur obéissance."),
t("Ils ne le savaient pas encore.")
];
data.rdv[87].meditation={fr:"Les ordres les plus importants sont parfois les plus simples. Ce sont aussi ceux qu'on désobéit le plus facilement — parce qu'on ne voit pas, dans l'instant, pourquoi ils comptent autant. La grandeur est dans l'obéissance à ce qui a été dit clairement.",en:'',ar:''};

// RDV 89 — idx 88
data.rdv[88].paragraphes=[
t('La nuit tomba sur le camp.'),
t("Sept cents hommes s'installèrent au pied d'Uḥud. Ils n'avaient pas beaucoup de place — la plaine entre la montagne et l'armée de Quraych n'était pas large. Ils serrèrent les rangs, disposèrent les gardes, firent leurs prières. Les feux de camp qu'ils allumèrent étaient petits — assez pour se chauffer, pas assez pour se signaler inutilement."),
t("En face, quelque part dans l'obscurité de la plaine, trois mille hommes faisaient la même chose à leur manière. On entendait parfois un bruit de cheval, un cliquetis de métal, une voix qui portait plus que les autres avant de se fondre dans le silence."),
t("Le Messager d'Allah ﷺ passa en revue ses hommes avant de se retirer. Il marchait le long des rangs et regardait les visages — pas en général, pas de loin, mais de près, avec l'attention de quelqu'un qui veut savoir ce qui est là dedans."),
t("Il s'arrêta devant les jeunes. Car il y avait des jeunes — trop jeunes, certains. Des garçons qui s'étaient glissés dans les rangs en se tenant droits, en se faisant aussi grands que possible, espérant passer inaperçus."),
t("Râfiʿ ibn Khadîj. Quinze ans. Il avait mis quelque chose sous ses sandales pour paraître plus grand. Quelqu'un avait dit : *\"Celui-là est fort, entraîne-le.\"* On l'avait accepté."),
t("Samura ibn Jundub. Quinze ans aussi. Le Prophète ﷺ le regarda et dit : *\"Retourne à Médine.\"*"),
t("Samura ne bougea pas. Il regarda Râfiʿ qui était accepté. Il dit : *\"Si tu l'acceptes, lui, alors accepte-moi. Je peux le mettre à terre à la lutte.\"*"),
t("On les fit lutter là, devant les rangs, dans la poussière du camp, à la lumière des feux. Deux garçons de quinze ans qui se prenaient à bras le corps pendant qu'une bataille se préparait de l'autre côté de la plaine. Samura saisit Râfiʿ, le souleva, le posa par terre."),
i('Le Prophète ﷺ dit : *"Montrez-moi."*'),
i('Le Prophète ﷺ dit : *"Vous êtes tous les deux acceptés."*'),
t("ʿAbdullâh ibn ʿUmar avait quatorze ans. Il se tenait là dans la nuit d'Uḥud avec son désir d'être présent pour ce qui allait se passer. Le Prophète ﷺ le regarda et dit non."),
t("ʿAbdullâh ibn ʿUmar pleurait encore quand son père le retrouva pour le ramener à Médine. Les sources rapportent ses larmes avec une précision qui dit que personne n'avait oublié ce détail — le futur grand imam de l'islam, pleurant comme un enfant parce qu'il ne pouvait pas aller se battre."),
t("Il attendrait le Khandaq."),
i("Des enfants qui se battent pour avoir le droit de combattre. Pas par ivresse de guerre. Par amour pour celui qu'ils suivaient."),
t("Puis vint le silence. Les hommes s'allongèrent. Certains dormirent — vite, d'un sommeil de ceux qui n'ont plus d'énergie pour rester éveillés. D'autres restèrent les yeux ouverts dans l'obscurité, à écouter le bruit de la plaine, à penser à ce qu'ils laisseraient si demain se passait mal."),
t("Hamza veillait. Hamza ibn ʿAbd al-Muṭṭalib — l'oncle, le lion d'Allah, l'homme qui avait porté le premier drapeau de l'islam. Il priait, dit-on — debout dans la nuit d'Uḥud avec ce visage qu'il avait parfois, concentré, tourné vers l'intérieur."),
t("Et quelque part de l'autre côté de la plaine, un homme attendait."),
t("Il s'appelait Waḥshî ibn Ḥarb. Un esclave éthiopien — grand, précis, spécialiste d'une arme que personne d'autre n'utilisait vraiment dans la péninsule : la lance à jet des Abyssins, longue, équilibrée, qu'on lançait d'une distance précise avec une technique que ses ancêtres lui avaient transmise. Il ne ratait jamais."),
t("Hind bint ʿUtba lui avait fait une promesse — des bijoux, l'affranchissement, tout ce qu'un esclave peut désirer. En échange d'un nom. Un seul nom. Ḥamza ibn ʿAbd al-Muṭṭalib."),
t("Waḥshî l'avait identifié. Il avait repéré un rocher derrière lequel il pourrait s'abriter, d'où il aurait l'angle, la distance, la clarté. Il attendait l'aube. Hamza priait dans le camp des musulmans, à quelques centaines de mètres, sans savoir qu'un homme avait déjà dessiné sa mort dans sa tête.")
];
data.rdv[88].meditation={fr:"Il y a des veilles où l'on ne sait rien de ce qui vient. C'est dans ces nuits-là qu'on découvre ce qu'on est vraiment — non pas ce qu'on fait, mais comment on attend ce qu'on ne peut pas empêcher.",en:'',ar:''};

// RDV 90 — idx 89
data.rdv[89].paragraphes=[
t("L'aube se leva sur la plaine d'Uḥud d'une façon ordinaire."),
t("Le soleil qui perce derrière les collines à l'est. La lumière qui glisse d'abord sur le granit rouge de la montagne, puis descend lentement vers la plaine, puis touche les hommes qui attendaient dans l'obscurité depuis des heures. Une aube comme les autres — sauf que ceux qui la regardaient ce matin-là savaient que c'était peut-être la dernière."),
t("Les rangs se formèrent."),
t("Le Messager d'Allah ﷺ disposa ses sept cents hommes avec soin — l'arc de cercle dos à la montagne, les flancs serrés, les archers déjà en position sur le défilé au-dessus. ʿAbdullâh ibn Jubayr était là-haut avec ses cinquante hommes, les arcs bandés, les carquois pleins. De leur hauteur, ils voyaient tout — la plaine en dessous, les sept cents en rang, et de l'autre côté, l'armée de Quraych qui se déployait dans la lumière du matin."),
t("Trois mille hommes. La distance entre les deux armées était assez grande pour qu'on ait encore le temps de penser. Les archers sur le défilé regardaient. Ils comptaient — les chevaux, les cuirasses, les rangs. Ils faisaient la soustraction. Trois mille moins sept cents — c'est un nombre qui pèse lourd dans la poitrine d'un homme debout sur une crête avec un arc à la main."),
t("L'ordre du Prophète ﷺ résonnait dans leur tête."),
i('*"Ne bougez pas. Quoi qu\'il arrive. Même si vous nous voyez gagner. Même si vous nous voyez perdre. Même si vous voyez les corbeaux manger nos cadavres — ne bougez pas."*'),
t("Des mots clairs. Sans nuance. Sans condition cachée."),
t("Dans la plaine, l'armée de Quraych finissait de se mettre en ordre. Khalid ibn al-Walîd commandait l'aile droite de cavalerie — deux cents chevaux, une force de choc capable de déborder les flancs d'une armée en quelques minutes. Il était encore l'ennemi ce matin-là. Mais même comme ennemi, il était ce qu'il était : le meilleur tacticien de la péninsule arabique, l'homme qui ne regardait pas seulement où se trouvait l'armée adverse mais où elle pourrait se retrouver dans dix minutes."),
t("Il avait vu le défilé. Il savait ce que représentait ce passage."),
t("Il avait essayé de le déborder dès le début de la bataille — et les flèches des archers l'avaient repoussé. Tant que les cinquante hommes tenaient leur position là-haut, l'aile gauche des musulmans était couverte. Khalid ne pouvait pas passer."),
t("En bas, les rangs s'affrontèrent."),
t("Hamza s'avança — l'épée haute, le bouclier au bras gauche, en criant son cri de guerre : *\"Je suis le fils du porteur de l'outre !\"* Il chargea."),
t("Derrière lui, les rangs suivirent. La première phase de la bataille fut un succès musulman. Les Quraychites reculèrent sous la pression des sept cents — qui combattaient avec la concentration des gens qui n'ont pas de marge d'erreur. L'armée de Quraych pliait."),
t("Et c'est là — précisément là, dans ce moment de victoire partielle, dans cette odeur de triomphe prématuré — que les archers sur le défilé commencèrent à voir autre chose que leur mission."),
t("Ils voyaient leurs frères descendre dans la plaine pour ramasser le butin. Ils voyaient les Quraychites fuir. Et ils commencèrent à se dire — certains d'entre eux, pas tous, mais assez — que l'ordre du Prophète ﷺ avait peut-être été donné pour un scénario différent. Que là, maintenant, avec l'ennemi en fuite, peut-être que descendre n'était pas vraiment désobéir."),
i('ʿAbdullâh ibn Jubayr dit : *"N\'oubliez pas ce que le Prophète ﷺ nous a dit."*'),
t('Certains dirent : *"Mais la bataille est gagnée."*'),
i('Il dit : *"L\'ordre n\'avait pas de condition."*'),
t("Certains restèrent. D'autres descendirent. Quarante hommes quittèrent la crête."),
t("En bas, Khalid ibn al-Walîd vit le défilé s'ouvrir. Il n'attendit pas une seconde. Il fit tourner ses chevaux, fonça vers le passage, déboucha dans le dos des musulmans."),
t("Ce qui avait ressemblé à une victoire allait changer de nature en quelques minutes.")
];
data.rdv[89].meditation={fr:"Les vrais tests arrivent au moment où l'on croit que tout est gagné. Ce qu'on fait à cet instant précis — quand la tentation est la plus douce parce qu'elle ressemble à de la raison — décide de tout.",en:'',ar:''};

fs.writeFileSync('data/sira.min.json',JSON.stringify(data),'utf8');
console.log('Done rdv81-90');
console.log('rdv81 paras:',data.rdv[80].paragraphes.length);
console.log('rdv82 paras:',data.rdv[81].paragraphes.length);
console.log('rdv83 paras:',data.rdv[82].paragraphes.length);
console.log('rdv84 paras:',data.rdv[83].paragraphes.length);
console.log('rdv85 paras:',data.rdv[84].paragraphes.length);
console.log('rdv86 paras:',data.rdv[85].paragraphes.length);
console.log('rdv87 paras:',data.rdv[86].paragraphes.length);
console.log('rdv88 paras:',data.rdv[87].paragraphes.length);
console.log('rdv89 paras:',data.rdv[88].paragraphes.length);
console.log('rdv90 paras:',data.rdv[89].paragraphes.length);
