import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Events } from './pages/events/events';
import { Dashboard } from './pages/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: Home
  },
  {
    path: 'register',
    component: Register
  },
  {
    path: 'events',
    component: Events
  },
  {
    path: 'dashboard',
    component: Dashboard
  },
 
];
