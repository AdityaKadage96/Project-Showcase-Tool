const CACHE_NAME = "project-showcase-cache-v1";
const urlsToCache = [
  "/",
  "/css/styles.css",
  "/scripts/main.js",
  "/offline.html",
  "/manifest.json"
];

// Install Service Worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

// Fetch cached resources
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request);
//     })
//   );
// });

// Fetch cached resources
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       return response || fetch(event.request).catch(() => caches.match("/offline.html"));
//     })
//   );
// });

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) {
        // Serve cached response if available
        return response;
      }

      // Otherwise fetch from network and cache it for offline use
      return fetch(event.request)
        .then((res) => {
          // Only cache valid responses (status 200, type basic)
          if (!res || res.status !== 200 || res.type !== "basic") {
            return res;
          }

          const resToCache = res.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, resToCache);
          });

          return res;
        })
        .catch(() => {
          // Offline fallback (optional)
          if (event.request.mode === "navigate") {
            return caches.match("/");
          }
        });
    })
  );
});

