// ═══════════════════════════════════════════════════
// NIYYAH DAILY — script.js
// Généré automatiquement — séparation chirurgicale
// ═══════════════════════════════════════════════════

/* ─── BLOC 1 : Fix Stats Row ─────────────────────── */

(function fixStatsRow() {
  function applyFix() {
    var el = document.getElementById('v2-stats-row');
    if (el) {
      el.style.setProperty('display', 'flex', 'important');
      el.style.setProperty('flex-direction', 'row', 'important');
      el.style.setProperty('flex-wrap', 'nowrap', 'important');
      el.style.setProperty('gap', '7px', 'important');
      var cells = el.querySelectorAll('.sanct-stat-v2');
      cells.forEach(function(c) {
        c.style.setProperty('flex', '1 1 0', 'important');
        c.style.setProperty('min-width', '0', 'important');
      });
    }
  }
  document.addEventListener('DOMContentLoaded', applyFix);
  window.addEventListener('load', applyFix);
  setTimeout(applyFix, 500);
  setTimeout(applyFix, 1500);
})();


/* ─── BLOC 2 : Error Handler ─────────────────────── */

window.onerror = function(msg, src, line, col, err) {
  document.body.style.background = '#1a0000';
  var d = document.getElementById('_errDiv') || document.createElement('div');
  d.id = '_errDiv';
  d.style.cssText = 'position:fixed;top:0;left:0;right:0;z-index:99999;background:rgba(200,0,0,0.95);color:#fff;padding:12px 16px;font-size:13px;font-family:monospace;white-space:pre-wrap;word-break:break-all;max-height:50vh;overflow-y:auto;';
  d.textContent += (err ? err.stack || err.message : msg) + '\n--- ' + src + ':' + line + '\n\n';
  document.body.appendChild(d);
  return false;
};
window.onunhandledrejection = function(e) {
  window.onerror(e.reason, 'promise', 0, 0, e.reason);
};


/* ─── BLOC 3 : Logique principale ────────────────── */

// ── SWIPE ENTRE VUES ──────────────────────────────────────────────
(function() {
  const SWIPE_VIEWS = ['accueil', 'checklist', 'wird', 'progression'];
  let _tx = 0, _ty = 0, _ttime = 0, _tactive = false;

  function getCurrentViewIdx() {
    for (let i = 0; i < SWIPE_VIEWS.length; i++) {
      const el = document.getElementById('view-' + SWIPE_VIEWS[i]);
      if (el && el.classList.contains('active')) return i;
    }
    return -1;
  }

  document.addEventListener('touchstart', function(e) {
    _tx = e.touches[0].clientX;
    _ty = e.touches[0].clientY;
    _ttime = Date.now();
    _tactive = true;
  }, { passive: true });

  document.addEventListener('touchend', function(e) {
    if (!_tactive) return;
    _tactive = false;
    const dx = e.changedTouches[0].clientX - _tx;
    const dy = e.changedTouches[0].clientY - _ty;
    const dt = Date.now() - _ttime;
    if (Math.abs(dx) < 50) return;
    if (Math.abs(dy) > Math.abs(dx)) return;
    if (dt > 500) return;
    if (e.target.closest('.tabs,.fast-calendar,.laylatul-nights,.week-strip')) return;
    const activeOverlay = document.querySelector('#meditScreen.show,#tasbihOverlay.show,#badgePopup.show,#levelPopup.show,#freemiumOverlay.show,#weeklyOverlay.show,#infoSheet.show');
    if (activeOverlay) return;

    // Sur la checklist → swipe entre niveaux (tous, même locked → ouvre freemium)
    const checklistActive = document.getElementById('view-checklist');
    if (checklistActive && checklistActive.classList.contains('active')) {
      const allLevels = LEVELS.map(l => l.id);
      const curIdx = allLevels.indexOf(currentLevel);
      if (dx < 0 && curIdx < allLevels.length - 1) {
        animateTabSwipe('left', () => selectLevel(allLevels[curIdx + 1]));
      } else if (dx > 0 && curIdx > 0) {
        animateTabSwipe('right', () => selectLevel(allLevels[curIdx - 1]));
      }
      return;
    }

    // Sur les autres vues → swipe entre vues
    const idx = getCurrentViewIdx();
    if (idx === -1) return;
    if (dx < 0 && idx < SWIPE_VIEWS.length - 1) switchView(SWIPE_VIEWS[idx + 1]);
    else if (dx > 0 && idx > 0) switchView(SWIPE_VIEWS[idx - 1]);
  }, { passive: true });
})();
// ─────────────────────────────────────────────────────────────────

// Nettoyage dot au démarrage
document.addEventListener('DOMContentLoaded', function() {
  const dot = document.getElementById('ramadanDot');
  if (dot && !JSON.parse(localStorage.getItem('ramadan_state') || '{}').active) dot.remove();
});


// ============================================================
// BASE DE DONNÉES DES 100 DÉFIS — 3 NIVEAUX
// ============================================================
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

// ============================================================
// LOGIQUE DEFI DE LA SEMAINE
// ============================================================
function getDefiState() {
  return JSON.parse(localStorage.getItem('niyyah_defi_v2') || '{"current":null,"historique":[],"badges":[],"choixEnAttente":null}');
}
function saveDefiState(s) { localStorage.setItem('niyyah_defi_v2', JSON.stringify(s)); }

function getLundiDate() {
  const d = new Date(); const day = d.getDay(); const diff = (day === 0 ? -6 : 1 - day);
  d.setDate(d.getDate() + diff); d.setHours(0,0,0,0); return d.toISOString().split('T')[0];
}
function getTodayStr() { return new Date().toISOString().split('T')[0]; }

// Calcule la suggestion selon l'historique et le niveau
function getSuggestionDefi() {
  const s = getDefiState();
  const all = DEFIS_DB.filter(d => !s.historique.includes(d.id));
  const pool = all.length > 0 ? all : DEFIS_DB;
  return pool[Math.floor(Math.random() * pool.length)];
}

function initDefiSemaine() {
  const s = getDefiState();
  const lundi = getLundiDate();
  // Premier lancement — assigner défi id:1 par défaut
  if (!s.current && s.historique.length === 0) {
    var premierDefi = DEFIS_DB.find(function(d) { return d.id === 1; });
    if (premierDefi) {
      s.current = { id: premierDefi.id, semaine: lundi, jours: [], complete: false };
      s.choixEnAttente = null;
      saveDefiState(s);
      return s;
    }
  }
  // Si nouvelle semaine et pas encore choisi → ouvrir le sélecteur
  if (!s.current || s.current.semaine !== lundi) {
    if (!s.choixEnAttente || s.choixEnAttente.semaine !== lundi) {
      const suggestion = getSuggestionDefi();
      s.choixEnAttente = { semaine: lundi, suggestionId: suggestion.id };
      saveDefiState(s);
    }
    return s;
  }
  return s;
}

function confirmerDefi(defiId) {
  const s = getDefiState();
  const lundi = getLundiDate();
  const defi = DEFIS_DB.find(d => d.id === defiId);
  if (!defi) return;
  s.current = { id: defi.id, semaine: lundi, jours: [], complete: false };
  s.historique = [defi.id, ...s.historique].slice(0, 12);
  s.choixEnAttente = null;
  saveDefiState(s);
  closeDefiSelector();
  renderDefiCard();
  showToast('Défi lancé : ' + defi.titre + ' ✦');
}

function getDefiCourant() {
  const s = initDefiSemaine();
  const lundi = getLundiDate();
  if (!s.current || s.current.semaine !== lundi) {
    // Auto-assigner un défi si aucun n'existe pour cette semaine
    var suggestion = getSuggestionDefi();
    if (suggestion) {
      s.current = { id: suggestion.id, semaine: lundi, jours: [], complete: false };
      s.choixEnAttente = null;
      saveDefiState(s);
    }
  }
  if (!s.current) return { defi: null, state: s };
  return { defi: DEFIS_DB.find(d => d.id === s.current.id), state: s };
}

// ── DRAWER SÉLECTEUR ─────────────────────────────────────────────────────────
function openDefiSelector() {
  const s = getDefiState();
  const suggestion = s.choixEnAttente ? DEFIS_DB.find(d => d.id === s.choixEnAttente.suggestionId) : getSuggestionDefi();
  const ov = document.getElementById('defiSelectorOverlay');
  const body = document.getElementById('defiSelectorBody');
  if (!ov || !body) return;

  const diffLabel = { facile: '🟢 Facile', moyen: '🟡 Moyen', intensif: '🔴 Intensif' };
  const diffColor = { facile: '#34d962', moyen: '#ffd60a', intensif: '#ff6b6b' };
  const diffBg    = { facile: 'rgba(52,217,98,0.08)', moyen: 'rgba(255,214,10,0.08)', intensif: 'rgba(255,107,107,0.08)' };
  const diffBorder= { facile: 'rgba(52,217,98,0.2)', moyen: 'rgba(255,214,10,0.2)', intensif: 'rgba(255,107,107,0.2)' };

  let html = '';

  // Suggestion du haut
  if (suggestion) {
    html += '<div style="margin-bottom:18px;">';
    html += '<div style="font-size:9px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(200,168,75,0.7);margin-bottom:10px;">✦ Suggestion de la semaine</div>';
    html += '<div onclick="confirmerDefi(' + suggestion.id + ')" style="background:rgba(200,168,75,0.09);border:1px solid rgba(200,168,75,0.3);border-radius:14px;padding:14px 16px;cursor:pointer;position:relative;overflow:hidden;transition:all 0.2s;" ontouchstart="this.style.opacity=0.8" ontouchend="this.style.opacity=1">';
    html += '<div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,75,0.6),transparent);"></div>';
    html += '<div style="display:flex;align-items:center;gap:12px;">';
    html += '<div style="width:44px;height:44px;background:rgba(200,168,75,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">' + suggestion.icon + '</div>';
    html += '<div style="flex:1;min-width:0;">';
    html += '<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:4px;line-height:1.3;">' + suggestion.titre + '</div>';
    html += '<div style="display:flex;align-items:center;gap:8px;">';
    html += '<span style="font-size:10px;font-weight:700;padding:2px 8px;border-radius:10px;background:' + diffBg[suggestion.diff] + ';border:0.5px solid ' + diffBorder[suggestion.diff] + ';color:' + diffColor[suggestion.diff] + ';">' + diffLabel[suggestion.diff] + '</span>';
    html += '<span style="font-size:10px;color:rgba(255,255,255,0.3);">' + suggestion.cible + ' ' + suggestion.unite + '</span>';
    html += '</div></div>';
    html += '<div style="font-size:20px;color:rgba(200,168,75,0.4);">›</div>';
    html += '</div></div></div>';
  }

  // Onglets par difficulté
  html += '<div style="display:flex;gap:6px;margin-bottom:14px;" id="defiTabsRow">';
  for (const d of ['facile','moyen','intensif']) {
    const active = d === 'facile';
    html += '<button data-diff="' + d + '" id="defiTab_' + d + '" style="flex:1;padding:7px 4px;border-radius:10px;border:1px solid ' + (active ? diffBorder[d] : 'rgba(255,255,255,0.07)') + ';background:' + (active ? diffBg[d] : 'transparent') + ';color:' + (active ? diffColor[d] : 'rgba(255,255,255,0.4)') + ';font-size:11px;font-weight:700;cursor:pointer;font-family:var(--sans);transition:all 0.2s;">' + diffLabel[d] + '</button>';
  }
  html += '</div>';

  // Listes par difficulté
  for (const diff of ['facile','moyen','intensif']) {
    const defis = DEFIS_DB.filter(d => d.diff === diff);
    html += '<div id="defiList_' + diff + '" style="display:' + (diff === 'facile' ? 'flex' : 'none') + ';flex-direction:column;gap:7px;">';
    for (const d of defis) {
      html += '<div onclick="confirmerDefi(' + d.id + ')" style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.03);border:0.5px solid rgba(255,255,255,0.07);border-radius:12px;padding:11px 14px;cursor:pointer;transition:all 0.15s;" ontouchstart="this.style.opacity=0.8" ontouchend="this.style.opacity=1">';
      html += '<div style="font-size:18px;width:36px;height:36px;background:' + diffBg[diff] + ';border-radius:10px;display:flex;align-items:center;justify-content:center;flex-shrink:0;">' + d.icon + '</div>';
      html += '<div style="flex:1;min-width:0;">';
      html += '<div style="font-size:13px;color:rgba(255,255,255,0.88);line-height:1.3;">' + d.titre + '</div>';
      html += '<div style="font-size:10px;color:rgba(255,255,255,0.28);margin-top:2px;">' + d.cible + ' ' + d.unite + '</div>';
      html += '</div>';
      html += '<div style="font-size:16px;color:rgba(255,255,255,0.15);">›</div>';
      html += '</div>';
    }
    html += '</div>';
  }

  body.innerHTML = html;
  // Event delegation pour les onglets (évite les problèmes de guillemets dans onclick)
  const tabsRow = document.getElementById('defiTabsRow');
  if (tabsRow) {
    tabsRow.addEventListener('click', function(e) {
      const btn = e.target.closest('button[data-diff]');
      if (btn) switchDefiTab(btn.dataset.diff);
    });
  }
  ov.style.opacity = '1'; ov.style.pointerEvents = 'all';
  setTimeout(() => { document.getElementById('defiSelectorSheet').style.transform = 'translateY(0)'; }, 10);
}

function switchDefiTab(diff) {
  const diffColor = { facile: '#34d962', moyen: '#ffd60a', intensif: '#ff6b6b' };
  const diffBg    = { facile: 'rgba(52,217,98,0.08)', moyen: 'rgba(255,214,10,0.08)', intensif: 'rgba(255,107,107,0.08)' };
  const diffBorder= { facile: 'rgba(52,217,98,0.2)', moyen: 'rgba(255,214,10,0.2)', intensif: 'rgba(255,107,107,0.2)' };
  for (const d of ['facile','moyen','intensif']) {
    const btn = document.getElementById('defiTab_' + d);
    const list = document.getElementById('defiList_' + d);
    if (btn) {
      btn.style.background = d === diff ? diffBg[d] : 'transparent';
      btn.style.borderColor = d === diff ? diffBorder[d] : 'rgba(255,255,255,0.07)';
      btn.style.color = d === diff ? diffColor[d] : 'rgba(255,255,255,0.4)';
    }
    if (list) list.style.display = d === diff ? 'flex' : 'none';
  }
}

function closeDefiSelector() {
  const ov = document.getElementById('defiSelectorOverlay');
  const sh = document.getElementById('defiSelectorSheet');
  if (!ov || !sh) return;
  sh.style.transform = 'translateY(100%)';
  setTimeout(() => { ov.style.opacity = '0'; ov.style.pointerEvents = 'none'; }, 380);
}

function cocherDefiAujourdhui() {
  const s = getDefiState();
  const today = getTodayStr();
  if (!s.current.jours.includes(today)) {
    s.current.jours.push(today);
    const defi = DEFIS_DB.find(d => d.id === s.current.id);
    if (s.current.jours.length >= defi.cible) {
      s.current.complete = true;
      if (!s.badges.includes(defi.id)) s.badges.push(defi.id);
      showToast('Masha\'Allah ✦ Défi accompli !');
    } else {
      showToast('✦ Journée cochée — Continue !');
    }
    saveDefiState(s);
    renderDefiCard();
    renderDefiOverlay();
  } else {
    showToast('Déjà coché aujourd\'hui ✓');
  }
}

function renderDefiCard() {
  const card = document.getElementById('accueilDefiCard');
  if (!card) return;
  card.style.display = 'flex';
  // Toujours assigner un handler par défaut
  card.onclick = function() { if (typeof openDefiSelector === 'function') openDefiSelector(); };
  try {
  var _defiResult = getDefiCourant() || {};
  var defi = _defiResult.defi || null;
  var defiState = _defiResult.state || null;
  // Pas encore de défi choisi cette semaine
  if (!defi) {
    document.getElementById('defiCardIcon').innerHTML = '<img src="https://nabs881-sketch.github.io/niyyah-app/imagescroissant.png" alt="Croissant" style="width:60px;height:auto;display:block;flex-shrink:0;">';
    document.getElementById('defiCardTitre').textContent = 'Choisir un défi ✦';
    document.getElementById('defiCardScore').textContent = 'Appuie pour commencer';
    var barFill0 = document.getElementById('defiCardBarFill');
    if (barFill0) barFill0.style.width = '0%';
    return;
  }
  card.onclick = function() { if (typeof openDefiOverlay === 'function') openDefiOverlay(); };
  document.getElementById('defiCardIcon').innerHTML = '<img src="https://nabs881-sketch.github.io/niyyah-app/imagescroissant.png" alt="Croissant" style="width:60px;height:auto;display:block;flex-shrink:0;">';
  document.getElementById('defiCardTitre').textContent = defi.titre;
  const fait = defiState.current.jours.length;
  document.getElementById('defiCardScore').textContent = fait + '/' + defi.cible;
  var barFill = document.getElementById('defiCardBarFill');
  if (barFill) barFill.style.width = Math.round((fait / defi.cible) * 100) + '%';
  // Dots
  const dots = document.getElementById('defiCardDots');
  dots.innerHTML = '';
  for (let i = 0; i < defi.cible; i++) {
    const dot = document.createElement('div');
    dot.style.cssText = 'flex:1;height:4px;border-radius:2px;transition:background 0.3s;';
    dot.style.background = i < fait ? '#c8a84b' : 'rgba(200,168,75,0.15)';
    dots.appendChild(dot);
  }
  const reste = defi.cible - fait;
  if (reste > 0 && !defiState.current.complete) {
    const label = document.createElement('div');
    label.style.cssText = 'margin-left:8px;font-size:9px;color:rgba(200,168,75,0.4);flex-shrink:0;';
    label.textContent = reste + (reste > 1 ? ' jours restants' : ' jour restant');
    dots.appendChild(label);
  } else if (defiState.current.complete) {
    const label = document.createElement('div');
    label.style.cssText = 'margin-left:8px;font-size:9px;color:#c8a84b;flex-shrink:0;font-weight:700;';
    label.textContent = '✦ Accompli !';
    dots.appendChild(label);
  }
  } catch(e) { console.warn('renderDefiCard error:', e); }
}

function renderDefiOverlay() {
  const { defi, state } = getDefiCourant();
  if (!defi) return;
  document.getElementById('defiOvIcon').textContent = defi.icon;
  document.getElementById('defiOvTitre').textContent = defi.titre;
  // Ref
  const refEl = document.getElementById('defiOvRef');
  if (defi.ref) {
    refEl.style.display = 'block';
    refEl.innerHTML = '"' + defi.ref + '"' + (defi.hadith ? '<br><span style="font-size:10px;color:rgba(200,168,75,0.5);margin-top:4px;display:block;">— ' + defi.hadith + '</span>' : '');
  }
  // Jours semaine
  const joursEl = document.getElementById('defiOvJours');
  joursEl.innerHTML = '';
  const jourNoms = ['L','M','M','J','V','S','D'];
  const lundi = new Date(getLundiDate());
  for (let i = 0; i < 7; i++) {
    const d = new Date(lundi); d.setDate(d.getDate() + i);
    const ds = d.toISOString().split('T')[0];
    const coche = state.current.jours.includes(ds);
    const auj = ds === getTodayStr();
    const div = document.createElement('div');
    div.style.cssText = 'flex:1;text-align:center;';
    div.innerHTML = '<div style="width:100%;aspect-ratio:1;border-radius:8px;background:' + (coche ? '#c8a84b' : auj ? 'rgba(200,168,75,0.12)' : 'rgba(255,255,255,0.04)') + ';border:' + (auj && !coche ? '1px solid rgba(200,168,75,0.4)' : '0.5px solid rgba(255,255,255,0.06)') + ';display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:' + (coche ? '#000' : auj ? '#c8a84b' : 'rgba(255,255,255,0.2)') + ';margin-bottom:3px;">' + jourNoms[i] + '</div><div style="font-size:9px;color:' + (coche ? '#c8a84b' : 'rgba(255,255,255,0.15)') + ';">' + (coche ? '✓' : '—') + '</div>';
    joursEl.appendChild(div);
  }
  // Encouragement
  const fait = state.current.jours.length;
  const msgs = ['Commence aujourd\'hui — chaque jour compte ✦', 'Bien lancé — continue sur cette lancée !', 'À mi-chemin — tu y es presque !', 'Plus que quelques jours — tiens bon !', 'Masha\'Allah — tu es si proche !', 'Masha\'Allah ✦ Défi accompli — Barakallahu fik !'];
  const idx = Math.min(Math.floor(fait / defi.cible * 5), 5);
  document.getElementById('defiOvEncouragement').textContent = msgs[idx];
  // Bouton
  const today = getTodayStr();
  const dejaCoche = state.current.jours.includes(today);
  const btn = document.getElementById('defiOvBtn');
  if (state.current.complete || dejaCoche) {
    btn.textContent = dejaCoche ? '✓ Coché aujourd\'hui' : '✦ Défi accompli !';
    btn.style.background = 'rgba(200,168,75,0.15)';
    btn.style.color = '#c8a84b';
    btn.style.cursor = 'default';
  } else {
    btn.textContent = 'Cocher aujourd\'hui ✦';
    btn.style.background = 'linear-gradient(135deg,#c8a84b,#e8cc6a)';
    btn.style.color = '#000';
    btn.style.cursor = 'pointer';
  }
}

function openDefiOverlay() {
  renderDefiOverlay();
  const ov = document.getElementById('defiOverlay');
  const sh = document.getElementById('defiSheet');
  ov.style.opacity = '1'; ov.style.pointerEvents = 'all';
  setTimeout(() => { sh.style.transform = 'translateY(0)'; }, 10);
}

function closeDefiOverlay() {
  const ov = document.getElementById('defiOverlay');
  const sh = document.getElementById('defiSheet');
  sh.style.transform = 'translateY(100%)';
  setTimeout(() => { ov.style.opacity = '0'; ov.style.pointerEvents = 'none'; }, 380);
}

// Fermer overlay en cliquant le fond
document.addEventListener('DOMContentLoaded', function() {
  const ov = document.getElementById('defiOverlay');
  if (ov) ov.addEventListener('click', function(e) { if (e.target === ov) closeDefiOverlay(); });
  // Initialiser le défi (sans auto-ouvrir le sélecteur)
  try { initDefiSemaine(); } catch(e) {}
});

function isFriday() { return new Date().getDay() === 5; }
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
function saveRamadanState() { localStorage.setItem('spiritual_ramadan', JSON.stringify(ramadanState)); }
function toggleRamadanMode() {
  if (ramadanState.active) {
    if (!confirm('Désactiver le mode Ramadan ? Tes données de jeûne seront conservées.')) return;
    ramadanState.active = false;
    saveRamadanState();
    updateNavRamadan();
    renderRamadanActivateBtn();
    switchView('checklist'); setTimeout(renderDefiCard, 100);
    showToast('Mode Ramadan désactivé');
  } else {
    ramadanState.active = true;
    if (!ramadanState.startDate) ramadanState.startDate = TODAY;
    saveRamadanState();
    updateNavRamadan();
    renderRamadanActivateBtn();
    switchView('ramadan');
    renderRamadan();
    showToast('🌙 Ramadan Mubarak ! Que ce mois soit béni.');
    if (navigator.vibrate) navigator.vibrate([30, 40, 60]);
  }
}
function updateNavRamadan() {
  const nav = document.getElementById('nav-ramadan');
  const icon = document.getElementById('navRamadanIcon');
  if (!nav) return; // nav-ramadan retiré de la barre — le bouton header suffit
  if (ramadanState.active) {
    nav.style.color = 'var(--moon)';
    icon.style.color = 'var(--moon)';
    if (!document.getElementById('ramadanDot')) {
      const dot = document.createElement('div');
      dot.id = 'ramadanDot';
      dot.className = 'nav-ramadan-dot';
      nav.appendChild(dot);
    }
  } else {
    nav.style.color = '';
    icon.style.color = '';
    const dot = document.getElementById('ramadanDot');
    if (dot) dot.remove();
  }
}
function getRamadanDay() {
  if (!ramadanState.startDate) return 1;
  const start = new Date(ramadanState.startDate + 'T12:00:00');
  const today = new Date(TODAY + 'T12:00:00');
  const diff = Math.round((today - start) / 86400000) + 1;
  return Math.max(1, Math.min(30, diff));
}
function toggleFast(dayStr) {
  if (!ramadanState.days) ramadanState.days = {};
  ramadanState.days[dayStr] = !ramadanState.days[dayStr];
  if (ramadanState.days[dayStr]) {
    showToast('🌙 Jeûne du jour enregistré — Barakallahu feek !');
    if (navigator.vibrate) navigator.vibrate(25);
  }
  if (!history.ramadan) history.ramadan = { totalFasts: 0, laylatul: {} };
  history.ramadan.totalFasts = Object.values(ramadanState.days).filter(Boolean).length;
  saveHistory();
  saveRamadanState();
  checkBadges();
  renderRamadan();
}
function toggleLaylatul(night) {
  if (!ramadanState.laylatul) ramadanState.laylatul = {};
  ramadanState.laylatul[night] = !ramadanState.laylatul[night];
  if (ramadanState.laylatul[night]) showToast('✨ Nuit ' + night + ' — Qu\'Allah l\'accepte !');
  if (!history.ramadan) history.ramadan = { totalFasts: 0, laylatul: {} };
  history.ramadan.laylatul = ramadanState.laylatul;
  saveHistory();
  saveRamadanState();
  checkBadges();
  renderRamadan();
}
function toggleFridayItem(id) {
  const key = 'niyyah_friday_' + TODAY;
  const fridayState = JSON.parse(localStorage.getItem(key) || '{}');
  fridayState[id] = !fridayState[id];
  localStorage.setItem(key, JSON.stringify(fridayState));
  if (fridayState[id]) {
    playCheckSound();
    if (navigator.vibrate) navigator.vibrate([12, 8, 25]);
    const msgs = {
      'fri_kahf':    '📖 Al-Kahf récitée — lumière jusqu\'au prochain vendredi !',
      'fri_salawat': '🌟 Salawat envoyées sur le Prophète ﷺ',
      'fri_doua':    '🤲 Douaa de l\'heure bénie — qu\'Allah l\'exauce !'
    };
    showToast(msgs[id] || 'Barakallahu feek !');
  }
  renderLevel(currentLevel);
}
function toggleRamadanItem(id) {
  const key = 'r_' + TODAY + '_' + id;
  ramadanState.days_items = ramadanState.days_items || {};
  ramadanState.days_items[key] = !ramadanState.days_items[key];
  saveRamadanState();
  renderRamadan();
  if (ramadanState.days_items[key] && navigator.vibrate) navigator.vibrate(20);
}
function getRamadanItemDone(id) {
  const key = 'r_' + TODAY + '_' + id;
  return !!(ramadanState.days_items && ramadanState.days_items[key]);
}
const HORAIRES_CITIES = [
  { name: 'Paris',     url: 'https://www.mosqueedeparis.net/horaires-des-prieres/' },
  { name: 'Lyon',      url: 'https://www.grande-mosquee-lyon.org/horaires/' },
  { name: 'Marseille', url: 'https://www.mosquee-marseille.fr/horaires/' },
  { name: 'Bordeaux',  url: 'https://islamiccalendar.fr/ramadan/bordeaux' },
  { name: 'Lille',     url: 'https://islamiccalendar.fr/ramadan/lille' },
  { name: 'Strasbourg',url: 'https://islamiccalendar.fr/ramadan/strasbourg' },
  { name: 'Nantes',    url: 'https://islamiccalendar.fr/ramadan/nantes' },
  { name: 'Autre',     url: 'https://islamiccalendar.fr/ramadan/' },
];
let selectedCity = localStorage.getItem('spiritual_city') || 'Paris';
function selectCity(name) {
  selectedCity = name;
  localStorage.setItem('spiritual_city', name);
  renderRamadan();
}
function openHoraires() {
  const city = HORAIRES_CITIES.find(c => c.name === selectedCity) || HORAIRES_CITIES[0];
  window.open(city.url, '_blank', 'noopener');
}
function renderRamadan() {
  const el = document.getElementById('ramadanContent');
  if (!el) return;
  const day = getRamadanDay();
  const daysLeft = Math.max(0, 30 - day + 1);
  const todayFasted = ramadanState.days && ramadanState.days[TODAY];
  const totalFasts = Object.values(ramadanState.days || {}).filter(Boolean).length;
  const isLast10 = day >= 21;
  const pct = Math.round((day - 1) / 30 * 100);
  const f4 = document.getElementById('globalFill4');
  if (f4) f4.style.width = pct + '%';
  let html = '<div class="ramadan-banner">';
  html += '<span class="ramadan-moon">🌙</span>';
  html += '<div class="ramadan-title">رَمَضَان كَرِيم</div>';
  html += '<div class="ramadan-arabic">شَهْرُ رَمَضَانَ</div>';
  html += '<div class="ramadan-day-row">';
  html += '<div class="ramadan-day-box"><div class="ramadan-day-num">' + day + '</div><div class="ramadan-day-label">Jour</div></div>';
  html += '<div style="color:var(--t3);font-size:20px;">·</div>';
  html += '<div class="ramadan-day-box"><div class="ramadan-day-num">' + daysLeft + '</div><div class="ramadan-day-label">Restants</div></div>';
  html += '</div></div>';
  html += '<div class="fast-streak-row">';
  html += '<div class="fast-stat active"><div class="fast-stat-num">' + totalFasts + '</div><div class="fast-stat-label">Jours jeûnés</div></div>';
  html += '<div class="fast-stat"><div class="fast-stat-num">' + (30 - totalFasts) + '</div><div class="fast-stat-label">Restants</div></div>';
  html += '<div class="fast-stat"><div class="fast-stat-num">' + Math.round(totalFasts / 30 * 100) + '%</div><div class="fast-stat-label">Progression</div></div>';
  html += '</div>';
  html += '<div style="background:var(--card);border-radius:var(--r-xl);overflow:hidden;margin-bottom:8px;">';
  html += '<div style="padding:14px 16px;border-bottom:1px solid var(--sep);">';
  html += '<div style="font-size:10px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:2px;">Aujourd\'hui</div>';
  html += '<div style="font-family:var(--serif);font-size:18px;color:var(--t1);">Jeûne du jour</div>';
  html += '</div>';
  const fastItems = [
    { id: 'fast', label: "J'ai jeûné aujourd'hui", arabic: 'صُمْتُ الْيَوْمَ', isFast: true, special: true },
    { id: 'suhur', label: 'Suhur — repas avant l\'aube', arabic: 'السَّحُور' },
    { id: 'iftar', label: 'Iftar — rupture du jeûne', arabic: 'الْإِفْطَار', sub: 'بِسْمِ اللَّهِ وَعَلَى بَرَكَةِ اللَّهِ' },
    { id: 'tarawih', label: 'Prière Tarawih', arabic: 'صَلَاةُ التَّرَاوِيحِ', sub: '8 ou 20 rakaat après Isha' },
    { id: 'quran_ramadan', label: 'Récitation du Coran', arabic: 'قِرَاءَةُ الْقُرْآنِ', sub: 'Objectif : 1 Juzz par jour' },
    { id: 'sadaqa_ramadan', label: 'Sadaqa du jour', arabic: 'الصَّدَقَةُ', sub: 'Même un sourire ou un service' },
  ];
  fastItems.forEach((item, idx) => {
    const done = item.special ? !!todayFasted : getRamadanItemDone(item.id);
    const onclick = item.special ? 'toggleFast(\'' + TODAY + '\')' : 'toggleRamadanItem(\'' + item.id + '\')';
    const fastCls = (item.isFast || item.special) ? ' fast-item' : '';
    const arabicHtml = item.arabic ? '<div class="item-arabic">' + item.arabic + '</div>' : '';
    const subHtml = item.sub ? '<div class="item-sub">' + item.sub + '</div>' : '';
    html += '<div class="item' + fastCls + (done ? ' checked' : '') + '" onclick="' + onclick + '" id="ritem-' + item.id + '">';
    html += '<div class="check-circle' + (item.special ? '" style="' + (done ? 'background:var(--moon);border-color:var(--moon);box-shadow:0 0 0 4px var(--moon-soft)' : 'border-color:rgba(245,166,35,0.4)') : '') + '">';
    html += '<svg class="check-svg" style="' + (done ? 'opacity:1;transform:scale(1)' : '') + '" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    html += '</div>';
    html += '<div class="item-body"><div class="item-label">' + item.label + '</div>' + subHtml + arabicHtml + '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '<div style="margin-bottom:4px;padding:0 2px;"><div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:8px;">Horaires Imsak / Iftar</div>';
  html += '<div style="display:flex;gap:6px;overflow-x:auto;scrollbar-width:none;margin-bottom:8px;padding-bottom:2px;">';
  HORAIRES_CITIES.forEach(c => {
    const active = c.name === selectedCity;
    html += '<div onclick="selectCity(\'' + c.name + '\')" style="flex-shrink:0;padding:5px 12px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;transition:all 0.2s;border:1px solid ' + (active ? 'var(--moon)' : 'var(--sep)') + ';background:' + (active ? 'rgba(245,166,35,0.1)' : 'var(--card)') + ';color:' + (active ? 'var(--moon)' : 'var(--t2)') + ';">' + c.name + '</div>';
  });
  html += '</div>';
  html += '<div class="horaires-link" onclick="openHoraires()">';
  html += '<div class="horaires-icon">🕌</div>';
  html += '<div class="horaires-body"><div class="horaires-label">Voir les horaires — ' + selectedCity + '</div><div class="horaires-sub">Source officielle · Mosquée / IslamicCalendar.fr</div></div>';
  html += '<div class="horaires-arrow">›</div>';
  html += '</div></div>';
  html += '<div style="background:var(--card);border-radius:var(--r-xl);padding:18px;margin-bottom:8px;">';
  html += '<div style="font-size:10px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">Calendrier du jeûne</div>';
  html += '<div class="fast-calendar">';
  for (let d = 1; d <= 30; d++) {
    const startObj = new Date((ramadanState.startDate || TODAY) + 'T12:00:00');
    startObj.setDate(startObj.getDate() + d - 1);
    const dStr = startObj.toISOString().split('T')[0];
    const fasted = ramadanState.days && ramadanState.days[dStr];
    const isToday = dStr === TODAY;
    const isFuture = dStr > TODAY;
    let cls = 'fast-day';
    if (fasted) cls += ' fasted';
    if (isToday) cls += ' today';
    if (isFuture && !isToday) cls += ' future';
    const onclick = (!isFuture || isToday) ? ' onclick="toggleFast(\'' + dStr + '\')"' : '';
    html += '<div class="' + cls + '"' + onclick + '>' + d + '</div>';
  }
  html += '</div></div>';
  html += '<div class="laylatul-card">';
  html += '<div class="laylatul-stars">✨🌙✨</div>';
  html += '<div class="laylatul-title">Laylat al-Qadr</div>';
  html += '<div class="laylatul-arabic">لَيْلَةُ الْقَدْرِ</div>';
  html += '<div class="laylatul-sub">Les 5 nuits impaires des 10 dernières nuits — meilleure que mille mois</div>';
  html += '<div class="laylatul-nights">';
  [21, 23, 25, 27, 29].forEach(n => {
    const done = ramadanState.laylatul && ramadanState.laylatul[n];
    const startObj2 = new Date((ramadanState.startDate || TODAY) + 'T12:00:00');
    startObj2.setDate(startObj2.getDate() + n - 1);
    const nStr = startObj2.toISOString().split('T')[0];
    const isActive = TODAY >= nStr;
    let cls = 'laylatul-night';
    if (done) cls += ' done';
    else if (isActive) cls += ' active';
    html += '<div class="' + cls + '" onclick="toggleLaylatul(' + n + ')">';
    html += '<div class="night-num">' + n + '</div>';
    html += '<div class="night-label">Nuit</div>';
    html += '</div>';
  });
  html += '</div></div>';
  el.innerHTML = html;
}
const LEVELS = [
  {
    id: 1, title: 'Fondations',
    sections: [
      { icon: '🕌', title: 'Les 5 Prières', items: [
        { id: 'fajr',    label: 'Fajr',    sub: "Prière de l'aube",              arabic: 'صَلَاةُ الْفَجْرِ',  prayer: true, priority: 'fard', block: 'fajr', hadith: '\"Celui qui prie Fajr est sous la protection d\'Allah toute la journée\" — Muslim 657', source: 'Muslim 657' },
        { id: 'dhuhr',   label: 'Dhuhr',   sub: 'Prière du milieu du jour',      arabic: 'صَلَاةُ الظُّهْرِ',  prayer: true, priority: 'fard', block: 'dhuhr', hadith: '\"Celui qui prie les deux prières fraîches entrera au Paradis\" — Bukhari 574', source: 'Bukhari 574' },
        { id: 'asr',     label: 'Asr',     sub: "Prière de l'après-midi",        arabic: 'صَلَاةُ الْعَصْرِ',  prayer: true, priority: 'fard', block: 'asr', hadith: '\"Celui qui manque Asr, c\'est comme s\'il avait perdu sa famille et ses biens\" — Bukhari 552', source: 'Bukhari 552' },
        { id: 'maghrib', label: 'Maghrib', sub: 'Prière du coucher du soleil',   arabic: 'صَلَاةُ الْمَغْرِبِ', prayer: true, priority: 'fard', block: 'maghrib', hadith: '\"Priez avant le Maghrib, priez avant le Maghrib\" — Bukhari 1183', source: 'Bukhari 1183' },
        { id: 'isha',    label: 'Isha',    sub: 'Prière de la nuit',             arabic: 'صَلَاةُ الْعِشَاءِ',  prayer: true, priority: 'fard', block: 'isha', hadith: '\"Celui qui prie Isha en jamaah a la récompense de prier la moitié de la nuit\" — Muslim 656', source: 'Muslim 656' },
        ...(isFriday() ? [{ id: 'jumua', label: 'Jumua ✦', sub: 'Prière du vendredi — obligation spéciale', arabic: 'صَلَاةُ الْجُمُعَةِ', isFriday: true, prayer: true, priority: 'fard', block: 'dhuhr', hadith: '\"Le vendredi est le meilleur jour sur lequel le soleil se lève\" — Muslim 854', source: 'Muslim 854' }] : []),
      ]},
      { icon: '📿', title: 'Wird quotidien', desc: 'Le wird est un ensemble d\'invocations quotidiennes tirées du Coran et de la Sunnah, récitées chaque matin après Fajr et chaque soir après Asr. Il protège, purifie le cœur et rapproche d\'Allah.', items: [
        { id: 'wird_matin', label: 'Wird du Matin', sub: 'Après Fajr · Al-Fatiha, Ayat al-Kursi, Muawwidhat…', arabic: 'وِرْدُ الصَّبَاحِ', priority: 'sunnah', optional: true, type: 'wird', session: 'matin', block: 'fajr', hadith: '\"Celui qui dit ces invocations le matin est protégé jusqu\'au soir\" — Abu Dawud 5088', source: 'Abu Dawud 5088' },
        { id: 'wird_soir',  label: 'Wird du Soir',  sub: 'Après Asr · Al-Baqara 285-286, Al-Mulk…',            arabic: 'وِرْدُ الْمَسَاءِ', priority: 'sunnah', optional: true, type: 'wird', session: 'soir', block: 'maghrib', hadith: '\"Celui qui dit ces invocations le soir est protégé jusqu\'au matin\" — Abu Dawud 5088', source: 'Abu Dawud 5088' },
      ]},
      { icon: '🌙', title: 'Sunnah de base', items: [
        { id: 'ayat_kursi', label: 'Ayat al-Kursi après prière', sub: 'Après chaque prière obligatoire — 1 fois', arabic: 'آيَةُ الْكُرْسِيّ', priority: 'sunnah', block: 'jour', audio: 'https://everyayah.com/data/Alafasy_128kbps/002255.mp3', hadith: '\"Celui qui la récite après chaque prière, rien ne l\'empêche d\'entrer au Paradis sauf la mort\" — Nasa\'i (Sahih)', source: "Nasa'i (Sahih)" },
        { id: 'basmala', label: 'Bismillah avant chaque action', sub: 'Manger, sortir, commencer — Bismillah', arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', block: 'jour', hadith: '\"Tout acte important qui ne commence pas par Bismillah est coupé de sa bénédiction\" — Abu Dawud (Hassan)', source: 'Abu Dawud (Hassan)' },
        { id: 'witr', label: 'Prière Witr', sub: 'Minimum 1 rakaa — avant de dormir · Sunnah mu\'akkada pour tous', arabic: 'صَلَاةُ الْوِتْرِ', priority: 'sunnah', block: 'isha', hadith: '\"Allah est impair et Il aime l\'impair — priez le Witr\" — Bukhari 998', source: 'Bukhari 998' },
        { id: 'shukr', label: 'Tafakkur : contempler 3 ni\'ma d\'Allah', sub: 'Méditer 3 bénédictions concrètes d\'Allah aujourd\'hui — un toit, la santé, être musulman…', arabic: 'الْحَمْدُ لِلَّهِ', block: 'isha', audio: ['https://everyayah.com/data/Alafasy_128kbps/055001.mp3','https://everyayah.com/data/Alafasy_128kbps/055002.mp3','https://everyayah.com/data/Alafasy_128kbps/055003.mp3','https://everyayah.com/data/Alafasy_128kbps/055004.mp3','https://everyayah.com/data/Alafasy_128kbps/055005.mp3','https://everyayah.com/data/Alafasy_128kbps/055006.mp3','https://everyayah.com/data/Alafasy_128kbps/055007.mp3','https://everyayah.com/data/Alafasy_128kbps/055008.mp3','https://everyayah.com/data/Alafasy_128kbps/055009.mp3','https://everyayah.com/data/Alafasy_128kbps/055010.mp3','https://everyayah.com/data/Alafasy_128kbps/055011.mp3','https://everyayah.com/data/Alafasy_128kbps/055012.mp3','https://everyayah.com/data/Alafasy_128kbps/055013.mp3','https://everyayah.com/data/Alafasy_128kbps/055014.mp3','https://everyayah.com/data/Alafasy_128kbps/055015.mp3','https://everyayah.com/data/Alafasy_128kbps/055016.mp3','https://everyayah.com/data/Alafasy_128kbps/055017.mp3','https://everyayah.com/data/Alafasy_128kbps/055018.mp3','https://everyayah.com/data/Alafasy_128kbps/055019.mp3','https://everyayah.com/data/Alafasy_128kbps/055020.mp3','https://everyayah.com/data/Alafasy_128kbps/055021.mp3','https://everyayah.com/data/Alafasy_128kbps/055022.mp3','https://everyayah.com/data/Alafasy_128kbps/055023.mp3','https://everyayah.com/data/Alafasy_128kbps/055024.mp3','https://everyayah.com/data/Alafasy_128kbps/055025.mp3','https://everyayah.com/data/Alafasy_128kbps/055026.mp3','https://everyayah.com/data/Alafasy_128kbps/055027.mp3','https://everyayah.com/data/Alafasy_128kbps/055028.mp3','https://everyayah.com/data/Alafasy_128kbps/055029.mp3','https://everyayah.com/data/Alafasy_128kbps/055030.mp3','https://everyayah.com/data/Alafasy_128kbps/055031.mp3','https://everyayah.com/data/Alafasy_128kbps/055032.mp3','https://everyayah.com/data/Alafasy_128kbps/055033.mp3','https://everyayah.com/data/Alafasy_128kbps/055034.mp3','https://everyayah.com/data/Alafasy_128kbps/055035.mp3','https://everyayah.com/data/Alafasy_128kbps/055036.mp3','https://everyayah.com/data/Alafasy_128kbps/055037.mp3','https://everyayah.com/data/Alafasy_128kbps/055038.mp3','https://everyayah.com/data/Alafasy_128kbps/055039.mp3','https://everyayah.com/data/Alafasy_128kbps/055040.mp3','https://everyayah.com/data/Alafasy_128kbps/055041.mp3','https://everyayah.com/data/Alafasy_128kbps/055042.mp3','https://everyayah.com/data/Alafasy_128kbps/055043.mp3','https://everyayah.com/data/Alafasy_128kbps/055044.mp3','https://everyayah.com/data/Alafasy_128kbps/055045.mp3','https://everyayah.com/data/Alafasy_128kbps/055046.mp3','https://everyayah.com/data/Alafasy_128kbps/055047.mp3','https://everyayah.com/data/Alafasy_128kbps/055048.mp3','https://everyayah.com/data/Alafasy_128kbps/055049.mp3','https://everyayah.com/data/Alafasy_128kbps/055050.mp3','https://everyayah.com/data/Alafasy_128kbps/055051.mp3','https://everyayah.com/data/Alafasy_128kbps/055052.mp3','https://everyayah.com/data/Alafasy_128kbps/055053.mp3','https://everyayah.com/data/Alafasy_128kbps/055054.mp3','https://everyayah.com/data/Alafasy_128kbps/055055.mp3','https://everyayah.com/data/Alafasy_128kbps/055056.mp3','https://everyayah.com/data/Alafasy_128kbps/055057.mp3','https://everyayah.com/data/Alafasy_128kbps/055058.mp3','https://everyayah.com/data/Alafasy_128kbps/055059.mp3','https://everyayah.com/data/Alafasy_128kbps/055060.mp3','https://everyayah.com/data/Alafasy_128kbps/055061.mp3','https://everyayah.com/data/Alafasy_128kbps/055062.mp3','https://everyayah.com/data/Alafasy_128kbps/055063.mp3','https://everyayah.com/data/Alafasy_128kbps/055064.mp3','https://everyayah.com/data/Alafasy_128kbps/055065.mp3','https://everyayah.com/data/Alafasy_128kbps/055066.mp3','https://everyayah.com/data/Alafasy_128kbps/055067.mp3','https://everyayah.com/data/Alafasy_128kbps/055068.mp3','https://everyayah.com/data/Alafasy_128kbps/055069.mp3','https://everyayah.com/data/Alafasy_128kbps/055070.mp3','https://everyayah.com/data/Alafasy_128kbps/055071.mp3','https://everyayah.com/data/Alafasy_128kbps/055072.mp3','https://everyayah.com/data/Alafasy_128kbps/055073.mp3','https://everyayah.com/data/Alafasy_128kbps/055074.mp3','https://everyayah.com/data/Alafasy_128kbps/055075.mp3','https://everyayah.com/data/Alafasy_128kbps/055076.mp3','https://everyayah.com/data/Alafasy_128kbps/055077.mp3','https://everyayah.com/data/Alafasy_128kbps/055078.mp3'], hadith: '\"Si vous êtes reconnaissants, J\'augmenterai Mes bienfaits pour vous\" — Coran 14:7 · Ni\'ma à faire tafakkur : un toit · un lit · ta femme · tes proches · la santé · les yeux · le souffle · la nourriture ce matin · l\'eau propre · être musulman · connaître le nom d\'Allah · la sécurité · ne pas vivre en zone de guerre · le Coran · chaque réveil', source: 'Ibrahim 14:7 + Sourate Ar-Rahman' },
      ]}
    ]
  },
  {
    id: 2, title: 'Approfondissement',
    sections: [
      { icon: '🕌', title: 'Approfondissement de la prière', items: [
        { id: 'sunnah_fajr', label: 'Sunnah Fajr', sub: '2 rakaat avant Fajr — le Prophète ﷺ ne les abandonnait jamais', arabic: 'سُنَّةُ الْفَجْرِ', priority: 'sunnah', block: 'fajr', hadith: '\"Les 2 rakaat de l\'aube valent mieux que le monde et ce qu\'il contient\" — Muslim 725', source: 'Muslim 725' },
        { id: 'mosquee', label: 'Prière à la mosquée', sub: 'Jamaah — wajib selon la majorité pour les hommes · au moins une prière', arabic: 'صَلَاةُ الْجَمَاعَةِ', optional: true, block: 'dhuhr', hadith: '\"La prière en jamaah vaut 27 fois plus que la prière seul\" — Bukhari 645', source: 'Bukhari 645' },
        { id: 'sunnah_prieres', label: 'Prières surérogatoires', sub: 'Rawatib : 12 rakaat supplémentaires', arabic: 'السُّنَنُ الرَّوَاتِبُ', optional: true, block: 'dhuhr', hadith: '\"Celui qui prie 12 rakaat par jour, Allah lui bâtit une maison au Paradis\" — Muslim 728', source: 'Muslim 728' },
      ]},
      { icon: '📿', title: 'Dhikr du cœur', items: [
        { id: 'istighfar', label: 'Istighfar', sub: 'Astaghfirullah · Je demande pardon à Allah — 100 fois', arabic: 'أَسْتَغْفِرُ اللَّهَ', priority: 'sunnah', type: 'counter', target: 100, block: 'asr', audio: 'sc:172482888', hadith: '\"Celui qui fait l\'Istighfar régulièrement, Allah lui ouvre une issue dans toute détresse\" — Abu Dawud 1518', source: 'Abu Dawud 1518' },
        { id: 'tasbih', label: 'Tasbih complet', sub: 'SubhanAllah ×33 · Alhamdulillah ×33 · Allahu Akbar ×33 · puis La ilaha illallah wahdahu…', arabic: 'سُبْحَانَ اللَّهِ · الْحَمْدُ لِلَّهِ · اللَّهُ أَكْبَرُ', priority: 'sunnah', type: 'counter', target: 99, block: 'asr', audio: 'sc:https://soundcloud.com/mohammadshariq/subhanallah-33-times', hadith: '\"Les péchés sont effacés même s\'ils sont comme l\'écume de la mer\" — Muslim 597', source: 'Muslim 597', phonetic: "La ilaha illallah wahdahu la sharika lah, lahul mulku wa lahul hamdu wa huwa ala kulli shay'in qadir", translation: 'À 99 : \"Il n\'y a de dieu qu\'Allah Seul, sans associé, à Lui la souveraineté et la louange, Il est Puissant sur toute chose\"' },
      ]},
      { icon: '🤲', title: 'Douâas intimes', items: [
        { id: 'doua_soi', label: 'Douâa pour toi-même', sub: 'Rabbi inni lima anzalta ilayya min khayrin faqir · Seigneur, je suis dans le besoin de tout bien que Tu accordes', arabic: 'رَبِّ إِنِّي لِمَا أَنزَلْتَ إِلَيَّ مِنْ خَيْرٍ فَقِيرٌ', block: 'maghrib', audio: 'https://everyayah.com/data/Alafasy_128kbps/028024.mp3', source: 'Coran 28:24 — Douâa de Moussa ﷺ dans sa détresse', phonetic: 'Rabbi inni lima anzalta ilayya min khayrin faqir' },
        { id: 'doua1', label: 'Douâa pour tes parents', sub: 'Rabbi irhamhuma kama rabbayani saghira · Seigneur, fais-leur miséricorde comme ils m\'ont élevé tout petit', arabic: 'رَبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا', block: 'maghrib', audio: 'https://everyayah.com/data/Alafasy_128kbps/017024.mp3', source: 'Coran 17:24', phonetic: 'Rabbi irhamhuma kama rabbayani saghira' },
        { id: 'doua2', label: 'Douâa pour ta famille', sub: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin · Seigneur, accorde-nous, de nos épouses et de notre descendance, la joie des yeux', arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', block: 'maghrib', audio: 'https://everyayah.com/data/Alafasy_128kbps/025074.mp3', source: 'Coran 25:74', phonetic: 'Rabbana hab lana min azwajina wa dhurriyyatina qurrata a\'yunin' },
      ]}
    ]
  },
  {
    id: 3, title: 'Connaissance',
    sections: [
      { icon: '📚', title: 'Étude islamique', items: [
        { id: 'hadith1', label: '1er Hadith du jour', sub: 'Lire et méditer 1 hadith — Riyad as-Salihin ou autre recueil', arabic: 'حَدِيثٌ', block: 'jour' },
        { id: 'sira', label: 'Vie du Prophète ﷺ', sub: '10 min · Série Seerah', arabic: 'السِّيرَةُ النَّبَوِيَّةُ', block: 'jour' },
        { id: 'quran_read', label: 'Lecture du Coran', sub: 'Au moins 1 page avec le sens', arabic: 'قِرَاءَةُ الْقُرْآنِ', block: 'jour' },
        { id: 'arabic', label: "Apprentissage de l'arabe", sub: '10 min · Vocabulaire ou grammaire', arabic: 'تَعَلُّمُ الْعَرَبِيَّةِ', block: 'jour' },
      ]},
      { icon: '🎧', title: 'Immersion coranique', items: [
        { id: 'coran_ecoute', label: 'Écouter le Coran', sub: 'Choisis une sourate et écoute', arabic: 'تِلَاوَةُ الْقُرْآنِ', optional: true, coranPicker: true, block: 'jour', hadith: '\"Récite le Coran car il intercèdera pour ses compagnons le Jour du Jugement\" — Muslim 804', source: 'Muslim 804' },
        { id: 'podcast', label: 'Podcast islamique', sub: 'Islam Simplement ou autre contenu', block: 'jour' },
      ], links: [
        { label: 'Vie du Prophète ﷺ', sub: "L'Islam Simplement · YouTube", url: 'https://www.youtube.com/@lislamsimplement', icon: '▶' },
        { label: 'Islam Simplement', sub: 'Podcast · Écouter maintenant', url: 'https://open.spotify.com/search/islam%20simplement', icon: '🎙' },
        { label: "L'Arabe Simplement", sub: 'Chaîne YouTube · Arabe coranique', url: 'https://www.youtube.com/@larabesimplement', icon: '📖' },
        { label: 'Sunnah.com', sub: 'Hadiths authentiques · Riyad as-Salihin', url: 'https://sunnah.com/riyadussalihin', icon: '📚' },
      ]},
      { icon: '🌙', title: 'Pratiques avancées', items: [
        { id: 'sunnah_jejune', label: 'Jeûne sunnah', sub: 'Lundi ou jeudi — sunnah du Prophète', arabic: 'صَوْمُ الِاثْنَيْنِ وَالْخَمِيسِ', optional: true, block: 'jour', hadith: '\"Les actes sont présentés à Allah le lundi et jeudi, j\'aime jeûner ces jours-là\" — Tirmidhi 747', source: 'Tirmidhi 747' },
        { id: 'doua_morts', label: 'Douâa pour les défunts', sub: 'Rabbana ighfir lana wa li ikhwanina alladhina sabaquna bil iman · Pardonne-nous ainsi qu\'à nos frères qui nous ont précédés', arabic: 'رَبَّنَا اغْفِرْ لَنَا وَلِإِخْوَانِنَا الَّذِينَ سَبَقُونَا بِالْإِيمَانِ', block: 'maghrib', audio: 'https://everyayah.com/data/Alafasy_128kbps/059010.mp3', source: 'Coran 59:10', phonetic: 'Rabbana ighfir lana wa li ikhwanina alladhina sabaquna bil iman' },
      ]}
    ]
  },
  {
    id: 4, title: 'Rayonnement',
    sections: [
      { icon: '✨', title: "Sommet de l'adoration", items: [
        { id: 'tahajjud', label: 'Qiyam al-Layl', sub: 'Prière nocturne dans le dernier tiers de la nuit — la station des siddiqin', arabic: 'قِيَامُ اللَّيْلِ', optional: true, block: 'isha', hadith: '\"Notre Seigneur descend chaque nuit au tiers final — qui M\'invoque ? Je lui réponds\" — Bukhari 1145', source: 'Bukhari 1145' },
      ]},
      { icon: '💚', title: 'Rayonnement vers les autres', items: [
        { id: 'sadaqa', label: 'Aumône (Sadaqa)', sub: "Même un sourire est une aumône", arabic: 'الصَّدَقَةُ', block: 'jour' },
        { id: 'salam', label: 'Donner le Salam', sub: 'As-salamu alaykum à au moins 3 personnes', arabic: 'السَّلَامُ عَلَيْكُمْ', block: 'jour' },
        { id: 'silaturahm', label: 'Maintenir les liens familiaux', sub: "Appeler ou voir un proche aujourd'hui", arabic: 'صِلَةُ الرَّحِمِ', block: 'jour', hadith: '\"Celui qui veut que sa rizq soit élargie et sa vie prolongée, qu\'il maintienne les liens familiaux\" — Bukhari 5986', source: 'Bukhari 5986' },
        { id: 'maruf', label: "Inviter au bien (Amr bil ma'ruf)", sub: "Ibn Taymiyya : identité même de l'Oumma — Al-'Imran 110", arabic: 'الْأَمْرُ بِالْمَعْرُوفِ', block: 'jour', hadith: '\"La meilleure aumône est de transmettre un savoir\" — Ibn Majah 239', source: 'Ibn Majah 239' },
        { id: 'kind_act', label: 'Acte de bonté', sub: "Aider quelqu'un concrètement", block: 'jour' },
        { id: 'ziyara', label: 'Visiter un malade ou un frère', sub: 'Ziyarat al-marid — sunnah oubliée · Muslim 2162', arabic: 'زِيَارَةُ الْمَرِيضِ', block: 'jour', hadith: '\"Le musulman a six droits sur son frère, parmi eux : lui rendre visite s\'il est malade\" — Muslim 2162', source: 'Muslim 2162' },
        { id: 'pardon', label: 'Pardonner quelqu\'un', sub: "Al-'afwa — pardonne et Allah te pardonnera · An-Nur 22", arabic: 'الْعَفْوُ', block: 'jour', hadith: '\"Qu\'ils pardonnent et passent l\'éponge — n\'aimez-vous pas qu\'Allah vous pardonne ?\" — An-Nur 22', source: 'Coran An-Nur 24:22' },
      ]},
      { icon: '🌍', title: "Conscience de l'Oumma", items: [
        { id: 'doua_oumma', label: "Douâa pour l'Oumma", sub: "Allahumma aslih hali l-muslimin · Seigneur, améliore la situation des musulmans partout dans le monde", arabic: 'اللَّهُمَّ أَصْلِحْ أَحْوَالَ الْمُسْلِمِينَ', block: 'maghrib', audio: null, source: 'Douaa général — Sunnah', phonetic: 'Allahumma aslih ahwal al-muslimin wa farrij kurbatahum' },
      ]}
    ]
  }
];
const TODAY = new Date().toISOString().split('T')[0];
let state   = JSON.parse(localStorage.getItem('spiritual_v2') || '{}');
let history = JSON.parse(localStorage.getItem('spiritual_history') || '{"days":{},"dayMedals":{},"streak":0,"bestStreak":0,"totalDays":0,"unlockedBadges":[],"weekDays":0,"jumuahCount":0}');
let currentLevel = 1;
if (history.jumuahCount === undefined) history.jumuahCount = 0;
if (state._date !== TODAY) {
  checkAndSaveYesterdayStreak();
  const ul = state._unlocked || [1];
  state = { _date: TODAY, _unlocked: ul, _mashaAllahShown: false, _sadaqa50: false, _sadaqa80: false, _sadaqa100: false };
  saveState();
}
if (!state._unlocked) state._unlocked = [1];
function getCalcLvlPct(lvlId, s) {
  const lvl = LEVELS.find(l => l.id === lvlId);
  const items = lvl.sections.flatMap(sec => sec.items);
  const weights = {
    fajr:3,dhuhr:3,asr:3,maghrib:3,isha:3,jumua:3,
    wird_matin:2,wird_soir:2,ayat_kursi:2,
    sunnah_fajr:2,witr:2,tahajjud:2,istighfar:2,tasbih:2,silaturahm:2,
    doua1:2,doua2:2,doua3:2,doua_morts:2,fri_kahf:2,fri_salawat:2,fri_doua:2
  };
  function w(id) { return weights[id] || 1; }
  function done(item) {
    if (item.type === 'wird') {
      try { const sess = WIRD_DATA[item.session]; return sess && sess.items.every(wi => !!wirdState[wi.id]); } catch(e) { return false; }
    }
    return item.type === 'counter' ? (s[item.id]||0) >= item.target : !!s[item.id];
  }
  const required = items.filter(i => !i.optional);
  const optional = items.filter(i => !!i.optional);
  const reqTotal = required.reduce((sum,i) => sum + w(i.id), 0);
  const reqGot   = required.filter(done).reduce((sum,i) => sum + w(i.id), 0);
  const optGot   = optional.filter(done).reduce((sum,i) => sum + w(i.id), 0);
  const optTotal = optional.reduce((sum,i) => sum + w(i.id), 0);
  if (reqTotal === 0) return 0;
  const base = (reqGot / reqTotal) * 100;
  const bonus = optTotal > 0 ? (optGot / optTotal) * 20 : 0;
  return Math.min(base + bonus, 120);
}
function checkAndSaveYesterdayStreak() {
  const prevDate = state._date;
  if (!prevDate) return;
  const lvl1Pct = getCalcLvlPct(1, state);
  if (lvl1Pct >= 100) {
    const lvl2Pct = getCalcLvlPct(2, state);
    const allComplete = LEVELS.every(l => getCalcLvlPct(l.id, state) >= 100);
    let dayMedal = 'bronze';
    if (allComplete && history.streak >= 7) dayMedal = 'gold';
    else if (lvl2Pct >= 100) dayMedal = 'silver';
    history.days[prevDate] = true;
    if (!history.dayMedals) history.dayMedals = {};
    history.dayMedals[prevDate] = dayMedal;
    if (!history.dayScores) history.dayScores = {};
    const prevItems = LEVELS.filter(l => (state._unlocked||[]).includes(l.id)).flatMap(l => getLevelItems(l.id));
    history.dayScores[prevDate] = Math.round(getWeightedScore(prevItems, state));
    const todayDate  = new Date(TODAY + 'T12:00:00');
    const prevDateObj = new Date(prevDate + 'T12:00:00');
    const diffDays = Math.round((todayDate - prevDateObj) / 86400000);
    if (diffDays === 1) {
      history.streak = (history.streak || 0) + 1;
      history._gracePending = false; 
    } else if (diffDays === 2) {
      history._gracePending = true;
      history._graceMissedDate = getDateMinus(TODAY, 1);
      history.streak = (history.streak || 0) + 1; 
    } else if (diffDays > 2) {
      history.streak = 1;
      history._gracePending = false;
    }
    history.bestStreak = Math.max(history.bestStreak || 0, history.streak);
    history.totalDays = (history.totalDays || 0) + 1;
  } else {
    const todayDate  = new Date(TODAY + 'T12:00:00');
    const prevDateObj = new Date((prevDate || TODAY) + 'T12:00:00');
    const diffDays = Math.round((todayDate - prevDateObj) / 86400000);
    if (diffDays === 1) {
      if ((history.streak || 0) > 0) {
        history._gracePending = true;
        history._graceMissedDate = prevDate;
      } else {
        history._gracePending = false;
      }
    } else if (diffDays > 1) {
      history.streak = 0;
      history._gracePending = false;
    }
  }
  history.weekDays = 0;
  for (let i = 0; i < 7; i++) if (history.days[getDateMinus(TODAY, i+1)]) history.weekDays++;
  saveHistory();
}
function isGraceActive() {
  if (!history._gracePending || !history._graceMissedDate) return false;
  if (getLevelProgress(1) >= 100) return false; 
  if (history.totalDays === 0) return false; 
  const yesterday = getDateMinus(TODAY, 1);
  if (history._graceMissedDate !== yesterday) {
    history._gracePending = false;
    history._graceMissedDate = null;
    saveHistory();
    return false;
  }
  return true;
}
function resolveGrace() {
  if (history._gracePending) {
    history._gracePending = false;
    history._graceMissedDate = null;
    saveHistory();
    showToast('🌿 Journée rattrapée — ton streak est sauvé !');
    if (navigator.vibrate) navigator.vibrate([20, 30, 60]);
  }
}
function getDateMinus(dateStr, days) {
  const d = new Date(dateStr); d.setDate(d.getDate() - days); return d.toISOString().split('T')[0];
}
function saveState()   { localStorage.setItem('spiritual_v2', JSON.stringify(state)); localStorage.setItem('spiritual_level', currentLevel); }
function saveHistory() { localStorage.setItem('spiritual_history', JSON.stringify(history)); }
function checkBadges() {
  let newBadge = null;
  BADGES.forEach(badge => {
    if (!history.unlockedBadges.includes(badge.id) && badge.check(state, history)) {
      history.unlockedBadges.push(badge.id);
      newBadge = badge;
    }
  });
  saveHistory();
  if (newBadge) { playCheckSound(); showBadgePopup(newBadge); }
}
function getLevelProgress(levelId) { return getCalcLvlPct(levelId, state); }
function getMedalLevel() {
  const lvl1 = getLevelProgress(1);
  const lvl2 = getLevelProgress(2);
  const streakCurrent = history.streak + (lvl1 >= 100 ? 1 : 0);
  const allDone = LEVELS.every(l => getLevelProgress(l.id) >= 100);
  if (allDone && streakCurrent >= 7) return 'gold';
  if (lvl1 >= 100 && lvl2 >= 100) return 'silver';
  if (lvl1 >= 100) return 'bronze';
  return 'none';
}
const MEDAL_CFG = {
  none:   { label: '—',      cls: 'none'   },
  bronze: { label: 'Bronze', cls: 'bronze' },
  silver: { label: 'Argent', cls: 'silver' },
  gold:   { label: 'Or ✦',   cls: 'gold'   },
};
let _lastMedal = null;
function updateMedal() {
  const medal = getMedalLevel();
  const el = document.getElementById('medalTag');
  if (!el) return;
  el.className = 'medal-tag ' + MEDAL_CFG[medal].cls;
  el.textContent = MEDAL_CFG[medal].label;
  if (_lastMedal && _lastMedal !== medal && medal !== 'none') {
    el.classList.add('anim');
    el.addEventListener('animationend', () => el.classList.remove('anim'), { once: true });
    const msgs = { bronze:'🥉 Bronze !', silver:'🥈 Argent !', gold:'🥇 OR — Journee parfaite !' };
    showToast(msgs[medal]);
  }
  _lastMedal = medal;
}
function getLevelItems(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  return level ? level.sections.flatMap(s => s.items) : [];
}
function updateGlobalProgress() {
  // Bandeau intention dans la checklist
  const intentionLabel = localStorage.getItem('niyyah_intention_label');
  const intentionDate = localStorage.getItem('niyyah_intention_date');
  const intentionType = localStorage.getItem('niyyah_intention_type');
  const bar = document.getElementById('checklistIntentionBar');
  if (bar) {
    if (intentionLabel && intentionDate === TODAY) {
      bar.style.display = 'flex';
      const icons = { rapprochement: '🌙', engagement: '⚖️', reconstruction: '🤲', gratitude: '✦' };
      const iconEl = document.getElementById('checklistIntentionIcon');
      const txtEl = document.getElementById('checklistIntentionText');
      if (iconEl) iconEl.textContent = icons[intentionType] || '🌙';
      if (txtEl) txtEl.textContent = intentionLabel.replace(/[🌙⚖️🤲✦]/g, '').trim();
    } else {
      bar.style.display = 'none';
    }
  }
  const allItems = LEVELS.flatMap(l => getLevelItems(l.id));
  const totalPts = allItems.reduce((sum, i) => sum + (getWeight ? getWeight(i.id) : 1), 0);
  const donePts  = allItems.filter(i => isItemDone ? isItemDone(i, state) : (i.type==='counter'?(state[i.id]||0)>=i.target:!!state[i.id])).reduce((sum, i) => sum + (getWeight ? getWeight(i.id) : 1), 0);
  const pct = totalPts > 0 ? (donePts / totalPts) * 100 : 0;
  const f1 = document.getElementById('globalFill');
  const f2 = document.getElementById('globalFill2');
  if (f1) f1.style.width = pct + '%';
  if (f2) f2.style.width = pct + '%';
  const scoreBadge = document.getElementById('globalScoreBadge');
  if (scoreBadge) {
    const score = Math.round(pct);
    scoreBadge.textContent = score + '%';
    scoreBadge.style.color = score >= 80 ? 'var(--gold)' : score >= 50 ? 'var(--green)' : '#fff';
    scoreBadge.style.borderColor = score >= 80 ? 'rgba(255,214,10,0.4)' : score >= 50 ? 'rgba(52,217,98,0.4)' : 'rgba(255,255,255,0.2)';
  }
  const lvl1 = getLevelProgress(1);
  if (lvl1 >= 100 && !state._mashaAllahShown) {
    state._mashaAllahShown = true;
    saveState();
    setTimeout(() => {
      showToast('مَا شَاءَ اللَّهُ — Niveau 1 accompli ! 🌿');
      if (navigator.vibrate) navigator.vibrate([30, 50, 30, 50, 80]);
      playCompleteSound();
    }, 400);
  }
  const SADAQA_MILESTONES = [
    { key: '_sadaqa50',  threshold: 50,  msg: '🤲 Tu es à 50% — si tu le peux, donne une petite Sadaqa en remerciement à Allah !' },
    { key: '_sadaqa80',  threshold: 80,  msg: '💚 80% accompli — MashaAllah ! Une Sadaqa aujourd\'hui multiplierait encore ta récompense.' },
    { key: '_sadaqa100', threshold: 100, msg: '🌟 Journée complète ! Pense à une Sadaqa — même un sourire est une aumône.' },
  ];
  SADAQA_MILESTONES.forEach(m => {
    if (pct >= m.threshold && !state[m.key]) {
      state[m.key] = true;
      saveState();
      setTimeout(() => showToast(m.msg), 800);
    }
  });
  updateMedal();
}
function checkLevelCompletion(levelId) {
  if (getLevelProgress(levelId) >= 100) {
    if (levelId === 1) resolveGrace();
    const nextId = levelId + 1;
    const hasNext = nextId <= LEVELS.length;
    const alreadyShown = state['_lvl_shown_' + levelId];
    if (!alreadyShown) {
      state['_lvl_shown_' + levelId] = true;
      if (hasNext && !state._unlocked.includes(nextId)) state._unlocked.push(nextId);
      saveState();
      renderTabs();
      showLevelPopup(levelId, nextId, hasNext);
      if (hasNext) autoNextLevel(levelId);
    } else if (hasNext) {
      if (currentLevel === levelId) {
        setTimeout(() => selectLevel(nextId), 800);
      }
    }
  }
}
const LEVEL_MESSAGES = {
  1: {
    stars: "🌱",
    eyebrow: "Niveau I — Reconnexion",
    title: "MashaAllah !",
    arabic: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ",
    hadith: "Allah est avec les patients.",
    sub: "Tu as posé les <strong>premières pierres</strong> de ton chemin vers Allah. Chaque retour est une victoire.",
    color: "#87A96B",
    glow: "rgba(135,169,107,0.3)",
    icon: "🌱"
  },
  2: {
    stars: "🕌",
    eyebrow: "Niveau II — Discipline",
    title: "SubhanAllah !",
    arabic: "وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ",
    hadith: "Cherchez l\'aide dans la patience et la prière.",
    sub: "La régularité est une forme d\'amour envers Allah. Ton cœur <strong>s\'ancre</strong> dans la pratique.",
    color: "#D4AF37",
    glow: "rgba(212,175,55,0.3)",
    icon: "🕌"
  },
  3: {
    stars: "✦",
    eyebrow: "Niveau III — Excellence",
    title: "Alhamdulillah !",
    arabic: "إِنَّ اللَّهَ يُحِبُّ إِذَا عَمِلَ أَحَدُكُمْ عَمَلًا أَنْ يُتْقِنَهُ",
    hadith: "Allah aime que lorsque l\'un de vous fait une action, il l\'accomplisse avec excellence.",
    sub: "L\'Ihsan — faire le bien comme si tu voyais Allah. Tu entres dans le <strong>cercle de la maîtrise</strong>.",
    color: "#E9C46A",
    glow: "rgba(233,196,106,0.35)",
    icon: "⚡"
  },
  4: {
    stars: "☀️",
    eyebrow: "Niveau IV — Lumière",
    title: "Allahu Akbar !",
    arabic: "اللَّهُ نُورُ السَّمَاوَاتِ وَالْأَرْضِ",
    hadith: "Allah est la Lumière des cieux et de la terre.",
    sub: "Tu rayonnes. Ton chemin s\'est transformé en <strong>lumière pour les autres</strong>. Que Allah accepte.",
    color: "#FFD700",
    glow: "rgba(255,215,0,0.4)",
    icon: "☀️"
  },
};
function showLevelPopup(levelId, nextId, hasNext) {
  const msg = LEVEL_MESSAGES[levelId] || LEVEL_MESSAGES[1];
  const NEXT_NAMES = { 1:'Reconnexion', 2:'Discipline', 3:'Excellence', 4:'Lumière' };

  // Reconstruire la popup avec le nouveau design Tafakkur
  const card = document.querySelector('.level-popup-card');
  if (card) {
    card.innerHTML = `
      <div class="confetti-wrap" id="confettiWrap"></div>

      <!-- Ligne dorée supérieure -->
      <div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,${msg.color},transparent);"></div>

      <!-- Motif géométrique islamique -->
      <div style="text-align:center;margin-bottom:8px;">
        <div style="font-size:48px;line-height:1;filter:drop-shadow(0 0 20px ${msg.glow});">${msg.icon}</div>
      </div>

      <!-- Eyebrow -->
      <div style="text-align:center;font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.25em;text-transform:uppercase;color:${msg.color};opacity:0.8;margin-bottom:8px;">${msg.eyebrow}</div>

      <!-- Titre -->
      <div style="text-align:center;font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:#F0EAD6;letter-spacing:-0.5px;margin-bottom:16px;">${msg.title}</div>

      <!-- Verset arabe -->
      <div style="text-align:center;font-family:'Noto Naskh Arabic',serif;font-size:18px;color:${msg.color};direction:rtl;margin-bottom:6px;line-height:1.8;opacity:0.9;">${msg.arabic}</div>
      <div style="text-align:center;font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:rgba(240,234,214,0.5);margin-bottom:20px;">${msg.hadith}</div>

      <!-- Séparateur doré -->
      <div style="height:1px;background:linear-gradient(90deg,transparent,rgba(212,175,55,0.25),transparent);margin-bottom:16px;"></div>

      <!-- Message -->
      <div style="font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.75;color:rgba(240,234,214,0.82);text-align:center;margin-bottom:24px;">${msg.sub}</div>

      <!-- Boutons -->
      ${hasNext ? `
        <button class="btn-next-lvl" id="btnNextLvl" style="background:linear-gradient(135deg,${msg.color},${msg.color}99);color:#1a0f00;"
          onclick="goNextLevel()">
          Niveau suivant : ${NEXT_NAMES[nextId] || ''} →
        </button>` : `
        <button class="btn-next-lvl" id="btnNextLvl" style="background:linear-gradient(135deg,#FFD700,#D4AF37);color:#1a0f00;"
          onclick="closeLevelPopup();v2GoSanctuaire()">
          ☀️ Voir mon Sanctuaire
        </button>`
      }
      <button class="btn-stay-lvl" onclick="closeLevelPopup()">Rester sur ce niveau</button>
    `;
  }

  spawnConfettiTafakkur(msg.color);
  if (navigator.vibrate) navigator.vibrate([30, 50, 30, 50, 60]);
  playCompleteSound();
  document.getElementById('levelPopup').classList.add('show');
}
function goNextLevel() {
  const nextId = currentLevel + 1;
  closeLevelPopup();
  if (nextId <= LEVELS.length) setTimeout(() => selectLevel(nextId), 200);
}
function closeLevelPopup() { document.getElementById('levelPopup').classList.remove('show'); }
function autoNextLevel(levelId) {
  const nextId = levelId + 1;
  if (nextId <= LEVELS.length) {
    setTimeout(() => {
      closeLevelPopup();
      selectLevel(nextId);
      showToast('🌿 Niveau ' + nextId + ' débloqué — Mashallah !');
    }, 2000);
  }
}
function spawnConfetti() {
  spawnConfettiTafakkur('#D4AF37');
}

function spawnConfettiTafakkur(accentColor) {
  const wrap = document.getElementById('confettiWrap');
  if (!wrap) return;
  wrap.innerHTML = '';
  // Palette selon la couleur du niveau
  const base = accentColor || '#D4AF37';
  const colors = [base, '#F0EAD6', base + '99', '#ffffff', base + 'cc'];
  const symbols = ['✦', '◆', '•', '✦', '◆'];
  for (let i = 0; i < 32; i++) {
    const dot = document.createElement('div');
    const useSymbol = Math.random() > 0.5;
    if (useSymbol) {
      dot.style.cssText = `
        position:absolute;
        left:${10 + Math.random() * 80}%;
        top:${Math.random() * 20}%;
        color:${colors[Math.floor(Math.random() * colors.length)]};
        font-size:${8 + Math.random() * 10}px;
        opacity:0;
        animation:confettiFall ${0.8 + Math.random() * 1}s ease ${Math.random() * 0.5}s both;
      `;
      dot.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    } else {
      dot.className = 'confetti-dot';
      dot.style.cssText = `
        left:${10 + Math.random() * 80}%;
        top:${Math.random() * 30}%;
        background:${colors[Math.floor(Math.random() * colors.length)]};
        animation:confettiFall ${0.8 + Math.random() * 0.8}s ease ${Math.random() * 0.4}s both;
        border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
        width:${4 + Math.random() * 6}px;
        height:${4 + Math.random() * 6}px;
        box-shadow:0 0 4px ${base}66;
      `;
    }
    wrap.appendChild(dot);
  }
}
function switchView(name) {
  document.body.classList.remove('mentor-active');
  if (name !== 'checklist') stopCompass();
  if (name === 'ramadan' && !ramadanState.active) {
    toggleRamadanMode();
    return;
  }
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const activeView = document.getElementById('view-' + name);
  activeView.classList.add('active');
  activeView.style.display = name === 'accueil' ? 'flex' : 'block';
  const navEl = document.getElementById('nav-' + name);
  if (navEl) navEl.classList.add('active');
  if (name === 'progression') renderProgression();
  if (name === 'resume') renderResume();
  if (name === 'ramadan') renderRamadan();
  if (name === 'wird') { setTimeout(() => { if (typeof renderWird === 'function') renderWird(); }, 50); }
  if (name === 'accueil') {
    // V2: redirect to Sanctuaire (Orbe)
    if (typeof v2GoSanctuaire === 'function') {
      setTimeout(v2GoSanctuaire, 10);
      return;
    }
    renderAccueil();
    renderDefiCard();
  }
}

const accueilBg = ''; // fond géré par CSS

function renderAccueil() {
  // Forcer la vue en flex pour remplir tout l'écran sans vide
  const view = document.getElementById('view-accueil');
  const inner = view ? view.querySelector('div') : null;
  if (view) {
    view.style.cssText = "display:flex;flex-direction:column;height:100vh;overflow-y:auto;position:relative;background:var(--bg);";
  }
  if (inner) {
    inner.style.cssText = 'flex:1;display:flex;flex-direction:column;padding:calc(var(--safe-top, 0px) + 16px) 16px calc(70px + var(--safe-bot, 0px));gap:9px;overflow:hidden;position:relative;z-index:1;'; var overlay = view.querySelector('.accueil-overlay'); if (!overlay) { overlay = document.createElement('div'); overlay.className = 'accueil-overlay'; overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,0.52);z-index:0;pointer-events:none;'; view.insertBefore(overlay, view.firstChild); }
  }
  // Forcer le bouton CTA tout en bas
  const cta = view ? view.querySelector('#accueilCTA') : null;
  if (cta) cta.style.marginTop = 'auto';
  const streakDisplay = history.streak + (getLevelProgress(1) >= 100 ? 1 : 0);
  const bestDisplay = Math.max(history.bestStreak || 0, streakDisplay);
  const totalDisplay = history.totalDays + (getLevelProgress(1) >= 100 ? 1 : 0);
  const allLvlItems = LEVELS.filter(l => state._unlocked.includes(l.id)).flatMap(l => getLevelItems(l.id));
  const scoreJour = Math.round(getWeightedScore(allLvlItems, state));
  const pct = Math.min(Math.round(getLevelProgress(1)), 100);
  const currentLvl = LEVELS.find(l => l.id === (state._unlocked ? Math.max(...state._unlocked) : 1));
  const medal = getMedalLevel();

  // Date
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  const el = document.getElementById('accueilDateLabel');
  if (el) el.textContent = dateStr;

  // Streak
  const streakEl = document.getElementById('accueilStreak');
  if (streakEl) streakEl.textContent = streakDisplay;

  // Niveau
  const lvlEl = document.getElementById('accueilLevel');
  if (lvlEl) lvlEl.textContent = currentLvl ? currentLvl.title : '—';

  // Barre
  const barEl = document.getElementById('accueilProgBar');
  if (barEl) setTimeout(() => { barEl.style.width = pct + '%'; }, 100);
  const pctEl = document.getElementById('accueilPct');
  if (pctEl) pctEl.textContent = pct + '%';

  // Score
  const scoreEl = document.getElementById('accueilScore');
  if (scoreEl) scoreEl.textContent = scoreJour;
  const scoreLbl = document.getElementById('accueilScoreLabel');
  if (scoreLbl) scoreLbl.textContent = scoreJour >= 80 ? 'MashaAllah ✦' : scoreJour >= 50 ? 'Continue ↗' : 'En cours…';
  if (scoreEl) scoreEl.style.color = scoreJour >= 80 ? '#c8a84b' : scoreJour >= 50 ? 'var(--green)' : 'var(--t2)';

  // Medal
  const medalEl = document.getElementById('accueilMedalBadge');
  if (medalEl) {
    const medalMap = { none: '—', bronze: '🥉 Bronze', silver: '🥈 Argent', gold: '🥇 Or' };
    medalEl.textContent = medalMap[medal] || '—';
    if (medal === 'gold') { medalEl.style.background = 'var(--gold-soft)'; medalEl.style.color = 'var(--gold)'; }
    else if (medal === 'silver') { medalEl.style.background = 'rgba(176,196,206,0.1)'; medalEl.style.color = 'var(--silver)'; }
    else if (medal === 'bronze') { medalEl.style.background = 'rgba(212,145,74,0.1)'; medalEl.style.color = 'var(--bronze)'; }
  }

  // Medal hero
  const mhEl = document.getElementById('accueilMedalHero');
  if (mhEl) {
    const medalMap2 = { none: '—', bronze: '🥉 Bronze', silver: '🥈 Argent', gold: '🥇 Or' };
    mhEl.textContent = medalMap2[medal] || '—';
  }

  // 4ème stat score
  const s4 = document.getElementById('accueilScoreStat'); if (s4) s4.textContent = scoreJour;

  // Stats
  const s1 = document.getElementById('accueilStreakStat'); if (s1) s1.textContent = streakDisplay;
  const s2 = document.getElementById('accueilBestStat'); if (s2) s2.textContent = bestDisplay;
  const s3 = document.getElementById('accueilTotalStat'); if (s3) s3.textContent = totalDisplay;

  // Heatmap 14 jours
  const hm = document.getElementById('accueilHeatmap');
  if (hm) {
    hm.innerHTML = '';
    for (let i = 13; i >= 0; i--) {
      const d = getDateMinus(TODAY, i);
      const isToday = d === TODAY;
      const done = isToday ? getLevelProgress(1) >= 100 : !!(history.days && history.days[d]);
      const medal2 = isToday ? (done ? getMedalLevel() : null) : ((history.dayMedals && history.dayMedals[d]) || (done ? 'bronze' : null));
      const dot = document.createElement('div');
      let bg = 'rgba(255,255,255,0.06)';
      if (medal2 === 'gold') bg = 'linear-gradient(135deg,#c8a84b,#e8cc6a)';
      else if (done) bg = 'var(--green)';
      dot.style.cssText = 'width:16px;height:8px;border-radius:3px;background:' + bg + ';flex:1;' + (isToday ? 'box-shadow:0 0 6px rgba(52,217,98,0.5);' : '');
      hm.appendChild(dot);
    }
  }

  // Phrase du jour
  const PHRASES_ACCUEIL = [
    { text: 'L\'acte le plus aimé d\'Allah est celui qui est régulier, même s\'il est peu.', ref: '— Bukhari 6464' },
    { text: 'Certes, avec la difficulté vient la facilité.', ref: '— Coran 94:5' },
    { text: 'Les actes ne valent que par les intentions.', ref: '— Bukhari 1' },
    { text: 'Allah est avec ceux qui sont patients.', ref: '— Coran 2:153' },
    { text: 'Celui qui se rapproche de Moi d\'un empan, Je Me rapproche de lui d\'une coudée.', ref: '— Bukhari 7405' },
    { text: 'Ne sous-estime aucun acte de bonté, fût-ce un visage souriant.', ref: '— Muslim 2626' },
    { text: 'La vraie richesse est la richesse de l\'âme.', ref: '— Bukhari 6446' },
  ];
  const dayIdx = Math.floor(Date.now() / 86400000) % PHRASES_ACCUEIL.length;
  const phrase = PHRASES_ACCUEIL[dayIdx];
  const ptEl = document.getElementById('accueilPhraseText'); if (ptEl) ptEl.textContent = phrase.text;
  const prEl = document.getElementById('accueilPhraseRef'); if (prEl) prEl.textContent = phrase.ref;

  // Défis

  // Intention
  const intentionLabel = localStorage.getItem('niyyah_intention_label');
  const intentionDate = localStorage.getItem('niyyah_intention_date');
  const intentionEl = document.getElementById('accueilIntention');
  if (intentionEl && intentionLabel && intentionDate === TODAY) {
    intentionEl.style.display = 'flex';
    const icons = { rapprochement: '🌙', engagement: '⚖️', reconstruction: '🤲', gratitude: '✦' };
    const type = localStorage.getItem('niyyah_intention_type') || 'rapprochement';
    const iconEl = document.getElementById('accueilIntentionIcon'); if (iconEl) iconEl.textContent = icons[type] || '🌙';
    const txtEl = document.getElementById('accueilIntentionText'); if (txtEl) txtEl.textContent = intentionLabel.replace(/[🌙⚖️🤲✦]/g, '').trim();
  } else if (intentionEl) {
    intentionEl.style.display = 'none';
  }
}
function showBadgePopup(badge) {
  const iconEl = document.getElementById('popupIcon');
  iconEl.textContent = badge.emoji;
  iconEl.style.fontSize = '32px';
  document.getElementById('popupTitle').textContent = badge.name;
  document.getElementById('popupSub').textContent = badge.desc;
  document.getElementById('badgePopup').classList.add('show');
}
function closeBadgePopup() { document.getElementById('badgePopup').classList.remove('show'); }
function renderResume() {
  const el = document.getElementById('resumeContent');
  const dateEl = document.getElementById('resumeDatePill');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  }
  const allItems = LEVELS.flatMap(l => l.sections.flatMap(s => s.items));
  const totalDone = allItems.filter(item => { try { return isItemDone(item, state); } catch(e) { return item.type==="counter"?(state[item.id]||0)>=item.target:!!state[item.id]; } }).reduce((sum, i) => { try { return sum + getWeight(i.id); } catch(e) { return sum + 1; } }, 0);
  const totalAll = allItems.reduce((sum, i) => { try { return sum + getWeight(i.id); } catch(e) { return sum + 1; } }, 0);
  const globalPct = totalAll > 0 ? Math.round(totalDone / totalAll * 100) : 0;
  const medal = getMedalLevel();
  const f3 = document.getElementById('globalFill3');
  if (f3) f3.style.width = globalPct + '%';
  const emojiMap = { none: '🌱', bronze: '🥉', silver: '🥈', gold: '🥇' };
  const msgMap = {
    none:   { title: 'Continue, inch\'Allah !', sub: 'Chaque pas compte. Allah voit tes efforts.' },
    bronze: { title: 'Mashallah !',             sub: 'Les fondations sont posées. Barakallahu feek !' },
    silver: { title: 'SubhanAllah !',           sub: 'Dhikr, prière, mosquée — ton cœur brille.' },
    gold:   { title: 'Allahu Akbar !',          sub: 'Journée parfaite accomplie. Qu\'Allah accepte tes actes !' },
  };
  const msg = msgMap[medal];
  const r = 36, cx = 44, cy = 44, circ = 2 * Math.PI * r;
  const strokeDash = (globalPct / 100) * circ;
  const ringColor = medal === 'gold' ? 'var(--gold)' : medal === 'silver' ? 'var(--silver)' : 'var(--green)';
  const ringHtml = '<div style="width:88px;height:88px;position:relative;margin:0 auto 16px;"><svg width="88" height="88" viewBox="0 0 88 88" style="transform:rotate(-90deg)"><circle cx="44" cy="44" r="36" fill="none" stroke="var(--sep2)" stroke-width="5"/><circle cx="44" cy="44" r="36" fill="none" stroke="' + ringColor + '" stroke-width="5" stroke-linecap="round" stroke-dasharray="' + circ.toFixed(1) + '" stroke-dashoffset="' + (circ - strokeDash).toFixed(1) + '" style="transition:stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1);filter:drop-shadow(0 0 6px ' + ringColor + ')"/></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:20px;color:var(--t1);letter-spacing:-1px;">' + globalPct + '%</div></div>';
  const levelIcons = ['🕌', '📿', '📚', '💚'];
  let levelsHtml = '<div class="resume-levels">';
  LEVELS.forEach((lvl, i) => {
    const pct = Math.round(getLevelProgress(lvl.id));
    const isDone = pct >= 100;
    const unlocked = state._unlocked.includes(lvl.id);
    const color = isDone ? 'var(--gold)' : 'var(--green)';
    const pctCls = isDone ? 'resume-level-pct done' : 'resume-level-pct';
    var resumeLockSvg = '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><rect x="1" y="7" width="12" height="9" rx="2" stroke="#C8A84A" stroke-width="1.5"/><path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"/></svg>';
    var resumePctLabel = !unlocked ? resumeLockSvg : (unlocked && pct === 0) ? 'Commence !' : pct + '%';
    levelsHtml += '<div class="resume-level-row" style="' + (!unlocked ? 'opacity:0.4' : '') + '"><div class="resume-level-icon">' + levelIcons[i] + '</div><div class="resume-level-body"><div class="resume-level-name">' + lvl.title + (isDone ? ' ✓' : '') + '</div><div class="resume-level-bar-track"><div class="resume-level-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div></div><div class="' + pctCls + '">' + resumePctLabel + '</div></div>';
  });
  levelsHtml += '</div>';
  const todayDone = getLevelProgress(1) >= 100;
  const streakDisplay = history.streak + (todayDone ? 1 : 0);
  el.innerHTML = '<div class="resume-hero">' + ringHtml + '<div class="resume-title">' + msg.title + '</div><div class="resume-sub">' + msg.sub + '</div></div>' +
    '<div style="background:var(--card);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:8px;display:flex;gap:24px;justify-content:center;">' +
      '<div style="text-align:center"><div style="font-family:var(--serif);font-size:28px;color:var(--t1);letter-spacing:-1px;">' + totalDone + '</div><div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);font-weight:600;margin-top:2px;">Actes</div></div>' +
      '<div style="width:1px;background:var(--sep)"></div>' +
      '<div style="text-align:center"><div style="font-family:var(--serif);font-size:28px;color:var(--t1);letter-spacing:-1px;">' + streakDisplay + '</div><div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);font-weight:600;margin-top:2px;">Jours</div></div>' +
      '<div style="width:1px;background:var(--sep)"></div>' +
      '<div style="text-align:center"><div style="font-size:22px;line-height:1.3;">' + emojiMap[medal] + '</div><div style="font-size:9px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);font-weight:600;margin-top:2px;">Médaille</div></div>' +
    '</div>' +
    levelsHtml +
    '<div class="resume-actions">' +
      '<button class="btn-new-day" onclick="switchView(\'checklist\')">Commencer ma journée</button>' +
      '<button style="width:100%;padding:14px;border-radius:14px;border:none;background:#C8A84A;color:#2C2E32;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--sans);margin-bottom:0;" onclick="openBilanSoir()">🌙 Bilan du soir</button>' +
      '<button class="btn-back-check" onclick="switchView(\'checklist\')">← Retour à la checklist</button>' +
    '</div>';
}
function init() {
  applyTheme(currentTheme);
  checkWeeklyBilan();
  checkTawba();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('touchmove', onScroll, { passive: true });
  document.addEventListener('scroll', onScroll, { passive: true });
  currentLevel = 1;
  document.querySelectorAll('.view').forEach(v => { v.classList.remove('active'); v.style.display = 'none'; });
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const accueilView = document.getElementById('view-accueil');
  accueilView.classList.add('active');
  accueilView.style.display = 'flex';
  document.getElementById('nav-accueil').classList.add('active');
  if (!_onboardDone) {
    onboardRender();
  } else {
    document.getElementById('onboardScreen').classList.add('hidden');
    if (_prayerCity) loadPrayerTimes();
    const lastNiyyah = localStorage.getItem('niyyah_intention_date');
    if (lastNiyyah !== TODAY) {
      setTimeout(showNiyyahScreen, 100);
    } else {
      document.getElementById('niyyahScreen').style.display = 'none';
    }
  }
  const now = new Date();
  const dateStr = now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
  ['datePill', 'resumeDatePill'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = dateStr;
  });
  updateNavRamadan();
  renderTabs();
  renderLevel(currentLevel);
  renderAccueil();
  updateGlobalProgress();
  checkBadges();
  renderRamadanActivateBtn();
  initNotifications();
}
function showNiyyahScreen() {
  // V2 OVERRIDE: Route to V2 Sanctuaire instead of old niyyah screen
  // The Orbe is now the unique intention entry point
  const screen = document.getElementById('niyyahScreen');
  if (screen) { screen.style.display = 'none'; }
  if (typeof v2GoSanctuaire === 'function') {
    setTimeout(v2GoSanctuaire, 50);
    setTimeout(v2RefreshStats, 150);
  }
  return; // Skip rest of old function
  // LEGACY CODE BELOW (kept for reference):
  screen.style.display = 'flex';
  screen.style.opacity = '1';
  // Nasheed d'accueil
  try {
    const audio = new Audio('./jannat-al-qalb.mp3');
    audio.volume = 0.4;
    audio.play().catch(() => {});
    window._niyyahAudio = audio;
  } catch(e) {}
  initNiyyahParticles();
  // Fix SW cache : forcer visibilité immédiate sans attendre les transitions
  const arabic = document.getElementById('niyyahArabic');
  const t = document.getElementById('niyyahTitle');
  const s = document.getElementById('niyyahSub');
  const cards = document.getElementById('niyyahCards');
  const skip = document.getElementById('niyyahSkip');
  if (arabic) { arabic.style.opacity = '1'; arabic.style.transform = 'translateY(0)'; }
  setTimeout(() => { if (t) t.style.opacity = '1'; if (s) s.style.opacity = '1'; }, 200);
  setTimeout(() => { if (cards) { cards.style.opacity = '1'; cards.style.transform = 'translateY(0)'; } }, 400);
  setTimeout(() => { if (skip) skip.style.opacity = '1'; }, 800);
  // FAILSAFE : forcer fermeture après 10s si les cartes ne s'affichent pas
  if (window._niyyahFailsafe) clearTimeout(window._niyyahFailsafe);
  window._niyyahFailsafe = setTimeout(() => {
    const screen = document.getElementById('niyyahScreen');
    if (screen && screen.style.display !== 'none') {
      screen.style.display = 'none';
      screen.style.opacity = '0';
      if (window._niyyahAudio) { window._niyyahAudio.pause(); window._niyyahAudio = null; }
      if (window._niyyahParticleAnim) cancelAnimationFrame(window._niyyahParticleAnim);
      localStorage.setItem('niyyah_intention_date', TODAY);
    }
  }, 10000);
}
function initNiyyahParticles() {
  const canvas = document.getElementById('niyyahCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const particles = Array.from({length: 40}, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 1.5 + 0.5,
    speed: Math.random() * 0.4 + 0.1,
    opacity: Math.random() * 0.4 + 0.1,
    drift: (Math.random() - 0.5) * 0.3
  }));
  let animId;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(200,168,75,${p.opacity})`;
      ctx.fill();
      p.y -= p.speed;
      p.x += p.drift;
      if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
    });
    animId = requestAnimationFrame(draw);
  }
  draw();
  window._niyyahParticleAnim = animId;
}
function chooseNiyyah(type) {
  const labels = {
    rapprochement: "Me rapprocher d'Allah 🌙",
    engagement: "Tenir mes engagements ⚖️",
    reconstruction: "Me reconstruire 🤲",
    gratitude: "Être reconnaissant ✦"
  };
  // V2 sync: update orb chip with clean label (no emoji)
  const cleanLabels = {
    rapprochement: "Me rapprocher d'Allah",
    engagement: "Tenir mes engagements",
    reconstruction: "Me reconstruire",
    gratitude: "Être reconnaissant"
  };
  const s2 = JSON.parse(localStorage.getItem('niyyah_v2_bridge') || '{}');
  s2.intention = cleanLabels[type] || type;
  s2.intentionDate = new Date().toDateString();
  localStorage.setItem('niyyah_v2_bridge', JSON.stringify(s2));
  if (typeof v2UpdateOrbState === 'function') setTimeout(v2UpdateOrbState, 200);
  if (window._niyyahFailsafe) { clearTimeout(window._niyyahFailsafe); window._niyyahFailsafe = null; }
  localStorage.setItem('niyyah_intention_date', TODAY);
  localStorage.setItem('niyyah_intention_type', type);
  localStorage.setItem('niyyah_intention_label', labels[type] || type);
  if (window._niyyahAudio) { window._niyyahAudio.pause(); window._niyyahAudio = null; }
  const screen = document.getElementById('niyyahScreen');
  screen.classList.add('niyyah-dissolve');
  setTimeout(() => {
    showToast('نِيَّة — ' + labels[type]);
    if (navigator.vibrate) navigator.vibrate([20, 40, 20]);
  }, 300);
  setTimeout(() => {
    screen.style.display = 'none';
    if (window._niyyahParticleAnim) cancelAnimationFrame(window._niyyahParticleAnim);
  }, 650);
}
function skipNiyyah() {
  if (window._niyyahFailsafe) { clearTimeout(window._niyyahFailsafe); window._niyyahFailsafe = null; }
  localStorage.setItem('niyyah_intention_date', TODAY);
  if (window._niyyahAudio) { window._niyyahAudio.pause(); window._niyyahAudio = null; }
  const screen = document.getElementById('niyyahScreen');
  screen.classList.add('niyyah-dissolve');
  setTimeout(() => {
    screen.style.display = 'none';
    if (window._niyyahParticleAnim) cancelAnimationFrame(window._niyyahParticleAnim);
  }, 650);
}
function renderRamadanActivateBtn() {
  const btn = document.getElementById('ramadanActivateBtn');
  if (!btn) return;
  if (ramadanState.active) {
    btn.classList.add('ramadan-on');
    btn.title = 'Désactiver le Mode Ramadan';
  } else {
    btn.classList.remove('ramadan-on');
    btn.title = 'Activer le Mode Ramadan';
  }
}
function renderTabs() {
  const tabs = document.getElementById('levelTabs');
  tabs.innerHTML = LEVELS.map(l => {
    const unlocked = state._unlocked.includes(l.id);
    const active   = l.id === currentLevel;
    const pct      = getLevelProgress(l.id);
    const done     = pct >= 100;
    let cls = 'tab';
    if (active)        cls += ' active';
    else if (!unlocked) cls += ' locked';
    else if (done)     cls += ' done';
    const lock = !unlocked ? ' <svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-left:4px;"><rect x="1" y="7" width="12" height="9" rx="2" stroke="#C8A84A" stroke-width="1.5"/><path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"/></svg>' : done ? ' ✓' : '';
    return '<div class="' + cls + '" onclick="selectLevel(' + l.id + ')">' + l.title + lock + '</div>';
  }).join('');
}
function animateTabSwipe(direction, callback) {
  const content = document.getElementById('content');
  if (!content) { callback(); return; }
  const out = direction === 'left' ? '-30%' : '30%';
  const inFrom = direction === 'left' ? '30%' : '-30%';
  content.style.transition = 'none';
  content.style.transform = 'translateX(0)';
  content.style.opacity = '1';
  requestAnimationFrame(() => {
    content.style.transition = 'transform 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease';
    content.style.transform = 'translateX(' + out + ')';
    content.style.opacity = '0.3';
    setTimeout(() => {
      callback();
      content.style.transition = 'none';
      content.style.transform = 'translateX(' + inFrom + ')';
      content.style.opacity = '0.3';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          content.style.transition = 'transform 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.22s ease';
          content.style.transform = 'translateX(0)';
          content.style.opacity = '1';
        });
      });
    }, 180);
  });
}

function selectLevel(id) {
  if (id > 1 && !state._unlocked.includes(id)) {
    if (localStorage.getItem('niyyah_pro') === '1') {
      if (!state._unlocked.includes(id)) state._unlocked.push(id);
      saveState();
    } else {
      openFreemium();
      return;
    }
  }
  currentLevel = id;
  saveState();
  renderTabs();
  renderLevel(id);
  setTimeout(() => {
    const activeView = document.querySelector('.view.active');
    if (activeView) activeView.scrollTop = 0;
    window.scrollTo(0, 0);
  }, 30);
}
function getMoonSVG(percent) {
  var p = Math.max(0, Math.min(100, percent));
  var s = 60, r = 26, cx = 30, cy = 30;
  var fill = '#C8A84A', stroke = '#C8A84A';
  if (p <= 10) {
    return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 60 60"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="transparent" stroke="'+stroke+'" stroke-width="2" opacity="0.5"/></svg>';
  }
  if (p >= 100) {
    return '<svg class="moon-full" width="'+s+'" height="'+s+'" viewBox="0 0 60 60"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+fill+'"/></svg>';
  }
  // Crescent / half / gibbous via two arcs
  var t = p / 100;
  // Inner edge x-radius: 1=new, 0=half, -1=full
  var ix = 1 - 2 * t;
  var sweep = ix >= 0 ? 0 : 1;
  var axr = Math.abs(ix) * r;
  return '<svg width="'+s+'" height="'+s+'" viewBox="0 0 60 60">'
    + '<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="transparent" stroke="'+stroke+'" stroke-width="1.5" opacity="0.2"/>'
    + '<path d="M '+cx+' '+(cy-r)+' A '+r+' '+r+' 0 1 1 '+cx+' '+(cy+r)+' A '+axr+' '+r+' 0 0 '+sweep+' '+cx+' '+(cy-r)+'" fill="'+fill+'"/>'
    + '</svg>';
}
function getPrayerTimelineColor() {
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  function toMin(str) {
    if (!str) return null;
    const p = str.replace(/ *\(.*\)/, '').split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  if (!_prayerTimes) return '#1a1f3e';
  const fajr    = toMin(_prayerTimes['Fajr']);
  const dhuhr   = toMin(_prayerTimes['Dhuhr']);
  const asr     = toMin(_prayerTimes['Asr']);
  const maghrib = toMin(_prayerTimes['Maghrib']);
  const isha    = toMin(_prayerTimes['Isha']);
  if (fajr == null || dhuhr == null || asr == null || maghrib == null || isha == null) return '#1a1f3e';
  if (nowMin < fajr || nowMin >= isha) return '#1a1f3e';
  if (nowMin < dhuhr)   return '#2a4a7f';
  if (nowMin < asr)     return '#C8A84A';
  if (nowMin < maghrib) return '#c4722a';
  return '#7a2a2a';
}
function getCurrentPrayerBlock() {
  var now = new Date();
  var nowMin = now.getHours() * 60 + now.getMinutes();
  function toMin(str) {
    if (!str) return null;
    var p = str.replace(/ *\(.*\)/, '').split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  if (!_prayerTimes) return { id: 'nuit', label: '🌙 La nuit' };
  var fajr = toMin(_prayerTimes['Fajr']);
  var dhuhr = toMin(_prayerTimes['Dhuhr']);
  var asr = toMin(_prayerTimes['Asr']);
  var maghrib = toMin(_prayerTimes['Maghrib']);
  var isha = toMin(_prayerTimes['Isha']);
  if (fajr == null || dhuhr == null || asr == null || maghrib == null || isha == null) return { id: 'nuit', label: '🌙 La nuit' };
  if (nowMin < fajr) {
    var qiyamStart = Math.floor(fajr * 2 / 3);
    if (nowMin >= qiyamStart) return { id: 'qiyam', label: '🌙 Qiyam al-Layl' };
    return { id: 'nuit', label: '🌙 La nuit' };
  }
  if (nowMin < dhuhr)   return { id: 'fajr',    label: 'APRÈS FAJR' };
  if (nowMin < asr)     return { id: 'dhuhr',   label: 'APRÈS DHUHR' };
  if (nowMin < maghrib) return { id: 'asr',     label: 'APRÈS ASR' };
  if (nowMin < isha)    return { id: 'maghrib', label: 'APRÈS MAGHRIB' };
  return { id: 'isha', label: 'APRÈS ISHA' };
}
function getConversionMessage(streak) {
  if (streak >= 30) return 'Si vous êtes reconnaissants, J\'augmenterai Mes bienfaits. — Ibrahim 14:7';
  if (streak >= 14) return 'Al-Muwâdhib — celui qui persévère. C\'est toi. Le niveau supérieur t\'appartient.';
  if (streak >= 7)  return '7 jours de constance — Allah a vu chaque acte. Continue avec le niveau Approfondissement.';
  if (streak >= 3)  return 'Le Prophète ﷺ : l\'acte le plus aimé d\'Allah est celui fait avec constance. — Bukhari 6465';
  return 'Chaque grand voyage commence par un premier pas. Le niveau Approfondissement t\'attend.';
}
function renderLevel(levelId) {
  const level   = LEVELS.find(l => l.id === levelId);
  const content = document.getElementById('content');
  const pct     = getLevelProgress(levelId);
  if (!state._unlocked.includes(levelId)) {
    var _streak = (history && history.streak) || 0;
    var _convMsg = getConversionMessage(_streak);
    content.innerHTML = '<div style="background:rgba(200,168,75,0.08);border:1px solid rgba(200,168,75,0.3);border-radius:16px;padding:24px;text-align:center;margin:20px 16px;">'
      + '<div style="font-size:24px;color:#C8A84A;margin-bottom:16px;">✦</div>'
      + '<svg width="40" height="46" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-bottom:14px;"><rect x="1" y="7" width="12" height="9" rx="2" stroke="#C8A84A" stroke-width="1.5"/><path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"/></svg>'
      + '<div style="font-size:18px;font-weight:600;color:var(--t1);margin-bottom:6px;">Niveau ' + levelId + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;color:#E8DCC0;line-height:1.7;margin:16px 0 20px;padding:0 8px;">' + _convMsg + '</div>'
      + '<button onclick="openFreemium()" style="width:100%;background:#C8A84A;color:#000;font-size:14px;font-weight:700;border:none;border-radius:12px;padding:14px;cursor:pointer;">Continuer ma progression →</button>'
      + '<div style="font-size:10px;color:rgba(255,255,255,0.3);margin-top:10px;">4.99€ · Paiement unique · Accès à vie</div>'
      + '</div>';
    return;
  }
  let fridayBanner = '';
  if (level.id === 1 && isFriday()) {
    const FRIDAY_ITEMS = [
      { id: 'fri_kahf',    label: 'Sourate Al-Kahf',       arabic: 'سُورَةُ الْكَهْفِ',         hadith: '"Celui qui lit Al-Kahf le vendredi aura une lumière entre les deux vendredis" — Hakim' },
      { id: 'fri_salawat', label: 'Salawat × 1000 sur le Prophète ﷺ', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ', hadith: '"Le meilleur de vos jours est le vendredi — multipliez la Salawat" — Abu Dawud' },
      { id: 'fri_doua',    label: 'Douaa de l\'heure bénie', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً', hadith: '"Il y a une heure le vendredi où Allah exauce toute demande" — Bukhari & Muslim' },
    ];
    const fridayState = JSON.parse(localStorage.getItem('niyyah_friday_' + TODAY) || '{}');
    let fitems = '';
    FRIDAY_ITEMS.forEach(fi => {
      const done = !!fridayState[fi.id];
      fitems += '<div class="friday-item' + (done ? ' checked' : '') + '" onclick="toggleFridayItem(\'' + fi.id + '\')">';
      fitems += '<div class="friday-check"><svg class="friday-check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>';
      fitems += '<div class="friday-item-body">';
      // Bouton audio Al-Kahf uniquement pour fri_kahf
      let _audioBtnFri = '';
      if (fi.id === 'fri_kahf') {
        _audioBtnFri = '<button class="btn-audio" id="btnKahfPlay" ontouchstart="event.stopPropagation()" onclick="toggleKahfAudio(this,event)" title="Écouter Al-Kahf — Alafasy" style="margin-left:0;margin-top:6px;width:auto;padding:0 10px;border-radius:8px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;"><span id="kahfPlayIcon">🔊</span><span id="kahfPlayLabel">Écouter Al-Kahf</span></button>';
      }
      fitems += '<div class="friday-item-label">' + fi.label + '</div>';
      fitems += '<div class="friday-item-hadith">' + fi.hadith + '</div>';
      fitems += '<div class="friday-item-arabic">' + fi.arabic + '</div>';
      fitems += _audioBtnFri;
      fitems += '</div></div>';
    });
    fridayBanner = '<div class="friday-banner"><div class="friday-header"><div style="font-size:22px">🌟</div><div class="friday-txt"><div class="friday-title">Yawm al-Jumuah — Vendredi béni</div><div class="friday-sub">La prière du vendredi est obligatoire aujourd\'hui</div></div></div><div class="friday-items">' + fitems + '</div></div>';
  }
  const graceBanner = (level.id === 1 && isGraceActive()) ?
    '<div style="background:linear-gradient(135deg,rgba(255,149,0,0.12),rgba(255,214,10,0.06));border:1px solid rgba(255,149,0,0.25);border-radius:var(--r-lg);padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;">' +
    '<div style="font-size:22px">⏳</div>' +
    '<div><div style="font-size:13px;font-weight:600;color:#ff9500;">Tu as manqué hier</div>' +
    '<div style="font-size:12px;color:var(--t3);margin-top:2px;">Complete le Niveau 1 aujourd\'hui pour sauver ton streak 🌿</div></div></div>' : '';
  const prayerCard = level.id === 1 ? renderPrayerTimesCard() : '';
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
  const allLvlItems = LEVELS.filter(l => state._unlocked.includes(l.id)).flatMap(l => getLevelItems(l.id));
  const scoreJour = Math.round(getWeightedScore(allLvlItems, state));
  const scoreColor = scoreJour >= 80 ? '#c8a84b' : scoreJour >= 50 ? 'var(--green)' : 'var(--t2)';
  const scoreBg = scoreJour >= 80 ? 'rgba(200,168,75,0.12)' : scoreJour >= 50 ? 'rgba(52,217,98,0.08)' : 'rgba(255,255,255,0.04)';
  const scoreBorder = scoreJour >= 80 ? 'rgba(200,168,75,0.3)' : scoreJour >= 50 ? 'rgba(52,217,98,0.2)' : 'rgba(255,255,255,0.08)';
  const scoreLabel = scoreJour >= 80 ? 'MashaAllah ✦' : scoreJour >= 50 ? 'Continue ↗' : 'En cours…';
  let html = '<div class="level-hero"><div class="hero-label">Niveau ' + level.id + '</div><div class="hero-title">' + level.title + '</div><div class="hero-bar-row"><div class="hero-bar-track"><div class="hero-bar-fill" style="width:' + pct + '%"></div></div><div class="hero-pct">' + Math.round(pct) + '%</div></div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding:8px 12px;background:' + scoreBg + ';border:1px solid ' + scoreBorder + ';border-radius:10px;">'
    + '<div style="font-size:11px;color:var(--t3);letter-spacing:0.5px;">Score pondéré du jour</div>'
    + '<div style="display:flex;align-items:center;gap:6px;">'
    + '<div style="font-size:16px;font-weight:800;color:' + scoreColor + ';">' + scoreJour + '</div>'
    + '<div style="font-size:10px;color:' + scoreColor + ';opacity:0.8;">/100</div>'
    + '<div style="font-size:10px;color:' + scoreColor + ';background:' + scoreBg + ';border:1px solid ' + scoreBorder + ';border-radius:6px;padding:1px 6px;margin-left:2px;">' + scoreLabel + '</div>'
    + '</div></div>'
    + '</div>' + graceBanner + fridayBanner + prayerCard + qiblaCard;
  var _block = getCurrentPrayerBlock();
  if (!_prayerTimes && (_block.id === 'nuit' || _block.id === 'qiyam')) {
    if (!window._prayerBlockRetryCount) window._prayerBlockRetryCount = 0;
    if (window._prayerBlockRetryCount < 2) {
      window._prayerBlockRetryCount++;
      html += '<div style="text-align:center;padding:20px 0;"><div class="prayer-spinner"></div></div>';
      content.innerHTML = html;
      setTimeout(function() { renderLevel(levelId); }, 3000);
      return;
    }
    _block = { id: 'reveil', label: 'AU RÉVEIL' };
  }
  var _bandeauSub = 'Tes actes du moment';
  if (_block.id === 'nuit') _bandeauSub = 'Dors avec le Witr';
  else if (_block.id === 'qiyam') _bandeauSub = state._unlocked && state._unlocked.includes(4) ? 'L\'heure du Qiyam al-Layl' : 'Dors avec le Witr';
  html += '<div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(200,168,75,0.15),rgba(200,168,75,0.05));border:1px solid rgba(200,168,75,0.35);border-radius:14px;padding:14px 18px;margin:0 0 20px;">'
    + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
    + '<div>'
    + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;letter-spacing:0.5px;">' + _block.label + '</div>'
    + '<div style="font-size:11px;color:var(--t3);margin-top:2px;">' + _bandeauSub + '</div>'
    + '</div>'
    + '</div>';
  var _toggleLabel = window._showAllBlocks ? 'Moment actuel' : 'Ma journée complète';
  html += '<div style="text-align:center;margin:-12px 0 16px;"><button onclick="window._showAllBlocks=!window._showAllBlocks;renderLevel(' + levelId + ')" style="background:transparent;border:none;color:#C8A84A;font-size:11px;font-weight:600;cursor:pointer;opacity:0.7;letter-spacing:0.3px;">' + _toggleLabel + '</button></div>';
  const _currentBlock = _block.id;
  level.sections.forEach(section => {
    const _filteredItems = section.items.filter(function(item) {
      if (window._showAllBlocks) {
        if (item.block === 'ressources') return false;
        if (item.id === 'sunnah_jejune') { var d = new Date().getDay(); return d === 1 || d === 4; }
        return true;
      }
      if (!item.block) return true;
      if (item.block === 'ressources') return false;
      if (item.block === _currentBlock) return true;
      if (item.block === 'jour') {
        if (item.id === 'sunnah_jejune') { var d = new Date().getDay(); return d === 1 || d === 4; }
        return true;
      }
      return false;
    });
    if (_filteredItems.length === 0) return;
    html += '<div class="section"><div class="section-title-row"><div class="section-icon-wrap">' + section.icon + '</div><div class="section-name">' + section.title + '</div></div>'
      + (section.desc ? '<div style="margin:8px 0 12px;background:rgba(52,217,98,0.08);border:1px solid rgba(52,217,98,0.2);border-radius:10px;padding:12px 14px;display:flex;gap:10px;align-items:flex-start;"><div style="font-size:20px;flex-shrink:0;">🌿</div><div><div style="font-size:13px;font-weight:600;color:var(--green);margin-bottom:3px;">C\'est quoi le wird ?</div><div style="font-size:13px;color:var(--t2);line-height:1.5;">' + section.desc + '</div></div></div>' : '');
    const _tlColor = getPrayerTimelineColor();
    html += '<div class="items-group" style="border-left:2px solid ' + _tlColor + ';padding-left:12px;margin-left:4px;">';
    let _firstUncheckedFound = false;
    _filteredItems.forEach((item, idx) => {
      const delay = idx * 30;
      if (item.type === 'wird') {
        html += renderWirdSmartCard(item, delay);
      } else if (item.type === 'counter') {
        html += renderCounter(item, delay);
      } else if (item.prayer) {
        const _pChecked = !!state[item.id];
        const _pTlCurrent = (!_pChecked && !_firstUncheckedFound) ? (_firstUncheckedFound = true, ' timeline-current') : '';
        html += renderPrayerItem(item, delay, _pTlCurrent, _pChecked);
      } else if (item.coranPicker) {
        const checked = !!state[item.id];
        const optionalBadge = '<span style="font-size:9px;font-weight:700;letter-spacing:0.8px;color:var(--green);background:rgba(52,217,98,0.12);border:1px solid rgba(52,217,98,0.25);border-radius:6px;padding:1px 5px;margin-left:5px;vertical-align:middle;">BONUS</span>';
        html += '<div class="item' + (checked ? ' checked' : '') + '" onclick="toggleItem(\'' + item.id + '\',event)" style="animation-delay:' + delay + 'ms;--i:' + idx + '" id="item-' + item.id + '">'
          + '<div class="check-circle"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
          + '<div class="item-body"><div class="item-label">' + item.label + optionalBadge + '</div><div class="item-sub">' + item.sub + '</div>'
          + '<div class="item-arabic">' + item.arabic + '</div></div>'
          + '<button class="btn-audio" onclick="openCoranPicker(event)" title="Choisir une sourate" style="font-size:13px;padding:0 10px;width:auto;white-space:nowrap;">📖 Écouter</button>'
          + '</div>';
      } else {
        const checked = !!state[item.id];
        const fridayCls = item.isFriday ? ' friday-item' : '';
        const arabicHtml = item.arabic ? '<div class="item-arabic">' + item.arabic + '</div>' : '';
        const audioSrc = Array.isArray(item.audio) ? JSON.stringify(item.audio).replace(/"/g,"'") : item.audio;
        const audioBtn = item.audio ? '<button class="btn-audio" ontouchstart="event.stopPropagation()" onclick="playAudio(' + (Array.isArray(item.audio) ? JSON.stringify(item.audio).replace(/"/g,"'") : '\'' + item.audio + '\'') + ',this,event)" title="Écouter la récitation">🔊</button>' : '';
        let infoBtn = '';
        if (item.hadith) {
          const labelEsc2 = item.label.replace(/"/g,'&quot;');
          const arabicEsc2 = (item.arabic||'').replace(/"/g,'&quot;');
          const hadithEsc = item.hadith.replace(/"/g,'&quot;');
          const sourceEsc = (item.source||'').replace(/"/g,'&quot;');
          infoBtn = '<button class="btn-info" onclick="openInfoSheet(\'\',\'\',\'\',\'\',event)" data-label="' + labelEsc2 + '" data-arabic="' + arabicEsc2 + '" data-phonetic="" data-translation="' + hadithEsc + '" title="Pourquoi ?"><i>i</i></button>';
        } else if (item.sub && item.sub.includes('·') && item.arabic) {
          const parts = item.sub.split('·');
          const phonetic = parts[0].trim();
          const translation = parts.slice(1).join('·').trim();
          const labelEsc2 = item.label.replace(/"/g,'&quot;');
          const arabicEsc2 = (item.arabic||'').replace(/"/g,'&quot;');
          const phoneticEsc = phonetic.replace(/"/g,'&quot;');
          const translationEsc = translation.replace(/"/g,'&quot;');
          infoBtn = '<button class="btn-info" onclick="openInfoSheet(\'\',\'\',\'\',\'\',event)" data-label="' + labelEsc2 + '" data-arabic="' + arabicEsc2 + '" data-phonetic="' + phoneticEsc + '" data-translation="' + translationEsc + '" title="Voir la phonétique"><i>i</i></button>';
        }
        const optionalBadge = item.optional ? '<span style="font-size:9px;font-weight:700;letter-spacing:0.8px;color:var(--green);background:rgba(52,217,98,0.12);border:1px solid rgba(52,217,98,0.25);border-radius:6px;padding:1px 5px;margin-left:5px;vertical-align:middle;">BONUS</span>' : '';
        const priorityDot = item.priority === 'fard' ? '<span class="priority-fard">&nbsp;</span>' : item.priority === 'sunnah' ? '<span class="priority-sunnah">&nbsp;</span>' : '';
        const _tlCurrent = (!checked && !_firstUncheckedFound) ? (_firstUncheckedFound = true, ' timeline-current') : '';
        const _tlOpacity = checked ? 'opacity:0.3;' : '';
        html += '<div class="item' + fridayCls + (checked ? ' checked' : '') + _tlCurrent + '" onclick="toggleItem(\'' + item.id + '\',event)" style="' + _tlOpacity + 'animation-delay:' + delay + 'ms;--i:' + idx + '" id="item-' + item.id + '"><div class="check-circle"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="item-body"><div class="item-label">' + priorityDot + item.label + optionalBadge + '</div>' + (item.sub ? '<div class="item-sub">' + (item.sub.includes('·') ? item.sub.split('·')[0].trim() : item.sub) + '</div>' : '') + arabicHtml + '</div>' + audioBtn + infoBtn + '</div>';
      }
    });
    html += '</div>';
    if (section.links) {
      section.links.forEach(link => {
        html += '<a class="link-item" href="' + link.url + '" target="_blank" rel="noopener"><div class="link-icon-wrap">' + link.icon + '</div><div><div class="link-label">' + link.label + '</div><div class="link-sub">' + link.sub + '</div></div><div class="link-arrow">›</div></a>';
      });
    }
    html += '</div>';
  });
  const nextId = levelId + 1;
  const nextLvl = LEVELS.find(l => l.id === nextId);
  if (nextLvl && state._unlocked.includes(nextId)) {
    html += '<div style="padding:8px 0 24px;text-align:center;">'
      + '<button onclick="selectLevel(' + nextId + ')" style="background:transparent;border:1px solid rgba(52,217,98,0.3);color:var(--t3);font-size:12px;padding:8px 20px;border-radius:20px;cursor:pointer;">Passer au Niveau ' + nextId + ' →</button>'
      + '</div>';
  } else if (nextLvl && !state._unlocked.includes(nextId)) {
    html += '<div style="padding:8px 0 24px;text-align:center;">'
      + '<button onclick="selectLevel(' + nextId + ')" style="background:transparent;border:1px solid rgba(255,255,255,0.1);color:var(--t3);font-size:12px;padding:8px 20px;border-radius:20px;cursor:pointer;opacity:0.5;">Niveau ' + nextId + ' (non débloqué) →</button>'
      + '</div>';
  }
  content.innerHTML = html;
  level.sections.forEach(s => s.items.forEach(item => { if (item.type === 'counter') initCounterEl(item); }));
  // Appliquer l'état timeline sur le DOM après injection
  setTimeout(function() {
    const allItems = document.querySelectorAll('.item');
    allItems.forEach(function(el) {
      const itemId = el.id.replace('item-', '');
      if (state[itemId]) {
        el.style.opacity = '0.3';
        el.classList.remove('timeline-current');
        el.style.background = '';
        el.style.borderLeft = '';
        el.style.paddingLeft = '';
      }
    });
  }, 60);
  setTimeout(applyScrollScale, 50);
}
function renderPrayerItem(item, delay, extraClass, forceChecked) {
  const checked   = forceChecked !== undefined ? forceChecked : !!state[item.id];
  const onTime    = !!state[item.id + '_ontime'];
  const fridayCls = item.isFriday ? ' friday-item' : '';
  const arabicHtml = item.arabic ? '<div class="item-arabic">' + item.arabic + '</div>' : '';
  const toggle = '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;" onclick="togglePrayerOnTime(\'' + item.id + '\');event.stopPropagation()">'
    + '<div style="font-size:11px;color:' + (onTime ? 'var(--green)' : 'var(--t3)') + ';white-space:nowrap;">À l\'heure</div>'
    + '<div style="width:38px;height:22px;border-radius:11px;background:' + (onTime ? 'var(--green)' : 'rgba(255,255,255,0.1)') + ';border:1px solid ' + (onTime ? 'var(--green)' : 'rgba(255,255,255,0.15)') + ';display:flex;align-items:center;padding:2px;transition:background 0.2s;flex-shrink:0;">'
    + '<div style="width:18px;height:18px;border-radius:50%;background:' + (onTime ? '#fff' : 'rgba(255,255,255,0.4)') + ';margin-left:' + (onTime ? '16px' : '0') + ';transition:margin 0.2s;"></div>'
    + '</div></div>';
  const priorityDot = item.priority === 'fard' ? '<span class="priority-fard">&nbsp;</span>' : item.priority === 'sunnah' ? '<span class="priority-sunnah">&nbsp;</span>' : '';
  const _tlOpacity = checked ? 'opacity:0.3;' : '';
  return '<div class="item' + fridayCls + (checked ? ' checked' : '') + (extraClass || '') + '" onclick="toggleItem(\'' + item.id + '\',event)" style="' + _tlOpacity + 'animation-delay:' + delay + 'ms;--i:' + delay + '" id="item-' + item.id + '">'
    + '<div class="check-circle"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    + '<div class="item-body"><div class="item-label">' + priorityDot + item.label + '</div>'
    + (item.sub ? '<div class="item-sub">' + item.sub + '</div>' : '')
    + arabicHtml + '</div>'
    + toggle + '</div>';
}
function togglePrayerOnTime(id) {
  state[id + '_ontime'] = !state[id + '_ontime'];
  saveState();
  renderLevel(currentLevel);
}
function renderWirdSmartCard(item, delay) {
  const session = WIRD_DATA[item.session];
  const done  = session.items.filter(i => wirdState[i.id]).length;
  const total = session.items.length;
  const allDone = done === total;
  const pct = Math.round(done / total * 100);
  const isMatin = item.session === 'matin';
  const accentColor = isMatin ? '#D4AF37' : '#87A96B';
  const accentRgb   = isMatin ? '212,175,55' : '135,169,107';
  const moonIcon    = isMatin ? '🌅' : '🌙';
  const arabicLabel = isMatin ? 'وِرْدُ الصَّبَاحِ' : 'وِرْدُ الْمَسَاءِ';
  return `<div class="item${allDone?' checked':''}" id="item-${item.id}"
    style="animation-delay:${delay}ms;flex-direction:column;align-items:stretch;padding:0;cursor:pointer;
           border:1px solid rgba(${accentRgb},${allDone?'0.4':'0.18'});
           border-radius:16px;overflow:hidden;
           background:linear-gradient(135deg,rgba(${accentRgb},0.07) 0%,rgba(10,10,10,0.6) 100%);
           position:relative;"
    onclick="v2GoTo('wird');setTimeout(()=>{if(typeof renderWird==='function')renderWird();},60)">
    <div style="position:absolute;top:0;left:0;right:0;height:1px;
                background:linear-gradient(90deg,transparent,rgba(${accentRgb},0.5),transparent);"></div>
    <div style="display:flex;align-items:center;gap:12px;padding:14px 16px;">
      <div style="width:44px;height:44px;border-radius:12px;
                  background:rgba(${accentRgb},0.12);border:1px solid rgba(${accentRgb},0.25);
                  display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">
        ${allDone ? '✦' : moonIcon}
      </div>
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:center;gap:6px;margin-bottom:2px;">
          <span style="font-size:15px;font-weight:600;color:${allDone?accentColor:'var(--t1)'};
                       ${allDone?'text-decoration:line-through;text-decoration-color:rgba('+accentRgb+',0.3)':''}">
            ${item.label}
          </span>
          ${item.priority==='sunnah'?'<span style="font-size:9px;font-weight:700;letter-spacing:0.8px;color:'+accentColor+';background:rgba('+accentRgb+',0.12);border:1px solid rgba('+accentRgb+',0.25);border-radius:6px;padding:1px 6px;">SUNNAH</span>':''}
        </div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:16px;
                    color:rgba(${accentRgb},0.65);direction:rtl;text-align:left;">
          ${arabicLabel}
        </div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px;flex-shrink:0;">
        <div style="font-size:13px;font-weight:700;color:${accentColor};">${done}/${total}</div>
        <div style="font-family:'Cinzel',serif;font-size:9px;letter-spacing:0.15em;
                    color:rgba(${accentRgb},0.5);">
          ${allDone ? '✓ COMPLET' : 'OUVRIR ›'}
        </div>
      </div>
    </div>
    <div style="height:2px;background:rgba(${accentRgb},0.08);margin:0 16px 12px;">
      <div style="height:100%;width:${pct}%;background:linear-gradient(to right,rgba(${accentRgb},0.4),${accentColor});
                  border-radius:1px;transition:width 0.5s ease;"></div>
    </div>
  </div>`;
}

function renderWirdAccordion(item, delay) {
  const session = WIRD_DATA[item.session];
  const done  = session.items.filter(i => wirdState[i.id]).length;
  const total = session.items.length;
  const allDone = done === total;
  const pct = Math.round(done / total * 100);
  const isOpen = !!window['_wirdOpen_' + item.id];
  let inner = '';
  session.items.forEach(wi => {
    const checked = !!wirdState[wi.id];
    const audioSrcAcc = wi.audio ? JSON.stringify(wi.audio) : null;
    const audioBtn = wi.audio ? '<button class="btn-audio" ontouchstart="event.stopPropagation()" onclick="playAudioFromBtn(this,event)" data-audio="' + (audioSrcAcc ? audioSrcAcc.replace(/"/g,'&quot;') : '') + '" style="margin-left:4px;">🔊</button>' : '';
    inner += '<div class="item wird-inner-item' + (checked ? ' checked' : '') + '" style="border-top:1px solid var(--sep);border-radius:0;" onclick="toggleWirdItem(\'' + wi.id + '\');renderLevel(currentLevel);event.stopPropagation()">'
      + '<div class="check-circle" style="flex-shrink:0;"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
      + '<div class="item-body"><div class="item-label" style="color:var(--t1);">' + wi.label + '</div>'
      + (wi.sub ? '<div class="item-sub">' + wi.sub + '</div>' : '')
      + (wi.arabic ? '<div class="item-arabic">' + wi.arabic + '</div>' : '')
      + '</div>' + audioBtn + '</div>';
  });
  const progressBar = '<div style="padding:10px 16px;border-top:1px solid var(--sep);display:flex;align-items:center;gap:8px;">'
    + '<div style="height:3px;flex:1;background:var(--sep2);border-radius:2px;"><div style="height:100%;width:' + pct + '%;background:var(--green-grad);border-radius:2px;transition:width 0.3s;"></div></div>'
    + '<div style="font-size:12px;color:var(--green);font-weight:600;">' + done + '/' + total + '</div></div>';
  const tapHint = (!isOpen && done === 0) ? '<div style="font-size:11px;color:var(--green);background:var(--green-soft);border-radius:20px;padding:2px 10px;white-space:nowrap;">Appuie pour ouvrir</div>' : '';
  return '<div class="item' + (allDone ? ' checked' : '') + '" id="item-' + item.id + '" style="animation-delay:' + delay + 'ms;flex-direction:column;align-items:stretch;padding:0;cursor:default;border:1px solid ' + (isOpen ? 'rgba(52,217,98,0.25)' : 'var(--sep)') + ';overflow:hidden;background:var(--card);">'
    + '<div style="display:flex;align-items:center;gap:12px;padding:14px 14px;cursor:pointer;background:' + (isOpen ? 'rgba(52,217,98,0.05)' : 'transparent') + ';" onclick="window[\'_wirdOpen_\'+\'' + item.id + '\']=!' + isOpen + ';renderLevel(currentLevel)">'
    + '<div class="check-circle"' + (allDone ? ' style="background:var(--green-grad);border-color:var(--green);"' : '') + '><svg class="check-svg" style="' + (allDone ? 'opacity:1;transform:scale(1)' : '') + '" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    + '<div class="item-body"><div class="item-label">' + (item.priority === 'sunnah' ? '<span class="priority-sunnah">&nbsp;</span>' : '') + item.label + '</div><div class="item-sub">' + item.sub + '</div></div>'
    + '<div style="display:flex;align-items:center;gap:6px;flex-shrink:0;">'
    + tapHint
    + (done > 0 ? '<div style="font-size:11px;color:var(--green);background:var(--green-soft);padding:2px 8px;border-radius:20px;">' + done + '/' + total + '</div>' : '')
    + '<svg width="16" height="16" viewBox="0 0 14 14" style="transition:transform 0.2s;transform:' + (isOpen ? 'rotate(180deg)' : 'rotate(0deg)') + ';color:var(--green);flex-shrink:0;"><polyline points="3,5 7,9 11,5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>'
    + '</div></div>'
    + (isOpen ? inner + progressBar : '')
    + '</div>';
}
function renderCounter(item, delay) {
  const count = state[item.id] || 0;
  const done  = count >= item.target;
  const arabicHtml = item.arabic ? '<div class="item-arabic" style="' + (done ? 'opacity:0.25' : '') + '">' + item.arabic + '</div>' : '';
  const arabicEsc = (item.arabic || '').replace(/'/g, "\\'");
  const labelEsc  = item.label.replace(/'/g, "\\'");
  const fullscreenBtn = '<button class="btn-tasbih-fs" onclick="openTasbih(\'' + item.id + '\',' + item.target + ',\'' + labelEsc + '\',\'' + arabicEsc + '\')" title="Mode plein écran">⛶</button>';
  const audioBtn = item.audio ? '<button class="btn-audio" ontouchstart="event.stopPropagation()" onclick="playAudio(' + (Array.isArray(item.audio) ? JSON.stringify(item.audio).replace(/"/g,"'") : '\'' + item.audio + '\'') + ',this,event)" title="Écouter la récitation">🔊</button>' : '';
  return '<div class="item counter-item' + (done ? ' checked' : '') + '" style="animation-delay:' + delay + 'ms" id="item-' + item.id + '"><div class="counter-top"><div class="check-circle" id="cb-' + item.id + '" style="' + (done ? 'background:var(--green-grad);border-color:var(--green);box-shadow:0 0 0 4px var(--green-soft),0 0 16px rgba(52,217,98,0.25)' : '') + '"><svg class="check-svg" style="' + (done ? 'opacity:1;transform:scale(1)' : '') + '" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="item-body"><div class="item-label">' + item.label + '</div><div class="item-sub">' + item.sub + '</div>' + arabicHtml + '</div>' + audioBtn + fullscreenBtn + '</div><div class="counter-body"><button class="btn-cnt-reset" onclick="resetCounter(\'' + item.id + '\')">↺</button><div class="counter-display"><div class="counter-num" id="cnt-num-' + item.id + '">' + count + '</div><div class="counter-total">/ ' + item.target + '</div><div class="counter-bar-track"><div class="counter-bar-fill" id="cnt-bar-' + item.id + '" style="width:' + Math.min(count/item.target*100,100) + '%"></div></div></div><button class="btn-cnt" onclick="incrementCounter(\'' + item.id + '\',' + item.target + ')">+</button></div></div>';
}
function initCounterEl(item) {}
function incrementCounter(id, target) {
  const count = (state[id] || 0) + 1;
  if (count > target) return;
  state[id] = count;
  saveState();
  const numEl  = document.getElementById('cnt-num-' + id);
  const barEl  = document.getElementById('cnt-bar-' + id);
  const itemEl = document.getElementById('item-' + id);
  const cbEl   = document.getElementById('cb-' + id);
  if (numEl) numEl.textContent = count;
  if (barEl) barEl.style.width = Math.min(count/target*100,100) + '%';
  playCounterSound();
  if (count >= target) {
    itemEl && itemEl.classList.add('checked');
    if (cbEl) {
      cbEl.style.background = 'var(--green-grad)'; cbEl.style.borderColor = 'var(--green)';
      cbEl.style.boxShadow = '0 0 0 4px var(--green-soft), 0 0 16px rgba(52,217,98,0.25)';
      const svg = cbEl.querySelector('.check-svg');
      if (svg) { svg.style.opacity = '1'; svg.style.transform = 'scale(1)'; }
    }
    itemEl && itemEl.classList.add('celebrate');
    setTimeout(() => itemEl && itemEl.classList.remove('celebrate'), 400);
    if (navigator.vibrate) navigator.vibrate([20, 40, 80]);
    playCompleteSound();
    if (id === 'tasbih') { showToast('🌿 99 accompli ! Dis maintenant : لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ'); } else { showToast('🌿 Mashallah ! ' + target + ' fois accompli !'); }
    checkLevelCompletion(currentLevel);
  } else {
    if (navigator.vibrate) navigator.vibrate(8);
  }
  updateGlobalProgress();
  renderTabs();
  checkBadges();
}
function resetCounter(id) {
  state[id] = 0; saveState();
  renderLevel(currentLevel); updateGlobalProgress();
}
let _audioCtx = null;
function getAudioCtx() {
  if (!_audioCtx) {
    try { _audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
  }
  return _audioCtx;
}
function playCheckSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(520, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(780, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.13, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.22);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.22);
  } catch(e) {}
}
function playCounterSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(560, ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.09, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.14);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.14);
  } catch(e) {}
}
function playCompleteSound() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  try {
    const notes = [523, 659, 784, 1047];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.09;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      osc.start(t); osc.stop(t + 0.25);
    });
  } catch(e) {}
}
function spawnRipple(el, event) {
  const rect = el.getBoundingClientRect();
  const x = (event.touches ? event.touches[0].clientX : event.clientX) - rect.left;
  const y = (event.touches ? event.touches[0].clientY : event.clientY) - rect.top;
  const size = Math.max(rect.width, rect.height) * 0.8;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  ripple.style.cssText = 'width:' + size + 'px;height:' + size + 'px;left:' + (x - size/2) + 'px;top:' + (y - size/2) + 'px;';
  el.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove(), { once: true });
}
function toggleItem(id, event) {
  // Ignorer si le tap vient d'un bouton audio ou info
  if (event && event.target && (
    event.target.classList.contains('btn-audio') ||
    event.target.classList.contains('btn-info') ||
    event.target.classList.contains('btn-tasbih-fs') ||
    event.target.closest('.btn-audio') ||
    event.target.closest('.btn-info') ||
    event.target.closest('.btn-tasbih-fs')
  )) return;
  state[id] = !state[id];
  saveState();
  const el = document.getElementById('item-' + id);
  if (el) {
    if (event) spawnRipple(el, event);
    el.classList.toggle('checked', !!state[id]);
    if (state[id]) {
      el.classList.add('celebrate');
      setTimeout(() => el.classList.remove('celebrate'), 400);
      if (navigator.vibrate) navigator.vibrate([12, 8, 25]);
      playCheckSound();
      if (id === 'jumua') {
        if (!history.jumuahDays) history.jumuahDays = {};
        if (!history.jumuahDays[TODAY]) {
          history.jumuahDays[TODAY] = true;
          history.jumuahCount = (history.jumuahCount || 0) + 1;
          saveHistory();
          showToast('🕌 Jumuah accomplie — Barakallahu feek !');
        }
      }
    }
  }
  // Mettre à jour dynamiquement la timeline (items principaux uniquement)
  const _isMainItem = !id.includes('ontime') && !id.includes('mosquee');
  const currentItem = document.getElementById('item-' + id);
  if (_isMainItem && currentItem && state[id]) {
    currentItem.style.opacity = '0.3';
    currentItem.classList.remove('timeline-current');
    currentItem.style.background = '';
    currentItem.style.borderLeft = '';
    currentItem.style.paddingLeft = '';
    const allItems = Array.from(document.querySelectorAll('.item'));
    const curIdx = allItems.indexOf(currentItem);
    for (let i = curIdx + 1; i < allItems.length; i++) {
      const itemId = allItems[i].id.replace('item-', '');
      if (!state[itemId]) {
        allItems[i].classList.add('timeline-current');
        allItems[i].style.background = 'rgba(200,168,74,0.08)';
        allItems[i].style.borderLeft = '3px solid #C8A84A';
        allItems[i].style.paddingLeft = '13px';
        break;
      }
    }
  }
  checkLevelCompletion(currentLevel);
  updateGlobalProgress();
  renderTabs();
  checkBadges();
}
function confirmReset() {
  // Étape 1 : première confirmation
  if (!confirm('Remettre à zéro toutes les cases du jour ?')) return;
  // Étape 2 : deuxième confirmation
  if (!confirm('Es-tu sûr(e) ? Cette action est irréversible pour aujourd\'hui.')) return;
  const ul = state._unlocked;
  state = { _date: TODAY, _unlocked: ul, _mashaAllahShown: false, _sadaqa50: false, _sadaqa80: false, _sadaqa100: false };
  saveState();
  wirdState = {};
  saveWirdState();
  renderLevel(currentLevel); updateGlobalProgress(); renderTabs();
  showToast('Nouvelle journee — Bismillah 🌿');
}
let toastTimeout;
function showToast(msg) {
  if (!msg) return;
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2600);
}
function shareStreak() {
  const streakDisplay = history.streak + (getLevelProgress(1) >= 100 ? 1 : 0);
  const allLvlItems = LEVELS.filter(l => state._unlocked.includes(l.id)).flatMap(l => getLevelItems(l.id));
  const scoreJour = Math.round(getWeightedScore(allLvlItems, state));
  const canvas = document.createElement('canvas');
  canvas.width = 1200;
  canvas.height = 630;
  const ctx = canvas.getContext('2d');
  const grad = ctx.createLinearGradient(0, 0, 1200, 630);
  grad.addColorStop(0, '#041a0a');
  grad.addColorStop(0.5, '#082814');
  grad.addColorStop(1, '#041a0a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1200, 630);
  ctx.strokeStyle = 'rgba(52,217,98,0.06)';
  ctx.lineWidth = 1;
  for (let i = 0; i < 1200; i += 60) {
    ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 630); ctx.stroke();
  }
  for (let i = 0; i < 630; i += 60) {
    ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(1200, i); ctx.stroke();
  }
  ctx.beginPath();
  ctx.arc(600, 315, 260, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200,168,75,0.12)';
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(600, 315, 220, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200,168,75,0.08)';
  ctx.stroke();
  ctx.fillStyle = '#c8a84b';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.fillText('NIYYAH  ✦  PRATIQUE & ÉLÉVATION', 600, 110);
  ctx.strokeStyle = 'rgba(200,168,75,0.4)';
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(300, 130); ctx.lineTo(900, 130); ctx.stroke();
  ctx.fillStyle = streakDisplay >= 7 ? '#e8cc6a' : '#34d962';
  ctx.font = 'bold 140px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(streakDisplay, 600, 290);
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.font = '24px sans-serif';
  ctx.fillText('JOURS CONSÉCUTIFS', 600, 330);
  ctx.fillStyle = scoreJour >= 80 ? '#e8cc6a' : '#34d962';
  ctx.font = 'bold 48px sans-serif';
  ctx.fillText('Score du jour : ' + scoreJour + '/100', 600, 410);
  ctx.strokeStyle = 'rgba(200,168,75,0.4)';
  ctx.beginPath(); ctx.moveTo(300, 460); ctx.lineTo(900, 460); ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.7)';
  ctx.font = '22px sans-serif';
  ctx.fillText('Alhamdulillah 🌿  nabs881-sketch.github.io/niyyah-app/', 600, 500);
  ctx.fillStyle = 'rgba(200,168,75,0.6)';
  ctx.font = '18px sans-serif';
  ctx.fillText('فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ', 600, 545);
  canvas.toBlob(blob => {
    if (!blob) { _shareText(streakDisplay, scoreJour); return; }
    const file = new File([blob], 'niyyah-streak.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: 'Niyyah Daily ✦ — Jour ' + streakDisplay,
        text: 'Alhamdulillah — Jour ' + streakDisplay + ' de pratique avec Niyyah Daily 🌿',
        files: [file]
      }).catch(() => _shareText(streakDisplay, scoreJour));
    } else {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url; a.download = 'niyyah-streak.png'; a.click();
      URL.revokeObjectURL(url);
      showToast('Image téléchargée — partage-la sur WhatsApp 🌿');
    }
  }, 'image/png');
}
function _shareText(streak, score) {
  const text = '🌿 Jour ' + streak + ' de pratique avec Niyyah ✦\nScore du jour : ' + score + '/100 — Alhamdulillah !\nnabs881-sketch.github.io/niyyah-app/';
  if (navigator.share) navigator.share({ title: 'Niyyah Daily ✦', text });
  else navigator.clipboard && navigator.clipboard.writeText(text).then(() => showToast('Lien copié — colle sur WhatsApp !'));
}
let calYear = new Date().getFullYear();
function renderYearCalendar() {
  const el = document.getElementById('yearCalContent');
  if (!el) return;
  const todayDone = getLevelProgress(1) >= 100;
  const currentMedal = getMedalLevel();
  const MONTHS = ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
  const nowYear = new Date().getFullYear();
  const canNext = calYear < nowYear;
  let html = '<div class="year-nav"><button class="year-nav-btn" onclick="calYear--;renderYearCalendar()">&#8249;</button><div class="year-nav-title">' + calYear + '</div><button class="year-nav-btn" style="opacity:' + (canNext ? '1' : '0.3') + '" onclick="' + (canNext ? 'calYear++;renderYearCalendar()' : '') + '">&#8250;</button></div><div class="year-months">';
  for (let m = 0; m < 12; m++) {
    const daysInMonth = new Date(calYear, m+1, 0).getDate();
    html += '<div class="year-month"><div class="year-month-label">' + MONTHS[m] + '</div><div class="year-days">';
    for (let d = 1; d <= daysInMonth; d++) {
      const dStr = calYear + '-' + String(m+1).padStart(2,'0') + '-' + String(d).padStart(2,'0');
      const isToday  = dStr === TODAY;
      const isFuture = dStr > TODAY;
      let medal = null;
      if (isToday && todayDone) medal = currentMedal;
      else if (!isFuture && !isToday) medal = ((history.dayMedals && history.dayMedals[dStr])) || ((history.days && history.days[dStr]) ? 'bronze' : null);
      const medalCls = { bronze: 'yb', silver: 'ys', gold: 'yg' };
      let cls = 'year-day';
      if (isFuture) cls += ' fy';
      else if (medal) cls += ' ' + (medalCls[medal] || 'yb');
      if (isToday) cls += ' yt';
      html += '<div class="' + cls + '"></div>';
    }
    html += '</div></div>';
  }
  html += '</div><div class="year-legend"><div class="yl-item"><div class="yl-dot" style="background:var(--card2)"></div>Aucune</div><div class="yl-item"><div class="yl-dot" style="background:#d4914a"></div>Bronze</div><div class="yl-item"><div class="yl-dot" style="background:#b0c4ce"></div>Argent</div><div class="yl-item"><div class="yl-dot" style="background:var(--gold)"></div>Or</div></div>';
  el.innerHTML = html;
}
function getGraineSVG(count) {
  if (count >= 20) return '<svg width="140" height="140" viewBox="0 0 140 140" style="animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="65" y="50" width="10" height="70" rx="3" fill="#8B6914"/><ellipse cx="70" cy="45" rx="35" ry="28" fill="#4CAF50" opacity="0.85"/><ellipse cx="70" cy="38" rx="28" ry="22" fill="#66BB6A" opacity="0.7"/><circle cx="52" cy="40" r="5" fill="#C8A84A"/><circle cx="88" cy="40" r="5" fill="#C8A84A"/><circle cx="60" cy="30" r="4" fill="#C8A84A"/><circle cx="80" cy="30" r="4" fill="#C8A84A"/><circle cx="70" cy="50" r="5" fill="#C8A84A"/><circle cx="70" cy="25" r="4" fill="#C8A84A"/></svg>';
  if (count >= 10) return '<svg width="140" height="140" viewBox="0 0 140 140" style="animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="66" y="55" width="8" height="65" rx="3" fill="#8B6914"/><ellipse cx="70" cy="50" rx="32" ry="25" fill="#4CAF50" opacity="0.85"/><ellipse cx="70" cy="44" rx="24" ry="18" fill="#66BB6A" opacity="0.7"/></svg>';
  if (count >= 5) return '<svg width="140" height="140" viewBox="0 0 140 140" style="animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="68" y="60" width="4" height="60" rx="2" fill="#4CAF50"/><ellipse cx="58" cy="72" rx="12" ry="6" fill="#4CAF50" transform="rotate(-30 58 72)"/><ellipse cx="82" cy="82" rx="12" ry="6" fill="#4CAF50" transform="rotate(30 82 82)"/><ellipse cx="56" cy="92" rx="10" ry="5" fill="#66BB6A" transform="rotate(-25 56 92)"/><ellipse cx="84" cy="102" rx="10" ry="5" fill="#66BB6A" transform="rotate(25 84 102)"/></svg>';
  if (count >= 1) return '<svg width="140" height="140" viewBox="0 0 140 140" style="animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="68" y="80" width="4" height="40" rx="2" fill="#4CAF50"/><ellipse cx="60" cy="88" rx="10" ry="5" fill="#4CAF50" transform="rotate(-30 60 88)"/><ellipse cx="80" cy="98" rx="10" ry="5" fill="#4CAF50" transform="rotate(30 80 98)"/></svg>';
  return '<svg width="140" height="140" viewBox="0 0 140 140" style="animation:grainFloat 3s ease-in-out infinite;filter:drop-shadow(0 0 8px rgba(200,168,75,0.6));"><line x1="40" y1="103" x2="100" y2="103" stroke="#8B6914" stroke-width="2"/><ellipse cx="70" cy="95" rx="12" ry="8" fill="#C8A84A"/></svg>';
}
function renderProgression() {
  const el = document.getElementById('progContent');
  const todayDone = getLevelProgress(1) >= 100;
  const streakDisplay = history.streak + (todayDone ? 1 : 0);
  const bestDisplay   = Math.max(history.bestStreak, streakDisplay);
  const totalDisplay  = history.totalDays + (todayDone ? 1 : 0);
  const HADITHS_DB = {
    zero: [
      { text: "Dis : Ô Mes serviteurs qui avez commis des excès contre vous-mêmes, ne désespérez pas de la miséricorde d'Allah.", ref: "Coran 39:53" },
      { text: "Allah est plus heureux du repentir de Son serviteur que l'un de vous qui retrouve sa monture perdue dans le désert.", ref: "Bukhari 6309" },
      { text: "Celui qui se repent d'un péché est comme celui qui n'en a jamais commis.", ref: "Ibn Majah 4250" },
      { text: "Chaque fils d'Adam commet des erreurs, et les meilleurs de ceux qui commettent des erreurs sont ceux qui se repentent.", ref: "Tirmidhi 2499" },
      { text: "La porte du repentir est ouverte jusqu'à ce que le soleil se lève à l'Occident.", ref: "Muslim 2703" },
      { text: "Allah étend Sa main la nuit pour recevoir le repentir de celui qui a péché le jour.", ref: "Muslim 2759" },
      { text: "Bismillah. Chaque jour est une nouvelle page. Commence.", ref: "Sagesse islamique" },
      { text: "Ne sous-estime aucun acte de bonté, fût-ce le fait de rencontrer ton frère avec un visage souriant.", ref: "Muslim 2626" },
    ],
    debut: [
      { text: "Les actes ne valent que par les intentions, et chaque homme n'aura que ce qu'il a eu l'intention de faire.", ref: "Bukhari 1" },
      { text: "Le voyage de mille lieues commence par un premier pas.", ref: "Sagesse" },
      { text: "Allah n'impose à aucune âme une charge supérieure à sa capacité.", ref: "Coran 2:286" },
      { text: "Commence par Bismillah et Allah mettra la bénédiction dans ton acte.", ref: "Abu Dawud 4996" },
      { text: "Soyez constants dans vos actes, car Allah ne se lasse pas tant que vous ne vous lassez pas.", ref: "Bukhari 43" },
      { text: "La meilleure des actions est celle qui est faite régulièrement, même si elle est petite.", ref: "Bukhari 6464" },
      { text: "Tout acte qui ne commence pas par Bismillah est dépourvu de bénédiction.", ref: "Ibn Majah 1894" },
      { text: "Allah aime que lorsque l'un de vous accomplit un acte, il le fasse avec excellence.", ref: "Bayhaqi" },
      { text: "Prenez sur vous les actes que vous êtes capables de soutenir.", ref: "Bukhari 6099" },
      { text: "La foi augmente par l'obéissance et diminue par la désobéissance.", ref: "Bayhaqi" },
    ],
    constance: [
      { text: "L'acte le plus aimé d'Allah est celui qui est le plus régulier, même s'il est peu.", ref: "Bukhari 6464" },
      { text: "Soyez patients, car Allah est avec les patients.", ref: "Coran 8:46" },
      { text: "La victoire vient avec la patience, le soulagement vient avec la détresse.", ref: "Tirmidhi 3519" },
      { text: "Celui qui reste constant dans la prière, Allah lui ouvre une porte vers le Paradis.", ref: "Muslim 228" },
      { text: "Ne dis pas demain. Dis aujourd'hui. Car demain a ses propres soucis.", ref: "Sagesse islamique" },
      { text: "Trois jours — tu as posé les premières pierres. Continue.", ref: "Sagesse islamique" },
      { text: "Soyez réguliers dans vos actes d'adoration, car ce sont les petits actes constants qui construisent les grandes maisons au Paradis.", ref: "Muslim 783" },
      { text: "Nul ne se lève pour prier et n'accomplit sa prière comme il se doit, sans que ses péchés ne tombent comme les feuilles d'un arbre.", ref: "Ahmad" },
      { text: "La constance dans l'ibada est un signe que Allah t'a accordé Son amour.", ref: "Ibn al-Qayyim" },
      { text: "Si tu sens la douceur de la prière, sache qu'Allah t'a regardé.", ref: "Sagesse des savants" },
    ],
    semaine: [
      { text: "Une semaine complète. Allah voit chaque sujud, chaque dhikr, chaque intention.", ref: "Sagesse islamique" },
      { text: "Celui qui prie Fajr est sous la protection d'Allah toute la journée.", ref: "Muslim 657" },
      { text: "Les anges se relayent parmi vous la nuit et le jour, et ils se rassemblent à Fajr et Asr.", ref: "Bukhari 555" },
      { text: "Il n'est pas de jours plus aimés d'Allah pour y accomplir de bonnes œuvres que ces dix jours.", ref: "Bukhari 969" },
      { text: "Celui qui accomplit les cinq prières quotidiennes fidèlement, elles seront pour lui une lumière, une preuve et un salut.", ref: "Ahmad" },
      { text: "La prière est le pilier de la religion. Qui la tient debout a tenu debout la religion.", ref: "Bayhaqi" },
      { text: "MashaAllah. Sept jours de présence. Les anges témoignent.", ref: "Sagesse islamique" },
      { text: "Celui qui préserve la prière, elle sera pour lui lumière, preuve et salut au Jour du Jugement.", ref: "Ahmad 6576" },
      { text: "La différence entre nous et eux c'est la prière. Celui qui l'abandonne a mécru.", ref: "Tirmidhi 2621" },
      { text: "Priez comme vous m'avez vu prier.", ref: "Bukhari 631" },
    ],
    perseverance: [
      { text: "Certes, avec la difficulté vient la facilité.", ref: "Coran 94:5" },
      { text: "Allah est avec ceux qui sont patients.", ref: "Coran 2:153" },
      { text: "Deux semaines. Tu n'es plus quelqu'un qui essaie. Tu es quelqu'un qui pratique.", ref: "Sagesse islamique" },
      { text: "Celui qui cherche Allah Le trouve. Celui qui frappe à Sa porte, Elle s'ouvre.", ref: "Sagesse soufie" },
      { text: "La foi est de savoir qu'Allah voit chaque acte, même invisible aux hommes.", ref: "Bukhari 50" },
      { text: "Nous avons créé l'homme dans la peine.", ref: "Coran 90:4" },
      { text: "Aucune fatigue, maladie, souci, tristesse, tort ou angoisse n'atteint le croyant — même une épine qui le pique — sans qu'Allah n'efface par là ses péchés.", ref: "Bukhari 5641" },
      { text: "Les épreuves ne cessent d'atteindre le croyant jusqu'à ce qu'il rencontre Allah sans péché.", ref: "Tirmidhi 2399" },
      { text: "Qui supporte avec foi les décrets d'Allah, Allah élève son rang.", ref: "Muslim 918" },
      { text: "La véritable richesse n'est pas l'abondance des biens, mais la richesse de l'âme.", ref: "Bukhari 6446" },
      { text: "Heureux le croyant : toute sa situation est bonne pour lui.", ref: "Muslim 2999" },
    ],
    excellence: [
      { text: "Un mois. SubhanAllah. Tu es devenu quelqu'un d'autre. Quelqu'un de meilleur.", ref: "Sagesse islamique" },
      { text: "Les meilleurs d'entre vous sont ceux qui ont le meilleur caractère.", ref: "Bukhari 3559" },
      { text: "Je n'ai été envoyé que pour parfaire les nobles mœurs.", ref: "Ahmad 8952" },
      { text: "L'homme atteint par son bon caractère le rang de celui qui jeûne et prie toute la nuit.", ref: "Abu Dawud 4798" },
      { text: "Allah est beau et Il aime la beauté.", ref: "Muslim 91" },
      { text: "Le meilleur des musulmans est celui dont les musulmans sont à l'abri de sa langue et de sa main.", ref: "Bukhari 10" },
      { text: "Craignez Allah où que vous soyez, et faites suivre la mauvaise action d'une bonne qui l'effacera.", ref: "Tirmidhi 1987" },
      { text: "Qui se rapproche de Moi d'un empan, Je Me rapproche de lui d'une coudée.", ref: "Bukhari 7405" },
      { text: "Les bien-aimés d'Allah sont ceux qui, quand on les voit, on se souvient d'Allah.", ref: "Ibn Majah 3989" },
      { text: "La taqwa est ici — et il indiquait vers sa poitrine.", ref: "Muslim 2564" },
      { text: "Persévère. Le Paradis est entouré d'épreuves.", ref: "Muslim 2822" },
      { text: "Allahu Akbar. Trente jours ou plus. Tu es dans les rangs de ceux qui persévèrent.", ref: "Sagesse islamique" },
    ]
  };
  function getHadith(streak) {
    let pool;
    if (streak === 0)       pool = HADITHS_DB.zero;
    else if (streak <= 3)   pool = HADITHS_DB.debut;
    else if (streak <= 6)   pool = HADITHS_DB.constance;
    else if (streak <= 13)  pool = HADITHS_DB.semaine;
    else if (streak <= 29)  pool = HADITHS_DB.perseverance;
    else                    pool = HADITHS_DB.excellence;
    const dayOfYear = Math.floor(Date.now() / 86400000);
    return pool[dayOfYear % pool.length];
  }
  const hadith = getHadith(streakDisplay);
  const today = new Date();
  let heatmapHTML = '';
  for (let i = 29; i >= 0; i--) {
    const d = new Date(today); d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    const isToday = dStr === TODAY;
    const done = isToday ? todayDone : !!(history.days && history.days[dStr]);
    const medal = isToday ? (todayDone ? getMedalLevel() : null) : ((history.dayMedals && history.dayMedals[dStr]) || (done ? 'bronze' : null));
    let color = 'rgba(255,255,255,0.06)';
    if (medal === 'gold')   color = 'linear-gradient(135deg,#c8a84b,#e8cc6a)';
    else if (medal === 'silver') color = 'linear-gradient(135deg,#8ab4c8,#b8d4e8)';
    else if (done)          color = 'var(--green)';
    heatmapHTML += '<div style="width:8px;height:8px;border-radius:2px;background:' + color + ';' + (isToday ? 'box-shadow:0 0 6px rgba(52,217,98,0.6);' : '') + '" title="' + dStr + '"></div>';
  }
  let badgesHTML = '';
  BADGES.forEach(badge => {
    const unlocked = history.unlockedBadges.includes(badge.id);
    badgesHTML += '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;padding:12px 8px;background:' + (unlocked ? (badge.gold ? 'rgba(200,168,75,0.1)' : 'rgba(52,217,98,0.08)') : 'rgba(255,255,255,0.03)') + ';border:1px solid ' + (unlocked ? (badge.gold ? 'rgba(200,168,75,0.3)' : 'rgba(52,217,98,0.2)') : 'rgba(255,255,255,0.06)') + ';border-radius:12px;opacity:' + (unlocked ? '1' : '0.4') + ';">'
      + '<div style="font-size:24px;">' + badge.emoji + '</div>'
      + '<div style="font-size:10px;font-weight:700;color:' + (unlocked ? (badge.gold ? '#c8a84b' : 'var(--green)') : 'var(--t3)') + ';text-align:center;letter-spacing:0.3px;">' + badge.name + '</div>'
      + '</div>';
  });
  
  // === HERO JOURNÉE (fusion avec ancien Bilan) ===
  const allItemsP = LEVELS.flatMap(l => l.sections.flatMap(s => s.items));
  const totalDoneP = allItemsP.filter(item => { try { return isItemDone(item, state); } catch(e) { return item.type==='counter'?(state[item.id]||0)>=item.target:!!state[item.id]; } }).reduce((sum,i)=>{ try{return sum+getWeight(i.id);}catch(e){return sum+1;} },0);
  const totalAllP  = allItemsP.reduce((sum,i)=>{ try{return sum+getWeight(i.id);}catch(e){return sum+1;} },0);
  const globalPctP = totalAllP>0 ? Math.round(totalDoneP/totalAllP*100) : 0;
  const medalP = getMedalLevel();
  const emojiMapP = {none:'🌱',bronze:'🥉',silver:'🥈',gold:'🥇'};
  const msgMapP   = {none:'Continue, inch\'Allah !',bronze:'Mashallah !',silver:'SubhanAllah !',gold:'Allahu Akbar !'};
  const subMapP   = {none:'Chaque acte compte',bronze:'Les fondations sont posées',silver:'Dhikr, prière, constance',gold:'Journée parfaite accomplie'};
  const rP=36, circP=2*Math.PI*rP, dashP=(globalPctP/100)*circP;
  const cP = medalP==='gold'?'var(--gold)':medalP==='silver'?'var(--silver)':'var(--green)';
  const ringP = '<div style="width:88px;height:88px;position:relative;margin:0 auto 12px;"><svg width="88" height="88" viewBox="0 0 88 88" style="transform:rotate(-90deg)"><circle cx="44" cy="44" r="36" fill="none" stroke="var(--sep2)" stroke-width="5"/><circle cx="44" cy="44" r="36" fill="none" stroke="'+cP+'" stroke-width="5" stroke-linecap="round" stroke-dasharray="'+circP.toFixed(1)+'" stroke-dashoffset="'+(circP-dashP).toFixed(1)+'" style="transition:stroke-dashoffset 0.8s cubic-bezier(0.34,1.56,0.64,1)"/></svg><div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:var(--serif);font-size:20px;color:var(--t1);">'+globalPctP+'%</div></div>';
  let lvlRowsP='';
  LEVELS.forEach((lvl,i)=>{
    const pct=Math.round(getLevelProgress(lvl.id)), done=pct>=100, unlocked=state._unlocked.includes(lvl.id);
    var pctLabel = pct===0 ? 'Commence !' : pct>=100 ? 'Accompli ✦' : 'En cours ✦';
    var lockSvg = '<svg width="14" height="16" viewBox="0 0 14 16" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;margin-right:4px;"><rect x="1" y="7" width="12" height="9" rx="2" stroke="#C8A84A" stroke-width="1.5"/><path d="M4 7V5a3 3 0 0 1 6 0v2" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"/></svg>';
    lvlRowsP+='<div style="background:var(--card);border-radius:12px;padding:10px 14px;display:flex;align-items:center;gap:10px;'+(unlocked?'':'opacity:0.4')+';margin-bottom:5px;">'
      +'<div style="flex-shrink:0;">'+getMoonSVG(unlocked?pct:0)+'</div>'
      +'<div style="flex:1"><div style="font-size:13px;color:var(--t1);margin-bottom:3px;">'+lvl.title+(done?' ✓':'')+'</div>'
      +'<div>'+(!unlocked?lockSvg+'<span style="color:#C8A84A;font-size:11px;opacity:0.7;">Disponible au niveau supérieur ✦</span>':'<span style="font-size:11px;color:var(--t3);">'+pctLabel+'</span>')+'</div></div></div>';
  });
  // === GRAPHIQUE 7 JOURS BILANS ===
  const bilansData = JSON.parse(localStorage.getItem('niyyah_bilans') || '{}');
  const bilanColors = { distraction: '#6b7280', effort: '#34d962', sincerite: '#ffd60a' };
  const bilanEmojis = { distraction: '😶', effort: '🌤', sincerite: '☀️' };
  const bilanLabels = { distraction: 'Distrait', effort: 'Efforts', sincerite: 'Sincère' };
  let bilanCells = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    const choix = bilansData[ds];
    const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0,3);
    if (choix) {
      bilanCells += '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">'
        + '<div style="width:36px;height:36px;border-radius:10px;background:' + bilanColors[choix] + '22;border:1px solid ' + bilanColors[choix] + '55;display:flex;align-items:center;justify-content:center;font-size:18px;">' + bilanEmojis[choix] + '</div>'
        + '<div style="font-size:8px;color:var(--t3);text-transform:uppercase;letter-spacing:0.5px;">' + dayName + '</div>'
        + '</div>';
    } else {
      bilanCells += '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">'
        + '<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--t3);">—</div>'
        + '<div style="font-size:8px;color:var(--t3);text-transform:uppercase;letter-spacing:0.5px;">' + dayName + '</div>'
        + '</div>';
    }
  }
  const hasBilans = Object.keys(bilansData).length > 0;
  const bilanHTML = hasBilans ? '<div style="margin:0 16px 24px;"><div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">Bilan des 7 derniers soirs</div><div style="display:flex;gap:6px;justify-content:space-between;padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;">' + bilanCells + '</div><div style="display:flex;gap:14px;margin-top:8px;"><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">😶</span><span style="font-size:10px;color:var(--t3);">Distrait</span></div><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">🌤</span><span style="font-size:10px;color:var(--t3);">Efforts</span></div><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">☀️</span><span style="font-size:10px;color:var(--t3);">Sincère</span></div></div></div>' : '';

  const heroSectionP = '<div style="background:linear-gradient(135deg,rgba(48,209,88,0.08),rgba(255,214,10,0.04));border:1px solid rgba(48,209,88,0.15);border-radius:var(--r-xl);padding:20px 16px;text-align:center;margin-bottom:10px;position:relative;overflow:hidden;"><div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--green),transparent);"></div>'+ringP+'<div style="font-family:var(--serif);font-size:20px;color:var(--t1);margin-bottom:4px;">'+msgMapP[medalP]+'</div><div style="font-size:12px;color:var(--t2);margin-bottom:14px;">'+emojiMapP[medalP]+' '+subMapP[medalP]+'</div>'+lvlRowsP+'<div style="display:flex;flex-direction:column;gap:8px;margin-top:10px;"><button style="width:100%;padding:13px;border-radius:13px;border:none;background:var(--green-grad);color:#000;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--serif);" onclick="switchView(\'checklist\')">Commencer ma journée</button><button style="width:100%;padding:11px;border-radius:13px;border:none;background:#C8A84A;color:#2C2E32;font-size:14px;font-weight:600;cursor:pointer;font-family:var(--sans);" onclick="openBilanSoir()">🌙 Bilan du soir</button></div></div>';

  el.innerHTML = `
    <div style="padding:0 0 40px;">${heroSectionP}<!-- STREAK HERO --><div style="text-align:center;padding:36px 20px 28px;position:relative;"><div style="font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">Série en cours</div><div style="font-size:80px;font-weight:900;line-height:1;background:${streakDisplay >= 7 ? 'linear-gradient(135deg,#c8a84b,#e8cc6a)' : 'linear-gradient(135deg,var(--green),#7effa0)'};-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-3px;">${streakDisplay}</div><div style="font-size:13px;color:var(--t3);margin-top:6px;letter-spacing:1px;">JOURS CONSÉCUTIFS</div><div style="display:flex;justify-content:center;gap:24px;margin-top:16px;"><div style="text-align:center;"><div style="font-size:18px;font-weight:700;color:var(--t1);">${bestDisplay}</div><div style="font-size:12px;color:var(--t3);letter-spacing:0.8px;text-transform:uppercase;">Meilleur</div></div><div style="width:1px;background:rgba(255,255,255,0.1);"></div><div style="text-align:center;"><div style="font-size:18px;font-weight:700;color:var(--t1);">${totalDisplay}</div><div style="font-size:12px;color:var(--t3);letter-spacing:0.8px;text-transform:uppercase;">Total jours</div></div></div></div><!-- HADITH CONTEXTUEL --><div style="margin:0 16px 24px;padding:20px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.2);border-radius:16px;position:relative;overflow:hidden;"><div style="position:absolute;top:-10px;right:12px;font-size:48px;opacity:0.07;font-family:serif;">"</div><div style="font-size:14px;line-height:1.7;color:var(--t1);font-style:italic;margin-bottom:10px;">${hadith.text}</div><div style="font-size:11px;color:#c8a84b;font-weight:600;letter-spacing:0.5px;">— ${hadith.ref}</div></div><!-- GRAINE DE LUMIÈRE --><div style="margin:0 16px 24px;background:linear-gradient(135deg,rgba(200,168,75,0.08),rgba(200,168,75,0.03));border:1px solid rgba(200,168,75,0.25);border-radius:20px;padding:28px;text-align:center;"><div style="font-family:'Cinzel',serif;font-size:10px;letter-spacing:3px;color:#C8A84A;text-transform:uppercase;margin-bottom:12px;">Graine de Lumière</div><div style="font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:#B0A080;margin-bottom:12px;">La graine attend la lumière</div><div style="margin:0 auto 12px;">${getGraineSVG((function(){try{return JSON.parse(localStorage.getItem('niyyah_defi_v2')||'{}').historique||[];}catch(e){return[];}})().length)}</div><div style="font-size:11px;color:#B0A080;margin-bottom:10px;">${(function(){try{return JSON.parse(localStorage.getItem('niyyah_defi_v2')||'{}').historique||[];}catch(e){return[];}})().length} défis accomplis</div><div style="font-family:'Cormorant Garamond',serif;font-size:12px;font-style:italic;color:#C8A84A;opacity:0.7;line-height:1.6;">Avez-vous vu ce que vous cultivez ? — Al-Waqi'a 63</div></div><!-- HEATMAP 30 JOURS --><div style="margin:0 16px 24px;"><div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">30 derniers jours</div><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;">
          ${heatmapHTML}
        </div><div style="display:flex;gap:12px;margin-top:10px;align-items:center;"><div style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:var(--green);"></div><span style="font-size:10px;color:var(--t3);">Présent</span></div><div style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:linear-gradient(135deg,#c8a84b,#e8cc6a);"></div><span style="font-size:10px;color:var(--t3);">Journée or</span></div><div style="display:flex;align-items:center;gap:4px;"><div style="width:8px;height:8px;border-radius:2px;background:rgba(255,255,255,0.06);"></div><span style="font-size:10px;color:var(--t3);">Absent</span></div></div></div><!-- BILAN 7 JOURS -->${bilanHTML}<!-- BADGES (secondaire) --><div style="margin:0 16px;"><div style="font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">Récompenses</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;">
          ${badgesHTML}
        </div></div>

      </div>
  `;
}
function openInfoSheet(label, arabic, phonetic, translation, event) {
  if (event) event.stopPropagation();
  // Support data-* attributes (évite les problèmes d'échappement inline)
  if (event && event.currentTarget && event.currentTarget.dataset) {
    const d = event.currentTarget.dataset;
    label = d.label || label;
    arabic = d.arabic || arabic;
    phonetic = d.phonetic || phonetic;
    translation = d.translation || translation;
  }
  document.getElementById('infoLabel').textContent = label || '';
  document.getElementById('infoArabic').textContent = arabic || '';
  document.getElementById('infoPhonetic').textContent = phonetic || '';
  document.getElementById('infoTranslation').textContent = translation || '';
  document.getElementById('infoSheet').classList.add('show');
  document.getElementById('infoOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeInfoSheet() {
  document.getElementById('infoSheet').classList.remove('show');
  document.getElementById('infoOverlay').classList.remove('show');
  document.body.style.overflow = '';
}

// ── AUDIO AL-KAHF (vendredi) ──────────────────────────────────────────────
const KAHF_URLS = ['https://everyayah.com/data/Alafasy_128kbps/018001.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018002.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018003.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018004.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018005.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018006.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018007.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018008.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018009.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018010.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018011.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018012.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018013.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018014.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018015.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018016.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018017.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018018.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018019.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018020.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018021.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018022.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018023.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018024.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018025.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018026.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018027.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018028.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018029.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018030.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018031.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018032.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018033.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018034.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018035.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018036.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018037.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018038.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018039.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018040.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018041.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018042.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018043.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018044.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018045.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018046.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018047.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018048.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018049.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018050.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018051.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018052.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018053.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018054.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018055.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018056.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018057.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018058.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018059.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018060.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018061.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018062.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018063.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018064.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018065.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018066.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018067.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018068.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018069.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018070.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018071.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018072.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018073.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018074.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018075.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018076.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018077.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018078.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018079.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018080.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018081.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018082.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018083.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018084.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018085.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018086.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018087.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018088.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018089.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018090.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018091.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018092.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018093.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018094.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018095.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018096.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018097.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018098.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018099.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018100.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018101.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018102.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018103.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018104.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018105.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018106.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018107.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018108.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018109.mp3', 'https://everyayah.com/data/Alafasy_128kbps/018110.mp3'];
let _kahfAudio = null;
let _kahfIdx   = 0;
let _kahfPlaying = false;

function toggleKahfAudio(btn, event) {
  if (event) event.stopPropagation();
  // Arrêter tout autre audio en cours
  if (_currentAudio && _currentAudio !== _kahfAudio) {
    _currentAudio.pause(); _currentAudio = null;
  }
  const iconEl  = document.getElementById('kahfPlayIcon');
  const labelEl = document.getElementById('kahfPlayLabel');
  if (_kahfPlaying && _kahfAudio) {
    _kahfAudio.pause();
    _kahfPlaying = false;
    if (iconEl)  iconEl.textContent  = '🔊';
    if (labelEl) labelEl.textContent = 'Écouter Al-Kahf';
    btn.classList.remove('playing');
    return;
  }
  if (_kahfAudio && !_kahfAudio.ended) {
    _kahfAudio.play();
    _kahfPlaying = true;
    if (iconEl)  iconEl.textContent  = '⏸';
    if (labelEl) labelEl.textContent = 'En cours — verset ' + (_kahfIdx + 1) + '/110';
    btn.classList.add('playing');
    return;
  }
  // Démarrer depuis le début
  _kahfIdx = 0;
  _kahfPlaying = true;
  btn.classList.add('playing');
  if (iconEl)  iconEl.textContent  = '⏸';
  if (labelEl) labelEl.textContent = 'Verset 1/110…';
  function playNextKahf() {
    if (_kahfIdx >= KAHF_URLS.length || !_kahfPlaying) {
      _kahfPlaying = false;
      if (iconEl)  iconEl.textContent  = '✓';
      if (labelEl) labelEl.textContent = 'Al-Kahf terminée ✦';
      btn.classList.remove('playing');
      return;
    }
    const a = new Audio(KAHF_URLS[_kahfIdx]);
    _kahfAudio = a;
    _currentAudio = a;
    a.play().catch(() => {});
    a.onended = function() {
      _kahfIdx++;
      if (labelEl) labelEl.textContent = 'Verset ' + Math.min(_kahfIdx + 1, 110) + '/110…';
      playNextKahf();
    };
    a.onerror = function() {
      _kahfIdx++;
      playNextKahf();
    };
  }
  playNextKahf();
}
// ─────────────────────────────────────────────────────────────────────────────
let _currentAudio = null;
let _currentBtn   = null;
function playAudioFromBtn(btn, event) {
  if (event) event.stopPropagation();
  const raw = btn.getAttribute('data-audio');
  if (!raw) return;
  let urlOrArr;
  try {
    // getAttribute retourne le texte décodé, JSON.parse doit recevoir du JSON valide
    urlOrArr = JSON.parse(raw);
  } catch(e) {
    urlOrArr = raw;
  }
  playAudio(urlOrArr, btn, null);
}
function playAudio(urlOrArr, btn, event) {
  if (event) event.stopPropagation();
  if (typeof urlOrArr === 'string' && urlOrArr.startsWith('sc:')) {
    const trackId = urlOrArr.replace('sc:', '');
    const scUrl = trackId.startsWith('http') ? trackId : 'https://api.soundcloud.com/tracks/' + trackId;
    openSoundCloudPlayer(scUrl, btn);
    return;
  }
  if (_currentAudio && _currentBtn === btn) {
    _currentAudio.pause();
    _currentAudio = null;
    btn.textContent = '🔊';
    btn.classList.remove('playing');
    _currentBtn = null;
    return;
  }
  if (_currentAudio) {
    _currentAudio.pause();
    if (_currentBtn) { _currentBtn.textContent = '🔊'; _currentBtn.classList.remove('playing'); }
  }
  const urls = Array.isArray(urlOrArr) ? urlOrArr : [urlOrArr];
  let idx = 0;
  function playNext() {
    if (idx >= urls.length) {
      btn.textContent = '🔊';
      btn.classList.remove('playing');
      _currentAudio = null;
      _currentBtn   = null;
      return;
    }
    const audio = new Audio();
    _currentAudio = audio;
    _currentBtn   = btn;
    audio.onerror = function() { idx++; playNext(); };
    audio.onended = function() { idx++; playNext(); };
    // Preload next verse for gapless playback
    if (idx + 1 < urls.length) {
      var _preload = new Audio();
      _preload.src = urls[idx + 1];
      _preload.preload = 'auto';
    }
    audio.src = urls[idx];
    audio.load();
    audio.play().then(function() {
      btn.textContent = '⏹';
      btn.classList.add('playing');
    }).catch(function() {
      idx++;
      playNext();
    });
  }
  playNext();
}
function openSoundCloudPlayer(trackUrl, btn) {
  const existing = document.getElementById('scPlayerOverlay');
  if (existing) { existing.remove(); if (_currentBtn) { _currentBtn.textContent = '🔊'; _currentBtn.classList.remove('playing'); } }
  if (_currentBtn === btn) { _currentBtn = null; return; }
  btn.textContent = '⏹';
  btn.classList.add('playing');
  _currentBtn = btn;
  const overlay = document.createElement('div');
  overlay.id = 'scPlayerOverlay';
  overlay.style.cssText = 'position:fixed;bottom:80px;left:16px;right:16px;z-index:998;background:var(--card);border-radius:16px;border:1px solid var(--sep2);box-shadow:0 8px 32px rgba(0,0,0,0.5);overflow:hidden;';
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✕';
  closeBtn.style.cssText = 'position:absolute;top:8px;right:8px;z-index:2;background:var(--card2);border:none;color:var(--t2);width:24px;height:24px;border-radius:50%;font-size:12px;cursor:pointer;';
  closeBtn.onclick = () => { overlay.remove(); btn.textContent = '🔊'; btn.classList.remove('playing'); _currentBtn = null; };
  const encodedUrl = encodeURIComponent(trackUrl);
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '120';
  iframe.scrolling = 'no';
  iframe.frameBorder = 'no';
  iframe.allow = 'autoplay';
  iframe.src = 'https://w.soundcloud.com/player/?url=' + encodedUrl + '&color=%2334d962&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false';
  overlay.appendChild(closeBtn);
  overlay.appendChild(iframe);
  document.body.appendChild(overlay);
}
let _tasbihId = null;
let _tasbihTarget = 99;
function openTasbih(id, target, label, arabic) {
  _tasbihId = id;
  _tasbihTarget = target;
  const count = state[id] || 0;
  document.getElementById('tasbihLabel').textContent = label;
  document.getElementById('tasbihArabic').textContent = arabic || '';
  document.getElementById('tasbihTotalLabel').textContent = '/ ' + target;
  document.getElementById('tasbihBigNum').textContent = count;
  document.getElementById('tasbihBarFill').style.width = Math.min(count / target * 100, 100) + '%';
  const overlay = document.getElementById('tasbihOverlay');
  overlay.classList.remove('done');
  if (count >= target) overlay.classList.add('done');
  overlay.classList.add('show');
  const zone = document.getElementById('tasbihTapZone');
  zone.onclick = tapTasbih;
  document.body.style.overflow = 'hidden';
}
function tapTasbih() {
  if (!_tasbihId) return;
  const count = (state[_tasbihId] || 0) + 1;
  if (count > _tasbihTarget) return;
  state[_tasbihId] = count;
  saveState();
  const numEl = document.getElementById('tasbihBigNum');
  numEl.textContent = count;
  numEl.classList.remove('pop');
  void numEl.offsetWidth; 
  numEl.classList.add('pop');
  setTimeout(() => numEl.classList.remove('pop'), 150);
  document.getElementById('tasbihBarFill').style.width = Math.min(count / _tasbihTarget * 100, 100) + '%';
  playCounterSound();
  if (navigator.vibrate) navigator.vibrate(8);
  if (count >= _tasbihTarget) {
    document.getElementById('tasbihOverlay').classList.add('done');
    if (navigator.vibrate) navigator.vibrate([20, 40, 80]);
    playCompleteSound();
    if (_tasbihId === 'tasbih') { showToast('🌿 99 accompli ! Dis maintenant : لَا إِلَٰهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ'); } else { showToast('🌿 Mashallah ! ' + _tasbihTarget + ' fois accompli !'); }
    const barEl = document.getElementById('cnt-bar-' + _tasbihId);
    const numEl2 = document.getElementById('cnt-num-' + _tasbihId);
    if (barEl) barEl.style.width = '100%';
    if (numEl2) numEl2.textContent = count;
    checkLevelCompletion(currentLevel);
    updateGlobalProgress();
    renderTabs();
    checkBadges();
  }
  const barEl = document.getElementById('cnt-bar-' + _tasbihId);
  const numEl2 = document.getElementById('cnt-num-' + _tasbihId);
  if (barEl) barEl.style.width = Math.min(count / _tasbihTarget * 100, 100) + '%';
  if (numEl2) numEl2.textContent = count;
  updateGlobalProgress();
}
function resetTasbihOverlay() {
  if (!_tasbihId) return;
  state[_tasbihId] = 0;
  saveState();
  document.getElementById('tasbihBigNum').textContent = '0';
  document.getElementById('tasbihBarFill').style.width = '0%';
  document.getElementById('tasbihOverlay').classList.remove('done');
  renderLevel(currentLevel);
  updateGlobalProgress();
}
function closeTasbih() {
  document.getElementById('tasbihOverlay').classList.remove('show');
  document.body.style.overflow = '';
  renderLevel(currentLevel);
}
let _prayerTimes = null;
let _prayerCity  = localStorage.getItem('niyyah_city') || '';
let _prayerCountry = localStorage.getItem('niyyah_country') || 'France';
let _prayerLoading = false;
let _prayerError   = false;
let _showCityInput = !_prayerCity;
// Cache v2 — méthode MWL (method=3). Clé changée pour invalider l'ancien cache method=12
const _cachedPrayerDate = localStorage.getItem('niyyah_prayer_date_v2');
const _cachedPrayerData = localStorage.getItem('niyyah_prayer_cache_v2');
if (_cachedPrayerDate === TODAY && _cachedPrayerData) {
  try { _prayerTimes = JSON.parse(_cachedPrayerData); } catch(e) {}
  if (_prayerTimes) setTimeout(scheduleFajrNotification, 1000);
}
const PRAYER_NAMES = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const PRAYER_LABELS = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
function renderPrayerTimesCard() {
  if (_showCityInput) {
    return '<div class="prayer-times-card">' +
      '<div class="prayer-times-header"><div class="prayer-times-title">🕌 Horaires du jour</div></div>' +
      '<div style="font-size:12px;color:var(--t3);margin-bottom:8px;">Entre ta ville pour voir les horaires de prière</div>' +
      '<div class="city-input-wrap">' +
        '<input class="city-input" id="cityInput" type="text" placeholder="Ex: Paris, Casablanca, Bruxelles..." value="' + (_prayerCity||'') + '" onkeydown="if(event.key===\'Enter\')saveCityAndLoad()">' +
        '<button class="city-input-btn" onclick="saveCityAndLoad()">OK</button>' +
      '</div>' +
    '</div>';
  }
  if (_prayerLoading) {
    return '<div class="prayer-times-card"><div class="prayer-times-loading">Chargement des horaires... 🕌</div></div>';
  }
  if (_prayerError) {
    return '<div class="prayer-times-card">' +
      '<div class="prayer-times-header"><div class="prayer-times-title">🕌 Horaires</div>' +
        '<div class="prayer-times-city" onclick="showCityInput()">✏️ ' + (_prayerCity||'Ville') + '</div>' +
      '</div>' +
      '<div style="font-size:12px;color:var(--t3);text-align:center;padding:8px;">Erreur — vérifie ta connexion ou la ville</div>' +
      '<div class="city-input-wrap">' +
        '<input class="city-input" id="cityInput" type="text" placeholder="Ville..." value="' + (_prayerCity||'') + '" onkeydown="if(event.key===\'Enter\')saveCityAndLoad()">' +
        '<button class="city-input-btn" onclick="saveCityAndLoad()">Réessayer</button>' +
      '</div>' +
    '</div>';
  }
  if (!_prayerTimes) return '<div class="prayer-times-card">' +
    '<div class="prayer-times-header"><div class="prayer-times-title">🕌 Horaires du jour</div>' +
    '<div class="prayer-times-city" onclick="showCityInput()">✏️ ' + (_prayerCity||'Ville') + '</div></div>' +
    '<div style="font-size:12px;color:var(--t3);margin-bottom:10px;">Les horaires n\'ont pas pu être chargés.</div>' +
    '<button class="city-input-btn" style="width:100%;padding:10px;" onclick="loadPrayerTimes()">🔄 Charger les horaires</button>' +
    '</div>';
  const now = new Date();
  const nowMin = now.getHours() * 60 + now.getMinutes();
  function timeToMin(t) {
    const parts = t.split(':');
    return parseInt(parts[0]) * 60 + parseInt(parts[1]);
  }
  const times = PRAYER_NAMES.map(n => ({ name: n, time: _prayerTimes[n] }));
  let nextIdx = times.findIndex(t => timeToMin(t.time) > nowMin);
  if (nextIdx === -1) nextIdx = -1; 
  let grid = '<div class="prayer-times-grid">';
  times.forEach((t, i) => {
    const tMin = timeToMin(t.time);
    const isPassed = tMin <= nowMin && i !== nextIdx;
    const isNext   = i === nextIdx;
    const cls = 'prayer-time-item' + (isNext ? ' next' : isPassed ? ' passed' : '');
    grid += '<div class="' + cls + '">' +
      '<div class="prayer-time-name">' + t.name + '</div>' +
      '<div class="prayer-time-hour">' + t.time.substring(0,5) + '</div>' +
    '</div>';
  });
  grid += '</div>';
  return '<div class="prayer-times-card">' +
    '<div class="prayer-times-header">' +
      '<div class="prayer-times-title">🕌 Horaires — aujourd\'hui</div>' +
      '<div class="prayer-times-city" onclick="showCityInput()">✏️ ' + _prayerCity + '</div>' +
    '</div>' +
    grid +
  '</div>';
}
function saveCityAndLoad() {
  const input = document.getElementById('cityInput');
  if (!input || !input.value.trim()) return;
  _prayerCity = input.value.trim();
  localStorage.setItem('niyyah_city', _prayerCity);
  _showCityInput = false;
  loadPrayerTimes();
}
function showCityInput() {
  _showCityInput = true;
  renderLevel(currentLevel);
  setTimeout(() => { const el = document.getElementById('cityInput'); if (el) el.focus(); }, 100);
}
function loadPrayerTimes() {
  if (!_prayerCity) { _showCityInput = true; renderLevel(currentLevel); return; }
  _prayerLoading = true;
  _prayerError   = false;
  renderLevel(currentLevel);
  // Méthode 3 = Muslim World League (Fajr 18°, Isha 17°) — standard Europe, identique à Mawaqit
  const _today = new Date();
  const _dd = String(_today.getDate()).padStart(2,'0');
  const _mm = String(_today.getMonth()+1).padStart(2,'0');
  const _yyyy = _today.getFullYear();
  const _tz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'Europe/Paris';
  const url = 'https://api.aladhan.com/v1/timingsByAddress?address=' +
    encodeURIComponent(_prayerCity) +
    '&method=3' +
    '&school=0' +
    '&midnightMode=0' +
    '&latitudeAdjustmentMethod=3' +
    '&date=' + _dd + '-' + _mm + '-' + _yyyy +
    '&timezonestring=' + encodeURIComponent(_tz);
  fetch(url)
    .then(r => r.json())
    .then(d => {
      if (d.code === 200 && d.data && d.data.timings) {
        _prayerTimes   = d.data.timings;
        _prayerLoading = false;
        _prayerError   = false;
        localStorage.setItem('niyyah_prayer_cache_v2', JSON.stringify(_prayerTimes));
        localStorage.setItem('niyyah_prayer_date_v2', TODAY);
        schedulePrayerReminders();
        renderLevel(currentLevel);
        if (typeof updateSanctuaireMoment === 'function') updateSanctuaireMoment();
      } else {
        throw new Error('bad response');
      }
    })
    .catch(() => {
      _prayerLoading = false;
      _prayerError   = true;
      renderLevel(currentLevel);
    });
}
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
const ITEM_WEIGHTS = {
  fajr: 3, dhuhr: 3, asr: 3, maghrib: 3, isha: 3, jumua: 3,
  wird_matin: 2, wird_soir: 2,
  ayat_kursi: 2,
  sunnah_fajr: 2, witr: 2, tahajjud: 2,
  istighfar: 2, tasbih: 2,
  silaturahm: 2,
  doua1: 2, doua2: 2, doua_soi: 2, doua_morts: 2, doua_oumma: 2, ziyara: 2, pardon: 2,
  fri_kahf: 2, fri_salawat: 2, fri_doua: 2,
};
function getWeight(id) { return ITEM_WEIGHTS[id] || 1; }
function isItemDone(item, s) {
  if (item.type === 'wird') {
    const session = WIRD_DATA[item.session];
    return session && session.items.every(wi => !!wirdState[wi.id]);
  }
  return item.type === 'counter' ? (s[item.id]||0) >= item.target : !!s[item.id];
}
function getWeightedScore(items, s) {
  const totalPts = items.reduce((sum, i) => sum + getWeight(i.id), 0);
  const donePts  = items.filter(i => isItemDone(i, s)).reduce((sum, i) => sum + getWeight(i.id), 0);
  return totalPts > 0 ? (donePts / totalPts) * 100 : 0;
}
function saveWirdState() {
  localStorage.setItem('niyyah_wird_' + (new Date().toISOString().split('T')[0]), JSON.stringify(wirdState));
}
function toggleWirdItem(id, event) {
  if (event && event.target && (
    event.target.classList.contains('btn-wird-audio') ||
    event.target.classList.contains('btn-wird-info') ||
    event.target.closest('.btn-wird-audio') ||
    event.target.closest('.btn-wird-info')
  )) return;
  wirdState[id] = !wirdState[id];
  saveWirdState();
  if (wirdState[id]) {
    if (typeof playCheckSound === 'function') playCheckSound();
    if (navigator.vibrate) navigator.vibrate([12, 8, 25]);
  }
  renderWird();
  // Sync: update Smart Card in checklist if visible
  if (typeof renderLevel === 'function' && typeof currentLevel !== 'undefined') {
    setTimeout(() => renderLevel(currentLevel), 60);
  }
}
function renderWird() {
  const content = document.getElementById('wirdContent');
  if (!content) return;
  let html = '<button onclick="switchView(\'checklist\')" style="background:transparent;border:none;color:#C8A84A;font-size:14px;cursor:pointer;padding:8px 0;margin-bottom:8px;display:flex;align-items:center;gap:4px;">← Retour</button>';
  ['matin', 'soir'].forEach(session => {
    const s = WIRD_DATA[session];
    const done = s.items.filter(i => wirdState[i.id]).length;
    const pct = Math.round(done / s.items.length * 100);
    html += `<div class="wird-session"><div class="wird-session-header"><div class="wird-session-icon">${s.icon}</div><div class="wird-session-title">${s.title}</div><div class="wird-session-pct">${done}/${s.items.length}</div></div><div class="wird-session-bar"><div class="wird-session-bar-fill" style="width:${pct}%"></div></div>`;
    s.items.forEach(item => {
      const checked = !!wirdState[item.id];
      const audioData = item.audio ? JSON.stringify(item.audio) : null;
      const audioBtn = item.audio ? `<button class="btn-wird-audio" ontouchstart="event.stopPropagation()" onclick="playAudioFromBtn(this,event)" data-audio="${audioData ? audioData.replace(/"/g,'&quot;') : ''}" title="Écouter">🔊</button>` : '';
      const phonEsc = (item.phonetic||'').replace(/"/g,'&quot;');
      const arabEsc = (item.arabic||'').replace(/"/g,'&quot;');
      const srcEsc  = (item.source||'').replace(/"/g,'&quot;');
      const labelEsc = item.label.replace(/"/g,'&quot;');
      const infoBtn = `<button class="btn-wird-info" onclick="openInfoSheet('','','','',event)" data-label="${labelEsc}" data-arabic="${arabEsc}" data-phonetic="${phonEsc}" data-translation="${srcEsc}"><i>i</i></button>`;
      html += `<div class="wird-item${checked?' checked':''}" onclick="toggleWirdItem('${item.id}',event)"><div class="wird-check"><svg class="wird-check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="wird-body"><div class="wird-label">${item.label}</div><div class="wird-sub">${item.sub}</div><div class="wird-arabic">${item.arabic}</div></div><div class="wird-actions">${audioBtn}${infoBtn}</div></div>`;
    });
    html += `<button class="wird-reset-btn" onclick="resetWirdSession('${session}')">↺ Réinitialiser</button></div>`;
  });
  content.innerHTML = html;
}
function resetWirdSession(session) {
  WIRD_DATA[session].items.forEach(i => { wirdState[i.id] = false; });
  saveWirdState();
  renderWird();
}
const WEEKLY_HADITHS = {
  perfect: [ 
    { text: "L'acte le plus aimé d'Allah est le plus constant, même s'il est petit.", source: "Sahih al-Bukhari 6464" },
    { text: "Allah ne se lasse pas jusqu'à ce que vous vous lassiez. Accomplissez des actes dont vous êtes capables.", source: "Sahih al-Bukhari & Muslim" },
    { text: "Le croyant qui accomplit ses actes avec régularité est comme celui qui court vers Allah sans jamais s'arrêter.", source: "Sahih Muslim 783" },
    { text: "Soyez droits, persévérez et réjouissez-vous. Car les meilleures actions sont celles accomplies avec constance.", source: "Sahih al-Bukhari 6463" },
    { text: "Deux mots légers sur la langue, lourds dans la balance, aimés du Tout Miséricordieux : SubhanAllah wa bihamdihi, SubhanAllah al-Azim.", source: "Sahih al-Bukhari 6682" }
  ],
  good: [ 
    { text: "Rapprochez-vous de la perfection et réjouissez-vous. Sachez que nul ne sera sauvé par ses seules œuvres.", source: "Sahih al-Bukhari 6467" },
    { text: "Prenez sur vous ce que vous pouvez supporter, car Allah ne se lassera pas de vous récompenser.", source: "Sahih al-Bukhari 43" },
    { text: "Qui fait un pas vers Allah, Allah fait dix pas vers lui. Qui marche vers Allah, Allah court vers lui.", source: "Hadith Qudsi — Muslim 2675" },
    { text: "La foi s'use comme se use un vêtement. Demandez à Allah de renouveler la foi dans vos cœurs.", source: "Sahih al-Hakim — authentifié" },
    { text: "Le musulman dont l'Islam est bon est celui qui abandonne ce qui ne le concerne pas.", source: "Tirmidhi 2317 — Hassan" }
  ],
  average: [ 
    { text: "Allah regarde vos cœurs et vos actes, non vos apparences et vos biens.", source: "Sahih Muslim 2564" },
    { text: "Toute âme pécheresse revient vers Allah, et Allah aime ceux qui se repentent.", source: "Coran 2:222 — commentaire Ibn Kathir" },
    { text: "Si vous commettez des fautes jusqu'à toucher le ciel, puis que vous demandez pardon à Allah, Il vous pardonnera.", source: "Tirmidhi 3540 — Hassan" },
    { text: "Le fort n'est pas celui qui terrasse les autres. Le fort est celui qui se maîtrise dans la colère.", source: "Sahih al-Bukhari 6114" },
    { text: "Ne dites jamais qu'une chose est trop petite pour être faite pour Allah. Car Allah agrée les petits actes sincères.", source: "Sahih Muslim 1007" }
  ],
  low: [ 
    { text: "Dieu dit : O fils d'Adam, si tu viens à Moi avec des péchés équivalents à la terre, et que tu Me rencontres sans M'associer, Je viendrai à toi avec une grâce équivalente.", source: "Tirmidhi 3540" },
    { text: "Allah tend Sa main la nuit pour pardonner celui qui a péché le jour, et tend Sa main le jour pour pardonner celui qui a péché la nuit.", source: "Sahih Muslim 2759" },
    { text: "Chaque fils d'Adam est sujet aux erreurs. Et les meilleurs de ceux qui errent sont ceux qui se repentent.", source: "Tirmidhi 2499 — Hassan" },
    { text: "Le repentir sincère efface ce qui précède. Celui qui se repent d'un péché est comme celui qui n'en a pas.", source: "Ibn Majah 4250 — Hassan" },
    { text: "Ne désespérez jamais de la miséricorde d'Allah. Allah pardonne tous les péchés. Il est le Tout-Pardonnant.", source: "Coran 39:53" }
  ],
  none: [ 
    { text: "Dis à Mes serviteurs qui ont commis des excès : ne désespérez pas de la miséricorde d'Allah.", source: "Coran 39:53" },
    { text: "La meilleure des actions est de recommencer après avoir abandonné. Et la porte du repentir est toujours ouverte.", source: "Ibn Rajab al-Hanbali" },
    { text: "Allah est plus heureux du repentir de Son serviteur qu'un homme qui retrouve son chameau perdu dans le désert.", source: "Sahih al-Bukhari 6308" },
    { text: "N'aie pas honte de revenir à Allah, même si tu es revenu mille fois.", source: "Hasan al-Basri — sagesse islamique" },
    { text: "Chaque jour qui se lève est une nouvelle chance. Celle-ci ne reviendra jamais. Ne la laisse pas partir sans avoir accompli un acte bon.", source: "Ibn al-Qayyim — Al-Fawa'id" }
  ]
};
const DAY_LABELS = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
function getWeeklyHadith(level) {
  const arr = WEEKLY_HADITHS[level];
  const weekNum = Math.floor(Date.now() / (7 * 24 * 3600 * 1000));
  return arr[weekNum % arr.length];
}
function showWeeklyBilan() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = getDateMinus(TODAY, i);
    const score = (history.dayScores && history.dayScores[d]) || 0;
    days.push({ date: d, done: !!history.days[d], score });
  }
  const doneDays = days.filter(d => d.done).length;
  const scores = days.filter(d => d.done).map(d => d.score);
  const avgScore = scores.length > 0 ? Math.round(scores.reduce((a,b) => a+b, 0) / scores.length) : 0;

  // Niveau de la semaine
  let level = 'none';
  if (doneDays === 7)      level = 'perfect';
  else if (doneDays >= 5)  level = 'good';
  else if (doneDays >= 3)  level = 'average';
  else if (doneDays >= 1)  level = 'low';

  // Messages Coach Frère — ton fraternel, sans chiffres bruts
  const COACH_MESSAGES = {
    perfect: [
      "Frère, cette semaine tu as montré que la constance est une forme de sagesse. Allah aime l\'action régulière, même petite — tu l\'as choisie grande.",
      "MashaAllah. Chaque journée de cette semaine a été une lettre écrite à Allah. Que cette constance soit ton visa pour les portes du Paradis.",
      "Ta semaine a été une prière continue. Le Prophète ﷺ a dit : l\'action la plus aimée d\'Allah est celle qui dure. Tu as choisi la durée."
    ],
    good: [
      "Tu n\'as pas été parfait — et c\'est bien. La perfection appartient à Allah. Ce que tu as été, c\'est présent, sincère, et constant là où ça compte.",
      "Quelques jours de repos ne brisent pas un chemin. Ils le rendent humain. Reprendre, c\'est déjà une victoire sur le découragement.",
      "Ta présence régulière cette semaine est une forme d\'Istiqamah. Les moments où tu as choisi de revenir valent autant que ceux où tu n\'es pas parti."
    ],
    average: [
      "Cette semaine a été comme un soleil voilé — présent, mais discret. Ce n\'est pas un échec, c\'est une invitation à rallumer la flamme.",
      "Même une graine qui pousse lentement finit par percer la terre. Ton effort cette semaine, si petit soit-il, a été enregistré par Celui qui ne perd rien.",
      "Il y a eu des absences, et c\'est humain. Mais tu es là aujourd\'hui, à lire ce bilan — et ça, c\'est déjà une Niyyah qui compte."
    ],
    low: [
      "Cette semaine a été un repos. Ce n\'est pas une fin — c\'est le creux de la vague avant qu\'elle reprenne de la hauteur. Prépare-toi à t\'élever.",
      "Allah ne ferme pas Ses portes parce qu\'on s\'est éloigné. Revenir, c\'est la plus belle des Niyyah. Ta nouvelle semaine commence maintenant.",
      "Les grands se relèvent. Tu es là, et cette présence suffit pour recommencer. Bismillah."
    ],
    none: [
      "Cette semaine a été silencieuse — et parfois le silence précède la plus belle des reconversions. Allah t\'attend avec Sa miséricorde.",
      "Il n\'y a pas de semaine perdue, seulement des semaines en attente. Ta Niyyah de revenir est déjà une lumière."
    ]
  };

  // Hadith de l'Istiqamah
  const HADITHS_ISTIQAMA = [
    { text: "L\'action la plus aimée d\'Allah est celle qui est la plus régulière, même si elle est petite.", source: "Bukhari & Muslim" },
    { text: "Tenez-vous droit sur le chemin, et sachez que la meilleure de vos actions est la prière.", source: "Ibn Majah" },
    { text: "Dis : Mon Seigneur est Allah, puis reste dans la droiture.", source: "Coran 41:30" },
    { text: "Le Paradis est encerclé par les choses difficiles, et le Feu est encerclé par les désirs.", source: "Muslim" },
  ];

  // Conseil du jour
  const CONSEILS = {
    perfect: "Cette semaine, ajoute une dimension nouvelle : la qualité de ta présence dans la prière. Un seul Rak\'ah avec le cœur vaut mieux que cent sans lui.",
    good: "La semaine prochaine, choisis un acte que tu feras chaque jour sans exception — aussi petit soit-il. L\'Istiqamah commence par une seule habitude ancrée.",
    average: "Commence ta semaine avec une Niyyah écrite. L\'intention posée le matin protège l\'action le soir.",
    low: "Une seule chose : ouvre l\'app demain matin. Juste ça. Le reste suivra.",
    none: "Reviens demain. C\'est tout ce qu\'on te demande. Un jour à la fois."
  };

  const messages = COACH_MESSAGES[level];
  const coachMsg = messages[Math.floor(Math.random() * messages.length)];
  const hadith = HADITHS_ISTIQAMA[Math.floor(Math.random() * HADITHS_ISTIQAMA.length)];
  const conseil = CONSEILS[level];

  // Barre de jours visuelle (points, pas chiffres)
  const daysHtml = days.map((d, i) => {
    const labels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
    const dot = d.done
      ? `<div style="width:10px;height:10px;border-radius:50%;background:var(--gold-v2);box-shadow:0 0 6px rgba(212,175,55,0.5);"></div>`
      : `<div style="width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.12);"></div>`;
    return `<div style="display:flex;flex-direction:column;align-items:center;gap:5px;">
      ${dot}
      <div style="font-size:9px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:0.05em;">${labels[i]}</div>
    </div>`;
  }).join('');

  // Emoji selon niveau
  const emojis = { perfect: '✨', good: '🌿', average: '🌱', low: '🤲', none: '🌙' };

  const card = document.getElementById('weeklyCard');
  card.innerHTML = `
    <div style="text-align:center;padding:8px 0 20px;">
      <div style="font-size:9px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(212,175,55,0.5);margin-bottom:12px;font-family:'Cinzel',serif;">Muhasaba · Bilan de la semaine</div>
      <div style="font-size:40px;margin-bottom:16px;">${emojis[level]}</div>
      <!-- Jours visuels -->
      <div style="display:flex;justify-content:center;gap:12px;margin-bottom:20px;">${daysHtml}</div>
      <!-- Message Coach -->
      <div style="background:rgba(212,175,55,0.04);border:1px solid rgba(212,175,55,0.12);border-radius:16px;padding:18px 16px;margin-bottom:16px;position:relative;overflow:hidden;">
        <div style="position:absolute;top:-8px;left:14px;font-size:40px;opacity:0.06;font-family:serif;color:#D4AF37;">"</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:15px;line-height:1.75;color:rgba(240,234,214,0.88);font-style:italic;text-align:left;">${coachMsg}</div>
      </div>
      <!-- Hadith Istiqamah -->
      <div style="margin-bottom:16px;padding:14px 16px;border-left:2px solid rgba(212,175,55,0.3);text-align:left;">
        <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(212,175,55,0.45);margin-bottom:6px;font-family:'Cinzel',serif;">Al-Istiqamah</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:rgba(240,234,214,0.65);line-height:1.6;">"${hadith.text}"</div>
        <div style="font-size:11px;color:rgba(212,175,55,0.5);margin-top:4px;">— ${hadith.source}</div>
      </div>
      <!-- Conseil pour la semaine -->
      <div style="background:rgba(135,169,107,0.06);border:1px solid rgba(135,169,107,0.15);border-radius:12px;padding:14px 16px;margin-bottom:20px;text-align:left;">
        <div style="font-size:10px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(135,169,107,0.6);margin-bottom:6px;font-family:'Cinzel',serif;">Conseil pour cette semaine</div>
        <div style="font-size:13px;color:rgba(240,234,214,0.7);line-height:1.6;">${conseil}</div>
      </div>
    </div>
    <button class="weekly-btn" onclick="closeWeeklyBilan()" style="width:100%;padding:15px;border-radius:14px;border:none;background:#C8A84A;color:#2C2E32;font-size:15px;font-weight:700;cursor:pointer;font-family:'Cinzel',serif;letter-spacing:0.05em;">
      بِسْمِ اللَّهِ — Nouvelle semaine
    </button>
  `;

  document.getElementById('weeklyOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
  if (navigator.vibrate) navigator.vibrate([20, 30, 60]);
}
const SOURATES = [
  [1,'Al-Fatiha','الفاتحة','L\'Ouverture',7],
  [2,'Al-Baqara','البقرة','La Vache',286],
  [3,'Al-Imran','آل عمران','La Famille d\'Imran',200],
  [4,'An-Nisa','النساء','Les Femmes',176],
  [5,'Al-Maida','المائدة','La Table Servie',120],
  [6,'Al-An\'am','الأنعام','Les Bestiaux',165],
  [7,'Al-A\'raf','الأعراف','Les Murailles',206],
  [8,'Al-Anfal','الأنفال','Le Butin',75],
  [9,'At-Tawba','التوبة','Le Repentir',129],
  [10,'Yunus','يونس','Jonas',109],
  [11,'Hud','هود','Houd',123],
  [12,'Yusuf','يوسف','Joseph',111],
  [13,'Ar-Ra\'d','الرعد','Le Tonnerre',43],
  [14,'Ibrahim','إبراهيم','Abraham',52],
  [15,'Al-Hijr','الحجر','Al-Hijr',99],
  [16,'An-Nahl','النحل','Les Abeilles',128],
  [17,'Al-Isra','الإسراء','Le Voyage Nocturne',111],
  [18,'Al-Kahf','الكهف','La Caverne',110],
  [19,'Maryam','مريم','Marie',98],
  [20,'Ta-Ha','طه','Ta-Ha',135],
  [21,'Al-Anbiya','الأنبياء','Les Prophètes',112],
  [22,'Al-Hajj','الحج','Le Pèlerinage',78],
  [23,'Al-Mu\'minun','المؤمنون','Les Croyants',118],
  [24,'An-Nur','النور','La Lumière',64],
  [25,'Al-Furqan','الفرقان','Le Discernement',77],
  [26,'Ash-Shu\'ara','الشعراء','Les Poètes',227],
  [27,'An-Naml','النمل','Les Fourmis',93],
  [28,'Al-Qasas','القصص','Le Récit',88],
  [29,'Al-Ankabut','العنكبوت','L\'Araignée',69],
  [30,'Ar-Rum','الروم','Les Romains',60],
  [31,'Luqman','لقمان','Luqman',34],
  [32,'As-Sajda','السجدة','La Prosternation',30],
  [33,'Al-Ahzab','الأحزاب','Les Coalisés',73],
  [34,'Saba','سبأ','Saba',54],
  [35,'Fatir','فاطر','Le Créateur',45],
  [36,'Ya-Sin','يس','Ya-Sin',83],
  [37,'As-Saffat','الصافات','Les Rangés',182],
  [38,'Sad','ص','Sad',88],
  [39,'Az-Zumar','الزمر','Les Groupes',75],
  [40,'Ghafir','غافر','Le Pardonneur',85],
  [41,'Fussilat','فصلت','Exposées en Détail',54],
  [42,'Ash-Shura','الشورى','La Consultation',53],
  [43,'Az-Zukhruf','الزخرف','Les Ornements',89],
  [44,'Ad-Dukhan','الدخان','La Fumée',59],
  [45,'Al-Jathiya','الجاثية','L\'Agenouillée',37],
  [46,'Al-Ahqaf','الأحقاف','Les Dunes',35],
  [47,'Muhammad','محمد','Muhammad',38],
  [48,'Al-Fath','الفتح','La Victoire',29],
  [49,'Al-Hujurat','الحجرات','Les Appartements',18],
  [50,'Qaf','ق','Qaf',45],
  [51,'Adh-Dhariyat','الذاريات','Les Vents',60],
  [52,'At-Tur','الطور','Le Mont Sinaï',49],
  [53,'An-Najm','النجم','L\'Étoile',62],
  [54,'Al-Qamar','القمر','La Lune',55],
  [55,'Ar-Rahman','الرحمن','Le Tout Miséricordieux',78],
  [56,'Al-Waqi\'a','الواقعة','L\'Événement',96],
  [57,'Al-Hadid','الحديد','Le Fer',29],
  [58,'Al-Mujadila','المجادلة','La Femme qui Dispute',22],
  [59,'Al-Hashr','الحشر','L\'Exode',24],
  [60,'Al-Mumtahana','الممتحنة','La Femme Éprouvée',13],
  [61,'As-Saf','الصف','Le Rang',14],
  [62,'Al-Jumu\'a','الجمعة','Le Vendredi',11],
  [63,'Al-Munafiqun','المنافقون','Les Hypocrites',11],
  [64,'At-Taghabun','التغابن','La Spoliation',18],
  [65,'At-Talaq','الطلاق','Le Divorce',12],
  [66,'At-Tahrim','التحريم','L\'Interdiction',12],
  [67,'Al-Mulk','الملك','La Royauté',30],
  [68,'Al-Qalam','القلم','Le Calame',52],
  [69,'Al-Haqqa','الحاقة','L\'Inévitable',52],
  [70,'Al-Ma\'arij','المعارج','Les Degrés',44],
  [71,'Nuh','نوح','Noé',28],
  [72,'Al-Jinn','الجن','Les Djinns',28],
  [73,'Al-Muzzammil','المزمل','L\'Enveloppé',20],
  [74,'Al-Muddaththir','المدثر','Le Revêtu',56],
  [75,'Al-Qiyama','القيامة','La Résurrection',40],
  [76,'Al-Insan','الإنسان','L\'Homme',31],
  [77,'Al-Mursalat','المرسلات','Les Envoyés',50],
  [78,'An-Naba','النبأ','La Nouvelle',40],
  [79,'An-Nazi\'at','النازعات','Ceux qui Arrachent',46],
  [80,'Abasa','عبس','Il a Froncé les Sourcils',42],
  [81,'At-Takwir','التكوير','L\'Enroulement',29],
  [82,'Al-Infitar','الانفطار','La Déchirure',19],
  [83,'Al-Mutaffifin','المطففين','Les Fraudeurs',36],
  [84,'Al-Inshiqaq','الانشقاق','La Fissure',25],
  [85,'Al-Buruj','البروج','Les Constellations',22],
  [86,'At-Tariq','الطارق','L\'Astre Nocturne',17],
  [87,'Al-A\'la','الأعلى','Le Très-Haut',19],
  [88,'Al-Ghashiya','الغاشية','L\'Enveloppante',26],
  [89,'Al-Fajr','الفجر','L\'Aube',30],
  [90,'Al-Balad','البلد','La Cité',20],
  [91,'Ash-Shams','الشمس','Le Soleil',15],
  [92,'Al-Layl','الليل','La Nuit',21],
  [93,'Ad-Duha','الضحى','La Matinée',11],
  [94,'Ash-Sharh','الشرح','L\'Ouverture de la Poitrine',8],
  [95,'At-Tin','التين','Le Figuier',8],
  [96,'Al-Alaq','العلق','Le Caillot de Sang',19],
  [97,'Al-Qadr','القدر','La Nuit du Destin',5],
  [98,'Al-Bayyina','البينة','La Preuve',8],
  [99,'Az-Zalzala','الزلزلة','Le Séisme',8],
  [100,'Al-Adiyat','العاديات','Les Coursiers',11],
  [101,'Al-Qari\'a','القارعة','Le Fracas',11],
  [102,'At-Takathur','التكاثر','La Course aux Richesses',8],
  [103,'Al-Asr','العصر','Le Temps',3],
  [104,'Al-Humaza','الهمزة','Le Calomniateur',9],
  [105,'Al-Fil','الفيل','L\'Éléphant',5],
  [106,'Quraysh','قريش','Quraysh',4],
  [107,'Al-Ma\'un','الماعون','Les Ustensiles',7],
  [108,'Al-Kawthar','الكوثر','L\'Abondance',3],
  [109,'Al-Kafirun','الكافرون','Les Infidèles',6],
  [110,'An-Nasr','النصر','Le Secours',3],
  [111,'Al-Masad','المسد','Les Fibres',5],
  [112,'Al-Ikhlas','الإخلاص','Le Monothéisme Pur',4],
  [113,'Al-Falaq','الفلق','L\'Aube Naissante',5],
  [114,'An-Nas','الناس','Les Hommes',6],
];
let _coranAudio = null;
let _coranIdx = 0;
let _coranSourate = null;
let _coranPlaying = false;
function openCoranPicker(event) {
  if (event) event.stopPropagation();
  var _ov = document.getElementById('coranOverlay');
  var _dr = document.getElementById('coranDrawer');
  var _sr = document.getElementById('coranSearch');
  if (!_ov || !_dr) return;
  _ov.style.opacity = '1';
  _ov.style.pointerEvents = 'all';
  _dr.style.transform = 'translateY(0)';
  if (_sr) _sr.value = '';
  renderSourateList(SOURATES);
}
function closeCoranPicker() {
  var _ov = document.getElementById('coranOverlay');
  var _dr = document.getElementById('coranDrawer');
  if (_ov) { _ov.style.opacity = '0'; _ov.style.pointerEvents = 'none'; }
  if (_dr) _dr.style.transform = 'translateY(100%)';
}
function filterSourates(q) {
  const filtered = SOURATES.filter(s =>
    s[1].toLowerCase().includes(q.toLowerCase()) ||
    s[3].toLowerCase().includes(q.toLowerCase()) ||
    s[2].includes(q) ||
    String(s[0]).includes(q)
  );
  renderSourateList(filtered);
}
function renderSourateList(list) {
  const el = document.getElementById('coranList');
  if (!el) return;
  el.innerHTML = list.map(s => {
    const active = _coranSourate && _coranSourate[0] === s[0];
    return '<div onclick="playSourate(' + s[0] + ')" style="display:flex;align-items:center;gap:12px;padding:12px 16px;border-radius:12px;margin:2px 0;background:' + (active ? 'rgba(200,168,75,0.1)' : 'transparent') + ';border:1px solid ' + (active ? 'rgba(200,168,75,0.3)' : 'transparent') + ';cursor:pointer;">'
      + '<div style="width:36px;height:36px;border-radius:10px;background:' + (active ? 'linear-gradient(135deg,#c8a84b,#e8cc6a)' : 'rgba(255,255,255,0.06)') + ';display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:' + (active ? '#000' : 'var(--t3)') + ';flex-shrink:0;">' + s[0] + '</div>'
      + '<div style="flex:1;min-width:0;">'
      + '<div style="font-size:14px;font-weight:600;color:' + (active ? '#e8cc6a' : 'var(--t1)') + ';">' + s[1] + ' <span style="font-size:12px;color:var(--t3);">· ' + s[3] + '</span></div>'
      + '<div style="font-size:11px;color:var(--t3);">' + s[4] + ' versets</div>'
      + '</div>'
      + '<div style="font-size:18px;color:var(--t2);font-family:var(--arabic);">' + s[2] + '</div>'
      + '</div>';
  }).join('');
}
function playSourate(num) {
  const sourate = SOURATES.find(s => s[0] === num);
  if (!sourate) return;
  stopCoranPlayer();
  _coranSourate = sourate;
  _coranIdx = 0;
  _coranPlaying = true;
  var _playerEl = document.getElementById('coranPlayer');
  var _nameEl = document.getElementById('coranPlayerName');
  if (_playerEl) _playerEl.style.display = 'block';
  if (_nameEl) _nameEl.textContent = sourate[1] + ' — ' + sourate[2];
  renderSourateList(SOURATES.filter(s => {
    const q = document.getElementById('coranSearch').value;
    return !q || s[1].toLowerCase().includes(q.toLowerCase()) || s[3].toLowerCase().includes(q.toLowerCase());
  }));
  _playCoranVerset();
}
function _playCoranVerset() {
  if (!_coranSourate || !_coranPlaying) return;
  const total = _coranSourate[4];
  var _playBtn = document.getElementById('coranPlayBtn');
  var _versetEl = document.getElementById('coranPlayerVerset');
  if (_coranIdx >= total) {
    _coranPlaying = false;
    if (_playBtn) _playBtn.textContent = '▶';
    if (_versetEl) _versetEl.textContent = 'Terminé — Alhamdulillah 🌿';
    return;
  }
  const num = String(_coranSourate[0]).padStart(3,'0');
  const ver = String(_coranIdx + 1).padStart(3,'0');
  const url = 'https://everyayah.com/data/Alafasy_128kbps/' + num + ver + '.mp3';
  if (_versetEl) _versetEl.textContent = 'Verset ' + (_coranIdx+1) + ' / ' + total;
  if (_playBtn) _playBtn.textContent = '⏸';
  if (_coranAudio) { _coranAudio.pause(); _coranAudio = null; }
  const audio = new Audio();
  _coranAudio = audio;
  audio.onerror = () => { _coranIdx++; _playCoranVerset(); };
  audio.onended = () => { _coranIdx++; _playCoranVerset(); };
  audio.src = url;
  audio.load();
  audio.play().catch(() => { _coranIdx++; _playCoranVerset(); });
}
function toggleCoranPlay() {
  if (!_coranAudio) return;
  var _btn = document.getElementById('coranPlayBtn');
  if (_coranPlaying) {
    _coranAudio.pause();
    _coranPlaying = false;
    if (_btn) _btn.textContent = '▶';
  } else {
    _coranAudio.play();
    _coranPlaying = true;
    if (_btn) _btn.textContent = '⏸';
  }
}
function stopCoranPlayer() {
  if (_coranAudio) { _coranAudio.pause(); _coranAudio = null; }
  _coranPlaying = false;
  _coranSourate = null;
  _coranIdx = 0;
  var _playerEl = document.getElementById('coranPlayer');
  var _btn = document.getElementById('coranPlayBtn');
  if (_playerEl) _playerEl.style.display = 'none';
  if (_btn) _btn.textContent = '▶';
}
// ── MÉDITATION ──
let _meditDuration = 3 * 60;
let _meditRemaining = 3 * 60;
let _meditInterval = null;
let _meditRunning = false;
let _meditAudio = null;

const MEDIT_PHRASES = [
  'Pose ton cœur. Respire. Réfléchis à la création d\'Allah.',
  'وَهُوَ مَعَكُمْ أَيْنَمَا كُنتُمْ — Il est avec vous où que vous soyez.',
  'Laisse les pensées passer. Reviens au point.',
  'Chaque souffle est un don. Dis Alhamdulillah.',
  'اللَّهُ — Un seul nom. Laisse-le emplir ton cœur.',
  'Tu n\'as pas besoin de mots. Sois présent.',
  'Le cœur qui se souvient d\'Allah trouve la paix.',
  'Pense à ta dernière prière… étais-tu concentré… ou distrait ?',
  'Si Allah te voyait en ce moment, serais-tu satisfait de toi ?',
  'Combien de fois as-tu dit Alhamdulillah aujourd\'hui… sincèrement ?',
  'Y a-t-il quelqu\'un à qui tu dois demander pardon ?',
  'Qu\'est-ce qui t\'empêche d\'être meilleur aujourd\'hui qu\'hier ?',
  'Si c\'était ta dernière journée… aurais-tu des regrets ?',
  'Quel acte accomplis-tu uniquement pour Allah, sans que personne ne le sache ?',
  'Ton cœur est-il dur ou doux en ce moment ? Pourquoi ?',
  'La mort viendra. Es-tu prêt ?',
  'Qu\'est-ce que tu remettrais à demain… que tu devrais faire maintenant ?',
  'Pense à une bénédiction que tu ne remarques plus. Elle est toujours là.',
  'As-tu lu le Coran aujourd\'hui ? Même un verset ?',
  'Qui dans ta vie mérite que tu fasses du dua pour lui en ce moment ?',
  'Allah t\'a créé avec un but. L\'as-tu cherché ?',
  'Ton silence vaut-il mieux que tes paroles en ce moment ?',
  'Qu\'est-ce qui te préoccupe le plus ? Confie-le à Allah maintenant.',
  'Es-tu en paix avec les décisions que tu as prises cette semaine ?',
  'Y a-t-il une haram que tu continues de faire en sachant que c\'est haram ?',
  'Pense à tes parents. Leur as-tu dit que tu les aimes ?',
  'Si tes pensées d\'aujourd\'hui étaient visibles… en aurais-tu honte ?',
  'Allah t\'a pardonné des choses que tu ne sais même pas. Shukr.',
  'Qu\'est-ce que tu demanderais à Allah si tu étais certain qu\'Il répond ?',
  'Le Paradis existe. Qu\'as-tu fait aujourd\'hui pour t\'en rapprocher ?',
  'Contemple la création d\'Allah. Chaque souffle est un signe.',
  'Qu\'est-ce qui nourrit ton âme… et qu\'est-ce qui l\'affame ?',
  'As-tu fait du mal à quelqu\'un sans t\'en excuser ?',
  'Ta langue… est-elle un outil de bien ou de blessure ?',
  'Qu\'est-ce qu\'Allah a résolu pour toi que tu n\'as même pas vu ?',
  'Pense à ta niyyah. Pour qui fais-tu ce que tu fais ?',
  'Y a-t-il de la rancœur dans ton cœur ? Elle pèse. Pose-la.',
  'Qu\'est-ce que tu veux que les gens disent de toi à ta mort ?',
  'Ton regard… où va-t-il quand tu n\'y fais pas attention ?',
  'As-tu demandé à Allah aujourd\'hui ? Il attend.',
  'Pense à un moment où Allah t\'a sauvé sans que tu t\'en rendes compte.',
  'Qu\'est-ce qui te distrait le plus de ton Seigneur ?',
  'L\'ingratitude est subtile. As-tu murmuré contre une bénédiction ?',
  'Quel type de musulman veux-tu être dans 5 ans ?',
  'Ton cœur bat sans que tu le demandes. Qui fait ça ?',
  'Y a-t-il une promesse que tu as faite et non tenue ?',
  'Qu\'est-ce qui t\'empêche de faire plus de dhikr ?',
  'Si Allah t\'interrogeait sur ton temps d\'aujourd\'hui… que dirais-tu ?',
  'Pense à quelqu\'un qui souffre en ce moment. Fais un dua pour lui.',
  'Qu\'est-ce que la mort d\'un proche t\'a appris ?',
  'Tu n\'es que de passage ici. Qu\'emportes-tu ?',
  'Ton salat… est-il une habitude ou une rencontre ?',
  'Qu\'est-ce qu\'Allah a mis dans ton cœur que tu n\'as pas encore suivi ?',
  'As-tu quelque chose à confesser à Allah en ce moment ?',
  'La dunya est belle. Et pourtant elle finit. Est-ce que tu y penses ?',
  'Qu\'est-ce qui te rend vraiment heureux… au fond ?',
  'As-tu pleuré pour Allah récemment ? Pourquoi pas ?',
  'Pense à tes enfants, ou aux enfants que tu auras. Quel héritage leur laisses-tu ?',
  'Qu\'est-ce que tu sacrifierais pour Allah sans hésiter ?',
  'Y a-t-il une personne que tu n\'as pas pardonnée ? C\'est toi qui souffres.',
  'Ton argent… d\'où vient-il ? Où va-t-il ? Est-il halal ?',
  'As-tu protégé quelqu\'un aujourd\'hui par tes paroles ou ton silence ?',
  'Qu\'est-ce que tu fais quand personne ne regarde ? C\'est qui tu es vraiment.',
  'Allah t\'appelle cinq fois par jour. Réponds-tu avec tout ton cœur ?',
  'Qu\'est-ce qui te manque pour être en paix ?',
  'Si tu pouvais parler à ton moi d\'il y a 10 ans… que lui dirais-tu ?',
  'Le Prophète ﷺ souriait souvent. Toi… as-tu souri aujourd\'hui ?',
  'Qu\'est-ce que tu as appris sur toi-même ce mois-ci ?',
  'As-tu nourri ton corps et oublié ton âme ?',
  'Pense à quelque chose que tu possèdes. Et si Allah te le retirait demain ?',
  'Qu\'est-ce qui te retient de faire le bien en ce moment ?',
  'Ta colère… vient-elle de ton ego ou d\'une vraie injustice ?',
  'Qu\'est-ce qu\'Allah mérite de toi que tu ne Lui donnes pas encore ?',
  'Le silence est un ibadah. Peux-tu rester sans parler une heure pour Allah ?',
  'Qu\'est-ce qui a changé en toi depuis que tu pratiques ?',
  'As-tu aidé quelqu\'un cette semaine sans attendre en retour ?',
  'Pense à ta mort. Pas pour avoir peur. Pour être libre.',
  'Qu\'est-ce que tu demanderais à Allah si tu Lui parlais maintenant en face ?',
  'Y a-t-il une sunnah que tu as abandonnée et que tu veux reprendre ?',
  'Ton cœur cherche quelque chose. Est-ce vraiment ce que tu crois ?',
  'Qu\'est-ce qui te rapproche d\'Allah ? Fais-en plus.',
  'Qu\'est-ce qui t\'en éloigne ? Arrête.',
  'As-tu quelque chose dont tu es fier devant Allah ?',
  'La patience est une ibadah. Dans quoi dois-tu être plus patient ?',
  'Qu\'est-ce que le Coran te dit ce soir que tu n\'as pas encore entendu ?',
  'Pense à une épreuve. Qu\'a-t-elle construit en toi ?',
  'As-tu fait du sadaqa cette semaine ? Même un sourire.',
  'Allah voit ta solitude. Il est là. Est-ce que tu Le sens ?',
  'Quel dua répètes-tu depuis des années sans réponse visible ? Continue.',
  'Qu\'est-ce que tu ne contrôles pas ? Confie-le à Celui qui contrôle tout.',
  'Ton orgueil… t\'a-t-il déjà coûté quelque chose ?',
  'Qu\'est-ce que tu ferais différemment si tu savais qu\'Allah regarde ?',
  'Le bonheur que tu cherches… est-il en dehors ou en dedans ?',
  'As-tu remercié quelqu\'un aujourd\'hui ? C\'est du shukr à Allah aussi.',
  'Qu\'est-ce qui mérite vraiment tes larmes ?',
  'Tu es encore là. C\'est une seconde chance. Qu\'en fais-tu ?',
  'Inhale. Allah. Exhale. Alhamdulillah. Encore.',
];

let _meditAudioMode = 'silence';
function openMeditation() {
  document.getElementById('meditScreen').classList.add('show');
  document.getElementById('meditDotEl').style.animation = 'meditPulse 2.5s ease-in-out infinite';
  _meditRemaining = _meditDuration;
  updateMeditDisplay();
  rotateMeditPhrase();
  // Silence par défaut — nasheed seulement si l'utilisateur l'a choisi
  if (_meditAudioMode === 'nasheed') {
    if (!_meditAudio) { _meditAudio = new Audio('./rahatal-qulub.mp3'); _meditAudio.loop = true; _meditAudio.volume = 0.6; }
    _meditAudio.play().catch(() => {});
  }
  if (navigator.vibrate) navigator.vibrate(20);
}

function openBilanSoir() {
  const o = document.getElementById('bilanSoirOverlay');
  o.style.display = 'flex';
}
function closeBilanSoir() {
  document.getElementById('bilanSoirOverlay').style.display = 'none';
}
function closeBilanFeedback() {
  document.getElementById('bilanSoirFeedback').style.display = 'none';
}
function setBilanSoir(choix) {
  closeBilanSoir();
  const data = {
    distraction: { icon: '😶‍🌫️', title: 'Allah est Pardonneur.', msg: 'La ghafla (distraction) est humaine. Demain est une nouvelle chance. Chaque lever du soleil est une porte ouverte.' },
    effort:      { icon: '🌤️',  title: 'Continue, inch\'Allah !', msg: 'Chaque pas compte. Allah aime celui qui revient, encore et encore. La constance est plus aimée d\'Allah que l\'intensité.' },
    sincerite:   { icon: '☀️',  title: 'Barakallahu fik.', msg: 'Un cœur sincère aujourd\'hui est la plus belle sadaqa. Que Allah te maintienne dans cet état. Alhamdulillah.' }
  };
  const d = data[choix];
  document.getElementById('bilanFeedbackIcon').textContent = d.icon;
  document.getElementById('bilanFeedbackTitle').textContent = d.title;
  document.getElementById('bilanFeedbackMsg').textContent = d.msg;
  document.getElementById('bilanSoirFeedback').style.display = 'flex';

  // Sauvegarder dans localStorage
  const today = new Date().toISOString().split('T')[0];
  const bilans = JSON.parse(localStorage.getItem('niyyah_bilans') || '{}');
  bilans[today] = choix;
  localStorage.setItem('niyyah_bilans', JSON.stringify(bilans));

  // === EFFETS SELON LE CHOIX ===
  if (choix === 'distraction') {
    // Activer Mode Tawba pour demain : forcer le flag niyyah_tawba_force
    localStorage.setItem('niyyah_tawba_force', '1');
    // Message au démarrage demain via toast différé (lu au prochain init)
    localStorage.setItem('niyyah_morning_msg', JSON.stringify({
      icon: '🌅', text: 'Nouveau jour, nouveau souffle. Allah t\'a accordé ce matin — commence par Bismillah.', date: today
    }));
  } else if (choix === 'effort') {
    localStorage.setItem('niyyah_morning_msg', JSON.stringify({
      icon: '🌿', text: 'Hier tu as fait des efforts. Aujourd\'hui, continue — la constance est plus aimée d\'Allah que l\'intensité.', date: today
    }));
  } else if (choix === 'sincerite') {
    // Bonus visuel streak
    localStorage.setItem('niyyah_morning_msg', JSON.stringify({
      icon: '✨', text: 'Hier ton cœur était sincère. Que Allah te maintienne dans cet état — c\'est Sa grâce.', date: today
    }));
    // Mini animation streak
    showToast('✨ Journée sincère — Barakallahu fik !');
  }
}

function setMeditAudio(mode, btn) {
  _meditAudioMode = mode;
  document.querySelectorAll('.medit-audio-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (mode === 'nasheed') {
    if (!_meditAudio) { _meditAudio = new Audio('./rahatal-qulub.mp3'); _meditAudio.loop = true; _meditAudio.volume = 0.6; }
    _meditAudio.play().catch(() => {});
  } else {
    if (_meditAudio) { _meditAudio.pause(); _meditAudio.currentTime = 0; }
  }
}

function closeMeditation() {
  document.getElementById('meditScreen').classList.remove('show');
  document.getElementById('meditDotEl').style.animation = 'none';
  if (_meditInterval) { clearInterval(_meditInterval); _meditInterval = null; }
  _meditRunning = false;
  if (_meditAudio) { _meditAudio.pause(); _meditAudio.currentTime = 0; }
}

function setMeditDuration(min, btn) {
  _meditDuration = min * 60;
  _meditRemaining = _meditDuration;
  updateMeditDisplay();
  if (_meditInterval) { clearInterval(_meditInterval); _meditInterval = null; _meditRunning = false; }
  document.querySelectorAll('.medit-timer-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

function toggleMeditTimer() {
  if (_meditRunning) {
    clearInterval(_meditInterval);
    _meditInterval = null;
    _meditRunning = false;
    document.getElementById('meditDotEl').style.animationPlayState = 'paused';
  } else {
    if (_meditRemaining <= 0) _meditRemaining = _meditDuration;
    _meditRunning = true;
    document.getElementById('meditDotEl').style.animationPlayState = 'running';
    _meditInterval = setInterval(() => {
      _meditRemaining--;
      updateMeditDisplay();
      if (_meditRemaining % 60 === 0) rotateMeditPhrase();
      if (_meditRemaining <= 0) {
        clearInterval(_meditInterval);
        _meditRunning = false;
        document.getElementById('meditPhrase').textContent = 'Barakallahu fik — Tafakkur accompli ✦';
        document.getElementById('meditDotEl').style.background = '#34d962';
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
      }
    }, 1000);
  }
}

function updateMeditDisplay() {
  const m = Math.floor(_meditRemaining / 60);
  const s = _meditRemaining % 60;
  document.getElementById('meditTimerDisplay').textContent =
    String(m).padStart(2,'0') + ':' + String(s).padStart(2,'0');
}

function rotateMeditPhrase() {
  const idx = Math.floor(Math.random() * MEDIT_PHRASES.length);
  const el = document.getElementById('meditPhrase');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = MEDIT_PHRASES[idx]; el.style.opacity = '1'; }, 300);
  }
}

// ── MODE TAWBA ──
const TAWBA_MESSAGES = [
  {
    title: "La porte était ouverte.",
    sub: "Tu es revenu. C'est tout ce qui compte. Aucune explication n'est nécessaire.",
    verse: "Dis : Ô Mes serviteurs qui avez commis des excès, ne désespérez pas de la miséricorde d'Allah.",
    ref: "Coran 39:53", color: "#D4AF37"
  },
  {
    title: "Chaque retour est aimé.",
    sub: "Plus aimé d'Allah que mille départs parfaits. Tu n'as pas échoué — tu es en chemin.",
    verse: "Allah est plus heureux du repentir de Son serviteur que celui qui retrouve sa monture perdue.",
    ref: "Bukhari 6309", color: "#87A96B"
  },
  {
    title: "Ton chemin t'attendait.",
    sub: "L'absence n'a pas effacé ce que tu as construit. Il t'attendait là où tu l'as laissé.",
    verse: "Chaque fils d'Adam commet des erreurs. Les meilleurs sont ceux qui reviennent.",
    ref: "Tirmidhi 2499", color: "#E9C46A"
  },
  {
    title: "Ibn Qayyim al-Jawziyya",
    sub: "Le cœur qui revient est plus beau que celui qui n'est jamais parti — car il connaît la valeur du chemin.",
    verse: "Le regret sincère est la moitié du repentir. L'autre moitié, c'est de ne pas s'arrêter.",
    ref: "Madarij al-Salikin", color: "#D4AF37", exclusive: true
  },
  {
    title: "Al-Ghazali",
    sub: "Ce n'est pas la chute qui définit le croyant. C'est la façon dont il se relève — avec douceur, sans honte.",
    verse: "La porte du repentir est ouverte jusqu'à ce que le soleil se lève à l'Occident.",
    ref: "Ihya Ulum al-Din", color: "#87A96B", exclusive: true
  },
  {
    title: "Bienvenue de retour.",
    sub: "Chaque jour est une nouvelle chance d'aimer Allah. Aujourd'hui est ce jour.",
    verse: "Allah étend Sa main la nuit pour le repentir de celui qui a péché le jour.",
    ref: "Muslim 2759", color: "#E9C46A"
  },
];

function checkTawba() {
  const lastDate = localStorage.getItem('niyyah_tawba_shown');
  if (lastDate === TODAY) return; // déjà montré aujourd'hui
  if (!history || !history.totalDays || history.totalDays < 1) return; // nouveau

  /* ══ POINT 4 — Algorithme de détection d'absence ══
   * Calcul : differenceInDays = (Date.now() - lastInteraction) / 86400000
   * Si differenceInDays >= 2 → déclencher séquence Tawba
   */
  var _lastInteraction = localStorage.getItem('niyyah_last_open');
  if (_lastInteraction) {
    var differenceInDays = Math.floor((Date.now() - parseInt(_lastInteraction)) / 86400000);
    if (differenceInDays >= 2) {
      setTimeout(function() { showTawba(); }, 1200);
      return;
    }
  }

  // Vérifier message matin du bilan soir d'hier
  try {
    const morningMsg = JSON.parse(localStorage.getItem('niyyah_morning_msg') || 'null');
    if (morningMsg && morningMsg.date !== TODAY) {
      // Message d'hier → afficher ce matin
      setTimeout(() => showToast(morningMsg.icon + ' ' + morningMsg.text.substring(0, 80)), 1500);
      localStorage.removeItem('niyyah_morning_msg');
    }
  } catch(e) {}

  // Tawba forcée par bilan soir "distrait"
  const tawbaForce = localStorage.getItem('niyyah_tawba_force');
  if (tawbaForce === '1') {
    localStorage.removeItem('niyyah_tawba_force');
    setTimeout(() => showTawba(), 1200);
    return;
  }

  const yesterday = getDateMinus(TODAY, 1);
  const twoDaysAgo = getDateMinus(TODAY, 2);
  // Tawba si 2+ jours sans pratiquer ET streak était > 0
  const missedYesterday = !history.days[yesterday];
  const missedTwoDays = !history.days[twoDaysAgo];
  const hadStreak = (history.bestStreak || 0) >= 1;
  if (missedYesterday && missedTwoDays && hadStreak) {
    setTimeout(() => showTawba(), 1200);
  }
}

function showTawba() {
  const overlay = document.getElementById('tawbaOverlay');
  const card    = document.getElementById('tawbaCard');

  // Calculer jours d'absence depuis localStorage (indépendant de la var globale)
  var _histRaw = {};
  try { _histRaw = JSON.parse(localStorage.getItem('spiritual_history') || '{}'); } catch(e) {}
  var _niyyahState = {};
  try { _niyyahState = JSON.parse(localStorage.getItem('niyyah_v2_state') || '{}'); } catch(e) {}

  // Utiliser niyyah_last_open pour détecter l'absence réelle
  var _lastOpen = localStorage.getItem('niyyah_last_open_prev') || localStorage.getItem('niyyah_last_open');
  var daysSince = 0;
  if (_lastOpen) {
    daysSince = Math.floor((Date.now() - parseInt(_lastOpen)) / 86400000);
  } else {
    // Fallback : dernier jour actif dans history
    var _lastActiveDate = Object.keys(_histRaw.days || {}).sort().pop();
    if (_lastActiveDate) {
      daysSince = Math.floor((new Date(TODAY) - new Date(_lastActiveDate)) / 86400000);
    }
  }

  // Logique XP/Séries Option B — Miséricorde
  // Streak préservé jusqu'à 7j, puis reset doux (pas de perte de niveau)
  if (daysSince >= 2 && daysSince < 7) {
    // Jours manqués = "jours de repos" — streak en pause, pas perdu
    // Aucune action sur le score, on préserve tout
  } else if (daysSince >= 7) {
    // Reset doux du streak uniquement (pas du niveau ni des badges)
    if (history.streak > 0) {
      history.streak = 0;
      try { localStorage.setItem('spiritual_history', JSON.stringify(history)); } catch(e) {}
    }
  }

  // Choisir message — prioriser les exclusives si longue absence
  let msg;
  if (daysSince >= 7) {
    const exclusives = TAWBA_MESSAGES.filter(function(m) { return m.exclusive; });
    msg = exclusives[Math.floor(Math.random() * exclusives.length)];
  } else {
    const normals = TAWBA_MESSAGES.filter(function(m) { return !m.exclusive; });
    msg = normals[Math.floor(Math.random() * normals.length)];
  }

  // Appliquer la couleur du message à l'interface
  const accentColor = msg.color || '#D4AF37';
  document.documentElement.style.setProperty('--main-color', accentColor);
  if (card) {
    card.style.borderColor = accentColor + '33';
    card.style.boxShadow   = '0 0 60px ' + accentColor + '15, 0 40px 80px rgba(0,0,0,0.9)';
  }

  // Remplir le contenu
  document.getElementById('tawbaTitle').textContent    = msg.title;
  document.getElementById('tawbaSub').textContent      = msg.sub;
  document.getElementById('tawbaVerseText').textContent = '"' + msg.verse + '"';
  document.getElementById('tawbaVerseRef').textContent  = '— ' + msg.ref;

  // Badge exclusif Ibn Qayyim / Ghazali
  const exclusiveBadge = document.getElementById('tawbaExclusiveBadge');
  if (exclusiveBadge) {
    exclusiveBadge.style.display = msg.exclusive ? 'block' : 'none';
  }

  // Info streak avec message bienveillant
  const streakEl = document.getElementById('tawbaStreakInfo');
  if (streakEl) {
    if (daysSince < 7 && history.bestStreak > 0) {
      streakEl.textContent = "Ton chemin de " + history.bestStreak + " jours t'attend toujours.";
    } else if (history.bestStreak > 0) {
      streakEl.textContent = 'Nouvelle semaine, nouvelle niyyah. Bismillah.';
    } else {
      streakEl.textContent = '';
    }
  }

  // Générer étoiles avec couleur du thème
  const stars = document.getElementById('tawbaStars');
  if (stars) {
    stars.innerHTML = '';
    for (let i = 0; i < 24; i++) {
      const s = document.createElement('div');
      const size = Math.random() * 2.5 + 0.5;
      s.style.cssText = 'position:absolute;width:' + size + 'px;height:' + size + 'px;border-radius:50%;'
        + 'background:' + accentColor + ';opacity:' + (Math.random() * 0.35 + 0.05) + ';'
        + 'top:' + Math.random() * 100 + '%;left:' + Math.random() * 100 + '%;'
        + 'animation:twinkleStar ' + (2 + Math.random() * 3) + 's ease-in-out '
        + Math.random() * 2 + 's infinite alternate;';
      stars.appendChild(s);
    }
  }

  // Effet "lumière qui s'allume" — overlay plus chaud
  overlay.style.background = 'radial-gradient(ellipse at 50% 30%, ' + accentColor + '08, rgba(0,0,0,0.88))';
  overlay.style.backdropFilter = 'blur(16px)';

  overlay.style.display = 'flex';
  setTimeout(function() { if(card) card.style.transform = 'scale(1)'; }, 50);
  if (navigator.vibrate) navigator.vibrate([20, 40, 20, 40, 60]);
  localStorage.setItem('niyyah_tawba_shown', TODAY);

  // Débloquer badge Tawba si première fois
  try {
    const badges = JSON.parse(localStorage.getItem('niyyah_tawba_badges') || '{}');
    if (!badges.tawba_return) {
      badges.tawba_return = true;
      localStorage.setItem('niyyah_tawba_badges', JSON.stringify(badges));
    }
  } catch(e) {}
}

function closeTawba() {
  const overlay = document.getElementById('tawbaOverlay');
  const card    = document.getElementById('tawbaCard');
  card.style.transform  = 'scale(0.92) translateY(8px)';
  card.style.opacity    = '0';
  overlay.style.opacity = '0';
  setTimeout(function() {
    overlay.style.display = 'none';
    overlay.style.opacity = '1';
    card.style.opacity    = '1';
    card.style.transform  = 'scale(0.85)';
    // Appliquer l'infusion si une intention existe
    try {
      var s = JSON.parse(localStorage.getItem('niyyah_v2_state') || '{}');
      if (s.intention && typeof applyInfusion === 'function') applyInfusion(s.intention);
    } catch(e) {}
    // Rafraîchir le sanctuaire avec la nouvelle lumière
    if (typeof v2RefreshStats === 'function') v2RefreshStats();
    // POINT 3 — Effet visuel "Éveil" : orbe plus lumineux + message persistant 24h
    localStorage.setItem('niyyah_tawba_glow', Date.now().toString());
    applyTawbaGlow();
  }, 350);
  // Toast de bienvenue fraternel
  var toasts = [
    'Bismillah — Content de te revoir 🌿',
    'Allah est heureux de ton retour 🌟',
    'La porte était ouverte. Elle l\'est toujours. ✦'
  ];
  var t = toasts[Math.floor(Math.random() * toasts.length)];
  showToast(t);
  if (navigator.vibrate) navigator.vibrate([20, 30, 60]);
}


// ── PARTAGE NIYYAH ────────────────────────────────────────────────────────────
function partagerNiyyah() {
  // Récupérer les stats dynamiques
  const streak = history.streak || 0;
  const totalDays = history.totalDays || 0;
  
  // Jours cette semaine
  const lundi = getLundiDate ? getLundiDate() : null;
  let doneDays = 0;
  if (lundi && history.days) {
    for (let i = 0; i < 7; i++) {
      const d = new Date(lundi);
      d.setDate(d.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      if (history.days[ds]) doneDays++;
    }
  }
  
  // Niveau actuel
  const niveauLabels = { 1: 'Fondations', 2: 'Approfondissement', 3: 'Connaissance', 4: 'Rayonnement' };
  const niveauActuel = (state && state._unlocked && state._unlocked.length) 
    ? Math.max(...state._unlocked) : 1;
  const niveauLabel = niveauLabels[niveauActuel] || 'Fondations';
  
  // Score moyen de la semaine
  let avgScore = 0;
  if (history.dayScores && lundi) {
    const scores = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(lundi);
      d.setDate(d.getDate() + i);
      const ds = d.toISOString().split('T')[0];
      if (history.dayScores[ds] !== undefined) scores.push(history.dayScores[ds]);
    }
    if (scores.length) avgScore = Math.round(scores.reduce((a,b) => a+b, 0) / scores.length);
  }

  const message = `بِسْمِ اللَّهِ

Ça fait ${totalDays} jour${totalDays > 1 ? 's' : ''} que j'essaie de tenir ma pratique avec Niyyah Daily.
Cette semaine : ${doneDays}/7 jours · Niveau ${niveauLabel} · Score ${avgScore}/100

Les hauts, les bas — mais je continue.

Le Prophète ﷺ a dit : "Celui qui guide vers un bien obtient la même récompense que celui qui le fait."
— Muslim 1893

Si toi aussi tu cherches à te reconnecter à Allah, sans pression :
👉 nabs881-sketch.github.io/niyyah-app

Que Allah nous facilite et nous récompense. 🤲`;

  // Essayer l'API native de partage (mobile)
  if (navigator.share) {
    navigator.share({
      title: 'Niyyah Daily — Pratique spirituelle',
      text: message,
      url: 'https://nabs881-sketch.github.io/niyyah-app'
    }).catch(() => {
      // Fallback WhatsApp
      _ouvrirWhatsApp(message);
    });
  } else {
    // Fallback WhatsApp direct
    _ouvrirWhatsApp(message);
  }
}

function _ouvrirWhatsApp(message) {
  const url = 'https://wa.me/?text=' + encodeURIComponent(message);
  window.open(url, '_blank');
}
// ─────────────────────────────────────────────────────────────────────────────

function closeWeeklyBilan() {
  document.getElementById('weeklyOverlay').classList.remove('show');
  document.body.style.overflow = '';
  localStorage.setItem('niyyah_bilan_week', getCurrentWeekKey());
}
function getCurrentWeekKey() {
  const d = new Date(TODAY);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  return d.toISOString().split('T')[0];
}
function checkWeeklyBilan() {
  const today = new Date(TODAY);
  const isMonday = today.getDay() === 1;
  const lastShown = localStorage.getItem('niyyah_bilan_week');
  const thisWeek = getCurrentWeekKey();
  if (isMonday && lastShown !== thisWeek && (history.totalDays || 0) >= 1) {
    setTimeout(showWeeklyBilan, 1500);
  }
}
const FREEMIUM_CODES = ['BISMILLAH'];
const _freemiumUnlocked = localStorage.getItem('niyyah_pro') === '1';
function openFreemium() {
  document.getElementById('freemiumOverlay').classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeFreemium(e) {
  if (e && e.target !== document.getElementById('freemiumOverlay')) return;
  document.getElementById('freemiumOverlay').classList.remove('show');
  document.body.style.overflow = '';
}
/* ══ STATUT PREMIUM ══ */
function isPremium() {
  return localStorage.getItem('niyyah_pro') === '1';
}

function openGumroad() {
  window.open('https://optimizerprocess.gumroad.com/l/rlivu', '_blank');
}
function validateFreemiumCode() {
  const input = document.getElementById('freemiumCodeInput');
  if (!input) return;
  const code = input.value.trim().toUpperCase();
  if (FREEMIUM_CODES.includes(code)) {
    localStorage.setItem('niyyah_pro', '1');
    state._unlocked = [1, 2, 3, 4];
    saveState();
    document.getElementById('freemiumOverlay').classList.remove('show');
    document.body.style.overflow = '';
    renderTabs();
    renderLevel(currentLevel);
    showToast('✅ Accès complet débloqué — Barakallahu feek !');
    if (navigator.vibrate) navigator.vibrate([30, 50, 100]);
  } else {
    input.style.borderColor = '#ff3b30';
    input.placeholder = 'Code invalide — réessaie';
    input.value = '';
    setTimeout(() => { input.style.borderColor = ''; input.placeholder = 'CODE D\'ACCÈS'; }, 2000);
  }
}
let _prayerTimers = [];
let _prayerReminderTimers = _prayerTimers; 
const PRAYER_EMOJIS = { Fajr: '🌙', Dhuhr: '☀️', Asr: '🌤️', Maghrib: '🌅', Isha: '🌙' };
const PRAYER_FR = { Fajr: 'Fajr', Dhuhr: 'Dhouhr', Asr: 'Asr', Maghrib: 'Maghrib', Isha: 'Icha' };
function clearPrayerReminders() {
  _prayerTimers.forEach(t => clearTimeout(t));
  _prayerTimers = [];
  _prayerReminderTimers = _prayerTimers;
}

// ══════════════════════════════════════════════════════════════════════════════
// SYSTÈME DE NOTIFICATIONS INTELLIGENTES — NIYYAH
// ══════════════════════════════════════════════════════════════════════════════

// Messages spirituels rotatifs (11h00)
/* ══ LES MURMURES — Messages spirituels adaptés à l'intention ══ */
const MURMURES = {
  // Par intention choisie le matin
  "se rapprocher d\'Allah": {
    matin:  [
      { body: "Ton cœur se souvient de Lui", icon: "🌟" },
      { body: "Un souffle de Dhikr avant de commencer", icon: "📿" },
      { body: "Allah est proche — plus que ta veine jugulaire", icon: "✨" },
    ],
    midi:   [
      { body: "Entre deux tâches — un instant vers Allah", icon: "🌟" },
      { body: "SubhanAllah. Trois secondes. Il entend.", icon: "📿" },
      { body: "Ta journée a une âme. Rappelle-le-toi.", icon: "✨" },
    ],
    soir:   [
      { body: "La nuit est douce pour ceux qui reviennent", icon: "🌙" },
      { body: "Avant de fermer les yeux — Al-Hamdulillah", icon: "🌙" },
      { body: "Il t\'a gardé aujourd\'hui. Dis-Lui merci.", icon: "🌙" },
    ],
  },
  "tenir mes engagements": {
    matin:  [
      { body: "Ta parole d\'aujourd\'hui — tiens-la", icon: "🤝" },
      { body: "Un engagement tenu vaut mille intentions", icon: "💪" },
      { body: "Commence par le plus petit. Le reste suivra.", icon: "🎯" },
    ],
    midi:   [
      { body: "Mi-journée. Tes engagements respirent.", icon: "🤝" },
      { body: "Ce que tu avais promis ce matin — où en es-tu ?", icon: "💪" },
      { body: "La constance est une forme de noblesse", icon: "⭐" },
    ],
    soir:   [
      { body: "Ce que tu as tenu aujourd\'hui compte", icon: "🌙" },
      { body: "Bilan doux : qu\'as-tu honoré ?", icon: "🌙" },
      { body: "Demain, un engagement. Juste un.", icon: "🌙" },
    ],
  },
  "me reconstruire": {
    matin:  [
      { body: "Une brique posée vaut mieux qu\'un mur rêvé", icon: "🌱" },
      { body: "Tu recommences. C\'est déjà une victoire.", icon: "💚" },
      { body: "Allah aime celui qui revient. Tu es en chemin.", icon: "🌿" },
    ],
    midi:   [
      { body: "Tu avances. Même lentement, tu avances.", icon: "🌱" },
      { body: "Un pas. Juste un. Bismillah.", icon: "💚" },
      { body: "La reconstruction prend du temps. Patience.", icon: "🌿" },
    ],
    soir:   [
      { body: "Se reconstruire prend du temps. Tu es en chemin.", icon: "🌙" },
      { body: "Aujourd\'hui tu as tenu. Ça compte infiniment.", icon: "🌙" },
      { body: "Demain est une page blanche offerte par Allah.", icon: "🌙" },
    ],
  },
  "être reconnaissant": {
    matin:  [
      { body: "Nomme une chose belle de ce matin", icon: "🙏" },
      { body: "Al-Hamdulillah — la plus lourde des paroles", icon: "✨" },
      { body: "Tu respires. Quelqu\'un ne le peut plus.", icon: "🌸" },
    ],
    midi:   [
      { body: "Quelque chose t\'a souri aujourd\'hui ?", icon: "🙏" },
      { body: "Une grâce cachée dans ta journée ordinaire", icon: "✨" },
      { body: "Dis merci à quelqu\'un. C\'est une sadaqa.", icon: "🌸" },
    ],
    soir:   [
      { body: "Avant de dormir — merci pour quoi ?", icon: "🌙" },
      { body: "Ta journée avait de la valeur. Tu la vois ?", icon: "🌙" },
      { body: "3 choses d\'aujourd\'hui dont tu es reconnaissant", icon: "🌙" },
    ],
  },
  // Messages généraux (si pas d\'intention ou intention personnalisée)
  default: {
    matin:  [
      { body: "Un instant pour ton âme avant de commencer", icon: "🌿" },
      { body: "Bismillah — chaque acte peut être une ibadah", icon: "✨" },
      { body: "Ta journée commence avec la grâce d\'Allah", icon: "🌟" },
    ],
    midi:   [
      { body: "Un souffle de paix au cœur de la journée", icon: "🌿" },
      { body: "Rappelle-toi pourquoi tu fais ce que tu fais", icon: "✨" },
      { body: "Astaghfirullah. Le cœur léger continue mieux.", icon: "🤲" },
    ],
    soir:   [
      { body: "La nuit est un cadeau. Commence-la en paix.", icon: "🌙" },
      { body: "Ton wird du soir t\'attend. 5 minutes.", icon: "🌙" },
      { body: "Al-Hamdulillah pour cette journée, quoi qu\'il en soit.", icon: "🌙" },
    ],
  },
};

/* ══ MURMURE ADAPTATIF — s'ajuste selon l'avancement ══ */
function getMurmureAdaptatif(moment) {
  // Vérifier l'avancement des tâches du matin
  var state = {};
  var history = {};
  try {
    state   = JSON.parse(localStorage.getItem("spiritual_v2") || "{}");
    history = JSON.parse(localStorage.getItem("spiritual_history") || "{}");
  } catch(e) {}

  var todayScore = state._todayScore || state._score || 0;
  var streak     = history.streak || 0;

  // Si tâches bien avancées (>60%) → message de renforcement positif
  if (moment === "midi" && todayScore >= 60) {
    var RENFORCEMENT = [
      { body: "MashaAllah — tu tiens ton chemin aujourd'hui", icon: "✦" },
      { body: "Ta constance ce matin est une lumière", icon: "🌟" },
      { body: "Allah voit tes efforts. Continue ainsi.", icon: "✨" },
    ];
    var idx = Math.floor(Math.random() * RENFORCEMENT.length);
    return RENFORCEMENT[idx];
  }

  // Si absent depuis 2+ jours → murmure de retour doux (anti-culpabilisation)
  var lastOpen = localStorage.getItem("niyyah_last_open");
  if (lastOpen) {
    var daysSince = Math.floor((Date.now() - parseInt(lastOpen)) / 86400000);
    if (daysSince >= 2) {
      var RETOUR = [
        { body: "Tu nous as manqué. Pas de jugement. Reviens.", icon: "🌿" },
        { body: "Allah est Al-Tawwab. Sa porte est ouverte.", icon: "🤲" },
        { body: "Un seul pas suffit pour recommencer", icon: "🌱" },
      ];
      return RETOUR[Math.floor(Math.random() * RETOUR.length)];
    }
  }

  // Si streak élevé (7+) → message d'encouragement spécial
  if (streak >= 7 && moment === "matin") {
    var EXCELLENCE = [
      { body: streak + " jours. L'Istiqamah est ta marque.", icon: "⭐" },
      { body: "Une semaine de constance — rare et précieux", icon: "✦" },
    ];
    return EXCELLENCE[Math.floor(Math.random() * EXCELLENCE.length)];
  }

  // Sinon : murmure normal adapté à l'intention
  return getMurmure(moment);
}

// Sauvegarder timestamp de dernière ouverture
(function() {
  try { localStorage.setItem("niyyah_last_open", Date.now().toString()); } catch(e) {}
})();

function getMurmure(moment) {
  var s = {};
  try { s = JSON.parse(localStorage.getItem("niyyah_v2_state") || "{}"); } catch(e) {}
  var intention = (s.intention || "").toLowerCase();

  // Mots-clés de détection pour chaque thème
  var MAP = [
    { keywords: ["allah", "rapprocher", "dieu"],      key: "se rapprocher d'Allah" },
    { keywords: ["engagement", "engagements", "tenir"], key: "tenir mes engagements" },
    { keywords: ["reconstruire", "reconstruction"],   key: "me reconstruire" },
    { keywords: ["reconnaissant", "gratitude", "merci"], key: "être reconnaissant" },
  ];

  var theme = MURMURES["default"];
  for (var i = 0; i < MAP.length; i++) {
    var entry = MAP[i];
    for (var j = 0; j < entry.keywords.length; j++) {
      if (intention.indexOf(entry.keywords[j]) !== -1) {
        theme = MURMURES[entry.key] || MURMURES["default"];
        break;
      }
    }
    if (theme !== MURMURES["default"]) break;
  }

  var pool = theme[moment] || theme.matin;
  var dayIdx = Math.floor(Date.now() / 86400000);
  var randomOffset = Math.floor(Math.random() * pool.length);
  return pool[(dayIdx + randomOffset) % pool.length];
}

// Compatibilité ancienne API
const NOTIF_MESSAGES_MATIN = MURMURES.default.matin;
const NOTIF_MESSAGES_SOIR  = MURMURES.default.soir;

let _notifTimers = [];

function clearNotifTimers() {
  _notifTimers.forEach(t => clearTimeout(t));
  _notifTimers = [];
}

// ── Afficher l'écran de permission après onboarding ──────────────────────────
function showNotifPermScreen() {
  try {
  if (localStorage.getItem('niyyah_notif_asked') === '1') return;
  if (!('Notification' in window)) return;
  if (Notification.permission === 'granted') {
    localStorage.setItem('niyyah_notif_asked', '1');
    scheduleAllNotifications();
    return;
  }
  const screen = document.getElementById('notifPermScreen');
  if (screen) {
    screen.classList.add('show');
  }
  } catch(e) { /* MIUI */ }
}

function dismissNotifScreen() {
  const screen = document.getElementById('notifPermScreen');
  if (screen) {
    screen.style.opacity = '0';
    setTimeout(() => screen.classList.remove('show'), 400);
  }
  localStorage.setItem('niyyah_notif_asked', '1');
  // Si on vient de l'onboarding, lancer l'écran Niyyah
  if (!localStorage.getItem('niyyah_intention_date') || 
      localStorage.getItem('niyyah_intention_date') !== new Date().toISOString().split('T')[0]) {
    setTimeout(() => showNiyyahScreen(), 450);
  }
}

function requestNotifPermission() {
  if (!('Notification' in window)) {
    dismissNotifScreen();
    showToast('Les notifications ne sont pas supportées sur cet appareil');
    return;
  }
  try {
    Notification.requestPermission().then(permission => {
      dismissNotifScreen();
      if (permission === 'granted') {
        showToast('✦ Rappels activés — JazakAllahu khairan !');
        localStorage.setItem('niyyah_notif_perm', '1');
        scheduleAllNotifications();
      } else {
        showToast('Tu pourras les activer plus tard dans les paramètres');
      }
    }).catch(() => {
      dismissNotifScreen();
      showToast('Rappels non disponibles sur cet appareil');
    });
  } catch(e) {
    dismissNotifScreen();
    showToast('Rappels non disponibles sur cet appareil');
  }
}

// ── Planifier les 3 notifications de la journée ───────────────────────────────
function scheduleAllNotifications() {
  try { if (Notification.permission !== 'granted') return; } catch(e) { return; }
  clearNotifTimers();

  const now = new Date();
  const nowMs = now.getTime();

  function scheduleAt(h, m, moment, titlePrefix) {
    var t = new Date();
    t.setHours(h, m + Math.floor(Math.random() * 12), 0, 0); // ±12min d'aléatoire anti-habitude
    var ms = t.getTime() - nowMs;
    if (ms > 0 && ms < 86400000) {
      _notifTimers.push(setTimeout(function() {
        // Logique conditionnelle : adapter selon l'avancement du jour
        var msg = getMurmureAdaptatif(moment);
        sendNotification(titlePrefix + ' ' + msg.icon, msg.body, msg.icon, moment);
      }, ms));
    }
  }

  // 1. Fajr +15min — Ancrage de l'intention
  if (_prayerTimes && _prayerTimes['Fajr']) {
    const parts = _prayerTimes['Fajr'].split(':');
    const fajrTime = new Date();
    fajrTime.setHours(parseInt(parts[0]), parseInt(parts[1]) + 15, 0, 0);
    const ms = fajrTime.getTime() - nowMs;
    if (ms > 0 && ms < 86400000) {
      _notifTimers.push(setTimeout(() => {
        const msg = getMurmure('matin');
        sendNotification('Niyyah ' + msg.icon, msg.body, msg.icon);
      }, ms));
    }
  } else {
    scheduleAt(7, 0, 'matin', 'Niyyah');
  }

  // 2. 12h30 — Transition déjeuner (pic de stress)
  scheduleAt(12, 30, 'midi', 'Niyyah');

  // 3. 17h00 — Trajet retour (transition)
  scheduleAt(17, 0, 'midi', 'Niyyah');

  // 4. Après Maghrib / 21h30 — Solitude nocturne
  if (_prayerTimes && _prayerTimes['Maghrib']) {
    const parts = _prayerTimes['Maghrib'].split(':');
    const t = new Date();
    t.setHours(parseInt(parts[0]), parseInt(parts[1]) + 10, 0, 0);
    const ms = t.getTime() - nowMs;
    if (ms > 0 && ms < 86400000) {
      _notifTimers.push(setTimeout(() => {
        const msg = getMurmure('soir');
        sendNotification('Niyyah ' + msg.icon, msg.body, msg.icon);
      }, ms));
    }
  } else {
    scheduleAt(21, 30, 'soir', 'Niyyah');
  }
}

function sendNotification(title, body, icon, moment) {
  try { if (Notification.permission !== 'granted') return; } catch(e) { return; }
  try {
    // Action buttons — Murmure Interactif
    var actions = [];
    if (moment === 'matin') {
      actions = [
        { action: 'done',  title: "C'est fait ✓" },
        { action: 'dua',   title: "Une dou'a 🤲" }
      ];
    } else if (moment === 'midi') {
      actions = [
        { action: 'done',  title: "Bismillah ✓" },
        { action: 'open',  title: "Ouvrir l'app" }
      ];
    } else {
      actions = [
        { action: 'wird',  title: "Wird du soir 🌙" },
        { action: 'done',  title: "Al-Hamdulillah ✓" }
      ];
    }

    var notifOptions = {
      body: body,
      icon: './icon-192.png',
      badge: './icon-192.png',
      tag: 'niyyah-murmure-' + (moment || 'general'),
      vibrate: [40, 20, 40],
      requireInteraction: false,
      silent: false,
      data: { url: './', moment: moment, action_taken: false },
      actions: actions
    };

    if ('serviceWorker' in navigator && navigator.serviceWorker.controller && location.protocol !== 'null:') {
      navigator.serviceWorker.ready.then(function(reg) {
        reg.showNotification(title, notifOptions);
      }).catch(function() {
        new Notification(title, { body: body, icon: './icon-192.png' });
      });
    } else {
      new Notification(title, { body: body, icon: './icon-192.png' });
    }
  } catch(e) {
    showToast(icon + ' ' + body.substring(0, 60));
  }
}

// Re-planifier chaque jour au chargement
function initNotifications() {
  try {
    if (!('Notification' in window)) return;
    // Sauvegarder le timestamp d'ouverture pour l'anti-désactivation
    try { localStorage.setItem("niyyah_last_open", Date.now().toString()); } catch(e) {}

    setTimeout(function() {
      try {
        if (Notification.permission === 'granted') {
          localStorage.setItem('niyyah_notif_perm', '1');

          // Anti-désactivation : si l'utilisateur ignore les notifs depuis 5j+
          // → réduire à 1 seule notification/jour pour ne pas surcharger
          var lastOpen = localStorage.getItem("niyyah_last_open_prev");
          var daysSince = lastOpen ? Math.floor((Date.now() - parseInt(lastOpen)) / 86400000) : 0;
          localStorage.setItem("niyyah_last_open_prev", Date.now().toString());

          if (daysSince >= 5) {
            // Mode silencieux : 1 seul murmure doux le soir
            var msg = getMurmure("soir");
            var t = new Date(); t.setHours(20, 0, 0, 0);
            var ms = t.getTime() - Date.now();
            if (ms > 0) setTimeout(function() {
              sendNotification("Niyyah " + msg.icon, msg.body, msg.icon, "soir");
            }, ms);
          } else {
            scheduleAllNotifications();
          }
        }
      } catch(e) {}
    }, 1000);
  } catch(e) {}
}

// ── Bouton toggle notifications dans l'app ────────────────────────────────────
function toggleNotifications() {
  if (!('Notification' in window)) {
    showToast('Notifications non supportées sur cet appareil');
    return;
  }
  if (Notification.permission === 'granted') {
    // Désactiver (on ne peut pas révoquer, mais on arrête de planifier)
    clearNotifTimers();
    localStorage.setItem('niyyah_notif_perm', '0');
    showToast('🔕 Rappels désactivés');
  } else {
    requestNotifPermission();
  }
}
// ══════════════════════════════════════════════════════════════════════════════

function schedulePrayerReminders() {
  clearPrayerReminders();
  if (!_prayerTimes) return;
  const now = new Date();
  const nowMs = now.getTime();
  PRAYER_NAMES.forEach(name => {
    const timeStr = _prayerTimes[name];
    if (!timeStr) return;
    const parts = timeStr.split(':');
    const prayerTime = new Date();
    prayerTime.setHours(parseInt(parts[0]), parseInt(parts[1]), 0, 0);
    const msUntil = prayerTime.getTime() - nowMs;
    if (msUntil > 0 && msUntil < 86400000) {
      const t = setTimeout(() => {
        const emoji = PRAYER_EMOJIS[name] || '🕌';
        const fr = PRAYER_FR[name] || name;
        showToast(emoji + ' Il est l\'heure de ' + fr + ' — الله أكبر');
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          [440, 550, 660].forEach((freq, i) => {
            const o = ctx.createOscillator();
            const g = ctx.createGain();
            o.connect(g); g.connect(ctx.destination);
            o.frequency.value = freq; o.type = 'sine';
            g.gain.setValueAtTime(0, ctx.currentTime + i * 0.15);
            g.gain.linearRampToValueAtTime(0.18, ctx.currentTime + i * 0.15 + 0.05);
            g.gain.linearRampToValueAtTime(0, ctx.currentTime + i * 0.15 + 0.3);
            o.start(ctx.currentTime + i * 0.15);
            o.stop(ctx.currentTime + i * 0.15 + 0.3);
          });
        } catch(e) {}
        renderLevel(currentLevel);
      }, msUntil);
      _prayerTimers.push(t);
    }
  });
  // Personalized Fajr notification
  scheduleFajrNotification();
}
function scheduleFajrNotification() {
  if (!_prayerTimes || !_prayerTimes['Fajr']) return;
  if (Notification.permission === 'default') Notification.requestPermission();
  if (Notification.permission !== 'granted') return;
  var parts = _prayerTimes['Fajr'].replace(/ *\(.*\)/, '').split(':');
  var fajrTime = new Date();
  fajrTime.setHours(parseInt(parts[0], 10), parseInt(parts[1], 10), 0, 0);
  var msUntil = fajrTime.getTime() - Date.now();
  if (msUntil <= 0 || msUntil >= 86400000) return;
  var _intentionType = localStorage.getItem('niyyah_intention_type') || '';
  var _msgs = {
    rapprochement: "🌅 Fajr — Rapproche-toi d'Allah ce matin",
    engagement: "🌅 Fajr — Tiens tes engagements aujourd'hui",
    reconstruction: "🌅 Fajr — Chaque matin est une renaissance",
    gratitude: "🌅 Fajr — Commence par le shukr"
  };
  var _body = _msgs[_intentionType] || "🌅 L'heure de Fajr est arrivée · Niyyah Daily";
  window._fajrNotifTimer = setTimeout(function() {
    new Notification('Niyyah Daily', { body: _body, icon: 'icon-512.png', tag: 'fajr-notif' });
  }, msUntil);
}
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;
let _qiblaAngle = null;
let _qiblaLoading = false;
let _qiblaError = null;
let _qiblaOpen = false;
let _deviceHeading = null;
let _compassActive = false;
let _compassListener = null;
function startCompass() {
  if (_compassActive) return;
  if (typeof AbsoluteOrientationSensor !== 'undefined') {
    try {
      Promise.all([
        navigator.permissions.query({ name: 'accelerometer' }),
        navigator.permissions.query({ name: 'magnetometer' }),
        navigator.permissions.query({ name: 'gyroscope' })
      ]).then(results => {
        if (results.every(r => r.state !== 'denied')) {
          try {
            const sensor = new AbsoluteOrientationSensor({ frequency: 10, referenceFrame: 'screen' });
            sensor.addEventListener('reading', () => {
              const q = sensor.quaternion;
              if (!q) return;
              const heading = Math.atan2(
                2 * (q[0]*q[1] + q[2]*q[3]),
                1 - 2 * (q[1]*q[1] + q[2]*q[2])
              ) * (180 / Math.PI);
              _updateNeedle((360 - heading + 360) % 360);
            });
            sensor.addEventListener('error', () => _attachCompass());
            sensor.start();
            _compassActive = true;
            return;
          } catch(e) { _attachCompass(); }
        } else { _attachCompass(); }
      }).catch(() => _attachCompass());
      return;
    } catch(e) {  }
  }
  if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
    DeviceOrientationEvent.requestPermission()
      .then(s => { if (s === 'granted') _attachCompass(); else showToast('Autorise la boussole dans les réglages'); })
      .catch(() => _attachCompass());
  } else {
    _attachCompass();
  }
}
function _updateNeedle(heading) {
  if (heading === null || heading === undefined) return;
  _deviceHeading = heading;
  _compassActive = true;
  const needle = document.getElementById('qiblaNeedleSvg');
  if (needle && _qiblaAngle !== null) {
    const visual = (_qiblaAngle - _deviceHeading + 360) % 360;
    needle.setAttribute('transform', 'rotate(' + visual + ', 150, 150)');
    const angleEl = document.getElementById('qiblaAngleDisplay');
    if (angleEl) angleEl.textContent = Math.round(visual) + '°';
    const subEl = document.getElementById('qiblaSub');
    if (subEl) {
      if (visual < 10 || visual > 350) {
        subEl.className = 'qibla-aligned';
        subEl.textContent = '✦ Tu es aligné avec La Mecque !';
      } else {
        subEl.className = 'qibla-sub';
        subEl.textContent = '🔴 Tourne vers l\'aiguille dorée';
      }
    }
  }
}
function _attachCompass() {
  if (_compassListener) {
    window.removeEventListener('deviceorientationabsolute', _compassListener);
    window.removeEventListener('deviceorientation', _compassListener);
  }
  let _hasAbsolute = false;
  let _eventCount = 0;
  _compassListener = function(e) {
    _eventCount++;
    if (e.webkitCompassHeading !== undefined && e.webkitCompassHeading !== null) {
      _updateNeedle(e.webkitCompassHeading);
      return;
    }
    if (e.absolute === true && e.alpha !== null) {
      _hasAbsolute = true;
      _updateNeedle((360 - e.alpha) % 360);
      return;
    }
    if (e.alpha !== null) {
      _updateNeedle((360 - e.alpha) % 360);
    }
    if (_eventCount === 30 && !_hasAbsolute) {
      const subEl = document.getElementById('qiblaSub');
      if (subEl) subEl.textContent = '⚠️ Calibre ton téléphone (fais un 8 dans l\'air)';
    }
  };
  window.addEventListener('deviceorientationabsolute', _compassListener, true);
  window.addEventListener('deviceorientation', _compassListener, true);
}
function stopCompass() {
  if (_compassListener) {
    window.removeEventListener('deviceorientationabsolute', _compassListener);
    window.removeEventListener('deviceorientation', _compassListener);
  }
  _compassActive = false;
  _deviceHeading = null;
}
function calcQiblaAngle(lat, lng) {
  const φ1 = lat * Math.PI / 180;
  const φ2 = KAABA_LAT * Math.PI / 180;
  const Δλ = (KAABA_LNG - lng) * Math.PI / 180;
  const x = Math.sin(Δλ) * Math.cos(φ2);
  const y = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(x, y);
  return ((θ * 180 / Math.PI) + 360) % 360;
}
function loadQibla() {
  _qiblaLoading = true;
  _qiblaError = null;
  renderLevel(currentLevel);
  if (!navigator.geolocation) {
    _qiblaError = 'Géolocalisation non disponible';
    _qiblaLoading = false;
    renderLevel(currentLevel);
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => {
      _qiblaAngle = calcQiblaAngle(pos.coords.latitude, pos.coords.longitude);
      _qiblaLoading = false;
      renderLevel(currentLevel);
    },
    err => {
      _qiblaError = 'Autorise la localisation pour trouver la Qibla';
      _qiblaLoading = false;
      renderLevel(currentLevel);
    },
    { timeout: 8000, maximumAge: 300000 }
  );
}
function renderQiblaCard() {
  const chevron = '<svg width="16" height="16" viewBox="0 0 14 14" style="transition:transform 0.2s;transform:' + (_qiblaOpen ? 'rotate(180deg)' : 'rotate(0deg)') + ';color:var(--gold);flex-shrink:0;"><polyline points="3,5 7,9 11,5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round"/></svg>';
  const headerHtml = '<div class="qibla-card"><div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:' + (_qiblaOpen ? '12' : '0') + 'px;" onclick="_qiblaOpen=!_qiblaOpen;if(!_qiblaOpen)stopCompass();renderLevel(currentLevel)"><div class="qibla-title" style="margin-bottom:0;">🕋 Qibla — Direction de La Mecque</div>' + chevron + '</div>';
  if (!_qiblaOpen) return headerHtml + '</div>';
  if (_qiblaLoading) return headerHtml + '<div style="font-size:13px;color:var(--t3);padding:16px 0;text-align:center;">📍 Localisation...</div></div>';
  if (_qiblaError) return headerHtml + '<div style="font-size:13px;color:var(--t3);padding:8px 0;">' + _qiblaError + '</div><button class="qibla-btn" onclick="loadQibla()">Réessayer</button></div>';
  if (_qiblaAngle === null) return headerHtml + '<div style="font-size:13px;color:var(--t2);margin-bottom:14px;text-align:center;">Trouve la direction de La Mecque depuis ta position</div><button class="qibla-btn" onclick="loadQibla()">📍 Trouver la Qibla</button></div>';
  const angle = Math.round(_qiblaAngle);
  const visualAngle = _deviceHeading !== null ? (_qiblaAngle - _deviceHeading + 360) % 360 : angle;
  const dirs = ['N','NE','E','SE','S','SO','O','NO'];
  const dir = dirs[Math.round(angle / 45) % 8];
  const isLive = _compassActive && _deviceHeading !== null;
  const isAligned = isLive && (visualAngle < 10 || visualAngle > 350);
  setTimeout(() => startCompass(), 100);
  const staticSvg = '<circle cx=\"150\" cy=\"150\" r=\"130\" fill=\"none\" stroke=\"rgba(200,168,80,0.6)\" stroke-width=\"1\"/><circle cx=\"150\" cy=\"150\" r=\"104\" fill=\"none\" stroke=\"rgba(200,168,80,0.28)\" stroke-width=\"1\"/><circle cx=\"150\" cy=\"150\" r=\"78\" fill=\"none\" stroke=\"rgba(200,168,80,0.16)\" stroke-width=\"1\"/><line x1=\"150.0\" y1=\"20.0\" x2=\"150.0\" y2=\"36.0\" stroke=\"rgba(210,178,90,0.95)\" stroke-width=\"2.5\"/><line x1=\"161.3\" y1=\"20.5\" x2=\"160.9\" y2=\"25.5\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"172.6\" y1=\"22.0\" x2=\"171.2\" y2=\"29.9\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"183.6\" y1=\"24.4\" x2=\"182.4\" y2=\"29.3\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"194.5\" y1=\"27.8\" x2=\"191.7\" y2=\"35.4\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"204.9\" y1=\"32.2\" x2=\"202.8\" y2=\"36.7\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"215.0\" y1=\"37.4\" x2=\"211.0\" y2=\"44.3\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"224.6\" y1=\"43.5\" x2=\"221.7\" y2=\"47.6\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"233.6\" y1=\"50.4\" x2=\"228.4\" y2=\"56.5\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"241.9\" y1=\"58.1\" x2=\"233.4\" y2=\"66.6\" stroke=\"rgba(210,178,90,0.72)\" stroke-width=\"1.8\"/><line x1=\"249.6\" y1=\"66.4\" x2=\"243.5\" y2=\"71.6\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"256.5\" y1=\"75.4\" x2=\"252.4\" y2=\"78.3\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"262.6\" y1=\"85.0\" x2=\"255.7\" y2=\"89.0\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"267.8\" y1=\"95.1\" x2=\"263.3\" y2=\"97.2\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"272.2\" y1=\"105.5\" x2=\"264.6\" y2=\"108.3\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"275.6\" y1=\"116.4\" x2=\"270.7\" y2=\"117.6\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"278.0\" y1=\"127.4\" x2=\"270.1\" y2=\"128.8\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"279.5\" y1=\"138.7\" x2=\"274.5\" y2=\"139.1\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"280.0\" y1=\"150.0\" x2=\"264.0\" y2=\"150.0\" stroke=\"rgba(210,178,90,0.95)\" stroke-width=\"2.5\"/><line x1=\"279.5\" y1=\"161.3\" x2=\"274.5\" y2=\"160.9\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"278.0\" y1=\"172.6\" x2=\"270.1\" y2=\"171.2\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"275.6\" y1=\"183.6\" x2=\"270.7\" y2=\"182.4\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"272.2\" y1=\"194.5\" x2=\"264.6\" y2=\"191.7\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"267.8\" y1=\"204.9\" x2=\"263.3\" y2=\"202.8\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"262.6\" y1=\"215.0\" x2=\"255.7\" y2=\"211.0\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"256.5\" y1=\"224.6\" x2=\"252.4\" y2=\"221.7\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"249.6\" y1=\"233.6\" x2=\"243.5\" y2=\"228.4\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"241.9\" y1=\"241.9\" x2=\"233.4\" y2=\"233.4\" stroke=\"rgba(210,178,90,0.72)\" stroke-width=\"1.8\"/><line x1=\"233.6\" y1=\"249.6\" x2=\"228.4\" y2=\"243.5\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"224.6\" y1=\"256.5\" x2=\"221.7\" y2=\"252.4\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"215.0\" y1=\"262.6\" x2=\"211.0\" y2=\"255.7\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"204.9\" y1=\"267.8\" x2=\"202.8\" y2=\"263.3\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"194.5\" y1=\"272.2\" x2=\"191.7\" y2=\"264.6\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"183.6\" y1=\"275.6\" x2=\"182.4\" y2=\"270.7\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"172.6\" y1=\"278.0\" x2=\"171.2\" y2=\"270.1\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"161.3\" y1=\"279.5\" x2=\"160.9\" y2=\"274.5\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"150.0\" y1=\"280.0\" x2=\"150.0\" y2=\"264.0\" stroke=\"rgba(210,178,90,0.95)\" stroke-width=\"2.5\"/><line x1=\"138.7\" y1=\"279.5\" x2=\"139.1\" y2=\"274.5\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"127.4\" y1=\"278.0\" x2=\"128.8\" y2=\"270.1\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"116.4\" y1=\"275.6\" x2=\"117.6\" y2=\"270.7\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"105.5\" y1=\"272.2\" x2=\"108.3\" y2=\"264.6\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"95.1\" y1=\"267.8\" x2=\"97.2\" y2=\"263.3\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"85.0\" y1=\"262.6\" x2=\"89.0\" y2=\"255.7\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"75.4\" y1=\"256.5\" x2=\"78.3\" y2=\"252.4\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"66.4\" y1=\"249.6\" x2=\"71.6\" y2=\"243.5\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"58.1\" y1=\"241.9\" x2=\"66.6\" y2=\"233.4\" stroke=\"rgba(210,178,90,0.72)\" stroke-width=\"1.8\"/><line x1=\"50.4\" y1=\"233.6\" x2=\"56.5\" y2=\"228.4\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"43.5\" y1=\"224.6\" x2=\"47.6\" y2=\"221.7\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"37.4\" y1=\"215.0\" x2=\"44.3\" y2=\"211.0\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"32.2\" y1=\"204.9\" x2=\"36.7\" y2=\"202.8\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"27.8\" y1=\"194.5\" x2=\"35.4\" y2=\"191.7\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"24.4\" y1=\"183.6\" x2=\"29.3\" y2=\"182.4\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"22.0\" y1=\"172.6\" x2=\"29.9\" y2=\"171.2\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"20.5\" y1=\"161.3\" x2=\"25.5\" y2=\"160.9\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"20.0\" y1=\"150.0\" x2=\"36.0\" y2=\"150.0\" stroke=\"rgba(210,178,90,0.95)\" stroke-width=\"2.5\"/><line x1=\"20.5\" y1=\"138.7\" x2=\"25.5\" y2=\"139.1\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"22.0\" y1=\"127.4\" x2=\"29.9\" y2=\"128.8\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"24.4\" y1=\"116.4\" x2=\"29.3\" y2=\"117.6\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"27.8\" y1=\"105.5\" x2=\"35.4\" y2=\"108.3\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"32.2\" y1=\"95.1\" x2=\"36.7\" y2=\"97.2\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"37.4\" y1=\"85.0\" x2=\"44.3\" y2=\"89.0\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"43.5\" y1=\"75.4\" x2=\"47.6\" y2=\"78.3\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"50.4\" y1=\"66.4\" x2=\"56.5\" y2=\"71.6\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"58.1\" y1=\"58.1\" x2=\"66.6\" y2=\"66.6\" stroke=\"rgba(210,178,90,0.72)\" stroke-width=\"1.8\"/><line x1=\"66.4\" y1=\"50.4\" x2=\"71.6\" y2=\"56.5\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"75.4\" y1=\"43.5\" x2=\"78.3\" y2=\"47.6\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"85.0\" y1=\"37.4\" x2=\"89.0\" y2=\"44.3\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"95.1\" y1=\"32.2\" x2=\"97.2\" y2=\"36.7\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"105.5\" y1=\"27.8\" x2=\"108.3\" y2=\"35.4\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"116.4\" y1=\"24.4\" x2=\"117.6\" y2=\"29.3\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><line x1=\"127.4\" y1=\"22.0\" x2=\"128.8\" y2=\"29.9\" stroke=\"rgba(210,178,90,0.42)\" stroke-width=\"1.2\"/><line x1=\"138.7\" y1=\"20.5\" x2=\"139.1\" y2=\"25.5\" stroke=\"rgba(210,178,90,0.2)\" stroke-width=\"0.6\"/><circle cx=\"104\" cy=\"59\" r=\"1.0\" fill=\"rgba(210,185,100,0.15)\"/><circle cx=\"35\" cy=\"152\" r=\"0.4\" fill=\"rgba(210,185,100,0.28)\"/><circle cx=\"130\" cy=\"235\" r=\"0.5\" fill=\"rgba(210,185,100,0.2)\"/><circle cx=\"183\" cy=\"266\" r=\"0.9\" fill=\"rgba(210,185,100,0.26)\"/><circle cx=\"243\" cy=\"95\" r=\"0.5\" fill=\"rgba(210,185,100,0.16)\"/><circle cx=\"100\" cy=\"232\" r=\"0.6\" fill=\"rgba(210,185,100,0.33)\"/><circle cx=\"186\" cy=\"117\" r=\"0.9\" fill=\"rgba(210,185,100,0.14)\"/><circle cx=\"197\" cy=\"131\" r=\"0.7\" fill=\"rgba(210,185,100,0.33)\"/><circle cx=\"138\" cy=\"98\" r=\"1.1\" fill=\"rgba(210,185,100,0.37)\"/><circle cx=\"83\" cy=\"169\" r=\"0.9\" fill=\"rgba(210,185,100,0.44)\"/><circle cx=\"210\" cy=\"95\" r=\"1.3\" fill=\"rgba(210,185,100,0.16)\"/><circle cx=\"129\" cy=\"217\" r=\"0.5\" fill=\"rgba(210,185,100,0.3)\"/><circle cx=\"219\" cy=\"169\" r=\"1.2\" fill=\"rgba(210,185,100,0.23)\"/><circle cx=\"201\" cy=\"175\" r=\"0.9\" fill=\"rgba(210,185,100,0.28)\"/><circle cx=\"143\" cy=\"193\" r=\"0.5\" fill=\"rgba(210,185,100,0.37)\"/><circle cx=\"234\" cy=\"94\" r=\"0.7\" fill=\"rgba(210,185,100,0.36)\"/><circle cx=\"54\" cy=\"84\" r=\"0.8\" fill=\"rgba(210,185,100,0.43)\"/><circle cx=\"41\" cy=\"137\" r=\"0.9\" fill=\"rgba(210,185,100,0.44)\"/><circle cx=\"92\" cy=\"128\" r=\"0.7\" fill=\"rgba(210,185,100,0.44)\"/><circle cx=\"66\" cy=\"80\" r=\"0.6\" fill=\"rgba(210,185,100,0.29)\"/><circle cx=\"173\" cy=\"88\" r=\"0.4\" fill=\"rgba(210,185,100,0.27)\"/><text x=\"150.0\" y=\"3.0\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#D4B860\" font-size=\"12\" font-family=\"serif\" font-weight=\"700\">N</text><text x=\"253.9\" y=\"46.1\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#B89840\" font-size=\"10\" font-family=\"serif\" font-weight=\"700\">45°</text><text x=\"297.0\" y=\"150.0\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#D4B860\" font-size=\"12\" font-family=\"serif\" font-weight=\"700\">E</text><text x=\"253.9\" y=\"253.9\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#B89840\" font-size=\"10\" font-family=\"serif\" font-weight=\"700\">135°</text><text x=\"150.0\" y=\"297.0\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#D4B860\" font-size=\"12\" font-family=\"serif\" font-weight=\"700\">S</text><text x=\"46.1\" y=\"253.9\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#B89840\" font-size=\"10\" font-family=\"serif\" font-weight=\"700\">225°</text><text x=\"3.0\" y=\"150.0\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#D4B860\" font-size=\"12\" font-family=\"serif\" font-weight=\"700\">O</text><text x=\"46.1\" y=\"46.1\" text-anchor=\"middle\" dominant-baseline=\"middle\" fill=\"#B89840\" font-size=\"10\" font-family=\"serif\" font-weight=\"700\">315°</text>';
  const needleSvg = '<polygon points=\"150,22 144,105 156,105\" fill=\"#3AEE60\" style=\"filter:drop-shadow(0 0 8px #30f060) drop-shadow(0 0 16px rgba(30,220,70,0.8));\"/><polygon points=\"150,278 144,195 156,195\" fill=\"rgba(200,160,50,0.55)\" style=\"filter:drop-shadow(0 0 4px rgba(200,160,50,0.6));\"/><circle cx=\"150\" cy=\"150\" r=\"8\" fill=\"radial-gradient(circle,#e8d060,#c89030)\"/>';
  const kSvg = '<svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;filter:drop-shadow(0 0 8px rgba(30,200,80,0.65));"><defs><linearGradient id="kF3" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#1e1808"/><stop offset="100%" stop-color="#080604"/></linearGradient></defs><rect x="5" y="12" width="26" height="22" rx="1" fill="url(#kF3)" stroke="rgba(196,168,90,0.75)" stroke-width="1"/><polygon points="31,12 38,8 38,31 31,34" fill="rgba(10,8,2,0.85)" stroke="rgba(196,168,90,0.28)" stroke-width="0.6"/><polygon points="5,12 12,8 38,8 31,12" fill="rgba(48,38,16,0.90)" stroke="rgba(196,168,90,0.50)" stroke-width="0.7"/><rect x="5" y="16" width="26" height="3" fill="rgba(196,168,90,0.20)"/><rect x="13" y="23" width="10" height="11" rx="1" fill="rgba(0,0,0,0.80)" stroke="rgba(196,168,90,0.50)" stroke-width="0.7"/></svg>';
  const fullSvg = '<svg id="qiblaMainSvg" width="300" height="300" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:100%;">'
    + '<defs>'
    + '<radialGradient id="cBg2" cx="42%" cy="38%"><stop offset="0%" stop-color="#203018"/><stop offset="40%" stop-color="#102008"/><stop offset="100%" stop-color="#040804"/></radialGradient>'
    + '<radialGradient id="cGl2" cx="50%" cy="50%"><stop offset="0%" stop-color="#28e058" stop-opacity="0.32"/><stop offset="55%" stop-color="#14a038" stop-opacity="0.10"/><stop offset="100%" stop-color="#14a038" stop-opacity="0"/></radialGradient>'
    + '</defs>'
    + '<circle cx="150" cy="150" r="149" fill="url(#cBg2)"/>'
    + '<circle cx="150" cy="150" r="134" fill="none" stroke="rgba(180,148,60,0.90)" stroke-width="3"/>'
    + '<circle cx="150" cy="150" r="139" fill="none" stroke="rgba(180,148,60,0.22)" stroke-width="2"/>'
    + staticSvg
    + '<circle cx="150" cy="150" r="52" fill="url(#cGl2)"/>'
    + '<g id="qiblaNeedleSvg" transform="rotate(' + Math.round(visualAngle) + ', 150, 150)" style="transition:transform 0.4s cubic-bezier(0.34,1.1,0.64,1);">'
    + needleSvg
    + '</g>'
    + '<circle cx="150" cy="150" r="7" fill="#E0C060" stroke="rgba(210,178,60,0.8)" stroke-width="1.5" style="filter:drop-shadow(0 0 6px rgba(210,178,60,0.9));"/>'
    + '</svg>';
  return headerHtml
    + '<div style="position:relative;width:300px;height:300px;margin:0 auto 14px;border-radius:50%;overflow:hidden;box-shadow:0 0 60px rgba(0,0,0,0.9);">'
    + fullSvg
    + kSvg
    + '</div>'
    + '<div class="qibla-angle" id="qiblaAngleDisplay">' + Math.round(visualAngle) + '°</div>'
    + '<div class="' + (isAligned ? 'qibla-aligned' : 'qibla-sub') + '" id="qiblaSub">'
    + (isAligned ? '✦ ALIGNÉ AVEC LA MECQUE ✦' : isLive ? 'Tourne vers l\'aiguille verte' : 'Direction ' + dir + ' · ' + Math.round(visualAngle) + '°')
    + '</div>'
    + '<button class="qibla-btn" onclick="loadQibla()">↻ Recalibrer</button>'
    + '</div>';
}





let _onboardStep = 0;
const APP_VERSION = '2.0'; if (localStorage.getItem('niyyah_version') !== APP_VERSION) { localStorage.removeItem('niyyah_onboard'); localStorage.setItem('niyyah_version', APP_VERSION); }
const _onboardDone = localStorage.getItem('niyyah_onboard') === '1';
const ONBOARD_SLIDES = [
  () => `
    <div class="onboard-anim"><div style="width:160px;height:160px;margin:0 auto 20px;animation:onboardFloat 3s ease-in-out infinite;"><svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" width="160" height="160"><circle cx="80" cy="80" r="76" fill="rgba(52,217,98,0.07)" stroke="rgba(52,217,98,0.3)" stroke-width="1.5"/><text x="80" y="72" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="22" font-style="italic" fill="white">Niyyah</text><text x="80" y="94" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="14" fill="#34d962">Daily</text><text x="80" y="118" text-anchor="middle" font-family="serif" font-size="26" fill="rgba(52,217,98,0.5)">&#x646;&#x650;&#x64A;&#x651;&#x629;</text></svg></div><div class="onboard-logo">Niyyah Daily</div><div class="onboard-tagline">نِيَّة · Pose ton intention</div><div class="onboard-title">Ta pratique spirituelle,<br>chaque jour</div><div class="onboard-sub">Niyyah t\'accompagne dans ton chemin vers Allah — à ton rythme, sans jugement.</div><button class="onboard-btn" onclick="onboardNext()">Commencer →</button><button class="onboard-skip" onclick="onboardFinish()">Passer</button></div>`,
  () => `
    <div class="onboard-anim"><div style="font-size:56px;text-align:center;margin-bottom:16px;">👁</div><div class="onboard-title">Le Scanner de Niyyah</div><div class="onboard-sub" style="margin-bottom:24px;">Pose ton regard sur un objet du quotidien — le Scanner te proposera une intention spirituelle pour le sacraliser.</div><div style="background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.15);border-radius:14px;padding:16px;margin-bottom:20px;text-align:center;"><div style="font-size:13px;color:rgba(255,255,255,0.7);line-height:1.6;">Ton verre d'eau, ton stylo, ton miroir...<br>Chaque objet peut porter une niyyah.</div></div><button class="onboard-btn" onclick="onboardNext()">Suivant →</button><button class="onboard-skip" onclick="onboardFinish()">Passer</button></div>`,
  () => `
    <div class="onboard-anim"><div class="onboard-title">4 niveaux de pratique</div><div class="onboard-sub" style="margin-bottom:24px;">Progresse à ton rythme — chaque niveau se débloque quand tu es prêt.</div><div class="onboard-levels"><div class="onboard-level"><div class="onboard-level-icon">🕌</div><div><div class="onboard-level-name">Fondations</div><div class="onboard-level-desc">Les 5 prières · Dhikr · Récitation</div></div></div><div class="onboard-level"><div class="onboard-level-icon">📿</div><div><div class="onboard-level-name">Approfondissement</div><div class="onboard-level-desc">Mosquée · Istighfar · Tasbih</div></div></div><div class="onboard-level"><div class="onboard-level-icon">📚</div><div><div class="onboard-level-name">Connaissance</div><div class="onboard-level-desc">Hadiths · Coran · Arabe</div></div></div><div class="onboard-level"><div class="onboard-level-icon">💚</div><div><div class="onboard-level-name">Rayonnement</div><div class="onboard-level-desc">Sadaqa · Salam · Douaas</div></div></div></div><button class="onboard-btn" onclick="onboardNext()">Suivant →</button><button class="onboard-skip" onclick="onboardFinish()">Passer</button></div>`,
  () => `
    <div class="onboard-anim"><div style="width:110px;height:110px;margin:0 auto 20px;"><svg viewBox="0 0 110 110" xmlns="http://www.w3.org/2000/svg" width="110" height="110"><circle cx="55" cy="55" r="52" fill="rgba(52,217,98,0.07)" stroke="rgba(52,217,98,0.3)" stroke-width="1.5"/><text x="55" y="50" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="15" font-style="italic" fill="white">Niyyah</text><text x="55" y="68" text-anchor="middle" font-family="Cormorant Garamond,serif" font-size="10" fill="#34d962">Daily</text><text x="55" y="86" text-anchor="middle" font-family="serif" font-size="18" fill="rgba(52,217,98,0.5)">&#x646;&#x650;&#x64A;&#x651;&#x629;</text></svg></div><div class="onboard-title">Tes horaires de prière</div><div class="onboard-sub">Entre ta ville pour afficher les horaires de Fajr, Dhuhr, Asr, Maghrib et Isha chaque jour.</div><div class="city-input-wrap" style="max-width:300px;margin-bottom:16px;"><input class="city-input" id="onboardCityInput" type="text"
          placeholder="Ex: Paris, Orléans, Casablanca..."
          
          onkeydown="if(event.key==='Enter')onboardSaveCity()"><button class="city-input-btn" onclick="onboardSaveCity()">OK</button></div><button class="onboard-btn" onclick="onboardFinish()" style="max-width:300px;">C'est parti — Bismillah 🌿</button><button class="onboard-skip" onclick="onboardFinish()">Plus tard</button></div>`
];
function onboardRender() {
  const content = document.getElementById('onboardContent');
  if (content) content.innerHTML = ONBOARD_SLIDES[_onboardStep]();
  [0,1,2,3].forEach(i => {
    const dot = document.getElementById('dot' + i);
    if (dot) dot.className = 'onboard-dot' + (i === _onboardStep ? ' active' : '');
  });
  if (_onboardStep === 3) {
    setTimeout(() => {
      const el = document.getElementById('onboardCityInput');
      if (el) el.focus();
    }, 400);
  }
}
function onboardNext() {
  if (_onboardStep < ONBOARD_SLIDES.length - 1) {
    _onboardStep++;
    onboardRender();
  } else {
    onboardFinish();
  }
}
function onboardSaveCity() {
  const el = document.getElementById('onboardCityInput');
  if (el && el.value.trim()) {
    _prayerCity = el.value.trim();
    localStorage.setItem('niyyah_city', _prayerCity);
    _showCityInput = false;
  }
  onboardFinish();
}
function onboardFinish() {
  localStorage.setItem('niyyah_onboard', '1');
  const screen = document.getElementById('onboardScreen');
  if (screen) {
    screen.style.opacity = '0';
    setTimeout(() => screen.classList.add('hidden'), 350);
  }
  if (_prayerCity) loadPrayerTimes();
  // Afficher l'écran de permission notifications après l'onboarding
  setTimeout(() => {
    if (localStorage.getItem('niyyah_notif_asked') !== '1') {
      showNotifPermScreen();
    } else {
      showNiyyahScreen();
    }
  }, 500);
}
function applyScrollScale() {
  const items = document.querySelectorAll('.items-group .item:not(.wird-inner-item)');
  if (!items.length) return;
  const centerY = window.innerHeight / 2;
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) return;
    const itemCenterY = rect.top + rect.height / 2;
    const distFromCenter = Math.abs(itemCenterY - centerY);
    const maxDist = window.innerHeight * 0.5;
    const ratio = Math.max(0, 1 - distFromCenter / maxDist);
    const scale = 0.93 + ratio * 0.07;
    const opacity = 0.55 + ratio * 0.45;
    item.style.setProperty('transform', `scale(${scale.toFixed(3)})`, 'important');
    item.style.setProperty('opacity', opacity.toFixed(3), 'important');
  });
}
let _scrollTicking = false;
function onScroll() {
  if (!_scrollTicking) {
    requestAnimationFrame(() => {
      applyScrollScale();
      _scrollTicking = false;
    });
    _scrollTicking = true;
  }
}
let currentTheme = localStorage.getItem('niyyah_theme') || 'dark';
function applyTheme(theme) {
  if (theme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
  currentTheme = theme;
  localStorage.setItem('niyyah_theme', theme);
  // Mettre à jour l'icône du bouton
  const btn = document.getElementById('btnTheme');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}
function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}
init();


/* ─── BLOC 4 : Service Worker ────────────────────── */

if ('serviceWorker' in navigator && location.protocol !== 'null:' && (location.protocol === 'https:' || location.protocol === 'http:')) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    regs.forEach(reg => reg.unregister());
  }).catch(() => {});
  window.addEventListener('load', () => { navigator.serviceWorker.register('./sw.js').catch(() => {}); });
}


/* ─── BLOC 5 : Bridge V2 ─────────────────────────── */

'use strict';

/* ─────────────────────────────────────────────
   CONSTANTES & DONNÉES I18N V2
   ───────────────────────────────────────────── */
/* ═══════════════════════════════════════════════════════
   NIYYAH V2 — SYSTÈME I18N COMPLET (FR / EN / AR)
   ═══════════════════════════════════════════════════════ */
const V2_I18N = {
  fr: {
    lang_code: 'fr',
    dir: 'ltr',
    app_name: 'Niyyah',
    slogan: 'Le Sanctuaire de l\'Intention',
    // Orbe
    orb_start: 'Définir mon intention',
    orb_resume: 'Voir mon intention',
    // Greetings
    greeting_morning:   'Que cette journée soit lumineuse',
    greeting_afternoon: 'Restez dans le souvenir d\'Allah',
    greeting_evening:   'La gratitude ferme la journée',
    // Modal
    modal_title:    'Ancrer votre Niyyah',
    modal_sub:      'Quelle est l\'intention de cette journée ?',
    modal_divider:  'ou votre propre intention',
    modal_confirm:  '✦ Ancrer cette Intention',
    modal_cancel:   'Retour',
    modal_placeholder: 'Écrivez votre intention personnelle...',
    // Chip
    chip_meta: 'Intention du jour',
    // Nav
    nav_sanctuaire: 'Sanctuaire',
    nav_pratique:   'Pratique',
    nav_wird:       'Wird',
    nav_parcours:   'Parcours',
    nav_ramadan:    'Ramadan',
    // Settings
    settings_title:   'Réglages',
    settings_lang:    'Langue',
    settings_theme:   '☀ Clair / Sombre',
    settings_ramadan: '🌙 Mode Ramadan',
    settings_reset:   '↺ Réinitialiser',
    settings_privacy: '🔒 Données 100% locales · Al-Haya',
    settings_close:   'Fermer',
    // Tawba
    tawba_title: 'Mode Tawba',
    tawba_text:  'Bienvenue de retour. Chaque instant est un nouveau départ. Il n\'y a pas de retard dans le chemin vers Lui.',
    tawba_btn:   'Reprendre le chemin',
    // Levels
    level_1: 'Fondations',
    level_2: 'Approfondissement',
    level_3: 'Connaissance',
    level_4: 'Rayonnement',
    // Stats
    stat_streak: 'Streak',
    stat_score:  'Score',
    stat_days:   'Jours',
    stat_medal:  'Médaille',
    // Toast
    toast_intention: 'Niyyah ancrée · بِسْمِ اللَّهِ',
    // Wird header
    wird_subtitle: 'Invocations du matin & du soir',
    // Intentions suggestions
    mentor_title: "Mentor d'Adab",
    mentor_sub: "Sagesse · Tazkiyat al-Nafs",
    mentor_placeholder: "Pose ta question au Mentor...",
    mentor_welcome: "Salam, frère. Je suis ici pour t'aider à élever chaque acte de ta journée par une intention juste. Dis-moi ce que tu veux accomplir aujourd'hui — je te proposerai trois niveaux de Niyyah pour le sacraliser.",
    mentor_suggestions_label: "Suggestions",
    nav_mentor: "Mentor",
    intentions: [
      'Pour la baraka dans ce que je fais aujourd\'hui',
      'Pour le bien et la protection de ma famille',
      'Pour purifier mon cœur et mes intentions',
      'Pour être utile à autrui — et plaire à Allah',
    ],
  },

  en: {
    lang_code: 'en',
    dir: 'ltr',
    app_name: 'Niyyah',
    slogan: 'The Sanctuary of Intent',
    orb_start: 'Set my Intention',
    orb_resume: 'View my Intention',
    greeting_morning:   'May this day be filled with light',
    greeting_afternoon: 'Stay in the remembrance of Allah',
    greeting_evening:   'Gratitude closes the day',
    modal_title:    'Anchor your Niyyah',
    modal_sub:      'What is the intention for this day?',
    modal_divider:  'or your own intention',
    modal_confirm:  '✦ Anchor this Intention',
    modal_cancel:   'Back',
    modal_placeholder: 'Write your personal intention...',
    chip_meta: 'Today\'s intention',
    nav_sanctuaire: 'Sanctuary',
    nav_pratique:   'Practice',
    nav_wird:       'Wird',
    nav_parcours:   'Journey',
    nav_ramadan:    'Ramadan',
    settings_title:   'Settings',
    settings_lang:    'Language',
    settings_theme:   '☀ Light / Dark',
    settings_ramadan: '🌙 Ramadan Mode',
    settings_reset:   '↺ Reset',
    settings_privacy: '🔒 100% local data · Al-Haya',
    settings_close:   'Close',
    tawba_title: 'Tawba Mode',
    tawba_text:  'Welcome back. Every moment is a fresh start. There is no delay on the path toward Him.',
    tawba_btn:   'Resume the path',
    level_1: 'Foundations',
    level_2: 'Deepening',
    level_3: 'Knowledge',
    level_4: 'Radiance',
    stat_streak: 'Streak',
    stat_score:  'Score',
    stat_days:   'Days',
    stat_medal:  'Medal',
    toast_intention: 'Niyyah anchored · بِسْمِ اللَّهِ',
    wird_subtitle: 'Morning & evening invocations',
    mentor_title: "Adab Mentor",
    mentor_sub: "Wisdom · Tazkiyat al-Nafs",
    mentor_placeholder: "Ask the Mentor...",
    mentor_welcome: "Salam, brother. I am here to help you elevate every act of your day through a righteous intention. Tell me what you wish to accomplish — I will offer you three levels of Niyyah to sanctify it.",
    mentor_suggestions_label: "Suggestions",
    nav_mentor: "Mentor",
    intentions: [
      'For barakah in all that I do today',
      'For the well-being of my family',
      'To purify my heart and intentions',
      'To be of benefit to others — and please Allah',
    ],
  },

  ar: {
    lang_code: 'ar',
    dir: 'rtl',
    app_name: 'نِيَّة',
    slogan: 'مَحْرَابُ النِّيَّةِ',
    orb_start: 'عَقْدُ النِّيَّةِ',
    orb_resume: 'رُؤْيَةُ نِيَّتِي',
    greeting_morning:   'جَعَلَ اللَّهُ يَوْمَكَ مُبَارَكًا',
    greeting_afternoon: 'دُمْ فِي ذِكْرِ اللَّهِ',
    greeting_evening:   'اخْتِمْ يَوْمَكَ بِالشُّكْرِ',
    modal_title:    'تَثْبِيتُ النِّيَّةِ',
    modal_sub:      'مَا هِيَ نِيَّةُ هَذَا الْيَوْمِ؟',
    modal_divider:  'أَوْ نِيَّتُكَ الْخَاصَّةُ',
    modal_confirm:  '✦ تَثْبِيتُ هَذِهِ النِّيَّةِ',
    modal_cancel:   'رُجُوعٌ',
    modal_placeholder: 'اكْتُبْ نِيَّتَكَ الْخَاصَّةَ...',
    chip_meta: 'نِيَّةُ الْيَوْمِ',
    nav_sanctuaire: 'الْمَحْرَابُ',
    nav_pratique:   'الْعِبَادَةُ',
    nav_wird:       'الْوِرْدُ',
    nav_parcours:   'الْمَسِيرَةُ',
    nav_ramadan:    'رَمَضَانُ',
    settings_title:   'الإِعْدَادَاتُ',
    settings_lang:    'اللُّغَةُ',
    settings_theme:   '☀ فَاتِحٌ / دَاكِنٌ',
    settings_ramadan: '🌙 وَضْعُ رَمَضَانَ',
    settings_reset:   '↺ إِعَادَةُ الضَّبْطِ',
    settings_privacy: '🔒 بَيَانَاتٌ مَحَلِّيَّةٌ · الْحَيَاءُ',
    settings_close:   'إِغْلَاقٌ',
    tawba_title: 'وَضْعُ التَّوْبَةِ',
    tawba_text:  'مَرْحَبًا بِعَوْدَتِكَ. كُلُّ لَحْظَةٍ بِدَايَةٌ جَدِيدَةٌ. لَا تَأْخِيرَ فِي طَرِيقِ الرُّجُوعِ إِلَيْهِ.',
    tawba_btn:   'اسْتِئْنَافُ الْمَسِيرَةِ',
    level_1: 'الأُسُسُ',
    level_2: 'التَّعَمُّقُ',
    level_3: 'الْعِلْمُ',
    level_4: 'الإِشْرَاقُ',
    stat_streak: 'مُتَوَالٍ',
    stat_score:  'النَّتِيجَةُ',
    stat_days:   'الأَيَّامُ',
    stat_medal:  'الْمِيدَالِيَّةُ',
    toast_intention: 'ثَبَتَتِ النِّيَّةُ · بِسْمِ اللَّهِ',
    wird_subtitle: 'أَوْرَادُ الصَّبَاحِ وَالْمَسَاءِ',
    mentor_title: "مُرَبِّي الأَدَبِ",
    mentor_sub: "الْحِكْمَةُ · تَزْكِيَةُ النَّفْسِ",
    mentor_placeholder: "اسْأَلْ مُرَبِّيَ الأَدَبِ...",
    mentor_welcome: "السَّلَامُ عَلَيْكُمْ. أَنَا هُنَا لِمُسَاعَدَتِكَ عَلَى رَفْعِ كُلِّ عَمَلٍ فِي يَوْمِكَ بِنِيَّةٍ صَحِيحَةٍ. أَخْبِرْنِي بِمَا تُرِيدُ إِنْجَازَهُ — سَأَقْتَرِحُ عَلَيْكَ ثَلَاثَةَ مُسْتَوَيَاتٍ لِلنِّيَّةِ.",
    mentor_suggestions_label: "اقْتِرَاحَاتٌ",
    nav_mentor: "الْمُرَبِّي",
    intentions: [
      'لِلْبَرَكَةِ فِيمَا أَعْمَلُ الْيَوْمَ',
      'لِخَيْرِ عَائِلَتِي وَحِمَايَتِهَا',
      'لِتَطْهِيرِ قَلْبِي وَنِيَّاتِي',
      'لِأَكُونَ نَافِعًا لِلآخَرِينَ وَأُرْضِيَ اللَّهَ',
    ],
  },
};

// Active language (detected from browser or saved)
function v2DetectLang() {
  const saved = (JSON.parse(localStorage.getItem('niyyah_v2_bridge') || '{}')).lang;
  if (saved && V2_I18N[saved]) return saved;
  // Par défaut : français (app française)
  const bl = (navigator.language || 'fr').toLowerCase();
  if (bl.startsWith('ar')) return 'ar';
  return 'fr';
}

let V2_LANG = v2DetectLang();
function t(key) { return (V2_I18N[V2_LANG] || V2_I18N.fr)[key] || key; }

/* ══ INFUSION D'INTENTION ══ */
const intentionThemes = {
  "se rapprocher d'Allah":    { color: '#D4AF37', rgb: '212,175,55',  label: 'Pour Allah' },
  "tenir mes engagements":    { color: '#A67C00', rgb: '166,124,0',   label: 'Fidélité' },
  "me reconstruire":          { color: '#7A9482', rgb: '122,148,130', label: 'Renaissance' },
  "être reconnaissant":       { color: '#E9C46A', rgb: '233,196,106', label: 'Gratitude' },
};

function getIntentionTheme(intention) {
  if (!intention) return null;
  const lower = intention.toLowerCase();
  for (const [key, theme] of Object.entries(intentionThemes)) {
    if (lower.includes(key.split(' ').slice(1).join(' ')) || lower.includes(key)) return theme;
  }
  // Intention personnalisée → Or pur par défaut
  return { color: '#D4AF37', rgb: '212,175,55', label: '' };
}

function applyInfusion(intention) {
  const theme = getIntentionTheme(intention);
  if (!theme) return;
  // Mettre à jour la variable CSS
  document.documentElement.style.setProperty('--main-color', theme.color);
  document.documentElement.style.setProperty('--main-color-rgb', theme.rgb);
  // Phrase de rappel sous le logo
  let phrase = document.getElementById('v2-infusion-phrase');
  if (!phrase) {
    phrase = document.createElement('div');
    phrase.id = 'v2-infusion-phrase';
    const greeting = document.querySelector('.greeting-v2');
    if (greeting) greeting.insertAdjacentElement('beforebegin', phrase);
  }
  if (theme.label) phrase.textContent = '✦ ' + intention;
  // Orb glow
  const orb = document.getElementById('orb-core-v2');
  if (orb) orb.style.boxShadow = '0 0 80px rgba(' + theme.rgb + ', 0.25), inset 0 0 40px rgba(' + theme.rgb + ', 0.08)';
  // Bouton Bismillah
  const bismillah = document.querySelector('.btn-bismillah');
  if (bismillah) bismillah.style.background = 'linear-gradient(135deg, ' + theme.color + ', ' + theme.color + 'aa)';
}

function checkMidnightReset() {
  const s = v2GetState();
  const today = new Date().toDateString();
  if (s.intentionDate && s.intentionDate !== today) {
    s.intention = null;
    s.intentionDate = null;
    v2SaveState(s);
    return true; // reset effectué
  }
  return false;
}

function v2SetLanguage(lang) {
  if (!V2_I18N[lang]) return;
  V2_LANG = lang;
  const s = v2GetState();
  s.lang = lang;
  v2SaveState(s);
  // Update topbar lang pill
  const langPill = document.getElementById('topbar-lang-btn');
  if (langPill) {
    langPill.textContent = lang === 'ar' ? 'عر' : lang.toUpperCase();
    langPill.style.fontFamily = lang === 'ar' ? "'Noto Naskh Arabic', serif" : "'Cinzel', serif";
    langPill.style.fontSize = lang === 'ar' ? '13px' : '10px';
  }
  v2ApplyI18n();
  v2RefreshStats();
  v2UpdateOrbState();
  // Close settings if open
  const sheet = document.getElementById('v2-settings-sheet');
  if (sheet) sheet.remove();
  // Toast confirmation
  const langNames = { fr: 'Français', en: 'English', ar: 'العربية' };
  v2ShowToast('🌐 ' + (langNames[lang] || lang));
}

function v2ApplyI18n() {
  const T = V2_I18N[V2_LANG] || V2_I18N.fr;
  const isRTL = T.dir === 'rtl';

  // HTML dir & lang
  document.documentElement.lang = T.lang_code;
  // Apply RTL only to the sanctuaire overlay, not the whole doc (V1 is LTR)
  const sanct = document.getElementById('view-sanctuaire');
  if (sanct) sanct.dir = T.dir;

  // Topbar logo
  const logo = document.querySelector('.topbar-logo-v2');
  if (logo) logo.textContent = T.app_name;

  // Greeting
  const grEl = document.getElementById('v2-greeting-text');
  if (grEl) {
    const h = new Date().getHours();
    const grKey = h < 12 ? 'greeting_morning' : h < 17 ? 'greeting_afternoon' : 'greeting_evening';
    grEl.textContent = T[grKey];
    grEl.style.direction = T.dir;
    grEl.style.fontFamily = isRTL ? "'Noto Naskh Arabic', serif" : "'Cormorant Garamond', serif";
  }

  // Orb CTA
  const cta = document.getElementById('orb-cta-v2');
  if (cta) {
    const s = v2GetState();
    cta.textContent = s.intention ? T.orb_resume : T.orb_start;
  }

  // Orb symbol always Arabic نية
  const orbSym = document.querySelector('.orb-symbol-v2');
  if (orbSym) orbSym.textContent = 'نية';

  // Chip meta
  const chipMeta = document.querySelector('.chip-meta-v2');
  if (chipMeta) { chipMeta.textContent = T.chip_meta; chipMeta.style.direction = T.dir; }

  // Level name
  const lvlNames = [T.level_1, T.level_2, T.level_3, T.level_4];
  const lvlEl = document.getElementById('v2-level-name');
  if (lvlEl) {
    try {
      const v1s = JSON.parse(localStorage.getItem('spiritual_v2') || '{}');
      const unlocked = v1s._unlocked || [1];
      const maxLvl = Math.max(...unlocked);
      lvlEl.textContent = lvlNames[maxLvl - 1] || T.level_1;
    } catch(e) { lvlEl.textContent = T.level_1; }
    lvlEl.style.direction = T.dir;
  }

  // Stats labels
  const statLabels = document.querySelectorAll('.sanct-stat-label-v2');
  const labelKeys = ['stat_streak','stat_score','stat_days','stat_medal'];
  statLabels.forEach((el, i) => { if (labelKeys[i]) el.textContent = T[labelKeys[i]]; });

  // Nav labels
  const navMap = [
    ['v2nav-sanctuaire', 'nav_sanctuaire'],
    ['v2nav-checklist',  'nav_pratique'],
    ['v2nav-wird',       'nav_wird'],
    ['v2nav-mentor',     'nav_mentor'],
    ['v2nav-progression','nav_parcours'],
  ];
  navMap.forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el) {
      const lbl = el.querySelector('.nav-v2-label');
      if (lbl) { lbl.textContent = T[key]; lbl.style.direction = T.dir; }
    }
  });

  // Tawba card
  const tawbaTitle = document.querySelector('.tawba-title-v2');
  if (tawbaTitle) tawbaTitle.textContent = T.tawba_title;
  const tawbaText = document.querySelector('.tawba-text-v2');
  if (tawbaText) { tawbaText.textContent = T.tawba_text; tawbaText.style.direction = T.dir; }
  const tawbaBtn = document.querySelector('.tawba-btn-v2');
  if (tawbaBtn) tawbaBtn.textContent = T.tawba_btn;

  // Wird view header subtitle
  const wirdSub = document.querySelector('#view-wird .header div[style*="Cormorant"]');
  if (wirdSub) { wirdSub.textContent = T.wird_subtitle; wirdSub.style.direction = T.dir; }

  // Quick action labels
  const qaMap = [
    ['pratique', T.nav_pratique   || 'Pratique'],
    ['wird',     T.nav_wird       || 'Wird'],
    ['parcours',  T.nav_parcours  || 'Parcours'],
    ['tafakkur',  T.nav_tafakkur  || 'Tafakkur'],
  ];
  document.querySelectorAll('[data-i18n-qa]').forEach(el => {
    const key = el.getAttribute('data-i18n-qa');
    const found = qaMap.find(m => m[0] === key);
    if (found) el.textContent = found[1];
  });

  // Lang buttons highlight in settings (if open)
  ['fr','en','ar'].forEach(l => {
    const btn = document.getElementById('v2-lang-' + l);
    if (btn) {
      btn.style.borderColor = l === V2_LANG ? 'rgba(212,175,55,0.5)' : 'rgba(255,255,255,0.1)';
      btn.style.color = l === V2_LANG ? '#D4AF37' : 'rgba(240,234,214,0.5)';
      btn.style.background = l === V2_LANG ? 'rgba(212,175,55,0.1)' : 'none';
    }
  });
}

// Shortcut: old V2_GREETINGS kept for compatibility
const V2_GREETINGS = {
  morning:   'Que cette journée soit lumineuse',
  afternoon: "Restez dans le souvenir d'Allah",
  evening:   'La gratitude ferme la journée',
};
const V2_INTENTIONS_FR = [
  "Pour la baraka dans ce que je fais aujourd'hui",
  "Pour le bien et la protection de ma famille",
  "Pour purifier mon cœur et mes intentions",
  "Pour être utile à autrui — et plaire à Allah",
];

/* ─────────────────────────────────────────────
   ÉTAT V2 (LocalStorage — Al-Haya)
   ───────────────────────────────────────────── */
const V2_KEY = 'niyyah_v2_bridge';

function v2GetState() {
  try {
    const raw = localStorage.getItem(V2_KEY);
    if (raw) return JSON.parse(raw);
  } catch(e) {}
  return { intention: null, intentionDate: null, lastOpenDate: null };
}

function v2SaveState(s) {
  try { localStorage.setItem(V2_KEY, JSON.stringify(s)); } catch(e) {}
}

/* ─────────────────────────────────────────────
   NAVIGATION V2
   ───────────────────────────────────────────── */
let v2CurrentView = 'sanctuaire';

function v2GoSanctuaire() {
  // Show sanctuaire + V2 UI
  document.body.classList.remove('mentor-active');
  const sanctEl = document.getElementById('view-sanctuaire');
  if (sanctEl) sanctEl.classList.add('active');
  const tbEl = document.getElementById('topbar-v2');
  if (tbEl) tbEl.classList.add('active');
  const nbEl = document.getElementById('nav-bar-v2');
  if (nbEl) nbEl.classList.add('active');
  document.body.classList.add('v2-mode');

  // Hide back button
  const backBtn = document.getElementById('v2-back-btn');
  if (backBtn) backBtn.classList.remove('visible');
  // Kill any V1 residual overlays
  ['niyyahScreen','notifPermScreen'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.style.display = 'none'; el.style.pointerEvents = 'none'; }
  });
  // Hide ALL views — both V1 .view and V2 panels
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  // Hide mentor view (not a .view class)
  const mentorView = document.getElementById('view-mentor');
  if (mentorView) { mentorView.style.display = 'none'; mentorView.classList.remove('active'); }

  // Update nav
  document.querySelectorAll('.nav-v2-item').forEach(n => n.classList.remove('active-nav'));
  const btn = document.getElementById('v2nav-sanctuaire');
  if (btn) btn.classList.add('active-nav');

  v2CurrentView = 'sanctuaire';
  v2RefreshStats();
  if (typeof renderDefiCard === 'function') renderDefiCard();
}

function v2GoTo(viewName) {
  document.body.classList.remove('mentor-active');
  // Hide sanctuaire, keep topbar-v2 visible as back-bar
  const sanctEl2 = document.getElementById('view-sanctuaire');
  if (sanctEl2) sanctEl2.classList.remove('active');
  // Cacher la vue mentor si elle est ouverte
  const mentorView2 = document.getElementById('view-mentor');
  if (mentorView2) { mentorView2.style.display = 'none'; mentorView2.classList.remove('active'); }
  // Fermer les overlays qui pourraient couvrir la vue
  if (typeof closeDefiSelector === 'function') closeDefiSelector();
  const _defOv = document.getElementById('defiSelectorOverlay');
  if (_defOv) { _defOv.style.opacity = '0'; _defOv.style.pointerEvents = 'none'; }
  // Keep topbar visible with back-arrow mode
  const tbEl2 = document.getElementById('topbar-v2');
  if (tbEl2) {
    tbEl2.classList.add('active');
    tbEl2.setAttribute('data-mode', 'back');
  }

  // Show V1 view via original switchView function
  // First unhide the target view so switchView can activate it
  const targetPre = document.getElementById('view-' + viewName);
  if (targetPre) targetPre.style.display = '';
  if (typeof switchView === 'function') {
    switchView(viewName);
  }
  // Extra safety: force renderWird if navigating to wird
  if (viewName === 'wird') {
    setTimeout(() => { if (typeof renderWird === 'function') renderWird(); }, 80);
  } else {
    // Fallback: show/hide manually
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById('view-' + viewName);
    if (target) {
      target.classList.add('active');
      // Trigger V1 renders
      if (viewName === 'wird' && typeof renderWird === 'function') renderWird();
      if (viewName === 'checklist' && typeof renderLevel === 'function') renderLevel(typeof currentLevel !== 'undefined' ? currentLevel : 1);
      if (viewName === 'progression' && typeof renderProgression === 'function') renderProgression();
    }
  }

  // Update V2 nav
  document.querySelectorAll('.nav-v2-item').forEach(n => n.classList.remove('active-nav'));
  const navBtn = document.getElementById('v2nav-' + viewName);
  if (navBtn) navBtn.classList.add('active-nav');
  // Show back button
  const backBtn = document.getElementById('v2-back-btn');
  if (backBtn) backBtn.classList.add('visible');

  v2CurrentView = viewName;
}

/* Override V1 switchView to also update V2 nav */
(function patchV1Nav() {
  const _origSwitch = typeof switchView === 'function' ? switchView : null;
  window.switchView = function(view) {
    // Hide V2 sanctuaire
    const sanct = document.getElementById('view-sanctuaire');
    if (sanct) sanct.classList.remove('active');
    const tb = document.getElementById('topbar-v2');
    if (tb) tb.classList.remove('active');

    // Update V2 nav highlight
    document.querySelectorAll('.nav-v2-item').forEach(n => n.classList.remove('active-nav'));
    const navBtn = document.getElementById('v2nav-' + view);
    if (navBtn) navBtn.classList.add('active-nav');

    // Deactivate V1 nav items (V1 uses .nav-item not .nav-v2-item)
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    v2CurrentView = view;

    if (_origSwitch) _origSwitch(view);
    else {
      document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
      const t = document.getElementById('view-' + view);
      if (t) {
        t.classList.add('active');
        if (view === 'wird' && typeof renderWird === 'function') setTimeout(renderWird, 50);
        if (view === 'checklist' && typeof renderLevel === 'function') setTimeout(() => renderLevel(typeof currentLevel !== 'undefined' ? currentLevel : 1), 50);
        if (view === 'progression' && typeof renderProgression === 'function') setTimeout(renderProgression, 50);
        if (view === 'ramadan' && typeof renderRamadan === 'function') setTimeout(renderRamadan, 50);
        if (view === 'resume' && typeof renderResume === 'function') setTimeout(renderResume, 50);
      }
    }
  };


/* ══ CAPACITOR BRIDGE — APIs natives Android/iOS ══ */
const Capacitor = {
  isNative: typeof window !== 'undefined' && !!(window.Capacitor?.isNative),

  // Haptics — vibrations précises
  async vibrate(style) {
    if (window.Capacitor?.Plugins?.Haptics) {
      try {
        if (style === 'light')  await window.Capacitor.Plugins.Haptics.impact({ style: 'LIGHT' });
        if (style === 'medium') await window.Capacitor.Plugins.Haptics.impact({ style: 'MEDIUM' });
        if (style === 'heavy')  await window.Capacitor.Plugins.Haptics.impact({ style: 'HEAVY' });
        if (style === 'heartbeat') {
          await window.Capacitor.Plugins.Haptics.impact({ style: 'MEDIUM' });
          setTimeout(() => window.Capacitor.Plugins.Haptics.impact({ style: 'LIGHT' }), 180);
        }
      } catch(e) {}
    } else if (navigator.vibrate) {
      // Fallback web
      if (style === 'heartbeat') navigator.vibrate([25, 180, 15]);
      else if (style === 'heavy') navigator.vibrate([60]);
      else navigator.vibrate([25]);
    }
  },

  // Partage natif
  async share(text) {
    if (window.Capacitor?.Plugins?.Share) {
      try {
        await window.Capacitor.Plugins.Share.share({ text });
        return true;
      } catch(e) {}
    }
    if (navigator.share) {
      try { await navigator.share({ text }); return true; } catch(e) {}
    }
    return false;
  },

  // Notification locale native
  async scheduleNotification(title, body, date, id) {
    if (window.Capacitor?.Plugins?.LocalNotifications) {
      try {
        await window.Capacitor.Plugins.LocalNotifications.schedule({
          notifications: [{
            title, body, id: id || Math.floor(Math.random() * 10000),
            schedule: { at: date },
            sound: null,
            actionTypeId: 'MURMURE',
            extra: null
          }]
        });
        return true;
      } catch(e) {}
    }
    return false; // fallback: setTimeout (web)
  }
};

// Remplacer navigator.vibrate par Capacitor.vibrate dans l'app
// Haptic Heartbeat à la confirmation d'intention
  // Exposer les fonctions globalement
  window.applyInfusion       = applyInfusion;
  window.checkMidnightReset  = checkMidnightReset;
  window.getIntentionTheme   = getIntentionTheme;
  window.v2GoSanctuaire      = v2GoSanctuaire;
  window.v2GoTo              = v2GoTo;
  window.v2OpenNiyyahModal   = v2OpenNiyyahModal;
  window.v2CloseModal        = v2CloseModal;
  window.v2ConfirmIntention  = v2ConfirmIntention;
  window.v2RefreshStats      = v2RefreshStats;
  window.v2SetLanguage       = v2SetLanguage;
  window.v2OpenSettings      = v2OpenSettings;
  window.v2ShowToast         = v2ShowToast;
  window.v2DismissTawba      = v2DismissTawba;
  window.v2GoMentor          = v2GoMentor;
  window.Capacitor           = Capacitor;
  window.mentorSend          = mentorSend;
  window.mentorAddAIMessage  = mentorAddAIMessage;
  window.mentorShareCard     = mentorShareCard;
  window.mentorUseSuggestion = mentorUseSuggestion;
})();

function v2OpenSettings() {
  const T = V2_I18N[V2_LANG] || V2_I18N.fr;
  const isRTL = T.dir === 'rtl';
  const sheet = document.createElement('div');
  sheet.id = 'v2-settings-sheet';
  sheet.style.cssText = 'position:fixed;inset:0;background:rgba(10,10,10,0.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:3000;display:flex;align-items:flex-end;justify-content:center;animation:backdropV2 0.3s ease forwards;';
  const ramadanActive = typeof ramadanState !== 'undefined' && ramadanState.active;
  sheet.innerHTML = `
    <div style="width:100%;max-width:480px;background:#111;border-radius:22px 22px 0 0;padding:26px 22px calc(32px + env(safe-area-inset-bottom));border-top:1px solid rgba(212,175,55,0.14);animation:sheetV2 0.4s cubic-bezier(0.23,1,0.32,1) forwards;direction:${T.dir};">
      <div style="width:38px;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;margin:0 auto 22px;"></div>
      <div style="font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;text-align:center;margin-bottom:22px;">${T.settings_title}</div>

      <!-- LANGUE -->
      <div style="margin-bottom:14px;">
        <div style="font-size:10px;letter-spacing:0.28em;color:rgba(212,175,55,0.45);text-transform:uppercase;font-family:'Cinzel',serif;margin-bottom:10px;text-align:center;">${T.settings_lang}</div>
        <div style="display:flex;gap:8px;justify-content:center;">
          <button id="v2-lang-fr" onclick="v2SetLanguage('fr')"
            style="padding:9px 20px;border-radius:100px;border:1px solid ${V2_LANG==='fr'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.1)'};background:${V2_LANG==='fr'?'rgba(212,175,55,0.1)':'none'};color:${V2_LANG==='fr'?'#D4AF37':'rgba(240,234,214,0.5)'};font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;">
            FR
          </button>
          <button id="v2-lang-en" onclick="v2SetLanguage('en')"
            style="padding:9px 20px;border-radius:100px;border:1px solid ${V2_LANG==='en'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.1)'};background:${V2_LANG==='en'?'rgba(212,175,55,0.1)':'none'};color:${V2_LANG==='en'?'#D4AF37':'rgba(240,234,214,0.5)'};font-family:'Cinzel',serif;font-size:12px;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;">
            EN
          </button>
          <button id="v2-lang-ar" onclick="v2SetLanguage('ar')"
            style="padding:9px 20px;border-radius:100px;border:1px solid ${V2_LANG==='ar'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.1)'};background:${V2_LANG==='ar'?'rgba(212,175,55,0.1)':'none'};color:${V2_LANG==='ar'?'#D4AF37':'rgba(240,234,214,0.5)'};font-family:'Noto Naskh Arabic',serif;font-size:15px;cursor:pointer;transition:all 0.2s;">
            عربي
          </button>
        </div>
      </div>

      <!-- AUTRES RÉGLAGES -->
      <div style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.05);border-radius:14px;overflow:hidden;margin-bottom:14px;">
        <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <div style="display:flex;gap:8px;">
            <button onclick="if(typeof toggleTheme==='function')toggleTheme();document.getElementById('v2-settings-sheet').remove();"
              style="flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:none;color:rgba(240,234,214,0.6);font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.15em;cursor:pointer;">
              ${T.settings_theme}
            </button>
          </div>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;"
          onclick="if(typeof toggleRamadanMode==='function'){toggleRamadanMode();document.getElementById('v2-settings-sheet').remove();}">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;color:rgba(240,234,214,0.7);">${T.settings_ramadan}</div>
            <div style="font-size:12px;color:rgba(245,166,35,0.6);">${ramadanActive ? '✓' : ''}</div>
          </div>
        </div>
        <div style="padding:14px 16px;cursor:pointer;"
          onclick="if(typeof confirmReset==='function'){confirmReset();document.getElementById('v2-settings-sheet').remove();}">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;color:rgba(240,234,214,0.4);">${T.settings_reset}</div>
            <div style="font-size:11px;color:rgba(240,234,214,0.18);">${T.settings_privacy}</div>
          </div>
        </div>
      </div>

      <!-- TEST NOTIF — REMOVE AFTER TESTING -->
      <button onclick="if(Notification.permission==='default')Notification.requestPermission().then(function(){new Notification('Test Fajr',{body:'Notification test'});});else new Notification('Test Fajr',{body:'Notification test'});"
        style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,0,0,0.3);background:rgba(255,0,0,0.05);color:rgba(255,100,100,0.8);font-size:11px;cursor:pointer;margin-bottom:10px;">⚠ TEST Fajr Notification</button>

      <div style="text-align:center;padding:8px;font-size:10px;color:rgba(240,234,214,0.12);font-family:'Cinzel',serif;letter-spacing:0.2em;margin-bottom:12px;">NIYYAH V2.0 · بِسْمِ اللَّهِ</div>

      <button onclick="document.getElementById('v2-settings-sheet').remove();"
        style="width:100%;padding:13px;border-radius:100px;border:1px solid rgba(255,255,255,0.07);background:none;color:rgba(240,234,214,0.38);font-family:'Cinzel',serif;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;">
        ${T.settings_close}
      </button>
    </div>`;
  sheet.onclick = function(e) { if (e.target === sheet) sheet.remove(); };
  document.body.appendChild(sheet);
}

/* ─────────────────────────────────────────────
   MODAL NIYYAH
   ───────────────────────────────────────────── */
function v2OpenNiyyahModal() {
  const T = V2_I18N[V2_LANG] || V2_I18N.fr;
  const isRTL = T.dir === 'rtl';
  // Apply i18n to modal elements
  const mTitle = document.querySelector('.modal-title-v2');
  if (mTitle) { mTitle.textContent = T.modal_title; mTitle.style.direction = T.dir; }
  const mSub = document.querySelector('.modal-sub-v2');
  if (mSub) { mSub.textContent = T.modal_sub; mSub.style.direction = T.dir; }
  const mDiv = document.querySelector('.modal-divider-v2');
  if (mDiv) { mDiv.childNodes.forEach(n => { if (n.nodeType === 3) n.textContent = T.modal_divider; }); }
  const mConfirm = document.querySelector('.btn-confirm-v2');
  if (mConfirm) mConfirm.textContent = T.modal_confirm;
  const mCancel = document.querySelector('.btn-cancel-v2');
  if (mCancel) mCancel.textContent = T.modal_cancel;
  const mInput = document.getElementById('v2-custom-intention');
  if (mInput) {
    mInput.placeholder = T.modal_placeholder;
    mInput.style.direction = T.dir;
    mInput.style.textAlign = isRTL ? 'right' : 'left';
    mInput.style.fontFamily = isRTL ? "'Noto Naskh Arabic', serif" : "'Cormorant Garamond', serif";
  }

  const opts = document.getElementById('v2-intention-opts');
  opts.innerHTML = '';
  T.intentions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'intention-opt-v2';
    btn.textContent = opt;
    btn.style.direction = (V2_I18N[V2_LANG] || V2_I18N.fr).dir;
    btn.style.fontFamily = V2_LANG === 'ar' ? "'Noto Naskh Arabic', serif" : "'Cormorant Garamond', serif";
    btn.style.fontSize = V2_LANG === 'ar' ? '16px' : '15px';
    var _holdTimer = null, _holdHintTimer = null, _holdOverlay = null;
    function _startHold(e) {
      e.preventDefault();
      opts.querySelectorAll('.intention-opt-v2').forEach(function(b) {
        b.classList.remove('sel-v2', 'intention-pressing');
        var old = b.querySelector('.hold-overlay'); if (old) old.remove();
      });
      btn.classList.add('intention-pressing');
      btn.style.position = 'relative'; btn.style.overflow = 'hidden';
      if (navigator.vibrate) navigator.vibrate(30);
      // SVG countdown circle + hint text
      _holdOverlay = document.createElement('div');
      _holdOverlay.className = 'hold-overlay';
      _holdOverlay.innerHTML = '<svg class="hold-ring" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="rgba(200,168,75,0.15)" stroke-width="2"/><circle class="hold-ring-fill" cx="16" cy="16" r="14" fill="none" stroke="#C8A84A" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="87.96" stroke-dashoffset="87.96"/></svg><span class="hold-hint" style="opacity:0;">Maintenez...</span>';
      btn.appendChild(_holdOverlay);
      // Animate ring fill
      requestAnimationFrame(function() {
        var fill = _holdOverlay.querySelector('.hold-ring-fill');
        if (fill) fill.style.strokeDashoffset = '0';
      });
      // Show hint after 0.5s
      _holdHintTimer = setTimeout(function() {
        var hint = btn.querySelector('.hold-hint');
        if (hint) hint.style.opacity = '1';
      }, 500);
      _holdTimer = setTimeout(function() {
        _cleanupOverlay();
        btn.classList.remove('intention-pressing');
        btn.classList.add('sel-v2');
        document.getElementById('v2-custom-intention').value = '';
        if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 500]);
        // Gold flash overlay — fade in/out
        var flash = document.createElement('div');
        flash.className = 'intention-gold-flash';
        document.body.appendChild(flash);
        setTimeout(function() { flash.classList.add('fade-out'); }, 50);
        setTimeout(function() { flash.remove(); }, 350);
        // Golden halo + rotating ring
        btn.classList.add('intention-confirmed-glow');
        var ring = document.createElement('div');
        ring.className = 'intention-rotate-ring';
        btn.appendChild(ring);
        setTimeout(function() {
          btn.classList.add('intention-glow-fadeout');
          setTimeout(function() {
            btn.classList.remove('intention-confirmed-glow', 'intention-glow-fadeout');
            if (ring.parentNode) ring.remove();
          }, 500);
        }, 2000);
      }, 3000);
    }
    function _cleanupOverlay() {
      if (_holdHintTimer) { clearTimeout(_holdHintTimer); _holdHintTimer = null; }
      if (_holdOverlay && _holdOverlay.parentNode) _holdOverlay.remove();
      _holdOverlay = null;
    }
    function _cancelHold() {
      if (_holdTimer) { clearTimeout(_holdTimer); _holdTimer = null; }
      _cleanupOverlay();
      btn.classList.remove('intention-pressing');
    }
    btn.addEventListener('touchstart', _startHold, { passive: false });
    btn.addEventListener('touchend', _cancelHold);
    btn.addEventListener('touchcancel', _cancelHold);
    btn.addEventListener('mousedown', _startHold);
    btn.addEventListener('mouseup', _cancelHold);
    btn.addEventListener('mouseleave', _cancelHold);
    opts.appendChild(btn);
  });

  const s = v2GetState();
  if (s.intention) document.getElementById('v2-custom-intention').value = s.intention;

  document.getElementById('niyyahModal-v2').classList.add('open');
}

function v2CloseModal() {
  document.getElementById('niyyahModal-v2').classList.remove('open');
}

function v2ConfirmIntention() {
  const selected = document.querySelector('.intention-opt-v2.sel-v2');
  const custom = document.getElementById('v2-custom-intention').value.trim();
  const intention = custom || (selected ? selected.textContent : null);
  if (!intention) return;

  const s = v2GetState();
  s.intention = intention;
  s.intentionDate = new Date().toDateString();
  v2SaveState(s);

  // Sync with V1 intention system if present
  if (typeof state !== 'undefined') {
    state.intention = intention;
    if (typeof saveState === 'function') saveState();
    // Update V1 accueil intention display
    const v1IntText = document.getElementById('accueilIntentionText');
    if (v1IntText) v1IntText.textContent = intention;
    const v1Int = document.getElementById('accueilIntention');
    if (v1Int) v1Int.style.display = 'flex';
    const v1CL = document.getElementById('checklistIntentionText');
    if (v1CL) v1CL.textContent = intention;
    const v1CLBar = document.getElementById('checklistIntentionBar');
    if (v1CLBar) v1CLBar.style.display = 'flex';
  }

  v2CloseModal();
  v2UpdateOrbState();
  applyInfusion(intention);
  if (navigator.vibrate) navigator.vibrate([100, 50, 200]);
  v2ShowToast(t('toast_intention'));
  // Golden halo on orb
  var orbWrap = document.getElementById('orb-wrap-v2');
  if (orbWrap) {
    orbWrap.classList.add('orb-intention-glow');
    setTimeout(function() {
      orbWrap.classList.add('orb-intention-glow-fadeout');
      setTimeout(function() {
        orbWrap.classList.remove('orb-intention-glow', 'orb-intention-glow-fadeout');
      }, 600);
    }, 3000);
  }
}

/* ─────────────────────────────────────────────
   REFRESH ORB & STATS depuis état V1
   ───────────────────────────────────────────── */

/* ══ POINT 3 — Éveil visuel après Tawba ══ */
function applyTawbaGlow() {
  var glowTs = localStorage.getItem('niyyah_tawba_glow');
  if (!glowTs) return;
  var hoursSince = (Date.now() - parseInt(glowTs)) / 3600000;
  if (hoursSince > 24) { localStorage.removeItem('niyyah_tawba_glow'); return; }

  // Orbe plus lumineux et plus chaud (couleur Vert Sauge = Renaissance)
  var orb = document.getElementById('orb-core-v2');
  if (orb) {
    orb.style.boxShadow = '0 0 80px rgba(135,169,107,0.35), 0 0 120px rgba(135,169,107,0.15), inset 0 0 40px rgba(135,169,107,0.08)';
    orb.style.borderColor = 'rgba(135,169,107,0.5)';
  }
  // Fond de l'orb-wrap légèrement plus chaud
  var orbWrap = document.getElementById('orb-wrap-v2');
  if (orbWrap) orbWrap.style.filter = 'brightness(1.08)';

  // Message "La porte est toujours ouverte" sous l'orbe
  var existing = document.getElementById('tawba-glow-msg');
  if (!existing) {
    var msg = document.createElement('div');
    msg.id = 'tawba-glow-msg';
    msg.style.cssText = [
      'text-align:center',
      'font-family:"Cormorant Garamond",serif',
      'font-size:12px',
      'font-style:italic',
      'color:rgba(135,169,107,0.65)',
      'letter-spacing:0.08em',
      'margin-bottom:12px',
      'animation:fadeSlideV2 0.8s ease forwards'
    ].join(';');
    msg.textContent = '✦ La porte est toujours ouverte';
    var chip = document.getElementById('v2-intention-chip');
    if (chip && chip.parentNode) chip.parentNode.insertBefore(msg, chip);
    else {
      var orbWrapEl = document.getElementById('orb-wrap-v2');
      if (orbWrapEl && orbWrapEl.nextSibling) orbWrapEl.parentNode.insertBefore(msg, orbWrapEl.nextSibling);
    }
  }
}

function updateSpiritualTitle() {
  var el = document.getElementById('v2-spiritual-title');
  if (!el) return;
  if (typeof isPremium !== 'function' || !isPremium()) { el.style.display = 'none'; return; }
  var streak = 0;
  try { streak = JSON.parse(localStorage.getItem('spiritual_history') || '{}').streak || 0; } catch(e) {}
  var titles = [
    { min: 365, ar: 'الرَّاسِخُ', tr: 'Al-Râsikh — L\'enraciné' },
    { min: 180, ar: 'الْمُحْسِنُ', tr: 'Al-Muhsin — L\'excellent' },
    { min: 90,  ar: 'الْمُتَّقِي', tr: 'Al-Muttaqî — Le pieux' },
    { min: 30,  ar: 'الْمُوَاظِبُ', tr: 'Al-Muwâdhib — Le constant' },
    { min: 7,   ar: 'الْمُبْتَدِئُ', tr: 'Al-Mubtadi\' — Le commençant' },
    { min: 0,   ar: 'الطَّالِبُ', tr: 'Al-Tâlib — Le chercheur' }
  ];
  var title = titles.find(function(t) { return streak >= t.min; });
  el.style.display = 'block';
  el.innerHTML = '<div style="font-family:\'Noto Naskh Arabic\',serif;font-size:20px;color:#C8A84A;line-height:1.4;">' + title.ar + '</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;color:#B0A080;letter-spacing:0.5px;">' + title.tr + '</div>';
}
function v2RefreshStats() {
  // POINT 3 — Effet visuel Tawba persistant 24h
  try { applyTawbaGlow(); } catch(e) {}
  // Stats row — table layout, toujours horizontal
  (function() {
    var sr = document.getElementById('v2-stats-row');
    if (sr) {
      sr.style.display = 'table';
      sr.style.width = '100%';
    }
  })();
  // Apply current language first
  v2ApplyI18n();
  // Greeting selon heure
  const h = new Date().getHours();
  const grKey = h < 12 ? 'greeting_morning' : h < 17 ? 'greeting_afternoon' : 'greeting_evening';
  const grEl = document.getElementById('v2-greeting-text');
  if (grEl) grEl.textContent = t(grKey);
  // Titres spirituels évolutifs (premium only)
  updateSpiritualTitle();

  // Midnight reset intention
  const s = v2GetState();
  const today = new Date().toDateString();
  if (s.intentionDate && s.intentionDate !== today) {
    s.intention = null; s.intentionDate = null;
    v2SaveState(s);
  }
  // Masquer "Commencer ma journée" si intention déjà posée
  var eyebrow = document.getElementById('v2-greeting-eyebrow');
  if (eyebrow) eyebrow.style.display = (s.intention && s.intentionDate === today) ? 'none' : '';

  // Tawba mode (2+ jours absence)
  if (s.lastOpenDate) {
    const diff = Math.floor((Date.now() - new Date(s.lastOpenDate)) / 86400000);
    if (diff >= 2) {
      const card = document.getElementById('tawba-card-v2');
      if (card) card.style.display = 'block';
    }
  }
  s.lastOpenDate = today;
  v2SaveState(s);

  v2UpdateOrbState();

  // Appliquer l'infusion si intention déjà enregistrée
  const _s = v2GetState();
  if (_s.intention) applyInfusion(_s.intention);

  // Stats from V1 history
  try {
    const hist = JSON.parse(localStorage.getItem('spiritual_history') || '{}');
    const el = id => document.getElementById(id);
    if (el('v2-stat-streak'))  el('v2-stat-streak').textContent  = hist.streak      || 0;
    if (el('v2-stat-days'))    el('v2-stat-days').textContent    = hist.totalDays    || 0;
    if (el('v2-stat-medal'))   el('v2-stat-medal').textContent   = hist.bestStreak >= 30 ? '🥇' : hist.bestStreak >= 7 ? '⚡' : hist.bestStreak >= 3 ? '🔥' : '—';

    // Score du jour depuis V1 state
    const v1state = JSON.parse(localStorage.getItem('spiritual_v2') || '{}');
    if (el('v2-stat-score')) {
      const score = v1state._score || v1state._todayScore || '—';
      el('v2-stat-score').textContent = score === '—' ? '—' : score + '%';
    }

    // Level name & bar from V1
    const unlocked = v1state._unlocked || [1];
    const maxLvl = Math.max(...unlocked);
    const levelNames = ['', 'Fondations', 'Approfondissement', 'Connaissance', 'Rayonnement'];
    if (el('v2-level-name')) el('v2-level-name').textContent = levelNames[maxLvl] || 'Fondations';
    if (el('v2-level-xp'))   el('v2-level-xp').textContent  = (hist.streak || 0) + ' j.';

    // Approximate fill from streak/30
    const pct = Math.min(100, Math.round(((hist.streak || 0) / 30) * 100));
    const fill = document.getElementById('v2-level-fill');
    if (fill) setTimeout(() => { fill.style.width = pct + '%'; }, 400);

  } catch(e) {}
  showMorningSagesse();
  checkNightCompanion();
  updateFajrChallenge();
  updateSanctuaireMoment();
}

function updateFajrChallenge() {
  var card = document.getElementById('fajr-challenge-card');
  if (!card) return;
  // Compute Fajr streak from history
  var hist = {};
  try { hist = JSON.parse(localStorage.getItem('spiritual_history') || '{}'); } catch(e) {}
  var fajrStreak = 0;
  var today = new Date();
  // Check today first
  var todayFajr = !!state['fajr'];
  // Count backwards from yesterday
  for (var i = todayFajr ? 0 : 1; i < 30; i++) {
    var d = new Date(today);
    d.setDate(d.getDate() - i);
    var ds = d.toISOString().split('T')[0];
    // For today, check current state; for past days, check dayScores existence + assume fajr was done if day completed
    if (i === 0 && todayFajr) { fajrStreak++; continue; }
    if (i > 0 && hist.days && hist.days[ds]) { fajrStreak++; }
    else break;
  }
  card.style.display = 'block';
  var pct = Math.min(100, Math.round((fajrStreak / 30) * 100));
  if (fajrStreak >= 30) {
    card.innerHTML = '<div style="background:#1a1a1a;border:1px solid #C8A84A;border-radius:14px;padding:16px 18px;text-align:center;">'
      + '<div style="font-family:\'Noto Naskh Arabic\',serif;font-size:20px;color:#C8A84A;margin-bottom:4px;">مُحَافِظٌ عَلَى الْفَجْرِ</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#E8DCC0;">Gardien de Fajr ✦</div>'
      + '</div>';
  } else {
    card.innerHTML = '<div style="background:#1a1a1a;border:1px solid rgba(200,168,75,0.3);border-radius:14px;padding:14px 18px;min-height:90px;box-sizing:border-box;position:relative;display:flex;align-items:center;">'
      + '<div style="display:flex;align-items:center;gap:12px;width:100%;">'
      + '<div><img src="https://nabs881-sketch.github.io/niyyah-app/imagessoleil.png" alt="Soleil" style="width:60px;height:auto;display:block;flex-shrink:0;mix-blend-mode:screen;"></div>'
      + '<div style="flex:1;text-align:left;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-weight:600;color:#C8A84A;">Challenge 30 jours Fajr</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:12px;font-style:italic;color:#B0A080;margin-top:2px;">Jour ' + fajrStreak + ' sur 30</div>'
      + '</div></div>'
      + '<div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(200,168,75,0.12);border-radius:0 0 14px 14px;overflow:hidden;">'
      + '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#C8A84A,#E0C870);transition:width 0.6s ease;"></div>'
      + '</div></div>';
  }
}
/* ── Mode Compagnon Nocturne ── */
function checkNightCompanion() {
  if (typeof isPremium !== 'function' || !isPremium()) return;
  var block = getCurrentPrayerBlock();
  if (block.id !== 'isha' && block.id !== 'nuit' && block.id !== 'qiyam') return;
  var todayKey = new Date().toISOString().split('T')[0];
  if (localStorage.getItem('niyyah_compagnon_date') === todayKey) return;
  var overlay = document.getElementById('night-companion-overlay');
  if (overlay) overlay.style.display = 'block';
}
function closeNightCompanion() {
  var overlay = document.getElementById('night-companion-overlay');
  if (overlay) overlay.style.display = 'none';
}
async function sendNightThought() {
  var input = document.getElementById('night-thought-input');
  var btn = document.getElementById('night-send-btn');
  if (!input || !input.value.trim()) return;
  var thought = input.value.trim();
  btn.textContent = '…';
  btn.disabled = true;
  try {
    var res = await fetch('https://niyyah-worker.nabs881.workers.dev/murmure', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ thought: thought, mode: 'night', context: 'L\'utilisateur ferme sa journée avec cette pensée. Réponds en EXACTEMENT 3 phrases courtes :\n1) Accueille sa pensée avec douceur — montre que tu as compris ce qu\'il ressent, sans juger.\n2) Offre UNE sagesse d\'Ibn Ata\'illah (Al-Hikam) ou d\'Al-Ghazali (Ihya Ulum al-Din) directement liée à ce qu\'il a écrit. Cite la source.\n3) Termine par une invitation douce à dormir en paix sous la protection d\'Allah.\nTon : intime, fraternel, jamais générique. Parle comme un ami savant qui murmure avant le sommeil.' })
    });
    var data = await res.json();
    var wisdom = data.text || data.reply || data.content || 'La nuit est un voile de miséricorde — repose-toi sous Sa protection.';
    var source = data.source || 'Sagesse nocturne';
    var responseEl = document.getElementById('night-wisdom-response');
    var textEl = document.getElementById('night-wisdom-text');
    var sourceEl = document.getElementById('night-wisdom-source');
    if (textEl) textEl.textContent = '« ' + wisdom + ' »';
    if (sourceEl) sourceEl.textContent = '— ' + source;
    if (responseEl) responseEl.style.display = 'block';
    localStorage.setItem('niyyah_sagesse_nuit', JSON.stringify({ text: wisdom, source: source, date: new Date().toISOString().split('T')[0], thought: thought }));
    localStorage.setItem('niyyah_compagnon_date', new Date().toISOString().split('T')[0]);
  } catch(e) {
    var fallback = 'Celui qui connaît son âme connaît son Seigneur. — Al-Ghazali';
    var responseEl2 = document.getElementById('night-wisdom-response');
    var textEl2 = document.getElementById('night-wisdom-text');
    var sourceEl2 = document.getElementById('night-wisdom-source');
    if (textEl2) textEl2.textContent = '« ' + fallback + ' »';
    if (sourceEl2) sourceEl2.textContent = '— Sagesse nocturne';
    if (responseEl2) responseEl2.style.display = 'block';
    localStorage.setItem('niyyah_sagesse_nuit', JSON.stringify({ text: fallback, source: 'Al-Ghazali', date: new Date().toISOString().split('T')[0], thought: thought }));
    localStorage.setItem('niyyah_compagnon_date', new Date().toISOString().split('T')[0]);
  }
  btn.textContent = 'ENVOYER';
  btn.disabled = false;
  input.value = '';
}
function showMorningSagesse() {
  if (typeof isPremium !== 'function' || !isPremium()) return;
  var card = document.getElementById('morning-wisdom-card');
  if (!card) return;
  var sagesse = null;
  try { sagesse = JSON.parse(localStorage.getItem('niyyah_sagesse_nuit') || 'null'); } catch(e) {}
  if (!sagesse || !sagesse.text) { card.style.display = 'none'; return; }
  var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  var yesterdayStr = yesterday.toISOString().split('T')[0];
  if (sagesse.date !== yesterdayStr && sagesse.date !== new Date().toISOString().split('T')[0]) { card.style.display = 'none'; return; }
  var block = getCurrentPrayerBlock();
  if (block.id === 'isha' || block.id === 'nuit' || block.id === 'qiyam') { card.style.display = 'none'; return; }
  card.style.display = 'block';
  var textEl = document.getElementById('morning-wisdom-text');
  var sourceEl = document.getElementById('morning-wisdom-source');
  if (textEl) textEl.textContent = '« ' + sagesse.text + ' »';
  if (sourceEl) sourceEl.textContent = '— ' + sagesse.source;
}
function updateSanctuaireMoment() {
  var el = document.getElementById('sanctuaire-moment');
  if (!el) return;
  // Attendre que prayerTimes soit chargé
  if (!_prayerTimes) {
    el.innerHTML = '<div style="text-align:center;padding:12px 0;"><div class="prayer-spinner"></div></div>';
    return;
  }
  var block = getCurrentPrayerBlock();
  var blockId = block.id;
  // Nuit et Qiyam — messages spéciaux
  if (blockId === 'nuit') {
    el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;background:rgba(200,168,75,0.08);border:1px solid rgba(200,168,75,0.25);border-radius:14px;padding:14px 18px;margin:12px 0 20px;">'
      + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
      + '<div style="flex:1;">'
      + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;">🌙 La nuit est pour le repos</div>'
      + '<div style="font-size:11px;color:var(--t3);margin-top:2px;">Dors avec le Witr</div>'
      + '</div></div>';
    return;
  }
  if (blockId === 'qiyam') {
    var hasLevel4 = state._unlocked && state._unlocked.includes(4);
    if (hasLevel4) {
      var tahajjudDone = !!state['tahajjud'];
      el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(200,168,75,0.15),rgba(200,168,75,0.05));border:1px solid rgba(200,168,75,0.35);border-radius:14px;padding:14px 18px;margin:12px 0 20px;">'
        + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
        + '<div style="flex:1;">'
        + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;">🌙 Dernier tiers de la nuit</div>'
        + '<div style="font-size:11px;color:var(--t3);margin-top:2px;">' + (tahajjudDone ? '✦ Qiyam al-Layl accompli' : 'L\'heure du Qiyam al-Layl') + '</div>'
        + '</div>'
        + (tahajjudDone ? '' : '<button onclick="v2GoTo(\'checklist\')" style="background:transparent;border:1px solid rgba(200,168,75,0.4);color:#C8A84A;font-size:12px;font-weight:600;padding:6px 14px;border-radius:10px;cursor:pointer;white-space:nowrap;">→ Prier</button>')
        + '</div>';
    } else {
      el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;background:rgba(200,168,75,0.08);border:1px solid rgba(200,168,75,0.25);border-radius:14px;padding:14px 18px;margin:12px 0 20px;">'
        + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
        + '<div style="flex:1;">'
        + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;">🌙 La nuit est pour le repos</div>'
        + '<div style="font-size:11px;color:var(--t3);margin-top:2px;">Dors avec le Witr</div>'
        + '</div></div>';
    }
    return;
  }
  function _isDone(item) { return item.type === 'counter' ? (state[item.id] || 0) >= item.target : !!state[item.id]; }
  var _allUnlocked = LEVELS.filter(function(l) { return state._unlocked && state._unlocked.includes(l.id); })
    .flatMap(function(l) { return l.sections.flatMap(function(s) { return s.items; }); });
  var blockItems = _allUnlocked.filter(function(item) { return item.block === blockId; });
  var blockTotal = blockItems.length;
  var blockDone = blockItems.filter(_isDone).length;
  var blockRemaining = blockTotal - blockDone;
  if (blockTotal === 0 && !_prayerTimes) {
    if (!window._sanctuaireMomentRetried) {
      window._sanctuaireMomentRetried = 1;
      setTimeout(function() { if (document.getElementById('sanctuaire-moment') && !_prayerTimes) updateSanctuaireMoment(); }, 3000);
    } else if (window._sanctuaireMomentRetried === 1) {
      window._sanctuaireMomentRetried = 2;
      setTimeout(function() { if (document.getElementById('sanctuaire-moment') && !_prayerTimes) updateSanctuaireMoment(); }, 6000);
    }
  }
  if (blockTotal === 0) { el.innerHTML = ''; return; }
  var jourItems = _allUnlocked.filter(function(item) { return item.block === 'jour'; });
  var jourTotal = jourItems.length;
  var jourDone = jourItems.filter(_isDone).length;
  var jourRemaining = jourTotal - jourDone;
  var jourLine = '';
  if (jourRemaining > 0 && jourTotal <= 5) {
    jourLine = '<div style="font-size:10px;color:var(--t3);margin-top:3px;opacity:0.7;">+ ' + jourRemaining + ' acte' + (jourRemaining > 1 ? 's' : '') + ' du jour restant' + (jourRemaining > 1 ? 's' : '') + '</div>';
  }
  if (blockRemaining === 0) {
    el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;background:rgba(200,168,75,0.1);border:1px solid rgba(200,168,75,0.3);border-radius:14px;padding:14px 18px;margin:12px 0 20px;">'
      + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
      + '<div style="flex:1;">'
      + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;">✦ Bloc accompli</div>'
      + '<div style="font-size:11px;color:var(--t3);margin-top:2px;">Barak Allahu fik</div>'
      + jourLine
      + '</div></div>';
  } else {
    el.innerHTML = '<div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(200,168,75,0.15),rgba(200,168,75,0.05));border:1px solid rgba(200,168,75,0.35);border-radius:14px;padding:14px 18px;margin:12px 0 20px;">'
      + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
      + '<div style="flex:1;">'
      + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;">' + block.label + '</div>'
      + '<div style="font-size:11px;color:var(--t3);margin-top:2px;">' + blockDone + ' acte' + (blockDone > 1 ? 's' : '') + ' accompli' + (blockDone > 1 ? 's' : '') + ' · ' + blockRemaining + ' restant' + (blockRemaining > 1 ? 's' : '') + '</div>'
      + jourLine
      + '</div>'
      + '<button onclick="v2GoTo(\'checklist\')" style="background:transparent;border:1px solid rgba(200,168,75,0.4);color:#C8A84A;font-size:12px;font-weight:600;padding:6px 14px;border-radius:10px;cursor:pointer;white-space:nowrap;">→ Continuer</button>'
      + '</div>';
  }
}

function v2UpdateOrbState() {
  const s = v2GetState();
  const orb = document.getElementById('orb-core-v2');
  const chip = document.getElementById('v2-intention-chip');
  const chipText = document.getElementById('v2-chip-text');
  const cta = document.getElementById('orb-cta-v2');

  const T = V2_I18N[V2_LANG] || V2_I18N.fr;
  if (s.intention) {
    if (orb) orb.classList.add('intention-set-v2');
    if (chip) chip.style.display = 'block';
    if (chipText) {
      chipText.textContent = s.intention;
      chipText.style.direction = T.dir;
      chipText.style.fontFamily = V2_LANG === 'ar' ? "'Noto Naskh Arabic', serif" : "'Cormorant Garamond', serif";
    }
    if (cta) { cta.textContent = T.orb_resume; cta.style.direction = T.dir; }
  } else {
    if (orb) orb.classList.remove('intention-set-v2');
    if (chip) chip.style.display = 'none';
    if (cta) { cta.textContent = T.orb_start; cta.style.direction = T.dir; }
  }
}

function v2DismissTawba(btn) {
  btn.closest('.tawba-card-v2').style.display = 'none';
}

/* ─────────────────────────────────────────────
   TOAST V2
   ───────────────────────────────────────────── */
let _v2ToastTimer = null;
function v2ShowToast(msg) {
  const t = document.getElementById('toast-v2');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  if (_v2ToastTimer) clearTimeout(_v2ToastTimer);
  _v2ToastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─────────────────────────────────────────────
   BACK BUTTON — depuis V1 vers Sanctuaire
   ───────────────────────────────────────────── */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && v2CurrentView !== 'sanctuaire') v2GoSanctuaire();
});

/* Swipe right to go back to sanctuaire */
let _v2TouchStartX = 0;
document.addEventListener('touchstart', e => { _v2TouchStartX = e.touches[0].clientX; }, { passive: true });
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - _v2TouchStartX;
  if (dx > 80 && v2CurrentView !== 'sanctuaire') {
    // Swipe right → back to sanctuaire
    v2GoSanctuaire();
  }
}, { passive: true });

/* ─────────────────────────────────────────────
   INIT V2 (after V1 is ready)
   ───────────────────────────────────────────── */
function v2Init() {
  checkMidnightReset();
  // Add class so CSS knows V2 is active
  document.body.classList.add('v2-mode');

  // Force ALL .view to be hidden on start
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });

  // Hide old V1 nav bar permanently (we use nav-bar-v2)
  const v1nav = document.querySelector('.nav-bar:not(.nav-bar-v2)');
  if (v1nav) v1nav.style.display = 'none';

  // Show V2 Sanctuaire
  V2_LANG = v2DetectLang();
  // Set topbar lang pill
  const langPill0 = document.getElementById('topbar-lang-btn');
  if (langPill0) {
    langPill0.textContent = V2_LANG === 'ar' ? 'عر' : V2_LANG.toUpperCase();
    langPill0.style.fontFamily = V2_LANG === 'ar' ? "'Noto Naskh Arabic', serif" : "'Cinzel', serif";
    langPill0.style.fontSize = V2_LANG === 'ar' ? '13px' : '10px';
  }
  v2GoSanctuaire();
  setTimeout(() => { v2ApplyI18n(); v2RefreshStats(); }, 100);

  // Sync V1 intention → V2 chip on boot
  try {
    const v1state = JSON.parse(localStorage.getItem('spiritual_v2') || '{}');
    if (v1state.intention) {
      const s2 = v2GetState();
      if (!s2.intention) {
        s2.intention = v1state.intention;
        s2.intentionDate = new Date().toDateString();
        v2SaveState(s2);
      }
    }
  } catch(e) {}
  v2UpdateOrbState();
}

// Boot after V1's own DOMContentLoaded fires
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(v2Init, 80));
} else {
  setTimeout(v2Init, 80);
}

/* ─────────────────────────────────────────────
   AI HOOKS (Placeholders prêts pour Master Prompts)
   ───────────────────────────────────────────── */

// ════════════════════════════════════════════════════════════
// MENTOR D'ADAB — SYSTÈME COMPLET
// ════════════════════════════════════════════════════════════

/* ══ CONFIG PRODUCTION ══
 * En développement : pointe vers localhost
 * En production (Railway/Render) : remplace par ton URL réelle
 */
const NIYYAH_API_URL = 'https://niyyah-api.nabs881.workers.dev';

const MENTOR_SYSTEM_PROMPT = `
Tu es le Mentor d'Adab de l'application Niyyah. Tu n'es pas un chatbot. Tu n'es pas un conseiller juridique. Tu es un guide de l'âme — quelqu'un qui a lu Al-Ghazali, Ibn Qayyim, Ibn Ata'illah, et qui te parle comme un grand frère lettré, avec chaleur et exigence.

## TON IDENTITÉ

Tu incarnes la tradition du Tazkiyat al-Nafs — la purification de l'âme. Ton seul territoire : le caractère, l'intention, le comportement intérieur. Jamais le halal/haram juridique.

Si l'utilisateur te demande une fatwa ou un avis juridique, réponds exactement :
"Ce n'est pas mon domaine — je soigne l'âme, pas je ne juge les actes. Pour cela, consulte un érudit qualifié. Mais laisse-moi t'aider à purifier l'intention derrière ta question."

## TON TON

- Grand frère lettré : ni imam autoritaire, ni coach de développement personnel
- Concis, poétique, percutant — jamais bavard
- Tu utilises "frère", "compagnon", "ami" selon le contexte
- Tes mots : Présence, Constance, Souffle, Lumière, Station, Cœur, Adab, Ihsan
- Tu parles à quelqu'un d'intelligent qui veut aller plus loin, pas à quelqu'un qu'il faut convaincre

## BASE DE CONNAISSANCES PRIORITAIRE

Tu puises UNIQUEMENT dans ces sources :
- Ihya Ulum al-Din (Al-Ghazali) — psychologie de l'âme, stations du cœur
- Madarij al-Salikin (Ibn Qayyim) — les étapes vers Allah
- Al-Hikam (Ibn Ata'illah) — aphorismes spirituels
- Sira Nabawiyya — le comportement du Prophète ﷺ comme modèle vivant
- Hadiths authentiques sur le caractère (akhlaq) — Bukhari, Muslim, Tirmidhi

RÈGLE DE SOURÇAGE : Cite TOUJOURS la source exacte quand tu es sûr (ex: "Rapporté par Bukhari n°6464", "Sourate Al-Baqara verset 152", "Muslim n°2999"). Si tu n'es pas sûr du numéro exact, cite au minimum le recueil ou l'auteur (ex: "Rapporté par Tirmidhi", "Al-Ghazali dans l'Ihya"). N'invente jamais une référence — l'honnêteté est elle-même de l'Adab.

## TROIS MODES D'INTERACTION

**Mode 1 — Conseil à la demande**
L'utilisateur décrit une situation (stress, colère, doute). Tu réponds avec :
1. Une ouverture fraternelle (1 phrase)
2. L'analyse de l'âme (ce qui se passe intérieurement)
3. Les 3 niveaux BASE / DÉVOTION / EXCELLENCE (IHSAN)
4. Une question finale qui pousse à l'action

**Mode 2 — Réponse concrète avec sources**
Même si la question est vague ou générale, réponds TOUJOURS avec du contenu concret et des sources islamiques précises (Coran, Bukhari, Muslim, Sira fiable). D'abord nourrir, ensuite approfondir.
Ex : "Je veux progresser" → Cite un verset ou hadith sur la progression, donne un conseil actionnable, PUIS pose une question pour affiner.
Ne laisse jamais l'utilisateur repartir les mains vides — chaque réponse doit contenir au moins une source et un conseil pratique.

**Mode 3 — Analyse d'intention (Niyyah)**
Quand l'utilisateur dit "Je vais faire X" ou "J'ai l'intention de...", analyse sa Niyyah avec les 3 niveaux :
**BASE** : L'acte dans sa forme minimale sincère. (Accessible à tous.)
**DÉVOTION** : L'acte fait pour servir au-delà de soi. (Pour celui qui veut aller plus loin.)
**EXCELLENCE (IHSAN)** : L'acte fait comme si Allah le voyait. (Le sommet de l'intention.)

## CONTEXTUALISATION PAR L'INTENTION DU JOUR

L'utilisateur a peut-être choisi une intention ce matin. Si elle est mentionnée dans la conversation, adapte tes conseils :
- "Se rapprocher d'Allah" → accent sur la présence et le Dhikr
- "Tenir ses engagements" → accent sur la parole donnée et la confiance (Amanah)
- "Se reconstruire" → accent sur la patience et l'auto-bienveillance
- "Être reconnaissant" → accent sur le Shukr dans les petites choses

## CONTRAINTES ABSOLUES

1. Maximum 300 mots par réponse
2. Terminer TOUJOURS par une question concrète
3. Jamais de listes à puces standards — prose fluide et noble uniquement
4. Jamais de : "Bien sûr !", "Super question !", "En tant qu'IA..." 
5. Si le sujet touche à la santé mentale grave (dépression, idées sombres) : orienter vers un professionnel avec chaleur, sans abandonner l'utilisateur
6. Commencer par بِسْمِ اللَّهِ ou une ouverture fraternelle courte — jamais "Bonjour" banal
`;;

// Historique des messages pour la conversation
let mentorHistory = [];
let mentorIsThinking = false;

// ── Navigation vers le Mentor ──
function v2GoMentor() {
  // Fermer les overlays
  if (typeof closeDefiSelector === 'function') closeDefiSelector();
  const _defOv2 = document.getElementById('defiSelectorOverlay');
  if (_defOv2) { _defOv2.style.opacity = '0'; _defOv2.style.pointerEvents = 'none'; }
  // Hide sanctuaire
  const sanctEl = document.getElementById('view-sanctuaire');
  if (sanctEl) sanctEl.classList.remove('active');
  // Hide back btn (mentor has its own ←)
  const backBtn = document.getElementById('v2-back-btn');
  if (backBtn) backBtn.classList.remove('visible');
  // Hide all other views
  document.querySelectorAll('.view').forEach(v => {
    v.classList.remove('active');
    v.style.display = 'none';
  });
  // Hide topbar to avoid overlap
  const tbEl = document.getElementById('topbar-v2');
  if (tbEl) tbEl.classList.remove('active');
  document.body.classList.add('mentor-active');
  // Show mentor
  const mentorView = document.getElementById('view-mentor');
  if (mentorView) {
    mentorView.style.display = '';
    mentorView.classList.add('active');
  }
  // Update nav
  document.querySelectorAll('.nav-v2-item').forEach(n => n.classList.remove('active-nav'));
  const navBtn = document.getElementById('v2nav-mentor');
  if (navBtn) navBtn.classList.add('active-nav');
  // Apply i18n
  mentorApplyI18n();

  // Afficher le statut Premium / questions restantes — uniquement après la 1ère interaction
  var usage = parseInt(localStorage.getItem('niyyah_mentor_usage') || '0');
  var remaining = Math.max(0, 1 - usage);
  var mentorStatusEl = document.getElementById('mentor-premium-status');
  if (usage === 0 && !isPremium()) {
    // Aucune interaction : on ne crée/affiche rien
    if (mentorStatusEl) mentorStatusEl.remove();
  } else {
    // Créer l'élément si absent
    if (!mentorStatusEl) {
      mentorStatusEl = document.createElement('div');
      mentorStatusEl.id = 'mentor-premium-status';
      mentorStatusEl.style.cssText = 'font-size:10px;letter-spacing:0.1em;margin-top:2px;opacity:0.8;';
      var headerLeft = document.querySelector('.mentor-header-center');
      if (headerLeft) headerLeft.appendChild(mentorStatusEl);
    }
    if (isPremium()) {
      mentorStatusEl.textContent = '✦ Mentor Premium activé';
      mentorStatusEl.style.color = 'rgba(212,175,55,0.6)';
    } else if (remaining > 0) {
      mentorStatusEl.textContent = remaining + ' question' + (remaining > 1 ? 's' : '') + ' encore offerte' + (remaining > 1 ? 's' : '') + ' ✦';
      mentorStatusEl.style.color = 'rgba(200,168,75,0.6)';
    } else {
      mentorStatusEl.textContent = 'Reviens demain inch\'Allah 🌙';
      mentorStatusEl.style.color = 'rgba(200,168,75,0.5)';
    }
  }
}

function mentorApplyI18n() {
  const T = V2_I18N[V2_LANG] || V2_I18N.fr;
  const titleEl = document.getElementById('mentor-title-el');
  if (titleEl) titleEl.textContent = T.mentor_title || "Mentor d'Adab";
  const subEl = document.getElementById('mentor-sub-el');
  if (subEl) subEl.textContent = T.mentor_sub || "Sagesse · Tazkiyat al-Nafs";
  const inputEl = document.getElementById('mentor-input');
  if (inputEl) inputEl.placeholder = T.mentor_placeholder || "Pose ta question au Mentor...";
  const welcomeEl = document.getElementById('mentor-welcome-text');
  if (welcomeEl) welcomeEl.textContent = T.mentor_welcome || welcomeEl.textContent;
  const dividerEl = document.getElementById('mentor-divider-text');
  if (dividerEl) dividerEl.textContent = T.mentor_suggestions_label || 'Suggestions';

  // Suggestions dynamiques selon l'intention du matin
  mentorBuildSuggestions();
}

function mentorBuildSuggestions() {
  const container = document.getElementById('mentor-suggestions');
  if (!container) return;

  // Récupérer l'intention du matin
  var s = {};
  try { s = JSON.parse(localStorage.getItem('niyyah_v2_state') || '{}'); } catch(e) {}
  const intention = (s.intention || '').toLowerCase();

  // Banque de suggestions par thème
  const SUGG = {
    allah: [
      "Comment être plus présent dans ma prière ?",
      "Je veux rapprocher mon cœur d'Allah",
      "Comment transformer un acte banal en ibadah ?",
      "Aide-moi à purifier ma Niyyah avant ma journée"
    ],
    engagement: [
      "Comment tenir ma parole quand c'est difficile ?",
      "J'ai manqué un engagement — comment réparer ?",
      "Aide-moi à trouver la motivation pour continuer",
      "Comment développer la constance (Istiqamah) ?"
    ],
    reconstruire: [
      "Je me sens perdu — par où recommencer ?",
      "Comment pardonner à quelqu'un qui m'a blessé ?",
      "J'ai du mal à me pardonner moi-même",
      "Comment transformer une erreur en leçon ?"
    ],
    gratitude: [
      "Je n'arrive pas à ressentir la gratitude vraiment",
      "Comment cultiver le Shukr au quotidien ?",
      "Aide-moi à voir les grâces dans ma journée",
      "Je veux transformer ma plainte en gratitude"
    ],
    default: [
      "Comment purifier mon intention avant une action ?",
      "Je me suis mis en colère — comment réparer mon Adab ?",
      "Comment transformer mon travail en acte d'adoration ?",
      "J'ai du mal à pardonner — guide-moi",
      "Je veux prier Fajr avec plus de présence"
    ]
  };

  // Choisir le pool selon l'intention
  let pool = SUGG.default;
  if (intention.includes('allah') || intention.includes('rapprocher')) pool = SUGG.allah;
  else if (intention.includes('engagement') || intention.includes('tenir'))   pool = SUGG.engagement;
  else if (intention.includes('reconstruire'))                                pool = SUGG.reconstruire;
  else if (intention.includes('reconnaiss') || intention.includes('gratit'))  pool = SUGG.gratitude;

  // Garder le divider, reconstruire les boutons
  const divider = container.querySelector('.mentor-divider');
  container.innerHTML = '';
  if (divider) container.appendChild(divider);
  else {
    const d = document.createElement('div');
    d.className = 'mentor-divider';
    d.textContent = 'Suggestions';
    container.appendChild(d);
  }

  // Afficher 4 suggestions max
  pool.slice(0, 4).forEach(function(text) {
    const btn = document.createElement('button');
    btn.className = 'mentor-suggestion-chip';
    btn.textContent = text;
    btn.onclick = function() { mentorUseSuggestion(this); };
    container.appendChild(btn);
  });
}

// ── Utiliser une suggestion ──
function mentorUseSuggestion(btn) {
  const question = btn.textContent.trim();
  const suggestionsEl = document.getElementById('mentor-suggestions');
  if (suggestionsEl) suggestionsEl.style.display = 'none';
  mentorAddUserMessage(question);
  mentorAskAPI(question);
}


/* ══ PARTAGE SOCIAL — Carte Story Instagram 1080×1920 ══ */
function mentorShareCard(text) {
  // Extraire les parties clés du conseil
  var lines = text.split("\n").filter(function(l) { return l.trim(); });
  var quote = "";
  var finalQuestion = "";

  // Chercher la question finale (dernière ligne avec ?)
  for (var i = lines.length - 1; i >= 0; i--) {
    if (lines[i].trim().endsWith("?") && lines[i].length < 120) {
      finalQuestion = lines[i].trim();
      break;
    }
  }

  // Extraire la citation principale — 1ère ligne non-vide, non-niveau, non-question
  for (var i = 0; i < lines.length; i++) {
    var l = lines[i].trim();
    if (l.length > 30
      && !l.startsWith("**BASE")
      && !l.startsWith("**DÉV")
      && !l.startsWith("**EXC")
      && !l.endsWith("?")
      && !l.startsWith("إِ")) {
      quote = l.replace(/\*\*/g, "").substring(0, 180);
      break;
    }
  }

  // Créer l'overlay
  var overlay = document.createElement("div");
  overlay.style.cssText = "position:fixed;inset:0;background:rgba(0,0,0,0.92);z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;gap:16px;";
  overlay.onclick = function(e) { if (e.target === overlay) document.body.removeChild(overlay); };

  // Canvas pour générer l'image Story
  var canvas = document.createElement("canvas");
  canvas.width  = 1080;
  canvas.height = 1920;
  canvas.style.cssText = "width:100%;max-width:340px;max-height:60vh;border-radius:16px;display:block;";

  var ctx = canvas.getContext("2d");

  // Fond noir luxueux avec dégradé radial doré
  var grad = ctx.createRadialGradient(540, 600, 100, 540, 700, 900);
  grad.addColorStop(0,   "rgba(30,20,5,1)");
  grad.addColorStop(0.5, "rgba(12,10,4,1)");
  grad.addColorStop(1,   "rgba(5,5,5,1)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1920);

  // Ligne dorée supérieure
  var topGrad = ctx.createLinearGradient(0, 0, 1080, 0);
  topGrad.addColorStop(0,   "rgba(212,175,55,0)");
  topGrad.addColorStop(0.5, "rgba(212,175,55,0.7)");
  topGrad.addColorStop(1,   "rgba(212,175,55,0)");
  ctx.strokeStyle = topGrad;
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, 120); ctx.lineTo(1080, 120); ctx.stroke();

  // Ligne dorée inférieure
  ctx.strokeStyle = topGrad;
  ctx.beginPath(); ctx.moveTo(0, 1800); ctx.lineTo(1080, 1800); ctx.stroke();

  // Ornement géométrique central (étoile à 8 branches SVG-like)
  ctx.save();
  ctx.translate(540, 360);
  // Branches de l'étoile
  for (var i = 0; i < 8; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 8);
    ctx.strokeStyle = "rgba(212,175,55,0.35)";
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 55); ctx.lineTo(0, 120); ctx.stroke();
    // Petite marque
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-8, 80); ctx.lineTo(8, 80); ctx.stroke();
    ctx.restore();
  }
  // Cercles concentriques
  [50, 75, 100].forEach(function(r, ri) {
    ctx.strokeStyle = "rgba(212,175,55," + [0.3, 0.18, 0.1][ri] + ")";
    ctx.lineWidth = ri === 0 ? 2 : 1;
    ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke();
  });
  // Centre lumineux
  var centerGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, 18);
  centerGrad.addColorStop(0, "rgba(212,175,55,0.9)");
  centerGrad.addColorStop(1, "rgba(212,175,55,0)");
  ctx.fillStyle = centerGrad;
  ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Badge "Mentor d'Adab"
  ctx.font = "500 42px sans-serif";
  ctx.fillStyle = "rgba(212,175,55,0.5)";
  ctx.textAlign = "center";
  ctx.letterSpacing = "8px";
  ctx.fillText("MENTOR D'ADAB", 540, 500);

  // Tiret doré séparateur
  ctx.strokeStyle = "rgba(212,175,55,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(440, 530); ctx.lineTo(640, 530); ctx.stroke();

  // Citation principale (texte centré, retour à la ligne auto)
  ctx.font = "italic 300 68px Georgia, serif";
  ctx.fillStyle = "rgba(240,234,214,0.95)";
  ctx.textAlign = "center";
  ctx.lineWidth = 1;

  // Wrapper de texte
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    var words = text.split(" ");
    var line  = "";
    var lines = [];
    for (var n = 0; n < words.length; n++) {
      var testLine  = line + words[n] + " ";
      var metrics   = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + " ";
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());
    var totalH = lines.length * lineHeight;
    var startY = y - totalH / 2;
    lines.forEach(function(l, i) {
      ctx.fillText(l, x, startY + i * lineHeight);
    });
    return startY + lines.length * lineHeight;
  }

  var afterQuote = wrapText(ctx, '"' + quote + '"', 540, 1000, 900, 90);

  // Question finale
  if (finalQuestion) {
    ctx.font = "italic 300 48px Georgia, serif";
    ctx.fillStyle = "rgba(212,175,55,0.65)";
    wrapText(ctx, finalQuestion, 540, afterQuote + 120, 860, 70);
  }

  // Séparateur bas
  ctx.strokeStyle = "rgba(212,175,55,0.25)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(400, 1720); ctx.lineTo(680, 1720); ctx.stroke();

  // Logo Niyyah
  ctx.font = "italic 400 72px Georgia, serif";
  ctx.fillStyle = "rgba(212,175,55,0.55)";
  ctx.textAlign = "center";
  ctx.fillText("Niyyah", 540, 1790);

  // Tagline
  ctx.font = "300 36px sans-serif";
  ctx.fillStyle = "rgba(212,175,55,0.3)";
  ctx.fillText("Le Sanctuaire de l'Intention", 540, 1840);

  // Aperçu dans l'overlay
  var label = document.createElement("div");
  label.style.cssText = "font-family:'Cinzel',serif;font-size:11px;letter-spacing:0.2em;color:rgba(212,175,55,0.5);text-align:center;";
  label.textContent = "CARTE DE SAGESSE — NIYYAH";

  // Boutons d'action
  var actions = document.createElement("div");
  actions.style.cssText = "display:flex;gap:10px;width:100%;max-width:340px;";

  var btnDL = document.createElement("button");
  btnDL.style.cssText = "flex:1;padding:14px;border-radius:14px;border:none;background:linear-gradient(135deg,#D4AF37,#B8940A);color:#000;font-weight:700;font-size:14px;cursor:pointer;font-family:'Cinzel',serif;";
  btnDL.textContent = "⬇ Télécharger";
  btnDL.onclick = function() {
    var link = document.createElement("a");
    link.download = "niyyah-sagesse.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  var btnShare = document.createElement("button");
  btnShare.style.cssText = "flex:1;padding:14px;border-radius:14px;border:1px solid rgba(212,175,55,0.3);background:rgba(212,175,55,0.06);color:rgba(212,175,55,0.8);font-weight:600;font-size:14px;cursor:pointer;";
  btnShare.textContent = "📤 Partager";
  btnShare.onclick = function() {
    canvas.toBlob(function(blob) {
      var file = new File([blob], "niyyah-sagesse.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: "Conseil — Mentor d'Adab · Niyyah" });
      } else {
        // Fallback : copier le texte
        var shareText = quote + "\n\n— Mentor d'Adab · Niyyah";
        navigator.clipboard.writeText(shareText).then(function() {
          v2ShowToast("✦ Conseil copié !");
        });
      }
    });
  };

  var btnClose = document.createElement("button");
  btnClose.style.cssText = "width:44px;padding:14px;border-radius:14px;border:1px solid rgba(255,255,255,0.08);background:transparent;color:rgba(255,255,255,0.35);cursor:pointer;font-size:16px;";
  btnClose.textContent = "✕";
  btnClose.onclick = function() { document.body.removeChild(overlay); };

  actions.appendChild(btnDL);
  actions.appendChild(btnShare);
  actions.appendChild(btnClose);

  overlay.appendChild(label);
  overlay.appendChild(canvas);
  overlay.appendChild(actions);
  document.body.appendChild(overlay);
}


// ── Envoyer un message ──
function mentorSend() {
  // Limite 3 questions par jour
  var _mentorDate = localStorage.getItem('niyyah_mentor_date');
  var _mentorCount = parseInt(localStorage.getItem('niyyah_mentor_count') || '0', 10);
  if (_mentorDate !== TODAY) { _mentorCount = 0; localStorage.setItem('niyyah_mentor_date', TODAY); }
  if (_mentorCount >= 1) {
    showToast('Ta question du jour a été posée — reviens demain inch\'Allah 🌙');
    return;
  }
  const input = document.getElementById('mentor-input');
  if (!input) return;
  const question = input.value.trim();
  if (!question || mentorIsThinking) return;
  localStorage.setItem('niyyah_mentor_count', String(_mentorCount + 1));
  input.value = '';
  input.style.height = 'auto';
  // Hide suggestions on first user message
  const suggestionsEl = document.getElementById('mentor-suggestions');
  if (suggestionsEl) suggestionsEl.style.display = 'none';
  mentorAddUserMessage(question);
  mentorAskAPI(question);
}

// ── Ajouter bulle utilisateur ──
function mentorAddUserMessage(text) {
  mentorHistory.push({ role: 'user', content: text });
  const container = document.getElementById('mentor-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'mentor-msg user';
  div.style.animationDelay = '0ms';
  div.innerHTML = `
    <div class="mentor-avatar" style="background:rgba(212,175,55,0.08);border-color:rgba(212,175,55,0.2);font-size:13px;color:rgba(212,175,55,0.6);">تُ</div>
    <div class="mentor-bubble">${escapeHtml(text)}</div>`;
  container.appendChild(div);
  mentorScrollBottom();
}

// ── Ajouter réponse IA — Effet "plume sur parchemin" (POINT 4) ──
function mentorAddAIMessage(text) {
  mentorHistory.push({ role: 'assistant', content: text });
  const container = document.getElementById('mentor-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'mentor-msg mentor-ai';
  div.style.animationDelay = '0ms';

  const bubble = document.createElement('div');
  bubble.className = 'mentor-bubble mentor-bubble-typing';

  div.innerHTML = '<div class="mentor-avatar">🌿</div>';
  div.appendChild(bubble);
  container.appendChild(div);
  mentorScrollBottom();

  // Effet plume : révéler le texte progressivement
  // D'abord révéler mot par mot avec curseur clignotant
  const cursor = document.createElement('span');
  cursor.className = 'mentor-cursor';
  cursor.textContent = '|';
  bubble.appendChild(cursor);

  // Diviser en "tokens" (mots + ponctuation)
  const words = text.split(' ');
  let wordIdx = 0;
  const charsPerStep = 3; // vitesse : 3 mots à la fois
  const baseDelay = 35;   // ms entre chaque step

  function revealNext() {
    if (wordIdx >= words.length) {
      // Finir : formatter proprement
      bubble.removeChild(cursor);
      bubble.className = 'mentor-bubble';
      bubble.innerHTML = mentorFormatResponse(text);
      // Bouton partage
      addShareButton(div, text);
      mentorScrollBottom();
      return;
    }
    const chunk = words.slice(wordIdx, wordIdx + charsPerStep).join(' ') + ' ';
    const textNode = document.createTextNode(chunk);
    bubble.insertBefore(textNode, cursor);
    wordIdx += charsPerStep;
    // Délai variable (légèrement aléatoire) pour simuler la "réflexion"
    const delay = baseDelay + Math.random() * 20;
    setTimeout(revealNext, delay);
    mentorScrollBottom();
  }

  // Délai initial : 400ms de "silence contemplatif" avant de commencer
  setTimeout(revealNext, 400);
}

// ── Bouton partage — POINT 4 Partage Social ──
function addShareButton(msgDiv, text) {
  const btn = document.createElement('button');
  btn.className = 'mentor-share-btn';
  btn.innerHTML = '✦ Partager ce conseil';
  btn.onclick = function() { mentorShareCard(text); };
  msgDiv.querySelector('.mentor-bubble').appendChild(btn);
}

// ── Formater la réponse : détecter les 3 niveaux ──
function mentorFormatResponse(text) {
  // Escape HTML first
  let t = escapeHtml(text);
  // Convert **BASE** / **DÉVOTION** / **EXCELLENCE** to styled blocks
  t = t.replace(/\*\*BASE\*\*\s*:/gi, (m) =>
    `</p><div class="mentor-niyyah-levels"><div class="mentor-niyyah-level mentor-level-base"><div class="mentor-level-tag">✦ Base</div><div class="mentor-level-text">`);
  t = t.replace(/\*\*D[ÉE]VOTION\*\*\s*:/gi, (m) =>
    `</div></div><div class="mentor-niyyah-level mentor-level-devotion"><div class="mentor-level-tag">✦ Dévotion</div><div class="mentor-level-text">`);
  t = t.replace(/\*\*EXCELLENCE.*?\*\*\s*:/gi, (m) =>
    `</div></div><div class="mentor-niyyah-level mentor-level-excellence"><div class="mentor-level-tag">✦ Excellence · Ihsan</div><div class="mentor-level-text">`);
  // Close last level block if opened
  if (t.includes('mentor-level-text') && !t.endsWith('</div></div>')) {
    t += `</div></div></div>`;
  }
  // Convert line breaks to paragraphs
  t = '<p>' + t.replace(/\n\n+/g, '</p><p>').replace(/\n/g, '<br>') + '</p>';
  // Clean double <p> around level blocks
  t = t.replace(/<p><\/p>/g, '').replace(/<p>(<div)/g, '$1').replace(/(<\/div>)<\/p>/g, '$1');
  return t;
}

function escapeHtml(str) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;');
}

// ── Afficher/cacher l'Orbe de réflexion ──
function mentorShowThinking() {
  mentorIsThinking = true;
  const sendBtn = document.getElementById('mentor-send-btn');
  if (sendBtn) sendBtn.disabled = true;
  // Show nav dot
  const dot = document.getElementById('mentor-pulse-dot');
  if (dot) dot.style.display = 'block';
  // Add thinking orb to messages
  const container = document.getElementById('mentor-messages');
  if (!container) return;
  const div = document.createElement('div');
  div.className = 'mentor-thinking';
  div.id = 'mentor-thinking-indicator';
  // Phrases rotatives pendant la "réflexion" du Mentor
  var PENSEES_MENTOR = [
    "Le sage réfléchit avant de parler…",
    "إِنَّمَا الْعِلْمُ بِالتَّعَلُّمِ",
    "La sagesse prend son temps…",
    "Le cœur cherche les mots justes…",
    "Contemplation en cours…"
  ];
  var _pIdx = Math.floor(Math.random() * PENSEES_MENTOR.length);
  var orbEl = document.createElement('div');
  orbEl.className = 'mentor-thinking-orb';
  orbEl.innerHTML = '<div class="mentor-thinking-orb-inner">نية</div>';
  var textEl = document.createElement('div');
  textEl.className = 'mentor-thinking-text';
  textEl.id = 'mentor-thinking-text';
  textEl.textContent = PENSEES_MENTOR[_pIdx];
  div.appendChild(orbEl);
  div.appendChild(textEl);
  container.appendChild(div);
  mentorScrollBottom();
  // Rotation des phrases toutes les 2.5s
  var _thinkInterval = setInterval(function() {
    _pIdx = (_pIdx + 1) % PENSEES_MENTOR.length;
    var el = document.getElementById('mentor-thinking-text');
    if (el) {
      el.style.opacity = '0';
      setTimeout(function() { if(el){el.textContent = PENSEES_MENTOR[_pIdx]; el.style.opacity = '1';} }, 300);
    } else { clearInterval(_thinkInterval); }
  }, 2500);
  div.dataset.interval = _thinkInterval;
}

function mentorHideThinking() {
  mentorIsThinking = false;
  const sendBtn = document.getElementById('mentor-send-btn');
  if (sendBtn) sendBtn.disabled = false;
  const dot = document.getElementById('mentor-pulse-dot');
  if (dot) dot.style.display = 'none';
  const thinking = document.getElementById('mentor-thinking-indicator');
  if (thinking) {
    if (thinking.dataset.interval) clearInterval(parseInt(thinking.dataset.interval));
    thinking.remove();
  }
}

function mentorScrollBottom() {
  const container = document.getElementById('mentor-messages');
  if (container) setTimeout(() => { container.scrollTop = container.scrollHeight; }, 50);
}

// ── API Anthropic (avec fallback mock) ──
async function v2MentorAsk(question) {
  return mentorAskAPI(question);
}

async function mentorAskAPI(question) {
  // ── VÉRIFICATION PREMIUM ──
  // La première question est gratuite, ensuite Premium requis
  const mentorUsageKey = 'niyyah_mentor_usage';
  const usageCount = parseInt(localStorage.getItem(mentorUsageKey) || '0');

  if (!isPremium() && usageCount >= 1) {
    // Afficher le message freemium DANS le chat (pas de popup brutal)
    mentorHideThinking();
    const freeMsg = "Tu as découvert le Mentor d'Adab. ✦\n\nPour continuer à recevoir des conseils personnalisés par l'IA, débloque Niyyah Premium.\n\nLa première question était offerte — c'est notre façon de te montrer la valeur avant de te demander quoi que ce soit.";
    mentorAddAIMessage(freeMsg);
    // Afficher freemium après 1.5s
    setTimeout(() => {
      const overlay = document.getElementById('freemiumOverlay');
      if (overlay) {
        overlay.classList.add('show');
        document.body.style.overflow = 'hidden';
      }
    }, 1500);
    return;
  }

  // Incrémenter le compteur d'usage
  localStorage.setItem(mentorUsageKey, String(usageCount + 1));

  mentorShowThinking();

  // Build messages for API (last 10 turns max for context)
  const msgs = mentorHistory.slice(-10).filter(m => m.role === 'user' || m.role === 'assistant');
  // Remove last (current user msg already in history) to avoid duplication
  // Actually history already has it — we send it as is

  // POINT 3 — Contextualiser avec l'intention du matin
  let dynamicPrompt = MENTOR_SYSTEM_PROMPT;
  try {
    const vState = JSON.parse(localStorage.getItem('niyyah_v2_state') || '{}');
    if (vState.intention) {
      dynamicPrompt += '\n\n## CONTEXTE DU JOUR\nL\'intention choisie ce matin par l\'utilisateur est : "' + vState.intention + '". Adapte subtilement tes conseils à cette intention sans la mentionner systématiquement — laisse-la infuser naturellement dans ta sagesse.';
    }
    const vHistory = JSON.parse(localStorage.getItem('spiritual_history') || '{}');
    if (vHistory.streak >= 7) {
      dynamicPrompt += '\nL\'utilisateur est en série de ' + vHistory.streak + ' jours consécutifs. Il est dans une phase de constance — adapte ton niveau d\'exigence en conséquence (propose davantage le niveau IHSAN).';
    } else if (vHistory.streak === 0 && vHistory.totalDays > 0) {
      dynamicPrompt += '\nL\'utilisateur reprend après une interruption. Sois particulièrement bienveillant — commence au niveau BASE et remonte doucement.';
    }
  } catch(e) {}

  try {
    // Appel au backend sécurisé (clé API jamais exposée côté client)
    const response = await fetch(NIYYAH_API_URL + '/api/mentor', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: msgs,
        systemPrompt: dynamicPrompt
      })
    });

    if (!response.ok) throw new Error('API ' + response.status);

    const data = await response.json();
    const reply = data.reply;
    if (!reply) throw new Error('No content');

    mentorHideThinking();
    mentorAddAIMessage(reply);

  } catch(err) {
    // ── MOCK FALLBACK (si pas de clé API configurée) ──
    console.log('Mentor mock mode:', err.message);
    setTimeout(() => {
      mentorHideThinking();
      const mock = mentorGenerateMock(question);
      mentorAddAIMessage(mock);
    }, 1400 + Math.random() * 800);
  }
}

// ── Réponses mock pour tester l'interface ──
function mentorGenerateMock(question) {
  const q = question.toLowerCase();

  // ── Banques de réponses variées par thème ──
  const POOL = {
    fajr: [
      `Salam. Fajr est le moment où le monde dort encore et où toi, tu choisis Allah en premier. Ce choix silencieux, répété chaque matin, est ce qui façonne ton âme sans que tu t'en rendes compte.

**BASE** : Tu honores l'obligation. C'est sincère, c'est suffisant — et Allah connaît tes nuits difficiles.
**DÉVOTION** : Tu te lèves non par habitude, mais par désir. Ce désir, même fragile, est une forme d'amour.
**EXCELLENCE (IHSAN)** : Tu pries Fajr comme si c'était ta dernière. Chaque rakaa devient une conversation avec Lui, pas une formalité.

Après cette prière, qu'est-ce que tu veux que ta journée devienne ?`,

      `Compagnon, il y a deux sortes de levers : celui que le monde impose, et celui qu'on choisit pour Allah. Fajr, c'est le second.

**BASE** : Tu réponds à l'appel. Dans le silence de l'aube, ta présence est déjà une victoire sur le confort.
**DÉVOTION** : Tu fais de ce moment un rendez-vous intime — pas une obligation cochée, mais un souffle d'amour.
**EXCELLENCE (IHSAN)** : Al-Ghazali enseigne que la prière du matin donne sa couleur à toute la journée. Tu teints ton âme aux premières lueurs.

Qu'est-ce qui te rend cette prière difficile parfois — le corps, ou le cœur ?`,

      `Frère, chaque Fajr accompli est une preuve que ton âme est encore vivante. Il est rapporté que le Prophète ﷺ ne manquait jamais les deux rakaat de la Sounnah du Fajr, même en voyage.

**BASE** : Tu fais ce que beaucoup ne font pas. Ne l'oublie pas les jours où tu te sens ordinaire.
**DÉVOTION** : Tu offres les prémices de ta journée à Celui qui te l'a donnée. C'est la forme la plus pure de la gratitude.
**EXCELLENCE (IHSAN)** : Tu arrives à la prière avant qu'elle ne t'arrive — préparé, présent, le cœur orienté.

À quoi penses-tu dans les instants qui suivent ta prière ?`
    ],

    travail: [
      `Frère, le travail n'est pas une pause entre deux prières — c'est l'arène où ton caractère se forge. Allah voit ce que ton chef ne verra jamais.

**BASE** : Tu travailles honnêtement. Dans un monde qui normalise la tricherie, c'est déjà un acte de rébellion noble.
**DÉVOTION** : Tu travailles pour être utile — à ta famille, à ta communauté. Ton métier peut être une ibadah si tu le choisis ainsi.
**EXCELLENCE (IHSAN)** : Tu travailles comme si Allah regardait chaque détail. La qualité de ton effort devient ton témoignage silencieux.

Ce soir, quel acte de ton travail aurait pu être une prière sans que tu le saches ?`,

      `Compagnon, Ibn Qayyim enseigne que l'Adab au travail, c'est faire son métier avec la même conscience qu'on apporte à la prière — pas la même forme, mais la même présence.

**BASE** : Tu honores tes engagements professionnels. La fidélité à la parole donnée est le fondement de la confiance.
**DÉVOTION** : Tu choisis la qualité même quand personne ne regarde. Ce choix répété construit ton intégrité.
**EXCELLENCE (IHSAN)** : Tu transformes ton lieu de travail en espace d'adoration intérieure. Chaque interaction devient une occasion de laisser une trace de lumière.

Qu'est-ce qui t'empêche parfois de te donner entièrement dans ton travail ?`,

      `Salam. Le stress au travail, frère, est souvent le signe que tu portes quelque chose qui dépasse tes forces seules.

**BASE** : Reconnais tes limites sans honte. Dire "je ne peux pas tout" est déjà une forme de tawadu — l'humilité.
**DÉVOTION** : Confie à Allah ce que tu ne contrôles pas. La tawakkul n'est pas la passivité — c'est l'action accompagnée de la paix.
**EXCELLENCE (IHSAN)** : Tu transformes chaque difficulté professionnelle en occasion de purifier ton cœur de l'attachement au résultat.

Qu'est-ce qui, dans cette situation, ne dépend pas de toi — et que tu pourrais enfin lâcher ?`
    ],

    colere: [
      `Compagnon, la colère est une braise. Elle peut réchauffer ou brûler — selon la façon dont on la tient.

**BASE** : Tu fais une pause. Tu respires. Tu ne réponds pas dans l'instant. C'est déjà de la maîtrise.
**DÉVOTION** : Tu te rappelles que la personne en face a ses propres blessures. Cette conscience n'excuse pas, mais elle apaise.
**EXCELLENCE (IHSAN)** : Tu transformes ta colère en question intérieure — "qu'est-ce qui en moi a besoin d'être entendu ?" L'Ihsan, c'est se connaître assez pour ne pas se laisser gouverner par l'émotion.

Al-Ghazali consacre tout un chapitre de l'Ihya à la maîtrise de la colère. Il dit : l'homme fort n'est pas celui qui renverse les autres, mais celui qui se maîtrise lui-même.

Qu'est-ce qui a vraiment déclenché cette colère — la situation, ou quelque chose de plus profond ?`,

      `Salam, frère. Le Prophète ﷺ a donné un conseil simple et profond à celui qui demandait comment ne pas se mettre en colère : "Ne te mets pas en colère." Trois fois, la même réponse. Parce que la solution est dans la décision, pas dans la technique.

**BASE** : Tu identifies le signal physique — la tension, la chaleur. Tu l'utilises comme alarme, pas comme déclencheur.
**DÉVOTION** : Tu changes de position. Assis si tu es debout, allongé si tu es assis. Le corps et l'âme sont liés.
**EXCELLENCE (IHSAN)** : Tu fais wudou. L'eau froide sur le visage n'est pas superstition — c'est sagesse du corps.

Qu'est-ce que tu veux que l'autre retienne de toi après cet échange ?`
    ],

    pardon: [
      `Compagnon, tu touches ici l'une des stations les plus hautes et les plus douloureuses de l'âme. Le pardon n'est pas de la faiblesse — c'est de la chirurgie du cœur.

**BASE** : Tu pardonnes pour toi. La rancœur est un poison que tu bois en espérant que l'autre souffre.
**DÉVOTION** : Tu pardonnes en te souvenant de tes propres manquements — Allah te couvre chaque jour sans que tu le mérites pleinement.
**EXCELLENCE (IHSAN)** : Tu pardonnes et tu fais douaa pour celui qui t'a blessé. C'est la station des Siddiqin.

Le Coran pose une question décisive : "N'aimez-vous pas qu'Allah vous pardonne ?" — An-Nur 24:22. Elle ne l'explique pas. Elle le rend inévitable.

Qu'est-ce qui t'empêche encore de franchir ce pas — la douleur, ou l'orgueil ?`,

      `Frère, pardonner ne signifie pas oublier, ni cautionner. Cela signifie choisir de ne plus laisser cette blessure gouverner ton cœur.

**BASE** : Tu reconnais la blessure sans la minimiser. Dire "j'ai été blessé" est honnête et juste.
**DÉVOTION** : Tu distingues le pardon de la réconciliation. On peut pardonner sans reprendre une relation. Les deux sont des choix séparés.
**EXCELLENCE (IHSAN)** : Tu fais douaa pour l'autre. Non par générosité — par libération de toi-même.

Ibn Ata'illah écrit : "Que ta relation avec Allah ne dépende pas de ta relation avec les hommes." Cette phrase seule peut tout changer.

Si tu pardonnais maintenant — pas pour l'autre, mais pour toi — qu'est-ce qui changerait dans ton quotidien ?`
    ],

    famille: [
      `Compagnon, les relations les plus importantes sont aussi les plus difficiles — parce que ce sont les seules où on se montre vraiment.

**BASE** : Tu es présent physiquement. C'est déjà quelque chose que beaucoup n'offrent plus.
**DÉVOTION** : Tu es présent mentalement — tu poses ton téléphone, tu regardes dans les yeux, tu écoutes ce qui n'est pas dit.
**EXCELLENCE (IHSAN)** : Tu traites ta famille comme tu traiterais un hôte précieux — avec le même Adab que tu montrerais à un étranger respecté.

Le Prophète ﷺ a dit : "Le meilleur d'entre vous est celui qui est le meilleur envers sa famille." Cette parole n'est pas un conseil. C'est une redéfinition de l'excellence.

Dans ta famille, qui a le plus besoin de toi en ce moment — et que pourrais-tu offrir dès aujourd'hui ?`
    ],

    stress: [
      `Salam. Le stress est souvent le signe que tu portes ce qui n'est pas à toi seul de porter.

**BASE** : Tu identifies ce qui est dans ton contrôle — et tu lâches consciemment ce qui ne l'est pas.
**DÉVOTION** : Tu pratiques la tawakkul active — tu fais ce qui dépend de toi, puis tu remets le reste à Allah sans le reprendre.
**EXCELLENCE (IHSAN)** : Tu transformes l'anxiété en dhikr. Chaque souffle tendu devient "Hasbunallahu wa ni'mal wakeel" — Allah nous suffit, et quel excellent Gardien.

Al-Ghazali enseigne que la plupart de nos angoisses viennent de notre refus d'habiter le présent. Le passé est fermé, le futur appartient à Allah. Seul ce moment t'appartient.

Qu'est-ce qui, dans tout ce que tu portes en ce moment, pourrait être posé à terre ce soir ?`,

      `Compagnon, le stress n'est pas une faiblesse — c'est un signal. La question n'est pas de le supprimer, mais de l'écouter.

**BASE** : Nomme ce qui te pèse. Mettre des mots sur une charge, c'est déjà la alléger de moitié.
**DÉVOTION** : Fais une pause de 5 minutes avec Allah. Pas forcément une prière formelle — juste un silence habité.
**EXCELLENCE (IHSAN)** : Tu transformes chaque moment de pression en occasion de revenir à ta Niyyah du matin. Pourquoi fais-tu tout cela, au fond ?

Quelle est la première chose que tu pourrais faire, là maintenant, pour alléger ce poids d'un dixième ?`
    ],

    gratitude: [
      `Frère, la gratitude est l'une des stations les plus élevées — et les plus accessibles. Elle ne demande pas de conditions particulières.

**BASE** : Tu dis Alhamdulillah. Ces trois syllabes, prononcées avec conscience, sont "les plus lourdes dans la balance" selon la tradition.
**DÉVOTION** : Tu nommes une grâce précise — pas vague, mais concrète. "Je suis reconnaissant pour ce verre d'eau, pour ce lit, pour ce souffle."
**EXCELLENCE (IHSAN)** : Tu transformes la gratitude en acte. Quand tu réalises une grâce, tu la partages — une parole douce, un geste, un sourire. C'est le Shukr actif.

Ibn Qayyim enseigne que la gratitude protège les grâces et en appelle de nouvelles. Ce n'est pas de la magie — c'est de la psychologie de l'âme.

Pour quelle grâce, souvent oubliée, pourrais-tu dire Alhamdulillah ce soir ?`
    ],

    doute: [
      `Compagnon, le doute n'est pas l'opposé de la foi — c'est parfois sa forme la plus honnête.

**BASE** : Tu distingues le doute intellectuel (les questions) du doute spirituel (la distance du cœur). Les deux ont des remèdes différents.
**DÉVOTION** : Tu continues les actes même dans le doute. Ibn Ata'illah dit : "Ne cesse pas de faire le bien parce que tu ne ressens pas Sa présence — ton acte sincère est une preuve de Sa présence."
**EXCELLENCE (IHSAN)** : Tu transformes tes questions en conversation avec Allah. Le questionnement sincère est une forme de prière.

Qu'est-ce qui, au fond, fait surface dans ce doute — une question sur Allah, ou une question sur toi-même ?`
    ],
  };

  // Sélection du thème
  const isFajr     = q.includes('fajr') || q.includes('prière') || q.includes('salat') || q.includes('subh');
  const isTravail  = q.includes('travail') || q.includes('bureau') || q.includes('réunion') || q.includes('chef') || q.includes('collègue') || q.includes('boulot');
  const isColere   = q.includes('colère') || q.includes('énervé') || q.includes('agacé') || q.includes('frustré') || q.includes('insulté');
  const isPardon   = q.includes('pardon') || q.includes('conflit') || q.includes('blessé') || q.includes('réconcil');
  const isFamille  = q.includes('famille') || q.includes('parent') || q.includes('mère') || q.includes('père') || q.includes('enfant') || q.includes('épouse') || q.includes('mari');
  const isStress   = q.includes('stress') || q.includes('anxieux') || q.includes('anxiété') || q.includes('angoisse') || q.includes('peur') || q.includes('pression');
  const isGratitude = q.includes('reconnaissant') || q.includes('gratitude') || q.includes('alhamdulillah') || q.includes('merci');
  const isDoute    = q.includes('doute') || q.includes('foi') || q.includes('croire') || q.includes('iman') || q.includes('sens');

  // Choisir le pool et une réponse aléatoire dedans
  let pool = null;
  if (isFajr)      pool = POOL.fajr;
  else if (isColere)   pool = POOL.colere;
  else if (isPardon)   pool = POOL.pardon;
  else if (isTravail)  pool = POOL.travail;
  else if (isFamille)  pool = POOL.famille;
  else if (isStress)   pool = POOL.stress;
  else if (isGratitude) pool = POOL.gratitude;
  else if (isDoute)    pool = POOL.doute;

  if (pool) {
    // Rotation basée sur le jour + hash de la question pour varier
    const hash = question.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    return pool[(hash + Math.floor(Date.now() / 86400000)) % pool.length];
  }

  // Réponse générique — aussi variée
  const GENERIQUES = [
    `Compagnon, chaque acte que tu poses est une graine. La Niyyah, c'est le sol dans lequel tu la plantes.

**BASE** : Tu accomplis cet acte parce que c'est juste. L'obéissance sincère est déjà une lumière — ne la sous-estime pas.
**DÉVOTION** : Tu accomplis cet acte en étant pleinement présent — non en pilote automatique, mais avec conscience.
**EXCELLENCE (IHSAN)** : Tu accomplis cet acte comme si c'était le dernier avant ta rencontre avec Lui. Avec tout ce que ton cœur peut offrir.

إِنَّمَا الْأَعْمَالُ بِالنِّيَّاتِ — Les actes ne valent que par leurs intentions. Ce hadith n'est pas une règle. C'est une invitation à vivre autrement.

Parmi tes actes d'aujourd'hui, lequel mériterait une intention plus haute ?`,

    `Salam, frère. Tu m'apportes quelque chose d'important. Laisse-moi t'aider à le regarder différemment.

Ibn Ata'illah écrit : "Ne t'étonne pas de l'existence des obstacles sur le chemin — étonne-toi plutôt de ce qui te permet d'avancer malgré eux."

**BASE** : Dans ce que tu vis, qu'est-ce qui dépend vraiment de toi ? Commence là.
**DÉVOTION** : Quelle intention pourrait transformer cette situation en acte d'adoration ?
**EXCELLENCE (IHSAN)** : Comment Allah verrait-il ton comportement dans cette situation — et es-tu à la hauteur de ce regard ?

Qu'est-ce que cette situation t'enseigne sur toi-même ?`,

    `Compagnon, la question que tu poses touche au cœur de la Tazkiyat al-Nafs — la purification de l'âme.

**BASE** : Commence par l'acte le plus simple, le plus accessible. L'Istiqamah — la constance — naît toujours d'un premier pas modeste.
**DÉVOTION** : Demande-toi pour qui tu fais cela. Quand la réponse est "pour Allah seul", l'acte change de nature.
**EXCELLENCE (IHSAN)** : Imagine que chaque acte laisse une trace dans ton âme. Quelle trace veux-tu y graver aujourd'hui ?

Al-Ghazali enseigne que l'âme ressemble à un miroir — chaque acte bon l'illumine, chaque acte mauvais le ternit. Tu choisis.

Qu'est-ce que tu veux voir dans ce miroir ce soir ?`
  ];

  const gHash = question.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return GENERIQUES[gHash % GENERIQUES.length];
}



/* ══════════════════════════════════════════════════════════
   NIYYAH SCANNER — Vision AI + Sacralisation des objets
   ══════════════════════════════════════════════════════════ */

let _scannerStream  = null;
let _scannerResult  = null;
let _selectedNuance = 0;

/* ── BASE DE DONNÉES de sacralisation (Mode offline) ── */
const SCANNER_LIBRARY = {
  // Nourriture
  food: {
    label: "Repas", icon: "🍽",
    nuances: [
      { tag: "Gratitude",  text: "Nourrir ce corps qui est une amanah d'Allah — pour qu'il continue à servir, aimer et se souvenir de Lui." },
      { tag: "Patience",   text: "Manger lentement, conscient que ce repas est une grâce que d'autres n'ont pas aujourd'hui." },
      { tag: "Excellence", text: "Nourrir ce corps avec excellence — car celui qui prend soin de lui sert mieux Allah et les siens." }
    ]
  },
  // Travail / Tech
  laptop: {
    label: "Travail", icon: "💻",
    nuances: [
      { tag: "Excellence",  text: "Travailler comme un artisan qui sait qu'Allah voit chaque détail — même ceux que le chef ne verra jamais." },
      { tag: "Intention",   text: "Transformer ces heures en service — pour ma famille, ma communauté, et celui qui m'a donné ce talent." },
      { tag: "Présence",    text: "Être pleinement là dans ce travail — chaque tâche accomplie avec soin est une forme d'ibadah." }
    ]
  },
  phone: {
    label: "Téléphone", icon: "📱",
    nuances: [
      { tag: "Vigilance",  text: "Utiliser cet outil avec conscience — chaque mot envoyé laisse une trace dans mon âme et celle de l'autre." },
      { tag: "Connexion",  text: "Que chaque message soit porteur de bien — une parole douce vaut mieux que mille silences froids." },
      { tag: "Limite",     text: "Poser ce téléphone quand il me distrait d'Allah — la présence vaut plus que le scroll infini." }
    ]
  },
  // Livre
  book: {
    label: "Connaissance", icon: "📚",
    nuances: [
      { tag: "Lumière",    text: "Chercher la connaissance comme un acte d'adoration — la lumière qui éclaire le cœur avant d'éclairer l'esprit." },
      { tag: "Humilité",   text: "Apprendre avec l'humilité de celui qui sait qu'il ne sait pas — Al-Ghazali enseigne que la science sans Adab est un danger." },
      { tag: "Service",    text: "Acquérir ce savoir pour servir — pas pour briller, mais pour élever ceux qui m'entourent." }
    ]
  },
  // Famille / Personnes
  person: {
    label: "Présence", icon: "🤝",
    nuances: [
      { tag: "Patience",   text: "Être présent avec douceur — ma patience aujourd'hui est la sécurité de ceux que j'aime demain." },
      { tag: "Adab",       text: "Traiter cette personne comme si le Prophète ﷺ me regardait — avec respect, écoute et noblesse de cœur." },
      { tag: "Amour",      text: "Voir en l'autre une âme créée par Allah — chaque regard bienveillant est une sadaqa." }
    ]
  },
  // Espace de prière / Tapis
  prayer: {
    label: "Prière", icon: "🕌",
    nuances: [
      { tag: "Présence",   text: "Poser mon front sur cette terre avec la conscience que c'est la station la plus proche d'Allah." },
      { tag: "Renouveau",  text: "Chaque prière est une nouvelle naissance — je laisse mes soucis à la porte et j'entre en Sa présence." },
      { tag: "Ihsan",      text: "Prier comme si je Le voyais — et s'Il ne me voit pas, Il me voit certainement." }
    ]
  },
  // Miroir
  mirror: {
    label: "Soi", icon: "✨",
    nuances: [
      { tag: "Dignité",    text: "Prendre soin de moi — car ce corps est un dépôt confié par Allah, pas le mien à négliger." },
      { tag: "Gratitude",  text: "Regarder ce visage et dire Alhamdulillah — je suis vivant, présent, et capable d'aimer aujourd'hui." },
      { tag: "Renouveau",  text: "Commencer cette journée en prenant soin de moi pour mieux prendre soin des autres." }
    ]
  },
  // Eau / Boisson
  drink: {
    label: "Hydratation", icon: "💧",
    nuances: [
      { tag: "Conscience", text: "Boire avec Bismillah — même l'eau devient ibadah quand le cœur est présent." },
      { tag: "Shukr",      text: "Cette eau est une rizq d'Allah — des millions n'y ont pas accès. Chaque gorgée mérite un Alhamdulillah." },
      { tag: "Corps",      text: "Prendre soin de ce corps qui est une amanah — l'hydrater c'est honorer le dépôt qu'Allah m'a confié." }
    ]
  },
  // Voiture / Transport
  car: {
    label: "Trajet", icon: "🚗",
    nuances: [
      { tag: "Présence",   text: "Ce trajet est un souffle de vie offert par Allah — arriver avec plus de conscience qu'on n'est parti." },
      { tag: "Gratitude",  text: "Chaque route parcourue en sécurité est une grâce invisible — Alhamdulillah pour ce mouvement libre." },
      { tag: "Intention",  text: "Transformer ce déplacement en dhikr — chaque kilomètre peut être une méditation si le cœur est présent." }
    ]
  },
  // Nature / Plantes
  nature: {
    label: "Nature", icon: "🌿",
    nuances: [
      { tag: "Contemplation", text: "Chaque feuille glorifie Allah à sa façon — cette beauté est un signe pour ceux qui réfléchissent." },
      { tag: "Gratitude",     text: "La nature ne ment jamais sur la grandeur de son Créateur — laisser ce spectacle nourrir la foi." },
      { tag: "Paix",          text: "Ce vert est une guérison pour les yeux et pour l'âme — s'arrêter, observer, remercier." }
    ]
  },
  // Argent / Portefeuille
  money: {
    label: "Rizq", icon: "💰",
    nuances: [
      { tag: "Amanah",  text: "Ce bien est un dépôt d'Allah — le dépenser avec justice, le partager avec générosité, jamais le thésauriser avec peur." },
      { tag: "Shukr",   text: "Le rizq vient d'Allah — dépenser Bismillah et donner une part au passage est la façon du croyant." },
      { tag: "Tawakkul",text: "La sécurité n'est pas dans ce que je possède, mais dans Celui qui pourvoit — relâcher la peur, garder la confiance." }
    ]
  },
  // Lit / Repos
  bed: {
    label: "Repos", icon: "🌙",
    nuances: [
      { tag: "Gratitude",  text: "Ce lit est un sanctuaire — je pose mes soucis et confie ma nuit à Allah comme le Prophète ﷺ le faisait." },
      { tag: "Renouveau",  text: "Le sommeil est une petite mort — et chaque réveil, une résurrection offerte. Alhamdulillah illadhi ahyana." },
      { tag: "Paix",       text: "Fermer les yeux en état de grâce — lire Ayat al-Kursi et laisser les anges veiller." }
    ]
  },
  // Par défaut
  default: {
    label: "Objet du quotidien", icon: "✦",
    nuances: [
      { tag: "Intention",  text: "Transformer cet acte banal en acte sacré — par la Niyyah, le monde entier devient un lieu d'adoration." },
      { tag: "Présence",   text: "Être pleinement là dans ce moment — la présence consciente est la forme la plus rare de la dévotion." },
      { tag: "Gratitude",  text: "Nommer la grâce dans cet instant ordinaire — car le quotidien est fait de petites bénédictions non vues." }
    ]
  }
};

/* ── Mapper les labels de l'API Vision vers les catégories ── */
function scannerMapLabel(labels) {
  var l = labels.join(' ').toLowerCase();
  if (/food|meal|dish|plate|pizza|burger|salad|fruit|vegetable|rice|bread|soup/.test(l)) return 'food';
  if (/laptop|computer|keyboard|screen|monitor|desktop/.test(l))  return 'laptop';
  if (/phone|smartphone|mobile|iphone|android/.test(l))           return 'phone';
  if (/book|notebook|journal|reading|magazine/.test(l))           return 'book';
  if (/person|face|people|human|child|family|man|woman/.test(l))  return 'person';
  if (/prayer|mat|mosque|quran|rosary|tasbi|misbaha/.test(l))     return 'prayer';
  if (/mirror|reflection/.test(l))                                 return 'mirror';
  if (/water|drink|coffee|tea|cup|glass|bottle/.test(l))          return 'drink';
  if (/car|vehicle|truck|bus|bicycle|road|wheel|transport/.test(l)) return 'car';
  if (/plant|flower|tree|nature|leaf|grass|garden|outdoor/.test(l)) return 'nature';
  if (/money|wallet|cash|coin|bill|card|credit|banknote/.test(l))   return 'money';
  if (/bed|pillow|blanket|sleep|bedroom|mattress/.test(l))          return 'bed';
  return 'default';
}

/* ── Ouvrir le Scanner ── */
async function scannerOpen() {
  const overlay = document.getElementById('scanner-overlay');
  if (!overlay) return;

  // Demander accès caméra
  try {
    _scannerStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    const video = document.getElementById('scanner-video');
    video.srcObject = _scannerStream;
    await video.play();
  } catch(err) {
    v2ShowToast("Accès caméra refusé — autorise l'accès dans les réglages");
    return;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset état
  document.getElementById('scanner-result').classList.remove('active');
  document.getElementById('scanner-capture-btn').classList.remove('hidden');
  document.getElementById('scanner-orb').classList.remove('scanning');
  document.getElementById('scanner-hint').textContent = "Quel objet portera ta niyyah aujourd'hui ?";
  document.getElementById('scanner-hint').style.opacity = '1';
  _scannerResult = null;
}

/* ── Journal du Scanner ── */
function openScannerJournal() {
  var overlay = document.getElementById('scanner-journal-overlay');
  var content = document.getElementById('scanner-journal-content');
  if (!overlay || !content) return;
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem('niyyah_scanner_history') || '[]'); } catch(e) {}
  if (hist.length === 0) {
    content.innerHTML = '<div style="text-align:center;padding:60px 20px;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;color:#B0A080;">Tes intentions apparaîtront ici ✦</div></div>';
  } else {
    var html = '<div style="display:flex;gap:14px;overflow-x:auto;padding:8px 0 16px;-webkit-overflow-scrolling:touch;scroll-snap-type:x mandatory;">';
    hist.forEach(function(entry, i) {
      var _formattedDate = '';
      try { _formattedDate = new Date(entry.date + 'T12:00:00').toLocaleDateString('fr-FR', {day:'numeric', month:'long', year:'numeric'}); } catch(e) { _formattedDate = entry.date; }
      html += '<div class="journal-card" style="min-width:260px;max-width:260px;height:160px;background:linear-gradient(135deg,#1a1a1a,#2C2E32);border:1px solid rgba(200,168,75,0.6);border-radius:16px;padding:20px;display:flex;flex-direction:column;justify-content:space-between;scroll-snap-align:start;flex-shrink:0;box-shadow:0 0 20px rgba(200,168,75,0.15);animation:journalCardIn 0.4s ease both ' + (i * 100) + 'ms;">'
        + '<div style="font-family:\'Cinzel\',serif;font-size:10px;color:#C8A84A;letter-spacing:1px;">' + entry.time + ' · ' + entry.day + '</div>'
        + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;color:#E8DCC0;line-height:1.5;overflow:hidden;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;">« ' + entry.text + ' »</div>'
        + '<div style="font-size:10px;color:#B0A080;">' + _formattedDate + '</div>'
        + '</div>';
    });
    html += '</div>';
    content.innerHTML = html;
  }
  overlay.style.display = 'block';
  overlay.style.opacity = '0';
  requestAnimationFrame(function() { overlay.style.opacity = '1'; });
  // Pull-to-close gesture
  var _touchY = 0;
  overlay.ontouchstart = function(e) { _touchY = e.touches[0].clientY; };
  overlay.ontouchmove = function(e) {
    var dy = e.touches[0].clientY - _touchY;
    if (dy > 120) { closeScannerJournal(); overlay.ontouchstart = null; overlay.ontouchmove = null; }
  };
}
function closeScannerJournal() {
  var overlay = document.getElementById('scanner-journal-overlay');
  if (!overlay) return;
  overlay.style.opacity = '0';
  setTimeout(function() { overlay.style.display = 'none'; }, 300);
}

/* ── Fermer le Scanner ── */
function scannerClose() {
  const overlay = document.getElementById('scanner-overlay');
  if (overlay) overlay.classList.remove('active');
  if (_scannerStream) {
    _scannerStream.getTracks().forEach(function(t) { t.stop(); });
    _scannerStream = null;
  }
  document.body.style.overflow = '';
}

/* ── Afficher le résultat ── */
function scannerShowResult(data) {
  _scannerResult = data;
  const lib      = SCANNER_LIBRARY[data.category] || SCANNER_LIBRARY.default;
  const hint     = document.getElementById('scanner-hint');
  const result   = document.getElementById('scanner-result');

  // ✦ Masquer l'overlay de réflexion IA
  const thinkingEl = document.getElementById('scanner-thinking');
  if (thinkingEl) thinkingEl.classList.remove('active');

  hint.style.opacity = '0';

  // ══ CAS NIYYAH DIRECTE (générée par IA contextuelle) ══
  if (data.niyyahDirect) {
    var arText   = document.getElementById('scanner-ar-text');
    var arNiyyah = document.getElementById('scanner-ar-niyyah');
    var arTag    = document.getElementById('scanner-ar-tag');
    if (arText && arNiyyah) {
      arTag.textContent    = '✦ NIYYAH';
      arNiyyah.textContent = data.niyyahDirect.substring(0, 100);
      arText.classList.add('active');
      setTimeout(function() { arText.classList.remove('active'); }, 3000);
    }
    document.getElementById('scanner-object-label').textContent  = '✦  INTENTION POSÉE';
    document.getElementById('scanner-niyyah-main').textContent   = '"' + data.niyyahDirect + '"';
    const nuancesEl = document.getElementById('scanner-nuances');
    if (nuancesEl) nuancesEl.innerHTML = '';
    result.classList.add('active');
    if (navigator.vibrate) navigator.vibrate([25, 50, 40]);
    return;
  }

  // ══ EFFET AR — Intention flottante dans la réalité ══
  var arText = document.getElementById('scanner-ar-text');
  var arNiyyah = document.getElementById('scanner-ar-niyyah');
  var arTag = document.getElementById('scanner-ar-tag');
  if (arText && arNiyyah) {
    arTag.textContent = lib.icon + ' ' + (data.objectName || lib.label).toUpperCase();
    arNiyyah.textContent = lib.nuances[0].text.substring(0, 100) + '…';
    arText.classList.add('active');
    // Disparaît après 3s quand le résultat complet arrive
    setTimeout(function() { arText.classList.remove('active'); }, 3000);
  }

  // Remplir le résultat complet
  document.getElementById('scanner-object-label').textContent =
    lib.icon + '  ' + (data.objectName || lib.label).toUpperCase();

  document.getElementById('scanner-niyyah-main').textContent =
    '"' + lib.nuances[0].text + '"';

  // 3 nuances d'intention (POINT 3)
  const nuancesEl = document.getElementById('scanner-nuances');
  nuancesEl.innerHTML = '';
  lib.nuances.forEach(function(n, i) {
    var div = document.createElement('div');
    div.className = 'scanner-nuance' + (i === 0 ? ' selected' : '');
    div.onclick = function() {
      document.querySelectorAll('.scanner-nuance').forEach(function(el) { el.classList.remove('selected'); });
      div.classList.add('selected');
      document.getElementById('scanner-niyyah-main').textContent = '"' + n.text + '"';
      _selectedNuance = i;
      if (navigator.vibrate) navigator.vibrate([15]);
    };
    div.innerHTML =
      '<div class="scanner-nuance-label">✦ ' + n.tag + '</div>' +
      '<div class="scanner-nuance-text">' + n.text + '</div>';
    nuancesEl.appendChild(div);
  });

  result.classList.add('active');
  if (navigator.vibrate) navigator.vibrate([25, 50, 40]);
}

/* ── Confirmer la Niyyah — POINT 4 : action cochée automatiquement ── */
function scannerConfirmNiyyah() {
  const lib  = SCANNER_LIBRARY[_scannerResult?.category] || SCANNER_LIBRARY.default;
  const nuance = lib.nuances[_selectedNuance] || lib.nuances[0];
  const intentionText = _scannerResult?.niyyahDirect || nuance.text;

  // Sauvegarder comme intention du moment
  try {
    var s = JSON.parse(localStorage.getItem('niyyah_v2_state') || '{}');
    s.intention = intentionText;
    s.intentionSource = 'scanner';
    s.intentionTime   = Date.now();
    localStorage.setItem('niyyah_v2_state', JSON.stringify(s));
  } catch(e) {}

  // Save to scanner history
  try {
    var _now = new Date();
    var _hist = JSON.parse(localStorage.getItem('niyyah_scanner_history') || '[]');
    _hist.unshift({ text: intentionText, time: _now.toTimeString().substring(0,5), date: _now.toISOString().split('T')[0], day: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][_now.getDay()] });
    if (_hist.length > 20) _hist.length = 20;
    localStorage.setItem('niyyah_scanner_history', JSON.stringify(_hist));
  } catch(e) {}

  // Toast fraternel
  v2ShowToast('✦ Niyyah posée — Bismillah 🌿');
  if (navigator.vibrate) navigator.vibrate([20, 40, 80]);

  // Fermer le scanner
  setTimeout(function() {
    scannerClose();
    // Retour au Sanctuaire avec l'infusion de la nouvelle intention
    try { if (typeof applyInfusion === 'function') applyInfusion(intentionText); } catch(e) {}
    try { if (typeof v2GoSanctuaire === 'function') v2GoSanctuaire(); } catch(e) {}
  }, 400);
}

/* ── Partager carte Niyyah ── */
function scannerShareCard() {
  var lib = SCANNER_LIBRARY[_scannerResult?.category] || SCANNER_LIBRARY.default;
  var niyyah = _scannerResult?.niyyahDirect || lib.nuances[_selectedNuance || 0].text;
  var arabicMap = {
    patience: 'صَبْر', gratitude: 'شُكْر', presence: 'حُضُور', intention: 'نِيَّة',
    water: 'مَاء', food: 'رِزْق', nature: 'تَفَكُّر', book: 'عِلْم',
    mirror: 'تَزْكِيَة', phone: 'ذِكْر', car: 'تَوَكُّل', default: 'نِيَّة'
  };
  var category = _scannerResult?.category || 'default';
  var arabicWord = arabicMap[category] || arabicMap.default;

  var canvas = document.getElementById('scanner-share-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var w = 1080, h = 1080;
  canvas.width = w; canvas.height = h;

  // Fond
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, w, h);

  // Halo doré central
  var grad = ctx.createRadialGradient(w/2, h/2, 0, w/2, h/2, 350);
  grad.addColorStop(0, 'rgba(200,168,75,0.12)');
  grad.addColorStop(0.5, 'rgba(200,168,75,0.04)');
  grad.addColorStop(1, 'rgba(200,168,75,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Mot arabe en grand
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(200,168,75,0.2)';
  ctx.font = '160px "Noto Naskh Arabic", serif';
  ctx.fillText(arabicWord, w/2, 340);

  // Intention
  ctx.fillStyle = '#E8DCC0';
  ctx.font = 'italic 44px "Cormorant Garamond", serif';
  var lines = wrapCanvasText(ctx, '« ' + niyyah + ' »', w - 200);
  var startY = h/2 + 40;
  lines.forEach(function(line, i) {
    ctx.fillText(line, w/2, startY + i * 52);
  });

  // Séparateur ✦
  ctx.fillStyle = '#C8A84A';
  ctx.font = '24px serif';
  ctx.fillText('✦', w/2, startY + lines.length * 52 + 40);

  // Niyyah Daily en bas
  ctx.fillStyle = 'rgba(200,168,75,0.35)';
  ctx.font = '28px "Cinzel", serif';
  ctx.letterSpacing = '4px';
  ctx.fillText('NIYYAH DAILY  ✦', w/2, h - 60);

  // Aperçu avant partage
  var dataUrl = canvas.toDataURL('image/png');
  var existing = document.getElementById('card-preview-overlay');
  if (existing) existing.remove();
  var overlay = document.createElement('div');
  overlay.id = 'card-preview-overlay';
  overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99999;background:rgba(0,0,0,0.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;box-sizing:border-box;';
  overlay.innerHTML = '<img src="' + dataUrl + '" style="width:90vw;height:90vw;object-fit:contain;border-radius:16px;border:1px solid rgba(200,168,75,0.3);margin-bottom:20px;">'
    + '<div style="display:flex;gap:12px;">'
    + '<button id="card-share-btn" style="padding:14px 28px;background:#C8A84A;color:#000;font-family:\'Cinzel\',serif;font-size:12px;font-weight:700;letter-spacing:2px;border:none;border-radius:12px;cursor:pointer;">PARTAGER ✦</button>'
    + '<button id="card-close-btn" style="padding:14px 28px;background:transparent;color:rgba(255,255,255,0.5);font-family:\'Cinzel\',serif;font-size:12px;letter-spacing:2px;border:1px solid rgba(255,255,255,0.15);border-radius:12px;cursor:pointer;">FERMER</button>'
    + '</div>';
  document.body.appendChild(overlay);
  var _niyyahText = niyyah;
  document.getElementById('card-close-btn').onclick = function() { overlay.remove(); };
  document.getElementById('card-share-btn').onclick = function() {
    canvas.toBlob(function(blob) {
      var file = new File([blob], 'niyyah-intention.png', { type: 'image/png' });
      if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file], title: 'Mon intention — Niyyah Daily', text: '✦ ' + _niyyahText }).catch(function() {});
      } else {
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url; a.download = 'niyyah-intention.png';
        a.click();
        URL.revokeObjectURL(url);
      }
      overlay.remove();
    }, 'image/png');
  };
}
function wrapCanvasText(ctx, text, maxWidth) {
  var words = text.split(' '), lines = [], line = '';
  words.forEach(function(word) {
    var test = line + (line ? ' ' : '') + word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line); line = word;
    } else { line = test; }
  });
  if (line) lines.push(line);
  return lines;
}
// TEST — REMOVE AFTER
function testShareCard() {
  _scannerResult = { category: 'nature', niyyahDirect: 'Chaque souffle est un don d\'Allah — je choisis de vivre cette journée avec présence et gratitude.' };
  _selectedNuance = 0;
  var origCanvas = document.getElementById('scanner-share-canvas');
  var testCanvas = document.getElementById('scanner-share-canvas-test');
  if (testCanvas) testCanvas.id = 'scanner-share-canvas';
  scannerShareCard();
  if (testCanvas) {
    testCanvas.id = 'scanner-share-canvas-test';
    var preview = document.getElementById('test-card-preview');
    if (preview) {
      preview.src = testCanvas.toDataURL('image/png');
      preview.style.display = 'block';
    }
  }
}

/* ── Rescanner ── */
function scannerRetry() {
  document.getElementById('scanner-result').classList.remove('active');
  document.getElementById('scanner-capture-btn').classList.remove('hidden');
  const thinkingRetry = document.getElementById('scanner-thinking');
  if (thinkingRetry) thinkingRetry.classList.remove('active');
  document.getElementById('scanner-hint').textContent = "Quel objet portera ta niyyah aujourd'hui ?";
  document.getElementById('scanner-hint').style.opacity = '1';
  _scannerResult = null;
  _selectedNuance = 0;
}

/* Exposer sur window */

/* ── Capturer et Analyser ── */
async function scannerCapture() {
  // Limite 3 scans par jour
  var _scanDate = localStorage.getItem('niyyah_scanner_date');
  var _scanCount = parseInt(localStorage.getItem('niyyah_scanner_count') || '0', 10);
  if (_scanDate !== TODAY) { _scanCount = 0; localStorage.setItem('niyyah_scanner_date', TODAY); }
  if (_scanCount >= 1) {
    showToast('Ton scan du jour a été utilisé — reviens demain inch\'Allah 🌙');
    return;
  }
  localStorage.setItem('niyyah_scanner_count', String(_scanCount + 1));

  const video   = document.getElementById('scanner-video');
  const canvas  = document.getElementById('scanner-canvas');
  const orb     = document.getElementById('scanner-orb');
  const hint    = document.getElementById('scanner-hint');
  const captBtn = document.getElementById('scanner-capture-btn');

  // Animation scanning
  orb.classList.add('scanning');

  // ✦ Afficher l'overlay de réflexion IA
  const thinkingEl = document.getElementById('scanner-thinking');
  if (thinkingEl) thinkingEl.classList.add('active');
  captBtn.classList.add('hidden');
  hint.textContent = 'Analyse en cours…';
  hint.style.opacity = '0.8';

  // Capturer l'image depuis la vidéo
  canvas.width  = video.videoWidth  || 1280;
  canvas.height = video.videoHeight || 720;
  var ctx = canvas.getContext('2d');
  ctx.drawImage(video, 0, 0);
  var imageData = canvas.toDataURL('image/jpeg', 0.85);

  // Traitement < 3 secondes
  try {
    var result = await scannerAnalyzeImage(imageData);
    (window.scannerShowResult || scannerShowResult)(result);
  } catch(err) {
    // Fallback offline élégant
    const thinkingElErr = document.getElementById('scanner-thinking');
    if (thinkingElErr) thinkingElErr.classList.remove('active');
    (window.scannerShowResult || scannerShowResult)({ category: 'default', labels: ['objet'] });
  } finally {
    // POINT 4 — Supprimer l'image immédiatement (vie privée)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    canvas.width = 1; canvas.height = 1;
    orb.classList.remove('scanning');
  }
}

/* ── Analyser l'image via API ── */
async function scannerAnalyzeImage(imageData) {
  // Essayer le backend sécurisé d'abord
  try {
    const base64 = imageData.replace(/^data:image\/jpeg;base64,/, '');

    const response = await fetch(NIYYAH_API_URL + '/api/scanner', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64 })
    });

    if (response.ok) {
      const data = await response.json();
      // Le Worker retourne { intention: "..." }
      if (data.intention) {
        return {
          category: 'niyyah_direct',
          labels: [data.intention],
          objectName: data.intention,
          niyyahDirect: data.intention
        };
      }
    }
  } catch(e) {}

  // Fallback intelligent — analyser directement via Claude Vision
  try {
    const now = new Date();
    const h = now.getHours();
    const day = now.getDay();
    const month = now.getMonth() + 1;

    let moment = '';
    if (h >= 4 && h < 7)        moment = 'au moment de Fajr (aube)';
    else if (h >= 7 && h < 12)  moment = 'en matinée';
    else if (h >= 12 && h < 14) moment = 'au moment de Dhuhr (mi-journée)';
    else if (h >= 14 && h < 17) moment = 'en après-midi';
    else if (h >= 17 && h < 20) moment = 'au moment de Asr et Maghrib';
    else if (h >= 20 && h < 22) moment = 'en soirée après Isha';
    else                         moment = 'tard dans la nuit';

    let extra = '';
    if (day === 5) extra += " C'est le vendredi béni, jour de Jumu'ah.";
    if (month === 3 || month === 4) extra += ' Nous sommes potentiellement en Ramadan.';

    const systemPrompt = `Tu es un générateur de niyyah islamique évolutif.
Tu reçois une image — objet, lieu, actualité, écran, nature, visage — et tu produis UNE seule intention islamique intérieure.

FORMAT STRICT :
- Une seule phrase
- Maximum 15 mots
- Commence obligatoirement par "Je" ou "Que je"
- Français uniquement
- Rien d'autre — aucun titre, aucune explication

CONTEXTE : ${moment}.${extra}

STYLE :
- Islamique sans être moraliste
- Calme, ancré, légèrement poétique si naturel
- Jamais directif ni culpabilisant
- Percutant — une vérité qu'on ressent dans la poitrine
- Partageable — comme un verset court

ACTUALITÉ / SOUFFRANCE :
Si l'image montre guerre, injustice, catastrophe, pauvreté :
→ intention de recul intérieur, de gratitude ou de dou'a silencieux
→ jamais de commentaire politique

CONTENU INAPPROPRIÉ :
Si nudité, violence explicite, contenu sexuel :
→ répondre uniquement : "Contenu non approprié"

ANTI-RÉPÉTITION :
Ne jamais reformuler la même idée, ne jamais commencer par "je vois"

EXEMPLES DU NIVEAU ATTENDU :
"Je mange avec la conscience de celui qui sait que c'est un don."
"Je pose tout ce que je porte et je reviens à l'essentiel."
"Je fais de ma paix intérieure une réponse à la souffrance du monde."
"Je conduis ce vendredi comme si chaque feu rouge était un dhikr."`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 60,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: [{
            type: 'image',
            source: { type: 'base64', media_type: 'image/jpeg', data: imageData.replace(/^data:image\/jpeg;base64,/, '') }
          }, {
            type: 'text',
            text: 'Génère la niyyah.'
          }]
        }]
      })
    });

    if (response.ok) {
      const data = await response.json();
      const intention = data.content?.[0]?.text?.trim() || '';
      if (intention === 'Contenu non approprié') {
        return { category: 'inappropriate', labels: [], objectName: '', niyyahDirect: 'Contenu non approprié' };
      }
      return {
        category: 'niyyah_direct',
        labels: [intention],
        objectName: intention,
        niyyahDirect: intention
      };
    }
  } catch(e) {}

  // Fallback total offline
  return { category: 'default', labels: ['objet'], objectName: 'objet du quotidien' };





// HOOK: Journal Vocal
function v2JournalRecord() {
  v2ShowToast('Journal de l\'Âme — Prochainement ✦');
}
}



window.scannerOpen          = scannerOpen;
window.scannerClose         = scannerClose;
window.scannerCapture       = scannerCapture;
window.scannerShowResult    = scannerShowResult;
window.scannerConfirmNiyyah = scannerConfirmNiyyah;
window.scannerRetry         = scannerRetry;

