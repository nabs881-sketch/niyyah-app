# SPEC — SIRA RDV 031 : correction contenu

## Problème
RDV 031 titre = "L'année de la tristesse" mais contenu = Waraka ibn Nawfal (erreur).
RDV 030 couvre mort d'Abû Tâlib. RDV 031 doit couvrir **mort de Khadîja RA**.

## Action
Remplace paragraphes + méditation + source du RDV 031 par contenu sur Khadîja RA :
- Décès quelques semaines après Abû Tâlib (~10e année de prophétie)
- 25 ans de mariage, première croyante, soutien absolu
- Douleur du Prophète ﷺ — fidélité toute sa vie
- Sources : Sahih Bukhârî, Ibn Hishâm

## Commit
```
npm run build
git rm SPEC-SIRA-RDV031.md
git add -A
git commit -m "fix(sira): RDV 031 — contenu Khadîja RA, corrige erreur Waraka"
```
