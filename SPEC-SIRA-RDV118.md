# SPEC-SIRA-RDV118

## Objectif
Enrichir le RDV 118 (J'ai réussi) de 1332 à ~2300 caractères.
Ajouter le lien de Haram avec Anas, le refus des Banu Amir et le sens de "j'ai réussi".

## data/sira.min.json — RDV num:118

### Modification 1 — Après "Ḥarām partit seul. Il portait la lettre."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Ḥarām ibn Milhân était le frère d'Umm Sulaym — la mère d'Anas ibn Mālik, le serviteur du Prophète ﷺ. C'est Anas lui-même qui rapporterait cette scène des années plus tard. Il avait connu son oncle. Il savait ce genre d'homme qu'il était.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe "ʿĀmir ibn aṭ-Ṭufayl ne s'arrêta pas là."
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "ʿĀmir ibn aṭ-Ṭufayl ne s'arrêta pas là. Il mobilisa son propre clan des Banū ʿĀmir — mais ils refusèrent. Ils dirent : « Nous ne les attaquerons pas. Abū Barāʾ a donné sa garantie. » ʿĀmir se tourna alors vers les Banū Sulaym — des tribus alliées : Riʿl, Dhakwân, ʿUsayya. Eux n'avaient pas de garantie à respecter. Ils répondirent à l'appel.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe "Ces mots-là entrèrent dans la mémoire de l'islam."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "ʿĀmir n'avait pas lu la lettre du Prophète ﷺ. Il avait tué le messager avant même de l'ouvrir. Ce geste-là — tuer un messager porteur d'une lettre — était une violation de toutes les lois de l'honneur bédouin. Même dans un monde sans islam, c'était inacceptable. Il savait ce qu'il faisait.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV118.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv118 enrichissement Haram lien Anas refus Banu Amir lettre" && git push
```
