# SPEC-SIRA-RDV24-KHABBAB-MUDDATHTHIR

## Cible
`data/sira.min.json` — RDV `num` 24 (« La machine Quraychite »), paragraphes [12] et [17].

---

## Correction 1 — [17] torture de Khabbâb (détails inexacts)

Version actuelle : fer rouge « sur le dos », graisse « aux tempes ». Faux.
Sources (Umar voyant le dos de Khabbâb — Hilya d'Abû Nuʿaym ; sîra standard) :
- braises/feu sur le **DOS** → la graisse de son **dos** fondait et éteignait le feu ;
- le fer rougi, c'est sa **maîtresse (Umm Anmâr)** qui le lui pressait sur la **TÊTE**.

CHERCHER :
```
Khabbâb ibn al-Aratt, le forgeron, à qui on appliquait des morceaux de fer chauffés au rouge sur le dos. Ses cheveux brûlaient. La graisse coulait de ses tempes.
```

REMPLACER PAR :
```
Khabbâb ibn al-Aratt, le forgeron, traîné sur des braises ardentes : la graisse de son dos fondait et éteignait le feu. Et sa maîtresse lui pressait un fer rougi sur la tête.
```

---

## Correction 2 — [12] plage de versets al-Muddaththir

Le texte cité va jusqu'à « Puis qu'il périsse, comme il a décidé ! » = verset **20**.
La citation indique « 74:11-19 ». Corriger la borne.

CHERCHER :
```
— Sourate Al-Muddaththir (74:11-19)
```

REMPLACER PAR :
```
— Sourate Al-Muddaththir (74:11-20)
```

---

## Ne PAS toucher
- Le reste du RDV 24 (mots d'al-Walîd [8], Sumayya [20], Dâr al-Arqam [24], « trentaine » [25] : audités, conformes).
- Le `num` et l'ordre des RDV.

## Build obligatoire avant commit
```
npm run build
git add -A && git commit -m "sira: RDV24 Khabbab (graisse du dos/fer sur la tete) + Muddaththir 74:11-20"
git push
```
