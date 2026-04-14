// ═══════════════════════════════════════════════════
// NIYYAH DAILY — modules/i18n.js
// Internationalisation FR / EN / AR + détection langue
// Aucune dépendance externe
// ═══════════════════════════════════════════════════

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
