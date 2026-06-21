# SPEC-SIRA-RDV107

## Objectif
Enrichir le RDV 107 (Devant le corps) de 1742 à ~2600 caractères.
Ajouter le serment des Compagnons, les 70 prières, et le linceul de Safiyya.

## data/sira.min.json — RDV num:107

### Modification 1 — Après le paragraphe contenant "J'endurerai. J'endurerai"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Les Compagnons qui étaient autour de lui avaient fait leurs propres serments. Certains avaient juré qu'ils mutileraient trente Qurayshites de la même façon — trente pour un. C'est dans cette chaleur-là, dans cette douleur-là, que le verset descendit. Il leur donnait le droit de rendre coup pour coup. Et il leur disait que la patience était meilleure.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "Safiyya, la sœur de Hamza, voulut venir voir."
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "Ṣafiyya, la sœur de Ḥamza, voulut venir voir. Le Prophète ﷺ envoya az-Zubayr la retenir d'abord — il ne voulait pas qu'elle voie l'état du corps. Puis il la laissa passer. Elle pria sur lui. Elle ne dit rien. Elle avait apporté deux pièces de tissu pour l'ensevelir — les ennemis avaient volé ses vêtements. On les utilisa pour le couvrir.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le nouveau paragraphe sur Safiyya
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Le Prophète ﷺ fit la prière funèbre sur Ḥamza. Puis on amena d'autres martyrs auprès de lui — l'un après l'autre — et il pria sur eux aussi, Ḥamza toujours présent. Il pria ainsi, Ḥamza et les autres, encore et encore, jusqu'à ce que la prière funèbre ait été dite soixante-dix fois. C'est ce que les sources rapportent. Soixante-dix fois.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV107.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv107 enrichissement serment Compagnons 70 prieres linceul Safiyya" && git push
```
