// ═══════════════════════════════════════════════════════════════════
// Xander Calendar — Service Worker
// Handles incoming push notifications and notification clicks
// ═══════════════════════════════════════════════════════════════════

self.addEventListener('install', event => {
  // Activate immediately, don't wait for old worker to die
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // Take control of all open tabs/windows immediately
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', event => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {
      title: 'Calendar update',
      body: event.data ? event.data.text() : 'Tap to review'
    };
  }

  const title = data.title || 'Xander Calendar';
  const options = {
    body: data.body || 'You have something to review',
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="80">📅</text></svg>',
    badge: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="80">📅</text></svg>',
    tag: data.tag || 'cal-update',
    data: data,
    requireInteraction: false,
    vibrate: [200, 100, 200],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data && event.notification.data.url
    ? event.notification.data.url
    : '/';
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(clientList => {
      for (const client of clientList) {
        if (client.url.includes(location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) return clients.openWindow(url);
    })
  );
});
