# SPEC-SIRA-RDV121
# RDV 121 — Banū an-Naḍīr : Le prix du sang
# Enrichissement + correction historique

## Fichier cible
`data/sira/sira.json` — entrée RDV 121

---

## Corrections

### 1. Compagnons nommés (atténuer la certitude)

**REMPLACER :**
```
Avec lui Abū Bakr, ʿUmar, ʿAlī et un petit groupe.
```
**PAR :**
```
Avec lui un groupe de Compagnons — parmi eux Abū Bakr, ʿUmar et ʿAlī, selon les sources de sîra.
```

---

### 2. Enrichissement — ajouter après "Une trahison concertée."

**APRÈS :**
```
Une trahison concertée. Sourate al-Ḥashr (59) décrira plus tard cet épisode et les conséquences qui en découleront.
```

**AJOUTER :**
```
Mais Jibrîl descendit.

Il informa le Prophète ﷺ de ce qui se tramait derrière le mur — la meule prête sur le toit, l'homme qui attendait le signal.

Le Prophète ﷺ se leva. Sans un mot. Sans accusation. Sans éclat. Il se leva comme on se lève à la fin d'une visite, et il s'en alla vers Médine.

Abū Bakr, ʿUmar et les Compagnons restèrent assis un moment, attendant son retour. Il ne revint pas. Ils finirent par se lever à leur tour et repartirent.

Ils le trouvèrent à Médine. Il leur expliqua ce qui s'était passé.

Puis il envoya un messager aux Banū an-Naḍīr : « Quittez Médine. Le pacte est rompu. Vous avez dix jours pour partir. Quiconque sera trouvé après ce délai sera tué. »

Ce qui avait commencé comme une visite diplomatique de routine venait de basculer. Sourate al-Ḥashr (59) décrira les conséquences de cet épisode — le siège, l'expulsion, et ce que cachait le cœur de ceux qui souriaient en disant : « Attends ici, près de ce mur. »
```

---

## Aucune modification pour :
- La méditation — validée telle quelle
- La source Ibn Hishâm — correcte

## Build
```
Lis SPEC-SIRA-RDV121.md et applique-le exactement.
npm run build && git add -A && git commit -m "feat: sira rdv121 enrichissement Banu an-Nadir complot meule" && git push
```
