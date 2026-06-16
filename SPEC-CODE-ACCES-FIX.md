# SPEC-CODE-ACCES-FIX (code d'accès — accepter malgré les espaces)

## Problème
`unlockPremium` compare `code.toUpperCase() === 'BISMILLAH'` sans `.trim()`. Sur mobile, le clavier
ajoute souvent un espace → « BISMILLAH » devient « BISMILLAH » avec espace → « Code invalide ».
(Rappel : le seul code valide est **BISMILLAH**.)

## Cible
`script.js` (fonction `unlockPremium`) + `index.html` (le champ). ⚠️ cachés par le SW →
**`npm run build` AVANT le commit.**

## Étape 1 — JS : trim (fichier `script.js`)
CHERCHER :
```
  if (code && code.toUpperCase() === 'BISMILLAH') {
```
REMPLACER PAR :
```
  if (code && code.trim().toUpperCase() === 'BISMILLAH') {
```

## Étape 2 — HTML : durcir le champ (fichier `index.html`)
CHERCHER :
```
<input id="freemium-code-input" type="text" placeholder="Code d'accès">
```
REMPLACER PAR :
```
<input id="freemium-code-input" type="text" placeholder="Code d'accès" autocapitalize="characters" autocorrect="off" autocomplete="off" spellcheck="false">
```

## Build + commit
```
npm run build
git add script.js script.min.js index.html sw.js && git commit -m "code acces: trim + champ durci (espace clavier mobile ne casse plus l activation)"
git push
```

> Après ça, « bismillah », « BISMILLAH » ou « BISMILLAH  » (avec espaces) marcheront tous.
> Si tu veux plusieurs codes (beta-testeurs), dis-le et je transforme la condition en liste.
