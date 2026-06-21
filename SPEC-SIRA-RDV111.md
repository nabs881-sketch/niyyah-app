# SPEC-SIRA-RDV111

## Objectif
Enrichir le RDV 111 (Les versets descendent) de 1528 à ~2300 caractères.
Ajouter la réaction d'Umar à la mort du Prophète et le contexte des 60 versets.

## data/sira.min.json — RDV num:111

### Modification 1 — Après le premier paragraphe "Allah parla."
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Soixante versets de la sourate Āl ʿImrān, peut-être plus, sont venus après Uḥud. Ce n'était pas une explication froide — c'était une présence. Allah répondait à une communauté blessée, confuse, qui avait vu mourir ses meilleurs hommes et qui cherchait du sens dans la défaite.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "C'est ce verset qu'Abū Bakr récitera le jour de la mort du Prophète ﷺ"
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "C'est ce verset qu'Abū Bakr récitera le jour de la mort du Prophète ﷺ, neuf ans plus tard, pour calmer une communauté hystérique. Il sortit et récita : *« Muhammad n'est qu'un Messager. Avant lui, d'autres messagers sont passés. »* ʿUmar ibn al-Khaṭṭâb dirait : *« Par Allah, à peine avais-je entendu Abū Bakr réciter ce verset que je fus comme si on m'avait coupé les jarrets — mes jambes ne me portaient plus. Je compris que le Prophète était mort. »* ʿAbdullāh ibn ʿAbdullāh dit : *« Par Allah, il semblait qu'aucun d'entre nous ne connaissait ce verset avant de l'entendre réciter par Abū Bakr.»*",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le dernier paragraphe "Il descend pour des moments futurs"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Uḥud avait posé une question : peut-on faire confiance à un Dieu dont le Prophète saigne, dont les meilleurs serviteurs meurent, dont la communauté perd ? Ces versets étaient la réponse. Pas une promesse de victoire — une explication de la nature du chemin. Le chemin est difficile. C'est précisément pour ça qu'il vaut quelque chose.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV111.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv111 enrichissement versets Uhud reaction Umar mort Prophete" && git push
```
