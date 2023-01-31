import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BehaviorSubject, takeUntil } from 'rxjs';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { ModelForm } from 'src/app/core/interfaces/model-form';
import { GenericService } from 'src/app/core/services/catalogs/generic.service';
import { TypeRelevantService } from 'src/app/core/services/catalogs/type-relevant.service';
import { GoodService } from 'src/app/core/services/ms-good/good.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { MenajeComponent } from '../records-of-request-child-tabs-components/menaje/menaje.component';
import { SelectAddressComponent } from '../records-of-request-child-tabs-components/select-address/select-address.component';
import { ASSETS_COLUMNS } from './assests-columns';

var defaultData = [
  {
    id: 1,
    noManagement: '1546645',
    descripTransfeAsset: 'descripcion',
    typeAsset: 'VEHICULO',
    physicalState: 'BUENO',
    conservationState: 'BUENO',
    tansferUnitMeasure: '',
    transferAmount: '',
    destinyLigie: '',
    destinyTransfer: '',
    householdAsset: '',
  },
];
@Component({
  selector: 'app-assets',
  templateUrl: './assets.component.html',
  styleUrls: ['./assets.component.scss'],
})
export class AssetsComponent extends BasePage implements OnInit {
  @Input() requestObject: any;
  goodObject: ModelForm<any>;
  bsModalRef: BsModalRef;
  params = new BehaviorSubject<ListParams>(new ListParams());
  paragraphs: any[] = [];
  createNewAsset: boolean = false;
  //typeDoc: string = '';

  constructor(
    private route: ActivatedRoute,
    private modalServise: BsModalService,
    private goodService: GoodService,
    private typeRelevantSevice: TypeRelevantService,
    private genericService: GenericService
  ) {
    super();
  }

  ngOnInit(): void {
    this.settings = {
      ...TABLE_SETTINGS,
      actions: false,
      columns: ASSETS_COLUMNS,
      selectMode: 'multi',
    };
    //this.settings.actions.delete = true;
    // this.settings.actions.position = 'left';
    var newParam = new ListParams();
    this.params.pipe(takeUntil(this.$unSubscribe)).subscribe(data => {
      newParam.page = data.inicio;
      newParam.limit = data.pageSize;
      this.getData(newParam);
    });
  }

  getData(params: ListParams) {
    const requestId = Number(this.route.snapshot.paramMap.get('id'));
    params['filter.requestId'] = `$eq:${requestId}`;
    this.goodService.getAll(params).subscribe({
      next: async (data: any) => {
        if (data !== null) {
          //obtener tipo bien
          const goodType = await this.getGoodType(data.data[0].goodTypeId);
          data.data[0]['goodTypeName'] = goodType;
          //obtener el estado fisico
          const physicalStatus = await this.getPhysicalStatus(
            data.data[0].physicalStatus
          );
          data.data[0]['physicalStatusName'] = physicalStatus;
          //obtener el estado de concervacion
          const stateConservation = await this.getStateConservation(
            data.data[0].stateConservation
          );
          data.data[0]['stateConservationName'] = stateConservation;
          //obtener el destino de la transferencia
          const transferentDestiny = await this.getTransferDestiny(
            data.data[0].transferentDestiny
          );
          data.data[0]['transferentDestinyName'] = transferentDestiny;
          data.data[0]['destinyLigieName'] = transferentDestiny;

          this.paragraphs = data.data;
          console.log(this.paragraphs);
        } else {
          this.paragraphs = defaultData;
        }
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  getGoodType(goodTypeId: number) {
    return new Promise((resolve, reject) => {
      if (goodTypeId !== null) {
        this.typeRelevantSevice.getById(goodTypeId).subscribe({
          next: (data: any) => {
            resolve(data.description);
          },
        });
      } else {
        resolve('');
      }
    });
  }

  getPhysicalStatus(physicalState: any) {
    return new Promise((resolve, reject) => {
      if (physicalState !== null) {
        var params = new ListParams();
        params['filter.keyId'] = `$eq:${physicalState}`;
        params['filter.name'] = `$eq:Estado Fisico`;
        this.genericService.getAll(params).subscribe({
          next: data => {
            resolve(data.data[0].description);
          },
        });
      } else {
        resolve('');
      }
    });
  }

  getStateConservation(stateConcervation: any) {
    return new Promise((resolve, reject) => {
      if (stateConcervation !== null) {
        var params = new ListParams();
        params['filter.keyId'] = `$eq:${stateConcervation}`;
        params['filter.name'] = `$eq:Estado Conservacion`;
        this.genericService.getAll(params).subscribe({
          next: data => {
            resolve(data.data[0].description);
          },
        });
      } else {
        resolve('');
      }
    });
  }

  getTransferDestiny(transferentDestiny: any) {
    return new Promise((resolve, reject) => {
      if (transferentDestiny !== null) {
        var params = new ListParams();
        params['filter.keyId'] = `$eq:${transferentDestiny}`;
        params['filter.name'] = `$eq:Destino`;
        this.genericService.getAll(params).subscribe({
          next: data => {
            resolve(data.data[0].description);
          },
        });
      } else {
        resolve('');
      }
    });
  }

  onFileChange(event: any) {
    console.log(event);
  }

  newAsset(): void {
    if (this.createNewAsset === false) {
      this.createNewAsset = true;
      window.scroll(0, 600);
    } else {
      this.createNewAsset = false;
    }
  }

  selectRows(event: any) {
    console.log(event);
    if (event.isSelected === true) {
      this.goodObject = event.data;
      this.createNewAsset = true;
    } else {
      this.goodObject = null;
      this.createNewAsset = false;
    }
  }

  openSelectAddressModal() {
    let config: ModalOptions = {
      initialState: {
        address: '',
        onlyOrigin: true,
        callback: (next: boolean) => {
          //if (next) this.getExample();
        },
      },
      class: 'modalSizeXL modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalServise.show(SelectAddressComponent, config);

    this.bsModalRef.content.event.subscribe((res: any) => {
      //cargarlos en el formulario
      console.log(res);

      //this.assetsForm.controls['address'].get('longitud').enable();
      //this.requestForm.get('receiUser').patchValue(res.user);
    });
  }

  menajeModal() {
    let config: ModalOptions = {
      initialState: {
        data: '',
        callback: (next: boolean) => {
          //if (next) this.getExample();
        },
      },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalServise.show(MenajeComponent, config);

    this.bsModalRef.content.event.subscribe((res: any) => {
      //ver si es necesario recivir los datos desde menaje
      console.log(res);
    });
  }

  save() {}
}
