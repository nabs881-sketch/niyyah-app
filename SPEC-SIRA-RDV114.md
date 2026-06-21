# SPEC-SIRA-RDV114

## Objectif
Enrichir le RDV 114 (Le bâton) de 1455 à ~2300 caractères.
Ajouter le signe prophétique "il te rappellera Satan" et la prière en gestuelles.

## data/sira.min.json — RDV num:114

### Modification 1 — Après le paragraphe italic "Va. Et règle l'affaire."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "ʿAbdullāh demanda : « Décris-le-moi, ô Messager d'Allah, afin que je le reconnaisse. » Le Prophète ﷺ répondit : « Quand tu le verras, il te rappellera Satan. Et le signe entre toi et lui : quand tu le verras, tu ressentiras un frisson. » ʿAbdullāh dit plus tard : « Quand je le vis, c'est exactement ce que je ressentis. »",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe "Puis ʿAbdullāh vit son moment. Il agit."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Mais avant d'agir, l'heure de la prière de l'Asr était venue. Il ne pouvait pas s'arrêter — se prosterner là-bas l'aurait trahi. Il pria en faisant des signes de tête, marchant, sans s'arrêter. Puis, quand il fut seul avec Khālid, il l'abattit.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe "Le Prophète ﷺ regarda. Il ne s'attarda pas sur la tête."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Ce n'était pas le geste habituel du commandant qui regarde la preuve et valide. C'était quelque chose de plus personnel. Le Prophète ﷺ avait envoyé un homme seul, sans escorte, dans des territoires hostiles, avec pour seule arme sa ruse et sa foi. Et cet homme était revenu. Il méritait mieux qu'un regard sur la tête.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV114.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv114 enrichissement signe Satan priere gestes baton" && git push
```
