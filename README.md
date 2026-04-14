# نية · Niyyah
### Le Sanctuaire de l'Intention

> *"Les actes ne valent que par leurs intentions."* — Hadith (Bukhari 1)

Application web progressive (PWA) de pratique spirituelle islamique.
Transforme chaque acte du quotidien en acte sacré par l'intention (Niyyah).

---

## ✦ Fonctionnalités

| Module | Description |
|--------|-------------|
| **Orbe de Lumière** | Intention du jour avec infusion visuelle dynamique |
| **Pratique** | 4 niveaux : Fondations · Approfondissement · Connaissance · Rayonnement |
| **Wird** | Invocations du matin et du soir avec audio |
| **Mentor d'Adab** | IA (Claude) pour conseils spirituels personnalisés |
| **Niyyah Scanner** | Appareil photo → intention sacralisée en AR |
| **Les Murmures** | Notifications douces adaptées à l'intention du matin |
| **Mode Tawba** | Retour bienveillant après absence — zéro culpabilisation |
| **Bilan Coach** | Récapitulatif hebdomadaire fraternel |
| **Nasheeds** | Lecteur audio acapella intégré |
| **Qibla** | Boussole de direction de la prière |

---

## 🗂 Structure du dépôt

```
niyyah-app/
├── index.html          # Application complète (single-file PWA)
├── manifest.json       # Configuration PWA
├── sw.js               # Service Worker (cache offline)
├── server.js           # Backend API sécurisé (Mentor IA + Scanner)
├── package.json        # Dépendances backend
├── capacitor.config.json  # Config APK Android/iOS
├── .env.example        # Template variables d'environnement
├── .gitignore
├── icône-192.png       # Icône PWA / Play Store
├── icône-512.png       # Icône Play Store (haute résolution)
├── bannière.png        # Feature Graphic Play Store (1024×500)
├── fond.png            # Fond décoratif
├── logo2.png           # Logo secondaire
├── jannat-al-qalb.mp3  # Nasheed acapella 1
└── rahatal-qulub.mp3   # Nasheed acapella 2
```

---

## 🚀 Lancer en local

```bash
# Option 1 — Ouvrir directement dans Chrome
# Glisser index.html dans Chrome

# Option 2 — Avec serveur local (recommandé pour SW + Audio)
npx serve .
# → http://localhost:3000
```

---

## 🔑 Backend API (Mentor IA)

Le Mentor d'Adab utilise Claude (Anthropic). La clé API doit rester côté serveur.

```bash
# 1. Copier le template
cp .env.example .env

# 2. Remplir ta clé Anthropic
# ANTHROPIC_API_KEY=sk-ant-XXXXXXXX

# 3. Lancer le backend
npm install
node server.js
# → http://localhost:3000
```

### Déploiement sur Railway (gratuit)
1. Créer un compte sur [railway.app](https://railway.app)
2. New Project → Deploy from GitHub → sélectionner ce repo
3. Variables → ajouter `ANTHROPIC_API_KEY`
4. Copier l'URL générée dans `index.html` :
   ```javascript
   'https://TON-URL.railway.app'  // ligne ~25 de index.html
   ```

---

## 📱 Déploiement Play Store

```bash
# Prérequis : Node 18+, Java JDK 17, Android Studio

# 1. Installer Capacitor
npm install @capacitor/core @capacitor/android @capacitor/cli

# 2. Initialiser
npx cap add android
npx cap sync

# 3. Ouvrir dans Android Studio
npx cap open android

# 4. Build → Generate Signed Bundle/APK
```

---

## 🌐 GitHub Pages (démo en ligne)

L'app est accessible sur :
**https://nabs881-sketch.github.io/niyyah-app/**

Pour mettre à jour :
```bash
git add index.html
git commit -m "Update Niyyah"
git push
```
GitHub Pages se met à jour automatiquement en ~1 minute.

---

## 🔒 Vie Privée (Al-Haya)

- **Aucune donnée personnelle collectée**
- Tout est stocké en `localStorage` sur l'appareil
- Les images du Scanner sont traitées à la volée et immédiatement supprimées
- Le Mentor IA : seules les questions sont envoyées au backend, jamais stockées

---

## 🏗 Stack Technique

- **Frontend** : HTML / CSS / JS vanilla (zero framework)
- **Backend** : Node.js + Express
- **IA** : Claude claude-sonnet-4-20250514 (Anthropic)
- **PWA** : Service Worker + Web Manifest
- **Mobile** : Capacitor.js → APK Android

---

*بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ*
