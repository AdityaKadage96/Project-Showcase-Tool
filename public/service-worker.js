// // const CACHE_NAME = "project-showcase-cache-v1";
// // const urlsToCache = [
// //   "/",
// //   "/css/styles.css",
// //   "/scripts/main.js",
// //   "/offline.html",
// //   "/manifest.json"
// // ];

// // // Install Service Worker
// // self.addEventListener("install", (event) => {
// //   event.waitUntil(
// //     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
// //   );
// // });

// // // Activate Service Worker
// // self.addEventListener("activate", (event) => {
// //   event.waitUntil(self.clients.claim());
// // });

// // // Fetch cached resources
// // // self.addEventListener("fetch", (event) => {
// // //   event.respondWith(
// // //     caches.match(event.request).then((response) => {
// // //       return response || fetch(event.request);
// // //     })
// // //   );
// // // });

// // // Fetch cached resources
// // // self.addEventListener("fetch", (event) => {
// // //   event.respondWith(
// // //     caches.match(event.request).then((response) => {
// // //       return response || fetch(event.request).catch(() => caches.match("/offline.html"));
// // //     })
// // //   );
// // // });

// // self.addEventListener("fetch", (event) => {
// //   event.respondWith(
// //     caches.match(event.request).then((response) => {
// //       if (response) {
// //         // Serve cached response if available
// //         return response;
// //       }

// //       // Otherwise fetch from network and cache it for offline use
// //       return fetch(event.request)
// //         .then((res) => {
// //           // Only cache valid responses (status 200, type basic)
// //           if (!res || res.status !== 200 || res.type !== "basic") {
// //             return res;
// //           }

// //           const resToCache = res.clone();
// //           caches.open(CACHE_NAME).then((cache) => {
// //             cache.put(event.request, resToCache);
// //           });

// //           return res;
// //         })
// //         .catch(() => {
// //           // Offline fallback (optional)
// //           if (event.request.mode === "navigate") {
// //             return caches.match("/offline.html");
// //           }
// //         });
// //     })
// //   );
// // });

// // // self.addEventListener("fetch", (event) => {
// // //   event.respondWith(
// // //     caches.match(event.request).then((response) => {
// // //       if (response) {
// // //         return response; // serve from cache
// // //       }

// // //       return fetch(event.request, { redirect: "follow" })
// // //         .then((res) => {
// // //           if (!res || res.status !== 200 || res.type !== "basic") {
// // //             return res; // skip caching invalid responses
// // //           }

// // //           const resToCache = res.clone();
// // //           caches.open(CACHE_NAME).then((cache) => cache.put(event.request, resToCache));

// // //           return res;
// // //         })
// // //         .catch(() => {
// // //           if (event.request.mode === "navigate") {
// // //             return caches.match("/offline.html"); // fallback offline page
// // //           }
// // //         });
// // //     })
// // //   );
// // // });


// const CACHE_NAME = "project-showcase-cache-v1";
// const urlsToCache = [
//   "/",
//   "/css/styles.css",
//   "/scripts/main.js",
//   "/offline.html",
//   "/manifest.json"
// ];

// // Install Service Worker
// self.addEventListener("install", (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
//   );
//   self.skipWaiting();
// });

// // Activate Service Worker
// self.addEventListener("activate", (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cache) => {
//           if (cache !== CACHE_NAME) {
//             return caches.delete(cache);
//           }
//         })
//       )
//     )
//   );
//   self.clients.claim();
// });

// // // Fetch Resources
// // self.addEventListener("fetch", (event) => {
// //   event.respondWith(
// //     caches.match(event.request).then((response) => {
// //       // Serve from cache if available
// //       if (response) {
// //         return response;
// //       }

// //       // Otherwise fetch from network
// //       return fetch(event.request)
// //         .then((res) => {
// //           if (!res || res.status !== 200 || res.type !== "basic") {
// //             return res;
// //           }

// //           // Cache the new resource
// //           const resToCache = res.clone();
// //           caches.open(CACHE_NAME).then((cache) => {
// //             cache.put(event.request, resToCache);
// //           });

// //           return res;
// //         })
// //         .catch(() => {
// //           // Offline fallback for navigation requests
// //           if (event.request.mode === "navigate") {
// //             return caches.match("/offline.html");
// //           }
// //         });
// //     })
// //   );
// // });

// // self.addEventListener("fetch", (event) => {
// //   event.respondWith(
// //     caches.match(event.request).then((response) => {
// //       if (response) {
// //         return response; // serve from cache
// //       }

// //       return fetch(event.request, { redirect: "follow" })
// //         .then((res) => {
// //           // ⚠️ Skip caching if response is invalid OR redirected
// //           if (!res || res.status !== 200 || res.type !== "basic" || res.redirected) {
// //             return res;
// //           }

// //           const resToCache = res.clone();
// //           caches.open(CACHE_NAME).then((cache) => {
// //             cache.put(event.request, resToCache);
// //           });

// //           return res;
// //         })
// //         .catch(() => {
// //           if (event.request.mode === "navigate") {
// //             return caches.match("/offline.html");
// //           }
// //         });
// //     })
// //   );
// // });

// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);

//   // ❌ Don't try to handle API/auth requests
//   if (url.pathname.startsWith("/auth/")) {
//     return; // let network handle it directly
//   }

//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       if (response) {
//         return response; // serve from cache
//       }

//       return fetch(event.request, { redirect: "follow" })
//         .then((res) => {
//           if (!res || res.status !== 200 || res.type !== "basic" || res.redirected) {
//             return res;
//           }

//           const resToCache = res.clone();
//           caches.open(CACHE_NAME).then((cache) => {
//             cache.put(event.request, resToCache);
//           });

//           return res;
//         })
//         .catch(() => {
//           if (event.request.mode === "navigate") {
//             return caches.match("/offline.html");
//           }
//         });
//     })
//   );
// });



// 📌 Service Worker for Project Showcase Tool
// const CACHE_NAME = "project-showcase-cache-v1";

// ✅ Cache only static files
// const STATIC_ASSETS = [
//   "/",                // homepage (optional)
//   "/css/styles.css",  // your CSS file
//   "/scripts/main.js", // your JS file
//   "/offline.html",    // fallback page
//   "/manifest.json",   // PWA manifest
//   // Add icons, fonts, logos here
// ];

// // Install Service Worker
// self.addEventListener("install", (event) => {
//   console.log("[SW] Installing...");

//   event.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("[SW] Caching static assets");
//       return cache.addAll(STATIC_ASSETS);
//     })
//   );
// });

// // Activate Service Worker
// self.addEventListener("activate", (event) => {
//   console.log("[SW] Activated");

//   event.waitUntil(
//     caches.keys().then((keys) => {
//       return Promise.all(
//         keys.map((key) => {
//           if (key !== CACHE_NAME) {
//             console.log("[SW] Removing old cache:", key);
//             return caches.delete(key);
//           }
//         })
//       );
//     })
//   );
// });

// // Fetch Event
// self.addEventListener("fetch", (event) => {
//   const url = new URL(event.request.url);

//   // 🚫 Skip caching for auth and API routes
//   if (
//     url.pathname.startsWith("/auth") || 
//     url.pathname.startsWith("/profile") ||
//     url.pathname.startsWith("/projects") ||
//     url.pathname.startsWith("/dashboard")
//   ) {
//     return; // Always go to network
//   }

//   // ✅ Cache only static assets
//   if (
//     url.pathname.endsWith(".css") ||
//     url.pathname.endsWith(".js") ||
//     url.pathname.endsWith(".png") ||
//     url.pathname.endsWith(".jpg") ||
//     url.pathname.endsWith(".jpeg") ||
//     url.pathname.endsWith(".svg") ||
//     url.pathname.endsWith(".woff2")
//   ) {
//     event.respondWith(
//       caches.match(event.request).then((cached) => {
//         if (cached) {
//           return cached; // return from cache
//         }

//         return fetch(event.request)
//           .then((res) => {
//             return caches.open(CACHE_NAME).then((cache) => {
//               cache.put(event.request, res.clone()); // save to cache
//               return res;
//             });
//           })
//           .catch(() => caches.match("/offline.html")); // fallback
//       })
//     );
//   }
// });


const CACHE_NAME = "project-showcase-cache-v1";
const urlsToCache = [
  "/",
  "/offline.html",
  "/css/styles.css",
  "/scripts/main.js",
  "/manifest.json",
  "/icons/pwa_icon_72x72.png",

];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate Service Worker
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Fetch Requests
self.addEventListener("fetch", event => {
  const url = new URL(event.request.url);

  // 🚫 Don’t cache authentication & dynamic routes
  if (
    url.pathname.startsWith("/auth") ||
    url.pathname.startsWith("/profile") ||
    url.pathname.startsWith("/projects")
  ) {
    return; // Always go to network
  }

  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request).then(response => {
        return response || caches.match("/offline.html");
      });
    })
  );
});
