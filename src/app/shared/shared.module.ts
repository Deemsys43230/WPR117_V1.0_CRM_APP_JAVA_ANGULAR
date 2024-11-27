import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableConfigComponent } from './table-config/table-config.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TableConfigComponent
  ],

  imports: [
    CommonModule,
    FormsModule,
  ],

  exports: [
    TableConfigComponent,
  ],

  providers: []
})

export class SharedModule { }