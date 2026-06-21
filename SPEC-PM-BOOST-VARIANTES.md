# SPEC-PM-BOOST-VARIANTES

## Objectif
Remplacer boost: 'texte unique' par boost: ['V0',...,'V6'] dans _PM_PROFILES.
Le boost affiché = boost[new Date().getDay()] (0=dim, 1=lun, ..., 6=sam).

## script.js — dans renderPM(), où le boost est affiché

Trouve la ligne qui lit p.boost (dans renderPM ou _renderPMBoost) :
Remplace :
  var _boost = pb.boost;
Par :
  var _boost = Array.isArray(pb.boost) ? pb.boost[new Date().getDay() % pb.boost.length] : pb.boost;

## script.js — dans _PM_PROFILES, remplacer les 8 boost

### Profil 0 (vidé / épuisé)
Remplace boost: '...' (texte existant) par :
boost: [
  'La salah n\'est pas un effort de plus à fournir. C\'est l\'endroit où tu poses le poids. Allah ne te demande pas d\'arriver plein — Il te demande d\'arriver. Laisse ton corps faire les gestes. Laisse ton cœur souffler. C\'est ça, la prière de l\'épuisé : elle vaut double.',
  'Il existe une prière que le Prophète ﷺ faisait dans ses moments les plus lourds : "Allâhumma a\'innî \'alâ dhikrika wa shukrika wa husni \'ibâdatika" — Seigneur, aide-moi à Te mentionner, à Te remercier, à T\'adorer dignement. Tu n\'as pas à être fort pour prier. Tu as juste à demander de l\'aide pour le faire.',
  'L\'épuisement est une forme de faqr — le dénuement devant Allah. Et Allah aime ceux qui viennent à Lui les mains vides. Ta prière de ce soir n\'a pas besoin d\'être belle. Elle a besoin d\'être vraie.',
  'Ibn al-Qayyim écrit que le cœur fatigué a besoin de la prière comme le corps malade a besoin de remède — même si avaler est difficile. La salah ne te demande pas d\'avoir de l\'énergie. Elle t\'en donne.',
  'Tu n\'es pas en train de manquer de foi. Tu es en train de vivre dans un corps humain, dans un monde épuisant. Allah sait ce que tu portes — Il l\'a créé. Viens tel que tu es. Il n\'y a pas d\'autre condition.',
  'Allah dit : "Après la difficulté vient la facilité." — Al-Inshirah 94:5. Ce verset est répété deux fois de suite. Comme si Allah savait que tu n\'entendrais pas la première fois tellement tu es épuisé. La prière de ce soir n\'est pas un sommet à gravir. C\'est une descente — vers Lui.',
  'Le Prophète ﷺ se levait pour la prière de nuit au point que ses pieds enflaient. Aïsha ﷺ lui demandait pourquoi. Il répondait : "Ne devrais-je pas être un serviteur reconnaissant ?" Tu n\'as pas à atteindre ce niveau ce soir. Tu as juste à te lever. C\'est déjà être reconnaissant.'
],

### Profil 1 (débordé / pressé)
Remplace boost: '...' par :
boost: [
  'La prière rapide d\'un cœur présent vaut mieux que la longue prière d\'un esprit ailleurs. Mais avant de commencer — prends trois respirations. Dis : Allahu Akbar. Ce mot n\'est pas une formule : c\'est une déclaration que ce moment est plus grand que tout ce qui t\'attend dehors.',
  'Le Prophète ﷺ disait : "Repose-nous avec elle, Bilâl" — la prière était son repos, pas une tâche de plus. Cinq minutes arrachées à ta journée peuvent devenir les cinq minutes qui donnent sens au reste. Ce n\'est pas du temps perdu. C\'est du temps ancré.',
  'Allah connaît ton agenda. Il a créé le temps. La prière ne t\'en prend pas — elle te rend ce que le monde t\'a volé. Commence. Le reste peut attendre deux rakaat.',
  'Ibn Ata\'illah al-Iskandarî écrit : "Parmi les signes de la mort du cœur : ne pas s\'attrister des actes d\'obéissance qu\'on a manqués." La précipitation dans la prière est un signe que le monde a pris trop de place. Ce n\'est pas un reproche — c\'est une boussole.',
  'Tu as le temps. Pas beaucoup — mais assez. Le Prophète ﷺ priait pendant des heures la nuit, et gérait une communauté le jour. Il ne courait pas pendant la salah. Il s\'arrêtait. C\'est ça le secret : la prière est l\'acte qui ralentit le reste.',
  'Umar ibn al-Khattâb ﷺ gérait un empire qui s\'étendait de la Perse à l\'Égypte. Il ne ratait pas une prière. Non par obligation — par conviction que c\'est la prière qui rendait possible tout le reste. Ta journée chargée n\'est pas une excuse pour précipiter. C\'est une raison de plus de t\'arrêter vraiment.',
  'Allah dit : "Cherchez secours dans la patience et la prière." — Al-Baqara 2:45. Pas après avoir tout réglé. Pas quand tu auras du temps. Maintenant — précisément parce que tu es débordé. La prière n\'est pas la récompense du calme. Elle en est la source.'
],

### Profil 2 (tête qui part partout)
Remplace boost: '...' par :
boost: [
  'Ton esprit s\'éparpille parce qu\'on l\'a entraîné à être partout, sauf ici. Mais regarde où tu te tiens : devant Celui qui est plus proche de toi que ta propre veine. Tu n\'as pas à Le chercher — Il est déjà là, à t\'écouter, même quand ton cœur vagabonde. Alors quand une pensée t\'emporte, ne te juge pas : reviens, doucement, comme on revient vers quelqu\'un qu\'on aime. Chaque retour est un acte d\'amour. Les savants disent qu\'Il ne compte pas tes distractions. Il compte tes retours.',
  'Les savants disent que le khushû\' n\'est pas l\'absence de pensées — c\'est la direction du cœur. Ton esprit peut vagabonder et ton cœur rester tourné vers Allah. Ce n\'est pas une contradiction. C\'est la condition humaine. Continue.',
  'Avant de commencer, pose une main sur ta poitrine. Sens ton souffle. Dis intérieurement : "Je me tiens devant Allah." Une seconde de présence vaut mille secondes d\'absence. Cherche cette seconde — elle viendra.',
  'Al-Ghazâlî enseigne que l\'esprit dispersé se concentre par la répétition du sens — pas par la force. Quand tu dis Subhâna Rabbiyal \'Adhîm, arrête-toi sur le mot \'Adhîm : Immense. Laisse ce mot peser. Une seconde suffit à tout changer.',
  'Le Prophète ﷺ a enseigné : quand tu te lèves pour prier, prie comme si c\'était ta dernière prière. Pas par peur — par présence. Imagine que tu ne reverras plus ce monde après ce sujûd. Qu\'est-ce que tu dirais à Allah maintenant, avec le temps qu\'il te reste ?',
  'Le Prophète ﷺ enseignait de regarder le lieu de prosternation pendant la prière. Un point fixe. Pas pour contraindre l\'esprit, mais pour lui donner un ancrage. Essaie ce soir : fixe l\'endroit où ton front va se poser. Laisse ce point devenir ton horizon.',
  'Allah dit : "Établis la prière pour Mon souvenir." — Tâhâ 20:14. Pas pour ta concentration. Pas pour ton ressenti. Pour Son souvenir. La prière reste une prière même quand l\'esprit vagabonde — tant que tu reviens. Revenir, c\'est déjà Se souvenir de Lui.'
],

### Profil 3 (gestes sans ressenti)
Remplace boost: '...' par :
boost: [
  'Tes lèvres connaissent les mots ; ton cœur, lui, les a peut-être oubliés. Mais souviens-toi : tu ne parles pas dans le vide. À chaque "Allâhu akbar", Quelqu\'un écoute, Quelqu\'un répond, Quelqu\'un se réjouit que tu sois venu. Et si aujourd\'hui tu ne ressens rien ? Viens quand même. Aimer, parfois, c\'est rester fidèle au rendez-vous même les jours sans étincelle.',
  'Ibn al-Qayyim appelle cet état ghaflah — l\'inattention du cœur. Ce n\'est pas une faute. C\'est une blessure qui se soigne par la constance. Chaque prière accomplie malgré la sécheresse est une prière que les anges admirent — car elle coûte plus.',
  'Le Prophète ﷺ a dit : "Priez comme vous me voyez prier." Observe chaque geste comme s\'il était nouveau. Le rukû\' — incliner le dos devant le Seigneur des mondes. Le sujûd — poser le front là où personne d\'autre ne mérite qu\'on se prosterne. Ces gestes ne sont pas vides. Tu l\'es peut-être — eux, non.',
  'La sécheresse spirituelle vient souvent de ce qu\'on consomme — regards, paroles, distractions. Elle ne se règle pas en forçant l\'émotion pendant la prière. Commence par un istighfâr sincère avant de te lever. Laisse le repentir ouvrir la porte.',
  'Tu pries sans ressentir. C\'est déjà une forme de foi extraordinaire — croire sans preuve intérieure, agir sans récompense immédiate. Allah voit cet effort. "Ceux qui ont cru et accompli les œuvres bonnes — Nous ne laissons pas se perdre la récompense de ceux qui font le bien." — Al-Kahf 18:30.',
  'Le Prophète ﷺ a dit : "Priez comme si vous voyiez Allah — et si vous ne Le voyez pas, sachez qu\'Il vous voit." La deuxième partie est pour toi ce soir. Tu ne Le vois pas, tu ne Le ressens pas — mais Il te voit, Lui. Cette asymétrie suffit. Fais les gestes sous Son regard.',
  'Il y a une prière que les anges aiment plus que toutes les autres — celle du serviteur qui prie sans goût, sans larmes, sans élan, mais qui se lève quand même. Parce qu\'elle coûte tout sans rien promettre en retour. C\'est la prière de la foi nue. C\'est peut-être la tienne ce soir.'
],

### Profil 4 (trop loin, indigne)
Remplace boost: '...' par :
boost: [
  'Tu crois devoir être pur pour venir. C\'est l\'inverse : on ne se lave pas avant d\'entrer dans l\'eau. Il ne t\'a jamais demandé d\'être parfait pour te présenter — Il t\'a demandé de te présenter pour être lavé. Ta honte te souffle "pas toi, pas ce soir" ; sa miséricorde, elle, a laissé la porte ouverte exprès pour les soirs comme celui-ci.',
  'Lors du Mi\'raj, Allah prescrit 50 prières. Moïse ﷺ dit au Prophète ﷺ : "Retourne — ta communauté ne pourra pas." Allah les réduit, encore et encore, jusqu\'à cinq. Il savait ta faiblesse avant que tu naisses. La prière n\'est pas une épreuve de force — c\'est un cadeau taillé pour toi.',
  'Le Prophète ﷺ a dit : "Tous les fils d\'Adam pèchent, et les meilleurs pécheurs sont ceux qui se repentent." Tu n\'es pas trop loin. Tu es exactement là où Allah t\'attendait — à la porte. Frappe. Elle s\'ouvre de l\'intérieur.',
  'Iblis refuse de se prosterner par orgueil. L\'indignité que tu ressens, elle, est l\'opposé de l\'orgueil — c\'est de l\'humilité mal orientée. Allah n\'a pas dit "venez à Moi si vous êtes purs". Il a dit "venez à Moi tels que vous êtes".',
  'Ibn Ata\'illah écrit : "Ton péché, s\'il te conduit à l\'humilité et à l\'indigence, vaut mieux que ton obéissance si elle t\'entraîne à l\'orgueil." Ce sentiment d\'indignité — garde-le. Mais laisse-le te pousser vers le sujûd, pas loin de lui.',
  'Adam ﷺ a péché. Nouh ﷺ a vu son fils se noyer. Moussa ﷺ a tué un homme. Yûnus ﷺ a abandonné son peuple. Tous ont crié vers Allah depuis le fond de leur indignité. Allah les a tous reçus. Il t\'attend toi aussi — pas propre, pas prêt. Juste là.',
  'Allah dit dans un hadith qudsi : "Ô fils d\'Adam, tant que tu M\'invoqueras et espèreras en Moi, Je te pardonnerai quoi qu\'il en soit." Pas de condition de pureté. Pas de seuil de dignité. Juste l\'invocation et l\'espoir. Tu les as encore. C\'est assez.'
],

### Profil 5 (prières qui ne montent pas)
Remplace boost: '...' par :
boost: [
  'Ce poids que tu ressens, c\'est ton cœur qui sait encore faire la différence entre la lumière et l\'ombre — et c\'est déjà une grâce. Ibn al-Qayyim dit que la prière elle-même est le polish qui enlève cette rouille, non la récompense d\'un cœur déjà propre. Tu ne pries pas parce que tu es prêt — tu pries pour le devenir.',
  'Le du\'â de Moïse ﷺ dans sa détresse absolue tenait en sept mots : "Rabbi innî limâ anzalta ilayya min khayrin faqîr" — Seigneur, je suis dans le besoin de tout bien que Tu fais descendre. Pas d\'éloquence. Pas de cœur léger. Juste la vérité. C\'est suffisant.',
  'Allah dit dans un hadith qudsi : "Je suis auprès de Mon serviteur selon l\'idée qu\'il se fait de Moi." Tes prières ne sont pas bloquées par la pesanteur de ton cœur. Elles montent précisément parce qu\'elles partent d\'un cœur qui souffre de son éloignement. C\'est la prière la plus honnête qui soit.',
  'Le Prophète ﷺ pleurait dans sa prière au point que sa poitrine bourdonnait comme une marmite. La prière n\'est pas censée être légère. Elle peut être lourde, humide de larmes, chargée de tout ce qu\'on ne sait pas dire. Allah reçoit ça aussi — surtout ça.',
  'Un cœur lourd qui prie vaut infiniment plus qu\'un cœur léger qui ne prie pas. Tu es là. Tu te lèves malgré le poids. C\'est précisément ce qu\'Allah demande — pas la légèreté, mais la présence. "Appelez-Moi, Je vous répondrai." — Ghâfir 40:60.',
  'Ibn al-Qayyim écrit que les larmes de la prière éteignent les feux de l\'au-delà. Mais même sans larmes — la pesanteur que tu ressens, c\'est ton cœur qui reconnaît la distance. Et reconnaître la distance, c\'est déjà faire un pas vers Lui.',
  'Yûnus ﷺ priait au fond de trois ténèbres — le ventre de la baleine, la profondeur de la mer, la nuit. Sa prière montait quand même : "Lâ ilâha illâ anta subhânaka innî kuntu mina dh-dhâlimîn." La profondeur n\'est pas un obstacle à l\'exaucement. Elle en est parfois la condition.'
],

### Profil 6 (tête pleine du monde)
Remplace boost: '...' par :
boost: [
  'Le monde a rempli ton cœur parce qu\'il se présente à chaque instant — les notifications, les dettes, les ambitions. Allah, Lui, attend qu\'on vienne Le chercher. Al-Ghazâlî dit : "La valeur de ta prière auprès d\'Allah est égale à sa valeur dans ton cœur." Alors retourne-toi simplement vers Celui qui possède tout ce qui t\'inquiète. Murmure-Lui tes soucis avant le takbîr. Puis dis : Allâhu Akbar — Allah est plus grand. Plus grand que tout ça.',
  'Le Prophète ﷺ a dit : "Celui qui fait de l\'au-delà sa préoccupation principale, Allah rassemble ses affaires pour lui et met la richesse devant lui." Tes problèmes ne se règlent pas en les ressassant. Ils se règlent en faisant confiance à Celui qui les connaît mieux que toi.',
  'Ibrahim ﷺ a laissé sa femme et son fils dans un désert sans eau ni nourriture — puis il est reparti. Sans se retourner. Il dit : "Rabbanâ innî askantu min dhurriyyatî" — Seigneur, j\'installe ma famille près de Ta Maison. Ce n\'est pas de l\'insouciance. C\'est de la tawakkul. Confie ce qui t\'oppresse. Puis prie.',
  'Tes projets, ton argent, tes problèmes — Allah les connaît dans leur détail le plus fin. Il sait ce que tu dois, ce que tu attends, ce que tu crains. La prière n\'est pas une fuite de tout ça. C\'est le moment où tu en parles à la seule Personne qui peut vraiment y faire quelque chose.',
  'Ibn al-Qayyim écrit que le cœur distrait par le dunya ressemble à un homme qui contemple une carte au lieu de marcher. La prière est le mouvement. Tout le reste — les plans, les calculs, les inquiétudes — c\'est la carte. Lève-toi. Marche.',
  'Sulaymân ﷺ possédait un royaume que nul après lui n\'aura — les vents, les djinns, les armées. Et il priait. Il savait que tout ce qu\'il possédait était un dépôt, pas une propriété. Tes biens, tes projets, ton argent — ce sont des dépôts. La prière te le rappelle avant que tu l\'oublies.',
  'Allah dit : "La vie de ce monde n\'est que jeu et divertissement." — Muhammad 47:36. Ce n\'est pas un mépris du monde — c\'est une invitation à ne pas le laisser remplir tout l\'espace. La prière est la frontière. Elle dit : jusqu\'ici, le monde. À partir d\'ici, l\'essentiel.'
],

### Profil 7 (remet à plus tard)
Remplace boost: '...' par :
boost: [
  'Quelque part dans sa vie, chaque homme a prié une dernière fois sans le savoir. Ibn al-Qayyim dit : rappelle-toi la mort avant de prier, et tu prieras comme celui qui n\'a plus de demain à perdre. Ce n\'est pas une menace — c\'est une libération. Lève-toi non par peur, mais parce que tu sais : ce rendez-vous-là est le seul qui compte vraiment.',
  'Le Prophète ﷺ a dit : "Profite de cinq choses avant cinq autres : ta jeunesse avant ta vieillesse, ta santé avant ta maladie, ta richesse avant ta pauvreté, ton temps libre avant tes occupations, et ta vie avant ta mort." Tu as ce moment. Maintenant. Pas dans une heure.',
  'L\'ange de la mort ne frappe pas à l\'heure choisie. Il frappe à l\'heure écrite. Et entre les deux — il n\'y a aucun signal d\'alerte. La prière que tu reportes maintenant pourrait être la dernière que tu aurais pu faire debout, en santé, chez toi. Prie-la ainsi.',
  'Allah dit : "Malheur aux priants — ceux qui négligent leur prière." — Al-Mâ\'ûn 107:4-5. Le mot arabe est sâhûn : celui qui remet, qui laisse passer l\'heure. Pas l\'esprit qui vagabonde — le cœur qui abandonne le moment. Revenir maintenant suffit à tout effacer.',
  'Imagine la scène du Jugement. On te montre une prière — Asr du mardi 14 juin. "Pourquoi ?" Tu cherches une réponse. Il n\'y en a pas de bonne. La seule bonne réponse se donne maintenant, avant que la question soit posée. Lève-toi.',
  'Ibn Mas\'ûd ﷺ raconte qu\'il demandait au Prophète ﷺ quel acte Allah aime le plus. Il répondit : "La prière à son heure." Pas la plus longue. Pas la plus belle. Celle accomplie dans sa fenêtre de temps. Cette fenêtre est ouverte maintenant. Elle ne le sera pas toujours.',
  'Chaque prière manquée est une dette envers ton âme qui mérite d\'être nourrie. On rembourse les dettes financières par crainte des conséquences. Les dettes spirituelles, on les rembourse maintenant — pendant qu\'on en est encore capable.'
]

## Trigger
```
Lis SPEC-PM-BOOST-VARIANTES.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: 7 variantes boost par profil dans Prier mieux" && git push
```
