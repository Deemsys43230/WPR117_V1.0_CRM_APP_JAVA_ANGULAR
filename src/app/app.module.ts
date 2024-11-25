import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ReactiveFormsModule } from '@angular/forms';
import { AppHttpInterceptor } from './shared/httpInterceptor/app-http-interceptor.interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { CommonLayoutComponent } from './container/common-layout/common-layout.component';
import { AccountsComponent } from './super-admin/accounts/accounts.component';
import { SharedModule } from "./shared/shared.module";
import { NgxSpinnerModule } from "ngx-spinner";
import { PoliceDepartmentLoginComponent } from './auth/police-department-login/police-department-login.component';
import { FlashMessageComponent } from './shared/flash-message/flash-message.component';
import { PoliceLoginComponent } from './auth/police-login/police-login.component';
import { ReportsComponent } from './police-department/reports/reports.component';
import { AddNewReportComponent } from './police-department/reports/add-new-report/add-new-report.component';
import { ViewDepartmentComponent } from './police-department/view-department/view-department.component';
import { PoliceDepartmentHeaderComponent } from './police-department/police-department-header/police-department-header.component';
import { ChangePasswordComponent } from './police-department/change-password/change-password.component';
import { SearchComponent } from './police-department/search/search.component';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginComponent,
    CommonLayoutComponent,
    AccountsComponent,
    PoliceDepartmentLoginComponent,
    FlashMessageComponent,
    PoliceLoginComponent,
    ReportsComponent,
    AddNewReportComponent,
    ViewDepartmentComponent,
    PoliceDepartmentHeaderComponent,
    ChangePasswordComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    SharedModule,
    CommonModule,
    NgxSpinnerModule,
    CalendarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppHttpInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
