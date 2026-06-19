# SPEC-DHIKR-FULLSCREEN — Tap sur istighfar/tasbih ouvre le fullscreen

## Objectif
Dans renderCounter(), les items _isDhikr (tasbih, istighfar) doivent ouvrir
openTasbih() au tap — comme dans le Wird — sans afficher les boutons +/-.

## script.js — dans renderCounter(), bloc if (_isDhikr)

Trouve la ligne du return qui commence par :
```
'<div class=\"item' + (done ? ' checked' : '') + '\" style=\"animation-delay:' + delay + 'ms\" id=\"item-' + item.id + '\"><div class=\"check-circle\" id=\"cb-'
```

Ajoute `onclick` et `cursor:pointer` sur ce div :
```
'<div class=\"item' + (done ? ' checked' : '') + '\" style=\"animation-delay:' + delay + 'ms;cursor:pointer\" id=\"item-' + item.id + '\" onclick=\"openTasbih(\\'' + item.id + '\\',' + item.target + ',\\'' + labelEsc + '\\',\\'' + arabicEsc + '\\',\\'' + _phoneticEscFs + '\\',\\'' + _transEscFs + '\\',\\'' + _srcEscFs + '\\')\"><div class=\"check-circle\" id=\"cb-'
```

## Trigger

```
Lis SPEC-DHIKR-FULLSCREEN.md et applique-le.
npm run build && git add -A && git commit -m "fix: istighfar et tasbih tap ouvre fullscreen comme Wird"
```
