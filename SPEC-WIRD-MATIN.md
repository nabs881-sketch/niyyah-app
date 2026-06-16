# SPEC-WIRD-MATIN

## Objectif
Corriger et compléter le **Wird du Matin** dans `script.js` (objet `WIRD_DATA.matin`).
Source de vérité unique = `script.js`. **NE PAS toucher `modules/data.js`** (code mort, jamais chargé).

## Règles
- Zéro arabe fabriqué. Tous les ajouts ci-dessous sont sahih/hasan, sources vérifiées.
- Pour les duas NON coraniques : `audio: null` (pas de fichier everyayah, ça jouait un verset sans rapport = bug).
- Garder les Sourates/versets coraniques avec leur audio everyayah existant (Fatiha, Ayat al-Kursi, Ikhlâs, Falaq, Nâs).

## Action : remplacer tout le bloc `matin: { ... }` de `WIRD_DATA`

Trouver dans `script.js` le bloc qui commence par `matin: {` (vers ligne 3954) et finit juste avant `soir: {`.
Remplacer **l'intégralité du bloc matin** par :

```js
  matin: {
    title: 'Wird du Matin',
    icon: '🌅',
    subtitle: 'Après Fajr — avant le lever du soleil',
    items: [
      { id: 'w_fatiha', label: 'Al-Fatiha', sub: 'Sourate 1 — L\'ouverture', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/001001.mp3','https://everyayah.com/data/Alafasy_128kbps/001002.mp3','https://everyayah.com/data/Alafasy_128kbps/001003.mp3','https://everyayah.com/data/Alafasy_128kbps/001004.mp3','https://everyayah.com/data/Alafasy_128kbps/001005.mp3','https://everyayah.com/data/Alafasy_128kbps/001006.mp3','https://everyayah.com/data/Alafasy_128kbps/001007.mp3'], source: 'Coran 1:1-7', phonetic: 'Bismillahi r-rahmani r-rahim...' },
      { id: 'w_ayat_kursi', label: 'Ayat al-Kursi', sub: 'Protection — 1 fois', arabic: 'اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ', audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3', source: 'Al-Baqara 2:255', phonetic: 'Allahu la ilaha illa huwal hayyul qayyum...' },
      { id: 'w_ikhlass_m', label: 'Al-Ikhlass × 3', sub: 'Équivaut au tiers du Coran', arabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ', audio: ['https://everyayah.com/data/Alafasy_128kbps/112001.mp3','https://everyayah.com/data/Alafasy_128kbps/112002.mp3','https://everyayah.com/data/Alafasy_128kbps/112003.mp3','https://everyayah.com/data/Alafasy_128kbps/112004.mp3'], source: 'Al-Ikhlass 112', phonetic: 'Qul huwa Allahu ahad' },
      { id: 'w_falaq_m', label: 'Al-Falaq × 3', sub: 'Protection contre le mal', arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/113001.mp3','https://everyayah.com/data/Alafasy_128kbps/113002.mp3','https://everyayah.com/data/Alafasy_128kbps/113003.mp3','https://everyayah.com/data/Alafasy_128kbps/113004.mp3','https://everyayah.com/data/Alafasy_128kbps/113005.mp3'], source: 'Al-Falaq 113', phonetic: 'Qul a\'udhu bi rabbi l-falaq' },
      { id: 'w_nas_m', label: 'An-Nas × 3', sub: 'Protection contre le mauvais œil', arabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ', audio: ['https://everyayah.com/data/Alafasy_128kbps/114001.mp3','https://everyayah.com/data/Alafasy_128kbps/114002.mp3','https://everyayah.com/data/Alafasy_128kbps/114003.mp3','https://everyayah.com/data/Alafasy_128kbps/114004.mp3','https://everyayah.com/data/Alafasy_128kbps/114005.mp3','https://everyayah.com/data/Alafasy_128kbps/114006.mp3'], source: 'An-Nas 114', phonetic: 'Qul a\'udhu bi rabbi n-nas' },
      { id: 'w_sayyid_istighfar', label: 'Sayyid al-Istighfâr', sub: 'Le maître de l\'istighfâr — 1 fois', arabic: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَٰهَ إِلَّا أَنْتَ، خَلَقْتَنِي وَأَنَا عَبْدُكَ، وَأَنَا عَلَى عَهْدِكَ وَوَعْدِكَ مَا اسْتَطَعْتُ، أَعُوذُ بِكَ مِنْ شَرِّ مَا صَنَعْتُ، أَبُوءُ لَكَ بِنِعْمَتِكَ عَلَيَّ، وَأَبُوءُ بِذَنْبِي فَاغْفِرْ لِي، فَإِنَّهُ لَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ', audio: null, source: 'Bukhari 6306 — Sayyid al-Istighfâr', phonetic: 'Allahumma anta Rabbi la ilaha illa anta, khalaqtani wa ana abduka, wa ana ala ahdika wa wadika ma-stata\'tu, a\'udhu bika min sharri ma sana\'tu, abu\'u laka bi-ni\'matika alayya wa abu\'u bi-dhanbi faghfir li, fa-innahu la yaghfiru-dh-dhunuba illa anta' },
      { id: 'w_sabah1', label: 'Douaa du matin', sub: 'Nous voici au matin — 1 fois', arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ', audio: null, source: 'Muslim 2723 — Douaa du matin', phonetic: 'Asbahna wa asbahal mulku lillahi, wal hamdu lillahi, la ilaha illallahu wahdahu la sharika lah' },
      { id: 'w_bika_asbahna', label: 'Par Toi nous voici au matin', sub: '1 fois', arabic: 'اللَّهُمَّ بِكَ أَصْبَحْنَا وَبِكَ أَمْسَيْنَا وَبِكَ نَحْيَا وَبِكَ نَمُوتُ وَإِلَيْكَ النُّشُورُ', audio: null, source: 'Tirmidhi 3391 (hasan)', phonetic: 'Allahumma bika asbahna wa bika amsayna wa bika nahya wa bika namutu wa ilayka-n-nushur' },
      { id: 'w_afiyah_badan', label: 'Préservation (ʿâfiya)', sub: 'Corps, ouïe, vue — 3 fois', arabic: 'اللَّهُمَّ عَافِنِي فِي بَدَنِي، اللَّهُمَّ عَافِنِي فِي سَمْعِي، اللَّهُمَّ عَافِنِي فِي بَصَرِي، لَا إِلَٰهَ إِلَّا أَنْتَ', audio: null, source: 'Abu Dawud 5090 (hasan)', phonetic: 'Allahumma afini fi badani, Allahumma afini fi sam\'i, Allahumma afini fi basari, la ilaha illa anta' },
      { id: 'w_bismillah_la_yadurr', label: 'Rien ne nuit avec Son nom', sub: '3 fois', arabic: 'بِسْمِ اللَّهِ الَّذِي لَا يَضُرُّ مَعَ اسْمِهِ شَيْءٌ فِي الْأَرْضِ وَلَا فِي السَّمَاءِ وَهُوَ السَّمِيعُ الْعَلِيمُ', audio: null, source: 'Abu Dawud 5088 · Tirmidhi 3388 (hasan sahih)', phonetic: 'Bismillahi-lladhi la yadurru ma\'asmihi shay\'un fil-ardi wa la fis-sama\'i wa huwa-s-Sami\'u-l-\'Alim' },
      { id: 'w_radhitu', label: 'J\'agrée Allah comme Seigneur', sub: '3 fois', arabic: 'رَضِيتُ بِاللَّهِ رَبًّا، وَبِالْإِسْلَامِ دِينًا، وَبِمُحَمَّدٍ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ نَبِيًّا', audio: null, source: 'Abu Dawud 5072 · Tirmidhi 3389 (hasan)', phonetic: 'Radhitu billahi Rabban, wa bil-islami dinan, wa bi-Muhammadin sallallahu alayhi wa sallama nabiyyan' },
      { id: 'w_ilman_nafian', label: 'Science utile & rizq pur', sub: '1 fois (matin)', arabic: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ عِلْمًا نَافِعًا، وَرِزْقًا طَيِّبًا، وَعَمَلًا مُتَقَبَّلًا', audio: null, source: 'Ibn Majah 925 (hasan)', phonetic: 'Allahumma inni as\'aluka ilman nafi\'an, wa rizqan tayyiban, wa amalan mutaqabbalan' },
      { id: 'w_tasbih_100', label: 'Tasbîh', sub: 'SubhanAllah wa bi-hamdihi — 100 fois', arabic: 'سُبْحَانَ اللَّهِ وَبِحَمْدِهِ', audio: null, source: 'Muslim 2692', phonetic: 'Subhana-llahi wa bi-hamdihi' },
      { id: 'w_tahlil_100', label: 'Tahlîl', sub: 'La ilaha illallah… — 100 fois', arabic: 'لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ', audio: null, source: 'Bukhari 3293 · Muslim 2691', phonetic: 'La ilaha illa-llahu wahdahu la sharika lah, lahu-l-mulku wa lahu-l-hamd, wa huwa ala kulli shay\'in qadir' },
      { id: 'w_istighfar_m', label: 'Istighfar du matin', sub: 'Astaghfirullah × 3', arabic: 'أَسْتَغْفِرُ اللَّهَ وَأَتُوبُ إِلَيْهِ', audio: null, source: 'Bukhari 6307', phonetic: 'Astaghfirullah wa atubu ilayh' },
      { id: 'w_salawat_m', label: 'Salawat', sub: 'Allahumma salli ala Muhammad × 10', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', audio: null, source: 'Muslim 408', phonetic: 'Allahumma salli ala Muhammadin wa ala ali Muhammad' },
    ]
  },
```

## Notes
- Ce qui change vs l'ancien bloc : (1) `w_sabah1` source `Bukhari 6323` → `Muslim 2723` + audio null. (2) `w_istighfar_m` audio null. (3) `w_salawat_m` audio null (033056 = verset, pas le dhikr). (4) 8 nouveaux items ajoutés dans l'ordre liturgique classique.
- **Délibérément EXCLUS** (grades contestés, à soumettre à l'imam avant tout ajout) : « Ḥasbiya-llâh… ×7 » (Abu Dawud 5081, isnâd marfûʿ discuté) et « Yâ Ḥayyu yâ Qayyûm… » (daʿîf). Ne pas les ajouter.

## Build (OBLIGATOIRE avant commit)
```
npm run build
git add script.js script.min.js
git commit -m "fix(wird-matin): source Muslim 2723, audios non-coraniques null, ajout 8 adhkar sabah sourcés"
```
Sans `npm run build`, le `script.min.js` chargé par index.html ne change pas → fix mort.
