# SPEC-ALIMENTS-AUDIT

## Cible
`data/modules/ghidaa_module_complet.json` (module Aliments, 80 items).

## But
1. Traiter les hadiths « vertu des aliments » **faibles/fabriqués** (garder l'attribution
   coranique authentique, remplacer par un sahîh si dispo, sinon retirer/flaguer).
2. Adoucir 2 surpromesses santé.
3. Ajouter un disclaimer léger aligné sur le module Remèdes.

**Règle** : aucun arabe modifié ; chaque remplacement marqué « à confirmer par l'imam ».

---

## 1. ghidaa_002 (Le miel) — remplacer le hadith da'îf par un sahîh

`source_coran_hadith` :
- ANCIEN se termine par : `Hadith Ibn Mâja : 'Contentez-vous des deux remèdes : le miel et le Coran.'`
- REMPLACER cette phrase finale par :
  `Hadith Bukhârî 5680 : 'La guérison est dans trois choses : une gorgée de miel, la hijama, ou la cautérisation par le feu.' (à confirmer par l'imam)`

(Le « deux remèdes : miel et Coran » d'Ibn Mâja est da'îf → remplacé par le hadith sahîh du miel.)

---

## 2. ghidaa_012 (Les figues) — hadith da'îf retiré, verset conservé

`source_coran_hadith` :
- ANCIEN se termine par : `Hadith Abû Dâwûd : 'Si je devais dire qu'un fruit est descendu du Paradis, je dirais celui-ci [la figue], car les fruits du Paradis n'ont pas de noyau.'`
- REMPLACER cette phrase finale par :
  `(Le hadith populaire « la figue est un fruit du Paradis » est de chaîne faible — da'îf — et absent des recueils sahîh ; la valeur de la figue repose sur le verset. À confirmer par l'imam.)`

---

## 3. ghidaa_014 (La grenade) — hadith FABRIQUÉ retiré + bienfait adouci

`source_coran_hadith` :
- ANCIEN se termine par : `Hadith : 'Il n'y a pas une grenade qui n'a pas été fécondée par une goutte de l'eau du Paradis.'`
- REMPLACER cette phrase finale par :
  `(Le hadith « chaque grenade contient une graine du Paradis » est FABRIQUÉ — mawdû' (cf. Ibn al-Jawzî, IslamQA) — il a été retiré. La grenade reste authentiquement citée au Coran. À confirmer par l'imam.)`

`bienfaits` :
- ANCIEN : `Anti-inflammatoire. Améliore la circulation sanguine. Riche en antioxydants. Protège contre Alzheimer.`
- NOUVEAU : `Anti-inflammatoire. Améliore la circulation sanguine. Riche en antioxydants. Des études explorent un possible effet neuroprotecteur.`

---

## 4. ghidaa_003 (L'huile d'olive) — flaguer le hadith contesté

`source_coran_hadith` :
- ANCIEN se termine par : `Hadith Tirmidhî : 'Mangez de l'olive et oignez-vous-en, car elle provient d'un arbre béni.'`
- REMPLACER cette phrase finale par :
  `Hadith Tirmidhî 1851 : 'Mangez de l'olive et oignez-vous-en, car elle provient d'un arbre béni.' (gradé hasan li-ghayrihi par certains, da'îf par d'autres — à confirmer par l'imam)`

---

## 5. ghidaa_004 (La nigelle) — adoucir la surpromesse

`bienfaits` :
- ANCIEN : `Immunostimulant prouvé scientifiquement. Anti-inflammatoire. Régule la glycémie. Bénéfique pour le système respiratoire.`
- NOUVEAU : `Immunostimulant (suggéré par des études). Anti-inflammatoire. Peut aider à réguler la glycémie. Bénéfique pour le système respiratoire.`

(Le hadith Bukhârî 5687 reste inchangé — il est authentique.)

---

## 6. Ajouter un disclaimer au module (niveau racine)

Ajouter ces deux champs au niveau racine de l'objet JSON (à côté de `concept`) :

```json
"avertissement_important": "Ce module est INFORMATIF. Les bienfaits cités sont issus d'usages traditionnels et d'études, parfois suggérés plutôt que prouvés. Il ne remplace pas un avis médical. Les statuts fiqh (halal/harâm/divergences) sont à confirmer auprès d'un imam de votre école.",
"disclaimer": {
  "overlay_premiere_ouverture": {
    "titre": "À propos",
    "texte": "Ce module présente les aliments de la sunna et leurs bienfaits. Les vertus santé peuvent être suggérées plutôt que prouvées ; ce n'est pas un avis médical. En cas de maladie, consultez un médecin. Les statuts juridiques (halal/harâm/divergences d'écoles) relèvent de votre imam. La guérison appartient à Allâh ; les aliments sont des causes (asbâb).",
    "bouton": "J'ai compris"
  }
}
```

(Si le code de l'app n'affiche pas encore ce disclaimer pour le module Aliments, c'est un petit ajout d'affichage à faire ensuite — me le signaler. La donnée, elle, est en place et cohérente avec le module Remèdes.)

---

## Vérif attendue
```
node -e "const d=require('./data/modules/ghidaa_module_complet.json'); const g=id=>d.items.find(x=>x.id===id); console.log('grenade fabrique retire:', !/graine du Paradis|goutte de l.eau du Paradis/.test(g('ghidaa_014').source_coran_hadith)); console.log('miel sahih:', /Bukh.{0,2}r. 5680/.test(g('ghidaa_002').source_coran_hadith)); console.log('nigelle adouci:', !/prouv. scientifiquement/.test(g('ghidaa_004').bienfaits)); console.log('disclaimer:', !!d.disclaimer);"
```
Attendu : 4× `true`.

## Build (OBLIGATOIRE — JSON chargé/caché par le SW)
```
npm run build
git add -A
git commit -m "aliments: retire hadiths daif/fabrique (grenade, figue, miel), adoucit surpromesses, ajoute disclaimer"
git push
```
