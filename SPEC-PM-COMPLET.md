# SPEC-PM-COMPLET

## Objectif
Enrichir "Prier mieux" avec :
1. Technique pratique par profil (après le boost)
2. Du'â d'entrée par profil (avant le bouton)
3. Nouvelle étape 'retour' après la prière (remplace closePrierMieux())

---

## script.js — Étape 1 : Ajouter technique et dua dans _PM_PROFILES

Dans _PM_PROFILES, ajouter 2 champs à chaque profil : `technique` et `dua` + `duaFr` + `duaSource`

### Profil 0 (vidé)
technique: 'Assieds-toi si tu n\'as pas la force de te tenir debout. Pose juste le front une fois en sujûd. Ibn al-Qayyim dit que cette prière ne coûte rien au corps — elle redonne à l\'âme.',
dua: 'Allâhumma a\'innî \'alâ dhikrika wa shukrika wa husni \'ibâdatika',
duaFr: 'Seigneur, aide-moi à Te mentionner, à Te remercier, à T\'adorer dignement.',
duaSource: 'Abu Dawud 1522',

### Profil 1 (débordé)
technique: 'Avant le takbîr, pose ton téléphone face vers le bas. Reste debout trois secondes sans bouger. Dis intérieurement : "Je vais parler à Allah." Cette seconde de transition suffit à changer l\'état intérieur.',
dua: 'Allâhumma innî a\'ûdhu bika min al-hammi wal-hazani',
duaFr: 'Seigneur, je cherche refuge en Toi contre l\'anxiété et la tristesse.',
duaSource: 'Bukhari 6363',

### Profil 2 (tête qui part)
technique: 'Fixe le lieu de sujûd dès le début. À la Fatiha, dis chaque verset comme si tu attendais une réponse — parce qu\'Allah répond réellement à chacun d\'eux.',
dua: 'Rabbi adhkhilnî mudkhala sidqin wa akhrijnî mukhraja sidqin',
duaFr: 'Seigneur, fais-moi entrer d\'une entrée sincère et sortir d\'une sortie sincère.',
duaSource: 'Coran 17:80',

### Profil 3 (gestes sans ressenti)
technique: 'Avant de te lever, dis trois fois Astaghfirullah lentement. Puis choisis un seul mot de la prière — un seul — et concentre-toi dessus uniquement. Al-Ghazâlî dit qu\'une seconde de présence réelle vaut une heure de récitation absente.',
dua: 'Allâhumma innî as\'aluka khashyataka fis-sirri wal-\'alâniyya',
duaFr: 'Seigneur, je Te demande de Te craindre en secret et en public.',
duaSource: 'Nasa\'i 1305',

### Profil 4 (indigne)
technique: 'Avant de te lever, dis : "Astaghfirullah wa atubu ilayh". Tu n\'arrives pas souillé — tu arrives en repentance. Ibn Ata\'illah dit que le péché qui mène au repentir vaut parfois mieux que l\'obéissance qui mène à l\'orgueil.',
dua: 'Rabbi innî dhalamtu nafsî dhulman kathîran wa lâ yaghfiru dh-dhunûba illâ anta faghfir lî',
duaFr: 'Seigneur, j\'ai beaucoup opprimé mon âme — nul ne pardonne les péchés sinon Toi, pardonne-moi.',
duaSource: 'Bukhari 834',

### Profil 5 (prières qui ne montent pas)
technique: 'Au sujûd, reste plus longtemps que d\'habitude. Tu n\'as pas besoin de formules. Dis ce qui pèse — dans ta langue si besoin. C\'est là, le front à terre, que tu es le plus proche de Lui.',
dua: 'Rabbi innî limâ anzalta ilayya min khayrin faqîr',
duaFr: 'Seigneur, je suis dans le besoin de tout bien que Tu fais descendre.',
duaSource: 'Coran 28:24',

### Profil 6 (tête pleine du monde)
technique: 'Avant le takbîr, murmure tout ce qui t\'encombre — dettes, projets, peurs. Puis dis : Allahu Akbar — Allah est plus grand que tout ça. Al-Ghazâlî dit que la prière commence vraiment à ce moment-là.',
dua: 'Allâhumma anta rabbî lâ ilâha illâ anta \'alayka tawakkaltu wa anta rabb ul-\'arshi l-\'adhîm',
duaFr: 'Seigneur, Tu es mon Maître, pas de dieu sauf Toi, en Toi je me confie, Tu es le Seigneur du Trône immense.',
duaSource: 'Muslim 2726',

### Profil 7 (remet à plus tard)
technique: 'Lève-toi maintenant — le corps d\'abord, l\'intention suit. Avant le takbîr, dis-toi : "Cette prière-là pourrait être ma dernière." Pas par peur — par présence. Ibn al-Qayyim dit que celui qui prie ainsi ne se précipite plus jamais.',
dua: 'Allâhumma lâ taj\'al ad-dunyâ akbara hamminâ wa lâ mablagha \'ilminâ',
duaFr: 'Seigneur, ne fais pas que le monde soit notre plus grande préoccupation ni la limite de notre savoir.',
duaSource: 'Tirmidhi 3502',

---

## script.js — Étape 2 : Modifier le bloc boost dans renderPM()

Dans le bloc `} else if (_pmStep === 'boost') {`, remplace le html actuel par :

```js
  } else if (_pmStep === 'boost') {
    var pb = _PM_PROFILES[_pmIdx];
    var _boost = Array.isArray(pb.boost) ? pb.boost[new Date().getDay() % pb.boost.length] : pb.boost;
    html = '<div style="padding-top:6vh;text-align:center;">'
      + '<div style="display:flex;align-items:center;justify-content:center;gap:10px;margin-bottom:24px;"><div style="width:46px;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,74,0.45));"></div><div style="width:6px;height:6px;border:1px solid rgba(200,168,74,0.55);transform:rotate(45deg);"></div><div style="width:46px;height:1px;background:linear-gradient(90deg,rgba(200,168,74,0.45),transparent);"></div></div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;line-height:1.72;color:#F4ECD6;max-width:380px;margin:0 auto;">' + _boost + '</div>'
      + '<div style="margin:28px auto 0;max-width:380px;padding:16px;background:rgba(200,168,74,0.06);border:1px solid rgba(200,168,74,0.18);border-radius:14px;text-align:left;">'
      + '<div style="font-size:10px;letter-spacing:2px;color:rgba(200,168,74,0.5);text-transform:uppercase;margin-bottom:8px;">✦ Avant de te lever</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;color:rgba(240,234,214,0.85);line-height:1.6;">' + pb.technique + '</div>'
      + '</div>'
      + '<div style="margin:16px auto 0;max-width:380px;padding:16px;background:rgba(200,168,74,0.06);border:1px solid rgba(200,168,74,0.18);border-radius:14px;text-align:center;">'
      + '<div style="font-size:10px;letter-spacing:2px;color:rgba(200,168,74,0.5);text-transform:uppercase;margin-bottom:10px;">✦ Du\'â</div>'
      + '<div style="font-family:\'Scheherazade New\',serif;font-size:22px;color:#C8A84A;direction:rtl;margin-bottom:10px;line-height:1.6;">' + pb.arabic_dua + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;color:rgba(240,234,214,0.7);line-height:1.6;margin-bottom:6px;">' + pb.duaFr + '</div>'
      + '<div style="font-size:11px;color:rgba(200,168,74,0.45);">— ' + pb.duaSource + '</div>'
      + '</div>'
      + '<button onclick="_pmGo(\'retour\')" style="margin-top:32px;padding:15px 44px;border-radius:30px;border:1px solid #E8CE8A;background:linear-gradient(180deg,#F8EAC2,#D4AF37);color:#1a130b;font-family:\'Cormorant Garamond\',serif;font-size:17px;letter-spacing:.03em;cursor:pointer;">Je vais prier</button>'
      + '<div onclick="_pmGo(\'symptom\')" style="margin-top:18px;font-family:\'Cormorant Garamond\',serif;font-style:italic;font-size:14px;color:rgba(200,168,74,0.5);cursor:pointer;">\u2039 Recommencer</div>'
      + '</div>';
```

---

## script.js — Étape 3 : Ajouter l'étape 'retour'

Ajoute ce bloc après le bloc `} else if (_pmStep === 'boost') {` et avant `b.innerHTML = html;` :

```js
  } else if (_pmStep === 'retour') {
    html = '<div style="padding-top:10vh;text-align:center;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:24px;color:#F4ECD6;margin-bottom:32px;">Comment s\'est passée ta prière ?</div>'
      + '<div style="display:flex;flex-direction:column;gap:12px;max-width:320px;margin:0 auto;">'
      + '<button onclick="_pmRetour(0)" style="padding:16px;border-radius:14px;border:1px solid rgba(200,168,74,0.3);background:rgba(200,168,74,0.06);color:#F4ECD6;font-family:\'Cormorant Garamond\',serif;font-size:17px;cursor:pointer;">Elle m\'a apaisé</button>'
      + '<button onclick="_pmRetour(1)" style="padding:16px;border-radius:14px;border:1px solid rgba(200,168,74,0.3);background:rgba(200,168,74,0.06);color:#F4ECD6;font-family:\'Cormorant Garamond\',serif;font-size:17px;cursor:pointer;">Ni bien ni mal</button>'
      + '<button onclick="_pmRetour(2)" style="padding:16px;border-radius:14px;border:1px solid rgba(200,168,74,0.3);background:rgba(200,168,74,0.06);color:#F4ECD6;font-family:\'Cormorant Garamond\',serif;font-size:17px;cursor:pointer;">Toujours difficile</button>'
      + '</div>'
      + '</div>';
  } else if (_pmStep === 'retour-msg') {
    var _msgs = [
      'Alhamdulillah. C\'est ça, la prière — elle ne change pas toujours les circonstances. Elle change celui qui prie. Garde ce moment avec toi.',
      'C\'est déjà une prière accomplie. Allah ne juge pas la qualité du ressenti — Il juge la présence et l\'intention. Tu étais là. C\'est l\'essentiel.',
      'La difficulté n\'annule pas la récompense — elle la multiplie. Reviens demain. Chaque prière difficile accomplie est une preuve de foi que les prières faciles ne peuvent pas donner.'
    ];
    html = '<div style="padding-top:10vh;text-align:center;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;line-height:1.72;color:#F4ECD6;max-width:360px;margin:0 auto 36px;">' + _msgs[_pmRetourIdx] + '</div>'
      + '<button onclick="closePrierMieux()" style="padding:15px 44px;border-radius:30px;border:1px solid rgba(200,168,74,0.4);background:transparent;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-size:16px;cursor:pointer;">Fermer</button>'
      + '</div>';
  }
```

---

## script.js — Étape 4 : Ajouter les variables et fonctions

Après `var _pmStep = 'intro', _pmIdx = -1;` ajoute :
```js
var _pmRetourIdx = 0;
function _pmRetour(i) { _pmRetourIdx = i; _pmStep = 'retour-msg'; renderPM(); }
```

---

## script.js — Étape 5 : Ajouter arabic_dua aux profils

Dans chaque profil, ajouter le champ arabic_dua :
- Profil 0 : arabic_dua: 'اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ وَشُكْرِكَ وَحُسْنِ عِبَادَتِكَ'
- Profil 1 : arabic_dua: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ'
- Profil 2 : arabic_dua: 'رَبِّ أَدْخِلْنِي مُدْخَلَ صِدْقٍ وَأَخْرِجْنِي مُخْرَجَ صِدْقٍ'
- Profil 3 : arabic_dua: 'اللَّهُمَّ إِنِّي أَسْأَلُكَ خَشْيَتَكَ فِي السِّرِّ وَالْعَلَانِيَةِ'
- Profil 4 : arabic_dua: 'رَبِّ إِنِّي ظَلَمْتُ نَفْسِي ظُلْمًا كَثِيرًا وَلَا يَغْفِرُ الذُّنُوبَ إِلَّا أَنْتَ فَاغْفِرْ لِي'
- Profil 5 : arabic_dua: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ'
- Profil 6 : arabic_dua: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ عَلَيْكَ تَوَكَّلْتُ وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ'
- Profil 7 : arabic_dua: 'اللَّهُمَّ لَا تَجْعَلِ الدُّنْيَا أَكْبَرَ هَمِّنَا وَلَا مَبْلَغَ عِلْمِنَا'

## Trigger
```
Lis SPEC-PM-COMPLET.md et applique-le exactement en 5 étapes.
npm run build && git add -A && git commit -m "feat: Prier mieux complet - technique + dua + retour apres priere" && git push
```
