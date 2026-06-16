# SPEC-SIRA-RDV30-DOUCEUR

## Cible
`data/sira.min.json` — RDV `num` 30 (« La douceur »), paragraphes [1], [15], [28],
et SUPPRESSION de [32] et [33].

⚠️ Modifs limitées à l'objet `num` 30. Supprimer un paragraphe = retirer l'objet entier
du tableau `paragraphes` (le tableau rétrécit ; aucun impact sur `num`).

---

## Correction 1 — [15] nombre de fils (deux, pas trois)

Khadîja a donné au Prophète ﷺ **6 enfants = 2 fils (Qâsim + ʿAbdullâh) + 4 filles**.
Le 3ᵉ fils (Ibrâhîm) était de Maria la Copte, bien plus tard à Médine. « Trois fils »
contredit les 6 enfants + 4 filles (et le RDV 13).

CHERCHER :
```
Khadîja qui lui avait donné six enfants — dont trois fils enterrés en bas âge.
```
REMPLACER PAR :
```
Khadîja qui lui avait donné six enfants — dont deux fils enterrés en bas âge.
```

---

## Correction 2 — [1] délai après le boycott

Abû Tâlib mourut plusieurs mois après la levée du boycott, pas « trente jours ».

CHERCHER :
```
Trente jours après la fin du boycott — peut-être moins — Abû Tâlib tomba malade.
```
REMPLACER PAR :
```
Quelques mois après la fin du boycott, Abû Tâlib tomba malade.
```

---

## Correction 3 — SUPPRIMER [32] (récit fabriqué)

L'histoire du voisin qui jette des ordures puis se convertit est une **fabrication
sans aucune chaîne** (déclarée mawḍûʿ par les muḥaddithûn ; introuvable dans les
recueils de hadith). À retirer entièrement.

SUPPRIMER le paragraphe dont `content.fr` est exactement :
```
— Quand un voisin — connu pour cela — déposait chaque matin des ordures devant sa porte, et qu'un jour ces ordures cessèrent, le Prophète ﷺ alla prendre des nouvelles du voisin. Il était malade. Le Prophète ﷺ entra chez lui pour s'enquérir de sa santé. L'homme — bouleversé — embrassa l'islam ce jour-là.
```

---

## Correction 4 — SUPPRIMER [33] (mal placé + inexact)

L'agression de Zaynab (par Habbâr ibn al-Aswad → chute → fausse couche) est un
événement **post-Hijra** (émigration vers Médine), pas l'Année de Tristesse ; et le
Prophète ﷺ **autorisa la riposte** contre Habbâr — donc « il ne se vengea pas » est faux.
À retirer de cette liste.

SUPPRIMER le paragraphe dont `content.fr` est exactement :
```
— Quand sa propre fille Zaynab fut bousculée par un Quraychite alors qu'elle voyageait, et tomba de sa monture, perdant l'enfant qu'elle portait — il ne se vengea pas. Il pria pour elle, et continua.
```

---

## Correction 5 — [28] attribution (ne plus couvrir les items supprimés)

La liste ne doit plus être présentée comme « recoupée par Bukhari, Muslim, Tirmidhî,
Aḥmad » (formule qui couvrait à tort le récit fabriqué).

CHERCHER :
```
Voici ce qu'il faisait. Et c'est une description multi-sourcée, recoupée par Bukhari, Muslim, Tirmidhî, Aḥmad :
```
REMPLACER PAR :
```
Voici ce qu'il faisait — un comportement constant, conforme à ce que les sources rapportent de sa patience :
```

---

## Ne PAS toucher
- Le reste du RDV 30 (mort d'Abû Tâlib + Bukhârî [8], at-Tawba 9:113 [10], mort de
  Khadîja, jalousie d'Aïcha [20], ʿÂm al-Ḥuzn, « son caractère était le Coran » [35] :
  conformes). La FIABILITÉ reste « authentique » après ces corrections.
- `num` et ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: RDV30 deux fils + delai Abu Talib + retire recit ordures (fabrique) et Zaynab (post-Hijra)"
git push
```
