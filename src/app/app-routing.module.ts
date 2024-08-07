import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { PoliceDepartmentLoginComponent } from './auth/police-department-login/police-department-login.component';

const routes: Routes = [
  {
    path:"auth/login",
    component:LoginComponent,
  },
  {
    path:"auth/policeDepartmentLogin/:departmentName",
    component:LoginComponent,
  },
  {
    path:'superAdmin',
    component:DefaultLayoutComponent,
    loadChildren: () => import('./super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },  
  { path: "auth/policeDepartmentLogin", component: PoliceDepartmentLoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
