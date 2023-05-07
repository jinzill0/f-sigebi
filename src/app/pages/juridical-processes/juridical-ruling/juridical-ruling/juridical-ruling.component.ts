/** BASE IMPORT */
import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';
import {
  KEYGENERATION_PATTERN,
  NUMBERS_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';
/** LIBRERÍAS EXTERNAS IMPORTS */

/** SERVICE IMPORTS */
/*Redux NgRX Global Vars Service*/
import { BehaviorSubject, takeUntil } from 'rxjs';
import { GlobalVarsService } from 'src/app//shared/global-vars/services/global-vars.service';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { IGoodSssubtype } from 'src/app/core/models/catalogs/good-sssubtype.model';
import { IGoodSubType } from 'src/app/core/models/catalogs/good-subtype.model';
import { IGoodType } from 'src/app/core/models/catalogs/good-type.model';
import { IGoodsSubtype } from 'src/app/core/models/catalogs/goods-subtype.model';
import { IDocuments } from 'src/app/core/models/ms-documents/documents';
import { IGood } from 'src/app/core/models/ms-good/good';
import { AuthService } from 'src/app/core/services/authentication/auth.service';
import { GoodSssubtypeService } from 'src/app/core/services/catalogs/good-sssubtype.service';
import { GoodSsubtypeService } from 'src/app/core/services/catalogs/good-ssubtype.service';
import { GoodSubtypeService } from 'src/app/core/services/catalogs/good-subtype.service';
import { GoodTypeService } from 'src/app/core/services/catalogs/good-type.service';
import { DocumentsService } from 'src/app/core/services/ms-documents/documents.service';
import { ExpedientService } from 'src/app/core/services/ms-expedient/expedient.service';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { ApplicationGoodsQueryService } from 'src/app/core/services/ms-goodsquery/application.service';
import { CheckboxElementComponent } from 'src/app/shared/components/checkbox-element-smarttable/checkbox-element';
import { DatePickerElementComponent } from 'src/app/shared/components/datepicker-element-smarttable/datepicker-element';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { IGlobalVars } from 'src/app/shared/global-vars/models/IGlobalVars.model';
/** ROUTING MODULE */

/** COMPONENTS IMPORTS */

@Component({
  selector: 'app-juridical-ruling',
  templateUrl: './juridical-ruling.component.html',
  styleUrls: ['./juridical-ruling.component.scss'],
})
export class JuridicalRulingComponent
  extends BasePage
  implements OnInit, OnDestroy
{
  params = new BehaviorSubject<ListParams>(new ListParams());
  expedientesForm: FormGroup;
  selectedGooods: IGood[] = [];
  selectedGooodsValid: IGood[] = [];
  goods: IGood[] = [];
  goodsValid: IGood[] = [];
  idGoodSelected = 0;
  statusDict: string = undefined;

  //tipos
  types = new DefaultSelect<Partial<IGoodType>>();
  subtypes = new DefaultSelect();
  ssubtypes = new DefaultSelect();
  sssubtypes = new DefaultSelect();

  typeField: string = 'type';
  subtypeField: string = 'subtype';
  ssubtypeField: string = 'ssubtype';
  sssubtypeField: string = 'sssubtype';

  goodTypeChange = new EventEmitter<IGoodType>();
  goodSubtypeChange = new EventEmitter<IGoodSubType>();
  goodSsubtypeChange = new EventEmitter<IGoodsSubtype>();
  goodSssubtypeChange = new EventEmitter<IGoodSssubtype>();

  data1 = [
    {
      noBien: 12345,
      description: 'UNA BOLSA',
      cantidad: 1,
      est: 'ENGD',
      proceso: 'ASEGURADO',
    },
    {
      noBien: 12345,
      description: 'UNA BOLSA',
      cantidad: 1,
      est: 'ENGD',
      proceso: 'ASEGURADO',
    },
    {
      noBien: 12345,
      description: 'UNA BOLSA',
      cantidad: 1,
      est: 'ENGD',
      proceso: 'ASEGURADO',
    },
  ];

  data2 = [
    {
      noBien: 12345,
      description: 'UNA BOLSA',
      cantidad: 1,
      menaje: 13465,
      proceso: 'ASEGURADO',
    },
    {
      noBien: 12345,
      description: 'UNA BOLSA',
      cantidad: 1,
      menaje: 13465,
      proceso: 'ASEGURADO',
    },
  ];

  data4: IDocuments[] = [];
  documents: IDocuments[] = [];
  selectedDocuments: IDocuments[] = [];

  settings1 = {
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: 'external',
    columns: {
      name: {
        title: '',
        sort: false,
        type: 'custom',
        showAlways: true,
        valuePrepareFunction: (isSelected: boolean, row: IGood) =>
          this.isGoodSelected(row),
        renderComponent: CheckboxElementComponent,
        onComponentInitFunction: (instance: CheckboxElementComponent) =>
          this.onGoodSelect(instance),
      },
      id: {
        title: 'No. Bien',
        type: 'number',
      },
      description: {
        title: 'Descripción',
        type: 'string',
      },
      quantity: {
        title: 'Cantidad',
        type: 'string',
      },
      identifier: {
        title: 'Ident.',
        type: 'string',
      },
      status: {
        title: 'Est',
        type: 'string',
      },
      processStatus: {
        title: 'Proceso',
        type: 'string',
      },
    },
    noDataMessage: 'No se encontrarón registros',
  };

  settings2 = {
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: 'external',
    columns: {
      name: {
        title: '',
        sort: false,
        type: 'custom',
        showAlways: true,
        valuePrepareFunction: (isSelected: boolean, row: IGood) =>
          this.isGoodSelectedValid(row),
        renderComponent: CheckboxElementComponent,
        onComponentInitFunction: (instance: CheckboxElementComponent) =>
          this.onGoodSelectValid(instance),
      },
      id: {
        title: 'No. Bien',
        type: 'number',
      },
      description: {
        title: 'Descripcion Dictaminada',
        type: 'string',
      },
      menaje: {
        title: 'Menaje',
        type: 'string',
      },
      quantity: {
        title: 'Cant. Dic..',
        type: 'string',
      },
      status: {
        title: 'Est',
        type: 'string',
      },
      processStatus: {
        title: 'Proceso',
        type: 'string',
      },
    },
    noDataMessage: 'No se encontrarón registros',
  };

  settings3 = {
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: 'external',
    columns: {
      id: {
        title: '#',
        type: 'number',
      },
      descriptionDocument: {
        title: 'Documentos',
        type: 'string',
      },
      selectedDate: {
        title: 'Fec. Recibido',
        type: 'string',
      },
    },
    noDataMessage: 'No se encontrarón registros',
  };
  settings4 = {
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: 'external',
    columns: {
      id: {
        title: '#',
        type: 'number',
      },
      descriptionDocument: {
        title: 'Documentos',
        type: 'string',
      },
      selectedDate: {
        title: 'Fecha',
        sort: false,
        type: 'custom',
        showAlways: true,
        valuePrepareFunction: (bsValue: Date, row: IDocuments) =>
          this.isDocumentSelectedValid(row),
        renderComponent: DatePickerElementComponent,
        onComponentInitFunction: (instance: DatePickerElementComponent) =>
          this.onDocsSelectValid(instance),
      },
    },
    noDataMessage: 'No se encontrarón registros',
  };

  legalForm: FormGroup;
  subtipoForm: FormGroup;
  /*Redux NgRX Global Vars Model*/
  /*Redux NgRX Global Vars Model*/
  globalVars: IGlobalVars;
  public listadoDocumentos: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: GoodTypeService,
    private globalVarsService: GlobalVarsService,
    private readonly goodServices: GoodService,
    private goodSubtypesService: GoodSubtypeService,
    private goodSssubtypeService: GoodSssubtypeService,
    private readonly documentService: DocumentsService,
    private goodSsubtypeService: GoodSsubtypeService,
    private readonly expedientServices: ExpedientService,
    private readonly authService: AuthService,
    private applicationGoodsQueryService: ApplicationGoodsQueryService
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.loading = true;
    this.globalVarsService
      .getGlobalVars$()
      .subscribe((globalVars: IGlobalVars) => {
        this.globalVars = globalVars;
        console.log(globalVars);
      });
    this.onLoadGoodList();
    this.onLoadDocumentsByGood();
  }

  onKeyPress($event: any) {
    if ($event.key === 'Enter') $event.currentTarget.blur();
  }

  changeNumExpediente() {
    this.onLoadGoodList();
    this.onLoadExpedientData();
    this.onLoadDictationInfo();
  }

  onLoadExpedientData() {
    let noExpediente = this.legalForm.get('noExpediente').value || '';
    this.expedientServices.getById(noExpediente).subscribe({
      next: response => {
        console.log(response);
        this.legalForm.get('criminalCase').setValue(response.criminalCase);
        this.legalForm
          .get('preliminaryInquiry')
          .setValue(response.preliminaryInquiry);
      },
    });
  }

  /**
   * Trae información de dictamen
   * según # de expediente
   */
  onLoadDictationInfo() {
    let noExpediente = this.legalForm.get('noExpediente').value || '';
    this.loadExpedientInfo(noExpediente).then(({ json }) => {
      json
        .then(res => {
          debugger;
          this.legalForm
            .get('tipoDictaminacion')
            .setValue(res.data[0].typeDict || undefined);
          this.legalForm
            .get('fecDicta')
            .setValue(new Date(res.data[0].dictDate) || undefined);
          this.legalForm
            .get('observations')
            .setValue(res.data[0].observations || undefined);

          this.statusDict = res.data[0].statusDict;
          this.legalForm
            .get('label')
            .setValue(new Date(res.data[0].instructorDate) || undefined);
        })
        .catch(err => {
          this.legalForm.get('tipoDictaminacion').setValue(null);
          this.legalForm.get('cveOficio').setValue(null);
          this.legalForm.get('observations').setValue(null);
          this.legalForm.get('fecDicta').setValue(null);
          this.legalForm.get('label').setValue(null);
          this.statusDict = undefined;
        });
    });
  }

  async loadExpedientInfo(id: number | string) {
    const response = await fetch(
      'http://sigebimsdev.indep.gob.mx/dictation/api/v1/dictation?filter.expedientNumber=' +
        id,
      {
        method: 'GET',
      }
    );
    return { status: response.status, json: response.json() };
  }

  onLoadGoodList() {
    let noExpediente = this.legalForm.get('noExpediente').value || '';
    if (noExpediente !== '') {
      this.goodServices
        .getByExpedient(noExpediente, this.params.getValue())
        .subscribe({
          next: response => {
            this.goods = response.data;
          },
          error: err => {
            console.log(err);
            this.goods = [];
          },
        });
    }
  }

  prepareForm() {
    this.expedientesForm = this.fb.group({
      tipoDictaminacion: [null, [Validators.required]],
      noExpediente: ['791474', [Validators.required]],
      averiguacionPrevia: [null, [Validators.pattern(STRING_PATTERN)]],
      causaPenal: [null, [Validators.pattern(STRING_PATTERN)]],
      delito: [false],
      observaciones: [null, [Validators.pattern(STRING_PATTERN)]],
    });
    this.legalForm = this.fb.group({
      tipoDictaminacion: [null, [Validators.required]],
      noExpediente: [null, [Validators.required]],
      // averPrevia: [null, [Validators.pattern(KEYGENERATION_PATTERN)]], // Se cambia por preliminaryInquiry (según doc)
      preliminaryInquiry: [null, [Validators.pattern(KEYGENERATION_PATTERN)]],
      // causaPenal: [null, [Validators.pattern(STRING_PATTERN)]], // Se cambia por CriminalCase (según doc)
      criminalCase: [null, [Validators.pattern(STRING_PATTERN)]],
      tipo: [null],
      esPropiedad: [false],
      // observaciones: [null, [Validators.pattern(STRING_PATTERN)]],
      observations: [null, [Validators.pattern(STRING_PATTERN)]],
      fecDest: [null, [Validators.required]],
      fecDicta: [null, [Validators.required]],
      autoriza: [null, [Validators.required]],
      cveOficio: [null, [Validators.required]],
      ident: [null],
      tipos: [null],
      label: [null],
    });
    this.subtipoForm = this.fb.group({
      tipoDictaminacion: [null],
      type: [null, [Validators.required]],
      subtype: [null, [Validators.required]],
      ssubtype: [null, [Validators.required]],
      sssubtype: [null, [Validators.required]],
      attrib: [
        { value: null, disabled: true },
        Validators.pattern(NUMBERS_PATTERN),
      ],
    });
  }

  get type() {
    return this.subtipoForm.get(this.typeField);
  }
  get subtype() {
    return this.subtipoForm.get(this.subtypeField);
  }
  get ssubtype() {
    return this.subtipoForm.get(this.ssubtypeField);
  }
  get sssubtype() {
    return this.subtipoForm.get(this.sssubtypeField);
  }

  onTypesChange(type: any) {
    this.resetFields([this.subtype, this.ssubtype, this.sssubtype]);
    this.subtypes = new DefaultSelect();
    this.ssubtypes = new DefaultSelect();
    this.sssubtypes = new DefaultSelect();
    this.subtipoForm.updateValueAndValidity();
    this.goodTypeChange.emit(type);
  }

  resetFields(fields: AbstractControl[]) {
    fields.forEach(field => {
      field.setValue(null);
    });
    this.subtipoForm.updateValueAndValidity();
  }

  /**
   * Traer descripción dictaminada por bien
   * @param id del bien
   */
  async getDicDescriptionByGood(id: number) {
    const response = await fetch(
      'http://sigebimsdev.indep.gob.mx/dictation/api/v1/dictation-x-good1/find-by-ids',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ id: id }),
      }
    );
    return { status: response.status, json: response.json() };
  }

  //Métodos para autocompletar los tipos
  getTypes(params: ListParams) {
    this.service.getAll(params).subscribe(
      res => {
        this.types = new DefaultSelect(res.data, res.count);
      },
      err => {
        let error = '';
        if (err.status === 0) {
          error = 'Revise su conexión de Internet.';
        } else {
          error = err.message;
        }

        this.onLoadToast('error', 'Error', error);
      }
    );
  }

  getSubtypes(params: ListParams) {
    this.goodSubtypesService
      .getAll({ type: this.type.value, ...params })
      .subscribe(data => {
        console.log(data);
        this.subtypes = new DefaultSelect(data.data, data.count);
      });
  }

  getSssubtypes(params: ListParams) {
    this.goodSssubtypeService
      .getAll({
        type: this.type.value,
        subtype: this.subtype.value,
        ssubtype: this.ssubtype.value,
        ...params,
      })
      .subscribe(data => {
        this.sssubtypes = new DefaultSelect(data.data, data.count);
      });
  }

  getSsubtypes(params: ListParams) {
    this.goodSsubtypeService
      .getAll({
        type: this.type.value,
        subtype: this.subtype.value,
        ...params,
      })
      .subscribe(data => {
        this.ssubtypes = new DefaultSelect(data.data, data.count);
      });
  }

  onSubtypesChange(subtype: any) {
    if (!this.type.value) {
      this.types = new DefaultSelect([subtype.idTypeGood], 1);
      this.type.setValue(subtype.idTypeGood.id);
    }
    this.resetFields([this.ssubtype, this.sssubtype]);
    this.ssubtypes = new DefaultSelect();
    this.sssubtypes = new DefaultSelect();
    this.goodSubtypeChange.emit(subtype);
  }

  onSsubtypesChange(ssubtype: any) {
    if (!this.type.value || !this.subtype.value) {
      this.types = new DefaultSelect([ssubtype.noType], 1);
      this.subtypes = new DefaultSelect([ssubtype.noSubType], 1);
      this.type.setValue(ssubtype.noType.id);
      this.subtype.setValue(ssubtype.noSubType.id);
    }
    this.resetFields([this.sssubtype]);
    this.goodSsubtypeChange.emit(ssubtype);
  }

  onSssubtypesChange(sssubtype: any) {
    if (!this.type.value || !this.subtype.value || !this.ssubtype.value) {
      console.log(sssubtype);
      this.types = new DefaultSelect([sssubtype.numType], 1);
      this.subtypes = new DefaultSelect([sssubtype.numSubType], 1);
      this.ssubtypes = new DefaultSelect([sssubtype.numSsubType], 1);
      this.type.setValue(sssubtype.numType.id);
      this.subtype.setValue(sssubtype.numSubType.id);
      this.ssubtype.setValue(sssubtype.numSsubType.id);
    }

    this.goodSssubtypeChange.emit(sssubtype);
  }

  goodSssubType: IGoodSssubtype;
  onValuesChange(goodSssubtypeChange: IGoodSssubtype): void {
    console.log(goodSssubtypeChange);
    this.goodSssubType = goodSssubtypeChange;
    this.subtipoForm.controls['attrib'].setValue(
      goodSssubtypeChange.numClasifGoods
    );
    this.subtipoForm.controls['id'].setValue(goodSssubtypeChange.id);
    this.sssubtypes = new DefaultSelect();
  }

  isGoodSelected(_good: IGood) {
    const exists = this.selectedGooods.find(good => good.id == _good.id);
    return !exists ? false : true;
  }
  onGoodSelect(instance: CheckboxElementComponent) {
    instance.toggle.pipe(takeUntil(this.$unSubscribe)).subscribe({
      next: data => this.goodSelectedChange(data.row, data.toggle),
    });
  }
  goodSelectedChange(good: IGood, selected: boolean) {
    if (selected) {
      this.selectedGooods.push(good);
    } else {
      this.selectedGooods = this.selectedGooods.filter(
        _good => _good.id != good.id
      );
    }
  }

  isGoodSelectedValid(_good: IGood) {
    const exists = this.selectedGooodsValid.find(good => good.id == _good.id);
    return !exists ? false : true;
  }

  onGoodSelectValid(instance: CheckboxElementComponent) {
    instance.toggle.pipe(takeUntil(this.$unSubscribe)).subscribe({
      next: data => this.goodSelectedChangeValid(data.row, data.toggle),
    });
  }

  goodSelectedChangeValid(good: IGood, selected?: boolean) {
    if (selected) {
      this.selectedGooodsValid.push(good);
    } else {
      this.selectedGooodsValid = this.selectedGooodsValid.filter(
        _good => _good.id != good.id
      );
    }
  }

  addSelect() {
    if (this.selectedGooods.length > 0) {
      this.goodsValid = this.goodsValid.concat(this.selectedGooods);
      this.selectedGooods.forEach(good => {
        this.goods = this.goods.filter(_good => _good.id != good.id);
      });
      this.selectedGooods = [];
    }
  }

  addAll() {
    if (this.goods.length > 0) {
      this.goodsValid = this.goodsValid.concat(this.goods);
      this.goods = [];
    }
  }
  removeAll() {
    if (this.goodsValid.length > 0) {
      this.goods = this.goods.concat(this.goodsValid);
      this.goodsValid = [];
    }
  }
  removeSelect() {
    if (this.selectedGooodsValid.length > 0) {
      this.goods = this.goods.concat(this.selectedGooodsValid);
      this.selectedGooodsValid.forEach(good => {
        this.goodsValid = this.goodsValid.filter(_good => _good.id != good.id);
      });
      this.selectedGooodsValid = [];
    }
  }
  rowSelected(e: any) {
    if (e) {
      this.idGoodSelected = e.data?.id;
      this.onLoadDocumentsByGood();
    }
  }

  /** --
   * DOCUMENTOS
   * --
   */
  btnDocumentos() {
    this.listadoDocumentos = true;
  }

  onLoadDocumentsByGood() {
    this.documentService.getByGood(this.idGoodSelected).subscribe({
      next: response => {
        this.data4 = response.data;
      },
      error: err => {
        console.log(err);
        this.goods = [];
      },
    });
  }

  btnSalir() {
    console.log('Salir');
    this.listadoDocumentos = false;
    // --
    // Sube documentos seleccionados
    console.log(this.selectedDocuments);
    if (this.selectedDocuments.length > 0) {
      this.documents = this.documents.concat(this.selectedDocuments);
      this.selectedDocuments.forEach(doc => {
        this.goods = this.goods.filter(_doc => _doc.id != doc.id);
      });
    }
  }
  isDocumentSelectedValid(_doc: any) {
    const exists = this.selectedDocuments.find(doc => doc.id == _doc.id);
    return !exists ? false : true;
  }

  onDocsSelectValid(instance: DatePickerElementComponent) {
    instance.toggle.pipe(takeUntil(this.$unSubscribe)).subscribe({
      next: (data: any) =>
        this.documentSelectedChangeValid(data.row, data.toggle),
    });
  }
  documentSelectedChangeValid(doc: any, selected?: string) {
    console.log('fecha ', selected);
    doc = { ...doc, selectedDate: selected };
    if (selected) {
      this.selectedDocuments.push(doc);
    } else {
      this.selectedDocuments = this.selectedDocuments.filter(
        _doc => _doc.id != doc.id
      );
    }
  }

  isDocsEmpty() {
    return this.documents.length === 0;
  }

  btnApprove() {
    let token = this.authService.decodeToken();
    const pNumber = Number(token.department);
    this.applicationGoodsQueryService.getDictamenSeq(pNumber).subscribe({
      next: (response: any) => {
        this.generateCveOficio(response.dictamenDelregSeq);
      },
    });
  }

  generateCveOficio(noDictamen: string) {
    let token = this.authService.decodeToken();
    const year = new Date().getFullYear();
    let cveOficio = '';
    cveOficio =
      token.siglasnivel1 + '/' + token.siglasnivel2 + '/' + token.siglasnivel3;
    // if (token.siglasnivel4 !== null) {
    //   cveOficio = cveOficio + '/' + token.siglasnivel4;
    // }
    cveOficio = cveOficio + '/' + noDictamen + '/' + year;
    this.legalForm.get('cveOficio').setValue(cveOficio);
  }

  btnVerify() {
    const status = this.statusDict;
    const expedient = this.legalForm.get('noExpediente').value;
    if (status === 'DICTAMINADO') {
      this.alert('info', 'AVISO', 'Bien ya dictaminado');
    } else {
      if (expedient === null || undefined) {
        this.alert('error', 'ERROR', 'Falta seleccionar expediente');
      } else {
        this.alert('warning', 'PENDIENTE', 'Parcializa la dictaminazión.');
      }
    }
  }
}
