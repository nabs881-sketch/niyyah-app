# SPEC-WIRD-COUNTERS — Compteurs dhikr dans le Wird

## Objectif
Brancher type:'counter' sur les items du Wird qui ont un nombre défini de répétitions.

## Modifications script.js

### w_tasbih_100 et w_tasbih_100_s (matin + soir)
Ajouter :
```js
type: 'counter',
target: 100,
translation: 'Celui qui dit SubhanAllah wa bi-hamdihi 100 fois le matin et le soir verra ses péchés effacés même s\'ils sont comme l\'écume de la mer.',
```

### w_tahlil_100 et w_tahlil_100_s (matin + soir)
Ajouter :
```js
type: 'counter',
target: 100,
translation: 'Il n\'y a de dieu qu\'Allah Seul, sans associé. À Lui la souveraineté et la louange, et Il est Puissant sur toute chose.',
```

### w_istighfar_m (matin)
Ajouter :
```js
type: 'counter',
target: 3,
translation: 'Astaghfirullah wa atubu ilayh — Je demande pardon à Allah et je me repens à Lui.',
```

### w_salawat_m et w_salawat_s (matin + soir)
Ajouter :
```js
type: 'counter',
target: 10,
translation: 'Celui qui invoque la bénédiction sur moi une fois, Allah lui accorde dix bénédictions.',
source: 'Muslim 408 · Sahih',
```

---

## Trigger

```
Lis SPEC-WIRD-COUNTERS.md et applique-le intégralement.
npm run build && git add -A && git commit -m "wird - counters tasbih tahlil istighfar salawat branches"
```
