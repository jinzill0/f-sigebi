import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EventsSharedComponent } from 'src/app/@standalone/shared-forms/events-shared/events-shared.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { CBmFFnCRegularBillingGenerationAssetsComponent } from './c-bm-f-fn-c-regular-billing-generation-assets/c-bm-f-fn-c-regular-billing-generation-assets.component';
import { CBmFFnCRegularBillingInconsistenciesComponent } from './c-bm-f-fn-c-regular-billing-inconsistencies/c-bm-f-fn-c-regular-billing-inconsistencies.component';
import { CBmFFnCRegularBillingInvoiceComponent } from './c-bm-f-fn-c-regular-billing-invoice/c-bm-f-fn-c-regular-billing-invoice.component';
import { CBmFFnCRegularBillingUnsettledComponent } from './c-bm-f-fn-c-regular-billing-unsettled/c-bm-f-fn-c-regular-billing-unsettled.component';
import { CBmFFnMRegularBillingRoutingModule } from './c-bm-f-fn-m-regular-billing-routing.module';

@NgModule({
  declarations: [
    CBmFFnCRegularBillingInvoiceComponent,
    CBmFFnCRegularBillingUnsettledComponent,
    CBmFFnCRegularBillingInconsistenciesComponent,
    CBmFFnCRegularBillingGenerationAssetsComponent,
  ],
  imports: [
    CommonModule,
    CBmFFnMRegularBillingRoutingModule,
    SharedModule,
    EventsSharedComponent,
  ],
  exports: [
    CBmFFnCRegularBillingInvoiceComponent,
    CBmFFnCRegularBillingUnsettledComponent,
    CBmFFnCRegularBillingInconsistenciesComponent,
    CBmFFnCRegularBillingGenerationAssetsComponent,
  ],
})
export class CBmFFnMRegularBillingModule {}
