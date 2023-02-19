import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { IDelegation } from 'src/app/core/models/catalogs/delegation.model';
import { ISubdelegation } from 'src/app/core/models/catalogs/subdelegation.model';
import { DepartamentService } from 'src/app/core/services/catalogs/departament.service';
import { ReportService } from 'src/app/core/services/reports/reports.service';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
//BasePage
import { AbstractControl } from '@angular/forms';
import { IDelegationState } from 'src/app/core/models/catalogs/delegation-state.model';
import { IDepartment } from 'src/app/core/models/catalogs/department.model';
import { BasePage } from 'src/app/core/shared/base-page';
export interface IReport {
  data: File;
}
export interface IEntidad {
  data: [];
  count: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styles: [],
})
export class SummaryComponent extends BasePage implements OnInit {
  flyersForm: FormGroup;
  entidad = new DefaultSelect<IDelegationState>();
  select = new DefaultSelect<IDepartment>();
  delegdestino = new DefaultSelect<IDelegation>();
  subddestino = new DefaultSelect<ISubdelegation>();

  datePickerConfig: Partial<BsDatepickerConfig> = {
    minMode: 'month',
    adaptivePosition: true,
    dateInputFormat: 'MMMM YYYY',
  };

  get includeArea() {
    return this.flyersForm.get('includeArea');
  }
  constructor(
    private fb: FormBuilder,
    private reportService: ReportService,
    private departamentService: DepartamentService
  ) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.flyersForm = this.fb.group({
      delegation: [null, [Validators.required]],
      subdelegation: [null, [Validators.required]],
      federative: [null],
      PF_FECINI: [null, [Validators.required]],
      PF_FECFIN: [null, [Validators.required]],
      includeArea: [false],
      department: [null],
      delegdestino: [null],
      subddestino: [null],
    });
  }

  save() {}

  confirm(): void {
    let params = {
      PN_DELEG: this.flyersForm.controls['delegation'].value,
      PN_SUBDEL: this.flyersForm.controls['subdelegation'].value,
      PN_DELEGACION: this.flyersForm.controls['delegdestino'].value,
      PN_SUBDELEGACION: this.flyersForm.controls['subddestino'].value,
      PF_FECINI: this.flyersForm.controls['PF_FECINI'].value,
      PF_FECFIN: this.flyersForm.controls['PF_FECFIN'].value,
      PC_ENTFED: this.flyersForm.controls['federative'].value,
      DEPARTAMENTO: this.flyersForm.controls['department'].value,
    };
    /*
        let entidadades = [
      {
        id: 1,
        etapaEdo: 1252,
        cveState: 'Nayarit',
        description: 'Nayarit',
        addressOffice: 'Nayarit',
        regionalDelegate: 'Nayarit',
        city: 'Nayarit',
        status: 1,
        iva: 12,
        noRegister: 12145,
        zoneContractCVE: 2454,
        zoneVigilanceCVE: 12454,
        diffHours: 5145451,
        idZoneGeographic: 122,
      },
      {
        id: 2,
        etapaEdo: 1252,
        cveState: 'Nuevo León',
        description: 'Nuevo León',
        addressOffice: 'Nuevo León',
        regionalDelegate: 'Nuevo León',
        city: 'Nuevo León',
        status: 1,
        iva: 12,
        noRegister: 12145,
        zoneContractCVE: 2454,
        zoneVigilanceCVE: 12454,
        diffHours: 5145451,
        idZoneGeographic: 122,
      },
      {
        id: 3,
        etapaEdo: 1252,
        cveState: 'Oaxaca',
        description: 'Oaxaca',
        addressOffice: 'Oaxaca',
        regionalDelegate: 'Oaxaca',
        city: 'Oaxaca',
        status: 1,
        iva: 12,
        noRegister: 12145,
        zoneContractCVE: 2454,
        zoneVigilanceCVE: 12454,
        diffHours: 5145451,
        idZoneGeographic: 122,
      },
      {
        id: 4,
        etapaEdo: 1252,
        cveState: 'Sinaloa',
        description: 'Sinaloa',
        addressOffice: 'Sinaloa',
        regionalDelegate: 'Sinaloa',
        city: 'Sinaloa',
        status: 1,
        iva: 12,
        noRegister: 12145,
        zoneContractCVE: 2454,
        zoneVigilanceCVE: 12454,
        diffHours: 5145451,
        idZoneGeographic: 122,
      },
    ];
        let params = {
          PN_DELEG: this.flyersForm.controls['delegation'].value,
          PN_SUBDEL: this.flyersForm.controls['subdelegation'].value,
          PF_FECINI: this.flyersForm.controls['from'].value,
          PF_FECFIN: this.flyersForm.controls['to'].value,
          PC_ENTFED: this.flyersForm.controls['entidad'].value,
          PARAMFORM: this.flyersForm.controls['includeArea'].value,
          PN_DELEGACION: this.flyersForm.controls['delegdestino'].value,
          PN_SUBDELEGACION: this.flyersForm.controls['subddestino'].value,
          PN_DEPARTAMENTO: this.flyersForm.controls['area'].value,
        };
        */
    const start = new Date(this.flyersForm.get('PF_FECINI').value);
    const end = new Date(this.flyersForm.get('PF_FECFIN').value);

    const startTemp = `${start.getFullYear()}-0${
      start.getUTCMonth() + 1
    }-0${start.getDate()}`;
    const endTemp = `${end.getFullYear()}-0${
      end.getUTCMonth() + 1
    }-0${end.getDate()}`;

    if (end < start) {
      this.onLoadToast(
        'warning',
        'advertencia',
        'Fecha final no puede ser menor a fecha de inicio'
      );
      return;
    }

    console.log(params);
    // open the window
    setTimeout(() => {
      this.onLoadToast('success', 'procesando', '');
    }, 1000);

    //const pdfurl = `http://s29.q4cdn.com/175625835/files/doc_downloads/test.pdf`; //window.URL.createObjectURL(blob);
    const pdfurl = `https://drive.google.com/file/d/1o3IASuVIYb6CPKbqzgtLcxx3l_V5DubV/view?usp=sharing`; //window.URL.createObjectURL(blob);
    setTimeout(() => {
      this.onLoadToast('success', 'Reporte generado', '');
    }, 2000);

    window.open(pdfurl, 'RGEROFPRESUMENDIA.pdf');
    this.loading = false;
    this.cleanForm();
  }

  Generar() {
    const start = new Date(this.flyersForm.get('from').value);
    const end = new Date(this.flyersForm.get('to').value);

    const startTemp = `${start.getFullYear()}-0${
      start.getUTCMonth() + 1
    }-0${start.getDate()}`;
    const endTemp = `${end.getFullYear()}-0${
      end.getUTCMonth() + 1
    }-0${end.getDate()}`;

    if (endTemp < startTemp) {
      this.onLoadToast(
        'warning',
        'advertencia',
        'Fecha final no puede ser menor a fecha de inicio'
      );
    }

    this.reportService.getReportDiario(this.flyersForm.value).subscribe({
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

  cleanForm(): void {
    this.flyersForm.reset();
  }

  // onDptosChange(idDelegation: string | number, idSubdelegation: string | number) {
  //   this.departamentService.getByDelegationsSubdelegation(idDelegation, idSubdelegation).subscribe({
  //     next: (resp: any) => {
  //       if (resp.data) {
  //         return resp.data;
  //       } else {
  //         this.onLoadToast(
  //           'warning',
  //           'advertencia',
  //           'No hay delegaciones para éste departamento'
  //         );
  //       }

  //       return;
  //     },
  //   });
  // }
  //  this.departamentService.getAll().subscribe(response => {
  //    return response.data;
  //  })

  resetFields(fields: AbstractControl[]) {
    fields.forEach(field => {
      field = null;
    });
    this.flyersForm.updateValueAndValidity();
  }
}
