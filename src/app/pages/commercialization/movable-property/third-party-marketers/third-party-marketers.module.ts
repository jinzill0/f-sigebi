import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';

import { ThirdPartyMarketersRoutingModule } from './third-party-marketers-routing.module';
import { ThirdPartyMarketersComponent } from './third-party-marketers/third-party-marketers.component';
import { ThirdPartyModalComponent } from './third-party-modal/third-party-modal.component';
import { TypeEventModalComponent } from './type-event-modal/type-event-modal.component';
import { AmountThirdModalComponent } from './amount-third-modal/amount-third-modal.component';

@NgModule({
  declarations: [ThirdPartyMarketersComponent, ThirdPartyModalComponent, TypeEventModalComponent, AmountThirdModalComponent],
  imports: [CommonModule, ThirdPartyMarketersRoutingModule, SharedModule, ModalModule.forChild(),],
})
export class ThirdPartyMarketersModule {}
