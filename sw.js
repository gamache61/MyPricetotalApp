const CACHE_NAME = 'scanner-v15';
const ASSETS = [
  './index.html',
  './manifest.json'
];

// Install: Cache new files and force immediate activation
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); // Forces the new version to take over immediately
});

// Activate: Clean up the old Llama 4 caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Handle API traffic
self.addEventListener('fetch', (event) => {
  // Allow Groq API calls to bypass the cache entirely
  if (event.request.url.includes('api.groq.com')) {
    return fetch(event.request);
  }
  
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});