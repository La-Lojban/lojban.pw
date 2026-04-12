// Caching disabled: legacy installs may still load this file until unregistered from the app.
// No fetch handler — requests are not intercepted. Activate clears any old Cache API entries.
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) => Promise.all(names.map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});
