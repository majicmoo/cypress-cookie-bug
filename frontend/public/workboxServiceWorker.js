importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.1.1/workbox-sw.js"
);

if (workbox) {
  console.log(`Yay! Workbox is loaded 🎉`);
} else {
  console.log(`Boo! Workbox didn't load 😬`);
}

self.__precacheManifest = [].concat(self.__precacheManifest || []);
// workbox.precaching.suppressWarnings();
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

// // URLs beginning with '_' after the domain name are blacklisted here
// // to stop the service worker trying to handle Cypress tests using the cache.
workbox.routing.registerNavigationRoute("/index.html", {
  blacklist: [
    /^\/_/, // URL's starting with _ are used by Cypress tests
    /^\/api\// // useful to be able to hit e.g. /api/health-check from a browser
  ]
});
