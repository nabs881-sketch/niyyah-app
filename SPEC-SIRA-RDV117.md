# SPEC-SIRA-RDV117

## Objectif
Enrichir le RDV 117 (Abū Barāʾ) de 1415 à ~2300 caractères.
Ajouter le refus du cadeau, le profil d'Amir ibn Tufayl rival de son oncle, et la mort d'Abu Bara.

## data/sira.min.json — RDV num:117

### Modification 1 — Après "Abū Barāʾ ʿĀmir ibn Mālik... arriva à Médine."
Insère un nouveau paragraphe APRÈS le deuxième paragraphe :
```json
{
  "type": "text",
  "content": {
    "fr": "Il apporta un cadeau au Prophète ﷺ. Le Prophète ﷺ refusa de l'accepter — il ne prenait pas les cadeaux des polythéistes. Il lui dit : « Abū Barāʾ, je n'accepte pas de cadeau d'un polythéiste. Embrasse l'islam, alors je l'accepterai. » Abū Barāʾ n'embrassa pas l'islam ce jour-là. Mais il dit : « Cette affaire à laquelle tu m'invites est belle. »",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après "ils ne savaient pas qu'Abū Barāʾ avait un neveu."
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "Ils ne savaient pas qu'Abū Barāʾ avait un neveu — ʿĀmir ibn aṭ-Ṭufayl. Un homme ambitieux, son rival pour la direction de la tribu. Il ne voulait pas que les musulmans s'installent dans la région — car cela aurait renforcé l'influence de son oncle. Il ne respecterait pas la garantie. Et il avait des alliés.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après la méditation, ajouter un paragraphe AVANT la méditation :
Insère un nouveau paragraphe AVANT la méditation (dernier paragraphe de texte) :
```json
{
  "type": "text",
  "content": {
    "fr": "Quand Abū Barāʾ apprit ce qui s'était passé — que son neveu avait massacré la délégation malgré sa parole donnée — il en fut tellement honteux qu'il tomba malade. Il mourut peu après. Sa garantie avait été trahie par le sien. C'est son neveu qui l'avait tué, à sa façon.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV117.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv117 enrichissement Abu Bara cadeau Amir rival mort honte" && git push
```
