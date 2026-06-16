# SPEC-JOURNAL-2FONDS (Journal — deux fonds premium : NIYYAH ambré / REGARD Majorelle)

## Cible
`script.js` (1 ajout dans `journalSwitchTab`) + `style.css` (1 bloc).
⚠️ script.js + style.css cachés par le SW → **`npm run build` AVANT le commit** (bump SW auto).

## Étape 1 — RETIRER l'ancien bloc Journal ocre
Supprime de `style.css` le bloc précédent qui commence par (s'il existe, plein OU accents) :
```
/* ===== OCRE MARRAKECH — page Journal
```
ou
```
/* ===== OCRE MARRAKECH PLEIN — page Journal
```
Le nouveau système gère les fonds et accents lui-même.

## Étape 2 — JS : poser la classe de mode (fichier `script.js`)
Dans `journalSwitchTab`, CHERCHER :
```
  var tabR = document.getElementById('journal-tab-regards');
  if (!content) return;
```
REMPLACER PAR :
```
  var tabR = document.getElementById('journal-tab-regards');
  if (!content) return;
  var _vj = document.getElementById('view-journal');
  if (_vj) { _vj.classList.toggle('jr-niyyah', tab === 'niyyah'); _vj.classList.toggle('jr-regard', tab !== 'niyyah'); }
```

## Étape 3 — CSS : ajouter ce bloc à la fin de `style.css`
```css
/* ===== JOURNAL — deux fonds premium (NIYYAH ambré / REGARD Majorelle) ===== */
.journal-screen{ transition:background 0.6s ease; }

/* NIYYAH — ambre / or */
#view-journal.jr-niyyah .journal-screen{
  background:radial-gradient(ellipse 130% 75% at 50% -8%,rgba(199,150,80,0.20) 0%,rgba(120,70,30,0.05) 38%,transparent 62%),radial-gradient(ellipse at center,#0c0805 0%,#000 100%)!important;
}
#view-journal.jr-niyyah .journal-screen::after{
  content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:radial-gradient(circle,rgba(232,184,120,0.5) 0.5px,transparent 1px);
  background-size:13px 13px;opacity:0.30;
}
#view-journal.jr-niyyah .journal-arabic-title{ color:#E8C580!important; text-shadow:0 0 18px rgba(200,150,80,0.4)!important; }
#view-journal.jr-niyyah [style*="C8A84A"]{ color:rgba(232,197,128,0.92)!important; }
#view-journal.jr-niyyah #journal-back-btn svg{ stroke:#E8C580!important; }
#view-journal.jr-niyyah #journal-content > div[style*="200,168,75"]{ background:rgba(212,160,90,0.08)!important; border-color:rgba(212,160,90,0.2)!important; }
#view-journal.jr-niyyah #journal-content [style*="D4AF37"]{ color:#E8BE84!important; }
#view-journal.jr-niyyah #journal-content .empty-state-glyph{ color:rgba(232,184,120,0.4)!important; }
#view-journal.jr-niyyah #journal-content .empty-state-title{ color:#E8C580!important; }

/* REGARD — bleu Majorelle */
#view-journal.jr-regard .journal-screen{
  background:radial-gradient(ellipse 130% 75% at 50% -8%,rgba(70,120,190,0.22) 0%,rgba(40,70,120,0.06) 38%,transparent 62%),radial-gradient(ellipse at center,#05080d 0%,#000 100%)!important;
}
#view-journal.jr-regard .journal-screen::after{
  content:'';position:fixed;inset:0;z-index:0;pointer-events:none;
  background-image:radial-gradient(circle,rgba(165,200,240,0.55) 0.5px,transparent 1px);
  background-size:13px 13px;opacity:0.30;
}
#view-journal.jr-regard .journal-arabic-title{ color:#AFC9EC!important; text-shadow:0 0 18px rgba(90,140,210,0.45)!important; }
#view-journal.jr-regard [style*="C8A84A"]{ color:rgba(175,201,236,0.92)!important; }
#view-journal.jr-regard #journal-back-btn svg{ stroke:#AFC9EC!important; }
#view-journal.jr-regard #journal-tab-regards{
  background:linear-gradient(180deg,rgba(80,130,200,0.28),rgba(40,80,140,0.15))!important;
  border-color:rgba(130,175,225,0.55)!important; color:#C2DBF5!important;
}
#view-journal.jr-regard #journal-content > div[style*="200,168,75"]{ background:rgba(90,140,210,0.09)!important; border-color:rgba(110,160,215,0.22)!important; }
#view-journal.jr-regard #journal-content [style*="D4AF37"]{ color:#BFD6F2!important; }
#view-journal.jr-regard #journal-content .empty-state-glyph{ color:rgba(165,200,240,0.4)!important; }
#view-journal.jr-regard #journal-content .empty-state-title{ color:#AFC9EC!important; }
```

## Build + commit
```
npm run build
git add script.js script.min.js style.css style.min.css sw.js && git commit -m "Journal: deux fonds premium NIYYAH ambre / REGARD Majorelle (bascule a l onglet)"
git push
```

> Réversible : retirer le bloc CSS + la ligne JS = retour à l'or. La poussière (or/argent) et la lueur
> donnent le côté premium ; le fond se fond en 0,6s quand tu changes d'onglet.
