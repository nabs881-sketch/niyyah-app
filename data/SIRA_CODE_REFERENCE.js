/* ═════════════════════════════════════════════════════════════════
   SIRA MODULE — CODE DE RÉFÉRENCE COMPLET
   À utiliser comme fallback si Claude Code dérape sur un prompt.
   ═════════════════════════════════════════════════════════════════ */


/* ──────────────────────────────────────────────────────────────────
   1. CSS — À AJOUTER DANS LE STYLE DE NIYYAH
   ────────────────────────────────────────────────────────────────── */

/*
.sira-card {
  background: #2C2E32;
  border-radius: 24px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  margin: 16px 0;
  transition: opacity 0.2s;
}
.sira-card:active { opacity: 0.7; }
.sira-card-circle {
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #FAF7EE;
  flex-shrink: 0;
}
.sira-card-text { flex: 1; }
.sira-card-title {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 17px;
  color: #FAF7EE;
  margin: 0 0 4px 0;
}
.sira-card-rdv {
  font-family: 'Nunito', sans-serif;
  font-size: 13px;
  color: #999;
  margin: 0;
}

#sira-detail-screen {
  background: #2C2E32;
  color: #FAF7EE;
  padding: 32px 24px 80px 24px;
  min-height: 100vh;
  font-family: 'Georgia', serif;
}
.sira-salawat {
  text-align: center;
  font-family: 'Amiri', serif;
  font-size: 64px;
  color: #C8A84A;
  margin: 24px 0;
  line-height: 1;
}
.sira-rdv-num {
  text-align: center;
  font-size: 12px;
  color: #C8A84A;
  letter-spacing: 4px;
  font-weight: 700;
  margin: 16px 0 8px 0;
  text-transform: uppercase;
}
.sira-rdv-title {
  text-align: center;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 28px;
  color: #FAF7EE;
  margin: 0 0 32px 0;
  font-weight: 400;
}
.sira-body p {
  font-family: 'Georgia', serif;
  font-size: 17px;
  line-height: 1.75;
  text-align: justify;
  color: #E8E6DD;
  margin: 0 0 16px 0;
}
.sira-body p.italic {
  font-style: italic;
  text-align: center;
  color: #C8A84A;
  margin: 24px 16px;
  font-size: 18px;
}
.sira-body blockquote.verset {
  background: rgba(250, 247, 238, 0.05);
  border-left: 2px solid #C8A84A;
  padding: 16px 20px;
  margin: 24px 0;
  font-style: italic;
  color: #D4C9A0;
  font-size: 17px;
  text-align: left;
}
.sira-body blockquote.verset::before {
  content: "✦  ";
  color: #C8A84A;
}
.sira-divider {
  text-align: center;
  color: #C8A84A;
  margin: 32px 0;
  letter-spacing: 4px;
}
.sira-meditation {
  background: rgba(250, 247, 238, 0.04);
  border-radius: 12px;
  padding: 20px 24px;
  margin: 24px 8px;
  font-style: italic;
  text-align: center;
  color: #D4C9A0;
  font-size: 17px;
  line-height: 1.6;
}
.sira-source {
  text-align: center;
  font-style: italic;
  color: #888;
  font-size: 13px;
  margin: 16px 0 32px 0;
}
.sira-fil-rouge-label {
  font-size: 11px;
  color: #C8A84A;
  letter-spacing: 3px;
  font-weight: 700;
  margin: 32px 0 8px 0;
}
.sira-fil-rouge {
  font-style: italic;
  color: #999;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
}
.sira-locked {
  text-align: center;
  padding: 60px 20px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 22px;
  color: #C8A84A;
}

@media (prefers-color-scheme: light) {
  // Si tu veux gérer le mode clair, adapter ici. Sinon Sira reste toujours sombre.
}
*/


/* ──────────────────────────────────────────────────────────────────
   2. JAVASCRIPT — MODULE SIRA COMPLET
   ────────────────────────────────────────────────────────────────── */

const SIRA = {
  data: null,
  loading: false,

  // ─── Chargement lazy ────────────────────────────────────────────
  async load() {
    if (this.data) return this.data;
    if (this.loading) {
      // Évite le double-fetch si tap rapide
      while (this.loading) await new Promise(r => setTimeout(r, 50));
      return this.data;
    }
    this.loading = true;
    try {
      const res = await fetch('data/sira.min.json');
      this.data = await res.json();
    } catch (e) {
      console.error('SIRA load failed', e);
      this.data = { meta: {}, rdv: [] };
    } finally {
      this.loading = false;
    }
    return this.data;
  },

  // ─── RDV du jour ────────────────────────────────────────────────
  getCurrentRdvNum() {
    let startStr = localStorage.getItem('sira_start_date');
    if (!startStr) {
      startStr = new Date().toISOString().split('T')[0];
      localStorage.setItem('sira_start_date', startStr);
    }
    const start = new Date(startStr);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    start.setHours(0, 0, 0, 0);
    const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const num = diffDays + 1;
    // Cap au nombre de RDV disponibles
    if (this.data && this.data.rdv.length) {
      return Math.min(num, this.data.rdv.length);
    }
    return Math.max(1, Math.min(num, 30));
  },

  // ─── Récupération d'un RDV ──────────────────────────────────────
  getRdv(num) {
    if (!this.data) return null;
    return this.data.rdv.find(r => r.num === num);
  },

  // ─── Compteur de tissage ────────────────────────────────────────
  markTissue(num) {
    const stored = localStorage.getItem('sira_tissues');
    const set = new Set(stored ? JSON.parse(stored) : []);
    set.add(num);
    localStorage.setItem('sira_tissues', JSON.stringify([...set]));
  },

  getTissuesCount() {
    const stored = localStorage.getItem('sira_tissues');
    if (!stored) return 0;
    return JSON.parse(stored).length;
  },

  // ─── Langue (i18n-ready) ────────────────────────────────────────
  getLang() {
    // Adapter selon comment Niyyah gère la langue
    return (typeof getCurrentLang === 'function') ? getCurrentLang() : 'fr';
  },

  T(field) {
    if (!field) return '';
    const lang = this.getLang();
    return field[lang] && field[lang].trim() ? field[lang] : (field.fr || '');
  },

  // ─── Rendu HTML d'un RDV ────────────────────────────────────────
  renderRdv(num) {
    const rdv = this.getRdv(num);
    if (!rdv) return '<div class="sira-locked">Rendez-vous introuvable.</div>';

    const T = this.T.bind(this);
    let html = '';
    html += `<div class="sira-salawat">ﷺ</div>`;
    html += `<div class="sira-rdv-num">Rendez-vous ${rdv.num}</div>`;
    html += `<h1 class="sira-rdv-title">${this.escape(T(rdv.titre))}</h1>`;

    html += `<div class="sira-body">`;
    for (const para of rdv.paragraphes) {
      const txt = this.escape(T(para.content));
      if (para.type === 'verset') {
        html += `<blockquote class="verset">${txt}</blockquote>`;
      } else if (para.type === 'italic') {
        html += `<p class="italic">${txt}</p>`;
      } else {
        html += `<p>${txt}</p>`;
      }
    }
    html += `</div>`;

    html += `<div class="sira-divider">─────────────</div>`;
    html += `<div class="sira-meditation">${this.escape(T(rdv.meditation))}</div>`;
    html += `<p class="sira-source">— ${this.escape(T(rdv.source))} —</p>`;
    html += `<div class="sira-salawat" style="font-size:48px;">ﷺ</div>`;
    html += `<div class="sira-fil-rouge-label">FIL ROUGE</div>`;
    html += `<p class="sira-fil-rouge">${this.escape(T(rdv.fil_rouge))}</p>`;

    // Marque comme tissé dès l'ouverture
    this.markTissue(num);

    return html;
  },

  // ─── Sécurité minimale ──────────────────────────────────────────
  escape(s) {
    if (!s) return '';
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  },

  // ─── Ouverture de l'écran détail (point d'entrée) ───────────────
  async openDetail() {
    await this.load();
    const num = this.getCurrentRdvNum();
    const screen = document.getElementById('sira-detail-screen');
    if (!screen) return console.error('sira-detail-screen introuvable');

    if (!this.getRdv(num)) {
      screen.innerHTML = `<div class="sira-locked">Le Messager ﷺ vous attendra demain.</div>`;
    } else {
      screen.innerHTML = this.renderRdv(num);
    }
    // Ici, basculer l'écran selon la logique d'écrans de Niyyah
    // Ex : navigateTo('sira-detail-screen')
  },

  // ─── Mise à jour de la card sur Ma Niyyah ───────────────────────
  async updateCard() {
    await this.load();
    const num = this.getCurrentRdvNum();
    const rdv = this.getRdv(num);
    const titleEl = document.querySelector('.sira-card-rdv');
    if (titleEl && rdv) {
      titleEl.textContent = `Rendez-vous ${rdv.num} — ${this.T(rdv.titre)}`;
    }
  }
};


/* ──────────────────────────────────────────────────────────────────
   3. HTML — STRUCTURE DE LA CARD ET DE L'ÉCRAN DÉTAIL
   ────────────────────────────────────────────────────────────────── */

/*
<!-- Card sur Ma Niyyah -->
<div class="sira-card" onclick="SIRA.openDetail()">
  <div class="sira-card-circle"></div>
  <div class="sira-card-text">
    <p class="sira-card-title">Avec le Messager ﷺ</p>
    <p class="sira-card-rdv">Rendez-vous 1 — Une terre oubliée</p>
  </div>
</div>

<!-- Écran détail (caché par défaut, affiché via la nav de Niyyah) -->
<div id="sira-detail-screen" style="display:none;">
  <!-- Le contenu est injecté par SIRA.renderRdv() -->
</div>
*/


/* ──────────────────────────────────────────────────────────────────
   4. INITIALISATION (à appeler une fois Niyyah prête)
   ────────────────────────────────────────────────────────────────── */

// Quand l'écran Ma Niyyah est affiché :
//   SIRA.updateCard();
//
// Quand l'utilisateur tape sur la card :
//   SIRA.openDetail();   // gère load + render + nav


/* ──────────────────────────────────────────────────────────────────
   5. NOTES TECHNIQUES
   ────────────────────────────────────────────────────────────────── */

/*
- LAZY LOADING : sira.min.json (160 KB) n'est chargé que quand l'utilisateur
  tape sur la card. Le boot de Niyyah reste donc inchangé. Les autres pages
  (Bab an-Nafs, Tafakkur, etc.) ne sont pas impactées.

- CACHE PWA : ajouter "data/sira.min.json" au manifest du service worker
  pour qu'il soit pré-cached. Une fois chargé une fois, l'utilisateur peut
  consulter Sira offline.

- LOCALSTORAGE UTILISÉ :
    sira_start_date    = "YYYY-MM-DD" du premier accès (J=1)
    sira_tissues       = JSON array des numéros de RDV ouverts
    sira_last_open     = optionnel, pour analytics futurs

- I18N : tous les textes passent par SIRA.T(field) qui essaie d'abord la
  langue courante puis fallback sur FR. Pour activer EN ou AR, il suffit
  de remplir les champs vides dans sira.min.json.

- AR/RTL : ajouter dynamiquement dir="rtl" sur sira-detail-screen quand
  lang === 'ar'. Et changer la font Georgia → Scheherazade New.

- PLAY STORE : sira.min.json étant un asset statique, le wrapper Capacitor
  l'inclura automatiquement sans config supplémentaire. Aucune permission
  réseau requise (le JSON est local après cache).

- COMPTEUR DE TISSAGE : pour l'afficher quelque part dans Niyyah :
    document.getElementById('counter').textContent = SIRA.getTissuesCount();
*/
