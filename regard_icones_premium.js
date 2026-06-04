/*
==============================================================
NIYYAH REGARD PREMIUM — ICÔNES LINE-ART OR
==============================================================

Style : line-art minimaliste, stroke 1.5px, rounded caps
Couleur : rgba(200,168,75,0.85) au repos
         rgba(200,168,75,1) au hover/active
Taille viewBox : 24×24 (s'adapte avec width/height ou font-size)

UTILISATION : remplace chaque emoji par le SVG correspondant.
Exemple :
  Avant :  <button class="btn-regard">▶</button>
  Après :  <button class="btn-regard">[SVG_PLAY]</button>
==============================================================
*/


/* ============= 1. PLAY (au lieu de ▶) ============= */
const SVG_PLAY = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M7.5 5.5L18 12L7.5 18.5V5.5Z"/></svg>`;


/* ============= 2. PAUSE (état actif du Play) ============= */
const SVG_PAUSE = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="5" x2="9" y2="19"/><line x1="15" y1="5" x2="15" y2="19"/></svg>`;


/* ============= 3. RÉCITER 7x (au lieu de 🔁) ============= */
/* Cercle ouvert avec chiffre 7 stylisé au centre */
const SVG_RECITER_7X = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-3.5-7.1"/><polyline points="21 3 21 8 16 8"/><text x="12" y="15" text-anchor="middle" font-family="Cormorant Garamond, serif" font-size="9" font-style="italic" stroke="none" fill="currentColor">7</text></svg>`;


/* ============= 4. MÉMORISER (au lieu de 🔖) ============= */
/* Marque-page fin et élégant */
const SVG_MEMORISER = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>`;


/* ============= 5. MÉMORISER ACTIF (état rempli sobre) ============= */
const SVG_MEMORISER_ACTIF = `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill-opacity="0.25"><path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/></svg>`;


/* ============= 6. DUʿĀʾ (au lieu de 🤲) ============= */
/* Deux courbes ouvertes évoquant les paumes en supplication */
const SVG_DUAA = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 11c0-3 1.5-5 3-5"/><path d="M19 11c0-3-1.5-5-3-5"/><path d="M5 11c0 4 2.5 7 7 7s7-3 7-7"/><path d="M12 4v6"/></svg>`;


/* ============= 7. PARTAGER (au lieu de 📤) ============= */
/* Arc + flèche montante très épuré */
const SVG_PARTAGER = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>`;


/* ============= 8. STREAK (croissant fin) ============= */
const SVG_STREAK = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14a8 8 0 1 1-11.5-9 6.5 6.5 0 0 0 11.5 9z"/></svg>`;


/*
==============================================================
CSS GLOBAL POUR BOUTONS PREMIUM
==============================================================
À ajouter une seule fois dans le style global.
*/

const CSS_PREMIUM_BUTTONS = `
.btn-regard-premium {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(200,168,75,0.3);
  background: transparent;
  color: rgba(200,168,75,0.85);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 0;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}

.btn-regard-premium:hover,
.btn-regard-premium:focus-visible {
  color: rgba(200,168,75,1);
  border-color: rgba(200,168,75,0.6);
  transform: scale(1.05);
}

.btn-regard-premium:active {
  transform: scale(0.95);
}

.btn-regard-premium.is-active {
  color: rgba(200,168,75,1);
  border-color: rgba(200,168,75,0.8);
  background: rgba(200,168,75,0.08);
}

.btn-regard-premium svg {
  display: block;
}

.regard-actions-row {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin: 24px 0 16px;
  flex-wrap: wrap;
}

.regard-streak {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'Cormorant Garamond', serif;
  font-size: 11px;
  color: rgba(200,168,75,0.4);
  margin-top: 12px;
  letter-spacing: 0.05em;
}

.regard-streak svg {
  opacity: 0.5;
}

/* Compteur 7x pendant lecture */
.btn-regard-premium .compteur-7x {
  position: absolute;
  bottom: -18px;
  font-size: 10px;
  color: rgba(200,168,75,0.7);
  font-family: 'Cormorant Garamond', serif;
}
`;


/*
==============================================================
EXEMPLE DE STRUCTURE HTML COMPLÈTE
==============================================================
Rangée de 5 boutons + streak silencieux en bas
*/

const HTML_EXAMPLE = `
<div class="regard-actions-row">
  <button class="btn-regard-premium" id="btn-play" aria-label="Écouter">
    ${SVG_PLAY}
  </button>
  <button class="btn-regard-premium" id="btn-7x" aria-label="Réciter 7 fois">
    ${SVG_RECITER_7X}
  </button>
  <button class="btn-regard-premium" id="btn-memoriser" aria-label="Mémoriser">
    ${SVG_MEMORISER}
  </button>
  <button class="btn-regard-premium" id="btn-duaa" aria-label="Du'a liée">
    ${SVG_DUAA}
  </button>
  <button class="btn-regard-premium" id="btn-partager" aria-label="Partager">
    ${SVG_PARTAGER}
  </button>
</div>

<div class="regard-streak">
  ${SVG_STREAK}
  <span>12 jours de Regards</span>
</div>
`;
