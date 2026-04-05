const VERSION = 'niyyah-v11';
// Uniquement les fichiers essentiels — léger et rapide
const ASSETS = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(VERSION).then(c => c.addAll(ASSETS))
  );
  self.skipWaiting();
});

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
  // Audio et images externes → réseau direct, pas de cache
  if (url.hostname.includes('everyayah') || url.hostname.includes('mp3quran') || url.hostname.includes('quranicaudio') || url.hostname.includes('soundcloud')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // Fichiers locaux → cache d'abord, réseau si absent
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request).then(res => {
      if (res && res.status === 200 && url.origin === self.location.origin) {
        const clone = res.clone();
        caches.open(VERSION).then(c => c.put(e.request, clone));
      }
      return res;
    }))
  );
});
