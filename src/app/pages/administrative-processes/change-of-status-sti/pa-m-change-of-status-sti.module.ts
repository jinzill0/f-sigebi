import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from 'src/app/shared/shared.module';
//Ngx Bootstrap
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';

import { GoodsTypesSharedComponent } from 'src/app/@standalone/shared-forms/goods-types-shared/goods-types-shared.component';
import { PaCsCChangeOfStatusStiComponent } from './pa-cs-c-change-of-status-sti/pa-cs-c-change-of-status-sti.component';
import { PaMChangeOfStatusStiRoutingModule } from './pa-m-change-of-status-sti-routing.module';

@NgModule({
  declarations: [PaCsCChangeOfStatusStiComponent],
  imports: [
    CommonModule,
    SharedModule,
    Ng2SmartTableModule,
    PaMChangeOfStatusStiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    BsDropdownModule,
    BsDatepickerModule,
    TabsModule,
    ModalModule.forChild(),
    GoodsTypesSharedComponent,
  ],
})
export class PaMChangeOfStatusStiModule {}
