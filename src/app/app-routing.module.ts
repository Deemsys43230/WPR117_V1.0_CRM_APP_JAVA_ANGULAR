import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'superAdmin',
    pathMatch:'full'
  },
  {
    path:"auth/login",
    component:LoginComponent,
  },
  {
    path:'superAdmin',
    component:DefaultLayoutComponent,
    // loadChildren: () => import('./components/super-admin/super-admin.module').then(m => m.SuperAdminModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
