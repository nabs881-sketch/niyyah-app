# SPEC — Sîra RDV 207 : correction passage Ghadîr Khumm

## Problème
Un paragraphe présente le hadîth al-Ghadîr sous l'angle chiite/sunnite.
Niyyah est une application sunnite — ce cadrage est à supprimer.

## Paragraphe à remplacer
Texte actuel (type: text) :
"Cette parole — Ḥadīth al-Ghadīr — deviendrait plus tard l'un des hadiths centraux des chiites. Pour eux, c'était la désignation de ʿAlī comme successeur. Pour les sunnites, c'était un rappel d'aimer ʿAlī, sans plus. Les deux lectures ont divisé la communauté. Mais sur le fait que ces paroles ont été dites, à Ghadīr Khumm, ce jour-là — tout le monde s'accorde."

## Remplacer par
"Cette parole — Ḥadīth al-Ghadīr — est authentique. Elle exprime l'amour profond du Prophète ﷺ pour ʿAlī, et son commandement aux compagnons de l'honorer et de l'aimer. Les savants sunnites l'ont toujours comprise comme un rappel d'affection et de loyauté envers ʿAlī ibn Abī Ṭālib — non comme une désignation politique."

## Action
Dans le JSON source, localiser le RDV num 207.
Remplacer uniquement ce paragraphe (type: text). Ne pas toucher aux autres paragraphes.

## Commit
```
npm run build
git rm SPEC-SIRA-RDV207.md
git add -A
git commit -m "fix(sira): RDV 207 — reformule Ghadîr Khumm, lecture sunnite uniquement"
```
