import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalModule } from 'ngx-bootstrap/modal';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { GoodsStatusSharedComponent } from 'src/app/@standalone/shared-forms/goods-status-shared/goods-status-shared.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartializesGeneralGoodsRoutingModule } from './partializes-general-goods-routing.module';
import { PartializesGeneralGoodsComponent } from './partializes-general-goods.component';

@NgModule({
  declarations: [PartializesGeneralGoodsComponent],
  imports: [
    CommonModule,
    PartializesGeneralGoodsRoutingModule,
    SharedModule,
    ModalModule.forChild(),
    TabsModule,
    GoodsStatusSharedComponent,
  ],
})
export class PartializesGeneralGoodsModule {}
