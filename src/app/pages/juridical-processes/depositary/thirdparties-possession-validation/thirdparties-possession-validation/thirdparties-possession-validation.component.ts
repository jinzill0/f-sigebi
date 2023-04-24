/** BASE IMPORT */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, debounceTime } from 'rxjs';
import {
  FilterParams,
  ListParams,
} from 'src/app/common/repository/interfaces/list-params';
import { INotification } from 'src/app/core/models/ms-notification/notification.model';
import { BasePage } from 'src/app/core/shared/base-page';
import {
  KEYGENERATION_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';
import {
  GOODS_COLUMNS,
  NOTIFICATIONS_COLUMNS,
} from './thirdparties-possession-validation-columns';
/** LIBRERÍAS EXTERNAS IMPORTS */

/** SERVICE IMPORTS */
import { IGood } from 'src/app/core/models/ms-good/good';
import { ISegUsers } from 'src/app/core/models/ms-users/seg-users-model';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { NotificationService } from 'src/app/core/services/ms-notification/notification.service';
import { UsersService } from 'src/app/core/services/ms-users/users.service';

/** ROUTING MODULE */

/** COMPONENTS IMPORTS */

const predifinedText =
  'En cumplimiento a la instrucción judicial derivada del juicio de amparo <A> por el cual se informa que se resolvió provisionalmente conceder al quejoso la restitución de la posesión  uso y disfrute  del(los) siguiente(s) mueble(s). Al respecto me permito señalar: \n\n<B> \n\n<C> \n\nCon fundamento en la fracción XIV del artículo 39 del Estatuto Orgánico del Servicio de Administración y Enajenación de Bienes y considerando la instrucción judicial deducida del juicio de garantías emitida por el Juez <DATOS DE JUZGADO>, por el cual se otorga la suspensión definitiva al quejoso <QUEJOSO> respecto del disfrute del inmueble de marras y, consecuentemente, la restitución de la posesión, en tal sentido y salvo que no exista aseguramiento anterior o posterior decretado por autoridad competente para ello, esa Delegación a su cargo deberá dar cabal cumplimiento a la suspensión definitiva, levantado para tal efecto el acta administrativa de entrega de posesión por virtud de suspensión provisional, afectando, consecuentemente, el SIAB bajo el estatus ¿PD3¿ ¿entrega en posesión a terceros por instrucción judicial¿. \n\nEl cumplimiento señalado, deberá realizarlo a la brevedad e informar al Juez de Amparo sobre los actos tendientes a su cumplimiento. \n\nNo omito señalar, que en el supuesto de que se resuelva el amparo en el cuaderno incidental y/o principal negando la protección de la justicia federal, se deberán llevar a cabo las acciones legales correspondientes para recuperar la posesión del inmueble asegurado. \n\nFinalmente, le informo que debe hacer del conocimiento de la autoridad que decretó el aseguramiento, así como, en su caso, del Juez que conozca del proceso penal federal. \n\nQuedo a sus órdenes para cualquier comentario.';

@Component({
  selector: 'app-thirdparties-possession-validation',
  templateUrl: './thirdparties-possession-validation.component.html',
  styleUrls: ['./thirdparties-possession-validation.component.scss'],
})
export class ThirdpartiesPossessionValidationComponent
  extends BasePage
  implements OnInit, OnDestroy
{
  users: ISegUsers[] = [];
  dataTableNotifications: INotification[] = [];
  // Table settings
  params = new BehaviorSubject<FilterParams>(new FilterParams());
  selectedRows: IGood = {};
  selectedRows2: IGood = {};
  wheelNotifications: INotification;

  tableSettingsNotificaciones = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
    },
    hideSubHeader: true, //oculta subheaader de filtro
    mode: 'external', // ventana externa

    columns: NOTIFICATIONS_COLUMNS,
  };

  // Table settings
  tableSettingsBienes = {
    rowClassFunction: (row: any) => {
      if (row.cells[1].value != 'ADM') {
        return 'bg-dark';
      } else {
        return 'bg-primary';
      }
    },
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
    },
    selectMode: 'multi',
    hideSubHeader: true, //oculta subheaader de filtro
    mode: 'external', // ventana externa

    columns: GOODS_COLUMNS,
  };
  // Data table
  dataTableBienes: IGood[] = [];

  // Table settings
  tableSettingsBienesOficio = {
    actions: {
      columnTitle: '',
      add: false,
      edit: false,
      delete: false,
    },
    selectMode: 'multi',
    hideSubHeader: true, //oculta subheaader de filtro
    mode: 'external', // ventana externa

    columns: GOODS_COLUMNS,
  };
  // Data table
  dataTableBienesOficio: IGood[] = [];

  expedientNumber: number = 0;
  public form: FormGroup;
  public formCcpOficio: FormGroup;
  public noExpediente: FormGroup;

  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private goodService: GoodService,
    private usersService: UsersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.loading = true;

    this.noExpediente
      .get('noExpediente')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(x => {
        this.getNotifications(new ListParams(), x);
      });

    this.form
      .get('wheelNumber')
      .valueChanges.pipe(debounceTime(500))
      .subscribe(x => {
        this.getNotificationByWheel(new ListParams(), x);
        this.getGoodsPosessionThird(new ListParams(), x);
      });
  }

  private prepareForm() {
    this.form = this.fb.group({
      wheelNumber: '',
      officeExternalKey: ['', [Validators.pattern(KEYGENERATION_PATTERN)]],
      addressee: ['', [Validators.pattern(STRING_PATTERN)]], // Detalle destinatario
      texto: '',
    });
    this.noExpediente = this.fb.group({
      noExpediente: '',
    });
    this.formCcpOficio = this.fb.group({
      ccp1: ['', [Validators.pattern(STRING_PATTERN)]],
      ccp2: ['', [Validators.pattern(STRING_PATTERN)]],
      firma: ['', [Validators.pattern(STRING_PATTERN)]],
    });
  }

  getGoodsPosessionThird(params: ListParams, wheelNumber?: number) {
    if (!wheelNumber) {
      return;
    }

    this.params = new BehaviorSubject<FilterParams>(new FilterParams());
    let data = this.params.value;
    data.page = params.page;
    data.limit = params.limit;

    if (wheelNumber) {
      data.addFilter('wheelNumber', wheelNumber);
    }

    // this.goodService.getAll(data.getParams()).subscribe({
    //   next: data => {
    //     this.formCcpOficio.get('ccp1').patchValue(data.data[0].userReceipt);
    //     this.formCcpOficio.get('ccp2').patchValue(data.data[0].user)
    //     this.formCcpOficio.get('firma').patchValue(data.data[0].userResponsable)
    //   },
    //   error: err => {
    //     this.loading = false;
    //   },
    // });
  }

  getNotificationByWheel(params: ListParams, wheelNumber?: number) {
    if (!wheelNumber) {
      return;
    }

    this.params = new BehaviorSubject<FilterParams>(new FilterParams());
    let data = this.params.value;
    data.page = params.page;
    data.limit = params.limit;

    if (wheelNumber) {
      data.addFilter('wheelNumber', wheelNumber);
    }

    this.notificationService.getAllFilter(data.getParams()).subscribe({
      next: data => {
        this.wheelNotifications = data.data[0];
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  getNotifications(params: ListParams, numberExpedient?: number) {
    this.expedientNumber = numberExpedient;
    if (!numberExpedient) {
      this.dataTableNotifications = [];
      this.dataTableBienesOficio = [];
      this.dataTableBienes = [];
      return;
    }

    this.params = new BehaviorSubject<FilterParams>(new FilterParams());
    let data = this.params.value;
    data.page = params.page;
    data.limit = params.limit;

    if (numberExpedient) {
      data.addFilter('expedientNumber', numberExpedient);
    }

    this.dataTableNotifications = [];

    this.notificationService.getAllFilter(data.getParams()).subscribe({
      next: data => {
        this.dataTableNotifications = data.data;
      },
      error: err => {
        this.loading = false;
      },
    });
    this.dataTableBienes = [];
    this.dataTableBienesOficio = [];
    this.getGoods(new ListParams(), numberExpedient);
  }

  getGoods(params: ListParams, numberExpedient?: number) {
    this.params = new BehaviorSubject<FilterParams>(new FilterParams());
    let data = this.params.value;
    data.page = params.page;
    data.limit = params.limit;

    if (numberExpedient) {
      data.addFilter('fileNumber', numberExpedient);
      this.getGoodsByOffice(new ListParams(), numberExpedient);
    }

    this.goodService.getAllFilter(data.getParams()).subscribe({
      next: data => {
        this.dataTableBienes = data.data;
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  getGoodsByOffice(params: ListParams, numberExpedient: number) {
    this.params = new BehaviorSubject<FilterParams>(new FilterParams());
    let data = this.params.value;
    data.page = params.page;
    data.limit = params.limit;

    data.addFilter('status', 'STI');
    data.addFilter('fileNumber', numberExpedient);
    this.goodService.getAllFilter(data.getParams()).subscribe({
      next: data => {
        this.dataTableBienesOficio = data.data;
      },
      error: err => {
        this.loading = false;
      },
    });
  }

  rowSelected(rows: any) {
    this.selectedRows = rows.isSelected ? rows.data : {};
  }

  rowSelected2(rows: any) {
    this.selectedRows2 = rows.isSelected ? rows.data : {};
  }

  addGoodOffice() {
    if (Object.keys(this.selectedRows).length < 1) {
      this.alert(
        'info',
        'Selecciona un bien',
        'Selecciona un bien para poder realizar esta acción.'
      );
      return;
    }

    if (this.selectedRows.status === 'STI') {
      this.alert(
        'info',
        'Selecciona un bien',
        'Selecciona un bien que esté disponible.'
      );
      return;
    }

    this.goodService
      .updateGoodStatus(this.selectedRows.goodId, 'STI')
      .subscribe({
        next: data => this.handleSuccess(),
        error: error => (this.loading = false),
      });
  }

  handleSuccess() {
    this.getGoods(new ListParams(), this.expedientNumber);
    this.alert('success', 'Excelente', 'Se ha agregado el bien correctamente');
    this.loading = false;
  }

  deleteGoodOffice() {
    if (Object.keys(this.selectedRows2).length < 1) {
      this.alert(
        'info',
        'Selecciona un bien',
        'Selecciona un bien para poder realizar esta acción.'
      );
      return;
    }

    this.goodService
      .updateGoodStatus(this.selectedRows2.goodId, 'ADM')
      .subscribe({
        next: data => this.handleSuccess(),
        error: error => (this.loading = false),
      });
  }

  mostrarInfo(form: any): any {
    console.log(form.value);
  }

  mostrarInfoDepositario(formDepositario: any): any {
    console.log(formDepositario.value);
  }

  sendForm() {
    this.alert('info', 'Nota', 'La clave ya ha sido enviada.');
  }

  btnInsertarTextoPredefinido() {
    this.form.get('texto').setValue(predifinedText);
  }

  btnReemplazarMarcadores() {
    let replaceText = predifinedText.replaceAll(
      '<A>',
      this.wheelNotifications ? this.wheelNotifications.protectionKey : '<A>'
    );
    replaceText = replaceText.replaceAll('<B>', 'BIEN  DESCRIPCIÓN');
    replaceText = replaceText.replaceAll(
      '<C>',
      this.dataTableBienes
        ? `${this.dataTableBienes[0].goodId}  ${this.dataTableBienes[0].description}`
        : '<C>'
    );

    this.form.get('texto').setValue(replaceText);
  }

  btnImprimir() {
    this.loading = true;
    const pdfurl = `http://reports-qa.indep.gob.mx/jasperserver/rest_v2/reports/SIGEBI/Reportes/blank.pdf`; //window.URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    //console.log(linkSource);
    downloadLink.href = pdfurl;
    downloadLink.target = '_blank';
    downloadLink.click();

    // console.log(this.flyersForm.value);
    let params = { ...this.form.value };
    for (const key in params) {
      if (params[key] === null) delete params[key];
    }
    //let newWin = window.open(pdfurl, 'test.pdf');
    this.alert('success', '', 'Reporte generado');
    this.loading = false;
  }
}
