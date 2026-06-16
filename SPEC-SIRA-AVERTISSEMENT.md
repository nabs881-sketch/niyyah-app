# SPEC-SIRA-AVERTISSEMENT

## Objectif
1. Enrichir l'avertissement d'accueil de la Sîra pour dire clairement que c'est un **récit reconstitué à partir des sources classiques** (pas une transcription mot à mot, pas 100% sahih par nature, rien d'inventé, le faible est signalé).
2. Appliquer cette règle au RDV 7 : la « lumière vers la Syrie » doit être **attribuée comme tradition à chaîne faible**, pas donnée comme parole directe d'Aminah.

---

## PARTIE 1 — Note d'accueil (script.js, fonction `SIRA.renderHome`)

Dans `script.js`, repère la note de bas d'accueil de la Sîra. Elle commence par `Un rendez-vous quotidien avec le Messager` et se termine par `rend l'étude désirable.` (texte à l'intérieur d'un `<div style="margin-top:60px;...">`).

**Remplace UNIQUEMENT le texte intérieur de ce `<div>`** (entre `>` et `</div>`) par le nouveau texte ci-dessous.

⚠️ Le fichier échappe les caractères non-ASCII en `\uXXXX` (ex. `\u2019` pour ’, `\uFDFA` pour ﷺ, `\u2014` pour —, `\u00e2` pour â, `\u00e9` pour é, `\u00ee` pour î, `\u1e62`/`\u1e24` etc. pour Ṣ/Ḥ). **Respecte cette convention** : produis le nouveau texte avec le même style d'échappement que le code environnant (n'insère pas d'UTF-8 brut au milieu d'une chaîne échappée).

Nouveau texte (à échapper) — on garde des `<br><br>` entre les paragraphes :

```
Un rendez-vous quotidien avec le Messager d'Allâh ﷺ — trois cent soixante-cinq rencontres pour le découvrir, l'aimer, marcher avec lui.<br><br>Ces pages sont un récit : la vie du Prophète ﷺ tissée à partir des sources classiques — le Coran, les Ṣaḥîḥ d'al-Bukhârî et de Muslim, et les grands livres de Sîra. Les dialogues et les scènes y sont reconstitués pour rendre cette vie vivante, non transcrits mot à mot. La Sîra n'est pas, par nature, entièrement sahih : on n'invente rien ici, et tout détail tiré d'une tradition plus faible ou débattue est signalé dans sa source. Pour ce qui touche au licite, à l'illicite et au dogme, reviens toujours au hadith authentifié et aux savants.<br><br>Ces récits ne remplacent pas l'étude rigoureuse de la Sîra — ils ouvrent la porte de l'amour qui rend l'étude désirable.
```

> Astuce : tu peux remplacer la phrase actuelle « Cette feature ne remplace pas l'étude rigoureuse de la Sîra par les livres et les savants — elle ouvre la porte de l'amour qui rend l'étude désirable. » par les deux nouveaux paragraphes + cette dernière ligne, en conservant le `<div>` et son style inchangés.

---

## PARTIE 2 — RDV 7 (data/sira.min.json)

REMPLACER (texte exact) :
```
Aminah dira plus tard : « Il est sorti de moi une lumière qui illumina les palais de la Syrie. »
```
PAR :
```
La tradition rapporte qu'Aminah aurait dit plus tard : « Il est sorti de moi une lumière qui illumina les palais de la Syrie. » Le récit, transmis par Ibn Saʿd et Aḥmad, a une chaîne discutée — on le reçoit comme une image que la mémoire a gardée, non comme un fait établi.
```

Et dans le champ `source` du RDV 7, REMPLACER :
```
Récit d'Ibn Saʿd, Aḥmad, Ad-Dârimî
```
PAR :
```
Récit d'Ibn Saʿd, Aḥmad, Ad-Dârimî · Note : la « lumière vers la Syrie » à la naissance est une tradition à chaîne faible, à recevoir comme telle.
```

---

## Vérif attendue
- Accueil Sîra : le nouvel avertissement (« un récit… tissée à partir des sources… non transcrits mot à mot… on n'invente rien… signalé dans sa source ») s'affiche en bas.
- `node -e "const d=require('./data/sira.min.json'); const r=d.rdv.find(x=>x.num===7); console.log(/La tradition rapporte qu'Aminah/.test(JSON.stringify(r)))"` → `true`.
- JSON valide ; build OK.

## Build (OBLIGATOIRE — script.js + JSON touchés)
```
npm run build
git add -A
git commit -m "sira: avertissement enrichi (recit reconstitue) + flag RDV7 lumiere (tradition faible)"
```
