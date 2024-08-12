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
import { NgxSpinnerModule } from "ngx-spinner";
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ReportsComponent } from './reports/reports.component';
@NgModule({
  declarations: [
    DashboardComponent,
    DepartmentComponent,
    AddDepartmentComponent,
    AddNewAccountComponent,
    OccupantsComponent,
    ChangePasswordComponent,
    ReportsComponent,
  ],
  imports: [
    CommonModule,
    SuperAdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    NgxSpinnerModule
  ],
  exports: [
    DashboardComponent,
    DepartmentComponent
  ]
})
export class SuperAdminModule { }
