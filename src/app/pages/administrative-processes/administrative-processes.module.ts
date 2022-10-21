import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdministrativeProcessesRoutingModule } from './administrative-processes-routing.module';
import { AdministrativeProcessesComponent } from './administrative-processes.component';
import { InsuranceAndSurveillanceModule } from './insurance-and-surveillance/insurance-and-surveillance.module';
import { ExpensesAndCostsModule } from './expenses-and-costs/expenses-and-costs.module';

@NgModule({
  declarations: [AdministrativeProcessesComponent],
  imports: [
    CommonModule,
    AdministrativeProcessesRoutingModule,
    InsuranceAndSurveillanceModule,
    ExpensesAndCostsModule,
  ],
})
export class AdministrativeProcessesModule {}
