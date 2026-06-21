# SPEC-SIRA-RDV120

## Objectif
Enrichir le RDV 120 (Un mois) de 1566 à ~2400 caractères.
Ajouter la raison de l'arrêt du qunût, l'ironie de la libération d'Amr, et le traité avec les Banu Nadir.

## data/sira.min.json — RDV num:120

### Modification 1 — Après le paragraphe italic "Parce qu'Allah avait révélé que la vengeance n'appartient qu'à Lui."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Allah avait fait descendre : *« Ce n'est pas ton affaire — qu'Il les pardonne ou qu'Il les punisse : ils sont injustes. »* — Āl ʿImrān 3:128. Ce verset mit fin au qunût. Le Prophète ﷺ n'était pas fait pour maudire. Il était fait pour transmettre. Même sa colère avait une limite que Dieu lui rappelait.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe "ʿAmr ibn Umayya — celui qui était revenu vivant — rentrait à Médine."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "ʿĀmir ibn aṭ-Ṭufayl — le neveu traître d'Abū Barāʾ — l'avait libéré pour s'acquitter d'un vœu de sa mère : elle avait promis d'affranchir un esclave. ʿAmr bénéficiait de ce vœu. Il rentra donc libre — et il tua deux hommes des Banū ʿĀmir en chemin, croyant qu'ils étaient ennemis. Ils étaient sous la protection du Prophète ﷺ.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après "Il alla demander cette somme à ses alliés juifs des Banū an-Naḍîr."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Prophète ﷺ avait conclu avec les Banū an-Naḍîr un traité de Médine qui les obligeait à contribuer aux prix du sang en cas de besoin. Sa démarche était donc légitime et conforme aux accords. Il arriva chez eux avec quelques Compagnons. Il s'assit contre un mur de leur quartier. Ils l'accueillirent en apparence. En aparté, ils complotaient.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV120.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv120 enrichissement arret qunut verset Amr libere traite Nadir" && git push
```
