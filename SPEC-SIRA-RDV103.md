# SPEC-SIRA-RDV103

## Objectif
Enrichir le RDV 103 (Il est vivant) de 1357 à ~2500 caractères.
Ajouter 4 paragraphes vérifiés.

## data/sira.min.json — RDV num:103

### Modification 1 — Après le paragraphe "Il lui dit : « Sais-tu que Mohammed est mort ? »"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "La rumeur avait traversé le champ de bataille comme une flamme dans l'herbe sèche. Elle avait commencé dans la confusion de la déroute — une voix, peut-être deux, qui avait crié le nom du Prophète ﷺ pour atteindre les musulmans là où les épées n'atteignaient pas. Et la rumeur avait fait ce que les assaillants n'avaient pas réussi à faire : elle avait paralysé des hommes, fait lâcher des armes, poussé des pieds vers Médine.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "S'il est mort, il a livré son message. Combats pour ta religion"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "C'est Thābit ibn ad-Daḥdāḥ qui brisa le premier cette paralysie. Il se leva au milieu des Anṣâr qui hésitaient, le regard perdu entre le champ de bataille et la route de Médine. Il n'avait pas besoin de beaucoup de mots. Il en choisit les plus simples :",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe contenant "Ses compagnons tombèrent."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Prophète ﷺ apprendrait sa mort plus tard. Il dirait de lui que bien des palmiers chargés de fruits l'attendaient au Paradis. Ce n'était pas une consolation — c'était un témoignage. Thābit avait choisi de mourir debout plutôt que de fuir vivant. Et les hommes qui l'avaient vu charger se souvinrent de ce choix.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 4 — Après le paragraphe contenant "Les compagnons accouraient."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Messager d'Allah ﷺ leur fit signe de se taire — il ne voulait pas que les Quraysh repèrent sa position. Mais c'était trop tard. La nouvelle vraie courait désormais plus vite que la fausse. Et pour chaque homme qui avait lâché son épée en entendant la rumeur de la mort, il y en avait maintenant un autre qui la reprenait en apprenant la vérité.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV103.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv103 enrichissement Il est vivant 4 paragraphes" && git push
```
