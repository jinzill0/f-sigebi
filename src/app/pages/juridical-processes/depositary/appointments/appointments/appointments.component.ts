/** BASE IMPORT */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';
/** LIBRERÍAS EXTERNAS IMPORTS */
import {
  FilterParams,
  ListParams,
  SearchFilter,
} from 'src/app/common/repository/interfaces/list-params';
import { Example } from 'src/app/core/models/catalogs/example';

/** SERVICE IMPORTS */
import { ExampleService } from 'src/app/core/services/catalogs/example.service';

/** ROUTING MODULE */

/** COMPONENTS IMPORTS */
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject } from 'rxjs';
import { IDescriptionByNoGoodBody } from 'src/app/core/models/good/good.model';
import { IAppointmentDepositary } from 'src/app/core/models/ms-depositary/ms-depositary.interface';
import { IGood } from 'src/app/core/models/ms-good/good';
import {
  CURP_PATTERN,
  NUM_POSITIVE,
  PHONE_PATTERN,
  RFC_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { AppointmentsJuridicalReportComponent } from '../appointments-juridical-report/appointments-juridical-report.component';
import { AppointmentsRelationsPaysComponent } from '../appointments-relations-pays/appointments-relations-pays.component';
import { AppointmentsService } from '../services/appointments.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent
  extends BasePage
  implements OnInit, OnDestroy
{
  items = new DefaultSelect<Example>();
  params = new BehaviorSubject<FilterParams>(new FilterParams());
  public form: FormGroup;
  formScan: FormGroup;
  public noBienReadOnly: number = null;
  public checked = false;
  globalVars: any = {
    noExiste: 0,
    depositaria: '',
    no_dep: '',
    folescaneo: '',
    procgenimg: null,
    folsoldigt: null,
    folescaneo2: null,
  };
  public good: IGood;
  noBien: number = null;
  depositaryAppointment: IAppointmentDepositary;
  // Loadings
  loadingGood: boolean = false;
  loadingAppointment: boolean = false;
  showScanForm: boolean = false;
  // Selects
  delegations = new DefaultSelect();
  delegationSelectValue: string = '';
  locality = new DefaultSelect();
  localitySelectValue: string = '';
  state = new DefaultSelect();
  stateSelectValue: string = '';
  postalCode = new DefaultSelect();
  postalCodeSelectValue: string = '';
  dateFormat: string = 'dd/MM/yyyy';

  constructor(
    private fb: FormBuilder,
    private datePipe: DatePipe,
    private exampleService: ExampleService,
    private appointmentsService: AppointmentsService,
    private modalService: BsModalService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.showScanForm = true;
    console.log(this.showScanForm);

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      if (!isNaN(Number(id))) {
        this.noBienReadOnly = Number(id);
        this.form.get('noBien').setValue(this.noBienReadOnly);
        this.validGoodNumberInDepositaryAppointment();
      } else {
        this.alert(
          'warning',
          'Número de Bien',
          'El número de Bien ingresado como parámetro no es un número'
        );
      }
    }
    // this.validGoodNumberInDepositaryAppointment(); // Buscar Bien
  }
  private prepareForm() {
    this.form = this.fb.group({
      noBien: [
        { value: '', disabled: false },
        [
          Validators.required,
          Validators.maxLength(11),
          Validators.pattern(NUM_POSITIVE),
        ],
      ], //*
      descriptionGood: [
        { value: '', disabled: true },
        [Validators.maxLength(1250), Validators.pattern(STRING_PATTERN)],
      ], //*
      noExpedient: [
        { value: '', disabled: true },
        [Validators.maxLength(30), Validators.pattern(NUM_POSITIVE)],
      ], //*
      averiguacionPrevia: [
        { value: '', disabled: true },
        [Validators.maxLength(200), Validators.pattern(STRING_PATTERN)],
      ], //*
      causaPenal: [
        { value: '', disabled: true },
        [Validators.maxLength(40), Validators.pattern(STRING_PATTERN)],
      ], //*

      fechaAcuerdoAsegurado: [
        { value: '', disabled: true },
        [Validators.maxLength(11)],
      ], //* ACUERDO ASEGURADO
      fechaRecepcion: [
        { value: '', disabled: true },
        [Validators.maxLength(11)],
      ], //* Recepcion SERA
      estatusBien: [
        { value: '', disabled: true },
        [Validators.maxLength(500), Validators.pattern(STRING_PATTERN)],
      ], //*
      fechaDecomiso: [
        { value: '', disabled: true },
        [Validators.maxLength(11)],
      ], //* DECOMISO

      tipoNombramiento: [
        { value: 'D', disabled: true },
        [Validators.maxLength(1), Validators.pattern(STRING_PATTERN)],
      ], //*
      ///*"Administrador, Depositaría, Interventor, Comodatarío,Bien en uso del SAE"
      tipoDepositaria: [
        { value: '', disabled: true },
        [Validators.maxLength(40), Validators.pattern(STRING_PATTERN)],
      ], //*
      estatus: [
        { value: 'P', disabled: true },
        [Validators.maxLength(1), Validators.pattern(STRING_PATTERN)],
      ], //* Provisional, Definitiva
      representanteSAE: [
        { value: '', disabled: true },
        [Validators.maxLength(100), Validators.pattern(STRING_PATTERN)],
      ], //*
      nombre: [
        { value: '', disabled: true },
        [Validators.pattern(STRING_PATTERN)],
      ], //*
      bienesMenaje: { value: '', disabled: true }, //* Sin Menaje, Con Menaje

      depositaria: [
        { value: '', disabled: true },
        [Validators.maxLength(40), Validators.pattern(STRING_PATTERN)],
      ], //*
      representante: [
        { value: '', disabled: true },
        [Validators.maxLength(120), Validators.pattern(STRING_PATTERN)],
      ], //*

      calle: [
        { value: '', disabled: true },
        [Validators.maxLength(200), Validators.pattern(STRING_PATTERN)],
      ], //*
      noExterno: [
        { value: '', disabled: true },
        [Validators.maxLength(10), Validators.pattern(STRING_PATTERN)],
      ], //*
      noInterno: [
        { value: '', disabled: true },
        [Validators.maxLength(10), Validators.pattern(STRING_PATTERN)],
      ], //*
      colonia: [
        { value: '', disabled: true },
        [Validators.maxLength(100), Validators.pattern(STRING_PATTERN)],
      ], //*
      delegacionMunicipio: [
        { value: '', disabled: true },
        [Validators.maxLength(60), Validators.pattern(STRING_PATTERN)],
      ], //*
      codigoPostal: [
        { value: '', disabled: true },
        [Validators.maxLength(6), Validators.pattern(NUM_POSITIVE)],
      ], //*
      entidadFederativa: [
        { value: '', disabled: true },
        [Validators.maxLength(45), Validators.pattern(STRING_PATTERN)],
      ], //*
      telefono: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(PHONE_PATTERN)],
      ], //*
      rfc: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(RFC_PATTERN)],
      ], //*
      curp: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(CURP_PATTERN)],
      ], //*

      tipoPersona: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(STRING_PATTERN)],
      ], //* TIPO PERSONA
      tipoPersona2: [
        { value: '', disabled: true },
        [Validators.maxLength(30), Validators.pattern(STRING_PATTERN)],
      ], //* TIPO RESPONSABLE
      giro: [
        { value: '', disabled: true },
        [Validators.maxLength(45), Validators.pattern(STRING_PATTERN)],
      ],
      referencia: [
        { value: '', disabled: true },
        [Validators.maxLength(35), Validators.pattern(STRING_PATTERN)],
      ],

      remocion: [
        { value: 'N', disabled: true },
        [Validators.maxLength(1), Validators.pattern(STRING_PATTERN)],
      ],
      fecha: [{ value: '', disabled: true }, [Validators.maxLength(11)]],
      noOficio: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(STRING_PATTERN)],
      ],

      // Acuerdo Junta de Gobierno
      fechaAcuerdo: [{ value: '', disabled: true }, [Validators.maxLength(11)]],
      noAcuerdo: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(STRING_PATTERN)],
      ],

      contraprestacion: [
        { value: '0.00', disabled: true },
        [Validators.maxLength(17), Validators.pattern(STRING_PATTERN)],
      ],
      honorarios: [
        { value: '', disabled: true },
        [Validators.maxLength(17), Validators.pattern(STRING_PATTERN)],
      ],
      iva: [
        { value: '', disabled: true },
        [Validators.maxLength(5), Validators.pattern(STRING_PATTERN)],
      ],
      noNombramiento: [
        { value: '', disabled: true },
        [Validators.maxLength(60), Validators.pattern(STRING_PATTERN)],
      ], // CLAVE CONTRATO
      fechaInicio: [
        { value: '', disabled: true },
        ,
        [Validators.maxLength(11)],
      ],

      anexo: [
        { value: '', disabled: true },
        [Validators.maxLength(20), Validators.pattern(STRING_PATTERN)],
      ],
      observaciones: [
        { value: '', disabled: true },
        [Validators.maxLength(1000), Validators.pattern(STRING_PATTERN)],
      ],

      // folioRemocion: [
      //   { value: '', disabled: true },
      //   [Validators.maxLength(15), Validators.pattern(NUM_POSITIVE)],
      // ],
      // folioActaDepositaria: [
      //   { value: '', disabled: true },
      //   [Validators.maxLength(15), Validators.pattern(NUM_POSITIVE)],
      // ],
    });
    this.formScan = this.fb.group({
      scanningFoli: [
        { value: '', disabled: false },
        [Validators.pattern(NUM_POSITIVE), Validators.maxLength(15)],
      ],
      returnFoli: [
        { value: '', disabled: false },
        [Validators.pattern(NUM_POSITIVE), Validators.maxLength(15)],
      ],
    });
  }

  toggleRemocion(checked: any) {
    this.checked = checked;
  }

  mostrarInfo(): any {
    console.log(this.form.value);
  }

  btnBienes() {
    console.log('Bienes');
  }

  btnCatalogoDepositarias() {
    console.log('Depositarias');
  }

  btnPaysDetails() {
    console.log('Detalle Pagos');
    this.openModalPaysDetails({});
  }

  openModalPaysDetails(context?: Partial<AppointmentsRelationsPaysComponent>) {
    const modalRef = this.modalService.show(
      AppointmentsRelationsPaysComponent,
      {
        initialState: context,
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
      }
    );
  }

  btnJuridicalReport() {
    console.log('Reportes Juridicos');
    this.openModalJuridicalReport({});
  }

  openModalJuridicalReport(
    context?: Partial<AppointmentsJuridicalReportComponent>
  ) {
    const modalRef = this.modalService.show(
      AppointmentsJuridicalReportComponent,
      {
        initialState: context,
        class: 'modal-lg modal-dialog-centered',
        ignoreBackdropClick: true,
      }
    );
  }

  btnReportesAdministrativos() {
    console.log('Reportes Administrativos');
  }

  btnMasivIncomePays() {
    console.log('Ingresos Masivos Pagos');
    // Llama pantalla FMASINSPAGDEPOSITARIAS
    this.router.navigate(
      ['/pages/juridical/depositary/bulk-loading-depository-cargo'],
      {
        // queryParams: {
        //   origin: this.origin3,
        //   P_GEST_OK: this.paramsScreen.P_GEST_OK,
        //   P_NO_TRAMITE: this.paramsScreen.P_NO_TRAMITE,
        // },
      }
    );
  }

  btnConceptsPaysCatalogs() {
    console.log('Conceptos de Pagos');
  }

  btnDepositaryCatalog() {
    console.log('Cátalogo Depositarias');
  }

  btnFolioEscaneoSolicitud() {
    // IMG_SOLICITUD
    console.log('Escaneo Solicitud');
  }

  btnReplicarFolio() {
    console.log('Replicar Folio');
  }

  btnImprimirSolicitudEscaneo() {
    console.log('Solicitud Escaneo');
  }

  btnConsultarImagenesEscaneadas() {
    console.log('Consultar Imágenes Escaneadas');
  }

  getFromSelect(params: ListParams) {
    this.exampleService.getAll(params).subscribe(data => {
      this.items = new DefaultSelect(data.data, data.count);
    });
  }

  changeMenaje() {
    if (this.form.get('bienesMenaje').value == '1') {
    }
  }

  async validFielddGoodNumber() {
    if (this.globalVars.noExiste != 1) {
      this.noBien = this.form.get('noBien').value;
      const params: ListParams = {
        page: this.params.getValue().page,
        limit: 10,
      };
      this.params.getValue().getParams();
      params['filter.goodId'] = this.noBien;
      params['filter.status'] = 'ADM';
      await this.appointmentsService.getGoodByParams(params).subscribe({
        next: res => {
          console.log(res);
          if (res.data.length > 0) {
            this.form.get('descriptionGood').setValue(res.data[0].description);
            this.form.get('noExpedient').setValue(res.data[0].fileNumber);
            this.form
              .get('fechaAcuerdoAsegurado')
              .setValue(res.data[0].agreementDate);
            this.form.updateValueAndValidity();
            this.getStatusGoodByStatus(res.data[0].id);
            this.getDataExpedientByNoExpedient(res.data[0].fileNumber);
          } else {
            this.alert(
              'warning',
              'Verificar el Número de Bien',
              'El No. de Bien ' +
                this.noBien +
                ' no existe ó el estatus para depositarias no es el adecuado.'
            );
          }
        },
        error: err => {
          console.log(err);
          this.alert(
            'warning',
            'Verificar el Número de Bien',
            'El No. de Bien ' +
              this.noBien +
              ' no existe ó el estatus para depositarias no es el adecuado.'
          );
        },
      });
    } else {
      this.alert('warning', 'Número de Bien', 'Ingresa un número de Bien.');
    }
  }

  async getStatusGoodByStatus(noGood: number) {
    await this.appointmentsService
      .getStatusAndDescriptionGoodByNoGood(noGood)
      .subscribe({
        next: res => {
          console.log(res);
          this.form.get('estatusBien').setValue(res.description);
          this.form.updateValueAndValidity();
        },
        error: err => {
          console.log(err);
          this.alertQuestion(
            'warning',
            'Estatus del Bien',
            'El estatus no se obtubo correctamente para el bien ' + noGood + '.'
          );
        },
      });
  }

  async getDataExpedientByNoExpedient(noExpedient: number) {
    await this.appointmentsService
      .getExpedientByNoExpedient(noExpedient)
      .subscribe({
        next: res => {
          console.log(res);
          this.form.get('averiguacionPrevia').setValue(res.preliminaryInquiry);
          this.form.get('causaPenal').setValue(res.keyPenalty);
          this.form.get('fechaRecepcion').setValue(res.receptionDate);
          this.form.updateValueAndValidity();
        },
        error: err => {
          console.log(err);
          this.alertQuestion(
            'warning',
            'Número de Expediente',
            'El número de expediente ' + noExpedient + ' NO existe.'
          );
        },
      });
  }

  /**
   * Validar el número de bien
   */
  async validGoodNumberInDepositaryAppointment() {
    if (this.form.get('noBien').valid) {
      this.loadingAppointment = true;
      this.noBien = this.form.get('noBien').value;
      const params: ListParams = {
        page: this.params.getValue().page,
        limit: 10,
      };
      this.params.getValue().getParams();
      params['filter.goodNumber'] = this.noBien;
      this.form.reset();
      this.form.get('noBien').setValue(this.noBien);
      this.form.updateValueAndValidity();
      await this.appointmentsService
        .getGoodAppointmentDepositaryByNoGood(params)
        .subscribe({
          next: res => {
            this.loadingAppointment = false;
            console.log(res);
            this.depositaryAppointment = res.data[0];
            this.setDataDepositary(); // Set data depositary
            if (this.depositaryAppointment.personNumber) {
              if (this.depositaryAppointment.personNumber.id) {
                this.setDataPerson(); // Set data Person
              }
            }
            this.getFromGoodsAndExpedients(true); // Get data good
            this.setOthers();
          },
          error: err => {
            this.loadingAppointment = false;
            console.log(err);
            if (err.status == 400) {
              this.globalVars.noExiste = 0;
              this.getFromGoodsAndExpedients();
            } else {
              this.alert(
                'warning',
                'Número de Bien',
                'El número de Bien no existe.'
              );
            }
          },
        });
    } else {
      this.alert('warning', 'Número de Bien', 'Ingresa un número de Bien.');
    }
  }

  validPostGetDepositary() {}

  setDataDepositary() {
    this.form
      .get('representanteSAE')
      .setValue(this.depositaryAppointment.seraRepresentative);
    this.form.get('referencia').setValue(this.depositaryAppointment.reference);
    this.form
      .get('tipoNombramiento')
      .setValue(this.depositaryAppointment.typeNameKey);
    this.form
      .get('tipoDepositaria')
      .setValue(this.depositaryAppointment.depositaryType);
  }

  setDataPerson() {
    this.form
      .get('depositaria')
      .setValue(
        this.depositaryAppointment.personNumber.nom_persona
          ? this.depositaryAppointment.personNumber.nom_persona +
            ' --- ' +
            this.depositaryAppointment.personNumber.nombre
            ? this.depositaryAppointment.personNumber.nombre
            : ''
          : '' + ' --- ' + this.depositaryAppointment.personNumber.nombre
          ? this.depositaryAppointment.personNumber.nombre
          : ''
      );
    this.form
      .get('representante')
      .setValue(
        this.depositaryAppointment.personNumber.representante
          ? this.depositaryAppointment.personNumber.representante
          : ''
      );
    this.form
      .get('calle')
      .setValue(this.depositaryAppointment.personNumber.calle);
    this.form
      .get('noExterno')
      .setValue(this.depositaryAppointment.personNumber.no_exterior);
    this.form
      .get('noInterno')
      .setValue(this.depositaryAppointment.personNumber.no_interior);
    if (
      this.depositaryAppointment.personNumber.codigo_postal ||
      this.depositaryAppointment.personNumber.codigo_postal == '0'
    ) {
      this.postalCodeSelectValue =
        this.depositaryAppointment.personNumber.codigo_postal;
      this.getPostalCodeByDetail(new ListParams(), true);
    } else {
      if (this.depositaryAppointment.personNumber.cve_entfed) {
        this.stateSelectValue =
          this.depositaryAppointment.personNumber.cve_entfed;
      }
      if (this.depositaryAppointment.personNumber.deleg_munic) {
        this.delegationSelectValue =
          this.depositaryAppointment.personNumber.deleg_munic;
      }
      if (this.depositaryAppointment.personNumber.colonia) {
        this.localitySelectValue =
          this.depositaryAppointment.personNumber.colonia;
      }
      if (this.stateSelectValue) {
        // call function
        this.getStateByDetail(new ListParams());
      }
      if (this.delegationSelectValue) {
        // CALL FUNCTION
        this.getDelegationByDetail(new ListParams());
      }
      if (this.localitySelectValue) {
        // call function
        this.getLocalityByDetail(new ListParams());
      }
    }
    // if (
    //   this.depositaryAppointment.personNumber.cve_entfed ||
    //   this.depositaryAppointment.personNumber.cve_entfed == '0'
    // ) {
    //   this.stateSelectValue =
    //     this.depositaryAppointment.personNumber.cve_entfed;
    //   this.getStateByDetail(new ListParams());
    // }
    // if (this.depositaryAppointment.personNumber.deleg_munic) {
    //   this.delegationSelectValue =
    //     this.depositaryAppointment.personNumber.deleg_munic;
    //   let deleg = new ListParams();
    //   deleg['search'] = this.depositaryAppointment.personNumber.deleg_munic;
    //   deleg['text'] = this.depositaryAppointment.personNumber.deleg_munic;
    //   this.getDelegationByDetail(deleg);
    // }
    // if (this.depositaryAppointment.personNumber.colonia) {
    //   this.localitySelectValue =
    //     this.depositaryAppointment.personNumber.colonia;
    //   let colonia = new ListParams();
    //   colonia['search'] = this.depositaryAppointment.personNumber.colonia;
    //   colonia['text'] = this.depositaryAppointment.personNumber.colonia;
    //   this.getLocalityByDetail(colonia);
    // }
    this.form
      .get('telefono')
      .setValue(this.depositaryAppointment.personNumber.telefono);
    this.form.get('rfc').setValue(this.depositaryAppointment.personNumber.rfc);
    this.form
      .get('curp')
      .setValue(this.depositaryAppointment.personNumber.curp);
    this.form
      .get('giro')
      .setValue(this.depositaryAppointment.personNumber.cve_giro);
    this.form
      .get('tipoPersona')
      .setValue(
        this.appointmentsService.getPersonType(
          this.depositaryAppointment.personNumber.tipo_persona
        )
      );
    this.form
      .get('tipoPersona2')
      .setValue(
        this.appointmentsService.getResponsibleType(
          this.depositaryAppointment.personNumber.tipo_responsable
        )
      );
  }

  setGoodData() {
    this.form.get('descriptionGood').setValue(this.good.description);
    if (this.good.expediente) {
      if (this.good.expediente.id) {
        this.form.get('causaPenal').setValue(this.good.expediente.criminalCase);
        this.form.get('noExpedient').setValue(this.good.expediente.id);
        this.form
          .get('averiguacionPrevia')
          .setValue(this.good.expediente.preliminaryInquiry);
        let dateAgree: any;
        if (this.good.expediente.dateAgreementAssurance) {
          dateAgree = this.datePipe.transform(
            this.good.expediente.dateAgreementAssurance,
            this.dateFormat
          );
        }
        this.form.get('fechaAcuerdoAsegurado').setValue(dateAgree);
        let dateReception: any;
        if (this.good.expediente.receptionDate) {
          dateReception = this.datePipe.transform(
            this.good.expediente.receptionDate,
            this.dateFormat
          );
        }
        this.form.get('fechaRecepcion').setValue(dateReception);
        let dateConfiscate: any;
        if (this.good.expediente.confiscateDictamineDate) {
          dateConfiscate = this.datePipe.transform(
            this.good.expediente.confiscateDictamineDate,
            this.dateFormat
          );
        }
        this.form.get('fechaDecomiso').setValue(dateConfiscate);
      }
    }
  }

  setOthers() {
    // Revocation
    this.form.get('remocion').setValue(this.depositaryAppointment.revocation);
    this.form.get('fecha').setValue(this.depositaryAppointment.revocationDate);
    this.form
      .get('noOficio')
      .setValue(this.depositaryAppointment.officialRevocationNumber);
    // Junta de gobierno
    this.form
      .get('fechaAcuerdo')
      .setValue(this.depositaryAppointment.governmentMeetingOfficialDate);
    this.form
      .get('noAcuerdo')
      .setValue(this.depositaryAppointment.governmentMeetingOfficialNumber);
    // Honorarios y Contraprestaciones
    this.form
      .get('contraprestacion')
      .setValue(this.depositaryAppointment.importConsideration);
    this.form.get('honorarios').setValue(this.depositaryAppointment.feeAmount);
    this.form.get('iva').setValue(this.depositaryAppointment.iva);
    let startDate: any;
    if (this.depositaryAppointment) {
      startDate = this.datePipe.transform(
        this.depositaryAppointment.contractStartDate,
        this.dateFormat
      );
    }
    this.form.get('fechaInicio').setValue(startDate);
    this.form
      .get('noNombramiento')
      .setValue(this.depositaryAppointment.appointmentNumber);
    // Anexo y Observaciones
    this.form.get('anexo').setValue(this.depositaryAppointment.annexed);
    this.form
      .get('observaciones')
      .setValue(this.depositaryAppointment.observation);
  }

  /**
   * INCIDENCIA 538 -- CERRADA --- SE CAMBIA OBTENIENDO EL BIEN Y VALIDAR CON EL EXPEDIENTE QUE RETORNA
   * Obtener los datos del bien de acuerdo al status DEP
   */
  async getFromGoodsAndExpedients(onlyGood: boolean = false) {
    // let paramsGoodExpedient: IFromGoodsAndExpedientsBody = {
    //   goodNumber: this.noBien,
    //   page: 1,
    //   limit: 10,
    // };
    this.loadingGood = true;
    const params = new FilterParams();
    params.removeAllFilters();
    params.addFilter('goodId', this.noBien);
    if (onlyGood == false) {
      params.addFilter('status', 'DEP');
    }
    await this.appointmentsService
      .getFromGoodsAndExpedients(params.getFilterParams())
      .subscribe({
        next: res => {
          console.log(res);
          this.good = res.data[0]; // Set data good
          this.setGoodData();
          this.getStatusGoodByNoGood();
        },
        error: err => {
          this.loadingGood = false;
          console.log(err);
          this.alert(
            'warning',
            'Número de Bien',
            'El número de Bien no existe.'
          );
        },
      });
  }

  /**
   * INCIDENCIA 530 -- RESUELTA -- 03/15/2023
   * Obtener el estatus del bien por el número del Bien
   */
  async getStatusGoodByNoGood() {
    let bodyRequest: IDescriptionByNoGoodBody = {
      goodNumber: this.noBien,
    };
    await this.appointmentsService
      .getDescriptionGoodByNoGood(bodyRequest)
      .subscribe({
        next: res => {
          this.loadingGood = false;
          console.log(res);
          if (res.data.length > 0) {
            this.form.get('estatusBien').setValue(res.data[0].description);
          }
        },
        error: err => {
          this.loadingGood = false;
          console.log(err);
          this.alertQuestion(
            'warning',
            'Descripción del Bien',
            'Error al consultar la descripción del Bien.'
          );
          // this.validFielddGoodNumber();
        },
      });
  }

  /**
   * DATA SELECT DEL COMPONENTE
   */

  changePostalCodeDetail(event: any) {
    if (event) {
      if (event.postalCode) {
        this.postalCodeSelectValue = event.postalCode.toString();
        if (event.stateKey) {
          this.stateSelectValue = event.stateKey.toString();
        }
        if (event.municipalityKey) {
          this.delegationSelectValue = event.municipalityKey.toString();
        }
        if (event.townshipKey) {
          this.localitySelectValue = event.townshipKey.toString();
        }
        if (this.stateSelectValue) {
          // call function
          this.getStateByDetail(new ListParams());
        }
        if (this.delegationSelectValue) {
          // CALL FUNCTION
          this.getDelegationByDetail(new ListParams());
        }
        if (this.localitySelectValue) {
          // call function
          this.getLocalityByDetail(new ListParams());
        }
      } else {
        this.postalCodeSelectValue;
      }
    } else {
      this.postalCodeSelectValue;
    }
  }

  getPostalCodeByDetail(
    paramsData: ListParams,
    setPostalCode: boolean = false
  ) {
    const params: any = new FilterParams();
    params.removeAllFilters();
    params['sortBy'] = 'postalCode:ASC';
    if (this.delegationSelectValue) {
      params.addFilter('municipalityKey', this.delegationSelectValue);
    }
    if (this.stateSelectValue) {
      params.addFilter('stateKey', this.stateSelectValue);
    }
    if (this.localitySelectValue) {
      params.addFilter('townshipKey', this.localitySelectValue);
    }
    if (this.postalCodeSelectValue && !paramsData['search']) {
      params.addFilter(
        'postalCode',
        this.postalCodeSelectValue,
        SearchFilter.LIKE
      );
    } else {
      if (paramsData['search'] || paramsData['search'] == '0') {
        params.addFilter('postalCode', paramsData['search'], SearchFilter.LIKE);
      }
    }
    let subscription = this.appointmentsService
      .getPostalCodeByFilter(params.getParams())
      .subscribe({
        next: data => {
          if (this.postalCodeSelectValue && !paramsData['search']) {
            this.setPostalCode(data, setPostalCode);
          } else {
            if (setPostalCode) {
              this.setPostalCode(data, setPostalCode);
            } else {
              this.postalCode = new DefaultSelect(
                data.data.map((i: any) => {
                  i.township = i.postalCode + ' -- ' + i.township;
                  return i;
                }),
                data.count
              );
            }
          }
          subscription.unsubscribe();
        },
        error: error => {
          this.postalCode = new DefaultSelect();
          subscription.unsubscribe();
        },
      });
  }

  setPostalCode(data: any, setPostalCode: boolean = false) {
    let dataSet = data.data.find((item: any) => {
      return setPostalCode
        ? item.postalCode
        : Number(item.postalCode) == Number(this.postalCodeSelectValue);
    });
    console.log(dataSet);
    if (dataSet) {
      if (setPostalCode) {
        this.postalCodeSelectValue = dataSet.postalCode.toString();
      }
      this.postalCode = new DefaultSelect(
        [dataSet].map((i: any) => {
          i.township = i.postalCode + ' -- ' + i.township;
          return i;
        }),
        data.count
      );
      if (setPostalCode) {
        this.form.get('codigoPostal').setValue(this.postalCodeSelectValue);
        this.changePostalCodeDetail(dataSet);
      }
    }
  }

  changeLocalityDetail(event: any) {
    console.log(event);
    if (event) {
      if (event.townshipKey) {
        this.localitySelectValue = event.townshipKey.toString();
      } else {
        this.localitySelectValue;
      }
      if (event.stateKey) {
        this.stateSelectValue = event.stateKey.toString();
        this.getStateByDetail(new ListParams());
      }
      if (event.municipalityKey) {
        this.delegationSelectValue = event.municipalityKey.toString();
        this.getDelegationByDetail(new ListParams());
      }
      if (event.townshipKey && event.stateKey && event.municipalityKey) {
        this.getPostalCodeByDetail(new ListParams(), true);
      }
    } else {
      this.localitySelectValue;
    }
  }
  getLocalityByDetail(paramsData: ListParams) {
    // if (!this.stateSelectValue && !this.delegationSelectValue) {
    //   this.locality = new DefaultSelect();
    //   return;
    // }
    const params: any = new FilterParams();
    params.removeAllFilters();
    params['sortBy'] = 'townshipKey:DESC';
    if (
      this.delegationSelectValue &&
      !isNaN(Number(this.localitySelectValue))
    ) {
      params.addFilter('municipalityKey', this.delegationSelectValue);
    }
    if (this.stateSelectValue) {
      params.addFilter('stateKey', this.stateSelectValue);
    }
    console.log(this.localitySelectValue);
    if (this.localitySelectValue && !paramsData['search']) {
      // params.addFilter('townshipKey', this.localitySelectValue);
      params.addFilter(
        isNaN(Number(this.localitySelectValue)) ? 'township' : 'townshipKey',
        this.localitySelectValue
      );
    } else {
      if (paramsData['search'] || paramsData['search'] == '0') {
        params.addFilter('township', paramsData['search'], SearchFilter.LIKE);
      }
    }
    let subscription = this.appointmentsService
      .getLocalityByFilter(params.getParams())
      .subscribe({
        next: data => {
          if (this.localitySelectValue && !paramsData['search']) {
            if (data.data) {
              let dataSet = data.data.find((item: any) => {
                return (
                  Number(item.townshipKey) == Number(this.localitySelectValue)
                );
              });
              if (dataSet) {
                this.localitySelectValue = dataSet.townshipKey.toString();
                this.locality = new DefaultSelect(
                  [dataSet].map((i: any) => {
                    i.township = i.townshipKey + ' -- ' + i.township;
                    return i;
                  }),
                  1
                );
                this.form
                  .get('colonia')
                  .setValue(Number(this.localitySelectValue));
              }
            }
          } else {
            this.locality = new DefaultSelect(
              data.data.map((i: any) => {
                i.township = i.townshipKey + ' -- ' + i.township;
                return i;
              }),
              data.count
            );
          }
          subscription.unsubscribe();
        },
        error: error => {
          this.locality = new DefaultSelect();
          subscription.unsubscribe();
        },
      });
  }

  changeDelegationDetail(event: any) {
    console.log(event);
    if (event) {
      if (event.municipalityKey) {
        this.delegationSelectValue = event.municipalityKey.toString();
      } else {
        this.delegationSelectValue;
      }
      if (event.stateKey) {
        this.stateSelectValue = event.stateKey.toString();
        this.getStateByDetail(new ListParams());
      }
    } else {
      this.delegationSelectValue;
    }
  }
  getDelegationByDetail(paramsData: ListParams) {
    // if (!this.stateSelectValue) {
    //   this.delegations = new DefaultSelect();
    //   return;
    // }
    const params = new FilterParams();
    params.removeAllFilters();
    params['sortBy'] = 'municipalityKey:ASC';
    if (this.stateSelectValue) {
      params.addFilter('stateKey', this.stateSelectValue);
    }
    console.log(
      this.delegationSelectValue,
      Number(this.delegationSelectValue),
      isNaN(Number(this.delegationSelectValue))
    );
    if (this.delegationSelectValue && !paramsData['search']) {
      params.addFilter(
        isNaN(Number(this.delegationSelectValue))
          ? 'municipality'
          : 'municipalityKey',
        this.delegationSelectValue,
        SearchFilter.LIKE
      );
      params['limit'] = 100;
    } else {
      if (paramsData['search'] || paramsData['search'] == '0') {
        params.addFilter(
          'municipality',
          paramsData['search'],
          SearchFilter.LIKE
        );
      }
    }
    let subscription = this.appointmentsService
      .getDelegationsByFilter(params.getParams())
      .subscribe({
        next: data => {
          if (this.delegationSelectValue && !paramsData['search']) {
            if (data.data) {
              let dataSet = data.data.find((item: any) => {
                return (
                  Number(item.municipalityKey) ==
                  Number(this.delegationSelectValue)
                );
              });
              if (dataSet) {
                this.delegationSelectValue = dataSet.municipalityKey.toString();
                this.delegations = new DefaultSelect(
                  [dataSet].map((i: any) => {
                    i.municipality =
                      i.municipalityKey + ' -- ' + i.municipality;
                    return i;
                  }),
                  1
                );
                this.form
                  .get('delegacionMunicipio')
                  .setValue(this.delegationSelectValue.toString());
              }
            }
          } else {
            this.delegations = new DefaultSelect(
              data.data.map((i: any) => {
                i.municipality = i.municipalityKey + ' -- ' + i.municipality;
                return i;
              }),
              1
            );
          }
          subscription.unsubscribe();
        },
        error: error => {
          this.delegations = new DefaultSelect();
          subscription.unsubscribe();
        },
      });
  }

  changeStateDetail(event: any) {
    console.log(event);
    if (event) {
      if (event.id) {
        this.stateSelectValue = event.id;
      } else {
        this.stateSelectValue;
      }
    } else {
      this.stateSelectValue;
    }
  }
  getStateByDetail(paramsData: ListParams) {
    if (this.stateSelectValue && !paramsData['search']) {
      let subscription = this.appointmentsService
        .getStateOfRepublicById(this.stateSelectValue)
        .subscribe({
          next: data => {
            if (data) {
              this.state = new DefaultSelect(
                [data].map(i => {
                  i.descCondition = i.id + ' -- ' + i.descCondition;
                  return i;
                }),
                1
              );
              this.form
                .get('entidadFederativa')
                .setValue(this.stateSelectValue.toString());
            }
            subscription.unsubscribe();
          },
          error: error => {
            this.state = new DefaultSelect();
            subscription.unsubscribe();
          },
        });
    } else {
      paramsData['sortBy'] = 'id:ASC';
      if (!isNaN(Number(paramsData['search']))) {
        return;
      }
      let subscription = this.appointmentsService
        .getStateOfRepublicByAll(paramsData)
        .subscribe({
          next: data => {
            this.state = new DefaultSelect(
              data.data.map(i => {
                i.descCondition = i.id + ' -- ' + i.descCondition;
                return i;
              }),
              data.count
            );
            console.log(data, this.state);
            subscription.unsubscribe();
          },
          error: error => {
            this.state = new DefaultSelect();
            subscription.unsubscribe();
          },
        });
    }
  }
}
