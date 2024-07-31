import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "department", component: DepartmentComponent },
  {path: "department/add-department" , component: AddDepartmentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
