# AUDIT RECITS_CORAN.DOCX — PHASE 2 (RETOUR GEMINI)

**Fichier cible :** `recits_coran.docx` (+ `recits-coran.json` miroir)
**Source :** Audit Gemini 2e regard, session 2026-05-23
**Nombre de corrections :** 4 (la 5e est optionnelle, voir fin de doc)
**État du fichier :** Phase 1 déjà appliquée (5 corrections initiales). Cette phase 2 complète l'audit.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE `recits_coran.docx` (et son JSON miroir).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin : `audit recits_coran.docx phase 2 : 4 corrections Gemini`

---

## CORRECTION 1 — Récit 4 (Moussa et Al-Khidr) : la "science"

**Problème :** Formulation actuelle peut faire passer Moussa pour orgueilleux. Le hadith Bukhari précise que la faute fut l'omission de rapporter la science à Allâh, pas l'orgueil.

**REMPLACER :**
> Moussa avait été choisi. Allâh lui parlait — directement, sans voile. Il avait fendu la mer. Il avait reçu la Loi. Il était, parmi les prophètes, celui qui pouvait dire : je sais.
>
> Un jour, on lui demanda :
>
> « Y a-t-il un homme plus savant que toi ? »
>
> Il répondit non.
>
> Allâh n'aima pas cette réponse.

**PAR :**
> Moussa avait été choisi. Allâh lui parlait — directement, sans voile. Il avait fendu la mer. Il avait reçu la Loi. Il était, parmi les prophètes de son temps, le plus savant — et il le savait.
>
> Un jour, on lui demanda :
>
> « Y a-t-il un homme plus savant que toi ? »
>
> Il répondit non.
>
> Ce n'était pas de l'orgueil. C'était un constat. Mais Moussa avait oublié de rapporter la science à sa Source — il n'avait pas dit *Allâhu a'lam*, Allâh sait mieux. Et Allâh, qui veille sur Ses prophètes, voulut l'instruire.

---

## CORRECTION 2 — Récit 9 (Le peuple de Loth) : précision coranique

**Problème :** La phrase corrigée en phase 1 ("approchaient leurs semblables") est devenue trop vague. Le Coran (7:81, 27:55) dit explicitement *ar-rijâl* (les hommes) *min dûn an-nisâ'* (au lieu des femmes). Pour être fidèle au texte coranique tout en restant safe Play Store, il faut citer la formulation coranique directement.

**REMPLACER :**
> Ils approchaient leurs semblables contrairement à la fitra qu'Allâh a créée.

**PAR :**
> Ils s'approchaient des hommes par convoitise, au lieu des femmes — comme le Coran lui-même le rapporte. Une transgression de la fitra qu'Allâh avait inscrite dans la création.

**Note :** Cette formulation cite directement le Coran (Sourate 7:81). Elle est plus précise que "semblables" tout en restant dans le langage scripturaire neutre. Pas de risque Play Store car c'est une citation coranique exacte, pas un commentaire éditorial.

---

## CORRECTION 3 — Récit 11 (Le peuple de Hud) : délégation à La Mecque

**Problème :** L'épisode de la délégation 'Ad envoyée à La Mecque pour prier pour la pluie vient de Tabari/Ibn Kathir mais n'est PAS dans le Coran. Le Coran (46:24-25) montre le nuage arriver directement sur eux dans leur vallée. Pour épurer et rester strictement scripturaire.

**REMPLACER :**
> Vint la sécheresse.
>
> Trois ans sans pluie. Les sources s'asséchèrent. Le bétail mourut. La terre se fissura. Les Ad envoyèrent une délégation aux Maisons sacrées — à La Mecque, déjà, où on disait que les prières étaient exaucées.
>
> Là-bas, ils prièrent pour la pluie.
>
> Et Allâh leur envoya un nuage.

**PAR :**
> Vint la sécheresse.
>
> Trois ans sans pluie. Les sources s'asséchèrent. Le bétail mourut. La terre se fissura. Les Ad attendirent — comme tous les peuples attendent — un signe du ciel.
>
> Un jour, à l'horizon de leur vallée, apparut un nuage.

---

## CORRECTION 4 — Récit 17 (Compagnons de l'Éléphant) : cohérence Abraha

**Problème :** Cohérence interne. Le récit 1 (Nimrod) signale que le Coran ne nomme pas Nimrod ("Le Coran s'arrête là. Il ne le nomme pas"). Le récit 17 mentionne Abraha sans préciser que son nom vient de la tradition historique, pas du Coran.

**REMPLACER la source actuelle :**
> *Sourate Al-Fil (105:1-5)*

**PAR :**
> *Sourate Al-Fil (105:1-5) — Note : le Coran parle des « Compagnons de l'Éléphant ». Le nom d'Abraha et les détails de l'expédition proviennent de la Sîra et des chroniques historiques.*

---

## CORRECTION 5 — Récit 16 (Dawud, cinq pierres) — OPTIONNELLE

**Statut :** Gemini a validé la formulation actuelle ("selon la tradition antérieure à l'Islam"). Propose une épuration encore plus stricte si on veut un texte 100% coranique.

**Décision Nabs :** À toi de trancher. Si tu veux épurer davantage :

**REMPLACER :**
> Avec une fronde et — selon la tradition antérieure à l'Islam — cinq pierres ramassées dans le lit du fleuve.

**PAR :**
> Sans armure. Sans épée. Avec une fronde et quelques pierres.

**Sinon :** Garder la formulation actuelle (déjà honnête et signalée).

---

## VALIDATION POST-EXÉCUTION

Après les modifications :
1. Vérifier qu'aucun autre paragraphe n'a été touché.
2. Vérifier que les sources en tête restent intactes (sauf R17).
3. COMMIT : `audit recits_coran.docx phase 2 : 4 corrections Gemini`

---

## SYNTHÈSE GEMINI

Gemini a validé l'ensemble du fichier comme excellent. Points parfaits relevés :
- Récit 3 (Caverne) : gestion du nombre des jeunes
- Récit 12 (Ayoub) : justesse théologique de la dou'a
- Récit 13 (Yunus) : structure d'invocation irréprochable
- Conclusions/morales : respect de l'esprit des paraboles coraniques

Verdict final Gemini : *"Si tu ajustes la formulation sur la science de Moussa et la précision sur le peuple de Loth, ton texte est totalement validé d'un point de vue traditionnel."*

---

## DÉCISION NABS REQUISE

Avant exécution Claude Code :
- **Correction 5 (5 pierres Dawud)** : OUI (épurer) ou NON (garder phase 1) ?

Si pas de réponse explicite : par défaut, ON GARDE la phase 1 (NON à la correction 5).
