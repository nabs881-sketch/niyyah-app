# Spec — Route `/api/bilan-premium` (Worker `worker.js`)

## Objectif
Créer la route **`/api/bilan-premium`** dans `worker.js`. Elle génère, pour un utilisateur premium, un **récit personnalisé de sa semaine spirituelle** (la "lettre de Niyyah"), à partir des données envoyées par l'app.

⚠️ Cette route **n'existe pas encore** : le client l'appelle déjà (dans `showWeeklyBilan`), mais le Worker renvoie un 404. Le payload enrichi est déjà envoyé par l'app. Il faut donc **créer le handler**.

## Style
À implémenter **dans le même style que les routes existantes** (`/api/niyyah`, etc.) :
- utiliser la fonction utilitaire `callAnthropic(env, params)`,
- renvoyer via `jsonResponseV2(...)`,
- `try/catch` avec fallback silencieux,
- respecter le timeout 25s déjà géré par `callAnthropic`.

## Lecture du body
La requête POST contient :
```
prenom, profil, dominante, zone_manquante,
stats, stats_passee,
bontes_semaine,        // { "YYYY-MM-DD": ["texte", ...] | null }
etats_semaine,         // { "YYYY-MM-DD": "distraction|effort|sincerite" | null }
intentions_semaine,    // { "YYYY-MM-DD": {type,label} | null }
defi_semaine           // { nom, jours:[...], complete }
```

## Construction du message "user"
Construire un message `user` **lisible** qui récapitule ces données pour l'IA (jour par jour : état du soir, bontés notées, intention ; plus le défi, la régularité et la comparaison avec la semaine passée). Format libre, du moment que c'est clair et fidèle aux données.

## Appel Anthropic
```
callAnthropic(env, {
  model: MODEL_SONNET,
  max_tokens: 700,
  temperature: 0.85,
  system: SYSTEM_PROMPT,           // ci-dessous, VERBATIM
  messages: [{ role: 'user', content: <message user construit> }]
})
```

## System prompt (À UTILISER VERBATIM)
```
Tu es la voix de Niyyah. Tu écris à {prenom} une courte lettre : le récit de sa semaine spirituelle écoulée.

Ton ton : un témoin bienveillant et lucide, jamais sermonneur. Chaleureux, sobre, contemplatif. Tu tutoies. Le français d'un cœur, pas d'un prêcheur.

Tu disposes de la matière réelle de sa semaine : ses états du soir, les bontés qu'il a notées de ses mots, son défi, sa régularité, ses intentions. Tisse-la en un récit qui lui ressemble : nomme ce qu'il a traversé, montre-lui l'arc de son cœur sur la semaine, relève le bien qu'il a semé (en t'appuyant sur ses propres bontés), accueille ce qui a manqué sans jamais le juger. La continuité est une miséricorde, pas un score — chaque retour compte.

RÈGLES STRICTES :
- Écris UNIQUEMENT en français. Aucun mot arabe, aucune translittération.
- Ne cite AUCUN hadith, AUCUN verset, aucune référence (sourate, numéro). Ne fabrique jamais de citation. Tu peux évoquer des réalités spirituelles, jamais les attribuer à un texte.
- Aucune fatwa, aucun jugement religieux.
- Sobre : pas de clichés, pas d'emphase, pas d'emojis.
- 3 à 4 courts paragraphes, séparés par une ligne vide.
- Si la semaine fut presque vide, reste doux et accueillant : invite, ne reproche pas.
- Termine sur une ouverture douce vers la semaine qui vient.
```
Remplacer `{prenom}` par le prénom reçu (ou un terme neutre si absent).

## Réponse
Extraire le texte de la réponse Anthropic (`response.content?.[0]?.text`) et renvoyer :
```
jsonResponseV2({ message: <texte IA>, source: 'ia' })
```
Le client lit `data.message`.

## Enregistrement
Ajouter la route `/api/bilan-premium` au **routeur** du Worker (à côté de `/api/niyyah`, `/api/scanner`, etc.).

## Erreurs / fallback
En cas d'erreur ou timeout : renvoyer une réponse d'erreur propre (le client a déjà un `.catch` silencieux qui garde le conseil statique). Ne pas faire planter le Worker.

## Important
- Ne touche qu'à `worker.js`.
- Ne modifie pas les routes existantes.
