# SPEC-SIRA-RDV112

## Objectif
Enrichir le RDV 112 (Comme si rien) de 1607 à ~2300 caractères.
Ajouter le contexte de qui était ibn Ubayy et le contraste avec son fils croyant.

## data/sira.min.json — RDV num:112

### Modification 1 — Avant le premier paragraphe "Le vendredi qui suivit Uḥud"
Insère un nouveau paragraphe AVANT (en premier) :
```json
{
  "type": "text",
  "content": {
    "fr": "ʿAbdullāh ibn Ubayy ibn Salūl n'était pas n'importe qui. Avant l'arrivée du Prophète ﷺ à Médine, il était sur le point d'être couronné roi de la ville — les deux tribus principales, Aws et Khazraj, s'apprêtaient à le proclamer. La venue du Prophète ﷺ avait rendu ce couronnement inutile. Il n'avait jamais vraiment pardonné.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "ʿUmar comprit. Il se tut."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Ibn Ubayy mourut quelques années plus tard, toujours à Médine, toujours chef de clan, toujours dans les mosquées. Son fils — ʿAbdullāh ibn ʿAbdullāh ibn Ubayy — était l'exact opposé de son père : un croyant sincère, dévoué, qui avait combattu à Uḥud quand son père faisait demi-tour. Il proposa un jour au Prophète ﷺ de tuer son propre père s'il le fallait pour la communauté. Le Prophète ﷺ refusa. Et quand ibn Ubayy mourut, c'est le Prophète ﷺ lui-même qui pria sur lui — malgré les objections d'ʿUmar.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le paragraphe "La patience prophétique n'est pas faiblesse — c'est calcul amoureux du long terme."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Coran avait déjà parlé de lui — les versets sur les munâfiqûn, les hypocrites, sont en partie révélés à son sujet. Mais tant qu'il se présentait à la mosquée, tant qu'il n'avait pas ouvertement renié l'islam, le Prophète ﷺ le traita comme un musulman. Ce n'était pas de la naïveté. C'était une ligne qu'il avait décidé de ne pas franchir — la ligne entre le for intérieur et l'acte public.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV112.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv112 enrichissement ibn Ubayy contexte et fils croyant" && git push
```
