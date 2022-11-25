import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BasePage } from 'src/app/core/shared/base-page';
import { CAPTURA_LINES_COLUMNS } from './capture-lines-columns';

@Component({
  selector: 'app-sw-comer-c-management-capture-lines',
  templateUrl: './sw-comer-c-management-capture-lines.component.html',
  styles: [],
})
export class SwComerCManagementCaptureLinesComponent
  extends BasePage
  implements OnInit
{
  formSearch: FormGroup = new FormGroup({});
  formAdm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    super();
    this.settings = {
      ...this.settings,
      actions: false,
      columns: { ...CAPTURA_LINES_COLUMNS },
    };
  }

  ngOnInit(): void {
    this.prepareFormSearch();
    this.prepareFormAdm();
  }

  private prepareFormSearch() {
    this.formSearch = this.fb.group({
      idEvent: [null, [Validators.required]],
    });
  }

  private prepareFormAdm() {
    this.formAdm = this.fb.group({
      typeReference: [null, [Validators.required]],
    });
  }

  data: any;
}
