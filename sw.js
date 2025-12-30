const CACHE_NAME = 'MyPricescanApp-v23-llama4';
const ASSETS = ['./index.html', './manifest.json'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(ASSETS)));
  self.skipWaiting(); 
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => {
    return Promise.all(ks.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
  }));
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.url.includes('api.groq.com')) return fetch(e.request);
  e.respondWith(caches.match(e.request).then((res) => res || fetch(e.request)));
});