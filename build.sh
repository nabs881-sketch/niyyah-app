#!/bin/bash
set -e
echo "▸ Vérification intégrité du contenu..."
node scripts/validate.mjs
echo "▸ Minifying script.js → script.min.js"
npx terser script.js -o script.min.js --compress --mangle

echo "▸ Minifying style.css → style.min.css"
npx clean-css-cli -o style.min.css style.css

# Auto-bump SW version
OLD_VER=$(grep -o 'niyyah-v[0-9]*' sw.js | head -1)
OLD_NUM=$(echo "$OLD_VER" | sed 's/niyyah-v//')
NEW_NUM=$((OLD_NUM + 1))
NEW_VER="niyyah-v${NEW_NUM}"
sed -i "s/${OLD_VER}/${NEW_VER}/" sw.js
echo "▸ SW version: ${OLD_VER} → ${NEW_VER}"

echo "▸ Verifying minified files..."
JS_SIZE=$(wc -c < script.min.js)
CSS_SIZE=$(wc -c < style.min.css)
echo "  script.min.js: ${JS_SIZE} bytes"
echo "  style.min.css: ${CSS_SIZE} bytes"

echo "✓ Build complete. Ready to: git add -A && git commit && git push"
