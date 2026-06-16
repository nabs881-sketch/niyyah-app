# SPEC-BUILD-WINDOWS — Build qui marche sous Windows (fini le bash)

But : remplacer `bash build.sh` (qui plante sous Windows) par un build Node
cross-plateforme. Réutilise `npx terser` et `npx clean-css-cli` (qui fonctionnent
déjà chez toi) mais sans la couche bash, et bumpe la version du SW en JS.

## 1. Créer le fichier `build.js` à la racine
```js
// Build cross-plateforme (Windows/Mac/Linux) — remplace bash build.sh
const fs = require('fs');
const { execSync } = require('child_process');

try {
  console.log('> Minification script.js -> script.min.js');
  execSync('npx terser script.js -o script.min.js --compress --mangle', { stdio: 'inherit' });

  console.log('> Minification style.css -> style.min.css');
  execSync('npx clean-css-cli -o style.min.css style.css', { stdio: 'inherit' });

  // Bump de la version du service worker (niyyah-vN -> niyyah-v(N+1))
  let sw = fs.readFileSync('sw.js', 'utf8');
  const m = sw.match(/niyyah-v(\d+)/);
  if (m) {
    const next = parseInt(m[1], 10) + 1;
    sw = sw.replace(/niyyah-v\d+/g, 'niyyah-v' + next);
    fs.writeFileSync('sw.js', sw);
    console.log('> Version SW -> niyyah-v' + next);
  } else {
    console.log('! Version SW introuvable');
  }

  console.log('OK Build termine. Ensuite: git add -A puis commit puis push');
} catch (e) {
  console.error('ERREUR build:', e.message || e);
  process.exit(1);
}
```

## 2. Modifier `package.json`
Dans la section "scripts", REMPLACER :
```json
"build": "bash build.sh"
```
PAR :
```json
"build": "node build.js"
```

## 3. Garder `build.sh`
Ne pas supprimer `build.sh` (sert encore sous Mac/Linux). On ne change que la
commande npm.

## Notes
- Après ça, `npm run build` fonctionne sous Windows : il compresse les 2 fichiers
  ET monte la version du SW tout seul. Plus de terser/version à la main.
- La regex `niyyah-v\d+` ne touche PAS `niyyah-fonts-v1` (vérifié).
- Cette SPEC ne nécessite PAS de `npm run build` (c'est de l'outillage, pas du
  code de l'app). Juste : créer build.js + éditer package.json + commit.
