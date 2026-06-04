# NIYYAH — Inventaire complet des features (script.js)

---

## 1. Sanctuaire (vue principale)

- **Orbe d'intention** — Sphere sacree interactive, affiche l'intention du jour ou invite a en poser une
- **Greeting / Murmure** — Salam personnalise 1x/jour puis murmure rotatif (1 par semaine, par jour)
- **Bandeau moment** — Bloc contextuel avec priere en cours, items restants et prochain horaire
- **Fil du jour card** — Carte Au fil du jour avec compteur de gestes poses entre les prieres
- **Stats row** — Ligne de statistiques (streak, jours, score) sous l'orbe
- **Titre spirituel** — Rang arabe dynamique (At-Talib, Al-Muwadib, Al-Muhsin, Ar-Rasikh) base sur le streak
- **Atmosphere hijri** — Theme visuel adapte au mois hijri courant (4 saisons, couleurs gold)
- **Defi card** — Carte du defi hebdomadaire avec progression et CTA
- **Decouverte J1-J7** — Encart de bienvenue les 7 premiers jours apres installation
- **Mode Silence** — Overlay plein ecran le jour de grace, bloque toute interaction
- **Banniere Cure colere** — Encart si cure en cours (jour X/7)
- **Banniere Muhasaba** — Invitation douce post-colere (15min-72h)
- **Tawba glow** — Effet visuel persistant 24h apres une Tawba
- **Carte Vendredi Regard** — Invitation speciale le vendredi a partager un verset en image
- **Bandeau Qiyam** — Bloc nuit avec CTA Tahajjud (si niveau 4 debloque)
- **Fajr challenge** — Carte de streak Fajr

## 2. Pratique (5 prieres)

- **6 blocs temporels** — Fajr, Dhuhr, Asr, Maghrib, Isha, Nuit avec horaires locaux
- **Detection bloc actif** — getCurrentPrayerBlock determine le bloc selon heure et horaires calcules
- **Horaires de priere** — Calcul local des 5 prieres + lever/coucher selon geolocalisation ou ville
- **Priere a l'heure** — Toggle avec ponderation 3pts
- **Priere en mosquee** — Toggle jamaah par priere
- **Jumua** — Toggle special vendredi
- **Rappels priere** — Notifications locales X minutes avant chaque priere
- **Countdown** — Compte a rebours vers la prochaine priere dans le Sanctuaire
- **Audio feedback** — Son de validation quand une priere est cochee

## 3. Chemin (parcours, levels)

- **4 niveaux** — Reconnexion, Discipline, Excellence, Lumiere
- **Sections par niveau** — Items groupes (prieres, dhikr, lecture, bienfaisance, etc.)
- **Barre de progression** — Pourcentage de completion par niveau
- **Onglets niveaux** — Navigation entre niveaux debloques
- **Deblocage auto** — Niveau suivant a 100% du precedent
- **Popup level-up** — Modale de celebration avec verset coranique
- **3 profils** — Reconnecter (Revenant), Routine (Regulier), Sacraliser (Complet)
- **Filtrage profil** — _itemMatchesProfile filtre les items selon le profil actif
- **Evolution Revenant-Regulier** — Modale apres 40 jours de streak
- **Evolution Regulier-Complet** — Modale apres 90 jours de streak
- **Star unlock** — Etoiles a des paliers de streak (3/7/14/30/60 jours)

## 4. Au Fil du Jour

- **Vue complete** — Liste de tous les items entre les prieres
- **Accordeons** — Sections pliables par categorie
- **Wird inline** — Cartes Wird Matin/Soir integrees
- **Compteur contextuel** — Message adapte au nombre de gestes (0 a 8+)

## 5. Vue Rituel (post-priere)

- **Ecran dedie** — Vue par bloc de priere avec items specifiques
- **Items par bloc** — Filtrage selon le champ block de chaque item
- **Validation inline** — Cocher directement dans la vue rituel
- **Retour Sanctuaire** — Bouton retour apres completion

## 6. Modules spirituels

### Bab an-Nafs (Portes de l'ame)
- **Grille de portes** — Interface 2x2 avec images (colere, envie, orgueil, etc.)
- **Contenu JSON** — bab-nafs-content.json avec textes, exercices, versets
- **Cure Colere** — Programme 7 jours contre la colere
- **Muhasaba** — Auto-examen guide avec questions et engagements
- **Rappel engagements** — Suivi des engagements passes
- **Invitation douce** — Banniere post-colere (delai 15min, expiration 72h)

### Regarde (Scanner de vision)
- **Capture photo+question** — Photo un objet, pose une question
- **Verset contextuel** — Reponse par verset coranique (REGARD_VERSETS)
- **Journal** — Historique des captures avec favoris et notes
- **Partage image** — Canvas 1080x1080 avec verset pour partage
- **Alerte spontanee** — 30% de chance, 9h-21h, 1x/jour max
- **Vendredi Regard** — Favoris de la semaine le vendredi

### Tawba (Retour / Repentance)
- **Detection absence** — Auto apres 2+ jours sans ouvrir
- **23 messages** — Pool rotatif, ton compassionnel
- **Tawba forcee** — Via bilan soir distrait
- **Streak preserve** — Jusqu'a 7j, reset doux apres

### Wird (Invocations matin/soir)
- **2 sessions** — Matin et Soir avec items specifiques
- **Items cochables** — Chaque dhikr cochable individuellement
- **Overlay completion** — Celebration quand session terminee
- **Smart card** — Carte dans le Sanctuaire

### Tasbih (Compteur)
- **Compteur tactile** — Tap pour incrementer
- **Modal par priere** — Version contextuelle post-priere
- **Retour haptique** — Vibration a chaque tap

### Al-Waqt (Messages temporels)
- **Messages spontanes** — Contextuels selon le moment de la journee
- **4 plages** — Matin, apres-midi, soir, nuit
- **Medaillon** — Etat visuel lie au moment

### Scanner Niyyah (Intention AI)
- **Capture intention** — Photo + question traitee par IA (Claude via Cloudflare Worker)
- **Sacralisation objet** — Base offline avec signification spirituelle
- **Journal intentions** — Historique des intentions capturees
- **Quota scanner** — Indicateur sous le bouton Capturer
- **Pre-ecran permission** — Demande camera avant getUserMedia

## 7. Contenu

- **Quran lecture** — Verset par verset avec progression et modal khatma
- **Quran ecoute** — Audio de sourates avec picker (114) et recitateurs
- **Sourate Al-Kahf** — Ecoute speciale du vendredi
- **Sira** — Biographie du Prophete en chapitres (data/sira.min.json)
- **Recits du Coran** — 20 recits avec paragraphes et meditation (data/recits-coran.json)
- **Hadith du jour** — 1 hadith quotidien en rotation (hadiths_jour.json)
- **Dua du jour** — 1 dua quotidienne avec cycle et modal (duaas.json)
- **Fiqh du jour** — 1 regle juridique quotidienne (fiqh_jour.json)
- **Savais-tu** — 1 fait culturel islamique quotidien partageable (savais_tu.json)
- **Compagnons** — 1 compagnon par jour (compagnons.json)
- **Prophetes** — 1 prophete par jour (prophetes.json)
- **Podcast islamique** — Picker de podcasts recommandes
- **Tafakkur** — Contemplation avec compteur et confettis

## 8. Onboarding

- **Ecran Niyyah** — Premier ecran avec calligraphie et choix intention
- **3 chemins** — Reconnecter, Routine, Sacraliser
- **Particules** — Animation sur ecran de choix
- **Ecran notification** — Demande permission avec pre-ecran explicatif
- **Welcome message** — Murmure special au premier lancement selon profil
- **Splash screen** — Ecran avec fade-out 400ms au boot
- **Replay onboarding** — Rejouable depuis les settings

## 9. Settings / Admin

- **Overlay settings** — Panneau de reglages
- **Prenom** — Saisie pour personnaliser les messages
- **Jour de silence** — Selection du jour de grace hebdomadaire
- **Langue** — FR/EN/AR avec detection automatique
- **Export donnees** — Sauvegarde JSON du localStorage
- **Import donnees** — Restauration depuis fichier JSON
- **Info chemin** — Profil actif et parcours evolution
- **Debug mode** — Flag NIYYAH_DEBUG, parametre debugWeek

## 10. Systeme

### Service Worker et Cache
- **SW registration** — Pattern SKIP_WAITING avec message
- **Cache CORE** — 27 ressources pre-cachees
- **Cache fonts** — Cache separe Google Fonts (niyyah-fonts-v1)
- **Network-first local** — Strategie network-first avec fallback cache
- **Bypass API** — Requetes API jamais cachees

### Snapshots et Stats
- **Snapshot quotidien** — Sauvegarde auto etat du jour (niyyah_snapshot_YYYY-MM-DD)
- **Stats hebdo** — Aggregation snapshots pour bilan
- **Dominante hebdo** — Zone dominante (fajr, bienfaisance, lecture, bilan, dua, equilibre, quasi_vide)
- **Comparaison semaine** — Delta avec semaine precedente

### Bilan hebdomadaire
- **Overlay 5 zones** — Bilan anime avec parole, voix, conseil
- **PAROLES_SCORE** — Messages par seuil de score (0-100%)
- **_NIYYAH_VOICE** — 54 messages (6 dominantes x 3 profils x 3 variations)
- **_CONSEILS_CHEMIN** — 25 conseils en 3 mouvements
- **Premium AI** — Message Claude Sonnet avec cache semaine ISO
- **Badge premium** — Indicateur visuel pour messages IA

### Premium / Freemium
- **isPremium()** — Verification statut (niyyah_pro)
- **FREEMIUM_CODES** — Codes activation (vide actuellement)
- **Overlay freemium** — Ecran upgrade (dead code)
- **Gumroad** — Lien achat externe

### Ramadan
- **Mode Ramadan** — Activation avec items supplementaires
- **Boost modal** — Proposition intensification debut Ramadan
- **Eid modal** — Celebration fin Ramadan
- **Banniere hijri** — 14 evenements calendaires sacres

### Defis hebdomadaires
- **100 defis** — DEFIS_DB (33 faciles, 33 moyens, 34 intensifs)
- **Selection lundi** — Modal de choix avec 3 options
- **Adaptation** — Difficulte ajustee selon succes/echec
- **Toast quotidien** — Encouragement 1x/jour si defi en cours
- **Filtrage profil** — Defis filtres selon profil actif

### Notifications
- **Rappels priere** — Notifications locales avant chaque priere
- **Permission pre-ecran** — Ecran explicatif avant demande systeme
- **notificationclick** — Clic notif ouvre app avec NOTIFICATION_ACTION

### Utilitaires
- **niyyahIcon()** — 10 icones SVG (priere, dhikr, lecture, douaa, intention, nuit, matin, croissance, silence, lien)
- **safeGetItem / safeSetItem** — localStorage resilient avec gestion quota
- **t() / tI() / tD()** — Traduction FR/EN/AR
- **_numToLetters()** — Nombre vers lettres francaises (0-10)
- **showToast()** — Toast notifications
- **Capacitor bridge** — Pont natif Android/iOS (vibration, partage, haptics)
- **Midnight reset** — Detection changement de jour et reinitialisation
- **Cleanup 60j** — Nettoyage auto cles localStorage anciennes
- **Multi-tab sync** — Synchronisation via event storage
- **Visibility change** — Re-check au retour de app
- **Confettis** — Animations de celebration
- **Audio** — Sons de validation, completion et compteur
- **Compression photo** — Redimensionnement canvas pour economiser quota