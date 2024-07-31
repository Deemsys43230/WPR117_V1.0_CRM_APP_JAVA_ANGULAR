import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { TableConfigComponent } from '../shared/table-config/table-config.component';


@NgModule({
  declarations: [
    DashboardComponent,
    DepartmentComponent,
    AddDepartmentComponent,
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    TableConfigComponent
  ],
  exports : [
    DashboardComponent,
    DepartmentComponent
  ]
})
export class SuperAdminModule { }
