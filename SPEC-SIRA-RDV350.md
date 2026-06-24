# SPEC — Sîra RDV 350 : remplacement contenu doublon

## Problème
RDV 350 cite le même hadith que RDV 259 (trois amours).
RDV 363 couvre déjà le tawakkul et le hadith des oiseaux.
Nouveau thème choisi : l'ihsân.

## Nouveau thème : L'ihsân (adorer Allah comme si tu Le voyais)

### Titre
"Comme si tu Le voyais"

### Contenu à écrire
- Hadith de Jibrîl (Bukhârî/Muslim) — quand Jibrîl demande : "Qu'est-ce que l'ihsân ?"
- Réponse du Prophète ﷺ : "Adore Allah comme si tu Le voyais. Si tu ne Le vois pas — Lui te voit."
- Développement : l'ihsân comme troisième degré après l'islam et l'îmân
- Ibn al-Qayyim : l'ihsân transforme chaque acte ordinaire en adoration
- Méditation : dans ta prochaine prière, prie comme si tu Le voyais
- Source : Sahîh Bukhârî, Sahîh Muslim (hadith de Jibrîl)

### Fiabilite
"authentique"

## Action
Remplacer dans le JSON source : titre.fr, tous les paragraphes, méditation.fr, source.fr du RDV 350.
Ne pas toucher à num, id, partie, dimensions, fil_rouge.

## Commit
```
npm run build
git rm SPEC-SIRA-RDV350.md
git add -A
git commit -m "fix(sira): RDV 350 — remplace doublon par ihsân (Comme si tu Le voyais)"
```
