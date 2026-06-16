# SPEC-SIRA-RDV25-HAMZA

## Cible
`data/sira.min.json` — RDV `num` 25 (« Hamza, le lion »), paragraphes [2] et [28].

---

## Correction 1 — [2] parenté de lait (Thuwayba, pas Halima)

Faux : « frère de lait par l'allaitement de Halima… dans le désert des Banî Saʿd,
vingt-cinq ans plus tôt ». Sources (Ibn Saʿd, sîra standard) : Hamza fut le frère
de lait du Prophète ﷺ via **Thuwayba** (l'affranchie d'Abû Lahab), à **la Mecque**,
avant Halima. Et Hamza n'était l'aîné du Prophète ﷺ que de 2 à 4 ans (pas 25).

CHERCHER :
```
Oncle du Prophète ﷺ par le sang. Frère de lait par l'allaitement de Halima — ils avaient partagé le même sein dans le désert des Banî Saʿd, vingt-cinq ans plus tôt.
```

REMPLACER PAR :
```
Oncle du Prophète ﷺ par le sang. Et son frère de lait : tous deux avaient été allaités, tout petits, par Thuwayba — l'affranchie d'Abû Lahab — à la Mecque. Hamza n'avait que quelques années de plus que lui.
```

---

## Correction 2 — [28] Badr / Uḥud / Waḥshî / pleurs

Trois erreurs :
- « trente associateurs en un seul combat » à Badr : faux. À Badr, Hamza tue ʿUtba
  ibn Rabîʿa en duel d'ouverture. Le « plus de trente » concerne Uḥud, sur tout le combat.
- « un esclave d'une femme dont il avait tué le père » : Waḥshî était l'esclave de
  **Jubayr ibn Muṭʿim** (qui lui promit la liberté). Hind bint ʿUtba ne fit que le récompenser.
- « le seul corps qu'il ait jamais pleuré ouvertement » : faux (le Prophète ﷺ pleura
  aussi son fils Ibrâhîm, ʿUthmân ibn Mazʿûn…). La parole attestée est à la 1ʳᵉ personne.

CHERCHER :
```
Il deviendra Asad Allah — le Lion d'Allah. Il combattra à Badr. Il tuera trente associateurs en un seul combat. Et un jour, à Uḥud, une lance lui transpercera le ventre — lancée par un esclave d'une femme dont il avait tué le père. Il mourra martyr. Et le Prophète ﷺ pleurera sur son corps mutilé — le seul corps qu'il ait jamais pleuré ouvertement — en disant : « Personne, jamais, ne sera frappé d'un malheur comparable à ton départ, Hamza. »
```

REMPLACER PAR :
```
Il deviendra Asad Allah — le Lion d'Allah. À Badr, il tuera ʿUtba ibn Rabîʿa en duel d'ouverture. Et un jour, à Uḥud, il combattra avec férocité jusqu'à ce qu'une lance lui transperce le ventre — lancée par Waḥshî, un esclave abyssin à qui Jubayr ibn Muṭʿim avait promis la liberté s'il tuait Hamza, et que Hind bint ʿUtba — dont Hamza avait tué le père à Badr — récompensa de ses biens. Il mourra martyr, le corps mutilé. Et le Prophète ﷺ, accablé de douleur, dira sur lui : « Jamais je ne serai frappé d'un malheur comparable au tien. »
```

---

## Ne PAS toucher
- Le reste du RDV 25 (geste de Hamza contre Abû Jahl, kunya Abû ʿUmâra, conversion
  sincère quelques jours après : conformes).
- Le `num` et l'ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: RDV25 Hamza (frere de lait Thuwayba + Badr/Uhud/Wahshi corriges)"
git push
```
