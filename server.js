const express = require('express');
const cors    = require('cors');
const app     = express();

app.use(express.json());

// CORS — autoriser ton domaine + localhost pour le dev
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'capacitor://localhost',      // Capacitor Android/iOS
  'https://niyyah.app',         // ton domaine futur
  'null',                       // fichier local HTML
];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // En dev : tout autoriser — restreindre en prod
    }
  }
}));

// ── Santé du serveur ──────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'Niyyah API', version: '1.0.0' });
});

// ── Route Mentor d'Adab ───────────────────────────────────────
app.post('/api/mentor', async (req, res) => {
  const { messages, systemPrompt } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages requis' });
  }

  // Utiliser le prompt envoyé par le client (complet avec contexte dynamique)
  // Fallback minimal si le client n'envoie pas de prompt
  const fullSystem = systemPrompt || 'Tu es le Mentor d\'Adab de Niyyah — un guide spirituel bienveillant.';

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 900,
        system: fullSystem,
        messages: messages.slice(-10), // max 10 tours
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Anthropic ${response.status}: ${err}`);
    }

    const data = await response.json();
    const reply = data.content?.[0]?.text;
    if (!reply) throw new Error('Réponse vide');

    res.json({ reply });

  } catch (err) {
    console.error('Mentor API error:', err.message);
    res.status(500).json({ error: 'Service temporairement indisponible', details: err.message });
  }
});

// ── Route Murmures (notifications intelligentes) ──────────────
app.post('/api/murmure', (req, res) => {
  const { intention, moment, streak, todayScore } = req.body;

  const MURMURES = {
    allah:     { matin: "Ton cœur se souvient de Lui", midi: "Entre deux tâches — un instant vers Allah", soir: "La nuit est douce pour ceux qui reviennent" },
    engage:    { matin: "Ta parole d'aujourd'hui — tiens-la", midi: "Mi-journée. Tes engagements respirent.", soir: "Ce que tu as tenu aujourd'hui compte" },
    reconstruire: { matin: "Une brique posée vaut mieux qu'un mur rêvé", midi: "Tu avances. Même lentement.", soir: "Se reconstruire prend du temps. Tu es en chemin." },
    gratitude: { matin: "Nomme une chose belle de ce matin", midi: "Quelque chose t'a souri aujourd'hui ?", soir: "Avant de dormir — merci pour quoi ?" },
    default:   { matin: "Un instant pour ton âme avant de commencer", midi: "Un souffle de paix au cœur de la journée", soir: "La nuit est un cadeau. Commence-la en paix." },
  };

  let theme = 'default';
  const i = (intention || '').toLowerCase();
  if (i.includes('allah') || i.includes('rapprocher'))       theme = 'allah';
  else if (i.includes('engagement') || i.includes('tenir'))  theme = 'engage';
  else if (i.includes('reconstruire'))                       theme = 'reconstruire';
  else if (i.includes('reconnaiss') || i.includes('gratit')) theme = 'gratitude';

  // Adaptation contextuelle
  let body = MURMURES[theme][moment || 'matin'];
  if (moment === 'midi' && todayScore >= 60) {
    body = "MashaAllah — tu tiens ton chemin aujourd'hui";
  }
  if (streak >= 7 && moment === 'matin') {
    body = `${streak} jours de constance. L'Istiqamah est ta marque.`;
  }

  res.json({ body, icon: theme === 'allah' ? '🌟' : theme === 'gratitude' ? '🙏' : '🌿' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✦ Niyyah API démarrée sur le port ${PORT}`);
});
