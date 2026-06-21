# SPEC-SIRA-RDV146
# RDV 146 — Banū Qurayẓa : Rayḥāna
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 146

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Le même jour où les hommes des Banū Qurayẓa furent exécutés, les femmes et les enfants furent mis sous la protection du camp musulman.

Parmi elles, Rayḥāna bint Zayd.

Elle était jeune. D'origine des Banū an-Naḍīr, mais mariée depuis des années dans le clan des Qurayẓa. Ce jour-là, elle avait perdu son mari. Elle avait peut-être perdu son père, ses frères, ses oncles. Tout ce qui composait sa vie masculine avait disparu en quelques heures. Elle était vivante — et elle portait un silence qui pesait plus que les mots.

Selon les règles de la guerre du VIIe siècle — règles que toutes les civilisations de l'époque pratiquaient, que les Romains, les Perses, les tribus arabes appliquaient identiquement — les femmes du clan vaincu étaient placées sous la protection des vainqueurs. Rayḥāna fut confiée au Messager d'Allah ﷺ.

Il lui parla. Doucement. Il lui proposa deux choses : embrasser l'islam, et devenir son épouse. Il l'avait fait pour Juwayriya après Banū al-Mustaliq. Il le ferait pour Ṣafiyya après Khaybar. C'était pour lui une façon de traiter avec dignité une femme que la guerre avait isolée — non pas l'humilier, mais lui offrir un statut, une protection, une appartenance.

Rayḥāna refusa.

Elle dit simplement : « Je préfère rester sous ta protection sans me marier — pour l'instant. »

Il y avait dans ces mots tout ce qu'elle ne disait pas. Comment croire au Dieu de ceux qui venaient de tuer les siens ? Comment prononcer la shahâda le jour même où son mari était mort ? Le choc était trop récent. La douleur trop vive. Elle n'était pas hostile — elle était brisée.

Le Prophète ﷺ accepta son refus. Sans insister. Sans pression. Il lui assigna une maison. Il continuait à lui rendre visite. Il lui parlait. Il attendait.

Les semaines passèrent. Peut-être les mois. L'islam continuait son chemin à Médine. Les versets descendaient. La vie se poursuivait. Rayḥāna observait depuis sa maison — les prières, les Compagnons, le Prophète ﷺ qui revenait la voir avec la même patience, sans jamais exiger.

Un jour, il lui dit : « Rayḥāna, si tu choisissais Allah et son Messager, Allah te choisirait. »

Elle ne répondit rien sur le moment. Elle laissa les mots reposer dans son cœur.

Un matin, le Messager d'Allah ﷺ s'apprêtait à sortir. Quelqu'un s'approcha de lui à voix basse : « Rayḥāna est devenue musulmane. »

Le visage du Prophète ﷺ s'éclaira. Les Compagnons qui étaient là le virent changer d'expression — la même lumière qu'on lui avait vue d'autres fois, quand quelque chose de bon arrivait sans qu'il l'ait forcé.

Il lui proposa à nouveau le mariage. Elle accepta.

Ce qui se passa ensuite, les sources ne s'accordent pas. Selon Ibn Hishâm, elle resta sous sa protection puis fut affranchie. Selon d'autres, elle devint son épouse. Mubarakpuri signale la divergence et ne tranche pas. Il n'est pas honnête de trancher là où les sources ne le font pas.

Ce qui est certain : Rayḥāna vécut auprès du Messager d'Allah ﷺ. Elle ne parla jamais publiquement des morts de son peuple. Elle apprit le Coran. Elle pria. Elle mourut avant lui et fut enterrée à Médine.

On ne peut pas savoir ce qu'elle portait dans le cœur — cette femme qui avait perdu les siens un matin et qui, quelques mois plus tard, priait dans la direction de La Mecque. On ne peut pas savoir ce que la foi avait fait de sa douleur, ni comment l'une et l'autre avaient coexisté.

On peut savoir une chose : personne ne l'avait forcée. Le Prophète ﷺ avait attendu. Et c'est elle qui avait fini par s'ouvrir — à son rythme, en son temps, seule devant son cœur.
```

---

## Correction champ `source`

**REMPLACER :**
```
Ibn Hishām
```
**PAR :**
```
Ibn Hishâm — Mubarakpuri
```

---

## Aucune modification pour :
- La méditation — validée telle quelle

## Build
```
Lis SPEC-SIRA-RDV146.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv146 enrichissement Rayhana patience conversion" && git push
```
