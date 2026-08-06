import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        loadComponent: () =>
          import('../app/pages/home/home').then((m) => m.Home),
        title: 'Digital Bond | Digital Marketing Agency',
      },
      {
        path: 'done',
        loadComponent: () =>
          import('../app/pages/done/done').then((m) => m.Done),
        title: 'Thank You | Digital Bond',
      },
      {
        path: '**',
        redirectTo: '',
      },

];
