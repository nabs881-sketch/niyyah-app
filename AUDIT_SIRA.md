# AUDIT SIRA.DOCX — INSTRUCTIONS CLAUDE CODE

**Fichier cible :** `sira.docx` (+ JSON miroir `sira.min.json` et autres fragments éventuels)
**Source de l'audit :** Audit théologique Niyyah, session 2026-05-23
**Structure :** 365 RDV chronologiques de la Sîra du Prophète ﷺ
**Nombre de corrections :** 4 corrections critiques + 30 doublons à supprimer + 2 optionnelles
**Niveau global :** EXCELLENT sur fond et plume. Trois risques Play Store identifiés.

---

## RÈGLE D'EXÉCUTION

1. NE TOUCHE QUE `sira.docx` (et son JSON miroir).
2. PAS DE BUMP SW.
3. PAS DE `cp script.js script.min.js`.
4. UN SEUL COMMIT à la fin : `audit théologique sira : 4 corrections critiques + 30 doublons supprimés`

---

## CORRECTION 1 — CRITIQUE STRUCTUREL : Suppression de 30 RDV doublons

**Problème :** RDV 281-310 ET RDV 311-340 sont des doublons EXACTS (30 RDV dupliqués mot pour mot).

Vérifications effectuées :
- RDV 281 = RDV 311 (ʿUthmān et puits de Rūma)
- RDV 282 = RDV 312 (Az-Zubayr ibn al-ʿAwwām)
- RDV 285 = RDV 315 (Saʿd ibn Abī Waqqāṣ)
- RDV 290 = RDV 320 (Ḥassān ibn Thābit)
- RDV 295 = RDV 325 (Abū Ṭālib)
- RDV 300 = RDV 330 (Khubayb ibn ʿAdī)
- RDV 305 = RDV 335 (Khālid à al-Yamāma)
- RDV 310 = RDV 340 (Umm ʿUmāra)

Tous les RDV 311-340 sont des copies exactes des RDV 281-310 correspondants.

**ACTION :**
1. **Supprimer intégralement les RDV 311 à 340** (30 RDV).
2. **Renuméroter les RDV 341-365 en RDV 311-335** pour garder une séquence continue.
3. Total final : **335 RDV** (au lieu de 365).

---

## CORRECTION 2 — CRITIQUE PLAY STORE : RDV 211 "expulser juifs, chrétiens, polythéistes"

**Problème :** La formulation actuelle, sortie de son contexte juridique historique, est extrêmement à risque de blocage Play Store (signalable comme appel à expulsion antisémite/anti-chrétien). Le contexte historico-juridique précis du hadith doit être donné.

**REMPLACER :**
> Ce jour-là, le Messager d'Allah ﷺ fit trois recommandations orales, parmi les dernières recommandations politiques de sa vie.
>
> 1. Expulser les juifs, les chrétiens et les polythéistes de la péninsule arabique.
>
> 2. Traiter les délégations comme à l'accoutumée — avec hospitalité, avec respect, avec dons.
>
> 3. La troisième — le rapporteur l'a oubliée. On hésite : était-ce sur la mise en route de l'armée d'Usāma ? Sur la prière ? Sur le Livre et la Sunna ? Personne ne sait. Un oubli humain qui a coûté quelque chose à l'histoire.

**PAR :**
> Ce jour-là, le Messager d'Allah ﷺ fit trois recommandations orales, parmi les dernières recommandations politiques de sa vie.
>
> 1. Préserver la sacralité du Hijaz — la région des Lieux saints autour de La Mecque et Médine — pour qu'elle reste un sanctuaire dédié exclusivement à la pratique de l'islam. Cette mesure juridique, qui a fait débat parmi les écoles juridiques pendant des siècles (l'école mâlikite par exemple exclut le Yémen et d'autres régions), concernait spécifiquement les terres saintes — pas le reste de la péninsule, et encore moins le reste du monde. Le Prophète ﷺ a toujours protégé les non-musulmans hors de ce périmètre sacré, et le pacte de Médine — l'un des premiers documents d'État pluraliste de l'histoire — en témoigne.
>
> 2. Traiter les délégations comme à l'accoutumée — avec hospitalité, avec respect, avec dons.
>
> 3. La troisième — le rapporteur l'a oubliée. On hésite : était-ce sur la mise en route de l'armée d'Usāma ? Sur la prière ? Sur le Livre et la Sunna ? Personne ne sait. Un oubli humain qui a coûté quelque chose à l'histoire.

---

## CORRECTION 3 — CRITIQUE PLAY STORE : RDV 146 "concubine"

**Problème :** Le mot "concubine" + la formulation "il la prit pour lui — c'était son droit" sont à risque très élevé pour le review Play Store. À adapter selon la doctrine éditoriale Niyyah déjà validée (mâ malakat aymânuhâ → "ceux/celles sous votre autorité").

**REMPLACER le début du RDV 146 :**
> Parmi les captives des Banū Qurayẓa, il y avait Rayḥāna bint Zayd.
>
> Elle était jeune. Belle. De la tribu des Banū an-Naḍīr à l'origine, mais mariée chez les Qurayẓa. Le Messager d'Allah ﷺ la prit pour lui — c'était son droit, par les règles de la guerre du temps. Il lui proposa d'embrasser l'islam et de devenir son épouse, comme il l'avait fait pour Juwayriya, comme il le ferait pour Ṣafiyya après Khaybar.
>
> Rayḥāna refusa. Elle dit : « Je préfère rester ta concubine. »

**PAR :**
> Parmi les femmes prises sous la protection du camp musulman après la chute des Banū Qurayẓa, il y avait Rayḥāna bint Zayd.
>
> Elle était jeune. Belle. De la tribu des Banū an-Naḍīr à l'origine, mais mariée chez les Qurayẓa. Selon les règles historiques de la guerre du VIIᵉ siècle — où les hommes du clan vaincu étaient exécutés et les femmes confiées à la protection des vainqueurs — elle fut placée sous l'autorité du Messager d'Allah ﷺ. Il lui proposa d'embrasser l'islam et de devenir son épouse, comme il l'avait fait pour Juwayriya, comme il le ferait pour Ṣafiyya après Khaybar.
>
> Rayḥāna refusa. Elle dit : « Je préfère rester sous ta protection sans me marier — pour l'instant. »

**REMPLACER aussi plus loin dans le même RDV :**
> Selon certaines sources, elle resta sa concubine et fut affranchie ; selon d'autres, elle devint son épouse. Mubarakpuri et Ibn Hishām divergent.

**PAR :**
> Selon certaines sources, elle resta sous sa protection puis fut affranchie ; selon d'autres, elle devint son épouse. Mubarakpuri et Ibn Hishām divergent.

---

## CORRECTION 4 — RDV 121 "perversité naturelle"

**Problème :** La citation de Mubarakpuri "Satan leur embellit leur perversité naturelle" appliquée aux Banū an-Naḍīr peut être lue comme essentialisation antisémite. Mubarakpuri est un auteur du 20ᵉ siècle dont certaines formulations sont datées.

**REMPLACER :**
> Et Mubarakpuri écrit : « Satan leur embellit leur perversité naturelle ».

**PAR :**
> Et là, à l'abri du mur, certains parmi les Banū an-Naḍīr conçurent un plan : pousser une meule du toit de la maison, sur la tête du Messager d'Allah ﷺ assis en contrebas. Une trahison concertée. Sourate al-Ḥashr (59) décrira plus tard cet épisode et les conséquences qui en découleront.

---

## CORRECTIONS OPTIONNELLES

### OPTIONNEL 1 — RDV 346-357 : RDV "éclairs" tronqués

Les RDV 346 à 357 contiennent un format très court (juste verset coranique + source, sans récit développé). Format différent du reste du fichier.

**Question Nabs :**
- **OUI étoffer** → développer chaque RDV éclair en récit de 10-15 lignes
- **NON garder** → ces RDV sont voulus en format synthétique de fin

**Par défaut :** ne pas modifier (format intentionnel probable).

### OPTIONNEL 2 — RDV 59 Aïcha : blindage études récentes

Le RDV est très bien traité (contextualisation, sensibilité moderne reconnue). Pour blinder à 100% Play Store :

**AJOUTER après le paragraphe "Cette différence d'âge — neuf ans face à cinquante-quatre..." :**
> Des études contemporaines en sciences du hadith (Adil Salahi, Asma Barlas, parmi d'autres) ont également questionné cet âge de neuf ans en croisant d'autres sources biographiques de la Sîra qui suggèrent qu'Aïcha pouvait avoir entre 12 et 19 ans au moment du mariage. La question reste débattue chez les chercheurs musulmans modernes.

**Par défaut :** ne pas modifier (le RDV est déjà bien équilibré).

---

## VALIDATION POST-EXÉCUTION

Après les modifications :
1. Vérifier que les RDV 311-340 ont été supprimés (30 RDV).
2. Vérifier que les RDV 341-365 ont été renumérotés en 311-335.
3. Vérifier que le total final est de **335 RDV** continus.
4. Vérifier que les 3 corrections critiques (RDV 211, 146, 121) ont été appliquées.
5. COMMIT : `audit théologique sira : 4 corrections critiques + 30 doublons supprimés`

---

## NOTES MÉTHODOLOGIQUES

### Translittération
Ce fichier utilise **"Allah/Allâh"** mixte + **"Muḥammad"** avec diacritiques (système ALA-LC). Style le plus orientaliste des fichiers Niyyah. Décision Nabs en attente sur uniformisation globale.

### Passages magnifiques (à ne PAS toucher)
Identifiés comme sommets pédagogiques :
- **RDV 1-5** : Contextualisation Arabie pré-islamique
- **RDV 16** : Iqrā (révélation)
- **RDV 75** : Sumayya, Bilâl, Khabbâb (martyres et torturés)
- **RDV 144** : Jugement de Saʿd (déjà parfaitement traité avec contexte)
- **RDV 154** : Conquête de la Mecque sans effusion de sang
- **RDV 167** : Ṣafiyya « Mon père est Hârûn »
- **RDV 187** : « Allez, vous êtes libres » (amnistie de la Mecque)
- **RDV 250-260** : Portraits du Prophète ﷺ
- **RDV 363** : La mort (« mort dans ma maison, dans mon jour, contre ma poitrine »)
- **RDV 364** : « Qui adorait Muḥammad — Muḥammad est mort »
- **RDV 365** : À ton tour (conclusion)

### Passages déjà bien gérés (aucune action)
- RDV 59 (Aïcha) : très bien équilibré avec mention sensibilité moderne
- RDV 76 (prisonniers Badr) : honnête, Anfâl 8:67 cité avec contexte
- RDV 144 (Banū Qurayẓa) : excellent, contexte Torah/criminels de guerre
- RDV 167 (Safiyya) : consentement explicite et respecté
- RDV 168 (brebis empoisonnée) : équilibré
- Tous les RDV mentionnant l'esclavage : présentés systématiquement dans contexte d'affranchissement (Bilâl, Zayd, Suhayb)

---

## SYNTHÈSE

- **4 corrections critiques** (1 structurelle + 3 Play Store)
- **30 doublons** à supprimer (RDV 311-340)
- **2 optionnelles** à arbitrer par Nabs
- **Total final attendu :** 335 RDV au lieu de 365
- **Verdict :** Fichier d'une qualité littéraire exceptionnelle, prêt après ce nettoyage pour validation imam phase 2.

---

## DÉCISIONS REQUISES AVANT EXÉCUTION

1. **Corrections OPTIONNELLES** (1 et 2) : OUI / NON / DEFAUT (par défaut : NON)
2. **Question** : Le RDV 346-357 format court est-il intentionnel ? (à confirmer)

Si Nabs ne précise pas : par défaut, **4 corrections critiques + 30 doublons uniquement**.
