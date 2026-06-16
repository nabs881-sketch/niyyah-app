# SPEC-WAQT-ASR-PREUVES-1

## Cible
`data/waqt/waqt_asr.json` — phrases 6 et 8 (catégorie PREUVES, parmi les 30 premières).
⚠️ JSON caché par le SW → `npm run build` avant commit. On corrige le FR uniquement.

---

## Correction 1 — phrase 6 : Fred Hoyle (attribution fausse)

« (athée toute sa vie) … Hoyle a abandonné l'athéisme » : contradictoire ET faux.
Hoyle est resté athée (anti-théiste, partisan de la panspermie). Frappé par le
fine-tuning il a dit qu'« un super-intellect a bricolé la physique » — mais il ne
s'est PAS converti. Le « 1 sur 10^40 000 » et l'analogie du Boeing 747 sont bien de lui.

CHERCHER :
```
L'astronome Fred Hoyle (athée toute sa vie) a calculé : la probabilité que la vie apparaisse par hasard est de 1 sur 10^40 000. Comme une tornade traversant une casse et assemblant un Boeing 747. Hoyle a abandonné l'athéisme. Que diras-tu, toi ?
```

REMPLACER PAR :
```
L'astronome Fred Hoyle, athée, a calculé : la probabilité que la vie apparaisse par pur hasard est de 1 sur 10^40 000 — « comme une tornade traversant une casse et assemblant un Boeing 747 ». Frappé par ces chiffres, lui-même conclut qu'« un super-intellect a bricolé la physique ». Et toi, que diras-tu ?
```

---

## Correction 2 — phrase 8 : eau (« unique » faux)

L'eau qui se dilate en gelant n'est PAS unique : silicium, gallium, bismuth,
germanium, antimoine se dilatent aussi en se solidifiant. Retirer « unique ».

CHERCHER :
```
L'eau se DILATE en gelant — anomalie unique dans l'univers connu. Sans elle, les océans gèleraient depuis le fond et toute vie aurait disparu. Une exception physique. Pour toi.
```

REMPLACER PAR :
```
L'eau se DILATE en gelant — l'une des rares substances à le faire. Sans cela, les océans gèleraient depuis le fond et la vie aquatique aurait disparu. Une exception physique précieuse. Pour toi.
```

---

## Notes (pas des SPEC, à ta main)
- **Phrase 2** : « 1 sur 10^123 » — si c'est l'entropie initiale de Penrose, le vrai
  chiffre est 10^(10^123), bien plus grand ; si c'est la constante cosmologique (~10^120),
  c'est OK mais ça fait doublon avec la phrase 26. À clarifier.
- **Phrase 18** : Coran 78:14 parle de l'eau des **nuées (pluie)**, pas des glaciers.
  Le lien « glaciers → 78:14 » est un raccourci i'jâz un peu forcé ; à adoucir si tu veux.
- **Phrase 19** : le hadith est authentique, mais « ʿilm » y désigne la **science
  religieuse** (par la mort des savants), pas « la science » moderne. Ta glose
  (information vs sagesse) corrige déjà — OK.

## Ne PAS toucher
- Le reste des 30 PREUVES : versets justes (51:56, 17:85, 51:47 avec « le verset ne
  prédit rien »), 27:56, etc. — conformes.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "waqt asr: PREUVES corrige Hoyle (reste athee, pas de conversion) + eau (pas unique)"
git push
```
