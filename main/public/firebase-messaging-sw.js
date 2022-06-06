importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyALxN0MzAZjKtox_on54foHfOaJOkhwLhQ",
  authDomain: "arvandshop-10411.firebaseapp.com",
  projectId: "arvandshop-10411",
  storageBucket: "arvandshop-10411.appspot.com",
  messagingSenderId: "893130691839",
  appId: "1:893130691839:web:ae8a1209009a977ca428ca"
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
