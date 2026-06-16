# SPEC-INTENTION-BOUTON-OR (encre plus lisible + bouton Ancrer or plein + étoile retirée)

## Cible
`style.css` ET `index.html`. ⚠️ cachés par le SW → **`npm run build` AVANT le commit.** Réversible.

## 1 — Encre des cartes plus claire (style.css)
CHERCHER :
```
  border-color:rgba(212,175,55,0.5);
  color:#F6ECD6;
```
REMPLACER PAR :
```
  border-color:rgba(212,175,55,0.5);
  color:#FBF6EA;
```

## 2 — Bouton « Ancrer » en or plein (style.css)
### 2a — état repos
CHERCHER :
```
.btn-confirm-v2 {
  width: 100%;
  background: linear-gradient(135deg, rgba(212,175,55,0.13), rgba(212,175,55,0.07));
  border: 1px solid rgba(212,175,55,0.32); border-radius: 100px;
  padding: 15px; color: var(--gold-v2);
```
REMPLACER PAR :
```
.btn-confirm-v2 {
  width: 100%;
  background: linear-gradient(135deg,#E8C66C,#C8A14A);
  border: none; border-radius: 100px;
  padding: 16px; color: #2A1E0C; font-weight: 500;
```
### 2b — état survol
CHERCHER :
```
.btn-confirm-v2:hover {
  background: linear-gradient(135deg, rgba(212,175,55,0.22), rgba(212,175,55,0.10));
  box-shadow: 0 0 28px rgba(212,175,55,0.18); transform: translateY(-1px);
}
```
REMPLACER PAR :
```
.btn-confirm-v2:hover {
  background: linear-gradient(135deg,#F0D27E,#D2AC52);
  box-shadow: 0 0 28px rgba(212,175,55,0.35); transform: translateY(-1px);
}
```

## 3 — Retirer l'étoile ✦ (index.html)
CHERCHER :
```
✦ Ancrer cette Intention
```
REMPLACER PAR :
```
Ancrer cette Intention
```

## Build + commit
```
npm run build
git add style.css style.min.css index.html sw.js && git commit -m "intention: encre plus lisible + bouton Ancrer or plein + etoile retiree"
git push
```

## Curseurs réglables
- encre encore plus blanche : `#FBF6EA` → `#FFFDF7`.
- bouton plus profond (or moins clair) : `#E8C66C,#C8A14A` → `#D8B65A,#B8923E`.
- si la Sienne reste un peu claire en haut (contraste), on peut foncer le dégradé : `#9c5a24,#5e3413` → `#8f5220,#562f10`.
