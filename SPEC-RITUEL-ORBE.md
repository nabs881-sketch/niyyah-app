# SPEC-RITUEL-ORBE (l'orbe du Sanctuaire sur les vues rituelles, plus petite)

## Ce que ça fait
Remplace l'emblème doré (cercle + arabe) par **l'orbe du Sanctuaire** (`orb_tafakkur.webp` + lueur + souffle),
en plus petit (64px), en gardant l'arabe de chaque vue (يوم, صلاة…). S'applique à toutes les vues rituelles.

## Cible
`style.css`. ⚠️ caché par le SW → **`npm run build` AVANT le commit.** Réversible.

## 1 — remplacer la règle .rituel-emblem
CHERCHER :
```
.rituel-emblem {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  width: 78px; height: 78px; border-radius: 50%;
  border: 1px solid rgba(200,168,74,0.45);
  color: #F6DA8A;
  font-family: 'Scheherazade New', serif;
  font-size: 30px; line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(200,168,74,0.4);
  z-index: 0;
}
```
REMPLACER PAR :
```
.rituel-emblem {
  position: relative;
  display: inline-flex; align-items: center; justify-content: center;
  width: 64px; height: 64px; border-radius: 50%;
  border: none;
  background: transparent url('assets/orb_tafakkur.webp') center/contain no-repeat;
  color: hsl(38,55%,15%);
  font-family: 'Scheherazade New', serif;
  font-size: 22px; line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 1px 0 hsla(44,85%,80%,0.5), 0 -1px 1px rgba(30,18,4,0.4);
  filter: drop-shadow(0 0 16px rgba(212,175,55,0.45)) drop-shadow(0 0 32px rgba(184,134,11,0.25));
  animation: orbBreathV2 7s var(--ease-breath-v2) infinite;
  z-index: 0;
}
```

## 2 — désactiver l'ancienne lueur (ajouter à la fin du fichier)
```css
.rituel-emblem::before{ display:none; }
```

## Build + commit
```
npm run build
git add style.css style.min.css sw.js && git commit -m "vues rituelles: orbe du Sanctuaire (plus petite) a la place de l emblème"
git push
```

> Teste la taille : si tu la veux plus petite/grande, `width/height: 64px` → 56px ou 72px (les deux).
> Si l'arabe se lit mal sur l'orbe, dis-moi et j'ajuste la couleur du texte.
