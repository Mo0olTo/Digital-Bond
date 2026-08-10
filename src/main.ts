import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

function loadExtendedFonts(): void {
  if (typeof document === 'undefined') {
    return;
  }

  const existing = document.querySelector('link[data-extended-fonts="true"]');
  if (existing) {
    return;
  }

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/fonts/fonts-extended.css';
  link.setAttribute('data-extended-fonts', 'true');
  document.head.appendChild(link);
}

/** Load 500/600/700 weights only after the page has fully loaded (off the LCP path). */
function scheduleExtendedFonts(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const run = (): void => {
    const idleWindow = window as Window & {
      requestIdleCallback?: (
        callback: () => void,
        options?: { timeout: number },
      ) => number;
    };

    if (typeof idleWindow.requestIdleCallback === 'function') {
      idleWindow.requestIdleCallback(() => loadExtendedFonts(), {
        timeout: 4000,
      });
      return;
    }

    window.setTimeout(() => loadExtendedFonts(), 2000);
  };

  if (document.readyState === 'complete') {
    run();
    return;
  }

  window.addEventListener('load', run, { once: true });
}

bootstrapApplication(App, appConfig)
  .then(() => {
    scheduleExtendedFonts();
  })
  .catch((err) => console.error(err));
