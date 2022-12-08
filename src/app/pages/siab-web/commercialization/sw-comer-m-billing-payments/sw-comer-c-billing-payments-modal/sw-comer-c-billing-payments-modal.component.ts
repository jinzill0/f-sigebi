import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sw-comer-c-billing-payments-modal',
  templateUrl: './sw-comer-c-billing-payments-modal.component.html',
  styles: [],
})
export class SwComerCBillingPaymentsModalComponent implements OnInit {
  title: string = 'Detalle de pago';
  edit: boolean = true;
  form: FormGroup = new FormGroup({});

  allotment: any;
  @Output() refresh = new EventEmitter<true>();

  constructor(private modalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.prepareForm();
  }

  private prepareForm() {
    this.form = this.fb.group({
      event: [null, [Validators.required]],
      allotment: [null, [Validators.required]],
      reference: [null, [Validators.required]],
      amount: [null, [Validators.required]],
    });
    if (this.allotment != null) {
      this.edit = true;
      console.log(this.allotment);
      this.form.patchValue(this.allotment);
    }
  }

  close() {
    this.modalRef.hide();
  }
}
