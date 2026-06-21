# SPEC-SIRA-RDV137
# RDV 137 — Le Khandaq : ʿAmr
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 137

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Il s'appelait ʿAmr ibn ʿAbd Wudd al-ʿĀmirī.

Dans la culture guerrière de l'Arabie, il y avait des hommes dont le nom suffisait à faire reculer les rangs adverses. ʿAmr était de ceux-là. On disait qu'il valait mille cavaliers — pas comme une métaphore, mais comme une évaluation de ceux qui l'avaient vu se battre. Il portait les cicatrices de dizaines de combats. Il avait survécu à des duels que personne d'autre n'avait survécus. Il était vieux maintenant — soixante ans passés — mais sa réputation précédait ses pas comme une armée à elle seule.

Il était venu avec les Aḥzāb. Et il n'avait pas supporté d'attendre devant ce fossé.

Avec quatre autres — parmi eux ʿIkrima ibn Abī Jahl, fils du grand ennemi de l'islam — il longea la tranchée jusqu'à trouver l'endroit le plus étroit. Là, il lança son cheval. La bête sauta. Ils franchirent.

Cinq hommes, du côté musulman du fossé.

ʿAlī ibn Abī Tālib vit ce qui se passait. En quelques secondes, il courut avec une poignée de Compagnons fermer la brèche derrière les cinq — bloquant tout renfort possible. Les cinq étaient maintenant isolés, pris entre le fossé qu'ils ne pouvaient plus refranchir sous les flèches et les rangs musulmans devant eux.

ʿAmr ne le savait pas encore. Il avait sauté pour tuer. Il avait sauté dans une nasse.

Il se redressa sur son cheval, regarda les rangs musulmans en face de lui, et lança le défi traditionnel du champion arabe :

« Y a-t-il un homme parmi vous ? Y en a-t-il un qui veut se mesurer à moi ? »

Silence dans les rangs musulmans.

« Y a-t-il un homme ? »

ʿAlī ibn Abī Tālib s'avança. Il avait vingt-cinq ans. Peut-être vingt-six. En face de lui, un guerrier de soixante ans dont la seule réputation avait fait fuir des armées.

Le Prophète ﷺ mit la main sur l'épaule de ʿAlī et dit doucement : « C'est ʿAmr. » Comme pour dire : tu sais qui c'est. Tu sais ce que ça signifie.

ʿAlī dit : « Je sais. »

ʿAmr regarda le jeune homme qui s'avançait. Il connaissait son père. Il eut presque de la pitié. Il dit : « Va-t'en, mon neveu. Je ne tiens pas à verser ton sang. Ton père était mon ami. Retourne dans tes rangs et envoie-moi quelqu'un d'autre. »

ʿAlī répondit, sans bouger : « Mais moi, je tiens à verser le tien. »

ʿAmr descendit de cheval. Par tradition, les duels entre champions se font à pied — pour qu'aucun des deux ne puisse fuir. Mais ʿAmr alla plus loin : il tira son épée et tua son propre cheval. Pour signifier qu'il n'y aurait pas de fuite possible. Pas de recul. Pas d'issue sauf la victoire ou la mort.

Les deux hommes se firent face.

Ils tournèrent l'un autour de l'autre. La poussière se leva entre eux. Les Compagnons regardaient depuis les rangs — ils ne voyaient plus rien. Juste le nuage de sable, les bruits de métal, les pas qui cherchaient l'ouverture.

Puis un choc. Un seul cri. Le silence.

Quand la poussière retomba, c'était ʿAlī qui était debout.

Les quatre autres, voyant tomber le géant, n'attendirent pas. Ils sautèrent sur leurs chevaux et chargèrent vers le fossé pour refranchir en sens inverse — ʿIkrima abandonna sa lance dans sa panique, elle fut ramassée par les musulmans. Ils passèrent sous les flèches. Certains furent blessés. Ils disparurent de l'autre côté.

Quand ʿAlī revint vers le Messager d'Allah ﷺ — sabre propre, car la tradition voulait qu'on essuie la lame, visage couvert de poussière — le Prophète ﷺ dit :

« Le coup de ʿAlī au jour du Khandaq pèse plus que toutes les bonnes œuvres de ma communauté jusqu'au Jour du Jugement. »

Une phrase que les savants ont commentée pendant des siècles. Ce qu'elle dit simplement : il y a des actes qui arrivent au bon moment, au bon endroit, et qui portent une communauté entière sur leurs épaules. Le coup de ʿAlī ce jour-là n'était pas juste un duel — c'était la brèche qu'on referme, la panique qu'on empêche, le fossé qu'on tient.
```

---

## Correction champ `source`

**REMPLACER :**
```
Sîra classique (Ibn Hishâm / Ibn Isḥâq)
```
**PAR :**
```
Ibn Hishâm, Ibn Isḥâq — hadith rapporté par al-Hâkim et Ibn ʿAsâkir pour la parole du Prophète ﷺ
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV137.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv137 enrichissement Amr ibn Abd Wudd duel Ali khandaq" && git push
```
