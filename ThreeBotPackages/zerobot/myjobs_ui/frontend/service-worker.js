!function(){"use strict";const e="cache1574946653311",t=["client/index.40abfb0b.js","client/Spinner.597c6a91.js","client/common.160c3733.js","client/index.418a62e5.js","client/index.e079d62b.js","client/[id].0ffa91c1.js","client/about.b1738dbd.js","client/client.5d62aa5e.js","client/Workers.747ef00e.js","client/index.6745397b.js"].concat(["service-worker-index.html","favicon.png","global.css","great-success.png","img/loader.gif","logo-192.png","logo-512.png","manifest.json"]),s=new Set(t);self.addEventListener("install",s=>{s.waitUntil(caches.open(e).then(e=>e.addAll(t)).then(()=>{self.skipWaiting()}))}),self.addEventListener("activate",t=>{t.waitUntil(caches.keys().then(async t=>{for(const s of t)s!==e&&await caches.delete(s);self.clients.claim()}))}),self.addEventListener("fetch",t=>{if("GET"!==t.request.method||t.request.headers.has("range"))return;const n=new URL(t.request.url);n.protocol.startsWith("http")&&(n.hostname===self.location.hostname&&n.port!==self.location.port||(n.host===self.location.host&&s.has(n.pathname)?t.respondWith(caches.match(t.request)):"only-if-cached"!==t.request.cache&&t.respondWith(caches.open(e).then(async e=>{try{const s=await fetch(t.request);return s&&200===s.status&&"basic"===s.type?(e.put(t.request,s.clone()),s):s}catch(s){const n=await e.match(t.request);if(n)return n;throw s}}))))})}();
