import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperAdminRoutingModule } from './super-admin-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DepartmentComponent } from './department/department.component';
import { AddDepartmentComponent } from './department/add-department/add-department.component';
import { AddNewAccountComponent } from './accounts/add-new-account/add-new-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OccupantsComponent } from './occupants/occupants.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    AddNewAccountComponent,
    OccupantsComponent,
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
  exports: [
    DashboardComponent,
    DepartmentComponent
  ]
})
export class SuperAdminModule { }
