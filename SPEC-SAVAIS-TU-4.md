# SPEC-SAVAIS-TU-4 (nettoyage : mythes + erreur + doublons)

## Cible
`savais_tu.json` (racine). ℹ️ Hors précache SW → **pas de build, commit direct.**
Repère les fiches par leur **texte de début** (pas par index — l'index bouge après chaque suppression).

---

## A. Fiche 149 — erreur de siècle + surinterprétation
Al-Jâhiz est du **9ᵉ siècle** (mort en 868), pas du 13ᵉ ; et il n'a pas formulé « la sélection naturelle ».
Remplacer tout le `texte` de la fiche qui commence par « Avant Darwin, un savant musulman du 13ᵉ siècle » par :
```
Avant Darwin, un savant musulman du 9ᵉ siècle a écrit sur la lutte pour la survie et l'adaptation des espèces. Al-Jâhiz, dans son « Livre des Animaux » (Kitâb al-Hayawân), décrit comment les animaux rivalisent pour la nourriture et survivent en s'adaptant à leur milieu. Mille ans avant L'Origine des espèces. Une intuition fulgurante — pas une théorie achevée, mais une intuition que personne ne raconte aujourd'hui.
```

## B. Fiche 126 — mythe à reformuler
« Défaut volontaire dans l'art islamique » = légende moderne (on la plaque aussi sur les tapis persans, les
quilts amish, les tissages navajos). Remplacer tout le `texte` qui commence par « Dans l'art islamique, il y a
une règle non écrite » par :
```
On entend souvent que l'art islamique laisserait toujours un défaut volontaire, « car seule la perfection appartient à Allah ». C'est en réalité une légende moderne — on la raconte aussi des tapis persans ou des quilts amish. Les grands artisans musulmans, eux, visaient l'excellence (itqân). Ce qui est vrai, c'est que cet art a sublimé le motif géométrique et la calligraphie là où d'autres cherchaient l'image.
```

## C. Supprimer 2 fiches (mythe + doublon)
Supprimer du tableau les éléments dont le `texte` commence par :
1. `Dans l'art islamique, la perfection est une insulte à Dieu` (doublon de 126, affirme le mythe)
2. `L'écriture arabe se lit de droite à gauche à cause des tailleurs de pierre` (doublon de 128 ; 128 dit prudemment « Probablement », on garde 128)

---

## D. Doublons de contenu — supprimer le 2ᵉ de chaque paire (garde le mieux sourcé)
Supprimer les éléments dont le `texte` commence par (chacun fait doublon avec une fiche plus détaillée gardée) :
- `Une jeune fille pakistanaise reçoit une balle` (doublon Malala)
- `Un homme arrive aux États-Unis sans parler un mot d'anglais` (doublon Ulukaya)
- `Le Prophète ﷺ n'a pas pu prononcer le nom de sa première femme Khadija` (doublon Khadija)
- `La Kaaba que tu vois aujourd'hui est en réalité incomplète` (doublon Kaaba)
- `Il existe une source d'eau qui jaillit en plein désert depuis quatre mille ans` (doublon Zamzam)
- `Le Prophète ﷺ ne rompait jamais son jeûne sans datte` (doublon dattes)
- `Quand Fatima az-Zahra entrait` (doublon Fatima)
- `Le Prophète ﷺ a dit : « Allah a quatre-vingt-dix-neuf noms. Quiconque les énumère` (doublon 99 noms)
- `En 2014, pour la première fois, une femme reçoit la médaille Fields` (doublon Mirzakhani)
- `Au 13ᵉ siècle, un médecin de Damas a décrit comment le sang circule` (doublon Ibn al-Nafîs)
- `Le lien entre la Lune et les marées n'est pas une découverte de Newton` (doublon marées)
- `La pharmacie a émergé comme science distincte` ET `La pharmacie indépendante de la médecine a été créée à Bagdad` (triplet pharmacie → on garde la fiche 240 « Le concept de pharmacie séparée du cabinet médical »)

> Total : 13 suppressions de doublons → le corpus passe de 480 à ~465 fiches uniques. Si tu préfères
> **garder 480** et différencier ces fiches plutôt que les supprimer, dis-le et je réécris chaque doublon
> en un fait nouveau distinct.

## À VÉRIFIER (pas corrigé ici, incertain)
- Fiche **241** : « le sparadrap inventé par al-Zahrâwî » — attribution répandue mais douteuse. À confirmer avant de garder tel quel.

## Commit
```
git add savais_tu.json && git commit -m "savais-tu nettoyage: 149 (al-Jahiz 9e s.), 126 (mythe art reformule), -260/-262 + doublons"
git push
```
