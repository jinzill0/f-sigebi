import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { forkJoin } from 'rxjs';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { ModelForm } from 'src/app/core/interfaces/model-form';
import { FractionService } from 'src/app/core/services/catalogs/fraction.service';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { BasePage } from 'src/app/core/shared/base-page';
import {
  EMAIL_PATTERN,
  PHONE_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';
import Swal from 'sweetalert2';
import { IRequest } from '../../../../core/models/requests/request.model';
import { AuthorityService } from '../../../../core/services/catalogs/authority.service';
import { RegionalDelegationService } from '../../../../core/services/catalogs/regional-delegation.service';
import { StateOfRepublicService } from '../../../../core/services/catalogs/state-of-republic.service';
import { StationService } from '../../../../core/services/catalogs/station.service';
import { TransferenteService } from '../../../../core/services/catalogs/transferente.service';
import { RequestService } from '../../../../core/services/requests/request.service';
import { RequestHelperService } from '../../request-helper-services/request-helper.service';
import { GenerateDictumComponent } from '../tabs/approval-requests-components/generate-dictum/generate-dictum.component';

@Component({
  selector: 'app-registration-of-requests',
  templateUrl: './registration-of-requests.component.html',
  styleUrls: ['./registration-of-requests.component.scss'],
})
export class RegistrationOfRequestsComponent
  extends BasePage
  implements OnInit
{
  @ViewChild('staticTabs', { static: false }) staticTabs?: TabsetComponent;
  registRequestForm: ModelForm<IRequest>;
  edit: boolean = false;
  title: string = 'Registro de solicitud con folio: ';
  parameter: any;
  object: any = '';
  requestData: any;
  btnTitle: string = '';
  btnSaveTitle: string = '';
  saveClarifiObject: boolean = false;
  bsValue = new Date();
  isExpedient: boolean = false;

  //tabs
  tab1: string = '';
  tab2: string = '';
  tab3: string = '';
  tab4: string = '';
  tab5: string = '';
  tab6: string = '';

  //registro de solicitudos o bienes
  requestRegistration: boolean = false;
  //verificacion de cumplimientos tab
  complianceVerifi: boolean = false; //ok
  //clasificacion de bienes
  classifyAssets: boolean = false;
  //validar destino del bien(documento)
  validateDocument: boolean = false;
  //notificar aclaraciones o improcedencias
  notifyClarifiOrImpropriety: boolean = false;
  //aprovacion del proceso
  approvalProcess: boolean = false;

  stateOfRepublicName: string = '';
  transferentName: string = '';
  stationName: string = '';
  delegationName: string = '';
  authorityName: string = '';

  constructor(
    public fb: FormBuilder,
    public modalRef: BsModalRef,
    public modalService: BsModalService,
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    private requestService: RequestService,
    private requestHelperService: RequestHelperService,
    private stateOfRepublicService: StateOfRepublicService,
    private transferentService: TransferenteService,
    private stationService: StationService,
    private delegationService: RegionalDelegationService,
    private authorityService: AuthorityService,
    private goodService: GoodService,
    private fractionService: FractionService
  ) {
    super();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.title = 'Registro de solicitud con folio: ' + id;
    let path: any = window.location.pathname.split('/');
    this.setView(path[4]);
    this.intiTabs();
    this.prepareForm();
    this.getRequest(id);
    this.associateExpedientListener();
  }

  //cambia el estado del tab en caso de que se asocie un expediente a la solicitud
  associateExpedientListener() {
    this.requestHelperService.currentExpedient.subscribe({
      next: resp => {
        if (resp === true) {
          this.isExpedient = resp;
          this.staticTabs.tabs[0].active = true;
        }
      },
    });
  }

  prepareForm() {
    this.registRequestForm = this.fb.group({
      applicationDate: [null],
      paperNumber: [null, [Validators.required]],
      regionalDelegationId: [null],
      keyStateOfRepublic: [null],
      transferenceId: [null],
      stationId: [null],
      authorityId: [null],
      //typeUser: [''],
      //receiUser: [''],
      id: [null],
      urgentPriority: [null],
      priorityDate: [null],
      originInfo: [null],
      receptionDate: [{ value: null, disabled: true }],
      paperDate: [null, Validators.required],
      typeRecord: [null],
      publicMinistry: [null, [Validators.pattern(STRING_PATTERN)]],
      nameOfOwner: [null, [Validators.pattern(STRING_PATTERN)]], //nombre remitente
      holderCharge: [null, [Validators.pattern(STRING_PATTERN)]], //cargo remitente
      phoneOfOwner: [null, Validators.pattern(PHONE_PATTERN)], //telefono remitente
      emailOfOwner: [null, [Validators.pattern(EMAIL_PATTERN)]], //email remitente
      court: [null, [Validators.pattern(STRING_PATTERN)]],
      crime: [null, [Validators.pattern(STRING_PATTERN)]],
      receiptRoute: [null],
      destinationManagement: [null, [Validators.pattern(STRING_PATTERN)]],
      indicatedTaxpayer: [null, [Validators.pattern(STRING_PATTERN)]],
      affair: [null],
      transferEntNotes: [null, [Validators.pattern(STRING_PATTERN)]],
      observations: [null, [Validators.pattern(STRING_PATTERN)]],
      transferenceFile: [null],
      previousInquiry: [null],
      trialType: [null],
      circumstantialRecord: [null, [Validators.pattern(STRING_PATTERN)]],
      lawsuit: [null, [Validators.pattern(STRING_PATTERN)]],
      tocaPenal: [null, [Validators.pattern(STRING_PATTERN)]],
    });
  }

  getRequest(id: any) {
    this.requestService.getById(id).subscribe((data: any) => {
      let request = data;
      //verifica si la solicitud tiene expediente si no tiene no muestra el tab asociar expediente
      this.isExpedient = request.recordId ? true : false;
      request.receptionDate = new Date().toISOString();
      this.object = request as IRequest;
      this.requestData = request as IRequest;
      this.registRequestForm.patchValue(request);
      this.getData(request);
    });
  }

  getData(request: any) {
    const stateOfRepublicService = this.stateOfRepublicService.getById(
      request.keyStateOfRepublic
    );
    const transferentService = this.transferentService.getById(
      request.transferenceId
    );
    const stationService = this.stationService.getById(request.stationId);
    const delegationService = this.delegationService.getById(
      request.regionalDelegationId
    );
    let ids = {
      idAuthority: Number(request.authorityId),
      idTransferer: Number(request.transferenceId),
      idStation: Number(request.stationId),
    };
    const authorityervice = this.authorityService.postByIds(ids);

    forkJoin([
      stateOfRepublicService,
      transferentService,
      stationService,
      delegationService,
      authorityervice,
    ]).subscribe(
      ([_state, _transferent, _station, _delegation, _authority]) => {
        let state = _state as any;
        let transferent = _transferent as any;
        let station = _station as any;
        let delegation = _delegation as any;
        let authority = _authority as any;

        this.stateOfRepublicName = state.descCondition;
        this.transferentName = transferent.nameTransferent;
        this.stationName = station.stationName;
        this.delegationName = delegation.description;
        this.authorityName = authority.authorityName;
      },
      error => {
        console.log(error);
      }
    );
  }

  setView(path: string): void {
    switch (path) {
      case 'registration-request':
        this.requestRegistration = true;
        break;
      case 'verify-compliance':
        this.complianceVerifi = true;
        break;
      case 'classify-assets':
        this.classifyAssets = true;
        break;
      case 'validate-document':
        this.validateDocument = true;
        break;
      case 'notify-clarification-inadmissibility':
        this.notifyClarifiOrImpropriety = true;
        break;
      case 'process-approval':
        this.approvalProcess = true;
        break;
      default:
        this.requestRegistration = true;
        break;
    }
  }

  intiTabs(): void {
    if (this.requestRegistration == true) {
      this.tab1 = 'Registro de Solicitud';
      this.tab2 = 'Bienes';
      this.tab3 = 'Domicilio de la Transferente';
      this.tab4 = 'Asociar Expediente';
      this.tab5 = 'Expediente';
      this.btnTitle = 'Verificar Cumplimiento';
    } else if (this.complianceVerifi == true) {
      this.tab1 = 'Detalle Solicitud';
      this.tab2 = 'Verificar Cumplimiento';
      this.tab3 = 'Expediente';
      this.btnTitle = 'Clasificar Bien';
    } else if (this.classifyAssets == true) {
      this.tab1 = 'Detalle Solicitud';
      this.tab2 = 'Clasificación de Bienes';
      this.tab3 = 'Expediente';
      this.btnTitle = 'Destino Documental';
    } else if (this.validateDocument) {
      this.tab1 = 'Detalle Solicitud';
      this.tab2 = 'Aclaraciones';
      this.tab3 = 'Identifica Destino Documental';
      this.btnTitle = 'Solicitar Aprobación';
    } else if (this.notifyClarifiOrImpropriety) {
      this.tab1 = 'Detalle de la Solicitud';
      this.tab2 = 'Bienes';
      this.tab3 = 'Expediente';
      this.btnTitle = 'Terminar';
      this.btnSaveTitle = 'Guardar';
    } else if (this.approvalProcess) {
      this.tab1 = 'Detalle de la Solicitud';
      this.tab2 = 'Bienes';
      this.tab3 = 'Domicilio de la Transferente';
      this.tab4 = 'Verificación del Cumplimiento';
      this.tab5 = 'Expediente';
      this.btnTitle = 'Aprovar';
      this.btnSaveTitle = '';
    }
  }

  getGoodQuantity(requestId: number) {
    return new Promise((resolve, reject) => {
      const params = new ListParams();
      params['filter.requestId'] = `$eq:${requestId}`;
      this.goodService.getAll(params).subscribe({
        next: resp => {
          resolve(resp);
        },
      });
    });
  }

  getFractionCode(fractionId: number) {
    return new Promise((resolve, reject) => {
      this.fractionService.getById(fractionId).subscribe({
        next: resp => {
          debugger;
          if (resp.fractionCode) {
            resolve(resp.fractionCode);
          } else {
            resolve('');
          }
        },
      });
    });
  }

  finish() {
    this.requestData.requestStatus = 'FINALIZADA';
    const typeCommit = 'finish';
    this.msgSaveModal(
      'Finalizar Solicitud',
      'Asegurse de guardar toda la información antes de Finalizar la solicitud!',
      'Confirmación',
      undefined,
      typeCommit
    );
  }

  finishMethod() {
    this.requestService
      .update(this.requestData.id, this.requestData)
      .subscribe({
        next: resp => {
          console.log(resp);
          if (resp.statusCode !== null) {
            this.message('error', 'Error', 'Ocurrio un error al guardar');
          }
          if (resp.id !== null) {
            this.message(
              'success',
              'Solicitud Guardada',
              'Se guardo la solicitud correctamente'
            );
          }
        },
      });
  }

  confirm() {
    console.log(this.registRequestForm.getRawValue());
    const typeCommit = 'confirm-request';
    this.msgAvertanceModal(
      '',
      'Asegurse de tener guardado los formularios antes de turnar la solicitud!',
      'Confirmación',
      undefined,
      typeCommit
    );
  }

  async confirmMethod() {
    debugger;
    const idTrandference = Number(this.requestData.transferenceId);
    let validoOk = false;

    const previousInquiry = this.requestData.previousInquiry;
    const circumstantialRecord = this.requestData.circumstantialRecord;
    const lawsuit = this.requestData.lawsuit;
    const protectNumber = this.requestData.protectNumber;
    const tocaPenal = this.requestData.tocaPenal;
    const paperNumber = this.requestData.paperNumber; //no oficio
    const transferenceFile = this.requestData.transferenceFile; //transferente expediente //pregunar si es ese campo o idTransferent
    const typeRecord = this.requestData.typeRecord; //tipo expediente
    const paperDate = this.requestData.paperDate; // fecha oficio
    const trialType = this.requestData.trialType;
    const urgentPriority = this.requestData.urgentPriority;
    const priorityDate = this.requestData.priorityDate;

    //Todo: verificar y obtener documentos de la solicitud

    /*if (this.requestData.recordId === null) {
      this.message(
        'error',
        'Error',
        'La solicitud no tiene Expediente asociado'
      );
    }*/

    //Si lista de documentos es < 1 -> Se debe asociar un archivo a la solicitud

    if (previousInquiry === 'Y' && priorityDate === null) {
      this.message(
        'error',
        'Error',
        'Se marco la solicitud como urgente, se debe tener una fecha prioridad'
      );
    }
    if (idTrandference === 1) {
      if (paperNumber === '' || paperDate == null) {
        this.message(
          'error',
          'Error',
          'Para la transferente FGR los campos de No. Oficio y Fecha de Oficio no deben de ser nulos'
        );
      } else if (circumstantialRecord === '' && previousInquiry === '') {
        this.message(
          'error',
          'Error',
          'Para la transferente FGR se debe tener al menos Acta Circunstancial o Averiguación Previa'
        );
      } else {
        validoOk = true;
      }
    }

    if (idTrandference === 3) {
      if (paperNumber === '' || paperDate == null) {
        this.message(
          'error',
          'Error',
          'Para la transferente PJF los campos de No. Oficio y Fecha de Oficio no deben de ser nulos'
        );
      } else if (lawsuit === '' && protectNumber === '' && tocaPenal === '') {
        this.message(
          'error',
          'Error',
          'Para la trasnferente PJF se debe tener al menos Causa Penal o No. Amparo o Toca Penal'
        );
      } else {
        validoOk = true;
      }
    }

    if (
      idTrandference === 120 ||
      idTrandference === 536 ||
      idTrandference === 752
    ) {
      if (
        // transferenceFile === '' || //consultar este campo
        typeRecord === '' ||
        paperNumber === '' ||
        paperDate == null
      ) {
        this.message(
          'error',
          'Error',
          'Para la transferente SAT los campos Expediente Transferente, Tipo Expediente, No. Oficio y Fecha Oficio no pueden ser nulos'
        );
      } else {
        validoOk = true;
      }
    }

    if (
      !(idTrandference === 1) &&
      !(idTrandference === 3) &&
      !(idTrandference === 120) &&
      !(idTrandference === 536) &&
      !(idTrandference === 752)
    ) {
      if (paperNumber === '' || paperDate == null) {
        this.message(
          'error',
          'Error',
          'Para transferentes no obligadas los campos No. Oficio y Fecha Oficio no deben de ser nulos'
        );
      } else {
        validoOk = true;
      }
    }

    let goods: any = null;

    if (validoOk === true) {
      goods = await this.getGoodQuantity(Number(this.requestData.id));
      if (goods.count < 1) {
        this.message(
          'error',
          'Error',
          'La solicitud no cuenta con bienes a transferir'
        );
      } else {
        //validar bienes
        let sinDireccion: boolean = false;
        let sinTipoRelevante: boolean = false;
        let sinCantidad: boolean = false;
        let sinDestinoT: boolean = false;
        let sinUnidadM: boolean = false;
        let sinDescripcionT: boolean = false;
        let codigoFraccion: any = null;
        let faltaClasificacion: boolean = false;
        // variables para validaci�n de atributos por tipo de bien LIRH 06/02/2021
        const tipoRelVehiculo: boolean = false;
        const tipoRelAeronave: boolean = false;
        const tipoRelEmbarca: boolean = false;
        const tipoRelInmueble: boolean = false;
        const tipoRelJoya: boolean = false;
        const existBienInm: boolean = false;

        for (let i = 0; i < goods.data.length; i++) {
          const good = goods.data[i];
          if (good.addressId == null && good.idGoodProperty == null) {
            sinDireccion = true;
            break;
          } else if (good.goodTypeId == null) {
            sinTipoRelevante = true;
            break;
          } else if (
            good.quantity == null ||
            (good.quantity != null && Number.parseInt(good.quantity) < 1)
          ) {
            sinCantidad = true;
            break;
          } else if (good.transferentDestiny == null) {
            sinDestinoT = true;
            break;
          } else if (good.ligieUnit == null) {
            sinUnidadM = true;
            break;
          } else if (good.goodDescription == null) {
            sinDescripcionT = true;
            break;
          }

          // Se valida si la clasificacion tenga 8 caracteres
          if (good.fractionId !== null) {
            const fractionCode: any = await this.getFractionCode(
              good.fractionId
            );
            if (fractionCode == null || fractionCode.length != 8) {
              faltaClasificacion = true;
              break;
            }
          } else {
            faltaClasificacion = true;
            break;
          }
        }
      }
    }
  }

  saveClarification(): void {
    this.saveClarifiObject = true;
  }

  close() {
    this.registRequestForm.reset();
    this.router.navigate(['pages/request/list']);
  }

  signDictum() {
    this.openModal(GenerateDictumComponent, '', 'approval-request');
  }

  msgAvertanceModal(
    btnTitle: string,
    message: string,
    title: string,
    typeMsg: any,
    typeCommit: string
  ) {
    this.alertQuestion(typeMsg, title, message, btnTitle).then(question => {
      if (question.isConfirmed) {
        //Ejecutar el servicio
        this.msgSaveModal(
          this.btnTitle,
          '¿Deseas turnar la solicitud con Folio:....?',
          'Confirmación',
          undefined,
          typeCommit
        );
      }
    });
  }

  msgSaveModal(
    btnTitle: string,
    message: string,
    title: string,
    typeMsg: any,
    typeCommit?: string
  ) {
    Swal.fire({
      title: title,
      text: message,
      icon: typeMsg,
      width: 450,
      showCancelButton: true,
      confirmButtonColor: '#9D2449',
      cancelButtonColor: '#b38e5d',
      confirmButtonText: btnTitle,
    }).then(result => {
      if (result.isConfirmed) {
        if (typeCommit === 'finish') {
          this.finishMethod();
        }
        if (typeCommit === 'confirm-request') {
          this.confirmMethod();
        }
      }
    });
  }

  message(header: any, title: string, body: string) {
    this.onLoadToast(header, title, body);
  }

  openModal(component: any, data?: any, typeAnnex?: String): void {
    let config: ModalOptions = {
      initialState: {
        data: data,
        typeAnnex: typeAnnex,
        callback: (next: boolean) => {
          //if (next){ this.getData();}
        },
      },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(component, config);

    this.modalRef.content.event.subscribe((res: any) => {
      // cargarlos en el formulario
      console.log(res);
    });
  }
}
