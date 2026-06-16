# SPEC-HADITHS-PURGE

## Objectif
Passer « Hadith du jour » en 100 % sahih/hasan : remplacer les 4 da'îf, la « maxime » (non-hadith) et le doublon par des hadiths authentiques vérifiés sur sources primaires (Sunnah.com).

Cible : **hadiths_jour.json**. Pour chaque entrée, trouver l'objet par son `jour` et remplacer les champs `texte_ar`, `texte_fr`, `source`, `degre`, `theme`.

---

### jour 47 (était da'îf — Tirmidhî 2459)
- theme: `Auto-examen`
- degre: `sahih`
- source: `Tirmidhî 2417 · hasan sahih`
- texte_ar: `لَا تَزُولُ قَدَمَا عَبْدٍ يَوْمَ الْقِيَامَةِ حَتَّى يُسْأَلَ عَنْ عُمْرِهِ فِيمَا أَفْنَاهُ، وَعَنْ عِلْمِهِ فِيمَا فَعَلَ، وَعَنْ مَالِهِ مِنْ أَيْنَ اكْتَسَبَهُ وَفِيمَا أَنْفَقَهُ، وَعَنْ جِسْمِهِ فِيمَا أَبْلَاهُ`
- texte_fr: `Les pieds du serviteur ne bougeront pas, au Jour de la Résurrection, avant qu'il ne soit interrogé : sur sa vie — à quoi il l'a employée ; sur son savoir — ce qu'il en a fait ; sur ses biens — d'où il les a acquis et où il les a dépensés ; et sur son corps — à quoi il l'a usé.`

### jour 93 (était da'îf — Tirmidhî 2352)
- theme: `Humilité`
- degre: `sahih`
- source: `Muslim 2588`
- texte_ar: `مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا، وَمَا تَوَاضَعَ أَحَدٌ لِلَّهِ إِلَّا رَفَعَهُ اللَّهُ`
- texte_fr: `La charité ne diminue en rien la richesse ; Allah n'augmente le serviteur qui pardonne qu'en honneur ; et nul ne s'abaisse par humilité pour Allah sans qu'Allah ne l'élève.`

### jour 151 (était « maxime » — non-hadith)
- theme: `Promesse`
- degre: `sahih`
- source: `Bukhari 33, Muslim 59 · muttafaq 'alayh`
- texte_ar: `آيَةُ الْمُنَافِقِ ثَلَاثٌ: إِذَا حَدَّثَ كَذَبَ، وَإِذَا وَعَدَ أَخْلَفَ، وَإِذَا اؤْتُمِنَ خَانَ`
- texte_fr: `Les signes de l'hypocrite sont trois : quand il parle, il ment ; quand il promet, il manque à sa promesse ; et quand on lui confie une chose, il trahit.`

### jour 158 (était da'îf — Ibn Mâja 425)
- theme: `Sobriété`
- degre: `sahih`
- source: `Tirmidhî 2380 · hasan sahih (al-Albânî) · An-Nawawî 40 n°47`
- texte_ar: `مَا مَلَأَ آدَمِيٌّ وِعَاءً شَرًّا مِنْ بَطْنٍ، بِحَسْبِ ابْنِ آدَمَ أُكُلَاتٌ يُقِمْنَ صُلْبَهُ، فَإِنْ كَانَ لَا مَحَالَةَ فَثُلُثٌ لِطَعَامِهِ وَثُلُثٌ لِشَرَابِهِ وَثُلُثٌ لِنَفَسِهِ`
- texte_fr: `Le fils d'Adam ne remplit pas de récipient pire que son ventre. Quelques bouchées lui suffisent pour tenir droit. Et s'il le faut absolument : un tiers pour sa nourriture, un tiers pour sa boisson, un tiers pour son souffle.`

### jour 174 (était da'îf — Tirmidhî 1952 ; thème Éducation → Responsabilité)
- theme: `Responsabilité`
- degre: `sahih`
- source: `Bukhari 893, Muslim 1829 · muttafaq 'alayh`
- texte_ar: `كُلُّكُمْ رَاعٍ وَكُلُّكُمْ مَسْؤُولٌ عَنْ رَعِيَّتِهِ، وَالرَّجُلُ رَاعٍ فِي أَهْلِهِ وَمَسْؤُولٌ عَنْ رَعِيَّتِهِ، وَالْمَرْأَةُ رَاعِيَةٌ فِي بَيْتِ زَوْجِهَا وَمَسْؤُولَةٌ عَنْ رَعِيَّتِهَا`
- texte_fr: `Chacun de vous est un berger, et chacun est responsable de son troupeau : l'homme est responsable des siens, la femme est responsable de la maison de son époux. Chacun de vous est responsable de ceux dont il a la charge.`

### jour 175 (était doublon de J84 ; Tirmidhî 1919)
- theme: `Tendresse aux faibles`
- degre: `sahih`
- source: `Tirmidhî 1924, Abû Dâwûd 4941 · hasan sahih`
- texte_ar: `الرَّاحِمُونَ يَرْحَمُهُمُ الرَّحْمَنُ، ارْحَمُوا مَنْ فِي الْأَرْضِ يَرْحَمْكُمْ مَنْ فِي السَّمَاءِ`
- texte_fr: `Les miséricordieux, le Tout-Miséricordieux leur fait miséricorde. Soyez miséricordieux envers ceux qui sont sur terre, Celui qui est au-dessus des cieux vous fera miséricorde.`

---

## Vérif attendue
- `node -e "const a=require('./hadiths_jour.json'); console.log(a.filter(h=>/da.?[îi]f|maxime/i.test(h.degre)).length)"` → doit afficher `0`.
- Plus aucun doublon J84/J175 (textes arabes différents).

## Build (OBLIGATOIRE — hadiths_jour.json est précaché)
```
npm run build
git add -A
git commit -m "content(hadith): purge 4 daif + maxime + doublon -> 6 sahih/hasan verifies"
```
