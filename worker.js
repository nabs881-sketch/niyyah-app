// ═══════════════════════════════════════════════════
// NIYYAH API — Cloudflare Worker
// Routes : /api/scanner, /api/murmure
// ═══════════════════════════════════════════════════

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS_HEADERS },
  });
}

export default {
  async fetch(request, env) {
    // ── CORS preflight ──
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // ── Santé ──
    if (path === '/' && request.method === 'GET') {
      return jsonResponse({ status: 'ok', service: 'Niyyah API', version: '2.0.0' });
    }

    // ── Route Scanner de Niyyah ──
    if (path === '/api/scanner' && request.method === 'POST') {
      return handleScanner(request, env);
    }

    // ── Route Murmures (notifications + compagnon nocturne) ──
    if (path === '/api/murmure' && request.method === 'POST') {
      return handleMurmure(request, env);
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

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
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

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic ${response.status}: ${err}`);
    }

    const data = await response.json();
    const intention = data.content?.[0]?.text?.trim();
    if (!intention) throw new Error('Réponse vide');

    return jsonResponse({ intention });

  } catch (err) {
    return jsonResponse(
      { error: 'Scanner indisponible', details: err.message },
      500
    );
  }
}

// ═══════════════════════════════════════════════════
// FILTRE DE SÉCURITÉ — Compagnon Nocturne
// ═══════════════════════════════════════════════════
const FATWA_KEYWORDS = [
  'halal', 'haram', 'fatwa', 'il est permis', 'il est interdit',
  'selon le madhhab', 'la fatwa est', 'it is permissible', 'it is forbidden',
];
const FATWA_PATTERNS = [
  /sourate\s+\S+\s+verset/i,
  /verset\s+\d+\s*[.:]\s*\d+/i,
  /\d+\s*[.:]\s*\d+(?=\s*[»"\)])/,
  /le prophète a dit\s*[«"]/i,
  /the prophet said\s*[«"]/i,
  /قال النبي/,
];

function nightResponseContainsFatwa(text) {
  const lower = text.toLowerCase();
  for (const kw of FATWA_KEYWORDS) {
    if (lower.includes(kw)) return true;
  }
  for (const re of FATWA_PATTERNS) {
    if (re.test(text)) return true;
  }
  return false;
}

// ═══════════════════════════════════════════════════
// MURMURES (notifications intelligentes)
// ═══════════════════════════════════════════════════
async function handleMurmure(request, env) {
  try {
    const data = await request.json();

    // ── Mode Compagnon Nocturne (appel Claude) ──
    if (data.mode === 'night' && data.thought) {
      const systemPrompt = `Tu es le Compagnon du soir de Niyyah. L'utilisateur te confie une pensée de fin de journée. Réponds par un haïku ou une très courte méditation spirituelle (3-5 lignes max), chaleureuse, en écho à sa pensée. Pas de dogme, pas de jugement.

INTERDICTIONS STRICTES :
- Tu n'émets JAMAIS d'avis religieux (fatwa). Si l'utilisateur demande un avis de fiqh, aqida, halal/haram, tafsir de verset ou interprétation de hadith, tu réponds : "Pour cette question, consulte un savant qualifié. Je ne peux pas te répondre."
- Tu n'inventes JAMAIS de verset coranique ni de hadith. Si tu n'es pas certain, tu ne cites pas.
- Tu ne commentes pas les 4 madhahib. Tu ne prends pas position entre écoles juridiques.
- Ton rôle : écouter, reformuler, apaiser, orienter vers le rappel d'Allah. Pas enseigner.`;

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 300,
          system: systemPrompt,
          messages: [{ role: 'user', content: data.thought }],
        }),
      });

      if (!response.ok) {
        return jsonResponse({ text: 'La nuit est un voile de miséricorde — repose-toi sous Sa protection.', source: 'Sagesse nocturne' });
      }

      const result = await response.json();
      let text = result.content?.[0]?.text || 'La nuit est un voile de miséricorde — repose-toi sous Sa protection.';

      // ── Filtre de sécurité côté serveur ──
      if (nightResponseContainsFatwa(text)) {
        console.warn('[NIYYAH SAFETY] Night companion response filtered — fatwa-like content detected');
        text = 'Pour cette question, je t\'invite à consulter un savant qualifié. Je peux t\'écouter, mais je ne peux pas te répondre sur ce point.';
      }

      return jsonResponse({ text, source: 'Compagnon du soir' });
    }

    // ── Mode Murmures classiques (notifications) ──
    const { intention, moment, streak, todayScore } = data;

    const MURMURES = {
      allah:         { matin: "Ton cœur se souvient de Lui", midi: "Entre deux tâches — un instant vers Allah", soir: "La nuit est douce pour ceux qui reviennent" },
      engage:        { matin: "Ta parole d'aujourd'hui — tiens-la", midi: "Mi-journée. Tes engagements respirent.", soir: "Ce que tu as tenu aujourd'hui compte" },
      reconstruire:  { matin: "Une brique posée vaut mieux qu'un mur rêvé", midi: "Tu avances. Même lentement.", soir: "Se reconstruire prend du temps. Tu es en chemin." },
      gratitude:     { matin: "Nomme une chose belle de ce matin", midi: "Quelque chose t'a souri aujourd'hui ?", soir: "Avant de dormir — merci pour quoi ?" },
      default:       { matin: "Un instant pour ton âme avant de commencer", midi: "Un souffle de paix au cœur de la journée", soir: "La nuit est un cadeau. Commence-la en paix." },
    };

    let theme = 'default';
    const i = (intention || '').toLowerCase();
    if (i.includes('allah') || i.includes('rapprocher'))       theme = 'allah';
    else if (i.includes('engagement') || i.includes('tenir'))  theme = 'engage';
    else if (i.includes('reconstruire'))                       theme = 'reconstruire';
    else if (i.includes('reconnaiss') || i.includes('gratit')) theme = 'gratitude';

    let body = MURMURES[theme][moment || 'matin'];
    if (moment === 'midi' && todayScore >= 60) {
      body = "MashaAllah — tu tiens ton chemin aujourd'hui";
    }
    if (streak >= 7 && moment === 'matin') {
      body = `${streak} jours de constance. L'Istiqamah est ta marque.`;
    }

    return jsonResponse({
      body,
      icon: theme === 'allah' ? '🌟' : theme === 'gratitude' ? '🙏' : '🌿',
    });

  } catch (err) {
    return jsonResponse({ error: 'Erreur murmure', details: err.message }, 500);
  }
}
