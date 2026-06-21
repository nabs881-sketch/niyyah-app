# SPEC-SIRA-RDV110

## Objectif
Enrichir le RDV 110 (Les blessés repartent) de 1715 à ~2500 caractères.
Ajouter la vraie raison du retrait d'Abu Sufyan et le témoignage d'Aïsha sur le verset.

## data/sira.min.json — RDV num:110

### Modification 1 — Après le paragraphe contenant "Ils allumèrent des feux. Beaucoup"
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Les feux étaient nombreux — délibérément. Le Messager d'Allah ﷺ avait ordonné qu'on en allume cinq cents. De loin, dans la nuit, cela ressemblait à une armée immense. Un signal visible à des miles à la ronde.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 2 — Après le paragraphe contenant "Maʿbad al-Khuzāʿī — un homme sympathisant des musulmans"
Remplace ce paragraphe par :
```json
{
  "type": "text",
  "content": {
    "fr": "Abū Sufyān reçut les nouvelles. Avant de quitter Médine, Maʿbad al-Khuzāʿî — un homme des Banū Khuzāʿa, non encore musulman mais sympathisant — avait rendu visite au Prophète ﷺ pour lui présenter ses condoléances. En repartant, il croisa l'armée de Quraysh. Abu Sufyan l'interrogea. Maʿbad lui dit : « Je les ai laissés derrière moi — Muhammad et ses hommes — dans un état que je n'ai jamais vu. Ils brûlent de vous retrouver. » Il mentait pour protéger les musulmans. Les Quraysh, qui hésitaient à revenir attaquer Médine, abandonnèrent le projet.",
    "en": "",
    "ar": ""
  }
}
```

### Modification 3 — Après le dernier verset italic (3:172)
Insère un nouveau paragraphe APRÈS :
```json
{
  "type": "text",
  "content": {
    "fr": "Des années plus tard, ʿĀʾisha récita ce verset à son neveu ʿUrwa ibn al-Zubayr. Elle dit : « Ô mon neveu, tes deux pères ont répondu » — elle parlait de Zubayr ibn al-ʿAwwâm, père de ʿUrwa, et d'Abū Bakr, son grand-père. Tous deux avaient marché à Ḥamrāʾ al-Asad, blessés. Ce verset les concernait.",
    "en": "",
    "ar": ""
  }
}
```

## Trigger
```
Lis SPEC-SIRA-RDV110.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv110 enrichissement Hamra al-Asad feux Maabad temoignage Aisha" && git push
```
