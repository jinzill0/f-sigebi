import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  BehaviorSubject,
  catchError,
  lastValueFrom,
  map,
  of,
  switchMap,
  takeUntil,
  tap,
  throwError,
} from 'rxjs';
import { DateCellComponent } from 'src/app/@standalone/smart-table/date-cell/date-cell.component';
import {
  FilterParams,
  ListParams,
  SearchFilter,
} from 'src/app/common/repository/interfaces/list-params';
import { ITmpProgValidation } from 'src/app/core/models/good-programming/good-programming';
import { IGoodIndicator } from 'src/app/core/models/ms-event-programming/good-indicators.model';
import { IParameters } from 'src/app/core/models/ms-parametergood/parameters.model';
import { IProceedingDeliveryReception } from 'src/app/core/models/ms-proceedings/proceeding-delivery-reception';
import { IProceedings } from 'src/app/core/models/ms-proceedings/proceedings.model';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { DynamicCatalogService } from 'src/app/core/services/dynamic-catalogs/dynamic-catalogs.service';
import { EventProgrammingService } from 'src/app/core/services/ms-event-programming/event-programing.service';
import { ExpedientService } from 'src/app/core/services/ms-expedient/expedient.service';
import { GoodParametersService } from 'src/app/core/services/ms-good-parameters/good-parameters.service';
import { IndicatorsParametersService } from 'src/app/core/services/ms-parametergood/indicators-parameter.service';
import { ParametersService } from 'src/app/core/services/ms-parametergood/parameters.service';
import { RNomenclaService } from 'src/app/core/services/ms-parametergood/r-nomencla.service';
import {
  ProceedingsDeliveryReceptionService,
  ProceedingsDetailDeliveryReceptionService,
} from 'src/app/core/services/ms-proceedings';
import { ProgrammingGoodsService } from 'src/app/core/services/ms-programming-good/programming-good.service';
import { TmpContProgrammingService } from 'src/app/core/services/ms-programming-good/tmp-cont-programming.service';
import { ProgrammingGoodService } from 'src/app/core/services/ms-programming-request/programming-good.service';
import { SecurityService } from 'src/app/core/services/ms-security/security.service';
import { IndUserService } from 'src/app/core/services/ms-users/ind-user.service';
import { SegAcessXAreasService } from 'src/app/core/services/ms-users/seg-acess-x-areas.service';
import { ProcedureManagementService } from 'src/app/core/services/proceduremanagement/proceduremanagement.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { CheckboxElementComponent } from 'src/app/shared/components/checkbox-element-smarttable/checkbox-element';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { GOODS_TACKER_ROUTE } from 'src/app/utils/constants/main-routes';
import {
  COLUMNS_CAPTURE_EVENTS,
  COLUMNS_CAPTURE_EVENTS_2,
} from './columns-capture-events';
import { SmartDateInputHeaderDirective } from './directives/smart-date-input.directive';
import { CaptureEventProceeding } from './utils/capture-event-proceeding';
import {
  CaptureEventRegisterForm,
  CaptureEventSiabForm,
} from './utils/capture-events-forms';
import { EventCaptureButtons } from './utils/event-capture-butttons';

interface IBlkCtrl {
  component: string | number;
  typeNum: string | number;
  typeNumCant: number;
  userLevel: string | number;
  reopenInd: string | number;
  cEvent: number;
  cQuantity: number;
  cSelAll: number;
  goodQuantity: number;
  asigTm: string | number;
  asigCb: string | number;
  txtDirSatLabel: string;
  txtDirSat: string;
}

interface IGlobalV {
  paperworkArea: string;
  proceedingNum: number;
  noClosed: number;
  type: string;
  tran: string;
  cons: string;
  regi: string;
}

interface IBlkProceeding {
  txtCrtSus1: string;
  txtCrtSus2: string;
}
@Component({
  selector: 'app-event-capture',
  templateUrl: './event-capture.component.html',
  styles: [
    `
      .r-label {
        margin-top: -14px !important;
      }
    `,
  ],
})
export class EventCaptureComponent
  extends BasePage
  implements OnInit, AfterViewInit, AfterContentInit
{
  @ViewChildren(SmartDateInputHeaderDirective, { read: ElementRef })
  private itemsElements: QueryList<ElementRef>;
  saveLoading = false;
  eventTypes = new DefaultSelect([
    { area_tramite: 'OP', descripcion: 'Oficialía de partes' },
  ]);
  typeOtions = new DefaultSelect([
    { value: 'RT', label: 'RT' },
    { value: 'A', label: 'A' },
    { value: 'D', label: 'D' },
  ]);

  progOptions = new DefaultSelect([
    { value: 'R', label: 'R' },
    { value: 'E', label: 'E' },
  ]);

  programedOptions = new DefaultSelect([
    { value: 0, label: 'Día a Día' },
    { value: 1, label: 'Desalojo' },
  ]);
  areas = new DefaultSelect();
  transfers = new DefaultSelect();
  users = new DefaultSelect();
  originalType: string = null;
  form = this.fb.group(new CaptureEventRegisterForm());
  formSiab = this.fb.group(new CaptureEventSiabForm());
  totalItems: number = 0;
  params = new BehaviorSubject<ListParams>(new ListParams());
  detail: IGoodIndicator[] = [];
  ctrlButtons = new EventCaptureButtons();
  blkCtrl: IBlkCtrl = {
    component: null, // COMPONENTE
    typeNum: null, // NO_TIPO
    typeNumCant: null, // NO_TIPO_CANT
    userLevel: null, // NIVEL_USUARIO
    reopenInd: null, // IND_REAPERTURA
    txtDirSatLabel: 'Vo. Bo. de Sat',
    txtDirSat: null,
    cEvent: 0, // C_EVENTO
    cQuantity: 0, // C_CANTIDAD
    cSelAll: 0, // SEL_TODO
    goodQuantity: 0, //CANT_BIEN
    asigTm: null,
    asigCb: null,
  };

  blkProceeding: IBlkProceeding = {
    txtCrtSus1: null,
    txtCrtSus2: null,
  };
  packNumCtrl = new FormControl(null);
  showPackNumCtrl = false;

  global: IGlobalV = {
    paperworkArea: 'RF', // AREA_TRAMITE
    proceedingNum: 821325, // NO_ACTA
    noClosed: null, //no_cerrado
    type: null, //TIPO
    tran: null, //TRAN
    regi: null, //REGI
    cons: null, //CONS
  };

  // BLK_CANT
  blkQuantities = {
    goods: 0, // CANT_BIEN
    registers: 0, // CANT_REGI
    expedients: 0, // CANT_EXPE
    dictums: 0, // CANT_DICT
  };

  authUser: string = null;
  authUserName: string = null;

  // ACTAS_ENTREGA_RECEPCION
  proceeding: IProceedingDeliveryReception = new CaptureEventProceeding();

  defatulInputShow = false;

  private stageCreda: number | string = null;

  get registerControls() {
    return this.form.controls;
  }

  get siabControls() {
    return this.formSiab.controls;
  }
  constructor(
    private fb: FormBuilder,
    private parameterGoodService: ParametersService,
    private gParameterService: GoodParametersService,
    private authService: AuthService,
    private router: Router,
    private indUserService: IndUserService,
    private indicatorParametersService: IndicatorsParametersService,
    private proceedingDeliveryReceptionService: ProceedingsDeliveryReceptionService,
    private rNomenclaService: RNomenclaService,
    private segAccessXAreas: SegAcessXAreasService,
    private eventProgrammingService: EventProgrammingService,
    private detailDeliveryReceptionService: ProceedingsDetailDeliveryReceptionService,
    private activatedRoute: ActivatedRoute,
    private expedientService: ExpedientService,
    private dynamicCatalogService: DynamicCatalogService,
    private procedureManagementService: ProcedureManagementService,
    private procudeServ: ProcedureManagementService,
    private security: SecurityService,
    private progammingServ: ProgrammingGoodService,
    private programmingGoodService: ProgrammingGoodsService,
    private tmpContProgrammingService: TmpContProgrammingService
  ) {
    super();
    this.authUser = this.authService.decodeToken().preferred_username;
    this.authUserName = this.authService.decodeToken().name;
    this.settings = {
      ...this.settings,
      columns: {
        ...COLUMNS_CAPTURE_EVENTS,
        dateapprovalxadmon: {
          title: 'Inicio',
          sort: false,
          type: 'custom',
          showAlways: true,
          filter: {
            type: 'custom',
            component: DateCellComponent,
          },
          filterFunction: (value: any, query: any) => {
            if (query != 'skip') {
              this.detail = this.detail.map(d => {
                return { ...d, dateapprovalxadmon: new Date(query) };
              });
            }
            return query;
          },
          renderComponent: DateCellComponent,
          onComponentInitFunction: (instance: DateCellComponent) =>
            this.test(instance),
        },
        dateindicatesuserapproval: {
          title: 'Finalización',
          sort: false,
          type: 'custom',
          showAlways: true,
          filter: {
            type: 'custom',
            component: DateCellComponent,
          },
          filterFunction: (value: any, query: any) => {
            if (query != 'skip') {
              this.detail = this.detail.map(d => {
                return { ...d, dateindicatesuserapproval: new Date(query) };
              });
            }
            return query;
          },
          renderComponent: DateCellComponent,
        },
        select: {
          title: 'Selec.',
          sort: false,
          type: 'custom',
          filter: false,
          showAlways: true,
          renderComponent: CheckboxElementComponent,
        },
        ...COLUMNS_CAPTURE_EVENTS_2,
      },
      hideSubHeader: false,
      actions: false,
    };
    this.activatedRoute.queryParams.subscribe(params => {
      this.global.proceedingNum = params['numeroActa'] ?? null;
      this.global.paperworkArea = params['tipoEvento'] ?? null;
    });

    console.log(this.global);
  }

  test(instance: DateCellComponent) {
    instance.inputChange.subscribe(val => {
      console.log(val);
    });
  }

  async saveProceeding() {
    await this.generateCve();
    const formValue = this.form.value;
    const { numFile, keysProceedings, captureDate, responsible } = formValue;
    if (!responsible) {
      this.alert('error', 'Error', 'Eliga un responsable');
      return;
    }
    if (!numFile) {
      formValue.numFile = 2;
    }
    const elaborationDate = new Date();
    const statusProceedings = 'ABIERTA';
    const typeProceedings = this.originalType;
    const elaborate = this.authUser;
    const numDelegation1 = await this.getUserDelegation();
    const dataToSave = {
      keysProceedings,
      elaborationDate,
      captureDate,
      responsible,
      numFile: formValue.numFile,
      statusProceedings,
      typeProceedings,
      elaborate,
      numDelegation1,
    } as any;
    this.saveLoading = true;
    this.proceedingDeliveryReceptionService.create(dataToSave).subscribe({
      next: async res => {
        this.saveLoading = false;
        this.onLoadToast('success', 'Acta Generada Correctamente');
        this.global.proceedingNum = res.id;
        this.global.paperworkArea = this.originalType;
        await this.initForm();
        console.log(this.proceeding.keysProceedings);
        this.registerControls.keysProceedings.setValue(
          this.proceeding.keysProceedings
        );
        // await this.generateCve();
      },
      error: error => {
        this.saveLoading = false;
        this.onLoadToast(
          'error',
          'Error',
          'Ocurrió un error al guardar el acta'
        );
      },
    });
  }

  ngAfterContentInit(): void {
    console.log(this.itemsElements);
  }
  ngAfterViewInit(): void {
    console.log(this.itemsElements);
  }

  async transferClick() {
    const firstDetail = this.detail[0];
    console.log('llego', firstDetail);
    const { transference } = this.registerControls;
    if (!firstDetail) {
      transference.reset();
      return;
    }

    if (!firstDetail.expedientnumber) {
      transference.reset();
      return;
    }
    const { expedientnumber } = firstDetail;
    const identifier = await this.getExpedientById(expedientnumber);

    if (identifier == 'TRANS') {
      const { type, key } = await this.getTransferType(expedientnumber);
      if (type == 'E') {
        const tTrans = await this.getTTrans(expedientnumber);
        transference.setValue(tTrans);
      } else {
        transference.setValue(key);
      }
    } else {
      const tAseg = await this.getTAseg(expedientnumber);
      transference.setValue(tAseg);
    }

    const transferent = transference.value;
    this.transfers = new DefaultSelect([
      { value: transferent, label: transferent },
    ]);
  }

  async getTAseg(expedientId: string | number) {
    return await lastValueFrom(
      this.dynamicCatalogService
        .getClaveCTransparente(expedientId)
        .pipe(map(res => res.data[0].clave))
    );
  }

  async getTTrans(expedientId: string | number) {
    return await lastValueFrom(
      this.dynamicCatalogService
        .getDescEmisora(expedientId)
        .pipe(map(res => res.data[0].desc_emisora))
    );
  }

  async getTransferType(expedientId: string | number) {
    return await lastValueFrom(
      this.dynamicCatalogService.getIncapAndClave(expedientId).pipe(
        map(res => {
          return { type: res.data[0].coaelesce, key: res.data[0].clave };
        })
      )
    );
  }

  async getExpedientById(id: string | number) {
    return await lastValueFrom(
      this.expedientService
        .getById(id)
        .pipe(map(expedient => expedient.identifier))
    );
  }

  getUserDelegation() {
    const params = new FilterParams();
    params.addFilter('user', this.authUser);
    return lastValueFrom(
      this.segAccessXAreas
        .getAll(params.getParams())
        .pipe(map(res => res.data[0].delegationNumber))
    );
  }

  async getAreas(params: FilterParams) {
    const stage = await this.getStage();
    const delegation = await this.getUserDelegation();
    params.addFilter('stageedo', stage);
    params.addFilter('numberDelegation2', delegation);
    this.rNomenclaService.getAll(params.getParams()).subscribe({
      next: resp => {
        this.areas = new DefaultSelect(resp.data, resp.count);
      },
    });
  }

  goToGoodsTracker() {
    this.router.navigate([GOODS_TACKER_ROUTE], {
      queryParams: {
        origin: 'FINDICA_0035_1',
      },
    });
  }

  async loadGoods() {
    const { area, keysProceedings, typeEvent } = this.registerControls;
    if (
      this.proceeding.statusProceedings == 'CERRADA' ||
      this.proceeding.statusProceedings == 'CERRADO'
    ) {
      this.alert('error', 'Error', 'El programa esta cerrado');
      return;
    }

    if (!typeEvent.value) {
      this.alert('error', 'Error', 'No se ha especificado el Tipo de Evento');
      return;
    }

    if (!keysProceedings.value) {
      this.alert('error', 'Error', 'No se ha ingresado el programa');
      return;
    }
    let continueProcess = false;
    if (this.detail.length > 0) {
      const response = await this.alertQuestion(
        'warning',
        'Advertencia',
        'La asignación de bienes ya se ha realizado, se ejecuta nuevamente?'
      );
      continueProcess = response.isConfirmed;
    } else {
      const response = await this.alertQuestion(
        'warning',
        'Advertencia',
        'Quiere continuar con el proceso'
      );
      continueProcess = response.isConfirmed;
    }

    if (!continueProcess) {
      return;
    }

    this.createFilters();

    if (typeEvent.value == 'RF') {
      if (this.blkProceeding.txtCrtSus1) {
        this.pupUpdate();
      } else {
        this.frConditions();
      }
      this.blkCtrl.asigTm = 1;
      this.blkCtrl.asigCb = 1;
    } else {
      this.pupUpdate();
    }

    this.progTotal();
  }

  // PUP_TOTALES_PROG
  progTotal() {}

  // PUP_GENERA_WHERE
  createFilters() {}

  // PUP_ACTUALIZA
  pupUpdate() {}

  // PUP_CONDICIONES_FR
  frConditions() {
    this.pupUpdate();
  }

  async getStage() {
    return await lastValueFrom(
      this.gParameterService
        .getPhaseEdo()
        .pipe(map(response => response.stagecreated))
    );
  }

  responsibleChange() {
    return this.registerControls.responsible.valueChanges.pipe(
      takeUntil(this.$unSubscribe),
      tap(value => {
        this.proceeding.responsible = value;
        this.generateCve();
      })
    );
  }

  typeEventChange() {
    return this.registerControls.typeEvent.valueChanges.pipe(
      takeUntil(this.$unSubscribe),
      tap(value => {
        if (!value) return;
        this.showPackNumCtrl = false;
        this.ctrlButtons.convPack.hide();
        this.ctrlButtons.deletePack.hide();
        this.activeFields();
        this.setProg();
      })
    );
  }

  private setProg() {
    const prog = this.registerControls.typeEvent.value == 'RF' ? 'R' : 'E';
    this.registerControls.prog.setValue(prog);
  }

  async ngOnInit() {
    const { responsible } = this.registerControls;
    this.responsibleChange().subscribe();
    await this.initForm();
  }

  async generateCve() {
    const {
      keysProceedings,
      year,
      month,
      user,
      area,
      folio,
      prog,
      transference,
      type,
    } = this.registerControls;
    this.global.type = null;
    this.global.tran = null;
    this.global.regi = null;
    const splitedArea = keysProceedings?.value?.split('/');
    const _area = splitedArea ? splitedArea[3] : null;
    const cons = splitedArea ? splitedArea[5] : null;

    this.setProg();
    const currentDate = new Date();
    const currentMonth = `${currentDate.getMonth()}`.padStart(2, '0');
    year.setValue(currentDate.getFullYear());
    month.setValue(currentMonth);
    user.setValue(this.authUser);
    // TODO: PASAR A LA FORMA CORRECTA "VALUE" Y "LABEL"
    this.users = new DefaultSelect([
      { value: this.authUser, label: this.authUserName },
    ]);
    this.validateTransfer(type.value ?? 'RT', transference.value);

    if (!area.value) {
      if (!_area) {
        this.global.regi = null;
        this.global.cons = null;
      } else {
        this.global.regi = _area;
        this.global.cons = cons;
      }
    } else {
      this.global.regi = area.value;
      const indicator = await this.getProceedingType();
      let _folio = '';
      if (this.proceeding.keysProceedings) {
        _folio = this.proceeding.keysProceedings.split('/')[5];
      } else {
        _folio = await this.getFolio(indicator.certificateType);
      }
      this.global.cons = `${_folio}`.padStart(5, '0');
      folio.setValue(this.global.cons);
    }

    if (!this.global.type) {
      this.global.type = 'RT';
    }
    const cve = `${this.global.type ?? ''}/${prog.value ?? ''}/${
      this.global.tran ?? ''
    }/${this.global.regi ?? ''}/${user.value ?? ''}/${this.global.cons ?? ''}/${
      year?.value ? `${year.value}`.slice(-2) : ''
    }/${month.value ?? ''}`;
    // .slice(-2)
    keysProceedings.setValue(cve);
  }

  async getFolio(typeProceeding: string) {
    const { type, area, year } = this.registerControls;
    const body = {
      typeProceeding,
      type: type.value,
      regional: area.value,
      year: `${year.value}`.slice(-2),
    };
    return await lastValueFrom(
      this.eventProgrammingService.getFolio(body).pipe(
        catchError(error => {
          if (error.status >= 500) {
            this.onLoadToast(
              'error',
              'Error',
              'Error en la localización del folio'
            );
          }
          return throwError(() => error);
        }),
        map(response => response.folio)
      )
    );
  }

  // PUP_VAL_TRANF
  validateTransfer(_type: string, transfer: string) {
    const { keysProceedings } = this.registerControls;
    const splitedArea = keysProceedings?.value?.split('/');
    const cveType = splitedArea ? splitedArea[0] : null;
    const tran = splitedArea ? splitedArea[2] : null;
    const area = splitedArea ? splitedArea[3] : null;
    if (!transfer) {
      if (!cveType) {
        this.global.type = _type;
      } else {
        this.global.type = cveType == _type ? cveType : _type;
      }

      if (!tran) {
        this.global.tran = null;
      } else {
        if (
          (tran == 'PGR' || tran == 'PJF') &&
          (_type == 'D' || _type == 'A')
        ) {
          this.global.tran = tran;
          this.global.type = _type;
        } else if (
          tran != 'PGR' &&
          tran != 'PJF' &&
          (_type == 'D' || _type == 'A')
        ) {
          this.invalidTransfer();
        } else if ((tran == 'PGR' || tran == 'PJF') && _type == 'RT') {
          this.invalidTransfer();
        } else if (tran != 'PGR' && tran != 'PJF' && _type == 'RT') {
          this.global.tran = tran;
          this.global.type = _type;
        }
      }
    } else {
      // if(tran == transfer)  {
      if (
        (transfer == 'PGR' || transfer == 'PJF') &&
        (_type == 'D' || _type == 'A')
      ) {
        this.global.tran = transfer;
        this.global.type = _type;
      } else if (
        transfer != 'PGR' &&
        transfer != 'PJF' &&
        (_type == 'D' || _type == 'A')
      ) {
        this.invalidTransfer();
      } else if ((transfer == 'PGR' || transfer == 'PJF') && _type == 'RT') {
        this.invalidTransfer();
      } else if (transfer != 'PGR' && transfer != 'PJF' && _type == 'Rt') {
        this.global.tran = transfer;
        this.global.type = _type;
      }
      // }
    }
  }

  invalidTransfer() {
    this.global.tran = null;
    this.onLoadToast(
      'error',
      'Error',
      'La transferente no es válida para este tipo'
    );
  }

  getInitialParameter() {
    this.parameterGoodService
      .getById('SSF3_NOM_COMPONENTE')
      .pipe(map((parameter: any) => parameter as IParameters))
      .subscribe({
        next: parameter => {
          this.blkCtrl.component = parameter.initialValue + '';
        },
        error: () => {
          this.errorForm(
            'No se encontró el componente parametrizado del servidor de imagenes'
          );
        },
      });
  }

  getUserLevel() {
    return this.indUserService.getMinIndUser(this.authUser, 2).pipe(
      catchError(error => {
        this.errorForm('No se encontró el nivel de usuario');
        return throwError(() => error);
      }),
      switchMap(indicator =>
        this.eventProgrammingService
          .valUserInd({
            user: this.authUser,
            indicator,
          })
          .pipe(
            catchError(error => {
              this.errorForm('No se encontró el nivel de usuario');
              return throwError(() => error);
            })
          )
      ),
      tap(({ level }) => {
        if (!level) {
          this.errorForm('No se encontró el nivel de usuario');
          return;
        }
        this.blkCtrl.userLevel = Number(level);
      })
    );
  }

  getIndReopen() {
    return of(1).pipe(
      tap(account => {
        this.blkCtrl.reopenInd = account > 0 ? 0 : 1;
      })
    );
    // return of(0)
  }

  // CU_AREA_E
  async getAreasE() {}
  // CU_AREA_R;
  async getAreasR() {
    return await lastValueFrom(
      this.proceedingDeliveryReceptionService
        .getByUserAndArea(this.authUser, 'RF')
        .pipe(
          catchError(error => {
            if (error.status < 500) {
              this.onLoadToast(
                'error',
                ' Error',
                'No existen tipos de evento para el usuario ' + this.authUser
              );
            }
            return throwError(() => error);
          }),
          tap(response => {
            const def = {
              area_tramite: 'OP',
              descripcion: 'Oficialía de partes',
            };
            this.eventTypes = new DefaultSelect(
              [response, def],
              response.count
            );
          })
        )
    );
  }

  getType() {
    const params = new FilterParams();
    params.addFilter('certificateType', this.global.paperworkArea);
    return lastValueFrom(
      this.indicatorParametersService.getAll(params.getParams()).pipe(
        catchError(() => of(null)),
        map(res => (res ? res.data[0].procedureArea.id : null))
      )
    );
  }

  async initForm() {
    this.originalType = this.global.paperworkArea;
    this.getInitialParameter();
    if (this.global.paperworkArea) {
      this.global.paperworkArea = await this.getType();
    }
    this.getUserLevel().subscribe();
    this.ctrlButtons.sendSise.hide();
    this.ctrlButtons.signOffice.hide();
    this.ctrlButtons.printOffice.hide();
    this.ctrlButtons.notificationDest.hide();

    const { typeEvent, prog, responsible } = this.registerControls;
    if (this.global.paperworkArea == 'RF') {
      this.ctrlButtons.closeProg.hide();

      if (this.global.proceedingNum == null) {
        this.blkCtrl.reopenInd = 1;
      } else {
        this.getIndReopen().subscribe();
      }
      await this.getAreasR();
    } else {
      console.log('muestra 790');
      this.ctrlButtons.closeProg.show();
      // TODO: LLenar los datos con la consulta de "CU_AREA_E"
    }

    typeEvent.setValue(this.global.paperworkArea);
    if (typeEvent.value == 'DS') {
      this.ctrlButtons.convPack.show();
    }

    if (typeEvent.value == 'DN') {
      this.ctrlButtons.convPack.show();
      this.ctrlButtons.deletePack.show();
      this.showPackNumCtrl = true;
    }
    const params = new FilterParams();
    if (this.global.proceedingNum) {
      const indicator = await this.getProceedingType();
      // console.log(indicator.procedureArea.id);
      params.addFilter('typeProceedings', indicator.certificateType);
      params.addFilter('id', this.global.proceedingNum);
      await this.getProceeding(params);
    }

    if (typeEvent.value) {
      this.activeFields();
    }

    if (typeEvent.value == 'RF') {
      prog.setValue('R');
      // TODO: CAMBIAR EL NOMBRE DE LOS ENCABEZADOS
    } else {
      prog.setValue('E');
      // TODO: CAMBIAR EL NOMBRE DE LOS ENCABEZADOS
    }
    this.blkCtrl.cEvent = 0;
    this.blkCtrl.cQuantity = 0;
    this.blkCtrl.cSelAll = 0;

    if (
      this.proceeding.statusProceedings == 'CERRADO' ||
      this.proceeding.statusProceedings == 'CERRADA'
    ) {
      if (typeEvent.value == 'RF') {
        console.log('muestra 834');
        this.ctrlButtons.closeProg.show();
      }
      this.ctrlButtons.closeProg.setText('Abrir Prog.');
    } else if (
      this.proceeding.statusProceedings == 'ABIERTO' ||
      this.proceeding.statusProceedings == 'ABIERTA'
    ) {
      this.ctrlButtons.closeProg.setText('Cerrar Prog.');
    } else if (this.proceeding.statusProceedings == null) {
      this.ctrlButtons.closeProg.setText('Cerrar Prog.');
      if (this.authUser.startsWith('TLP')) {
        responsible.setValue('TLP');
        this.proceeding.responsible = 'TLP';
      } else {
        this.proceeding.responsible = responsible.value;
      }
    }

    if (
      this.proceeding.statusProceedings == 'ABIERTO' ||
      this.proceeding.statusProceedings == 'ABIERTA'
    ) {
      this.global.noClosed = 1;
    } else {
      this.global.noClosed = 0;
    }
  }

  // PUP_ACTIVA_CAMPOS
  activeFields() {
    const { typeEvent } = this.registerControls;
    if (typeEvent.value == 'RF') {
      const FEC_APROBACION_X_ADMON = 'Inicio';
    } else if (typeEvent.value == 'DN') {
      const LOC_TRANSF = 'Dictamen Donación';
      const FEC_APROBACION_X_ADMON = 'Entrega';
    } else if (typeEvent.value == 'DV') {
      const LOC_TRANSF = 'Dictamen Devolución';
    } else if (typeEvent.value == 'CM') {
      const LOC_TRANSF = 'Dictamen Procedencia';
      const FEC_APROBACION_X_ADMON = 'Entrega';
    } else if (typeEvent.value == 'DS') {
      const LOC_TRANSF = 'Dictamen Destrucción';
      const FEC_APROBACION_X_ADMON = 'Entrega';
    }
  }

  async getProceeding(params: FilterParams) {
    return await lastValueFrom(
      this.proceedingDeliveryReceptionService.getAll(params.getParams()).pipe(
        tap(async res => {
          this.proceeding = res.data[0];
          const form = {
            captureDate: new Date(res.data[0].captureDate),
            keysProceedings: res.data[0].keysProceedings,
            responsible: res.data[0].responsible,
          };
          this.form.patchValue(form);
          await this.afterGetProceeding();
          this.getDetail().subscribe();
        })
      )
    );
  }

  async afterGetProceeding() {
    const { typeEvent } = this.registerControls;
    if (typeEvent.value == 'RF') {
      const count = (await this.getExpedientsCount()) ?? 0;
      console.log(count);
      const options = ['CERRADA', 'CERRADO'];
      if (options.find(opt => opt == this.proceeding.statusProceedings)) {
        console.log('muestra 907');
        this.ctrlButtons.closeProg.show();
        this.ctrlButtons.closeProg.label = 'Abrir Prog.';
        if (count > 0) {
          if (this.proceeding.receiveBy != '1') {
            this.ctrlButtons.sendSise.show();
          } else {
            this.ctrlButtons.sendSise.hide();
          }
        } else {
          this.ctrlButtons.sendSise.hide();
        }
      } else {
        this.ctrlButtons.closeProg.label = 'Cerrar Prog.';
        if (count > 0) {
          this.ctrlButtons.closeProg.hide();
        } else {
          if (this.proceeding.statusProceedings) {
            console.log('muestra 925');
            this.ctrlButtons.closeProg.show();
          }
        }
      }
    }
  }

  getDetail() {
    const params = new FilterParams();
    params.addFilter('numberProceedings', this.proceeding.id);
    return this.eventProgrammingService
      .getGoodsIndicators(this.proceeding.id)
      .pipe(
        tap(res => {
          const detail = res.data[0];

          this.afterGetDetail(detail);
          this.detail = res.data.map(detail => {
            const { typeEvent } = this.registerControls;
            let locTrans = '';
            if (typeEvent.value == 'RF') {
              if (this.blkProceeding.txtCrtSus1) {
                locTrans = detail.warehouselocation;
              } else {
                locTrans = detail.transferentcity;
              }
            } else {
              switch (typeEvent.value) {
                case 'DN':
                  locTrans = detail.donationcontractkey;
                  break;
                case 'DV':
                  locTrans = detail.devolutionproceedingkey;
                  break;
                case 'CM':
                  locTrans = detail.dictationkey;
                  break;
                case 'DS':
                  locTrans = detail.destructionproceedingkey;
                  break;
                default:
                  break;
              }
            }
            return { ...detail, locTrans };
          });
        })
      );
  }

  // PA_CALCULA_CANTIDADES
  calculateQuantities() {
    // TODO: DESCOMENTAR CUANDO ARREGLEN LA INCIDENCIA
    // this.programmingGoodService.computeEntities(
    //   this.proceeding.id,
    //   typeEvent.value
    // )
    const { typeEvent } = this.registerControls;
    of(null).subscribe(() => {
      const params = new FilterParams();
      params.addFilter('minutesNumber', this.proceeding.id);
      return this.tmpContProgrammingService
        .computeEntities(params.getParams())
        .pipe(
          tap(response => {
            const count = response.data[0];
            if (count) {
              const {
                amountEstate,
                recordsAmount,
                amountfiles,
                amountOpinions,
              } = count;
              this.blkQuantities.goods = Number(amountEstate);
              this.blkQuantities.registers = Number(recordsAmount);
              this.blkQuantities.expedients = Number(amountfiles);
              this.blkQuantities.dictums = Number(amountOpinions);
            }
          })
        )
        .subscribe();
    });
  }

  // DETALLE_ACTA_ENT_RECEP.POST_QUERY
  afterGetDetail(detail: IGoodIndicator) {
    const { typeEvent } = this.registerControls;
    this.blkCtrl.typeNum = detail.typegood;
    this.blkCtrl.typeNumCant = this.blkCtrl.typeNumCant ?? 0;
    if (typeEvent.value == 'RF' && detail.status == 'CPR') {
      (this.settings.columns as any).status.title = 'VA_CPR';
    }

    if (
      !this.blkProceeding.txtCrtSus1 &&
      detail.inventorysiabi?.split('-').length >= 3
    ) {
      this.blkProceeding.txtCrtSus1 = detail.inventorysiabi.split('-')[0];
      const firstDashIndex = detail.inventorysiabi.indexOf('-');
      const secondDashIndex = detail.inventorysiabi.indexOf(
        '-',
        firstDashIndex + 1
      );

      if (firstDashIndex !== -1 && secondDashIndex !== -1) {
        this.blkProceeding.txtCrtSus2 = detail.inventorysiabi.substring(
          firstDashIndex + 1,
          secondDashIndex
        );
      }

      this.blkProceeding.txtCrtSus2 =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(
          this.blkProceeding.txtCrtSus2.substring(0, 1)
        ) === -1
          ? '%'
          : (this.blkProceeding.txtCrtSus1 = '%');

      if (typeEvent.value == 'RF') {
        this.blkCtrl.txtDirSatLabel = 'Dirección';
        (this.settings.columns as any).locTrans.title = 'Almacén';
        this.blkCtrl.txtDirSat = detail.txt_dirsat;
      }
    }
    this.calculateQuantities();
    // TODO: PEDIR TODOS LOS CAMPOS DEL DETALLE
    // this.blkCtrl.cQuantity = (this.blkCtrl.cQuantity?? 0) + this.
  }

  patchProceedingValue(proceeding: IProceedings) {}

  async getProceedingType() {
    const { typeEvent } = this.registerControls;
    const params = new FilterParams();
    params.addFilter('procedureArea', typeEvent.value);
    return await lastValueFrom(
      this.indicatorParametersService.getAll(params.getParams()).pipe(
        catchError(error => {
          this.alert('error', 'Error', 'No se localizo el tipo de acta');
          return throwError(() => error);
        }),

        map(response => response.data[0])
      )
    );
  }

  async getExpedientsCount() {
    const params = new FilterParams();
    params.addFilter('expedient', this.proceeding.numFile);
    params.addFilter('typeManagement', 2);
    return await lastValueFrom(
      this.procedureManagementService.getAllFiltered(params.getParams()).pipe(
        catchError(() => of({ count: 0 })),
        map(res => res.count)
      )
    );
  }

  onSubmit() {}

  onSubmit2() {}

  search() {}

  errorForm(message?: string) {
    if (message) {
      this.alert('error', 'Error', message);
    }
    // this.router.navigate([HOME_DEFAULT]);
  }

  async notificationBtn() {
    let n_cont;
    let c_mail;
    let l_ban;
    let c_user;
    let v_usuariotlp: number = 0;
    let v_usuarioost: number = 0;

    const user = this.authService.decodeToken().name.toUpperCase();

    v_usuariotlp = user.indexOf('TLP');
    v_usuarioost = user.indexOf('OST');

    const STATUS = ['CERRADO', 'CERRADA'];

    if (
      !STATUS.includes(this.proceeding.statusProceedings) &&
      this.global.paperworkArea == 'RF' &&
      this.proceeding.numFile &&
      v_usuarioost == -1 &&
      v_usuariotlp == -1
    ) {
      const count = await new Promise<number>((resolve, reject) => {
        const filters = new FilterParams();
        filters.addFilter(
          'flierNumber',
          this.proceeding.numFile,
          SearchFilter.EQ
        );
        filters.addFilter('typeManagement', 2, SearchFilter.EQ);

        this.procudeServ.getAllFiltered(filters.getParams()).subscribe({
          next: resp => {
            resolve(resp.count);
          },
          error: () => {
            resolve(0);
          },
        });
      });

      if (count == 0) {
        this.emailInser();
      }
    } else if (v_usuarioost != -1 || v_usuariotlp != -1) {
      this.onLoadToast(
        'info',
        'Usuario TLP y OST, no puede cargar los correos de envió de convocatoria a SISE.'
      );
    }
  }

  async emailInser() {
    let c_mail: string;
    let l_ban: boolean;
    let c_user: string;

    const { user, mail } = await new Promise<any>((resolve, reject) => {
      const user = this.authService.decodeToken().name.toUpperCase();
      const filters = new FilterParams();
      filters.addFilter(
        'user',
        'ZLB11_130' /*this.proceeding.numFile*/,
        SearchFilter.EQ
      );

      this.security.getAllUsersTracker(filters.getParams()).subscribe({
        next: resp => {
          const user = resp.data[0].user;
          const mail = resp.data[0].mail;
          resolve({ user, mail });
        },
        error: () => {
          resolve({ user: '', mail: 'X' });
        },
      });
    });

    c_mail = mail;

    if (c_mail != 'X') {
      l_ban = true;
    }
  }

  async closeProg() {
    let lv_valmotos: string;
    let lv_valmensa: string;
    let lv_pantalla: string = 'FINDICA_0035_1';
    let v_count: number = 0;
    let c_str: string;
    let c_mensaje: string;
    let n_folio_universal: string;
    let n_cont: number = 0;
    let e_execpproc: any;

    const filter = new FilterParams();
    const user = this.authService.decodeToken().username;
    filter.addFilter('valUser', user, SearchFilter.EQ);
    filter.addFilter('valMinutesNumber', this.proceeding.id, SearchFilter.EQ);

    const c_datval = new Promise<ITmpProgValidation[]>((resolve, reject) => {
      this.progammingServ.getTmpProgValidation(filter.getParams()).subscribe({
        next: resp => {
          resolve(resp.data);
        },
        error: () => {
          resolve([]);
        },
      });
    });

    c_mensaje = null;

    //no se tiene modelo del bloque BLK_CANT
    if (0 <= 0) {
      this.onLoadToast('info', 'No se tienen bienes ingresados');
    }

    if (this.global.paperworkArea == 'RF') {
      const count = await new Promise<number>((resolve, reject) => {
        const filters = new FilterParams();
        filters.addFilter(
          'flierNumber',
          this.proceeding.numFile,
          SearchFilter.EQ
        );
        filters.addFilter('typeManagement', 2, SearchFilter.EQ);

        this.procudeServ.getAllFiltered(filters.getParams()).subscribe({
          next: resp => {
            resolve(resp.count);
          },
          error: () => {
            resolve(0);
          },
        });
      });
      n_cont = count;
    }

    const STATUS = ['CERRADA', 'CERRADO'];

    if (!STATUS.includes(this.proceeding.statusProceedings)) {
      if (this.proceeding.typeProceedings == 'EVENTREC') {
      }
    }
  }
}
