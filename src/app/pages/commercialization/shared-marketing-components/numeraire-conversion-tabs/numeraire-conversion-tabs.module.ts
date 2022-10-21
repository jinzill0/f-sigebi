import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TabsModule } from 'ngx-bootstrap/tabs';
import { SharedModule } from 'src/app/shared/shared.module';
import { CBGeCanMNumeraireConversionModule } from '../c-b-ge-can-m-numeraire-conversion/c-b-ge-can-m-numeraire-conversion.module';

import { NumeraireConversionTabsRoutingModule } from './numeraire-conversion-tabs-routing.module';
import { NumeraireConversionTabsComponent } from './numeraire-conversion-tabs/numeraire-conversion-tabs.component';

@NgModule({
  declarations: [NumeraireConversionTabsComponent],
  imports: [
    CommonModule,
    NumeraireConversionTabsRoutingModule,
    SharedModule,
    TabsModule,
    CBGeCanMNumeraireConversionModule,
  ],
})
export class NumeraireConversionTabsModule {}
