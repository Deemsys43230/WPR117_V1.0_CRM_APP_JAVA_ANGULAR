import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableConfigComponent } from './table-config/table-config.component';

@NgModule({
  declarations: [
    TableConfigComponent
  ],

  imports: [
    CommonModule
  ],

  exports: [
    TableConfigComponent, 
  ],

  providers: []
})

export class SharedModule { }