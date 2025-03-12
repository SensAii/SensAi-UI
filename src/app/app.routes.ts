import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: LandingComponent }, // Default route for the landing page
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '' }  // Redirect all unknown routes to the landing page
];
