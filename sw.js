const VERSION = 'niyyah-v134';
const CORE = [
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo2.png',
  './jannat-al-qalb.mp3',
  './rahatal-qulub.mp3',
  './ferme-ta-journee.jpg',
  './assets/moments/fajr.jpg',
  './assets/moments/dhuhr.jpg',
  './assets/moments/asr.jpg',
  './assets/moments/maghrib.jpg',
  './assets/moments/isha.jpg',
];

self.addEventListener('install', e => {
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

  if (
    url.hostname.includes('anthropic.com') ||
    url.hostname.includes('railway.app') ||
    url.hostname.includes('render.com') ||
    url.pathname.startsWith('/api/')
  ) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  if (['everyayah.com','mp3quran.net','quranicaudio.com','soundcloud.com','sndcdn.com'].some(h => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

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

  e.respondWith(fetch(e.request).catch(async () => {
    const cached = await caches.match(e.request);
    return cached || new Response('', { status: 503, statusText: 'Offline' });
  }));
});

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window' }).then(list => {
      for (const client of list) {
        if ('focus' in client) {
          client.postMessage({ type: 'NOTIFICATION_ACTION', action: e.action });
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
