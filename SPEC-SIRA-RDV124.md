# SPEC-SIRA-RDV124
# RDV 124 — Banū an-Naḍīr : Deux mille hommes
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 124

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Le message arriva de nuit.

L'expéditeur : ʿAbdullâh ibn Ubayy ibn Salūl. Chef des Khazraj avant l'islam, homme que l'arrivée du Prophète ﷺ à Médine avait privé d'une couronne qu'il croyait tenir. Il priait en public, récitait la shahâda, participait aux assemblées — et travaillait en secret contre tout ce qu'il affichait en public. Le Coran le désignera comme le chef des hypocrites. L'histoire retiendra son nom comme l'exemple même de la double face.

Il écrivit aux Banū an-Naḍīr :

« Soyez fermes. Refusez de partir. Restez dans vos forteresses. J'ai deux mille hommes qui viendront veiller sur vous, prêts à mourir pour vous. »

Dans les forteresses des Banū an-Naḍīr, le message circula. Les chameaux avaient été chargés. Certains pleuraient. Et voilà qu'une promesse tombait — deux mille hommes, des alliés au cœur de Médine, des gens qui connaissaient le terrain, qui pourraient retourner la situation.

Leur chef, Ḥuyayy ibn Akhṭab — homme fier, dur, qui haïssait l'islam d'une haine viscérale et ancienne, qui avait tout fait pour dresser les tribus contre le Prophète ﷺ depuis le premier jour — y vit l'occasion qu'il attendait. Les chameaux furent déchargés. La décision fut prise.

Il envoya un message au Messager d'Allah ﷺ : « Nous ne sortirons pas. Fais ce que tu veux. »

Un homme qui n'avait pas les forces qu'on lui avait promises, et qui ne le savait pas encore, défiait celui qui les avait.

Allah cita ces mots plus tard, dans la sourate al-Ḥashr, comme exemple éternel du mensonge des hypocrites : « Si vous êtes expulsés, nous vous suivrons en exil. Nous n'obéirons à personne contre vous. Si vous êtes attaqués, nous serons à vos côtés. » Et Allah ajouta : « Allah atteste qu'ils sont des menteurs. » (59:11-12)

À Médine, quand la réponse des Banū an-Naḍīr parvint au Prophète ﷺ, les Compagnons crièrent : « Allahu akbar ! Allahu akbar ! » Le temps du délai était révolu. Le temps du siège commençait.

Le drapeau fut confié à ʿAlī. Ibn Umm Maktūm — l'aveugle qui n'avait jamais cessé de répondre à l'appel — fut laissé responsable à Médine. Et les musulmans se mirent en marche vers les forteresses des Banū an-Naḍīr.

Ils attendirent les deux mille hommes promis par Ibn Ubayy.

Ils attendirent longtemps.

Pas un ne vint. Pas un seul. Pas une lance, pas un bouclier, pas un murmure de soutien. Le silence des hypocrites était total — un silence qui parlait plus fort que toutes les promesses qu'ils avaient faites.

Le mensonge s'effondrait. Comme s'effondrent toujours les mensonges — à l'épreuve.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sourate Al-Ḥashr (59:11-12)
```
**PAR :**
```
Sourate al-Ḥashr (59:11-12) — Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV124.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv124 enrichissement Deux mille hommes Banu an-Nadir" && git push
```
