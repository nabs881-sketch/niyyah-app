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
  '/api/scanner': 10,
  '/api/niyyah': 10,
  '/api/regarde': 20,
};

async function checkRateLimit(env, ip, path) {
  try {
    if (!env.RATE_LIMIT_KV) return true; // fail open if KV not bound
    const limit = RATE_LIMITS[path];
    if (!limit) return true;
    const key = `rl:${ip}:${path}`;
    const raw = await env.RATE_LIMIT_KV.get(key);
    const count = raw ? parseInt(raw, 10) : 0;
    if (count >= limit) return false;
    await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: 3600 });
    return true;
  } catch (e) {
    return true; // fail open if KV errors
  }
}

function checkOrigin(request) {
  const origin = request.headers.get('Origin') || '';
  return origin.startsWith(ALLOWED_ORIGIN);
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
      return jsonResponse({ status: 'ok', service: 'Niyyah API', version: '2.1.0' });
    }

    // ── Origin check for API routes ──
    if (!checkOrigin(request)) {
      return jsonResponse({ error: 'Forbidden' }, 403);
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

    return jsonResponse({ error: 'Route introuvable' }, 404);
  },
};

// ═══════════════════════════════════════════════════
// SCANNER DE NIYYAH
// ═══════════════════════════════════════════════════
async function handleScanner(request, env) {
  try {
    const { image } = await request.json();

    if (!image) {
      return jsonResponse({ error: 'image (base64) requise' }, 400);
    }

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
      'Access-Control-Allow-Origin': '*',
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

const REGARDE_CLASSIFIER_PROMPT = `Tu es un classificateur d'images pour une application spirituelle musulmane. Classe l'image dans UNE des 7 catégories : SOI, AUTRE, OBJET, MONDE, ENFANT, SACRE, INDETERMINE.
Un écran numérique affichant un verset = OBJET, PAS SACRE.
Si confidence < 0.80 → INDETERMINE.
FORMAT (JSON strict) : {"category": "...", "confidence": 0.92}`;

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
    const { image, hour, isFriday, isRamadan } = body;
    if (!image) return jsonResponseV2({ error: 'image manquante' }, 400);
    const temporalCtx = buildTemporalContext({
      hour: typeof hour === 'number' ? hour : new Date().getHours(),
      isFriday: !!isFriday, isRamadan: !!isRamadan
    });
    const prompt = buildNiyyahPrompt(temporalCtx);
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await callAnthropic(env, {
        model: MODEL_SONNET, max_tokens: 150, temperature: 0.7,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: prompt }
        ]}]
      });
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
    return jsonResponseV2({ suggestions: null, category: 'INDETERMINE', source: 'fallback', reason: 'validation_failed_or_religious' });
  } catch (err) {
    console.error('handleNiyyah error:', err);
    if (err.name === 'AbortError') return jsonResponseV2({ error: 'Timeout' }, 504);
    return jsonResponseV2({ intention: null, category: 'INDETERMINE', source: 'fallback', reason: 'error' }, 502);
  }
}

async function handleRegarde(request, env) {
  try {
    const body = await request.json();
    const { image } = body;
    if (!image) return jsonResponseV2({ error: 'image manquante' }, 400);
    // PASS 1 : Classification Haiku
    let category = 'INDETERMINE';
    let confidence = 0;
    try {
      const classifResp = await callAnthropic(env, {
        model: MODEL_HAIKU, max_tokens: 50, temperature: 0.1,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: REGARDE_CLASSIFIER_PROMPT }
        ]}]
      });
      const classifText = classifResp.content?.[0]?.text || '';
      const classifJson = extractJSON(classifText);
      if (classifJson && classifJson.category) {
        const validCats = ['SOI', 'AUTRE', 'OBJET', 'MONDE', 'ENFANT', 'SACRE', 'INDETERMINE'];
        if (validCats.includes(classifJson.category)) {
          category = classifJson.category;
          confidence = typeof classifJson.confidence === 'number' ? classifJson.confidence : 0.8;
          if (confidence < 0.80) category = 'INDETERMINE';
        }
      }
    } catch (e) { category = 'INDETERMINE'; confidence = 0; }
    // PASS 2 : Génération Sonnet
    const genPrompt = buildRegardeGeneratorPrompt(category);
    for (let attempt = 0; attempt < 2; attempt++) {
      const genResp = await callAnthropic(env, {
        model: MODEL_SONNET, max_tokens: 150, temperature: 0.7,
        messages: [{ role: 'user', content: [
          { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: image } },
          { type: 'text', text: genPrompt }
        ]}]
      });
      const rawText = genResp.content?.[0]?.text || '';
      const parsed = extractJSON(rawText);
      if (!parsed || !parsed.question) continue;
      const validation = validateRegardeQuestion(parsed.question);
      if (validation.valid) {
        return jsonResponseV2({ question: parsed.question.trim(), category, confidence, source: 'ia' });
      }
      if (['fatwa', 'hadith', 'quran'].includes(validation.reason)) break;
    }
    return jsonResponseV2({ question: null, category, confidence, source: 'fallback', reason: 'validation_failed_or_religious' });
  } catch (err) {
    console.error('handleRegarde error:', err);
    if (err.name === 'AbortError') return jsonResponseV2({ error: 'Timeout' }, 504);
    return jsonResponseV2({ question: null, category: 'INDETERMINE', confidence: 0, source: 'fallback', reason: 'error' }, 502);
  }
}
