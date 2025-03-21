// src/app/app.routes.ts (or src/app/routes.ts, depending on your naming)
import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './services/authguard.service';
import { LayoutComponent } from './components/layout/layout.component';
import { OnboardingComponent } from './pages/onboarding/onboarding.component';
import { OnboardingGuard } from './services/onboardingguard.service'; // Note: corrected typo from 'onboardingguard.service'

export const routes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: 'onboarding', component: OnboardingComponent, canDeactivate: [OnboardingGuard] }, // Full-screen onboarding
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard, OnboardingGuard], // Protect all child routes and enforce onboarding
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'materials', component: MaterialsComponent },
            { path: '**', redirectTo: 'dashboard' }
        ]
    },
    { path: '**', redirectTo: '' }
];