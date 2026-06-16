# SPEC-NAV-REPERES — Repères en dernier onglet + suppression de Ma Niyyah

## ⚠️ AVANT DE COMMENCER
- Reste sur **Sonnet (option 2, PAS "1M context")** — sinon erreur 429.
- Ne touche QUE ce qui est décrit. Aucune autre modification.

## But
Barre du bas finale : **Prière · Scanner · Nafs · Repères**.
- On SUPPRIME le bouton « Ma Niyyah » (redondant : on revient au Sanctuaire par les boutons retour + au lancement).
- On AJOUTE un onglet « Repères » en DERNIÈRE position (il ouvre l'overlay Repères existant via `openRepere()`).
- On retire la carte Repères du Sanctuaire (elle est désormais dans la barre).

---

## Modif 1 — `index.html` : SUPPRIMER le bouton « Ma Niyyah »

TROUVER ce bloc entier et le SUPPRIMER :
```html
  <button class="nav-v2-item active-nav" id="v2nav-sanctuaire" aria-label="Ma Niyyah" onclick="v2GoSanctuaire()">
    <span class="nav-v2-icon"><svg class="nav-orb-svg" viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
  <circle cx="11" cy="11" r="9"/>
  <circle cx="11" cy="11" r="4.5"/>
  <circle cx="11" cy="11" r="1.5" stroke-width="1.8"/>
</svg></span>
    <span class="nav-v2-label" id="nav-label-sanctuaire">Ma Niyyah</span>
  </button>
```

---

## Modif 2 — `index.html` : AJOUTER l'onglet « Repères » en dernier

TROUVER ce bloc (la fin du bouton Nafs, suivi de la fermeture de la barre) :
```html
    <span class="nav-v2-label" id="nav-label-nafs">Nafs</span>
  </button>

</nav>
```

LE REMPLACER par :
```html
    <span class="nav-v2-label" id="nav-label-nafs">Nafs</span>
  </button>

  <!-- REPÈRES -->
  <button class="nav-v2-item" id="v2nav-reperes" aria-label="Repères" onclick="openRepere()">
    <span class="nav-v2-icon"><svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 2 L13.2 8.8 L20 11 L13.2 13.2 L11 20 L8.8 13.2 L2 11 L8.8 8.8 Z"/>
    </svg></span>
    <span class="nav-v2-label" id="nav-label-reperes">Repères</span>
  </button>

</nav>
```

---

## Modif 3 — `index.html` : retirer la carte Repères du Sanctuaire

TROUVER cette ligne et la SUPPRIMER :
```html
  <div id="repere-sanctuaire-slot" style="margin:14px 16px 0;"></div>
```

---

## Modif 4 — `script.js` : retirer l'injection devenue inutile (dans `v2GoSanctuaire`)

TROUVER ces 2 lignes et les SUPPRIMER :
```js
    var _rslot = document.getElementById('repere-sanctuaire-slot');
    if (_rslot && typeof _repereHomeEntry === 'function') _rslot.innerHTML = _repereHomeEntry();
```

---

## Build + commit (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "feat: Reperes en dernier onglet + suppression Ma Niyyah + retrait carte Sanctuaire"
git push
```

## Vérification finale (à me dire)
1. La barre du bas affiche dans l'ordre : Prière · Scanner · Nafs · Repères (plus de « Ma Niyyah »).
2. Le bouton « Repères » (dernier) ouvre bien l'overlay Repères (Istikhâra, Zakât, Fidya, etc.).
3. La carte Repères n'est PLUS sur le Sanctuaire.
4. On revient toujours au Sanctuaire : au lancement, et par les boutons retour (Pratique, Mon chemin, Nafs, Prière). Vérifie que tu n'es jamais bloqué.
5. La barre reste lisible avec 4 onglets.
6. Aucune erreur console.
