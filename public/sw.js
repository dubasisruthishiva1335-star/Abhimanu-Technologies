// Abhimanyu Technologies — Progressive Web App Service Worker (v2 Performance Optimized)
const CACHE_NAME = 'abhimanyu-cache-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/chakravyuha.html',
  '/cad-it.html',
  '/sri-yantra.html',
  '/manifest.json',
  '/abhimanyu-emblem-transparent.png',
  '/abhimanyu-logo.png',
  '/abhimanyu-logo.jpg',
  '/og-preview.jpg',
  '/robots.txt',
  '/sitemap.xml'
];

// 1. Install & Pre-cache App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. Activate & Purge Stale Caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// 3. Stale-While-Revalidate & Network-First Routing
self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // Bypass Cache for API calls, Load Balancer telemetry, and non-GET requests
  if (req.method !== 'GET' || url.pathname.startsWith('/api') || url.pathname.startsWith('/lb-status')) {
    return;
  }

  // Static Assets (.js, .css, images, fonts) -> Stale While Revalidate
  const isStaticAsset = (
    url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|webp|woff2|ttf|ico|json)$/) ||
    url.pathname.startsWith('/assets/')
  );

  if (isStaticAsset) {
    event.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req).then((networkRes) => {
          if (networkRes && networkRes.status === 200) {
            const clone = networkRes.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, clone));
          }
          return networkRes;
        }).catch(() => null);

        return cached || fetchPromise;
      })
    );
    return;
  }

  // HTML Navigation -> Network First with Offline Cache Fallback
  event.respondWith(
    fetch(req).then((networkRes) => {
      if (networkRes && networkRes.status === 200) {
        const clone = networkRes.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, clone));
      }
      return networkRes;
    }).catch(() => {
      return caches.match(req).then((cached) => {
        if (cached) return cached;
        if (req.headers.get('accept')?.includes('text/html')) {
          return caches.match('/index.html');
        }
      });
    })
  );
});
