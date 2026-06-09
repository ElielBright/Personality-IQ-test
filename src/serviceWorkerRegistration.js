const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(/^127(?:\.\d+){0,2}\.\d+$/)
);

function registerValidSW(swUrl) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log('MindMetric: Updated content available.');
            } else {
              console.log('MindMetric: Content cached for offline use.');
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('MindMetric: Service worker registration failed:', error);
    });
}

function checkValidServiceWorker(swUrl) {
  fetch(swUrl)
    .then((response) => {
      if (response.status === 404 || response.headers.get('content-type')?.indexOf('javascript') === -1) {
        navigator.serviceWorker.ready.then((registration) => registration.unregister());
      } else {
        registerValidSW(swUrl);
      }
    })
    .catch(() => {
      console.log('MindMetric: No internet connection. App running in offline mode.');
    });
}

export function register() {
  if ('serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) return;

    const swUrl = `${process.env.PUBLIC_URL}/sw.js`;

    if (isLocalhost) {
      checkValidServiceWorker(swUrl);
      navigator.serviceWorker.ready.then(() => {
        console.log('MindMetric: Service worker ready (localhost).');
      });
    } else {
      registerValidSW(swUrl);
    }
  }
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => registration.unregister());
  }
}
