/** BASE IMPORT */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
/** BASE IMPORT */

/** LIBRERIAS EXTERNAS IMPORTS */

/** SERVICE IMPORTS */

/** ROUTING MODULE */
import { AppointmentsRoutingModule } from './appointments-routing.module';

/** COMPONENTS IMPORTS */
import { AppointmentsComponent } from './appointments/appointments.component';
import { ScanningFoilAppointmentComponent } from './scanning-foil/scanning-foil.component';

@NgModule({
  declarations: [AppointmentsComponent, ScanningFoilAppointmentComponent],
  imports: [CommonModule, AppointmentsRoutingModule, SharedModule],
})
export class AppointmentsModule {}
