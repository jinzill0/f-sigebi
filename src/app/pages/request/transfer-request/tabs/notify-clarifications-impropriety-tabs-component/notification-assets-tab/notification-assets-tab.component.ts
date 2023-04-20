import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { MODAL_CONFIG } from 'src/app/common/constants/modal-config';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import {
  ListParams,
  SearchFilter,
} from 'src/app/common/repository/interfaces/list-params';
import { IClarification } from 'src/app/core/models/catalogs/clarification.model';
import { IClarificationGoodsReject } from 'src/app/core/models/ms-chat-clarifications/clarification-goods-reject-notifi-model';
import { ClarificationGoodRejectNotification } from 'src/app/core/models/ms-clarification/clarification-good-reject-notification';
import { IGood } from 'src/app/core/models/ms-good/good';
import { IGoodresdev } from 'src/app/core/models/ms-rejected-good/rejected-good.model';
import { IGetGoodResVe } from 'src/app/core/models/ms-rejectedgood/get-good-goodresdev';
import { ChatClarificationsService } from 'src/app/core/services/ms-chat-clarifications/chat-clarifications.service';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { GetGoodResVeService } from 'src/app/core/services/ms-rejected-good/goods-res-dev.service';
import { RejectedGoodService } from 'src/app/core/services/ms-rejected-good/rejected-good.service';
import { BasePage } from 'src/app/core/shared/base-page';
import Swal from 'sweetalert2';
import { NotifyAssetsImproprietyFormComponent } from '../notify-assets-impropriety-form/notify-assets-impropriety-form.component';
import { PrintSatAnswerComponent } from '../print-sat-answer/print-sat-answer.component';
import { RefuseClarificationModalComponent } from '../refuse-clarification-modal/refuse-clarification-modal.component';
import { LIST_ASSETS_COLUMN } from './list-assets-columns';
import { NOTIFY_ASSETS_COLUMNS } from './notify-assets-columns';

@Component({
  selector: 'app-notification-assets-tab',
  templateUrl: './notification-assets-tab.component.html',
  styles: [],
})
export class NotificationAssetsTabComponent
  extends BasePage
  implements OnInit, OnChanges
{
  @Input() isSaving: boolean;
  @Input() process: string = '';
  idRequest: number = 0;
  params = new BehaviorSubject<ListParams>(new ListParams());
  data: LocalDataSource = new LocalDataSource();
  columns: IGetGoodResVe[] = [];
  columnFilters: any = [];
  totalItems: number = 0;
  notificationsGoods: IGood;
  notificationsList: ClarificationGoodRejectNotification[] = [];
  valuesNotifications: ClarificationGoodRejectNotification;
  //prueba: IChatClarifications;

  settings2: any;
  params2 = new BehaviorSubject<ListParams>(new ListParams());
  paramsNotify = new BehaviorSubject<ListParams>(new ListParams());
  paragraphs2: any[] = [];
  totalItems2: number = 0;
  notifyAssetsSelected: any[] = [];
  bsModalRef: BsModalRef;
  formLoading: boolean = false;
  loadingGoods = this.loading;
  loading2 = this.loading;

  //verificar por el estado del campo transferente si es SAT O otro
  byInterconnection: boolean = false;

  rowSelected: boolean = false;
  selectedRow: any = null;
  goodsReject: IGoodresdev[] = [];
  valueClarification: IClarification;
  valueGood: number;
  valueRejectNotificationId: number;
  dataNotificationSelected: IClarificationGoodsReject;

  constructor(
    private modalService: BsModalService,
    private activatedRoute: ActivatedRoute,
    private rejectedGoodService: RejectedGoodService,
    private chatClarificationsService: ChatClarificationsService,
    private goodService: GoodService,
    private getGoodResVeService: GetGoodResVeService
  ) {
    super();
    this.idRequest = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnChanges(changes: SimpleChanges): void {
    //console.log(changes);
    //la accion del guardar llega al hijo
  }

  ngOnInit(): void {
    this.settings = {
      ...TABLE_SETTINGS,
      actions: false,
      selectMode: 'multi',
      columns: { ...LIST_ASSETS_COLUMN },
    };
    this.settings2 = {
      ...TABLE_SETTINGS,
      actions: false,
      selectMode: 'multi',
      columns: { ...NOTIFY_ASSETS_COLUMNS },
    };

    this.data
      .onChanged()
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(change => {
        if (change.action === 'filter') {
          let filters = change.filter.filters;
          filters.map((filter: any) => {
            let field = ``;
            let searchFilter = SearchFilter.ILIKE;
            /*SPECIFIC CASES*/
            field = `filter.${filter.field}`;
            switch (filter.field) {
              case 'clarificationstatus':
                searchFilter = SearchFilter.ILIKE;
                break;
              case 'goodId':
                searchFilter = SearchFilter.ILIKE;
                break;
              case 'gooddescription':
                searchFilter = SearchFilter.ILIKE;
                break;
              default:
                searchFilter = SearchFilter.ILIKE;
                break;
            }
            if (filter.search !== '') {
              this.columnFilters[field] = `${searchFilter}:${filter.search}`;
            } else {
              delete this.columnFilters[field];
            }
          });
          this.getGoodsByRequest();
        }
      });
    this.params
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(() => this.getGoodsByRequest());
  }

  getGoodsByRequest() {
    this.loadingGoods = true;
    const params1 = new ListParams();
    params1['filter.idrequest'] = `${this.idRequest}`;
    let params = {
      ...this.params.getValue(),
      ...this.columnFilters,
      ...params1,
    };

    this.getGoodResVeService.getAll(params).subscribe({
      next: response => {
        this.columns = response.data;
        this.totalItems = response.count || 0;

        this.data.load(this.columns);
        this.data.refresh();
        this.loadingGoods = false;
      },
      error: error => (this.loadingGoods = false),
    });
    console.log('Bienes mediante request', this.columns);
  }

  goodSelect(data: any) {
    console.log(data);
    this.goodsReject = data;
    if (this.goodsReject.length == 1) {
      this.params2
        .pipe(takeUntil(this.$unSubscribe))
        .subscribe(() => this.getClarificationsByGood(data[0].goodid));
    }
  }

  getClarificationsByGood(id: number) {
    this.formLoading = true;
    const params2 = new ListParams();
    params2['filter.goodId'] = `$eq:${id}`;
    let params = {
      ...this.params.getValue(),
      ...this.columnFilters,
      ...params2,
    };
    this.rejectedGoodService.getAllFilter(params).subscribe({
      next: response => {
        this.notificationsList = response.data;
        this.totalItems2 = response.count;
        this.formLoading = false;
      },
      error: error => (this.formLoading = false),
    });
  }

  notifyAssetRowSelected(event: any) {
    console.log('info de la notificación selecionada', event.data);
    console.log('info del id de clarifications', event.data.clarificationId);
    //let idClarification = event.data.clarificationId;
    this.valueClarification = event.data.clarification as IClarification;
    //const refuseObj = { ...this.valuesNotifications };
    //let idRefuse = refuseObj.rejectNotificationId;
    //console.log("ID del rechazo", idRefuse)
    //verificar cuantas aclaraciones se pueden seleccionar para aceptarlas
    this.dataNotificationSelected = event.data as IClarificationGoodsReject;
    this.notifyAssetsSelected = event.selected;
    this.valueGood = event.data.goodId;
    this.valueRejectNotificationId = event.data.rejectNotificationId;
  }

  refuseClarification() {
    if (this.rowSelected == false) {
      this.message('Error', 'Seleccione notificación a rechazar');
    } else {
      const refuseObj = { ...this.valuesNotifications }; //Info de sus notificaciones

      const modalConfig = MODAL_CONFIG;
      modalConfig.initialState = {
        refuseObj,
        clarification: this.notifyAssetsSelected,
        callback: (next: boolean) => {
          this.getClarificationsByGood(refuseObj.goodId);
        },
      };
      this.modalService.show(RefuseClarificationModalComponent, modalConfig);
    }

    //ver si los datos se devolveran por el mismo modal o se guardan

    /*  this.bsModalRef.content.event.subscribe((res: IRequestInTurnSelected) => {
      console.log(res);
      this.requestForm.get('receiUser').patchValue(res.user);
    }); */
  }

  selectRow(row?: any) {
    this.selectedRow = row;
    this.rowSelected = true;
  }

  verifyClarification() {
    if (this.goodsReject.length < this.columns.length) {
      this.onLoadToast(
        'warning',
        'Para verificar el cumplimiento se necesita tener todos los bienes seleccionados',
        ''
      );
    } else {
      this.goodsReject.map(items => {
        if (items.clarificationstatus == 'REGISTRO_SOLICITUD') {
          this.alertQuestion(
            'warning',
            'Confirmación',
            'Los bines seleccionados regresaran al proceso de Verificar Cumplimiento'
          ).then(question => {
            if (question.isConfirmed) {
              this.validateGoodStatus();
            }
            //this.redirectGoodTracker(question);
          });
        } else {
          this.onLoadToast(
            'info',
            'De los bienes seleccionados, existen bienes sin aclarar para enviar a Verificar Cumplimiento',
            ''
          );
        }
      });
    }
  }

  validateGoodStatus() {
    this.goodsReject.map(item => {
      if (
        item.clarificationstatus == 'REGISTRO_SOLICITUD' ||
        item.clarificationstatus == 'CANCELADO'
      ) {
        this.updateStatusGood(
          null,
          'VERIFICAR_CUMPLIMIENTO',
          item.goodid,
          item.goodresdev,
          item.typeorigin
        );
      } else {
        this.onLoadToast(
          'info',
          'De los bienes seleccionados, existen bienes sin aclarar para enviar a Verificar Cumplimiento',
          ''
        );
      }
    });
  }

  updateStatusGood(
    statusGood?: string,
    statusProcess?: string,
    idGood?: number,
    idGoodResDev?: number,
    typeOrigin?: string
  ) {
    if (typeOrigin == 'SOL_TRANSFERENCIA') {
      console.log('bien', idGood);
      console.log('status bien', statusGood);
      console.log('status Process', statusProcess);
      console.log('fecha', new Date());

      //this.goodService.update();
    }
  }
  finishClarifiImpro() {
    let message =
      '¿Esta seguro de que desea finalizar la aclaración?\nSe sugiere subir documentación soporte para esta sección';
    this.alertQuestion(
      undefined,
      'Confirmación de Aclaración',
      message,
      'Aceptar'
    ).then(question => {
      if (question.isConfirmed) {
        console.log('El estatus de la aclaración cambia a "Aclarado"');
        if (
          this.notifyAssetsSelected[0].typeClarification === 'IMPROCEDENCIA'
        ) {
          //el bien se marca como improcedente y desaparece
        } else {
          //estatys cambia a "aclarado"
        }
      }
    });
  }

  acceptClariImpro() {
    if (this.rowSelected == false) {
      this.message('Error', 'Seleccione notificación a aceptar');
    } else {
      const idClarification = this.selectedRow.clarification.id;
      console.log('idaclaración seleccionado', idClarification);
      this.openModal(idClarification);
    }
  }

  message(title: string, text: string) {
    Swal.fire({
      title: title,
      text: text,
      icon: undefined,
      width: 300,
      showCancelButton: false,
      confirmButtonColor: '#9D2449',
      cancelButtonColor: '#b38e5d',
      confirmButtonText: 'Aceptar',
    }).then(result => {
      if (result.isConfirmed) {
        return;
      }
    });
  }

  openModal(idClarification: number): void {
    const dataClarifications2 = this.dataNotificationSelected;
    const rejectedID = this.valueRejectNotificationId;
    const goodValue = this.valueGood;
    const dataNotification = this.valueClarification;
    const idNotify = { ...this.notificationsGoods };
    const dataClarifications = { ...this.valuesNotifications };
    const idAclara = this.selectedRow.clarification.type; //Id del tipo de aclaración
    let config: ModalOptions = {
      initialState: {
        dataClarifications2,
        rejectedID,
        goodValue,
        dataNotification,
        idClarification,
        dataClarifications,
        idAclara,
        clarification: this.notifyAssetsSelected,
        isInterconnection: this.byInterconnection,
        idRequest: this.idRequest,
        callback: (next: boolean) => {
          if (next) {
            this.getClarificationsByGood(idNotify.goodId);
          }
        },
      },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(
      NotifyAssetsImproprietyFormComponent,
      config
    );

    /*  this.bsModalRef.content.event.subscribe((res: IRequestInTurnSelected) => {
      console.log(res);
      this.requestForm.get('receiUser').patchValue(res.user);
    }); */
  }

  //Respuesta del SAT
  satAnswer() {
    if (this.rowSelected == false) {
      this.message('Error', 'Primero seleccione una notificación');
    } else {
      const idNotify = { ...this.notificationsGoods };
      const idAclaracion = this.selectedRow.clarification.id; //ID de la aclaración para mandar al reporte del sat
      if (this.selectedRow.satClarify == null) {
        this.message('Aviso', 'Aún no hay una respuesta del SAT');
        return;
      }

      let config: ModalOptions = {
        initialState: {
          idAclaracion,
          callback: (next: boolean) => {
            this.getClarificationsByGood(idNotify.goodId);
          },
        },
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
      };
      this.modalService.show(PrintSatAnswerComponent, config);
    }
  }

  reloadData() {
    if (this.columns) {
      console.log(this.columns);
      this.columns.map(items => {
        console.log(items.clarificationstatus);
        if (items.clarificationstatus != 'ACLARADO') {
          console.log('data', items.goodid);
          this.paramsNotify.getValue()['filter.goodId'] = items.goodid;
          this.rejectedGoodService
            .getAllFilter(this.paramsNotify.getValue())
            .subscribe({
              next: response => {
                console.log('Notificaciones', response);
                if (response.data.length > 0) {
                  response.data.map(notification => {
                    console.log(
                      'notificaciones',
                      notification.clarificationType
                    );
                    if (
                      notification.clarificationType ==
                        'SOLICITAR_ACLARACIÓN' ||
                      notification.clarificationType == 'SOLICITAR_ACLARACION'
                    ) {
                    }
                  });
                }
              },
              error: error => ({}),
            });
        }
      });
    }
    /*this.params
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(() => this.getGoodsByRequest()); */
  }

  aceptClarification() {}
}
