import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BasePage } from 'src/app/core/shared/base-page';
import { STRING_PATTERN } from 'src/app/core/shared/patterns';

@Component({
  selector: 'app-event-types-forn',
  templateUrl: './event-types-forn.component.html',
  styles: [],
})
export class EventTypesFornComponent extends BasePage implements OnInit {
  status: string = 'Nuevo';
  edit: boolean = false;

  form: FormGroup = new FormGroup({});
  eventType: any;

  @Output() refresh = new EventEmitter<true>();

  constructor(private fb: FormBuilder, private modalRef: BsModalRef) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  prepareForm() {
    this.form = this.fb.group({
      descripcion: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      desc_recibo: [
        null,
        [Validators.required, Validators.pattern(STRING_PATTERN)],
      ],
      id_tipo_disp: [null, [Validators.required]],
      id_tipo_fallo: [null, [Validators.required]],
    });

    if (this.edit) {
      //console.log(this.brand)
      this.status = 'Actualizar';
      this.form.patchValue(this.eventType);
    }
  }

  confirm() {
    this.edit ? this.update() : this.create();
  }

  close() {
    this.modalRef.hide();
  }

  create() {
    this.loading = true;
    this.handleSuccess();
    /*this.bankService.create(this.form.value).subscribe(
      data => this.handleSuccess(),
      error => (this.loading = false)
    );*/
  }

  handleSuccess() {
    this.loading = false;
    this.refresh.emit(true);
    this.modalRef.hide();
  }

  update() {
    this.loading = true;
    this.handleSuccess();
    /*this.bankService.update(this.bank.bankCode, this.form.value).subscribe(
      data => this.handleSuccess(),
      error => (this.loading = false)
    );*/
  }
}
