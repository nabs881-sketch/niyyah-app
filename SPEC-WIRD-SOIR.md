# SPEC-WIRD-SOIR

## Objectif
Corriger et compléter le **Wird du Soir** dans `script.js` (objet `WIRD_DATA.soir`).
Source de vérité unique = `script.js`. NE PAS toucher `modules/data.js` (code mort).

## Règles
- Zéro arabe fabriqué. Tout est sahih/hasan, sources vérifiées.
- Duas NON coraniques : `audio: null` (everyayah = Coran only, ça jouait un verset sans rapport).
- Versets coraniques : garder l'audio everyayah existant.

## Action : remplacer tout le bloc `soir: { ... }` de `WIRD_DATA`

Trouver dans `script.js` le bloc `soir: {` (dans `WIRD_DATA`, après le bloc `matin`) et remplacer **tout le bloc soir** par :

```js
  soir: {
    title: 'Wird du Soir',
    icon: '🌙',
    subtitle: 'Après Asr ou Maghrib',
    items: [
      { id: 'w_ayat_kursi_s', label: 'Ayat al-Kursi', sub: 'Protection — 1 fois', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3', source: 'Al-Baqara 2:255', phonetic: 'Allahu la ilaha illa huwal hayyul qayyum...' },
      { id: 'w_ikhlass_s', label: 'Al-Ikhlass × 3', sub: 'Équivaut au tiers du Coran', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', audio: ['https://everyayah.com/data/Alafasy_128kbps/112001.mp3','https://everyayah.com/data/Alafasy_128kbps/112002.mp3','https://everyayah.com/data/Alafasy_128kbps/112003.mp3','https://everyayah.com/data/Alafasy_128kbps/112004.mp3'], source: 'Al-Ikhlass 112', phonetic: 'Qul huwa Allahu ahad' },
      { id: 'w_falaq_s', label: 'Al-Falaq × 3', sub: 'Protection contre le mal', arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/113001.mp3','https://everyayah.com/data/Alafasy_128kbps/113002.mp3','https://everyayah.com/data/Alafasy_128kbps/113003.mp3','https://everyayah.com/data/Alafasy_128kbps/113004.mp3','https://everyayah.com/data/Alafasy_128kbps/113005.mp3'], source: 'Al-Falaq 113', phonetic: 'Qul a\'udhu bi rabbi l-falaq' },
      { id: 'w_nas_s', label: 'An-Nas × 3', sub: 'Protection contre le mauvais œil', arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/114001.mp3','https://everyayah.com/data/Alafasy_128kbps/114002.mp3','https://everyayah.com/data/Alafasy_128kbps/114003.mp3','https://everyayah.com/data/Alafasy_128kbps/114004.mp3','https://everyayah.com/data/Alafasy_128kbps/114005.mp3','https://everyayah.com/data/Alafasy_128kbps/114006.mp3'], source: 'An-Nas 114', phonetic: 'Qul a\'udhu bi rabbi n-nas' },
      { id: 'w_baqara285', label: 'Al-Baqara 285-286', sub: 'Suffira contre tout mal', arabic: 'آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/002285.mp3','https://everyayah.com/data/Alafasy_128kbps/002286.mp3'], source: 'Al-Baqara 2:285-286 · Bukhari 5009', phonetic: 'Amana r-rasulu bima unzila ilayh...' },
      { id: 'w_sayyid_istighfar_s', label: 'Sayyid al-Istighfâr', sub: 'Le maître de l\'istighfâr — 1 fois', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', audio: null, source: 'Bukhari 6306 — Sayyid al-Istighfâr', phonetic: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana abduka, wa ana ala ahdika wa wadika ma-stata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bi-ni\'matika alayya wa abu\'u bi-dhanbi faghfir li, fa-innahu la yaghfiru-dh-dhunuba illa anta' },
      { id: 'w_masa1', label: 'Douaa du soir', sub: 'Nous voici au soir — 1 fois', arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ', audio: null, source: 'Muslim 2723 — Douaa du soir', phonetic: 'Amsayna wa amsal mulku lillahi, wal hamdu lillahi, la ilaha illallahu wahdahu la sharika lah' },
      { id: 'w_bika_amsayna', label: 'Par Toi nous voici au soir', sub: '1 fois', arabic: 'اللَّهُمَّ بِكَ أَمْسَيْنَا وَبِكَ أَصْبَحْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ الْمَصِيرُ', audio: null, source: 'Abu Dawud 5068 · Tirmidhi 3391 (sahih)', phonetic: 'Allahumma bika amsayna wa bika asbahna wa bika nahya wa bika namutu wa ilayka-l-masir' },
      { id: 'w_afiya_badan_s', label: 'Préservation (ʿâfiya)', sub: 'Corps, ouïe, vue — 3 fois', arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ', audio: null, source: 'Abu Dawud 5090 (hasan)', phonetic: 'Allahumma afini fi badani, Allahumma afini fi sam\'i, Allahumma afini fi basari, la ilaha illa anta' },
      { id: 'w_bismillah_s', label: 'Rien ne nuit avec Son nom', sub: '3 fois', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', audio: null, source: 'Abu Dawud 5088 · Tirmidhi 3388 (hasan sahih)', phonetic: 'Bismillahi-lladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwa-s-Sami\'u-l-\'Alim' },
      { id: 'w_radhitu_s', label: 'J\'agrée Allah comme Seigneur', sub: '3 fois', arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا', audio: null, source: 'Ibn Majah 3870 · Tirmidhi 3389 (hasan)', phonetic: 'Radhitu billahi Rabban, wa bil-islami dinan, wa bi-Muhammadin sallallahu alayhi wa sallama nabiyyan' },
      { id: 'w_aouzu', label: 'ʿAfwa wa ʿâfiya', sub: 'Pardon et préservation — 3 fois', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَفْوَ وَالْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ', audio: null, source: 'Abu Dawud 5074 (hasan)', phonetic: 'Allahumma inni as\'aluka l-\'afwa wal-\'afiyata fid-dunya wal-akhira' },
      { id: 'w_tasbih_100_s', label: 'Tasbîh', sub: 'SubhanAllah wa bi-hamdihi — 100 fois', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', audio: null, source: 'Muslim 2692', phonetic: 'Subhana-llahi wa bi-hamdihi' },
      { id: 'w_tahlil_100_s', label: 'Tahlîl', sub: 'La ilaha illallah… — 100 fois', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', audio: null, source: 'Bukhari 3293 · Muslim 2691', phonetic: 'La ilaha illa-llahu wahdahu la sharika lah, lahu-l-mulku wa lahu-l-hamd, wa huwa ala kulli shay\'in qadir' },
      { id: 'w_salawat_s', label: 'Salawat', sub: 'Allahumma salli ala Muhammad × 10', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', audio: null, source: 'Muslim 408', phonetic: 'Allahumma salli ala Muhammadin wa ala ali Muhammad' },
      { id: 'w_mulk', label: 'Sourate Al-Mulk', sub: 'Protection dans la tombe', arabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ', audio: ['https://everyayah.com/data/Alafasy_128kbps/067001.mp3','https://everyayah.com/data/Alafasy_128kbps/067002.mp3','https://everyayah.com/data/Alafasy_128kbps/067003.mp3','https://everyayah.com/data/Alafasy_128kbps/067004.mp3','https://everyayah.com/data/Alafasy_128kbps/067005.mp3','https://everyayah.com/data/Alafasy_128kbps/067006.mp3','https://everyayah.com/data/Alafasy_128kbps/067007.mp3','https://everyayah.com/data/Alafasy_128kbps/067008.mp3','https://everyayah.com/data/Alafasy_128kbps/067009.mp3','https://everyayah.com/data/Alafasy_128kbps/067010.mp3','https://everyayah.com/data/Alafasy_128kbps/067011.mp3','https://everyayah.com/data/Alafasy_128kbps/067012.mp3','https://everyayah.com/data/Alafasy_128kbps/067013.mp3','https://everyayah.com/data/Alafasy_128kbps/067014.mp3','https://everyayah.com/data/Alafasy_128kbps/067015.mp3','https://everyayah.com/data/Alafasy_128kbps/067016.mp3','https://everyayah.com/data/Alafasy_128kbps/067017.mp3','https://everyayah.com/data/Alafasy_128kbps/067018.mp3','https://everyayah.com/data/Alafasy_128kbps/067019.mp3','https://everyayah.com/data/Alafasy_128kbps/067020.mp3','https://everyayah.com/data/Alafasy_128kbps/067021.mp3','https://everyayah.com/data/Alafasy_128kbps/067022.mp3','https://everyayah.com/data/Alafasy_128kbps/067023.mp3','https://everyayah.com/data/Alafasy_128kbps/067024.mp3','https://everyayah.com/data/Alafasy_128kbps/067025.mp3','https://everyayah.com/data/Alafasy_128kbps/067026.mp3','https://everyayah.com/data/Alafasy_128kbps/067027.mp3','https://everyayah.com/data/Alafasy_128kbps/067028.mp3','https://everyayah.com/data/Alafasy_128kbps/067029.mp3','https://everyayah.com/data/Alafasy_128kbps/067030.mp3'], source: 'Tirmidhi 2891', phonetic: 'Tabaraka lladhi biyadihi l-mulk' },
      { id: 'w_kafirun', label: 'Al-Kafirun', sub: 'Avant de dormir — 1 fois', arabic: 'قُلْ يَا أَيُّهَا الْكَافِرُونَ', audio: ['https://everyayah.com/data/Alafasy_128kbps/109001.mp3','https://everyayah.com/data/Alafasy_128kbps/109002.mp3','https://everyayah.com/data/Alafasy_128kbps/109003.mp3','https://everyayah.com/data/Alafasy_128kbps/109004.mp3','https://everyayah.com/data/Alafasy_128kbps/109005.mp3','https://everyayah.com/data/Alafasy_128kbps/109006.mp3'], source: 'Abu Dawud 5055', phonetic: 'Qul ya ayyuha l-kafirun' },
    ]
  }
```

## Notes
- Changements vs ancien bloc : `w_masa1` source `Abu Dawud 5068` → `Muslim 2723` + audio null ; `w_aouzu` audio null (source Abu Dawud 5074 correcte, conservée) ; ajout de 9 items (Ayat al-Kursi, Sayyid al-Istighfâr, bika amsayna, ʿâfiya, Bismillâh lâ yaḍurr, Raḍîtu billâh, tasbîḥ ×100, tahlîl ×100, salawat).
- Si tu veux un soir plus léger, on peut retirer tasbîḥ/tahlîl ×100 ou l'un des deux duas de ʿâfiya — dis-le et je réajuste.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "fix(wird-soir): source Muslim 2723, audios non-coraniques null, ajout 9 adhkar masa sources"
```
