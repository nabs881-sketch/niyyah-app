# SPEC-SIRA-RDV125
# RDV 125 — Banū an-Naḍīr : Les palmiers
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 125

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Les Banū an-Naḍīr se retranchèrent dans leurs forteresses.

Les murs étaient hauts. Les réserves pleines. Et autour des murs, quelque chose que les musulmans n'avaient pas prévu : des palmeraies denses, des jardins épais, des rangées d'arbres qui s'étendaient sur des centaines de mètres et rendaient toute approche impossible. Ils avaient transformé leur environnement naturel en fortification végétale. Du haut des murs, ils lançaient des flèches et des pierres. En bas, les musulmans ne pouvaient pas avancer.

Le siège s'installa. Les jours passèrent. À l'intérieur, on attendait les renforts promis. À l'extérieur, on cherchait comment percer.

Puis le Messager d'Allah ﷺ donna un ordre qui traversa les rangs comme une lame froide : couper les palmiers. Brûler les palmeraies.

Un silence parcourut les Compagnons.

Dans la culture arabe, le palmier n'est pas un arbre comme les autres. Il nourrit, il abrite, il donne l'ombre dans le désert le plus brûlant. Il prend des décennies à pousser, parfois un siècle. Le couper, c'est effacer le travail de trois générations. Les lois de la guerre en islam — que le Prophète ﷺ lui-même rappellera à ses lieutenants — interdisent expressément de détruire les récoltes et les arbres. C'est une règle fondamentale. Et voilà qu'on leur demandait de la violer.

Certains obéirent. Ils prirent les haches et coupèrent. D'autres refusèrent — non par désobéissance, mais par scrupule sincère. Les palmiers tombaient les uns après les autres. La fumée montait. Les forteresses apparaissaient peu à peu, dénudées, exposées.

Depuis les murs, les Banū an-Naḍīr regardaient brûler leurs vergers. Ḥuyayy ibn Akhṭab regardait brûler ses jardins. Et il criait, depuis les remparts, que le Prophète ﷺ était un destructeur, un barbare, un homme qui violait ses propres lois.

Alors le ciel répondit. Un verset court, précis, qui trancha la question pour toujours :

« Quels que soient les palmiers que vous avez coupés ou laissés debout sur leurs racines, ce fut avec la permission d'Allah, et pour qu'Il couvre d'opprobre les pervers. » (59:5)

Allah validait. Pas comme règle générale — la règle reste l'interdiction. Mais devant ce siège précis, devant ces forteresses végétales qui auraient prolongé le siège des semaines, devant ce complot qui avait failli coûter la vie au Prophète ﷺ — Allah validait. Et Il répondait à ceux qui criaient depuis les murs que cette destruction était injuste.

À l'intérieur des forteresses, la terreur s'installa nuit après nuit.

Ils attendirent les Banū Qurayẓa — leurs voisins juifs, leurs frères de pacte. Personne ne bougea. Ils attendirent les deux mille d'Ibn Ubayy. Le silence. Ils attendirent les Ghatafân qu'on leur avait promis. Pas un cavalier à l'horizon.

Ils étaient seuls. Avec leurs murs. Et leurs palmiers qui brûlaient.

Six nuits. Le siège ne dura que six nuits.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sourate Al-Ḥashr (59:5)
```
**PAR :**
```
Sourate al-Ḥashr (59:5) — Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV125.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv125 enrichissement Les palmiers Banu an-Nadir" && git push
```
