import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListParams } from 'src/app/common/repository/interfaces/list-params';
import { ModelForm } from 'src/app/core/interfaces/model-form';
import { GenericService } from 'src/app/core/services/catalogs/generic.service';
import { MinPubService } from 'src/app/core/services/catalogs/minpub.service';
import { RequestService } from 'src/app/core/services/requests/request.service';
import { BasePage } from 'src/app/core/shared/base-page';
import {
  EMAIL_PATTERN,
  PHONE_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';
import { DefaultSelect } from 'src/app/shared/components/select/default-select';
import { IRequest } from '../../../../../../core/models/requests/request.model';
import { AffairService } from '../../../../../../core/services/catalogs/affair.service';

@Component({
  selector: 'app-request-record-tab',
  templateUrl: './request-record-tab.component.html',
  styles: [],
})
export class RequestRecordTabComponent extends BasePage implements OnInit {
  @Input() requestForm: ModelForm<IRequest>;
  bsReceptionValue = new Date();
  bsPaperValue: any;
  bsPriorityDate: any;
  selectTypeExpedient = new DefaultSelect<any>();
  selectOriginInfo = new DefaultSelect<any>();
  selectMinPub = new DefaultSelect<any>();
  affairName: string = '';
  datePaper: any;
  priority: boolean = false;
  priorityString: string = 'N';
  transferenceNumber: number = 0;

  constructor(
    public fb: FormBuilder,
    private affairService: AffairService,
    private genericsService: GenericService,
    private requestService: RequestService,
    private minPub: MinPubService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getOriginInfo(new ListParams());
    this.getTypeExpedient(new ListParams());
    this.getPublicMinister(new ListParams());
    this.prepareForm();
    this.requestForm.controls['affair'].valueChanges.subscribe(val => {
      if (this.requestForm.controls['affair'].value != null) {
        this.getAffair(this.requestForm.controls['affair'].value);
      }

      if (this.requestForm.controls['urgentPriority'].value) {
        //establece el campo urgente
        this.priorityString = this.requestForm.controls['urgentPriority'].value;

        this.priority =
          this.requestForm.controls['urgentPriority'].value === 'Y'
            ? true
            : false;
        //this.requestForm.controls['urgentPriority'].setValue(this.priority);
      }

      //establece el campo fecha de oficio
      if (this.requestForm.controls['paperDate'].value != null) {
        let date = new Date(this.requestForm.controls['paperDate'].value);
        this.bsPaperValue = date;
        //this.requestForm.controls['paperDate'].setValue(date.toISOString());
      }

      //estable el campo para preguntar en la vista si es del tipo 1 o 3
      if (this.requestForm.controls['transferenceId'].value != null) {
        this.transferenceNumber = Number(
          this.requestForm.controls['transferenceId'].value
        );
      }
    });

    //establece la fecha de prioridad en el caso de que prioridad se aya seleccionado
    this.requestForm.controls['priorityDate'].valueChanges.subscribe(val => {
      if (this.requestForm.controls['priorityDate'].value !== null) {
        const date = new Date(this.requestForm.controls['priorityDate'].value);
        this.bsPriorityDate = date;
      }
    });
  }
  prepareForm() {
    //formulario de solicitudes
    this.requestForm = this.fb.group({
      applicationDate: [null],
      recordId: [null],
      paperNumber: [null, [Validators.maxLength(30)]],
      regionalDelegationId: [null],
      keyStateOfRepublic: [null],
      transferenceId: [null],
      stationId: [null],
      authorityId: [null],
      //typeUser: [''],
      //receiUser: [''],
      id: [null],
      urgentPriority: [null],
      priorityDate: [null],
      originInfo: [null],
      receptionDate: [{ value: null, disabled: true }],
      paperDate: [null, [Validators.required]],
      typeRecord: [null],
      publicMinistry: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      nameOfOwner: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ], //nombre remitente
      holderCharge: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ], //cargo remitente
      phoneOfOwner: [
        null,
        [Validators.pattern(PHONE_PATTERN), Validators.maxLength(13)],
      ], //telefono remitente
      emailOfOwner: [
        null,
        [Validators.pattern(EMAIL_PATTERN), Validators.maxLength(100)],
      ], //email remitente
      court: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(200)],
      ],
      crime: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      receiptRoute: [null],
      destinationManagement: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      indicatedTaxpayer: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(200)],
      ],
      affair: [null],
      transferEntNotes: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(1500)],
      ],
      observations: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(1500)],
      ],
      transferenceFile: [null],
      previousInquiry: [null],
      trialType: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      circumstantialRecord: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      lawsuit: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      tocaPenal: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(100)],
      ],
      protectNumber: [
        null,
        [Validators.pattern(STRING_PATTERN), Validators.maxLength(30)],
      ],
    });
  }
  getPublicMinister(params: ListParams) {
    params['filter.description'] = `$ilike:${params.text}`;
    this.minPub.getAll(params).subscribe({
      next: resp => {
        this.selectMinPub = new DefaultSelect(resp.data, resp.count);
      },
    });
  }

  getTypeExpedient(params: ListParams) {
    params['filter.name'] = '$eq:Tipo Expediente';
    params.limit = 20;
    this.genericsService.getAll(params).subscribe((data: any) => {
      this.selectTypeExpedient = new DefaultSelect(data.data, data.count);
    });
  }

  getOriginInfo(params?: ListParams) {
    params['filter.name'] = '$eq:Procedencia';
    params.limit = 20;
    this.genericsService.getAll(params).subscribe((data: any) => {
      this.selectOriginInfo = new DefaultSelect(data.data, data.count);
    });
  }

  getAffair(id: number) {
    this.affairService.getById(id).subscribe({
      next: data => {
        this.affairName = data.description;
      },
      error: error => {
        this.affairName = '';
        console.log(error.error.massage);
      },
    });
  }

  changeDateEvent(event: Date) {
    this.bsPaperValue = event ? event : this.bsPaperValue;

    if (this.bsPaperValue) {
      //TODO: VERIFICAR LA FECHA
      let date = new Date(this.bsPaperValue);
      var dateIso = date.toISOString();
      const d1 = this.bsPaperValue.toISOString();
      this.requestForm.controls['paperDate'].setValue(d1);
    }
  }

  changePriorityDateEvent(event: Date) {
    this.bsPriorityDate = event ? event : this.bsPriorityDate;

    if (this.bsPriorityDate) {
      let date = this.bsPriorityDate.toISOString();
      this.requestForm.controls['priorityDate'].setValue(date);
    }
  }

  changePriority(event: any) {
    let checked = event.currentTarget.checked;
    let value = checked === true ? 'Y' : 'N';
    this.priorityString = value;
    this.requestForm.controls['urgentPriority'].setValue(value);
    if (checked === false) {
      this.requestForm.controls['priorityDate'].setValue(null);
    }
  }

  confirm() {
    this.loading = true;
    const request = this.requestForm.getRawValue() as IRequest;
    this.requestService.update(request.id, request).subscribe({
      next: (resp: any) => {
        if (resp.id != null) {
          this.message(
            'success',
            'Guardado',
            'Se guardo la solicitud correctamente'
          );
        }
        if (resp.statusCode != null) {
          this.message('error', 'Error', 'No se guardo la solicitud!');
        }

        this.loading = false;
      },
      error: error => {
        this.loading = false;
        console.log(error);
      },
    });
  }

  message(header: any, title: string, body: string) {
    this.onLoadToast(header, title, body);
  }
}
