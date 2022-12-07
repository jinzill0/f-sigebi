import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DocumentsListComponent } from 'src/app/@standalone/documents-list/documents-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FlyersRoutingModule } from './flyers-routing.module';
import { DocumentsReceptionFlyerSelectComponent } from './documents-reception-register/components/documents-reception-flyer-select/documents-reception-flyer-select.component';
import { DocumentsReceptionRegisterComponent } from './documents-reception-register/documents-reception-register.component';
import { PublicMinistriesComponent } from './public-ministries/public-ministries.component';
import { RecordUpdateComponent } from './record-update/record-update.component';
import { RelatedDocumentsComponent } from './related-documents/related-documents.component';
import { RdFShiftChangeComponent } from './shift-change/shift-change.component';
import { ShiftChangeHistoryComponent } from './shift-change/shift-change-history/shift-change-history.component';

@NgModule({
  declarations: [
    DocumentsReceptionRegisterComponent,
    RecordUpdateComponent,
    RdFShiftChangeComponent,
    ShiftChangeHistoryComponent,
    RelatedDocumentsComponent,
    PublicMinistriesComponent,
    DocumentsReceptionFlyerSelectComponent,
  ],
  imports: [
    CommonModule,
    FlyersRoutingModule,
    SharedModule,
    BsDatepickerModule,
    ModalModule.forChild(),
    BsDatepickerModule,
    DocumentsListComponent,
  ],
})
export class FlyersModule {}
