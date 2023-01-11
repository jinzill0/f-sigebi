import { Location } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { forkJoin } from 'rxjs';
import { ModelForm } from 'src/app/core/interfaces/model-form';
import { BasePage } from 'src/app/core/shared/base-page';
import Swal from 'sweetalert2';
import { IRequest } from '../../../../core/models/requests/request.model';
import { AuthorityService } from '../../../../core/services/catalogs/Authority.service';
import { RegionalDelegationService } from '../../../../core/services/catalogs/regional-delegation.service';
import { StateOfRepublicService } from '../../../../core/services/catalogs/state-of-republic.service';
import { StationService } from '../../../../core/services/catalogs/station.service';
import { TransferenteService } from '../../../../core/services/catalogs/transferente.service';
import { RequestService } from '../../../../core/services/requests/request.service';
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
  registRequestForm: ModelForm<IRequest>;
  edit: boolean = false;
  title: string = 'title';
  parameter: any;
  object: any = '';
  request: any = {};
  btnTitle: string = '';
  btnSaveTitle: string = '';
  saveClarifiObject: boolean = false;
  bsValue = new Date();

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

  location = inject(Location);
  requestService = inject(RequestService);
  stateOfRepublicService = inject(StateOfRepublicService);
  transferentService = inject(TransferenteService);
  stationService = inject(StationService);
  delegationService = inject(RegionalDelegationService);
  authorityService = inject(AuthorityService);

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
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    let path: any = window.location.pathname.split('/');
    this.setView(path[4]);
    this.intiTabs();
    this.prepareForm();

    const id = this.route.snapshot.paramMap.get('id');

    this.requestService.getById(id).subscribe((data: any) => {
      let request = data.data;
      request.receptionDate = this.bsValue;
      this.object = request as IRequest;

      this.registRequestForm.patchValue(request);
      this.getData(request);
    });
  }

  prepareForm() {
    this.registRequestForm = this.fb.group({
      applicationDate: [null],
      paperNumber: [null],
      regionalDelegationId: [null],
      keyStateOfRepublic: [null],
      transferenceId: [null],
      stationId: [null],
      authorityId: [null],
      typeUser: [''],
      receiUser: [''],
      //noExpedient: [null],
      //typeExpedient: [null],
      id: [null],
      urgentPriority: [null],
      originInfo: [null],
      receptionDate: [null],
      paperDate: [null],
      typeRecord: [null],
      publicMinistry: [null],

      court: [null],
      crime: [null],
      receiptRoute: [null],
      destinationManagement: [null],
      indicatedTaxpayer: [null],
      affair: [null],
      transferEntNotes: [null],
      observations: [null],
    });
  }

  getData(request: any) {
    debugger;
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
        debugger;
        let state = _state as any;
        let transferent = _transferent as any;
        let station = _station as any;
        let delegation = _delegation as any;
        let authority = _authority as any;

        this.stateOfRepublicName = state.data.descCondition;
        this.transferentName = transferent.data.nameTransferent;
        this.stationName = station.data.stationName;
        this.delegationName = delegation.data.description;
        this.authorityName = authority.data.authorityName;
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

  confirm() {
    console.log(this.registRequestForm.getRawValue());
    this.msgAvertanceModal(
      '',
      'Asegurse de tener guardado los formularios antes de turnar la solicitud!',
      'Confirmación',
      ''
    );
  }

  saveClarification(): void {
    this.saveClarifiObject = true;
  }

  close() {
    this.registRequestForm.reset();
    this.router.navigate(['pages/request/list']);
  }

  signDictum() {
    //habrir modal generar dictamen
    this.openModal(GenerateDictumComponent, '', 'approval-request');
  }

  msgAvertanceModal(
    btnTitle: string,
    message: string,
    title: string,
    typeMsg: any
  ) {
    this.alertQuestion(typeMsg, title, message, btnTitle).then(question => {
      if (question.isConfirmed) {
        //Ejecutar el servicio
        this.msgSaveModal(
          this.btnTitle,
          '¿Deseas turnar la solicitud con Folio:....?',
          'Confirmación',
          undefined
        );
      }
    });
  }

  msgSaveModal(btnTitle: string, message: string, title: string, typeMsg: any) {
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
        console.log('Guardar solicitud');
      }
    });
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
