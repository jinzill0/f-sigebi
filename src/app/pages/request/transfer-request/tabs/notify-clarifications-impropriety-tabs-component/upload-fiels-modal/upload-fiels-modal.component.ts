import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModelForm } from 'src/app/core/interfaces/model-form';
import { BasePage } from 'src/app/core/shared/base-page';
import {
  KEYGENERATION_PATTERN,
  RFCCURP_PATTERN,
  STRING_PATTERN,
} from 'src/app/core/shared/patterns';

@Component({
  selector: 'app-upload-fiels-modal',
  templateUrl: './upload-fiels-modal.component.html',
  styles: [],
})
export class UploadFielsModalComponent extends BasePage implements OnInit {
  data: any = {};
  fileForm: ModelForm<any>;
  certiToUpload: File | null = null;
  keyCertiToUpload: File | null = null;
  typeReport: string = '';
  isRFCHided: boolean = true;

  constructor(private modalRef: BsModalRef, private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    console.log(this.data);
    console.log(this.typeReport);
    this.initForm();
    this.setRFCInput();
  }

  initForm() {
    this.fileForm = this.fb.group({
      name: [
        { value: null, disabled: true },
        [Validators.pattern(STRING_PATTERN)],
      ],
      position: [
        { value: null, disabled: true },
        [Validators.pattern(STRING_PATTERN)],
      ],
      password: [null],
      rfc: [null, [Validators.pattern(RFCCURP_PATTERN)]],
      certificationFile: [null],
      keyCertificationFile: [null, [Validators.pattern(KEYGENERATION_PATTERN)]],
    });
  }

  setRFCInput(): void {
    //typeReport === 'annexK' || typeReport === 'annexJ'
    if (
      this.typeReport === 'annexJ-assets-classification' ||
      this.typeReport === 'annexK-assets-classification'
    ) {
      this.isRFCHided = false;
    } else if (
      this.typeReport === 'annexJ-verify-noncompliance' ||
      this.typeReport === 'annexJ-verify-noncompliance'
    ) {
      this.isRFCHided = false;
    }
  }

  chargeCertifications(event: any) {
    this.certiToUpload = event.target.files[0];
    console.log(this.certiToUpload);
  }

  chargeKeyCertifications(event: any) {
    this.keyCertiToUpload = event.target.files[0];
    console.log(this.keyCertiToUpload);
  }

  close() {
    this.modalRef.hide();
  }

  confirm() {
    //upload the form and the files for upload
    console.log(this.fileForm.value);
    this.close();
  }
}
