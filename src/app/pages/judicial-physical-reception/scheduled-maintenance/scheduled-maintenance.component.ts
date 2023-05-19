import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { IProceedingDeliveryReception } from 'src/app/core/models/ms-proceedings/proceeding-delivery-reception';
import { MsIndicatorGoodsService } from 'src/app/core/services/ms-indicator-goods/ms-indicator-goods.service';
import { ProceedingsDeliveryReceptionService } from 'src/app/core/services/ms-proceedings/proceedings-delivery-reception.service';
import { ProceedingsDetailDeliveryReceptionService } from 'src/app/core/services/ms-proceedings/proceedings-detail-delivery-reception.service';
import { ScheduledMaintenance } from './scheduled-maintenance';

@Component({
  selector: 'app-scheduled-maintenance',
  templateUrl: './scheduled-maintenance.component.html',
  styleUrls: [
    '../scheduled-maintenance-1/scheduled-maintenance.scss',
    './scheduled-maintenance.component.scss',
  ],
})
export class ScheduledMaintenanceComponent
  extends ScheduledMaintenance
  implements OnInit
{
  showTable1 = true;
  loadingExcel = false;
  flagDownload = false;
  totalItemsIndicators: number = 0;
  paramsIndicators = new BehaviorSubject<ListParams>(new ListParams());
  data2: any[] = [];
  constructor(
    protected override fb: FormBuilder,
    protected override service: ProceedingsDeliveryReceptionService,
    protected override detailService: ProceedingsDetailDeliveryReceptionService,
    private serviceIndicator: MsIndicatorGoodsService,
    private router: Router
  ) {
    super(fb, service, detailService, 'filtersIndica');
    // this.settings1 = {
    //   ...this.settings1,
    //   actions: null,
    // };
    this.settings1 = {
      ...this.settings1,
      actions: { ...this.settings1.actions, position: 'left' },
      edit: {
        editButtonContent: '<i class="fa fa-eye mx-2"></i>',
      },
    };
    this.tiposEvento = [
      {
        id: 'EVENTREC',
        description: 'RECEPCIÓN FÍSICA',
      },
    ];
  }

  updateCoord(event: any) {
    console.log(event);
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

  rowsSelected(event: IProceedingDeliveryReception) {
    console.log(event);
    if (event.id) {
      this.showTable1 = false;
      this.loading = true;
      let params = this.paramsIndicators.value;
      params['id'] = event.id;
      this.serviceIndicator
        .getGoodsByProceeding(params)
        .pipe(takeUntil(this.$unSubscribe))
        .subscribe({
          next: response => {
            this.data2 = response.data;
            this.totalItemsIndicators = response.count;
            this.loading = false;
          },
          error: err => {
            this.data2 = [];
            this.totalItemsIndicators = 0;
            this.loading = false;
          },
        });
    }
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
    this.onLoadToast(
      'info',
      'Reporte de Mantenimiento de Programaciones',
      'Consiguiendo datos'
    );
    this.service.getExcel2(this.data).subscribe(x => {
      this.elementToExport = x;
      this.flagDownload = !this.flagDownload;
      console.log(x);
      this.loadingExcel = false;
      setTimeout(() => {
        this._toastrService.clear();
      }, 1000);
    });
    // this.service.getExcel(this.filterParams).subscribe(x => {
    //   this.elementToExport = x;
    //   this.flagDownload = !this.flagDownload;
    //   console.log(x);
    //   this.loadingExcel = false;
    //   setTimeout(() => {
    //     this._toastrService.clear();
    //   }, 1000);
    // });
    console.log(this.table);
  }
}
