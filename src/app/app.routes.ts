import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginRedirectGuard } from './core/guards/login-redirect.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login.component'),
    canActivate: [LoginRedirectGuard],
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register.component'),
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./features/dashboard/dashboard.component'),
    canActivate: [], // TODO get back once backend is ready
  },
  {
    path: 'contact',
    loadComponent: () => import('./features/contact/contact.component'),
  },
  {
    path: 'announcements',
    loadComponent: () =>
      import('./features/announcements/announcements.component'),
    canActivate: [AuthGuard],
  },
  {
    path: 'maintenance',
    loadComponent: () => import('./features/maintenance/maintenance.component'),
  },
];
