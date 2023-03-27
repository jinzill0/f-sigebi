import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { showHideErrorInterceptorService } from 'src/app/common/services/show-hide-error-interceptor.service';
import { IGood } from 'src/app/core/models/good/good.model';
import { FractionService } from 'src/app/core/services/catalogs/fraction.service';
import { GoodTypeService } from 'src/app/core/services/catalogs/good-type.service';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { STRING_PATTERN } from 'src/app/core/shared/patterns';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { REQUEST_OF_ASSETS_COLUMNS } from '../classification-assets.columns';

@Component({
  selector: 'app-classification-assets-tab',
  templateUrl: './classification-assets-tab.component.html',
  styles: [],
})
export class ClassificationAssetsTabComponent
  extends BasePage
  implements OnInit, OnChanges
{
  @Input() dataObject: any;
  @Input() requestObject: any;
  @Input() typeDoc: any = '';

  idRequest: number = 0;
  title: string = 'Bienes de la Solicitud';
  params = new BehaviorSubject<ListParams>(new ListParams());
  paramsFraction = new BehaviorSubject<ListParams>(new ListParams());
  paramsChapter = new BehaviorSubject<ListParams>(new ListParams());
  paramsLvl1 = new BehaviorSubject<ListParams>(new ListParams());
  paramsLvl2 = new BehaviorSubject<ListParams>(new ListParams());
  paramsLvl3 = new BehaviorSubject<ListParams>(new ListParams());
  paramsLvl4 = new BehaviorSubject<ListParams>(new ListParams());
  paragraphs: any[] = [];
  assetsId: string | number;
  detailArray: any;
  goodObject: any;
  domicilieObject: any;
  totalItems: number = 0;
  idFraction: number = 0;
  classiGoodsForm: FormGroup = new FormGroup({});
  goodsForm: FormGroup = new FormGroup({});
  ligiesSection = new DefaultSelect();
  chapters = new DefaultSelect();
  levels1 = new DefaultSelect();
  levels2 = new DefaultSelect();
  levels3 = new DefaultSelect();
  levels4 = new DefaultSelect();
  goodSelect: IGood;
  idGood: string | number;
  constructor(
    private goodService: GoodService,
    private activatedRoute: ActivatedRoute,
    private goodTypeService: GoodTypeService,
    private fb: FormBuilder,
    private fractionService: FractionService,
    private showHideErrorInterceptorService: showHideErrorInterceptorService
  ) {
    super();
    this.idRequest = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.showHideErrorInterceptorService.showHideError(false);
    this.prepareForm();
    this.tablePaginator();
    this.goodForm();
    this.settings = {
      ...TABLE_SETTINGS,
      actions: false,
      selectMode: '',
      columns: REQUEST_OF_ASSETS_COLUMNS,
    };
  }

  prepareForm() {
    this.classiGoodsForm = this.fb.group({
      ligieSection: [null],
      chapter: [null],
      level1: [null],
      level2: [null],
      level3: [null],
      level4: [null],
    });
  }

  showGoods() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.requestObject) {
      this.tablePaginator();
    }
  }

  tablePaginator() {
    this.params
      .pipe(takeUntil(this.$unSubscribe))
      .subscribe(() => this.getData());
  }

  getData() {
    this.loading = true;
    //this.paragraphs = data;
    this.params.getValue()['filter.requestId'] = this.idRequest;
    this.goodService.getAll(this.params.getValue()).subscribe(data => {
      const info = data.data.map(items => {
        const fraction: any = items.fractionId;
        this.idFraction = fraction.code;
        items.fractionId = fraction.description;
        return items;
      });
      const filtergoodType = info.map(async item => {
        const goodType: any = await this.getGoodType(item.goodTypeId);
        item['goodTypeId'] = goodType;
        if (item['physicalStatus'] == 1) item['physicalStatus'] = 'BUENO';
        if (item['physicalStatus'] == 2) item['physicalStatus'] = 'MALO';
        if (item['stateConservation'] == 1) item['stateConservation'] = 'BUENO';
        if (item['stateConservation'] == 2) item['stateConservation'] = 'MALO';
        if (item['destiny'] == 1) item['destiny'] = 'VENTA';
        return item;
      });

      Promise.all(filtergoodType).then(data => {
        this.paragraphs = data;
        this.totalItems = this.paragraphs.length;
        this.loading = false;
      });
    });
  }

  getGoodType(goodTypeId: string | number) {
    return new Promise((resolve, reject) => {
      this.goodTypeService.getById(goodTypeId).subscribe(data => {
        resolve(data.nameGoodType);
      });
    });
  }

  rowSelected(good: IGood) {
    this.typeDoc = 'assets';
    this.requestObject = this.requestObject;
    this.goodObject = good;
    this.assetsId = good.id;
    this.domicilieObject = good.addressId;
    this.idGood = good.id;
    this.goodService.getById(good.id).subscribe((data: any) => {
      this.goodSelect = data;
      this.goodForm();
    });
  }

  goodForm() {
    console.log('select', this.goodSelect);
    this.goodsForm = this.fb.group({
      id: [this.goodSelect?.id],
      goodId: [this.goodSelect?.idGood],
      ligieSection: [this.goodSelect?.ligieSection],
      ligieChapter: [this.goodSelect?.ligieChapter],
      ligieLevel1: [this.goodSelect?.ligieLevel1],
      ligieLevel2: [this.goodSelect?.ligieLevel2],
      ligieLevel3: [this.goodSelect?.ligieLevel3],
      ligieLevel4: [this.goodSelect?.ligieLevel4],
      requestId: [this.idRequest],
      goodTypeId: [this.goodSelect?.goodTypeId],
      color: [this.goodSelect?.color],
      goodDescription: [this.goodSelect?.goodDescription],
      quantity: [this.goodSelect?.quantity, [Validators.required]],
      duplicity: [this.goodSelect?.duplicity],
      capacity: [
        this.goodSelect?.capacity,
        [Validators.pattern(STRING_PATTERN)],
      ],
      volume: [this.goodSelect?.volume, [Validators.pattern(STRING_PATTERN)]],
      fileeNumber: [null],
      useType: [this.goodSelect?.useType, [Validators.pattern(STRING_PATTERN)]],
      physicalStatus: [this.goodSelect?.physicalStatus],
      stateConservation: [this.goodSelect?.stateConservation],
      origin: [
        this.goodSelect?.origin,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      goodClassNumber: [null],
      ligieUnit: [this.goodSelect?.ligieUnit],
      appraisal: [null],
      destiny: [this.goodSelect?.destiny], //preguntar Destino ligie
      transferentDestiny: [this.goodSelect?.transferentDestiny],
      compliesNorm: ['N'], //cumple norma
      notesTransferringEntity: [
        this.goodSelect?.notesTransferringEntity,
        [Validators.pattern(STRING_PATTERN)],
      ],
      unitMeasure: [this.goodSelect?.unitMeasure], // preguntar Unidad Medida Transferente
      saeDestiny: [this.goodSelect?.saeDestiny],
      brand: [this.goodSelect?.brand, [Validators.required]],
      subBrand: [this.goodSelect?.subbrand, [Validators.required]],
      armor: [this.goodSelect?.armor],
      model: [this.goodSelect?.model, [Validators.required]],
      doorsNumber: [null],
      axesNumber: [null, [Validators.required]],
      engineNumber: [this.goodSelect?.numEngine, [Validators.required]], //numero motor
      tuition: [null, [Validators.required]],
      serie: [this.goodSelect?.serie, [Validators.required]],
      chassis: [this.goodSelect?.chassis],
      cabin: [this.goodSelect?.cabin],
      fitCircular: ['N', [Validators.required]],
      theftReport: ['N', [Validators.required]],
      addressId: [this.goodSelect?.addressId],
      operationalState: [
        this.goodSelect?.stateOperative,
        [Validators.required],
      ],
      manufacturingYear: [null, [Validators.required]],
      enginesNumber: [this.goodSelect?.numEngine, [Validators.required]], // numero de motores
      flag: [this.goodSelect?.flag, [Validators.required]],
      openwork: [null, [Validators.required]],
      sleeve: [this.goodSelect?.sleeve],
      length: [null, [Validators.required]],
      shipName: [null, [Validators.required]],
      publicRegistry: [this.goodSelect?.regPublic, [Validators.required]], //registro public
      ships: [null],
      dgacRegistry: [null, [Validators.required]], //registro direccion gral de aereonautica civil
      airplaneType: [null, [Validators.required]],
      caratage: [null, [Validators.required]], //kilatage
      material: [this.goodSelect?.material, [Validators.required]],
      weight: [null, [Validators.required]],
      fractionId: [this.goodSelect?.idFraction],
    });
    this.detailArray = this.goodsForm;
  }

  getLevel1(idParent: number) {
    this.paramsLvl1.getValue()['filter.parentId'] = idParent;
    this.paramsLvl1.getValue()['filter.fractionCode'] = 8703;

    this.fractionService.getAll(this.paramsLvl1.getValue()).subscribe({
      next: response => {
        response.data.map(info => {
          this.classiGoodsForm.get(['level1']).setValue(info.description);
          this.getLevel2(info.id);
        });
      },
    });
  }

  getLevel2(idParent: number) {
    this.paramsLvl2.getValue()['filter.parentId'] = idParent;
    this.paramsLvl2.getValue()['filter.id'] = 17616;
    //this.paramsLvl2.getValue()['filter.fractionCode'] = 8703;

    this.fractionService.getAll(this.paramsLvl2.getValue()).subscribe({
      next: response => {
        response.data.map(info => {
          this.classiGoodsForm.get(['level2']).setValue(info.description);
          this.getLevel3(info.id);
        });
      },
    });
  }

  getLevel3(idParent: number) {
    this.paramsLvl3.getValue()['filter.parentId'] = idParent;
    this.paramsLvl3.getValue()['filter.fractionCode'] = 870323;

    this.fractionService.getAll(this.paramsLvl3.getValue()).subscribe({
      next: response => {
        response.data.map(info => {
          this.classiGoodsForm.get(['level3']).setValue(info.description);
          this.getLevel4(info.id);
        });
      },
    });
  }

  getLevel4(idParent: number) {
    this.paramsLvl4.getValue()['filter.parentId'] = idParent;
    //this.paramsLvl2.getValue()['filter.id'] = 17616;
    this.paramsLvl4.getValue()['filter.fractionCode'] = 87032301;

    this.fractionService.getAll(this.paramsLvl4.getValue()).subscribe({
      next: response => {
        console.log(response);
        response.data.map(info => {
          this.classiGoodsForm.get(['level4']).setValue(info.description);
        });
      },
    });
  }
}
