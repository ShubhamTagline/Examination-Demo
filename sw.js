let cacheData = "appV1";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        // "/",
        "/favicon.ico",
        // "manifest.json",
        // "/static/js/bundle.js",
        // "/static/js/main.chunk.js",
        // "/static/js/1.chunk.js",
        // "/static/js/0.chunk.js",
        // "/static/js/9.chunk.js",
        // "/static/js/8.chunk.js",
        // "/static/media/tenor.706124a2.gif",
        // "/static/js/vendors~main.chunk.js",
        // "/index.html",
        // "/signIn",
        "/static/js/3.9bfb649b.chunk.js",
        "/static/js/0.ddf4a8f4.chunk.js",
        "/static/js/8.1ed39376.chunk.js",
        "/static/js/main.331a3e04.chunk.js",
      ]);
    })
    );
  });
  // "/Examination-Demo/static/js/3.9bfb649b.chunk.js",
  // "/Examination-Demo/static/js/0.ddf4a8f4.chunk.js",
  // "/Examination-Demo/static/js/8.1ed39376.chunk.js",
  // "/Examination-Demo/static/js/main.331a3e04.chunk.js",

self.addEventListener("fetch", (event) => {
  console.log(`fetch`)
  if(!navigator.onLine){
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) return result;
      })
    );
  }
});
 