# SPEC-SIRA-RDV147
# RDV 147 — Après Qurayẓa : Thumāma
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 147

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Trente cavaliers partirent vers le Najd sous Muḥammad ibn Maslama. Une mission de routine — calmer les Banū Bakr ibn Kilāb qui pillaient les routes. En chemin, ils croisèrent un homme qui voyageait seul, sans escorte apparente.

Ils le capturèrent. Et quand ils l'amenèrent à Médine, on découvrit qui il était.

Thumāma ibn Uthāl al-Ḥanafī. Le chef des Banū Ḥanîfa — l'une des grandes tribus du Yamâma, région du centre de l'Arabie, riche en agriculture et en commerce. Un homme de rang, d'influence, habitué à ce qu'on lui ouvre les portes. Il voyageait incognito. Il avait une mission : assassiner le Messager d'Allah ﷺ, sur ordre de Musaylima — l'homme qui se proclamait prophète au Yamâma et qui voulait éliminer Mohammed avant que l'islam ne devienne trop puissant pour être arrêté.

Il se retrouvait prisonnier à Médine, attaché à un pilier de la mosquée.

C'était la coutume pour les prisonniers importants — on les mettait là où tout le monde pouvait les voir, et où eux pouvaient tout voir. Pas dans un cachot. Dans le lieu de prière. Au centre de la vie de la communauté.

Le Prophète ﷺ vint le voir.

« Comment vas-tu, Thumāma ? »

Thumāma le regarda. Il répondit, avec la dignité d'un chef de tribu qui refuse de montrer la peur :

« Je vais bien, Mohammed. Si tu me tues, tu tueras quelqu'un dont le sang a du poids — et les siens se vengeront. Si tu me laisses vivre, tu auras ma gratitude et celle de ma tribu. Si c'est de l'argent que tu veux, demande — j'en ai en abondance. »

Le Messager d'Allah ﷺ ne dit rien. Il s'en alla.

Le lendemain, il revint. Même question. Même réponse. Il s'en alla.

Et pendant ces jours, Thumāma observait.

Il voyait les Compagnons arriver pour les prières — cinq fois par jour, à des heures fixes, sans qu'on les force. Il voyait des hommes libres et des affranchis prier côte à côte, sans distinction de rang. Il voyait le Prophète ﷺ s'arrêter pour parler à un vieil homme assis au fond de la mosquée avec autant d'attention qu'il en donnait à ses chefs. Il voyait des repas partagés entre riches et pauvres, entre Arabes et non-Arabes.

Il voyait quelque chose qu'il n'avait vu nulle part ailleurs dans sa vie de chef de tribu.

Le troisième jour, le Prophète ﷺ revint une dernière fois. Il posa la même question. Et cette fois, sans attendre la réponse, il se tourna vers ses Compagnons et dit :

« Libérez Thumāma. »

On le détacha. On ne lui demanda rien. On ne lui imposa aucune condition. On lui ouvrit les portes de Médine.

Thumāma sortit. Il alla jusqu'à un jardin de palmiers aux abords de la ville. Il fit ses ablutions. Il revint à la mosquée. Il dit :

« Ô Messager d'Allah, par Allah, il n'y avait pas sur cette terre de visage plus détesté par moi que le tien. Et maintenant, ton visage est le plus aimé de tous les visages. Il n'y avait pas de religion plus détestée par moi que la tienne. Et maintenant, c'est la plus aimée. Il n'y avait pas de ville plus détestée par moi que ta ville. Et maintenant, c'est la ville la plus aimée. »

Il prononça la shahâda.

Puis il demanda au Prophète ﷺ la permission de faire la ʿumra à La Mecque — il voulait annoncer sa conversion. Le Prophète ﷺ la lui donna. Il repartit vers le Yamâma — et en passant, il envoya un message aux Quraysh : à partir de maintenant, plus un grain de blé du Yamâma ne partirait vers La Mecque sans l'autorisation du Messager d'Allah ﷺ.

Le Yamâma nourrissait La Mecque. Thumāma venait de poser un embargo.

Un homme était venu pour tuer. Il repartit comme allié. Et il avait apporté, sans le chercher, une arme que mille épées n'auraient pas donnée.
```

---

## Correction champ `source`

**REMPLACER :**
```
Saḥīḥ al-Bukhārī
```
**PAR :**
```
Sahîh al-Bukhârî — Ibn Hishâm
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV147.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv147 enrichissement Thumama conversion embargo Yamama" && git push
```
