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

function scheduleExtendedFonts(): void {
  if (typeof window === 'undefined') {
    return;
  }

  const run = () => loadExtendedFonts();
  const idleWindow = window as Window & {
    requestIdleCallback?: (callback: () => void) => number;
  };

  if (typeof idleWindow.requestIdleCallback === 'function') {
    idleWindow.requestIdleCallback(run);
    return;
  }

  window.addEventListener('load', run, { once: true });
}

bootstrapApplication(App, appConfig)
  .then(() => {
    scheduleExtendedFonts();
  })
  .catch((err) => console.error(err));
