# AUDIT TRANSLITTÉRATION ALLAH — INSTRUCTIONS CLAUDE CODE

**Objectif :** Uniformiser la translittération du nom d'Allah sur les 16 fichiers contenu Niyyah.
**Décision Nabs validée 2026-05-23 :** Forme retenue = `Allah` (simple, sans diacritique).
**Raison :** majorité des fichiers déjà sur "Allah", style mainstream francophone, meilleure accessibilité Play Store.

---

## RÈGLE D'EXÉCUTION

1. Touche TOUS les fichiers JSON sources nécessaires.
2. Régénère les .docx miroirs après modification.
3. PAS DE BUMP SW.
4. PAS DE `cp script.js script.min.js`.
5. UN SEUL COMMIT à la fin : `audit translittération : uniformisation Allah (16 fichiers)`

---

## TRANSFORMATIONS À APPLIQUER

### Transformation 1 — Allâh → Allah

Remplacer **tous** les `Allâh` par `Allah` dans les **textes français** des fichiers JSON.

**Exemples :**
- "Allâh dit" → "Allah dit"
- "Allâh est" → "Allah est"
- "par Allâh" → "par Allah"

### Transformation 2 — Allāh → Allah

Remplacer **tous** les `Allāh` (avec macron) par `Allah` dans les **textes français**.

### Transformation 3 — Mots composés avec ALLAH

| Forme actuelle (toutes variantes) | Forme cible uniforme |
|----------------------------------|---------------------|
| `Allâhu akbar` / `Allāhu akbar` | `Allahu akbar` |
| `Allâhumma` / `Allāhumma` | `Allahumma` |
| `Bismillâh` / `Bismillāh` | `Bismillah` |
| `Inshâ Allâh` / `Inshā'Allāh` | `Insha Allah` |
| `Mâ shâ Allâh` / `Mā shā'Allāh` | `Masha Allah` |
| `Subhân Allâh` / `Subhāna Allāh` | `Subhan Allah` |
| `Hamdulillâh` / `Alhamdulillâh` | `Alhamdulillah` |
| `Astaghfirullâh` | `Astaghfirullah` |
| `Hasbiyallâh` / `Hasbiyallāh` | `Hasbiyallah` |
| `Lâ ilâha illâ Allâh` | `La ilaha illa Allah` |

---

## RÈGLES IMPORTANTES — À RESPECTER

### RÈGLE 1 — Textes arabes intacts

**NE PAS TOUCHER** les textes en alphabet arabe. Toutes les occurrences de `الله` (al-lah en arabe) restent strictement inchangées.

```javascript
// Si une valeur contient des caractères arabes (\u0600-\u06FF), 
// soit la traiter avec précaution, soit la skipper.
```

### RÈGLE 2 — Noms propres préservés

Les noms propres contenant Allah doivent être préservés tels quels :

- `Abdullah` (= `'Abdullah`, `Abdallâh`, `Abdullāh` → conserver la forme `Abdullah`)
- `Hibatullah`, `Asadullah`, `Habibullah` etc. → conserver
- `Bayt Allah` (la Maison de Allah, désigne la Kaaba) → `Bayt Allah` (Allah avec majuscule, sans accent)
- `Rasulullah` / `Rasûlullâh` → `Rasulullah`

### RÈGLE 3 — Citations directes du Coran/hadith

Si une **citation arabe translittérée** suit immédiatement le texte arabe original, elle utilise la translittération scientifique avec macrons. Ces translittérations entre **italiques** ou marquées comme citations directes peuvent garder leur forme.

**Exemple à PRÉSERVER :**
```
الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا
Al-hamdu lillāhi alladhī ahyānā
Louange à Allah qui nous a rendu la vie
```

Dans cet exemple :
- La ligne arabe : intacte
- La translittération scientifique `Al-hamdu lillāhi alladhī ahyānā` : **peut être préservée** car elle est une transcription phonétique précise (différent du texte courant)
- La traduction française "Allah" : uniformiser

### RÈGLE 4 — Champs métadonnées

Les champs comme `source`, `id`, `categorie` ne contiennent normalement pas "Allah" et ne doivent pas être touchés (sauf si un `id` contient explicitement `allah_X`, à laisser tel quel).

---

## MÉTHODE D'EXÉCUTION

### Étape 1 — Inventaire avant transformation

Pour chaque fichier JSON, compter les occurrences :

```bash
for f in data/waqt/*.json; do
  echo "=== $f ==="
  grep -oE "Allah|Allâh|Allāh|Allāhumma|Allāhu" "$f" | sort | uniq -c
done
```

Garder ce comptage dans un fichier `inventaire_avant.txt`.

### Étape 2 — Transformations ciblées

Utilise un script Node.js qui :

1. Lit chaque JSON
2. Parcourt **les valeurs string** (pas les clés)
3. Pour chaque string :
   - Si elle contient des caractères arabes (regex `/[\u0600-\u06FF]/`), traite avec précaution segment par segment
   - Sinon, applique les remplacements dans l'ordre suivant :
     1. `Lā ilāha illā Allāh` → `La ilaha illa Allah`
     2. `Lâ ilâha illâ Allâh` → `La ilaha illa Allah`
     3. `Mā shā'Allāh` → `Masha Allah`
     4. `Mâ shâ Allâh` → `Masha Allah`
     5. `Inshā'Allāh` → `Insha Allah`
     6. `Inshâ Allâh` → `Insha Allah`
     7. `Subhāna Allāh` → `Subhan Allah`
     8. `Subhân Allâh` → `Subhan Allah`
     9. `Hasbiyallāh` → `Hasbiyallah`
     10. `Hasbiyallâh` → `Hasbiyallah`
     11. `Astaghfirullâh` → `Astaghfirullah`
     12. `Alhamdulillâh` → `Alhamdulillah`
     13. `Hamdulillâh` → `Alhamdulillah`
     14. `Bismillāh` → `Bismillah`
     15. `Bismillâh` → `Bismillah`
     16. `Allāhumma` → `Allahumma`
     17. `Allâhumma` → `Allahumma`
     18. `Allāhu akbar` → `Allahu akbar`
     19. `Allâhu akbar` → `Allahu akbar`
     20. `Rasûlullâh` / `Rasūlullāh` → `Rasulullah`
     21. `Allāh` → `Allah`
     22. `Allâh` → `Allah`

4. Préserve les noms propres : Abdullah, Hibatullah, Bayt Allah, etc. (ils contiennent déjà "Allah" simple).

### Étape 3 — Vérification post-transformation

```bash
for f in data/waqt/*.json; do
  echo "=== $f ==="
  echo "Allah: $(grep -oE 'Allah' "$f" | wc -l)"
  echo "Allâh: $(grep -oE 'Allâh' "$f" | wc -l)"
  echo "Allāh: $(grep -oE 'Allāh' "$f" | wc -l)"
done
```

**Cible attendue :**
- `Allah` : nombre élevé partout
- `Allâh` : 0 ou très faible (uniquement dans translittérations scientifiques préservées)
- `Allāh` : 0 ou très faible (idem)

### Étape 4 — Validation des cas particuliers

Vérifier manuellement quelques cas :

```bash
# Doit retourner les translittérations scientifiques préservées si applicable
grep "Al-hamdu lillāh" data/waqt/duaas.json
grep "Allâhumma" data/waqt/*.json  # Doit être 0 ou très peu
grep "Abdullah" data/waqt/*.json   # Doit être nombreux (Abdullah préservé)
```

### Étape 5 — Régénération des DOCX miroirs

Pour chaque fichier modifié, régénérer son .docx miroir via le script habituel.

### Étape 6 — Sanity check

Lance le test :

```bash
# Vérifie qu'aucun JSON n'est cassé
for f in data/waqt/*.json; do
  node -e "JSON.parse(require('fs').readFileSync('$f', 'utf8'))" 2>&1 | grep -v "^$" && echo "PROBLÈME: $f"
done
```

Si aucun fichier ne sort en problème → COMMIT.

---

## EXCEPTIONS — TRANSLITTÉRATIONS SCIENTIFIQUES À PRÉSERVER

Dans le fichier `duaas.json`, beaucoup de du'as contiennent une **ligne de translittération scientifique** juste après le texte arabe. Ces lignes utilisent volontairement les macrons pour la précision phonétique :

```
الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ

Al-hamdu lillāhi alladhī ahyānā ba'da mā amātanā wa ilayhi an-nushūr

Louange à Allah qui nous a rendu la vie après nous l'avoir ôtée
```

**RÈGLE PRAGMATIQUE :** Si la ligne contient `lillāhi`, `lillāh`, ou commence par une formule de translittération scientifique avec multiples macrons (ā, ī, ū), **la préserver intacte**.

Pour faire la distinction, le script peut utiliser cette heuristique :
- Si la ligne contient 2+ caractères avec macrons (ā/ī/ū) → c'est une translittération scientifique → préserver
- Si la ligne contient `Allâh` ou `Allāh` isolé dans un texte français courant → uniformiser

**Si l'heuristique est trop complexe à implémenter parfaitement, fais d'abord les transformations sur tous les fichiers SAUF `duaas.json`, puis traite duaas séparément.**

---

## VALIDATION POST-EXÉCUTION

Après les modifications :

1. Tous les .docx miroirs régénérés
2. `Allah` (sans accent) est la forme dominante partout (>95% des cas)
3. `Allâh` résiduel uniquement dans translittérations scientifiques de duaas
4. Noms propres préservés (Abdullah, Hibatullah, etc.)
5. Textes arabes intacts (الله)
6. JSON parsable partout
7. COMMIT : `audit translittération : uniformisation Allah (16 fichiers)`

---

## ROLLBACK

Si quelque chose se passe mal :

```bash
git reset --hard HEAD~1
```

Tu retombes sur l'état d'avant la modification. Pas de panique.

---

## SYNTHÈSE

- **Action principale** : Allâh / Allāh → Allah
- **20+ formules composées** uniformisées
- **Translittérations scientifiques duaas** : préservées
- **Noms propres** : préservés
- **Textes arabes** : intouchés
- **Verdict attendu** : 16 fichiers uniformisés, prêts pour Play Store.

---

## NOTE STRATÉGIQUE

Cette uniformisation est la **dernière étape éditoriale** avant le passage aux bloqueurs Play Store techniques (Capacitor, RGPD, watermarks).

Après ce commit, le contenu Niyyah est **éditorialement clos**. On passe à la technique.
