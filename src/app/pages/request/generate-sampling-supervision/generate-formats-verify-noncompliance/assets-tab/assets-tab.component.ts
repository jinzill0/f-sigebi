import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ExcelService } from '../../../../../common/services/excel.service';
import { ModelForm } from '../../../../../core/interfaces/model-form';
import { JSON_TO_CSV } from '../../../../admin/home/constants/json-to-csv';
import { UploadExpedientFormComponent } from '../../sampling-assets/upload-expedient-form/upload-expedient-form.component';
import { UploadImagesFormComponent } from '../../sampling-assets/upload-images-form/upload-images-form.component';

var data = [
  {
    id: 1,
    noManagement: '154654',
    noInventory: '000147',
    description: 'AUTO ZERO KILOMETOS TOYOTA SUBARUN',
    quantity: 1,
    unity: 'PIEZA',
    resultEvaluation: 'NO CUMPLE',
    statusAsset: '',
    quantityMissingDamaged: '',
    observationsAsset: '',
  },
  {
    id: 2,
    noManagement: '154654',
    noInventory: '000147',
    description: 'AUTO ZERO KILOMETOS TOYOTA SUBARUN',
    quantity: 1,
    unity: 'PIEZA',
    resultEvaluation: 'NO CUMPLE',
    statusAsset: '',
    quantityMissingDamaged: '',
    observationsAsset: '',
  },
];

@Component({
  selector: 'app-assets-tab',
  templateUrl: './assets-tab.component.html',
  styles: [],
})
export class AssetsTabComponent implements OnInit {
  @Input() willSave: boolean = false;
  bsModalRef: BsModalRef;
  assetsForm: ModelForm<any>;
  assetsArray: any[] = [];
  assetsSelected: any[] = [];
  jsonToCsv = JSON_TO_CSV;

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private excelService: ExcelService,
    private store: Store<{ data: any[] }>
  ) {}

  ngOnInit(): void {
    this.assetsArray = data;
    console.log(this.willSave);
  }

  initAssetForm(): void {
    this.assetsForm = this.fb.group({
      noManagement: [null],
      noInventory: [null],
      description: [null],
      quantity: [null],
      unity: [null],
      resultEvaluation: [null],
      statusAsset: [null],
      quantityMissingDamaged: [null],
      observationsAsset: [null],
    });
  }

  selectOne(event: any, data: any) {
    if (event.target.checked == true) {
      this.assetsSelected.push(data);
    } else {
      let index = this.assetsSelected.indexOf(
        this.assetsArray.find(x => x.id == data.id)
      );
      this.assetsSelected.splice(index, 1);
    }
    //console.log(this.assetsSelected);
    //const items:any = {item1: this.assetsSelected}
    //this.store.dispatch(add({items}))
  }

  uploadExpedient() {
    //if (this.assetsSelected.length == 0) return;
    this.openModals(UploadExpedientFormComponent, '');
  }

  uploadImages(): void {
    //if (this.listAssetsCopiedSelected.length == 0) return;
    this.openModals(UploadImagesFormComponent, '');
  }

  exportCsv() {
    const filename: string = 'Nombre del archivo';
    this.excelService.export(this.jsonToCsv, { type: 'csv', filename });
  }

  //preguntar si el formulario y los datos que se guardaran son similare
  //para sampling-assets-form y este
  openModals(component: any, data?: any): void {
    let config: ModalOptions = {
      initialState: {
        data: '',
        typeComponent: 'verify-noncompliance',
        callback: (next: boolean) => {
          //if (next){ this.getData();}
        },
      },
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(component, config);

    //this.bsModalRef.content.event.subscribe((res: any) => {
    //cargarlos en el formulario
    //console.log(res);
    //this.assetsForm.controls['address'].get('longitud').enable();
    //this.requestForm.get('receiUser').patchValue(res.user);
    //});
  }
}
