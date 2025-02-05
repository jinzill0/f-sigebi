import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProceedingsDeliveryReceptionService } from 'src/app/core/services/ms-proceedings/proceedings-delivery-reception.service';
import { ProceedingsDetailDeliveryReceptionService } from 'src/app/core/services/ms-proceedings/proceedings-detail-delivery-reception.service';
import { ScheduledMaintenance } from './scheduled-maintenance';

@Component({
  selector: 'app-scheduled-maintenance',
  templateUrl: './scheduled-maintenance.component.html',
  styleUrls: ['../scheduled-maintenance-1/scheduled-maintenance.scss'],
})
export class ScheduledMaintenanceComponent
  extends ScheduledMaintenance
  implements OnInit
{
  loadingExcel = false;
  flagDownload = false;
  constructor(
    protected override fb: FormBuilder,
    protected override service: ProceedingsDeliveryReceptionService,
    protected override detailService: ProceedingsDetailDeliveryReceptionService,
    private router: Router
  ) {
    super(fb, service, detailService, 'filtersIndica');
    this.settings1 = { ...this.settings1, actions: null };
    this.tiposEvento = [
      {
        id: 'EVENTREC',
        description: 'RECEPCIÓN FÍSICA',
      },
    ];
  }

  captureEvent() {
    console.log(this.form.value);
    if (!this.form.get('tipoEvento').value) {
      this.onLoadToast(
        'error',
        'Captura de Evento',
        'No se ha especificado el Tipo de Evento'
      );
    }
    this.router.navigate([
      'pages/final-destination-process/delivery-schedule/schedule-of-events/capture-event',
    ]);
    // if(this.form.get('tipoEvento').value === 'EVENTREC'){

    // }
  }

  exportExcel() {
    // const data = <IProceedingDeliveryReception[]>this.table.source.data;
    // this.elementToExport = data.map(item => {
    //   return {
    //     CVE_ACTA: item.keysProceedings,
    //     LOC_TRANSF:item.address,

    //   };
    // })
    this.loadingExcel = true;
    this.service.getExcel(this.filterParams).subscribe(x => {
      this.elementToExport = x;
      this.flagDownload = !this.flagDownload;
      console.log(x);
      this.loadingExcel = false;
    });
    console.log(this.table);
  }
}
