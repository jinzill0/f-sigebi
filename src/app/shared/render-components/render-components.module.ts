import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Shared
import { SharedModule } from 'src/app/shared/shared.module';
//Reactive Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//NgxBootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
//Standalone Components
import { UsersSharedComponent } from 'src/app/@standalone/shared-forms/user-shared/user-shared.component';
//Components
import { SelectUserComponent } from './select-user/select-user.component';
import { DatePickerComponent } from './date-picker/date-picker.component';

@NgModule({
  declarations: [
    SelectUserComponent,
    DatePickerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    BsDatepickerModule,
    UsersSharedComponent
  ]
})
export class RenderComponentsModule { }
