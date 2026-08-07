import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/layouts/main/main').then((m) => m.Main),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home',
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./pages/home/home').then((m) => m.Home),
        title: 'Digital Bond | Digital Marketing Agency',
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/services').then((m) => m.Services),
        title: 'Services',
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.About),
        title: 'About',
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./features/contact-us/contact-us').then((m) => m.ContactUs),
        title: 'Contact',
      },
    ],
  },
  {
    path: 'done',
    loadComponent: () =>
      import('./pages/done/done').then((m) => m.Done),
    title: 'Thank You | Digital Bond',
  },
  {
    path: '**',
    redirectTo: '',
  },
];