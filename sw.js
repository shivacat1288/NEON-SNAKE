self.addEventListener('install', event => {
    console.log('SW: installiert');
    self.skipWaiting(); // sofort aktivieren
});

self.addEventListener('activate', event => {
    console.log('SW: aktiviert');
    event.waitUntil(clients.claim()); // sofort Kontrolle übernehmen
});