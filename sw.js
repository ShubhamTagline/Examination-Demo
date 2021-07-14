let cacheData = "appV1";

this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cache) => {
      cache.addAll([
        "/static/js/bundle.js",
        "/static/js/main.chunk.js",
        "/static/js/1.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/9.chunk.js",
        "/static/js/8.chunk.js",
        "/favicon.ico",
        "/static/media/tenor.706124a2.gif",
        "/static/js/vendors~main.chunk.js",
        "index.html",
        "/",
        "/signIn",
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if(!navigator.onLine){
    event.respondWith(
      caches.match(event.request).then((result) => {
        if (result) return result;
      })
    );
  }
});

 