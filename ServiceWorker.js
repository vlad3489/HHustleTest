const cacheName = "Stryker-HospitalHustle-0.0.1";
const contentToCache = [
    "Build/HHustleTest(WebGl-Github).loader.js",
    "Build/HHustleTest(WebGl-Github).framework.js",
    "Build/HHustleTest(WebGl-Github).data",
    "Build/HHustleTest(WebGl-Github).wasm",
    "TemplateData/style.css"

];

self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    
    e.waitUntil((async function () {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
});

self.addEventListener('fetch', function (e) {
    e.respondWith((async function () {
      let response = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (response) { return response; }

      response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
});
