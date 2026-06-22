# SPEC-SIRA-RDV152
# RDV 152 — Ḥudaybiya : Suhayl
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 152

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
ʿUthmân revint vivant.

La rumeur avait été fausse. Il était sain et sauf — les Quraysh l'avaient retenu pour délibérer, pas pour le tuer. Et derrière lui, ils envoyèrent un homme.

Suhayl ibn ʿAmr. L'un des plus grands orateurs de Quraysh — un homme dont la parole avait du poids dans les assemblées, dont l'éloquence était connue dans toute l'Arabie. Envoyer Suhayl, c'était envoyer quelqu'un qui savait négocier. C'était un signal.

Le Messager d'Allah ﷺ le vit arriver de loin. Il dit à ses Compagnons, doucement : « On vous a facilité l'affaire. Ces gens veulent la réconciliation — puisqu'ils vous envoient cet homme. » Son nom, Suhayl, dérivait de la racine sahl — facile, aisé. Le Prophète ﷺ lisait les noms comme il lisait les signes.

Suhayl s'assit. Il parla. Il négocia durement, point par point, clause par clause. Ce n'était pas un homme à accorder des concessions facilement.

Vint le moment de rédiger le document. Le Prophète ﷺ appela ʿAlî ibn Abî Tâlib pour écrire. Il lui dit : « Écris : Bismillâhi-r-Rahmâni-r-Rahîm. »

Suhayl dit : « Je ne connais pas ce nom. Écris : bi-ismika Allâhumma — en Ton nom, ô Allah. »

Le Prophète ﷺ accepta.

ʿAlî écrivit : « Ceci est ce sur quoi s'est mis d'accord Muhammad, le Messager d'Allah... »

Suhayl dit : « Si nous reconnaissions que tu es le Messager d'Allah, nous n'aurions pas de querelle avec toi. Écris ton nom et le nom de ton père. »

ʿAlî hésita. Le Prophète ﷺ lui dit doucement : « Efface "Messager d'Allah". » ʿAlî refusa — il ne pouvait pas effacer de sa propre main le titre du Prophète ﷺ. Le Messager d'Allah ﷺ demanda où était écrit le mot. On le lui montra. Il l'effaça lui-même de sa propre main. Il dit : « Écris : Muhammad ibn ʿAbdillâh. »

Quatre clauses furent finalement convenues :

Première : les musulmans repartiraient à Médine sans avoir fait la ʿumra cette année. L'année prochaine, ils pourraient entrer à La Mecque pendant trois jours, avec des armes de voyageur seulement.

Deuxième : trêve de dix ans entre les deux parties. Sécurité pour tous sur les routes.

Troisième : liberté pour les tribus de se rallier à l'un ou l'autre camp.

Quatrième : tout homme quittant les Quraysh pour rejoindre les musulmans sans l'accord de son tuteur serait renvoyé aux Quraysh. Mais tout homme quittant les musulmans pour les Quraysh ne serait pas réclamé.

Cette quatrième clause était asymétrique. Humiliante. Elle signifiait que les musulmans devaient rendre ceux qui les rejoignaient, mais ne pouvaient pas réclamer ceux qui les quittaient.

La réaction fut immédiate. ʿUmar ibn al-Khattâb s'avança vers le Prophète ﷺ, la mâchoire serrée. Il dit : « Ô Messager d'Allah, ne sommes-nous pas sur la vérité ? » — « Si. » — « Et eux dans l'erreur ? » — « Oui. » — « Pourquoi acceptons-nous l'humiliation dans notre religion ? »

Le Messager d'Allah ﷺ répondit : « Je suis le Messager d'Allah. Je n'agis pas contre Son ordre. Et Il ne m'abandonnera pas. »

ʿUmar n'était pas encore satisfait. Il alla voir Abū Bakr. Il lui dit la même chose. Abū Bakr répondit : « Il est le Messager d'Allah. Ne doute pas de lui. »

ʿUmar dira plus tard qu'il avait jeûné, prié, fait l'aumône pour expier les paroles qu'il avait prononcées ce jour-là, tant il craignait d'avoir manqué de foi.

Le Prophète ﷺ voyait quelque chose que ses Compagnons ne voyaient pas encore. Il voyait dix ans de paix. Dix ans pendant lesquels l'islam pourrait se répandre sans guerre. Dix ans pour envoyer des lettres aux rois de Perse, de Byzance, d'Éthiopie. Dix ans pour que les cœurs basculent, que les tribus choisissent, que la géographie de l'Arabie change en silence.

La clause humiliante — elle serait annulée dans deux ans par les Quraysh eux-mêmes, qui la violeraient les premiers. Et ce serait le prétexte de la conquête de La Mecque.

Il voyait la fin. Pas le prochain pas — la fin.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sîra classique (Ibn Hishâm / Ibn Isḥâq)
```
**PAR :**
```
Ibn Hishâm, Ibn Isḥâq
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV152.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv152 enrichissement Suhayl traite Hudaybiya clauses" && git push
```
