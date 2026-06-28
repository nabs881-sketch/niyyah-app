# SPEC-DHUHR-CARREFOUR-PECHEUR

## Objectif
Ajouter 1 nouveau récit dans waqt_dhuhr.json, catégorie "carrefour".
Adapté de la parabole du pêcheur mexicain et du banquier américain.

---

## Récit — Le pêcheur et le banquier

**Titre :** Le pêcheur et le banquier
**Source :** Adaptation de la parabole du pêcheur mexicain — création littéraire pour Niyyah
**Catégorie :** carrefour

**Texte :**

Un banquier américain croisait sur un port mexicain un pêcheur qui remontait sa barque.

Dans le filet : quelques poissons. Pas beaucoup. Assez.

— C'est tout ? dit le banquier.

— C'est assez, dit le pêcheur.

Le banquier fut troublé. Il s'assit à côté de lui.

— Écoute. Si tu sortais deux fois par jour, tu aurais deux fois plus de poissons. En un an, tu pourrais t'acheter un deuxième bateau. En cinq ans, une flotte. Tu vendrais aux supermarchés, tu ouvrirais des bureaux, tu deviendrais riche.

Le pêcheur réfléchit un moment.

— Et après ?

— Après ? Tu pourrais enfin te reposer. Te lever tard. Pêcher un peu pour le plaisir. Profiter de ta famille. Passer du temps au soleil.

Le pêcheur regarda le banquier calmement.

— C'est exactement ce que je fais ce matin.

Il y a dans le Coran une question qui revient souvent, sous différentes formes : *"Quel est le but de votre course ?"* (cf. Coran 75:36, 102:1-2)

Nous courons. Nous accumulons. Nous remettons à plus tard ce que nous avons déjà maintenant.

Ce Dhuhr, pose-toi la question que le banquier n'a pas su poser : est-ce que je cours vers quelque chose — ou en m'éloignant de quelque chose que j'ai déjà ?

**Morale :** Parfois ce qu'on cherche à atteindre, on l'a déjà. On ne le voit plus parce qu'on court trop vite.

---

## Instructions d'injection

1. Ouvrir `waqt_dhuhr.json`
2. Localiser le tableau de la catégorie `carrefour`
3. Ajouter l'entrée en fin de tableau avec le format exact des autres entrées
4. Attribuer le prochain ID disponible dans la séquence

---

## Commit

```
npm run build && git add -A && git commit -m "feat: dhuhr carrefour — récit Le pêcheur et le banquier" && git rm SPEC-DHUHR-CARREFOUR-PECHEUR.md && git add -A && git commit -m "chore: remove SPEC-DHUHR-CARREFOUR-PECHEUR"
```

---

## Prompt Claude Code

```
Lis SPEC-DHUHR-CARREFOUR-PECHEUR.md et applique-le
```
