# SPEC-SIRA-BETON

## Objectif
Corriger deux points de fiabilité repérés dans les RDV portrait (indépendants de Mubarakpuri).

Cible : **data/sira.min.json**. Remplacer chaque chaîne EXACTE.

---

### #1 — RDV 228 : hadith « Livre + Sunna » (retrait du mélange thaqalayn / Ghadîr Khumm)

REMPLACER :
```
À Ghadīr Khumm — quelques semaines avant sa mort —, il l'avait déjà dit.
```
PAR :
```
Lors du pèlerinage d'adieu — quelques semaines avant sa mort —, il l'avait déjà dit.
```

REMPLACER :
```
« Je vous laisse deux choses lourdes (thaqalayn). Si vous vous y accrochez, vous ne vous égarerez jamais : le Livre d'Allah, et ma Sunna. »
```
PAR :
```
« Je vous laisse deux choses ; tant que vous vous y attacherez, vous ne vous égarerez jamais : le Livre d'Allah, et ma Sunna. »
```

REMPLACER (champ source du RDV 228) :
```
Sîra classique (Ibn Hishâm / Ibn Isḥâq)
```
PAR :
```
Ḥadith « le Livre d'Allah et ma Sunna » (Muwatta Mâlik · al-Hâkim — ḥasan)
```
> Note : ce dernier remplacement vise le `source.fr` du RDV 228. Si la chaîne « Sîra classique (Ibn Hishâm / Ibn Isḥâq) » apparaît dans plusieurs RDV, ne modifier QUE celle du RDV num 228 (repérer l'objet par `num:228` puis remplacer son `source.fr`).

---

### #2 — RDV 249 : remplacer la du'â da'îf par un hadith sahih

REMPLACER :
```
Le Messager d'Allah ﷺ disait dans une duʿā célèbre : « Ô Allah, fais-moi vivre pauvre, fais-moi mourir pauvre, et ressuscite-moi parmi les pauvres ». Une demande étrange — un homme qui demande la pauvreté. Mais surtout : qui demande d'être ressuscité parmi les pauvres. Ce n'est pas la pauvreté qu'il aimait — c'était leur compagnie.
```
PAR :
```
Ce n'est pas la pauvreté qu'il chérissait — c'était la compagnie des pauvres. Il annonça d'ailleurs que les pauvres parmi les croyants entreraient au Paradis avant les riches, d'un long délai. Leur dénuement ne les abaissait pas : il les rapprochait.
```

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); const r=d.rdv.find(x=>x.num===228); console.log(/thaqalayn|Ghadīr/.test(JSON.stringify(r)))"` → `false`.
- `node -e "const d=require('./data/sira.min.json'); const r=d.rdv.find(x=>x.num===249); console.log(/vivre pauvre/.test(JSON.stringify(r)))"` → `false`.
- JSON valide.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "sira: fix thaqalayn (RDV228) + remplace dua daif par sahih (RDV249)"
```
