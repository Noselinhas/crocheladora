const CACHE = 'crocheladora-v5';

// Apenas HTML e manifest ficam em cache (para uso offline básico).
// JS e CSS são SEMPRE buscados da rede — atualizações aparecem imediatamente.
const STATIC_ASSETS = [
  './index.html',
  './manifest.json'
];

// Extensões que NUNCA devem ser cacheadas (sempre rede)
const NO_CACHE_EXTS = ['.js', '.css'];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);
  const isNoCacheFile = NO_CACHE_EXTS.some(ext => url.pathname.endsWith(ext));

  if (isNoCacheFile) {
    // JS e CSS: sempre da rede, sem fallback de cache
    e.respondWith(fetch(e.request));
    return;
  }

  // Demais recursos: rede primeiro, cache como fallback offline
  e.respondWith(
    fetch(e.request)
      .then(resp => {
        if (resp && resp.status === 200 && resp.type !== 'opaque') {
          const clone = resp.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return resp;
      })
      .catch(() => caches.match(e.request))
  );
});

