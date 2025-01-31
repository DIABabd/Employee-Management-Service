import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginRedirectComponent } from './login-redirect-component/login-redirect.component';
import {EmployeeListComponent} from "./employee-list-component/employee-list.component";
import {QualificationListComponent} from "./qualification-list-component/qualification-list.component";
import {CreateQualificationComponent} from "./create-qualification-component/create-qualification.component";
import {EmployeeDetailComponent} from "./employee-detail-component/employee-detail.component";
import {CreateEmployeeComponent} from "./create-employee-component/create-employee.component";

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
      { path: 'employees', component: EmployeeListComponent },
      { path: 'employees/create', component: CreateEmployeeComponent },
      { path: 'employees/:id', component: EmployeeDetailComponent },
      { path: 'qualifications', component: QualificationListComponent },
      { path: 'qualifications/create', component: CreateQualificationComponent },
      { path: '', redirectTo: 'employees', pathMatch: 'full' }
    ]
  },
  {
    path: 'login',
    component: LoginRedirectComponent // Triggers Keycloak login
  }
];
