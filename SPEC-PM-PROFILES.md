# SPEC-PM-PROFILES — Nouveaux profils Prier mieux

## Objectif
Ajouter 3 nouveaux profils à `_PM_PROFILES` dans script.js (profils 5, 6, 7). Aucune modification des profils 0–4 existants.

---

## Ajout dans _PM_PROFILES (après le profil 4)

```javascript
{
  sym: "Je prie, mais j'ai l'impression que mes prières ne montent pas — mon cœur est trop lourd.",
  reflect: "Ibn al-Qayyim l'a écrit : les péchés accumulent une rouille sur le cœur. Non pour te condamner — mais parce que la lumière peine à traverser un verre opaque.",
  boost: "Ce poids que tu ressens, c'est ton cœur qui sait encore faire la différence entre la lumière et l'ombre — et c'est déjà une grâce. Ibn al-Qayyim dit que la prière elle-même est le polish qui enlève cette rouille, non la récompense d'un cœur déjà propre. Tu ne pries pas parce que tu es prêt — tu pries pour le devenir. Chaque sajda est une main tendue vers le haut, pas une déclaration de mérite. Viens alourdi. C'est pour ça qu'Il a ouvert la porte."
},
{
  sym: "Ma tête est pleine de mes problèmes, mes projets, mon argent — la prière semble loin de tout ça.",
  reflect: "Al-Ghazâlî le diagnostique avec précision : quand le cœur est plein du monde, la prière ne trouve plus de place. Ce n'est pas un échec de volonté — c'est un cœur qui a été nourri d'autre chose.",
  boost: "Le monde a rempli ton cœur parce qu'il se présente à chaque instant — les notifications, les dettes, les ambitions. Allah, Lui, attend qu'on vienne Le chercher. Al-Ghazâlî dit : \"La valeur de ta prière auprès d'Allah est égale à sa valeur dans ton cœur.\" Alors ne cherche pas à vider ta tête de force — retourne-toi simplement vers Celui qui possède tout ce qui t'inquiète. Ce que tu portes comme fardeau, Il en est le propriétaire. Murmure-Lui tes soucis avant le takbîr. Puis dis : Allâhu Akbar — Allah est plus grand. Plus grand que tout ça."
},
{
  sym: "Je vis comme si j'avais tout le temps — la prière peut attendre, je la rattrapperai.",
  reflect: "Ibn al-Qayyim identifie l'oubli de la mort comme la racine de la nonchalance en prière. Pas par morbidité — mais parce que se souvenir de sa finitude remet chaque prière à sa vraie place : peut-être la dernière.",
  boost: "Quelque part dans sa vie, chaque homme a prié une dernière fois sans le savoir. Ibn al-Qayyim dit : rappelle-toi la mort avant de prier, et tu prieras comme celui qui n'a plus de demain à perdre. Ce n'est pas une menace — c'est une libération. Le travail peut attendre. Le message peut attendre. Mais cette prière, cette minute, ce souffle — ils ne se représenteront pas. Lève-toi non par peur, mais parce que tu sais : ce rendez-vous-là est le seul qui compte vraiment."
}
```

---

## Règles
- Conserver les profils 0–4 intacts
- Aucune modification du flow renderPM()
- Aucune nouvelle dépendance
- npm run build après modifications

## Trigger Claude Code

```
Lis SPEC-PM-PROFILES.md et applique-le
```
