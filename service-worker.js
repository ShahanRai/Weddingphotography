const CACHE_NAME = 'weddingphotography-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/images/background.jpg',
    '/images/hero.jpg',
    '/clients/Shahan_Anvitha/photo1.webp',
    '/clients/Shahan_Anvitha/photo2.webp',
    '/clients/Shahan_Anvitha/photo3.webp',
    '/clients/Another_Client/photo1.webp',
    '/clients/Another_Client/photo2.webp',
    '/clients/Another_Client/photo3.webp',
    // Add other assets you want to cache
];

// Install Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Cached Files
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Update Cache on New Versions
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
