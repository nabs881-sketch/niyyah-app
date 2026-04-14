# 🚀 Niyyah — Guide Déploiement Play Store

## ÉTAPE 1 — Déployer le backend sur Railway (gratuit)

### 1.1 Créer un compte Railway
→ https://railway.app (connexion avec GitHub)

### 1.2 Déployer le backend
```bash
# Dans le dossier niyyah-backend/
git init
git add .
git commit -m "Niyyah API v1.0"

# Sur Railway.app → New Project → Deploy from GitHub
# Ou via CLI :
npm install -g @railway/cli
railway login
railway init
railway up
```

### 1.3 Configurer la clé API
Sur Railway → ton projet → Variables :
```
ANTHROPIC_API_KEY = sk-ant-XXXXXXXX  ← ta vraie clé
PORT = 3000
```

### 1.4 Récupérer ton URL
Railway te donne une URL du type :
`https://niyyah-api-production.up.railway.app`

### 1.5 Mettre à jour niyyah.html
Dans le fichier, remplacer :
```javascript
'https://niyyah-api.railway.app'
```
par ton URL Railway réelle.

---

## ÉTAPE 2 — Préparer l'environnement Android

### 2.1 Installer les prérequis
```bash
# Node.js 18+ requis
node --version  # doit afficher v18+

# Java JDK 17 (requis par Android)
# → https://adoptium.net/

# Android Studio
# → https://developer.android.com/studio
```

### 2.2 Configurer Android Studio
1. Ouvrir Android Studio
2. SDK Manager → installer Android SDK 34
3. Créer un émulateur : AVD Manager → Pixel 7 → API 34

---

## ÉTAPE 3 — Builder l'APK avec Capacitor

### 3.1 Initialiser le projet
```bash
cd niyyah-capacitor/
npm install

# Créer le dossier www/ et y copier niyyah.html
mkdir www
cp ../niyyah.html www/index.html
```

### 3.2 Initialiser Capacitor Android
```bash
npx cap add android
npx cap sync
```

### 3.3 Ouvrir dans Android Studio
```bash
npx cap open android
```

### 3.4 Dans Android Studio
1. Attendre la synchronisation Gradle
2. Build → Generate Signed APK/AAB
3. Créer une keystore (GARDER LE FICHIER EN SÉCURITÉ !)
4. Build Release AAB

---

## ÉTAPE 4 — Publier sur le Play Store

### 4.1 Créer un compte développeur
→ https://play.google.com/console
→ Frais uniques : 25 USD

### 4.2 Créer l'application
- Nom : Niyyah — Le Sanctuaire de l'Intention
- Langue : Français
- Type : Application
- Catégorie : Lifestyle / Éducation

### 4.3 Préparer les assets
| Asset            | Dimensions   |
|------------------|--------------|
| Icône            | 512×512 PNG  |
| Feature graphic  | 1024×500 PNG |
| Screenshots      | min 2, ratio 16:9 |
| Bannière tablet  | optionnel    |

### 4.4 Politique de confidentialité (OBLIGATOIRE)
Héberger une page avec ce texte minimal :
```
Niyyah ne collecte aucune donnée personnelle.
Toutes les données (intentions, progression) sont stockées
localement sur l'appareil de l'utilisateur uniquement.
Aucune donnée n'est envoyée à des serveurs tiers.
Contact : [ton email]
```

### 4.5 Soumettre
1. Charger ton AAB
2. Remplir la fiche Play Store
3. Vérification Google : 3-7 jours

---

## RÉSUMÉ DES COMMANDES RAPIDES

```bash
# 1. Backend local (test)
cd niyyah-backend && npm install && node server.js

# 2. Tester l'app avec le backend local
# Ouvrir niyyah.html dans Chrome

# 3. Sync Capacitor après modification de niyyah.html
cd niyyah-capacitor && cp ../niyyah.html www/index.html && npx cap sync

# 4. Lancer sur émulateur Android
npx cap run android

# 5. Build release
# → Android Studio → Build → Generate Signed Bundle
```

---

## CHECKLIST AVANT PLAY STORE ✓

- [ ] Backend Railway déployé et fonctionnel
- [ ] Clé API Anthropic configurée sur Railway
- [ ] URL backend mise à jour dans niyyah.html
- [ ] `npx cap sync` lancé après toute modification
- [ ] APK testé sur un vrai téléphone Android
- [ ] Politique de confidentialité hébergée
- [ ] Icône 512×512 créée
- [ ] 2+ screenshots préparés
- [ ] Compte Play Store créé (25$)
