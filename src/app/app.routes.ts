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
        title: 'Home | Digital Bond',
        data: {
          description:
            'Digital Bond delivers innovative web development, mobile applications, branding, and digital marketing solutions for modern businesses.',
        },
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./features/services/services').then((m) => m.Services),
        title: 'Services | Digital Bond',
        data: {
          description:
            'Explore Digital Bond services including web development, mobile applications, branding, and digital marketing solutions.',
        },
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./features/about/about').then((m) => m.About),
        title: 'About | Digital Bond',
        data: {
          description:
            'Learn more about Digital Bond, our expertise, creative approach, and commitment to delivering innovative digital solutions.',
        },
      },
      {
        path: 'contact-us',
        loadComponent: () =>
          import('./features/contact-us/contact-us').then((m) => m.ContactUs),
        title: 'Contact | Digital Bond',
        data: {
          description:
            'Get in touch with Digital Bond to discuss your next web development, mobile application, branding, or digital marketing project.',
        },
      },
    ],
  },
  {
    path: 'done',
    loadComponent: () =>
      import('./pages/done/done').then((m) => m.Done),
    title: 'Thank You | Digital Bond',
    data: {
      description:
        'Thank you for contacting Digital Bond. We look forward to working with you.',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];