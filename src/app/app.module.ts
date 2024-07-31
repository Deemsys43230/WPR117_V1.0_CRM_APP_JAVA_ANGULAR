import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './container/default-layout/default-layout.component';
import { LoginComponent } from './auth/login/login.component';
import { CommonLayoutComponent } from './container/common-layout/common-layout.component';
import { TableConfigComponent } from './shared/table-config/table-config.component';
import { AccountsComponent } from './super-admin/accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    LoginComponent,
    CommonLayoutComponent,
    AccountsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableConfigComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
