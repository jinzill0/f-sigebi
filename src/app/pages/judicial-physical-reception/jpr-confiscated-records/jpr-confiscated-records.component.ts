import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';

@Component({
  selector: 'app-jpr-confiscated-records',
  templateUrl: './jpr-confiscated-records.component.html',
  styleUrls: ["confiscated-rcords.component.scss"],

})
export class JprConfiscatedRecordsComponent implements OnInit {

  settings1 = {
    rowClassFunction: (row: { data: { status: any; }; }) =>
      row.data.status ? "available" : "not-available",
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: "external",
    columns: {
      noBien: {
        title: "No. Bien",
        type: "number",
        sort: false,
      },
      description: {
        title: "Descripcion",
        type: "string",
        sort: false,
      },
      proceso: {
        title: "Proceso",
        type: "string",
        sort: false,
      },
      cantidad: {
        title: "Cantidad",
        type: "number",
        sort: false,
      },
      unidad: {
        title: "Unidad",
        type: "string",
        sort: false,
      },
      acta: {
        title: "Acta",
        type: "string",
        sort: false,
      },
    },
    noDataMessage: "No se encontrarón registros",
  };

  settings2 = {
    pager: {
      display: false,
    },
    hideSubHeader: true,
    actions: false,
    selectedRowIndex: -1,
    mode: "external",
    columns: {
      noBien: {
        title: "No. Bien",
        type: "number",
        sort: false,
      },
      clasificacion: {
        title: "No Clasificación",
        type: "number",
        sort: false,
      },
      descripcion: {
        title: "Descripción",
        type: "string",
        sort: false,
      },
      proceso: {
        title: "Proceso",
        type: "string",
        sort: false,
      },
      cantidad: {
        title: "Cantidad",
        type: "number",
        sort: false,
      },
      unidad: {
        title: "Unidad",
        type: "string",
        sort: false,
      },
    },
    noDataMessage: "No se encontrarón registros",
  };
  data = EXAMPLE_DATA;
  data2 = EXAMPLE_DATA2;
  form: FormGroup;
  records: string[] = ["A", "NA", "D", "NS"];
  itemsSelect = new DefaultSelect();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.form = this.fb.group({
      expediente: [null, [Validators.required]],
      averPrev: [null, [Validators.required]],
      causaPenal: [null, [Validators.required]],
      acta: [null, [Validators.required]],
      transfer: [null, [Validators.required]],
      ident: [null, [Validators.required]],
      recibe: [null, [Validators.required]],
      admin: [null, [Validators.required]],
      folio: [null, [Validators.required]],
      year: [null, [Validators.required]],
      mes: [null, [Validators.required]],
      acta2: [null, [Validators.required]],
      direccion: [null, [Validators.required]],
      entrega: [null, [Validators.required]],
      fecElabRec: [null, [Validators.required]],
      fecEntBien: [null, [Validators.required]],
      fecElab: [null, [Validators.required]],
      fecReception: [null, [Validators.required]],
      fecCaptura: [null, [Validators.required]],
      observaciones: [null],
      recibe2: [null, [Validators.required]],
      testigo: [null, [Validators.required]],
      folioEscaneo: [null, [Validators.required]],
      edoFisico: [null, [Validators.required]],
      requerido: [false, [Validators.required]],
      almacen: [null, [Validators.required]],
      boveda: [null, [Validators.required]],
      estatusPrueba: [null, [Validators.required]],
      etiqueta: [null, [Validators.required]],
    });
  }

}

const EXAMPLE_DATA = [
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: false,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: true,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: true,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: true,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: true,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: false,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: false,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: true,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: false,
  },
  {
    noBien: 123,
    description: "INMUEBLE UBICADO EN CALLE",
    proceso: "ASEGURADO",
    cantidad: 1,
    unidad: "UNIDAD",
    acta: "A/PGR/6/JCS",
    status: true,
  },
];

const EXAMPLE_DATA2 = [
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
  {
    noBien: 321,
    clasificacion: 1139,
    descripcion: "UN PAR DE ARETES, METAL FANTASIA",
    proceso: "DECOMISO",
    cantidad: 2,
    unidad: "PIEZA",
  },
];
