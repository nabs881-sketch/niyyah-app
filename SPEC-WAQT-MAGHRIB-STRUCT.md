# SPEC-WAQT-MAGHRIB-STRUCT

## But
Les **34 phrases `plage_origine:apresmidi`** en tête de `waqt_maghrib.json` parlent de « cet après-midi » /
« la plage de l'Asr ». Comme le service ne filtre pas par heure (`(dayOfYear+hash) % length`), elles
s'affichent au **Maghrib** certains jours → décalage temporel.

**Solution** : les **déplacer vers `waqt_asr.json`** (servi à l'ʿAsr = l'après-midi → heure JUSTE).
Elles sont déjà auditées (propres) et de schéma identique. Pur déplacement de données.

- `waqt_maghrib.json` : 365 → **331** (retire les 34 `apresmidi`, garde 235 `soir` + 96 tafakkur)
- `waqt_asr.json` : 365 → **399** (ajoute les 34 à la fin)

⚠️ Les DEUX fichiers sont cachés par le SW → `npm run build` avant commit.

---

## Exécution (script Node à lancer depuis la racine du repo)

```bash
node -e "
const fs=require('fs');
const mPath='data/waqt/waqt_maghrib.json';
const aPath='data/waqt/waqt_asr.json';
const m=JSON.parse(fs.readFileSync(mPath,'utf8'));
const a=JSON.parse(fs.readFileSync(aPath,'utf8'));
const mArr=Array.isArray(m)?m:m.phrases;
const aArr=Array.isArray(a)?a:a.phrases;
const move=mArr.filter(p=>p.plage_origine==='apresmidi');
const keep=mArr.filter(p=>p.plage_origine!=='apresmidi');
if(move.length!==34){ console.error('ATTENTION: '+move.length+' phrases apresmidi trouvees, attendu 34. STOP.'); process.exit(1); }
const newM=Array.isArray(m)?keep:Object.assign({},m,{phrases:keep});
const newA=Array.isArray(a)?aArr.concat(move):Object.assign({},a,{phrases:aArr.concat(move)});
fs.writeFileSync(mPath, JSON.stringify(newM,null,2));
fs.writeFileSync(aPath, JSON.stringify(newA,null,2));
console.log('OK -> maghrib:'+keep.length+' | asr:'+(aArr.length+move.length));
"
```

Attendu en sortie : `OK -> maghrib:331 | asr:399`.

> Le script s'arrête de lui-même si le nombre n'est pas 34 (sécurité). Vérifie bien ce message.

---

## Build + commit
```
npm run build
git add -A && git commit -m "waqt: deplace 34 phrases apres-midi de maghrib vers asr (heure correcte)"
git push
```

## Vérif post-application (optionnel)
```bash
node -e "const m=require('./data/waqt/waqt_maghrib.json');const a=require('./data/waqt/waqt_asr.json');const M=Array.isArray(m)?m:m.phrases;const A=Array.isArray(a)?a:a.phrases;console.log('maghrib',M.length,'| apresmidi restants',M.filter(p=>p.plage_origine==='apresmidi').length,'| asr',A.length);"
```
Attendu : `maghrib 331 | apresmidi restants 0 | asr 399`.
