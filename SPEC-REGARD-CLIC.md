# SPEC-REGARD-CLIC

## Cible
`script.js` — fonction `regardeOpen()`.

## Problème
L'écran Regard ne s'affiche (`.active`) qu'APRÈS l'accord caméra. Si la caméra est
bloquée (navigateur in-app type Instagram/WhatsApp, ou permission refusée),
`regardeOpen()` sort sans rien afficher → « ça clique pas ».

## But
Ouvrir l'écran DÈS le tap (feedback immédiat) + afficher un message clair si la
caméra est indisponible, au lieu d'un return silencieux.

---

## Édit 1 — ouvrir l'écran tout de suite

Repérer :
```js
  if (!screen || !content) return;
  closeRegardeJournal();
```
REMPLACER par :
```js
  if (!screen || !content) return;
  screen.classList.add('active');
  document.body.style.overflow = 'hidden';
  content.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:rgba(200,168,75,0.6);font-family:\'Cormorant Garamond\',serif;font-style:italic;">\u2026</div>';
  closeRegardeJournal();
```

---

## Édit 2 — message clair si caméra refusée (au lieu de return muet)

Repérer :
```js
  var _camOk = await _askCameraPermission('regarde');
  if (!_camOk) return;
```
REMPLACER par :
```js
  var _camOk = await _askCameraPermission('regarde');
  if (!_camOk) {
    content.innerHTML = '<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;gap:14px;padding:0 10%;text-align:center;">'
      + '<div style="font-family:\'Cormorant Garamond\',serif;font-size:16px;font-style:italic;color:#C8A84A;">' + t('camera_denied') + '</div>'
      + '<div style="font-size:12px;color:rgba(255,255,255,0.55);line-height:1.6;">Si tu as ouvert Niyyah depuis Instagram, WhatsApp ou Messenger, ouvre-le plut\u00f4t dans Safari ou Chrome \u2014 la cam\u00e9ra y est bloqu\u00e9e.</div>'
      + '<button onclick="regardeClose()" style="margin-top:8px;padding:10px 24px;border-radius:12px;border:1px solid rgba(200,168,75,0.3);background:transparent;color:#C8A84A;font-size:13px;cursor:pointer;">' + t('btn_close') + '</button>'
      + '</div>';
    return;
  }
```

---

## Vérif attendue
- Taper « Regard » ouvre **toujours** l'écran (plus de « rien »).
- Caméra bloquée → message « autorise la caméra / ouvre dans Safari » au lieu du vide.
- Caméra OK → comportement normal inchangé.

## Build (OBLIGATOIRE — script.js modifié)
```
npm run build
git add -A
git commit -m "regard: ouvre l'ecran au tap + message clair si camera bloquee (in-app browser)"
git push
```
