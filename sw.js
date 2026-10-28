// Service worker do link web: recebe os avisos push e abre o app no lugar certo ao tocar.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (event) => event.waitUntil(self.clients.claim()));

self.addEventListener('push', (event) => {
  let aviso = {};
  try {
    aviso = event.data ? event.data.json() : {};
  } catch {
    aviso = { body: event.data ? event.data.text() : '' };
  }
  event.waitUntil(
    self.registration.showNotification(aviso.title || 'Influence', {
      body: aviso.body || '',
      icon: '/icon-192.png?v=2',
      badge: '/icon-192.png?v=2',
      tag: aviso.tag,
      data: { url: aviso.url || '/' },
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = new URL((event.notification.data && event.notification.data.url) || '/', self.location.origin).href;
  event.waitUntil(
    (async () => {
      const abertas = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
      for (const janela of abertas) {
        if ('navigate' in janela) {
          await janela.focus();
          return janela.navigate(url);
        }
      }
      return self.clients.openWindow(url);
    })()
  );
});
