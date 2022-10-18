import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JprRecordsReportRoutingModule } from './jpr-records-report-routing.module';
import { JprRecordsReportComponent } from './jpr-records-report.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    JprRecordsReportComponent
  ],
  imports: [
    CommonModule,
    JprRecordsReportRoutingModule,
    SharedModule,
    ModalModule.forChild(),
  ]
})
export class JprRecordsReportModule { }
