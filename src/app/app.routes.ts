import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register/register.component').then(m => m.RegisterComponent)
  },

  { path: '',         loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'clinic',   loadChildren: () => import('./clinic/clinic.module').then(m => m.ClinicModule), canActivate: [AuthGuard] },
  { path: 'online',   loadChildren: () => import('./online/online.module').then(m => m.OnlineModule), canActivate: [AuthGuard] },
  { path: 'my-visits',loadChildren: () => import('./visits/visits.module').then(m => m.VisitsModule), canActivate: [AuthGuard] },
  { path: 'profile',  loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
  {path: 'contact', loadComponent: () => import('./contact/contact-page/contact-page.component').then(m => m.ContactPageComponent)},

  { path: '**',       redirectTo: '' }
];
