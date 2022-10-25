import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { DELEGATIONS_COLUMNS } from '../delegations-columns';
import { FdpAdpdtDetailDelegationsComponent } from '../detail-delegations/fdp-adpdt-detail-delegations.component';

@Component({
  selector: 'app-fdp-adpdt-c-third-possession-acts',
  templateUrl: './fdp-adpdt-c-third-possession-acts.component.html',
  styles: [],
})
export class FdpAdpdtCThirdPossessionActsComponent implements OnInit {
  response: boolean = false;
  actForm: FormGroup;
  bsModalRef?: BsModalRef;

  settings1 = {
    rowClassFunction: (row: any) =>
      row.data.status ? 'available' : 'not-available',
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: 'external',
    columns: {
      noBien: {
        title: 'No. Bien',
        type: 'number',
      },
      description: {
        title: 'Descripcion',
        type: 'string',
      },
      cantidad: {
        title: 'Cantidad',
        type: 'number',
      },
      importe: {
        title: 'Importe',
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
      noBien: {
        title: 'No. Bien',
        type: 'number',
      },
      description: {
        title: 'Descripcion',
        type: 'string',
      },
      cantidad: {
        title: 'Cantidad',
        type: 'number',
      },
      importe: {
        title: 'Importe',
        type: 'string',
      },
    },
    noDataMessage: 'No se encontrarón registros',
  };

  data = EXAMPLE_DATA;
  data2 = EXAMPLE_DATA2;

  constructor(private fb: FormBuilder, private modalService: BsModalService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.actForm = this.fb.group({
      statusAct: [null, [Validators.required]],
      preliminaryAscertainment: [null, [Validators.required]],
      causePenal: [null, [Validators.required]],
      crimeKey: [null, [Validators.required]],
      crime: [null, [Validators.required]],
      actSelect: [null, [Validators.required]],
      status: [null, [Validators.required]],
      authority: [null, [Validators.required]],
      delivery: [null, [Validators.required]],
      admin: [null, [Validators.required]],
      folio: [null, [Validators.required]],
      act: [null, [Validators.required]],
      elabDate: [null, [Validators.required]],
      date: [null, [Validators.required]],
      folioScan: [null, [Validators.required]],
      orderingJudge: [null, [Validators.required]],
      observations: [null, [Validators.required]],
      deliveryName: [null, [Validators.required]],
      beneficiary: [null, [Validators.required]],
      witness: [null, [Validators.required]],
      auditor: [null, [Validators.required]],
    });
  }

  search(term: string) {
    this.response = !this.response;
  }

  onSubmit() {}

  openModal() {
    const initialState: ModalOptions = {
      initialState: {
        title: 'Delegación Administra',
        columns: DELEGATIONS_COLUMNS,
        optionColumn: 'delegations',
      },
    };
    this.bsModalRef = this.modalService.show(
      FdpAdpdtDetailDelegationsComponent,
      initialState
    );
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}

const EXAMPLE_DATA = [
  {
    noBien: 123,
    description: 'INMUEBLE UBICADO EN CALLE',
    cantidad: 1,
    importe: '1',
  },
  {
    noBien: 123,
    description: 'INMUEBLE UBICADO EN CALLE',
    cantidad: 1,
    importe: '1',
  },
  {
    noBien: 123,
    description: 'INMUEBLE UBICADO EN CALLE',
    cantidad: 1,
    importe: '1',
  },
  {
    noBien: 123,
    description: 'INMUEBLE UBICADO EN CALLE',
    cantidad: 1,
    importe: '1',
  },
];

const EXAMPLE_DATA2 = [
  {
    noBien: 543,
    description: 'INMUEBLE UBICADO EN LA CIUDAD',
    cantidad: 3,
    importe: 5,
  },
  {
    noBien: 543,
    description: 'INMUEBLE UBICADO EN LA CIUDAD',
    cantidad: 3,
    importe: 5,
  },
  {
    noBien: 543,
    description: 'INMUEBLE UBICADO EN LA CIUDAD',
    cantidad: 3,
    importe: 5,
  },
  {
    noBien: 543,
    description: 'INMUEBLE UBICADO EN LA CIUDAD',
    cantidad: 3,
    importe: 5,
  },
];
