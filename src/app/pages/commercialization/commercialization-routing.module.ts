import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { CommercializationComponent } from './commercialization.component';

const routes: Routes = [
  {
    path: 'c-b-vdp-m-payment-dispersion-validation',
    loadChildren: async () =>
      (await import('./shared-marketing-components/c-b-vdp-m-payment-dispersion-validation/c-b-vdp-m-payment-dispersion-validation.module')).CBVdpMPaymentDispersionValidationModule,
    data: { title: 'Validación de bienes' },
  },
  {
    path: 'c-b-bedv-m-validation-exempted-goods',
    loadChildren: async () =>
      (await import('./shared-marketing-components/c-b-bedv-m-validation-exempted-goods/c-b-bedv-m-validation-exempted-goods.module')).CBBedvMValidationExemptedGoodsModule,
    data: { title: 'Bienes exentos de validación' },
  },
  {
    path: 'c-b-rdodi-m-reclass-recovery-orders',
    loadChildren: async () =>
      (await import('./shared-marketing-components/c-b-rdodi-m-reclass-recovery-orders/c-b-rdodi-m-reclass-recovery-orders.module')).CBRdodiMReclassRecoveryOrdersModule,
    data: { title: 'Reclasificación OI' },
  },
  {
    path: 'numeraire-conversion-tabs',
    loadChildren: async () =>
      (await import('./shared-marketing-components/numeraire-conversion-tabs/numeraire-conversion-tabs.module')).NumeraireConversionTabsModule,
    data: { title: 'Conversión a numerario' },
  },
  {
    path: 'c-b-a-cda-m-appraisal-consultation',
    loadChildren: async () =>
      (await import('./shared-marketing-components/c-b-a-cda-m-appraisal-consultation/c-b-a-cda-m-appraisal-consultation.module')).CBACdaMAppraisalConsultationModule,
    data: { title: 'Consulta de Avalúo' },
  },
  {
    path: 'c-b-a-rda-m-appraisal-registration',
    loadChildren: async () =>
      (await import('./shared-marketing-components/c-b-a-rda-m-appraisal-registration/c-b-a-rda-m-appraisal-registration.module')).CBARdaMAppraisalRegistrationModule,
    data: { title: 'Registro de Avalúos' },
  },
  {
    path: 'c-b-ge-cdg-m-expense-capture',
    loadChildren: async () =>
      (await import('./shared-marketing-components/c-b-ge-cdg-m-expense-capture/c-b-ge-cdg-m-expense-capture.module')).CBGeCdgMExpenseCaptureModule,
    data: { title: 'Captura de gastos' },
  },
  {
    path: 'c-bm-ge-cdc-tc-m-third-party-marketers',
    loadChildren: async () =>
      (await import('./movable-property/c-bm-ge-cdc-tc-m-third-party-marketers/c-bm-ge-cdc-tc-m-third-party-marketers.module')).CBmGeCdcTcMThirdPartyMarketersModule,
    data: { title: 'Terceros comercializadores' },
  },
  {
    path: 'consultation-goods-commercial-process-tabs',
    loadChildren: async () =>
      (await import('./movable-property/consultation-goods-commercial-process-tabs/consultation-goods-commercial-process-tabs.module')).ConsultationGoodsCommercialProcessTabsModule,
    data: { title: 'Consulta de bienes' },
  },
  {
    path: 'c-bm-ge-cdc-clc-m-calculate-commission',
    loadChildren: async () =>
      (await import('./movable-property/c-bm-ge-cdc-clc-m-calculate-commission/c-bm-ge-cdc-clc-m-calculate-commission.module')).CBmGeCdcClcMCalculateCommissionModule,
    data: { title: 'Calcular comisión' },
  },
  {
    path: 'c-bm-f-syf-m-series-folios-control',
    loadChildren: async () =>
      (await import('./movable-property/c-bm-f-syf-m-series-folios-control/c-bm-f-syf-m-series-folios-control.module')).CBmFSyfMSeriesFoliosControlModule,
    data: { title: 'Folios y series' },
  },
  {
    path: 'c-bm-f-cdr-m-rebilling-causes',
    loadChildren: async () =>
      (await import('./movable-property/c-bm-f-cdr-m-rebilling-causes/c-bm-f-cdr-m-rebilling-causes.module')).CBmFCdrMRebillingCausesModule,
    data: { title: 'Causas y Refacturación' },
  },
  {
    path: 'c-bm-f-edf-m-invoice-status',
    loadChildren: async () =>
      (await import('./movable-property/c-bm-f-edf-m-invoice-status/c-bm-f-edf-m-invoice-status.module')).CBmFEdfMInvoiceStatusModule,
    data: { title: 'Estatus de la facturación' },
  }
];

@NgModule({
  declarations: [
    CommercializationComponent
  ],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommercializationRoutingModule { }
