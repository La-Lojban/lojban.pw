// Simple service worker for static export
const CACHE_NAME = 'lojban-pwa-v4';
const urlsToCache = [
  '/'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.log(`[SW] Failed to cache ${url}:`, err);
              return null;
            })
          )
        );
      })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - network-first for navigation, cache-first for other resources
self.addEventListener('fetch', (event) => {
  // Use network-first for navigation requests (HTML documents)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Only cache successful, non-redirected responses
          if (response.status === 200 && (response.type === 'basic' || response.type === 'cors')) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone).catch(err => {
                console.log('[SW] Cache put error:', err);
              });
            });
          }
          return response;
        })
        .catch((err) => {
          console.log('[SW] Network fetch failed, trying cache:', event.request.url, err);
          // If network fails, try cache
          return caches.match(event.request)
            .then((cached) => {
              if (cached) return cached;
              
              // Only fallback to '/' if the request is actually for the root path
              const url = new URL(event.request.url);
              if (url.pathname === '/' || url.pathname === '/index.html') {
                return caches.match('/');
              }
              
              // Return undefined to let the browser handle the network error itself
              return undefined;
            });
        })
    );
    return;
  }

  // For other requests (assets, etc.), use cache-first
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
      .catch(() => {
        // If both fail, return nothing for non-document requests
        return undefined;
      })
  );
});

// Push notification support (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: data.icon || '/icon-192x192.png',
      badge: '/icon-192x192.png',
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: '1',
      },
    };
    event.waitUntil(
      self.registration.showNotification(data.title || 'Lojban Made Easy', options)
    );
  }
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});
