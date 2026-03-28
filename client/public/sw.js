const CACHE_NAME = 'harvest-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png',
  '/logo512.png',
  '/community profile pictures/growth.png',
  '/community resilience/growth.png',
  '/community resilience/reduce waste.png',
  '/community resilience/market.png',
  '/favicon.svg',
  '/icons.svg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
