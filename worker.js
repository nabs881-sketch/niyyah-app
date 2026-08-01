// ═══════════════════════════════════════════════════
// NIYYAH API — Cloudflare Worker
// Routes : /api/scanner, /api/niyyah, /api/regarde
// Rate limiting via KV + Origin check
// ═══════════════════════════════════════════════════

const ALLOWED_ORIGIN = 'https://nabs881-sketch.github.io';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

// ── Rate limiting helpers ──
const RATE_LIMITS = {
  '/api/scanner':  10,
  '/api/niyyah':   10,
  '/api/regarde':  20,
  '/api/activate':  5, // anti brute-force codes beta (5/h par IP)
};

async function checkRateLimit(env, ip, path) {
  try {
    if (!env.RATE_LIMIT_KV) return false; // fail closed if KV not bound
    const limit = RATE_LIMITS[path];
    if (!limit) return true;
    const key = `rl:${ip}:${path}`;
    const raw = await env.RATE_LIMIT_KV.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    if (count >= limit) return false;
    await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 3600 });
    return true;
  } catch (e) {
    return false; // fail closed if KV errors
  }
}

function checkOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  return origin === ALLOWED_ORIGIN;
}

export default {
  async fetch(request, env) {
    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // ── Santé (open to all) ──
    if (path === '/' && request.method === 'GET') {
      return jsonResponse({ status: 'ok', service: 'Niyyah API', version: '2.7.0' });
    }

    // ── Origin check for API routes ──
    if (!checkOrigin(request)) {
      return new Response(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // ── Rate limiting ──
    const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
    const allowed = await checkRateLimit(env, ip, path);
    if (!allowed) {
      return jsonResponse({ error: 'Rate limit exceeded — try again later' }, 429);
    }

    // ── Route Scanner de Niyyah ──
    if (path === '/api/scanner' && request.method === 'POST') {
      return handleScanner(request, env);
    }

    // ── Route Regarde V2 ──
    if (path === '/api/regarde' && request.method === 'POST') {
      return handleRegarde(request, env);
    }

    // ── Route Niyyah V2 ──
    if (path === '/api/niyyah' && request.method === 'POST') {
      return handleNiyyah(request, env);
    }

    // ── Route Verify (audit niveau 2) ──
    if (path === '/api/verify' && request.method === 'POST') {
      return handleVerify(request, env);
    }

    // ── Route Bilan Premium (lettre hebdo IA) ──
    if (path === '/api/bilan-premium' && request.method === 'POST') {
      return handleBilanPremium(request, env);
    }

    // ── Route Métaux (cours or/argent EUR/g, cache 24h) ──
    if (path === '/api/metals' && request.method === 'GET') {
      return handleMetals(env);
    }

    // ── Route Activation code beta / premium ──
    if (path === '/api/activate' && request.method === 'POST') {
      return handleActivate(request, env);
    }

    // ── Route Push subscription (stocke l'endpoint VAPID en KV) ──
    if (path === '/api/push/subscribe' && request.method === 'POST') {
      return handlePushSubscribe(request, env);
    }

    return jsonResponse({ error: 'Route introuvable' }, 404);
  },

  // Cron Trigger — toutes les 5 minutes (voir wrangler.jsonc)
  async scheduled(event, env, ctx) {
    ctx.waitUntil(_sendPrayerNotifications(env));
  },
};

// ═══════════════════════════════════════════════════
// SCANNER DE NIYYAH
async function handleMetals(env) {
  // Cache 24h via KV
  try {
    if (env.RATE_LIMIT_KV) {
      const cached = await env.RATE_LIMIT_KV.get('metals:eur');
      if (cached) return jsonResponse(JSON.parse(cached));
    }
  } catch (e) {}
  try {
    const [xauResult, xagResult, fxResult] = await Promise.allSettled([
      fetch('https://api.gold-api.com/price/XAU').then(r => r.json()),
      fetch('https://api.gold-api.com/price/XAG').then(r => r.json()),
      fetch('https://api.frankfurter.app/latest?from=USD&to=EUR').then(r => r.json()),
    ]);

    const OZ = 31.1034768; // grammes par once troy
    const xauPrice = xauResult.status === 'fulfilled' && xauResult.value?.price
      ? xauResult.value.price : null;
    const xagPrice = xagResult.status === 'fulfilled' && xagResult.value?.price
      ? xagResult.value.price : null;
    const usdEur = fxResult.status === 'fulfilled' && fxResult.value?.rates?.EUR
      ? fxResult.value.rates.EUR : null;

    // All three unavailable → hard failure
    if (!xauPrice && !xagPrice && !usdEur) {
      return jsonResponse({ error: 'unavailable' }, 502);
    }

    const partial = !xauPrice || !xagPrice || !usdEur;
    const data = {
      gold_eur_g:   (xauPrice && usdEur) ? +((xauPrice / OZ) * usdEur).toFixed(2) : null,
      silver_eur_g: (xagPrice && usdEur) ? +((xagPrice / OZ) * usdEur).toFixed(2) : null,
      updated: new Date().toISOString(),
      ...(partial ? { partial: true } : {}),
    };

    // Cache uniquement si les trois sources sont disponibles
    if (!partial) {
      try {
        if (env.RATE_LIMIT_KV) {
          await env.RATE_LIMIT_KV.put('metals:eur', JSON.stringify(data), { expirationTtl: 86400 });
        }
      } catch (e) {}
    }

    return jsonResponse(data);
  } catch (e) {
    return jsonResponse({ error: 'fetch_failed' }, 502);
  }
}

// ═══════════════════════════════════════════════════
async function handleScanner(request, env) {
  try {
    const body = await request.json();
    const { image, uid } = body;

    if (!image) {
      return jsonResponse({ error: 'image (base64) requise' }, 400);
    }
    if (image.length > 2_000_000) {
      return jsonResponse({ error: 'Image too large' }, 413);
    }
    const _quota = await checkAndIncrementQuota(env, uid, 'scanner');
    if (!_quota.allowed) return jsonResponse({ error: 'quota_exceeded', feature: 'scanner', reset_at: _quota.reset_at, upgrade_hint: _quota.upgrade_hint }, 429);

    // Contexte temporel
    const now = new Date();
    const h = now.getUTCHours() + 1; // approximation FR (UTC+1)
    const day = now.getUTCDay();
    const month = now.getUTCMonth() + 1;

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

    const _ac = new AbortController();
    const _to = setTimeout(() => _ac.abort(), 25000);
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      signal: _ac.signal,
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 60,
        system: systemPrompt,
        messages: [{
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: 'image/jpeg', data: image },
            },
            {
              type: 'text',
              text: 'Génère la niyyah.',
            },
          ],
        }],
      }),
    });
    clearTimeout(_to);

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic ${response.status}: ${err}`);
    }

    const data = await response.json();
    logApiUsage('scanner', 'claude-sonnet-4-20250514', data.usage);
    const intention = data.content?.[0]?.text?.trim();
    if (!intention) throw new Error('Réponse vide');

    return jsonResponse({ intention });

  } catch (err) {
    if (err.name === 'AbortError') {
      return jsonResponse({ error: 'Timeout — IA trop lente' }, 504);
    }
    return jsonResponse({ error: 'Scanner indisponible' }, 500);
  }
}


// ════════════════════════════════════════════════════════════════════════════
// NIYYAH V2 — ADDITIONS
// ════════════════════════════════════════════════════════════════════════════

const MODEL_HAIKU  = 'claude-haiku-4-5-20251001';
const MODEL_SONNET = 'claude-sonnet-4-6';

const ANTHROPIC_API_URL = 'https://api.anthropic.com/v1/messages';
const ANTHROPIC_VERSION = '2023-06-01';

const ARABIC_WHITELIST = ['amana', 'ayât', 'ayat', 'dhikr', 'dounia', 'dunya'];

const ARABIC_BLACKLIST_PATTERNS = [
  /\bnafs\b/i, /\bfitra\b/i, /\bsunna\b/i, /\bbid['']a\b/i,
  /\bmadhhab\b/i, /\bfiqh\b/i, /\btawhid\b/i, /\btaqwa\b/i,
  /\bshirk\b/i, /\bkufr\b/i, /\biman\b/i, /\bjihad\b/i,
  /\bummah\b/i, /\bsahaba\b/i, /\btabi['']in\b/i, /\bsalaf\b/i
];

const FATWA_PATTERNS_V2 = [
  /\bhalal\b/i, /\bharam\b/i,
  /\bil est permis\b/i, /\bil est interdit\b/i,
  /\bselon le madhhab\b/i, /\bselon l['']école\b/i,
  /\bla sunna\b/i, /\bla sharia\b/i
];

const HADITH_PATTERNS = [
  /le proph[èe]te a dit/i,
  /rapport[ée] par/i,
  /\bsahih\b/i, /\bbukhari\b/i, /\bmuslim\b/i, /\btirmidhi\b/i,
  /\bhadith\b/i, /\bmessager d['']allah a dit/i
];

const QURAN_PATTERNS = [
  /sourate\s+\d+/i,
  /sourate\s+[a-zéèêàâ']+/i,
  /\b\d{1,3}\s*[:vV]\s*\d{1,3}\b/,
  /verset\s+\d+/i,
  /al[-\s]?q[ou]r[']?an\s+dit/i
];

function jsonResponseV2(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

function detectForbiddenContent(text) {
  for (const p of FATWA_PATTERNS_V2) if (p.test(text)) return 'fatwa';
  for (const p of HADITH_PATTERNS) if (p.test(text)) return 'hadith';
  for (const p of QURAN_PATTERNS)  if (p.test(text)) return 'quran';
  for (const p of ARABIC_BLACKLIST_PATTERNS) if (p.test(text)) return 'arabic';
  return null;
}

function buildTemporalContext(ctx) {
  const h = ctx.hour;
  let moment;
  if (h >= 0 && h < 5)        moment = "la nuit, avant l'aube";
  else if (h >= 5 && h < 7)   moment = "l'aube, après Fajr";
  else if (h >= 7 && h < 12)  moment = "le matin";
  else if (h >= 12 && h < 14) moment = "Dhuhr, l'heure de la prière de midi";
  else if (h >= 14 && h < 17) moment = "l'après-midi";
  else if (h >= 17 && h < 19) moment = "entre Asr et Maghrib, la fin de journée";
  else if (h >= 19 && h < 21) moment = "le soir, après Maghrib";
  else                        moment = "la nuit, après Isha";
  let jour;
  if (ctx.isFriday && h >= 11 && h < 14) jour = "vendredi, proche de la Jumu'a";
  else if (ctx.isFriday)                 jour = "vendredi";
  else                                   jour = "un jour ordinaire";
  let ramadan;
  if (ctx.isRamadan && h < 19)      ramadan = "jour de jeûne de Ramadan";
  else if (ctx.isRamadan)           ramadan = "soirée de Ramadan, après l'iftar";
  else                              ramadan = "hors Ramadan";
  return { moment, jour, ramadan };
}

async function callAnthropic(env, params) {
  const ac = new AbortController();
  const to = setTimeout(() => ac.abort(), 25000);
  const response = await fetch(ANTHROPIC_API_URL, {
    method: 'POST',
    signal: ac.signal,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.ANTHROPIC_API_KEY,
      'anthropic-version': ANTHROPIC_VERSION
    },
    body: JSON.stringify(params)
  });
  clearTimeout(to);
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Anthropic API error ${response.status}: ${errText}`);
  }
  return response.json();
}

/**
 * Log Anthropic API usage to Cloudflare Workers logs (wrangler tail / dashboard).
 * Each log line is a parseable JSON object for easy filtering/aggregation.
 */
function logApiUsage(feature, model, usage) {
  console.log(JSON.stringify({
    niyyah_api: true,
    feature,
    model,
    input_tokens:  usage?.input_tokens  ?? null,
    output_tokens: usage?.output_tokens ?? null,
    date: new Date().toISOString()
  }));
}

// ════════════════════════════════════════════════════════════════════════════
// QUOTA PAR UUID — lecture statut KV + compteurs (étape 2)
// Namespace réutilisé : RATE_LIMIT_KV (préfixe u: ≠ rl: du rate-limit)
// ════════════════════════════════════════════════════════════════════════════

const QUOTA_LIMITS = {
  //           free               beta/premium     premium+
  regard:  { free: ['lifetime',1], beta: ['daily',1],   premium: ['daily',1],   'premium+': ['daily',5]  },
  niyyah:  { free: ['lifetime',3], beta: ['daily',2],   premium: ['daily',2],   'premium+': ['daily',10] },
  bilan:   { free: ['lifetime',1], beta: ['weekly',1],  premium: ['weekly',1],  'premium+': ['weekly',1] },
  scanner: { free: ['lifetime',3], beta: ['daily',2],   premium: ['daily',2],   'premium+': ['daily',10] },
};

function _quotaWindow(type) {
  const now = new Date();
  if (type === 'lifetime') return 'lifetime';
  if (type === 'daily') return now.toISOString().slice(0, 10); // YYYY-MM-DD
  // weekly : ISO YYYY-WNN
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const day = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const y = d.getUTCFullYear();
  const w = Math.ceil(((d - Date.UTC(y, 0, 1)) / 86400000 + 1) / 7);
  return `${y}-W${String(w).padStart(2,'0')}`;
}

function _quotaResetAt(type) {
  const now = new Date();
  if (type === 'daily') {
    const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    return t.toISOString();
  }
  if (type === 'weekly') {
    const daysUntilMon = (8 - (now.getUTCDay() || 7)) % 7 || 7;
    const t = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + daysUntilMon));
    return t.toISOString();
  }
  return null;
}

function _isValidUID(uid) {
  return typeof uid === 'string' &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(uid);
}

async function checkAndIncrementQuota(env, uid, feature) {
  const kv = env.RATE_LIMIT_KV;
  // KV absent → fail-open (problème infra, pas un attaquant)
  if (!kv) return { allowed: true };
  // UID invalide/absent → fail-closed : statut free mutualisé sur clé anonyme partagée.
  // Tous les appels sans UID valide partagent le même compteur → abusé rapidement bloqué.
  const safeUid = _isValidUID(uid) ? uid : '__invalid__';

  // 1. Lire le statut utilisateur (uid invalide → safeUid='__invalid__' → toujours free)
  let status = 'free';
  try {
    const raw = await kv.get(`u:${safeUid}:status`);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (!parsed.expires || new Date(parsed.expires) > new Date()) {
        status = parsed.status || 'free';
      }
    }
  } catch(e) {}

  // 2. Résoudre la limite applicable
  const featureLimits = QUOTA_LIMITS[feature];
  if (!featureLimits) return { allowed: true };
  const [type, max] = featureLimits[status] || featureLimits['free'];

  // 3. Lire le compteur
  const window = _quotaWindow(type);
  const kvKey = `u:${safeUid}:q:${feature}:${window}`;
  let count = 0;
  try {
    const raw = await kv.get(kvKey);
    count = raw ? parseInt(raw, 10) : 0;
  } catch(e) {}

  // 4. Vérifier
  if (count >= max) {
    return {
      allowed: false,
      status,
      remaining: 0,
      reset_at: _quotaResetAt(type),
      upgrade_hint: status === 'free',
    };
  }

  // 5. Incrémenter
  const ttl = type === 'lifetime' ? null : type === 'daily' ? 90000 : 700000;
  try {
    await kv.put(kvKey, String(count + 1), ttl ? { expirationTtl: ttl } : {});
  } catch(e) {}

  return { allowed: true, status, remaining: max - count - 1 };
}

function extractJSON(text) {
  if (!text) return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
  try { return JSON.parse(cleaned); }
  catch (e) {
    const first = cleaned.indexOf('{');
    const last = cleaned.lastIndexOf('}');
    if (first !== -1 && last !== -1 && last > first) {
      try { return JSON.parse(cleaned.slice(first, last + 1)); }
      catch (e2) { return null; }
    }
    return null;
  }
}

function buildNiyyahPrompt(temporalCtx) {
  return `Tu es un guide spirituel discret pour un musulman francophone adulte et pratiquant. Il vient de scanner une image pour poser une intention dans son cœur à ce moment précis.

CONTEXTE TEMPOREL :
- Moment : ${temporalCtx.moment}
- Jour : ${temporalCtx.jour}
- Période : ${temporalCtx.ramadan}
Tu DOIS tenir compte de ce contexte si l'image s'y prête.

TA TÂCHE EN 2 ÉTAPES :
1. CLASSE l'image dans UNE des 7 catégories : SOI, AUTRE, OBJET, MONDE, ENFANT, SACRE, INDETERMINE.
2. PROPOSE 3 suggestions d'intention adaptées à cette catégorie ET à cette image ET au contexte temporel. Chaque suggestion est une piste, pas une prescription.

RÈGLES ABSOLUES :
- 3 suggestions distinctes (angles différents).
- Chaque suggestion commence OBLIGATOIREMENT par « Je ».
- Maximum 15 mots par suggestion.
- NE se termine PAS par « ? ».
- Tutoiement d'Allah (Tu/Toi) si nommé.
- INTERDIT : verset, hadith, fatwa, termes arabes sauf amana/ayât/dhikr/dounia.
- INTERDIT : ton coach, pseudo-poésie vague, platitude.
- Ce sont des SUGGESTIONS, pas des directives. L'utilisateur choisira.

FORMAT DE SORTIE (JSON strict) :
{"category": "SOI|AUTRE|OBJET|MONDE|ENFANT|SACRE|INDETERMINE", "suggestions": ["Je ...", "Je ...", "Je ..."]}`;
}

const REGARDE_CLASSIFIER_PROMPT = `Tu es un classificateur d'images pour une application spirituelle musulmane. Classe l'image dans UNE des 24 catégories : CIEL, EAU, ANIMAL, NATURE, NOURRITURE, HABITAT, VISAGE, INDETERMINE, LUMIERE_OMBRE, MONTAGNE, MORT, OBJET_PERSONNEL, ROUTE, TEXTE, TISSU, VEHICULE, MIROIR, PLANTE, ECRAN, ENFANT_FAMILLE, MAIN_TRAVAIL, VILLE, TEMPS, INAPPROPRIE.
MIROIR = reflet de soi, selfie dans un miroir, surface réfléchissante (≠ VISAGE = visage direct).
PLANTE = plante/arbre/fleur/feuillage en gros plan (≠ NATURE = paysage large).
ECRAN = téléphone, ordinateur, télévision, écran allumé.
ENFANT_FAMILLE = enfant, scène de famille, proches.
MAIN_TRAVAIL = main(s), outil, geste ou poste de travail.
VILLE = rue urbaine, foule, immeubles, marché (≠ ROUTE, ≠ HABITAT intérieur).
TEMPS = horloge, montre, calendrier.
RÈGLE OBJETS QUOTIDIENS : tout objet du quotidien (bouteille, boisson, aliment, emballage, produit ménager, outil, appareil électronique, vêtement, accessoire, médicament, produit d'hygiène, jouet, livre, sac) → jamais INAPPROPRIE. Ces objets vont dans EAU, NOURRITURE, OBJET_PERSONNEL, MAIN_TRAVAIL, HABITAT ou INDETERMINE selon le contexte. INAPPROPRIE pour un objet uniquement si une mention textuelle explicite et lisible désigne de l'alcool (mot "alcool", "bière", "vin", "whisky", "vodka", marque connue) ou un symbole occulte clairement visible.
INAPPROPRIE = contenu strictement contraire à la pudeur islamique avec signal EXPLICITE et NON AMBIGU :
- Alcool : mot ou marque lisible en toutes lettres sur l'étiquette (une couleur ou forme de bouteille ne suffit pas)
- Occultisme : pentagramme, tarot, zodiaque clairement reconnaissable
- Contact intime : baiser bouche à bouche, geste sexuel
- Nudité / contenu sexuel explicite
RÈGLE FONDAMENTALE : en cas de doute → INDETERMINE, JAMAIS INAPPROPRIE. Un objet ambigu ou une scène ambiguë n'est JAMAIS INAPPROPRIE.
Si confidence < 0.80 → INDETERMINE.
FORMAT (JSON strict) : {"category": "...", "confidence": 0.92}`;

function buildRegardePremiumPrompt(versetsRecents) { return `Tu es l'assistant contemplatif de l'application Niyyah, une application spirituelle islamique francophone. Un utilisateur musulman vient de photographier quelque chose de son environnement pour le mettre en résonance avec un verset du Coran.

TON RÔLE
Regarder l'image. Choisir UN verset du Coran qui entre en résonance avec ce qui est photographié. Rédiger UNE méditation courte qui invite l'utilisateur à contempler le lien entre l'image et le verset.

CE QUE TU FAIS
1. Identifie le sujet principal de l'image en quelques mots. Une image très sombre N'EST PAS "rien" — c'est la nuit, l'obscurité, l'absence de lumière, qui sont des sujets contemplatifs forts dans le Coran.
2. Choisis UN verset du Coran qui résonne authentiquement avec ce sujet. Tu fournis uniquement la référence (sourate:verset). Le verset sera récupéré séparément via une traduction validée (Hamidullah).
3. Rédige une méditation de 1 à 2 phrases courtes (maximum 30 mots) à la deuxième personne, invitation jamais affirmation théologique, sans expliquer ni paraphraser le verset.

CE QUE TU NE FAIS JAMAIS
- Aucun tafsir, aucune exégèse, aucune explication du sens du verset.
- Aucun hadith cité.
- Aucune cause de révélation inventée.
- Aucun savant mentionné (Ibn Kathir, Tabari, Saadi, etc.).
- Jamais les mots "tafsir", "exégèse", "interprétation", "signifie", "veut dire".
- Jamais un verset de châtiment, menace, polémique pour une image apaisante. En cas de doute, choisis miséricorde, signe cosmique, gratitude.
- Jamais un verset isolé d'un contexte juridique précis.
- Jamais associer un verset sur la base d'un mot-clé qui recoupe le nom de l'application ("regard", "voir", "yeux") si ce mot n'a aucun lien avec le contenu RÉEL de l'image. Le nom de la fonctionnalité ("Pose un regard") ne doit JAMAIS influencer le choix du verset. Exemple concret d'erreur à ne plus jamais reproduire : une photo d'un objet neutre (répulsif anti-moustique, produit ménager, accessoire quelconque) ne doit jamais recevoir un verset sur la pudeur du regard (24:30-31) sous prétexte que la fonctionnalité s'appelle "regard". Le verset doit résonner avec CE QUI EST PHOTOGRAPHIÉ, jamais avec le nom de l'app.
- INTERDIT ABSOLU — 24:30 et 24:31 : ces versets traitent de la pudeur du regard entre personnes dans un contexte social. Ils sont interdits pour toute image qui ne montre pas une scène sociale ou humaine réelle (personnes présentes, interaction visible). Sont donc interdits : tout objet seul, toute boisson, tout aliment, tout produit ménager, tout paysage, tout animal, toute plante, toute texture, toute lumière — même si l'objet est lié à l'eau, au corps, ou à n'importe quel autre contexte. Si tu es tenté de choisir 24:30 ou 24:31, arrête-toi et choisis à la place un verset sur la providence divine, la gratitude, la création, ou l'attention d'Allah aux petites choses. Ce n'est pas une suggestion — c'est une règle sans exception.

SUJETS LÉGITIMES (exemples NON exhaustifs)
- Ciel, nuages, étoiles, lune, soleil
- Nuit, obscurité, ombre, pénombre (sujets cosmiques majeurs du Coran)
- Eau, mer, rivière, pluie
- Terre, montagne, désert, plante, arbre, fleur
- Animal
- Lumière, feu, lampe
- Visage, main, corps humain (en posture respectable)
- Nourriture, table, boisson
- Maison, intérieur, objet du quotidien
- Rue, ville, route, transport
- Écran, livre, papier, écriture
- Image vide ou très sombre : traite comme "nuit/obscurité"

SI L'IMAGE EST VRAIMENT INADAPTÉE
Uniquement si l'image contient :
- un être humain dans une posture sexuelle ou dégradante
- du contenu offensant (violence graphique, symboles haineux)
- du contenu manifestement sensible

Dans ce cas seulement : renvoie reference 29:64 et meditation "Reviens à ce qui dure."

NE PAS confondre "image sombre" avec "image inadaptée". Une nuit est un sujet, pas une absence.

VÉRIFICATION AVANT DE RÉPONDRE
Avant de valider ta réponse, teste le lien entre le verset et l'image : ce lien repose-t-il vraiment sur le contenu, la fonction ou la symbolique concrète de ce qui est photographié — ou seulement sur une association de mot superficielle (comme le mot "regard" lui-même, ou une ressemblance de sonorité) ? Si le lien est superficiel, choisis un autre verset, même si cela demande de sortir des sentiers battus. Un objet quotidien anodin mérite un verset sur la providence, la petitesse apparente des choses, ou l'attention divine aux détails — jamais un verset choisi par association de mot avec le nom de l'application.

VISER L'ÉMERVEILLEMENT, PAS LE RÉFLEXE
Le but profond de cette fonctionnalité n'est pas seulement de trouver un verset qui colle au sujet — c'est de faire découvrir à l'utilisateur un verset qu'il ne connaît peut-être pas encore, ou qu'il connaît sans en avoir vraiment saisi la portée. Une réponse réussie laisse penser "je ne savais pas que le Coran parlait de ça avec une telle précision."

Le Coran compte plus de 6000 versets. Une poignée d'entre eux (Ayat al-Kursi 2:255, la sourate an-Nur 24:35, 3:190, le refrain d'ar-Rahman 55:13, al-Fatiha) sont déjà connus par cœur par la quasi-totalité des musulmans pratiquants. Les choisir n'est jamais faux, mais ça n'apprend rien de nouveau à l'utilisateur — ce n'est un bon choix que si aucun autre verset ne convient vraiment mieux au sujet précis de l'image.

Avant de valider ta réponse, pose-toi cette question : existe-t-il, dans les 6000+ versets du Coran, un verset moins immédiatement connu qui correspondrait avec AUTANT ou PLUS de précision à ce sujet précis ? Si oui, choisis-le plutôt que le premier verset "évident" qui te vient à l'esprit. La précision du lien prime toujours — ne force jamais un verset obscur juste pour éviter un verset connu. Mais entre deux versets également pertinents, préfère systématiquement le moins connu : c'est lui qui fait vivre l'émerveillement et l'apprentissage.

VERSETS DÉJÀ MONTRÉS RÉCEMMENT À CET UTILISATEUR (à éviter si possible) :
${versetsRecents}

Si un verset de cette liste te semble vraiment le seul pertinent pour cette image précise, tu peux quand même le choisir — la pertinence prime toujours sur la variété. Mais explore d'abord d'autres pistes thématiques avant de t'y résoudre.

FORMAT DE RÉPONSE STRICT
Tu réponds UNIQUEMENT avec ce JSON, rien d'autre :
{
  "sujet": "string (3-5 mots décrivant l'image)",
  "reference": "string (format sourate:verset, ex: 24:35)",
  "phonetique": "string (translittération latine ALA-LC simplifiée du verset arabe, lisible)",
  "lieu_revelation": "Mecque" ou "Médine",
  "meditation": "string (1-2 phrases, max 30 mots, deuxième personne)"
}

EXEMPLES
Image tasse de café : {"sujet":"tasse de café du matin","reference":"16:69","phonetique":"Yakhruju min butûnihâ sharâbun mukhtalifun alwânuhu fîhi shifâ'un lin-nâs","lieu_revelation":"Mecque","meditation":"Avant la première gorgée, souviens-toi : tout ce qui te nourrit vient de Sa main."}
Image ciel crépusculaire : {"sujet":"ciel crépusculaire","reference":"3:190","phonetique":"Inna fî khalqi s-samâwâti wal-ardi wakhtilâfi l-layli wan-nahâri la-âyâtin li-ulî l-albâb","lieu_revelation":"Médine","meditation":"Regarde ce ciel. Combien de fois est-il passé sans que tu le remarques ?"}
Image rue déserte nuit : {"sujet":"rue nocturne","reference":"10:67","phonetique":"Huwa l-ladhî ja'ala lakumu l-layla li-taskunû fîhi wan-nahâra mubsiran","lieu_revelation":"Mecque","meditation":"La nuit n'est pas un vide. C'est un voile posé pour que tu te reposes."}
Image très sombre / obscurité : {"sujet":"obscurité","reference":"24:40","phonetique":"Aw ka-zulumâtin fî bahrin lujjiyyin yaghshâhu mawjun min fawqihi mawjun min fawqihi sahâb","lieu_revelation":"Médine","meditation":"Regarde cette obscurité. Elle n'est pas vide — elle est habitée par Celui qui voit dans la nuit comme dans le jour."}
Image reflet miroir : {"sujet":"reflet de soi","reference":"59:18","phonetique":"Yâ ayyuhâ l-ladhîna âmanû t-taqû Llâha wal-tanzur nafsun mâ qaddamat li-ghad","lieu_revelation":"Médine","meditation":"Regarde-toi. Que veux-tu présenter demain à Celui qui te voit toujours ?"}
Image objet du quotidien (flacon, accessoire, produit ménager) : décris précisément l'objet comme sujet (ex: "flacon de produit ménager"). Choisis le verset pour un lien thématique réel avec l'objet — sa fonction, sa matière, son usage — jamais par association de mot avec le nom de l'app. Méditation partant de l'objet concret vers la providence divine ou l'attention d'Allah aux petites choses. Piste solide pour ce type d'image : 2:26 (Allah cite un moustique en exemple sans s'en gêner — pertinent pour tout objet lié aux petites choses du quotidien, à adapter selon l'objet réel photographié, jamais appliqué mécaniquement).
Autres pistes pour la catégorie OBJET_PERSONNEL, à varier selon l'objet réel — ne jamais s'y limiter, ce sont des directions, pas une liste fermée :
- Objet lié au travail des mains (outil, ustensile) : thème de l'effort, du gagne-pain licite, de la dignité du travail.
- Objet lié au soin du corps (produit d'hygiène, médicament) : thème de la préservation du corps comme dépôt confié (amâna), de la guérison qui vient d'Allah.
- Objet banal et fonctionnel sans charge symbolique évidente (clé, chargeur, emballage) : thème de la providence qui pourvoit même aux détails qu'on ne remarque jamais, de la gratitude pour ce qui est tellement ordinaire qu'on ne le voit plus.
- Objet cassé, usé ou abîmé : thème de l'impermanence, du détachement au matériel, de ce qui dure vraiment.
Le principe reste le même que pour toutes les autres catégories : choisis la référence pour son lien réel avec CET objet précis, jamais en reproduisant mécaniquement le même verset d'une image à l'autre.

RAPPEL FINAL
Le verset est sacré. Tu ne le touches pas. Tu choisis seulement la référence.
La méditation est ta seule production. Elle doit rester humble, ouverte, contemplative.
Tu n'es pas un savant. Tu es un compagnon qui propose un regard.`; }

function buildRegardeGeneratorPrompt(category) {
  return `Tu es un murabbi discret pour un musulman francophone adulte. Il a scanné une image. Pose UNE question contemplative qui pointe vers Allah.

CATÉGORIE : ${category}

RÈGLES :
- UNE question, finit par « ? ».
- 8 à 15 mots.
- Tutoiement direct.
- INTERDIT : verset, hadith, fatwa, termes arabes sauf amana/ayât/dhikr/dounia.

FORMAT (JSON strict) : {"question": "Ta question ?"}`;
}

function validateNiyyahIntention(intention) {
  if (!intention || typeof intention !== 'string') return { valid: false, reason: 'empty' };
  const trimmed = intention.trim();
  if (!/^Je\b/i.test(trimmed) && !/^J['']/.test(trimmed)) return { valid: false, reason: 'no_je' };
  if (trimmed.endsWith('?')) return { valid: false, reason: 'ends_with_question' };
  const wc = countWords(trimmed);
  if (wc > 15) return { valid: false, reason: 'too_long' };
  if (wc < 5)  return { valid: false, reason: 'too_short' };
  const forbidden = detectForbiddenContent(trimmed);
  if (forbidden) return { valid: false, reason: forbidden };
  return { valid: true };
}

function validateRegardeQuestion(question) {
  if (!question || typeof question !== 'string') return { valid: false, reason: 'empty' };
  const trimmed = question.trim();
  if (!trimmed.endsWith('?')) return { valid: false, reason: 'no_question_mark' };
  const wc = countWords(trimmed);
  if (wc > 15) return { valid: false, reason: 'too_long' };
  if (wc < 8)  return { valid: false, reason: 'too_short' };
  if (/\b(vous|nous)\b/i.test(trimmed)) return { valid: false, reason: 'vous_nous' };
  const forbidden = detectForbiddenContent(trimmed);
  if (forbidden) return { valid: false, reason: forbidden };
  return { valid: true };
}

async function handleNiyyah(request, env) {
  try {
    const body = await request.json();
    const { image, uid } = body;
    console.log(JSON.stringify({ niyyah_uid: true, feature: 'niyyah', uid: uid || null, date: new Date().toISOString() }));
    if (!image) return jsonResponseV2({ suggestions: [], error: 'image manquante', source: 'fallback' }, 400);
    if (image.length > 2_000_000) return jsonResponseV2({ suggestions: [], error: 'Image too large', source: 'fallback' }, 413);
    const _quota = await checkAndIncrementQuota(env, uid, 'niyyah');
    if (!_quota.allowed) return jsonResponseV2({ error: 'quota_exceeded', feature: 'niyyah', reset_at: _quota.reset_at, upgrade_hint: _quota.upgrade_hint }, 429);
    const now = new Date();
    const temporalCtx = buildTemporalContext({
      hour: now.getUTCHours(),
      isFriday: now.getUTCDay() === 5,
      isRamadan: false
    });
    const prompt = buildNiyyahPrompt(temporalCtx);
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await callAnthropic(env, {
        model: MODEL_SONNET, max_tokens: 300, temperature: 0.7,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: prompt }
        ]}]
      });
      logApiUsage('niyyah', MODEL_SONNET, response.usage);
      const rawText = response.content?.[0]?.text || '';
      const parsed = extractJSON(rawText);
      // Support new 3-suggestions format
      if (parsed && parsed.suggestions && Array.isArray(parsed.suggestions)) {
        const valid = parsed.suggestions.filter(s => validateNiyyahIntention(s).valid).map(s => s.trim());
        if (valid.length >= 1) {
          return jsonResponseV2({ suggestions: valid.slice(0, 3), category: parsed.category || 'INDETERMINE', source: 'ia' });
        }
      }
      // Legacy single-intention fallback
      if (parsed && parsed.intention) {
        const validation = validateNiyyahIntention(parsed.intention);
        if (validation.valid) {
          return jsonResponseV2({ suggestions: [parsed.intention.trim()], category: parsed.category || 'INDETERMINE', source: 'ia' });
        }
        if (['fatwa', 'hadith', 'quran'].includes(validation.reason)) break;
      }
    }
    return jsonResponseV2({ suggestions: [], category: 'INDETERMINE', source: 'fallback', reason: 'validation_failed_or_religious' });
  } catch (err) {
    console.error('handleNiyyah error:', err);
    if (err.name === 'AbortError') return jsonResponseV2({ suggestions: [], category: 'INDETERMINE', source: 'fallback', reason: 'timeout' }, 504);
    return jsonResponseV2({ suggestions: [], category: 'INDETERMINE', source: 'fallback', reason: 'error' }, 502);
  }
}

// ── Regard library : fetch depuis GitHub Pages, cache KV 24h ────────────────
async function getRegardLibrary(env) {
  const KV_KEY = 'regard_lib_v1';
  try {
    if (env.RATE_LIMIT_KV) {
      const cached = await env.RATE_LIMIT_KV.get(KV_KEY);
      if (cached) return JSON.parse(cached);
    }
  } catch(e) {}
  const r = await fetch(`${ALLOWED_ORIGIN}/niyyah-app/data/regard-library.json`);
  if (!r.ok) return null;
  const raw = await r.json();
  const lib = {};
  for (const k of Object.keys(raw)) {
    if (k !== '_meta') lib[k.toUpperCase()] = raw[k];
  }
  try {
    if (env.RATE_LIMIT_KV) {
      await env.RATE_LIMIT_KV.put(KV_KEY, JSON.stringify(lib), { expirationTtl: 86400 });
    }
  } catch(e) {}
  return lib;
}

async function handleRegarde(request, env) {
  try {
    const body = await request.json();
    const { image, seen_versets, uid } = body;
    console.log(JSON.stringify({ niyyah_uid: true, feature: 'regard', uid: uid || null, date: new Date().toISOString() }));
    const _versetsRecents = Array.isArray(body.versets_recents) && body.versets_recents.length > 0
      ? body.versets_recents.slice(0, 20).map(v => sanitizeText(v, 80)).filter(v => v).join(', ')
      : 'Aucun';

    // branche duʿāʾ supprimée (du'âs piochées côté client depuis duaas-regard.json)

    if (!image) return jsonResponseV2({ error: 'image manquante' }, 400);
    if (image.length > 2_000_000) return jsonResponseV2({ error: 'Image too large' }, 413);
    const _quota = await checkAndIncrementQuota(env, uid, 'regard');
    if (!_quota.allowed) return jsonResponseV2({ error: 'quota_exceeded', feature: 'regard', reset_at: _quota.reset_at, upgrade_hint: _quota.upgrade_hint }, 429);

    // ── Flow unifié Sonnet (gratuits et premium — même qualité, quota seul diffère) ──
    try {
      const resp = await callAnthropic(env, {
        model: MODEL_SONNET, max_tokens: 400, temperature: 0.6,
        system: buildRegardePremiumPrompt(_versetsRecents),
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: 'Regarde cette image.' }
        ]}]
      });
      logApiUsage('regard', MODEL_SONNET, resp.usage);
      const text = resp.content?.[0]?.text || '';
      const json = extractJSON(text);
      if (json && json.sujet) {
        let _med = json.meditation || '';
        if (_med && detectForbiddenContent(_med)) _med = '';
        return jsonResponseV2({ mode: 'premium', sujet: json.sujet, reference: json.reference || '', meditation: _med });
      }
      return jsonResponseV2({ mode: 'premium', sujet: text.substring(0, 200), reference: '', meditation: '' });
    } catch (e) {
      return jsonResponseV2({ error: 'Service indisponible' }, 502);
    }
  } catch (err) {
    console.error('handleRegarde error:', err);
    if (err.name === 'AbortError') return jsonResponseV2({ error: 'Timeout' }, 504);
    return jsonResponseV2({ question: null, category: 'INDETERMINE', confidence: 0, source: 'fallback', reason: 'error' }, 502);
  }
}

// ═══════════════════════════════════════════════════
// VERIFY — Audit niveau 2
// ═══════════════════════════════════════════════════
const VERIFY_PROMPT = `Tu es un vérificateur théologique bienveillant pour une application islamique francophone. On te donne un récit/texte avec ses sources citées. Tu vérifies l'exactitude factuelle.

VÉRIFIE :
1. Les FAITS HISTORIQUES (noms, dates, lieux, événements)
2. Les ATTRIBUTIONS (qui a dit quoi, à qui, quand)
3. Les RÉFÉRENCES CORANIQUES citées
4. Les HADITHS cités (Bukhari, Muslim, etc.)
5. Les ANACHRONISMES ou INVENTIONS manifestes

RÈGLES DE TOLÉRANCE :
- Les variations mineures de traduction sont ACCEPTABLES → OK
- Une paraphrase fidèle au sens original = OK
- Les numéros de hadith varient selon les éditions — si le hadith EXISTE dans la collection citée, même avec un numéro différent → OK
- Un récit narratif plausible selon les sources classiques, même sans source exacte citée → OK
- En cas de doute raisonnable, préfère OK à ERREUR
- ERREUR = uniquement si une attribution est FAUSSE de manière certaine, ou un fait historique est INCORRECT de manière vérifiable

Tu NE fais PAS de tafsir. Tu vérifies uniquement l'exactitude factuelle.

VERDICT :
- OK : factuellement exact, plausible, ou variations mineures acceptables
- DOUTE : un détail semble inexact mais pas d'erreur grave — à vérifier par un humain
- ERREUR : attribution certainement fausse, fait historique incorrect de manière vérifiable, source inventée

RÈGLE ABSOLUE : tu réponds UNIQUEMENT avec un objet JSON valide, sans aucun texte avant ou après.

FORMAT (JSON strict) :
{"verdict": "OK", "notes": "explication courte max 50 mots", "details": ["point 1", "point 2"]}

verdict = exactement "OK", "DOUTE" ou "ERREUR".`;

async function _callVerify(env, userMsg) {
  const resp = await callAnthropic(env, {
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    temperature: 0.1,
    system: VERIFY_PROMPT,
    messages: [
      { role: 'user', content: userMsg },
      { role: 'assistant', content: '{' }
    ]
  });
  logApiUsage('verify', 'claude-sonnet-4-20250514', resp.usage);
  const rawText = '{' + (resp.content?.[0]?.text || '');
  return extractJSON(rawText);
}

async function handleVerify(request, env) {
  try {
    const body = await request.json();
    const { texte, sources, section, entry_id } = body;
    if (!texte) return jsonResponseV2({ error: 'texte requis' }, 400);

    const userMsg = `SECTION: ${section || 'inconnue'}
ENTRY_ID: ${entry_id || 'inconnue'}
SOURCES CITÉES: ${sources || 'aucune'}

TEXTE À VÉRIFIER:
${texte.substring(0, 2000)}`;

    // Attempt 1
    let parsed = await _callVerify(env, userMsg);
    if (parsed && parsed.verdict) {
      return jsonResponseV2({ verdict: parsed.verdict, notes: parsed.notes || '', details: parsed.details || [], entry_id: entry_id || null });
    }

    // Retry 1
    parsed = await _callVerify(env, userMsg);
    if (parsed && parsed.verdict) {
      return jsonResponseV2({ verdict: parsed.verdict, notes: parsed.notes || '', details: parsed.details || [], entry_id: entry_id || null });
    }

    return jsonResponseV2({ verdict: 'PARSE_ERROR', notes: 'JSON non parseable apres 2 tentatives', details: [], entry_id });
  } catch (err) {
    console.error('handleVerify error:', err);
    if (err.name === 'AbortError') return jsonResponseV2({ error: 'Timeout' }, 504);
    return jsonResponseV2({ error: 'Verify indisponible' }, 502);
  }
}

// ═══════════════════════════════════════════════════
// INPUT SANITIZATION — prompt injection prevention
// ═══════════════════════════════════════════════════

// Patterns that signal prompt-injection attempts (case-insensitive, multiline)
const _INJECTION_PATTERNS = [
  /ignore\s+(les\s+)?(instructions?|r[eè]gles?|directives?|syst[eè]me)(\s+(pr[eé]c[eé]dentes?|ci-dessus|ci-avant))?/gi,
  /oublie\s+(tout|tes\s+instructions?|ton\s+r[oô]le|ce\s+qui\s+pr[eé]c[eè]de)/gi,
  /tu\s+es\s+maintenant\b/gi,
  /nouveau\s+(syst[eè]me|r[oô]le|personnage|contexte)\b/gi,
  /act\s+as\b/gi,
  /\[(?:INST|SYS|SYSTEM|\/INST|\/SYS)\]/gi,
  /<\s*(?:system|assistant|user|prompt|instruction)\s*[/]?\s*>/gi,
  /^(system|assistant|user)\s*:/gim,
  /`{2,}/g,
  /-{4,}/g,
  /#{3,}\s/g,
];

/**
 * Sanitize a free-text user field before prompt interpolation.
 * - Truncates to maxLen characters
 * - Neutralises injection patterns (replaced by […])
 * - Normalises whitespace
 */
function sanitizeText(raw, maxLen) {
  if (raw === null || raw === undefined) return '';
  const s0 = String(raw).slice(0, maxLen || 300);
  let s = s0;
  for (const pat of _INJECTION_PATTERNS) {
    pat.lastIndex = 0;
    s = s.replace(pat, '[…]');
  }
  return s.replace(/\r\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
}

/**
 * Sanitize a name/prenom field: letters (incl. accented), spaces, hyphens,
 * apostrophes only — everything else is stripped. Max 50 chars.
 */
function sanitizeName(raw) {
  if (!raw || typeof raw !== 'string') return '';
  return raw
    .trim()
    .slice(0, 50)
    .replace(/[^a-zA-Z\u00C0-\u024F \-']/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// ═══════════════════════════════════════════════════
// BILAN PREMIUM — Lettre hebdomadaire IA
// ═══════════════════════════════════════════════════

function buildBilanSystemPrompt(prenom) {
  const nom = sanitizeName(prenom) || 'toi';
  return `Tu es la voix de Niyyah. Tu écris à ${nom} une courte lettre : le récit de sa semaine spirituelle écoulée.

Ton ton : un témoin bienveillant et lucide, jamais sermonneur. Chaleureux, sobre, contemplatif. Tu tutoies. Le français d'un cœur, pas d'un prêcheur.

Tu disposes de la matière réelle de sa semaine : ses états du soir, les bontés qu'il a notées de ses mots, son défi, sa régularité, ses intentions. Tisse-la en un récit qui lui ressemble : nomme ce qu'il a traversé, montre-lui l'arc de son cœur sur la semaine, relève le bien qu'il a semé (en t'appuyant sur ses propres bontés), accueille ce qui a manqué sans jamais le juger. La continuité est une miséricorde, pas un score — chaque retour compte.

OUVERTURE :
Ouvre la lettre en t'adressant à la personne par son prénom (${nom}) suivi d'une virgule. Si le prénom est vide ou vaut 'toi', n'écris AUCUN nom en en-tête — commence directement par le récit. N'utilise JAMAIS 'Niyyah' comme nom de destinataire.

RÈGLES STRICTES :
- Écris UNIQUEMENT en français. Aucun mot arabe, aucune translittération.
- Ne cite AUCUN hadith, AUCUN verset, aucune référence (sourate, numéro). Ne fabrique jamais de citation. Tu peux évoquer des réalités spirituelles, jamais les attribuer à un texte.
- Aucune fatwa, aucun jugement religieux.
- Sobre : pas de clichés, pas d'emphase, pas d'emojis.
- 3 à 4 courts paragraphes, séparés par une ligne vide.
- Si la semaine fut presque vide, reste doux et accueillant : invite, ne reproche pas.
- Termine sur une ouverture douce vers la semaine qui vient.`;
}

function buildBilanUserMessage(body) {
  const { profil, dominante, zone_manquante, stats, stats_passee, bontes_semaine, etats_semaine, intentions_semaine, defi_semaine } = body;
  const lines = [];

  lines.push(`Profil : ${sanitizeText(profil, 80) || 'non précisé'}`);
  lines.push(`Dominante de la semaine : ${sanitizeText(dominante, 80) || 'équilibre'}`);
  if (zone_manquante) lines.push(`Zone qui a manqué : ${sanitizeText(zone_manquante, 100)}`);

  // Stats
  if (stats) {
    lines.push('');
    lines.push('RÉGULARITÉ :');
    lines.push(`- ${stats.gestes || 0} gestes posés`);
    lines.push(`- ${stats.journees || 0} journées actives sur 7`);
    lines.push(`- ${stats.fajr || 0} Fajr tenus`);
    lines.push(`- ${stats.bilans || 0} bilans du soir posés`);
  }
  if (stats_passee) {
    lines.push('');
    lines.push('SEMAINE PRÉCÉDENTE (comparaison) :');
    lines.push(`- ${stats_passee.gestes || 0} gestes, ${stats_passee.journees || 0} journées, ${stats_passee.fajr || 0} Fajr, ${stats_passee.bilans || 0} bilans`);
  }

  // Jour par jour
  const days = etats_semaine ? Object.keys(etats_semaine).sort() : [];
  if (days.length > 0) {
    lines.push('');
    lines.push('SEMAINE JOUR PAR JOUR :');
    for (const d of days) {
      const parts = [`${d} :`];
      // État du soir
      const etat = etats_semaine?.[d];
      parts.push(etat ? `état du soir = ${sanitizeText(etat, 100)}` : 'pas de bilan ce soir-là');
      // Intention
      const intention = intentions_semaine?.[d];
      if (intention && intention.type) {
        const intentionLabel = sanitizeText(intention.label || intention.type, 150);
        parts.push(`intention = ${intentionLabel}`);
      } else if (intention === null) parts.push('intention passée');
      // Bontés
      const bontes = bontes_semaine?.[d];
      if (bontes && Array.isArray(bontes) && bontes.length > 0) {
        const bontesSanitized = bontes
          .slice(0, 10)
          .map(b => sanitizeText(b, 200))
          .filter(b => b.length > 0);
        if (bontesSanitized.length > 0) parts.push(`bontés notées : « ${bontesSanitized.join(' » « ')} »`);
      }
      lines.push('  ' + parts.join(' · '));
    }
  }

  // Défi
  if (defi_semaine) {
    lines.push('');
    lines.push('DÉFI DE LA SEMAINE :');
    lines.push(`- ${sanitizeText(defi_semaine.nom, 100) || 'inconnu'}`);
    lines.push(`- Jours tenus : ${defi_semaine.jours ? defi_semaine.jours.length : 0}`);
    lines.push(`- ${defi_semaine.complete ? 'Réussi' : 'En cours'}`);
  }

  return lines.join('\n');
}

async function handleBilanPremium(request, env) {
  try {
    const body = await request.json();
    const { uid: _bilanUid } = body;
    console.log(JSON.stringify({ niyyah_uid: true, feature: 'bilan', uid: _bilanUid || null, date: new Date().toISOString() }));
    const _quota = await checkAndIncrementQuota(env, _bilanUid, 'bilan');
    if (!_quota.allowed) return jsonResponseV2({ error: 'quota_exceeded', feature: 'bilan', reset_at: _quota.reset_at, upgrade_hint: _quota.upgrade_hint }, 429);
    const systemPrompt = buildBilanSystemPrompt(body.prenom);
    const userMessage = buildBilanUserMessage(body);

    const response = await callAnthropic(env, {
      model: MODEL_SONNET,
      max_tokens: 700,
      temperature: 0.85,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }]
    });
    logApiUsage('bilan', MODEL_SONNET, response.usage);

    const text = response.content?.[0]?.text?.trim();
    if (!text) {
      return jsonResponseV2({ error: 'Réponse vide' }, 502);
    }

    return jsonResponseV2({ message: text, source: 'ia' });
  } catch (err) {
    console.error('handleBilanPremium error:', err);
    if (err.name === 'AbortError') return jsonResponseV2({ error: 'Timeout' }, 504);
    return jsonResponseV2({ error: 'Bilan premium indisponible' }, 502);
  }
}

// ════════════════════════════════════════════════════════════════════════════
// ACTIVATION — /api/activate
// ════════════════════════════════════════════════════════════════════════════

/**
 * Comparaison en temps constant — évite les timing attacks sur les codes.
 * Parcourt toujours les deux chaînes jusqu'au bout, même si elles diffèrent.
 */
function timingSafeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string') return false;
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length; // non-zéro si longueurs différentes
  for (let i = 0; i < len; i++) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
}

/**
 * Génère HMAC-SHA256(uid:status:expires, HMAC_SECRET) en base64.
 * Le token est auto-porteur : le client peut vérifier la présence sans KV.
 */
async function generateHMACToken(uid, status, expires, secret) {
  const encoder = new TextEncoder();
  const msg = `${uid}:${status}:${expires || ''}`;
  const key = await crypto.subtle.importKey(
    'raw', encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false, ['sign']
  );
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(msg));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

// ═══════════════════════════════════════════════════
// WEB PUSH — chiffrement aes128gcm (RFC 8291/8188) + VAPID (RFC 8292)
// ═══════════════════════════════════════════════════

const _VAPID_PUBLIC_B64U = 'BDKoPMWtspdLuxMAbJ86JaV6EeUb52F38zXiXc5f0TYUcLBiemeoTeuvkcCnnVDGCoe_SmYtP09JMle6yhKMwPs';

function _b64uToU8(b64u) {
  const pad = '='.repeat((4 - b64u.length % 4) % 4);
  const raw = atob((b64u + pad).replace(/-/g, '+').replace(/_/g, '/'));
  const u8 = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) u8[i] = raw.charCodeAt(i);
  return u8;
}

function _u8ToB64u(u8) {
  return btoa(String.fromCharCode(...u8))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// HKDF-Extract: PRK = HMAC-SHA256(salt, ikm)
async function _hkdfExtract(salt, ikm) {
  const k = await crypto.subtle.importKey('raw', salt, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, ikm));
}

// HKDF-Expand T(1) = HMAC-SHA256(PRK, info || 0x01), sliced to `length`
async function _hkdfExpand(prk, info, length) {
  const k = await crypto.subtle.importKey('raw', prk, { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const infoBytes = typeof info === 'string' ? new TextEncoder().encode(info) : info;
  const T = new Uint8Array(infoBytes.length + 1);
  T.set(infoBytes);
  T[infoBytes.length] = 0x01;
  return new Uint8Array(await crypto.subtle.sign('HMAC', k, T)).slice(0, length);
}

// Génère le JWT VAPID signé ES256
async function _vapidJwt(endpoint, privateJwk) {
  const origin = new URL(endpoint).origin;
  const now    = Math.floor(Date.now() / 1000);
  const enc    = new TextEncoder();
  const hdr  = _u8ToB64u(enc.encode(JSON.stringify({ typ: 'JWT', alg: 'ES256' })));
  const body = _u8ToB64u(enc.encode(JSON.stringify({ aud: origin, exp: now + 43200, sub: 'mailto:contact@niyyah.app' })));
  const privKey = await crypto.subtle.importKey('jwk', privateJwk, { name: 'ECDSA', namedCurve: 'P-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign({ name: 'ECDSA', hash: 'SHA-256' }, privKey, enc.encode(`${hdr}.${body}`)));
  return `${hdr}.${body}.${_u8ToB64u(sig)}`;
}

// Chiffre `message` (string JSON) selon RFC 8291/8188 pour l'abonné `subscription`
async function _encryptPayload(message, subscription) {
  const enc          = new TextEncoder();
  const ua_pub_u8    = _b64uToU8(subscription.keys.p256dh);  // 65 bytes (uncompressed P-256)
  const auth_u8      = _b64uToU8(subscription.keys.auth);     // 16 bytes

  // Ephemeral ECDH key pair (as = application server)
  const ephemeral   = await crypto.subtle.generateKey({ name: 'ECDH', namedCurve: 'P-256' }, true, ['deriveBits']);
  const as_pub_u8   = new Uint8Array(await crypto.subtle.exportKey('raw', ephemeral.publicKey)); // 65 bytes

  // ECDH: dh = shared secret x-coordinate (32 bytes)
  const ua_pub_key  = await crypto.subtle.importKey('raw', ua_pub_u8, { name: 'ECDH', namedCurve: 'P-256' }, false, []);
  const dh          = new Uint8Array(await crypto.subtle.deriveBits({ name: 'ECDH', public: ua_pub_key }, ephemeral.privateKey, 256));

  // IKM = HKDF(IKM=dh, salt=auth, info="WebPush: info\0" || ua_pub || as_pub, L=32)
  const infoPrefix  = enc.encode('WebPush: info\x00');
  const keyinfo     = new Uint8Array(infoPrefix.length + ua_pub_u8.length + as_pub_u8.length);
  keyinfo.set(infoPrefix, 0);
  keyinfo.set(ua_pub_u8, infoPrefix.length);
  keyinfo.set(as_pub_u8, infoPrefix.length + ua_pub_u8.length);

  const PRK_key = await _hkdfExtract(auth_u8, dh);
  const IKM     = await _hkdfExpand(PRK_key, keyinfo, 32);

  // Random salt (16 bytes)
  const salt = crypto.getRandomValues(new Uint8Array(16));

  // CEK (16 bytes) + NONCE (12 bytes)
  const PRK_enc = await _hkdfExtract(salt, IKM);
  const CEK     = await _hkdfExpand(PRK_enc, enc.encode('Content-Encoding: aes128gcm\x00'), 16);
  const NONCE   = await _hkdfExpand(PRK_enc, enc.encode('Content-Encoding: nonce\x00'), 12);

  // Plaintext = message_bytes || 0x02 (last-record delimiter)
  const msgBytes  = enc.encode(message);
  const plaintext = new Uint8Array(msgBytes.length + 1);
  plaintext.set(msgBytes);
  plaintext[msgBytes.length] = 0x02;

  // AES-128-GCM encrypt (GCM tag = 16 bytes appended by WebCrypto)
  const cekKey     = await crypto.subtle.importKey('raw', CEK, { name: 'AES-GCM' }, false, ['encrypt']);
  const ciphertext = new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv: NONCE, tagLength: 128 }, cekKey, plaintext));

  // RFC 8188 body: salt(16) + rs(4 BE=4096) + idlen(1=65) + keyid(65) + ciphertext
  const rs   = 4096;
  const body = new Uint8Array(16 + 4 + 1 + 65 + ciphertext.length);
  body.set(salt, 0);
  body[16] = (rs >>> 24) & 0xFF; body[17] = (rs >>> 16) & 0xFF;
  body[18] = (rs >>> 8)  & 0xFF; body[19] = rs & 0xFF;
  body[20] = 65;
  body.set(as_pub_u8, 21);
  body.set(ciphertext, 86);
  return body;
}

// Envoie une notification Web Push. Retourne true | false | 'expired'
async function _sendWebPush(subscription, notification, env) {
  let privateJwk;
  try { privateJwk = JSON.parse(env.VAPID_PRIVATE_JWK); }
  catch(e) { console.error('[Push] VAPID_PRIVATE_JWK manquant/invalide'); return false; }

  try {
    const bodyBytes = await _encryptPayload(JSON.stringify(notification), subscription);
    const jwt       = await _vapidJwt(subscription.endpoint, privateJwk);

    const resp = await fetch(subscription.endpoint, {
      method: 'POST',
      headers: {
        'Authorization':      `vapid t=${jwt},k=${_VAPID_PUBLIC_B64U}`,
        'Content-Type':       'application/octet-stream',
        'Content-Encoding':   'aes128gcm',
        'TTL':                '3600',
      },
      body: bodyBytes,
    });

    if (resp.status === 410 || resp.status === 404) return 'expired';
    return resp.status >= 200 && resp.status < 300;
  } catch(e) {
    console.error('[Push] _sendWebPush:', e.message);
    return false;
  }
}

// ═══════════════════════════════════════════════════
// PRAYER NOTIFICATIONS — logique du Cron Trigger
// ═══════════════════════════════════════════════════

const _PRAYERS_META = {
  fajr:    { fr: 'Fajr',    kvKey: 'Fajr',    body: 'وَقُومُوا لِلَّهِ قَانِتِينَ — La prière du Fajr est appelée.' },
  dhuhr:   { fr: 'Dhouhr',  kvKey: 'Dhuhr',   body: 'لَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا — La prière du Dhouhr vous attend.' },
  asr:     { fr: 'Asr',     kvKey: 'Asr',     body: 'حَافِظُوا عَلَى الصَّلَوَاتِ — Gardez la prière : Asr approche.' },
  maghrib: { fr: 'Maghrib', kvKey: 'Maghrib', body: 'سُبْحَانَ اللَّهِ حِينَ تُمْسُونَ — Le soleil se couche, Maghrib est là.' },
  isha:    { fr: 'Icha',    kvKey: 'Isha',    body: 'وَمِنَ اللَّيْلِ فَسَبِّحْهُ — Avant de dormir, ne manquez pas Icha.' },
};

const _MURMURES_MATIN = [
  'Un instant pour ton âme avant de commencer',
  'Bismillah — chaque acte peut être une ibadah',
  'Ta journée commence avec la grâce d\'Allah',
];
const _MURMURES_SOIR = [
  'La nuit est un cadeau. Commence-la en paix.',
  'Ton wird du soir t\'attend. 5 minutes.',
  'Al-Hamdulillah pour cette journée, quoi qu\'il en soit.',
];
const _REGARD_PUSH_MURMURES = [
  'Un instant — où se posent tes yeux ?',
  'Baisse le regard. Ton cœur s\'allège.',
  'Le premier regard passe. Ne le suis pas du second.',
  'Ce que l\'œil ne suit pas, le cœur ne convoite pas.',
];

function _timeToMin(t) {
  if (!t || typeof t !== 'string') return -1;
  const [h, m] = t.split(':').map(Number);
  return (isNaN(h) || isNaN(m)) ? -1 : h * 60 + m;
}

function _nowMinInTZ(tz) {
  try {
    const parts = new Intl.DateTimeFormat('fr-FR', { timeZone: tz, hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
    const h = parseInt(parts.find(p => p.type === 'hour').value, 10);
    const m = parseInt(parts.find(p => p.type === 'minute').value, 10);
    return (isNaN(h) || isNaN(m)) ? -1 : h * 60 + m;
  } catch(e) { return -1; }
}

function _nowDateInTZ(tz) {
  try { return new Intl.DateTimeFormat('sv-SE', { timeZone: tz }).format(new Date()); } // YYYY-MM-DD
  catch(e) { return new Date().toISOString().slice(0, 10); }
}

async function _sendPrayerNotifications(env) {
  if (!env.RATE_LIMIT_KV) { console.error('[Cron] KV non lié'); return; }

  let cursor;
  let listComplete = false;
  let totalSent    = 0;

  do {
    const page = await env.RATE_LIMIT_KV.list({ prefix: 'push:sub:', limit: 100, ...(cursor ? { cursor } : {}) });
    cursor       = page.cursor;
    listComplete = page.list_complete;

    for (const { name: key } of page.keys) {
      try {
        const raw = await env.RATE_LIMIT_KV.get(key);
        if (!raw) continue;
        const { subscription, prayers, tz } = JSON.parse(raw);
        if (!subscription?.keys?.p256dh || !subscription?.keys?.auth) continue;

        const userTz = tz || 'UTC';
        const nowMin = _nowMinInTZ(userTz);
        const today  = _nowDateInTZ(userTz);
        if (nowMin < 0) continue;

        const uid = key.slice('push:sub:'.length);

        let subExpired = false;

        for (const [prayer, meta] of Object.entries(_PRAYERS_META)) {
          // kvKey is the capitalized form used by the client (e.g. 'Fajr', not 'fajr')
          const prayerMin = _timeToMin(prayers?.[meta.kvKey]);
          if (prayerMin < 0) continue;

          // Fenêtre ±3 min (cron toutes les 5 min, anti-doublon garantit 1 seul envoi)
          if (Math.abs(nowMin - prayerMin) > 3) continue;

          // Anti-doublon : 1 notification max par prière par jour
          const sentKey = `push:sent:${uid}:${prayer}:${today}`;
          if (await env.RATE_LIMIT_KV.get(sentKey)) continue;

          const result = await _sendWebPush(subscription, {
            title:   `Niyyah ✦ — ${meta.fr}`,
            body:    meta.body,
            tag:     `prayer-${prayer}-${today}`,
            url:     './#prieres',
            action:  'open',
          }, env);

          if (result === 'expired') {
            await env.RATE_LIMIT_KV.delete(key);
            subExpired = true;
            break;
          }
          if (result === true) {
            await env.RATE_LIMIT_KV.put(sentKey, '1', { expirationTtl: 86400 });
            totalSent++;
          }
        }

        if (subExpired) continue;

        // ── Murmure du matin : Fajr+15 min (fallback 7h00 = 420) ──────────
        {
          const fajrMin  = _timeToMin(prayers?.Fajr);
          const matinMin = fajrMin >= 0 ? fajrMin + 15 : 420;
          if (Math.abs(nowMin - matinMin) <= 3) {
            const sentKey = `push:sent:${uid}:murmure_matin:${today}`;
            if (!(await env.RATE_LIMIT_KV.get(sentKey))) {
              const text = _MURMURES_MATIN[Math.floor(Math.random() * _MURMURES_MATIN.length)];
              const result = await _sendWebPush(subscription, {
                title:  'Niyyah ✦ — Murmure du matin',
                body:   text,
                tag:    `murmure-matin-${today}`,
                url:    './',
                action: 'open',
              }, env);
              if (result === 'expired') { await env.RATE_LIMIT_KV.delete(key); continue; }
              if (result === true) {
                await env.RATE_LIMIT_KV.put(sentKey, '1', { expirationTtl: 86400 });
                totalSent++;
              }
            }
          }
        }

        // ── Murmure du soir : Maghrib+10 min (fallback 21h30 = 1290) ───────
        {
          const maghribMin = _timeToMin(prayers?.Maghrib);
          const soirMin    = maghribMin >= 0 ? maghribMin + 10 : 1290;
          if (Math.abs(nowMin - soirMin) <= 3) {
            const sentKey = `push:sent:${uid}:murmure_soir:${today}`;
            if (!(await env.RATE_LIMIT_KV.get(sentKey))) {
              const text = _MURMURES_SOIR[Math.floor(Math.random() * _MURMURES_SOIR.length)];
              const result = await _sendWebPush(subscription, {
                title:  'Niyyah ✦ — Murmure du soir',
                body:   text,
                tag:    `murmure-soir-${today}`,
                url:    './',
                action: 'open',
              }, env);
              if (result === 'expired') { await env.RATE_LIMIT_KV.delete(key); continue; }
              if (result === true) {
                await env.RATE_LIMIT_KV.put(sentKey, '1', { expirationTtl: 86400 });
                totalSent++;
              }
            }
          }
        }

        // ── Rappel Regard : fixe 21h00 = 1260 ──────────────────────────────
        {
          if (Math.abs(nowMin - 1260) <= 3) {
            const sentKey = `push:sent:${uid}:rappel_regard:${today}`;
            if (!(await env.RATE_LIMIT_KV.get(sentKey))) {
              const text = _REGARD_PUSH_MURMURES[Math.floor(Math.random() * _REGARD_PUSH_MURMURES.length)];
              const result = await _sendWebPush(subscription, {
                title:  'Niyyah ✦ — Regard',
                body:   text,
                tag:    `rappel-regard-${today}`,
                url:    './',
                action: 'open',
              }, env);
              if (result === 'expired') { await env.RATE_LIMIT_KV.delete(key); continue; }
              if (result === true) {
                await env.RATE_LIMIT_KV.put(sentKey, '1', { expirationTtl: 86400 });
                totalSent++;
              }
            }
          }
        }
      } catch(e) {
        console.error('[Cron] erreur sub:', e.message);
      }
    }
  } while (!listComplete);

  console.log(`[Cron] Notifications envoyées : ${totalSent}`);
}

// ═══════════════════════════════════════════════════
// WEB PUSH — stockage des subscriptions VAPID en KV
// clé : push:sub:{uid}  — TTL 90 jours (renouvelé à chaque ouverture)
// ═══════════════════════════════════════════════════
async function handlePushSubscribe(request, env) {
  try {
    const body = await request.json();
    const { uid, subscription, prayers, tz } = body;

    if (!uid || typeof uid !== 'string' || uid.length > 64) {
      return jsonResponse({ error: 'uid invalide' }, 400);
    }
    if (!subscription || typeof subscription.endpoint !== 'string' || !subscription.endpoint.startsWith('https://')) {
      return jsonResponse({ error: 'subscription invalide' }, 400);
    }

    if (env.RATE_LIMIT_KV) {
      await env.RATE_LIMIT_KV.put(
        `push:sub:${uid}`,
        JSON.stringify({
          subscription,
          prayers: prayers || {},
          tz:      tz      || '',
          updated: new Date().toISOString(),
        }),
        { expirationTtl: 60 * 60 * 24 * 90 } // 90 jours
      );
    }

    return jsonResponse({ ok: true });
  } catch (err) {
    console.error('handlePushSubscribe error:', err);
    return jsonResponse({ error: 'Erreur serveur' }, 500);
  }
}

async function handleActivate(request, env) {
  try {
    // Vérifier que les secrets sont configurés
    if (!env.BETA_CODES || !env.HMAC_SECRET) {
      console.error('handleActivate: secrets BETA_CODES / HMAC_SECRET manquants');
      return jsonResponseV2({ error: 'Service non configuré' }, 500);
    }

    const body = await request.json();
    const { uid, code } = body;

    if (!_isValidUID(uid)) return jsonResponseV2({ error: 'uid invalide' }, 400);
    if (!code || typeof code !== 'string' || code.length > 100) {
      return jsonResponseV2({ error: 'code requis' }, 400);
    }

    // Parser BETA_CODES (JSON array stocké en secret)
    let validCodes;
    try {
      validCodes = JSON.parse(env.BETA_CODES);
      if (!Array.isArray(validCodes)) throw new Error('not an array');
    } catch(e) {
      console.error('handleActivate: BETA_CODES malformé:', e.message);
      return jsonResponseV2({ error: 'Service mal configuré' }, 500);
    }

    // Comparaison temps constant contre chaque code valide
    const normalizedCode = code.trim().toUpperCase();
    let matched = false;
    for (const c of validCodes) {
      // On continue même après un match pour ne pas fuiter par timing
      if (timingSafeEqual(normalizedCode, String(c).trim().toUpperCase())) {
        matched = true;
      }
    }

    if (!matched) return jsonResponseV2({ error: 'Code invalide' }, 401);

    // Écrire le statut en KV
    const status = 'beta';
    const granted = new Date().toISOString();
    const expires = null;
    const kv = env.RATE_LIMIT_KV;
    if (kv) {
      await kv.put(`u:${uid}:status`, JSON.stringify({ status, granted, expires }));
    }

    // Générer le token HMAC
    const token = await generateHMACToken(uid, status, expires, env.HMAC_SECRET);

    return jsonResponseV2({ token, status, granted });
  } catch (err) {
    console.error('handleActivate error:', err);
    return jsonResponseV2({ error: 'Erreur activation' }, 500);
  }
}
