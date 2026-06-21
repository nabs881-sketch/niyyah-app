# SPEC-SIRA-RDV129
# RDV 129 — L'année qui sépare : Dūmat al-Jandal
# Remplacement complet — enrichissement

## Fichier cible
`data/sira/sira.json` — entrée RDV 129

---

## Remplacement complet du champ `texte`

**REMPLACER le texte existant par :**

```
Mille hommes.

Ce chiffre seul dit quelque chose. Un an et demi plus tôt, ils étaient sortis à Dhāt ar-Riqāʿ avec quatre cents pieds saignants et six hommes pour un chameau. Là, ils étaient mille. L'islam grandissait même dans ses blessures.

Le Messager d'Allah ﷺ les fit partir au mois de Rabīʿ al-Awwal de l'an 5. Direction : Dūmat al-Jandal. Quinze nuits de marche vers le nord. Quinze nuits — ce qui signifie des semaines de route dans le désert, de nuit.

Car le Prophète ﷺ avait donné un ordre inhabituel : marcher la nuit, se cacher le jour. Les mille hommes avançaient dans l'obscurité, s'arrêtaient à l'aube, disparaissaient dans les replis du terrain jusqu'au soir, puis repartaient. Un mouvement invisible, silencieux, qui traversait l'Arabie sans bruit.

Pourquoi si loin ? Pourquoi si prudemment ?

Dūmat al-Jandal n'était pas n'importe quel endroit. C'était une oasis fortifiée à cinq nuits de Damas — la grande cité syrienne, cœur du monde commercial de l'époque. C'était un carrefour de routes caravanières, un point de passage entre l'Arabie et la Syrie byzantine. Les tribus qui s'y étaient établies rançonnaient les caravanes, y compris celles qui passaient par Médine. Et des rapports signalaient qu'elles préparaient une descente vers le sud.

Mais il y avait une raison plus profonde, que personne ne formulait à voix haute.

En atteignant Dūmat al-Jandal, les musulmans touchaient la frontière du monde byzantin. Les Ghassanides — tribus chrétiennes arabes alliées de l'Empire — tenaient ces confins. Et au-delà des Ghassanides, Constantinople regardait. Avancer jusqu'ici, c'était envoyer un signal que les diplomates n'auraient pas su formuler : nous existons. Nous bougeons. Nos pieds atteignent vos marges.

C'était la première fois que l'islam regardait un empire en face.

Le Prophète ﷺ marchait la nuit, se cachait le jour. Quand il arriva aux environs de Dūmat al-Jandal, l'effet de surprise était total. Les tribus, qui n'avaient rien vu venir, s'enfuirent dans toutes les directions à la nouvelle que mille hommes venaient d'apparaître du désert. Pas un seul combat. Pas un mort. Les musulmans ramassèrent des troupeaux abandonnés dans la fuite, signèrent des pactes avec les chefs qui restèrent, et plantèrent leur présence dans ce carrefour du monde.

Puis ils rentrèrent. Trente nuits de marche aller-retour. Pour ne rencontrer aucun ennemi.

Et pourtant la rumeur monta. De caravane en caravane, de poste frontière en poste frontière, jusqu'aux oreilles des commandants ghassanides, jusqu'aux rapports qui remontaient vers Damas et Constantinople :

Mohammed est arrivé jusqu'ici. Mohammed peut arriver partout.

Cinq ans plus tard, les empereurs byzantins mobiliseraient leurs armées en force pour anticiper. Ce serait Tabūk — la grande expédition vers le nord. Mais c'est ici, à Dūmat al-Jandal, que l'aiguille avait commencé à bouger.
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
Lis SPEC-SIRA-RDV129.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv129 enrichissement Dumat al-Jandal frontiere byzantine" && git push
```
