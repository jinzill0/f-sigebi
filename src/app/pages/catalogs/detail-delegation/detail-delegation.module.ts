import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailDelegationRoutingModule } from './detail-delegation-routing.module';
import { DetailDelegationListComponent } from './detail-delegation-list/detail-delegation-list.component';
import { DetailDelegationFormComponent } from './detail-delegation-form/detail-delegation-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DetailDelegationService } from 'src/app/core/services/catalogs/detail-delegation.service';

@NgModule({
  declarations: [DetailDelegationListComponent, DetailDelegationFormComponent],
  imports: [
    CommonModule,
    DetailDelegationRoutingModule,
    SharedModule,
    ModalModule.forChild(),
  ],
  providers: [DetailDelegationService],
})
export class DetailDelegationModule {}
