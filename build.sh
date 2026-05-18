#!/bin/bash
echo "Building Niyyah..."
npx terser script.js -c -m -o script.min.js
node -e "
const fs = require('fs');
let css = fs.readFileSync('style.css', 'utf8');
css = css.replace(/\/\*[\s\S]*?\*\//g, '');
css = css.replace(/\s*\n\s*/g, '');
css = css.replace(/\s*{\s*/g, '{');
css = css.replace(/\s*}\s*/g, '}');
css = css.replace(/\s*:\s*/g, ':');
css = css.replace(/\s*;\s*/g, ';');
css = css.replace(/;}/g, '}');
fs.writeFileSync('style.min.css', css);
"
echo "Build done — script.min.js + style.min.css"
