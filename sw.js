const VERSION = 'niyyah-v12';
const CORE = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png', './bg.png', './logo2.png'];

// Install : rien — instantané
self.addEventListener('install', e => {
  self.skipWaiting();
});

// Activate : vider anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // Audio externe → réseau uniquement, jamais de cache
  if (['everyayah.com','mp3quran.net','quranicaudio.com','soundcloud.com','sndcdn.com'].some(h => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request).catch(() => new Response('', {status: 503})));
    return;
  }

  // Fichiers locaux → réseau d'abord, cache en fallback + mise en cache automatique
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
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Tout le reste → réseau
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
