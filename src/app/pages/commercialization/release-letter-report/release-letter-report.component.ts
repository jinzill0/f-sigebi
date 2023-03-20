import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TABLE_SETTINGS } from 'src/app/common/constants/table-settings';
import { ReportService } from 'src/app/core/services/reports/reports.service';
import { BasePage } from 'src/app/core/shared/base-page';
import { STRING_PATTERN } from 'src/app/core/shared/patterns';

export interface IReport {
  data: File;
}

@Component({
  selector: 'app-release-letter-report',
  templateUrl: './release-letter-report.component.html',
  styleUrls: ['release-letter-report.component.scss'],
})
export class ReleaseLetterReportComponent extends BasePage implements OnInit {
  goodList: any;
  dataGood: any;
  settings1 = {
    ...TABLE_SETTINGS,
    actions: false,
    columns: {
      description: {
        title: 'Descripcion',
        type: 'string',
        sort: false,
      },
    },
    noDataMessage: 'No se encontrarón registros',
  };
  settings2 = {
    ...this.settings,
    actions: false,
    columns: { ...RELEASE_REPORT_COLUMNS },
  };

  data = EXAMPLE_DATA;
  form: FormGroup;

  constructor(private fb: FormBuilder, private reportService: ReportService) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
    this.getGood();
  }

  prepareForm() {
    this.form = this.fb.group({
      evento: [null, [Validators.required]],
      lote: [null, [Validators.required]],
      oficio: [null, [Validators.required, Validators.pattern(STRING_PATTERN)]],
      diridoA: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      puesto: [null, [Validators.required, Validators.pattern(STRING_PATTERN)]],
      parrafo1: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      adjudicatorio: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      factura: [null, [Validators.required]],
      fechaFactura: [null, [Validators.required]],
      parrafo2: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      firmante: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      ccp1: [null, [Validators.required, Validators.pattern(STRING_PATTERN)]],
      ccp2: [null, [Validators.required, Validators.pattern(STRING_PATTERN)]],
      puestoFirma: [null],
      puestoCcp1: [null],
      puestoCcp2: [null],
      fechaCarta: [null],
    });
  }

  confirm(): void {
    console.log(this.form.value);
    let params = {
      DESTYPE: this.form.controls['evento'].value,
      ID_LOTE: this.form.controls['lote'].value,
      OFICIO_CARTALIB: this.form.controls['oficio'].value,
      DIRIGIDO_A: this.form.controls['diridoA'].value,
      PUESTO: this.form.controls['puesto'].value,
      PARRAFO1: this.form.controls['parrafo1'].value,
      ADJUDICATARIO: this.form.controls['adjudicatorio'].value,
      NO_FACTURA: this.form.controls['factura'].value,
      FECHA_FACTURA: this.form.controls['fechaFactura'].value,
      PARRAFO2: this.form.controls['parrafo2'].value,
      FIRMANTE: this.form.controls['firmante'].value,
      PUESTOFIRMA: this.form.controls['puestoFirma'].value,
      CCP1: this.form.controls['ccp1'].value,
      CCP2: this.form.controls['ccp1'].value,
      PUESTOCCP1: this.form.controls['puestoCcp1'].value,
      PUESTOCCP2: this.form.controls['puestoCcp2'].value,
      FECHA_CARTA: this.form.controls['fechaCarta'].value,
    };
    // console.log(this.reportForm.value);

    // let params = { ...this.form.value };

    // for (const key in params) {
    //   if (params[key] === null) delete params[key];
    // }

    console.log(params);
    // open the window
    setTimeout(() => {
      this.onLoadToast('success', 'procesando', '');
    }, 1000);
    //const pdfurl = `http://reportsqa.indep.gob.mx/jasperserver/rest_v2/reports/SIGEBI/Reportes/SIAB/RCOMERCARTALIB.pdf?ID_LOTE=${params.ID_LOTE}&OFICIO_CARTALIB=${params.OFICIO_CARTALIB}&DIRIGIDO_A=${params.DIRIGIDO_A}&PUESTO=${params.PUESTO}&PARRAFO1=${params.PARRAFO1}&ADJUDICATARIO=${params.ADJUDICATARIO}&NO_FACTURA=${params.NO_FACTURA}&FECHA_FACTURA=${params.FECHA_FACTURA}&PARRAFO2=${params.PARRAFO2}&FIRMANTE=${params.FIRMANTE}&PARRAFO2=${params.PARRAFO2}&PUESTOFIRMA=${params.PUESTOFIRMA}&CCP1=${params.CCP1}&CCP2=${params.CCP2}&CCP1=${params.CCP1}&PUESTOCCP1=${params.PUESTOCCP1}&PUESTOCCP2=${params.PUESTOCCP2}&FECHA_CARTA=${params.FECHA_CARTA}`;

    const pdfurl = `http://reportsqa.indep.gob.mx/jasperserver/rest_v2/reports/SIGEBI/Reportes/blank.pdf`; //window.URL.createObjectURL(blob);
    setTimeout(() => {
      this.onLoadToast('success', 'Reporte generado', '');
    }, 2000);

    window.open(pdfurl, 'RCOMERCARTALIB.pdf');
    this.loading = false;
    this.cleanForm();
  }

  Generar() {
    this.reportService.getReportDiario(this.form.value).subscribe({
      next: (resp: any) => {
        if (resp.file.base64 !== '') {
          this.preview(resp.file.base64);
        } else {
          this.onLoadToast(
            'warning',
            'advertencia',
            'Sin datos para los rangos de fechas suministrados'
          );
        }

        return;
      },
    });
  }
  getGood() {
    this.loading = true;
    this.reportService.getGood().subscribe({
      next: data => {
        this.goodList = data;
        this.dataGood = this.goodList.data;
        this.loading = false;
      },
      error: error => (this.loading = false),
    });
  }

  cleanForm(): void {
    this.form.reset();
  }
  preview(file: IReport) {
    try {
      this.reportService.download(file).subscribe(response => {
        if (response !== null) {
          let blob = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(blob);
          window.open(fileURL);
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
}

export const RELEASE_REPORT_COLUMNS = {
  id: {
    title: 'No. Bien',
    sort: false,
  },
  description: {
    title: 'Descripción del Bien',
    sort: false,
  },
  numRegister: {
    title: 'Numero de registro',
    sort: false,
  },
};

const EXAMPLE_DATA = [
  {
    description: 'Comercialización',
  },
  {
    description: 'Siap',
  },
  {
    description: 'Entrega de bienes',
  },
  {
    description: 'Inmuebles',
  },
  {
    description: 'Muebles',
  },
  {
    description: 'Importaciones',
  },
  {
    description: 'Enajenación',
  },
  {
    description: 'Lícito de bienes',
  },
];
