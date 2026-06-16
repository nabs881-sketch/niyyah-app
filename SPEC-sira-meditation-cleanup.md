# SPEC — Nettoyage des méditations Sîra

## Objectif
Supprimer le préfixe `─────────────\n\n` (ligne de tirets suivie de deux sauts de ligne)
au début du champ `meditation.fr` dans **tous les RDV** de `data/sira.min.json`.
305 RDV sont concernés (indices 60 à 364).

## Script Python à exécuter dans le projet

```python
import json, re

with open('data/sira.min.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

rdvs = data.get('rdv', data) if isinstance(data, dict) else data
count = 0
for rdv in rdvs:
    med = rdv.get('meditation', {})
    if isinstance(med, dict) and med.get('fr', '').startswith('─'):
        med['fr'] = re.sub(r'^─+\n\n', '', med['fr'])
        count += 1

with open('data/sira.min.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, separators=(',', ':'))

print(f'{count} méditations nettoyées')
```

## Déclencheur Claude Code

```
Lis SPEC-sira-meditation-cleanup.md et applique-le
```

## Commit final
```
npm run build && git add -A && git commit -m "fix(sira): suppression lignes décoratives dans 305 méditations"
```
