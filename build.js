// Build cross-plateforme (Windows/Mac/Linux) — remplace bash build.sh
const fs = require('fs');
const { execSync } = require('child_process');

const isWin = process.platform === 'win32';
const terserBin  = isWin ? 'node_modules\\.bin\\terser.cmd'   : 'node_modules/.bin/terser';
const cleancssBI = isWin ? 'node_modules\\.bin\\cleancss.cmd' : 'node_modules/.bin/cleancss';

try {
  console.log('> Minification script.js -> script.min.js');
  execSync(`"${terserBin}" script.js -o script.min.js --compress passes=1 --mangle`, { stdio: 'inherit' });

  console.log('> Minification style.css -> style.min.css');
  execSync(`"${cleancssBI}" -o style.min.css style.css`, { stdio: 'inherit' });

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
