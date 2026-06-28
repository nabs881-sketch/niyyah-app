# SPEC-DHUHR-CARREFOUR-NEW

## Objectif
Ajouter un nouveau récit dans waqt_dhuhr.json, catégorie "carrefour".

---

## Récit à injecter

**Titre :** L'atelier et le patron
**ID :** DHUHR-CARREFOUR-NEW (attribuer le prochain ID disponible dans la catégorie)
**Catégorie :** carrefour
**Source :** Création littéraire originale pour Niyyah, illustrant un principe théologique classique sur les conditions d'entrée au Paradis. La réponse par analogie s'inscrit dans la tradition de la da'wa par le raisonnement (Coran 16:125).

**Texte :**

Un homme s'approcha d'un imam après la prière du Dhuhr. Il avait l'air sincèrement troublé.

« Imam, j'ai un collègue de travail. Non-musulman. Il ne prie pas, ne jeûne pas, ne connaît pas Allah — ou en tout cas ne L'a pas reconnu. Mais cet homme... c'est le meilleur de nous tous. Il aide ses collègues sans qu'on lui demande. Il est juste, honnête, généreux. Il est là pour tout le monde. Comment est-ce possible qu'un homme pareil n'aille pas au Paradis ? »

L'imam resta silencieux un moment. Puis il dit :

« Dis-moi. Dans ton entreprise, imaginons qu'il y a un atelier. Et dans cet atelier, il y a un homme que tout le monde adore. Il est sympa, il rend service, il aide chacun avec le sourire, il écoute, il est là. Tous les collègues l'aiment. »

« Oui, je vois. »

« Mais cet homme ne fait pas le travail pour lequel il a été embauché. Il aide, il bavarde, il soutient — mais les tâches qui lui ont été assignées, il ne les accomplit pas. Ce n'est pas par mauvaise volonté, mais il ne les fait pas. »

L'homme hocha la tête lentement.

« Que va faire le patron à la fin du mois ? »

Un silence.

« Il ne peut pas le garder. Même si tout le monde l'aime. Même si personne ne veut le voir partir. Parce que le patron l'a embauché pour une mission précise — pas pour être aimé. »

L'imam baissa la voix.

« Nous avons été créés pour une mission précise. Reconnaître Allah et L'adorer. Ce n'est pas une règle arbitraire — c'est la raison d'être de notre présence ici. Ton collègue fait du bien, et ce bien ne sera pas perdu : Allah est juste et ne laisse rien sans récompense. Mais le Paradis, c'est la demeure de ceux qui ont accompli la mission pour laquelle ils ont été envoyés. Pas seulement d'avoir été gentils en chemin. »

L'homme resta silencieux un long moment.

Puis il dit : « Et si mon collègue n'a jamais vraiment entendu parler d'Allah ? »

L'imam sourit doucement.

« Alors le patron sait ce qu'il fait. Et il jugera avec une connaissance que ni toi ni moi ne possédons. Ce qui nous incombe à nous, c'est de lui transmettre le message — avec la même gentillesse qu'il met à aider les autres. »

**Morale :** La bonté sans la mission n'est pas la mission accomplie. Elle est réelle, elle compte, elle sera pesée — mais elle ne remplace pas ce pour quoi nous avons été créés. Cet après-midi, si tu connais quelqu'un de bien qui ne connaît pas Allah : ce n'est pas une raison de désespérer de lui. C'est une raison de lui parler — avec le même cœur qu'il met à aider les autres.

---

## Instructions d'injection

1. Ouvrir `waqt_dhuhr.json`
2. Localiser le tableau de la catégorie `carrefour`
3. Ajouter l'entrée en fin de tableau avec le format exact des autres entrées de la catégorie
4. Attribuer le prochain `id` disponible dans la séquence

---

## Commit

```
npm run build && git add -A && git commit -m "feat: dhuhr carrefour — nouveau récit L'atelier et le patron" && git rm SPEC-DHUHR-CARREFOUR-NEW.md && git add -A && git commit -m "chore: remove SPEC-DHUHR-CARREFOUR-NEW"
```

---

## Prompt Claude Code

```
Lis SPEC-DHUHR-CARREFOUR-NEW.md et applique-le
```
