# Niyyah — Porte Colère : État réel du code

> Document généré le 2026-05-04 depuis script.js (v526), bab-nafs-content.json, index.html.
> Réf commit : `b50542c` — tag `v526-pilote-colere-pret-playstore`

---

## 1. Architecture globale

### 1.1 Fichiers source

| Fichier | Rôle | Lignes |
|---------|------|--------|
| `script.js` L3581-5177 | 65 fonctions Colère + 7 renderers + 14 wrappers | ~1600 lignes |
| `bab-nafs-content.json` section colère | Hadiths, duʿâʾ, voix-témoin, 7 jours | ~200 lignes JSON |
| `BAB_AN_NAFS` objet inline (script.js ~L8444) | 3 rappels, 3 actions, 2 intentions, 2 clôtures | ~60 lignes |

### 1.2 Fonctions (86 total)

**Entrée / grille :** `renderBabAnNafs` (L3581), `openBabPorte` (L3629)
**Thermomètre :** `openPorteChoix` (L3732), `_renderThermometre` (L3747)
**Yasîr :** `openPorteYasir` (L3834), `_yasirSouffle` (L3848), `_yasirIntention` (L3865), `_yasirChoix` (L3880)
**Mutawassiṭ :** `openPorteMutawassit` (L3892), `_mutawassitExit` (L3899)
**Shadîd / Iṭfâʾ :** `openPorteShadid` (L3959), `openItfaaOuverture` (L4026), `openItfaaStep1` (L4042), `_halo` (L3964), `openItfaaSomatic` (L3982), `openItfaaAction` (L4078), `_itfaaFaitClick` (L3924), `openItfaaEmotionSous` (L3929), `openItfaaRefuge` (L4148)
**Muḥâsaba :** `openMuhasabaIntro` (L4181) → `Emotion` (L4194) → `Besoin` (L4213) → `Schema` (L4232) → `Sens` (L4263) → `Action` (L4328) → `Engage` (L4361) → `Cloture` (L4385)
**Cure 7j :** `_cureChoixMode` (L4565), `openCureColere` (L4630), `openCureJour` (L4473), `_cureDoucement` (L4591), `_cureJourSave` (L4483), `_cureJ7Finale` (L4543), `_cureTransition` (L4456)
**Renderers :** `_cureJourRenderers.colere_1` (L4659) à `colere_7` (L5003)
**Complétion :** `babCompletPorte` (L5113), `openPorteSeuilTherapeute` (L5158)
**Utilitaires :** `afficheLeSouffle` (L3797), `_resolveRef` (L4439), `_getCureJourData` (L4449), `_logColereZone` (L3825), `_logSomatic` (L4003), `_logEmotionSous` (L3949)

### 1.3 Clés localStorage (17)

| Clé | Type | Écrite par | Lue par |
|-----|------|-----------|----------|
| `cure_colere` | JSON | `_cureJourSave` | `openCureColere`, `_cureJ7Finale`, `renderBabAnNafs` (étoile) |
| `cure_mode` | string | `_cureChoixMode` (onclick) | `openCureJour`, `_cureJourSave`, `_cureJ7Finale` |
| `cures_colere_count` | int string | `_cureJourSave` (J7) | — |
| `colere_zone_log` | JSON array | `_logColereZone` | `_renderThermometre` |
| `colere_completions` | JSON array | `babCompletPorte`, `_mutawassitExit` | `babCompletPorte`, `_renderThermometre` |
| `colere_somatic_log` | JSON array | `_logSomatic` | renderer `colere_2` (recap) |
| `colere_emotion_sous_log` | JSON array | `_logEmotionSous` | renderer `colere_4` (recap) |
| `colere_zone_rouge_count` | int string | `babCompletPorte` | — |
| `colere_seuil_vu` | timestamp | `openPorteSeuilTherapeute` (onclick) | `babCompletPorte` |
| `colere_intention_prochaine` | string | `_yasirChoix` | **jamais lue** ⚠ vestige |
| `colere_muhasaba_invite` | string | `openItfaaRefuge` | **jamais lue** ⚠ vestige |
| `souffle_mode` | string | **jamais écrite** ⚠ fantôme | `afficheLeSouffle` (défaut: silence) |
| `niyyah_bab_an_nafs` | JSON | `babCompletPorte`, `_mutawassitExit` | `babCompletPorte` |
| `niyyah_bab_idx` | JSON | `_babSetIdx` | `_babGetIdx` |
| `muhasaba_engagements` | JSON array | `_muhasabaEngage` | `renderBabAnNafs` |
| `muhasaba_colere_*` | JSON | `_muhasabaEngage` | — |
| `nafs_avertissement_seen` | string | `_showWaswasaScreen` | `_showWaswasaScreen` |

---

## 2. Thermomètre 3 zones

**Entrée** : `openPorteChoix` (L3732). Écran immersif. 2 lignes animées (fade-in 1s + 0.8s) :

> « Tu es venu. C’est déjà un travail. »
> « Comment es-tu maintenant ? » _(doré)_

Après 2.5s → `_renderThermometre()` (L3747).

### 2.1 Trois boutons-zones

| Zone | Label FR | Sous-texte | Arabe | Couleur | Action |
|------|----------|-----------|-------|---------|--------|
| Verte | « Ça me chatouille. » | « je peux encore respirer calmement » | Yasîr | #4a7c59 | `openColereYasir()` |
| Orange | « Ça me prend. » | « mon corps se serre, mon cœur bat plus fort » | Mutawassiṭ | #c8763a | `openColereMutawassit()` |
| Rouge | « Ça me submerge. » | « je vais exploser, je n’arrive plus à penser » | Shadîd | #a3372a | `openColereShadid()` |

### 2.2 Stats (si ≥ 2 entrées `colere_zone_log` sur 7j)

Format : « Cette semaine : X visites · Plus souvent : [label] » + médiane récup si ≥ 2 rouges.

### 2.3 Bouton Cure (bas du thermomètre)

Séparateur : `⸻ ✦ ⸻`  
Bouton pleine largeur (max-width 340px, aligné sur cartes) :  
Ligne 1 : « Travailler ma colère en profondeur » (16px doré)  
Ligne 2 : « Une démarche de 7 jours · Riyâḍat an-nafs » (12px gris italique)  
onclick : `openCureColere()`

---

## 3. Parcours Yasîr (zone verte)

`openPorteYasir` → `_yasirSouffle` → `_yasirIntention` → `_yasirChoix`

**Écran 1** (3s) : « Tu es venu en moment calme. » / « C’est ici qu’on prépare les moments durs. »
**Écran 2** (30s ou clic) : Cercle respiratoire, texte « Dans ton souffle : A’ûdhu billâh »
**Écran 3** : « La prochaine fois que ça monte plus, tu feras quoi ? »
→ 3 boutons : « Je m’assoirai. » / « Je me tairai 30 secondes. » / « J’irai faire mes ablutions. »
**Écran 4** (1.5s) : « Bismillah. » → retour Sanctuaire

---

## 4. Parcours Mutawassiṭ (zone orange)

Set `_colereMode = 'mutawassit'` → `openItfaaStep1()` (mêmes étapes somatiques que Shadîd).
Différence : après `_itfaaFaitClick()` → `_mutawassitExit()` (pas d’émotion-sous ni refuge).

**Écran sortie** : « La vague redescend. » / « Allah voit. » → retour Sanctuaire après 2.5s.

---

## 5. Parcours Shadîd / Iṭfâʾ (zone rouge)

Set `_colereMode = 'shadid'` → `openItfaaOuverture()`.

### 5.1 Ouverture (L4026)

Affichage séquentiel (1.5s → 2s → 2.5s) :
- AR : « لَا تَغْضَبْ » (48px rouge)
- Translit : « Lâ taghḍab — Ne te mets pas en colère. »
- Source : « Bukhârî 6116 — ṣaḥîḥ »
Auto 4s → `openItfaaStep1()`

### 5.2 Silhouette corporelle (L4042)

5 zones SVG cliquables :

| Zone | Label FR | Label AR |
|------|----------|----------|
| tête | La mâchoire | الفَكّ |
| gorge | La gorge | الحَلْق |
| poitrine | La poitrine | الصَّدْر |
| ventre | Le ventre | البَطْن |
| mains | Les mains | اليَد |

Hadith sous silhouette (depuis JSON `itfaa.etape1_corps_general` ou fallback inline) :
- AR : « لَيْسَ الشَّدِيدُ بِالصُّرْعَةِ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ »
- FR : « Le fort n’est pas celui qui terrasse. Le fort est celui qui se maîtrise dans la colère. »
- Source : Bukhârî 6114, Muslim 2609

### 5.3 Halo zone (L3964)

Overlay plein écran (noir 0.9). Séquence : nom arabe 80px (1.5s) → label français (2s) → « Continuer » (3s). Auto 6s → `openItfaaSomatic()`.

### 5.4 Naming somatique (L3982)

« Comment est-ce que ça se sent ? »
4 boutons : **Chaud** / **Serré** / **Vibrant** / **Lourd**
→ log dans `colere_somatic_log` → `openItfaaAction()`

### 5.5 Action zone-spécifique (L4078)

| Zone | Texte action | Source hadith |
|------|-------------|---------------|
| tête | « L’eau apaise. Va faire les ablutions. » | Abû Dâwûd 4784 retiré (ḍaʿîf) → conseil |
| gorge | « Tais-toi. Ne dis rien pendant une minute. » | Aḥmad 2136 (JSON `etape2_silence`) |
| poitrine/ventre | « Si tu es debout, assieds-toi. Si tu es assis, allonge-toi. » | Abû Dâwûd 4782 (JSON `etape2_assise`) |
| mains | « Marche une minute. Respire profondément. » | — (pas de réf JSON) |

Bouton commun : « J’ai fait ☆ » → `_itfaaFaitClick()` :
- Si mutawassiṭ → `_mutawassitExit()` (fin)
- Si shadîd → `openItfaaEmotionSous()` (continue)

### 5.6 Émotion sous (L3929)

« Je suis en colère… » + « Et dessous, peut-être : »
5 boutons : **Triste** / **Blessé** / **Impuissant** / **Trahi** / **Je ne sais pas**
+ « Passer » → skip vers refuge. Log dans `colere_emotion_sous_log`.

### 5.7 Refuge (L4148)

Hadith (JSON `etape7_refuge`) :
- AR : « أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ »
- FR : « Je cherche refuge auprès d’Allah contre Satan le lapidé. »
- Source : Bukhârî 3282, Muslim 2610
- Contexte JSON : « Le Prophète ﷺ a dit, en voyant un homme dont les veines se gonflaient de colère : “Je connais une parole qui, s’il la disait, ferait disparaître ce qu’il ressent.” »

Message : « Quand le calme sera revenu, tu pourras revenir ici à froid. La porte t’attend. »

2 boutons : « Plus tard, en Muḥâsaba » (set flag, complète porte) / « Sortir » (complète porte)

---

## 6. Muḥâsaba (réflexion à froid)

8 écrans : Intro → Émotion → Besoin → Schéma → Sens → Action → Engage → Clôture

**Intro** (L4181) : « Bismillah. Ce que je vais regarder, c’est entre Allah et moi. » + « Niyyah — l’intention juste qui précède l’acte. » (auto 3s)

**Émotion** (L4194) : « Sous la colère, qu’est-ce qui se cachait ? » → 7 boutons : Honte / Peur / Tristesse / Injustice / Impuissance / Trahison / Culpabilité

**Besoin** (L4213) : « Sous chaque émotion, il y a un besoin. Lequel n’a pas été comblé ? » → 6 boutons : Reconnaissance / Sécurité / Justice / Respect / Appartenance / Compétence

**Schéma** (L4232) : « Y a-t-il un fil rouge dans tes colères ? » → 5 checkboxes toggle + textarea

**Sens** (L4263) : « L’âme cherche un sens. 3 portes s’ouvrent. »
| Porte | Nom | Source |
|-------|-----|--------|
| 1 | La Leçon (al-ʿIbra) | Coran 12:111 |
| 2 | Le Pardon (al-ʿAfw) | Muslim 2588 |
| 3 | La Demande (ad-Duʿâʾ) | an-Nasâʾî 1305 |

**Action** (L4328) : Hadith « Innamâ al-aʿmâlu bi-n-niyyât » (Bukhârî 1) + 4 types d’action

**Clôture** (L4385) : AR « محاسبة » + « Allah voit ce que tu vois. C’est entre toi et Lui maintenant. » + « Murâqaba — la vigilance constante du serviteur sous le regard d’Allah. »

---

## 7. Cure 7 jours (Riyâḍat an-nafs)

### 7.1 Choix de mode (L4565)

| Mode | Emoji | Description |
|------|-------|-------------|
| Doucement | 🌱 | « Je teste, je n’engage pas plus de 2 minutes par jour » |
| Sérieusement | 🌳 | « Je donne 10 minutes par jour » |

### 7.2 Router (L4630)

1. Vérifie `cure_mode` → sinon `_cureChoixMode()`
2. Lit `cure_colere.current_day`
3. Déjà fait aujourd’hui ? → `_cureTransition(jour)` : texte JSON `transitionApres` + « Aujourd’hui, attends. La porte rouvre demain. »
4. `completed === true` → « Tu as traversé Riyâḍat an-nafs. La porte reste ouverte derrière toi. »
5. Sinon → `openCureJour('colere', day)`

### 7.3 Mode Doucement — template (L4591)

Lit depuis JSON via `_getCureJourData(jour)` :
```
[Riyâḍat an-nafs — Jour N]
[titre_fr]
[hadith box si hadithRef résolu]
[voixTémoin1] — message principal
[voixTémoin2] — encouragement
[boutonAction]
[Lien: "Passer en Sérieusement →"]
```

### 7.4 Les 7 jours — contenu complet

#### J1 : « Reconnaître le feu »
- **Doucement** : « Aujourd’hui, juste reconnais. » / « Pas plus. » / bouton « J’ai reconnu » / hadithRef=$itfaa.etape7_refuge
- **Sérieusement** (L4659) : Niyyah textarea + auto-efficacité 1-10 + Bukhârî 6116 + exercice « Observe tes colères. Note-les en 1 ligne. » + clôture an-Nasâʾî 1305
- **Transition** : « Hier tu as reconnu le feu. »

#### J2 : « Les déclencheurs »
- **Doucement** : « Aujourd’hui, juste nomme un déclencheur. » / « Un seul. » / « J’ai nommé »
- **Sérieusement** (L4734) : Bukhârî 6114 + recap somatique + 5 questions (QUI/OÙ/QUAND/COMMENT/POURQUOI) + Muslim 2867
- **Transition** : « Hier tu as nommé tes déclencheurs. »

#### J3 : « La parole juste »
- **Doucement** : « Aujourd’hui, choisis le silence une fois. » / « Une seule. » / « J’ai choisi le silence »
- **Sérieusement** (L4804) : Aḥmad 2136 + silence 30s (cercle respiratoire) + « est-ce que ces mots servent Allah, ou mon ego ? » + Bukhârî 6306
- **Transition** : « Hier tu as cherché la parole juste. »

#### J4 : « L’émotion sous »
- **Doucement** : « Aujourd’hui, regarde sous la colère. » / « Juste regarde. » / « J’ai regardé »
- **Sérieusement** (L4856) : citation al-Muḥâsibî + recap émotion-sous + 7 émotions toggle + « Ô Allah, montre-moi ce qui se cache sous ma colère. »
- **Transition** : « Hier tu as regardé sous la colère. »

#### J5 : « Le ḥilm »
- **Doucement** : « Aujourd’hui, choisis le ḥilm une fois. » / « Douceur, pas mollesse. » / « J’ai choisi le ḥilm »
- **Sérieusement** (L4911) : Bukhârî 6035 + « Le ḥilm = la douceur qui a le pouvoir de la colère mais choisit la patience. Pas la mollesse. » + Ṣalât ʿala-n-nabiyy ×10
- **Transition** : « Hier tu as travaillé le ḥilm. »

#### J6 : « Le pardon »
- **Doucement** : « Aujourd’hui, relâche une chose. » / « Juste une. » / « J’ai lâché »
- **Sérieusement** (L4954) : Muslim 2588 + « Pense à une personne. Dis intérieurement : “Allah est Témoin, je lâche.” » + Coran 7:151
- **Transition** : « Hier tu as relâché. »

#### J7 : « Intégration »
- **Doucement** : « Tu as marché sept jours. » / « Qu’est-ce qui a changé ? » / « J’ai marché »
- **Sérieusement** (L5003) : Coran 13:11 + recap notes J1-J6 + 3 questions bilan + auto-efficacité + « الْحَمْدُ لِلَّهِ — Riyâḍat est terminée, le chemin commence. »

### 7.5 Finale J7 (L4543)

- **Doucement** : « Tu as tenu sept jours. Tu peux passer en Sérieusement. » + 2 boutons
- **Sérieusement** : « بَارَكَ اللَّهُ فِيكَ » + « Tu as marché 7 jours. Allah voit. » + progression efficacité J1→J7

### 7.6 Seuil thérapeute (L5158)

Détection : ≥ 5 complétions sur 7j + cooldown 30j.
Écran : « Tu es revenu cinq fois cette semaine. Allah voit ta lutte. Cette porte t’attend autant qu’il faudra. Et si la colère continue de revenir aussi fort, parle à un humain de confiance. »

---

## 8. Ponts entre flows

| Pont | De → Vers | Mécanisme | Statut |
|------|-----------|-----------|--------|
| Thermomètre → Cure | Bouton bas thermomètre | `openCureColere()` direct | ✅ Actif |
| Iṭfâʾ → Muḥâsaba | Bouton refuge | set `colere_muhasaba_invite` | ⚠ **Pont mort** — flag jamais relu |
| Cure → Grille Bab | Bouton retour post-save | `renderBabAnNafs()` | ✅ Actif |
| Doucement ↔ Sérieusement | Lien bas mode Doucement | set `cure_mode`, rappelle jour | ✅ Actif |
| Al-Waqt | — | Aucun lien avec Colère | ❌ Indépendant |

---

## 9. Structure bab-nafs-content.json

```
colere/
  nameAr, nameFr, modeShort
  itfaa/
    etape1_corps_general  — Bukhârî 6114
    etape2_assise         — Abû Dâwûd 4782
    etape2_silence        — Aḥmad 2136
    etape2_wudu           — conseil (ḍaʿîf retiré)
    etape7_refuge         — Bukhârî 3282
  muhasaba/
    etape6_pardon         — Muslim 2588
    etape6_duaa_parole_juste — an-Nasâʾî 1305
    etape7_intention      — Bukhârî 1
  jours/
    "1"→"7" : titre_fr, hadithRef/$ref, doucement{voix1,voix2,bouton}, sérieusement{...}, transitionAprès
```

Résolution `$ref` : `_resolveRef("$itfaa.etape2_silence")` → `babNafsContent.colere.itfaa.etape2_silence`

---

## 10. Traces résiduelles

### 10.1 Bifurcation « Pour toi / Pour Allah »

Fichier `TODO-colere-pour-allah.md` (16 lignes). Contenu sauvegardé d’une bifurcation supprimée (~v508) :
- Coran 3:134, 3 lignes voix-témoin, duʿâʾ al-ḥikma
- **Statut** : fichier inerte, zéro référence dans le code

### 10.2 `colere_intention_prochaine` — vestige

Écrite dans `_yasirChoix` (L3882). **Jamais relue.** Intention probable : rappel « la prochaine fois » jamais implémenté.

### 10.3 `colere_muhasaba_invite` — pont mort

Écrite dans `openItfaaRefuge`. **Jamais relue.** Le pont Iṭfâʾ → Muḥâsaba est mort.

### 10.4 `souffle_mode` — fantôme

Lue dans `afficheLeSouffle` (L3800), fallback `'silence'`. **Jamais écrite.** Le sélecteur de mode souffle (subhanallah/istighfar/lahawla) est inaccessible. Toujours « Inspire/Expire ».

### 10.5 Disclaimer waswasa

`_showWaswasaScreen` (L8930) : avertissement au premier accès onglet Nafs. Pas spécifique Colère. Texte : « Cette application n’émet pas d’avis religieux. Pour toute question de fiqh, consultez un savant qualifié. »

### 10.6 Bible / §15.2

**Aucune référence trouvée.** Grep `Bible`, `§15`, `contradiction` : 0 résultats. App exclusivement islamique.

### 10.7 Beta flag

`BAB_AN_NAFS.validated = false` → bandeau « Mode beta — contenu en validation théologique ».

---

## 11. Métriques

| Métrique | Valeur |
|----------|--------|
| Fonctions Colère | 65 + 7 renderers + 14 wrappers = **86** |
| Clés localStorage | **17** (dont 3 vestiges) |
| Hadiths ṣaḥîḥ utilisés | **10** |
| Versets coraniques | **3** (7:151, 12:111, 13:11) |
| Duʿâʾ authentifiées | **4** |
| Sagesses non-hadith | **2** (al-Muḥâsibî, duʿâʾ libre J4) |
| Hadith retiré (ḍaʿîf) | **1** (Abû Dâwûd 4784 → conseil) |
| Lignes code (L3581-L5177) | **~1600** |
| Écrans utilisateur | **~35** |
