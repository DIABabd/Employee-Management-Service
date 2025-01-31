import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginRedirectComponent } from './login-redirect-component/login-redirect.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent // Company info landing page
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard], // Protected route
    children: [
      // Add child routes here later
    ]
  },
  {
    path: 'login',
    component: LoginRedirectComponent // Triggers Keycloak login
  }
];
