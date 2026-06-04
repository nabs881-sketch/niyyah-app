# NIYYAH — Pool Conseils 3 Mouvements (Zone "Le Chemin Qui S'Ouvre")

**Objectif :** remplacer le pool actuel `_CONSEILS_CHEMIN` par 25 conseils structurés en 3 mouvements (Reconnaissance → Transition → Invitation concrète).

**Structure :** indexé par `[dominante]_[manque]` pour combinaisons force × manque + fallback.

**Variables dynamiques à remplacer au runtime :**
- `{{fajr}}` → nombre de Fajr semaine (en lettres via `_numToLetters`)
- `{{gestes}}` → nombre de gestes semaine (en lettres)
- `{{journees}}` → nombre de journées habitées (en lettres)
- `{{bilans}}` → nombre de bilans du soir posés (en lettres)
- `{{prenom}}` → prénom utilisateur si défini

**Style typo cible :** Cormorant Garamond italic, ~16-17px, gold doux, line-height 1.7, paragraphes séparés par espace.

---

## FAJR × 4 MANQUES

### fajr_bienfaisance
```
Tu as porté Fajr {{fajr}} fois cette semaine. C'est ton sommet du moment.

Maintenant que l'aube est tenue, le chemin peut s'élargir vers les autres.

Cette semaine — un seul salam à un voisin que tu croises sans le saluer. Une fois. Ça suffira.
```

### fajr_lecture
```
Tu as tenu Fajr {{fajr}} fois cette semaine. Le matin t'appartient.

Le corps prie. Le cœur, lui, a faim de mots.

Cette semaine — cinq minutes de récit après Maghrib, un seul soir suffit. Une page. Une parole. Ça nourrit.
```

### fajr_bilan_soir
```
Tu te lèves avec l'aube. Tu honores le matin.

Mais qui s'occupe du soir ?

Cette semaine — avant de dormir, un seul soir, nomme ton état : distraction, effort, sincérité. Trois secondes. Le matin tient, le soir mérite aussi.
```

### fajr_dua
```
Tu portes l'aube. Tu marches dans le rythme qu'Allah a fixé.

Mais tu pries avec ton corps. Pas encore avec ta voix.

Cette semaine — une seule du'a, une seule fois, pour quelqu'un qui te manque ou que tu aimes. Pas obligé de savoir les formules. Le cœur suffit.
```

---

## BIENFAISANCE × 4 MANQUES

### bienfaisance_fajr
```
Tu as semé du bien cette semaine. Tu vas vers les autres avec naturel.

Mais le don commence par ton lien avec Allah. Et ce lien se renforce à l'aube.

Cette semaine — choisis UN matin. Pas tous. Un seul. Pose ton réveil dix minutes plus tôt. Vois ce qui se passe.
```

### bienfaisance_lecture
```
Tu donnes aux autres cette semaine. C'est rare et c'est juste.

Mais que reçois-tu, toi ? La parole d'Allah nourrit ceux qui nourrissent.

Cette semaine — un seul récit du Coran, après le repas du soir. Cinq minutes. Recevoir avant de redonner.
```

### bienfaisance_bilan_soir
```
Tu éclaires des visages cette semaine. Tu sors de toi-même.

Mais avant de dormir, qui s'occupe de toi ?

Cette semaine — un seul soir, prends trente secondes. Distraction, effort, sincérité — où en es-tu ? Toi aussi, tu mérites un salam.
```

### bienfaisance_dua
```
Tu donnes du temps, des sourires, des gestes. Tu donnes l'extérieur.

Mais ta voix vers Allah, elle, reste discrète.

Cette semaine — pour chaque personne à qui tu fais du bien, une seule du'a. Une phrase, même courte. Le don visible se prolonge dans le don invisible.
```

---

## LECTURE × 4 MANQUES

### lecture_fajr
```
Tu as lu cette semaine. La parole d'Allah t'a habité {{gestes}} fois.

Lire ouvre l'esprit. Prier à l'aube ancre le cœur. Tu as la tête, il te manque les pieds.

Cette semaine — un seul Fajr. Pas tous. Un seul. Ce que tu as lu, vis-le un matin.
```

### lecture_bienfaisance
```
Tu nourris ton cœur cette semaine. La parole sacrée t'accompagne.

Mais ce que tu reçois doit circuler. La lumière qui reste enfermée s'éteint.

Cette semaine — un seul geste vers l'autre. Un salam à un inconnu, un appel à quelqu'un. Que ce que tu as lu se voie dans tes mains.
```

### lecture_bilan_soir
```
Tu as lu cette semaine. Tu écoutes la parole.

Mais écoutes-tu la tienne ? Le bilan du soir est une lecture aussi — la lecture de ton âme.

Cette semaine — trois soirs, avant de dormir, nomme ton état. Distraction, effort, sincérité. Le Coran te parle. Apprends à te répondre.
```

### lecture_dua
```
Tu as reçu la parole d'Allah cette semaine. Tu lis Son Livre.

Mais Lui dis-tu quelque chose en retour ? La lecture sans réponse devient mécanique.

Cette semaine — après chaque lecture, une seule phrase à Allah. Pas une formule. Tes propres mots. C'est ainsi que naît le dialogue.
```

---

## BILAN DU SOIR × 4 MANQUES

### bilan_soir_fajr
```
Tu te regardes chaque soir cette semaine. Tu te connais.

Mais le miroir du soir mérite d'être prolongé par la lumière du matin.

Cette semaine — un seul matin, ouvre les yeux avant l'aube. Vois si ce que tu as vu en toi le soir change à la lumière du Fajr.
```

### bilan_soir_bienfaisance
```
Tu te regardes chaque soir. Tu te connais bien.

Mais que sais-tu de ceux qui t'entourent ? Le miroir intérieur peut devenir une prison.

Cette semaine — un coup de fil à quelqu'un de ta famille que tu n'as pas appelé depuis longtemps. Sors du miroir.
```

### bilan_soir_lecture
```
Tu interroges ton âme chaque soir. Tu sais nommer ce qui se passe en toi.

Mais ton âme a besoin de nourriture. Le bilan sans lecture devient bavardage.

Cette semaine — cinq minutes de Coran avant le bilan du soir. Recevoir, puis examiner. Le rythme est là.
```

### bilan_soir_dua
```
Tu fais ta muhâsaba chaque soir. Tu nommes ce qui est.

Mais nommer sans parler à Allah devient un journal intime. La muhâsaba se prolonge dans la du'a.

Cette semaine — après chaque bilan du soir, une seule phrase à Allah. "Aide-moi pour demain." Trois mots suffisent.
```

---

## ÉQUILIBRE × 5 MANQUES

### equilibre_fajr
```
Tu as marché cette semaine. Sans excès, sans manque.

C'est précieux. Mais une pratique équilibrée demande un point fixe. L'aube est ce point.

Cette semaine — un seul matin, choisi à l'avance. Pose ton réveil. Vois.
```

### equilibre_bienfaisance
```
Une semaine à ton image. Régulière, fidèle, tenue.

L'équilibre intérieur cherche maintenant à sortir vers les autres.

Cette semaine — un seul geste vers quelqu'un qui n'attend rien de toi. Pas un proche. Un voisin, un collègue, un inconnu.
```

### equilibre_lecture
```
Tu as posé ce que tu pouvais cette semaine. Ni plus, ni moins.

L'équilibre devient routine sans nourriture. La parole d'Allah remet du sens dans le rythme.

Cette semaine — cinq minutes de récit du Coran, un soir. Une phrase, une histoire. Que la constance retrouve sa source.
```

### equilibre_bilan_soir
```
Tu pratiques sans crispation cette semaine. C'est un état rare.

Mais sans regard sur soi, l'équilibre devient mécanique. Le bilan du soir est ce qui empêche la routine de devenir un sommeil.

Cette semaine — trois soirs, avant de dormir, nomme ton état. Distraction, effort, sincérité.
```

### equilibre_dua
```
Tu marches avec constance. Tu tiens ton rythme.

Mais à qui parles-tu pendant que tu marches ? La constance sans dialogue avec Allah devient de la discipline froide.

Cette semaine — une seule du'a par jour. Pour toi, pour quelqu'un d'autre, peu importe. Que ta marche redevienne une conversation.
```

---

## QUASI-VIDE × 3 PROFILS

### quasi_vide_reconnecter
```
Tu as ouvert Niyyah cette semaine. C'est déjà un commencement.

Pas besoin de tout reprendre. Le retour se fait par un seul fil.

Cette semaine — choisis UN geste. N'importe lequel. Bismillah avant ton premier café. Une seule fois suffit pour que demain reprenne.
```

### quasi_vide_routine
```
Cette semaine a été plus tranquille. Ça arrive.

La constance n'est pas linéaire. Une semaine légère ne défait pas un chemin.

Cette semaine — reprends UN seul geste familier. Celui qui te coûte le moins. Le rythme revient seul.
```

### quasi_vide_sacraliser
```
Tu as choisi le Complet, et cette semaine fut légère. C'est aussi une étape.

L'exigence demande des respirations. Cette semaine en fut une. Pas de jugement.

Cette semaine — un seul geste que tu aimes vraiment. Pas tous. Celui qui te ressemble le plus. Le chemin reprend.
```

---

## FALLBACK UNIVERSEL

### fallback
```
Cette semaine fut traversée. Chaque pas compte, même invisible.

Niyyah ne mesure pas la performance. Elle marche à ton rythme.

Cette semaine — choisis ce qui te parle le plus. Un seul geste, posé avec présence. Le reste suivra.
```

---

## NOTES POUR CLAUDE CODE

### Structure d'objet à créer
```javascript
const _CONSEILS_CHEMIN = {
  fajr_bienfaisance: "Tu as porté Fajr {{fajr}} fois cette semaine...",
  fajr_lecture: "Tu as tenu Fajr {{fajr}} fois cette semaine...",
  fajr_bilan_soir: "...",
  fajr_dua: "...",
  bienfaisance_fajr: "...",
  // etc.
  quasi_vide_reconnecter: "...",
  quasi_vide_routine: "...",
  quasi_vide_sacraliser: "...",
  fallback: "Cette semaine fut traversée..."
};
```

### Logique de sélection
1. Calculer `dominante` (déjà fait dans `_getWeeklyDominante`)
2. Calculer `zone_manquante` parmi (fajr, bienfaisance, lecture, bilan_soir, dua) — la zone avec le score le plus bas sur la semaine
3. Si dominante = `quasi_vide` → utiliser `quasi_vide_[profil]`
4. Si dominante = `equilibre` → utiliser `equilibre_[zone_manquante]`
5. Sinon → utiliser `[dominante]_[zone_manquante]`
6. Si pas de match → `fallback`

### Variables à substituer
- `{{fajr}}` → `_numToLetters(stats.fajrDays)`
- `{{gestes}}` → `_numToLetters(stats.totalGestes)`
- `{{journees}}` → `_numToLetters(stats.doneDays)`
- `{{bilans}}` → `_numToLetters(_bilanCount)`
- `{{prenom}}` → préfixe avec `prenom + ', '` si défini

### Rendu HTML cible
3 paragraphes séparés par margin-top, Cormorant Garamond italic, ~16-17px, gold doux (#B5A685), line-height 1.7, max-width 320px centré.

### Action attendue
- Remplacer le pool actuel `_CONSEILS_CHEMIN` (ou créer s'il n'existe pas)
- Implémenter logique sélection ci-dessus dans `showWeeklyBilan`
- Régénérer .min
- Bump SW v1410
