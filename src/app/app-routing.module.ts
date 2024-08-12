import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { PoliceDepartmentLoginComponent } from './auth/police-department-login/police-department-login.component';
import { PoliceLoginComponent } from './auth/police-login/police-login.component';
import { ReportsComponent } from './police-department/reports/reports.component';
import { AuthGuard } from './shared/auth.guard';
import { AddNewReportComponent } from './police-department/reports/add-new-report/add-new-report.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: "ohio/:departmentName",
    component: PoliceLoginComponent
  },
  {
    path: "reports/:departmentName",
    component: ReportsComponent
  },
  {
    path: "reports/:departmentName/add-new-report",
    component: AddNewReportComponent
  },
  {
    path: "auth/login",
    component: LoginComponent,
  },  
  { path: "ohio",
    component: PoliceDepartmentLoginComponent 
  },
  {
    path: 'superAdmin',
    component: DefaultLayoutComponent,
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule),
    canActivate: [AuthGuard]
  },

  //Any undefined route will goes to Login Page
  // {
  //   path: '**',
  //   redirectTo: 'auth/login',
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
