import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BasePage } from 'src/app/core/shared/base-page';

@Component({
  selector: 'app-c-ap-c-add-penalties',
  templateUrl: './c-ap-c-add-penalties.component.html',
  styles: [
  ]
})
export class CApCAddPenaltiesComponent extends BasePage implements OnInit {
   
  form: FormGroup = new FormGroup({});

  edit: boolean = false;
  title: string = 'Registro de Penalización y Cambio de Estatus';
  penalty:any;//IPenalty

  @Output() data = new EventEmitter<{}>();

  constructor(
    private fb: FormBuilder,
    private modalRef: BsModalRef) {
    super();
  }

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm(): void {
    this.form = this.fb.group({
      status: [null, [Validators.required]],
      event: [null, [Validators.required]],
      customer: [null, [Validators.required]],
      batch: [null, [Validators.required]],
      typePenalty: [null, [Validators.required]],
      observations: [null, [Validators.required]],
      penaltyDate: [null, [Validators.required]],
    });

    if (this.penalty != null) {
      this.edit = true;
      this.form.patchValue(this.penalty);
    }

  }

  close() {
    this.modalRef.hide();
  }

  confirm() {
    let data = this.form.value;
    this.data.emit(data);
    this.modalRef.hide();
  }

}
