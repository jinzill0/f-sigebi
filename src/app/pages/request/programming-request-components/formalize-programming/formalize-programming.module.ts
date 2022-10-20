import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormalizeProgrammingRoutingModule } from './formalize-programming-routing.module';
import { FormalizeProgrammingFormComponent } from './formalize-programming-form/formalize-programming-form.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { InformationRecordComponent } from './information-record/information-record.component';

@NgModule({
  declarations: [FormalizeProgrammingFormComponent, InformationRecordComponent],
  imports: [
    CommonModule,
    TabsModule,
    FormalizeProgrammingRoutingModule,
    SharedModule,
    ModalModule.forRoot(),
  ],
})
export class FormalizeProgrammingModule {}
