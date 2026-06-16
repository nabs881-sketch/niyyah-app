# SPEC-METALS

## Prérequis
**Applique SPEC-ZAKAT.md d'abord** (cette SPEC modifie `openZakat`, créé par SPEC-ZAKAT).

## But
Cours or/argent actualisés automatiquement : une route Worker `/api/metals` va
chercher les prix (gold-api.com en USD/oz) → convertit en **EUR/gramme** (taux BCE
via Frankfurter) → **cache 24h** en KV. Le calculateur pré-remplit les 2 champs prix
à l'ouverture. Si l'API tombe → fallback sur les défauts éditables.

═══════════════════════════════════════════
## PARTIE A — `worker.js`
═══════════════════════════════════════════

### A1 — ajouter la route

Repérer :
```js
    if (path === '/api/bilan-premium' && request.method === 'POST') {
      return handleBilanPremium(request, env);
    }
```
REMPLACER par :
```js
    if (path === '/api/bilan-premium' && request.method === 'POST') {
      return handleBilanPremium(request, env);
    }

    // ── Route Métaux (cours or/argent EUR/g, cache 24h) ──
    if (path === '/api/metals' && request.method === 'GET') {
      return handleMetals(env);
    }
```

### A2 — ajouter le handler

Repérer la ligne (première occurrence) :
```js
async function handleScanner(
```
INSÉRER **juste avant** cette ligne :
```js
async function handleMetals(env) {
  // Cache 24h via KV
  try {
    if (env.RATE_LIMIT_KV) {
      const cached = await env.RATE_LIMIT_KV.get('metals:eur');
      if (cached) return jsonResponse(JSON.parse(cached));
    }
  } catch (e) {}
  try {
    const [xauRes, xagRes, fxRes] = await Promise.all([
      fetch('https://api.gold-api.com/price/XAU'),
      fetch('https://api.gold-api.com/price/XAG'),
      fetch('https://api.frankfurter.app/latest?from=USD&to=EUR'),
    ]);
    const xau = await xauRes.json();
    const xag = await xagRes.json();
    const fx = await fxRes.json();
    const usdEur = fx && fx.rates && fx.rates.EUR ? fx.rates.EUR : null;
    const OZ = 31.1034768; // grammes par once troy
    if (!xau.price || !xag.price || !usdEur) {
      return jsonResponse({ error: 'unavailable' }, 502);
    }
    const data = {
      gold_eur_g: +((xau.price / OZ) * usdEur).toFixed(2),
      silver_eur_g: +((xag.price / OZ) * usdEur).toFixed(2),
      updated: new Date().toISOString(),
    };
    try {
      if (env.RATE_LIMIT_KV) {
        await env.RATE_LIMIT_KV.put('metals:eur', JSON.stringify(data), { expirationTtl: 86400 });
      }
    } catch (e) {}
    return jsonResponse(data);
  } catch (e) {
    return jsonResponse({ error: 'fetch_failed' }, 502);
  }
}

```

### Déploiement Worker (séparé du build app)
```
npx wrangler deploy
```
(ou via le dashboard Cloudflare si tu édites le Worker là-bas)

Test rapide après déploiement (doit renvoyer 403 sans Origin, c'est normal — le test réel se fait depuis l'app).

═══════════════════════════════════════════
## PARTIE B — `script.js`
═══════════════════════════════════════════

### B1 — appeler le fetch à l'ouverture

Repérer (fin de `openZakat`) :
```js
  document.body.appendChild(ov);
  computeZakat();
}
```
REMPLACER par :
```js
  document.body.appendChild(ov);
  computeZakat();
  _zakatFetchPrices();
}
```

### B2 — ajouter la fonction de fetch

Repérer :
```js
window.computeZakat = computeZakat;
```
REMPLACER par :
```js
window.computeZakat = computeZakat;

async function _zakatFetchPrices() {
  try {
    var r = await fetch('https://niyyah-api.nabs881.workers.dev/api/metals');
    if (!r.ok) return;
    var d = await r.json();
    if (d && d.gold_eur_g && d.silver_eur_g) {
      var o = document.getElementById('z-prix-or');
      var a = document.getElementById('z-prix-ar');
      if (o) o.value = String(d.gold_eur_g);
      if (a) a.value = String(d.silver_eur_g);
      computeZakat();
    }
  } catch (e) {}
}
window._zakatFetchPrices = _zakatFetchPrices;
```

### Build app (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "zakat: cours or/argent auto via Worker /api/metals (EUR/g, cache 24h)"
git push
```

═══════════════════════════════════════════
## Vérif attendue
- Ouvrir le calculateur Zakât → après ~1 s, les champs **Prix or** et **Prix argent**
  se remplissent tout seuls avec les cours du jour en EUR/g, et le nisab se recalcule.
- API indisponible → les défauts (95 / 1.10) restent, l'utilisateur peut éditer. Rien ne casse.
- 2e ouverture le même jour → réponse instantanée (cache KV 24h).

## Note
Les prix restent **éditables** : si l'utilisateur veut forcer une autre valeur, il tape par-dessus.
