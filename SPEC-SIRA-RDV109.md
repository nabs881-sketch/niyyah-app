# SPEC-SIRA-RDV109

## Objectif
Enrichir le RDV 109 (Les pleureuses) de 1258 à ~2100 caractères.
Ajouter le contexte du retour à Médine et la décision finale du Prophète.

## data/sira.min.json — RDV num:109

### Modification 1 — Remplacer le premier paragraphe "À Médine, on attendait."
Remplace par :
```json
{
  "type": "text",
  "content": {
    "fr": "À Médine, on attendait. Les nouvelles étaient arrivées avant les hommes — des fuyards, des rumeurs, la liste des morts qui circulait de bouche en bouche. Chaque famille anṣârî avait quelqu'un à Uḥud. Certaines avaient perdu leur père, leur frère, leur fils. Quand l'armée rentra enfin — les blessés, les épuisés, le Messager ﷺ couvert de sang —, les femmes coururent vers eux.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "des femmes anṣārī coururent"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "C'est Ibn ʿUmar qui rapporte ce qui suivit. Le Messager d'Allah ﷺ passa près du quartier des Banû ʿAbd al-Ashhal. Il entendit les femmes anṣârî pleurer leurs morts. Aucune femme ne pleurait pour Ḥamza — il n'avait pas de famille à Médine pour le pleurer.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe contenant "Retournez maintenant. Qu'Allah vous récompense"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Ce soir-là, le Prophète ﷺ ajouta quelque chose que les sources rapportent comme une décision définitive : « Ordonnez-leur de ne plus pleurer aucun mort après ce jour. » Ḥamza avait été pleuré. C'était suffisant. Les pleurs du deuil avaient eu leur heure. Il fallait maintenant continuer.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV109.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv109 enrichissement Les pleureuses contexte Medine et decision" && git push
```
