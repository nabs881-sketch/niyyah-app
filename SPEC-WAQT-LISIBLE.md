# SPEC-WAQT-LISIBLE — Agrandir le texte du Waqt

Fichier : script.js (fonction openWaqtModal).
But : le Waqt est trop petit à lire. On agrandit ses textes (et on aligne les
récits sur la phrase principale).

## Édits (remplacements littéraux)

1. Phrase principale du Waqt : 18px → 20px
REMPLACER :
`font-size:18px;font-style:italic;color:#e9ddc7;line-height:1.75;max-width:340px;`
PAR :
`font-size:20px;font-style:italic;color:#e9ddc7;line-height:1.8;max-width:340px;`

2. Texte des récits Waqt : 16px → 20px
REMPLACER :
`font-size:16px;font-style:italic;color:#e9ddc7;line-height:1.75;max-width:340px;margin-bottom:16px;`
PAR :
`font-size:20px;font-style:italic;color:#e9ddc7;line-height:1.8;max-width:340px;margin-bottom:16px;`

3. Morale du récit : 15px → 17px
REMPLACER :
`font-size:15px;font-weight:700;color:#e9ddc7;line-height:1.6;margin-bottom:12px;`
PAR :
`font-size:17px;font-weight:700;color:#e9ddc7;line-height:1.6;margin-bottom:12px;`

4. Texte d'ambiance : 14px → 16px
REMPLACER :
`font-size:14px;font-style:italic;color:rgba(200,168,74,0.7);line-height:1.6;max-width:300px;`
PAR :
`font-size:16px;font-style:italic;color:rgba(200,168,74,0.7);line-height:1.6;max-width:300px;`

## Résultat
Phrase principale et récits du Waqt à 20px (lecture confortable), ambiance à 16px.
Texte solide #e9ddc7 (bon contraste). Rien d'autre touché.

## Contraintes
- `npm run build` AVANT git commit.
