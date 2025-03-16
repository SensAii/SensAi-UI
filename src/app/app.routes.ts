import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/authguard.service';
import { LayoutComponent } from './components/layout/layout.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      // { path: 'profile', component: ProfileComponent },
      // { path: 'settings', component: SettingsComponent },
    ],
  },

  { path: '**', redirectTo: '' }
];

