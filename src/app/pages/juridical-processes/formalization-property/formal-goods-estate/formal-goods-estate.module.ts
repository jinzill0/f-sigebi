/** BASE IMPORT */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
/** BASE IMPORT */

/** LIBRERIAS EXTERNAS IMPORTS */
import { TabsModule } from 'ngx-bootstrap/tabs';

/** SERVICE IMPORTS */

/** ROUTING MODULE */
import { FormalGoodsEstateRoutingModule } from './formal-goods-estate-routing.module';

/** COMPONENTS IMPORTS */
import { FormProcedeFormalizacionComponent } from './form-procede-formalizacion/form-procede-formalizacion.component';
import { FormalGoodsEstateComponent } from './formal-goods-estate/formal-goods-estate.component';

@NgModule({
  declarations: [FormalGoodsEstateComponent, FormProcedeFormalizacionComponent],
  imports: [
    CommonModule,
    FormalGoodsEstateRoutingModule,
    SharedModule,
    TabsModule,
  ],
})
export class FormalGoodsEstateModule {}
