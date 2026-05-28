const VERSION = 'niyyah-v1579';
const CORE = [
  './index.html',
  './script.min.js',
  './style.min.css',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './logo2.webp',
  './jannat-al-qalb.mp3',
  './rahatal-qulub.mp3',
  './ferme-ta-journee.webp',
  './bab-nafs-content.json',
  './savais_tu.json',
  './fiqh_jour.json',
  './hadiths_jour.json',
  './compagnons.json',
  './duaas.json',
  './prophetes.json',
  './data/sira.min.json',
  './data/recits-coran.json',
  './data/regard-library.json',
  './data/events/aid_module_complet.json',
  './data/events/aid_cartes_voeux.json',
  './data/modules/ghidaa_module_complet.json',
  './data/modules/tibb_module_complet.json',
  './data/modules/mashhurat_module_complet.json',
  './data/waqt/waqt_fajr.json',
  './data/waqt/waqt_dhuhr.json',
  './data/waqt/waqt_asr.json',
  './data/waqt/waqt_maghrib.json',
  './data/waqt/waqt_isha.json',
  './data/waqt/tafakkur_final.json',
  './data/waqt/tafakkur_nouvelles_questions.json',
  './data/waqt/tafakkur_recits.json',
  './data/niyyah_pool.json',
  './data/lisan/lisan_palier1_tranche1.json',
  './data/lisan/lisan_methode.json',
  './assets/moments/fajr.webp',
  './assets/moments/dhuhr.webp',
  './assets/moments/asr.webp',
  './assets/moments/maghrib.webp',
  './assets/moments/isha.webp',
  './assets/tachriq-bg.webp',
];
const FONTS_CACHE = 'niyyah-fonts-v1';

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)));
});

self.addEventListener('message', e => {
  if (e.data && e.data.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== VERSION && k !== FONTS_CACHE).map(k => caches.delete(k)))
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
    e.respondWith(fetch(e.request).catch(() => new Response('{"error":"offline"}', { status: 503, headers: { 'Content-Type': 'application/json' } })));
    return;
  }

  if (['everyayah.com','mp3quran.net','quranicaudio.com','soundcloud.com','sndcdn.com'].some(h => url.hostname.includes(h))) {
    e.respondWith(fetch(e.request).catch(() => new Response('', { status: 503 })));
    return;
  }

  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    e.respondWith(
      caches.open(FONTS_CACHE).then(cache =>
        cache.match(e.request).then(cached => {
          var net = fetch(e.request).then(res => { if (res && res.status === 200) cache.put(e.request, res.clone()); return res; }).catch(() => cached || new Response('', { status: 503 }));
          return cached || net;
        })
      )
    );
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
