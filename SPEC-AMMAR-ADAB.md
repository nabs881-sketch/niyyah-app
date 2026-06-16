# SPEC-AMMAR-ADAB

## Cible
`compagnons.json` — épisode **Ammar ibn Yasir n°2** ("La bande rebelle"), champ `recit`.

## But
Adoucir la sentence du narrateur sur Mu'âwiya (lecture trop tranchée / risque sectaire),
tout en gardant le hadith sahîh, le martyre et le statut d'Ammar intacts.

## Remplacement (un seul, dans le champ `recit`)

ANCIEN :
```
Dans l'armée d'Ali, dit la tradition, les soldats acclamèrent — non pas la mort d'Ammar elle-même, mais ce qu'elle signifiait. La vérité venait d'éclater. La prophétie était accomplie. L'armée de Mu'awiya était officiellement, théologiquement, la bande rebelle. Et Allah avait, par cette mort, désigné qui était dans le tort.
```

NOUVEAU :
```
Dans l'armée d'Ali, dit la tradition, les soldats acclamèrent — non pas la mort d'Ammar elle-même, mais ce qu'elle signifiait. Pour eux, la prophétie était accomplie : le camp d'Ali était dans le vrai. Les savants sunnites le retiennent ainsi — sans condamner Mu'awiya ni ceux de son camp, tenus pour des mujtahids qui se sont trompés. L'adab, depuis, est de retenir sa langue sur ce qui survint entre les Compagnons.
```

## Vérif
```
node -e "const a=require('./compagnons.json');const it=a.find(x=>x.compagnon==='Ammar ibn Yasir'&&x.episode_num===2);console.log('ok:', /mujtahids qui se sont trompés/.test(it.recit) && !/désigné qui était dans le tort/.test(it.recit));"
```
Attendu : `ok: true`.

## Build (OBLIGATOIRE — JSON caché par le SW)
```
npm run build
git add -A
git commit -m "compagnons: adoucit passage Ammar/Muawiya (adab sur les Sahaba)"
git push
```
