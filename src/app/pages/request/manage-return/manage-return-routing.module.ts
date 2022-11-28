/** BASE IMPORT */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** LIBRERÍAS EXTERNAS IMPORTS */

/** SERVICE IMPORTS */

/** ROUTING MODULE */

/** COMPONENTS IMPORTS */

const routes: Routes = [
  // registro de solicitud de devolucion
  {
    path: 'registro-solicitud-devolucion',
    loadChildren: async () =>
      (
        await import(
          './return-request-registration/return-request-registration.module'
        )
      ).GDReturnRequestRegistrationModule,
    data: { title: 'Registro de Solicitud de Devolución' },
  },
  // registro de solicitud de devolucion
  // Clasificación de Bienes
  {
    path: 'clasificacion-bienes',
    loadChildren: async () =>
      (await import('./goods-classification/goods-classification.module'))
        .GDCBGoodsClassificationModule,
    data: { title: 'Clasificación de Bienes' },
  },
  // Clasificación de Bienes
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageReturnRoutingModule {}
