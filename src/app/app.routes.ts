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
      // { path: 'study-plans', loadComponent: () => import('./pages/study-plans/study-plans.component').then(m => m.StudyPlansComponent) },
      // { path: 'sessions', loadComponent: () => import('./pages/sessions/sessions.component').then(m => m.SessionsComponent) },
      // { path: 'materials', loadComponent: () => import('./pages/materials/materials.component').then(m => m.MaterialsComponent) },
      // { path: 'flashcards', loadComponent: () => import('./pages/flashcards/flashcards.component').then(m => m.FlashcardsComponent) },
      // { path: 'quizzes', loadComponent: () => import('./pages/quizzes/quizzes.component').then(m => m.QuizzesComponent) },
      // { path: 'analytics', loadComponent: () => import('./pages/analytics/analytics.component').then(m => m.AnalyticsComponent) },
      // { path: 'settings', loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent) },
      { path: '**', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: '' }
];

