# SPEC-SIRA-RDV147-CORRECTION
# RDV 147 — Correction fin du texte (doublon avec RDV 148)

## Fichier cible
`data/sira/sira.json` — entrée RDV 147

---

## Supprimer la fin du texte à partir de "Thumāma sortit"

**REMPLACER :**
```
Thumāma sortit. Il alla jusqu'à un jardin de palmiers aux abords de la ville. Il fit ses ablutions. Il revint à la mosquée. Il dit :

« Ô Messager d'Allah, par Allah, il n'y avait pas sur cette terre de visage plus détesté par moi que le tien. Et maintenant, ton visage est le plus aimé de tous les visages. Il n'y avait pas de religion plus détestée par moi que la tienne. Et maintenant, c'est la plus aimée. Il n'y avait pas de ville plus détestée par moi que ta ville. Et maintenant, c'est la ville la plus aimée. »

Il prononça la shahâda.

Puis il demanda au Prophète ﷺ la permission de faire la ʿumra à La Mecque — il voulait annoncer sa conversion. Le Prophète ﷺ la lui donna. Il repartit vers le Yamâma — et en passant, il envoya un message aux Quraysh : à partir de maintenant, plus un grain de blé du Yamâma ne partirait vers La Mecque sans l'autorisation du Messager d'Allah ﷺ.

Le Yamâma nourrissait La Mecque. Thumāma venait de poser un embargo.

Un homme était venu pour tuer. Il repartit comme allié. Et il avait apporté, sans le chercher, une arme que mille épées n'auraient pas donnée.
```

**PAR :**
```
Thumāma sortit. On ne lui demanda rien. On ne lui imposa aucune condition. On lui ouvrit les portes de Médine.

Il s'éloigna.
```

---

## Build
```
Lis SPEC-SIRA-RDV147-CORRECTION.md et applique-le exactement.
npm run build && git add -A && git commit -m "fix: sira rdv147 suppression doublon fin (contenu deplace en rdv148)" && git push
```
