# SPEC-SW-CACHE-FIRST — Ouverture instantanée (network-first → cache-first)

Fichier : sw.js.

## Problème
`CORE` précache déjà le shell + tous les JSON/assets à l'install. Mais le
handler fetch même-origine est en network-first : il attend le réseau à chaque
ouverture (cache seulement si le réseau ÉCHOUE, pas s'il est lent). D'où
« des fois ça met du temps ».

## Édit — UN seul bloc à remplacer (handler same-origin)

REMPLACER EXACTEMENT ce bloc :

```js
  if (url.origin === self.location.origin) {
    e.respondWith(
      fetch(e.request)
        .then(res => {
          if (res && res.status === 200) {
            const clone = res.clone();
            caches.open(VERSION).then(c => c.put(e.request, clone));
          }
          return res;
        })
        .catch(async () => {
          const cached = await caches.match(e.request);
          return cached || new Response('', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }
```

PAR (cache-first : cache instantané, réseau seulement si absent du cache) :

```js
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(e.request).then(cached => {
        if (cached) return cached;
        return fetch(e.request)
          .then(res => {
            if (res && res.status === 200) {
              const clone = res.clone();
              caches.open(VERSION).then(c => c.put(e.request, clone));
            }
            return res;
          })
          .catch(() => new Response('', { status: 503, statusText: 'Offline' }));
      })
    );
    return;
  }
```

## NE PAS toucher
- Le handler API (anthropic/api → reste network-only) : il DOIT rester réseau.
- Le handler audio (everyayah… → reste network-only).
- Le handler fonts (déjà en stale-while-revalidate, OK).
- `CORE`, install, activate : inchangés.

## Effet
- Ouverture instantanée à chaque fois (tout CORE servi depuis le cache).
- Mises à jour : toujours propagées via le bump de VERSION (install re-précache
  CORE frais, activate purge l'ancien). La 1ʳᵉ ouverture après un déploiement
  re-précache (réseau) puis tout est instantané ensuite.

## Contraintes
- `npm run build` AVANT git commit (bump VERSION du SW + régénère les min).
