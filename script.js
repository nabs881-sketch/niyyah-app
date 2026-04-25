// ═══════════════════════════════════════════════════
// NIYYAH DAILY — script.js
// Généré automatiquement — séparation chirurgicale
// ═══════════════════════════════════════════════════
const NIYYAH_DEBUG = false;
function safeSetItem(key, value) { try { localStorage.setItem(key, value); } catch(e) {} }

// ═══════════════════════════════════════════════════
// JOURNAL V2 — Storage helpers
// ═══════════════════════════════════════════════════

function compressPhoto(dataURL) {
  return new Promise(function(resolve) {
    var img = new Image();
    img.onload = function() {
      var c = document.createElement('canvas');
      c.width = 400; c.height = 600;
      var ratio = Math.min(400 / img.width, 600 / img.height);
      var w = img.width * ratio, h = img.height * ratio;
      var ctx = c.getContext('2d');
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 400, 600);
      ctx.drawImage(img, (400 - w) / 2, (600 - h) / 2, w, h);
      resolve(c.toDataURL('image/jpeg', 0.8));
    };
    img.onerror = function() { resolve(null); };
    img.src = dataURL;
  });
}

function cleanOldPhotosIfFull() {
  try {
    var total = 0;
    for (var i = 0; i < localStorage.length; i++) { total += localStorage.getItem(localStorage.key(i)).length; }
    if (total < 4 * 1024 * 1024) return;
    ['niyyah_regarde_history', 'niyyah_niyyah_history'].forEach(function(key) {
      var arr = JSON.parse(localStorage.getItem(key) || '[]');
      var changed = false;
      for (var j = arr.length - 1; j >= 0; j--) {
        if (arr[j].photo) { arr[j].photo = null; changed = true; }
      }
      if (changed) safeSetItem(key, JSON.stringify(arr));
    });
  } catch(e) {}
}

function _journalGet(key) {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch(e) { return []; }
}

function _journalSave(key, arr) {
  cleanOldPhotosIfFull();
  safeSetItem(key, JSON.stringify(arr));
}

function addRegardeEntry(entry) {
  var arr = _journalGet('niyyah_regarde_history');
  var item = {
    id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    date: new Date().toISOString(),
    question: entry.question || '',
    category: entry.category || 'INDETERMINE',
    photo: entry.photo || null,
    bookmark: !!entry.bookmark,
    note: entry.note || ''
  };
  arr.unshift(item);
  _journalSave('niyyah_regarde_history', arr);
  return item;
}

function addNiyyahEntry(entry) {
  var arr = _journalGet('niyyah_niyyah_history');
  var item = {
    id: Date.now() + '_' + Math.random().toString(36).slice(2, 6),
    date: new Date().toISOString(),
    intention: entry.intention || '',
    category: entry.category || 'INDETERMINE',
    photo: entry.photo || null
  };
  arr.unshift(item);
  _journalSave('niyyah_niyyah_history', arr);
  return item;
}

function getRegardeHistory() { return _journalGet('niyyah_regarde_history'); }
function getNiyyahHistory() { return _journalGet('niyyah_niyyah_history'); }

function updateRegardeEntry(id, updates) {
  var arr = _journalGet('niyyah_regarde_history');
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      if (updates.bookmark !== undefined) arr[i].bookmark = updates.bookmark;
      if (updates.note !== undefined) arr[i].note = updates.note;
      _journalSave('niyyah_regarde_history', arr);
      return arr[i];
    }
  }
  return null;
}

function deleteEntry(type, id) {
  var key = type === 'regarde' ? 'niyyah_regarde_history' : 'niyyah_niyyah_history';
  var arr = _journalGet(key);
  arr = arr.filter(function(e) { return e.id !== id; });
  _journalSave(key, arr);
}

function migrateOldJournal() {
  if (localStorage.getItem('niyyah_migration_v2_done') === '1') return;
  try {
    var old = JSON.parse(localStorage.getItem('niyyah_scanner_history') || '[]');
    if (old.length > 0) {
      var existing = _journalGet('niyyah_niyyah_history');
      old.forEach(function(entry) {
        existing.push({
          id: (entry.date || '') + '_' + Math.random().toString(36).slice(2, 6),
          date: entry.date ? new Date(entry.date + 'T' + (entry.time || '00:00')).toISOString() : new Date().toISOString(),
          intention: entry.text || '',
          category: 'INDETERMINE',
          photo: null
        });
      });
      _journalSave('niyyah_niyyah_history', existing);
    }
  } catch(e) {}
  safeSetItem('niyyah_migration_v2_done', '1');
}
migrateOldJournal();

/* ─── BLOC 1 : Fix Stats Row ─────────────────────── */


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
    const activeOverlay = document.querySelector('#meditScreen.show,#tasbihOverlay.show,#levelPopup.show,#freemiumOverlay.show,#weeklyOverlay.show,#infoSheet.show');
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
function saveDefiState(s) { safeSetItem('niyyah_defi_v2', JSON.stringify(s)); }

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
      s.current = { id: premierDefi.id, semaine: lundi, jours: [], complete: false, chosenAt: Date.now() };
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
  // Vérifier verrouillage 24h
  if (s.current && s.current.chosenAt) {
    var hoursSince = (Date.now() - s.current.chosenAt) / 3600000;
    if (hoursSince > 24) {
      showToast(t('defi_locked'));
      closeDefiSelector();
      return;
    }
  }
  s.current = { id: defi.id, semaine: lundi, jours: [], complete: false, chosenAt: Date.now() };
  s.historique = [defi.id, ...s.historique].slice(0, 12);
  s.choixEnAttente = null;
  saveDefiState(s);
  safeSetItem('niyyah_defi_chosenAt', String(Date.now()));
  closeDefiSelector();
  renderDefiCard();
  if (typeof renderDefiOverlay === 'function') renderDefiOverlay();
  showToast(t('defi_launched') + tD(defi) + ' ✦');
}

function getDefiCourant() {
  const s = initDefiSemaine();
  const lundi = getLundiDate();
  if (!s.current || s.current.semaine !== lundi) {
    // Auto-assigner un défi si aucun n'existe pour cette semaine
    var suggestion = getSuggestionDefi();
    if (suggestion) {
      s.current = { id: suggestion.id, semaine: lundi, jours: [], complete: false, chosenAt: Date.now() };
      s.choixEnAttente = null;
      saveDefiState(s);
    }
  }
  if (!s.current) return { defi: null, state: s };
  // Migration : anciens défis sans chosenAt
  if (s.current && !s.current.chosenAt) {
    s.current.chosenAt = Date.now();
    saveDefiState(s);
  }
  return { defi: DEFIS_DB.find(d => d.id === s.current.id), state: s };
}

// ── DRAWER SÉLECTEUR ─────────────────────────────────────────────────────────
function openDefiSelector() {
  const s = getDefiState();
  // Verrouillage 24h — lecture seule
  if (s.current && s.current.chosenAt) {
    var hoursSince = (Date.now() - s.current.chosenAt) / 3600000;
    if (hoursSince > 24) {
      var defiActif = DEFIS_DB.find(function(d) { return d.id === s.current.id; });
      var ov2 = document.getElementById('defiSelectorOverlay');
      var body2 = document.getElementById('defiSelectorBody');
      if (!ov2 || !body2) return;
      body2.innerHTML = '<div style="text-align:center;padding:30px 16px;">'
        + '<div style="font-size:28px;margin-bottom:14px;">' + (defiActif ? defiActif.icon : '✦') + '</div>'
        + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-weight:600;color:#C8A84A;margin-bottom:8px;">' + (defiActif ? tD(defiActif) : 'Défi en cours') + '</div>'
        + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#B0A080;line-height:1.6;margin-bottom:20px;">Ton défi est ta niyyah de la semaine.<br>Tiens-le jusqu\'à dimanche, in sha Allah ✦</div>'
        + '<button onclick="closeDefiSelector()" style="padding:12px 28px;border-radius:12px;border:1px solid rgba(200,168,75,0.3);background:transparent;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-size:12px;letter-spacing:1px;cursor:pointer;" aria-label="Fermer">'+t('modal_close')+'</button>'
        + '</div>';
      ov2.style.opacity = '1'; ov2.style.pointerEvents = 'all';
      setTimeout(function() { document.getElementById('defiSelectorSheet').style.transform = 'translateY(0)'; }, 10);
      return;
    }
  }
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
    html += '<div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(200,168,75,0.7);margin-bottom:10px;">✦ Suggestion de la semaine</div>';
    html += '<div onclick="confirmerDefi(' + suggestion.id + ')" style="background:rgba(200,168,75,0.09);border:1px solid rgba(200,168,75,0.3);border-radius:14px;padding:14px 16px;cursor:pointer;position:relative;overflow:hidden;transition:all 0.2s;" ontouchstart="this.style.opacity=0.8" ontouchend="this.style.opacity=1">';
    html += '<div style="position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(200,168,75,0.6),transparent);"></div>';
    html += '<div style="display:flex;align-items:center;gap:12px;">';
    html += '<div style="width:44px;height:44px;background:rgba(200,168,75,0.12);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;">' + suggestion.icon + '</div>';
    html += '<div style="flex:1;min-width:0;">';
    html += '<div style="font-size:14px;font-weight:600;color:#fff;margin-bottom:4px;line-height:1.3;">' + tD(suggestion) + '</div>';
    html += '<div style="display:flex;align-items:center;gap:8px;">';
    html += '<span style="font-size:12px;font-weight:700;padding:2px 8px;border-radius:10px;background:' + diffBg[suggestion.diff] + ';border:0.5px solid ' + diffBorder[suggestion.diff] + ';color:' + diffColor[suggestion.diff] + ';">' + diffLabel[suggestion.diff] + '</span>';
    html += '<span style="font-size:12px;color:rgba(255,255,255,0.55);">' + suggestion.cible + ' ' + suggestion.unite + '</span>';
    html += '</div></div>';
    html += '<div style="font-size:20px;color:rgba(200,168,75,0.6);">›</div>';
    html += '</div></div></div>';
  }

  // Onglets par difficulté
  html += '<div style="display:flex;gap:6px;margin-bottom:14px;" id="defiTabsRow">';
  for (const d of ['facile','moyen','intensif']) {
    const active = d === 'facile';
    html += '<button data-diff="' + d + '" id="defiTab_' + d + '" style="flex:1;padding:7px 4px;border-radius:10px;border:1px solid ' + (active ? diffBorder[d] : 'rgba(255,255,255,0.07)') + ';background:' + (active ? diffBg[d] : 'transparent') + ';color:' + (active ? diffColor[d] : 'rgba(255,255,255,0.4)') + ';font-size:12px;font-weight:700;cursor:pointer;font-family:var(--sans);transition:all 0.2s;">' + diffLabel[d] + '</button>';
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
      html += '<div style="font-size:13px;color:rgba(255,255,255,0.88);line-height:1.3;">' + tD(d) + '</div>';
      html += '<div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:2px;">' + d.cible + ' ' + d.unite + '</div>';
      html += '</div>';
      html += '<div style="font-size:16px;color:rgba(255,255,255,0.55);">›</div>';
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
  var _r = getDefiCourant();
  var s = _r.state;
  if (!s.current || !s.current.jours) {
    showToast(t('defi_no_active'));
    return;
  }
  const today = getTodayStr();
  if (!s.current.jours.includes(today)) {
    s.current.jours.push(today);
    const defi = DEFIS_DB.find(d => d.id === s.current.id);
    if (s.current.jours.length >= defi.cible) {
      s.current.complete = true;
      if (!s.badges.includes(defi.id)) s.badges.push(defi.id);
      showToast(t('defi_done'));
    } else {
      showToast(t('defi_checked'));
    }
    saveDefiState(s);
    renderDefiCard();
    renderDefiOverlay();
  } else {
    showToast(t('defi_already'));
  }
}

function updateDefiBannerTop() {
  var banner = document.getElementById('defi-banner-top');
  var txt = document.getElementById('defi-banner-text');
  if (!banner || !txt) return;
  try {
    var r = getDefiCourant();
    if (r.defi) {
      txt.textContent = t('defi_week_prefix') + r.tD(defi);
    } else {
      txt.textContent = t('defi_week_choose');
    }
    banner.style.display = 'block';
  } catch(e) {
    txt.textContent = t('defi_week_choose');
    banner.style.display = 'block';
  }
}
function defiTopBannerClick() {
  try {
    var r = getDefiCourant();
    if (r.defi) {
      var card = document.getElementById('accueilDefiCard');
      if (card) card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      if (typeof openDefiSelector === 'function') openDefiSelector();
    }
  } catch(e) {
    if (typeof openDefiSelector === 'function') openDefiSelector();
  }
}
function renderDefiCard() {
  updateDefiBannerTop();
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
    document.getElementById('defiCardIcon').innerHTML = '<img src="https://nabs881-sketch.github.io/niyyah-app/imagescroissant.webp" alt="Croissant" style="width:60px;height:auto;display:block;flex-shrink:0;">';
    document.getElementById('defiCardTitre').textContent = t('defi_none');
    document.getElementById('defiCardScore').textContent = t('defi_tap');
    var barFill0 = document.getElementById('defiCardBarFill');
    if (barFill0) barFill0.style.width = '0%';
    return;
  }
  card.onclick = function() { if (typeof openDefiOverlay === 'function') openDefiOverlay(); };
  document.getElementById('defiCardIcon').innerHTML = '<img src="https://nabs881-sketch.github.io/niyyah-app/imagescroissant.webp" alt="Croissant" style="width:60px;height:auto;display:block;flex-shrink:0;">';
  document.getElementById('defiCardTitre').textContent = tD(defi);
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
    label.style.cssText = 'margin-left:8px;font-size:12px;color:rgba(200,168,75,0.6);flex-shrink:0;';
    label.textContent = reste + ' ' + (reste > 1 ? t('defi_days_left') : t('defi_day_left'));
    dots.appendChild(label);
  } else if (defiState.current.complete) {
    const label = document.createElement('div');
    label.style.cssText = 'margin-left:8px;font-size:12px;color:#c8a84b;flex-shrink:0;font-weight:700;';
    label.textContent = t('defi_accomplished');
    dots.appendChild(label);
  }
  } catch(e) { console.warn('renderDefiCard error:', e); }
}

function renderDefiOverlay() {
  const { defi, state } = getDefiCourant();
  if (!defi) return;
  document.getElementById('defiOvIcon').textContent = defi.icon;
  document.getElementById('defiOvTitre').textContent = tD(defi);
  // Ref
  const refEl = document.getElementById('defiOvRef');
  if (defi.ref) {
    refEl.style.display = 'block';
    refEl.innerHTML = '"' + defi.ref + '"' + (defi.hadith ? '<br><span style="font-size:12px;color:rgba(200,168,75,0.5);margin-top:4px;display:block;">— ' + defi.hadith + '</span>' : '');
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
    div.innerHTML = '<div style="width:100%;aspect-ratio:1;border-radius:8px;background:' + (coche ? '#c8a84b' : auj ? 'rgba(200,168,75,0.12)' : 'rgba(255,255,255,0.04)') + ';border:' + (auj && !coche ? '1px solid rgba(200,168,75,0.4)' : '0.5px solid rgba(255,255,255,0.06)') + ';display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:' + (coche ? '#000' : auj ? '#c8a84b' : 'rgba(255,255,255,0.2)') + ';margin-bottom:3px;">' + jourNoms[i] + '</div><div style="font-size:12px;color:' + (coche ? '#c8a84b' : 'rgba(255,255,255,0.15)') + ';">' + (coche ? '✓' : '—') + '</div>';
    joursEl.appendChild(div);
  }
  // Encouragement
  const fait = state.current.jours.length;
  const msgs = [t('defi_enc_0'), t('defi_enc_1'), t('defi_enc_2'), t('defi_enc_3'), t('defi_enc_4'), t('defi_enc_5')];
  const idx = Math.min(Math.floor(fait / defi.cible * 5), 5);
  document.getElementById('defiOvEncouragement').textContent = msgs[idx];
  // Bouton
  const today = getTodayStr();
  const dejaCoche = state.current.jours.includes(today);
  const btn = document.getElementById('defiOvBtn');
  if (state.current.complete || dejaCoche) {
    btn.textContent = dejaCoche ? t('defi_checked_today') : t('defi_done');
    btn.style.background = 'rgba(200,168,75,0.15)';
    btn.style.color = '#c8a84b';
    btn.style.cursor = 'default';
  } else {
    btn.textContent = t('defi_check_today');
    btn.style.background = 'linear-gradient(135deg,#c8a84b,#e8cc6a)';
    btn.style.color = '#000';
    btn.style.cursor = 'pointer';
  }
  // Masquer "Changer de défi" si verrouillé (>24h)
  var changerBtn = document.getElementById('changerDefiBtn');
  if (changerBtn) {
    if (state.current && state.current.chosenAt && (Date.now() - state.current.chosenAt) / 3600000 > 24) {
      changerBtn.style.display = 'none';
    } else {
      changerBtn.style.display = '';
    }
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
let ramadanState = JSON.parse(localStorage.getItem('spiritual_ramadan') || '{"active":false,"startDate":null,"days":{},"laylatul":{}}');
function saveRamadanState() { safeSetItem('spiritual_ramadan', JSON.stringify(ramadanState)); }
function toggleRamadanMode() {
  if (ramadanState.active) {
    if (!confirm('Désactiver le mode Ramadan ? Tes données de jeûne seront conservées.')) return;
    ramadanState.active = false;
    saveRamadanState();
    updateNavRamadan();
    renderRamadanActivateBtn();
    switchView('checklist'); setTimeout(renderDefiCard, 100);
    showToast(t('ramadan_off'));
  } else {
    ramadanState.active = true;
    if (!ramadanState.startDate) ramadanState.startDate = TODAY;
    saveRamadanState();
    updateNavRamadan();
    renderRamadanActivateBtn();
    switchView('ramadan');
    renderRamadan();
    showToast(t('ramadan_on'));
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
    showToast(t('ramadan_fast'));
    if (navigator.vibrate) navigator.vibrate(25);
  }
  if (!history.ramadan) history.ramadan = { totalFasts: 0, laylatul: {} };
  history.ramadan.totalFasts = Object.values(ramadanState.days).filter(Boolean).length;
  saveHistory();
  saveRamadanState();
  renderRamadan();
}
function toggleLaylatul(night) {
  if (!ramadanState.laylatul) ramadanState.laylatul = {};
  ramadanState.laylatul[night] = !ramadanState.laylatul[night];
  if (ramadanState.laylatul[night]) showToast(t('ramadan_laylatul') + night + t('ramadan_laylatul_end'));
  if (!history.ramadan) history.ramadan = { totalFasts: 0, laylatul: {} };
  history.ramadan.laylatul = ramadanState.laylatul;
  saveHistory();
  saveRamadanState();
  renderRamadan();
}
function toggleFridayItem(id) {
  const key = 'niyyah_friday_' + TODAY;
  const fridayState = JSON.parse(localStorage.getItem(key) || '{}');
  fridayState[id] = !fridayState[id];
  safeSetItem(key, JSON.stringify(fridayState));
  if (fridayState[id]) {
    playCheckSound();
    if (navigator.vibrate) navigator.vibrate([12, 8, 25]);
    const msgs = {
      'fri_kahf':    t('fri_kahf_toast'),
      'fri_salawat': t('fri_salawat_toast'),
      'fri_doua':    t('fri_doua_toast')
    };
    showToast(msgs[id] || t('ramadan_fallback'));
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
  safeSetItem('spiritual_city', name);
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
  html += '<div style="font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:2px;">Aujourd\'hui</div>';
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
    const subHtml = item.sub ? '<div class="item-sub">' + tI(item,'sub') + '</div>' : '';
    html += '<div class="item' + fastCls + (done ? ' checked' : '') + '" onclick="' + onclick + '" id="ritem-' + item.id + '">';
    html += '<div class="check-circle' + (item.special ? '" style="' + (done ? 'background:var(--moon);border-color:var(--moon);box-shadow:0 0 0 4px var(--moon-soft)' : 'border-color:rgba(245,166,35,0.6)') : '') + '">';
    html += '<svg class="check-svg" style="' + (done ? 'opacity:1;transform:scale(1)' : '') + '" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    html += '</div>';
    html += '<div class="item-body"><div class="item-label">' + tI(item,'label') + '</div>' + subHtml + arabicHtml + '</div>';
    html += '</div>';
  });
  html += '</div>';
  html += '<div style="margin-bottom:4px;padding:0 2px;"><div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:8px;">Horaires Imsak / Iftar</div>';
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
  html += '<div style="font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">Calendrier du jeûne</div>';
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
const SAVAIS_TU = [
  // === LOT 1 (faits 1-25) — corrections appliquées ===
  'Le Coran contient environ 6236 versets (selon le comptage de Kufa), 114 sourates et 30 juz. — Coran',
  'Le nom Allah est l\'un des mots les plus fréquents du Coran. — Coran',
  'La sourate Al-Fatiha est appelée "la mère du Coran" (Umm al-Kitab). — Bukhari 4474',
  'Le Prophète ﷺ jeûnait les lundis et jeudis car les actes sont présentés à Allah ces jours-là. — Tirmidhi 747',
  'La première mosquée construite dans l\'Islam est la mosquée de Quba à Médine. — Histoire islamique',
  'Le mot "sabr" (patience) apparaît plus de 90 fois dans le Coran. — Coran',
  'Le Prophète ﷺ a dit que le sourire est une sadaqa (aumône). — Tirmidhi 1956',
  'La Kaaba a été reconstruite plusieurs fois dans l\'histoire, la dernière par les Quraychites avant l\'Islam. — Bukhari 1586',
  'Le Prophète ﷺ priait la nuit jusqu\'à ce que ses pieds gonflent. Aisha lui demanda pourquoi, il répondit : "Ne devrais-je pas être un serviteur reconnaissant ?" — Bukhari 4837',
  'L\'eau de Zamzam jaillit sous les pieds d\'Ismaël bébé et ne s\'est jamais tarie depuis. — Bukhari 3364',
  'Le Prophète ﷺ a accompli le Hajj une seule fois dans sa vie. — Muslim 1218',
  'Bilal ibn Rabah, un ancien esclave, fut le muezzin du Prophète ﷺ. — Bukhari 604',
  'Le Coran a été compilé en un seul livre sous le calife Abu Bakr as-Siddiq. — Bukhari 4986',
  'Le Prophète ﷺ a dit : "Le meilleur d\'entre vous est celui qui apprend le Coran et l\'enseigne." — Bukhari 5027',
  'Mémoriser les 10 premiers versets de la sourate Al-Kahf protège de la fitna du Dajjal. — Muslim 809',
  'Omar ibn al-Khattab a créé le premier calendrier hégirien. — Histoire islamique',
  'Le Prophète ﷺ n\'a jamais frappé une femme ni un serviteur. — Muslim 2328',
  'Selon Ibn Abbas, la dernière sourate complète révélée est An-Nasr (Le Secours). — Bukhari 4970',
  'Le Prophète ﷺ aimait commencer par la droite en toute chose : manger, se chausser, se peigner. — Bukhari 168',
  'Khadija bint Khuwaylid fut la première à croire au message du Prophète ﷺ. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Celui qui emprunte un chemin pour chercher la science, Allah lui facilite un chemin vers le Paradis." — Muslim 2699',
  'Al-Khwarizmi, mathématicien musulman, a inventé l\'algèbre (al-jabr). — Histoire islamique',
  'Ibn al-Haytham, musulman, est considéré comme le père de l\'optique moderne. — Histoire des sciences',
  'Abu Bakr, premier calife, a interdit à son armée de couper les arbres pendant la guerre, suivant l\'enseignement prophétique. — Abu Dawud 2614',
  'La mosquée Al-Aqsa fait partie des 3 mosquées vers lesquelles le voyage pieux est recommandé. — Bukhari 1189',

  // === LOT 2 (faits 26-50) — corrections appliquées ===
  'Le Coran mentionne 25 prophètes par leur nom. — Coran',
  'Le Prophète ﷺ a dit : "Les anges n\'entrent pas dans une maison où il y a un chien ou des images." — Bukhari 3322',
  // #28 RETIRÉ : Ya-Sin cœur du Coran — hadith Tirmidhi 2887 gradé da'if par Tirmidhi lui-même, mawdu' selon Al-Albani
  'Le jour de l\'Aïd al-Fitr, le Prophète ﷺ mangeait des dattes en nombre impair avant la prière. — Bukhari 953',
  'Le premier verset révélé fut "Lis, au nom de ton Seigneur qui a créé" (Al-Alaq 1). — Bukhari 3',
  'La hijra du Prophète ﷺ de La Mecque à Médine eut lieu en 622 après J.-C. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Aucun de vous ne croit vraiment tant qu\'il n\'aime pas pour son frère ce qu\'il aime pour lui-même." — Bukhari 13',
  'La bataille de Badr fut la première bataille majeure de l\'Islam, avec 313 musulmans contre 1000. — Bukhari 3952',
  'Le Prophète ﷺ a dit : "La propreté est la moitié de la foi." — Muslim 223',
  'Le miel est le seul aliment décrit dans le Coran comme contenant une "guérison pour les gens". — Coran 16:69',
  'Le Prophète ﷺ a dit : "Le fort n\'est pas celui qui terrasse, mais celui qui se maîtrise dans la colère." — Bukhari 6114',
  'Salman al-Farisi a suggéré de creuser un fossé (khandaq) autour de Médine, une tactique persane inconnue des Arabes. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Facilitez et ne rendez pas les choses difficiles." — Bukhari 69',
  'La sourate Al-Ikhlas équivaut à un tiers du Coran en mérite. — Bukhari 5015',
  'Ibn Sina (Avicenne) a écrit le Canon de la médecine, utilisé en Europe pendant 600 ans. — Histoire des sciences',
  'Le Prophète ﷺ dormait sur le côté droit et récitait des invocations avant de dormir. — Bukhari 6311',
  'Le Prophète ﷺ a dit : "Le meilleur jour où le soleil se lève est le vendredi." — Muslim 854',
  'Abu Hanifa, fondateur du madhab hanafite, était aussi commerçant en tissus. — Histoire islamique',
  'Le Prophète ﷺ a libéré tous les prisonniers de la conquête de La Mecque sans vengeance. — Histoire islamique',
  'L\'imam Bukhari aurait examiné environ 600 000 traditions et sélectionné 7275 hadiths (environ 2602 sans répétitions) pour son Sahih. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Quiconque croit en Allah et au Jour dernier, qu\'il dise du bien ou qu\'il se taise." — Bukhari 6018',
  'La Mecque est mentionnée dans le Coran sous le nom de "Bakkah" (Coran 3:96). — Coran',
  'Le Prophète ﷺ a dit : "Les actes ne valent que par les intentions." — Bukhari 1',
  'Quand Fatima az-Zahra entrait, le Prophète ﷺ se levait, lui prenait la main, l\'embrassait et la faisait asseoir à sa place. — Abu Dawud 5217',
  'Le Prophète ﷺ n\'a jamais mangé sur une table surélevée (khiwan). — Bukhari 5386',

  // === LOT 3 (faits 51-75) — corrections appliquées ===
  'Le Prophète ﷺ a interdit le gaspillage d\'eau pendant les ablutions, même au bord d\'une rivière. — Ibn Majah 425',
  'Abu Bakr a dépensé toute sa fortune pour l\'Islam et libéré Bilal de l\'esclavage. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Allah ne regarde ni vos corps ni vos visages, mais Il regarde vos cœurs." — Muslim 2564',
  'La première université au monde, Al-Qarawiyyin à Fès, a été fondée par Fatima al-Fihri en 859. — Histoire islamique',
  'Le Prophète ﷺ recommandait la graine noire (habba sawda) : "Elle guérit de tout sauf de la mort." — Bukhari 5688',
  'Le Prophète ﷺ a dit : "Celui qui construit une mosquée pour Allah, Allah lui construit une maison au Paradis." — Bukhari 450',
  'Selon un hadith authentique, Allah a 99 noms, et celui qui les préserve entrera au Paradis. — Bukhari 7392, Muslim 2677',
  'Le Prophète ﷺ a interdit de dormir sur le ventre. — Tirmidhi 2768',
  'Aisha rapporte que le Prophète ﷺ raccommodait ses sandales et cousait ses vêtements lui-même. — Al-Adab al-Mufrad 541',
  'Le Prophète ﷺ a dit : "La meilleure aumône est de donner quand on est en bonne santé et qu\'on craint la pauvreté." — Bukhari 1419',
  'Le minaret a été inventé en Syrie sous les Omeyyades pour appeler à la prière de loin. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Certes, Allah est doux et Il aime la douceur en toute chose." — Bukhari 6024, Muslim 2593',
  'Al-Jazari, ingénieur musulman du 12e siècle, a inventé les premiers automates et horloges à eau. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Qui se rapproche de Moi d\'un empan, Je Me rapproche de lui d\'une coudée." — Bukhari 7405',
  'Le Coran a été révélé en 23 ans, de 610 à 632 après J.-C. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Pas de mal et pas de préjudice" (La darar wa la dirar). — Ibn Majah 2341',
  'Le savant Al-Biruni a calculé le rayon de la Terre avec une erreur de moins de 1% au 11e siècle. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Quiconque prend soin de deux filles jusqu\'à leur maturité, lui et moi serons comme ceci au Paradis" et il joignit ses doigts. — Muslim 2631',
  'Le jeûne de Ramadan a été prescrit en l\'an 2 de l\'Hégire. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Le croyant est le miroir du croyant." — Abu Dawud 4918',
  'L\'imam Malik refusait de quitter Médine pour enseigner ailleurs, par respect pour la ville du Prophète ﷺ. — Histoire islamique',
  'Le Coran mentionne l\'abeille et lui consacre une sourate entière (An-Nahl). — Coran 16',
  'Le Prophète ﷺ a dit : "Le meilleur jihad est une parole de vérité devant un dirigeant injuste." — Abu Dawud 4344',
  'La prière de Fajr en jamaah vaut la récompense de prier toute la nuit. — Muslim 656',
  'Selon certaines sources historiques, Abbas ibn Firnas, savant andalou, a tenté le premier vol humain au 9e siècle. — Histoire des sciences',

  // === LOT 4 (faits 76-100) — corrections appliquées ===
  'Le Prophète ﷺ a dit : "Le véridique et le digne de confiance sera avec les prophètes et les martyrs." — Tirmidhi 1209',
  'Le Prophète ﷺ a dit : "Mangez, buvez et habillez-vous sans gaspillage ni orgueil." — Bukhari, Kitab al-Libas (muallaq) / Ahmad 6695',
  'Umar ibn Abd al-Aziz est souvent considéré comme le 5ème calife bien guidé par de nombreux savants. — Histoire islamique',
  'Le Prophète ﷺ a dit : "La pudeur fait partie de la foi." — Bukhari 9',
  'Les chiffres dits "arabes" (1, 2, 3...) ont été transmis à l\'Europe par les mathématiciens musulmans, qui les avaient adoptés depuis l\'Inde. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Nul n\'est véritablement croyant tant que je ne suis pas plus cher à ses yeux que son enfant, son père et tous les gens." — Bukhari 15',
  'La grotte de Hira, où le Prophète ﷺ reçut la première révélation, se trouve sur le mont An-Nour près de La Mecque. — Bukhari 3',
  'Le Prophète ﷺ a dit : "Celui qui ne remercie pas les gens ne remercie pas Allah." — Tirmidhi 1954',
  'Le premier hôpital public systématique (bimaristan) a été fondé par le calife omeyyade Al-Walid Ier à Damas au début du 8e siècle. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Les plus proches de moi le Jour du Jugement seront ceux qui ont le meilleur caractère." — Tirmidhi 2018',
  'Le Coran dit que le fer a été "descendu" (anzalna), une expression que certains savants contemporains rapprochent de l\'origine stellaire du fer. — Coran 57:25',
  'Le Prophète ﷺ a dit : "Celui qui croit en Allah et au Jour dernier, qu\'il honore son voisin." — Bukhari 6019',
  'Le Prophète ﷺ faisait la sieste (qaylula) après Dhuhr, une sunnah oubliée. — Bukhari 939',
  'Le mot "qalb" (cœur) et ses dérivés apparaissent plus de 130 fois dans le Coran. — Étude linguistique du Coran',
  'Le Prophète ﷺ a dit : "Dieu ne fait pas miséricorde à celui qui ne fait pas miséricorde aux gens." — Bukhari 7376',
  'Jabir ibn Hayyan, alchimiste musulman du 8e siècle, est considéré comme l\'un des pères de la chimie. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Celui qui soulage un croyant d\'une difficulté, Allah le soulagera d\'une difficulté le Jour du Jugement." — Muslim 2699',
  'Dans la tradition islamique, la calligraphie arabe est souvent considérée comme l\'un des arts les plus nobles. — Histoire islamique',
  'Le Prophète ﷺ recommandait le siwak : "Il purifie la bouche et plaît au Seigneur." — Shu\'ab al-Iman 1948',
  // #95 RETIRÉ : doublon du fait #14 (le meilleur d\'entre vous apprend le Coran et l\'enseigne — Bukhari 5027)
  'La Grande Mosquée de Cordoue, avec ses centaines de colonnes, était l\'une des plus grandes mosquées du monde médiéval. — Histoire islamique',
  'Le Prophète ﷺ vivait simplement et se comportait avec humilité avec ses Compagnons. — Muslim 2309',
  'Le Coran décrit les étapes du développement embryonnaire humain. — Coran 23:12-14',
  'Le Prophète ﷺ a dit : "Le monde est une prison pour le croyant et un paradis pour le mécréant." — Muslim 2956',
  'Al-Idrisi, géographe musulman, a créé au 12e siècle l\'une des cartes du monde les plus précises de son époque (Tabula Rogeriana, 1154). — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Allah aime que lorsque l\'un de vous fait un travail, il le fasse avec excellence (itqan)." — Bayhaqi, Shu\'ab al-Iman 4929 (hasan)',

  // === LOT 5 (faits 101-125) — corrections appliquées ===
  'Le Prophète ﷺ a dit : "Les liens de parenté sont accrochés au Trône d\'Allah." — Bukhari 5988',
  'Selon la tradition, le café a été découvert par des soufis yéménites au 15e siècle pour rester éveillés pendant le dhikr nocturne. — Histoire islamique',
  'Le Prophète ﷺ a dit : "La main qui donne est meilleure que la main qui reçoit." — Bukhari 1427',
  'Le Prophète ﷺ a dit : "N\'entrera pas au Paradis celui qui a dans son cœur le poids d\'un atome d\'orgueil." — Muslim 91',
  'Le mot "ilm" (science/savoir) et ses dérivés apparaissent des centaines de fois dans le Coran. — Étude linguistique du Coran',
  'Le Prophète ﷺ a dit : "Le meilleur d\'entre vous est le meilleur envers sa femme." — Tirmidhi 3895',
  'L\'astrolabe, instrument astronomique perfectionné par les musulmans, a guidé les navigateurs pendant des siècles. — Histoire des sciences',
  'Le Prophète ﷺ partageait sa nourriture avec les pauvres et vivait simplement. — Histoire islamique',
  'Le Coran dit : "Certes, avec la difficulté vient la facilité." — Coran 94:5-6',
  'Le chiffre zéro, d\'origine indienne, a été transmis à l\'Europe par les mathématiciens musulmans via Al-Khwarizmi. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Le croyant qui se mêle aux gens et supporte leur nuisance a plus de mérite que celui qui ne se mêle pas et ne supporte pas." — Ibn Majah 4032',
  'Le premier traité de chirurgie illustré a été écrit par Az-Zahrawi (Albucasis), médecin andalou du 10e siècle, dans son Kitab at-Tasrif. — Histoire des sciences',
  'Bayt al-Hikma (la Maison de la Sagesse), fondée à Bagdad au 9e siècle sous le calife Al-Ma\'mun, fut l\'un des plus grands centres de traduction et de savoir du Moyen Âge. — Histoire islamique',
  'Le Prophète ﷺ a dit : "La foi a plus de soixante-dix branches, dont la plus élevée est La ilaha illallah." — Bukhari 9, Muslim 35',
  'Le Prophète ﷺ buvait l\'eau en trois gorgées et ne soufflait jamais dans le récipient. — Bukhari 5631',
  'L\'Alhambra de Grenade est l\'un des plus beaux exemples d\'architecture islamique au monde. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Chaque articulation du corps humain doit s\'acquitter d\'une aumône chaque jour." — Bukhari 2989',
  'Le Prophète ﷺ n\'a jamais refusé une demande de don ou de charité. — Bukhari 3563',
  'Les chiffres arabes ont été introduits en Europe par Fibonacci, qui les apprit auprès des musulmans à Béjaïa (Algérie) avant de publier le Liber Abaci en 1202. — Histoire des sciences',
  'La bibliothèque du califat omeyyade de Cordoue comptait plus de 400 000 volumes au 10e siècle, à une époque où les plus grandes bibliothèques d\'Europe chrétienne en avaient à peine quelques centaines. — Histoire islamique',
  'Le Prophète ﷺ a dit : "La meilleure invocation est celle du jour de Arafa." — Tirmidhi 3585',
  'Omar ibn al-Khattab fut le premier à instaurer un système de registre civil (diwan) dans l\'État islamique. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Mangez ensemble et ne mangez pas séparément, car la bénédiction est dans le rassemblement." — Ibn Majah 3287',
  'Le Prophète ﷺ a dit : "Celui qui visite un malade marche dans les jardins du Paradis jusqu\'à ce qu\'il s\'assoie." — Muslim 2568',
  'Ibn Battuta, explorateur musulman du 14e siècle, a parcouru plus de 120 000 km en 30 ans de voyages à travers l\'Afrique, l\'Asie et l\'Europe. — Histoire islamique',

  // === LOT 6 (faits 126-150) — corrections appliquées ===
  'Le Prophète ﷺ a dit : "La dunya (ce monde) est maudite et maudit est ce qui s\'y trouve, sauf le dhikr d\'Allah et ce qui l\'accompagne." — Tirmidhi 2322',
  'Le Prophète ﷺ a fait la course avec Aisha — elle a gagné la première fois, il a gagné la seconde. — Abu Dawud 2578, Ahmad 24118',
  'Le mot "rahma" (miséricorde) et ses dérivés apparaissent plus de 300 fois dans le Coran. — Étude linguistique du Coran',
  'Ibn Khaldoun (1332-1406), historien et sociologue musulman, est considéré comme l\'un des pères de la sociologie moderne grâce à son œuvre Al-Muqaddima. — Histoire islamique',
  'Le papier a été introduit dans le monde musulman à Samarcande au 8e siècle, puis diffusé vers Bagdad, l\'Andalousie et l\'Europe, bouleversant la transmission du savoir. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Un bon mot est une aumône." — Bukhari 2707, Muslim 1009',
  'Le Prophète ﷺ a dit : "Celui qui récite Ayat al-Kursi après chaque prière obligatoire, rien ne l\'empêche d\'entrer au Paradis sauf la mort." — Nasa\'i, As-Sunan al-Kubra 9848 (sahih)',
  'L\'imam Shafi\'i a mémorisé le Coran à l\'âge de 7 ans et le Muwatta de l\'imam Malik à 10 ans. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Quand l\'un de vous éternue, qu\'il dise Alhamdulillah." — Bukhari 6224',
  'Le Prophète ﷺ a dit : "La religion c\'est la sincérité (nasiha)." — Muslim 55',
  'Les théories optiques d\'Ibn al-Haytham (Alhazen, Kitab al-Manazir, 1021) ont influencé le développement des premières lunettes de vue en Europe au 13e siècle. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Il n\'y a pas de mauvais augure, mais j\'aime la bonne parole." — Bukhari 5776',
  'Le Prophète ﷺ avait un chameau nommé Qaswa et un cheval nommé al-Murtajiz. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Les meilleurs d\'entre vous à l\'époque de l\'ignorance sont les meilleurs dans l\'Islam, s\'ils comprennent." — Bukhari 3374, Muslim 2378',
  'Le Coran a été mémorisé par de nombreux Compagnons du vivant du Prophète ﷺ. — Histoire islamique',
  'Le système d\'irrigation par canaux souterrains (qanat), d\'origine perse, a été largement développé et diffusé par les ingénieurs du monde musulman. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Allah est beau et Il aime la beauté." — Muslim 91',
  'Le Prophète ﷺ a dit : "Le meilleur rappel est La ilaha illallah." — Tirmidhi 3383',
  'L\'imam Ahmad ibn Hanbal a été emprisonné et fouetté sous l\'épreuve de la Mihna (833-850) pour avoir refusé de dire que le Coran est créé. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Ne méprise aucun bien, même si c\'est de rencontrer ton frère avec un visage joyeux." — Muslim 2626',
  'Le Prophète ﷺ a dit : "Chaque maladie a un remède." — Bukhari 5678',
  'Les hôpitaux islamiques médiévaux (bimaristans) avaient des sections séparées pour hommes et femmes, des salles de musique thérapeutique et des jardins de guérison. — Histoire islamique',
  'Mus\'ab ibn Umayr, ambassadeur de l\'Islam à Médine, a quitté une vie de luxe à La Mecque pour la cause d\'Allah — il est mort martyr à Uhud sans même un linceul suffisant pour couvrir son corps. — Histoire islamique',

  // === LOT 7 (faits 151-175) — corrections appliquées ===
  'Le Prophète ﷺ a dit : "Attachez les chameaux puis placez votre confiance en Allah." — Tirmidhi 2517',
  'Le Prophète ﷺ a dit : "Chaque enfant naît dans la fitra (la nature innée)." — Bukhari 1358',
  'La pharmacie a émergé comme science distincte dans le monde musulman vers le 9e siècle, avec les premiers apothicaires (saydalani) à Bagdad. — Histoire des sciences',
  'Le calife Al-Ma\'mun (9e siècle) offrait aux traducteurs le poids en or des livres qu\'ils traduisaient du grec vers l\'arabe, encourageant un transfert massif de savoir à Bagdad. — Histoire islamique',
  'Parmi les plus anciens manuscrits coraniques au monde, certains datent du 7e siècle (comme le manuscrit de Birmingham), et celui de Tashkent est l\'un des plus anciens mushafs largement préservés. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Le croyant ne pique pas deux fois du même trou." — Bukhari 6133',
  'Les fractions décimales ont été développées et systématisées par Al-Uqlidisi (10e siècle) et Al-Kashi (15e siècle), transformant les mathématiques. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Quand tu fais cuire un ragoût, ajoute de l\'eau et pense à ton voisin." — Muslim 2625',
  'Le Prophète ﷺ a dit : "Heureux est l\'homme qui est guidé par la foi et dont la subsistance lui suffit." — Muslim 1054',
  'Le Prophète ﷺ a dit : "Traitez bien les femmes, car elles sont créées d\'une côte." — Bukhari 3331',
  'Les vitraux colorés dans les mosquées ottomanes sont un chef-d\'œuvre d\'art islamique. — Histoire islamique',
  'Le Prophète ﷺ a dit qu\'une sourate de 30 versets intercèdera pour celui qui la récite jusqu\'à ce qu\'il soit pardonné : c\'est sourate Al-Mulk. — Tirmidhi 2891 (hasan)',
  'Le Prophète ﷺ a dit : "Si cela ne causait pas de difficulté à ma communauté, je leur aurais ordonné le siwak à chaque prière." — Bukhari 887',
  'La mosquée Hassan II à Casablanca possède l\'un des plus hauts minarets du monde (200 m) et est bâtie en partie sur l\'océan Atlantique. — Histoire islamique',
  'La pharmacie indépendante de la médecine a été créée à Bagdad au 9e siècle, une première mondiale, avec les premières pharmacies publiques sous le califat abbasside. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "La meilleure richesse est la richesse de l\'âme (al-ghina ghina an-nafs)." — Bukhari 6446',
  'Le Prophète ﷺ mettait en garde contre les innovations dans la religion qui s\'écartent de la Sunna. — Muslim 867',
  'Le Prophète ﷺ a dit : "N\'invoquez pas la malédiction sur vous-mêmes, ni sur vos enfants, ni sur vos biens." — Muslim 3014 / Abu Dawud 1532',
  'L\'hôpital Al-Mansuri au Caire, fondé en 1284 par le sultan Qalawun, pouvait accueillir plusieurs milliers de patients et fut l\'un des plus grands de son époque. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Le jeûneur a deux joies : une quand il rompt le jeûne et une quand il rencontre son Seigneur." — Bukhari 1904',
  'Le Prophète ﷺ a dit : "Celui qui meurt en défendant ses biens est un martyr." — Bukhari 2480',
  'Le Coran mentionne les abeilles (An-Nahl 16), les fourmis (An-Naml 27), les araignées (Al-Ankabut 29) et les moustiques (Al-Baqara 2:26). — Coran',
  'Khalid ibn al-Walid, surnommé "l\'épée d\'Allah", n\'a jamais perdu une bataille — ni avant ni après l\'Islam. — Histoire islamique',
  'Le Prophète ﷺ cassait son jeûne avec des dattes fraîches, sinon des dattes sèches, sinon de l\'eau. — Abu Dawud 2356, Tirmidhi 696 (hasan sahih)',
  'Le Prophète ﷺ a dit : "Celui qui cache les défauts d\'un musulman, Allah cachera les siens le Jour du Jugement." — Bukhari 2442, Muslim 2580',

  // === LOT 8 (faits 176-201) — corrections appliquées ===
  'Les cartes d\'Al-Idrisi et des géographes musulmans du 12e-14e siècle incluaient l\'Europe, l\'Asie jusqu\'en Chine et l\'Afrique subsaharienne — une connaissance sans équivalent en Europe chrétienne. — Histoire des sciences',
  'Le Prophète ﷺ a dit : "Un musulman est le frère d\'un musulman : il ne l\'opprime pas et ne le livre pas." — Muslim 2580',
  'Le Prophète ﷺ a dit : "Soyez dans ce monde comme un étranger ou un voyageur de passage." — Bukhari 6416',
  'Le Prophète ﷺ a dit : "Celui qui lit les deux derniers versets de sourate Al-Baqara la nuit, ils lui suffisent." — Bukhari 5009',
  'Le mot "tawba" (repentir) apparaît environ 87 fois dans le Coran — Allah aime ceux qui reviennent à Lui. — Coran',
  'Le Prophète ﷺ a dit : "Trois invocations sont exaucées sans aucun doute : celle du parent, celle du voyageur et celle de l\'opprimé." — Tirmidhi 1905',
  'Ibn Rushd (Averroès), philosophe andalou du 12e siècle, a profondément influencé la pensée européenne médiévale par ses commentaires d\'Aristote. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Celui qui garantit ce qui est entre ses mâchoires et ce qui est entre ses jambes, je lui garantis le Paradis." — Bukhari 6474',
  'Le Coran compare les montagnes à des piquets (awtad) qui stabilisent la Terre. — Coran 78:7',
  'Le Prophète ﷺ a dit : "Les deux rakaat de Fajr sont meilleures que le monde et tout ce qu\'il contient." — Muslim 725',
  'La ville de Grenade, dernier royaume musulman d\'Al-Andalus, est tombée en 1492, marquant la fin de près de 800 ans de présence musulmane en Espagne. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Nourris l\'affamé, visite le malade et libère le prisonnier." — Bukhari 5649',
  'Le Coran dit : "Nous avons créé l\'homme dans la meilleure stature." — Coran 95:4',
  'Le Prophète ﷺ a dit : "La meilleure prière après les obligatoires est la prière de la nuit." — Muslim 1163',
  'Les jardins de l\'Alhambra ont été conçus selon la description coranique du Paradis. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Allah est auprès du serviteur tant que le serviteur est auprès de son frère." — Tirmidhi 1930',
  'Le Prophète ﷺ a dit : "Le meilleur de ce que j\'ai dit, moi et les prophètes avant moi : La ilaha illallah wahdahu la sharika lah." — Tirmidhi 3585',
  'Le Prophète ﷺ a dit : "Quiconque dit SubhanAllah wa bihamdihi 100 fois par jour, ses péchés sont effacés même s\'ils sont comme l\'écume de la mer." — Bukhari 6405',
  'La sourate Al-Fatiha est récitée 17 fois par jour dans les prières obligatoires (2+4+4+3+4 rak\'ah). — Fiqh islamique',
  'Omar ibn al-Khattab pleurait tellement dans sa prière qu\'on entendait ses sanglots depuis les derniers rangs de la mosquée. — Histoire islamique',
  'Abu Bakr fut appelé as-Siddiq (le véridique) car il ne douta pas un instant du voyage nocturne du Prophète ﷺ (Isra\' wa Mi\'raj). — Histoire islamique',
  'Aisha a transmis 2210 hadiths — elle est la 4e transmettrice parmi les Compagnons et la première femme rapporteuse de hadiths. — Histoire islamique',
  'Les étoiles des navigateurs arabes médiévaux — Altaïr, Aldébaran, Bételgeuse, Véga, Rigel — sont presque toutes issues de l\'arabe. — Histoire des sciences',
  'Le Prophète ﷺ visitait les malades, assistait aux enterrements et répondait aux invitations des pauvres. — Bukhari 1239',
  'La calligraphie du Coran a donné naissance à plusieurs styles majeurs : kufi, naskhi, thuluth, maghribi, diwani — chacun développé par des maîtres calligraphes à travers les siècles. — Histoire islamique',
  'Le Prophète ﷺ a dit : "Si vous saviez ce que je sais, vous ririez peu et pleureriez beaucoup." — Bukhari 6485',
];
function getSavaisTuFact() {
  var dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0).getTime()) / 86400000);
  return SAVAIS_TU[dayOfYear % SAVAIS_TU.length];
}
const LEVELS = [
  {
    id: 1, title: 'Fondations',
    sections: [
      { icon: '🕌', title: 'Les 5 Prières', items: [
        { id: 'fajr',    label: 'Fajr',    _subKey: 'prayer_fajr_sub',    get sub(){return t(this._subKey)}, arabic: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u0650',  prayer: true, priority: 'fard', block: 'fajr', hadith: '\"Celui qui prie Fajr est sous la protection d\'Allah toute la journ\u00e9e\" \u2014 Muslim 657', source: 'Muslim 657' },
        { id: 'dhuhr',   label: 'Dhuhr',   _subKey: 'prayer_dhuhr_sub',   get sub(){return t(this._subKey)}, arabic: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0638\u0651\u064F\u0647\u0652\u0631\u0650',  prayer: true, priority: 'fard', block: 'dhuhr', hadith: '\"Celui qui prie les deux pri\u00e8res fra\u00eeches entrera au Paradis\" \u2014 Bukhari 574', source: 'Bukhari 574' },
        { id: 'asr',     label: 'Asr',     _subKey: 'prayer_asr_sub',     get sub(){return t(this._subKey)}, arabic: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0639\u064E\u0635\u0652\u0631\u0650',  prayer: true, priority: 'fard', block: 'asr', hadith: '\"Celui qui manque Asr, c\'est comme s\'il avait perdu sa famille et ses biens\" \u2014 Bukhari 552', source: 'Bukhari 552' },
        { id: 'maghrib', label: 'Maghrib', _subKey: 'prayer_maghrib_sub', get sub(){return t(this._subKey)}, arabic: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0645\u064E\u063A\u0652\u0631\u0650\u0628\u0650', prayer: true, priority: 'fard', block: 'maghrib', hadith: '\"Priez avant le Maghrib, priez avant le Maghrib\" \u2014 Bukhari 1183', source: 'Bukhari 1183' },
        { id: 'isha',    label: 'Isha',    _subKey: 'prayer_isha_sub',    get sub(){return t(this._subKey)}, arabic: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0639\u0650\u0634\u0627\u0621\u0650',  prayer: true, priority: 'fard', block: 'isha', hadith: '\"Celui qui prie Isha en jamaah a la r\u00e9compense de prier la moiti\u00e9 de la nuit\" \u2014 Muslim 656', source: 'Muslim 656' },
        ...(isFriday() ? [{ id: 'jumua', label: 'Jumua ✦', sub: 'Prière du vendredi — obligation spéciale', arabic: 'صَلَاةُ الْجُمُعَةِ', isFriday: true, prayer: true, priority: 'fard', block: 'dhuhr', hadith: '\"Le vendredi est le meilleur jour sur lequel le soleil se lève\" — Muslim 854', source: 'Muslim 854' }] : []),
      ]},
      { icon: '\ud83d\udcff', title: 'Wird quotidien', _descKey: 'wird_desc', get desc(){return t(this._descKey)}, items: [
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
        { id: 'vie_prophetes', label: 'Vie des Prophètes', sub: '10 min · Nouh, Ibrahim, Moussa, Issa…', arabic: 'قَصَصُ الْأَنْبِيَاءِ', block: 'jour', hadith: '\"Nous te racontons le meilleur des récits\" — Coran 12:3', source: 'Yusuf 12:3' },
        { id: 'vie_compagnons', label: 'Vie des Compagnons', sub: '10 min · Abu Bakr, Omar, Othman, Ali…', arabic: 'سِيَرُ الصَّحَابَةِ', block: 'jour', hadith: '\"Mes Compagnons sont comme les étoiles — qui que vous suiviez, vous serez guidés\" — Bayhaqi', source: 'Bayhaqi' },
        { id: 'fiqh_jour', label: 'Jurisprudence — 1 règle du jour', sub: 'Apprendre une règle de fiqh simple et l\'appliquer', arabic: 'فِقْهٌ', block: 'jour' },
        { id: 'savais_tu', label: 'Le savais-tu ?', sub: getSavaisTuFact(), arabic: 'هَلْ تَعْلَمُ؟', block: 'jour' },
      ]},
      { icon: '🎧', title: 'Immersion coranique', items: [
        { id: 'coran_ecoute', label: 'Écouter le Coran', sub: 'Choisis une sourate et écoute', arabic: 'تِلَاوَةُ الْقُرْآنِ', optional: true, coranPicker: true, block: 'jour', hadith: '\"Récite le Coran car il intercèdera pour ses compagnons le Jour du Jugement\" — Muslim 804', source: 'Muslim 804' },
        { id: 'podcast', label: 'Podcast islamique', sub: 'Islam Simplement ou autre contenu', block: 'jour' },
      ], links: [
        { label: 'Vie du Prophète ﷺ', sub: "La vie du Prophète Mohammad ﷺ · Podcast", url: 'https://podcasts.apple.com/fr/podcast/la-vie-du-proph%C3%A8te-mohammad-%EF%B7%BA/id1804853747', icon: '🎙' },
        { label: 'Islam Simplement', sub: 'Podcast · Écouter maintenant', url: 'https://open.spotify.com/search/islam%20simplement', icon: '🎙' },
        { label: "L'Arabe Simplement", sub: 'Chaîne YouTube · Arabe coranique', url: 'https://www.youtube.com/@larabesimplement', icon: '📖' },
        { label: 'Hadith Podcast', sub: 'Hadiths authentiques · YouTube', url: 'https://www.youtube.com/watch?v=G7xdRzxyK1k&list=PLuTJKEpEkfuU-Qo4m69wKGjCWb_p_uAij', icon: '🎙' },
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
if (state._unlocked.length < 4) { [1,2,3,4].forEach(function(id) { if (!state._unlocked.includes(id)) state._unlocked.push(id); }); saveState(); }
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
      history.streak = isSilenceDay() ? (history.streak || 0) : 1;
      history._gracePending = false;
    }
    history.bestStreak = Math.max(history.bestStreak || 0, history.streak);
    history.totalDays = (history.totalDays || 0) + 1;
  } else {
    const todayDate  = new Date(TODAY + 'T12:00:00');
    const prevDateObj = new Date((prevDate || TODAY) + 'T12:00:00');
    const diffDays = Math.round((todayDate - prevDateObj) / 86400000);
    if (isSilenceDay()) {
      // Silence day: streak frozen, no break
    } else if (diffDays === 1) {
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
    showToast(t('toast_streak_saved'));
    if (navigator.vibrate) navigator.vibrate([20, 30, 60]);
  }
}
function getDateMinus(dateStr, days) {
  const d = new Date(dateStr); d.setDate(d.getDate() - days); return d.toISOString().split('T')[0];
}
function saveState()   { safeSetItem('spiritual_v2', JSON.stringify(state)); safeSetItem('spiritual_level', currentLevel); }
function saveHistory() { safeSetItem('spiritual_history', JSON.stringify(history)); }
function getLevelProgress(levelId) { return getCalcLvlPct(levelId, state); }
// 'none' removed — was a stub returning 'none'
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
  if (f1) f1.style.width = pct + '%';
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
      showToast(t('toast_lvl1'));
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
    eyebrow: t('lvl_eye_1'),
    title: "MashaAllah !",
    arabic: "\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0645\u064E\u0639\u064E \u0627\u0644\u0635\u0651\u064E\u0627\u0628\u0650\u0631\u0650\u064A\u0646\u064E",
    hadith: t('lvl_hadith_1'),
    sub: t('lvl_sub_1'),
    color: "#87A96B",
    glow: "rgba(135,169,107,0.3)",
    icon: "🌱"
  },
  2: {
    stars: "🕌",
    eyebrow: t('lvl_eye_2'),
    title: "SubhanAllah !",
    arabic: "\u0648\u064E\u0627\u0633\u0652\u062A\u064E\u0639\u0650\u064A\u0646\u064F\u0648\u0627 \u0628\u0650\u0627\u0644\u0635\u0651\u064E\u0628\u0652\u0631\u0650 \u0648\u064E\u0627\u0644\u0635\u0651\u064E\u0644\u0627\u0629\u0650",
    hadith: t('lvl_hadith_2'),
    sub: t('lvl_sub_2'),
    color: "#D4AF37",
    glow: "rgba(212,175,55,0.3)",
    icon: "🕌"
  },
  3: {
    stars: "✦",
    eyebrow: t('lvl_eye_3'),
    title: "Alhamdulillah !",
    arabic: "\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0625\u0650\u0630\u0627 \u0639\u064E\u0645\u0650\u0644\u064E \u0623\u064E\u062D\u064E\u062F\u064F\u0643\u064F\u0645\u0652 \u0639\u064E\u0645\u064E\u0644\u064B\u0627 \u0623\u064E\u0646\u0652 \u064A\u064F\u062A\u0652\u0642\u0650\u0646\u064E\u0647\u064F",
    hadith: t('lvl_hadith_3'),
    sub: t('lvl_sub_3'),
    color: "#E9C46A",
    glow: "rgba(233,196,106,0.35)",
    icon: "⚡"
  },
  4: {
    stars: "☀️",
    eyebrow: t('lvl_eye_4'),
    title: "Allahu Akbar !",
    arabic: "\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0646\u064F\u0648\u0631\u064F \u0627\u0644\u0633\u0651\u064E\u0645\u064E\u0627\u0648\u0627\u062A\u0650 \u0648\u064E\u0627\u0644\u0623\u064E\u0631\u0652\u0636\u0650",
    hadith: t('lvl_hadith_4'),
    sub: t('lvl_sub_4'),
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
      <div style="text-align:center;font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:${msg.color};opacity:0.8;margin-bottom:8px;">${msg.eyebrow}</div>

      <!-- Titre -->
      <div style="text-align:center;font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;color:#F0EAD6;letter-spacing:-0.5px;margin-bottom:16px;">${msg.title}</div>

      <!-- Verset arabe -->
      <div style="text-align:center;font-family:'Amiri',serif;font-size:18px;color:${msg.color};direction:rtl;margin-bottom:6px;line-height:1.8;opacity:0.9;">${msg.arabic}</div>
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
          ☀️ Voir Ma Niyyah
        </button>`
      }
      <button class="btn-stay-lvl" aria-label="Rester sur ce niveau" onclick="closeLevelPopup()">Rester sur ce niveau</button>
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
      showToast(t('toast_lvl_unlock').replace('{n}', nextId));
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
  document.body.classList.remove('pratique-active');
  if (name === 'checklist') document.body.classList.add('pratique-active');
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
  fadeInView(activeView);
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
  const medal = 'none';

  // Date
  const now = new Date();
  const dateStr = now.toLocaleDateString(_dateLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
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
  if (scoreLbl) scoreLbl.textContent = scoreJour >= 80 ? 'MashaAllah ✦' : scoreJour >= 50 ? t('score_continue') : t('score_progress');
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
      const medal2 = isToday ? (done ? 'none' : null) : ((history.dayMedals && history.dayMedals[d]) || (done ? 'bronze' : null));
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
function renderResume() {
  const el = document.getElementById('resumeContent');
  const dateEl = document.getElementById('resumeDatePill');
  if (dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString(_dateLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
  }
  const allItems = LEVELS.flatMap(l => l.sections.flatMap(s => s.items));
  const totalDone = allItems.filter(item => { try { return isItemDone(item, state); } catch(e) { return item.type==="counter"?(state[item.id]||0)>=item.target:!!state[item.id]; } }).reduce((sum, i) => { try { return sum + getWeight(i.id); } catch(e) { return sum + 1; } }, 0);
  const totalAll = allItems.reduce((sum, i) => { try { return sum + getWeight(i.id); } catch(e) { return sum + 1; } }, 0);
  const globalPct = totalAll > 0 ? Math.round(totalDone / totalAll * 100) : 0;
  const medal = 'none';
  const f3 = document.getElementById('globalFill3');
  if (f3) f3.style.width = globalPct + '%';
  const emojiMap = { none: '🌱', bronze: '🥉', silver: '🥈', gold: '🥇' };
  const msgMap = {
    none:   { title: t('prog_msg_none'), sub: t('prog_sub_none') },
    bronze: { title: t('prog_msg_bronze'), sub: t('prog_sub_bronze') },
    silver: { title: t('prog_msg_silver'), sub: t('prog_sub_silver') },
    gold:   { title: t('prog_msg_gold'), sub: t('prog_sub_gold') },
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
    const color = isDone ? 'var(--gold)' : 'var(--green)';
    const pctCls = isDone ? 'resume-level-pct done' : 'resume-level-pct';
    var resumePctLabel = pct === 0 ? 'Commence !' : pct + '%';
    levelsHtml += '<div class="resume-level-row"><div class="resume-level-icon">' + levelIcons[i] + '</div><div class="resume-level-body"><div class="resume-level-name">' + lvl.title + (isDone ? ' ✓' : '') + '</div><div class="resume-level-bar-track"><div class="resume-level-bar-fill" style="width:' + pct + '%;background:' + color + '"></div></div></div><div class="' + pctCls + '">' + resumePctLabel + '</div></div>';
  });
  levelsHtml += '</div>';
  const todayDone = getLevelProgress(1) >= 100;
  const streakDisplay = history.streak + (todayDone ? 1 : 0);
  el.innerHTML = '<div class="resume-hero">' + ringHtml + '<div class="resume-title">' + msg.title + '</div><div class="resume-sub">' + msg.sub + '</div></div>' +
    '<div style="background:var(--card);border-radius:var(--r-lg);padding:14px 16px;margin-bottom:8px;display:flex;gap:24px;justify-content:center;">' +
      '<div style="text-align:center"><div style="font-family:var(--serif);font-size:28px;color:var(--t1);letter-spacing:-1px;">' + totalDone + '</div><div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);font-weight:600;margin-top:2px;">Actes</div></div>' +
      '<div style="width:1px;background:var(--sep)"></div>' +
      '<div style="text-align:center"><div style="font-family:var(--serif);font-size:28px;color:var(--t1);letter-spacing:-1px;">' + streakDisplay + '</div><div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);font-weight:600;margin-top:2px;">Jours</div></div>' +
      '<div style="width:1px;background:var(--sep)"></div>' +
      '<div style="text-align:center"><div style="font-size:22px;line-height:1.3;">' + emojiMap[medal] + '</div><div style="font-size:12px;text-transform:uppercase;letter-spacing:1px;color:var(--t3);font-weight:600;margin-top:2px;">Médaille</div></div>' +
    '</div>' +
    levelsHtml +
    '<div class="resume-actions">' +
      '<button class="btn-new-day" onclick="switchView(\'checklist\')">' + t('btn_start_day') + '</button>' +
      '<button style="width:100%;padding:14px;border-radius:14px;border:none;background:#C8A84A;color:#2C2E32;font-size:15px;font-weight:600;cursor:pointer;font-family:var(--sans);margin-bottom:0;" onclick="openBilanSoir()">🌙 Bilan du soir</button>' +
      '<button class="btn-back-check" onclick="switchView(\'checklist\')">' + t('btn_back_checklist') + '</button>' +
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
    loadPrayerTimes();
    const lastNiyyah = localStorage.getItem('niyyah_intention_date');
    if (lastNiyyah !== TODAY) {
      setTimeout(showNiyyahScreen, 100);
    } else {
      document.getElementById('niyyahScreen').style.display = 'none';
    }
  }
  const now = new Date();
  const dateStr = now.toLocaleDateString(_dateLocale(), { weekday: 'long', day: 'numeric', month: 'long' });
  ['datePill', 'resumeDatePill'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.textContent = dateStr;
  });
  updateNavRamadan();
  renderTabs();
  renderLevel(currentLevel);
  renderAccueil();
  updateGlobalProgress();
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
      safeSetItem('niyyah_intention_date', TODAY);
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
  safeSetItem('niyyah_v2_bridge', JSON.stringify(s2));
  if (typeof v2UpdateOrbState === 'function') setTimeout(v2UpdateOrbState, 200);
  if (window._niyyahFailsafe) { clearTimeout(window._niyyahFailsafe); window._niyyahFailsafe = null; }
  safeSetItem('niyyah_intention_date', TODAY);
  safeSetItem('niyyah_intention_type', type);
  safeSetItem('niyyah_intention_label', labels[type] || type);
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
  safeSetItem('niyyah_intention_date', TODAY);
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
    btn.title = t('ramadan_disable_title');
  } else {
    btn.classList.remove('ramadan-on');
    btn.title = t('ramadan_enable_title');
  }
}
function renderTabs() {
  const tabs = document.getElementById('levelTabs');
  tabs.innerHTML = LEVELS.map(l => {
    const active = l.id === currentLevel;
    const done   = getLevelProgress(l.id) >= 100;
    let cls = 'tab';
    if (active)   cls += ' active';
    else if (done) cls += ' done';
    return '<div class="' + cls + '" onclick="selectLevel(' + l.id + ')">' + t('level_' + l.id) + (done ? ' ✓' : '') + '</div>';
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
    state._unlocked.push(id);
    saveState();
  }
  currentLevel = id;
  saveState();
  var checkView = document.getElementById('view-checklist');
  var alreadyOnChecklist = checkView && checkView.classList.contains('active');
  if (!alreadyOnChecklist && typeof v2GoTo === 'function') v2GoTo('checklist');
  renderTabs();
  renderLevel(id);
  if (alreadyOnChecklist && checkView) checkView.scrollTop = 0;
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
  var _t = typeof t === 'function' ? t : function(k) { return k || ''; };
  var now = new Date();
  var nowMin = now.getHours() * 60 + now.getMinutes();
  function toMin(str) {
    if (!str) return null;
    var p = str.replace(/ *\(.*\)/, '').split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  if (!_prayerTimes) return { id: 'nuit', label: _t('block_nuit') };
  var fajr = toMin(_prayerTimes['Fajr']);
  var dhuhr = toMin(_prayerTimes['Dhuhr']);
  var asr = toMin(_prayerTimes['Asr']);
  var maghrib = toMin(_prayerTimes['Maghrib']);
  var isha = toMin(_prayerTimes['Isha']);
  if (fajr == null || dhuhr == null || asr == null || maghrib == null || isha == null) return { id: 'nuit', label: _t('block_nuit') };
  if (nowMin < fajr) {
    var qiyamStart = Math.floor(fajr * 2 / 3);
    if (nowMin >= qiyamStart) return { id: 'qiyam', label: _t('block_qiyam') };
    return { id: 'nuit', label: _t('block_nuit') };
  }
  if (nowMin < dhuhr)   return { id: 'fajr',    label: _t('block_fajr') };
  if (nowMin < asr)     return { id: 'dhuhr',   label: _t('block_dhuhr') };
  if (nowMin < maghrib) return { id: 'asr',     label: _t('block_asr') };
  if (nowMin < isha)    return { id: 'maghrib', label: _t('block_maghrib') };
  return { id: 'isha', label: _t('block_isha') };
}
function getConversionMessage(streak) {
  if (streak >= 30) return t('conv_msg_4');
  if (streak >= 14) return t('conv_msg_3');
  if (streak >= 7)  return t('conv_msg_2');
  if (streak >= 3)  return t('conv_msg_1');
  return t('conv_msg_0');
}
function renderLevel(levelId) {
  const level   = LEVELS.find(l => l.id === levelId);
  const content = document.getElementById('content');
  const pct     = getLevelProgress(levelId);
  if (!state._unlocked.includes(levelId)) {
    state._unlocked.push(levelId);
    saveState();
    renderTabs();
  }
  let fridayBanner = '';
  if (level.id === 1 && isFriday()) {
    const FRIDAY_ITEMS = [
      { id: 'fri_kahf',    label: 'Sourate Al-Kahf',       arabic: 'سُورَةُ الْكَهْفِ',         hadith: '"Celui qui lit Al-Kahf le vendredi aura une lumière entre les deux vendredis" — Hakim' },
      { id: 'fri_salawat', label: 'Salawat sur le Prophète ﷺ', arabic: 'اللَّهُمَّ صَلِّ عَلَى مُحَمَّدٍ وَعَلَى آلِ مُحَمَّدٍ كَمَا صَلَّيْتَ عَلَى إِبْرَاهِيمَ وَعَلَى آلِ إِبْرَاهِيمَ إِنَّكَ حَمِيدٌ مَجِيدٌ', hadith: '"Le meilleur de vos jours est le vendredi — multipliez la Salawat" — Abu Dawud', phonetic: 'Allahumma salli \'ala Muhammad wa \'ala ali Muhammad kama sallayta \'ala Ibrahim wa \'ala ali Ibrahim innaka hamidun majid', translation: 'Ô Allah, prie sur Muhammad et la famille de Muhammad comme Tu as prié sur Ibrahim et la famille d\'Ibrahim. Tu es certes digne de louanges et de glorification.' },
      { id: 'fri_doua',    label: 'Douaa de l\'heure bénie', arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ', hadith: '"Il y a une heure le vendredi où Allah exauce toute demande" — Bukhari & Muslim', phonetic: 'Rabbanā ātinā fid-dunyā hasanatan wa fil-ākhirati hasanatan wa qinā \'adhāban-nār', translation: 'Notre Seigneur, accorde-nous en ce monde le bien et dans l\'au-delà le bien, et préserve-nous du châtiment du Feu.' },
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
        _audioBtnFri = '<button class="btn-audio" id="btnKahfPlay" ontouchstart="event.stopPropagation()" onclick="toggleKahfAudio(this,event)" title="' + t('kahf_listen') + '" style="margin-left:0;margin-top:6px;width:auto;padding:0 10px;border-radius:8px;font-size:12px;font-weight:600;display:flex;align-items:center;gap:5px;"><span id="kahfPlayIcon">🔊</span><span id="kahfPlayLabel">' + t('kahf_play') + '</span></button>';
      }
      fitems += '<div style="display:flex;align-items:center;justify-content:space-between;">';
      fitems += '<div class="friday-item-label">' + fi.label + '</div>';
      if (fi.phonetic) {
        var _lEsc = fi.label.replace(/"/g,'&quot;');
        var _aEsc = fi.arabic.replace(/"/g,'&quot;');
        var _pEsc = (fi.phonetic||'').replace(/"/g,'&quot;');
        var _tEsc = (fi.translation||'').replace(/"/g,'&quot;');
        fitems += '<button class="btn-info" ontouchstart="event.stopPropagation()" onclick="openInfoSheet(\'\',\'\',\'\',\'\',event);event.stopPropagation();" data-label="' + _lEsc + '" data-arabic="' + _aEsc + '" data-phonetic="' + _pEsc + '" data-translation="' + _tEsc + '" title="' + t('btn_details') + '" style="flex-shrink:0;"><i>i</i></button>';
      }
      fitems += '</div>';
      fitems += '<div class="friday-item-hadith">' + fi.hadith + '</div>';
      fitems += _audioBtnFri;
      fitems += '</div></div>';
    });
    fridayBanner = '<div class="friday-banner"><div class="friday-header"><div style="font-size:22px">🌟</div><div class="friday-txt"><div class="friday-title">' + t('friday_title') + '</div><div class="friday-sub">' + t('friday_sub') + '</div></div></div><div class="friday-items">' + fitems + '</div></div>';
  }
  const graceBanner = (level.id === 1 && isGraceActive()) ?
    '<div style="background:linear-gradient(135deg,rgba(255,149,0,0.12),rgba(255,214,10,0.06));border:1px solid rgba(255,149,0,0.25);border-radius:var(--r-lg);padding:12px 16px;margin-bottom:8px;display:flex;align-items:center;gap:12px;">' +
    '<div style="font-size:22px">⏳</div>' +
    '<div><div style="font-size:13px;font-weight:600;color:#ff9500;">' + t('grace_title') + '</div>' +
    '<div style="font-size:12px;color:var(--t3);margin-top:2px;">' + t('grace_sub') + '</div></div></div>' : '';
  const prayerCard = level.id === 1 ? renderPrayerTimesCard() : '';
  const qiblaCard  = level.id === 1 ? renderQiblaCard() : '';
  const allLvlItems = LEVELS.filter(l => state._unlocked.includes(l.id)).flatMap(l => getLevelItems(l.id));
  const scoreJour = Math.round(getWeightedScore(allLvlItems, state));
  const scoreColor = scoreJour >= 80 ? '#c8a84b' : scoreJour >= 50 ? 'var(--green)' : 'var(--t2)';
  const scoreBg = scoreJour >= 80 ? 'rgba(200,168,75,0.12)' : scoreJour >= 50 ? 'rgba(52,217,98,0.08)' : 'rgba(255,255,255,0.04)';
  const scoreBorder = scoreJour >= 80 ? 'rgba(200,168,75,0.3)' : scoreJour >= 50 ? 'rgba(52,217,98,0.2)' : 'rgba(255,255,255,0.08)';
  const scoreLabel = scoreJour >= 80 ? 'MashaAllah ✦' : scoreJour >= 50 ? t('score_continue') : t('score_progress');
  let html = '<div class="level-hero"><div class="hero-label">' + t('level_word') + ' ' + level.id + '</div><div class="hero-title">' + t('level_' + level.id) + '</div><div class="hero-bar-row"><div class="hero-bar-track"><div class="hero-bar-fill" style="width:' + pct + '%"></div></div><div class="hero-pct">' + Math.round(pct) + '%</div></div>'
    + '<div style="display:flex;align-items:center;justify-content:space-between;margin-top:10px;padding:8px 12px;background:' + scoreBg + ';border:1px solid ' + scoreBorder + ';border-radius:10px;">'
    + '<div style="font-size:12px;color:var(--t3);letter-spacing:0.5px;">' + t('score_weighted') + '</div>'
    + '<div style="display:flex;align-items:center;gap:6px;">'
    + '<div style="font-size:16px;font-weight:800;color:' + scoreColor + ';">' + scoreJour + '</div>'
    + '<div style="font-size:12px;color:' + scoreColor + ';opacity:0.8;">/100</div>'
    + '<div style="font-size:12px;color:' + scoreColor + ';background:' + scoreBg + ';border:1px solid ' + scoreBorder + ';border-radius:6px;padding:1px 6px;margin-left:2px;">' + scoreLabel + '</div>'
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
    _block = { id: 'reveil', label: t('block_reveil') };
  }
  var _bandeauSub = t('bandeau_sub');
  if (_block.id === 'nuit') _bandeauSub = t('bandeau_nuit');
  else if (_block.id === 'qiyam') _bandeauSub = state._unlocked && state._unlocked.includes(4) ? t('bandeau_qiyam') : t('bandeau_nuit');
  html += '<div style="display:flex;align-items:center;gap:10px;background:linear-gradient(135deg,rgba(200,168,75,0.15),rgba(200,168,75,0.05));border:1px solid rgba(200,168,75,0.35);border-radius:14px;padding:14px 18px;margin:0 0 20px;">'
    + '<div style="width:3px;height:36px;background:linear-gradient(180deg,#C8A84A,#E0C870);border-radius:2px;flex-shrink:0;"></div>'
    + '<div>'
    + '<div style="font-size:15px;font-weight:700;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;letter-spacing:0.5px;">' + _block.label + '</div>'
    + '<div style="font-size:12px;color:var(--t3);margin-top:2px;">' + _bandeauSub + '</div>'
    + '</div>'
    + '</div>';
  var _toggleLabel = window._showAllBlocks ? t('toggle_moment') : t('toggle_all');
  html += '<div style="text-align:center;margin:-12px 0 16px;"><button onclick="window._showAllBlocks=!window._showAllBlocks;renderLevel(' + levelId + ')" style="background:transparent;border:none;color:#C8A84A;font-size:12px;font-weight:600;cursor:pointer;opacity:0.7;letter-spacing:0.3px;">' + _toggleLabel + '</button></div>';
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
    var _sectionTitleMap = {'Les 5 Prières':'section_prayers','Wird quotidien':'section_wird','Sunnah de base':'section_sunnah','Approfondissement de la prière':'section_deep_prayer','Dhikr du cœur':'section_dhikr','Douâas intimes':'section_duas','Étude islamique':'section_study','Immersion coranique':'section_quran','Pratiques avancées':'section_advanced',"Sommet de l'adoration":'section_summit','Rayonnement vers les autres':'section_radiance',"Conscience de l'Oumma":'section_ummah'};
    var _sectionTitle = _sectionTitleMap[section.title] ? t(_sectionTitleMap[section.title]) : section.title;
    var _sectionTitleArabic = {'Les 5 Prières':'الصَّلَاةُ','Wird quotidien':'الوِرْد','Sunnah de base':'السُّنَن','Approfondissement de la prière':'الخُشُوع','Dhikr du cœur':'ذِكْر القَلْب','Douâas intimes':'الدُّعَاء','Étude islamique':'العِلْم','Immersion coranique':'التِّلَاوَة','Pratiques avancées':'المُجَاهَدَة',"Sommet de l'adoration":'الإِحْسَان','Rayonnement vers les autres':'الرَّحْمَة',"Conscience de l'Oumma":'الأُمَّة'};
    var _sectionArabic = _sectionTitleArabic[section.title] || '';
    html += '<div class="section"><div class="section-header">' + (_sectionArabic ? '<div class="section-arabic">' + _sectionArabic + '</div>' : '') + '<div class="section-name">' + _sectionTitle + '</div><div class="section-line"></div></div>'
      + (section.desc ? '<div class="section-info-block"><div class="section-info-icon">\u06de</div><div><div class="section-info-title">' + t('wird_what') + '</div><div class="section-info-text">' + section.desc + '</div></div></div>' : '');
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
        const optionalBadge = '<span style="font-size:12px;font-weight:700;letter-spacing:0.8px;color:var(--green);background:rgba(52,217,98,0.12);border:1px solid rgba(52,217,98,0.25);border-radius:6px;padding:1px 5px;margin-left:5px;vertical-align:middle;">BONUS</span>';
        html += '<div class="item' + (checked ? ' checked' : '') + '" onclick="toggleItem(\'' + item.id + '\',event)" style="animation-delay:' + delay + 'ms;--i:' + idx + '" id="item-' + item.id + '">'
          + '<div class="check-circle"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
          + '<div class="item-body"><div class="item-label">' + tI(item,'label') + optionalBadge + '</div><div class="item-sub">' + tI(item,'sub') + '</div>'
          + '<div class="item-arabic">' + item.arabic + '</div></div>'
          + '<button class="btn-audio" onclick="openCoranPicker(event)" title="' + t('btn_choose_surah') + '" style="font-size:13px;padding:0 10px;width:auto;white-space:nowrap;">📖 Écouter</button>'
          + '</div>';
      } else {
        const checked = !!state[item.id];
        const fridayCls = item.isFriday ? ' friday-item' : '';
        const arabicHtml = item.arabic ? '<div class="item-arabic">' + item.arabic + '</div>' : '';
        const audioSrc = Array.isArray(item.audio) ? JSON.stringify(item.audio).replace(/"/g,"'") : item.audio;
        const audioBtn = item.audio ? '<button class="btn-audio" aria-label="Écouter" ontouchstart="event.stopPropagation()" onclick="playAudio(' + (Array.isArray(item.audio) ? JSON.stringify(item.audio).replace(/"/g,"'") : '\'' + item.audio + '\'') + ',this,event)" title="' + t('btn_listen_recitation') + '">🔊</button>' : '';
        let infoBtn = '';
        if (item.hadith) {
          const labelEsc2 = tI(item,'label').replace(/"/g,'&quot;');
          const arabicEsc2 = (item.arabic||'').replace(/"/g,'&quot;');
          const hadithEsc = item.hadith.replace(/"/g,'&quot;');
          const sourceEsc = (item.source||'').replace(/"/g,'&quot;');
          infoBtn = '<button class="btn-info" aria-label="Détails" onclick="openInfoSheet(\'\',\'\',\'\',\'\',event)" data-label="' + labelEsc2 + '" data-arabic="' + arabicEsc2 + '" data-phonetic="" data-translation="' + hadithEsc + '" title="' + t('btn_why') + '"><i>i</i></button>';
        } else if (item.sub && tI(item,'sub').includes('·') && item.arabic) {
          const parts = tI(item,'sub').split('·');
          const phonetic = parts[0].trim();
          const translation = parts.slice(1).join('·').trim();
          const labelEsc2 = tI(item,'label').replace(/"/g,'&quot;');
          const arabicEsc2 = (item.arabic||'').replace(/"/g,'&quot;');
          const phoneticEsc = phonetic.replace(/"/g,'&quot;');
          const translationEsc = translation.replace(/"/g,'&quot;');
          infoBtn = '<button class="btn-info" aria-label="Détails" onclick="openInfoSheet(\'\',\'\',\'\',\'\',event)" data-label="' + labelEsc2 + '" data-arabic="' + arabicEsc2 + '" data-phonetic="' + phoneticEsc + '" data-translation="' + translationEsc + '" title="' + t('btn_see_phonetic') + '"><i>i</i></button>';
        }
        const optionalBadge = item.optional ? '<span style="font-size:12px;font-weight:700;letter-spacing:0.8px;color:var(--green);background:rgba(52,217,98,0.12);border:1px solid rgba(52,217,98,0.25);border-radius:6px;padding:1px 5px;margin-left:5px;vertical-align:middle;">BONUS</span>' : '';
        const priorityCls = item.priority === 'fard' ? ' priority-fard' : item.priority === 'sunnah' ? ' priority-sunnah' : '';
        const _tlCurrent = (!checked && !_firstUncheckedFound) ? (_firstUncheckedFound = true, ' timeline-current') : '';
        const _tlOpacity = checked ? 'opacity:0.3;' : '';
        var shareBtn = '';
        if (item.id === 'savais_tu') {
          shareBtn = '<button class="btn-audio" aria-label="Écouter" ontouchstart="event.stopPropagation()" onclick="shareSavaisTu(event)" title="' + t('btn_share_label') + '" style="font-size:13px;padding:0 8px;width:auto;">📤</button>';
        }
        var _tl = tI(item,'label'), _ts = tI(item,'sub');
        html += '<div class="item' + fridayCls + (checked ? ' checked' : '') + _tlCurrent + '" onclick="toggleItem(\'' + item.id + '\',event)" style="' + _tlOpacity + 'animation-delay:' + delay + 'ms;--i:' + idx + '" id="item-' + item.id + '"><div class="check-circle"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="item-body"><div class="item-label' + priorityCls + '">' + _tl + optionalBadge + '</div>' + (_ts ? '<div class="item-sub">' + (_ts.includes('·') ? _ts.split('·')[0].trim() : _ts) + '</div>' : '') + arabicHtml + '</div>' + shareBtn + audioBtn + infoBtn + '</div>';
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
  if (nextLvl) {
    var _locked = !state._unlocked.includes(nextId);
    html += '<div style="padding:8px 0 24px;text-align:center;">'
      + '<button class="btn-next-level' + (_locked ? ' locked' : '') + '" onclick="selectLevel(' + nextId + ')">NIVEAU ' + nextId + ' · ' + t('level_' + nextId).toUpperCase() + '</button>'
      + '</div>';
  }
  content.innerHTML = html;
  fadeInView(content);
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
    + '<div style="font-size:12px;color:' + (onTime ? 'var(--green)' : 'var(--t3)') + ';white-space:nowrap;">À l\'heure</div>'
    + '<div style="width:38px;height:22px;border-radius:11px;background:' + (onTime ? 'var(--green)' : 'rgba(255,255,255,0.1)') + ';border:1px solid ' + (onTime ? 'var(--green)' : 'rgba(255,255,255,0.15)') + ';display:flex;align-items:center;padding:2px;transition:background 0.2s;flex-shrink:0;">'
    + '<div style="width:18px;height:18px;border-radius:50%;background:' + (onTime ? '#fff' : 'rgba(255,255,255,0.4)') + ';margin-left:' + (onTime ? '16px' : '0') + ';transition:margin 0.2s;"></div>'
    + '</div></div>';
  const priorityCls = item.priority === 'fard' ? ' priority-fard' : item.priority === 'sunnah' ? ' priority-sunnah' : '';
  const _tlOpacity = checked ? 'opacity:0.3;' : '';
  return '<div class="item' + fridayCls + (checked ? ' checked' : '') + (extraClass || '') + '" onclick="toggleItem(\'' + item.id + '\',event)" style="' + _tlOpacity + 'animation-delay:' + delay + 'ms;--i:' + delay + '" id="item-' + item.id + '">'
    + '<div class="check-circle"><svg class="check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>'
    + '<div class="item-body"><div class="item-label' + priorityCls + '">' + tI(item,'label') + '</div>'
    + (item.sub ? '<div class="item-sub">' + tI(item,'sub') + '</div>' : '')
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
  const arabicLabel = isMatin ? 'وِرْدُ الصَّبَاح' : 'وِرْدُ الْمَسَاء';
  const frLabel = isMatin ? t('wird_matin') : t('wird_soir');
  return '<div class="wird-smart-card' + (allDone ? ' done' : '') + '" id="item-' + item.id + '" style="animation-delay:' + delay + 'ms" onclick="v2GoTo(\'wird\');setTimeout(function(){if(typeof renderWird===\'function\')renderWird();},60)">'
    + '<div class="wird-smart-body">'
    + '<div class="wird-smart-arabic">' + arabicLabel + '</div>'
    + '<div class="wird-smart-label">' + frLabel + '</div>'
    + '</div>'
    + '<div class="wird-smart-right">'
    + '<div class="wird-smart-count">' + done + '/' + total + '</div>'
    + '<div class="wird-smart-arrow">›</div>'
    + '</div>'
    + '<div class="wird-smart-bar"><div class="wird-smart-bar-fill" style="width:' + pct + '%"></div></div>'
    + '</div>';
}

function renderCounter(item, delay) {
  const count = state[item.id] || 0;
  const done  = count >= item.target;
  const arabicHtml = item.arabic ? '<div class="item-arabic" style="' + (done ? 'opacity:0.25' : '') + '">' + item.arabic + '</div>' : '';
  const arabicEsc = (item.arabic || '').replace(/'/g, "\\'");
  const labelEsc  = tI(item,'label').replace(/'/g, "\\'");
  const fullscreenBtn = '<button class="btn-tasbih-fs" aria-label="Plein écran" onclick="openTasbih(\'' + item.id + '\',' + item.target + ',\'' + labelEsc + '\',\'' + arabicEsc + '\')" title="' + t('btn_fullscreen') + '">⛶</button>';
  const audioBtn = item.audio ? '<button class="btn-audio" aria-label="Écouter" ontouchstart="event.stopPropagation()" onclick="playAudio(' + (Array.isArray(item.audio) ? JSON.stringify(item.audio).replace(/"/g,"'") : '\'' + item.audio + '\'') + ',this,event)" title="' + t('btn_listen_recitation') + '">🔊</button>' : '';
  return '<div class="item counter-item' + (done ? ' checked' : '') + '" style="animation-delay:' + delay + 'ms" id="item-' + item.id + '"><div class="counter-top"><div class="check-circle" id="cb-' + item.id + '" style="' + (done ? 'background:var(--green-grad);border-color:var(--green);box-shadow:0 0 0 4px var(--green-soft),0 0 16px rgba(52,217,98,0.25)' : '') + '"><svg class="check-svg" style="' + (done ? 'opacity:1;transform:scale(1)' : '') + '" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="item-body"><div class="item-label">' + tI(item,'label') + '</div><div class="item-sub">' + tI(item,'sub') + '</div>' + arabicHtml + '</div>' + audioBtn + fullscreenBtn + '</div><div class="counter-body"><button class="btn-cnt-reset" aria-label="Réinitialiser" onclick="resetCounter(\'' + item.id + '\')">↺</button><div class="counter-display"><div class="counter-num" id="cnt-num-' + item.id + '">' + count + '</div><div class="counter-total">/ ' + item.target + '</div><div class="counter-bar-track"><div class="counter-bar-fill" id="cnt-bar-' + item.id + '" style="width:' + Math.min(count/item.target*100,100) + '%"></div></div></div><button class="btn-cnt" aria-label="Incrémenter" onclick="incrementCounter(\'' + item.id + '\',' + item.target + ')">+</button></div></div>';
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
    if (id === 'tasbih') { showToast(t('tasbih_99')); } else { showToast(t('tasbih_done') + target + t('tasbih_done_end')); }
    checkLevelCompletion(currentLevel);
  } else {
    if (navigator.vibrate) navigator.vibrate(8);
  }
  updateGlobalProgress();
  renderTabs();
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
/* ── Premium Particle Burst ── */
function spawnPremiumBurst(cx, cy) {
  var canvas = document.createElement('canvas');
  canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998;pointer-events:none;';
  canvas.width = window.innerWidth * 2;
  canvas.height = window.innerHeight * 2;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');
  ctx.scale(2, 2);
  var ox = cx, oy = cy;
  var particles = [];
  var colors = ['#C8A84A', '#E0C870', '#D4AF37', '#F0E6B0', '#B8940A'];
  // Spawn particles
  for (var i = 0; i < 28; i++) {
    var angle = (Math.PI * 2 * i / 28) + (Math.random() - 0.5) * 0.6;
    var speed = 2.5 + Math.random() * 4;
    var isStar = Math.random() < 0.3;
    particles.push({
      x: ox, y: oy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 2 - Math.random() * 3,
      size: isStar ? 0 : 3 + Math.random() * 5,
      star: isStar,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      trail: []
    });
  }
  // Ring wave
  var ring = { r: 0, alpha: 0.6 };
  var startTime = performance.now();
  var duration = 1200;
  function frame(now) {
    var elapsed = now - startTime;
    if (elapsed > duration) { canvas.remove(); return; }
    var t = elapsed / duration;
    ctx.clearRect(0, 0, canvas.width / 2, canvas.height / 2);
    // Ring wave
    ring.r = t * 80;
    ring.alpha = 0.6 * (1 - t);
    ctx.beginPath();
    ctx.arc(ox, oy, Math.max(0.1, ring.r), 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(200,168,75,' + ring.alpha + ')';
    ctx.lineWidth = 2 * (1 - t);
    ctx.stroke();
    // Particles
    particles.forEach(function(p) {
      p.trail.push({ x: p.x, y: p.y, alpha: p.alpha * 0.4 });
      if (p.trail.length > 6) p.trail.shift();
      p.vy += 0.12; // gravity
      p.vx *= 0.985;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotSpeed;
      p.alpha = Math.max(0, 1 - t * 1.2);
      // Trail
      p.trail.forEach(function(tr, ti) {
        var ta = tr.alpha * (ti / p.trail.length) * (1 - t);
        ctx.beginPath();
        ctx.arc(tr.x, tr.y, Math.max(0.1, p.size * 0.4), 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(')', ',' + ta + ')').replace('rgb', 'rgba').replace('#', '');
        ctx.fillStyle = 'rgba(200,168,75,' + ta + ')';
        ctx.fill();
      });
      // Particle
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.globalAlpha = p.alpha;
      if (p.star) {
        ctx.fillStyle = p.color;
        ctx.font = (10 + Math.random() * 4) + 'px serif';
        ctx.textAlign = 'center';
        ctx.fillText('✦', 0, 0);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, Math.max(0.1, p.size * (0.5 + 0.5 * (1 - t))), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
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
      if (event) spawnPremiumBurst(event.clientX || event.touches?.[0]?.clientX || 0, event.clientY || event.touches?.[0]?.clientY || 0);
      if (id === 'jumua') {
        if (!history.jumuahDays) history.jumuahDays = {};
        if (!history.jumuahDays[TODAY]) {
          history.jumuahDays[TODAY] = true;
          history.jumuahCount = (history.jumuahCount || 0) + 1;
          saveHistory();
          showToast(t('jumuah_done'));
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
  showToast(t('new_day'));
}
let toastTimeout;
function showToast(msg) {
  if (!msg) return;
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => t.classList.remove('show'), 2600);
}
let calYear = new Date().getFullYear();
function renderYearCalendar() {
  var el = document.getElementById('yearCalContent');
  if (!el) return;
  var todayPct = Math.round(getLevelProgress(1));
  var MONTHS = ['Jan','Fev','Mar','Avr','Mai','Jun','Jul','Aou','Sep','Oct','Nov','Dec'];
  var nowYear = new Date().getFullYear();
  var canNext = calYear < nowYear;
  var html = '<div class="year-nav"><button class="year-nav-btn" aria-label="Année précédente" onclick="calYear--;renderYearCalendar()">&#8249;</button><div class="year-nav-title">' + calYear + '</div><button class="year-nav-btn" aria-label="Année suivante" style="opacity:' + (canNext ? '1' : '0.3') + '" onclick="' + (canNext ? 'calYear++;renderYearCalendar()' : '') + '">&#8250;</button></div><div class="year-months">';
  for (var m = 0; m < 12; m++) {
    var daysInMonth = new Date(calYear, m + 1, 0).getDate();
    html += '<div class="year-month"><div class="year-month-label">' + MONTHS[m] + '</div><div class="year-days">';
    for (var d = 1; d <= daysInMonth; d++) {
      var dStr = calYear + '-' + String(m + 1).padStart(2, '0') + '-' + String(d).padStart(2, '0');
      var isToday = dStr === TODAY;
      var isFuture = dStr > TODAY;
      var pct = 0;
      if (isToday) pct = todayPct;
      else if (!isFuture && history.dayScores && history.dayScores[dStr]) pct = history.dayScores[dStr];
      else if (!isFuture && history.days && history.days[dStr]) pct = 100;
      var cls = 'year-day';
      if (isFuture) cls += ' fy';
      else if (pct >= 80) cls += ' yg';
      else if (pct >= 40) cls += ' ys';
      else if (pct >= 1) cls += ' yb';
      if (isToday) cls += ' yt';
      html += '<div class="' + cls + '" title="' + dStr + ' · ' + pct + '%"></div>';
    }
    html += '</div></div>';
  }
  html += '</div><div class="year-legend"><div class="yl-item"><div class="yl-dot" style="background:var(--card2)"></div>Aucune</div><div class="yl-item"><div class="yl-dot yb"></div>1-39%</div><div class="yl-item"><div class="yl-dot ys"></div>40-79%</div><div class="yl-item"><div class="yl-dot yg"></div>80%+</div></div>';
  el.innerHTML = html;
}
function getGraineSVG(count) {
  if (count >= 20) return '<svg width="160" height="160" viewBox="0 0 140 140" style="display:block;min-width:160px;min-height:160px;animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="65" y="50" width="10" height="70" rx="3" fill="#8B6914"/><ellipse cx="70" cy="45" rx="35" ry="28" fill="#4CAF50" opacity="0.85"/><ellipse cx="70" cy="38" rx="28" ry="22" fill="#66BB6A" opacity="0.7"/><circle cx="52" cy="40" r="5" fill="#C8A84A"/><circle cx="88" cy="40" r="5" fill="#C8A84A"/><circle cx="60" cy="30" r="4" fill="#C8A84A"/><circle cx="80" cy="30" r="4" fill="#C8A84A"/><circle cx="70" cy="50" r="5" fill="#C8A84A"/><circle cx="70" cy="25" r="4" fill="#C8A84A"/></svg>';
  if (count >= 10) return '<svg width="160" height="160" viewBox="0 0 140 140" style="display:block;min-width:160px;min-height:160px;animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="66" y="55" width="8" height="65" rx="3" fill="#8B6914"/><ellipse cx="70" cy="50" rx="32" ry="25" fill="#4CAF50" opacity="0.85"/><ellipse cx="70" cy="44" rx="24" ry="18" fill="#66BB6A" opacity="0.7"/></svg>';
  if (count >= 5) return '<svg width="160" height="160" viewBox="0 0 140 140" style="display:block;min-width:160px;min-height:160px;animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="68" y="60" width="4" height="60" rx="2" fill="#4CAF50"/><ellipse cx="58" cy="72" rx="12" ry="6" fill="#4CAF50" transform="rotate(-30 58 72)"/><ellipse cx="82" cy="82" rx="12" ry="6" fill="#4CAF50" transform="rotate(30 82 82)"/><ellipse cx="56" cy="92" rx="10" ry="5" fill="#66BB6A" transform="rotate(-25 56 92)"/><ellipse cx="84" cy="102" rx="10" ry="5" fill="#66BB6A" transform="rotate(25 84 102)"/></svg>';
  if (count >= 1) return '<svg width="160" height="160" viewBox="0 0 140 140" style="display:block;min-width:160px;min-height:160px;animation:grainFloat 3s ease-in-out infinite;"><line x1="40" y1="120" x2="100" y2="120" stroke="#8B6914" stroke-width="2"/><rect x="68" y="80" width="4" height="40" rx="2" fill="#4CAF50"/><ellipse cx="60" cy="88" rx="10" ry="5" fill="#4CAF50" transform="rotate(-30 60 88)"/><ellipse cx="80" cy="98" rx="10" ry="5" fill="#4CAF50" transform="rotate(30 80 98)"/></svg>';
  return '<svg width="160" height="160" viewBox="0 0 140 140" style="display:block;min-width:160px;min-height:160px;animation:grainFloat 3s ease-in-out infinite;filter:drop-shadow(0 0 8px rgba(200,168,75,0.6));"><line x1="40" y1="103" x2="100" y2="103" stroke="#8B6914" stroke-width="2"/><ellipse cx="70" cy="95" rx="12" ry="8" fill="#C8A84A"/></svg>';
}
function getGraineStageName(count) {
  if (count >= 20) return 'Arbre à fruits';
  if (count >= 10) return 'Jeune arbre';
  if (count >= 5) return 'Arbuste';
  if (count >= 1) return 'Pousse';
  return 'Dormante';
}
function renderProgression() {
  var el = document.getElementById('progContent');
  if (isSilenceDay()) {
    var _sp = _getPrenom();
    el.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:70vh;text-align:center;padding:40px 24px;">'
      + '<img src="https://nabs881-sketch.github.io/niyyah-app/imageslogo.webp" alt="Niyyah" style="width:100px;height:auto;margin-bottom:24px;opacity:0.7;">'
      + '<div style="font-family:\'Scheherazade New\',serif;font-size:36px;color:#C8A84A;margin-bottom:16px;">\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645</div>'
      + '<div style="font-family:var(--serif);font-size:20px;font-style:italic;color:var(--t1);margin-bottom:24px;">' + (_sp ? _sp + ', jour' : 'Jour') + ' de silence.</div>'
      + '<div style="font-family:\'Amiri\',serif;font-size:22px;color:rgba(200,168,75,0.6);line-height:1.8;direction:rtl;margin-bottom:8px;">\u0648\u0625\u0650\u0644\u064E\u0649\u0670 \u0631\u064E\u0628\u0651\u0650\u0643\u064E \u0641\u0671\u0631\u0652\u063A\u064E\u0628</div>'
      + '<div style="font-family:var(--serif);font-size:14px;font-style:italic;color:var(--t3);">'+t('silence_verse')+' \u2014 Ash-Sharh, 8</div>'
      + '</div>';
    return;
  }
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
    var dayPct = 0;
    if (isToday) { dayPct = todayDone ? 100 : Math.round(getLevelProgress(1)); }
    else if (history.days && history.days[dStr]) { dayPct = history.dayScores && history.dayScores[dStr] ? history.dayScores[dStr] : 100; }
    var color = 'rgba(255,255,255,0.12)';
    if (dayPct >= 100) color = '#C8A84A';
    else if (dayPct >= 51) color = 'rgba(200,168,75,0.6)';
    else if (dayPct >= 1) color = 'rgba(200,168,75,0.3)';
    heatmapHTML += '<div style="width:8px;height:8px;border-radius:2px;background:' + color + ';' + (isToday ? 'box-shadow:0 0 6px rgba(200,168,75,0.6);' : '') + '" title="' + dStr + ' · ' + dayPct + '%"></div>';
  }
  // === HERO JOURNÉE (fusion avec ancien Bilan) ===
  const allItemsP = LEVELS.flatMap(l => l.sections.flatMap(s => s.items));
  const totalDoneP = allItemsP.filter(item => { try { return isItemDone(item, state); } catch(e) { return item.type==='counter'?(state[item.id]||0)>=item.target:!!state[item.id]; } }).reduce((sum,i)=>{ try{return sum+getWeight(i.id);}catch(e){return sum+1;} },0);
  const totalAllP  = allItemsP.reduce((sum,i)=>{ try{return sum+getWeight(i.id);}catch(e){return sum+1;} },0);
  let lvlGridP='';
  LEVELS.forEach((lvl)=>{
    const pct=Math.round(getLevelProgress(lvl.id));
    const r=20, circ=2*Math.PI*r, dash=(pct/100)*circ;
    const ring='<svg width="48" height="48" viewBox="0 0 48 48" style="transform:rotate(-90deg);"><circle cx="24" cy="24" r="20" fill="none" stroke="rgba(200,168,75,0.15)" stroke-width="2"/><circle cx="24" cy="24" r="20" fill="none" stroke="#C8A84A" stroke-width="2" stroke-linecap="round" stroke-dasharray="'+circ.toFixed(1)+'" stroke-dashoffset="'+(circ-dash).toFixed(1)+'"/></svg>';
    lvlGridP+='<div onclick="selectLevel('+lvl.id+')" style="background:rgba(200,168,75,0.03);border:1px solid rgba(200,168,75,0.12);border-radius:14px;height:120px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;cursor:pointer;">'
      +'<div style="width:48px;height:48px;position:relative;">'+ring+'<div style="position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:\'Cormorant Garamond\',serif;font-size:14px;color:#C8A84A;">'+pct+'%</div></div>'
      +'<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-weight:600;color:#C8A84A;">'+t('level_'+lvl.id)+'</div>'
      +'</div>';
  });
  // === GRAPHIQUE 7 JOURS BILANS ===
  const bilansData = JSON.parse(localStorage.getItem('niyyah_bilans') || '{}');
  const bilanColors = { distraction: '#6b7280', effort: '#34d962', sincerite: '#ffd60a' };
  const bilanEmojis = { distraction: '😶', effort: '🌤', sincerite: '☀️' };
  const bilanLabels = { distraction: t('bilan_distrait'), effort: t('bilan_effort'), sincerite: t('bilan_sincere') };
  let bilanCells = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i);
    const ds = d.toISOString().split('T')[0];
    const choix = bilansData[ds];
    const dayName = d.toLocaleDateString(_dateLocale(), { weekday: 'short' }).slice(0,3);
    if (choix) {
      bilanCells += '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">'
        + '<div style="width:36px;height:36px;border-radius:10px;background:' + bilanColors[choix] + '22;border:1px solid ' + bilanColors[choix] + '55;display:flex;align-items:center;justify-content:center;font-size:18px;">' + bilanEmojis[choix] + '</div>'
        + '<div style="font-size:12px;color:var(--t3);text-transform:uppercase;letter-spacing:0.5px;">' + dayName + '</div>'
        + '</div>';
    } else {
      bilanCells += '<div style="display:flex;flex-direction:column;align-items:center;gap:4px;">'
        + '<div style="width:36px;height:36px;border-radius:10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:center;font-size:14px;color:var(--t3);">—</div>'
        + '<div style="font-size:12px;color:var(--t3);text-transform:uppercase;letter-spacing:0.5px;">' + dayName + '</div>'
        + '</div>';
    }
  }
  const hasBilans = Object.keys(bilansData).length > 0;
  const bilanHTML = hasBilans ? '<div style="margin:0 16px 24px;"><div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">'+t('bilan_7j_title')+'</div><div style="display:flex;gap:6px;justify-content:space-between;padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;">' + bilanCells + '</div><div style="display:flex;gap:14px;margin-top:8px;"><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">😶</span><span style="font-size:12px;color:var(--t3);">'+t('bilan_distrait')+'</span></div><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">🌤</span><span style="font-size:12px;color:var(--t3);">'+t('bilan_effort')+'</span></div><div style="display:flex;align-items:center;gap:4px;"><span style="font-size:12px;">☀️</span><span style="font-size:12px;color:var(--t3);">'+t('bilan_sincere')+'</span></div></div></div>'
    : '<div style="margin:0 16px 24px;text-align:center;padding:24px 16px;background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.06);border-radius:16px;">'
    + '<svg viewBox="0 0 32 32" width="28" height="28" fill="none" stroke="rgba(200,168,75,0.4)" stroke-width="1.5" stroke-linecap="round" style="margin-bottom:10px;"><path d="M24 6a12 12 0 1 0 0 16A9 9 0 0 1 24 6z"/></svg>'
    + '<div style="font-family:var(--serif);font-size:14px;font-style:italic;color:var(--t3);margin-bottom:12px;">'+t('empty_bilan')+'</div>'
    + '<button onclick="openBilanSoir()" style="background:transparent;border:1px solid rgba(200,168,75,0.25);border-radius:12px;padding:8px 18px;color:var(--gold);font-family:var(--serif);font-size:13px;cursor:pointer;">'+t('empty_bilan_btn')+'</button>'
    + '</div>';

  const _isFirstDay = streakDisplay === 0 && (history.totalDays || 0) === 0;
  const streakSection = _isFirstDay
    ? '<div style="text-align:center;padding:36px 20px 28px;"><div style="font-family:\'Scheherazade New\',serif;font-size:28px;color:#C8A84A;margin-bottom:10px;">\u0646\u064A\u0629</div><div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(200,168,75,0.7);">'+t('empty_streak_new')+'</div></div>'
    : '<div style="text-align:center;padding:36px 20px 28px;position:relative;"><div style="font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;">' + t('prog_streak') + '</div><div style="font-size:80px;font-weight:900;line-height:1;background:linear-gradient(135deg,#c8a84b,#e8cc6a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-3px;">' + streakDisplay + '</div><div style="font-size:13px;color:var(--t3);margin-top:6px;letter-spacing:1px;">' + t('prog_days') + '</div><div style="display:flex;justify-content:center;gap:24px;margin-top:16px;"><div style="text-align:center;"><div style="font-size:18px;font-weight:700;color:var(--t1);">' + bestDisplay + '</div><div style="font-size:12px;color:var(--t3);letter-spacing:0.8px;text-transform:uppercase;">' + t('prog_best') + '</div></div><div style="width:1px;background:rgba(255,255,255,0.1);"></div><div style="text-align:center;"><div style="font-size:18px;font-weight:700;color:var(--t1);">' + totalDisplay + '</div><div style="font-size:12px;color:var(--t3);letter-spacing:0.8px;text-transform:uppercase;">' + t('prog_total') + '</div></div></div></div>';
  const heroSectionP = '<div style="margin:0 16px 24px;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:12px;letter-spacing:2.5px;color:rgba(255,255,255,0.55);text-transform:uppercase;margin-bottom:12px;text-align:center;">'+t('progression_label')+'</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">'+lvlGridP+'</div></div>';

  el.innerHTML = `
    <div style="padding:0 0 40px;"><!-- 1. TITRE SPIRITUEL --><div id="v2-spiritual-title" style="text-align:center;margin:0 16px 12px;"></div><!-- 2. PROGRESSION -->${heroSectionP}<!-- 3. DÉFI SEMAINE --><button id="accueilDefiCard" class="defi-card-sanctuaire" onclick="if(typeof openDefiSelector==='function')openDefiSelector()" style="display:none;margin:0 16px 12px;padding:14px 18px;background:#1a1a1a;border:1px solid rgba(200,168,75,0.3);border-radius:14px;cursor:pointer;position:relative;z-index:10;text-align:left;min-height:90px;box-sizing:border-box;font-family:inherit;color:inherit;width:calc(100% - 32px);"><div style="display:flex;align-items:center;gap:12px;width:100%;"><div id="defiCardIcon"><img src="https://nabs881-sketch.github.io/niyyah-app/imagescroissant.webp" alt="Croissant" style="width:60px;height:auto;display:block;flex-shrink:0;"></div><div style="flex:1;text-align:left;"><div id="defiCardTitre" style="font-family:'Cormorant Garamond',serif;font-size:20px;font-weight:600;color:#C8A84A;">Défi de la semaine</div><div id="defiCardScore" style="font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;color:#B0A080;margin-top:2px;"></div></div></div><div id="defiCardDots" style="display:none;"></div><div id="defiCardBar" style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(200,168,75,0.12);border-radius:0 0 14px 14px;overflow:hidden;"><div id="defiCardBarFill" style="height:100%;width:0%;background:#C8A84A;transition:width 0.6s ease;"></div></div></button><!-- 4. CHALLENGE FAJR --><div id="fajr-challenge-card" style="display:none;margin:0 16px 12px;"></div><!-- 5. SÉRIE EN COURS -->${streakSection}<!-- HADITH CONTEXTUEL --><div style="margin:0 16px 24px;padding:20px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.2);border-radius:16px;position:relative;overflow:hidden;"><div style="position:absolute;top:-10px;right:12px;font-size:48px;opacity:0.07;font-family:serif;">"</div><div style="font-size:14px;line-height:1.7;color:var(--t1);font-style:italic;margin-bottom:10px;">${hadith.text}</div><div style="font-size:12px;color:#c8a84b;font-weight:600;letter-spacing:0.5px;">— ${hadith.ref}</div></div><!-- 6. HEATMAP 30 JOURS --><div style="margin:0 16px 24px;"><div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--t3);margin-bottom:12px;text-align:center;">${t('prog_heatmap')}</div><div style="display:grid;grid-template-columns:repeat(10,1fr);gap:4px;">
          ${heatmapHTML}
        </div><div style="font-family:'Inter',var(--sans);font-size:12px;color:rgba(255,255,255,0.5);text-align:center;margin-top:10px;">${t('today_pct').replace('{n}',Math.round(getLevelProgress(1)))}</div><button onclick="var c=document.getElementById('yearCalWrap');if(c.style.display==='none'){c.style.display='block';calYear=new Date().getFullYear();renderYearCalendar();this.textContent=t('cal_hide');}else{c.style.display='none';this.textContent=t('cal_annual');}" style="display:block;margin:12px auto 0;background:transparent;border:1px solid rgba(200,168,75,0.25);border-radius:12px;padding:8px 18px;color:var(--gold);font-family:var(--serif);font-size:13px;cursor:pointer;" aria-label="${t('cal_annual')}">🗓️ ${t('cal_annual')}</button><div id="yearCalWrap" style="display:none;margin-top:16px;background:var(--card);border:1px solid rgba(200,168,75,0.15);border-radius:12px;padding:16px;"><div id="yearCalContent"></div></div></div><!-- BILAN 7 JOURS -->${bilanHTML}<!-- 7. GRAINE DE LUMIÈRE --><div style="margin:0 16px 24px;background:linear-gradient(135deg,rgba(200,168,75,0.08),rgba(200,168,75,0.03));border:1px solid rgba(200,168,75,0.25);border-radius:20px;padding:28px;text-align:center;user-select:none;-webkit-user-select:none;"><div style="font-family:'Cormorant Garamond',serif;font-size:13px;letter-spacing:3px;color:#C8A84A;text-transform:uppercase;margin-bottom:16px;">${t('graine_title')}</div><div style="position:relative;width:160px;height:160px;min-width:160px;min-height:160px;margin:0 auto 16px;"><div style="position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(200,168,75,0.1) 0%,rgba(200,168,75,0.04) 50%,transparent 70%);"></div><div style="position:relative;">${getGraineSVG((function(){try{return JSON.parse(localStorage.getItem('niyyah_defi_v2')||'{}').historique||[];}catch(e){return[];}})().length)}</div></div><div style="font-family:'Inter',var(--sans);font-size:16px;color:rgba(255,255,255,0.6);margin-bottom:6px;">${(function(){try{return JSON.parse(localStorage.getItem('niyyah_defi_v2')||'{}').historique||[];}catch(e){return[];}})().length} ${t('graine_defis')}</div><div style="font-family:'Cormorant Garamond',serif;font-size:22px;font-style:italic;color:#C8A84A;margin-bottom:12px;">${getGraineStageName((function(){try{return JSON.parse(localStorage.getItem('niyyah_defi_v2')||'{}').historique||[];}catch(e){return[];}})().length)}</div><div style="font-family:'Cormorant Garamond',serif;font-size:17px;font-style:italic;color:#C8A84A;opacity:0.7;line-height:1.6;">${t('graine_quote')}</div></div>

      </div>
  `;
  // Populate moved elements
  try {
    updateSpiritualTitle();
    if (typeof updateFajrChallenge === 'function') updateFajrChallenge();
    if (typeof renderDefiCard === 'function') renderDefiCard();
  } catch(e) {}
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
    if (labelEl) labelEl.textContent = t('kahf_play');
    btn.classList.remove('playing');
    return;
  }
  if (_kahfAudio && !_kahfAudio.ended) {
    _kahfAudio.play();
    _kahfPlaying = true;
    if (iconEl)  iconEl.textContent  = '⏸';
    if (labelEl) labelEl.textContent = t('kahf_playing') + (_kahfIdx + 1) + '/110';
    btn.classList.add('playing');
    return;
  }
  // Démarrer depuis le début
  _kahfIdx = 0;
  _kahfPlaying = true;
  btn.classList.add('playing');
  if (iconEl)  iconEl.textContent  = '⏸';
  if (labelEl) labelEl.textContent = t('kahf_verse') + '1' + t('kahf_verse_end');
  function playNextKahf() {
    if (_kahfIdx >= KAHF_URLS.length || !_kahfPlaying) {
      _kahfPlaying = false;
      if (iconEl)  iconEl.textContent  = '✓';
      if (labelEl) labelEl.textContent = t('kahf_finished');
      btn.classList.remove('playing');
      return;
    }
    const a = new Audio(KAHF_URLS[_kahfIdx]);
    _kahfAudio = a;
    _currentAudio = a;
    a.play().catch(() => {});
    a.onended = function() {
      _kahfIdx++;
      if (labelEl) labelEl.textContent = t('kahf_verse') + Math.min(_kahfIdx + 1, 110) + t('kahf_verse_end');
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
    if (_tasbihId === 'tasbih') { showToast(t('tasbih_99')); } else { showToast(t('tasbih_done') + _tasbihTarget + t('tasbih_done_end')); }
    const barEl = document.getElementById('cnt-bar-' + _tasbihId);
    const numEl2 = document.getElementById('cnt-num-' + _tasbihId);
    if (barEl) barEl.style.width = '100%';
    if (numEl2) numEl2.textContent = count;
    checkLevelCompletion(currentLevel);
    updateGlobalProgress();
    renderTabs();
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
let _showCityInput = !_prayerCity && !localStorage.getItem('niyyah_coords');
// Cache horaires — lit les deux clés (ancienne + nouvelle)
const _cachedPrayerDate = localStorage.getItem('niyyah_prayer_date_v2');
const _cachedPrayerData = localStorage.getItem('niyyah_prayer_cache') || localStorage.getItem('niyyah_prayer_cache_v2');
if (_cachedPrayerDate === TODAY && _cachedPrayerData) {
  try { _prayerTimes = JSON.parse(_cachedPrayerData); } catch(e) {}
  if (_prayerTimes) setTimeout(scheduleFajrNotification, 1000);
}
const PRAYER_NAMES = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
const PRAYER_LABELS = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
function renderPrayerTimesCard() {
  // Re-check dynamiquement — coords peuvent arriver après le boot
  var _hasCoords = !!localStorage.getItem('niyyah_coords');
  if (_prayerTimes || _hasCoords || _prayerLoading) _showCityInput = false;
  if (_showCityInput) {
    return '<div class="prayer-times-card">' +
      '<div class="prayer-times-header"><div class="prayer-times-title">' + t('prayer_title') + '</div></div>' +
      '<div style="font-size:12px;color:var(--t3);margin-bottom:8px;">' + t('city_enter') + '</div>' +
      '<div class="city-input-wrap">' +
        '<input class="city-input" id="cityInput" type="text" placeholder="Ex: Paris, Casablanca, Bruxelles..." value="' + (_prayerCity||'') + '" onkeydown="if(event.key===\'Enter\')saveCityAndLoad()">' +
        '<button class="city-input-btn" aria-label="Valider la ville" onclick="saveCityAndLoad()">OK</button>' +
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
        '<input class="city-input" id="cityInput" type="text" placeholder="' + t('city_placeholder_prayer') + '" value="' + (_prayerCity||'') + '" onkeydown="if(event.key===\'Enter\')saveCityAndLoad()">' +
        '<button class="city-input-btn" aria-label="Valider la ville" onclick="saveCityAndLoad()">Réessayer</button>' +
      '</div>' +
    '</div>';
  }
  if (!_prayerTimes) return '<div class="prayer-times-card">' +
    '<div class="prayer-times-header"><div class="prayer-times-title">' + t('prayer_title') + '</div>' +
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
  var _nextName, _nextTime, _diffMin;
  if (nextIdx >= 0) {
    _nextName = times[nextIdx].name;
    _nextTime = times[nextIdx].time.substring(0,5);
    _diffMin = timeToMin(times[nextIdx].time) - nowMin;
  } else {
    _nextName = 'Fajr';
    _nextTime = times[0].time.substring(0,5);
    _diffMin = (1440 - nowMin) + timeToMin(times[0].time);
  }
  var _countdownText;
  if (_diffMin < 2) _countdownText = t('countdown_now');
  else if (_diffMin < 60) _countdownText = _diffMin + ' min';
  else _countdownText = Math.floor(_diffMin / 60) + 'h ' + String(_diffMin % 60).padStart(2,'0') + ' min';
  var countdown = '<div id="prayerCountdown" aria-live="polite" aria-atomic="true" style="display:flex;align-items:center;justify-content:space-between;padding:10px 14px;margin-bottom:8px;background:linear-gradient(135deg,rgba(200,168,75,0.12),rgba(200,168,75,0.04));border:1px solid rgba(200,168,75,0.25);border-radius:12px;">'
    + '<div><div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(200,168,75,0.5);margin-bottom:2px;">PROCHAINE</div>'
    + '<div style="font-size:15px;font-weight:700;color:#C8A84A;">' + _nextName + ' <span style="font-weight:400;font-size:13px;color:#B0A080;">dans ' + _countdownText + '</span></div></div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-weight:700;color:#C8A84A;">' + _nextTime + '</div>'
    + '</div>';
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
  var lastthird = '';
  if (_prayerTimes.Lastthird) {
    lastthird = '<div style="display:flex;align-items:center;justify-content:space-between;padding:8px 12px;margin-top:6px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.12);border-radius:10px;">'
      + '<div style="font-size:12px;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-style:italic;">🌙 Qiyâm al-layl · Dernier tiers</div>'
      + '<div style="font-size:13px;font-weight:600;color:#C8A84A;">' + _prayerTimes.Lastthird.substring(0,5) + '</div>'
      + '</div>';
  }
  return '<div class="prayer-times-card">' +
    '<div class="prayer-times-header">' +
      '<div class="prayer-times-title">🕌 Horaires — aujourd\'hui</div>' +
      '<div class="prayer-times-city" onclick="showCityInput()">✏️ ' + (_prayerCity || '📍') + '</div>' +
    '</div>' +
    countdown + grid + lastthird +
  '</div>';
}
// Countdown auto-refresh toutes les 60s
var _prayerCountdownInterval = null;
function startPrayerCountdown() {
  if (_prayerCountdownInterval) clearInterval(_prayerCountdownInterval);
  _prayerCountdownInterval = setInterval(function() {
    var el = document.getElementById('prayerCountdown');
    if (!el || !_prayerTimes) return;
    var now = new Date();
    var nowMin = now.getHours() * 60 + now.getMinutes();
    function toMin(t) { var p = t.split(':'); return parseInt(p[0]) * 60 + parseInt(p[1]); }
    var times = PRAYER_NAMES.map(function(n) { return { name: n, time: _prayerTimes[n] }; });
    var idx = times.findIndex(function(t) { return toMin(t.time) > nowMin; });
    var name, time, diff;
    if (idx >= 0) { name = times[idx].name; time = times[idx].time.substring(0,5); diff = toMin(times[idx].time) - nowMin; }
    else { name = 'Fajr'; time = times[0].time.substring(0,5); diff = (1440 - nowMin) + toMin(times[0].time); }
    var txt;
    if (diff < 2) txt = t('countdown_now');
    else if (diff < 60) txt = diff + ' min';
    else txt = Math.floor(diff / 60) + 'h ' + String(diff % 60).padStart(2,'0') + ' min';
    el.innerHTML = '<div><div style="font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(200,168,75,0.5);margin-bottom:2px;">PROCHAINE</div>'
      + '<div style="font-size:15px;font-weight:700;color:#C8A84A;">' + name + ' <span style="font-weight:400;font-size:13px;color:#B0A080;">dans ' + txt + '</span></div></div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-weight:700;color:#C8A84A;">' + time + '</div>';
  }, 60000);
}
function saveCityAndLoad() {
  var input = document.getElementById('cityInput');
  if (!input || !input.value.trim()) return;
  _prayerCity = input.value.trim();
  safeSetItem('niyyah_city', _prayerCity);
  _showCityInput = false;
  // Geocode city → coords → load
  fetch('https://api.aladhan.com/v1/qibla/' + encodeURIComponent(_prayerCity))
    .then(function(r) { return r.json(); })
    .catch(function() { return null; });
  // Use timingsByCity as geocoding fallback
  _loadPrayerByCity();
}
function showCityInput() {
  _showCityInput = true;
  renderLevel(currentLevel);
  setTimeout(function() { var el = document.getElementById('cityInput'); if (el) el.focus(); }, 100);
}
function _applyPrayerTimings(timings) {
  _prayerTimes = timings;
  _prayerLoading = false;
  _prayerError = false;
  _showCityInput = false;
  var str = JSON.stringify(timings);
  safeSetItem('niyyah_prayer_cache', str);
  safeSetItem('niyyah_prayer_cache_v2', str);
  safeSetItem('niyyah_prayer_date_v2', TODAY);
  schedulePrayerReminders();
  startPrayerCountdown();
  renderLevel(currentLevel);
  if (typeof updateSanctuaireMoment === 'function') updateSanctuaireMoment();
}
function _loadPrayerByCoords(lat, lng) {
  _prayerLoading = true;
  _prayerError = false;
  _showCityInput = false;
  renderLevel(currentLevel);
  var url = 'https://api.aladhan.com/v1/timings?latitude=' + lat + '&longitude=' + lng + '&method=12&school=0';
  fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (d.code === 200 && d.data && d.data.timings) {
        _applyPrayerTimings(d.data.timings);
      } else { throw new Error('bad response'); }
    })
    .catch(function() {
      // Fallback par ville si coords échouent
      if (_prayerCity) { _loadPrayerByCity(); }
      else { _prayerLoading = false; _prayerError = true; renderLevel(currentLevel); }
    });
}
function _loadPrayerByCity() {
  _prayerLoading = true;
  _showCityInput = false;
  _prayerError = false;
  renderLevel(currentLevel);
  var _today = new Date();
  var _dateStr = String(_today.getDate()).padStart(2,'0') + '-' + String(_today.getMonth()+1).padStart(2,'0') + '-' + _today.getFullYear();
  var url = 'https://api.aladhan.com/v1/timingsByCity/' + _dateStr + '?city=' + encodeURIComponent(_prayerCity) + '&country=' + encodeURIComponent(_prayerCountry || '') + '&method=12';
  fetch(url)
    .then(function(r) { return r.json(); })
    .then(function(d) {
      if (d.code === 200 && d.data && d.data.timings) {
        _applyPrayerTimings(d.data.timings);
      } else { throw new Error('bad response'); }
    })
    .catch(function() {
      var _fallback = localStorage.getItem('niyyah_prayer_cache');
      if (!_fallback) _fallback = localStorage.getItem('niyyah_prayer_cache_v2');
      if (_fallback) { try { _prayerTimes = JSON.parse(_fallback); } catch(e) {} }
      _prayerLoading = false;
      _prayerError = !_prayerTimes;
      renderLevel(currentLevel);
    });
}
function loadPrayerTimes() {
  // Check 24h cache first
  var _cached = localStorage.getItem('niyyah_prayer_cache');
  var _cachedDate = localStorage.getItem('niyyah_prayer_date_v2');
  if (_cachedDate === TODAY && _cached) {
    try {
      _prayerTimes = JSON.parse(_cached);
      _prayerLoading = false;
      _prayerError = false;
      schedulePrayerReminders();
      renderLevel(currentLevel);
      if (typeof updateSanctuaireMoment === 'function') updateSanctuaireMoment();
      return;
    } catch(e) {}
  }
  // Try geolocation first
  var savedCoords = localStorage.getItem('niyyah_coords');
  if (savedCoords) {
    try {
      var c = JSON.parse(savedCoords);
      _loadPrayerByCoords(c.lat, c.lng);
      return;
    } catch(e) {}
  }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        var lat = pos.coords.latitude;
        var lng = pos.coords.longitude;
        safeSetItem('niyyah_coords', JSON.stringify({ lat: lat, lng: lng }));
        _loadPrayerByCoords(lat, lng);
      },
      function() {
        // Geoloc refused → fallback city input
        if (_prayerCity) { _loadPrayerByCity(); }
        else { _showCityInput = true; renderLevel(currentLevel); }
      },
      { timeout: 8000 }
    );
  } else {
    // No geolocation API
    if (_prayerCity) { _loadPrayerByCity(); }
    else { _showCityInput = true; renderLevel(currentLevel); }
  }
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
  safeSetItem('niyyah_wird_' + (new Date().toISOString().split('T')[0]), JSON.stringify(wirdState));
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
  var _wirdArabicSession = {matin:'أَوْرَاد الصَّبَاح',soir:'أَوْرَاد الْمَسَاء'};
  let html = '<div class="section-header"><div class="section-arabic">\u0623\u064E\u0648\u0652\u0631\u0627\u062F</div><div class="section-name">' + t('wird_daily') + '</div><div class="section-line"></div></div>';
  ['matin', 'soir'].forEach(session => {
    const s = WIRD_DATA[session];
    const done = s.items.filter(i => wirdState[i.id]).length;
    const pct = Math.round(done / s.items.length * 100);
    var _wTitle = session === 'matin' ? t('wird_matin') : t('wird_soir');
    html += `<div class="wird-session"><div class="section-header" style="padding:16px 4px 8px;"><div class="section-arabic" style="font-size:18px;">${_wirdArabicSession[session]}</div><div class="section-name">${_wTitle} · ${done}/${s.items.length}</div><div class="section-line"></div></div><div class="wird-session-bar"><div class="wird-session-bar-fill" style="width:${pct}%"></div></div>`;
    s.items.forEach(item => {
      const checked = !!wirdState[item.id];
      const audioData = item.audio ? JSON.stringify(item.audio) : null;
      const audioBtn = item.audio ? `<button class="btn-wird-audio" aria-label="Écouter" ontouchstart="event.stopPropagation()" onclick="playAudioFromBtn(this,event)" data-audio="${audioData ? audioData.replace(/"/g,'&quot;') : ''}" title="${t('btn_listen')}">🔊</button>` : '';
      const phonEsc = (item.phonetic||'').replace(/"/g,'&quot;');
      const arabEsc = (item.arabic||'').replace(/"/g,'&quot;');
      const srcEsc  = (item.source||'').replace(/"/g,'&quot;');
      const labelEsc = tI(item,'label').replace(/"/g,'&quot;');
      const infoBtn = `<button class="btn-wird-info" aria-label="Détails" onclick="openInfoSheet('','','','',event)" data-label="${labelEsc}" data-arabic="${arabEsc}" data-phonetic="${phonEsc}" data-translation="${srcEsc}"><i>i</i></button>`;
      html += `<div class="wird-item${checked?' checked':''}" onclick="toggleWirdItem('${item.id}',event)"><div class="wird-check"><svg class="wird-check-svg" width="11" height="9" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="#000" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></div><div class="wird-body"><div class="wird-label">${tI(item,"label")}</div><div class="wird-sub">${tI(item,"sub")}</div><div class="wird-arabic">${item.arabic}</div></div><div class="wird-actions">${audioBtn}${infoBtn}</div></div>`;
    });
    html += `<button class="wird-reset-btn" aria-label="${t('settings_reset')}" onclick="resetWirdSession('${session}')">\u21ba ${t('settings_reset')}</button></div>`;
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
      <div style="font-size:12px;font-weight:700;color:rgba(255,255,255,0.55);letter-spacing:0.05em;">${labels[i]}</div>
    </div>`;
  }).join('');

  // Emoji selon niveau
  const emojis = { perfect: '✨', good: '🌿', average: '🌱', low: '🤲', none: '🌙' };

  const card = document.getElementById('weeklyCard');
  card.innerHTML = `
    <div style="text-align:center;padding:8px 0 20px;">
      <div style="font-size:12px;letter-spacing:0.25em;text-transform:uppercase;color:rgba(212,175,55,0.5);margin-bottom:12px;font-family:'Cormorant Garamond',serif;">${t('weekly_muhasaba')}</div>
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
        <div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(212,175,55,0.65);margin-bottom:6px;font-family:'Cormorant Garamond',serif;">Al-Istiqamah</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:13px;font-style:italic;color:rgba(240,234,214,0.65);line-height:1.6;">"${hadith.text}"</div>
        <div style="font-size:12px;color:rgba(212,175,55,0.5);margin-top:4px;">— ${hadith.source}</div>
      </div>
      <!-- Conseil pour la semaine -->
      <div style="background:rgba(135,169,107,0.06);border:1px solid rgba(135,169,107,0.15);border-radius:12px;padding:14px 16px;margin-bottom:20px;text-align:left;">
        <div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:rgba(135,169,107,0.6);margin-bottom:6px;font-family:'Cormorant Garamond',serif;">Conseil pour cette semaine</div>
        <div style="font-size:13px;color:rgba(240,234,214,0.7);line-height:1.6;">${conseil}</div>
      </div>
    </div>
    <button class="weekly-btn" onclick="closeWeeklyBilan()" style="width:100%;padding:15px;border-radius:14px;border:none;background:#C8A84A;color:#2C2E32;font-size:15px;font-weight:700;cursor:pointer;font-family:'Cormorant Garamond',serif;letter-spacing:0.05em;">
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
      + '<div style="font-size:12px;color:var(--t3);">' + s[4] + ' versets</div>'
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
    if (_versetEl) _versetEl.textContent = t('meditation_done');
    return;
  }
  const num = String(_coranSourate[0]).padStart(3,'0');
  const ver = String(_coranIdx + 1).padStart(3,'0');
  const url = 'https://everyayah.com/data/Alafasy_128kbps/' + num + ver + '.mp3';
  if (_versetEl) _versetEl.textContent = t('quran_verse_label') + (_coranIdx+1) + ' / ' + total;
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
var MEDIT_PHRASES_EN = [
  'Rest your heart. Breathe. Reflect on Allah\'s creation.',
  '\u0648\u064E\u0647\u064F\u0648\u064E \u0645\u064E\u0639\u064E\u0643\u064F\u0645\u0652 \u0623\u064E\u064A\u0652\u0646\u064E\u0645\u0627 \u0643\u064F\u0646\u062A\u064F\u0645\u0652 \u2014 He is with you wherever you are.',
  'Let thoughts pass. Return to the centre.',
  'Every breath is a gift. Say Alhamdulillah.',
  '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u2014 One name. Let it fill your heart.',
  'You don\'t need words. Just be present.',
  'The heart that remembers Allah finds peace.',
  'Think of your last prayer\u2026 were you focused\u2026 or distracted?',
  'If Allah saw you right now, would you be satisfied with yourself?',
  'How many times did you say Alhamdulillah today\u2026 sincerely?',
  'Is there someone you owe an apology to?',
  'What stops you from being better today than yesterday?',
  'If this were your last day\u2026 would you have regrets?',
  'What do you do only for Allah, with no one knowing?',
  'Is your heart hard or soft right now? Why?',
  'Death will come. Are you ready?',
  'What are you putting off\u2026 that you should do now?',
  'Think of a blessing you no longer notice. It\'s still there.',
  'Did you read the Quran today? Even one verse?',
  'Who in your life deserves a du\'a from you right now?',
  'Allah created you with a purpose. Have you searched for it?',
  'Is your silence worth more than your words right now?',
  'What worries you most? Hand it to Allah now.',
  'Are you at peace with the decisions you made this week?',
  'Is there a haram you keep doing, knowing it\'s haram?',
  'Think of your parents. Have you told them you love them?',
  'If your thoughts today were visible\u2026 would you be ashamed?',
  'Allah forgave you things you don\'t even know about. Shukr.',
  'What would you ask Allah if you were certain He\'d answer?',
  'Paradise exists. What did you do today to get closer?',
  'Contemplate Allah\'s creation. Every breath is a sign.',
  'What nourishes your soul\u2026 and what starves it?',
  'Have you hurt someone without apologizing?',
  'Your tongue\u2026 is it a tool for good or for harm?',
  'What has Allah resolved for you that you didn\'t even see?',
  'Think of your niyyah. For whom do you do what you do?',
  'Is there resentment in your heart? It weighs. Let it go.',
  'What do you want people to say about you at your death?',
  'Your gaze\u2026 where does it go when you\'re not paying attention?',
  'Did you ask Allah today? He\'s waiting.',
  'Think of a time Allah saved you without you realizing.',
  'What distracts you most from your Lord?',
  'Ingratitude is subtle. Did you complain about a blessing?',
  'What kind of Muslim do you want to be in 5 years?',
  'Your heart beats without you asking. Who does that?',
  'Is there a promise you made and didn\'t keep?',
  'What stops you from doing more dhikr?',
  'If Allah asked about your time today\u2026 what would you say?',
  'Think of someone suffering right now. Make du\'a for them.',
  'What did the death of a loved one teach you?',
  'You are only passing through. What are you taking with you?',
  'Your salat\u2026 is it a habit or an encounter?',
  'What did Allah place in your heart that you haven\'t followed yet?',
  'Is there something to confess to Allah right now?',
  'The dunya is beautiful. And yet it ends. Do you think about it?',
  'What truly makes you happy\u2026 deep down?',
  'Have you cried for Allah recently? Why not?',
  'Think of your children, or the children you\'ll have. What legacy?',
  'What would you sacrifice for Allah without hesitation?',
  'Is there someone you haven\'t forgiven? You\'re the one suffering.',
  'Your money\u2026 where does it come from? Where does it go? Is it halal?',
  'Did you protect someone today with your words or your silence?',
  'What do you do when no one is watching? That\'s who you really are.',
  'Allah calls you five times a day. Do you answer wholeheartedly?',
  'What do you need to find peace?',
  'If you could talk to yourself 10 years ago\u2026 what would you say?',
  'The Prophet \uFDFA smiled often. Have you smiled today?',
  'What have you learned about yourself this month?',
  'Have you fed your body and forgotten your soul?',
  'Think of something you own. What if Allah took it away tomorrow?',
  'What holds you back from doing good right now?',
  'Your anger\u2026 does it come from ego or real injustice?',
  'What does Allah deserve from you that you haven\'t given yet?',
  'Silence is ibadah. Can you stay quiet for one hour for Allah?',
  'What has changed in you since you started practising?',
  'Did you help someone this week expecting nothing in return?',
  'Think of your death. Not to fear. To be free.',
  'What would you ask Allah if you spoke to Him face to face?',
  'Is there a sunnah you abandoned that you want to resume?',
  'Your heart is searching for something. Is it what you think?',
  'What brings you closer to Allah? Do more of it.',
  'What takes you further away? Stop.',
  'Is there something you\'re proud of before Allah?',
  'Patience is ibadah. In what do you need more patience?',
  'What does the Quran tell you tonight that you haven\'t heard yet?',
  'Think of a trial. What did it build in you?',
  'Did you give sadaqa this week? Even a smile.',
  'Allah sees your solitude. He is there. Do you feel Him?',
  'What du\'a have you been repeating for years without visible answer? Keep going.',
  'What is beyond your control? Hand it to the One who controls all.',
  'Has your pride ever cost you something?',
  'What would you do differently if you knew Allah is watching?',
  'The happiness you seek\u2026 is it outside or inside?',
  'Did you thank someone today? That\'s shukr to Allah too.',
  'What truly deserves your tears?',
  'You\'re still here. It\'s a second chance. What will you do with it?',
  'Inhale. Allah. Exhale. Alhamdulillah. Again.'
];
var MEDIT_PHRASES_AR = [
  '\u0623\u064E\u0631\u0650\u062D\u0652 \u0642\u064E\u0644\u0652\u0628\u064E\u0643. \u062A\u064E\u0646\u064E\u0641\u0651\u064E\u0633\u0652. \u062A\u064E\u0641\u064E\u0643\u0651\u064E\u0631\u0652 \u0641\u0650\u064A \u062E\u064E\u0644\u0652\u0642\u0650 \u0627\u0644\u0644\u0651\u064E\u0647.',
  '\u0648\u064E\u0647\u064F\u0648\u064E \u0645\u064E\u0639\u064E\u0643\u064F\u0645\u0652 \u0623\u064E\u064A\u0652\u0646\u064E\u0645\u0627 \u0643\u064F\u0646\u062A\u064F\u0645.',
  '\u062F\u064E\u0639\u0650 \u0627\u0644\u0623\u064E\u0641\u0652\u0643\u0627\u0631\u064E \u062A\u064E\u0645\u064F\u0631\u0651. \u0639\u064F\u062F\u0652 \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0645\u064E\u0631\u0652\u0643\u064E\u0632.',
  '\u0643\u064F\u0644\u0651\u064F \u0646\u064E\u0641\u064E\u0633\u064D \u0646\u0650\u0639\u0652\u0645\u064E\u0629. \u0642\u064F\u0644\u0650 \u0627\u0644\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647.',
  '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u2014 \u0627\u0633\u0652\u0645\u064C \u0648\u0627\u062D\u0650\u062F. \u062F\u064E\u0639\u0652\u0647\u064F \u064A\u064E\u0645\u0652\u0644\u064E\u0623\u064F \u0642\u064E\u0644\u0652\u0628\u064E\u0643.',
  '\u0644\u0627 \u062A\u064E\u062D\u0652\u062A\u0627\u062C\u064F \u0643\u064E\u0644\u0650\u0645\u0627\u062A. \u0643\u064F\u0646\u0652 \u062D\u0627\u0636\u0650\u0631\u064B\u0627.',
  '\u0627\u0644\u0642\u064E\u0644\u0652\u0628\u064F \u0627\u0644\u0630\u0651\u0627\u0643\u0650\u0631\u064F \u064A\u064E\u062C\u0650\u062F\u064F \u0627\u0644\u0633\u0651\u064E\u0643\u0650\u064A\u0646\u064E\u0629.',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0622\u062E\u0650\u0631\u0650 \u0635\u064E\u0644\u0627\u062A\u0650\u0643\u2026 \u0647\u064E\u0644\u0652 \u0643\u064F\u0646\u0652\u062A\u064E \u062D\u0627\u0636\u0650\u0631\u064B\u0627\u061F',
  '\u0644\u064E\u0648\u0652 \u0631\u064E\u0622\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0627\u0644\u0622\u0646\u060C \u0647\u064E\u0644\u0652 \u062A\u064E\u0631\u0652\u0636\u064E\u0649 \u0639\u064E\u0646\u0652 \u0646\u064E\u0641\u0652\u0633\u0650\u0643\u061F',
  '\u0643\u064E\u0645\u0652 \u0645\u064E\u0631\u0651\u064E\u0629\u064D \u0642\u064F\u0644\u0652\u062A\u064E \u0627\u0644\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647 \u0628\u0650\u0635\u0650\u062F\u0652\u0642\u061F',
  '\u0647\u064E\u0644\u0652 \u0647\u064F\u0646\u0627\u0643\u064E \u0645\u064E\u0646\u0652 \u064A\u064E\u0633\u0652\u062A\u064E\u062D\u0650\u0642\u0651\u064F \u0627\u0639\u0652\u062A\u0650\u0630\u0627\u0631\u064E\u0643\u061F',
  '\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064E\u0645\u0652\u0646\u064E\u0639\u064F\u0643\u064E \u0645\u0650\u0646\u0652 \u0623\u064E\u0646\u0652 \u062A\u064E\u0643\u064F\u0648\u0646\u064E \u0623\u064E\u0641\u0652\u0636\u064E\u0644\u061F',
  '\u0644\u064E\u0648\u0652 \u0643\u0627\u0646\u064E \u064A\u064E\u0648\u0652\u0645\u064F\u0643 \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631\u2026 \u0647\u064E\u0644\u0652 \u0639\u0650\u0646\u0652\u062F\u064E\u0643\u064E \u0646\u064E\u062F\u064E\u0645\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u062D\u0652\u062F\u064E\u0647\u064F\u061F',
  '\u0642\u064E\u0644\u0652\u0628\u064F\u0643 \u0627\u0644\u0622\u0646\u2026 \u0642\u0627\u0633\u064D \u0623\u064E\u0645\u0652 \u0644\u064E\u064A\u0651\u0650\u0646\u061F',
  '\u0627\u0644\u0645\u064E\u0648\u0652\u062A\u064F \u0622\u062A\u064D. \u0647\u064E\u0644\u0652 \u0623\u064E\u0646\u0652\u062A\u064E \u0645\u064F\u0633\u0652\u062A\u064E\u0639\u0650\u062F\u0651\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064F\u0624\u064E\u062C\u0651\u0650\u0644\u064F\u2026 \u0648\u064A\u064E\u062C\u0650\u0628\u064F \u0641\u0650\u0639\u0652\u0644\u064F\u0647\u064F \u0627\u0644\u0622\u0646\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0646\u0650\u0639\u0652\u0645\u064E\u0629\u064D \u0644\u064E\u0645\u0652 \u062A\u064E\u0639\u064F\u062F\u0652 \u062A\u064E\u0646\u0652\u062A\u064E\u0628\u0650\u0647\u064F \u0644\u064E\u0647\u0627.',
  '\u0647\u064E\u0644\u0652 \u0642\u064E\u0631\u064E\u0623\u0652\u062A\u064E \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646 \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u061F \u062D\u064E\u062A\u0651\u064E\u0649 \u0622\u064A\u064E\u0629\u064B \u0648\u0627\u062D\u0650\u062F\u064E\u0629\u061F',
  '\u0645\u064E\u0646\u0652 \u064A\u064E\u0633\u0652\u062A\u064E\u062D\u0650\u0642\u0651\u064F \u062F\u064F\u0639\u0627\u0621\u064E\u0643\u064E \u0627\u0644\u0622\u0646\u061F',
  '\u062E\u064E\u0644\u064E\u0642\u064E\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0628\u0650\u063A\u0627\u064A\u064E\u0629. \u0647\u064E\u0644\u0652 \u0628\u064E\u062D\u064E\u062B\u0652\u062A\u064E \u0639\u064E\u0646\u0652\u0647\u0627\u061F',
  '\u0635\u064E\u0645\u0652\u062A\u064F\u0643 \u0627\u0644\u0622\u0646\u2026 \u0623\u064E\u0641\u0652\u0636\u064E\u0644\u064F \u0645\u0650\u0646\u0652 \u0643\u064E\u0644\u0627\u0645\u0650\u0643\u061F',
  '\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064F\u0642\u0652\u0644\u0650\u0642\u064F\u0643\u061F \u0633\u064E\u0644\u0651\u0650\u0645\u0652\u0647\u064F \u0644\u0650\u0644\u0651\u064E\u0647 \u0627\u0644\u0622\u0646.',
  '\u0647\u064E\u0644\u0652 \u0623\u064E\u0646\u0652\u062A\u064E \u0631\u0627\u0636\u064D \u0639\u064E\u0646\u0652 \u0642\u064E\u0631\u0627\u0631\u0627\u062A\u0650\u0643\u064E \u0647\u0630\u0627 \u0627\u0644\u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639\u061F',
  '\u0647\u064E\u0644\u0652 \u0647\u064F\u0646\u0627\u0643\u064E \u062D\u064E\u0631\u0627\u0645\u064C \u062A\u064F\u0648\u0627\u0635\u0650\u0644\u064F\u0647\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0648\u0627\u0644\u0650\u062F\u064E\u064A\u0652\u0643. \u0647\u064E\u0644\u0652 \u0623\u064E\u062E\u0652\u0628\u064E\u0631\u0652\u062A\u064E\u0647\u064F\u0645\u0627 \u0623\u064E\u0646\u0651\u064E\u0643\u064E \u062A\u064F\u062D\u0650\u0628\u0651\u064F\u0647\u064F\u0645\u0627\u061F',
  '\u0644\u064E\u0648\u0652 \u0643\u0627\u0646\u064E\u062A\u0652 \u0623\u064E\u0641\u0652\u0643\u0627\u0631\u064F\u0643 \u0645\u064E\u0631\u0652\u0626\u0650\u064A\u0651\u064E\u0629\u2026 \u0647\u064E\u0644\u0652 \u062A\u064E\u062E\u0652\u062C\u064E\u0644\u061F',
  '\u063A\u064E\u0641\u064E\u0631\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0643\u064E \u0645\u0627 \u0644\u0627 \u062A\u064E\u0639\u0652\u0644\u064E\u0645. \u0634\u064F\u0643\u0652\u0631.',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u0637\u0652\u0644\u064F\u0628\u064F \u0644\u064E\u0648\u0652 \u0623\u064E\u064A\u0652\u0642\u064E\u0646\u0652\u062A\u064E \u0623\u064E\u0646\u0651\u064E\u0647\u064F \u064A\u064F\u062C\u0650\u064A\u0628\u061F',
  '\u0627\u0644\u062C\u064E\u0646\u0651\u064E\u0629\u064F \u0645\u064E\u0648\u0652\u062C\u064F\u0648\u062F\u064E\u0629. \u0645\u0627\u0630\u0627 \u0641\u064E\u0639\u064E\u0644\u0652\u062A\u064E \u0644\u0650\u062A\u064E\u0642\u0652\u062A\u064E\u0631\u0650\u0628\u061F',
  '\u062A\u064E\u0623\u064E\u0645\u0651\u064E\u0644\u0652 \u062E\u064E\u0644\u0652\u0642\u064E \u0627\u0644\u0644\u0651\u064E\u0647. \u0643\u064F\u0644\u0651\u064F \u0646\u064E\u0641\u064E\u0633\u064D \u0622\u064A\u064E\u0629.',
  '\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064F\u063A\u064E\u0630\u0651\u0650\u064A \u0631\u064F\u0648\u062D\u064E\u0643\u2026 \u0648\u0645\u0627 \u064A\u064F\u062C\u064E\u0648\u0651\u0650\u0639\u064F\u0647\u0627\u061F',
  '\u0647\u064E\u0644\u0652 \u0622\u0630\u064E\u064A\u0652\u062A\u064E \u0623\u064E\u062D\u064E\u062F\u064B\u0627 \u062F\u064F\u0648\u0646\u064E \u0627\u0639\u0652\u062A\u0650\u0630\u0627\u0631\u061F',
  '\u0644\u0650\u0633\u0627\u0646\u064F\u0643\u2026 \u0623\u064E\u062F\u0627\u0629\u064F \u062E\u064E\u064A\u0652\u0631\u064D \u0623\u064E\u0645\u0652 \u0623\u064E\u0630\u064B\u0649\u061F',
  '\u0645\u0627\u0630\u0627 \u062D\u064E\u0644\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0643\u064E \u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u062F\u0652\u0631\u0650\u064A\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0646\u0650\u064A\u0651\u064E\u062A\u0650\u0643. \u0644\u0650\u0645\u064E\u0646\u0652 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0645\u0627 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u061F',
  '\u0647\u064E\u0644\u0652 \u0641\u0650\u064A \u0642\u064E\u0644\u0652\u0628\u0650\u0643\u064E \u063A\u0650\u0644\u0651\u061F \u0625\u0650\u0646\u0651\u064E\u0647\u064F \u064A\u064F\u062B\u0652\u0642\u0650\u0644\u064F\u0643. \u062F\u064E\u0639\u0652\u0647.',
  '\u0645\u0627\u0630\u0627 \u062A\u064F\u0631\u0650\u064A\u062F\u064F \u0623\u064E\u0646\u0652 \u064A\u064F\u0642\u0627\u0644\u064E \u0639\u064E\u0646\u0652\u0643\u064E \u0628\u064E\u0639\u0652\u062F\u064E \u0645\u064E\u0648\u0652\u062A\u0650\u0643\u061F',
  '\u0628\u064E\u0635\u064E\u0631\u064F\u0643\u2026 \u0623\u064E\u064A\u0652\u0646\u064E \u064A\u064E\u0630\u0652\u0647\u064E\u0628\u064F \u062D\u0650\u064A\u0646\u064E \u0644\u0627 \u062A\u064E\u0646\u0652\u062A\u064E\u0628\u0650\u0647\u061F',
  '\u0647\u064E\u0644\u0652 \u0633\u064E\u0623\u064E\u0644\u0652\u062A\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u061F \u0625\u0650\u0646\u0651\u064E\u0647\u064F \u064A\u064E\u0646\u0652\u062A\u064E\u0638\u0650\u0631.',
  '\u062A\u064E\u0630\u064E\u0643\u0651\u064E\u0631\u0652 \u0644\u064E\u062D\u0652\u0638\u064E\u0629\u064B \u0623\u064E\u0646\u0652\u0642\u064E\u0630\u064E\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0641\u0650\u064A\u0647\u0627.',
  '\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064F\u0644\u0652\u0647\u0650\u064A\u0643\u064E \u0639\u064E\u0646\u0652 \u0631\u064E\u0628\u0651\u0650\u0643 \u0623\u064E\u0643\u0652\u062B\u064E\u0631\u061F',
  '\u0627\u0644\u062C\u064F\u062D\u064F\u0648\u062F\u064F \u062E\u064E\u0641\u0650\u064A\u0651. \u0647\u064E\u0644\u0652 \u062A\u064E\u0630\u064E\u0645\u0651\u064E\u0631\u0652\u062A\u064E \u0645\u0650\u0646\u0652 \u0646\u0650\u0639\u0652\u0645\u064E\u0629\u061F',
  '\u0623\u064E\u064A\u0651\u064F \u0645\u064F\u0633\u0652\u0644\u0650\u0645\u064D \u062A\u064F\u0631\u0650\u064A\u062F\u064F \u0623\u064E\u0646\u0652 \u062A\u064E\u0643\u064F\u0648\u0646\u064E \u0628\u064E\u0639\u0652\u062F\u064E \u0665 \u0633\u064E\u0646\u064E\u0648\u0627\u062A\u061F',
  '\u0642\u064E\u0644\u0652\u0628\u064F\u0643 \u064A\u064E\u0646\u0652\u0628\u0650\u0636\u064F \u062F\u064F\u0648\u0646\u064E \u0625\u0650\u0630\u0652\u0646\u0650\u0643. \u0645\u064E\u0646\u0652 \u064A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0630\u0644\u0650\u0643\u061F',
  '\u0647\u064E\u0644\u0652 \u0647\u064F\u0646\u0627\u0643\u064E \u0648\u064E\u0639\u0652\u062F\u064C \u0644\u064E\u0645\u0652 \u062A\u064F\u0641\u0650\u0647\u061F',
  '\u0645\u0627 \u064A\u064E\u0645\u0652\u0646\u064E\u0639\u064F\u0643\u064E \u0645\u0650\u0646\u0652 \u0627\u0644\u0645\u064E\u0632\u0650\u064A\u062F\u0650 \u0645\u0650\u0646\u064E \u0627\u0644\u0630\u0651\u0650\u0643\u0652\u0631\u061F',
  '\u0644\u064E\u0648\u0652 \u0633\u064E\u0623\u064E\u0644\u064E\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0639\u064E\u0646\u0652 \u0648\u064E\u0642\u0652\u062A\u0650\u0643\u064E \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0645\u064E\u0646\u0652 \u064A\u064F\u0639\u0627\u0646\u0650\u064A. \u0627\u062F\u0652\u0639\u064F \u0644\u064E\u0647.',
  '\u0645\u0627\u0630\u0627 \u0639\u064E\u0644\u0651\u064E\u0645\u064E\u0643\u064E \u0641\u0650\u0642\u0652\u062F\u0627\u0646\u064F \u0634\u064E\u062E\u0652\u0635\u064D \u0639\u064E\u0632\u0650\u064A\u0632\u061F',
  '\u0623\u064E\u0646\u0652\u062A\u064E \u0639\u0627\u0628\u0650\u0631\u064C. \u0645\u0627\u0630\u0627 \u062A\u064E\u0623\u0652\u062E\u064F\u0630\u064F \u0645\u064E\u0639\u064E\u0643\u061F',
  '\u0635\u064E\u0644\u0627\u062A\u064F\u0643\u2026 \u0639\u0627\u062F\u064E\u0629\u064C \u0623\u064E\u0645\u0652 \u0644\u0650\u0642\u0627\u0621\u061F',
  '\u0645\u0627\u0630\u0627 \u0648\u064E\u0636\u064E\u0639\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0641\u0650\u064A \u0642\u064E\u0644\u0652\u0628\u0650\u0643\u064E \u0648\u0644\u064E\u0645\u0652 \u062A\u064E\u062A\u0651\u064E\u0628\u0650\u0639\u0652\u0647\u061F',
  '\u0647\u064E\u0644\u0652 \u0639\u0650\u0646\u0652\u062F\u064E\u0643\u064E \u0645\u0627 \u062A\u064E\u0639\u0652\u062A\u064E\u0631\u0650\u0641\u064F \u0628\u0650\u0647\u0650 \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0627\u0644\u0622\u0646\u061F',
  '\u0627\u0644\u062F\u0651\u064F\u0646\u0652\u064A\u0627 \u062C\u064E\u0645\u0650\u064A\u0644\u064E\u0629. \u0644\u0643\u0650\u0646\u0651\u064E\u0647\u0627 \u062A\u064E\u0646\u0652\u062A\u064E\u0647\u0650\u064A. \u0647\u064E\u0644\u0652 \u062A\u064F\u0641\u064E\u0643\u0651\u0650\u0631\u061F',
  '\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u064A\u064F\u0633\u0652\u0639\u0650\u062F\u064F\u0643\u064E \u062D\u064E\u0642\u0651\u064B\u0627\u061F',
  '\u0647\u064E\u0644\u0652 \u0628\u064E\u0643\u064E\u064A\u0652\u062A\u064E \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0645\u064F\u0624\u064E\u062E\u0651\u064E\u0631\u064B\u0627\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0623\u064E\u0648\u0652\u0644\u0627\u062F\u0650\u0643. \u0623\u064E\u064A\u0651\u064F \u0625\u0650\u0631\u0652\u062B\u064D \u062A\u064E\u062A\u0652\u0631\u064F\u0643\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064F\u0636\u064E\u062D\u0651\u0650\u064A \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u062F\u064F\u0648\u0646\u064E \u062A\u064E\u0631\u064E\u062F\u0651\u064F\u062F\u061F',
  '\u0647\u064E\u0644\u0652 \u0647\u064F\u0646\u0627\u0643\u064E \u0645\u064E\u0646\u0652 \u0644\u064E\u0645\u0652 \u062A\u064E\u063A\u0652\u0641\u0650\u0631\u0652 \u0644\u064E\u0647\u061F \u0623\u064E\u0646\u0652\u062A\u064E \u0627\u0644\u0645\u064F\u062A\u064E\u0623\u064E\u0644\u0651\u0650\u0645.',
  '\u0645\u0627\u0644\u064F\u0643\u2026 \u0645\u0650\u0646\u0652 \u0623\u064E\u064A\u0652\u0646\u061F \u0625\u0650\u0644\u064E\u0649 \u0623\u064E\u064A\u0652\u0646\u061F \u062D\u064E\u0644\u0627\u0644\u064C \u0647\u064F\u0648\u061F',
  '\u0647\u064E\u0644\u0652 \u062D\u064E\u0645\u064E\u064A\u0652\u062A\u064E \u0623\u064E\u062D\u064E\u062F\u064B\u0627 \u0628\u0650\u0643\u064E\u0644\u0627\u0645\u0650\u0643\u064E \u0623\u064E\u0648\u0652 \u0635\u064E\u0645\u0652\u062A\u0650\u0643\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u062D\u0650\u064A\u0646\u064E \u0644\u0627 \u064A\u064E\u0631\u0627\u0643\u064E \u0623\u064E\u062D\u064E\u062F\u061F \u0647\u0630\u0627 \u0623\u064E\u0646\u0652\u062A\u064E.',
  '\u064A\u064E\u062F\u0652\u0639\u064F\u0648\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u062E\u064E\u0645\u0652\u0633\u064B\u0627. \u0647\u064E\u0644\u0652 \u062A\u064F\u062C\u0650\u064A\u0628\u064F \u0628\u0650\u0643\u064F\u0644\u0651\u0650 \u0642\u064E\u0644\u0652\u0628\u0650\u0643\u061F',
  '\u0645\u0627 \u064A\u064E\u0646\u0652\u0642\u064F\u0635\u064F\u0643\u064E \u0644\u0650\u062A\u064E\u0643\u064F\u0648\u0646\u064E \u0641\u0650\u064A \u0633\u064E\u0644\u0627\u0645\u061F',
  '\u0644\u064E\u0648\u0652 \u062A\u064E\u0643\u064E\u0644\u0651\u064E\u0645\u0652\u062A\u064E \u0645\u064E\u0639\u064E \u0646\u064E\u0641\u0652\u0633\u0650\u0643\u064E \u0642\u064E\u0628\u0652\u0644\u064E \u0661\u0660 \u0633\u064E\u0646\u064E\u0648\u0627\u062A\u2026',
  '\u0627\u0644\u0646\u0651\u064E\u0628\u0650\u064A\u0651\u064F \uFDFA \u0643\u0627\u0646\u064E \u064A\u064E\u0628\u0652\u062A\u064E\u0633\u0650\u0645. \u0647\u064E\u0644\u0652 \u0627\u0628\u0652\u062A\u064E\u0633\u064E\u0645\u0652\u062A\u064E \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u0639\u064E\u0644\u0651\u064E\u0645\u0652\u062A\u064E \u0639\u064E\u0646\u0652 \u0646\u064E\u0641\u0652\u0633\u0650\u0643\u064E \u0647\u0630\u0627 \u0627\u0644\u0634\u0651\u064E\u0647\u0652\u0631\u061F',
  '\u0647\u064E\u0644\u0652 \u063A\u064E\u0630\u0651\u064E\u064A\u0652\u062A\u064E \u062C\u064E\u0633\u064E\u062F\u064E\u0643\u064E \u0648\u0646\u064E\u0633\u0650\u064A\u062A\u064E \u0631\u064F\u0648\u062D\u064E\u0643\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0634\u064E\u064A\u0652\u0621\u064D \u062A\u064E\u0645\u0652\u0644\u0650\u0643\u064F\u0647. \u0644\u064E\u0648\u0652 \u0623\u064E\u062E\u064E\u0630\u064E\u0647\u064F \u0627\u0644\u0644\u0651\u064E\u0647\u061F',
  '\u0645\u0627 \u064A\u064E\u0645\u0652\u0646\u064E\u0639\u064F\u0643\u064E \u0645\u0650\u0646\u064E \u0627\u0644\u062E\u064E\u064A\u0652\u0631\u0650 \u0627\u0644\u0622\u0646\u061F',
  '\u063A\u064E\u0636\u064E\u0628\u064F\u0643\u2026 \u0645\u0650\u0646\u064E \u0627\u0644\u0623\u064E\u0646\u0627 \u0623\u064E\u0645\u0652 \u0638\u064F\u0644\u0652\u0645\u064D \u062D\u064E\u0642\u0650\u064A\u0642\u0650\u064A\u0651\u061F',
  '\u0645\u0627\u0630\u0627 \u064A\u064E\u0633\u0652\u062A\u064E\u062D\u0650\u0642\u0651\u064F \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0645\u0650\u0646\u0652\u0643\u064E \u0648\u0644\u064E\u0645\u0652 \u062A\u064F\u0639\u0652\u0637\u0650\u0647\u061F',
  '\u0627\u0644\u0635\u0651\u064E\u0645\u0652\u062A\u064F \u0639\u0650\u0628\u0627\u062F\u064E\u0629. \u0647\u064E\u0644\u0652 \u062A\u064E\u0633\u0652\u062A\u064E\u0637\u0650\u064A\u0639\u064F \u0633\u0627\u0639\u064E\u0629\u064B \u0644\u0650\u0644\u0651\u064E\u0647\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u063A\u064E\u064A\u0651\u064E\u0631\u064E \u0641\u0650\u064A\u0643\u064E \u0645\u064F\u0646\u0652\u0630\u064F \u0623\u064E\u0646\u0652 \u0628\u064E\u062F\u064E\u0623\u0652\u062A\u061F',
  '\u0647\u064E\u0644\u0652 \u0633\u0627\u0639\u064E\u062F\u0652\u062A\u064E \u0623\u064E\u062D\u064E\u062F\u064B\u0627 \u062F\u064F\u0648\u0646\u064E \u0627\u0646\u0652\u062A\u0650\u0638\u0627\u0631\u064D\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0645\u064E\u0648\u0652\u062A\u0650\u0643. \u0644\u064E\u064A\u0652\u0633\u064E \u0644\u0650\u0644\u062E\u064E\u0648\u0652\u0641. \u0644\u0650\u0644\u062D\u064F\u0631\u0651\u0650\u064A\u0651\u064E\u0629.',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u0637\u0652\u0644\u064F\u0628\u064F \u0644\u064E\u0648\u0652 \u0643\u064E\u0644\u0651\u064E\u0645\u0652\u062A\u064E\u0647\u064F \u0648\u064E\u062C\u0652\u0647\u064B\u0627 \u0644\u0650\u0648\u064E\u062C\u0652\u0647\u061F',
  '\u0647\u064E\u0644\u0652 \u0647\u064F\u0646\u0627\u0643\u064E \u0633\u064F\u0646\u0651\u064E\u0629\u064C \u062A\u064E\u0631\u064E\u0643\u0652\u062A\u064E\u0647\u0627\u061F',
  '\u0642\u064E\u0644\u0652\u0628\u064F\u0643\u064E \u064A\u064E\u0628\u0652\u062D\u064E\u062B\u064F. \u0647\u064E\u0644\u0652 \u0647\u064F\u0648\u064E \u0645\u0627 \u062A\u064E\u0638\u064F\u0646\u0651\u061F',
  '\u0645\u0627 \u064A\u064F\u0642\u064E\u0631\u0651\u0650\u0628\u064F\u0643\u064E\u061F \u0623\u064E\u0643\u0652\u062B\u0650\u0631\u0652 \u0645\u0650\u0646\u0652\u0647.',
  '\u0645\u0627 \u064A\u064F\u0628\u0652\u0639\u0650\u062F\u064F\u0643\u061F \u062A\u064E\u0648\u064E\u0642\u0651\u064E\u0641\u0652.',
  '\u0647\u064E\u0644\u0652 \u0639\u0650\u0646\u0652\u062F\u064E\u0643\u064E \u0645\u0627 \u062A\u064E\u0641\u0652\u062A\u064E\u062E\u0650\u0631\u064F \u0628\u0650\u0647\u0650 \u0623\u064E\u0645\u0627\u0645\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u061F',
  '\u0627\u0644\u0635\u0651\u064E\u0628\u0652\u0631\u064F \u0639\u0650\u0628\u0627\u062F\u064E\u0629. \u0641\u0650\u064A \u0645\u0627\u0630\u0627 \u062A\u064E\u062D\u0652\u062A\u0627\u062C\u064F \u0635\u064E\u0628\u0652\u0631\u064B\u0627\u061F',
  '\u0645\u0627\u0630\u0627 \u064A\u064E\u0642\u064F\u0648\u0644\u064F \u0644\u064E\u0643\u064E \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646\u064F \u0627\u0644\u0644\u0651\u064E\u064A\u0652\u0644\u064E\u0629\u061F',
  '\u0641\u064E\u0643\u0651\u0650\u0631\u0652 \u0641\u0650\u064A \u0627\u0628\u0652\u062A\u0650\u0644\u0627\u0621. \u0645\u0627\u0630\u0627 \u0628\u064E\u0646\u064E\u0649 \u0641\u0650\u064A\u0643\u061F',
  '\u0647\u064E\u0644\u0652 \u062A\u064E\u0635\u064E\u062F\u0651\u064E\u0642\u0652\u062A\u064E \u0647\u0630\u0627 \u0627\u0644\u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639\u061F \u062D\u064E\u062A\u0651\u064E\u0649 \u0627\u0628\u0652\u062A\u0650\u0633\u0627\u0645\u064E\u0629.',
  '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u064A\u064E\u0631\u064E\u0649 \u0648\u064E\u062D\u0652\u062F\u064E\u062A\u064E\u0643. \u0647\u064F\u0648\u064E \u0647\u064F\u0646\u0627. \u0647\u064E\u0644\u0652 \u062A\u064E\u0634\u0652\u0639\u064F\u0631\u061F',
  '\u0623\u064E\u064A\u0651\u064F \u062F\u064F\u0639\u0627\u0621\u064D \u062A\u064F\u0643\u064E\u0631\u0651\u0650\u0631\u064F\u0647\u064F \u0645\u064F\u0646\u0652\u0630\u064F \u0633\u064E\u0646\u064E\u0648\u0627\u062A\u061F \u0648\u0627\u0635\u0650\u0644\u0652.',
  '\u0645\u0627 \u0644\u0627 \u062A\u064E\u0645\u0652\u0644\u0650\u0643\u064F\u0647\u061F \u0633\u064E\u0644\u0651\u0650\u0645\u0652\u0647\u064F \u0644\u0650\u0645\u064E\u0646\u0652 \u064A\u064E\u0645\u0652\u0644\u0650\u0643\u064F \u0643\u064F\u0644\u0651\u064E \u0634\u064E\u064A\u0652\u0621.',
  '\u0643\u0650\u0628\u0652\u0631\u064F\u0643\u2026 \u0647\u064E\u0644\u0652 \u0643\u064E\u0644\u0651\u064E\u0641\u064E\u0643\u064E \u0634\u064E\u064A\u0652\u0626\u064B\u0627\u061F',
  '\u0645\u0627\u0630\u0627 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0644\u064E\u0648\u0652 \u0639\u064E\u0644\u0650\u0645\u0652\u062A\u064E \u0623\u064E\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u064A\u064E\u0631\u064E\u0649\u061F',
  '\u0627\u0644\u0633\u0651\u064E\u0639\u0627\u062F\u064E\u0629\u064F \u0627\u0644\u0651\u064E\u062A\u0650\u064A \u062A\u064E\u0628\u0652\u062D\u064E\u062B\u064F \u0639\u064E\u0646\u0652\u0647\u0627\u2026 \u062E\u0627\u0631\u0650\u062C\u064E\u0643 \u0623\u064E\u0645\u0652 \u062F\u0627\u062E\u0650\u0644\u064E\u0643\u061F',
  '\u0647\u064E\u0644\u0652 \u0634\u064E\u0643\u064E\u0631\u0652\u062A\u064E \u0623\u064E\u062D\u064E\u062F\u064B\u0627 \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u061F \u0647\u0630\u0627 \u0634\u064F\u0643\u0652\u0631\u064C \u0644\u0650\u0644\u0651\u064E\u0647.',
  '\u0645\u0627 \u064A\u064E\u0633\u0652\u062A\u064E\u062D\u0650\u0642\u0651\u064F \u062F\u064F\u0645\u064F\u0648\u0639\u064E\u0643\u064E \u062D\u064E\u0642\u0651\u064B\u0627\u061F',
  '\u0623\u064E\u0646\u0652\u062A\u064E \u0645\u0627 \u0632\u0650\u0644\u0652\u062A\u064E \u0647\u064F\u0646\u0627. \u0641\u064F\u0631\u0652\u0635\u064E\u0629\u064C \u062C\u064E\u062F\u0650\u064A\u062F\u064E\u0629. \u0645\u0627\u0630\u0627 \u062A\u064E\u0641\u0652\u0639\u064E\u0644\u064F \u0628\u0650\u0647\u0627\u061F',
  '\u0634\u064E\u0647\u0650\u064A\u0642. \u0627\u0644\u0644\u0651\u064E\u0647. \u0632\u064E\u0641\u0650\u064A\u0631. \u0627\u0644\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647. \u0645\u064F\u062C\u064E\u062F\u0651\u064E\u062F\u064B\u0627.'
];
function _getMeditPool() {
  var lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  if (lang === 'en') return MEDIT_PHRASES_EN;
  if (lang === 'ar') return MEDIT_PHRASES_AR;
  return MEDIT_PHRASES;
}

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
  var o = document.getElementById('bilanSoirOverlay');
  o.style.display = 'flex';
  var titleEl = document.getElementById('i18n-bilan-title');
  if (titleEl) {
    var bp = (typeof _getPrenom === 'function') ? _getPrenom() : '';
    titleEl.textContent = bp ? (t('greet_evening') + ' ' + bp) : t('bilan_title');
  }
}
function closeBilanSoir() {
  document.getElementById('bilanSoirOverlay').style.display = 'none';
}
function closeBilanFeedback() {
  document.getElementById('bilanSoirFeedback').style.display = 'none';
}
function setBilanSoir(choix) {
  closeBilanSoir();
  var data = {
    distraction: { icon: '\ud83d\ude36\u200d\ud83c\udf2b\ufe0f', title: t('bilan_fb_distraction_t'), msg: t('bilan_fb_distraction_m') },
    effort:      { icon: '\ud83c\udf24\ufe0f',  title: t('bilan_fb_effort_t'), msg: t('bilan_fb_effort_m') },
    sincerite:   { icon: '\u2600\ufe0f',  title: t('bilan_fb_sincerite_t'), msg: t('bilan_fb_sincerite_m') }
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
  safeSetItem('niyyah_bilans', JSON.stringify(bilans));

  // === EFFETS SELON LE CHOIX ===
  if (choix === 'distraction') {
    // Activer Mode Tawba pour demain : forcer le flag niyyah_tawba_force
    safeSetItem('niyyah_tawba_force', '1');
    // Message au démarrage demain via toast différé (lu au prochain init)
    safeSetItem('niyyah_morning_msg', JSON.stringify({
      icon: '🌅', text: 'Nouveau jour, nouveau souffle. Allah t\'a accordé ce matin — commence par Bismillah.', date: today
    }));
  } else if (choix === 'effort') {
    safeSetItem('niyyah_morning_msg', JSON.stringify({
      icon: '🌿', text: 'Hier tu as fait des efforts. Aujourd\'hui, continue — la constance est plus aimée d\'Allah que l\'intensité.', date: today
    }));
  } else if (choix === 'sincerite') {
    // Bonus visuel streak
    safeSetItem('niyyah_morning_msg', JSON.stringify({
      icon: '✨', text: 'Hier ton cœur était sincère. Que Allah te maintienne dans cet état — c\'est Sa grâce.', date: today
    }));
    // Mini animation streak
    showToast(t('bilan_sincere'));
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
        document.getElementById('meditPhrase').textContent = t('tafakkur_done');
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
  var pool = _getMeditPool();
  var idx = Math.floor(Math.random() * pool.length);
  var el = document.getElementById('meditPhrase');
  if (el) {
    el.style.opacity = '0';
    setTimeout(function() { el.textContent = pool[idx]; el.style.opacity = '1'; }, 300);
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
      try { safeSetItem('spiritual_history', JSON.stringify(history)); } catch(e) {}
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

  // Translate tawba message
  var _tIdx = TAWBA_MESSAGES.indexOf(msg);
  msg = tTawba(msg, _tIdx >= 0 ? _tIdx : 0);
  // Appliquer la couleur du message à l'interface
  const accentColor = msg.color || '#D4AF37';
  document.documentElement.style.setProperty('--main-color', accentColor);
  if (card) {
    card.style.borderColor = accentColor + '33';
    card.style.boxShadow   = '0 0 60px ' + accentColor + '15, 0 40px 80px rgba(0,0,0,0.9)';
  }

  // Remplir le contenu (avec prénom si disponible)
  var _tp = (typeof _getPrenom === 'function') ? _getPrenom() : '';
  document.getElementById('tawbaTitle').textContent    = _tp ? (t('tawba_reviens') + ' ' + _tp) : msg.title;
  document.getElementById('tawbaSub').textContent      = _tp ? (t('tawba_attend') + ' ' + msg.sub) : msg.sub;
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
      streakEl.textContent = t('tawba_streak_prefix') + history.bestStreak + t('tawba_streak_suffix');
    } else if (history.bestStreak > 0) {
      streakEl.textContent = t('tawba_week_msg');
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
  safeSetItem('niyyah_tawba_shown', TODAY);

  // Débloquer badge Tawba si première fois
  try {
    const badges = JSON.parse(localStorage.getItem('niyyah_tawba_badges') || '{}');
    if (!badges.tawba_return) {
      badges.tawba_return = true;
      safeSetItem('niyyah_tawba_badges', JSON.stringify(badges));
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
    safeSetItem('niyyah_tawba_glow', Date.now().toString());
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



function closeWeeklyBilan() {
  document.getElementById('weeklyOverlay').classList.remove('show');
  document.body.style.overflow = '';
  safeSetItem('niyyah_bilan_week', getCurrentWeekKey());
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
const FREEMIUM_CODES = [];
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
    safeSetItem('niyyah_pro', '1');
    state._unlocked = [1, 2, 3, 4];
    saveState();
    document.getElementById('freemiumOverlay').classList.remove('show');
    document.body.style.overflow = '';
    renderTabs();
    renderLevel(currentLevel);
    showToast(t('premium_unlocked'));
    if (navigator.vibrate) navigator.vibrate([30, 50, 100]);
  } else {
    input.style.borderColor = '#ff3b30';
    input.placeholder = t('freemium_code_invalid');
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
  try { safeSetItem("niyyah_last_open", Date.now().toString()); } catch(e) {}
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
    safeSetItem('niyyah_notif_asked', '1');
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
  safeSetItem('niyyah_notif_asked', '1');
  // Si on vient de l'onboarding, lancer l'écran Niyyah
  if (!localStorage.getItem('niyyah_intention_date') || 
      localStorage.getItem('niyyah_intention_date') !== new Date().toISOString().split('T')[0]) {
    setTimeout(() => showNiyyahScreen(), 450);
  }
}

function requestNotifPermission() {
  if (!('Notification' in window)) {
    dismissNotifScreen();
    showToast(t('notif_unsupported'));
    return;
  }
  try {
    Notification.requestPermission().then(permission => {
      dismissNotifScreen();
      if (permission === 'granted') {
        showToast(t('notif_enabled'));
        safeSetItem('niyyah_notif_perm', '1');
        scheduleAllNotifications();
      } else {
        showToast(t('notif_later'));
      }
    }).catch(() => {
      dismissNotifScreen();
      showToast(t('notif_unavailable'));
    });
  } catch(e) {
    dismissNotifScreen();
    showToast('Rappels non disponibles sur cet appareil');
  }
}

// ── Planifier les 3 notifications de la journée ───────────────────────────────
function scheduleAllNotifications() {
  if (isSilenceDay()) return;
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
    try { safeSetItem("niyyah_last_open", Date.now().toString()); } catch(e) {}

    setTimeout(function() {
      try {
        if (Notification.permission === 'granted') {
          safeSetItem('niyyah_notif_perm', '1');

          // Anti-désactivation : si l'utilisateur ignore les notifs depuis 5j+
          // → réduire à 1 seule notification/jour pour ne pas surcharger
          var lastOpen = localStorage.getItem("niyyah_last_open_prev");
          var daysSince = lastOpen ? Math.floor((Date.now() - parseInt(lastOpen)) / 86400000) : 0;
          safeSetItem("niyyah_last_open_prev", Date.now().toString());

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
    showToast(t('notif_unsupported_device'));
    return;
  }
  if (Notification.permission === 'granted') {
    // Désactiver (on ne peut pas révoquer, mais on arrête de planifier)
    clearNotifTimers();
    safeSetItem('niyyah_notif_perm', '0');
    showToast(t('notif_disabled'));
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
      const timerId = setTimeout(() => {
        const emoji = PRAYER_EMOJIS[name] || '🕌';
        const fr = PRAYER_FR[name] || name;
        showToast(emoji + ' ' + t('prayer_time_toast') + fr + ' — الله أكبر');
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
      _prayerTimers.push(timerId);
    }
  });
  // Personalized Fajr notification
  scheduleFajrNotification();
}
function scheduleFajrNotification() {
  if (isSilenceDay()) return;
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
  var _fp = (typeof _getPrenom === 'function') ? _getPrenom() : '';
  if (_fp) _body = "🌅 Fajr — Bismillah " + _fp;
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
      .then(s => { if (s === 'granted') _attachCompass(); else showToast(t('compass_denied')); })
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
        subEl.textContent = t('qibla_aligned');
      } else {
        subEl.className = 'qibla-sub';
        subEl.textContent = t('qibla_turn');
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
      if (subEl) subEl.textContent = t('qibla_calibrate');
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
  const headerHtml = '<div class="qibla-card"><div style="display:flex;align-items:center;justify-content:space-between;cursor:pointer;margin-bottom:' + (_qiblaOpen ? '12' : '0') + 'px;" onclick="_qiblaOpen=!_qiblaOpen;if(!_qiblaOpen)stopCompass();renderLevel(currentLevel)"><div class="qibla-title" style="margin-bottom:0;">' + t('qibla_title') + '</div>' + chevron + '</div>';
  if (!_qiblaOpen) return headerHtml + '</div>';
  if (_qiblaLoading) return headerHtml + '<div style="font-size:13px;color:var(--t3);padding:16px 0;text-align:center;">📍 Localisation...</div></div>';
  if (_qiblaError) return headerHtml + '<div style="font-size:13px;color:var(--t3);padding:8px 0;">' + _qiblaError + '</div><button class="qibla-btn" aria-label="Réessayer" onclick="loadQibla()">Réessayer</button></div>';
  if (_qiblaAngle === null) return headerHtml + '<div style="font-size:13px;color:var(--t2);margin-bottom:14px;text-align:center;">' + t('qibla_find_text') + '</div><button class="qibla-btn" aria-label="Réessayer" onclick="loadQibla()">' + t('qibla_find_btn') + '</button></div>';
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
    + '<button class="qibla-btn" aria-label="Réessayer" onclick="loadQibla()">↻ Recalibrer</button>'
    + '</div>';
}





let _onboardStep = 0;
const APP_VERSION = '2.0'; if (localStorage.getItem('niyyah_version') !== APP_VERSION) { localStorage.removeItem('niyyah_onboard'); safeSetItem('niyyah_version', APP_VERSION); }
const _onboardDone = localStorage.getItem('niyyah_onboard') === '1';
const ONBOARD_SLIDES = [
  // Slide 0 — Splash calligraphie (clic pour avancer)
  () => '<div class="onboard-anim" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">'
      + '<div class="onboard-logo-wrap" style="opacity:0;animation:obFadeIn 0.8s ease 0.2s forwards;"><div class="onboard-logo-halo"><img src="https://nabs881-sketch.github.io/niyyah-app/imageslogo.webp" alt="Niyyah" style="width:120px;height:auto;display:block;margin:0 auto;"></div><div class="onboard-particle" style="--d:0s;--x:-40px;--y:-30px;">\u2726</div><div class="onboard-particle" style="--d:0.8s;--x:45px;--y:-20px;">\u2726</div><div class="onboard-particle" style="--d:1.6s;--x:-30px;--y:35px;">\u2726</div><div class="onboard-particle" style="--d:2.4s;--x:35px;--y:40px;">\u2726</div><div class="onboard-particle" style="--d:3.2s;--x:0px;--y:-45px;">\u2726</div></div>'
      + '<svg class="ob-calli-svg" viewBox="0 0 200 80" width="240" height="90"><text x="100" y="60" text-anchor="middle" font-family="\'Scheherazade New\',serif" font-size="56" fill="none" stroke="#C8A84A" stroke-width="0.8">\u0646\u0650\u064A\u0651\u064E\u0629</text></svg>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(200,168,75,0.7);letter-spacing:1px;opacity:0;animation:obFadeIn 1s ease 1.4s forwards;">'+t('ob_splash_sub')+'</div>'
      + '<button class="onboard-btn" onclick="onboardNext()" style="margin-top:20px;opacity:0;animation:obFadeIn 0.6s ease 2.5s forwards;">'+t('onboard_start')+'</button>'
      + '<button class="onboard-skip" onclick="onboardFinish()" style="margin-top:8px;opacity:0;animation:obFadeIn 0.6s ease 2.5s forwards;">' + t('onboard_skip') + '</button>'
      + '</div>',
  // Slide 1 — Motivation "'+t('ob_motivation_title')+'"
  () => '<div class="onboard-anim">'
    + '<div class="onboard-title">'+t('ob_motivation_title')+'</div>'
    + '<div class="onboard-sub" style="margin-bottom:24px;">'+t('ob_motivation_sub')+'</div>'
    + '<div class="ob-motiv-cards">'
    + '<div class="ob-motiv-card" onclick="obSelectMotiv(this,\'routine\')">'
    + '<svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><circle cx="20" cy="20" r="15"/><path d="M20 12v8l5 3"/></svg>'
    + '<div class="ob-motiv-title">'+t('ob_motiv_routine')+'</div>'
    + '<div class="ob-motiv-sub">'+t('ob_motiv_routine_sub')+'</div></div>'
    + '<div class="ob-motiv-card" onclick="obSelectMotiv(this,\'reconnecter\')">'
    + '<svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M20 8c-6 0-11 5-11 11s5 11 11 11 11-5 11-11"/><path d="M26 8l5 3-3 5"/></svg>'
    + '<div class="ob-motiv-title">'+t('ob_motiv_reconnecter')+'</div>'
    + '<div class="ob-motiv-sub">'+t("ob_motiv_reconnecter_sub")+'</div></div>'
    + '<div class="ob-motiv-card" onclick="obSelectMotiv(this,\'sacraliser\')">'
    + '<svg viewBox="0 0 40 40" width="36" height="36" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M20 6l2.5 5 5.5.8-4 3.9.9 5.3-4.9-2.6-4.9 2.6.9-5.3-4-3.9 5.5-.8z"/><path d="M12 28h16M14 32h12"/></svg>'
    + '<div class="ob-motiv-title">'+t('ob_motiv_sacraliser')+'</div>'
    + '<div class="ob-motiv-sub">'+t("ob_motiv_sacraliser_sub")+'</div></div>'
    + '</div>'
    + '<button class="onboard-btn" id="obMotivBtn" onclick="onboardNext()" style="opacity:0.3;pointer-events:none;">'+t('onboard_next')+'</button>'
    + '<button class="onboard-skip" onclick="onboardFinish()">' + t('onboard_skip') + '</button>'
    + '</div>',
  // Slide 2 — Deux gestes : Niyyah + Regarde
  () => {
    setTimeout(function() { if (document.getElementById('obTypeNiyyah')) obTypeWriter('obTypeNiyyah', 'Je bois avec gratitude envers Allah.', 0); }, 600);
    setTimeout(function() { if (document.getElementById('obTypeRegarde')) obTypeWriter('obTypeRegarde', 'Combien de fois as-tu bu sans voir\u00a0?', 0); }, 1200);
    return '<div class="onboard-anim">'
      + '<div class="onboard-title">'+t('ob_deux_gestes')+'</div>'
      + '<div class="ob-deux-gestes">'
      // Card Niyyah (gauche)
      + '<div class="ob-geste-card ob-geste-niyyah">'
      + '<div class="ob-geste-voile" style="background:radial-gradient(ellipse at 50% 20%,rgba(200,168,75,0.12),transparent 70%);"></div>'
      + '<div class="ob-geste-ar" style="color:#C8A84A;">نِيَّة</div>'
      + '<img src="images/niyyah-glass.webp" alt="" class="ob-geste-img">'
      + '<div class="ob-geste-txt" id="obTypeNiyyah" style="color:rgba(200,168,75,0.8);">&nbsp;</div>'
      + '<div class="ob-geste-tag" style="border-color:rgba(200,168,75,0.3);color:#C8A84A;">'+t('ob_avant_acte')+'</div>'
      + '</div>'
      // Card Regarde (droite)
      + '<div class="ob-geste-card ob-geste-regarde">'
      + '<div class="ob-geste-voile" style="background:radial-gradient(ellipse at 50% 20%,rgba(160,164,172,0.10),transparent 70%);"></div>'
      + '<div class="ob-geste-ar" style="color:#A0A4AC;">نَظَر</div>'
      + '<img src="images/regarde-hand.webp" alt="" class="ob-geste-img">'
      + '<div class="ob-geste-txt" id="obTypeRegarde" style="color:rgba(160,164,172,0.8);">&nbsp;</div>'
      + '<div class="ob-geste-tag" style="border-color:rgba(160,164,172,0.25);color:#A0A4AC;">'+t('ob_apres_acte')+'</div>'
      + '</div>'
      + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;color:var(--t3);text-align:center;margin:16px 0 24px;">'+t('ob_sacralise')+'</div>'
      + '<button class="onboard-btn" onclick="onboardNext()">'+t('onboard_next')+'</button>'
      + '<button class="onboard-skip" onclick="onboardFinish()">' + t('onboard_skip') + '</button>'
      + '</div>';
  },
  // Slide 3 — Ton chemin
  () => '<div class="onboard-anim">'
    + '<div class="onboard-title">'+t('ob_chemin_title')+'</div>'
    + '<div class="onboard-sub" style="margin-bottom:20px;">'+t("ob_chemin_sub")+'</div>'
    + '<div class="ob-chemin-grid">'
    + '<div class="ob-chemin-item"><svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M16 6v12l6 4"/><circle cx="16" cy="16" r="13"/></svg><div class="ob-chemin-label">'+t('ob_chemin_serie')+'</div><div class="ob-chemin-desc">'+t('ob_chemin_serie_d')+'</div></div>'
    + '<div class="ob-chemin-item"><svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M16 4c-1 4-4 7-8 8 4 1 7 4 8 8 1-4 4-7 8-8-4-1-7-4-8-8z"/><path d="M8 26c3-1 5-3 6-6 1 3 3 5 6 6"/></svg><div class="ob-chemin-label">'+t('ob_chemin_nafs')+'</div><div class="ob-chemin-desc">'+t('ob_chemin_nafs_d')+'</div></div>'
    + '<div class="ob-chemin-item"><svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><rect x="4" y="6" width="24" height="20" rx="3"/><path d="M4 12h24M10 6v4M22 6v4"/></svg><div class="ob-chemin-label">'+t('ob_chemin_carte')+'</div><div class="ob-chemin-desc">'+t('ob_chemin_carte_d')+'</div></div>'
    + '<div class="ob-chemin-item"><svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M16 4l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z"/></svg><div class="ob-chemin-label">'+t('ob_chemin_defi')+'</div><div class="ob-chemin-desc">'+t('ob_chemin_defi_d')+'</div></div>'
    + '<div class="ob-chemin-item"><svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M24 8a12 12 0 1 0 0 16A9 9 0 0 1 24 8z"/></svg><div class="ob-chemin-label">'+t('ob_chemin_bilan')+'</div><div class="ob-chemin-desc">'+t('ob_chemin_bilan_d')+'</div></div>'
    + '<div class="ob-chemin-item"><svg viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round"><path d="M22 6a10 10 0 1 0 0 16A8 8 0 0 1 22 6z"/></svg><div class="ob-chemin-label">'+t('ob_chemin_tawba')+'</div><div class="ob-chemin-desc">'+t('ob_chemin_tawba_d')+'</div></div>'
    + '</div>'
    + '<div style="font-family:var(--serif);font-size:14px;font-style:italic;color:var(--t3);text-align:center;margin:20px 0 16px;line-height:1.6;">'+t('ob_chemin_quote')+'</div>'
    + '<div style="margin-bottom:20px;text-align:center;"><label style="font-family:var(--serif);font-size:13px;color:var(--t3);display:block;margin-bottom:6px;">'+t("ob_chemin_prenom")+'</label>'
    + '<input type="text" placeholder="Ton pr\u00e9nom..." style="width:100%;max-width:260px;box-sizing:border-box;padding:10px 14px;background:rgba(200,168,75,0.04);border:1px solid rgba(200,168,75,0.2);border-radius:12px;color:var(--t1);font-size:14px;font-family:var(--sans);outline:none;text-align:center;" oninput="safeSetItem(\'niyyah_prenom\',this.value.trim())"></div>'
    + '<button class="onboard-btn" onclick="onboardNext()">'+t('onboard_next')+'</button>'
    + '</div>',
  // Slide 5 — Notifications 3 catégories
  () => '<div class="onboard-anim">'
    + '<div class="onboard-title">'+t('ob_notif_title')+'</div>'
    + '<div class="onboard-sub" style="margin-bottom:20px;">'+t("ob_notif_sub")+'</div>'
    + '<div class="ob-notif-cards">'
    + '<div class="ob-notif-card active" onclick="obToggleNotif(this,\'murmures\')">'
    + '<div class="ob-notif-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 21c3-3 4-7 4-12"/><path d="M10 9c4 0 7 2 9 6"/><path d="M7 15c2-1 5-1 7 0"/></svg></div>'
    + '<div class="ob-notif-body"><div class="ob-notif-name">'+t('ob_notif_murmures')+'</div><div class="ob-notif-desc">'+t('ob_notif_murmures_d')+'</div></div>'
    + '<div class="ob-notif-toggle"><div class="ob-notif-knob"></div></div></div>'
    + '<div class="ob-notif-card active" onclick="obToggleNotif(this,\'rituels\')">'
    + '<div class="ob-notif-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg></div>'
    + '<div class="ob-notif-body"><div class="ob-notif-name">'+t('ob_notif_rituels')+'</div><div class="ob-notif-desc">'+t('ob_notif_rituels_d')+'</div></div>'
    + '<div class="ob-notif-toggle"><div class="ob-notif-knob"></div></div></div>'
    + '<div class="ob-notif-card active" onclick="obToggleNotif(this,\'encourage\')">'
    + '<div class="ob-notif-icon"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A4 4 0 0 1 12 4c2.2 0 4 2.5 4 6 0 4-2 5-2 8"/><path d="M10 18h4"/><path d="M12 2v1"/><path d="M14 18c-1 2-3 2-4 0"/></svg></div>'
    + '<div class="ob-notif-body"><div class="ob-notif-name">'+t('ob_notif_encourage')+'</div><div class="ob-notif-desc">'+t("ob_notif_encourage_d")+'</div></div>'
    + '<div class="ob-notif-toggle"><div class="ob-notif-knob"></div></div></div>'
    + '</div>'
    + '<button class="onboard-btn" onclick="obActivateNotifs()">'+t('ob_notif_activate')+' <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="var(--bg)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:middle;margin-left:4px;"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></button>'
    + '<button class="onboard-skip" onclick="obSkipNotifs()">'+t('ob_notif_later')+'</button>'
    + '<div style="font-size:12px;color:var(--t3);margin-top:12px;cursor:pointer;">'+t("ob_notif_settings")+'</div>'
    + '</div>'
];
function obToggleNotif(el, key) {
  el.classList.toggle('active');
  var isOn = el.classList.contains('active');
  safeSetItem('niyyah_notif_' + key, isOn ? '1' : '0');
}
function obActivateNotifs() {
  // Store prefs (defaults already set to '1' by active class)
  ['murmures','rituels','encourage'].forEach(function(k) {
    if (!localStorage.getItem('niyyah_notif_' + k)) safeSetItem('niyyah_notif_' + k, '1');
  });
  var anyOn = document.querySelector('.ob-notif-card.active');
  if (anyOn && 'Notification' in window) {
    Notification.requestPermission().then(function(perm) {
      if (perm === 'granted') {
        safeSetItem('niyyah_notif_perm', '1');
        safeSetItem('niyyah_notif_asked', '1');
        if (typeof scheduleAllNotifications === 'function') scheduleAllNotifications();
      }
      onboardFinish();
    }).catch(function() { onboardFinish(); });
  } else {
    onboardFinish();
  }
}
function obSkipNotifs() {
  safeSetItem('niyyah_notif_murmures', '0');
  safeSetItem('niyyah_notif_rituels', '0');
  safeSetItem('niyyah_notif_encourage', '0');
  safeSetItem('niyyah_notif_asked', '1');
  onboardFinish();
}
function obTypeWriter(elId, text, i) {
  var el = document.getElementById(elId);
  if (!el || i >= text.length) return;
  el.textContent = text.substring(0, i + 1);
  setTimeout(function() { obTypeWriter(elId, text, i + 1); }, 40);
}
function obSelectMotiv(el, value) {
  document.querySelectorAll('.ob-motiv-card').forEach(function(c) { c.classList.remove('selected'); });
  el.classList.add('selected');
  safeSetItem('niyyah_motivation', value);
  var btn = document.getElementById('obMotivBtn');
  if (btn) { btn.style.opacity = '1'; btn.style.pointerEvents = 'auto'; }
}
function onboardRender() {
  requestAnimationFrame(function() {
    var content = document.getElementById('onboardContent');
    if (content) content.innerHTML = ONBOARD_SLIDES[_onboardStep]();
    [0,1,2,3,4].forEach(function(i) {
      var dot = document.getElementById('dot' + i);
      if (dot) dot.className = 'onboard-dot' + (i === _onboardStep ? ' active' : '');
    });
    if (_onboardStep === 4) {
      setTimeout(function() {
        var el = document.getElementById('onboardCityInput');
        if (el) el.focus();
      }, 400);
    }
  });
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
    safeSetItem('niyyah_city', _prayerCity);
    _showCityInput = false;
  }
  onboardFinish();
}
function onboardRequestGeoloc() {
  var btn = document.getElementById('onboardGeoBtn');
  if (btn) { btn.textContent = t('geo_loading'); btn.disabled = true; }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(pos) {
        var coords = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        safeSetItem('niyyah_coords', JSON.stringify(coords));
        if (btn) { btn.textContent = t('geo_found'); btn.style.background = 'var(--green)'; }
        setTimeout(onboardFinish, 800);
      },
      function(err) {
        // Refusé → afficher input ville
        if (btn) { btn.textContent = t('geo_locate'); btn.disabled = false; }
        var fallback = document.getElementById('onboardCityFallback');
        if (fallback) fallback.style.display = 'block';
      },
      { enableHighAccuracy: false, timeout: 15000, maximumAge: 300000 }
    );
  } else {
    var fallback = document.getElementById('onboardCityFallback');
    if (fallback) fallback.style.display = 'block';
    if (btn) { btn.style.display = 'none'; }
  }
}
function onboardFinish() {
  safeSetItem('niyyah_onboard', '1');
  const screen = document.getElementById('onboardScreen');
  if (screen) {
    screen.style.opacity = '0';
    setTimeout(() => screen.classList.add('hidden'), 350);
  }
  // Charger horaires — géoloc silencieuse si pas encore faite
  var _onboardCoords = localStorage.getItem('niyyah_coords');
  if (_onboardCoords) {
    try { var _c = JSON.parse(_onboardCoords); _loadPrayerByCoords(_c.lat, _c.lng); } catch(e) {}
  } else if (_prayerCity) {
    _loadPrayerByCity();
  } else if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {
      safeSetItem('niyyah_coords', JSON.stringify({ lat: pos.coords.latitude, lng: pos.coords.longitude }));
      if (typeof _loadPrayerByCoords === 'function') _loadPrayerByCoords(pos.coords.latitude, pos.coords.longitude);
    }, function() {}, { enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 });
  }
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
  safeSetItem('niyyah_theme', theme);
  // Mettre à jour l'icône du bouton
  const btn = document.getElementById('btnTheme');
  if (btn) btn.textContent = theme === 'light' ? '🌙' : '☀️';
}
function toggleTheme() {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
}


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
    slogan: 'Ma Niyyah · L\'Intention',
    // Orbe
    orb_start: 'Définir mon intention',
    orb_resume: 'Voir mon intention',
    // Greetings
    greeting_morning:   'Que cette journée soit lumineuse',
    greeting_afternoon: 'Restez dans le souvenir d\'Allah',
    greeting_evening:   'La gratitude ferme la journée',
    greeting_day_0: 'Que ton silence soit plein',
    greeting_day_1: 'Que cette journée soit lumineuse',
    greeting_day_2: 'Que ton cœur reste ouvert',
    greeting_day_3: 'Que ce jour t\'élève vers ce qui compte',
    greeting_day_4: 'Que tes pas soient justes',
    greeting_day_5: 'Que ta Jumu\'a t\'apaise',
    greeting_day_6: 'Que ta patience te soit rendue',
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
    nav_sanctuaire: 'Ma Niyyah',
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
    intentions: [
      'Pour la baraka dans ce que je fais aujourd\'hui',
      'Pour le bien et la protection de ma famille',
      'Pour purifier mon cœur et mes intentions',
      'Pour être utile à autrui — et plaire à Allah',
    ],
    // Prayer blocks
    block_reveil: 'AU RÉVEIL', block_fajr: 'APRÈS FAJR', block_dhuhr: 'APRÈS DHUHR', block_asr: 'APRÈS ASR', block_maghrib: 'APRÈS MAGHRIB', block_isha: 'APRÈS ISHA', block_nuit: 'La nuit', block_qiyam: 'Qiyam al-Layl',
    // Bandeau pratique
    bandeau_sub: 'Tes actes du moment', bandeau_nuit: 'Dors avec le Witr', bandeau_qiyam: 'L\'heure du Qiyam al-Layl',
    toggle_all: 'Ma journée complète', toggle_moment: 'Moment actuel',
    // Sanctuaire moment
    actes_done: 'acte accompli', actes_done_p: 'actes accomplis', actes_left: 'restant', actes_left_p: 'restants', bloc_done: '✦ Bloc accompli', bloc_done_sub: 'Barak Allahu fik', btn_continue: 'Bismillah',
    jour_left: 'acte du jour restant', jour_left_p: 'actes du jour restants',
    // Fajr challenge
    fajr_title: 'Challenge 30 jours Fajr', fajr_day: 'Jour', fajr_sur: 'sur', fajr_gardien: 'Gardien de Fajr ✦',
    // Défi
    defi_none: 'Choisir un défi ✦', defi_tap: 'Appuie pour commencer', defi_browse: 'Appuie pour parcourir les 100 défis →',
    defi_launched: 'Défi lancé : ', defi_done: 'Masha\'Allah ✦ Défi accompli !', defi_checked: '✦ Journée cochée — Continue !', defi_already: 'Déjà coché aujourd\'hui ✓',
    defi_days_left: 'jours restants', defi_day_left: 'jour restant', defi_accomplished: '✦ Accompli !',
    defi_locked: 'Tiens-le jusqu\'à dimanche, in sha Allah ✦', defi_no_active: 'Aucun défi actif',
    defi_week_prefix: 'Défi de la semaine · ', defi_week_choose: 'Défi de la semaine · Choisir ✦',
    defi_checked_today: '✓ Coché aujourd\'hui', defi_check_today: 'Cocher aujourd\'hui ✦',
    defi_enc_0: 'Commence aujourd\'hui — chaque jour compte ✦', defi_enc_1: 'Bien lancé — continue sur cette lancée !', defi_enc_2: 'À mi-chemin — tu y es presque !', defi_enc_3: 'Plus que quelques jours — tiens bon !', defi_enc_4: 'Masha\'Allah — tu es si proche !', defi_enc_5: 'Masha\'Allah ✦ Défi accompli — Barakallahu fik !',
    ramadan_off: 'Mode Ramadan désactivé', ramadan_on: '🌙 Ramadan Mubarak ! Que ce mois soit béni.',
    ramadan_fast: '🌙 Jeûne du jour enregistré — Barakallahu feek !', ramadan_laylatul: '✨ Nuit ', ramadan_laylatul_end: ' — Qu\'Allah l\'accepte !', ramadan_fallback: 'Barakallahu feek !',
    ramadan_disable_title: 'Désactiver le Mode Ramadan', ramadan_enable_title: 'Activer le Mode Ramadan',
    kahf_listen: 'Écouter Al-Kahf — Alafasy', kahf_play: 'Écouter Al-Kahf', kahf_playing: 'En cours — verset ', kahf_verse: 'Verset ', kahf_verse_end: '/110…', kahf_finished: 'Al-Kahf terminée ✦',
    tasbih_99: '🌿 99 accompli ! Dis maintenant la shahada.', tasbih_done: '🌿 Mashallah ! ',  tasbih_done_end: ' fois accompli !',
    jumuah_done: '🕌 Jumuah accomplie — Barakallahu feek !', new_day: 'Nouvelle journee — Bismillah 🌿',
    meditation_done: 'Terminé — Alhamdulillah 🌿', bilan_sincere: '✨ Journée sincère — Barakallahu fik !', tafakkur_done: 'Barakallahu fik — Tafakkur accompli ✦',
    notif_unavailable: 'Rappels non disponibles sur cet appareil', notif_unsupported_device: 'Notifications non supportées sur cet appareil',
    qibla_aligned: '✦ Tu es aligné avec La Mecque !', qibla_turn: '🔴 Tourne vers l\'aiguille dorée', qibla_calibrate: '⚠️ Calibre ton téléphone (fais un 8 dans l\'air)',
    geo_loading: '⏳ Localisation...', geo_found: '✓ Localisé !', geo_locate: '📍 Me localiser',
    nafs_observed_today: '✓ Observé aujourd\'hui', nafs_observe_btn: 'Je l\'ai ressenti aujourd\'hui',
    journal_niyyah_empty: 'Tes premières intentions apparaîtront ici ✦', journal_regarde_empty: 'Tes premiers Regards apparaîtront ici ✦',
    ikhlas_earned: 'Tu as mérité cette intention ✦', tawba_door: '✦ La porte est toujours ouverte', tawba_resume: 'Reprendre le chemin',
    note_saved: 'Enregistré ✦', scanner_analyzing: 'Analyse en cours…', journal_voice_soon: 'Journal de l\'Âme — Prochainement ✦',
    scanner_adopt: 'Adopter cette Niyyah', scanner_retry_label: 'Rescanner',
    journal_niyyah_title: '✦ Mes Niyyah', journal_regards_title: '✦ Mes Regards',
    link_see_regards: 'Voir mes Regards →', link_see_niyyah: 'Voir mes Niyyah →',
    journal_search: 'Rechercher...', modal_close: 'Fermer', btn_later: 'Plus tard',
    tawba_ameen: 'Ameen', defi_change: 'Changer de défi', notif_accept: 'Oui, je veux ces rappels 🌿',
    level_word: 'Niveau', level_accomplished: 'Niveau accompli', level_next: 'Niveau suivant \u2192', level_stay: 'Rester sur ce niveau',
    freemium_title: 'Niyyah+', freemium_sub: 'Scanner illimit\u00e9 + futurs avantages cloud.',
    freemium_buy: 'Obtenir Niyyah+ \u2014 4,99\u20ac', freemium_code_placeholder: 'CODE D\'ACC\u00c8S', freemium_free: 'Continuer en gratuit',
    freemium_f1: 'Scanner de Niyyah illimit\u00e9 (vs 1/semaine)', freemium_f2: 'Synchronisation cloud (bient\u00f4t)',
    freemium_f3: 'Sauvegarde automatique multi-appareils', freemium_f4: 'Fonctionnalit\u00e9s exclusives futures',
    freemium_f5: 'Soutenir le d\u00e9veloppement de Niyyah', freemium_f6: '',
    bilan_title: 'Bilan du soir', bilan_question: 'Comment était ton cœur aujourd\'hui ?', bilan_subtitle: 'Allah regarde la sincérité, pas le score.',
    bilan_distraction: 'Distraction', bilan_effort: 'Effort', bilan_sincerite: 'Sincérité',
    bilan_distraction_sub: 'غفلة — le cœur absent', bilan_effort_sub: 'مجاهدة — le combat intérieur', bilan_sincerite_sub: 'إخلاص — l\'état recherché',
    tasbih_label: 'Tasbih', tasbih_hint: 'Appuie n\'importe où',
    finjournee_label: 'Quand vient la nuit',
    finjournee_sub: 'Muhasaba du soir',
    fri_kahf_toast: '📖 Al-Kahf récitée — lumière jusqu\'au prochain vendredi !', fri_salawat_toast: '🌟 Salawat envoyées sur le Prophète ﷺ', fri_doua_toast: '🤲 Douaa de l\'heure bénie — qu\'Allah l\'exauce !',
    meta_subtitle: 'Pratique & Élévation', aria_language: 'Langue', aria_settings: 'Réglages',
    aria_pratique: 'Pratique', aria_wird: 'Wird', aria_parcours: 'Parcours', aria_tafakkur: 'Tafakkur',
    nafs_weekly: 'un trait par semaine', aria_back_home: 'Retour à Ma Niyyah',
    modal_anchor_title: 'Ancrer votre Niyyah', modal_intention_placeholder: 'Écrivez votre intention personnelle...',
    notif_stay_connected: 'Reste connecté à Allah',
    btn_details: 'Détails', btn_choose_surah: 'Choisir une sourate', btn_listen_recitation: 'Écouter la récitation',
    btn_why: 'Pourquoi ?', btn_see_phonetic: 'Voir la phonétique', btn_share_label: 'Partager', btn_fullscreen: 'Mode plein écran',
    city_fallback: 'Ville', city_placeholder_prayer: 'Ville...', countdown_now: 'Maintenant', btn_listen: 'Écouter',
    quran_verse_label: 'Verset ',
    tawba_streak_prefix: 'Ton chemin de ', tawba_streak_suffix: ' jours t\'attend toujours.',
    tawba_week_msg: 'Nouvelle semaine, nouvelle niyyah. Bismillah.',
    freemium_code_invalid: 'Code invalide \u2014 r\u00e9essaie', prayer_in: 'dans', prayer_time_toast: 'Il est l\u2019heure de ',
    nafs_note_placeholder: 'Dans quelle situation ? (optionnel)', hold_hint: 'Maintenez...',
    regarde_note_placeholder: 'Note personnelle...', share_savaistu_title: 'Le savais-tu ? — Niyyah Daily',
    // Wird
    wird_back: '← Retour', wird_reset: '↺ Réinitialiser',
    // Locked screen
    locked_title: 'Niveau',
    // Level labels
    lvl_start: 'Commence !', lvl_progress: 'En cours ✦', lvl_done: 'Accompli ✦',
    // Medals
    // Friday
    friday_title: 'Yawm al-Jumuah — Vendredi béni', friday_sub: 'La prière du vendredi est obligatoire aujourd\'hui',
    // Grace
    grace_title: 'Tu as manqué hier', grace_sub: 'Complète le Niveau 1 aujourd\'hui pour sauver ton streak 🌿',
    // Toasts
    toast_streak_saved: '🌿 Journée rattrapée — ton streak est sauvé !', toast_lvl1: 'مَا شَاءَ اللَّهُ — Niveau 1 accompli ! 🌿',
    toast_lvl_unlock: '🌿 Niveau {n} débloqué — Mashallah !',
    toast_niyyah: '✦ Niyyah posée — Bismillah 🌿',
    // Progression
    prog_streak: 'Série en cours', prog_days: 'JOURS CONSÉCUTIFS', prog_best: 'Meilleur', prog_total: 'Total jours',
    prog_heatmap: '30 derniers jours', prog_present: 'Présent', prog_gold_day: 'Journée or', prog_absent: 'Absent',
    prog_msg_none: 'Bismillah — commence ta journée ✦', prog_msg_bronze: 'Mashallah !', prog_msg_silver: 'SubhanAllah !', prog_msg_gold: 'Allahu Akbar !',
    prog_sub_none: 'Chaque petit acte te rapproche d\'Allah', prog_sub_bronze: 'Les fondations sont posées', prog_sub_silver: 'Dhikr, prière, constance', prog_sub_gold: 'Journée parfaite accomplie',
    // Graine
    graine_title: 'Graine de Lumière', graine_sub: 'La graine attend la lumière', graine_defis: 'défis accomplis', graine_quote: 'Avez-vous vu ce que vous cultivez ? — Al-Waqi\'a 63',
    // Scanner
    scanner_posed: '✦ INTENTION POSÉE', scanner_empty: 'Tes intentions apparaîtront ici ✦',
    scanner_limit: 'Ton scan du jour a été utilisé — reviens demain inch\'Allah 🌙',
    scanner_limit_week: 'Tu as atteint ta limite de scans cette semaine — reviens bientôt inch\'Allah 🌙',
    // Onboarding
    onboard_start: 'Commencer', onboard_next: 'Suivant', onboard_skip: 'Passer', onboard_later: 'Plus tard', onboard_go: 'C\'est parti — Bismillah 🌿',
    onboard_title1: 'Ta pratique spirituelle,<br>chaque jour', onboard_sub1: 'Niyyah t\'accompagne dans ton chemin vers Allah — à ton rythme, sans jugement.',
    onboard_title2: 'Le Scanner de Niyyah', onboard_sub2: 'Pose ton regard sur un objet du quotidien — le Scanner te proposera une intention spirituelle pour le sacraliser.',
    onboard_title3: '4 niveaux de pratique', onboard_sub3: 'Progresse à ton rythme — chaque niveau se débloque quand tu es prêt.',
    onboard_title4: 'Tes horaires de prière', onboard_sub4: 'Entre ta ville pour afficher les horaires de Fajr, Dhuhr, Asr, Maghrib et Isha chaque jour.',
    onboard_city_placeholder: 'Ex: Paris, Orléans, Casablanca...',
    onboard_tagline: 'نِيَّة · Pose ton intention',
    onboard_scanner_example: 'Ton verre d\'eau, ton stylo, ton miroir...<br>Chaque objet peut porter une niyyah.',
    onboard_lvl1_desc: 'Les 5 prières · Dhikr · Récitation', onboard_lvl2_desc: 'Mosquée · Istighfar · Tasbih',
    onboard_lvl3_desc: 'Hadiths · Coran · Arabe', onboard_lvl4_desc: 'Sadaqa · Salam · Douaas',
    onboard_city_manual: 'Ou entre ta ville manuellement :',
    ob_splash_sub: 'Pose ton intention', ob_avant_acte: 'Avant l\u2019acte', ob_apres_acte: 'Apr\u00e8s l\u2019acte',
    ob_deux_gestes: 'Deux gestes pour ton quotidien', ob_sacralise: 'Sacralise. Examine.',
    ob_motivation_title: 'Qu\u2019est-ce qui t\u2019am\u00e8ne\u00a0?', ob_motivation_sub: 'Choisis ce qui te parle \u2014 on adapte ton exp\u00e9rience.',
    ob_motiv_routine: 'Routine spirituelle', ob_motiv_routine_sub: 'Installer une pratique quotidienne',
    ob_motiv_reconnecter: 'Reconnecter avec Allah', ob_motiv_reconnecter_sub: 'Revenir apr\u00e8s une p\u00e9riode d\u2019\u00e9loignement',
    ob_motiv_sacraliser: 'Sacraliser mon quotidien', ob_motiv_sacraliser_sub: 'Donner un sens spirituel \u00e0 chaque geste',
    ob_chemin_title: 'Niyyah suit tes pas', ob_chemin_sub: 'Voici ce qui t\u2019accompagne chaque jour.',
    ob_chemin_serie: 'S\u00e9rie', ob_chemin_serie_d: 'Jours cons\u00e9cutifs',
    ob_chemin_nafs: 'Nafs', ob_chemin_nafs_d: '52 traits de l\u2019\u00e2me',
    ob_chemin_carte: 'Carte', ob_chemin_carte_d: 'Calendrier annuel',
    ob_chemin_defi: 'D\u00e9fi', ob_chemin_defi_d: '1 par semaine',
    ob_chemin_bilan: 'Bilan du soir', ob_chemin_bilan_d: 'Muhasaba quotidienne',
    ob_chemin_tawba: 'Tawba', ob_chemin_tawba_d: 'Reviens sans jugement',
    ob_chemin_prenom: 'Comment veux-tu qu\u2019on t\u2019appelle\u00a0?', ob_chemin_prenom_ph: 'Ton pr\u00e9nom...',
    ob_chemin_quote: 'Pas de classement. Juste toi et ta constance.',
    ob_notif_title: 'Reste connect\u00e9', ob_notif_sub: 'Niyyah peut t\u2019inviter \u00e0 recommencer chaque jour.',
    ob_notif_murmures: 'Murmures du jour', ob_notif_murmures_d: '4 rappels doux selon ton intention',
    ob_notif_rituels: 'Rituels', ob_notif_rituels_d: 'Wird du matin et du soir',
    ob_notif_encourage: 'Encouragements', ob_notif_encourage_d: 'Streak en danger, d\u00e9fis',
    ob_notif_activate: 'Activer', ob_notif_later: 'Plus tard', ob_notif_settings: 'Modifier dans R\u00e9glages',
    greet_morning: 'Bonjour', greet_afternoon: 'Bon apr\u00e8s-midi', greet_evening: 'Bonsoir',
    silence_label: 'jour de silence', silence_salam: '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645',
    silence_verse: 'Et vers ton Seigneur, dirige ton d\u00e9sir ardent.', silence_ref: 'Ash-Sharh, 8',
    silence_settings: 'Jour de silence',
    empty_bilan: 'Tes 7 derniers soirs appara\u00eetront ici', empty_bilan_btn: 'Faire mon bilan ce soir',
    empty_streak_new: 'Ta premi\u00e8re intention t\u2019attend',
    cal_annual: 'Carte annuelle', cal_hide: 'Masquer la carte',
    export_done: 'Backup export\u00e9 \u2713', import_done: 'Donn\u00e9es restaur\u00e9es \u2014 rechargement...',
    import_empty: 'Fichier vide', import_invalid: 'Fichier invalide',
    import_confirm: 'Restaurer {n} cl\u00e9s ? Les donn\u00e9es actuelles seront remplac\u00e9es.',
    wird_matin: 'WIRD DU MATIN', wird_soir: 'WIRD DU SOIR', wird_daily: 'WIRD QUOTIDIEN',
    wird_what: 'C\u2019est quoi le wird ?', wird_desc: 'Le wird est un ensemble d\u2019invocations quotidiennes tir\u00e9es du Coran et de la Sunnah, r\u00e9cit\u00e9es chaque matin apr\u00e8s Fajr et chaque soir apr\u00e8s Asr. Il prot\u00e8ge, purifie le c\u0153ur et rapproche d\u2019Allah.',
    prayer_fajr_sub: 'Pri\u00e8re de l\u2019aube', prayer_dhuhr_sub: 'Pri\u00e8re du milieu du jour', prayer_asr_sub: 'Pri\u00e8re de l\u2019apr\u00e8s-midi', prayer_maghrib_sub: 'Pri\u00e8re du coucher du soleil', prayer_isha_sub: 'Pri\u00e8re de la nuit',
    bilan_7j_title: 'Bilan des 7 derniers soirs',
    bilan_distrait: 'Distrait', bilan_effort: 'Efforts', bilan_sincere: 'Sinc\u00e8re',
    progression_label: 'PROGRESSION',
    today_pct: 'Aujourd\u2019hui : {n}% accompli',
    journal_niyyah_title: 'Ton journal commence ici',
    journal_niyyah_text: 'Chaque niyyah pos\u00e9e devient une trace de ta marche vers Allah.',
    journal_regarde_title: 'Tes Regards commencent ici',
    journal_regarde_text: 'Chaque instant saisi par le scanner devient un miroir de ta pr\u00e9sence.',
    journal_regarde_cta: 'OUVRIR LE SCANNER',
    settings_city: 'Changer ma ville', settings_export: 'Exporter', settings_import: 'Importer',
    settings_delete_all: 'R\u00e9initialisation compl\u00e8te',
    settings_delete_confirm1: 'Supprimer TOUTES les donn\u00e9es ? Cette action est irr\u00e9versible.',
    settings_delete_confirm2: 'Derni\u00e8re confirmation \u2014 tout sera perdu.',
    tawba_reviens: 'Reviens', tawba_attend: 'Allah Al-Tawwab t\u2019attend.',
    card_pratique: 'Pri\u00e8res & actes', card_wird: 'Invocations', card_parcours: 'Ma progression', card_tafakkur: 'Méditation',
    btn_start_day: 'Commencer ma journée', btn_back_checklist: '← Retour à la checklist', scanner_hint: 'Quel objet portera ta niyyah aujourd\'hui ?',
    conv_msg_0: 'Chaque grand voyage commence par un premier pas. Le niveau Approfondissement t\'attend.',
    conv_msg_1: 'Le Prophète ﷺ : l\'acte le plus aimé d\'Allah est celui fait avec constance. — Bukhari 6465',
    conv_msg_2: '7 jours de constance — Allah a vu chaque acte. Continue avec le niveau Approfondissement.',
    conv_msg_3: 'Al-Muwâdhib — celui qui persévère. C\'est toi. Le niveau supérieur t\'appartient.',
    conv_msg_4: 'Si vous êtes reconnaissants, J\'augmenterai Mes bienfaits. — Ibrahim 14:7',
    score_weighted: 'Score pondéré du jour', score_progress: 'En cours…', score_continue: 'Continue ↗',
    prayer_title: '🕌 Horaires du jour', city_enter: 'Entre ta ville pour voir les horaires de prière', city_placeholder: 'Ex: Paris, Casablanca, Bruxelles...',
    qibla_title: '🕋 Qibla — Direction de la Mecque', qibla_find_text: 'Trouve la direction de la Mecque depuis ta position', qibla_find_btn: '📍 Trouver la Qibla',
    section_prayers: 'Les 5 Pri\u00e8res', section_wird: 'Wird quotidien', section_sunnah: 'Sunnah de base',
    section_deep_prayer: 'Approfondissement de la pri\u00e8re', section_dhikr: 'Dhikr du c\u0153ur', section_duas: 'Dou\u00e2as intimes',
    section_study: '\u00c9tude islamique', section_quran: 'Immersion coranique', section_advanced: 'Pratiques avanc\u00e9es',
    section_summit: 'Sommet de l\u2019adoration', section_radiance: 'Rayonnement vers les autres', section_ummah: 'Conscience de l\u2019Oumma',
    bilan_fb_distraction_t: 'Allah est Pardonneur.', bilan_fb_distraction_m: 'La ghafla (distraction) est humaine. Demain est une nouvelle chance. Chaque lever du soleil est une porte ouverte.',
    bilan_fb_effort_t: 'Continue, inch\u2019Allah !', bilan_fb_effort_m: 'Chaque pas compte. Allah aime celui qui revient, encore et encore. La constance est plus aim\u00e9e d\u2019Allah que l\u2019intensit\u00e9.',
    bilan_fb_sincerite_t: 'Barakallahu fik.', bilan_fb_sincerite_m: 'Un c\u0153ur sinc\u00e8re aujourd\u2019hui est la plus belle sadaqa. Que Allah te maintienne dans cet \u00e9tat. Alhamdulillah.',
    lvl_eye_1: 'Niveau I \u2014 Reconnexion', lvl_eye_2: 'Niveau II \u2014 Discipline', lvl_eye_3: 'Niveau III \u2014 Excellence', lvl_eye_4: 'Niveau IV \u2014 Lumi\u00e8re',
    lvl_hadith_1: 'Allah est avec les patients.', lvl_hadith_2: 'Cherchez l\u2019aide dans la patience et la pri\u00e8re.', lvl_hadith_3: 'Allah aime que l\u2019action soit accomplie avec excellence.', lvl_hadith_4: 'Allah est la Lumi\u00e8re des cieux et de la terre.',
    lvl_sub_1: 'Tu as pos\u00e9 les <strong>premi\u00e8res pierres</strong> de ton chemin vers Allah.', lvl_sub_2: 'Ton c\u0153ur <strong>s\u2019ancre</strong> dans la pratique.', lvl_sub_3: 'L\u2019Ihsan \u2014 tu entres dans le <strong>cercle de la ma\u00eetrise</strong>.', lvl_sub_4: 'Tu rayonnes en <strong>lumi\u00e8re pour les autres</strong>. Que Allah accepte.',
    intent_allah: 'Pour Allah', intent_engage: 'Fid\u00e9lit\u00e9', intent_rebuild: 'Renaissance', intent_grateful: 'Gratitude',
    finjournee_title: 'Quelles 3 bont\u00e9s Allah t\u2019a-t-Il permis d\u2019accomplir aujourd\u2019hui ?',
    sp_rasikh: 'Al-R\u00e2sikh \u2014 L\u2019enracin\u00e9', sp_muhsin: 'Al-Muhsin \u2014 L\u2019excellent', sp_muttaqi: 'Al-Muttaq\u00ee \u2014 Le pieux',
    sp_muwadib: 'Al-Muw\u00e2dhib \u2014 Le constant', sp_mubtadi: 'Al-Mubtadi\u2019 \u2014 Le commen\u00e7ant', sp_talib: 'Al-T\u00e2lib \u2014 Le chercheur',
    weekly_muhasaba: 'Muhasaba \u00b7 Bilan de la semaine', finjournee_sub2: '\u00c9cris, ou ferme simplement les yeux.', finjournee_ph1: 'Une bont\u00e9...', finjournee_ph2: 'Une autre...', finjournee_ph3: 'Une troisi\u00e8me...', silent_muhasaba: 'Ce soir, muhasaba silencieuse.', sp_day_streak: 'Jour {d} \u00b7 S\u00e9rie de {s}',
    btn_open: 'OUVRIR ›', btn_complete: '✓ COMPLET', btn_skip_level: 'Continuer vers Niveau ',
    // Night companion
    night_title: 'Quelle pensée ferme ta journée ?', night_placeholder: 'Écris ta pensée du soir...', night_send: 'ENVOYER', night_sagesse: 'SAGESSE DE LA NUIT',
    // Notifications
    notif_unsupported: 'Les notifications ne sont pas supportées sur cet appareil', notif_enabled: '✦ Rappels activés — JazakAllahu khairan !', notif_later: 'Tu pourras les activer plus tard dans les paramètres', notif_disabled: '🔕 Rappels désactivés',
    // Sharing
    share_downloaded: 'Image téléchargée — partage-la 🌿', share_copied: 'Lien copié !',
    share_card: 'CARTE NIYYAH ✦', share_intention: 'Partager cette intention', share_btn: 'PARTAGER ✦', share_close: 'FERMER',
    // Premium
    premium_unlocked: '✅ Accès complet débloqué — Barakallahu feek !',
    // Camera
    camera_denied: 'Accès caméra refusé — autorise l\'accès dans les réglages',
    // Compass
    compass_denied: 'Autorise la boussole dans les réglages',
    disclaimer: 'Cette application n\'émet pas d\'avis religieux. Pour toute question de fiqh, consultez un savant qualifié.',
    settings_mentions: 'Mentions',
    mentions_text: 'Niyyah Daily est un outil de rappel et d\'organisation spirituelle. L\'application n\'émet aucun avis religieux (fatwa). Le contenu (savais-tu, traits de Nafs, suggestions) est indicatif. Pour toute question de fiqh, aqida, tafsir ou situation personnelle, consultez un savant qualifié (imam, cheikh, ustadh) avec ijaza reconnue.',
    nafs_disclaimer: 'Compilation inspirée des classiques de tazkiyat an-nafs (Al-Ghazali, Ibn al-Qayyim). N\'a pas valeur de traité savant.',
  },

  en: {
    lang_code: 'en',
    dir: 'ltr',
    app_name: 'Niyyah',
    slogan: 'My Niyyah · The Intention',
    orb_start: 'Set my Intention',
    orb_resume: 'View my Intention',
    greeting_morning:   'May this day be filled with light',
    greeting_afternoon: 'Stay in the remembrance of Allah',
    greeting_evening:   'Gratitude closes the day',
    greeting_day_0: 'May your silence be full',
    greeting_day_1: 'May this day be filled with light',
    greeting_day_2: 'May your heart stay open',
    greeting_day_3: 'May this day elevate you toward what matters',
    greeting_day_4: 'May your steps be righteous',
    greeting_day_5: 'May your Jumu\'a bring you peace',
    greeting_day_6: 'May your patience be returned to you',
    modal_title:    'Anchor your Niyyah',
    modal_sub:      'What is the intention for this day?',
    modal_divider:  'or your own intention',
    modal_confirm:  '✦ Anchor this Intention',
    modal_cancel:   'Back',
    modal_placeholder: 'Write your personal intention...',
    chip_meta: 'Today\'s intention',
    nav_sanctuaire: 'My Niyyah',
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
    intentions: [
      'For barakah in all that I do today',
      'For the well-being of my family',
      'To purify my heart and intentions',
      'To be of benefit to others — and please Allah',
    ],
    block_reveil: 'AT DAWN', block_fajr: 'AFTER FAJR', block_dhuhr: 'AFTER DHUHR', block_asr: 'AFTER ASR', block_maghrib: 'AFTER MAGHRIB', block_isha: 'AFTER ISHA', block_nuit: 'Night', block_qiyam: 'Qiyam al-Layl',
    bandeau_sub: 'Your acts right now', bandeau_nuit: 'Sleep with Witr', bandeau_qiyam: 'Time for Qiyam al-Layl',
    toggle_all: 'Full day', toggle_moment: 'Current moment',
    actes_done: 'act completed', actes_done_p: 'acts completed', actes_left: 'remaining', actes_left_p: 'remaining', bloc_done: '✦ Block completed', bloc_done_sub: 'Barak Allahu fik', btn_continue: 'Bismillah',
    jour_left: 'daily act remaining', jour_left_p: 'daily acts remaining',
    fajr_title: '30-Day Fajr Challenge', fajr_day: 'Day', fajr_sur: 'of', fajr_gardien: 'Guardian of Fajr ✦',
    defi_none: 'Choose a challenge ✦', defi_tap: 'Tap to start', defi_browse: 'Tap to browse 100 challenges →',
    defi_launched: 'Challenge started: ', defi_done: 'Masha\'Allah ✦ Challenge completed!', defi_checked: '✦ Day checked — Keep going!', defi_already: 'Already checked today ✓',
    defi_days_left: 'days left', defi_day_left: 'day left', defi_accomplished: '✦ Accomplished!',
    defi_locked: 'Keep it until Sunday, in sha Allah ✦', defi_no_active: 'No active challenge',
    defi_week_prefix: 'Weekly challenge · ', defi_week_choose: 'Weekly challenge · Choose ✦',
    defi_checked_today: '✓ Checked today', defi_check_today: 'Check today ✦',
    defi_enc_0: 'Start today — every day counts ✦', defi_enc_1: 'Good start — keep it up!', defi_enc_2: 'Halfway there — you\'re almost done!', defi_enc_3: 'Just a few days left — hold on!', defi_enc_4: 'Masha\'Allah — you\'re so close!', defi_enc_5: 'Masha\'Allah ✦ Challenge completed — Barakallahu fik!',
    ramadan_off: 'Ramadan mode disabled', ramadan_on: '🌙 Ramadan Mubarak! May this month be blessed.',
    ramadan_fast: '🌙 Fast recorded — Barakallahu feek!', ramadan_laylatul: '✨ Night ', ramadan_laylatul_end: ' — May Allah accept it!', ramadan_fallback: 'Barakallahu feek!',
    ramadan_disable_title: 'Disable Ramadan Mode', ramadan_enable_title: 'Enable Ramadan Mode',
    kahf_listen: 'Listen to Al-Kahf — Alafasy', kahf_play: 'Listen to Al-Kahf', kahf_playing: 'Playing — verse ', kahf_verse: 'Verse ', kahf_verse_end: '/110…', kahf_finished: 'Al-Kahf completed ✦',
    tasbih_99: '🌿 99 completed! Now say the shahada.', tasbih_done: '🌿 Mashallah! ', tasbih_done_end: ' times completed!',
    jumuah_done: '🕌 Jumuah completed — Barakallahu feek!', new_day: 'New day — Bismillah 🌿',
    meditation_done: 'Completed — Alhamdulillah 🌿', bilan_sincere: '✨ Sincere day — Barakallahu fik!', tafakkur_done: 'Barakallahu fik — Tafakkur completed ✦',
    notif_unavailable: 'Reminders not available on this device', notif_unsupported_device: 'Notifications not supported on this device',
    qibla_aligned: '✦ You are aligned with Mecca!', qibla_turn: '🔴 Turn towards the golden needle', qibla_calibrate: '⚠️ Calibrate your phone (make a figure 8 in the air)',
    geo_loading: '⏳ Locating...', geo_found: '✓ Located!', geo_locate: '📍 Locate me',
    nafs_observed_today: '✓ Observed today', nafs_observe_btn: 'I felt it today',
    journal_niyyah_empty: 'Your first intentions will appear here ✦', journal_regarde_empty: 'Your first Regards will appear here ✦',
    ikhlas_earned: 'You have earned this intention ✦', tawba_door: '✦ The door is always open', tawba_resume: 'Resume the path',
    note_saved: 'Saved ✦', scanner_analyzing: 'Analyzing…', journal_voice_soon: 'Soul Journal — Coming soon ✦',
    scanner_adopt: 'Adopt this Niyyah', scanner_retry_label: 'Rescan',
    journal_niyyah_title: '✦ My Niyyah', journal_regards_title: '✦ My Regards',
    link_see_regards: 'See my Regards →', link_see_niyyah: 'See my Niyyah →',
    journal_search: 'Search...', modal_close: 'Close', btn_later: 'Later',
    tawba_ameen: 'Ameen', defi_change: 'Change challenge', notif_accept: 'Yes, I want these reminders 🌿',
    level_word: 'Level', level_accomplished: 'Level accomplished', level_next: 'Next level \u2192', level_stay: 'Stay on this level',
    freemium_title: 'Niyyah+', freemium_sub: 'Unlimited scanner + future cloud features.',
    freemium_buy: 'Get Niyyah+ \u2014 \u20ac4.99', freemium_code_placeholder: 'ACCESS CODE', freemium_free: 'Continue for free',
    freemium_f1: 'Unlimited Niyyah Scanner (vs 1/week)', freemium_f2: 'Cloud sync (coming soon)',
    freemium_f3: 'Automatic multi-device backup', freemium_f4: 'Future exclusive features',
    freemium_f5: 'Support Niyyah development', freemium_f6: '',
    bilan_title: 'Evening review', bilan_question: 'How was your heart today?', bilan_subtitle: 'Allah looks at sincerity, not the score.',
    bilan_distraction: 'Distraction', bilan_effort: 'Effort', bilan_sincerite: 'Sincerity',
    bilan_distraction_sub: 'غفلة — heedless heart', bilan_effort_sub: 'مجاهدة — inner struggle', bilan_sincerite_sub: 'إخلاص — the sought-after state',
    tasbih_label: 'Tasbih', tasbih_hint: 'Tap anywhere',
    finjournee_label: 'When night comes',
    finjournee_sub: 'Evening Muhasaba',
    fri_kahf_toast: '\ud83d\udcd6 Al-Kahf recited — light until next Friday!', fri_salawat_toast: '🌟 Salawat sent upon the Prophet ﷺ', fri_doua_toast: '🤲 Dua of the blessed hour — may Allah accept it!',
    meta_subtitle: 'Practice & Elevation', aria_language: 'Language', aria_settings: 'Settings',
    aria_pratique: 'Practice', aria_wird: 'Wird', aria_parcours: 'Journey', aria_tafakkur: 'Tafakkur',
    nafs_weekly: 'one trait per week', aria_back_home: 'Back to My Niyyah',
    modal_anchor_title: 'Anchor your Niyyah', modal_intention_placeholder: 'Write your personal intention...',
    notif_stay_connected: 'Stay connected to Allah',
    btn_details: 'Details', btn_choose_surah: 'Choose a surah', btn_listen_recitation: 'Listen to recitation',
    btn_why: 'Why?', btn_see_phonetic: 'See phonetics', btn_share_label: 'Share', btn_fullscreen: 'Fullscreen mode',
    city_fallback: 'City', city_placeholder_prayer: 'City...', countdown_now: 'Now', btn_listen: 'Listen',
    quran_verse_label: 'Verse ',
    tawba_streak_prefix: 'Your path of ', tawba_streak_suffix: ' days still awaits you.',
    tawba_week_msg: 'New week, new niyyah. Bismillah.',
    freemium_code_invalid: 'Invalid code \u2014 try again', prayer_in: 'in', prayer_time_toast: 'It\u2019s time for ',
    nafs_note_placeholder: 'In what situation? (optional)', hold_hint: 'Hold...',
    regarde_note_placeholder: 'Personal note...', share_savaistu_title: 'Did you know? — Niyyah Daily',
    wird_back: '← Back', wird_reset: '↺ Reset',
    locked_title: 'Level',
    lvl_start: 'Start!', lvl_progress: 'In progress ✦', lvl_done: 'Accomplished ✦',
    friday_title: 'Yawm al-Jumuah — Blessed Friday', friday_sub: 'Friday prayer is obligatory today',
    grace_title: 'You missed yesterday', grace_sub: 'Complete Level 1 today to save your streak 🌿',
    toast_streak_saved: '🌿 Day recovered — your streak is saved!', toast_lvl1: 'مَا شَاءَ اللَّهُ — Level 1 completed! 🌿',
    toast_lvl_unlock: '🌿 Level {n} unlocked — Mashallah!',
    toast_niyyah: '✦ Niyyah set — Bismillah 🌿',
    prog_streak: 'Current streak', prog_days: 'CONSECUTIVE DAYS', prog_best: 'Best', prog_total: 'Total days',
    prog_heatmap: 'Last 30 days', prog_present: 'Present', prog_gold_day: 'Gold day', prog_absent: 'Absent',
    prog_msg_none: 'Bismillah — start your day ✦', prog_msg_bronze: 'Mashallah!', prog_msg_silver: 'SubhanAllah!', prog_msg_gold: 'Allahu Akbar!',
    prog_sub_none: 'Every small act brings you closer to Allah', prog_sub_bronze: 'Foundations are set', prog_sub_silver: 'Dhikr, prayer, consistency', prog_sub_gold: 'Perfect day accomplished',
    graine_title: 'Seed of Light', graine_sub: 'The seed awaits the light', graine_defis: 'challenges completed', graine_quote: 'Have you seen what you cultivate? — Al-Waqi\'a 63',
    scanner_posed: '✦ INTENTION SET', scanner_empty: 'Your intentions will appear here ✦',
    scanner_limit: 'Your daily scan was used — come back tomorrow insha\'Allah 🌙',
    scanner_limit_week: 'You have reached your scan limit this week — come back soon insha\'Allah 🌙',
    onboard_start: 'Start', onboard_next: 'Next', onboard_skip: 'Skip', onboard_later: 'Later', onboard_go: 'Let\'s go — Bismillah 🌿',
    onboard_title1: 'Your spiritual practice,<br>every day', onboard_sub1: 'Niyyah walks with you on your path to Allah — at your pace, without judgment.',
    onboard_title2: 'The Niyyah Scanner', onboard_sub2: 'Look at an everyday object — the Scanner will suggest a spiritual intention to sanctify it.',
    onboard_title3: '4 levels of practice', onboard_sub3: 'Progress at your pace — each level unlocks when you\'re ready.',
    onboard_title4: 'Your prayer times', onboard_sub4: 'Enter your city to display Fajr, Dhuhr, Asr, Maghrib and Isha times each day.',
    onboard_city_placeholder: 'e.g. London, New York, Dubai...',
    onboard_tagline: 'نِيَّة · Set your intention',
    onboard_scanner_example: 'Your glass of water, your pen, your mirror...<br>Every object can carry a niyyah.',
    onboard_lvl1_desc: '5 daily prayers · Dhikr · Recitation', onboard_lvl2_desc: 'Mosque · Istighfar · Tasbih',
    onboard_lvl3_desc: 'Hadiths · Quran · Arabic', onboard_lvl4_desc: 'Sadaqa · Salam · Douaas',
    onboard_city_manual: 'Or enter your city manually:',
    ob_splash_sub: 'Set your intention', ob_avant_acte: 'Before the act', ob_apres_acte: 'After the act',
    ob_deux_gestes: 'Two gestures for your daily life', ob_sacralise: 'Sanctify. Examine.',
    ob_motivation_title: 'What brings you here?', ob_motivation_sub: 'Choose what speaks to you \u2014 we\u2019ll adapt your experience.',
    ob_motiv_routine: 'Spiritual routine', ob_motiv_routine_sub: 'Build a daily practice',
    ob_motiv_reconnecter: 'Reconnect with Allah', ob_motiv_reconnecter_sub: 'Return after a time away',
    ob_motiv_sacraliser: 'Sanctify my daily life', ob_motiv_sacraliser_sub: 'Give spiritual meaning to every gesture',
    ob_chemin_title: 'Niyyah follows your steps', ob_chemin_sub: 'Here\u2019s what accompanies you every day.',
    ob_chemin_serie: 'Streak', ob_chemin_serie_d: 'Consecutive days',
    ob_chemin_nafs: 'Nafs', ob_chemin_nafs_d: '52 soul traits',
    ob_chemin_carte: 'Map', ob_chemin_carte_d: 'Annual calendar',
    ob_chemin_defi: 'Challenge', ob_chemin_defi_d: '1 per week',
    ob_chemin_bilan: 'Evening review', ob_chemin_bilan_d: 'Daily muhasaba',
    ob_chemin_tawba: 'Tawba', ob_chemin_tawba_d: 'Come back without judgment',
    ob_chemin_prenom: 'What should we call you?', ob_chemin_prenom_ph: 'Your name...',
    ob_chemin_quote: 'No ranking. Just you and your constancy.',
    ob_notif_title: 'Stay connected', ob_notif_sub: 'Niyyah can invite you to start again each day.',
    ob_notif_murmures: 'Daily whispers', ob_notif_murmures_d: '4 gentle reminders based on your intention',
    ob_notif_rituels: 'Rituals', ob_notif_rituels_d: 'Morning and evening Wird',
    ob_notif_encourage: 'Encouragements', ob_notif_encourage_d: 'Streak at risk, challenges',
    ob_notif_activate: 'Enable', ob_notif_later: 'Later', ob_notif_settings: 'Change in Settings',
    greet_morning: 'Good morning', greet_afternoon: 'Good afternoon', greet_evening: 'Good evening',
    silence_label: 'day of silence', silence_salam: '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645',
    silence_verse: 'And to your Lord direct your longing.', silence_ref: 'Ash-Sharh, 8',
    silence_settings: 'Day of silence',
    empty_bilan: 'Your last 7 evenings will appear here', empty_bilan_btn: 'Review my evening',
    empty_streak_new: 'Your first intention awaits',
    cal_annual: 'Annual map', cal_hide: 'Hide map',
    export_done: 'Backup exported \u2713', import_done: 'Data restored \u2014 reloading...',
    import_empty: 'Empty file', import_invalid: 'Invalid file',
    import_confirm: 'Restore {n} keys? Current data will be replaced.',
    wird_matin: 'MORNING WIRD', wird_soir: 'EVENING WIRD', wird_daily: 'DAILY WIRD',
    wird_what: 'What is the wird?', wird_desc: 'The wird is a set of daily invocations from the Quran and Sunnah, recited each morning after Fajr and each evening after Asr. It protects, purifies the heart and brings closer to Allah.',
    prayer_fajr_sub: 'Dawn prayer', prayer_dhuhr_sub: 'Midday prayer', prayer_asr_sub: 'Afternoon prayer', prayer_maghrib_sub: 'Sunset prayer', prayer_isha_sub: 'Night prayer',
    bilan_7j_title: 'Last 7 evenings',
    bilan_distrait: 'Distracted', bilan_effort: 'Effort', bilan_sincere: 'Sincere',
    progression_label: 'PROGRESSION',
    today_pct: 'Today: {n}% done',
    journal_niyyah_title: 'Your journal starts here',
    journal_niyyah_text: 'Each niyyah becomes a trace of your walk toward Allah.',
    journal_regarde_title: 'Your Regards start here',
    journal_regarde_text: 'Each moment captured by the scanner becomes a mirror of your presence.',
    journal_regarde_cta: 'OPEN SCANNER',
    settings_city: 'Change my city', settings_export: 'Export', settings_import: 'Import',
    settings_delete_all: 'Full reset',
    settings_delete_confirm1: 'Delete ALL data? This cannot be undone.',
    settings_delete_confirm2: 'Final confirmation \u2014 everything will be lost.',
    tawba_reviens: 'Come back', tawba_attend: 'Allah Al-Tawwab awaits you.',
    card_pratique: 'Prayers & acts', card_wird: 'Du\u2019as', card_parcours: 'My progress', card_tafakkur: 'Meditation',
    btn_start_day: 'Begin my day', btn_back_checklist: '← Back to checklist', scanner_hint: 'What object will carry your niyyah today?',
    conv_msg_0: 'Every great journey begins with a first step. The Deepening level awaits you.',
    conv_msg_1: 'Le Prophète ﷺ : l\'acte le plus aimé d\'Allah est celui fait avec constance. — Bukhari 6465',
    conv_msg_2: '7 days of constancy — Allah has seen every act. Continue with the Deepening level.',
    conv_msg_3: 'Al-Muwâdhib — the one who perseveres. That is you. The next level is yours.',
    conv_msg_4: 'Si vous êtes reconnaissants, J\'augmenterai Mes bienfaits. — Ibrahim 14:7',
    score_weighted: 'Today\'s weighted score', score_progress: 'In progress…', score_continue: 'Continue ↗',
    prayer_title: '🕌 Today\'s prayer times', city_enter: 'Enter your city to see prayer times', city_placeholder: 'Ex: London, Dubai, Istanbul...',
    qibla_title: '🕋 Qibla — Direction of Mecca', qibla_find_text: 'Find the direction of Mecca from your position', qibla_find_btn: '📍 Find the Qibla',
    section_prayers: 'The 5 Prayers', section_wird: 'Daily Wird', section_sunnah: 'Essential Sunnah',
    section_deep_prayer: 'Deepening the prayer', section_dhikr: 'Dhikr of the heart', section_duas: 'Intimate du\u2019as',
    section_study: 'Islamic study', section_quran: 'Quranic immersion', section_advanced: 'Advanced practices',
    section_summit: 'Summit of worship', section_radiance: 'Radiance toward others', section_ummah: 'Ummah awareness',
    bilan_fb_distraction_t: 'Allah is the Forgiving.', bilan_fb_distraction_m: 'Heedlessness is human. Tomorrow is a new chance. Every sunrise is an open door.',
    bilan_fb_effort_t: 'Keep going, insha\u2019Allah!', bilan_fb_effort_m: 'Every step counts. Allah loves those who return, again and again. Consistency is more beloved to Allah than intensity.',
    bilan_fb_sincerite_t: 'Barakallahu fik.', bilan_fb_sincerite_m: 'A sincere heart today is the finest sadaqa. May Allah keep you in this state. Alhamdulillah.',
    lvl_eye_1: 'Level I \u2014 Reconnection', lvl_eye_2: 'Level II \u2014 Discipline', lvl_eye_3: 'Level III \u2014 Excellence', lvl_eye_4: 'Level IV \u2014 Light',
    lvl_hadith_1: 'Allah is with the patient.', lvl_hadith_2: 'Seek help through patience and prayer.', lvl_hadith_3: 'Allah loves that when one of you does something, he does it with excellence.', lvl_hadith_4: 'Allah is the Light of the heavens and the earth.',
    lvl_sub_1: 'You have laid the <strong>first stones</strong> of your path toward Allah.', lvl_sub_2: 'Your heart is <strong>anchoring</strong> itself in practice.', lvl_sub_3: 'Ihsan \u2014 you enter the <strong>circle of mastery</strong>.', lvl_sub_4: 'You radiate as <strong>light for others</strong>. May Allah accept.',
    intent_allah: 'For Allah', intent_engage: 'Fidelity', intent_rebuild: 'Renewal', intent_grateful: 'Gratitude',
    finjournee_title: 'What 3 good deeds did Allah allow you to accomplish today?',
    sp_rasikh: 'Al-R\u0101sikh \u2014 The firmly rooted', sp_muhsin: 'Al-Muhsin \u2014 The excellent', sp_muttaqi: 'Al-Muttaq\u012b \u2014 The pious',
    sp_muwadib: 'Al-Muw\u0101dhib \u2014 The steadfast', sp_mubtadi: 'Al-Mubtadi\u2019 \u2014 The beginner', sp_talib: 'Al-T\u0101lib \u2014 The seeker',
    weekly_muhasaba: 'Muhasaba \u00b7 Weekly review', finjournee_sub2: 'Write, or simply close your eyes.', finjournee_ph1: 'A good deed...', finjournee_ph2: 'Another...', finjournee_ph3: 'A third...', silent_muhasaba: 'Tonight, silent muhasaba.', sp_day_streak: 'Day {d} \u00b7 Streak of {s}',
    btn_open: 'OPEN ›', btn_complete: '✓ COMPLETE', btn_skip_level: 'Continue to Level ',
    night_title: 'What thought closes your day?', night_placeholder: 'Write your evening thought...', night_send: 'SEND', night_sagesse: 'NIGHT WISDOM',
    notif_unsupported: 'Notifications are not supported on this device', notif_enabled: '✦ Reminders enabled — JazakAllahu khairan!', notif_later: 'You can enable them later in settings', notif_disabled: '🔕 Reminders disabled',
    share_downloaded: 'Image downloaded — share it 🌿', share_copied: 'Link copied!',
    share_card: 'NIYYAH CARD ✦', share_intention: 'Share this intention', share_btn: 'SHARE ✦', share_close: 'CLOSE',
    premium_unlocked: '✅ Full access unlocked — Barakallahu feek!',
    camera_denied: 'Camera access denied — allow in settings',
    compass_denied: 'Allow compass in settings',
    disclaimer: 'This app does not issue religious rulings. For any fiqh question, consult a qualified scholar.',
    settings_mentions: 'Legal Notice',
    mentions_text: 'Niyyah Daily is a spiritual reminder and organization tool. The app does not issue any religious rulings (fatwa). Content (did-you-know, Nafs traits, suggestions) is informational only. For any question on fiqh, aqida, tafsir, or personal matters, consult a qualified scholar (imam, shaykh, ustadh) with recognized ijaza.',
    nafs_disclaimer: 'Compilation inspired by classical works on tazkiyat an-nafs (Al-Ghazali, Ibn al-Qayyim). This is not a scholarly treatise.',
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
    greeting_day_0: '', greeting_day_1: '', greeting_day_2: '', greeting_day_3: '', greeting_day_4: '', greeting_day_5: '', greeting_day_6: '',
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
    intentions: [
      'لِلْبَرَكَةِ فِيمَا أَعْمَلُ الْيَوْمَ',
      'لِخَيْرِ عَائِلَتِي وَحِمَايَتِهَا',
      'لِتَطْهِيرِ قَلْبِي وَنِيَّاتِي',
      'لِأَكُونَ نَافِعًا لِلآخَرِينَ وَأُرْضِيَ اللَّهَ',
    ],
    block_reveil: 'عِنْدَ الِاسْتِيقَاظِ', block_fajr: 'بَعْدَ الْفَجْرِ', block_dhuhr: 'بَعْدَ الظُّهْرِ', block_asr: 'بَعْدَ الْعَصْرِ', block_maghrib: 'بَعْدَ الْمَغْرِبِ', block_isha: 'بَعْدَ الْعِشَاءِ', block_nuit: 'اللَّيْلُ', block_qiyam: 'قِيَامُ اللَّيْلِ',
    bandeau_sub: 'أَعْمَالُكَ الْآنَ', bandeau_nuit: 'نَمْ مَعَ الْوِتْرِ', bandeau_qiyam: 'وَقْتُ قِيَامِ اللَّيْلِ',
    toggle_all: 'الْيَوْمُ كَامِلًا', toggle_moment: 'اللَّحْظَةُ الْحَالِيَّةُ',
    actes_done: 'عَمَلٌ مُنْجَزٌ', actes_done_p: 'أَعْمَالٌ مُنْجَزَةٌ', actes_left: 'مُتَبَقٍّ', actes_left_p: 'مُتَبَقِّيَةٌ', bloc_done: '✦ أُنْجِزَ الْقِسْمُ', bloc_done_sub: 'بَارَكَ اللَّهُ فِيكَ', btn_continue: 'بسم الله',
    jour_left: 'عَمَلٌ يَوْمِيٌّ مُتَبَقٍّ', jour_left_p: 'أَعْمَالٌ يَوْمِيَّةٌ مُتَبَقِّيَةٌ',
    fajr_title: 'تَحَدِّي ٣٠ يَوْمًا لِلْفَجْرِ', fajr_day: 'الْيَوْمُ', fajr_sur: 'مِنْ', fajr_gardien: 'حَارِسُ الْفَجْرِ ✦',
    defi_none: 'اخْتَرْ تَحَدِّيًا ✦', defi_tap: 'اضْغَطْ لِلْبَدْءِ', defi_browse: 'اضْغَطْ لِتَصَفُّحِ ١٠٠ تَحَدٍّ →',
    defi_launched: 'بَدَأَ التَّحَدِّي: ', defi_done: 'مَا شَاءَ اللَّهُ ✦ أُنْجِزَ التَّحَدِّي!', defi_checked: '✦ يَوْمٌ مُسَجَّلٌ — وَاصِلْ!', defi_already: 'سُجِّلَ الْيَوْمَ بِالْفِعْلِ ✓',
    defi_days_left: 'أَيَّامٌ مُتَبَقِّيَةٌ', defi_day_left: 'يَوْمٌ مُتَبَقٍّ', defi_accomplished: '✦ أُنْجِزَ!',
    defi_locked: '', defi_no_active: '',
    defi_week_prefix: '', defi_week_choose: '',
    defi_checked_today: '', defi_check_today: '',
    defi_enc_0: '', defi_enc_1: '', defi_enc_2: '', defi_enc_3: '', defi_enc_4: '', defi_enc_5: '',
    ramadan_off: '', ramadan_on: '',
    ramadan_fast: '', ramadan_laylatul: '', ramadan_laylatul_end: '', ramadan_fallback: '',
    ramadan_disable_title: '', ramadan_enable_title: '',
    kahf_listen: '', kahf_play: '', kahf_playing: '', kahf_verse: '', kahf_verse_end: '', kahf_finished: '',
    tasbih_99: '', tasbih_done: '', tasbih_done_end: '',
    jumuah_done: '', new_day: '',
    meditation_done: '', bilan_sincere: '', tafakkur_done: '',
    notif_unavailable: '', notif_unsupported_device: '',
    qibla_aligned: '', qibla_turn: '', qibla_calibrate: '',
    geo_loading: '', geo_found: '', geo_locate: '',
    nafs_observed_today: '', nafs_observe_btn: '',
    journal_niyyah_empty: '', journal_regarde_empty: '',
    ikhlas_earned: '', tawba_door: '', tawba_resume: '',
    note_saved: '', scanner_analyzing: '', journal_voice_soon: '',
    scanner_adopt: '', scanner_retry_label: '',
    journal_niyyah_title: '', journal_regards_title: '',
    link_see_regards: '', link_see_niyyah: '',
    journal_search: '', modal_close: '', btn_later: '',
    tawba_ameen: '', defi_change: '', notif_accept: '',
    level_word: '\u0627\u0644\u0645\u064F\u0633\u0652\u062A\u064E\u0648\u064E\u0649', level_accomplished: '', level_next: '', level_stay: '',
    freemium_title: '', freemium_sub: '',
    freemium_buy: '', freemium_code_placeholder: '', freemium_free: '',
    freemium_f1: '', freemium_f2: '', freemium_f3: '', freemium_f4: '', freemium_f5: '', freemium_f6: '',
    bilan_title: '', bilan_question: '', bilan_subtitle: '', bilan_distraction: '', bilan_distraction_sub: '', bilan_effort: '', bilan_effort_sub: '', bilan_sincerite: '', bilan_sincerite_sub: '',
    tasbih_label: '', tasbih_hint: '',
    finjournee_label: '\u0639\u0650\u0646\u0652\u062F\u064E \u062D\u064F\u0644\u064F\u0648\u0644\u0650 \u0627\u0644\u0644\u0651\u064E\u064A\u0652\u0644',
    finjournee_sub: '\u0645\u064F\u062D\u0627\u0633\u064E\u0628\u064E\u0629\u064F \u0627\u0644\u0645\u064E\u0633\u0627\u0621',
    fri_kahf_toast: '', fri_salawat_toast: '', fri_doua_toast: '',
    meta_subtitle: '', aria_language: '', aria_settings: '',
    aria_pratique: '', aria_wird: '', aria_parcours: '', aria_tafakkur: '',
    nafs_weekly: '', aria_back_home: '', modal_anchor_title: '', modal_intention_placeholder: '',
    notif_stay_connected: '', btn_details: '', btn_choose_surah: '', btn_listen_recitation: '',
    btn_why: '', btn_see_phonetic: '', btn_share_label: '', btn_fullscreen: '',
    city_fallback: '', city_placeholder_prayer: '', countdown_now: '', btn_listen: '',
    quran_verse_label: '', tawba_streak_prefix: '', tawba_streak_suffix: '', tawba_week_msg: '',
    prayer_in: '\u0628\u064E\u0639\u0652\u062F', freemium_code_invalid: '', prayer_time_toast: '', nafs_note_placeholder: '', hold_hint: '',
    regarde_note_placeholder: '', share_savaistu_title: '',
    wird_back: '→ رُجُوعٌ', wird_reset: '↺ إِعَادَةُ التَّعْيِينِ',
    locked_title: 'الْمُسْتَوَى',
    lvl_start: 'ابْدَأْ!', lvl_progress: 'جَارٍ ✦', lvl_done: 'أُنْجِزَ ✦',
    friday_title: 'يَوْمُ الْجُمُعَةِ الْمُبَارَكِ', friday_sub: 'صَلَاةُ الْجُمُعَةِ وَاجِبَةٌ الْيَوْمَ',
    grace_title: 'فَاتَكَ الْأَمْسُ', grace_sub: 'أَكْمِلِ الْمُسْتَوَى ١ الْيَوْمَ لِإِنْقَاذِ سِلْسِلَتِكَ 🌿',
    toast_streak_saved: '🌿 تَمَّ الِاسْتِدْرَاكُ — سِلْسِلَتُكَ مَحْفُوظَةٌ!', toast_lvl1: 'مَا شَاءَ اللَّهُ — أُنْجِزَ الْمُسْتَوَى ١! 🌿',
    toast_lvl_unlock: '🌿 فُتِحَ الْمُسْتَوَى {n} — مَا شَاءَ اللَّهُ!',
    toast_niyyah: '✦ ثَبَتَتِ النِّيَّةُ — بِسْمِ اللَّهِ 🌿',
    prog_streak: 'السِّلْسِلَةُ الْحَالِيَّةُ', prog_days: 'أَيَّامٌ مُتَتَالِيَةٌ', prog_best: 'الْأَفْضَلُ', prog_total: 'إِجْمَالِي الْأَيَّامِ',
    prog_heatmap: 'آخِرُ ٣٠ يَوْمًا', prog_present: 'حَاضِرٌ', prog_gold_day: 'يَوْمٌ ذَهَبِيٌّ', prog_absent: 'غَائِبٌ',
    prog_msg_none: 'بِسْمِ اللَّهِ — ابْدَأْ يَوْمَكَ ✦', prog_msg_bronze: 'مَا شَاءَ اللَّهُ!', prog_msg_silver: 'سُبْحَانَ اللَّهِ!', prog_msg_gold: 'اللَّهُ أَكْبَرُ!',
    prog_sub_none: 'كُلُّ عَمَلٍ صَغِيرٍ يُقَرِّبُكَ مِنَ اللَّهِ', prog_sub_bronze: 'تَمَّ وَضْعُ الْأَسَاسِ', prog_sub_silver: 'ذِكْرٌ وَصَلَاةٌ وَمُدَاوَمَةٌ', prog_sub_gold: 'يَوْمٌ مِثَالِيٌّ',
    graine_title: 'بَذْرَةُ النُّورِ', graine_sub: 'الْبَذْرَةُ تَنْتَظِرُ النُّورَ', graine_defis: 'تَحَدِّيَاتٌ مُنْجَزَةٌ', graine_quote: 'أَفَرَأَيْتُمْ مَا تَحْرُثُونَ — الْوَاقِعَة ٦٣',
    scanner_posed: '✦ ثَبَتَتِ النِّيَّةُ', scanner_empty: 'سَتَظْهَرُ نِيَّاتُكَ هُنَا ✦',
    scanner_limit: 'اسْتُخْدِمَ مَسْحُكَ الْيَوْمِيُّ — عُدْ غَدًا إِنْ شَاءَ اللَّهُ 🌙',
    scanner_limit_week: 'لَقَدْ بَلَغْتَ حَدَّ الْمَسْحِ هَذَا الْأُسْبُوعَ — عُدْ قَرِيبًا إِنْ شَاءَ اللَّهُ 🌙',
    onboard_start: 'ابْدَأْ', onboard_next: 'التَّالِي', onboard_skip: 'تَخَطَّ', onboard_later: 'لَاحِقًا', onboard_go: 'بِسْمِ اللَّهِ — هَيَّا بِنَا 🌿',
    onboard_title1: 'عِبَادَتُكَ الرُّوحِيَّةُ<br>كُلَّ يَوْمٍ', onboard_sub1: 'نِيَّة تُرَافِقُكَ فِي طَرِيقِكَ إِلَى اللَّهِ — بِوَتِيرَتِكَ وَبِدُونِ حُكْمٍ.',
    onboard_title2: 'مَاسِحُ النِّيَّةِ', onboard_sub2: 'انْظُرْ إِلَى شَيْءٍ يَوْمِيٍّ — سَيَقْتَرِحُ الْمَاسِحُ نِيَّةً رُوحِيَّةً لِتَقْدِيسِهِ.',
    onboard_title3: '٤ مُسْتَوَيَاتٍ لِلْعِبَادَةِ', onboard_sub3: 'تَقَدَّمْ بِوَتِيرَتِكَ — كُلُّ مُسْتَوًى يُفْتَحُ عِنْدَمَا تَكُونُ جَاهِزًا.',
    onboard_title4: 'مَوَاقِيتُ صَلَاتِكَ', onboard_sub4: 'أَدْخِلْ مَدِينَتَكَ لِعَرْضِ مَوَاقِيتِ الْفَجْرِ وَالظُّهْرِ وَالْعَصْرِ وَالْمَغْرِبِ وَالْعِشَاءِ.',
    onboard_city_placeholder: 'مثال: الرياض، الدار البيضاء، باريس...',
    onboard_tagline: '', onboard_scanner_example: '',
    onboard_lvl1_desc: '', onboard_lvl2_desc: '', onboard_lvl3_desc: '', onboard_lvl4_desc: '',
    onboard_city_manual: '',
    ob_splash_sub: '\u0636\u064E\u0639\u0652 \u0646\u0650\u064A\u0651\u064E\u062A\u064E\u0643', ob_avant_acte: '\u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u0641\u0650\u0639\u0652\u0644', ob_apres_acte: '\u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0641\u0650\u0639\u0652\u0644',
    ob_deux_gestes: '\u0625\u0650\u064A\u0645\u0627\u0621\u062A\u0627\u0646\u0650 \u0644\u0650\u064A\u064E\u0648\u0652\u0645\u0650\u0643', ob_sacralise: '\u0642\u064E\u062F\u0651\u0650\u0633\u0652. \u062A\u064E\u0623\u064E\u0645\u0651\u064E\u0644\u0652.',
    ob_motivation_title: '\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u062C\u064E\u0627\u0621\u064E \u0628\u0650\u0643\u064E\u061F', ob_motivation_sub: '\u0627\u062E\u0652\u062A\u064E\u0631\u0652 \u0645\u0627 \u064A\u064F\u0646\u0627\u0633\u0650\u0628\u064F\u0643.',
    ob_motiv_routine: '\u0631\u064F\u0648\u062A\u0650\u064A\u0646\u064C \u0631\u064F\u0648\u062D\u064E\u0627\u0646\u0650\u064A\u0651', ob_motiv_routine_sub: '\u0628\u0650\u0646\u0627\u0621\u064F \u0639\u0650\u0628\u0627\u062F\u064E\u0629\u064D \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064E\u0629',
    ob_motiv_reconnecter: '\u0627\u0644\u0639\u064E\u0648\u0652\u062F\u064E\u0629\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647', ob_motiv_reconnecter_sub: '\u0628\u064E\u0639\u0652\u062F\u064E \u0641\u064E\u062A\u0652\u0631\u064E\u0629\u064D \u0645\u0650\u0646\u064E \u0627\u0644\u0628\u064F\u0639\u0652\u062F',
    ob_motiv_sacraliser: '\u062A\u064E\u0642\u0652\u062F\u0650\u064A\u0633\u064F \u064A\u064E\u0648\u0652\u0645\u0650\u064A', ob_motiv_sacraliser_sub: '\u0625\u0650\u0639\u0652\u0637\u0627\u0621\u064F \u0645\u064E\u0639\u0652\u0646\u064B\u0649 \u0631\u064F\u0648\u062D\u0627\u0646\u0650\u064A\u0651 \u0644\u0650\u0643\u064F\u0644\u0651\u0650 \u0641\u0650\u0639\u0652\u0644',
    ob_chemin_title: '\u0646\u0650\u064A\u0651\u064E\u0629 \u062A\u064F\u0631\u0627\u0641\u0650\u0642\u064F \u062E\u064F\u0637\u0627\u0643', ob_chemin_sub: '\u0647\u064E\u0630\u0627 \u0645\u0627 \u064A\u064F\u0631\u0627\u0641\u0650\u0642\u064F\u0643\u064E \u0643\u064F\u0644\u0651\u064E \u064A\u064E\u0648\u0652\u0645.',
    ob_chemin_serie: '\u0633\u0650\u0644\u0652\u0633\u0650\u0644\u064E\u0629', ob_chemin_serie_d: '\u0623\u064E\u064A\u0651\u0627\u0645\u064C \u0645\u064F\u062A\u064E\u062A\u0627\u0644\u0650\u064A\u064E\u0629',
    ob_chemin_nafs: '\u0646\u064E\u0641\u0652\u0633', ob_chemin_nafs_d: '\u0665\u0662 \u0635\u0650\u0641\u064E\u0629\u064B \u0644\u0650\u0644\u0646\u0651\u064E\u0641\u0652\u0633',
    ob_chemin_carte: '\u062E\u064E\u0631\u0650\u064A\u0637\u064E\u0629', ob_chemin_carte_d: '\u062A\u064E\u0642\u0652\u0648\u0650\u064A\u0645\u064C \u0633\u064E\u0646\u064E\u0648\u0650\u064A\u0651',
    ob_chemin_defi: '\u062A\u064E\u062D\u064E\u062F\u0651\u064D', ob_chemin_defi_d: '\u0648\u0627\u062D\u0650\u062F\u064C \u0643\u064F\u0644\u0651\u064E \u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639',
    ob_chemin_bilan: '\u0645\u064F\u0631\u0627\u062C\u064E\u0639\u064E\u0629\u064F \u0627\u0644\u0645\u064E\u0633\u0627\u0621', ob_chemin_bilan_d: '\u0645\u064F\u062D\u0627\u0633\u064E\u0628\u064E\u0629\u064C \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064E\u0629',
    ob_chemin_tawba: '\u062A\u064E\u0648\u0652\u0628\u064E\u0629', ob_chemin_tawba_d: '\u0639\u064F\u062F\u0652 \u0628\u0650\u0644\u0627 \u062D\u064F\u0643\u0652\u0645',
    ob_chemin_prenom: '\u0645\u0627 \u0627\u0633\u0652\u0645\u064F\u0643\u064E\u061F', ob_chemin_prenom_ph: '\u0627\u0633\u0652\u0645\u064F\u0643...',
    ob_chemin_quote: '\u0644\u0627 \u062A\u064E\u0631\u0652\u062A\u0650\u064A\u0628\u064E. \u0623\u064E\u0646\u0652\u062A\u064E \u0648\u064E\u062B\u064E\u0628\u0627\u062A\u064F\u0643\u064E \u0641\u064E\u0642\u064E\u0637.',
    ob_notif_title: '\u0627\u0628\u0652\u0642\u064E \u0645\u064F\u062A\u0651\u064E\u0635\u0650\u0644\u064B\u0627', ob_notif_sub: '\u0646\u0650\u064A\u0651\u064E\u0629 \u062A\u064F\u0630\u064E\u0643\u0651\u0650\u0631\u064F\u0643\u064E \u0643\u064F\u0644\u0651\u064E \u064A\u064E\u0648\u0652\u0645.',
    ob_notif_murmures: '\u0647\u064E\u0645\u064E\u0633\u0627\u062A\u064F \u0627\u0644\u064A\u064E\u0648\u0652\u0645', ob_notif_murmures_d: '\u0664 \u062A\u064E\u0630\u0652\u0643\u0650\u064A\u0631\u0627\u062A\u064D \u0644\u064E\u0637\u0650\u064A\u0641\u064E\u0629',
    ob_notif_rituels: '\u0639\u0650\u0628\u0627\u062F\u0627\u062A', ob_notif_rituels_d: '\u0648\u0650\u0631\u0652\u062F\u064F \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D\u0650 \u0648\u0627\u0644\u0645\u064E\u0633\u0627\u0621',
    ob_notif_encourage: '\u062A\u064E\u0634\u0652\u062C\u0650\u064A\u0639', ob_notif_encourage_d: '\u0633\u0650\u0644\u0652\u0633\u0650\u0644\u064E\u0629\u064C \u0641\u0650\u064A \u062E\u064E\u0637\u064E\u0631',
    ob_notif_activate: '\u062A\u064E\u0641\u0652\u0639\u0650\u064A\u0644', ob_notif_later: '\u0644\u0627\u062D\u0650\u0642\u064B\u0627', ob_notif_settings: '\u062A\u064E\u0639\u0652\u062F\u0650\u064A\u0644 \u0641\u0650\u064A \u0627\u0644\u0625\u0650\u0639\u0652\u062F\u0627\u062F\u0627\u062A',
    greet_morning: '\u0635\u064E\u0628\u0627\u062D\u064E \u0627\u0644\u062E\u064E\u064A\u0652\u0631', greet_afternoon: '\u0645\u064E\u0633\u0627\u0621\u064E \u0627\u0644\u0646\u0651\u064F\u0648\u0631', greet_evening: '\u0645\u064E\u0633\u0627\u0621\u064E \u0627\u0644\u062E\u064E\u064A\u0652\u0631',
    silence_label: '\u064A\u064E\u0648\u0652\u0645\u064F \u0627\u0644\u0635\u0651\u064E\u0645\u0652\u062A', silence_salam: '\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645',
    silence_verse: '\u0648\u064E\u0625\u0650\u0644\u064E\u0649\u0670 \u0631\u064E\u0628\u0651\u0650\u0643\u064E \u0641\u0671\u0631\u0652\u063A\u064E\u0628', silence_ref: '\u0627\u0644\u0634\u0651\u064E\u0631\u0652\u062D\u060C \u0668',
    silence_settings: '\u064A\u064E\u0648\u0652\u0645\u064F \u0627\u0644\u0635\u0651\u064E\u0645\u0652\u062A',
    empty_bilan: '\u0633\u064E\u062A\u064E\u0638\u0652\u0647\u064E\u0631\u064F \u0623\u064E\u0645\u0652\u0633\u0650\u064A\u0627\u062A\u064F\u0643\u064E \u0627\u0644\u0633\u0651\u064E\u0628\u0652\u0639\u064F \u0647\u064F\u0646\u0627', empty_bilan_btn: '\u0645\u064F\u0631\u0627\u062C\u064E\u0639\u064E\u0629\u064F \u0645\u064E\u0633\u0627\u0626\u0650\u064A',
    empty_streak_new: '\u0646\u0650\u064A\u0651\u064E\u062A\u064F\u0643\u064E \u0627\u0644\u0623\u064F\u0648\u0644\u064E\u0649 \u062A\u064E\u0646\u0652\u062A\u064E\u0638\u0650\u0631\u064F\u0643',
    cal_annual: '\u062E\u064E\u0631\u0650\u064A\u0637\u064E\u0629\u064C \u0633\u064E\u0646\u064E\u0648\u0650\u064A\u0651\u064E\u0629', cal_hide: '\u0625\u0650\u062E\u0652\u0641\u0627\u0621',
    export_done: '\u062A\u064E\u0645\u0651\u064E \u0627\u0644\u062A\u0651\u064E\u0635\u0652\u062F\u0650\u064A\u0631 \u2713', import_done: '\u062A\u064E\u0645\u0651\u064E \u0627\u0644\u0627\u0650\u0633\u0652\u062A\u0650\u0639\u0627\u062F\u064E\u0629...',
    import_empty: '\u0645\u064E\u0644\u064E\u0641\u0651\u064C \u0641\u0627\u0631\u0650\u063A', import_invalid: '\u0645\u064E\u0644\u064E\u0641\u0651\u064C \u063A\u064E\u064A\u0652\u0631\u064F \u0635\u0627\u0644\u0650\u062D',
    import_confirm: '\u0627\u0650\u0633\u0652\u062A\u0650\u0639\u0627\u062F\u064E\u0629 {n} \u0645\u0650\u0641\u0652\u062A\u0627\u062D\u061F',
    wird_matin: '\u0648\u0650\u0631\u0652\u062F\u064F \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D', wird_soir: '\u0648\u0650\u0631\u0652\u062F\u064F \u0627\u0644\u0645\u064E\u0633\u0627\u0621', wird_daily: '\u0623\u064E\u0648\u0652\u0631\u0627\u062F\u064C \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064E\u0629',
    wird_what: '\u0645\u0627 \u0647\u064F\u0648\u064E \u0627\u0644\u0648\u0650\u0631\u0652\u062F\u064F\u061F', wird_desc: '\u0627\u0644\u0648\u0650\u0631\u0652\u062F\u064F \u0645\u064E\u062C\u0652\u0645\u064F\u0648\u0639\u064E\u0629\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u0623\u064E\u0630\u0652\u0643\u0627\u0631\u0650 \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064E\u0629\u0650 \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646\u0650 \u0648\u0627\u0644\u0633\u0651\u064F\u0646\u0651\u064E\u0629\u060C \u062A\u064F\u0642\u0652\u0631\u064E\u0623\u064F \u0643\u064F\u0644\u0651\u064E \u0635\u064E\u0628\u0627\u062D\u064D \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631\u0650 \u0648\u0643\u064F\u0644\u0651\u064E \u0645\u064E\u0633\u0627\u0621\u064D \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0639\u064E\u0635\u0652\u0631\u0650. \u064A\u064E\u062D\u0652\u0641\u064E\u0638\u064F \u0648\u064E\u064A\u064F\u0637\u064E\u0647\u0651\u0650\u0631\u064F \u0627\u0644\u0642\u064E\u0644\u0652\u0628\u064E \u0648\u064E\u064A\u064F\u0642\u064E\u0631\u0651\u0650\u0628\u064F \u0645\u0650\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647.',
    prayer_fajr_sub: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0641\u064E\u062C\u0652\u0631', prayer_dhuhr_sub: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0638\u0651\u064F\u0647\u0652\u0631', prayer_asr_sub: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0639\u064E\u0635\u0652\u0631', prayer_maghrib_sub: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0645\u064E\u063A\u0652\u0631\u0650\u0628', prayer_isha_sub: '\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0639\u0650\u0634\u0627\u0621',
    bilan_7j_title: '\u0622\u062E\u0650\u0631\u064F \u0667 \u0645\u064E\u0633\u0627\u0621\u0627\u062A',
    bilan_distrait: '\u063A\u064E\u0641\u0652\u0644\u064E\u0629', bilan_effort: '\u0645\u064F\u062C\u0627\u0647\u064E\u062F\u064E\u0629', bilan_sincere: '\u0625\u0650\u062E\u0652\u0644\u0627\u0635',
    progression_label: '\u0627\u0644\u062A\u0651\u064E\u0642\u064E\u062F\u0651\u064F\u0645',
    today_pct: '\u0627\u0644\u064A\u064E\u0648\u0652\u0645: {n}%',
    journal_niyyah_title: '\u064A\u064E\u0628\u0652\u062F\u064E\u0623\u064F \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064E\u0627\u062A\u064F\u0643 \u0647\u064F\u0646\u0627',
    journal_niyyah_text: '\u0643\u064F\u0644\u0651\u064F \u0646\u0650\u064A\u0651\u064E\u0629\u064D \u0623\u064E\u062B\u064E\u0631\u064C \u0641\u0650\u064A \u0645\u064E\u0633\u0650\u064A\u0631\u064E\u062A\u0650\u0643 \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647.',
    journal_regarde_title: '\u062A\u064E\u0628\u0652\u062F\u064E\u0623\u064F \u0646\u064E\u0638\u064E\u0631\u0627\u062A\u064F\u0643 \u0647\u064F\u0646\u0627',
    journal_regarde_text: '\u0643\u064F\u0644\u0651\u064F \u0644\u064E\u062D\u0652\u0638\u064E\u0629\u064D \u0645\u0650\u0631\u0652\u0622\u0629\u064C \u0644\u0650\u062D\u064F\u0636\u064F\u0648\u0631\u0650\u0643.',
    journal_regarde_cta: '\u0627\u0641\u0652\u062A\u064E\u062D\u0650 \u0627\u0644\u0645\u0627\u0633\u0650\u062D',
    settings_city: '\u062A\u063A\u064A\u064A\u0631 \u0645\u062F\u064A\u0646\u062A\u064A', settings_export: '\u062A\u064E\u0635\u0652\u062F\u0650\u064A\u0631', settings_import: '\u0627\u0650\u0633\u0652\u062A\u0650\u064A\u0631\u0627\u062F',
    settings_delete_all: '\u0625\u0650\u0639\u0627\u062F\u064E\u0629\u064F \u0636\u064E\u0628\u0652\u0637 \u0643\u0627\u0645\u0650\u0644\u064E\u0629',
    settings_delete_confirm1: '\u062D\u064E\u0630\u0652\u0641\u064F \u062C\u064E\u0645\u0650\u064A\u0639\u0650 \u0627\u0644\u0628\u064E\u064A\u0627\u0646\u0627\u062A\u061F',
    settings_delete_confirm2: '\u062A\u064E\u0623\u0652\u0643\u0650\u064A\u062F\u064C \u0623\u064E\u062E\u0650\u064A\u0631.',
    tawba_reviens: '\u0639\u064F\u062F\u0652', tawba_attend: '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0627\u0644\u062A\u0651\u064E\u0648\u0651\u064E\u0627\u0628\u064F \u064A\u064E\u0646\u0652\u062A\u064E\u0638\u0650\u0631\u064F\u0643.',
    card_pratique: '\u0627\u0644\u0635\u0651\u064E\u0644\u064E\u0648\u0627\u062A \u0648\u0627\u0644\u0623\u064E\u0639\u0652\u0645\u0627\u0644', card_wird: '\u0627\u0644\u0623\u064E\u062F\u0652\u0639\u0650\u064A\u064E\u0629', card_parcours: '\u062A\u064E\u0642\u064E\u062F\u0651\u064F\u0645\u0650\u064A', card_tafakkur: '\u062A\u064E\u0641\u064E\u0643\u0651\u064F\u0631',
    btn_start_day: '\u0627\u0628\u0652\u062F\u064E\u0623\u0652 \u064A\u064E\u0648\u0652\u0645\u0650\u064A', btn_back_checklist: '', scanner_hint: '',
    conv_msg_0: '', conv_msg_1: '', conv_msg_2: '', conv_msg_3: '', conv_msg_4: '',
    score_weighted: '', score_progress: '', score_continue: '',
    prayer_title: '', city_enter: '', city_placeholder: '',
    qibla_title: '', qibla_find_text: '', qibla_find_btn: '',
    section_prayers: '\u0627\u0644\u0635\u0651\u064E\u0644\u064E\u0648\u0627\u062A\u064F \u0627\u0644\u062E\u064E\u0645\u0652\u0633', section_wird: '\u0627\u0644\u0648\u0650\u0631\u0652\u062F\u064F \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651', section_sunnah: '\u0627\u0644\u0633\u0651\u064F\u0646\u064E\u0646\u064F \u0627\u0644\u0623\u064E\u0633\u0627\u0633\u0650\u064A\u0651\u064E\u0629',
    section_deep_prayer: '\u062A\u064E\u0639\u0652\u0645\u0650\u064A\u0642\u064F \u0627\u0644\u0635\u0651\u064E\u0644\u0627\u0629', section_dhikr: '\u0630\u0650\u0643\u0652\u0631\u064F \u0627\u0644\u0642\u064E\u0644\u0652\u0628', section_duas: '\u062F\u064F\u0639\u0627\u0621\u064C \u062E\u0627\u0635\u0651',
    section_study: '\u0627\u0644\u062F\u0651\u0650\u0631\u0627\u0633\u064E\u0629\u064F \u0627\u0644\u0625\u0650\u0633\u0652\u0644\u0627\u0645\u0650\u064A\u0651\u064E\u0629', section_quran: '\u0627\u0644\u063A\u064E\u0648\u0652\u0635\u064F \u0641\u0650\u064A \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646', section_advanced: '\u0639\u0650\u0628\u0627\u062F\u0627\u062A\u064C \u0645\u064F\u062A\u064E\u0642\u064E\u062F\u0651\u0650\u0645\u064E\u0629',
    section_summit: '\u0642\u0650\u0645\u0651\u064E\u0629\u064F \u0627\u0644\u0639\u0650\u0628\u0627\u062F\u064E\u0629', section_radiance: '\u0627\u0644\u0625\u0650\u0634\u0652\u0639\u0627\u0639\u064F \u0646\u064E\u062D\u0652\u0648\u064E \u0627\u0644\u0622\u062E\u064E\u0631\u0650\u064A\u0646', section_ummah: '\u0627\u0644\u0648\u064E\u0639\u0652\u064A\u064F \u0628\u0650\u0627\u0644\u0623\u064F\u0645\u0651\u064E\u0629',
    bilan_fb_distraction_t: '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u063A\u064E\u0641\u064F\u0648\u0631\u064C.', bilan_fb_distraction_m: '\u0627\u0644\u063A\u064E\u0641\u0652\u0644\u064E\u0629\u064F \u0628\u064E\u0634\u064E\u0631\u0650\u064A\u0651\u064E\u0629. \u063A\u064E\u062F\u064B\u0627 \u0641\u064F\u0631\u0652\u0635\u064E\u0629\u064C \u062C\u064E\u062F\u0650\u064A\u062F\u064E\u0629.',
    bilan_fb_effort_t: '\u0648\u0627\u0635\u0650\u0644\u0652 \u0625\u0650\u0646\u0652 \u0634\u0627\u0621\u064E \u0627\u0644\u0644\u0651\u064E\u0647!', bilan_fb_effort_m: '\u0643\u064F\u0644\u0651\u064F \u062E\u064F\u0637\u0652\u0648\u064E\u0629\u064D \u0645\u064E\u062D\u0652\u0633\u064F\u0648\u0628\u064E\u0629. \u0627\u0644\u0645\u064F\u062F\u0627\u0648\u064E\u0645\u064E\u0629\u064F \u0623\u064E\u062D\u064E\u0628\u0651\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647.',
    bilan_fb_sincerite_t: '\u0628\u0627\u0631\u064E\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0641\u0650\u064A\u0643.', bilan_fb_sincerite_m: '\u0642\u064E\u0644\u0652\u0628\u064C \u0635\u0627\u062F\u0650\u0642\u064C \u0627\u0644\u064A\u064E\u0648\u0652\u0645 \u0623\u064E\u062C\u0652\u0645\u064E\u0644\u064F \u0635\u064E\u062F\u064E\u0642\u064E\u0629. \u0627\u0644\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647.',
    lvl_eye_1: '\u0627\u0644\u0645\u064F\u0633\u0652\u062A\u064E\u0648\u064E\u0649 \u0661 \u2014 \u0627\u0644\u0639\u064E\u0648\u0652\u062F\u064E\u0629', lvl_eye_2: '\u0627\u0644\u0645\u064F\u0633\u0652\u062A\u064E\u0648\u064E\u0649 \u0662 \u2014 \u0627\u0644\u0627\u0646\u0652\u0636\u0650\u0628\u0627\u0637', lvl_eye_3: '\u0627\u0644\u0645\u064F\u0633\u0652\u062A\u064E\u0648\u064E\u0649 \u0663 \u2014 \u0627\u0644\u0625\u0650\u062A\u0652\u0642\u0627\u0646', lvl_eye_4: '\u0627\u0644\u0645\u064F\u0633\u0652\u062A\u064E\u0648\u064E\u0649 \u0664 \u2014 \u0627\u0644\u0646\u0651\u064F\u0648\u0631',
    lvl_hadith_1: '\u0625\u0650\u0646\u0651\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0645\u064E\u0639\u064E \u0627\u0644\u0635\u0651\u064E\u0627\u0628\u0650\u0631\u0650\u064A\u0646.', lvl_hadith_2: '\u0627\u0633\u0652\u062A\u064E\u0639\u0650\u064A\u0646\u064F\u0648\u0627 \u0628\u0650\u0627\u0644\u0635\u0651\u064E\u0628\u0652\u0631\u0650 \u0648\u0627\u0644\u0635\u0651\u064E\u0644\u0627\u0629.', lvl_hadith_3: '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0625\u0650\u0630\u0627 \u0639\u064E\u0645\u0650\u0644\u064E \u0623\u064E\u062D\u064E\u062F\u064F\u0643\u064F\u0645 \u0639\u064E\u0645\u064E\u0644\u064B\u0627 \u0623\u064E\u0646\u0652 \u064A\u064F\u062A\u0652\u0642\u0650\u0646\u064E\u0647.', lvl_hadith_4: '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0646\u064F\u0648\u0631\u064F \u0627\u0644\u0633\u0651\u064E\u0645\u0627\u0648\u0627\u062A\u0650 \u0648\u0627\u0644\u0623\u064E\u0631\u0652\u0636.',
    lvl_sub_1: '\u0648\u064E\u0636\u064E\u0639\u0652\u062A\u064E <strong>\u0627\u0644\u0623\u064F\u0633\u064F\u0633\u064E \u0627\u0644\u0623\u064F\u0648\u0644\u064E\u0649</strong> \u0641\u0650\u064A \u0637\u064E\u0631\u0650\u064A\u0642\u0650\u0643.', lvl_sub_2: '\u0642\u064E\u0644\u0652\u0628\u064F\u0643 <strong>\u064A\u064E\u062A\u064E\u0631\u064E\u0633\u0651\u064E\u062E</strong> \u0641\u0650\u064A \u0627\u0644\u0639\u0650\u0628\u0627\u062F\u064E\u0629.', lvl_sub_3: '\u0627\u0644\u0625\u0650\u062D\u0652\u0633\u0627\u0646 \u2014 \u062F\u064E\u062E\u064E\u0644\u0652\u062A\u064E <strong>\u062F\u0627\u0626\u0650\u0631\u064E\u0629\u064E \u0627\u0644\u0625\u0650\u062A\u0652\u0642\u0627\u0646</strong>.', lvl_sub_4: '\u062A\u064F\u0634\u0650\u0639\u0651\u064F <strong>\u0646\u064F\u0648\u0631\u064B\u0627 \u0644\u0650\u0644\u0622\u062E\u064E\u0631\u0650\u064A\u0646</strong>. \u062A\u064E\u0642\u064E\u0628\u0651\u064E\u0644\u064E \u0627\u0644\u0644\u0651\u064E\u0647.',
    intent_allah: '\u0644\u0650\u0644\u0651\u064E\u0647', intent_engage: '\u0648\u064E\u0641\u0627\u0621', intent_rebuild: '\u062A\u064E\u062C\u0652\u062F\u0650\u064A\u062F', intent_grateful: '\u0634\u064F\u0643\u0652\u0631',
    finjournee_title: '\u0645\u0627 \u0627\u0644\u062E\u064E\u064A\u0652\u0631\u0627\u062A\u064F \u0627\u0644\u062B\u0651\u064E\u0644\u0627\u062B \u0627\u0644\u0651\u064E\u062A\u0650\u064A \u0623\u064E\u0639\u0627\u0646\u064E\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0639\u064E\u0644\u064E\u064A\u0652\u0647\u0627 \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u061F',
    sp_rasikh: '\u0627\u0644\u0631\u0651\u064E\u0627\u0633\u0650\u062E \u2014 \u0627\u0644\u0645\u064F\u062A\u064E\u062C\u064E\u0630\u0651\u0650\u0631', sp_muhsin: '\u0627\u0644\u0645\u064F\u062D\u0652\u0633\u0650\u0646 \u2014 \u0627\u0644\u0645\u064F\u062A\u0652\u0642\u0650\u0646', sp_muttaqi: '\u0627\u0644\u0645\u064F\u062A\u0651\u064E\u0642\u0650\u064A \u2014 \u0627\u0644\u062A\u0651\u064E\u0642\u0650\u064A\u0651',
    sp_muwadib: '\u0627\u0644\u0645\u064F\u0648\u0627\u0638\u0650\u0628 \u2014 \u0627\u0644\u062B\u0651\u0627\u0628\u0650\u062A', sp_mubtadi: '\u0627\u0644\u0645\u064F\u0628\u0652\u062A\u064E\u062F\u0650\u0626 \u2014 \u0627\u0644\u0628\u0627\u062F\u0650\u0626', sp_talib: '\u0627\u0644\u0637\u0651\u064E\u0627\u0644\u0650\u0628 \u2014 \u0627\u0644\u0628\u0627\u062D\u0650\u062B',
    sp_day_streak: '\u0627\u0644\u064A\u064E\u0648\u0652\u0645 {d} \u00b7 \u0633\u0650\u0644\u0652\u0633\u0650\u0644\u064E\u0629 {s}',
    finjournee_sub2: '\u0627\u0643\u0652\u062A\u064F\u0628\u0652\u060C \u0623\u064E\u0648\u0652 \u0623\u064E\u063A\u0652\u0644\u0650\u0642\u0652 \u0639\u064E\u064A\u0652\u0646\u064E\u064A\u0652\u0643\u064E \u0628\u0650\u0628\u064E\u0633\u0627\u0637\u064E\u0629.', finjournee_ph1: '\u062E\u064E\u064A\u0652\u0631...', finjournee_ph2: '\u0622\u062E\u064E\u0631...', finjournee_ph3: '\u062B\u0627\u0644\u0650\u062B...',
    btn_open: '', btn_complete: '', btn_skip_level: '',
    night_title: 'مَا الْفِكْرَةُ الَّتِي تَخْتِمُ بِهَا يَوْمَكَ؟', night_placeholder: 'اكْتُبْ فِكْرَتَكَ الْمَسَائِيَّةَ...', night_send: 'إِرْسَالٌ', night_sagesse: 'حِكْمَةُ اللَّيْلِ',
    notif_unsupported: 'الْإِشْعَارَاتُ غَيْرُ مَدْعُومَةٍ عَلَى هَذَا الْجِهَازِ', notif_enabled: '✦ تَمَّ تَفْعِيلُ التَّذْكِيرَاتِ — جَزَاكَ اللَّهُ خَيْرًا!', notif_later: 'يُمْكِنُكَ تَفْعِيلُهَا لَاحِقًا فِي الْإِعْدَادَاتِ', notif_disabled: '🔕 تَمَّ تَعْطِيلُ التَّذْكِيرَاتِ',
    share_downloaded: 'تَمَّ التَّحْمِيلُ — شَارِكْهَا 🌿', share_copied: 'تَمَّ النَّسْخُ!',
    share_card: 'بِطَاقَةُ نِيَّة ✦', share_intention: 'مُشَارَكَةُ هَذِهِ النِّيَّةِ', share_btn: 'مُشَارَكَةٌ ✦', share_close: 'إِغْلَاقٌ',
    premium_unlocked: '✅ تَمَّ فَتْحُ الْوُصُولِ الْكَامِلِ — بَارَكَ اللَّهُ فِيكَ!',
    camera_denied: 'تَمَّ رَفْضُ الْوُصُولِ لِلْكَامِيرَا — فَعِّلْهُ فِي الْإِعْدَادَاتِ',
    compass_denied: 'فَعِّلِ الْبُوصْلَةَ فِي الْإِعْدَادَاتِ',
    disclaimer: 'هَذَا التَّطْبِيقُ لَا يُصْدِرُ فَتَاوَى شَرْعِيَّةً. لِأَيِّ سُؤَالٍ فِقْهِيٍّ، اسْتَشِرْ عَالِمًا مُؤَهَّلًا.',
    settings_mentions: 'إِشْعَارٌ قَانُونِيٌّ',
    mentions_text: 'نِيَّة دَيْلِي أَدَاةُ تَذْكِيرٍ وَتَنْظِيمٍ رُوحِيٍّ. لَا يُصْدِرُ التَّطْبِيقُ أَيَّ فَتْوَى شَرْعِيَّةٍ. الْمُحْتَوَى (هَلْ تَعْلَمُ، سِمَاتُ النَّفْسِ، الِاقْتِرَاحَاتُ) إِرْشَادِيٌّ فَقَطْ. لِأَيِّ سُؤَالٍ فِي الْفِقْهِ أَوِ الْعَقِيدَةِ أَوِ التَّفْسِيرِ أَوِ الْأُمُورِ الشَّخْصِيَّةِ، اسْتَشِرْ عَالِمًا مُؤَهَّلًا (إِمَامٌ، شَيْخٌ، أُسْتَاذٌ) ذَا إِجَازَةٍ مُعْتَرَفٍ بِهَا.',
    nafs_disclaimer: 'تَجْمِيعٌ مُسْتَوْحًى مِنْ كُتُبِ تَزْكِيَةِ النَّفْسِ الْكِلَاسِيكِيَّةِ (الْغَزَالِيُّ، ابْنُ الْقَيِّمِ). لَيْسَ بِمَثَابَةِ رِسَالَةٍ عِلْمِيَّةٍ.',
  },
};

// Active language (detected from browser or saved)
function v2DetectLang() {
  // URL override: ?lang=en|fr|ar
  try {
    var urlLang = new URLSearchParams(window.location.search).get('lang');
    if (urlLang && V2_I18N[urlLang]) {
      var s = JSON.parse(localStorage.getItem('niyyah_v2_bridge') || '{}'); s.lang = urlLang; safeSetItem('niyyah_v2_bridge', JSON.stringify(s));
      history.replaceState(null, '', window.location.pathname);
      return urlLang;
    }
  } catch(e) {}
  const saved = (JSON.parse(localStorage.getItem('niyyah_v2_bridge') || '{}')).lang;
  if (saved && V2_I18N[saved]) return saved;
  // Détection auto au premier lancement
  var bl = (navigator.language || 'en').toLowerCase();
  var detected = 'en';
  if (bl.startsWith('fr')) detected = 'fr';
  else if (bl.startsWith('ar')) detected = 'ar';
  // Sauvegarder pour ne pas re-détecter
  try { var s = JSON.parse(localStorage.getItem('niyyah_v2_bridge') || '{}'); s.lang = detected; safeSetItem('niyyah_v2_bridge', JSON.stringify(s)); } catch(e) {}
  return detected;
}

let V2_LANG = v2DetectLang();
function t(key) { try { return (V2_I18N[V2_LANG] || V2_I18N.fr)[key] || key; } catch(e) { return key || ''; } }

/* ══ INFUSION D'INTENTION ══ */
const intentionThemes = {
  "se rapprocher d'Allah":    { color: '#D4AF37', rgb: '212,175,55',  label: t('intent_allah') },
  "tenir mes engagements":    { color: '#A67C00', rgb: '166,124,0',   label: t('intent_engage') },
  "me reconstruire":          { color: '#7A9482', rgb: '122,148,130', label: t('intent_rebuild') },
  "\u00eatre reconnaissant":       { color: '#E9C46A', rgb: '233,196,106', label: t('intent_grateful') },
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
    langPill.style.fontFamily = lang === 'ar' ? "'Amiri', serif" : "'Cormorant Garamond', serif";
    langPill.style.fontSize = lang === 'ar' ? '13px' : '10px';
  }
  v2ApplyI18n();
  v2RefreshStats();
  v2UpdateOrbState();
  if (typeof renderTabs === 'function') renderTabs();
  if (typeof renderLevel === 'function' && typeof currentLevel !== 'undefined') renderLevel(currentLevel);
  if (typeof renderProgression === 'function') { var _progEl = document.getElementById('progContent'); if (_progEl && _progEl.innerHTML) renderProgression(); }
  // Close settings if open
  const sheet = document.getElementById('v2-settings-sheet');
  if (sheet) sheet.remove();
  // Toast confirmation
  var langNames = { fr: 'Fran\u00e7ais', en: 'English', ar: '\u0627\u0644\u0639\u0631\u0628\u064A\u0629' };
  v2ShowToast('\ud83c\udf10 ' + (langNames[lang] || lang));
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

  // Greeting — phrase du jour + fade-in
  const grEl = document.getElementById('v2-greeting-text');
  if (grEl) {
    grEl.textContent = t('greeting_day_' + new Date().getDay());
    grEl.style.direction = T.dir;
    grEl.style.fontFamily = isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif";
    grEl.style.animation = 'none';
    grEl.offsetHeight;
    grEl.style.animation = 'greetingFadeIn 1.5s ease-out 0.3s both';
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
  v2ApplyI18nHTML();
}

function v2ApplyI18nHTML() {
  var _s = function(id, key) { var el = document.getElementById(id); if (el && t(key)) el.textContent = t(key); };
  var _p = function(id, key) { var el = document.getElementById(id); if (el && t(key)) el.placeholder = t(key); };
  var _t = function(id, key) { var el = document.getElementById(id); if (el && t(key)) el.title = t(key); };
  _s('i18n-tawba-resume', 'tawba_resume');
  _s('scanner-btn-confirm', 'scanner_adopt');
  _t('i18n-scanner-retry', 'scanner_retry_label');
  _s('i18n-journal-niyyah-title', 'journal_niyyah_title');
  _s('i18n-journal-regards-title', 'journal_regards_title');
  _s('i18n-link-see-regards', 'link_see_regards');
  _s('i18n-link-see-niyyah', 'link_see_niyyah');
  _s('i18n-finjournee-title', 'finjournee_title');
  _s('i18n-finjournee-sub2', 'finjournee_sub2');
  _p('finjournee-b1', 'finjournee_ph1');
  _p('finjournee-b2', 'finjournee_ph2');
  _p('finjournee-b3', 'finjournee_ph3');
  _p('niyyah-journal-search', 'journal_search');
  _p('night-thought-input', 'night_placeholder');
  _s('i18n-info-close', 'modal_close');
  _s('i18n-defi-close', 'modal_close');
  _s('changerDefiBtn', 'defi_change');
  _s('i18n-notif-yes', 'notif_accept');
  _s('i18n-notif-later', 'btn_later');
  _s('lvlEyebrow', 'level_accomplished');
  _s('btnNextLvl', 'level_next');
  _s('i18n-freemium-title', 'freemium_title');
  _s('i18n-freemium-sub', 'freemium_sub');
  _s('i18n-freemium-buy', 'freemium_buy');
  _s('i18n-freemium-free', 'freemium_free');
  _p('freemiumCodeInput', 'freemium_code_placeholder');
  _s('i18n-freemium-f1', 'freemium_f1');
  _s('i18n-freemium-f2', 'freemium_f2');
  _s('i18n-freemium-f3', 'freemium_f3');
  _s('i18n-freemium-f4', 'freemium_f4');
  _s('i18n-freemium-f5', 'freemium_f5');
  _s('i18n-freemium-f6', 'freemium_f6');
  _s('i18n-bilan-title', 'bilan_title');
  _s('i18n-bilan-question', 'bilan_question');
  _s('i18n-bilan-subtitle', 'bilan_subtitle');
  _s('i18n-bilan-distraction', 'bilan_distraction');
  _s('i18n-bilan-distraction-sub', 'bilan_distraction_sub');
  _s('i18n-bilan-effort', 'bilan_effort');
  _s('i18n-bilan-effort-sub', 'bilan_effort_sub');
  _s('i18n-bilan-sincerite', 'bilan_sincerite');
  _s('i18n-bilan-sincerite-sub', 'bilan_sincerite_sub');
  _s('tasbihLabel', 'tasbih_label');
  _s('i18n-tasbih-hint', 'tasbih_hint');
  _s('i18n-nafs-weekly', 'nafs_weekly');
  var _a = function(id, key) { var el = document.getElementById(id); if (el && t(key)) el.setAttribute('aria-label', t(key)); };
  _a('i18n-aria-lang', 'aria_language');
  _a('i18n-aria-settings', 'aria_settings');
  _a('i18n-aria-back', 'aria_back_home');
  // Card aria-labels
  var _cards = [['Pratique','card_pratique'],['Wird','card_wird'],['Parcours','card_parcours'],['Tafakkur','card_tafakkur']];
  _cards.forEach(function(c) { var el = document.querySelector('[aria-label="'+c[0]+'"]'); if (el) el.setAttribute('aria-label', t(c[1])); });
  _s('i18n-finjournee-skip', 'onboard_skip');
  _s('i18n-bilan-later', 'btn_later');
  _s('v2-greeting-eyebrow', 'btn_start_day');
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
  try { safeSetItem(V2_KEY, JSON.stringify(s)); } catch(e) {}
}

/* ─────────────────────────────────────────────
   NAVIGATION V2
   ───────────────────────────────────────────── */
let v2CurrentView = 'sanctuaire';

// ════════════════════════════════════════════════════════════
// NAFS — 52 Traits de l'âme (Tazkiyat an-nafs)
//
// Compilation inspirée des ouvrages classiques
// de tazkiyat an-nafs, notamment :
// - Ihya 'Ulum ad-Din (Al-Ghazali)
// - Madarij as-Salikin (Ibn al-Qayyim al-Jawziyya)
//
// Chaque trait est accompagné d'une référence prophétique.
// Cette compilation n'a pas valeur de traité savant.
// ════════════════════════════════════════════════════════════
var NAFS_TRAITS = [
  // === SAISON 1 : maladies_coeur (1-13) ===
  { id:1, season:'maladies_coeur', name_fr:'Jalousie', name_ar:'الْحَسَدُ', name_translit:'hasad',
    definition:'Désirer la disparition d\'un bienfait chez autrui.',
    reference:{ text:'Prenez garde à la jalousie, car elle consume les bonnes actions comme le feu consume le bois.', source:'Abu Dawud 4903' },
    signal:'Tu ressens un pincement quand quelqu\'un réussit.', action:'Fais une douaa sincère pour cette personne — \"Allahumma barik lahu\".' },
  { id:2, season:'maladies_coeur', name_fr:'Orgueil', name_ar:'الْكِبْرُ', name_translit:'kibr',
    definition:'Se considérer supérieur aux autres et rejeter la vérité.',
    reference:{ text:'N\'entrera pas au Paradis celui qui a dans son cœur le poids d\'un atome d\'orgueil.', source:'Muslim 91' },
    signal:'Tu refuses un conseil ou tu méprises quelqu\'un pour son apparence.', action:'Accomplis un acte humble aujourd\'hui — sers quelqu\'un sans qu\'il le sache.' },
  { id:3, season:'maladies_coeur', name_fr:'Ostentation', name_ar:'الرِّيَاءُ', name_translit:'riyā\'',
    definition:'Accomplir un acte d\'adoration pour être vu des gens.',
    reference:{ text:'Ce que je crains le plus pour vous c\'est le petit shirk : l\'ostentation.', source:'Ahmad 23630' },
    signal:'Tu modifies ton comportement quand quelqu\'un te regarde.', action:'Accomplis un acte d\'adoration en secret — que personne ne le sache.' },
  { id:4, season:'maladies_coeur', name_fr:'Amour du monde', name_ar:'حُبُّ الدُّنْيَا', name_translit:'hubb ad-dunyā',
    definition:'Donner la priorité aux biens et plaisirs éphémères sur l\'au-delà.',
    reference:{ text:'Soyez dans ce monde comme un étranger ou un voyageur de passage.', source:'Bukhari 6416' },
    signal:'Tu passes plus de temps à planifier tes achats qu\'à préparer ta prière.', action:'Donne en sadaqa un objet auquel tu tiens — libère ton cœur.' },
  { id:5, season:'maladies_coeur', name_fr:'Colère', name_ar:'الْغَضَبُ', name_translit:'ghadab',
    definition:'Perte de contrôle de soi sous l\'effet de la frustration.',
    reference:{ text:'Le fort n\'est pas celui qui terrasse, mais celui qui se maîtrise dans la colère.', source:'Bukhari 6114' },
    signal:'Tu élèves la voix ou tu regrettes tes mots après coup.', action:'Quand la colère monte, dis A\'udhu billahi min ash-shaytan ir-rajim et change de position.' },
  { id:6, season:'maladies_coeur', name_fr:'Avarice', name_ar:'الْبُخْلُ', name_translit:'bukhl',
    definition:'Retenir ce qu\'on devrait donner par attachement excessif.',
    reference:{ text:'Chaque jour deux anges descendent. L\'un dit : Ô Allah, compense celui qui dépense. L\'autre dit : Ô Allah, ruine celui qui retient.', source:'Bukhari 1442' },
    signal:'Tu hésites longuement avant de donner même une petite somme.', action:'Donne aujourd\'hui — même un euro, même un sourire.' },
  { id:7, season:'maladies_coeur', name_fr:'Envie de reconnaissance', name_ar:'حُبُّ الثَّنَاءِ', name_translit:'hubb ath-thanā\'',
    definition:'Chercher la validation et les louanges des gens pour ses actes.',
    reference:{ text:'Ce que je crains le plus pour vous c\'est le petit shirk : l\'ostentation.', source:'Ahmad' },
    signal:'Tu es déçu quand personne ne remarque ce que tu as fait.', action:'Fais un bien anonyme cette semaine — ne le mentionne à personne.' },
  { id:8, season:'maladies_coeur', name_fr:'Mépris des autres', name_ar:'اِحْتِقَارُ النَّاسِ', name_translit:'ihtiqār an-nās',
    definition:'Considérer les autres comme inférieurs en valeur.',
    reference:{ text:'Il suffit à l\'homme comme mal de mépriser son frère musulman.', source:'Muslim 2564' },
    signal:'Tu juges quelqu\'un sur son niveau social, son apparence ou son ignorance.', action:'Rappelle-toi une qualité de cette personne que tu n\'as pas.' },
  { id:9, season:'maladies_coeur', name_fr:'Rancune', name_ar:'الْحِقْدُ', name_translit:'hiqd',
    definition:'Garder en soi le ressentiment et le désir de vengeance.',
    reference:{ text:'Les portes du Paradis s\'ouvrent le lundi et le jeudi, et il est pardonné à tout serviteur qui n\'associe rien à Allah, sauf l\'homme qui a une rancune envers son frère.', source:'Muslim 2565' },
    signal:'Tu repenses souvent à une offense passée avec amertume.', action:'Envoie un salam à la personne concernée — ou fais une douaa pour elle.' },
  { id:10, season:'maladies_coeur', name_fr:'Suspicion', name_ar:'سُوءُ الظَّنِّ', name_translit:'sū\' az-zann',
    definition:'Interpréter les intentions d\'autrui négativement sans preuve.',
    reference:{ text:'Évitez la suspicion, car la suspicion est le plus mensonger des discours.', source:'Bukhari 6066' },
    signal:'Tu imagines les pires raisons derrière les actes des autres.', action:'Cherche 3 explications positives avant de juger.' },
  { id:11, season:'maladies_coeur', name_fr:'Amour excessif de soi', name_ar:'الْعُجْبُ', name_translit:'\'ujb',
    definition:'S\'émerveiller de ses propres qualités en oubliant qu\'elles viennent d\'Allah.',
    reference:{ text:'Ne vous purifiez pas vous-mêmes. C\'est Lui qui sait mieux qui est pieux.', source:'Coran 53:32' },
    signal:'Tu penses mériter ce que tu as grâce à tes seuls efforts.', action:'Dis Alhamdulillah pour chaque qualité que tu te reconnais.' },
  { id:12, season:'maladies_coeur', name_fr:'Hypocrisie', name_ar:'النِّفَاقُ', name_translit:'nifāq',
    definition:'Discordance entre ce qu\'on montre et ce qu\'on est réellement.',
    reference:{ text:'Les signes de l\'hypocrite sont trois : quand il parle il ment, quand il promet il trahit, quand on lui confie il trahit.', source:'Bukhari 33' },
    signal:'Tu fais semblant devant les gens et tu relâches tout en privé.', action:'Aligne un acte privé avec ce que tu montres en public.' },
  { id:13, season:'maladies_coeur', name_fr:'Dureté du cœur', name_ar:'قَسْوَةُ الْقَلْبِ', name_translit:'qaswat al-qalb',
    definition:'Insensibilité spirituelle, absence d\'émotion face au Coran et aux rappels.',
    reference:{ text:'Le meilleur des cœurs est celui qui est le plus doux.', source:'Tirmidhi 2603' },
    signal:'Le Coran ne te touche plus, les rappels te laissent indifférent.', action:'Lis une page du Coran lentement, avec traduction, en cherchant à comprendre.' },
  // === SAISON 2 : maladies_langue (14-26) ===
  { id:14, season:'maladies_langue', name_fr:'Médisance', name_ar:'الْغِيبَةُ', name_translit:'ghībah',
    definition:'Dire sur ton frère en son absence ce qu\'il n\'aimerait pas entendre.',
    reference:{ text:'La médisance c\'est mentionner ton frère par ce qu\'il déteste.', source:'Muslim 2589' },
    signal:'Tu parles de quelqu\'un absent et tu ne dirais pas la même chose en sa présence.', action:'Remplace chaque médisance par une douaa pour cette personne.' },
  { id:15, season:'maladies_langue', name_fr:'Mensonge', name_ar:'الْكَذِبُ', name_translit:'kadhib',
    definition:'Dire le contraire de la vérité intentionnellement.',
    reference:{ text:'La véracité mène à la piété et la piété mène au Paradis.', source:'Bukhari 6094' },
    signal:'Tu embellis, tu exagères ou tu inventes pour te protéger.', action:'Corrige un mensonge récent — même petit — auprès de la personne concernée.' },
  { id:16, season:'maladies_langue', name_fr:'Calomnie', name_ar:'النَّمِيمَةُ', name_translit:'namīmah',
    definition:'Rapporter les propos d\'une personne à une autre pour semer la discorde.',
    reference:{ text:'N\'entrera pas au Paradis celui qui propage la calomnie.', source:'Bukhari 6056' },
    signal:'Tu rapportes ce que quelqu\'un a dit sur un autre pour créer un conflit.', action:'Quand tu entends quelque chose sur quelqu\'un, garde-le et oublie-le.' },
  { id:17, season:'maladies_langue', name_fr:'Regard', name_ar:'النَّظَرُ', name_translit:'nazar',
    definition:'Laisser son regard se poser sur ce qu\'Allah a interdit.',
    reference:{ text:'Dis aux croyants de baisser leurs regards.', source:'Coran 24:30' },
    signal:'Ton regard s\'attarde là où il ne devrait pas — en ligne ou en personne.', action:'Baisse le regard consciemment une fois aujourd\'hui.' },
  { id:18, season:'maladies_langue', name_fr:'Moquerie', name_ar:'السُّخْرِيَةُ', name_translit:'sukhriyah',
    definition:'Ridiculiser quelqu\'un par la parole, le geste ou l\'imitation.',
    reference:{ text:'Ô vous qui avez cru, qu\'un peuple ne se moque pas d\'un autre peuple.', source:'Coran 49:11' },
    signal:'Tu fais rire les autres aux dépens de quelqu\'un.', action:'Complimente sincèrement la personne que tu aurais moquée.' },
  { id:19, season:'maladies_langue', name_fr:'Argumentation vaine', name_ar:'الْجِدَالُ', name_translit:'jidāl',
    definition:'Discuter pour avoir raison plutôt que pour chercher la vérité.',
    reference:{ text:'Je garantis une maison au bord du Paradis à celui qui abandonne la dispute même s\'il a raison.', source:'Abu Dawud 4800' },
    signal:'Tu continues de débattre après avoir fait ton point.', action:'Dis \"Tu as peut-être raison\" et arrête — même si tu penses le contraire.' },
  { id:20, season:'maladies_langue', name_fr:'Bavardage inutile', name_ar:'اللَّغْوُ', name_translit:'laghw',
    definition:'Paroles qui n\'apportent aucun bien — ni ici-bas, ni pour l\'au-delà.',
    reference:{ text:'Parmi les belles qualités de l\'Islam d\'un homme : délaisser ce qui ne le regarde pas.', source:'Tirmidhi 2317' },
    signal:'Tu remplis le silence par des mots vides.', action:'Pratique 10 minutes de silence intentionnel après une prière.' },
  { id:21, season:'maladies_langue', name_fr:'Promesses non tenues', name_ar:'إِخْلَافُ الْوَعْدِ', name_translit:'ikhlāf al-wa\'d',
    definition:'S\'engager verbalement puis ne pas honorer sa parole.',
    reference:{ text:'Les signes de l\'hypocrite sont trois, et l\'un d\'eux : quand il promet, il trahit.', source:'Bukhari 33' },
    signal:'Tu dis \"je le ferai\" mais tu ne le fais pas.', action:'Tiens une promesse en attente cette semaine — ou excuse-toi sincèrement.' },
  { id:22, season:'maladies_langue', name_fr:'Indiscrétion', name_ar:'إِفْشَاءُ السِّرِّ', name_translit:'ifshā\' as-sirr',
    definition:'Révéler ce qui t\'a été confié en secret.',
    reference:{ text:'Les assemblées sont des dépôts de confiance.', source:'Abu Dawud 4869' },
    signal:'Tu partages un secret pour alimenter une conversation.', action:'Garde un secret qu\'on t\'a confié — renforce cette habitude.' },
  { id:23, season:'maladies_langue', name_fr:'Flatterie', name_ar:'الْمُدَاهَنَةُ', name_translit:'mudāhanah',
    definition:'Louer excessivement quelqu\'un par intérêt ou complaisance.',
    reference:{ text:'Jetez de la terre au visage des flatteurs.', source:'Muslim 3002' },
    signal:'Tu exagères tes compliments pour obtenir quelque chose.', action:'Fais un compliment sincère et mesuré — sans rien attendre en retour.' },
  { id:24, season:'maladies_langue', name_fr:'Mauvais mot spontané', name_ar:'فَلْتَةُ اللِّسَانِ', name_translit:'faltat al-lisān',
    definition:'Laisser échapper un mot blessant sans réfléchir.',
    reference:{ text:'Il arrive que l\'homme dise un mot sans y prêter attention et qu\'il chute à cause de lui en Enfer.', source:'Bukhari 6477' },
    signal:'Quelqu\'un te dit que tes mots l\'ont blessé.', action:'Avant de parler, demande-toi : est-ce vrai, utile et bienveillant ?' },
  { id:25, season:'maladies_langue', name_fr:'Silence quand il faut parler', name_ar:'السُّكُوتُ عَنِ الْحَقِّ', name_translit:'as-sukūt \'an al-haqq',
    definition:'Se taire face à l\'injustice ou quand la vérité doit être dite.',
    reference:{ text:'Le meilleur jihad est une parole de vérité devant un dirigeant injuste.', source:'Abu Dawud 4344' },
    signal:'Tu vois une injustice et tu détournes le regard.', action:'Dis une vérité que tu retiens — avec douceur mais avec courage.' },
  { id:26, season:'maladies_langue', name_fr:'Jugement trop rapide', name_ar:'التَّسَرُّعُ فِي الْحُكْمِ', name_translit:'at-tasarru\' fi al-hukm',
    definition:'Émettre un avis définitif sur quelqu\'un sans connaître toute la situation.',
    reference:{ text:'Allah ne regarde pas vos corps ni vos apparences, mais Il regarde vos cœurs et vos actions.', source:'Muslim 2564' },
    signal:'Tu catalogues quelqu\'un après une seule interaction.', action:'Suspends ton jugement 24h — cherche le contexte avant de conclure.' },
  // === SAISON 3 : vertus (27-39) ===
  { id:27, season:'vertus', name_fr:'Patience', name_ar:'الصَّبْرُ', name_translit:'sabr',
    definition:'Endurer avec constance les épreuves en gardant confiance en Allah.',
    reference:{ text:'Certes, Allah est avec les patients.', source:'Coran 2:153' },
    signal:'Tu te plains souvent ou tu abandonnes vite.', action:'Face à ta prochaine difficulté, dis Inna lillahi wa inna ilayhi raji\'un et attends.' },
  { id:28, season:'vertus', name_fr:'Gratitude', name_ar:'الشُّكْرُ', name_translit:'shukr',
    definition:'Reconnaître et apprécier les bienfaits d\'Allah par le cœur, la langue et les actes.',
    reference:{ text:'Si vous êtes reconnaissants, J\'augmenterai Mes bienfaits pour vous.', source:'Coran 14:7' },
    signal:'Tu prends tes acquis pour des évidences.', action:'Nomme 3 ni\'ma concrètes d\'Allah ce matin — et dis Alhamdulillah pour chacune.' },
  { id:29, season:'vertus', name_fr:'Sincérité', name_ar:'الْإِخْلَاصُ', name_translit:'ikhlāṣ',
    definition:'Accomplir chaque acte uniquement pour la satisfaction d\'Allah.',
    reference:{ text:'Les actes ne valent que par les intentions, et chaque homme n\'aura que ce qu\'il a eu l\'intention de faire.', source:'Bukhari 1' },
    signal:'Tu te demandes ce que les gens vont penser de ton acte.', action:'Accomplis une prière surérogatoire seul — sans que personne ne le sache.' },
  { id:30, season:'vertus', name_fr:'Humilité', name_ar:'التَّوَاضُعُ', name_translit:'tawāḍu\'',
    definition:'Se mettre au même niveau que les autres sans se croire supérieur.',
    reference:{ text:'Quiconque s\'humilie pour Allah, Allah l\'élève.', source:'Muslim 2588' },
    signal:'Tu acceptes difficilement d\'être corrigé.', action:'Demande un avis à quelqu\'un que tu considères en dessous de toi.' },
  { id:31, season:'vertus', name_fr:'Générosité', name_ar:'الْكَرَمُ', name_translit:'karam',
    definition:'Donner de soi — temps, argent, attention — sans compter.',
    reference:{ text:'La main qui donne est meilleure que la main qui reçoit.', source:'Bukhari 1427' },
    signal:'Tu calcules toujours avant de donner.', action:'Donne quelque chose aujourd\'hui sans réfléchir au montant.' },
  { id:32, season:'vertus', name_fr:'Pudeur', name_ar:'الْحَيَاءُ', name_translit:'ḥayā\'',
    definition:'Retenue naturelle qui empêche de faire ce qui est indécent devant Allah et les gens.',
    reference:{ text:'La pudeur fait partie de la foi.', source:'Bukhari 9' },
    signal:'Tu fais en privé ce que tu n\'oserais pas faire devant quelqu\'un de pieux.', action:'Comporte-toi comme si Allah te regardait — car Il te regarde.' },
  { id:33, season:'vertus', name_fr:'Confiance en Allah', name_ar:'التَّوَكُّلُ', name_translit:'tawakkul',
    definition:'Faire les causes puis remettre le résultat à Allah sans anxiété.',
    reference:{ text:'Et quiconque place sa confiance en Allah, Il lui suffit.', source:'Coran 65:3' },
    signal:'Tu angoisses pour l\'avenir malgré tes efforts.', action:'Fais ce qui dépend de toi — puis dis Hasbunallahu wa ni\'ma al-wakil.' },
  { id:34, season:'vertus', name_fr:'Contentement', name_ar:'الْقَنَاعَةُ', name_translit:'qanā\'ah',
    definition:'Être satisfait de ce qu\'Allah t\'a accordé sans convoiter ce que les autres ont.',
    reference:{ text:'La véritable richesse n\'est pas l\'abondance des biens, mais la richesse de l\'âme.', source:'Bukhari 6446' },
    signal:'Tu te compares constamment aux autres.', action:'Regarde ceux qui ont moins que toi — pas ceux qui ont plus.' },
  { id:35, season:'vertus', name_fr:'Indulgence', name_ar:'الْعَفْوُ', name_translit:'\'afw',
    definition:'Pardonner celui qui t\'a fait du tort alors que tu pourrais te venger.',
    reference:{ text:'Qu\'ils pardonnent et passent l\'éponge. N\'aimez-vous pas qu\'Allah vous pardonne ?', source:'Coran 24:22' },
    signal:'Tu gardes une liste mentale des torts qu\'on t\'a faits.', action:'Pardonne une personne dans ton cœur — et fais une douaa pour elle.' },
  { id:36, season:'vertus', name_fr:'Compassion', name_ar:'الرَّحْمَةُ', name_translit:'raḥmah',
    definition:'Douceur et tendresse envers les créatures d\'Allah.',
    reference:{ text:'Dieu ne fait pas miséricorde à celui qui ne fait pas miséricorde aux gens.', source:'Bukhari 7376' },
    signal:'La souffrance des autres te laisse indifférent.', action:'Aide concrètement une personne en difficulté aujourd\'hui.' },
  { id:37, season:'vertus', name_fr:'Véracité', name_ar:'الصِّدْقُ', name_translit:'ṣidq',
    definition:'Être vrai dans ses paroles, ses actes et ses intentions.',
    reference:{ text:'La véracité mène à la piété et la piété mène au Paradis.', source:'Bukhari 6094' },
    signal:'Tu embellis la réalité pour paraître mieux.', action:'Dis une vérité inconfortable aujourd\'hui — avec sagesse.' },
  { id:38, season:'vertus', name_fr:'Bon caractère', name_ar:'حُسْنُ الْخُلُقِ', name_translit:'ḥusn al-khuluq',
    definition:'Traiter les gens avec douceur, sourire et bienveillance.',
    reference:{ text:'Les plus proches de moi le Jour du Jugement seront ceux qui ont le meilleur caractère.', source:'Tirmidhi 2018' },
    signal:'Les gens évitent de te parler par crainte de ta réaction.', action:'Accueille chaque personne aujourd\'hui avec un visage souriant.' },
  { id:39, season:'vertus', name_fr:'Souvenir d\'Allah', name_ar:'الذِّكْرُ', name_translit:'dhikr',
    definition:'Maintenir Allah présent dans son cœur et sur sa langue tout au long de la journée.',
    reference:{ text:'Ceux qui croient et dont les cœurs se tranquillisent par le dhikr d\'Allah. N\'est-ce point par le dhikr d\'Allah que les cœurs se tranquillisent ?', source:'Coran 13:28' },
    signal:'Tu passes des heures sans penser à Allah.', action:'Fixe 3 moments de dhikr aujourd\'hui : matin, midi, soir — même 1 minute.' },
  // === SAISON 4 : adab_quotidien (40-52) ===
  { id:40, season:'adab_quotidien', name_fr:'Adab avec les parents', name_ar:'أَدَبُ الْوَالِدَيْنِ', name_translit:'adab al-wālidayn',
    definition:'Honorer, servir et ne jamais exprimer d\'impatience envers ses parents.',
    reference:{ text:'Et ton Seigneur a décrété que vous n\'adoriez que Lui et la bienfaisance envers les parents.', source:'Coran 17:23' },
    signal:'Tu lèves le ton ou tu t\'impatientes avec tes parents.', action:'Appelle ou visite un parent aujourd\'hui — demande-lui comment il va.' },
  { id:41, season:'adab_quotidien', name_fr:'Adab avec le conjoint', name_ar:'أَدَبُ الزَّوْجِيَّةِ', name_translit:'adab az-zawjiyyah',
    definition:'Traiter son époux ou épouse avec douceur, respect et reconnaissance.',
    reference:{ text:'Le meilleur d\'entre vous est le meilleur envers sa femme.', source:'Tirmidhi 3895' },
    signal:'Tu négliges les petites attentions ou tu parles durement.', action:'Fais un geste d\'attention non habituel pour ton conjoint aujourd\'hui.' },
  { id:42, season:'adab_quotidien', name_fr:'Adab avec les enfants', name_ar:'أَدَبُ الْأَوْلَادِ', name_translit:'adab al-awlād',
    definition:'Élever ses enfants avec amour, justice et enseignement de la religion.',
    reference:{ text:'Quiconque prend soin de deux filles jusqu\'à leur maturité, lui et moi serons comme ceci au Paradis.', source:'Muslim 2631' },
    signal:'Tu cries plus que tu n\'enseignes.', action:'Prends 10 minutes de qualité avec un enfant — écoute-le vraiment.' },
  { id:43, season:'adab_quotidien', name_fr:'Adab avec les voisins', name_ar:'أَدَبُ الْجِيرَانِ', name_translit:'adab al-jīrān',
    definition:'Respecter, aider et ne pas nuire à son voisin.',
    reference:{ text:'Celui qui croit en Allah et au Jour dernier, qu\'il honore son voisin.', source:'Bukhari 6019' },
    signal:'Tu ne connais pas le nom de ton voisin.', action:'Offre un plat ou un salam à ton voisin cette semaine.' },
  { id:44, season:'adab_quotidien', name_fr:'Adab au travail', name_ar:'أَدَبُ الْعَمَلِ', name_translit:'adab al-\'amal',
    definition:'Travailler avec excellence, honnêteté et conscience d\'Allah.',
    reference:{ text:'L\'ihsân, c\'est d\'adorer Allah comme si tu Le voyais ; si tu ne Le vois pas, Lui te voit.', source:'Muslim 8' },
    signal:'Tu bâcles ton travail ou tu trouves des raccourcis malhonnêtes.', action:'Accomplis ta prochaine tâche comme si Allah la voyait — car Il la voit.' },
  { id:45, season:'adab_quotidien', name_fr:'Adab avec l\'argent', name_ar:'أَدَبُ الْمَالِ', name_translit:'adab al-māl',
    definition:'Gagner, dépenser et donner son argent de manière licite et mesurée.',
    reference:{ text:'Mangez, buvez et habillez-vous sans gaspillage ni orgueil.', source:'Ahmad 6695' },
    signal:'Tu dépenses sans réfléchir ou tu refuses de donner.', action:'Avant chaque achat cette semaine, demande-toi : en ai-je vraiment besoin ?' },
  { id:46, season:'adab_quotidien', name_fr:'Adab de la nourriture', name_ar:'أَدَبُ الطَّعَامِ', name_translit:'adab at-ta\'ām',
    definition:'Manger avec modération, en nommant Allah et en partageant.',
    reference:{ text:'L\'homme ne remplit pas de récipient pire que son ventre.', source:'Tirmidhi 2380' },
    signal:'Tu manges distraitement, debout ou en excès.', action:'Mange ton prochain repas assis, avec Bismillah, en mastiquant lentement.' },
  { id:47, season:'adab_quotidien', name_fr:'Adab du sommeil', name_ar:'أَدَبُ النَّوْمِ', name_translit:'adab an-nawm',
    definition:'Se coucher en état de pureté avec les invocations prescrites.',
    reference:{ text:'Le Prophète ﷺ dormait sur le côté droit et récitait les invocations avant de dormir.', source:'Bukhari 6311' },
    signal:'Tu t\'endors devant un écran sans aucune invocation.', action:'Ce soir, fais tes ablutions et récite les 3 quls avant de dormir.' },
  { id:48, season:'adab_quotidien', name_fr:'Adab du vêtement', name_ar:'أَدَبُ اللِّبَاسِ', name_translit:'adab al-libās',
    definition:'Se vêtir avec pudeur, propreté et modestie sans ostentation.',
    reference:{ text:'Quiconque porte un vêtement d\'ostentation ici-bas, Allah lui fera porter un vêtement d\'humiliation au Jour du Jugement.', source:'Abu Dawud 4029' },
    signal:'Tu t\'habilles pour impressionner ou tu négliges ton apparence.', action:'Choisis un vêtement propre et sobre — et dis la douaa du vêtement.' },
  { id:49, season:'adab_quotidien', name_fr:'Adab des réseaux sociaux', name_ar:'أَدَبُ التَّوَاصُلِ', name_translit:'adab at-tawāṣul',
    definition:'Utiliser les réseaux avec conscience, sans gaspiller son temps ni nuire.',
    reference:{ text:'Parmi les belles qualités de l\'Islam d\'un homme : délaisser ce qui ne le regarde pas.', source:'Tirmidhi 2317' },
    signal:'Tu scrolles plus de 30 minutes sans but ou tu compares ta vie.', action:'Fixe un timer de 15 minutes max pour chaque session.' },
  { id:50, season:'adab_quotidien', name_fr:'Adab envers les non-musulmans', name_ar:'أَدَبُ غَيْرِ الْمُسْلِمِينَ', name_translit:'adab ghayr al-muslimīn',
    definition:'Traiter les non-musulmans avec justice, respect et bon voisinage.',
    reference:{ text:'Allah ne vous interdit pas d\'être bons et justes envers ceux qui ne vous ont pas combattus.', source:'Coran 60:8' },
    signal:'Tu manques de respect ou d\'équité envers un non-musulman.', action:'Sois exemplaire dans ton comportement avec chaque personne — c\'est ta da\'wah silencieuse.' },
  { id:51, season:'adab_quotidien', name_fr:'Adab envers les animaux', name_ar:'أَدَبُ الْحَيَوَانِ', name_translit:'adab al-hayawān',
    definition:'Traiter les animaux avec bienveillance — ne pas les blesser ni les priver.',
    reference:{ text:'Une femme est entrée en Enfer à cause d\'une chatte qu\'elle avait attachée sans la nourrir ni la laisser manger.', source:'Bukhari 3318' },
    signal:'Tu ignores la souffrance d\'un animal.', action:'Nourris un animal ou donne de l\'eau à un chat errant.' },
  { id:52, season:'adab_quotidien', name_fr:'Adab envers la terre', name_ar:'أَدَبُ الْأَرْضِ', name_translit:'adab al-arḍ',
    definition:'Préserver la création d\'Allah — eau, terre, nature — sans gaspillage ni destruction.',
    reference:{ text:'Le Prophète ﷺ a interdit le gaspillage d\'eau pendant les ablutions, même au bord d\'une rivière.', source:'Ibn Majah 425' },
    signal:'Tu gaspilles l\'eau, la nourriture ou l\'énergie sans y penser.', action:'Réduis un gaspillage concret aujourd\'hui — eau, électricité ou nourriture.' }
];
function getNafsTraitOfWeek() {
  var now = new Date();
  var start = new Date(now.getFullYear(), 0, 1);
  var day = Math.floor((now - start) / 86400000);
  var weekOfYear = Math.floor((day + start.getDay()) / 7);
  return { trait: NAFS_TRAITS[weekOfYear % NAFS_TRAITS.length], week: weekOfYear + 1 };
}

var NAFS_SEASON_LABELS = {
  maladies_coeur: 'Maladies du cœur',
  maladies_langue: 'Maladies de la langue',
  vertus: 'Vertus à cultiver',
  adab_quotidien: 'Adab du quotidien'
};

function _nafsGetObservations() {
  try { return JSON.parse(localStorage.getItem('nafs_observations') || '[]'); } catch(e) { return []; }
}

function _nafsAlreadyToday(traitId) {
  var today = new Date().toISOString().slice(0, 10);
  return _nafsGetObservations().some(function(o) { return o.traitId === traitId && o.date === today; });
}

function _nafsCountThisWeek(traitId) {
  var now = new Date();
  var dayOfWeek = now.getDay() || 7;
  var monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + 1);
  monday.setHours(0,0,0,0);
  var mondayStr = monday.toISOString().slice(0, 10);
  return _nafsGetObservations().filter(function(o) { return o.traitId === traitId && o.date >= mondayStr; }).length;
}

function _nafsGetWeekMap(traitId) {
  var now = new Date();
  var dayOfWeek = now.getDay() || 7;
  var monday = new Date(now);
  monday.setDate(now.getDate() - dayOfWeek + 1);
  monday.setHours(0,0,0,0);
  var obs = _nafsGetObservations().filter(function(o) { return o.traitId === traitId; });
  var map = {};
  for (var d = 0; d < 7; d++) {
    var date = new Date(monday);
    date.setDate(monday.getDate() + d);
    var dateStr = date.toISOString().slice(0, 10);
    var match = null;
    for (var i = 0; i < obs.length; i++) {
      if (obs[i].date === dateStr) { match = obs[i]; break; }
    }
    map[d] = match;
  }
  return map;
}

function _nafsRenderWeekMap(traitId) {
  var map = _nafsGetWeekMap(traitId);
  var labels = ['L','M','M','J','V','S','D'];
  var now = new Date();
  var todayIdx = (now.getDay() || 7) - 1;
  var html = '<div class="nafs-weekmap">';
  html += '<div class="nafs-weekmap-dots">';
  for (var d = 0; d < 7; d++) {
    var filled = !!map[d];
    var isToday = d === todayIdx;
    var cls = 'nafs-weekmap-dot' + (filled ? ' filled' : '') + (isToday ? ' today' : '');
    var noteAttr = filled && map[d].note ? ' data-note="' + map[d].note.replace(/"/g, '&quot;') + '"' : '';
    var onclick = filled ? ' onclick="nafsShowDayNote(this)"' : '';
    html += '<div class="nafs-weekmap-col">';
    html += '<div class="' + cls + '"' + noteAttr + onclick + '>' + (filled ? '✓' : '') + '</div>';
    html += '<div class="nafs-weekmap-label' + (isToday ? ' today' : '') + '">' + labels[d] + '</div>';
    html += '</div>';
  }
  html += '</div></div>';
  return html;
}

function nafsShowDayNote(el) {
  var existing = document.querySelector('.nafs-day-tooltip');
  if (existing) existing.remove();
  var note = el.getAttribute('data-note');
  if (!note) return;
  var tooltip = document.createElement('div');
  tooltip.className = 'nafs-day-tooltip';
  tooltip.textContent = note;
  el.parentElement.appendChild(tooltip);
  setTimeout(function() { tooltip.classList.add('visible'); }, 10);
  setTimeout(function() {
    tooltip.classList.remove('visible');
    setTimeout(function() { tooltip.remove(); }, 300);
  }, 3000);
}

function nafsObserve(traitId) {
  if (_nafsAlreadyToday(traitId)) return;
  var noteEl = document.getElementById('nafs-note-input');
  var note = noteEl ? noteEl.value.trim().slice(0, 100) : '';
  var today = new Date().toISOString().slice(0, 10);
  var obs = _nafsGetObservations();
  obs.push({ traitId: traitId, date: today, note: note });
  safeSetItem('nafs_observations', JSON.stringify(obs));

  var btn = document.getElementById('nafs-observe-btn');
  if (btn) {
    btn.classList.add('nafs-observed');
    btn.innerHTML = t('nafs_observed_today');
  }
  if (noteEl) { noteEl.disabled = true; noteEl.style.opacity = '0.4'; }

  var counter = document.getElementById('nafs-week-counter');
  if (counter) {
    var c = _nafsCountThisWeek(traitId);
    counter.textContent = c === 1 ? 'Tu l\'as observé 1 fois cette semaine' : 'Tu l\'as observé ' + c + ' fois cette semaine';
    counter.style.opacity = '1';
  }

  var mapEl = document.getElementById('nafs-weekmap-container');
  if (mapEl) { mapEl.innerHTML = _nafsRenderWeekMap(traitId); }
}

function renderNafsTrait() {
  var container = document.getElementById('nafs-trait-card');
  if (!container) return;
  var data = getNafsTraitOfWeek();
  var trait = data.trait;
  var w = data.week;
  var seasonLabel = NAFS_SEASON_LABELS[trait.season] || trait.season;
  var alreadyDone = _nafsAlreadyToday(trait.id);
  var weekCount = _nafsCountThisWeek(trait.id);

  container.innerHTML =
    '<div style="text-align:center;">' +
      '<div class="nafs-week-badge">Semaine ' + w + ' — Trait ' + trait.id + '/52</div>' +
    '</div>' +
    '<div class="nafs-season-label" style="text-align:center;">' + seasonLabel + '</div>' +
    '<div class="nafs-name-block">' +
      '<div class="nafs-name-ar">' + trait.name_ar + '</div>' +
      '<div class="nafs-name-fr">' + trait.name_fr + '</div>' +
      '<div class="nafs-name-translit">' + trait.name_translit + '</div>' +
    '</div>' +
    '<div class="nafs-divider"></div>' +
    '<div class="nafs-section">' +
      '<div class="nafs-section-label">Définition</div>' +
      '<div class="nafs-section-text">' + trait.definition + '</div>' +
    '</div>' +
    '<div class="nafs-reference-box">' +
      '<div class="nafs-reference-text">« ' + trait.reference.text + ' »</div>' +
      '<div class="nafs-reference-source">' + trait.reference.source + '</div>' +
    '</div>' +
    '<div class="nafs-signal-box">' +
      '<div class="nafs-signal-icon">⚡</div>' +
      '<div>' +
        '<div class="nafs-section-label">Signal d\'alerte</div>' +
        '<div class="nafs-section-text">' + trait.signal + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="nafs-action-box">' +
      '<div class="nafs-section-label" style="color:rgba(200,168,75,0.7);">Action de la semaine</div>' +
      '<div class="nafs-action-text">' + trait.action + '</div>' +
    '</div>' +
    '<div class="nafs-divider"></div>' +
    '<div class="nafs-observe-zone">' +
      '<input type="text" id="nafs-note-input" class="nafs-note-input" maxlength="100" placeholder="' + t('nafs_note_placeholder') + '"' + (alreadyDone ? ' disabled style="opacity:0.4;"' : '') + '>' +
      '<button id="nafs-observe-btn" class="nafs-observe-btn' + (alreadyDone ? ' nafs-observed' : '') + '" onclick="nafsObserve(' + trait.id + ')"' + (alreadyDone ? ' disabled' : '') + '>' +
        (alreadyDone ? t('nafs_observed_today') : t('nafs_observe_btn')) +
      '</button>' +
      '<div id="nafs-week-counter" class="nafs-week-counter"' + (weekCount === 0 ? ' style="opacity:0;"' : '') + '>' +
        (weekCount === 0 ? '' : weekCount === 1 ? 'Tu l\'as observé 1 fois cette semaine' : 'Tu l\'as observé ' + weekCount + ' fois cette semaine') +
      '</div>' +
      '<div id="nafs-weekmap-container">' + _nafsRenderWeekMap(trait.id) + '</div>' +
    '</div>';
}

function _v2TransitionTo(targetId, opts) {
  opts = opts || {};
  var current = document.getElementById('view-sanctuaire');
  if (current && current.classList.contains('active')) {
    current.classList.add('view-transition','exiting');
    setTimeout(function() {
      current.classList.remove('active','view-transition','exiting');
      _v2ShowTarget(targetId, opts);
    }, 150);
  } else {
    var activeView = document.querySelector('.view.active, .view[style*="display: block"], .view[style*="display:block"]');
    if (activeView) {
      activeView.classList.add('view-transition','exiting');
      setTimeout(function() {
        activeView.classList.remove('active','view-transition','exiting');
        activeView.style.display = 'none';
        _v2ShowTarget(targetId, opts);
      }, 150);
    } else {
      document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); v.style.display = 'none'; });
      _v2ShowTarget(targetId, opts);
    }
  }
}
function _v2ShowTarget(targetId, opts) {
  document.querySelectorAll('.view').forEach(function(v) { if (v.id !== targetId) { v.classList.remove('active'); v.style.display = 'none'; } });
  var target = document.getElementById(targetId);
  if (!target) return;
  target.style.display = '';
  target.classList.add('active');
  fadeInView(target);
  if (opts.onShow) opts.onShow();
}

function v2GoJournal() {
  var tbEl = document.getElementById('topbar-v2');
  if (tbEl) tbEl.classList.remove('active');
  document.querySelectorAll('.nav-v2-item').forEach(function(n) { n.classList.remove('active-nav'); });
  var btn = document.getElementById('v2nav-journal');
  if (btn) btn.classList.add('active-nav');
  _v2TransitionTo('view-journal', { onShow: function() { journalSwitchTab('niyyah'); } });
}
function journalSwitchTab(tab) {
  var content = document.getElementById('journal-content');
  var tabN = document.getElementById('journal-tab-niyyah');
  var tabR = document.getElementById('journal-tab-regards');
  if (!content) return;
  if (tab === 'niyyah') {
    if (tabN) { tabN.style.background = 'linear-gradient(180deg,rgba(212,181,98,0.18) 0%,rgba(166,117,68,0.12) 100%)'; tabN.style.border = '1px solid rgba(230,200,130,0.5)'; tabN.style.color = 'rgba(230,200,130,1)'; tabN.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,230,180,0.1)'; }
    if (tabR) { tabR.style.background = 'transparent'; tabR.style.border = '1px solid rgba(200,168,75,0.15)'; tabR.style.color = 'rgba(200,168,75,0.5)'; tabR.style.boxShadow = 'none'; }
    var entries = getNiyyahHistory();
    if (entries.length === 0) {
      content.innerHTML = '<div class="empty-state-premium"><div class="empty-state-glyph">نية</div><div class="empty-state-title">'+t('journal_niyyah_title')+'</div><div class="empty-state-text">'+t('journal_niyyah_text')+'</div></div>';
    } else {
      var html = '';
      entries.forEach(function(e) {
        var d = new Date(e.date);
        var dateStr = d.toLocaleDateString(_dateLocale(), { day:'numeric', month:'short' }) + ' · ' + d.toLocaleTimeString(_dateLocale(), { hour:'2-digit', minute:'2-digit' });
        var thumb = e.photo ? '<img src="' + e.photo + '" style="width:60px;height:60px;border-radius:10px;object-fit:cover;flex-shrink:0;">' : '<div style="width:60px;height:60px;border-radius:10px;background:rgba(200,168,75,0.08);flex-shrink:0;"></div>';
        html += '<div onclick="openNiyyahDetail(\'' + e.id + '\')" style="display:flex;gap:12px;align-items:center;padding:12px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.2);border-radius:12px;margin-bottom:8px;cursor:pointer;box-shadow:0 2px 12px rgba(0,0,0,0.3);transition:all 0.3s ease;">'
          + thumb + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#D4AF37;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (e.intention || '') + '</div>'
          + '<div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:4px;">' + dateStr + '</div></div></div>';
      });
      content.innerHTML = html;
    }
  } else {
    if (tabN) { tabN.style.background = 'transparent'; tabN.style.border = '1px solid rgba(200,168,75,0.15)'; tabN.style.color = 'rgba(200,168,75,0.5)'; tabN.style.boxShadow = 'none'; }
    if (tabR) { tabR.style.background = 'linear-gradient(180deg,rgba(212,181,98,0.18) 0%,rgba(166,117,68,0.12) 100%)'; tabR.style.border = '1px solid rgba(230,200,130,0.5)'; tabR.style.color = 'rgba(230,200,130,1)'; tabR.style.boxShadow = '0 2px 8px rgba(0,0,0,0.3),inset 0 1px 0 rgba(255,230,180,0.1)'; }
    var entries = getRegardeHistory();
    if (entries.length === 0) {
      content.innerHTML = '<div class="empty-state-premium"><div class="empty-state-glyph">نَظَر</div><div class="empty-state-title">'+t('journal_regarde_title')+'</div><div class="empty-state-text">'+t('journal_regarde_text')+'</div><button class="empty-state-cta" onclick="scannerOpen()">'+t('journal_regarde_cta')+'</button></div>';
    } else {
      var html = '';
      entries.forEach(function(e) {
        var d = new Date(e.date);
        var dateStr = d.toLocaleDateString(_dateLocale(), { day:'numeric', month:'short' }) + ' · ' + d.toLocaleTimeString(_dateLocale(), { hour:'2-digit', minute:'2-digit' });
        var thumb = e.photo ? '<img src="' + e.photo + '" style="width:60px;height:60px;border-radius:10px;object-fit:cover;flex-shrink:0;">' : '<div style="width:60px;height:60px;border-radius:10px;background:rgba(200,168,75,0.08);flex-shrink:0;"></div>';
        var star = e.bookmark ? '<div style="position:absolute;top:8px;right:8px;color:#D4AF37;font-size:14px;">★</div>' : '';
        html += '<div onclick="openRegardeDetail(\'' + e.id + '\')" style="display:flex;gap:12px;align-items:center;padding:12px;background:rgba(200,168,75,0.06);border:1px solid rgba(200,168,75,0.2);border-radius:12px;margin-bottom:8px;cursor:pointer;position:relative;box-shadow:0 2px 12px rgba(0,0,0,0.3);transition:all 0.3s ease;">'
          + thumb + '<div style="flex:1;min-width:0;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#D4AF37;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (e.question || '') + '</div>'
          + '<div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:4px;">' + dateStr + '</div></div>' + star + '</div>';
      });
      content.innerHTML = html;
    }
  }
}
function v2GoNafs() {
  var tbEl = document.getElementById('topbar-v2');
  if (tbEl) tbEl.classList.remove('active');
  document.querySelectorAll('.nav-v2-item').forEach(function(n) { n.classList.remove('active-nav'); });
  var btn = document.getElementById('v2nav-nafs');
  if (btn) btn.classList.add('active-nav');
  _v2TransitionTo('view-nafs', { onShow: function() {
    renderNafsTrait();
    var nafsDisc = document.getElementById('nafs-disclaimer');
    if (nafsDisc) nafsDisc.textContent = t('nafs_disclaimer');
  }});
}
function v2GoSanctuaire() {
  document.body.classList.remove('pratique-active');
  // Fade out current view
  var activeView = document.querySelector('.view.active');
  function _showSanctuaire() {
    document.querySelectorAll('.view').forEach(function(v) { v.classList.remove('active'); v.style.display = 'none'; });
    const sanctEl = document.getElementById('view-sanctuaire');
    if (sanctEl) sanctEl.classList.add('active');
    const tbEl = document.getElementById('topbar-v2');
    if (tbEl) tbEl.classList.add('active');
    const nbEl = document.getElementById('nav-bar-v2');
    if (nbEl) nbEl.classList.add('active');
    document.body.classList.add('v2-mode');
    const backBtn = document.getElementById('v2-back-btn');
    if (backBtn) backBtn.classList.remove('visible');
    ['niyyahScreen','notifPermScreen'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) { el.style.display = 'none'; el.style.pointerEvents = 'none'; }
    });
    document.querySelectorAll('.nav-v2-item').forEach(function(n) { n.classList.remove('active-nav'); });
    var btn = document.getElementById('v2nav-sanctuaire');
    if (btn) btn.classList.add('active-nav');
  }
  // Skip intro cascade on return visits
  var sanctEl2 = document.getElementById('view-sanctuaire');
  if (sanctEl2) sanctEl2.classList.add('no-intro');
  if (activeView) {
    activeView.classList.add('view-transition','exiting');
    setTimeout(function() { activeView.classList.remove('view-transition','exiting'); _showSanctuaire(); }, 150);
  } else {
    _showSanctuaire();
  }

  v2CurrentView = 'sanctuaire';
  // Mode Silence: overlay on sanctuaire
  var _silOv = document.getElementById('silence-overlay');
  if (isSilenceDay()) {
    if (!_silOv) {
      _silOv = document.createElement('div');
      _silOv.id = 'silence-overlay';
      _silOv.style.cssText = 'position:fixed;inset:0;z-index:9999;width:100vw;height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px 24px;background:var(--bg,#2C2E32);';
      var _sp = _getPrenom();
      _silOv.innerHTML = '<img src="https://nabs881-sketch.github.io/niyyah-app/imageslogo.webp" alt="Niyyah" style="width:100px;height:auto;margin-bottom:24px;opacity:0.7;">'
        + '<div style="font-family:\'Scheherazade New\',serif;font-size:36px;color:#C8A84A;margin-bottom:16px;">\u0627\u0644\u0633\u0644\u0627\u0645 \u0639\u0644\u064A\u0643\u0645</div>'
        + '<div style="font-family:var(--serif);font-size:20px;font-style:italic;color:var(--t1);margin-bottom:24px;">' + (_sp ? _sp + ', jour' : 'Jour') + ' de silence.</div>'
        + '<div style="font-family:\'Amiri\',serif;font-size:22px;color:rgba(200,168,75,0.6);line-height:1.8;direction:rtl;margin-bottom:8px;">\u0648\u0625\u0650\u0644\u064E\u0649\u0670 \u0631\u064E\u0628\u0651\u0650\u0643\u064E \u0641\u0671\u0631\u0652\u063A\u064E\u0628</div>'
        + '<div style="font-family:var(--serif);font-size:14px;font-style:italic;color:var(--t3);">'+t('silence_verse')+' \u2014 Ash-Sharh, 8</div>';
      var sanctEl = document.getElementById('view-sanctuaire');
      if (sanctEl) sanctEl.appendChild(_silOv);
    }
    _silOv.style.display = 'flex';
    return;
  } else if (_silOv) {
    _silOv.style.display = 'none';
  }
  v2RefreshStats();
  if (typeof renderDefiCard === 'function') renderDefiCard();
}

function v2GoTo(viewName) {
  document.body.classList.remove('pratique-active');
  if (viewName === 'checklist') document.body.classList.add('pratique-active');
  // Fermer les overlays
  if (typeof closeDefiSelector === 'function') closeDefiSelector();
  var _defOv = document.getElementById('defiSelectorOverlay');
  if (_defOv) { _defOv.style.opacity = '0'; _defOv.style.pointerEvents = 'none'; }
  // Topbar back mode
  var tbEl2 = document.getElementById('topbar-v2');
  if (tbEl2) { tbEl2.classList.add('active'); tbEl2.setAttribute('data-mode', 'back'); }
  // Nav
  document.querySelectorAll('.nav-v2-item').forEach(function(n) { n.classList.remove('active-nav'); });
  var navBtn = document.getElementById('v2nav-' + viewName);
  if (navBtn) navBtn.classList.add('active-nav');
  var backBtn = document.getElementById('v2-back-btn');
  if (backBtn) backBtn.classList.add('visible');
  v2CurrentView = viewName;
  // Hide sanctuaire
  var sanctEl2 = document.getElementById('view-sanctuaire');
  if (sanctEl2) sanctEl2.classList.add('no-intro');
  // Transition to target
  _v2TransitionTo('view-' + viewName, { onShow: function() {
    if (sanctEl2) sanctEl2.classList.remove('active');
    if (viewName === 'wird' && typeof renderWird === 'function') setTimeout(renderWird, 60);
    if (viewName === 'checklist' && typeof renderLevel === 'function') renderLevel(typeof currentLevel !== 'undefined' ? currentLevel : 1);
    if (viewName === 'progression' && typeof renderProgression === 'function') renderProgression();
  }});
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

    _v2TransitionTo('view-' + view, { onShow: function() {
      if (view === 'wird' && typeof renderWird === 'function') setTimeout(renderWird, 50);
      if (view === 'checklist' && typeof renderLevel === 'function') setTimeout(function() { renderLevel(typeof currentLevel !== 'undefined' ? currentLevel : 1); }, 50);
      if (view === 'progression' && typeof renderProgression === 'function') setTimeout(renderProgression, 50);
      if (view === 'ramadan' && typeof renderRamadan === 'function') setTimeout(renderRamadan, 50);
      if (view === 'resume' && typeof renderResume === 'function') setTimeout(renderResume, 50);
    }});
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
  window.Capacitor           = Capacitor;
})();

function v2OpenSettings() {
  const T = V2_I18N[V2_LANG] || V2_I18N.fr;
  const isRTL = T.dir === 'rtl';
  const sheet = document.createElement('div');
  sheet.id = 'v2-settings-sheet';
  sheet.style.cssText = 'position:fixed;inset:0;background:rgba(10,10,10,0.88);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);z-index:3000;display:flex;align-items:flex-end;justify-content:center;animation:backdropV2 0.3s ease forwards;';
  const ramadanActive = typeof ramadanState !== 'undefined' && ramadanState.active;
  const debugSection = NIYYAH_DEBUG ? '<div style="margin-top:14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:16px;"><div style="font-size:12px;letter-spacing:0.28em;color:rgba(255,255,255,0.55);text-transform:uppercase;font-family:Cormorant Garamond,serif;margin-bottom:10px;text-align:center;">🔧 DEBUG</div><button onclick="safeSetItem(\'niyyah_regarde_available_today\',\'true\');showToast(\'Regarde active\');document.getElementById(\'v2-settings-sheet\').remove();" style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.55);font-size:12px;cursor:pointer;margin-bottom:8px;">[DEBUG] Activer Regarde</button><button onclick="document.getElementById(\'v2-settings-sheet\').remove();regardeOpen();" style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.55);font-size:12px;cursor:pointer;">[DEBUG] Lancer Regarde maintenant</button><button onclick="document.getElementById(\'v2-settings-sheet\').remove();openFinJournee();" style="width:100%;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.04);color:rgba(255,255,255,0.55);font-size:12px;cursor:pointer;margin-top:8px;">[DEBUG] Forcer Fin de Journée</button></div>' : '';
  sheet.innerHTML = `
    <div style="width:100%;max-width:480px;max-height:calc(100vh - env(safe-area-inset-top,0px));overflow-y:auto;background:#111;border-radius:22px 22px 0 0;padding:calc(env(safe-area-inset-top,0px) + 26px) 22px calc(32px + env(safe-area-inset-bottom));border-top:1px solid rgba(212,175,55,0.14);animation:sheetV2 0.4s cubic-bezier(0.23,1,0.32,1) forwards;direction:${T.dir};">
      <div style="width:38px;height:3px;background:rgba(255,255,255,0.1);border-radius:2px;margin:0 auto 22px;"></div>
      <div style="font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.22em;text-transform:uppercase;color:#D4AF37;text-align:center;margin-bottom:22px;">${T.settings_title}</div>

      <!-- LANGUE -->
      <div style="margin-bottom:14px;">
        <div style="font-size:12px;letter-spacing:0.28em;color:rgba(212,175,55,0.65);text-transform:uppercase;font-family:'Cormorant Garamond',serif;margin-bottom:10px;text-align:center;">${T.settings_lang}</div>
        <div style="display:flex;gap:8px;justify-content:center;">
          <button id="v2-lang-fr" onclick="v2SetLanguage('fr')"
            style="padding:9px 20px;border-radius:100px;border:1px solid ${V2_LANG==='fr'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.1)'};background:${V2_LANG==='fr'?'rgba(212,175,55,0.1)':'none'};color:${V2_LANG==='fr'?'#D4AF37':'rgba(240,234,214,0.5)'};font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;">
            FR
          </button>
          <button id="v2-lang-en" onclick="v2SetLanguage('en')"
            style="padding:9px 20px;border-radius:100px;border:1px solid ${V2_LANG==='en'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.1)'};background:${V2_LANG==='en'?'rgba(212,175,55,0.1)':'none'};color:${V2_LANG==='en'?'#D4AF37':'rgba(240,234,214,0.5)'};font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.15em;cursor:pointer;transition:all 0.2s;">
            EN
          </button>
          <button id="v2-lang-ar" onclick="v2SetLanguage('ar')"
            style="padding:9px 20px;border-radius:100px;border:1px solid ${V2_LANG==='ar'?'rgba(212,175,55,0.5)':'rgba(255,255,255,0.1)'};background:${V2_LANG==='ar'?'rgba(212,175,55,0.1)':'none'};color:${V2_LANG==='ar'?'#D4AF37':'rgba(240,234,214,0.5)'};font-family:'Amiri',serif;font-size:15px;cursor:pointer;transition:all 0.2s;">
            عربي
          </button>
        </div>
      </div>

      <!-- AUTRES RÉGLAGES -->
      <div style="background:#1a1a1a;border:1px solid rgba(255,255,255,0.05);border-radius:14px;overflow:hidden;margin-bottom:14px;">
        <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <div style="display:flex;gap:8px;">
            <button onclick="if(typeof toggleTheme==='function')toggleTheme();document.getElementById('v2-settings-sheet').remove();"
              style="flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.1);background:none;color:rgba(240,234,214,0.6);font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.15em;cursor:pointer;">
              ${T.settings_theme}
            </button>
          </div>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;"
          onclick="document.getElementById('v2-settings-sheet').remove();localStorage.removeItem('niyyah_coords');showCityInput();">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;color:rgba(240,234,214,0.7);">📍 ${t('settings_city')}</div>
            <div style="font-size:12px;color:rgba(240,234,214,0.55);">${_prayerCity || '—'}</div>
          </div>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);cursor:pointer;"
          onclick="if(typeof toggleRamadanMode==='function'){toggleRamadanMode();document.getElementById('v2-settings-sheet').remove();}">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;color:rgba(240,234,214,0.7);">${T.settings_ramadan}</div>
            <div style="font-size:12px;color:rgba(245,166,35,0.6);">${ramadanActive ? '✓' : ''}</div>
          </div>
        </div>
        <div style="padding:14px 16px;border-bottom:1px solid rgba(255,255,255,0.04);">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;color:rgba(240,234,214,0.7);">🤫 ${t('silence_settings')}</div>
            <select onchange="safeSetItem('niyyah_silence_day',this.value)" style="background:#222;color:#D4AF37;border:1px solid rgba(212,175,55,0.3);border-radius:8px;padding:6px 10px;font-size:12px;font-family:var(--sans);outline:none;">
              <option value="none" ${(localStorage.getItem('niyyah_silence_day')||'none')==='none'?'selected':''}>Aucun</option>
              <option value="1" ${localStorage.getItem('niyyah_silence_day')==='1'?'selected':''}>Lundi</option>
              <option value="2" ${localStorage.getItem('niyyah_silence_day')==='2'?'selected':''}>Mardi</option>
              <option value="3" ${localStorage.getItem('niyyah_silence_day')==='3'?'selected':''}>Mercredi</option>
              <option value="4" ${localStorage.getItem('niyyah_silence_day')==='4'?'selected':''}>Jeudi</option>
              <option value="5" ${localStorage.getItem('niyyah_silence_day')==='5'?'selected':''}>Vendredi</option>
              <option value="6" ${localStorage.getItem('niyyah_silence_day')==='6'?'selected':''}>Samedi</option>
              <option value="0" ${localStorage.getItem('niyyah_silence_day')==='0'?'selected':''}>Dimanche</option>
            </select>
          </div>
        </div>
        <div style="padding:14px 16px;cursor:pointer;"
          onclick="if(typeof confirmReset==='function'){confirmReset();document.getElementById('v2-settings-sheet').remove();}">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <div style="font-size:14px;color:rgba(240,234,214,0.55);">${T.settings_reset}</div>
            <div style="font-size:12px;color:rgba(240,234,214,0.55);">${T.settings_privacy}</div>
          </div>
        </div>
      </div>


      <div style="display:flex;gap:8px;margin-top:8px;">
        <button onclick="niyyahExportData()" style="flex:1;padding:12px;border-radius:14px;border:1px solid rgba(200,168,75,0.25);background:rgba(200,168,75,0.04);color:#C8A84A;font-family:var(--serif);font-size:13px;cursor:pointer;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round" style="vertical-align:middle;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M7 10l5 5 5-5"/><path d="M12 15V3"/></svg>${t('settings_export')}
        </button>
        <button onclick="document.getElementById('niyyahImportInput').click()" style="flex:1;padding:12px;border-radius:14px;border:1px solid rgba(200,168,75,0.25);background:rgba(200,168,75,0.04);color:#C8A84A;font-family:var(--serif);font-size:13px;cursor:pointer;">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#C8A84A" stroke-width="1.5" stroke-linecap="round" style="vertical-align:middle;margin-right:4px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="M17 8l-5-5-5 5"/><path d="M12 3v12"/></svg>${t('settings_import')}
        </button>
        <input type="file" id="niyyahImportInput" accept=".json" style="display:none" onchange="niyyahImportData(this)">
      </div>

      <div style="padding:14px 16px;cursor:pointer;margin-top:8px;background:rgba(255,60,60,0.04);border:1px solid rgba(255,60,60,0.15);border-radius:14px;"
        onclick="if(confirm('${t('settings_delete_confirm1').replace(/'/g,"\\'")}')){if(confirm('${t('settings_delete_confirm2').replace(/'/g,"\\'")}')){localStorage.clear();location.reload();}}">
        <div style="font-size:13px;color:rgba(255,80,80,0.6);text-align:center;">${t('settings_delete_all')}</div>
      </div>

      <div style="margin-top:14px;background:#1a1a1a;border:1px solid rgba(255,255,255,0.05);border-radius:14px;padding:16px;">
        <div style="font-size:12px;letter-spacing:0.28em;color:rgba(212,175,55,0.65);text-transform:uppercase;font-family:'Cormorant Garamond',serif;margin-bottom:10px;text-align:center;">${T.settings_mentions}</div>
        <div style="font-family:'Cormorant Garamond',serif;font-size:12px;color:rgba(240,234,214,0.55);line-height:1.6;text-align:${isRTL ? 'right' : 'left'};">${T.mentions_text}</div>
      </div>

      ${debugSection}

      <div style="text-align:center;padding:8px;font-size:12px;color:rgba(240,234,214,0.55);font-family:'Cormorant Garamond',serif;letter-spacing:0.2em;margin-bottom:12px;">NIYYAH V2.0 · بِسْمِ اللَّهِ</div>

      <button onclick="document.getElementById('v2-settings-sheet').remove();"
        style="width:100%;padding:13px;border-radius:100px;border:1px solid rgba(255,255,255,0.07);background:none;color:rgba(240,234,214,0.55);font-family:'Cormorant Garamond',serif;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;cursor:pointer;">
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
    mInput.style.fontFamily = isRTL ? "'Amiri', serif" : "'Cormorant Garamond', serif";
  }

  const opts = document.getElementById('v2-intention-opts');
  opts.innerHTML = '';
  T.intentions.forEach((opt) => {
    const btn = document.createElement('button');
    btn.className = 'intention-opt-v2';
    btn.textContent = opt;
    btn.style.direction = (V2_I18N[V2_LANG] || V2_I18N.fr).dir;
    btn.style.fontFamily = V2_LANG === 'ar' ? "'Amiri', serif" : "'Cormorant Garamond', serif";
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
      _holdOverlay.innerHTML = '<svg class="hold-ring" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="rgba(200,168,75,0.15)" stroke-width="2"/><circle class="hold-ring-fill" cx="16" cy="16" r="14" fill="none" stroke="#C8A84A" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="87.96" stroke-dashoffset="87.96"/></svg><span class="hold-hint" style="opacity:0;">' + t('hold_hint') + '</span>';
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

  // 5ème intention cachée — إخلاص (streak >= 30, premium only)
  var _ikhlasStreak = 0;
  try { _ikhlasStreak = JSON.parse(localStorage.getItem('spiritual_history') || '{}').streak || 0; } catch(e) {}
  if (_ikhlasStreak >= 30 && typeof isPremium === 'function' && isPremium()) {
    var ikhlasUnlocked = localStorage.getItem('niyyah_ikhlas_unlocked');
    var ikhlasBtn = document.createElement('button');
    ikhlasBtn.className = 'intention-opt-v2 intention-ikhlas';
    var ikhlasTexts = { fr: 'إخلاص — La sincérité pure', en: 'إخلاص — Pure sincerity', ar: 'الإِخْلَاصُ — صِدْقُ الْقَلْبِ' };
    ikhlasBtn.textContent = ikhlasTexts[V2_LANG] || ikhlasTexts.fr;
    ikhlasBtn.style.cssText = 'direction:' + (V2_I18N[V2_LANG] || V2_I18N.fr).dir + ';font-family:"Amiri",serif;font-size:16px;border:2px solid #C8A84A !important;box-shadow:0 0 12px rgba(200,168,75,0.3);';
    // First unlock animation
    if (!ikhlasUnlocked) {
      ikhlasBtn.style.display = 'none';
      setTimeout(function() {
        var flash = document.createElement('div');
        flash.style.cssText = 'position:fixed;inset:0;background:#C8A84A;z-index:99999;pointer-events:none;opacity:1;transition:opacity 0.8s ease;';
        document.body.appendChild(flash);
        setTimeout(function() { flash.style.opacity = '0'; }, 200);
        setTimeout(function() {
          flash.remove();
          ikhlasBtn.style.display = '';
          ikhlasBtn.style.animation = 'intentionGlow 1.5s ease-in-out infinite';
          if (navigator.vibrate) navigator.vibrate(800);
          var unlockMsg = document.createElement('div');
          unlockMsg.style.cssText = 'text-align:center;font-family:"Cormorant Garamond",serif;font-size:14px;font-style:italic;color:#C8A84A;padding:8px 0;animation:fadeSlideV2 0.8s ease forwards;';
          unlockMsg.textContent = t('ikhlas_earned');
          opts.insertBefore(unlockMsg, ikhlasBtn);
          setTimeout(function() { ikhlasBtn.style.animation = ''; }, 4500);
        }, 1000);
        safeSetItem('niyyah_ikhlas_unlocked', '1');
      }, 500);
    }
    // Hold logic for ikhlas
    var _ikTimer = null, _ikHint = null, _ikOv = null;
    function _ikStart(e) {
      e.preventDefault();
      opts.querySelectorAll('.intention-opt-v2').forEach(function(b) { b.classList.remove('sel-v2', 'intention-pressing'); var o = b.querySelector('.hold-overlay'); if (o) o.remove(); });
      ikhlasBtn.classList.add('intention-pressing');
      ikhlasBtn.style.position = 'relative'; ikhlasBtn.style.overflow = 'hidden';
      if (navigator.vibrate) navigator.vibrate(30);
      _ikOv = document.createElement('div');
      _ikOv.className = 'hold-overlay';
      _ikOv.innerHTML = '<svg class="hold-ring" width="32" height="32" viewBox="0 0 32 32"><circle cx="16" cy="16" r="14" fill="none" stroke="rgba(200,168,75,0.15)" stroke-width="2"/><circle class="hold-ring-fill" cx="16" cy="16" r="14" fill="none" stroke="#C8A84A" stroke-width="2.5" stroke-linecap="round" stroke-dasharray="87.96" stroke-dashoffset="87.96"/></svg><span class="hold-hint" style="opacity:0;">' + t('hold_hint') + '</span>';
      ikhlasBtn.appendChild(_ikOv);
      requestAnimationFrame(function() { var f = _ikOv.querySelector('.hold-ring-fill'); if (f) f.style.strokeDashoffset = '0'; });
      _ikHint = setTimeout(function() { var h = ikhlasBtn.querySelector('.hold-hint'); if (h) h.style.opacity = '1'; }, 500);
      _ikTimer = setTimeout(function() {
        if (_ikOv && _ikOv.parentNode) _ikOv.remove(); _ikOv = null;
        if (_ikHint) clearTimeout(_ikHint);
        ikhlasBtn.classList.remove('intention-pressing');
        ikhlasBtn.classList.add('sel-v2');
        document.getElementById('v2-custom-intention').value = '';
        if (navigator.vibrate) navigator.vibrate([50, 30, 50, 30, 500]);
        ikhlasBtn.classList.add('intention-confirmed-glow');
        var ring = document.createElement('div'); ring.className = 'intention-rotate-ring'; ikhlasBtn.appendChild(ring);
        setTimeout(function() { ikhlasBtn.classList.add('intention-glow-fadeout'); setTimeout(function() { ikhlasBtn.classList.remove('intention-confirmed-glow', 'intention-glow-fadeout'); if (ring.parentNode) ring.remove(); }, 500); }, 2000);
      }, 3000);
    }
    function _ikCancel() { if (_ikTimer) { clearTimeout(_ikTimer); _ikTimer = null; } if (_ikHint) { clearTimeout(_ikHint); _ikHint = null; } if (_ikOv && _ikOv.parentNode) _ikOv.remove(); _ikOv = null; ikhlasBtn.classList.remove('intention-pressing'); }
    ikhlasBtn.addEventListener('touchstart', _ikStart, { passive: false });
    ikhlasBtn.addEventListener('touchend', _ikCancel);
    ikhlasBtn.addEventListener('touchcancel', _ikCancel);
    ikhlasBtn.addEventListener('mousedown', _ikStart);
    ikhlasBtn.addEventListener('mouseup', _ikCancel);
    ikhlasBtn.addEventListener('mouseleave', _ikCancel);
    opts.appendChild(ikhlasBtn);
  }

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
    msg.textContent = t('tawba_door');
    var chip = document.getElementById('v2-intention-chip');
    if (chip && chip.parentNode) chip.parentNode.insertBefore(msg, chip);
    else {
      var orbWrapEl = document.getElementById('orb-wrap-v2');
      if (orbWrapEl && orbWrapEl.nextSibling) orbWrapEl.parentNode.insertBefore(msg, orbWrapEl.nextSibling);
    }
  }
}

function renderLevelStripCondensed() {
  var el = document.getElementById('level-strip-condensed');
  if (!el) return;
  var lvl = LEVELS.find(function(l) { return l.id === currentLevel; });
  if (!lvl) return;
  var pct = Math.round(getLevelProgress(currentLevel));
  var secTotal = lvl.sections.length;
  var secDoneCount = 0;
  for (var i = 0; i < secTotal; i++) {
    var sec = lvl.sections[i];
    var allDone = sec.items.every(function(item) {
      try { return isItemDone(item, state); } catch(e) { return item.type === 'counter' ? (state[item.id] || 0) >= item.target : !!state[item.id]; }
    });
    if (allDone) secDoneCount++;
  }
  el.innerHTML = '<div class="lvl-strip-name">' + lvl.title.toUpperCase() + '</div>'
    + '<div class="lvl-strip-meta">' + secDoneCount + '/' + secTotal + ' · ' + pct + '%</div>'
    + '<div class="lvl-strip-track"><div class="lvl-strip-fill" style="width:' + pct + '%;"></div></div>';
}
function _getPrenom() {
  var p = localStorage.getItem('niyyah_prenom');
  return (p && p.trim()) ? p.trim() : '';
}
function niyyahExportData() {
  var data = {};
  for (var i = 0; i < localStorage.length; i++) {
    var key = localStorage.key(i);
    if (key && (key.indexOf('niyyah') === 0 || key.indexOf('spiritual') === 0 || key.indexOf('ramadan') === 0 || key.indexOf('nafs') === 0)) {
      data[key] = localStorage.getItem(key);
    }
  }
  var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  var a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'niyyah-backup-' + new Date().toISOString().split('T')[0] + '.json';
  a.click();
  URL.revokeObjectURL(a.href);
  if (typeof showToast === 'function') showToast(t('export_done'));
}
function niyyahImportData(input) {
  if (!input.files || !input.files[0]) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    try {
      var data = JSON.parse(e.target.result);
      var keys = Object.keys(data);
      if (!keys.length) { showToast(t('import_empty')); return; }
      if (!confirm(t('import_confirm').replace('{n}',keys.length))) return;
      keys.forEach(function(k) { try { localStorage.setItem(k, data[k]); } catch(ex) {} });
      showToast(t('import_done'));
      setTimeout(function() { location.reload(); }, 1000);
    } catch(ex) {
      showToast(t('import_invalid'));
    }
  };
  reader.readAsText(input.files[0]);
  input.value = '';
}
var ITEMS_I18N = {
  en: {
    wird_matin:{l:'Morning Wird',s:'Ayat al-Kursi, Muawwidhat\u2026'},wird_soir:{l:'Evening Wird',s:'Al-Mulk\u2026'},
    ayat_kursi:{l:'Ayat al-Kursi after prayer',s:'Protection verse \u2014 recite after each salah'},
    basmala:{l:'Bismillah before every action',s:'Eating, leaving, starting \u2014 Bismillah'},
    witr:{l:'Witr Prayer',s:'1 or 3 rakaat after Isha'},
    shukr:{l:'Tafakkur: contemplate 3 blessings',s:'Health, being Muslim, safety\u2026 meditate on 3 concrete blessings from Allah today'},
    sunnah_fajr:{l:'Sunnah Fajr',s:'2 rakaat before Fajr \u2014 the Prophet \uFDFA never abandoned them'},
    jumua:{l:'Jumua \u2726'},
    mosquee:{l:'Prayer at the mosque',s:'27 times the reward of praying alone'},
    sunnah_prieres:{l:'Supererogatory prayers',s:'Rawatib: 2 before Fajr, 4 before Dhuhr, 2 after, 2 after Maghrib, 2 after Isha'},
    istighfar:{l:'Istighfar',s:'SubhanAllah \u00d7 33, Al-Hamdulillah \u00d7 33, Allahu Akbar \u00d7 33 + La ilaha illallah'},
    tasbih:{l:'Full Tasbih',s:'SubhanAllah \u00b7 Al-Hamdulillah \u00b7 Allahu Akbar'},
    doua_soi:{l:'Du\u2019a for yourself',s:'My Lord, I am in dire need of whatever good You send down to me'},
    doua1:{l:'Du\u2019a for your parents',s:'My Lord, have mercy on them as they raised me when I was small'},
    doua2:{l:'Du\u2019a for your family',s:'Our Lord, grant us from our spouses and offspring the joy of our eyes'},
    doua_morts:{l:'Du\u2019a for the deceased',s:'Our Lord, forgive us and our brothers who preceded us in faith'},
    doua_oumma:{l:'Du\u2019a for the Ummah',s:'O Allah, improve the condition of Muslims everywhere'},
    hadith1:{l:'Hadith of the day',s:'Read and memorize 1 hadith'},
    sira:{l:'Life of the Prophet \u00b7',s:'10 min of Sira reading'},
    quran_read:{l:'Quran reading',s:'At least 1 page per day'},
    arabic:{l:'Arabic learning',s:'10 min \u00b7 Vocabulary or grammar'},
    vie_prophetes:{l:'Lives of the Prophets',s:'Ibrahim, Moussa, Issa\u2026'},
    vie_compagnons:{l:'Lives of the Companions',s:'Abu Bakr, Omar, Othman, Ali\u2026'},
    fiqh_jour:{l:'Jurisprudence \u2014 1 rule of the day',s:'Learn 1 fiqh rule today'},
    savais_tu:{l:'Did you know?',s:'An Islamic culture fact'},
    coran_ecoute:{l:'Listen to the Quran',s:'10-15 min of recitation'},
    podcast:{l:'Islamic podcast',s:'10 min of beneficial listening'},
    sunnah_jejune:{l:'Sunnah fasting',s:'Monday and/or Thursday'},
    tahajjud:{l:'Qiyam al-Layl',s:'2 rakaat in the last third of the night'},
    sadaqa:{l:'Charity (Sadaqa)',s:'Even a smile or a kind word'},
    salam:{l:'Give Salam',s:'Spread peace to 3 people today'},
    silaturahm:{l:'Maintain family ties',s:'Call or visit a relative'},
    maruf:{l:'Enjoin good (Amr bil ma\u2019ruf)',s:'Ibn Taymiyya: the very identity of the Ummah'},
    kind_act:{l:'Act of kindness',s:'A good deed with no expectation'},
    ziyara:{l:'Visit a sick person or a brother',s:'One of the 6 rights of a Muslim'},
    pardon:{l:'Forgive someone',s:'Even if they didn\u2019t ask for it'},
    w_fatiha:{l:'Al-Fatiha',s:'Surah 1 \u2014 The Opening'},
    w_ayat_kursi:{l:'Ayat al-Kursi',s:'Protection \u2014 1 time'},
    w_ikhlass_m:{l:'Al-Ikhlass \u00d7 3',s:'Equals one third of the Quran'},w_ikhlass_s:{l:'Al-Ikhlass \u00d7 3',s:'Equals one third of the Quran'},
    w_falaq_m:{l:'Al-Falaq \u00d7 3',s:'Protection against evil'},w_falaq_s:{l:'Al-Falaq \u00d7 3',s:'Protection against evil'},
    w_nas_m:{l:'An-Nas \u00d7 3',s:'Protection against the evil eye'},w_nas_s:{l:'An-Nas \u00d7 3',s:'Protection against the evil eye'},
    w_sabah1:{l:'Morning du\u2019a',s:'We have entered the morning \u2014 1 time'},
    w_istighfar_m:{l:'Istighfar \u00d7 3',s:'Astaghfirullah \u00d7 3'},
    w_salawat_m:{l:'Salawat \u00d7 10',s:'Allahumma salli ala Muhammad \u00d7 10'},
    w_baqara285:{l:'Al-Baqara 285-286',s:'Suffices against all harm'},
    w_masa1:{l:'Evening du\u2019a',s:'We have entered the evening \u2014 1 time'},
    w_aouzu:{l:'Seeking refuge',s:'Protection from punishment \u2014 3 times'},
    w_mulk:{l:'Surah Al-Mulk',s:'Protection in the grave'},
    w_kafirun:{l:'Al-Kafirun',s:'Before sleeping \u2014 1 time'}
  },
  ar: {
    wird_matin:{l:'\u0648\u0650\u0631\u0652\u062F\u064F \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D',s:'\u0622\u064A\u064E\u0629\u064F \u0627\u0644\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651\u060C \u0627\u0644\u0645\u064F\u0639\u064E\u0648\u0651\u0650\u0630\u0627\u062A\u2026'},wird_soir:{l:'\u0648\u0650\u0631\u0652\u062F\u064F \u0627\u0644\u0645\u064E\u0633\u0627\u0621',s:'\u0633\u064F\u0648\u0631\u064E\u0629\u064F \u0627\u0644\u0645\u064F\u0644\u0652\u0643\u2026'},
    ayat_kursi:{l:'\u0622\u064A\u064E\u0629\u064F \u0627\u0644\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651 \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0635\u0651\u064E\u0644\u0627\u0629',s:'\u0622\u064A\u064E\u0629\u064F \u0627\u0644\u062D\u0650\u0641\u0652\u0638'},
    basmala:{l:'\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064E\u0647 \u0642\u064E\u0628\u0652\u0644\u064E \u0643\u064F\u0644\u0651\u0650 \u0641\u0650\u0639\u0652\u0644',s:'\u0627\u0644\u0623\u064E\u0643\u0652\u0644\u060C \u0627\u0644\u062E\u064F\u0631\u064F\u0648\u062C\u060C \u0627\u0644\u0628\u064E\u062F\u0652\u0621'},
    witr:{l:'\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0648\u0650\u062A\u0652\u0631',s:'\u0631\u064E\u0643\u0652\u0639\u064E\u0629 \u0623\u064E\u0648\u0652 \u062B\u064E\u0644\u0627\u062B \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0639\u0650\u0634\u0627\u0621'},
    shukr:{l:'\u062A\u064E\u0641\u064E\u0643\u0651\u064F\u0631: \u062A\u064E\u0623\u064E\u0645\u0651\u064F\u0644 \u0663 \u0646\u0650\u0639\u064E\u0645',s:'\u0627\u0644\u0635\u0651\u0650\u062D\u0651\u064E\u0629\u060C \u0627\u0644\u0625\u0650\u0633\u0652\u0644\u0627\u0645\u060C \u0627\u0644\u0623\u064E\u0645\u0627\u0646'},
    sunnah_fajr:{l:'\u0633\u064F\u0646\u0651\u064E\u0629\u064F \u0627\u0644\u0641\u064E\u062C\u0652\u0631',s:'\u0631\u064E\u0643\u0652\u0639\u064E\u062A\u0627\u0646\u0650 \u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631'},
    mosquee:{l:'\u0627\u0644\u0635\u0651\u064E\u0644\u0627\u0629\u064F \u0641\u0650\u064A \u0627\u0644\u0645\u064E\u0633\u0652\u062C\u0650\u062F',s:'\u0627\u0644\u062C\u064E\u0645\u0627\u0639\u064E\u0629 \u062A\u064E\u0641\u0652\u0636\u064F\u0644\u064F \u0628\u0640\u0662\u0667 \u062F\u064E\u0631\u064E\u062C\u064E\u0629'},
    hadith1:{l:'\u062D\u064E\u062F\u0650\u064A\u062B\u064F \u0627\u0644\u064A\u064E\u0648\u0652\u0645',s:'\u0627\u0642\u0652\u0631\u064E\u0623\u0652 \u0648\u0627\u062D\u0652\u0641\u064E\u0638\u0652 \u062D\u064E\u062F\u0650\u064A\u062B\u064B\u0627'},
    sira:{l:'\u0627\u0644\u0633\u0651\u0650\u064A\u0631\u064E\u0629\u064F \u0627\u0644\u0646\u0651\u064E\u0628\u064E\u0648\u0650\u064A\u0651\u064E\u0629',s:'\u0661\u0660 \u062F\u064E\u0642\u0627\u0626\u0650\u0642 \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u0650\u0631\u0627\u0621\u064E\u0629'},
    quran_read:{l:'\u0642\u0650\u0631\u0627\u0621\u064E\u0629\u064F \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646',s:'\u0635\u064E\u0641\u0652\u062D\u064E\u0629 \u0648\u0627\u062D\u0650\u062F\u064E\u0629 \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0623\u064E\u0642\u064E\u0644\u0651'},
    arabic:{l:'\u062A\u064E\u0639\u064E\u0644\u0651\u064F\u0645\u064F \u0627\u0644\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u0651\u064E\u0629',s:'\u0661\u0660 \u062F\u064E\u0642\u0627\u0626\u0650\u0642'},
    sadaqa:{l:'\u0627\u0644\u0635\u0651\u064E\u062F\u064E\u0642\u064E\u0629',s:'\u062D\u064E\u062A\u0651\u064E\u0649 \u0627\u0644\u0627\u0628\u0652\u062A\u0650\u0633\u0627\u0645\u064E\u0629'},
    salam:{l:'\u0625\u0650\u0644\u0652\u0642\u0627\u0621\u064F \u0627\u0644\u0633\u0651\u064E\u0644\u0627\u0645',s:'\u0627\u0646\u0652\u0634\u064F\u0631\u0650 \u0627\u0644\u0633\u0651\u064E\u0644\u0627\u0645\u064E'},
    tahajjud:{l:'\u0642\u0650\u064A\u0627\u0645\u064F \u0627\u0644\u0644\u0651\u064E\u064A\u0652\u0644',s:'\u0631\u064E\u0643\u0652\u0639\u064E\u062A\u0627\u0646\u0650 \u0641\u0650\u064A \u0627\u0644\u062B\u0651\u064F\u0644\u064F\u062B\u0650 \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631'},
    pardon:{l:'\u0627\u0644\u0639\u064E\u0641\u0652\u0648',s:'\u062D\u064E\u062A\u0651\u064E\u0649 \u0644\u064E\u0648\u0652 \u0644\u064E\u0645\u0652 \u064A\u064E\u0637\u0652\u0644\u064F\u0628\u0652\u0647'},
    w_fatiha:{l:'\u0627\u0644\u0641\u0627\u062A\u0650\u062D\u064E\u0629',s:'\u0633\u064F\u0648\u0631\u064E\u0629 \u0661 \u2014 \u0627\u0644\u0641\u064E\u062A\u0652\u062D'},
    w_ayat_kursi:{l:'\u0622\u064A\u064E\u0629\u064F \u0627\u0644\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651',s:'\u062D\u0650\u0641\u0652\u0638 \u2014 \u0645\u064E\u0631\u0651\u064E\u0629'},
    w_ikhlass_m:{l:'\u0627\u0644\u0625\u0650\u062E\u0652\u0644\u0627\u0635 \u00d7\u0663',s:'\u062A\u064E\u0639\u0652\u062F\u0650\u0644\u064F \u062B\u064F\u0644\u064F\u062B\u064E \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646'},w_ikhlass_s:{l:'\u0627\u0644\u0625\u0650\u062E\u0652\u0644\u0627\u0635 \u00d7\u0663',s:'\u062A\u064E\u0639\u0652\u062F\u0650\u0644\u064F \u062B\u064F\u0644\u064F\u062B\u064E \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646'},
    w_falaq_m:{l:'\u0627\u0644\u0641\u064E\u0644\u064E\u0642 \u00d7\u0663',s:'\u062D\u0650\u0645\u0627\u064A\u064E\u0629\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u0634\u0651\u064E\u0631'},w_falaq_s:{l:'\u0627\u0644\u0641\u064E\u0644\u064E\u0642 \u00d7\u0663',s:'\u062D\u0650\u0645\u0627\u064A\u064E\u0629\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u0634\u0651\u064E\u0631'},
    w_nas_m:{l:'\u0627\u0644\u0646\u0651\u0627\u0633 \u00d7\u0663',s:'\u062D\u0650\u0645\u0627\u064A\u064E\u0629\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u0639\u064E\u064A\u0652\u0646'},w_nas_s:{l:'\u0627\u0644\u0646\u0651\u0627\u0633 \u00d7\u0663',s:'\u062D\u0650\u0645\u0627\u064A\u064E\u0629\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u0639\u064E\u064A\u0652\u0646'},
    w_sabah1:{l:'\u062F\u064F\u0639\u0627\u0621\u064F \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D',s:'\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u0627 \u2014 \u0645\u064E\u0631\u0651\u064E\u0629'},
    w_istighfar_m:{l:'\u0627\u0633\u0652\u062A\u0650\u063A\u0652\u0641\u0627\u0631 \u00d7\u0663',s:'\u0623\u064E\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0644\u0651\u064E\u0647 \u00d7\u0663'},
    w_salawat_m:{l:'\u0635\u064E\u0644\u064E\u0648\u0627\u062A \u00d7\u0661\u0660',s:'\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0635\u064E\u0644\u0651\u0650 \u0639\u064E\u0644\u064E\u0649 \u0645\u064F\u062D\u064E\u0645\u0651\u064E\u062F'},
    w_baqara285:{l:'\u0627\u0644\u0628\u064E\u0642\u064E\u0631\u064E\u0629 \u0662\u0668\u0665-\u0662\u0668\u0666',s:'\u062A\u064E\u0643\u0652\u0641\u0650\u064A \u0645\u0650\u0646\u0652 \u0643\u064F\u0644\u0651\u0650 \u0636\u064F\u0631\u0651'},
    w_masa1:{l:'\u062F\u064F\u0639\u0627\u0621\u064F \u0627\u0644\u0645\u064E\u0633\u0627\u0621',s:'\u0623\u064E\u0645\u0652\u0633\u064E\u064A\u0652\u0646\u0627 \u2014 \u0645\u064E\u0631\u0651\u064E\u0629'},
    w_aouzu:{l:'\u0627\u0644\u0627\u0633\u0652\u062A\u0650\u0639\u0627\u0630\u064E\u0629',s:'\u062D\u0650\u0645\u0627\u064A\u064E\u0629\u064C \u0645\u0650\u0646\u064E \u0627\u0644\u0639\u064E\u0630\u0627\u0628 \u2014 \u0663 \u0645\u064E\u0631\u0651\u0627\u062A'},
    w_mulk:{l:'\u0633\u064F\u0648\u0631\u064E\u0629\u064F \u0627\u0644\u0645\u064F\u0644\u0652\u0643',s:'\u062D\u0650\u0645\u0627\u064A\u064E\u0629\u064C \u0641\u0650\u064A \u0627\u0644\u0642\u064E\u0628\u0652\u0631'},
    w_kafirun:{l:'\u0627\u0644\u0643\u0627\u0641\u0650\u0631\u064F\u0648\u0646',s:'\u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u0646\u0651\u064E\u0648\u0652\u0645 \u2014 \u0645\u064E\u0631\u0651\u064E\u0629'}
  }
};
function tI(item, field) {
  var lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  if (lang === 'fr') return item[field] || '';
  var map = ITEMS_I18N[lang];
  if (map && map[item.id] && map[item.id][field === 'label' ? 'l' : 's']) return map[item.id][field === 'label' ? 'l' : 's'];
  return item[field] || '';
}
var TAWBA_I18N = {
  en: [
    {title:'The door was open.',sub:'You came back. That\u2019s all that matters.',verse:'Say: O My servants who have transgressed, do not despair of the mercy of Allah.',ref:'Quran 39:53'},
    {title:'Every return is beloved.',sub:'More beloved to Allah than a thousand perfect starts. You haven\u2019t failed \u2014 you\u2019re on the way.',verse:'Allah rejoices more at the repentance of His servant than one who finds his lost mount.',ref:'Bukhari 6309'},
    {title:'Your path was waiting.',sub:'Absence has not erased what you built. It was waiting where you left it.',verse:'Every son of Adam makes mistakes. The best are those who return.',ref:'Tirmidhi 2499'},
    {title:'Ibn Qayyim al-Jawziyya',sub:'The heart that returns is more beautiful than one that never left \u2014 for it knows the value of the path.',verse:'Sincere regret is half of repentance. The other half is not stopping.',ref:'Madarij al-Salikin'},
    {title:'Al-Ghazali',sub:'It is not the fall that defines the believer. It is how he rises \u2014 gently, without shame.',verse:'The door of repentance is open until the sun rises from the West.',ref:'Ihya Ulum al-Din'},
    {title:'Welcome back.',sub:'Every day is a new chance to love Allah. Today is that day.',verse:'Allah extends His hand at night for the repentance of the one who sinned during the day.',ref:'Muslim 2759'}
  ],
  ar: [
    {title:'\u0627\u0644\u0628\u0627\u0628\u064F \u0643\u0627\u0646\u064E \u0645\u064E\u0641\u0652\u062A\u064F\u0648\u062D\u064B\u0627.',sub:'\u0639\u064F\u062F\u0652\u062A\u064E. \u0647\u064E\u0630\u0627 \u0645\u0627 \u064A\u064E\u0647\u064F\u0645\u0651.',verse:'\u0642\u064F\u0644\u0652 \u064A\u0627 \u0639\u0650\u0628\u0627\u062F\u0650\u064A\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A\u0646\u064E \u0623\u064E\u0633\u0652\u0631\u064E\u0641\u064F\u0648\u0627 \u0639\u064E\u0644\u064E\u0649 \u0623\u064E\u0646\u0652\u0641\u064F\u0633\u0650\u0647\u0650\u0645\u0652 \u0644\u0627 \u062A\u064E\u0642\u0652\u0646\u064E\u0637\u064F\u0648\u0627 \u0645\u0650\u0646\u0652 \u0631\u064E\u062D\u0652\u0645\u064E\u0629\u0650 \u0627\u0644\u0644\u0651\u064E\u0647.',ref:'\u0627\u0644\u0632\u0645\u0631 39:53'},
    {title:'\u0643\u064F\u0644\u0651\u064F \u0639\u064E\u0648\u0652\u062F\u064E\u0629\u064D \u0645\u064E\u062D\u0652\u0628\u064F\u0648\u0628\u064E\u0629.',sub:'\u0623\u064E\u062D\u064E\u0628\u0651\u064F \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647 \u0645\u0650\u0646\u0652 \u0623\u064E\u0644\u0652\u0641\u0650 \u0628\u0650\u062F\u0627\u064A\u064E\u0629\u064D \u0645\u064F\u062B\u0627\u0644\u0650\u064A\u0651\u064E\u0629.',verse:'\u0644\u064E\u0644\u0651\u064E\u0647\u064F \u0623\u064E\u0641\u0652\u0631\u064E\u062D\u064F \u0628\u0650\u062A\u064E\u0648\u0652\u0628\u064E\u0629\u0650 \u0639\u064E\u0628\u0652\u062F\u0650\u0647 \u0645\u0650\u0645\u0651\u064E\u0646\u0652 \u0648\u064E\u062C\u064E\u062F\u064E \u0631\u0627\u062D\u0650\u0644\u064E\u062A\u064E\u0647.',ref:'\u0627\u0644\u0628\u062E\u0627\u0631\u064A 6309'},
    {title:'\u0637\u064E\u0631\u0650\u064A\u0642\u064F\u0643 \u0643\u0627\u0646\u064E \u0628\u0650\u0627\u0646\u0652\u062A\u0650\u0638\u0627\u0631\u0650\u0643.',sub:'\u0627\u0644\u063A\u0650\u064A\u0627\u0628\u064F \u0644\u064E\u0645\u0652 \u064A\u064E\u0645\u0652\u062D\u064F \u0645\u0627 \u0628\u064E\u0646\u064E\u064A\u0652\u062A.',verse:'\u0643\u064F\u0644\u0651\u064F \u0627\u0628\u0652\u0646\u0650 \u0622\u062F\u064E\u0645\u064E \u062E\u064E\u0637\u0651\u0627\u0621. \u0648\u062E\u064E\u064A\u0652\u0631\u064F\u0647\u064F\u0645\u0652 \u0627\u0644\u062A\u0651\u064E\u0648\u0651\u0627\u0628\u064F\u0648\u0646.',ref:'\u0627\u0644\u062A\u0631\u0645\u0630\u064A 2499'},
    {title:'\u0627\u0628\u0652\u0646\u064F \u0627\u0644\u0642\u064E\u064A\u0651\u0650\u0645',sub:'\u0627\u0644\u0642\u064E\u0644\u0652\u0628\u064F \u0627\u0644\u0639\u0627\u0626\u0650\u062F\u064F \u0623\u064E\u062C\u0652\u0645\u064E\u0644\u064F \u0645\u0650\u0646\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0644\u064E\u0645\u0652 \u064A\u064E\u063A\u0650\u0628\u0652.',verse:'\u0627\u0644\u0646\u0651\u064E\u062F\u064E\u0645\u064F \u0646\u0650\u0635\u0652\u0641\u064F \u0627\u0644\u062A\u0651\u064E\u0648\u0652\u0628\u064E\u0629.',ref:'\u0645\u064E\u062F\u0627\u0631\u0650\u062C \u0627\u0644\u0633\u0651\u0627\u0644\u0650\u0643\u0650\u064A\u0646'},
    {title:'\u0627\u0644\u063A\u064E\u0632\u0627\u0644\u0650\u064A',sub:'\u0644\u064E\u064A\u0652\u0633\u064E \u0627\u0644\u0633\u0651\u064F\u0642\u064F\u0648\u0637\u064F \u0645\u0627 \u064A\u064F\u0639\u064E\u0631\u0651\u0650\u0641\u064F \u0627\u0644\u0645\u064F\u0624\u0652\u0645\u0650\u0646\u064E. \u0628\u064E\u0644\u0652 \u0643\u064E\u064A\u0652\u0641\u064E \u064A\u064E\u0646\u0652\u0647\u064E\u0636.',verse:'\u0628\u0627\u0628\u064F \u0627\u0644\u062A\u0651\u064E\u0648\u0652\u0628\u064E\u0629\u0650 \u0645\u064E\u0641\u0652\u062A\u064F\u0648\u062D\u064C \u062D\u064E\u062A\u0651\u064E\u0649 \u062A\u064E\u0637\u0652\u0644\u064F\u0639\u064E \u0627\u0644\u0634\u0651\u064E\u0645\u0652\u0633\u064F \u0645\u0650\u0646\u064E \u0627\u0644\u0645\u064E\u063A\u0652\u0631\u0650\u0628.',ref:'\u0625\u0650\u062D\u0652\u064A\u0627\u0621 \u0639\u064F\u0644\u064F\u0648\u0645 \u0627\u0644\u062F\u0651\u0650\u064A\u0646'},
    {title:'\u0623\u064E\u0647\u0652\u0644\u064B\u0627 \u0628\u0650\u0639\u064E\u0648\u0652\u062F\u064E\u062A\u0650\u0643.',sub:'\u0643\u064F\u0644\u0651\u064F \u064A\u064E\u0648\u0652\u0645\u064D \u0641\u064F\u0631\u0652\u0635\u064E\u0629\u064C \u062C\u064E\u062F\u0650\u064A\u062F\u064E\u0629.',verse:'\u064A\u064E\u0628\u0652\u0633\u064F\u0637\u064F \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u064A\u064E\u062F\u064E\u0647\u064F \u0628\u0650\u0627\u0644\u0644\u0651\u064E\u064A\u0652\u0644\u0650 \u0644\u0650\u064A\u064E\u062A\u064F\u0648\u0628\u064E \u0645\u064F\u0633\u0650\u064A\u0621\u064F \u0627\u0644\u0646\u0651\u064E\u0647\u0627\u0631.',ref:'\u0645\u0633\u0644\u0645 2759'}
  ]
};
function tTawba(msg, idx) {
  var lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  if (lang === 'fr' || !TAWBA_I18N[lang] || !TAWBA_I18N[lang][idx]) return msg;
  var tr = TAWBA_I18N[lang][idx];
  return { title: tr.title, sub: tr.sub, verse: tr.verse, ref: tr.ref, color: msg.color, exclusive: msg.exclusive };
}
var DEFIS_I18N = {en:{1:'Pray Fajr on time \u2014 5 days',2:'Pray Fajr on time \u2014 7 days',3:'5 prayers on time \u2014 3 days',4:'5 prayers on time \u2014 5 days',5:'Bismillah before every act \u2014 5 days',6:'Alhamdulillah after every meal \u2014 5d',7:'Morning dhikr \u2014 5 days straight',8:'Evening dhikr \u2014 5 days straight',9:'Morning AND evening dhikr \u2014 3 days',10:'Meditated Al-Fatiha \u2014 7 days',11:'3 Quran verses per day \u2014 5 days',12:'Pray with focus \u2014 3 days',13:'No phone before Fajr \u2014 5 days',14:'Slow wudu with intention \u2014 5d',15:'2 Names of Allah memorized/day \u2014 5d',16:'Smile at every person \u2014 3 days',17:'Say salam first \u2014 5 days',18:'1 sincere du\u2019a per day \u2014 7 days',19:'1 act of sadaqa \u2014 5 days',20:'Avoid an idle word \u2014 5 days',21:'Wake 10min before Fajr \u2014 3 days',22:'No social media after Isha \u2014 5d',23:'1 bedtime invocation \u2014 7 days',24:'Help someone without being asked \u2014 3d',25:'SubhanAllah \u00d733 after Fajr \u2014 5 days',26:'Read 1 Quran page/day \u2014 5 days',27:'Memorize 1 travel du\u2019a',28:'Astaghfirullah \u00d7100 \u2014 3 days',29:'No lying \u2014 3 days',30:'1 min tafakkur after Fajr \u2014 5d',31:'Salawat \u00d710 after each prayer \u2014 3d',32:'Give up 1 bad habit \u2014 7 days',33:'No backbiting \u2014 3 days',34:'2 rakaat Doha \u2014 5 days',35:'2 rakaat Doha \u2014 7 days',36:'Tahajjud 2 rakaat \u2014 5 nights',37:'100 istighfar per day \u2014 5 days',38:'Al-Kahf on Friday \u2014 2 weeks',39:'Fast Monday AND Thursday',40:'5 prayers in congregation \u2014 3 days',41:'Tahajjud 2 rakaat \u2014 3 nights',42:'Ayat Al-Kursi after each prayer \u2014 5d',43:'Complete Rawatib \u2014 5 days',44:'Memorize 1 verse/day \u2014 5 days',45:'Memorize Surah Ya-Sin',46:'Fast Ayyam Al-Bid (13-14-15)',47:'Last third of night du\u2019a \u2014 3 nights',48:'Complete morning + evening wird \u2014 7d',49:'100 salawat per day \u2014 5 days',50:'Surah Al-Mulk every night \u2014 7 nights',51:'Fast 3 days this month',52:'Visit the mosque 5 prayers/day \u2014 3d',53:'Memorize the 99 Names of Allah \u2014 10',54:'Recite Surah Al-Kahf + Al-Mulk \u2014 Friday',55:'Charity every day \u2014 7 days',56:'Read 1 juz of Quran \u2014 7 days',57:'Visit a sick person',58:'Tasbih 1000/day \u2014 3 days',59:'7 days complete wird + Rawatib',60:'Memorize last 10 surahs',61:'1 hadith memorized per day \u2014 5 days',62:'10 min Sira per day \u2014 7 days',63:'Arabic study 10 min/day \u2014 5 days',64:'Listen to Quran recitation 15min/day \u2014 5d',65:'Memorize Surah Ar-Rahman',66:'Study 1 fiqh topic per day \u2014 5 days',67:'Tahajjud 7 nights straight',68:'Fast every Monday \u2014 1 month',69:'Memorize Surah Al-Mulk',70:'100 salawat morning + evening \u2014 7d',71:'Read 2 juz per week \u2014 2 weeks',72:'Night prayer + Witr every night \u2014 7',73:'All Rawatib + Doha + Witr \u2014 7 days',74:'Complete fast Mon+Thu \u2014 2 weeks',75:'Memorize Ayat Al-Kursi + its tafsir',76:'Sadaqa every day \u2014 14 days',77:'Islamic podcast 20min/day \u2014 7 days',78:'Visit mosque + help someone \u2014 5d',79:'Read 10 hadiths per day \u2014 7 days',80:'Memorize du\u2019as of the Prophets \u2014 5',81:'Complete wird + Rawatib + night \u2014 5d',82:'Fast Ayyam Al-Bid 2 months straight',83:'Give up all screens after Isha \u2014 7d',84:'Daily Quran reading 30min \u2014 7 days',85:'Pray every fard in the mosque \u2014 7d',86:'Complete Sunnah fasting Mon+Thu \u2014 1 month',87:'Total silence 1h after Fajr \u2014 5 days',88:'Memorize Surah Al-Waqia',89:'10 minutes tafakkur per day \u2014 7 days',90:'Reconcile with someone',91:'Fast 6 days of Shawwal',92:'Read entire Sira this month',93:'Memorize Surah Yasin entire',94:'30 sadaqas in 30 days',95:'Quran completion in 1 month',96:'Hajj-level devotion week \u2014 all acts 7d',97:'Intensive night prayer \u2014 last third \u2014 7',98:'Full social fast \u2014 7 days',99:'5 prayers + tahajjud + doha \u2014 7d',100:'Week of total devotion \u2014 all acts'},ar:{1:'\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u0641\u0650\u064A \u0648\u064E\u0642\u0652\u062A\u0650\u0647\u0627 \u2014 \u0665 \u0623\u064E\u064A\u0651\u0627\u0645',2:'\u0635\u064E\u0644\u0627\u0629\u064F \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u0641\u0650\u064A \u0648\u064E\u0642\u0652\u062A\u0650\u0647\u0627 \u2014 \u0667 \u0623\u064E\u064A\u0651\u0627\u0645',3:'\u0665 \u0635\u064E\u0644\u064E\u0648\u0627\u062A \u0641\u0650\u064A \u0648\u064E\u0642\u0652\u062A\u0650\u0647\u0627 \u2014 \u0663 \u0623\u064E\u064A\u0651\u0627\u0645',4:'\u0665 \u0635\u064E\u0644\u064E\u0648\u0627\u062A \u0641\u0650\u064A \u0648\u064E\u0642\u0652\u062A\u0650\u0647\u0627 \u2014 \u0665 \u0623\u064E\u064A\u0651\u0627\u0645',5:'\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064E\u0647 \u0642\u064E\u0628\u0652\u0644\u064E \u0643\u064F\u0644\u0651\u0650 \u0641\u0650\u0639\u0652\u0644 \u2014 \u0665 \u0623\u064E\u064A\u0651\u0627\u0645',6:'\u0627\u0644\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647 \u0628\u064E\u0639\u0652\u062F\u064E \u0643\u064F\u0644\u0651\u0650 \u0648\u064E\u062C\u0652\u0628\u064E\u0629 \u2014 \u0665',7:'\u0623\u064E\u0630\u0652\u0643\u0627\u0631 \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D \u2014 \u0665 \u0623\u064E\u064A\u0651\u0627\u0645',8:'\u0623\u064E\u0630\u0652\u0643\u0627\u0631 \u0627\u0644\u0645\u064E\u0633\u0627\u0621 \u2014 \u0665 \u0623\u064E\u064A\u0651\u0627\u0645',9:'\u0623\u064E\u0630\u0652\u0643\u0627\u0631 \u0627\u0644\u0635\u0651\u064E\u0628\u0627\u062D \u0648\u0627\u0644\u0645\u064E\u0633\u0627\u0621 \u2014 \u0663',10:'\u0627\u0644\u0641\u0627\u062A\u0650\u062D\u064E\u0629 \u0628\u0650\u062A\u064E\u062F\u064E\u0628\u0651\u064F\u0631 \u2014 \u0667 \u0623\u064E\u064A\u0651\u0627\u0645',11:'\u0663 \u0622\u064A\u0627\u062A \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0665',12:'\u0635\u064E\u0644\u0627\u0629 \u0628\u0650\u062E\u064F\u0634\u064F\u0648\u0639 \u2014 \u0663 \u0623\u064E\u064A\u0651\u0627\u0645',13:'\u0628\u0650\u0644\u0627 \u0647\u0627\u062A\u0650\u0641 \u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u2014 \u0665',14:'\u0648\u064F\u0636\u064F\u0648\u0621 \u0628\u0650\u0646\u0650\u064A\u0651\u064E\u0629 \u2014 \u0665',15:'\u062D\u0650\u0641\u0652\u0638 \u0627\u0633\u0652\u0645\u064E\u064A\u0652\u0646 \u0644\u0650\u0644\u0651\u064E\u0647 \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0665',16:'\u0627\u0628\u0652\u062A\u0650\u0633\u0627\u0645\u064E\u0629 \u0644\u0650\u0643\u064F\u0644\u0651\u0650 \u0634\u064E\u062E\u0652\u0635 \u2014 \u0663',17:'\u0625\u0650\u0644\u0652\u0642\u0627\u0621 \u0627\u0644\u0633\u0651\u064E\u0644\u0627\u0645 \u0623\u064E\u0648\u0651\u064E\u0644\u064B\u0627 \u2014 \u0665',18:'\u062F\u064F\u0639\u0627\u0621 \u0635\u0627\u062F\u0650\u0642 \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0667',19:'\u0635\u064E\u062F\u064E\u0642\u064E\u0629 \u2014 \u0665 \u0623\u064E\u064A\u0651\u0627\u0645',20:'\u062A\u064E\u062C\u064E\u0646\u0651\u064F\u0628 \u0643\u064E\u0644\u0650\u0645\u064E\u0629 \u0644\u063A\u0648 \u2014 \u0665',21:'\u0627\u0633\u0652\u062A\u0650\u064A\u0642\u0627\u0638 \u0661\u0660\u062F \u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u2014 \u0663',22:'\u0628\u0650\u0644\u0627 \u0634\u0627\u0634\u0627\u062A \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0639\u0650\u0634\u0627\u0621 \u2014 \u0665',23:'\u062F\u064F\u0639\u0627\u0621 \u0642\u064E\u0628\u0652\u0644\u064E \u0627\u0644\u0646\u0651\u064E\u0648\u0652\u0645 \u2014 \u0667',24:'\u0645\u064F\u0633\u0627\u0639\u064E\u062F\u064E\u0629 \u062F\u064F\u0648\u0646\u064E \u0637\u064E\u0644\u064E\u0628 \u2014 \u0663',25:'\u0633\u064F\u0628\u0652\u062D\u0627\u0646\u064E \u0627\u0644\u0644\u0651\u064E\u0647 \u00d7\u0663\u0663 \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u2014 \u0665',26:'\u0635\u064E\u0641\u0652\u062D\u064E\u0629 \u0642\u064F\u0631\u0652\u0622\u0646 \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0665',27:'\u062D\u0650\u0641\u0652\u0638 \u062F\u064F\u0639\u0627\u0621 \u0627\u0644\u0633\u0651\u064E\u0641\u064E\u0631',28:'\u0623\u064E\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0644\u0651\u064E\u0647 \u00d7\u0661\u0660\u0660 \u2014 \u0663',29:'\u0628\u0650\u0644\u0627 \u0643\u064E\u0630\u0650\u0628 \u2014 \u0663 \u0623\u064E\u064A\u0651\u0627\u0645',30:'\u062A\u064E\u0641\u064E\u0643\u0651\u064F\u0631 \u0661\u062F \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u2014 \u0665',31:'\u0635\u064E\u0644\u064E\u0648\u0627\u062A \u00d7\u0661\u0660 \u0628\u064E\u0639\u0652\u062F\u064E \u0643\u064F\u0644\u0651\u0650 \u0635\u064E\u0644\u0627\u0629 \u2014 \u0663',32:'\u062A\u064E\u0631\u0652\u0643 \u0639\u0627\u062F\u064E\u0629 \u0633\u064E\u064A\u0651\u0650\u0626\u064E\u0629 \u2014 \u0667',33:'\u0628\u0650\u0644\u0627 \u063A\u0650\u064A\u0628\u064E\u0629 \u2014 \u0663 \u0623\u064E\u064A\u0651\u0627\u0645',34:'\u0635\u064E\u0644\u0627\u0629 \u0627\u0644\u0636\u0651\u064F\u062D\u064E\u0649 \u2014 \u0665',35:'\u0635\u064E\u0644\u0627\u0629 \u0627\u0644\u0636\u0651\u064F\u062D\u064E\u0649 \u2014 \u0667',36:'\u062A\u064E\u0647\u064E\u062C\u0651\u064F\u062F \u2014 \u0665 \u0644\u064E\u064A\u0627\u0644\u064D',37:'\u0661\u0660\u0660 \u0627\u0633\u0652\u062A\u0650\u063A\u0652\u0641\u0627\u0631 \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0665',38:'\u0627\u0644\u0643\u064E\u0647\u0652\u0641 \u064A\u064E\u0648\u0652\u0645\u064E \u0627\u0644\u062C\u064F\u0645\u064F\u0639\u064E\u0629 \u2014 \u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639\u064E\u064A\u0652\u0646',39:'\u0635\u0650\u064A\u0627\u0645 \u0627\u0644\u0627\u062B\u0652\u0646\u064E\u064A\u0652\u0646 \u0648\u0627\u0644\u062E\u064E\u0645\u0650\u064A\u0633',40:'\u0665 \u0635\u064E\u0644\u064E\u0648\u0627\u062A \u062C\u064E\u0645\u0627\u0639\u064E\u0629 \u2014 \u0663',41:'\u062A\u064E\u0647\u064E\u062C\u0651\u064F\u062F \u2014 \u0663 \u0644\u064E\u064A\u0627\u0644\u064D',42:'\u0622\u064A\u064E\u0629 \u0627\u0644\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651 \u0628\u064E\u0639\u0652\u062F\u064E \u0643\u064F\u0644\u0651\u0650 \u0635\u064E\u0644\u0627\u0629 \u2014 \u0665',43:'\u0627\u0644\u0633\u0651\u064F\u0646\u064E\u0646 \u0627\u0644\u0631\u0651\u064E\u0648\u0627\u062A\u0650\u0628 \u0643\u0627\u0645\u0650\u0644\u064E\u0629 \u2014 \u0665',44:'\u062D\u0650\u0641\u0652\u0638 \u0622\u064A\u064E\u0629/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0665',45:'\u062D\u0650\u0641\u0652\u0638 \u0633\u064F\u0648\u0631\u064E\u0629 \u064A\u0633',46:'\u0635\u0650\u064A\u0627\u0645 \u0627\u0644\u0623\u064E\u064A\u0651\u0627\u0645 \u0627\u0644\u0628\u0650\u064A\u0636',47:'\u062F\u064F\u0639\u0627\u0621 \u0627\u0644\u062B\u0651\u064F\u0644\u064F\u062B \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631 \u2014 \u0663 \u0644\u064E\u064A\u0627\u0644\u064D',48:'\u0648\u0650\u0631\u0652\u062F \u0643\u0627\u0645\u0650\u0644 \u0635\u064E\u0628\u0627\u062D+\u0645\u064E\u0633\u0627\u0621 \u2014 \u0667',49:'\u0661\u0660\u0660 \u0635\u064E\u0644\u064E\u0648\u0627\u062A \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0665',50:'\u0627\u0644\u0645\u064F\u0644\u0652\u0643 \u0643\u064F\u0644\u0651\u064E \u0644\u064E\u064A\u0652\u0644\u064E\u0629 \u2014 \u0667',51:'\u0635\u0650\u064A\u0627\u0645 \u0663 \u0623\u064E\u064A\u0651\u0627\u0645 \u0647\u0630\u0627 \u0627\u0644\u0634\u0651\u064E\u0647\u0652\u0631',52:'\u0665 \u0635\u064E\u0644\u064E\u0648\u0627\u062A \u0641\u0650\u064A \u0627\u0644\u0645\u064E\u0633\u0652\u062C\u0650\u062F \u2014 \u0663',53:'\u062D\u0650\u0641\u0652\u0638 \u0623\u064E\u0633\u0652\u0645\u0627\u0621 \u0627\u0644\u0644\u0651\u064E\u0647 \u0627\u0644\u062D\u064F\u0633\u0652\u0646\u064E\u0649 \u2014 \u0661\u0660',54:'\u0627\u0644\u0643\u064E\u0647\u0652\u0641+\u0627\u0644\u0645\u064F\u0644\u0652\u0643 \u064A\u064E\u0648\u0652\u0645\u064E \u0627\u0644\u062C\u064F\u0645\u064F\u0639\u064E\u0629',55:'\u0635\u064E\u062F\u064E\u0642\u064E\u0629 \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0667',56:'\u062C\u064F\u0632\u0652\u0621 \u0645\u0650\u0646\u064E \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646 \u2014 \u0667',57:'\u0632\u0650\u064A\u0627\u0631\u064E\u0629 \u0645\u064E\u0631\u0650\u064A\u0636',58:'\u062A\u064E\u0633\u0652\u0628\u0650\u064A\u062D \u0661\u0660\u0660\u0660/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0663',59:'\u0667 \u0623\u064E\u064A\u0651\u0627\u0645 \u0648\u0650\u0631\u0652\u062F+\u0631\u064E\u0648\u0627\u062A\u0650\u0628',60:'\u062D\u0650\u0641\u0652\u0638 \u0622\u062E\u0650\u0631 \u0661\u0660 \u0633\u064F\u0648\u064E\u0631',61:'\u062D\u064E\u062F\u0650\u064A\u062B/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0665',62:'\u0633\u0650\u064A\u0631\u064E\u0629 \u0661\u0660\u062F/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0667',63:'\u0639\u064E\u0631\u064E\u0628\u0650\u064A\u0651\u064E\u0629 \u0661\u0660\u062F/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0665',64:'\u0627\u0633\u0652\u062A\u0650\u0645\u0627\u0639 \u0642\u064F\u0631\u0652\u0622\u0646 \u0661\u0665\u062F/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0665',65:'\u062D\u0650\u0641\u0652\u0638 \u0633\u064F\u0648\u0631\u064E\u0629 \u0627\u0644\u0631\u0651\u064E\u062D\u0652\u0645\u0646',66:'\u0641\u0650\u0642\u0652\u0647 \u0645\u064E\u0633\u0652\u0623\u064E\u0644\u064E\u0629/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0665',67:'\u062A\u064E\u0647\u064E\u062C\u0651\u064F\u062F \u0667 \u0644\u064E\u064A\u0627\u0644\u064D \u0645\u064F\u062A\u064E\u062A\u0627\u0644\u0650\u064A\u064E\u0629',68:'\u0635\u0650\u064A\u0627\u0645 \u0643\u064F\u0644\u0651\u0650 \u0627\u062B\u0652\u0646\u064E\u064A\u0652\u0646 \u2014 \u0634\u064E\u0647\u0652\u0631',69:'\u062D\u0650\u0641\u0652\u0638 \u0633\u064F\u0648\u0631\u064E\u0629 \u0627\u0644\u0645\u064F\u0644\u0652\u0643',70:'\u0661\u0660\u0660 \u0635\u064E\u0644\u064E\u0648\u0627\u062A \u0635\u064E\u0628\u0627\u062D+\u0645\u064E\u0633\u0627\u0621 \u2014 \u0667',71:'\u062C\u064F\u0632\u0652\u0621\u0627\u0646/\u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639 \u2014 \u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639\u064E\u064A\u0652\u0646',72:'\u0642\u0650\u064A\u0627\u0645+\u0648\u0650\u062A\u0652\u0631 \u0643\u064F\u0644\u0651\u064E \u0644\u064E\u064A\u0652\u0644\u064E\u0629 \u2014 \u0667',73:'\u0631\u064E\u0648\u0627\u062A\u0650\u0628+\u0636\u064F\u062D\u064E\u0649+\u0648\u0650\u062A\u0652\u0631 \u2014 \u0667',74:'\u0635\u0650\u064A\u0627\u0645 \u0627\u062B\u0652\u0646\u064E\u064A\u0652\u0646+\u062E\u064E\u0645\u0650\u064A\u0633 \u2014 \u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639\u064E\u064A\u0652\u0646',75:'\u062D\u0650\u0641\u0652\u0638 \u0622\u064A\u064E\u0629 \u0627\u0644\u0643\u064F\u0631\u0652\u0633\u0650\u064A\u0651+\u062A\u064E\u0641\u0652\u0633\u0650\u064A\u0631',76:'\u0635\u064E\u062F\u064E\u0642\u064E\u0629 \u064A\u064E\u0648\u0652\u0645\u0650\u064A\u0651\u064B\u0627 \u2014 \u0661\u0664',77:'\u0628\u064F\u0648\u062F\u0643\u0627\u0633\u062A \u0625\u0650\u0633\u0652\u0644\u0627\u0645\u0650\u064A \u0662\u0660\u062F/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0667',78:'\u0645\u064E\u0633\u0652\u062C\u0650\u062F+\u0645\u064F\u0633\u0627\u0639\u064E\u062F\u064E\u0629 \u2014 \u0665',79:'\u0661\u0660 \u0623\u064E\u062D\u0627\u062F\u0650\u064A\u062B/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0667',80:'\u062D\u0650\u0641\u0652\u0638 \u0623\u064E\u062F\u0652\u0639\u0650\u064A\u064E\u0629 \u0627\u0644\u0623\u064E\u0646\u0652\u0628\u0650\u064A\u0627\u0621 \u2014 \u0665',81:'\u0648\u0650\u0631\u0652\u062F+\u0631\u064E\u0648\u0627\u062A\u0650\u0628+\u0642\u0650\u064A\u0627\u0645 \u2014 \u0665',82:'\u0627\u0644\u0628\u0650\u064A\u0636 \u0634\u064E\u0647\u0652\u0631\u064E\u064A\u0652\u0646',83:'\u0628\u0650\u0644\u0627 \u0634\u0627\u0634\u0627\u062A \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0639\u0650\u0634\u0627\u0621 \u2014 \u0667',84:'\u0642\u0650\u0631\u0627\u0621\u064E\u0629 \u0642\u064F\u0631\u0652\u0622\u0646 \u0663\u0660\u062F/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0667',85:'\u0643\u064F\u0644\u0651\u064F \u0641\u064E\u0631\u0652\u0636 \u0641\u0650\u064A \u0627\u0644\u0645\u064E\u0633\u0652\u062C\u0650\u062F \u2014 \u0667',86:'\u0635\u0650\u064A\u0627\u0645 \u0627\u062B\u0652\u0646\u064E\u064A\u0652\u0646+\u062E\u064E\u0645\u0650\u064A\u0633 \u2014 \u0634\u064E\u0647\u0652\u0631',87:'\u0635\u064E\u0645\u0652\u062A \u062A\u0627\u0645\u0651 \u0633\u0627\u0639\u064E\u0629 \u0628\u064E\u0639\u0652\u062F\u064E \u0627\u0644\u0641\u064E\u062C\u0652\u0631 \u2014 \u0665',88:'\u062D\u0650\u0641\u0652\u0638 \u0633\u064F\u0648\u0631\u064E\u0629 \u0627\u0644\u0648\u0627\u0642\u0650\u0639\u064E\u0629',89:'\u062A\u064E\u0641\u064E\u0643\u0651\u064F\u0631 \u0661\u0660\u062F/\u064A\u064E\u0648\u0652\u0645 \u2014 \u0667',90:'\u0625\u0650\u0635\u0652\u0644\u0627\u062D \u0630\u0627\u062A\u0650 \u0627\u0644\u0628\u064E\u064A\u0652\u0646',91:'\u0635\u0650\u064A\u0627\u0645 \u0666 \u0645\u0650\u0646\u0652 \u0634\u064E\u0648\u0651\u0627\u0644',92:'\u0642\u0650\u0631\u0627\u0621\u064E\u0629 \u0627\u0644\u0633\u0651\u0650\u064A\u0631\u064E\u0629 \u0643\u0627\u0645\u0650\u0644\u064E\u0629',93:'\u062D\u0650\u0641\u0652\u0638 \u0633\u064F\u0648\u0631\u064E\u0629 \u064A\u0633 \u0643\u0627\u0645\u0650\u0644\u064E\u0629',94:'\u0663\u0660 \u0635\u064E\u062F\u064E\u0642\u064E\u0629 \u0641\u0650\u064A \u0663\u0660 \u064A\u064E\u0648\u0652\u0645',95:'\u062E\u064E\u062A\u0652\u0645 \u0627\u0644\u0642\u064F\u0631\u0652\u0622\u0646 \u0641\u0650\u064A \u0634\u064E\u0647\u0652\u0631',96:'\u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639 \u0639\u0650\u0628\u0627\u062F\u064E\u0629 \u0643\u0627\u0645\u0650\u0644 \u2014 \u0667',97:'\u0642\u0650\u064A\u0627\u0645 \u0627\u0644\u062B\u0651\u064F\u0644\u064F\u062B \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631 \u2014 \u0667',98:'\u0635\u0650\u064A\u0627\u0645 \u0627\u062C\u0652\u062A\u0650\u0645\u0627\u0639\u0650\u064A\u0651 \u0643\u0627\u0645\u0650\u0644 \u2014 \u0667',99:'\u0665 \u0635\u064E\u0644\u064E\u0648\u0627\u062A+\u062A\u064E\u0647\u064E\u062C\u0651\u064F\u062F+\u0636\u064F\u062D\u064E\u0649 \u2014 \u0667',100:'\u0623\u064F\u0633\u0652\u0628\u064F\u0648\u0639 \u062A\u064E\u0639\u064E\u0628\u0651\u064F\u062F \u0643\u0627\u0645\u0650\u0644'}};
function tD(defi) {
  var lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  if (lang === 'fr' || !DEFIS_I18N[lang] || !DEFIS_I18N[lang][defi.id]) return tD(defi);
  return DEFIS_I18N[lang][defi.id];
}
function updateSanctuaireNextPrayer() {
  var el = document.getElementById('sanctuaire-next-prayer');
  if (!el || !_prayerTimes) { if (el) el.style.display = 'none'; return; }
  var now = new Date();
  var nowMin = now.getHours() * 60 + now.getMinutes();
  var names = ['Fajr','Dhuhr','Asr','Maghrib','Isha'];
  var nextName = null, nextTime = null, diffMin = 0;
  for (var i = 0; i < names.length; i++) {
    var parts = (_prayerTimes[names[i]] || '').replace(/ *\(.*\)/,'').split(':');
    var m = parseInt(parts[0],10) * 60 + parseInt(parts[1],10);
    if (m > nowMin) { nextName = names[i]; nextTime = _prayerTimes[names[i]].substring(0,5); diffMin = m - nowMin; break; }
  }
  if (!nextName) { nextName = 'Fajr'; nextTime = (_prayerTimes['Fajr']||'').substring(0,5); diffMin = (1440 - nowMin) + parseInt((_prayerTimes['Fajr']||'0:0').split(':')[0],10)*60 + parseInt((_prayerTimes['Fajr']||'0:0').split(':')[1],10); }
  var txt = '';
  if (diffMin > 60) txt = nextName + ' \u00b7 ' + nextTime;
  else if (diffMin > 0) txt = nextName + ' ' + t('prayer_in') + ' ' + diffMin + ' min';
  var span = document.getElementById('sanctuaire-prayer-text');
  if (span) span.textContent = txt;
  el.style.display = txt ? 'flex' : 'none';
  el.style.opacity = diffMin <= 60 ? '1' : '0.75';
}
function _dateLocale() {
  var lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  return lang === 'en' ? 'en-US' : lang === 'ar' ? 'ar' : 'fr-FR';
}
function isSilenceDay() {
  var d = localStorage.getItem('niyyah_silence_day');
  if (!d || d === 'none') return false;
  return parseInt(d, 10) === new Date().getDay();
}
function updateSpiritualTitle() {
  var el = document.getElementById('v2-spiritual-title');
  if (!el) return;
  // Salutation 1x/jour avec prénom
  var greetEl = document.getElementById('v2-greeting');
  var lastGreetDate = localStorage.getItem('niyyah_greet_date');
  if (!greetEl && lastGreetDate !== TODAY) {
    var h = new Date().getHours();
    var prenom = _getPrenom();
    var greet = h < 12 ? t('greet_morning') : h < 18 ? t('greet_afternoon') : t('greet_evening');
    if (prenom) greet += ' ' + prenom;
    var gDiv = document.createElement('div');
    gDiv.id = 'v2-greeting';
    gDiv.style.cssText = 'font-family:var(--serif);font-size:20px;font-style:italic;color:rgba(200,168,75,0.7);margin-bottom:8px;opacity:0;animation:obFadeIn 0.8s ease 0.3s forwards;';
    gDiv.textContent = greet;
    el.parentNode.insertBefore(gDiv, el);
    safeSetItem('niyyah_greet_date', TODAY);
  }
  var hist = {};
  try { hist = JSON.parse(localStorage.getItem('spiritual_history') || '{}'); } catch(e) {}
  var streak = hist.streak || 0;
  var totalDays = hist.totalDays || 0;
  var todayDone = getLevelProgress(1) >= 100;
  var streakDisplay = streak + (todayDone ? 1 : 0);
  var totalDisplay = totalDays + (todayDone ? 1 : 0);
  var titles = [
    { min: 365, ar: '\u0627\u0644\u0631\u0651\u064E\u0627\u0633\u0650\u062E\u064F', k: 'sp_rasikh' },
    { min: 180, ar: '\u0627\u0644\u0645\u064F\u062D\u0652\u0633\u0650\u0646\u064F', k: 'sp_muhsin' },
    { min: 90,  ar: '\u0627\u0644\u0645\u064F\u062A\u0651\u064E\u0642\u0650\u064A', k: 'sp_muttaqi' },
    { min: 30,  ar: '\u0627\u0644\u0645\u064F\u0648\u0627\u0638\u0650\u0628\u064F', k: 'sp_muwadib' },
    { min: 7,   ar: '\u0627\u0644\u0645\u064F\u0628\u0652\u062A\u064E\u062F\u0650\u0626\u064F', k: 'sp_mubtadi' },
    { min: 0,   ar: '\u0627\u0644\u0637\u0651\u064E\u0627\u0644\u0650\u0628\u064F', k: 'sp_talib' }
  ];
  var title = titles.find(function(t) { return streakDisplay >= t.min; });
  el.style.display = 'block';
  el.style.marginBottom = '40px';
  el.innerHTML = '<div style="font-family:\'Amiri\',serif;font-size:40px;color:#C8A84A;line-height:1.3;">' + title.ar + '</div>'
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(200,168,75,0.7);letter-spacing:0.5px;margin-top:4px;">' + t(title.k) + '</div>'
    + '<div style="font-family:\'Inter\',var(--sans);font-size:12px;color:rgba(255,255,255,0.55);letter-spacing:1px;margin-top:12px;">' + t('sp_day_streak').replace('{d}',totalDisplay).replace('{s}',streakDisplay) + '</div>';
}
function v2RefreshStats() {
  if (typeof updateSanctuaireNextPrayer === 'function') updateSanctuaireNextPrayer();
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
  // Greeting — phrase du jour + fade-in
  const grEl = document.getElementById('v2-greeting-text');
  if (grEl) {
    grEl.textContent = t('greeting_day_' + new Date().getDay());
    grEl.style.animation = 'none';
    grEl.offsetHeight;
    grEl.style.animation = 'greetingFadeIn 1.5s ease-out 0.3s both';
  }
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

  // Cleanup deprecated Night Companion localStorage
  localStorage.removeItem('niyyah_compagnon_date');
  localStorage.removeItem('niyyah_sagesse_nuit');
  localStorage.removeItem('niyyah_morning_wisdom_shown_date');
  updateFinJourneeCard();
  updateFajrChallenge();
  updateSanctuaireMoment();
  var disclaimerEl = document.getElementById('app-disclaimer');
  if (disclaimerEl) disclaimerEl.textContent = t('disclaimer');
}

function updateFinJourneeCard() {
  var card = document.getElementById('finjournee-card');
  if (!card) return;
  // Determine visibility: Maghrib+1h to Fajr
  var now = new Date();
  var nowMin = now.getHours() * 60 + now.getMinutes();
  var show = false;
  if (_prayerTimes) {
    var _toMin = function(s) { if (!s) return null; var p = s.replace(/ *\(.*\)/,'').split(':'); return parseInt(p[0],10)*60+parseInt(p[1],10); };
    var maghrib = _toMin(_prayerTimes['Maghrib']);
    var fajr = _toMin(_prayerTimes['Fajr']);
    if (maghrib != null && fajr != null) {
      show = (nowMin >= maghrib + 60) || (nowMin < fajr);
    }
  } else {
    // Fallback: 20h-5h if no prayer times
    show = (nowMin >= 1200) || (nowMin < 300);
  }
  if (!show) { card.style.display = 'none'; return; }
  card.style.display = 'block';
  var todayKey = now.toISOString().split('T')[0];
  var done = localStorage.getItem('niyyah_finjournee_date') === todayKey;
  if (done) {
    card.innerHTML = '<img class="finjournee-img" src="assets/cards/card-findejour.webp" alt="Journée fermée" onclick="openFinJourneeConsultation()">';
  } else {
    card.innerHTML = '<img class="finjournee-img" src="assets/cards/card-findejour.webp" alt="Fin de journée" onclick="openFinJournee()">';
  }
}
function openFinJournee() {
  var overlay = document.getElementById('finjournee-overlay');
  if (!overlay) return;
  overlay.style.display = 'block';
  var b1 = document.getElementById('finjournee-b1');
  var b2 = document.getElementById('finjournee-b2');
  var b3 = document.getElementById('finjournee-b3');
  if (b1) b1.value = '';
  if (b2) b2.value = '';
  if (b3) b3.value = '';
}
function closeFinJournee() {
  var overlay = document.getElementById('finjournee-overlay');
  if (overlay) overlay.style.display = 'none';
  var b1 = document.getElementById('finjournee-b1');
  var b2 = document.getElementById('finjournee-b2');
  var b3 = document.getElementById('finjournee-b3');
  if (b1) b1.value = '';
  if (b2) b2.value = '';
  if (b3) b3.value = '';
}
function saveFinJourneeBontes() {
  var b1 = (document.getElementById('finjournee-b1') || {}).value || '';
  var b2 = (document.getElementById('finjournee-b2') || {}).value || '';
  var b3 = (document.getElementById('finjournee-b3') || {}).value || '';
  var bontes = [b1, b2, b3].filter(function(s) { return s.trim().length > 0; });
  if (bontes.length === 0) { alert('Écris au moins une bonté, ou tape Passer.'); return; }
  var today = new Date().toISOString().split('T')[0];
  var entry = { id: 'finjournee_' + today, date: today, time: new Date().toISOString(), bontes: bontes, skipped_bontes: false, completed: false };
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem('niyyah_finjournee_history') || '[]'); } catch(e) {}
  hist.push(entry);
  safeSetItem('niyyah_finjournee_history', JSON.stringify(hist));
  safeSetItem('niyyah_finjournee_date', today);
  showFinJourneeActe2();
}
function skipFinJourneeBontes() {
  var today = new Date().toISOString().split('T')[0];
  var entry = { id: 'finjournee_' + today, date: today, time: new Date().toISOString(), bontes: [], skipped_bontes: true, completed: false };
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem('niyyah_finjournee_history') || '[]'); } catch(e) {}
  hist.push(entry);
  safeSetItem('niyyah_finjournee_history', JSON.stringify(hist));
  safeSetItem('niyyah_finjournee_date', today);
  showFinJourneeActe2();
}
function showFinJourneeActe2() {
  var overlay = document.getElementById('finjournee-overlay');
  if (!overlay) return;
  overlay.innerHTML = '<div class="finjournee-acte2"><div class="finjournee-acte2-text" id="finjournee-q"></div></div>';
  overlay.style.display = 'block';
  var _muhasabaQ = {
    fr: ['Tes cinq pri\u00e8res d\u2019aujourd\u2019hui \u2014 combien ont vraiment rencontr\u00e9 ton c\u0153ur ?','Ta langue a parl\u00e9 toute la journ\u00e9e \u2014 qu\u2019aurais-tu voulu taire ?','\u00c0 qui as-tu peut-\u00eatre fait du mal aujourd\u2019hui, sans le vouloir ?','Qu\u2019est-ce qui, cette journ\u00e9e, t\u2019a \u00e9loign\u00e9 de ton Seigneur sans que tu t\u2019en rendes compte ?','Si cette nuit \u00e9tait la derni\u00e8re, qu\u2019emporterais-tu de cette journ\u00e9e ?','Astaghfirullah.','Je demande pardon \u00e0 Allah.'],
    en: ['Your five prayers today \u2014 how many truly met your heart?','Your tongue spoke all day \u2014 what would you have rather kept silent?','Whom may you have hurt today, without meaning to?','What drew you away from your Lord today without you even noticing?','If tonight were your last, what would you take from this day?','Astaghfirullah.','I ask Allah\u2019s forgiveness.'],
    ar: ['\u0635\u064E\u0644\u064E\u0648\u0627\u062A\u064F\u0643\u064E \u0627\u0644\u062E\u064E\u0645\u0652\u0633 \u0627\u0644\u064A\u064E\u0648\u0652\u0645 \u2014 \u0643\u064E\u0645\u0652 \u0645\u0650\u0646\u0652\u0647\u0627 \u0644\u0627\u0642\u064E\u062A\u0652 \u0642\u064E\u0644\u0652\u0628\u064E\u0643\u064E \u062D\u064E\u0642\u0651\u064B\u0627\u061F','\u0644\u0650\u0633\u0627\u0646\u064F\u0643\u064E \u062A\u064E\u0643\u064E\u0644\u0651\u064E\u0645\u064E \u0637\u064E\u0648\u0627\u0644\u064E \u0627\u0644\u064A\u064E\u0648\u0652\u0645 \u2014 \u0645\u0627\u0630\u0627 \u0643\u064F\u0646\u0652\u062A\u064E \u062A\u064E\u0648\u064E\u062F\u0651\u064F \u0644\u064E\u0648\u0652 \u0633\u064E\u0643\u064E\u062A\u0651\u064E\u061F','\u0645\u064E\u0646\u0652 \u0631\u064F\u0628\u0651\u064E\u0645\u0627 \u0622\u0630\u064E\u064A\u0652\u062A\u064E \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u064E \u062F\u064F\u0648\u0646\u064E \u0642\u064E\u0635\u0652\u062F\u061F','\u0645\u0627 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u0628\u0652\u0639\u064E\u062F\u064E\u0643\u064E \u0639\u064E\u0646\u0652 \u0631\u064E\u0628\u0651\u0650\u0643\u064E \u062F\u064F\u0648\u0646\u064E \u0623\u064E\u0646\u0652 \u062A\u064E\u062F\u0652\u0631\u0650\u064A\u061F','\u0644\u064E\u0648\u0652 \u0643\u0627\u0646\u064E\u062A\u0652 \u0647\u0630\u0650\u0647\u0650 \u0627\u0644\u0644\u0651\u064E\u064A\u0652\u0644\u064E\u0629\u064F \u0627\u0644\u0623\u064E\u062E\u0650\u064A\u0631\u064E\u0629\u060C \u0645\u0627\u0630\u0627 \u062A\u064E\u0623\u0652\u062E\u064F\u0630\u064F \u0645\u0650\u0646\u0652 \u064A\u064E\u0648\u0652\u0645\u0650\u0643\u061F','\u0623\u064E\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0644\u0651\u064E\u0647.','\u0623\u064E\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u064F \u0627\u0644\u0644\u0651\u064E\u0647.']
  };
  var _lang = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
  var questions = _muhasabaQ[_lang] || _muhasabaQ.fr;
  var durations = [8000, 8000, 8000, 8000, 8000, 4000, 4000];
  var el = document.getElementById('finjournee-q');
  var idx = 0;
  function showNext() {
    if (idx >= questions.length) { showFinJourneeActe3(); return; }
    el.style.opacity = '0';
    setTimeout(function() {
      el.textContent = questions[idx];
      el.style.opacity = '1';
      var hold = durations[idx];
      idx++;
      setTimeout(function() {
        el.style.opacity = '0';
        setTimeout(showNext, 1000);
      }, hold - 1000);
    }, idx === 0 ? 100 : 1000);
  }
  showNext();
}
function showFinJourneeActe3() {
  var overlay = document.getElementById('finjournee-overlay');
  if (!overlay) return;
  overlay.innerHTML = '<div class="finjournee-acte2"><div class="finjournee-acte2-text" id="finjournee-a3"></div></div>';
  var el = document.getElementById('finjournee-a3');
  // Phase 1: pardon text
  setTimeout(function() {
    var _a3 = {
      fr: 'Pardonne \u00e0 ceux qui t\u2019ont bless\u00e9 aujourd\u2019hui,<br>dans la mesure o\u00f9 tu le peux.<br><br>Demande pardon \u00e0 Allah pour tes manquements.<br><br>Ferme les yeux.<br>Dors en paix.',
      en: 'Forgive those who hurt you today,<br>as much as you are able.<br><br>Ask Allah\u2019s forgiveness for your shortcomings.<br><br>Close your eyes.<br>Sleep in peace.',
      ar: '\u0633\u0627\u0645\u0650\u062D\u0652 \u0645\u064E\u0646\u0652 \u0622\u0630\u0627\u0643\u064E \u0627\u0644\u064A\u064E\u0648\u0652\u0645\u060C<br>\u0628\u0650\u0642\u064E\u062F\u0652\u0631\u0650 \u0645\u0627 \u062A\u064E\u0633\u0652\u062A\u064E\u0637\u0650\u064A\u0639.<br><br>\u0627\u0633\u0652\u062A\u064E\u063A\u0652\u0641\u0650\u0631\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u064E \u0639\u064E\u0644\u064E\u0649 \u062A\u064E\u0642\u0652\u0635\u0650\u064A\u0631\u0650\u0643.<br><br>\u0623\u064E\u063A\u0652\u0644\u0650\u0642\u0652 \u0639\u064E\u064A\u0652\u0646\u064E\u064A\u0652\u0643.<br>\u0646\u064E\u0645\u0652 \u0628\u0650\u0633\u064E\u0644\u0627\u0645.'
    };
    var _l3 = (typeof V2_LANG !== 'undefined') ? V2_LANG : 'fr';
    el.innerHTML = _a3[_l3] || _a3.fr;
    el.style.opacity = '1';
  }, 100);
  setTimeout(function() { el.style.opacity = '0'; }, 13100);
  // Phase 2: bismillah
  setTimeout(function() {
    el.style.fontSize = '36px';
    el.style.fontFamily = "'Amiri', serif";
    el.style.fontStyle = 'normal';
    el.innerHTML = 'بِسْمِ اللَّهِ';
    el.style.opacity = '1';
  }, 14100);
  setTimeout(function() { el.style.opacity = '0'; }, 17100);
  // Phase 3: mark completed + close
  setTimeout(function() {
    var today = new Date().toISOString().split('T')[0];
    var hist = [];
    try { hist = JSON.parse(localStorage.getItem('niyyah_finjournee_history') || '[]'); } catch(e) {}
    for (var i = hist.length - 1; i >= 0; i--) {
      if (hist[i].date === today) { hist[i].completed = true; break; }
    }
    safeSetItem('niyyah_finjournee_history', JSON.stringify(hist));
    closeFinJournee();
    updateFinJourneeCard();
  }, 18100);
}
function openFinJourneeConsultation() {
  var today = new Date().toISOString().split('T')[0];
  var hist = [];
  try { hist = JSON.parse(localStorage.getItem('niyyah_finjournee_history') || '[]'); } catch(e) {}
  var entry = null;
  for (var i = hist.length - 1; i >= 0; i--) { if (hist[i].date === today) { entry = hist[i]; break; } }
  if (!entry) return;
  var body = '';
  if (entry.skipped_bontes) {
    body = '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;font-style:italic;color:#C8A84A;line-height:1.7;margin-bottom:8px;">' + t('silent_muhasaba') + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(200,168,75,0.6);">Alhamdulillah.</div>';
  } else {
    body = '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:rgba(200,168,75,0.6);margin-bottom:20px;">Ce soir, les 3 bontés qu\'Allah t\'a permis :</div>';
    entry.bontes.forEach(function(b) {
      body += '<div style="font-family:\'Cormorant Garamond\',serif;font-size:20px;font-style:italic;color:#C8A84A;line-height:1.8;">・ ' + b + '</div>';
    });
  }
  var overlay = document.createElement('div');
  overlay.id = 'finjournee-consult';
  overlay.style.cssText = 'position:fixed;inset:0;z-index:10000;background:#000;display:flex;align-items:center;justify-content:center;padding:24px;';
  overlay.innerHTML = '<div style="max-width:320px;text-align:center;">' + body
    + '<button onclick="document.getElementById(\'finjournee-consult\').remove()" style="margin-top:36px;padding:12px 32px;border-radius:100px;border:1px solid rgba(200,168,75,0.3);background:none;color:rgba(200,168,75,0.6);font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;cursor:pointer;" aria-label="Fermer">'+t('modal_close')+'</button>'
    + '</div>';
  overlay.addEventListener('click', function(e) { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
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
      + '<div style="font-family:\'Amiri\',serif;font-size:20px;color:#C8A84A;margin-bottom:4px;">مُحَافِظٌ عَلَى الْفَجْرِ</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-style:italic;color:#E8DCC0;">' + t('fajr_gardien') + '</div>'
      + '</div>';
  } else {
    card.innerHTML = '<div style="background:#1a1a1a;border:1px solid rgba(200,168,75,0.3);border-radius:14px;padding:14px 18px;min-height:90px;box-sizing:border-box;position:relative;display:flex;align-items:center;">'
      + '<div style="display:flex;align-items:center;gap:12px;width:100%;">'
      + '<div><img src="https://nabs881-sketch.github.io/niyyah-app/imagessoleil.webp" alt="Soleil" style="width:60px;height:auto;display:block;flex-shrink:0;mix-blend-mode:screen;"></div>'
      + '<div style="flex:1;text-align:left;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-weight:600;color:#C8A84A;">' + t('fajr_title') + '</div>'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#B0A080;margin-top:2px;">' + t('fajr_day') + ' ' + fajrStreak + ' ' + t('fajr_sur') + ' 30</div>'
      + '</div></div>'
      + '<div style="position:absolute;bottom:0;left:0;right:0;height:3px;background:rgba(200,168,75,0.12);border-radius:0 0 14px 14px;overflow:hidden;">'
      + '<div style="height:100%;width:' + pct + '%;background:linear-gradient(90deg,#C8A84A,#E0C870);transition:width 0.6s ease;"></div>'
      + '</div></div>';
  }
}
function updateSanctuaireMoment() {
  var el = document.getElementById('sanctuaire-moment');
  if (!el) return;
  var wrapper = el.closest('.moment-level-block');
  function _hideBlock() { el.innerHTML = ''; if (wrapper) wrapper.style.display = 'none'; }
  function _showBlock() { if (wrapper) wrapper.style.display = 'block'; }
  // Attendre que prayerTimes soit chargé — mais pas de spinner infini
  if (!_prayerTimes) {
    if (!window._sanctuaireMomentRetryCount) window._sanctuaireMomentRetryCount = 0;
    if (window._sanctuaireMomentRetryCount < 3) {
      window._sanctuaireMomentRetryCount++;
      _showBlock();
      el.innerHTML = '<div style="text-align:center;padding:12px 0;"><div class="prayer-spinner"></div></div>';
      setTimeout(updateSanctuaireMoment, 3000);
    } else {
      _hideBlock();
    }
    return;
  }
  window._sanctuaireMomentRetryCount = 0;
  var block = getCurrentPrayerBlock();
  var blockId = block.id;
  var _blockIcons = { nuit:'🌙', fajr:'🌅', dhuhr:'🌞', asr:'🌇', maghrib:'🌆', isha:'🌙', qiyam:'✨' };
  var _momentsImg = ['fajr','dhuhr','asr','maghrib','isha'];
  var _iconSpan;
  if (_momentsImg.indexOf(blockId) !== -1) {
    _iconSpan = '<div class="moment-icon-img moment-icon-'+blockId+'"></div>';
  } else {
    var _bIcon = _blockIcons[blockId] || '☀️';
    _iconSpan = '<span style="margin-right:8px;">'+_bIcon+'</span>';
  }
  // Nuit et Qiyam — messages spéciaux
  _showBlock();
  if (blockId === 'nuit') {
    el.innerHTML = '<div class="moment-bandeau-nuit">'
      + '<div class="moment-nuit-title">' + t('block_nuit') + '</div>'
      + '<div class="moment-nuit-sub">' + t('bandeau_nuit') + '</div>'
      + '</div>';
    return;
  }
  if (blockId === 'qiyam') {
    var hasLevel4 = state._unlocked && state._unlocked.includes(4);
    var tahajjudDone = hasLevel4 && !!state['tahajjud'];
    var qSub = hasLevel4 ? (tahajjudDone ? '✦ Qiyam al-Layl' : t('bandeau_qiyam')) : 'Dors avec le Witr';
    el.innerHTML = '<div style="text-align:center;padding:8px;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-weight:700;color:#C8A84A;">' + _iconSpan + (hasLevel4 ? t('block_qiyam') : 'La nuit est pour le repos') + '</div>'
      + '<div style="font-family:\'Inter\',var(--sans);font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;">' + qSub + '</div>'
      + (hasLevel4 && !tahajjudDone ? '<button onclick="event.stopPropagation();selectLevel(currentLevel);" ontouchend="event.stopPropagation();event.preventDefault();selectLevel(currentLevel);" style="display:block;width:100%;margin-top:8px;padding:0 20px;height:36px;background:transparent;border:1px solid rgba(200,168,75,0.4);border-radius:10px;color:#C8A84A;font-family:\'Cormorant Garamond\',serif;font-size:13px;font-weight:600;cursor:pointer;">Prier</button>' : '')
      + '</div>';
    return;
  }
  function _isDone(item) { return item.type === 'counter' ? (state[item.id] || 0) >= item.target : !!state[item.id]; }
  var _allUnlocked = LEVELS.filter(function(l) { return state._unlocked && state._unlocked.includes(l.id); })
    .flatMap(function(l) { return l.sections.flatMap(function(s) { return s.items; }); });
  var blockItems = _allUnlocked.filter(function(item) { return item.block === blockId; });
  var blockTotal = blockItems.length;
  var blockDone = blockItems.filter(_isDone).length;
  var blockRemaining = blockTotal - blockDone;
  if (blockTotal === 0) { _hideBlock(); return; }
  var jourItems = _allUnlocked.filter(function(item) { return item.block === 'jour'; });
  var jourDone = jourItems.filter(_isDone).length;
  var jourRemaining = jourItems.length - jourDone;
  var jourLine = '';
  if (jourRemaining > 0 && jourItems.length <= 5) {
    jourLine = '<div style="font-family:\'Inter\',var(--sans);font-size:12px;color:rgba(255,255,255,0.55);margin-top:4px;">+ ' + jourRemaining + ' acte' + (jourRemaining > 1 ? 's' : '') + ' du jour</div>';
  }
  if (blockRemaining === 0) {
    el.innerHTML = '<div style="text-align:center;padding:8px;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-weight:700;color:#C8A84A;">' + _iconSpan + t('bloc_done') + '</div>'
      + '<div style="font-family:\'Inter\',var(--sans);font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;">' + t('bloc_done_sub') + '</div>'
      + jourLine
      + '</div>';
  } else {
    el.innerHTML = '<div style="text-align:center;padding:8px;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:18px;font-weight:700;color:#C8A84A;">' + _iconSpan + block.label + '</div>'
      + '<div style="font-family:\'Inter\',var(--sans);font-size:12px;color:rgba(255,255,255,0.6);margin-top:4px;">' + blockDone + ' ' + (blockDone > 1 ? t('actes_done_p') : t('actes_done')) + ' · ' + blockRemaining + ' ' + (blockRemaining > 1 ? t('actes_left_p') : t('actes_left')) + '</div>'
      + jourLine
      + '<button class="btn-bismillah-moment" onclick="event.stopPropagation();selectLevel(currentLevel);" ontouchend="event.stopPropagation();event.preventDefault();selectLevel(currentLevel);">' + t('btn_continue') + '</button>'
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
      chipText.style.fontFamily = V2_LANG === 'ar' ? "'Amiri', serif" : "'Cormorant Garamond', serif";
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
/* ── Atmosphères basées sur le mois hijri ── */
function applyAtmosphere() {
  var hijriMonth = 1;
  try {
    var fmt = new Intl.DateTimeFormat('en-u-ca-islamic', { month: 'numeric' });
    hijriMonth = parseInt(fmt.format(new Date())) || 1;
  } catch(e) {}
  var atm;
  if (hijriMonth <= 4)       atm = { id: 'layl',  bg: '10,10,10',  gold: '184,160,96' };
  else if (hijriMonth <= 7)  atm = { id: 'fajr',  bg: '26,16,8',   gold: '212,168,67' };
  else if (hijriMonth <= 10) atm = { id: 'nur',   bg: '13,13,10',  gold: '224,200,112' };
  else                       atm = { id: 'tawba', bg: '15,10,8',   gold: '200,149,106' };
  var bgStr = 'rgb(' + atm.bg + ')';
  var goldStr = 'rgb(' + atm.gold + ')';
  var goldAlpha = 'rgba(' + atm.gold + ',0.3)';
  var root = document.documentElement.style;
  root.setProperty('--bg-primary', bgStr);
  root.setProperty('--gold-main', goldStr);
  root.setProperty('--orb-color', goldAlpha);
  root.setProperty('--gold', goldStr);
  root.setProperty('--gold-v2', goldStr);
  root.setProperty('--gold-pale-v2', goldStr);
  document.body.style.background = bgStr;
  applyAtmosphereDOM(bgStr, goldStr, goldAlpha);
}
function applyAtmosphereDOM(bgStr, goldStr, goldAlpha) {
  var sanctuaire = document.getElementById('view-sanctuaire');
  if (sanctuaire) sanctuaire.style.background = bgStr;
  // Orb
  var orbCore = document.getElementById('orb-core-v2');
  if (orbCore) orbCore.style.borderColor = goldAlpha;
  var orbRings = document.querySelectorAll('.orb-ring-v2');
  orbRings.forEach(function(r) { r.style.borderColor = goldAlpha; });
  // Greeting
  var greetText = document.getElementById('v2-greeting-text');
  if (greetText) greetText.style.color = goldStr;
  // Stats
  document.querySelectorAll('.sanct-stat-v2').forEach(function(s) {
    s.style.borderColor = goldAlpha;
  });
  document.querySelectorAll('.sanct-stat-num-v2').forEach(function(s) {
    s.style.color = goldStr;
  });
  // Level strip
  var levelFill = document.getElementById('v2-level-fill');
  if (levelFill) levelFill.style.background = goldStr;
  var levelName = document.getElementById('v2-level-name');
  if (levelName) levelName.style.color = goldStr;
  // Orb CTA
  var orbCta = document.getElementById('orb-cta-v2');
  if (orbCta) orbCta.style.color = goldStr;
  // Chip
  var chip = document.getElementById('v2-intention-chip');
  if (chip) chip.style.borderColor = goldAlpha;
}
function v2Init() {
  checkMidnightReset();
  applyAtmosphere();
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
    langPill0.style.fontFamily = V2_LANG === 'ar' ? "'Amiri', serif" : "'Cormorant Garamond', serif";
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

const NIYYAH_API_URL = 'https://niyyah-api.nabs881.workers.dev';

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
/* ── Regarde — helpers ── */
var _regardeStream = null;

async function regardeOpen() {
  var screen = document.getElementById('regarde-screen');
  var content = document.getElementById('regarde-content');
  if (!screen || !content) return;
  closeRegardeJournal();
  closeRegardeDetail();
  if (typeof closeNiyyahJournal === 'function') closeNiyyahJournal();
  if (typeof closeNiyyahDetail === 'function') closeNiyyahDetail();

  // Init caméra
  try {
    _regardeStream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } }
    });
    content.innerHTML = '<video id="regarde-video" autoplay playsinline muted style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;"></video>'
      + '<button id="regarde-capture-btn" onclick="regardeCapture()" style="position:absolute;bottom:40px;left:50%;transform:translateX(-50%);z-index:10;width:80px;height:80px;border-radius:50%;border:3px solid #C8A84A;background:rgba(200,168,75,0.15);cursor:pointer;display:flex;align-items:center;justify-content:center;"><div style="width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#D4AF37,#B8940A);pointer-events:none;"></div></button>';
    var video = document.getElementById('regarde-video');
    video.srcObject = _regardeStream;
    await video.play();
  } catch(e) {
    content.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:#C8A84A;text-align:center;padding:40px;">' + t('camera_denied') + '</div></div>';
  }

  screen.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function _regardeShowQuestion(content, question) {
  content.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:0 10%;">'
    + '<div id="regarde-question" style="font-family:\'Cormorant Garamond\',serif;font-size:26px;font-style:italic;color:#D4AF37;text-align:center;line-height:1.6;max-width:80%;opacity:0;animation:regardeFadeIn 1.5s ease forwards;">' + question + '</div>'
    + '<div style="display:flex;gap:20px;margin-top:32px;opacity:0;animation:regardeFadeIn 1.5s ease 0.5s forwards;">'
    + '<button id="regarde-btn-star" onclick="regardeToggleStar()" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,175,55,0.3);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:24px;color:#D4AF37;">☆</button>'
    + '<button onclick="regardeRefresh()" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,175,55,0.3);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:24px;color:#D4AF37;">↻</button>'
    + '<button onclick="regardeToggleNote()" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,175,55,0.3);background:transparent;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:24px;color:#D4AF37;">✎</button>'
    + '</div>'
    + '<div id="regarde-note-wrap" style="display:none;width:100%;max-width:80%;margin-top:20px;opacity:0;transition:opacity 0.3s ease;">'
    + '<textarea id="regarde-note-input" placeholder="' + t('regarde_note_placeholder') + '" oninput="regardeSaveNote()" style="width:100%;min-height:60px;background:rgba(200,168,75,0.04);border:1px solid rgba(212,175,55,0.25);border-radius:12px;padding:12px;color:#D4AF37;font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;resize:none;outline:none;box-sizing:border-box;"></textarea>'
    + '</div>'
    + '</div>';
  content.style.opacity = '1';
}

function regardeCapture() {
  var video = document.getElementById('regarde-video');
  var content = document.getElementById('regarde-content');
  if (!video || !content) return;

  // Capture image en mémoire
  var canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  canvas.getContext('2d').drawImage(video, 0, 0);
  var dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  window._regardeImageData = dataUrl;
  var base64 = dataUrl.replace(/^data:image\/jpeg;base64,/, '');

  // Stop caméra
  if (_regardeStream) { _regardeStream.getTracks().forEach(function(t) { t.stop(); }); _regardeStream = null; }

  // Fondu au noir + loader doré
  content.style.transition = 'opacity 0.4s ease';
  content.style.opacity = '0';

  setTimeout(function() {
    content.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;"><div style="width:12px;height:12px;border-radius:50%;background:#D4AF37;animation:regardePulse 1.2s ease-in-out infinite;"></div></div>';
    content.style.opacity = '1';

    // Appel API avec timeout 8s
    var aborted = false;
    var timer = setTimeout(function() { aborted = true; fallback('INDETERMINE'); }, 8000);

    function saveAndShow(question, cat) {
      _regardeShowQuestion(content, question);
      _currentRegardeCat = cat || 'INDETERMINE';
      _regardeStarred = false;
      compressPhoto(dataUrl).then(function(photo) {
        var entry = addRegardeEntry({ question: question, category: _currentRegardeCat, photo: photo, bookmark: false, note: '' });
        _currentRegardeId = entry.id;
      }).catch(function() {
        var entry = addRegardeEntry({ question: question, category: _currentRegardeCat, photo: null, bookmark: false, note: '' });
        _currentRegardeId = entry.id;
      });
    }

    function fallback(cat) {
      if (timer) { clearTimeout(timer); timer = null; }
      saveAndShow(pickRegardeQuestion(cat || 'INDETERMINE'), cat);
    }

    fetch('https://niyyah-api.nabs881.workers.dev/api/regarde', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64 })
    })
    .then(function(res) { return res.json(); })
    .then(function(data) {
      if (aborted) return;
      clearTimeout(timer); timer = null;
      if (data.source === 'ia' && data.question) {
        saveAndShow(data.question, data.category);
      } else {
        fallback(data.category || 'INDETERMINE');
      }
    })
    .catch(function() {
      if (!aborted) fallback('INDETERMINE');
    });
  }, 400);
}

var _regardeStarred = false;
var _currentRegardeId = null;
var _regardeNoteOpen = false;
function regardeToggleNote() {
  var wrap = document.getElementById('regarde-note-wrap');
  var input = document.getElementById('regarde-note-input');
  if (!wrap) return;
  _regardeNoteOpen = !_regardeNoteOpen;
  if (_regardeNoteOpen) {
    wrap.style.display = 'block';
    setTimeout(function() { wrap.style.opacity = '1'; if (input) input.focus(); }, 10);
    if (_currentRegardeId && input) {
      var entries = getRegardeHistory();
      var entry = entries.find(function(e) { return e.id === _currentRegardeId; });
      if (entry && entry.note) input.value = entry.note;
    }
  } else {
    wrap.style.opacity = '0';
    setTimeout(function() { wrap.style.display = 'none'; }, 300);
  }
}
var _regardeNoteTimer = null;
function _showSavedIndicator(afterId) {
  var existing = document.getElementById(afterId + '-saved');
  if (existing) existing.remove();
  var el = document.createElement('div');
  el.id = afterId + '-saved';
  el.textContent = t('note_saved');
  el.style.cssText = 'font-family:\'Cormorant Garamond\',serif;font-size:13px;font-style:italic;color:#D4AF37;text-align:center;margin-top:6px;opacity:0;transition:opacity 0.2s ease;';
  var target = document.getElementById(afterId);
  if (target && target.parentNode) target.parentNode.appendChild(el);
  setTimeout(function() { el.style.opacity = '1'; }, 10);
  setTimeout(function() { el.style.transition = 'opacity 0.4s ease'; el.style.opacity = '0'; }, 1700);
  setTimeout(function() { if (el.parentNode) el.remove(); }, 2100);
}
function regardeSaveNote() {
  var input = document.getElementById('regarde-note-input');
  if (!input || !_currentRegardeId) return;
  updateRegardeEntry(_currentRegardeId, { note: input.value });
  clearTimeout(_regardeNoteTimer);
  _regardeNoteTimer = setTimeout(function() { _showSavedIndicator('regarde-note-input'); }, 800);
}
var _currentRegardeCat = 'INDETERMINE';
function regardeToggleStar() {
  _regardeStarred = !_regardeStarred;
  var btn = document.getElementById('regarde-btn-star');
  if (btn) { btn.textContent = _regardeStarred ? '★' : '☆'; btn.style.background = _regardeStarred ? 'rgba(212,175,55,0.15)' : 'transparent'; }
  if (_currentRegardeId) updateRegardeEntry(_currentRegardeId, { bookmark: _regardeStarred });
}
function regardeRefresh() {
  if (_currentRegardeId) deleteEntry('regarde', _currentRegardeId);
  _regardeStarred = false;
  _currentRegardeId = null;
  var q = document.getElementById('regarde-question');
  if (!q) return;
  q.style.opacity = '0';
  setTimeout(function() {
    var newQuestion = pickRegardeQuestion(_currentRegardeCat || 'INDETERMINE');
    q.textContent = newQuestion;
    q.style.opacity = '1';
    compressPhoto(window._regardeImageData || '').then(function(photo) {
      var entry = addRegardeEntry({ question: newQuestion, category: _currentRegardeCat, photo: photo, bookmark: false, note: '' });
      _currentRegardeId = entry.id;
    }).catch(function() {
      var entry = addRegardeEntry({ question: newQuestion, category: _currentRegardeCat, photo: null, bookmark: false, note: '' });
      _currentRegardeId = entry.id;
    });
  }, 300);
  var btn = document.getElementById('regarde-btn-star');
  if (btn) { btn.textContent = '☆'; btn.style.background = 'transparent'; }
}

function openRegardeJournal() {
  var overlay = document.getElementById('regarde-journal-overlay');
  var list = document.getElementById('regarde-journal-list');
  if (!overlay || !list) return;
  var entries = getRegardeHistory();
  if (entries.length === 0) {
    list.innerHTML = '<div class="empty-state-premium"><div class="empty-state-glyph">نَظَر</div><div class="empty-state-title">'+t('journal_regarde_title')+'</div><div class="empty-state-text">'+t('journal_regarde_text')+'</div><button class="empty-state-cta" onclick="scannerOpen()">'+t('journal_regarde_cta')+'</button></div>';
  } else {
    var html = '';
    entries.forEach(function(e) {
      var d = new Date(e.date);
      var dateStr = d.toLocaleDateString(_dateLocale(), { day:'numeric', month:'short' }) + ' · ' + d.toLocaleTimeString(_dateLocale(), { hour:'2-digit', minute:'2-digit' });
      var thumb = e.photo ? '<img src="' + e.photo + '" style="width:60px;height:60px;border-radius:10px;object-fit:cover;flex-shrink:0;">' : '<div style="width:60px;height:60px;border-radius:10px;background:rgba(200,168,75,0.08);flex-shrink:0;"></div>';
      var star = e.bookmark ? '<div style="position:absolute;top:8px;right:8px;color:#D4AF37;font-size:14px;">★</div>' : '';
      html += '<div onclick="openRegardeDetail(\'' + e.id + '\')" style="display:flex;gap:12px;align-items:center;padding:12px;background:rgba(200,168,75,0.03);border:1px solid rgba(200,168,75,0.1);border-radius:12px;margin-bottom:8px;cursor:pointer;position:relative;">'
        + thumb
        + '<div style="flex:1;min-width:0;">'
        + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#D4AF37;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (e.question || '') + '</div>'
        + '<div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:4px;">' + dateStr + '</div>'
        + '</div>' + star + '</div>';
    });
    list.innerHTML = html;
  }
  overlay.style.display = 'block';
}

function closeRegardeJournal() {
  var overlay = document.getElementById('regarde-journal-overlay');
  if (overlay) overlay.style.display = 'none';
}

function openRegardeDetail(id) {
  var entries = getRegardeHistory();
  var entry = entries.find(function(e) { return e.id === id; });
  if (!entry) return;
  var overlay = document.getElementById('regarde-detail-overlay');
  var content = document.getElementById('regarde-detail-content');
  if (!overlay || !content) return;
  var d = new Date(entry.date);
  var dateStr = d.toLocaleDateString(_dateLocale(), { weekday:'long', day:'numeric', month:'long' }) + ' · ' + d.toLocaleTimeString(_dateLocale(), { hour:'2-digit', minute:'2-digit' });
  var photoHtml = entry.photo ? '<img src="' + entry.photo + '" style="width:100%;border-radius:14px;margin-bottom:20px;">' : '';
  var starIcon = entry.bookmark ? '★' : '☆';
  var noteText = entry.note || '';
  content.innerHTML = photoHtml
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:22px;font-style:italic;color:#D4AF37;line-height:1.6;text-align:center;margin-bottom:12px;">' + (entry.question || '') + '</div>'
    + '<div style="font-size:12px;color:rgba(255,255,255,0.55);text-align:center;margin-bottom:24px;">' + dateStr + '</div>'
    + '<div style="display:flex;gap:16px;justify-content:center;margin-bottom:20px;">'
    + '<button onclick="regardeDetailStar(\'' + id + '\')" id="regarde-detail-star" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,175,55,0.3);background:' + (entry.bookmark ? 'rgba(212,175,55,0.15)' : 'transparent') + ';cursor:pointer;font-size:24px;color:#D4AF37;display:flex;align-items:center;justify-content:center;">' + starIcon + '</button>'
    + '<button onclick="regardeDetailNote(\'' + id + '\')" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(212,175,55,0.3);background:transparent;cursor:pointer;font-size:24px;color:#D4AF37;display:flex;align-items:center;justify-content:center;">✎</button>'
    + '<button onclick="regardeDetailDelete(\'' + id + '\')" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,80,80,0.3);background:transparent;cursor:pointer;font-size:20px;color:rgba(255,80,80,0.6);display:flex;align-items:center;justify-content:center;">🗑</button>'
    + '</div>'
    + (noteText ? '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:rgba(255,255,255,0.5);text-align:center;padding:12px;background:rgba(200,168,75,0.04);border-radius:10px;">' + noteText + '</div>' : '');
  overlay.style.display = 'block';
}

function closeRegardeDetail() {
  var overlay = document.getElementById('regarde-detail-overlay');
  if (overlay) overlay.style.display = 'none';
}

function regardeDetailStar(id) {
  var entries = getRegardeHistory();
  var entry = entries.find(function(e) { return e.id === id; });
  if (!entry) return;
  var newVal = !entry.bookmark;
  updateRegardeEntry(id, { bookmark: newVal });
  var btn = document.getElementById('regarde-detail-star');
  if (btn) { btn.textContent = newVal ? '★' : '☆'; btn.style.background = newVal ? 'rgba(212,175,55,0.15)' : 'transparent'; }
}

function regardeDetailNote(id) {
  var existing = document.getElementById('regarde-detail-note-wrap');
  if (existing) { existing.remove(); return; }
  var container = document.getElementById('regarde-detail-content');
  if (!container) return;
  var entries = getRegardeHistory();
  var entry = entries.find(function(e) { return e.id === id; });
  var wrap = document.createElement('div');
  wrap.id = 'regarde-detail-note-wrap';
  wrap.style.cssText = 'margin-top:16px;';
  wrap.innerHTML = '<textarea id="regarde-detail-note-input" placeholder="' + t('regarde_note_placeholder') + '" oninput="regardeDetailNoteSave(\'' + id + '\')" style="width:100%;min-height:80px;background:rgba(200,168,75,0.04);border:1px solid rgba(212,175,55,0.25);border-radius:12px;padding:12px;color:#D4AF37;font-family:\'Cormorant Garamond\',serif;font-size:15px;font-style:italic;resize:none;outline:none;box-sizing:border-box;">' + ((entry && entry.note) || '') + '</textarea>';
  container.appendChild(wrap);
  var input = document.getElementById('regarde-detail-note-input');
  if (input) input.focus();
}
var _regardeDetailNoteTimer = null;
function regardeDetailNoteSave(id) {
  var input = document.getElementById('regarde-detail-note-input');
  if (!input) return;
  updateRegardeEntry(id, { note: input.value });
  clearTimeout(_regardeDetailNoteTimer);
  _regardeDetailNoteTimer = setTimeout(function() { _showSavedIndicator('regarde-detail-note-input'); }, 800);
}

function regardeDetailDelete(id) {
  if (!confirm('Supprimer ce Regarde ?')) return;
  deleteEntry('regarde', id);
  closeRegardeDetail();
  openRegardeJournal();
}

function regardeClose() {
  closeRegardeJournal();
  closeRegardeDetail();
  var screen = document.getElementById('regarde-screen');
  if (screen) { screen.classList.remove('active'); document.body.style.overflow = ''; }
  if (_regardeStream) { _regardeStream.getTracks().forEach(function(t) { t.stop(); }); _regardeStream = null; }
  var content = document.getElementById('regarde-content');
  if (content) content.innerHTML = '';
}

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
    v2ShowToast(t('camera_denied'));
    return;
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reset état
  document.getElementById('scanner-result').classList.remove('active');
  document.getElementById('scanner-capture-btn').classList.remove('hidden');
  document.getElementById('scanner-orb').classList.remove('scanning');
  document.getElementById('scanner-hint').textContent = t('scanner_hint');
  document.getElementById('scanner-hint').style.opacity = '1';
  _scannerResult = null;

}

/* ── Journal Niyyah V2 ── */
var _niyyahJournalEntries = [];
function openNiyyahJournal() {
  var overlay = document.getElementById('niyyah-journal-overlay');
  var list = document.getElementById('niyyah-journal-list');
  if (!overlay || !list) return;
  _niyyahJournalEntries = getNiyyahHistory();
  renderNiyyahJournalList(_niyyahJournalEntries);
  var search = document.getElementById('niyyah-journal-search');
  if (search) search.value = '';
  overlay.style.display = 'block';
}
function closeNiyyahJournal() {
  var overlay = document.getElementById('niyyah-journal-overlay');
  if (overlay) overlay.style.display = 'none';
}
function filterNiyyahJournal() {
  var search = document.getElementById('niyyah-journal-search');
  var q = (search ? search.value : '').toLowerCase();
  var filtered = q ? _niyyahJournalEntries.filter(function(e) { return (e.intention || '').toLowerCase().includes(q); }) : _niyyahJournalEntries;
  renderNiyyahJournalList(filtered);
}
function renderNiyyahJournalList(entries) {
  var list = document.getElementById('niyyah-journal-list');
  if (!list) return;
  if (entries.length === 0) {
    list.innerHTML = '<div class="empty-state-premium"><div class="empty-state-glyph">نية</div><div class="empty-state-title">'+t('journal_niyyah_title')+'</div><div class="empty-state-text">'+t('journal_niyyah_text')+'</div></div>';
    return;
  }
  var html = '';
  entries.forEach(function(e) {
    var d = new Date(e.date);
    var dateStr = d.toLocaleDateString(_dateLocale(), { day:'numeric', month:'short' }) + ' · ' + d.toLocaleTimeString(_dateLocale(), { hour:'2-digit', minute:'2-digit' });
    var thumb = e.photo ? '<img src="' + e.photo + '" style="width:60px;height:60px;border-radius:10px;object-fit:cover;flex-shrink:0;">' : '<div style="width:60px;height:60px;border-radius:10px;background:rgba(200,168,75,0.08);flex-shrink:0;"></div>';
    html += '<div onclick="openNiyyahDetail(\'' + e.id + '\')" style="display:flex;gap:12px;align-items:center;padding:12px;background:rgba(200,168,75,0.03);border:1px solid rgba(200,168,75,0.1);border-radius:12px;margin-bottom:8px;cursor:pointer;">'
      + thumb
      + '<div style="flex:1;min-width:0;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:14px;font-style:italic;color:#D4AF37;line-height:1.4;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;">' + (e.intention || '') + '</div>'
      + '<div style="font-size:12px;color:rgba(255,255,255,0.55);margin-top:4px;">' + dateStr + '</div>'
      + '</div></div>';
  });
  list.innerHTML = html;
}
function openNiyyahDetail(id) {
  var entries = getNiyyahHistory();
  var entry = entries.find(function(e) { return e.id === id; });
  if (!entry) return;
  var overlay = document.getElementById('niyyah-detail-overlay');
  var content = document.getElementById('niyyah-detail-content');
  if (!overlay || !content) return;
  var d = new Date(entry.date);
  var dateStr = d.toLocaleDateString(_dateLocale(), { weekday:'long', day:'numeric', month:'long' }) + ' · ' + d.toLocaleTimeString(_dateLocale(), { hour:'2-digit', minute:'2-digit' });
  var photoHtml = entry.photo ? '<img src="' + entry.photo + '" style="width:100%;border-radius:14px;margin-bottom:20px;">' : '';
  content.innerHTML = photoHtml
    + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:22px;font-style:italic;color:#D4AF37;line-height:1.6;text-align:center;margin-bottom:12px;">' + (entry.intention || '') + '</div>'
    + '<div style="font-size:12px;color:rgba(255,255,255,0.55);text-align:center;margin-bottom:24px;">' + dateStr + '</div>'
    + '<div style="text-align:center;"><button onclick="niyyahDetailDelete(\'' + id + '\')" style="width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,80,80,0.3);background:transparent;cursor:pointer;font-size:20px;color:rgba(255,80,80,0.6);display:inline-flex;align-items:center;justify-content:center;">🗑</button></div>';
  overlay.style.display = 'block';
}
function closeNiyyahDetail() {
  var overlay = document.getElementById('niyyah-detail-overlay');
  if (overlay) overlay.style.display = 'none';
}
function niyyahDetailDelete(id) {
  if (!confirm('Supprimer cette Niyyah ?')) return;
  deleteEntry('niyyah', id);
  closeNiyyahDetail();
  openNiyyahJournal();
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
    document.getElementById('scanner-object-label').textContent  = t('scanner_posed');
    document.getElementById('scanner-niyyah-main').textContent   = '"' + data.niyyahDirect + '"';
    const nuancesEl = document.getElementById('scanner-nuances');
    if (nuancesEl) nuancesEl.innerHTML = '';
    result.classList.add('active');
    if (navigator.vibrate) navigator.vibrate([25, 50, 40]);
    // Sauvegarde journal Niyyah
    var _scanImg = document.getElementById('scanner-canvas');
    if (_scanImg) {
      compressPhoto(_scanImg.toDataURL('image/jpeg', 0.85)).then(function(photo) {
        addNiyyahEntry({ intention: data.niyyahDirect, category: data.category || 'INDETERMINE', photo: photo });
      });
    }
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

  // Toast fraternel
  v2ShowToast(t('toast_niyyah'));
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
function shareSavaisTu(event) {
  if (event) event.stopPropagation();
  var fact = getSavaisTuFact();
  var canvas = document.createElement('canvas');
  canvas.width = 1080; canvas.height = 1080;
  var ctx = canvas.getContext('2d');
  // Fond
  ctx.fillStyle = '#0A0A0A';
  ctx.fillRect(0, 0, 1080, 1080);
  // Halo
  var grad = ctx.createRadialGradient(540, 540, 0, 540, 540, 400);
  grad.addColorStop(0, 'rgba(200,168,75,0.08)');
  grad.addColorStop(1, 'rgba(200,168,75,0)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1080, 1080);
  // Bordure dorée fine en haut
  ctx.fillStyle = 'rgba(200,168,75,0.3)';
  ctx.fillRect(0, 0, 1080, 2);
  // Titre
  ctx.textAlign = 'center';
  ctx.fillStyle = '#C8A84A';
  ctx.font = '32px "Cormorant Garamond", serif';
  ctx.fillText('LE SAVAIS-TU ?', 540, 120);
  // Ornement
  ctx.font = '28px serif';
  ctx.fillText('✦', 540, 170);
  // Arabe
  ctx.fillStyle = 'rgba(200,168,75,0.15)';
  ctx.font = '120px "Amiri", serif';
  ctx.fillText('هَلْ تَعْلَمُ', 540, 300);
  // Fait — word wrap
  ctx.fillStyle = '#E8DCC0';
  ctx.font = 'italic 48px "Cormorant Garamond", serif';
  var words = fact.split(' '), lines = [], line = '';
  words.forEach(function(w) {
    var test = line + (line ? ' ' : '') + w;
    if (ctx.measureText(test).width > 900 && line) { lines.push(line); line = w; }
    else { line = test; }
  });
  if (line) lines.push(line);
  var startY = 540 - (lines.length * 30);
  lines.forEach(function(l, i) { ctx.fillText(l, 540, startY + i * 64); });
  // Séparateur
  ctx.fillStyle = '#C8A84A';
  ctx.font = '24px serif';
  ctx.fillText('✦', 540, startY + lines.length * 64 + 50);
  // Signature
  ctx.fillStyle = 'rgba(200,168,75,0.3)';
  ctx.font = '24px "Cormorant Garamond", serif';
  ctx.fillText('NIYYAH DAILY  ✦', 540, 1030);
  // Partage
  canvas.toBlob(function(blob) {
    var file = new File([blob], 'niyyah-savais-tu.png', { type: 'image/png' });
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({ files: [file], title: t('share_savaistu_title') }).catch(function() {});
    } else {
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = 'niyyah-savais-tu.png';
      a.click(); URL.revokeObjectURL(url);
    }
  }, 'image/png');
}
/* ── Rescanner ── */
function scannerRetry() {
  document.getElementById('scanner-result').classList.remove('active');
  document.getElementById('scanner-capture-btn').classList.remove('hidden');
  const thinkingRetry = document.getElementById('scanner-thinking');
  if (thinkingRetry) thinkingRetry.classList.remove('active');
  document.getElementById('scanner-hint').textContent = t('scanner_hint');
  document.getElementById('scanner-hint').style.opacity = '1';
  _scannerResult = null;
  _selectedNuance = 0;
}

/* Exposer sur window */

/* ── Capturer et Analyser ── */
async function scannerCapture() {
  // Quota scanner : 1/semaine gratuit, 3/semaine premium
  var _scanQuota = [];
  try { _scanQuota = JSON.parse(localStorage.getItem('niyyah_scanner_quota') || '[]'); } catch(e) { _scanQuota = []; }
  var _weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  _scanQuota = _scanQuota.filter(function(ts) { return ts > _weekAgo; });
  var _scanLimit = (typeof isPremium === 'function' && isPremium()) ? 3 : 1;
  if (!NIYYAH_DEBUG && _scanQuota.length >= _scanLimit) {
    showToast(t('scanner_limit_week'));
    return;
  }
  _scanQuota.push(new Date().toISOString());
  safeSetItem('niyyah_scanner_quota', JSON.stringify(_scanQuota));

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
  hint.textContent = t('scanner_analyzing');
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
    if (thinkingEl) thinkingEl.classList.remove('active');
  }
}

/* ── Analyser l'image via API ── */
async function scannerAnalyzeImage(imageData) {
  var base64 = imageData.replace(/^data:image\/jpeg;base64,/, '');
  var now = new Date();

  // Appel /api/niyyah avec timeout 8s
  try {
    var controller = new AbortController();
    var timer = setTimeout(function() { controller.abort(); }, 8000);

    var response = await fetch('https://niyyah-api.nabs881.workers.dev/api/niyyah', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: base64, hour: now.getHours(), isFriday: now.getDay() === 5, isRamadan: false }),
      signal: controller.signal
    });
    clearTimeout(timer);

    var data = await response.json();

    if (data.source === 'ia' && data.intention) {
      return { category: data.category || 'niyyah_direct', labels: [data.intention], objectName: data.intention, niyyahDirect: data.intention };
    }

    // Fallback local avec catégorie IA
    var localIntention = pickNiyyahIntention(data.category || 'INDETERMINE');
    return { category: data.category || 'INDETERMINE', labels: [localIntention], objectName: localIntention, niyyahDirect: localIntention };

  } catch(e) {
    // Timeout ou erreur réseau → fallback local
    var fallbackIntention = pickNiyyahIntention('INDETERMINE');
    return { category: 'INDETERMINE', labels: [fallbackIntention], objectName: fallbackIntention, niyyahDirect: fallbackIntention };
  }





// HOOK: Journal Vocal
function v2JournalRecord() {
  v2ShowToast(t('journal_voice_soon'));
}
}



window.scannerOpen          = scannerOpen;
window.scannerClose         = scannerClose;
window.scannerCapture       = scannerCapture;
window.scannerShowResult    = scannerShowResult;
window.scannerConfirmNiyyah = scannerConfirmNiyyah;
window.scannerRetry         = scannerRetry;

// A11y: overlay list used by Escape + focus trap
var A11Y_OVERLAYS = ['scanner-overlay','niyyah-journal-overlay','niyyah-detail-overlay',
  'regarde-journal-overlay','regarde-detail-overlay','infoOverlay','bilanSoirOverlay',
  'defiOverlay','defiSelectorOverlay','coranOverlay','finjournee-overlay','tasbihOverlay',
  'tawbaOverlay','freemiumOverlay','niyyahModal-v2','weeklyOverlay'];

function a11yGetActiveOverlay() {
  for (var i = 0; i < A11Y_OVERLAYS.length; i++) {
    var el = document.getElementById(A11Y_OVERLAYS[i]);
    if (el && el.style.display !== 'none' && getComputedStyle(el).display !== 'none') return el;
  }
  return null;
}

// A11y: Escape key closes active overlay + focus trap
document.addEventListener('keydown', function(e) {
  var active = a11yGetActiveOverlay();
  if (!active) return;
  if (e.key === 'Escape') { active.style.display = 'none'; return; }
  if (e.key !== 'Tab') return;
  var focusable = active.querySelectorAll('button,input,select,textarea,a,[tabindex]:not([tabindex="-1"])');
  if (!focusable.length) return;
  var first = focusable[0], last = focusable[focusable.length - 1];
  if (e.shiftKey) {
    if (document.activeElement === first) { e.preventDefault(); last.focus(); }
  } else {
    if (document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
});

// View fade-in: applies AFTER display:block is set (safe, no layout change)
function fadeInView(el) {
  if (!el || window.matchMedia('(prefers-reduced-motion:reduce)').matches) return;
  el.style.transition = 'none';
  el.style.opacity = '0';
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      el.style.transition = 'opacity 0.2s ease';
      el.style.opacity = '1';
      setTimeout(function() { el.style.transition = ''; el.style.opacity = ''; }, 250);
    });
  });
}

init();

