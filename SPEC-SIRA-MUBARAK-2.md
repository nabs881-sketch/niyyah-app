# SPEC-SIRA-MUBARAK-2

## Objectif
Retirer les 22 mentions « Mubarakpuri » restantes dans la prose factuelle de la Sîra (hors 4 RDV « portrait » traités à part). On retire l'attribution, on garde le fait (déjà sourcé en primaire dans le champ `source`). Aucun contenu ajouté.

Cible : **data/sira.min.json**. Pour chaque ligne, remplacer la chaîne EXACTE par la nouvelle. Chaque chaîne contient « Mubarakpuri » → unique dans le fichier.

---

1. REMPLACER `Mubarakpuri rapporte que le Messager ﷺ pleurait quand même.` PAR `le Messager ﷺ pleurait quand même.`

2. REMPLACER `Mubarakpuri rapporte la scène en deux phrases. ` PAR `` (supprimer)

3. REMPLACER `Mubarakpuri répond en une phrase : pour que les Arabes voient.` PAR `La réponse tient en une phrase : pour que les Arabes voient.`

4. REMPLACER `Mubarakpuri rapporte qu'on le fuyait comme on fuit des feuilles devant l'ouragan.` PAR `On le fuyait comme on fuit des feuilles devant l'ouragan.`

5. REMPLACER `On le raconte parce que Mubarakpuri l'a raconté. Parce que Bukhārī l'a transmis.` PAR `On le raconte parce que Bukhārī l'a transmis.`

6. REMPLACER `Mubarakpuri rapporte qu'il s'arrêta devant le corps de Muṣʿab` PAR `Il s'arrêta devant le corps de Muṣʿab`

7. REMPLACER `C'est la formule de Mubarakpuri — qui reprend l'expression du Coran. ` PAR `Cette formule reprend l'expression du Coran. `

8. REMPLACER `Mubarakpuri rapporte qu'on trouva chez eux mille cinq cents épées` PAR `On trouva chez eux mille cinq cents épées`

9. REMPLACER `C'est ainsi que Mubarakpuri, Bukhārī et Muslim le rapportent.` PAR `C'est ainsi que Bukhārī et Muslim le rapportent.`

10. REMPLACER `Mubarakpuri et Ibn Hishām divergent.` PAR `Les sources divergent.`

11. REMPLACER `Mubarakpuri écrit que les conséquences du pacte de Ḥudaybiya furent immenses, dans les deux années qui suivirent :` PAR `Les conséquences du pacte de Ḥudaybiya furent immenses, dans les deux années qui suivirent :`

12. REMPLACER `Mubarakpuri rapporte qu'ʿUmar lui-même dit` PAR `ʿUmar lui-même dit`

13. REMPLACER `Mubarakpuri rapporte que le Messager d'Allah ﷺ ressentit toute sa vie l'effet de ce poison.` PAR `Le Messager d'Allah ﷺ ressentit toute sa vie l'effet de ce poison.`

14. REMPLACER `Mubarakpuri en cite quelques-unes : ` PAR `En voici quelques-unes : `

15. REMPLACER `Il hésita un instant — c'est ce que raconte Mubarakpuri. Il sentit la peur.` PAR `Il hésita un instant. Il sentit la peur.`

16. REMPLACER `Trois cent soixante, selon Mubarakpuri.` PAR `Trois cent soixante.`

17. REMPLACER `Mubarakpuri rapporte les chiffres : ` PAR `On rapporte : `

18. REMPLACER `Mubarakpuri rapporte ces signes.` PAR `Les sources rapportent ces signes.`

19. REMPLACER `Mubarakpuri les énumère.` PAR `Les voici.`

20. REMPLACER `Treize ou quatorze jours, écrit Mubarakpuri.` PAR `Treize ou quatorze jours.`

21. REMPLACER `Trois ou quatre fois, selon Mubarakpuri.` PAR `Trois ou quatre fois.`

22. REMPLACER `— selon Mubarakpuri et plusieurs hadiths — ` PAR `— selon plusieurs hadiths — `

23. REMPLACER `Mubarakpuri ne donne pas de chiffre exact.` PAR `Les sources ne donnent pas de chiffre exact.`

---

## Vérif attendue
- `node -e "const d=require('./data/sira.min.json'); let n=0; d.rdv.forEach(r=>{if(/Mubarakpuri/.test(JSON.stringify(r))&&![228,248,249,250].includes(r.num))n++;}); console.log('factuels restants:',n)"` → doit afficher `0`.
- JSON valide : `node -e "require('./data/sira.min.json'); console.log('OK')"`.

## Build (OBLIGATOIRE)
```
npm run build
git add -A
git commit -m "sira: retire Mubarakpuri (lot 2: 22 RDV factuels) -> de-attribution, sources primaires"
```
