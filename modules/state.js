// ═══════════════════════════════════════════════════
// NIYYAH DAILY — modules/state.js
// État global, localStorage, scoring, badges
// Dépend de : data.js (LEVELS, BADGES, WIRD_DATA)
// ═══════════════════════════════════════════════════

const TODAY = new Date().toISOString().split('T')[0];

// ── État principal ────────────────────────────────
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

// ── Wird state ────────────────────────────────────
let wirdState = JSON.parse(localStorage.getItem('niyyah_wird_' + TODAY) || '{}');

// ── Poids des items ───────────────────────────────
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

// ── Sauvegarde ────────────────────────────────────
function saveState()   { localStorage.setItem('spiritual_v2', JSON.stringify(state)); localStorage.setItem('spiritual_level', currentLevel); }
function saveHistory() { localStorage.setItem('spiritual_history', JSON.stringify(history)); }
function saveWirdState() {
  localStorage.setItem('niyyah_wird_' + TODAY, JSON.stringify(wirdState));
}

// ── Helpers ───────────────────────────────────────
function getDateMinus(dateStr, days) {
  const d = new Date(dateStr); d.setDate(d.getDate() - days); return d.toISOString().split('T')[0];
}
function getTodayStr() { return new Date().toISOString().split('T')[0]; }

// ── isItemDone / scoring ──────────────────────────
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
function getLevelItems(levelId) {
  const level = LEVELS.find(l => l.id === levelId);
  return level ? level.sections.flatMap(s => s.items) : [];
}

// ── Calcul progression niveau ─────────────────────
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
function getLevelProgress(levelId) { return getCalcLvlPct(levelId, state); }

// ── Streak & historique ───────────────────────────
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
    const todayDate   = new Date(TODAY + 'T12:00:00');
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
    const todayDate   = new Date(TODAY + 'T12:00:00');
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

// ── Médaille ──────────────────────────────────────
const MEDAL_CFG = {
  none:   { label: '—',      cls: 'none'   },
  bronze: { label: 'Bronze', cls: 'bronze' },
  silver: { label: 'Argent', cls: 'silver' },
  gold:   { label: 'Or ✦',   cls: 'gold'   },
};
let _lastMedal = null;
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
function updateMedal() {
  const medal = getMedalLevel();
  const el = document.getElementById('medalTag');
  if (!el) return;
  el.className = 'medal-tag ' + MEDAL_CFG[medal].cls;
  el.textContent = MEDAL_CFG[medal].label;
  if (_lastMedal && _lastMedal !== medal && medal !== 'none') {
    el.classList.add('anim');
    el.addEventListener('animationend', () => el.classList.remove('anim'), { once: true });
    const msgs = { bronze:'🥉 Bronze !', silver:'🥈 Argent !', gold:'🥇 OR — Journée parfaite !' };
    showToast(msgs[medal]);
  }
  _lastMedal = medal;
}

// ── Badges ────────────────────────────────────────
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
