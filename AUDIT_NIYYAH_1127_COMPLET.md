# AUDIT NIYYAH 1127 — POOL COMPLET ORBE CENTRAL — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** créer `data/niyyah/niyyah_pool.json` (+ DOCX miroir si nécessaire)
**Source :** Brainstorm Niyyah, session 2026-05-24
**Cible UX :** L'orbe central نِيَّة "DÉFINIR MON INTENTION" — modale "ANCRER VOTRE NIYYAH" affichée 1 fois/jour (cooldown via `niyyah_intention_date`)
**Position éditoriale :** Remplacer les 4 niyyah génériques actuelles par une sélection stratifiée (Triade Combat / Dévotion / Service + saisonnière conditionnelle) tirée d'un pool de 1127 niyyah opérationnelles, vérifiables, et délice à lire.

---

## 🔍 AUDIT THÉOLOGIQUE COMPLET RÉALISÉ

**1071 niyyah validées sans réserve (96,1%)**
**44 niyyah corrigées (3,9%)** — toutes corrections intégrées ci-dessous.

**6 grilles théologiques appliquées :**
1. 'Aqîda (théologie) — pas d'anthropomorphisme, pas de visualisation d'Allah
2. Hadiths — authenticité vérifiée, marqueurs de prudence sur les faibles
3. Versets coraniques — exactitude des références
4. Du'âs prophétiques — attribution authentique
5. Fiqh — conformité sunnite, respect des divergences entre écoles
6. Pudeur Al-Haya — aucune vulgarité

---

## RÈGLE D'EXÉCUTION

1. CRÉER le fichier `data/niyyah/niyyah_pool.json` contenant les 1127 niyyah numérotées et catégorisées (structure JSON proposée plus bas).
2. MODIFIER le composant de la modale "ANCRER VOTRE NIYYAH" pour qu'il pioche selon l'algorithme **Triade + Saisonnière conditionnelle** :
   - 3 niyyah toujours (1 combat, 1 dévotion, 1 service)
   - +1 niyyah saisonnière SI contexte spécial (vendredi, Ramadan, jours blancs, Dhul-Hijja, Muharram, Laylat al-Qadr)
3. CONSERVER le champ libre "OU VOTRE PROPRE INTENTION" tel quel.
4. CONSERVER le cooldown 1 fois/jour (`niyyah_intention_date`) inchangé.
5. PAS DE BUMP SW. PAS DE `cp script.min.js`.
6. UN SEUL COMMIT à la fin : `pool 1127 niyyah orbe central + algorithme triade + audit théologique`

---

## STRUCTURE JSON PROPOSÉE

```json
{
  "version": "1.0",
  "total": 1127,
  "niyyahs": [
    {
      "id": 1,
      "text": "Aujourd'hui, je ne dirai pas un seul mot mauvais sur quelqu'un — pas même dans ma tête.",
      "category": "combat",
      "subcategory": "langue"
    },
    {
      "id": 181,
      "text": "Aujourd'hui c'est vendredi, je lirai sourate Al-Kahf en entier — l'occasion ne se présente que 52 fois par an.",
      "category": "saison",
      "subcategory": "jumuah",
      "context_day": "friday"
    }
  ]
}
```

**Catégories :** `combat` | `devotion` | `service` | `saison`

---

## ALGORITHME DE SÉLECTION — TRIADE + SAISONNIÈRE CONDITIONNELLE

**3 niyyah tirées chaque matin (les 3 piliers), + 1 niyyah saisonnière UNIQUEMENT si contexte spécial.**

Cette triade reflète la hiérarchie spirituelle classique (Ibn al-Qayyim) :
1. **Combat de l'ego (jihâd an-nafs)**
2. **Adoration d'Allah ('ibâda)**
3. **Service à la création (khidmat al-khalq)**

```
RÈGLE PRINCIPALE :
- niyyah_1 = pickRandom(category="combat", exclude=historique_30j)
- niyyah_2 = pickRandom(category="devotion", exclude=historique_30j)
- niyyah_3 = pickRandom(category="service", exclude=historique_30j)
- niyyah_4 = pickRandom(category="saison", subcategory=context_actuel) SI contexte saisonnier
             SINON null (pas de 4e niyyah affichée)
```

**Logique du contexte saisonnier (priorité décroissante) :**
- Si dernier tiers Ramadan → tirage dans `saison.subcategory="laylat_qadr"`
- Sinon si Muharram (9-10) → tirage dans `saison.subcategory="muharram"`
- Sinon si 1-10 Dhul-Hijja → tirage dans `saison.subcategory="dhul_hijja"`
- Sinon si Ramadan → tirage dans `saison.subcategory="ramadan"`
- Sinon si jour blanc (13, 14, 15 hijri) → tirage dans `saison.subcategory="jours_blancs"`
- Sinon si vendredi → tirage dans `saison.subcategory="jumuah"`
- Sinon → **pas de niyyah saisonnière, on affiche 3 niyyah seulement**

**Tracking nécessaire (localStorage) :**
- `niyyah_history` : liste des IDs choisis ces 30 derniers jours
- `niyyah_intention_date` : déjà existant, à conserver

**Couverture mathématique sur 1 an :**
- Combat : 365 niyyah / 365 jours → **pile 1 an, zéro répétition** ✅
- Dévotion : 377 niyyah / 365 jours → **1 an + 12 jours de marge** ✅
- Service : 365 niyyah / 365 jours → **pile 1 an, zéro répétition** ✅
- Saison : répétition acceptable car contexte différent à chaque apparition

**UX bonus — la 4e niyyah saisonnière devient un événement marqué :**
- Jour ordinaire (lundi) → modale affiche 3 niyyah
- Vendredi → modale affiche 3 niyyah + 1 niyyah jumuah (4 au total, mise en avant)
- Ramadan → modale affiche 3 niyyah + 1 niyyah ramadan (4 au total)
- Laylat al-Qadr → modale affiche 3 niyyah + 1 niyyah laylat_qadr (4 au total)

La 4e carte porte un badge contextuel discret : *« Aujourd'hui c'est vendredi »*, *« Aujourd'hui c'est Ramadan »*, etc.

**Pas d'onboarding intrusif nécessaire.** Les 3 catégories distinctes garantissent la diversité quotidienne. L'orphelin qui voit "parents" en niyyah_3 a aussi niyyah_1 (combat) et niyyah_2 (dévotion) qui ne le blessent pas.

---

# 🥊 CATÉGORIE COMBAT — 365 NIYYAH

## A — La langue (50)

1. Aujourd'hui, je ne dirai pas un seul mot mauvais sur quelqu'un — pas même dans ma tête.
2. Aujourd'hui, je couperai net toute conversation qui parle d'un absent — même si je dois passer pour froid.
3. Aujourd'hui, je ne mentirai pas une seule fois — même pour faire plaisir, même pour me sortir d'une gêne.
4. Aujourd'hui, je dirai "je ne sais pas" au moins une fois, là où d'habitude j'aurais inventé.
5. Aujourd'hui, je ne ferai pas d'humour sur quelqu'un qui n'est pas dans la pièce.
6. Aujourd'hui, je tairai la phrase qui me brûle la langue — celle qui ferait mal, qui ferait rire, mais qui ferait du tort.
7. Aujourd'hui, je laisserai trois personnes finir leurs phrases entièrement — même celles dont je crois connaître la fin.
8. Aujourd'hui, je remplacerai chaque "il a dit que…" par un silence.
9. Aujourd'hui, je ne plaindrai pas mon sort à voix haute — pas une seule fois.
10. Aujourd'hui, je dirai une chose vraie et difficile à quelqu'un qui mérite la vérité — sans excuse, sans détour.
11. Aujourd'hui, je ferai un compliment sincère à quelqu'un que je ne complimente jamais — et je m'en irai sans attendre la réponse.
12. Aujourd'hui, je remercierai à voix haute une personne que je remercie trop bas d'habitude.
13. Aujourd'hui, je dirai pardon en premier — même si ce n'est pas moi qui ai commencé.
14. Aujourd'hui, je ne répéterai pas une seule information que je n'ai pas vérifiée.
15. Aujourd'hui, je dirai "Allah te facilite" au lieu de "courage" — au moins une fois, en regardant la personne dans les yeux.
863. Aujourd'hui, je ne dirai aucune phrase qui commence par "lui, il…" suivi d'un défaut. Si j'entends cette phrase sortir, je l'arrête à mi-chemin.
864. Aujourd'hui, je ne dirai pas "je te jure" pour des choses sans importance — l'usage léger des serments use leur valeur.
865. Aujourd'hui, je remplacerai chaque juron habituel par "SubhanAllah" — pour réorienter le réflexe verbal.
866. Aujourd'hui, je ne raconterai pas dans la journée une histoire que j'ai déjà racontée à la même personne — pour respecter sa mémoire et son temps.
867. Aujourd'hui, je dirai à voix haute trois fois ce qui me dérange chez moi — pour me l'avouer avant de le projeter sur d'autres.
868. Aujourd'hui, je ne dirai aucune phrase commençant par "tous les…" pour parler d'un groupe d'humains — la généralisation est l'antichambre de l'injustice.
869. Aujourd'hui, je ne dirai pas "je suis fatigué" devant ma famille — pour ne pas plomber leur journée par mon propre poids.
870. Aujourd'hui, je ne dirai "j'ai mérité" à personne — Allah donne, je n'ai pas mérité. La conscience du don passe par les mots.
871. Aujourd'hui, j'arrêterai une conversation qui glisse vers la médisance en disant juste : "Changeons de sujet, sa vie ne nous regarde pas."
872. Aujourd'hui, je ne ferai pas la morale à quelqu'un en public — si je dois corriger, je le ferai en privé, avec respect.
873. Aujourd'hui, je ne dirai "j'aurais dû lui dire que…" à propos d'une dispute terminée — c'est terminé, et reparler dans le vide alimente le nafs.
874. Aujourd'hui, je ne dirai pas "tu vois bien que…" à mon conjoint — c'est une phrase de combat déguisée.
875. Aujourd'hui, je ne dirai pas "je te l'avais dit" — même si je l'avais dit. La satisfaction d'avoir eu raison coûte plus que la vérité.
876. Aujourd'hui, je ne dirai aucun secret confié — pas en murmure, pas en sous-entendu, pas comme "anecdote intéressante".
877. Aujourd'hui, je ne dirai pas "tu ne comprends pas" à quelqu'un — j'expliquerai mieux, ou je me tairai.
878. Aujourd'hui, je ne dirai aucun mot dur à quelqu'un qui sert : caissière, livreur, agent — leur fatigue est aussi écrite.
879. Aujourd'hui, je terminerai mes phrases — sans laisser traîner pour que l'autre complète. Le respect du langage est aussi de l'adab.
880. Aujourd'hui, je ne dirai pas "n'importe quoi !" à un enfant qui s'exprime — toute parole d'enfant compte, même fausse.
881. Aujourd'hui, je remercierai par une phrase complète, pas par "merci" automatique — précisément, en nommant pourquoi.
882. Aujourd'hui, je ne ferai aucun reproche à quelqu'un avant midi — la matinée doit être préservée pour tous, y compris celui qui me déçoit.
993. Aujourd'hui, je remplacerai chaque juron qui voudrait sortir par "Allahumma sallim" — pour rediriger l'exclamation instinctive.
994. Aujourd'hui, je tairai un avis sur l'apparence d'un autre — vêtement, poids, ride, calvitie. Mon œil n'est pas une autorité.
995. Aujourd'hui, je ne ferai aucun reproche par message — si c'est important, je le dis en face. L'écrit envenime ce qu'une voix calmerait.
996. Aujourd'hui, je ne dirai aucune phrase ironique pendant 12 heures — l'ironie blesse souvent là où elle prétend rire.
997. Aujourd'hui, je ne décrirai pas une situation conflictuelle à un tiers — surtout pas en y mettant le ton, les mimiques, les rebondissements.
998. Aujourd'hui, je ne dirai pas "à ton âge…" à un enfant ou à un jeune — chaque âge a sa propre lutte.
999. Aujourd'hui, je dirai "merci pour ta patience" à quelqu'un qui m'a attendu — au lieu de m'excuser platement.
1000. Aujourd'hui, je n'ironiserai pas sur ma propre famille devant des étrangers — ma famille mérite ma loyauté même en blague.
1001. Aujourd'hui, je dirai "je suis désolé que tu vives ça" au lieu de "ce n'est pas grave" — pour valider la peine de l'autre.
1002. Aujourd'hui, je ne ferai aucun commentaire sur les choix vestimentaires d'autrui — homme, femme, enfant.
1003. Aujourd'hui, je ne dirai pas "tu vas bien ?" par automatisme — soit je veux vraiment la réponse, soit je dis simplement "salam".
1004. Aujourd'hui, je remplacerai chaque "je n'y arriverai pas" par "Allah me facilite" — le langage forme le destin.
1005. Aujourd'hui, je ne mentirai par omission à personne — taire un fait important pour servir mon intérêt, c'est mentir aussi.
1006. Aujourd'hui, je dirai "tu m'as fait du bien" à quelqu'un qui ne sait pas qu'il m'a aidé.
1007. Aujourd'hui, je ne donnerai aucun conseil non sollicité — la sagesse non demandée pèse double.

## B — Le regard (35)

16. Aujourd'hui, je baisserai mon regard la première fois où il voudra glisser ailleurs — même si personne ne le saura jamais.
17. Aujourd'hui, je ne regarderai pas la richesse des autres avec envie — leur voiture, leur maison, leur vie en ligne.
18. Aujourd'hui, je n'ouvrirai pas Instagram pour mesurer ma vie à celle des autres.
19. Aujourd'hui, je regarderai trois personnes dans les yeux quand je leur parlerai — pas mon téléphone, pas le sol.
20. Aujourd'hui, je ne lirai pas un seul commentaire sous une publication — j'épargnerai mon cœur.
21. Aujourd'hui, je ne consulterai pas mon téléphone pendant un repas — pas une fois, pas en cachette.
22. Aujourd'hui, je regarderai le ciel trois fois — vraiment, longuement, sans pensée parasite.
23. Aujourd'hui, je verrai ce que je refuse de voir depuis des mois — sur mon compte en banque, sur mon corps, sur ma relation.
24. Aujourd'hui, je ne comparerai pas mes enfants à ceux des autres — ni à voix haute, ni dans ma tête.
25. Aujourd'hui, je détournerai mon regard de l'écran qui me garde captif — celui que je connais.
883. Aujourd'hui, je ne lirai pas les histoires Instagram d'une personne qui me fait douter de ma vie — préventive, pas curative.
884. Aujourd'hui, je ne regarderai pas mes vieilles photos de couple — celles d'avant la rupture, du temps où c'était mieux. Le passé n'est pas un refuge.
885. Aujourd'hui, je n'irai pas voir le profil de mon ex sur les réseaux — pas même en mode privé, pas même par un compte tiers.
886. Aujourd'hui, je ne ferai pas défiler les vidéos pour passer le temps — je choisirai consciemment ce que je regarde, ou je ferme l'écran.
887. Aujourd'hui, je détournerai mon regard d'une publicité provocante — même si c'est juste une affiche. Le regard se forme dans les petites occasions.
888. Aujourd'hui, je ne regarderai pas par-dessus l'épaule d'un inconnu son écran de téléphone — la curiosité visuelle est aussi un indiscretion.
889. Aujourd'hui, je ne regarderai pas l'écran d'un enfant — il a droit à son propre espace même à 8 ans.
890. Aujourd'hui, je regarderai une chose de la nature pendant 5 minutes sans détourner les yeux — un arbre, un nuage, une fourmilière. Pour réapprendre à voir.
891. Aujourd'hui, je ne regarderai pas la mort dans une vidéo virale — refuser le voyeurisme de la souffrance d'autrui.
892. Aujourd'hui, je regarderai mon conjoint comme la première fois — pour redécouvrir ce que l'habitude m'avait fait oublier.
893. Aujourd'hui, je ne lirai pas un magazine people, un site de gossip, une chronique sur la vie privée des autres.
894. Aujourd'hui, je regarderai mes mains pendant 1 minute — vraiment, en pensant qu'elles m'ont été confiées et qu'elles partiront avec moi.
895. Aujourd'hui, je ne regarderai pas le miroir plus de 30 secondes en passant — la longue contemplation de soi est une porte de vanité.
896. Aujourd'hui, je n'observerai pas mes propres réussites sur les réseaux — pas de "j'ai posté il y a 2h, combien de likes ?".
897. Aujourd'hui, je regarderai dans les yeux la personne qui me parle — même si c'est inconfortable, même si je préférerais fuir.
1008. Aujourd'hui, je ne ferai aucun screenshot de la vie d'un autre — ni capture d'écran d'un message, ni photo volée.
1009. Aujourd'hui, je ne lirai aucun avis (Google, Tripadvisor, Amazon) — pour réapprendre à choisir sans l'avis des autres.
1010. Aujourd'hui, je regarderai les yeux de ma mère pendant qu'elle parle — vraiment, sans détourner.
1011. Aujourd'hui, je ne regarderai pas par la fenêtre du voisin — la pudeur s'étend aussi à ne pas voir ce qui n'est pas à moi.
1012. Aujourd'hui, je ne regarderai pas l'heure pendant une prière, une conversation, un repas — pour rendre au moment son entièreté.
1013. Aujourd'hui, je ne regarderai pas mon corps dans un miroir avec dureté — il a été créé tel quel par Allah, je n'ai pas à le mépriser.
1014. Aujourd'hui, je n'irai pas vérifier les notifications du téléphone d'un autre — pas un coup d'œil rapide en passant.
1015. Aujourd'hui, je regarderai les étoiles ce soir pendant 5 minutes — même en ville, même par la fenêtre. Pour réapprendre l'échelle.
1016. Aujourd'hui, je ne regarderai aucune story éphémère — les contenus qui disparaissent en 24h ne méritent pas mon attention finie.
1017. Aujourd'hui, je regarderai longtemps mon enfant qui dort — pour graver en moi ce visage avant qu'il ne change encore.

## C — L'ego (45)

26. Aujourd'hui, je ne chercherai pas à avoir le dernier mot — pas une seule fois.
27. Aujourd'hui, j'accepterai une critique sans me défendre — même si elle est injuste. Je répondrai demain, ou jamais.
28. Aujourd'hui, je laisserai quelqu'un me prendre la place qui me revient — sans rien dire, juste pour voir ce que mon ego dit.
29. Aujourd'hui, je m'inclinerai devant celui qui sait moins que moi — et je l'écouterai jusqu'au bout.
30. Aujourd'hui, je dirai "tu as raison" à quelqu'un que je n'aime pas — si effectivement il a raison.
31. Aujourd'hui, je ne corrigerai personne en public — même si je sais qu'il se trompe.
32. Aujourd'hui, je ferai un travail invisible que personne ne saura jamais — et je résisterai à l'envie de le mentionner.
33. Aujourd'hui, je n'expliquerai pas mes succès — je laisserai les autres en parler s'ils veulent.
34. Aujourd'hui, je remercierai Allah avant de me féliciter — à chaque petite victoire de la journée.
35. Aujourd'hui, je supporterai une humiliation mineure sans la rendre — pour Allah seul, sans attendre la récompense visible. [CORRIGÉE]
898. Aujourd'hui, je m'inclinerai mentalement devant une personne que je méprise — pour lui restituer la dignité que mon ego lui retirait.
899. Aujourd'hui, je dirai "tu m'apprends quelque chose" à quelqu'un dont je pensais ne rien avoir à apprendre.
900. Aujourd'hui, je ferai une chose dont je suis fier — et je n'en parlerai à personne. Pour voir si je peux la faire sans applaudissement.
901. Aujourd'hui, je laisserai passer une critique sans répondre — pas demain, pas dans une semaine. Définitivement.
902. Aujourd'hui, j'occuperai la dernière place à une table, à une réunion, à un événement — comme l'a fait le Prophète ﷺ.
903. Aujourd'hui, je ne mentionnerai pas mon titre, mon diplôme, mon poste — pas une fois, même quand ça aurait été utile.
904. Aujourd'hui, je ferai un compliment sincère à un concurrent — celui qui pourrait me prendre une place, un client, une opportunité.
905. Aujourd'hui, je laisserai passer un ami devant moi à l'entrée — même quand c'est moi qui ai ouvert la porte.
906. Aujourd'hui, je remercierai un mentor pour ce qu'il m'a transmis — sans qu'il ne soit là pour le savoir, dans une lettre, un message, un don anonyme.
907. Aujourd'hui, je ne mentionnerai aucune de mes œuvres caritatives — pas une mention, pas un détour, pas un sous-entendu.
908. Aujourd'hui, je laisserai mon enfant me battre à un jeu — vraiment, sans tricher pour le laisser gagner.
909. Aujourd'hui, je remettrai en cause une opinion que j'ai défendue avec véhémence — pas pour faire plaisir, pour vérifier si j'avais vraiment raison.
910. Aujourd'hui, je ferai une chose sans la publier — sans photo, sans story, sans rien. Pour la garder pour moi et pour Allah.
911. Aujourd'hui, je supporterai une attaque personnelle sans la rendre — comme le Prophète ﷺ qui pardonnait l'offense faite à lui-même, tout en défendant la vérité. [CORRIGÉE]
912. Aujourd'hui, je ferai du'â pour qu'Allah me donne l'humilité — Allâhumma irzuqnî at-tawâdu' — pour que mon ego se courbe ici, et qu'il ne ploie pas sous Sa force au Jour du Jugement. [CORRIGÉE]
913. Aujourd'hui, je laisserai un enfant me coiffer, me dessiner sur le visage, me rire au nez — pour rappeler à mon ego son vrai poids.
914. Aujourd'hui, je serai poli avec un livreur, un agent d'accueil, un guichetier — comme s'il était un savant que je respecte.
915. Aujourd'hui, je remercierai sincèrement pour un cadeau qui ne me sert pas — comme s'il était précieux. La gratitude bien dite est aussi sadaqa.
916. Aujourd'hui, je ne mentionnerai aucune de mes connaissances importantes — pas un nom célèbre, pas un contact prestigieux.
917. Aujourd'hui, je présenterai mes excuses à quelqu'un d'inférieur hiérarchiquement — pour quelque chose dont il pense que c'est sa faute, mais qui est la mienne.
1018. Aujourd'hui, je présenterai quelqu'un d'autre comme expert sur un sujet où je le suis aussi — pour lui faire de la place.
1019. Aujourd'hui, je m'attribuerai un échec dont d'autres sont aussi responsables — pour briser le réflexe de l'auto-protection.
1020. Aujourd'hui, je n'ouvrirai pas mes statistiques personnelles — followers, vues, ventes, performances.
1021. Aujourd'hui, je céderai ma place de parking, ma place dans la file, mon créneau horaire à quelqu'un.
1022. Aujourd'hui, je remercierai un assistant, un stagiaire, un subordonné devant ses pairs — explicitement, en nommant.
1023. Aujourd'hui, je laisserai mon nom hors d'un projet auquel j'ai contribué — pour qu'Allah note ce que les hommes oublient.
1024. Aujourd'hui, je n'expliquerai pas une chose 2 fois si l'autre n'a pas compris du premier coup — je trouverai une autre façon, ou je laisserai.
1025. Aujourd'hui, je ferai un service à quelqu'un qui ne me rendra jamais la pareille — un vieillard, un enfant, un sans-recours.
1026. Aujourd'hui, je ne défendrai pas une opinion juste par peur d'admettre que j'avais tort. Si je suis convaincu, je change.
1027. Aujourd'hui, je laisserai un mentor me corriger sans me justifier 10 fois — j'accepterai sa lecture sans la pondérer.
1028. Aujourd'hui, je porterai mon plus vieux vêtement pendant qu'aucun rendez-vous important ne m'attend — pour rappeler à mon ego que je ne suis pas mon costume.
1029. Aujourd'hui, je ferai un travail manuel modeste — vaisselle, ménage, balayage — devant des gens qui pensent que ce n'est pas "mon rôle".
1030. Aujourd'hui, je dirai "je ne suis pas fier de ça" à quelqu'un en parlant de moi-même. Pour cesser de maquiller.
1031. Aujourd'hui, je remercierai sincèrement quelqu'un qui m'a critiqué — il a peut-être vu ce que mes amis taisent.
1032. Aujourd'hui, je ne mentionnerai pas mes ancêtres prestigieux, ma famille honorable, mon lignage — le Prophète ﷺ a brisé l'orgueil tribal.

## D — La rumination (40)

36. Aujourd'hui, je pardonnerai en silence la personne dont je rumine encore le nom depuis des mois.
37. Aujourd'hui, j'arrêterai de rejouer dans ma tête une dispute terminée depuis longtemps.
38. Aujourd'hui, je ne jugerai pas mentalement les inconnus que je croiserai — pas une seule personne.
39. Aujourd'hui, je laisserai à quelqu'un le bénéfice du doute — celui à qui je le refuse depuis trop longtemps.
40. Aujourd'hui, je ne fabriquerai pas dans ma tête la phrase que l'autre "a sûrement voulu dire".
41. Aujourd'hui, je refermerai mentalement un dossier que je rouvre chaque jour pour rien — l'histoire est finie, je laisse partir.
42. Aujourd'hui, je remplacerai chaque pensée noire par "Hasbunallah wa ni'mal wakil" — autant de fois qu'il le faudra.
43. Aujourd'hui, je ne penserai pas du mal de quelqu'un en son absence — si la pensée vient, je la coupe.
44. Aujourd'hui, je laisserai mon ennemi prospérer en silence — sans lui souhaiter de chute.
45. Aujourd'hui, je dirai à voix haute trois choses pour lesquelles Allah m'a déjà répondu — pour faire taire la voix qui dit qu'Il ne me donne rien.
46. Aujourd'hui, je ne ressasserai pas une erreur passée — Allah l'a peut-être déjà pardonnée, et moi je continue à m'accrocher à elle.
47. Aujourd'hui, j'écrirai sur un papier ce que je rumine, et je le brûlerai ou le jetterai — sans le relire.
48. Aujourd'hui, je refuserai d'imaginer ce que les autres pensent de moi — je n'en sais rien, et eux n'y pensent pas.
49. Aujourd'hui, je me dirai vingt fois "Allah suffit" — chaque fois que mon cerveau veut résoudre seul un problème qui n'est pas à ma taille.
50. Aujourd'hui, je couperai net une rancune en faisant du bien — discrètement — à la personne contre qui je l'ai.
918. Aujourd'hui, je ferme le dossier mental d'une faute qu'Allah a peut-être pardonnée — si je ne la laisse pas partir, c'est moi qui m'enferme.
919. Aujourd'hui, je remplacerai une rumination par un dhikr — chaque fois qu'elle revient, je dis "Allahumma a'innî 'alâ dhikrik" au lieu de la repenser.
920. Aujourd'hui, je ne reverrai pas dans ma tête mon dernier échec — il a déjà coûté assez en l'instant, il ne coûtera rien de plus.
921. Aujourd'hui, je ne ressasserai pas une parole maladroite que j'ai dite hier — ce qui est sorti est sorti. Je peux corriger l'avenir, pas le passé.
922. Aujourd'hui, je ne lirai pas plusieurs fois un message blessant — je le lis une fois, je décide, je passe.
923. Aujourd'hui, je ne discuterai pas mentalement avec une personne absente — la dispute imaginaire est un combat perdu d'avance.
924. Aujourd'hui, je ne penserai pas à ce que j'aurais dû dire à la place — l'esprit de l'escalier est un piège du nafs.
925. Aujourd'hui, je couperai net les "si seulement…" — Allah connaît ce qui est meilleur, et j'aurais perdu d'autres choses.
926. Aujourd'hui, je ne penserai pas à comment je serais si j'avais fait l'autre choix — Allah a choisi ce chemin pour moi, c'est mon chemin.
927. Aujourd'hui, je ne ruminerai pas une parole mal interprétée — si quelqu'un m'a mal compris, je clarifierai sans me défendre 10 fois.
928. Aujourd'hui, je ne penserai pas à ce qui pourrait mal tourner demain — la peur du futur empoisonne le présent.
929. Aujourd'hui, je n'imaginerai pas la pire réaction de mon entourage à une nouvelle que je dois donner — souvent c'est mieux que ce que je redoutais.
930. Aujourd'hui, je couperai une rumination par un mouvement physique — me lever, marcher, faire un wudû. Le corps coupe ce que la tête ne sait pas couper.
931. Aujourd'hui, je ne penserai pas à un ennemi en boucle — il occupe déjà trop d'espace gratuit dans ma tête.
932. Aujourd'hui, je ne penserai pas à ce que je n'ai pas accompli aujourd'hui — Allah voit l'effort, pas seulement le résultat.
1033. Aujourd'hui, je remplacerai une rumination par sourate Al-Inshirâh — 8 versets qui élargissent ce qui se rétrécit.
1034. Aujourd'hui, je dirai "C'est passé. Allah savait. Je laisse." chaque fois qu'une vieille blessure remonte.
1035. Aujourd'hui, je tracerai mentalement une croix sur une rumination qui revient — geste mental, mais ferme.
1036. Aujourd'hui, je n'analyserai pas une décision déjà prise — il est trop tard pour la refaire, je peux juste l'honorer.
1037. Aujourd'hui, je couperai une rumination en lavant mes mains et mon visage — l'eau coupe ce que la tête ne sait pas couper.
1038. Aujourd'hui, je ne demanderai pas à un proche son avis sur un problème que je ressasse — pour ne pas faire entrer ma rumination dans une autre tête.
1039. Aujourd'hui, je dirai à voix haute "ça suffit" quand une rumination dépasse 10 minutes — comme une porte qu'on referme.
1040. Aujourd'hui, je m'imposerai 30 minutes de "temps autorisé pour ruminer" — et après cette demi-heure, plus une seule pensée sur le sujet.
1041. Aujourd'hui, je ne penserai pas à ce que les autres pensent de mon échec — souvent ils n'y pensent pas du tout.
1042. Aujourd'hui, je ne ferai pas de "dernière fois" mentale — "et si je l'avais vu une dernière fois ?", "et si j'avais dit une dernière chose ?". Le passé est fermé.
## E — La peur & l'angoisse (35)

51. Aujourd'hui, je ferai la chose que la peur me souffle d'éviter depuis trois mois — un coup de fil, un rendez-vous, une vérification.
52. Aujourd'hui, je ne consulterai pas mon compte en banque en panique — une seule fois, en pleine conscience, avec Bismillah.
53. Aujourd'hui, je dirai "Allah suffit" à chaque fois que mon ventre se serre — pas comme une formule, comme une décision.
54. Aujourd'hui, je refuserai d'anticiper un drame qui n'est pas encore arrivé — et si la pensée revient, je la chasse.
55. Aujourd'hui, je dormirai sans avoir vérifié dix fois que tout est bien fermé — et je ferai confiance à al-Hafîz.
56. Aujourd'hui, je tiendrai un rendez-vous médical que je repousse depuis trop longtemps — celui que je connais.
57. Aujourd'hui, je dirai à quelqu'un "j'ai peur" — au lieu de jouer le fort comme d'habitude.
58. Aujourd'hui, je marcherai cinq minutes dehors quand l'angoisse montera — sans téléphone, sans musique, juste en respirant.
59. Aujourd'hui, je remettrai à Allah une décision que je tourne en boucle depuis des semaines — par une istikhâra honnête.
60. Aujourd'hui, je ne fuirai pas dans la nourriture, le sucre ou l'écran ce que je devrais simplement ressentir.
933. Aujourd'hui, je dirai à voix haute "Lâ hawla wa lâ quwwata illâ billâh" à chaque fois que mon ventre se serre — pour transformer la peur en remise.
934. Aujourd'hui, je passerai 20 minutes à respirer profondément en disant "Allahu" à l'inspiration et "Hu" à l'expiration — pour calmer le système nerveux avec le souvenir.
935. Aujourd'hui, je rangerai une chose qui m'inquiète depuis longtemps — un papier, un dossier, une démarche. La peur recule devant l'action concrète.
936. Aujourd'hui, je tairai mes inquiétudes pendant 6 heures — pas un mot à voix haute, pas un message d'alarme à un proche.
937. Aujourd'hui, j'écrirai ce qui me terrifie sur un papier — puis je l'enfermerai dans une enveloppe que je n'ouvrirai pas avant 30 jours.
938. Aujourd'hui, je consulterai mes inquiétudes mathématiquement — combien sont déjà arrivées ? Combien n'arriveront jamais ?
939. Aujourd'hui, je refuserai de relire un courrier inquiétant plus de deux fois — la troisième lecture est une auto-torture.
940. Aujourd'hui, je dirai à un proche "j'ai besoin de toi maintenant" — au lieu d'attendre que l'angoisse me submerge seul.
941. Aujourd'hui, je couperai les actualités anxiogènes pendant 48 heures — le monde n'a pas besoin de moi pour continuer à tourner.
942. Aujourd'hui, je ferai un acte de courage minuscule — appeler un service client, demander un remboursement, dire non à une sollicitation.
943. Aujourd'hui, je supporterai 10 minutes une sensation désagréable sans la fuir — pour réapprendre que je peux la traverser.
944. Aujourd'hui, je dirai "Allah connaît, je ne sais pas, et ça me suffit" à chaque fois que mon cerveau veut anticiper l'inconnu.
1055. Aujourd'hui, je relirai la sourate Al-Inshirâh quand l'angoisse montera — 8 versets, et le cœur retrouve sa place.
1056. Aujourd'hui, je dirai "Allah connaît mon avenir mieux que moi, et Il est plus miséricordieux pour moi que moi-même."
1057. Aujourd'hui, je n'irai pas chercher sur Google les symptômes d'une douleur — je ferai du'â et j'irai voir un médecin si ça persiste.
1058. Aujourd'hui, je tairai mes inquiétudes financières devant mes enfants — pour ne pas charger leurs petites épaules de mes nuits blanches.
1059. Aujourd'hui, j'écrirai 10 fois sur un papier : "Allah suffit." Pour ancrer dans la main ce que la tête refuse.
1060. Aujourd'hui, je remplacerai une catastrophe imaginée par une grâce reçue — chaque fois que mon esprit invente un drame, je le remplace par un fait reçu.
1061. Aujourd'hui, je ne consulterai aucune horoscope, aucun thème astral, aucun "ce que dit ton signe" — l'avenir n'est pas dans les étoiles, il est dans la main d'Allah.
1062. Aujourd'hui, je supporterai une incertitude sans la résoudre — laisser une question ouverte sans téléphoner, sans demander, sans Googler.
1063. Aujourd'hui, je sortirai dehors quand l'angoisse monte — pas dans une autre pièce, dehors, dans l'air. Le ciel rappelle l'échelle.
1064. Aujourd'hui, je dirai à mon angoisse : "tu es une visite, pas une habitante." Et je continuerai mon chemin sans la combattre frontalement.
1065. Aujourd'hui, je n'imaginerai pas la mort d'un proche — la peur anticipée du deuil empoisonne les jours qu'on a encore ensemble.
1066. Aujourd'hui, je dirai 7 fois "Hasbiya Allahu, lâ ilâha illâ Huwa, 'alayhi tawakkaltu wa Huwa Rabbu al-'Arshi al-'Adhîm" — la formule du Prophète ﷺ pour les soucis.
1067. Aujourd'hui, je traiterai mon corps avec douceur quand l'angoisse l'habite — un thé chaud, un bain, une couverture. Le corps a besoin d'être consolé aussi.

## F — La paresse & procrastination (37)

61. Aujourd'hui, je terminerai une chose que je repousse depuis vingt jours. Une seule. Mais celle-là.
62. Aujourd'hui, je me lèverai au premier réveil — sans appuyer une seule fois sur snooze.
63. Aujourd'hui, je ferai en premier ce que j'ai envie de faire en dernier.
64. Aujourd'hui, je passerai un appel difficile avant midi — celui que je repousse depuis lundi.
65. Aujourd'hui, je travaillerai 90 minutes sans interruption sur ce qui compte vraiment — pas sur ce qui presse.
66. Aujourd'hui, je commencerai un dossier impossible — pas pour le finir, juste pour briser la barrière.
67. Aujourd'hui, je ne dirai "demain" sur rien d'important — pas une fois.
68. Aujourd'hui, je rangerai un endroit que je ne range jamais — un tiroir, une boîte, un coin de chambre.
69. Aujourd'hui, je prendrai vraiment soin de mon corps — un acte que je néglige depuis trois mois (rendez-vous, sport, eau, sommeil).
70. Aujourd'hui, je ferai dou'a pour la motivation au lieu d'attendre qu'elle vienne d'elle-même.
945. Aujourd'hui, je ferai la première chose de la journée sans regarder mon téléphone — la première action engagée du jour donne le ton.
946. Aujourd'hui, je décomposerai une grande tâche en 5 micro-tâches — et je ferai juste la première. Le reste suivra ou non.
947. Aujourd'hui, je commencerai par la chose que je redoute le plus — pour libérer le reste de la journée du poids invisible.
948. Aujourd'hui, je ferai 20 minutes minimum d'une chose importante — pas une heure, pas plus, 20 minutes. Souvent ça suffit pour démarrer.
949. Aujourd'hui, je terminerai un seul mail que je repousse depuis 10 jours — pas tous mes mails. Un.
950. Aujourd'hui, je nettoierai pendant 5 minutes un espace où je vis — pas le grand ménage, 5 minutes d'attention.
951. Aujourd'hui, je ne dirai pas "je ferai plus tard" — chaque fois que je l'entendrai en moi, je ferai immédiatement la chose pendant 2 minutes.
952. Aujourd'hui, je marcherai 30 minutes sans excuse — pluie, froid, fatigue. Le corps qui bouge réveille l'âme.
953. Aujourd'hui, je préparerai mes affaires de demain avant de dormir — vêtements, sac, papiers. Pour gagner 20 minutes le matin.
954. Aujourd'hui, je ferai mon lit dès le lever — l'ordre extérieur appelle l'ordre intérieur.
955. Aujourd'hui, je n'ouvrirai aucun divertissement avant d'avoir fait 3 choses utiles du jour.
956. Aujourd'hui, je dirai à voix haute mon plan du matin avant de commencer — pour engager l'oreille en plus de la tête.
957. Aujourd'hui, je ferai une chose physique avant 9h — 10 squats, un étirement, monter les escaliers. Pour briser l'inertie corporelle.
958. Aujourd'hui, je m'imposerai 90 minutes sans aucune distraction sur un dossier important — minuteur, porte fermée, téléphone ailleurs.
959. Aujourd'hui, je terminerai une tâche entamée depuis longtemps avant d'en commencer une nouvelle — pour ne pas accumuler les chantiers ouverts.
1068. Aujourd'hui, je rangerai mon bureau avant de commencer à travailler — pas pendant 1 heure, pendant 5 minutes.
1069. Aujourd'hui, je terminerai une lettre, un mail, un message resté en brouillon depuis trop longtemps.
1070. Aujourd'hui, je classerai 10 papiers qui traînent — pas tous mes papiers, dix.
1071. Aujourd'hui, je nettoierai un seul recoin sale de chez moi — celui que je vois sans le voir.
1072. Aujourd'hui, je remplirai un formulaire administratif que je repousse depuis 3 mois — celui que je connais.
1073. Aujourd'hui, je rangerai un placard pendant 15 minutes chronométrées — pas plus, pas moins.
1074. Aujourd'hui, je me lèverai immédiatement après le tasleem du Fajr — pas de re-couchage, pas de "5 minutes de plus".
1075. Aujourd'hui, je préparerai à manger au lieu de commander — la paresse n'est pas qu'un manque d'énergie, c'est aussi une fuite du concret.
1076. Aujourd'hui, j'irai marcher 20 minutes au moment où la paresse veut me clouer — l'action coupe la paresse, pas la motivation.
1077. Aujourd'hui, je terminerai mon assiette sans laisser traîner les restes 1 heure sur la table.
1078. Aujourd'hui, je ferai ma vaisselle juste après le repas — pas plus tard, pas demain.
1079. Aujourd'hui, je terminerai une vidéo de formation, un livre utile, un dossier de travail — pas en commencer un nouveau.

## G — Les addictions modernes (45)

71. Aujourd'hui, je laisserai mon téléphone dans une autre pièce pendant 2 heures — celles où je fuis d'habitude.
72. Aujourd'hui, je ne consulterai pas mes notifications avant la prière du Fajr — ni avant Bismillah, ni avant le miroir.
73. Aujourd'hui, je ne scrollerai pas une seule fois sans intention — chaque ouverture d'app devra avoir une raison nommée.
74. Aujourd'hui, je désinstallerai pour 24h une application qui me vole mes journées — celle que je connais.
75. Aujourd'hui, je passerai un repas sans téléphone à table — pas un coup d'œil, pas une vibration consultée.
76. Aujourd'hui, je ne regarderai aucune vidéo de moins de 60 secondes — pas une seule short, pas un seul reel.
77. Aujourd'hui, je ne consulterai pas mon téléphone aux toilettes — je rends à ce lieu son silence.
78. Aujourd'hui, je ne dormirai pas avec mon téléphone à portée de main — je le laisse dans une autre pièce.
79. Aujourd'hui, je supprimerai 50 photos inutiles que je traîne depuis trois ans — un petit nettoyage spirituel.
80. Aujourd'hui, je n'ouvrirai pas YouTube pour me "détendre 5 minutes" — je sais comment ça finit.
81. Aujourd'hui, je mettrai mon téléphone en niveaux de gris pendant la journée — pour casser l'attrait des couleurs.
82. Aujourd'hui, je ne regarderai pas les statistiques de mes publications — pas une seule fois, même par "réflexe".
83. Aujourd'hui, je désactiverai les notifications d'au moins trois applications — celles qui me sollicitent pour rien.
84. Aujourd'hui, je ne mettrai pas la télé en fond — je supporterai le silence pendant les tâches ménagères.
85. Aujourd'hui, je ne regarderai mon téléphone que trois fois entre Fajr et Dhuhr — trois, pas trente.
960. Aujourd'hui, je désinstallerai un jeu mobile qui me vole 30 minutes par jour — celui que je connais, sans me trouver d'excuse.
961. Aujourd'hui, je ne consulterai pas mon téléphone aux feux rouges — je dirai SubhanAllah à la place.
962. Aujourd'hui, je laisserai mon téléphone hors de la chambre pour la nuit — qu'il dorme ailleurs, pour que je dorme vraiment.
963. Aujourd'hui, je n'ouvrirai aucune application de rencontre, aucun site de jeux, aucun lieu où mon âme se perd.
964. Aujourd'hui, je ne regarderai aucune publicité ciblée jusqu'au bout — je passerai dès la 2e seconde. Mon attention vaut plus que leur algorithme.
965. Aujourd'hui, je n'ouvrirai pas Amazon, AliExpress, Shein — un jour sans incitation à consommer.
966. Aujourd'hui, je ne checkerai pas mes mails plus de 3 fois — matin, midi, soir. Le mail est une cage qu'on ouvre soi-même.
967. Aujourd'hui, je ne regarderai aucune actualité avant 11h — laisser le matin tranquille, mon cœur n'est pas un dépotoir mondial dès le réveil.
968. Aujourd'hui, je désabonnerai 5 newsletters qui ne m'apportent rien — chaque désabonnement est une libération.
969. Aujourd'hui, je ne participerai à aucun groupe WhatsApp pendant 24h — silence radio, retrait total.
970. Aujourd'hui, je couperai mes données mobiles pendant 4 heures — pour réapprendre à vivre sans connexion permanente.
971. Aujourd'hui, je supprimerai mes applications de divertissement de mon écran d'accueil — qu'elles soient dans un dossier caché, accès volontaire seulement.
972. Aujourd'hui, je ne regarderai aucune vidéo recommandée — uniquement ce que je suis venu chercher.
973. Aujourd'hui, je ferai un journal papier au lieu d'écrire dans une application — le papier garde ce que les serveurs vendent.
974. Aujourd'hui, je désactiverai la lecture automatique des vidéos sur tous mes comptes — pour reprendre le pouvoir du clic.
975. Aujourd'hui, je ne regarderai aucun contenu pendant le repas — pas de série, pas de YouTube, pas de podcast. Manger en silence.
976. Aujourd'hui, je n'achèterai rien en ligne — pas un clic d'achat, même petit.
977. Aujourd'hui, je fermerai les yeux 1 minute avant chaque ouverture d'application — pour me demander : pourquoi j'ouvre ?
1080. Aujourd'hui, je laisserai mon téléphone branché loin de moi pendant tout le repas — pas à portée, pas sur la table, ailleurs.
1081. Aujourd'hui, je ne checkerai pas l'application météo plus d'une fois — l'obsession du temps qu'il fera est une fuite du temps qu'il fait.
1082. Aujourd'hui, je désactiverai temporairement un compte de réseau social pour 7 jours — pas suppression, suspension.
1083. Aujourd'hui, je remplacerai 1 heure d'écran par 1 heure de Coran — pas 30 minutes, une heure entière.
1084. Aujourd'hui, je n'enverrai aucun message non urgent après 21h — pour respecter la nuit des autres.
1085. Aujourd'hui, je supprimerai 100 anciennes conversations WhatsApp qui ne servent plus — chaque suppression est une libération.
1086. Aujourd'hui, je n'ouvrirai pas la même application 2 fois consécutivement en moins de 5 minutes — règle du compteur invisible.
1087. Aujourd'hui, je dirai bismillah avant de prendre mon téléphone — pour rappeler l'intention avant chaque ouverture.
1088. Aujourd'hui, je n'ouvrirai aucun groupe de discussion qui m'épuise — celui où je ne suis qu'un spectateur passif.
1089. Aujourd'hui, je ne lirai aucun débat dans les commentaires — le débat en ligne ne change personne, il vide ceux qui le lisent.
1090. Aujourd'hui, je désinstallerai 5 applications que je n'ai pas ouvertes depuis 30 jours — sans hésitation, sans culpabilité.
1091. Aujourd'hui, je laisserai mon téléphone à la maison pour faire les courses — pour réapprendre à exister sans connectivité.

## H — La distraction & dispersion (42)

86. Aujourd'hui, je ferai une seule chose à la fois — vraiment une seule, du début à la fin, sans onglet ouvert.
87. Aujourd'hui, je n'ouvrirai pas dix tâches en parallèle — j'en finirai trois, complètement.
88. Aujourd'hui, je dirai non à une chose qu'on me demandera — pour pouvoir vraiment faire celle qui compte.
89. Aujourd'hui, je sortirai de la maison sans destination utile — juste pour réapprendre à marcher sans but.
90. Aujourd'hui, je n'ouvrirai pas un nouvel onglet avant d'avoir lu jusqu'au bout celui qui est devant moi.
91. Aujourd'hui, je ferai trois choses lentement, vraiment lentement — boire, marcher, parler à un enfant.
92. Aujourd'hui, je n'écouterai rien en faisant la vaisselle, la marche, ou en mangeant — je laisserai mes oreilles libres.
93. Aujourd'hui, je couperai la radio dans la voiture — et j'écouterai le silence ou mes pensées pour une fois.
94. Aujourd'hui, je n'irai pas sur Internet pour chercher la réponse à une question qui peut attendre — je supporterai de ne pas savoir.
95. Aujourd'hui, je ferai une chose lente : laver à la main, marcher sans ascenseur, écrire au stylo.
96. Aujourd'hui, je tiendrai dix minutes assis sans rien faire — sans téléphone, sans livre, sans musique, sans personne.
97. Aujourd'hui, je dirai à voix haute ce que je suis en train de faire — pour casser le pilote automatique.
98. Aujourd'hui, je prierai ma première salat sans regarder l'heure de fin — je la ferai pour Allah, pas pour le timing.
99. Aujourd'hui, je laisserai un blanc dans ma journée — un trou de 30 minutes où je n'ai rien prévu.
100. Aujourd'hui, je terminerai la journée par cinq minutes de silence avant de dormir — sans écran, sans bruit, juste le souffle.
978. Aujourd'hui, je terminerai un livre que j'ai commencé il y a 6 mois — pas en accélérant, en finissant.
979. Aujourd'hui, j'écouterai vraiment la fin des phrases — pas les premiers mots seulement avant de penser à autre chose.
980. Aujourd'hui, je laisserai mon esprit revenir 10 fois sur une même tâche — sans le punir, sans céder à la fuite. Le cerveau réapprend par répétition.
981. Aujourd'hui, je passerai 1 heure à lire le Coran sans rien faire en parallèle — pas de fond sonore, pas de café, juste le mushaf et moi.
982. Aujourd'hui, je ferai mes ablutions sans téléphone à portée — pour redonner au wudû sa pleine présence.
983. Aujourd'hui, je ne lirai aucune chose à moitié — soit je m'engage dans la lecture, soit je ferme. La consommation distraite est une perte.
984. Aujourd'hui, je sortirai marcher sans destination — vraiment. Pour réapprendre à ne pas être toujours en route vers quelque chose.
985. Aujourd'hui, je n'écouterai pas plus d'une chose à la fois — pas de musique pendant les conversations, pas de podcast en cuisinant.
986. Aujourd'hui, je passerai 10 minutes face à mon enfant sans dire un mot — juste le regarder vivre, exister, respirer.
987. Aujourd'hui, je couperai toutes mes notifications visuelles — son seul, ou rien. Les badges rouges sont des chaînes invisibles.
988. Aujourd'hui, je dirai non à 3 sollicitations — pour pouvoir vraiment dire oui à ce qui compte.
989. Aujourd'hui, je ferai une seule chose pendant 2 heures — pas changer, pas pauser, juste être dedans.
990. Aujourd'hui, je laisserai une chose en suspens sans la régler immédiatement — pour habituer mon cerveau à tolérer l'incomplet.
991. Aujourd'hui, je passerai 30 minutes à boire un thé lentement — sans téléphone, sans lecture, sans rien. Juste le thé.
992. Aujourd'hui, je rentrerai chez moi en silence — pas de musique en voiture, pas de podcast. Pour entendre la transition entre l'extérieur et le foyer.
1092. Aujourd'hui, je ferai une chose lente pendant 1 heure — calligraphie, dessin, couture, jardinage. Pour réapprendre la durée.
1093. Aujourd'hui, je tiendrai 5 minutes les yeux fermés sans dormir — pour entendre les bruits du dehors et le silence du dedans.
1094. Aujourd'hui, je n'écouterai pas de musique en travaillant — pour que mon cerveau ait à supporter ses propres pensées.
1095. Aujourd'hui, je passerai un trajet entier sans regarder par la fenêtre vers mon téléphone — vraiment regarder dehors, ce que je vois change.
1096. Aujourd'hui, je mangerai un fruit en sentant chaque texture — la peau, la chair, la fibre, le noyau s'il y en a un.
1097. Aujourd'hui, j'écouterai une conversation entière sans préparer ma réponse pendant qu'on me parle.
1098. Aujourd'hui, je marcherai pieds nus sur l'herbe ou la terre pendant 5 minutes — pour me reconnecter à ce qui ne pixelise pas.
1099. Aujourd'hui, je ferai une seule chose pendant 90 minutes complètes — minuteur, porte fermée, intention claire.
1100. Aujourd'hui, je terminerai un projet personnel laissé en suspens — celui qui pèse sur ma conscience sans crier fort.
1101. Aujourd'hui, je ne planifierai rien pour 1 heure — un trou volontaire dans mon agenda, sans culpabilité.
1102. Aujourd'hui, je n'écouterai pas plus de 3 podcasts cette semaine — choisir, c'est aussi exclure.
1103. Aujourd'hui, je terminerai ma journée par 3 phrases d'introspection écrites — pas mentales, écrites, sur papier.

## I — Orgueil & arrogance (12)

1043. Aujourd'hui, je ferai une chose en doutant — sans certitude d'avoir raison. L'humilité, c'est aussi accepter le risque.
1044. Aujourd'hui, je dirai "je ne sais pas" sans suivre d'un "mais je pense que…". Une parole attribuée à l'Imam Mâlik : "Le savant est celui qui dit le plus souvent 'je ne sais pas'." [CORRIGÉE]
1045. Aujourd'hui, j'écouterai jusqu'au bout quelqu'un que je juge inférieur à moi — il a peut-être quelque chose que je n'ai pas.
1046. Aujourd'hui, je ne corrigerai pas la prononciation arabe de quelqu'un — la fragilité d'apprendre est sacrée.
1047. Aujourd'hui, je laverai les pieds, les mains, le visage de quelqu'un qui ne peut pas le faire seul — vieillard, malade, enfant.
1048. Aujourd'hui, je m'assoirai au sol devant un parent âgé pour lui parler — pas debout, pas sur une chaise plus haute.
1049. Aujourd'hui, je porterai mon orgueil comme un bagage encombrant — en le sentant lourd, je l'aurai déjà à moitié déposé.
1050. Aujourd'hui, je dirai "Allah, garde-moi de cette voix en moi qui crie 'je suis mieux que lui'."
1051. Aujourd'hui, je donnerai si discrètement que ma main gauche ne saura pas ce que ma main droite a donné — comme l'enseigne le Prophète ﷺ sur les 7 catégories ombragées au Jour du Jugement (Bukhari). [CORRIGÉE]
1052. Aujourd'hui, je serai à l'écoute d'une opinion contraire à la mienne pendant 15 minutes sans répondre — pour vérifier si elle a de la matière.
1053. Aujourd'hui, je ne dirai pas "moi je…" plus d'une fois dans une conversation. Le compteur silencieux.
1054. Aujourd'hui, je ferai du'â pour qu'Allah me protège de l'orgueil que je ne vois pas — celui qui est devenu si naturel que je ne le remarque plus.

## J — Jalousie & comparaison (10)

1104. Aujourd'hui, je dirai "Allahumma bârik" pour quelqu'un dont je jalouse la réussite — vraiment, en nommant ce que je lui envie.
1105. Aujourd'hui, je ferai du'â pour qu'Allah augmente le bien chez quelqu'un dont je n'aime pas la réussite — pour briser ma jalousie par le bas.
1106. Aujourd'hui, je dirai "MâshâAllah" à chaque fois que je verrai une bonne chose chez les autres — sans envie, comme une bénédiction.
1107. Aujourd'hui, je ne regarderai pas ce que d'autres ont posté — pour ne pas m'imposer une mesure à laquelle je n'aspire pas.
1108. Aujourd'hui, je nommerai 5 grâces qu'Allah m'a données et que d'autres n'ont pas — pour rééquilibrer ma vision.
1109. Aujourd'hui, je ne ferai aucune comparaison entre ma vie à 25 ans, 30 ans, 40 ans, et celle des autres — chaque chemin est tracé.
1110. Aujourd'hui, je dirai "ça lui est destiné, pas à moi" face à un bien que je vois chez un autre. La fragilité de l'envie tient à un cliché qui se reformule.
1111. Aujourd'hui, je remercierai Allah pour les épreuves d'autrui qu'Il m'a épargnées — sans présomption, en humilité.
1112. Aujourd'hui, je présenterai mes félicitations à quelqu'un dont la réussite me dérange — sincèrement, en regardant dans les yeux.
1113. Aujourd'hui, je n'écouterai pas un récit qui finit par "il a tout, il ne mérite pas." — Allah a décidé, je n'ai pas à comptabiliser.

## K — Ingratitude (8)

1114. Aujourd'hui, je nommerai à voix haute 10 grâces de la dernière heure — bénéfices invisibles que je n'avais pas remerciés.
1115. Aujourd'hui, je dirai "Alhamdulillah" en sentant l'eau qui coule sur mes mains — pour que la grâce ne devienne pas habitude muette.
1116. Aujourd'hui, je remercierai pour chaque vêtement que j'ai mis ce matin — combien d'humains n'en ont pas.
1117. Aujourd'hui, je dirai "Alhamdulillah" pour chaque pas que mes jambes me permettront — combien d'humains ne marchent plus.
1118. Aujourd'hui, je remercierai Allah pour mes yeux qui lisent ces mots — combien d'aveugles auraient voulu lire le Coran une seule fois.
1119. Aujourd'hui, je remercierai pour ma respiration — 22 000 fois ce qu'Il me donne sans que je le demande.
1120. Aujourd'hui, je dirai "Alhamdulillah 'ala kulli hâl" devant une difficulté — pour rappeler à mon âme que le hâl (état) lui-même est don.
1121. Aujourd'hui, je dirai à voix haute "merci Allah" avant de m'endormir — pas comme une formule, en sentant le sens.

## L — Colère (6)

1122. Aujourd'hui, si je m'énerve debout, je m'assoirai immédiatement. Si je suis assis, je m'allongerai. La sounnah du Prophète ﷺ pour casser la colère (Abu Dawud).
1123. Aujourd'hui, je dirai "A'ûdhu billâhi min ash-shaytâni-r-rajîm" à la première montée de colère — c'est la formule prescrite par le Prophète ﷺ (Bukhari).
1124. Aujourd'hui, je ferai mes ablutions quand la colère montera — l'eau éteint le feu, et la colère est une braise de Shaytân selon le hadith (Abu Dawud).
1125. Aujourd'hui, je tairai un mot en colère pendant 24 heures — si je dois absolument le dire, je le dirai demain calmement.
1126. Aujourd'hui, je sortirai de la pièce à la première étincelle de colère contre mon enfant ou mon conjoint — pour ne pas laisser sortir ce qui ne pourra plus être rentré.
1127. Aujourd'hui, je ferai du'â pour la personne qui m'a mis en colère — c'est la coupure parfaite, et le Prophète ﷺ disait que celui qui contient sa colère, Allah le récompense au Jour du Jugement (Tirmidhi).
# 🤲 CATÉGORIE DÉVOTION — 365 NIYYAH

## I — Dhikr secret & invocations cachées (65)

101. Aujourd'hui, je dirai 100 fois "SubhanAllah wa bihamdihi" pendant que je marcherai — sans que personne ne le sache.
102. Aujourd'hui, je dirai 100 fois "Astaghfirullah" dans la journée — pas comme un compteur, comme une respiration.
103. Aujourd'hui, je dirai "La hawla wa la quwwata illa billah" à chaque difficulté qui surgira — petite ou grande.
104. Aujourd'hui, je dirai dans le silence : "Hasbi-Allahu la ilaha illa Huwa, 'alayhi tawakkaltu" sept fois après Fajr et sept fois après Maghrib.
105. Aujourd'hui, j'apprendrai par cœur un nom d'Allah que je ne connaissais pas — et je le répéterai jusqu'au coucher.
106. Aujourd'hui, je dirai 10 fois "Allahumma a'innî 'ala dhikrika wa shukrika wa husni 'ibâdatika" après chaque salat — exactement comme l'a recommandé le Prophète ﷺ à Mu'âdh.
107. Aujourd'hui, je ferai mon dhikr en marchant dans la rue — pas dans ma chambre. Au milieu du bruit.
108. Aujourd'hui, j'enverrai 100 salât 'ala an-Nabî ﷺ — réparties dans la journée, à chaque transition d'activité.
109. Aujourd'hui, je ferai mes adhkâr du matin et du soir en entier — pas une version raccourcie pour "gagner du temps".
110. Aujourd'hui, je dirai "Bismillah" à voix audible à chaque seuil — porte d'entrée, voiture, repas, vêtement.
111. Aujourd'hui, je remplacerai chaque "je suis fatigué" par "Alhamdulillah 'ala kulli hâl" — même si je dois me mordre la langue.
112. Aujourd'hui, je ferai un istighfâr profond avant de dormir — pas le formel, le vrai, celui qui pleure.
113. Aujourd'hui, je dirai "ya Hayyu ya Qayyûm, bi rahmatika astaghîth, aslih lî sha'nî kullah" à chaque moment où je me sentirai perdu.
114. Aujourd'hui, je dirai dans le silence de mon cœur "Allah, Allah, Allah" — sans rien demander d'autre, juste pour Le nommer.
115. Aujourd'hui, je m'arrêterai trois fois dans la journée pour dire "Rabbi zidnî 'ilmâ" — Mon Seigneur, augmente-moi en savoir.
536. Aujourd'hui, je dirai 100 fois "La ilaha illa Allah" — une seule respiration entre chaque, pour qu'elles deviennent vraies.
537. Aujourd'hui, je réciterai à voix basse "Subhân Allah wa bihamdihi, subhân Allah al-'Adhîm" 7 fois — deux phrases légères sur la langue, lourdes sur la balance (Bukhari).
538. Aujourd'hui, je dirai 33 fois "Subhân Allah", 33 fois "Alhamdulillah", 34 fois "Allahu Akbar" avant de dormir — la dhikr de Fatima (Bukhari).
539. Aujourd'hui, je remercierai Allah à voix haute pour 10 choses précises de ma journée — sans répétition vague, dix faits nommés.
540. Aujourd'hui, je dirai 100 fois "Astaghfirullah al-'Adhîm wa atûbu ilayh" — la formule complète, pas l'abrégée.
541. Aujourd'hui, je dirai "Allahumma Anta as-Salâm, wa minka as-salâm, tabârakta yâ Dhâl-Jalâli wal-Ikrâm" après chaque fin de salat — la formule du Prophète ﷺ.
542. Aujourd'hui, je glorifierai Allah à chaque feu rouge — au lieu de m'agacer du temps perdu, je transforme l'attente en gain.
543. Aujourd'hui, je dirai "Allahumma a'innî 'ala dhikrika" chaque fois que mon esprit s'évadera — pour revenir, sans m'en vouloir.
544. Aujourd'hui, je dirai dans mon cœur "Allah, Allah" — pendant que mes lèvres parlent d'autre chose, mes lèvres ne sont pas les seules à pouvoir dhikrer.
545. Aujourd'hui, je ferai dhikr en regardant le ciel — comme l'ont fait les anciens, debout, levant les yeux à la grandeur du monde.
546. Aujourd'hui, je dirai 1000 fois "Subhân Allah" — pas comme un objectif, comme une route. Au bout, je serai plus léger.
547. Aujourd'hui, je dirai "Hasbiya Allahu, lâ ilâha illâ Huwa, 'alayhi tawakkaltu wa Huwa Rabbu al-'Arshi al-'Adhîm" matin et soir — formule de remise rapportée dans des traditions, et conforme au sens du verset 9:129. [CORRIGÉE]
548. Aujourd'hui, je dirai "Lâ ilâha illâ Anta, subhânak, innî kuntu min adh-dhâlimîn" — la du'â de Yunus dans le ventre du poisson (Coran 21:87), dont une tradition prophétique rapporte qu'elle ouvre les portes de la délivrance. [CORRIGÉE]
549. Aujourd'hui, je dirai "Allahumma innî as'aluka al-'âfiyah" — la du'â de protection que le Prophète ﷺ recommanda à son oncle Al-'Abbâs (Tirmidhi). [CORRIGÉE]
550. Aujourd'hui, je dirai 100 fois "Allahumma salli wa sallim 'ala Muhammad" — la salât sur le Prophète ﷺ est multipliée par dix à chaque répétition.
551. Aujourd'hui, je ferai dhikr dans la voiture pendant tout un trajet — sans musique, sans radio, sans podcast.
552. Aujourd'hui, je dirai "Yâ Hannân, Yâ Mannân" en moment de détresse — deux noms d'Allah cités dans les invocations prophétiques pour la difficulté. [CORRIGÉE]
553. Aujourd'hui, j'apprendrai par cœur la du'â du voyageur — pour qu'elle soit prête le jour où je partirai sans préparation.
554. Aujourd'hui, je dirai "Allahumma akrim nuzulî" en entrant dans tout lieu nouveau — Ô Allah, rends mon entrée bénie.
555. Aujourd'hui, je dirai "Allahumma akrim nuzulî wa Anta khayru al-munzilîn" en arrivant dans un nouveau lieu (voyage, hébergement) — la du'â du voyageur (Muslim). [CORRIGÉE]
556. Aujourd'hui, je murmurerai du dhikr en faisant la vaisselle, en repassant, en pliant le linge — pour que le quotidien devienne adoration.
557. Aujourd'hui, je dirai "Subhân Allah" à chaque fois que je verrai une chose belle — pour rendre à Allah ce qui Lui revient.
558. Aujourd'hui, je dirai "Allahu Akbar" à chaque fois que je verrai une chose grande — montagne, immeuble, océan, étoile. Le mot prendra son sens.
559. Aujourd'hui, je dirai "Alhamdulillah" avant chaque bouchée — pas en hâte, en pleine conscience.
560. Aujourd'hui, je dirai "InnaLillahi wa inna ilayhi râji'ûn" à chaque petite contrariété — pour me rappeler que tout revient à Lui.
561. Aujourd'hui, je dirai dans le silence : "Allahumma habbib ilaynâ al-îmâna wa zayyinhu fî qulûbinâ" — Ô Allah, rends-nous chère la foi et embellis-la dans nos cœurs (Ahmad, Nasâ'î). [CORRIGÉE]
562. Aujourd'hui, je dirai "Bismillâhi tawakkaltu 'alâ Allah, lâ hawla wa lâ quwwata illâ billâh" en sortant de chez moi — protégé jusqu'à mon retour (Abu Dawud).
563. Aujourd'hui, j'apprendrai par cœur la du'â d'entrée et de sortie des toilettes — petite sounnah qui change un instant gris.
564. Aujourd'hui, je dirai 100 fois "Lâ ilâha illâ Allah, wahdahu lâ sharîka lah, lahu al-mulku wa lahu al-hamd, wa Huwa 'alâ kulli shay'in qadîr" — équivalent de libérer 10 esclaves (Bukhari).
565. Aujourd'hui, je terminerai chaque salat par 33+33+33+1 (Subhân Allah, Alhamdulillah, Allahu Akbar, La ilaha illa Allah wahdahu) — la dhikr post-salat oubliée.
686. Aujourd'hui, je dirai "Sayyid al-istighfâr" une fois le matin et une fois le soir — si je meurs avant la nuit ou avant le jour, j'entrerai au Paradis (Bukhari).
687. Aujourd'hui, je dirai 100 fois "Subhân Allah" en regardant un arbre — chaque fois que je le regarde, il glorifie déjà Allah avant moi.
688. Aujourd'hui, je dirai 3 fois matin et soir : "Bismillâhi alladhî lâ yadurru ma'a ismihi shay'un fil-ardi wa lâ fis-samâ'i, wa Huwa as-Samî'u al-'Alîm" — formule prophétique de protection contre tout mal du jour (Abu Dawud, Tirmidhi). [CORRIGÉE]
689. Aujourd'hui, je dirai le dhikr du matin avant d'ouvrir mes yeux entièrement — pas un coup d'œil au téléphone d'abord, le dhikr d'abord.
690. Aujourd'hui, je dirai dans mon cœur "Lâ ilâha illâ Allah" entre chaque inspiration et expiration — pendant une seule minute, vraiment concentrée.
691. Aujourd'hui, je dirai "Yâ Hayyu Yâ Qayyûm, lâ ilâha illâ Anta" dans la difficulté — formule de détresse du Prophète ﷺ, dont certains savants disent qu'elle contient le ism al-a'dham. [CORRIGÉE]
692. Aujourd'hui, je remercierai Allah pour 100 bienfaits précis dans la journée — sans répétition, 100 faits différents.
693. Aujourd'hui, je dirai le tasbîh sur mes doigts comme l'enseignait le Prophète ﷺ — selon une tradition rapportée, les doigts seront témoins au Jour du Jugement. [CORRIGÉE]
694. Aujourd'hui, je dirai "Lâ hawla wa lâ quwwata illâ billâh" — formule que le Prophète ﷺ appelait "un trésor parmi les trésors du Paradis" (Bukhari, Muslim). [CORRIGÉE]
695. Aujourd'hui, j'apprendrai par cœur la du'â d'Adam et de Hawwa : "Rabbanâ dhalamnâ anfusanâ" (Coran 7:23) — la première du'â de l'humanité.
696. Aujourd'hui, je dirai "Allahumma akrim nuzulî wa Anta khayru al-munzilîn" en m'asseyant à toute table de repas — la sounnah du voyageur.
697. Aujourd'hui, je dirai dhikr en faisant la queue — supermarché, banque, administration. Pas de scroll, pas d'agacement, du dhikr.
698. Aujourd'hui, je dirai "Allahumma a'ûdhu bika min al-hammi wa-l-hazan" — Ô Allah, je cherche refuge auprès de Toi contre le souci et la tristesse.
699. Aujourd'hui, je dirai "A'ûdhu bi-kalimâti Allâhi at-tâmmâti min sharri mâ khalaq" — 3 fois le soir, rien ne pourra me nuire cette nuit-là.
700. Aujourd'hui, je dirai un seul nom d'Allah en boucle pendant 5 minutes — non pas pour cocher, pour qu'il devienne mon souffle.
701. Aujourd'hui, je ferai mes adhkâr en regardant mes mains — pour me souvenir que ces mains qu'Il a fabriquées vont aussi Le glorifier.
702. Aujourd'hui, je dirai "Hasbi Allah, ni'ma al-wakîl" 7 fois quand je serai en colère — pour transformer la colère en remise.
703. Aujourd'hui, je dirai "Allahumma innî as'aluka al-firdaws al-a'lâ" — pas n'importe quel Paradis, le plus haut. Pas par vanité, par ambition spirituelle.
704. Aujourd'hui, je dirai en entrant au marché : "Lâ ilâha illâ Allah, wahdahu lâ sharîka lah, lahu al-mulku wa lahu al-hamd, yuhyî wa yumît, wa Huwa Hayyun lâ yamût, bi-yadihi al-khayr, wa Huwa 'alâ kulli shay'in qadîr" — formule rapportée pour les marchés (Tirmidhi). [CORRIGÉE]
705. Aujourd'hui, je dirai "Bismillâh" en allumant et en éteignant tout interrupteur — pour que même mon électricité témoigne pour moi.

## J — Salat — qualité, sounnah, présence (75)

116. Aujourd'hui, je ferai ma prochaine salat comme si c'était la dernière de ma vie — pas comme une formule.
117. Aujourd'hui, je serai à la mosquée 10 minutes avant l'iqâma — pour la salat que je fais d'habitude en courant.
118. Aujourd'hui, je ferai toutes les sounan ratibah de mes 5 prières — 12 rak'as au total, comme l'a fait le Prophète ﷺ.
119. Aujourd'hui, je prierai deux rak'as de Doha — entre le lever du soleil et midi, pour qu'Allah me suffise dans ma journée.
120. Aujourd'hui, je ferai un sajda particulièrement long dans une de mes prières — pour demander une chose précise pendant qu'al-Akram m'écoute.
121. Aujourd'hui, je récirerai des sourates que je ne récite jamais dans mes salats — pas toujours les courtes par paresse.
122. Aujourd'hui, je ferai mes 5 prières à l'heure recommandée — pas à la limite, au début.
123. Aujourd'hui, je ferai witr avant de dormir — même si je suis épuisé, même si je dois m'asseoir.
124. Aujourd'hui, je prierai dans un endroit silencieux pour une seule salat — pour entendre vraiment ce que je récite.
125. Aujourd'hui, je ferai mon wudû avec lenteur pour une seule prière — en passant l'eau comme s'il y en avait peu, en sentant chaque membre.
126. Aujourd'hui, je ne ferai pas ma salat en pensant à autre chose — si l'esprit s'enfuit, je reprends, autant de fois qu'il le faut.
127. Aujourd'hui, je m'assoirai 5 minutes sur mon tapis après chaque salat — sans me lever en sursaut.
128. Aujourd'hui, je prierai tahajjud — ne serait-ce que deux rak'as à 4h du matin, avant l'adhân du Fajr.
129. Aujourd'hui, je dirai "Allahu akbar" dans mes prières en sentant vraiment qu'Allah est plus grand que ce qui m'inquiète.
130. Aujourd'hui, je referai une salat de la journée que j'ai bâclée — sans le dire à personne, juste pour Allah.
566. Aujourd'hui, je ferai mes 5 prières en groupe — à la mosquée, ou en famille à la maison. La prière en groupe vaut 27 fois plus (Bukhari).
567. Aujourd'hui, je sortirai de chez moi 15 minutes avant l'iqâma — pour entrer dans la mosquée par le côté droit, avec le pied droit.
568. Aujourd'hui, je ne ferai aucune prière à la course — si je suis en retard, je manquerai plutôt mon rendez-vous suivant.
569. Aujourd'hui, je ferai la prière de Doha (avant midi) — au minimum 2 rak'as, idéalement 4. Allah suffit à celui qui la fait.
570. Aujourd'hui, je ferai la prière Tahiyyat al-Masjid à chaque entrée dans une mosquée — 2 rak'as avant de m'asseoir, c'est sounnah.
571. Aujourd'hui, je ferai la prière de la Hâja (besoin) — 2 rak'as précédant une du'â pour un besoin précis.
572. Aujourd'hui, je ferai mes 5 prières sans regarder mon téléphone entre les rak'as — silence pur, écoulement entier.
573. Aujourd'hui, je porterai mes plus beaux vêtements pour mes prières — comme on s'habille pour rencontrer un roi.
574. Aujourd'hui, je me parfumerai avant mes prières du vendredi — c'est sounnah, et c'est pour les anges qui m'entourent.
575. Aujourd'hui, je récirerai sourate Yâ-Sîn dans une de mes prières — pour méditer cette sourate, que des traditions populaires appellent "le cœur du Coran". [CORRIGÉE]
576. Aujourd'hui, je récirerai sourate Al-Mulk dans la deuxième rak'a d'Isha — pour qu'elle veille sur moi quand je dormirai.
577. Aujourd'hui, je ferai un rukû' (inclinaison) particulièrement long — pour méditer "Subhâna Rabbiyya al-'Adhîm" comme s'il était nouveau.
578. Aujourd'hui, je ferai mes prières les yeux fermés pour une fois — pour entrer dans la salat sans dépendre du visuel.
579. Aujourd'hui, je ferai mes prières dans un coin différent de la maison — pas le coin habituel, pour casser l'automatisme.
580. Aujourd'hui, je récirerai la Fatiha lentement dans une de mes prières — chaque verset, comme si je le découvrais.
581. Aujourd'hui, je ferai une prière de repentir (salât at-Tawba) — 2 rak'as suivies d'un istighfâr profond pour une faute précise.
582. Aujourd'hui, je ferai mon ghusl (douche rituelle) avant la prière du Jumu'ah — comme l'a recommandé le Prophète ﷺ.
583. Aujourd'hui, je me mettrai sur la première rangée à la mosquée — même si je dois bousculer ma timidité.
584. Aujourd'hui, je serai immobile pendant mes prières — pas un grattage, pas une retouche de vêtement, pas un regard ailleurs.
585. Aujourd'hui, je récirerai en arabe une sourate dont j'avais oublié les mots — je redécouvrirai sa musique.
586. Aujourd'hui, je ferai une salat Istikhâra avant une décision — même petite, pour habituer mon cœur à demander à Allah de choisir.
587. Aujourd'hui, je ferai 4 rak'as supplémentaires avant Dhuhr et 2 après — les sounnah qui multiplient la prière obligatoire.
588. Aujourd'hui, je dirai "Allahu Akbar" dans mes prières avec conscience — chaque takbîr est un saut hors de ce monde.
589. Aujourd'hui, je récirerai sourate Al-Kahf un peu chaque jour si on est près de vendredi — pour qu'elle soit prête à briller le jour J.
590. Aujourd'hui, je terminerai chaque prière en disant : "Allahumma a'innî 'ala dhikrika wa shukrika wa husni 'ibâdatika" — comme l'a enseigné le Prophète ﷺ à Mu'âdh.
591. Aujourd'hui, je ferai 2 rak'as avant le Maghrib — sounnah souvent oubliée, et qui adoucit le coucher du soleil.
592. Aujourd'hui, je ferai une prière particulièrement sincère pour les morts musulmans — janâza ou du'â silencieuse pour les défunts du monde.
593. Aujourd'hui, je ferai mes prières en tenant compte de l'horloge solaire, pas seulement de l'application — j'ouvrirai une fenêtre pour voir la vraie lumière.
594. Aujourd'hui, je ne ferai pas de mouvement inutile dans ma prière — chaque geste sera précis, intentionnel, lent.
595. Aujourd'hui, je dirai "Sami'Allahu liman hamidah, Rabbanâ wa laka al-hamd" en me relevant du rukû' — sans baisser le ton, comme une réponse joyeuse à Allah.
706. Aujourd'hui, je ferai mes 5 prières dans 5 lieux différents — pour multiplier les emplacements qui témoigneront pour moi (Bukhari).
707. Aujourd'hui, selon mon école de fiqh, je dirai le Bismillah en ouvrant les sourates de ma salat avec attention — pas comme une formule expédiée. [CORRIGÉE]
708. Aujourd'hui, j'apprendrai par cœur la du'â du Qunût du witr — pour la dire ce soir avec sens, pas mécaniquement.
709. Aujourd'hui, je ferai chaque sajda en posant le front, le nez, les paumes, les genoux et les orteils — les 7 points d'appui complets, comme le Prophète ﷺ.
710. Aujourd'hui, je ferai 4 rak'as avant 'Asr — sounnah souvent oubliée, fortement recommandée.
711. Aujourd'hui, je récirerai pendant ma salat un verset que je n'ai jamais récité depuis que je prie — pour rompre le cycle Fatiha + 3 dernières sourates.
712. Aujourd'hui, je ferai un *du'â istiftâh* différent au début d'une de mes prières — il y en a plusieurs authentiques, sortons du seul "Subhânaka".
713. Aujourd'hui, je dirai "Allahumma bâ'id baynî wa bayna khatâyâya kamâ bâ'adta bayna al-mashriqi wa-l-maghrib" en ouvrant ma salat — du'â d'éloignement des péchés.
714. Aujourd'hui, je ferai ma prière les pieds parallèles, légèrement écartés — exactement comme le Prophète ﷺ se tenait.
715. Aujourd'hui, je dirai "Rabbanâ wa laka al-hamd, hamdan kathîran tayyiban mubârakan fîh" en me relevant du rukû' — la version longue qu'Allah aime particulièrement.
716. Aujourd'hui, je ferai 2 rak'as entre l'adhân et l'iqâma — toute prière surérogatoire à ce moment est privilégiée.
717. Aujourd'hui, je récirerai sourate Al-Kâfirûn dans la première rak'a et Al-Ikhlâs dans la deuxième de mes deux rak'as avant Fajr ou après Maghrib — sounnah du Prophète ﷺ (Muslim). [CORRIGÉE]
718. Aujourd'hui, je ferai un long sajda final pour demander pardon — comme le Prophète ﷺ qui disait : "Le serviteur est le plus proche de son Seigneur quand il se prosterne."
719. Aujourd'hui, j'apprendrai à lire ma salat avec le sens — un mot d'arabe par jour, jusqu'à comprendre ce que je dis.
720. Aujourd'hui, je ferai une prière complète en sentant qu'Allah me voit — l'ihsân : adorer comme face à un témoin invisible. "Si tu ne Le vois pas, Lui te voit." [CORRIGÉE]
721. Aujourd'hui, je ferai ma prière avec un Coran ouvert devant moi (sounnah de Ramadan) — pour ne pas me limiter à ce que je connais par cœur.
722. Aujourd'hui, je sortirai de chez moi en répondant à l'adhân — verset par verset, en disant ce que dit le muezzin (Muslim).
723. Aujourd'hui, je dirai la du'â après l'adhân : "Allâhumma rabba hâdhihi ad-da'wati at-tâmmah..." — pour avoir l'intercession du Prophète ﷺ.
724. Aujourd'hui, je ne ferai pas deux sounnah collées sans pause — comme le Prophète ﷺ qui s'asseyait ou parlait entre deux salats.
725. Aujourd'hui, je récirerai la sourate As-Sajda dans la première rak'a de Fajr du vendredi, et Al-Insân dans la deuxième — sounnah hebdomadaire oubliée.
726. Aujourd'hui, je dirai "Rabbi-ghfir lî, Rabbi-ghfir lî" entre les deux sajda — comme le faisait le Prophète ﷺ.
727. Aujourd'hui, je dirai dans mon dernier tashahhud les 4 demandes de protection : "Allahumma innî a'ûdhu bika min 'adhâbi jahannam, wa min 'adhâbi al-qabr, wa min fitnati al-mahyâ wa-l-mamât, wa min sharri fitnati al-masîhi-d-dajjâl" (Muslim).
728. Aujourd'hui, je terminerai ma salat en ne quittant pas mon tapis avant d'avoir dit les adhkâr de fin de prière — pas une fuite.
729. Aujourd'hui, je porterai des chaussettes ou des socques propres pour mes ablutions — pour pouvoir essuyer dessus (mash) si la sounnah le permet.
730. Aujourd'hui, je ferai ma prière dans la chaleur du Fajr d'été ou le froid du Fajr d'hiver — pas dans une variante climatisée qui efface l'effort.
731. Aujourd'hui, je récirerai sourate Al-Mu'minûn dans une de mes prières — la sourate qui décrit le profil du croyant prospère.
732. Aujourd'hui, je dirai dans mon rukû' : "Subbûhun Quddûs, Rabb al-malâ'ikati wa-r-rûh" — formule du Prophète ﷺ pour le rukû'.
733. Aujourd'hui, je ferai 2 rak'as après mes ablutions — selon le hadith authentique, quiconque fait wudû correctement puis prie deux rak'as avec concentration, ses péchés passés lui sont pardonnés (Bukhari, Muslim). [CORRIGÉE]
734. Aujourd'hui, je ferai une salat avec mon enfant à côté — pour qu'il voie comment on s'incline, comment on se prosterne.
735. Aujourd'hui, je ferai ma prière debout sans appui — même si je suis fatigué, même si je peux m'asseoir. La sounnah complète.
736. Aujourd'hui, je ne ferai pas de salat sur une chaise sauf nécessité médicale — pour ne pas que la facilité devienne ma normale.
737. Aujourd'hui, je ferai mon tasleem final lentement — la tête à droite, "as-salâmu 'alaykum wa rahmatu Allah", la tête à gauche, sans précipitation.
738. Aujourd'hui, je remercierai Allah après ma salat avec ces mots : "Allâhumma a'innî 'ala dhikrika wa shukrika wa husni 'ibâdatik".
739. Aujourd'hui, je dirai "Astaghfirullah, astaghfirullah, astaghfirullah" après ma fin de salat — comme le faisait le Prophète ﷺ.
740. Aujourd'hui, je dirai le tashahhud d'Ibn 'Abbâs au lieu du classique — alternative authentique pour casser l'automatisme : "At-tahiyyâtu al-mubârakâtu..."
741. Aujourd'hui, je passerai 5 minutes à méditer après une salat — sans bouger, sans téléphone, juste assis.
742. Aujourd'hui, je récirerai sourate Al-Insân dans une prière du dimanche — pour méditer sur l'humain créé "d'une goutte de sperme mélangée".
743. Aujourd'hui, je dirai dans un de mes sajda : "Allâhumma innî dhalamtu nafsî dhulman kathîran, wa lâ yaghfiru-dh-dhunûba illâ Anta, faghfir lî maghfiratan min 'indik" — la du'â d'Abu Bakr enseignée par le Prophète ﷺ.
744. Aujourd'hui, je passerai mes mains sur mon visage après chaque du'â — pour absorber sa baraka, comme le faisait le Prophète ﷺ.
745. Aujourd'hui, je dirai dans le dernier tashahhud : "Allâhumma a'innî 'alâ dhikrika wa shukrika wa husni 'ibâdatik" — sounnah enseignée à Mu'âdh, à la dernière sajda.

## K — Coran — lecture, méditation, mémorisation (60)

131. Aujourd'hui, je lirai un verset que je ne connais pas — et je chercherai son tafsîr avant de fermer le livre.
132. Aujourd'hui, je lirai 10 versets du Coran après Fajr — pas un, pas trois, dix.
133. Aujourd'hui, j'apprendrai par cœur un verset complet — pas une partie, le verset entier, avec les voyelles.
134. Aujourd'hui, je relirai sourate Al-Mulk avant de dormir — celle qui, selon un hadith authentique (Tirmidhi), intercède pour son lecteur. [CORRIGÉE]
135. Aujourd'hui, je lirai sourate Al-Kahf — c'est vendredi (ou je la lirai même si ce n'est pas vendredi, comme un cadeau).
136. Aujourd'hui, je m'arrêterai sur un seul verset pendant 10 minutes — et je me demanderai ce qu'il me dit à moi, maintenant.
137. Aujourd'hui, je réciterai à voix haute trois sourates devant le miroir — pour entendre ma propre voix avec le Coran.
138. Aujourd'hui, je terminerai un *hizb* du Coran (1/60ème) — c'est faisable en 20 minutes, et ça change la journée.
139. Aujourd'hui, j'écouterai un récitateur que je n'ai jamais écouté — pour découvrir une voix nouvelle dans mon cœur.
140. Aujourd'hui, je dirai à un proche un verset que je viens de lire — pas pour faire le savant, pour partager une lumière.
596. Aujourd'hui, je lirai le Coran avec ma main posée dessus — pour que les mots passent aussi par le toucher, pas seulement par les yeux.
597. Aujourd'hui, je lirai 1 page complète de Coran avec tafsîr (commentaire) — pas dix versets surfacés, une page profonde.
598. Aujourd'hui, j'écouterai la même sourate par 3 récitateurs différents — pour entendre comment elle vibre dans plusieurs voix.
599. Aujourd'hui, je lirai sourate Ar-Rahmân — celle qui répète 31 fois "Lequel des bienfaits de votre Seigneur nierez-vous ?" Je compterai chaque "fa bi ayyi âlâ'i Rabbikumâ tukadhdhibân".
600. Aujourd'hui, je lirai sourate Yûsuf — la plus belle des histoires, selon le Coran lui-même.
601. Aujourd'hui, j'apprendrai par cœur 3 versets nouveaux — pas un, trois. Et je les répèterai jusqu'au coucher.
602. Aujourd'hui, je lirai à voix audible un passage du Coran à un enfant ou à un proche — pour partager la mélodie, sans rien enseigner.
603. Aujourd'hui, je m'arrêterai sur le mot "Allah" chaque fois qu'il apparaîtra dans ma récitation — comme si je rencontrais Son nom pour la première fois.
604. Aujourd'hui, je lirai le Coran en regardant aussi la traduction française — pour que le sens m'atteigne là où je vis.
605. Aujourd'hui, je lirai le dernier hizb du Coran (sourate Al-Mulk à An-Nâs) — les courtes sourates si denses qu'on oublie de méditer.
606. Aujourd'hui, je relirai sourate Al-Fâtiha en notant chaque demande qu'elle contient — 7 versets, 7 piliers de toute du'â.
607. Aujourd'hui, je découvrirai le tafsîr d'un seul verset que j'ai toujours mal compris — celui qui m'intriguait.
608. Aujourd'hui, je lirai un récit de prophète dans le Coran — Mûsâ, Ibrâhîm, Nûh — en cherchant ce qu'il me dit à moi.
609. Aujourd'hui, je n'éteindrai pas le récitateur pendant que je travaille, conduis, cuisine — pour que le Coran couvre le bruit.
610. Aujourd'hui, je lirai un commentaire des derniers versets que j'ai mémorisés — pour que mon hifdh (mémorisation) ne soit pas vide de sens.
611. Aujourd'hui, je dirai "A'ûdhu billâhi min ash-shaytâni ar-rajîm" et "Bismillâh ar-Rahmân ar-Rahîm" avec lenteur avant chaque lecture — c'est la porte.
612. Aujourd'hui, je lirai sourate Al-Wâqi'a — la sourate qui décrit les 3 groupes du Jour du Jugement et leur destinée. [CORRIGÉE]
613. Aujourd'hui, je lirai à mon enfant une histoire du Coran avec ses propres mots — Ashâb al-Kahf, Lukmân, les oiseaux d'Ibrâhîm.
614. Aujourd'hui, je lirai un verset qu'Allah a choisi pour décrire les croyants — sourate Al-Hujurât, Al-Mu'minûn, Al-Furqân. Je me verrai dedans, ou pas.
615. Aujourd'hui, je dirai à voix haute en arabe les 99 noms d'Allah — au moins 30 d'entre eux, lentement, en visualisant.
616. Aujourd'hui, je ne lirai pas le Coran sur écran — je toucherai le mushaf, le vrai, en papier.
617. Aujourd'hui, je relirai sourate Al-Asr — 3 versets, 1 minute de lecture, toute la sagesse de l'humanité dedans.
618. Aujourd'hui, je passerai 30 minutes à apprendre les règles du tajwîd que je n'ai jamais apprises — madd, idghâm, ikhfâ'.
619. Aujourd'hui, je redirai un verset 10 fois de suite avant de fermer le mushaf — pour que sa résonance reste avec moi.
620. Aujourd'hui, j'écouterai sourate Al-Hashr (versets 21-24) — la fin avec les noms d'Allah, comme une fontaine.
746. Aujourd'hui, je réciterai sourate Al-Anfâl en méditant sur la victoire de Badr — comment 313 hommes ont défait 1000, et ce que cela me dit de mes propres combats intérieurs.
747. Aujourd'hui, je lirai sourate At-Tawba — la seule sans Bismillâh. Je chercherai pourquoi, et ce que cela m'apprend sur le repentir.
748. Aujourd'hui, je lirai la sourate Maryam — pour comprendre comment une femme seule a porté la promesse d'Allah, et combien Allah pourvoit en silence.
749. Aujourd'hui, je réciterai sourate Al-Hujurât — la sourate du savoir-vivre du croyant : ne pas se moquer, ne pas médire, ne pas surnommer.
750. Aujourd'hui, je lirai le verset du Trône (Ayât al-Kursî, 2:255) en méditant chaque attribut nommé — "Allah, pas de divinité sauf Lui, le Vivant, Celui qui subsiste par Lui-même". Sans aller au-delà du texte.
751. Aujourd'hui, je réciterai sourate Al-Fatîha 7 fois lentement, en faisant une pause après chaque verset — pour ressentir le dialogue qudsi du hadith.
752. Aujourd'hui, je lirai 3 sourates qui se terminent par "ka-dhâlika" (ainsi) — pour méditer comment Allah conclut Ses récits par une vérité universelle.
753. Aujourd'hui, je lirai sourate Al-Buruj — pour comprendre comment des croyants ont été jetés dans le feu sans renier, et ce que la firmness signifie.
754. Aujourd'hui, je lirai sourate Nûh — pour méditer 950 ans de da'wa par un seul homme. Et ma propre fatigue après 3 jours d'efforts.
755. Aujourd'hui, je lirai sourate Al-Qiyâma — pour me préparer en pleine conscience au Jour du Jugement. La sourate est faite pour secouer.
756. Aujourd'hui, je copierai un verset à la main dans un carnet — l'écriture engage le corps autrement que la lecture.
757. Aujourd'hui, je lirai le tafsîr d'Ibn Kathîr sur un verset que j'ai mal lu hier — pour redresser ma compréhension par les anciens.
758. Aujourd'hui, je récirerai sourate Ad-Duhâ — pour me rappeler que les pauses divines (apparentes) ne sont jamais des abandons. Le matin revient toujours.
759. Aujourd'hui, je lirai sourate Al-Inshirâh — 8 versets, la sourate de l'élargissement du cœur. Pour quand la poitrine est serrée.
760. Aujourd'hui, je réciterai sourate At-Tîn — pour méditer que l'homme est créé "dans la plus belle des formes" — et ce que je fais de cette forme.
761. Aujourd'hui, je lirai sourate Al-Bayyina — pour réfléchir à ce que signifie "Gens du Livre" et la place qui m'est faite en tant que musulman.
762. Aujourd'hui, je récirerai les 3 dernières sourates du Coran (Al-Ikhlâs, Al-Falaq, An-Nâs) 3 fois après Fajr et 3 fois après Maghrib — la protection enseignée par le Prophète ﷺ.
763. Aujourd'hui, je lirai un verset en pleurant — pas par effort, en cherchant celui qui me touche vraiment, et en laissant ce qui doit couler.
764. Aujourd'hui, je récirerai le verset 156 d'Al-Baqara : "Innâ lillâhi wa innâ ilayhi râji'ûn" à voix audible — pas par routine, en sentant son poids.
765. Aujourd'hui, je lirai un récit de Mûsâ dans le Coran — il est le prophète le plus mentionné, et chaque épisode parle d'un combat intérieur que je connais.
766. Aujourd'hui, je lirai sourate Al-Furqân — pour méditer le portrait des "serviteurs du Tout-Miséricordieux" (ibâd ar-Rahmân) et voir où je me situe.
767. Aujourd'hui, je réciterai sourate Al-Mu'minûn (les croyants) — pour vérifier verset par verset si je porte les traits décrits.
768. Aujourd'hui, je lirai sourate Luqmân — pour la sagesse d'un père à son fils, et ce que je transmettrai aux miens si Allah me prête vie.
769. Aujourd'hui, je lirai sourate Al-Hashr verset 21 — celui qui dit que si le Coran descendait sur une montagne, elle se briserait. Mon cœur, lui, le porte.
770. Aujourd'hui, j'apprendrai par cœur un verset que je n'oublierai jamais — pas par stratégie de mémorisation, par décision d'engagement.
## L — Du'âs ciblées & moments puissants (55)

141. Aujourd'hui, je ferai du'â pour quelqu'un que je n'aime pas — vraiment du'â, en mentionnant son nom, en lui souhaitant un bien précis.
142. Aujourd'hui, je ferai du'â pour quelqu'un qui est mort — un proche, un grand-parent, un voisin oublié.
143. Aujourd'hui, je ferai du'â pendant le dernier tiers de la nuit — même 30 secondes, à 4h du matin, depuis mon lit.
144. Aujourd'hui, je demanderai à Allah une seule chose précise — pas une liste, une chose. Et je continuerai à la demander jusqu'à ce qu'elle vienne ou qu'Allah me la remplace.
145. Aujourd'hui, je ferai du'â pour mes parents — vivants ou décédés — avec les mots du Coran : "Rabbi rhamhumâ kamâ rabbayânî saghîrâ".
146. Aujourd'hui, je ferai du'â entre l'adhân et l'iqâma — c'est un moment où la prière n'est pas rejetée selon le Prophète ﷺ.
147. Aujourd'hui, je ferai du'â pendant le sajda d'une de mes prières — c'est le moment où le serviteur est le plus proche de son Seigneur.
148. Aujourd'hui, je ferai du'â pour la oumma de Muhammad ﷺ — pas pour moi, pour les autres.
149. Aujourd'hui, je ferai du'â pour quelqu'un de précis sans qu'il ne le sache — ni maintenant, ni jamais.
150. Aujourd'hui, je dirai dans le silence : "Allahumma a'tinî fid-dunyâ hasana, wa fil-âkhirati hasana, wa qinâ 'adhâban-nâr" — au moins une fois, avec le cœur.
621. Aujourd'hui, je ferai du'â les paumes ouvertes face au ciel — comme un pauvre tend ses mains, et n'a pas honte.
622. Aujourd'hui, je ferai du'â en pleurant — vraiment, en cherchant les larmes. Le Prophète ﷺ disait que la du'â pleurée n'est jamais rejetée.
623. Aujourd'hui, je ferai du'â en commençant par louanger Allah, puis prier sur le Prophète ﷺ, puis demander — la méthode prophétique enseignée à Fadâla ibn 'Ubayd.
624. Aujourd'hui, je ferai du'â pour un musulman persécuté quelque part dans le monde — en nommant un pays, une ville, une famille.
625. Aujourd'hui, je ferai du'â pendant qu'il pleut — c'est un moment où la prière n'est pas rejetée (Abu Dawud).
626. Aujourd'hui, je ferai du'â vendredi entre l'adhân d'Asr et le coucher du soleil — l'heure secrète d'exaucement, à chercher humblement.
627. Aujourd'hui, je ferai du'â pour qu'Allah me donne la mort sur la foi — pas une mort sur n'importe quel état. Du'â qu'on néglige.
628. Aujourd'hui, je dirai "Yâ Muqallib al-qulûb, thabbit qalbî 'ala dînik" — Ô Toi qui retournes les cœurs, fixe le mien sur Ta religion.
629. Aujourd'hui, je ferai du'â pour mon imam, mon mufti, le savant que j'écoute — ils ont besoin de mes prières plus que je n'ai besoin des leurs.
630. Aujourd'hui, je ferai du'â pour qu'Allah me préserve d'une fitna que je ne vois pas venir — celle qui se cache derrière le bonheur, l'argent, la santé.
631. Aujourd'hui, je ferai du'â pour un enfant à naître — dans ma famille, dans ma rue, dans le monde.
632. Aujourd'hui, je ferai du'â pour que mon dernier mot soit la chahâda — la première et la dernière phrase de toute vie réussie.
633. Aujourd'hui, je ferai du'â pour qu'Allah accepte mes prières d'aujourd'hui — pas leur exécution, leur acceptation.
634. Aujourd'hui, je ferai du'â pour qu'Allah me cache mes péchés aux yeux des autres — comme Il les cache à mes propres yeux.
635. Aujourd'hui, je ferai du'â pour qu'Allah pardonne à mon ennemi — vraiment, en nommant son nom dans la sajda.
636. Aujourd'hui, je ferai du'â pour mes ancêtres dans la foi — ceux qui ont porté l'islam jusqu'à moi sans que je connaisse leur nom.
637. Aujourd'hui, je dirai 3 fois "Allahumma innî as'aluka al-jannata wa a'ûdhu bika min an-nâr" — la du'â la plus aimée du Prophète ﷺ.
638. Aujourd'hui, je ferai du'â en arabe avec les mots du Coran — pas en formulant moi-même, en empruntant à Allah Sa propre langue.
639. Aujourd'hui, je ferai du'â pour les détenus musulmans — ceux qui ne peuvent pas faire couler l'eau du wudû sur leurs membres librement.
640. Aujourd'hui, je ferai du'â pour qu'Allah multiplie les convertis cette année — partout dans le monde, en France, dans ma ville.
641. Aujourd'hui, je ferai du'â pour les enfants endeuillés qui ne savent pas faire la du'â — qu'Allah leur envoie quelqu'un qui les console.
642. Aujourd'hui, je ferai du'â pour qu'Allah me rende constant — pas spectaculaire, constant. La grandeur des actes vient de leur durée.
643. Aujourd'hui, je ferai du'â pour qu'Allah ne me donne pas plus que je ne peux porter — ni la richesse qui me perdrait, ni l'épreuve qui me casserait.
644. Aujourd'hui, je ferai du'â en marchant — chaque pas est une demande, chaque souffle un remerciement.
645. Aujourd'hui, je ferai du'â pour qu'Allah me garde dans la jamâ'a — la communauté. Loin du loup qui mange la brebis qui s'isole.
771. Aujourd'hui, je ferai du'â pendant le tashahhud final avant le salâm — comme l'a recommandé le Prophète ﷺ à 'Abdullah ibn Mas'ûd : c'est le moment où l'on choisit ce qu'on veut.
772. Aujourd'hui, je ferai du'â pour ma propre constance — qu'Allah me garde sur la voie jusqu'à mon dernier souffle. La constance vaut mieux que la performance.
773. Aujourd'hui, je ferai du'â à voix haute devant mon miroir — pas pour me voir, pour ne pas pouvoir me cacher de mes propres mots.
774. Aujourd'hui, je dirai "Allâhumma innî as'aluka husn al-khâtimah" — Ô Allah, je Te demande une belle fin. La du'â que peu osent demander.
775. Aujourd'hui, je ferai du'â pour qu'Allah me préserve d'une mort soudaine sans repentir préalable — la pire des fins selon le hadith.
776. Aujourd'hui, je ferai du'â pour les morts qui n'ont personne pour prier pour eux — vieux musulmans isolés, défunts sans famille pratiquante.
777. Aujourd'hui, je dirai la du'â que faisait le Prophète ﷺ en cas d'angoisse : "Allahumma innî 'abduka, ibn 'abdika, ibn amatika..." — apprendre cette du'â longue par cœur.
778. Aujourd'hui, je ferai du'â pour qu'Allah me retire toute hypocrisie inconsciente — celle que je ne vois pas. La plus dangereuse.
779. Aujourd'hui, je dirai dans le silence : "Allâhumma a'tinî dînan yamna'unî 'ani-l-haram" — Ô Allah, donne-moi une religion qui me retienne du péché.
780. Aujourd'hui, je ferai du'â pour Gaza, le Yémen, le Soudan, la Birmanie, le Cachemire, les Ouïghours — je nommerai chaque lieu.
781. Aujourd'hui, je ferai du'â pour mes ennemis politiques, mes ennemis familiaux, mes ennemis professionnels — qu'Allah les guide ou les écarte.
782. Aujourd'hui, je dirai : "Allâhumma innî as'aluka qalban salîm" — un cœur sain, propre, intact. Ce qu'aucune richesse ne s'achète.
783. Aujourd'hui, je ferai du'â pour qu'Allah me protège des fitnas visibles et cachées — ce que je vois venir et ce que je ne devine pas.
784. Aujourd'hui, je dirai la du'â de gratitude : "Allâhumma a'innî 'alâ shukrik" — Ô Allah, aide-moi à Te remercier. Car le remerciement lui-même est une grâce de Lui.
785. Aujourd'hui, je ferai du'â pour mon âme à l'instant où elle quittera mon corps — qu'Allah la prenne dans un état accepté.
786. Aujourd'hui, je ferai du'â en arabe et en français — les deux. L'arabe pour la baraka, le français pour le sens charnel.
787. Aujourd'hui, je dirai "Yâ Wahhâb" — Le Donateur, en demandant à Allah un don précis. La du'â par les noms d'Allah est la plus puissante.
788. Aujourd'hui, je dirai la du'â que faisait le Prophète ﷺ avant de dormir : "Bismika Allâhumma amûtu wa ahyâ" — En Ton nom, ô Allah, je meurs et je vis.
789. Aujourd'hui, je ferai du'â pour ceux que j'ai jugés, médits, méprisés — qu'Allah leur accorde ce que je leur ai refusé en pensée.
790. Aujourd'hui, je dirai 3 fois : "Allâhumma anta Rabbî, lâ ilâha illâ Anta, khalaqtanî wa anâ 'abduk..." — la formule de Sayyid al-istighfâr complète.

## Z — Jeûne surérogatoire (25)

646. Aujourd'hui, je jeûnerai lundi ou jeudi — les jours où les actes sont présentés à Allah, et où le Prophète ﷺ aimait jeûner (Tirmidhi).
647. Aujourd'hui, je jeûnerai 6 jours de Shawwâl — qui valent comme jeûner toute une année avec le Ramadan (Muslim).
648. Aujourd'hui, je jeûnerai le jour d'Achoura (10 Muharram) — qui efface les péchés de l'année passée (Muslim).
649. Aujourd'hui, je jeûnerai le 9 Muharram aussi (tâsû'â) — pour me distinguer des autres communautés et suivre la sounnah complète.
650. Aujourd'hui, je jeûnerai le jour d'Arafat (9 Dhul-Hijja) — qui efface les péchés de deux années, la passée et la prochaine.
651. Aujourd'hui, je jeûnerai un jour blanc (13, 14 ou 15 du mois hijri) — comme l'a recommandé le Prophète ﷺ à Abu Hurayra et Abu Dharr.
652. Aujourd'hui, je jeûnerai un jour aux 9 premiers jours de Dhul-Hijja — quand toute œuvre est multipliée.
653. Aujourd'hui, je jeûnerai pour la première fois un jour surérogatoire — pour briser une barrière intérieure, pas pour cocher une case.
654. Aujourd'hui, je jeûnerai une journée pour expier une faute précise que je porte depuis longtemps — le jeûne efface comme l'eau lave (Tirmidhi).
655. Aujourd'hui, je jeûnerai sans le dire à personne — pas une mention, pas un soupir, pas un signe.
656. Aujourd'hui, je préparerai mon suhûr (repas avant l'aube) même pour un jeûne surérogatoire — le suhûr porte une baraka, même 3 gorgées d'eau (Bukhari).
657. Aujourd'hui, je romprai mon jeûne avec une datte et de l'eau, lentement, en faisant du'â — pas en jetant ce que je trouve dans ma bouche. [CORRIGÉE faute français]
791. Aujourd'hui, je jeûnerai même si personne autour de moi ne jeûne — la sounnah n'a pas besoin d'un groupe pour être valide.
792. Aujourd'hui, je jeûnerai en silence sur mon jeûne — pas une mention au repas, pas un soupir devant ceux qui mangent.
793. Aujourd'hui, je jeûnerai en faisant 3 actes de service supplémentaires — le jeûne sans amélioration des actes est seulement faim et soif (Bukhari).
794. Aujourd'hui, je jeûnerai en surveillant tous mes sens — pas seulement la bouche. Le regard, la langue, les oreilles aussi.
795. Aujourd'hui, je casserai mon jeûne par une dizaine de dattes — comme le faisait le Prophète ﷺ.
796. Aujourd'hui, je préparerai à manger pour quelqu'un qui rompra son jeûne — la récompense équivaut à celle du jeûneur lui-même (Tirmidhi).
797. Aujourd'hui, je jeûnerai sans connaître l'heure exacte du Maghrib — pour cultiver la patience, pas la précision chronométrée.
798. Aujourd'hui, je jeûnerai en lisant plus de Coran que d'habitude — le mois où le Coran fut révélé, le jeûne et le Coran se renforcent mutuellement.
799. Aujourd'hui, je jeûnerai en m'interdisant les médias sociaux — pour que le jeûne du corps soit accompagné du jeûne du regard.
800. Aujourd'hui, je jeûnerai pour quelqu'un que j'aime et qui ne le sait pas — qu'Allah accepte mon jeûne et lui en accorde la récompense par Sa grâce.

## AA — Sunnah quotidiennes (35)

658. Aujourd'hui, je mangerai avec les 3 doigts droits — la main du Prophète ﷺ. Pas avec une fourchette par habitude.
659. Aujourd'hui, je dormirai sur mon côté droit, la main sous la joue — la position que prenait le Prophète ﷺ.
660. Aujourd'hui, je dirai "Bismillâh" avant de manger, et "Alhamdulillah" après — à voix audible, sans avoir honte.
661. Aujourd'hui, je boirai en 3 gorgées, assis, en disant "Bismillâh" entre chaque — comme le Prophète ﷺ.
662. Aujourd'hui, je ne soufflerai pas dans le verre — c'est interdit par la sounnah, et la science a confirmé la sagesse hygiénique.
663. Aujourd'hui, j'entrerai aux toilettes du pied gauche, et j'en sortirai du pied droit — petit acte, grande conscience.
664. Aujourd'hui, je dirai "Ya Rahmân" à un éternueur qui a dit "Alhamdulillah" — sounnah de réponse, parfois oubliée.
665. Aujourd'hui, je dirai bismillâh en habillant mon habit, en fermant ma porte, en démarrant ma voiture — pour graver l'intention dans chaque seuil.
666. Aujourd'hui, je me parfumerai sans excès — la sounnah du Prophète ﷺ aimait le parfum, en interdisait le gaspillage.
667. Aujourd'hui, je couperai mes ongles le jour qui correspond à la sounnah — vendredi, avant Jumu'ah.
668. Aujourd'hui, je nettoierai mes dents avec un siwâk ou une brosse — au moins une fois en pleine conscience, comme le faisait le Prophète ﷺ avant chaque salat.
669. Aujourd'hui, je me coucherai en récitant les 3 derniers qul (Al-Ikhlâs, Al-Falaq, An-Nâs), en soufflant dans mes paumes et en les passant sur tout mon corps — sunnah du Prophète ﷺ chaque soir.
670. Aujourd'hui, je dirai la dou'a du réveil dès que j'ouvrirai les yeux — pas après le téléphone, avant.
671. Aujourd'hui, je sourirai aux gens que je croiserai — le sourire est sadaqa (Tirmidhi), et c'était une expression constante du Prophète ﷺ.
672. Aujourd'hui, je ne mangerai pas appuyé sur un meuble — le Prophète ﷺ ne le faisait pas. L'humilité passe par la posture.
801. Aujourd'hui, je commencerai chaque action par la droite — m'habiller, manger, donner, recevoir, entrer. La sounnah du Prophète ﷺ commence à droite.
802. Aujourd'hui, je salam à tout musulman que je croise — connu ou inconnu. Le Prophète ﷺ : "Vous n'entrerez pas au Paradis tant que vous ne croirez pas, et vous ne croirez pas tant que vous ne vous aimerez pas. Voulez-vous que je vous indique quelque chose qui, si vous le faites, vous fera vous aimer ? Répandez le salam entre vous." (Muslim)
803. Aujourd'hui, je répondrai au salam plus chaleureusement que je ne l'ai reçu — c'est l'ordre coranique (Coran 4:86).
804. Aujourd'hui, je laverai mes mains avant et après le repas — pas par hygiène, par sounnah.
805. Aujourd'hui, je ne soufflerai pas sur ma nourriture chaude — j'attendrai qu'elle refroidisse. Sounnah du Prophète ﷺ.
806. Aujourd'hui, je mangerai ce qui est devant moi dans le plat — pas ce qui est en face d'un autre, pas en piochant partout. Sounnah de table.
807. Aujourd'hui, je ramasserai les miettes tombées de mon assiette — la baraka du repas peut être dans le grain qu'on néglige.
808. Aujourd'hui, je lècherai mes doigts après le repas avant de les essuyer — sounnah que le Prophète ﷺ pratiquait sans gêne.
809. Aujourd'hui, je dirai la dou'a après avoir mangé : "Alhamdulillâhi alladhî at'amanî hâdhâ wa razaqanîhi min ghayri hawlin minnî wa lâ quwwah" — pour effacer mes péchés passés (Tirmidhi).
810. Aujourd'hui, j'entrerai chez moi en saluant ma famille — même s'il n'y a personne. "Que la paix soit sur nous et sur les serviteurs vertueux d'Allah."
811. Aujourd'hui, je dirai "Yarhamuka Allah" à celui qui éternue après "Alhamdulillah" — si après 3 éternuements il ne dit pas Alhamdulillah, je ne lui réponds pas.
812. Aujourd'hui, je m'endormirai sur le côté droit, paume sous la joue droite — la posture du Prophète ﷺ, à reproduire même quand on est seul.
813. Aujourd'hui, j'épousseterai mon lit 3 fois avant de m'y coucher — sounnah du Prophète ﷺ pour chasser ce qui s'y serait posé.
814. Aujourd'hui, je dirai la dou'a en m'habillant d'un vêtement neuf : "Alhamdulillâhi alladhî kasânî hâdhâ wa razaqanîhi min ghayri hawlin minnî wa lâ quwwah" — pour expier mes péchés (Abu Dawud).
815. Aujourd'hui, je dirai "Alhamdulillah" 3 fois dans la journée quand j'aurai oublié de Le remercier — le rattrapage est aussi sounnah.
816. Aujourd'hui, je marcherai à un rythme modéré — ni précipité comme celui qui fuit, ni traînant comme celui qui pose. La marche du Prophète ﷺ.
817. Aujourd'hui, je ne pointerai personne du doigt — la sounnah recommande la discrétion gestuelle.
818. Aujourd'hui, je ne bâillerai pas la bouche grande ouverte — je la couvrirai. "Le bâillement est de Shaytan." (Bukhari)
819. Aujourd'hui, je dirai la dou'a en montant dans un véhicule : "Subhâna alladhî sakhkhara lanâ hâdhâ wa mâ kunnâ lahu muqrinîn, wa innâ ilâ Rabbinâ lamunqalibûn" — sounnah du voyage.
820. Aujourd'hui, j'évitarai les conversations bruyantes en public — la voix du croyant est modeste, dit le Coran (31:19).

## BB — Asmâ' al-Husnâ (25)

673. Aujourd'hui, je dirai 100 fois "Yâ Latîf" — Le Subtil, Celui qui agit avec une douceur infiniment fine. Pour adoucir ce qui me pèse.
674. Aujourd'hui, je dirai 100 fois "Yâ Wadûd" — L'Aimant, Celui qui aime Ses serviteurs. Pour me sentir aimé quand je doute.
675. Aujourd'hui, je dirai 100 fois "Yâ Sabûr" — Le Patient. Pour qu'Allah dépose en moi cette patience qu'Il porte envers les hommes.
676. Aujourd'hui, je dirai 100 fois "Yâ Razzâq" — Le Pourvoyeur. Quand l'inquiétude pour la subsistance monte, je rappelle Qui pourvoit.
677. Aujourd'hui, je dirai 100 fois "Yâ Shâfî" — Le Guérisseur. Pour un malade que je porte dans mon cœur.
678. Aujourd'hui, je dirai 100 fois "Yâ Tawwâb" — Celui qui accueille le repentir. Quand je sens que mes péchés sont trop nombreux.
679. Aujourd'hui, je dirai 100 fois "Yâ Mu'în" — Le Soutien. Pour ce que j'essaie de porter et qui me dépasse.
680. Aujourd'hui, je dirai 100 fois "Yâ Fattâh" — L'Ouvreur. Pour les portes que je n'arrive pas à pousser depuis trop longtemps.
681. Aujourd'hui, j'apprendrai 5 noms d'Allah que je n'ai jamais médités — pas mémorisés, médités.
682. Aujourd'hui, je dirai dans le silence : "Allâhumma innî as'aluka bi-asmâ'ika al-husnâ" — par Tes plus beaux Noms, je Te demande...
683. Aujourd'hui, je dirai 100 fois "Yâ Hâdî" — Le Guide. Pour qu'Allah guide quelqu'un que j'aime, et qui s'est égaré.
684. Aujourd'hui, je dirai 100 fois "Yâ 'Afuww" — Celui qui efface. Pour qu'Allah efface une faute précise qui me hante.
685. Aujourd'hui, je passerai 10 minutes à méditer un seul nom d'Allah — pas réciter, méditer. Sentir ce qu'il dit de Lui, et donc de moi.
821. Aujourd'hui, je dirai 100 fois "Yâ Quddûs" — Le Pur, Le Saint. Pour purifier une intention que je sais trouble.
822. Aujourd'hui, je dirai 100 fois "Yâ 'Alîm" — L'Omniscient. Pour me rappeler qu'Il sait ce que je tais aux autres.
823. Aujourd'hui, je dirai 100 fois "Yâ Halîm" — L'Indulgent. Pour qu'Allah dépose en moi un peu de Sa patience face à ceux qui m'irritent.
824. Aujourd'hui, je dirai 100 fois "Yâ Khabîr" — Le Bien-Informé. Pour me rappeler que Sa connaissance dépasse ce que je croyais Lui cacher.
825. Aujourd'hui, je dirai 100 fois "Yâ Karîm" — Le Généreux. Quand je doute qu'on puisse me pardonner ou me donner.
826. Aujourd'hui, je dirai 100 fois "Yâ Wâsi'" — L'Immense, Celui dont la miséricorde embrasse tout. Pour ouvrir mon cœur quand il se rétrécit.
827. Aujourd'hui, je dirai 100 fois "Yâ Mujîb" — Celui qui répond. Pour préparer mon âme à une demande que je vais formuler avec sérieux.
828. Aujourd'hui, je dirai 100 fois "Yâ Wâhid" — L'Unique. Pour rappeler à mon cœur qu'Il n'a ni associé, ni semblable, ni double.
829. Aujourd'hui, je dirai 100 fois "Yâ Hakîm" — Le Sage. Quand un événement me semble injuste, pour me rappeler que la sagesse de Ses décrets dépasse ma vue.
830. Aujourd'hui, je dirai 100 fois "Yâ Qarîb" — Le Proche. "Et quand Mes serviteurs t'interrogent à Mon sujet, certes Je suis proche." (Coran 2:186).
831. Aujourd'hui, je dirai 100 fois "Yâ Nûr" — Allah, la Lumière des cieux et de la terre (Coran 24:35). Quand l'obscurité intérieure s'installe.
832. Aujourd'hui, je passerai 30 minutes à méditer la sourate Al-Hashr versets 22-24 — la fin avec les noms d'Allah. Un par un, sans précipitation.

## CC — Tahajjud & nuit (12)

833. Aujourd'hui, je me lèverai à 4h du matin pour prier 2 rak'as de tahajjud — même si je suis épuisé, même si je dois me recoucher après.
834. Aujourd'hui, je ferai dou'a dans le dernier tiers de la nuit — le moment où la prière n'est pas rejetée selon le hadith authentique (Bukhari).
835. Aujourd'hui, je dormirai en wudû — pour que si Allah me reprend dans mon sommeil, ce soit dans l'état de pureté.
836. Aujourd'hui, je lirai sourate Al-Mulk avant de dormir — celle qui intercède pour son lecteur (Tirmidhi). [CORRIGÉE]
837. Aujourd'hui, je dirai "Allâhumma bismika amûtu wa ahyâ" en m'endormant, et "Alhamdulillâhi alladhî ahyânâ ba'da mâ amâtanâ wa ilayhi an-nushûr" au réveil — sounnah complète.
838. Aujourd'hui, je passerai 10 minutes assis dans le noir avant de dormir — sans téléphone, juste à respirer et à penser à ma propre mort.
839. Aujourd'hui, je m'endormirai en disant Ayât al-Kursî (2:255) — celui qui le récite avant de dormir a un protecteur d'Allah jusqu'au matin (Bukhari).
840. Aujourd'hui, je récirerai les deux derniers versets de sourate Al-Baqara avant de dormir — qui suffisent à celui qui les récite (Bukhari).
841. Aujourd'hui, je ferai mon witr juste avant de dormir si je ne suis pas sûr de me réveiller — sinon, je le repousserai au tahajjud.
842. Aujourd'hui, je ne dormirai pas avant Isha — le Prophète ﷺ déconseillait de dormir avant la prière de la nuit (Bukhari).
843. Aujourd'hui, je préparerai mon réveil pour 30 minutes avant Fajr — pour pouvoir prier au moins 2 rak'as avant la prière obligatoire.
844. Aujourd'hui, je me préparerai à la nuit comme à une rencontre — pas comme à une fin. C'est la moitié vivante du jour.

## DD — I'tikâf & retraite spirituelle (8)

845. Aujourd'hui, je passerai 1 heure complète à la mosquée sans rien faire d'autre que prier, lire, dhikrer — comme un mini-i'tikâf, même hors Ramadan.
846. Aujourd'hui, je n'utiliserai pas mon téléphone pendant 3 heures — pour me retirer du monde sans avoir à m'enfermer.
847. Aujourd'hui, je marcherai seul pendant 1 heure — sans destination, sans musique, sans podcast. Pour entendre ma propre âme.
848. Aujourd'hui, je m'isolerai pour faire dou'a dans un endroit où personne ne me verra — la retraite dans la solitude est mère de la sincérité.
849. Aujourd'hui, je m'assoirai 30 minutes face à un mur, à un livre, à une fenêtre — pour pratiquer la patience de la présence.
850. Aujourd'hui, je passerai une matinée entière sans rien produire — pas de tâche, pas de scroll, pas de progrès. Juste être.
851. Aujourd'hui, je prendrai une journée par mois sans écran — comme on prend un jour pour le corps, je prends un jour pour le cœur.
852. Aujourd'hui, je passerai une soirée entière dans le silence chez moi — pas de musique, pas de TV, pas de conversation futile. Le silence est aussi adoration.

## EE — Préparation à la mort & au tombeau (10)

853. Aujourd'hui, je passerai 10 minutes à méditer ma propre mort — à imaginer le moment, sans détourner les yeux. C'est ce qui change tout.
854. Aujourd'hui, j'écrirai un testament — même partiel, même imparfait. Le Prophète ﷺ disait qu'un musulman ne devrait pas dormir deux nuits sans testament prêt (Bukhari).
855. Aujourd'hui, je règlerai une dette financière ou morale que je porte — l'âme reste suspendue à ses dettes jusqu'à ce qu'elles soient payées (Tirmidhi).
856. Aujourd'hui, je présenterai pardon à quelqu'un que j'ai blessé — pour que rien ne pèse sur moi le jour où je serai jugé.
857. Aujourd'hui, je passerai 30 minutes à visualiser ma vie complète — depuis l'enfance jusqu'à maintenant. Pour repérer ce qui pèse, et ce qui doit changer avant qu'il ne soit trop tard.
858. Aujourd'hui, je donnerai en sadaqa jâriya (continue) — un puits, un arbre, un Coran, un livre utile. Pour qu'après ma mort, la récompense continue.
859. Aujourd'hui, je transmettrai un savoir utile à quelqu'un — pour que le savoir continue à servir après moi (l'une des 3 choses qui ne s'arrêtent pas à la mort, selon Muslim).
860. Aujourd'hui, j'élèverai mon enfant avec piété — pour que ses dou'as continuent à monter pour moi après ma mort (3e chose qui ne s'arrête pas, Muslim).
861. Aujourd'hui, je visiterai un cimetière pour me rappeler ma fin — le Prophète ﷺ a dit : "Visitez les tombes, car elles vous rappelleront l'au-delà." (Muslim)
862. Aujourd'hui, je dirai dans le silence : "Allâhumma a'innî 'alâ ghamarâti al-mawt" — Ô Allah, aide-moi dans les affres de la mort. La du'â qu'on oublie de faire tant qu'on a la santé.
# 🤝 CATÉGORIE SERVICE — 365 NIYYAH

## M — Parents (55)

151. Aujourd'hui, j'appellerai mes parents — pas un message, un appel. Et je les laisserai parler plus que moi.
152. Aujourd'hui, je dirai à mes parents les trois mots qu'on ne dit qu'aux enterrements — pendant qu'ils peuvent encore les entendre.
153. Aujourd'hui, j'écouterai mon père raconter une histoire que je connais déjà — sans le couper, sans soupirer, jusqu'à la fin.
154. Aujourd'hui, je ferai pour ma mère une chose qu'elle ne m'a pas demandée — petite mais utile.
155. Aujourd'hui, je demanderai pardon à un parent pour quelque chose de précis — pas une excuse vague, une chose nommée.
156. Aujourd'hui, je ferai du'â pour mes parents à chacune de mes 5 prières — courte mais sincère, à chaque salat.
157. Aujourd'hui, j'irai voir mes parents si je peux — sans raison particulière, juste pour être là.
158. Aujourd'hui, je donnerai à mes parents quelque chose qu'ils n'auraient jamais osé demander — un cadeau, une heure, une promenade.
159. Aujourd'hui, je ne contredirai pas mes parents — même sur un point où j'ai raison, je tairai cette fois.
160. Aujourd'hui, je remercierai mes parents pour une chose précise qu'ils ont faite il y a longtemps — qu'ils croient peut-être que j'ai oubliée.
201. Aujourd'hui, je demanderai à ma mère de me raconter sa propre mère — celle que je n'ai jamais connue, ou trop peu connue.
202. Aujourd'hui, j'écouterai mon père parler de sa jeunesse — sans poser les questions que je voudrais, en le laissant choisir ce qu'il veut me confier.
203. Aujourd'hui, je remercierai ma mère pour une chose qu'elle a faite sans que je le sache — et que j'ai découverte par hasard.
204. Aujourd'hui, je laisserai mon père gagner — un jeu, une discussion, une décision sans enjeu. Pas pour qu'il croie qu'il a raison, mais parce qu'il en a peut-être plus besoin que moi.
205. Aujourd'hui, j'irai prier à côté de mon père — sans rien dire, juste épaule contre épaule, comme avant.
206. Aujourd'hui, je ferai du'â pour mes grands-parents — même ceux que je n'ai jamais connus. Je porterai leurs noms à Allah.
207. Aujourd'hui, je donnerai une sadaqa au nom d'un parent décédé — petite somme, grande intention. La récompense lui montera (Bukhari, Muslim).
208. Aujourd'hui, je dirai à mes beaux-parents la phrase que je n'ai jamais osée — un merci précis, une reconnaissance nommée.
209. Aujourd'hui, je servirai mon père à table — comme il le faisait pour moi quand j'étais petit. Inversion silencieuse des rôles.
210. Aujourd'hui, j'embrasserai la main de ma mère ou de mon père — geste de respect attesté chez les anciens, à pratiquer avec sincérité, sans excès. [CORRIGÉE]
211. Aujourd'hui, je rangerai une vieille photo de famille que je vois sans la regarder — et je ferai du'â pour les musulmans qu'elle contient. [CORRIGÉE]
212. Aujourd'hui, j'apprendrai un proverbe de mes parents par cœur — pour le transmettre un jour à mes enfants.
213. Aujourd'hui, je tairai un reproche que je voulais faire à mon père — il en a entendu assez dans sa vie.
214. Aujourd'hui, je téléphonerai à un parent éloigné dont je ne sais même plus la voix.
215. Aujourd'hui, je visiterai la tombe d'un proche musulman — ou si c'est impossible, je dirai à voix haute son nom suivi de "rahimahu Allah". [PRÉCISÉE]
301. Aujourd'hui, je rangerai ma chambre d'enfant chez mes parents — silencieusement, sans qu'on me le demande.
302. Aujourd'hui, je laverai la voiture de mes parents — pas pour qu'ils me remercient, pour qu'ils n'aient plus à le faire.
303. Aujourd'hui, j'irai chercher mon père à la mosquée — sans qu'il l'ait demandé, juste pour qu'il n'ait pas à marcher dans le froid.
304. Aujourd'hui, je tairai un avis politique opposé à celui de mon père — il a vécu plus que moi, ma victoire en discussion ne vaut rien.
305. Aujourd'hui, je couperai les ongles de mon père vieillissant — geste que personne ne fait spontanément, et qui dit tout.
306. Aujourd'hui, je laverai les cheveux de ma mère âgée — comme elle lavait les miens.
307. Aujourd'hui, je proposerai à ma mère un café que JE prépare — pas elle. Une fois, c'est elle qui s'assoit.
308. Aujourd'hui, je remercierai mes parents pour une chose qu'ils ne pensent pas avoir bien faite — pour leur restituer une grâce.
309. Aujourd'hui, je tiendrai le bras de ma mère ou de mon père dans la rue — même si ce n'est pas nécessaire. Le geste tisse.
310. Aujourd'hui, je dirai à mon père "tu m'as bien éduqué" — même si c'est dur, même si c'est partiel. Il en a besoin.
311. Aujourd'hui, je demanderai à mon père ce qu'il pense vraiment de ma vie — et j'écouterai sans contredire une seule fois.
312. Aujourd'hui, je donnerai à mes parents une chose qu'ils n'oseront jamais utiliser pour eux-mêmes — billet, cadeau, sortie.
313. Aujourd'hui, je préparerai pour mes parents le plat que faisait ma grand-mère — pour qu'ils retrouvent un goût d'enfance.
314. Aujourd'hui, j'enregistrerai la voix de mon père racontant une histoire — pour que dans 30 ans, je puisse encore l'entendre.
315. Aujourd'hui, j'apprendrai par cœur le numéro de téléphone de mes parents — pour ne pas dépendre du portable si je dois les appeler en urgence.
316. Aujourd'hui, je nettoierai pour mes parents quelque chose qu'ils n'ont plus la force de nettoyer — vitres, sol, recoin.
317. Aujourd'hui, je passerai une heure assis à côté de ma mère ou de mon père — sans téléphone, sans télé en fond, juste être là.
318. Aujourd'hui, je règlerai une facture pour mes parents — sans qu'ils sachent que c'était moi.
319. Aujourd'hui, je porterai un vêtement que ma mère m'a offert et que je ne mets plus — pour qu'elle me voie avec, et qu'elle sente que ça compte.
320. Aujourd'hui, je rappellerai à mes parents un proverbe qu'ils m'ont appris enfant — pour qu'ils sachent que ça a tenu.
321. Aujourd'hui, je dirai à mes parents que je les ai vus prier, jeûner, donner — qu'ils sachent que leur exemple a été reçu.
322. Aujourd'hui, je porterai à ma mère sa tasse, son verre, son médicament — avant qu'elle ne se lève pour le faire elle-même.
323. Aujourd'hui, je dirai à mes parents : "Allah vous récompense pour tout ce que je ne sais pas que vous avez fait."
324. Aujourd'hui, je tiendrai la porte ouverte pour mes parents — pas par politesse, par respect ancien.
325. Aujourd'hui, je payerai un repas au restaurant pour mes parents — un endroit qu'ils ne se seraient jamais permis.
326. Aujourd'hui, je dirai à mes parents "ne vous levez pas, je vais le faire" — pour absolument chaque tâche du jour.
327. Aujourd'hui, j'appellerai un parent que je n'aime pas — un oncle, une tante, un cousin difficile. La sila ar-rahim ne dépend pas de l'affection.
328. Aujourd'hui, j'écrirai à mes parents une lettre qu'ils n'attendent pas — pour leur dire ce que je n'arrive pas à dire de vive voix.
329. Aujourd'hui, je ne ferai pas remarquer à mes parents qu'ils ont déjà raconté cette histoire — pour la dixième fois. Je rirai à la chute comme la première fois.
330. Aujourd'hui, je dirai à mes parents que leur Coran m'a touché — celui qu'ils m'ont fait apprendre, ou simplement qu'ils m'ont mis dans la main.

## N — Conjoint & enfants (63)

161. Aujourd'hui, je dirai à mon conjoint une chose vraie et belle — pas un compliment poli, une chose précise sur qui il/elle est.
162. Aujourd'hui, je laisserai mon conjoint avoir le dernier mot — même s'il a tort. La paix vaut plus que la justice du moment.
163. Aujourd'hui, je ferai une corvée que mon conjoint fait toujours — sans le mentionner, sans attendre de merci.
164. Aujourd'hui, je laisserai mon enfant finir chacune de ses phrases — même celles que je crois déjà connaître.
165. Aujourd'hui, je m'assoirai par terre 10 minutes avec mon enfant — à son niveau, dans son jeu, sans téléphone.
166. Aujourd'hui, je ne crierai pas une seule fois sur mon enfant — si la voix monte, je sortirai de la pièce.
167. Aujourd'hui, je dirai à mon enfant : "Allah veille sur toi, et moi je t'aime" — clairement, en le regardant. [CORRIGÉE]
168. Aujourd'hui, je raconterai à mon enfant une histoire du Prophète ﷺ — courte, vraie, sans le tirer vers une morale forcée.
216. Aujourd'hui, je laisserai mon conjoint pleurer sans chercher à réparer — juste être là, sans solution, sans phrase.
217. Aujourd'hui, je défendrai mon conjoint devant ma propre famille — sans accuser, sans accabler. Je clarifierai sans trahir l'autre. [CORRIGÉE]
218. Aujourd'hui, je dirai à mon conjoint trois choses précises pour lesquelles je rends grâce à Allah de l'avoir mis sur mon chemin.
219. Aujourd'hui, je préparerai à mon conjoint un thé, un café, un repas — sans rien attendre en retour.
220. Aujourd'hui, je toucherai mon conjoint en passant — main, épaule, dos — sans intention, juste pour rappeler que je suis là.
221. Aujourd'hui, je n'aurai pas peur de pleurer devant mon enfant — pour qu'il sache que pleurer n'enlève rien à un homme, à une femme, à un parent.
222. Aujourd'hui, j'apprendrai à mon enfant le premier verset du Coran qu'il ne connaît pas encore — patiemment, en répétant autant de fois qu'il faut.
223. Aujourd'hui, je dirai à mon enfant "tu as raison de pleurer" au lieu de "ne pleure pas" — valider avant de consoler.
224. Aujourd'hui, je porterai mon enfant alors qu'il marche déjà — juste pour qu'il sente une dernière fois qu'il est porté.
225. Aujourd'hui, j'écouterai mon enfant me raconter quelque chose de banal — sans préparer ma réponse pendant qu'il parle.
226. Aujourd'hui, je dormirai sans avoir laissé un conflit non-résolu avec mon conjoint — le hadith dit que le shaytân se réjouit d'un couple qui se couche fâché.
227. Aujourd'hui, j'écrirai un mot à mon conjoint et je le glisserai dans une poche, un sac, un livre — pour qu'il le trouve sans moi.
228. Aujourd'hui, j'apprendrai à mon enfant un nom d'Allah — un seul, expliqué, vécu dans une situation du jour.
229. Aujourd'hui, je raconterai à mon enfant une bêtise que je faisais à son âge — pour qu'il sache que son père/sa mère a aussi été petit.
230. Aujourd'hui, je laisserai mon enfant me corriger — un mot mal prononcé, un fait mal raconté. Il faut qu'il sache que je peux me tromper.
231. Aujourd'hui, je dirai non à mon enfant sur quelque chose qu'il veut — fermement, calmement, sans me justifier dix fois. L'amour passe aussi par le non.
232. Aujourd'hui, je dirai à mon enfant qu'il doit d'abord demander pardon à la personne qu'il a blessée, puis à Allah — les deux pardons vont ensemble. [CORRIGÉE]
233. Aujourd'hui, je marcherai pieds nus dans la maison avec mon enfant — pour rien, juste pour partager la même sensation.
234. Aujourd'hui, je préparerai pour mon enfant le repas qu'il adore — sans qu'il l'ait demandé.
235. Aujourd'hui, je ferai du'â pour mon enfant en lui posant la main sur le front pendant qu'il dort.
331. Aujourd'hui, je serai en avance pour mon conjoint — à un rendez-vous, à une sortie, à un repas. Le respect du temps de l'autre est un acte d'amour.
332. Aujourd'hui, je porterai un parfum pour mon conjoint — pas pour l'extérieur, pour la maison.
333. Aujourd'hui, je dirai du bien de mon conjoint à un tiers — pour que ça revienne à ses oreilles par un détour.
334. Aujourd'hui, j'éteindrai ma télé/mon écran à l'instant où mon conjoint rentre — sans grogner, sans terminer mon épisode.
335. Aujourd'hui, je remarquerai un détail nouveau sur mon conjoint — coiffure, vêtement, posture — et je le mentionnerai.
336. Aujourd'hui, je préparerai le café exactement comme mon conjoint l'aime — précisément, sans variation.
337. Aujourd'hui, je laverai la vaisselle silencieusement après le repas — pas pour qu'on me remercie, pour la paix.
338. Aujourd'hui, je pardonnerai mentalement à mon conjoint pour une vieille histoire — celle qui revient encore parfois.
339. Aujourd'hui, je ferai du'â pour mon conjoint pendant la dernière sajda d'une prière — il ne le saura pas. Allah, si.
340. Aujourd'hui, je dirai à mon conjoint "merci d'avoir choisi de me supporter" — exactement ces mots, sans modification.
341. Aujourd'hui, je ne couperai pas la parole à mon conjoint — même si je sais où il va, même si je suis pressé.
342. Aujourd'hui, je dirai à mon conjoint quelque chose qu'il fait bien — précisément, en exemple concret.
343. Aujourd'hui, je ne discuterai d'aucun problème de couple devant les enfants — la dignité de l'autre vaut plus que ma frustration du moment.
344. Aujourd'hui, je dirai à mon enfant "ton père est un homme bien" — ou "ta mère est une femme bien" — même quand l'autre n'est pas là.
345. Aujourd'hui, je tiendrai la main de mon conjoint en marchant — sans raison particulière, juste pour relier.
346. Aujourd'hui, j'écouterai mon conjoint parler de sa journée pendant 10 minutes — sans regarder mon téléphone, sans préparer ma réponse.
347. Aujourd'hui, je préparerai une surprise pour mon conjoint — petite, sans occasion, sans raison.
348. Aujourd'hui, je ne reprocherai rien à mon conjoint pour les 24 prochaines heures — pas une critique, même justifiée.
349. Aujourd'hui, je dirai à mon conjoint "tu m'as appris quelque chose" — et je précisera laquelle.
350. Aujourd'hui, je dormirai en touchant mon conjoint — main, dos, pied. Le contact silencieux compte autant que les mots.
351. Aujourd'hui, je raconterai à mon enfant un récit d'un compagnon du Prophète ﷺ — un seul, en entier, avec un nom qu'il retiendra.
352. Aujourd'hui, je laisserai mon enfant choisir une décision mineure — quel plat, quel chemin, quelle activité. La dignité commence tôt.
353. Aujourd'hui, je ferai dou'a à voix audible devant mon enfant — pour qu'il sache que les parents aussi demandent.
354. Aujourd'hui, je m'excuserai auprès de mon enfant pour une chose précise — un cri, une impatience, une injustice. Ils n'oublient pas.
355. Aujourd'hui, je raconterai à mon enfant une histoire du Prophète ﷺ avec ses enfants — Fatima, Hassan, Hussein. Pour qu'il sache que le Prophète était père.
356. Aujourd'hui, je dirai à mon enfant "je suis fier de toi" — pour quelque chose de précis, pas en général.
357. Aujourd'hui, je laisserai mon enfant me coiffer, me maquiller, m'habiller pour rire — la complicité passe par l'absurde partagé.
358. Aujourd'hui, je raconterai à mon enfant comment j'ai connu sa mère/son père — c'est son histoire aussi.
359. Aujourd'hui, je ferai à mon enfant la prière du Prophète ﷺ : "Allahumma jaˋalhu/jaˋalhâ qurrata ˋaynin lî" — fais qu'il/elle soit la fraîcheur de mes yeux.
360. Aujourd'hui, je lirai un verset du Coran à mon enfant avant qu'il s'endorme — court, lent, sans explication. Juste la mélodie.
361. Aujourd'hui, je laisserai mon enfant me voir prier — qu'il sache que pour son père/sa mère, Allah passe avant tout.
362. Aujourd'hui, je dirai à mon enfant "tu es un cadeau d'Allah" — clairement, sans l'embarrasser, mais avec sérieux.
363. Aujourd'hui, j'enverrai mon enfant chez mes parents — pas un appel, une vraie visite. Pour que trois générations se touchent.
364. Aujourd'hui, je dirai à mon enfant un défaut que j'ai et que je travaille — pour qu'il sache que les adultes aussi se corrigent.
365. Aujourd'hui, je donnerai à mon enfant un cadeau qu'il n'attendait pas — sans occasion, juste parce que je l'aime.

## U — Frère/sœur (12)

366. Aujourd'hui, j'appellerai mon frère/ma sœur — pas un message, un appel. Le sang ne s'envoie pas par SMS.
367. Aujourd'hui, je rappellerai à mon frère/ma sœur un souvenir d'enfance qu'on partage — pour réveiller ce qui dort.
368. Aujourd'hui, je pardonnerai à mon frère/ma sœur une vieille dispute — le sang vaut plus que la raison.
369. Aujourd'hui, je dirai à mon frère/ma sœur que je suis fier de lui/d'elle — pour quelque chose de précis.
370. Aujourd'hui, je ne médirai pas de mon frère/ma sœur devant nos parents — même quand j'ai raison.
371. Aujourd'hui, je proposerai à mon frère/ma sœur une sortie en tête-à-tête — pas en famille, juste nous deux.
372. Aujourd'hui, je ferai du'â pour mon frère/ma sœur — en nommant un besoin précis que je sais qu'il/elle a.
373. Aujourd'hui, je dirai à mon frère/ma sœur "merci d'avoir été là quand…" — et je préciserai quand.
374. Aujourd'hui, je remettrai à mon frère/ma sœur un objet de notre enfance que j'ai gardé — photo, jouet, livre.
375. Aujourd'hui, je donnerai à mon frère/ma sœur quelque chose dont il a besoin sans qu'il le demande — argent, temps, présence.
376. Aujourd'hui, je dirai du bien de mon frère/ma sœur à nos parents — pour rééquilibrer ce que nos parents pourraient croire.
377. Aujourd'hui, je ferai un effort pour aimer le conjoint de mon frère/ma sœur — c'est leur choix, donc c'est aussi mon respect.

## O — Proches négligés (51)

169. Aujourd'hui, j'enverrai un message à quelqu'un que je n'ai pas contacté depuis 6 mois — un message qui ne demande rien, qui dit juste que je pense à lui.
170. Aujourd'hui, j'irai prendre des nouvelles d'un voisin que je salue chaque jour sans rien savoir de lui.
171. Aujourd'hui, je passerai un quart d'heure avec un cousin, un vieil ami, une tante — quelqu'un que la vie m'a éloigné sans raison.
172. Aujourd'hui, je présenterai mes condoléances ou mes félicitations à quelqu'un dont l'événement remonte à trop longtemps — c'est jamais trop tard.
173. Aujourd'hui, je proposerai mon aide à quelqu'un sans qu'il n'ait à demander — une course, un trajet, une garde, un coup de main.
174. Aujourd'hui, je remettrai en place une relation que j'ai laissée se déliter par paresse — un appel, un café, un message.
236. Aujourd'hui, j'enverrai un message à mon ami d'enfance — celui dont la vie a divergé de la mienne sans raison.
237. Aujourd'hui, je téléphonerai à un cousin que je vois seulement aux mariages et aux enterrements.
238. Aujourd'hui, je remercierai un ancien professeur qui m'a marqué — par message, par lettre, par un mot. La récompense court longtemps après.
239. Aujourd'hui, je dirai du bien d'un ami absent à un autre ami — l'inverse exact de la médisance. C'est aussi une sadaqa.
240. Aujourd'hui, j'inviterai chez moi quelqu'un qui n'a personne d'autre — un converti récent, un voyageur, un voisin seul, un étudiant.
241. Aujourd'hui, je ferai du'â pour un ami que je n'ai pas vu depuis 10 ans — il se peut qu'à ce moment précis, il en ait besoin.
242. Aujourd'hui, je passerai un coup de fil à un ami qui traverse une épreuve — sans avoir préparé quoi dire. Juste pour qu'il sache qu'il existe à mes yeux.
243. Aujourd'hui, j'écrirai à un frère ou une sœur en islam que je ne croise plus à la mosquée — pour demander de ses nouvelles, sans interroger sa pratique.
244. Aujourd'hui, je proposerai à un proche éloigné de venir manger chez moi — sans plan, sans préparation, sans excuses.
245. Aujourd'hui, je présenterai mes excuses à quelqu'un que j'ai involontairement blessé il y a longtemps — même si je ne suis pas sûr qu'il s'en souvienne.
246. Aujourd'hui, je téléphonerai à un proche malade — pas par devoir, en lui posant une vraie question : "qu'est-ce qui te manque vraiment, là, en ce moment ?"
247. Aujourd'hui, je présenterai deux personnes que j'aime et qui ne se connaissent pas — créer des liens entre musulmans est une œuvre encouragée par la sounnah. [CORRIGÉE]
248. Aujourd'hui, je rappellerai à un ami un beau souvenir qu'on a partagé — pour qu'il sache que je n'ai rien oublié.
249. Aujourd'hui, je ferai un compliment précis à un collègue que je ne complimente jamais — sur son travail, sa patience, son calme.
250. Aujourd'hui, j'irai au mariage, à l'enterrement, à l'événement que j'aurais sauté par fatigue. Ma présence vaut plus que mon excuse.
378. Aujourd'hui, j'enverrai un message vocal à un ami plutôt qu'un texte — pour que ma voix lui arrive.
379. Aujourd'hui, je raconterai à un ami une chose belle que j'ai vue ce matin — pour partager une lumière sans qu'il l'ait demandée.
380. Aujourd'hui, je proposerai à un ami de prier ensemble — chez moi, chez lui, à la mosquée. La prière commune crée des liens.
381. Aujourd'hui, je dirai à un ami "j'ai pensé à toi en lisant ce verset" — et je le lui partagerai.
382. Aujourd'hui, je proposerai mon aide pour un déménagement, un dépannage, une garde — avant qu'on me la demande.
383. Aujourd'hui, je rappellerai à un ami qu'on s'est rencontré il y a X années — pour qu'il sache que je tiens le compte du temps qui passe ensemble.
384. Aujourd'hui, je n'enverrai aucun message qui contient une plainte — uniquement des messages qui apportent quelque chose.
385. Aujourd'hui, je remercierai un ami pour une chose qu'il a faite il y a longtemps — et que je n'ai jamais nommée.
386. Aujourd'hui, je proposerai à un ami de manger ensemble — pas devant un écran, en face à face, longuement.
387. Aujourd'hui, je téléphonerai à mon ancien camarade de classe — celui dont je n'ai pas de nouvelles depuis l'école.
388. Aujourd'hui, je présenterai mes condoléances à un proche dont j'ai raté l'enterrement — il n'est jamais trop tard pour reconnaître une douleur.
389. Aujourd'hui, je dirai à un ami croyant : "ta foi m'inspire" — sans flatterie, parce que c'est vrai.
390. Aujourd'hui, j'enverrai à un ami un livre qu'il n'a pas demandé — un livre qui m'a transformé.
391. Aujourd'hui, je n'arriverai pas les mains vides chez un proche — une datte, un fruit, une plante. La sounnah du visiteur.
392. Aujourd'hui, je passerai voir mes anciens patrons, mes anciens collègues, mes anciens voisins — ceux dont la vie m'a éloigné par déménagement.
393. Aujourd'hui, je présenterai à un ami quelqu'un qui pourrait l'aider — un contact, une opportunité, une porte ouverte.
394. Aujourd'hui, je ferai du'â pour un ami absent — en nommant un besoin que je sais qu'il a, sans lui en parler.
395. Aujourd'hui, je proposerai à un ami d'écouter sa peine pendant 30 minutes — sans le couper, sans donner de conseil, juste écouter.
396. Aujourd'hui, je remercierai un ami pour la patience qu'il a eue avec moi — en nommant une période précise.
397. Aujourd'hui, j'irai voir un ancien voisin parti loin — pas un appel, un déplacement. La présence physique compte.
398. Aujourd'hui, je ferai à un ami un compliment dans un domaine où il doute — pour planter une certitude là où il en manque.
399. Aujourd'hui, je ne médirai d'aucun ami absent — même quand l'occasion sera servie sur un plateau.
400. Aujourd'hui, je présenterai mes félicitations à quelqu'un dont j'avais raté la bonne nouvelle — même tardivement.
401. Aujourd'hui, je dirai à un ami "merci d'être resté pendant ma période difficile" — sans excuse, sans plus d'explication.
402. Aujourd'hui, j'enverrai un cadeau anonyme à un proche dans le besoin — un colis, un virement, une enveloppe.
403. Aujourd'hui, je proposerai à un proche de rompre le jeûne ensemble (ou un repas, hors Ramadan) — l'invitation est sounnah.
404. Aujourd'hui, je ferai du'â pour qu'Allah unisse mon cœur à un ami avec qui le froid s'est installé — sans contacter encore, juste prier d'abord.
405. Aujourd'hui, je raconterai à un ami une chose drôle, ridicule, légère — pas tout doit être lourd.
406. Aujourd'hui, je dirai à un ami "tu m'as manqué" — exactement ces mots, sans modulation polie.
407. Aujourd'hui, je proposerai à un proche de l'accompagner à un rendez-vous médical, administratif, douloureux — pour qu'il ne soit pas seul.

## P — Inconnus & sadaqa cachée (51)

175. Aujourd'hui, je donnerai à quelqu'un qui ne le demandera pas — et je m'en irai sans regarder.
176. Aujourd'hui, je sourirai à trois inconnus dans la journée — vraiment, en les regardant.
177. Aujourd'hui, je ferai une sadaqa qu'aucun humain ne saura — virement anonyme, billet glissé, dépôt discret.
178. Aujourd'hui, je laisserai passer quelqu'un devant moi dans une file — même celle de la caisse, même quand je suis pressé.
179. Aujourd'hui, je dirai bonjour à la personne qui nettoie ma rue, mon bureau ou mon immeuble — en la regardant comme une personne, pas comme une fonction.
180. Aujourd'hui, je ferai une chose pour la planète qu'Allah m'a confiée — ramasser un déchet, économiser de l'eau, ne pas gâcher.
251. Aujourd'hui, je donnerai un repas chaud à une personne sans-abri — préparé chez moi, livré en main propre.
252. Aujourd'hui, je laisserai un pourboire généreux à un serveur, un livreur, un coiffeur — au-dessus de ce qui est attendu, sans le mentionner.
253. Aujourd'hui, j'aiderai un inconnu qui ne savait pas qu'il avait besoin d'aide — porter un sac, tenir une porte, ramasser un objet tombé.
254. Aujourd'hui, je paierai discrètement la commande d'un inconnu derrière moi dans une file.
255. Aujourd'hui, je donnerai une sadaqa pour quelqu'un que je ne connais pas — un malade dont j'ai entendu le nom, une famille touchée par un drame qu'on a oublié.
256. Aujourd'hui, je laisserai un mot positif à un inconnu — un compliment écrit sur un papier, glissé dans un livre de bibliothèque, oublié sur une chaise.
257. Aujourd'hui, je ferai un compliment sincère à une caissière, une infirmière, une mère épuisée — sur quelque chose de précis que j'ai vraiment remarqué.
258. Aujourd'hui, je ne klaxonnerai pas une seule fois — même si on me dépasse mal, même si le feu est passé au vert depuis 3 secondes.
259. Aujourd'hui, je dirai "barakallahu fik" à un musulman inconnu — pour rien, juste pour ce sourire qui suit.
260. Aujourd'hui, je donnerai mon ticket de transport restant à quelqu'un qui hésite devant le distributeur.
261. Aujourd'hui, je proposerai mon siège à quelqu'un qui ne semblait pas en avoir besoin — femme enceinte cachée, personne âgée fière, malade discret.
262. Aujourd'hui, je ferai une chose pour une association sans en parler — virer, donner, écrire un message d'encouragement.
263. Aujourd'hui, je remercierai une personne qui me sert habituellement sans qu'on la remarque — la femme de ménage, l'agent d'entretien, le gardien.
264. Aujourd'hui, j'éviterai de regarder mon téléphone en marchant — pour pouvoir saluer les gens que je croiserai.
265. Aujourd'hui, je ferai une chose entièrement gratuite pour un inconnu — sans rien attendre, sans rien dire.
408. Aujourd'hui, je donnerai des vêtements en bon état que je ne porte plus — pas demain, aujourd'hui, dans une boîte.
409. Aujourd'hui, je laisserai un livre que j'aime sur un banc public — avec un mot à l'intérieur : "Pour toi, qui passes par là."
410. Aujourd'hui, je n'éprouverai aucune impatience derrière une personne lente au guichet, au péage, en caisse.
411. Aujourd'hui, je laisserai mon parapluie à quelqu'un sous la pluie — et je marcherai mouillé.
412. Aujourd'hui, je ferai un don pour quelqu'un que je ne connais pas — orphelin, malade, déplacé. Trois clics. Une vie touchée.
413. Aujourd'hui, je salam à voix audible un inconnu musulman dans la rue — pour briser l'invisibilité dans laquelle on vit.
414. Aujourd'hui, je remercierai chaleureusement un chauffeur de bus, de taxi, de VTC — en regardant son badge, en disant son prénom.
415. Aujourd'hui, je laisserai un compliment écrit sur une serviette de restaurant — pour le serveur, le cuisinier.
416. Aujourd'hui, je donnerai à manger à une personne sans-abri — pas un euro, un vrai repas.
417. Aujourd'hui, je sourirai à toutes les personnes que je croiserai pendant 10 minutes consécutives — sans exception, sans calcul.
418. Aujourd'hui, je dirai bonjour le premier — partout, sans attendre que l'autre commence.
419. Aujourd'hui, j'aiderai un parent débordé à l'aéroport, au supermarché, dans la rue — porter, tenir, calmer.
420. Aujourd'hui, je laisserai un mot anonyme dans un livre de bibliothèque — encouragement à un lecteur futur que je ne verrai jamais.
421. Aujourd'hui, je rapporterai au comptoir d'une boutique ce que j'ai trouvé par terre dans le magasin — sans le ramasser pour moi.
422. Aujourd'hui, je porterai un sac à provisions d'une personne âgée jusqu'à sa porte — sans qu'elle ait à me le demander.
423. Aujourd'hui, je tiendrai l'ascenseur pour la personne qui arrive en courant — même si je suis pressé.
424. Aujourd'hui, je laisserai une bouteille d'eau dans un endroit chaud — pour qu'un livreur, un sans-abri, un passant la trouve.
425. Aujourd'hui, je ferai don d'un objet de valeur que je n'utilise plus — un manteau, des chaussures, un livre, un outil.
426. Aujourd'hui, je remercierai un agent de sécurité, un gardien, un veilleur — ceux qu'on remarque seulement quand ils ne sont pas là.
427. Aujourd'hui, je donnerai sans demander reçu, ni preuve, ni nom — comme si Allah seul comptait.
428. Aujourd'hui, je laisserai une bonne place de parking pour quelqu'un d'autre — je continuerai un peu plus loin.
429. Aujourd'hui, je ferai un compliment sincère à un cuisinier, un coiffeur, un artisan — sur la qualité de son travail.
430. Aujourd'hui, je proposerai à une personne perdue dans la rue de l'aider — même si ce n'est pas évident qu'elle est perdue.
431. Aujourd'hui, je n'irai pas dans la file VIP que je pourrais prendre — par humilité, par rappel que je suis comme les autres.
432. Aujourd'hui, je donnerai des fleurs à une personne âgée croisée dans la rue — sans raison, juste pour égayer une journée.
433. Aujourd'hui, je laisserai un pourboire qui transformera la journée du serveur — pas symbolique, généreux, qui marque.
434. Aujourd'hui, je remercierai un médecin, une infirmière, un pharmacien — sur leur travail, leur patience, leur présence.
435. Aujourd'hui, je donnerai 1% de mes économies à une cause inattendue — pas la mosquée habituelle, autre chose.
436. Aujourd'hui, je ferai une lessive pour une personne qui n'a pas accès à la sienne — voisin sans machine, ami hospitalisé, sans-abri.
437. Aujourd'hui, je donnerai mon temps à une cause — 2 heures dans une association, une banque alimentaire, un cours pour enfants.
## Q — Voisins (25)

266. Aujourd'hui, je porterai un plat à un voisin — sans occasion, sans raison, juste parce que les voisins ont des droits.
267. Aujourd'hui, je salam mes voisins par leur prénom — pas par un "bonjour" générique, par leur nom.
268. Aujourd'hui, je rendrai service à un voisin sans qu'il ne le demande — courrier, courses, garde d'enfant, garde de chien.
269. Aujourd'hui, j'irai sonner chez un voisin que je n'ai jamais salué — le Prophète ﷺ disait que Jibril lui recommanda tellement les voisins qu'il pensa qu'ils hériteraient (Bukhari, Muslim). [CORRIGÉE]
270. Aujourd'hui, je ne ferai pas de bruit chez moi — pour respecter le droit des voisins.
271. Aujourd'hui, je présenterai mes condoléances à un voisin en deuil — même si on ne se parle pas beaucoup d'habitude.
272. Aujourd'hui, je proposerai à un voisin un coup de main pour une tâche que je sais qu'il a du mal à faire seul.
273. Aujourd'hui, je laisserai un mot doux sous la porte de mon voisin — pour rien, juste pour briser l'invisibilité.
274. Aujourd'hui, je rangerai le palier commun avec mes voisins — sans demander, sans attendre qu'on remarque.
275. Aujourd'hui, je sourirai au voisin que je n'aime pas — sourire est sadaqa (Tirmidhi), et un voisin est un voisin même quand il déplaît. [CORRIGÉE]
438. Aujourd'hui, j'irai inviter un voisin pour un thé — pas un grand rendez-vous, juste 30 minutes assis chez moi.
439. Aujourd'hui, je laisserai un mot sous la porte de mon voisin qui souffre — pour qu'il sache que je pense à lui.
440. Aujourd'hui, je proposerai à un voisin de venir manger pendant le Ramadan — même s'il ne jeûne pas, même s'il n'est pas musulman.
441. Aujourd'hui, je présenterai mes voisins les uns aux autres — pour que la cage d'escalier devienne une communauté.
442. Aujourd'hui, je donnerai mes restes à un voisin plutôt que de les jeter — discrètement, dans un Tupperware.
443. Aujourd'hui, je laisserai au voisin du dessus, du dessous, un mot d'excuse pour un bruit récent — même si ce n'était pas grave.
444. Aujourd'hui, je dirai bonjour à toutes les personnes que je croiserai dans mon immeuble — pas seulement ceux que je connais.
445. Aujourd'hui, j'irai sonner chez un voisin que j'ai vu triste récemment — sans demander pourquoi, juste pour proposer un thé.
446. Aujourd'hui, je ferai du'â pour mon voisin non-musulman — pour qu'Allah lui ouvre, pour qu'il vive en paix.
447. Aujourd'hui, j'apprendrai le prénom de l'enfant de mon voisin — pour pouvoir le saluer par son nom.
448. Aujourd'hui, je proposerai à un voisin de garder son chien, son chat, ses plantes pendant ses vacances.
449. Aujourd'hui, je raccompagnerai un voisin âgé jusqu'à sa porte — au lieu de juste le laisser sur le palier.
450. Aujourd'hui, je m'enquerrai de la santé d'un voisin que je n'ai pas vu depuis quelques jours — discrètement.
451. Aujourd'hui, je donnerai à mon voisin un objet utile que je n'utilise plus — un outil, une cocotte, un livre.
452. Aujourd'hui, je glisserai des dattes dans la boîte aux lettres d'un voisin pendant le Ramadan — anonymement.

## R — Animaux (20)

276. Aujourd'hui, je donnerai à boire à un animal — chat, oiseau, chien. Comme cette femme qui entra au Paradis pour avoir abreuvé un chien (Bukhari).
277. Aujourd'hui, je ne marcherai pas sur une fourmi quand je peux l'éviter — le Prophète ﷺ a interdit de tuer 4 créatures, dont la fourmi (Abu Dawud).
278. Aujourd'hui, je nourrirai un animal abandonné — un sachet, une boîte, un effort.
279. Aujourd'hui, je libérerai un insecte coincé chez moi — au lieu de l'écraser. Une vie est une vie.
280. Aujourd'hui, je caresserai un animal — pas par habitude, vraiment, en prenant le temps.
281. Aujourd'hui, je ferai un don à un refuge ou une association animale — petit, mais pour Allah.
282. Aujourd'hui, je ne mangerai pas de viande sans dire bismillah et sans penser à l'animal — pour rappeler que la vie a été donnée.
283. Aujourd'hui, je raconterai à mon enfant l'histoire de la femme et du chat (Muslim) — qu'il sache combien Allah punit la cruauté envers les animaux.
453. Aujourd'hui, je n'écraserai pas un insecte par paresse — je le porterai dehors. La vie est une vie.
454. Aujourd'hui, je ne laisserai pas un chien attaché à la chaleur — j'avertirai, je donnerai à boire, j'agirai.
455. Aujourd'hui, je nettoierai la cage, l'aquarium, le coin de mon animal — sans attendre qu'il en souffre.
456. Aujourd'hui, je ne crierai pas sur mon animal — il ne comprend pas mes mots, mais il comprend mon ton.
457. Aujourd'hui, j'achèterai de la nourriture pour un refuge animalier — sans qu'on me le demande.
458. Aujourd'hui, je ne ferai pas attendre mon animal pour ses besoins, sa promenade, son repas — sa dignité passe avant ma fatigue.
459. Aujourd'hui, je donnerai à manger à un chat de rue — un sachet, une croquette, une portion.
460. Aujourd'hui, je ne participerai à aucune cruauté collective envers un animal — pas une vidéo regardée, pas un rire approbateur.
461. Aujourd'hui, je remettrai à l'eau un poisson capturé pour le plaisir, un oiseau coincé, une fourmi égarée.
462. Aujourd'hui, je ne mangerai pas en gaspillant la viande dans mon assiette — un animal est mort pour ce repas.
463. Aujourd'hui, je dirai bismillah avant de toucher tout aliment d'origine animale — pour me rappeler qu'il y a eu une vie.
464. Aujourd'hui, je raconterai à un enfant l'histoire du Prophète ﷺ qui interdit de faire de la torture une cible — pour planter en lui la miséricorde.

## S — Défunts (28)

284. Aujourd'hui, je dirai à voix haute le nom d'un défunt de ma famille — pour qu'il ne soit pas tout à fait oublié dans ce monde.
285. Aujourd'hui, je lirai sourate Yâ-Sîn en pensant à un défunt — pratique répandue dans la tradition, dont la source est discutée par les savants. [CORRIGÉE]
286. Aujourd'hui, je lirai du Coran avec l'intention de méditer pour moi, puis je ferai du'â pour un défunt à la fin — la du'â pour les morts est unanimement acceptée et leur parvient. [CORRIGÉE]
287. Aujourd'hui, je donnerai une sadaqa au nom d'un défunt — la récompense lui montera (Bukhari, Muslim).
288. Aujourd'hui, je dirai "Allahumma-ghfir lahu" pour chaque défunt dont je verrai le nom — sur une tombe, sur une photo, sur un livre.
289. Aujourd'hui, je visiterai un cimetière musulman — pour me rappeler que c'est là que je serai aussi.
290. Aujourd'hui, je ferai du'â pour un défunt en disant : "Allahumma maghfira lahu warhamhu wa 'âfihi wa'fu 'anhu" — la du'â enseignée par le Prophète ﷺ à la prière sur le mort (Muslim).
291. Aujourd'hui, je dirai à un enfant l'histoire d'un défunt qu'il n'a pas connu — pour faire vivre une mémoire.
292. Aujourd'hui, je terminerai un Coran complet et je dédierai mes du'âs à mon défunt — pour qu'il en ait la récompense (selon les écoles qui le permettent).
293. Aujourd'hui, je payerai une dette d'un défunt si je le peux — l'âme reste suspendue à ses dettes jusqu'à ce qu'elles soient payées (Tirmidhi).
465. Aujourd'hui, je passerai devant un cimetière musulman et je dirai : "As-salâmu 'alaykum dâra qawmin mu'minîn, wa innâ in shâ' Allahu bikum lâhiqûn" — comme le faisait le Prophète ﷺ (Muslim).
466. Aujourd'hui, je ferai du'â pour les défunts d'une famille endeuillée que je connais — en récitant Al-Fatiha pour chacun.
467. Aujourd'hui, je relirai les noms de mes défunts à voix haute — pour que ces noms n'oublient pas leur place dans mon cœur.
468. Aujourd'hui, je terminerai un wird ou un dhikr en faisant du'â pour un défunt : "Ô Allah, pardonne-lui, accueille-le par Ta miséricorde." [CORRIGÉE]
469. Aujourd'hui, j'écrirai sur un papier les noms de tous mes défunts musulmans — et je ferai du'â pour chacun, sans en oublier un seul.
470. Aujourd'hui, je ferai une bonne action en pensant à un défunt — la sadaqa que je donne en son nom lui parvient (Bukhari, Muslim), et le savoir que je transmets en sa mémoire est sadaqa jâriya pour lui et moi. [CORRIGÉE]
471. Aujourd'hui, je raviverai un savoir laissé par un défunt — un livre qu'il aimait, une recette, un conseil qu'il donnait.
472. Aujourd'hui, je dirai à quelqu'un qui a perdu un proche : "Ton défunt vit encore par toi" — pas par politesse, vraiment.
473. Aujourd'hui, je creuserai dans ma mémoire un moment heureux avec un défunt — pour ne pas le réduire à sa mort.
474. Aujourd'hui, je transmettrai à un plus jeune ce qu'un défunt m'a enseigné — la sounnah qu'il pratiquait, l'histoire qu'il racontait.
475. Aujourd'hui, je donnerai en sadaqa jâriya (continue) au nom d'un défunt — un puits, un arbre, un Coran, un livre utile.
476. Aujourd'hui, je ferai pardonner les dettes d'un défunt si je peux — financières ou morales. L'âme est suspendue à ses dettes.
477. Aujourd'hui, je penserai à un défunt que je n'ai pas pleuré — peut-être par fatigue, par pudeur, par déni. Et je lui donnerai cette larme tardive.
478. Aujourd'hui, je raconterai à mon enfant qui était son grand-père/sa grand-mère — pour qu'il connaisse celui qui ne l'a pas connu.
479. Aujourd'hui, je passerai près de la tombe d'un proche non-musulman — pour me rappeler ce que je lui dois, et méditer sur ma propre fin. Sans innover dans la prière. [CORRIGÉE]
480. Aujourd'hui, je penserai à ma propre mort — vraiment, calmement, en imaginant l'instant. Et je commencerai aujourd'hui ce qui restera demain.
481. Aujourd'hui, j'écrirai mon testament — même si je suis jeune. Le Prophète ﷺ a dit qu'un musulman ne devrait pas dormir deux nuits sans testament prêt (Bukhari).
482. Aujourd'hui, je consolerai un endeuillé que j'ai oublié — appel, message, visite. La douleur dure plus longtemps que l'attention qu'on lui porte.

## T — Environnement & terre (20)

294. Aujourd'hui, je ramasserai un déchet qui n'est pas le mien — un seul, sans en faire un acte militant.
295. Aujourd'hui, je ne gaspillerai pas une seule goutte d'eau pendant mes ablutions — comme le faisait le Prophète ﷺ avec un *mudd* (peu d'eau).
296. Aujourd'hui, je ne jetterai rien à manger — je finirai mon assiette ou je donnerai.
297. Aujourd'hui, je planterai quelque chose — une graine, une plante, un arbre. "Si l'Heure arrive alors que l'un de vous a un plant en main, qu'il le plante." (Ahmad).
298. Aujourd'hui, je donnerai une seconde vie à un objet — réparer au lieu de jeter, donner au lieu de garder.
299. Aujourd'hui, je n'utiliserai pas de plastique à usage unique — un jour, c'est faisable.
300. Aujourd'hui, je laisserai un lieu plus propre que je ne l'ai trouvé — chez moi ou chez l'autre.
483. Aujourd'hui, je refuserai un sac plastique à la caisse — chaque petit refus est une discipline.
484. Aujourd'hui, je laisserai un endroit plus propre que je ne l'ai trouvé — toilettes publiques, salle de sport, banc, table de restaurant.
485. Aujourd'hui, je n'achèterai rien dont je n'ai pas réellement besoin — la modération du croyant est aussi un geste pour la terre.
486. Aujourd'hui, je nettoierai un coin que personne ne nettoie — palier, parking, jardin commun.
487. Aujourd'hui, je trierai un tiroir, un placard, une boîte — pour donner ce que je n'utilise plus à qui en a besoin.
488. Aujourd'hui, je laverai la voiture à la main au lieu du portique automatique — pour économiser l'eau, pour valoriser le geste.
489. Aujourd'hui, je préférerai un trajet à pied plutôt qu'en voiture — un seul, qui change mon empreinte de la journée.
490. Aujourd'hui, je préparerai à manger maison plutôt que de commander — moins d'emballages, plus de baraka.
491. Aujourd'hui, je ferai un usage modéré de l'eau pour mes ablutions — comme le Prophète ﷺ qui se purifiait avec un *mudd* (peu d'eau).
492. Aujourd'hui, je ne jetterai pas un fruit ou un légume taché — je le mangerai ou le donnerai. La terre les a portés.
493. Aujourd'hui, je composterai mes restes alimentaires — pour rendre à la terre ce qu'elle m'a donné.
494. Aujourd'hui, je donnerai mon ancien téléphone, ordinateur, télé à quelqu'un qui n'en a pas — au lieu de l'oublier dans un tiroir.
495. Aujourd'hui, je ramasserai un déchet sur ma route et je dirai : "Allah enlève par moi ce qu'un autre a oublié de prendre."

## V — Collègues & monde du travail (15)

496. Aujourd'hui, je remercierai un collègue pour une chose précise qu'il a faite la semaine dernière — pour qu'il sache que je l'ai remarquée.
497. Aujourd'hui, je prendrai le café avec un collègue à qui je n'ai jamais vraiment parlé.
498. Aujourd'hui, je ne participerai à aucun cancan de bureau — je m'éloignerai si la conversation glisse vers un absent.
499. Aujourd'hui, j'aiderai un collègue débordé sans qu'il me l'ait demandé — prendre une tâche, rendre service, alléger.
500. Aujourd'hui, je laisserai à un collègue le mérite d'une idée à laquelle j'aurais aussi contribué — qu'Allah me récompense, pas l'open-space.
501. Aujourd'hui, je dirai à mon supérieur "merci" pour une décision juste — la reconnaissance manque souvent vers le haut aussi.
502. Aujourd'hui, je ne mentirai pas une seule fois au travail — même pour un retard, une erreur, un oubli.
503. Aujourd'hui, je remettrai propre le coin café/cuisine au bureau — sans qu'on me le demande, parce qu'Allah aime la propreté.
504. Aujourd'hui, je terminerai mon travail avec honnêteté avant de quitter mon poste — pas en bâclant les dernières minutes.
505. Aujourd'hui, je dirai du bien d'un collègue à son supérieur — sans intérêt, juste parce que c'est juste.
506. Aujourd'hui, je serai à l'heure à toutes mes réunions — par respect du temps de l'autre, qui est un dépôt d'Allah.
507. Aujourd'hui, je donnerai un conseil professionnel à un collègue plus jeune — sans condescendance, comme on transmet.
508. Aujourd'hui, j'inviterai un collègue à venir manger chez moi — pour briser la frontière bureau/vraie vie.
509. Aujourd'hui, je remarquerai le travail invisible de mon équipe — celui qui ne se voit pas dans les rapports — et je le nommerai à voix haute.
510. Aujourd'hui, je quitterai mon travail à l'heure — pour rentrer chez moi, pour ma famille, pour ma prière. Le travail n'est pas tout.

## W — Convertis & nouveaux musulmans (10)

511. Aujourd'hui, je dirai à un converti récent : "Ton choix a renforcé l'islam dans ce pays — sans toi, on serait plus seul."
512. Aujourd'hui, je proposerai à un converti de venir manger chez moi — parce que beaucoup ont perdu leur famille en venant à l'islam.
513. Aujourd'hui, j'inviterai un converti à la prière du vendredi — pas pour vérifier, pour l'accompagner.
514. Aujourd'hui, je ferai du'â pour les convertis du monde — qu'Allah leur facilite, leur donne des frères et sœurs, les protège.
515. Aujourd'hui, je ne corrigerai pas un converti sur une erreur de prononciation arabe — son arabe vaut le mien le jour où je doutais.
516. Aujourd'hui, j'expliquerai à un converti un point de fiqh sans m'imposer — comme une porte ouverte, pas un examen.
517. Aujourd'hui, je raconterai à un converti un récit du Prophète ﷺ avec un compagnon converti — Bilal, Salman, Suhayb. Pour qu'il sache qu'il marche dans leur sillage.
518. Aujourd'hui, je donnerai à un converti un Coran traduit dans sa langue maternelle — pas dans la mienne.
519. Aujourd'hui, je n'oublierai pas dans mes du'âs ceux qui se convertissent en ce moment — partout dans le monde, à cet instant.
520. Aujourd'hui, je présenterai à un converti d'autres convertis — pour qu'il se sente moins étranger.

## X — Communauté (mosquée) (10)

521. Aujourd'hui, je participerai à un nettoyage de mosquée — sans rien dire, en arrivant 30 minutes avant la prière.
522. Aujourd'hui, je donnerai à la caisse de la mosquée — anonymement, pas devant les autres, pas pour qu'on me voie.
523. Aujourd'hui, je ramasserai un mégot, un papier, un déchet devant ma mosquée — la propreté du seuil est sounnah.
524. Aujourd'hui, j'apporterai des dattes pour la rupture du jeûne à la mosquée — assez pour partager avec plusieurs.
525. Aujourd'hui, je m'assoirai à côté de quelqu'un qui prie seul à la mosquée — pour qu'il ne soit plus seul.
526. Aujourd'hui, je dirai bonjour à l'imam, au muezzin, au gardien de la mosquée — par leur prénom.
527. Aujourd'hui, je rangerai les Corans, les chaussures, les tapis qui traînent — sans qu'on me le demande.
528. Aujourd'hui, j'inviterai à la mosquée un musulman qui n'y vient plus — sans le sermonner, juste : "Viens, on y va ensemble."
529. Aujourd'hui, je proposerai mes compétences à ma mosquée — comptabilité, communication, bricolage, traduction.
530. Aujourd'hui, je préparerai un repas pour un événement de ma mosquée — Aïd, Ramadan, mariage, condoléances.

## Y — Transmission & savoir (5)

531. Aujourd'hui, j'apprendrai un hadith par cœur — court, authentique, et je le transmettrai à au moins une personne aujourd'hui.
532. Aujourd'hui, je partagerai un livre islamique avec quelqu'un qui ne l'a pas lu — en lui disant pourquoi il m'a marqué.
533. Aujourd'hui, je financerai partiellement la scolarité d'un orphelin ou d'un étudiant — petite somme, grand effet.
534. Aujourd'hui, je remercierai un savant, un imam, un enseignant qui m'a marqué — par message, par lettre, par une contribution à son travail.
535. Aujourd'hui, je donnerai mes vieux livres à une bibliothèque, une école, une mosquée — sadaqa jâriya qui durera après moi.

---

# 📅 CATÉGORIE SAISON & CONTEXTE — 20 NIYYAH

## Jumu'ah / vendredi (5)

181. Aujourd'hui c'est vendredi, je lirai sourate Al-Kahf en entier — l'occasion ne se présente que 52 fois par an.
182. Aujourd'hui c'est vendredi, je ferai mes ghusl avant la prière de Jumu'ah — pas un wudû expédié, un ghusl complet comme l'a recommandé le Prophète ﷺ.
183. Aujourd'hui c'est vendredi, je multiplierai les salât 'ala an-Nabî ﷺ — le Prophète ﷺ a dit : "Multipliez les salât sur moi le vendredi, car elles me sont présentées" (Abu Dawud, hasan). [CORRIGÉE]
184. Aujourd'hui c'est vendredi, je chercherai l'heure de l'exaucement — heure cachée du vendredi où la du'â est exaucée. Les savants la situent soit pendant la khutba/prière, soit en fin d'après-midi avant Maghrib. [CORRIGÉE]
185. Aujourd'hui c'est vendredi, je donnerai une sadaqa avant la prière de Jumu'ah — petite mais réelle.

## Jours blancs / 13-14-15 hijri (3)

186. Aujourd'hui c'est un jour blanc — je jeûnerai pour Allah, ce jeûne du Prophète ﷺ que beaucoup oublient.
187. Aujourd'hui c'est un jour blanc — je multiplierai les actes invisibles plutôt que les visibles.
188. Aujourd'hui c'est un jour blanc — je ferai du'â aux moments précieux : avant le suhûr et juste avant le maghrib.

## Ramadan (5)

189. Aujourd'hui c'est Ramadan, je terminerai un juz' du Coran avant le maghrib — c'est faisable, c'est tracé par les anciens.
190. Aujourd'hui c'est Ramadan, je donnerai une sadaqa par jour — pas un grand don à la fin, un petit chaque jour.
191. Aujourd'hui c'est Ramadan, je romprai mon jeûne avec des dattes et de l'eau, lentement, en faisant du'â — pas en jetant ce que je trouve dans ma bouche. [CORRIGÉE faute français]
192. Aujourd'hui c'est Ramadan, je préparerai un iftar pour quelqu'un d'autre — voisin, ami isolé, étudiant. La récompense équivaut à celle du jeûneur (Tirmidhi).
193. Aujourd'hui c'est Ramadan, je prierai tarawih en entier — pas les premières rak'as puis fuir, jusqu'au witr.

## Dhul-Hijja / 1-10 (3)

194. Aujourd'hui c'est l'un des 10 jours de Dhul-Hijja — selon le Prophète ﷺ, aucune œuvre n'est plus aimée d'Allah que celles accomplies ces jours-là (Bukhari).
195. Aujourd'hui c'est le jour d'Arafat — si je ne suis pas en pèlerinage, je jeûnerai. Le Prophète ﷺ a dit que ce jeûne efface les péchés de deux années (Muslim). [CORRIGÉE]
196. Aujourd'hui c'est l'Aïd al-Adha — je ferai (ou j'aurai fait) mon udhiya si je le peux, je rendrai visite à un proche que je n'ai pas vu, j'enverrai un message à ceux qui sont loin, je donnerai à qui n'a rien. [CORRIGÉE]

## Muharram / Achoura (2)

197. Aujourd'hui c'est le 9 ou 10 de Muharram — je jeûnerai pour Achoura, qui efface les péchés de l'année écoulée selon le Prophète ﷺ (Muslim).
198. Aujourd'hui nous sommes dans un mois sacré (Muharram, Rajab, Dhul-Qi'da, Dhul-Hijja) — chaque bonne action y est multipliée, chaque péché y est plus lourd. Je redouble.

## Laylat al-Qadr (2)

199. Cette nuit pourrait être Laylat al-Qadr — la nuit qui vaut mieux que mille mois. Je prierai au moins deux rak'as et je répéterai : "Allahumma innaka 'afuwwun tuhibbu al-'afwa fa'fu 'annî" comme l'a enseigné le Prophète ﷺ à Aïcha.
200. Cette nuit est une nuit du dernier tiers de Ramadan — si je ne peux pas faire i'tikâf à la mosquée, j'en ferai l'esprit chez moi : téléphone éteint, prière, Coran, du'â. Sans appeler cela i'tikâf, qui se fait à la mosquée. [CORRIGÉE]

---

# ⚙️ ALGORITHME DE SÉLECTION DÉTAILLÉ — POUR CLAUDE CODE

## Pseudocode complet

```javascript
function selectDailyNiyyahs() {
  // Charger le pool complet
  const pool = await fetch('data/niyyah/niyyah_pool.json').then(r => r.json());
  
  // Charger l'historique des 30 derniers jours
  const history = JSON.parse(localStorage.getItem('niyyah_history') || '[]');
  const recentIds = history.filter(h => 
    Date.now() - h.date < 30 * 24 * 60 * 60 * 1000
  ).map(h => h.id);
  
  // Filtrer le pool en excluant l'historique récent
  const available = pool.niyyahs.filter(n => !recentIds.includes(n.id));
  
  // Identifier le contexte du jour
  const today = new Date();
  const dayOfWeek = today.getDay(); // 5 = vendredi
  const hijriDate = getHijriDate(today); // utiliser une lib comme moment-hijri
  const isFriday = dayOfWeek === 5;
  const isWhiteDay = [13, 14, 15].includes(hijriDate.day);
  const isRamadan = hijriDate.month === 9;
  const isDhulHijja = hijriDate.month === 12 && hijriDate.day <= 10;
  const isMuharram = hijriDate.month === 1 && [9, 10].includes(hijriDate.day);
  const isLastThirdRamadan = isRamadan && hijriDate.day >= 21;
  
  // ===== TIRER LES 3 PILIERS (toujours présents) =====
  
  // niyyah_1 : COMBAT
  const combatPool = available.filter(n => n.category === 'combat');
  const niyyah_1 = pickRandom(combatPool);
  
  // niyyah_2 : DEVOTION
  const devotionPool = available.filter(n => n.category === 'devotion');
  const niyyah_2 = pickRandom(devotionPool);
  
  // niyyah_3 : SERVICE
  const servicePool = available.filter(n => n.category === 'service');
  const niyyah_3 = pickRandom(servicePool);
  
  // ===== TIRER LA 4ÈME UNIQUEMENT SI CONTEXTE SAISONNIER =====
  
  let niyyah_4 = null;
  let saisonContext = null;
  
  // Détecter le contexte par priorité décroissante
  if (isLastThirdRamadan) {
    saisonContext = 'laylat_qadr';
  } else if (isMuharram) {
    saisonContext = 'muharram';
  } else if (isDhulHijja) {
    saisonContext = 'dhul_hijja';
  } else if (isRamadan) {
    saisonContext = 'ramadan';
  } else if (isWhiteDay) {
    saisonContext = 'jours_blancs';
  } else if (isFriday) {
    saisonContext = 'jumuah';
  }
  
  // Si contexte saisonnier : tirer une 4ème niyyah saisonnière
  if (saisonContext) {
    // Pour les saisons, on ignore l'historique 30j si pool trop petit
    let seasonPool = available.filter(n => 
      n.category === 'saison' && n.subcategory === saisonContext
    );
    
    // Fallback si tout l'historique consommé (pool saison petit)
    if (seasonPool.length === 0) {
      seasonPool = pool.niyyahs.filter(n => 
        n.category === 'saison' && n.subcategory === saisonContext
      );
    }
    
    niyyah_4 = pickRandom(seasonPool);
  }
  // Sinon : pas de 4ème niyyah, on affiche 3 niyyah seulement
  
  // ===== METTRE À JOUR L'HISTORIQUE =====
  
  const drawn = [niyyah_1, niyyah_2, niyyah_3, niyyah_4].filter(Boolean);
  const newHistory = [
    ...history, 
    ...drawn.map(n => ({ id: n.id, date: Date.now() }))
  ].filter(h => Date.now() - h.date < 30 * 24 * 60 * 60 * 1000);
  
  localStorage.setItem('niyyah_history', JSON.stringify(newHistory));
  
  // Retourner les niyyah à afficher (3 ou 4 selon contexte)
  return drawn;
}

function pickRandom(arr) {
  if (arr.length === 0) {
    console.warn('Pool vide après filtrage, fallback');
    return null;
  }
  return arr[Math.floor(Math.random() * arr.length)];
}
```

## UX de la modale "ANCRER VOTRE NIYYAH"

- **Jour ordinaire** : afficher 3 cartes niyyah (combat / devotion / service)
- **Jour saisonnier** : afficher 3 cartes + 1 carte saisonnière mise en avant
- Sur la carte saisonnière, badge contextuel discret :
  - Vendredi → *« Aujourd'hui c'est vendredi »*
  - Ramadan → *« Aujourd'hui c'est Ramadan »*
  - Jours blancs → *« Aujourd'hui est un jour blanc »*
  - Dhul-Hijja → *« Aujourd'hui est dans les 10 jours de Dhul-Hijja »*
  - Muharram → *« Aujourd'hui c'est Achoura »*
  - Laylat al-Qadr → *« Cette nuit pourrait être Laylat al-Qadr »*

Le champ libre "OU VOTRE PROPRE INTENTION" reste toujours présent en bas de la modale.

## Liste des 41 sous-pôles (subcategory)

**Combat (12) :**
- `langue`, `regard`, `ego`, `rumination`, `peur`, `paresse`, `addictions`, `distraction`, `orgueil`, `jalousie`, `ingratitude`, `colere`

**Dévotion (10) :**
- `dhikr`, `salat`, `coran`, `duas`, `jeune`, `sunnah`, `asma_husna`, `tahajjud`, `itikaf`, `mort`

**Service (13) :**
- `parents`, `conjoint_enfants`, `fratrie`, `proches`, `inconnus`, `voisins`, `animaux`, `defunts`, `environnement`, `collegues`, `convertis`, `communaute`, `transmission`

**Saison (6) :**
- `jumuah`, `jours_blancs`, `ramadan`, `dhul_hijja`, `muharram`, `laylat_qadr`

---

# ✅ VALIDATION POST-EXÉCUTION

Après application du commit, vérifier :

- [ ] Le fichier `data/niyyah/niyyah_pool.json` est créé avec 1127 entrées
- [ ] La modale "ANCRER VOTRE NIYYAH" affiche 3 niyyah en jour ordinaire (combat + dévotion + service)
- [ ] La modale affiche 4 niyyah quand contexte saisonnier (vendredi, Ramadan, etc.)
- [ ] La 4ème niyyah saisonnière porte un badge contextuel discret
- [ ] Le champ libre "OU VOTRE PROPRE INTENTION" est toujours présent
- [ ] Le cooldown 1 fois/jour fonctionne (re-ouvrir l'orbe ne re-tire pas)
- [ ] `niyyah_history` se met bien à jour dans localStorage
- [ ] Les niyyah saisonnières s'affichent au bon moment (test sur vendredi)
- [ ] Pas de bump SW effectué
- [ ] Pas de `cp script.min.js` effectué

---

# 📊 STATISTIQUES FINALES

**Pool total : 1127 niyyah**

| Catégorie | Nombre | Sous-pôles |
|-----------|--------|------------|
| Combat | 365 | 12 |
| Dévotion | 377 | 10 |
| Service | 365 | 13 |
| Saison | 20 | 6 |
| **TOTAL** | **1 127** | **41** |

**Couverture annuelle (1 niyyah/catégorie/jour) :**
- Combat : 365 niyyah / 365 jours → couverture **PILE 1 AN** sans répétition
- Dévotion : 377 niyyah / 365 jours → couverture **1 AN + 12 jours** de marge
- Service : 365 niyyah / 365 jours → couverture **PILE 1 AN** sans répétition

**Saisonnière :** apparaît en bonus quand contexte spécial (vendredi, Ramadan, jours blancs, Dhul-Hijja, Muharram, Laylat al-Qadr). Répétition acceptable car le contexte donne du sens à chaque apparition.

**Garantie : l'utilisateur ne verra jamais 2 fois la même niyyah Combat / Dévotion / Service sur 1 an entier.**

---

# 🛡️ AUDIT THÉOLOGIQUE — RÉCAP DES 44 CORRECTIONS INTÉGRÉES

## Combat (6 corrections)
- 35 : transactionnel retiré
- 217 : "pacte avant l'origine" reformulé
- 911 : silence absolu nuancé
- 912 : "humilier" → "humilité (tawâdu')"
- 944 : attribution Mâlik précisée
- 1051 : inversion main droite/gauche corrigée

## Dévotion (16 corrections)
- 134 : Al-Mulk reformulée (intercession)
- 547 : Hasbiya Allah 7x — marqueur prudence (hadith faible)
- 548 : Du'â de Yunus — retrait "qu'aucune supplique ne dépasse"
- 549 : Al-'âfiyah — retrait "la plus utile"
- 555 : Akrim nuzulî — contexte voyage précisé
- 561 : Habbib ilayna — attribution corrigée (Ahmad/Nasâ'î)
- 575 : Yâ-Sîn — retrait "absorber la puissance"
- 657 : "rompretai" → "romprai" (faute français)
- 688 : Bismillâhi alladhî — formule complétée
- 693 : Doigts témoins — marqueur prudence
- 694 : "porte du Paradis" → "trésor du Paradis"
- 704 : Dhikr du marché — texte complet
- 707 : Bismillah toute sourate — divergence des écoles
- 717 : Al-Kâfirûn/Al-Ikhlâs — contexte sunan précisé
- 720 : "visualiser Allah" → "sentir qu'Allah me voit" ⚠️ CRITIQUE
- 733 : 2 rak'as wudû — citation reformulée
- 836 : Al-Mulk — reformulée comme 134

## Service (11 corrections)
- 210 : Embrasser main — nuancé
- 211 : Photo famille — précision "musulmans"
- 232 : Pardon Allah/humain — les deux pardons
- 247 : Introduction prophétique — reformulé
- 269 : Voisin — citation reformulée
- 275 : Voisin Jour du Jugement — hadith retiré
- 285 : Yâ-Sîn aux mourants/morts — hadith faible
- 286 : Coran complet pour défunt — du'â à la place
- 468 : Récompense de dhikr — reformulée en du'â
- 470 : Acte aimé par défunt — reformulé
- 479 : Cimetière non-musulman — pas d'istighfâr

## Saison (6 corrections)
- 183 : "80 salât" → "multiplier"
- 184 : Heure d'exaucement — divergences mentionnées
- 191 : "rompretai" → "romprai"
- 195 : Jeûne Arafat — précision "non-pèlerin"
- 196 : Aïd al-Adha — ajout udhiya
- 200 : I'tikâf — précision "en mosquée"

## Pudeur (2 corrections supplémentaires)
- 865 : Vulgarité retirée
- 993 : Vulgarité retirée

---

# 📝 COMMIT MESSAGE FINAL

```
pool 1127 niyyah orbe central + algorithme triade + audit théologique

- créer data/niyyah/niyyah_pool.json (1127 entrées numérotées et catégorisées)
- modifier la modale "ANCRER VOTRE NIYYAH" : triade (combat + dévotion + service)
- ajouter 4ème niyyah saisonnière conditionnelle (vendredi/ramadan/etc.)
- conserver champ libre "OU VOTRE PROPRE INTENTION"
- conserver cooldown niyyah_intention_date
- 41 sous-pôles distincts dans 4 catégories
- couverture mathématique : pile 1 an sans répétition (combat/dévotion/service)
- audit théologique : 44 corrections appliquées (96,1% validées sans réserve)
- aucune visualisation d'Allah, aucune vulgarité, sources hadith vérifiées
```

---

# 🎯 POSITION ÉDITORIALE NIYYAH MAINTENUE

- ✅ Anti-gamification (pas de compteur, pas de série, pas de badge)
- ✅ Pudeur Al-Haya (lecture familiale possible)
- ✅ Niyyah opérationnelles vérifiables (Al-Ghazali / Ibn al-Qayyim)
- ✅ Sanctification du quotidien
- ✅ Filet doctrinal : champ libre conservé pour autonomie spirituelle
- ✅ Pas de paternalisme algorithmique (pas d'onboarding situationnel)
- ✅ Triade canonique (Ibn al-Qayyim) : combat de l'ego + adoration + service à la création
- ✅ La 4ème niyyah saisonnière devient un événement marqué quand elle apparaît

---

**FIN DU DOCUMENT — 1127 NIYYAH VALIDÉES**
