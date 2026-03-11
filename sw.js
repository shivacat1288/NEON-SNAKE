self.addEventListener('install', event => {
    console.log('SW: installiert');
    self.skipWaiting(); // sofort aktivieren
});

self.addEventListener('activate', event => {
    console.log('SW: aktiviert');
    event.waitUntil(clients.claim()); // sofort Kontrolle übernehmen
});

importScripts(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);

importScripts(
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
    apiKey: "AIzaSyDJF5PLnlWghvf1Tev7Ibiy6lDAqZhWc4Q",
    authDomain: "rainbow-snake-5d7ac.firebaseapp.com",
    projectId: "rainbow-snake-5d7ac",
    messagingSenderId: "728021400110",
    appId: "1:728021400110:web:c2bd1759d718fbe6b5bdbf"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {

    console.log("Push received", payload);

    // Nur anzeigen wenn keine automatische Firebase Notification existiert
    if (!payload.notification && payload.data) {

        self.registration.showNotification(payload.data.title, {
            body: payload.data.body,
            icon: "/NEON-SNAKE/icon-192.png"
        });

    }

});

self.addEventListener("notificationclick", function (event) {

    event.notification.close();

    event.waitUntil(
        clients.openWindow("/NEON-SNAKE/")
    );

});