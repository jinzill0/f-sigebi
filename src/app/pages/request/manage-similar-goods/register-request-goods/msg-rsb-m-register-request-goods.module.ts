import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedRequestModule } from '../../shared-request/shared-request.module';
import { MsgRsbMRegisterRequestGoodsRoutingModule } from './msg-rsb-m-register-request-goods-routing.module';
import { MsgRsbCRegisterRequestGoodsComponent } from './register-request-goods/msg-rsb-c-register-request-goods.component';
import { RegisterDocumentationComponent } from './tabs/register-documentation/register-documentation.component';

@NgModule({
  declarations: [
    MsgRsbCRegisterRequestGoodsComponent,
    RegisterDocumentationComponent,
  ],
  imports: [
    CommonModule,
    MsgRsbMRegisterRequestGoodsRoutingModule,
    SharedModule,
    TabsModule,
    SharedRequestModule,
  ],
})
export class MsgRsbMRegisterRequestGoodsModule {}
