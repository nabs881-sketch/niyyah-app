// Build cross-plateforme (Windows/Mac/Linux) — remplace bash build.sh
const fs = require('fs');
const { execSync } = require('child_process');

const isWin = process.platform === 'win32';
const terserBin  = isWin ? 'node_modules\\.bin\\terser.cmd'   : 'node_modules/.bin/terser';
const cleancssBI = isWin ? 'node_modules\\.bin\\cleancss.cmd' : 'node_modules/.bin/cleancss';

try {
  console.log('> Minification script.js -> script.min.js');
  // Minification JS — terser avec compression minimale
  // (fallback léger si OOM : suppression commentaires + espaces superflus)
  try {
    execSync(`"${terserBin}" script.js -o script.min.js --compress passes=1 --mangle`, { stdio: 'inherit' });
  } catch (e) {
    console.log('  ! terser OOM, fallback strip-comments');
    let src = fs.readFileSync('script.js', 'utf8');
    // Supprime commentaires /* */ et // (hors strings)
    src = src.replace(/\/\*[\s\S]*?\*\//g, '');
    src = src.replace(/^\s*\/\/.*$/gm, '');
    // Compresse lignes vides multiples
    src = src.replace(/\n{3,}/g, '\n\n').trim();
    fs.writeFileSync('script.min.js', src, 'utf8');
  }

  console.log('> Minification style.css -> style.min.css');
  try {
    execSync(`"${cleancssBI}" -o style.min.css style.css`, { stdio: 'inherit' });
  } catch (e) {
    console.log('  ! cleancss OOM, copie directe style.css -> style.min.css');
    fs.copyFileSync('style.css', 'style.min.css');
  }

  // Bump de la version du service worker (niyyah-vN -> niyyah-v(N+1))
  let sw = fs.readFileSync('sw.js', 'utf8');
  const m = sw.match(/niyyah-v(\d+)/);
  if (m) {
    const next = parseInt(m[1], 10) + 1;
    sw = sw.replace(/niyyah-v\d+/g, 'niyyah-v' + next);
    fs.writeFileSync('sw.js', sw);
    console.log('> Version SW -> niyyah-v' + next);

    // Cache-busting automatique dans index.html
    let html = fs.readFileSync('index.html', 'utf8');
    const htmlUpdated = html.replace(/script\.min\.js\?(?:v|cb)=\d+/, 'script.min.js?v=' + next);
    if (htmlUpdated !== html) {
      fs.writeFileSync('index.html', htmlUpdated, 'utf8');
      console.log('> index.html cache-bust -> script.min.js?v=' + next);
    }
  } else {
    console.log('! Version SW introuvable');
  }

  console.log('OK Build termine. Ensuite: git add -A puis commit puis push');
} catch (e) {
  console.error('ERREUR build:', e.message || e);
  process.exit(1);
}
