const CACHE_NAME = 'scanner-v11-proxy';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

self.addEventListener('fetch', e => {
  // EXTREMELY IMPORTANT: Do NOT cache the API call
  if (e.request.url.includes('/api/scan')) {
    return fetch(e.request);
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});