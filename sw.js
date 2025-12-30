const CACHE_NAME = 'scanner-v17-fingerprint';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// Install: Cache files and skip waiting to activate immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); 
});

// Activate: Clear out old versions (v16, v15, etc.)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Manage API and Cache
self.addEventListener('fetch', (event) => {
  // Always let Groq API calls go through to the internet
  if (event.request.url.includes('api.groq.com')) {
    return fetch(event.request);
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});