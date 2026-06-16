# SPEC-SAVAIS-TU-3

## Cible
`savais_tu.json` (racine) → fiches **244** (Civilisation), **214** (Histoire), **158** (Sîra).
ℹ️ Pas dans le précache SW → **pas de build, commit direct.**

---

## A. Fiche 244 — fausse étymologie
« *endosser* vient de l'arabe *al-zahr* » est **faux** (vérifié) : *endosser* vient du latin **in + dorsum**.
On remplace par une vraie étymologie arabe (« chèque ← sakk » existe déjà en fiche 207, donc on prend
**magasin ← makhzan**).

- `source` : `Trésor de la langue française / Britannica banking terms`
  → `Étymologie « magasin » ← arabe « makhzan » (مخزن, entrepôt)`
- `texte` → remplacer tout par :
```
Le mot « magasin » vient de l'arabe « makhzan » (مخزن) – un entrepôt, un lieu où l'on stocke les marchandises. Les marchands arabes y gardaient grains, tissus et épices. Le mot a voyagé par l'italien « magazzino » jusqu'au français. Et « magazine » (la revue) vient du même mot : un magazine, c'est un « entrepôt » d'articles et d'images.
```

---

## B. Fiche 214 — erreur de siècle + nationalité
Ya'qûb ibn Killis était vizir **fatimide du 10ᵉ siècle** (mort en 991), né à **Bagdad** — pas un
« commerçant tunisien du 12ᵉ siècle ».

- `texte` → remplacer tout par :
```
Au 10ᵉ siècle, Ya'qûb ibn Killis devient vizir de l'Égypte fatimide. Né à Bagdad, il institue un système de douanes et de finances qui fait revivre tout le commerce méditerranéen. Vénitiens, Pisans et Génois viennent traiter avec l'Égypte. Une partie de l'essor commercial qui nourrira plus tard la Renaissance italienne passe par cet homme oublié.
```

---

## C. Fiche 158 — histoire fabriquée (voisin juif aux ordures)
Cette histoire est **fabriquée**, sans chaîne, absente de la sîra de Ibn Hisham (vérifié : déjà corrigée
dans le module Bab an-Nafs). On remplace par un épisode **authentique** de mansuétude (al-Bukhârî 3149).

- `source` : `Sirat Ibn Hisham / récit rapporté dans plusieurs sources classiques`
  → `Sahih al-Bukhârî n° 3149. Remplace l'histoire répandue du « voisin juif aux ordures », fabriquée et sans chaîne.`
- `texte` → remplacer tout par :
```
Un bédouin rattrapa un jour le Prophète ﷺ et tira si fort sur son manteau de grosse laine que le bord laissa une marque rouge sur son cou. Puis il lança : « Muhammad ! Donne-moi des biens d'Allah que tu détiens ! » Le Prophète ﷺ se retourna — et sourit. Puis il ordonna qu'on donne à l'homme ce qu'il demandait. Pas de colère, pas de représailles. Un sourire, et un don.
```

## Commit
```
git add savais_tu.json && git commit -m "savais-tu: corrige 244 (etymologie), 214 (siecle Ibn Killis), 158 (histoire fabriquee -> Bukhari 3149)"
git push
```

---

## ⚠️ À ARBITRER (mythes + doublons — ton choix, pas dans ce SPEC)
- **126 / 260** (doublon) : « l'art islamique laisse toujours un défaut volontaire » = légende moderne.
- **128 / 262** (doublon) : arabe écrit de droite à gauche « à cause des tailleurs de pierre » = hypothèse (262 l'affirme comme un fait).
- **149** : « un musulman a découvert l'évolution avant Darwin » = surinterprétation répandue.
- **241** : « le sparadrap inventé par al-Zahrâwî » = attribution douteuse.
- Doublons à fusionner : 132/257, 135/258, 240/420/427, 153/248, 111/254, 112/256, 264/310, 275/361, 290/366, 137/259, 152/253, 147/251.

Dis-moi si tu veux un SPEC de nettoyage pour ces points.
