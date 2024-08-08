import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { AccountsComponent } from './accounts/accounts.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { AddNewAccountComponent } from './accounts/add-new-account/add-new-account.component';
import { OccupantsComponent } from './occupants/occupants.component';

const routes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "policeDepartment", component: DepartmentComponent },
  { path: "department/add-police-department", component: AddDepartmentComponent },
  { path: "department/add-police-department/:id", component: AddDepartmentComponent },
  { path: "accountsDepartment", component: AccountsComponent },
  { path: "accounts/add-new-account", component: AddNewAccountComponent },
  { path: "accounts/add-new-account/:id", component: AddNewAccountComponent },
  { path: "occupants", component: OccupantsComponent },
  { path: 'superAdmin/policeDepartment', component: DepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SuperAdminRoutingModule { }
