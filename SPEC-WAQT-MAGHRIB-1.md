# SPEC-WAQT-MAGHRIB-1

## Cible
`data/waqt/waqt_maghrib.json` — 2 phrases avec **mauvaise attribution coranique**.
Audit : 193 références coraniques vérifiées contre le texte (Hamidullah). **191 exactes, 2 erreurs.**
⚠️ JSON caché par le SW → `npm run build` avant commit. FR uniquement.

> Les phrases n'ont pas d'`id`. Repère-les par leur **ancre unique** (la référence en fin de phrase, présente une seule fois dans le fichier). Respecte le style d'apostrophes typographiques du fichier.

---

## Correction 1 — phrase ancrée sur « Coran 9:72 »

**Problème** : le dialogue « Êtes-vous satisfaits ?… plus jamais Je ne Me fâcherai » est un **hadith** (Bukhari 6549 / Muslim 2829), PAS le Coran 9:72. Seul le concept « Son agrément est plus grand » vient de 9:72. Le présenter comme « — Coran 9:72 » attribue un hadith au Coran.

REMPLACER tout le `fr` de cette phrase PAR :
```
Allâh dira aux gens du Paradis : 'Êtes-vous satisfaits ?' Ils diront oui. Il dira : 'Je vous accorde Mon agrément — et plus jamais Je ne Me fâcherai contre vous.' (hadith, Bukhari & Muslim) Et le Coran le confirme : Son agrément vaut plus que le Jardin lui-même. — Coran 9:72
```

---

## Correction 2 — phrase ancrée sur « Coran 60:5 »

**Problème** : la du'â citée (« fais que nous n'ayons rien à craindre… Tu es Pardonneur, Miséricordieux ») **ne correspond pas à 60:5**. Le vrai 60:5 = « Seigneur, ne fais pas de nous un sujet de tentation pour ceux qui ont mécru ; et pardonne-nous… c'est Toi le Puissant, le Sage. » Mauvaise attribution.

**Fix** : on rattache la phrase à la **vraie du'â des croyants au Jour du Jugement = 66:8** (« parfais-nous notre lumière et pardonne-nous, Tu es Omnipotent »), texte authentique.

REMPLACER tout le `fr` de cette phrase PAR :
```
'Notre Seigneur, parfais-nous notre lumière et pardonne-nous : Tu es Omnipotent.' La du'â des croyants au Jour du Jugement, quand leur lumière court devant eux. Tu peux la dire dès ce soir. — Coran 66:8 (à confirmer par l'imam)
```

> Alternative si tu préfères ne pas changer de verset : retirer simplement « — Coran 60:5 (sens) » et garder le texte comme « invocation des croyants » sans numéro (puisqu'il ne colle à aucun verset précis). À ta main / celle de l'imam.

---

## Note structurelle (PAS dans ce SPEC — décision séparée)
Les **34 phrases `plage_origine:apresmidi`** en tête du fichier (« cet après-midi », « plage de l'Asr ») sont **uniques** (pas dans le fichier ʿAsr) et **seront affichées au Maghrib** certains jours (le service fait `(dayOfYear+hash) % length`, sans filtre horaire). Si tu veux les sortir, dis-le : je fais un SPEC structurel dédié.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "waqt maghrib: corrige 2 attributions coraniques (181 hadith->9:72, 299 60:5->66:8)"
git push
```
