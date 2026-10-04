// Abhimanyu Technologies — Progressive Web App Service Worker
const CACHE_NAME = 'abhimanyu-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/sri-yantra.html',
  '/manifest.json',
  '/logo.png',
  '/favicon.ico'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  // Stale-while-revalidate / cache-first for static assets
  event.respondWith(
    caches.match(req).then((cachedResp) => {
      if (cachedResp) {
        // Fetch in background to update cache
        fetch(req).then((networkResp) => {
          if (networkResp && networkResp.status === 200) {
            caches.open(CACHE_NAME).then((cache) => cache.put(req, networkResp.clone()));
          }
        }).catch(() => {});
        return cachedResp;
      }
      return fetch(req).then((networkResp) => {
        if (!networkResp || networkResp.status !== 200 || networkResp.type !== 'basic') {
          return networkResp;
        }
        const respToCache = networkResp.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, respToCache));
        return networkResp;
      }).catch(() => {
        // Offline fallback for HTML navigation
        if (req.headers.get('accept') && req.headers.get('accept').includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
