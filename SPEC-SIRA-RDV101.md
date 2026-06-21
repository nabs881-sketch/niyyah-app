# SPEC-SIRA-RDV101

## Objectif
Enrichir le RDV 101 (Nasība) avec 3 paragraphes vérifiés sur sources primaires.
Passer de 2426 à ~2780 caractères.

## data/sira.min.json — RDV num:101

### Modification 1 — Après le paragraphe contenant "L'armure tint. Il la frappa en retour"
Insère un nouveau paragraphe APRÈS ce paragraphe :
```json
{
  "type": "text",
  "content": {
    "fr": "Le sang jaillissait de la blessure. Le Messager d'Allah ﷺ s'en occupa lui-même — de ses propres mains, il pansa l'épaule de Nusayba. Puis il se tourna vers les Compagnons qui l'entouraient et dit : \"Par Allah ! Aujourd'hui Umm ʿAmmâra a témoigné autant de courage que nous tous.\"",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "Ta station aujourd'hui est meilleure"
Insère un nouveau paragraphe APRÈS ce paragraphe :
```json
{
  "type": "text",
  "content": {
    "fr": "Quand la bataille cessa, le Messager d'Allah ﷺ ne rentra pas à Médine avant d'avoir reçu des nouvelles de Nusayba. Il envoya demander si elle allait bien. Ce n'est qu'une fois rassuré qu'il repartit.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Remplacer le paragraphe contenant "Elle reviendrait combattre lors d'autres batailles"
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "Elle rentrerait à Médine avec ses blessures. Elle soignerait celle de l'épaule pendant une année entière. Elle reviendrait combattre — à Ḥunayn, à Ḫaybar, et lors de la bataille d'al-Yamama contre Musaylima al-Kadhdhâb où, à plus de soixante ans, elle perdrait un bras dans les combats. Elle rentra à Médine auréolée de gloire. Elle n'en fit aucun cas.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV101.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv101 enrichissement Nusayba 3 paragraphes verifies" && git push
```
