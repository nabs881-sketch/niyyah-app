# PLAN D'INTÉGRATION UI — CURE ANXIÉTÉ

## CONTEXTE

Le fichier `cure-anxiete-cycle1.json` est à la racine du repo. Les 7 images sont dans `assets/cure-anxiete/`.

Tu dois maintenant intégrer cette cure dans Niyyah, en t'inspirant fortement de la Cure Colère existante (`cure-colere-cycle1.json` + son wizard).

**Règle d'or** : faire en plusieurs étapes pour ne pas tout casser. Pousser un commit après CHAQUE étape (avec `npm run build`).

---

## ÉTAPE 1 — Chargement du JSON + structure de base

1. Charge `cure-anxiete-cycle1.json` au boot (même mécanisme que cure-colere)
2. Crée la fonction `openCureAnxieteDay(N)` qui ouvre le wizard pour le jour N (1 à 7)
3. Branche la porte "Anxiété" de Bab an-Nafs : elle doit ouvrir `openCureAnxieteDay(1)` (au lieu de l'ancien parcours 4 étapes)
4. Vérifier que la progression `cure_anxiete = { current_day, completed_jN }` se stocke correctement dans localStorage

**Commit + push après étape 1.**

---

## ÉTAPE 2 — Wizard générique réutilisable

Le wizard Cure Colère existe déjà. Adapte-le pour qu'il puisse aussi afficher les jours d'Anxiété :

- Background : lit `image_fond` du JSON → `assets/cure-anxiete/jN.webp`
- Citation d'ouverture (texte + source)
- Introduction
- Liste des outils (rendu selon `type`)
- Phrase-ancre
- Clôture (texte + bouton)
- Murmure de sortie au retour Sanctuaire

Le wizard doit être **agnostique** : il prend en entrée le JSON d'un jour, peu importe la cure.

Pour cette étape, **ne traite que les types d'outils qui existent déjà dans Cure Colère** :
- Champs texte avec amorce (utilisé J1 Colère pacte)
- Radio buttons (utilisé J3 Colère catégorie)
- Checkboxes simples
- Boutons de validation

Pour les types nouveaux (voir étape 3), affiche un placeholder "Outil à venir — type: X" temporairement.

**Commit + push après étape 2.**

---

## ÉTAPE 3 — Implémentation des types d'outils nouveaux

Voici les types d'outils nouveaux à coder, par ordre de complexité croissante. Fais-les un par un, avec commit après chaque.

### 3.1 — `double_slider` (utilisé J1)

Deux sliders en parallèle :
- Slider 1 : choix discret (gorge / poitrine / ventre / épaules / partout)
- Slider 2 : intensité 0-10 avec labels min/max textuels

Stocke deux clés localStorage.

### 3.2 — `double_champ_lie` (utilisé J1, J3)

Deux champs texte enchaînés par des amorces fixes :
- Amorce avant + champ_1 + amorce milieu + champ_2

Visuel : amorces en italique doré non-éditables, champs en blanc cassé éditables. Tout sur une seule ligne logique.

### 3.3 — `radio_unique` avec sous-définitions (utilisé J1)

Comme un radio simple, mais chaque option affiche :
- Label arabe (calligraphie)
- Label français
- Définition courte

Plus un rappel optionnel en bas (supplique avec ar + translit + traduction + source).

### 3.4 — `checkboxes_avec_message_dynamique` (utilisé J1)

Checkboxes classiques, MAIS :
- Si au moins une cochée → affiche `message_si_coche` (titre + texte)
- Si aucune → affiche `message_si_aucun_coche`
- Message s'affiche dynamiquement quand l'utilisateur coche/décoche

### 3.5 — `respiration_interactive` (utilisé J2)

Cercle SVG animé :
- S'agrandit pendant `inspir_sec` secondes (texte arabe `Yâ Hayy` au centre)
- Se rétracte pendant `expir_sec` secondes (texte `as-Salâm`)
- Cycle continu pendant `duree_visee_sec`
- Bouton "Terminer" toujours accessible
- Stocke le temps réellement passé

### 3.6 — `checkboxes_sequentielles` (utilisé J2)

3 étapes successives, chacune avec un certain nombre de champs libres :
- Étape 1 : "3 choses que je vois" → 3 champs texte
- Étape 2 : "2 sons que j'entends" → 2 champs texte
- Étape 3 : "1 sensation physique" → 1 champ texte

L'utilisateur progresse linéairement. Bouton "Suivant" pour passer à l'étape d'après une fois remplie.

### 3.7 — `drag_and_drop_3_categories` (utilisé J2)

L'utilisateur écrit 3 pensées (champs texte au-dessus).
Puis 3 cases en bas (Maintenant / Plus tard / Jamais arrivé).
L'utilisateur drag-and-drop chaque pensée écrite dans une des 3 cases.

Sur mobile : si drag&drop difficile, fallback en tap sur la pensée puis tap sur la case.

### 3.8 — `silhouette_interactive` (utilisé J3)

SVG d'une silhouette humaine sobre. Zones cliquables :
- Front, gorge, poitrine, ventre, épaules, jambes, partout

Au clic sur une zone : highlight + affichage du label + description typique.

### 3.9 — `pression_tactile_maintenue` (utilisé J3)

Zone à toucher avec le doigt :
- Pendant que le doigt est posé, un cercle se remplit
- 30 secondes au total
- Phrase à répéter affichée (ar + translit + fr)
- Si le doigt se lève avant la fin, le cercle reste où il en est (pas de reset brutal)

Stocke le temps total atteint.

### 3.10 — `drag_and_drop_2_colonnes` (utilisé J4)

Comme 3.7 mais avec 2 colonnes seulement (Entre mes mains / Entre Ses mains).
3 à 5 soucis à écrire puis trier.

### 3.11 — `choix_unique_avec_engagement` (utilisé J4)

Radio buttons classiques avec une option "Autre" qui révèle un champ texte si sélectionnée.

### 3.12 — `texte_qui_s_efface` (utilisé J4)

Champ texte normal.
Au clic sur "Déposer" :
- Le texte écrit s'efface en fade-out lent (3 sec)
- Une calligraphie arabe apparaît au centre à la place
- Pas de stockage du texte brut, juste un marker `done = true`

### 3.13 — `tri_radio_apprentissage` (utilisé J5)

5 énoncés présentés un par un :
- Question : "Fait observable" ou "Interprétation ajoutée"
- Après réponse : feedback positif si correct, redirection si incorrect
- Compteur affiché en discret (1/5, 2/5...)

### 3.14 — `champ_avec_amorce_obligatoire` (utilisé J5)

Comme un champ texte normal, MAIS :
- L'amorce "Mon esprit me raconte l'histoire que" est affichée en début non-éditable
- L'utilisateur ne peut écrire qu'à la suite
- Instruction finale affichée APRÈS validation

### 3.15 — `ecran_sombre_avec_dhikr` (utilisé J5)

Écran noir.
Calligraphie arabe au centre qui pulse doucement (4s/6s).
Pas de chrono visible, pas de chiffres.
Bouton "Terminer" en bas (discret).
Stocke le temps passé.

### 3.16 — `champ_qui_disparait` (utilisé J6)

Comme `texte_qui_s_efface` (3.12) mais avec étape supplémentaire :
- Après écriture, l'utilisateur choisit un thème parmi une liste (santé/argent/famille/etc.)
- Au clic sur le bouton (qui dit "Usallim — Je remets"), le texte s'efface, la calligraphie apparaît
- Seul le thème est stocké, pas le texte

### 3.17 — `double_slider_compare` (utilisé J6)

Deux sliders 0-10 avec labels textuels.
Après validation, affiche une lecture diagnostique selon le ratio des deux valeurs (4 cas possibles définis dans le JSON).

### 3.18 — `lecture_synchronisee_souffle` (utilisé J6)

Lecture lente d'un verset segmenté :
- Chaque segment apparaît en fondu (1s)
- Reste affiché (3s)
- Disparaît en fondu (1s)
- Affiche : arabe + translittération + français

Aucun chrono, aucun bouton skip pendant la lecture.
Bouton "Terminé" apparaît à la fin.

### 3.19 — `champ_texte_long` (utilisé J7)

Champ texte multi-ligne classique avec amorce + max_caracteres.

### 3.20 — `checkboxes_multiple` (utilisé J7)

Checkboxes classiques (plusieurs choix possibles) avec une option "Autre" qui révèle un champ libre.

### 3.21 — `choix_unique_sortie` (utilisé J7)

3 grandes tuiles cliquables (Reprendre / Veiller / Reposer).
Chaque tuile contient : label_fr, label_ar, subtitle, description, et consequence_app.
Au clic, stocke `cure_anxiete_j7_orientation` ET déclenche le murmure de sortie correspondant.

### 3.22 — `ecran_final_sans_action` (utilisé J7)

Écran noir avec calligraphie "as-Salâm" au centre.
Fondu lent (3s) d'apparition, reste 5s, sortie automatique vers le Sanctuaire après 8s total.
Aucun bouton, aucun chrono visible, aucune action demandée.

---

## ÉTAPE 4 — Intégration finale

1. Vérifier que chaque jour s'affiche correctement et qu'on peut le compléter
2. Vérifier que la progression `cure_anxiete = { current_day, completed_jN }` est cohérente
3. Au J7, le choix d'orientation (Reprendre / Veiller / Reposer) doit avoir les bonnes conséquences :
   - Reprendre → J1 redevient accessible dès demain
   - Veiller → Porte Anxiété reste discrète, aucune notification
   - Reposer → Porte se met en sommeil
4. Le bouton "Recommencer" doit être accessible après cure terminée (comme Cure Colère)
5. Test complet du flux J1 → J7

**Commit + push final après étape 4.**

---

## RÈGLES IMPORTANTES

- **`npm run build` AVANT chaque commit** (sinon le minifié ne se met pas à jour)
- **Bump SW version à chaque commit** (sinon le cache ne se met pas à jour)
- **Code en suivant le style de la Cure Colère** (même conventions de nommage, même structure)
- **Pas de gamification** : ni score, ni streak, ni célébration finale
- **Ton sobre Niyyah** : pas d'emojis dans l'UI, calligraphies arabes en doré (#C8A84A)
- **Anti-cache** : tester avec `?nuke=N` pour bypass PWA cache

---

## ORDRE DE PRIORITÉ

Si tu manques de temps, va dans cet ordre :
1. Étape 1 (chargement + porte branchée)
2. Étape 2 (wizard générique avec placeholders)
3. Outils nouveaux dans l'ordre des numéros (3.1 → 3.22)

À chaque commit, l'utilisateur peut tester le wizard et voir progressivement les outils s'activer.

---

FIN DU PLAN.
